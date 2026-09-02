# Replacement Package App — Evolution Steps Map

Status: active evolution planning owner; canonical Scenario step migration pending
Scope: rough horizon/likelihood, dependency, sequence, parallelism, readiness and enablement relationships between Scenario-owned Evolution Steps, plus materially independent lower-owner impacts when their planning differs from the parent step.

## Purpose

This file answers planning questions:

> **When / how likely / in what dependency order should selected evolution happen, and is it ready?**

It does **not** define:

- what application behavior changes — canonical in the Scenario-owned Evolution Step;
- what a Domain/Slice/Screen/shared owner changes — canonical in that owner's `Evolution Impact`;
- how the current implementation must be shaped — canonical in `DI-*`, `SI-*` or shared Implementation Items.

```text
Scenario owner
→ Evolution Step
→ WHAT behavior changes

Evolution Steps Map
→ rough horizon / likelihood / dependency / order / readiness
→ WHEN / HOW LIKELY

Lower owner
→ Evolution Impact
→ WHAT changes in that owner

Implementation Items
→ HOW current implementation is constrained for current quality + known evolution
```

Documentation process: [`DOC-UC-08 — Plan Evolution Steps and material impact timing`](documentation-use-cases.md#doc-uc-evolution-steps-map).
Recommended form: [`Template — Evolution Steps Map entry`](documentation-templates.md#template-evolution-steps-map-entry).

## Planning rules

- Reference canonical Scenario-owned Evolution Steps; do not copy their behavioral delta.
- Evolution Step identity/name is semantic and stable; map reorder never requires re-ID.
- Step `Intent` may remain `URGENT`/`PLANNED`/`POSSIBLE` in the Scenario owner. The map may additionally record rough horizon, likelihood/planning confidence and readiness when useful.
- Planning may be linear, branching, conditional or parallel.
- `POSSIBLE` remains non-binding and should not be forced into committed sequence.
- A materially independent lower-owner `Evolution Impact` item may appear when its timing/likelihood/dependency differs enough from the parent step to matter. Reference it; keep its Expansion/Refactoring/Forced Migration meaning in the lower owner.
- Do not turn this map into detailed implementation scheduling, code task inventory or a duplicate architecture backlog.
- Completed nodes need not remain active merely for history when current owners communicate resulting truth.

## Current planned sequence

No authoritative sequence is populated by this documentation-model package because existing Scenario owners have not yet been migrated to canonical semantically named Evolution Steps and lower owners have not yet been reconciled to the new `Evolution Impact` form.

Populate the map during later Scenario/implementation integration by:

1. canonicalizing Scenario-owned Evolution Steps;
2. identifying real prerequisites/enablers/parallelism;
3. recording rough horizon/likelihood/readiness only where it adds planning meaning;
4. referencing materially independent local impacts only when their planning differs from the parent step;
5. keeping behavior/implementation delta in their canonical owners.

## Recommended map shape

```text
Current application state
        ↓
<Evolution Step A> [near / high confidence / ready]
        ├────────────→ <parallel Step B>
        ↓
<Step C enabled by A>
        └─ local impact: <Slice refactoring> [may happen before C]
        ↓
<planned future Scenario / resulting capability>
```

A table/list/graph form is equally valid when it communicates planning relationships more clearly.
