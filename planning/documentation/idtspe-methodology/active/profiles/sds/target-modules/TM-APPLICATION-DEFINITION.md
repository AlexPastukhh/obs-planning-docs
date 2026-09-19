# TM-APPLICATION-DEFINITION — Application Definition

Entry Point: `tm.application.definition`  
Role: primary Target Module  
Target form: selected own-application definition

## Purpose

Define one coherent own-application contribution:

```text
what application/contribution we are building
+ why custom software is still justified
+ which core real-life paths justify its existence
+ what is inside/outside its responsibility
+ whether the concept/boundary is plausibly realizable
```

Concept, responsibility boundary, proportional existing-solution research, optional refined core real-life scenario and proportional feasibility are aspects of one Application Definition Target.

Use this Target when Application need/value/contribution, responsibility boundary or feasibility is materially unsettled or challenged. Application Definition is upstream intent/value authority and may intentionally lead downstream realization.

## Temporal Authority / Evolution-Step Hosting

Application Definition is the upstream **need/value/contribution authority**. It is not a realized-current-state owner analogous to Feature/Scenario/Screen/Domain/Slice/Shared.

```text
Application Definition
= selected + possible Application needs / Benefits / contribution / boundary intent

Selected Application intent
≠ downstream capability already realized
```

Use stable addressable `AB-*` when independent downstream reference is useful. Each Benefit may carry:
- `Selected` — accepted Application value/need that may drive downstream planning;
- `Possible` — plausible value/need retained for exploration/revalidation but not selected.

`Selected/Possible` is planning/epistemic state, not semantic time or realization status.

When Application meaning changes, refine this owner **directly**. Do not route it through `Evolution Impact`, `Target Application Body`, `CREATE/REPLACE/RETIRE` materialization or current-owner reverse Step references.

Evolution Steps may record `Driven By` references to selected `AB-*` / contribution / boundary intent, but Application Definition is neither semantic Entry State nor a Step-owned Target Body.

## High-Level Example — Self-Contained Walkthrough

### Situation

A person doing research repeatedly finds useful fragments in articles. Existing bookmarks are too coarse, copying into a notes app interrupts reading, and the team is considering building a small capture application.

At this point there is a real Need and a selected real-life problem space, but it is still unclear whether custom software is justified and what the application should actually own.

### Why This Module

`TM-APPLICATION-DEFINITION` is used because the question is not yet “how should the app behave in detail?” or “what classes should we implement?”.

The current questions are higher-level:

```text
Should we build anything?
What existing alternatives are good enough?
What are the few core real-life paths the application must support?
What responsibility belongs inside the app?
What should deliberately remain outside?
```

### Walkthrough

Research may compare:

```text
browser bookmarks
read-later tools
general note applications
existing highlight/capture tools
custom low-friction capture
hybrid: existing tool + small integration
```

Suppose the evidence shows that existing tools save material, but all require enough context switching that they fail the accepted low-interruption Need.

The Application Definition may then refine the real-life route:

```text
user notices a useful fragment
→ preserves fragment + source context quickly
→ continues reading
→ later returns to a temporary review inbox
→ decides what deserves long-term storage
```

The module can select:

```text
Inside Application:
  temporary low-friction capture
  later review/triage

Outside Application:
  full long-term knowledge management
  replacing the user's existing notes system
```

A feasibility check may confirm that capturing selected text and source context is technically realistic without yet designing the final architecture.

### Result

The result is a coherent Application Definition containing:

```text
why custom software is still justified
core vs secondary real-life scenarios
selected application responsibility boundary
owned vs merely consumed information/state
optional Refined Core Real-Life Scenario
material feasibility findings
```

When this walkthrough describes desired Application intent that is not yet realized downstream, the Application Definition may still state that selected intent directly. Concrete unrealized downstream behavior/realization changes are then planned in Evolution Steps and may use this definition as an upstream driver.

