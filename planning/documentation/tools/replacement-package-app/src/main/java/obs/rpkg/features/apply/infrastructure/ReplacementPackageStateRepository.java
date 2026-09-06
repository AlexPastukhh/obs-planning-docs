package obs.rpkg.features.apply.infrastructure;

import java.util.Optional;

import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.foundation.result.OperationResult;

public interface ReplacementPackageStateRepository {
    Optional<ReplacementPackageState> find(String changeSetId, String packageId);

    OperationResult<Failure> save(ReplacementPackageState state);

    record Failure(String message, Throwable cause) {
        public Failure {
            if (message == null || message.isBlank()) message = "Replacement package state persistence failed";
        }
    }
}
