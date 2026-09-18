<a id="tm-rk-50-landscape-analysis"></a>
# Landscape Analysis

Module ID: `TM-RK-50-LANDSCAPE-ANALYSIS`  
Status: active profile module  
Entry Point: `rk.landscape-analyze`  
Supported Roles: `PRIMARY`

## Purpose

Build the best useful, evidence-grounded understanding of a selected knowledge landscape, with inquiry depth and direction adapted to the current concern, available Sources and expected value of further investigation.

## Activation / Scope Gate

Use when the useful result concerns relationships/patterns/development across multiple Entries or a broader knowledge landscape rather than resolution of one Entry.

Do not require a fixed research shape. Genealogy, temporal evolution, distributions, causal interpretation, genre formation, coexistence of ideas or other inquiry directions are selected only when materially useful and supportable.

## Source Contract

Typical Sources: visible Bank Entries, Entry metadata, Tags, Entry Relations, Analysis Records, Vocabulary definitions, prior Landscape results and external Evidence/Sources when Bank coverage is insufficient.

## Target Step Result

`Landscape Understanding` = coherent current understanding of the selected concern, including only material evidence context, supported observations/interpretations, uncertainty/open questions and revalidation meaning.

A retained representation may be called a `Landscape Snapshot`.

## Candidate Unit Inventory

