# SDS Profile — Solution / Application Planning On IDTSPE

Status: active canonical SDS profile package

## What SDS Adds

```text
IDTSPE Core
+
15 SDS Target Modules with explicit Step-Result Contracts / Result Units
+
6 SDS-specific Lenses with explicit Analysis Surface / operations / Finding Contract
+
directed Target/readiness workflow
+
Documentation / Representation policy + SDS artifact materialization tree/topology coordinator
+
SDS command surface
+
worked examples
=
current full SDS planning methodology
```

SDS is not the definition of IDTSPE itself. Non-SDS Target Module families may coexist later.

## Start Here

1. [`BOOTSTRAP-SDS.md`](BOOTSTRAP-SDS.md) — SDS profile bootstrap.
2. [`SDS-FULL-MAP.md`](SDS-FULL-MAP.md) — complete SDS + IDTSPE profile map.
3. [`../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — fundamental Documentation / Representation Lens; explains code-vs-prose, owner-vs-section, consolidate-vs-split and worked physical topologies.
4. [`ARTIFACT-PLACEMENT-MAP.md`](ARTIFACT-PLACEMENT-MAP.md) — annotated literal SDS materialization tree with TM/Lens proposers.
5. [`SDS-PHYSICAL-PLANNING-TREE.md`](SDS-PHYSICAL-PLANNING-TREE.md) — short physical-topology coordinator; not a mandatory file tree.
6. [`SDS-INSTANCE-MAP.md`](SDS-INSTANCE-MAP.md) — Target instance decomposition.
7. [`shared/directed-methodology-workflow-and-next-step-resolution.md`](shared/directed-methodology-workflow-and-next-step-resolution.md) — fixed directed workflow/readiness and next-step resolver.
8. [`target-modules/README.md`](target-modules/README.md) — 15 SDS Target Modules; Core Pre-Update/Exact Realization are inherited separately.
9. [`lenses/README.md`](lenses/README.md) — SDS-specific Lens pack + required Core Lens dependencies.
10. [`../../theoretical-modules/testing/README.md`](../../theoretical-modules/testing/README.md) — Testing Knowledge Basis: reusable proof theory/mechanics consumed by the Test Proof Lens/conditional Test Targets.
11. [`shared/idtspe-command-surface-contract.md`](shared/idtspe-command-surface-contract.md) — SDS command surface.
12. [`examples/IMPLEMENTATION-SLICE-UNIT-REFERENCE.md`](examples/IMPLEMENTATION-SLICE-UNIT-REFERENCE.md) — reference pair example for Result Units, Slice Lens operations and Core Finding Disposition.
13. [`examples/research-capture/README.md`](examples/research-capture/README.md) — worked physical traversal.

## Core Dependency

SDS consumes the generic package at [`../../idtspe-core/README.md`](../../idtspe-core/README.md). Generic Shell/Target/Unit/Lens/Artifact rules, Core Finding Disposition and the shared Target Module/Lens Knowledge Basis contract are not redefined here. All 15 SDS Target Modules declare explicit Step-Result Contracts. Knowledge Basis is used only when useful; `TM-SCENARIO-PLANNING` currently needs no separate Knowledge Basis. All 6 SDS-specific Lenses declare Analysis Surface + supported operations + Finding Contract.

Lens selection is not limited to Target Module attachment: `TF-06A` scans this profile's Lens registry proportionally, and generic Core `подбери линзы` / `примени линзу` operations can select/apply any registered applicable SDS Lens inside the natural Target/Local Target context.