### Boundary / Lesson

This module does not define detailed Application Scenarios, Screens, Domain objects or implementation calls.

A competitor feature is Evidence/Proposal material, not automatically selected Feature behavior or a Requirement for our application.

## Upstream Source Contract

### Direct Semantic Sources
```text
Fundamental Need / Desired Outcome
selected real-world solution result(s) when generic discovery was performed
selected own-software contribution / Solution Slot
OR trusted explicit Application intent/contribution when generic discovery can be skipped
surrounding human/process/external-system responsibilities
viable manual/existing/external alternatives
```

### Inherited Lineage
```text
Current Reality / Success Meaning
current real-world workflow
```

### Evidence / Current-State Sources
```text
real-life route comparison/Evidence when available
existing-solution / market / reference research
actual product docs/demos/reviews when relevant
Prototype Evidence when available
current application/workspace Evidence when reviewing an existing product
later Feature/Scenario/Screen/Domain/Slice/Shared implementation Evidence for revalidation
```

### Constraint / Planning-State Sources
```text
accepted constraints / non-goals
ownership/privacy/integration constraints
performance/data-volume/operational constraints when material
accepted architecture Answer Decisions when reviewing an existing application
```

### Source Discovery Rule
Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

## Unit Resolution Guidance / Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md). The Application family has some shared principles, but substantial theory/reference material is attached to the Unit that consumes it rather than treated as one undifferentiated module-wide bridge.

```text
RU-APP-01 Application Identity / Selected Contribution
  Drivers:
    What exact real-world contribution/result is assigned to this Application?
    What user/actor value justifies it?
  Knowledge Basis:
    embedded Application-definition contribution/boundary principles

RU-APP-02 Existing-Solution / Reference Position
  Drivers:
    Does an existing solution already satisfy the Need well enough?
    Which substitutes/references matter, and is build/buy/adapt/integrate/hybrid justified?
  Knowledge Basis:
    application-definition-existing-solutions-market-reference-research.md
    Reference-only use is valid when the application is obvious; add applied interpretation only when needed for this Unit.

RU-APP-03 Core Real-Life Scenario Position
  Drivers:
    Which 1–few core real-life scenarios justify the Application?
    Which routes are secondary/supporting?
    Which route best fits the Fundamental Need?
  Knowledge Basis:
    application-definition-refined-core-real-life-scenario.md when stronger application-aware refinement is material

RU-APP-04 Application Concept
  Drivers:
    What concept makes the selected contribution coherent?
    Which concept/route follows from current Unit results and accepted constraints?
  Knowledge Basis:
    selected outputs of RU-APP-01..03 + embedded Application-definition principles

RU-APP-05 Responsibility Boundary
  Drivers:
    Which responsibilities/state are inside vs outside?
    Which handoffs cross the boundary?
    Which tempting responsibilities are responsibility creep?
  Knowledge Basis:
    embedded authority/boundary principles; use reusable ownership Lenses when triggered

RU-APP-06 Realization Feasibility
  Drivers:
    Can representative behavior be realized without pathological complexity?
    Which persistence/integration/consistency/performance/operational constraints can change the concept/boundary?
    Does Evidence narrow/broaden/reject the selected contribution?
  Knowledge Basis:
    applicable implementation/evolution/proof Lenses and Evidence; no separate theory load when they add no value
```

Concrete `TF-06 QUESTION_SET` coordinates the material current Unit drivers plus any genuine Target-wide question; the reusable prompts above do not automatically become USER questions or formal Question State.

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Primary reusable Lens Pack(s):
- [`LENS-APPLICATION-BOUNDARY-FEASIBILITY`](../lenses/reusable/LENS-APPLICATION-BOUNDARY-FEASIBILITY.md) — required for this Target profile

Frequent conditional Lens(es):
- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) — when an existing structured application/workspace dependency surface matters
- [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) — when accepted/planned evolution can materially change the Application boundary or feasibility
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — when feasibility depends on proof/diagnosis/operation
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — only material quality/risk dimensions

