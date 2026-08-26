# IDTSPE Core / SDS Profile Separation Consistency Audit

Status: **PASS**

Scope: physical and semantic restructuring that separates generic IDTSPE Core from the current SDS profile while preserving all accepted Target/Lens/Artifact/WEUC/testing semantics.

## Package Boundary

- `active/idtspe-core/` exists as canonical generic methodology package: **PASS**
- `active/profiles/sds/` exists as canonical SDS profile package: **PASS**
- legacy `active/target-modules`, `active/lenses`, `active/generic`, `active/shared`, `active/examples` contain compatibility navigation only: **PASS**
- repository integration concerns live outside methodology owners in `integration/`: **PASS**

## Bootstrap Boundary

- generic `idtspe.bootstrap / бутстреп idtspe` owner exists: **PASS**
- SDS `sdscmd.bootstrap / бутстреп sds` owner exists separately: **PASS**
- Core bootstrap loads Target/Lens systems and installed profile registries without mechanically rereading every specific module/lens body: **PASS**
- specific Target/Lens bodies remain target-driven: **PASS**
- IDTSPE Shell P-13 now accepts a profile-supplied Next-Step Resolver instead of hard-coding SDS chronology: **PASS**

## SDS Package

- active SDS Target Modules: **17 / 17**
- canonical module bodies live under `profiles/sds/target-modules/`: **PASS**
- SDS Full Map exists and explains IDTSPE Core + SDS profile: **PASS**
- SDS Instance Map exists inside the profile: **PASS**
- SDS directed workflow/readiness remains canonical inside the profile: **PASS**
- Research Capture worked example moved with internal structure preserved: **PASS**

## Lens Split

Current installed reusable Lens inventory is **18**:

```text
IDTSPE Core / generic reusable lenses: 11
  required Core:                       4
  frequent conditional Core:           3
  reusable Core:                       4
SDS-specific lenses:                   7
Total:                                18
```

- L1/L2/L3 + required Documentation / Representation materialization policy remain generic Core: **PASS**
- L4/L6/Quality-Risk remain generic Core: **PASS**
- generic Artifact/Practical/Test/Shared lenses remain reusable outside SDS: **PASS**
- Application/Scenario/Domain/UI/Slice/WEUC lenses are explicitly SDS-profile contributions: **PASS**
- post-separation SDS Simplicity / Implementation Economy Lens is profile-specific and evolution-aware: **PASS**
- every active Target Module still has one `## Lens Profile`: **PASS**
- every reusable Lens still has one `## Artifact / File Implications`: **PASS**

## Artifact Placement Regression

- source AP records: **38**
- source AG records: **38**
- unique source records: **76**
- current source guidance remains balanced at 38 AP + 38 AG; the Documentation / Representation pass expands existing `AG-ART-*` semantics without adding a new Lens ID or guidance record: **PASS**
- annotated SDS materialization projection accounts for **76 / 76** AP/AG source IDs exactly: tree nodes for materialization candidates + explicit non-tree embed/route guidance; the old flattened registry path is compatibility-only: **PASS**
- AP/AG source-record identity remains owned by Target Module/Lens bodies: **PASS**
- unresolved persistence/placement semantics preserved: **PASS**

## SDS Physical / Materialization Topology

- `SDS-PHYSICAL-PLANNING-TREE.md` is a **coordinator / allowed-destination-family map**, not a scaffold: **PASS**
- `ARTIFACT-PLACEMENT-MAP.md` is the literal annotated materialization projection with TM/Lens proposers: **PASS**
- `SDS-PLANNING-STATE/SDS-EVOLUTION-MAP.md` and `SDS-WORKSPACE-EVOLUTION.md` remain available as distinct global owners when their responsibilities exist: **PASS**
- canonical Ideas routing (`INBOX + early + scenario + domain + realization`) remains available without recreating the old Idea runtime: **PASS**
- Application / Scenario / Screen / exceptional Requirement destinations remain represented: **PASS**
- Domain/Slice logical owners may stay in discovery/strategy sections + implementation-native representations before dedicated files: **PASS**
- Domain/Slice `.evolution.md`, Test Design, Frontend and Part companions are pressure-driven splits rather than automatic files: **PASS**
- Scenario persistence pressure remains stronger/human-readable while still allowing consolidation when reviewable: **PASS**
- no rule to precreate empty optional files/directories: **PASS**
- Linked Notes introduce no `notes/` storage tree: **PASS**

## Existing Semantics Preserved

- Scenario DATA/Behavior remain internal Scenario contracts: **PASS**
- zero standalone Requirements remains valid: **PASS**
- Domain no-Domain result remains valid: **PASS**
- vertical Slice / Useful Vertical Result rules preserved: **PASS**
- Domain unit-test vs Slice integration-test policy preserved: **PASS**
- Domain Test Design may precede Slice Strategy: **PASS**
- Test Strategy remains conditional after Domain proof planning + Slice portfolio: **PASS**
- Slice/Test TDD interleave preserved: **PASS**
- `TM-WEUC` owns Workspace Evolution + Current Global Architecture Position: **PASS**
- WEUC Lens can evaluate a concrete Target or whole Workspace architecture: **PASS**
- no mandatory `TM-ARCH`: **PASS**

## Repository Integration Ledger

- `integration/CURRENT-REPOSITORY-INTEGRATION.md` exists: **PASS**
- explicitly separates IDTSPE Core, SDS Profile and helper/command infrastructure: **PASS**
- records known prior repository areas without claiming they were freshly audited: **PASS**
- includes fresh repository audit read order and migration status vocabulary: **PASS**

## Mechanical Integrity

- relative Markdown links in active/integration tree: **PASS**
- Markdown fences: **PASS**
- no canonical `TM-*` bodies remain under legacy target-module directory: **PASS**
- no canonical Lens bodies remain under legacy lens directory: **PASS**

Result: the methodology is ready to use this package boundary as the source baseline for a fresh current-repository audit/update plan.
