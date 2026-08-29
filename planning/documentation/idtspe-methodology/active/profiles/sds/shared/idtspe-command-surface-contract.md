# SDS Profile Command Surface Extension

Status: active SDS profile command-surface extension; generic IDTSPE Core surfaces are owned separately

## Purpose

Define the **SDS-specific extension** to the generic IDTSPE command surface without making command files, palette UI or helper code a second methodology authority. Generic Core command semantics and host-target policies are owned by [`../../../idtspe-core/shared/idtspe-command-surface-contract.md`](../../../idtspe-core/shared/idtspe-command-surface-contract.md).

```text
Target Module / Use Case / Lens owners
= methodology semantics

Command surface
= stable user invocation/navigation projection

Repository command definition / Tampermonkey helper
= implementation of that projection
```

This file defines SDS bootstrap, Target Module/focused surfaces and SDS-specific Lens shortcuts, plus the current Core+SDS aggregate projection. It does **not** redefine generic Core surfaces and does **not** choose exact repository filenames, migration steps or implementation diffs.


## 0. Core + SDS Composition

Generic Core surfaces are inherited from the Core command-surface contract. SDS adds one profile bootstrap, its Target Module/focused surfaces and SDS-specific Lens shortcuts. Bootstrap remains layered and is not a Target Module.

```text
idtspe.bootstrap
→ бутстреп idtspe
→ generic IDTSPE Core orientation / installed profile indexes

idtspe.work
→ работай через idtspe
→ use IDTSPE Core Shell as the default material-planning operating mode; resolve scope/Target and treat AI proposals as Ideas by default

sdscmd.bootstrap
→ бутстреп sds
→ current SDS profile orientation / 17 TM catalog / SDS Lens pack / workflow / planning tree
```

`бутстреп idtspe` is owned by [`../../../idtspe-core/BOOTSTRAP-IDTSPE.md`](../../../idtspe-core/BOOTSTRAP-IDTSPE.md).

`работай через idtspe` is owned by [`../../../idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md`](../../../idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md).

`бутстреп sds` is owned by [`../BOOTSTRAP-SDS.md`](../BOOTSTRAP-SDS.md).

A specific module/lens command may internally refresh the required bootstrap scope; do not force the user to invoke either bootstrap separately when the current command can establish its preconditions safely.

The repository's existing `application_sds.bootstrap` is a reuse/adaptation candidate for the SDS bootstrap only; it must not silently stand in for the generic IDTSPE Core bootstrap without a repository audit.

### Current Methodology Surface Inventory

The current accepted methodology-level inventory is:

```text
3 framework/bootstrap/work surfaces
17 canonical SDS Target Module surfaces
12 additional focused Target-Module shortcuts
4 reusable direct Lens shortcut surfaces
5 orchestration/validator surfaces
= 41 accepted methodology invocation surfaces
```

This is a **methodology surface count**, not a requirement for 41 repository command files. Existing command definitions/aliases may implement several surfaces where semantics remain clear.

The four fixed/specialized direct Lens shortcut surfaces are currently exactly:

```text
lenscmd.weuc.check
lenscmd.simplicity.check
lenscmd.documentation.representation.check
lenscmd.linked-notes.justify
```

All registered Lenses are also reachable without receiving one command file each through two **inherited generic Core operations**:

```text
idtspe.lenses.select
→ подбери линзы <target/context>
→ run the proportional TF-06A Lens Applicability Scan

idtspe.lens.apply
→ примени линзу <lens> к <target/context>
→ dispatch to one selected registered Lens inside/reusing the natural IDTSPE Target
```

These two surfaces are `ORCHESTRATION`, not fixed `LENS` identities: the selected Lens file remains semantic authority and may come from Core or an active profile.

## 0.1 SDS Command Runtime Invariant

SDS is an **IDTSPE profile**, not a parallel planning runtime.

```text
SDS Target Module command
→ one IDTSPE Target invocation
→ SDS Target Module configures the Target-specific contract

SDS Lens command
→ resolve/reuse an IDTSPE Target context
→ Lens runs inside that IDTSPE iteration
→ Lens surfaces Finding Candidate(s)
→ Core Finding Disposition resolves the actual State / semantic owner / lifecycle consequence
```

