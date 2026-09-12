# SDS Lens Registry

Status: active synchronized SDS Lens registry

Lenses discover/evaluate/refine/challenge meaning. They never become the semantic owner whose result they inspect.

## Registry Scan Guide

Reach this registry from an applicable IDTSPE Use-Case Process or Target Module Lens Profile when an SDS-specific evaluation perspective may be useful.

```text
current Analysis Surface + active Use Case/Target
→ scan applicability summaries
→ select zero or more plausible SDS Lenses
→ open Lens body
→ confirm local Applicability + Analysis Surface + Supported Operation
→ perform evaluation
→ Core Finding Disposition handles any material Finding Candidate
```

A scan may return `NO_ADDITIONAL_SDS_LENS`. Do not run every profile Lens as ceremony. Recheck only after material changes to Analysis Surface, relevant Decisions/Evidence, Target/profile meaning or Lens-specific revalidation conditions.

## Inherited Core Lens Pack

Use [`../../../idtspe-core/lenses/README.md`](../../../idtspe-core/lenses/README.md) for generic required/frequent/reusable Lenses, including proof, authority/SOT, dependency/change impact, verifiability/observability/operability, quality/risk, uncertainty/reversibility and representation/addressability.

## SDS-Specific Lens Registry

| Lens | Applicability summary |
|---|---|
| [`LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`](frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md) | complexity/implementation economy/evolution-safe simplification is material |
| [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) | known Evolution/change-isolation/prepare-now-vs-defer pressure is material |
| [`LENS-APPLICATION-BOUNDARY-FEASIBILITY`](reusable/LENS-APPLICATION-BOUNDARY-FEASIBILITY.md) | own-Application contribution/boundary/feasibility is unsettled |
| [`LENS-DOMAIN-MODELING-DDD`](reusable/LENS-DOMAIN-MODELING-DDD.md) | Domain identity/state/lifecycle/consistency/ownership questions are material |
| [`LENS-SLICE-VERTICALITY-INTEGRATION`](reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md) | Feature/Slice boundary, end-to-end realization, behavior coverage or change locality is material |
| [`LENS-UI-SPATIAL-FRONTEND-REALIZATION`](reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md) | Screen/spatial/UI/frontend realization questions are material |
| [`LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY`](reusable/LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY.md) | reasoning may need to become/change/retire durable owner-local IR/PFR meaning |

There is **no Programming Principles Lens**. The complete 22-group reusable corpus is routed through [`../shared/programming-principles/README.md`](../shared/programming-principles/README.md); selected groups are evaluated by their natural Core/SDS Lens or Target Production owner.

## Generic `idtspe` SDS Lens Aliases

Canonical semantic identity remains the `LENS-*` ID. The generic dispatcher accepts these profile-owned short aliases after Core aliases are considered; every active alias resolves to exactly one Lens:

```text
simplicity                  → LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY
evolution                   → LENS-WORKSPACE-EVOLUTION-ARCHITECTURE
l5                          → LENS-WORKSPACE-EVOLUTION-ARCHITECTURE   # legacy compatibility alias
application-boundary        → LENS-APPLICATION-BOUNDARY-FEASIBILITY
ddd                         → LENS-DOMAIN-MODELING-DDD
verticality                 → LENS-SLICE-VERTICALITY-INTEGRATION
ui                          → LENS-UI-SPATIAL-FRONTEND-REALIZATION
implementation-requirements → LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY
```

`l5` is an invocation compatibility alias only; it does not restore numbered-Lens ontology. Alias resolution does not make a Lens applicable: the selected Lens still checks its own Applicability, Analysis Surface and Supported Operation.

## Typical Attachment / Consumption

- Application Definition → Application Boundary/Feasibility primary when that material exists.
- Feature → Vertical Slice at light evidence depth when Feature/Slice boundary is material.
- Scenario → no mandatory SDS Lens; Vertical/UI/Test-Proof/Evolution only when raised by current journey meaning.
- Screen → UI/Spatial when spatial/frontend realization is material.
- Domain Discovery/Owner → DDD is the primary Domain evaluator when Domain reasoning is material.
- Slice Discovery/Owner → Vertical Slice is the primary Slice evaluator when Slice reasoning is material.
- Shared Capability → Vertical Slice/sharedness/dependency/evolution/simplicity/quality/representation proportionally; no Shared-specific Lens.
- owner-local IR/PFR formation/revalidation → Implementation Requirements Discovery.
- known selected future change → Evolution Lens.
- proof selection/coverage → inherited Core Test Proof Lens.
- real/simulated observation quality → inherited Core Practical Evidence Lens.

`required` or `primary` means required **for the corresponding material Analysis Surface**, not required on every turn or merely because the profile is active.

## Programming-Principle Knowledge Composition

A natural evaluator may reference one or several `RG-PRG-*` entries after the principle registry trigger scan. Example:

```text
Slice retry/cancellation design becomes material
→ Programming Principles Registry selects
   RG-PRG-IDEMPOTENCY-RETRY-UNCERTAINTY
   RG-PRG-TIMEOUT-CANCELLATION-BOUNDS
→ read only those knowledge entries
→ Vertical Slice / VOO / Uncertainty / Quality evaluators apply them as relevant
```

The knowledge entry itself does not create a Finding or durable Requirement.

## Guards

```text
Lens ≠ semantic owner
Lens Finding ≠ accepted owner mutation
Reusable Requirement ≠ owner-local IR until selected
Evolution Lens ≠ Evolution Step
Vertical Slice Lens ≠ Slice owner
DDD Lens ≠ Domain owner
Test Proof Lens ≠ Test Strategy/Test Design Target
Programming Principle entry ≠ Lens
```
