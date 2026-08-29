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

| Lens | Activation / main SDS consumers | Current KB representation |
|---|---|---|
| [`LENS-APPLICATION-BOUNDARY-FEASIBILITY`](reusable/LENS-APPLICATION-BOUNDARY-FEASIBILITY.md) | `TARGET_PROFILE_REUSABLE` · Application Definition | `INLINE` |
| [`LENS-DOMAIN-MODELING-DDD`](reusable/LENS-DOMAIN-MODELING-DDD.md) | `TARGET_PROFILE_REUSABLE` · Domain Discovery / Draft | `INLINE` |
| [`LENS-UI-SPATIAL-FRONTEND-REALIZATION`](reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md) | `TARGET_PROFILE_REUSABLE` · Screen / Frontend / UI-heavy Slice | `INLINE` |
| [`LENS-SLICE-VERTICALITY-INTEGRATION`](reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md) | `TARGET_PROFILE_REUSABLE` · Slice Strategy / Implementation Slice | `INLINE` |
| [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) | `FREQUENT_CONDITIONAL` · WEUC/architecture fitness + Workspace work-cost for Domain/Slice/Frontend/whole Workspace; shortcut `lenscmd.weuc.check` | `INLINE` |
| [`LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`](frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md) | `FREQUENT_CONDITIONAL` · Evolution-safe simplification for Domain/Slice/Test/Frontend/architecture candidates; shortcut `lenscmd.simplicity.check` | `INLINE` |

The `INLINE` values above describe the current Lens files only. Under the Generic Knowledge Basis guidance they are not mandatory modes; SDS Lenses may keep theory inline, reference broader theory, or use separately represented applied Knowledge Basis material when useful. Scenario boundary/behavior/decomposition is not a separate Lens: it is the Evaluation responsibility of `TM-SCENARIO-PLANNING`.

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

## SDS Lens Conformance Contract

All 6 SDS-specific reusable Lens bodies declare:

```text
Analysis Surface
Supported Operations
  ANALYZE
  CHECK
  REFINE
  CHALLENGE
Typical Findings
Finding Contract
Knowledge Basis
```

The Lens owns the perspective and finding semantics. Generic Core [`Finding Disposition`](../../../idtspe-core/shared/finding-disposition-contract.md) owns materiality/ownership/State/lifecycle disposition. `REOPEN`, Result Unit update after resolution and cross-owner handoff are not Lens methods.

## Lens Applicability Scan

SDS bootstrap loads this registry as an applicability index, not all Lens bodies. `TF-06A` combines required Core checks, the active Target Module Lens Profile, plausible Core/SDS Lens gates and explicit selection. Any SDS Lens can be explicitly applied through generic Core `idtspe.lens.apply`; specialized WEUC/Simplicity commands remain shortcuts only.

Target Module attachment means “this Target family normally requires/considers this Lens”; it does not transfer the Lens Operational Contract or Knowledge Basis into the module.
