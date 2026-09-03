# Repository Work / ChangeSet

Status: active current Aggregate owner with planned evolution impact

## Responsibility

Own current App repository-work consistency across Repository Target association, pinned Git execution identity, package realization/recovery and lifecycle facts.

The planned reviewed-result workflow materially affects this current Aggregate, but this document does not preselect `Repository Work / ChangeSet` as the future owner of all reviewed-result, PR, final-logging or closure state.

## Behavior Items Implemented

Current:
- `BI-RPKG-CURRENT-CHANGESET-ID-AUTHORITY`
- `BI-RPKG-CURRENT-GIT-RETRY-RESUMES`
- `BI-RPKG-CURRENT-PARTIAL-STATE-TRUTHFUL`
- `BI-RPKG-CURRENT-PUBLICATION-UNCERTAIN-BLOCKS-NEXT`
- current legacy review/finalize binding BIs where persisted ChangeSet state is authority.

Future BI families remain Scenario-owned and are not claimed implemented here.

## Domain Concepts / Invariants

Current Git-backed:
- stable internal `changeSetId` / label and exact Repository Target;
- Work Intent Issue reference when established;
- exact target branch, deterministic ChangeSet branch/worktree and common-repository relation;
- immutable `baseCommit` plus current proven `publishedTip`;
- explicit execution truth such as `Ready`, `AppliedUncommitted`, `CommittedUnpublished`, `PublicationUncertain`;
- package Apply/commit/publication evidence belongs to the same logical work identity.

Legacy compatibility remains current only for legacy work.

Planned Scenario pressure on Domain realization includes:
- consuming exact Builder-established Issue/work branch/target/source context;
- preserving exact Builder review binding through consumer execution;
- proving actual published revision currentness against the reviewed result;
- supporting route/resume truth across Apply, Commit, Push, confirmation and optional Finalize;
- supporting PR/integration/final-record/Issue-close correctness and recovery.

These are Scenario requirements that future Domain realization must support. They are **not** a declaration that all of those facts belong inside this Aggregate.

Open Domain allocation questions include:
- whether reviewed-result binding belongs in this Aggregate, a narrower value/object, or another consistency owner;
- whether PR/finalization state belongs with repository execution state or a separate integration/finalization owner;
- whether final Issue-record reconciliation needs its own durable consistency boundary;
- which Builder-established work facts are copied, referenced or independently verified by the consumer.

Current internal `changeSetId` may remain a hidden migration/runtime identity. The planned target does not require it to become the user-facing work identity.

## Domain Implementation Items — Current

### DI-RPKG-CHANGESET-PINNED-GIT-BOUNDARY

Requirement:
Current Git-backed execution decisions use persisted exact target/branch/worktree/common-repository/`baseCommit`/`publishedTip` facts rather than mutable checkout state.

## Tests

Current proof remains integration-oriented in `SL-RPKG-01`, `SL-RPKG-02`, `SL-RPKG-03` and `SL-RPKG-11`.

## Evolution Impact

### EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC

Target Current Change stops being approval/finalization authority; legacy fields remain while legacy ChangeSets require them.

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW

Canonical target Scenario:
[`SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK`](../scenarios/planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md)

Impact on this current owner:
- its current execution identity cannot silently conflict with Builder-established repository work;
- current Apply/Commit/Push recovery state is a likely migration input to the target route/resume model;
- current persisted facts may need to participate in reviewed-result proof and later finalization recovery.

Target allocation remains **TBD**. In particular, this Evolution Impact does not yet assign reviewed-result binding, PR currentness, final logging or Issue-close reconciliation to this Aggregate.

No future `DI-*` item or expanded Aggregate boundary is selected here.

Forced migration:
Target Finalize must not depend on legacy ReviewDiff/Path Ownership approval semantics.
