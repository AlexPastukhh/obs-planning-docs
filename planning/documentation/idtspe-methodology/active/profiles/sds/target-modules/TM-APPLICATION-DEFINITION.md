<a id="tm-application-definition"></a>
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
concise Application Concept: what we are building, why / overall value, and how it roughly works
+ why custom software is still justified
+ which Application Benefits are selected/possible
+ what Responsibility Boundary / Constraints belong to each Benefit
+ which Scenario/Evolution coverage references make those Benefits traceable
+ whether the concept/Benefit boundaries are plausibly realizable
```

Each Benefit owns independently addressable user-value meaning **and its own Responsibility Boundary / Constraints**. `RU-APP-04` keeps only coverage/navigation to the Scenario and Evolution owners that develop or realize that intent, including known gaps. Full actor/external/Application journeys belong to Scenario, not to Application Definition.

Use this Target when Application need/value/contribution, Benefit set, one or more Benefit Responsibility Boundary / Constraints, Application Concept or feasibility is materially unsettled or challenged. Application Definition is upstream intent/value authority and may intentionally lead downstream realization.

## Temporal Authority / Evolution-Step Hosting

Application Definition is the upstream **need/value/contribution authority**. It is not a realized-current-state owner analogous to Feature/Scenario/Screen/Domain/Slice/Shared.

```text
Application Definition
= selected + possible Application needs / Benefits / contribution / per-Benefit boundary/constraint intent

Selected Application intent
≠ downstream capability already realized
```

Use stable addressable `AB-*` when independent downstream reference is useful. Each Benefit may carry:
- `Selected` — accepted Application value/need that may drive downstream planning;
- `Possible` — plausible value/need retained for exploration/revalidation but not selected.

`Selected/Possible` is planning/epistemic state, not semantic time or realization status.

When Application meaning changes, refine this owner **directly**. Do not route it through `Evolution Impact`, `Target Application Body`, `CREATE/REPLACE/RETIRE` materialization or current-owner reverse Step references.

Evolution Steps may record `Driven By` references to selected `AB-*` / contribution / per-Benefit boundary/constraint intent, but Application Definition is neither semantic Entry State nor a Step-owned Target Body.

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

The Application Definition may then capture the Benefit, that Benefit's own responsibility boundary, and a concise source situation that can drive a separately owned Scenario:

```text
Source situation: a reader needs to preserve a useful fragment without losing reading flow.
Scenario coverage: OPEN until a real-life actor/external/Application journey is separately formed.
Evolution coverage: OPEN until a concrete downstream transition deserves Step identity.
```

For example, the relevant Benefit can carry its own boundary:

```text
AB-CAPTURE-LOW-FRICTION

User Need:
  preserve a useful fragment without breaking reading flow

User Receives:
  temporary capture with enough source context to review later

Responsibility Boundary / Constraints:
  BC-01 — Application owns low-friction temporary capture and review/triage support.
  BC-02 — Long-term knowledge management and replacement of the user's existing notes system remain outside.
  BC-03 — Capture must not require leaving the active reading flow merely to preserve the fragment.
```

A feasibility check may confirm that capturing selected text and source context is technically realistic without yet designing the final architecture.

### Result

The result is a coherent Application Definition containing:

```text
concise Application Concept, including a short explanation of how it roughly works
why custom software is still justified
Application Benefits, each with its own Responsibility Boundary / Constraints
Scenario/Evolution coverage references that locate real-life journeys and planned transitions
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
RU-APP-05 Application Concept
  Drivers:
    What short summary makes it immediately clear what this Application is?
    Why is it needed / what overall Benefit does it provide?
    How does it roughly work, stated only as a small internal concept point?
  Exact Concept contract:
    Summary — required; what the Application is + why it exists / overall Benefit
    How it roughly works — required; short, conceptual, not detailed behavior/architecture
  Knowledge Basis:
    trusted upstream Need/contribution Sources + embedded Application-definition principles; refine with material outputs of RU-APP-02, RU-APP-03, RU-APP-04 and RU-APP-07

