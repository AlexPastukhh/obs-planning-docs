# Replacement Package Application — Evolution Steps Map

Status: proposed active evolution registry / coordination owner.

This is the main entry into planned future state. It projects planning position, target resolution, change surface, semantic prerequisites, realization prerequisites and **only the normalized readiness enum**. Detailed readiness reasons and Step Q/R/P live in each Step authority.

## Reading the columns

- **Planning Position** — selected/planned, probable, candidate, conditional, deferred, etc.; projection only, not a second Proposal/Decision lifecycle.
- **Change Surface / Role** — descriptive projection such as Behavioral / Implementation / Mixed and Foundation/evolution-enabling when useful; not a closed enum.
- **Target Resolution** — how concretely post-Step Target State is known (`Intent Only`, `Impact Identified`, `Partial Target`, `Substantial Target`, `Complete Target` are useful language, not a mandatory enum).
- **Enters from** — semantic predecessor state(s) whose realized/materialized meaning forms Entry State.
- **Realization prerequisite** — implementation foundation that must be realized before this Step is implemented, without becoming product semantics.
- **Readiness** — canonical Step readiness projection: `READY` or `NOT_READY`. Open the Step for reasons and Q/R/P.

```text
Planning Position ≠ Target Resolution ≠ Readiness ≠ Realization
semantic prerequisite ≠ realization prerequisite
probable ≠ selected
READY ≠ realized
```

## Visual selected/planned evolution view

This is a **derived navigation view** of the semantic `Enters from` relations, not a second dependency authority.

```text
Current
├─ Standardize Typed Operation Results
├─ Establish Replacement Package Construction
│  ├─ Move Work Orchestration To AI
│  └─ Add Local Package Verification
├─ Parameterize Apply Handoff ───────────────┐
├─ Introduce Work Finalization ──────────────┤
│                                            └─ Enable Automatic Finalization
├─ Introduce Repository Snapshot Workflow ───┐
│                                            └─ Open Branch Snapshot In VS Code
├─ Open Repository Folder In VS Code ────────┘
└─ Add Operation Notifications
```

`Standardize Typed Operation Results` is additionally a **realization foundation** for applicable operation-producing Steps. That implementation ordering is intentionally not drawn as semantic parentage.

```text
Standardize Typed Operation Results
  -- realization prerequisite -->
  Package Construction / Apply parameterization / Finalization /
  Local Verification / Snapshot / VS Code open / Notifications /
  Automatic Finalization / Snapshot→VS Code / probable Apply URI
```

Probable rows are shown in the registry but are not added to the Selected/Planned semantic DAG.

## Active future registry