## Resolution / Production Method

This module uses the existing `Upstream Source Contract`, `Question Set Examples`, `Lens Profile`, Knowledge Basis and any module-specific Proposal/branch/pattern aids to produce/refine the declared Result Units. Concrete Questions, Proposals, Q/R/P, Decisions and Evidence remain Core State Units.

Default reusable production path:

```text
stabilize selected real-world contribution → research existing solutions/references proportionally → refine core real-life scenario position → define Application Concept and responsibility boundary → test realization feasibility → resolve material alternatives through normal Proposal/Branch/Decision state
```

Material alternative comparisons are Resolution/Production state until selected; they are not a separate Result Unit by default.

A Lens may surface Finding Candidates while this method runs. Their State/lifecycle/owner destination is resolved by the Core [`Finding Disposition Contract`](../../../idtspe-core/shared/finding-disposition-contract.md); a Lens does not directly mutate accepted Result Units.

## Unit Contract Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/shared/target-module-model.md) and [Unit / Target Step Result Model](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md). The Core owners define generic Unit lifecycle, complete-inventory/disposition and Proposal/Core-State semantics; this module defines only its SDS-specific Unit responsibilities, local materiality, production guidance, validators and handoffs below.

## Target Step-Result Contract

**Target Step Result:** `Application Definition`

The six Module-defined Result Units are the complete Application Definition Unit inventory. Their content remains proportional: resolve material meaning, keep unresolved material explicit as `OPEN`, and give a concise omission disposition when a Unit is not material/applicable. Generic IDTSPE State is not duplicated as target-specific fields.

| Result Unit | Meaning | Current projection detail |
|---|---|---|
| `RU-APP-01` | Application Identity / Selected Contribution | Application Definition Identity |
| `RU-APP-02` | Existing-Solution / Reference Position | Existing Solutions / Market / Reference Research |
| `RU-APP-03` | Core Real-Life Scenario Position | Core Real-Life Scenario Inventory + optional Refined Core Real-Life Scenario |
| `RU-APP-04` | Application Concept | Application Concept |
| `RU-APP-05` | Responsibility Boundary | Responsibility Boundary |
| `RU-APP-06` | Realization Feasibility | Realization Feasibility |

### Result Unit Applicability / Materiality

