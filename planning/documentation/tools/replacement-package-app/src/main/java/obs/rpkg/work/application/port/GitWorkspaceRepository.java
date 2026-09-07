package obs.rpkg.work.application.port;

import java.util.Optional;

import obs.rpkg.foundation.result.OperationResult;
import obs.rpkg.work.domain.GitWorkspace;
import obs.rpkg.work.domain.WorkId;

public interface GitWorkspaceRepository {
    Optional<GitWorkspace> find(WorkId workId);
    OperationResult<Failure> save(GitWorkspace workspace);

    record Failure(String message, Throwable cause) {
        public Failure {
            if (message == null || message.isBlank()) message = "Git workspace persistence failed";
        }
    }
}
