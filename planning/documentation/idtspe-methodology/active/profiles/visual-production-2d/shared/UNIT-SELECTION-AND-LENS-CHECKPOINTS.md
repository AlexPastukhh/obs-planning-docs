<a id="shared-unit-selection-and-lens-checkpoints"></a>
# Unit Selection And Lens Checkpoints

## Candidate Unit Selection

When a Target Module is first formed, evaluate **every module-defined candidate Unit heading** against the current situation and relevant visual Source/reference coverage before projecting runtime Work Units.

```text
Candidate Unit Inventory
→ Unit Need / Visual Source Coverage
→ AI recommendation + explicit rationale for every candidate heading
→ USER selection when not already current
→ runtime Target Work Unit projection
```

The initial Candidate Unit Selection must therefore preserve a reviewable entry for every candidate Unit in the active Target Module. Do not silently skip a heading because it appears optional or well-covered by references.

For an already-current Target, retain the previous entries. Re-ask only where material revalidation pressure changes the recommendation/selection; do not erase previously selected omissions merely because the runtime Unit is absent.

## Required Omission Record

An AI recommendation to omit a Unit is incomplete unless the proposal/selection representation contains:

```text
<Unit semantic name> (<RU-ID>)

AI recommendation: OMIT

Situation / goal:
  <what is true in this Target that makes the responsibility potentially unnecessary>

Relevant reference / Source coverage:
  <which accepted Sources cover the responsibility and how>
  OR
  none / not relevant — <why Source coverage is not the reason>

Omission reason:
  <why no independently useful unresolved result responsibility remains
   after considering the situation + Source coverage>

USER selection:
  OMIT | INCLUDE | OPEN
```

The `Omission reason` must be specific to that Unit and Target. Do not use generic explanations such as `not needed`, `optional`, `covered`, or `irrelevant` without saying **what covers it or what situation makes it unnecessary**.

Do not collapse several omitted Units into one aggregate omission trace. Keep each omitted Unit name individually addressable with its own rationale.

The selected omission remains in Candidate Unit Selection. Do not instantiate an `N/A` runtime Work Unit.

## Included / Thin Units

For an included candidate, instantiate it only to the depth its responsibility requires.

Strong Source/reference coverage may lead to:

```text
INCLUDE
+ light/source-derived Unit Resolution
```

when explicit Unit ownership, handoff, validation or revalidation remains useful.

Strong coverage is therefore **not** an automatic omission rule.

## Unit Checkpoint Lens Passes

Every selected/material Unit uses the Core Opening / In-Unit / Closing envelope declared by its Target Module.

At Opening and Closing, treat [Unit Need / Visual Source Coverage](../lenses/frequent/LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE.md#lens-visual-unit-need-and-source-coverage) as a primary profile Lens candidate whenever:

- Unit need may have changed;
- relevant visual Source/reference coverage may have changed;
- missing information has appeared;
- another candidate Unit may now be useful;
- current responsibility may need deeper analysis or decomposition.

Other Core/profile Lenses remain registry-selected by their own gates.

## Revalidation

When review/Evidence suggests a changed Unit composition:

```text
Finding / Evidence
→ Unit Need / Visual Source Coverage
→ AI recommendation + explicit situation/coverage rationale
→ USER selection
→ updated runtime Unit projection
```

If a previously omitted Unit becomes useful, retain the old omission selection as prior planning state when it has review value and record the new recommendation/selection normally.

This route also applies when proposing a new Contextual Unit from visual work.
