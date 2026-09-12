# Replacement Package Builder

Status: active producer-side documentation entry

## Purpose

Provide one navigation owner for replacement-package production while preserving the existing narrow current owners and making the planned Feature/Scenario target explicit.

## Current authoritative producer owners

- `../../commands/build-replacement-archive.command.md` — current command entry.
- `../../use-cases/UC-REPO-BUILD-REPLACEMENT-PACKAGE.md` — current generic repository use case.
- `../build-replacement-archive-workflow.md` — current detailed producer workflow.
- `../tools/replacement-package-app/PACKAGE-PROTOCOL.md` — current package/handoff contract owned at the consumer boundary.

These remain current implementation truth until the planned Feature owners are realized and promoted.

## Planned Feature owners

- [`features/README.md`](features/README.md) — planned Feature catalog.
- [`features/F-BLDR-START-REPOSITORY-WORK.md`](features/F-BLDR-START-REPOSITORY-WORK.md)
- [`features/F-BLDR-BUILD-REPLACEMENT-PACKAGE.md`](features/F-BLDR-BUILD-REPLACEMENT-PACKAGE.md)
- [`features/F-BLDR-APPLY-PACKAGE-FOR-REVIEW.md`](features/F-BLDR-APPLY-PACKAGE-FOR-REVIEW.md)
- [`features/F-BLDR-ADD-ISSUE-REVIEW-COMMENT.md`](features/F-BLDR-ADD-ISSUE-REVIEW-COMMENT.md)
- [`features/planned/F-BLDR-EDIT-WORK-ISSUE.md`](features/planned/F-BLDR-EDIT-WORK-ISSUE.md) — future Introduction.

Feature owners are the planned primary behavioral authority. The Scenario composes them and does not duplicate their internal validation/recovery behavior.

## Selected target Scenario

- [`scenarios/SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md`](scenarios/SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md)
- [`behavior-realization-map.md`](behavior-realization-map.md) — derived current/target implementation coverage; not behavior authority.

Target high-level flow:

```text
Start Repository Work
→ Build exact package
→ Apply exact package for Review in isolated state
→ semantic decision
   ├─ NEEDS_CORRECTION → durable finding → correction → new packageId → fresh Review
   └─ APPROVABLE → freeze the exact reviewed package
→ exact handoff / URI
→ STOP
```

Pre-`APPROVABLE` correction keeps the same logical `changeSetId` and the same selected package `expectedSource`; every new ZIP receives a new `packageId`.

## Current capability coverage

| Target capability | Current state |
|---|---|
| exact readable source / fail-closed base acquisition | CURRENT capability |
| deterministic package materialization + protocol validation | CURRENT capability |
| exact ZIP/package handoff | CURRENT capability, but not yet review-bound |
| explicit Start Repository Work identity/Issue/branch Feature | PLANNED TARGET |
| clean replay of exact package in isolated review state | PLANNED TARGET |
| coherent predicted tree + latest/cumulative/full review result | PLANNED TARGET |
| approval bound to exact package/result identity | PLANNED TARGET |
| correction comment + new package/review loop | PLANNED TARGET |

## Boundary

The Builder is a producer. Ordinary completion remains:

```text
exact APPROVABLE package + exact handoff identity → consumer → stop
```

It does not apply files to the consumer repository, create the consumer commit/publish result, integrate into the target branch or Finalize consumer work.
## Consumer composition

For the app-specific transition from an exact Builder-reviewed tuple to current Replacement Package App realization, use [`../replacement-package-realization-composition.md`](../replacement-package-realization-composition.md). Builder still stops at exact handoff; the composition guide does not make Builder responsible for consumer Apply/Commit/Publish or future reviewed-result verification.

