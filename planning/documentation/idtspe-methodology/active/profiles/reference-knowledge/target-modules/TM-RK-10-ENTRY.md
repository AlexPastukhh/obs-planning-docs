<a id="tm-rk-10-entry"></a>
# Entry

Module ID: `TM-RK-10-ENTRY`  
Status: active profile module  
Entry Point: `rk.entry`  
Supported Roles: `PRIMARY | SUPPORTING`

## Purpose

Create, materially refine, revalidate or retire one durable Entry record for one independently useful reference subject.

## Activation / Scope Gate

Use when the bounded useful result is the Entry record itself: establishing subject identity/ownership, materially resolving its representation or subject boundary, or retiring a record that should no longer be preferred.

Do not form an Entry Target merely to add one obvious Tag Assignment, Relation, Analysis note or small factual/locator correction when the owner and intended change are already clear.

## Source Contract

Typical Sources: represented material/subject, existing matching Entries, provenance/origin, owning Bank scope, visible Banks, relevant vocabulary/analysis and external evidence when needed.

## Knowledge Basis

[Reference Knowledge Object Model](../models/REFERENCE-KNOWLEDGE-OBJECT-MODEL.md#reference-knowledge-object-model), [Bank Principles](../models/BANK-PRINCIPLES.md#bank-principles), [Entry Semantic Decomposition Guidance](../guidance/ENTRY-SEMANTIC-DECOMPOSITION-GUIDANCE.md#entry-semantic-decomposition-guidance), applicable installed Domain Pack guidance when available.

## Target Step Result

One correctly owned and sufficiently resolved Entry record. Related Tag Assignments, Relations or Analysis may be created/refined as ordinary bank operations when useful, but are not module-defined Entry Units by default.

## Module-defined Unit Inventory

| ID | Unit | Bounded result responsibility |
|---|---|---|
| `RU-RKE-01` | [Entry Identity And Ownership](#ru-rke-01) | establish what subject the durable record denotes, its owning Bank and whether the record remains current |
| `RU-RKE-02` | [Entry Representation](#ru-rke-02) | retain the material locator/provenance/intrinsic factual representation needed for useful reuse |
| `RU-RKE-03` | [Semantic Decomposition](#ru-rke-03) | discover independently useful related subjects when deeper subject resolution is material |

## Module-defined Unit Visibility

Generic Unit existence/disposition semantics follow the Core [Unit / Target Step Result Model](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md). This module owns only the Reference-Knowledge Unit responsibilities, local materiality/omission reasoning and specialized guidance below; Contextual Units remain governed by Core formation semantics.

## Unit Checkpoint Map

Every material Unit follows the inherited Core applicability/materiality envelope. A clear USER request or already-current accepted scope may satisfy obvious applicability/selection without extra profile-specific ceremony.

#### `RU-RKE-01` processing envelope

**Opening Unit Checkpoint — `RU-RKE-01`** → **Unit Work — `RU-RKE-01`** → **Closing Unit Checkpoint — `RU-RKE-01`**.

#### `RU-RKE-02` processing envelope

**Opening Unit Checkpoint — `RU-RKE-02`** → **Unit Work — `RU-RKE-02`** → **Closing Unit Checkpoint — `RU-RKE-02`**.

#### `RU-RKE-03` processing envelope

**Opening Unit Checkpoint — `RU-RKE-03`** → **Unit Work — `RU-RKE-03`** → **Closing Unit Checkpoint — `RU-RKE-03`**.

<a id="ru-rke-01"></a>
## `RU-RKE-01` — Entry Identity And Ownership

**Result Responsibility.** What independently useful subject this Entry record denotes, which Bank owns the record and whether it remains a preferred current record.

**Applicability / Omission.** Required for new Entry formation and material identity/currentness questions. May be source-derived for routine refinement when identity/owner are already unambiguous.

**Inputs / Sources.** Subject/material, plausible existing Entries, provenance, Bank scope, [Entry Identity / Duplication](../lenses/LENS-RK-ENTRY-IDENTITY-AND-DUPLICATION.md#lens-rk-entry-identity-and-duplication) when ambiguity exists.

**Resolution Method.** Prefer reuse of a correct existing Entry. Create a new record only when independent durable identity is useful. Choose the smallest correct owning Bank. If the same record remains semantically correct, refine it in place; if it should no longer be preferred, create/reuse current record(s), keep the old ref resolvable and retire the old Entry when authorized/useful.

**Result Content.** Entry ID/name, owning Bank context, subject boundary, status and optional successor refs when retired.

**Validators.** One durable record denotes one useful subject boundary; Bank ownership is correct; retirement does not imply statement migration or successor equivalence.

<a id="ru-rke-02"></a>
## `RU-RKE-02` — Entry Representation

**Result Responsibility.** The durable representation needed to locate/understand the Entry subject without mixing interpretation into intrinsic Entry state.

**Applicability / Omission.** Substantive resolution is material when locator/artifact/provenance/intrinsic factual description adds reusable value. If it is not material, keep `RU-RKE-02` declared with a concise omission disposition; do not manufacture representation detail merely because the Unit exists.

**Inputs / Sources.** Material locators/artifacts, known origin/provenance, intrinsic factual properties and representation constraints.

**Resolution Method.** Keep locator separate from identity. Retain only factual intrinsic description/provenance useful to the Entry. Store durable access constraints when material, not momentary runtime availability. Interpretation/inference/comparison goes to Analysis instead of Entry Body.

**Result Content.** Locator/artifact refs, known provenance/origin, intrinsic factual description/metadata and material durable access constraints.

**Validators.** Locator is not mistaken for identity; intrinsic facts are not mixed with unsupported interpretation; no structured field is retained merely because it could exist.

<a id="ru-rke-03"></a>
## `RU-RKE-03` — Semantic Decomposition

**Result Responsibility.** A useful disposition of additional independently useful subjects discovered while resolving the Entry.

**Applicability / Omission.** Include only when the current material contains meaningful internal/related subject structure whose separate identity could improve reuse/search/classification/relations/analysis. When deeper decomposition has no current value, keep this Unit declared with a concise omission disposition instead of substantive decomposition work.

**Inputs / Sources.** Current Entry/material, [Entry Semantic Decomposition Guidance](../guidance/ENTRY-SEMANTIC-DECOMPOSITION-GUIDANCE.md#entry-semantic-decomposition-guidance), applicable installed Domain Pack guidance and relevant existing Entries.

**Resolution Method.** Test discovered candidates for independent durable usefulness. Reuse/create separate Entries only when warranted. Decomposition does not automatically create hierarchy or Relations. Route discovered classification/relation/analysis meaning to its natural ordinary operation instead of embedding it into the current Entry.

**Result Content.** Reused/new Entry candidates and/or routing of discovered meaning to Tag Assignment, Relation, Analysis, intrinsic Entry fact or no durable retention.

**Validators.** Do not split merely because something is nameable; do not silently retire the current Entry from inside decomposition; do not create automatic parent/child edges.

## Adjacent Ordinary Operations

These operations are intentionally **not** module-defined Entry Units by default:

```text
Tag Assignment
Entry Relation creation/refinement
Analysis creation/refinement
small owner-clear Entry fact / locator correction
```

They may occur during Entry work when useful. If one exposes a bounded independently useful responsibility not covered by the module, apply ordinary Core routing (Contextual Unit / Target Formation) rather than expanding the Entry module pre-emptively.

## Lens Profile

- [Entry Identity / Duplication](../lenses/LENS-RK-ENTRY-IDENTITY-AND-DUPLICATION.md#lens-rk-entry-identity-and-duplication) when identity/currentness is ambiguous;
- [Tag Quality / Taxonomy](../lenses/LENS-RK-TAG-QUALITY-AND-TAXONOMY.md#lens-rk-tag-quality-and-taxonomy) only when an accompanying vocabulary/classification question independently warrants it;
- applicable installed Domain Pack / registered Lens guidance when independently applicable.

## Handoff

Entry result becomes available to ordinary classification/relation/analysis work, Landscape Analysis and consumer profiles. Bank presence does not make the Entry or its artifact authoritative Source for another Target.

## Revalidation

Reopen only affected Entry Unit(s) when subject identity/owner, represented artifact/provenance or independently useful decomposition materially changes.

## Artifact / File Contract

One Entry record must remain addressable in its owning Bank. Separate bank-owned Tag Assignments, Relations and Analyses may use any representation allowed by the Bank implementation and are not forced into the Entry file.

```text
ARTIFACT_PROPOSAL
ID: AP-RK-ENTRY-01
CONTENT_KIND: durable Entry record
WHEN: Entry creation/material refinement/retirement is accepted
GUIDANCE: PROFILE_REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: Entry
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <owning-bank-entry-representation>
CONTENT: Entry identity/owner/currentness plus material locator/provenance/intrinsic factual representation; optional successor refs when retired
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```
