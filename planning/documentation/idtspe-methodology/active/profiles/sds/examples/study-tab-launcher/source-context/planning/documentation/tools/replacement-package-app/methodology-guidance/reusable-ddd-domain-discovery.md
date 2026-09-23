# Reusable DDD / Domain Object Discovery

Status: recommended reusable implementation-discovery guidance
Common reusable model: [`reusable-guidance-model.md`](reusable-guidance-model.md)
Process authority: [`../documentation-use-cases.md`](../documentation-use-cases.md)
Consumed by: DOC-UC-02, DOC-UC-03 and DOC-UC-14 when Domain concerns are material.

## Purpose

Contain reusable questions, requirement candidates and solution/trade-off guidance for:

- whether behavior belongs in Domain;
- natural Domain Object ownership;
- Aggregate boundaries;
- Entity vs Value Object identity;
- lifecycle and state transitions;
- invariants and consistency;
- semantic operations;
- persistence/repository boundaries where Domain meaning requires them;
- concurrency/atomicity when semantic consistency depends on them;
- failure/result semantics;
- Domain proof;
- known Evolution pressure on Domain boundaries.

It must not contain the current project-specific Domain model.

## Tactical DDD pattern guidance

This guide includes tactical patterns as **questions / reusable Requirements / solution options**,
not as mandatory architecture.

Include at least:

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

For each pattern, guidance should explain:

```text
what problem/context makes it a candidate
what reusable Requirement/goal it may satisfy
how the pattern works semantically
when not to use it
common overuse/misuse
risks / downsides
questions before selecting it
proof implications
Evolution implications
```

Example principle:

```text
Question:
Does this Domain rule require several Domain objects but belong naturally to none of them?

Possible solution:
Domain Service

Risk:
creating a stateless dumping ground for behavior that should belong to an Entity/Value Object.

Alternative:
keep the behavior on the natural Entity/Value Object when ownership is clear.
```

Strategic DDD topics such as:

```text
Bounded Context
Context Map
Anti-Corruption Layer
Published Language
large-scale subdomain decomposition
```

are included only proportionally when the application/problem actually reaches that scale.
They must not become a mandatory checklist for every Domain owner.

Selection of a tactical/strategic DDD pattern that changes code still follows the proposal-first execution rule.


## Discovery groups

### A. Is this Domain meaning?

Questions:

```text
Is this rule meaningful in application/domain language even if UI/Git/HTTP/database mechanics change?
Is it semantic policy/state, or only orchestration/infrastructure?
Who needs to understand this fact to preserve correctness?
Would putting it in Domain make the semantic rule clearer, or only add ceremony?
```

Requirement candidates:

```text
Keep semantic invariant/lifecycle rules with their natural semantic owner.
Keep transport/filesystem/Git/GitHub/browser/UI mechanics outside Domain
unless the external concept itself is part of selected semantic meaning.
Do not create a Domain Object merely to wrap data with no semantic responsibility.
```

Risks:

- anemic Domain caused by moving every rule to application services;
- artificial Domain caused by wrapping technical mechanics in DDD names;
- duplicated rule ownership across application and Domain.

### B. Identity: Entity vs Value Object

Questions:

```text
Does continuity of this exact thing matter while its state changes?
What is its own identity?
Is equality whole-value equality?
Is an ID field merely a reference to another owner?
Is a map/collection key being mistaken for Entity identity?
```

Requirement candidates:

```text
Classify Entity by stable semantic identity/lifecycle,
not by presence of an `id` field.

Classify Value Object by whole semantic value equality,
not by field count.
```

Candidate solutions:

- Aggregate Root Entity;
- child Entity;
- aggregate-local Value Object;
- intentionally shared Value Object;
- no Domain Object.

Each should document useful-when, risks and follow-up questions.

### C. Aggregate / consistency boundary

Questions:

```text
Which facts must be mutually consistent immediately after one semantic operation?
Which invariant must one owner preserve?
What can be eventually consistent?
Which objects are changed together because of real semantic consistency?
What must external callers be forbidden from mutating independently?
```

Requirement candidates:

```text
One Aggregate should define one coherent consistency/lifecycle boundary.
External mutation of aggregate internals should go through the Aggregate's semantic boundary.
Do not enlarge an Aggregate merely to make one transaction convenient.
Do not split a real invariant across independent mutation authorities
without an explicit consistency protocol.
```

Candidate solutions:

- one Aggregate;
- separate Aggregates + application orchestration;
- separate Aggregates + domain event;
- separate owners + reconciliation;
- shared immutable semantic value.

Risks:

- god Aggregate;
- transaction scope too wide;
- hidden cross-Aggregate invariant;
- eventual consistency where immediate consistency was actually required.

### D. Semantic operations and responsibility

Questions:

```text
What semantic operation should the owner expose?
Does the caller ask the Domain to establish a semantic result,
or manipulate fields procedurally?
Does one operation preserve several related invariants?
Does behavior belong to an Entity/Value Object,
or require a Domain Service/policy?
```

Requirement candidates:

```text
Prefer semantic operations over public field/state manipulation.
Keep application orchestration outside the Aggregate
when it coordinates several owners/external capabilities.
Use a Domain Service only when the rule is genuinely Domain behavior
and no single Entity/Value Object naturally owns it.
```

### E. Lifecycle / state machine / partial state

Questions:

```text
What states are semantically meaningful?
Which transitions are valid?
What evidence makes a transition true?
What does retry mean?
Can partial state exist?
Which transitions must be idempotent?
```

Requirement candidates:

```text
Persist facts, not generic progress booleans,
when the fact itself proves the state.

Reject impossible transitions explicitly.

Make retry semantics part of the semantic contract
when retry can follow uncertain effects.
```

