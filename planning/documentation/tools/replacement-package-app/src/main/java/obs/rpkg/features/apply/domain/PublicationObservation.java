package obs.rpkg.features.apply.domain;

import java.util.Objects;

/**
 * Last durable knowledge about publication of the current package commit.
 *
 * <p>This is state/evidence, not success/failure of an operation.</p>
 */
public sealed interface PublicationObservation
        permits PublicationObservation.NotRequested,
                PublicationObservation.NotConfirmed,
                PublicationObservation.ConfirmedAbsent,
                PublicationObservation.ConfirmedTip {

    record NotRequested() implements PublicationObservation {}

    /** A publication attempt may have happened, but no reliable remote observation is available. */
    record NotConfirmed() implements PublicationObservation {}

    /** A reliable observation proved that the work branch does not exist on the remote. */
    record ConfirmedAbsent() implements PublicationObservation {}

    /** A reliable observation proved the exact current remote work-branch tip. */
    record ConfirmedTip(String commitSha) implements PublicationObservation {
        public ConfirmedTip {
            if (commitSha == null || commitSha.isBlank()) {
                throw new IllegalArgumentException("commitSha is required");
            }
        }
    }

    default boolean isConfirmed() {
        return this instanceof ConfirmedAbsent || this instanceof ConfirmedTip;
    }

    default boolean confirmsTip(String commitSha) {
        return this instanceof ConfirmedTip tip && Objects.equals(tip.commitSha(), commitSha);
    }
}