RU-APP-02 Existing-Solution / Reference Position
  Drivers:
    Does an existing solution already satisfy the Need well enough?
    Which substitutes/references matter, and is build/buy/adapt/integrate/hybrid justified?
  Knowledge Basis:
    [RU-APP-02 Existing-Solution / Reference Position guidance](../target-module-support/application-definition/RU-APP-02-EXISTING-SOLUTION-REFERENCE-POSITION.unit-guidance.md)

RU-APP-03 Application Benefits
  Drivers:
    Which independently addressable user needs/value outcomes justify the Application?
    What does the user receive when each Benefit is achieved?
    What exactly does the Application own for this Benefit, and what remains with the actor/process/external system?
    Which Benefit-local constraints, non-goals or responsibility must-holds materially limit that promise?
    Is optional free-form clarification materially useful?
  Exact Benefit contract:
    User Need — required
    User Receives — required
    Responsibility Boundary / Constraints — required and specific to this Benefit; state the owned/outside boundary and any material Benefit-local constraints/non-goals without inventing empty constraints
    Additional Info — optional free-form; no mandatory internal schema

RU-APP-04 Scenario / Evolution Coverage
  Drivers:
    Which natural Scenario owners or planned Step-owned Scenario bodies cover each accepted Benefit?
    Which accepted intent remains uncovered or awaits concrete Step identity?
    Which Scenario/Step reference carries the real-life path rather than copying it here?
  Knowledge Basis:
    [RU-APP-04 Scenario / Evolution Coverage guidance](../target-module-support/application-definition/RU-APP-04-REPRESENTATIVE-REAL-LIFE-SCENARIOS.unit-guidance.md) when stronger representative-path guidance is useful

RU-APP-07 Realization Feasibility
  Drivers:
    Can representative Target contribution be realized without pathological complexity?
    Which persistence/integration/consistency/performance/operational constraints can change the concept or one or more Benefit Responsibility Boundary / Constraints?
    Does Evidence narrow/broaden/reject the selected contribution?
  Knowledge Basis:
    applicable implementation/evolution/proof Lenses and Evidence; no separate theory load when they add no value
