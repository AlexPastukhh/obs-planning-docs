# TM-SCENARIO-DRAFT — Detailed Application Scenario

Entry Point: `tm.scenario.draft`  
Role: primary composite Target Module  
Target form: application Scenario

## Scenario Definition

```text
Application Scenario
=
one actor/user Need in context
+
visible/expected Application behavior
+
one independently meaningful observable result
```

Scenario is behavioral authority.

## Purpose

Plan one coherent Scenario and internally discover/refine Scenario DATA, Behavior Items, Requirements/invariants and Screen relations until Domain/Slice/Test planning can consume selected meaning without inventing missing behavior.



## High-Level Example — Self-Contained Walkthrough

### Situation

Scenario Discovery selected:

```text
SCN-CAPTURE:
  while reading, the user needs to preserve a useful fragment
  so it is durably available for later review
```

Now downstream Domain, Screen, Slice and tests need a precise behavioral Source.

### Why This Module

`TM-SCENARIO-DRAFT` turns one selected Scenario boundary into a complete semantic behavior contract.

It owns Scenario DATA and Behavior Items as internal addressable objects because those are parts of Scenario meaning, not separate Target Modules.

### Walkthrough

The Scenario may define semantic DATA:

```text
Selected Material
  what the user chose to preserve

Source Context
  where the material came from

Optional Short Thought
  a small note the user may attach

Capture Result
  truthful accepted/failure result
```

Behavior may include:

```text
accept capture request
preserve required source context
confirm success only after durable acceptance
report persistence failure
never produce false success after failure
```

Acceptance meaning becomes:

```text
Given valid material and source context
When capture is accepted
Then the material is durably available later
And success is shown only after that condition is true
```

### Result

The result is one Scenario owner containing:

```text
actor/context
Need
observable result
start/re-entry
main/alternate/failure behavior
Scenario DATA
addressable Behavior Items when useful
must-hold/negative guarantees
acceptance meaning
Screen/Domain clues
```

### Boundary / Lesson

Scenario DATA is not a DTO/database schema.

Behavior Item is not “one method”.

Screen placement and implementation remain separate owners.

## Upstream Source Contract

### Direct Semantic Sources
```text
selected Scenario boundary/catalog result
accepted Need / Desired Outcome served by this Scenario
selected Step-02 real-world solution scope/result this Scenario realizes
accepted Application Definition / Responsibility Boundary
Application Concept when useful
accepted shared Requirements
existing shared Scenario DATA / Behavior owners
canonical Screen owners when already material
```

### Inherited Lineage
```text
Current Reality / Success Meaning
surrounding human/process/external-system responsibilities
```

### Evidence / Current-State Sources
```text
Prototype Evidence/candidates
observed workflow/behavior Evidence
```

### Constraint / Planning-State Sources
```text
application/external constraints
upstream accepted tradeoffs / residual planning concerns
```

### Source Discovery Rule
Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Scenario Draft owns one selected application behavior/result path; Scenario DATA and Behavior Items are internal addressable contracts, not separate Target Modules.
- Behavior describes observable semantic progression rather than UI clicks or implementation calls.
- Supporting Screen/Requirement Targets are justified only when independent semantic ownership exists.

**Referenced Knowledge Owners:**

`NONE`

**Reference Load Policy:**

No additional Knowledge Basis body is required by default; reusable Scenario evaluation knowledge remains in the Scenario Lens.

**Operationalization Notes:**

This Knowledge Basis supports planning this recurring Target/result family. It is not a current Target Source, project truth or Decision. Reusable cross-Target evaluation knowledge remains in the Lens owners named by this module's `Lens Profile`; do not duplicate their Operational Evaluation Contract or Knowledge Basis here.

## Internal Object Contract — Scenario DATA

Scenario DATA is semantic information the actor/user must see, enter, select, receive, compare, understand or otherwise use during the Scenario, plus external/derived information required for that behavior.

Not automatically:
```text
DTO field
DB column
component state
implementation-only ID/timestamp
```

Typical discovery questions:
```text
What information is needed/produced?
Why does it matter to the Scenario result?
Where does truth come from?
When is it available?
Which Behavior Items consume/produce/change it?
Is it Scenario-local or shared?
What Requirement/Domain clue does it expose?
```

