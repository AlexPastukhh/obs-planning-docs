# Command And Helper Navigation Plan — IDTSPE + SDS

Status: **implemented in the staged replacement target; helper navigation remains a projection, not semantic authority**  
Repository evidence baseline: `ca768b61b2c84d6cda6c27b4ace7c4fc87d404e7`  
Semantic command owners:
- generic Core: [`../active/idtspe-core/shared/idtspe-command-surface-contract.md`](../active/idtspe-core/shared/idtspe-command-surface-contract.md)
- SDS extension: [`../active/profiles/sds/shared/idtspe-command-surface-contract.md`](../active/profiles/sds/shared/idtspe-command-surface-contract.md)

## 1. Purpose

Define how the accepted methodology command surfaces should be presented in the command helper without turning helper navigation into a second methodology authority.

The design must make one relationship explicit everywhere:

```text
IDTSPE
= planning runtime / iteration shell

SDS
= an installed profile of IDTSPE

SDS Target Module command
= invoke/reuse one IDTSPE Target iteration
  configured by that SDS Target Module

SDS Lens command
= resolve/reuse an IDTSPE Target context
  and activate an additional Lens inside that iteration
```

Therefore the helper must never visually imply:

```text
IDTSPE workflow
SDS workflow
Lens workflow
```

as three independent runtimes.

The correct picture is:

```text
IDTSPE Shell
  + resolved SDS Target Module
  + applicable Core/SDS Lenses
  = one SDS planning iteration
```

## 2. Authority Boundary

```text
Target Module / Lens / Core owners
→ semantic methodology authority

Core command-surface contract + selected profile extension
→ accepted user invocation surface

this plan
→ helper navigation / grouping / ordering plan

repository command definitions
→ concrete invocations / aliases / metadata

Tampermonkey helper
→ UI projection only
```

Changing a tab, group, order or parent/child presentation must not silently change routing, Target ownership, invocation mode or Lens semantics.

## 3. Two Methodology Tabs

The helper should expose two dedicated methodology views.

### 3.1 `IDTSPE`

Generic Core/runtime surfaces only:

| Order | Surface | User intent | Surface kind |
|---:|---|---|---|
| 01 | `idtspe.bootstrap` | `бутстреп idtspe` | Bootstrap |
| 02 | `idtspe.work` | `работай через idtspe` | Core work mode |
| 03 | `idtspe.next` | `что дальше по методологии` | Orchestration |
| 04 | `idtspe.continue` | `продолжи по методологии` | Orchestration |
| 05 | `idtspe.review_consistency` | `проверь консистентность плана` | Validator |
| 06 | `tmcmd.exact.realization` | `реализуй код <scope>` | Generic Core Target Module; code-first exact realization |
| 07 | `idtspe.lenses.select` | `подбери линзы <target/context>` | Lens-selection orchestration |
| 08 | `idtspe.lens.apply` | `примени линзу <lens> к <target/context>` | Generic Lens-dispatch orchestration |
| 09 | `lenscmd.documentation.representation.check` | `проверь как лучше зафиксировать <target/result>` | Required Core IDTSPE Lens shortcut |
| 10 | `lenscmd.linked-notes.justify` | `проверь оправданы ли linked notes <target>` | Core IDTSPE Lens shortcut |

Count: **10** methodology invocation surfaces.

The IDTSPE view should render row 06 as the Core realization Target and rows 07–10 in a distinct metadata-driven `Lens Operations` section. `idtspe.lenses.select` / `idtspe.lens.apply` make every registered Core/profile Lens reachable without manufacturing one command per Lens. Documentation / Representation and Linked Notes remain specialized shortcuts for stable recurring intents.

### 3.2 `SDS — IDTSPE Profile`

The tab label itself should make the runtime relationship visible.

The tab contains:

```text
1 SDS bootstrap
16 canonical SDS Target Module invocations
13 focused SDS Target invocations
2 direct SDS Lens checks
= 32 surfaces
```

Together:

```text
IDTSPE tab 10
SDS tab    32
-----------
TOTAL      42 accepted methodology invocation surfaces
```

This remains a surface count, not a required count of physical `.command.md` files.

## 4. SDS Tab — Primary Navigation Order

The primary Target Module list follows the directed SDS methodology order where such an order exists.

The UI should say **IDTSPE Target Modules**, not merely `Target Modules`.

