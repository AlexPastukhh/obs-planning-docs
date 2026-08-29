# SDS Full Map — IDTSPE Core
  Target Step Result / Unit + Finding Disposition + SDS Profile + Files + Directed Workflow

Status: active canonical whole-picture map for the current SDS profile  
Purpose: provide one self-contained map of how generic IDTSPE and SDS-specific planning fit together.

## 1. Whole Picture

```text
IDTSPE Core
  Shell / Target Formation / Decisions / Lenses / Artifact Placement / Revalidation
↓
SDS Profile
  16 Target Modules
  + SDS-specific Lens pack
  + directed workflow/readiness
  + Documentation / Representation policy
  + annotated Artifact Materialization Tree / topology coordinator
  + SDS command surface
↓
concrete SDS planning workspace
  durable owner representations
  + Ideas / Evolution / Workspace Evolution
↓
repeated IDTSPE Target invocations
↓
implementation / Evidence
↓
selective revalidation
```

Generic IDTSPE Core is owned at [`../../idtspe-core/README.md`](../../idtspe-core/README.md). This file owns the **SDS projection**, not generic Shell semantics.


Core runtime invariant for the whole profile:

```text
SDS Target Module
= Target-specific configuration of an IDTSPE iteration

SDS Lens
= evaluation/check inside an IDTSPE Target iteration

Directed SDS workflow
= directed graph of IDTSPE Target iterations,
  not a second workflow runtime beside IDTSPE
```

## 2. SDS Target Module Catalog

Current profile installs 16 Target Modules:

```text
Solution/Application
  TM-APPLICATION-DEFINITION
  TM-PROTOTYPE

Scenario/Spatial
  TM-SCENARIO-PLANNING
  TM-SCREEN
  TM-REQUIREMENT — exceptional shared must-hold only

Domain
  TM-DOMAIN-DISCOVERY
  TM-DOMAIN-DRAFT

Workspace / Architecture Evolution
  TM-WEUC

Delivery
  TM-SLICE-STRATEGY
  TM-IMPLEMENTATION-SLICE
  TM-FRONTEND-SLICE — promoted only when independently material
  TM-CROSS-CUTTING-CONCERN — genuine shared non-vertical owner only

Testing / Evidence
  TM-TEST-DESIGN
  TM-TEST-STRATEGY — conditional shared coordination
  TM-PRACTICAL-TEST
  TM-TEST-COVERAGE
```

Canonical registry: [`target-modules/README.md`](target-modules/README.md).

Scenario DATA and Behavior Items are internal addressable contracts of `TM-SCENARIO-PLANNING`, not extra Target Modules.

## 3. Lens Composition

Every material SDS Target uses the generic required Core Pack proportionally:

```text
L1 Need / Value / Scope
L2 Authority / SoT / Reuse
L3 Uncertainty / Assumption / Reversibility
Documentation / Representation / Artifact Boundary
  required at materialization; may choose code/existing owner/catalog/strategy/dedicated artifact/generated view/none
```

SDS-specific lenses add:

```text
Application Boundary / Feasibility
Domain Modeling / DDD
UI / Spatial / Frontend Realization
Slice Verticality / Integration
WEUC / Workspace Evolution / Architecture Fitness + Workspace work-cost
Simplicity / Implementation Economy / Evolution-Safe Simplification
```

Generic reusable lenses commonly used by SDS add:

```text
L4 Dependency & Change Impact
L6 Verifiability / Observability / Operability
Quality / Risk Materiality
Shared / Cross-Cutting Responsibility
Test Proof / Evidence
Practical Evidence
Artifact Boundary / Addressability
```

See [`lenses/README.md`](lenses/README.md) and the global Lens registry at [`../../idtspe-core/lenses/README.md`](../../idtspe-core/lenses/README.md). The raw detailed Testing package is deliberately separate at [`../../theoretical-modules/testing/README.md`](../../theoretical-modules/testing/README.md): it is reference theory, not an 18th Lens or another Test Target Module.

## 4. Directed Workflow — Not A Rigid Phase Script

The fixed direction is a partial order with conditional branches:

