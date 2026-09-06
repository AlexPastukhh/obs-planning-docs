package obs.rpkg.features.apply.application;

import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.features.apply.infrastructure.ReplacementPackageStateRepository;
import obs.rpkg.foundation.result.OperationResult;

/** Small application helper for persisting the new-model package state. No legacy state projection exists. */
final class ReplacementPackageStateAccess {
    private ReplacementPackageStateAccess() {}

    static void saveOrThrow(ReplacementPackageStateRepository repository, ReplacementPackageState state) {
        OperationResult<ReplacementPackageStateRepository.Failure> result = repository.save(state);
        if (result.isFailure()) {
            ReplacementPackageStateRepository.Failure failure = result.failure().orElseThrow();
            throw new StatePersistenceException(failure.message(), failure.cause());
        }
    }

    static final class StatePersistenceException extends RuntimeException {
        StatePersistenceException(String message, Throwable cause) { super(message, cause); }
    }
}
