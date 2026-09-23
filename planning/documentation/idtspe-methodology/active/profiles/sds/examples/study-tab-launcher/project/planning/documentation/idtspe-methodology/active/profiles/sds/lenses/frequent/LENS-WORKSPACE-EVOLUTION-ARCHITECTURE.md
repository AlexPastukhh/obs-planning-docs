# LENS-WORKSPACE-EVOLUTION-ARCHITECTURE — Evolution Impact / Change Isolation

Lens ID: `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`

Role: reusable all-Target Evolution lens
Applicability: when any concrete unrealized Evolution Step may materially change a current owner/boundary/realization or future Target Body decision

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `LENS.META-MODEL`
> Owner: [Lens Meta-Model](../../../../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model)

## Purpose

Evaluate whether current realized meaning and/or a concrete future Step route can evolve with coherent, localized change and without avoidable migration or premature implementation of future behavior.

This Lens does not own Evolution plans. `TM-EVOLUTION-STEPS-MAP` routes to `TM-EVOLUTION-STEP`; natural Target owners own their current durable meaning.

## Analysis Surface

**Primary:** current owner/Result choices or Evolution Step Target Bodies whose boundary, realization or compatibility may be affected by concrete unrealized Evolution.
**Conditional:** relevant Evolution Step target states/branches, Steps Map relations, owner/dependency relations, current implementation/Evidence, assumptions and accepted Decisions.
**Context:** active Use Case/Target/profile, current materialized owner state and direct `Entering From` predecessor lineage when relevant.

## Supported Operations

```text
ANALYZE   — trace known Evolution pressure and change locality
CHECK     — test current choice against current materialized/predecessor state, Target-State and migration constraints
REFINE    — improve a current owner/boundary/seam choice without changing semantic authority
CHALLENGE — surface a Finding Candidate when the current choice is materially inconsistent or needlessly migration-prone
```

Registry selection is not execution; confirm this Analysis Surface is material before applying the Lens.

## Inputs

- current Target / Result Unit under review;
- Steps Map registry/routing;
- relevant concrete unrealized Evolution Step target states/branches, with truthful planning position;
- actual current implementation/Evidence when realization pressure matters;
- known owner/dependency boundaries.

## Operational Evaluation Contract

### 1. Lazy relevance scan

```text
current Target concern
→ inspect Steps Map for materially relevant concrete unrealized Steps regardless of selected/candidate/conditional/deferred planning position
→ if none: record no material known-Evolution pressure and stop
→ if relevant: load only those Step target states/branches
```

### 2. Step contract consistency

Evaluate relevant Step relations/readiness **against** [`TM-EVOLUTION-STEP`](../../target-modules/TM-EVOLUTION-STEP.md) rather than defining a second Step contract. Ask whether the represented predecessor lineage, target-state composition, concerns and readiness conclusions are internally coherent and whether projections/maps match their Step authority. If a mismatch is discovered, surface it as a Finding rather than repairing Step semantics inside the Lens.

### 3. Change isolation

Ask:

- which natural owners change in the Step?
- can the transition remain local to those owners plus explicit bindings?
- would current design force unrelated owners to change?
- can Expansion / local Refactoring reach the target coherently?
- is a Forced Migration genuinely necessary or only caused by avoidable current coupling?

### 4. Current-scope discipline

Known/candidate Evolution is planning evidence, not permission to implement future behavior now and not permission to rewrite current owners.

Prefer the simplest current design that preserves a healthy path to selected known change. Reject speculative generic seams unsupported by current or selected Evolution need.

### 5. Natural Subject / Step-wide concern evaluation

Apply the canonical Core [Natural Subject / Ownership Boundary](../../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-natural-subject-ownership) and the concrete [`TM-EVOLUTION-STEP`](../../target-modules/TM-EVOLUTION-STEP.md) Unit Definitions. This Lens evaluates whether current routing is healthy; it does not own the destination ontology.

Operationally ask whether an item is genuinely Step-wide, belongs to one owner-local Target Body/Requirement/concern surface, or is literal Exact/discovery mechanism. When several owner-local concerns are present, challenge Step-wide ownership unless the **cross-owner relation itself** has independent transition meaning.

### 6. Impact disposition

Lens output may be:

```text
KEEP current choice
REFINE owner/boundary/contract
CHALLENGE current choice through Proposal
OPEN — insufficient Evidence
Finding Candidate for another natural owner
```

