package obs.rpkg.features.apply;

import java.nio.file.Path;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Predicate;

import obs.rpkg.ApplyFeatureTestSupport;
import obs.rpkg.Core;
import obs.rpkg.WorkPackageRuntime;
import obs.rpkg.features.apply.application.ApplyReplacementPackage;
import obs.rpkg.features.apply.application.AutomaticPackageRealization;
import obs.rpkg.features.apply.application.CommitAppliedPackage;
import obs.rpkg.features.apply.application.PublishAppliedCommit;
import obs.rpkg.features.apply.domain.*;
import obs.rpkg.features.apply.infrastructure.ReplacementPackageStateRepository;
import obs.rpkg.foundation.result.OperationResult;
import obs.rpkg.foundation.result.Result;
import obs.rpkg.work.application.StartWorkWorkspace;
import obs.rpkg.work.application.port.GitWorkspaceRepository;
import obs.rpkg.work.application.port.WorkOperationLock;
import obs.rpkg.work.domain.GitWorkspace;
import obs.rpkg.work.domain.WorkId;

/** Target Feature/Scenario integration proof. No test depends on Core.ChangeSet runtime state. */
public final class ApplyReplacementPackageFeatureIntegrationTests {
    private static int passed;
    private static int failed;

    public static void main(String[] args) {
        run("Start Workspace persists GitWorkspace without Core.ChangeSet", ApplyReplacementPackageFeatureIntegrationTests::workspaceNoChangeSet);
        run("Start Workspace pins fresh authoritative origin target tip", ApplyReplacementPackageFeatureIntegrationTests::workspacePinsFreshOriginTip);
        run("Start Workspace uses captured verified fetch URL after origin config mutation", ApplyReplacementPackageFeatureIntegrationTests::workspaceUsesCapturedFetchUrl);
        run("Start Workspace transport ignores insteadOf added after endpoint verification", ApplyReplacementPackageFeatureIntegrationTests::workspaceIgnoresRewriteAfterVerification);
        run("Apply uses one immutable captured archive snapshot", ApplyReplacementPackageFeatureIntegrationTests::immutableArchiveSnapshot);
        run("Apply recovery uses durable package journal after state-save failure", ApplyReplacementPackageFeatureIntegrationTests::applyRecoveryAfterStateFailure);
        run("Apply recovery rejects package journal integrity corruption", ApplyReplacementPackageFeatureIntegrationTests::applyRecoveryRejectsJournalIntegrityCorruption);
        run("Apply recovery rejects valid journal bytes not bound to captured archive", ApplyReplacementPackageFeatureIntegrationTests::applyRecoveryRejectsCapturedPayloadMismatch);
        run("previous package-journal schema is fail-closed for the new executable", ApplyReplacementPackageFeatureIntegrationTests::previousJournalSchemaFailsClosed);
        run("manual Apply rejects package repository identity different from GitWorkspace", ApplyReplacementPackageFeatureIntegrationTests::manualApplyRepositoryMismatch);
        run("Work lock acquisition failure is operation-local, not state divergence", ApplyReplacementPackageFeatureIntegrationTests::workLockFailureIsOperationLocal);
        run("Commit is separate and recovers exact commit after state-save failure", ApplyReplacementPackageFeatureIntegrationTests::commitRecoveryAfterStateFailure);
        run("Publish confirms exact remote tip without ChangeSet authority", ApplyReplacementPackageFeatureIntegrationTests::publishConfirmed);
        run("Publish guard blocks push when NotConfirmed cannot persist", ApplyReplacementPackageFeatureIntegrationTests::publishGuardBlocksPush);
        run("failed final publication persistence leaves durable NotConfirmed", ApplyReplacementPackageFeatureIntegrationTests::publishFinalPersistenceFailure);
        run("uncertain Publish retry confirms before another push", ApplyReplacementPackageFeatureIntegrationTests::retryConfirmsBeforePush);
        run("unexpected remote tip is rejected before push", ApplyReplacementPackageFeatureIntegrationTests::unexpectedRemoteTipBlocksPush);
        run("foreign origin pushurl is rejected before push", ApplyReplacementPackageFeatureIntegrationTests::foreignPushUrlBlocksPush);
        run("Publish uses captured verified fetch URL after origin config mutation", ApplyReplacementPackageFeatureIntegrationTests::publishUsesCapturedFetchUrl);
        run("Publish uses captured verified push URL after pushurl config mutation", ApplyReplacementPackageFeatureIntegrationTests::publishUsesCapturedPushUrl);
        run("Publish observation ignores insteadOf added after endpoint verification", ApplyReplacementPackageFeatureIntegrationTests::publishObservationIgnoresRewriteAfterVerification);
        run("Publish push ignores pushInsteadOf added after endpoint verification", ApplyReplacementPackageFeatureIntegrationTests::publishPushIgnoresRewriteAfterVerification);
        run("persisted safe observation is refreshed before a later push", ApplyReplacementPackageFeatureIntegrationTests::freshObservationBeforeLaterPush);
        run("sequential packages derive previous tip from package journal", ApplyReplacementPackageFeatureIntegrationTests::sequentialPackages);
        run("workspace journal recovers after GitWorkspace persistence failure", ApplyReplacementPackageFeatureIntegrationTests::workspaceRecoveryAfterPersistenceFailure);
        run("persisted GitWorkspace rejects conflicting leftover workspace journal", ApplyReplacementPackageFeatureIntegrationTests::persistedWorkspaceRejectsConflictingJournal);
        run("automatic OBS action composes Start Apply Commit Publish without ChangeSet", ApplyReplacementPackageFeatureIntegrationTests::automaticComposition);
        run("automatic OBS action is idempotent on same exact package", ApplyReplacementPackageFeatureIntegrationTests::automaticIdempotence);
        System.out.println("RESULT passed=" + passed + " failed=" + failed);
        if (failed > 0) System.exit(1);
    }

