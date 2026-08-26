# SDS Profile Lens Pack

Status: active SDS-specific Lens index

SDS inherits the generic Core Lens system from [`../../../idtspe-core/lenses/README.md`](../../../idtspe-core/lenses/README.md).

## Always-Checked Core Pack

```text
L1 Need / Value / Scope
L2 Authority / SoT / Reuse
L3 Uncertainty / Assumption / Reversibility
Documentation / Representation / Artifact Boundary
  required when material output may persist
```

Canonical owners live under `active/idtspe-core/lenses/required/`.

## SDS-Specific Reusable Lenses

| Lens | Main SDS consumers |
|---|---|
| [`LENS-APPLICATION-BOUNDARY-FEASIBILITY`](reusable/LENS-APPLICATION-BOUNDARY-FEASIBILITY.md) | Application Definition |
| [`LENS-SCENARIO-BOUNDARY-BEHAVIOR`](reusable/LENS-SCENARIO-BOUNDARY-BEHAVIOR.md) | Scenario Discovery / Draft |
| [`LENS-DOMAIN-MODELING-DDD`](reusable/LENS-DOMAIN-MODELING-DDD.md) | Domain Discovery / Draft |
| [`LENS-UI-SPATIAL-FRONTEND-REALIZATION`](reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md) | Screen / Frontend / UI-heavy Slice |
| [`LENS-SLICE-VERTICALITY-INTEGRATION`](reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md) | Slice Strategy / Implementation Slice |
| [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) | WEUC/architecture fitness + Workspace work-cost for Domain/Slice/Frontend/whole Workspace; direct surface `lenscmd.weuc.check` |
| [`LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`](frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md) | Evolution-safe simplification for Domain/Slice/Test/Frontend/architecture candidates; direct surface `lenscmd.simplicity.check` |

## Generic Reusable Lenses Commonly Used By SDS

Owned by IDTSPE Core:

```text
L4 Dependency & Change Impact
L6 Verifiability / Observability / Operability
Quality / Risk Materiality
Shared / Cross-Cutting Responsibility
Test Proof / Evidence
Practical Evidence
Linked Notes Usage / Justification (`lenscmd.linked-notes.justify` when directly invoked)
```

SDS Target Module `## Lens Profile` sections may link to both Core and SDS-specific Lens owners.
