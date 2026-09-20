# Target Module Framework

Status: active generic IDTSPE Core index

A Target Module is a reusable contract for one recurring Target/**Target Step Result** family. The generic model is owned by:

- [`../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md)
- [`../target-modules/TARGET-MODULE-MODEL.md`](TARGET-MODULE-MODEL.md)
- [`../knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md`](../knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md) — shared Target Module/Lens Knowledge Basis contract
- [`../use-cases/maintain-target-module/UC-IDTSPE-MAINTAIN-TARGET-MODULE.md`](../use-cases/maintain-target-module/UC-IDTSPE-MAINTAIN-TARGET-MODULE.md)
- [`../target-modules/TARGET-MODULE-STEP-RESULT-AND-QUESTION-SET-RULE.md`](TARGET-MODULE-STEP-RESULT-AND-QUESTION-SET-RULE.md)

## Target Module Registry Scan Guide

This registry is consulted **from an applicable Use-Case Process**, normally `UC-IDTSPE-COMPOSE-CURRENT-WORK`, when a bounded Target/result may benefit from a recurring production contract.

```text
current bounded result / Target candidate
→ scan module rows/roles at summary level
→ select zero or more plausible module candidates
→ open the concrete module body only for plausible candidates
→ apply the module Entry Point / trigger / Source prerequisites
→ use one PRIMARY module when it genuinely fits, or a Local Target Contract when none fits
```

A registry scan does not create a Target. Target Formation decides whether a Target is useful; the Module's own Entry Point is the final local applicability gate. `NO_REUSABLE_TARGET_MODULE` is a valid outcome.

Recheck when Target purpose/scope/result family or authoritative upstream Sources change materially, or when a selected profile introduces a more specific module.

## Generic Invariant

Each concrete Target Module supplies, proportionally:

```text
Purpose / recurring Target family
Target form / scope
Upstream Source Contract
Target Step-Result Contract
  complete Module-defined Unit inventory for every formed Target
  per-Unit materiality/disposition rules; optional fields remain proportional
Resolution / Production Method
  question candidates / Proposal aids / branch triggers / internal object contracts
Knowledge Basis / theory bridge [when useful]
Lens Profile
Validators / Guards
Handoff / revalidation
Artifact / File Contract / representation guidance
canonical user-level command surface
```

A reusable Target Module may keep a Knowledge Basis when theory/reference knowledge materially helps its work. The Knowledge Basis may be inline or separately represented and can reference theory at any useful granularity; no fixed mode/schema is required. The module does not copy generic Shell state or reusable Lens algorithms/Knowledge Basis merely because a Lens is attached.


## Unit-Centric Contract Invariant

A concrete Target Module primarily defines reusable **Module Unit Contracts**. Module-wide Source/Knowledge/Lens/Method guidance is shared only when genuinely cross-Unit; Unit-specific guidance belongs with or is referenced by the affected Unit Contract. Runtime Core Resolution State attaches to the smallest correct subject. Target Step Result composition follows the canonical Core Unit/Result model: every Module-defined Unit remains instantiated/addressable with `RESOLVED`, `OPEN` or explicit omission disposition, while Current Result Content exists only for sufficiently resolved Units.

Installed modules may conform through this shared interpretation without duplicating the same guidance text into every Unit section. Materially revised modules should make Unit responsibilities and Unit-specific resolution guidance explicit where that improves usability.

## Staged Compatibility

Current installed profile modules may still express their result through `Target-specific output`, `Output Schema` or ordinary output headings. Until the profile conformance pass makes Unit boundaries literal, interpret those headings by meaning as one or more Result Units/fields.

New or materially revised modules should make the Step Result and independently processable Result Units explicit.

## Installed Generic Core Target Modules

IDTSPE Core installs two profile-independent concrete Target Modules:

- [`TM-PRE-UPDATE-PLAN`](TM-PRE-UPDATE-PLAN.md) — optional concrete reviewable plan of intended changes before actual mutation; one `RU-PUPDATE-01`.
- [`TM-EXACT-REALIZATION`](TM-EXACT-REALIZATION.md) — produce one exact directly integrable realization; codebase realization is the primary/default archetype, with optional transient internal detailed exact planning and explicitly authorized integration/verification/repair.

`TM-PRE-UPDATE-PLAN` is not a mandatory stage before Exact and is not the owner of generic exact-planning depth. Exact may use transient internal planning without instantiating a Pre-Update Target.

This does not introduce Scenario/Domain/Slice semantics into Core. Profiles may hand sufficiently determined semantic/design results to this reusable realization family instead of duplicating code-production modules.


## Generic `idtspe` Invocation Aliases

Canonical semantic identity remains the `TM-*` ID. The generic dispatcher also accepts:

```text
idtspe pre-update <scope>
→ TM-PRE-UPDATE-PLAN

idtspe exact <scope>
→ TM-EXACT-REALIZATION
```

`pre-update` and `exact` are navigation aliases only; repository command IDs are not semantic Target Module identities.

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
