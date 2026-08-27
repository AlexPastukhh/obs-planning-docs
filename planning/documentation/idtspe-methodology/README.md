# IDTSPE Methodology Workspace

Status: active methodology workspace and repository-integration planning package  
Purpose: keep the **generic IDTSPE planning runtime**, installed planning profiles such as **SDS**, independent peer concerns, temporary theory, examples, audits, and repository-migration state physically separated so each responsibility has one clear owner.

This README is the **workspace-structure and navigation contract**. It explains what each major directory/file is for, which files are semantic authority, which files are only maps/projections/examples/audits, and where new methodology material should be placed.

It does **not** replace the semantic owners linked below. When this README and a narrower canonical owner disagree, the narrower canonical owner is authoritative and this README must be corrected.

---

## 1. The Methodology In One Picture

```text
                           ┌─────────────────────────────┐
                           │        IDTSPE Core          │
                           │ generic planning runtime    │
                           │ Shell / Target / Lens /     │
                           │ QRP / Decision / Artifact / │
                           │ Evidence / Revalidation     │
                           └──────────────┬──────────────┘
                                          │
                           installed profile/family
                                          │
                         ┌────────────────▼───────────────┐
                         │          SDS Profile           │
                         │ 17 Target Modules              │
                         │ SDS-specific Lenses            │
                         │ directed workflow              │
                         │ Ideas / Evolution / WEUC       │
                         │ testing / file topology        │
                         └────────────────┬───────────────┘
                                          │
                            concrete planning instances
                                          │
                         ┌────────────────▼───────────────┐
                         │ canonical project artifacts    │
                         │ Scenario / Domain / Slice /    │
                         │ Workspace Evolution / tests... │
                         └────────────────────────────────┘

Independent peer concern:
  AI Reviewability / Key Points

Temporary reference layer:
  Theoretical Modules

Outside methodology authority:
  integration/       repository migration state
  sources-readonly/  frozen provenance/history
```

The central separation is:

```text
IDTSPE Core
= how bounded planning work is formed, reasoned about, decided,
  persisted, handed off and revalidated

SDS Profile
= one concrete planning family using that runtime for
  Solution / Application / Scenario / Domain / Slice / WEUC / Testing
```

SDS is currently the only installed profile, but **SDS is not IDTSPE itself**. A future non-SDS profile can live beside it without redefining the generic Shell.

---

## 2. File Responsibility Types

Before reading the tree, distinguish the kinds of files in this workspace.

| Responsibility type | Meaning | May define methodology truth? |
|---|---|---:|
| **Semantic owner** | Owns one specific concept/contract such as the Shell, a Target Module, a Lens, Q/R/P trace, or directed SDS next-step resolution. | **Yes** |
| **Framework owner** | Defines how a reusable type works, e.g. Target Module model or Lens model. | **Yes** |
| **Bootstrap** | Defines what must be read/known to enter a methodology family safely. It points to owners; it does not duplicate their semantics. | Only bootstrap/read behavior |
| **Map / index / README** | Navigates and explains owners. It should summarize/link, not invent parallel semantics. | No, except its own navigation/structure contract |
| **Projection / materialization tree** | Human/tool-facing grouping of source guidance, e.g. the SDS annotated Artifact Materialization Tree. | No new semantics; AP/AG source records remain authoritative |
| **Template** | Defines a representation shape for an artifact. | Representation only; cannot override semantic owner |
| **Worked example** | Demonstrates the methodology against a concrete case. | No |
| **Audit** | Records consistency/completeness checks and evidence. | No |
| **Theoretical Module** | Preserves useful raw/not-yet-operationalized knowledge. | No; supporting reference only |
| **Integration ledger** | Maps current methodology to a concrete repository migration/update. | No methodology semantics |
| **Provenance source** | Frozen historical/superseded material retained for traceability. | No |
| **Compatibility pointer** | Keeps an old path navigable while canonical ownership moved elsewhere. | No |

### Authority rule

When several files discuss the same thing:

```text
narrow canonical semantic/framework owner
→ wins

profile map / README / template / registry
→ must project that owner correctly

example
→ must demonstrate it correctly

audit
→ may report inconsistency but does not redefine the owner

integration / sources-readonly / theoretical raw source
→ never silently overrides active methodology
```

Additional boundaries:

```text
IDTSPE Core generic mechanics
→ cannot be redefined locally by SDS

Target Module
→ owns target-specific semantic output

Lens
→ evaluates a Target; it cannot steal semantic ownership from the Target

Theoretical Module
→ can expose a gap; it cannot silently become operational methodology

TM-WEUC
→ owns SDS Workspace Evolution / project-global architecture position

P-14 / Artifact Placement
→ resolves where persistent output belongs; file location alone does not create ownership
```

---

## 3. Root Directory

```text
idtspe-methodology-workspace/
├── README.md
├── MANIFEST.json
├── active/
├── integration/
└── sources-readonly/
```

### `README.md`

This file. Responsibility:

- explain the complete package structure;
- explain why each major directory exists;
- define navigation and authority categories;
- explain where new methodology files belong;
- point to canonical semantic owners without duplicating them.

It is **not** the detailed methodology itself.

### `MANIFEST.json`

Machine-readable package projection. Responsibility:

- expose current package version/state;
- expose counts such as Target Modules, Lenses, AP/AG records;
- expose installed profiles and key owner paths;
- expose audit/repository snapshot metadata useful to automation.

It must remain a **projection of the actual tree**, not an independent source of methodology truth.

### `active/`

Current operational methodology. If a rule is supposed to guide planning now, its canonical owner normally lives here.

### `integration/`

Current-repository migration/update planning. It contains repository-specific evidence, classifications and update sequencing. It is deliberately outside `active/` so repository migration state cannot become methodology authority.

### `sources-readonly/`

Frozen provenance, superseded models, old workbooks, rechecks and discussion history. Material here can be mined for useful meaning, but must not be edited forward as active methodology.

---

# 4. `active/` — Current Operational Methodology

Current top-level shape:

```text
active/
├── README.md
├── METHODOLOGY-SYSTEM-MAP.md
├── PLANNING-GOVERNANCE.md
├── FINAL-METHODOLOGY-AUDIT.md
├── <other global audit files>.md
│
├── idtspe-core/
├── ai-reviewability/
├── theoretical-modules/
└── profiles/

# compatibility-navigation directories only:
├── target-modules/
├── lenses/
├── generic/
├── shared/
└── examples/
```

## 4.1 `active/README.md`

Short active-package navigation index. It should stay compact because the root README owns the detailed workspace explanation.

## 4.2 `active/METHODOLOGY-SYSTEM-MAP.md`

Whole installed methodology map.

Responsibility:

```text
IDTSPE Core
+ peer concerns
+ theoretical registry
+ installed profiles
+ major ownership boundaries
+ top-level relationships
```

Use it when the question is **“what exists and how does the installed methodology fit together?”**

It is a map, not the replacement for `IDTSPE-SHELL.md`, Target Modules, Lenses or SDS workflow owners.

## 4.3 `active/PLANNING-GOVERNANCE.md`

Cross-methodology governance/interaction rules retained at active root because they apply across packages rather than to SDS alone.

