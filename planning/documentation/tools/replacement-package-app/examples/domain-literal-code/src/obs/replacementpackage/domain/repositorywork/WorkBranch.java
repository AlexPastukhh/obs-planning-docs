package obs.replacementpackage.domain.repositorywork;

import obs.replacementpackage.domain.shared.valueobjects.BranchName;
import obs.replacementpackage.domain.shared.valueobjects.CommitId;
import java.util.Objects;
import java.util.Optional;

/** Child Entity of RepositoryWork. Identity inside the Aggregate is BranchName. */
public final class WorkBranch {
    private final BranchName name;
    private final CommitId startBaseCommit;
    private final Optional<CommitId> knownTip;

    public WorkBranch(BranchName name, CommitId startBaseCommit, Optional<CommitId> knownTip) {
        this.name = Objects.requireNonNull(name);
        this.startBaseCommit = Objects.requireNonNull(startBaseCommit);
        this.knownTip = Objects.requireNonNull(knownTip);
    }
    public BranchName name() { return name; }
    public CommitId startBaseCommit() { return startBaseCommit; }
    public Optional<CommitId> knownTip() { return knownTip; }

    @Override public boolean equals(Object other) {
        return other instanceof WorkBranch branch && name.equals(branch.name);
    }
    @Override public int hashCode() { return name.hashCode(); }
}
