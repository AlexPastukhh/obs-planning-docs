# LENS-TEST-PROOF-EVIDENCE — Test Proof Responsibility / Evidence Quality

Lens ID: `LENS-TEST-PROOF-EVIDENCE`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Specialize L6 into concrete testing strategy/design/coverage: choose credible proof at the cheapest useful layer and later assess whether actual Evidence proves current semantics.

## Applicability Gate

Primary for Test Strategy/Design/Coverage; supporting for Slice test handoff.

## Target Inputs / Evidence

Useful Vertical Result Definition, Scenario Acceptance, Behavior Items, Scenario DATA, must-hold/negative guarantees, Domain Verification Meaning and actual tests/Evidence.

## Shared Proof Responsibility

Which guarantees need shared strategy vs local proof?

## Cheapest Credible Layer

Use the cheapest layer capable of proving the real property without hiding important integration behavior.


## Default Unit / Integration Split

Use this default unless the real property requires another layer:

```text
Slice orchestration / collaboration across production owners
→ integration test

isolated complex business rule / Domain invariant / algorithm
→ unit test
```

Integration tests prove that the Slice path, wiring and relevant boundaries collaborate correctly. Unit tests prove the isolated rule space precisely and cheaply.

Do not duplicate every unit-rule case at integration level; integration proof should focus on cross-owner behavior, persistence/adapter boundaries, failure propagation and the Useful Vertical Result.

## No Duplication / Wrong Layer

Avoid redundant proof and layers incapable of observing the real risk.

## Critical End-To-End

Reserve E2E for material integrated paths/risks.

## Data / Fixture / Isolation

Check semantic setup data, isolation and environmental assumptions.

## Automated vs Practical Evidence

Choose automated vs operated/practical Evidence according to the property.

## Negative Guarantee

Explicitly prove rejection/no-mutation/failure when material.

## Actual Evidence / Freshness / Drift / Assertion Strength

Test names/plans are not Evidence. Check current execution, correspondence to current semantics and whether assertions could pass while the property is broken.

## Escape / Refactor Risk

What bug can escape? Would harmless refactoring break the test unnecessarily?

## Findings / Outputs

proof responsibility, layer choice, Slice-orchestration integration coverage, isolated-rule unit coverage, assertions/Evidence, duplication/wrong-layer finding, freshness gap, escape/refactor risk, Practical Evidence handoff and Q/R/P.

## Typical Consumers

Test Strategy, Test Design, Test Coverage and Slice handoff.

## Artifact / File Implications

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-TEST-01
CONTENT_KIND: PLANNED_PROOF
WHEN: proof design must survive for later implementation/execution
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Test Design/Strategy or parent Slice testing owner
REPRESENTATION: EMBED_OR_EXISTING_ARTIFACT
FILE_OR_ARTIFACT: <test-design-owner> or <slice-testing-section>
CONTENT: property-to-proof design; assertions; layer; setup/action/observation
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-TEST-02
CONTENT_KIND: ACTUAL_EVIDENCE
WHEN: executed test/practical result exists
GUIDANCE: ADVISORY_REQUIRED_REFERENCE
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: actual Evidence owner
REPRESENTATION: SUPPORTING_EVIDENCE_OR_TEST_ARTIFACT
FILE_OR_ARTIFACT: <actual-test-or-evidence-artifact>
CONTENT: actual Evidence remains separate from semantic authority; Test Coverage references it
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../shared/artifact-placement-and-idtspe-response-contract.md).

Planned proof should persist in the Test Design/Strategy or parent Slice testing owner when it must later be implemented/executed.

Actual Evidence is a separate evidence state/source and may need Test Coverage/supporting Evidence placement.

Do not create a separate proof file per property when local embedding is enough.

## Guards

Tests/Evidence do not become product semantic authority.

## Composition

L6 asks whether result/architecture is provable/observable/operable at all; this pack decides concrete test proof. Practical Evidence handles operated observation.

## Escalation / Revalidation

Coverage gaps reopen Test Design/Strategy or upstream meaning only when Evidence warrants it.

## High-Level Example — Self-Contained Walkthrough

### Situation

The product guarantees:

```text
persistence failure must never be reported as successful capture
```

The team proposes a UI snapshot test.

### Why This Lens

The Test Proof Lens asks which proof layer can actually observe the semantic property.

### Walkthrough

A UI snapshot may verify visual rendering but cannot prove:

```text
no durable accepted record was created
```

A stronger design might use:

```text
integration-level persistence failure injection
→ assert failure result
→ assert no accepted record
→ optionally assert UI maps failure correctly
```

The Lens also checks whether an expensive end-to-end test is necessary or whether cheaper layers already prove the property.

### Result

The Lens yields:

```text
proof responsibility
credible layer
assertion/evidence requirements
negative-guarantee coverage
duplication/wrong-layer findings
```

### Boundary / Lesson

More tests are not automatically better proof.

A test can pass while the real property is broken if it observes the wrong thing.

## Knowledge Basis

Mode: `HYBRID`

**Embedded Principles / Rules / Theory:**

- Proof should target selected behavior/invariants at the cheapest credible layer.
- Different proof layers are justified by distinct evidence value, not by blanket duplication.

**Referenced Knowledge Owners:**

- [`README.md`](../../../theoretical-modules/testing/README.md)

**Reference Load Policy:**

Read the testing theoretical package only when detailed API/integration/E2E/test-object mechanics are materially unresolved or explicitly requested.

**Operationalization Notes:**

This Lens remains processed operational authority for proof/evidence evaluation; referenced testing theory supplies deeper/raw detail and cannot silently override the Lens/Target Modules.

## Provenance

Consolidates pre-Lens testing lens knowledge without replacing L6.
