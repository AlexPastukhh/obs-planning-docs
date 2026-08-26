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

## Target-Specific Output Template

Generic IDTSPE state is not repeated here.

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

```text
ARTIFACT_PROPOSAL
ID: AP-DOM-02
CONTENT_KIND: DOMAIN_EVOLUTION_COMPANION
WHEN: material planned/probable future Domain change is useful to remember
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Domain owner as base truth; companion owns supporting future plan only
REPRESENTATION: EMBED_CURRENT_OWNER_OR_COMPANION_ARTIFACT
FILE_OR_ARTIFACT: <domain-owner or domain-discovery-owner>#Evolution or <domain-owner>.evolution.md
CONTENT: future [NEW]/[EXTEND]/[REUSE]/[NEW?] paths; change-isolation expectations; transition triggers; tests to add/change
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED meaning, not REQUIRED file** — accepted Domain concepts/invariants/consistency boundaries used downstream must be represented durably enough to avoid chat-only truth. The Documentation / Representation Lens may choose implementation-native types/tests plus a `DOMAIN-DISCOVERY.md` section, one dedicated Domain artifact, or a mix. Selecting a logical Domain owner does not itself require `<DomainOwner>.md`.

**PREFERRED only under pressure** — promote one dedicated artifact per independently addressable Domain owner/concept cluster when human-readable owner-level planning is independently useful; never one file per class/name automatically.

**PREFERRED companion only after split pressure** — keep small future notes in the current Domain/discovery owner first. Create `<domain-owner>.evolution.md` only when future paths/revalidation have an independent lifecycle or reuse/addressability need.

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

L4/L5/L6 findings remain normal Lens findings/Decisions. Open a bounded architecture child Target only when independently material.

### Evolution Companion — Conditional

When the WEUC Lens finds material future Domain evolution, create/update an optional companion using `../../../idtspe-core/shared/target-evolution-companion-artifact.md`.

Example:

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
