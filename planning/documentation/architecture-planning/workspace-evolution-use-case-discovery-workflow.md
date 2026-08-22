# Contextual Workspace Evolution Use-Case Discovery Workflow

Status: active reusable owner
Semantic entry: `UC-PLAN-ARCH-DISCOVER-WEUC`

## Purpose

Discover independently useful contextual Workspace-evolution work instances against a concrete Workspace area/owner/change surface so Architecture planning can reason about likely future change paths rather than generic flexibility.

This capability is a normal architecture-evidence pass inside Application SDS Step 3 when target code/workspace realization is concrete enough that likely future change materially affects architecture or Slice boundaries.

## Trigger

Use when:
- user explicitly requests WEUC/evolvability discovery;
- Architecture Pressure/Decision needs contextual future-change evidence;
- Application SDS Step 3 reaches a sufficiently concrete target code/workspace realization where likely change may affect architecture/Slices;
- a sufficiently concrete planning area explicitly needs this result.

Do not scan every Workspace area merely because this UC exists.

## Result

```text
Concrete Workspace Area / Owner
WEUC Type candidate when useful
Contextual WEUC Instance(s)
Likelihood / value / timing evidence
Expected Workspace Change Path
Friction / fan-out / migration / verification risk
Architecture/change-pressure handoff yes | no
```

## WEUC Type Vs Instance

A WEUC Type is a reusable class of evolution work, for example add provider, migrate schema, split owner or add a new integration route.

A contextual WEUC Instance is that work against a concrete current/target Workspace area, owner or change surface. Architecture evidence should prefer instances because they expose actual locality, fan-out, migration/verification friction and Working-Context Load.

Stable IDs are proportional. Use them when an instance must survive across planning/review/architecture decisions.

## Likelihood / Value / Timing

Assess expected occurrence qualitatively and evidence-first:

```text
likelihood: high | medium | low | unknown
value / consequence: material description
timing: near / planned / plausible later / unknown
evidence: source / selected plan / observed history / explicit assumption
```

Do not manufacture numeric probability. An attractive hypothetical change with no evidence remains weak architecture pressure.

## Durable Instance Register

Mini/Modular SDS may keep instances inline while they remain reviewable. When durable cross-plan tracking materially helps—especially in Full SDS—material instances should be transferred to the project-local register shape:

[`templates/WEUC-INSTANCE-REGISTER-TEMPLATE.md`](templates/WEUC-INSTANCE-REGISTER-TEMPLATE.md)

The register preserves the driving instance, its expected path, likelihood/value/timing and current architecture relation. It is not a second ordinary Workspace Use-Case registry.

When target code/base structure changes materially, re-evaluate affected paths instead of leaving stale convenience/fan-out claims attached to old structure.

## Boundary

`UC-PLAN-ARCH-WORKSPACE-USES` owns the broader important current/candidate Workspace-use picture. This UC owns the narrower contextual evolution-use result. Workspace Planning retains canonical ordinary Workspace UC identity/change/topology authority. Application Scenario/Domain truth remains in Application Planning.

## Architecture Handoff

```text
contextual WEUC instance
→ expected Workspace Change Path
→ likelihood / value / timing
→ friction / fan-out / risk
→ UC-PLAN-ARCH-PRESSURE when material
→ Change Axis only to the degree evidence supports it
→ UC-PLAN-ARCH-DECISION when a concrete choice is justified
```

Architecture Decisions should reference the material WEUC instances/change paths that drive them. A candidate instance never automatically justifies an abstraction, Port or generalized framework.