Therefore helper/UI presentation should explicitly identify SDS Target commands as `IDTSPE TARGET` surfaces and SDS direct Lens commands as `IDTSPE LENS` surfaces.

The planned helper grouping/order is maintained separately in [`../../../../integration/COMMAND-AND-HELPER-NAVIGATION-PLAN.md`](../../../../integration/COMMAND-AND-HELPER-NAVIGATION-PLAN.md) so tab/order changes do not become command-semantic authority.

## 1. Canonical Command Invariant

Every active Target Module must have at least one canonical user-level command surface.

```text
17 active Target Modules
→ 17 canonical module command surfaces
```

A conditional/exceptional Target Module still gets a command.

The command first applies the Target/module gate. A valid result may be:

```text
Target justified
→ CREATE / REFINE / EXTEND / REVALIDATE / REPAIR that Target

Target not justified
→ do not create a fake Target
→ explain the failed gate
→ surface the failed gate as Target Formation input
→ Target Formation resolves reuse / handoff to an existing owner or the appropriate methodology next step; the command does not route semantic ownership itself
```

Therefore:

```text
conditional Target
≠ hidden/uncommandable Target
```

## 2. Invocation Mode Is Not A Separate Command Family

Repeated planning of the same Target normally reuses the same canonical command.

```text
CREATE
REFINE
EXTEND
REVALIDATE
REPAIR
```

are IDTSPE Target invocation modes resolved from current context and existing artifacts.

Do **not** create generic commands such as:

```text
refine domain
revalidate slice
repair scenario
```

merely to mirror those modes.

A focused command is justified only when it represents a stable user intent/substage with a distinct useful entry condition or exit gate.

## 3. Canonical 17-Module Surface

`Surface Key` is methodology identity only. A later repository-update plan decides whether an existing command ID is reused, renamed, extended through aliases, or a new definition is needed.

| Target Module | Surface Key | Canonical user intent | Typical Target granularity |
|---|---|---|---|
| `TM-APPLICATION-DEFINITION` | `tmcmd.application.definition` | `определи приложение` | one Application Definition |
| `TM-PROTOTYPE` | `tmcmd.prototype` | `спланируй прототип <uncertainty/subject>` | one bounded prototype/experiment Target |
| `TM-SCENARIO-DISCOVERY` | `tmcmd.scenario.discovery` | `собери сценарии приложения` | Scenario inventory/catalog |
| `TM-SCENARIO-DRAFT` | `tmcmd.scenario.draft` | `спланируй сценарий <scenario>` | one Scenario owner |
| `TM-SCREEN` | `tmcmd.screen` | `спланируй экраны` | Screen system/map or selected Screen scope |
| `TM-REQUIREMENT` | `tmcmd.requirement` | `спланируй общее требование <requirement>` | one exceptional shared must-hold candidate |
| `TM-WEUC` | `tmcmd.weuc` | `спланируй эволюцию воркспейса` | one canonical Workspace Evolution Map Target |
| `TM-DOMAIN-DISCOVERY` | `tmcmd.domain.discovery` | `исследуй домен` | Domain candidate space |
| `TM-DOMAIN-DRAFT` | `tmcmd.domain.draft` | `спланируй домен <owner>` | one Domain owner |
| `TM-TEST-DESIGN` | `tmcmd.test.design` | `спланируй тесты <target>` | one Domain/Slice/etc proof Target |
| `TM-SLICE-STRATEGY` | `tmcmd.slice.strategy` | `спланируй стратегию слайсов` | Slice portfolio/decomposition |
| `TM-TEST-STRATEGY` | `tmcmd.test.strategy` | `спланируй стратегию тестирования` | one shared testing-strategy Target when justified; may include a test-realization registry/map |
| `TM-IMPLEMENTATION-SLICE` | `tmcmd.slice.implementation` | `спланируй слайс <slice>` | one Slice owner |
| `TM-FRONTEND-SLICE` | `tmcmd.slice.frontend` | `спланируй frontend <target>` | one promoted frontend Target when justified |
| `TM-CROSS-CUTTING-CONCERN` | `tmcmd.crosscut` | `спланируй сквозную ответственность <target>` | one genuine shared non-vertical concern |
| `TM-PRACTICAL-TEST` | `tmcmd.test.practical` | `спланируй практический тест <target>` | one practical Evidence Target |
| `TM-TEST-COVERAGE` | `tmcmd.test.coverage` | `проверь тестовое покрытие <scope>` | selected semantic/Evidence coverage scope |

