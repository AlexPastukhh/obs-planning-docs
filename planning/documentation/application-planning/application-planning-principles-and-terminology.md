# Solution And Application Planning Principles And Terminology

> **Compatibility vocabulary boundary.** This supporting file preserves older application-planning discovery/workspace heuristics. Terms such as `Scenario DATA`, `Behavior Items`, standalone `Requirement`, or `Slice Strategy` below do not define current SDS owner identities. Current authority is the active SDS Target/Lens registries: Feature owns behavior/semantic data, Scenario owns actor/external journey composition with Benefit manifestation/closure, requirements stay with natural Feature/Domain/Slice/Shared owners, and Slice Strategy is not an active Target family. Use older terms only as supporting heuristics where they do not conflict with current owners.


Status: active reusable canonical owner
Scope: stable concepts/invariants for whole-solution/workflow planning, Application Concept/Prototype work, current Scenario/Screen requirements and optional Domain/Slice implementation planning. Generic Q/R/P lifecycle is owned by Core `../idtspe-methodology/active/idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md`; Proposal/Decision lifecycle is owned by `../idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md`.

## Evidence And Decision States

Keep explicit user statements/checked facts, inference, questions, decision candidates, decisions and evidence distinct. Proposal, risk, implementation thought, prototype and generated explanation do not silently become accepted architecture/current truth.

## Whole-Solution First

Equal solution candidates include existing tools, manual process, process change, automation, integrations, no-change, custom application and hybrids.

```text
Problem / Question / Proposal
→ Need / Desired Result
→ Current Reality when useful
→ real-world problem-resolution Workflow Variant(s) when sequence/context matters
→ existing solutions / alternatives
→ candidate fills / whole Solution / Workflow Variants
→ Application Concept candidate(s) when own software may be useful
→ scoped Proposal review where material
→ repeated whole-solution integration evaluation
→ selected solution responsibility
```

Invariant:

```text
best local variant ≠ automatically best whole solution/workflow
```

### Real-World Problem-Resolution Workflow

When the path from problem to primary result matters, model the real-world sequence rather than starting at the application boundary.

```text
real-world problem / trigger
→ actions and context before a solution is used
→ one or more solution points
→ actions after the solution output
→ primary real-world Desired Result
```

The workflow may include an `Open Solution Slot`: an addressable place where the current context, user-world Need, available inputs/resources, desired output and continuation are understandable but the best way to fill the slot is still unknown.

```text
Open Solution Slot
= planning surface inside a real-world / whole-solution workflow
≠ mandatory semantic owner
≠ application assumption
```

A slot may be filled by a manual/process route, an existing product, an integration, no-change, a custom Application Concept or a hybrid. Whole-Workflow Variants may place or eliminate slots differently when that materially changes the path.

### Viable Existing Alternative

An existing solution/process/integration that materially covers a Need or Open Solution Slot remains a `Viable Existing Alternative` while custom-vs-existing selection is open.

```text
checked existing alternative
→ viable / rejected / needs evidence
```

Do not discard a viable existing option merely because an Application Concept is attractive. Compare the custom concept against the best relevant existing route(s) at whole-solution level.

## Application Concept

In the current SDS Application Definition contract, `Application Concept` is a **short understandable summary of the Application**, not a container for the whole candidate-evaluation process.

It answers:

```text
what this Application is
why it is needed / what overall Benefit it provides
how it roughly works — briefly, at concept level
```

The short “how it roughly works” point must not expand into detailed Feature/Scenario behavior, architecture, Domain design or implementation planning.

Existing-solution comparison, individual Application Benefits, Benefit-specific Responsibility Boundaries and proportional feasibility remain neighboring Application Definition responsibilities rather than fields inside Application Concept. Candidate alternatives remain normal Proposal/Decision/branch state until selected.

Do not create a mandatory `Application Concept Feature` layer. If a capability hypothesis is really user value, keep it with the relevant Application Benefit/Proposal; if it becomes selected downstream behavior, route it to the natural Feature/Scenario owner.

## Application Responsibility

Do not create one standalone Application Responsibility/Boundary unit in the canonical SDS Application Definition. Each substantive Application Benefit carries its own `Responsibility Boundary`: what the Application owns/provides for that Benefit and what remains with actors, manual process or external systems. Cross-Benefit consistency may be reviewed, but authoritative boundary meaning remains on the affected Benefits.

When a custom concept is selected, derive the Application responsibility from the selected Concept + whole-solution boundary rather than silently expanding it. Keep people/process/existing tools/external services outside when the selected whole solution leaves them outside.


## Scenario

