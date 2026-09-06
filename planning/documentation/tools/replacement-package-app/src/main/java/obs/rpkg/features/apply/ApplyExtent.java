package obs.rpkg.features.apply;

/** Requested terminal extent of the Apply Replacement Package feature. */
public enum ApplyExtent {
    APPLY,
    APPLY_COMMIT,
    APPLY_COMMIT_PUBLISH;

    boolean requiresCommit() {
        return this == APPLY_COMMIT || this == APPLY_COMMIT_PUBLISH;
    }

    boolean requiresPublish() {
        return this == APPLY_COMMIT_PUBLISH;
    }
}