## 4.4 Global audit files

Examples:

- [`active/FINAL-METHODOLOGY-AUDIT.md`](active/FINAL-METHODOLOGY-AUDIT.md)
- [`active/CORE-SDS-SEPARATION-CONSISTENCY-AUDIT.md`](active/CORE-SDS-SEPARATION-CONSISTENCY-AUDIT.md)
- [`active/DOCUMENTATION-REPRESENTATION-MATERIALIZATION-CONSISTENCY-AUDIT.md`](active/DOCUMENTATION-REPRESENTATION-MATERIALIZATION-CONSISTENCY-AUDIT.md)
- [`active/MERGE-PART1-WEUC-SIMPLICITY-CONSISTENCY-AUDIT.md`](active/MERGE-PART1-WEUC-SIMPLICITY-CONSISTENCY-AUDIT.md)
- [`active/MERGE-PART2-QRP-THEORY-AI-CONSISTENCY-AUDIT.md`](active/MERGE-PART2-QRP-THEORY-AI-CONSISTENCY-AUDIT.md)

Responsibility: prove/check the current structure and record the result of methodology-maintenance passes.

They are **evidence**, not semantic owners. Do not add a methodology rule only to an audit file.

---

# 5. `active/idtspe-core/` — Generic IDTSPE Runtime

Canonical package:

[`active/idtspe-core/README.md`](active/idtspe-core/README.md)

Boundary:

```text
IDTSPE Core knows:
  bounded Target formation
  Source / Relation handling
  reusable Target Module mechanics
  reusable Lens mechanics
  Questions / Ideas / Branches
  Q/R/P
  Decisions
  Artifact Placement
  Evidence / Revalidation
  profile handoff

IDTSPE Core does NOT assume:
  Application
  Scenario
  Screen
  Domain
  Slice
  SDS-specific WEUC
```

## 5.1 Core entry files

| File | Responsibility |
|---|---|
| [`BOOTSTRAP-IDTSPE.md`](active/idtspe-core/BOOTSTRAP-IDTSPE.md) | Whole-IDTSPE bootstrap/read contract. Establishes enough generic governance to work safely without reading every Target/Lens body. |
| [`IDTSPE-CORE-MAP.md`](active/idtspe-core/IDTSPE-CORE-MAP.md) | Map of generic Core owners and their dependencies. |
| [`IDTSPE-SHELL.md`](active/idtspe-core/IDTSPE-SHELL.md) | **Central generic runtime owner**: one bounded IDTSPE planning instance and its 15 ports. |
| [`IDTSPE-DEFAULT-WORK-MODE.md`](active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md) | Defines the optional `idtspe.work` mode: AI uses Core Shell by default for material planning, resolves scope/Target, treats AI proposals as Ideas rather than Decisions, then activates a profile when needed. |
| [`HIGH-LEVEL-EXAMPLE-GUIDE.md`](active/idtspe-core/HIGH-LEVEL-EXAMPLE-GUIDE.md) | Standard for writing useful self-contained methodology examples; examples should explain situation, why the mechanism applies, walkthrough, result and boundary. |

### Bootstrap vs work mode

```text
idtspe.bootstrap
→ learn/refresh methodology governance

idtspe.work
→ actually use the Core Shell as the default planning mode
```

A bootstrap is not a planning Target. A work-mode invocation does not automatically mean SDS; profile resolution remains explicit/contextual.

### Current direct framework/Lens command surfaces

The accepted command surface is broader than Target Module commands. Current cross-cutting/direct framework surfaces include:

```text
idtspe.bootstrap
→ бутстреп idtspe

idtspe.work
→ работай через idtspe

sdscmd.bootstrap
→ бутстреп sds

lenscmd.weuc.check
→ проверь эволюцию и архитектуру <target>

lenscmd.simplicity.check
→ проверь можно ли упростить <target>

lenscmd.documentation.representation.check
→ проверь как лучше зафиксировать <target/result>

lenscmd.linked-notes.justify
→ проверь оправданы ли linked notes <target>

idtspe.next
→ что дальше по методологии

idtspe.continue
→ продолжи по методологии

idtspe.review_consistency
→ проверь консистентность плана
```

All 17 SDS Target Modules additionally have canonical command surfaces defined in the SDS command-surface contract. A direct Lens command is added only for a stable recurring user intent; not every Lens receives a palette command.


Planned helper navigation is intentionally separate from command semantics: [`integration/COMMAND-AND-HELPER-NAVIGATION-PLAN.md`](integration/COMMAND-AND-HELPER-NAVIGATION-PLAN.md). It defines dedicated `IDTSPE` and `SDS — IDTSPE Profile` tabs, directed SDS Target Module ordering, focused-command nesting, and explicit `IDTSPE TARGET` / `IDTSPE LENS` presentation.

---

## 5.2 `active/idtspe-core/target-modules/`

Current file:

- [`README.md`](active/idtspe-core/target-modules/README.md)

Responsibility: generic **Target Module framework boundary and navigation**, not SDS Target Module bodies.

Concrete Target Modules belong to a profile/family such as `active/profiles/sds/target-modules/`.

A Target Module is used when a recurring Target/Step-Result family has a stable enough:

```text
purpose / output family
entry gate
Source expectations
Question/Lens behavior
output projection
validation
handoff
artifact guidance
```

Generic model/maintenance contracts themselves live under `idtspe-core/shared/`.

---

## 5.3 `active/idtspe-core/lenses/`

Canonical generic Lens package.

Key framework files:

| File | Responsibility |
|---|---|
| [`README.md`](active/idtspe-core/lenses/README.md) | Generic Lens registry/navigation and installed Lens-pack boundary. |
| [`LENS-MODEL.md`](active/idtspe-core/lenses/LENS-MODEL.md) | **Framework owner** for what a Lens is, applicability, inputs/findings and ownership rules. |
| [`LENS-AUDIT.md`](active/idtspe-core/lenses/LENS-AUDIT.md) | Audit evidence for Lens coverage/shape. |
| [`LENS-MIGRATION-COMPLETENESS-AUDIT.md`](active/idtspe-core/lenses/LENS-MIGRATION-COMPLETENESS-AUDIT.md) | Audit evidence for previous Target→Lens migration completeness. |

### Required Core Lenses

These are expected in every material IDTSPE planning instance unless a narrow rule explicitly makes one irrelevant:

| Lens | Responsibility |
|---|---|
| [`LENS-NEED-VALUE-SCOPE.md`](active/idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) | Need, value and scope fit. |
| [`LENS-AUTHORITY-SOT-REUSE.md`](active/idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) | Semantic authority, source-of-truth and reuse/duplication boundaries. |
| [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md`](active/idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) | Uncertainty, assumptions, evidence need and reversibility. |
| [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](active/idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) | Fundamental Documentation / Representation policy: whether to persist; code vs prose; existing owner vs dedicated file; consolidate vs split; worked physical topologies; handoff to P-14. |

### Frequent conditional Core Lenses

| Lens | Responsibility |
|---|---|
| [`LENS-DEPENDENCY-CHANGE-IMPACT.md`](active/idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) | Dependencies, change surface and blast radius. |
| [`LENS-QUALITY-RISK-MATERIALITY.md`](active/idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) | Cross-cutting quality/risk materiality. |
| [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md`](active/idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) | Proof, observation, diagnosis and operation. |

