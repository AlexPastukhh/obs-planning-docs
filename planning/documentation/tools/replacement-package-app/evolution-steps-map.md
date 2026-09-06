# Replacement Package App — Evolution Steps Map

Status: active evolution planning owner

## Current target state

```text
WorkId
├─ WorkIntent / managed Issue
├─ GitWorkspace
└─ ReplacementPackageState*

OBS apply-package
→ ensure Work Intent
→ ensure GitWorkspace
→ Apply Package
→ Commit applied
→ Publish / Retry Publish
```

There is no target central ChangeSet Aggregate or package execution-state machine.

## EVO-RPKG-MODULARIZE-PACKAGE-REALIZATION

Evolution Kinds: Refactoring / Introduction / Forced Migration

Status: IMPLEMENTED for current target executable.

Result:
- Apply, Commit and Publish are independent Feature operations with independent Results;
- `ReplacementPackageState` is shared durable package continuity;
- `PublicationObservation` is evidence, not operation result;
- automatic `OBS-ACTION apply-package` composes Start → Apply → Commit → Publish without a generic Resume abstraction;
- exact archive bytes are captured once for Apply;
- package-journal schema 3 separates crash evidence from applicability authority: only `applicabilityProven=true` may recover already-intended bytes; digest integrity and captured-package binding are independent proofs;
- Start workspace pins `baseCommit` through a captured exact verified fetch URL rather than stale local branch state or a mutable remote alias;
- Apply itself fences package RepositoryIdentity to the persisted GitWorkspace Repository Target;
- Publish refreshes observation through a captured exact fetch URL, pushes only through a captured exact verified push URL, and uses durable `NotConfirmed` as write-ahead uncertainty guard;
- Work mutation serialization is owned by a dedicated re-entrant `WorkOperationLock` application port with operation-local failure semantics.

Proof gate:
- Apply stops before Commit;
- Commit stops before Publish;
- exact same archive/package is idempotent;
- archive path replacement after capture cannot change applied bytes/identity;
- state persistence failure after Apply/Commit can recover exact established effects;
- unexpected remote tip or foreign effective push destination blocks before push;
- no blind repush after unconfirmed publication;
- sequential packages work without `publishedTip`/executionState owner;
- target schema-1 protocol/applicability validation is owned by dedicated target suites rather than retired `CoreTests`;
- failed applicability cannot become Applied on exact retry merely because current bytes equal intended bytes, and an unproven journal cannot restore changed Worktree bytes;
- previous package-journal schemas fail closed in the new executable; unfinished work remains with the executable that created that journal.

## EVO-RPKG-RETIRE-CHANGESET-AGGREGATE

Evolution Kinds: Refactoring / Introduction / Retirement / Forced Migration

Status: IMPLEMENTED for target executable paths; mechanical legacy-source deletion may continue independently.

Resulting state:
- WorkId is stable correlation identity;
- Work Intent owns semantic intent/Issue;
- GitWorkspace owns Repository Target/targetBranch/worktree/baseCommit;
- ReplacementPackageState owns exact package/commit/publication facts;
- Start workspace and package realization never create/read/update `Core.ChangeSet` as authority;
- old persisted works are not imported by the new executable;
- schema-1 `changeSetId` / `ChangeSet-Id` remain transport aliases until separate protocol evolution.

No dual-read/dual-write compatibility migration is required because the previous deployed executable remains owner of old works.

## EVO-RPKG-RETIRE-LEGACY-INTERACTION-SURFACE

Evolution Kinds: Retirement / Forced Migration

Status: IMPLEMENTED for target Main Work Window.

Removed from target executable UI:
- ChangeSet navigation/history;
- Current Change / ReviewDiff controls;
- Review chat / delivery controls;
- generic External Interaction controls;
- legacy Finalize / Reopen / Retry Push controls.

Target Main Work Window contains Repository Target, WorkId, target branch, archive/package identity, OBS action and Start/Apply/Commit/Publish/Retry Publish.

The old built executable remains the owner of retired legacy UI behavior.

## Future reviewed-result / PR / Finalize evolution

The planned reviewed-result Scenario remains future. Before implementation, rebase it onto the current Work-centered owners. Do not reintroduce ChangeSet execution states, package `Resume`, or a central lifecycle bucket merely to host reviewed-result/PR/approval facts.
