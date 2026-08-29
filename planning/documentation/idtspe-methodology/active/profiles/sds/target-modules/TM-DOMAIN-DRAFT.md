# TM-DOMAIN-DRAFT — Select / Review Domain

Entry Point: `tm.domain.draft`  
Role: primary optional Target Module

## Purpose

Select the simplest correct conceptual language/lifecycle/rules/value/ownership boundaries that support current behavior and cheap **justified** evolution.



## High-Level Example — Self-Contained Walkthrough

### Situation

Domain Discovery found strong evidence for:

```text
CaptureItem
SourceContext
durable-success invariant
```

but weak evidence for a large generalized content-management model.

### Why This Module

`TM-DOMAIN-DRAFT` selects the **smallest correct Domain model now**.

Discovery generated candidates; Draft chooses accepted conceptual truth.

### Walkthrough

A selected model might be:

```text
CaptureItem
  Entity / Aggregate Root
  owns one captured unit lifecycle

SourceContext
  Value Object
  preserves source identity/meaning

Invariant:
  accepted CaptureItem must preserve required source context
```

Rejected generalization:

```text
GenericContentAggregate
  rejected because no current Scenario/evidence justifies it
```

Domain Verification Meaning may say:

```text
tests must prove invalid CaptureItem state cannot be accepted
```

without deciding the tests themselves.

### Result

The result is an accepted Domain owner or an explicit no-Domain decision containing:

```text
concepts/terms
relationships
lifecycle/state
Value Objects
Aggregate/consistency boundaries
invariants/policies
outside/external references
Domain Verification Meaning
```

### Boundary / Lesson

Domain does not own Screen flow, persistence mechanism, API shape or Slice implementation.

“DDD best practice” is not sufficient justification for an abstraction.

## Upstream Source Contract

### Direct Semantic Sources
```text
Domain Discovery evidence/candidates
selected Scenarios
Scenario DATA
Behavior Items
local/shared must-hold conditions / invariants / negative guarantees
```

### Inherited Lineage
```text
Fundamental Need / selected real-world solution
Application Definition
```

### Evidence / Current-State Sources
```text
Application feasibility Evidence when useful
existing Domain/implementation Evidence when reviewing
```

### Constraint / Planning-State Sources
```text
accepted architecture Answer Decisions
SDS-WORKSPACE-EVOLUTION.md when current evolution interpretation is material
external consistency/integration constraints
```

### Source Discovery Rule

Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Domain Draft represents selected Domain/no-Domain meaning and its invariants/ownership boundaries after discovery evidence is sufficient.
- Domain semantics must remain independent from realization convenience and implementation layering.
- Target-local future evolution is evaluated by WEUC/L5; this Target may consume accepted/dispositioned local evolution meaning resolved from that evaluation, but does not own companion-proposal mechanics.

**Referenced Knowledge Owners:**

`NONE`

**Reference Load Policy:**

No additional Knowledge Basis body is required by default; reusable DDD/evolution evaluation knowledge remains in the relevant Lenses.

**Operationalization Notes:**

This Knowledge Basis supports planning this recurring Target/result family. It is not a current Target Source, project truth or Decision. Reusable cross-Target evaluation knowledge remains in the Lens owners named by this module's `Lens Profile`; do not duplicate their Operational Evaluation Contract or Knowledge Basis here.

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Primary reusable Lens Pack(s):
- [`LENS-DOMAIN-MODELING-DDD`](../lenses/reusable/LENS-DOMAIN-MODELING-DDD.md) — required for selecting/rejecting the simplest correct Domain model

Frequent conditional Lens(es):
- [`LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`](../lenses/frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md) — when candidate structure may contain avoidable abstractions/entities/steps/test machinery; simplify only after checking global/local evolution constraints
- [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) — for evidence-backed variation/generalization/architecture pressure after semantic correctness
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — when Domain Verification Meaning/provability is material

## Question Set Examples — Non-Exhaustive

Examples only.

