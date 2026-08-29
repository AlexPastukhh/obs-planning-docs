# TM-DOMAIN-DISCOVERY — Domain Evidence / Candidate Discovery

Entry Point: `tm.domain.discovery`  
Role: primary optional Target Module

## Purpose

Extract evidence-backed conceptual/identity/lifecycle/rule/consistency candidates from selected Scenario/DATA/Behavior/must-hold meaning before choosing a Domain model.

A valid result may conclude that no separate Domain owner is useful.



## High-Level Example — Self-Contained Walkthrough

### Situation

Scenario planning repeatedly uses concepts such as captured item, source context, accepted/rejected state and later review.

The team suspects that some stable Domain meaning exists, but does not yet know which concepts deserve explicit ownership.

### Why This Module

`TM-DOMAIN-DISCOVERY` asks what conceptual identity, lifecycle, value integrity and invariants genuinely follow from Scenario evidence.

It avoids prematurely declaring nouns to be Entities/Aggregates.

### Walkthrough

Evidence questions:

```text
CaptureItem:
  does one captured unit have stable identity/lifecycle?

SourceContext:
  is it a meaningful value with integrity/equality?

accepted capture:
  what must always be true?

temporary holding:
  genuine Domain concept or only workflow/UI convenience?
```

Possible findings:

```text
CaptureItem
  strong entity candidate

SourceContext
  strong Value Object candidate

durable-success rule
  may be a Domain invariant

temporary holding
  insufficient evidence for a Domain concept
```

Another valid discovery result could be:

```text
no separate Domain owner is currently justified
```

### Result

The output is evidence/candidate space for Domain Draft:

```text
concept candidates
identity/value/state clues
invariant/policy clues
consistency-boundary candidates
rejected weak generalizations
```

### Boundary / Lesson

Domain Discovery does not select persistence tables, APIs or final DDD patterns.

A noun appearing in DATA does not automatically become an Entity.

## Upstream Source Contract

### Direct Semantic Sources
```text
selected Scenario owners
Scenario DATA objects
Behavior Items
local/shared must-hold conditions / invariants / negative guarantees
```

### Inherited Lineage
```text
Fundamental Need
selected real-world solution
Application Definition / Responsibility
```

### Evidence / Current-State Sources
```text
Prototype Evidence when still relevant
existing Domain/current implementation Evidence when reviewing
Application feasibility Evidence when it exposes domain pressure
```

### Constraint / Planning-State Sources
```text
accepted external consistency/integration constraints
accepted architecture Answer Decisions when relevant
SDS-WORKSPACE-EVOLUTION.md when current evolution interpretation is material
```

### Source Discovery Rule

Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

Domain candidates must trace back to Scenario/DATA/Behavior/must-hold meaning rather than nouns/tables/files.

## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Domain Discovery gathers domain-boundary/model evidence and candidate interpretations without forcing a Domain result.
- A no-Domain outcome remains valid when domain ownership adds no useful semantic boundary.
- Discovery candidates/evidence do not become accepted Domain meaning until selected through normal IDTSPE Decisions.

**Referenced Knowledge Owners:**

`NONE`

**Reference Load Policy:**

No additional Knowledge Basis body is required by default; reusable DDD evaluation knowledge remains in the Domain/DDD Lens.

**Operationalization Notes:**

This Knowledge Basis supports planning this recurring Target/result family. It is not a current Target Source, project truth or Decision. Reusable cross-Target evaluation knowledge remains in the Lens owners named by this module's `Lens Profile`; do not duplicate their Operational Evaluation Contract or Knowledge Basis here.

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Primary reusable Lens Pack(s):
- [`LENS-DOMAIN-MODELING-DDD`](../lenses/reusable/LENS-DOMAIN-MODELING-DDD.md) — required while Domain discovery is active

Frequent conditional Lens(es):
- [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) — when the current Workspace Evolution Map may change Domain boundary/coupling decisions; semantic meaning still comes first
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — when a quality/risk property is genuinely part of domain correctness

## Question Set Examples — Non-Exhaustive

Examples only.

```text
Which semantic facts recur across Scenarios?
Which identities/lifecycles/rules are stable enough to name?
Which states/transitions/combinations are allowed/forbidden?
Which rules are invariants vs policies?
Which Value Object candidates have real value semantics?
Which Aggregate/Root boundaries are justified, if any?
Which responsibilities are cross-Aggregate/application coordination?
Is a separate Domain owner useful at all?
```

## Resolution / Production Method

This module uses the existing `Upstream Source Contract`, `Question Set Examples`, `Lens Profile`, Knowledge Basis and any module-specific Idea/branch/pattern aids to produce/refine the declared Result Units. Concrete Questions, Ideas, Q/R/P, Decisions and Evidence remain Core State Units.

Default reusable production path:

```text
read domain Sources/Evidence → interpret boundary-relevant domain signals → discover candidate concepts/relations/state → stress invariants/impossible states/consistency boundaries → mark outside/coordination meaning → keep integrated alternative model sets only when discovery itself benefits from comparing them
```