```text
Need / Reality
↓
real-life solution Targets / route comparison
↓
Application Definition
↓
Scenario Planning — one Target per independently meaningful Scenario; boundary discovery is internal to evaluation
↓
optional Screen / shared Requirement
↓
optional Domain Discovery
↓
Domain Draft per material owner
↓
per-Domain Test Design when proof responsibility is material
↓
Slice Strategy / selected Slice portfolio
↓
conditional Test Strategy
↓
Implementation Slice per Slice
↔
per-Slice Test Design
↓
realization / execution
↓
Practical Test when operated Evidence is needed
↓
Test Coverage
↓
selective Revalidation / narrow reopen
```

`TM-WEUC` and the WEUC Lens are cross-cutting. The global Workspace Evolution Map can start once enough product/evolution direction exists and is refreshed as Domain/Slice/implementation knowledge improves.

Canonical sequencing/readiness owner: [`shared/directed-methodology-workflow-and-next-step-resolution.md`](shared/directed-methodology-workflow-and-next-step-resolution.md).

## 5. Testing Direction

SDS testing deliberately does not begin with one global Test Strategy ritual.

```text
Domain Draft / owner A
→ Test Design / owner A
  unit tests by default for isolated complex business/domain rules

Domain Draft / owner B
→ Test Design / owner B

material Domain proof responsibilities resolved
+ Slice portfolio selected
↓
TM-TEST-STRATEGY — only when shared proof coordination is useful
  → may keep a compact Test Realization / Topology Registry:
    Slice/Domain proof → test suite/class → setup/fixture/harness/helper
  → promote that registry to a separate supporting map only when independently large/reused
↓
per Slice:
  Implementation Slice ↔ Slice Test Design
  integration tests by default for vertical orchestration/collaboration
```

E2E is selective for broader whole-system boundaries. Practical Test covers human/operational/environmental evidence that ordinary automated proof cannot establish credibly.

## 6. Workspace Evolution And Global Architecture

`TM-WEUC` owns:

```text
SDS-PLANNING-STATE/SDS-WORKSPACE-EVOLUTION.md
```

including:

```text
Current Global Architecture Position
  project-wide decisions
  principles/defaults
  DDD/domain posture
  vertical Slice/decomposition posture
  folder/package conventions
  dependency rules
  shared-vs-local defaults
  adapter/integration conventions

Future Workspace Evolution
  probable/planned paths
  prepared extension points
  transition triggers
```

The WEUC Lens can evaluate:

```text
one Domain Target
one Slice Target
one Frontend/Cross-Cutting Target
or Target = whole Workspace architecture
```

Local architecture decisions remain local unless they should constrain several independent future Targets. Then L5 surfaces a promotion/update Finding Candidate with `TM-WEUC` as a likely-owner hint; Core Finding Disposition resolves the actual global owner/handoff before the project-global architecture position changes.

Target-local future evolution remains a **Lens perspective**: L5 surfaces Finding Candidate(s); Core Finding Disposition resolves accepted local evolution meaning/owner, and only then `AG-L5-02` may propose an Evolution section or promoted `<owner>.evolution.md` supporting representation. Documentation / Representation + P-14 / TF-10 decide actual materialization. Domain/Slice/Frontend Target Modules own current Target result representation and do not independently propose those future-evolution companions.

L5 also owns the reusable Architecture/Workspace work-cost check: Understanding/Discoverability, Change, Verification/Diagnosis/Operation and Runtime path cost, plus accidental/speculative/legacy complexity classification. No second architecture/work-cost Lens is introduced.

The SDS Simplicity Lens consumes accepted/dispositioned evolution constraints derived from L5 evaluation plus current map/Decision owners, and searches for a smaller current Domain/Slice/Test/Frontend structure — fewer unpaid abstractions, owners, hops or test layers — without destroying planned evolution paths or justified prepared extension points.

## 7. Representation / Physical Materialization

SDS has no one mandatory planning-file tree. A Target Module defines planning semantics; the Documentation / Representation Lens decides whether material output should persist and in what representation class.

```text
IDTSPE semantic result
↓
Documentation / Representation Lens
  no persistence | implementation-native | existing owner section | registry/catalog | strategy/discovery | dedicated owner | companion | global/generated
↓
SDS Artifact Materialization Tree
  possible destination + TM/Lens proposer
↓
P-14 / TF-10
  concrete path/section/code/generated location + action
```

