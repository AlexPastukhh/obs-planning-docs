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
→ instantiate only material Result Units
```

`NO_REUSABLE_TARGET_MODULE` is a valid outcome. Registry selection does not itself create a Target. Recheck when the work concern, active Target/profile, accepted upstream meaning or module-specific materiality changes. Result Units and fields remain sparse: declared possibility does not make them mandatory.

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
| [`TM-EVOLUTION-STEP`](TM-EVOLUTION-STEP.md) | `evolution-step` | one coherent qualitative future transition / target state |
| [`TM-EVOLUTION-STEPS-MAP`](TM-EVOLUTION-STEPS-MAP.md) | `evolution-map` | registry/routing/prerequisite/readiness map for Steps |
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
  behavior / semantic Feature Data / BR-* / implementation concerns / Feature-Slice boundary

TM-SCENARIO-PLANNING
  journey composition / continuity / terminal Benefit / sparse journey must-holds / optional E2E proof intent

TM-SCREEN
  spatial/navigation composition / Feature presence / routes / Screen-specific constraints
```

These are peer owners and may be formed/revalidated together.

## Domain / Slice / Shared

```text
TM-DOMAIN-DISCOVERY      transient → zero/one/several TM-DOMAIN-OWNER
TM-IMPLEMENTATION-SLICE  transient → zero/one TM-SLICE-OWNER for one selected durable responsibility
TM-SHARED-IMPLEMENTATION-CAPABILITY durable only under genuine shared-consumer pressure
```

Discovery is not persistence and does not become authority merely because a working artifact exists.

## Requirements / Proof

```text
Feature behavior → BR-*
Scenario journey must-hold → Scenario-owned, no mandatory SR-* family
Domain / Slice / Shared implementation constraint → owner-local IR-*
rare durable proof-realization HOW constraint → owner-local PFR-*
```

Proof design normally remains transient. Literal tests are Exact/code. Executed checks become Evidence only when actually run against the stated subject/state/environment.

Cross-module semantic relationships/readiness guidance lives in [`../shared/directed-methodology-workflow-and-next-step-resolution.md`](../shared/directed-methodology-workflow-and-next-step-resolution.md). Runtime composition remains Use-Case-driven.
