# Solution And Application Planning Direction Registry

Status: active reusable-family semantic Direction Registry
Parent: [`../../direction-registry.md`](../../direction-registry.md)
Child Use-Case Registry: [`use-case-registry.md`](use-case-registry.md)

## `DIR-PLAN-SOLUTION` — Plan A Solution / Workflow / Application

**Purpose:** plan the real-world solution and, when own Application responsibility is selected, continue through same-quality Step 0–4 Application planning from Scenario behavior to Domain, Slices, architecture-evolution evidence and practical realization feedback.

**Topology:** supported Use Cases are independently activatable/proportional. Mini, Modular/Medium and Full SDS are physical/addressability profiles over the same planning-quality contract.

```text
STEP 0 — WHY / SOLUTION DISCOVERY
Real-Life Situation / Need
→ Current Reality
→ solution alternatives / research
→ Application Concept when justified
→ Application Responsibility
→ Prototype when useful
→ Prototype Scenarios / Screens
→ candidate DATA / Behavior / Requirements

STEP 1 — SCENARIO
Application Scenario
+ Scenario DATA
+ Behavior Items
+ Requirements / Screens when material

STEP 2 — DOMAIN
Domain Draft
→ concepts / relationships / state / lifecycle
→ rules / invariants / policies
→ likely/evidence-backed variation

STEP 3 — REALIZATION / SLICES + VERIFICATION PLANNING
Slice Strategy
→ vertical Slice(s)
→ frontend/server/other implementation-part plans when useful
→ keep product/Scenario priority distinct from recommended technical implementation sequence
→ important Workspace Uses + contextual WEUC discovery against target code/workspace when material
→ expected Understanding/Change/Verify paths + work-cost / Change Pressure / Architecture Decisions only when supported
→ Test Strategy / Test Design / Practical Test Plan before implementation when material

STEP 4 — PRACTICAL REALIZATION FEEDBACK
implementation
→ execute selected proofs
→ actual evidence / current Coverage review when useful
→ semantic ReviewDiff + proportional architecture work-cost regression check when material
→ upstream correction only when evidence requires it
```

Application-specific Requirements / Future Scenario Ideas / implementation-scoped Ideas are owned by [`requirements-and-change-context.md`](requirements-and-change-context.md). Generic WEUC / Workspace Change Pressure / Change Axis / Architecture Decision semantics are owned by sibling [`../architecture-planning/`](../architecture-planning/); Application planning invokes them as evidence where Step 3 needs architecture judgment. Practical operated acceptance is owned by sibling [`../testing-planning/`](../testing-planning/).

Canonical SDS profile family: [`../profiles/sds-planning-profiles.md`](../profiles/sds-planning-profiles.md). Shared low-level contract: [`detailed-planning/README.md`](detailed-planning/README.md).

Supported Use Cases are capabilities, not one mandatory ceremony.