Canonical representation owner: [`../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md).

Annotated SDS projection: [`ARTIFACT-PLACEMENT-MAP.md`](ARTIFACT-PLACEMENT-MAP.md).

Topology coordinator: [`SDS-PHYSICAL-PLANNING-TREE.md`](SDS-PHYSICAL-PLANNING-TREE.md).

The Lens contains the explained compact/promoted-Domain/promoted-Slice/mature-companion/Scenario-heavy/mixed physical-tree examples. This map does not duplicate those explanations.

## 8. Ideas → Decision → Evolution → Owner

```text
Loose Idea
↓
SDS-PLANNING-STATE/ideas/<layer>/IDEAS.md
↓
IDTSPE Target evaluates it when material
↓
selected current meaning
→ natural current owner

accepted future direction
→ SDS-EVOLUTION-MAP.md

Workspace/global architecture implication
→ Finding Candidate + likely TM-WEUC owner hint
→ Core Finding Disposition
→ resolved TM-WEUC owner when warranted
→ SDS-WORKSPACE-EVOLUTION.md
```

The Ideas tree is not a second truth store. It holds loose/unselected possibilities until promoted or retired.

## 9. Repeated IDTSPE As Planning Viewport

A Target is not generated once and forgotten.

```text
existing owner representations
+ current Sources/Evidence
↓
IDTSPE / CREATE|REFINE|EXTEND|REVALIDATE|REPAIR
↓
Target Module + Lens Set
↓
Questions / Ideas / QRP / Decisions
↓
Artifact Placement View
↓
CREATE / UPDATE / REUSE natural representations
↓
Methodology Direction / likely next Target
```

A later invocation reads/resolves those same owner representations and refines/revalidates the same Target when appropriate.

## 10. Q/R/P Priority, Related Groups And Decision Trace

SDS uses the existing IDTSPE `P-09 Q/R/P` port. The Core extension at [`../../idtspe-core/shared/qrp-priority-groups-and-decision-trace.md`](../../idtspe-core/shared/qrp-priority-groups-and-decision-trace.md) optionally adds:

```text
P0 / P1 / P2 / P3 impact priority
related Q/R/P groups when a Question/Risk/Problem share a causal or resolution surface
Decision.Addresses
Decision.Exposes
```

This is lightweight trace/review metadata around existing Q/R/P, not the old Concern/Current-Plan runtime.

## 11. Artifact Placement

Every active SDS Target Module has `AP-* Artifact Proposals`; every reusable Lens has `AG-* Artifact Guidance`.

The concrete IDTSPE instance resolves:

```text
what content is worth preserving
which representation class is simplest/effective
who owns it semantically
where it is stored physically or implementation-natively
CREATE / UPDATE / EMBED / REUSE
or UNRESOLVED_PERSISTENCE / UNRESOLVED_PLACEMENT
```

Current annotated materialization projection: [`ARTIFACT-PLACEMENT-MAP.md`](ARTIFACT-PLACEMENT-MAP.md). The former flattened registry path is compatibility-only.

Generic resolver contract: [`../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md`](../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

## 12. Command Layers

```text
бутстреп idtspe
→ generic IDTSPE Core orientation

бутстреп sds
→ this SDS profile orientation

canonical/focused SDS command
→ one Target Module or reusable Lens route
```

SDS command surface: [`shared/idtspe-command-surface-contract.md`](shared/idtspe-command-surface-contract.md).

Command/helper UI is invocation only and does not become methodology authority.

## 13. Physical Worked Example

[`examples/research-capture/README.md`](examples/research-capture/README.md) demonstrates:

```text
persistent owner creation
Domain Test Design before Slice Strategy
conditional Test Strategy
Slice/Test TDD interleave
Workspace Evolution/global architecture
local .evolution.md companions
repeated IDTSPE refinement
```


## Linked Notes Boundary

SDS does not own a Linked Notes file tree. When cross-owner navigation/backlink/query behavior is proposed, use the Core `LENS-LINKED-NOTES-USAGE-JUSTIFICATION`. Canonical bodies remain in existing owners; Reference Object registry/index infrastructure is a separate technical concern.

## Unit / Lens Conformance

```text
16 SDS Target Modules
→ explicit Result Units

6 SDS-specific Lenses
→ Analysis Surface + ANALYZE/CHECK/REFINE/CHALLENGE
→ Finding Candidates

Core
→ Finding Disposition
→ normal State/lifecycle/owner resolution
```
