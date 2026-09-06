package obs.rpkg.features.apply;

import java.nio.file.Path;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import obs.rpkg.ApplyFeatureTestSupport;
import obs.rpkg.Core;
import obs.rpkg.features.apply.application.ApplyReplacementPackage;
import obs.rpkg.features.apply.application.CommitAppliedPackage;
import obs.rpkg.features.apply.application.PublishAppliedCommit;
import obs.rpkg.features.apply.domain.ApplyFailure;
import obs.rpkg.features.apply.domain.ApplyFailureCode;
import obs.rpkg.features.apply.domain.OperationFailureDisposition;
import obs.rpkg.features.apply.domain.PublicationObservation;
import obs.rpkg.features.apply.domain.PublishFailure;
import obs.rpkg.features.apply.domain.PublishFailureCode;
import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.features.apply.infrastructure.FileReplacementPackageStateRepository;
import obs.rpkg.features.apply.infrastructure.GitPublicationObserver;
import obs.rpkg.features.apply.infrastructure.PublicationObserver;
import obs.rpkg.features.apply.infrastructure.ReplacementPackageStateRepository;
import obs.rpkg.foundation.result.OperationResult;
import obs.rpkg.foundation.result.Result;
import obs.rpkg.work.domain.WorkId;

/** Feature integration proof independent of CoreTests internals. */
public final class ApplyReplacementPackageFeatureIntegrationTests {
    private static int passed;
    private static int failed;

    public static void main(String[] args) {
        run("Apply is independent and durable", ApplyReplacementPackageFeatureIntegrationTests::applyOnly);
        run("same packageId with different archive content fails closed", ApplyReplacementPackageFeatureIntegrationTests::exactPackageIdentity);
        run("Commit applied is a separate operation", ApplyReplacementPackageFeatureIntegrationTests::commitSeparate);
        run("Publish confirms exact remote tip", ApplyReplacementPackageFeatureIntegrationTests::publishConfirmed);
        run("missing publication confirmation is a Publish failure with durable NotConfirmed state", ApplyReplacementPackageFeatureIntegrationTests::publicationConfirmationFailure);
        run("Retry Publish confirms before another push", ApplyReplacementPackageFeatureIntegrationTests::retryConfirmsBeforePush);
        run("publication confirmation is fenced to expected repository identity", ApplyReplacementPackageFeatureIntegrationTests::confirmationIdentityFence);
        run("new package state does not import legacy Core ChangeSet state", ApplyReplacementPackageFeatureIntegrationTests::noLegacyStateImport);
        run("OperationResult succeeds without success value", ApplyReplacementPackageFeatureIntegrationTests::operationResult);
        System.out.println("RESULT passed=" + passed + " failed=" + failed);
        if (failed > 0) System.exit(1);
    }

    private static void applyOnly() throws Exception {
        ApplyFeatureTestSupport.Workspace w = ApplyFeatureTestSupport.workspace("feature-apply-only", false);
        try {
            String cs = UUID.randomUUID().toString();
            Core.ChangeSet workspace = w.core().startChangeSetWorkspace(
                    w.target().id(), cs, "feature apply only", "main").changeSet();
            String baseHead = ApplyFeatureTestSupport.git(Path.of(workspace.worktree), "rev-parse", "HEAD");
            var pkg = ApplyFeatureTestSupport.packageFor(
                    w, cs, "feature apply only",
                    List.of(ApplyFeatureTestSupport.replace("seed.txt", "seed", "applied")));

            var states = new FileReplacementPackageStateRepository(w.stateRoot());
            ReplacementPackageState state = success(new ApplyReplacementPackage(w.core(), states)
                    .execute(new ApplyReplacementPackage.Request(pkg.path(), w.repository(), cs)));

            ok(!state.isCommitted(), "Apply implicitly committed");
            ok(state.publication() instanceof PublicationObservation.NotRequested, "Apply touched publication state");
            eq(ApplyFeatureTestSupport.git(Path.of(workspace.worktree), "rev-parse", "HEAD"), baseHead, "Apply changed HEAD");
            eq(ApplyFeatureTestSupport.read(Path.of(workspace.worktree).resolve("seed.txt")), "applied", "Apply bytes");

            ReplacementPackageState reloaded =
                    new FileReplacementPackageStateRepository(w.stateRoot())
                            .find(new WorkId(cs), pkg.packageId()).orElseThrow();
            eq(reloaded.packageIdentity().archiveSha256(), state.packageIdentity().archiveSha256(), "archive identity did not persist");
        } finally {
            ApplyFeatureTestSupport.deleteTree(w.root());
        }
    }

