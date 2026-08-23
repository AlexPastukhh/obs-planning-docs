# Workspace Architecture Planning Principles And Terminology

Status: active reusable canonical principles/terminology owner
Scope: universal Architecture Lens concepts and invariants for evolving Workspaces. Repeated analysis algorithms live in the sibling workflows.

## Workspace And Architecture Lens

A `Workspace` is an evolving engineered artifact through which a person or agent obtains useful results and which itself must be understood, changed, verified or operated. Examples include codebases, documentation/planning repositories, automation projects, data pipelines and knowledge/workspace systems.

Architecture Planning starts from real Workspace work, not from asking which pattern should be applied.

```text
What results must people/agents obtain from this Workspace?
What must they understand, inspect, change, verify or operate?
What correctness/operational constraints exist?
What changes are actually important or evidence-backed?
What is the least complex architecture justified by that evidence now?
```

A valid Architecture Lens conclusion is: `no additional architectural structure is justified now`.

Canonical Workspace-work / cost semantics live in [`workspace-use-cases-and-change-pressure.md`](workspace-use-cases-and-change-pressure.md). In particular, architecture decisions trade off important Workspace understanding, mutation/evolution, verification/diagnosis/operation and representative Application runtime costs rather than optimizing one structural metric in isolation.

## Progressive Architecture

```text
Architecture should become more complex
only when the Workspace has acquired
a reason to need that complexity.
```

But:

```text
Progressive architecture
≠ always start maximally primitive.

Progressive architecture
= use the least complex structure
  justified by what is already known now.
```

One file → several files, direct dependency → Port, one model → several semantic owners and manual verification → richer verification structure are possible changes, not mandatory maturity stages.

```text
Plan as deeply as the decision requires.
Structure as much as the Workspace requires.
Abstract only where current work or justified change requires it.
Materialize only what benefits from independent ownership/reuse/review.
```

## Architecture Complexity Must Be Paid For

```text
Architecture complexity must be paid for.
```

Material payment may come from:

```text
current required correctness
important Workspace Use Case
Workspace Change Case
material evidence-backed Change Axis
technical / operational Requirement
independent ownership
verification boundary
transaction / failure / security boundary
```

Reverse rule:

```text
No current need
+ no important Workspace-path benefit
+ no justified Change-Axis pressure here
→ prefer the simpler architecture.
```

`here` is essential: an important Change Axis elsewhere does not justify abstraction at a boundary it does not cross.

## Understanding, Discoverability And Working Context

A Workspace is not well-architected only because it is easy to mutate. Important Workspace Use Cases must also be reasonably easy to understand and perform correctly.

- `Discoverability` — how readily the relevant owner, concept, rule or route can be found.
- `Comprehension Cost` — effort required to form a correct mental model for the task.
- `Working-Context Load` — independent meaning, rules, locations, dependencies and exceptions that must be kept simultaneously active to perform a Workspace Use Case correctly.

Material flag:

```text
important Workspace UC
+ many incidental hidden facts must be remembered simultaneously
+ forgetting one causes plausible correctness mistakes
→ architecture pressure
```

Objectively complex Domain meaning may still require significant context. The concern is unnecessary incidental context caused by poor ownership, naming, discoverability or boundaries.

## Abstraction

`Abstraction` is a deliberate reduction of irrelevant detail a consumer must understand to reason or act correctly at a boundary.

```text
Abstraction
≠ interface count
≠ more layers
≠ generic framework
≠ hiding correctness-relevant meaning
```

A useful abstraction reduces Working-Context Load for important Workspace Use Cases while preserving the meaning required for correctness. An abstraction that adds indirection without reducing relevant complexity may increase Architectural Tax.

## Naming And Semantic Vocabulary

Names are navigation and reasoning interfaces.

```text
one important concept
→ one stable canonical term where practical

different concepts
→ do not share one overloaded name when ambiguity harms reasoning

name
→ expose real responsibility at the consumer's abstraction level
→ not pretend to a more generic responsibility than evidence supports
```

A concrete mechanism-specific name can be more accurate than a premature generic name when no real generic semantic boundary exists yet.

## Conditional Architecture Decision Rules

### Semantic DRY

```text
Do not duplicate one semantic authority /
business rule / canonical knowledge.

same-looking code
≠ automatically same concept.
```

Temporary duplication may be cheaper than a wrong shared abstraction plus forced coupling. Share when parts genuinely must change together for the same semantic reason.

### Composition / Inheritance

Composition is the default for combining behavior/variation. Inheritance is justified by a real stable substitutable semantic hierarchy, not by reuse of several methods.

### Interface / Port

```text
External dependency exists
≠ interface required.
```

Consider a Port when material pressure exists: mechanism outside semantic control; plausible replacement/substitution; multiple implementations; a Change Axis crossing the boundary; stable policy needing independence from volatile mechanism; independently meaningful retry/failure/security lifecycle; or verification needs that correspond to a real system boundary.

One concrete implementation + no material volatility + no useful boundary may justify a direct dependency.

### Dependency Direction

```text
volatile mechanism
should generally depend toward stable meaning
more often than stable meaning depends on volatile mechanism.
```

This stability rule is more fundamental than a mandatory Controller→Application→Domain→Repository stack.

