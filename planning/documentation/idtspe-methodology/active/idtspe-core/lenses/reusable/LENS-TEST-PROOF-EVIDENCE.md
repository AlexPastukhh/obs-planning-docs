<a id="lens-test-proof-evidence"></a>
# LENS-TEST-PROOF-EVIDENCE — Test Proof / Evidence Quality

> Semantic Owner Dependency
> - `EXTENDS` [Lens Meta-Model](../LENS-MODEL.md#lens-meta-model) — `LENS.META-MODEL`.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Resolution Carry-Forward contract](../../resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) — `RESOLUTION.CARRY-FORWARD`.

Lens ID: `LENS-TEST-PROOF-EVIDENCE`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Knowledge Basis Contract`](../../knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md#knowledge-basis-contract) — `KNOWLEDGE.BASIS`
> - `CONTEXTUALIZES` [`Testing Knowledge Basis`](../../knowledge-bases/testing/README.md#knowledge-testing-basis) — `KNOWLEDGE.TESTING`

## Purpose

Evaluate whether a proposed or actual test/proof **credibly establishes the selected semantic property without unnecessary cost, false confidence or implementation coupling**.

This Lens is the common operational authority for:

```text
proof-design evaluation
shared testing-strategy evaluation
actual test/Evidence coverage review
proof gaps / stale Evidence review
```

It does not create a Test Coverage Target. Coverage review is an application of this Lens to current semantics + actual Evidence.

## Analysis Surface

This Lens evaluates the bounded planning/implementation surface where the following concern is materially present:

> A concrete test/proof is being designed, proof layer/boundary/shared strategy selected, actual tests/Evidence reviewed, proof gap/false-confidence/refactor-fragility assessed, or Exact Realization must decide automated proof.

Context may inform the evaluation, but context availability alone does not make the entire context part of this Lens's Analysis Surface.

## Applicability & Temporal Triggers

### Base Applicability / Usefulness

A concrete test/proof is being designed, proof layer/boundary/shared strategy selected, actual tests/Evidence reviewed, proof gap/false-confidence/refactor-fragility assessed, or Exact Realization must decide automated proof.

### Opening Triggers

The Unit begins with a proof/test design/review question, selected semantic property needing automated proof, or actual tests/Evidence whose adequacy/freshness is under review.

### During-work Recheck / Invalidation Triggers

Selected property/negative guarantee, public boundary, realization path/effects, proof layer, setup/action/observation, assertions/signals, isolation/data/environment, implementation coupling, or Evidence freshness changes.

### Closing Triggers / Revalidation Conditions

The result claims proof adequacy, chooses a proof strategy/layer, or creates/changes/reviews tests/Evidence; validate property alignment, cheapest credible layer, assertion strength, escape paths, resilience and freshness.

### Confident-False / Stop Conditions

No concrete test/proof design, selection, implementation or review question exists.

### False-negative Risks

A green test or existing test file can be stale/weak/wrong-layer; existence is not credible proof.

Trigger semantics follow the canonical Lens Model:

```text
TRUE      → APPLY
FALSE     → NOT_APPLICABLE
UNCERTAIN → APPLY
```

A Unit-level `REQUIRED [phase]` attachment bypasses the apply/skip decision at that phase and requires this Lens to cover the current Analysis Surface. These Lens-owned triggers still govern useful earlier application and recheck/invalidation.

## Inputs / Evidence
```text
selected Scenario / Requirement / Domain / Slice / other semantic property
negative / must-not-change guarantees
proposed proof design when present
actual tests/checks and execution Evidence when reviewing current coverage
current implementation/destination boundaries when relevant
```

Tests and Evidence remain downstream of semantic truth. A green test does not become product behavior authority.

## Evaluation Contract

Apply only the dimensions material to the current question. The examples are calibration examples, not mandatory templates.

### 1. Property Alignment

Ask:

> What exact semantic property is this proof supposed to establish?

Bad example:

```text
property:
  captured item is durable and recoverable after reload

test:
  assert HTTP 200
```

The status proves too little.

Better:

```text
invoke the public capture behavior
→ observe accepted result
→ reread/reload through the relevant read boundary
→ assert the durable selected state
```

### 2. Proof / Public Boundary

Ask whether the proof exercises the boundary whose behavior actually matters.

Bad:

```text
call handler method directly
when the selected guarantee includes API wiring + transaction + persistence
```

Better:

```text
direct fixture setup may arrange the precondition
→ selected behavior runs through the relevant public/application boundary
→ direct persisted-state read may observe the result
```

Do not turn “public boundary” into a rule that every proof must boot the whole product.

### 3. Cheapest Credible Layer

Use the cheapest layer capable of proving the real property without hiding material integration behavior.

Default:

```text
isolated complex business/Domain rule / deterministic algorithm
→ unit proof

Slice orchestration / collaboration across production owners
→ integration proof

critical whole-system/external actor path
→ selective E2E

property that fundamentally requires real operated use/environment
→ Practical Evidence
```

Bad:

```text
50 browser E2E cases for one pure pricing rule
```

Better:

```text
focused unit cases prove pricing rule space
+ one integration proof shows the Slice uses the rule correctly
```

### 4. Assertion Strength

Ask whether the assertions establish the property rather than merely showing that code ran.

Bad:

```text
persistence failure
→ assert response == 500
```

A broken implementation may have written partial state before returning 500.

Better:

```text
assert failure result
+ assert no accepted record
+ assert material unrelated/stable state remains intact when relevant
```

### 5. Negative / No-Mutation Proof

For rejected or failed state-changing behavior ask:

> What must **not** change?

Bad:

```text
invalid command returns error
```

Better:

```text
invalid command returns error
+ no accepted object exists
+ no duplicate/partial write exists
+ stable identity/neighbor state remains unchanged when material
```

### 6. False Confidence / Escape Risk

Ask:

> Can a bad implementation pass this test and still produce undesirable selected behavior?

Example:

```text
selected guarantee:
  persistence failure must never produce false success

weak UI test:
  mock service to return Failure
  assert error label
```

The real vertical persistence path can be broken while this test stays green.

Stronger proof may inject a real integration-level persistence failure and assert both the failure result and no accepted persisted state.

When material, describe escape risk qualitatively and explain the concrete escape path. Do not require a Low/Medium/High field merely for formality.

### 7. False Failure / Refactor Fragility

Ask:

> Can behavior remain correct while a harmless implementation refactor breaks the test?

Bad:

```text
assert repository.save() was called before audit.publish()
```

when internal call order is not a selected contract.

Better:

```text
assert accepted durable result
+ required audit outcome
+ actor-visible result
```

Mocks/internal-call assertions are not forbidden; they are suspicious when they bind proof to non-semantic implementation details.

### 8. Duplication / Wrong Layer

Do not repeat the same proof exhaustively at every layer.

Bad:

```text
40 validation cases
→ unit
→ integration
→ E2E
```

Better:

```text
unit:
  exhaustive isolated validation rule space

integration:
  representative invalid case + orchestration/failure boundary

E2E:
  only critical actor path when materially useful
```

### 8A. Delegated / Not-Proved-Here Boundary

When material, record what this proof intentionally does **not** establish because another owner/layer proves it.

Example:

```text
this integration test proves command → persistence outcome
it does not exhaustively prove the pure validation rule space
that rule space is delegated to Domain/unit proof
```

This is a duplication/coverage boundary, not a transfer of semantic authority.

### 9. Representative Sufficiency

Ask whether representative cases convincingly prove a stable rule without matrix explosion.

Example:

```text
50 identifiers use the same parser/validation mechanism
```

Do not automatically create 50 E2E tests. Expand the matrix only where a distinct behavior/risk/boundary makes another case evidentially different.

### 10. Cross-Side / Paired Completeness

One side of a distributed guarantee does not prove the other.

Example:

```text
server rejects a request without auth token
≠ proof that the client sends the token correctly

client test shows token header is sent
≠ proof that the server enforces it
```

Pair proof only when both guarantees are selected meaning.

### 11. Data / Isolation / Reproducibility

Ask whether the proof depends on accidental state, order or a polluted shared environment.

Bad:

```text
Test B passes only because Test A created the user
```

Better:

```text
each proof creates/references explicit reproducible state
+ unique data where collisions matter
+ reset/isolation rules where the environment is shared/mutable
```

### 11A. Shared / Cross-Owner Proof Coordination — Conditional

When several semantic owners genuinely share proof infrastructure/policy, coordinate only the cross-owner concerns that need one shared answer, for example:

```text
layer responsibility / non-duplication boundary
shared test data / fixtures / reset / isolation / concurrency policy
shared harness/helper boundary without hiding Scenario/proof outcomes
critical cross-layer paths and explicit non-E2E boundaries
Evidence state/reporting conventions
```

Keep owner-local proof local when possible. Shared coordination does not create a generic Test Strategy Target by default.

### 12. Evidence Actuality / Freshness / Drift

Keep distinct:

```text
planned proof
implemented test/check
checked-current test/check
actual executed Evidence
passing Evidence
```

Example:

```text
a green test file exists
but it was last executed before the Scenario/API changed
```

That file is not automatically fresh Evidence for the current meaning.

### 12A. Methodology Integrity Proof — Conditional

When the proof subject is the methodology itself (registries, typed owner references, bootstrap routes, generated projections/maps or Helper methodology projections), apply the canonical [`Methodology Integrity Testing Contract`](../../knowledge-bases/testing/METHODOLOGY-INTEGRITY-TESTING-CONTRACT.md#testing-methodology-integrity).

The key proof question becomes:

```text
Can accidental partial change escape?
Can legitimate semantic-preserving evolution fail?
Is expected state derived from canonical authority rather than frozen in the test?
```

Use [`UC-IDTSPE-MAINTAIN-METHODOLOGY-INTEGRITY-TESTS`](../../use-cases/maintain-methodology-integrity-tests/UC-IDTSPE-MAINTAIN-METHODOLOGY-INTEGRITY-TESTS.md#uc-idtspe-maintain-methodology-integrity-tests) when the integrity-test guard itself needs creation/review/maintenance as an independently useful methodology-use result.

### 13. Automated vs Practical Evidence

Ask whether automated assertions can actually establish the property.

Example:

```text
property:
  operator can diagnose a failed import from the real operational signals
```

A narrow unit test may prove formatting logic but not real diagnostic usability. Route the operated property to Practical Evidence when real use/environment is necessary.

## Test Abstraction Check — Conditional

When helpers/Page Objects/Component Objects/harness abstractions are material, check that they hide repeated mechanics without hiding the proof story.

Prefer tests where these remain visible enough to review:

```text
unique Scenario/path
important input/setup
key action
key assertion(s)
final expected outcome
```

A helper such as `performEverythingAndCheckEverything()` is suspicious when it makes the semantic proof unreadable.

## Coverage Review Operation

To review test coverage, apply this Lens directly to:

```text
current selected semantic properties
+ actual current tests/checks/Practical Evidence
+ execution/freshness provenance
```

Useful review classifications may include plain-language forms of:

```text
strong
partial
missing
stale
duplicated
wrong layer
weak assertion
```

These are review vocabulary, not required enums.

Material gaps become Finding Candidates. Core Finding Disposition resolves the real destination, commonly:

```text
applicable literal/test realization owner
  → simple missing/incorrect exact test implementation
  → Core TM-EXACT-REALIZATION when no narrower active-profile owner applies
  → SDS TM-CODE-REALIZATION for source/test/codebase realization

natural semantic owner / transient proof design
  → proof method itself is independently non-trivial and must be reasoned with the owner before literal realization

TM-PRACTICAL-TEST
  → real operated/environment Evidence is required

upstream semantic owner
  → actual Evidence challenges accepted meaning
```

If a durable coverage matrix is independently useful, Documentation / Representation may persist the selected property→Evidence map. That representation does not require a separate Test Coverage Target family.

## Findings / Outcomes

Valid invocation outcomes:

```text
APPLIED — no material finding
APPLIED — one or more material Finding Candidates
NOT_APPLICABLE — short confident-FALSE reason when application is not forced at this checkpoint
```

Typical Lens output is concise Finding/Key-Point material such as:

```text
property mismatch
wrong/over-expensive proof layer
weak assertion / missing no-mutation observation
false-confidence escape path
refactor-fragile implementation coupling
duplicated proof
representative-case gap
cross-side proof gap
isolation/reproducibility problem
stale/missing Evidence
Practical Evidence handoff
```

Only material semantic/lifecycle consequences cross Finding Candidate → Core Finding Disposition.

## Artifact / File Implications

```text
ARTIFACT_GUIDANCE
ID: AG-TEST-01
CONTENT_KIND: PLANNED_PROOF
WHEN: selected proof design must survive for later realization/review
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: nearest natural semantic/implementation owner or resolved natural supporting-policy Unit when independently cross-owner
REPRESENTATION: EMBED_OR_EXISTING_ARTIFACT
CONTENT: property-to-proof design; layer; setup/action/observation; required assertions/signals; delegated/not-proved-here boundary when material
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

```text
ARTIFACT_GUIDANCE
ID: AG-TEST-02
CONTENT_KIND: ACTUAL_EVIDENCE
WHEN: executed automated/practical Evidence has continuing review/revalidation/traceability value or materially supports a retained Decision/Finding
GUIDANCE: CONDITIONAL
PERSISTENCE_GUIDANCE: CONDITIONAL
PLACEMENT_DIRECTIVE: PLACE_OR_REFERENCE_IMPLEMENTATION_NATIVE
SEMANTIC_OWNER: resolved Evidence State/owner when retained; otherwise existing test/run/tool output remains the Evidence Source
REPRESENTATION: EXISTING_TEST_RUN_ARTIFACT_OR_SUPPORTING_EVIDENCE
CONTENT: retained executed Evidence reference/summary with freshness/provenance when material; not semantic authority
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

```text
ARTIFACT_GUIDANCE
ID: AG-TEST-03
CONTENT_KIND: TEST_EVIDENCE_COVERAGE_REVIEW
WHEN: a durable property-to-actual-Evidence coverage map is independently useful
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: resolved host review/semantic owner; the Lens does not create a Coverage Target
REPRESENTATION: EMBED_OR_REVIEW_ARTIFACT
CONTENT: property→actual Evidence mapping; freshness/assertion/escape/refactor/wrong-layer gaps; disposition references
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

Planned proof that must survive for later implementation should live with the nearest natural owner or a resolved natural cross-owner policy Unit when independent coordination value exists. No generic Test Design/Strategy Target is assumed.

Actual test files/run artifacts remain Evidence Sources/supporting representation, not product-semantic authority. Mere existence or successful execution of automated/practical Evidence does **not** by itself require a second durable Evidence document/reference; retain/persist it only when continuing review, revalidation, traceability, Decision support or another material downstream use warrants that survival.

A durable property→Evidence coverage map is optional and justified by continuing review/traceability value, not by the existence of this Lens.

Do not create one proof file per property when code + existing owner context is sufficient.

## Knowledge Basis

Canonical deeper theory/reference owner:

- [`Testing Knowledge Basis`](../../knowledge-bases/testing/README.md)

The Knowledge Basis owns reusable theory/mechanics such as public-boundary testing, API/integration patterns, E2E selection, test-object patterns, no-mutation mechanics, isolation and representative proof. This Lens owns the operational **evaluation questions** above; Target Modules own only independently useful concrete planning/evidence results.

## Guards / Boundaries
```text
test plan ≠ implemented test
implemented test ≠ executed Evidence
green test ≠ selected behavior authority
more tests ≠ stronger proof
mock interaction ≠ public outcome unless that interaction is itself the contract
coverage review ≠ a mandatory separate Target
```
