# TM-APPLICATION-DEFINITION — Application Definition

Module ID: `TM-APPLICATION-DEFINITION`

Entry Point: `tm.application.definition`
Role: primary Target Module
Target family / archetype: selected own-application definition

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `TARGET-MODULE.META-MODEL`
> Owner: [Target Module Meta-Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model)

## Purpose

Define one coherent own-application contribution:

```text
what application/contribution we are building
+ why custom software is still justified
+ which Application Benefits are selected/possible
+ what responsibility boundary belongs to each Benefit
+ which representative real-life situations show those Benefits in context
+ what concise Application Concept explains the Application and how it roughly works
+ whether the concept/Benefit boundaries are plausibly realizable
```

Application Benefits and Representative Real-Life Scenarios are separate responsibilities. Each Benefit owns independently addressable user-value meaning **and its own Responsibility Boundary** for that Benefit. Representative RLS instances are many-to-many examples of how one or several Benefits may manifest in a larger real-world path. RLS surrounding steps do not become selected Application behavior merely because they are shown.

Use this Target when Application need/value/contribution, Benefit set, one or more Benefit responsibility boundaries, Application Concept or feasibility is materially unsettled or challenged. Application Definition is upstream intent/value authority and may intentionally lead downstream realization.

## Temporal Authority / Evolution-Step Hosting

Application Definition is the upstream **need/value/contribution authority**. It is not a realized-current-state owner analogous to Feature/Scenario/Screen/Domain/Slice/Shared.

```text
Application Definition
= selected + possible Application needs / Benefits / contribution / per-Benefit boundary intent

Selected Application intent
≠ downstream capability already realized
```

Use stable addressable `AB-*` when independent downstream reference is useful. Each Benefit may carry:
- `Selected` — accepted Application value/need that may drive downstream planning;
- `Possible` — plausible value/need retained for exploration/revalidation but not selected.

`Selected/Possible` is planning/epistemic state, not semantic time or realization status.

When Application meaning changes, refine this owner **directly**. Do not route it through `Evolution Impact`, `Target Application Body`, `CREATE/REPLACE/RETIRE` materialization or current-owner reverse Step references.

Evolution Steps may record `Driven By` references to selected `AB-*` / contribution / per-Benefit boundary intent, but Application Definition is neither semantic Entry State nor a Step-owned Target Body.

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
Which user Benefits justify the Application, and what representative real-life situations make them concrete?
For each Benefit, what responsibility belongs to the Application and what remains with the actor/process/external system?
What concise concept makes the Application understandable?
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

The Application Definition may then capture the Benefit, that Benefit's own responsibility boundary, and one representative real-life situation:

```text
user notices a useful fragment
→ preserves fragment + source context quickly
→ continues reading
→ later returns to a temporary review inbox
→ decides what deserves long-term storage
```

For example, the relevant Benefit can carry its own boundary:

```text
AB-CAPTURE-LOW-FRICTION

User Need:
  preserve a useful fragment without breaking reading flow

User Receives:
  temporary capture with enough source context to review later

Responsibility Boundary:
  Application owns low-friction temporary capture and review/triage support.
  Long-term knowledge management and replacement of the user's existing notes system remain outside.
```

A feasibility check may confirm that capturing selected text and source context is technically realistic without yet designing the final architecture.

### Result

The result is a coherent Application Definition containing:

```text
why custom software is still justified
Application Benefits, each with its own Responsibility Boundary
Representative Real-Life Scenarios that make Benefits concrete through real examples
concise Application Concept, including a short explanation of how it roughly works
owned vs merely consumed information/state as expressed by the affected Benefit boundaries
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
accepted architecture Decisions when reviewing an existing application
```

### Source Discovery Rule
Expected archetype only; current `SOURCE_AUTHORITY` Requirement remains authority.

## Unit Resolution Guidance / Knowledge Basis

Shared contract: [`planning/documentation/idtspe-methodology/active/idtspe-core/knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md`](../../../idtspe-core/knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md). The Application family has shared principles, but substantial theory/reference material is attached to the Unit that consumes it rather than treated as one undifferentiated module-wide bridge.

