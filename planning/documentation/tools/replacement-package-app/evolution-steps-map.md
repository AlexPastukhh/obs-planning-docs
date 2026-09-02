# Replacement Package App — Evolution Steps Map

Status: active application-evolution planning owner; canonical Scenario step migration pending
Scope: planned order, dependency, parallelism and enablement relationships between Scenario-owned Application Evolution Steps.

## Purpose

This file answers:

> **When / in what dependency order should selected application changes happen?**

It does **not** answer:

> **What application behavior changes?**

That behavioral meaning remains canonical in the Scenario owner of each Application Evolution Step.

It also does not answer how Domain/Slice implementation changes; those consequences belong in `Changes by Application Evolution Step` in affected implementation/semantic owners.

The responsibility split is:

```text
Scenario owner
→ Application Evolution Step
→ WHAT changes

Evolution Steps Map
→ planned sequence / dependencies / enablement / parallelism
→ WHEN / ORDER

Domain / Slice / Cross-cutting owner
→ Changes by Application Evolution Step
→ HOW that owner changes
```

Documentation process: [`DOC-UC-08 — Plan the Application Evolution Step sequence`](documentation-use-cases.md#doc-uc-evolution-steps-map).
Recommended entry form: [`Template — Evolution Steps Map entry`](documentation-templates.md#template-evolution-steps-map-entry).

## Planning rules

- Reference canonical Scenario-owned Application Evolution Steps; do not copy their behavioral delta here.
- Evolution Step identity/name is semantic and stable. Do not encode current roadmap order as `001`, `002`, `003` merely because the map currently lists the steps that way.
- Planned order may change without renaming the step.
- The map may be:
  - linear;
  - branching;
  - conditional;
  - parallel where dependencies allow it.
- `POSSIBLE` steps are non-binding and may remain outside the committed sequence unless showing them helps explain an option/dependency.
- A planned future Scenario may appear as an enabled/replacement target, but its complete behavior belongs in its own Scenario owner.
- Completed steps should not remain in the active plan merely to preserve history when current owners already communicate the resulting truth. Keep historical planning only when it still materially explains remaining dependencies.

## Current planned sequence

No authoritative sequence is populated by this documentation-model package because the existing Scenario owners have not yet been migrated to canonical semantically named Application Evolution Steps.

Populate this map during the Scenario migration by:

1. creating/canonicalizing Application Evolution Steps in Scenario owners;
2. identifying real prerequisites and enablement relations;
3. placing selected steps here without changing their semantic IDs/names;
4. separating independent/parallel and non-binding possible branches instead of forcing an artificial ordinal list.

## Recommended map shape

```text
Current application state
        ↓
<Scenario-owned Application Evolution Step A>
        ├─────────────→ <parallel/independent Step B>
        ↓
<Step C enabled by A>
        ↓
<planned future Scenario / resulting capability>
```

A tabular or list form is equally valid when it communicates the dependency structure more clearly.
