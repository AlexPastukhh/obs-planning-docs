# SDS Profile — Solution / Application Planning On IDTSPE

Status: active canonical SDS profile entry

## Purpose

SDS is the installed profile for planning an own software/Application contribution
from real-world need/solution context through Scenarios and vertical Slices into
implementation/evidence.

It does not redefine generic IDTSPE Target Formation, Resolution, Generic State,
Lens mechanics, Finding Disposition, representation mechanics or Exact
Realization.

## Preferred Semantic Direction

```text
optional generic Need / Real-Life Solution Discovery
→ Application Definition
→ optional Prototype Evidence
→ Application Scenarios
→ Slice Strategy
→ Slice / Aggregate realization
→ Exact Realization
→ Evidence / selective revalidation
```

This is **semantic direction**, not a rigid waterfall.

Downstream planning consumes accepted upstream meaning and may challenge it, but
must not silently rewrite it. A backward semantic correction goes through:

```text
Finding Candidate
→ Core Finding Disposition
→ narrow REVALIDATE / REPAIR of the real owner
```

The early Need / Solution Discovery work may be skipped when a trusted explicit
Application intent/contribution is already available.

## Main Owners

1. [`target-modules/README.md`](target-modules/README.md) — 12 SDS Target Module families.
2. [`lenses/README.md`](lenses/README.md) — 6 SDS-specific reusable Lenses plus inherited Core Lenses.
3. [`shared/directed-methodology-workflow-and-next-step-resolution.md`](shared/directed-methodology-workflow-and-next-step-resolution.md) — canonical SDS cross-Target direction and flexible Slice/Aggregate realization loop.
4. [`ARTIFACT-PLACEMENT-MAP.md`](ARTIFACT-PLACEMENT-MAP.md) — human-facing owner/file placement guidance with LIGHT/MIXED/COMPLEX examples.
5. [`shared/idtspe-command-surface-contract.md`](shared/idtspe-command-surface-contract.md) — SDS command/routing surface.
6. [`BOOTSTRAP-SDS.md`](BOOTSTRAP-SDS.md) — profile bootstrap/read set.

Generic pre-Application solution discovery is documented by
[`../../idtspe-core/shared/solution-discovery-workflow.md`](../../idtspe-core/shared/solution-discovery-workflow.md).

## Key SDS Boundaries

### Scenario

Scenario owns behavioral/product meaning. `RU-SCEN-03` owns Scenario-local
known development/change outlook. Independently meaningful future behavior may
become a planned/new Scenario candidate rather than being forced into an existing
Scenario.

### Screen

Screen is conditional spatial/window meaning. It does not contain a frontend
implementation Slice. One Screen may serve several Slices and one Slice may
involve several Screens.

### Slice

A normal Slice is one independently useful/checkable vertical implementation
result with exactly one Primary Scenario. SDS does not split it into frontend,
backend or database Slices merely because implementation has those technical
sides.

### Domain / Aggregate

SDS uses one `TM-DOMAIN-DISCOVERY` compatibility ID whose semantic family is
**Domain / Aggregate Modeling**. It may run shallowly as supporting methodology
inside Slice Strategy or deeply for one bounded modeling problem. A human-readable
Domain file is not required by default; code/types/tests may be the durable owner.

### Evolution

Scenario future behavior is projected into Strategy (`May Change / Extend`) and
then into owner-local Slice/Cross-Cutting Evolution Steps. L5 evaluates planned
change isolation; it does not own a global Workspace Evolution Map.

### Representation

```text
semantic owner
≠ Target instance
≠ Markdown file
```

Inline/asymmetric representation is normal. Separate Slice/Cross-Cutting files
appear only when independent size/review/reuse/lifecycle pressure justifies them.
Examples are guidance, not required scaffolds.

## Testing

- obvious proof → Exact Realization may produce exact tests directly;
- independently non-trivial proof design → optional `TM-TEST-DESIGN`;
- genuine cross-owner proof coordination → conditional `TM-TEST-STRATEGY`;
- real implemented acceptance/learning Evidence → `TM-PRACTICAL-TEST`.

## Theory / Knowledge Basis

Application-layer theories such as frontend/server/Domain/persistence structures
may be useful Knowledge Basis/Lens material. They are not mandatory SDS Target
ontology.
