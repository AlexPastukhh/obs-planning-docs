# TM-TEST-STRATEGY — Shared Proof Strategy

Entry Point: `tm.test.strategy`  
Role: conditional shared proof-strategy Target Module

## Purpose

Choose a **shared proof strategy** only when several semantic owners/Slices materially need one coordinated testing policy, shared proof boundary or shared testing infrastructure decision.

If each behavior/Slice can choose its proof locally without coordination pressure, skip this Target.

## High-Level Example — Self-Contained

No separate Strategy needed:

```text
3 ordinary Slices
→ orchestration proved by local integration tests
→ complex isolated Domain rules proved by local unit tests
→ no shared harness/policy problem
```

Strategy becomes useful:

```text
20 Slices
+ one shared Kafka test harness
+ one DB reset/isolation mechanism
+ expensive external sandbox
+ 3 intentionally selected critical E2E paths
```

The useful result is then the common allocation/constraint, for example:

```text
isolated rules → focused unit proof
Slice orchestration → integration proof through shared harness
external-provider contract → sandbox contract/integration proof
3 critical actor journeys → E2E
operator diagnosis property → Implemented Practical Evidence

shared DB reset/harness is reused
E2E does not duplicate every unit/integration branch
```

Do not mirror every concrete test class/helper into Strategy. Code is authority for exact test implementation.

## Activation / Scope Gate

Use when at least one is independently material:

```text
proof responsibility spans several owners/Slices
shared test environment/data/harness policy affects several proofs
layer allocation/non-duplication needs a cross-Slice decision
critical E2E/Practical paths must be selected across the portfolio
```

Skip when the only result would be restating ordinary defaults already provided by the Test Proof Lens/Knowledge Basis.

## Upstream Source Contract

```text
selected Scenario/Requirement/Domain/Slice properties
selected Slice portfolio when present
existing Test Designs when present
current test infrastructure/Evidence when revising Strategy
material environment/data/isolation/cost constraints
```

Current `TF-04 SOURCE_SET` remains authority for the concrete Target.

## Knowledge Basis

Use [`Testing Knowledge Basis`](../../../theoretical-modules/testing/README.md) only when deeper layer/integration/E2E/test-object mechanics are materially needed.

Generic theory belongs there, not in this Target Result.

## Lens Profile

Required Core Lens pack is inherited from the Core Lens Registry.

Primary reusable Lens:
- [`LENS-TEST-PROOF-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md) — required; evaluates property alignment, proof layer, assertion strength, no-mutation, Escape/Refactor Risk, duplication, representative sufficiency, cross-side proof, isolation and actual Evidence quality.

Frequent conditional Lenses:
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md)
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md)
- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md)
- SDS simplicity/economy Lens when the active profile selects it.

## Question Set Examples — Non-Exhaustive

```text
Which proof responsibilities are genuinely shared rather than local?
Which default layer allocation should several Slices follow?
What must deliberately NOT be duplicated across layers?
Which shared environment/data/isolation/harness constraint is material?
Which E2E or Practical Evidence paths are genuinely critical?
Can ordinary local Test Design / Exact Realization handle the rest without a Strategy owner?
```

## Resolution / Production Method

```text
identify real cross-owner testing pressure
→ apply Test Proof Lens / Testing Knowledge Basis proportionally
→ compare only material strategy alternatives through ordinary Ideas/Q/R/P/Evidence
→ select the smallest shared policy/infrastructure boundary that reduces repeated local decisions
→ leave concrete local proof/test code to local owners / Exact Realization
```

Generic Questions/Ideas/Q/R/P/Decisions/Evidence remain Core State; do not duplicate them as Strategy fields.

## Target Step-Result Contract

**Target Step Result:** `Shared Proof Strategy`

| Result Unit | Meaning |
|---|---|
| `RU-TSTRAT-01` | Shared Proof Strategy — the selected shared proof-layer/non-duplication/environment/harness/critical-path policy that several proofs actually need |

Typical proportional content:

```text
scope / participating semantic owners
shared proof goals
layer responsibility / explicit non-duplication boundary
critical E2E / Practical paths when selected
shared data/isolation/environment/harness responsibility when material
important exceptions / rationale
```

Do not create mandatory separate Result Units for Evidence-state coordination or a class-level Test Realization Registry. If a cross-owner realization map is genuinely useful, keep a tiny reference section or generated/implementation-native map under normal Documentation / Representation rules; do not mirror test bodies/method inventories.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-TSTRAT-01
CONTENT_KIND: TEST_STRATEGY
WHEN: shared proof strategy is independently useful/downstream-consumed
GUIDANCE: REQUIRED_IF_TARGET_EXISTS
PERSISTENCE_GUIDANCE: CONDITIONAL
PLACEMENT_DIRECTIVE: PLACE_OR_EMBED
SEMANTIC_OWNER: current Test Strategy Target
REPRESENTATION: EXISTING_OWNER_OR_SMALL_STRATEGY_ARTIFACT
CONTENT: compact shared proof-layer/non-duplication/environment/harness/critical-path policy; no shadow test-code registry
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-TSTRAT-02
CONTENT_KIND: SHARED_TEST_ENVIRONMENT_DATA
WHEN: shared environment/data/isolation responsibility is independently substantial
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: PLACE_OR_REFERENCE_IMPLEMENTATION_NATIVE
SEMANTIC_OWNER: current Test Strategy or resolved implementation owner
REPRESENTATION: EXISTING_CONFIG_OR_SUPPORTING_ARTIFACT
CONTENT: only the shared environment/data/isolation meaning not already obvious from code/config
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

Persist a Strategy owner only when the shared strategy itself is independently useful/downstream-consumed.

A small Strategy may be one section in an existing testing/planning owner. A separate file is justified when several owners repeatedly depend on the shared decisions.

Concrete test classes, fixtures, helpers and harness implementations remain code authority. Reference names/paths only when that cross-owner relation is materially useful; do not create shadow code documentation.

## Guards

```text
local obvious proof ≠ reason for shared Test Strategy
shared defaults ≠ permission to duplicate every proof at every layer
Strategy ≠ test implementation inventory
Strategy ≠ Evidence state runtime
Strategy ≠ product semantic authority
```

## Handoff

```text
simple local proof
→ TM-EXACT-REALIZATION directly when exact tests are obvious

independently non-trivial proof method
→ optional TM-TEST-DESIGN

literal production/test code
→ TM-EXACT-REALIZATION

real operated acceptance/learning
→ TM-PRACTICAL-TEST
```