A Scenario is one coherent **user/actor-visible behavioral unit** in which a meaningful user-world Need motivates interaction with the Application and the behavior reaches an independently meaningful observable result.

Primary boundary test:

```text
meaningful user Need
+
user/actor-visible behavior or information interaction
+
independently meaningful observable result
```

The result may be informational/understanding-only. A read-only Scenario is valid when obtaining trustworthy information or understanding itself meaningfully satisfies the Need even if no mutation or later action follows.

Supporting signals for ambiguous boundaries include independent entry/re-entry, recurrence/reuse, wait/handoff and independent acceptance/testing value. Need alone is insufficient; distinguish an independent user Need from an instrumental sub-need.

Do not derive Scenario identity mechanically from implementation/application commands:

```text
command / button / UI action
screen
API call
database mutation
backend operation
technical procedure / implementation step
≠ Scenario merely because it is addressable
```

A Scenario may contain any of those actions. One command may even implement nearly the whole Scenario, but only the independent Need/result behavioral boundary establishes Scenario identity. Information shown as a small instrumental part of another Scenario stays inside that Scenario rather than becoming a peer read-only Scenario.

Technical constraints/implementation requirements remain constraints/invariants unless they create required user-visible behavior that participates in an independently meaningful Need/result. The implementation mechanism itself does not become a Scenario.

## User / Actor Effort In A Scenario

Scenario planning reviews how much work the actor must do to reach the meaningful result. This is qualitative/proportional, not a click-count score. Check when material:

```text
actions and repeated actions
decisions / choices
information to find, remember or compare
repeated data entry
screen / context switches
waits / blocking
retries / recovery
technical internals the actor is forced to understand
irreversible actions
happy-path and material alternate/failure-path burden
```

Keep three perspectives distinct:

```text
Scenario actor path → user/actor effort
Runtime Realization Path → system work
Workspace Work Path → maintainer/agent work
```

Architecture and realization planning may consume actor-effort evidence when technical choices create user-visible friction, latency, confirmation, retry or consistency burden; Scenario remains the semantic owner.

## Requirement

A `Requirement` is a condition/property/constraint that the selected solution must satisfy.

```text
Need
→ why something matters

Scenario
→ user/actor-visible behavior reaching a meaningful result

Requirement
→ what must be true
```

A technical/external Requirement such as `use organization SSO` does not become a Scenario without an independent Need/result behavioral boundary. Requirements may be behavioral, informational/DATA, spatial/visual, Domain/invariant, technical, integration, operational/non-functional or external; those labels are optional rather than a mandatory taxonomy.

Use one canonical owner and link consumers. Shared/application Requirements may use a registry while Scenario-/Screen-/Domain-/Slice-specific requirements stay with their narrowest real owner. Prototype findings may begin as `candidate` Requirements before evidence promotes/rejects them.

Canonical semantics: [`requirements-and-change-context.md`](requirements-and-change-context.md).

## Future Scenario Proposals / Change Axes

A `Future Scenario Proposal` is an ordinary Proposal about behavior that may matter later. It is not current Scenario/Requirement truth until selected.

Generic Workspace Change Pressure / `Change Axis` semantics are owned by sibling [`../architecture-planning/workspace-use-cases-and-change-pressure.md`](../architecture-planning/workspace-use-cases-and-change-pressure.md). Application Planning contributes evidence from Requirements, Scenarios/Behavior, prototype findings and expected application Extensions.

```text
Future Scenario Proposal / Extension evidence
→ may contribute to Change Pressure / Change Axis

Change Axis
→ evaluate coupling/adaptability where it actually crosses

Change Axis
≠ current Requirement
≠ instruction to generalize now
```

Current selected behavior/Requirements outrank speculative future flexibility.

## Implementation-Scoped Proposals

Implementation answer candidates that appear during solution/concept/prototype/Scenario work remain ordinary generic `Proposal` candidates with implementation scope/placement. Do not create a separate `Implementation Proposal` ontology. When selected during Domain/Slice work, integrate the meaning into the real Domain/Slice owner and retain Proposal provenance only when useful.

## Prototype Planning

`Prototype Planning` is proportional provisional interaction/workflow design and evidence collection between a selected/current Application Definition (Benefits with their Responsibility Boundaries + concise Application Concept) and canonical detailed Scenario/Screen planning.

```text
Application Definition / Benefit responsibility boundaries
→ Prototype Planning when material uncertainty remains
   → Prototype Scenarios
   → Prototype Screens
   → candidate Requirements
   → candidate Scenario DATA / Behavior
   → Future Scenario Proposals / Change Axes when material
→ Scenario Discovery
→ current detailed Scenario / Screen owners
```

