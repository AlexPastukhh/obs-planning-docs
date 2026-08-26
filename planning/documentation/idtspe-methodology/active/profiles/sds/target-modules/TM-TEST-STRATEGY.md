# TM-TEST-STRATEGY — Shared Proof Strategy

Entry Point: `tm.test.strategy`  
Role: proof-strategy Target Module; conditional

## Purpose

Choose shared proof responsibilities/boundaries only when testing responsibility spans several behaviors/Slices/layers strongly enough that strategy itself is independently useful.



## High-Level Example — Self-Contained Walkthrough

### Situation

A system has several Slices, each with local tests, but all also rely on one shared audit pipeline and one critical end-to-end customer flow.

The team needs to decide **which proof responsibilities are shared** and which remain local.

### Why This Module

`TM-TEST-STRATEGY` is useful only when proof responsibilities/layers across several targets need coordination.

If one Slice can design its own proof directly, Strategy may be skipped.

### Walkthrough

A strategy might select:

```text
isolated unit proof:
  prove complex AuditPolicy/business-rule cases directly

per-Slice integration tests:
  prove each state-changing Slice orchestrates its real collaborators
  and emits the required audit event correctly

shared integration proof:
  prove emitted events reach audit storage correctly

one critical end-to-end path:
  prove customer booking succeeds through UI/server/storage

practical operated check:
  prove an operator can retrieve/diagnose audit history
```

The strategy also avoids duplication:

```text
do not repeat the same invariant
at five expensive end-to-end layers
when one cheaper credible layer proves it
```

### Result

The output defines:

```text
shared proof responsibilities
test/proof layer allocation
critical integrated paths
practical-vs-automated responsibility
important data/environment strategy
optional Test Realization / Topology Registry when cross-Slice realization mapping is useful
```

When several Slices/Domain proof owners share concrete testing infrastructure, Strategy may also keep a compact registry-like realization map such as:

```text
SL-CAPTURE
  proof: integration
  test owner: CaptureFlowIntegrationTest
  setup/harness: CaptureIntegrationSetup
  fixtures: CaptureItemFixture
  helpers: PersistenceAssertions

SL-REVIEW
  proof: integration
  test owner: ReviewCaptureIntegrationTest
  setup/harness: CaptureIntegrationSetup
  helpers: CaptureApiDriver

shared testing infrastructure
  CaptureIntegrationSetup → SL-CAPTURE, SL-REVIEW
  PersistenceAssertions   → SL-CAPTURE, CaptureItem rule proof
```

The point is the **cross-owner relation**: which Slice/Domain proof is realized by which test class/suite/setup/fixture/harness/helper and which infrastructure is intentionally shared. The code remains authority for the bodies/signatures/implementation of those test classes and helpers; Strategy should reference them, not mirror their methods/assertions.

### Boundary / Lesson

Test Strategy does not invent product behavior.

It coordinates proof of already-owned semantics.


## Methodology Entry Gate

`TM-TEST-STRATEGY` is intentionally **later than local Domain proof planning**, but earlier than detailed per-Slice proof coordination when shared strategy is material.

Normal entry:

```text
selected Domain owner set
+ every material isolated Domain proof responsibility:
    PLANNED | NOT_APPLICABLE | explicitly DEFERRED
+ selected Slice portfolio / Useful Vertical Result Definitions
↓
TM-TEST-STRATEGY
```

Why:

```text
Domain Test Design owns local rule proof first;
Slice Strategy tells us what vertical integration paths actually exist;
Test Strategy then coordinates shared layer responsibility without inventing either.
```

If those Sources are not ready, recommend the missing Domain Test Design or Slice Strategy rather than creating a speculative Test Strategy.

## Default Proof-Layer Allocation

Test Strategy should establish a default proof-layer policy instead of choosing layers ad hoc for every test.

### Slice Orchestration / Vertical Collaboration → Integration Tests By Default

The orchestration and working collaboration of an Implementation Slice should normally be proved with **integration tests**.

This includes behavior whose correctness depends on several real production responsibilities being wired together correctly, for example:

```text
request / entry owner
→ application/service orchestration
→ Domain collaboration
→ repository / persistence boundary
→ integration adapter when material
→ returned result / state transition
```

The integration proof should include the real collaborating components/boundaries needed to prove the Slice result. It does **not** automatically mean booting the entire product, browser and every external service.

Typical integration-test responsibilities:

```text
Slice orchestration and wiring
multi-owner application flow
persistence interaction / transaction behavior
adapter/contract integration
failure propagation across boundaries
Useful Vertical Result properties that cannot be proved inside one isolated owner
```

A normal Slice should therefore have integration proof for its material vertical orchestration even when some internal rules also have unit tests.

### Isolated Complex Logic / Business Rules → Unit Tests By Default

Use **unit tests** for logic that is important but can be credibly proved in isolation without relying on infrastructure or cross-owner wiring.

Typical unit-test responsibilities:

```text
complex Domain rules / invariants
business policies
calculations
state-transition rules
parsers / mappings / algorithms
branch-heavy deterministic logic
edge cases whose meaning belongs to one isolated owner
```

The purpose is fast, precise proof of the rule itself.

Do not force an isolated business rule to be proved only through a broad integration test when a small unit test can establish the same rule more directly and with better failure localization.

### Integration + Unit Are Complementary, Not Duplicate Layers

For one Slice, a common strategy is:

```text
unit tests
  → prove difficult isolated rules thoroughly

integration tests
  → prove those owners collaborate correctly in the Slice path
  → prove wiring, persistence, boundary behavior and failure propagation
```

Do not repeat every unit-level rule exhaustively in integration tests. Integration tests should prove the **collaboration/result**, while unit tests prove the **isolated rule space**.

### E2E / Practical Remain Selective

```text
E2E
  → only a small number of materially important whole-system / external-boundary paths

Practical Test
  → operated/human/environment properties that automated tests cannot credibly establish alone
```

Do not use E2E as the default proof for every Slice merely because the Slice is vertical.

### Override Rule

These are strong defaults, not mechanical taxonomy.

If a property cannot be credibly observed at the default layer, select the cheapest broader or narrower layer that can actually prove it and record why.

## Upstream Source Contract

### Direct Semantic Sources
```text
Scenario Acceptance
Behavior Items
Scenario DATA
local/shared Requirements / negative guarantees
Domain Verification Meaning when present
Slice Useful Vertical Result Definitions / selected Slice portfolio
```

### Inherited Lineage
```text
Fundamental Need / selected solution / Application Definition through semantic owners
```

### Evidence / Current-State Sources
```text
planned Domain Test Designs / Domain proof dispositions
existing local/Slice Test Designs when revising Strategy
existing test infrastructure / actual coverage Evidence
known production/runtime failure Evidence
```

### Constraint / Planning-State Sources
```text
correctness/risk goals
environment/data/isolation/harness constraints
```

### Source Discovery Rule
Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

## Question Set Examples — Non-Exhaustive

Examples only. Current `TF-06 QUESTION_SET` may add/remove/split/merge questions.

