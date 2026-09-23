<a id="tm-review-findings"></a>
# TM-REVIEW-FINDINGS — Review Finding Analysis

Entry Point: `tm.review.findings`
Role: generic Core optional Review Target Module
Target family / archetype: `REVIEW_FINDINGS_ANALYSIS`

> Semantic Owner Dependencies
> - `EXTENDS` [Target Module Meta-Model](TARGET-MODULE-MODEL.md#target-module-meta-model) — `TARGET-MODULE.META-MODEL`
> - `CONTEXTUALIZES` [Review Strategy and Coverage](../../ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md#review-strategy-coverage) — `REVIEW.STRATEGY-COVERAGE`
> - `CONTEXTUALIZES` [AI Reviewability](../../ai-reviewability/AI-OUTPUT-REVIEWABILITY.md#review-priority) — `AI.REVIEWABILITY`
> - `CONTEXTUALIZES` [Finding Disposition](../resolution/findings/FINDING-DISPOSITION.md#resolution-finding-disposition) — `RESOLUTION.FINDING-DISPOSITION`
> - `CONTEXTUALIZES` [Proposal / Decision Lifecycle](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`

## Purpose and activation

Produce one independently useful, bounded **Review Finding Analysis** when discovering and classifying Findings warrants an addressable result. This module separates observed problems from candidate solutions. It does not own Review Coverage, Finding Disposition, Review Priority, Resolution Escalation, Proposal, Decision or another Shell lifecycle.

Use this module after normal Target Formation finds value in a separate finding analysis result over a specified subject, scope and basis. Ordinary `idtspe.review`, recheck or consistency review can remain operations with no Review Target. The Review Target is not a mandatory stage, a global Finding register or a new requirement to persist every review.

A reviewed subject may be a current owner/result or another bounded existing semantic surface. A full `idtspe.review` still obeys its canonical complete-review contract after this module hands off material Findings.

## Source contract

Use the bounded review subject, authoritative current Sources and accepted meaning, relevant Evidence, the Review Coverage working context, applicable Validation/Lens results, and trustworthy prior coverage when rechecking. Record the basis on which each Finding was observed. Missing consequential Sources become explicit blockers or Questions; they are not filled by speculation.

The concrete Target's `SOURCE_AUTHORITY` Requirement remains authoritative. [Review Strategy](../../ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md#review-strategy-coverage) owns the Review Coverage Record and mode; P-12/P-06 own actual checks. This module presents their material diagnostic result without duplicating those mechanisms.

## Module-defined Unit Inventory

**Target Step Result:** `Review Finding Analysis`

Both Module-defined Units follow the [Target Work Unit contract](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-unit-contract). The Target carries one bounded Review Subject/Scope/Basis and a reference to the canonical Review Coverage Record; that record is not a third Unit.

| Result Unit | Responsibility | Result |
|---|---|---|
| `RU-RFIND-01` | discover and evidence Finding Candidates without embedding a remedy in the observation | addressable `RFIND-CANDIDATES` Collection, `0..N` |
| `RU-RFIND-02` | analyze materiality, impact, owner and Resolution Escalation through canonical Finding Disposition | one diagnosis/disposition for each candidate, including non-material/duplicate disposition |

### `RU-RFIND-01` — Finding discovery

**Purpose.** Let the actual observations be inspected before proposed corrections are formed.

**Item Contract.** One potentially material Finding Candidate observed on the declared basis, with a stable local or natural Finding reference, affected semantic subject, specific contradiction/gap, source/Evidence references, and review cell/check that exposed it. The Collection Item Key remains stable across diagnosis and later Proposal handoff. A duplicate or non-material candidate may remain as a concise disposition reference when traceability is useful.

**Result Content Contract.** A bounded, evidence-backed finding set or an explicit zero-finding result. Reference the canonical Review Coverage Record for checked, reused, blocked and remaining cells; a finding count or file count is not a coverage claim. Keep observation text separate from possible resolution routes.

### `RU-RFIND-02` — Finding diagnosis and disposition

**Purpose.** Establish what each candidate means for the current methodology and what attention or escalation it requires, before forming its Proposal.

**Collection Definition — `RFIND-DIAGNOSES`.** One diagnosis item per `RFIND-CANDIDATES` item, including explicit non-material/duplicate outcomes; `0..N`. The Item Key is the referenced Finding Candidate key. The common Item Contract is the diagnosis, rationale/basis and handoff content defined below. A pending diagnosis is explicit rather than a missing item. This Unit is simple unless a concrete context independently justifies formal Slots.

**Result Content Contract.** For each `RU-RFIND-01` item, use [Core Finding Disposition](../resolution/findings/FINDING-DISPOSITION.md#resolution-finding-disposition) to resolve materiality, duplicate/previously represented status, smallest natural subject/owner, distinct `RE-0..RE-4` Resolution Escalation, the most-upstream affected owner, decision/revalidation consequence, and the actual USER attention needed. Use [AI Reviewability](../../ai-reviewability/AI-OUTPUT-REVIEWABILITY.md#review-priority) for `Review Priority` (`Critical`/`High`/`Normal`/`Low`) when material. State uncertainty honestly; `RE-3` is an upstream revalidation exposure, not a selected downstream fix. The Review Priority measures cost/blast radius; `RE-*` measures semantic resolution distance. They must not be collapsed into one score.

For each material Finding, record a local descriptive Proposal handoff label as `LINKED` with one or more Proposal references, or `PENDING`/`BLOCKED` with the explicit reason and natural destination. Proposal payload and selection remain with the [Proposal / Decision Lifecycle](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) and, when separately useful, `TM-PROPOSAL-WORKUP`. These labels project link availability/continuation only; they are not a second canonical lifecycle. In particular, an existing BLOCKED_BY_REVALIDATION Proposal is LINKED even while selection is blocked. This Unit diagnoses and routes; it does not itself invent a fix or copy a Proposal body.

Apply the required [Finding classification and consequence basis](../resolution/findings/FINDING-DISPOSITION.md#finding-classification-consequence-basis): show supported rationale for Priority, RE, upstream/downstream consequences and USER attention. Cite actual accepted Sources or identifiable USER statements for already-implied/no-new-selection claims. Keep present defect/exposure distinct from the conditional effects of a later Proposal, and preserve any unsupported conclusion as unresolved. These obligations apply before the Proposal handoff and do not require a correction payload inside this Unit.

The analysis may be shared as an **intermediate** result while Proposal work continues. Under the current Core contract, a material Finding is not fully dispositioned for complete-review/output purposes until at least one linked IDTSPE Proposal exists. Therefore `PENDING`/`BLOCKED` handoffs keep the full review open, even if the diagnostic content of this Target is ready for the next action. A zero-material-Finding result needs no Proposal handoff.

### Unit applicability and checkpoints

Apply [Unit Applicability / Materiality / Disposition](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition) and the [Unit Applicability Envelope](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-envelope). Both Units remain declared for a formed Review Finding Analysis Target. A zero-item Collection or an explicit no-material-Finding diagnosis is a substantive result, not an omitted Unit.

| Unit | Opening checkpoint | In-Unit work | Closing checkpoint |
|---|---|---|---|
| `RU-RFIND-01` | resolve subject/basis, review cells and applicable Core/profile Lens/validator candidates | inspect Sources through selected checks; capture observed candidates and Evidence | recheck material coverage and observation provenance; hand candidates to diagnosis |
| `RU-RFIND-02` | resolve candidate references and canonical Finding owner; recheck applicability when analysis surface changed | diagnose materiality, priority, `RE-*`, natural owner and attention without composing Proposal payload | check every candidate has honest disposition/handoff state; mark full-review Proposal obligations still open |

Registry checks may reuse trustworthy current metadata. No checkpoint demands every Lens or another full pass.

## Resolution / production method

1. Establish the exact subject, scope, basis, mode and prior coverage from existing current material.
2. Use Review Strategy/Coverage to derive materially applicable cells; P-12/P-06 perform or validly reuse checks. Record observed candidates and Evidence in `RU-RFIND-01`.
3. Analyze every candidate through Core Finding Disposition. Show `Review Priority`, `RE-*`, owner, upstream reach and USER attention separately in `RU-RFIND-02`; do not infer the remedy from the severity label.
4. Hand each material Finding to the canonical Proposal lifecycle. Use `TM-PROPOSAL-WORKUP` only when a separate bounded Proposal workup is independently useful. When it is not, form the linked Proposal directly as ordinary Core State.
5. Update and self-check diagnostic coverage at handoff. Full review completion additionally requires the canonical linked Proposal for every material Finding; an explicit blocker allows a truthful incomplete report, not a substitute for that obligation. If a correction changes the basis, recheck affected cells instead of replaying unchanged checks.

The two Units separate finding discovery from diagnosis. Proposal formation is a subsequent action, whether or not it forms its own Target. An intermediate finding analysis must not be labelled a complete `idtspe.review` pass.

## Lens profile and validation

Use the generic required Core Lens pack and active-profile Lens Registry through normal applicability. Conditional candidates include [Authority / Source of Truth / Reuse](../lenses/required/LENS-AUTHORITY-SOT-REUSE.md), [Dependency / Change Impact](../lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md), and [Quality / Risk / Materiality](../lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) when their actual Analysis Surfaces exist. Review Strategy requests useful perspectives; P-06 resolves executable Lens applications.

Check that the subject/scope/basis matches the Review Coverage Record, each candidate cites current Evidence and a review cell, every candidate receives an explicit materiality/owner disposition, Priority and `RE-*` remain distinct, and no Proposal/Decision is presented as already selected by diagnostic classification.

## Worked acceptance example

```text
Grounded review requirement:
  Diagnose a command/documentation inconsistency before proposing edits.

Review subject/basis:
  one current command definition C and its accepted command contract O/R-1;
  R-1 explicitly requires CURRENT_BASIS here; inspected consumer H derives
  the command projection from C;
  Review Coverage records the executed contract check and remaining cells.

RU-RFIND-01:
  F-1: C declares LEGACY_MODE contrary to O/R-1;
       cite both current source sections, the C-to-H dependency and review cell.

RU-RFIND-02:
  F-1 is material; Review Priority Normal because observed impact is bounded
  to C and H; RE-0 because accepted R-1 already determines the required meaning.
  C is the affected owner; upstream O/R-1 stays unchanged; downstream H needs
  recheck because it derives this value from C. No new semantic selection is
  needed about valid modes, with R-1 as the cited basis; Proposal PENDING.

Next action:
  form/refine a linked deterministic-correction Proposal in ordinary Core
  State or through optional TM-PROPOSAL-WORKUP; only then close the full review.

Contextual completion:
  an upstream semantic conflict would use RE-3/revalidation instead of
  treating the missing declaration as a local wording fix.
```

## Artifact / representation contract

```text
ARTIFACT_PROPOSAL
ID: AP-RFIND-01
CONTENT_KIND: REVIEW_FINDING_ANALYSIS
WHEN: the bounded diagnostic result has continuing handoff, discussion or recheck value beyond the current conversation
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: EMBED_OR_PLACE
SEMANTIC_OWNER: current Review Finding Analysis Target; canonical Finding/Proposal semantics retain their Core owners
REPRESENTATION: CONVERSATIONAL_BY_DEFAULT_OR_EXISTING_OWNER
CONTENT: bounded subject/basis + Review Coverage reference + RU-RFIND-01 observations + RU-RFIND-02 diagnoses/handoff states + honest gaps; no duplicate lifecycle register
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

Default representation is current Work Context. Persist only when continuing value justifies it, preferably in an existing review/owner artifact. Neither a formed Target nor a material Finding requires a dedicated file.

## Handoff and guards

```text
Review Finding Analysis → ordinary Core Proposal formation
Review Finding Analysis → TM-PROPOSAL-WORKUP when a separate Proposal result is useful
linked Proposal / selected correction → natural affected owner under normal authority
material basis change → affected Review Coverage recheck
```

This module does not require a Target for every review, does not own Review Coverage or a new Finding/Proposal lifecycle, and does not authorize file changes, tests, commit, push or deployment.

## Further worked example

Read the [bounded worked case](../examples/review-proposal-pre-update/review-findings.example.md) for Sources, Unit results, consequences and completion boundaries. Its declared historical/illustrative basis remains explanatory, not current semantic authority.
