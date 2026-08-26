# Research Capture — Workspace Evolution

Status: worked example of `TM-WEUC` output, including Current Global Architecture Position

## Evolution Interpretation

From `SDS-EVOLUTION-MAP.md`:

```text
capture-source type is expected to vary;
core Capture behavior should remain reusable.

destination type may vary independently;
adding a destination should not force CaptureItem/source changes.

richer capture context may extend selected semantics locally.

offline support is plausible but not current;
do not introduce synchronization state until it becomes accepted/planned.
```

## Current Global Architecture Position

These items are current project-global architecture guidance. They are deliberately stronger than future path projections, but they still do not redefine Scenario or Domain semantics.

### `ARCH-G-RC-01` — Vertical delivery organization

```text
Strength: CURRENT_DEFAULT
Applies to: ordinary implementation delivery / Slice structure

Position:
  organize ordinary feature delivery around vertical Slice/feature ownership.
  Do not make controller/service/repository technical layers the primary ownership unit.

Why:
  planned source and destination growth should normally remain locally changeable
  while still traversing a useful vertical result.

Exception / revalidation:
  genuinely shared runtime/infrastructure responsibility may have a shared owner.
```

### `ARCH-G-RC-02` — Domain modeling posture

```text
Strength: PREFERRED
Applies to: conceptual/domain-heavy areas

Position:
  explicit Domain owners carry behavior/invariants when real domain meaning exists;
  do not require DDD entities/aggregates/value objects in areas without such meaning.

Why:
  CaptureItem/SourceContext have semantic rules worth owning, but source adapters
  and simple transport plumbing should not be promoted into ceremonial Domain objects.
```

### `ARCH-G-RC-03` — Folder/package ownership

```text
Strength: PREFERRED
Applies to: feature-owned code

Position:
  prefer semantic/feature-owner folders/packages over broad global technical-role buckets.

Expected shape:
  feature/source-specific entry and mapping stay near the feature/source owner;
  genuinely shared infrastructure remains in explicit shared/runtime owners.

Why:
  EV-RC-01 PDF Capture should mostly add a source-local path and reuse core Capture.
```

### `ARCH-G-RC-04` — Source-specific integration boundary

```text
Strength: REQUIRED
Applies to: capture-source integrations

Position:
  source/provider-specific conversion remains outside CaptureItem core semantics.

Why:
  another capture source is already planned; source variation must not force
  unrelated Domain/Review changes.
```

## Architecture Evolution / Transition Position

```text
Keep initial architecture direct where possible.

Do not introduce offline synchronization abstractions yet.

Transition trigger:
  offline capability becomes accepted/planned
  → re-evaluate local durability/sync state and queue boundary.
```

## Planned / Probable Evolution Paths

### EV-RC-01 — Add PDF Capture

```text
[NEW] PdfCaptureEntry
→ [NEW?] PdfSelectionMapper
→ [REUSE] captureFeature.commands.capture(...)
→ [REUSE] CaptureController.capture(...)
→ [REUSE] CaptureApplicationService.capture(...)
→ [REUSE] CaptureItem.create(...)
→ [REUSE] CaptureRepository.save(...)
→ [NEW] PdfCaptureIntegrationTest
```

Local refs:

```text
../domain/CaptureItem.evolution.md
../domain/SourceContext.evolution.md
../slices/SL-RC-01.evolution.md
```

### Possible Offline Capture

```text
likely:
  local durable queue/store
  sync/retry behavior
  possible Domain/application sync state

not selected now:
  exact classes/methods/storage
```

## Prepared Extension Point

```text
Capture source normalization boundary

Why:
  source expansion is planned.

Expected use:
  new source adapter/mapper
  → normalized capture input
  → reuse core capture path
```
