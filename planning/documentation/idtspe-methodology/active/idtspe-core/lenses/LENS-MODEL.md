# IDTSPE Lens Model

Status: active generic methodology owner

<a id="lens-meta-model"></a>
## Terminology: Lens Meta-Model → Lens Model → Lens Application

Responsibility ID: `LENS.META-MODEL`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Finding Disposition`](../resolution/findings/FINDING-DISPOSITION.md#resolution-finding-disposition) — `RESOLUTION.FINDING-DISPOSITION`
> - `CONTEXTUALIZES` [`Knowledge Basis Contract`](../knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md#knowledge-basis-contract) — `KNOWLEDGE.BASIS`
> - `CONTEXTUALIZES` [`Target Work subject reference`](../runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md#target-work-subject-reference) — `TWU.SUBJECT-REFERENCE`
> - `CONTEXTUALIZES` [`Artifact Placement / Persistence`](../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md#representation-artifact-placement) — `REPRESENTATION.ARTIFACT-PLACEMENT`


This file is the canonical **Lens Meta-Model**: it defines what reusable Lens Models are and how they are selected/applied. The historical filename `LENS-MODEL.md` is retained for navigation compatibility.

```text
Lens Meta-Model
  = methodology for defining/selecting/applying Lens Models

Lens Model
  = one concrete reusable `LENS-*` perspective/operational contract

Lens Application
  = one application of a Lens Model to a concrete Analysis Surface
    through one selected supported Operation on a relevant basis in a pass

Selected Lens Application
  = execution request identity `(Lens Model, Analysis Surface, Operation, relevant basis)`
```

A Lens Application is an execution/application event, not a new semantic owner and not necessarily a durable `Lens Instance`. Selection must preserve the operation: `LENS-X + CHECK` and `LENS-X + CHALLENGE` are distinct Lens Applications when both are materially useful. Several selected Lens Applications in one pass share the same Meta-Model/applicability machinery; unchanged shared work should be reused rather than reread/re-executed per application. Pass-level reuse/trace semantics are owned by [`../runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md`](../runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md).

Every active concrete `LENS-*` Model MUST declare exactly one `Semantic Owner Dependency` with `EXTENDS` → `LENS.META-MODEL`. This makes generic Lens semantics an explicit vertical dependency and lets concrete Lens files keep only their perspective-specific delta plus any genuinely specialized owner dependencies.

## 1. Definition

```text
Lens Model
= reusable evaluation/discovery perspective
  applied inside IDTSPE to material Units / Current Result Content
  and/or Core Resolution State / broader semantic subjects
```

A Lens Model, when applied, may contribute explanatory Broad Discussion analysis and Key Points without creating any Unit. It may also discover materially actionable meaning concerning Evidence needs, Proposal refinements, Q/R/P, comparison dimensions, Decision inputs, revalidation signals and supporting-artifact guidance. Only meaning that needs ownership/State/lifecycle disposition crosses the Finding Candidate boundary; Generic Core Finding Disposition resolves that destination. The Lens does not define Unit kinds or own disposition.

```text
Lens ≠ Target Module
Lens ≠ Target Instance
Lens ≠ Resolution Slot
Lens ≠ Validator
Lens ≠ Guard
Lens ≠ selected Decision
```

A reusable Lens has two deliberately separate parts:

```text
Lens
=
Operational Evaluation Contract
+
Knowledge Basis
```

## 1A. Relationship To Use Cases / Contextual Composition

A Lens is a specialized methodology component reached from a Documentation/IDTSPE Use-Case Process or another canonical component route. It is **not** a functional Use Case and does not decide whether IDTSPE itself is active.

```text
Use-Case Process / methodology registry routing
→ decides whether the Lens Registry should be consulted
→ selects plausibly relevant Lens entry

concrete Lens applicability / temporal trigger contract
→ confirms local applicability and recheck need

