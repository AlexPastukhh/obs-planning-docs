package obs.replacementpackage.domain.packageapplication;

/** Typed evidence union carried by one PublicationAttempt Entity. */
public sealed interface PublicationAttemptResultEvidence
        permits PublicationAttemptEvidence, PublicationEvidence {}
