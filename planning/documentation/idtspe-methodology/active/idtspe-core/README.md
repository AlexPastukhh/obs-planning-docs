# IDTSPE Core

Status: active canonical generic methodology package  
Scope: always-active, proportional planning/resolution work model independent of SDS/Application-specific semantics.

## Boundary

```text
Documentation methodology
= Use Case / Process / Principles & Terminology / Registry / Template / Example semantics
  and the functional rules for using methodology/documentation

Session (`planning/session/`)
= thin generic USER↔AI interaction runtime only
  work-step visibility / automatic progression / steering / AI Proposal / real gates

IDTSPE Core
= always-active planning/resolution work context
  Broad Discussion / Core State / Targets / Target Modules / Lenses /
  Proposal-QRP-Decision-Evidence-Finding / Integration / Revalidation / Representation

SDS Profile
= specialized Target Modules, Lenses, registries, knowledge, owner topology and planning semantics
```

IDTSPE is not an opt-in planning mode. It remains lightweight by applying the [`Contextual Methodology Application Contract`](shared/contextual-methodology-application-contract.md): Broad Discussion with no Target/State/Lens/Checkpoint is a valid IDTSPE projection when deeper structure has no current value.

## Bootstrap

The canonical Core bootstrap entry is this `README.md`. When entering Core directly and the generic planning bootstrap is not already reliable, first bootstrap from [`planning/README.md`](../../../../README.md), then return here.

For the Core portion, read in order:

1. this `README.md`;
2. [`IDTSPE-CORE-MAP.md`](IDTSPE-CORE-MAP.md);
3. [`IDTSPE-DEFAULT-WORK-MODE.md`](IDTSPE-DEFAULT-WORK-MODE.md);
4. [`shared/idtspe-methodology-use-case-registry.md`](shared/idtspe-methodology-use-case-registry.md);
5. [`shared/compose-current-work-use-case.md`](shared/compose-current-work-use-case.md);
6. [`shared/contextual-methodology-application-contract.md`](shared/contextual-methodology-application-contract.md);
7. [`shared/methodology-registry-directory.md`](shared/methodology-registry-directory.md);
8. [`IDTSPE-SHELL.md`](IDTSPE-SHELL.md);
9. [`shared/idtspe-unit-and-target-step-result-model.md`](shared/idtspe-unit-and-target-step-result-model.md);
10. [`shared/target-module-model.md`](shared/target-module-model.md);
11. [`lenses/LENS-MODEL.md`](lenses/LENS-MODEL.md) and [`lenses/README.md`](lenses/README.md);
12. [`shared/finding-disposition-contract.md`](shared/finding-disposition-contract.md);
13. [`shared/artifact-placement-and-idtspe-response-contract.md`](shared/artifact-placement-and-idtspe-response-contract.md);
14. [`shared/idtspe-command-surface-contract.md`](shared/idtspe-command-surface-contract.md).

Other Core contracts, examples, specific Target Modules, specific Lenses, theory and profiles remain lazy/conditional reads reached from Use Cases, registries and current applicability. Primary bootstrap stops before profile bootstrap.

## Functional Entry

Methodology work starts from Use Cases, not from an MWS or component registry:

```text
current situation
→ Documentation Methodology Use-Case Registry Map
→ applicable Documentation + IDTSPE Use Cases
→ Use-Case Process
→ methodology registry/component when the Process needs one
→ component-local applicability/materiality
```

Start with:

1. [`../../../../documentation/use-case-registry-map.md`](../../../../documentation/use-case-registry-map.md) — cross-scope Use-Case functional entry.
2. [`shared/idtspe-methodology-use-case-registry.md`](shared/idtspe-methodology-use-case-registry.md) — current IDTSPE methodology-use capabilities.
3. [`shared/compose-current-work-use-case.md`](shared/compose-current-work-use-case.md) — default continuously relevant IDTSPE work-composition UC.
4. [`shared/contextual-methodology-application-contract.md`](shared/contextual-methodology-application-contract.md) — proportionality / situational application invariant.
5. [`shared/methodology-registry-directory.md`](shared/methodology-registry-directory.md) — supporting registry-family router used *from* Use-Case Processes.
6. [`shared/methodology-use-case-scenario-map.md`](shared/methodology-use-case-scenario-map.md) — design/evaluation/orientation examples; **not runtime authority**.

## Core Technical Owners

