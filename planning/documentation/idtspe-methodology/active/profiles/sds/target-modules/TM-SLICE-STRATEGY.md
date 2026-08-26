# TM-SLICE-STRATEGY — Useful Vertical Result Decomposition / Order

Entry Point: `tm.slice.strategy`  
Role: primary optional Target Module  
Target form: implementation decomposition strategy

## Purpose

Choose/review a set and order of `Useful Vertical Result Definitions` when a Scenario/application area is large or uncertain enough that decomposition itself is material.

Explicit Strategy may be skipped when one obvious small vertical result exists.



## High-Level Example — Self-Contained Walkthrough

### Situation

One selected Scenario is too large to deliver safely in one increment:

```text
SCN-CAPTURE:
  preserve selected material,
  source context,
  optional thought,
  and several convenience behaviors
```

The team needs useful delivery increments, not frontend/backend/database phases.

### Why This Module

`TM-SLICE-STRATEGY` is used only because **decomposition/order itself is a material decision**.

If one obvious small vertical result existed, this Target could be skipped.

### Walkthrough

Candidate decomposition:

```text
SL-CAP-01 — INITIAL_VERTICAL
  user can durably save selected material
  and receive truthful success/failure

SL-CAP-02 — EXTENDING_VERTICAL
  captured item also preserves source context
  while all SL-CAP-01 guarantees remain true

SL-CAP-03 — EXTENDING_VERTICAL
  user may add an optional short thought
```

For every candidate, Strategy associates:

```text
one Primary Scenario
Useful Vertical Result
Behavior obligations
DATA obligations
must-hold obligations
Screen obligations when UI
Domain obligations when useful
real dependencies
```

Alternative decomposition:

```text
database first
backend second
frontend third
```

is rejected because those increments are technical layers, not independently useful vertical results.

### Result

The selected Strategy gives one or more `Useful Vertical Result Definitions` and their justified order.

The next selected definition becomes Source for `TM-IMPLEMENTATION-SLICE`.

### Boundary / Lesson

One Scenario may have several Slices.

A normal vertical Slice does not span several unrelated Scenarios merely because implementation code is shared; shared work belongs to Cross-Cutting/shared ownership.

## Upstream Source Contract

### Direct Semantic Sources
```text
Scenario(s) being decomposed
Scenario DATA
Behavior Items
local/shared must-hold conditions / negative guarantees
Screens when UI/spatial meaning matters
selected Domain meaning when present
```

### Inherited Lineage
```text
Fundamental Need
selected real-world solution
Application Definition
```

### Evidence / Current-State Sources
```text
Application feasibility Evidence
Prototype Evidence when relevant
current implementation/workspace state
observed work/change Evidence
SDS-WORKSPACE-EVOLUTION.md when decomposition should account for planned/probable evolution
```

### Constraint / Planning-State Sources
```text
accepted architecture Answer Decisions
Cross-Cutting contracts
delivery/dependency constraints
```

### Source Discovery Rule
Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Slice Strategy is a Target only when vertical decomposition/order itself is a material choice.
- Slices are shaped around Useful Vertical Results rather than horizontal layers.
- Strategy coordinates portfolio/order/dependencies without pre-solving each Slice implementation.

**Referenced Knowledge Owners:**

`NONE`

**Reference Load Policy:**

No additional Knowledge Basis body is required by default; reusable Slice verticality/evolution evaluation knowledge remains in Lenses.

**Operationalization Notes:**

This Knowledge Basis supports planning this recurring Target/result family. It is not a current Target Source, project truth or Decision. Reusable cross-Target evaluation knowledge remains in the Lens owners named by this module's `Lens Profile`; do not duplicate their Operational Evaluation Contract or Knowledge Basis here.

## Question Set Examples — Non-Exhaustive

Examples only.

```text
What is the earliest genuinely useful actor-visible/checkable result?
Which one Primary Scenario does each normal Slice advance?
Can one Scenario be split into several independently useful results?
Is the candidate INITIAL_VERTICAL or EXTENDING_VERTICAL?
If extending, what prior accepted result/baseline is extended?
Which baseline guarantees must remain true?
Which Behavior/DATA/Requirement/Screen obligations belong to each result?
What dependencies truly constrain order?
Which Slice buys the most useful learning/risk reduction?
Where does product priority differ from implementation sequence?
Which work is shared/cross-cutting rather than a fake multi-Scenario vertical Slice?
Does frontend work deserve an independent promoted Frontend Target or only a Part Plan?
```

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Primary reusable Lens Pack(s):
- [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md) — required for useful/checkable decomposition

Frequent conditional Lens(es):
- [`LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`](../lenses/frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md) — when candidate structure may contain avoidable abstractions/entities/steps/test machinery; simplify only after checking global/local evolution constraints
- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) — when dependency/change surface constrains boundaries/order
- [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) — when WEUC/change/architecture tax differentiates decompositions
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — when independently provable/operable boundaries affect decomposition
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — when quality risk constrains sequence

## Idea / Branch Use

Candidate decompositions/orders are normal IDTSPE Ideas.

