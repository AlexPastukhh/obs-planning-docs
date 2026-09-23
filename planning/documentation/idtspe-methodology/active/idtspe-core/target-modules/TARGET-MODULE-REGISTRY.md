# Target Module Registry

Status: active generic IDTSPE Core registry

<a id="target-module-discovery-registry"></a>
## Registry Responsibility

Responsibility ID: `TARGET-MODULE.DISCOVERY`

This file owns **generic Core Target Module discovery/routing metadata** only. It does not define Target Formation, Target Work Unit/Collection/Slot semantics, or the Target Module Meta-Model.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Required Reusable Target Model Check`](../runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md#target-formation-reusable-model-check) — `TARGET-FORMATION.REUSABLE-MODEL-CHECK`
> - `CONTEXTUALIZES` [`Target Module Meta-Model`](TARGET-MODULE-MODEL.md#target-module-meta-model) — `TARGET-MODULE.META-MODEL`

Registry use:

```text
Target Formation determines that REUSABLE_TARGET_MODEL_CHECK is required
→ use current Target purpose/scope/problem + accepted Sources/known Requirements
→ scan this registry / installed family registries at summary level
→ open only plausible Target Module Models
→ each concrete Model applies its own Entry Point / Source prerequisites
→ Target Formation records the zero-or-more compatible applied Model set, or NO_APPLICABLE_TARGET_MODULE
```

A registry scan does not create a Target, Requirement, Unit, Collection or Slot. `NO_APPLICABLE_TARGET_MODULE` is a valid routing outcome. Recheck conditions belong to the Target Formation owner rather than being independently redefined here.

For semantic boundaries within this area, see [`RESPONSIBILITY-MAP.md`](RESPONSIBILITY-MAP.md).

## Installed Generic Core Target Modules

IDTSPE Core installs five profile-independent concrete Target Modules:

- [`TM-PLANNING-RESOLUTION-STATE`](TM-PLANNING-RESOLUTION-STATE.md) — bounded active planning and deliberately retained Decisions in two Collection Units.
- [`TM-REVIEW-FINDINGS`](TM-REVIEW-FINDINGS.md) — optional bounded evidence-backed Finding discovery and diagnosis before candidate correction work; two `RU-RFIND-*` Units.
- [`TM-PROPOSAL-WORKUP`](TM-PROPOSAL-WORKUP.md) — optional bounded candidate-resolution workup and review/handoff when that result is independently useful; canonical Proposals remain Core State at their natural subjects.
- [`TM-PRE-UPDATE-PLAN`](TM-PRE-UPDATE-PLAN.md) — optional concrete reviewable plan of intended changes before actual mutation; one `RU-PUPDATE-01`.
- [`TM-EXACT-REALIZATION`](TM-EXACT-REALIZATION.md) — produce one exact directly integrable realization; codebase realization is the primary/default archetype, with optional transient internal detailed exact planning and explicitly authorized integration/verification/repair.

`TM-PRE-UPDATE-PLAN` is not a mandatory stage before Exact and is not the owner of generic exact-planning depth. Exact may use transient internal planning without instantiating a Pre-Update Target.

Review Findings, Proposal Workup and Pre-Update Plan are distinct optional Target families. A complete review still follows the canonical Finding-to-Proposal handoff; it does not require a separate Target for either family. A Pre-Update Plan is independently formed to propose destination changes, not as a review stage.

This does not introduce Scenario/Domain/Slice semantics into Core. Profiles may hand sufficiently determined semantic/design results to this reusable realization family instead of duplicating code-production modules.

## Generic `idtspe` Invocation Aliases

Canonical semantic identity remains the `TM-*` ID. The generic dispatcher also accepts:

```text
idtspe planning resolution state <scope>
→ TM-PLANNING-RESOLUTION-STATE

idtspe review-findings <scope>
→ TM-REVIEW-FINDINGS

idtspe proposal-workup <scope>
→ TM-PROPOSAL-WORKUP

idtspe pre-update <scope>
→ TM-PRE-UPDATE-PLAN

idtspe exact <scope>
→ TM-EXACT-REALIZATION
```

These are navigation aliases only; repository command IDs are not semantic Target Module identities.

## Installed Target Module Families

### SDS Profile

Current SDS Target Module inventory is owned by the profile registry:

[`../../profiles/sds/registries/TARGET-MODULE-REGISTRY.md`](../../profiles/sds/registries/TARGET-MODULE-REGISTRY.md)

### 2D Visual Production Profile

Current 2D Visual Production Target Module inventory is owned by:

[`../../profiles/visual-production-2d/registries/TARGET-MODULE-REGISTRY.md`](../../profiles/visual-production-2d/registries/TARGET-MODULE-REGISTRY.md)

### Reference Knowledge Profile

Current Reference Knowledge Target Module inventory is owned by:

[`../../profiles/reference-knowledge/registries/TARGET-MODULE-REGISTRY.md`](../../profiles/reference-knowledge/registries/TARGET-MODULE-REGISTRY.md)

Core does not hard-code mutable profile module counts. Installed profiles may expose different Target Module sets; their existence must not force one profile's specialized semantics into Core or another profile.
