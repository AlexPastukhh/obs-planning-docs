<a id="tm-rk-05-bank-formation"></a>
# Bank Formation

Module ID: `TM-RK-05-BANK-FORMATION`  
Status: active profile module  
Entry Point: `rk.bank-form`  
Supported Roles: `PRIMARY`

## Purpose

Create or materially reconfigure one durable Bank ownership boundary.

## Activation / Scope Gate

Use when a Bank itself needs independent identity/scope or its visibility/vocabulary/write policy changes materially. Do not form this Target for ordinary record creation inside an already defined Bank.

## Source Contract

Typical Sources: intended ownership/reuse scope, current Bank Registry, existing Bank definition when refining, repository/installation policy, available Banks and registered Vocabulary Packages.

## Knowledge Basis

[Bank Principles](../models/BANK-PRINCIPLES.md#bank-principles), [Vocabulary Model](../models/VOCABULARY-MODEL.md#vocabulary-model), [Reference Knowledge Representation](../models/REFERENCE-KNOWLEDGE-REPRESENTATION-MODEL.md#reference-knowledge-representation-model).

## Target Step Result

One usable Bank definition/configuration registered for Reference Knowledge work.

## Module-defined Unit Inventory

| ID | Unit | Bounded result responsibility |
|---|---|---|
| `RU-RKB-01` | [Bank Identity And Scope](#ru-rkb-01) | establish Bank identity and owned reusable-knowledge boundary |
| `RU-RKB-02` | [Access And Ownership Policy](#ru-rkb-02) | resolve visible Banks, consumed Vocabulary Packages and material local mutation policy |

## Module-defined Unit Visibility

Generic Unit existence/disposition semantics follow the Core [Unit / Target Step Result Model](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md). This module owns only the Reference-Knowledge Unit responsibilities, local materiality/omission reasoning and specialized guidance below; Contextual Units remain governed by Core formation semantics.

## Unit Checkpoint Map

Every material Unit follows the inherited Core applicability/materiality envelope. A clear USER request or already-current accepted scope may satisfy obvious applicability/selection without extra profile-specific ceremony.

#### `RU-RKB-01` processing envelope

**Opening Unit Checkpoint — `RU-RKB-01`** → **Unit Work — `RU-RKB-01`** → **Closing Unit Checkpoint — `RU-RKB-01`**.

#### `RU-RKB-02` processing envelope

**Opening Unit Checkpoint — `RU-RKB-02`** → **Unit Work — `RU-RKB-02`** → **Closing Unit Checkpoint — `RU-RKB-02`**.

<a id="ru-rkb-01"></a>
## `RU-RKB-01` — Bank Identity And Scope

**Result Responsibility.** Stable Bank identity plus the boundary of reusable knowledge it owns.

**Applicability / Omission.** Required for a new Bank. For reconfiguration, may remain unchanged when identity/scope are unaffected.

**Inputs / Sources.** Intended reuse/ownership context, current Bank Registry, existing Bank definition.

**Resolution Method.** Identify the durable knowledge owner justified by actual reuse/lifecycle; reject medium/domain-only partitions; choose the smallest ownership scope that genuinely owns the knowledge.

**Result Content.** Bank ID/name, ownership/reuse scope and material boundary notes.

**Validators.** Scope is coherent, not merely a visual/music/game partition, and does not collide with another registered Bank identity.

<a id="ru-rkb-02"></a>
## `RU-RKB-02` — Access And Ownership Policy

**Result Responsibility.** The material access/authority configuration needed for Bank work beyond its basic identity.

**Applicability / Omission.** When installation/repository defaults already provide the needed behavior and no material Bank-specific policy remains, keep this Unit declared with a concise omission disposition or a source-derived minimal result as appropriate.

**Inputs / Sources.** Other registered Banks, registered Vocabulary Packages, repository/system permissions and intended cross-bank reuse.

**Resolution Method.** Select only Banks that should be visible to this Bank and only Vocabulary Packages it actually consumes. Record Bank-specific mutation/cross-bank-statement restrictions only when they differ materially from installation defaults. Visibility is explicit/non-transitive and never grants upstream mutation authority.

**Result Content.** Visible Bank refs, consumed Vocabulary Package refs and material local write/mutation policy when needed.

**Validators.** Referenced Banks/Packages are registered in the current installation; visibility does not imply ownership/write authority; vocabulary consumption does not imply evolution authority.

## Handoff

Accepted Bank becomes an ownership context for Entry work, ordinary Tag/Relation/Analysis operations, Vocabulary consumption and Landscape Analysis.

## Revalidation

Reopen only affected Unit(s) when ownership scope or material Bank-specific access/authority configuration changes.

## Artifact / File Contract

Accepted Bank definition must survive in the Bank's canonical representation. The Bank Registry may retain a discovery row but does not become semantic owner.

```text
ARTIFACT_PROPOSAL
ID: AP-RK-BANK-01
CONTENT_KIND: Bank definition/configuration
WHEN: Bank identity/configuration is accepted
GUIDANCE: PROFILE_REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: Bank
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <bank-registry-and-bank-owner>
CONTENT: Bank identity/scope plus material visibility, Vocabulary consumption and Bank-specific mutation policy
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```
