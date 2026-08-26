
# Step-02 Current Consistency Review

Status: active current review

## Canonical Invariants

- Target formation uses `TARGET_FORMATION_RESOLUTION_SET`.
- There is no mandatory fixed real-life-solution Target Type.
- Several material real-life Targets are allowed.
- Target topology relation set uses `FLOW_TO`, not a handoff-authority relation.
- Target relation never grants Source authority.
- Composition Target is optional and appears only when composition itself contains material unresolved choices.
- Mechanical aggregation of accepted outputs is not a new Target.
- Full IDTSPE is run for every material dynamically formed Target.
- `TF-06A LENS_SET` composes required/target-profile/frequent Lenses.
- Step-02 can legitimately conclude that no own Application is needed.
- Application Definition may later refine the real-life route; Step-02 remains lineage.

## High-Level Good Case

```text
Need
↓
two real-life route Targets
↓
each gets Target/Source/Question/Lens/Idea/Decision lifecycle
↓
accepted route A FLOW_TO accepted route B
↓
no new composition choice
↓
both accepted outputs become downstream Sources
```

## High-Level Material Composition Case

```text
Need
↓
accepted route A
accepted route B
↓
two materially different ways to combine them
↓
dynamic composition Target
↓
full IDTSPE
↓
selected composition result
```

## Invalid Patterns

```text
always create one predefined real-life-scenario Target
always create composition Target
treat FLOW_TO as Source authority
skip Target Formation because a phase name sounds specific
let generic phase prose override current Target/Lens owners
```

## Audit Result

This file is a current invariant check, not a historical design log. Superseded long-form review is preserved under `sources-readonly/`.