```

Concrete prepared/contextual question guidance stays on the natural Requirement/Unit subject; the reusable prompts above do not automatically become USER questions or formal Question State.

## Resolution / Production Method

This module uses the existing `Upstream Source Contract`, Unit-local Lens Attachments, Unit Knowledge Basis and ordinary Proposal/branch/Core-State mechanisms to produce/refine the declared Result Units. Concrete Questions, Proposals, Q/R/P, Decisions and Evidence remain Core State Units.

Concept-first is result/read order, not a requirement to finalize the Concept before researching alternatives or clarifying Benefits. It may start as an explicit candidate/open summary and be refined when later Unit work changes its basis.

Default reusable production path:

```text
sketch the concise Application Concept from trusted Need/contribution Sources
→ research existing solutions/references proportionally
→ form/refine Application Benefits, including each Benefit's own Responsibility Boundary / Constraints
→ route materially distinct real-life paths into Scenario planning and record Scenario/Evolution coverage references without copying their bodies
→ refine the opening Application Concept from the resolved value/boundary context
→ test realization feasibility of the concept and affected Benefit boundaries
→ resolve material alternatives through normal Proposal/Branch/Decision state
```

A Benefit may be covered by several Scenarios and a Scenario may manifest several Benefits. Record coverage and unresolved gaps; do not restate the Scenario journey as Application Definition content.

Material alternative comparisons are Resolution/Production state until selected; they are not a separate Result Unit by default. A Lens may surface Finding Candidates while this method runs; Core Finding Disposition owns their State/lifecycle/owner destination.

## Unit Definition Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md) and [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md). The Core owners define generic Unit lifecycle, complete-inventory/disposition and Proposal/Core-State semantics; this module defines only its SDS-specific Unit responsibilities, local materiality, production guidance, validators and handoffs below.

## Target Step-Result Contract

**Target Step Result:** `Application Definition`

The five Module-defined Result Units below are the complete Application Definition Unit inventory, presented Concept first. `RU-APP-05` retains its stable identity despite moving first. `RU-APP-01` (Application Identity / Selected Contribution) is retired: document identity and upstream references are ordinary Target/document context, while the concise selected contribution belongs in the Concept Summary. No second contribution, Benefit or boundary body is retained. `RU-APP-06` is intentionally not a standalone Unit: Responsibility Boundary is required inside each `AB-*` item in `RU-APP-03`. `RU-APP-07` retains its stable Unit ID rather than being renumbered. Their content remains proportional: resolve material meaning, keep unresolved material explicit as `OPEN`, and keep every non-material/non-applicable Unit present with a concise `OMITTED` reason. Generic IDTSPE State is not duplicated as target-specific fields.

| Result Unit | Meaning | Current projection detail |
|---|---|---|
| `RU-APP-05` | Application Concept | concise summary of what the Application is, why it is needed / overall Benefit, and briefly how it roughly works |
| `RU-APP-02` | Existing-Solution / Reference Position | Existing Solutions / Market / Reference Research |
| `RU-APP-03` | Application Benefits | addressable `AB-*` user-value responsibilities, each with its own Responsibility Boundary / Constraints |
| `RU-APP-04` | Scenario / Evolution Coverage | references from accepted/possible Benefits to current or Step-owned Scenario and Evolution coverage, with material uncovered intent explicit |
| `RU-APP-07` | Realization Feasibility | proportional feasibility findings |

### Result Unit Applicability / Materiality

Unit presence/disposition mechanics follow the Core [`Unit Applicability / Materiality / Disposition Contract`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition). The table below owns only this module's local substantive-materiality and omission-rationale triggers.

| Result Unit | Substantive resolution is material when | Unit disposition when substantive resolution is not material |
|---|---|---|
| `RU-APP-05` | always once an Application Definition Target is formed; a concise understandable Application Concept is a core responsibility | no Unit-level omission after Target formation; unresolved concept remains `OPEN` |
| `RU-APP-02` | build/buy/adapt/integrate/reference position can change selected contribution, Benefit set or feasibility | `OMITTED` when trusted existing-solution context is already sufficient and adds no decision value |
| `RU-APP-03` | always once an Application Definition Target is formed; Application Benefits are the independently addressable value responsibilities that justify downstream planning, and each substantive Benefit needs its own Responsibility Boundary / Constraints | no Unit-level omission after Target formation; if Benefit or Benefit-boundary/constraint meaning is not sufficiently resolved, keep `OPEN` rather than inventing placeholder Benefits/boundaries |
| `RU-APP-04` | accepted/possible Benefits need downstream coverage/navigation or an explicit gap | `OMITTED` only when no Scenario/Evolution coverage is yet material; keep accepted intent and its gap truthful |
| `RU-APP-07` | feasibility can change concept, one or more Benefit Responsibility Boundary / Constraints, Benefit credibility or build/adapt/integrate position | `OMITTED` when feasibility is routine/trusted and cannot materially change selected Application meaning |

<a id="application-concept"></a>
<!-- Compatibility anchor: existing Application Identity references address this Application Concept Unit. -->
<a id="application-definition-identity"></a>
### Application Concept

`RU-APP-05` is the first Result Unit in the Application Definition. Keep the Application Concept short and immediately understandable:

```text
Summary:
<what this Application is + why it is needed / what overall Benefit it provides>