```text
RU-APP-01 Application Identity / Selected Contribution
  Drivers:
    What exact real-world contribution/result is assigned to this Application?
    What user/actor value justifies forming this Application Definition?
  Knowledge Basis:
    embedded Application-definition contribution/boundary principles

RU-APP-02 Existing-Solution / Reference Position
  Drivers:
    Does an existing solution already satisfy the Need well enough?
    Which substitutes/references matter, and is build/buy/adapt/integrate/hybrid justified?
  Knowledge Basis:
    application-definition-existing-solutions-market-reference-research.md

RU-APP-03 Application Benefits
  Drivers:
    Which independently addressable user needs/value outcomes justify the Application?
    What does the user receive when each Benefit is achieved?
    What exactly does the Application own for this Benefit, and what remains with the actor/process/external system?
    Is optional free-form clarification materially useful?
  Exact Benefit contract:
    User Need — required
    User Receives — required
    Responsibility Boundary — required and specific to this Benefit
    Additional Info — optional free-form; no mandatory internal schema

RU-APP-04 Representative Real-Life Scenarios
  Drivers:
    Which concrete real-world situations make selected/possible Benefits understandable?
    Where exactly is the bounded Application Target contribution inside the larger path?
    Which AB-* items manifest/close at which real-world steps?
  Knowledge Basis:
    application-definition-representative-real-life-scenario-guide.md when stronger representative-path guidance is useful

RU-APP-05 Application Concept
  Drivers:
    What short summary makes it immediately clear what this Application is?
    Why is it needed / what overall Benefit does it provide?
    How does it roughly work, stated only as a small internal concept point?
  Exact Concept contract:
    Summary — required; what the Application is + why it exists / overall Benefit
    How it roughly works — required when needed for comprehension; short, conceptual, not detailed behavior/architecture
  Knowledge Basis:
    selected outputs of RU-APP-01..04 + embedded Application-definition principles

RU-APP-07 Realization Feasibility
  Drivers:
    Can representative Target contribution be realized without pathological complexity?
    Which persistence/integration/consistency/performance/operational constraints can change the concept or one or more Benefit responsibility boundaries?
    Does Evidence narrow/broaden/reject the selected contribution?
  Knowledge Basis:
    applicable implementation/evolution/proof Lenses and Evidence; no separate theory load when they add no value
```

Concrete prepared/contextual question guidance stays on the natural Requirement/Unit subject; the reusable prompts above do not automatically become USER questions or formal Question State.

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/LENS-REGISTRY.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

The required Core [`LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT`](../../../idtspe-core/lenses/required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md) is selected through the registry/checkpoint path only when a material Proposal/Decision surface exists; it is not a fixed Application-specific attachment.

Primary reusable Lens Pack(s):
- [`LENS-APPLICATION-BOUNDARY-FEASIBILITY`](../lenses/reusable/LENS-APPLICATION-BOUNDARY-FEASIBILITY.md) — required for this Target profile

Frequent conditional Lens(es):
- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) — when an existing structured application/workspace dependency surface matters
- [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) — when accepted/planned evolution can materially change the Application boundary or feasibility
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — when feasibility depends on proof/diagnosis/operation
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — only material quality/risk dimensions

## Resolution / Production Method

This module uses the existing `Upstream Source Contract`, Lens Profile, Unit Knowledge Basis and ordinary Proposal/branch/Core-State mechanisms to produce/refine the declared Result Units. Concrete Questions, Proposals, Q/R/P, Decisions and Evidence remain Core State Units.

Default reusable production path:

```text
stabilize selected real-world contribution
→ research existing solutions/references proportionally
→ form/refine Application Benefits, including each Benefit's own Responsibility Boundary
→ form only representative RLS examples that materially clarify Benefits through concrete real-life context
→ define the concise Application Concept
→ test realization feasibility of the concept and affected Benefit boundaries
→ resolve material alternatives through normal Proposal/Branch/Decision state
```

Benefit semantics do not belong to one RLS, and an RLS may demonstrate several Benefits. Surrounding real-world steps before/after the Target contribution remain explanatory context rather than silently expanding selected Application behavior.

Material alternative comparisons are Resolution/Production state until selected; they are not a separate Result Unit by default. A Lens may surface Finding Candidates while this method runs; Core Finding Disposition owns their State/lifecycle/owner destination.

## Unit Definition Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md) and [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md). The Core owners define generic Unit lifecycle, complete-inventory/disposition and Proposal/Core-State semantics; this module defines only its SDS-specific Unit responsibilities, local materiality, production guidance, validators and handoffs below.

