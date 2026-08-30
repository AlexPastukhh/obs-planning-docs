# Current Repository Integration — SDS / IDTSPE Pre-Update Audit And Migration Ledger

Status: **current integration ledger; Testing simplification + generic Pre-Update target state prepared against current repository base, while older staged-installation/migration checkpoints below remain provenance; destructive legacy-family cleanup remains gated by MB-06**  
Methodology baseline: `idtspe-methodology-workspace-core-sds-separated.zip` (`ffb6bfff5bb4da2478811443c5f0168ab4baa173b389439d0991afb27ca7d30b`)  
Repository evidence: `github:AlexPastukhh/obs-planning-docs`, branch `main`, current replacement-package base `b68b6dfac1f41fd8e79b8ea4a862ada3eddad433`; earlier `3d1ce07c...`, `36dfbf...` and `ca768b61...` references remain transition/import provenance  
Audit intent: record the **current testing/pre-update integration state** plus the earlier migration ledger, including obsolete SDS/Idea runtimes, merge-before-delete knowledge, command/helper impact and deletion gates.

## Historical Staged Installation Status — 2026-08-27

The current replacement-package target uses repository identity `github:AlexPastukhh/obs-planning-docs` and exact current base commit `3d1ce07c69ce7819aa42d4ade1bea3d02bbe418f`. The earlier `36dfbf...` and `ca768b61...` references below remain transition/audit provenance; they are not the base claim for this package.

This staged target performs the safe first installation layer:

```text
planning/documentation/idtspe-methodology/
  → installed current methodology workspace

planning root governance / command routing
  → points current material planning to IDTSPE + SDS

planning/commands/
  → 41 accepted methodology surfaces

Planning Helper
  → IDTSPE 9 + SDS 32 primary navigation
  → navigation metadata comes from repository command definitions/seed projection
  → runtime remains generic and does not hard-code current command identities
```

The six older `collect-ideas*` command files are retained only as hidden legacy compatibility (`palette:false`). Existing Application/Architecture/Testing methodology families are not destructively deleted in this package because MB-06 Reference Object semantics remain intentionally open and because a replacement package must not guess unresolved merge-before-delete content. Their remaining cleanup is a separate gated migration, not part of the APPLIED state described by this staged installation.

Planning Helper verification for the staged target passes `122 / 122` automated tests plus generated userscript/catalog build consistency. All 41 methodology surfaces carry stable `methodologyBinding`; mutable IDTSPE/SDS tab placement comes from separate helper presentation metadata.


## Current Testing Simplification + Generic Pre-Update Integration — 2026-08-30

Current installed state now has **2 generic Core Target Modules + 15 SDS Target Modules = 17 total**. Core adds optional `TM-PRE-UPDATE-PLAN / RU-PUPDATE-01`; SDS retires `TM-TEST-COVERAGE` as a Target family while preserving `проверь тестовое покрытие` as a direct `LENS-TEST-PROOF-EVIDENCE` review shortcut.

```text
Testing Knowledge Basis
→ reusable proof theory/mechanics

LENS-TEST-PROOF-EVIDENCE
→ operational proof-quality + actual coverage review

TM-TEST-STRATEGY [conditional]
→ lightweight shared cross-owner strategy only

TM-TEST-DESIGN [optional]
→ independently non-trivial proof design only

TM-EXACT-REALIZATION
→ literal production/test code + authorized automated execution

TM-PROTOTYPE ↔ TM-PRACTICAL-TEST
→ shared practical-evidence method/Lens; partial/simulated vs real implemented subject remains the material boundary
```

Current command projection is **43 = 11 Core + 32 SDS**. The SDS count remains 32 because `test_coverage.review` changes from Target invocation to direct reusable Lens review while the new Pre-Update command is a Core surface. Older Exact-Realization/42-surface, `TM-TEST-COVERAGE`, hand-maintained `TEST-REALIZATION-MAP.md` and pre-installation statements below are transition provenance; they are not current topology/ownership claims.

## Exact Realization Integration Checkpoint — 2026-08-30 (historical topology snapshot)

The current methodology adds one **generic Core** Target Module, `TM-EXACT-REALIZATION`, without changing the 16-module SDS profile topology. Its one Target Result Unit, `RU-REAL-01 Exact Realization`, is the exact directly integrable current candidate; codebase realization is the canonical/default archetype.

```text
accepted Domain / Slice / Test / other sufficiently determined meaning
+ exact current destination/codebase Sources
→ TM-EXACT-REALIZATION
→ exact code/artifact candidate
→ optional explicit review
→ optional explicitly authorized integration/build/test
→ Evidence
→ bounded minor repair OR Finding Disposition/revalidation
→ current exact realization
```

`TM-IMPLEMENTATION-SLICE` remains the call-level pre-code Slice design owner; `TM-TEST-DESIGN` remains proof-design authority; candidate build/test verification inside Exact Realization is Core Evidence and does not automatically become `TM-PRACTICAL-TEST`. Existing Domain Discovery/Draft topology is unchanged by this transition; Domain Draft may hand a selected Aggregate/domain owner directly to Exact Realization when Aggregate-first implementation is useful.

The current user-visible methodology projection is **42 = 10 generic IDTSPE Core + 32 SDS** surfaces. `tmcmd.exact.realization / реализуй код` is the new generic Core Target surface; Planning Helper command seed/order/tests are synchronized with it. Older 41-surface statements below describe the earlier staged installation and remain provenance.

## Current Knowledge-Basis Simplification — 2026-08-30

Generic IDTSPE now treats Knowledge Basis as a lightweight **theory-to-application bridge**, not a literal schema that every Target Module/Lens must serialize the same way. Theory/reference knowledge may be organized independently in files, folders, sections, broad corpora, external sources or existing Theoretical Modules. A Target Module or Lens may select/reference the useful parts and, when raw theory is too broad, keep an applied interpretation for its own Evaluation.

`INLINE / REFERENCED / HYBRID`, `Reference Load Policy`, and exactly-one-section rules are no longer Generic conformance requirements. Existing owners may retain those labels/sections as valid representation; Knowledge Basis simplification does not require a mass rewrite of Target Modules or reusable Lenses. Current Target Sources / Lens Target Inputs / project Evidence remain distinct from reusable theory/Knowledge Basis.

---

## Historical Shared Target/Lens Knowledge-Basis Update — 2026-08-27 (representation contract superseded)

Against current repository snapshot base `36dfbf878d4ff9e616de70d7535135c5c0c9966e`, IDTSPE now makes Knowledge Basis a shared Core sub-contract for both reusable Target Modules and reusable Lenses:

```text
Target Module
= Operational Target Contract
+ Knowledge Basis

Lens
= Operational Evaluation Contract
+ Knowledge Basis
```

Both use `INLINE | REFERENCED | HYBRID` with embedded knowledge, referenced knowledge owners, load policy and operationalization notes. The symmetry is deliberately limited to knowledge dependency: Target Module Source Contract remains current Target-instance input/evidence/constraint archetype; Lens Target Inputs/Evidence remain current evaluation input; neither is a Knowledge Basis. Reusable Lens evaluation knowledge still belongs to Lens owners rather than being copied into Target Modules.

All **17 / 17** active SDS Target Modules now carry one `## Knowledge Basis`. `TM-APPLICATION-DEFINITION` moves its two deep guides into a formal `HYBRID` Knowledge Basis. `TM-TEST-STRATEGY`, `TM-TEST-DESIGN`, `TM-PRACTICAL-TEST` and `TM-TEST-COVERAGE` move the raw Testing theoretical package into their `HYBRID` Knowledge Basis and remove the former ad-hoc `Theoretical Testing Reference` sections. The existing **18 / 18** Lens Knowledge Basis sections retain the same literal shape through the shared contract. Bootstrap remains lazy: module/Lens bodies are selected first, referenced knowledge bodies load only according to the selected owner's policy.

---

## Current Lens Composition / Knowledge-Basis Update — 2026-08-26

The current `46ee341c...` transition additionally makes the generic IDTSPE composition boundary explicit:

```text
material IDTSPE Target
→ reusable Target Module when a recurring contract fits
OR
→ Local Target Contract when no reusable module fits well enough

TF-06A LENS_SET
→ required Core
+ active Target Module Lens Profile when present
+ applicable registered Core/profile Lenses
+ explicit user/agent Lens choice

Lens
= Operational Evaluation Contract
+ Knowledge Basis / reusable theory bridge
```

Two generic Core orchestration surfaces expose that mechanism without manufacturing one command per Lens: `idtspe.lenses.select` performs the applicability scan and may create/reuse the natural Target/Local Target Contract (`CREATE_OR_REUSE_TARGET`); `idtspe.lens.apply` dispatches one registered Lens against a resolved/reused Target context (`RESOLVE_OR_REUSE_TARGET`). Their generic command semantics are owned by the Core command-surface contract; the SDS command-surface file is a profile extension only. Four stable specialized Lens shortcuts remain convenience surfaces.

Artifact guidance is normalized with the same ownership rule: Target Module `AP-*` records describe representation of the Target result; Lens `AG-*` records describe/reroute Lens-produced findings or supporting artifacts. Target-local future evolution companions are therefore owned by L5/WEUC `AG-L5-02`, while current Domain/Slice/Frontend results remain Target-Module responsibilities. `TEST-REALIZATION-MAP.md` remains a Test Strategy representation because it is part of the Test Strategy result, not a Lens finding.

---

## 1. Evidence Boundary

The supplied repository ZIP contains:

```text
snapshot/
  tracked files + untracked non-ignored files

WORKING-TREE.diff
```

The fresh supplied `WORKING-TREE.diff` changes only `planning/documentation/tools/replacement-package-app/...`; it does **not** change the SDS/Application/Architecture/Testing planning governance audited below. Therefore the planning/SDS state in `snapshot/` is a clean committed baseline for this audit.

This fresh snapshot supersedes the earlier `915325d4...` evidence used by the first pre-update pass. The previously separate late planning patch is now materially confirmed in repository truth: `application_sds.bootstrap`, `UC-PLAN-ORIENT`, the SDS governance read workflow and shared command preflight/read-reuse rules are present in the committed `ca768b61...` tree.

Fresh-snapshot reconciliation against the earlier audited snapshot:

```text
old base: 915325d4d1f1d67330b21565136ee7a4b2d1ee22
new base: ca768b61b2c84d6cda6c27b4ace7c4fc87d404e7

audited SDS/command/helper zones:
  +2 files
  0 removed files
  17 changed files

new committed files:
  planning/commands/bootstrap-application-sds-planning.command.md
  planning/documentation/application-planning/application-planning-governance-read-workflow.md
```

The new governance/preflight material does **not** introduce a new semantic SDS responsibility missing from the current methodology. Its reusable `CURRENT / TARGETED REFRESH / FULL BOOTSTRAP` behavior is already represented by current `BOOTSTRAP-IDTSPE.md` / `BOOTSTRAP-SDS.md`. Migration implication:

```text
planning/commands/bootstrap-application-sds-planning.command.md
  → CURRENT_CONFIRMED
  → ADAPT / reuse as SDS-profile bootstrap command
  → never substitute for generic idtspe.bootstrap

application-planning-governance-read-workflow.md
  → useful predecessor implementation of SDS bootstrap/preflight
  → REPLACE after BOOTSTRAP-SDS route is installed
  → do not retain as a second SDS governance owner
```

Before physical repository mutation, still reread the actual checkout once for drift after `ca768b61...`; the current ledger no longer depends on the older unconfirmed patch assumption.

---

## 2. Executive Verdict

### 2.1 Methodology internal consistency

Current separated methodology passes its current mechanical/core-SDS audit:

```text
16 SDS Target Modules
17 reusable Lenses
  11 IDTSPE Core/generic
  6 SDS-specific
34 AP records
24 AG records
58 Artifact Placement source guidance records
58/58 source-record integrity; Target Module AP owns Target-result representation while Lens AG is reserved for Lens-produced findings/supporting material; human-facing projection remains the annotated Artifact Materialization Tree
Core / SDS physical split
IDTSPE bootstrap + SDS bootstrap
Directed SDS workflow
TM-WEUC / WEUC Lens split
Global Architecture Position in SDS-WORKSPACE-EVOLUTION
Testing layering/order
```

### 2.2 Repository parity verdict

Fresh supplied-snapshot inventory used by this audit:

```text
application-planning files: 35
architecture-planning files: 18
testing-planning files: 17
old collect-ideas command definitions: 6
files directly referencing old Idea owner documents: 22
files containing active/historical collect-ideas IDs/phrases: 35
files containing old Contextual-WEUC/WEUC-Instance terminology: 32
```

These counts are discovery signals, not deletion counts; history/logs and generated projections are classified separately below.

The **main SDS semantic responsibilities are covered** by the current methodology, but repository parity is **not yet complete enough to delete every old owner immediately**.

Use three classes:

```text
COVERED / REPLACE
  current methodology already owns the meaning cleanly;
  old repository owner may be superseded after references are migrated.

CONFLICT / REMOVE
  old repository model is an incompatible predecessor/parallel runtime;
  do not carry its model forward.

COMPLEMENTARY / MERGE BEFORE REMOVE
  old repository file contains useful non-conflicting detail
  that current methodology does not yet state strongly enough.
```