```text
Is a separate Domain owner justified?
Which semantic core is current truth?
Which concepts/identities/relationships survive Evidence review?
Which rules are invariants vs policies/mechanisms?
Which Value Object boundaries are justified?
Which Aggregate boundaries select/split/merge/reject?
What stays outside / referenced externally?
Can current Scenarios be represented simply/correctly?
What Domain Verification Meaning should later proof consume?
```

## Candidate Answer Shapes

```text
no separate Domain
one minimal Domain model
several integrated Domain branches/variants
select/split/merge/reject Aggregate candidates
```

These are candidate answer shapes, not mandatory choices.

## Resolution / Production Method

This module uses the existing `Upstream Source Contract`, `Question Set Examples`, `Lens Profile`, Knowledge Basis and any module-specific Idea/branch/pattern aids to produce/refine the declared Result Units. Concrete Questions, Ideas, Q/R/P, Decisions and Evidence remain Core State Units.

Default reusable production path:

```text
select domain boundary/semantic core → resolve state/value/lifecycle structure → distinguish invariants from policy → stress against Scenarios and external coordination → expose verification/traceability meaning
```

Candidate alternatives remain Ideas/Branches until selected; the Step Result carries accepted/current domain meaning.

A Lens may surface Finding Candidates while this method runs. Their State/lifecycle/owner destination is resolved by the Core [`Finding Disposition Contract`](../../../idtspe-core/shared/finding-disposition-contract.md); a Lens does not directly mutate accepted Result Units.

## Target Step-Result Contract

**Target Step Result:** `Domain Draft`

The possible result surface is proportional/sparse. Generic IDTSPE State is not duplicated as target-specific fields.

| Result Unit | Meaning | Current projection detail |
|---|---|---|
| `RU-DDRAFT-01` | Domain Boundary / Stable Semantic Core | Domain ID/Purpose/Boundary + Stable Semantic Core |
| `RU-DDRAFT-02` | State / Value / Lifecycle Model | State/Condition Meaning + Value Objects + Aggregate/Root Boundaries + Lifecycles/States |
| `RU-DDRAFT-03` | Consistency / Rules / Policy Model | Rules/Invariants + Policies/Likely Variation |
| `RU-DDRAFT-04` | External Coordination / Scenario Fit | Outside/External Coordination + Scenario Stress Check + Rejected Premature Generalizations |
| `RU-DDRAFT-05` | Verification / Traceability | Domain Verification Meaning + Traceability |

Only applicable/material Result Units are projected for one concrete Target step. Result Unit identity does not imply a separate Target or file.



**Domain ID / Purpose / Boundary** — what meaning this Domain owns and why.

**Stable Semantic Core** — accepted concepts/terms/relationships.

**State / Condition Meaning** — semantically important states/conditions.

**Value Objects** — accepted value boundaries with integrity/equality rationale.

**Aggregate / Root Boundaries** — accepted consistency/ownership boundaries, if any.

**Lifecycles / States** — accepted lifecycle/state semantics.

**Rules / Invariants** — always-must-hold domain meaning.

**Policies / Likely Variation** — current policy choices separated from invariants.

**Outside / External Coordination** — meaning/process deliberately not owned here.

**Scenario Stress Check** — how current Scenarios/DATA/Behavior fit without distortion.

**Rejected Premature Generalizations** — abstractions/patterns considered and rejected.

**Domain Verification Meaning** — what later proof must establish about domain correctness, without choosing test implementation.

