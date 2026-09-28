# Application Concept Draft Template

Status: active reusable recommended template for the canonical SDS `RU-APP-05 Application Concept`
Purpose: keep the first Application Definition Result Unit, `RU-APP-05`, short and understandable. Stable Application identity and upstream references remain ordinary document/Target context; no separate Identity / Selected Contribution Unit is created. This template is **not** the whole Application Definition and must not absorb Existing-Solution position, Own-Application Justification / Key Behavior Focus, feasibility/early implementation planning, detailed behavior or architecture.

Canonical owner:
- [`../../idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md`](../../idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md)

## Application Concept

### Summary

<In a short paragraph: what this Application is, why it exists, and what overall value it targets.>

### How It Roughly Works

<In a small concept-level point: the basic working idea needed to understand the Application. Do not expand into detailed Feature/Scenario behavior, Screens, Domain, architecture or implementation mechanics.>

## Context References — When Useful

```text
Application Definition / selected contribution: <link/ref>
Key Behavior Focus: <KBF-* refs when stable addressability is useful>
Downstream Scenario / Evolution drivers: <refs when materially useful; no journey bodies here>
Material Proposal/Decision/Q/R/P: <refs only when useful>
```

These references provide context; their bodies remain with their natural owners.

## Boundary

```text
Application Concept
≠ Own-Application Justification / Key Behavior Focus
≠ existing-solution comparison
≠ Realization Feasibility / Early Implementation Planning
≠ Feature decomposition
≠ Scenario
≠ architecture specification
≠ implementation plan
```

Existing-Solution position remains `RU-APP-02`; own-Application justification/key behavior remains `RU-APP-08`; feasibility/early implementation planning remains `RU-APP-07`. Real-life Scenario bodies belong to `TM-SCENARIO-PLANNING` and are only referenced when useful.

If the Concept needs extensive mechanics to be understandable, keep only the short conceptual explanation here and route the detail to its natural downstream owner.