Lens Operational Evaluation Contract
→ owns how to analyze/check/refine/challenge the selected surface
```

The fundamental situational question "how much methodology is useful now?" belongs to [`../runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md`](../runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md) + `UC-IDTSPE-COMPOSE-CURRENT-WORK`, not to a recursive meta-Lens.


The Operational Evaluation Contract owns **how and when to look**. The Knowledge Basis explains **which principles/rules/theory/pattern knowledge make that evaluation credible**.

This separation prevents a Lens from becoming an unstructured dump of theory while still allowing a thin Lens to keep a small self-contained body of principles inline.

## 2. Ownership Rule

```text
reusable generic Lens operational knowledge → active/idtspe-core/lenses/
profile-specific Lens operational knowledge → active/profiles/<profile>/lenses/

concrete Lens
→ owns its Analysis Surface
→ owns applicability + temporal trigger logic
→ owns evaluation workflow / questions / dimensions
→ owns Findings / Outcomes and Lens-specific guards

Target Module Unit Definition
→ owns predictable Unit-local Lens Attachments
→ REQUIRED [checkpoint phase(s)]
→ TRIGGERED

Target-wide Lens attachment
→ allowed only when the Analysis Surface is genuinely Target-wide
  and cannot be represented truthfully on natural Units

Lens Registry
→ owns lightweight discovery/routing projection only

Knowledge Basis
→ may be embedded in the Lens
→ or referenced from separate principle/theory/reference owners
→ or combine both
```

Invariant:

```text
Unit attachment says THAT a Lens participates here.
Concrete Lens says WHEN / WHY it is useful and WHAT applying it means.
Unit never copies Lens trigger logic.
```

Every material Unit inherits the Core Lens Pack through the generic Unit applicability runtime. A local Lens Attachment block declares only additional predictable Lens relationships. If a reusable Lens perspective becomes useful in a second Target family, review it for extraction/promotion rather than duplicating its evaluation logic.

## Registry Selection Boundary

A registry row is only lightweight routing metadata. Selecting a Lens row does not execute the Lens and does not force a Finding. Read/execute the concrete Lens body only when the active Use-Case Process and the Lens's own applicability / temporal trigger contract makes it relevant. `NO_MATERIAL_LENS` is a normal proportional outcome.

## 3. Core-Pack Membership / Attachment Boundary

There is no Lens-level `Activation` enum in the normative Lens contract.

Three separate concerns must not be collapsed:

```text
Core-pack membership
→ owned by the Core Lens Registry + Unit runtime

predictable Unit attachment strength
→ owned by the Unit Definition
→ REQUIRED [phase(s)] | TRIGGERED

generic/profile discovery availability
→ owned by registries
→ registered / discoverable ≠ attached
```

`REQUIRED_CORE`, `FREQUENT_CONDITIONAL`, `TARGET_PROFILE_REUSABLE` and `LOCAL_ONLY` are legacy migration vocabulary only. Existing concrete Lens files may retain old `Activation:` fields until their dedicated migration pass; those fields are not normative under this model.

## 4. Operational Evaluation Contract

Every reusable Lens explains proportionally:

```text
Identity
  Lens ID / canonical name / short description

Purpose
  reusable evaluation objective

Analysis Surface
  meaning this Lens is capable of evaluating

Applicability & Temporal Triggers
  Base Applicability / Usefulness
  Opening Triggers
  During-work Recheck / Invalidation Triggers
  Closing Triggers / Revalidation Conditions
  Confident-False / Stop Conditions
  False-negative Risks

Inputs / Evidence
  current planning / implementation material consumed by this evaluation

Evaluation Contract
  Evaluation Questions
  Workflow when order matters
  Sublenses / Dimensions when useful
  Supported Operations

Findings / Outcomes
  Typical Findings
  `APPLIED — no material finding` is valid
  `NOT_APPLICABLE — <short reason>` is valid when application is not forced
  material Finding Candidates hand off to Core Finding Disposition

Guards / Boundaries

Artifact / Representation Implications

Knowledge Basis — when useful

