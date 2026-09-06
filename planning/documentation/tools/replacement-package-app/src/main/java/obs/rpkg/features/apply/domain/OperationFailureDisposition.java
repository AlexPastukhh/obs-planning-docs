package obs.rpkg.features.apply.domain;

/** How a caller may proceed after one concrete operation failed. */
public enum OperationFailureDisposition {
    RETRYABLE,
    ACTION_REQUIRED,
    UNCERTAIN,
    TERMINAL
}
