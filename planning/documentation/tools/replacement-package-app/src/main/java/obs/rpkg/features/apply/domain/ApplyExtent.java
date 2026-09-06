package obs.rpkg.features.apply.domain;

/** Requested terminal extent of F-RPKG-APPLY-REPLACEMENT-PACKAGE. */
public enum ApplyExtent {
    APPLY,
    APPLY_COMMIT,
    APPLY_COMMIT_PUBLISH;

    public boolean requiresCommit() {
        return this == APPLY_COMMIT || this == APPLY_COMMIT_PUBLISH;
    }

    public boolean requiresPublish() {
        return this == APPLY_COMMIT_PUBLISH;
    }
}