- [`IDTSPE-CORE-MAP.md`](IDTSPE-CORE-MAP.md) — current owner/dependency map.
- [`IDTSPE-SHELL.md`](IDTSPE-SHELL.md) — generic technical runtime/composition contract; stable `P-01..P-15` port navigation.
- [`IDTSPE-DEFAULT-WORK-MODE.md`](IDTSPE-DEFAULT-WORK-MODE.md) — compatibility owner explaining that IDTSPE is already active and how `idtspe.work` now means explicit refresh/application, not enablement.
- [`shared/idtspe-unit-and-target-step-result-model.md`](shared/idtspe-unit-and-target-step-result-model.md) — Core State + Target Step Result Unit model, including applicability/materiality/omission.
- [`shared/broad-discussion-and-integration-checkpoint-model.md`](shared/broad-discussion-and-integration-checkpoint-model.md) — Broad Discussion ↔ situational Integration Checkpoint model.
- [`shared/finding-disposition-contract.md`](shared/finding-disposition-contract.md) — producer → Finding Candidate → owner/State/lifecycle disposition.
- [`shared/resolution-slot-and-target-formation-resolution-set.md`](shared/resolution-slot-and-target-formation-resolution-set.md) — Target Formation resolution mechanics.
- [`shared/target-module-model.md`](shared/target-module-model.md) — Target Module contract.
- [`shared/knowledge-basis-contract.md`](shared/knowledge-basis-contract.md) — reusable theory/knowledge boundary.
- [`lenses/LENS-MODEL.md`](lenses/LENS-MODEL.md) + [`lenses/README.md`](lenses/README.md) — Lens model and registry.
- [`target-modules/README.md`](target-modules/README.md) — generic Core Target Module registry.
- [`lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — representation/materialization policy.
- [`shared/artifact-placement-and-idtspe-response-contract.md`](shared/artifact-placement-and-idtspe-response-contract.md) — placement/response contract.
- [`../PLANNING-GOVERNANCE.md`](../PLANNING-GOVERNANCE.md) — authority/governance rules.

## IDTSPE Work Context

The current work context may contain **zero, one or several Targets**.

```text
IDTSPE Work Context
├─ current Work Concern / useful USER result
├─ Broad Discussion / Key Points
├─ zero or more material Core State Units
├─ zero or more bounded Targets
│  └─ applicable Target Result Units
├─ selected/applicable methodology components
├─ optional Methodology Usage State
└─ revalidation / representation / continuation state when useful
```

A bounded Target is created/reused only when explicit target responsibility/result/scope provides independent value. This removes the old assumption that every IDTSPE work pass starts with one concrete Target.

## Target Step Result / Unit Boundary

```text
Target Step Result Unit
= target-specific meaning defined by Target Module / Local Target Contract

IDTSPE State Unit
= generic planning/resolution state defined by Core
```

Both use sparse/material projection. A possible Unit/field is not a completion checklist.

Core State now includes an optional `Methodology Usage State` kind for material facts such as active Use Cases, meaningful registry selections, component operation/scope, contextual adaptations and recheck/re-entry conditions. It is not an action/file-read log.

## Broad Discussion / Integration

- **Broad Discussion** is the normal low-ceremony working surface and may span many turns with no Target or formal State when that is sufficient.
- **Key Points** structure material logical discussion for reviewability; they are not Units.
- **IDTSPE Integration Checkpoint** is a **situational** whole-state integration operation invoked when a coherent current view is useful. It is not periodic by timer/message count and does not imply approval/persistence/completion.
- accepted material Decisions are retained when revalidation/continuation benefits from them; optional rationale/rejected-alternative retention remains proportional.

## Lens Boundary

Lenses operate over an Analysis Surface through `ANALYZE / CHECK / REFINE / CHALLENGE` as supported by the concrete Lens.

```text
Use Case / registry routing
→ decides whether a Lens should be considered

Lens Applicability Gate
→ confirms local applicability

Lens
→ performs specialized evaluation
→ explanatory Key Points OR Finding Candidate

Core Finding Disposition
→ owns State/lifecycle/owner consequence
```

No Lens owns the question "should IDTSPE methodology be used?"; IDTSPE is always active and its Use Cases/contextual application contract govern proportionality.

## Profile Rule

A profile may contribute:

```text
Target Modules
profile-specific Lenses
profile registry directory
principle/knowledge registries
planning depth/readiness semantics
artifact/tree conventions
examples
```

A profile does not need profile-specific Use Cases unless it introduces a distinct independently useful way of **using profile methodology documentation**. The current SDS profile needs none; generic IDTSPE Use Cases compose its components.

## Methodology Use-Case Scenario Map

The former runtime MWS role is retired. [`shared/methodology-use-case-scenario-map.md`](shared/methodology-use-case-scenario-map.md) is used to design/evaluate Use Cases and give AI a high-level picture of realistic methodology use. It cannot override current Use Cases/components.

## Adjacent Packages

- [`../ai-reviewability/README.md`](../ai-reviewability/README.md) — peer Key Points/review projection concern.
- [`../theoretical-modules/README.md`](../theoretical-modules/README.md) — independent reusable theory registry; raw bodies are loaded lazily.