```text
Which proof responsibilities are genuinely shared?
Which Slice orchestration/vertical paths require integration proof?
Which isolated complex business/Domain rules deserve focused unit proof?
Which layer should own each remaining class of proof?
What must not be duplicated at every layer?
What data/fixture/reset/isolation policy matters?
For each selected Slice/Domain proof, which concrete test suite/class is expected to own realization?
Which setup/fixture/harness/helper responsibilities are intentionally shared across proofs?
Can a maintainer answer “where and how is this Slice tested?” without reverse-engineering the whole tests tree?
Would a registry-like Test Realization Map communicate the cross-owner topology better than code alone?
Which E2E or Practical paths are genuinely critical?
Which proof belongs to Test Design vs Practical Test?
What evidence states/reporting are needed?
```

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Primary reusable Lens Pack(s):
- [`LENS-TEST-PROOF-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md) — required

Frequent conditional Lens(es):
- [`LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`](../lenses/frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md) — when candidate structure may contain avoidable abstractions/entities/steps/test machinery; simplify only after checking global/local evolution constraints
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — proof/observation/operation constraints affect strategy
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — material quality risks drive shared proof
- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) — test dependency/fixture/environment structure has material blast radius

## Target-Specific Output Template

Generic IDTSPE state is not repeated here.

**Strategy Scope / Semantic Owners** — exact result/owner set whose proof responsibility needs coordination.  
**Proof Goals** — classes of correctness/evidence the strategy must cover.  
**Layer Responsibility Matrix** — where unit/domain/integration/E2E/practical proof belongs and why; by default Slice orchestration/cross-owner collaboration is integration-tested, while isolated complex business/Domain logic is unit-tested.  
**Shared Test DATA / Fixtures / Isolation** — reusable setup/reset responsibilities when material.  
**Critical End-To-End / Practical Paths** — only genuinely high-value paths needing broad proof.  
**Non-Duplicated Coverage Boundary** — what each layer explicitly leaves to another; unit tests should exhaust isolated rule space while integration tests focus on orchestration/wiring/result rather than duplicating all unit cases.  
**Harness / Helper Boundaries** — shared testing infrastructure responsibility when independently material.  
**Test Realization / Topology Registry** — when useful, a compact cross-Slice/Domain map from semantic proof owner → test suite/class → setup/fixture/harness/helper; include PLANNED vs CURRENT/IMPLEMENTED state when material. This is a coordination/read-path artifact, not a copy of test code.  
**Evidence States** — how planned/executed/stale/missing evidence is represented.

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-TSTRAT-01
CONTENT_KIND: TEST_STRATEGY
WHEN: shared proof responsibility/layer allocation is selected
GUIDANCE: REQUIRED_IF_TARGET_EXISTS
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Test Strategy Target
REPRESENTATION: STRATEGY_ARTIFACT_WITH_OPTIONAL_REGISTRY_SECTION_OR_PROMOTED_SUPPORTING_MAP
FILE_OR_ARTIFACT: <test-strategy-owner> and optional <test-realization-map-artifact>
CONTENT: shared proof responsibilities; default unit-vs-integration allocation; Slice orchestration integration paths; isolated-rule unit proof; critical E2E paths; practical-vs-automated allocation; optional cross-Slice/Domain Test Realization Registry mapping proof owner to test suite/class/setup/fixture/harness/helper without duplicating code
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-TSTRAT-02
CONTENT_KIND: SHARED_TEST_ENVIRONMENT_DATA
WHEN: environment/data/fixture plan is large/reusable across many proofs
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Test Strategy/supporting test owner
REPRESENTATION: SUPPORTING_ARTIFACT
FILE_OR_ARTIFACT: <shared-test-data-or-environment-artifact>
CONTENT: reusable environment/data/fixture setup; referenced by designs
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED when shared proof strategy is material/downstream-consumed** — persist one canonical Test Strategy owner describing shared proof responsibilities/layers/critical paths.

When the useful Strategy meaning includes the cross-owner realization topology, keep a **Test Realization / Topology Registry section** in that Strategy by default. It may reference concrete test suites/classes, setup/fixture/harness classes, helpers and their consumer Slices/Domain proofs. This information is often poorly represented by code alone because the important meaning is the relation across distributed test files/owners.

Do **not** turn the registry into shadow code: reference names/paths/packages where useful, but do not duplicate test bodies, assertions, method inventories or obvious class structure.

If the registry becomes independently large/reviewed/reused, Documentation / Representation + `P-14` may promote it to a supporting registry-like artifact such as `<test-realization-map-artifact>` / `TEST-REALIZATION-MAP.md`. The Test Strategy remains semantic owner of the shared proof allocation; the supporting map does not become behavior authority.

If no shared strategy Target is needed, do not create a strategy or registry file merely for ceremony; local proof planning can remain in Test Design/Slice owners and code/tests.

**PREFERRED supporting artifacts** for large environment/data matrices only when independently reused/reviewed; the same pressure-driven split rule applies to a large Test Realization Map.

`P-14` must distinguish shared strategy content, optional realization-registry representation, local Test Design content and unresolved supporting-artifact needs.

## Theoretical Testing Reference — Conditional

When the processed Test Module/Lens does not yet answer a materially detailed testing question, the raw snapshot package [`../../../theoretical-modules/testing/README.md`](../../../theoretical-modules/testing/README.md) may be consulted as theory/reference. It does not override this Target Module and is not read mechanically on every invocation.

## Guard

Testing Strategy never becomes behavior authority and should be skipped when proof ownership is simple/local. A Test Realization Registry maps proof responsibility to implementation/testing owners; it never makes test classes/helpers semantic authority over Scenario/Domain/Slice meaning.

## Handoff

Selected proof responsibilities/layer boundaries → per-Slice `TM-IMPLEMENTATION-SLICE` + `TM-TEST-DESIGN`, `TM-PRACTICAL-TEST` when operated Evidence is required, and shared harness/Cross-Cutting planning only when independently material.

A Strategy instance may be revisited when new Slices, new Domain proof responsibilities or actual Coverage Evidence materially change shared proof allocation.
