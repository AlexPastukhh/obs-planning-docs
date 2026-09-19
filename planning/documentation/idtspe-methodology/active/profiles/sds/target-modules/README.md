# SDS Target Module Catalog

Status: active synchronized SDS Target registry

SDS Target Modules own recurring SDS Target/result families. Generic Questions / formal Proposals / Q-R-P / Decisions / Evidence / Findings / Revalidation remain IDTSPE Core State.

## Registry Scan Guide

Reach this registry from an applicable IDTSPE Use-Case Process (normally `UC-IDTSPE-COMPOSE-CURRENT-WORK`) when a recurring bounded SDS Target method may be useful.

```text
current Work Context / concern
→ scan Role / Result summaries
→ choose zero or more plausible Target Modules
→ open module body
→ confirm its Entry Point / local applicability gate
→ declare the complete Module-defined Unit inventory
→ substantively resolve only material Units; non-material Units receive explicit omission dispositions
```

`NO_REUSABLE_TARGET_MODULE` is a valid outcome. Registry selection does not itself create a Target. Recheck when the work concern, active Target/profile, accepted upstream meaning or module-specific materiality changes. Module-defined Unit identities are complete in every formed Target result; substantive Unit work and optional fields remain proportional to materiality. Contextual Units remain contextual.

## Core / Temporal Conformance Routing

Concrete SDS Target Modules inherit generic Unit/Target semantics from the Core [Unit And Target Step Result Model](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md) and [Target Module Model](../../../idtspe-core/shared/target-module-model.md). This registry does not restate those contracts.

Cross-owner current-vs-future hosting/readiness is routed to the SDS [Semantic Composition / Readiness Guide](../shared/directed-methodology-workflow-and-next-step-resolution.md) and [`TM-EVOLUTION-STEP`](TM-EVOLUTION-STEP.md). Current-owner reverse Evolution Impact projection semantics are routed to the shared [Current-Owner Evolution Impact Projection Contract](../shared/current-owner-evolution-impact-projection-contract.md). Registry rows below are discovery summaries only.

## Active SDS Target Modules

| Module ID | Alias | Role / Result |
|---|---|---|
| [`TM-APPLICATION-DEFINITION`](TM-APPLICATION-DEFINITION.md) | `application` | conditional own-Application contribution / boundary / feasibility |
| [`TM-FEATURE`](TM-FEATURE.md) | `feature` | primary Feature behavior + Feature/Slice boundary owner |
| [`TM-PROTOTYPE`](TM-PROTOTYPE.md) | `prototype` | transient empirical pre-commit inquiry |
| [`TM-SCENARIO-PLANNING`](TM-SCENARIO-PLANNING.md) | `scenario` | Scenario journey composition; compatibility ID/path retained |
| [`TM-SCREEN`](TM-SCREEN.md) | `screen` | Screen/spatial/navigation composition |
| [`TM-DOMAIN-DISCOVERY`](TM-DOMAIN-DISCOVERY.md) | `domain-discovery` / `domain` | transient bounded Domain discovery |
| [`TM-DOMAIN-OWNER`](TM-DOMAIN-OWNER.md) | `domain-owner` | durable Domain semantic contract + Domain IR |
| [`TM-IMPLEMENTATION-SLICE`](TM-IMPLEMENTATION-SLICE.md) | `slice` | compatibility ID for transient Slice Discovery |
| [`TM-SLICE-OWNER`](TM-SLICE-OWNER.md) | `slice-owner` | durable end-to-end Slice responsibility + Slice IR |
| [`TM-SHARED-IMPLEMENTATION-CAPABILITY`](TM-SHARED-IMPLEMENTATION-CAPABILITY.md) | `shared` | durable reusable non-end-to-end implementation capability |
| [`TM-EVOLUTION-STEP`](TM-EVOLUTION-STEP.md) | `evolution-step` | canonical bounded unrealized future transition / target-state planning owner |
| [`TM-EVOLUTION-STEPS-MAP`](TM-EVOLUTION-STEPS-MAP.md) | `evolution-map` | registry/routing/selection-relation/readiness map for concrete Step candidates/selections |
| [`TM-PRACTICAL-TEST`](TM-PRACTICAL-TEST.md) | `practical-test` | implemented real-subject practical Evidence |

## Retired / Subsumed Baseline Modules

| Old module | Final disposition |
|---|---|
| `TM-REQUIREMENT` | RETIRE — durable requirements stay in exactly one natural owner |
| `TM-SLICE-STRATEGY` | RETIRE — portfolio/coverage/Domain-use/owner-bridge meaning becomes workflow/Lens/derived coordination |
| `TM-CROSS-CUTTING-CONCERN` | RETIRE — unified into `TM-SHARED-IMPLEMENTATION-CAPABILITY` |
| `TM-TEST-DESIGN` | RETIRE — non-trivial proof design is transient natural-owner planning evaluated by Core Test Proof Lens |
| `TM-TEST-STRATEGY` | RETIRE — cross-owner proof coordination is transient/Decision/supporting representation unless future independent owner pressure passes a new Target gate |

Retirement removes baseline Target-family authority, not useful semantic guidance. Old semantics are explicitly moved/subsumed in the S4 regression ledger.

## Inherited Generic Core Target Modules

- Core `TM-PRE-UPDATE-PLAN` — optional reviewable plan before mutation when that result is useful.
- Core `TM-EXACT-REALIZATION` — exact directly-integrable/literal result; may use transient internal exact planning.

Pre-Update is not a mandatory predecessor of Exact.

## Feature / Scenario / Screen

```text
TM-FEATURE
  behavior / semantic Feature Data / BR-* / implementation concerns / Feature-Slice boundary / owner-local reverse Impact Unit

TM-SCENARIO-PLANNING
  journey composition / continuity / Benefit manifestation/closure / SR-* / optional E2E proof intent / journey realization concerns / owner-local reverse Impact Unit

TM-SCREEN
  spatial/navigation composition / Feature presence / routes / Screen-specific constraints
```

These are peer owners and may be formed/revalidated together.

## Domain / Slice / Shared

```text
TM-DOMAIN-DISCOVERY      working Target → selected Result Content → Domain Evolution Impact → zero/one/several Target Domain Bodies as warranted
TM-IMPLEMENTATION-SLICE  working Target → selected Result Content → Slice/Domain/Shared Evolution Impact → Target owner body/bodies as warranted
TM-SHARED-IMPLEMENTATION-CAPABILITY durable only under genuine shared-consumer pressure
```

Discovery artifact/Unit Resolution is transient by default and never becomes authority merely because it exists. Selected Result Content may be retained in the owning Evolution Impact while unrealized; durable semantic authority still belongs to Target Owner Bodies/current owners at the correct temporal boundary.

## Requirements / Proof

```text
Feature behavior action/transition → FBS-*
Feature behavior must-hold → BR-*
Scenario journey must-hold → SR-*
Domain / Slice / Shared implementation constraint → owner-local IR-*
Durable SDS Requirement → reusable Requirement Type classification only when that classification materially improves review/traceability/representation; Type remains optional and does not affect family/owner semantics
rare durable proof-realization HOW constraint → owner-local PFR-*
```

Proof design normally remains transient. Literal tests are Exact/code. Executed checks become Evidence only when actually run against the stated subject/state/environment.

Cross-module semantic relationships/readiness guidance lives in [`../shared/directed-methodology-workflow-and-next-step-resolution.md`](../shared/directed-methodology-workflow-and-next-step-resolution.md). Runtime composition remains Use-Case-driven.
