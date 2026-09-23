<a id="sds-methodology-discovery"></a>
# SDS Methodology Registry Directory

Responsibility ID: `SDS.METHODOLOGY-DISCOVERY`

Status: active SDS profile routing directory
Role: supporting registry router used from an applicable IDTSPE Use-Case Process; **not a Use Case, workflow engine or semantic owner**

Generic directory: [`../../../idtspe-core/navigation/METHODOLOGY-REGISTRY-DIRECTORY.md`](../../../idtspe-core/navigation/METHODOLOGY-REGISTRY-DIRECTORY.md).

> Semantic Owner Dependencies
> - `REPRESENTS` [SDS Target Module Discovery](TARGET-MODULE-REGISTRY.md#sds-target-module-discovery) — `SDS.TARGET-MODULE-DISCOVERY`
> - `REPRESENTS` [SDS Lens Discovery](LENS-REGISTRY.md#sds-lens-discovery) — `SDS.LENS-DISCOVERY`

## Purpose

When the active IDTSPE Use Case needs SDS-specific methodology, scan this compact directory before browsing profile files directly.

```text
active IDTSPE Use Case + current Work Context
→ scan SDS registry families whose trigger is plausible
→ open the relevant registry/guide
→ select concrete entries
→ confirm the selected component's local applicability/materiality gate
→ perform specialized work in that component
```

A scan may select no additional SDS registry. The directory never creates a Target, Lens Finding, Requirement or project decision.

## Directory

| Registry / guide | Responsibility | Check when | Action / drill-down | Recheck when |
|---|---|---|---|---|
| [`../registries/TARGET-MODULE-REGISTRY.md`](TARGET-MODULE-REGISTRY.md) | recurring SDS Target-result methods | a bounded reusable Target method may be useful | scan Target Module applicability summaries; open only plausible module bodies | work concern, active Target or profile meaning changes materially |
| [`../registries/LENS-REGISTRY.md`](LENS-REGISTRY.md) | SDS evaluation perspectives | current material may benefit from a profile-specific analysis/check/refinement/challenge | scan Lens applicability summaries; open selected Lens body and confirm local gate | Analysis Surface, Decisions/Evidence or Target/profile changes materially |
| [`planning/documentation/idtspe-methodology/active/profiles/sds/knowledge-bases/programming-principles/README.md`](../knowledge-bases/programming-principles/README.md) | 22 reusable engineering-principle knowledge groups | implementation/design/evolution trade-offs may depend on general programming principles | scan compact triggers; open only matched `RG-PRG-*` detail entries | selected row's recheck condition becomes true |
| [`planning/documentation/idtspe-methodology/active/profiles/sds/profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md`](../profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md) | SDS semantic composition/readiness relationships | several SDS owners/capabilities interact and the semantic direction or handoff is unclear | consult only the relevant section; do not treat it as a runtime step script | owner topology or accepted upstream/downstream meaning changes |
| [`planning/documentation/idtspe-methodology/active/profiles/sds/profile-contracts/semantic-families/SEMANTIC-FAMILY-AUTHORITY-AND-PROVENANCE.md`](../profile-contracts/semantic-families/SEMANTIC-FAMILY-AUTHORITY-AND-PROVENANCE.md) | methodology family/natural-owner authority vs local provenance | an SDS object/Requirement/error family is being formed/classified from local discovery | keep reusable family authority separate from concrete meaning/provenance | family/owner/provenance interpretation changes |
| [`planning/documentation/idtspe-methodology/active/profiles/sds/profile-contracts/requirements/REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md`](../profile-contracts/requirements/REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md) | natural Requirement ownership and temporal hosting | durable `BR/SR/IR/PFR` meaning may be created, moved, changed or retired | resolve natural owner and current-vs-future host | requirement owner/boundary changes |
| [`planning/documentation/idtspe-methodology/active/profiles/sds/profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md`](../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md) | reusable current-owner reverse Evolution Impact projection semantics | a realized Feature/Scenario/Screen/Domain/Slice/Shared owner is materially affected by a concrete unrealized Step | apply shared inclusion/depth/no-copy rules, then the concrete owner TM local materiality test | Step planning position/impact/realization changes |
| [`planning/documentation/idtspe-methodology/active/profiles/sds/profile-contracts/requirements/REQUIREMENT-CLASSIFICATION-AND-REPRESENTATION.md`](../profile-contracts/requirements/REQUIREMENT-CLASSIFICATION-AND-REPRESENTATION.md) | reusable optional Requirement Type + QRPE/table representation semantics | an addressable SDS Requirement collection is formed/reviewed/represented | use Type only when materially useful; use the applicable owner schema without changing ownership | reusable Type/schema semantics change |
| [`planning/documentation/idtspe-methodology/active/profiles/sds/profile-contracts/reusable-guidance/REUSABLE-GUIDANCE-MODEL.md`](../profile-contracts/reusable-guidance/REUSABLE-GUIDANCE-MODEL.md) | `RG/RR/RRC` authority/consumption semantics | reusable SDS knowledge may influence local work | apply reusable-guidance/no-live-inheritance rules | reusable guidance or local owner selection changes |
| [`../representation/ARTIFACT-PLACEMENT-MAP.md`](../representation/ARTIFACT-PLACEMENT-MAP.md) | SDS representation/placement guidance | accepted SDS meaning may persist materially | combine with Core representation Lens/P-14 | representation need/owner changes |
| [`../examples/`](../examples/README.md) | explanatory examples | a concrete illustration would materially reduce ambiguity | read only the example relevant to the current component/problem | not normally rechecked unless example semantics changed |

## Registry-Scan Boundary

`Check when` is a relevance hint, not automatic execution. The selected Use Case owns methodology composition; this directory only helps discover dependencies. Concrete Target Modules/Lenses/guidance remain responsible for their specialized semantics.

When the current context is already sufficient, valid outcomes include:

```text
NO_ADDITIONAL_SDS_REGISTRY
NO_REUSABLE_TARGET_MODULE
NO_ADDITIONAL_LENS
NO_MATERIAL_PRINCIPLE_ENTRY
```

Do not persist negative scan results as a checklist. Preserve only methodology-usage facts that help continuation, review or revalidation.
