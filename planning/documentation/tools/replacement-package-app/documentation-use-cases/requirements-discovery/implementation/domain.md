# Domain Implementation Requirements Discovery

Status: active Domain-specific question set used with [Common Implementation Requirements Discovery](common.md).

Start from BI/invariants and Domain meaning, never from current classes. Material selected production answers become `DI-*`; proof answers become Test Items. Inspect [Domain Pattern Registry entries](../../patterns/REGISTRY.md#domain-focused-patterns) as candidate answers, not mandatory entities.

## D1. Consistency and atomicity boundary

- Which invariants must hold together?
- Which state changes must be atomic/consistent together?
- Does one Aggregate boundary make those rules locally enforceable?
- Would splitting the boundary create coordination that weakens correctness?

Relevant pattern: [Aggregate / Consistency Boundary](../../patterns/domain/aggregate-consistency-boundary.md).

## D2. Identity, value and lifecycle

- Which concepts have stable identity/lifecycle?
- Which are defined only by value?
- Does treating a value as an Entity create accidental lifecycle/identity complexity, or vice versa?

Relevant pattern: [Entity vs Value Object](../../patterns/domain/entity-vs-value-object.md).

## D3. Domain Object extraction

- Does a concept have enough independent semantics, identity/lifecycle, reuse or rule volume to deserve focused Domain ownership?
- Would extraction clarify the Aggregate, or merely mirror a source class?

Relevant pattern: [Domain Object Extraction](../../patterns/domain/domain-object-extraction.md).

## D4. Invariant placement and Domain behavior

- Where can each invariant be enforced coherently?
- Does behavior belong naturally to one Aggregate/Object?
- If behavior belongs naturally to no object, is a Domain Service actually justified?

## D5. Stable Domain identity / persistence boundary / Domain Event

Consider only under real pressure:

- Is stable semantic identity required across persistence/replacement/evolution?
- Does persistence abstraction protect a meaningful Domain contract rather than adding ceremony?
- Is there a meaningful decoupled Domain reaction that warrants an event, rather than using events mechanically?

These are candidate DDD directions, not requirements to create symmetrical entities.
