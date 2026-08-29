# TM-SCREEN — Screen / Spatial Owner

Entry Point: `tm.screen`  
Role: supporting spatial Target Module; conditional  
Repository provenance: detailed-planning Screen contract + `SCREEN-DRAFT-TEMPLATE.md`. Current repo intentionally has no separate Screen Use Case.

## Purpose
Own application spatial/window meaning proportionally:

```text
Screen Map / window inventory
Scenario × Screen relations
visibility/availability of behavior and DATA per Screen
routes/transitions through Screens
individual Screen spatial composition when addressable depth is useful
```

Screen planning does not own Scenario behavior or frontend implementation.

A simple application may keep the Screen Map and Screen Drafts in one Target Instance. A large UI may split independently reviewable Screen Targets only when that gives real planning/revalidation value.



## High-Level Example — Self-Contained Walkthrough

### Situation

The application already has selected Scenarios:

```text
Capture Material
Review Captured Items
Transfer Selected Item
```

The behaviors are understood, but users still need a coherent spatial/window arrangement.

### Why This Module

Scenario owns **what behavior means**.

`TM-SCREEN` owns **where information/actions are available and how users move between spatial surfaces**.

This is why Screen planning happens separately.

### Walkthrough

A Screen Map might select:

```text
Reading / Capture Surface
  capture action available
  selected material/source context visible

Capture Result Surface
  success/failure feedback

Review Inbox
  captured items visible
  triage actions available

Item Detail
  detailed content
  transfer action
```

Scenario × Screen mapping:

```text
SCN-CAPTURE
  Reading Surface
  Capture Result

SCN-REVIEW
  Review Inbox
  Item Detail
```

Behavior availability:

```text
capture action:
  available on Reading Surface

transfer:
  available on Item Detail
```

Routes:

```text
Reading Surface
→ Capture Result
→ back to Reading

Review Inbox
→ Item Detail
→ Review Inbox
```

### Result

The Screen Target can produce:

```text
Screen Map
Scenario × Screen Map
Behavior availability/visibility
DATA visibility/input map
routes/transitions
individual Screen Drafts
```

### Boundary / Lesson

Moving “capture” from one window to another normally changes Screen realization, not Scenario behavior identity.

A Screen is not a Scenario, and a component hierarchy is not automatically the Screen model.

## Upstream Source Contract

### Direct Semantic Sources
```text
selected Scenarios
Behavior Items whose interaction meaning is spatially presented
Scenario DATA that must be visible/input/editable
spatial/accessibility Requirements
preliminary SCREEN_WINDOW_IDEA entries from `SDS-PLANNING-STATE/ideas/scenario/IDEAS.md`
```

### Inherited Lineage
```text
Need / selected real-world solution
Application Definition / Responsibility Boundary
```

### Evidence / Current-State Sources
```text
Prototype/UI/usability Evidence
current UI/window map when reviewing
```

### Constraint / Planning-State Sources
```text
platform/window constraints
design-system/accessibility constraints
```

### Source Discovery Rule
Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Screen owns canonical spatial/UI meaning only when spatial responsibility is independently useful.
- Screen is not a substitute for Scenario behavior, Domain meaning or implementation structure.
- UI elements/actions/feedback must remain traceable to the semantic behavior they realize.

**Referenced Knowledge Owners:**

`NONE`

**Reference Load Policy:**

No additional Knowledge Basis body is required by default; reusable UI/spatial evaluation knowledge remains in the UI Lens.

**Operationalization Notes:**

This Knowledge Basis supports planning this recurring Target/result family. It is not a current Target Source, project truth or Decision. Reusable cross-Target evaluation knowledge remains in the Lens owners named by this module's `Lens Profile`; do not duplicate their Operational Evaluation Contract or Knowledge Basis here.

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Primary reusable Lens Pack(s):
- [`LENS-UI-SPATIAL-FRONTEND-REALIZATION`](../lenses/reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md) — required for spatial/visibility/reversible-placement reasoning

Frequent conditional Lens(es):
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — when discoverability/recovery/operation must be credibly evaluated
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — accessibility/UX/other material quality dimensions

## Question Set Examples — Non-Exhaustive

Examples only. Current `TF-06 QUESTION_SET` may add/remove/split/merge questions.

```text
What Screens/windows/surfaces are needed for selected Scenarios?
Which are stable owners vs temporary/modal/transient presentation?
Through which Screens does each Scenario pass?
Which Behavior Items are available/observable on each Screen?
Which Scenario DATA is visible/input/editable/selectable/derived on each Screen?
What are the entry/exit/navigation relations between Screens?
Which visibility/availability states materially change what the actor can understand/do?
Which zones/spatial hierarchy are stable requirements?
What remains Scenario/Behavior meaning rather than Screen meaning?
Which preliminary screen ideas remain unselected and belong in global ideas?
```

## Resolution / Production Method

This module uses the existing `Upstream Source Contract`, `Question Set Examples`, `Lens Profile`, Knowledge Basis and any module-specific Idea/branch/pattern aids to produce/refine the declared Result Units. Concrete Questions, Ideas, Q/R/P, Decisions and Evidence remain Core State Units.

