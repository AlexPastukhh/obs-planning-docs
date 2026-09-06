package obs.rpkg.features.apply.application;

import java.util.Objects;

import obs.rpkg.Core;
import obs.rpkg.features.apply.domain.ApplyExtent;
import obs.rpkg.features.apply.domain.ApplyFailure;
import obs.rpkg.features.apply.domain.ApplyFailureCode;
import obs.rpkg.features.apply.domain.ApplyFailureDisposition;
import obs.rpkg.features.apply.domain.ApplyProgress;
import obs.rpkg.features.apply.domain.ApplyRequest;
import obs.rpkg.features.apply.domain.ApplySuccess;
import obs.rpkg.features.apply.domain.PackageApplication;
import obs.rpkg.foundation.result.Result;

/**
 * Application service for F-RPKG-APPLY-REPLACEMENT-PACKAGE.
 *
 * <p>The Feature owns typed invocation/result semantics. Current Core operations are a temporary
 * legacy capability adapter and are deliberately not exposed through this API.</p>
 */
public final class ApplyReplacementPackage {
    private final Core core;

    public ApplyReplacementPackage(Core core) {
        this.core = Objects.requireNonNull(core, "core");
    }

    public Result<ApplySuccess, ApplyFailure> execute(ApplyRequest request) {
        Objects.requireNonNull(request, "request");
        try {
            return request instanceof ApplyRequest.Start start
                    ? executeStart(start)
                    : executeResume((ApplyRequest.Resume) request);
        } catch (Core.ObsException failure) {
            return Result.failure(mapFailure(failure));
        }
    }

    private Result<ApplySuccess, ApplyFailure> executeStart(ApplyRequest.Start request) {
        Core.PackageData packageData = core.readPackage(request.archive());
        if (!request.changeSetId().equals(packageData.manifest().changeSetId())) {
            return Result.failure(new ApplyFailure(
                    ApplyFailureCode.PACKAGE_IDENTITY_MISMATCH,
                    ApplyFailureDisposition.ACTION_REQUIRED,
                    "Apply request changeSetId does not match PACKAGE.json."));
        }

        String packageId = packageData.manifest().packageId();
        Core.ChangeSet existing = core.getChangeSet(request.changeSetId());
        if (samePackage(existing, packageId)) {
            PackageApplication current = application(existing, packageId);
            boolean alreadySatisfied = current.satisfies(request.extent());
            if (alreadySatisfied) return success(request.extent(), current, true);
            return advance(request.changeSetId(), packageId, request.extent(), current, false);
        }

        Core.ApplyResult applied = core.applyPackage(request.archive(), request.repositoryRoot());
        PackageApplication current = application(applied.changeSet(), packageId);
        if (current.satisfies(request.extent())) return success(request.extent(), current, false);
        return advance(request.changeSetId(), packageId, request.extent(), current, false);
    }

    private Result<ApplySuccess, ApplyFailure> executeResume(ApplyRequest.Resume request) {
        Core.ChangeSet existing = core.getChangeSet(request.changeSetId());
        if (existing == null) {
            return Result.failure(new ApplyFailure(
                    ApplyFailureCode.STATE_DIVERGED,
                    ApplyFailureDisposition.ACTION_REQUIRED,
                    "Unknown repository work for Apply Resume: " + request.changeSetId()));
        }
        if (!samePackage(existing, request.packageId())) {
            return Result.failure(new ApplyFailure(
                    ApplyFailureCode.PACKAGE_IDENTITY_MISMATCH,
                    ApplyFailureDisposition.ACTION_REQUIRED,
                    "Apply Resume packageId does not match the durable package application."));
        }

        PackageApplication current = application(existing, request.packageId());
        if (current.satisfies(request.extent())) return success(request.extent(), current, true);
        return advance(request.changeSetId(), request.packageId(), request.extent(), current, false);
    }

    private Result<ApplySuccess, ApplyFailure> advance(
            String changeSetId,
            String packageId,
            ApplyExtent requestedExtent,
            PackageApplication current,
            boolean alreadySatisfied) {
        PackageApplication state = current;

        if (requestedExtent.requiresCommit() && state.progress() == ApplyProgress.APPLIED) {
            state = application(core.commitAppliedPackage(changeSetId).changeSet(), packageId);
        }

        if (requestedExtent.requiresPublish() && state.progress() != ApplyProgress.PUBLISHED) {
            if (state.progress() == ApplyProgress.APPLIED) {
                state = application(core.commitAppliedPackage(changeSetId).changeSet(), packageId);
            }
            if (state.progress() == ApplyProgress.COMMITTED
                    || state.progress() == ApplyProgress.PUBLICATION_UNCERTAIN) {
                state = application(core.publishAppliedCommit(changeSetId).changeSet(), packageId);
            }
        }

        if (!state.satisfies(requestedExtent)) {
            return Result.failure(new ApplyFailure(
                    ApplyFailureCode.STATE_DIVERGED,
                    ApplyFailureDisposition.ACTION_REQUIRED,
                    "Apply progression did not reach the requested extent."));
        }
        return success(requestedExtent, state, alreadySatisfied);
    }

    private static Result<ApplySuccess, ApplyFailure> success(
            ApplyExtent requestedExtent,
            PackageApplication application,
            boolean alreadySatisfied) {
        return Result.success(new ApplySuccess(requestedExtent, application, alreadySatisfied));
    }

    private static boolean samePackage(Core.ChangeSet state, String packageId) {
        return state != null && packageId != null && packageId.equals(state.lastPackageId);
    }

