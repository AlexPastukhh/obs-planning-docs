# Workspace Evolution Use-Case Instance Register

Status: reusable recommended template
Owner capability: `UC-PLAN-ARCH-DISCOVER-WEUC`
Scope: durable project-local register of material contextual future-change instances used as architecture evidence.

Use this only when instances are stable/material enough to benefit from tracking across planning work. Mini/Modular SDS may keep the same information inline while it remains reviewable.

## WEUC Types

| Type ID / Name | Reusable change kind | Evidence / examples | Notes |
|---|---|---|---|
| `WEUC-TYPE-*` |  |  |  |

A type is a reusable class such as add provider, migrate schema, split owner or introduce a new integration route. Types do not justify architecture by themselves.

## Contextual WEUC Instances

| Instance ID | Type | Concrete area / owner | Expected change / useful result | Likelihood | Value / timing | Expected Workspace Change Path | Friction / fan-out / migration / verification risk | Pressure / Change Axis | Related Architecture Decision(s) | State |
|---|---|---|---|---|---|---|---|---|---|---|
| `WEUC-INS-*` |  |  |  |  |  |  |  |  |  | `candidate / reviewed / selected-evidence / obsolete` |

## Assessment Rules

- likelihood/value/timing must state evidence or uncertainty; do not invent pseudo-precise probabilities;
- prefer concrete instances over generic future flexibility;
- trace the expected change path against the current/target Workspace realization;
- record whether architecture makes the important instance local, discoverable, testable and cheap enough;
- fan-out or friction is evidence, not an automatic abstraction mandate;
- when code/base structure changes materially, recheck affected instance paths and mark stale/obsolete evidence;
- an Architecture Decision should reference the concrete instances/change paths that materially justify it.

## Handoff

```text
contextual WEUC Instance
→ expected Workspace Change Path
→ likelihood / value / timing
→ friction / fan-out / risk
→ UC-PLAN-ARCH-PRESSURE when material
→ UC-PLAN-ARCH-DECISION when a material choice is justified
```

The register is architecture evidence, not Application Scenario behavior authority and not a generic Workspace UC registry.