Prototype artifacts are provisional. `PSCN-*` does not become canonical `SCN-*` authority and `PSCR-*` does not become canonical `SCR-*` authority merely because the prototype exists; promotion may split, merge, reject or rework provisional meaning.

A technical feasibility spike may remain inside Application Concept/research when the question is whether a concept is feasible/costly. `UC-PLAN-PROTOTYPE` is specifically for interaction/workflow prototyping.

Canonical workflow: [`prototype-planning-workflow.md`](prototype-planning-workflow.md).


## Scenario Draft

A detailed Scenario Draft is the canonical behavioral owner plus its workspace. Standard workspace areas are `ideas/`, `data/`, `behavior/` and `visual/`; shared material for several Scenarios belongs at their collection level.

Recommended semantic Scenario body:

```text
Identity
Motivation / Starting Situation
Actor Understanding / Plan
Entry Points / Preconditions
Main Flow
Branches / Invariants
Outcomes / Acceptance
Scenario DATA references
Behavior Item references
Related Requirements
Relevant Change Axes / Future Scenario Proposals when material
Visual / Screen references
Current Decisions
optional Q/R/P register/index when material
Q/R/P + Q/R/P Groups relative to Current Draft Plan
Retained Q/R/P/Decision trace when material
Potential Simplifications / Better Routes when material
```

`Motivational Trigger ≠ Application Entry Point`.

Main Flow may proportionally add Surface/Screen, DATA/information, Actor Understanding, Desired User Response, System Response/State Change, Presentation/Visual Requirement and Result/Transition when material. Requirements are linked as must-hold conditions rather than converted mechanically into flow steps. Do not expand every step mechanically.

## Current Draft / Current Draft Plan

The current draft is the selected semantic owner/Variant for one detailed planning unit.

`Current Draft Plan` is not a file/entity/stage. It is the relevant selected baseline named inside a detailed draft's active/residual Q/R/P or unselected Better Route.

```text
Current Draft
= baseline

Q/R/P
= material active/residual Question/Risk/Problem delta to baseline; related items may form one Q/R/P Group

Potential Better Route
= material unselected candidate change to baseline
```

Answered/resolved/eliminated items leave active Q/R/P, while material retained answer/rationale/Decision trace may remain and residual Risk/Problem stays active. Selected routes leave Better Routes and are integrated into the semantic body. Q/R/P register/placement, Priority/Review Category/Status and AI-review/Recommendation/Decision boundaries follow the Core Q/R/P, AI Reviewability and Proposal/Decision owners.

## Current Decision

A Current Decision records a material selected choice that is already integrated into current semantic meaning. It is not a candidate and it is not a replacement for the semantic body. Generic trace fields such as `Addresses Q/R/P`, `Introduced / Exposed Q/R/P`, `Affected Owners` and `Reconsider When` are optional/proportional and owned by the Core Proposal/Decision and Q/R/P contracts.

## Scenario DATA

User-visible/scenario-relevant values needed to understand or validate behavior. Not automatically DTO/API/database/UI state.

Scenario DATA may be addressable through a dedicated file or shared registry. When a specific fragment needs durable cross-file addressability, give the canonical fragment a stable explicit anchor and link to it directly.

## Behavior Item

Stable addressable unit of required behavior inside a Scenario. It is not automatically an implementation task or Slice.

A Behavior Item may expose a stable explicit anchor when fragment-level addressability is useful; consumers use ordinary links to the canonical owner rather than literal synchronized copies.

## Screen

A Screen is an optional spatial/visual owner for one application surface.

```text
Scenario
→ behavioral flow / actor understanding / observable result / acceptance

Screen
→ spatial boundary / zones / composition / visual states
```

A Screen may list Scenarios that use it without becoming their behavioral authority. Every material Scenario↔Screen relation should be discoverable from both owners: the Scenario identifies the Screen and its behavioral role/range, while the Screen identifies the Scenario and relevant zones/states. This is one relationship with reciprocal navigation, not duplicate behavioral ownership. Screen planning does not require `data/` or `behavior/` folders. Spatial requirements such as zone hierarchy, placement, visibility/arrangement and layout state belong to Screen; behavioral conditions/transitions remain Scenario/Behavior truth; frontend Slice plans own the implementation mechanism that realizes selected requirements.

## Planning Unit Variant

A Planning Unit Variant is an integrated alternative design of a Prototype, Scenario, Screen, Domain or Slice.

```text
Planning Unit Variant
≠ runtime Branch
≠ Proposal alternative/refinement
≠ small technical alternative
≠ document revision/version history
```

