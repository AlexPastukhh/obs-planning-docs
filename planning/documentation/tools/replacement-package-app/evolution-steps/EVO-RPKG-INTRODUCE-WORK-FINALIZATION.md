# EVO-RPKG-INTRODUCE-WORK-FINALIZATION — Introduce Work Finalization

Status: PLANNED
Evolution Kinds: Introduction / Expansion / Forced Migration

## Evolution Intent

Introduce a new Work-centered, independently callable Finalize capability that can take one exact reviewed published Work result to a truthful finalized state without legacy ChangeSet lifecycle authority.

## Requires

None beyond the current ability to produce and prove an exact published Work result. This Step does not require parameterized Apply handoff.

## Expected Entry State

- current package realization stops after exact Work-branch publication proof;
- the new executable has no current Work-centered Finalize capability;
- legacy deployed ChangeSet Review/Finalize remains outside the target executable;
- no target Finalize behavior may depend on legacy execution-state buckets.

## Target Owner Promotion Set

- **REPLACE** `../features/F-RPKG-FINALIZE-REPOSITORY-WORK.md` routing stub with the Target Feature body below after realization/revalidation.
- **REPLACE** `../scenarios/planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md` routing stub with the Target Scenario body below after realization/revalidation; move/promote it to the selected current Scenario location if representation changes at realization.
- **REVALIDATE/CREATE AS MATERIAL** natural Domain/Screen/Slice/proof owners required to make Finalize independently usable.

## Target Feature — F-RPKG-FINALIZE-REPOSITORY-WORK

# F-RPKG-FINALIZE-REPOSITORY-WORK — Finalize Repository Work

Status: active current Feature owner

## Intent

Finalize one exact reviewed published Work by integrating that exact result into the exact target branch and proving the required final Work-Issue communication.

## Principal Result

`RepositoryWork.Finalized` only after exact integration and exact final Issue communication are both proven.

## Semantic Entry

The Feature is independently callable with one exact `FinalizeRequest`. It does not know whether the caller is UI, CLI, Apply Feature or another future composition.

## Semantic Data

`FinalizeRequest` identifies the exact `repositoryIdentity`, `WorkId`, `IssueRef`, `workBranch`, `publishedCommit`, `publishedTreeId`, `targetBranch`, current `ReviewAuthority`, and optional actor-supplied final comment text.

`ReviewAuthority` must cover the exact `publishedTreeId` being finalized.

## Feature Behavior

### BR-RPKG-FINALIZE-EXACT-WORK
Finalize must bind to the exact Work/repository/branch/publication identities supplied by the request; labels, recency or similar trees cannot substitute identity.

### BR-RPKG-FINALIZE-CURRENT-REVIEW-AUTHORITY
Finalize is ineligible unless current review authority proves the exact `publishedTreeId`; stale/missing authority stops before integration.

### BR-RPKG-FINALIZE-INTEGRATE-EXACT-RESULT
The integration effect must integrate the exact reviewed published Work result into the exact target branch and must produce durable/verifiable integration proof. The concrete mechanism (direct integration, PR or another selected mechanism) is an OPEN target detail until selected before realization.

### BR-RPKG-FINALIZE-FINAL-ISSUE-COMMUNICATION
Finalize must post/confirm the required final communication on the exact Work Issue. Actor-supplied final text is preserved semantically. Exact generated wording and whether Finalize closes the Issue remain OPEN until selected before realization.

### BR-RPKG-FINALIZE-PRESERVE-PARTIAL-EXTERNAL-RESULTS
If one external effect is already proven and a later effect fails or is uncertain, retry/recovery preserves the proven effect and reconciles uncertainty before any duplicate attempt.

### BR-RPKG-FINALIZE-MARK-FINALIZED-ONLY-AFTER-BOTH-PROVEN
`RepositoryWork.Finalized` is established only when both exact integration proof and exact final Issue-communication proof exist.

## Boundary Decisions

Finalize is a separate independently callable Feature. It owns its eligibility, effects, recovery/reconciliation and terminal Result. It has no dependency on Apply, `ApplyExtent`, `FinalizeMode`, handoff/URI representation or automatic/manual invocation policy.

Another Feature may invoke Finalize by supplying a valid `FinalizeRequest`; that creates no reverse dependency and does not move Finalize behavior to the caller.

Legacy `Core.ChangeSet` execution states, generic package Resume and old ChangeSet Finalize controls are not authority for this Feature.


## Target Scenario — SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK

# SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK — Complete Reviewed Repository Work

Status: active current Scenario owner

## Application Benefit / Desired Result

An exact published Work result is proven to be the exact previously reviewed result, integrated into the exact target branch, and finalized with truthful external-effect evidence, without restoring legacy ChangeSet lifecycle semantics.

## Scenario Entry

The Scenario receives one exact published Work result plus exact upstream review evidence for the predicted/reviewed result. The application must prove that the published result is the reviewed result before Finalize eligibility exists; visual similarity, labels and recency are not approval authority.

## Scenario Process / Feature Interaction Map

```text
exact published Work result
+ exact reviewed-result evidence
        ↓
FI-RPKG-CONFIRM-REVIEWED-PUBLISHED-RESULT
        ↓
current ReviewAuthority for exact publishedTreeId
        ↓
FI-RPKG-VERIFY-FINALIZE-ELIGIBILITY
        ↓
F-RPKG-FINALIZE-REPOSITORY-WORK
        ├─ exact integration proof
        ├─ exact final Issue communication proof
        └─ RepositoryWork.Finalized
```

## FI-RPKG-CONFIRM-REVIEWED-PUBLISHED-RESULT

Bind review authority only after proving the actual published Work result equals the exact reviewed result and belongs to the intended Work/package/source context. Git resulting-tree equality is the preferred exact content identity when applicable. Failure to prove identity leaves the published result unapproved and blocked from Finalize; it is preserved as evidence rather than automatically rewritten.

## FI-RPKG-VERIFY-FINALIZE-ELIGIBILITY

Require exact Work/repository/publication identity and current `ReviewAuthority` for the exact `publishedTreeId`. Missing/stale authority stops before Finalize.

## Finalize Interaction

Invoke the independently callable `F-RPKG-FINALIZE-REPOSITORY-WORK`. The Scenario does not duplicate the Feature's integration/comment/recovery contract.

## Scenario Result

Success means the exact published Work result is proven to be the reviewed result, exact integration into the target branch is proven, required final Work-Issue communication is proven, and the Work is `Finalized`.

## Boundaries

- this Scenario does not own Apply/Commit/Publish behavior;
- this Scenario does not define automatic Apply→Finalize composition;
- this Scenario does not use `Ready`, `AppliedUncommitted`, `CommittedUnpublished`, `PublicationUncertain` or generic `Resume` as public/domain state;
- the future automatic Apply entry may call the independent Finalize Feature without changing this Scenario/Feature authority.


## Transition Obligations

- do not import old persisted ChangeSet lifecycle state into the new Finalize capability;
- old deployed executable remains owner of old works;
- select any still-OPEN integration/review-authority/Issue-closure details before implementation if they are required for a usable realized target;
- remove or retire any remaining future-planning artifact that would compete with the promoted Feature/Scenario owners.

## Realization / Promotion Gate

The Step may become `IMPLEMENTED` only when the target Finalize Feature is independently usable, its target Scenario is coherent, all material OPEN choices required for execution are selected, required proof exists, and the target bodies can be promoted into canonical Feature/Scenario owners without reconstructing semantics from a delta list.
