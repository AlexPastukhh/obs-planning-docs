# Common Implementation Requirements Discovery

Status: active reusable question set.
Authority: physical part of the Documentation Use Cases methodology authority; maintained through [DOC-UC-14](../../maintain-requirements-discovery-pattern-library.md).

Apply only questions that are materially relevant. A question may produce no Item. A **material selected answer** requiring production realization becomes an Implementation Item; an additional proof requirement becomes a Test Item; one answer may produce both. See the [Requirements Discovery derivation rule](../README.md#normative-derivation-rule).

## I1. Required realization

> **How must this owner realize the selected behavior correctly?**

Start from concrete BI/invariants/owner responsibility rather than architecture patterns. Ask what must be true about state transitions, ordering, consistency, atomicity, persistence, recovery, external interaction, result/output contracts, error/uncertainty handling, ownership boundaries or another concrete realization property.

Example: if BI requires exact requested file order, a Slice answer may require resolved editor targets to preserve user-requested order. The BI remains semantic authority; the SI captures the durable realization requirement.

Relevant patterns depend on the answer; do not force a named pattern when a direct requirement is sufficient.

## I2. Required technical qualities

> **What real technical qualities must this realization satisfy?**

Consider only requirements or pressures that actually exist: latency, throughput, memory, storage, concurrency, reliability, durability, startup time, resource limits or another relevant operational property. Do not invent enterprise-scale constraints without evidence.

A concrete selected answer such as “process 100k paths without materializing all file contents” is an Implementation Item even though it is not an architecture pattern.

## I3. Maintainability / cognitive simplicity

> **How should the realization be shaped so it remains easy to understand, navigate, reason about and safely change?**

This is a default realization pressure, unlike latency/memory targets which require real evidence. Ask:

- Is each responsibility coherent and understandable?
- Can correctness be reasoned about locally rather than by holding a large unrelated graph in mind?
- Are application commands/interfaces intuitive and semantic?
- Are several different intents hidden behind one generic operation or mode flag?
- Is one semantic operation scattered across unrelated branches/files?
- Are external entry points thin?
- Is accidental branching accumulating?
- Is a meaningful reusable responsibility duplicated?
- Can a consumer depend on a stable result instead of internal implementation detail?

Relevant patterns: [Semantic Command Interface](../../patterns/common/semantic-command-interface.md), [Thin Entry Point](../../patterns/common/thin-entry-point.md), [Cohesive Responsibility / Local Reasoning](../../patterns/common/cohesive-responsibility-local-reasoning.md), [Meaningful Capability Extraction](../../patterns/common/meaningful-capability-extraction.md), [Stable Result Contract](../../patterns/common/stable-result-contract.md).

## I4. Known evolution-chain fitness

> **Can the current realization pass through the materially known chain of Evolution Steps while each state remains correct, technically adequate and maintainable, without avoidable Forced Migration?**

Do not check only the nearest step:

```text
Current → EVO-1 → EVO-2 → EVO-3
```

At each materially known state check:

- correctness;
- required technical qualities;
- maintainability/local reasoning;
- fitness as a basis for the remaining known evolution.

A design that makes `Current → EVO-1` easy but makes a later already-known step require avoidable structural migration is not evolution-safe merely because the first change is additive.

Relevant patterns: [Evolution-chain-safe Boundary](../../patterns/common/evolution-chain-safe-boundary.md), [Stable Port / Expected Variation](../../patterns/common/stable-port-expected-variation.md), [Stable Result Contract](../../patterns/common/stable-result-contract.md).

## I5. Current simplicity versus future preparation

> **Does preparation for materially known evolution unnecessarily complicate the current realization?**

Prefer current code that is simple, correct and maintainable, with only low-cost seams/ports/boundaries whose current cost is justified by known pressure. Do not implement future behavior or speculative indirection merely to be “future ready”.

Related: [Evolution-chain-safe Boundary](../../patterns/common/evolution-chain-safe-boundary.md).

## I6. Probable natural extension and application boundaries

> **Are natural, probable extensions implied by the application worth a lightweight pressure check even when they are not explicit Evolution Steps? Where are the intentional application boundaries?**

Possible lightweight signals include one item → many items, one implementation → another likely implementation, one consumer → additional consumers, or one semantic command → another closely related intent.

Record a boundary when it materially prevents speculative design, for example “local editor interaction is in scope; remote collaborative workspace semantics are not”. If the boundary intentionally changes later, re-evaluate architecture then. A lightweight possible solution or research direction for a boundary-breaking future may be recorded only when materially useful; do not deeply design/research beyond the boundary without an explicit trigger.

## I7. Testability / observability

> **Does the proposed realization allow its important behavior, failure modes and state transitions to be proven convincingly through appropriate boundaries?**

If not, do not immediately compensate with fragile tests. Reopen [Proof Requirements Discovery](../proof/proof.md) and ask whether production needs a controllable external boundary, stable observable result, state boundary, deterministic dependency seam or semantic command boundary.

Related discovery: [Proof T1](../proof/proof.md#t1-correct-proof), [T7](../proof/proof.md#t7-failure--uncertainty--forbidden-mutation).

Relevant patterns: [Stable Port / Expected Variation](../../patterns/common/stable-port-expected-variation.md), [Stable Result Contract](../../patterns/common/stable-result-contract.md), [Semantic Command Interface](../../patterns/common/semantic-command-interface.md), [Deterministic Failure Injection](../../patterns/proof/deterministic-failure-injection.md).
