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
→ F-RPKG-APPLY-REPLACEMENT-PACKAGE
     ├─ Apply
     ├─ Commit
     └─ Publish / Retry Publish
```

There is no target central ChangeSet Aggregate or package execution-state machine. Apply, Commit and Publish are current module/operation boundaries of one Apply Feature.

## EVO-RPKG-MODULARIZE-PACKAGE-REALIZATION

Evolution Kinds: Refactoring / Introduction / Forced Migration

Status: IMPLEMENTED for current target executable.

Result:
- Apply, Commit and Publish are explicit modules/operations of one `F-RPKG-APPLY-REPLACEMENT-PACKAGE` Feature, with independent operation Results and explicit stopping boundaries;
- `ReplacementPackageState` is shared durable package continuity;
- `PublicationObservation` is evidence, not operation result;
- current automatic `OBS-ACTION apply-package` composes Start → Apply → Commit → Publish without a generic Resume abstraction;
- exact archive bytes are captured once for Apply;
- package-journal schema 3 separates crash evidence from applicability authority: only `applicabilityProven=true` may recover already-intended bytes; digest integrity and captured-package binding are independent proofs;
- Start workspace pins `baseCommit` through a verified isolated Git transport endpoint rather than stale local branch state, mutable remote aliases or later URL rewrites;
- Apply itself fences package RepositoryIdentity to the persisted GitWorkspace Repository Target;
- Publish refreshes observation and pushes through shared isolated Git transport endpoints that exclude post-capture `insteadOf` / `pushInsteadOf` rewrites, and uses durable `NotConfirmed` as write-ahead uncertainty guard;
- Work mutation serialization is owned by a dedicated re-entrant `WorkOperationLock` application port with operation-local failure semantics;
- one shared Git transport capability owns GitHub RepositoryIdentity normalization and actual remote endpoint execution.

Proof gate:
- Apply stops before Commit;
- Commit stops before Publish;
- exact same archive/package is idempotent;
- archive path replacement after capture cannot change applied bytes/identity;
- state persistence failure after Apply/Commit can recover exact established effects;
- unexpected remote tip or foreign effective push destination blocks before push; post-verification `insteadOf` / `pushInsteadOf` mutation cannot redirect fetch, observation or push;
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

## EVO-RPKG-PARAMETERIZE-APPLY-HANDOFF

Evolution Kinds: Expansion / Refactoring

Status: PLANNED

Expected Entry State:
- one current `F-RPKG-APPLY-REPLACEMENT-PACKAGE` owns Apply/Commit/Publish module semantics;
- manual UI/CLI entries can stop at existing module boundaries;
- current `OBS-ACTION apply-package` always performs full Start → Apply → Commit → Publish composition;
- the current command has no `ApplyExtent` field.

Target State:
- the semantic package-application command carries a requested `ApplyExtent`;
- supported extent boundaries correspond to existing module boundaries: Apply; Apply+Commit; Apply+Commit+Publish;
- the Apply Feature reads the requested extent and stops exactly at that boundary;
- `ApplyExtent` is invocation selection, not durable lifecycle state and not a replacement for `ReplacementPackageState` / operation Results;
- invalid or unsupported extent input fails before repository execution;
- current manual module behavior remains semantically aligned with the same modules.

Affected owners on realization:
- `features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md`;
- `PACKAGE-PROTOCOL.md`;
- `APPLY-RESULT.md` as needed for truthful partial-extent result handoff;
- `screens.md`;
- target automated/manual acceptance.

## EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW

Evolution Kinds: Expansion / Introduction

Status: PLANNED

Expected Entry State:
- current package realization stops after exact work-branch publication proof;
- `F-RPKG-FINALIZE-REPOSITORY-WORK` remains future and independently callable by semantic input;
- no target Finalize behavior depends on legacy ChangeSet execution states.

Target State:
- reviewed-result authority is rebased onto WorkId/GitWorkspace/ReplacementPackageState and exact published tree identity;
- independent `F-RPKG-FINALIZE-REPOSITORY-WORK` becomes executable only after its own eligibility is proven;
- the package-application semantic command may carry a `FinalizeMode` selection;
- when `FinalizeMode` requests automatic Finalize, `F-RPKG-APPLY-REPLACEMENT-PACKAGE` may intentionally invoke the independent Finalize Feature after all required Finalize prerequisites are proven;
- this is intentional one-way cross-Feature composition owned by the Apply Feature's semantic entry: Finalize keeps its own behavior, eligibility, Result and recovery, and has no dependency on Apply or on how it was invoked;
- incompatible `ApplyExtent` / `FinalizeMode` combinations fail before repository execution rather than silently extending the requested extent;
- manual/direct Finalize entry remains possible independently of Apply.

OPEN target details remain owned by Finalize/review planning: review-authority mechanism, integration mechanism/order, Issue closure and exact final-comment generation.

## EVO-RPKG-ADD-APPLY-URI-ENTRY

Evolution Kinds: Expansion

Status: PLANNED

Prerequisite entry state:
- one stable semantic package-application command exists and is already consumed by `F-RPKG-APPLY-REPLACEMENT-PACKAGE`;
- handoff representation preserves all current semantic selections, including requested Apply extent and Finalize selection when those evolutions are implemented.

Target State:
- URI is an additional accepted entry representation of the same semantic package-application command;
- handoff and URI resolve to the same semantic request, including exact Work/package/repository inputs and the same modularity/finalization selections;
- URI adds no Feature, module, lifecycle state or alternate realization workflow;
- malformed, incomplete or unsupported-version URI input fails before repository execution;
- transport-specific URI encoding remains separate from Feature behavior after command resolution.

## Future reviewed-result / PR / Finalize evolution

The planned reviewed-result Scenario remains future. Before implementation, use `EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW` as the evolution owner and revalidate all affected current owners. Do not reintroduce ChangeSet execution states, package `Resume`, or a central lifecycle bucket merely to host reviewed-result/PR/approval facts.