    private static void exactPackageIdentity() throws Exception {
        ApplyFeatureTestSupport.Workspace w = ApplyFeatureTestSupport.workspace("feature-package-identity", false);
        try {
            String cs = UUID.randomUUID().toString();
            w.core().startChangeSetWorkspace(w.target().id(), cs, "identity", "main");
            String packageId = UUID.randomUUID().toString();
            var first = ApplyFeatureTestSupport.packageWithId(
                    w, packageId, cs, "identity",
                    List.of(ApplyFeatureTestSupport.replace("seed.txt", "seed", "one")));
            var states = new FileReplacementPackageStateRepository(w.stateRoot());
            var service = new ApplyReplacementPackage(w.core(), states);
            success(service.execute(new ApplyReplacementPackage.Request(first.path(), w.repository(), cs)));

            var differentArchive = ApplyFeatureTestSupport.packageWithId(
                    w, packageId, cs, "identity",
                    List.of(ApplyFeatureTestSupport.replace("seed.txt", "seed", "two")));
            ApplyFailure failure = failure(service.execute(
                    new ApplyReplacementPackage.Request(differentArchive.path(), w.repository(), cs)));

            eq(failure.code(), ApplyFailureCode.PACKAGE_IDENTITY_MISMATCH, "identity code");
            eq(ApplyFeatureTestSupport.read(Path.of(w.core().getChangeSet(cs).worktree).resolve("seed.txt")), "one", "mismatched archive mutated worktree");
        } finally {
            ApplyFeatureTestSupport.deleteTree(w.root());
        }
    }

    private static void commitSeparate() throws Exception {
        ApplyFeatureTestSupport.Workspace w = ApplyFeatureTestSupport.workspace("feature-commit", true);
        try {
            String cs = UUID.randomUUID().toString();
            Core.ChangeSet workspace = w.core().startChangeSetWorkspace(w.target().id(), cs, "commit", "main").changeSet();
            var pkg = ApplyFeatureTestSupport.packageFor(
                    w, cs, "commit",
                    List.of(ApplyFeatureTestSupport.replace("seed.txt", "seed", "committed")));
            var states = new FileReplacementPackageStateRepository(w.stateRoot());
            var apply = new ApplyReplacementPackage(w.core(), states);
            var commit = new CommitAppliedPackage(w.core(), states);

            ReplacementPackageState applied = success(apply.execute(
                    new ApplyReplacementPackage.Request(pkg.path(), w.repository(), cs)));
            ok(!applied.isCommitted(), "Apply implicitly committed");

            ReplacementPackageState committed = commitSuccess(commit.execute(cs, pkg.packageId()));
            ok(committed.isCommitted(), "Commit not proven");
            ok(committed.publication() instanceof PublicationObservation.NotRequested, "Commit implicitly published");
            eq(ApplyFeatureTestSupport.remoteTip(w, workspace.branch), null, "Commit published remote branch");
        } finally {
            ApplyFeatureTestSupport.deleteTree(w.root());
        }
    }

    private static void publishConfirmed() throws Exception {
        ApplyFeatureTestSupport.Workspace w = ApplyFeatureTestSupport.workspace("feature-publish", true);
        try {
            String cs = UUID.randomUUID().toString();
            Core.ChangeSet workspace = w.core().startChangeSetWorkspace(w.target().id(), cs, "publish", "main").changeSet();
            var pkg = ApplyFeatureTestSupport.packageFor(
                    w, cs, "publish",
                    List.of(ApplyFeatureTestSupport.replace("seed.txt", "seed", "published")));
            var states = new FileReplacementPackageStateRepository(w.stateRoot());
            success(new ApplyReplacementPackage(w.core(), states).execute(
                    new ApplyReplacementPackage.Request(pkg.path(), w.repository(), cs)));
            ReplacementPackageState committed =
                    commitSuccess(new CommitAppliedPackage(w.core(), states).execute(cs, pkg.packageId()));

            ReplacementPackageState published = publishSuccess(
                    new PublishAppliedCommit(w.core(), states, new GitPublicationObserver())
                            .execute(cs, pkg.packageId()));

            ok(published.publication() instanceof PublicationObservation.ConfirmedTip, "publication is not exact confirmed tip");
            ok(published.isPublished(), "published fact not proven");
            eq(ApplyFeatureTestSupport.remoteTip(w, workspace.branch), committed.commitSha(), "remote tip mismatch");
        } finally {
            ApplyFeatureTestSupport.deleteTree(w.root());
        }
    }

