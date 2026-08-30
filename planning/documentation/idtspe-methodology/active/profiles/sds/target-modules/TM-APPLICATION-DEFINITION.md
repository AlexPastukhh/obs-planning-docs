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

This becomes a Source for Prototype and Scenario Planning.

### Boundary / Lesson

This module does not define detailed Application Scenarios, Screens, Domain objects or implementation calls.

A competitor feature is Evidence/Idea material, not automatically a Requirement for our application.

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
later Scenario/DATA/Behavior/Domain/Slice Evidence for revalidation
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

## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `HYBRID`

**Embedded Principles / Rules / Theory:**

- Application Definition distinguishes the selected real-world contribution from detailed Scenario/Screen/Domain/implementation meaning.
- Existing-solution/reference research informs build/buy/adapt/integrate positioning without turning competitor features into Requirements.
- Core vs secondary real-life scenario classification and refined real-life route are Target-family planning knowledge.

**Referenced Knowledge Owners:**

- [`application-definition-existing-solutions-market-reference-research.md`](../shared/application-definition-existing-solutions-market-reference-research.md)
- [`application-definition-refined-core-real-life-scenario.md`](../shared/application-definition-refined-core-real-life-scenario.md)

**Reference Load Policy:**

Read the market/reference guide when comparative/market research depth is material. Read the refined core-real-life-scenario guide only when the selected core route needs the stronger application-aware refinement.

**Operationalization Notes:**

This Knowledge Basis supports planning this recurring Target/result family. It is not a current Target Source, project truth or Decision. Reusable cross-Target evaluation knowledge remains in the Lens owners named by this module's `Lens Profile`; do not duplicate their Operational Evaluation Contract or Knowledge Basis here.

## Question Set Examples — Non-Exhaustive

Examples only. Current `TF-06 QUESTION_SET` may add/remove/split/merge questions.

```text
Does an existing solution already satisfy the Need well enough?
What research depth is proportional?
Which direct alternatives/substitutes/adjacent references matter?
Should we use/buy/adapt/integrate/hybrid instead of build?

Which 1–few core real-life scenarios are the main reason this Application should exist?
Which routes are secondary/supporting only?
How does the full real-life path look with manual/current, existing app, workaround, Concept A/B or hybrid?
Which route best fits the Fundamental Need?

What exact real-world result/contribution is assigned to the Application?
What user/actor value justifies the concept?
Which responsibilities are inside vs outside?
What state/information must the Application own vs merely consume/display/pass through?
Which handoffs cross the boundary?
Which tempting responsibilities are responsibility creep?

Can representative behavior plausibly be realized without pathological complexity?
Which persistence/integration/consistency/performance/operational constraints can change the concept/boundary?
Does feasibility Evidence narrow/broaden/reject the Application contribution?
```

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

This module uses the existing `Upstream Source Contract`, `Question Set Examples`, `Lens Profile`, Knowledge Basis and any module-specific Idea/branch/pattern aids to produce/refine the declared Result Units. Concrete Questions, Ideas, Q/R/P, Decisions and Evidence remain Core State Units.

Default reusable production path:

```text
stabilize selected real-world contribution → research existing solutions/references proportionally → refine core real-life scenario position → define Application Concept and responsibility boundary → test realization feasibility → resolve material alternatives through normal Idea/Branch/Decision state
```

Material alternative comparisons are Resolution/Production state until selected; they are not a separate Result Unit by default.

A Lens may surface Finding Candidates while this method runs. Their State/lifecycle/owner destination is resolved by the Core [`Finding Disposition Contract`](../../../idtspe-core/shared/finding-disposition-contract.md); a Lens does not directly mutate accepted Result Units.

## Target Step-Result Contract

**Target Step Result:** `Application Definition`

The possible result surface is proportional/sparse. Generic IDTSPE State is not duplicated as target-specific fields.

| Result Unit | Meaning | Current projection detail |
|---|---|---|
| `RU-APP-01` | Application Identity / Selected Contribution | Application Definition Identity |
| `RU-APP-02` | Existing-Solution / Reference Position | Existing Solutions / Market / Reference Research |
| `RU-APP-03` | Core Real-Life Scenario Position | Core Real-Life Scenario Inventory + optional Refined Core Real-Life Scenario |
| `RU-APP-04` | Application Concept | Application Concept |
| `RU-APP-05` | Responsibility Boundary | Responsibility Boundary |
| `RU-APP-06` | Realization Feasibility | Realization Feasibility |

Only applicable/material Result Units are projected for one concrete Target step. Result Unit identity does not imply a separate Target or file.



### Application Definition Identity

**Application Definition ID** — stable identity.

**Selected Real-World Contribution** — exact Step-02 result/slot delegated to this Application.

### Existing Solutions / Market / Reference Research

**Research Depth / Intent** — `MINIMAL_REFERENCE_CHECK`, `COMPARATIVE_SOLUTION_RESEARCH` or `MARKET_AND_COMPETITOR_RESEARCH`, with reason.

**Existing Solution / Substitute Findings** — material alternatives and what Need/result they already cover.

**Reference Applications / Patterns** — useful products/flows explicitly marked as Evidence/Ideas rather than requirements.

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

This is **not** the detailed Application Scenario phase: no full DATA/Behavior/Screen decomposition is required here.

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

Detailed call-level implementation belongs to Slice planning.

### Alternatives / Comparison

Compare realistic full real-life routes/concepts rather than only feature lists.

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
SEMANTIC_OWNER: current Application Definition Target
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <application-definition-owner>
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

**REQUIRED** — an accepted Application Definition used downstream must have one canonical persistent artifact owner (existing or new). Its concept, responsibility boundary, build/buy/adapt/integrate position and current core-real-life-scenario inventory must not exist only in chat history.

**PREFERRED** — substantial market/reference research may use a supporting Evidence artifact when it is too large/volatile for the canonical Application Definition. Research observations surface Finding Candidates; Core Finding Disposition may resolve accepted material as Evidence/Ideas or another appropriate State, but never as a second application-semantic owner merely because it came from reference research.

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
references seed Evidence/Ideas rather than requirements
later Evidence may challenge the same Application Definition; Core Finding Disposition may select revalidation/reopen
```

## Handoff

```text
TM-PROTOTYPE
TM-SCENARIO-PLANNING
TM-SCREEN when application-wide journey/spatial context is useful
TM-SLICE-STRATEGY through Scenario/Domain lineage
```

Material architecture/change questions use L4/L5/L6 inside the current Target. When the problem has independently useful output and choice/revalidation depth, surface a Target Formation candidate; Target Formation decides reuse/handoff/new bounded Target.
