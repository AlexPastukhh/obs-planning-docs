package obs.rpkg.features.apply.domain;

/** Whether the external publication state for the current package commit has been observed reliably. */
public enum PublicationConfirmationState {
    /** No publication operation/confirmation is required for the current achieved extent. */
    NOT_REQUESTED,

    /** Publication was attempted, but the external state could not be confirmed. */
    NOT_CONFIRMED,

    /** The external state was observed reliably. Published/not-published is derived from the exact observed tip. */
    CONFIRMED
}
