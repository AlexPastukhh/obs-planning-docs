package obs.rpkg.features.apply.application;

import java.util.Optional;

import obs.rpkg.Core;
import obs.rpkg.features.apply.domain.PublicationObservation;
import obs.rpkg.features.apply.domain.ReplacementPackageIdentity;
import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.features.apply.infrastructure.ReplacementPackageStateRepository;
import obs.rpkg.foundation.result.OperationResult;

final class ReplacementPackageStateAccess {
    private ReplacementPackageStateAccess() {}

    static Optional<ReplacementPackageState> loadOrMigrate(
            Core core,
            ReplacementPackageStateRepository repository,
            String changeSetId,
            String packageId) {
        Optional<ReplacementPackageState> current = repository.find(changeSetId, packageId);
        if (current.isPresent()) return current;

        Core.ChangeSet legacy = core.getChangeSet(changeSetId);
        if (legacy == null || packageId == null || !packageId.equals(legacy.lastPackageId)) {
            return Optional.empty();
        }

        ReplacementPackageState migrated = fromLegacy(legacy, packageId);
        saveOrThrow(repository, migrated);
        return Optional.of(migrated);
    }

    static ReplacementPackageState fromLegacy(Core.ChangeSet state, String packageId) {
        if (state == null) throw new IllegalStateException("Legacy ChangeSet state is unavailable");
        if (state.changeSetId == null || state.changeSetId.isBlank()) {
            throw new IllegalStateException("Legacy ChangeSet identity is unavailable");
        }
        if (packageId == null || !packageId.equals(state.lastPackageId)) {
            throw new IllegalStateException("Legacy ChangeSet belongs to a different package");
        }

        String execution = state.executionState;
        if (execution == null || execution.isBlank()) {
            return new ReplacementPackageState(
                    state.changeSetId,
                    new ReplacementPackageIdentity(packageId, null),
                    true,
                    null,
                    new PublicationObservation.NotRequested());
        }

        return switch (execution) {
            case "AppliedUncommitted" -> new ReplacementPackageState(
                    state.changeSetId,
                    new ReplacementPackageIdentity(packageId, null),
                    true,
                    null,
                    new PublicationObservation.NotRequested());
            case "CommittedUnpublished" -> new ReplacementPackageState(
                    state.changeSetId,
                    new ReplacementPackageIdentity(packageId, null),
                    true,
                    requireCommit(state),
                    new PublicationObservation.NotRequested());
            case "PublicationUncertain" -> new ReplacementPackageState(
                    state.changeSetId,
                    new ReplacementPackageIdentity(packageId, null),
                    true,
                    requireCommit(state),
                    new PublicationObservation.NotConfirmed());
            case "Ready" -> {
                String commit = requireCommit(state);
                if (state.publishedTip == null || state.publishedTip.isBlank()
                        || !commit.equals(state.publishedTip)) {
                    throw new IllegalStateException("Legacy Ready state has no exact published-tip proof");
                }
                yield new ReplacementPackageState(
                        state.changeSetId,
                        new ReplacementPackageIdentity(packageId, null),
                        true,
                        commit,
                        new PublicationObservation.ConfirmedTip(state.publishedTip));
            }
            default -> throw new IllegalStateException(
                    "Unsupported legacy package execution state: " + execution);
        };
    }

    static void saveOrThrow(
            ReplacementPackageStateRepository repository,
            ReplacementPackageState state) {
        OperationResult<ReplacementPackageStateRepository.Failure> result = repository.save(state);
        if (result.isFailure()) {
            ReplacementPackageStateRepository.Failure failure = result.failure().orElseThrow();
            throw new StatePersistenceException(failure.message(), failure.cause());
        }
    }

    private static String requireCommit(Core.ChangeSet state) {
        if (state.commitSha == null || state.commitSha.isBlank()) {
            throw new IllegalStateException("Committed legacy package state is missing exact commit identity");
        }
        return state.commitSha;
    }

    static final class StatePersistenceException extends RuntimeException {
        StatePersistenceException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}
