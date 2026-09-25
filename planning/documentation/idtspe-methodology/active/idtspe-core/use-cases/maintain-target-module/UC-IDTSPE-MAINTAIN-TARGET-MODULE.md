# UC-IDTSPE-MAINTAIN-TARGET-MODULE — Create / Review / Integrate Target Module

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Decision record retention](../../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-decision-retention) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`.
> - `CONTEXTUALIZES` [PRS Decision admission / exit](../../target-modules/TM-PLANNING-RESOLUTION-STATE.md#ru-prs-02--tracked-decisions) — `RESOLUTION.CARRY-FORWARD`.

Status: active methodology Use Case proposal

<a id="uc-idtspe-maintain-target-module"></a>
Responsibility ID: `IDTSPE.UC.MAINTAIN-TARGET-MODULE`
Purpose: establish or change one reusable Target Module and integrate it into generic IDTSPE without creating competing semantic authority.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Target Module Meta-Model`](../../target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) — `TARGET-MODULE.META-MODEL`
> - `CONTEXTUALIZES` [`Target Formation requirement/coverage`](../../runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md#target-formation-requirement-coverage) — `TARGET-FORMATION.REQUIREMENT-COVERAGE`
> - `CONTEXTUALIZES` [`Required Reusable Target Model Check`](../../runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md#target-formation-reusable-model-check) — `TARGET-FORMATION.REUSABLE-MODEL-CHECK`
> - `CONTEXTUALIZES` [`Target Work Unit contract`](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-unit-contract) — `TWU.UNIT-CONTRACT`
> - `CONTEXTUALIZES` [`Collection contract`](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-collection-contract) — `TWU.COLLECTION-CONTRACT`
> - `CONTEXTUALIZES` [`Unit Resolution Slot contract`](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-slot-contract) — `TWU.SLOT-CONTRACT`
> - `CONTEXTUALIZES` [`Unit runtime projection`](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-runtime-projection) — `TWU.RUNTIME-PROJECTION`
> - `CONTEXTUALIZES` [`Unit applicability / materiality / disposition`](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition) — `TWU.APPLICABILITY-DISPOSITION`
> - `CONTEXTUALIZES` [`Natural Subject / Ownership Boundary`](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-natural-subject-ownership) — `TWU.NATURAL-SUBJECT-ROUTING`
> - `CONTEXTUALIZES` [`Unit Applicability Envelope`](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-envelope) — `TWU.APPLICABILITY-ENVELOPE`
> - `CONTEXTUALIZES` [`Target Step Result`](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-target-step-result) — `TWU.TARGET-STEP-RESULT`

This Use Case owns the **maintenance/orchestration process** for one reusable Target Module. The linked owners above remain authoritative for Target Formation, Unit/Collection/Slot/runtime and Target Step Result semantics.

---

## Situation

Use when:

```text
a recurring Target class has no reusable contract
an existing UC/workflow/template family should become IDTSPE-addressable
a Target Module is incomplete/stale/overlapping
several modules need composition/entry-point reconciliation
```

---

## Inputs

Read proportionally:

```text
existing Use Cases
workflows
principles/models
templates
examples
commands
current IDTSPE models
actual repeated planning cases
consistency findings
```

Do not create a new module solely because a file/category exists.

---

## Full IDTSPE For The Module Itself

Creating a module is itself ordinary IDTSPE planning.

```text
Target:
  reusable Target Module contract

Recurring scope / responsibility analysis:
  what recurring bounded Target family the module recognizes
  which scope/problem signals make reuse plausible
  which recurring requirement patterns should be checked against the concrete task/Sources

Module coverage design:
  which Module-defined Unit Definitions cover those recurring responsibilities
  which questions/guidance/Lenses/validators help resolve each Unit
  how Unit results compose the Target Step Result

Material choices use ordinary Core Decision semantics; any separate record follows the linked retention contract and keeps its natural Subject/integration references. There is no special Target-Scope / Question-Set / Answer Decision taxonomy.
```

Material alternatives may use Planning Branches.

---

## Process

```text
1. establish the recurring useful Target Step Result / Target family
2. inspect repeated real cases and existing semantic owners / reuse candidates
3. derive the recurring bounded scope/problem pattern the module should recognize; do not turn the module into the semantic source of concrete task Requirements
4. define single Entry Point plus recognition/applicability signals for REUSABLE_TARGET_MODEL_CHECK
5. analyze recurring cases to identify requirement patterns that should be checked against the concrete task/scope/Sources
6. map recurring grounded requirement patterns to the bounded Module-defined Unit responsibilities owned by the Target Module Meta-Model; one Unit may cover several Requirements and one Requirement may need several Units/other owners
7. define each Module Unit only for a distinct bounded Unit responsibility and conform every Unit Definition to `TWU.UNIT-CONTRACT`; do not create a second local Unit/Collection/Slot schema in this Use Case
8. validate Collection qualification, Item Contract/addressability, simple/composite classification, formal Slot Definitions and runtime Unit Resolution Set projection through the canonical Target Work Unit owners; this maintenance process supplies only Target-family-specific Unit presets/deltas
9. place prepared questions/drivers, Proposal aids, helpful Lenses, validators and Source needs on the smallest natural Unit/Slot/other owner rather than centralizing them in the module or inventing a standalone Target Question Set
10. define Module-specific Opening / Closing applicability guidance by applying `TWU.APPLICABILITY-ENVELOPE`; keep In-Unit applicability checks available whenever material
11. verify the Target Module Instance exposes the complete Module-defined Unit inventory and that runtime Unit visibility/disposition follows the canonical Unit applicability contract without forcing substantive work on non-material Units
12. verify that a useful module may cover only part of a concrete Target and that canonical Target Formation/Core/contextual completion can cover the remainder without modifying the reusable module ad hoc
13. verify the module's Target Step Result family/composition constraints integrate through `TWU.TARGET-STEP-RESULT` rather than redefining generic Target Step Result runtime composition
14. keep only genuinely cross-Unit Resolution / Production Method at module level; move Unit-specific guidance into Unit Definitions
15. define Source Contract archetypes; runtime Sources remain concrete accepted Source Subjects/bindings
16. identify reusable theory/reference knowledge and place/reference it at Target Module, Unit Definition, Unit Resolution Slot or Lens level according to its real consumer
17. keep useful references/provenance and add consumer-specific interpretation when raw theory is too broad
18. define a visible `Lens Attachments` block on every Module-defined Unit: always show `Core Lens Pack: INHERITED`; add predictable relationships on the smallest natural Unit as REQUIRED + mandatory checkpoint phase(s) or TRIGGERED with no copied condition logic; use rare Target-wide attachment only for a genuinely Target-wide Analysis Surface; rely on registry discovery for unexpected/context-emergent Lens needs
19. define recurring Q/R/P discovery hints only when target-specific
20. define material selection surfaces; use ordinary Core Decision semantics and apply the linked retention contract to any separate record
21. define semantic output/projection schema and Target Step Result composition when useful
22. define Internal Object Contracts / supporting module composition
23. for every proposed Supporting Target Module, prove it can also be a coherent standalone recurring Target family; otherwise keep the meaning inside the natural Unit's Result Content Contract / Internal Object Contract / shared Unit method
24. define validators against Unit responsibilities/boundaries and requirement coverage patterns
25. define downstream Unit/output → Source handoff
26. define revalidation prompts, including when scope/Source change should rerun REUSABLE_TARGET_MODEL_CHECK
27. define representation guidance / current Artifact contract
28. map current repository UCs/workflows/templates/commands
29. create at least one worked acceptance example showing concrete grounded Requirements mapped to prepared Module Units plus contextual completion when coverage is incomplete
30. run module consistency/readiness review
```
---

## Result

```text
one Target Module owner
+ catalog entry
+ stable Entry Point
+ integration map
+ Target Step-Result family / Module-defined Unit inventory and Target-family-specific Unit deltas conforming to the canonical Target Work owners
+ stable per-Unit methodology-owner binding points
+ Module-specific applicability/checkpoint guidance conforming to the canonical Unit applicability envelope
+ Unit-local Lens Attachments / rare Target-wide Lens Attachments with no duplicated Lens trigger logic
+ complete Module-defined Unit inventory/composition contract without duplicated generic Unit/Collection/Slot/runtime semantics
+ Resolution / Production Method
+ output schema/projection when useful
+ validators
+ provenance mapping
+ command/Tampermonkey readiness route
```

If reuse already covers the need:

```text
no new module
→ integrate/reuse existing one
```

---

## Boundaries

Do not:

```text
rename every existing Use Case mechanically
create a module for every template section
turn patterns into mandatory architecture
create a new Target Module because a reusable Lens is missing — create/promote a Lens instead
confuse reusable theory/Knowledge Basis with current Target Sources or copy reusable Lens evaluation knowledge into the module
force a one-off useful Target into a reusable module — keep a Local Target Contract until repetition justifies promotion
treat module output template as semantic authority
copy foreign-owner meaning into a Unit merely because the Module is a convenient aggregation point
let a Module-defined Unit silently disappear from an actually formed Target result
create one user command for every internal submodule
force supporting modules into separate Target Instances
create peer Units from homogeneous collection items governed by one Unit contract
create Slots from ordinary result fields/questions/items without terminal formal contract pressure
create nested Unit Resolution Slots / subslots instead of promoting a newly independent responsibility to a Unit
```

---

## Integration Into IDTSPE

A module contributes reusable coverage through semantic integration points rather than the removed fixed `TF-*` Target Formation fields:

```text
REUSABLE_TARGET_MODEL_CHECK
  recurring Target-family / scope recognition

Target formation / resolution
  reusable scope-boundary guidance
  recurring requirement-pattern recognition
  Source Contract archetypes

Module-defined Unit Definitions
  prepared bounded work coverage
  Target-family-specific presets/deltas on canonical `TWU.UNIT-CONTRACT` Unit Definitions
  Unit/Slot questions, Proposal aids, helpful Lenses and validators on natural subjects
  result destinations

Target Module Knowledge Basis
  via shared Knowledge Basis Contract when useful

Unit-local Lens Attachments / rare Target-wide Lens Attachments / Proposal aids / Branch triggers
  ordinary reusable/runtime mechanisms on natural subjects

Output Projection / Target Step Result composition
Validator pack
Downstream Source adapter / Handoff guidance
Representation guidance
```

The concrete task/scope/Sources remain the semantic source of actual task Requirements; the module provides reusable recognition and coverage.

---

## Command / Tampermonkey Handoff

After module semantics are accepted and methodology-integrated:

```text
Target Module Entry Point
→ REQUIRED canonical user-level command surface
→ repository command/helper projection during repository integration
→ optional additional focused shortcuts only when independently useful
```

The repository implementation may reuse/extend an existing command rather than create a new file. The invariant is user-level reachability, not one-new-file-per-module.

Conditional modules still receive canonical commands; their gate may surface “Target not justified” as Target Formation input. Target Formation then resolves reuse/handoff to an existing owner or the appropriate methodology next step rather than letting the command route a semantic owner itself.

The UI should invoke useful module/target intents, not expose every internal helper/Lens. See `idtspe-command-surface-contract.md`.

---

## Revalidation

Revisit a Target Module when:

```text
real planning repeatedly needs questions/sources not represented
module output fails to hand off cleanly
modules overlap semantic responsibility
new generic IDTSPE mechanisms supersede module-local mechanisms
current repo workflow/template diverges from module contract
commands route around the semantic entry point
```

## Artifact Placement Integration

Creation/maintenance must add/update structured `ARTIFACT_PROPOSAL` records in the Target Module source. If the installed profile maintains an Artifact Materialization tree/projection, refresh that profile projection (for current SDS: `active/profiles/sds/representation/ARTIFACT-PLACEMENT-MAP.md`). The projection must cite/group source record IDs rather than invent placement rules; IDTSPE Core does not hard-code one universal profile registry path.