Because this Target is discovery, an evidence-backed candidate inventory may itself be a Result Unit. Individual competing proposals may simultaneously use Core Idea/Branch State when choice lifecycle matters.

A Lens may surface Finding Candidates while this method runs. Their State/lifecycle/owner destination is resolved by the Core [`Finding Disposition Contract`](../../../idtspe-core/shared/finding-disposition-contract.md); a Lens does not directly mutate accepted Result Units.

## Target Step-Result Contract

**Target Step Result:** `Domain Discovery Result`

The possible result surface is proportional/sparse. Generic IDTSPE State is not duplicated as target-specific fields.

| Result Unit | Meaning | Current projection detail |
|---|---|---|
| `RU-DDISC-01` | Domain Evidence Interpretation / Boundary | Selected Source/Evidence refs + interpreted domain signals + boundary rationale |
| `RU-DDISC-02` | Candidate Semantic Model | Concept/Entity/Value candidates + Relationships + Lifecycle/State candidates |
| `RU-DDISC-03` | Consistency / Invariant Candidates | Invariant/Policy findings + State/Condition Matrix + Impossible-State + Aggregate/Root/Ownership candidates |
| `RU-DDISC-04` | External Coordination / Boundary | Explicit Outside / External Refs + Cross-Boundary Coordination |
| `RU-DDISC-05` | Integrated Domain Variant Set — optional | Integrated Domain Branch / Variant Candidates |

Only applicable/material Result Units are projected for one concrete Target step. Result Unit identity does not imply a separate Target or file.



**Domain Evidence Interpretation / Boundary** — selected Scenario/DATA/Behavior Source/Evidence references plus interpreted domain signals that justify the current Domain boundary. Raw Evidence remains Core State and Sources remain source-owned.

**Concept / Entity / Value Candidates** — candidates with evidence/rationale, not accepted model yet.

**Relationships** — semantic relations worth carrying into Domain Draft.

**Lifecycle / State Candidates** — only meaningful state/lifecycle evidence.

**Invariant / Policy Findings** — distinguish always-true meaning from current/configurable policy.

**State / Condition Matrix — optional** — only when combinations materially change correctness.

**Impossible-State Findings** — invalid combinations revealed by cross-condition reasoning.

**Value Object Candidates** — only when value integrity/equality/operations justify them.

**Aggregate / Root / Ownership Candidates** — consistency-boundary candidates with explicit evidence.

**Explicit Outside / External Refs** — meaning that should not be owned by this Domain boundary.

**Cross-Boundary Coordination** — behavior that belongs to application/orchestration or external coordination.

**Integrated Domain Branch / Variant Candidates — optional** — materially alternative Domain models when needed.

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-DOMDISC-01
CONTENT_KIND: DOMAIN_DISCOVERY_INTERPRETATION
WHEN: candidate concepts/invariants/boundaries materially inform Domain Draft/revalidation
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Domain Discovery Target
REPRESENTATION: EXISTING_OR_NEW_SUPPORTING_PLANNING_ARTIFACT
FILE_OR_ARTIFACT: <domain-discovery-owner>
CONTENT: selected Source/Evidence references + interpreted domain signals; evidence-backed concept/invariant/consistency candidates; boundary rationale; rejected weak abstractions
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-DOMDISC-02
CONTENT_KIND: FUTURE_DOMAIN_IDEA
WHEN: discovery finds speculative future Domain concept
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: UNRESOLVED until later Domain planning
REPRESENTATION: REGISTER_ENTRY
FILE_OR_ARTIFACT: SDS-PLANNING-STATE/ideas/domain/IDEAS.md
CONTENT: unselected future Domain idea with evidence/provenance
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**PREFERRED persistent discovery owner** when candidate concepts/invariants/boundaries materially support Domain Draft or future revalidation; very small discovery can remain in the current planning instance if all accepted findings immediately project into Domain Draft.

**Do not create** one file per noun/pattern candidate during discovery.

Rejected/uncertain future Domain ideas may route to `SDS-PLANNING-STATE/ideas/domain/IDEAS.md`.

When Workspace evolution is material, evaluate future-path implications with WEUC/L5 as the supporting evolution perspective. Domain Discovery surfaces the resulting Finding Candidate / likely-owner context; Core Finding Disposition resolves the actual semantic owner/handoff consequence. This Target Module does not propose `<domain-owner>.evolution.md`; `AG-L5-02` may later propose an Evolution section or companion, with Documentation / Representation + P-14 resolving persistence and embed-vs-split. Discovery does not create a current Domain semantic owner merely to host speculation.

`P-14` must show what discovery Evidence survives and what remains ephemeral.

## Validators

```text
all material candidates trace to Scenario/DATA/Behavior/must-hold Evidence
DDD pattern names were not used as evidence by themselves
invariant vs policy vs workflow/presentation meaning is distinguished
aggregate/ownership candidates include consistency evidence
cross-boundary coordination is not forced into Domain
no-Domain remains a valid answer
```

## Handoff

To `TM-DOMAIN-DRAFT`; `no separate Domain owner` is a valid result.
