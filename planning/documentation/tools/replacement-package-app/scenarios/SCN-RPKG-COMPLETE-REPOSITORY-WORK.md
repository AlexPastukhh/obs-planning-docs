# SCN-RPKG-COMPLETE-REPOSITORY-WORK — Complete Prepared Repository Work

Status: active current Scenario owner

## Application Benefit / Desired Result

One exact logical Work is bound to the intended repository, has durable semantic intent and Git workspace identity, and realizes replacement packages safely through explicit Apply, Commit and Publish operations. Interruption/retry preserves already-proven facts without generic Resume state or blind external side effects.

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
    ├─ Apply Package
    ├─ Commit applied
    └─ Publish / Retry Publish
    ↓
exact package commit publication proven
    ↓
STOP at current target boundary
```

Automatic `OBS-ACTION apply-package` is an entry composition of these interactions. It does not expose or dispatch through an internal stage enum.

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

### Apply Package

- read/validate/hash the ZIP once for the invocation;
- use captured package bytes as mutation authority; do not reopen a mutable archive path for Apply;
- require exact persisted GitWorkspace;
- require exact applicability for every add/replace/delete;
- journal package identity, baseHead and prior/intended bytes before mutation;
- persist exact `ReplacementPackageState` only after intended file state is proven;
- Apply stops before Commit.

### Commit applied

- require exact GitWorkspace + package state + package journal;
- commit only intended package paths;
- record exact identity trailers;
- if Git commit exists but state persistence failed, retry proves exact commit parent/trailers/paths/bytes and reuses it;
- persist commit SHA in ReplacementPackageState;
- Commit stops before Publish.

### Publish / Retry Publish

- obtain reliable exact remote work-branch observation before every possible push;
- exact intended commit already remote → success without push;
- absent or exact package journal baseHead → push may be safe;
- unexpected remote tip → `REMOTE_BRANCH_DIVERGED`, no push;
- persist `NotConfirmed` before possible push;
- push exact commit with force-with-lease tied to the observed safe previous state;
- after possible push, observe again and persist exact evidence;
- missing confirmation is failure of confirmation, not “confirmed absent”;
- Retry Publish is the same Feature operation and confirms before another push.

## Durable state semantics

`GitWorkspace` owns workspace facts.

`ReplacementPackageState` owns exact package/commit/publication facts.

Package/workspace journals own recovery evidence for side effects that may outlive a failed final state write.

`Result<T,E>` / `OperationResult<E>` own concrete invocation outcome.

No target operation uses `Ready`, `AppliedUncommitted`, `CommittedUnpublished`, `PublicationUncertain`, `ApplyExtent` or generic Resume as public/domain state.

## Cross-package invariant

One Work may have many completed package realizations but at most one unfinished package. The next package cannot begin until the prior package publication boundary is proven complete.

## Current Scenario result

Success of automatic package realization means the exact package commit is durably proven published on the derived Work branch. The current Scenario stops there. Reviewed-result confirmation, integration PR and target Finalize remain future behavior and must consume Work-centered owners rather than restore a ChangeSet state bucket.

## Evolution Steps

### EVO-RPKG-RETIRE-CHANGESET-AGGREGATE
Intent: IMPLEMENTED FOR TARGET EXECUTABLE PATHS

- WorkId/GitWorkspace/ReplacementPackageState are current owners;
- Start/Apply/Commit/Publish/automatic entry do not use Core.ChangeSet authority;
- old persisted works are not imported;
- remaining `Core.ChangeSet` source is retired unreachable legacy code pending mechanical deletion.

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW
Intent: PLANNED

Future reviewed-result/PR/Finalize planning must be rebased onto WorkId/GitWorkspace/ReplacementPackageState. Any older planned wording using ChangeSet execution states is superseded.