The critical result is:

```text
old Idea / collect-ideas runtime
  → CONFLICT / REMOVE

old formal Contextual WEUC Instance + WEUC Instance Register
  → CONFLICT / REMOVE

core Application/Scenario/Domain/Slice semantics
  → COVERED

Q/R/P priority + related groups + Decision Addresses/Exposes
  → SELECTIVELY MERGED into existing IDTSPE P-09/P-10

detailed testing knowledge
  → PRESERVED RAW as Theoretical Module `THM-TESTING-DETAIL-CA768B61`; not yet operationally merged

AI Reviewability Key Points
  → SELECTIVELY PRESERVED as independent peer concern beside IDTSPE

exact-literal Reference Object criteria
  → STILL COMPLEMENTARY / MERGE BEFORE REMOVE

architecture work-cost/state/path heuristics
  → MERGED into existing WEUC Lens / L5

realization-sanity stress checks
  → REPLACED/MERGED as Simplicity / Implementation Economy Lens

Workspace Work / Workspace UC architecture model
  → CLASSIFIED AS LEGACY WEUC; useful path/work-cost surfaces already absorbed by current L5; no separate generic Core owner required
```

---

## 3. Semantic Coverage Matrix

| Repository concern | Current methodology owner | Coverage | Migration conclusion |
|---|---|---:|---|
| Need / Current Reality / whole-solution choice | SDS workflow 01–03 + `TM-APPLICATION-DEFINITION` + L1/Application Feasibility | **Strong** | Replace old Application planning owner after routing migration |
| Existing/manual/process/integration/no-change/custom/hybrid alternatives | `TM-APPLICATION-DEFINITION` + existing-solution research contract | **Strong** | Old naming such as `Viable Existing Alternative` need not remain a separate ontology |
| Application Concept / Responsibility | `TM-APPLICATION-DEFINITION` | **Strong** | Existing focused commands can be reused/adapted |
| Prototype | `TM-PROTOTYPE` + Practical Evidence Lens | **Strong** | Replace old Prototype workflow/templates |
| Scenario planning / behavior / decomposition / change outlook | `TM-SCENARIO-PLANNING` | **Strong** | One Scenario Target owns free-form Behavior/Requirements, processed DATA + Behavior Items, and Development/Change Outlook; boundary discovery is built into Evaluation and any catalog is navigation only |
| Screen / spatial owner | `TM-SCREEN` + UI/Spatial Lens | **Strong** | Replace old Screen template/workspace rules |
| Requirement ownership | `TM-REQUIREMENT` + narrow-owner exception rule | **Strong** | Replace old Requirement registry-first framing; zero standalone Requirements remains valid |
| Domain discovery/modeling | `TM-DOMAIN-DISCOVERY`, `TM-DOMAIN-DRAFT`, Domain/DDD Lens | **Strong** | Replace old Domain workflows/templates |
| Domain verification meaning | Domain modules + `TM-TEST-DESIGN` | **Strong** | Preserve direct Domain→Test Design flow |
| Slice Strategy | `TM-SLICE-STRATEGY` + Slice Lens | **Strong** | Replace old Slice Strategy owner/template |
| Implementation Slice | `TM-IMPLEMENTATION-SLICE` | **Strong** | Replace old Slice workflow/template |
| Frontend promoted responsibility | `TM-FRONTEND-SLICE` | **Stronger/newer** | Old repo lacks equivalent explicit Target; add command/owner surface |
| Shared Cross-Cutting implementation responsibility | `TM-CROSS-CUTTING-CONCERN` + Shared Lens | **Stronger/newer** | Add explicit owner surface; do not confuse with Q/R/P Concern |
| Testing Strategy | `TM-TEST-STRATEGY` | **Strong operational core + raw theory preserved** | Reuse command; detailed old guidance is preserved unchanged in `THM-TESTING-DETAIL-CA768B61` until later promotion decisions |
| Test Design | `TM-TEST-DESIGN` + Test Proof Lens | **Strong operational core + raw theory preserved** | Reuse command; consult the theoretical testing package conditionally instead of prematurely merging its API/E2E/test-object detail |
| Practical Test | `TM-PRACTICAL-TEST` + Practical Evidence Lens | **Strong** | Reuse/adapt command; replace old workflow/template |
| Test Coverage | `TM-TEST-COVERAGE` | **Strong operational core + raw theory preserved** | Reuse command; evidence-state theory remains available intact in the theoretical testing package |
| Workspace Evolution | `TM-WEUC` | **Current model intentionally different** | Remove old Contextual-WEUC-instance runtime |
| Global project architecture position | `TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION` + WEUC Lens | **Strong; SDS work-cost heuristics merged** | Architecture/Workspace work-cost belongs to existing L5; no second architecture/work-cost Lens |
| Per-Target evolvability/architecture check | WEUC Lens / `lenscmd.weuc.check` | **Strong/newer** | Replace old dedicated Architecture Decision/Pressure flow where it only served SDS |
| Loose future Ideas | `SDS-PLANNING-STATE/ideas/...` | **Strong/newer** | Keep Ideas as unselected persistence/routing only |
| Idea-driven Current Plan runtime | IDTSPE Shell supersedes it | **Intentional conflict** | Delete old Idea-planning runtime and `собери идеи*` commands |
| Q/R/P attachment | IDTSPE P-09 + `qrp-priority-groups-and-decision-trace.md` | **Strong / selectively extended** | Keep existing Q/R/P; preserve P0..P3 impact priority, related Q/R/P groups and Decision `Addresses / Exposes`; do not recreate the old Concern runtime |
| Artifact/file placement | Documentation / Representation Lens + P-14 / TF-10 + AP/AG source guidance/materialization tree | **Stronger/newer** | Adapt `plan-file-update` and other file-planning consumers; do not preserve one-file-per-Target assumptions |
| Repeated refinement/revalidation | IDTSPE invocation modes + revalidation helpers | **Strong/newer** | Retire old progressive-plan-refinement as a parallel shell after direct consumers are repointed; selected useful Q/R/P trace mechanics are already merged |
| Physical Mini/Modular/Full | SDS planning context + Documentation/Representation policy + adaptive materialization topology | **Covered as physical profile** | Existing profile commands may be adapted as optional shortcuts, not semantic runtimes; do not restore fixed one-file-per-Target trees |
| AI reviewability / Key Points | `active/ai-reviewability/` peer concern | **Selected useful concept preserved** | Keep Key Points as independent review projection beside IDTSPE; do not fold the whole old AI-reviewability planning-direction file into Core |
| Reference Object exact-copy semantics | Reference Object gate remains intentionally open; Linked Notes usage is now separately resolved by Core `LENS-LINKED-NOTES-USAGE-JUSTIFICATION` | **Partial** | Merge exact-literal/materialized-copy candidate rule before deleting old detailed-planning owner; do not create Linked Notes storage |
| Workspace Work / Workspace UC architecture input | current WEUC Lens / L5 | **Legacy WEUC superseded** | Treat the old Workspace-UC/work model as prior WEUC architecture; useful work-cost/path surfaces are already in L5, so no separate generic Core capability is required |

---

## 4. Confirmed Obsolete / Conflicting Repository Models

### 4.1 Old Idea / `collect-ideas` planning runtime

Repository current flow is effectively:

```text
source
→ Idea Review
→ Ideas / Idea Variants
→ Current Plan
→ Q/R/P + Concern Groups
→ contextual/preliminary Semantic Integration
→ Current Overall Conclusions
→ explicit Pre-Update
→ realization/evidence
```

This is a predecessor/parallel planning shell to IDTSPE.

Current model is:

```text
Source + current owner artifacts
→ Target Formation
→ Target Module + Lenses
→ Questions / Ideas / Branches / Q/R/P
→ Decisions
→ Target output
→ Artifact Placement View
→ persisted current owners
→ Methodology Direction / next Target
```

Therefore:

```text
old Idea object evaluation may contribute local reasoning
but
old Idea planning shell / Current Plan orchestration
must NOT survive as a second runtime.
```

Current SDS `ideas/` folders are **not** this old runtime. They only preserve loose/unselected possibilities until routed/selected/retired.

### 4.2 Old Contextual WEUC Instance / Register model

Repository current Architecture/SDS files repeatedly require:

```text
WEUC Type
→ Contextual WEUC Instance
→ likelihood / horizon / value / confidence
→ WEUC Instance Register
→ Change Pressure / Change Axis
→ Architecture Decision
```

Current methodology intentionally replaced it with:

```text
SDS-EVOLUTION-MAP
↓
TM-WEUC
↓
SDS-WORKSPACE-EVOLUTION.md
  Current Global Architecture Position
  Evolution Interpretation
  Planned / Probable Evolution Paths
  Prepared Extension Points
  Transition Position
↓
WEUC Lens inside a concrete Target
↓
local Answer Decision / evolution companion
or global update candidate → TM-WEUC
```

Do **not** preserve mandatory `Contextual WEUC Instance`, `WEUC Type registry`, or `WEUC Instance Register` as parallel authority.

### 4.3 Old per-owner/per-Scenario Idea workspace topology

Old Full/detailed SDS allows/encourages structures such as:

```text
SCN-X/ideas/
scenario-drafts/ideas/
Domain-local idea workspaces
```

Current SDS has one canonical planning-state idea area:

```text
SDS-PLANNING-STATE/ideas/
  INBOX.md
  early/IDEAS.md
  scenario/IDEAS.md
  domain/IDEAS.md
  realization/IDEAS.md
```

An Idea may reference a specific Target/owner, but persistence should not recreate multiple second-authority Idea workspaces by default.

### 4.4 Separate Architecture Decision semantic root

Old repo has `UC-PLAN-ARCH-DECISION` + `прими архитектурное решение` as an independent architecture capability.

Current SDS rule:

```text
architecture choice inside a Domain/Slice/Frontend/etc Target
→ ordinary Answer Decision of that Target

project-global architecture position
→ TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION

architecture/evolution review of a selected Target
→ WEUC Lens command
```

A separate architecture decision artifact may still be justified for durable cross-owner history/navigation, but it does not create a mandatory semantic Target/UC root.

---

## 5. Merge-Blocking Complementary Knowledge

These findings are **not reasons to retain the old runtime**. They are migration inputs that should be integrated into the current canonical methodology before the corresponding old owners are removed.

### MB-01 — Existing Q/R/P Selective Extension — **MERGED IN PART 2**

Sources:

```text
planning/documentation/planning-concerns-and-decisions-model.md
planning/documentation/progressive-plan-refinement-workflow.md
```

Correction to the earlier audit wording: **IDTSPE already had Q/R/P as P-09.** The migration does not add Q/R/P and does not create a new Concern runtime.

Selected useful mechanics now merged into [`active/idtspe-core/shared/qrp-priority-groups-and-decision-trace.md`](../active/idtspe-core/shared/qrp-priority-groups-and-decision-trace.md):

```text
P0 / Critical
P1 / High
P2 / Normal
P3 / Low
  = impact priority, not confidence/review order

related Q/R/P groups
  = group Question/Risk/Problem when causal/dependency/resolution linkage is useful
  = navigation/review projection, not semantic owner/register

Decision.Addresses
  = Q/R/P materially answered/resolved/mitigated by the Decision

Decision.Exposes
  = Q/R/P created/revealed/made material by the Decision
```

Not promoted from the old runtime by this decision:

```text
mandatory Area Concern Register
full Concern Category ontology
large status machines
separate Concern planning shell
Review Order queue machinery
```

Those old structures are not required for current IDTSPE operation.

**Part-2 resolution:** MB-01 is closed as a selective merge. Old Concern/refinement owners may be removed after active consumers are repointed to IDTSPE P-09/P-10 and the new lightweight trace contract.

### MB-02 — Reusable Architecture Work-Cost / Understanding Heuristics — **MERGED IN PART 1**

Sources include:

```text
planning/documentation/architecture-planning/architecture-planning-principles-and-terminology.md
planning/documentation/architecture-planning/architecture-state-review-workflow.md
planning/documentation/architecture-planning/architecture-path-analysis-workflow.md
planning/documentation/architecture-planning/workspace-use-cases-and-change-pressure.md
planning/documentation/architecture-planning/workspace-use-case-discovery-workflow.md
planning/documentation/architecture-planning/architecture-change-pressure-workflow.md
planning/documentation/architecture-planning/architecture-evolution-workflow.md
```

Useful non-conflicting material not yet explicit enough in current L4/L5/L6:

```text
architecture complexity must be paid for
understanding/discoverability/working-context cost
names and semantic vocabulary as navigation interface
Semantic DRY
composition vs inheritance as a tradeoff, not dogma
conditional interface/Port rule
dependency stability direction
state ownership
persistence boundary vs ORM/domain conflation
sync/async pressure
explicit composition
test seam only where a real boundary exists
reversibility

current complexity classification:
  Essential / Intentional
  Accidental
  Speculative
  Legacy

whole-workspace path cost surfaces:
  Understanding
  Mutation / Change
  Verification / Diagnosis / Operation
  Runtime

important Workspace work:
  read / understand / find / navigate / trace
  change / write
  inspect / review
  verify / diagnose / operate
```

