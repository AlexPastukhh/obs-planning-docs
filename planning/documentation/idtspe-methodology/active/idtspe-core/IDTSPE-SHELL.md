# IDTSPE Shell — Generic Planning Runtime / Composition Contract

Status: active generic methodology owner
Purpose: define the generic technical IDTSPE runtime/composition contract used inside an always-active **IDTSPE Work Context**. A Work Context may remain Broad Discussion with zero Targets, or coordinate one or several bounded Targets with typed Sources, Core State Units, reusable Lenses, Target Step Result projection, validation, persistence and revalidation without hard-coding any domain/application module.

## Core Formula

```text
IDTSPE Work Context
+ current Use-Case composition
+ Broad Discussion / Key Points
+ zero or more material IDTSPE State Units
+ zero or more bounded Targets
  each Target when present:
    Target Formation Resolution Set
    + Target Module or Local Target Contract
    + typed Sources
    + selected/applicable Lenses
    + applicable/material Target Step Result Units
    + Validators / Guards
    + Artifact Placement when material
+ Handoff / Evidence / Revalidation when material
= current proportional IDTSPE work
```

A Target-specific shell pass still operates on one primary bounded Target at a time, but the **work context itself does not require a Target** and may retain relations among several Targets when that is the real current situation. Functional composition is owned by [`shared/compose-current-work-use-case.md`](shared/compose-current-work-use-case.md); this Shell owns the generic technical mechanics once those mechanisms are needed.

Canonical working-conversation / checkpoint model: [`shared/broad-discussion-and-integration-checkpoint-model.md`](shared/broad-discussion-and-integration-checkpoint-model.md).

Canonical content model:

```text
IDTSPE Unit
├─ Target Step Result Unit
│  defined by Target Module / Local Target Contract
└─ IDTSPE State Unit
   Core-defined generic planning kind:
   Source / Question / Proposal / Q-R-P / Decision / Evidence / Methodology Usage State / ...
```

The current `P-01..P-15` labels remain stable **technical runtime navigation**. They are not a second semantic ontology above the Unit/Target models.

The shell owns **planning mechanics**. It does not own current product/domain/application semantics.

## Work-Context Proportionality

The Shell is subordinate to the Use-Case/contextual-application layer:

```text
Use-Case Registry applicability
→ UC-IDTSPE-COMPOSE-CURRENT-WORK
→ component/registry applicability
→ local Unit materiality
→ Shell ports used only where the selected composition needs them
```

Do not invoke all ports as a completion checklist. A port may remain unused in a valid work pass. Canonical rule: [`shared/contextual-methodology-application-contract.md`](shared/contextual-methodology-application-contract.md).

## Decision Type Reference

The Shell does not define Decision types. Canonical Target-formation/Resolution-slot mapping owns the three durable Decision roles currently used by Core:

[`shared/resolution-slot-and-target-formation-resolution-set.md`](shared/resolution-slot-and-target-formation-resolution-set.md)

Proposal selection/Decision trace semantics are owned separately by [`shared/proposal-and-decision-lifecycle-contract.md`](shared/proposal-and-decision-lifecycle-contract.md).

## Shell Ports

### P-01 Invocation Port

Input, proportionally:
```text
current USER situation / Work Concern
active methodology Use Case(s)
current IDTSPE Work Context
requested operation/mode when explicit
invocation mode for a Target-specific pass: CREATE | REFINE | EXTEND | REVALIDATE | REPAIR
current Target artifact(s) when they exist
permission boundary
```

Output: the next technical Shell route for the composition selected by the active Use Case. It may be **no Target-specific route** when Broad Discussion remains sufficient. Reusing the same Target with `REFINE`/`REVALIDATE` is normal when durable owner representations already exist.

### P-02 Target Port

This port is **conditional**. Use it only when Target Formation determines that a bounded Target/result responsibility is useful.

Connects:
```text
Target Instance
↔ Target Module / Target Type / local Target Contract
```

Resolved through `TF-01 PURPOSE_OUTPUT`, `TF-02 TARGET_TYPE_FORM`, `TF-03 TARGET_SCOPE`. `NO_TARGET_NEEDED_YET` is a normal Work-Context outcome; it is not an error or a reason to invent a placeholder Target.

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

into one selected `Question Set` through `TF-06 QUESTION_SET`. Goals/Desired Outcomes and Problems may drive the Proposal/Decision space without being retyped as Questions merely to pass through P-05.