| Step | Planning Position | Change Surface / Role | Target Resolution | Enters from | Realization prerequisite | Adds in plain language | Principal Target Owners | Readiness |
|---|---|---|---|---|---|---|---|---|
| [Standardize Typed Operation Results](../evolution-steps/EVO-RPKG-STANDARDIZE-OPERATION-RESULTS.md) | **Selected / Planned** | **Implementation · Foundation / evolution-enabling** | **Complete Target** | Current | — | one reusable typed operation-result mechanism while semantic errors stay owner-local | Shared Implementation Capability | **READY** |
| [Establish Replacement Package Construction](../evolution-steps/EVO-RPKG-ESTABLISH-REPLACEMENT-PACKAGE-CONSTRUCTION.md) | **Selected / Planned** | **Mixed** | **Complete Target** | Current | Typed Operation Results | plan exact Builder package-construction semantics, then reconcile existing PB-01/PB-02 implementation against them | NEW Builder Feature + realization | **NOT_READY** |
| [Parameterize Apply Handoff](../evolution-steps/EVO-RPKG-PARAMETERIZE-APPLY-HANDOFF.md) | **Selected / Planned** | **Mixed** | **Substantial Target** | Current | Typed Operation Results | ApplyExtent + bounded wait for exact package | Apply Feature, current realization Scenario, Apply Slice | **NOT_READY** |
| [Introduce Work Finalization](../evolution-steps/EVO-RPKG-INTRODUCE-WORK-FINALIZATION.md) | **Selected / Planned** | **Mixed** | **Partial Target** | Current | Typed Operation Results | independently callable Finalize of exact reviewed result; no app-owned Issue communication | Finalize Feature, realization Scenario, Domain/Slice | **NOT_READY** |
| [Move Work Orchestration To AI](../evolution-steps/EVO-RPKG-MOVE-WORK-ORCHESTRATION-TO-AI.md) | **Selected / Planned** | **Behavioral / boundary realization** | **Partial Target** | Establish Replacement Package Construction | — | realize the selected Application boundary where AI owns Issue/comments, semantic working branch, review decisions and handoff | Scenarios, WorkIntent/Workspace slices | **NOT_READY** |
| [Add Local Package Verification](../evolution-steps/EVO-RPKG-ADD-LOCAL-PACKAGE-VERIFICATION.md) | **Selected / Planned** | **Mixed** | **Partial Target** | Establish Replacement Package Construction | Typed Operation Results | extend accepted Builder construction with exact local verification Apply + resulting diff/proof | Builder Feature, review Scenario, Shared Apply capability | **NOT_READY** |
| [Introduce Repository Snapshot Workflow](../evolution-steps/EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW.md) | **Selected / Planned** | **Mixed** | **Partial Target** | Current | Typed Operation Results | browse active branches (`ahead(main)>0`), freeze exact commit, reserve/copy future archive path, asynchronously create exact Snapshot | NEW Snapshot Feature, context Scenario, Screen/adapter | **NOT_READY** |
| [Open Repository Folder In VS Code](../evolution-steps/EVO-RPKG-OPEN-REPOSITORY-FOLDER-IN-VSCODE.md) | **Selected / Planned** | **Mixed** | **Partial Target** | Current | Typed Operation Results | open exact selected repository folder in VS Code via reusable opening capability | NEW Open Folder Feature, Screen/context action, VS Code integration | **NOT_READY** |
| [Add Operation Notifications](../evolution-steps/EVO-RPKG-ADD-OPERATION-NOTIFICATIONS.md) | **Selected / Planned** | **Mixed** | **Impact Identified** | Current | Typed Operation Results | attention signal for terminal long/background operation outcomes without replacing result truth | affected Scenarios/Screen/Shared adapter | **NOT_READY** |
| [Enable Automatic Finalization](../evolution-steps/EVO-RPKG-ENABLE-AUTOMATIC-FINALIZATION.md) | **Selected / Planned** | **Mixed** | **Partial Target** | Parameterize Apply Handoff + Introduce Work Finalization | Typed Operation Results | Scenario can choose immediate Apply→Finalize or deferred Finalize | Apply Feature, realization Scenario, Slice | **NOT_READY** |
| [Open Branch Snapshot In VS Code](../evolution-steps/EVO-RPKG-OPEN-BRANCH-SNAPSHOT-IN-VSCODE.md) | **Selected / Planned** | **Mixed** | **Impact Identified** | Repository Snapshot Workflow + Open Repository Folder In VS Code | Typed Operation Results | create exact selected-branch Snapshot and open its materialized folder in VS Code, reusing both capabilities | Snapshot/Open Folder Features + materialization/adapter owner OPEN | **NOT_READY** |
| [Add Apply URI Entry](../evolution-steps/EVO-RPKG-ADD-APPLY-URI-ENTRY.md) | **Probable** | **Mixed** | **Substantial Target** | Enable Automatic Finalization | Typed Operation Results | likely future URI entry equivalent to a complete semantic Apply request | Apply Feature, realization Scenario, adapter | **NOT_READY** |
| `EVO-RPKG-AUTOMATE-SNAPSHOT-ATTACHMENT` | **Probable** | **Integration** | **Intent Only** | Repository Snapshot Workflow | — | browser/Tampermonkey-style adapter consumes reserved Snapshot path and automates attachment when appropriate | Scenario/adapter; owner OPEN | **NOT_READY** |

## Prototype checkpoint

[`PROTO-RPKG-SELECTED-PLANNED-HORIZON-01`](../evolution-steps/PROTO-RPKG-SELECTED-PLANNED-HORIZON-01.md) is a `TM-PROTOTYPE` Target instance for the **combined projected state of all rows currently marked Selected / Planned**. It is not an Evolution Step and does not alter dependencies/readiness.

Probable rows are excluded from that Prototype horizon unless explicitly added to a particular Prototype revision.

## Boundary

Map row ≠ selection. `Probable` ≠ selected. Selected ≠ target complete. Target complete ≠ ready. `READY` ≠ realized. Realization prerequisite ≠ semantic Entry State. Detailed blockers/Q/R/P belong to the Step, not the Map.
