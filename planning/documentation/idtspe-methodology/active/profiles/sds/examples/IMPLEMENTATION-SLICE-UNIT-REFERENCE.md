# Implementation Slice Unit / Lens / Finding-Disposition Reference

Status: active SDS explanatory reference example  
Purpose: demonstrate the literal SDS conformance shape for `TM-IMPLEMENTATION-SLICE` + `LENS-SLICE-VERTICALITY-INTEGRATION` without claiming that the illustrative Capture product exists in the current repository.

## Situation

```text
Target:
  SL-CAP-01

Module:
  TM-IMPLEMENTATION-SLICE

Invocation mode:
  REFINE

Target Step Result:
  Implementation Slice Plan
```

The example is illustrative methodology content only.

## RU-SLICE-01 — Slice Outcome Definition

```text
Role:
  INITIAL_VERTICAL

Primary Scenario:
  Capture Material

Useful Vertical Result:
  user can durably save selected material
  and receive truthful success/failure

Behavior Obligations:
  accept capture
  persist accepted item
  report success only after durable success
  report failure truthfully

DATA Obligations:
  selected material
  capture result

Invariant:
  persistence failure must not be reported as success

Verification Obligations:
  durable success → success feedback
  persistence failure → failure feedback
  false success is prohibited
```

The proof/test handoff is part of this outcome definition by default. `TM-TEST-DESIGN` owns the detailed proof design.

## RU-SLICE-02 — Responsibility / Dependency Boundary

```text
Domain:
  CaptureItem
  → create/validate selected capture meaning

Persistence:
  CaptureRepository
  → durable save

UI:
  capture action + result feedback

Delegated:
  durable storage implementation remains repository responsibility

Outside:
  persistence-architecture redesign unless separately required
```

## RU-SLICE-03 — Runtime Path

```text
user submits capture
→ semantic input produced
→ application receives command
→ CaptureItem validation/creation
→ persistence attempt
→ commit or failure
→ semantic result
→ visible success/failure
```

## RU-SLICE-04 — Codebase Integration Path — initial candidate

```text
CaptureScreen.onSave()
→ CaptureController.capture(command)
→ CaptureApplicationService.capture(command)
→ CaptureItem.create(...)
→ CaptureRepository.save(item)
→ CaptureController.toResponse(result)
→ CaptureScreen.applyCaptureResult(result)
```

## Slice Lens Analysis Surface

```text
Primary Result Units:
  RU-SLICE-01 Slice Outcome Definition
  RU-SLICE-02 Responsibility / Dependency Boundary
  RU-SLICE-03 Runtime Path
  RU-SLICE-04 Codebase Integration Path

Conditional:
  RU-SLICE-05 Focused Part Plan(s)

Relevant State:
  Questions
  Q/R/P
  Decisions
  Evidence
  Revalidation state

Context:
  Scenario
  Domain
  Screen
  current implementation/workspace
```

Supported Lens operations:

```text
ANALYZE
CHECK
REFINE
CHALLENGE
```

## Lens CHECK Finding

```text
Meaning:
  RU-SLICE-04 does not make the owner of persistence-failure
  translation explicit, so false success remains possible.

Affected:
  RU-SLICE-04.failurePropagation

Related accepted meaning:
  RU-SLICE-01 invariant:
    persistence failure must not be reported as success
```

The Lens stops at the finding boundary.

## Core Finding Disposition

Current contracts make this disposition relatively direct:

```text
Risk R-17:
  persistence failure may be reported as success

Question Q-18:
  which owner maps repository failure
  into the semantic Capture result?
```

Normal resolution:

```text
Decision D-21:
  CaptureApplicationService owns
  persistence-result → semantic-result mapping.
```

## RU-SLICE-04 — after accepted resolution

```text
CaptureScreen.onSave()
→ CaptureController.capture(command)
→ CaptureApplicationService.capture(command)
→ CaptureItem.create(...)
→ CaptureRepository.save(item)
→ CaptureApplicationService.mapPersistenceResult(...)
→ CaptureController.toResponse(result)
→ CaptureScreen.applyCaptureResult(result)
```

The Result Unit changed after normal resolution; the Lens did not directly mutate it.

## RU-SLICE-05 — Focused Part Plan(s)

```text
NOT MATERIAL
```

No already-selected local algorithm/query/mapping/integration step currently deserves extra independent planning depth.

## Cross-Owner Finding Example

Suppose a later Lens finding is:

```text
truthful failure is required,
but retryable-vs-terminal user behavior is undefined.
```

The Slice does not invent Scenario/Application semantics.

Core Finding Disposition may resolve:

```text
current Slice owner insufficient
→ existing Scenario/Application owner Question/handoff
→ upstream resolution
→ accepted upstream result becomes Source for Slice refinement
```

This is ordinary Core disposition, not a Lens-specific `External Routing` operation and not automatic child-Target creation.

## Lesson

```text
Target Module
→ defines Result Units

Lens
→ defines perspective + Analysis Surface
→ ANALYZE / CHECK / REFINE / CHALLENGE
→ surfaces Finding Candidates

Core
→ Finding Disposition
→ State/lifecycle/owner resolution

normal authority/resolution
→ existing Result Units may change
```