Suggested fields:
```text
DATA ID — stable identity
Meaning — Scenario-level information meaning
Placement/Owner — local/shared/external
Source/Authority — truth owner
Availability — when usable
Semantic states/values — only meaningful states
Consumed By — Behavior refs
Produced/Changed By — Behavior refs
Requirements / Domain clues — related meaning
```

## Internal Object Contract — Behavior Item

Behavior Item is any stable addressable fragment of required Scenario behavior.

It may be:
```text
action / response
state / condition transition
decision / policy behavior
validation / rule
invariant
failure / rejection
no-mutation guarantee
information derivation / presentation
```

Not automatically:
```text
method
endpoint
implementation task
Slice
runtime branch with no stable behavioral meaning
```

Suggested fields:
```text
Behavior ID — stable identity
Purpose/Result — why it exists
Conditions/Preconditions — when it applies
Input DATA — semantic input
Behavior — selected expected response
Output DATA/Observable Result — result/change
State/Condition Transition — when semantic
Failure/Rejection — negative path
No-Mutation Guarantee — what must remain unchanged
Requirements/Invariants — must-hold meaning
Domain Clues — identity/lifecycle/rule evidence
Acceptance Meaning — what downstream proof should observe
```

Addressability/file separation does not create a separate Target Module/Use Case.

## Question Set Examples — Non-Exhaustive

Examples only. Current `TF-06 QUESTION_SET` may add/remove/split/merge questions.

```text
What actor/context and Need justify this Scenario?
What observable result closes it?
What starts/re-enters it?
What visible/expected Application behavior is required?
What alternate/failure behavior is material?
What DATA must the user see/enter/select/receive/understand?
Which stable Behavior Items deserve addressability?
Which rules/invariants/no-mutation guarantees are part of behavior?
Which Requirements constrain it?
Which Screens/windows might spatially realize it?
What Domain identity/lifecycle/rule clues appear?
What Acceptance meaning must downstream proof establish?
```


## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Primary reusable Lens Pack(s):
- [`LENS-SCENARIO-BOUNDARY-BEHAVIOR`](../lenses/reusable/LENS-SCENARIO-BOUNDARY-BEHAVIOR.md) — required for behavior/DATA/failure/acceptance completeness

Additional reusable Lens Pack(s):
- [`LENS-UI-SPATIAL-FRONTEND-REALIZATION`](../lenses/reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md) — when Screen/window relations are material

Frequent conditional Lens(es):
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — when a quality/risk dimension changes observable behavior

## Preliminary Screen/Window Ideas — Optional User Question

When UI/window planning is relevant and the user has not already supplied such ideas, the module may ask once whether to sketch preliminary window/screen ideas.

Accepted preliminary Screen/window ideas are stored in `SDS-PLANNING-STATE/ideas/scenario/IDEAS.md` (or `ideas/INBOX.md` while unstructured) for later `TM-SCREEN`.

They are not selected Screen decisions.

## Resolution / Production Method

This module uses the existing `Upstream Source Contract`, `Question Set Examples`, `Lens Profile`, Knowledge Basis and any module-specific Idea/branch/pattern aids to produce/refine the declared Result Units. Concrete Questions, Ideas, Q/R/P, Decisions and Evidence remain Core State Units.

Default reusable production path:

```text
stabilize independently meaningful Scenario identity → resolve selected behavior/failure/postconditions → construct addressable DATA/Behavior semantic objects → attach spatial relations without transferring Scenario behavior ownership
```

Scenario DATA and Behavior Item remain Internal Object Contracts/addressable objects, not separate Target Modules.

A Lens may surface Finding Candidates while this method runs. Their State/lifecycle/owner destination is resolved by the Core [`Finding Disposition Contract`](../../../idtspe-core/shared/finding-disposition-contract.md); a Lens does not directly mutate accepted Result Units.

## Target Step-Result Contract

**Target Step Result:** `Scenario Draft`

The possible result surface is proportional/sparse. Generic IDTSPE State is not duplicated as target-specific fields.

| Result Unit | Meaning | Current projection detail |
|---|---|---|
| `RU-SCEN-01` | Scenario Identity | Scenario Identity |
| `RU-SCEN-02` | Expected Application Behavior | Expected Application Behavior |
| `RU-SCEN-03` | Scenario Semantic Model | Scenario DATA refs/owners + Behavior Item refs/owners + Requirements/Invariants; uses internal object contracts |
| `RU-SCEN-04` | Spatial Relations | Screen / Window relations |