There is no generic `TM-EVOLUTION-IMPACT`. Step-side future impact/Target Body semantics remain owned by `TM-EVOLUTION-STEP` and natural-owner Target Modules. Current-owner reverse navigation/revalidation follows the shared [Current-Owner Evolution Impact Projection Contract](../../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md). The Lens only evaluates whether those owners/projections are consistent and appropriately isolated.

## Questions

- Which concrete unrealized Steps are actually relevant to this Target, regardless of planning position?
- Which direct `Entering From` predecessor relations are semantically required?
- Do the Step-owned Planning Completeness / Realization Start Readiness conclusions fit the observed target/predecessor state?
- Is any projection/consumer contradicting the Step-owned readiness conclusion?
- Which owner should absorb the change?
- Does the current boundary localize the known transition?
- Would a module/branch/adapter/Shared extraction help for a real known need?
- Is current abstraction supported by current/selected future evidence?
- Does any `Entering From` cycle reveal a bad Step decomposition?

## Guards

```text
known future ≠ current behavior
Evolution Lens ≠ Evolution owner
impact analysis ≠ generic impact artifact requirement
planned Step ≠ realized state
no material relevant Step → stop proportionally
```

## Prepared Seam / Port Check

A seam/port/type-variation boundary may be justified as a **current prepare-now change** by a concrete selected Evolution Step even with one current implementation variant, but that is a separate current Decision from the future Step body itself.

Check:
- which named Step it serves;
- how that Step is expected to use it;
- current complexity/tax;
- whether future change is already cheap without it;
- what remains on the current/simple side.

Reject speculative frameworks with no current/concrete-future consumer.

## Prepare Now vs Defer

Valid conclusions include:
- prepare a narrow seam now;
- reuse an existing seam;
- keep variation local;
- extract/reuse a Shared Capability;
- change Domain/Slice boundary;
- explicitly defer;
- nothing special required.

These are Lens findings until natural owner meaning is selected.

## Resolution Boundary / Implementation Outlook

The Lens does not write the Evolution Step, a generic Impact owner or a second architecture roadmap.

```text
Step / current owner question
→ Lens evaluation
→ Finding / Proposal / Decision when material
→ future consequence → Evolution Step / RU-EVO-02
→ optional Target Owner Body when durable post-Step meaning is sufficiently resolved
→ current prepare-now consequence → current owner only when separately selected and actually realized
```

Current realized meaning stays with the affected current owner. Future impact and any selected retained Domain/Slice discovery Result Content remain Step-owned; exact implementation outlook belongs to Exact or transient working reasoning unless independently selected into an Impact.

## Finding Contract

Material findings should identify:
- relevant Step / future pressure;
- current affected owner(s);
- current Evidence/rationale;
- isolation/migration/seam problem;
- likely natural-owner consequence;
- revalidation signal.

Core Finding Disposition resolves lifecycle/owner consequences.

## Knowledge Basis

Use knowledge selectively; these are theory/guidance dependencies, not current Target Sources or evidence:

- [`../../knowledge-bases/programming-principles/README.md`](../../knowledge-bases/programming-principles/README.md) for trigger-first principle selection rather than loading the whole corpus;
- [`../../knowledge-bases/programming-principles/guidance/design-and-structure.md`](../../knowledge-bases/programming-principles/guidance/design-and-structure.md), especially `RG-PRG-KISS-YAGNI-EVOLUTION`, for prepare-now vs defer pressure;
- [`../../knowledge-bases/programming-principles/guidance/interfaces-boundaries-and-evolution.md`](../../knowledge-bases/programming-principles/guidance/interfaces-boundaries-and-evolution.md), especially compatibility/versioning/migration guidance when transition shape is material;
- [`../../../../../../tools/replacement-package-app/documentation-use-cases/evolution-planning.md`](../../../../../../../../../source-context/planning/documentation/tools/replacement-package-app/documentation-use-cases/evolution-planning.md) as R2 migration provenance/coverage input only, not as current IDTSPE/SDS authority.

The Steps Map, selected Evolution Steps, implementation state and Evidence remain **Target Inputs/Evidence**, not Knowledge Basis.

## Artifact / File Implications

`NONE_DIRECT` by default.

Persist only natural-owner/Step/Decision meaning that independently needs addressability. Do not create a Lens-output evolution document merely because analysis occurred.

## Composition

Compose with dependency/change impact, simplicity/economy, DDD, Vertical Slice, Programming Principles knowledge, IR Discovery and proof/operability Lenses as the current problem requires.