## 4. Focused Command Rule

A focused command is allowed when all are true:

```text
same semantic Target Module remains authority
+ user intent is stable/recurrent
+ entry condition differs materially
  OR exit gate/output focus differs materially
+ shortcut makes invocation clearer than one overloaded phrase
```

A focused command does not create a new Target type merely because it has a separate phrase/button.

## 5. Current Focused Surfaces Worth Preserving / Adding

Current accepted focused-surface inventory:

| Surface Key | Canonical user intent | Route |
|---|---|---|
| `tmcmd.application.definition.concept` | `план концепции приложения` | `TM-APPLICATION-DEFINITION / concept` |
| `tmcmd.application.definition.responsibility` | `определи ответственность приложения` | `TM-APPLICATION-DEFINITION / responsibility boundary` |
| `tmcmd.prototype.review` | `разбери результаты прототипа <subject>` | same `TM-PROTOTYPE` Target with Evidence |
| `tmcmd.screen.single` | `спланируй экран <screen>` | `TM-SCREEN / selected Screen` |
| `tmcmd.weuc.interpret` | `интерпретируй план с точки зрения эволюции воркспейса` | `TM-WEUC / EARLY_INTERPRETATION` |
| `tmcmd.weuc.paths` | `распиши пути эволюции воркспейса` | `TM-WEUC / PROJECTED_WORKSPACE_EVOLUTION` |
| `tmcmd.weuc.refresh` | `обнови карту эволюции воркспейса` | `TM-WEUC / EXTEND_REFRESH_RECONCILE` |
| `tmcmd.weuc.architecture-position` | `продумай архитектурную позицию воркспейса` | `TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION` |
| `tmcmd.test.design.domain` | `спланируй тесты домена <owner>` | `TM-TEST-DESIGN / Domain` |
| `tmcmd.test.design.slice` | `спланируй тесты слайса <slice>` | `TM-TEST-DESIGN / Slice` |
| `tmcmd.slice.implementation.detail` | `детализируй реализацию слайса <slice>` | same `TM-IMPLEMENTATION-SLICE` Target / detailed implementation focus |
| `tmcmd.test.practical.review` | `разбери результаты практического теста <target>` | same `TM-PRACTICAL-TEST` Target with actual Evidence |

Exactly **12** focused Target-Module shortcuts are currently accepted. Existing repository compatibility commands such as reality/research/solution routes may be retained/adapted during migration without becoming additional canonical methodology surfaces unless we explicitly promote them later.

### Application Definition

```text
план концепции приложения
→ TM-APPLICATION-DEFINITION / concept-focused scope

определи ответственность приложения
→ TM-APPLICATION-DEFINITION / responsibility-boundary scope
```

These may coexist with the canonical umbrella `определи приложение`.

### Prototype

```text
спланируй прототип <subject>
→ plan/create/refine experiment

разбери результаты прототипа <subject>
→ same TM-PROTOTYPE Target / REVALIDATE or REFINE with actual Evidence
```

The second command is justified by the real execution/Evidence boundary.

### Screen

```text
спланируй экраны
→ Screen Map / Scenario×Screen / routes / availability

спланируй экран <screen>
→ one independently addressable Screen Draft scope
```

Both route to `TM-SCREEN`.

### WEUC

Umbrella:

```text
спланируй эволюцию воркспейса
```

Useful focused intents:

```text
интерпретируй план с точки зрения эволюции воркспейса
→ EARLY_INTERPRETATION

распиши пути эволюции воркспейса
→ PROJECTED_WORKSPACE_EVOLUTION

обнови карту эволюции воркспейса
→ EXTEND_REFRESH_RECONCILE

продумай архитектурную позицию воркспейса
→ TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION
→ use WEUC Lens with Target = whole Workspace architecture
→ select/refine project-global decisions/principles/defaults/conventions
```

All remain `TM-WEUC`; the architecture-position scope does not create `TM-ARCH`.

### Test Design

Umbrella:

```text
спланируй тесты <target>
```

Typed focused intents:

```text
спланируй тесты домена <owner>
→ per-Domain Test Design; unit-test-oriented by default

спланируй тесты слайса <slice>
→ per-Slice Test Design; integration-test-oriented orchestration by default
```