**Traceability** — Source refs to Scenario/DATA/Behavior/must-hold owners.

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-DOM-01
CONTENT_KIND: CURRENT_DOMAIN_OWNER
WHEN: Domain semantic owner is selected and material current meaning should persist
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: selected Domain owner
REPRESENTATION: IMPLEMENTATION_NATIVE_OR_EXISTING_DISCOVERY_SECTION_OR_DEDICATED_ARTIFACT
FILE_OR_ARTIFACT: implementation/types/tests and/or <domain-discovery-owner>#<domain-owner> and/or <domain-owner>
CONTENT: current accepted concepts; identity/lifecycle/state; invariants/policies; relationships; consistency boundary; verification meaning
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```



Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED meaning, not REQUIRED file** — accepted Domain concepts/invariants/consistency boundaries used downstream must be represented durably enough to avoid chat-only truth. The Documentation / Representation Lens may choose implementation-native types/tests plus a `DOMAIN-DISCOVERY.md` section, one dedicated Domain artifact, or a mix. Selecting a logical Domain owner does not itself require `<DomainOwner>.md`.

**PREFERRED only under pressure** — promote one dedicated artifact per independently addressable Domain owner/concept cluster when human-readable owner-level planning is independently useful; never one file per class/name automatically.

**Evolution companion ownership** — this Target Module owns current Domain meaning only. WEUC/L5 may surface future-path Finding Candidate(s); Core Finding Disposition resolves accepted local evolution meaning/owner, after which `AG-L5-02` may propose an Evolution section / `<domain-owner>.evolution.md` supporting representation. Documentation / Representation + P-14 / TF-10 decide embed vs split/materialization.

**Do not place** speculative future state in the current Domain semantic artifact as if already accepted.

`P-14` must map current Domain truth separately from future evolution companions and unresolved placement.

## Domain → Slice Readiness Gate

```text
selected current Domain or explicit no-Domain answer
current Scenario/must-hold meaning checked
material invariants/lifecycles explicit
ownership/consistency boundaries resolved enough for implementation
outside/external coordination visible
Domain Verification Meaning exists when nontrivial
no unsupported speculative abstractions
blocking Q/R/P resolved through generic IDTSPE state
```

## Handoff

Sources for:

```text
TM-SLICE-STRATEGY
TM-IMPLEMENTATION-SLICE
TM-TEST-DESIGN
```

L4/L5/L6 surface Finding Candidates and Decision-relevant observations; they do not create Decisions or Targets directly. Core Finding Disposition resolves State/owner/lifecycle consequences, and independently substantial architecture work may become a Target Formation candidate.

### Evolution Companion — L5/WEUC Handoff

When material future Domain evolution is discovered, apply WEUC/L5 as supporting evaluation. That Lens may surface a future-path Finding Candidate / likely-owner hint; Core Finding Disposition resolves the actual owner/handoff. This Target Module does **not** propose or require an evolution companion.

If `AG-L5-02` justifies durable target-local evolution after Core Finding Disposition has accepted/resolved the local evolution meaning, Documentation / Representation decides whether that accepted meaning needs durable/distinct representation and P-14 resolves an embedded Evolution section versus a separate companion using `../../../idtspe-core/shared/target-evolution-companion-artifact.md`. The Domain Target may consume/reference that accepted/dispositioned local evolution meaning.

Example after L5/P-14 placement:

```text
domain/CaptureItem.md
= current accepted Domain meaning

domain/CaptureItem.evolution.md
= future/planned Domain changes
```

Useful content:

```text
which planned/probable changes may affect this Domain owner
which change directions SHOULD NOT affect it
possible future methods/classes/tests
prepared extension points
architecture/domain transition trigger
```

Example:

```text
new Capture Source
  SHOULD NOT require CaptureItem change

offline capture
  MAY later require:
    [EXTEND] CaptureItem
    [NEW] SyncState
    [NEW] CaptureItemSyncStateTests
```

This companion is future planning, not current Domain truth.


## Methodology Direction / Domain Proof Handoff

For each selected Domain owner, decide whether isolated proof is material **before treating Domain planning as completely handed off to Slice planning**.

```text
Domain owner selected
↓
Domain Verification Meaning
↓
TM-TEST-DESIGN for this Domain owner
  when complex rules/invariants/state transitions need isolated proof
↓
unit-test design by default for isolated complex business/Domain logic
```

`TM-TEST-DESIGN` may therefore run separately for `CaptureItem`, `PricingPolicy`, `EligibilityRule`, etc. before any Slice is fully planned.

For the current selected Domain set, shared `TM-TEST-STRATEGY` should normally wait until material Domain proof responsibilities are planned/not-applicable/explicitly deferred and the Slice portfolio is known.

Next-step resolution follows `../shared/directed-methodology-workflow-and-next-step-resolution.md`.
