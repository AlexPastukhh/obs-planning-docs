package obs.rpkg.features.apply.domain;

/** How an application adapter should treat a failed Apply result. */
public enum ApplyFailureDisposition {
    RETRYABLE,
    ACTION_REQUIRED,
    UNCERTAIN,
    TERMINAL
}
