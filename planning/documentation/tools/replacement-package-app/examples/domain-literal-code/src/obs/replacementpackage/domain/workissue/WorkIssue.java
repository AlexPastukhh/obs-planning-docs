package obs.replacementpackage.domain.workissue;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.util.*;

public final class WorkIssue {
    private final IssueRef issueRef;
    private final IssueTitle title;
    private final ManagedWorkIdentityText managedIdentity;
    private final ActorIssueText actorText;
    private final List<IssueComment> comments;

    private WorkIssue(
            IssueRef issueRef,
            IssueTitle title,
            ManagedWorkIdentityText managedIdentity,
            ActorIssueText actorText,
            List<IssueComment> comments) {
        this.issueRef = Objects.requireNonNull(issueRef);
        this.title = Objects.requireNonNull(title);
        this.managedIdentity = Objects.requireNonNull(managedIdentity);
        this.actorText = Objects.requireNonNull(actorText);
        this.comments = List.copyOf(comments);
    }

    public static WorkIssue fromConfirmedIssue(
            IssueRef issueRef,
            IssueTitle title,
            ManagedWorkIdentityText managedIdentity,
            ActorIssueText actorText) {
        return new WorkIssue(issueRef, title, managedIdentity, actorText, List.of());
    }

    public WorkIssueIdentityValidation requireManagedWorkIdentity(
            ChangeSetId changeSetId,
            BranchName workBranch) {
        return new WorkIssueIdentityValidation(
                managedIdentity.changeSetId().equals(changeSetId)
                        && managedIdentity.workBranch().equals(workBranch));
    }

    // Selected FUTURE Feature support. Exact Issue-body serialization remains outside Domain.
    public WorkIssue replaceActorIssueText(ActorIssueText newActorText) {
        return new WorkIssue(issueRef, title, managedIdentity, Objects.requireNonNull(newActorText), comments);
    }

    public WorkIssue recordConfirmedComment(IssueCommentId commentId, CommentText body) {
        ArrayList<IssueComment> updated = new ArrayList<>(comments);
        IssueComment next = new IssueComment(commentId, body);
        if (updated.stream().noneMatch(c -> c.commentId().equals(commentId))) {
            updated.add(next);
        } else {
            IssueComment existing = updated.stream()
                    .filter(c -> c.commentId().equals(commentId)).findFirst().orElseThrow();
            if (!existing.body().equals(next.body()))
                throw new IllegalArgumentException("same comment id with different body");
        }
        return new WorkIssue(issueRef, title, managedIdentity, actorText, updated);
    }

    // Selected FUTURE Feature support. Transport/reread mechanics remain outside Domain.
    public IssueEditVerification verifyConfirmedActorText(ObservedIssue observed, ActorIssueText expected) {
        Objects.requireNonNull(observed); Objects.requireNonNull(expected);
        return new IssueEditVerification(
                observed.actorText().equals(expected),
                observed.managedIdentity().equals(managedIdentity));
    }

    public IssueRef issueRef() { return issueRef; }
    public IssueTitle title() { return title; }
    public ManagedWorkIdentityText managedIdentity() { return managedIdentity; }
    public ActorIssueText actorText() { return actorText; }
    public List<IssueComment> comments() { return comments; }
}
