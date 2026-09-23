import type { OpenProjectRequest } from "../contracts";
import {
  ProjectNotFoundError,
  type ProjectTargetResolver,
  type ResolvedProjectSource,
} from "../../domain/local-project-selector/projectTargetResolver";

export const PROJECT_POLL_INTERVAL_MS = 500;

export interface ProjectPollingClock {
  now(): number;
  wait(milliseconds: number): Promise<void>;
}

const systemClock: ProjectPollingClock = {
  now: () => Date.now(),
  wait: (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds)),
};

export async function resolveProjectWithArrivalPolling(
  request: OpenProjectRequest,
  resolver: ProjectTargetResolver,
  clock: ProjectPollingClock = systemClock,
): Promise<ResolvedProjectSource> {
  const waitSeconds = request.waitSeconds ?? 0;
  const deadline = clock.now() + waitSeconds * 1000;

  while (true) {
    try {
      return await resolver.resolve(request.project);
    } catch (error) {
      if (!(error instanceof ProjectNotFoundError)) {
        throw error;
      }

      const remaining = deadline - clock.now();
      if (remaining <= 0) {
        if (waitSeconds === 0) {
          throw error;
        }
        throw new ProjectNotFoundError(
          `No project directory or matching .zip archive appeared within ${waitSeconds} seconds.`,
        );
      }

      await clock.wait(Math.min(PROJECT_POLL_INTERVAL_MS, remaining));
    }
  }
}
