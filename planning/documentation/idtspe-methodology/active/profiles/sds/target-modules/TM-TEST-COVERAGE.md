# TM-TEST-COVERAGE — Actual Test / Evidence Coverage Review

Entry Point: `tm.test.coverage`  
Role: review Target Module

## Purpose

Check whether actual current tests/checks/practical evidence prove current selected meaning.



## High-Level Example — Self-Contained Walkthrough

### Situation

The current capture implementation has these tests:

```text
happy-path capture test
later reread test
UI success-state test
```

The Scenario also owns:

```text
negative guarantee:
  persistence failure must not produce false success
```

### Why This Module

`TM-TEST-COVERAGE` does not design hypothetical tests from scratch.

It asks whether **actual current Evidence** really covers current semantic obligations and whether that Evidence is still fresh/strong.

### Walkthrough

Coverage mapping:

```text
durable happy success
  → covered

later reread
  → covered

persistence failure / no false success
  → no credible Evidence found
```

The module may also detect weak assertion:

```text
test checks HTTP 500
but never checks that no accepted record was created
```

So the real gap is not only “missing test”; it may be “insufficient assertion strength”.

### Result

The output records:

```text
current semantic property
actual Evidence/test
freshness
assertion strength
coverage gap
escape/refactor risk
reopen/fix route
```

### Boundary / Lesson

Coverage review must not weaken the Scenario guarantee merely because existing tests do not prove it.

Tests follow semantic truth, not the reverse.

## Upstream Source Contract

### Direct Semantic Sources
```text
current selected Scenarios / Scenario DATA / Behavior Items
local/shared Requirements / negative guarantees
Domain invariants / Verification Meaning when present
Slice Useful Vertical Result Definitions
Testing Strategy / Test Design when present
```

### Inherited Lineage
```text
Fundamental Need / selected solution through current semantic owners
```

### Evidence / Current-State Sources
```text
actual tests/checks/Practical-Test records
actual execution/freshness/results
runtime/incident Evidence when relevant
```

### Constraint / Planning-State Sources
```text
current review scope / changed Decision/owner
```

### Source Discovery Rule
Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

## Question Set Examples — Non-Exhaustive

Examples only. Current `TF-06 QUESTION_SET` may add/remove/split/merge questions.

```text
Which selected result/Behavior/invariant has actual fresh Evidence?
Where is proof strong, partial, missing, stale, duplicated or at the wrong layer?
Do assertions actually prove the selected property rather than merely execute code?
Are negative/no-mutation guarantees covered?
Did Scenario/DATA/Domain meaning change after the test was written?
Which gap routes back to Test Design vs implementation vs upstream semantic owner?
```

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Primary reusable Lens Pack(s):
- [`LENS-TEST-PROOF-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md) — required for actual Evidence/freshness/assertion/escape review

Frequent conditional Lens(es):
- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) — coverage drift/consumer/refactor surface
- [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) — repeated verification/diagnosis change-path cost
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — actual proof/observability/diagnosis quality

## Target-Specific Output Template

Generic IDTSPE state is not repeated here.

**Semantic Property → Actual Evidence Map** — exact link from current result/Behavior/invariant to executed evidence.  
**Coverage State** — `STRONG | PARTIAL | MISSING | STALE | DUPLICATED | WRONG_LAYER`.  
**Required-Assertion Findings** — missing/weak assertions needed for convincing proof.  
**Negative / No-Mutation Findings** — explicit status for guarantees that absence-of-change matters.  
**Escape / Refactor Risk** — where tests can pass while behavior is wrong or fail on safe refactors.  
**Correction Route** — Test Design, implementation, Practical Test, or semantic owner to reopen.

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-TCOV-01
CONTENT_KIND: TEST_COVERAGE_REVIEW
WHEN: actual Evidence coverage/freshness/gaps are needed for follow-up/revalidation
GUIDANCE: REQUIRED_IF_TARGET_EXISTS
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Test Coverage Target
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_OR_REVIEW_ARTIFACT
FILE_OR_ARTIFACT: <test-coverage-owner>
CONTENT: semantic property -> actual Evidence mapping; freshness; assertion strength; gaps; escape/refactor risk; reopen route
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-TCOV-02
CONTENT_KIND: ACTUAL_EVIDENCE_REFERENCE
WHEN: coverage finding relies on concrete executed test/practical Evidence
GUIDANCE: REQUIRED_REFERENCE
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Evidence remains owned by its test/run artifact
REPRESENTATION: REFERENCE_ONLY
FILE_OR_ARTIFACT: <actual-test-or-evidence-artifact>
CONTENT: reference actual Evidence; do not copy it into coverage review as second authority
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED when used for review/revalidation** — current coverage/freshness/gap findings must persist in a Test Coverage/review owner or stable coverage register until resolved/reconciled.

Actual test files/logs remain Evidence Sources; the coverage artifact references them and does not become product-semantic authority.

**PREFERRED** — avoid duplicating every test detail; persist the semantic property→Evidence mapping, gap, freshness/assertion finding and reopen/fix route.

`P-14` must show coverage owner and any unresolved Evidence/file references.

## Theoretical Testing Reference — Conditional

When the processed Test Module/Lens does not yet answer a materially detailed testing question, the raw snapshot package [`../../../theoretical-modules/testing/README.md`](../../../theoretical-modules/testing/README.md) may be consulted as theory/reference. It does not override this Target Module and is not read mechanically on every invocation.

## Guard

Plan/test filename/historical statement is not actual Evidence; review findings do not become product behavior authority.

## Handoff

Coverage findings route to the narrowest real owner: `TM-TEST-DESIGN`, implementation Slice/realization, `TM-PRACTICAL-TEST`, or an upstream semantic owner when actual Evidence contradicts accepted meaning. Review itself does not become product authority.
