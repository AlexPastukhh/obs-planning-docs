
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

## Selected Slice Owner Source

A normal detailed Slice refines one stable selected Slice semantic identity. When `TM-SLICE-STRATEGY` was used, that identity/addressability is registered in `RU-SSTRAT-03 Selected Slice Owner Register` and may still be physically embedded inside the Strategy artifact. The register does not itself create a bounded `TM-IMPLEMENTATION-SLICE` Target; normal Target Formation must select/reuse that bounded Target when independent detailed Slice planning is material. Semantic Slice identity does not require a separate `SL-<id>.md` file.

The implementation owner normally starts from planning meaning such as:

```text
Slice ID
Primary Scenario
Useful Vertical Result
Behavior Items realized
relevant Scenario DATA used / produced / changed
must-hold / negative guarantees
Domain / Aggregate elements currently expected or known to be used
related Screen / Cross-Cutting relations when material
real dependencies / order constraints
May Change / Extend pressure when useful
```

`INITIAL_VERTICAL` / `EXTENDING_VERTICAL` may still be descriptive language when helpful, but it is not a required classification contract.

If explicit Strategy was skipped because one small Slice was obvious, establish the minimum equivalent Slice semantic meaning locally. When independently bounded implementation planning is material, Target Formation still decides whether to reuse/form `TM-IMPLEMENTATION-SLICE`; if selected, it refines that Slice meaning rather than duplicating it merely because an earlier representation contained the identity.

## Verticality And Domain Use

```text
one normal vertical Slice → exactly one Primary Scenario
one Scenario → may have several independently useful/checkable Slices
one Slice → may use several Aggregates/domain concepts
one Aggregate/domain concept → may be used by several Slices
```

Detailed Slice planning may discover that Strategy decomposition or `Slice → Uses → Aggregate/domain concept` relations are incomplete/wrong. Surface a Finding Candidate, pass it through Core Finding Disposition, and perform bounded revalidation only when that lifecycle consequence is selected; do not treat Strategy as an immutable one-way handoff.

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
