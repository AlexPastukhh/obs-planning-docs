# IDTSPE Shell — Generic Planning Runtime / Composition Contract

Status: active generic methodology owner  
Purpose: define IDTSPE as a reusable shell that composes one concrete Target with typed Sources, reusable Lenses, Questions, Ideas, Decisions, output projection and revalidation without hard-coding any domain/application module.

## Core Formula

```text
IDTSPE Shell
+ Trigger / Invocation
+ Target Formation Resolution Set
+ Target Module or Local Target Contract
+ typed Source Set
+ Lens Set
+ Question Set
+ Idea / Variant Space
+ optional Planning Branches
+ Q/R/P
+ three Decision types
+ Target-specific Output Projection
+ Artifact Placement View
+ Validators / Guards
+ Handoff
+ Evidence / Revalidation lifecycle
= one bounded planning instance
```

The shell owns **planning mechanics**. It does not own current product/domain/application semantics.

## Three Durable Decision Types

```text
Target-Scope Decision
Question-Set Decision
Answer Decision
```

There is no Lens Decision, Source Decision or Revalidation Decision type merely because those mechanisms exist.

A material choice inside Source/Lens composition maps to one of the three normal Decision types when a durable Decision is actually needed.

## Shell Ports

### P-01 Invocation Port

Input:
```text
Trigger
requested operation/mode
current planning context
invocation mode: CREATE | REFINE | EXTEND | REVALIDATE | REPAIR
current Target artifact(s) when they exist
permission boundary
```

Output: next bounded Target candidate / orchestration route plus current invocation mode. Reusing the same Target with `REFINE`/`REVALIDATE` is normal when durable owner representations already exist.

### P-02 Target Port

Connects:
```text
Target Instance
↔ Target Module / Target Type / local Target Contract
```

Resolved through `TF-01 PURPOSE_OUTPUT`, `TF-02 TARGET_TYPE_FORM`, `TF-03 TARGET_SCOPE`.

### P-03 Source Port

Connects typed inputs:
```text
Direct Semantic Sources
Inherited Lineage
Evidence / Current-State Sources
current canonical Target artifact(s) when refining/revalidating an existing owner
Constraint / Planning-State Sources
```

Resolved through `TF-04 SOURCE_SET` and L2 Authority/SoT/Reuse.

Source relation is separate from Target topology relation.

### P-04 Relation Port

Connects Target topology:
```text
PART_OF
PARALLEL_WITH
PRECEDES
FLOW_TO
OVERLAPS_WITH
ALTERNATIVE_TO
CONTRIBUTES_TO
```

Resolved through `TF-05 TARGET_RELATIONS`.

A relation does not automatically create Source authority.

### P-05 Question Port

Connects:
```text
Target Module Question examples
Source-derived questions
Lens-generated questions/findings
current unresolved Q/R/P
```

into one selected `Question Set` through `TF-06 QUESTION_SET`.

Question examples are non-exhaustive and are not automatic user questions.

### P-06 Lens Port

Resolves reusable evaluation perspectives through the proportional **Lens Applicability Scan**:

```text
Required Core Pack
+ active Target Module Lens Profile when a reusable module is used
+ registered Core/profile Lens candidates whose applicability gates are plausible
+ explicitly requested Lens
+ exceptional local-only Lens
↓
TF-06A LENS_SET
```

Required Core Pack:

```text
L1 Need / Value / Scope
L2 Authority / Source-of-Truth / Reuse
L3 Uncertainty / Assumption / Reversibility
Documentation / Representation / Artifact Boundary at materialization
```

A Local Target Contract uses the same Lens Port without inventing a Target Module. Registry summaries/gates are enough for the scan; read full Lens bodies and referenced Knowledge Basis only for selected/plausibly applicable candidates.

Lens findings feed normal Evidence / Ideas / Q/R/P / Answer Decisions. A Lens does not become semantic authority.

### P-07 Idea / Alternative Port