Question examples are non-exhaustive and are not automatic user questions. A Target Module may also provide Problem driver candidates; the Target Goal / Desired Outcome comes from the Target contract/context. These are the ordinary starting driver set for Proposal discovery, but current Sources/situation, previous work/checkpoints, Broad Discussion, user/AI input and dispositioned findings may add drivers on equal Core semantic footing. Problem drivers use the existing P-09 Problem meaning rather than being retyped as Questions.

### P-06 Lens Port

Technical Shell bridge for the contextual `TF-06A LENS_SET`.

```text
active Use-Case composition / Target context
→ canonical Lens Applicability Scan
→ TF-06A LENS_SET
→ selected Lens owner(s)
→ Finding Candidate only when material semantic disposition is needed
```

The Shell does **not** redefine Lens activation classes, Required Core inventory, registry scan algorithm, Analysis Surface or Lens operations. Canonical Lens selection/execution semantics are owned by [`lenses/LENS-MODEL.md`](lenses/LENS-MODEL.md); finding consequences are owned by [`shared/finding-disposition-contract.md`](shared/finding-disposition-contract.md).

### P-07 Proposal / Alternative Port

Connects materially different answer candidates from USER input, Sources, AI proposals, Target Module discovery aids, and accepted/dispositioned candidate input from research/Lenses/prototypes.

`TF-07 PROPOSAL_SPACE` is the technical resolution slot for the current candidate space. Canonical Proposal identity, driver relations, candidate bundles, review/selection outcomes and Proposal → Decision semantics are owned by [`shared/proposal-and-decision-lifecycle-contract.md`](shared/proposal-and-decision-lifecycle-contract.md).

Finding producers do not bypass that lifecycle: materially new semantic consequences first cross [`shared/finding-disposition-contract.md`](shared/finding-disposition-contract.md) when ownership/State/lifecycle disposition is needed.

### P-08 Branch Port

Connects optional counterfactual planning networks when shallow comparison is insufficient.

Resolved through `TF-08 BRANCH_POLICY`.

A Planning Branch is not one Proposal; it is an alternative downstream planning network from a shared Fork State.

### P-09 Q/R/P Port

Carries material unresolved `Question`, `Risk` and `Problem` meaning attached to the real planning subject/Proposal/Decision/Result relation it concerns. Q/R/P is not a parallel semantic-root model.

Canonical Q/R/P semantics, lifecycle, priority/category/grouping and retention are owned by [`shared/qrp-lifecycle-and-review-contract.md`](shared/qrp-lifecycle-and-review-contract.md). Proposal/Decision context relations are owned by the Proposal/Decision lifecycle contract.

### P-10 Decision Port

Turns selected material answers into the three normal durable Decision types while preserving authority rules.

```text
AI proposal
≠ accepted Decision
```

Canonical selection, Decision trace (`Addresses` / `Selected` / optional `Rationale / Why` / `Exposes`), alternative retention and revalidation semantics are owned by [`shared/proposal-and-decision-lifecycle-contract.md`](shared/proposal-and-decision-lifecycle-contract.md). This port only connects that accepted Decision meaning into the Shell lifecycle.

### P-11 Target Step Result Projection Port

Projects selected/current target-specific meaning into the **Target Step Result** supplied by the active Target Module/local contract.

```text
Target Step Result
→ one or more Target Step Result Units
→ each Unit contains only supported/material target-specific meaning

Target Step Result
≠ generic IDTSPE State Units
```

Generic Questions/Proposals/QRP/Branches/Decisions/Evidence/Revalidation remain Core State Units and are not duplicated merely as module result fields.

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

Resolves `TF-09 HANDOFF` through the **current Use-Case composition plus the active profile/family semantic readiness guidance**. The Shell owns the generic handoff port and response shape; it does not own one universal Scenario/Domain/Slice chronology and does not delegate runtime orchestration to a profile resolver.

