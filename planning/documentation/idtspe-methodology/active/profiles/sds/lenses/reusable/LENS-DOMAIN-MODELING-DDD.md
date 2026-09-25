<a id="lens-domain-modeling-ddd"></a>
# LENS-DOMAIN-MODELING-DDD — Domain Modeling / DDD

Lens ID: `LENS-DOMAIN-MODELING-DDD`

Role: reusable thematic Domain modeling lens

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `LENS.META-MODEL`
> Owner: [Lens Meta-Model](../../../../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model)

## Purpose

Provide the reusable DDD question/requirement/solution corpus for deciding whether meaning belongs in Domain and, when it does, how identity, ownership, lifecycle, consistency, semantic operations, persistence, failure, proof and known evolution should be shaped.

This Lens/Knowledge Basis never contains the current project-specific Domain model and never creates DDD patterns by ceremony.

## Analysis Surface

**Direct Analysis Surface:** current Feature/Slice/Domain Result Units or owner questions involving semantic identity, state, lifecycle, invariant, consistency, operations, failure/result meaning, persistence ownership, concurrency/atomicity, Domain proof or selected Evolution.
**Supporting / Contextual Inputs:** related BR/IR/PFR, accepted Decisions, Evidence, relevant Slice/Shared relations and selected `RG-PRG-*` knowledge entries.
**Context:** active Work Context/Target and natural-owner candidates.

## Applicability & Temporal Triggers

### Base Applicability / Usefulness

A material concern involves semantic identity/equality, state/lifecycle, invariant, consistency, Domain operation/policy, failure/result meaning, semantic ownership of persistence, invariant-related concurrency/atomicity, Domain proof, or known Domain evolution.

### Opening Triggers

The Unit starts with any such semantic concern, current Domain contract, candidate Domain realization, or evolution pressure on Domain meaning.

### During-work Recheck / Invalidation Triggers

Identity/equality, state transition, invariant, consistency boundary/timing, operation/policy, failure/result semantics, semantic ownership, persistence meaning, atomicity/concurrency, Domain proof, or Domain evolution changes.

### Closing Triggers / Revalidation Conditions

The final result establishes/changes Domain semantic contract, Domain classification/boundary/realization, Domain-owned requirement/proof meaning, or Domain evolution impact.

### Confident-False / Stop Conditions

Concern is only UI/transport/filesystem/Git/database/framework orchestration and no selected Domain meaning is implicated.

### False-negative Risks

Persistence/transaction concerns may be prematurely labeled “infrastructure” even when they encode invariants/consistency.

Trigger semantics follow the canonical Lens Model:

```text
TRUE      → APPLY
FALSE     → NOT_APPLICABLE
UNCERTAIN → APPLY
```

A Unit-level `REQUIRED [phase]` attachment bypasses the apply/skip decision at that phase and requires this Lens to cover the current Analysis Surface. These Lens-owned triggers still govern useful earlier application and recheck/invalidation.

## Inputs / Evidence

Current Feature/Slice/Domain meaning; candidate/current Domain owner contract; BR/IR/PFR and accepted Decisions; persistence/concurrency/proof Evidence when semantically relevant; concrete Evolution pressure on Domain meaning.

## Evaluation Contract

Apply only the dimensions material to the current question. The domain-specific questions, methods, facets, checks, examples, and pattern guidance below constitute this Lens's evaluation workflow; they are not mandatory checklist items unless the current Analysis Surface makes them material.

## Supported Operations

```text
ANALYZE   — classify Domain meaning/ownership and candidate DDD shapes
CHECK     — test identity, consistency, lifecycle, boundary and proof coherence
REFINE    — improve a candidate/current Domain shape while preserving owner authority
CHALLENGE — surface a Finding Candidate when current ownership/modeling is materially misleading or inconsistent
```

The Lens may finish with no material Domain issue and no durable Domain owner.

## Tactical / Strategic Pattern Rule

Patterns are candidate solutions, not mandatory architecture. Candidate tactical patterns include:

```text
Aggregate Root
Entity
Value Object
Domain Service
Domain Event
Factory
Specification
Repository
Policy / domain policy
```

For each candidate ask what problem makes it useful, which selected requirement it may satisfy, how it works semantically, when not to use it, common misuse, risks, proof implications and evolution implications.

Strategic topics such as Bounded Context, Context Map, Anti-Corruption Layer, Published Language and large-scale subdomain decomposition are used only when application scale actually warrants them.

## Discovery / Evaluation Groups

### A. Is this Domain meaning?