## Target Step-Result Contract

**Target Step Result:** `Application Definition`

The six Module-defined Result Units below are the complete Application Definition Unit inventory. `RU-APP-06` is intentionally not a standalone Unit: Responsibility Boundary is required inside each `AB-*` item in `RU-APP-03`. `RU-APP-07` retains its stable Unit ID rather than being renumbered. Their content remains proportional: resolve material meaning, keep unresolved material explicit as `OPEN`, and keep every non-material/non-applicable Unit present with a concise `OMITTED` reason. Generic IDTSPE State is not duplicated as target-specific fields.

| Result Unit | Meaning | Current projection detail |
|---|---|---|
| `RU-APP-01` | Application Identity / Selected Contribution | Application Definition Identity |
| `RU-APP-02` | Existing-Solution / Reference Position | Existing Solutions / Market / Reference Research |
| `RU-APP-03` | Application Benefits | addressable `AB-*` user-value responsibilities, each with its own Responsibility Boundary |
| `RU-APP-04` | Representative Real-Life Scenarios | representative `RLS-*` examples that make Benefits concrete, with bounded Target contribution + optional Benefit manifestation/closure markers |
| `RU-APP-05` | Application Concept | concise summary of what the Application is, why it is needed / overall Benefit, and briefly how it roughly works |
| `RU-APP-07` | Realization Feasibility | proportional feasibility findings |

### Result Unit Applicability / Materiality

Unit presence/disposition mechanics follow the Core [`Unit Applicability / Materiality / Disposition Contract`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition). The table below owns only this module's local substantive-materiality and omission-rationale triggers.

| Result Unit | Substantive resolution is material when | Unit disposition when substantive resolution is not material |
|---|---|---|
| `RU-APP-01` | always once an Application Definition Target is formed; its identity/contribution anchors the Target | no Unit-level omission after Target formation; keep minimum identity/contribution meaning and use `OPEN` if materially unresolved |
| `RU-APP-02` | build/buy/adapt/integrate/reference position can change selected contribution, Benefit set or feasibility | `OMITTED` when trusted existing-solution context is already sufficient and adds no decision value |
| `RU-APP-03` | always once an Application Definition Target is formed; Application Benefits are the independently addressable value responsibilities that justify downstream planning, and each substantive Benefit needs its own Responsibility Boundary | no Unit-level omission after Target formation; if Benefit or Benefit-boundary meaning is not sufficiently resolved, keep `OPEN` rather than inventing placeholder Benefits/boundaries |
| `RU-APP-04` | representative examples materially clarify user/value context, Benefit manifestation/closure or one or more Benefit responsibility boundaries | `OMITTED` when Benefits and their boundaries are already understandable without a representative RLS; the Unit remains present |
| `RU-APP-05` | always once an Application Definition Target is formed; a concise understandable Application Concept is a core responsibility | no Unit-level omission after Target formation; unresolved concept remains `OPEN` |
| `RU-APP-07` | feasibility can change concept, one or more Benefit responsibility boundaries, Benefit credibility or build/adapt/integrate position | `OMITTED` when feasibility is routine/trusted and cannot materially change selected Application meaning |

### Application Definition Identity

**Application:** `<stable name / identity>`
**Selected Contribution:** `<bounded real-world contribution assigned to this Application>`
**Need / upstream driver refs:** `<Need / solution / trusted intent refs>`

### Existing Solutions / Market / Reference Research

Keep proportional evidence and interpretation about build/buy/adapt/integrate/hybrid alternatives only when it can change the Application Definition. Reference products are Evidence/Proposal inputs, not semantic authority.

### Application Benefits

`RU-APP-03` owns independently addressable `AB-*` items. Minimum exact representation:

```text
AB-<id> — <short name>
Planning position: Selected | Possible   # only when materially useful

User Need:
<required wanted outcome / problem in user terms>

User Receives:
<required value/result the user receives>

Responsibility Boundary:
<required boundary for this Benefit: what the Application owns/provides for the Benefit, and what remains with the actor/manual process/external system or is merely consumed/displayed/forwarded/derived>

Additional Info:
<optional free-form clarification; omit field entirely when no extra meaning is useful>
```

`Responsibility Boundary` is **Benefit-local**. Do not create a second standalone Application-level Responsibility Boundary Result Unit. Cross-Benefit consistency may be reviewed, but the authoritative boundary meaning remains on the affected `AB-*` items.

