# Reference Knowledge Responsibility Map

Status: active routing projection

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `DOC.RESPONSIBILITY-MAP`
> Owner: [Responsibility Map](../../../../principles-and-terminology.md#doc-responsibility-map)

This map routes Reference Knowledge profile responsibilities. It owns routing only. Reusable Bank/Entry/Vocabulary/Landscape meaning does not replace a consumer's Core Source/Evidence authority.

| Responsibility | Canonical owner | Boundary / notes |
|---|---|---|
| Reference Knowledge scope/bootstrap/read set | [`README.md`](README.md#reference-knowledge-profile-bootstrap) — `RK.PROFILE-BOOTSTRAP` | Profile navigation only; reading/activating the profile does not create a Bank/Entry Target |
| Recurring Reference Knowledge Target Module discovery | [`registries/TARGET-MODULE-REGISTRY.md`](registries/TARGET-MODULE-REGISTRY.md#reference-knowledge-target-module-registry) — `RK.TARGET-MODULE-DISCOVERY` | Registry routing only; selected module owns its Target/result family |
| Reference Knowledge Lens discovery | [`registries/LENS-REGISTRY.md`](registries/LENS-REGISTRY.md#reference-knowledge-lens-registry) — `RK.LENS-DISCOVERY` | Registry routing only; selected Lens owns its evaluation contract |
| Installed Domain Pack discovery | [`registries/DOMAIN-PACK-REGISTRY.md`](registries/DOMAIN-PACK-REGISTRY.md#reference-knowledge-domain-pack-registry) — `RK.DOMAIN-PACK-DISCOVERY` | Registers only actually derived packs; derivation semantics stay with the Domain Pack model |
| Bank ownership/visibility/vocabulary principles | [`models/BANK-PRINCIPLES.md`](models/BANK-PRINCIPLES.md#bank-principles) — `RK.BANK-PRINCIPLES` | Defines Bank-level ownership boundaries; physical storage remains representation-specific |
| Reference Knowledge semantic object model | [`models/REFERENCE-KNOWLEDGE-OBJECT-MODEL.md`](models/REFERENCE-KNOWLEDGE-OBJECT-MODEL.md#reference-knowledge-object-model) — `RK.OBJECT-MODEL` | Canonical Bank/Entry/Analysis/Landscape object semantics |
| Vocabulary Package / Tag / Relation Type / assignment/relation semantics | [`models/VOCABULARY-MODEL.md`](models/VOCABULARY-MODEL.md#vocabulary-model) — `RK.VOCABULARY-MODEL` | Reusable vocabulary meaning; bank-owned statements remain distinct from definitions |
| Bank write/change authority | [`profile-contracts/BANK-CHANGE-AUTHORITY.md`](profile-contracts/BANK-CHANGE-AUTHORITY.md#bank-change-authority) — `RK.BANK-CHANGE-AUTHORITY` | Governs who may mutate Bank-owned meaning; discovery/visibility alone grants no write authority |
| Domain Pack model/derivation/registration gate | [`domain-packs/DOMAIN-PACK-MODEL-AND-DERIVATION-GUIDANCE.md`](domain-packs/DOMAIN-PACK-MODEL-AND-DERIVATION-GUIDANCE.md#domain-pack-model-and-derivation-guidance) — `RK.DOMAIN-PACK-MODEL` | Domain-specific reusable analysis package, not an automatic Target/Lens namespace |
| Landscape research/evolution reusable Knowledge Basis | [`knowledge-bases/LANDSCAPE-RESEARCH-AND-EVOLUTION.md`](knowledge-bases/LANDSCAPE-RESEARCH-AND-EVOLUTION.md#landscape-research-and-evolution-guidance) — `RK.LANDSCAPE-RESEARCH` | Reusable research method; retained Landscape Snapshot semantics remain object-model owned |
| Consumer binding of Reference Knowledge material into Core Source authority | [`integration/CONSUMER-SOURCE-INTEGRATION.md`](integration/CONSUMER-SOURCE-INTEGRATION.md#consumer-source-integration) — `RK.CONSUMER-SOURCE-INTEGRATION` | Bank visibility/analysis does not automatically grant consumer-side Source authority |
| Semantic identity ↔ representation/storage model | [`representation/REFERENCE-KNOWLEDGE-REPRESENTATION-MODEL.md`](representation/REFERENCE-KNOWLEDGE-REPRESENTATION-MODEL.md#reference-knowledge-representation-model) — `RK.REPRESENTATION-MODEL` | Representation identity rules only; storage paths/rows do not create semantic identity |
| Reference Knowledge artifact placement | [`representation/ARTIFACT-PLACEMENT-MAP.md`](representation/ARTIFACT-PLACEMENT-MAP.md#reference-knowledge-artifact-placement-map) — `RK.ARTIFACT-PLACEMENT` | Extends Core artifact placement; not one file per semantic statement |
| Entry semantic decomposition supporting guidance | [`target-module-support/entry/RU-RKE-03-ENTRY-SEMANTIC-DECOMPOSITION.unit-guidance.md`](target-module-support/entry/RU-RKE-03-ENTRY-SEMANTIC-DECOMPOSITION.unit-guidance.md#rk-entry-semantic-decomposition-guidance) — `RK.ENTRY-DECOMPOSITION-GUIDANCE` | Supporting guidance for Entry resolution; Entry module/object model remain canonical owners |
| Concrete Reference Knowledge recurring Target/result family | selected `target-modules/TM-RK-*.md`, identified by its `Module ID` | Each concrete module `EXTENDS TARGET-MODULE.META-MODEL` |
| Concrete Reference Knowledge evaluation perspective | selected `lenses/LENS-RK-*.md`, identified by its `Lens ID` | Each concrete Lens `EXTENDS LENS.META-MODEL` |

Templates/examples/index READMEs are supporting projections. They do not create a second Bank/Entry/Vocabulary/Landscape ontology.
