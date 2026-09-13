# SCN-RPKG-COMPLETE-REPOSITORY-WORK — Complete Prepared Repository Work

Status: active current Scenario owner

## Application Benefit / Desired Result

One exact logical Work is bound to the intended repository, has durable semantic intent and Git workspace identity, and realizes replacement packages safely through the current Apply Feature. Interruption/retry preserves already-proven facts without generic Resume state or blind external side effects.

Old persisted ChangeSet work is intentionally outside this executable; the already-deployed previous build remains its owner.

## Scenario Process / Feature Interaction Map

```text
FI-RPKG-RESOLVE-CURRENT-REPOSITORY-WORK
    ↓
FI-RPKG-ESTABLISH-CURRENT-WORK-INTENT
    ↓
FI-RPKG-ENSURE-WORKSPACE
    ↓
FI-RPKG-REALIZE-CURRENT-PACKAGE
    ↓
F-RPKG-APPLY-REPLACEMENT-PACKAGE
    ├─ Apply
    ├─ Commit applied
    └─ Publish / Retry Publish
    ↓
exact package commit publication proven
    ↓
STOP at current target boundary
```

Automatic `OBS-ACTION apply-package` is the current full entry composition of these interactions. It does not expose or dispatch through an internal stage enum. The Apply Feature owns the meaning and boundaries of its Apply/Commit/Publish modules; this Scenario owns the wider Work journey and does not duplicate those module contracts.

## FI-RPKG-RESOLVE-CURRENT-REPOSITORY-WORK

Requirement:
Resolve one exact registered Repository Target, WorkId (schema-1 `changeSetId` wire alias), exact package identity and explicit target branch before repository mutation.

Behavior Items:

### BI-RPKG-CURRENT-EXACT-REPOSITORY-TARGET
Repository mutation remains bound to the captured exact Repository Target; same-origin clone convenience or later UI selection cannot retarget the operation.

### BI-RPKG-CURRENT-WORK-ID-AUTHORITY
`PACKAGE.json.changeSetId` is parsed as WorkId for schema-1 continuity. Human labels, recency and UI selection never substitute identity.

### BI-RPKG-CURRENT-PREFLIGHT-BEFORE-MUTATION
Package/manifest/payload/target/source facts that can be proven before mutation must be proven before first file/Git side effect.

## FI-RPKG-ESTABLISH-CURRENT-WORK-INTENT

Ensure one exact managed GitHub Issue for WorkId by exact `ChangeSet-Id: <WorkId>` marker. Create is journaled/reconciled so an uncertain external create response cannot cause a blind duplicate.

Work Intent may exist before GitWorkspace. It is semantic intent, not the workspace/package state owner.

## FI-RPKG-ENSURE-WORKSPACE

Ensure one persisted `GitWorkspace = (WorkId, RepositoryTarget, targetBranch, worktree, baseCommit)`.

Requirements:
- branch is deterministic from WorkId;
- worktree remains persisted and exact;
- exact initial target-branch commit is persisted as baseCommit;
- workspace intent is journaled before branch/worktree mutation;
- retry adopts only the exact journal-owned deterministic effects;
- Start workspace does not create/read/update `Core.ChangeSet`.

## FI-RPKG-REALIZE-CURRENT-PACKAGE

Invoke `F-RPKG-APPLY-REPLACEMENT-PACKAGE` for the exact Work/package. The Feature owner defines the current Apply, Commit and Publish/Retry module contracts, their independent operation Results and their recovery boundaries.

Current automatic `OBS-ACTION apply-package` invokes the complete Apply → Commit → Publish path after workspace establishment. Manual UI/CLI entries may invoke the same modules separately. Requested extent and automatic Finalize selection are not current command semantics; they remain planned evolution.

## Durable state semantics

`GitWorkspace` owns workspace facts.

`ReplacementPackageState` owns exact package/commit/publication facts.

Package/workspace journals own recovery evidence for side effects that may outlive a failed final state write.

`Result<T,E>` / `OperationResult<E>` own concrete invocation outcome.

No current target operation uses `Ready`, `AppliedUncommitted`, `CommittedUnpublished`, `PublicationUncertain`, `ApplyExtent` or generic Resume as public/domain state.

## Cross-package invariant

One Work may have many completed package realizations but at most one unfinished package. The next package cannot begin until the prior package publication boundary is proven complete.

## Current Scenario result

Success of current automatic package realization means the exact package commit is durably proven published on the derived Work branch. The current Scenario stops there. Reviewed-result confirmation, integration PR and target Finalize remain future behavior and must consume Work-centered owners rather than restore a ChangeSet state bucket.

## Evolution Steps

Current and future evolution authority is centralized in `../evolution-steps-map.md`. In particular:
- current one-Feature/three-module realization is the implemented result of `EVO-RPKG-MODULARIZE-PACKAGE-REALIZATION`;
- parameterized handoff extent is planned by `EVO-RPKG-PARAMETERIZE-APPLY-HANDOFF`;
- reviewed-result/Finalize adoption, including any future automatic Apply→Finalize composition, is planned by `EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW`;
- URI entry is planned separately by `EVO-RPKG-ADD-APPLY-URI-ENTRY`.