```text
accepted Target output
→ typed downstream Source(s)
→ active profile/family semantic composition/readiness guidance
→ methodology readiness / next likely Target or no additional Target
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

Technical Shell bridge for `TF-10 PERSISTENCE_ADDRESSABILITY`.

```text
material retained meaning
→ Documentation / Representation decision
→ P-14 / TF-10 placement resolution
→ no persistence | implementation-native | existing owner | dedicated/supporting/generated representation
```

The Shell does not redefine ArtifactPlacementItem fields, AP/AG schemas, precedence, representation statuses or placement workflow. Canonical persistence/placement semantics are owned by [`shared/artifact-placement-and-idtspe-response-contract.md`](shared/artifact-placement-and-idtspe-response-contract.md).

Broad Discussion does not require a placement view. A checkpoint/persistence-sensitive pass exposes placement only when material/changed/unresolved.

```text
semantic retention ≠ physical persistence
Artifact Placement View ≠ file mutation
```

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

## Integration Checkpoint / Representation Handoff

The Shell does not own a second checkpoint Process or response template. Canonical owners are:

- [`shared/integrate-current-work-use-case.md`](shared/integrate-current-work-use-case.md) — checkpoint Situation / Result / Process;
- [`shared/broad-discussion-and-integration-checkpoint-model.md`](shared/broad-discussion-and-integration-checkpoint-model.md) — conversational/checkpoint projection semantics;
- [`shared/artifact-placement-and-idtspe-response-contract.md`](shared/artifact-placement-and-idtspe-response-contract.md) — persistence-sensitive Artifact Placement subview.

Shell ports provide the technical State/Target/Lens/representation inputs those owners compose. They do not redefine the full checkpoint projection.

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
Proposal/Branch comparison
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
PROPOSALS
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

## Planning-State Representation

Generic IDTSPE State does **not** require a profile-global planning-state tree.

Loose/carry-over Proposals remain ordinary Generic Proposal State. Their durable representation,
when useful, is selected through Documentation / Representation + P-14 / TF-10 and may be:

```text
current natural owner
existing project register / inbox
another profile-selected owner
NONE / ephemeral conversation state
```

Accepted evolution meaning remains with its natural semantic owner. A profile may expose a
derived/navigation evolution projection only when independently useful; that projection does
not become a second semantic authority.

## Exit Condition

An IDTSPE instance is ready to hand off when proportionally:

```text
Target form/scope resolved
Sources sufficient and authoritative
Question Set sufficient
Lens Set resolved and material findings handled
Proposal/Branch space sufficient
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
  selected Feature behavior/semantic data
  relevant Screen context when known
  Prototype Evidence when relevant

P-06 Lenses:
  applicable Core Lens Pack
  journey/continuity checks
  UI/Spatial when Screen relations matter

P-05 Questions:
  who/what starts the journey?
  which Feature/context actions participate and in what order?
  where do branches/convergence/re-entry occur?
  what terminal Benefit/result closes the journey?

P-07 Proposals:
  direct capture → confirmation
  capture → optional note → confirmation
  capture → recoverable failure → retry/re-entry

P-10 Decisions:
  select journey composition / branch meaning

P-11 Output:
  Scenario journey composition
  actor/external participation
  Feature/Screen participation
  branch/convergence/re-entry
  terminal Benefit + journey must-hold meaning

P-13 Handoff:
  Feature revalidation when behavior is unresolved
  Screen
  Slice Discovery
  natural-owner proof planning when useful
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
  Useful Vertical Result / obligations
  material Uses / ownership boundary
  optional Runtime Path
  owner-local Evolution Steps when material
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
new Proposal
migration Question
architecture Answer-Decision input
```

but L4 does not create that State or own the API semantics.

### Example 5 — Loose Proposal vs Accepted Future Meaning

During any Target:

```text
"maybe support offline capture later"
```

remains Generic Proposal State until it has enough accepted basis to affect current planning. If later accepted as Scenario-local future/change meaning, it may appear in that Scenario's future/change Result Unit and project downstream into Strategy/Slice Evolution Steps.

## Example Reading Standard

See [`HIGH-LEVEL-EXAMPLE-GUIDE.md`](HIGH-LEVEL-EXAMPLE-GUIDE.md) for the rule that examples must be self-contained and explanatory, not merely contextually correct.


## Evolution / Architecture Attachment Example

```text
Scenario future/change meaning
→ Strategy projection / owner-local Evolution Step
→ L5 Evolution / Change Isolation when material
→ Finding Candidate(s)
→ Core Finding Disposition
→ accepted local Decision/meaning or Target Formation for an independently material cross-owner architecture problem
→ Documentation / Representation chooses persistence only when useful
```

No permanent global evolution Target or global architecture file is required by Core.