`Additional Info` has **no mandatory internal schema**. It may clarify context, constraints, examples, scope or other material meaning, but do not force `Context`, `Trigger`, `Constraint` or similar fields for every Benefit.

One Benefit may appear in several Representative RLS; one Representative RLS may demonstrate several Benefits. RLS does not own Benefit semantics or the Benefit's Responsibility Boundary.

### Representative Real-Life Scenarios

`RU-APP-04` owns literal representative examples whose primary purpose is to make one or several Application Benefits understandable through concrete real-life situations. It does not own Application Scenario journey authority.

A proportional RLS may use:

```text
RLS-<id> — <representative situation>
Actor / real-world situation: ...

1. <surrounding real-world step>
2. <surrounding real-world step>
3. [Target contribution]
   <bounded Application contribution>
   [AB-01 manifests/closes]
   [AB-02 manifests]
4. <surrounding continuation>

Real-world result / continuation: ...   # when useful
```

Rules:

```text
RLS surrounding steps
→ explanatory real-world workflow context
→ do not become selected Feature/Scenario/Screen/Domain/internal behavior automatically

Target contribution marker
→ identifies only the bounded Application contribution

Benefit markers
→ show where an upstream AB-* manifests/closes
→ do not transfer Benefit authority to RLS
```

RLS must not decompose Target internals into Feature behavior, Screens, Domain objects, internal Application handoffs, architecture or exact mechanisms. Those belong to downstream Target Modules / realization owners.

### Application Concept

Keep the Application Concept short and immediately understandable:

```text
Summary:
<what this Application is + why it is needed / what overall Benefit it provides>

How it roughly works:
<small conceptual explanation of the basic working idea, only as much as needed to understand the Application>
```

Do not turn Application Concept into Feature decomposition, detailed interaction behavior, architecture, Domain design or implementation planning. Those details belong to their natural downstream owners.

Responsibility boundaries are not a separate Result Unit. They are required inside the affected `AB-*` items in `RU-APP-03`; Representative RLS surroundings and feasibility Evidence may challenge/refine those per-Benefit boundaries but do not create a second boundary owner.

### Realization Feasibility

Use proportional Evidence about representative runtime feasibility, persistence/integration/consistency/performance/operability/cost only when it can change Application meaning. Literal mechanism selection remains downstream/Exact unless the mechanism itself becomes selected durable semantic meaning.

### Alternatives / Comparison

Material Application alternatives remain ordinary Proposal / Planning Branch / Decision state until selected. Benefit/RLS content is not a substitute for candidate comparison.

### Explicit Unit Checkpoint Placement

Each material Unit inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-envelope). Opening/Closing are logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-APP-01` processing envelope

1. **Opening Unit Checkpoint — `RU-APP-01`** — bind the exact reusable Unit owner(s)/methodology before substantive work and resolve/reuse current applicable Core + active-profile Lens/registry pressure.
2. **Unit Work — `RU-APP-01`** — produce/refine only the meaning owned by this Result Unit; run additional applicability checks when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-01`** — evaluate the actual Unit result/disposition, route material Findings/owner consequences, and reopen/refine narrowly when needed before handoff.

#### `RU-APP-02` processing envelope

1. **Opening Unit Checkpoint — `RU-APP-02`** — bind the exact reusable Unit owner(s)/methodology before substantive work and resolve/reuse current applicable Core + active-profile Lens/registry pressure.
2. **Unit Work — `RU-APP-02`** — produce/refine only the meaning owned by this Result Unit; run additional applicability checks when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-02`** — evaluate the actual Unit result/disposition, route material Findings/owner consequences, and reopen/refine narrowly when needed before handoff.

#### `RU-APP-03` processing envelope

1. **Opening Unit Checkpoint — `RU-APP-03`** — bind the exact reusable Unit owner(s)/methodology before substantive work and resolve/reuse current applicable Core + active-profile Lens/registry pressure.
2. **Unit Work — `RU-APP-03`** — produce/refine only the meaning owned by this Result Unit; run additional applicability checks when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-03`** — evaluate the actual Unit result/disposition, route material Findings/owner consequences, and reopen/refine narrowly when needed before handoff.

#### `RU-APP-04` processing envelope