**Part-1 resolution:** the SDS architecture/work-cost responsibility is merged into the existing `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` / L5. L5 now evaluates Understanding/Discoverability/Working-Context, Mutation/Change, Verification/Diagnosis/Operation and Runtime path cost; Workspace work surfaces; Semantic DRY; state/dependency/persistence boundaries; reversibility; and Essential/Intentional vs Accidental/Speculative/Legacy complexity. **Do not create a second architecture/work-cost Lens.** The old Workspace Work / Workspace UC architecture model is classified below as legacy WEUC rather than a separate generic Core capability.

### MB-03 — Realization Sanity → Simplicity / Implementation Economy — **MERGED IN PART 1**

Source:

```text
planning/documentation/application-planning/application-realization-workflow.md
```

Useful checks not currently explicit enough:

```text
representative runtime realization paths
persistence shape
transaction / atomicity boundaries
concurrency
remote calls / integration failure
retry
algorithm/data-volume pressure
pathological mapping/coordination
impossible distributed-transaction assumptions
verification seams

Candidate-Domain Comparative Mode:
  compare plausible Domain candidates against realization sanity
  return evidence upstream
  never let implementation convenience become Domain authority
```

**Part-1 resolution:** replace the old realization-sanity workflow role with the reusable SDS `LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`. The Lens inventories abstractions/owners/hops/mappings/state/test machinery, asks what each layer pays for, generates a materially simpler candidate, then checks that simplification against Current Global Architecture Position, global planned/probable paths, prepared extension points and target-local evolution companions. It is attached to Domain/Slice/Test planning and preserves the rule that implementation convenience cannot redefine Domain meaning.

### MB-04 — Detailed Testing Knowledge — **PRESERVED AS THEORETICAL MODULE IN PART 2**

Sources preserved **byte-for-byte** from repository base `ca768b61...`:

```text
planning/documentation/testing-planning/testing-planning-principles-and-terminology.md
planning/documentation/testing-planning/api-integration-test-guidance.md
planning/documentation/testing-planning/e2e-testing-guidance.md
planning/documentation/testing-planning/test-object-patterns.md
```

Destination:

```text
active/theoretical-modules/testing/
→ THM-TESTING-DETAIL-CA768B61
```

The decision is deliberately **not** to merge/rewrite this theory yet. Target Modules/Lenses represent processed operational knowledge with known applicability/timing; this testing material still contains useful detail whose final placement may evolve.

```text
TM-TEST-* + Test Proof Lens
= current operational authority

THM-TESTING-DETAIL-CA768B61
= raw reference theory
= read conditionally when detailed testing knowledge is useful
= cannot silently override processed methodology
```

**Part-2 resolution:** MB-04 is closed as a preservation blocker. The old supporting-guidance files may be removed from their old repository location once the new theoretical module package is installed and navigation points to it; future methodology work may promote selected theory into normal modules/lenses.

### MB-05 — AI Reviewability / Key Points — **SELECTIVELY PRESERVED IN PART 2**

Source:

```text
planning/documentation/ai-reviewability-and-directed-planning-principles.md
```

Selected concept preserved as an independent peer package:

```text
active/ai-reviewability/README.md

Key Points
→ material answer exposes its major conclusions
→ scanning Key Points should reveal every material conclusion
→ supporting evidence/reasoning remains in the body
→ KP-* IDs optional
→ Key Points are a review projection, not semantic authority
```

AI Reviewability is intentionally **beside IDTSPE**, not embedded as another Target Module/Lens/Profile. IDTSPE outputs may use it, but it does not own planning semantics.

Other old rules from the same file are not automatically imported merely because they shared the old owner.

**Part-2 resolution:** MB-05 is closed for the selected Key Points requirement. The old file can be retired after consumers are repointed to the peer reviewability package and any separately desired remaining rules are consciously classified.

### MB-06 — Exact-Literal Reference Object Candidate Rule

Sources:

```text
planning/documentation/application-planning/application-planning-principles-and-terminology.md
planning/documentation/application-planning/detailed-planning/README.md
planning/documentation/application-planning/requirements-and-change-context.md
```

Linked Notes usage is now resolved separately as an optional navigation/backlink/query capability with no notes storage. The remaining open issue here is specifically the old repo's sharper Reference Object gate:

```text
ordinary semantic dependency
→ ordinary link

canonical literal meaning intentionally materialized in several files
+ exact equality matters
+ stale-copy checking would be useful
→ Reference Object Candidate
```

**Required before deleting detailed-planning owner:** merge this gate into IDTSPE Core Artifact Boundary/File Realization guidance.

### MB-07 — Workspace Work / Workspace UC — **CLOSED: LEGACY WEUC**

The earlier audit treated this as a possible generic non-SDS Workspace capability gap. That interpretation is rejected. The Workspace Work / Workspace UC architecture model belongs to the **older WEUC architecture generation**.

Useful surfaces already retained in current WEUC Lens / L5 include:

```text
read / understand / find / navigate / trace
change / write
inspect / review
verify / diagnose / operate

Understanding / Discoverability / Working-Context cost
Mutation / Change cost
Verification / Diagnosis / Operation cost
Runtime path cost
```

There is no need to create a separate generic Core Workspace-UC model merely to preserve that ontology. Current SDS uses:

```text
SDS-EVOLUTION-MAP
+ SDS-WORKSPACE-EVOLUTION.md
+ TM-WEUC
+ WEUC Lens / L5
```

Any repository `Workspace UC`/Workspace-work family must therefore be reviewed as legacy WEUC/UCDS material during migration, not protected by default as an independent future IDTSPE profile. Unique non-WEUC knowledge, if found later, can still be classified separately.

**Part-2 resolution:** MB-07 is closed; it is no longer a blocker requiring a new Core owner.

---

## 6. Exact Repository Removal / Migration Matrix

Status vocabulary for this ledger:

```text
KEEP
KEEP_HISTORY
ADAPT
REPLACE
MERGE_THEN_REMOVE
REMOVE_AFTER_MIGRATION
PRESERVE_AND_MIGRATE_DATA
GENERATED_REBUILD
TBD_AFTER_FRESH_CHECKOUT
```

### 6.1 Old Idea Runtime — Remove

These are obsolete as independent planning authorities after IDTSPE Core is installed and consumers are repointed:

```text
planning/documentation/idea-planning-principles-and-terminology.md
planning/documentation/idea-review-and-planning-workflow.md
planning/documentation/IDEA-REVIEW-TEMPLATE.md
planning/documentation/examples/COLLECT-IDEAS-PRACTICAL-EXAMPLE.md

planning/commands/collect-ideas.command.md
planning/commands/collect-application-ideas.command.md
planning/commands/collect-modular-application-ideas.command.md
planning/commands/collect-scenario-ideas.command.md
planning/commands/collect-domain-ideas.command.md
planning/commands/collect-slice-ideas.command.md

planning/helper-library/commands/item-1puy321-w7i09l.helper-command.md
```

Status: **REMOVE_AFTER_MIGRATION**.

Do not delete until all direct references listed in §8 are adapted and helper projections are regenerated.

### 6.2 Generic Concern / Refinement Owners — Merge Then Remove

```text
planning/documentation/planning-concerns-and-decisions-model.md
planning/documentation/progressive-plan-refinement-workflow.md
```

Status: **REMOVE_AFTER_MIGRATION / PART-2 MERGED** via MB-01.

Selected useful semantics are now in existing IDTSPE Q/R/P mechanics plus `qrp-priority-groups-and-decision-trace.md`; do not preserve the old Concern shell as a second runtime.

### 6.3 Generic AI Reviewability Owner — Merge Then Remove/Replace

```text
planning/documentation/ai-reviewability-and-directed-planning-principles.md
```

Status: **REMOVE_AFTER_MIGRATION / SELECTIVELY PRESERVED** via MB-05. Route reviewability consumers to the independent `active/ai-reviewability/` package, not into IDTSPE semantic ownership.

### 6.4 Application Planning Methodology Family

Once the current SDS package is installed, the new Simplicity Lens is linked, and MB-06 is merged, the old Application/SDS methodology family should stop being a second authority.

#### Remove/supersede methodology owners

```text
planning/documentation/application-planning/README.md
planning/documentation/application-planning/application-planning-governance-read-workflow.md
planning/documentation/application-planning/application-planning-principles-and-terminology.md
planning/documentation/application-planning/application-planning-responsibility-map.md
planning/documentation/application-planning/application-realization-workflow.md
planning/documentation/application-planning/detailed-planning/README.md
planning/documentation/application-planning/direction-registry.md
planning/documentation/application-planning/domain-discovery-workflow.md
planning/documentation/application-planning/domain-planning-workflow.md
planning/documentation/application-planning/prototype-planning-workflow.md
planning/documentation/application-planning/requirements-and-change-context.md
planning/documentation/application-planning/slice-planning-workflow.md
planning/documentation/application-planning/solution-and-scenario-planning-workflow.md
planning/documentation/application-planning/use-case-registry.md

planning/documentation/application-planning/examples/DETAILED-PLANNING-WORKSPACE-EXAMPLE.md

planning/documentation/application-planning/templates/APPLICATION-CONCEPT-DRAFT-TEMPLATE.md
planning/documentation/application-planning/templates/CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md
planning/documentation/application-planning/templates/DOMAIN-DRAFT-TEMPLATE.md
planning/documentation/application-planning/templates/FUNCTIONAL-WORKFLOW-DRAFT-TEMPLATE.md
planning/documentation/application-planning/templates/IMPLEMENTATION-SLICE-DRAFT-TEMPLATE.md
planning/documentation/application-planning/templates/OPPORTUNITY-AND-ECOSYSTEM-RESEARCH-DRAFT-TEMPLATE.md
planning/documentation/application-planning/templates/PRODUCT-LEGEND-DRAFT-TEMPLATE.md
planning/documentation/application-planning/templates/PROTOTYPE-PLAN-TEMPLATE.md
planning/documentation/application-planning/templates/PROTOTYPE-RESULT-TEMPLATE.md
planning/documentation/application-planning/templates/SCENARIO-DRAFT-TEMPLATE.md
planning/documentation/application-planning/templates/SCREEN-DRAFT-TEMPLATE.md
planning/documentation/application-planning/templates/SLICE-STRATEGY-DRAFT-TEMPLATE.md
planning/documentation/application-planning/templates/SOLUTION-OVERVIEW-DRAFT-TEMPLATE.md
```

Status: **REMOVE_AFTER_MIGRATION**. `application-realization-workflow.md` is no longer a semantic blocker because its useful sanity intent has been merged into the Simplicity Lens; Reference-Object-bearing files remain blocked by MB-06 until that gate is merged.

`application-planning-governance-read-workflow.md` is newly confirmed in `ca768b61...`. Preserve its useful proportional governance-read behavior through current `BOOTSTRAP-SDS` / command-routing preflight semantics, but remove the old file after consumers are repointed because its concrete read set still names the obsolete Idea runtime, old SDS profiles and old Contextual-WEUC workflow.

#### Preserve history/data

```text
planning/documentation/application-planning/action-log.md
```

Status: **KEEP_HISTORY** or move intact to an archive/history location; do not rewrite old log semantics merely to remove old terminology.

```text
planning/documentation/application-planning/drafts/current-workflow-and-problem-analysis.md
```

Status: **PRESERVE_AND_MIGRATE_DATA**. It is a large real working draft (~58 KB), not a starter template. Move/re-home its still-current meaning into the appropriate project/Application SDS owners before old directory removal.

#### Empty starter drafts

```text
planning/documentation/application-planning/drafts/opportunity-and-ecosystem-research.md
planning/documentation/application-planning/drafts/product-legend.md
planning/documentation/application-planning/drafts/prototype-plan.md
planning/documentation/application-planning/drafts/prototype-result.md
planning/documentation/application-planning/drafts/solution-overview.md
```

They explicitly say `Status: empty starter draft` and contain `not provided` placeholders.

Status: **REMOVE_AFTER_MIGRATION**; do not migrate as project truth.

### 6.5 Old SDS Physical Profile Owners

```text
planning/documentation/profiles/sds-planning-profiles.md
planning/documentation/profiles/scenario-domain-slice-docs-profile.md
```

Status: **REMOVE_AFTER_MIGRATION**.

Replacement owners:

```text
active/profiles/sds/SDS-FULL-MAP.md
active/profiles/sds/SDS-PHYSICAL-PLANNING-TREE.md
active/profiles/sds/shared/sds-planning-context-template.md
active/profiles/sds/shared/artifact placement contracts
```

Reason: old profiles contain stale per-owner Ideas topology and Contextual WEUC/WEUC Instance Register contracts.

### 6.6 Architecture Planning Family

#### Direct incompatible WEUC owners

```text
planning/documentation/architecture-planning/workspace-evolution-use-case-discovery-workflow.md
planning/documentation/architecture-planning/templates/WEUC-INSTANCE-REGISTER-TEMPLATE.md
```

Status: **REMOVE_AFTER_MIGRATION** once `TM-WEUC` / `SDS-WORKSPACE-EVOLUTION.md` is installed and all command/profile references are updated.

