package obs.rpkg.features.apply.infrastructure;

import java.util.Optional;

import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.foundation.result.OperationResult;
import obs.rpkg.work.domain.WorkId;

public interface ReplacementPackageStateRepository {
    Optional<ReplacementPackageState> find(WorkId workId, String packageId);

    /** Unique unfinished package realization for this Work; empty when all known packages are completed. */
    Optional<ReplacementPackageState> findUnfinished(WorkId workId);

    /**
     * Serialize one Work mutation boundary across repository instances/processes.
     * Implementations must support re-entrant acquisition on the same thread.
     */
    WorkLock lock(WorkId workId);

    OperationResult<Failure> save(ReplacementPackageState state);

    interface WorkLock extends AutoCloseable {
        @Override void close();
    }

    record Failure(String message, Throwable cause) {
        public Failure {
            if (message == null || message.isBlank()) message = "Replacement package state persistence failed";
        }
    }
}