1. **Opening Unit Checkpoint — `RU-APP-04`** — bind the exact reusable Unit owner(s)/methodology before substantive work and resolve/reuse current applicable Core + active-profile Lens/registry pressure.
2. **Unit Work — `RU-APP-04`** — produce/refine only the meaning owned by this Result Unit; run additional applicability checks when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-04`** — evaluate the actual Unit result/disposition, route material Findings/owner consequences, and reopen/refine narrowly when needed before handoff.

#### `RU-APP-05` processing envelope

1. **Opening Unit Checkpoint — `RU-APP-05`** — bind the exact reusable Unit owner(s)/methodology before substantive work and resolve/reuse current applicable Core + active-profile Lens/registry pressure.
2. **Unit Work — `RU-APP-05`** — produce/refine only the meaning owned by this Result Unit; run additional applicability checks when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-05`** — evaluate the actual Unit result/disposition, route material Findings/owner consequences, and reopen/refine narrowly when needed before handoff.

#### `RU-APP-07` processing envelope

1. **Opening Unit Checkpoint — `RU-APP-07`** — bind the exact reusable Unit owner(s)/methodology before substantive work and resolve/reuse current applicable Core + active-profile Lens/registry pressure.
2. **Unit Work — `RU-APP-07`** — produce/refine only the meaning owned by this Result Unit; run additional applicability checks when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-07`** — evaluate the actual Unit result/disposition, route material Findings/owner consequences, and reopen/refine narrowly when needed before handoff.

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`representation/ARTIFACT-PLACEMENT-MAP.md`](../representation/ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

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
CONTENT: concise Application Concept; Application Benefits including per-Benefit Responsibility Boundaries; build/buy/adapt/integrate position; representative real-life scenario inventory with bounded Target-contribution / Benefit relations where material; feasibility conclusion
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
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
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

```text
ARTIFACT_PROPOSAL
ID: AP-APP-03
CONTENT_KIND: REPRESENTATIVE_REAL_LIFE_SCENARIO
WHEN: one or several Representative RLS examples are reused/reviewed independently
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Application Definition / RU-APP-04
REPRESENTATION: EMBED_OR_SEPARATE_ADDRESSABLE_ARTIFACT
FILE_OR_ARTIFACT: <application-definition-owner> or <representative-r-l-s-artifact>
CONTENT: representative real-world situation; bounded Target contribution marker; optional AB-* manifestation/closure refs; surrounding workflow context
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```


Shell placement semantics: [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../../../idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md).

**REQUIRED** — an accepted Application Definition used downstream must have one canonical persistent representation when persistence is material. It remains the upstream semantic owner even when downstream realization lags behind the selected intent.

**PREFERRED** — substantial market/reference research may use a supporting Evidence artifact when it is too large/volatile for the canonical Application Definition. Research observations surface Finding Candidates; Core Finding Disposition may resolve accepted material as Evidence/Proposals or another appropriate State, but never as a second application-semantic owner merely because it came from reference research.

**OPTIONAL separate artifact** — one or several Representative Real-Life Scenarios may be embedded in the Application Definition or receive separate addressability when independently reused/reviewed. Separate representation does not turn RLS into Application Scenario authority or Benefit authority.

**Keep embedded by default** — concise Application Concept, Application Benefits with their Responsibility Boundaries, and feasibility conclusion belong to the Application Definition owner rather than separate files per field.

`P-14` must show the exact/logical destination of each accepted/supporting item and mark unresolved placement explicitly.

## Validators

```text
traces to Fundamental Need + Step-02 contribution
obvious existing solutions were proportionally checked
custom build remains knowingly justified or a material challenge is dispositioned to Step-02 revalidation/reopen
Application Benefits state User Need + User Receives + a Benefit-specific Responsibility Boundary; Additional Info remains optional free-form
no standalone Responsibility Boundary Result Unit is introduced; cross-Benefit consistency review returns meaning to the affected AB-* owners
Representative RLS examples make Benefits understandable through concrete real-life situations and remain examples rather than Benefit or Application Scenario authority
RLS surrounding steps do not silently expand any selected Benefit responsibility boundary
Benefit ↔ RLS relation may be many-to-many through references/manifestation markers
Application Concept is a concise summary of what the Application is, why it is needed / overall Benefit, and briefly how it roughly works
concept + Benefits/boundaries + feasibility form one coherent Application Definition owner
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