Connects materially different answer candidates from:
```text
user input
Sources
AI proposals
Target Module pattern aids
Lens findings
research/prototype Evidence
```

Resolved through `TF-07 IDEA_SPACE`.

AI proposal remains an unselected Idea until accepted.

### P-08 Branch Port

Connects optional counterfactual planning networks when shallow comparison is insufficient.

Resolved through `TF-08 BRANCH_POLICY`.

A Planning Branch is not one Idea; it is an alternative downstream planning network from a shared Fork State.

### P-09 Q/R/P Port

Carries material unresolved:
```text
Question
Risk
Problem
```

attached to the real planning subject/Decision. Q/R/P is not a parallel semantic-root model.

Optional review/trace mechanics are owned by [`shared/qrp-priority-groups-and-decision-trace.md`](shared/qrp-priority-groups-and-decision-trace.md): impact priority, related Q/R/P grouping, and Decision `Addresses` / `Exposes` links. These extend existing P-09; they do not create a second Concern runtime.

### P-10 Decision Port

Turns selected material answers into the three durable Decision types while preserving user authority rules.

```text
AI proposal
≠ accepted Decision
```

When useful, a Decision may declare:

```text
Addresses: <Q/R/P IDs or related group>
Exposes:   <newly revealed/created Q/R/P IDs>
```

The trace is explanatory/revalidation metadata, not a new Decision type.

### P-11 Output Projection Port

Projects accepted answers into the `Target-Specific Output Template` supplied by the active Target Module/local contract.

```text
Target-specific output
≠ generic IDTSPE state
```

Generic Scope/Questions/Ideas/QRP/Branches/Decisions/Revalidation are not duplicated in module templates.

### P-12 Validation Port

Runs:
```text
Target Module validators
Lens guards
core authority/user guards
cross-owner consistency checks when invoked
```

Validator findings route to the real owner; they do not become a substitute Target.

### P-13 Handoff / Methodology Direction Port

Resolves `TF-09 HANDOFF` through the **active profile/family's Next-Step Resolver**. The Shell owns the port and required response shape; it does not own one universal Scenario/Domain/Slice chronology.

```text
accepted Target output
→ typed downstream Source(s)
→ active profile/family readiness resolver
→ methodology readiness / next likely Target
```

Current installed SDS example: [`../profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md`](../profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md).

Every material response should distinguish:

```text
Recommended next Target/action
Conditional alternatives
Repeat-current trigger
Backward-reopen trigger
```

The recommended next step is guidance, not permission to execute it automatically.

Handoff/topology relation and Source authority remain distinct.

### P-14 Persistence / Artifact Port

Resolves `TF-10 PERSISTENCE_ADDRESSABILITY` through the lightweight [`Artifact Placement And IDTSPE Response Contract`](shared/artifact-placement-and-idtspe-response-contract.md):

```text
for each material content unit:
  semantic owner?
  applicable AP-* Target Module proposal(s)?
  applicable AG-* Lens guidance?
  Documentation / Representation result?
    no persistence | implementation-native | existing owner section | registry/strategy | dedicated owner | companion | generated/global
  exact/logical/code/generated destination?
  create/update/reuse/embed/generate/no-action?
  unresolved persistence/placement?
  resolver / material placement Decision?
```

Every material IDTSPE response exposes an `Artifact Placement View`, even when no file mutation is authorized.

```text
semantic planning complete
≠ artifact placement invisible

Artifact Placement View
≠ file mutation
```

The required Documentation / Representation Lens runs before final P-14 placement whenever material output may persist. When representation/topology change is non-trivial, P-14 escalates to the deeper `Artifact / File Realization Pack`.

Semantic owner ≠ artifact/file boundary.

### P-15 Evidence / Revalidation Port

Connects post-choice Evidence to accepted Decisions:
```text
actual Evidence
→ compare with accepted basis / residual Q/R/P / watch signals
→ reaffirm or reopen narrowest appropriate level
```

