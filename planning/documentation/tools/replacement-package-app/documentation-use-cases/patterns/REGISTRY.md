# Requirements Pattern Registry

Status: active routing index; physical part of the Documentation Use Cases methodology authority.
Scope: known reusable **candidate answers** to recurring Implementation/Proof Requirements Discovery questions.

A Pattern is never automatically an Item. Start from [Requirements Discovery](../requirements-discovery/README.md), inspect relevant Patterns when useful, then select/adapt/reject based on the concrete owner/context. A material selected answer becomes concrete owner-local Item(s).

## Entry metadata

Each Pattern entry routes by:

- **Focus:** implementation | proof | implementation+proof;
- **Applies to:** common | Domain | Slice | Shared Capability | Test Strategy;
- **May produce:** Implementation Item | Test Item | both;
- **Related discovery:** question IDs/links;
- **Related patterns:** useful candidate alternatives/complements.

## Common / implementation + proof

- [Semantic Command Interface](common/semantic-command-interface.md) — Focus: implementation+proof; Applies: Slice/common; May produce: both; Related discovery: I3, I7, S1.
- [Thin Entry Point](common/thin-entry-point.md) — Focus: implementation+proof; Applies: Slice/common; May produce: both; Related: I3, S2.
- [Meaningful Capability Extraction](common/meaningful-capability-extraction.md) — Focus: implementation; Applies: Slice/Shared; May produce: Implementation Item; Related: I3, S7, SH1.
- [Stable Result Contract](common/stable-result-contract.md) — Focus: implementation+proof; Applies: common/Slice/Shared; May produce: both; Related: I3, I4, I7, S4, SH2, T3/T4.
- [Stable Port / Expected Variation](common/stable-port-expected-variation.md) — Focus: implementation+proof; Applies: common/Slice/Shared; May produce: both; Related: I4, I7, S5, SH3, T7.
- [Composition over Accumulating Branching](common/composition-over-accumulating-branching.md) — Focus: implementation; Applies: Slice/common; May produce: Implementation Item; Related: I3, S1, S6.
- [Cohesive Responsibility / Local Reasoning](common/cohesive-responsibility-local-reasoning.md) — Focus: implementation+proof; Applies: common; May produce: both; Related: I3, S3, T8.
- [Evolution-chain-safe Boundary](common/evolution-chain-safe-boundary.md) — Focus: implementation+proof; Applies: common; May produce: both; Related: I4, I5, SH3, T6.

## Domain-focused patterns

- [Aggregate / Consistency Boundary](domain/aggregate-consistency-boundary.md) — Focus: implementation+proof; Applies: Domain; May produce: both; Related: D1.
- [Entity vs Value Object](domain/entity-vs-value-object.md) — Focus: implementation; Applies: Domain; May produce: Implementation Item when a durable realization requirement is non-obvious; Related: D2.
- [Domain Object Extraction](domain/domain-object-extraction.md) — Focus: implementation; Applies: Domain; May produce: Implementation Item; Related: D3.

## Slice-focused patterns

- [Vertical Slice](slice/vertical-slice.md) — Focus: implementation+proof; Applies: Slice; May produce: both; Related: I3, S1, S3; inspect Semantic Command Interface as related but distinct.

## Proof-focused patterns

- [Public/Application Boundary Behavioral Proof](proof/public-application-boundary-proof.md) — Focus: proof; Applies: common; May produce: Test Item; Related: T1, T3, T8.
- [State Transition Proof](proof/state-transition-proof.md) — Focus: proof; Applies: Domain/Slice; May produce: Test Item; Related: T1, T2, T7.
- [No-Mutation / Negative-Space Proof](proof/no-mutation-proof.md) — Focus: proof; Applies: common; May produce: Test Item; Related: T2, T7.
- [Contract Test Suite](proof/contract-test-suite.md) — Focus: proof; Applies: common/Shared; May produce: Test Item; Related: T4, implementation→proof substitutability.
- [Deterministic Failure Injection](proof/deterministic-failure-injection.md) — Focus: implementation+proof; Applies: common; May produce: both; Related: I7, T7.
- [False-Confidence Resistance](proof/false-confidence-resistance.md) — Focus: proof; Applies: common; May produce: Test Item; Related: T2, T3.
- [Refactoring-Resilient Proof](proof/refactoring-resilient-proof.md) — Focus: proof; Applies: common; May produce: Test Item; Related: T4, T5, T8.
- [Evolution-Resilient Proof](proof/evolution-resilient-proof.md) — Focus: proof; Applies: common; May produce: Test Item; Related: T6.

Maintenance: [DOC-UC-14](../maintain-requirements-discovery-pattern-library.md).
