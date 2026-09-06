package obs.rpkg.features.apply.infrastructure;

import obs.rpkg.GitTransport;
import obs.rpkg.features.apply.domain.PublicationObservation;
import obs.rpkg.foundation.result.Result;

/** Read-only confirmation boundary for one exact remote work branch. */
public interface PublicationObserver {
    Result<PublicationObservation, Failure> observe(
            String workBranch,
            GitTransport.Endpoint endpoint);

    record Failure(String message, Throwable cause) {
        public Failure {
            if (message == null || message.isBlank()) message = "Publication confirmation failed";
        }
    }
}