### Reusable Core Lenses

| Lens | Responsibility |
|---|---|
| [`LENS-PRACTICAL-EVIDENCE.md`](active/idtspe-core/lenses/reusable/LENS-PRACTICAL-EVIDENCE.md) | Prototype/implemented practical Evidence applicability and quality. |
| [`LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY.md`](active/idtspe-core/lenses/reusable/LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY.md) | Whether responsibility is genuinely shared/cross-cutting or should remain local. |
| [`LENS-TEST-PROOF-EVIDENCE.md`](active/idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md) | Test-proof responsibility and Evidence quality independent of one SDS Test Target. |
| [`LENS-LINKED-NOTES-USAGE-JUSTIFICATION.md`](active/idtspe-core/lenses/reusable/LENS-LINKED-NOTES-USAGE-JUSTIFICATION.md) | Justify/reject Linked Notes backlink/query/navigation behavior without creating a notes storage tree or semantic authority. |

---

## 5.4 `active/idtspe-core/shared/` — Generic reusable mechanics

This directory contains **canonical generic contracts that are too specific to be the Shell itself but are reusable across profiles**.

| File | Responsibility |
|---|---|
| [`idtspe-unit-and-target-step-result-model.md`](active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md) | Canonical Target Step Result + IDTSPE Unit model: Result Units vs Core State Units, Lens Unit interaction and one-Target/multi-representation boundary. |
| [`resolution-slot-and-target-formation-resolution-set.md`](active/idtspe-core/shared/resolution-slot-and-target-formation-resolution-set.md) | Canonical Target Formation Resolution Set (`TF-*`) and resolution-status slots; Slots are coordination metadata, not Result/State Unit kinds. |
| [`dynamic-target-formation-and-discovery-checks.md`](active/idtspe-core/shared/dynamic-target-formation-and-discovery-checks.md) | Narrative/how-to guide for dynamic Target formation and discovery checks. |
| [`target-type-instance-source-and-relation-model.md`](active/idtspe-core/shared/target-type-instance-source-and-relation-model.md) | Target type/instance, Source and Target Relation semantics. |
| [`target-module-model.md`](active/idtspe-core/shared/target-module-model.md) | Canonical reusable Target Module model. |
| [`knowledge-basis-contract.md`](active/idtspe-core/shared/knowledge-basis-contract.md) | Shared `INLINE / REFERENCED / HYBRID` Knowledge Basis contract used symmetrically by Target Modules and Lenses. |
| [`target-module-creation-and-integration-use-case.md`](active/idtspe-core/shared/target-module-creation-and-integration-use-case.md) | Maintenance workflow for creating/reviewing/integrating a Target Module. |
| [`target-module-output-template-and-question-set-rule.md`](active/idtspe-core/shared/target-module-output-template-and-question-set-rule.md) | Required Target Module output shape and Question Set rules. |
| [`lens-creation-and-integration-use-case.md`](active/idtspe-core/shared/lens-creation-and-integration-use-case.md) | Maintenance workflow for creating/reviewing/integrating a Lens. |
| [`planning-branch-counterfactual-exploration-model.md`](active/idtspe-core/shared/planning-branch-counterfactual-exploration-model.md) | Counterfactual Planning Branch model. |
| [`branch-comparison-coordinator-model.md`](active/idtspe-core/shared/branch-comparison-coordinator-model.md) | Coordinates comparison of material alternative branches without making the coordinator a semantic owner. |
| [`user-input-decision-and-answer-intake-rule.md`](active/idtspe-core/shared/user-input-decision-and-answer-intake-rule.md) | How user input becomes Answer/Decision material without silently bypassing IDTSPE reasoning/ownership. |
| [`qrp-priority-groups-and-decision-trace.md`](active/idtspe-core/shared/qrp-priority-groups-and-decision-trace.md) | Extension of existing P-09 Q/R/P: P0–P3 priority, related Q/R/P groups, and `Decision.Addresses` / `Decision.Exposes` trace. Does **not** introduce a second Concern runtime. |
| [`decision-revalidation-helper-model.md`](active/idtspe-core/shared/decision-revalidation-helper-model.md) | Generic helper model for revalidating prior Decisions against new Evidence/change. |
| [`consistency-review-use-case.md`](active/idtspe-core/shared/consistency-review-use-case.md) | Cross-owner consistency review use case; findings route back to natural owners. |
| [`artifact-boundary-and-file-realization-pack.md`](active/idtspe-core/shared/artifact-boundary-and-file-realization-pack.md) | Generic artifact/file realization reasoning and boundary discovery. |
| [`artifact-placement-and-idtspe-response-contract.md`](active/idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md) | P-14/TF-10 Artifact Placement View and required response projection. |
| [`target-evolution-companion-artifact.md`](active/idtspe-core/shared/target-evolution-companion-artifact.md) | Generic optional `<owner>.evolution.md`-style companion concept when target-local future evolution deserves durable separation. |
| [`practical-evidence-method.md`](active/idtspe-core/shared/practical-evidence-method.md) | Generic practical Evidence method used by prototype/post-implementation testing. |
| [`command-helper-usage-metadata-extension.md`](active/idtspe-core/shared/command-helper-usage-metadata-extension.md) | Backward-compatible helper presentation metadata (`whenToUse` / `whatYouGet`) and UI behavior contract. |
| [`idtspe-command-surface-contract.md`](active/idtspe-core/shared/idtspe-command-surface-contract.md) | **Generic Core command-surface authority:** 9 profile-independent Core surfaces, generic Lens operations and host-target policies. |
| [`idtspe-methodology-use-case-registry.md`](active/idtspe-core/shared/idtspe-methodology-use-case-registry.md) | Registry/navigation for methodology-maintenance/use cases. |
| [`active-methodology-mechanical-consistency-check.md`](active/idtspe-core/shared/active-methodology-mechanical-consistency-check.md) | Mechanical consistency-check procedure; evidence/checking mechanism, not semantic owner. |

### What does **not** belong in `idtspe-core/shared/`

Do not place Scenario/Domain/Slice/SDS-WEUC rules here merely because several SDS Target Modules use them. If a rule is specific to SDS, it belongs under the SDS profile.

---

# 6. `active/ai-reviewability/` — Independent Peer Concern

Canonical entry:

[`active/ai-reviewability/README.md`](active/ai-reviewability/README.md)

Why it is separate:

```text
IDTSPE
→ planning semantics / ownership / decisions

AI Reviewability
→ how material AI output is made easy for a human to review
```

It is deliberately **not a Lens or Target Module**.

Current responsibility includes the `Key Points` review projection: material conclusions should be visible to a reviewer without requiring every supporting paragraph to be reread.

It cannot create/override Target meaning, Decisions, artifact ownership or profile workflow.

If more independent AI-output/review concerns are added later, they should remain here only if they are genuinely peer concerns rather than IDTSPE mechanics or profile semantics.

---

