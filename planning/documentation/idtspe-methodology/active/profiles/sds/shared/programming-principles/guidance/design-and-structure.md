# Reusable Programming Principles — Design / Structure

Status: active SDS reusable knowledge / theory detail
Role: selectively loaded `RG-PRG-*` guidance; **not a Lens, Target Module, Finding owner or project-truth owner**

Registry and traversal contract: [`../README.md`](../README.md).
Reusable-guidance semantics: [`../../reusable-guidance-model.md`](../../reusable-guidance-model.md).

## Consumption Boundary

Read only the entries selected by the Programming Principles Registry for the current Use-Case/component context. A principle entry supplies reusable questions, trade-offs and candidate patterns. The natural Target/Lens owner performs any operational evaluation and Core Finding/Decision/Requirement mechanics own durable disposition.

<a id="rg-prg-complexity-essential-vs-accidental-complexity-complexity-delta"></a>
## RG-PRG-COMPLEXITY — Essential vs accidental complexity / Complexity delta

Current IDTSPE proposal/review guidance may require a material **Complexity delta** assessment when competing implementation choices differ meaningfully.
This entry preserves the reusable implementation reasoning used for that assessment; it does not create a mandatory assessment when complexity differences are immaterial.

Relevant dimensions include, when material:

```text
semantic concepts / states / rules
owners / capabilities / boundaries
classes / interfaces / adapters / patterns
state / lifecycle / retry / recovery
coupling / change locality
maintenance burden
proof burden
operational failure/diagnostic burden
migration cost
known Evolution consequence
cognitive load
```

Questions:

```text
What persistent complexity is introduced?
What persistent complexity is removed?
What new entity/boundary must be maintained?
Does added structure reduce coupling or duplicated knowledge?
Does a smaller immediate diff create a larger long-term maintenance surface?
Which cost is one-time migration cost and which is permanent?
How does the option affect known Evolution locality?
What context must a maintainer understand afterward?
```

Do not equate fewer classes/interfaces/lines with lower total system complexity.
A solution may add explicit structure while reducing total complexity.

When real options trade different complexity dimensions, compare them against the current situation's decision priorities rather than applying one universal score.
<a id="rg-prg-semantic-contracts-semantic-clarity-and-explicit-contracts"></a>
## RG-PRG-SEMANTIC-CONTRACTS — Semantic clarity and explicit contracts

Questions:

```text
Can a reader understand semantic responsibility from names/public contracts?
Are important states/results/failures explicit?
Is a boolean/string/map hiding a meaningful semantic type?
Does the API permit invalid or ambiguous combinations?
```

Requirement candidates:

```text
Prefer semantic names/types/contracts for behavior that affects correctness.
Make invalid states difficult to represent where doing so materially improves correctness.
Do not introduce wrapper types with no semantic value merely for ceremony.
```

Risks:

- primitive obsession;
- type explosion;
- generic result/state bags;
- semantic meaning hidden in comments.
<a id="rg-prg-cohesion-responsibility-cohesion-separation-of-concerns-single-responsibility"></a>
## RG-PRG-COHESION-RESPONSIBILITY — Cohesion / Separation of Concerns / Single Responsibility

Questions:

```text
What reason does this unit have to change?
Are unrelated policies/mechanics owned together?
Does extracting this responsibility make local reasoning clearer?
Is the proposed split semantic, or only a technical-layer split?
```

Requirement candidates:

```text
Keep closely related behavior/state/proof reasoning together.
Separate responsibilities that evolve for materially different reasons.
Do not fragment cohesive behavior into tiny units merely to satisfy a rule mechanically.
```
<a id="rg-prg-dependency-direction-coupling-and-dependency-direction"></a>
## RG-PRG-DEPENDENCY-DIRECTION — Coupling and dependency direction

Questions:

```text
What must this unit know about collaborators?
Is it coupled to concrete incidental mechanics or a semantic capability?
Would a collaborator change force unrelated consumer changes?
Where is dependency inversion actually useful?
```

Requirement candidates:

```text
Depend on stable semantic contracts where substitution, proof or evolution needs a seam.
Avoid interfaces/abstractions without a real alternate, boundary or testing/evolution reason.
```
<a id="rg-prg-encapsulation-encapsulation-information-hiding"></a>
## RG-PRG-ENCAPSULATION — Encapsulation / information hiding

Questions:

```text
Can callers bypass invariant-preserving behavior?
Is internal representation leaking into consumers?
Does the caller need this detail to make a semantic decision?
```

Requirement candidates:

```text
Hide representation details that callers do not need.
Expose semantic operations/results rather than mutable internal state where correctness benefits.
```
<a id="rg-prg-dry-abstraction-dry-vs-duplication-vs-premature-abstraction"></a>
## RG-PRG-DRY-ABSTRACTION — DRY vs duplication vs premature abstraction

Questions:

```text
Is duplicated code the same semantic responsibility or only superficially similar?
Will these copies evolve together?
Would abstraction introduce branching/configuration that makes local behavior harder?
```

Requirement candidates:

```text
Remove duplication when one coherent responsibility is genuinely shared.
Prefer temporary duplication over a wrong abstraction
when shared meaning is not established.
```

Candidate options:

- keep duplication temporarily;
- extract helper;
- extract Shared Capability;
- parameterize;
- strategy/policy abstraction.

Each option should record risks/downsides.
<a id="rg-prg-kiss-yagni-evolution-kiss-yagni-known-evolution"></a>
## RG-PRG-KISS-YAGNI-EVOLUTION — KISS / YAGNI / known Evolution

Questions:

```text
Is this mechanism required by current behavior or known Evolution?
What simpler solution satisfies the selected Requirement?
Are we implementing hypothetical future flexibility?
Would the simplest design create a known near-term Forced Migration?
```

Requirement candidates:

```text
Prefer the simplest design that satisfies current selected behavior
and known Evolution pressure.

Do not implement speculative extension points for unknown futures.
```
<a id="rg-prg-composition-extension-composition-vs-inheritance-extension-shape"></a>
## RG-PRG-COMPOSITION-EXTENSION — Composition vs inheritance / extension shape

Questions:

```text
Is variation genuine “is-a” semantic substitutability or merely code reuse?
Can composition/local policy express the difference more explicitly?
Would inheritance make behavior depend on fragile superclass internals?
```

Requirement candidate:

```text
Prefer composition for variation/reuse
unless inheritance represents a genuine stable substitutable semantic relationship.
```

## Provenance

These entries preserve the corresponding R2 `reusable-programming-principles.md` semantic groups. Stable `RG-PRG-*` identities and routing metadata are SDS migration additions; they do not convert reusable guidance into project authority.
