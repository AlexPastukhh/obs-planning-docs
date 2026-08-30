# TM-TEST-DESIGN — Behavior-To-Test Proof Design

Entry Point: `tm.test.design`  
Role: optional primary/supporting proof Target Module

## Purpose

Decide **how a selected semantic property will be credibly proved** when that proof design is independently non-trivial enough to deserve its own planning result.

Do not require this Target for ordinary tests whose credible proof is already obvious from Scenario/Slice/Domain meaning. In that common case, hand the accepted semantics directly to `TM-EXACT-REALIZATION` and realize production + test code together.

## High-Level Example — Self-Contained

Simple case — no separate Test Design:

```text
Scenario guarantee:
  saved item is returned after reload

Slice path is already known
→ ordinary integration proof is obvious
→ Exact Realization writes production code + exact integration test
```

Non-trivial case — Test Design useful:

```text
guarantee:
  persistence failure must never create accepted partial state or report success

open proof question:
  where/how to inject the failure while exercising the real transaction boundary?
```

Selected Test Design might be:

```text
layer:
  integration

setup:
  accepted precondition state + failure-capable real persistence boundary

action:
  invoke public capture operation

observe/assert:
  failure result
  no accepted record
  no success event
  material stable state unchanged
```

The Test Proof Lens may additionally flag a proposed mock-heavy alternative as high Escape/Refactor risk. Those risks are Lens evaluation/rationale, not mandatory fields of every Test Design.

## Activation / Scope Gate

Use when “how do we prove this convincingly?” is independently material, for example:

```text
credible layer is genuinely unclear
failure injection / concurrency / distributed consistency is non-trivial
negative/no-mutation outcome is difficult to observe
proof needs a special environment/harness/setup
several plausible proof designs have materially different Escape/Refactor risk
Practical vs automated proof boundary is unresolved
```

Skip when the proof is straightforward and can be realized directly.

## Upstream Source Contract

```text
exact selected Scenario/Requirement/Domain/Slice/other semantic property
negative/must-not-change guarantees
selected Test Strategy when present
current implementation/test/environment constraints when relevant
actual Evidence/failures when refining an existing proof
```

Current `TF-04 SOURCE_SET` remains authority.

## Knowledge Basis

Use [`Testing Knowledge Basis`](../../../theoretical-modules/testing/README.md) for deeper reusable proof mechanics when needed.

## Lens Profile

Primary reusable Lens:
- [`LENS-TEST-PROOF-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md) — required.

Conditional:
- [`LENS-PRACTICAL-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-PRACTICAL-EVIDENCE.md) — when real operated observation is the credible route.
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md)
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md)

The Test Proof Lens owns operational evaluation such as Escape Risk, Refactor Fragility, assertion strength, wrong-layer/duplication and Evidence freshness. Keep such analysis in the Result only when it materially explains the selected design.

## Question Set Examples — Non-Exhaustive

```text
What exact property/outcome must be established?
Why is the obvious/local proof insufficient?
What cheapest layer can actually observe the property?
What setup/action/observation/assertions make the proof discriminating?
What must not change on failure?
Does a proposed proof have a material false-confidence or refactor-fragility problem?
Does the property actually require Practical Evidence?
```

## Resolution / Production Method

```text
select exact semantic property
→ apply Test Proof Lens / deeper KB only as needed
→ use ordinary Q/R/P/Evidence + Ideas when a real proof-design choice exists
→ select setup/action/observation/assertion approach
→ expose the concise proof design
```

Generic State stays generic. Do not invent a form merely to show that analysis occurred.

## Target Step-Result Contract

**Target Step Result:** `Test Design`

| Result Unit | Meaning |
|---|---|
| `RU-TDES-01` | Behavior-to-Test Proof Design — selected property → credible layer/operator + setup/action/observation + required assertions/acceptance signals |

Typical proportional content:

```text
semantic property / owner reference
outcome proved
layer / operator
setup / action / observation
required assertions / acceptance signals
important constraints or rationale only when material
```

Escape Risk / Refactor Risk / freshness are not mandatory Result fields. They are Lens evaluation dimensions and may be retained as rationale/Finding material when consequential.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-TDES-01
CONTENT_KIND: TEST_DESIGN
WHEN: independently non-trivial proof design must survive for later realization/review
GUIDANCE: CONDITIONAL
PERSISTENCE_GUIDANCE: CONDITIONAL
PLACEMENT_DIRECTIVE: EMBED_OR_PLACE
SEMANTIC_OWNER: current Test Design Target or nearest existing semantic/Slice testing owner
REPRESENTATION: EXISTING_OWNER_OR_TEST_DESIGN_ARTIFACT
CONTENT: selected property→proof design; layer/operator; setup/action/observation; required assertions/signals
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-TDES-02
CONTENT_KIND: PRACTICAL_TEST_HANDOFF
WHEN: selected proof requires real operated/environment Evidence
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: future/current TM-PRACTICAL-TEST Target when selected
REPRESENTATION: REFERENCE_OR_HANDOFF
CONTENT: exact property/question and observation requirements that require real implemented Evidence
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

Do not create a separate Test Design file by default.

Prefer, in order:

```text
local proof obvious
→ no separate Test Design persistence; exact test code is implementation-native

small but useful proof design
→ embed/reference in existing Scenario/Slice/testing owner

several independently reviewed proof choices/environments
→ separate Test Design artifact when justified
```

Actual executed Evidence is not the planned design.

## Guards

```text
simple obvious test ≠ mandatory Test Design Target
Test Design ≠ exact test code
Test Design ≠ executed Evidence
Lens risk analysis ≠ mandatory Result schema
Tests ≠ product semantic authority
```

## Handoff

```text
selected proof design
→ generic Core TM-EXACT-REALIZATION for literal test/production code

Practical/operated proof route
→ TM-PRACTICAL-TEST

actual automated execution during realization
→ Core Evidence inside Exact Realization
```