Do not create explicit VAR-A ceremony while only one integrated design exists. When a second design appears, the root draft may become explicit VAR-A and remain physically at the root while the alternative lives under `variants/`; both are semantic peers for evaluation. Exactly one selected current Variant must be routed explicitly.

## Domain / Slice Strategy / Slice

`Domain Discovery` is optional evidence-driven semantic discovery before Domain selection. It extracts identity/lifecycle/relationship/rule/invariant/policy/consistency candidates from current Scenario DATA/Behavior/Requirements, including Value Object and Aggregate/Root/ownership candidates only when evidence justifies them, and may form integrated Domain Variants when material. Canonical algorithm: [`domain-discovery-workflow.md`](domain-discovery-workflow.md).

Domain is an optional selected conceptual model/language/lifecycle/rules/boundary owner when separate ownership improves planning. Domain planning aims for the simplest model that supports current selected meaning plus **justified** likely evolution: stable semantics explicit, likely variation localized when useful, speculative possibilities prevented from forcing premature abstraction. Canonical selection/review algorithm: [`domain-planning-workflow.md`](domain-planning-workflow.md).

`Application Realization` is an optional high-level stress review of representative Runtime Realization Paths, persistence/transaction/integration/algorithm concerns and verification seams before detailed Slice planning. It may return material technical/correctness findings upstream but does not let implementation convenience define Domain truth. Canonical algorithm: [`application-realization-workflow.md`](application-realization-workflow.md).

`Slice Strategy` is an optional decomposition/order plan used when implementation is large or uncertain enough that choosing vertical increments is itself an independently useful result. Product/Scenario priority remains upstream input; Slice/Architecture planning may recommend a different technical implementation sequence only with explicit dependency/work-cost evidence.

An `Implementation Slice` is one separately deliverable/checkable vertical increment. Frontend/backend are not separate Slice families or prescribed part-plan files; UI/frontend reasoning remains inside the current Slice by default, with normal Local Target Formation available only when an independently substantial subproblem exists. Canonical semantic contract is the current SDS `TM-IMPLEMENTATION-SLICE`; this legacy workflow is supporting knowledge only.

```text
Scenario / Screen / Requirement / Domain
→ selected meaning the implementation must realize

Slice Strategy
→ decomposition / order

Slice
→ one integrated delivery plan
```

A Slice may use a product-facing feature label without introducing a mandatory Feature layer. Application Concept does not create a Concept Feature layer; selected downstream capability meaning routes to its natural Feature/Scenario owner.

## Recommended Project-Local Planning Zones

When physical organization helps, use `solution-and-application/` for solution/concept/prototype/current behavior/spatial requirements and `domain-and-implementation/` for Domain/Slice implementation planning. Legacy root proposal/Requirements/Change-Axis intake may act as intake before promotion to a narrower owner. Folder placement does not itself create semantic ownership. See [`requirements-and-change-context.md`](requirements-and-change-context.md).

## Stable Link / Anchor Candidate

A stable-link/anchor candidate is canonical meaning that consumers need to address directly and durably across files.

Use the narrowest route:

```text
file-level owner is enough
→ direct Markdown link to the owner file

specific fragment is independently useful/addressable
→ explicit stable anchor in the canonical owner
→ direct Markdown link to that anchor
```

The anchor does not duplicate the canonical meaning and does not create synchronization state. If upstream meaning changes materially, affected consumers are reviewed through the normal owner/revalidation process.

Detailed rules: [`detailed-planning/README.md`](detailed-planning/README.md).

## Optional Application-Level Views

Surface Map and Core Loop remain explicit opt-in views only when a concrete application benefits. Scenario-local Screen references or recurring Scenario-chain notation are sufficient otherwise.

## Historical Boundary

Planning Item, Planning Draft and Full Picture Matrix are not active reusable ontology/stages. Workspace folders do not revive them. Current owners remain real responsibilities. Whole-solution / cross-owner integration review remains required when relevant but is a review responsibility, not a separate mandatory entity/file/stage. Historical project artifacts may remain provenance/migration sources but never win over current Use Cases/Scenarios/current owners.

## Realization Evidence Before Final Domain Selection

When serious Domain candidates are grounded but a correct selection materially depends on runtime/persistence/integration/algorithm/performance feasibility, `UC-PLAN-REALIZATION` may run before final Domain selection.

```text
Domain candidate meaning
↔ bounded candidate realization evidence
→ Domain owner selects conceptual truth
```

Implementation convenience alone cannot redefine Scenario/Requirement/Domain meaning. New material infeasibility/correctness/cost/consistency evidence may flow upstream explicitly.
