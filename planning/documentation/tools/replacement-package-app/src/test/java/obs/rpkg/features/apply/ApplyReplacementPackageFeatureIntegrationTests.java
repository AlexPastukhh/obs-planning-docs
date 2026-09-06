package obs.rpkg;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import obs.rpkg.features.apply.application.ApplyReplacementPackage;
import obs.rpkg.features.apply.domain.ApplyExtent;
import obs.rpkg.features.apply.domain.ApplyFailure;
import obs.rpkg.features.apply.domain.ApplyFailureCode;
import obs.rpkg.features.apply.domain.ApplyFailureDisposition;
import obs.rpkg.features.apply.domain.ApplyRequest;
import obs.rpkg.features.apply.domain.ApplySuccess;
import obs.rpkg.features.apply.domain.PackageApplication;
import obs.rpkg.features.apply.domain.PublicationConfirmationState;
import obs.rpkg.foundation.result.OperationResult;
import obs.rpkg.foundation.result.Result;

/** Integration proof for the Feature-local Apply domain over current legacy mechanics. */
public final class ApplyReplacementPackageFeatureIntegrationTests {
    private static int passed;
    private static int failed;

    public static void main(String[] args) throws Exception {
        Path root = Files.createTempDirectory("obs-rpkg-apply-feature-tests-");
        Path priorTmp = CoreTests.tmp;
        try {
            CoreTests.tmp = root;
            runTests();
        } finally {
            CoreTests.tmp = priorTmp;
            CoreTests.deleteTree(root);
        }
        System.out.println("RESULT passed=" + passed + " failed=" + failed);
        if (failed > 0) System.exit(1);
    }

    private static void runTests() throws Exception {
        test("Apply returns typed APPLIED success", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepo("feature-domain-apply-only");
            String cs = UUID.randomUUID().toString();
            Core.ChangeSet workspace = w.core().startChangeSetWorkspace(w.target().id(), cs, "feature domain apply only", "main").changeSet();
            String base = workspace.publishedTip;
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), cs, "feature domain apply only",
                    List.of(CoreTests.op("seed.txt", "replace", "seed", "applied")));

            ApplySuccess success = success(service(w).execute(new ApplyRequest.Start(
                    p.path(), w.repo(), cs, ApplyExtent.APPLY)));

