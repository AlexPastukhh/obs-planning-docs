# Replacement Package Application — Evolution Steps Map

Status: proposed active evolution registry / coordination owner.

This is the main entry into planned future state. It projects planning position, target resolution, change surface, semantic prerequisites, realization prerequisites and **both Step-owned planning-completeness and realization-start-readiness conclusions**. Detailed readiness reasons and Step Q/R/P live in each Step authority.

## Reading the columns

- **Planning Position** — selected/planned, probable, candidate, conditional, deferred, etc.; projection only, not a second Proposal/Decision lifecycle.
- **Change Surface / Role** — descriptive projection such as Behavioral / Implementation / Mixed and Foundation/evolution-enabling when useful; not a closed enum.
- **Target Resolution** — how concretely post-Step Target State is known (`Intent Only`, `Impact Identified`, `Partial Target`, `Substantial Target`, `Complete Target` are useful language, not a mandatory enum).
- **Enters from** — semantic predecessor state(s) whose realized/materialized meaning forms Entry State.
- **Realization prerequisite** — implementation foundation that must be realized before this Step is implemented, without becoming product semantics.
- **Planning Completeness** — `COMPLETE` or `INCOMPLETE`; open Step `RU-EVO-06` for the resolved/missing Unit and Target Body explanation.
- **Realization Start Readiness** — `READY` or `BLOCKED`; open the Step for predecessors, proof and Q/R/P reasons.