Unit presence/disposition mechanics follow the Core [`Unit Applicability / Materiality / Disposition Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--disposition-contract). The table below owns only this module's local substantive-materiality and omission-rationale triggers.

| Result Unit | Substantive resolution is material when | Explicit omission disposition when not material |
|---|---|---|
| `RU-APP-01` | always once an Application Definition Target is formed; its identity/contribution anchors the Target | no Unit-level omission after Target formation; keep the minimum identity/contribution anchor, and keep unresolved material explicit as `OPEN` |
| `RU-APP-02` | when build/buy/adapt/integrate/reference position can change the selected contribution or feasibility | omit when trusted existing-solution context is already sufficient and adds no decision value |
| `RU-APP-03` | when concrete real-life paths are needed to test the Application concept/boundary | omit detailed/refined scenarios when a small path inventory already establishes the necessary context |
| `RU-APP-04` | always once an Application Definition Target is formed; the Application concept is a core responsibility of this Target | no Unit-level omission after Target formation; keep unresolved concept meaning explicit as `OPEN` rather than treating Target non-formation as a Unit disposition |
| `RU-APP-05` | when inside/outside responsibility is material to feasibility, ownership or downstream planning | keep implicit only when the boundary is already unambiguous from accepted owner meaning |
| `RU-APP-06` | when feasibility can change the concept, responsibility boundary or build/adapt/integrate position | omit when feasibility is routine/trusted and cannot materially change the selected concept |


Result Unit identity does not imply a separate Target or file. Generic Unit presence/disposition remains Core-owned.



### Application Definition Identity

**Application Definition ID** — stable identity.

**Selected Real-World Contribution** — exact Step-02 result/slot delegated to this Application.

### Existing Solutions / Market / Reference Research

**Research Depth / Intent** — `MINIMAL_REFERENCE_CHECK`, `COMPARATIVE_SOLUTION_RESEARCH` or `MARKET_AND_COMPETITOR_RESEARCH`, with reason.

**Existing Solution / Substitute Findings** — material alternatives and what Need/result they already cover.

**Reference Applications / Patterns** — useful products/flows explicitly marked as Evidence/Proposals rather than requirements.

**Build / Buy / Adapt / Integrate Position** — why custom Application planning continues, or why the current result should challenge Step-02 when another route is sufficient. Actual Step-02 revalidation/reopen is a Core Finding Disposition consequence.


### Core Real-Life Scenario Inventory

Classify the real-life paths for which the Application may exist:

```text
CORE
  without this path/result the Application loses substantial reason to exist

SECONDARY
  useful/supporting/conventional, but not the reason it exists
```

Secondary scenarios may resemble common functionality in other products; they do not become core merely because competitors have them.

### Refined Core Real-Life Scenario — Optional Strong Refinement

When market/reference research + Application Concept comparison justify extra depth, define the selected application-aware real-life route:

```text
Real-Life Scenario ID / Name
Fundamental Need
Actor / context
Starting situation
Desired real-world result
real-life path:
  actor/manual/external steps
  own-Application contribution
  handoffs
  final result
Application role
outside-Application responsibilities
relevant alternatives
friction/constraints
why selected
Evidence/references
```

This is **not** the detailed Application Scenario phase: no detailed Feature behavior, Scenario journey or Screen decomposition is required here.

Source precedence:

```text
Refined Core Real-Life Scenario exists
→ preferred nearest real-life Source for Prototype / Scenario Planning

otherwise
→ Step-02 selected solution result remains the direct real-life Source
```


### Application Concept

**Concept Statement** — what the Application is and how it improves/simplifies the selected real-world solution.

**User/Actor Value** — what users can do/know/obtain because it exists.

**Concept-Level Capabilities / Features — optional** — named concept elements only when addressability helps; they are not automatically Scenarios/Slices.

**Interaction Hypotheses — optional** — early interaction ideas, not canonical Scenario/Screen behavior.

### Responsibility Boundary

**Inside** — results/responsibilities owned by the Application.

**Outside** — responsibilities intentionally not owned.

**Actors / External Participants** — surrounding humans/processes/systems.

**Owned Information / State** — semantic state the Application actually owns.

**Consumed / Displayed / Passed-Through Information** — used without stealing authority.

**Handoffs** — meaningful boundary crossings.

**Boundary Invariants / Non-Goals** — conditions protecting the responsibility boundary.

### Realization Feasibility

**Representative Feasibility Paths — proportional** — only enough technical reasoning to test viability.

**Material Constraints / Costs** — complexity/ownership/integration/operation findings able to change the definition.

**Feasibility Conclusion** — supports/narrows/broadens/challenges current definition.

Detailed whole-Slice discovery belongs to `TM-IMPLEMENTATION-SLICE`; exact call-level realization belongs to Core Exact.

### Alternatives / Comparison

Compare realistic full real-life routes/concepts rather than only feature lists.


### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5b-unit-applicability-envelope--opening--in-unit--closing-checkpoints). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-APP-01` processing envelope

1. **Opening Unit Checkpoint — `RU-APP-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-APP-01`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-01`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-APP-02` processing envelope

1. **Opening Unit Checkpoint — `RU-APP-02`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-APP-02`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-02`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-APP-03` processing envelope

1. **Opening Unit Checkpoint — `RU-APP-03`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-APP-03`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-03`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-APP-04` processing envelope

1. **Opening Unit Checkpoint — `RU-APP-04`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-APP-04`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-04`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-APP-05` processing envelope

1. **Opening Unit Checkpoint — `RU-APP-05`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-APP-05`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-05`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-APP-06` processing envelope

1. **Opening Unit Checkpoint — `RU-APP-06`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-APP-06`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-06`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-APP-01
CONTENT_KIND: APPLICATION_DEFINITION
WHEN: accepted Application Definition is used downstream
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: TM-APPLICATION-DEFINITION / Application Definition owner
REPRESENTATION: CURRENT_OWNER_OR_EVOLUTION_STEP_REPRESENTATION
FILE_OR_ARTIFACT: <application-definition-owner-or-evolution-step-owner>
CONTENT: concept; responsibility boundary; build/buy/adapt/integrate position; core/secondary real-life scenario inventory; feasibility conclusion
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-APP-02
CONTENT_KIND: MARKET_REFERENCE_EVIDENCE
WHEN: research is substantial, volatile, or independently reviewable
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Application Definition as semantic consumer; Evidence remains Evidence
REPRESENTATION: SUPPORTING_EVIDENCE_ARTIFACT
FILE_OR_ARTIFACT: <application-reference-research-artifact>
CONTENT: material comparison sources/findings/evidence without turning competitor behavior into application truth
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-APP-03
CONTENT_KIND: REFINED_CORE_REAL_LIFE_SCENARIO
WHEN: refined route is reused/reviewed independently
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Application Definition
REPRESENTATION: EMBED_OR_SEPARATE_ADDRESSABLE_ARTIFACT
FILE_OR_ARTIFACT: <application-definition-owner> or <refined-real-life-scenario-artifact>
CONTENT: application-aware real-life route; actor/context; manual/external/application steps; result
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED** — an accepted Application Definition used downstream must have one canonical persistent representation when persistence is material. It remains the upstream semantic owner even when downstream realization lags behind the selected intent.

**PREFERRED** — substantial market/reference research may use a supporting Evidence artifact when it is too large/volatile for the canonical Application Definition. Research observations surface Finding Candidates; Core Finding Disposition may resolve accepted material as Evidence/Proposals or another appropriate State, but never as a second application-semantic owner merely because it came from reference research.

**OPTIONAL separate artifact** — a Refined Core Real-Life Scenario may be embedded in the Application Definition or receive separate addressability when it is reused/reviewed independently by Prototype/Scenario Planning.

**Keep embedded by default** — concept statement, responsibility boundary and feasibility conclusion belong to the Application Definition owner rather than separate files per field.

`P-14` must show the exact/logical destination of each accepted/supporting item and mark unresolved placement explicitly.

## Validators

```text
traces to Fundamental Need + Step-02 contribution
obvious existing solutions were proportionally checked
custom build remains knowingly justified or a material challenge is dispositioned to Step-02 revalidation/reopen
core real-life scenarios explain why the Application exists
secondary scenarios remain visibly secondary
refined real-life scenario, when present, is not an Application Scenario
concept + responsibility + feasibility form one coherent owner
references seed Evidence/Proposals rather than requirements
later Evidence may challenge the same Application Definition; Core Finding Disposition may select revalidation/reopen
```

## Handoff

```text
TM-FEATURE
TM-SCENARIO-PLANNING
TM-SCREEN when application-wide spatial context is useful
TM-PROTOTYPE when empirical pre-commit inquiry is useful
TM-DOMAIN-DISCOVERY / TM-IMPLEMENTATION-SLICE when later implementation ownership requires bounded discovery
```

Material architecture/change questions may use the Core/SDS Lens aliases L4/L5/L6 inside the current Target; these Lens aliases are not `PL-L*` planning-depth identities. When the problem has independently useful output and choice/revalidation depth, surface a Target Formation candidate; Target Formation decides reuse/handoff/new bounded Target.
