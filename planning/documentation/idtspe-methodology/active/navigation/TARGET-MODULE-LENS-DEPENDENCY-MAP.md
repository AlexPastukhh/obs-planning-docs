<a id="idtspe-tm-lens-dependency-map"></a>
# Target Module / Lens Semantic Dependency Map

Status: active cross-Core/profile dependency projection

Responsibility ID: `IDTSPE.TM-LENS-DEPENDENCY-PROJECTION`

> Semantic Owner Dependencies
> - `REPRESENTS` [Semantic Owner Dependency](../../../principles-and-terminology.md#doc-semantic-owner-dependency) — `DOC.SEMANTIC-OWNER-DEPENDENCY`.
> - `CONTEXTUALIZES` [Methodology Responsibility Map](METHODOLOGY-RESPONSIBILITY-MAP.md) — cross-cutting owner routing context.

## Purpose

Project the current declared **Semantic Owner Dependencies** of every active Target Module and Lens across Core and installed profiles so dependency/revalidation impact is visible without turning this map into semantic authority.

```text
ordinary Markdown link
→ navigation/addressability only
→ NOT a dependency edge

Semantic Owner Dependency declared in a TM/Lens owner
→ material semantic dependency
→ dependency-map edge
→ revalidate the consumer when the owner meaning changes materially
```

The concrete component file owns each dependency declaration. This map is a mechanically checked projection and reverse-impact aid only. When the map disagrees with a component owner, the owner declaration wins and the map is repaired.

## Reading Key

- `RESTATES` — repeats owner semantics without independent authority.
- `CONTEXTUALIZES` — applies/explains owner meaning in local component context.
- `EXTENDS` — inherits owner semantics and owns only an explicit local delta.
- `REPRESENTS` — projection/view of owner semantics.
- `MIGRATES` — migration mapping toward current owner semantics.
- `Target component` is populated only when the resolved canonical owner file is itself a current active `TM-*` or `LENS-*` owner.

## Coupling Guard

Direct concrete-component dependencies are exceptional. Prefer the stable shared contract that owns the reusable responsibility when that is the real dependency; use `TM/Lens → TM/Lens` only when the depended-on component is itself the natural semantic owner or a deliberate specialization base.

Current intended topology keeps generic semantics vertical:

```text
every concrete TM   → EXTENDS TARGET-MODULE.META-MODEL
every concrete Lens → EXTENDS LENS.META-MODEL

generic Carry-Forward consumers → RESOLUTION.CARRY-FORWARD contract
Feature temporal/readiness semantics → SDS.SEMANTIC-COMPOSITION-READINESS

direct concrete-component edges
→ Application Definition natural-owner consumers
→ Code Realization specialization of Core Exact Realization
```

Adding a new direct concrete-component edge is a maintenance signal: confirm that the target component really owns the reusable semantics and that a stable shared contract would not be a cleaner dependency surface.

## Direct TM/Lens → TM/Lens Topology

| Consumer | Type | Target component | Responsibility | Canonical owner |
|---|---|---|---|---|
| `LENS-APPLICATION-BOUNDARY-FEASIBILITY` | `CONTEXTUALIZES` | `TM-APPLICATION-DEFINITION` | `SDS.APPLICATION-BENEFIT-BOUNDARY-CONSTRAINTS` | [Application Benefit Responsibility Boundary / Constraints](../profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#sds-application-benefit-boundary-constraints) |
| `TM-CODE-REALIZATION` | `EXTENDS` | `TM-EXACT-REALIZATION` | `TARGET-MODULE.EXACT-REALIZATION` | [Core Exact Realization](../idtspe-core/target-modules/TM-EXACT-REALIZATION.md#tm-exact-realization) |
| `TM-EVOLUTION-STEP` | `CONTEXTUALIZES` | `TM-APPLICATION-DEFINITION` | `SDS.APPLICATION-BENEFIT-BOUNDARY-CONSTRAINTS` | [Application Benefit Boundary / Constraints](../profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#sds-application-benefit-boundary-constraints) |
| `TM-FEATURE` | `CONTEXTUALIZES` | `TM-APPLICATION-DEFINITION` | `SDS.APPLICATION-BENEFIT-BOUNDARY-CONSTRAINTS` | [Application Benefit Boundary / Constraints](../profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#sds-application-benefit-boundary-constraints) |
| `TM-SCENARIO-PLANNING` | `CONTEXTUALIZES` | `TM-APPLICATION-DEFINITION` | `SDS.APPLICATION-BENEFIT-BOUNDARY-CONSTRAINTS` | [Application Benefit Boundary / Constraints](../profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#sds-application-benefit-boundary-constraints) |

## Complete Forward Projection

### Core

#### Target Modules

| Component | Type | Responsibility | Canonical owner | Target component |
|---|---|---|---|---|
| `TM-EXACT-REALIZATION` | `CONTEXTUALIZES` | `RESOLUTION.CARRY-FORWARD` | [Resolution Carry-Forward contract](../idtspe-core/resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) | — |
| `TM-EXACT-REALIZATION` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-EXACT-REALIZATION` | `CONTEXTUALIZES` | `TWU.UNIT-CONTRACT` | [Target Work Unit contract](../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-unit-contract) | — |
| `TM-PLANNING-RESOLUTION-STATE` | `CONTEXTUALIZES` | `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE` | [Decision record retention](../idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-decision-retention) | — |
| `TM-PLANNING-RESOLUTION-STATE` | `CONTEXTUALIZES` | `RESOLUTION.CARRY-FORWARD` | [Resolution Carry-Forward contract](../idtspe-core/resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) | — |
| `TM-PLANNING-RESOLUTION-STATE` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-PRE-UPDATE-PLAN` | `CONTEXTUALIZES` | `RESOLUTION.CARRY-FORWARD` | [Resolution Carry-Forward contract](../idtspe-core/resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) | — |
| `TM-PRE-UPDATE-PLAN` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-PRE-UPDATE-PLAN` | `CONTEXTUALIZES` | `TWU.UNIT-CONTRACT` | [Target Work Unit contract](../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-unit-contract) | — |
| `TM-PROPOSAL-WORKUP` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-PROPOSAL-WORKUP` | `CONTEXTUALIZES` | `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE` | [Proposal / Decision Lifecycle](../idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) | — |
| `TM-PROPOSAL-WORKUP` | `CONTEXTUALIZES` | `RESOLUTION.FINDING-DISPOSITION` | [Finding Disposition](../idtspe-core/resolution/findings/FINDING-DISPOSITION.md#resolution-finding-disposition) | — |
| `TM-PROPOSAL-WORKUP` | `CONTEXTUALIZES` | `RESOLUTION.QRP-LIFECYCLE` | [Q/R/P Lifecycle](../idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md#resolution-qrp-lifecycle) | — |
| `TM-REVIEW-FINDINGS` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-REVIEW-FINDINGS` | `CONTEXTUALIZES` | `REVIEW.STRATEGY-COVERAGE` | [Review Strategy and Coverage](../ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md#review-strategy-coverage) | — |
| `TM-REVIEW-FINDINGS` | `CONTEXTUALIZES` | `AI.REVIEWABILITY` | [AI Reviewability](../ai-reviewability/AI-OUTPUT-REVIEWABILITY.md#review-priority) | — |
| `TM-REVIEW-FINDINGS` | `CONTEXTUALIZES` | `RESOLUTION.FINDING-DISPOSITION` | [Finding Disposition](../idtspe-core/resolution/findings/FINDING-DISPOSITION.md#resolution-finding-disposition) | — |
| `TM-REVIEW-FINDINGS` | `CONTEXTUALIZES` | `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE` | [Proposal / Decision Lifecycle](../idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) | — |

#### Lenses

| Component | Type | Responsibility | Canonical owner | Target component |
|---|---|---|---|---|
| `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY` | `CONTEXTUALIZES` | `RESOLUTION.CARRY-FORWARD` | [Resolution Carry-Forward contract](../idtspe-core/resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) | — |
| `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY` | `CONTEXTUALIZES` | `REPRESENTATION.ARTIFACT-PLACEMENT` | [`Artifact Placement / Persistence`](../idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md#representation-artifact-placement) | — |
| `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY` | `CONTEXTUALIZES` | `REPRESENTATION.ARTIFACT-BOUNDARY-METHOD` | [`Artifact Boundary / File Realization Method`](../idtspe-core/representation/methods/ARTIFACT-BOUNDARY-AND-FILE-REALIZATION.representation-method.md#representation-artifact-boundary-method) | — |
| `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY` | `CONTEXTUALIZES` | `KNOWLEDGE.BASIS` | [`Knowledge Basis Contract`](../idtspe-core/knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md#knowledge-basis-contract) | — |
| `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY` | `CONTEXTUALIZES` | `DOC.MARKDOWN-LINK-NAVIGATION` | [Markdown Link Navigation Rule](../../../principles-and-terminology.md#doc-markdown-link-navigation) | — |
| `LENS-AUTHORITY-SOT-REUSE` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-DEPENDENCY-CHANGE-IMPACT` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-NEED-VALUE-SCOPE` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-PRACTICAL-EVIDENCE` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-PRACTICAL-EVIDENCE` | `CONTEXTUALIZES` | `KNOWLEDGE.BASIS` | [`Knowledge Basis Contract`](../idtspe-core/knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md#knowledge-basis-contract) | — |
| `LENS-PRACTICAL-EVIDENCE` | `CONTEXTUALIZES` | `KNOWLEDGE.PRACTICAL-EVIDENCE` | [`Practical Evidence Knowledge Basis`](../idtspe-core/knowledge-bases/PRACTICAL-EVIDENCE.knowledge-basis.md#knowledge-practical-evidence) | — |
| `LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT` | `CONTEXTUALIZES` | `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE` | [Decision record retention](../idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-decision-retention) | — |
| `LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT` | `CONTEXTUALIZES` | `RESOLUTION.CARRY-FORWARD` | [Resolution Carry-Forward contract](../idtspe-core/resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) | — |
| `LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT` | `CONTEXTUALIZES` | `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE` | [`Proposal / Decision Lifecycle`](../idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) | — |
| `LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT` | `CONTEXTUALIZES` | `RESOLUTION.QRP-LIFECYCLE` | [`Q/R/P Lifecycle`](../idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md#resolution-qrp-lifecycle) | — |
| `LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT` | `CONTEXTUALIZES` | `RESOLUTION.DECISION-REVALIDATION-PROJECTION` | [`Decision Revalidation Projection`](../idtspe-core/resolution/proposal-decision/DECISION-REVALIDATION.resolution-projection.md#resolution-decision-revalidation-projection) | — |
| `LENS-QUALITY-RISK-MATERIALITY` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-TARGET-RESOLUTION-COVERAGE` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-TEST-PROOF-EVIDENCE` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-TEST-PROOF-EVIDENCE` | `CONTEXTUALIZES` | `RESOLUTION.CARRY-FORWARD` | [Resolution Carry-Forward contract](../idtspe-core/resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) | — |
| `LENS-TEST-PROOF-EVIDENCE` | `CONTEXTUALIZES` | `KNOWLEDGE.BASIS` | [`Knowledge Basis Contract`](../idtspe-core/knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md#knowledge-basis-contract) | — |
| `LENS-TEST-PROOF-EVIDENCE` | `CONTEXTUALIZES` | `KNOWLEDGE.TESTING` | [`Testing Knowledge Basis`](../idtspe-core/knowledge-bases/testing/README.md#knowledge-testing-basis) | — |
| `LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-UNIT-CENTRIC-PRESENTATION` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-UNIT-CENTRIC-PRESENTATION` | `CONTEXTUALIZES` | `TWU.UNIT-CONTRACT` | [Target Work Unit](../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-unit-contract) | — |
| `LENS-UNIT-CENTRIC-PRESENTATION` | `CONTEXTUALIZES` | `RESOLUTION.FINDING-DISPOSITION` | [Finding Disposition](../idtspe-core/resolution/findings/FINDING-DISPOSITION.md#resolution-finding-disposition) | — |
| `LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |

### SDS

#### Target Modules

| Component | Type | Responsibility | Canonical owner | Target component |
|---|---|---|---|---|
| `TM-APPLICATION-DEFINITION` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-CODE-REALIZATION` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-CODE-REALIZATION` | `CONTEXTUALIZES` | `SDS.SEMANTIC-COMPOSITION-READINESS` | [SDS Semantic Composition / Readiness](../profiles/sds/profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md#sds-semantic-composition-readiness) | — |
| `TM-CODE-REALIZATION` | `EXTENDS` | `TARGET-MODULE.EXACT-REALIZATION` | [Core Exact Realization](../idtspe-core/target-modules/TM-EXACT-REALIZATION.md#tm-exact-realization) | `TM-EXACT-REALIZATION` |
| `TM-DOMAIN-DISCOVERY` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-DOMAIN-OWNER` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-EVOLUTION-STEP` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-EVOLUTION-STEP` | `CONTEXTUALIZES` | `SDS.APPLICATION-BENEFIT-BOUNDARY-CONSTRAINTS` | [Application Benefit Boundary / Constraints](../profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#sds-application-benefit-boundary-constraints) | `TM-APPLICATION-DEFINITION` |
| `TM-EVOLUTION-STEPS-MAP` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-FEATURE` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-FEATURE` | `CONTEXTUALIZES` | `SDS.APPLICATION-BENEFIT-BOUNDARY-CONSTRAINTS` | [Application Benefit Boundary / Constraints](../profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#sds-application-benefit-boundary-constraints) | `TM-APPLICATION-DEFINITION` |
| `TM-FEATURE` | `CONTEXTUALIZES` | `SDS.SEMANTIC-COMPOSITION-READINESS` | [SDS Semantic Composition / Readiness](../profiles/sds/profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md#sds-semantic-composition-readiness) | — |
| `TM-IMPLEMENTATION-SLICE` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-PRACTICAL-TEST` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-PROTOTYPE` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-SCENARIO-PLANNING` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-SCENARIO-PLANNING` | `CONTEXTUALIZES` | `SDS.APPLICATION-BENEFIT-BOUNDARY-CONSTRAINTS` | [Application Benefit Boundary / Constraints](../profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#sds-application-benefit-boundary-constraints) | `TM-APPLICATION-DEFINITION` |
| `TM-SCREEN` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-SHARED-IMPLEMENTATION-CAPABILITY` | `CONTEXTUALIZES` | `RESOLUTION.CARRY-FORWARD` | [Resolution Carry-Forward contract](../idtspe-core/resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) | — |
| `TM-SHARED-IMPLEMENTATION-CAPABILITY` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-SLICE-OWNER` | `CONTEXTUALIZES` | `RESOLUTION.CARRY-FORWARD` | [Resolution Carry-Forward contract](../idtspe-core/resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) | — |
| `TM-SLICE-OWNER` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |

#### Lenses

| Component | Type | Responsibility | Canonical owner | Target component |
|---|---|---|---|---|
| `LENS-APPLICATION-BOUNDARY-FEASIBILITY` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-APPLICATION-BOUNDARY-FEASIBILITY` | `CONTEXTUALIZES` | `SDS.APPLICATION-BENEFIT-BOUNDARY-CONSTRAINTS` | [Application Benefit Responsibility Boundary / Constraints](../profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#sds-application-benefit-boundary-constraints) | `TM-APPLICATION-DEFINITION` |
| `LENS-DOMAIN-MODELING-DDD` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY` | `CONTEXTUALIZES` | `RESOLUTION.CARRY-FORWARD` | [Resolution Carry-Forward contract](../idtspe-core/resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) | — |
| `LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-SLICE-VERTICALITY-INTEGRATION` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-TERMS-UBIQUITOUS-LANGUAGE` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-UI-SPATIAL-FRONTEND-REALIZATION` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |

### 2D Visual Production

#### Target Modules

| Component | Type | Responsibility | Canonical owner | Target component |
|---|---|---|---|---|
| `TM-2D-10-VISUAL-REQUIREMENTS` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-2D-15-PREPARED-VISUAL-MATERIAL-SET` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-2D-20-WHOLE-VISUAL-DESIGN` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-2D-30-VISUAL-CONSTRUCTION` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-2D-31-EDITABLE-RASTER-CONSTRUCTION` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-2D-31-PAINTERLY-RASTER-CONSTRUCTION` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-2D-31-PIXEL-ART-CONSTRUCTION` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-2D-31-PROCEDURAL-CONSTRUCTION` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-2D-31-VECTOR-CONSTRUCTION` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-2D-50-DELIVERY-ADAPTATION` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |

#### Lenses

| Component | Type | Responsibility | Canonical owner | Target component |
|---|---|---|---|---|
| `LENS-CONSTRUCTION-FIDELITY-CONSISTENCY` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-REPRESENTATION-EDITABILITY-ECONOMY` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-WHOLE-VISUAL-COHERENCE` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |

### Reference Knowledge

#### Target Modules

| Component | Type | Responsibility | Canonical owner | Target component |
|---|---|---|---|---|
| `TM-RK-05-BANK-FORMATION` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-RK-10-ENTRY` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-RK-20-VOCABULARY-EVOLUTION` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |
| `TM-RK-50-LANDSCAPE-ANALYSIS` | `EXTENDS` | `TARGET-MODULE.META-MODEL` | [Target Module Meta-Model](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) | — |

#### Lenses

| Component | Type | Responsibility | Canonical owner | Target component |
|---|---|---|---|---|
| `LENS-RK-ENTRY-IDENTITY-AND-DUPLICATION` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-RK-LANDSCAPE-EVIDENCE-ADEQUACY` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |
| `LENS-RK-TAG-QUALITY-AND-TAXONOMY` | `EXTENDS` | `LENS.META-MODEL` | [Lens Meta-Model](../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) | — |

## Projection Integrity

Integrity/audit owner: [`TARGET-MODULE-LENS-DEPENDENCY-MAP-INTEGRITY.md`](TARGET-MODULE-LENS-DEPENDENCY-MAP-INTEGRITY.md#idtspe-tm-lens-dependency-projection-integrity).

Current projected baseline:

```text
active components: 61
Target Modules: 33
Lenses: 28
declared dependency edges: 101
components with dependencies: 61
components with no declared dependency: 0
direct TM/Lens → TM/Lens edges: 5
```

Re-run integrity whenever a Target Module/Lens is added/retired, a `Semantic Owner Dependency` declaration changes, or an owner path/anchor/Responsibility ID moves.

## Boundaries

Do not:

- infer dependency from an ordinary Markdown link;
- use this map as authority for the depended-on semantics;
- encode Unit→Lens attachment/applicability edges here;
- encode runtime call/order as a semantic dependency unless the component actually declares a Semantic Owner Dependency;
- add a concrete-component edge merely because a component is a convenient navigation point when a reusable contract owns the actual semantics;
- repair a component declaration from this projection without checking the natural owner first.