    private static void publicationConfirmationFailure() throws Exception {
        ApplyFeatureTestSupport.Workspace w = ApplyFeatureTestSupport.workspace("feature-confirmation-failure", true);
        Path offline = null;
        try {
            String cs = UUID.randomUUID().toString();
            w.core().startChangeSetWorkspace(w.target().id(), cs, "confirmation failure", "main");
            var pkg = ApplyFeatureTestSupport.packageFor(
                    w, cs, "confirmation failure",
                    List.of(ApplyFeatureTestSupport.replace("seed.txt", "seed", "uncertain")));
            var states = new FileReplacementPackageStateRepository(w.stateRoot());
            success(new ApplyReplacementPackage(w.core(), states).execute(
                    new ApplyReplacementPackage.Request(pkg.path(), w.repository(), cs)));
            ReplacementPackageState committed =
                    commitSuccess(new CommitAppliedPackage(w.core(), states).execute(cs, pkg.packageId()));

            offline = ApplyFeatureTestSupport.makeRemoteUnavailableAfterPush(w);
            PublishFailure failure = publishFailure(
                    new PublishAppliedCommit(w.core(), states, new GitPublicationObserver())
                            .execute(cs, pkg.packageId()));

            eq(failure.code(), PublishFailureCode.PUBLICATION_CONFIRMATION_FAILED, "confirmation failure code");
            eq(failure.disposition(), OperationFailureDisposition.UNCERTAIN, "confirmation failure disposition");
            ReplacementPackageState current = failure.currentState().orElseThrow();
            eq(current.commitSha(), committed.commitSha(), "confirmation failure lost commit");
            ok(current.publication() instanceof PublicationObservation.NotConfirmed, "confirmation failure did not persist NotConfirmed");

            ReplacementPackageState commitAgain =
                    commitSuccess(new CommitAppliedPackage(w.core(), states).execute(cs, pkg.packageId()));
            ok(commitAgain.publication() instanceof PublicationObservation.NotConfirmed,
                    "successful Commit operation erased unrelated publication state");
        } finally {
            ApplyFeatureTestSupport.restoreRemote(w, offline);
            ApplyFeatureTestSupport.deleteTree(w.root());
        }
    }

    private static void retryConfirmsBeforePush() throws Exception {
        ApplyFeatureTestSupport.Workspace w = ApplyFeatureTestSupport.workspace("feature-retry-confirm", true);
        try {
            String cs = UUID.randomUUID().toString();
            w.core().startChangeSetWorkspace(w.target().id(), cs, "retry confirm", "main");
            var pkg = ApplyFeatureTestSupport.packageFor(
                    w, cs, "retry confirm",
                    List.of(ApplyFeatureTestSupport.replace("seed.txt", "seed", "retry")));
            var states = new FileReplacementPackageStateRepository(w.stateRoot());
            success(new ApplyReplacementPackage(w.core(), states).execute(
                    new ApplyReplacementPackage.Request(pkg.path(), w.repository(), cs)));
            ReplacementPackageState committed =
                    commitSuccess(new CommitAppliedPackage(w.core(), states).execute(cs, pkg.packageId()));

            // Simulate durable state after an earlier uncertain attempt. Confirmation now proves the remote tip.
            ReplacementPackageState uncertain = committed.withPublication(new PublicationObservation.NotConfirmed());
            ok(states.save(uncertain).isSuccess(), "fixture state save failed");
            ApplyFeatureTestSupport.failIfAnotherPushIsAttempted(w);

            PublicationObserver confirmedObserver = (worktree, branch, repositoryIdentity) ->
                    Result.success(new PublicationObservation.ConfirmedTip(committed.commitSha()));
            ReplacementPackageState result = publishSuccess(
                    new PublishAppliedCommit(w.core(), states, confirmedObserver)
                            .execute(cs, pkg.packageId()));

            ok(result.isPublished(), "Retry did not accept confirmed external fact");
        } finally {
            ApplyFeatureTestSupport.clearPublishHook(w);
            ApplyFeatureTestSupport.deleteTree(w.root());
        }
    }

