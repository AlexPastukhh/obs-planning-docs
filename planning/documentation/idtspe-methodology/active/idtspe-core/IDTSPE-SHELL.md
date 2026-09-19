# IDTSPE Shell — Generic Planning Runtime / Composition Contract

Status: active generic methodology owner
Purpose: define the generic technical IDTSPE runtime/composition contract used inside an always-active **IDTSPE Work Context**. A Work Context may remain Broad Discussion with zero Targets, or coordinate one or several bounded Targets with typed Sources, Core State Units, reusable Lenses, Target Step Result projection, validation, persistence and revalidation without hard-coding any domain/application module.

## Core Formula

```text
IDTSPE Work Context
+ current Use-Case composition
+ Broad Discussion / Key Points
+ zero or more bounded Targets
  each Target when present:
    Target Formation Resolution Set
    + Target Module or Local Target Contract
    + actual Source Set
      + Source State Units/bindings scoped to Target/Work Units as applicable
    + selected/applicable Lenses
    + complete Module-defined Target Work Unit inventory
      each Module-defined Unit remains instantiated/addressable in the formed Target:
        RESOLVED → proportional Current Result Content
        OPEN → explicit unresolved disposition
        OMITTED → concise omission reason; no substantive Unit Resolution required
      + Contextual Units only when actually formed
    + Target Step Result composition from the complete Unit inventory/dispositions/content
    + Validators / Guards
    + Artifact Placement when material
+ cross-Unit / Target / Work-Context Core Resolution State when material
+ Handoff / Evidence / Revalidation when material
= current proportional IDTSPE work
```

A Target-specific shell pass still operates on one primary bounded Target at a time, while the Work Context may contain zero/several Targets. Unit-local Core State Units/Core Resolution State attach to Work Unit Resolution; broader state remains at its natural Target/cross-Target/Work-Context subject. Target Work Units and Core State Units are distinct compositional roles, not one peer result inventory.

The current `P-01..P-15` labels remain stable technical runtime navigation, not a second ontology.

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

Connects the concrete Target's Source State Units/bindings to authoritative Source Subjects such as:
```text
Direct Semantic Sources
Inherited Lineage when lineage itself is material
Evidence / Current-State Sources
current canonical Target owner/result when refining/revalidating
Constraint / Planning-State Sources
accepted upstream Target Work Unit / Target Step Result
```

Resolved through `TF-04 SOURCE_SET` and L2 Authority/SoT/Reuse. Reusable Target Module `Source Contract` text supplies archetypes/needs only; it is not the concrete runtime Source Set.

Source relation is separate from Target topology relation. A Target relation never silently creates a Source State Unit/binding.

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

Coordinates material Question/Problem drivers across the current Target through `TF-06 QUESTION_SET`.

```text
before Unit decomposition
→ Target-level questions may help establish useful Unit/Target shape

after Units exist
→ Unit-local Questions/Problems attach to Unit Resolution
→ TF-06 projects/coordinates them plus genuine Target-wide questions
```

Module question presets should normally come from the relevant Unit Contract when Unit-specific. Prompts are not automatic USER questions or formal Question State.

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

Connects materially different candidate resolutions from USER input, Sources, AI proposals, Unit Contract discovery aids, Broad Discussion and dispositioned Findings.

```text
Unit-local Proposal
→ affected Unit Resolution

cross-Unit / Target-wide Proposal
→ broader subject

TF-07 PROPOSAL_SPACE
→ Target-level coordination/projection of the real candidate space
```

Canonical Proposal identity, grounding, Semantic Change Impact Review, review/selection and Decision semantics are owned by the Proposal/Decision lifecycle. A Proposal may exist without a Finding; a Finding may resolve without a Proposal.

### P-08 Branch Port

Connects optional counterfactual planning networks when shallow comparison is insufficient.

Resolved through `TF-08 BRANCH_POLICY`.

A Planning Branch is not one Proposal; it is an alternative downstream planning network from a shared Fork State.

### P-09 Q/R/P Port

Carries material unresolved Question/Risk/Problem meaning attached to its real subject:

```text
Unit / Result field
Proposal / Decision
Target / cross-Unit owner relation
```

Unit-local Q/R/P is part of that Unit Resolution. Q/R/P is not a parallel planning root and is not forced into one Unit when its natural subject is broader.

### P-10 Decision Port