Revalidation is lifecycle, not a peer Lens.

## Required IDTSPE Response Projection

For a material planning instance, the assistant should render proportionally:

```text
Current Target / Scope / Sources
Invocation mode + current artifact context
Resolved answers
Unresolved Questions / Decisions needing authority
Lens findings / Ideas / material Q/R/P
Target-specific output preview
Artifact Placement View
Handoff / downstream Sources
Methodology Direction / recommended next step
Residual Q/R/P / revalidation signals
```

`Artifact Placement View` maps current-instance content to semantic owner + **guidance source IDs (AP-*/AG-*)** + persistence + physical representation/destination + resolver.

It explicitly permits:

```text
Persistence: UNRESOLVED
```

and:

```text
Persistence: REQUIRED | PREFERRED
Destination: UNRESOLVED
```

when the methodology has not yet established whether/where the content should be stored.

Generic contract: [`shared/artifact-placement-and-idtspe-response-contract.md`](shared/artifact-placement-and-idtspe-response-contract.md). Profile-specific AP/AG materialization projections and response examples are supplied by the active profile; current SDS projection is [`../profiles/sds/ARTIFACT-PLACEMENT-MAP.md`](../profiles/sds/ARTIFACT-PLACEMENT-MAP.md) and [`../profiles/sds/examples/IDTSPE-RESPONSE-EXAMPLE.md`](../profiles/sds/examples/IDTSPE-RESPONSE-EXAMPLE.md).

## Repeated Invocation / Persistent Owner Rule

An IDTSPE instance is a bounded planning pass over a Target, not a one-shot file generator.

```text
existing owner representations
→ become current Target/current-state Sources
→ IDTSPE CREATE/REFINE/EXTEND/REVALIDATE/REPAIR
→ accepted updates + Artifact Placement View
→ CREATE/UPDATE/REUSE files when authorized
→ later IDTSPE pass reads the updated files again
```

The same Target Module may therefore be invoked repeatedly for the same Target identity.

Conceptually this is a planning viewport over the Target's current/potential artifacts; it is **not** a reusable Lens in the methodology type system.

Sequencing/next-step is profile-supplied through P-13. Current SDS resolver: [`../profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md`](../profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md).

## Lens Execution Rule

Lenses are applied to **material choice surfaces**, not mechanically to every paragraph.

```text
Target/Scope choice
Question-Set choice
Idea/Branch comparison
Answer Decision
revalidation challenge
```

Required Core Lenses mean required **checks**; they may reuse trusted basis and finish with no material finding.

## Target Module Attachment Rule

A Target Module can plug into shell ports through its integration points:

```text
TARGET_FORM
SCOPE
SOURCES
RELATIONS
QUESTIONS
IDEAS
BRANCHING
LENSES_PATTERNS
OUTPUT
ARTIFACT_FILE_CONTRACT
VALIDATION
HANDOFF
REVALIDATION
```

The module does not replace the shell and the shell does not contain target-specific semantics.

## Source / Lens / Target Separation

```text
Target
  = thing being planned

Source
  = accepted truth / evidence / constraint used to plan it

Lens
  = reusable perspective used to inspect choices

Target Module
  = reusable methodology contract for a recurring Target family

Decision
  = accepted material choice inside one Target
```

Do not infer one role from another.

## Recursive Escalation

When a local unresolved concern becomes independently material:

```text
current Target
→ Lens / Part Plan exposes new choice space
→ generic Target Formation
→ bounded child/local Target
→ full IDTSPE Shell again
→ accepted result returns as Source to parent
```

No special planning engine is required for architecture, algorithms, frontend state strategy or other local design problems.

## Physical Planning-State Attachment

Per project/application:

```text
SDS-PLANNING-STATE/
├── SDS-EVOLUTION-MAP.md
└── ideas/
    ├── INBOX.md
    ├── early/IDEAS.md
    ├── scenario/IDEAS.md
    ├── domain/IDEAS.md
    └── realization/IDEAS.md
```

