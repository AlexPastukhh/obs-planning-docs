# Application Concept Draft Template

Status: active reusable recommended template for the canonical SDS `RU-APP-05 Application Concept`
Purpose: keep one Application Concept short and understandable. This template is **not** the whole Application Definition and must not absorb Benefits, alternatives, feasibility, detailed behavior or architecture.

Canonical owner:
- [`../../idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md`](../../idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md)

## Application Concept

### Summary

<In a short paragraph: what this Application is, why it is needed, and what overall Benefit it provides.>

### How It Roughly Works

<In a small concept-level point: the basic working idea needed to understand the Application. Do not expand into detailed Feature/Scenario behavior, Screens, Domain, architecture or implementation mechanics.>

## Context References — When Useful

```text
Application Definition / selected contribution: <link/ref>
Application Benefits: <AB-* refs>
Representative Real-Life Scenarios: <RLS-* refs when material>
Material Proposal/Decision/Q/R/P: <refs only when useful>
```

These references provide context; their bodies remain with their natural owners.

## Boundary

```text
Application Concept
≠ Application Benefits
≠ standalone Application Responsibility Boundary
≠ existing-solution comparison
≠ Realization Feasibility
≠ Feature decomposition
≠ Scenario
≠ architecture specification
≠ implementation plan
```

Each substantive Application Benefit carries its own Responsibility Boundary in `RU-APP-03`. Existing-solution position, Representative Real-Life Scenarios and Realization Feasibility remain their own Application Definition Result Units.

If the Concept needs extensive mechanics to be understandable, keep only the short conceptual explanation here and route the detail to its natural downstream owner.
