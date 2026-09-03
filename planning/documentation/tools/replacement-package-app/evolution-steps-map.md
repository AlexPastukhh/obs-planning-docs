# Replacement Package Workflow — Evolution Steps Map

Status: active evolution planning owner
Scope: timing/dependency/readiness relations between canonical Builder + App Scenario-owned Evolution Steps.

Behavioral delta remains canonical in Scenario owners. This map owns WHEN/dependency/readiness only.

## Canonical Steps Referenced

App migration from current Complete Repository Work:
- [`EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#evo-rpkg-downgrade-current-change-to-diagnostic)
- [`EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#evo-rpkg-adopt-reviewed-result-workflow)

Builder planned evolution:
- [`EVO-BLDR-ALLOW-WORK-INTENT-REFINEMENT`](scenarios/SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md#evo-bldr-allow-work-intent-refinement)
- [`EVO-BLDR-PERSIST-SEMANTIC-REVIEW-HISTORY`](scenarios/SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md#evo-bldr-persist-semantic-review-history)

## Selected Evolution Map

```text
CURRENT APP
Work Intent → workspace → Apply → Commit → Publish
+ legacy Current Change / Finalize
        │
        ├──────────────────────────────┐
        ↓                              ↓
EVO-RPKG-DOWNGRADE-           EVO-RPKG-ADOPT-
CURRENT-CHANGE-TO-            REVIEWED-RESULT-
DIAGNOSTIC                    WORKFLOW
        │                              │
        └──────────────┬───────────────┘
                       ↓
planned SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK
eligible for promotion after implementation + proof reconciliation

PLANNED BUILDER BASELINE
SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE
        │
        ├────────→ EVO-BLDR-ALLOW-WORK-INTENT-REFINEMENT
        └────────→ EVO-BLDR-PERSIST-SEMANTIC-REVIEW-HISTORY
```

The planned App Scenario is the selected target behavior owner for:
- consuming Builder-established Issue/work branch instead of creating competing target work;
- handoff-selected automatic stop at Apply Only / ReviewedPublished / Finalized;
- semantic Commit/Finalize inputs supplied by handoff or manual App UI;
- PR as durable integration record;
- immutable `## Final Work Record` before Issue closure.

Those details are not redefined here.

## EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC

Evolution Step:
[`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#evo-rpkg-downgrade-current-change-to-diagnostic)

Rough horizon:
Selected planned migration; required for target promotion.

Depends on:
- exact Git-backed base/published boundaries;
- Git-derived diagnostic projection implementation/proof.

Enables:
- optional latest/cumulative inspection;
- removal of legacy ReviewDiff from ordinary target approval authority.

Gate:
Do not retire legacy behavior while persisted legacy work still relies on it.

## EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW

Evolution Step:
[`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#evo-rpkg-adopt-reviewed-result-workflow)

Rough horizon:
Selected planned target.

Depends on:
- Builder Start Work + exact reviewed package/source/result identity;
- consumer handoff/protocol evolution capable of expressing one concrete route plus required semantic stage inputs;
- migration from App-created target Issue/work branch to verification/consumption of Builder-established repository work;
- ChangeSet/recovery state sufficient for Apply/Commit/Push/Confirm/PR/Finalize resume;
- planned Screen input surfaces for manual Commit/Finalize;
- PR/final logging and Issue-close recovery proof.

Enables:
- exact published-tree == reviewed-result confirmation;
- no second semantic review when identity is proven;
- user-selected automatic stopping at Apply Only, ReviewedPublished or Finalized;
- modular button continuation using the same stage semantics;
- finalization-time PR and durable Final Work Record;
- promotion of [`SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK`](scenarios/planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md).

Gate:
Current `PACKAGE-PROTOCOL.md` / runtime do not yet express the selected reviewed-result route + semantic-input contract. Current App Work Intent/workspace creation remains current truth until ownership migration is implemented/proved. Do not claim target current earlier.

## EVO-BLDR-ALLOW-WORK-INTENT-REFINEMENT

Evolution Step:
[`SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE`](scenarios/SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md#evo-bldr-allow-work-intent-refinement)

Rough horizon:
PLANNED. May ship with or after baseline Builder Scenario.

Depends on:
- durable exact Issue established by Start Work;
- selected/proved controlled Issue-update path that protects managed exact work context.

Enables:
- refinement of Goal / Why / Acceptance / scope / Handoff Intent for the same open work;
- continuation across ChatGPT sessions without creating a new Issue merely for clarification.

Gate:
Do not claim implemented if workflow relies on unrestricted whole-Issue-body replacement or cannot protect repository/target/source/work-branch identity.

## EVO-BLDR-PERSIST-SEMANTIC-REVIEW-HISTORY

Evolution Step:
[`SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE`](scenarios/SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md#evo-bldr-persist-semantic-review-history)

Rough horizon:
PLANNED. May ship with or after baseline Builder review flow.

Depends on:
- exact Builder Review Result identity;
- durable repository-work Issue;
- selected/proved append/reconciliation path for exact Issue comments.

Enables:
- immutable `## Review Record` comments;
- later Review Records that state disposition of earlier findings plus new findings;
- correction of an earlier review statement through a new record rather than rewriting history;
- cross-session review continuity.

Gate:
Earlier Review Records must remain unchanged; retry must reconcile uncertain comment creation rather than create ambiguous duplicates; technical review identities bind from Builder state, not chat memory.

## Cross-Module Logging Readiness

Review logging and final logging have different owners:

```text
Builder review workflow
→ immutable ## Review Record comments

Replacement Package App Finalize
→ immutable ## Final Work Record
→ Issue close
```

PR remains the durable integration view and links back to the Issue; detailed iterative review history remains in Issue comments.

No separate `action-log.md` is required by this target model.

## Retirement Relation

Legacy Current Change / legacy Finalize remain current compatibility behavior until persisted legacy work and implementation migration no longer require them.

Completed evolution nodes may later retire from the active map once current owners communicate the resulting truth.