Loose Ideas and accepted Evolution Items are outside the semantic Target output unless explicitly promoted/selected.

## Exit Condition

An IDTSPE instance is ready to hand off when proportionally:

```text
Target form/scope resolved
Sources sufficient and authoritative
Question Set sufficient
Lens Set resolved and material findings handled
Idea/Branch space sufficient
blocking Q/R/P resolved/deferred explicitly
material Decisions accepted under correct authority
Target-specific output projected
validators pass or findings routed
handoff/persistence/revalidation contract sufficient
```


## High-Level End-To-End Examples

### Example 1 — Plan One Application Scenario

Invocation:

```text
plan the capture scenario
```

Shell composition:

```text
P-02 Target:
  SCN-CAPTURE
  module:
    TM-SCENARIO-DRAFT

P-03 Sources:
  Application Definition
  Refined Core Real-Life Scenario
  Prototype Evidence

P-06 Lenses:
  L1-L3
  Scenario Boundary/Behavior
  UI/Spatial when Screen relations matter

P-05 Questions:
  what starts capture?
  what information is required?
  what is observable success/failure?

P-07 Ideas:
  one-step save
  save + optional note
  save + forced organization

P-10 Decisions:
  select behavior/result

P-11 Output:
  Scenario
  internal DATA
  internal Behavior Items
  Acceptance meaning

P-13 Handoff:
  Domain Discovery
  Screen
  Slice planning
  Test Design
```

The shell mechanics stay generic; Scenario meaning comes from the Target Module and current Sources.

### Example 2 — Plan One Vertical Slice

```text
Target:
  SL-CAP-01

Module:
  TM-IMPLEMENTATION-SLICE

Source:
  SCN-CAPTURE
  DATA/Behavior
  Domain
  Screen

Lens:
  L1-L3
  Slice Verticality
  L4/L5/L6 when material

Output:
  Useful Vertical Result
  Runtime Path
  call-level Integrated Implementation Plan
```

If L5 exposes a genuinely independent architecture problem, the shell recursively forms a child Target. It does not switch to a separate architecture planning engine.

### Example 3 — Existing Answer Means Less Planning

A trusted upstream Decision already answers a potential RQ.

```text
L2 finds canonical accepted answer
→ question is not asked again
→ Question Set stays smaller
```

IDTSPE is therefore allowed to remove work, not only add structure.

### Example 4 — Lens Finding Does Not Become Semantic Authority

L4 finds:

```text
changing API contract touches 8 consumers
```

That finding can create:

```text
Risk
new Idea
migration Question
architecture Answer Decision
```

but L4 does not own the API semantics.

### Example 5 — Loose Idea vs Evolution

During Prototype:

```text
"maybe support offline capture later"
```

goes to:

```text
SDS-PLANNING-STATE/ideas/early/IDEAS.md
```

Only after accepted future intent/Evidence does it become:

```text
SDS-EVOLUTION-MAP
→ candidate L5 WEUC/change pressure
```

## Example Reading Standard

See [`HIGH-LEVEL-EXAMPLE-GUIDE.md`](HIGH-LEVEL-EXAMPLE-GUIDE.md) for the rule that examples must be self-contained and explanatory, not merely contextually correct.


## Workspace Evolution Attachment Example

```text
main product evolution
  SDS-EVOLUTION-MAP
↓
TM-WEUC
  create/update SDS-WORKSPACE-EVOLUTION
  including Current Global Architecture Position when material
↓
selected Domain/Slice/etc Target
  P-06 Lens Port activates WEUC Lens when material
↓
local evolution findings / architecture Answer Decision
↓
optional <owner>.evolution.md
↓
global evolution/architecture-position update candidate → TM-WEUC

OR

Target = whole Workspace architecture
→ TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION + WEUC Lens
→ select/revalidate global architecture principles/defaults/conventions
→ update Current Global Architecture Position
```
