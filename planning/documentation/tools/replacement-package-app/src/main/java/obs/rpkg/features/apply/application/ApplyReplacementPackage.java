package obs.rpkg.features.apply.application;

import java.nio.file.Path;
import java.util.Objects;
import java.util.Optional;

import obs.rpkg.Core;
import obs.rpkg.features.apply.domain.ApplyFailure;
import obs.rpkg.features.apply.domain.ApplyFailureCode;
import obs.rpkg.features.apply.domain.OperationFailureDisposition;
import obs.rpkg.features.apply.domain.PublicationObservation;
import obs.rpkg.features.apply.domain.ReplacementPackageIdentity;
import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.features.apply.infrastructure.ReplacementPackageStateRepository;
import obs.rpkg.foundation.result.Result;
import obs.rpkg.work.domain.WorkId;

/** Application service for the concrete Apply Package operation. */
public final class ApplyReplacementPackage {
    private final Core core;
    private final ReplacementPackageStateRepository states;

    public ApplyReplacementPackage(Core core, ReplacementPackageStateRepository states) {
        this.core = Objects.requireNonNull(core, "core");
        this.states = Objects.requireNonNull(states, "states");
    }

    /** changeSetId remains the schema-1 wire name; application/domain converts it immediately to WorkId. */
    public record Request(Path archive, Path repositoryRoot, String changeSetId) {
        public Request {
            Objects.requireNonNull(archive, "archive");
            Objects.requireNonNull(repositoryRoot, "repositoryRoot");
            if (changeSetId == null || changeSetId.isBlank()) throw new IllegalArgumentException("changeSetId is required");
        }
        WorkId workId() { return new WorkId(changeSetId); }
    }

    public Result<ReplacementPackageState, ApplyFailure> execute(Request request) {
        Objects.requireNonNull(request, "request");
        WorkId workId = request.workId();

        Core.PackageData packageData;
        try { packageData = core.readPackage(request.archive()); }
        catch (Core.ObsException e) { return Result.failure(mapFailure(e, Optional.empty())); }

        if (!workId.value().equals(packageData.manifest().changeSetId())) {
            return Result.failure(new ApplyFailure(
                    ApplyFailureCode.PACKAGE_IDENTITY_MISMATCH,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    "WorkId does not match PACKAGE.json changeSetId wire identity."));
        }

        ReplacementPackageIdentity exactIdentity = new ReplacementPackageIdentity(
                packageData.manifest().packageId(), packageData.archiveSha256());

        try (ReplacementPackageStateRepository.WorkLock ignored =
                     ReplacementPackageStateAccess.lockOrThrow(states, workId)) {
            return executeLocked(request, workId, exactIdentity);
        } catch (ReplacementPackageStateAccess.StatePersistenceException e) {
            return Result.failure(new ApplyFailure(
                    ApplyFailureCode.STATE_PERSISTENCE_FAILED,
                    OperationFailureDisposition.ACTION_REQUIRED, e.getMessage()));
        } catch (IllegalStateException e) {
            return Result.failure(new ApplyFailure(
                    ApplyFailureCode.STATE_DIVERGED,
                    OperationFailureDisposition.ACTION_REQUIRED, e.getMessage()));
        }
    }

    private Result<ReplacementPackageState, ApplyFailure> executeLocked(
            Request request,
            WorkId workId,
            ReplacementPackageIdentity exactIdentity) {
        try {
            Optional<ReplacementPackageState> existing =
                    ReplacementPackageStateAccess.findOrThrow(states, workId, exactIdentity.packageId());
            if (existing.isPresent()) {
                ReplacementPackageState current = existing.get();
                if (!current.packageIdentity().sameExactArchive(exactIdentity)) {
                    return Result.failure(new ApplyFailure(
                            ApplyFailureCode.PACKAGE_IDENTITY_MISMATCH,
                            OperationFailureDisposition.ACTION_REQUIRED,
                            "packageId matches durable state but archiveSha256 differs.", current));
                }
                return Result.success(current);
            }

            Optional<ReplacementPackageState> unfinished =
                    ReplacementPackageStateAccess.findUnfinishedOrThrow(states, workId);
            if (unfinished.isPresent()) {
                return Result.failure(new ApplyFailure(
                        ApplyFailureCode.STATE_DIVERGED,
                        OperationFailureDisposition.ACTION_REQUIRED,
                        "Work already has a different unfinished replacement package.", unfinished.get()));
            }

            core.applyPackage(request.archive(), request.repositoryRoot());
            ReplacementPackageState state = new ReplacementPackageState(
                    workId, exactIdentity, null, new PublicationObservation.NotRequested());
            ReplacementPackageStateAccess.saveOrThrow(states, state);
            return Result.success(state);
        } catch (Core.ObsException e) {
            Optional<ReplacementPackageState> current =
                    ReplacementPackageStateAccess.findOrThrow(states, workId, exactIdentity.packageId());
            return Result.failure(mapFailure(e, current));
        }
    }

    private static ApplyFailure mapFailure(
            Core.ObsException error,
            Optional<ReplacementPackageState> current) {
        ApplyFailureCode code;
        OperationFailureDisposition disposition;
        if (Core.PACKAGE_INVALID.equals(error.code) || Core.PACKAGE_NOT_FOUND.equals(error.code)) {
            code = ApplyFailureCode.INVALID_PACKAGE;
            disposition = OperationFailureDisposition.ACTION_REQUIRED;
        } else if (Core.ACTION_PACKAGE_MISMATCH.equals(error.code)) {
            code = ApplyFailureCode.PACKAGE_IDENTITY_MISMATCH;
            disposition = OperationFailureDisposition.ACTION_REQUIRED;
        } else if (Core.REPOSITORY_MISMATCH.equals(error.code)) {
            code = ApplyFailureCode.REPOSITORY_MISMATCH;
            disposition = OperationFailureDisposition.ACTION_REQUIRED;
        } else if (Core.SOURCE_STATE_CHANGED.equals(error.code) || Core.BASE_MISMATCH.equals(error.code)) {
            code = ApplyFailureCode.EXPECTED_SOURCE_CHANGED;
            disposition = OperationFailureDisposition.ACTION_REQUIRED;
        } else if (Core.SOURCE_STATE_UNVERIFIABLE.equals(error.code)) {
            code = ApplyFailureCode.EXPECTED_SOURCE_UNVERIFIABLE;
            disposition = OperationFailureDisposition.ACTION_REQUIRED;
        } else if (Core.REPOSITORY_NOT_READY.equals(error.code)
                || Core.REPOSITORY_SELECTION_REQUIRED.equals(error.code)) {
            code = ApplyFailureCode.REPOSITORY_NOT_READY;
            disposition = OperationFailureDisposition.ACTION_REQUIRED;
        } else if (Core.APPLY_ROLLBACK_UNVERIFIED.equals(error.code)) {
            code = ApplyFailureCode.ROLLBACK_UNVERIFIED;
            disposition = OperationFailureDisposition.UNCERTAIN;
        } else if (Core.STATE_DIVERGED.equals(error.code)
                || Core.PATH_OWNERSHIP_CONFLICT.equals(error.code)) {
            code = ApplyFailureCode.STATE_DIVERGED;
            disposition = OperationFailureDisposition.ACTION_REQUIRED;
        } else {
            code = ApplyFailureCode.UNEXPECTED_LEGACY_FAILURE;
            disposition = OperationFailureDisposition.TERMINAL;
        }
        return new ApplyFailure(code, disposition, error.getMessage(), current);
    }
}