### State Ownership

```text
One authoritative place owns current state.
```

Derived/cache/copied state needs explicit freshness, synchronization and reconciliation reasons/contracts.

### Shared / Common

Same utility-looking logic is not automatically one shared semantic responsibility. Shared ownership is justified by one genuinely common responsibility that must remain canonical for several consumers.

### Persistence

```text
database schema ≠ Domain model
ORM convenience ≠ Domain meaning
```

Repository/mapping/adapter boundaries need real pressure such as semantic mismatch, volatility, migrations, verification or meaningful ownership.

### Sync / Async

Prefer direct control flow until latency, throughput, independent lifecycle, failure isolation, concurrency or independent scaling justify an async/event boundary.

### Explicit Composition

Dependencies should be composed explicitly; Domain/application behavior should not secretly instantiate volatile adapters. Explicit composition does not require a DI framework.

### Tests / Seams

```text
testability matters
```

and simultaneously:

```text
test inconvenience alone
≠ automatic interface extraction.
```

A test seam is strongest when it also expresses a real system boundary. Verification meaning should not be made dependent on a mock framework's preferred API shape.

### Reversibility

```text
When two designs are sufficiently good now,
prefer the one that is cheaper to revise later.
```

Reversibility is not generic extensibility everywhere. A direct implementation that can later be extracted may be better than a general extension framework for futures not yet understood.

## Principle → Workspace UC / WEUC Decision Examples

Architecture principles are useful only when they help choose between concrete work paths. When clarifying/refining a principle, try to express at least one representative current Workspace UC or contextual WEUC Instance and a real choice where the principle changes the trade-off. Examples:

```text
Discoverability / Naming
Workspace UC: find where retry policy is owned
Choice: generic helpers scattered by mechanism vs explicit RetryPolicy owner/name/location
Trade-off: extra explicit concept vs lower analytical/read cost

Semantic DRY
WEUC: change one business rule used by client/server
Choice: one semantic authority vs two intentionally independent representations
Trade-off: drift risk vs wrong shared abstraction/coupling

Port / Interface
WEUC: add a second provider
Choice: direct first provider vs stable provider boundary now
Trade-off: preparation/tax now vs later extraction/rework

State Ownership / Cache
Scenario/runtime need: lower read latency
Choice: direct authoritative read vs cache/derived state
Trade-off: latency payoff vs invalidation, verification and mutation complexity

Persistence
WEUC: migrate storage representation
Choice: direct persistence-shaped model vs mapping boundary
Trade-off: current simplicity vs migration/locality/semantic-decoupling payoff

Sync / Async
Scenario need: avoid user blocking
Choice: direct synchronous flow vs asynchronous boundary
Trade-off: latency/throughput/failure isolation vs retries, observability, consistency and operational tax

Tests / Seams
Workspace UC: prove one important failure/no-mutation behavior
Choice: direct integrated proof vs extracted seam
Trade-off: stronger/local proof vs seam complexity that may not express a real system boundary

Reversibility
WEUC: plausible later second implementation
Choice: small direct implementation now vs generalized extension framework
Trade-off: cheap later extraction vs permanent speculative tax
```

These are reasoning examples, not mandatory patterns. A different current Workspace may produce the opposite correct decision.

## Architecture Flags

An `Architecture Flag` is a signal to evaluate a decision explicitly, not a pattern command.

```text
Flag
→ architectural pressure detected
→ evaluate a material Architecture Decision

not

Flag X
→ Pattern Y mandatory
```

Typical flags include semantic consistency pressure, external volatility, poor change locality, poor verification boundaries, transaction/failure/security pressure, Workspace growth/navigation bottlenecks and excessive Working-Context Load.

## Architectural Tax, Payoff And Intent

`Architectural Tax` is additional work, indirection, concepts or maintenance complexity imposed on ordinary Workspace paths by an architectural structure.

Payoff may include correctness, lower change fan-out, better locality, verification isolation, replacement isolation, failure containment or parallel ownership.

A decision is justified when payoff on materially important paths pays its tax.

`Architecture Intent` answers:

```text
Why is this complexity here?
```

Useful classification:

```text
Essential / Intentional Complexity
Accidental Complexity
Speculative Complexity
Legacy Complexity
```

## Architecture Correctness Over Time

Architecture decision correctness is relative to current known goals, Workspace Use Cases, constraints and justified Change Axes.

```text
later need for refactoring
≠ proof that earlier simpler architecture was wrong.
```

An intentionally rejected abstraction may record a `Revisit Trigger` such as a second implementation becoming selected or an axis reaching planned/confirmed evidence.

## WEUC Type Vs Contextual WEUC Instance

A **WEUC Type** is a reusable kind of evolution work (for example add provider / migrate schema / split owner). A **contextual WEUC Instance** is that work against a concrete Workspace area/owner/change surface.

Architecture evidence should prefer contextual instances when judging locality, fan-out, migration/verification friction, Working-Context Load and the broader Work-Cost Model. Evaluate likelihood/horizon/value/confidence, current-work overlap, preparation-now vs deferred cost, reversibility and Architectural Tax when material. Generic future flexibility does not pay architecture complexity by itself.
