# TM-TEST-DESIGN — Behavior-To-Test Proof Design

Entry Point: `tm.test.design`  
Role: primary/supporting proof Target Module  
Repository provenance: `UC-PLAN-TEST-DESIGN`, test-design workflow/template.

## Purpose
Decide how selected Scenario/Behavior/Requirement/Domain/Slice meaning will be convincingly proved.



## High-Level Example — Self-Contained Walkthrough

### Situation

A Slice already promises:

```text
Useful Vertical Result:
  selected material becomes durably saved
  and success feedback is truthful

Negative guarantee:
  persistence failure never produces false success
```

Now the team needs concrete proof design.

### Why This Module

`TM-TEST-DESIGN` translates semantic properties into credible setup/action/observation/assertion plans.

It does not create another “thing that should be true”; the Useful Vertical Result and upstream guarantees already define that.

### Walkthrough

Possible proof design:

```text
Happy case:
  setup valid material
  perform capture
  assert durable record exists
  assert success result is returned

Failure case:
  inject persistence failure
  assert no accepted durable record exists
  assert failure result is returned
  assert success is not shown

Recovery/read case:
  reload later
  assert required captured DATA is recoverable
```

The Test Lens chooses the cheapest credible layer:

```text
pure unit test
integration test
end-to-end test
practical operated test
```

based on what the property actually requires observing.

### Result

The module produces traceable proof designs:

```text
upstream property
outcome proved
test layer/operator
setup/action/observation
required assertions
escape risk
refactor risk
planned Evidence
```

### Boundary / Lesson

A test name is not Evidence until executed.

Tests do not become semantic authority for Scenario/Domain behavior.

## Upstream Source Contract

### Direct Semantic Sources
```text
Scenario Acceptance / observable outcomes
Behavior Items
Scenario DATA relevant to setup/action/observation
Requirements / negative guarantees
Domain invariants / Domain Verification Meaning when present
Slice Useful Vertical Result Definition / implemented boundary when planning Slice proof
```

### Inherited Lineage
```text
Need / selected real-world solution / Application Definition through Scenario lineage
```

### Evidence / Current-State Sources
```text
existing tests / known failures / prior test Evidence when reviewing or extending
```

### Constraint / Planning-State Sources
```text
selected Testing Strategy when present
test-layer/environment/tool constraints
```

### Source Discovery Rule
This is the expected source archetype, not a closed whitelist. `TF-04 SOURCE_SET` may add another real authoritative/evidentiary/constraining Source when the current Target actually depends on it.

## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `HYBRID`

**Embedded Principles / Rules / Theory:**

- Test Design maps selected semantic behavior/properties to credible proof responsibilities before or alongside implementation.
- Proof layer is selected by what can actually prove the property, not by a mandatory taxonomy.
- Test design remains downstream of semantic truth and does not redefine Scenario/Domain/Slice meaning.

**Referenced Knowledge Owners:**

- [`testing/README.md`](../../../theoretical-modules/testing/README.md)

**Reference Load Policy:**

Read raw Testing theory only when processed Test Module/Lens guidance is insufficient for a materially detailed test-design question. Do not read it mechanically.

**Operationalization Notes:**

This Knowledge Basis supports planning this recurring Target/result family. It is not a current Target Source, project truth or Decision. Reusable cross-Target evaluation knowledge remains in the Lens owners named by this module's `Lens Profile`; do not duplicate their Operational Evaluation Contract or Knowledge Basis here.

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Primary reusable Lens Pack(s):
- [`LENS-TEST-PROOF-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md) — required

Additional reusable Lens Pack(s):
- [`LENS-PRACTICAL-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-PRACTICAL-EVIDENCE.md) — when operated/practical Evidence is the credible proof route

Frequent conditional Lens(es):
- [`LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`](../lenses/frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md) — when candidate structure may contain avoidable abstractions/entities/steps/test machinery; simplify only after checking global/local evolution constraints
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — proof/observation/diagnosis/operation perspective
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — when the property is a material quality/risk dimension


## Methodology Invocation Positions

`TM-TEST-DESIGN` is intentionally reusable at more than one point in the directed graph.

### Domain Proof Position

```text
TM-DOMAIN-DRAFT / one Domain owner
→ TM-TEST-DESIGN / same semantic owner reference
```

Use when isolated Domain/business rules/invariants need proof before Slice planning. Unit tests are the default for complex deterministic isolated logic.

### Slice Proof Position — Standard

