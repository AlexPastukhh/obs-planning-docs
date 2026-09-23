<a id="visual-material-preparation-operation"></a>
# Visual Material Preparation Operation

Responsibility ID: `VISUAL2D.MATERIAL-PREPARATION`

Status: active profile Operation
Primary consumers: current visual Target/Unit, Source-Coverage Lens routing, TM-2D-15 when a reusable set Target exists

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Visual Material / Source Usage](../source-contracts/VISUAL-MATERIAL-AND-SOURCE-USAGE.md#visual-material-and-source-usage) — `VISUAL2D.MATERIAL-SOURCE-USAGE`

## Responsibility

Perform a bounded reusable action that makes visual material practically usable without owning an independently useful Use-Case Result, Target family, Unit analysis result or retained material registry lifecycle.

Typical actions include:

- acquire or capture a material/source;
- crop or isolate a relevant region;
- annotate;
- measure;
- normalize scale/orientation/color-space or other practical representation;
- extract palette/shape/value/metadata or another bounded observation aid;
- convert format;
- create a helper/proxy/render/derived view when its provenance remains explicit.

## Inputs / Outputs

```text
current Unit need / material-preparation request
+ source/material locator or upstream artifact
+ bounded transformation intent
→ prepared derivative / measurement / annotation / helper output
+ provenance / derivation relation needed to interpret it
```

The Operation does not decide consumer-specific Source authority, completeness or requiredness. After execution, the affected Unit re-evaluates coverage/meaning through its normal Lens/Target work.

## Guards

- preserve the original Source Subject and prepared derivative as distinguishable identities;
- mark derived/synthetic/helper material as such;
- do not invent missing authoritative meaning merely because a helper can visualize it;
- do not persist transient material unless the current owner/representation decision gives retention value;
- do not instantiate TM-2D-15 unless a Prepared Visual Material Set has independent Target value.

## Ownership / Retention

If another Target already owns the source artifact, reference that producer owner rather than copying semantic authority. Project-level retained material identity/provenance may use [Visual Material Storage And Registry](../representation/VISUAL-MATERIAL-STORAGE-AND-REGISTRY.md#shared-visual-material-storage-and-registry).

Target-specific interpretation of the prepared material stays with the current Target/Unit. Use [Target-local Material Analysis Representation Guidance](../representation/VISUAL-TARGET-LOCAL-MATERIAL-ANALYSIS.representation-guidance.md#visual-target-local-material-analysis-representation-guidance) when retained analysis needs a concrete representation.