    private static PackageApplication application(Core.ChangeSet state, String packageId) {
        if (state == null) {
            throw new Core.ObsException(Core.STATE_DIVERGED, "Apply lost durable ChangeSet state.");
        }
        if (state.changeSetId == null || state.changeSetId.isBlank()) {
            throw new Core.ObsException(Core.STATE_DIVERGED, "Apply ChangeSet identity is unavailable.");
        }
        if (!packageId.equals(state.lastPackageId)) {
            throw new Core.ObsException(Core.STATE_DIVERGED, "Durable Apply state belongs to a different package.");
        }

        ApplyProgress progress = switch (String.valueOf(state.executionState)) {
            case "AppliedUncommitted" -> ApplyProgress.APPLIED;
            case "CommittedUnpublished" -> requireCommit(state, ApplyProgress.COMMITTED);
            case "PublicationUncertain" -> requireCommit(state, ApplyProgress.PUBLICATION_UNCERTAIN);
            case "Ready" -> requirePublished(state);
            default -> throw new Core.ObsException(
                    Core.STATE_DIVERGED,
                    "Unsupported durable Apply execution state: " + state.executionState);
        };

        return new PackageApplication(
                state.changeSetId,
                packageId,
                progress,
                state.commitSha,
                state.publishedTip);
    }

    private static ApplyProgress requireCommit(Core.ChangeSet state, ApplyProgress progress) {
        if (state.commitSha == null || state.commitSha.isBlank()) {
            throw new Core.ObsException(Core.STATE_DIVERGED, progress + " is missing exact commit identity.");
        }
        return progress;
    }

    private static ApplyProgress requirePublished(Core.ChangeSet state) {
        if (state.commitSha == null || state.commitSha.isBlank()
                || state.publishedTip == null || state.publishedTip.isBlank()
                || !state.commitSha.equals(state.publishedTip)) {
            throw new Core.ObsException(
                    Core.STATE_DIVERGED,
                    "Ready package application is not proven at one exact published commit.");
        }
        return ApplyProgress.PUBLISHED;
    }

    private static ApplyFailure mapFailure(Core.ObsException error) {
        String code = error.code;
        ApplyFailureCode typed;
        ApplyFailureDisposition disposition;

        if (Core.PACKAGE_INVALID.equals(code) || Core.PACKAGE_NOT_FOUND.equals(code)) {
            typed = ApplyFailureCode.INVALID_PACKAGE;
            disposition = ApplyFailureDisposition.ACTION_REQUIRED;
        } else if (Core.ACTION_PACKAGE_MISMATCH.equals(code)) {
            typed = ApplyFailureCode.PACKAGE_IDENTITY_MISMATCH;
            disposition = ApplyFailureDisposition.ACTION_REQUIRED;
        } else if (Core.REPOSITORY_MISMATCH.equals(code)) {
            typed = ApplyFailureCode.REPOSITORY_MISMATCH;
            disposition = ApplyFailureDisposition.ACTION_REQUIRED;
        } else if (Core.SOURCE_STATE_CHANGED.equals(code) || Core.BASE_MISMATCH.equals(code)) {
            typed = ApplyFailureCode.EXPECTED_SOURCE_CHANGED;
            disposition = ApplyFailureDisposition.ACTION_REQUIRED;
        } else if (Core.SOURCE_STATE_UNVERIFIABLE.equals(code)) {
            typed = ApplyFailureCode.EXPECTED_SOURCE_UNVERIFIABLE;
            disposition = ApplyFailureDisposition.ACTION_REQUIRED;
        } else if (Core.REPOSITORY_NOT_READY.equals(code) || Core.REPOSITORY_SELECTION_REQUIRED.equals(code)) {
            typed = ApplyFailureCode.REPOSITORY_NOT_READY;
            disposition = ApplyFailureDisposition.ACTION_REQUIRED;
        } else if (Core.APPLY_ROLLBACK_UNVERIFIED.equals(code)) {
            typed = ApplyFailureCode.ROLLBACK_UNVERIFIED;
            disposition = ApplyFailureDisposition.UNCERTAIN;
        } else if (Core.COMMIT_FAILED.equals(code)) {
            typed = ApplyFailureCode.COMMIT_FAILED;
            disposition = ApplyFailureDisposition.RETRYABLE;
        } else if (Core.PUBLISH_FAILED.equals(code)) {
            typed = ApplyFailureCode.PUBLISH_FAILED;
            disposition = ApplyFailureDisposition.RETRYABLE;
        } else if (Core.PUBLICATION_UNCERTAIN.equals(code)) {
            typed = ApplyFailureCode.PUBLICATION_UNCERTAIN;
            disposition = ApplyFailureDisposition.UNCERTAIN;
        } else if (Core.REMOTE_BRANCH_DIVERGED.equals(code)) {
            typed = ApplyFailureCode.REMOTE_BRANCH_DIVERGED;
            disposition = ApplyFailureDisposition.ACTION_REQUIRED;
        } else if (Core.STATE_DIVERGED.equals(code) || Core.PATH_OWNERSHIP_CONFLICT.equals(code)) {
            typed = ApplyFailureCode.STATE_DIVERGED;
            disposition = ApplyFailureDisposition.ACTION_REQUIRED;
        } else {
            typed = ApplyFailureCode.UNEXPECTED_LEGACY_FAILURE;
            disposition = ApplyFailureDisposition.TERMINAL;
        }

        return new ApplyFailure(typed, disposition, error.getMessage());
    }
}
