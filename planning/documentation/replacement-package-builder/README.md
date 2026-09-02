# Replacement Package Builder

Status: active producer-side documentation entry

## Purpose

Provide one navigation owner for replacement-package production while preserving the existing narrow owners for command entry, generic use case and detailed workflow.

## Current authoritative producer owners

- `../../commands/build-replacement-archive.command.md` — command entry.
- `../../use-cases/UC-REPO-BUILD-REPLACEMENT-PACKAGE.md` — generic repository use case.
- `../build-replacement-archive-workflow.md` — current detailed producer workflow.
- `../tools/replacement-package-app/PACKAGE-PROTOCOL.md` — package/handoff contract owned at the consumer boundary.

Do not move or duplicate those files merely to make navigation prettier. This README is the single producer documentation entry and points to the existing owners.

## Selected target behavior

- [`scenarios/SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md`](scenarios/SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md) — planned target Scenario.
- [`behavior-realization-map.md`](behavior-realization-map.md) — derived current/target implementation coverage; not behavior authority.

Target high-level flow:

```text
Exact Build Context
  ↓
Develop Candidate
  ↓
Build Exact Package Pn
  ↓
Replay exact Pn from exact expected source in a fresh workspace
  ↓
Review latest delta + cumulative delta + full predicted result Tn
  ├─ NEEDS_CORRECTION → new candidate → new ZIP/packageId → replay again
  └─ APPROVABLE → hand off the exact reviewed package/result identity
  ↓
STOP
```

## Current capability coverage

| Target capability | Current state |
|---|---|
| exact readable source / fail-closed base acquisition | CURRENT capability |
| deterministic package materialization + protocol validation | CURRENT capability |
| exact ZIP/package handoff | CURRENT capability, but not yet review-bound |
| clean replay of the exact handoff package | PLANNED TARGET |
| review of latest + cumulative + full predicted result | PLANNED TARGET |
| approval bound to exact package/result identity | PLANNED TARGET |
| correction invalidates prior review and forces new package identity | PARTIAL protocol support; target review loop not yet owned |

## Boundary

The Builder is a producer. Even after the target replay/review loop is implemented, ordinary Builder completion is:

```text
exact APPROVABLE package + exact handoff identity → OBS-ACTION → stop
```

It does not apply files to the consumer repository, commit, publish, create PRs or finalize target-branch integration.