# 7. `active/theoretical-modules/` — Raw / Temporary Theory

Canonical registry:

[`active/theoretical-modules/README.md`](active/theoretical-modules/README.md)

A Theoretical Module exists for knowledge that is useful enough to preserve but **not yet processed enough** to become an operational Target Module, Lens or Core rule.

```text
Target Module
→ known Target, timing, output, handoff

Lens
→ known applicability trigger and finding behavior

Theoretical Module
→ useful theory exists
→ applicability/timing may still be unclear
→ may contain broad or mixed material
```

The whole-methodology bootstrap reads the **registry**, not every raw body.

## 7.1 `active/theoretical-modules/testing/`

Current package:

[`README.md`](active/theoretical-modules/testing/README.md)

ID: `THM-TESTING-DETAIL-CA768B61`  
State: `IMPORTED_RAW`

Raw files preserved from repository snapshot `ca768b61...`:

| File | Raw subject |
|---|---|
| [`testing-planning-principles-and-terminology.md`](active/theoretical-modules/testing/testing-planning-principles-and-terminology.md) | Detailed testing principles/terminology. |
| [`api-integration-test-guidance.md`](active/theoretical-modules/testing/api-integration-test-guidance.md) | API/integration testing details. |
| [`e2e-testing-guidance.md`](active/theoretical-modules/testing/e2e-testing-guidance.md) | End-to-end testing details. |
| [`test-object-patterns.md`](active/theoretical-modules/testing/test-object-patterns.md) | Page/Component/Test Object patterns and boundaries. |

These raw files are **reference material**, not current Test workflow authority. Current operational Testing semantics remain in Core Test Lens + SDS `TM-TEST-*` modules.

Do not “clean up” old links/wording inside imported raw bodies merely to make them look current; promote selected meaning into current owners instead.

---

# 8. `active/profiles/` — Installed Planning Families

Registry:

[`active/profiles/README.md`](active/profiles/README.md)

A profile packages:

```text
concrete Target Modules
profile-specific Lenses
directed workflow / next-step resolver
artifact/file topology
profile command surfaces
worked examples
```

A profile may **extend** IDTSPE Core, but cannot redefine generic Shell/Target/Lens mechanics locally.

Current installed profile:

- [`SDS`](active/profiles/sds/README.md)

---

# 9. `active/profiles/sds/` — Current SDS Methodology

Canonical profile entry:

[`active/profiles/sds/README.md`](active/profiles/sds/README.md)

SDS currently contributes:

```text
17 Target Modules
7 SDS-specific Lenses
+ 11 generic Core Lenses available to SDS
profile-directed workflow
Documentation / Representation policy + SDS materialization topology
Ideas / Evolution / WEUC rules
Testing sequence
command surface
worked example
```

## 9.1 SDS top-level files

| File | Responsibility |
|---|---|
| [`BOOTSTRAP-SDS.md`](active/profiles/sds/BOOTSTRAP-SDS.md) | SDS profile bootstrap. Reads/refreshes SDS governance proportionally after Core governance is known. |
| [`SDS-FULL-MAP.md`](active/profiles/sds/SDS-FULL-MAP.md) | Complete current SDS map: Core dependency + Target Modules + Lenses + workflow + testing + WEUC + artifact/file behavior. |
| [`SDS-INSTANCE-MAP.md`](active/profiles/sds/SDS-INSTANCE-MAP.md) | How SDS planning decomposes into multiple concrete IDTSPE Target instances and revisits them. |
| [`SDS-PHYSICAL-PLANNING-TREE.md`](active/profiles/sds/SDS-PHYSICAL-PLANNING-TREE.md) | Physical-topology **coordinator**: no mandatory tree; points to the fundamental Documentation / Representation Lens and annotated materialization projection. |
| [`ARTIFACT-PLACEMENT-GUIDANCE-REGISTRY.md`](active/profiles/sds/ARTIFACT-PLACEMENT-GUIDANCE-REGISTRY.md) | Compatibility pointer retained after replacing the old flattened registry table. |
| [`ARTIFACT-PLACEMENT-MAP.md`](active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md) | Canonical annotated **Artifact Materialization Tree**: literal possible paths/representations + which Target Module/Lens proposes them + cheaper predecessor/split notes. |

### SDS physical representation is pressure-driven

`SDS-PHYSICAL-PLANNING-TREE.md` is now only a coordinator. The canonical rule is owned by the required Core Documentation / Representation Lens:

```text
IDTSPE result
→ maybe no persistence
→ maybe code/types/tests/schema/config
→ maybe existing discovery/strategy/owner section
→ maybe one dedicated owner artifact
→ maybe specialized companions only after independent pressure
→ P-14 chooses concrete placement
```

The detailed compact/promoted-Domain/promoted-Slice/mature-companion/Scenario-heavy/mixed example trees live in [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](active/idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md). The SDS [`ARTIFACT-PLACEMENT-MAP`](active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md) shows the literal possible destinations and their TM/Lens proposers without duplicating the worked explanations.

---

## 9.2 `active/profiles/sds/target-modules/` — 17 SDS semantic Target owners

Catalog:

[`README.md`](active/profiles/sds/target-modules/README.md)

Each `TM-*.md` is a **canonical reusable target-family methodology owner**. A Target Module defines a recurring planning contract: Target form/Sources, a Target Step-Result Contract with one or more Result Units, reusable Resolution/Production aids, Lens attachment, validations, handoff and artifact proposals. Generic Questions/Ideas/QRP/Decisions/Evidence remain Core State Units rather than target-result fields by default. A material IDTSPE Target may instead use a first-class Local Target Contract when no reusable module fits; it still receives the same Shell/Lens lifecycle.

