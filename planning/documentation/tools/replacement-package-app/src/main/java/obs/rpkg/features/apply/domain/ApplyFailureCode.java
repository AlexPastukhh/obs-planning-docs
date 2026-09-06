package obs.rpkg.features.apply.domain;

/** Feature-local failure vocabulary; legacy Core error strings are adapted into these values. */
public enum ApplyFailureCode {
    INVALID_PACKAGE,
    PACKAGE_IDENTITY_MISMATCH,
    REPOSITORY_MISMATCH,
    EXPECTED_SOURCE_CHANGED,
    EXPECTED_SOURCE_UNVERIFIABLE,
    REPOSITORY_NOT_READY,
    STATE_DIVERGED,
    ROLLBACK_UNVERIFIED,
    COMMIT_FAILED,
    PUBLISH_FAILED,
    PUBLICATION_UNCERTAIN,
    REMOTE_BRANCH_DIVERGED,
    UNEXPECTED_LEGACY_FAILURE
}