Do not merge the mandatory contextual-instance/register ontology.

#### Legacy Architecture / WEUC owners — current useful heuristics already merged

```text
planning/documentation/architecture-planning/architecture-planning-principles-and-terminology.md
planning/documentation/architecture-planning/architecture-state-review-workflow.md
planning/documentation/architecture-planning/architecture-path-analysis-workflow.md
planning/documentation/architecture-planning/workspace-use-cases-and-change-pressure.md
planning/documentation/architecture-planning/workspace-use-case-discovery-workflow.md
planning/documentation/architecture-planning/architecture-change-pressure-workflow.md
planning/documentation/architecture-planning/architecture-decision-workflow.md
planning/documentation/architecture-planning/architecture-evolution-workflow.md
planning/documentation/architecture-planning/architecture-planning-responsibility-map.md
planning/documentation/architecture-planning/README.md
planning/documentation/architecture-planning/direction-registry.md
planning/documentation/architecture-planning/use-case-registry.md
planning/documentation/architecture-planning/templates/ARCHITECTURE-DECISION-TEMPLATE.md
planning/documentation/architecture-planning/templates/ARCHITECTURE-PATH-ANALYSIS-TEMPLATE.md
planning/documentation/architecture-planning/templates/CHANGE-PRESSURE-REVIEW-TEMPLATE.md
planning/documentation/architecture-planning/examples/ARCHITECTURE-PLANNING-WORKED-EXAMPLE.md
```

Status: **REMOVE_AFTER_MIGRATION** as a parallel old Architecture/WEUC family. L5 work-cost checks are installed and MB-07 is closed as legacy WEUC.

Expected destination is not necessarily all SDS:

```text
architecture/work-cost/understanding/path heuristics
→ existing SDS WEUC Lens / L5 (merged); no second work-cost Lens

SDS-specific future evolution/global architecture
→ TM-WEUC + WEUC Lens

local architecture choice
→ Answer Decision in the current Target
```

Do not preserve Workspace-UC/UCDS planning merely because it was previously labeled generic: per MB-07 it is treated as legacy WEUC-era architecture/planning material. Preserve only independently classified unique knowledge or project data.

### 6.7 Testing Planning Family

#### Core workflows replaced by Target Modules

```text
planning/documentation/testing-planning/testing-strategy-workflow.md
planning/documentation/testing-planning/test-design-workflow.md
planning/documentation/testing-planning/practical-testing-plan-workflow.md
planning/documentation/testing-planning/test-coverage-review-workflow.md
planning/documentation/testing-planning/testing-planning-responsibility-map.md
planning/documentation/testing-planning/README.md
planning/documentation/testing-planning/direction-registry.md
planning/documentation/testing-planning/use-case-registry.md

planning/documentation/testing-planning/templates/TEST-COVERAGE-REVIEW-TEMPLATE.md
planning/documentation/testing-planning/templates/TEST-DESIGN-DRAFT-TEMPLATE.md
planning/documentation/testing-planning/templates/TEST-STRATEGY-DRAFT-TEMPLATE.md
planning/documentation/testing-planning/templates/TESTING-PLAN-TEMPLATE.md

planning/documentation/testing-planning/examples/TEST-DESIGN-PRACTICAL-EXAMPLE.md
```

Status: **REMOVE_AFTER_MIGRATION**, after command routes point to `TM-TEST-*`.

#### Supporting guidance — preserved as Theoretical Module

```text
planning/documentation/testing-planning/testing-planning-principles-and-terminology.md
planning/documentation/testing-planning/api-integration-test-guidance.md
planning/documentation/testing-planning/e2e-testing-guidance.md
planning/documentation/testing-planning/test-object-patterns.md
```

Status: **REMOVE_AFTER_MIGRATION / RAW COPY PRESERVED** via MB-04. Exact source bodies now live in `active/theoretical-modules/testing/`; do not rewrite them during this migration.

### 6.8 Workspace Planning / Workspace UC Family

```text
planning/documentation/workspace-planning/
```

Status: **REPLACE / REMOVE_AFTER_MIGRATION as legacy WEUC/UCDS family**, subject to normal per-file data/history checks.

Reason: the previous protection as a separate generic non-SDS capability is withdrawn by MB-07. Workspace UC / Workspace Work is treated as an older WEUC-era model. Useful architecture/path/work-cost semantics already live in current L5; do not create a new generic Core Workspace-UC owner just to preserve this family.

### 6.9 Historical Logs

Files such as:

```text
planning/action-log.md
planning/documentation/action-log.md
planning/documentation/application-planning/action-log.md
planning/documentation/tools/tampermonkey/chat-command-palette/action-log.md
...
```

may legitimately mention `собери идеи`, Contextual WEUC, or old file names as historical facts.

Status: **KEEP_HISTORY** unless a separate retention policy says otherwise.

Tombstone searches after migration must exclude recognized historical logs rather than rewriting history.

---

## 7. Command Migration Matrix

### 7.1 Commands to retire

```text
ideas.collect
ideas.collect.application
ideas.collect.application.modular
ideas.collect.scenario
ideas.collect.domain
ideas.collect.slice
```

Files: the six `collect-*.command.md` files in §6.1.

Reason: they expose the obsolete Idea/Current-Plan orchestration shell.

### 7.2 Existing commands that are good reuse/adapt candidates

| Existing command ID | Current phrase | Desired route |
|---|---|---|
| `application_prototype.plan` | `прототип приложения` | `TM-PROTOTYPE` |
| `application_scenarios.discover` | `собери сценарии приложения` | focused Scenario-boundary entry → `TM-SCENARIO-PLANNING` / Target Formation |
| `application_scenario.plan` | `план сценария приложения` | `TM-SCENARIO-PLANNING` |
| `application_domain.discover` | `исследуй домен приложения` | `TM-DOMAIN-DISCOVERY` |
| `application_domain.plan` | `план домена приложения` | `TM-DOMAIN-DRAFT` |
| `application_slice_strategy.plan` | `план стратегии слайсов` | `TM-SLICE-STRATEGY` |
| `application_slice.plan` | `план слайса приложения` | `TM-IMPLEMENTATION-SLICE` |
| `testing_strategy.plan` | `стратегия тестирования` | `TM-TEST-STRATEGY` with new entry gate/order |
| `test_design.plan` | `спланируй проверку поведения` | `TM-TEST-DESIGN`; add Domain/Slice typed aliases as useful |
| `practical_testing.plan` | `план практического тестирования` | `TM-PRACTICAL-TEST` |
| `test_coverage.review` | `проверь тестовое покрытие` | `TM-TEST-COVERAGE` |
| `application_concept.plan` | `план концепции приложения` | focused `TM-APPLICATION-DEFINITION` scope |
| `application_responsibility.establish` | `определи ответственность приложения` | focused `TM-APPLICATION-DEFINITION` scope |
| `application_reality.review` | `разбери текущую реальность` | focused Need/Application-definition route |
| `application_research.research` | `исследуй альтернативы решения` | focused Application Definition research route |
| `application_solution.plan` | `план решения` | solution/application route under current SDS workflow |

### 7.3 Missing canonical SDS Target command surfaces in supplied snapshot

Current methodology requires all 17 TMs to be commandable. Supplied snapshot lacks clean canonical surfaces for at least:

```text
TM-APPLICATION-DEFINITION umbrella
TM-SCREEN
TM-REQUIREMENT
TM-WEUC under the new map-based semantics
TM-FRONTEND-SLICE
TM-CROSS-CUTTING-CONCERN
```

The repository has old `architecture_weuc.discover`, but that command is **not semantically reusable unchanged** because it requires Contextual WEUC Instances/Register.

### 7.4 Architecture commands

| Existing command | Status | Migration |
|---|---|---|
| `architecture_weuc.discover` / `собери WEUC` | **REPLACE** | new TM-WEUC map create/refine/refresh semantics; no mandatory instance register |
| `architecture_decision.plan` / `прими архитектурное решение` | **REMOVE_AFTER_MIGRATION or fold as alias** | route architecture choice through current Target Answer Decision or TM-WEUC global architecture scope; do not preserve separate Architecture Decision UC authority |
| `architecture_path.trace` | **ADAPT / retain as focused Lens command if useful** | path-cost semantics are now in L5; keep only if a focused trace command still adds invocation value |
| `architecture_pressure.review` | **ADAPT or retire after current L5 work-cost migration** | do not keep Change Pressure/Axis as mandatory upstream architecture ontology |
| `workspace_uses.discover` | **RETIRE or adapt as compatibility alias** | Workspace-UC discovery is legacy WEUC; if invocation value remains, route it to current `TM-WEUC` / `lenscmd.weuc.check`, not to a separate Workspace-UC semantic family |

Required new reusable Lens commands:

```text
lenscmd.weuc.check
→ проверь эволюцию и архитектуру <target>

lenscmd.simplicity.check
→ проверь можно ли упростить <target>

lenscmd.documentation.representation.check
→ проверь как лучше зафиксировать <target/result>

lenscmd.linked-notes.justify
→ проверь оправданы ли linked notes <target>
```

Focused global architecture route:

```text
TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION
→ продумай архитектурную позицию воркспейса
```

### 7.5 Mini / Modular / Full commands

Existing:

```text
application_sds.mini
application_sds.modular
application_sds.full
```

Status: **ADAPT**, not automatically delete.

They may remain convenience commands for physical/addressability profile selection/continuation, but their current bodies must lose:

```text
old collect-ideas runtime dependency
Contextual WEUC Instance/Register requirement
old profile file ownership
```

They must not become alternative semantic-quality modes.

### 7.6 Core Work Mode + Bootstraps

Required desired surfaces:

```text
idtspe.bootstrap
→ whole generic IDTSPE Core methodology/bootstrap

idtspe.work
→ `работай через idtspe`
→ make the Core Shell the default material-planning interpretation; scope/Target formation and AI-Idea handling happen by default

sdscmd.bootstrap
→ SDS profile bootstrap
```

The fresh `ca768b61...` snapshot now **confirms** `application_sds.bootstrap` in `planning/commands/bootstrap-application-sds-planning.command.md`, together with `UC-PLAN-ORIENT` and helper seed/catalog projection.

Migration decision:

```text
application_sds.bootstrap
→ ADAPT / reuse for sdscmd.bootstrap semantics
→ preserve useful CURRENT / TARGETED REFRESH / FULL preflight behavior
→ repoint ownerFiles away from old Application/Idea/Profile/WEUC owners

idtspe.bootstrap
→ still ADD as a separate generic Core bootstrap command

idtspe.work
→ ADD as a separate generic Core operating-mode command
→ internally refresh bootstrap when needed
→ must not force SDS/profile selection
```

---

## 8. Non-SDS Consumers That Must Be Adapted Before Idea-Owner Deletion

Direct references to old Idea owners are not limited to the six collect commands.

At minimum update these current consumers before removing old Idea files:

```text
planning/commands/critical-review.command.md
planning/commands/plan-file-update.command.md
planning/commands/work-full-sds.command.md
planning/commands/work-mini-sds.command.md
planning/commands/work-modular-sds.command.md

planning/documentation/architecture-planning/architecture-decision-workflow.md
planning/documentation/architecture-planning/architecture-evolution-workflow.md
planning/documentation/architecture-planning/templates/ARCHITECTURE-DECISION-TEMPLATE.md

planning/documentation/file-update-overview-workflow.md
planning/documentation/review-diff-review-workflow.md
planning/areas/documentation-workbench/planning-meaning-to-repository-workflow.md
planning/planning-input-conventions.md
```

Desired replacement concepts:

```text
material planning uncertainty / alternatives
→ current Target IDTSPE Questions / Ideas / Branches / Q/R/P

loose unselected SDS future possibility
→ SDS-PLANNING-STATE/ideas/<layer>/IDEAS.md

selected semantic change
→ natural Target owner

file realization
→ Artifact Placement View / P-14 / explicit authorized update
```

### `planning/planning-input-conventions.md`

Must be **ADAPT**, not delete merely because it mentions `собери идеи`.

Preserve the useful boundary that ordinary free-form user/source text does not need an artificial marker. Replace old Idea-route wording with generic IDTSPE intake/routing.

### `critical-review.command.md`

Keep the command if useful; replace old Idea-owner dependencies with IDTSPE Core consistency/review/Lens routes.

### `plan-file-update.command.md`

Keep/adapt. It should consume the current IDTSPE `Artifact Placement View` / P-14 resolution and remain the explicit physical-file planning/pre-update continuation when needed.

### ReviewDiff/documentation workflows

Keep their native responsibility, but route material corrective alternatives into the affected Target/IDTSPE rather than the old shared Idea runtime.

---

## 9. Root Governance Files Requiring Adaptation

These should not be deleted wholesale; they are repository navigation/contracts that must point to the new authority graph.

```text
planning/README.md
planning/AI-WORKING-CONTRACT.md
planning/direction-registry.md
planning/use-case-registry.md
planning/command-routing.md
planning/commands/README.md
planning/documentation/README.md
planning/documentation/documentation-responsibility-map.md
```

