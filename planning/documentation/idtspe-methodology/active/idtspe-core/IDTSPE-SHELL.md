# IDTSPE Shell — Generic Planning Runtime / Composition Contract

Status: active generic methodology owner  
Purpose: define the generic IDTSPE runtime/composition contract that coordinates one concrete Target, typed Sources, Core State Units, reusable Lenses, Target Step Result projection, validation, persistence and revalidation without hard-coding any domain/application module.

## Core Formula

```text
Trigger / Invocation
+ Target Formation Resolution Set
+ Target Module or Local Target Contract
+ typed Sources
+ Broad Discussion / Key Points when working conversationally
+ IDTSPE State Units
+ selected/applicable Lenses
+ Target Step Result Units
+ Validators / Guards
+ current Artifact Placement
+ Handoff
+ Evidence / Revalidation lifecycle
= one bounded IDTSPE work step
```

Canonical working-conversation / checkpoint model: [`shared/broad-discussion-and-integration-checkpoint-model.md`](shared/broad-discussion-and-integration-checkpoint-model.md).

Canonical content model:

```text
IDTSPE Unit
├─ Target Step Result Unit
│  defined by Target Module / Local Target Contract
└─ IDTSPE State Unit
   Core-defined generic planning kind:
   Source / Question / Idea / Q-R-P / Decision / Evidence / ...
```

The current `P-01..P-15` labels remain stable **technical runtime navigation**. They are not a second semantic ontology above the Unit/Target models.

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
Questions surfaced in previous steps/checkpoints or Broad Discussion
explicit user questions / questions implied by current Goal or Problem
Questions created/refined through Core Finding Disposition when material findings require Question State
current unresolved Q/R/P questions when relevant
```

into one selected `Question Set` through `TF-06 QUESTION_SET`. Goals/Desired Outcomes and Problems may drive the Idea/Decision space without being retyped as Questions merely to pass through P-05.

Question examples are non-exhaustive and are not automatic user questions. A Target Module may also provide Problem driver candidates; the Target Goal / Desired Outcome comes from the Target contract/context. These are the ordinary starting driver set for Idea discovery, but current Sources/situation, previous work/checkpoints, Broad Discussion, user/AI input and dispositioned findings may add drivers on equal Core semantic footing. Problem drivers use the existing P-09 Problem meaning rather than being retyped as Questions.

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

Finding handling is generic Core behavior: [`shared/finding-disposition-contract.md`](shared/finding-disposition-contract.md).

Lenses run inside IDTSPE work through an Analysis Surface and reusable operations. They may contribute explanatory Broad Discussion/Key Points without State mutation; only material meaning needing State/lifecycle/owner disposition surfaces as a Finding Candidate, which Core Finding Disposition resolves. A Lens may lead to an already-declared Result Unit changing only after normal authority/resolution, and it never defines Unit kinds or becomes semantic authority.

### P-07 Idea / Alternative Port

Connects materially different answer candidates from:
```text
user input
Sources
AI proposals
Target Module pattern aids
accepted/dispositioned Idea / alternative input derived from Lens, research or prototype observations
```

Material Lens/research/prototype observations that need semantic State/lifecycle disposition first surface as Finding Candidates. Core Finding Disposition decides whether accepted meaning creates/refines Idea/alternative State or another lifecycle consequence; only then does `TF-07 IDEA_SPACE` resolve materially different answer candidates.

AI proposal remains an unselected Idea until accepted. Every material Idea is explicitly surfaced and carries `Addresses → current Target Goal / Question / Problem`; a missing driver is an unresolved planning gap, not a free-floating material Idea. Ideas may `compete-with`, `complement`, `require`, `conflict-with` or compose through a lightweight Candidate Bundle / Option Group. Candidate bundles are grouping/comparison projections by default, not new required State Units or Planning Branches. Material Ideas/relations may first live inline in Broad Discussion; no per-response Intake Summary is required as long as their explicit identity/driver relation is clear for the next Integration Checkpoint.

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

attached to the real planning subject/Decision/Idea/Result relation they concern. Q/R/P may be contextual to one Idea or candidate bundle rather than only Target-wide. Q/R/P is not a parallel semantic-root model.

Optional review/trace mechanics are owned by [`shared/qrp-priority-groups-and-decision-trace.md`](shared/qrp-priority-groups-and-decision-trace.md): impact priority, related Q/R/P grouping, contextual Idea/Q-R-P relations, and Decision `Addresses` / `Selected` / optional `Rationale / Why` / `Exposes` links. These extend existing P-09; they do not create a second Concern runtime.

### P-10 Decision Port

Turns selected material answers into the three durable Decision types while preserving user authority rules.

```text
AI proposal
≠ accepted Decision
```

Accepted material Decisions are retained in integrated semantic state by default. When useful, a Decision may declare:

```text
Addresses: <Goal / Question / Problem / Q/R/P IDs or group>
Selected:  <Idea(s) / Candidate Bundle>
Rationale / Why: <optional selection reasoning>
Exposes:   <newly revealed/created Q/R/P IDs>
```

`Rationale / Why` is optional and distinct from Evidence. At an Integration Checkpoint, ask whether a short rationale should be retained when a new material Decision has none; ask separately whether material non-selected/deferred/rejected/superseded alternatives should be retained. Batch these optional retention choices when practical. The trace is explanatory/revalidation metadata, not a new Decision type.

### P-11 Target Step Result Projection Port

Projects selected/current target-specific meaning into the **Target Step Result** supplied by the active Target Module/local contract.

```text
Target Step Result
→ one or more Target Step Result Units
→ each Unit contains only supported/material target-specific meaning

