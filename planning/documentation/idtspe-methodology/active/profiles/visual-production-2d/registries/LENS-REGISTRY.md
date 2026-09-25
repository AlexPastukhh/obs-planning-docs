<a id="registry-2d-lenses"></a>
# 2D Visual Lens Registry

Responsibility ID: `VISUAL2D.LENS-DISCOVERY`

Registry selection is lightweight routing metadata; selection does not execute a Lens, force a Finding or create Unit attachment.

The Core Lens Registry is the normal universal entry point. When Visual Production 2D is active, this registry adds profile-owned candidates. Inherited/generic Core Lens remain available and are not replaced.

| Lens | Stable ID | Discovery / applicability summary |
|---|---|---|
| [Unit Need / Visual Source Coverage](../lenses/frequent/LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE.md#lens-visual-unit-need-and-source-coverage) | `LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE` | Module-defined Unit materiality/depth evaluation; Unit Opening/Closing when Unit need or visual Source coverage may have changed |
| [Whole Visual Coherence](../lenses/frequent/LENS-WHOLE-VISUAL-COHERENCE.md#lens-whole-visual-coherence) | `LENS-WHOLE-VISUAL-COHERENCE` | Whole Visual Design; construction whole-candidate review |
| [Construction Fidelity / Consistency](../lenses/frequent/LENS-CONSTRUCTION-FIDELITY-CONSISTENCY.md#lens-construction-fidelity-consistency) | `LENS-CONSTRUCTION-FIDELITY-CONSISTENCY` | construction-route Units and construction review |
| [Representation / Editability Economy](../lenses/reusable/LENS-REPRESENTATION-EDITABILITY-ECONOMY.md#lens-representation-editability-economy) | `LENS-REPRESENTATION-EDITABILITY-ECONOMY` | construction route selection, structured source architecture, local-revision pressure | Profile checkpoint routing is owned by [Unit Selection And Lens Checkpoints](../runtime/UNIT-DISPOSITION-AND-LENS-CHECKPOINTS.md#shared-unit-selection-and-lens-checkpoints).

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Lens Meta-Model](../../../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) — `LENS.META-MODEL`