Key changes needed:

```text
old semantic root / Idea wording
→ IDTSPE Core bootstrap + installed profile resolution

old Application/Architecture/Testing sibling SDS authorities
→ SDS Profile / 17 Target Modules + generic Core lenses/capabilities

old Planning Concern canonical link
→ existing IDTSPE P-09/P-10 + lightweight Q/R/P priority/group/Addresses-Exposes contract

old `собери идеи`
→ no longer default planning runtime

Application behavior authority
→ Scenario owner remains

Workspace Work / Workspace UC legacy architecture
→ current TM-WEUC / WEUC Lens where still useful; do not preserve the old Workspace-UC semantic family as a default generic capability
```

---

## 10. Tampermonkey / Helper Cleanup

Canonical helper navigation/update plan: [`COMMAND-AND-HELPER-NAVIGATION-PLAN.md`](COMMAND-AND-HELPER-NAVIGATION-PLAN.md).

Key presentation invariant: SDS commands are IDTSPE invocations. The helper must present SDS Target Module commands as `IDTSPE TARGET` surfaces and SDS Lens commands as `IDTSPE LENS` checks inside/reusing an IDTSPE Target context.

Current helper implementation is reusable infrastructure and should be **ADAPTED, not replaced wholesale**.

### Keep/adapt runtime/code

```text
planning/documentation/tools/tampermonkey/chat-command-palette/src/command-definition-codec.js
planning/documentation/tools/tampermonkey/chat-command-palette/src/command-catalog.js
planning/documentation/tools/tampermonkey/chat-command-palette/src/semantic-projections.js
planning/documentation/tools/tampermonkey/chat-command-palette/src/planning-helper-ui.js
planning/documentation/tools/tampermonkey/chat-command-palette/src/planning-helper-runtime.js
planning/documentation/tools/tampermonkey/chat-command-palette/src/repository-catalog-service.js
planning/documentation/tools/tampermonkey/chat-command-palette/build-chat-command-palette.mjs
planning/documentation/tools/tampermonkey/chat-command-palette/verify-chat-command-palette.mjs
relevant tests
```

Add optional backward-compatible `helperPresentation.whenToUse / whatYouGet` per current methodology contract.

### Regenerate/update projections

```text
planning/documentation/tools/tampermonkey/chat-command-palette/catalog-order.json
planning/documentation/tools/tampermonkey/chat-command-palette/seed/commands.json
planning/documentation/tools/tampermonkey/chat-command-palette/seed/use-cases.json
planning/documentation/tools/tampermonkey/chat-command-palette/seed/directions.json — if direction model changes
```

Status: **GENERATED_REBUILD / ADAPT**.

Remove from current palette/order/seeds:

```text
ideas.collect
ideas.collect.application
ideas.collect.application.modular
ideas.collect.scenario
ideas.collect.domain
ideas.collect.slice
UC-PLAN-COLLECT-IDEAS
```

Add the new IDTSPE/SDS/bootstrap/TM/Lens command surfaces after the command mapping is finalized, then project them into the planned `IDTSPE` and `SDS — IDTSPE Profile` views from `COMMAND-AND-HELPER-NAVIGATION-PLAN.md`.

### Helper docs/tests to adapt

```text
planning/documentation/tools/tampermonkey/chat-command-palette/README.md
planning/documentation/tools/tampermonkey/chat-command-palette/MANUAL-ACCEPTANCE.md
planning/documentation/tools/tampermonkey/chat-command-palette/tests/semantic-navigation.test.mjs
planning/documentation/tools/tampermonkey/chat-command-palette/tests/command-definition-codec.test.mjs
planning/documentation/tools/tampermonkey/chat-command-palette/tests/command-catalog.test.mjs
planning/documentation/tools/tampermonkey/chat-command-palette/tests/planning-helper-ui.test.mjs
planning/documentation/tools/tampermonkey/chat-command-palette/tests/planning-helper-runtime.test.mjs
```

Historical `action-log.md` stays historical.

---

## 11. Old WEUC References That Must Reach Zero In Active Governance

After migration, active non-history repository governance must not contain mandatory references to:

```text
Contextual WEUC Instance
WEUC Instance Register
WEUC Type → Contextual Instance as required architecture chain
planning/documentation/architecture-planning/templates/WEUC-INSTANCE-REGISTER-TEMPLATE.md
planning/documentation/architecture-planning/workspace-evolution-use-case-discovery-workflow.md
```

Known current consumers include old Architecture workflows/registries and:

```text
planning/commands/discover-weuc.command.md
planning/commands/discover-workspace-use-cases.command.md
planning/commands/plan-architecture-decision.command.md
planning/commands/review-architecture-pressure.command.md
planning/commands/trace-architecture-path.command.md
planning/commands/work-full-sds.command.md
planning/commands/work-mini-sds.command.md
planning/commands/work-modular-sds.command.md
planning/documentation/application-planning/README.md
planning/documentation/profiles/sds-planning-profiles.md
planning/documentation/profiles/scenario-domain-slice-docs-profile.md
Tampermonkey seeds/docs/tests
```

Replacement authority:

```text
TM-WEUC
+ SDS-WORKSPACE-EVOLUTION.md
+ WEUC Lens / lenscmd.weuc.check
```

Historical logs may retain the old phrase as historical evidence.

---

## 12. Physical SDS Planning Tree Migration

Target canonical shape is owned by:

```text
active/profiles/sds/SDS-PHYSICAL-PLANNING-TREE.md
```

Key repository migration changes:

```text
old distributed/per-owner idea workspaces
→ one SDS-PLANNING-STATE/ideas hierarchy

accepted future product/system evolution
→ SDS-EVOLUTION-MAP.md

global workspace evolution + current global architecture position
→ SDS-WORKSPACE-EVOLUTION.md

Domain current meaning
→ domain/<owner>.md

Domain future path when material
→ domain/<owner>.evolution.md

Domain proof design
→ testing/domain/<owner>.test-design.md

Slice current meaning
→ slices/SL-*.md

Slice future path when material
→ slices/SL-*.evolution.md

Slice proof design
→ testing/slices/SL-*.test-design.md
```

Do not precreate every optional file/folder. P-14/Artifact Placement decides concrete creation/update based on activated Targets and content.

---

## 13. Ordered Pre-Update Sequence

Do not perform repository deletion in arbitrary directory order. Use this dependency-aware sequence.

### Step A — Close methodology merge blockers

Before deleting old owners, close the remaining semantic preservation decisions. MB-01/02/03/04/05/07 are now closed by selective merge/preservation/reclassification; MB-06 Reference Object remains intentionally open for later discussion.

Expected additions/refinements:

```text
IDTSPE Core / peer packages:
  existing Q/R/P + priority / related groups / Decision Addresses-Exposes trace — DONE
  AI Reviewability Key Points peer package — DONE
  IDTSPE default work-mode command contract — DONE
  exact Reference Object candidate gate — OPEN / later discussion

SDS / temporary theory:
  WEUC Lens / L5 architecture-work-cost checks — DONE
  Simplicity / Implementation Economy Lens — DONE
  detailed testing knowledge preserved raw as THM-TESTING-DETAIL-CA768B61 — DONE
  legacy Workspace Work / Workspace UC classified as old WEUC — DONE
```

Then rerun methodology consistency.

### Step B — Fresh-check actual repository checkout

Before physical plan realization:

```text
verify actual HEAD/working tree
confirm no post-ca768b61 drift changes the now-confirmed application_sds.bootstrap route
rerun old-Idea/WEUC reference inventory
```

### Step C — Install new authority graph

Add/re-home:

```text
IDTSPE Core bootstrap/map/Shell/shared contracts/lenses + default work mode
AI Reviewability peer package
Theoretical Module registry + exact raw testing package
SDS bootstrap/full map/Documentation-Representation policy/materialization tree + topology coordinator/17 Target Modules/SDS Lens pack/workflow
current examples as appropriate
```

Do not leave old Application/SDS family as co-equal authority.

### Step D — Adapt repository root governance

Update root README/AI contract/direction/use-case/routing docs to point to IDTSPE Core + profiles.

### Step E — Command migration

```text
reuse/adapt good existing Target commands
add missing canonical TM commands
add idtspe.bootstrap
add idtspe.work (`работай через idtspe`)
add SDS bootstrap
add WEUC / Simplicity / Linked Notes Lens commands
retire six collect-ideas commands
adapt Mini/Modular/Full if retained
remove/fold old architecture-decision command authority
```

Every new IDTSPE command gets `When To Use` / `What You Get` metadata while old command schema remains backward compatible.

### Step F — Migrate project-local application data

Move/preserve `planning/documentation/application-planning/drafts/current-workflow-and-problem-analysis.md` if still active. Do not confuse methodology replacement with deletion of project evidence.

### Step G — Remove old Application/SDS owners

Remove old Application planning methodology/templates/examples/profiles after all active data and refs are migrated.

### Step H — Remove old WEUC runtime

Delete old contextual WEUC workflow/register template and all active references.

### Step I — Retire old Architecture/Testing families after preservation routes are installed

After current L5 is installed and the raw testing Theoretical Module / navigation are installed. MB-07 no longer requires a new destination; it is legacy WEUC.

### Step J — Remove generic old Idea/Concern shells

After all non-SDS consumers are repointed:

```text
remove old Idea runtime docs/template/example
remove old Concern/refinement owners after consumers are repointed to existing P-09/P-10 + the lightweight Q/R/P trace extension
```

### Step K — Rebuild helper projections and tests

Regenerate seeds/catalog, implement the planned `IDTSPE` / `SDS — IDTSPE Profile` navigation views and IDTSPE Target/Lens binding metadata, update helper docs/tests, then add/verify presentation metadata UI extension.

### Step L — Tombstone / consistency audit

Run exact reference checks and current-owner validation before packaging/commit.

---

## 14. Deletion Gates

A repository file/family marked for removal is deletable only when all applicable gates pass.

### Idea runtime deletion gate

Active non-history refs must reach zero for:

```text
idea-planning-principles-and-terminology.md
idea-review-and-planning-workflow.md
IDEA-REVIEW-TEMPLATE.md
ideas.collect*
UC-PLAN-COLLECT-IDEAS
```

`собери идеи` may remain only in historical logs or migration notes, not as active command/runtime authority.

### WEUC deletion gate

Active non-history refs must reach zero for:

```text
Contextual WEUC Instance
WEUC Instance Register
WEUC-INSTANCE-REGISTER-TEMPLATE.md
old workspace-evolution-use-case-discovery-workflow.md
```

### Application family deletion gate

```text
new SDS owners installed
all command/root navigation updated
active project-local drafts migrated/preserved
Simplicity Lens installed + MB-06 merged
no active links to removed templates/workflows
```

### Architecture family deletion gate

```text
L5 work-cost checks installed
MB-07 legacy Workspace-UC/Work ontology retired/repointed to current WEUC routes
new global architecture/WEUC route installed
local architecture Decision routing validated
```

### Testing family deletion gate

```text
THM-TESTING-DETAIL-CA768B61 exact raw package installed
four TM-TEST-* routes installed
commands repointed
old detailed testing files removable only after navigation points to the theoretical package
```

### Helper deletion/update gate

```text
command catalog validates
no duplicate canonical/alias IDs
all visible commands resolve through current navigation/profile model
old collect IDs absent
new TM/bootstrap/Lens surfaces present, including WEUC / Simplicity / Linked Notes direct Lens commands
info/details UI cannot invoke a command
old commands without helperPresentation still parse/run
```

---

## 15. Required Tombstone Searches After Migration

Run against active non-history repository text:

```text
rg 'ideas\.collect|UC-PLAN-COLLECT-IDEAS|собери идеи'
rg 'idea-planning-principles-and-terminology|idea-review-and-planning-workflow|IDEA-REVIEW-TEMPLATE'
rg 'Contextual WEUC|WEUC Instance Register|WEUC-INSTANCE-REGISTER|workspace-evolution-use-case-discovery-workflow'
rg 'application-planning/'
rg 'testing-planning/'
rg 'architecture-planning/'
rg 'profiles/sds-planning-profiles|scenario-domain-slice-docs-profile'
```

Every remaining non-history match must be consciously classified as:

```text
current intended compatibility link
migration note
still-unmigrated defect
```

Do not treat raw zero-match as the only goal: history/logs may legitimately mention retired terms.

---

## 16. Current Pre-Update Decision

The repository is **not ready for a single blind “replace SDS directory” mutation**.

It is ready for a staged update plan with this high-level decision:

