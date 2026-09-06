package obs.replacementpackage.domain.workfinalization;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.util.*;

/** Aggregate-local Value Object: one recorded integration attempt fact; no independent identity. */
public record IntegrationAttempt(
            IntegrationAttemptEvidence intended,
            AttemptOutcome outcome,
            Optional<IntegrationEvidence> confirmedEvidence) {
        public IntegrationAttempt {
            Objects.requireNonNull(intended); Objects.requireNonNull(outcome);
            confirmedEvidence = Objects.requireNonNull(confirmedEvidence);
        }
    }
