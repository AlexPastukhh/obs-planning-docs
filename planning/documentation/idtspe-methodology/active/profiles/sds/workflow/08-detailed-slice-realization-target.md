
# Phase 08 — Implementation Planning — Generic

Status: active module-driven navigation family

## Candidate Target Modules

```text
TM-IMPLEMENTATION-SLICE
  normal one-Primary-Scenario vertical Slice

TM-TEST-DESIGN
  one proof Target per Slice when material;
  may follow detailed Slice planning or interleave through TDD

TM-FRONTEND-SLICE
  promoted frontend Target only when ordinary Part Plan is insufficient

TM-CROSS-CUTTING-CONCERN
  shared non-vertical implementation responsibility
```

## Useful Vertical Result Source

Each normal Slice starts from:

```text
Slice ID
Slice Role: INITIAL_VERTICAL | EXTENDING_VERTICAL
Primary Scenario
Extends / Baseline Guarantees — when extending
Useful Vertical Result
Behavior Obligations
DATA Obligations
Requirement / Invariant Obligations
Screen Obligations — when UI
Domain Obligations — when useful
```

Explicit `TM-SLICE-STRATEGY` may select this definition; trivial work may form the same definition locally before detailed planning.

## Verticality

```text
one normal vertical Slice → exactly one Primary Scenario
one Scenario → may have several initial/extending Slices
```

Shared work across several Scenarios/Slices surfaces an ownership Finding Candidate; `TM-CROSS-CUTTING-CONCERN` or another shared owner may be a likely-owner hint, while Core Finding Disposition resolves the actual owner/State consequence and Target Formation handles independently material Target ownership. Architecture normally remains an Answer Decision; when a separate architecture problem is independently material, surface a Target Formation candidate and let Target Formation decide reuse/handoff/new bounded Target.

## Runtime Path vs Codebase Integration Path

```text
Runtime Path
= technical running-system execution view

Codebase Integration Path
= pre-implementation codebase call-level view
```

Default Codebase Integration Path granularity:

```text
one step ≈ one significant method/function/handler/repository/integration call
```

## Slice Test-Design Ordering

### Standard

```text
TM-IMPLEMENTATION-SLICE
→ stable Useful Vertical Result + obligations + implementation boundary
→ TM-TEST-DESIGN
→ realization
```

### TDD

```text
TM-IMPLEMENTATION-SLICE
→ stabilize Useful Vertical Result + semantic obligations
→ TM-TEST-DESIGN
→ repeat TM-IMPLEMENTATION-SLICE in REFINE mode
   to finish call-level implementation planning around proof seams
→ realization/tests
```

Default proof allocation:

```text
Slice orchestration / real collaborator wiring
→ integration tests

isolated complex Domain/business rule used by the Slice
→ unit tests at the Domain/rule owner
```

No separate Slice proof-target semantic entity is introduced.

## Part Plan Rule

Frontend is a Part Plan by default; `TM-FRONTEND-SLICE` is promotion only.

If a Part exposes genuine unresolved alternatives/QRP/Evidence/Decision space, keep that state explicit and surface a Target Formation candidate when independently substantial; Target Formation decides whether a bounded child Target is needed.

Canonical direction: `../shared/directed-methodology-workflow-and-next-step-resolution.md`.