```text
KEEP
  command/helper infrastructure
  historical logs
  active project-local planning evidence
  exact raw theoretical testing package in the new methodology

ADAPT
  root planning/AI/navigation
  reusable existing TM-like commands
  Mini/Modular/Full shortcuts if retained
  file-update/review flows
  helper codec/catalog/UI/tests

REPLACE
  old Application/SDS semantic owner family
  old SDS physical profiles
  old Testing workflow owners after raw testing theory package/navigation is installed
  old SDS-facing Architecture/Workspace-UC orchestration after current WEUC routes are installed

REMOVE
  old collect-ideas planning runtime
  six collect-ideas commands
  old Contextual-WEUC-instance/Register runtime
  obsolete generated/helper projections after regeneration

MERGE / PRESERVATION BEFORE REMOVE — still open
  exact Reference Object candidate gate

MERGED / PRESERVED IN PART 2
  existing Q/R/P → P0..P3 + related groups + Decision Addresses/Exposes
  detailed testing knowledge → exact raw Theoretical Module THM-TESTING-DETAIL-CA768B61
  AI Reviewability → independent Key Points peer concern
  Workspace Work / Workspace UC → classified as legacy WEUC; no new generic Core owner
  IDTSPE default work mode → `idtspe.work` / `работай через idtspe`

MERGED IN PART 1
  architecture work-cost/understanding/path heuristics → WEUC Lens / L5
  realization sanity/candidate-domain stress → Simplicity / Implementation Economy Lens
```

Current conclusion after Parts 1–2: the fresh `ca768b61...` snapshot remains the repository baseline; bootstrap/preflight is confirmed and adaptable. The migration strategy is now narrower: Q/R/P trace mechanics are selectively merged, detailed testing knowledge is preserved raw as a Theoretical Module, Key Points is preserved as a peer AI Reviewability concern, Workspace-UC/Workspace-Work is classified as legacy WEUC, and only MB-06 Reference Object remains an intentionally open semantic preservation decision from this audit set.

This ledger now records both the historical migration analysis and the current staged installation boundary. It still does **not** authorize destructive legacy-family cleanup or resolve MB-06 by itself.

---

## Target Step Result / IDTSPE Unit Foundational Transition — planned against `3d1ce07c69ce7819aa42d4ade1bea3d02bbe418f`

Status: **staged Core contract transition; SDS literal Unit conformance remains a follow-up ChangeSet**

This transition introduces one generic content/result model without pretending that every existing profile file has already been mechanically rewritten.

### New Core owner

```text
active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md
```

It establishes:

```text
Target Step Result
IDTSPE Unit
├─ Target Step Result Unit
└─ IDTSPE State Unit

Core
→ owns generic State Unit kinds

Target Module / Local Target Contract
→ owns target-specific Result Units/fields

Lens
→ reads/analyzes/fills/refines/challenges/checks/routes
→ may affect existing Result Units after normal resolution
→ does not define Unit kinds
```

### Target Module contract

The reusable Module model now makes explicit:

```text
Target Step-Result Contract
+ Resolution / Production Method
+ Knowledge Basis
+ Lens Profile
+ Validators
+ Handoff / Revalidation
+ Representation Guidance
```

Existing `Output Schema` / target-specific output headings remain migration-compatible projection vocabulary.

### Lens contract

New/materially revised Lenses should expose Unit Interaction / Routing:

```text
Context Reads
Focused Reads / Analysis Focus
State-Unit routing — Core-owned kinds
Fill / Refine
Challenge / Reopen
Check / Validate
Affect / Update After Resolution
External Routing
No-New-Result-Unit Guard
```

Existing installed Lens bodies remain readable through their current Inputs/Findings sections until conformance migration.

### Compatibility retained intentionally

This transition does **not** remove or renumber:

```text
P-01..P-15
TF-01..TF-10
three current durable Decision types
required Documentation / Representation Lens
P-14 / TF-10 Artifact Placement resolver
AP-* / AG-* source guidance
```

Resolution Slots are clarified as resolution-state/coordination metadata rather than a competing content ontology.

Target Formation keeps the existing `TF-01..TF-10` IDs for compatibility, while the narrative guide now distinguishes:
- `TF-01..TF-05` as the conceptual Target-formation core;
- `TF-06..TF-10` as later work-orchestration/resolution compatibility slots over the formed Target.

Supporting Target Modules are also narrowed explicitly:
- a Supporting Target Module must remain a real reusable Target Module that can make sense as its own recurring Target family;
- using it in a supporting role does not automatically instantiate a child Target;
- if a methodology/result can only exist as an internal part of one parent Target, it is represented as a Result Unit, Internal Object Contract or shared Result-Unit method instead.


### Package preparation / pre-update chronology

The foundation package lineage was:

```text
5439c9da38db610759f90e32eb67331bac2c3cde
↓ repository advanced by one commit before the foundation package was applied
d72cfc4c1682f40ec21ecaed4742213636980bad
  - intervening commit changed 22 files
  - only planning/documentation/action-log.md overlapped that package

↓ later fresh local-snapshot rebase
3d1ce07c69ce7819aa42d4ade1bea3d02bbe418f
  - complete touched-source coverage was verified
  - compared with the v4 package bases, only planning/documentation/action-log.md changed among replace paths
  - the add path remained absent at that time
  - snapshot working-tree changes had zero overlap with the foundation package operations
```

The foundation package v5 was then applied locally. The current local snapshot used for this correction already matches **all 21 v5 replacement payloads exactly**, including the newly added Unit-model owner.

Therefore:

```text
v5 foundation semantics
= already present in current local source

this correction package
= only fixes remaining ReviewDiff/provenance state
```

`5439c9da38db610759f90e32eb67331bac2c3cde` and `d72cfc4c1682f40ec21ecaed4742213636980bad` are package-preparation provenance only. `3d1ce07c69ce7819aa42d4ade1bea3d02bbe418f` is the Git base commit of the selected local snapshot; current exact replace preconditions for this correction are the snapshot bytes carried in this package.

### Next profile transition

SDS should be migrated after this Core contract is accepted, beginning with:

```text
TM-IMPLEMENTATION-SLICE
+
LENS-SLICE-VERTICALITY-INTEGRATION
+
one response example
```

Then migrate remaining SDS Target Modules/Lenses and resolve any current Lens/Target-result responsibility overlap.

The predecessor local design archive remains external comparison evidence and is not repository authority.

---

## SDS Unit / Finding-Disposition Conformance Transition — package source `c824891af9d3b77d528a6b4f17d3fac21c47ba5e`

Status: **current working-tree target state for this open ChangeSet; it becomes finalized only after an APPROVABLE cumulative ReviewDiff is accepted**

### Source state

Selected exact source snapshot:

```text
obs-planning-docs-local-base-c824891a-20260827-170946.zip
repository: github:AlexPastukhh/obs-planning-docs
snapshot base: c824891af9d3b77d528a6b4f17d3fac21c47ba5e
```

The snapshot's 46 local working-tree changes are all Replacement Package App build outputs and overlap **zero** operation paths in this ChangeSet. GitHub `main` later advanced one commit to `da098a83db7ec707fb362d998eb0267b505c6b80`; that commit changes only the registered `SCOPE-REPLACEMENT-PACKAGE-APP` child scope and also overlaps **zero** operation paths here. Exact replace preconditions still use the selected snapshot bytes carried in the package.

### Generic Core refinement

Add one explicit generic owner:

```text
active/idtspe-core/shared/finding-disposition-contract.md
```

Selected Core flow:

```text
Lens / Validator / Evidence / User / Implementation / ...
→ Finding Candidate
→ Core Finding Disposition
   materiality
   affected meaning
   semantic owner
   State/lifecycle representation
   downstream consequence
→ normal authority/resolution
→ existing Result Unit update when warranted
```

Disposition is direct when contracts make the destination obvious and becomes explicit Question/QRP/Target work only when ownership/meaning/lifecycle consequence is materially ambiguous. `Finding Candidate` is not introduced as a mandatory persisted State Unit.

### Lens contract refinement

The Lens contract is simplified to:

```text
Analysis Surface
Supported Operations:
  ANALYZE
  CHECK
  REFINE
  CHALLENGE
Typical Findings / Finding Contract
```

`REOPEN`, State-Unit creation/refinement, cross-owner handoff and Result Unit update after accepted resolution are Core disposition/lifecycle consequences, not Lens methods. The older Lens-specific `State-Unit Routing / External Routing / AFFECT / UPDATE AFTER RESOLUTION` structure is superseded by the generic Finding Disposition contract.

### SDS Target Module conformance

All **17 / 17** active SDS Target Modules explicitly declare:

```text
Resolution / Production Method
Target Step-Result Contract
Result Units
```

Generic Questions / Ideas / Q/R/P / Decisions / Evidence / Revalidation remain Core State Units. Discovery/strategy candidate inventories may be target-specific Result Units when the useful result of that Target is the candidate/decomposition space; individual alternatives still use Idea/Branch State when their own choice lifecycle is material.

### SDS Lens conformance

All **7 / 7** SDS-specific reusable Lenses explicitly declare:

```text
Analysis Surface
Supported Operations
Typical Findings
Finding Contract
```

The Lens remains perspective/evaluation authority only; Target Modules/Local Contracts own Result Units and Core owns State kinds + Finding Disposition/lifecycle.

### Reference pair

`TM-IMPLEMENTATION-SLICE` uses:

```text
RU-SLICE-01 Slice Outcome Definition
  + verification/proof-handoff meaning
RU-SLICE-02 Responsibility / Dependency Boundary
RU-SLICE-03 Runtime Path
RU-SLICE-04 Codebase Integration Path
RU-SLICE-05 Focused Part Plan(s) — optional
```

`Codebase Integration Path` is canonical wording for the previous `Integrated Implementation Plan`. Proof/Test Handoff is folded into `RU-SLICE-01` by default; `TM-TEST-DESIGN` owns concrete proof design.

Canonical explanatory example:

```text
active/profiles/sds/examples/IMPLEMENTATION-SLICE-UNIT-REFERENCE.md
```

### Architecture preserved

This migration intentionally preserves:

```text
17 SDS Target Modules
7 SDS-specific Lenses
current Target topology/purposes/Source contracts
P-01..P-15
TF-01..TF-10
three current durable Decision types
Documentation / Representation Lens
P-14 / TF-10 Artifact Placement
AP-* / AG-* compatibility
current SDS command surfaces
WEUC / Test / Scenario / Domain semantic ownership
```

It does not merge/delete Target Modules or Lenses and does not install a Game Dev profile.

### Current-source ReviewDiff preservation correction

Fresh source `obs-planning-docs-local-base-da098a83-20260827-191526.zip` based at `da098a83db7ec707fb362d998eb0267b505c6b80` shows that the original SDS migration target is already present across all 54 original operation paths.

Comparison with the corrected v2 target:

```text
48 paths
→ already equal corrected v2 target

6 paths
→ still equal v1 target
→ require correction now:
   planning/documentation/action-log.md
   planning/documentation/idtspe-methodology/MANIFEST.json
   planning/documentation/idtspe-methodology/active/FINAL-METHODOLOGY-AUDIT.md
   planning/documentation/idtspe-methodology/active/idtspe-core/BOOTSTRAP-IDTSPE.md
   planning/documentation/idtspe-methodology/active/idtspe-core/README.md
   planning/documentation/idtspe-methodology/integration/CURRENT-REPOSITORY-INTEGRATION.md
```

Therefore the 54-operation migration is **not replayed**. The current correction package replaces only these six files from their exact selected-source bytes.

The correction restores the complete Core bootstrap/navigation sections identified by ReviewDiff while leaving all SDS Result-Unit/Lens/Finding-Disposition semantic migration payload unchanged.

The existing `LOG-DOC-076 APPLIED` entry is preserved as current-source history. Package `28289fcb-46f4-4d05-911d-ae0c1eb78a8b` is not treated as applied.

### ReviewDiff consistency correction after current-source preservation

A later cumulative ReviewDiff found three remaining consistency issues without changing the selected SDS migration architecture:

```text
link audit scope
→ 543 / 543 active methodology
→ 730 / 730 methodology root + active + integration

source-overlap metadata
→ original v1 zero-overlap facts are historical package-production evidence
→ current correction uses exact five-file bases

TM-DOMAIN-DISCOVERY RU-DDISC-01
→ Domain Evidence Interpretation / Boundary
→ selected Source/Evidence refs + interpreted domain signals + boundary rationale
→ raw Evidence remains Core State
→ Sources remain source-owned
```

This correction does not replay the 54-path migration and does not change Target/Lens topology, command surfaces, P/TF/Decision compatibility, representation rules or the future Game Dev profile boundary.

The current working-tree target includes the APPLIED state associated with `LOG-DOC-080`; the ChangeSet remains open until an APPROVABLE cumulative ReviewDiff is accepted.

### Finding-Disposition / Target-Formation lifecycle cleanup after unrelated Git-head advance

The same open SDS conformance ChangeSet now runs over Git head `94b6d74b8074dd4dda13934b29977a89ef5379a2`; that head advance only finalized an unrelated Replacement Package App child-scope ChangeSet and does not close this SDS ChangeSet. A later review found residual old-language paths that still made a Lens/Target Module appear to own routing, reopen or automatic child-Target creation even though the canonical Core contract had moved those consequences into Finding Disposition / Target Formation.

Selected cleanup:

```text
Lens / Validator / Evidence / review producer
→ Finding Candidate
→ Core Finding Disposition
→ owner / State / lifecycle consequence

independently substantial unresolved work
→ Target Formation candidate
→ Target Formation decides:
   reuse existing Target
   OR handoff/reference existing owner
   OR form bounded child/local Target
```

