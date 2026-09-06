package obs.rpkg.features.apply.infrastructure;

import java.nio.file.Path;

import obs.rpkg.features.apply.domain.PublicationObservation;
import obs.rpkg.foundation.result.Result;

/** Read-only confirmation boundary for one exact remote work branch. */
public interface PublicationObserver {
    Result<PublicationObservation, Failure> observe(
            Path worktree,
            String workBranch,
            String expectedRepositoryIdentity);

    record Failure(String message, Throwable cause) {
        public Failure {
            if (message == null || message.isBlank()) message = "Publication confirmation failed";
        }
    }
}
