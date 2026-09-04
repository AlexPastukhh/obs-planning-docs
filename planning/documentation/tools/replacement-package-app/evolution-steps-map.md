# Replacement Package App — Evolution Steps Map

Status: active evolution planning owner
Scope: rough sequence, dependency, readiness and retirement relation between canonical Scenario-owned Evolution Steps. Behavioral delta remains canonical in Scenario owners; Domain/Slice/Screen impact remains canonical in lower owners.

## Canonical steps referenced

From current Complete Prepared Repository Work:
- [`EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#evo-rpkg-downgrade-current-change-to-diagnostic)
- [`EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#evo-rpkg-adopt-reviewed-result-workflow)

The legacy Current Change Scenario references the same downgrade step identity rather than defining a competing semantic change.

## Selected evolution map

```text
Current mixed migration state
  target-mode:
    Work Intent → workspace → Apply → Commit → Publish → Ready
  legacy:
    Apply → Current Change/ReviewDiff → Finalize/Publication Pending/Reopen
        │
        ├──────────────┐
        ↓              ↓
EVO-RPKG-DOWNGRADE-  EVO-RPKG-ADOPT-
CURRENT-CHANGE-TO-   REVIEWED-RESULT-
DIAGNOSTIC           WORKFLOW
        │              │
        └──────┬───────┘
               ↓
planned SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK
becomes eligible for promotion only after implementation + proof reconciliation
               ↓
legacy Current Change / legacy Finalize can retire only when no remaining
legacy ChangeSet requires their current authority
```

The two selected steps may be developed partly in parallel, but promotion of the planned complete target Scenario requires both semantic results: ordinary target work must not depend on legacy approval-oriented Current Change, and the selected Apply Only / Apply And Publish / Apply And Finalize route contract must be implemented and proved.

## EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC

Evolution Step:
[`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#evo-rpkg-downgrade-current-change-to-diagnostic)

Rough horizon / likelihood:
Selected planned migration; required for target Scenario promotion.

Depends on:
- exact Git-backed ChangeSet base/published boundaries already exist;
- target diagnostic projection design/proof is implemented.

Enables:
- Git-derived latest/cumulative Current Change for inspection/support;
- removal of manual Current Change handoff from ordinary target approval authority;
- eventual retirement of the standalone legacy Current Change Scenario after legacy work is gone.

Can run in parallel with:
- reviewed-result identity/confirmation implementation, provided current vs planned authority stays explicit.

Readiness / gate:
Do not retire legacy ReviewDiff/Finalize semantics while persisted legacy ChangeSets still rely on them.

## EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW

Evolution Step:
[`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#evo-rpkg-adopt-reviewed-result-workflow)

Rough horizon / likelihood:
Selected planned target.

Depends on:
- Builder planned replay/review Scenario defines exact approved package/source/result identity;
- consumer package/protocol evolution supplies enough review identity for verification;
- downstream Requirements Discovery selects durable ownership for reviewed-result binding/currentness rather than assuming ChangeSet ownership;
- PR/integration/final-record proof boundaries and their natural owners are selected and implemented downstream.

Enables:
- consumer proof `actual published Git tree == reviewed predicted tree`;
- no second semantic review when that identity is proven;
- one correct/current integration PR;
- approval-preserving Finalize/reconciliation semantics;
- promotion of [`SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK`](scenarios/planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md).

Can run in parallel with:
- Git-derived Current Change diagnostic work, but final target promotion requires both.

Readiness / gate:
The current `PACKAGE-PROTOCOL.md` does not yet carry the planned reviewed-result identity; protocol/runtime changes are intentionally outside this documentation-only package and must be designed/implemented separately before target behavior is claimed current.

## Retirement relation

Legacy Current Change / legacy Finalize are current compatibility behavior, not future target architecture. Their retirement is **not** itself a reason to delete documentation early. Current owners remain until persisted/operated legacy work no longer needs them and implementation migration proves the target path.

Completed evolution nodes need not stay active forever once current owners communicate the resulting truth.
