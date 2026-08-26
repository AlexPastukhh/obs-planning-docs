# Phase 07 — Workspace Evolution / WEUC / Architecture — Research Capture

Status: active cross-cutting worked example

This is not a one-time chronological step. It shows global-map ownership, reusable L5 checks and whole-Workspace architecture reasoning.

## Early Invocation — TM-WEUC

After Application + core Scenario direction and the ordinary Evolution Map are sufficiently known:

```text
TM-WEUC / EARLY_INTERPRETATION
→ CREATE SDS-PLANNING-STATE/SDS-WORKSPACE-EVOLUTION.md
```

The map initially states:

```text
new capture sources are expected;
source-specific change should remain outside CaptureItem core;
offline is plausible but not current.
```

## Whole-Workspace Architecture Invocation

Once enough Domain/Slice direction exists, the team wants to settle project-wide architecture defaults before more work branches out.

Invoke the reusable Lens command:

```text
проверь эволюцию и архитектуру архитектуры воркспейса
```

Resolution:

```text
Target = WORKSPACE_ARCHITECTURE
→ TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION
→ WEUC Lens / L5
```

Candidate architecture A:

```text
primary structure = controllers/services/repositories/models
feature changes normally cross several technical folders
```

Candidate architecture B:

```text
primary delivery structure = vertical Slice/feature ownership
explicit Domain owners only where semantic behavior/invariants justify them
source/provider adapters stay outside Domain core
feature-owned code prefers feature/semantic-owner folders
```

The current Evolution Map makes B a better project default because PDF-source growth and later destination growth can stay more isolated. The accepted results become `ARCH-G-RC-01..04` in `SDS-WORKSPACE-EVOLUTION.md / Current Global Architecture Position`.

This does not create `TM-ARCH`.

## WEUC Lens During Domain

While planning `CaptureItem`:

```text
Command:
  проверь эволюцию и архитектуру CaptureItem

SDS-WORKSPACE-EVOLUTION
  + ARCH-G-RC-02 Domain posture
  + ARCH-G-RC-04 source-integration boundary
→ WEUC Lens
→ check that new capture-source change does not leak into CaptureItem
→ CREATE/UPDATE domain/CaptureItem.evolution.md when local future planning is useful
```

Suppose a local Domain/Slice decision introduces a source-normalization boundary and analysis shows that **every future capture source** must follow it. L5 emits:

```text
global architecture-position update candidate
→ TM-WEUC
→ ARCH-G-RC-04 becomes/gets refined as project-global guidance
```

The local Target does not silently become the global owner.

## WEUC Lens During Slice

For `SL-RC-01`:

```text
Command:
  проверь эволюцию и архитектуру SL-RC-01

planned PDF capture
+ current global vertical-delivery/folder defaults
→ expected [NEW]/[REUSE] path
→ slices/SL-RC-01.evolution.md
```

If the Slice has a justified local exception to a `PREFERRED` global default, keep the local Answer Decision with rationale. If it contradicts a `REQUIRED` global position or demonstrates the global position is wrong, revalidate through `TM-WEUC`.

## Repeated Global Invocation

If Domain/Slice/actual implementation work changes the global interpretation or architecture position:

```text
TM-WEUC REFRESH / REVALIDATE
→ UPDATE SDS-WORKSPACE-EVOLUTION.md
```

The WEUC Lens does not become a second owner of the global map.