SDS Lenses may still provide **likely owner / suggested lifecycle** hints and artifact-placement guidance. They do not perform the semantic handoff themselves. `GUIDANCE: ROUTE_*` / `PLACEMENT_DIRECTIVE: ROUTE` in L5 remains P-14 / TF-10 artifact-placement vocabulary, not Lens-owned Finding routing.

This cleanup also makes generic Cross-Owner Consistency Review use the same producer-independent Finding Disposition bridge and updates Slice/Frontend/Application Target/Workflow wording so a material unresolved local choice becomes a Target Formation candidate rather than an automatic child Target.

### Final residual Finding-Disposition / lifecycle consistency correction

A broad cumulative ReviewDiff scan after the previous lifecycle cleanup found a final cluster of old wording in generic Core Lens bodies, generic Target Module role guidance, Target-Formation/Lens relation prose and several SDS Target/Workflow/example projections. The selected correction does not redesign topology; it makes the already-selected ownership rule literal everywhere it materially matters:

```text
producer
  Lens / Validator / Evidence / Workflow / Target observation
→ Finding Candidate
→ Core Finding Disposition
→ State / semantic owner / revalidation-handoff consequence

independently substantial unresolved ownership/work
→ Target Formation candidate
→ Target Formation decides:
   reuse existing Target
   OR handoff/reference existing owner
   OR form new bounded Target
```

The correction also repairs the literal escaped-newline corruption in `BOOTSTRAP-SDS.md`, keeps `ROUTE` as valid artifact-placement vocabulary under P-14/TF-10, renames Practical Test `RU-PTEST-01` to `Evidence Subject / Acceptance Boundary`, and keeps Slice proof/test handoff explicitly inside `RU-SLICE-01` representation meaning.

The ChangeSet remains open until its next cumulative ReviewDiff is accepted as APPROVABLE. This target state is associated with `LOG-DOC-084` and exact package `f030db4e-2f56-4f6a-95e7-7312850d5b75`.

### Post-v6 whole-active residual lifecycle authority correction

After package `f030db4e-2f56-4f6a-95e7-7312850d5b75`, review expanded from changed hunks to the complete active target tree. The remaining material gaps were small but canonical:

```text
P-15 Evidence
→ Finding Candidate
→ Core Finding Disposition
→ reaffirm / revalidate / reopen only when selected

new semantic owner needed during placement
→ ownership Finding Candidate
→ Core Finding Disposition / Target Formation
→ resolved owner
→ P-14 placement

independently substantial architecture/frontend/composition work
→ Target Formation candidate
→ Target Formation decides reuse / handoff / new bounded Target
```

The same correction turns direct Step-02 reopen wording in Application shared research methods into challenge/disposition semantics and treats the Slice TDD return as ordinary `REFINE`, not a lifecycle reopen.

The scan is intentionally context-sensitive. `PLACEMENT_DIRECTIVE: ROUTE` / `GUIDANCE: ROUTE_*` remain valid artifact-placement vocabulary, and explicit statements that **Core Finding Disposition may select revalidation/reopen** remain valid lifecycle descriptions.

This target state is associated with `LOG-DOC-086` and exact package `8b070940-6225-479c-8a63-050b6d3093dc`. The ChangeSet remains open until its cumulative ReviewDiff is accepted as APPROVABLE.

### Final runtime / escalation / conditional-command-gate consistency correction

After the post-v6 whole-active correction, one last context pass found six canonical owners where old shorthand still skipped the generic bridge:

```text
Lens / Evidence / local design observation
→ Finding Candidate
→ Core Finding Disposition
→ State / owner / lifecycle consequence

independently substantial unresolved work
→ Target Formation candidate
→ Target Formation decides:
   reuse existing Target
   OR handoff/reference existing owner
   OR form new bounded Target
```

This is now literal in the Shell role model and Recursive Escalation, the shared Practical Evidence method, Lens-creation escalation, SDS architecture profile/workflow guidance and SDS conditional command gates. The command set itself is unchanged: conditional commands may still resolve their natural Target Module, but Target existence/formation is explicitly governed by Target Formation rather than by module-specific shorthand.

Exact current source verification for this correction combines the latest cumulative ReviewDiff target blob hashes with direct Git-head blob verification for the two newly touched owners that were unchanged by that diff (`practical-evidence-method.md` and Phase-07 WEUC workflow).

This target state is associated with `LOG-DOC-088` and exact package `edfcae2c-21c5-4d2f-8e14-7436e8a5a6ef`. The ChangeSet remains open until its cumulative ReviewDiff is accepted as APPROVABLE.


### Final Documentation / Representation finding-ownership consistency correction

After the runtime/escalation/command-gate correction, the final active-tree review found one residual ownership-language cluster in Documentation / Representation and its audits:

```text
Lens / representation check
→ Finding Candidate + optional likely-owner context
→ Core Finding Disposition
→ semantic owner / State / lifecycle consequence
→ AP/AG + Documentation / Representation + P-14 / TF-10
→ persistence / artifact placement
```

The correction removes language that let the Documentation / Representation Lens itself route project-global semantic meaning, assume findings automatically return to the current Target owner, or treat `AG-*` as semantic finding-routing authority. `AG-*` remains Lens-owned supporting-artifact / artifact-placement guidance; `PLACEMENT_DIRECTIVE: ROUTE` and non-tree routing remain representation vocabulary.

The canonical Unit model now describes the relevant State-Unit purpose as Lens interaction / Finding Disposition addressability rather than `Lens interaction/routing`. Current Documentation / Representation and Core/SDS separation audits use the same owner boundary.

AP/AG counts and IDs, P-14/TF-10, SDS topology, Result Units, command surface and Game Dev boundary are unchanged.

This target state is associated with `LOG-DOC-090` and exact package `f6616562-fa43-436d-9bcb-4a949d2c19c8`. The ChangeSet remains open until its cumulative ReviewDiff is accepted as APPROVABLE.

### Next profile boundary

After this transition applies and its cumulative ReviewDiff is accepted, the existing SDS profile no longer depends on implicit Unit/Lens mapping: literal SDS profile conformance is complete. A later Game Dev profile may then be designed/installed beside SDS without first requiring another SDS Unit-migration pass. Any generic gap found during actual Game-profile work remains a normal future Core ChangeSet rather than a reason to pre-invent profile-specific Core semantics here.

### Final host-Target / AG projection consistency correction

The Documentation / Representation correction exposed one final projection-level shorthand cluster outside its direct owners:

```text
resolved/reused host Target
→ Lens evaluation context
→ Finding Candidate(s)
→ Core Finding Disposition
→ actual semantic owner / State / lifecycle consequence

AG-*
→ optional supporting-artifact / artifact-placement guidance
→ never semantic finding-owner/handoff/reopen authority
```

Generic `idtspe.lens.apply`, the generic Lens registry, the SDS Artifact Placement projection and the compact mechanical PASS projection now use this same boundary. A Lens may have zero `AG-*` when Core resolves the current Target as owner and no distinct supporting artifact is useful; that does not mean the Lens itself returned/routed the finding.

Command identities/aliases and host-target policy are unchanged. AP/AG record IDs/counts and P-14/TF-10 artifact `ROUTE` vocabulary are unchanged.

This target state is associated with `LOG-DOC-092` and exact package `5a9cb4dd-58d7-44ae-a092-e510c8cf3f29`. The ChangeSet remains open until its cumulative ReviewDiff is accepted as APPROVABLE.

### Final return-to-Target-owner / conditional owner-routing consistency correction

The post-v10 active-tree scan found one equivalent shorthand family that the previous four-phrase scan did not include:

```text
Lens artifact implication
  RETURN_TO_TARGET_OWNER

Simplicity command
  return Answer-Decision to current Target owner

conditional Target Module gate
  Target not justified → route to proper/correct owner
```

The corrected boundary is now literal:

```text
Lens
→ Finding Candidate
→ Core Finding Disposition
→ resolved semantic owner / State / lifecycle
→ ordinary Target representation when that Target is actually resolved owner

no distinct Lens supporting artifact
→ NONE / NO_DISTINCT_SUPPORTING_ARTIFACT

conditional Target Module gate
→ Target Formation input
→ Target Formation decides reuse / handoff / methodology next step / new bounded Target when justified
```

The SDS Simplicity command uses the same finding-disposition bridge before any accepted Answer-Decision input reaches a resolved current Target. Generic Target Module model/creation guidance no longer lets command gates route semantic ownership directly.

Exact current source verification for this correction uses the cumulative ReviewDiff target blob IDs for 12 touched paths; `target-module-creation-and-integration-use-case.md` was unchanged by that diff and matches Git-head blob `ba6e50606134d123c2e440886cf8c763843e2a56`.

Command identities/aliases, host-target policies, AP/AG IDs/counts, P-14/TF-10 artifact `ROUTE`, SDS topology, Result Units and Game Dev boundary are unchanged.

This target state is associated with `LOG-DOC-094` and exact package `b40f91e5-7ff8-44ec-9f00-ec8220f779e5`. The ChangeSet remains open until its cumulative ReviewDiff is accepted as APPROVABLE.

### Final producer-to-owner / Lens-destination consistency correction

The post-v11 context scan found a final family of semantically equivalent shortcuts that literal `RETURN_TO_TARGET_OWNER` scanning did not cover:

```text
producer / Target Module / Lens observation
→ newly surfaced ownership meaning
→ Finding Candidate
→ Core Finding Disposition
→ resolved semantic owner / State / lifecycle consequence

independently material Target ownership
→ Target Formation candidate/input
→ Target Formation decides reuse / handoff / new bounded Target

already-resolved semantic owner
→ Documentation / Representation + P-14 / TF-10
→ persistence / placement only
```

The SDS general conditional command gate plus its WEUC/global-update and frontend helper projections, Slice Strategy/shared vertical-result/workflow projection, Domain Discovery future-evolution handoff and L1/L2 P-14 wording now use this boundary. WEUC/L5 remains an evaluation perspective; Cross-Cutting/frontend module families remain likely/resolved Target families rather than producer-selected semantic destinations.

Exact current source verification reconstructed the latest cumulative target and matched all **93/93** changed target blob hashes before this package was built. Command identities/aliases, Target/Lens topology, AP/AG IDs/counts, artifact `ROUTE` vocabulary, Result Units and Game Dev boundary are unchanged.

This target state is associated with `LOG-DOC-096` and exact package `ec30223d-434f-484a-997a-7a722705197d`. The ChangeSet remains open until its cumulative ReviewDiff is accepted as APPROVABLE.

### Final WEUC/L5 global-update disposition consistency correction

The post-v12 whole-active review found one final projection cluster in WEUC/L5 global-update handling:

```text
L5 / local architecture-evolution observation
→ Finding Candidate + optional TM-WEUC likely-owner hint
→ Core Finding Disposition
→ resolved owner / State / lifecycle consequence
→ TM-WEUC refresh/update/revalidation only when selected

local evolution companion need
→ AG-L5-02 proposal
→ Documentation / Representation + P-14 / TF-10
→ actual embed/companion persistence and placement
```

This boundary is now used by the Shell, generic Lens model, methodology/SDS maps, Phase-07 workflow, `TM-WEUC`, SDS Target Module profile/upstream-source projections, shared Artifact Boundary/File Realization and Source-Lineage projections, WEUC Lens body/AG/example, Target Module registry projection and research-capture Phase-07 example. Direct `TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION` remains valid when the whole-Workspace Target is explicitly selected; the correction removes only inferred Lens-owned global destination shortcuts.

Exact current source verification matched all **94/94** changed target blob hashes in the latest cumulative ReviewDiff before this package was built. Command identities/aliases, Target/Lens topology, AP/AG IDs/counts, artifact `ROUTE` vocabulary, Result Units and Game Dev boundary are unchanged.

This target state is associated with `LOG-DOC-098` and exact package `0f09ceef-8c93-4c82-8b60-837dcf8aaacd`. The ChangeSet remains open until its cumulative ReviewDiff is accepted as APPROVABLE.

### Final Lens Finding → State/owner disposition consistency correction

The post-v13 invariant-class review found a final family of generic projection/Artifact-Guidance assumptions that literal WEUC/L5 phrase scans did not cover:

```text
Lens / producer observation
→ Finding Candidate
→ Core Finding Disposition
→ accepted State / resolved semantic owner / lifecycle consequence
→ Documentation / Representation
→ P-14 / TF-10 placement

independently material semantic-owner formation
→ Target Formation candidate/input
→ Target Formation decides reuse / handoff / new bounded Target
```

Generic Artifact Placement, Resolution Slot, Shell response projection and the affected Core Lens guidance now use this bridge literally. `NONE / NO_DISTINCT_SUPPORTING_ARTIFACT` means no separate Lens artifact is needed; it does not mean raw findings automatically become current-Target State. Current/natural/shared owners in Artifact Guidance are resolved destinations or hints, not Lens authority.

SDS projections also use one boundary: WEUC/L5 is an evaluation perspective; suspected project-global meaning may carry `TM-WEUC` as a likely-owner hint; Core Finding Disposition resolves actual owner/handoff. Frontend `.evolution.md` remains an `AG-L5-02` representation proposal whose persistence/placement is decided by Documentation / Representation + P-14 / TF-10.

