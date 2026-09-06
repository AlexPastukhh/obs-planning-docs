package obs.replacementpackage.domain.workfinalization;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.util.*;

/** Aggregate-local Value Object: one recorded final-comment attempt fact; no independent identity. */
public record FinalIssueCommentAttempt(
            IssueCommentAttemptEvidence intended,
            AttemptOutcome outcome,
            Optional<IssueCommentEvidence> confirmedEvidence) {
        public FinalIssueCommentAttempt {
            Objects.requireNonNull(intended); Objects.requireNonNull(outcome);
            confirmedEvidence = Objects.requireNonNull(confirmedEvidence);
        }
    }
