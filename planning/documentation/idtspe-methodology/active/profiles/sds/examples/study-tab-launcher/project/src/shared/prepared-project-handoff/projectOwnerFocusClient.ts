import { request } from "node:http";

import {
  PROJECT_ARRIVAL_HEADER,
  PROJECT_ARRIVAL_HEADER_VALUE,
  PROJECT_ARRIVAL_HOST,
  PROJECT_ARRIVAL_PORT,
  PROJECT_FOCUS_OWNER_PATH,
} from "./projectArrivalServer";

const RESPONSE_LIMIT_BYTES = 4 * 1024;
const REQUEST_TIMEOUT_MS = 2_000;

export async function signalProjectOwnerFocus(launchToken: string): Promise<void> {
  const body = JSON.stringify({ launchToken });
  await new Promise<void>((resolve, reject) => {
    const outgoing = request(
      {
        host: PROJECT_ARRIVAL_HOST,
        port: PROJECT_ARRIVAL_PORT,
        path: PROJECT_FOCUS_OWNER_PATH,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          [PROJECT_ARRIVAL_HEADER]: PROJECT_ARRIVAL_HEADER_VALUE,
        },
        timeout: REQUEST_TIMEOUT_MS,
      },
      (response) => {
        const chunks: Buffer[] = [];
        let bytes = 0;
        response.on("data", (chunk: Buffer) => {
          bytes += chunk.length;
          if (bytes <= RESPONSE_LIMIT_BYTES) {
            chunks.push(chunk);
          }
        });
        response.on("end", () => {
          const responseBody = Buffer.concat(chunks).toString("utf8");
          if (response.statusCode === 200) {
            resolve();
          } else {
            reject(
              new Error(
                `Coordinator focus acknowledgement failed (HTTP ${String(response.statusCode)}): ${responseBody}`,
              ),
            );
          }
        });
      },
    );
    outgoing.once("timeout", () => outgoing.destroy(new Error("Coordinator focus acknowledgement timed out.")));
    outgoing.once("error", reject);
    outgoing.end(body);
  });
}
