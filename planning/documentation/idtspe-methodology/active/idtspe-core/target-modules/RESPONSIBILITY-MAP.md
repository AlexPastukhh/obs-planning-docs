# Target Module Responsibility Map

Status: active routing projection

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `DOC.RESPONSIBILITY-MAP`
> Owner: [Responsibility Map](../../../../principles-and-terminology.md#doc-responsibility-map)

This map owns routing only. Destination files own the semantic bodies.

| Responsibility | Canonical owner | Boundary / notes |
|---|---|---|
| Target Module Meta-Model, Target Module Model/Instance semantics, complete Module-defined Unit inventory, target-family-specific composition/validators/handoff | [`TARGET-MODULE-MODEL.md`](TARGET-MODULE-MODEL.md#target-module-meta-model) | Module-specific semantics only; Unit internals conform to Target Work owners |
| Generic Core Target Module discovery / installed family routing | [`TARGET-MODULE-REGISTRY.md`](TARGET-MODULE-REGISTRY.md#target-module-discovery-registry) | Registry routes candidates/family registries; it does not redefine Unit or Target Formation contracts |
| Requirement-recognition → prepared Unit-coverage explanation retained for historical filename compatibility | [`TARGET-MODULE-STEP-RESULT-AND-QUESTION-SET-RULE.md`](TARGET-MODULE-STEP-RESULT-AND-QUESTION-SET-RULE.md) | Supporting contextual projection; base semantics are owned by Target Formation, Target Module Meta-Model and Target Work Unit contracts |
| Bounded Planning Resolution State with Active Planning and Tracked Decision Collections | [`TM-PLANNING-RESOLUTION-STATE.md`](TM-PLANNING-RESOLUTION-STATE.md#tm-planning-resolution-state) | Coordination/result shape only; candidate/selection and Q/R/P lifecycle stay with Resolution owners |
| Concrete recurring Target-family production contract | selected concrete `TM-*` file | Concrete Model owns only its specialized family contract and local extensions |

Neighboring owners:

- Target Formation / requirement coverage: [`../runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md`](../runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md#target-formation-requirement-coverage)
- Target Work Unit/Collection/Slot semantics: [`../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-unit-contract)
- Target Work subject reference grammar: [`../runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md`](../runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md#target-work-subject-reference)
