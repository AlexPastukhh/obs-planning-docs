package obs.rpkg.features.apply.infrastructure;

import java.util.Optional;

import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.foundation.result.OperationResult;
import obs.rpkg.work.domain.WorkId;

public interface ReplacementPackageStateRepository {
    Optional<ReplacementPackageState> find(WorkId workId, String packageId);

    /** Unique unfinished package realization for this Work; empty when all known packages are completed. */
    Optional<ReplacementPackageState> findUnfinished(WorkId workId);


    OperationResult<Failure> save(ReplacementPackageState state);


    record Failure(String message, Throwable cause) {
        public Failure {
            if (message == null || message.isBlank()) message = "Replacement package state persistence failed";
        }
    }
}
