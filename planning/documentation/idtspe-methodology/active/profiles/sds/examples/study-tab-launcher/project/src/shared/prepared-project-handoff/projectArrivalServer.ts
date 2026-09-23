import {
  createServer,
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from "node:http";
import { randomUUID } from "node:crypto";

import {
  type OpenProjectRequest,
  type OperationOutcome,
  parseOpenProjectRequest,
  RequestRejectedError,
} from "../contracts";
import {
  resolveProjectWithArrivalPolling,
  type ProjectPollingClock,
} from "./projectArrivalPolling";
import type { ProjectTargetResolver } from "../../domain/local-project-selector/projectTargetResolver";

export const PROJECT_ARRIVAL_HOST = "127.0.0.1";
export const PROJECT_ARRIVAL_PORT = 17373;
export const PROJECT_PREPARE_PATH = "/prepare-project";
export const PROJECT_FOCUS_OWNER_PATH = "/focus-owner";
export const PROJECT_ARRIVAL_PATH = "/launch-project";
export const PROJECT_ARRIVAL_HEADER = "x-study-tab-launcher";
export const PROJECT_ARRIVAL_HEADER_VALUE = "project-arrival-v1";

const MAX_BODY_BYTES = 16 * 1024;
const MAX_CONCURRENT_REQUESTS = 8;
const MAX_PENDING_LAUNCHES = 16;
export const PROJECT_LAUNCH_TOKEN_TTL_MS = 15_000;
const FOCUS_ACKNOWLEDGEMENT_WAIT_MS = 10_000;
const RETRY_BIND_MS = 5_000;
const ALLOWED_ORIGINS = new Set([
  "https://chatgpt.com",
  "https://chat.openai.com",
]);

export type ProjectLaunchRoute = "project" | "trusted-project";

export interface ProjectArrivalResponse {
  readonly status: "completed";
  readonly source: "folder" | "archive";
  readonly outcome: OperationOutcome;
}

export interface ProjectPreparedResponse {
  readonly status: "ready";
  readonly source: "folder" | "archive";
  readonly launchToken: string;
}

export type ProjectArrivalLauncher = (
  route: ProjectLaunchRoute,
  request: OpenProjectRequest,
) => Promise<OperationOutcome>;

export type ProjectOwnerFocus = () => Promise<void>;

export interface ProjectArrivalServerHandle {
  readonly port: number;
  dispose(): void;
}

function applyCors(request: IncomingMessage, response: ServerResponse): boolean {
  const origin = request.headers.origin;
  if (origin !== undefined && !ALLOWED_ORIGINS.has(origin)) {
    sendJson(response, 403, { message: "Origin is not allowed." });
    return false;
  }
  if (origin !== undefined) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Vary", "Origin");
  }
  return true;
}

function sendJson(
  response: ServerResponse,
  statusCode: number,
  value: object,
): void {
  const body = JSON.stringify(value);
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(body);
}

async function readJsonBody(request: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  let total = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    total += buffer.length;
    if (total > MAX_BODY_BYTES) {
      throw new RequestRejectedError(
        `Loopback request exceeds ${MAX_BODY_BYTES} bytes.`,
      );
    }
    chunks.push(buffer);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new RequestRejectedError("Loopback request is not valid JSON.");
  }
}

function parsePrepareEnvelope(value: unknown): {
  readonly route: ProjectLaunchRoute;
  readonly request: OpenProjectRequest;
} {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new RequestRejectedError("Loopback launch body must be an object.");
  }
  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);
  if (
    keys.length !== 2 ||
    !Object.hasOwn(record, "route") ||
    !Object.hasOwn(record, "request")
  ) {
    throw new RequestRejectedError(
      "Loopback launch body must contain only route and request.",
    );
  }
  if (record.route !== "project" && record.route !== "trusted-project") {
    throw new RequestRejectedError("Unsupported loopback project route.");
  }
  return {
    route: record.route,
    request: parseOpenProjectRequest(record.request),
  };
}

function parseLaunchToken(value: unknown): string {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new RequestRejectedError("Loopback launch body must be an object.");
  }
  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);
  if (
    keys.length !== 1 ||
    !Object.hasOwn(record, "launchToken") ||
    typeof record.launchToken !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(record.launchToken)
  ) {
    throw new RequestRejectedError(
      "Loopback launch body must contain only a valid launchToken.",
    );
  }
  return record.launchToken;
}

