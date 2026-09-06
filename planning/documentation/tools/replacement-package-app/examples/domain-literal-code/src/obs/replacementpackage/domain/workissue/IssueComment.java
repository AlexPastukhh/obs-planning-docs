package obs.replacementpackage.domain.workissue;

import obs.replacementpackage.domain.shared.valueobjects.CommentText;
import obs.replacementpackage.domain.shared.valueobjects.IssueCommentId;
import java.util.Objects;

/** Child Entity of WorkIssue. Identity is IssueCommentId; body is Entity state. */
public final class IssueComment {
    private final IssueCommentId commentId;
    private final CommentText body;

    public IssueComment(IssueCommentId commentId, CommentText body) {
        this.commentId = Objects.requireNonNull(commentId);
        this.body = Objects.requireNonNull(body);
    }
    public IssueCommentId commentId() { return commentId; }
    public CommentText body() { return body; }

    @Override public boolean equals(Object other) {
        return other instanceof IssueComment comment && commentId.equals(comment.commentId);
    }
    @Override public int hashCode() { return commentId.hashCode(); }
}
