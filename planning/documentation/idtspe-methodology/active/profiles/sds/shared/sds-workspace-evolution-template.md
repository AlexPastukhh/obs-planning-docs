# SDS Workspace Evolution — Template

Status: active planning-state Artifact Guidance
Canonical planning owner: `TM-WEUC`

## Purpose

Interpret `SDS-EVOLUTION-MAP.md` and other accepted planning Sources from the perspective of future Workspace change **and persist the current project-global architecture position that independent Targets must share**.

The file intentionally contains two different kinds of information:

```text
Current Global Architecture Position
= current project-global architecture decisions/defaults/conventions

Evolution Interpretation / Planned Paths
= future planning projection; not current implementation commitment
```

It must not become authority over Scenario behavior or Domain semantics.

## Suggested Shape

```text
# SDS Workspace Evolution

## Evolution Interpretation

## Current Global Architecture Position

### Architecture Decisions / Principles / Defaults
### Structural / Folder / Package Conventions — when material

## Architecture Evolution / Transition Position

## Planned / Probable Evolution Paths

## Prepared Extension Points

## Local Evolution Plan References

## Reconciliation / Refresh Notes — optional
```

## Evolution Interpretation

Explain in mostly free form:

```text
what will/may change
roughly when / in what sequence when meaningful
what is likely to vary repeatedly
what should remain isolated
what future transition may become necessary
```

You may use terms such as `WEUC`, `change direction`, `change axis`, `concern`, or ordinary prose. A rigid taxonomy is not required.

## Current Global Architecture Position

Persist only architecture content whose applicability is wider than one local Target.

Recommended compact form:

```text
ARCH-G-01
Strength: REQUIRED | PREFERRED | CURRENT_DEFAULT
Applies to: <scope>
Position: <project-global architecture decision/principle/convention>
Why: <current Workspace + evolution evidence>
Exceptions / revalidation trigger: <when it may be challenged>
Provenance: <Decision/Target refs when useful>
```

Examples of eligible content:

```text
primary decomposition / vertical-slice posture
where explicit Domain owners/DDD practices are expected or intentionally not forced
feature-vs-layer folder/package organization
dependency direction
shared-vs-local ownership defaults
integration/adapter conventions
project-global seams
```

Do not store slogans such as `use DDD` without project meaning.

## Architecture Evolution / Transition Position

Record future architecture changes separately from the current global position:

```text
possible future transition
trigger / condition
prepared seam
preparation tax accepted now, if any
```

## Planned / Probable Evolution Path

Example:

```text
EV-17 — PDF Capture

Meaning:
  another capture source should reuse core capture behavior.

Expected path:
  [NEW] PdfCaptureEntry
  → [NEW?] usePdfSelection()
  → [REUSE] captureFeature.commands.capture(...)
  → [REUSE] CaptureController.capture(...)
  → [REUSE] CaptureApplicationService.capture(...)
  → [NEW] PdfCaptureIntegrationTest

Local details:
  slices/SL-CAP-01.evolution.md
```

## Prepared Extension Point

Example:

```text
CaptureSource boundary

Why:
  capture-source expansion is an expected evolution direction.

Expected use:
  implement a new source adapter,
  reuse core capture behavior,
  keep source-specific branches out of CaptureItem.

Supports:
  EV-17 PDF Capture
  plausible clipboard/mobile sources
```

## Boundary

```text
SDS-EVOLUTION-MAP
= what/when product or system development is expected

SDS-WORKSPACE-EVOLUTION / Current Global Architecture Position
= current project-global architecture guidance shared across Targets

SDS-WORKSPACE-EVOLUTION / future sections
= what evolution means for future Workspace change/architecture paths

<owner>.evolution.md
= local detailed future path around one owner
```
