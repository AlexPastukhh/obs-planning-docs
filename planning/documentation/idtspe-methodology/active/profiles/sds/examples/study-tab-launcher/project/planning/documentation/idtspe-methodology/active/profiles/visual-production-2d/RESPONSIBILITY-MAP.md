# 2D Visual Production Responsibility Map

Status: active routing projection

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `DOC.RESPONSIBILITY-MAP`
> Owner: [Responsibility Map](../../../../../../../source-context/planning/documentation/principles-and-terminology.md#doc-responsibility-map)

This map routes 2D Visual Production profile responsibilities. It owns routing only; generic Core Target/Lens/Source/Representation semantics remain inherited from their Core owners.

| Responsibility | Canonical owner | Boundary / notes |
|---|---|---|
| 2D profile scope/bootstrap/read set | [`README.md`](README.md#visual2d-profile-bootstrap) — `VISUAL2D.PROFILE-BOOTSTRAP` | Profile navigation only; does not create a visual Target by being active |
| Profile-wide visual production invariants | [`profile-contracts/VISUAL-PRODUCTION-INVARIANTS.md`](profile-contracts/VISUAL-PRODUCTION-INVARIANTS.md#visual2d-production-invariants) — `VISUAL2D.PRODUCTION-INVARIANTS` | Shared 2D-specific constraints only; generic Core mechanics remain Core-owned |
| 2D Target Module discovery/catalog | [`registries/TARGET-MODULE-REGISTRY.md`](registries/TARGET-MODULE-REGISTRY.md#registry-2d-target-modules) — `VISUAL2D.TARGET-MODULE-DISCOVERY` | Registry/routing only; selected concrete module owns its production contract |
| 2D Lens discovery/catalog | [`registries/LENS-REGISTRY.md`](registries/LENS-REGISTRY.md#registry-2d-lenses) — `VISUAL2D.LENS-DISCOVERY` | Registry/routing only; selected concrete Lens owns evaluation semantics |
| Profile Unit disposition/materiality review and Lens checkpoints | [`runtime/UNIT-DISPOSITION-AND-LENS-CHECKPOINTS.md`](runtime/UNIT-DISPOSITION-AND-LENS-CHECKPOINTS.md#shared-unit-selection-and-lens-checkpoints) — `VISUAL2D.UNIT-DISPOSITION-LENS-CHECKPOINTS` | Specializes visual checkpoints while Core owns generic Unit applicability/disposition |
| Visual Material / Source usage and authority boundary | [`source-contracts/VISUAL-MATERIAL-AND-SOURCE-USAGE.md`](source-contracts/VISUAL-MATERIAL-AND-SOURCE-USAGE.md#visual-material-and-source-usage) — `VISUAL2D.MATERIAL-SOURCE-USAGE` | Profile-specific visual source use; Core Target/Source relation remains authority plumbing |
| Bounded visual-material acquisition/transformation operation | [`operations/VISUAL-MATERIAL-PREPARATION.operation.md`](operations/VISUAL-MATERIAL-PREPARATION.operation.md#visual-material-preparation-operation) — `VISUAL2D.MATERIAL-PREPARATION` | Operation only; does not create a reusable Prepared Material Target unless the independent Target gate is met |
| Construction route selection | [`target-module-support/construction/CONSTRUCTION-ROUTE-SELECTION.target-module-guidance.md`](target-module-support/construction/CONSTRUCTION-ROUTE-SELECTION.target-module-guidance.md#shared-construction-route-selection) — `VISUAL2D.CONSTRUCTION-ROUTE-SELECTION` | Chooses direct route vs multi-route composition; concrete route modules own route semantics |
| Construction review-loop checkpoint | [`target-module-support/construction/CONSTRUCTION-REVIEW-LOOP.target-module-checkpoint.md`](target-module-support/construction/CONSTRUCTION-REVIEW-LOOP.target-module-checkpoint.md#shared-construction-review-loop) — `VISUAL2D.CONSTRUCTION-REVIEW-LOOP` | Profile checkpoint/orchestration only; Lenses own evaluation perspectives |
| Exact-realization integration guidance | [`target-module-support/construction/EXACT-REALIZATION-INTEGRATION.target-module-guidance.md`](target-module-support/construction/EXACT-REALIZATION-INTEGRATION.target-module-guidance.md#shared-exact-realization-integration) — `VISUAL2D.EXACT-REALIZATION-INTEGRATION` | Handoff/integration guidance; Core Exact realization remains generic Target Module authority |
| 2D artifact placement | [`representation/ARTIFACT-PLACEMENT-MAP.md`](representation/ARTIFACT-PLACEMENT-MAP.md#artifact-placement-map) — `VISUAL2D.ARTIFACT-PLACEMENT` | Extends Core placement; semantic owner is selected before physical placement |
| Retained reusable visual-material storage/registry | [`representation/VISUAL-MATERIAL-STORAGE-AND-REGISTRY.md`](representation/VISUAL-MATERIAL-STORAGE-AND-REGISTRY.md#shared-visual-material-storage-and-registry) — `VISUAL2D.MATERIAL-STORAGE-REGISTRY` | Intrinsic provenance/qualification storage; current Target/Unit interpretation remains local |
| Target-local visual material analysis representation | [`representation/VISUAL-TARGET-LOCAL-MATERIAL-ANALYSIS.representation-guidance.md`](representation/VISUAL-TARGET-LOCAL-MATERIAL-ANALYSIS.representation-guidance.md#visual-target-local-material-analysis-representation-guidance) — `VISUAL2D.TARGET-LOCAL-MATERIAL-ANALYSIS` | Representation guidance only; does not create reusable reference authority |
| Concrete 2D recurring Target/result family | selected `target-modules/TM-2D-*.md`, identified by its `Module ID` | Each concrete module `EXTENDS TARGET-MODULE.META-MODEL` |
| Concrete 2D evaluation perspective | selected `lenses/**/LENS-*.md`, identified by its `Lens ID` | Each concrete Lens `EXTENDS LENS.META-MODEL` |

Templates/examples/README indexes are supporting projections and do not become peer semantic owners.