    private static void workspaceNoChangeSet() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("workspace-owner",false);
        try {
            String id=UUID.randomUUID().toString();
            GitWorkspace ws=start(w,id);
            ok(w.core().getChangeSet(id)==null,"Start Work Workspace created legacy Core.ChangeSet");
            eq(w.workspaces().find(new WorkId(id)).orElseThrow(),ws,"GitWorkspace did not persist");
            eq(ws.workBranch(),"changeset/"+id,"derived branch");
        } finally { ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void workspacePinsFreshOriginTip() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("workspace-origin-source",false);
        try {
            String localBefore=ApplyFeatureTestSupport.git(w.repository(),"rev-parse","refs/heads/main");
            String remoteTip=ApplyFeatureTestSupport.advanceRemoteMainKeepingLocalStale(w);
            eq(ApplyFeatureTestSupport.git(w.repository(),"rev-parse","refs/heads/main"),localBefore,"fixture local main was not stale");
            GitWorkspace ws=start(w,UUID.randomUUID().toString());
            eq(ws.baseCommit(),remoteTip,"Start Workspace pinned stale local target branch instead of authoritative origin tip");
        } finally { ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void workspaceUsesCapturedFetchUrl() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("workspace-captured-fetch",false);
        try {
            String remoteTip=ApplyFeatureTestSupport.advanceRemoteMainKeepingLocalStale(w);
            ApplyFeatureTestSupport.git(w.repository(),"update-ref","-d","refs/remotes/origin/main");
            java.nio.file.Path foreign=ApplyFeatureTestSupport.newBareRemote(w,"foreign-fetch.git");
            w.mechanics().setAfterFetchUrlVerifiedHookForTests(() -> ApplyFeatureTestSupport.setOriginUrlUnchecked(w,foreign.toString()));
            String id=UUID.randomUUID().toString();
            var result=w.start().execute(w.target(),new WorkId(id),"main");
            ok(result.isFailure(),"Start accepted RepositoryTarget after origin identity changed");
            eq(ApplyFeatureTestSupport.git(w.repository(),"rev-parse","refs/remotes/origin/main"),remoteTip,
                    "Start re-resolved mutable origin instead of fetching captured verified URL");
        } finally { w.mechanics().setAfterFetchUrlVerifiedHookForTests(null);ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void workspaceIgnoresRewriteAfterVerification() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("workspace-rewrite-fence",false);
        try {
            String remoteTip=ApplyFeatureTestSupport.advanceRemoteMainKeepingLocalStale(w);
            java.nio.file.Path foreign=ApplyFeatureTestSupport.newBareRemote(w,"foreign-rewrite-fetch.git");
            w.mechanics().setAfterFetchUrlVerifiedHookForTests(() -> ApplyFeatureTestSupport.setInsteadOfRewriteUnchecked(w,foreign));
            GitWorkspace ws=start(w,UUID.randomUUID().toString());
            eq(ws.baseCommit(),remoteTip,"Git insteadOf redirected verified Start fetch endpoint");
        } finally { w.mechanics().setAfterFetchUrlVerifiedHookForTests(null);ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void immutableArchiveSnapshot() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("immutable-archive",false);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"immutable",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","A")));
            Core.PackageData captured=w.core().readPackage(pkg.path());
            ApplyFeatureTestSupport.overwritePackage(pkg,w,id,"B");
            ReplacementPackageState state=success(w.apply().executePrepared(captured,new WorkId(id)));
            eq(ApplyFeatureTestSupport.read(ws.worktree().resolve("seed.txt")),"A","Apply re-read mutable archive path instead of captured bytes");
            eq(state.packageIdentity().archiveSha256(),captured.archiveSha256(),"durable identity differs from applied captured archive");
        } finally { ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void applyRecoveryAfterStateFailure() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("apply-recovery",false);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"apply recovery",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","applied")));
            FailingSaveRepository failing=new FailingSaveRepository(w.states(),state -> !state.isCommitted());
            ApplyReplacementPackage first=new ApplyReplacementPackage(w.core(),w.workspaces(),failing,w.workLocks(),w.mechanics());
            ApplyFailure failure=applyFailure(first.execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(failure.code(),ApplyFailureCode.STATE_PERSISTENCE_FAILED,"apply persistence failure code");
            eq(ApplyFeatureTestSupport.read(ws.worktree().resolve("seed.txt")),"applied","file side effect did not occur before simulated state failure");
            ok(w.states().find(new WorkId(id),pkg.packageId()).isEmpty(),"failed Apply state unexpectedly persisted");
            ReplacementPackageState recovered=success(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(recovered.packageIdentity().packageId(),pkg.packageId(),"Apply recovery did not persist exact package state");
        } finally { ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void applyRecoveryRejectsJournalIntegrityCorruption() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("apply-journal-integrity",false);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"journal integrity",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","intended")));
            FailingSaveRepository failing=new FailingSaveRepository(w.states(),state -> !state.isCommitted());
            ApplyReplacementPackage first=new ApplyReplacementPackage(w.core(),w.workspaces(),failing,w.workLocks(),w.mechanics());
            ApplyFailure firstFailure=applyFailure(first.execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(firstFailure.code(),ApplyFailureCode.STATE_PERSISTENCE_FAILED,"fixture Apply persistence failure");
            ApplyFeatureTestSupport.corruptJournalIntendedBytesAndWorktree(w,id,pkg.packageId(),ws.worktree(),"corrupt");
            ApplyFailure retry=applyFailure(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(retry.code(),ApplyFailureCode.STATE_DIVERGED,"corrupt journal digest was accepted");
        } finally { ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void applyRecoveryRejectsCapturedPayloadMismatch() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("apply-journal-binding",false);
        try {
            String id=UUID.randomUUID().toString();start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"journal binding",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","intended")));
            Core.PackageData captured=w.core().readPackage(pkg.path());
            FailingSaveRepository failing=new FailingSaveRepository(w.states(),state -> !state.isCommitted());
            ApplyReplacementPackage first=new ApplyReplacementPackage(w.core(),w.workspaces(),failing,w.workLocks(),w.mechanics());
            ApplyFailure firstFailure=applyFailure(first.executePrepared(captured,new WorkId(id)));
            eq(firstFailure.code(),ApplyFailureCode.STATE_PERSISTENCE_FAILED,"fixture Apply persistence failure");
            java.util.Map<String,byte[]> changed=new java.util.TreeMap<>(String.CASE_INSENSITIVE_ORDER);
            changed.putAll(captured.replacement());changed.put("seed.txt","different".getBytes(java.nio.charset.StandardCharsets.UTF_8));
            Core.PackageData inconsistent=new Core.PackageData(captured.archivePath(),captured.archiveSha256(),captured.manifest(),captured.base(),changed);
            ApplyFailure retry=applyFailure(w.apply().executePrepared(inconsistent,new WorkId(id)));
            eq(retry.code(),ApplyFailureCode.STATE_DIVERGED,"valid journal was rebound to different captured payload bytes");
        } finally { ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void previousJournalSchemaFailsClosed() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("apply-journal-migration",false);
        try {
            String id=UUID.randomUUID().toString();start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"journal migration",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","intended")));
            FailingSaveRepository failing=new FailingSaveRepository(w.states(),state -> !state.isCommitted());
            ApplyReplacementPackage first=new ApplyReplacementPackage(w.core(),w.workspaces(),failing,w.workLocks(),w.mechanics());
            ApplyFailure firstFailure=applyFailure(first.execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(firstFailure.code(),ApplyFailureCode.STATE_PERSISTENCE_FAILED,"fixture Apply persistence failure");
            ApplyFeatureTestSupport.setPackageJournalSchemaVersion(w,id,pkg.packageId(),"2");
            ApplyFailure retry=applyFailure(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(retry.code(),ApplyFailureCode.STATE_DIVERGED,"previous journal schema was silently adopted by new executable");
            ok(w.states().find(new WorkId(id),pkg.packageId()).isEmpty(),"previous journal schema created new-model package state");
        } finally { ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void manualApplyRepositoryMismatch() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("manual-repository-mismatch",false);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageForRepositoryIdentity(w,id,"wrong repository","github:other/repo",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","wrong")));
            ApplyFailure failure=applyFailure(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(failure.code(),ApplyFailureCode.REPOSITORY_MISMATCH,"manual Apply did not enforce package RepositoryIdentity");
            eq(ApplyFeatureTestSupport.read(ws.worktree().resolve("seed.txt")),"seed","repository-mismatched package mutated Work workspace");
        } finally { ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void workLockFailureIsOperationLocal() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("operation-lock-failure",false);
        try {
            String id=UUID.randomUUID().toString();
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"lock failure",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","next")));
            WorkOperationLock failing=workId -> { throw new WorkOperationLock.LockException("simulated Work lock failure",null); };
            ApplyReplacementPackage apply=new ApplyReplacementPackage(w.core(),w.workspaces(),w.states(),failing,w.mechanics());
            ApplyFailure af=applyFailure(apply.execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            eq(af.code(),ApplyFailureCode.OPERATION_SERIALIZATION_FAILED,"Apply lock failure was classified as state divergence");
            CommitAppliedPackage commit=new CommitAppliedPackage(w.workspaces(),w.states(),failing,w.mechanics());
            CommitAppliedFailure cf=commitFailure(commit.execute(id,pkg.packageId()));
            eq(cf.code(),CommitAppliedFailureCode.OPERATION_SERIALIZATION_FAILED,"Commit lock failure was classified as state divergence");
            PublishAppliedCommit publish=new PublishAppliedCommit(w.workspaces(),w.states(),failing,new obs.rpkg.features.apply.infrastructure.GitPublicationObserver(w.mechanics().transport()),w.mechanics());
            PublishFailure pf=publishFailure(publish.execute(id,pkg.packageId()));
            eq(pf.code(),PublishFailureCode.OPERATION_SERIALIZATION_FAILED,"Publish lock failure was classified as state divergence");
        } finally { ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void commitRecoveryAfterStateFailure() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("commit-recovery",false);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"commit recovery",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","committed")));
            success(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            FailingSaveRepository failing=new FailingSaveRepository(w.states(),ReplacementPackageState::isCommitted);
            CommitAppliedPackage first=new CommitAppliedPackage(w.workspaces(),failing,w.workLocks(),w.mechanics());
            CommitAppliedFailure failure=commitFailure(first.execute(id,pkg.packageId()));
            eq(failure.code(),CommitAppliedFailureCode.STATE_PERSISTENCE_FAILED,"commit persistence failure code");
            String created=ApplyFeatureTestSupport.git(ws.worktree(),"rev-parse","HEAD");
            ok(!created.equals(ws.baseCommit()),"fixture commit was not created");
            ReplacementPackageState recovered=commitSuccess(w.commit().execute(id,pkg.packageId()));
            eq(recovered.commitSha(),created,"Commit retry did not recover exact existing commit");
        } finally { ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void publishConfirmed() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("publish",true);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"publish",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","published")));
            success(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            ReplacementPackageState committed=commitSuccess(w.commit().execute(id,pkg.packageId()));
            ReplacementPackageState published=publishSuccess(w.publish().execute(id,pkg.packageId()));
            ok(published.isPublished(),"exact remote publication not proven");
            eq(ApplyFeatureTestSupport.remoteTip(w,ws.workBranch()),committed.commitSha(),"remote tip mismatch");
            ok(w.core().getChangeSet(id)==null,"Publish depended on/created Core.ChangeSet");
        } finally { ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void publishGuardBlocksPush() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("publish-guard",true);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"guard",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","guarded")));
            success(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));commitSuccess(w.commit().execute(id,pkg.packageId()));
            FailingSaveRepository failing=new FailingSaveRepository(w.states(),state -> state.publication() instanceof PublicationObservation.NotConfirmed);
            AtomicInteger pushes=new AtomicInteger();w.mechanics().setAfterPushAttemptHookForTests(pushes::incrementAndGet);
            PublishAppliedCommit publish=new PublishAppliedCommit(w.workspaces(),failing,w.workLocks(),new obs.rpkg.features.apply.infrastructure.GitPublicationObserver(w.mechanics().transport()),w.mechanics());
            PublishFailure failure=publishFailure(publish.execute(id,pkg.packageId()));
            eq(failure.code(),PublishFailureCode.STATE_PERSISTENCE_FAILED,"guard failure code");
            eq(pushes.get(),0,"push occurred without durable NotConfirmed guard");
            eq(ApplyFeatureTestSupport.remoteTip(w,ws.workBranch()),null,"remote changed without guard");
        } finally { ApplyFeatureTestSupport.clearPushHook(w);ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void publishFinalPersistenceFailure() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("publish-final-persist",true);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"publish persist",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","published")));
            success(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            ReplacementPackageState committed=commitSuccess(w.commit().execute(id,pkg.packageId()));
            FailingSaveRepository failing=new FailingSaveRepository(w.states(),state -> state.publication() instanceof PublicationObservation.ConfirmedTip);
            PublishAppliedCommit publish=new PublishAppliedCommit(w.workspaces(),failing,w.workLocks(),new obs.rpkg.features.apply.infrastructure.GitPublicationObserver(w.mechanics().transport()),w.mechanics());
            PublishFailure failure=publishFailure(publish.execute(id,pkg.packageId()));
            eq(failure.code(),PublishFailureCode.STATE_PERSISTENCE_FAILED,"final persistence failure code");
            eq(ApplyFeatureTestSupport.remoteTip(w,ws.workBranch()),committed.commitSha(),"push did not reach remote");
            ReplacementPackageState durable=w.states().find(new WorkId(id),pkg.packageId()).orElseThrow();
            ok(durable.publication() instanceof PublicationObservation.NotConfirmed,"durable uncertainty guard was lost");
            ApplyFeatureTestSupport.failIfAnotherPushIsAttempted(w);
            ReplacementPackageState recovered=publishSuccess(w.publish().execute(id,pkg.packageId()));
            ok(recovered.isPublished(),"Retry did not recover via confirmation");
        } finally { ApplyFeatureTestSupport.clearPushHook(w);ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void retryConfirmsBeforePush() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("retry-confirm",true);Path offline=null;
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"retry",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","retry")));
            success(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            ReplacementPackageState committed=commitSuccess(w.commit().execute(id,pkg.packageId()));
            offline=ApplyFeatureTestSupport.makeRemoteUnavailableAfterPush(w);
            PublishFailure failure=publishFailure(w.publish().execute(id,pkg.packageId()));
            eq(failure.code(),PublishFailureCode.PUBLICATION_CONFIRMATION_FAILED,"uncertain publish failure code");
            ok(failure.currentState().orElseThrow().publication() instanceof PublicationObservation.NotConfirmed,"uncertain publish did not retain guard");
            ApplyFeatureTestSupport.restoreRemote(w,offline);offline=null;
            ApplyFeatureTestSupport.failIfAnotherPushIsAttempted(w);
            ReplacementPackageState recovered=publishSuccess(w.publish().execute(id,pkg.packageId()));
            eq(recovered.commitSha(),committed.commitSha(),"retry changed commit");ok(recovered.isPublished(),"retry did not confirm existing remote effect");
            eq(ApplyFeatureTestSupport.remoteTip(w,ws.workBranch()),committed.commitSha(),"remote exact commit missing");
        } finally { ApplyFeatureTestSupport.restoreRemote(w,offline);ApplyFeatureTestSupport.clearPushHook(w);ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void unexpectedRemoteTipBlocksPush() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("remote-diverged",true);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"diverge",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","ours")));
            success(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));commitSuccess(w.commit().execute(id,pkg.packageId()));
            String unexpected=ApplyFeatureTestSupport.createUnexpectedRemoteTip(w,ws.workBranch());
            ApplyFeatureTestSupport.failIfAnotherPushIsAttempted(w);
            PublishFailure failure=publishFailure(w.publish().execute(id,pkg.packageId()));
            eq(failure.code(),PublishFailureCode.REMOTE_BRANCH_DIVERGED,"unexpected remote tip code");
            eq(ApplyFeatureTestSupport.remoteTip(w,ws.workBranch()),unexpected,"Publish overwrote unexpected remote tip");
        } finally { ApplyFeatureTestSupport.clearPushHook(w);ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void foreignPushUrlBlocksPush() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("foreign-pushurl",true);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"foreign push",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","ours")));
            success(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));commitSuccess(w.commit().execute(id,pkg.packageId()));
            ApplyFeatureTestSupport.setForeignPushUrl(w);
            ApplyFeatureTestSupport.failIfAnotherPushIsAttempted(w);
            PublishFailure failure=publishFailure(w.publish().execute(id,pkg.packageId()));
            eq(failure.code(),PublishFailureCode.REPOSITORY_MISMATCH,"foreign pushurl was not classified as repository mismatch");
            eq(ApplyFeatureTestSupport.remoteTip(w,ws.workBranch()),null,"foreign pushurl case changed intended remote");
        } finally { ApplyFeatureTestSupport.clearPushHook(w);ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void publishUsesCapturedFetchUrl() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("publish-captured-fetch",true);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"captured fetch",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","ours")));
            success(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            ReplacementPackageState committed=commitSuccess(w.commit().execute(id,pkg.packageId()));
            ApplyFeatureTestSupport.pushCommitExternally(w,ws.workBranch(),committed.commitSha());
            java.nio.file.Path foreign=ApplyFeatureTestSupport.newBareRemote(w,"foreign-observe.git");
            w.mechanics().setAfterFetchUrlVerifiedHookForTests(() -> ApplyFeatureTestSupport.setOriginUrlUnchecked(w,foreign.toString()));
            ReplacementPackageState published=publishSuccess(w.publish().execute(id,pkg.packageId()));
            ok(published.isPublished(),"Publish re-resolved mutable origin instead of using captured fetch URL");
        } finally { w.mechanics().setAfterFetchUrlVerifiedHookForTests(null);ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void publishUsesCapturedPushUrl() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("publish-captured-push",true);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"captured push",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","ours")));
            success(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            ReplacementPackageState committed=commitSuccess(w.commit().execute(id,pkg.packageId()));
            java.nio.file.Path foreign=ApplyFeatureTestSupport.newBareRemote(w,"foreign-push-after-check.git");
            w.mechanics().setAfterPushUrlVerifiedHookForTests(() -> ApplyFeatureTestSupport.setPushUrlUnchecked(w,foreign.toString()));
            ReplacementPackageState published=publishSuccess(w.publish().execute(id,pkg.packageId()));
            ok(published.isPublished(),"Publish did not confirm intended remote after captured push URL");
            eq(ApplyFeatureTestSupport.remoteTip(w,ws.workBranch()),committed.commitSha(),"captured push URL did not update intended remote");
            eq(ApplyFeatureTestSupport.bareRemoteTip(foreign,ws.workBranch()),null,"Publish re-resolved mutated pushurl and updated foreign remote");
        } finally { w.mechanics().setAfterPushUrlVerifiedHookForTests(null);ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void publishObservationIgnoresRewriteAfterVerification() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("publish-rewrite-observe",true);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"rewrite observe",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","ours")));
            success(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            ReplacementPackageState committed=commitSuccess(w.commit().execute(id,pkg.packageId()));
            ApplyFeatureTestSupport.pushCommitExternally(w,ws.workBranch(),committed.commitSha());
            java.nio.file.Path foreign=ApplyFeatureTestSupport.newBareRemote(w,"foreign-rewrite-observe.git");
            w.mechanics().setAfterFetchUrlVerifiedHookForTests(() -> ApplyFeatureTestSupport.setInsteadOfRewriteUnchecked(w,foreign));
            ReplacementPackageState published=publishSuccess(w.publish().execute(id,pkg.packageId()));
            ok(published.isPublished(),"Git insteadOf redirected verified publication observation endpoint");
            eq(ApplyFeatureTestSupport.bareRemoteTip(foreign,ws.workBranch()),null,"observation rewrite fixture unexpectedly changed foreign remote");
        } finally { w.mechanics().setAfterFetchUrlVerifiedHookForTests(null);ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void publishPushIgnoresRewriteAfterVerification() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("publish-rewrite-push",true);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"rewrite push",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","ours")));
            success(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            ReplacementPackageState committed=commitSuccess(w.commit().execute(id,pkg.packageId()));
            java.nio.file.Path foreign=ApplyFeatureTestSupport.newBareRemote(w,"foreign-rewrite-push.git");
            w.mechanics().setAfterPushUrlVerifiedHookForTests(() -> ApplyFeatureTestSupport.setPushInsteadOfRewriteUnchecked(w,foreign));
            ReplacementPackageState published=publishSuccess(w.publish().execute(id,pkg.packageId()));
            ok(published.isPublished(),"Git pushInsteadOf redirected verified Publish destination");
            eq(ApplyFeatureTestSupport.remoteTip(w,ws.workBranch()),committed.commitSha(),"verified intended remote was not published");
            eq(ApplyFeatureTestSupport.bareRemoteTip(foreign,ws.workBranch()),null,"pushInsteadOf redirected side effect to foreign remote");
        } finally { w.mechanics().setAfterPushUrlVerifiedHookForTests(null);ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void freshObservationBeforeLaterPush() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("fresh-observation",true);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var pkg=ApplyFeatureTestSupport.packageFor(w,id,"fresh observation",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","ours")));
            success(w.apply().execute(new ApplyReplacementPackage.Request(pkg.path(),id)));
            ReplacementPackageState committed=commitSuccess(w.commit().execute(id,pkg.packageId()));
            ReplacementPackageState staleSafe=committed.withPublication(new PublicationObservation.ConfirmedAbsent());
            ok(w.states().save(staleSafe).isSuccess(),"fixture ConfirmedAbsent state save failed");
            String unexpected=ApplyFeatureTestSupport.createUnexpectedRemoteTip(w,ws.workBranch());
            ApplyFeatureTestSupport.failIfAnotherPushIsAttempted(w);
            PublishFailure failure=publishFailure(w.publish().execute(id,pkg.packageId()));
            eq(failure.code(),PublishFailureCode.REMOTE_BRANCH_DIVERGED,"Publish reused stale ConfirmedAbsent authorization");
            eq(ApplyFeatureTestSupport.remoteTip(w,ws.workBranch()),unexpected,"fresh-observation case overwrote remote tip");
        } finally { ApplyFeatureTestSupport.clearPushHook(w);ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void sequentialPackages() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("sequential",true);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            var p1=ApplyFeatureTestSupport.packageFor(w,id,"one",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","one")));
            success(w.apply().execute(new ApplyReplacementPackage.Request(p1.path(),id)));var s1=commitSuccess(w.commit().execute(id,p1.packageId()));publishSuccess(w.publish().execute(id,p1.packageId()));
            var p2=ApplyFeatureTestSupport.packageFor(w,id,"two",List.of(ApplyFeatureTestSupport.replace("seed.txt","one","two")));
            success(w.apply().execute(new ApplyReplacementPackage.Request(p2.path(),id)));var s2=commitSuccess(w.commit().execute(id,p2.packageId()));var published2=publishSuccess(w.publish().execute(id,p2.packageId()));
            ok(published2.isPublished(),"second package not published");eq(ApplyFeatureTestSupport.remoteTip(w,ws.workBranch()),s2.commitSha(),"second remote tip mismatch");
            String parent=ApplyFeatureTestSupport.git(ws.worktree(),"rev-parse",s2.commitSha()+"^");eq(parent,s1.commitSha(),"second commit parent was not prior published package tip");
        } finally { ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void workspaceRecoveryAfterPersistenceFailure() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("workspace-recovery",false);
        try {
            String id=UUID.randomUUID().toString();WorkId work=new WorkId(id);
            FailingWorkspaceRepository failing=new FailingWorkspaceRepository(w.workspaces());
            StartWorkWorkspace first=new StartWorkWorkspace(w.mechanics(),failing,w.workLocks());
            var failure=first.execute(w.target(),work,"main");ok(failure.isFailure(),"fixture workspace persistence failure did not fail operation");
            ok(w.workspaces().find(work).isEmpty(),"GitWorkspace unexpectedly persisted");
            var recovered=w.start().execute(w.target(),work,"main");ok(recovered.isSuccess(),"workspace journal did not recover");
            ok(recovered.success().orElseThrow().workspace().worktree().toFile().isDirectory(),"recovered worktree missing");
            ok(w.core().getChangeSet(id)==null,"workspace recovery created Core.ChangeSet");
        } finally { ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void persistedWorkspaceRejectsConflictingJournal() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("workspace-journal-conflict",false);
        try {
            String id=UUID.randomUUID().toString();GitWorkspace ws=start(w,id);
            java.nio.file.Path journal=w.stateRoot().resolve("work-state-v2").resolve("workspace-journals").resolve("w-"+id+".properties");
            java.util.Properties p=new java.util.Properties();p.setProperty("schemaVersion","1");p.setProperty("workId",id);p.setProperty("repositoryIdentity",ws.repositoryTarget().repositoryIdentity());p.setProperty("repositoryPath",ws.repositoryTarget().registeredPath().toString());p.setProperty("targetBranch",ws.targetBranch());p.setProperty("worktree",ws.worktree().toString());p.setProperty("baseCommit","0000000000000000000000000000000000000000");
            java.nio.file.Files.createDirectories(journal.getParent());try(var out=java.nio.file.Files.newOutputStream(journal)){p.store(out,"conflict");}
            var repeated=w.start().execute(w.target(),new WorkId(id),"main");ok(repeated.isFailure(),"conflicting leftover workspace journal was silently deleted");ok(java.nio.file.Files.exists(journal),"conflicting journal was deleted instead of failing closed");
        } finally { ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void automaticComposition() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("automatic",true);
        try {
            String id=UUID.randomUUID().toString();var pkg=ApplyFeatureTestSupport.packageFor(w,id,"automatic",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","auto")));
            AutomaticPackageRealization automatic=new AutomaticPackageRealization(w.core(),w.start(),w.apply(),w.commit(),w.publish());
            var result=automatic.execute(ApplyFeatureTestSupport.actionFor(pkg),pkg.path(),w.target().id());
            ok(result.isSuccess(),"automatic composition failed: "+result.failure().map(AutomaticPackageRealization.Failure::message).orElse(""));
            var done=result.success().orElseThrow();ok(done.state().isPublished(),"automatic flow did not publish");eq(done.workspace().workId().value(),id,"automatic WorkId");
            ok(w.core().getChangeSet(id)==null,"automatic flow created/used Core.ChangeSet authority");
            eq(ApplyFeatureTestSupport.remoteTip(w,done.workspace().workBranch()),done.state().commitSha(),"automatic remote tip mismatch");
        } finally { ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static void automaticIdempotence() throws Exception {
        var w=ApplyFeatureTestSupport.workspace("automatic-idempotent",true);
        try {
            String id=UUID.randomUUID().toString();var pkg=ApplyFeatureTestSupport.packageFor(w,id,"automatic idempotent",List.of(ApplyFeatureTestSupport.replace("seed.txt","seed","auto")));
            AutomaticPackageRealization automatic=new AutomaticPackageRealization(w.core(),w.start(),w.apply(),w.commit(),w.publish());String action=ApplyFeatureTestSupport.actionFor(pkg);
            var first=automatic.execute(action,pkg.path(),w.target().id());ok(first.isSuccess(),"first automatic run failed");String commit=first.success().orElseThrow().state().commitSha();
            ApplyFeatureTestSupport.failIfAnotherPushIsAttempted(w);
            var second=automatic.execute(action,pkg.path(),w.target().id());ok(second.isSuccess(),"repeated automatic run failed");eq(second.success().orElseThrow().state().commitSha(),commit,"repeated automatic run changed commit");
        } finally { ApplyFeatureTestSupport.clearPushHook(w);ApplyFeatureTestSupport.deleteTree(w.root()); }
    }

    private static GitWorkspace start(ApplyFeatureTestSupport.Workspace w,String id){var result=w.start().execute(w.target(),new WorkId(id),"main");if(result.isFailure())throw new AssertionError("start failed: "+result.failure().orElseThrow().message());return result.success().orElseThrow().workspace();}
    private static ReplacementPackageState success(Result<ReplacementPackageState,ApplyFailure> r){if(r.isFailure())throw new AssertionError("Apply failed: "+r.failure().orElseThrow());return r.success().orElseThrow();}
    private static ApplyFailure applyFailure(Result<ReplacementPackageState,ApplyFailure> r){if(r.isSuccess())throw new AssertionError("expected Apply failure");return r.failure().orElseThrow();}
    private static ReplacementPackageState commitSuccess(Result<ReplacementPackageState,CommitAppliedFailure> r){if(r.isFailure())throw new AssertionError("Commit failed: "+r.failure().orElseThrow());return r.success().orElseThrow();}
    private static CommitAppliedFailure commitFailure(Result<ReplacementPackageState,CommitAppliedFailure> r){if(r.isSuccess())throw new AssertionError("expected Commit failure");return r.failure().orElseThrow();}
    private static ReplacementPackageState publishSuccess(Result<ReplacementPackageState,PublishFailure> r){if(r.isFailure())throw new AssertionError("Publish failed: "+r.failure().orElseThrow());return r.success().orElseThrow();}
    private static PublishFailure publishFailure(Result<ReplacementPackageState,PublishFailure> r){if(r.isSuccess())throw new AssertionError("expected Publish failure");return r.failure().orElseThrow();}

    private static final class FailingSaveRepository implements ReplacementPackageStateRepository {
        private final ReplacementPackageStateRepository delegate;private final Predicate<ReplacementPackageState> fail;private boolean failed;
        FailingSaveRepository(ReplacementPackageStateRepository delegate,Predicate<ReplacementPackageState> fail){this.delegate=delegate;this.fail=fail;}
        @Override public java.util.Optional<ReplacementPackageState> find(WorkId w,String p){return delegate.find(w,p);}
        @Override public java.util.Optional<ReplacementPackageState> findUnfinished(WorkId w){return delegate.findUnfinished(w);}
        @Override public OperationResult<Failure> save(ReplacementPackageState state){if(!failed&&fail.test(state)){failed=true;return OperationResult.failure(new Failure("simulated state persistence failure",null));}return delegate.save(state);}
    }
    private static final class FailingWorkspaceRepository implements GitWorkspaceRepository {
        private final GitWorkspaceRepository delegate;private boolean failed;
        FailingWorkspaceRepository(GitWorkspaceRepository delegate){this.delegate=delegate;}
        @Override public java.util.Optional<GitWorkspace> find(WorkId id){return delegate.find(id);}
        @Override public OperationResult<Failure> save(GitWorkspace workspace){if(!failed){failed=true;return OperationResult.failure(new Failure("simulated workspace persistence failure",null));}return delegate.save(workspace);}
    }

    private interface Throwing{void run()throws Exception;}
    private static void run(String name,Throwing body){try{body.run();passed++;System.out.println("PASS "+name);}catch(Throwable t){failed++;System.out.println("FAIL "+name+" :: "+t);if(Boolean.getBoolean("obs.tests.stack"))t.printStackTrace(System.out);}}
    private static void ok(boolean v,String message){if(!v)throw new AssertionError(message);}
    private static void eq(Object actual,Object expected,String message){if(!Objects.equals(actual,expected))throw new AssertionError(message+" expected="+expected+" actual="+actual);}
}