Only applicable/material Result Units are projected for one concrete Target step. Result Unit identity does not imply a separate Target or file.



### Scenario Identity
**Scenario ID** — stable identity.  
**Actor / Context** — who has the Need and in what situation.  
**Need / Goal** — user-world reason.  
**Observable Result** — independently meaningful closing result.

### Expected Application Behavior
**Entry / Preconditions** — what must already be true.  
**Main Behavior** — selected visible/expected response.  
**Alternate / Failure Behavior** — material non-happy paths.  
**Postconditions / Outcomes** — what is true afterward.  
**Acceptance Meaning** — observable evidence of result without prescribing test implementation.

### Internal Semantic Objects
**Scenario DATA refs/owners** — semantic information.  
**Behavior Item refs/owners** — stable addressable behavior.  
**Requirements / Invariants** — must-hold meaning owned locally by Scenario/Behavior by default; `TM-REQUIREMENT` is only an exceptional shared canonical owner.

### Spatial Relations
**Screen / Window relations** — selected spatial owners and Scenario role/range on them.

## Domain Readiness Gate

Ready when proportionally:
```text
Need/result/scope selected
material happy/alternate/failure behavior represented
behavior-critical DATA owned/referenced
material stable behavior represented as Behavior Items
rules/invariants/no-mutation guarantees visible
Requirements routed
Screen relations consistent when material
Acceptance meaning explicit
Domain clues discoverable
no blocking unresolved planning issue
```

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-SCN-01
CONTENT_KIND: SCENARIO_SEMANTICS
WHEN: Scenario is accepted/used downstream
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Scenario Target
REPRESENTATION: EXISTING_CONSOLIDATED_SCENARIO_ARTIFACT_OR_DEDICATED_SCENARIO_ARTIFACT
FILE_OR_ARTIFACT: <scenario-catalog-or-consolidated-owner>#<scenario> or <scenario-owner>
CONTENT: actor/context; Need; observable result; main/alternate/failure behavior; acceptance; relations
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-SCN-02
CONTENT_KIND: SCENARIO_DATA_BEHAVIOR
WHEN: Scenario DATA/Behavior Items are material/addressable
GUIDANCE: REQUIRED_EMBED_DEFAULT
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Scenario Target
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <scenario-owner>
CONTENT: Scenario DATA and Behavior Item internal object contracts; IDs allowed without separate semantic/file owners
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-SCN-03
CONTENT_KIND: PRELIMINARY_SCREEN_IDEA
WHEN: Scenario planning reveals unselected Screen/window idea
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: UNRESOLVED until Screen planning selects it
REPRESENTATION: REGISTER_ENTRY
FILE_OR_ARTIFACT: SDS-PLANNING-STATE/ideas/scenario/IDEAS.md
CONTENT: preliminary Screen/window idea and provenance
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED durable human-readable Scenario representation** — an accepted Scenario used by Screen/Domain/Slice/Test should not exist only in code/tests/chat. It may be a dedicated `SCN-<id>.md` or, while still small and fully reviewable, a section of a consolidated Scenario artifact. Scenario persistence pressure is intentionally stronger than Domain implementation-detail persistence.

**EMBED by default** — Scenario DATA and Behavior Items are internal Scenario object contracts and normally remain inside the Scenario owner even when addressable by IDs.

**Separate DATA/Behavior artifact only when justified** by independent reuse/review/size/addressability through Artifact Boundary analysis; file separation does not create new Target Modules or equal semantic authorities.

**ROUTE ELSEWHERE** — preliminary Screen/window ideas remain in `SDS-PLANNING-STATE/ideas/scenario/IDEAS.md` until selected by Screen planning.

`P-14` must list accepted Scenario content, any supporting/companion artifact, and any DATA/Behavior placement still unresolved.

## Handoff

```text
TM-DOMAIN-DISCOVERY
TM-SLICE-STRATEGY
TM-IMPLEMENTATION-SLICE when applicable
TM-SCREEN
TM-TEST-DESIGN
UC-IDTSPE-REVIEW-CONSISTENCY
```
