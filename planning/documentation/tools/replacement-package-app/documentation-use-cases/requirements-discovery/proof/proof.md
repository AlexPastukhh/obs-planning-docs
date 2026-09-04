# Proof Requirements Discovery

Status: active reusable proof-requirements question set.
Authority: physical part of the Documentation Use Cases methodology authority; used by DOC-UC-12 and owner-specific implementation UCs.

Proof Requirements Discovery is separate from Implementation Requirements Discovery but explicitly bidirectional. A material selected answer requiring additional proof quality becomes a Test Item; an answer requiring production realization becomes an Implementation Item; one answer may create both. See the [Requirements Discovery derivation rule](../README.md#normative-derivation-rule).

## T1. Correct proof

> **What must be observed or exercised to convincingly prove the BI / invariant / Implementation Item?**

Start from the semantic property, not current code shape. Choose the cheapest credible boundary that proves the property itself.

Relevant patterns: [Public/Application Boundary Behavioral Proof](../../patterns/proof/public-application-boundary-proof.md), [State Transition Proof](../../patterns/proof/state-transition-proof.md).

## T2. Bug escape

> **How could an incorrect implementation still make this proof green? What additional observation/path is needed to prevent that escape?**

Consider persisted-state verification, negative-space/no-mutation proof, invariant observation, stronger contract proof or another path that closes a realistic escape.

Relevant patterns: [No-Mutation / Negative-Space Proof](../../patterns/proof/no-mutation-proof.md), [False-Confidence Resistance](../../patterns/proof/false-confidence-resistance.md).

## T3. False confidence / wrong boundary

> **Is the proof checking the real semantic/public/application property, or merely an internal mechanism such as call order or mock interaction?**

A green internal-interaction test is not automatically convincing evidence of application behavior.

Relevant patterns: [Public/Application Boundary Behavioral Proof](../../patterns/proof/public-application-boundary-proof.md), [False-Confidence Resistance](../../patterns/proof/false-confidence-resistance.md).

## T4. False failures / excessive coupling

> **Could a behaviorally correct implementation break the test merely because internal structure changed?**

Prefer proof of stable observable contracts when internal call structure is not itself the requirement.

Relevant patterns: [Refactoring-Resilient Proof](../../patterns/proof/refactoring-resilient-proof.md), [Contract Test Suite](../../patterns/proof/contract-test-suite.md).

## T5. Refactoring resilience

> **Should this proof remain valid through behavior-preserving refactoring? If yes, what must it avoid coupling to?**

A Test Item may require resilience to internal reorganization while semantic meaning stays unchanged.

Relevant pattern: [Refactoring-Resilient Proof](../../patterns/proof/refactoring-resilient-proof.md).

## T6. Evolution resilience

> **How should this proof behave through materially known Evolution Steps?**

Classify whether important proof should remain unchanged, extend, be supplemented or legitimately change because semantics changed. Also check whether proof structure remains maintainable through the known evolution chain.

Related discovery: [Implementation I4](../implementation/common.md#i4-known-evolution-chain-fitness), [I5](../implementation/common.md#i5-current-simplicity-versus-future-preparation).

Relevant pattern: [Evolution-Resilient Proof](../../patterns/proof/evolution-resilient-proof.md).

## T7. Failure / uncertainty / forbidden mutation

> **How can failure, recovery, uncertainty and forbidden mutation be exercised deterministically and proven convincingly?**

This question especially often exposes Implementation Requirements. Example: deterministic external timeout may require a controllable production port **and** a Test Item requiring deterministic injection + resulting-state observation. Those coupled Items belong in one Item Group.

Related discovery: [Implementation I7](../implementation/common.md#i7-testability--observability), [Slice S5](../implementation/slice.md#s5-external-interaction-and-expected-variation).

Relevant patterns: [Deterministic Failure Injection](../../patterns/proof/deterministic-failure-injection.md), [No-Mutation / Negative-Space Proof](../../patterns/proof/no-mutation-proof.md), [Stable Port / Expected Variation](../../patterns/common/stable-port-expected-variation.md).

## T8. Proof maintainability

> **Can the proof be understood and changed locally, or does every application change require rewriting a large unrelated test graph?**

Inspect fixture complexity, excessive mocking, shared-setup coupling, duplicated semantic proof, unnecessary internal knowledge and clarity of failure diagnosis.

Relevant patterns: [Refactoring-Resilient Proof](../../patterns/proof/refactoring-resilient-proof.md), [Public/Application Boundary Behavioral Proof](../../patterns/proof/public-application-boundary-proof.md).

## T9. Proof strategy placement

> **At which proof boundary is this property best demonstrated?**

Possible levels include Domain, Slice/application, Shared Capability, integration, E2E and Practical Acceptance. If the selected answer is cross-owner policy rather than local proof, route it to Test Strategy instead of copying it into every implementation owner.

## Cross-channel rule

When convincing proof is difficult because of poor production boundaries, hidden side effects, nondeterminism, unobservable state, hard-coded external interaction, excessive coupling or an over-generic application interface, first ask whether production realization should change. A production change becomes an Implementation Item only when materially selected; testability does not automatically justify abstraction.

Conversely, implementation choices may create proof obligations: e.g. multiple implementations behind one stable contract may require one shared behavioral contract suite Test Item. Group coupled implementation/proof Items when they belong to the same selected decision.
