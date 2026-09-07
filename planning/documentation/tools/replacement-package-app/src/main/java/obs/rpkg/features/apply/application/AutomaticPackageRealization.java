package obs.rpkg.features.apply.application;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import obs.rpkg.Core;
import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.foundation.result.Result;
import obs.rpkg.work.application.StartWorkWorkspace;
import obs.rpkg.work.domain.GitWorkspace;
import obs.rpkg.work.domain.WorkId;

/** Scenario/entry composition for OBS-ACTION apply-package. Not a Domain Feature aggregate. */
public final class AutomaticPackageRealization {
    private final Core core;
    private final StartWorkWorkspace startWorkspace;
    private final ApplyReplacementPackage apply;
    private final CommitAppliedPackage commit;
    private final PublishAppliedCommit publish;

    public AutomaticPackageRealization(
            Core core,
            StartWorkWorkspace startWorkspace,
            ApplyReplacementPackage apply,
            CommitAppliedPackage commit,
            PublishAppliedCommit publish) {
        this.core = Objects.requireNonNull(core, "core");
        this.startWorkspace = Objects.requireNonNull(startWorkspace, "startWorkspace");
        this.apply = Objects.requireNonNull(apply, "apply");
        this.commit = Objects.requireNonNull(commit, "commit");
        this.publish = Objects.requireNonNull(publish, "publish");
    }

    public Result<Outcome, Failure> execute(
            String actionText,
            Path explicitArchive,
            String currentRepositoryTargetId) {
        try {
            Core.ObsAction action = core.parseAction(actionText);
            if (action == null || !"apply-package".equals(action.action())) {
                return Result.failure(new Failure("PACKAGE_INVALID", "OBS-ACTION apply-package is required."));
            }
            if (action.targetBranch() == null || action.targetBranch().isBlank()) {
                return Result.failure(new Failure("PACKAGE_INVALID", "Automatic apply-package requires targetBranch."));
            }

            Path archive = core.resolveArchiveForAction(action, explicitArchive);
            Core.PackageData packageData = core.readPackage(archive);
            if (!packageData.manifest().packageId().equals(action.packageId())) {
                return Result.failure(new Failure("ACTION_PACKAGE_MISMATCH", "OBS-ACTION packageId does not match PACKAGE.json."));
            }
            if (packageData.manifest().workIntent() == null) {
                return Result.failure(new Failure("PACKAGE_INVALID", "Automatic apply-package requires PACKAGE.json workIntent."));
            }

            Core.RepositoryConfig target = resolveTarget(packageData, currentRepositoryTargetId);
            core.ensureWorkIntent(packageData.manifest().workIntent());

            WorkId workId = new WorkId(packageData.manifest().changeSetId());
            Result<StartWorkWorkspace.Outcome, StartWorkWorkspace.Failure> started =
                    startWorkspace.execute(target, workId, action.targetBranch());
            if (started.isFailure()) return Result.failure(new Failure(
                    "WORKSPACE_FAILED", started.failure().orElseThrow().message()));

            var applied = apply.executePrepared(packageData, workId);
            if (applied.isFailure()) return Result.failure(new Failure(
                    applied.failure().orElseThrow().code().name(), applied.failure().orElseThrow().message()));

            var committed = commit.execute(workId.value(), packageData.manifest().packageId());
            if (committed.isFailure()) return Result.failure(new Failure(
                    committed.failure().orElseThrow().code().name(), committed.failure().orElseThrow().message()));

            var published = publish.execute(workId.value(), packageData.manifest().packageId());
            if (published.isFailure()) return Result.failure(new Failure(
                    published.failure().orElseThrow().code().name(), published.failure().orElseThrow().message()));

            return Result.success(new Outcome(
                    started.success().orElseThrow().workspace(),
                    published.success().orElseThrow(),
                    archive));
        } catch (Core.ObsException | IllegalArgumentException e) {
            String code = e instanceof Core.ObsException oe ? oe.code : "STATE_DIVERGED";
            return Result.failure(new Failure(code, e.getMessage()));
        }
    }

    private Core.RepositoryConfig resolveTarget(Core.PackageData packageData, String currentRepositoryTargetId) {
        List<Core.RepositoryConfig> matches = new ArrayList<>();
        Core.RepositoryConfig current = null;
        for (Core.RepositoryConfig repository : core.getRepositories()) {
            if (Objects.equals(repository.id(), currentRepositoryTargetId)) current = repository;
            if (repository.repositoryIdentity().equalsIgnoreCase(packageData.manifest().repositoryIdentity())) {
                matches.add(repository);
            }
        }
        if (current != null && current.repositoryIdentity().equalsIgnoreCase(packageData.manifest().repositoryIdentity())) {
            return current;
        }
        if (matches.isEmpty()) throw new Core.ObsException(Core.REPOSITORY_MISMATCH,
                "No registered Repository Target matches " + packageData.manifest().repositoryIdentity() + ".");
        if (matches.size() > 1) throw new Core.ObsException(Core.REPOSITORY_SELECTION_REQUIRED,
                "Multiple Repository Targets match package repositoryIdentity; select one explicitly.");
        return matches.get(0);
    }

    public record Outcome(GitWorkspace workspace, ReplacementPackageState state, Path archive) {}
    public record Failure(String code, String message) {
        public Failure {
            if (code == null || code.isBlank()) code = "UNEXPECTED";
            if (message == null || message.isBlank()) message = code;
        }
    }
}