How it roughly works:
<small conceptual explanation of the basic working idea, only as much as needed to understand the Application>
```

Do not turn Application Concept into Feature decomposition, detailed interaction behavior, architecture, Domain design or implementation planning. Those details belong to their natural downstream owners.

The stable Application name/ID belongs in the document/Target heading, and Need / upstream driver references belong in ordinary source context. They do not require a Result Unit. The legacy `application-definition-identity` anchor routes here for old references; it does not restore retired `RU-APP-01`.

Concept Summary owns only the concise whole-application explanation and selected contribution. Refer to `AB-*` for detailed User Need, User Receives and Benefit-local boundaries; do not repeat their catalog or constraints. Refer to `RU-APP-02` for alternative-route justification, `RU-APP-04` for Scenario/Evolution coverage, and `RU-APP-07` for feasibility.

Terminology at Application Definition may still be immature. A one-off broad label does not require forced canonicalization; when a recurring or behavior-significant concept is already sufficiently clear, it may establish/refine canonical vocabulary here. If later Feature work sharpens the meaning, preserve the vocabulary lineage rather than silently replacing the earlier concept with an unrelated synonym.

<a id="existing-solutions--market--reference-research"></a>
### Existing Solutions / Market / Reference Research

Keep proportional evidence and interpretation about build/buy/adapt/integrate/hybrid alternatives only when it can change the Application Definition. Reference products are Evidence/Proposal inputs, not semantic authority.

<a id="application-benefits"></a>
### Application Benefits

`RU-APP-03` owns independently addressable `AB-*` items. Minimum exact representation:

```text
AB-<id> — <short name>
Planning position: Selected | Possible   # only when materially useful

User Need:
<required wanted outcome / problem in user terms>

User Receives:
<required value/result the user receives>

Responsibility Boundary / Constraints:
<required Benefit-local boundary: what the Application owns/provides, what remains with the actor/manual process/external system or is merely consumed/displayed/forwarded/derived, plus any material Benefit-local constraints/non-goals/responsibility must-holds; do not invent constraints when none are material>

Additional Info:
<optional free-form clarification; omit field entirely when no extra meaning is useful>
```

<a id="sds-application-benefit-boundary-constraints"></a>
#### Benefit-local Responsibility Boundary / Constraints

Responsibility ID: `SDS.APPLICATION-BENEFIT-BOUNDARY-CONSTRAINTS`

`Responsibility Boundary / Constraints` is **Benefit-local**. It states the Application's promise boundary for that Benefit **and** the material Benefit-local constraints/non-goals/responsibility must-holds that limit that promise. Do not create a second standalone Application-level Responsibility Boundary Result Unit, and do not pull downstream Feature/Scenario/implementation Requirements into this slot merely because they are related. Cross-Benefit consistency may be reviewed, but the authoritative boundary/constraint meaning remains on the affected `AB-*` items.

When downstream precision is useful, individual boundary/constraint clauses may receive small Benefit-local labels such as `BC-01`, `BC-02`. These labels are addressability inside the `AB-*` owner, **not a new Requirement family or new semantic owner**.

```text
whole Benefit is the real driver
→ reference AB-X

only one bounded boundary/constraint clause is the real driver
→ prefer AB-X / BC-Y when that clause is addressable

