# Target Work Responsibility Map

Status: active routing projection

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `DOC.RESPONSIBILITY-MAP`
> Owner: [Responsibility Map](../../../../../principles-and-terminology.md#doc-responsibility-map)

This map owns routing only. Destination files own the semantic bodies.

| Responsibility | Canonical owner | Boundary / notes |
|---|---|---|
| Target Work Unit definition / Responsibility / Purpose / Result Content Contract | [`UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-unit-contract) — `TWU.UNIT-CONTRACT` | Owns Unit contract semantics; does not own Target Module family design or external lifecycles |
| Collection qualification / Collection Definition / Item Contract ownership | [`UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-collection-contract) — `TWU.COLLECTION-CONTRACT` | Genuine repeated result-contract family semantics inside one Unit |
| Unit Resolution Slot definition / scope / simple-composite semantics | [`UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-slot-contract) — `TWU.SLOT-CONTRACT` | Slot contract only; reference serialization is separate |
| Runtime Unit Resolution Set projection | [`UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-runtime-projection) — `TWU.RUNTIME-PROJECTION` | Runtime projection of formal Slot Definitions; not an authoring owner |
| Unit applicability / materiality / disposition | [`UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition) — `TWU.APPLICABILITY-DISPOSITION` | Presence/disposition semantics |
| Unit applicability envelope / opening-in-unit-closing checkpoints | [`UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-envelope) — `TWU.APPLICABILITY-ENVELOPE` | Proportional applicability checkpoint envelope |
| Natural Target Work subject / ownership routing | [`UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-natural-subject-ownership) — `TWU.NATURAL-SUBJECT-ROUTING` | Selects the natural work owner; does not serialize its reference |
| Target Step Result | [`UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-target-step-result) — `TWU.TARGET-STEP-RESULT` | Target-step result semantics, not Target Module family semantics |
| Canonical Target Work subject identity/reference grammar | [`TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md`](TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md#target-work-subject-reference) — `TWU.SUBJECT-REFERENCE` | Owns Unit/Collection/item/Slot reference composition after the natural subject has been selected |
| Generic Resolution Slot / generic Resolution Set coordination primitive | [`RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md`](RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md#resolution-slot-generic-contract) — `RESOLUTION-SLOT.GENERIC-CONTRACT` | Generic workflow/value-resolution coordination; Unit Resolution Slot remains owned by `TWU.SLOT-CONTRACT` |
| Target Resolution Requirement origin/coverage and prepared/Core/contextual coverage formation | [`RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md`](RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md#target-formation-requirement-coverage) — `TARGET-FORMATION.REQUIREMENT-COVERAGE` | Owns Target Formation/coverage semantics; generic Resolution Slot semantics in the same file remain separate |
| Required reusable-target-model check | [`RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md`](RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md#target-formation-reusable-model-check) — `TARGET-FORMATION.REUSABLE-MODEL-CHECK` | Decides whether reusable Target Module discovery must be checked before local-only formation |
| Target Instance composition, Local Target Contract placement, Source State/binding relation and Target Relation semantics | [`TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md`](TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md#target-instance-source-relation-contract) — `TARGET.INSTANCE-SOURCE-RELATION` | Consumes Target Module and Target Work reference contracts; does not redefine them |
| Candidate Target Instance structure under enclosing Proposal/Branch authority | [`TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md`](TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md#target-candidate-instance) — `TARGET.CANDIDATE-INSTANCE` | Candidate status/authority remains owned by Proposal/Branch lifecycle; Target structure stays Target-owned |
| Dynamic Target Formation explanatory projection | [`projections/DYNAMIC-TARGET-FORMATION.explanatory-projection.md`](projections/DYNAMIC-TARGET-FORMATION.explanatory-projection.md) | Projection only; semantic authority remains with the owners above |

For Target Module Meta-Model/discovery responsibilities, continue through [`../../target-modules/RESPONSIBILITY-MAP.md`](../../target-modules/RESPONSIBILITY-MAP.md).