| Target Module | Responsibility |
|---|---|
| [`TM-APPLICATION-DEFINITION.md`](active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md) | Application concept/responsibility boundary, solution alternatives, feasibility, build/buy/adapt/integrate/hybrid and refined core real-life route. |
| [`TM-PROTOTYPE.md`](active/profiles/sds/target-modules/TM-PROTOTYPE.md) | Bounded prototype/experiment planning and Evidence intent. |
| [`TM-SCENARIO-DISCOVERY.md`](active/profiles/sds/target-modules/TM-SCENARIO-DISCOVERY.md) | Discover the Application Scenario set without prematurely detailing each scenario. |
| [`TM-SCENARIO-DRAFT.md`](active/profiles/sds/target-modules/TM-SCENARIO-DRAFT.md) | Detailed one-Scenario owner including observable behavior, DATA and scenario-local guarantees. |
| [`TM-SCREEN.md`](active/profiles/sds/target-modules/TM-SCREEN.md) | Screen/spatial responsibility, routes, availability and DATA visibility/input. |
| [`TM-REQUIREMENT.md`](active/profiles/sds/target-modules/TM-REQUIREMENT.md) | Exceptional standalone shared must-hold condition when no more natural Scenario/Domain/etc owner exists. |
| [`TM-DOMAIN-DISCOVERY.md`](active/profiles/sds/target-modules/TM-DOMAIN-DISCOVERY.md) | Discover whether/where explicit Domain modeling is useful and identify candidates/evidence. |
| [`TM-DOMAIN-DRAFT.md`](active/profiles/sds/target-modules/TM-DOMAIN-DRAFT.md) | Select/refine one Domain owner, invariants/policies and conceptual boundaries. |
| [`TM-WEUC.md`](active/profiles/sds/target-modules/TM-WEUC.md) | Own `SDS-WORKSPACE-EVOLUTION.md`: evolution interpretation, project-global architecture position, planned/probable paths, extension points and transitions. |
| [`TM-SLICE-STRATEGY.md`](active/profiles/sds/target-modules/TM-SLICE-STRATEGY.md) | Decompose selected behavior into useful vertical results / Slice portfolio/order when explicit strategy is useful. |
| [`TM-IMPLEMENTATION-SLICE.md`](active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md) | One vertical implementation Slice: useful result, obligations, runtime path and integrated implementation plan. |
| [`TM-FRONTEND-SLICE.md`](active/profiles/sds/target-modules/TM-FRONTEND-SLICE.md) | Promoted independent frontend realization responsibility when frontend planning space is materially separate. |
| [`TM-CROSS-CUTTING-CONCERN.md`](active/profiles/sds/target-modules/TM-CROSS-CUTTING-CONCERN.md) | Shared implementation concern with canonical ownership/applicability; not the same thing as Q/R/P. |
| [`TM-TEST-STRATEGY.md`](active/profiles/sds/target-modules/TM-TEST-STRATEGY.md) | Conditional shared proof/test strategy across known Domain/Slice portfolio. |
| [`TM-TEST-DESIGN.md`](active/profiles/sds/target-modules/TM-TEST-DESIGN.md) | Convert semantic properties/behaviors into concrete proof/test design for a Domain/Slice/etc Target. |
| [`TM-PRACTICAL-TEST.md`](active/profiles/sds/target-modules/TM-PRACTICAL-TEST.md) | Plan/interpret operated practical Evidence and acceptance/run material. |
| [`TM-TEST-COVERAGE.md`](active/profiles/sds/target-modules/TM-TEST-COVERAGE.md) | Audit actual current test/Evidence coverage after realization/execution. |

### Target Module ownership rule

A Lens may find an issue in a Target, but accepted semantic meaning remains with the natural Target owner. Example:

```text
WEUC Lens finds a local Slice architecture issue
→ Slice Answer Decision stays in TM-IMPLEMENTATION-SLICE owner

finding should constrain the whole Workspace
→ candidate promoted through TM-WEUC
```

---

## 9.3 `active/profiles/sds/lenses/` — SDS-specific evaluation lenses

Registry:

[`README.md`](active/profiles/sds/lenses/README.md)

SDS uses both generic Core Lenses and these profile-specific Lenses.

Each reusable Target Module and Lens contains one explicit `Knowledge Basis` using the same shared `INLINE / REFERENCED / HYBRID` contract. A Target Module pairs it with an Operational Target Contract; a Lens pairs it with an Operational Evaluation Contract. `TF-06A` performs a proportional Lens Applicability Scan: required/module-attached perspectives are combined with registered Core/profile gates and explicit selection. The active Target Module is one attachment source, not the whole Lens universe.