AB-X / BC-Y reference
≠ claim that the downstream consumer realizes the whole Benefit
```

Plain `AB-*` references remain valid when the whole Benefit is relevant or finer precision adds no value. This precision rule is optional and exists to avoid overstating downstream coverage, not to force clause IDs everywhere.

`Additional Info` has **no mandatory internal schema**. It may clarify context, examples, scope or other material meaning that does not belong in the required boundary/constraint slot; do not force extra fields for every Benefit.

One Benefit may relate to several Scenarios and one Scenario may manifest several Benefits. The Scenario owns the real-life journey and Application Contributions; this Unit owns only coverage/navigation.

<a id="representative-real-life-scenarios"></a>
<!-- Compatibility anchor for earlier RU-APP-04 references. -->
### Scenario / Evolution Coverage

`RU-APP-04` identifies natural current Scenario owners or Step-owned future Scenario Target Bodies that address accepted/possible `AB-*` intent. It may point to a concrete Evolution Step, note an uncovered Benefit, or keep a coverage relation unresolved. It does not contain the actor/external/Application path, provisional Feature behavior or a second Scenario body. Coverage is not proven merely by one Scenario per Benefit: materially distinct real-life experience and Application-Contribution variants are checked by the Scenario owner.

```text
AB-* / BC-* → current Scenario ref | Step-owned future Scenario ref | OPEN coverage
```

Application Definition remains the upstream temporal exception: it may carry accepted future intent before the corresponding Step or downstream owner is realized. `RU-APP-04` does not force a speculative Step identity to fill a roadmap.

<a id="realization-feasibility"></a>
### Realization Feasibility

Use proportional Evidence about representative runtime feasibility, persistence/integration/consistency/performance/operability/cost only when it can change Application meaning. Literal mechanism selection remains downstream/Exact unless the mechanism itself becomes selected durable semantic meaning.

### Alternatives / Comparison

Material Application alternatives remain ordinary Proposal / Planning Branch / Decision state until selected. Benefit/coverage content is not a substitute for candidate comparison.

### Explicit Unit Checkpoint Placement

Each material Unit inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-envelope). Opening/Closing are logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-APP-05` processing envelope

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-APPLICATION-BOUNDARY-FEASIBILITY`](../lenses/reusable/LENS-APPLICATION-BOUNDARY-FEASIBILITY.md)
- **TRIGGERED:**
  - [`LENS-TERMS-UBIQUITOUS-LANGUAGE`](../lenses/reusable/LENS-TERMS-UBIQUITOUS-LANGUAGE.md)

1. **Opening Unit Checkpoint — `RU-APP-05`** — bind the exact reusable Unit owner(s)/methodology before substantive work and resolve/reuse current applicable Core + active-profile Lens/registry pressure.
2. **Unit Work — `RU-APP-05`** — produce/refine only the meaning owned by this Result Unit; run additional applicability checks when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-05`** — evaluate the actual Unit result/disposition, route material Findings/owner consequences, and reopen/refine narrowly when needed before handoff.

#### `RU-APP-02` processing envelope

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-APPLICATION-BOUNDARY-FEASIBILITY`](../lenses/reusable/LENS-APPLICATION-BOUNDARY-FEASIBILITY.md)
- **TRIGGERED:**
  - [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md)

1. **Opening Unit Checkpoint — `RU-APP-02`** — bind the exact reusable Unit owner(s)/methodology before substantive work and resolve/reuse current applicable Core + active-profile Lens/registry pressure.
2. **Unit Work — `RU-APP-02`** — produce/refine only the meaning owned by this Result Unit; run additional applicability checks when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-02`** — evaluate the actual Unit result/disposition, route material Findings/owner consequences, and reopen/refine narrowly when needed before handoff.

#### `RU-APP-03` processing envelope

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-APPLICATION-BOUNDARY-FEASIBILITY`](../lenses/reusable/LENS-APPLICATION-BOUNDARY-FEASIBILITY.md)
- **TRIGGERED:**
  - [`LENS-TERMS-UBIQUITOUS-LANGUAGE`](../lenses/reusable/LENS-TERMS-UBIQUITOUS-LANGUAGE.md)
  - [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md)

1. **Opening Unit Checkpoint — `RU-APP-03`** — bind the exact reusable Unit owner(s)/methodology before substantive work and resolve/reuse current applicable Core + active-profile Lens/registry pressure.
2. **Unit Work — `RU-APP-03`** — produce/refine only the meaning owned by this Result Unit; run additional applicability checks when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-03`** — evaluate the actual Unit result/disposition, route material Findings/owner consequences, and reopen/refine narrowly when needed before handoff.