Target Step Result
≠ generic IDTSPE State Units
```

Generic Questions/Ideas/QRP/Branches/Decisions/Evidence/Revalidation remain Core State Units and are not duplicated merely as module result fields.

Existing `Target-specific output`, `Output Schema` and `Target-specific Output Template` wording is migration-compatible technical projection vocabulary; the canonical semantic model is the Step Result / Result Unit contract. A full Target integration pass may serve as an Integration Checkpoint: it reconciles accumulated Broad Discussion/current State into the coherent applicable Generic State + Target Result without ending discussion or implying physical persistence.

### P-12 Validation Port

Runs proportionally:
```text
Target Module validators over the declared Result Units
applicable Lens checks over their declared/implicit analysis focus
Core authority/user guards
cross-Unit / cross-owner consistency checks when invoked
Evidence sufficiency where material
```

Validation may surface Finding Candidates. Generic Core Finding Disposition resolves them into normal State/lifecycle/owner destinations such as Problem / Risk / Question / Evidence Need / Revalidation Signal or another owner. Validator/Lens findings do not define new Result Units or become substitute semantic owners.

### P-13 Handoff / Methodology Direction Port

Resolves `TF-09 HANDOFF` through the **active profile/family's Next-Step Resolver**. The Shell owns the port and required response shape; it does not own one universal Scenario/Domain/Slice chronology.

```text
accepted Target output
→ typed downstream Source(s)
→ active profile/family readiness resolver
→ methodology readiness / next likely Target
```

Current installed SDS example: [`../profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md`](../profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md).

When a checkpoint/handoff-sensitive response needs Methodology Direction, distinguish proportionally:

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
for each material IDTSPE Unit/content item that may need to survive:
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

Broad Discussion turns do not require an `Artifact Placement View`. At an Integration Checkpoint or persistence-sensitive structured pass, distinguish semantic retention from physical placement: when placement is material/changed/unresolved expose the Artifact Placement View; when established placement is simply inherited, a compact unchanged/inherited statement is enough.

```text
semantic retention
≠ physical persistence

