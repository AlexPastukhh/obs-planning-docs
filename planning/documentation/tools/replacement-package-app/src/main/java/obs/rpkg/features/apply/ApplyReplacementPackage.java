package obs.rpkg.features.apply;

import java.nio.file.Path;
import java.util.Objects;

import obs.rpkg.Core;

/**
 * Feature-local application service for F-RPKG-APPLY-REPLACEMENT-PACKAGE.
 *
 * <p>This is intentionally introduced beside the legacy Core orchestration first.
 * It owns the selected Apply extent while delegating already-proven Apply/Commit/Publish
 * mechanics to Core until those mechanics are extracted behind narrower capabilities.</p>
 */
public final class ApplyReplacementPackage {
    private final Core core;

    public ApplyReplacementPackage(Core core) {
        this.core = Objects.requireNonNull(core, "core");
    }

    public record Request(
            Path archive,
            Path repositoryRoot,
            String changeSetId,
            ApplyExtent extent) {
        public Request {
            Objects.requireNonNull(archive, "archive");
            Objects.requireNonNull(repositoryRoot, "repositoryRoot");
            if (changeSetId == null || changeSetId.isBlank()) {
                throw new IllegalArgumentException("changeSetId is required");
            }
            Objects.requireNonNull(extent, "extent");
        }
    }

    public record Result(
            String changeSetId,
            String packageId,
            ApplyExtent requestedExtent,
            String executionState,
            String commitSha,
            String publishedTip) {}

    public Result execute(Request request) {
        Objects.requireNonNull(request, "request");

        Core.PackageData packageData = core.readPackage(request.archive());
        if (!request.changeSetId().equals(packageData.manifest().changeSetId())) {
            throw new Core.ObsException(
                    Core.ACTION_PACKAGE_MISMATCH,
                    "Apply request changeSetId does not match PACKAGE.json.");
        }

        Core.ApplyResult applied = core.applyPackage(request.archive(), request.repositoryRoot());
        Core.ChangeSet state = requireState(applied.changeSet(), request.changeSetId());

        if (request.extent().requiresCommit() && "AppliedUncommitted".equals(state.executionState)) {
            state = requireState(core.commitAppliedPackage(request.changeSetId()).changeSet(), request.changeSetId());
        }

        if (request.extent().requiresPublish()) {
            if ("AppliedUncommitted".equals(state.executionState)) {
                state = requireState(core.commitAppliedPackage(request.changeSetId()).changeSet(), request.changeSetId());
            }
            if ("CommittedUnpublished".equals(state.executionState)
                    || "PublicationUncertain".equals(state.executionState)) {
                state = requireState(core.publishAppliedCommit(request.changeSetId()).changeSet(), request.changeSetId());
            }
        }

        return new Result(
                state.changeSetId,
                state.lastPackageId,
                request.extent(),
                state.executionState,
                state.commitSha,
                state.publishedTip);
    }

    private static Core.ChangeSet requireState(Core.ChangeSet state, String expectedChangeSetId) {
        if (state == null || !expectedChangeSetId.equals(state.changeSetId)) {
            throw new Core.ObsException(
                    Core.STATE_DIVERGED,
                    "Apply Replacement Package lost the selected ChangeSet state.");
        }
        return state;
    }
}
