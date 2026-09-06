package obs.rpkg;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import obs.rpkg.features.apply.ApplyExtent;
import obs.rpkg.features.apply.ApplyReplacementPackage;

/** Integration proof for the new Feature-local Apply orchestration over current Core mechanics. */
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
        test("Apply extent stops at AppliedUncommitted", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepo("feature-apply-only");
            String cs = UUID.randomUUID().toString();
            Core.ChangeSet workspace = w.core().startChangeSetWorkspace(w.target().id(), cs, "feature apply only", "main").changeSet();
            String base = workspace.publishedTip;
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), cs, "feature apply only",
                    List.of(CoreTests.op("seed.txt", "replace", "seed", "applied")));

            ApplyReplacementPackage.Result result = service(w).execute(new ApplyReplacementPackage.Request(
                    p.path(), w.repo(), cs, ApplyExtent.APPLY));

            eq(result.executionState(), "AppliedUncommitted", "Apply extent advanced too far");
            eq(CoreTests.g(Path.of(workspace.worktree), "rev-parse", "HEAD").first(), base, "Apply extent created a commit");
            eq(CoreTests.read(Path.of(workspace.worktree).resolve("seed.txt")), "applied", "Apply extent did not apply package bytes");
        });

        test("Apply+Commit stops at CommittedUnpublished", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepoWithRemote("feature-apply-commit");
            String cs = UUID.randomUUID().toString();
            Core.ChangeSet workspace = w.core().startChangeSetWorkspace(w.target().id(), cs, "feature apply commit", "main").changeSet();
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), cs, "feature apply commit",
                    List.of(CoreTests.op("seed.txt", "replace", "seed", "committed")));

            ApplyReplacementPackage.Result result = service(w).execute(new ApplyReplacementPackage.Request(
                    p.path(), w.repo(), cs, ApplyExtent.APPLY_COMMIT));

            eq(result.executionState(), "CommittedUnpublished", "Apply+Commit did not stop before Publish");
            ok(result.commitSha() != null, "Apply+Commit did not produce a commit SHA");
            eq(CoreTests.remoteTip(w.repo(), workspace.branch), null, "Apply+Commit published unexpectedly");
        });

        test("Apply+Commit+Publish reaches exact remote Ready state", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepoWithRemote("feature-apply-publish");
            String cs = UUID.randomUUID().toString();
            Core.ChangeSet workspace = w.core().startChangeSetWorkspace(w.target().id(), cs, "feature apply publish", "main").changeSet();
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), cs, "feature apply publish",
                    List.of(CoreTests.op("seed.txt", "replace", "seed", "published")));

            ApplyReplacementPackage.Result result = service(w).execute(new ApplyReplacementPackage.Request(
                    p.path(), w.repo(), cs, ApplyExtent.APPLY_COMMIT_PUBLISH));

            eq(result.executionState(), "Ready", "full Apply extent did not return to Ready");
            ok(result.commitSha() != null, "full Apply extent lost commit SHA");
            eq(result.publishedTip(), result.commitSha(), "published tip differs from exact commit");
            eq(CoreTests.remoteTip(w.repo(), workspace.branch), result.commitSha(), "remote work branch differs from exact commit");
        });

        test("larger requested extent resumes after proven Apply without reapplying", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepoWithRemote("feature-apply-resume");
            String cs = UUID.randomUUID().toString();
            Core.ChangeSet workspace = w.core().startChangeSetWorkspace(w.target().id(), cs, "feature apply resume", "main").changeSet();
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), cs, "feature apply resume",
                    List.of(CoreTests.op("seed.txt", "replace", "seed", "resume")));
            ApplyReplacementPackage feature = service(w);

            ApplyReplacementPackage.Result first = feature.execute(new ApplyReplacementPackage.Request(
                    p.path(), w.repo(), cs, ApplyExtent.APPLY));
            eq(first.executionState(), "AppliedUncommitted", "resume fixture did not stop after Apply");
            String appliedBytes = CoreTests.read(Path.of(workspace.worktree).resolve("seed.txt"));

            ApplyReplacementPackage.Result resumed = feature.execute(new ApplyReplacementPackage.Request(
                    p.path(), w.repo(), cs, ApplyExtent.APPLY_COMMIT_PUBLISH));

            eq(resumed.executionState(), "Ready", "resume did not finish requested extent");
            eq(CoreTests.read(Path.of(workspace.worktree).resolve("seed.txt")), appliedBytes, "resume changed already-proven applied bytes");
            eq(CoreTests.g(Path.of(workspace.worktree), "rev-list", "--count", workspace.baseCommit + "..HEAD").first(), "1", "resume created duplicate commits");
        });

        test("request/package ChangeSet mismatch fails before mutation", () -> {
            CoreTests.WorkspaceRepo w = CoreTests.workspaceRepo("feature-apply-identity");
            String packageCs = UUID.randomUUID().toString();
            Core.ChangeSet workspace = w.core().startChangeSetWorkspace(w.target().id(), packageCs, "feature apply identity", "main").changeSet();
            CoreTests.PackageFixture p = CoreTests.makePackage(
                    w.identity(), packageCs, "feature apply identity",
                    List.of(CoreTests.op("seed.txt", "replace", "seed", "must-not-apply")));

            expect(Core.ACTION_PACKAGE_MISMATCH, () -> service(w).execute(new ApplyReplacementPackage.Request(
                    p.path(), w.repo(), UUID.randomUUID().toString(), ApplyExtent.APPLY)));

            eq(CoreTests.read(Path.of(workspace.worktree).resolve("seed.txt")), "seed", "identity mismatch mutated worktree");
        });
    }

    private static ApplyReplacementPackage service(CoreTests.WorkspaceRepo w) {
        return new ApplyReplacementPackage(w.core());
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

    private static void expect(String code, Throwing body) throws Exception {
        try {
            body.run();
            throw new AssertionError("expected " + code + ", got success");
        } catch (Core.ObsException e) {
            if (!Objects.equals(e.code, code)) {
                throw new AssertionError("expected " + code + ", got [" + e.code + "] " + e.getMessage());
            }
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
