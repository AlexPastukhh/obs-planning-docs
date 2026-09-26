<a id="reference-knowledge-profile-bootstrap"></a>
# Reference Knowledge Profile — IDTSPE

Responsibility ID: `RK.PROFILE-BOOTSTRAP`

Status: active profile

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Installed Profile Discovery](../PROFILE-REGISTRY.md#idtspe-profile-discovery) — `IDTSPE.PROFILE-DISCOVERY`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Reference Knowledge Object Model](models/REFERENCE-KNOWLEDGE-OBJECT-MODEL.md#reference-knowledge-object-model) — `RK.OBJECT-MODEL`
> - `CONTEXTUALIZES` [Bank Principles](models/BANK-PRINCIPLES.md#bank-principles) — `RK.BANK-PRINCIPLES`
> - `CONTEXTUALIZES` [Vocabulary Model](models/VOCABULARY-MODEL.md#vocabulary-model) — `RK.VOCABULARY-MODEL`
> - `CONTEXTUALIZES` [Bank Change Authority](profile-contracts/BANK-CHANGE-AUTHORITY.md#bank-change-authority) — `RK.BANK-CHANGE-AUTHORITY`
> - `CONTEXTUALIZES` [Reference Knowledge Representation Model](representation/REFERENCE-KNOWLEDGE-REPRESENTATION-MODEL.md#reference-knowledge-representation-model) — `RK.REPRESENTATION-MODEL`
> - `CONTEXTUALIZES` [Consumer / Source Integration](integration/CONSUMER-SOURCE-INTEGRATION.md#consumer-source-integration) — `RK.CONSUMER-SOURCE-INTEGRATION`

## Purpose

Reference Knowledge is an IDTSPE profile for maintaining reusable Banks, Entries and Vocabularies and for researching accumulated reference knowledge at Entry and Landscape scale.

The methodology is separate from concrete storage. The base profile assumes one Reference Knowledge installation/registry; cross-installation federation is not modeled until a real use case requires it.

## Profile Areas

```text
models/
  profile-wide semantic models and stable invariants

guidance/
  reusable methods/policies used by Targets, operations or Lenses

target-modules/
  recurring Target / Target Step-Result families

lenses/
  reusable evaluation perspectives

domain-packs/
  optional Domain Pack extension model plus concrete packs only after derivation

integration/
  consumer/profile integration contracts

templates/
  canonical representation templates; semantic models remain authoritative

examples/
  non-authoritative demonstrations and acceptance fixtures
```

## Profile Bootstrap

This profile assumes the primary Documentation / IDTSPE bootstrap is already current.

### Required orientation spine

Read in order when the profile context is cold or unreliable:

1. this `README.md`;
2. [Responsibility Map](RESPONSIBILITY-MAP.md) — profile-local responsibility routing;
3. [Reference Knowledge Object Model](models/REFERENCE-KNOWLEDGE-OBJECT-MODEL.md#reference-knowledge-object-model) — profile-wide object vocabulary;
4. [Target Module Registry](registries/TARGET-MODULE-REGISTRY.md#reference-knowledge-target-module-registry);
5. [Lens Registry](registries/LENS-REGISTRY.md#reference-knowledge-lens-registry).

### Conditional deep reads

- Bank invariants or change → [Bank Principles](models/BANK-PRINCIPLES.md#bank-principles) and, when changing a Bank, [Bank Change Authority](profile-contracts/BANK-CHANGE-AUTHORITY.md#bank-change-authority);
- Vocabulary meaning or change → [Vocabulary Model](models/VOCABULARY-MODEL.md#vocabulary-model);
- representation or artifact placement → [Reference Knowledge Representation Model](representation/REFERENCE-KNOWLEDGE-REPRESENTATION-MODEL.md#reference-knowledge-representation-model) and [Artifact Placement Map](representation/ARTIFACT-PLACEMENT-MAP.md#reference-knowledge-artifact-placement-map) as applicable;
- Domain Pack derivation or selection → [Domain Pack Model And Derivation Guidance](domain-packs/DOMAIN-PACK-MODEL-AND-DERIVATION-GUIDANCE.md#domain-pack-model-and-derivation-guidance) and [Domain Pack Registry](registries/DOMAIN-PACK-REGISTRY.md#reference-knowledge-domain-pack-registry);
- consumer/source integration → [Consumer / Source Integration](integration/CONSUMER-SOURCE-INTEGRATION.md#consumer-source-integration);
- selected Target Module, Lens or example → its applicable registry-routed owner.

No concrete Domain Packs are currently installed. Reuse current reliable profile orientation. Reading this profile does not create or select a Target, execute a Target Module or Lens, or mutate the repository.

## Core Shape

```text
REFERENCE KNOWLEDGE
│
├─ Banks
│  ├─ Entries
│  ├─ Tag Assignments
│  ├─ Entry Relations
│  ├─ Analysis Records
│  └─ Landscape Snapshots
│
├─ Vocabulary Packages
│  ├─ Tag definitions
│  └─ Relation Type definitions
│
└─ Domain Packs [when derived]
   └─ reusable domain-specific Knowledge Basis
```

Browse/search/filter/query are capabilities over this knowledge graph, not additional durable object kinds.

## Banks Are Ownership Boundaries

Banks divide ownership/reuse/lifecycle, not visual/music/game/application/design domains. One installation may contain several Banks. Bank visibility is explicit and non-transitive; it does not grant write authority.

## Entry Is The Central Subject Result

[Entry](target-modules/TM-RK-10-ENTRY.md#tm-rk-10-entry) owns the recurring Target family for one durable reference subject. Its module-defined Units are intentionally small:

```text
Entry Identity And Ownership
Entry Representation
Semantic Decomposition — Unit always present; substantive resolution only when material
```

Tag Assignment, Entry Relation and Analysis remain separate semantic records but are ordinary bank operations by default rather than candidate Units on every Entry Target. This keeps simple Entry creation cheap while preserving deeper work when it is useful.

## Entry Identity Uses Retirement + Successors

There are no merge/split primitives and no automatic dependent-statement migration.

```text
same subject remains valid
→ refine current Entry

additional independently useful subject
→ create/reuse another Entry

old record should no longer be preferred
→ RETIRE old Entry when authorized/useful
→ optional Successors refs
```

Rules live in [Reference Knowledge Object Model](models/REFERENCE-KNOWLEDGE-OBJECT-MODEL.md#entry-retirement-and-successors).

## Vocabulary

Vocabulary Packages own Tag and Relation Type definitions. Banks record only registered Packages they consume. Vocabulary Evolution has two responsibilities: accepted definition change and proportional affected-knowledge review. It does not silently redefine stable IDs or automatically rewrite old statements.

## Landscape Analysis

Landscape Analysis is adaptive evidence-grounded research across a selected corpus. It may investigate comparison, chronology, possible lineage, branching, combinations, distribution, influence, constraints or other useful questions, but no fixed checklist is required. Chronology, similarity, lineage and causality remain distinct claims.

## Domain Packs

A Domain Pack is optional domain-specific Knowledge Basis for Entry resolution and Landscape inquiry. Concrete packs are derived from real subject/research needs rather than cloned from a mandatory file skeleton or reversed from production Target Modules.

No concrete Domain Packs are currently installed; generic Entry and Landscape work remains valid without them.

## Consumer Boundary

Reference Knowledge records describe reusable subjects and accumulated knowledge. A consumer Target decides whether an Entry/Analysis/artifact qualifies as its Source. Bank presence does not grant downstream authority automatically.

## Target Modules

- [Bank Formation](target-modules/TM-RK-05-BANK-FORMATION.md#tm-rk-05-bank-formation)
- [Entry](target-modules/TM-RK-10-ENTRY.md#tm-rk-10-entry)
- [Vocabulary Evolution](target-modules/TM-RK-20-VOCABULARY-EVOLUTION.md#tm-rk-20-vocabulary-evolution)
- [Landscape Analysis](target-modules/TM-RK-50-LANDSCAPE-ANALYSIS.md#tm-rk-50-landscape-analysis)
