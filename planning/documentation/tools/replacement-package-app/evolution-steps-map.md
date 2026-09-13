# Replacement Package App — Evolution Steps Map

Status: active evolution registry / coordination owner

This file routes selected Evolution Steps, prerequisite/readiness relations and current-vs-future navigation. Dedicated substantial Step owners hold complete future target state.

## Current target state

```text
WorkId
├─ WorkIntent / managed Issue
├─ GitWorkspace
└─ ReplacementPackageState*

OBS apply-package handoff
→ Apply Feature entry
→ ensure wider Work prerequisites as required
→ Apply → Commit → Publish
```

Apply, Commit and Publish are current modules/operations of one `F-RPKG-APPLY-REPLACEMENT-PACKAGE`. The current handoff has no `ApplyExtent`, no automatic Finalize selection and no URI entry.

## Implemented lineage

| Step | Kind | Status / result |
|---|---|---|
| `EVO-RPKG-MODULARIZE-PACKAGE-REALIZATION` | Refactoring / Introduction / Forced Migration | **IMPLEMENTED** — one Apply Feature, explicit Apply/Commit/Publish module boundaries, independent operation Results, shared `ReplacementPackageState`, no generic Resume state machine. |
| `EVO-RPKG-RETIRE-CHANGESET-AGGREGATE` | Refactoring / Introduction / Retirement / Forced Migration | **IMPLEMENTED for target paths** — WorkId / WorkIntent / GitWorkspace / ReplacementPackageState replace `Core.ChangeSet` authority; old works remain with old executable. |
| `EVO-RPKG-RETIRE-LEGACY-INTERACTION-SURFACE` | Retirement / Forced Migration | **IMPLEMENTED for target Main Work Window** — legacy ChangeSet Review/Chat/Finalize controls are absent from target UI. |

## Selected future Steps

| Step | Kind | Owner | Requires | Actual readiness / routing note |
|---|---|---|---|---|
| `EVO-RPKG-PARAMETERIZE-APPLY-HANDOFF` | Expansion / Refactoring | [`evolution-steps/EVO-RPKG-PARAMETERIZE-APPLY-HANDOFF.md`](evolution-steps/EVO-RPKG-PARAMETERIZE-APPLY-HANDOFF.md) | — | Current entry state is realized; Step target planning is selected. |
| `EVO-RPKG-INTRODUCE-WORK-FINALIZATION` | Introduction / Expansion / Forced Migration | [`evolution-steps/EVO-RPKG-INTRODUCE-WORK-FINALIZATION.md`](evolution-steps/EVO-RPKG-INTRODUCE-WORK-FINALIZATION.md) | — | Current publish boundary exists; remaining OPEN target choices must be closed before implementation. |
| `EVO-RPKG-ENABLE-AUTOMATIC-FINALIZATION` | Expansion / Refactoring | [`evolution-steps/EVO-RPKG-ENABLE-AUTOMATIC-FINALIZATION.md`](evolution-steps/EVO-RPKG-ENABLE-AUTOMATIC-FINALIZATION.md) | parameterized handoff + Work Finalization | Blocked until both required Step target states are realized. |
| `EVO-RPKG-ADD-APPLY-URI-ENTRY` | Expansion | [`evolution-steps/EVO-RPKG-ADD-APPLY-URI-ENTRY.md`](evolution-steps/EVO-RPKG-ADD-APPLY-URI-ENTRY.md) | automatic finalization composition | Blocked until the complete handoff command semantics it must preserve are realized. |

Derived navigation:
- parameterized handoff and Work Finalization both enable automatic Finalization composition;
- automatic Finalization composition enables the selected URI target that preserves both `ApplyExtent` and `FinalizeMode`.

## Boundary

The Map does not duplicate complete target Feature/Scenario bodies. Current owners remain current authority until a Step is implemented and its target bodies are revalidated/promoted.