```text
Planning Position ≠ Target Resolution ≠ Planning Completeness ≠ Start Readiness ≠ Realization
semantic prerequisite ≠ realization prerequisite
probable ≠ selected
Start READY ≠ realized
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

## RU-EVOMAP-01 — Step Registry

### Active future registry

| Step | Planning Position | Change Surface / Role | Target Resolution | Enters from | Realization prerequisite | Adds in plain language | Principal Target Owners | Planning Completeness | Realization Start Readiness |
|---|---|---|---|---|---|---|---|---|---|
| [Standardize Typed Operation Results](../evolution-steps/EVO-RPKG-STANDARDIZE-OPERATION-RESULTS.md) | **Selected / Planned** | **Implementation · Foundation / evolution-enabling** | **Complete Target** | Current | — | one reusable typed operation-result mechanism while semantic errors stay owner-local | Shared Implementation Capability | **COMPLETE** | **READY** |
| [Establish Replacement Package Construction](../evolution-steps/EVO-RPKG-ESTABLISH-REPLACEMENT-PACKAGE-CONSTRUCTION.md) | **Selected / Planned** | **Mixed** | **Complete Target** | Current | Typed Operation Results | plan exact Builder package-construction semantics, then reconcile existing PB-01/PB-02 implementation against them | NEW Builder Feature + realization | **INCOMPLETE** | **BLOCKED** |
| [Parameterize Apply Handoff](../evolution-steps/EVO-RPKG-PARAMETERIZE-APPLY-HANDOFF.md) | **Selected / Planned** | **Mixed** | **Substantial Target** | Current | Typed Operation Results | ApplyExtent + bounded wait for exact package | Apply Feature, current realization Scenario, Apply Slice | **INCOMPLETE** | **BLOCKED** |
| [Introduce Work Finalization](../evolution-steps/EVO-RPKG-INTRODUCE-WORK-FINALIZATION.md) | **Selected / Planned** | **Mixed** | **Partial Target** | Current | Typed Operation Results | independently callable Finalize of exact reviewed result; no app-owned Issue communication | Finalize Feature, realization Scenario, Domain/Slice | **INCOMPLETE** | **BLOCKED** |
| [Move Work Orchestration To AI](../evolution-steps/EVO-RPKG-MOVE-WORK-ORCHESTRATION-TO-AI.md) | **Selected / Planned** | **Behavioral / boundary realization** | **Partial Target** | Establish Replacement Package Construction | — | realize the selected Application boundary where AI owns Issue/comments, semantic working branch, review decisions and handoff | Scenarios, WorkIntent/Workspace slices | **INCOMPLETE** | **BLOCKED** |
| [Add Local Package Verification](../evolution-steps/EVO-RPKG-ADD-LOCAL-PACKAGE-VERIFICATION.md) | **Selected / Planned** | **Mixed** | **Partial Target** | Establish Replacement Package Construction | Typed Operation Results | extend accepted Builder construction with exact local verification Apply + resulting diff/proof | Builder Feature, review Scenario, Shared Apply capability | **INCOMPLETE** | **BLOCKED** |
| [Introduce Repository Snapshot Workflow](../evolution-steps/EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW.md) | **Selected / Planned** | **Mixed** | **Partial Target** | Current | Typed Operation Results | browse active branches (`ahead(main)>0`), freeze exact commit, reserve/copy future archive path, asynchronously create exact Snapshot | NEW Snapshot Feature, context Scenario, Screen/adapter | **INCOMPLETE** | **BLOCKED** |
| [Open Repository Folder In VS Code](../evolution-steps/EVO-RPKG-OPEN-REPOSITORY-FOLDER-IN-VSCODE.md) | **Selected / Planned** | **Mixed** | **Partial Target** | Current | Typed Operation Results | open exact selected repository folder in VS Code via reusable opening capability | NEW Open Folder Feature, Screen/context action, VS Code integration | **INCOMPLETE** | **BLOCKED** |
| [Add Operation Notifications](../evolution-steps/EVO-RPKG-ADD-OPERATION-NOTIFICATIONS.md) | **Selected / Planned** | **Mixed** | **Impact Identified** | Current | Typed Operation Results | attention signal for terminal long/background operation outcomes without replacing result truth | affected Scenarios/Screen/Shared adapter | **INCOMPLETE** | **BLOCKED** |
| [Enable Automatic Finalization](../evolution-steps/EVO-RPKG-ENABLE-AUTOMATIC-FINALIZATION.md) | **Selected / Planned** | **Mixed** | **Partial Target** | Parameterize Apply Handoff + Introduce Work Finalization | Typed Operation Results | Scenario can choose immediate Apply→Finalize or deferred Finalize | Apply Feature, realization Scenario, Slice | **INCOMPLETE** | **BLOCKED** |
| [Open Branch Snapshot In VS Code](../evolution-steps/EVO-RPKG-OPEN-BRANCH-SNAPSHOT-IN-VSCODE.md) | **Selected / Planned** | **Mixed** | **Impact Identified** | Repository Snapshot Workflow + Open Repository Folder In VS Code | Typed Operation Results | create exact selected-branch Snapshot and open its materialized folder in VS Code, reusing both capabilities | Snapshot/Open Folder Features + materialization/adapter owner OPEN | **INCOMPLETE** | **BLOCKED** |
| [Add Apply URI Entry](../evolution-steps/EVO-RPKG-ADD-APPLY-URI-ENTRY.md) | **Probable** | **Mixed** | **Substantial Target** | Enable Automatic Finalization | Typed Operation Results | likely future URI entry equivalent to a complete semantic Apply request | Apply Feature, realization Scenario, adapter | **INCOMPLETE** | **BLOCKED** |

Possible later Snapshot attachment automation has no concrete Step owner or target state. It remains an unestablished idea outside this Step registry; no Step-owned readiness conclusion is inferred.

## RU-EVOMAP-02 — Step relations / planning and start-readiness projection

The two status columns above project each linked Step's `RU-EVO-06`; reasons and Q/R/P stay with that Step. Current realized prerequisites are not inferred merely from selection.

## Prototype checkpoint

[`PROTO-RPKG-SELECTED-PLANNED-HORIZON-01`](../evolution-steps/PROTO-RPKG-SELECTED-PLANNED-HORIZON-01.md) is a `TM-PROTOTYPE` Target instance for the **combined projected state of all rows currently marked Selected / Planned**. It is not an Evolution Step and does not alter dependencies/readiness.

Probable rows are excluded from that Prototype horizon unless explicitly added to a particular Prototype revision.

## RU-EVOMAP-03 — Application Driver Coverage

Upstream basis: [selected APP-RPKG](../application-definition.md). This is a routing/coverage projection, not a second Application or Scenario owner.

| Material Application / Scenario driver | Current realized coverage | Concrete future coverage / gap |
|---|---|---|
| [`KBF-RPKG-EXACT-REALIZATION-01`](../application-definition.md#kbf-rpkg-exact-realization-01) | [Current realization Scenario](../scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md), [Apply Feature](../features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md) for current exact package stages. | Builder construction, Apply parameterization, Finalization and AI orchestration split Steps; target coverage remains planning-incomplete in their `RU-EVO-06`. |
| [`KBF-RPKG-TRUTHFUL-OUTCOME-02`](../application-definition.md#kbf-rpkg-truthful-outcome-02), current `SR-RPKG-KEEP-TERMINAL-OUTCOME-UNDERSTANDABLE-03` | Current Scenario/Apply Feature provide truthful result meaning, with spatial participation in [Main Work Window](../screens.md). | Typed Operation Results foundation and Notifications; other affected Step target outcomes remain to be completed. |
| [`KBF-RPKG-INSPECTABLE-REVIEW-03`](../application-definition.md#kbf-rpkg-inspectable-review-03) | Legacy [Current Change Scenario](../scenarios/SCN-RPKG-PROVIDE-CURRENT-CHANGE.md) covers exact cumulative legacy ReviewDiff only; it does not establish target Git-backed review semantics. | Local Package Verification, Snapshot and VS Code context Steps. Full target review/diagnostic coverage remains OPEN in those Step bodies. |
| Actor-owned durable Issue/comment history | Outside Application semantic ownership; current implementation may still have App-owned Work operations. | [Move Work Orchestration To AI](../evolution-steps/EVO-RPKG-MOVE-WORK-ORCHESTRATION-TO-AI.md) accounts for the selected boundary transition; no fictitious Application `KBF-*` driver is created. |

Selected intent can precede realization. A row naming a Step accounts for a concrete planned transition, not complete Scenario `SPS-*/SR-*` coverage or realization readiness. Revalidate these projections when a Step/Scenario/Feature changes.

## Boundary

Map row ≠ selection. `Probable` ≠ selected. Selected ≠ target complete. Target resolution ≠ Planning Completeness. Planning Completeness ≠ Start Readiness. `READY` ≠ realized. Realization prerequisite ≠ semantic Entry State. Detailed blockers/Q/R/P belong to the Step, not the Map.
