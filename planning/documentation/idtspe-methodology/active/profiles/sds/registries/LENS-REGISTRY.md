<a id="sds-lens-discovery"></a>
# SDS Lens Registry

Responsibility ID: `SDS.LENS-DISCOVERY`

Status: active synchronized SDS Lens registry

Lenses discover/evaluate/refine/challenge meaning. They never become the semantic owner whose result they inspect.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Lens Meta-Model](../../../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) — `LENS.META-MODEL`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [SDS Programming Principles](../knowledge-bases/programming-principles/README.md#sds-programming-principles) — `SDS.PROGRAMMING-PRINCIPLES`

## Registry Scan Guide

The Core Lens Registry is the normal universal entry point. When SDS is active, Core checkpoint discovery includes this registry in addition to inherited/generic Core Lens.

```text
current SDS Analysis Surface
→ scan SDS discovery summaries
→ open zero or more plausible concrete SDS Lens
→ evaluate each Lens's own checkpoint trigger / applicability
→ apply only required/applicable Lens Applications
→ Core Finding Disposition handles material Finding Candidates
```

A scan may return `NO_ADDITIONAL_SDS_LENS`. Do not run every profile Lens as ceremony. Recheck through the generic Unit applicability envelope after relevant material Analysis-Surface changes.

## Core Lens Availability

SDS adds profile-owned Lens. The inherited Core Lens Pack and Generic Core Lens remain available through [`../../../idtspe-core/lenses/LENS-REGISTRY.md`](../../../idtspe-core/lenses/LENS-REGISTRY.md) and are not duplicated here.

This registry is additive to Core; it never replaces Core registry content or owns Unit attachment strength.

## SDS-Specific Lens Registry

| Lens | Applicability summary |
|---|---|
| [`LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`](../lenses/frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md) | complexity/implementation economy/evolution-safe simplification is material |
| [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) | known Evolution/change-isolation/prepare-now-vs-defer pressure is material |
| [`LENS-APPLICATION-BOUNDARY-FEASIBILITY`](../lenses/reusable/LENS-APPLICATION-BOUNDARY-FEASIBILITY.md) | own-Application contribution/boundary/feasibility is unsettled |
| [`LENS-DOMAIN-MODELING-DDD`](../lenses/reusable/LENS-DOMAIN-MODELING-DDD.md) | Domain identity/state/lifecycle/consistency/ownership questions are material |
| [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md) | Feature/Slice boundary, end-to-end realization, behavior coverage or change locality is material |
| [`LENS-UI-SPATIAL-FRONTEND-REALIZATION`](../lenses/reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md) | Screen/spatial/UI/frontend realization questions are material |
| [`LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY`](../lenses/reusable/LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY.md) | reasoning may need to become/change/retire durable owner-local IR/PFR meaning |
| [`LENS-TERMS-UBIQUITOUS-LANGUAGE`](../lenses/reusable/LENS-TERMS-UBIQUITOUS-LANGUAGE.md) | durable terminology/definition consistency is material, especially for Requirements/errors |

There is **no Programming Principles Lens**. The complete 22-group reusable corpus is routed through [`../knowledge-bases/programming-principles/README.md`](../knowledge-bases/programming-principles/README.md); selected groups are evaluated by their natural Core/SDS Lens or Target Production owner.

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
terms                       → LENS-TERMS-UBIQUITOUS-LANGUAGE
```

`l5` is an invocation compatibility alias only; it does not restore numbered-Lens ontology. Alias resolution does not make a Lens applicable: the selected Lens still checks its own Applicability, Analysis Surface and Supported Operation.

Attachment and composition notes below are registry-level routing projections only. Concrete Lens files own operational evaluation semantics; Programming Principles remain Knowledge Basis content rather than Lens definitions.

## Lens Attachment Projection

Predictable SDS Unit attachments are projected in [`LENS-ATTACHMENT-MAP.md`](LENS-ATTACHMENT-MAP.md#sds-lens-attachment-map). The map is navigation/audit projection only: normative attachment remains beside the natural `RU-*` owner, and concrete Lens files own temporal trigger logic.

The Core Lens Pack remains inherited by every material Unit. Unlisted profile/Core Lens remain discoverable through normal registry scans.

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
