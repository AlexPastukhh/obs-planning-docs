# Replacement Package Application — Terms / Ubiquitous Language

Use one canonical term where the same concept recurs across Application/Scenario/Feature/Domain/Slice/code. Terms stabilize vocabulary; they do not steal natural semantic ownership.

| Term ID | Canonical term | Plain definition | Natural semantic owner/reference | Avoid / aliases |
|---|---|---|---|---|
| <a id="term-rpkg-work-01"></a>`TERM-RPKG-WORK-01` | Work | One logical repository work effort/context identified by one exact WorkId. | Application/Scenario context; exact identity by WorkId | “latest task” as identity |
| <a id="term-rpkg-workid-02"></a>`TERM-RPKG-WORKID-02` | WorkId | Exact stable identity for one Work. | WorkId Domain owner | title/recency as identity |
| <a id="term-rpkg-replacement-package-03"></a>`TERM-RPKG-REPLACEMENT-PACKAGE-03` | Replacement Package | Exact protocol artifact describing add/replace/delete repository result operations. | Package protocol / Feature meaning | patch as synonym |
| <a id="term-rpkg-package-identity-04"></a>`TERM-RPKG-PACKAGE-IDENTITY-04` | Package Identity | Exact package identity: packageId plus archive SHA-256 when exact bytes matter. | Apply/Builder semantics | filename-only identity |
| <a id="term-rpkg-replacement-package-state-05"></a>`TERM-RPKG-REPLACEMENT-PACKAGE-STATE-05` | Replacement Package State | Durable Domain record of Proven Apply/Commit/Publish facts for one exact Work + Package Identity, including uncertainty when needed. | Replacement Package State Aggregate | package proof record / package evidence |
| <a id="term-rpkg-proven-result-06"></a>`TERM-RPKG-PROVEN-RESULT-06` | Proven Result | Result for which the Application has enough exact evidence to treat the fact as true. | Natural Feature/Domain owner | attempted/assumed result |
| <a id="term-rpkg-publication-uncertainty-07"></a>`TERM-RPKG-PUBLICATION-UNCERTAINTY-07` | Publication Uncertainty | Publish may have happened, but exact remote result cannot currently be proven. | Apply behavior / state owner | definite failure when effect may exist |
| <a id="term-rpkg-reconciliation-08"></a>`TERM-RPKG-RECONCILIATION-08` | Reconciliation | Observe current durable/external facts before repeating a possible effect. | Natural Feature/Domain/Slice owner | blind retry |
| <a id="term-rpkg-work-branch-09"></a>`TERM-RPKG-WORK-BRANCH-09` | Work Branch | Exact branch associated with one Work realization. Ownership/creation of that branch is defined by the selected Application boundary intent plus the applicable current/Step-owned downstream Scenario/realization owner, not by the term itself. | Scenario / repository context | recent branch as identity |
| <a id="term-rpkg-application-handoff-18"></a>`TERM-RPKG-APPLICATION-HANDOFF-18` | Application Handoff | Exact request carrying package/target context into authoritative App realization. Authorship/trigger ownership is defined by the applicable Scenario/Application boundary. | Scenario / Apply entry | filename or UI recency as authority |
