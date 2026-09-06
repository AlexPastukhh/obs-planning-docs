package obs.replacementpackage.domain.testing;

import java.util.*;
import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.repositorywork.*;
import obs.replacementpackage.domain.workissue.*;
import obs.replacementpackage.domain.replacementpackage.*;
import obs.replacementpackage.domain.packagereview.*;
import obs.replacementpackage.domain.packageapplication.*;
import obs.replacementpackage.domain.workfinalization.*;
import obs.replacementpackage.domain.snapshotexport.*;
import obs.replacementpackage.domain.externalinteraction.*;

public abstract class DomainTestSupport {
    // Fixtures

    protected RepositoryWork activeWork() {
        return RepositoryWork.planNewRepositoryWork(
                cs("cs-1"), repo(), branch("main"), commit("1111"), branch("work/cs-1"));
    }

    protected ManagedWorkIdentityText managed() {
        return new ManagedWorkIdentityText(cs("cs-1"), branch("work/cs-1"), branch("main"), commit("1111"));
    }

    protected WorkIssue workIssue() {
        return WorkIssue.fromConfirmedIssue(issue(42), new IssueTitle("Work"), managed(), new ActorIssueText("old"));
    }

    protected ReplacementPackage packageWith(PackageOperation... operations) {
        return ReplacementPackage.createValidatedPackage(pkg("pkg-1"), cs("cs-1"), repo(), commit("1111"),
                List.of(operations));
    }

    protected PackageReview review(String predictedTree, String latestFrom, String cumulativeFrom, String expectedSource) {
        GitTreeId tree = tree(predictedTree);
        return PackageReview.createValidatedReview(
                new ReviewId("review-1"), cs("cs-1"), pkg("pkg-1"), branch("work/cs-1"),
                commit("0000"), commit(expectedSource), tree,
                DiffArtifact.toTree(commit(latestFrom), tree),
                DiffArtifact.toTree(commit(cumulativeFrom), tree),
                new WorkspaceResultId("workspace-result-1", tree));
    }

    protected PackageApplication newApplication(ApplyExtent extent) {
        return PackageApplication.begin(cs("cs-1"), pkg("pkg-1"), commit("1111"), branch("work/cs-1"), extent);
    }

    protected PackageApplication committedApplication() {
        return newApplication(ApplyExtent.APPLY_COMMIT_PUBLISH)
                .markApplied(tree("tree-A"))
                .markCommitted(commit("aaaa"), tree("tree-A"));
    }

    protected WorkFinalization finalization() {
        return WorkFinalization.begin(
                cs("cs-1"), branch("work/cs-1"), commit("aaaa"), tree("tree-A"),
                branch("main"), new ReviewAuthority(tree("tree-A")), issue(42),
                Optional.of(new CommentText("done")));
    }

    protected IntegrationEvidence validIntegration() {
        return new IntegrationEvidence(commit("aaaa"), tree("tree-A"), branch("main"));
    }

    protected IssueCommentEvidence validFinalComment() {
        return new IssueCommentEvidence(issue(42), new IssueCommentId(9001), new CommentText("done"));
    }

    protected SnapshotInventory inventory(String fp, String path, String artifact) {
        return new SnapshotInventory(Map.of(path, new ArtifactFingerprint(artifact)), new CaptureFingerprint(fp));
    }

    protected ExternalInteraction interaction() {
        return ExternalInteraction.begin(new InteractionId("interaction-1"),
                new ArtifactFingerprint("sha256:abc"), new ConversationKey("chat-7"),
                DeliveryMode.ATTACH_AND_SEND);
    }

    protected static ChangeSetId cs(String v) { return new ChangeSetId(v); }
    protected static PackageId pkg(String v) { return new PackageId(v); }
    protected static RepositoryIdentity repo() { return new RepositoryIdentity("github:acme/repo"); }
    protected static BranchName branch(String v) { return new BranchName(v); }
    protected static CommitId commit(String v) { return new CommitId(v); }
    protected static GitTreeId tree(String v) { return new GitTreeId(v); }
    protected static IssueRef issue(long n) { return new IssueRef(n); }
    protected static PackagePath path(String v) { return new PackagePath(v); }
    protected static FileBytes bytes(String v) { return FileBytes.utf8(v); }
    protected static RemoteBranchRef remote() { return new RemoteBranchRef("origin/work/cs-1"); }
    protected static RepositoryTargetRef targetRef() { return new RepositoryTargetRef("repo-1"); }
    protected static ValidatedSnapshotOutputPath output() {
        return new ValidatedSnapshotOutputPath(new CanonicalPath("/exports/snapshot.zip"));
    }

    // Assertions

    protected static void equal(Object expected, Object actual) {
        if (!Objects.equals(expected, actual))
            throw new AssertionError("expected <" + expected + "> but was <" + actual + ">");
    }

    protected static void notEqual(Object unexpected, Object actual) {
        if (Objects.equals(unexpected, actual))
            throw new AssertionError("did not expect <" + actual + ">");
    }

    protected static void isTrue(boolean value) {
        if (!value) throw new AssertionError("expected true");
    }

    protected static void isFalse(boolean value) {
        if (value) throw new AssertionError("expected false");
    }

    protected static <T extends Throwable> T throwsType(Class<T> type, Runnable action) {
        try {
            action.run();
        } catch (Throwable t) {
            if (type.isInstance(t)) return type.cast(t);
            throw new AssertionError("expected " + type.getName() + " but got " + t, t);
        }
        throw new AssertionError("expected " + type.getName() + " to be thrown");
    }
}