Exact current source verification reconstructed the post-v13 target from snapshot `c824891a...` + `Вставленный текст(20260828-100417).txt` and matched all **99/99** target blob hashes before this package was built. Command identities/aliases, Target/Lens topology, AP/AG IDs/counts, artifact `ROUTE` vocabulary, Result Units and Game Dev boundary are unchanged.

This target state is associated with `LOG-DOC-100` and exact package `fd5e8bca-aceb-4e40-b595-8e10ca180ea8`. The ChangeSet remains open until its cumulative ReviewDiff is accepted as APPROVABLE.

### Post-v14 SDS projection shorthand consistency correction

The cumulative ReviewDiff after v14 matched the expected target exactly but exposed a final compact-projection family where accepted/dispositioned outcomes were still rendered as direct Lens/producer output:

```text
raw Lens / research / coverage observation
→ Finding Candidate
→ Core Finding Disposition
→ accepted State / resolved semantic owner / lifecycle consequence
→ Documentation / Representation
→ P-14 / TF-10 placement

explicitly selected whole-Workspace TM-WEUC Target
→ ordinary Target workflow
→ direct refinement of Current Global Architecture Position
```

The SDS Artifact Placement Map, Target Module profile architecture example, Test Coverage production method, Application reference-research guidance, SDS command helper and WEUC Lens helper now use this boundary literally. AP/AG IDs/counts and artifact `ROUTE` vocabulary remain unchanged; the correction only clarifies when owner/State has already been resolved.

Exact current source verification matched all **99/99** target blob hashes in `Вставленный текст(20260828-104157).txt` before this package was built. Command identities/aliases, Target/Lens topology, Result Units and Game Dev boundary are unchanged.

This target state is associated with `LOG-DOC-102` and exact package `753428e5-c2a7-4f2f-b5b1-b98443342589`. The ChangeSet remains open until its cumulative ReviewDiff is accepted as APPROVABLE.

### Final post-v15 producer-disposition invariant consistency correction

The post-v15 cumulative review matched package v15 exactly but a multiline whole-active sweep found the last compact lifecycle arrows that still skipped the generic bridge:

```text
producer / Lens / research / coverage observation
→ Finding Candidate
→ Core Finding Disposition
→ accepted State / resolved semantic owner / lifecycle consequence
→ Target result refinement when that Target owns the accepted meaning
→ Documentation / Representation + P-14 / TF-10 when persistence is needed

independently material owner formation
→ Target Formation candidate/input
→ Target Formation decides reuse / handoff / new bounded Target
```

This boundary is now literal in generic `LENS-MODEL`, the Shell WEUC path, WEUC Lens ordinary-target flow, Layer Ideas/Evolution helper, Shared/Cross-Cutting worked examples, Prototype handoff, Test Coverage persistence wording and the Simplicity iterative Lens example. `AG-L5-02` remains a representation proposal only; project-global L5 meaning may carry `TM-WEUC` as a likely-owner hint; already-formed Idea State may still use ordinary P-14 register placement.

Exact current source verification matched all **99/99** target blob hashes in `SDS Unit and Finding Disposition conformance migration-review-db9b8119.diff` before this package was built. Command identities/aliases, Target/Lens topology, AP/AG IDs/counts, artifact `ROUTE` vocabulary, Result Units and Game Dev boundary are unchanged.

This target state is associated with `LOG-DOC-104` and exact package `c3e07864-039c-40d1-b81d-5acfad2f14c7`. The ChangeSet remains open until its cumulative ReviewDiff is accepted as APPROVABLE.

### Whole-active authority/source-projection consistency correction after v16

The post-v16 cumulative ReviewDiff matched the expected package result exactly. An expanded scan then checked not only direct arrow shortcuts but also Lens authority verbs, structured `SEMANTIC_OWNER` records, raw Lens findings used as Sources, Evidence-driven lifecycle examples and local/global WEUC handoffs.

Canonical boundary:

```text
producer / Lens / Evidence observation
→ Finding Candidate
→ Core Finding Disposition
→ accepted State / semantic owner / lifecycle consequence
→ Target result refinement when the resolved Target owns that meaning
→ Documentation / Representation + P-14 / TF-10 when persistence is needed

independently substantial unresolved owner/work
→ Target Formation candidate/input
→ Target Formation decides reuse / handoff / new bounded Target
```

The correction synchronizes generic L3/L6/Linked Notes/Practical Evidence/Test Proof guidance, SDS Application/UI/Slice/Simplicity/WEUC Lens prose, Target Module Source projections, Slice/Frontend/physical evolution-companion projections, Evidence reconciliation, TM-WEUC Handoff and directed repetition examples. Raw Lens findings are not Sources; `AG-L5-02` is a representation proposal; supporting evidence/test files are not Lens-created semantic owners.

Exact current source verification matched all **100/100** target blob hashes in `SDS Unit and Finding Disposition conformance migration-review-c04945eb.diff` before this package was built. The package touches only `SCOPE-REUSABLE-DOCUMENTATION`; no cross-scope reference log is required. Command identities/aliases, Target/Lens topology, AP/AG IDs/counts, artifact `ROUTE` vocabulary, Result Units and Game Dev boundary are unchanged.

This target state is associated with `LOG-DOC-106` and exact package `b53d5c4e-2f7e-4ad0-83c4-df5f99339eb0`. The ChangeSet remains open until its cumulative ReviewDiff is accepted as APPROVABLE.

### Post-v17 APPROVABLE residual consistency correction

The v17 package applied correctly and its 23 replacement payloads match the cumulative post-v17 target. The later APPROVABLE review widened the scan beyond v17's normalized authority/source forms and found eleven remaining projections where compact prose still skipped or blurred the producer/Core boundary; the pre-package expanded sweep found one additional equivalent in the SDS WEUC command host-owner projection.

Current literal boundary:

```text
Lens / producer / research / Evidence observation
→ Finding Candidate
→ Core Finding Disposition
→ accepted Question / Idea / Q/R/P / Evidence / Decision input / resolved owner / lifecycle consequence
→ Target result refinement only when that Target owns the accepted meaning
→ Documentation / Representation + P-14 / TF-10 when persistence is needed

independently substantial unresolved work
→ Target Formation candidate/input
→ Target Formation decides reuse / handoff / new bounded Target
```

This correction synchronizes the remaining WEUC/L5 local flow, L4 pattern heuristic, Phase-01 L1/L2/L3 projections + worked example, Prototype/feasibility Source projections, Implementation/Frontend Slice Finding-vs-State wording, directed Evidence challenge lifecycle, Application reference research, Simplicity evolution-constraint wording and the SDS WEUC command host-owner projection. It also qualifies the earlier v17 whole-active PASS evidence as superseded for approval purposes because that scan missed these semantic equivalents.

Exact current source verification matched all **102/102** target blob hashes in `Вставленный текст(20260828-122847).txt` before this package was built. The package touches only `SCOPE-REUSABLE-DOCUMENTATION`; no cross-scope reference log is required. Command identities/aliases, Target/Lens topology, AP/AG IDs/counts, artifact `ROUTE` vocabulary, Result Units and Game Dev boundary are unchanged.

This target state is associated with `LOG-DOC-108` and exact package `d77f7701-ac75-44b7-9a8c-1fceb1970d5e`. The ChangeSet remains open until its cumulative ReviewDiff is accepted as APPROVABLE.

### Post-v18 canonical residual consistency correction

The v18 package applied correctly and the supplied cumulative post-v18 target matches **104/104** changed Git-blob hashes. Its later APPROVABLE review found one small canonical residual cluster in four semantic files rather than another topology or lifecycle redesign.

Current literal boundary remains:

```text
producer / Lens / research / Evidence observation
→ Finding Candidate
→ Core Finding Disposition
→ accepted State / resolved semantic owner / lifecycle consequence
→ Target result refinement only when that Target owns the accepted meaning
→ Documentation / Representation + P-14 / TF-10 when persistence/materialization is useful
```

This correction synchronizes Shell P-07/Recursive Escalation/L4 example, canonical Lens Slice-evolution + Linked Notes examples, Implementation Slice evolution-companion wording and Domain Draft L5-derived meaning/representation wording. A Lens may propose `AG-L5-02`; it does not itself produce the durable companion. A Domain/Slice Target may consume accepted/dispositioned local evolution meaning, not a raw Lens result.

Exact current source verification matched all **104/104** target blob hashes in `Вставленный текст(20260828-140951).txt` before this package was built. The package touches only `SCOPE-REUSABLE-DOCUMENTATION`; no cross-scope reference log is required. Command identities/aliases, Target/Lens topology, Result Units, AP/AG IDs/counts, artifact `ROUTE` vocabulary, P/TF compatibility and Game Dev boundary are unchanged.

This target state is associated with `LOG-DOC-110` and exact package `d4f18f08-9c5d-49a0-b35c-3875fbe96249`. The ChangeSet remains open until its next cumulative ReviewDiff is accepted as APPROVABLE.

### Post-v19 evolution-companion disposition consistency correction

The cumulative post-v19 ReviewDiff matches the exact v19 work tree on **104/104** changed Git-blob hashes. The requested pre-package whole-active recheck confirmed the known TM-WEUC creation/splitting residual and, before packaging, broadened the check to semantic equivalents so another micro-package would not be created for the same family.

Current literal evolution-companion boundary:

```text
L5 / WEUC observation
→ Finding Candidate
→ Core Finding Disposition
→ accepted local evolution meaning + resolved semantic owner
→ optional AG-L5-02 supporting-representation proposal
→ Documentation / Representation decides no persistence / embed / split
→ P-14 / TF-10 resolves concrete representation/path/materialization
```

The correction synchronizes TM-WEUC, canonical Target Evolution Companion Artifact guidance, SDS Full Map, Phase-07 + its Research Capture example, Frontend/Implementation/Domain compact rules, canonical Lens Model Domain/WEUC examples, Domain/UI/Slice profile Lens artifact summaries, the WEUC Lens worked/composition examples, generic Target Module AP/AG guidance and SDS Artifact Placement Map. In particular, L5/WEUC never creates/splits the durable companion, and a Target consumes accepted/dispositioned local evolution meaning rather than a raw Lens/AG result.

The wider authority/source/lifecycle/Target-Formation scan also found and corrected a few authority-wording equivalents (`L2 owns semantic authority`, `L6 owns proof/operation implications`, generic Quality materiality selection and raw `L5 constraints`) so evaluation/perspective ownership cannot be confused with accepted project semantic authority. No additional material semantic cluster remains selected outside these bounded companion/authority-wording equivalents. Explicit whole-Workspace TM-WEUC work, Target Formation decisions, accepted Target handoffs, Lens-to-Lens finding context and artifact `ROUTE` remain valid under their existing contracts.

The package touches only `SCOPE-REUSABLE-DOCUMENTATION`; no cross-scope reference log is required. Command identities/aliases, Target/Lens topology, Result Units, AP/AG IDs/counts, artifact `ROUTE`, P/TF compatibility and Game Dev boundary are unchanged.

This target state is associated with `LOG-DOC-112` and exact package `793ec3a1-e78a-473f-902b-8988c03f89b4`. The ChangeSet remains open until its cumulative ReviewDiff is accepted as APPROVABLE.

---

## Scenario Planning Target Unification — 2026-08-30

Status: **current target state for ChangeSet `405f5eb1-4748-4088-a8e9-7143b8236688`**

The active SDS Scenario family now uses one `TM-SCENARIO-PLANNING` Target per independently meaningful Scenario. The former separate Scenario Discovery and Scenario Draft Target Modules are retired; Scenario-boundary discovery runs as the opening Evaluation/Target-Formation work for Scenario Planning rather than producing a separate semantic catalog owner.

The Scenario Target owns three Result Units:

```text
RU-SCEN-01 Scenario Behavior / Requirements
RU-SCEN-02 Behavioral Decomposition
RU-SCEN-03 Scenario Development / Change Outlook
```

`RU-SCEN-01` is free-form behavioral/product authority. `RU-SCEN-02` extracts semantic Scenario DATA and addressable Behavior Items as a processed downstream planning view and must neither omit material Scenario behavior nor invent new product behavior. `RU-SCEN-03` retains known additions/extensions/improvements/future capabilities and current behavioral assumptions that may require revision; concrete unresolved questions/risks remain Generic Q/R/P/Evidence/Decision State.

The former Scenario Boundary / Behavior Lens is removed because its boundary/completeness/DATA/Behavior checks are now the Target Module's own Evaluation. No separate Scenario Knowledge Basis is currently required. Generic required Core Lenses remain inherited; Quality/Risk, Practical Evidence and Dependency/Change Impact remain conditional.

Representation remains adaptive: one Scenario owner need not equal one file, and the retained Scenario catalog AP is now an optional navigation/index projection rather than semantic Scenario authority. The five existing Scenario AP IDs remain present, preserving overall `58 = 34 AP + 24 AG` guidance-record parity.

Scenario canonical/focused commands and the generated Planning Helper command seed are reprojected to the new module. This transition intentionally does **not** redesign Slice, Screen, Domain, Cross-Cutting, Test, WEUC or other SDS Target families.
