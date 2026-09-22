<a id="shared-unit-selection-and-lens-checkpoints"></a>
# Unit Disposition / Materiality Review And Lens Checkpoints

Responsibility ID: `VISUAL2D.UNIT-DISPOSITION-LENS-CHECKPOINTS`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Unit Applicability / Disposition](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition) — `TWU.APPLICABILITY-DISPOSITION`
> - `CONTEXTUALIZES` [Lens Meta-Model](../../../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) — `LENS.META-MODEL`

## Module-defined Unit Disposition / Materiality Review

When a Target Module is formed, its complete Module-defined Unit inventory is instantiated/addressable in the concrete Target. Evaluate **every Unit** against the current situation and responsibility-specific visual Source/reference coverage to decide how much substantive Unit Resolution is justified; do not decide whether the Unit exists.

```text
complete Module-defined Unit inventory
→ Unit Need / Visual Source Coverage
→ AI recommendation + rationale for every Unit
→ normal Proposal/Decision authority only when the disposition itself is a material unresolved choice
→ Unit result disposition / work depth
→ substantive Unit Resolution only where material
```

Typical work-depth recommendations are ordinary guidance, not a second Core status enum:

```text
substantive resolution
light / source-derived resolution
omit substantive resolution
OPEN — materiality/disposition unresolved
```

For an already-current Target, retain the current Unit instances/dispositions. Re-evaluate only where Target scope, Source coverage, Evidence or other material pressure changes.

## Required Omission Record

An omission disposition is incomplete unless the Unit remains individually addressable and the Target result states:

```text
<Unit semantic name> (<RU-ID>)

Situation / goal:
  <what makes substantive work unnecessary>

Relevant reference / Source coverage:
  <which accepted Sources cover the responsibility and how>
  OR
  none / not relevant — <why Source coverage is not the reason>

Omission reason:
  <why no independently useful unresolved result responsibility remains>

Disposition authority/state:
  <current accepted meaning / Proposal-Decision ref when a material choice exists / OPEN>
```

Do not collapse several omitted Units into one aggregate omission trace. Do not perform substantive Unit Resolution merely to fill the heading, and do not use a bare `N/A`.

## Material / Thin Units

Strong Source/reference coverage may support light/source-derived Unit Resolution when explicit Unit ownership, handoff, validation or revalidation remains useful. Strong coverage is not an automatic omission rule.

## Unit Checkpoint Lens Passes

Every material Unit uses the Core Opening / In-Unit / Closing envelope declared by its Target Module. At Opening and Closing, treat [Unit Need / Visual Source Coverage](../lenses/frequent/LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE.md#lens-visual-unit-need-and-source-coverage) as a primary profile Lens candidate whenever Unit materiality/depth or relevant visual Source/reference coverage may have changed.

Other Core/profile Lenses remain registry-selected by their own gates.

## Revalidation

```text
Finding / Evidence / Target-scope change
→ Unit Need / Visual Source Coverage
→ AI recommendation + rationale
→ Proposal/Decision only when a material unresolved choice actually exists
→ updated Unit disposition / resolution depth
```

A Module-defined Unit never disappears from the formed Target merely because its substantive resolution changes. This route also applies when proposing a new **Contextual Unit**, whose existence still follows the Core contextual-formation gate.
