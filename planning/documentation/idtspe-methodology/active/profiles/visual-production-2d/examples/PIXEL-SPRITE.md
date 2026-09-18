<a id="example-pixel-sprite"></a>
# Example — 32×32 Character Sprite From Concept Art

Concept art strongly covers identity/costume/color but not pixel abstraction.

## Pixel Construction — Candidate Unit Selection

### [Pixel Abstraction](../target-modules/TM-2D-31-PIXEL-ART-CONSTRUCTION.md#ru-px-01) (`RU-PX-01`)

AI recommendation: **INCLUDE**

Situation / goal: translate high-resolution concept identity into a readable 32×32 native-pixel result.

Relevant reference / Source coverage: **missing for target-grid abstraction** — concept art shows the character but does not define which forms/details survive at 32×32.

Reason: target-grid abstraction remains an independent construction responsibility.

USER selection: **INCLUDE**.

### [Silhouette And Major Clusters](../target-modules/TM-2D-31-PIXEL-ART-CONSTRUCTION.md#ru-px-02) (`RU-PX-02`)

AI recommendation: **INCLUDE**

Situation / goal: character must read clearly at native scale.

Relevant reference / Source coverage: **strong for high-resolution proportions/identity, partial for 32×32 silhouette decisions**.

Reason: actual target-grid mass/silhouette result still must be resolved.

USER selection: **INCLUDE**.

### [Color And Value Cluster System](../target-modules/TM-2D-31-PIXEL-ART-CONSTRUCTION.md#ru-px-03) (`RU-PX-03`)

AI recommendation: **INCLUDE — LIGHT/SOURCE-GUIDED**

Situation / goal: preserve character palette identity while reducing it to readable pixel clusters.

Relevant reference / Source coverage: **strong for color direction, partial for pixel-cluster/value grouping**.

Reason: explicit current pixel palette/cluster result remains needed, but much of its direction is source-derived.

USER selection: **INCLUDE**.

### [Internal Form Clusters](../target-modules/TM-2D-31-PIXEL-ART-CONSTRUCTION.md#ru-px-04) (`RU-PX-04`)

AI recommendation: **INCLUDE**

Situation / goal: costume/pose identity must remain readable inside the silhouette.

Relevant reference / Source coverage: **strong for visible front form, potentially missing/partial for occluded or unseen articulation**.

Reason: target-grid internal form still needs construction; missing information may trigger Material Preparation rather than invention.

USER selection: **INCLUDE**.

### [Edge Detail And Pixel Finish](../target-modules/TM-2D-31-PIXEL-ART-CONSTRUCTION.md#ru-px-05) (`RU-PX-05`)

AI recommendation: **INCLUDE**

Situation / goal: final native-pixel edge behavior and selective detail affect readability at 1×.

Relevant reference / Source coverage: high-resolution concept does not directly specify pixel-edge treatment.

Reason: pixel-specific edge/detail cleanup remains an independent final construction responsibility.

USER selection: **INCLUDE**.

Review at 1× may reveal a missing side/rear form Source need, which re-enters Visual Material Preparation rather than granting the concept art authority over unseen form.
