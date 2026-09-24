<a id="tm-proposal-workup"></a>
# TM-PROPOSAL-WORKUP — Bounded Proposal Workup

Entry Point: `tm.proposal.workup`
Role: generic Core optional Target Module
Target family / archetype: `PROPOSAL_WORKUP`

> Semantic Owner Dependencies
> - `EXTENDS` [Target Module Meta-Model](TARGET-MODULE-MODEL.md#target-module-meta-model) — `TARGET-MODULE.META-MODEL`
> - `CONTEXTUALIZES` [Proposal / Decision Lifecycle](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`
> - `CONTEXTUALIZES` [Finding Disposition](../resolution/findings/FINDING-DISPOSITION.md#resolution-finding-disposition) — `RESOLUTION.FINDING-DISPOSITION`
> - `CONTEXTUALIZES` [Q/R/P Lifecycle](../resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md#resolution-qrp-lifecycle) — `RESOLUTION.QRP-LIFECYCLE`

## Purpose and activation

Produce one independently useful, bounded **Proposal Workup**: a coherent set of candidate resolutions for one material driver/subject or one tightly related driver set, with the review and selection handoff needed to use those candidates responsibly. The module makes substantial Proposal work addressable across a conversation or handoff. It does not create a new Proposal State kind, selection authority or default file/register.

The Target Step Result is a candidate-resolution brief with comparison and handoff value, not a Target-level `PROPOSAL_SPACE` or a list that merely repeats Core Proposal State. If a list of existing candidates is all that is needed, use ordinary Proposal references or `TM-PLANNING-RESOLUTION-STATE` for ongoing coordination instead of forming this Target.

Use when Proposal discovery, comparison or refinement has enough independent value to justify a Target. It can be used for a Goal/Desired Outcome, Question, Risk, Problem, Finding, or another grounded material driver. A material Finding may be analyzed first by `TM-REVIEW-FINDINGS` or ordinary Finding Disposition; this module may then form the linked Proposal(s) without rerunning discovery or reclassifying `RE-*`.

Skip this Target for a single obvious candidate, a deterministic `RE-0` correction, or ordinary candidate reasoning that can live directly with the natural owner. The canonical `idtspe.proposal` operation and Proposal/Decision lifecycle still apply without forming this Target. Do not create a Proposal Target merely because one Proposal exists.

When a specific Target Module is the natural form of a proposed Target Result, use that module for the candidate Target Instance under Proposal authority. This generic workup may coordinate those candidates only when its own bounded result is useful; it must not replace the specialized Target body. When the affected natural semantic subject is unresolved, surface an ownership Question/Target Formation need. The workup is not a fallback semantic owner for an ownerless proposal.

## Source contract

Start from current accepted meaning and authoritative Sources, the actual driver and smallest affected natural subject, relevant Q/R/P and Evidence, supplied Finding/`RE-*` disposition when present, and USER-only facts needed to ground a responsible candidate. Preserve actual selected Decisions; do not infer new ones from AI recommendations.

The concrete Target's `SOURCE_AUTHORITY` Requirement remains authority. [Proposal / Decision Lifecycle](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) owns candidate identity, review, selection and integration. This module supplies a reusable bounded result shape and production method only.

## Module-defined Unit Inventory

**Target Step Result:** `Proposal Workup`

Two Module-defined Units follow the [Target Work Unit/Collection/Slot contract](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-unit-contract):

Candidate formation and candidate evaluation are separate Unit responsibilities because a new Evidence item may reopen comparison/selection handoff without changing the candidate bodies, while a refined candidate may require only affected evaluation to rerun.

| Result Unit | Responsibility | Result |
|---|---|---|
| `RU-PWORK-01` | form/refine grounded candidate Proposals for the bounded driver/subject | addressable `PWORK-CANDIDATES` Collection, `0..N` |
| `RU-PWORK-02` | review candidates and expose an honest comparison/selection/revalidation handoff | bounded review and handoff over the same candidate references |

### `RU-PWORK-01` — Candidate formation

**Purpose.** Present candidate answers or routes separately from the driver, current accepted meaning and each other.

**Item Contract.** One canonical IDTSPE Proposal reference/compact candidate with its preserved driver, smallest natural affected subject/owner, proposed Result Meaning and/or Resolution/Realization Route, relevant source/Evidence basis, and material relations to competing/complementary/dependent candidates. The canonical Proposal identity is the Collection Item Key when available. The Proposal body and candidate authority remain with the Core lifecycle and affected natural subject; the workup item is a linked view, not a second copy of accepted meaning.

**Result Content Contract.** One coherent bounded candidate set. A valid zero-candidate result must explain why grounding or owner resolution currently blocks formation; it is not a silently empty workup. Do not manufacture alternatives or a formal Proposal merely to populate the Collection. A single substantial candidate can justify the Target when its analysis/handoff has independent value.

For Finding drivers, preserve the Finding reference and canonical `RE-*` disposition. Each material Finding must ultimately have at least one linked Proposal: `RE-0` can be deterministic; `RE-3` remains `BLOCKED_BY_REVALIDATION`; `RE-2`/`RE-4` are semantic-change candidates requiring normal selection. `RE-*` is not a Proposal scale and is not recomputed here.

### `RU-PWORK-02` — Candidate review and handoff

**Purpose.** Make the proposed routes reviewable without treating recommendation, file placement or AI analysis as selection.

**Collection Definition — `PWORK-REVIEWS`.** One review/handoff item per material candidate in `PWORK-CANDIDATES`; `0..N`, keyed by the same canonical Proposal identity. The common Item Contract is the evaluation/provenance, consequences and selection/blocker handoff below. A pending review is explicit. Cross-candidate comparison remains ordinary integrative Unit content; candidate bodies remain referenced. This is a simple Unit unless a concrete context independently justifies formal Slots.

**Result Content Contract.** For each material candidate, record or reference the canonical [Resolution Context Lens](../lenses/required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md) evaluation, proportional [Proposal Semantic Change Impact Review](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle), material Q/R/P and Evidence needs, compatibility/dependencies, and truthful `UNSELECTED`/blocked/review-pending state. Compare real alternatives only where a choice exists. State the smallest USER/owner selection or revalidation action actually needed. A blocked `RE-3` candidate is not selectable until upstream revalidation refines it.

The Unit may recommend a candidate, but recommendation does not select it. Actual selection, Decision retention and integration are governed by the canonical lifecycle and natural owner. If new review discovers a material contradiction, send it to Finding Disposition; do not silently rewrite the driver or accepted meaning.

Apply [Proposal Semantic Change Impact Review](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#proposal-semantic-change-impact-review), including its [evidence-backed conclusion rule](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-claim-grounding). Upstream/downstream applicability is checked for every material candidate; supported no-change and explicit unknown outcomes remain distinct. Reuse the supplied Finding's rationale/basis by reference when current, then evaluate the candidate's conditional effects. Claims that this candidate needs no new semantic selection or follows an already selected USER direction must identify that accepted basis and explain the connection. Do not create a Proposal-owned RE scale.

### Unit applicability and checkpoints

Apply [Unit Applicability / Materiality / Disposition](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition) and the [Unit Applicability Envelope](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-envelope). Both Units stay declared for a formed Proposal Workup Target. A genuinely blocked zero-candidate result is explicit, not omission.

| Unit | Opening checkpoint | In-Unit work | Closing checkpoint |
|---|---|---|---|
| `RU-PWORK-01` | resolve driver, smallest natural subject, Sources and Core/profile Lens candidates | form/refine only grounded canonical candidates and their relations | check driver/owner/identity and no ungrounded or duplicate alternatives |
| `RU-PWORK-02` | resolve candidate refs, relevant Resolution Context Lens and selection authority | perform proportional impact/context review and compare material alternatives | check review provenance, blockers, selection gates and natural handoff without implied acceptance |

Registry checks may reuse trustworthy current metadata; they do not force every Lens to run or every candidate to require a user question.

## Resolution / production method

1. Bound the driver and affected natural subject. If a supplied Finding is the driver, consume its current disposition; do not rerun Review or override its `RE-*` classification.
2. Inspect available Sources/Evidence and ask only for missing material USER-only grounding that can change the candidate itself. Do not use this Target to manufacture a solution for an uncollected wanted outcome.
3. Form/refine canonical Proposal(s) in `RU-PWORK-01`, preserving driver and candidate authority. Use a candidate Target Instance under its specific Target Module when the proposal is a Target Result.
4. Apply the Resolution Context Lens and Proposal Semantic Change Impact Review proportionally in `RU-PWORK-02`; make alternatives, dependencies, blockers and selection boundary clear.
5. Hand candidates to the actual USER/owner authority. Selection/integration may follow, but this module does not select or mutate by itself. Retain workup only while handoff/revalidation value justifies it.

## Validation and worked acceptance example

Check that every candidate has a material driver and smallest natural subject, the canonical Proposal identity is stable, Findings retain their `RE-*` state, semantic-change candidates remain unselected until authorized, blocked candidates are not presented as selectable, and selected meaning flows to its natural owner rather than becoming authority in this workup.

```text
Grounded requirement:
  A material Finding F-1 was classified RE-2 at one current owner;
  two meaningfully different corrections need USER comparison.

RU-PWORK-01:
  P-1 → F-1 / affected owner / candidate semantic correction A
  P-2 → F-1 / affected owner / candidate semantic correction B
  P-1 competes with P-2; both remain UNSELECTED.

RU-PWORK-02:
  compare the owner/Requirement/Source/downstream consequences of A and B;
  cite Resolution Context review; identify the USER-owned selection gate.

Handoff:
  a selected candidate integrates at the affected owner under normal authority;
  the other remains unselected/rejected as the canonical lifecycle determines.

Contextual completion:
  if a specialized Target Module owns the full proposed owner body,
  its candidate Target Instance supplies that body; this workup only links it.
```

<a id="artifact--representation-contract"></a>
## Artifact / representation contract

```text
ARTIFACT_PROPOSAL
ID: AP-PWORK-01
CONTENT_KIND: PROPOSAL_WORKUP
WHEN: the bounded candidate comparison or unresolved handoff has continuing value beyond the current conversation
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: EMBED_OR_PLACE
SEMANTIC_OWNER: current Proposal Workup Target; canonical Proposal/Decision semantics remain with Core lifecycle and natural affected subjects
REPRESENTATION: CONVERSATIONAL_BY_DEFAULT_OR_EXISTING_OWNER
CONTENT: bounded driver/subject + RU-PWORK-01 candidate references + RU-PWORK-02 review/selection handoff + honest blockers; no duplicate Proposal register
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

Current Work Context is the default representation. P-14 chooses persistence only when continuing review/handoff/revalidation value warrants it. A Proposal can exist without this Target or a dedicated file.

## Relationship to other Core modules and guards

```text
TM-REVIEW-FINDINGS → analyzes Finding evidence, impact and RE-* disposition
TM-PROPOSAL-WORKUP → optionally develops linked candidate route(s)
TM-PLANNING-RESOLUTION-STATE → optionally maintains the single PRS/RCF result: open Proposals with Q/R/P and Decisions with qualifying related Q/R/P
```

These modules may be composed when their distinct results are useful; no fixed sequence or one-Target-per-Proposal rule follows.

This module does not own a new Proposal lifecycle, bypass natural owners, select Decisions, authorize mutation/tests/commit/push, or require Proposal persistence.

## Further worked example

Read the [bounded worked case](../examples/review-proposal-pre-update/proposal-workup.example.md) for Sources, Unit results, consequences and completion boundaries. Its declared historical/illustrative basis remains explanatory, not current semantic authority.