Artifact Placement View
≠ file mutation
```

The required Documentation / Representation Lens runs before final P-14 placement whenever material output may persist. When representation/topology change is non-trivial, P-14 escalates to the deeper `Artifact / File Realization Pack`.

Semantic owner ≠ artifact/file boundary.

### P-15 Evidence / Revalidation Port

Connects post-choice Evidence to accepted Decisions without making Evidence itself lifecycle authority:
```text
actual Evidence
→ compare with accepted basis / residual Q/R/P / watch signals
→ Finding Candidate when accepted meaning is materially challenged
→ Core Finding Disposition
→ reaffirm / revalidate / reopen the narrowest appropriate level when selected
```

Revalidation is lifecycle, not a peer Lens.

## Integration Checkpoint Response Projection

Ordinary Broad Discussion is allowed to remain conversational and does not reproduce this whole projection. Material logical parts use Key Points proportionally, and material Ideas remain explicit with their driver relation; no mandatory block-owner or per-response Intake Summary is required. When a full Integration Checkpoint is requested/appropriate, the assistant should render proportionally:

```text
optional Broad Discussion Summary / material explanatory Key Points
Current Target / Scope / Sources + Target Goal / Desired Outcome context
coherent material Generic State through existing Core kinds, including explicit Idea→driver relations and unresolved Idea alternatives/bundles
accepted Decisions + retention/rationale choices when material
Target-specific Result Units — complete applicable current projection
Lens / consistency review + material Finding Candidates/disposition consequences
semantic retention + Artifact Placement when physical persistence is material
Handoff / downstream Sources / recommended discussion focus
Residual Q/R/P / revalidation signals
```

If explanatory Broad Discussion inside the checkpoint surfaces new material Idea/Question/Problem/Evidence/Decision meaning, integrate it into that same checkpoint or mark it explicitly as post-checkpoint exploration; do not leave it as unintegrated prose while presenting the checkpoint as the coherent whole.

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
→ accepted semantic updates + Artifact Placement View when physical persistence is material
→ CREATE/UPDATE/REUSE files only when authorized and needed
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
KNOWLEDGE_BASIS
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

Knowledge Basis
  = reusable principles / rules / theory / pattern knowledge used by a Target Module or Lens
  = not current Target Source / evidence / project truth

Lens
  = reusable perspective used to inspect an Analysis Surface through supported operations and surface Finding Candidates
  = does not define Unit kinds or own semantic routing/lifecycle consequences

Target Module
  = reusable methodology contract for a recurring Target/Step-Result family
  = defines target-specific Result Units

Decision
  = accepted material choice inside one Target
```

Do not infer one role from another.

## Recursive Escalation

When a local unresolved concern becomes independently material:

```text
current Target
→ Lens / Part Plan surfaces new choice-space Finding Candidate(s) / proposal context
→ Core Finding Disposition decides whether accepted meaning creates/refines normal Core State, owner or lifecycle consequence
→ when independently substantial: Target Formation candidate
→ Target Formation decides reuse existing Target / handoff existing owner / form new bounded child-local Target
→ any newly formed Target uses the full IDTSPE Shell again
→ accepted external result returns as Source to parent
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
Target Step Result projected proportionally into declared Result Units
material State Units visible/resolved/deferred as needed
validators pass or material findings dispositioned
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
    TM-SCENARIO-PLANNING

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
  call-level Codebase Integration Path
```

If L5 exposes a genuinely independent architecture problem, it surfaces a Finding Candidate. Core Finding Disposition may surface a Target Formation candidate; Target Formation then decides whether to reuse an existing owner, hand off/reference one, or form a bounded child/local Target. Any newly formed Target uses the same IDTSPE Shell; no separate architecture planning engine is introduced.

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

L4 surfaces that observation as a Finding Candidate. Core Finding Disposition may resolve accepted meaning by creating/refining:

```text
Risk
new Idea
migration Question
architecture Answer-Decision input
```

but L4 does not create that State or own the API semantics.

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
local evolution / architecture Finding Candidate(s)
  + optional TM-WEUC likely-owner hint when project-global meaning is suspected
↓
Core Finding Disposition resolves actual State / semantic owner / lifecycle consequence
├→ local accepted Q/R/P / Answer Decision / evolution meaning when resolved to the current Target
│  → AG-L5-02 companion proposal when distinct local evolution materialization is useful
│  → Documentation / Representation + P-14 / TF-10
│  → optional <owner>.evolution.md only when that representation/placement is selected
└→ TM-WEUC refresh/update/revalidation only when global ownership/handoff is resolved there

OR

Target = whole Workspace architecture
→ TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION + WEUC Lens
→ select/revalidate global architecture principles/defaults/conventions
→ update Current Global Architecture Position
```