#### `RU-APP-04` processing envelope

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-APPLICATION-BOUNDARY-FEASIBILITY`](../lenses/reusable/LENS-APPLICATION-BOUNDARY-FEASIBILITY.md)

1. **Opening Unit Checkpoint — `RU-APP-04`** — bind the exact reusable Unit owner(s)/methodology before substantive work and resolve/reuse current applicable Core + active-profile Lens/registry pressure.
2. **Unit Work — `RU-APP-04`** — produce/refine only the meaning owned by this Result Unit; run additional applicability checks when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-APP-04`** — evaluate the actual Unit result/disposition, route material Findings/owner consequences, and reopen/refine narrowly when needed before handoff.

#### `RU-APP-07` processing envelope

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-APPLICATION-BOUNDARY-FEASIBILITY`](../lenses/reusable/LENS-APPLICATION-BOUNDARY-FEASIBILITY.md)
- **TRIGGERED:**
  - [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md)
  - [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md)
  - [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md)
  - [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md)
  - [`LENS-PRACTICAL-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-PRACTICAL-EVIDENCE.md)

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
CONTENT: concise Application Concept; Application Benefits including per-Benefit Responsibility Boundary / Constraints; build/buy/adapt/integrate position; Scenario/Evolution coverage references and accepted-intent gaps where material (not journey bodies or Application-Contribution semantics); feasibility conclusion
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
CONTENT_KIND: SCENARIO_EVOLUTION_COVERAGE
WHEN: independent Scenario/Evolution coverage navigation is materially useful
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Application Definition / RU-APP-04
REPRESENTATION: EMBED_OR_SEPARATE_COVERAGE_PROJECTION
FILE_OR_ARTIFACT: <application-definition-owner> or <coverage-projection>
CONTENT: AB-* / BC-* to current Scenario or Step-owned future Scenario references; accepted intent coverage gaps
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```


Shell placement semantics: [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../../../idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md).

**REQUIRED** — an accepted Application Definition used downstream must have one canonical persistent representation when persistence is material. It remains the upstream semantic owner even when downstream realization lags behind the selected intent.

**PREFERRED** — substantial market/reference research may use a supporting Evidence artifact when it is too large/volatile for the canonical Application Definition. Research observations surface Finding Candidates; Core Finding Disposition may resolve accepted material as Evidence/Proposals or another appropriate State, but never as a second application-semantic owner merely because it came from reference research.

**OPTIONAL separate artifact** — a compact coverage projection may be separate when independently reused/reviewed. It references Scenario/Evolution owners and never becomes a second journey authority.

**Keep embedded by default** — concise Application Concept, Application Benefits with their Responsibility Boundary / Constraints, and feasibility conclusion belong to the Application Definition owner rather than separate files per field.

`P-14` must show the exact/logical destination of each accepted/supporting item and mark unresolved placement explicitly.

## Validators

```text
traces to Fundamental Need + Step-02 contribution
obvious existing solutions were proportionally checked
custom build remains knowingly justified or a material challenge is dispositioned to Step-02 revalidation/reopen
Application Benefits state User Need + User Receives + Benefit-specific Responsibility Boundary / Constraints; Additional Info remains optional free-form
no standalone Responsibility Boundary Result Unit is introduced; cross-Benefit consistency review returns meaning to the affected AB-* owners
RU-APP-04 references natural Scenario/Evolution authorities and makes uncovered accepted Benefit intent visible without copying real-life journeys
Benefit ↔ Scenario coverage may be many-to-many, including materially distinct path/contribution variants
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

## Copied project example

[Study Tab Launcher — Need/Benefits могут предшествовать realization; selected AB-STL-04 не превращает будущее поведение в current](../examples/study-tab-launcher/project/planning/documentation/application-definition.md). Read the [case guide and capture limits](../examples/study-tab-launcher/README.md) with the current module contract; the copied project is a dated example, not live application authority.
