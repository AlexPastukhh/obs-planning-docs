package obs.replacementpackage.domain.errors;

/** Exact RepositoryWork is already bound to a different confirmed Work Issue. */
@SuppressWarnings("serial")
public final class WorkIssueMismatch extends DomainViolation {
    public WorkIssueMismatch() { super("confirmed Work Issue differs from the already recorded Work Issue"); }
}
