# Slice Implementation Requirements Discovery

Status: active Slice-specific question set used with [Common Implementation Requirements Discovery](common.md).

Start from the Slice result/responsibility, realized BI, Domain meaning and real technical/evolution pressure. Material selected production answers become `SI-*`; proof answers become Test Items.

## S1. Semantic command boundary

- Does one entry operation represent one semantic application intent, or are different intents hidden behind a mode/flag?
- If the technical parameter disappeared from the name, would callers naturally use different verbs/results?
- Does the flag change validation, orchestration, state transition, recovery, result semantics or proof expectations?
- Even with one branch, would separate commands materially improve comprehension, thin entry points or independent proof/diagnosis?
- Conversely, is the parameter merely a characteristic of one stable intent and therefore better left in one command?

Relevant pattern: [Semantic Command Interface](../../patterns/common/semantic-command-interface.md). Also inspect [Vertical Slice](../../patterns/slice/vertical-slice.md); the patterns are related but not identical.

## S2. Thin external entry point

- Does transport/UI/URL/controller code only translate input, invoke a semantic application command and map the result?
- Is application orchestration or repeated mode branching leaking into the entry point?

Relevant pattern: [Thin Entry Point](../../patterns/common/thin-entry-point.md).

## S3. Locality / Vertical Slice

- Can the capability be understood, changed and proved locally?
- Would organizing around a meaningful application capability/use case improve locality of behavior, orchestration and proof?
- Is a separate supporting Slice justified by a real capability/result/recovery/composition boundary rather than size alone?

Relevant patterns: [Vertical Slice](../../patterns/slice/vertical-slice.md), [Cohesive Responsibility / Local Reasoning](../../patterns/common/cohesive-responsibility-local-reasoning.md).

## S4. Stable result / error contract

- Can consumers depend on a stable semantic result instead of internal adapter/service representation?
- Does the result allow alternate implementations or later composition without leaking internal mechanics?

Relevant pattern: [Stable Result Contract](../../patterns/common/stable-result-contract.md).

## S5. External interaction and expected variation

- Does external interaction need a stable controllable port because of replaceability, recovery, known alternate implementation or credible proof?
- Is the pressure real enough to justify the abstraction now?

Relevant pattern: [Stable Port / Expected Variation](../../patterns/common/stable-port-expected-variation.md).

## S6. Branching / composition

- Is the same variant/mode causing repeated branching across validation, execution, recovery or result mapping?
- Would semantic commands, strategies, capabilities or composable steps reduce accidental branching while preserving one coherent intent where appropriate?

Relevant pattern: [Composition over Accumulating Branching](../../patterns/common/composition-over-accumulating-branching.md).

## S7. Shared capability pressure

- Is repeated code only textual similarity, or does it represent one reusable semantic responsibility with real consumers/contract?
- Would extraction improve locality/ownership or merely move helpers elsewhere?

Relevant pattern: [Meaningful Capability Extraction](../../patterns/common/meaningful-capability-extraction.md). If real shared ownership appears, route to [Shared Implementation Requirements Discovery](shared-implementation.md) and DOC-UC-04.