Default reusable production path:

```text
derive selected spatial owners from Scenario behavior/DATA → build Screen Map relations → deepen only material Screen Draft objects → preserve unselected spatial ideas as Core Idea State
```

A Screen Draft is an addressable internal object, not an Application Scenario or frontend component by name alone.

A Lens may surface Finding Candidates while this method runs. Their State/lifecycle/owner destination is resolved by the Core [`Finding Disposition Contract`](../../../idtspe-core/shared/finding-disposition-contract.md); a Lens does not directly mutate accepted Result Units.

## Target Step-Result Contract

**Target Step Result:** `Screen / Window Spatial Model`

The possible result surface is proportional/sparse. Generic IDTSPE State is not duplicated as target-specific fields.

| Result Unit | Meaning | Current projection detail |
|---|---|---|
| `RU-SCREEN-01` | Screen Map | Screen inventory + Scenario×Screen + Behavior availability + DATA visibility + routes/transitions + global spatial constraints |
| `RU-SCREEN-02` | Screen Draft Set | addressable Screen Draft objects using the module internal object shape |

Only applicable/material Result Units are projected for one concrete Target step. Result Unit identity does not imply a separate Target or file.



### Screen Map

**Screen / Window Inventory** — current selected spatial owners/surfaces with stable IDs and purpose.

**Scenario × Screen Map** — for every selected Scenario, which Screens participate and what role each Screen plays. This is a relation map, not Scenario behavior ownership.

**Behavior Availability / Visibility Map** — which Behavior Items are available, invokable or observable on each Screen.

**DATA Visibility / Input Map** — which Scenario DATA is visible, entered, edited, selected, compared or derived on each Screen.

**Screen Routes / Transitions** — meaningful entry/exit/navigation/window transitions used by selected Scenarios, including re-entry/back/cancel/recovery when material.

**Global Spatial Constraints** — application-wide navigation/window/platform/accessibility constraints that legitimately belong to spatial planning.

### Individual Screen Draft — Addressable Internal Object

For each Screen that needs independent depth:

```text
Screen ID / Name
Purpose / Scenario roles
Spatial boundary
Zones / hierarchy
Material layout / visibility states
Behavior refs available/observable here
DATA refs visible/input/editable here
entry / exit / route relations
spatial/accessibility requirements
visual/reference Evidence — optional
```

A Screen Draft is an addressable spatial object inside this module family; it does not become an Application Scenario or frontend component by name alone.


## State-Unit / Idea Handling

Unselected Screen/window ideas remain in:

```text
SDS-PLANNING-STATE/ideas/scenario/IDEAS.md
```

They become Screen Map meaning only through normal IDTSPE Decisions.

## Guards
```text
Screen ≠ Scenario
Screen does not own DATA/Behavior
frontend implementation ≠ Screen semantic authority
```

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-SCREEN-01
CONTENT_KIND: SCREEN_MAP
WHEN: selected Screen topology/spatial plan is used downstream
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Screen Target
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <screen-map-owner>
CONTENT: Screen Map; Scenario x Screen map; Behavior availability; DATA visibility/input; routes/transitions
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-SCREEN-02
CONTENT_KIND: INDIVIDUAL_SCREEN_DRAFT
WHEN: one Screen needs independent addressability/review/reuse
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Screen Target or selected Screen sub-owner according to profile
REPRESENTATION: SEPARATE_ADDRESSABLE_ARTIFACT
FILE_OR_ARTIFACT: <screen-draft-owner>
CONTENT: individual Screen spatial/interaction draft; references Scenario/Behavior/DATA authority
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED** — selected Screen Map / Scenario×Screen / Behavior-DATA availability/routes used for implementation must have a canonical persistent spatial owner.

**PREFERRED** — keep global Screen Map/navigation relations together; individual Screen Drafts may become separate canonical/supporting artifacts when they have independent size/review/reuse value.

**Do not move** Scenario behavior or Scenario DATA semantic definitions into Screen files as a second authority; Screen artifacts reference them and own only spatial meaning.

Unselected spatial ideas remain in the Scenario-layer Ideas register until selected.

`P-14` must distinguish the Screen Map owner, individual Screen Draft artifacts and any generated navigation projection.

## Validators
```text
Screen Map covers all material selected Scenario↔Screen relations or marks gaps explicitly
Scenario×Screen relation is discoverable from both owners when reciprocal storage is used
Behavior/DATA meaning remains owned upstream
routes/transitions do not silently invent Scenario behavior
individual Screen Drafts are consistent with the global Screen Map
placement remains reversible when semantics allow
```



## Handoff

```text
TM-FRONTEND-SLICE / frontend Part Plan
TM-IMPLEMENTATION-SLICE when UI is material
TM-TEST-DESIGN / TM-PRACTICAL-TEST for spatial/interaction proof
```

Screen output is an additional Source for UI/full-stack realization; backend-only Slice normally does not require it unless directly constrained by spatial meaning.