```text
TM-IMPLEMENTATION-SLICE
→ stable Useful Vertical Result + obligations + implementation boundary
→ TM-TEST-DESIGN
```

Integration tests are the default for Slice orchestration/cross-owner collaboration.

### Slice Proof Position — TDD

```text
TM-IMPLEMENTATION-SLICE
  stabilize Useful Vertical Result + semantic obligations
→ TM-TEST-DESIGN
→ repeat same Slice Target in REFINE mode
  to complete/refine call-level implementation planning
```

TDD changes timing, not authority: tests still derive from accepted Scenario/Domain/Slice semantics.

## Default Layer Heuristic

When no stronger property-specific reason overrides it, apply the Testing Strategy / Test Lens default:

```text
Slice orchestration / multi-owner vertical behavior
→ integration test

isolated complex Domain/business rule or deterministic algorithm
→ unit test
```

Example:

```text
CaptureItem validation/state rule
→ unit tests over rule cases

CaptureController
→ CaptureApplicationService
→ CaptureItem
→ CaptureRepository
→ integration test for the Slice collaboration/result
```

The integration test need not duplicate every isolated rule case. It should prove that real collaborators are wired correctly and that material success/failure behavior crosses the relevant boundaries correctly.

Use E2E only when the whole-system/external boundary itself is part of the property being proved; use Practical Test when operated/human evidence is required.

## Question Set Examples — Non-Exhaustive

Examples only.

```text
What observable outcome must be proved?
What negative/no-mutation guarantee matters?
Is this an isolated rule that should normally be unit-tested?
Is this Slice orchestration/cross-owner collaboration that should normally be integration-tested?
What cheapest credible layer can actually prove it?
What setup/action/observation is needed?
What concrete assertions are required?
What Escape Risk exists?
What Refactor Risk exists?
What should explicitly NOT be tested here?
Would Practical Acceptance prove this property better?
```

## Target-Specific Output Template
Generic IDTSPE state is not repeated here.

**Behavior-to-Test Trace** — selected semantic property mapped to a credible proof design:
```text
Behavior / invariant / acceptance
Outcome proved
Test layer / operator
Setup / action / observation
Required assertions
Escape risk
Refactor risk
Planned / actual Evidence state
```

Field guidance:

- **Behavior / invariant / acceptance** — exact upstream semantic property; reference the real owner.
- **Outcome proved** — what fact the Evidence must establish, including negative/no-mutation meaning.
- **Test layer / operator** — cheapest credible automated or practical layer able to observe the property; default to integration for Slice orchestration/cross-owner collaboration and unit for isolated complex business/Domain logic unless the property requires another layer.
- **Setup / action / observation** — semantic test arrangement, not implementation trivia.
- **Required assertions** — concrete observations without which the proof is weak.
- **Escape risk** — how the test could pass while the property is broken.
- **Refactor risk** — how the test could fail after a harmless implementation refactor.
- **Evidence state** — planned vs actually executed/fresh Evidence kept explicit.


## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-TDES-01
CONTENT_KIND: TEST_DESIGN
WHEN: planned proof must be implemented/executed later
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Test Design Target or parent Slice testing owner according to profile
REPRESENTATION: EXISTING_ARTIFACT_OR_EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <test-design-owner> or <slice-testing-section>
CONTENT: property-to-proof trace; layer; setup/action/observation; assertions; escape/refactor risk; Evidence expectation
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-TDES-02
CONTENT_KIND: PRACTICAL_TEST_HANDOFF
WHEN: property needs operated practical Evidence
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: future Practical Test Target
REPRESENTATION: UNRESOLVED
FILE_OR_ARTIFACT: <practical-test-owner>
CONTENT: Evidence question/task/observation requirements passed to TM-PRACTICAL-TEST
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED** — planned proof designs that must be implemented/executed later need persistent addressability in a Test Design owner, test-plan artifact or selected implementation Slice testing section according to workspace profile.

**PREFERRED** — keep behavior/property→proof trace close to the semantic/Slice owner when local; use a separate Test Design artifact when several proofs/layers/environments need independent planning/review.

Actual executed Evidence is not the same artifact as planned proof design and may require a supporting Evidence/Test Coverage owner.

`P-14` must state where each planned proof and later Evidence reference belongs.


## Guard
Planned evidence ≠ executed evidence; test names do not prove coverage.

## Handoff

Concrete proof design → implementation/test realization; practical/operated proof route → `TM-PRACTICAL-TEST`; executed results later become Sources for `TM-TEST-COVERAGE` and Decision Revalidation.