### 00 — Bootstrap

```text
sdscmd.bootstrap
→ бутстреп sds
  [SDS PROFILE BOOTSTRAP]
```

Semantics:

```text
ensure IDTSPE Core current
→ load/refresh SDS profile
→ no Target is created merely by bootstrap
```

### 01 — Application

```text
[IDTSPE TARGET] Определи приложение
  TM-APPLICATION-DEFINITION
  ├─ [FOCUSED] План концепции приложения
  └─ [FOCUSED] Определи ответственность приложения

[IDTSPE TARGET] Спланируй прототип <subject>
  TM-PROTOTYPE
  [CONDITIONAL / EVIDENCE-DRIVEN]
  └─ [FOCUSED] Разбери результаты прототипа <subject>
```

Primary canonical surfaces: **2**.  
Focused surfaces: **3**.

### 02 — Scenarios & Interaction

```text
[IDTSPE TARGET] Собери сценарии приложения
  TM-SCENARIO-PLANNING

[IDTSPE TARGET] Спланируй сценарий <scenario>
  TM-SCENARIO-PLANNING

[IDTSPE TARGET] Спланируй экраны
  TM-SCREEN
  [CONDITIONAL]
  └─ [FOCUSED] Спланируй экран <screen>

[IDTSPE TARGET] Спланируй общее требование <requirement>
  TM-REQUIREMENT
  [CONDITIONAL / EXCEPTIONAL]
```

Primary canonical surfaces: **4**.  
Focused surfaces: **1**.

### 03 — Workspace Evolution & Architecture

This section has a stable navigation position but is explicitly **cross-cutting / repeatable**, not a once-only phase.

```text
[IDTSPE TARGET · CROSS-CUTTING] Спланируй эволюцию воркспейса
  TM-WEUC
  [PRIMARY OPTIONAL / REPEATABLE]
  ├─ [FOCUSED] Интерпретируй план с точки зрения эволюции воркспейса
  ├─ [FOCUSED] Распиши пути эволюции воркспейса
  ├─ [FOCUSED] Обнови карту эволюции воркспейса
  └─ [FOCUSED] Продумай архитектурную позицию воркспейса
```

Primary canonical surfaces: **1**.  
Focused surfaces: **4**.

The UI must not imply `TM-WEUC` runs exactly once at step 03.

### 04 — Domain

```text
[IDTSPE TARGET] Исследуй домен
  TM-DOMAIN-DISCOVERY
  [PRIMARY OPTIONAL]

[IDTSPE TARGET] Спланируй домен <owner>
  TM-DOMAIN-DRAFT
  [PRIMARY OPTIONAL]
```

Primary canonical surfaces: **2**.

### 05 — Proof Design

```text
[IDTSPE TARGET] Спланируй тесты <target>
  TM-TEST-DESIGN
  └─ [FOCUSED] Спланируй тесты домена <owner>
```

Primary canonical surfaces: **1**.  
Focused surfaces: **1**.

The canonical Test Design command is shown once. Typed Domain/Slice commands are focused entries into the same Target Module, not separate Test workflows.

### 06 — Slice Portfolio

```text
[IDTSPE TARGET] Спланируй стратегию слайсов
  TM-SLICE-STRATEGY
  [OPTIONAL / SKIP WHEN DECOMPOSITION IS OBVIOUS]

[IDTSPE TARGET] Спланируй стратегию тестирования
  TM-TEST-STRATEGY
  [CONDITIONAL]
```

Primary canonical surfaces: **2**.

### 07 — Slice Realization

```text
[IDTSPE TARGET] Спланируй слайс <slice>
  TM-IMPLEMENTATION-SLICE
  ├─ [FOCUSED] Детализируй реализацию слайса <slice>
  └─ [FOCUSED / TM-TEST-DESIGN] Спланируй тесты слайса <slice>

[IDTSPE TARGET] Спланируй frontend <target>
  TM-FRONTEND-SLICE
  [CONDITIONAL]

[IDTSPE TARGET] Спланируй сквозную ответственность <target>
  TM-CROSS-CUTTING-CONCERN
  [CONDITIONAL]
```

Primary canonical surfaces: **3**.  
Focused surfaces: **2**.

`спланируй тесты слайса <slice>` still routes to `TM-TEST-DESIGN`. The helper may show it contextually under Slice Realization, but must identify the true Target Module and must not create a second Test Design command identity.