Connects **material selection semantics** into the affected Unit/Target/owner meaning.

```text
AI Proposal ≠ selection
material Proposal selected under applicable authority
→ Decision semantics
→ integrate selected meaning into affected Result Content / owner
```

A separate explicit/durable Decision State/trace is retained only when selection/rationale/trade-off/revalidation meaning has independent future value. The Shell does not force a durable Decision record for straightforward non-decision derivation or every resolved Unit field.


### Proposal / Decision Operational Review

When a material Proposal/Decision surface exists, the required Core [`LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT`](lenses/required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md) evaluates that concrete context through the canonical Proposal/Decision, Q/R/P, Evidence and USER-input owners. Surviving material open/deferred/residual state may be projected through [`Resolution Carry-Forward`](shared/resolution-carry-forward-projection-contract.md) for continuation/handoff; neither the Lens nor the projection becomes a second semantic lifecycle owner.

### P-11 Target Step Result Projection Port

Projects the complete Module-defined Unit inventory into the Target Step Result supplied by the active Target Module/Local Contract: resolved material Units contribute Current Result Content, unresolved material Units remain `OPEN`, non-material Module-defined Units retain explicit omission dispositions, and only actually formed Contextual Units are added.

```text
Unit Resolution
→ candidate meaning while unresolved
→ selected / safely derived meaning
→ Current Result Content

Target Step Result
= complete Module-defined Unit inventory
  with resolved / OPEN / explicit-omission dispositions and proportional content
+ any Contextual Units that actually formed
```

Generic Core Resolution State is not duplicated into result fields merely to expose the reasoning history. Contextual Unit conclusions integrate into their declared destination; a Contextual Unit does not automatically create a durable result section.

### P-12 Validation Port

Runs proportionally over the actual analysis surface:

```text
Unit Contract validators over Unit Result Content / Resolution as applicable
applicable Lens checks
Core authority/user guards
cross-Unit / cross-owner consistency checks when invoked
Evidence sufficiency where material
```

Validation may surface Finding Candidates. Finding Disposition routes each finding to the smallest correct semantic subject: often an affected Unit Resolution, sometimes a Contextual Unit/Target Formation or another owner directly.

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
  = reusable principles / rules / theory / pattern knowledge used by a Target Module, Unit Contract or Lens
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

When local work surfaces new responsibility:

```text
Finding / Question / Problem / Source conflict
→ smallest correct existing semantic subject?
   yes → resolve there
→ existing Unit responsibility?
   yes → Unit Resolution
→ new bounded local responsibility inside current Target?
   yes → Contextual Unit
→ independently substantial responsibility?
   yes → Target Formation candidate
```

Target Formation decides reuse/handoff/new Target. No special planning engine is required for architecture, algorithms, frontend state or other local design problems.

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
material Unit Resolutions sufficiently resolved/deferred for the current handoff
Current Result Content projected for resolved material Units; OPEN/omission dispositions preserved for the rest of the Module-defined inventory
Target Step Result composed from the complete Module-defined Unit inventory plus any formed Contextual Units
material Core Resolution State visible/resolved/deferred at the correct subject
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
  what Benefit manifestation/closure/result closes the journey?

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
  Benefit manifestation/closure + journey must-hold meaning

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
  future-state/evolution handoff according to the active profile; no generic owner-local future authority is implied
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

remains Generic Proposal State until it has enough basis to justify a concrete planning destination. Acceptance does not universally mean "write into the current owner": the active profile decides the temporal semantic owner. Under current SDS, materially planned but unrealized target state belongs to an Evolution Step, while current natural owners remain realized truth.

## Example Reading Standard

See [`HIGH-LEVEL-EXAMPLE-GUIDE.md`](HIGH-LEVEL-EXAMPLE-GUIDE.md) for the rule that examples must be self-contained and explanatory, not merely contextually correct.


## Evolution / Architecture Attachment Example

```text
future/change pressure
→ active profile resolves the future-state semantic owner
→ Evolution / Change Isolation when material
→ Finding Candidate(s)
→ Core Finding Disposition / Proposal / Decision as appropriate
→ future or current semantic consequence routed according to that profile's temporal authority boundary
→ Documentation / Representation chooses persistence only after semantic ownership is resolved
```

Core does not require one universal global evolution Target or owner-local evolution section. Profiles may define a dedicated future-transition owner; current SDS uses `TM-EVOLUTION-STEP`.