```text
shallow comparison sufficient
→ compare Ideas in current Target

materially different decompositions imply
different downstream architecture/runtime/delivery networks
→ optional Planning Branches
```

A Planning Branch is not mandatory just because several Slice candidates exist.

## Target-Specific Output Template

Generic IDTSPE state is not repeated here.

### Strategy Context

**Planning Area** — Scenario/application area being decomposed and why explicit Strategy is useful.

**Product / Scenario Priority** — desired value order; not automatically implementation order.

### Candidate Slice Definitions

For each candidate:

```text
Slice ID / label

Slice Role:
  INITIAL_VERTICAL | EXTENDING_VERTICAL

Primary Scenario

Extends — when EXTENDING_VERTICAL:
  prior accepted Slice/result/capability baseline

Useful Vertical Result:
  concise actor/user-facing observable result

Baseline Guarantees To Preserve — when extending

Behavior Obligations
DATA Obligations
Requirement / Invariant Obligations
Screen Obligations — when UI
Domain Obligations — when useful at strategy depth

Dependencies / prerequisites
Learning / risk value
Expected order
```

These obligation sets are the semantic decomposition of the Useful Vertical Result, not independent coverage scores.

Important fields:

- **Slice Role** — initial baseline or extension of an accepted vertical result.
- **Primary Scenario** — exactly one for a normal vertical Slice.
- **Useful Vertical Result** — what usefully/observably becomes true when delivered.
- **Baseline Guarantees** — prior accepted result that an extending Slice must not break.
- **Behavior / DATA / Requirement / Screen / Domain Obligations** — exact selected upstream meaning that this result must realize.
- **Dependencies / prerequisites** — real ordering constraints, not semantic Sources by default.
- **Learning / risk value** — why this Slice/order is useful beyond feature count.


### Shared / Cross-Cutting Targets

List non-vertical shared responsibilities discovered during decomposition and route them to `TM-CROSS-CUTTING-CONCERN` or another real shared owner.

### Frontend Specialized Targets

Frontend planning remains a Part Plan by default. Record a candidate `TM-FRONTEND-SLICE` only when frontend itself has independent Target-Scope/Question/Decision/revalidation depth.

### Selected Decomposition And Order

State selected Useful Vertical Result Definitions plus real dependency/order rationale.

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-SSTRAT-01
CONTENT_KIND: SLICE_STRATEGY
WHEN: decomposition/order itself is material and selected
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Slice Strategy Target
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <slice-strategy-owner>
CONTENT: candidate/selected Useful Vertical Result Definitions; Initial/Extending roles; obligations; dependencies/order rationale
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-SSTRAT-02
CONTENT_KIND: SELECTED_SLICE_DEFINITION
WHEN: one selected result proceeds to implementation planning
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: future Implementation Slice Target
REPRESENTATION: EXISTING_STRATEGY_SECTION_OR_DEDICATED_SLICE_ARTIFACT
FILE_OR_ARTIFACT: <slice-strategy-owner>#<slice> or <slice-owner>
CONTENT: selected Useful Vertical Result Definition is consumed by TM-IMPLEMENTATION-SLICE rather than duplicated as equal owner
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

`SLICE-STRATEGY.md` is the preferred durable coordinator for **which Slices exist, their useful vertical results, order/dependencies and small per-Slice Decisions/QRP**. A selected Slice becomes a logical `TM-IMPLEMENTATION-SLICE` Target without automatically receiving its own file. Promote `SL-<id>.md` only when independent planning/review/addressability is useful.

**REQUIRED** — selected Useful Vertical Result Definitions/order used to form implementation Targets must persist in a Slice Strategy owner or stable Slice-definition register.

**PREFERRED** — keep the decomposition portfolio/order together while candidates are compared; each selected Slice can later receive its own implementation owner through `TM-IMPLEMENTATION-SLICE`.

Shared non-vertical responsibilities route to Cross-Cutting/shared owners rather than being persisted as fake multi-Scenario Slices.

**Optional evolution references** may point from future Slice definitions to `SDS-WORKSPACE-EVOLUTION.md` or local Slice evolution companions.

`P-14` must show which candidate definitions are canonical selected outputs vs transient Ideas/Branches.

## Exit Gate

At least one next implementation Target has a selected Useful Vertical Result Definition precise enough to start detailed implementation planning without inventing product behavior during coding.

## Handoff

Normal directed handoff:

```text
selected Slice portfolio
+ material per-Domain proof designs already planned/not-applicable/deferred
↓
TM-TEST-STRATEGY — when shared/cross-Slice layer coordination is material
↓
TM-IMPLEMENTATION-SLICE per selected Slice
↔ TM-TEST-DESIGN per Slice
```

If shared strategy is not material, selected `Useful Vertical Result Definition` goes directly to `TM-IMPLEMENTATION-SLICE` and local `TM-TEST-DESIGN`.

Shared non-vertical responsibility candidates → `TM-CROSS-CUTTING-CONCERN`; promoted frontend planning candidate → `TM-FRONTEND-SLICE`.