Optional governance metadata — only when materially useful
```

`Inputs / Evidence` means current planning/implementation material consumed by the Lens. It is intentionally distinct from the Lens's own `Knowledge Basis`.

`Discovery Metadata` is not a mandatory concrete-Lens section. Compact discovery hints belong in Lens registries. `Provenance` is optional governance metadata. `Composition` is not a required operational Lens section, and `Typical Consumers` is not normative attachment authority.

## 4A. Analysis Surface / Operations / Finding Contract

The operational contract must make clear:

```text
1. what the Lens analyzes;
2. which generic Lens operations it supports;
3. what explanatory analysis/Key Points it may contribute;
4. what kinds of material findings it can surface.
```

Canonical Unit model: [`../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md).
Canonical producer/Core bridge: [`../resolution/findings/FINDING-DISPOSITION.md`](../resolution/findings/FINDING-DISPOSITION.md).

### Applicability & Temporal Trigger Contract

The concrete Lens owns the criteria that make its perspective useful at each Unit checkpoint.

```text
Base Applicability / Usefulness
→ what kind of situation this Lens can materially evaluate

Opening Trigger
→ what existing surface makes early application useful

During-work Recheck / Invalidation Trigger
→ what material change can make an earlier Lens application stale

Closing Trigger / Revalidation Condition
→ what final/resulting surface requires a final applicability/revalidation check

Confident-False / Stop Condition
→ when the Lens can safely conclude that application is not useful now

False-negative Risk
→ characteristic way the gate could miss a materially useful application
```

Canonical trigger semantics:

```text
TRUE      → APPLY
FALSE     → NOT_APPLICABLE
UNCERTAIN → APPLY
```

For a Unit attachment `REQUIRED [phase]`, the apply/skip decision is bypassed at that phase: the Lens is applied unconditionally to the current Analysis Surface. Lens-owned triggers still matter at other checkpoints and may require earlier/repeated application.

For a Unit attachment `TRIGGERED`, the Unit stores no condition logic. The Lens-owned checkpoint trigger decides whether to apply.

Outcomes remain distinct:

```text
NOT_APPLICABLE
→ Lens did not need to run at this checkpoint

APPLIED — no material finding
→ Lens ran and found nothing requiring disposition

APPLIED — material Finding(s)
→ Lens ran and surfaced Finding Candidates
```

### Analysis Surface

Use proportionally:

```text
Direct Analysis Surface
→ Units / Current Result Content / Unit Resolution subjects the Lens can directly evaluate
→ Unit Resolution Slots when one terminal formal sub-responsibility is the smallest useful surface

Supporting / Contextual Inputs
→ relevant Result fields
→ relevant Core Resolution State
→ Target / cross-owner Context
```

A target/profile-specific Lens should name known Module-defined Units/fields when practical. A generic Core Lens may use semantic selectors because it cannot know every profile schema. Context availability does not imply auditing all of it.

### Supported Operations

Generic operation vocabulary:

```text
ANALYZE
CHECK
REFINE
CHALLENGE
```

Meanings:

```text
ANALYZE
→ inspect the Analysis Surface through this perspective

CHECK
→ evaluate current meaning against Lens criteria/guards

REFINE
→ identify/propose more precise or missing meaning
  where the semantic destination is already understood

CHALLENGE
→ seek reasons selected/accepted meaning may be wrong,
  weak, stale or unsupported
```

A Lens need not support every operation.

### Typical Findings / Finding Contract

A reusable Lens should explain the recurring finding families it can surface. Ordinary useful analysis is not automatically a Finding Candidate; it may remain Broad Discussion/Key Points when no semantic ownership/State/lifecycle consequence is needed.

A finding may include proportionally:

```text
Meaning
Affected Unit Resolution Slot / Collection / Collection item / Unit(s) / fields — when known
  Target Work subjects use canonical TWU.SUBJECT-REFERENCE when a durable/referenceable subject is needed
Evidence / rationale
Materiality hint — optional
Likely semantic owner — optional hint
Suggested lifecycle consequence — optional hint
```

Those hints do not grant authority.

### Broad Discussion / Integration Checkpoint contribution

Lens application may be useful even when no State changes:

```text
Lens analysis / trade-off explanation / examples
→ Broad Discussion
→ Key Points for the logical discussion part
→ no Unit / no Finding Candidate required
```

At an Integration Checkpoint, the same Lens may help check the integrated Generic State + Target Result. Only a material newly surfaced semantic consequence needing disposition becomes a Finding Candidate. A checkpoint may therefore report `no material finding` while still including useful Lens analysis.

