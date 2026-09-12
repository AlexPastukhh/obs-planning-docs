# Reusable Programming Principles — Trust / Observability / Quality

Status: active SDS reusable knowledge / theory detail
Role: selectively loaded `RG-PRG-*` guidance; **not a Lens, Target Module, Finding owner or project-truth owner**

Registry and traversal contract: [`../README.md`](../README.md).
Reusable-guidance semantics: [`../../reusable-guidance-model.md`](../../reusable-guidance-model.md).

## Consumption Boundary

Read only the entries selected by the Programming Principles Registry for the current Use-Case/component context. A principle entry supplies reusable questions, trade-offs and candidate patterns. The natural Target/Lens owner performs any operational evaluation and Core Finding/Decision/Requirement mechanics own durable disposition.

<a id="rg-prg-authority-trust-security-authority-trust-boundaries"></a>
## RG-PRG-AUTHORITY-TRUST — Security / authority / trust boundaries

Questions:

```text
What input/state is trusted?
What identity is being authorized?
Can the checked target differ from the used target?
Can mutable configuration change authority after verification?
What is the least privilege needed?
```

Requirement candidates:

```text
Bind authorization/verification to the exact resource/effect later used.
Fail closed when authority cannot be proven for a destructive/external effect.
Avoid TOCTOU between verification and effect when identity matters.
```
<a id="rg-prg-observability-diagnostics-observability-and-diagnostics"></a>
## RG-PRG-OBSERVABILITY-DIAGNOSTICS — Observability and diagnostics

Questions:

```text
Can a failure be diagnosed without exposing secrets?
Do logs identify the semantic operation/work/resource?
Can uncertain external effects be distinguished from confirmed failure?
```

Requirement candidates:

```text
Diagnostics should preserve enough semantic correlation to explain failures.
Do not log secrets or credentials.
Operation result and durable state evidence should remain distinguishable.
```
<a id="rg-prg-testability-refactoring-testability-and-refactoring-resilience"></a>
## RG-PRG-TESTABILITY-REFACTORING — Testability and refactoring resilience

Questions:

```text
Can selected behavior be proven through a stable semantic boundary?
Does a test depend on private call order that is not itself required?
What fake/in-memory boundary is justified?
Does production need a seam because otherwise important behavior cannot be credibly proven?
```

Requirement candidates:

```text
Prefer proof through semantic inputs/results/state/effects.
Introduce a test seam when it corresponds to a real capability/boundary,
not only to mock private internals.
Keep test names behavioral.
```
<a id="rg-prg-performance-capacity-performance-and-capacity"></a>
## RG-PRG-PERFORMANCE-CAPACITY — Performance and capacity

Questions:

```text
Is there a real performance/capacity Requirement?
What Evidence establishes the target?
Is optimization changing semantic clarity or correctness?
```

Requirement candidates:

```text
Make performance constraints explicit and evidence-based when material.
Do not optimize speculative bottlenecks at the cost of correctness/local reasoning.
```

## Provenance

These entries preserve the corresponding R2 `reusable-programming-principles.md` semantic groups. Stable `RG-PRG-*` identities and routing metadata are SDS migration additions; they do not convert reusable guidance into project authority.
