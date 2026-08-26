# Current Repository Integration — SDS / IDTSPE Pre-Update Audit And Migration Ledger

Status: **staged installation target built against the current supplied repository snapshot; canonical IDTSPE/SDS authority + command/helper surface prepared, destructive legacy-family cleanup still gated by MB-06**  
Methodology baseline: `idtspe-methodology-workspace-core-sds-separated.zip` (`ffb6bfff5bb4da2478811443c5f0168ab4baa173b389439d0991afb27ca7d30b`)  
Repository evidence: `github:AlexPastukhh/obs-planning-docs`, branch `main`, current package base `36dfbf878d4ff9e616de70d7535135c5c0c9966e`; earlier ca768b61 snapshot remains original methodology-import provenance  
Audit intent: define the **pre-update migration plan**, including obsolete SDS/Idea runtimes, merge-before-delete knowledge, command/helper impact, and deletion gates.

## Current Staged Installation Status — 2026-08-26

The current replacement-package target uses repository identity `github:AlexPastukhh/obs-planning-docs` and the user-selected current snapshot at base commit `36dfbf878d4ff9e616de70d7535135c5c0c9966e`. The older snapshot references below remain audit provenance; they are not a claim that the package was built from stale bytes.

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


## Current Shared Target/Lens Knowledge-Basis Update — 2026-08-27

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
+ Knowledge Basis (INLINE | REFERENCED | HYBRID)
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
17 SDS Target Modules
18 reusable Lenses
  11 IDTSPE Core/generic
  7 SDS-specific
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
| Scenario discovery/boundary | `TM-SCENARIO-DISCOVERY` + Scenario Lens | **Strong** | Replace old workflow |
| Scenario Draft / DATA / Behavior | `TM-SCENARIO-DRAFT` | **Strong** | Replace old per-Scenario workspace topology; DATA/Behavior remain internal addressable contracts |
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
| `application_scenarios.discover` | `собери сценарии приложения` | `TM-SCENARIO-DISCOVERY` |
| `application_scenario.plan` | `план сценария приложения` | `TM-SCENARIO-DRAFT` |
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
