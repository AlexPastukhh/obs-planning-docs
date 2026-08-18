# Reusable Goal Map

Status: active reusable application-planning owner
Scope: a proportional current/forward-looking working map for one meaningful goal or work direction. This is not the Dashboard application's Goal Map definition.

## Purpose

Use a Goal Map when work needs one compact current surface that keeps the destination, selected route and material implementation reminders together without creating a new canonical owner for every note.

A Goal Map may contain, proportionally:

```text
Goal / Desired Result
Current Situation
Current Plan / Action Map
Implementation Points
Keep In Mind
Questions / Constraints
References / canonical owners
```

No section is mandatory merely because it exists in this list.

## Ownership Boundary

```text
Goal Map
= current / forward-looking working picture

Scope Action Log
= material historical work + rationale
```

A Goal Map may link to Ideas, Use Cases, Scenarios, workflows, ChangeSets or other owners, but it does not become their semantic authority. When material acquires an independent responsibility, move/maintain the complete meaning in its canonical owner and keep only the projection/reference needed by the map.

`Keep In Mind` is allowed for lightweight context/reminders related to this goal. Do not create a generic reusable Notes file unless an independently useful notes responsibility is later proven.

## Dashboard Boundary

`planning/dashboard/` may use its own application-specific Goal Map representation. Dashboard Goal Maps are not the reusable definition and may project only the subset useful to that application.

## Lifecycle

The Goal Map may be rewritten as current understanding changes. It is not required to preserve old states; historical material actions/rationale belong in the relevant scope action log and exact repository transitions belong to Git/ReviewDiff/ChangeSet evidence.