            eq(success.requestedExtent(), ApplyExtent.APPLY, "requested extent");
            ok(success.application().isApplied(), "Apply state is not proven");
            ok(!success.application().isCommitted(), "Apply unexpectedly committed");
            eq(success.application().publicationConfirmation(), PublicationConfirmationState.NOT_REQUESTED, "Apply unexpectedly requested publication confirmation");
            ok(!success.alreadySatisfied(), "first Apply reported already satisfied");
            eq(CoreTests.g(Path.of(workspace.worktree), "rev-parse", "HEAD").first(), base, "Apply created a commit");
            eq(CoreTests.read(Path.of(workspace.worktree).resolve("seed.txt")), "applied", "Apply did not apply package bytes");
        });

        test("Apply+Commit returns typed COMMITTED success", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepoWithRemote("feature-domain-apply-commit");
            String cs = UUID.randomUUID().toString();
            Core.ChangeSet workspace = w.core().startChangeSetWorkspace(w.target().id(), cs, "feature domain apply commit", "main").changeSet();
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), cs, "feature domain apply commit",
                    List.of(CoreTests.op("seed.txt", "replace", "seed", "committed")));

            ApplySuccess success = success(service(w).execute(new ApplyRequest.Start(
                    p.path(), w.repo(), cs, ApplyExtent.APPLY_COMMIT)));

            ok(success.application().isCommitted(), "Commit state is not proven");
            ok(!success.application().isPublished(), "Apply+Commit unexpectedly published");
            eq(success.application().publicationConfirmation(), PublicationConfirmationState.NOT_REQUESTED, "Apply+Commit unexpectedly requested publication confirmation");
            ok(success.application().commitSha() != null, "Commit SHA missing");
            eq(CoreTests.remoteTip(w.repo(), workspace.branch), null, "Apply+Commit published unexpectedly");
        });

        test("Apply+Commit+Publish returns typed PUBLISHED success", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepoWithRemote("feature-domain-apply-publish");
            String cs = UUID.randomUUID().toString();
            Core.ChangeSet workspace = w.core().startChangeSetWorkspace(w.target().id(), cs, "feature domain apply publish", "main").changeSet();
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), cs, "feature domain apply publish",
                    List.of(CoreTests.op("seed.txt", "replace", "seed", "published")));

            ApplySuccess success = success(service(w).execute(new ApplyRequest.Start(
                    p.path(), w.repo(), cs, ApplyExtent.APPLY_COMMIT_PUBLISH)));

            ok(success.application().isPublished(), "Publish state is not proven");
            eq(success.application().publicationConfirmation(), PublicationConfirmationState.CONFIRMED, "published state was not externally confirmed");
            eq(success.application().lastConfirmedPublishedTip(), success.application().commitSha(), "published tip differs from exact commit");
            eq(CoreTests.remoteTip(w.repo(), workspace.branch), success.application().commitSha(), "remote work branch differs from exact commit");
        });

        test("smaller requested extent after Publish is already satisfied without downgrade", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepoWithRemote("feature-domain-surpassed-extent");
            String cs = UUID.randomUUID().toString();
            Core.ChangeSet workspace = w.core().startChangeSetWorkspace(w.target().id(), cs, "feature domain surpassed extent", "main").changeSet();
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), cs, "feature domain surpassed extent",
                    List.of(CoreTests.op("seed.txt", "replace", "seed", "published")));
            ApplyReplacementPackage feature = service(w);

            ApplySuccess published = success(feature.execute(new ApplyRequest.Start(
                    p.path(), w.repo(), cs, ApplyExtent.APPLY_COMMIT_PUBLISH)));
            String tip = published.application().lastConfirmedPublishedTip();
            ApplySuccess lower = success(feature.execute(new ApplyRequest.Start(
                    p.path(), w.repo(), cs, ApplyExtent.APPLY)));

            ok(lower.alreadySatisfied(), "surpassed extent was not reported already satisfied");
            eq(lower.requestedExtent(), ApplyExtent.APPLY, "requested extent changed");
            ok(lower.application().isPublished(), "actual proven published state was downgraded");
            eq(lower.application().publicationConfirmation(), PublicationConfirmationState.CONFIRMED, "published confirmation was lost");
            eq(lower.application().lastConfirmedPublishedTip(), tip, "surpassed request changed published tip");
            eq(CoreTests.g(Path.of(workspace.worktree), "rev-list", "--count", workspace.baseCommit + "..HEAD").first(), "1", "surpassed request created duplicate commit");
        });

        test("Resume continues proven Apply to Publish without archive", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepoWithRemote("feature-domain-resume-applied");
            String cs = UUID.randomUUID().toString();
            Core.ChangeSet workspace = w.core().startChangeSetWorkspace(w.target().id(), cs, "feature domain resume applied", "main").changeSet();
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), cs, "feature domain resume applied",
                    List.of(CoreTests.op("seed.txt", "replace", "seed", "resume")));
            ApplyReplacementPackage feature = service(w);

            ApplySuccess first = success(feature.execute(new ApplyRequest.Start(
                    p.path(), w.repo(), cs, ApplyExtent.APPLY)));
            ok(!first.application().isCommitted(), "resume fixture advanced past Apply");
            Files.delete(p.path());

            ApplySuccess resumed = success(feature.execute(new ApplyRequest.Resume(
                    cs, p.packageId(), ApplyExtent.APPLY_COMMIT_PUBLISH)));

            ok(resumed.application().isPublished(), "Resume did not reach confirmed Publish");
            eq(CoreTests.read(Path.of(workspace.worktree).resolve("seed.txt")), "resume", "Resume changed applied bytes");
            eq(CoreTests.g(Path.of(workspace.worktree), "rev-list", "--count", workspace.baseCommit + "..HEAD").first(), "1", "Resume created duplicate commits");
        });

        test("Resume continues proven Commit to Publish without archive", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepoWithRemote("feature-domain-resume-committed");
            String cs = UUID.randomUUID().toString();
            w.core().startChangeSetWorkspace(w.target().id(), cs, "feature domain resume committed", "main");
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), cs, "feature domain resume committed",
                    List.of(CoreTests.op("seed.txt", "replace", "seed", "committed")));
            ApplyReplacementPackage feature = service(w);

            ApplySuccess committed = success(feature.execute(new ApplyRequest.Start(
                    p.path(), w.repo(), cs, ApplyExtent.APPLY_COMMIT)));
            ok(committed.application().isCommitted(), "resume fixture did not reach Commit");
            ok(!committed.application().isPublished(), "resume fixture published unexpectedly");
            Files.delete(p.path());

            ApplySuccess resumed = success(feature.execute(new ApplyRequest.Resume(
                    cs, p.packageId(), ApplyExtent.APPLY_COMMIT_PUBLISH)));

            ok(resumed.application().isPublished(), "Committed Resume did not reach confirmed Publish");
            eq(resumed.application().lastConfirmedPublishedTip(), committed.application().commitSha(), "Resume published a different commit");
        });

        test("request/package ChangeSet mismatch is a typed failure before mutation", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepo("feature-domain-identity-failure");
            String packageCs = UUID.randomUUID().toString();
            Core.ChangeSet workspace = w.core().startChangeSetWorkspace(w.target().id(), packageCs, "feature domain identity failure", "main").changeSet();
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), packageCs, "feature domain identity failure",
                    List.of(CoreTests.op("seed.txt", "replace", "seed", "must-not-apply")));

            ApplyFailure failure = failure(service(w).execute(new ApplyRequest.Start(
                    p.path(), w.repo(), UUID.randomUUID().toString(), ApplyExtent.APPLY)));

            eq(failure.code(), ApplyFailureCode.PACKAGE_IDENTITY_MISMATCH, "identity failure code");
            eq(failure.disposition(), ApplyFailureDisposition.ACTION_REQUIRED, "identity failure disposition");
            eq(CoreTests.read(Path.of(workspace.worktree).resolve("seed.txt")), "seed", "identity mismatch mutated worktree");
        });

        test("expected source mismatch is returned as typed failure", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepo("feature-domain-source-failure");
            String cs = UUID.randomUUID().toString();
            w.core().startChangeSetWorkspace(w.target().id(), cs, "feature domain source failure", "main");
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), cs, "feature domain source failure",
                    List.of(CoreTests.op("seed.txt", "replace", "wrong-base", "must-not-apply")));

            Result<ApplySuccess, ApplyFailure> result = service(w).execute(new ApplyRequest.Start(
                    p.path(), w.repo(), cs, ApplyExtent.APPLY));
            ApplyFailure failure = failure(result);

            ok(result.isFailure(), "source mismatch did not return Result.Failure");
            eq(failure.code(), ApplyFailureCode.EXPECTED_SOURCE_CHANGED, "source mismatch typed code");
            eq(failure.disposition(), ApplyFailureDisposition.ACTION_REQUIRED, "source mismatch disposition");
        });

        test("publication uncertainty is returned as typed uncertain failure", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepoWithRemote("feature-domain-publication-uncertain");
            String cs = UUID.randomUUID().toString();
            w.core().startChangeSetWorkspace(w.target().id(), cs, "feature domain publication uncertain", "main");
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), cs, "feature domain publication uncertain",
                    List.of(CoreTests.op("seed.txt", "replace", "seed", "uncertain")));
            w.core().setAfterPublishAttemptHookForTests(() -> {
                try {
                    CoreTests.setFakeSshMode(w, "fail-all");
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
            try {
                ApplyFailure failure = failure(service(w).execute(new ApplyRequest.Start(
                        p.path(), w.repo(), cs, ApplyExtent.APPLY_COMMIT_PUBLISH)));
                eq(failure.code(), ApplyFailureCode.PUBLICATION_UNCERTAIN, "publication uncertainty code");
                eq(failure.disposition(), ApplyFailureDisposition.UNCERTAIN, "publication uncertainty disposition");
                PackageApplication current = failure.currentApplication().orElseThrow(() -> new AssertionError("publication uncertainty lost current PackageApplication"));
                ok(current.isCommitted(), "uncertain publication lost proven commit");
                ok(!current.isPublished(), "uncertain publication was reported published");
                eq(current.publicationConfirmation(), PublicationConfirmationState.NOT_CONFIRMED, "uncertain publication did not retain confirmation state");
                ok(current.commitSha() != null, "uncertain publication lost exact commit identity");
            } finally {
                w.core().setAfterPublishAttemptHookForTests(null);
                CoreTests.setFakeSshMode(w, "normal");
            }
        });


        test("lower requested extent may succeed while publication remains unconfirmed state", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepoWithRemote("feature-domain-uncertain-lower-extent");
            String cs = UUID.randomUUID().toString();
            w.core().startChangeSetWorkspace(w.target().id(), cs, "feature domain uncertain lower extent", "main");
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), cs, "feature domain uncertain lower extent",
                    List.of(CoreTests.op("seed.txt", "replace", "seed", "uncertain-lower")));
            ApplyReplacementPackage feature = service(w);
            w.core().setAfterPublishAttemptHookForTests(() -> {
                try {
                    CoreTests.setFakeSshMode(w, "fail-all");
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
            try {
                ApplyFailure uncertain = failure(feature.execute(new ApplyRequest.Start(
                        p.path(), w.repo(), cs, ApplyExtent.APPLY_COMMIT_PUBLISH)));
                eq(uncertain.code(), ApplyFailureCode.PUBLICATION_UNCERTAIN, "fixture did not become publication-uncertain");

                ApplySuccess lower = success(feature.execute(new ApplyRequest.Resume(
                        cs, p.packageId(), ApplyExtent.APPLY_COMMIT)));
                ok(lower.alreadySatisfied(), "lower extent was not already satisfied");
                ok(lower.application().isCommitted(), "lower extent lost proven commit");
                ok(!lower.application().isPublished(), "lower extent invented publication success");
                eq(lower.application().publicationConfirmation(), PublicationConfirmationState.NOT_CONFIRMED,
                        "lower successful operation hid unresolved publication confirmation state");
            } finally {
                w.core().setAfterPublishAttemptHookForTests(null);
                CoreTests.setFakeSshMode(w, "normal");
            }
        });

        test("full Resume reconciles unconfirmed publication before another push", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepoWithRemote("feature-domain-uncertain-reconcile");
            String cs = UUID.randomUUID().toString();
            w.core().startChangeSetWorkspace(w.target().id(), cs, "feature domain uncertain reconcile", "main");
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), cs, "feature domain uncertain reconcile",
                    List.of(CoreTests.op("seed.txt", "replace", "seed", "uncertain-reconcile")));
            ApplyReplacementPackage feature = service(w);
            w.core().setAfterPublishAttemptHookForTests(() -> {
                try {
                    CoreTests.setFakeSshMode(w, "fail-all");
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
            ApplyFailure uncertain;
            try {
                uncertain = failure(feature.execute(new ApplyRequest.Start(
                        p.path(), w.repo(), cs, ApplyExtent.APPLY_COMMIT_PUBLISH)));
            } finally {
                w.core().setAfterPublishAttemptHookForTests(null);
                CoreTests.setFakeSshMode(w, "normal");
            }
            String commit = uncertain.currentApplication().orElseThrow().commitSha();

            ApplySuccess reconciled = success(feature.execute(new ApplyRequest.Resume(
                    cs, p.packageId(), ApplyExtent.APPLY_COMMIT_PUBLISH)));

            ok(reconciled.application().isPublished(), "Resume did not establish confirmed publication");
            eq(reconciled.application().publicationConfirmation(), PublicationConfirmationState.CONFIRMED,
                    "Resume did not turn external confirmation into domain state");
            eq(reconciled.application().lastConfirmedPublishedTip(), commit, "Resume confirmed a different commit");
        });

        test("OperationResult models success without a success value", () -> {
            OperationResult<String> success = OperationResult.success();
            ok(success.isSuccess(), "OperationResult.success was not successful");
            ok(success.failure().isEmpty(), "OperationResult.success carried an error");
            eq(success.fold(() -> "done", error -> "failed:" + error), "done", "OperationResult success fold");

            OperationResult<String> failed = OperationResult.failure("boom");
            ok(failed.isFailure(), "OperationResult.failure was not failed");
            eq(failed.failure().orElseThrow(), "boom", "OperationResult failure payload");
        });
    }

    private static ApplyReplacementPackage service(CoreTests.WorkspaceRepo w) {
        return new ApplyReplacementPackage(w.core());
    }

    private static ApplySuccess success(Result<ApplySuccess, ApplyFailure> result) {
        if (result instanceof Result.Success<ApplySuccess, ApplyFailure> success) return success.value();
        ApplyFailure failure = ((Result.Failure<ApplySuccess, ApplyFailure>) result).error();
        throw new AssertionError("expected success, got " + failure.code() + ": " + failure.message());
    }

    private static ApplyFailure failure(Result<ApplySuccess, ApplyFailure> result) {
        if (result instanceof Result.Failure<ApplySuccess, ApplyFailure> failure) return failure.error();
        ApplySuccess success = ((Result.Success<ApplySuccess, ApplyFailure>) result).value();
        throw new AssertionError("expected failure, got success for application " + success.application().packageId());
    }

    private interface Throwing { void run() throws Exception; }

    private static void test(String name, Throwing body) {
        try {
            body.run();
            passed++;
            System.out.println("PASS " + name);
        } catch (Throwable failure) {
            failed++;
            System.out.println("FAIL " + name + " :: " + failure);
            if (Boolean.getBoolean("obs.tests.stack")) failure.printStackTrace(System.out);
        }
    }

    private static void ok(boolean value, String message) {
        if (!value) throw new AssertionError(message);
    }

    private static void eq(Object actual, Object expected, String message) {
        if (!Objects.equals(actual, expected)) {
            throw new AssertionError(message + " expected=" + expected + " actual=" + actual);
        }
    }
}
