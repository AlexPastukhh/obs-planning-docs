package obs.rpkg.features.apply.application;

import java.util.Optional;

import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.features.apply.infrastructure.ReplacementPackageStateRepository;
import obs.rpkg.foundation.result.OperationResult;
import obs.rpkg.work.domain.WorkId;

/** State-repository access for the new-model package owner. No legacy state projection exists. */
final class ReplacementPackageStateAccess {
    private ReplacementPackageStateAccess() {}

    static ReplacementPackageStateRepository.WorkLock lockOrThrow(
            ReplacementPackageStateRepository repository,
            WorkId workId) {
        try {
            return repository.lock(workId);
        } catch (RuntimeException e) {
            throw new StatePersistenceException("Cannot acquire Work state lock", e);
        }
    }

    static Optional<ReplacementPackageState> findOrThrow(
            ReplacementPackageStateRepository repository,
            WorkId workId,
            String packageId) {
        try {
            return repository.find(workId, packageId);
        } catch (RuntimeException e) {
            throw new StatePersistenceException("Cannot read replacement-package state", e);
        }
    }

    static Optional<ReplacementPackageState> findUnfinishedOrThrow(
            ReplacementPackageStateRepository repository,
            WorkId workId) {
        try {
            return repository.findUnfinished(workId);
        } catch (RuntimeException e) {
            throw new StatePersistenceException("Cannot read unfinished replacement-package state", e);
        }
    }

    static void saveOrThrow(ReplacementPackageStateRepository repository, ReplacementPackageState state) {
        OperationResult<ReplacementPackageStateRepository.Failure> result;
        try {
            result = repository.save(state);
        } catch (RuntimeException e) {
            throw new StatePersistenceException("Replacement-package state persistence failed", e);
        }
        if (result.isFailure()) {
            ReplacementPackageStateRepository.Failure failure = result.failure().orElseThrow();
            throw new StatePersistenceException(failure.message(), failure.cause());
        }
    }

    static final class StatePersistenceException extends RuntimeException {
        StatePersistenceException(String message, Throwable cause) { super(message, cause); }
    }
}
