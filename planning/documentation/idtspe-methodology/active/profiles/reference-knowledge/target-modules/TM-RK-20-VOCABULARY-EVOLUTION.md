<a id="tm-rk-20-vocabulary-evolution"></a>
# Vocabulary Evolution

Module ID: `TM-RK-20-VOCABULARY-EVOLUTION`
Status: active profile module
Entry Point: `rk.vocabulary-evolve`
Supported Roles: `PRIMARY`

## Purpose

Change reusable Tag / Relation Type meaning inside one Vocabulary Package without silently redefining stable identities or forcing automatic rewrites of bank-owned statements.

## Activation / Scope Gate

Use when accepted reusable vocabulary meaning itself must change: create/refine/deprecate Tag or Relation Type definitions, taxonomy/inverse semantics or successor pointers. Do not form this Target for one ordinary Tag Assignment / Entry Relation using already accepted definitions.

## Source Contract

Typical Sources: selected Vocabulary Package, current definitions, relevant assignments/relations, corpus examples, Landscape use, owner authority and evidence for the proposed semantic change.

## Knowledge Basis

[Vocabulary Model](../models/VOCABULARY-MODEL.md#vocabulary-model), [Bank Principles](../models/BANK-PRINCIPLES.md#bank-principles), [Tag Quality / Taxonomy](../lenses/LENS-RK-TAG-QUALITY-AND-TAXONOMY.md#lens-rk-tag-quality-and-taxonomy) when Tag quality/taxonomy is material.

## Target Step Result

Accepted Vocabulary Package definition change plus only the material consequence/revalidation understanding needed for existing knowledge.

## Module-defined Unit Inventory

| ID | Unit | Bounded result responsibility |
|---|---|---|
| `RU-RKV-01` | [Definition Change](#ru-rkv-01) | resolve accepted Tag and/or Relation Type definition changes in the selected Package |
| `RU-RKV-02` | [Affected Knowledge Review](#ru-rkv-02) | identify material consequences for existing statements/Landscape results without implied migration |

## Module-defined Unit Visibility

Generic Unit existence/disposition semantics follow the Core [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md). This module owns only the Reference-Knowledge Unit responsibilities, local materiality/omission reasoning and specialized guidance below; Contextual Units remain governed by Core formation semantics.

## Unit Checkpoint Map

Every material Unit follows the inherited Core applicability/materiality envelope. A clear USER request or already-current accepted scope may satisfy obvious applicability/selection without extra profile-specific ceremony.

#### `RU-RKV-01` processing envelope

**Opening Unit Checkpoint — `RU-RKV-01`** → **Unit Work — `RU-RKV-01`** → **Closing Unit Checkpoint — `RU-RKV-01`**.

#### `RU-RKV-02` processing envelope

**Opening Unit Checkpoint — `RU-RKV-02`** → **Unit Work — `RU-RKV-02`** → **Closing Unit Checkpoint — `RU-RKV-02`**.

<a id="ru-rkv-01"></a>
## `RU-RKV-01` — Definition Change

**Result Responsibility.** Accepted canonical vocabulary-definition meaning for the selected Package.

**Applicability / Omission.** Required for a Vocabulary Evolution Target. Tag-only or Relation-Type-only work simply leaves the other definition kind untouched; no empty peer Unit is created.

**Inputs / Sources.** Current Package/definitions, corpus examples, intended reusable distinction/relationship, Package evolution authority, relevant Lens findings.

**Resolution Method.** Reuse an existing definition when meaning already fits. Preserve stable ID only when existing statements retain the same semantic meaning. For materially different meaning, create/reuse current definition(s), deprecate obsolete definition when useful and optionally add successor refs. Durable definitions never move between Packages.

**Result Content.** Accepted Tag/Relation Type definition changes, including status/aliases/parents/inverse/body/successors only where applicable.

**Validators.** Package authority is satisfied; stable IDs are not silently redefined; Tag Parents and Relation Type Inverse stay same-Package; cross-Package successor does not grant consumption/access automatically.

<a id="ru-rkv-02"></a>
## `RU-RKV-02` — Affected Knowledge Review

**Result Responsibility.** Proportional understanding of what existing knowledge, queries or retained Landscape results materially need attention because of `RU-RKV-01`.

**Applicability / Omission.** When the accepted definition change has no material downstream consequence beyond future use, keep this Unit declared with a concise omission disposition. Include only to the depth justified by affected knowledge.

**Inputs / Sources.** Accepted definition change, visible affected Assignments/Relations, retained Landscape results, current Bank ownership/authority.

**Resolution Method.** Identify materially affected knowledge and classify each consequence as no action, ordinary owner-clear refinement/reclassification, revalidation, or separate bounded work. Never treat deprecation/successors as automatic statement migration. Preserve historical Landscape interpretability; retain exact query/membership/taxonomy context only when later reproduction/comparison is materially required.

**Result Content.** Material affected-knowledge findings, explicit no-action where useful, and routed follow-up work/revalidation signals.

**Validators.** Statement ownership is respected; no bulk rewrite is implied by vocabulary evolution; historical meaning is not rewritten merely to match current vocabulary.

## Lens Profile

- [Tag Quality / Taxonomy](../lenses/LENS-RK-TAG-QUALITY-AND-TAXONOMY.md#lens-rk-tag-quality-and-taxonomy) for material Tag definition/taxonomy quality questions;
- [Landscape Evidence Adequacy](../lenses/LENS-RK-LANDSCAPE-EVIDENCE-ADEQUACY.md#lens-rk-landscape-evidence-adequacy) when a vocabulary change materially affects Landscape interpretation/comparison.

## Handoff

Accepted current definitions are available for future ordinary Assignments/Relations. Existing statements remain as originally asserted until their owning Bank separately changes them.

## Revalidation

Reopen when new corpus use reveals definition ambiguity/duplication, or when material affected knowledge was previously unavailable.

## Artifact / File Contract

Accepted definitions persist in the selected Vocabulary Package. Consequence review may remain embedded in current Target work unless separately durable owner work is useful.

```text
ARTIFACT_PROPOSAL
ID: AP-RK-VOCAB-01
CONTENT_KIND: Vocabulary Package definition change
WHEN: canonical Tag / Relation Type change is accepted
GUIDANCE: PROFILE_REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: selected Vocabulary Package / affected definition
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <selected-vocabulary-representation>
CONTENT: accepted definition changes plus only material consequence/revalidation routing; no automatic statement rewrite
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```