### 08 — Evidence & Coverage

```text
[IDTSPE TARGET] Спланируй практический тест <target>
  TM-PRACTICAL-TEST
  [CONDITIONAL / OPERATED-EVIDENCE DRIVEN]
  └─ [FOCUSED] Разбери результаты практического теста <target>

[IDTSPE TARGET] Проверь тестовое покрытие <scope>
  TM-TEST-COVERAGE
```

Primary canonical surfaces: **2**.  
Focused surfaces: **1**.

Contextual next/review action (navigation reference only; **not** a new surface):

```text
[RELATED · IDTSPE VALIDATOR] Проверь консистентность плана
  idtspe.review_consistency
  → same Core command identity as in the IDTSPE tab
```

This reflects the SDS lifecycle transition `Evidence/Coverage → Decision Revalidation / Consistency Review` without duplicating the command definition or changing the 32-surface SDS primary count.

### 4.1 Count Check

```text
Canonical Target Module surfaces:
  2 + 4 + 1 + 2 + 1 + 2 + 3 + 2
  = 17

Focused Target surfaces:
  3 + 1 + 4 + 0 + 1 + 0 + 2 + 1
  = 12
```

## 5. SDS Tab — Direct IDTSPE Lens Checks

After the Target Module navigation, show a separate section:

```text
IDTSPE Lens Checks — SDS
```

Direct invocable SDS Lens surfaces:

```text
lenscmd.weuc.check
→ [IDTSPE LENS] Проверь эволюцию и архитектуру <target>
  LENS-WORKSPACE-EVOLUTION-ARCHITECTURE

lenscmd.simplicity.check
→ [IDTSPE LENS] Проверь можно ли упростить <target>
  LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY
```

Their runtime contract is:

```text
selected/relevant Target
↓
resolve or reuse its IDTSPE context
↓
activate Lens
↓
Lens findings feed Ideas / QRP / Decisions
of the natural Target owner
```

A direct Lens command does **not** create a Lens-owned Target and does not define a parallel workflow.

### 5.1 Informational Lens Catalog

The helper may optionally expose `All SDS Lenses` as an informational view.

The optional catalog may show each registered Lens with activation/applicability/Knowledge-Basis metadata and indicate whether it is normally attached by a Target Module or conditional scan. It must not create one dedicated command identity per Lens. Any registered Lens can instead be reached through the generic `примени линзу` dispatcher, while specialized Lens shortcuts remain only for the four stable recurring intents.

## 6. Card / Details Presentation

Every SDS Target command card should visibly identify the runtime and owner, for example:

```text
Спланируй домен <owner>

[IDTSPE TARGET]
SDS · TM-DOMAIN-DRAFT
```

A focused entry:

```text
Детализируй реализацию слайса <slice>

[IDTSPE TARGET · FOCUSED]
SDS · TM-IMPLEMENTATION-SLICE
```

A Lens entry:

```text
Проверь можно ли упростить <target>

[IDTSPE LENS]
SDS · LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY
```

Details should continue to expose:

```text
When To Use
What You Get
```

and additionally may expose:

```text
Methodology Runtime: IDTSPE
Profile: SDS
Surface Kind
Target Module / Lens owner
Methodology position
Conditional / cross-cutting badges
```

Opening details must never invoke/insert/send the command.

## 7. Runtime Binding Metadata

Do not infer IDTSPE/SDS relationships from UI location alone.

The preferred implementation separates stable methodology binding from mutable UI ordering.

### 7.1 Stable methodology binding

Backward-compatible optional metadata/projection should be able to represent:

```text
methodologyRuntime: IDTSPE
profile: SDS | null
surfaceKind:
  BOOTSTRAP
  WORK_MODE
  TARGET_MODULE
  TARGET_MODULE_FOCUSED
  LENS
  ORCHESTRATION
  VALIDATOR

targetModuleId: TM-* | null
lensId: LENS-* | null
parentSurface: <surface key> | null
hostTargetPolicy:
  CREATE_OR_REUSE_TARGET
  RESOLVE_OR_REUSE_TARGET
  NONE
```

Examples:

```text
tmcmd.domain.draft
  methodologyRuntime = IDTSPE
  profile = SDS
  surfaceKind = TARGET_MODULE
  targetModuleId = TM-DOMAIN-DRAFT

lenscmd.simplicity.check
  methodologyRuntime = IDTSPE
  profile = SDS
  surfaceKind = LENS
  lensId = LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY
  hostTargetPolicy = RESOLVE_OR_REUSE_TARGET

lenscmd.linked-notes.justify
  methodologyRuntime = IDTSPE
  profile = null
  surfaceKind = LENS
  lensId = LENS-LINKED-NOTES-USAGE-JUSTIFICATION
```

### 7.2 Helper navigation projection

Tab/section/order/badge/cross-link data is UI presentation and must remain separate from semantic routing. The staged implementation keeps that mutable projection in optional GitHub-backed command metadata:

```text
helperPresentation.navigation
  viewId / viewLabel / viewOrder
  sectionId / sectionLabel / sectionOrder
  itemOrder
  kindLabel
  badges
  parentId

helperPresentation.relatedNavigation[]
  contextual cross-links that reuse the same command identity
```

Stable semantic binding is separately carried by `methodologyBinding` (`methodologyRuntime/profile/surfaceKind/targetModuleId/lensId/parentSurface/hostTargetPolicy`). Helper layout therefore never becomes semantic authority, and runtime does not infer Target/Lens ownership from card position.

The generated command seed projects both metadata layers. `src/methodology-navigation.js` is generic: it groups whatever current repository command metadata is loaded and contains no maintained current command IDs. `catalog-order.json` remains the durable ordering projection for the broader All Commands catalog. A separate `navigation-views.json` was not introduced because it would duplicate the per-command repository projection without adding authority.

## 8. Primary Home vs Contextual Cross-Link

One command surface has one primary navigation home.

It may appear as a contextual related action elsewhere without becoming a duplicate command identity.

Example:

```text
tmcmd.test.design.slice
primary home:
  SDS / 07 Slice Realization / child of current Slice flow

semantic owner:
  TM-TEST-DESIGN

possible related reference:
  Test Design details
```

The UI/runtime must deduplicate by command/surface identity.

## 9. Conditional And Cross-Cutting Presentation

Conditionality must be visible as a badge/description, not by hiding the command.

Examples include modules such as:

```text
TM-REQUIREMENT
TM-TEST-STRATEGY
TM-FRONTEND-SLICE
TM-CROSS-CUTTING-CONCERN
```

Other module gates remain authoritative; badge data should ultimately derive from the Target Module/profile contract rather than become a second hand-maintained semantic truth.

`TM-WEUC` should additionally display:

```text
CROSS-CUTTING
REPEATABLE
```

because its navigation position does not imply one-time execution order.

## 10. Helper Invocation Behavior

### 10.1 SDS Target Module command

```text
user clicks/invokes SDS Target command
↓
ensure/reuse IDTSPE Core bootstrap state
↓
ensure/reuse SDS profile state
↓
resolve concrete Target + invocation mode
↓
run IDTSPE Shell
  + selected SDS Target Module
  + required/applicable Core Lenses
  + applicable SDS Lenses
↓
return Target output / QRP / Decisions / Artifact Placement / Methodology Direction
```

### 10.2 SDS Lens command

```text
user invokes SDS Lens command
↓
resolve selected/natural Target
↓
reuse or establish its IDTSPE context
↓
activate Lens inside that Target iteration
↓
return findings into current owner
```

No separate `Lens workflow` runtime is created.

### 10.3 Generic Lens selection / apply operations

```text
подбери линзы <target/context>
→ resolve/reuse Target or Local Target Contract
→ run TF-06A Lens Applicability Scan over registry summaries/gates
→ load full Lens/Knowledge Basis only for selected/plausible candidates
→ return Lens Applicability View + resolved Lens Set

примени линзу <lens> к <target/context>
→ resolve selected Lens from Core/active-profile registry
→ read Operational Evaluation Contract + Knowledge Basis per load policy
→ apply inside the natural Target iteration
→ return findings to natural owner
```

These are generic orchestration surfaces; they do not own a fixed `lensId` and do not create Lens-owned Targets.

### 10.4 Generic Core Lens shortcuts

Both Core direct Lens surfaces follow the same IDTSPE host-context rule:

```text
lenscmd.documentation.representation.check
→ resolve/reuse the natural Target/result context
→ apply Documentation / Representation explicitly
→ may return NO_PERSISTENCE / IMPLEMENTATION_NATIVE / existing owner / dedicated or split representation

lenscmd.linked-notes.justify
→ resolve/reuse the relevant owner/Target relation context
→ evaluate whether linked/backlink/query capability is justified
```

Neither requires the SDS profile unless the resolved host Target itself belongs to SDS, and neither creates a Lens-owned Target.

## 11. Repository Update Plan

When actual repository mutation is authorized:

1. Re-audit current helper schema at actual HEAD.
2. Preserve existing command IDs and aliases where semantics fit.
3. Add missing canonical/focused/Lens surfaces per the command contract.
4. Extend command definitions backward-compatibly with stable `methodologyBinding` plus helper-only `helperPresentation.navigation` metadata.
5. Build `IDTSPE` and `SDS — IDTSPE Profile` tabs generically from current repository command metadata; do not hard-code command identities into runtime.
6. Group focused commands under canonical Target Module cards.
7. Order SDS Target Modules by §4 and mark WEUC cross-cutting.
8. Render the two specialized SDS Lens shortcuts in the SDS Lens section; optional all-Lens catalog is informational/discovery metadata and routes explicit application through the generic Core `idtspe.lens.apply` operation.
9. Keep Core Lens Operations (`подбери линзы`, `примени линзу`) plus the Documentation / Representation and Linked Notes shortcuts in the `IDTSPE` tab.
10. Regenerate seeds/catalog projections.
11. Update helper README/manual acceptance.
12. Run semantic navigation, codec, catalog, UI and runtime tests.

## 12. Acceptance Tests

At minimum, repository helper tests should prove:

```text
42 accepted methodology surfaces resolve

IDTSPE tab:
  exactly 10 primary methodology surfaces

SDS tab:
  exactly 32 primary methodology surfaces

SDS canonical Target Module commands:
  17 / 17 present
  methodologyRuntime = IDTSPE
  profile = SDS
  correct TM-* binding

focused SDS Target surfaces:
  12 / 12 present
  correct parent/Target Module binding

SDS direct Lens commands:
  exactly 2
  runtime = IDTSPE
  profile = SDS
  host Target is resolved/reused
  no Lens-owned Target created

Core Documentation / Representation Lens:
  IDTSPE tab
  direct surface resolves/reuses Target context
  may conclude no persistence / implementation-native

Core Linked Notes Lens:
  IDTSPE tab
  not SDS-only

WEUC:
  cross-cutting/repeatable presentation

conditional module:
  command remains visible
  failed gate can return no Target + route

conditional/optional Target presentation:
  Prototype = conditional/evidence-driven
  Screen = conditional
  WEUC = primary optional/cross-cutting/repeatable
  Domain Discovery + Domain Draft = primary optional
  Slice Strategy = optional when decomposition is obvious
  Requirement/Test Strategy/Frontend/Cross-Cutting keep their conditional/exceptional badges

Evidence/Coverage contextual review:
  shows idtspe.review_consistency as RELATED
  reuses same command identity
  does not increase SDS primary surface count

contextual duplicate display:
  same command identity
  no duplicate invocation definition

helper details/info:
  never invokes command

legacy command without new metadata:
  still parses/runs
```

## 13. Non-Goals Of This Plan

This plan does not:

- rename repository commands merely for uniform IDs;
- make helper ordering a semantic workflow owner;
- turn every Lens into a command;
- make SDS a second runtime beside IDTSPE;
- create a Target for Lens execution;
- perform destructive cleanup of legacy methodology families or resolve MB-06;
- decide the still-open Reference Object semantics.

## 14. Current Planning Verdict

```text
Command semantics:
  accepted / owned by command-surface contract

Helper grouping/order:
  planned here

SDS runtime identity:
  explicitly IDTSPE

SDS helper structure:
  IDTSPE Target Modules ordered by directed workflow
  + separate IDTSPE Lens Checks — SDS section

Repository implementation:
  STAGED IN CURRENT REPLACEMENT TARGET
  42 primary methodology surfaces
  10 IDTSPE + 32 SDS
  helper navigation derives from repository command metadata/seed projection
  generated runtime contains no maintained current command identities
  automated Helper verification: 122 / 122 PASS
  destructive legacy-family cleanup remains separate / MB-06-gated
```