Questions:
- Is the rule meaningful in application/domain language if UI/HTTP/database mechanics change?
- Is it semantic policy/state or orchestration/infrastructure?
- Who must understand the fact to preserve correctness?
- Would Domain ownership clarify meaning or add ceremony?

Reusable candidates:
- keep semantic invariant/lifecycle rules with their natural semantic owner;
- keep transport/filesystem/Git/GitHub/browser/UI mechanics outside Domain unless the external concept itself is selected semantic meaning;
- do not create a Domain Object merely to wrap data with no semantic responsibility.

Risks: anemic Domain, artificial Domain, duplicated rule ownership.

### B. Identity — Entity vs Value Object

Questions:
- Does continuity of this exact thing matter while state changes?
- What is its own identity?
- Is equality whole-value equality?
- Is an ID field only a reference to another owner?
- Is a collection key being mistaken for Entity identity?

Reusable candidates:
- Entity classification follows stable semantic identity/lifecycle, not merely an `id` field;
- Value Object classification follows whole semantic value equality, not field count.

Candidate shapes: Aggregate Root Entity, child Entity, aggregate-local Value Object, intentionally shared Value Object, or no Domain Object.

### C. Aggregate / consistency boundary

Questions:
- Which facts must be mutually consistent immediately after one semantic operation?
- Which invariant must one owner preserve?
- What may be eventually consistent?
- Which objects change together because of real semantic consistency?
- What must callers be forbidden from mutating independently?

Reusable candidates:
- one Aggregate defines one coherent consistency/lifecycle boundary;
- external mutation of internals goes through invariant-preserving semantic ownership;
- do not enlarge an Aggregate merely to make one transaction convenient;
- do not split a real invariant across independent mutation authorities without an explicit consistency protocol.

Alternatives: one Aggregate; separate Aggregates + orchestration; separate Aggregates + domain event; separate owners + reconciliation; shared immutable semantic value.

### D. Semantic operations / responsibility

Ask whether callers request a semantic result or procedurally manipulate fields; whether one operation preserves several invariants; and whether behavior belongs to Entity/Value Object or genuinely requires Domain Service/policy.

Prefer semantic operations. Keep cross-owner/external orchestration outside the Aggregate. Use Domain Service only for genuine Domain behavior with no natural Entity/Value Object owner.

### E. Lifecycle / state / partial state

Ask:
- which states are semantically meaningful?
- which transitions are valid and what evidence makes them true?
- what does retry mean?
- may partial state exist?
- which transitions must be idempotent?

Prefer facts over generic progress booleans when the fact itself proves state. Reject impossible transitions explicitly. Make retry semantics part of the contract when retry follows uncertain effects.

Candidate shapes: explicit state enum, state-specific Value Objects, evidence-based state, transition methods, append-only fact/history when warranted.

### F. Failure / result semantics

Distinguish expected Domain/application outcomes from programmer/infrastructure failures. Ask whether callers need typed failure semantics, whether failure changes durable semantic state, and whether uncertainty must be represented separately.

Do not encode operation failure as durable state unless it is itself a durable semantic fact. Keep infrastructure/programmer exceptions distinct from selected semantic failure contracts.

### G. Persistence / repository boundary

Ask what semantic owner is loaded/saved, what identity is the lookup boundary, whether persistence can expose invalid partial state, and whether repository API follows semantic ownership rather than storage layout.

Persistence must not bypass invariant-preserving ownership.

### H. Concurrency / atomicity

Ask whether operations race on the same owner, what must serialize, which invariant concurrent mutation could break, and whether optimistic concurrency is sufficient.

Candidate mechanisms include optimistic version, compare-and-swap, per-owner lock, database transaction, unique constraint and reconciliation. Mechanism choice must be justified by the semantic consistency boundary and proof needs.

### I. Domain proof

Ask what exact semantic inputs/state prove the rule, which negative case proves invariant protection, whether proof can avoid UI/network/filesystem mechanics, and whether tests assert behavior/result rather than private structure.

Domain tests should prove semantic rules directly through Domain boundaries and remain resilient under private refactoring when semantic meaning is unchanged.

### J. Evolution fitness

Ask which selected Evolution Steps change identity/invariant/lifecycle/ownership, whether current design reaches them through local Expansion/Refactoring, whether current design forces avoidable migration, and whether an abstraction is required by known change or only hypothetical reuse.

Use known Evolution as evidence. Do not implement speculative future behavior or generic seams without current/selected-future need.

## Recommended Owner-Centered Implementation Shape

Default ownership principle:

```text
Domain owner
→ Root / child Entities / owner-local Value Objects/state/evidence
→ owner-specific semantic proof kept locally understandable

cross-owner semantic Value Objects
→ explicit shared semantic location when genuinely shared

Domain-wide error families
→ separate from one owner's local state when truly Domain-wide

generic test/support mechanics
→ may live separately from semantic owners
```

An illustrative folder tree is never a Requirement. Preserve semantic ownership even when language/build tooling requires another physical topology. Do not create empty folders or DDD types just to mirror a template.

## Interaction With Slice Work

```text
Slice realization
→ semantic state/invariant/lifecycle question
→ apply DDD lens
→ natural Domain owner / no Domain owner
→ optional TM-DOMAIN-DISCOVERY
→ unrealized work: selected discovery/planning meaning → Domain Evolution Impact in TM-EVOLUTION-STEP; durable Domain meaning / IR / proof → Target Domain Body when sufficiently resolved
→ realized current-state review: current TM-DOMAIN-OWNER consequence
→ return to Slice/Step realization
```

A Feature may use zero, one or several Domain owners. A Slice may coordinate several Domain owners and Shared capabilities without owning their semantic rules.

## Findings / Outcomes

Valid invocation outcomes:

```text
APPLIED — no material finding
APPLIED — one or more material Finding Candidates
NOT_APPLICABLE — short confident-FALSE reason when application is not forced at this checkpoint
```

The Lens may produce Findings, alternatives, candidate reusable/local Requirements or Proposal pressure. It does not directly mutate accepted owner results. Selected owner-local requirements are independently approved in the natural owner **state being represented**: current owner for realized truth or the corresponding Evolution Step Target Domain Body for unrealized future state.

## Guards / Boundaries
```text
DDD pattern ≠ mandatory architecture
Domain object ≠ data wrapper
Aggregate ≠ transaction convenience bucket
Repository ≠ storage-table API by default
Domain discovery ≠ durable owner
Lens knowledge ≠ project truth
```

## Reusable Guidance Semantics

This Lens follows [`SDS.REUSABLE-GUIDANCE-MODEL`](../../profile-contracts/reusable-guidance/REUSABLE-GUIDANCE-MODEL.md): reusable questions / `RG-*` / `RR-*` / `RRC-*` / patterns are discovery guidance only; selected owner-local `IR-*` meaning is independently approved in the correct current/future owner state and never live-inherits later reusable-guidance edits.

## Finding Contract

A material DDD finding should state:
- semantic fact/operation/invariant/lifecycle question;
- candidate natural Domain owner or explicit non-Domain disposition;
- affected Feature/Slice/Shared consumer;
- Evidence/rationale;
- likely owner/boundary/IR/proof consequence;
- revalidation signal.

The Lens does not directly create/modify Domain owner authority.

## Non-Normative Navigation — Typical Surfaces

This section is navigation only. It does not create or strengthen Unit attachment; normative predictable attachment belongs beside the natural Unit and registry discovery remains projection-only.

Feature boundary review, Domain Discovery, durable Domain owner, Slice Discovery/owner, Shared classification, Evolution review and Exact planning when Domain semantics affect realization.

## Knowledge Basis

Primary reusable theory bridge:

- [`../../profile-contracts/reusable-guidance/REUSABLE-GUIDANCE-MODEL.md`](../../profile-contracts/reusable-guidance/REUSABLE-GUIDANCE-MODEL.md) for how reusable questions/patterns become candidate guidance rather than live owner authority;
- [`../../../../../../tools/replacement-package-app/methodology-guidance/reusable-ddd-domain-discovery.md`](../../../../../../tools/replacement-package-app/methodology-guidance/reusable-ddd-domain-discovery.md) as the R2 DDD source corpus retained for migration provenance/coverage;
- [`../../knowledge-bases/programming-principles/README.md`](../../knowledge-bases/programming-principles/README.md) for selective drill-down into generic implementation principles that become relevant during Domain reasoning.

This Lens body is the current operational evaluation contract. The R2 source is a knowledge/provenance source and never project truth or a competing runtime owner.

## Artifact / File Implications

`NONE_DIRECT` by default.

If durable Domain responsibility is selected, representation follows the correct temporal host: current Domain owner for realized truth or Evolution Step Target Domain Body for unrealized future state. Selected Domain Discovery Result Content with continuing pre-realization value may be retained by the applicable Step Evolution Impact without becoming Domain authority. Working discovery artifact/resolution remains non-persistent by default. Core Artifact Boundary Lens resolves physical representation.

## Behavior / Language Alignment

Trace material upstream `FBS-*` / `BR-*` realization and apply Terms/Ubiquitous Language. Do not reward generic object/state catalogs disconnected from behavior responsibility.
