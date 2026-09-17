# PROTO-RPKG-SELECTED-PLANNED-HORIZON-01 — Selected / Planned Horizon Prototype

Target Module: **TM-PROTOTYPE**  
Target Instance: `PROTO-RPKG-SELECTED-PLANNED-HORIZON-01`  
Status: **Prototype inquiry planned; physical prototype subject not yet created**

[← Evolution Steps Map](../navigation/EVOLUTION-STEPS-MAP.md)

## RU-PROTO-01 — Prototype Intent / Question

Review the **integrated projected application state after all currently Selected / Planned Evolution Steps**, before full production realization, so UI/navigation/composition and obvious cross-Step contradictions can be experienced rather than reasoned about only in separate Step files.

Primary questions:
- does the combined user/AI flow remain understandable after the planned changes are composed?
- are current/future navigation, Snapshot, Builder verification, Finalize and VS Code entry/actions coherent when seen together?
- do any Step-local choices conflict when projected into one application?
- which uncertainties require real functional prototype behavior rather than static review?

This Prototype exists because the cumulative selected horizon is material. It does **not** mean every Evolution Step requires its own Prototype.

## Projected Evolution Context

Included because they are currently **Selected / Planned**:

1. [`Standardize Typed Operation Results`](EVO-RPKG-STANDARDIZE-OPERATION-RESULTS.md)
2. [`Establish Replacement Package Construction`](EVO-RPKG-ESTABLISH-REPLACEMENT-PACKAGE-CONSTRUCTION.md)
3. [`Parameterize Apply Handoff`](EVO-RPKG-PARAMETERIZE-APPLY-HANDOFF.md)
4. [`Introduce Work Finalization`](EVO-RPKG-INTRODUCE-WORK-FINALIZATION.md)
5. [`Move Work Orchestration To AI`](EVO-RPKG-MOVE-WORK-ORCHESTRATION-TO-AI.md)
6. [`Add Local Package Verification`](EVO-RPKG-ADD-LOCAL-PACKAGE-VERIFICATION.md)
7. [`Introduce Repository Snapshot Workflow`](EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW.md)
8. [`Open Repository Folder In VS Code`](EVO-RPKG-OPEN-REPOSITORY-FOLDER-IN-VSCODE.md)
9. [`Add Operation Notifications`](EVO-RPKG-ADD-OPERATION-NOTIFICATIONS.md)
10. [`Enable Automatic Finalization`](EVO-RPKG-ENABLE-AUTOMATIC-FINALIZATION.md)
11. [`Open Branch Snapshot In VS Code`](EVO-RPKG-OPEN-BRANCH-SNAPSHOT-IN-VSCODE.md)

Excluded by default because they are **Probable**, not selected:
- [`Add Apply URI Entry`](EVO-RPKG-ADD-APPLY-URI-ENTRY.md)
- `EVO-RPKG-AUTOMATE-SNAPSHOT-ATTACHMENT`

If Planning Position changes, this Target instance must revalidate its inclusion set.

## RU-PROTO-02 — Prototype Subject / Observation Plan

Actual baseline: current accepted downstream owner state, interpreted under the current selected Application Definition intent.

The prototype may project unrealized predecessor/Step states through explicit simulation/stubs. A simulated state does not satisfy Evolution readiness.

Initial fidelity direction (to be refined before implementation):

| Dimension | Intended starting fidelity |
|---|---|
| Visual / spatial | real-enough UI to review composition/navigation |
| Interaction / navigation | functional where cheap; otherwise explicit simulated transitions |
| Core operation behavior | mix of functional local subset and stubs depending on risk/cost |
| Repository/Snapshot data | fixtures or disposable local repositories initially acceptable |
| External GitHub mutation | disabled/stubbed by default |
| VS Code opening | may be real local side effect if explicitly allowlisted |
| Notifications | may be simulated first, real local notification if useful |
| Errors / recovery | representative selected cases, not exhaustive proof |

Side-effect default:

```text
remote mutation: NONE unless explicitly allowlisted
local destructive mutation: disposable subject only
filesystem output: disposable/prototype-owned area
```

Proposed physical artifact location when created:
`../prototypes/PROTO-RPKG-SELECTED-PLANNED-HORIZON-01/`

## RU-PROTO-03 — Prototype Results / Interpretation

Not executed yet. Do not invent Evidence.

After execution, retain actual observations/limitations here and route material learning through Findings/Decision revalidation to the affected owner/Evolution Step.

## Guards

```text
prototype horizon ≠ fake final Evolution Step
prototype success ≠ any included Step realized
simulated predecessor ≠ realized predecessor
prototype implementation ≠ production architecture authority
```
