# IDTSPE Shell — Generic Planning Runtime / Composition Contract

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Decision record retention](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-decision-retention) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`.
> - `CONTEXTUALIZES` [PRS Decision admission / exit](../target-modules/TM-PLANNING-RESOLUTION-STATE.md#ru-prs-02--tracked-decisions) — `RESOLUTION.CARRY-FORWARD`.

Status: active generic methodology owner
Purpose: define the generic technical IDTSPE runtime/composition contract used inside an always-active **IDTSPE Work Context**. A Work Context may remain Broad Discussion with zero Targets, or coordinate one or several bounded Targets with typed Sources, Core State Units, reusable Lenses, Target Step Result projection, validation, persistence and revalidation without hard-coding any domain/application module.

<a id="idtspe-runtime-composition"></a>
## Runtime / Work-Context Composition

Responsibility ID: `IDTSPE.RUNTIME-COMPOSITION`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Core State Unit / Core Resolution State`](target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#core-state-unit-boundary) — `CORE.STATE-UNIT`
> - `CONTEXTUALIZES` [`Compose Current IDTSPE Work`](../use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md#uc-idtspe-compose-current-work) — `IDTSPE.UC.COMPOSE-CURRENT-WORK`

This responsibility owns the **technical** Work Context/Shell composition and port contract. Functional selection of what methodology work is useful now belongs to the IDTSPE Use-Case layer; Target Work, Resolution, Lens, Knowledge and Representation owners keep their own semantics.

## Core Formula

```text
IDTSPE Work Context
+ current Use-Case composition
+ Broad Discussion / Key Points
+ P-02 Pass Trace / Visibility Contract
+ zero or more bounded Targets
  each Target when present:
    Target Resolution Requirements
      derived from current task/scope/Sources
      + applicable universal Core Target Requirements
    + required REUSABLE_TARGET_MODEL_CHECK during formation
    + governing path:
      0..N applied Target Module Model + Target Module Instance portions when reusable coverage is useful
        + complete Module-defined Unit inventory for each applied Model portion
      or Local Target Contract when no reusable Model applies
        + no Module-defined Unit inventory
    + applicable Core-defined Target Work Units
    + Contextual Units only when locally defined/formed
    + actual Source Set / Target Relations
    + selected/applicable Lens Applications and normal Core Resolution State
    + Target Step Result composition
      from Module contribution when present
      + Core-defined Unit Result Destinations
      + Contextual Unit Result Destinations
    + Validators / Guards
    + Handoff / Persistence completeness when applicable
+ cross-Unit / Target / Work-Context Core Resolution State when material
+ Evidence / Revalidation when material
= current proportional IDTSPE work
```

Requirements come from the current task/scope/Sources plus universal Core Target needs. Target Module Models provide prepared reusable recognition/coverage and Unit Definitions; they are not a third semantic source of Requirements.

A Target-specific shell pass still operates on one primary bounded Target at a time, while the Work Context may contain zero/several Targets. Target Work Units and Core State Units remain distinct compositional roles.

The current `P-01..P-15` labels are technical runtime navigation, not a second ontology. `P-01 Invocation` and `P-02 Pass Trace / Visibility` are REQUIRED in every normal Shell pass; other ports remain applicability/materiality/explicit-requirement driven.

### Port-Number Migration Compatibility

This methodology-only transition intentionally leaves direct `planning/commands/*` and Helper/group projections unchanged. During the compatibility window, a stale reference is interpreted by its **named semantic port and generation**, never by bare number. Two historical numberings are relevant.

Pre-Trace legacy numbering (the repository/helper baseline before `P-02 Trace` was inserted):

```text
legacy P-02 Target        → canonical P-03 Target
legacy P-03 Source        → canonical P-04 Source
legacy P-04 Relation      → canonical P-05 Relation
legacy P-05 Question      → no standalone canonical Question Port; route by natural meaning
legacy P-06 Lens          → canonical P-06 Lens
legacy P-07 Proposal      → canonical P-07 Proposal
legacy P-08 Branch        → canonical P-08 Branch
legacy P-09 Q/R/P         → canonical P-09 Q/R/P
legacy P-10 Decision      → canonical P-10 Decision
legacy P-11 Result        → canonical P-11 Target Step Result
legacy P-12 Validation    → canonical P-12 Validation
legacy P-13 Handoff       → canonical P-13 Handoff / Methodology Direction
legacy P-14 Persistence   → canonical P-14 Persistence / Artifact
legacy P-15 Revalidation  → canonical P-15 Evidence / Revalidation
```

Previous Trace-enabled numbering (`1fe3` generation, before standalone Question removal):

```text
previous P-02 Trace                 → canonical P-02 Trace / Visibility
previous P-03 Target                → canonical P-03 Target
previous P-04 Source                → canonical P-04 Source
previous P-05 Relation              → canonical P-05 Relation
previous P-06 Question              → no standalone canonical Question Port; route by natural meaning
previous P-07 Lens                  → canonical P-06 Lens
previous P-08 Proposal              → canonical P-07 Proposal
previous P-09 Branch                → canonical P-08 Branch
previous P-10 Q/R/P                 → canonical P-09 Q/R/P
previous P-11 Decision              → canonical P-10 Decision
previous P-12 Target Step Result    → canonical P-11 Target Step Result
previous P-13 Validation            → canonical P-12 Validation
previous P-14 Handoff / Direction   → canonical P-13 Handoff / Methodology Direction
previous P-15 Persistence / Artifact→ canonical P-14 Persistence / Artifact
previous P-16 Evidence/Revalidation → canonical P-15 Evidence / Revalidation
```

A removed Question port is routed by meaning to Requirement guidance, Unit Resolution, Q/R/P, or—only when an actual Target exists and ownership is unclear—`CORE-U-UNROUTED-CONCERNS`. Never map a bare historical port number to a canonical port without checking its semantic name/generation.

## Work-Context Proportionality

The Shell is subordinate to Use-Case/contextual composition. `P-01` and `P-02` are REQUIRED; all other ports are traversed only when composition/materiality or explicit requirements call for them.

```text
AUTO_COMPOSITION
EXPLICIT_REQUIREMENT
DOWNSTREAM_MATERIALITY
→ same port contract
```

An explicit **port/capability requirement** forces a real applicability/traversal check but not a positive semantic result. `NOT_APPLICABLE`, `CHECKED_NO_RESULT`, `CHECKED_NO_CHANGE` and `REUSED` remain valid port outcomes. This does **not** override a later semantic root action whose user intent is itself `APPLY / USE <named Lens>`: once P-06 has resolved that registered Lens and bounded surface, the explicit Lens-apply action executes one real Lens Application even when normal Lens applicability is confidently false. In that case the semantic Lens result may simply be `APPLIED — no material finding / no useful change`; the port requirement and the root semantic action are distinct obligations.

<a id="idtspe-port-composition-refresh"></a>
## Port Composition Refresh Rule

Responsibility ID: `IDTSPE.PORT-COMPOSITION-REFRESH`

This section owns the technical refresh/admission/reuse semantics for the Port Requirement Set. `UC-IDTSPE-COMPOSE-CURRENT-WORK` invokes the refresh as orchestration; the Contextual Methodology Application Contract contextualizes when it is required; P-02 represents its observable trace.

Each **normal Shell pass** consumes one current Port Requirement Set. Before **every** normal pass enters `P-01`, current Use-Case applicability is reaffirmed, `UC-IDTSPE-COMPOSE-CURRENT-WORK` composes/reaffirms the current proportional IDTSPE methodology work, and only then `IDTSPE.PORT-COMPOSITION-REFRESH` refreshes/reaffirms the Port Requirement Set from that composition plus all pre-collected command/component contributions. This runtime applies the resulting admission/reuse contract. A prior P-02 trace may be consulted as retained orientation/evidence, but it never permits skipping the refresh.

```text
current Use-Case applicability composition
→ UC-IDTSPE-COMPOSE-CURRENT-WORK
→ current proportional IDTSPE methodology composition
+ AUTO_COMPOSITION requirements
+ EXPLICIT_REQUIREMENTs collected from the fully expanded command/component DAG BEFORE semantic command execution
+ current DOWNSTREAM_MATERIALITY
+ still-material defer/recheck obligations
+ current P-02 working-trace orientation/evidence (never sticky authority)
→ refresh / reaffirm Port Requirement Set
→ one normal Shell pass
```

A previous pass's admitted/non-admitted port set is **not sticky authority** for the next pass. When the subject/basis/operation and all material requirement inputs remain equivalent, the previous determination may be `REUSED`; otherwise recompute only the affected admission decisions.

Automatic refresh is not automatic focus. Intentionally narrowing/focusing work to a selected subset of ports requires explicit USER intent; ordinary refresh must still admit a newly material prerequisite/port when the current composition requires it.

During a pass, `DOWNSTREAM_MATERIALITY` may make another port newly material. Admit it through the same Port Requirement Set/runtime contract and deduplicate shared prefixes; do not restart the full methodology route merely because the route deepened.

## Decision Reference

The Shell does not define Decision types. A material Decision is identified by its natural `Subject` and selected meaning. Descriptions such as "decision about Target Scope" are projections, not a closed Core Decision taxonomy.

## Shell Ports

<a id="idtspe-port-p01"></a>
### P-01 Invocation Port — REQUIRED

Routes the selected Use-Case composition into one normal Shell pass. It may validly route no Target-specific work when Broad Discussion remains sufficient.

<a id="idtspe-port-p02"></a>
### P-02 Pass Trace / Visibility Port — REQUIRED

Adopts/continues the one structured working trace already established during invocation preparation so earlier command-composition / Use-Case / Port-Composition events were recorded incrementally. Establishes the canonical Shell Pass Trace / Visibility Contract before substantive non-baseline work and records observable methodology/runtime facts incrementally. The same structured trace is the working orientation surface for completed/pending/reusable traversal during the pass and the source for final visibility. Trace may be rendered or persisted; persistence does not give it a Target lifecycle or replace mandatory Use-Case/Port Composition rechecks.

Canonical owner: [`PASS-TRACE-AND-VISIBILITY-CONTRACT.md`](PASS-TRACE-AND-VISIBILITY-CONTRACT.md).

<a id="idtspe-port-p03"></a>
### P-03 Target Port

Connects Target Formation/Resolution when a bounded Target is useful.

```text
current task/problem/Sources
→ provisional purpose + bounded scope/problem surface
→ applicable Core Target Requirements
   + explicit/already-obvious task Requirements
→ REUSABLE_TARGET_MODEL_CHECK
   → 0..N compatible Target Module Instance portions when suitable Models apply
      → each applied Model's prepared analysis recognizes/formulates actual grounded Requirements
      → prepared Module Unit coverage from all applied Model portions
   or Local Target Contract when no reusable Model applies
      → contextual scope/Requirement analysis
→ prepared Core/Module coverage + contextual completion
```

Target Formation may refine/split scope, derive/clarify Requirements and DEFINE Contextual Units when prepared coverage is insufficient. Unit Definition follows the canonical Responsibility/Purpose/Result Content Contract model; composite Units MUST use exactly one terminal Unit Resolution Set, including justified Contextual Slots within the same Responsibility/coherent result. `NO_TARGET_NEEDED_YET` remains valid.

<a id="idtspe-port-p04"></a>
### P-04 Source Port

Supports the `SOURCE_AUTHORITY` Target Requirement and normal Source State/binding lifecycle. Target Module Source Contracts provide reusable archetypes/needs; runtime Sources remain actual authoritative Source Subjects/bindings.

<a id="idtspe-port-p05"></a>
### P-05 Relation Port

Supports the `OWNER_RELATIONS` Requirement and Target topology/natural-owner relations. Relations do not silently create Source authority.

<a id="idtspe-port-p06"></a>
### P-06 Lens Port

Owns normal Lens applicability/selection/application over the current bounded Analysis Surface. Target Modules/Requirements/Units and P-12 Validation may request or reuse Lens evaluation, but P-06 owns the actual Lens applicability/operation/application lifecycle and there is no fixed Target Lens Set field. An explicit semantic `APPLY / USE <named Lens>` request is a forced one-shot Lens Application after registry/surface/operation resolution: applicability remains explanatory context but cannot replace that requested application with `NOT_APPLICABLE`.

The Target Resolution Coverage Lens may evaluate scope/Requirement/Unit coverage and surface Finding Candidates; Target Formation/Resolution owns composition changes.

<a id="idtspe-port-p07"></a>
### P-07 Proposal / Alternative Port

Connects material candidate resolutions to their natural Requirement/Unit/Target/other subject. There is no fixed Target `PROPOSAL_SPACE` owner.

Canonical Proposal identity and selection semantics remain in the Proposal/Decision lifecycle. `GIP ≠ formal IDTSPE Proposal` remains invariant.

<a id="idtspe-port-p08"></a>
### P-08 Branch Port

Connects optional counterfactual planning networks when shallow comparison is insufficient. There is no fixed Target `BRANCH_POLICY` field; branching is a resolution mechanism invoked when material.

<a id="idtspe-port-p09"></a>
### P-09 Q/R/P Port

Carries material unresolved Question/Risk/Problem meaning attached to its natural subject. Questions no longer require a standalone Question Shell port.

<a id="idtspe-port-p10"></a>
### P-10 Decision Port

Connects material selection semantics into the affected subject. Any separate Decision record follows the linked Core retention contract; straightforward non-decision derivation does not require a Decision record.

<a id="idtspe-port-p11"></a>
### P-11 Target Step Result Projection Port

Projects actual Target Work Unit/result composition:

```text
Target Step Result
= Target Module Instance contribution when present
  (complete Module-defined Unit inventory with dispositions/content)
+ applicable Core-defined Unit contributions through Result Destinations
+ actually formed Contextual Unit contributions through Result Destinations
```

For a **substantive composite Unit**, project concrete Unit Resolution Slot disposition/state/content proportionally from the Slot Definitions in the Result Content Contract: one runtime resolution for each `UNIT_WIDE` Slot, or one runtime resolution per addressed item of the owning Collection for each `PER_ITEM` Slot. Prepared Slots with `OMITTED — reason` may remain concise; substantive Slots expose `OPEN / PARTIAL / RESOLVED / BLOCKED / DEFERRED` state as material. If the parent Module-defined Unit itself is omitted, project only the Unit-level omission; prepared Slot Definitions remain in methodology and no concrete Slot runtime state is required. Slots remain internal contributors to the parent Unit result, not peer Target Step Result Units.

Core-defined Units are applicability-driven. Contextual Units exist only when locally defined/formed. Neither automatically requires its own durable result section.

<a id="idtspe-port-p12"></a>
### P-12 Validation Port

Orchestrates proportional Unit/Slot validators, authority/user guards, cross-owner consistency and Target Requirement coverage/readiness checks. When validation requires a Lens perspective, P-12 routes to or reuses the corresponding P-06 selected Lens Application; it MUST NOT independently select/apply a second Lens lifecycle for the same `(Lens, Analysis Surface, Operation, basis)` cell. Findings route to the smallest correct semantic owner.

<a id="idtspe-port-p13"></a>
### P-13 Handoff / Methodology Direction Port

For a Target, supports the conditional `HANDOFF_CONTINUATION` Requirement: downstream consumer/source binding and readiness. The same port also exposes Work-Context Methodology Direction, including zero-Target Broad Discussion; therefore the port is broader than the Target Requirement.

<a id="idtspe-port-p14"></a>
### P-14 Persistence / Artifact Port

Generic persistence/representation bridge. For a Target, it supports the conditional `PERSISTENCE_ADDRESSABILITY` Requirement. It also applies to non-Target retained meaning such as Pass Trace, Proposal/Decision or Work-Context state.

```text
semantic retention ≠ physical persistence
Artifact Placement View ≠ file mutation
```

Canonical owner: [`../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md).

<a id="idtspe-port-p15"></a>
### P-15 Evidence / Revalidation Port

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `TWU.SUBJECT-REFERENCE`
> Owner: [Target Work Subject Reference Contract](target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md#target-work-subject-reference)

Connects post-choice Evidence/revalidation signals to accepted meaning without making Evidence lifecycle authority. Reopen the narrowest correct Requirement/Collection/Collection item/Unit Resolution Slot/Unit/Decision/Target scope when material challenge is accepted. When the selected subject is inside Target Work, use `TWU.SUBJECT-REFERENCE` so revalidation does not accidentally broaden or narrow the challenged scope.

## Integration Checkpoint / Representation Handoff

The Shell does not own a second checkpoint Process or response template. Canonical owners are:

- [`use-cases/integrate-current-work/UC-IDTSPE-INTEGRATE-CURRENT-WORK.md`](../use-cases/integrate-current-work/UC-IDTSPE-INTEGRATE-CURRENT-WORK.md) — checkpoint Situation / Result / Process;
- [`representation/interaction/BROAD-DISCUSSION-AND-INTEGRATION-CHECKPOINT-PROJECTION.md`](../representation/interaction/BROAD-DISCUSSION-AND-INTEGRATION-CHECKPOINT-PROJECTION.md) — conversational/checkpoint projection semantics;
- [`representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md) — persistence-sensitive Artifact Placement subview.

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

Sequencing/next-step is profile-supplied through P-13. Current SDS resolver: [`../profiles/sds/profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md`](../../profiles/sds/profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md).

## Lens Execution Rule

Lenses are applied to **material choice surfaces**, not mechanically to every paragraph.

```text
Target/Scope or Requirement-coverage choice
Proposal/Branch comparison
Decision
revalidation challenge
```

Required Core Lenses mean required **checks**; they may reuse trusted basis and finish with no material finding.

## Target Module Attachment Rule

A Target Module can plug into shell ports through its integration points:

```text
RECOGNITION / SCOPE_GUIDANCE
REQUIREMENT_RECOGNITION / UNIT_COVERAGE
SOURCES / KNOWLEDGE_BASIS / RELATIONS
QUESTIONS_GUIDANCE
PROPOSAL_BRANCH_GUIDANCE
LENSES_PATTERNS
OUTPUT / ARTIFACT_FILE_CONTRACT
VALIDATION / HANDOFF / REVALIDATION
```

The module does not replace the shell and the shell does not contain target-specific semantics.

## Source / Lens / Target Separation

```text
Target
  = thing being planned

Source
  = accepted truth / evidence / constraint used to plan it

Knowledge Basis
  = reusable principles / rules / theory / pattern knowledge used by a Target Module, Unit Definition or Lens
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
→ applicable existing Module/Core Unit responsibility?
   yes → Unit Resolution
→ owner/destination unclear but concern is material?
   → current Target exists?
      yes → CORE-U-UNROUTED-CONCERNS
      no  → retain in Work Context / natural Core State; may feed GIP / Target Formation
→ uncovered bounded local responsibility inside current Target?
   yes → DEFINE Contextual Unit → EXECUTE Unit Resolution
→ independently substantial responsibility?
   yes → Target Formation candidate
```

Target Formation decides reuse/handoff/new Target. No special planning engine is required for architecture, algorithms, frontend state or other local design problems.

## Planning-State Representation

Generic IDTSPE State does **not** require a profile-global planning-state tree.

Loose/carry-over Proposals remain ordinary IDTSPE Proposal State. Their durable representation,
when useful, is selected through Documentation / Representation + P-14 / PERSISTENCE_ADDRESSABILITY and may be:

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

The Pass Trace is closed from recorded runtime events rather than reconstructed after the fact. An IDTSPE instance is ready to hand off when proportionally:

```text
Target purpose/scope and applicable Target Resolution Requirements are sufficiently formed for this checkpoint
Sources are sufficient/authoritative for the material work
selected/applicable Lenses have no undispositioned material findings
material Proposal/Branch surfaces are sufficiently resolved for the intended result
blocking Q/R/P is resolved/deferred explicitly
material Decisions are accepted under correct authority
material Unit Resolutions are sufficiently resolved/deferred for the current handoff
Module-defined Unit inventory preserves RESOLVED / OPEN / explicit-omission dispositions when a Target Module Instance exists
applicable Core-defined Units and formed Contextual Units have explicit result/disposition destinations
material Requirements are sufficiently covered or explicitly OPEN/BLOCKED/DEFERRED
Target Step Result is composed from Module contribution when present plus Core-defined/Contextual contributions through Result Destinations
material Core Resolution State is visible/resolved/deferred at the correct subject
validators pass or material findings are dispositioned
handoff/persistence/revalidation state is sufficient when applicable
```


## High-Level End-To-End Examples

### Example 1 — Plan One Application Scenario

Invocation:

```text
plan the capture scenario
```

Shell composition:

```text
P-03 Target:
  SCN-CAPTURE
  module:
    TM-SCENARIO-PLANNING

P-04 Sources:
  Application Definition
  selected Feature behavior/semantic data
  relevant Screen context when known
  Prototype Evidence when relevant

P-06 Lenses:
  applicable Core Lens Pack
  journey/continuity checks
  UI/Spatial when Screen relations matter

Requirement/Unit drivers:
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
→ no duplicate Question State/work is created
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
architecture Decision input
```

but L4 does not create that State or own the API semantics.

### Example 5 — Loose Proposal vs Accepted Future Meaning

During any Target:

```text
"maybe support offline capture later"
```

remains IDTSPE Proposal State until it has enough basis to justify a concrete planning destination. Acceptance does not universally mean "write into the current owner": the active profile decides the temporal semantic owner. Under current SDS, materially planned but unrealized target state belongs to an Evolution Step, while current natural owners remain realized truth.

## Example Reading Standard

See [`examples/HIGH-LEVEL-EXAMPLE-AUTHORING-GUIDANCE.md`](../examples/HIGH-LEVEL-EXAMPLE-AUTHORING-GUIDANCE.md) for the rule that examples must be self-contained and explanatory, not merely contextually correct.


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
