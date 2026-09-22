<a id="shared-construction-review-loop-checkpoint"></a>
<a id="shared-construction-review-loop"></a>
# Construction Review Loop Checkpoint

Responsibility ID: `VISUAL2D.CONSTRUCTION-REVIEW-LOOP`

Use after a meaningful whole construction candidate exists.

## Inputs

- current editable source;
- current construction Unit results;
- accepted Visual Requirements;
- accepted Whole Visual Design when applicable;
- relevant Source bindings/materials;
- previews at intended scale/context;
- applicable Lenses/validators.

## Review

```text
meaningful whole candidate
→ inspect the whole result
→ apply applicable Lenses/validators
→ identify the smallest semantic cause of material defects
→ route re-entry
```

Typical re-entry destinations:

```text
same construction Unit
earlier selected construction Unit
Unit Need / Visual Source Coverage → Visual Material Preparation Operation when needed → affected Unit continuation
Whole Visual Design
Visual Requirements
construction route selection
Delivery Adaptation
```

If review changes a Module-defined Unit's materiality/depth, route the change through [Unit Disposition / Materiality Review And Lens Checkpoints](../../runtime/UNIT-DISPOSITION-AND-LENS-CHECKPOINTS.md#shared-unit-selection-and-lens-checkpoints).

If review materially challenges the active construction route, route the change through [Construction Route Selection](CONSTRUCTION-ROUTE-SELECTION.target-module-guidance.md#shared-construction-route-selection).

## Candidate Artifact Use

A rejected/superseded construction candidate may still be retained as visual material, Evidence or comparison material when that use is valuable. Persistence/placement is resolved through the active representation owner rather than by this checkpoint.

## Boundary

This is a Target-Module checkpoint used by construction modules. It does not own a separate construction Process or material-preparation Target. When review reveals missing visual information, route through the Source-Coverage Lens; invoke the preparation Operation only for bounded acquisition/transformation, then continue the affected Unit.
