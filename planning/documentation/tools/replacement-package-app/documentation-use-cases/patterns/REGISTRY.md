# Requirements Pattern Registry

Status: active routing index; physical part of the Documentation Use Cases methodology authority.
Scope: known reusable **candidate answers** to recurring Implementation/Proof Requirements Discovery questions.

A Pattern is never automatically an Item. Start from [Requirements Discovery](../requirements-discovery/README.md), inspect relevant Patterns when useful, then select/adapt/reject based on the concrete owner/context. A material selected answer becomes concrete owner-local Item(s).

## Entry metadata

Each Pattern entry routes by:

- **Focus:** implementation | proof | implementation+proof;
- **Applies to:** common | Domain | Slice | Shared Capability | Test Strategy;
- **May produce:** Implementation Item | Test Item | both;
- **Related discovery:** exact question IDs/links;
- **Related patterns:** useful candidate alternatives/complements.

## Common / implementation + proof

- [Semantic Command Interface](common/semantic-command-interface.md) — Focus: implementation+proof; Applies: Slice/common; May produce: both; Related discovery: [I3](../requirements-discovery/implementation/common.md#i3-maintainability--cognitive-simplicity), [I7](../requirements-discovery/implementation/common.md#i7-testability--observability), [S1](../requirements-discovery/implementation/slice.md#s1-semantic-command-boundary); Related patterns: [Vertical Slice](slice/vertical-slice.md), [Thin Entry Point](common/thin-entry-point.md), [Composition over Accumulating Branching](common/composition-over-accumulating-branching.md).
- [Thin Entry Point](common/thin-entry-point.md) — Focus: implementation+proof; Applies: Slice/common; May produce: both; Related discovery: [I3](../requirements-discovery/implementation/common.md#i3-maintainability--cognitive-simplicity), [S2](../requirements-discovery/implementation/slice.md#s2-thin-external-entry-point); Related patterns: [Semantic Command Interface](common/semantic-command-interface.md), [Vertical Slice](slice/vertical-slice.md).
- [Meaningful Capability Extraction](common/meaningful-capability-extraction.md) — Focus: implementation; Applies: Slice/Shared; May produce: Implementation Item; Related discovery: [I3](../requirements-discovery/implementation/common.md#i3-maintainability--cognitive-simplicity), [S7](../requirements-discovery/implementation/slice.md#s7-shared-capability-pressure), [SH1](../requirements-discovery/implementation/shared-implementation.md#sh1-real-reusable-responsibility).
- [Stable Result Contract](common/stable-result-contract.md) — Focus: implementation+proof; Applies: common/Slice/Shared; May produce: both; Related discovery: [I3](../requirements-discovery/implementation/common.md#i3-maintainability--cognitive-simplicity), [I4](../requirements-discovery/implementation/common.md#i4-known-evolution-chain-fitness), [I7](../requirements-discovery/implementation/common.md#i7-testability--observability), [S4](../requirements-discovery/implementation/slice.md#s4-stable-result--error-contract), [SH2](../requirements-discovery/implementation/shared-implementation.md#sh2-stable-contract--result), [T3](../requirements-discovery/proof/proof.md#t3-false-confidence--wrong-boundary), [T4](../requirements-discovery/proof/proof.md#t4-false-failures--excessive-coupling); Related patterns: [Contract Test Suite](proof/contract-test-suite.md).
- [Stable Port / Expected Variation](common/stable-port-expected-variation.md) — Focus: implementation+proof; Applies: common/Slice/Shared; May produce: both; Related discovery: [I4](../requirements-discovery/implementation/common.md#i4-known-evolution-chain-fitness), [I7](../requirements-discovery/implementation/common.md#i7-testability--observability), [S5](../requirements-discovery/implementation/slice.md#s5-external-interaction-and-expected-variation), [SH3](../requirements-discovery/implementation/shared-implementation.md#sh3-variation-and-evolution), [T7](../requirements-discovery/proof/proof.md#t7-failure--uncertainty--forbidden-mutation).
- [Composition over Accumulating Branching](common/composition-over-accumulating-branching.md) — Focus: implementation; Applies: Slice/common; May produce: Implementation Item; Related discovery: [I3](../requirements-discovery/implementation/common.md#i3-maintainability--cognitive-simplicity), [S1](../requirements-discovery/implementation/slice.md#s1-semantic-command-boundary), [S6](../requirements-discovery/implementation/slice.md#s6-branching--composition).
- [Cohesive Responsibility / Local Reasoning](common/cohesive-responsibility-local-reasoning.md) — Focus: implementation+proof; Applies: common; May produce: both; Related discovery: [I3](../requirements-discovery/implementation/common.md#i3-maintainability--cognitive-simplicity), [S3](../requirements-discovery/implementation/slice.md#s3-locality--vertical-slice), [T8](../requirements-discovery/proof/proof.md#t8-proof-maintainability).
- [Evolution-chain-safe Boundary](common/evolution-chain-safe-boundary.md) — Focus: implementation+proof; Applies: common; May produce: both; Related discovery: [I4](../requirements-discovery/implementation/common.md#i4-known-evolution-chain-fitness), [I5](../requirements-discovery/implementation/common.md#i5-current-simplicity-versus-future-preparation), [SH3](../requirements-discovery/implementation/shared-implementation.md#sh3-variation-and-evolution), [T6](../requirements-discovery/proof/proof.md#t6-evolution-resilience).

## Domain-focused patterns

- [Aggregate / Consistency Boundary](domain/aggregate-consistency-boundary.md) — Focus: implementation+proof; Applies: Domain; May produce: both; Related discovery: [D1](../requirements-discovery/implementation/domain.md#d1-consistency-and-atomicity-boundary).
- [Entity vs Value Object](domain/entity-vs-value-object.md) — Focus: implementation; Applies: Domain; May produce: Implementation Item when a durable realization requirement is non-obvious; Related discovery: [D2](../requirements-discovery/implementation/domain.md#d2-identity-value-and-lifecycle).
- [Domain Object Extraction](domain/domain-object-extraction.md) — Focus: implementation; Applies: Domain; May produce: Implementation Item; Related discovery: [D3](../requirements-discovery/implementation/domain.md#d3-domain-object-extraction).

## Slice-focused patterns

- [Vertical Slice](slice/vertical-slice.md) — Focus: implementation+proof; Applies: Slice; May produce: both; Related discovery: [I3](../requirements-discovery/implementation/common.md#i3-maintainability--cognitive-simplicity), [S1](../requirements-discovery/implementation/slice.md#s1-semantic-command-boundary), [S3](../requirements-discovery/implementation/slice.md#s3-locality--vertical-slice); Related patterns: [Semantic Command Interface](common/semantic-command-interface.md).

## Proof-focused patterns

- [Public/Application Boundary Behavioral Proof](proof/public-application-boundary-proof.md) — Focus: proof; Applies: common; May produce: Test Item; Related discovery: [T1](../requirements-discovery/proof/proof.md#t1-correct-proof), [T3](../requirements-discovery/proof/proof.md#t3-false-confidence--wrong-boundary), [T8](../requirements-discovery/proof/proof.md#t8-proof-maintainability).
- [State Transition Proof](proof/state-transition-proof.md) — Focus: proof; Applies: Domain/Slice; May produce: Test Item; Related discovery: [T1](../requirements-discovery/proof/proof.md#t1-correct-proof), [T2](../requirements-discovery/proof/proof.md#t2-bug-escape), [T7](../requirements-discovery/proof/proof.md#t7-failure--uncertainty--forbidden-mutation).
- [No-Mutation / Negative-Space Proof](proof/no-mutation-proof.md) — Focus: proof; Applies: common; May produce: Test Item; Related discovery: [T2](../requirements-discovery/proof/proof.md#t2-bug-escape), [T7](../requirements-discovery/proof/proof.md#t7-failure--uncertainty--forbidden-mutation).
- [Contract Test Suite](proof/contract-test-suite.md) — Focus: proof; Applies: common/Shared; May produce: Test Item; Related discovery: [T4](../requirements-discovery/proof/proof.md#t4-false-failures--excessive-coupling); Related patterns: [Stable Result Contract](common/stable-result-contract.md) (implementation→proof substitutability).
- [Deterministic Failure Injection](proof/deterministic-failure-injection.md) — Focus: implementation+proof; Applies: common; May produce: both; Related discovery: [I7](../requirements-discovery/implementation/common.md#i7-testability--observability), [T7](../requirements-discovery/proof/proof.md#t7-failure--uncertainty--forbidden-mutation).
- [False-Confidence Resistance](proof/false-confidence-resistance.md) — Focus: proof; Applies: common; May produce: Test Item; Related discovery: [T2](../requirements-discovery/proof/proof.md#t2-bug-escape), [T3](../requirements-discovery/proof/proof.md#t3-false-confidence--wrong-boundary).
- [Refactoring-Resilient Proof](proof/refactoring-resilient-proof.md) — Focus: proof; Applies: common; May produce: Test Item; Related discovery: [T4](../requirements-discovery/proof/proof.md#t4-false-failures--excessive-coupling), [T5](../requirements-discovery/proof/proof.md#t5-refactoring-resilience), [T8](../requirements-discovery/proof/proof.md#t8-proof-maintainability).
- [Evolution-Resilient Proof](proof/evolution-resilient-proof.md) — Focus: proof; Applies: common; May produce: Test Item; Related discovery: [T6](../requirements-discovery/proof/proof.md#t6-evolution-resilience).

Maintenance: [DOC-UC-14](../maintain-requirements-discovery-pattern-library.md).
