# SDS Methodology Registry Directory

Status: active SDS profile routing directory  
Role: supporting registry router used from an applicable IDTSPE Use-Case Process; **not a Use Case, workflow engine or semantic owner**

Generic directory: [`../../../idtspe-core/shared/methodology-registry-directory.md`](../../../idtspe-core/shared/methodology-registry-directory.md).

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
| [`../target-modules/README.md`](../target-modules/README.md) | recurring SDS Target-result methods | a bounded reusable Target method may be useful | scan Target Module applicability summaries; open only plausible module bodies | work concern, active Target or profile meaning changes materially |
| [`../lenses/README.md`](../lenses/README.md) | SDS evaluation perspectives | current material may benefit from a profile-specific analysis/check/refinement/challenge | scan Lens applicability summaries; open selected Lens body and confirm local gate | Analysis Surface, Decisions/Evidence or Target/profile changes materially |
| [`programming-principles/README.md`](programming-principles/README.md) | 22 reusable engineering-principle knowledge groups | implementation/design/evolution trade-offs may depend on general programming principles | scan compact triggers; open only matched `RG-PRG-*` detail entries | selected row's recheck condition becomes true |
| [`directed-methodology-workflow-and-next-step-resolution.md`](directed-methodology-workflow-and-next-step-resolution.md) | SDS semantic composition/readiness relationships | several SDS owners/capabilities interact and the semantic direction or handoff is unclear | consult only the relevant section; do not treat it as a runtime step script | owner topology or accepted upstream/downstream meaning changes |
| [`semantic-family-authority-and-provenance-contract.md`](semantic-family-authority-and-provenance-contract.md) | methodology family/natural-owner authority vs local provenance | an SDS object/Requirement/error family is being formed/classified from local discovery | keep reusable family authority separate from concrete meaning/provenance | family/owner/provenance interpretation changes |
| [`requirement-ownership-and-exception-rule.md`](requirement-ownership-and-exception-rule.md) | natural Requirement ownership and temporal hosting | durable `BR/SR/IR/PFR` meaning may be created, moved, changed or retired | resolve natural owner and current-vs-future host | requirement owner/boundary changes |
| [`current-owner-evolution-impact-projection-contract.md`](current-owner-evolution-impact-projection-contract.md) | reusable current-owner reverse Evolution Impact projection semantics | a realized Feature/Scenario/Screen/Domain/Slice/Shared owner is materially affected by a concrete unrealized Step | apply shared inclusion/depth/no-copy rules, then the concrete owner TM local materiality test | Step planning position/impact/realization changes |
| [`requirement-classification-and-representation-contract.md`](requirement-classification-and-representation-contract.md) | reusable optional Requirement Type + QRPE/table representation semantics | an addressable SDS Requirement collection is formed/reviewed/represented | use Type only when materially useful; use the applicable owner schema without changing ownership | reusable Type/schema semantics change |
| [`reusable-guidance-model.md`](reusable-guidance-model.md) | `RG/RR/RRC` authority/consumption semantics | reusable SDS knowledge may influence local work | apply reusable-guidance/no-live-inheritance rules | reusable guidance or local owner selection changes |
| [`../ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) | SDS representation/placement guidance | accepted SDS meaning may persist materially | combine with Core representation Lens/P-14 | representation need/owner changes |
| [`../examples/`](../examples/) | explanatory examples | a concrete illustration would materially reduce ambiguity | read only the example relevant to the current component/problem | not normally rechecked unless example semantics changed |

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
