package obs.rpkg.features.apply.domain;

/** Truthful proven progress of one exact package application. */
public enum ApplyProgress {
    APPLIED,
    COMMITTED,
    PUBLICATION_UNCERTAIN,
    PUBLISHED;

    public boolean satisfies(ApplyExtent extent) {
        return switch (extent) {
            case APPLY -> true;
            case APPLY_COMMIT -> this == COMMITTED || this == PUBLICATION_UNCERTAIN || this == PUBLISHED;
            case APPLY_COMMIT_PUBLISH -> this == PUBLISHED;
        };
    }
}