Candidate solutions:

- explicit state enum;
- state-specific Value Objects;
- evidence-based state;
- transition methods;
- append-only fact/history where needed.

### F. Failure and result semantics

Questions:

```text
Is failure expected domain/application behavior or programmer/infrastructure failure?
Does the caller need typed failure semantics?
Does failure change durable semantic state?
Is uncertainty a fact that must be represented separately from operation failure?
```

Requirement candidates:

```text
Do not encode operation failure as durable state
unless it is itself a durable semantic fact.

Use explicit result/error semantics where callers must branch on expected outcomes.

Keep programmer/infrastructure exceptions distinct
from selected semantic failure contracts.
```

### G. Persistence and repository boundary

Questions:

```text
What semantic owner is loaded/saved?
What identity is the lookup boundary?
Can persistence expose partial state that violates the semantic owner contract?
Does repository API reflect the owner rather than storage tables/files?
```

Requirement candidates:

```text
Repository contracts should follow semantic ownership
rather than database/file layout.

Persistence should not permit bypassing invariant-preserving ownership.
```

### H. Concurrency / atomicity

Questions:

```text
Can two operations race on the same semantic owner?
What must be serialized?
What invariant could concurrent mutation break?
Is optimistic concurrency enough?
Is a lock an application/technical mechanism or part of semantic policy?
```

Requirement candidates:

```text
Protect real consistency boundaries against concurrent mutation.
Do not describe lock acquisition failure as proof that durable semantic state diverged.
```

Candidate solutions:

- optimistic version;
- compare-and-swap;
- per-owner lock;
- database transaction;
- unique constraint;
- reconciliation.

Each option should list failure modes and proof needs.

### I. Domain proof

Questions:

```text
What exact semantic inputs/state prove the rule?
What negative case demonstrates invariant protection?
Can the rule be tested without UI/network/filesystem mechanics?
Does the test assert behavior/result rather than private method structure?
```

Requirement candidates:

```text
Domain tests should prove semantic rules directly through Domain boundaries.
Test names should describe expected behavior/result.
Proof should remain resilient when private implementation changes
but semantic meaning does not.
```

### J. Evolution fitness

Questions:

```text
Which known Evolution Steps change this identity, invariant, lifecycle or ownership?
Can current design support the known transition by local Expansion/Refactoring?
Would this design force avoidable migration?
Is an abstraction required by known evolution, or only hypothetical reuse?
```

Requirement candidates:

```text
Use known Evolution as design evidence.
Do not implement speculative future behavior.
Do not introduce generic extension seams without a known current/evolution need.
```

---

## Recommended owner-centered Domain implementation layout

The DDD guide should retain a **generalized ready-made owner-centered implementation model**.

Recommended meaning:

```text
Aggregate / Domain owner
→ keep its Root, child Entities, owner-local Value Objects/state/evidence,
  and owner-specific semantic proof locally understandable together

cross-owner semantic Value Objects
→ place in an explicit shared semantic location

Domain errors / exceptions
→ keep separate from any one Aggregate owner when they are genuinely Domain-wide/error-family meaning

shared non-domain support
→ keep separate from semantic Domain owners

owner-specific semantic tests
→ stay adjacent in ownership to the Domain semantics they prove

generic test runner/assertion/fixture support
→ may live in a separate support location

separate production/test source roots when required by the build
→ mirror the same owner-relative semantic structure under both roots
```

Illustrative shape:

```text
domain/
├── errors/
├── shared/
│   ├── valueobjects/
│   └── support/
├── <aggregate-a>/
│   ├── <AggregateRoot>
│   ├── <ChildEntity>
│   ├── <LocalValueObject / state / evidence>
│   └── <owner-specific tests>
├── <aggregate-b>/
│   └── ...
└── testing/
    └── <generic test support only>
```

The names `domain/`, `errors/`, `shared/valueobjects/`, `testing/` and the exact package/source-tree topology are **illustrative**, not a Requirement and not a universal file-layout contract.

The ready-made model is the ownership principle:
- organize owner-local Domain implementation around semantic consistency/ownership boundaries rather than global technical type folders;
- keep intentionally shared semantic values explicit;
- keep Domain-wide errors distinguishable from one Aggregate's local state;
- keep owner-specific semantic proof with its semantic owner;
- avoid a detached global catalog of owner-specific tests;
- preserve the same semantic ownership relationship even when the language/build tool requires a different physical topology.

Use this model by default when it fits and no stronger context-specific layout is selected.

When exact implementation topology is needed:

```text
DOC-UC-18
→ evaluate this recommended model
→ choose exact language/build/package/file structure
→ if a materially different layout is better,
   propose it with ownership/locality/maintenance/proof/complexity consequences
```

Useful alternatives may include:
- a language/framework-required package layout that still mirrors semantic ownership;
- colocated source/test files where the ecosystem supports them naturally;
- separate modules/packages for truly independent Domain owners;
- a flatter layout for a very small Domain where separate folders would add ceremony without improving ownership clarity.

Do **not** use the illustrative tree as a reason to create empty `shared`, `errors`, `testing`, Aggregate, Entity or Value Object folders when the corresponding responsibility does not exist.

---



## Interaction with Slice discovery

DDD guidance is not a mandatory stage before every Slice.

Target interaction:

```text
Slice realization walk
→ reaches semantic state/invariant/lifecycle question
→ consult DDD guidance
→ decide natural Domain owner / no Domain owner
→ optional Aggregate Planning
→ selected owner-local Requirement/proof
→ return to Slice realization
```

A Feature may use zero, one or several Aggregates.

A Domain Object should not be invented merely because the implementation plan has data.

A Slice may coordinate several Domain owners and Shared Capabilities without owning their semantic rules.

---