Canonical interaction model: [`../representation/interaction/BROAD-DISCUSSION-AND-INTEGRATION-CHECKPOINT-PROJECTION.md`](../representation/interaction/BROAD-DISCUSSION-AND-INTEGRATION-CHECKPOINT-PROJECTION.md).

### Core Finding Disposition

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `RESOLUTION.FINDING-DISPOSITION`
> Owner: [Finding Disposition](../resolution/findings/FINDING-DISPOSITION.md#resolution-finding-disposition)

The Lens Meta-Model owns the producer boundary only; Finding owner/lifecycle routing and Resolution Escalation remain Finding-Disposition-owned.

The Lens stops at explanatory analysis or Finding Candidate.

```text
Lens
→ Broad Discussion / Key Points when explanatory only
→ Finding Candidate when material semantic disposition is needed

Core Finding Disposition
→ smallest correct semantic subject / owner
→ existing Unit Resolution Slot when one formal Slot remains the natural subject
→ existing Unit Resolution when the broader Unit owns the responsibility
→ Contextual Unit when a new bounded local responsibility is useful
→ Target Formation when independently substantial
→ another canonical owner directly when Unit routing would be artificial
```

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `TWU.SUBJECT-REFERENCE`
> Owner: [Target Work Subject Reference Contract](../runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md#target-work-subject-reference)

A Lens finding about one Collection surface, Collection item or Slot does not mutate that subject directly: it becomes a Finding Candidate and passes through Core Finding Disposition. Preserve the smallest selected Target Work subject through the canonical reference contract; do not broaden one item-local finding to the whole Collection or to the common Slot role across all items.

The Lens does not own State routing, Target Formation, REOPEN, handoff authority or Result Content mutation.

### Result ownership guard

```text
Lens application
≠ permission to silently invent
  a new Target Step Result Unit
  a new target-result field
  a Lens-owned canonical result section
```

If repeated findings reveal missing target-result meaning:

```text
revise the Target Module/Local Contract
OR
let Core Finding Disposition resolve another owner
OR
keep the meaning in generic State Units
```

## 5. Knowledge Basis

A reusable Lens may carry a `Knowledge Basis` when reusable theory/reference knowledge materially supports the evaluation. The shared [`Knowledge Basis guidance`](../knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md#knowledge-basis-contract) keeps theory separate from current Target inputs while allowing consumer-specific selection and interpretation. There is no required mode enum or field schema.

Lens-specific specialization:

```text
Target Inputs / Evidence
→ current Target material consumed by this evaluation

Lens Knowledge Basis
→ reusable principles/rules/theory/pattern knowledge
  used to perform this evaluation
```

Important boundaries:

```text
Knowledge Basis reference ≠ Target Source / current Target input
raw theory ≠ operational Lens authority
referenced theory/principle owner ≠ permission to copy its full body into every Lens

Lens → owns applicability + evaluation + findings
Knowledge owner → owns referenced principle/rule/theory meaning
```

Knowledge may stay inline, point to theory files/folders/sections, use a separate applied Knowledge Basis, or combine these forms. Existing `INLINE / REFERENCED / HYBRID` labels remain compatible representation only. If material cannot yet be reduced to a stable evaluation objective + applicability / temporal trigger contract + findings contract, keep it as theory/reference material instead of pretending it is already a Lens.

<a id="lens-applicability-scan"></a>
## 6. Lens Applicability Scan / Lens applicability/selection

IDTSPE uses one proportional Lens Applicability Scan around the current material Unit / bounded Analysis Surface.

```text
Current material Unit / bounded Analysis Surface
+ active profile context
↓
1. load inherited Core Lens Pack
↓
2. load predictable Unit-local Lens Attachments
   - REQUIRED [phase(s)]
   - TRIGGERED
   plus any rare justified Target-wide attachment
↓
3. at the current Unit checkpoint
   - satisfy REQUIRED obligations whose mandatory phase is the current checkpoint
   - for every other currently participating Lens — inherited Core, Unit REQUIRED for another phase, Unit TRIGGERED, and retained discovered/explicit Lens — evaluate that Lens's checkpoint trigger
↓
4. scan registered Generic Core Lens summaries for additional plausible candidates
↓
5. scan every active-profile Lens Registry for additional plausible candidates
↓
6. include explicitly requested Lens perspectives
   - explicit CONSIDER / SELECT intent follows normal applicability
   - explicit APPLY / USE intent creates a forced one-shot Lens Application
     for the bounded current surface
↓
7. for discovered/explicit candidates, read enough of the concrete Lens
   to evaluate its own applicability/temporal trigger + supported operation(s)
   - for forced explicit APPLY / USE, applicability is still evaluated as
     explanatory relevance context but cannot cancel this requested application
↓
8. form/execute selected Lens Application requests
   `(Lens Model, Analysis Surface, Operation, relevant basis)`
↓
9. retain lightweight visibility
   `APPLIED — <short result/reason>`
   `NOT_APPLICABLE — <short reason>`
```

Important boundaries:

```text
registry discovery does not create Unit attachment
Unit attachment does not suppress registry discovery
one Lens never satisfies another Lens obligation
registered Lens exists ≠ apply it
Lens considered ≠ full Lens body must be read
Lens applicable ≠ Lens finding must be manufactured
```

The scan is evaluative, not a ritual to run every Lens body. Lens/application selection may itself become a material Resolution Question when the Analysis Surface, perspective or operation is high-impact/ambiguous. Do not silently collapse materially distinct `CHECK` and `CHALLENGE` coverage into one operation-less Lens selection.

### Direct / Non-Unit Lens Application

A bounded Lens Application does not require a synthetic Target or Unit. When the Analysis Surface is outside an active Unit lifecycle, distinguish **consider/select intent** from **explicit apply intent**:

```text
bounded non-Unit Analysis Surface
+ CONSIDER / SELECT intent
→ evaluate Base Applicability / Usefulness for this one application moment
→ TRUE / UNCERTAIN → form/select the Lens Application
→ confident FALSE  → NOT_APPLICABLE

bounded non-Unit Analysis Surface
+ explicit APPLY / USE intent for a named registered Lens
→ evaluate Base Applicability / Usefulness as explanatory relevance context
→ apply the requested supported operation once even when applicability is confidently FALSE
→ valid outcome may be `APPLIED — no material finding / no useful change`
```

Opening / During-work / Closing triggers are Unit-lifecycle temporal semantics and are not fabricated for direct application. If the bounded surface changes materially later, run a new applicability/application pass rather than inventing a fake Unit checkpoint lifecycle.

The same distinction applies inside Unit work: an explicit APPLY / USE instruction forces a one-shot application to the current bounded Analysis Surface, but **does not create or strengthen a persistent Unit Lens Attachment**. Normal Unit attachments and later checkpoint obligations continue to follow their canonical `REQUIRED` / `TRIGGERED` contracts.

`NOT_APPLICABLE` is therefore valid for discovered, triggered, or explicit **consider/select** candidates, but not as a substitute for an explicitly requested **apply/use** operation. A forced explicit application may still conclude with no Finding Candidate.

## 7. Unit Lens Attachments / Rare Target-Wide Attachment

Predictable Lens attachment normally belongs beside the smallest natural Module-defined Unit.

Canonical local shape:

```text
Lens Attachments

Core Lens Pack: INHERITED

REQUIRED
- <Lens> [OPENING | DURING | CLOSING combinations as justified]

TRIGGERED
- <Lens>
```

Rules:

1. every material Unit inherits the Core Lens Pack;
2. every Module-defined Unit shows a local `Lens Attachments` block for visibility, even when it has no additional predictable Lens relationships;
3. `REQUIRED [phase(s)]` means unconditional Lens application at those Unit checkpoint phases;
4. `TRIGGERED` carries no condition logic in the Unit;
5. the concrete Lens owns Opening / During-work invalidation / Closing trigger logic;
6. Lens-owned triggers may require additional early/repeated application even when a phase is not mandatory;
7. every local Lens Attachment block displays `Core Lens Pack: INHERITED` for visibility;
8. when there are no additional predictable Lens relationships, the block contains only the inherited Core Pack line;
9. a Target-wide attachment is exceptional and requires a genuinely Target-wide Analysis Surface that cannot be reduced without semantic loss;
10. unlisted Lenses remain discoverable through Generic Core + active-profile registry scans.

A Target Module does not duplicate reusable Lens prompts, Knowledge Basis or trigger logic.

## 8. Target Module / Local Target Contract Relation

A reusable Target Module is helpful but not mandatory for material IDTSPE work.

```text
recurring Target family with useful reusable contract
→ Target Module

one-off / unusual bounded planning result
→ Local Target Contract

both
→ full IDTSPE lifecycle
→ P-06 Lens Applicability Scan
```

A Local Target Contract may select any registered Core/profile Lens whose applicability / temporal trigger contract is satisfied. It does not need a fake Target Module merely to gain access to reusable Lenses.

## 9. Choice-Lifecycle Participation

The Lens model does not own the generic Target/Proposal/Decision lifecycle. Canonical candidate/selection semantics are in [`../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md`](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md); Target Formation and Shell resolution remain owned by their Core contracts.

Lens-local participation is only:

```text
current Analysis Surface / candidate choice
→ Lens evaluation
→ explanatory analysis OR material Finding Candidate
→ Core Finding Disposition when needed
→ normal Core/owner resolution outside the Lens
```

Typical Lens packs may attach at different choice surfaces, but that attachment does not make the Lens owner of the surrounding lifecycle.

## 10. Finding → Disposition Boundary

A Lens stops at explanatory analysis or a Finding Candidate. Canonical ownership/State/lifecycle disposition, handoff and Target Formation consequences are owned by [`../resolution/findings/FINDING-DISPOSITION.md`](../resolution/findings/FINDING-DISPOSITION.md).

```text
Lens application / attachment ≠ new Target Instance
Lens finding ≠ accepted Decision
Lens finding ≠ Result Unit mutation
Finding Candidate ≠ automatic child Target
```

## 11. Artifact / File Ownership Boundary

A Lens may contribute **supporting representation guidance for findings produced by that perspective**, but it does not own the generic placement schema or final destination resolution. Canonical `ARTIFACT_GUIDANCE`, placement-status, precedence and P-14 / PERSISTENCE_ADDRESSABILITY semantics are owned by [`Artifact Placement / Persistence`](../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md#representation-artifact-placement).

Lens-local responsibility is limited to:

```text
should this perspective suggest a distinct supporting representation at all?
what finding/supporting meaning would that representation carry?
under what Lens-local condition is the suggestion relevant?
```

A valid Lens outcome is `NONE / NO_DISTINCT_SUPPORTING_ARTIFACT`. A Lens never creates semantic authority, overrides an existing Target/owner, or duplicates a Target Module's canonical result representation merely to restate where accepted Target meaning belongs.

If a Lens needs structured artifact guidance, it conforms to the canonical `ARTIFACT_GUIDANCE` interface owned by the placement contract instead of redefining that interface here.

Example boundary:

```text
Evolution Lens finds future change pressure
→ Finding Candidate / accepted owner meaning first
→ Lens may suggest a companion/supporting projection when independent addressability helps
→ Documentation / Representation + P-14 decide whether/how it persists
```

## 12. Evolution / Architecture Boundary

```text
L5 Evolution / Change Isolation
→ evaluates accepted/planned future-change pressure inside a natural Target
→ surfaces Finding Candidates
→ Core Finding Disposition resolves local meaning/owner/lifecycle
→ Target Formation handles an independently substantial cross-owner architecture problem
```

A Lens does not own a global evolution map, current global architecture position or target-local evolution artifact. Representation follows the natural owner after accepted meaning exists.

## 13. Cross-Owner Navigation Boundary

Cross-owner navigation uses direct links to canonical owners and stable explicit anchors when fragment-level addressability is useful. Navigation/addressability does not create a new Lens, semantic owner, synchronization mechanism, or separate artifact family.

## 14. Revalidation Is Not A Peer Lens

Targeted revalidation is a Core methodology Use-Case/process concern, not a Lens lifecycle and not merely a Decision subtype. L3 may surface Finding Candidates carrying revalidation-signal meaning; Core Finding Disposition decides whether targeted revalidation routing is warranted, while the Revalidate Current Work Use Case owns the actual affected-scope re-entry process. Uncertainty/Reversibility ≠ Revalidation.

## 15. User Questions

```text
Lens Prompt ≠ RQ ≠ Q/R/P Question ≠ User Question
```

## 16. High-Level Composition Example

Suppose a Scenario Target uses `TM-SCENARIO-PLANNING`. Required Core Lenses are checked when their corresponding material surfaces exist, while Scenario journey-composition work remains owned by the Target Module itself. Feature behavior remains Feature authority; the Scenario may only reference participating Feature results and compose actor/external links, order/branch/convergence, continuity and Benefit manifestation/closure. The Lens Applicability Scan may additionally select Quality/Risk, Practical Evidence, UI, Vertical Slice, Evolution, Test Proof or another registered Lens when the current Analysis Surface makes that perspective material. No Lens is attached merely because its topic could become relevant downstream.


## Migration Compatibility


Legacy concrete Lens `Activation:` fields and Target Module `Lens Profile` sections remain readable during staged migration, but they are migration evidence only.

```text
legacy Activation metadata
≠ normative attachment strength

legacy primary / conditional Lens Profile wording
≠ mechanical REQUIRED / TRIGGERED conversion
```

Each installed Lens/Target Module must be migrated from its actual Analysis Surface and accepted Unit/Lens audit. New or materially revised Lens files must use the temporal trigger contract; new or materially revised Target Modules must use Unit-local Lens Attachments / rare justified Target-wide attachments.

The Lens contract separates `Analysis Surface + Lens operations + Findings` from Core Finding Disposition.

Current conformance is **registry-driven rather than count-driven**:

```text
every Lens currently listed in the SDS Lens Registry
→ explicit Analysis Surface
→ explicit Supported Operations
→ explicit Finding Contract

Core generic Lens bodies
→ remain readable through their current Target Inputs / prompts / findings
  until a separate literal Core-Lens conformance pass is useful
```

Mechanical registry/file parity and snapshot counts belong to [`../planning/documentation/idtspe-methodology/active/evidence/checks/ACTIVE-METHODOLOGY-MECHANICAL-CONSISTENCY-CHECK.md`](../../evidence/checks/ACTIVE-METHODOLOGY-MECHANICAL-CONSISTENCY-CHECK.md), not to this semantic contract.

Compatibility interpretation for any reusable Lens body not yet rewritten literally:

```text
Target Inputs / Evidence
→ Context + current analysis subject

Prompts / Evaluation Workflow
→ infer Analysis Surface from Lens purpose

Findings / Outputs
→ Finding Candidates

accepted finding that changes current Target meaning
→ Core Finding Disposition
→ normal resolution
→ existing Result Unit update when warranted

Artifact / File Implications
→ remains current P-14 / PERSISTENCE_ADDRESSABILITY guidance
```

New or materially revised Lens files should make Analysis Surface, supported operations and Finding Contract explicit.

## 17. Maintenance

Creation/review/promotion of a reusable Lens is owned by [`../use-cases/maintain-lens/UC-IDTSPE-MAINTAIN-LENS.md`](../use-cases/maintain-lens/UC-IDTSPE-MAINTAIN-LENS.md).

Mechanical checks should verify:

```text
Knowledge Basis is present when reusable theory/reference knowledge materially helps the Lens
Knowledge Basis representation is free-form; theory references and applied interpretation are proportional to usefulness
every reusable Lens has one Artifact / File Implications section
new/materially revised Lens declares Analysis Surface + Supported Operations + Finding Contract explicitly
Lens does not define State Unit kinds or Target Result Unit kinds
zero or more AG-* records are allowed
every AG-* describes Lens-produced supporting / artifact-placement meaning rather than duplicating Target-result AP
Unit-local / rare Target-wide Lens Attachment refs resolve to registered Lens owners
P-06 Lens applicability can discover applicable registered Lenses even without a Target Module
selected Lens execution preserves `(Lens Model, Analysis Surface, Operation, relevant basis)` rather than dropping the operation
```
