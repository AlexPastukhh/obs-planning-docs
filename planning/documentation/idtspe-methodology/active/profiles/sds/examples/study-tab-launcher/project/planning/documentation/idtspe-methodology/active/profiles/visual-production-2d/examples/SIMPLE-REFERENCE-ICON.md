<a id="example-simple-reference-icon"></a>
# Example — Reference Recreation With One Change

Request: recreate an existing 64×64 icon, preserve shape/layout/style, change one semantic region from red to blue.

## Whole Visual Design — Unit Disposition / Materiality Review

### [Content And Subject Configuration](../target-modules/TM-2D-20-WHOLE-VISUAL-DESIGN.md#ru-wvd-01) (`RU-WVD-01`)

AI recommendation: **OMIT SUBSTANTIVE RESOLUTION**

Situation / goal: the requested change affects only one existing color region; depicted content is explicitly preserved.

Relevant reference / Source coverage: **strong** — the accepted source icon directly fixes the depicted content/subject configuration.

Omission reason: no new content/subject configuration remains to resolve; retaining a separate runtime Unit would not add review, handoff or revalidation value for this Target.

Materiality disposition: **OMITTED**.

### [Composition And Attention Structure](../target-modules/TM-2D-20-WHOLE-VISUAL-DESIGN.md#ru-wvd-02) (`RU-WVD-02`)

AI recommendation: **OMIT SUBSTANTIVE RESOLUTION**

Situation / goal: framing/layout are explicitly preserved.

Relevant reference / Source coverage: **strong** — the accepted icon directly fixes composition and framing at the target size.

Omission reason: no composition decision remains unresolved and no separate composition result is needed downstream.

Materiality disposition: **OMITTED**.

### [Global Visual Language](../target-modules/TM-2D-20-WHOLE-VISUAL-DESIGN.md#ru-wvd-03) (`RU-WVD-03`)

AI recommendation: **OMIT SUBSTANTIVE RESOLUTION**

Situation / goal: preserve the existing icon style while changing only red→blue.

Relevant reference / Source coverage: **strong** — the accepted icon directly supplies shape language, edge treatment and general appearance; the requested color substitution is handled downstream in construction.

Omission reason: no new design-level visual-language direction needs to be selected; inherited look remains a Source/preserve constraint.

Materiality disposition: **OMITTED**.

All three Whole Visual Design Module-defined Units remain instantiated/addressable in the Target result with `OMITTED` dispositions; none receives substantive Unit Resolution.

## Vector Construction — Unit Disposition / Materiality Review

### [Semantic Part Structure](../target-modules/TM-2D-31-VECTOR-CONSTRUCTION.md#ru-vec-01) (`RU-VEC-01`)

AI recommendation: **LIGHT RESOLUTION**

Situation / goal: one semantic color region must remain locally editable.

Relevant reference / Source coverage: visual boundaries are strongly covered, but the editable semantic grouping does not exist yet.

Reason: explicit part ownership is useful for the requested local revision.

Materiality disposition: **MATERIAL**.

### [Major Geometry And Silhouettes](../target-modules/TM-2D-31-VECTOR-CONSTRUCTION.md#ru-vec-02) (`RU-VEC-02`)

AI recommendation: **LIGHT / SOURCE-DERIVED RESOLUTION**

Situation / goal: the icon must be reconstructed as editable vector geometry.

Relevant reference / Source coverage: **strong** for visible silhouette/major geometry.

Reason: actual vector geometry still must exist as current construction result even though its shape can be derived almost directly from the source.

Materiality disposition: **MATERIAL**.

### [Internal Geometry And Overlaps](../target-modules/TM-2D-31-VECTOR-CONSTRUCTION.md#ru-vec-03) (`RU-VEC-03`)

AI recommendation: **OMIT SUBSTANTIVE RESOLUTION**

Situation / goal: the supplied icon contains no independently meaningful internal overlap structure beyond the major semantic regions.

Relevant reference / Source coverage: **strong** for all visible internal boundaries relevant to this recreation.

Omission reason: no unresolved internal geometry/overlap responsibility remains outside the selected major geometry and semantic-part Units.

Materiality disposition: **OMITTED**.

### [Fill Stroke And Appearance](../target-modules/TM-2D-31-VECTOR-CONSTRUCTION.md#ru-vec-04) (`RU-VEC-04`)

AI recommendation: **SUBSTANTIVE RESOLUTION**

Situation / goal: this is where the selected red→blue change is actually realized.

Relevant reference / Source coverage: **strong** for inherited appearance; the requested new blue value is a selected change.

Reason: actual editable appearance must be produced and reviewed.

Materiality disposition: **MATERIAL**.

### [Effects Clipping And Secondary Structure](../target-modules/TM-2D-31-VECTOR-CONSTRUCTION.md#ru-vec-05) (`RU-VEC-05`)

AI recommendation: **OMIT SUBSTANTIVE RESOLUTION**

Situation / goal: faithful recreation needs no material mask/clip/effect or secondary editable structure.

Relevant reference / Source coverage: **strong** — the accepted icon shows no effect structure requiring separate reconstruction.

Omission reason: the selected vector result can be fully represented by the other construction Units; this responsibility has no independent current result to own.

Materiality disposition: **OMITTED**.

All five vector Module-defined Units remain in the Target result. `RU-VEC-01`, `RU-VEC-02` and `RU-VEC-04` receive substantive/light resolution; `RU-VEC-03` and `RU-VEC-05` remain visible with `OMITTED` dispositions and the reasons above.
