package obs.rpkg.features.apply.application;

import java.util.Objects;
import java.util.Optional;

import obs.rpkg.Core;
import obs.rpkg.features.apply.domain.ApplyExtent;
import obs.rpkg.features.apply.domain.ApplyFailure;
import obs.rpkg.features.apply.domain.ApplyFailureCode;
import obs.rpkg.features.apply.domain.ApplyFailureDisposition;
import obs.rpkg.features.apply.domain.ApplyRequest;
import obs.rpkg.features.apply.domain.ApplySuccess;
import obs.rpkg.features.apply.domain.PackageApplication;
import obs.rpkg.features.apply.domain.PublicationConfirmationState;
import obs.rpkg.foundation.result.Result;

/**
 * Application service for F-RPKG-APPLY-REPLACEMENT-PACKAGE.
 *
 * <p>Success/failure belongs to this concrete invocation. PackageApplication separately describes
 * facts already proven about Apply, Commit and publication confirmation. Current Core operations are
 * a temporary legacy capability adapter and are deliberately not exposed through this API.</p>
 */
public final class ApplyReplacementPackage {
    private final Core core;

    public ApplyReplacementPackage(Core core) {
        this.core = Objects.requireNonNull(core, "core");
    }

    public Result<ApplySuccess, ApplyFailure> execute(ApplyRequest request) {
        Objects.requireNonNull(request, "request");
        return request instanceof ApplyRequest.Start start
                ? executeStart(start)
                : executeResume((ApplyRequest.Resume) request);
    }

    private Result<ApplySuccess, ApplyFailure> executeStart(ApplyRequest.Start request) {
        Core.PackageData packageData;
        try {
            packageData = core.readPackage(request.archive());
        } catch (Core.ObsException failure) {
            return failure(failure, request.changeSetId(), null);
        }

        if (!request.changeSetId().equals(packageData.manifest().changeSetId())) {
            return Result.failure(new ApplyFailure(
                    ApplyFailureCode.PACKAGE_IDENTITY_MISMATCH,
                    ApplyFailureDisposition.ACTION_REQUIRED,
                    "Apply request changeSetId does not match PACKAGE.json."));
        }

        String packageId = packageData.manifest().packageId();
        try {
            Core.ChangeSet existing = core.getChangeSet(request.changeSetId());
            if (samePackage(existing, packageId)) {
                PackageApplication current = application(existing, packageId);
                if (current.satisfies(request.extent())) return success(request.extent(), current, true);
                return advance(request.changeSetId(), packageId, request.extent(), current, false);
            }

            Core.ApplyResult applied = core.applyPackage(request.archive(), request.repositoryRoot());
            PackageApplication current = application(applied.changeSet(), packageId);
            if (current.satisfies(request.extent())) return success(request.extent(), current, false);
            return advance(request.changeSetId(), packageId, request.extent(), current, false);
        } catch (Core.ObsException failure) {
            return failure(failure, request.changeSetId(), packageId);
        }
    }

    private Result<ApplySuccess, ApplyFailure> executeResume(ApplyRequest.Resume request) {
        try {
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
        } catch (Core.ObsException failure) {
            return failure(failure, request.changeSetId(), request.packageId());
        }
    }

    private Result<ApplySuccess, ApplyFailure> advance(
            String changeSetId,
            String packageId,
            ApplyExtent requestedExtent,
            PackageApplication current,
            boolean alreadySatisfied) {
        PackageApplication state = current;

        if (requestedExtent.requiresCommit() && !state.isCommitted()) {
            state = application(core.commitAppliedPackage(changeSetId).changeSet(), packageId);
        }

        if (requestedExtent.requiresPublish() && !state.isPublished()) {
            if (!state.isCommitted()) {
                state = application(core.commitAppliedPackage(changeSetId).changeSet(), packageId);
            }
            state = application(core.publishAppliedCommit(changeSetId).changeSet(), packageId);
        }

        if (!state.satisfies(requestedExtent)) {
            return Result.failure(new ApplyFailure(
                    ApplyFailureCode.STATE_DIVERGED,
                    ApplyFailureDisposition.ACTION_REQUIRED,
                    "Apply operation completed without proving the requested terminal state.",
                    state));
        }
        return success(requestedExtent, state, alreadySatisfied);
    }

    private Result<ApplySuccess, ApplyFailure> failure(
            Core.ObsException error,
            String changeSetId,
            String packageId) {
        return Result.failure(mapFailure(error, currentApplication(changeSetId, packageId, error)));
    }

    private Optional<PackageApplication> currentApplication(
            String changeSetId,
            String packageId,
            Core.ObsException error) {
        if (changeSetId == null || packageId == null) return Optional.empty();
        try {
            Core.ChangeSet state = core.getChangeSet(changeSetId);
            if (!samePackage(state, packageId)) return Optional.empty();
            PackageApplication current = application(state, packageId);
            if (Core.PUBLISH_FAILED.equals(error.code) || Core.REMOTE_BRANCH_DIVERGED.equals(error.code)) {
                current = current.withPublicationConfirmation(PublicationConfirmationState.CONFIRMED);
            } else if (Core.PUBLICATION_UNCERTAIN.equals(error.code)) {
                current = current.withPublicationConfirmation(PublicationConfirmationState.NOT_CONFIRMED);
            }
            return Optional.of(current);
        } catch (Throwable ignored) {
            return Optional.empty();
        }
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

        return switch (String.valueOf(state.executionState)) {
            case "AppliedUncommitted" -> new PackageApplication(
                    state.changeSetId,
                    packageId,
                    null,
                    PublicationConfirmationState.NOT_REQUESTED,
                    state.publishedTip);
            case "CommittedUnpublished" -> new PackageApplication(
                    state.changeSetId,
                    packageId,
                    requireCommit(state),
                    PublicationConfirmationState.NOT_REQUESTED,
                    state.publishedTip);
            case "PublicationUncertain" -> new PackageApplication(
                    state.changeSetId,
                    packageId,
                    requireCommit(state),
                    PublicationConfirmationState.NOT_CONFIRMED,
                    state.publishedTip);
            case "Ready" -> requirePublished(state, packageId);
            default -> throw new Core.ObsException(
                    Core.STATE_DIVERGED,
                    "Unsupported durable Apply execution state: " + state.executionState);
        };
    }

    private static String requireCommit(Core.ChangeSet state) {
        if (state.commitSha == null || state.commitSha.isBlank()) {
            throw new Core.ObsException(Core.STATE_DIVERGED, "Committed package application is missing exact commit identity.");
        }
        return state.commitSha;
    }

    private static PackageApplication requirePublished(Core.ChangeSet state, String packageId) {
        String commitSha = requireCommit(state);
        if (state.publishedTip == null || state.publishedTip.isBlank()
                || !commitSha.equals(state.publishedTip)) {
            throw new Core.ObsException(
                    Core.STATE_DIVERGED,
                    "Ready package application is not proven at one exact published commit.");
        }
        return new PackageApplication(
                state.changeSetId,
                packageId,
                commitSha,
                PublicationConfirmationState.CONFIRMED,
                state.publishedTip);
    }

    private static ApplyFailure mapFailure(
            Core.ObsException error,
            Optional<PackageApplication> currentApplication) {
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

        return new ApplyFailure(typed, disposition, error.getMessage(), currentApplication);
    }
}