interface PendingProjectLaunch {
  readonly route: ProjectLaunchRoute;
  readonly request: OpenProjectRequest;
  readonly source: "folder" | "archive";
  readonly expiresAt: number;
  focusAcknowledged: boolean;
  focusInProgress: Promise<void> | undefined;
}

async function waitForFocusAcknowledgement(
  pending: PendingProjectLaunch,
  waitMilliseconds: number,
): Promise<void> {
  const deadline = Date.now() + waitMilliseconds;
  while (!pending.focusAcknowledged && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  if (!pending.focusAcknowledged) {
    throw new RequestRejectedError(
      "VS Code did not confirm focus for the prepared project launch; no operation was started.",
    );
  }
}

export function createProjectArrivalHttpServer(
  resolver: ProjectTargetResolver,
  launcher: ProjectArrivalLauncher,
  pollingClock?: ProjectPollingClock,
  tokenNow: () => number = Date.now,
  focusOwner: ProjectOwnerFocus = async () => undefined,
  focusAcknowledgementWaitMs = FOCUS_ACKNOWLEDGEMENT_WAIT_MS,
): Server {
  let activeRequests = 0;
  const pendingLaunches = new Map<string, PendingProjectLaunch>();
  const server = createServer(async (request, response) => {
    if (!applyCors(request, response)) {
      return;
    }

    if (request.method === "OPTIONS") {
      if (
        request.url !== PROJECT_PREPARE_PATH &&
        request.url !== PROJECT_FOCUS_OWNER_PATH &&
        request.url !== PROJECT_ARRIVAL_PATH
      ) {
        sendJson(response, 404, { message: "Unsupported loopback route." });
        return;
      }
      response.writeHead(204, {
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, X-Study-Tab-Launcher",
        "Access-Control-Max-Age": "600",
      });
      response.end();
      return;
    }

    if (
      request.method !== "POST" ||
      (request.url !== PROJECT_PREPARE_PATH &&
        request.url !== PROJECT_FOCUS_OWNER_PATH &&
        request.url !== PROJECT_ARRIVAL_PATH)
    ) {
      sendJson(response, 404, { message: "Unsupported loopback route." });
      return;
    }
    if (
      request.headers[PROJECT_ARRIVAL_HEADER] !==
      PROJECT_ARRIVAL_HEADER_VALUE
    ) {
      sendJson(response, 403, { message: "Missing loopback request marker." });
      return;
    }
    if (!request.headers["content-type"]?.startsWith("application/json")) {
      sendJson(response, 415, { message: "Content-Type must be application/json." });
      return;
    }
    if (activeRequests >= MAX_CONCURRENT_REQUESTS) {
      sendJson(response, 429, { message: "Too many pending project waits." });
      return;
    }

    activeRequests += 1;
    try {
      if (request.url === PROJECT_PREPARE_PATH) {
        const envelope = parsePrepareEnvelope(await readJsonBody(request));
        const resolved = await resolveProjectWithArrivalPolling(
          envelope.request,
          resolver,
          pollingClock,
        );
        const now = tokenNow();
        for (const [token, pending] of pendingLaunches) {
          if (pending.expiresAt <= now) {
            pendingLaunches.delete(token);
          }
        }
        if (pendingLaunches.size >= MAX_PENDING_LAUNCHES) {
          sendJson(response, 429, { message: "Too many prepared project launches." });
          return;
        }
        const launchToken = randomUUID();
        pendingLaunches.set(launchToken, {
          route: envelope.route,
          request: { ...envelope.request, waitSeconds: 0 },
          source: resolved.kind,
          expiresAt: now + PROJECT_LAUNCH_TOKEN_TTL_MS,
          focusAcknowledged: false,
          focusInProgress: undefined,
        });
        const result: ProjectPreparedResponse = {
          status: "ready",
          source: resolved.kind,
          launchToken,
        };
        sendJson(response, 200, result);
      } else if (request.url === PROJECT_FOCUS_OWNER_PATH) {
        const launchToken = parseLaunchToken(await readJsonBody(request));
        const pending = pendingLaunches.get(launchToken);
        if (pending === undefined || pending.expiresAt <= tokenNow()) {
          pendingLaunches.delete(launchToken);
          throw new RequestRejectedError(
            "Prepared project launch is unknown, expired, or already used.",
          );
        }
        if (!pending.focusAcknowledged) {
          pending.focusInProgress ??= (async () => {
            await focusOwner();
            if (pending.expiresAt <= tokenNow()) {
              pendingLaunches.delete(launchToken);
              throw new RequestRejectedError(
                "Prepared project launch expired while its owner window was taking focus.",
              );
            }
            pending.focusAcknowledged = true;
          })();
          try {
            await pending.focusInProgress;
          } finally {
            pending.focusInProgress = undefined;
          }
        }
        sendJson(response, 200, { status: "focused" });
      } else {
        const launchToken = parseLaunchToken(await readJsonBody(request));
        const pending = pendingLaunches.get(launchToken);
        if (pending === undefined || pending.expiresAt <= tokenNow()) {
          pendingLaunches.delete(launchToken);
          throw new RequestRejectedError(
            "Prepared project launch is unknown, expired, or already used.",
          );
        }
        await waitForFocusAcknowledgement(
          pending,
          focusAcknowledgementWaitMs,
        );
        if (pending.expiresAt <= tokenNow()) {
          pendingLaunches.delete(launchToken);
          throw new RequestRejectedError(
            "Prepared project launch expired before its acknowledged launch.",
          );
        }
        pendingLaunches.delete(launchToken);
        const outcome = await launcher(pending.route, pending.request);
        const result: ProjectArrivalResponse = {
          status: "completed",
          source: pending.source,
          outcome,
        };
        sendJson(response, 200, result);
      }
    } catch (error) {
      if (error instanceof RequestRejectedError) {
        sendJson(response, 422, { message: error.message });
      } else {
        sendJson(response, 500, {
          message: "The local project observer failed.",
        });
      }
    } finally {
      activeRequests -= 1;
    }
  });
  server.requestTimeout = 310_000;
  server.headersTimeout = 10_000;
  server.keepAliveTimeout = 5_000;
  return server;
}

export async function startProjectArrivalHttpServer(
  resolver: ProjectTargetResolver,
  launcher: ProjectArrivalLauncher,
  port = PROJECT_ARRIVAL_PORT,
  pollingClock?: ProjectPollingClock,
  tokenNow?: () => number,
  focusOwner?: ProjectOwnerFocus,
  focusAcknowledgementWaitMs?: number,
): Promise<ProjectArrivalServerHandle> {
  const server = createProjectArrivalHttpServer(
    resolver,
    launcher,
    pollingClock,
    tokenNow,
    focusOwner,
    focusAcknowledgementWaitMs,
  );
  await new Promise<void>((resolve, reject) => {
    const onError = (error: Error): void => {
      server.off("listening", onListening);
      reject(error);
    };
    const onListening = (): void => {
      server.off("error", onError);
      resolve();
    };
    server.once("error", onError);
    server.once("listening", onListening);
    server.listen(port, PROJECT_ARRIVAL_HOST);
  });
  const address = server.address();
  if (address === null || typeof address === "string") {
    server.close();
    throw new Error("Loopback observer did not bind a TCP port.");
  }
  return {
    port: address.port,
    dispose: () => server.close(),
  };
}

export function maintainProjectArrivalHttpServer(
  resolver: ProjectTargetResolver,
  launcher: ProjectArrivalLauncher,
  focusOwner?: ProjectOwnerFocus,
): { dispose(): void } {
  let disposed = false;
  let starting = false;
  let retryTimer: NodeJS.Timeout | undefined;
  let handle: ProjectArrivalServerHandle | undefined;

  const attempt = async (): Promise<void> => {
    if (disposed || starting || handle !== undefined) {
      return;
    }
    starting = true;
    try {
      handle = await startProjectArrivalHttpServer(
        resolver,
        launcher,
        PROJECT_ARRIVAL_PORT,
        undefined,
        undefined,
        focusOwner,
        undefined,
      );
    } catch {
      if (!disposed) {
        retryTimer = setTimeout(() => void attempt(), RETRY_BIND_MS);
      }
    } finally {
      starting = false;
    }
  };

  void attempt();
  return {
    dispose: () => {
      disposed = true;
      if (retryTimer !== undefined) {
        clearTimeout(retryTimer);
      }
      handle?.dispose();
    },
  };
}