| ID | Unit | Bounded result responsibility |
|---|---|---|
| `RU-RKL-01` | [Scope And Evidence Base](#ru-rkl-01) | establish what is being investigated and what evidence can support the inquiry |
| `RU-RKL-02` | [Adaptive Landscape Inquiry](#ru-rkl-02) | investigate the most material questions/directions proportionally to evidence and expected information value |
| `RU-RKL-03` | [Current Understanding And Synthesis](#ru-rkl-03) | integrate supported meaning, uncertainty, competing interpretations and useful open questions |

## Unit Checkpoint Map

Every material Unit uses its inherited Opening / In-Unit / Closing applicability envelope.

<a id="ru-rkl-01"></a>
## `RU-RKL-01` — Scope And Evidence Base

**Result Responsibility.** A sufficiently clear Landscape concern/scope and evidence base so later interpretations can be understood at the correct strength.

**Applicability / Omission.** Required for every Landscape Target, but may stay thin when the concern and evidence scope are already obvious/current.

**Inputs / Sources.** USER concern/questions, visible Bank scope, relevant Entries/Tags/Relations/Analysis, chronology/provenance, prior Landscape work and external evidence when needed.

**Knowledge Basis.** [Landscape Research And Evolution Guidance](../guidance/LANDSCAPE-RESEARCH-AND-EVOLUTION-GUIDANCE.md#landscape-research-and-evolution-guidance), [Bank Principles](../models/BANK-PRINCIPLES.md#bank-principles).

**Resolution Method.** State what the inquiry is trying to understand without prematurely forcing a fixed answer form. Identify the currently useful evidence base and its material gaps/limits. Select time/population/segments only when they help the concern; allow scope to refine during inquiry when new evidence justifies it. Materialize exact Entry membership/query context only when exact reproduction or comparison is materially useful.

**Result Content.** Landscape concern/scope, selected evidence base/search scope, material time/population/segment context when useful, and known evidence limitations.

**Validators.** Later claims can be traced to an appropriate evidence scope; Bank-visible examples are not silently treated as a broader population; unavailable evidence is not claimed as checked.

<a id="ru-rkl-02"></a>
## `RU-RKL-02` — Adaptive Landscape Inquiry

**Result Responsibility.** Material investigated observations/interpretations that improve understanding of the current Landscape concern.

**Applicability / Omission.** Required whenever research beyond already-established Sources is useful. May be source-derived/light when existing trusted material already provides sufficient understanding.

**Inputs / Sources.** `RU-RKL-01` scope/evidence, applicable installed Domain Pack knowledge and independently registered Lenses when available, relevant Entry/Vocabulary/Analysis material and newly discovered Evidence.

**Knowledge Basis.** [Landscape Research And Evolution Guidance](../guidance/LANDSCAPE-RESEARCH-AND-EVOLUTION-GUIDANCE.md#landscape-research-and-evolution-guidance), [Landscape Evidence Adequacy](../lenses/LENS-RK-LANDSCAPE-EVIDENCE-ADEQUACY.md#lens-rk-landscape-evidence-adequacy), plus applicable installed Domain Pack inquiry guidance and registered Lenses when available.

**Resolution Method.** Generate questions from the current concern and evidence rather than executing a fixed checklist. Pursue only directions likely to materially improve understanding. Possible directions include comparison, recurring patterns, earlier/later forms, partial genealogy/lineage, branching, combinations/hybrids, coexistence/adoption/displacement/revival, cross-domain transfer, distributions, constraints/enablers, documented influence, plausible drivers or other questions surfaced by the investigation. Re-evaluate direction/depth after material findings and stop when further work is unlikely to add proportional value.

**Result Content.** Supported observations/relationships/interpretations, explicit hypotheses or competing explanations where needed, material uncertainty, evidence links/context and useful newly surfaced questions. No specific finding family is mandatory.

**Validators.** Chronology is not silently converted to influence/causality; structural similarity is not automatically lineage; claim strength matches evidence; investigation depth remains proportional rather than exhaustive.

<a id="ru-rkl-03"></a>
## `RU-RKL-03` — Current Understanding And Synthesis

**Result Responsibility.** Coherent bounded representation of what is currently understood about the Landscape concern and what remains materially uncertain.

**Applicability / Omission.** Include when several observations/interpretations need integration or the result must be retained/handed off. May be thin when one direct finding already serves the Target.

**Inputs / Sources.** Material `RU-RKL-01..02` results, applicable installed Domain context when available, Evidence and material limitations.

**Knowledge Basis.** [Landscape Research And Evolution Guidance](../guidance/LANDSCAPE-RESEARCH-AND-EVOLUTION-GUIDANCE.md#landscape-research-and-evolution-guidance), plus applicable installed Domain Pack guidance / independently registered Lenses when available.

**Resolution Method.** Integrate only meaning justified by current evidence. Preserve partial/branching/uncertain models when a single clean narrative is not warranted. Distinguish supported observation, interpretation and hypothesis. State material unknowns/competing explanations and whether additional investigation has a useful next direction.

**Result Content.** Current Landscape understanding / Key Findings, uncertainty and competing interpretations when material, useful open questions/next evidence directions, limitations and revalidation signals. When retained as a Snapshot, include stable Snapshot ID, `Created At`, material `As Of` / observed period and optional `Supersedes` ref.

**Validators.** Synthesis does not become authority over individual Entries; neat narrative does not erase uncertainty/counterexamples; broad words such as common/dominant/emerging/declining use evidence appropriate to that scope.

## Lens Profile

- [Landscape Evidence Adequacy](../lenses/LENS-RK-LANDSCAPE-EVIDENCE-ADEQUACY.md#lens-rk-landscape-evidence-adequacy)
- applicable installed Domain Pack guidance / independently registered analysis Lenses when available
- [Entry Identity / Duplication](../lenses/LENS-RK-ENTRY-IDENTITY-AND-DUPLICATION.md#lens-rk-entry-identity-and-duplication) when identity topology materially affects the inquiry

## Handoff

Landscape understanding may guide further Entry work, vocabulary evolution, research or another consumer without becoming authority over individual Entries.

A proposed lineage/influence/derivation discovered by Landscape Analysis does not automatically become an accepted Entry Relation; durable graph mutation follows the natural Entry/Relation owner and evidence boundary.

## Revalidation

Reopen when material new evidence, changed Entry identity, vocabulary refactor, changed inquiry concern or materially improved coverage may change the useful understanding.

## Artifact / File Contract

A Landscape Snapshot is preferred when later comparison/research/revalidation benefits from retaining the current scoped understanding. One-off exploration may remain ephemeral when no continuing value exists.

```text
ARTIFACT_PROPOSAL
ID: AP-RK-LANDSCAPE-01
CONTENT_KIND: Landscape Snapshot / retained Landscape Understanding
WHEN: accepted Landscape understanding/evidence context has continuing research/revalidation value
GUIDANCE: PROFILE_CONDITIONAL
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: Landscape Snapshot
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <selected-bank-landscape-snapshot-representation>
CONTENT: Snapshot ID/Created At/As Of when material, optional Supersedes ref, concern/scope, evidence base, material inquiry observations/interpretations, uncertainty/open questions, synthesis, limitations and revalidation trigger
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```
