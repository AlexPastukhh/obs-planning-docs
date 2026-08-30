# SDS Profile Lens Pack

Status: active SDS-specific Lens index

SDS inherits the generic Core Lens system from
[`../../../idtspe-core/lenses/README.md`](../../../idtspe-core/lenses/README.md).

## Required Core Pack

```text
L1 Need / Value / Scope
L2 Authority / Source-of-Truth / Reuse
L3 Uncertainty / Assumption / Reversibility
Documentation / Representation / Artifact Boundary
```

## SDS-Specific Reusable Lenses — 6

| Lens | Main use |
|---|---|
| [`LENS-APPLICATION-BOUNDARY-FEASIBILITY`](reusable/LENS-APPLICATION-BOUNDARY-FEASIBILITY.md) | Application Definition |
| [`LENS-DOMAIN-MODELING-DDD`](reusable/LENS-DOMAIN-MODELING-DDD.md) | Domain/Aggregate modeling + shallow Strategy discovery |
| [`LENS-UI-SPATIAL-FRONTEND-REALIZATION`](reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md) | Screen + UI-heavy Slice realization evaluation |
| [`LENS-SLICE-VERTICALITY-INTEGRATION`](reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md) | Slice Strategy / Implementation Slice |
| [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) | **Evolution / Change Isolation**; compatibility ID/path retained |
| [`LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`](frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md) | implementation economy / simplification |

No seventh evolution Lens is added. The old L5 slot is repurposed.


## `idtspe` Aliases

Canonical semantic identity remains the `LENS-*` ID. Current SDS aliases are:

```text
app-boundary      → LENS-APPLICATION-BOUNDARY-FEASIBILITY
ddd               → LENS-DOMAIN-MODELING-DDD
ui                → LENS-UI-SPATIAL-FRONTEND-REALIZATION
slice-verticality → LENS-SLICE-VERTICALITY-INTEGRATION
l5                → LENS-WORKSPACE-EVOLUTION-ARCHITECTURE
simplicity        → LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY
```

Examples: `idtspe lens ddd Payment`, `idtspe l5 SL-PAYMENT`. A bare alias is resolved only when unique across installed Target Module/Lens registries.

## Responsibility Split

```text
L4 Dependency / Change Impact
= current dependency/change surface and blast radius

L5 Evolution / Change Isolation
= planned/probable future-change interaction/isolation

Simplicity
= minimum sufficient current structure + understanding/discoverability/work cost

L6 Verifiability / Observability / Operability
= proof/observation/diagnosis/operation
```

## Frontend

SDS installs no Frontend Target Module. The UI/Spatial/Frontend Lens remains useful
because a reusable evaluation perspective does not require a recurring Target
family. Independently substantial frontend-specific work may stay in ordinary
Slice Resolution or become a Local Target Contract through normal Target
Formation.

## Finding Boundary

Lenses analyze/check/refine/challenge and may surface Finding Candidates. Core
Finding Disposition owns accepted State/owner/lifecycle consequences. Lenses do
not directly write Target Result Units.
