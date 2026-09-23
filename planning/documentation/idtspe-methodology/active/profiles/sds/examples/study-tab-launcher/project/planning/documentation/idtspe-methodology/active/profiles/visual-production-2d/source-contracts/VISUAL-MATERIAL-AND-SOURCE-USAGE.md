<a id="shared-visual-material-and-source-usage"></a>
<a id="visual-material-and-source-usage"></a>
# Visual Material And Source Usage

Responsibility ID: `VISUAL2D.MATERIAL-SOURCE-USAGE`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Target / Source Relation](../../../idtspe-core/runtime/target-work/TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md#target-instance-source-relation-contract) — `TARGET.INSTANCE-SOURCE-RELATION`

## Visual Material

A visual material is an external/project/upstream-produced artifact that may provide information needed by a 2D visual responsibility.

Useful material roles include, when applicable:

- identity;
- form/proportion;
- pose/gesture;
- composition/framing;
- camera/perspective;
- environment/context;
- style/medium;
- value/color;
- lighting;
- material/surface;
- typography/layout;
- construction/detail;
- delivery/output context.

These roles describe what the material can inform; they do not create a separate reference ontology.

## Registry Qualification

A retained material record may own intrinsic information such as:

- material identity/locator;
- origin/provenance;
- observed vs derived vs synthetic status;
- derivation lineage;
- what the material directly shows;
- intrinsic limitations/conflicts;
- owner-backed project approval/canonical facts when those facts genuinely belong to the material owner.

Per-consumer role, authority, requiredness, freshness and revalidation remain on the consuming Core Source binding.

## Upstream-produced Material

If another Target already owns the artifact, keep that artifact at its producer owner and reference it from the material registry/consumer as needed.

An upstream Target/Unit result becomes a downstream Source only when the downstream consumer binds it as a Source for a concrete responsibility.

## Synthetic / Derived Helpers

Record enough provenance to distinguish:

```text
observed/project material
derived transform
synthetic helper
temporary proxy
```

Do not infer unseen form, identity, style or other authoritative meaning from a synthetic helper when stronger Sources are required.