    private static void confirmationIdentityFence() throws Exception {
        ApplyFeatureTestSupport.Workspace w = ApplyFeatureTestSupport.workspace("feature-confirmation-identity", true);
        try {
            var observed = new GitPublicationObserver().observe(
                    w.repository(),
                    "changeset/test",
                    "github:different/repository");
            ok(observed.isFailure(), "publication confirmation accepted a different repository identity");
        } finally {
            ApplyFeatureTestSupport.deleteTree(w.root());
        }
    }

    private static void noLegacyStateImport() throws Exception {
        ApplyFeatureTestSupport.Workspace w = ApplyFeatureTestSupport.workspace("feature-no-legacy-import", true);
        try {
            String cs = UUID.randomUUID().toString();
            w.core().startChangeSetWorkspace(w.target().id(), cs, "legacy only", "main");
            var pkg = ApplyFeatureTestSupport.packageFor(
                    w, cs, "legacy only",
                    List.of(ApplyFeatureTestSupport.replace("seed.txt", "seed", "legacy")));

            // Mutate using legacy Core only. The new aggregate repository must not infer/import this state.
            w.core().applyPackage(pkg.path(), w.repository());
            var states = new FileReplacementPackageStateRepository(w.stateRoot());
            ok(states.find(new WorkId(cs), pkg.packageId()).isEmpty(),
                    "new state repository imported legacy Core ChangeSet state");

            var commit = new CommitAppliedPackage(w.core(), states).execute(cs, pkg.packageId());
            ok(commit.isFailure(), "Commit accepted legacy-only package state");
        } finally {
            ApplyFeatureTestSupport.deleteTree(w.root());
        }
    }

    private static void operationResult() {
        OperationResult<String> success = OperationResult.success();
        ok(success.isSuccess(), "success without value failed");
        ok(success.failure().isEmpty(), "success carried failure value");
        eq(success.fold(() -> "ok", error -> error), "ok", "fold success");

        OperationResult<String> failure = OperationResult.failure("boom");
        ok(failure.isFailure(), "failure not reported");
        eq(failure.failure().orElseThrow(), "boom", "failure payload");
    }

    private static ReplacementPackageState success(Result<ReplacementPackageState, ApplyFailure> result) {
        if (result instanceof Result.Success<ReplacementPackageState, ApplyFailure> success) return success.value();
        ApplyFailure failure = ((Result.Failure<ReplacementPackageState, ApplyFailure>) result).error();
        throw new AssertionError("expected Apply success, got " + failure.code() + ": " + failure.message());
    }

    private static ApplyFailure failure(Result<ReplacementPackageState, ApplyFailure> result) {
        if (result instanceof Result.Failure<ReplacementPackageState, ApplyFailure> failure) return failure.error();
        throw new AssertionError("expected Apply failure");
    }

    private static ReplacementPackageState commitSuccess(
            Result<ReplacementPackageState, obs.rpkg.features.apply.domain.CommitAppliedFailure> result) {
        if (result instanceof Result.Success<ReplacementPackageState, obs.rpkg.features.apply.domain.CommitAppliedFailure> success) return success.value();
        var failure = ((Result.Failure<ReplacementPackageState, obs.rpkg.features.apply.domain.CommitAppliedFailure>) result).error();
        throw new AssertionError("expected Commit success, got " + failure.code() + ": " + failure.message());
    }

    private static ReplacementPackageState publishSuccess(Result<ReplacementPackageState, PublishFailure> result) {
        if (result instanceof Result.Success<ReplacementPackageState, PublishFailure> success) return success.value();
        PublishFailure failure = ((Result.Failure<ReplacementPackageState, PublishFailure>) result).error();
        throw new AssertionError("expected Publish success, got " + failure.code() + ": " + failure.message());
    }

    private static PublishFailure publishFailure(Result<ReplacementPackageState, PublishFailure> result) {
        if (result instanceof Result.Failure<ReplacementPackageState, PublishFailure> failure) return failure.error();
        throw new AssertionError("expected Publish failure");
    }

    private interface Throwing { void run() throws Exception; }

    private static void run(String name, Throwing body) {
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
