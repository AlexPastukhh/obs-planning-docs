<a id="tm-2d-50-delivery-adaptation"></a>
# TM-2D-50-DELIVERY-ADAPTATION — Visually Material Output Adaptation

Entry Point: `tm.2d.delivery-adaptation`
Supported Roles: PRIMARY, SUPPORTING
Status: active profile module

## Purpose

Own visual decisions needed to adapt an accepted visual result across materially different delivery contexts. Mechanical export alone does not justify this Target.

## Target Step Result

`Delivery Adaptation`. Generic Unit existence/disposition semantics follow the Core [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md); this module owns only the visual Unit responsibilities/materiality below.

## Module-defined Unit Inventory

| Unit | Name | Bounded result responsibility |
|---|---|---|
| `RU-DEL-01` | [Delivery Context Map](#ru-del-01) | material output contexts/aspect ratios/sizes/locales/surfaces that impose distinct visual needs |
| `RU-DEL-02` | [Adaptation Rules And Must-holds](#ru-del-02) | what may change vs must remain invariant across delivery contexts |
| `RU-DEL-03` | [Accepted Delivery Variant Set](#ru-del-03) | actual accepted visually adapted variants/family when adaptation itself contains design meaning |


## Source Contract

Typical Sources: accepted canonical construction result, [Visual Requirements](TM-2D-10-VISUAL-REQUIREMENTS.md#tm-2d-10-visual-requirements), platform/storefront/output constraints, typography/localization Sources and accepted adaptation constraints.

## Unit Checkpoint Map

- [Delivery Context Map](#ru-del-01): **Opening Unit Checkpoint — `RU-DEL-01`** → **Unit Work — `RU-DEL-01`** → **Closing Unit Checkpoint — `RU-DEL-01`**
- [Adaptation Rules And Must-holds](#ru-del-02): **Opening Unit Checkpoint — `RU-DEL-02`** → **Unit Work — `RU-DEL-02`** → **Closing Unit Checkpoint — `RU-DEL-02`**
- [Accepted Delivery Variant Set](#ru-del-03): **Opening Unit Checkpoint — `RU-DEL-03`** → **Unit Work — `RU-DEL-03`** → **Closing Unit Checkpoint — `RU-DEL-03`**


## Formation / Scope Guard

Do not form this Target for simple format conversion, rasterization or export when no visual decision is required.

## Preferred Workflow / Dependency Direction

```text
RU-DEL-01 → RU-DEL-02 → RU-DEL-03
```


## Unit-specific Guidance

<a id="ru-del-01"></a>
### Delivery Context Map

`RU-DEL-01`

Model only contexts that materially change visual adaptation; do not inflate equivalent export sizes into separate semantics.
<a id="ru-del-02"></a>
### Adaptation Rules And Must-holds

`RU-DEL-02`

Own crop/safe-area/hierarchy/simplification/localization invariants and allowed changes when they require design judgment.
<a id="ru-del-03"></a>
### Accepted Delivery Variant Set

`RU-DEL-03`

Own the accepted visually adapted family. Pure deterministic export artifacts may remain implementation/output products without a separate Unit.

## Lens Profile

Use the shared Unit Need / Source Coverage Lens for Unit materiality/depth and context-specific visual Sources. Whole Visual Coherence may be useful across materially different crops/variants.

## Validators

variants preserve declared must-holds; context-specific changes are intentional; mechanical export is not mislabeled as design; accepted variants trace back to canonical construction/source authority.

## Handoff

Accepted variants go to platform/storefront/runtime consumers. The canonical construction source remains upstream authority unless adaptation explicitly owns a derived visual family.

## Revalidation

Reopen when delivery contexts/constraints change or construction/source changes invalidate crop/simplification/localization decisions.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-2D-DEL-01
CONTENT_KIND: accepted delivery adaptation result
WHEN: material visual adaptation must survive for delivery/reuse
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target using this module
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <delivery-variant-owner>
CONTENT: accepted Target Step Result / implementation-native result owned by this Target, with references to authoritative upstream owners/Sources rather than copied authority
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

## References

- [Core Target Module Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-MODEL.md)
- [Core Unit And Target Step Result Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md)