These are typed shortcuts over `TM-TEST-DESIGN`, not separate algorithms.

### Implementation Slice

```text
спланируй слайс <slice>
→ full/current Slice planning

детализируй реализацию слайса <slice>
→ same TM-IMPLEMENTATION-SLICE Target / usually REFINE after semantic contract or TDD Test Design exists
```

The focused detail command is useful because it has a stable exit gate: call-level Codebase Integration Path / Part Plans.

### Practical Test

```text
спланируй практический тест <target>
→ protocol / task / environment / observation plan

разбери результаты практического теста <target>
→ same TM-PRACTICAL-TEST Target with actual Evidence + interpretation
```

Again, the execution boundary justifies the second surface.

## 6. Conditional Module Command Gates

### `TM-REQUIREMENT`

Command may resolve:

```text
shared multi-owner must-hold is justified
→ Target Formation resolves reuse of an existing Requirement Target or formation of a Requirement Target

rule belongs naturally to Scenario / Domain / Screen / Cross-Cutting / architecture Decision
→ no Requirement Target
→ use that existing semantic owner; if ownership is materially ambiguous, Core Finding Disposition / Target Formation resolves it
```

### `TM-FRONTEND-SLICE`

```text
frontend has independent Scope / Questions / Ideas / Decisions / revalidation depth
→ Target Formation candidate for `TM-FRONTEND-SLICE`
→ Target Formation decides reuse of an existing Frontend Target or formation/promotion of a Frontend Target

otherwise
→ keep frontend as Part Plan in parent Implementation Slice
```

### `TM-CROSS-CUTTING-CONCERN`

```text
genuine shared guarantee/responsibility across consumers
→ Target Formation resolves reuse of an existing Cross-Cutting Target or formation of a Cross-Cutting Target

mere duplicated/similar code
→ keep local or use ordinary reuse/refactor route
```

### `TM-TEST-STRATEGY`

```text
shared proof coordination materially needed
+ Domain proof planning sufficiently resolved
+ Slice portfolio known enough
→ Target Formation resolves reuse of an existing Test Strategy Target or formation of a Test Strategy Target
→ optionally map Slice/Domain proof owners to concrete test suites/classes/setups/fixtures/harnesses/helpers when that cross-owner read path is useful

otherwise
→ no Strategy Target; recommend local Test Design / Slice Strategy next
```

## 7. Generic Lens Operations And Specialized Shortcuts

### 7.0 Lens Applicability / Apply Operations

```text
Surface Key: idtspe.lenses.select
Canonical intent: подбери линзы <target/context>
Owner: TF-06A LENS_SET + IDTSPE Lens Registry / Lens Model

Surface Key: idtspe.lens.apply
Canonical intent: примени линзу <lens> к <target/context>
Owner: generic dispatcher; selected Lens owner supplies semantics
```

`idtspe.lenses.select` scans required Core, the active Target Module Lens Profile when any, registered Core/profile applicability gates and explicit user/agent choices. It may use a Local Target Contract; it does not require a reusable Target Module. Registry summaries are checked before full Lens/Knowledge-Basis bodies are loaded.

`idtspe.lens.apply` resolves one named registered Lens, reads its Operational Evaluation Contract and `Knowledge Basis` according to its load policy, and applies it inside the natural Target context. It does not manufacture a Lens-owned Target or make the dispatcher command a Lens authority.

Both are generic Core orchestration surfaces and therefore belong in the IDTSPE helper view under `Lens Operations`.

### 7.1 Specialized Direct Lens Shortcuts

Not every Lens needs a specialized palette command. A fixed Lens gets a shortcut only when it represents a **stable recurring user intent** useful enough to deserve dedicated wording in addition to the generic operations.

Current accepted reusable Lens command surfaces:

| Lens | Surface Key | Canonical user intent | Why direct invocation is justified |
|---|---|---|---|
| `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` | `lenscmd.weuc.check` | `проверь эволюцию и архитектуру <target>` | recurring explicit architecture/evolution fitness review of a selected Target or whole Workspace architecture |
| `LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY` | `lenscmd.simplicity.check` | `проверь можно ли упростить <target>` | recurring explicit search for a materially simpler solution while preserving semantic/evolution fitness |
| `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY` | `lenscmd.documentation.representation.check` | `проверь как лучше зафиксировать <target/result>` | recurring explicit decision whether material meaning should persist at all and, if so, whether code/native representation, an existing owner, one consolidated artifact or a justified split is the cheapest effective representation |
| `LENS-LINKED-NOTES-USAGE-JUSTIFICATION` | `lenscmd.linked-notes.justify` | `проверь оправданы ли linked notes <target>` | recurring explicit decision whether linked-navigation/backlink/query capability is worth introducing for the selected owner set |

These surfaces **activate/evaluate through IDTSPE and existing Target ownership**. They do not create new Target Modules or a parallel Lens runtime.

### 7.2 WEUC / Architecture / Evolution Check

```text
Surface Key: lenscmd.weuc.check
Canonical intent: проверь эволюцию и архитектуру <target>
Owner: LENS-WORKSPACE-EVOLUTION-ARCHITECTURE
```

Resolution:

```text
Target = Domain / Slice / Frontend / Cross-Cutting / etc.
→ run normal IDTSPE Target with L5 activated
→ L5 surfaces architecture/evolution Finding Candidate(s)
→ Core Finding Disposition resolves local State / semantic owner / lifecycle consequence
→ accepted local Answer-Decision input stays with the current Target only when that Target is resolved as owner
→ if project-global meaning remains, surface a separate global-update Finding Candidate with `TM-WEUC` as the likely-owner hint
→ Core Finding Disposition resolves the actual global owner/handoff; Target Formation handles owner-Target formation/reuse when necessary

Target = whole Workspace architecture
→ resolve TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION
→ run L5 across current global architecture + expected evolution
→ accepted global principles/defaults/conventions update SDS-WORKSPACE-EVOLUTION.md
```

Helper presentation:

```text
When To Use:
  when a Target or the whole Workspace architecture should be checked against
  the current global architecture position, planned/probable evolution and
  prepared extension/change paths.

What You Get:
  architecture/evolution fit Finding Candidates, projected change paths and
  isolation/leakage Finding Candidates; Core Finding Disposition may resolve
  accepted local Decision inputs and, when project-global meaning is suspected,
  a global-update Finding Candidate with `TM-WEUC` as a likely-owner hint.
  For an explicitly selected whole-Workspace `TM-WEUC` Target, the result may
  instead directly refine the Current Global Architecture Position.
```

### 7.3 Simplicity / Implementation Economy Check

```text
Surface Key: lenscmd.simplicity.check
Canonical intent: проверь можно ли упростить <target>
Owner: LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY
```

Resolution:

```text
selected Domain / Slice / Test / Frontend / Cross-Cutting / architecture candidate
+ current accepted semantics
+ WEUC/global/local evolution constraints when material
→ inventory abstractions / owners / hops / mappings / proof machinery
→ search REMOVE / MERGE / INLINE / REUSE / DEFER / MOVE candidates
→ reject simplifications that damage required semantics or justified evolution fitness
→ surface simplification Finding Candidate / proposed refinement
→ Core Finding Disposition resolves semantic owner / State consequence
→ when the current Target is the resolved owner, use the accepted simplification as Answer-Decision input there
```

Helper presentation:

```text
When To Use:
  when a proposed Domain/Slice/Test/Frontend/architecture solution may be over-designed,
  contain too many abstractions/hops/entities, or should be challenged for a cheaper
  implementation without sacrificing known change/evolution needs.

What You Get:
  a proportional complexity inventory, unpaid-complexity findings, one or more
  evolution-safe simplification candidates, what must remain and why, and Decision/QRP
  inputs for the current Target.
```

### 7.4 Documentation / Representation Check

```text
Surface Key: lenscmd.documentation.representation.check
Canonical intent: проверь как лучше зафиксировать <target/result>
Owner: LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY
```

Resolution:

```text
selected Target/result
→ resolve/reuse its IDTSPE context
→ apply the required Documentation / Representation Lens explicitly
→ decide NO_PERSISTENCE / implementation-native / existing owner section / consolidated artifact / justified split / generated-derived representation
→ only after representation is selected, hand concrete placement to P-14
```

Helper presentation:

```text
When To Use:
  when the user explicitly wants to decide whether planning meaning needs durable
  persistence, whether it can live naturally in code/tests/types/schema/comments,
  whether an existing owner is enough, or whether a dedicated/split artifact is justified.

What You Get:
  the cheapest effective representation decision, duplication/staleness warnings,
  owner-vs-file boundary, promotion/split trigger when relevant, and P-14 placement handoff.
```

This direct surface is useful even though the Lens is required at materialization time: the explicit command lets the user revisit representation/file pressure as a bounded question without rerunning unrelated planning.

### 7.5 Linked Notes Usage / Justification Check

```text
Surface Key: lenscmd.linked-notes.justify
Canonical intent: проверь оправданы ли linked notes <target>
Owner: LENS-LINKED-NOTES-USAGE-JUSTIFICATION
```

Resolution:

```text
selected Target / owner set / relation set
→ identify concrete backlink/query/traversal/review job
→ confirm canonical owners are already clear
→ compare against ordinary links and existing indexes/registries
→ default NOT_JUSTIFIED when cheaper navigation is sufficient
→ JUSTIFIED only for material distributed navigation/query value
→ route exact-copy/synchronization needs to Reference Object analysis instead
```

Helper presentation:

```text
When To Use:
  when several existing owners/Decisions/QRP items may benefit from backlinks, query,
  relationship discovery or repeated cross-owner review navigation and you want to
  decide whether Linked Notes behavior is actually worth introducing.

What You Get:
  JUSTIFIED / NOT_JUSTIFIED / ROUTE_TO_REFERENCE_OBJECT, the concrete navigation job,
  the owners/relations involved, and the cheapest sufficient mechanism. No notes/
  storage tree or new semantic owner is created.
```

## 8. Orchestration Commands Outside Target Modules

These are methodology-navigation/composition commands and must not pretend to be Target Modules or fixed Lens owners.

```text
idtspe.lenses.select
idtspe.lens.apply
idtspe.next
idtspe.continue
idtspe.review_consistency
```

The first two own Lens selection/dispatch orchestration only; `idtspe.next` / `idtspe.continue` own methodology direction/continuation behavior; Consistency Review remains a validator/Use Case.

### `idtspe.next`

User intent:

```text
что дальше по методологии
```

Result:

```text
Methodology Direction View only:
Current Target / Exit Gate / Recommended next / Why / alternatives / reopen triggers
```

It does not execute the next Target automatically.

### `idtspe.continue`

User intent:

```text
продолжи по методологии
```

Result:

```text
resolve current recommended next Target
→ invoke that Target through normal IDTSPE Shell
```

Normal confirmation/permission rules still apply.

### `idtspe.review_consistency`

User intent:

```text
проверь консистентность плана
```

Route:

```text
UC-IDTSPE-REVIEW-CONSISTENCY
```

Consistency Review remains a Use Case/validator, not a Target Module.

## 9. Helper Presentation Requirement

Every **new IDTSPE canonical or focused repository command** must carry explicit user-facing commentary defined by:

[`command-helper-usage-metadata-extension.md`](../../../idtspe-core/shared/command-helper-usage-metadata-extension.md)

Methodology-level command specification must include:

```text
When To Use
What You Get
```

The helper implementation fields remain optional for old commands so existing commands are backward compatible.

For a conditional command, `When To Use` should explain the gate and `What You Get` should acknowledge the valid no-Target outcome when relevant.

Example:

```text
Command:
  спланируй frontend <target>

When To Use:
  frontend realization appears to contain independent state/navigation/data-flow/architecture choices that may deserve promotion beyond a Slice Part Plan.

What You Get:
  either a Frontend Target plan when Target Formation resolves one, or an explicit finding that frontend should remain embedded in the parent Slice with the Target-Formation-resolved next step.
```

## 10. Repository Compatibility Rule

A later repository-update plan must begin from actual current command definitions and helper implementation.

For each methodology Surface Key decide separately:

```text
REUSE_EXISTING_COMMAND
EXTEND_EXISTING_COMMAND_ALIASES/METADATA
ADD_FOCUSED_COMMAND
ADD_NEW_CANONICAL_COMMAND
KEEP_EXISTING_NON-IDTSPE_COMMAND_UNCHANGED
```

Do not rename/delete a working existing command merely to make IDs aesthetically uniform.

The desired methodology surface and current repository command IDs are intentionally separate concerns.
