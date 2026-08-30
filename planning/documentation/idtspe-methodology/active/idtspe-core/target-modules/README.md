# Target Module Framework

Status: active generic IDTSPE Core index

A Target Module is a reusable contract for one recurring Target/**Target Step Result** family. The generic model is owned by:

- [`../shared/idtspe-unit-and-target-step-result-model.md`](../shared/idtspe-unit-and-target-step-result-model.md)
- [`../shared/target-module-model.md`](../shared/target-module-model.md)
- [`../shared/knowledge-basis-contract.md`](../shared/knowledge-basis-contract.md) — shared Target Module/Lens Knowledge Basis contract
- [`../shared/target-module-creation-and-integration-use-case.md`](../shared/target-module-creation-and-integration-use-case.md)
- [`../shared/target-module-output-template-and-question-set-rule.md`](../shared/target-module-output-template-and-question-set-rule.md)

## Generic Invariant

Each concrete Target Module supplies, proportionally:

```text
Purpose / recurring Target family
Target form / scope
Upstream Source Contract
Target Step-Result Contract
  Result Units / fields as material
Resolution / Production Method
  question candidates / Idea aids / branch triggers / internal object contracts
Knowledge Basis / theory bridge [when useful]
Lens Profile
Validators / Guards
Handoff / revalidation
Artifact / File Contract / representation guidance
canonical user-level command surface
```

A reusable Target Module may keep a Knowledge Basis when theory/reference knowledge materially helps its work. The Knowledge Basis may be inline or separately represented and can reference theory at any useful granularity; no fixed mode/schema is required. The module does not copy generic Shell state or reusable Lens algorithms/Knowledge Basis merely because a Lens is attached.


## Staged Compatibility

Current installed profile modules may still express their result through `Target-specific output`, `Output Schema` or ordinary output headings. Until the profile conformance pass makes Unit boundaries literal, interpret those headings by meaning as one or more Result Units/fields.

New or materially revised modules should make the Step Result and independently processable Result Units explicit.

## Installed Generic Core Target Modules

IDTSPE Core installs two profile-independent concrete Target Modules:

- [`TM-PRE-UPDATE-PLAN`](TM-PRE-UPDATE-PLAN.md) — optional concrete read-only plan of intended changes before actual mutation; one `RU-PUPDATE-01`.
- [`TM-EXACT-REALIZATION`](TM-EXACT-REALIZATION.md) — produce one exact directly integrable realization; codebase realization is the primary/default archetype, with optional explicitly authorized integration/verification/repair.

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

Current SDS profile installs **12 Target Modules**:

[`../../profiles/sds/target-modules/README.md`](../../profiles/sds/target-modules/README.md)

Other profiles may install different Target Module sets. Their existence must not force Scenario/Domain/Slice semantics into IDTSPE Core.
