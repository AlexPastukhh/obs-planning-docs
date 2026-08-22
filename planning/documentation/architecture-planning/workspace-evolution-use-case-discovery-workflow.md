# Contextual Workspace Evolution Use-Case Discovery Workflow

Status: active reusable owner
Semantic entry: `UC-PLAN-ARCH-DISCOVER-WEUC`

## Purpose

Discover independently useful contextual Workspace-evolution work instances against a concrete Workspace area/owner/change surface so Architecture planning can reason about likely future change paths rather than generic flexibility.

## Trigger

Use when:
- user explicitly requests WEUC/evolvability discovery;
- Architecture Pressure/Decision needs contextual future-change evidence;
- a sufficiently concrete planning area explicitly needs this result.

Do not scan every Workspace area merely because this UC exists.

## Result

```text
Concrete Workspace Area / Owner
WEUC Type candidate when useful
Contextual WEUC Instance(s)
Expected Workspace Change Path
Likelihood / value / timing evidence
Friction / fan-out / risk
Architecture handoff needed? yes | no
```

## WEUC Type Vs Instance

A WEUC Type is a reusable class of evolution work. A contextual WEUC Instance is that work against a concrete current owner/surface. Stable IDs are proportional and useful only when the candidate must be tracked/reviewed across planning work.

## Boundary

`UC-PLAN-ARCH-WORKSPACE-USES` owns the broader important current/candidate Workspace-use picture. This UC owns the narrower contextual evolution-use result. Workspace Planning retains canonical ordinary Workspace UC identity/change/topology authority.

## Architecture Handoff

Material instances may feed `UC-PLAN-ARCH-PRESSURE`, `UC-PLAN-ARCH-DECISION`, UCDS/SDS review or dependency/change review. Architecture complexity is justified only by concrete evidence/payoff; generic future flexibility is insufficient.