| Lens | Responsibility |
|---|---|
| [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md`](active/profiles/sds/lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) | L5 WEUC / evolution / architecture fitness. Checks Target change paths against Workspace Evolution/global architecture and now also understanding/change/verification/runtime work-cost surfaces. |
| [`LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md`](active/profiles/sds/lenses/frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md) | Searches for evolution-safe simplification: fewer unnecessary abstractions/entities/hops/files/test layers without buying future fragility. |
| [`LENS-APPLICATION-BOUNDARY-FEASIBILITY.md`](active/profiles/sds/lenses/reusable/LENS-APPLICATION-BOUNDARY-FEASIBILITY.md) | Application boundary, alternatives, core real-life route and proportional feasibility. |
| [`LENS-SCENARIO-BOUNDARY-BEHAVIOR.md`](active/profiles/sds/lenses/reusable/LENS-SCENARIO-BOUNDARY-BEHAVIOR.md) | Scenario boundary, DATA/Behavior completeness and observable-result quality. |
| [`LENS-DOMAIN-MODELING-DDD.md`](active/profiles/sds/lenses/reusable/LENS-DOMAIN-MODELING-DDD.md) | Domain meaning and optional DDD pattern vocabulary without forcing DDD everywhere. |
| [`LENS-SLICE-VERTICALITY-INTEGRATION.md`](active/profiles/sds/lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md) | Vertical result, Slice boundary and integration/collaboration quality. |
| [`LENS-UI-SPATIAL-FRONTEND-REALIZATION.md`](active/profiles/sds/lenses/reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md) | Screen/UI/spatial/frontend realization checks. |

`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` may be invoked against a concrete Target **or the Workspace Architecture itself**; persistence of global architecture remains owned by `TM-WEUC`.

---

## 9.4 `active/profiles/sds/workflow/` — SDS lifecycle navigation, not a second Target model

These files provide human-readable lifecycle/navigation phases. The actual next-step authority is [`active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md`](active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md).

| File | Navigation responsibility |
|---|---|
| [`00-invocation-planning-setup.md`](active/profiles/sds/workflow/00-invocation-planning-setup.md) | Invocation/request setup and distinction between outer operation and Target invocation mode. |
| [`01-need-reality-real-world-problem.md`](active/profiles/sds/workflow/01-need-reality-real-world-problem.md) | Need/reality/problem exploration. |
| [`02-real-life-solution-scenarios-and-composition.md`](active/profiles/sds/workflow/02-real-life-solution-scenarios-and-composition.md) | Real-life solution route discovery/comparison. |
| [`03-application-definition.md`](active/profiles/sds/workflow/03-application-definition.md) | Application Definition navigation. |
| [`04-application-scenario-system.md`](active/profiles/sds/workflow/04-application-scenario-system.md) | Scenario system navigation. |
| [`04a-screen-window-planning-handoff.md`](active/profiles/sds/workflow/04a-screen-window-planning-handoff.md) | Conditional Screen planning handoff. |
| [`05-optional-domain.md`](active/profiles/sds/workflow/05-optional-domain.md) | Optional Domain discovery/draft navigation. |
| [`06-realization-feasibility-delivery-shaping.md`](active/profiles/sds/workflow/06-realization-feasibility-delivery-shaping.md) | Feasibility/delivery shaping and Slice preparation. |
| [`07-workspace-architecture-weuc.md`](active/profiles/sds/workflow/07-workspace-architecture-weuc.md) | Workspace Evolution / architecture navigation. |
| [`08-detailed-slice-realization-target.md`](active/profiles/sds/workflow/08-detailed-slice-realization-target.md) | Detailed Slice realization planning navigation. |
| [`09-consistency-verification-planning.md`](active/profiles/sds/workflow/09-consistency-verification-planning.md) | Consistency and verification coordination. |
| [`10-authorized-realization.md`](active/profiles/sds/workflow/10-authorized-realization.md) | Boundary where authorized physical realization can occur. |
| [`11-evidence-reconciliation-revalidation.md`](active/profiles/sds/workflow/11-evidence-reconciliation-revalidation.md) | Evidence reconciliation and upstream revalidation. |

`workflow/step-02/` contains bounded branch-comparison examples/networks for Solution Discovery. They support Phase 02 and do not define a separate global runtime.

---

## 9.5 `active/profiles/sds/shared/` — Cross-Target SDS contracts

Use this directory when a rule is **specific to SDS but intentionally shared by more than one SDS Target Module/Lens**.

### Workflow / command / profile contracts

| File | Responsibility |
|---|---|
| [`directed-methodology-workflow-and-next-step-resolution.md`](active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md) | **Canonical SDS directed graph / readiness / next-step resolver.** Numeric workflow phases are navigation; this file owns the actual partial-order/next-step rules. |
| [`idtspe-command-surface-contract.md`](active/profiles/sds/shared/idtspe-command-surface-contract.md) | **SDS command-surface extension:** SDS bootstrap, Target Module/focused surfaces, SDS Lens shortcuts and current Core+SDS aggregate projection; generic Core surfaces remain owned by the Core contract. |
| [`sds-target-module-profile.md`](active/profiles/sds/shared/sds-target-module-profile.md) | SDS Target/Lens profile composition and application rules. |
| [`target-module-upstream-source-lineage-contract.md`](active/profiles/sds/shared/target-module-upstream-source-lineage-contract.md) | Rules for preserving upstream Source lineage when moving between SDS Targets. |
| [`target-module-upstream-source-map.md`](active/profiles/sds/shared/target-module-upstream-source-map.md) | Projection/map of upstream Sources by Target Module. |

### Ideas / evolution / workspace planning state

| File | Responsibility |
|---|---|
| [`layer-idea-registers-and-sds-evolution-map.md`](active/profiles/sds/shared/layer-idea-registers-and-sds-evolution-map.md) | Canonical relationship between loose layer Ideas and accepted future evolution. Ideas are persistence/routing, not a second planning runtime. |
| [`layer-ideas-template.md`](active/profiles/sds/shared/layer-ideas-template.md) | Representation template for a layer Ideas register. |
| [`sds-evolution-map-template.md`](active/profiles/sds/shared/sds-evolution-map-template.md) | Template for `SDS-EVOLUTION-MAP.md` — what/when product/system evolution is planned. |
| [`sds-workspace-evolution-template.md`](active/profiles/sds/shared/sds-workspace-evolution-template.md) | Template for `SDS-WORKSPACE-EVOLUTION.md`, including Current Global Architecture Position, paths, extension points and transitions. |
| [`sds-global-planning-state-layout.md`](active/profiles/sds/shared/sds-global-planning-state-layout.md) | Physical/global planning-state layout around Ideas/Evolution/Workspace Evolution. |
| [`sds-planning-context-template.md`](active/profiles/sds/shared/sds-planning-context-template.md) | Per-scenario/current planning context representation where useful. |
| [`sds-future-ideas-template.md`](active/profiles/sds/shared/sds-future-ideas-template.md) | Compatibility projection for older “future ideas” representation; not a second authority. |
| [`current-new-idea-fixation-audit.md`](active/profiles/sds/shared/current-new-idea-fixation-audit.md) | Audit of current Idea fixation/routing behavior. |

### Application / Scenario / Requirement shared boundaries

| File | Responsibility |
|---|---|
| [`application-definition-existing-solutions-market-reference-research.md`](active/profiles/sds/shared/application-definition-existing-solutions-market-reference-research.md) | Existing solution / market / reference research inside Application Definition. |
| [`application-definition-market-reference-research-recheck.md`](active/profiles/sds/shared/application-definition-market-reference-research-recheck.md) | Recheck/audit of that research boundary. |
| [`application-definition-refined-core-real-life-scenario.md`](active/profiles/sds/shared/application-definition-refined-core-real-life-scenario.md) | Refined core real-life route artifact/contract owned by Application Definition. |
| [`application-definition-core-real-life-scenario-recheck.md`](active/profiles/sds/shared/application-definition-core-real-life-scenario-recheck.md) | Recheck of refined core route boundary/ownership. |
| [`solution-discovery-workflow-and-question-presets.md`](active/profiles/sds/shared/solution-discovery-workflow-and-question-presets.md) | Working discovery/question presets for Solution Discovery; presets are aids, not mandatory semantic answers. |
| [`solution-scenario-discovery-and-composition-presets.md`](active/profiles/sds/shared/solution-scenario-discovery-and-composition-presets.md) | Optional real-life solution/composition presets. |
| [`need-reality-target-template.md`](active/profiles/sds/shared/need-reality-target-template.md) | Representation template for Need/Reality material. |
| [`requirement-ownership-and-exception-rule.md`](active/profiles/sds/shared/requirement-ownership-and-exception-rule.md) | Canonical rule that Requirement normally stays with its natural owner and standalone TM-REQUIREMENT is exceptional. |
| [`requirement-and-global-ideas-layout-recheck.md`](active/profiles/sds/shared/requirement-and-global-ideas-layout-recheck.md) | Audit/recheck of Requirement/Ideas physical boundary. |
| [`scenario-data-behavior-module-boundary-recheck.md`](active/profiles/sds/shared/scenario-data-behavior-module-boundary-recheck.md) | Confirms DATA/Behavior remain internal addressable Scenario contracts rather than separate Target Modules. |
| [`scenario-domain-slice-module-coverage-contract.md`](active/profiles/sds/shared/scenario-domain-slice-module-coverage-contract.md) | Cross-module coverage/boundary contract from Scenario through optional Domain to Slice. |

### Slice / realization shared boundaries

| File | Responsibility |
|---|---|
| [`useful-vertical-result-and-implementation-target-family.md`](active/profiles/sds/shared/useful-vertical-result-and-implementation-target-family.md) | Defines Useful Vertical Result and relationships among Slice/implementation target forms. |
| [`slice-runtime-integrated-part-extension-recheck.md`](active/profiles/sds/shared/slice-runtime-integrated-part-extension-recheck.md) | Recheck of Runtime Path, Integrated Implementation Plan, Part Plan and extension boundaries. |
| [`enman-slice-frontend-crosscut-findings.md`](active/profiles/sds/shared/enman-slice-frontend-crosscut-findings.md) | Preserved/refined findings informing Slice/Frontend/Cross-Cutting boundaries. |

### Compatibility / audit support

| File | Responsibility |
|---|---|
| [`decision-persistence-and-weuc-full-picture.md`](active/profiles/sds/shared/decision-persistence-and-weuc-full-picture.md) | Compatibility pointer to the current Decision persistence/WEUC model; not a duplicate owner. |
| [`step-02-full-consistency-review.md`](active/profiles/sds/shared/step-02-full-consistency-review.md) | Historical/current consistency recheck for Solution Discovery material; audit/support role. |

Rule: if a shared SDS file starts to own a concept that belongs to exactly one Target Module, move that meaning back to the Target Module and keep the shared file as a link/projection only.

---

## 9.6 `active/profiles/sds/examples/` — Demonstrations, not authority

### `examples/IDTSPE-RESPONSE-EXAMPLE.md`

Shows the expected shape of a complete IDTSPE response, including planning output, placement and methodology direction.

### `examples/research-capture/`

Large end-to-end worked case showing actual accumulation of canonical artifacts through the SDS workflow.

Start at:

[`active/profiles/sds/examples/research-capture/README.md`](active/profiles/sds/examples/research-capture/README.md)

The numbered `00`–`11` files demonstrate lifecycle traversal. The example also contains the resulting hypothetical SDS planning tree (`need/`, `application/`, `scenarios/`, `domain/`, `slices/`, `testing/`, `SDS-PLANNING-STATE/`, etc.).

Responsibility of examples:

```text
show how owners interact
show file placement in practice
show repeated CREATE / REFINE / REVALIDATE behavior
show testing and WEUC examples

NOT:
create new methodology rules
```

If an example disagrees with a Target Module/Lens/Core owner, fix the example.

---

# 10. Compatibility Navigation Directories Under `active/`

These directories remain only so old paths are not confusing during migration:

```text
active/target-modules/
active/lenses/
active/generic/
active/shared/
active/examples/
```

They contain navigation README files, not canonical duplicate bodies.

Canonical destinations are now:

```text
generic mechanics
→ active/idtspe-core/

SDS Target Modules / SDS Lenses / SDS workflow / SDS examples
→ active/profiles/sds/
```

**Do not add new semantic files to compatibility directories.**

Once external/repository consumers no longer rely on those paths, they may eventually be removed.

---

# 11. `integration/` — Repository Migration And Update Planning

Canonical package entry:

[`integration/README.md`](integration/README.md)

This directory is intentionally **not active methodology authority**.

## Files

| File | Responsibility |
|---|---|
| [`CURRENT-REPOSITORY-INTEGRATION.md`](integration/CURRENT-REPOSITORY-INTEGRATION.md) | Living source for the next repository update: fresh snapshot evidence, semantic coverage matrix, `KEEP / ADAPT / REPLACE / MERGE / REMOVE` decisions, command/helper migration, deletion gates and ordered update sequence. |
| [`FRESH-SNAPSHOT-RECONCILIATION-2026-08-25.md`](integration/FRESH-SNAPSHOT-RECONCILIATION-2026-08-25.md) | Evidence comparing the earlier repository snapshot to fresh base `ca768b61...`; records what changed and which prior conclusions remained valid. |
| [`target-module-current-repo-consistency-audit.md`](integration/target-module-current-repo-consistency-audit.md) | Earlier/current mapping audit between methodology Target Modules and repository planning owners. |
| [`COMMAND-AND-HELPER-NAVIGATION-PLAN.md`](integration/COMMAND-AND-HELPER-NAVIGATION-PLAN.md) | Planned helper tabs/grouping/order and IDTSPE runtime binding for SDS Target Module/Lens command surfaces; repository helper is not yet mutated. |
| [`target-module-entrypoints-and-command-readiness.md`](integration/target-module-entrypoints-and-command-readiness.md) | Repository-facing command/entrypoint readiness mapping. It describes repository state/candidates; desired canonical command architecture is owned by the SDS command-surface contract. |

### Integration rule

```text
methodology says what should be true
integration/ says how the current repository should migrate to it
```

Never put a repository-specific deletion path, commit hash or temporary migration status into a generic Target Module/Lens merely to make integration easier.

When repository migration is complete, historical integration records may be archived, while canonical methodology remains under `active/`.

---

# 12. `sources-readonly/` — Frozen Provenance And Superseded Models

Canonical entry:

[`sources-readonly/README.md`](sources-readonly/README.md)

This directory contains:

- earlier IDTSPE model revisions;
- discussion history;
- old audits/rechecks;
- retired Target Modules;
- superseded WEUC/Ideas models;
- prior planning workbooks and source packs.

Rule:

```text
read old source
→ identify still-useful meaning
→ merge/promote meaning into the correct active owner
→ keep source frozen
```

Do not continue editing an old source as if it were active methodology.

Historical presence of a concept does not mean the concept is still current.

---

# 13. How To Read The Workspace For Different Tasks

## A. Understand the whole methodology

Read:

1. [`README.md`](README.md) — package structure and authority.
2. [`active/METHODOLOGY-SYSTEM-MAP.md`](active/METHODOLOGY-SYSTEM-MAP.md) — installed whole-system map.
3. [`active/idtspe-core/BOOTSTRAP-IDTSPE.md`](active/idtspe-core/BOOTSTRAP-IDTSPE.md) — generic bootstrap/read contract.
4. [`active/idtspe-core/IDTSPE-CORE-MAP.md`](active/idtspe-core/IDTSPE-CORE-MAP.md) — generic owner map.
5. [`active/profiles/README.md`](active/profiles/README.md) — installed profiles.

Do **not** start by reading all 17 Target Modules and all raw theoretical bodies.

## B. Use IDTSPE for general planning without assuming SDS

Read/activate:

1. `BOOTSTRAP-IDTSPE.md` when governance is not already current.
2. `IDTSPE-SHELL.md` / resolved Core owners.
3. `IDTSPE-DEFAULT-WORK-MODE.md` if using `idtspe.work`.
4. Resolve a reusable Target Module when one fits, otherwise a Local Target Contract.
5. Use `TF-06A` / Lens registries to select applicable perspectives; full Lens/Knowledge-Basis bodies are read only for selected/plausible candidates.
6. Target-specific profile only after the Target/family is known or its Lens registry is intentionally selected.

## C. Work in SDS generally

Read:

1. Core bootstrap if necessary.
2. [`BOOTSTRAP-SDS.md`](active/profiles/sds/BOOTSTRAP-SDS.md).
3. [`SDS-FULL-MAP.md`](active/profiles/sds/SDS-FULL-MAP.md) when broad orientation is needed.
4. Directed workflow/next-step resolver.
5. Only the specific Target Module + applicable Lenses required for the current Target.

## D. Plan one concrete SDS Target

Typical read pattern:

```text
existing canonical target/source artifacts
+ selected TM-*.md OR Local Target Contract
+ referenced Target Module Knowledge Basis only according to module load policy
+ required Core Lenses
+ TF-06A Lens Applicability Scan over module attachment + Core/profile registries
+ selected Lens Operational Contract(s)
+ referenced Lens Knowledge Basis only according to Lens load policy
+ narrow shared contracts referenced by them
↓
IDTSPE invocation
```

Do not bootstrap by reading every module every time.

## E. Maintain/add methodology

Start from the maintenance owner:

- Target Module → `target-module-creation-and-integration-use-case.md`
- Lens → `lens-creation-and-integration-use-case.md`
- generic Core mechanic → Core owner boundary + consistency checks
- profile workflow → profile map + directed resolver + affected owners

Then update projections/examples/audits after the canonical owner changes.

## F. Plan repository migration

Read:

1. current active methodology owner(s);
2. [`integration/CURRENT-REPOSITORY-INTEGRATION.md`](integration/CURRENT-REPOSITORY-INTEGRATION.md);
3. fresh repository evidence/snapshot;
4. only then produce repository file-update actions.

Do not infer current repository truth only from `sources-readonly/` or old integration snapshots.

---

# 14. Where A New File Should Go

Use this decision table before creating a methodology document.

| New material | Correct location |
|---|---|
| Generic IDTSPE runtime/mechanic used across profiles | `active/idtspe-core/shared/` or an existing narrower Core owner |
| Generic reusable Lens | `active/idtspe-core/lenses/...` |
| Generic Target Module framework change | `active/idtspe-core/shared/target-module-*` / Core Target Module framework |
| Concrete SDS Target semantics | `active/profiles/sds/target-modules/` |
| SDS-specific Lens | `active/profiles/sds/lenses/` |
| SDS-specific cross-Target rule | `active/profiles/sds/shared/` |
| SDS lifecycle/navigation | `active/profiles/sds/workflow/` or directed resolver when it is actual next-step authority |
| SDS documentation/representation decision | Core `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY` → SDS `ARTIFACT-PLACEMENT-MAP.md` → P-14; `SDS-PHYSICAL-PLANNING-TREE.md` is coordinator only |
| SDS worked example | `active/profiles/sds/examples/` |
| Useful raw theory with unclear timing/application | `active/theoretical-modules/<topic>/` |
| Independent cross-cutting AI review/output concern | `active/ai-reviewability/` or a new explicitly registered peer package if genuinely independent |
| Repository migration/delete/adapt plan | `integration/` |
| Frozen historical/superseded material | `sources-readonly/` |
| Compatibility navigation only | existing compatibility README; **never add new semantics there** |

### Before creating a new file, ask

```text
1. Is there already a natural semantic owner?
   yes → update it instead of creating another authority

2. Is this generic IDTSPE or profile-specific?

3. Is this operationalized enough to be a Target Module/Lens?
   no → maybe Theoretical Module

4. Is this only a projection/map/template/example/audit?
   then label that responsibility explicitly

5. Does it need durable separate addressability?
   apply required Documentation / Representation Lens, then P-14 placement rules
```

---

# 15. Methodology Maintenance Invariants

These invariants should stay true as the workspace grows.

### One semantic owner

```text
one material responsibility
→ one canonical semantic owner
```

Maps, registries, templates and examples may repeat a summary/reference, but must not become hidden second authorities.

### Core/profile separation

```text
generic mechanism
→ IDTSPE Core

SDS-specific planning meaning
→ SDS Profile
```

Do not move something into Core merely because multiple SDS modules use it.

### Target/Lens separation

```text
Target Module
→ owns target meaning/output

Lens
→ asks/evaluates/finds
→ cannot override owner
```

### Processed/raw separation

```text
processed operational rule
→ Core / Target Module / Lens / profile contract

raw not-yet-operationalized theory
→ Theoretical Module
```

### Methodology/integration separation

```text
what the method is
→ active/

how current repository migrates
→ integration/
```

### Current/provenance separation

```text
current authority
→ active/

old/superseded evidence
→ sources-readonly/
```

### Artifact placement separation

A separate file does not automatically mean a separate semantic Target. P-14/TF-10 resolves persistence/addressability; semantic ownership remains with the natural owner.

### Examples and audits do not create rules

If a useful new rule is discovered while writing an example or audit:

```text
finding
→ update canonical owner
→ then update example/audit
```

---

# 16. Current Package Summary

Current active composition at this workspace revision:

```text
IDTSPE Core Shell ports: 15

SDS Target Modules: 17

Reusable Lenses: 18 total
  Core generic: 11
  SDS-specific: 7

Artifact placement source records:
  AP: 34
  AG: 24
  total: 58

Installed profiles:
  SDS

Raw Theoretical Modules:
  THM-TESTING-DETAIL-CA768B61

Independent peer concern:
  AI Reviewability / Key Points

Current repository-integration evidence base:
  obs-planning-docs snapshot base ca768b61...
```

For current mechanical/audit truth, use [`active/FINAL-METHODOLOGY-AUDIT.md`](active/FINAL-METHODOLOGY-AUDIT.md) and the current `MANIFEST.json`; do not treat the numeric summary in this README as a substitute for those checks.

---

# 17. Primary Navigation Shortlist

If only a small set of files can be kept open, use these:

1. **Workspace structure / responsibilities** — [`README.md`](README.md)
2. **Whole installed methodology** — [`active/METHODOLOGY-SYSTEM-MAP.md`](active/METHODOLOGY-SYSTEM-MAP.md)
3. **Generic bootstrap** — [`active/idtspe-core/BOOTSTRAP-IDTSPE.md`](active/idtspe-core/BOOTSTRAP-IDTSPE.md)
4. **Generic Core map** — [`active/idtspe-core/IDTSPE-CORE-MAP.md`](active/idtspe-core/IDTSPE-CORE-MAP.md)
5. **IDTSPE runtime** — [`active/idtspe-core/IDTSPE-SHELL.md`](active/idtspe-core/IDTSPE-SHELL.md)
6. **Default AI planning mode** — [`active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md`](active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md)
7. **SDS bootstrap** — [`active/profiles/sds/BOOTSTRAP-SDS.md`](active/profiles/sds/BOOTSTRAP-SDS.md)
8. **Full SDS map** — [`active/profiles/sds/SDS-FULL-MAP.md`](active/profiles/sds/SDS-FULL-MAP.md)
9. **SDS directed next-step resolver** — [`active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md`](active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md)
10. **Documentation / Representation Lens + worked physical topologies** — [`active/idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](active/idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md)
11. **SDS annotated Artifact Materialization Tree** — [`active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md`](active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md)
12. **SDS physical-topology coordinator** — [`active/profiles/sds/SDS-PHYSICAL-PLANNING-TREE.md`](active/profiles/sds/SDS-PHYSICAL-PLANNING-TREE.md)
13. **SDS Target Module catalog** — [`active/profiles/sds/target-modules/README.md`](active/profiles/sds/target-modules/README.md)
14. **Lens registries** — [`active/idtspe-core/lenses/README.md`](active/idtspe-core/lenses/README.md) + [`active/profiles/sds/lenses/README.md`](active/profiles/sds/lenses/README.md)
    - generic Lens operations: `подбери линзы <target/context>` / `примени линзу <lens> к <target/context>`
15. **Theoretical Modules** — [`active/theoretical-modules/README.md`](active/theoretical-modules/README.md)
16. **AI Reviewability** — [`active/ai-reviewability/README.md`](active/ai-reviewability/README.md)
17. **Repository migration plan** — [`integration/CURRENT-REPOSITORY-INTEGRATION.md`](integration/CURRENT-REPOSITORY-INTEGRATION.md)
18. **Final consistency evidence** — [`active/FINAL-METHODOLOGY-AUDIT.md`](active/FINAL-METHODOLOGY-AUDIT.md)

The Core Lens library also includes [`LENS-LINKED-NOTES-USAGE-JUSTIFICATION`](active/idtspe-core/lenses/reusable/LENS-LINKED-NOTES-USAGE-JUSTIFICATION.md): it decides whether Linked Notes/backlink/query behavior is justified. **It does not define a `notes/` directory or a Linked Notes artifact family.**

This ordering intentionally starts with structure/Core, then activates SDS or another profile only when needed.
