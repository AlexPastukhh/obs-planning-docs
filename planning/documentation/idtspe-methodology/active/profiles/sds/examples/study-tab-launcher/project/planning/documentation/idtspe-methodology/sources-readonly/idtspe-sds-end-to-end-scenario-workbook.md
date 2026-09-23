# IDTSPE SDS End-to-End Scenario Workbook — SDS-Consistency Revision

Status: executable-style conceptual scenarios / methodology acceptance tests; revised against current SDS target principles + IDTSPE Complete Picture v6  
Purpose: test the IDTSPE model on complete Application SDS planning loops and derive concrete command/helper/templates from practice.  
Repository mutation: none.

Revision rule:

```text
selected IDTSPE model
+
current SDS semantic owners
→ scenario consistency

similar current repository mechanism
≠ semantic confirmation until consistency-audited
```

Important repository-consistency rule:

```text
existing repository mechanism
≠ automatically the intended IDTSPE mechanism
```

Whenever this workbook names a current command/workflow as a **candidate route**, it means only:

```text
the current repository contains something structurally related
```

Before reusing it in the future IDTSPE implementation, run a consistency gate:

```text
1. resolve current semantic owner
2. compare exact current meaning with selected IDTSPE meaning
3. find overlaps / duplicates / contradictions
4. find missing semantics
5. decide:
   reuse unchanged
   extend
   merge
   split
   retire/replace
6. only then bind it into the IDTSPE Pack/flow
```

Do not infer semantic equivalence from similar names.

---

# 1. Test Application Used In The Scenarios

Working fictional application:

**Research Capture**

Real-life Need:

> While reading/researching on the web, a person wants to capture a useful fragment, its source and a short personal note without breaking reading flow, then later review/export selected captures into a long-term knowledge system.

This example was chosen because it creates:

- clear real-life Need;
- Application Scenarios;
- Scenario DATA / Behavior;
- Domain meaning;
- several vertical Slices;
- an external integration;
- likely future provider changes;
- persistence;
- verification;
- architecture pressure;
- useful WEUC instances;
- a realistic post-code architecture revalidation case.

It is not proposed repository/product truth.

It is only a methodology test fixture.

---

# 2. Current Tampermonkey / Command Reality — Candidate Routes Only

The current repository has direct commands that are structurally relevant.

Examples:

```text
фулл сдс
разбери текущую реальность
план решения
план концепции приложения
определи ответственность приложения
прототип приложения
собери сценарии приложения
план сценария приложения
исследуй домен приложения
план домена приложения
план стратегии слайсов
план слайса приложения
собери WEUC
оцени давление на архитектуру
прими архитектурное решение
спланируй проверку поведения
план практического тестирования
проверь реализацию приложения
проверь тестовое покрытие
план файл-обновление
```

The current Tampermonkey Planning Helper can project direct `planning/commands/*.command.md` commands into ChatGPT with adaptive / Full route-read variants.

That current capability is useful infrastructure.

However:

```text
current command exists
≠ command already implements the selected IDTSPE model
```

For example:

- current `разбери текущую реальность` owns descriptive Current Reality, not yet the full formal Need / Real-Life Scenario target selected in the IDTSPE discussion;
- current `собери WEUC` is contextual WEUC-instance discovery, not yet the full portfolio/reconciliation workflow defined later in this workbook;
- current `собери идеи X` is Idea-source-oriented and must not be assumed to be the generic Need-rooted IDTSPE entry;
- current full/modular/mini SDS profiles already contain useful Step 0–4 semantics, but their exact overlap with the future Planning Topology / Rule Pack model needs consistency review.

Therefore all scenario command mappings below use these labels:

```text
CURRENT CANDIDATE
→ command exists now; inspect before reuse

FUTURE NEEDED
→ selected IDTSPE capability has no proven direct current route yet

AUTOMATIC
→ should normally run as part of the command/Pack, not require another user button
```

---

# 3. Minimal Future Tampermonkey UX Suggested By The Scenarios

The scenarios suggest **not** creating one button for every internal IDTSPE step.

Target-specific current commands can remain shortcuts.

Only a few generic future entrypoints appear necessary.

## 3.1 FUTURE NEEDED — Generic Target Planning Entry

Working intent:

```text
спланируй таргет
```

Purpose:

```text
start/continue one scoped IDTSPE instance
without requiring a new Idea Source
```

Expected chat behavior:

```text
Need grounding
→ Target/Scope
→ Sources
→ prior-decision challenge
→ RQ discovery
→ Ideas/Decisions
→ Target projection
```

Target-family preset is resolved from active context or explicitly supplied.

Final public command name remains OPEN.

## 3.2 FUTURE NEEDED — Explicit Decision Revalidation

Working intent:

```text
перепроверь решения
```

Purpose:

```text
run the Decision Revalidation lifecycle against
new Evidence / new Decisions / changed Sources / WEUC
```

This should not blindly replan everything.

## 3.3 FUTURE NEEDED — WEUC Portfolio / Full Picture Review

Working intent:

```text
собери WEUC-картину
```

Purpose:

```text
review the material WEUC portfolio across the selected Workspace/application area,
not only discover one contextual instance
```

Current `собери WEUC` is a candidate component, not automatically equivalent.

## 3.4 OPTIONAL DIAGNOSTIC — Validate Current Planning Result

Working intent:

```text
проверь планирование
```

This is optional as a user command.

Normally Validators should run automatically.

Diagnostic mode could expose:

```text
Source Contract status
Q/R/P lifecycle status
Decision persistence
Revalidation readiness
Target projection conformance
WEUC loop status
Rule Set coverage
```

## 3.5 Existing Target-Specific Shortcuts

After consistency audit, existing routes may remain useful:

```text
план сценария приложения
план домена приложения
план слайса приложения
прими архитектурное решение
...
```

These can be understood as:

```text
generic IDTSPE mechanics
+ fixed Target-family binding / preset
```

without forcing the user to manually invoke every internal engine step.

---

# 4. What ChatGPT Must Save During Every Material Scenario

Three generic Decision types are selected.

They must not disappear after the answer.

```text
1. Target-Scope Decision
2. Question-Set Decision
3. Answer Decision(s)
```

For a material planning instance, the Current Planning State should be able to reconstruct:

```text
why this Target exists
what scope was deliberately selected
which questions were deliberately answered
which answer was selected for each
what Q/R/P remains
what Evidence supported the choice
what future Evidence/conditions should trigger reconsideration
what alternatives/fallbacks were retained
```

Physical storage is discussed in the companion Decision/WEUC file.

---

# 4A. SDS Target Principles That Every Scenario Below Must Obey

These are the semantic invariants used to judge the scenarios.

## Physical SDS profile is not a semantic stage

```text
Mini / Modular / Full
= representation/addressability profile

≠ different planning quality
≠ different semantic truth
```

`фулл сдс` may select/continue the rich physical profile, but it does not replace:

```text
Need
Solution
Application Concept
Application Responsibility
Scenario
Domain
Slice
```

planning.

Full-profile consequences, only when material:

```text
Scenario DATA / Behavior may become independently addressable
Requirements/Screens may get stable owners
Domain/Slice workspaces may split
material contextual WEUC may be transferred to a project-local WEUC register
practical testing may get its own stable surface
```

These are addressability/storage decisions.

They do not create extra semantic truth.

Planning Concerns keep one detailed body beside the real semantic subject/owner area, with an Area Concern Register only when distributed durable concerns justify it.

## Step 0 — Whole solution before Application

Current SDS direction:

```text
Real-Life Situation / Need
→ Current Reality when useful
→ real-world problem-resolution workflow
→ Open Solution Slot(s) when useful
→ existing/manual/process/integration/no-change/custom alternatives
→ Application Concept when own software is materially plausible
→ selected whole-solution responsibility
→ explicit Application Responsibility
→ Prototype when interaction/workflow/spatial uncertainty is material
```

Do not assume an Application merely because the Trigger sounds like a software feature.

## Step 1 — Scenario owns Application behavior

A Scenario requires:

```text
meaningful user-world Need
+
user/actor-visible behavior or information interaction
+
independently meaningful observable result
```

Detailed Scenario planning is iterative:

```text
Scenario
↔ Scenario DATA
↔ Behavior Items
↔ Requirements
```

Decomposition may expose a missing branch/input/outcome and force Scenario refinement.

Scenario DATA is not:

```text
DTO
database schema
Domain Entity fields
component state
```

Behavior Item is not:

```text
implementation task
method
handler
Slice
```

Screen owns spatial meaning when material; Scenario keeps behavioral authority.

## Step 2 — Domain is optional

Domain Discovery / Domain owner exists only when separate conceptual:

```text
identity
lifecycle
rule/invariant
relationship
consistency/ownership
```

meaning materially helps.

Valid result:

```text
no separate Domain owner needed
```

Do not derive Entity/Aggregate from nouns, fields, tables or persistence shape.

Domain consumes current Scenario/DATA/Behavior/Requirements and must not redefine them.

## Step 3 — Realization / Slices

Before detailed Slice planning, use high-level Application Realization only when representative runtime/persistence/integration feasibility can materially affect current semantic choices.

```text
Scenario / Requirements / Domain
→ optional high-level realization stress evidence
→ optional Slice Strategy
→ selected vertical Slice
```

Slice owns implementation/delivery realization, not upstream behavior.

A Slice must preserve:

```text
Covered Scenarios
Covered Behavior Items
Requirements
relevant Domain meaning
implemented / delegated / later / outside
vertical boundary
dependencies / handoffs
verification target
```

Expected files/classes/methods are realization hypotheses unless explicitly selected as hard contracts.

## Workspace / architecture evidence inside Step 3

WEUC is architecture/workspace evidence, not Application behavior authority.

Selected extension used in this workbook:

```text
concept-stage demand hypotheses
→ pre-code contextual WEUC instances
→ architecture Decisions when payoff is concrete
→ immediate post-code path re-trace
→ real maintenance Evidence
→ portfolio revalidation
```

This extends current SDS architecture evidence operationally; it does not reverse Application semantic authority.

## Verification

Use proportionally:

```text
Test Strategy
  only when shared/layer proof policy is material

Test Design
  for material selected behavior / proof mapping

Practical Test Plan
  for an operated acceptance campaign when useful
```

Planning proof is not execution Evidence.

## Step 4 — Practical feedback

```text
implementation
→ execute selected proof
→ actual Evidence
→ Test Coverage review when needed
→ semantic ReviewDiff when actual target drift must be checked
→ upstream correction only for real contradiction/infeasibility/new fact
```

`проверь реализацию приложения` is **not** a generic post-code implementation-review command in the current repository. Its current semantic owner is high-level representative realization/stress evidence.

## Three durable Decision levels inside each material IDTSPE Target

When a Target is materially planned, preserve:

```text
Target-Scope Decision
Question-Set Decision
Answer Decision(s)
```

Supporting evidence-gathering operations such as a prototype/test execution need not manufacture fake Answer Decisions when they are not choosing semantic target meaning.

## Target-specific justification lineage

Every material downstream Target must be able to answer:

```text
why does this Target exist?
which current upstream Source/Decision justifies it?
```

For this workbook the main Application lineage is:

```text
Need / real-world workflow
→ selected whole Solution
→ Application Concept / Responsibility
→ Application Scenario
→ Behavior / DATA / Requirements
→ optional Domain
→ Slice / realization
```

Physical reverse traversal remains proportional:

```text
trusted upstream meaning
→ reuse

concrete challenge
→ reopen only the narrowest affected owner/Decision
```

---

# 5. SCENARIO A — Greenfield Application From Need To Practical Evidence

## Scenario Purpose

Test a complete Full SDS-style semantic path while keeping optional stages proportional:

```text
Need / Current Reality
→ real-world problem-resolution workflow / Open Solution Slot
→ whole-Solution Variants
→ Application Concept review
→ selected whole Solution
→ explicit Application Responsibility
→ Prototype because interaction uncertainty is material
→ Scenario Discovery
→ detailed Scenario ↔ DATA ↔ Behavior ↔ Requirements
→ optional Domain Discovery / Domain
→ optional high-level Application Realization stress review
→ Slice Strategy
→ pre-code WEUC / architecture Decisions where material
→ detailed Slice
→ Test Design
→ Practical Test Plan
→ separately authorized implementation
→ executed proof / Coverage / semantic drift evidence
→ post-code WEUC re-trace
→ Decision revalidation / reconciliation
```

`Full SDS` is used only as the rich owner/addressability profile; it does not create different semantic quality from Mini/Modular.

The user starts with no application architecture.

---

# 6. A0 — User Starts From Real-Life Need

## User says

```text
Я читаю много статей и постоянно теряю полезные фрагменты.
Хочу во время чтения за пару секунд сохранить сам фрагмент,
URL/название страницы и короткую свою заметку,
а потом вернуться к чтению.

Давай спланируем решение нормально, не начинай сразу с архитектуры.
```

## Tampermonkey

Possible current candidates:

```text
CURRENT CANDIDATE:
  фулл сдс
```

Role only:

```text
select/continue rich SDS physical profile
≠ semantic planning step
```

Then, only for descriptive checked present-state evidence:

```text
CURRENT CANDIDATE:
  разбери текущую реальность
```

Its current owner does not itself select Need/Solution/Application semantics.

Whole-solution Need/workflow selection belongs to the whole-solution planning route / future IDTSPE orchestration.

Future generic orchestration:

```text
FUTURE NEEDED:
  спланируй таргет
  target family/topology: Application SDS
```

## What ChatGPT does

### Invocation

Resolve:

```text
Mode:
  CREATE

Semantic target currently being opened:
  whole-solution planning for the real-life Need

Physical profile:
  Full SDS

Permission:
  read-only planning
```

Automatic:

```text
Mode Separation Validator
Permission Guard
initial Rule Set selection
```

### Whole-solution Target-Scope Decision

Persist:

```text
TS-SOL-01

Target:
  choose the best bounded real-world solution/workflow
  for reliable low-interruption research capture

Outside for now:
  detailed app architecture
  Domain
  file/class design
```

### Whole-solution Question-Set Decision

Persist:

```text
QS-SOL-01

Material questions:
  what real-world workflow currently fails?
  where is the actual solution slot?
  can existing/manual/process routes satisfy it?
  is own Application worth introducing?
  what evidence is needed before selecting custom software?
```

### Need grounding — L1

Separate:

```text
Trigger:
  "хочу сохранять фрагменты"

Need:
  preserve useful research material reliably
  with minimal interruption to reading

Desired real-world outcome:
  useful research material is captured
  and the person resumes reading without organization work

Current Reality:
  manual copy/paste into general notes interrupts reading
  and captures are often skipped/lost
```

### Real-world problem-resolution workflow

Model the path, not only the application point:

```text
read article
→ notice useful fragment
→ decide whether it is worth preserving
→ OPEN SOLUTION SLOT:
     capture fragment + source + optional note
     with minimal interruption
→ resume reading
→ later review captured material
→ move selected material into long-term knowledge workflow
```

The Open Solution Slot is a planning surface, not a new mandatory owner.

### L2 — authority/reuse

Greenfield fixture:

```text
no previously accepted project Need/solution owner exists
```

If one existed, reuse it rather than recreating it.

### L3 — uncertainty

Potential material Q:

```text
Q-NEED-01:
  must initial capture support every website/surface,
  or only ordinary browser-selectable text?
```

Only persist it if the answer can materially change the current whole-solution choice.

## Saved output

```text
Need / Current Reality basis
real-world workflow
Open Solution Slot
TS-SOL-01
QS-SOL-01
material Q/R/P only
```

No Application responsibility and no architecture yet.

## Error this step prevents

```text
"capture fragments"
→ assume browser extension
→ choose framework/database
```

before proving that custom Application behavior is the best fill for the real-world solution slot.

---

# 7. A1 — Whole-Solution Variants / Existing Alternatives

## User says

```text
Продолжай.
Сначала сравни способы решить нужду вообще,
включая вариант без своего приложения.
```

## Tampermonkey

```text
CURRENT CANDIDATE:
  план решения

CURRENT CANDIDATE when evidence gap is material:
  исследуй альтернативы решения
```

Do **not** call Application Concept selected merely because it is attractive.

## Chat actions

Use TS-SOL-01 / QS-SOL-01.

### L1 — Need / Value / Scope

Generate whole-solution/workflow candidates:

```text
S1:
  general notes app + manual copy/paste

S2:
  existing browser→knowledge-system integration

S3:
  custom lightweight capture inbox
  + later export to long-term knowledge system

S4:
  no change; accept occasional capture loss
```

Compare at whole-workflow level:

```text
capture interruption
reliability
later organization burden
maintenance burden
whole-solution fit
```

### L2 — Authority / reuse

Keep checked existing routes as real comparators.

Do not remove S1/S2 merely because S3 is interesting.

### L3 — Uncertainty

Material unknowns:

```text
can browser APIs support sufficiently fast capture?
does an existing integration already reach comparable flow quality?
what is rough maintenance/support burden of custom software?
```

Possible Evidence actions:

```text
research existing integrations
small technical feasibility spike
```

### Current conclusion — not yet final whole-solution selection

Example result:

```text
S3 is the leading candidate,
but custom-vs-existing choice remains open
until the Application Concept is reviewed proportionally.
```

Do not create final `SOL-01` yet.

## Saved

```text
whole-Solution candidates
checked existing alternatives
evidence gaps
current ranking/conclusion
no false final Decision
```

## Error this step prevents

```text
best local app Idea
→ automatically becomes selected whole solution
```

---

# 8. A2 — Application Concept Review

## User says

```text
S3 выглядит перспективно.
Проверь именно концепцию своего приложения:
какое упрощение оно создаёт,
что примерно придётся поддерживать,
и не проигрывает ли оно существующим вариантам.
Архитектуру пока не проектируй.
```

## Tampermonkey

```text
CURRENT CANDIDATE:
  план концепции приложения
```

## Chat actions

This is a separate material Target.

### Target-Scope Decision

```text
TS-CONCEPT-01

Target:
  evaluate custom Application Concept S3
  as one candidate fill for the Open Solution Slot

Not selected yet:
  exact Application responsibility
  Scenarios
  architecture
```

### Question-Set Decision

```text
QS-CONCEPT-01

Questions:
  what simplification/value does own app create?
  what can users do/know/obtain?
  what Concept Features are hypothesized?
  is there a realistic technical path?
  what rough maintenance/support burden exists?
  how does it compare with viable S1/S2 alternatives?
```

### Concept candidate

```text
Application Concept:
  a lightweight capture inbox that accepts selected research material
  with minimal organization effort,
  keeps it durably reviewable,
  and decouples fast capture from later knowledge-system export
```

Possible Concept Features:

```text
fast browser capture
local durable inbox
later review
later export
```

They are:

```text
Concept hypotheses
≠ automatically Scenarios
≠ Slices
```

### L1

```text
Does this concept materially reduce the real-world friction?
Is owning/maintaining software worth that reduction?
```

### L2

```text
Does the concept duplicate an existing viable route?
```

### L3

```text
unknown:
  can the interaction actually be as low-friction as assumed?

unknown:
  can browser capture and durable handoff be realized without
  a large always-running infrastructure burden?
```

Use rough feasibility/effort only.

No class/database/provider-framework design here.

### Answer Decision

```text
D-CONCEPT-01:
  Concept is viable/worth continuing because it separates
  fast capture from long-term organization
  and existing checked alternatives do not currently provide
  equivalent low-interruption flow.

Status:
  selected Concept candidate for whole-solution integration,
  not yet Application responsibility by itself.
```

Residual concern:

```text
R-CONCEPT-01:
  if interaction prototype shows capture is not meaningfully faster/easier
  than an existing route, custom application value may collapse
```

Revalidation hook:

```text
prototype / acceptance comparison
```

---

# 8A. A2B — Select Whole Solution

## User says

```text
Концепция выглядит оправданной.
Теперь верни её в whole-solution comparison
и выбери текущий whole solution.
```

## Tampermonkey

```text
CURRENT CANDIDATE:
  план решения
```

## Chat actions

Re-evaluate S1/S2/S3 using D-CONCEPT-01.

### Whole-solution Answer Decision

Select:

```text
D-SOL-01:
  selected whole solution uses the custom capture inbox
  for the fast-capture solution slot,
  while browser/real-world reading remains outside
  and long-term knowledge organization remains external.
```

This closes the current custom-vs-existing whole-solution choice.

Residual Risk:

```text
R-SOL-01:
  an existing route may later reach equivalent capture quality
  with materially lower maintenance.
```

Future Evidence:

```text
real user-flow timing/reliability
maintenance evidence
```

Do not yet silently expand the Application boundary beyond this selected whole solution.

---

# 8B. A2C — Establish Application Responsibility

## User says

```text
Теперь отдельно зафиксируй,
что именно внутри выбранного whole solution отвечает наше приложение,
а что остается людям, браузеру и внешней knowledge system.
```

## Tampermonkey

```text
CURRENT CANDIDATE:
  определи ответственность приложения
```

## Chat actions

### Target-Scope Decision

```text
TS-APP-RESP-01

Target:
  explicit Application responsibility / inside-outside boundary
  derived from D-SOL-01 + D-CONCEPT-01
```

### Question-Set Decision

```text
QS-APP-RESP-01

what must app own to deliver the selected simplification?
what remains browser/person/external-system responsibility?
which useful capabilities are inside Application responsibility
but may be delivered later?
```

### L1

```text
is each responsibility justified by D-SOL-01 / Need?
```

### L2

```text
do not absorb browser, reading process
or long-term knowledge-system responsibilities
```

### Answer Decision

```text
D-APP-RESP-01

Application owns:
  accept research capture
  keep a durable reviewable inbox
  let user review/manage captured material
  provide export handoff as a later app capability

Application does not own:
  browsing/reading
  full long-term note editing/knowledge graph
  external knowledge-system internals
```

Residual Q:

```text
Q-APP-RESP-01:
  which external knowledge system becomes
  the first concrete export destination?
```

This does not block capture/review planning.

---

# 8C. A2D — Prototype Interaction / Workflow Because Uncertainty Is Material

## Why prototype is used

The selected value claim includes:

```text
"capture with minimal interruption"
```

That is interaction/workflow uncertainty, not only technical feasibility.

Therefore this test fixture should **not** skip Prototype.

## User says

```text
Перед каноническими сценариями сделай дешёвый прототип capture flow.
Хочу проверить, что пользователь реально может быстро сохранить фрагмент
и вернуться к чтению.
Не делай Prototype Scenario текущим SCN автоматически.
```

## Tampermonkey

```text
CURRENT CANDIDATE:
  прототип приложения
```

## Chat actions

Prototype is provisional Evidence.

Possible:

```text
PSCN-01:
  provisional capture flow

PSCR-01:
  provisional capture surface/popup
```

Candidate findings:

```text
candidate Requirement:
  user should not need to organize destination during capture

candidate DATA:
  selected text
  source URL
  optional source title
  optional short note

candidate Behavior:
  capture request
  optional note adjustment
  explicit success/failure feedback
```

Possible prototype comparison:

```text
Variant P-A:
  immediate save, note optional later

Variant P-B:
  popup with short note before save
```

L1:

```text
which flow actually preserves the selected real-world simplification?
```

L3:

```text
what user effort/timing is still unknown?
```

L6:

```text
what observable result tells the actor capture is safe?
```

Prototype may prefer a provisional route, but:

```text
PSCN / PSCR / candidate DATA / Behavior / Requirements
≠ canonical SCN / Screen / Scenario DATA / Behavior automatically
```

## Saved

```text
Prototype Plan/Result
provisional Evidence
candidate Requirements/DATA/Behavior
interaction findings
```

These become Sources for Scenario Discovery.

---

# 9. A3 — Scenario Discovery

## User says

```text
Теперь на основе выбранной ответственности и прототипа
собери нормальные текущие сценарии приложения.
Не превращай каждое действие, экран или кнопку в отдельный сценарий.
Прототип сначала проверь, а не копируй.
```

## Tampermonkey

```text
CURRENT CANDIDATE:
  собери сценарии приложения
```

## Chat actions

### Target-Scope Decision

```text
TS-SCN-DISC-01

Target:
  current Scenario inventory/boundaries
  for D-APP-RESP-01
```

### Question-Set Decision

```text
QS-SCN-DISC-01

for each candidate:
  meaningful user-world Need?
  actor-visible interaction?
  independently meaningful observable result?
  instrumental sub-step?
  only Screen/button/API/technical operation?
  should prototype boundary split/merge?
```

### Sources

```text
D-SOL-01
D-APP-RESP-01
Prototype Result
candidate Prototype DATA/Behavior/Requirements
```

Prototype findings are evidence only.

### L1 — primary

Candidate current Scenarios:

```text
SCN-01 Capture Research Fragment
SCN-02 Review Captured Items
SCN-03 Export Selected Item
```

Boundary rationale:

```text
SCN-01:
  Need/result = preserve material and safely return to reading

SCN-02:
  Need/result = inspect/manage accumulated captures later

SCN-03:
  Need/result = move selected capture into external long-term workflow
```

Reject as peer Scenarios:

```text
open popup
edit note field
click save
retry HTTP request
open one screen
write database row
```

### L2

```text
Application Scenario is behavior authority.
Prototype Scenario is not retained as competing current behavior owner.
```

### L3

```text
uncertainty:
  SCN-03 is current Application responsibility,
  but concrete first export destination is not known yet.
```

This affects detail/delivery timing, not Scenario identity if the export Need/result is already current.

### Answer Decisions

Persist selected Scenario boundary Decisions / current Scenario catalog meaning.

Example:

```text
D-SCN-BOUNDARY-01:
  capture and later review remain separate Scenarios
  because they have independent Need/result/re-entry boundaries.
```

### Residual question

```text
Q-SCN-EXPORT-01:
  when the first real export destination is selected,
  review SCN-03 detailed Requirements/DATA.
```

## Saved

```text
Scenario inventory
Scenario-boundary Decisions
Question-Set Decision
residual boundary concerns
prototype provenance links
```

---

# 9A. A3B — Early WEUC Demand Hypotheses — Selected IDTSPE Extension

## Purpose

Show the earliest WEUC checkpoint selected by the newer IDTSPE model.

At this stage:

```text
Application responsibility and Scenario inventory are known
but code/workspace realization is not
```

Therefore we can reason about **future demand**, but not pretend to know exact change paths/files/classes.

This step is a selected model extension beyond the current Step-3-centered SDS WEUC flow and requires repository consistency planning before implementation.

## User says

```text
Пока не проектируя архитектуру,
зафиксируй только самые важные будущие виды изменений,
которые уже можно вывести из текущих сценариев/ответственности.

Для каждого скажи:
какая Need это может вызвать,
насколько это реально/скоро,
и что пока неизвестно.
```

## Tampermonkey

```text
FUTURE NEEDED / selected-model behavior:
  early WEUC demand-hypothesis pass
```

Do not automatically force current `собери WEUC` here if it requires a concrete target code/workspace area.

## Chat actions

From current Application meaning:

### Hypothesis H-WEUC-01 — first export destination

```text
Demand basis:
  current SCN-03 / Application responsibility

Likelihood:
  high

Horizon:
  planned

Value:
  material

Demand confidence:
  high

Path confidence:
  very low before realization design
```

### Hypothesis H-WEUC-02 — another export destination

```text
Demand basis:
  plausible variation in long-term knowledge workflow

Likelihood:
  low/medium

Horizon:
  plausible later

Value:
  unknown until concrete user Need exists

Confidence:
  low
```

### Hypothesis H-WEUC-03 — capture source/context variation

```text
Demand basis:
  capture occurs across browser/pages with varying available metadata

Likelihood:
  medium

Horizon:
  near/plausible

Value:
  medium

Path:
  unknown until capture realization is designed
```

### Admission rule

Do not store:

```text
"make everything extensible"
```

as a WEUC hypothesis.

Do not make Architecture Decisions yet.

## Output

```text
small early demand-hypothesis set
with Need basis / likelihood / horizon / value / confidence
```

Later A8 must:

```text
re-resolve these hypotheses
against planned concrete Workspace areas
→ contextual WEUC instances
→ expected paths
```

---

# 10. A4 — Detailed Scenario SCN-01

## User says

```text
План сценария приложения:
SCN-01 Capture Research Fragment.

Сохрани behavioral boundary чистым:
DATA не превращай в DTO/таблицу,
Behavior Items — в методы,
а persistence — в Scenario authority.
```

## Tampermonkey

```text
CURRENT CANDIDATE:
  план сценария приложения
```

## Chat actions

### Target-Scope Decision

```text
TS-SCN-01

Target:
  canonical current behavioral owner for SCN-01

Need:
  preserve a useful fragment safely
  without materially breaking reading flow

Observable result:
  actor knows the capture was accepted
  and can resume reading
```

### Question-Set Decision

```text
QS-SCN-01

RQ-01:
  what Scenario-relevant input/information is actually needed?

RQ-02:
  what observable behavior constitutes successful capture?

RQ-03:
  what user-visible failure/recovery behavior is required?

RQ-04:
  what must be true before success may be shown?

RQ-05:
  does duplicate capture require selected behavior now,
  or is it still an unresolved Requirement/Question?

RQ-06:
  is a canonical Screen/spatial owner necessary,
  or is prototype visual evidence enough for current depth?
```

### Scenario body

```text
Actor/context:
  person actively reading/researching in a browser

Starting situation:
  useful fragment is visible

Motivational trigger:
  actor decides the fragment is worth preserving

Entry:
  actor invokes the Application capture action

Goal:
  preserve fragment + source context
  with optional short personal note

Observable result:
  Application confirms accepted capture
  or clearly reports recoverable failure

Related real-world workflow / Open Solution Slot:
  A0 capture slot

Related Application Concept:
  D-CONCEPT-01

Prototype origin/evidence:
  PSCN-01 / PSCR-01 findings when still relevant
```

### Actor-effort check — L1

From Prototype evidence:

```text
do not require destination organization during capture
avoid unnecessary context switching
keep note optional
success/failure must be understandable
```

Do not invent a hard `2 seconds` Requirement unless measured/selected.

### Scenario DATA — not Domain/persistence schema

Current supported Scenario DATA:

```text
selected fragment text
source URL
source title — optional if available/useful
short user note — optional
```

`capturedAt` is **not** added merely because databases commonly have timestamps.
Add it to Scenario DATA only if actor-visible ordering/filtering/result behavior actually requires it.

### Behavior Items

```text
BI-01:
  accept a capture initiation with the available Scenario DATA

BI-02:
  let actor confirm/adjust the optional short note when the selected flow requires it

BI-03:
  accept the capture into the application's durable inbox result

BI-04:
  show success only after the capture is durably accepted

BI-05:
  on material failure, do not show false success and provide a recoverable result/path
```

No file/class/repository/database mechanism is encoded in these Behavior Items.

### Requirements

Selected/entailed:

```text
REQ-CAP-01:
  success must not be shown before durable acceptance

REQ-CAP-02:
  failed durable acceptance must not silently discard the actor's capture intent
```

Duplicate behavior stays a Q until selected evidence/need justifies a concrete Requirement.

### Screen / spatial meaning

Prototype `PSCR-01` is evidence.

If a stable reusable capture surface has material spatial requirements:

```text
create/use canonical Screen owner
```

Otherwise:

```text
do not create Screen merely because a popup exists
```

### L1

```text
Does every selected DATA/Behavior/Requirement support SCN-01 Need/result?
```

### L2

```text
Scenario owns behavior.
Screen owns spatial meaning if created.
Domain/persistence remains downstream.
```

### L3

```text
Q:
  can all target browser contexts provide enough source information?
```

### L6

```text
What proves durable acceptance?
What proves no false success on persistence failure?
Can user-visible failure be observed?
```

These produce proof requirements, not executed Evidence.

### Scenario ↔ DATA ↔ Behavior refinement

After decomposition ask:

```text
Did any Behavior need information the Scenario never obtains?
Did DATA expose a missing branch?
Did a branch have its own independent Need/result?
```

If yes:

```text
refine Scenario and repeat decomposition
```

### Answer Decisions

Examples:

```text
D-SCN-01-NOTE:
  note is optional during capture

D-SCN-01-SUCCESS:
  success is observable only after durable acceptance
```

Persist residual Q/R/P with revalidation hooks when material.

## Saved

```text
canonical SCN-01 representation
Scenario DATA refs
Behavior Item refs
Requirements
Screen/prototype relations when material
Target-Scope Decision
Question-Set Decision
Answer Decisions
residual Q/R/P
proof requirements
```

---

# 11. A5 — Detailed Scenario SCN-02

## User says

```text
Теперь план SCN-02 Review Captured Items
с той же дисциплиной Scenario ↔ DATA ↔ Behavior ↔ Requirements.
```

## Tampermonkey

```text
CURRENT CANDIDATE:
  план сценария приложения
```

## Chat actions

### Target-Scope Decision

```text
TS-SCN-02

Need:
  later inspect/manage accumulated captures
  without returning to the original reading flow

Observable result:
  actor understands current captured material
  and can intentionally retain/archive/delete/edit supported meaning
```

### Question-Set Decision

```text
QS-SCN-02

RQ:
  what information must be visible to review one item?

RQ:
  what ordering/filtering is actually required now?

RQ:
  archive vs delete semantics?

RQ:
  may personal note be edited after capture?

RQ:
  must original captured fragment/source remain immutable?
```

### Scenario DATA

Only actor/scenario-relevant values:

```text
captured fragment
source context
personal note
current lifecycle/status when user-visible
ordering information only when the selected review behavior requires it
```

### Behavior candidates

```text
view capture list
inspect one capture
edit personal note if selected
archive/unarchive if selected
delete according to selected semantics
```

Do not include:

```text
SQL query
repository method
pagination component
```

as Behavior Items.

### L1

```text
keep only behavior needed for meaningful review result
```

### L2

```text
SCN-02 behavior must not redefine Domain identity/lifecycle downstream
```

### L3

Material unknown:

```text
do we need preservation of the original note/history
for citation/audit use?
```

### Answer Decision

```text
D-SCN-02-NOTE:
  allow editing the personal note;
  do not add note version history now.
```

Residual Risk:

```text
R-SCN-02-NOTE:
  future citation/audit workflow may require preserving original authored state
```

Revalidation readiness:

```text
Evidence source:
  first real provenance/audit Requirement

Reopen:
  note-history / provenance RQ
```

### Screen

If list/detail spatial ownership becomes independently reusable/material:

```text
create canonical Screen owner
```

Otherwise keep only proportional visual evidence.

## Saved

```text
SCN-02
Scenario DATA/Behavior/Requirements
Decisions
residual Q/R/P
```

---

# 12. A6 — Optional Domain Discovery / Domain Decision

## User says

```text
Исследуй, нужен ли нам вообще отдельный Domain owner.
Если нужен — выведи его только из текущих Scenario/DATA/Behavior/Requirements,
а не из будущей схемы БД.
```

## Tampermonkey

```text
CURRENT CANDIDATE:
  исследуй домен приложения

CURRENT CANDIDATE if separate Domain meaning proves useful:
  план домена приложения
```

## Chat actions

### Source Contract

Consume:

```text
SCN-01
SCN-02
Scenario DATA
Behavior Items
Requirements
```

Not:

```text
planned SQLite schema as Domain truth
```

### Target-Scope Decision

Candidates:

```text
A:
  no separate Domain owner;
  Scenario/Requirement meaning is sufficient

B:
  create minimal explicit Domain for cross-Scenario identity/lifecycle
```

L1 asks:

```text
does a separate conceptual owner reduce ambiguity/consistency cost?
```

Evidence:

```text
SCN-01 creates one durable captured thing
SCN-02 later refers to the same thing across lifecycle operations
archive/delete semantics cross Scenario boundaries
source identity/snapshot meaning is reused
```

Select:

```text
TS-DOM-01:
  explicit minimal Domain is justified
  because stable cross-Scenario identity/lifecycle/ownership exists.
```

### Question-Set Decision

```text
QS-DOM-01

what has stable identity?
what lifecycle/state is semantic?
what invariant/policy requires one owner?
what remains outside?
is any Aggregate/Root boundary actually required?
```

### Domain discovery

Candidate concept:

```text
CaptureItem
```

Justified by:

```text
same durable item created in SCN-01
and managed in SCN-02
```

Possible Value Object:

```text
SourceRef
```

only if source-reference value semantics materially help.

### Selected minimal Domain meaning

```text
CaptureItem
  stable identity
  captured fragment/source meaning
  personal note
  current lifecycle relevant to archive/delete behavior
```

Do **not** automatically copy every Scenario DATA field.

Do **not** infer persistence representation.

### Domain verification meaning — when material

Derive technology-neutral examples from selected Domain semantics, for example:

```text
same CaptureItem identity is preserved across review/archive transitions

a deleted item is not later treated as active
according to selected deletion semantics
```

These examples are verification meaning derived from Domain semantics.

They are not a second Domain authority and not database tests by definition.

### Aggregate decision

Valid selected answer:

```text
D-DOM-AGG-01:
  no separate Aggregate hierarchy beyond the CaptureItem ownership boundary
  is justified by current invariant/consistency evidence.
```

### L2

```text
Domain does not copy/redefine Scenario behavior.
```

### L3

```text
future export synchronization must not force generalized external-reference lifecycle
until real SCN-03/Requirement evidence exists.
```

Residual Risk:

```text
future successful export may introduce durable external-reference lifecycle
```

Hook:

```text
reopen relevant Domain RQ when current export behavior actually requires it
```

## Saved

```text
Domain decision whether separate owner is useful
selected minimal Domain meaning
Question-Set Decision
Answer Decisions
verification meaning when material
residual Q/R/P
```

---

# 12A. A6B — Optional High-Level Application Realization Stress Review

## Why it is used here

The current Scenario/Domain meaning contains material technical stress points:

```text
browser → application handoff
durable-before-success
local persistence
failure/recovery
```

A representative high-level realization review can still change feasibility or expose upstream contradictions before detailed Slice planning.

## User says

```text
Перед Slice Strategy сделай high-level realization stress review:
можно ли SCN-01/SCN-02 и выбранный Domain разумно реализовать.
Не проектируй файлы/классы и не подменяй Domain persistence-схемой.
```

## Tampermonkey

```text
CURRENT CANDIDATE:
  проверь реализацию приложения
```

This is the correct current semantic use of that command.

## Chat actions

Inputs:

```text
SCN-01 / SCN-02
Requirements
selected Domain
technical/operational constraints
```

Trace representative runtime meaning:

```text
browser capture request
→ application acceptance
→ durability boundary
→ acknowledgement/failure
```

and:

```text
review request
→ current items
→ lifecycle operation
→ durable result
```

Stress:

```text
can durable-before-success be implemented reasonably?
does browser handoff create a hard technical contradiction?
is the selected Domain identity/lifecycle compatible with persistence/transaction needs?
can failure/no-false-success be verified?
```

Possible output:

```text
High-Level Realization Finding:
  current semantics are feasible;
  durability boundary needs one explicit persistence responsibility,
  but no Domain correction is required.
```

This is realization Evidence/input.

It does not select files/classes and does not become Domain authority.

If an actual impossibility appears:

```text
return Evidence to the narrowest Scenario/Requirement/Domain Decision
```

instead of silently changing semantics.

---

# 13. A7 — Slice Strategy

## User says

```text
Теперь план стратегии слайсов.
Хочу как можно раньше получить работающий useful result,
но не вытаскивай низкоприоритетную функцию вперед
только ради красивой архитектуры.
```

## Tampermonkey

```text
CURRENT CANDIDATE:
  план стратегии слайсов
```

## Inputs

```text
SCN-01 / SCN-02 / current SCN-03 boundary
Behavior Items
Requirements
Domain meaning
high-level realization findings
known constraints
```

## Target-Scope Decision

```text
TS-SLICE-STRAT-01:
  choose vertical delivery decomposition/order
  for current application behavior.
```

## Question-Set Decision

```text
QS-SLICE-STRAT-01

how many independently useful/checkable increments?
what dependency order exists?
what uncertainty should be reduced early?
does product priority differ from technical sequence?
what minimal seam is justified by likely future work?
```

## L1

```text
earliest useful user result
Scenario/Requirement coverage
do not pull lower-priority feature forward without evidence
```

## L4

```text
dependency/decomposition boundary
```

## L5 — contextual

Use only to the degree current Workspace/architecture evolution evidence exists.

At this point some WEUC is still hypothesis-level.

## L6

```text
is each proposed Slice independently checkable?
```

## Selected strategy

```text
SL-01
Deliverable:
  SCN-01 capture → durable local inbox
Coverage:
  SCN-01 core Behavior/Requirements
Dependencies:
  selected Application responsibility + minimal Domain semantics
Learning/risk value:
  proves browser→Application handoff and durability boundary

SL-02
Deliverable:
  SCN-02 review/manage captured items
Coverage:
  review/archive/delete/edit-note selected behavior
Dependencies:
  captured-item state from SL-01
Learning/risk value:
  proves lifecycle/review semantics on real persisted items

SL-03
Deliverable:
  SCN-03 first real export integration
Coverage:
  export Scenario/Requirements
Dependencies:
  selected capture/review state + concrete first destination
Learning/risk value:
  produces real provider-variation Evidence before any multi-provider generalization
```

Product priority:

```text
SL-01 > SL-02 > SL-03
```

Implementation sequence initially matches product priority.

No foundation Slice.

No generic exporter framework Slice.

## Recheck rule

Later pre-code WEUC/architecture evidence may justify:

```text
a minimal seam/prerequisite
```

but must return to this Strategy Decision explicitly if it changes decomposition/order.

---

# 14. A8 — Pre-Code WEUC Discovery

This is the first **concrete** WEUC checkpoint for planned realization.

Earlier Concept/SDS work may have produced only demand hypotheses.

## User says

```text
До кода собери material WEUC для планируемой реализации.
Не придумывай "гибкость вообще".

Для каждого будущего изменения:
какая потенциальная Need его вызывает,
почему она вероятна,
как скоро,
есть ли другой способ удовлетворить Need,
и что примерно пришлось бы менять.
```

## Tampermonkey

```text
CURRENT CANDIDATE COMPONENT:
  собери WEUC

FUTURE NEEDED for portfolio-level view:
  собери WEUC-картину
```

Current command semantics must still pass the consistency gate before being bound to the selected portfolio model.

## Chat actions

### Planned Workspace areas — realization hypotheses

At this stage we may reasonably hypothesize responsibilities such as:

```text
capture input boundary
durability/persistence responsibility
review presentation/workflow
future export boundary
```

These are not yet canonical filenames/classes.

Path confidence is lower before code.

### Candidate demand Sources

Current selected Application meaning:

```text
SCN-03 future/current export Need
browser/source-context variability
CaptureItem lifecycle/persistence
```

Product/delivery:

```text
SL-03 planned later
```

### Candidate instance — WEUC-01 Add first export provider

```text
Potential Need:
  fulfill current SCN-03 with first real external destination

Demand basis:
  current Application responsibility + Scenario

Likelihood:
  high

Horizon:
  planned / near

Value:
  material

Confidence in demand:
  high

Alternative route:
  manual copy/export from review UI
  possible but worse whole workflow

Expected path confidence:
  low/medium before export implementation

Preparation-now question:
  does SL-01 need any exporter architecture at all?
```

Conclusion may be:

```text
no;
the Need is real but current-work overlap is low
and first-provider evidence is missing.
```

### WEUC-02 Add another export provider

```text
Potential Need:
  support another long-term knowledge workflow

Demand basis:
  plausible future user/workflow variation

Likelihood:
  low/medium

Horizon:
  plausible later

Value:
  unknown until concrete Need appears

Confidence:
  low

Alternative:
  one provider + manual route

Preparation-now cost:
  generalized framework

Deferred cost:
  unknown until first provider teaches actual variation
```

### WEUC-03 Change captured source metadata extraction

```text
Potential Need:
  preserve useful source context across varying browser/pages

Likelihood:
  medium

Horizon:
  near/plausible

Value:
  medium

Alternative:
  tolerate missing optional title/metadata

Expected desired path:
  capture-source boundary only

Path confidence:
  medium/low before code
```

### WEUC-04 Migrate local persistence meaning/representation

```text
Potential Need:
  current Domain/Requirement evolves
  and stored representation must follow

Likelihood:
  medium

Horizon:
  later

Confidence:
  medium

Alternative:
  migration can be deferred until concrete model change

Expected desired path:
  bounded persistence owner + migration verification
```

### Apply WEUC admission gate

Do not retain:

```text
"support arbitrary future providers"
```

as a material instance if no concrete Need/path/value exists.

### Important conclusion

```text
WEUC Type
≠ architecture requirement
```

For another provider:

```text
low-confidence future
+ high framework tax now
→ weak current reason for generic framework
```

For metadata change:

```text
plausible
+ overlaps current capture code
+ cheap local seam
→ may justify keeping capture-source mapping local
```

## Saved

```text
pre-code contextual WEUC instances
Demand Basis
Alternative Route
likelihood/horizon/value/confidence
expected path + path confidence
preparation-now vs deferral findings
```

Because this fixture selected **Full SDS**:

```text
durable material contextual WEUC instances
→ become candidates for transfer to the project-local WEUC Instance Register
```

after consistency review.

Architecture Decisions should reference the concrete driving WEUC instance/path rather than only an abstract Change Axis.

This Full-profile persistence is addressability, not extra semantics.

---

# 15. A9 — Architecture Pressure / Decision Before Code

## User says

```text
Оцени архитектурное давление только из конкретных WEUC/realization evidence
и прими только те решения, которые окупаются сейчас.
После этого перепроверь Slice Strategy, если техническая последовательность поменялась.
```

## Tampermonkey

```text
CURRENT CANDIDATE:
  оцени давление на архитектуру

CURRENT CANDIDATE:
  прими архитектурное решение
```

Both remain consistency-audit candidates.

## Chat actions

This is a nested Architecture/Workspace planning Target.

### Target-Scope Decision

```text
TS-ARCH-PRECODE-01:

Scope:
  only architecture seams materially relevant to SL-01/SL-02
  plus evidence-backed near future pressure

Outside:
  dynamic plugin platform
  speculative multi-provider ecosystem
```

### Question-Set Decision

```text
QS-ARCH-PRECODE-01:

RQ-A1:
  should current capture implementation isolate source-context mapping?

RQ-A2:
  what persistence responsibility is needed to preserve durable-before-success?

RQ-A3:
  should exporter architecture be generalized before first provider exists?
```

### Pressure findings

WEUC-03:

```text
supports a local capture-source boundary
```

WEUC-04:

```text
supports explicit persistence responsibility,
not a generalized migration framework
```

WEUC-02:

```text
does not yet justify a plugin framework
```

### RQ-A3 Ideas

```text
A:
  generic provider plugin interface now

B:
  create a minimal exporter boundary only when first real provider is implemented

C:
  create no export abstraction until SL-03
```

### L1

```text
current delivery target is SL-01/SL-02;
export is lower priority.
```

### L3

```text
real provider variation is unknown.
```

### L4

```text
A introduces current owners/contracts/config with no current behavior payoff.
```

### L5

```text
future demand is low-confidence;
current-work overlap is low;
Architectural Tax is non-trivial.
```

### L6

```text
C does not harm SL-01 verification.
```

### Answer Decision

```text
ARCH-D01:
  do not build exporter abstraction now;
  revisit when SL-03 / first provider becomes concrete.
```

This is even narrower than the previous workbook version.

### Residual Risk

```text
R-ARCH-D01:
  once export exists,
  future provider addition may expose a broad/error-prone change path.
```

### Revalidation hooks — no fake numeric threshold

Use evidence-based indicators:

```text
first/second provider becomes concrete

or

actual add-provider work requires repeated synchronized edits
across unrelated/shared owners

or

provider-specific control flow leaks into several shared responsibilities
```

Do **not** invent:

```text
">3 owners"
```

unless actual baseline data later gives that number meaning.

### Slice Strategy recheck

Current architecture conclusions do not change:

```text
SL-01 > SL-02 > SL-03
```

No prerequisite Slice is inserted.

Persist:

```text
Slice Strategy reaffirmed
```

---

# 16. A10 — Plan SL-01

## User says

```text
План слайса приложения:
SL-01 capture → durable local inbox.

Собери полный Slice owner,
а не список файлов/задач.
```

## Tampermonkey

```text
CURRENT CANDIDATE:
  план слайса приложения
```

## Chat actions

### Target-Scope Decision

```text
TS-SL-01:

Deliverable/checkable result:
  SCN-01 capture is realized end-to-end
  through durable accepted inbox result
```

### Question-Set Decision

```text
QS-SL-01:

what exact Scenario/Behavior/Requirement coverage is implemented?
what is delegated/later/outside?
what Domain meaning must be realized?
what dependencies/handoffs exist?
what implementation responsibilities are needed?
what verification proves the vertical result?
what architecture/WEUC evidence constrains the implementation?
```

### Full Slice semantic coverage

```text
Covered Scenario:
  SCN-01

Covered Behavior Items:
  BI-01..BI-05

Scenario DATA consumed:
  selected fragment
  source URL
  optional source title
  optional user note

Requirements implemented / constraining:
  REQ-CAP-01 durable-before-success
  REQ-CAP-02 no silent loss / false success

Relevant Domain:
  CaptureItem identity/lifecycle meaning
  SourceRef only if selected in Domain

Relevant realization/architecture evidence:
  local capture-source mapping seam
  explicit persistence responsibility
  no exporter abstraction in this Slice
```

### Related behavior / responsibility boundary

```text
implemented here:
  SCN-01 capture path

delegated/shared:
  browser selection/source acquisition outside Application
  canonical Scenario behavior remains in SCN-01
  Domain meaning remains in Domain owner

later:
  SCN-02 review richness
  SCN-03 export

outside:
  long-term knowledge-system organization
```

### Vertical boundary

```text
entry:
  Application receives capture intent/data

end:
  durable accepted item + observable success
  or selected recoverable failure result
```

### Dependencies / handoffs

Material examples:

```text
Upstream semantic dependencies:
  SCN-01
  REQ-CAP-01 / REQ-CAP-02
  selected CaptureItem Domain meaning

External/delegated dependency:
  browser supplies selected fragment/source context

Architecture evidence:
  current capture-source / persistence Decisions

Testing handoff:
  Behavior-to-Test Trace + Practical Acceptance
```

Applicability does not move semantic ownership into the Slice.

### Integrated implementation plan

Now implementation responsibilities can be selected, but provisional names are not semantic contracts.

Example responsibilities:

```text
capture adapter / source mapping
application capture orchestration
persistence owner
minimal acknowledgement/failure surface
```

Expected classes/files may be proposed for implementation convenience.

They remain realization hypotheses.

### L4

Assess:

```text
owners introduced/touched
dependency direction
migration/freshness impact
```

### L5

Check:

```text
metadata-source variation remains local
persistence change path is bounded
```

### L6

Verification target derives from upstream meaning:

```text
Scenario Acceptance
+ Behavior Items
+ Requirements
+ Domain meaning
+ Slice result
```

Need proof for:

```text
successful durable capture
false-success prevention
selected failure recovery
restart persistence when relevant
```

### Validator

```text
Target Projection Conformance Validator
```

must fail if output is only:

```text
browser extension
SQLite
API
files/classes
```

without full Scenario/Behavior/Requirement/Domain/boundary/proof coverage.

## Saved

```text
complete SL-01
TS-SL-01
QS-SL-01
implementation Answer Decisions
residual Q/R/P
verification target
```

---

# 16A. A10B — Cross-Owner SDS Consistency Gate

## Purpose

Before turning the selected plan into detailed proof/implementation, review the integrated current owners.

This is the current `UC-PLAN-CONSISTENCY` responsibility.

It is a responsibility/check, not a mandatory new artifact.

## User says

```text
Перед тест-дизайном и реализацией
проверь текущую консистентность:
Scenario / Requirements / Domain / Slice / architecture decisions.
Не переписывай владельцев автоматически.
```

## Tampermonkey

```text
AUTOMATIC / FUTURE COMPOSITION:
  SDS cross-owner consistency check

CURRENT REPO:
  UC-PLAN-CONSISTENCY exists,
  but no direct command is proven for this exact generic invocation.
```

## Chat actions

Check:

```text
Does SL-01 cover exactly selected SCN-01 Behavior?

Did Slice accidentally invent behavior not present in Scenario?

Do Requirements still have one canonical owner?

Does Domain introduce semantics unsupported by Scenario/Requirements?

Does implementation convenience weaken Domain invariant?

Do architecture Decisions preserve Application behavior?

Are delegated/later/outside concerns explicit?

Did Prototype evidence accidentally become current Scenario truth?

Did any current Source change invalidate a dependent owner?
```

If contradiction appears:

```text
identify the real owner
→ reopen/correct only that owner/Decision
→ then re-run affected dependent consistency
```

Do not let the consistency check itself become a second semantic owner.

## Output

```text
cross-owner consistency result
explicit corrections/review needs when any
```

---

# 17. A11 — Verification Design + Practical Test Plan Before Implementation

## User says

```text
Сначала спланируй проверку поведения SL-01,
а потом practical operated acceptance.
Не заявляй, что тесты уже прошли.
```

## Tampermonkey

```text
CURRENT CANDIDATE:
  спланируй проверку поведения

CURRENT CANDIDATE:
  план практического тестирования
```

`стратегия тестирования` is **not** automatically required here unless a shared/layer proof policy across several Slices becomes material.

## Chat actions

### Test Design

Map semantic truth to proof:

```text
SCN-01 Acceptance
BI-01..BI-05
REQ-CAP-01 / REQ-CAP-02
Domain invariants when material
SL-01 deliverable
↓
Behavior-to-Test Trace
```

Choose proof layers.

Example:

```text
contract/unit evidence:
  persistence success/failure boundary

integration evidence:
  capture orchestration → durable storage

operated/E2E evidence:
  browser capture → observable result
```

### Practical Test Plan

Acceptance cards:

```text
T1:
  select text
  capture
  restart app
  item remains available

T2:
  force persistence failure
  Application does not report success

T3:
  exercise selected recovery path
  capture intent/result is not silently lost

T4:
  human/AI operated flow:
  capture from reading context
  verify actor can resume reading without destination-organization work
```

If duplicate semantics were not selected upstream, do not invent a duplicate test as product truth.

### L6 relation

The Lens generated:

```text
proof requirements
observability requirements
```

The Test Design / Practical Plan materializes them.

No executed Evidence exists yet.

---

# 18. A12 — Realization

Current repository planning commands do not automatically grant implementation.

## User says

Example if an implementation-capable coding environment is separately authorized:

```text
Реализуй SL-01 по текущему принятому плану.
Не меняй Scenario/Domain semantics молча.
Если реализация упирается в противоречие — останови изменение смысла
и верни Evidence/concern.
```

## Tampermonkey

No current repository planning command should be assumed to own generic code realization.

This is environment/tool-specific.

Permission must be explicit.

## Chat/agent actions

Implement selected Target.

If technical issue appears:

```text
local implementation defect
→ fix locally

semantic contradiction
→ produce Evidence
→ route to IDTSPE revalidation
```

---

# 19. A13 — Execute Proof, Review Actual Evidence And Re-Trace WEUC

## User says

After separately authorized implementation:

```text
Выполни/собери фактический proof по SL-01,
проверь реальное тестовое покрытие,
проверь semantic drift относительно Slice/Scenario,
и потом перепроверь только затронутые WEUC на реальной структуре.
```

## Tampermonkey / route reality

```text
CURRENT CANDIDATE:
  проверь тестовое покрытие
```

For semantic implementation drift:

```text
CURRENT WORKFLOW / ROUTE CANDIDATE:
  semantic ReviewDiff / review-diff workflow
```

Exact user-facing route depends on the artifact/transfer path and needs consistency review.

For affected contextual WEUC:

```text
CURRENT CANDIDATE COMPONENT:
  собери WEUC

FUTURE NEEDED:
  перепроверь решения
  собери WEUC-картину
```

Important correction:

```text
проверь реализацию приложения
```

is **not** used here as generic code-review command.
Its current owner is the high-level Application Realization stress workflow used earlier in A6B.

## Chat / execution actions

### Execute the selected proof

Actual environment/tool executes T1–T4 where feasible.

Capture:

```text
actual pass/fail Evidence
actual user-visible success/failure
actual persistence behavior
actual recovery behavior
```

### Review test coverage

Current coverage review asks:

```text
does actual evidence really prove selected Behavior/Requirements?
what is missing/weak/stale/wrong-layer?
```

### Semantic drift / ReviewDiff

Compare:

```text
Selected Scenario / Requirements / Domain / Slice
vs
Actual Realized State
```

A class/file rename alone is not drift.

Real drift includes:

```text
behavior changed
responsibility moved
invariant weakened
unexpected mutation/failure behavior
proof guarantee weakened
```

### Capture implementation structure as Evidence

Only now are concrete:

```text
actual files/classes/modules
actual persistence path
actual tests
actual runtime/diagnosis path
```

### Re-trace affected WEUC only

#### WEUC-03 — metadata extraction

Expected:

```text
local capture-source path
```

Actual example:

```text
BrowserCaptureMapper
+ bounded tests
```

Result:

```text
expected locality supported
```

#### WEUC-04 — persistence evolution

Actual structure may reveal:

```text
migration responsibility mixed across bootstrap/repository/model mapping
```

New Risk:

```text
future schema/domain migration may require broad coordinated edits
```

Add material revalidation hook.

### WEUC state

Update:

```text
expected path → observed path
confidence
actual friction
```

Do not reopen unrelated WEUC.

## Output

```text
executed Evidence
Coverage findings
semantic drift result
Observed WEUC Evidence
Decision revalidation input
```

---

# 20. A14 — End Of Scenario A / Reconciliation

## Decision revalidation

Evaluate only material challenged Decisions.

Example:

```text
D-SOL-01:
  reaffirmed

D-APP-RESP-01:
  reaffirmed

SCN-01 Decisions:
  reaffirmed if operated Evidence matches selected behavior

Domain Decisions:
  reaffirmed

Slice Strategy:
  reaffirmed

SL-01:
  accepted if selected proof/coverage is sufficient

ARCH-D01:
  still accepted;
  no real exporter exists yet

WEUC-03:
  expected path gained actual Evidence/confidence

WEUC-04:
  new residual architecture Risk added
```

No reason to reopen:

```text
Need
whole-Solution boundary
unrelated Scenarios
exporter architecture before its trigger fires
```

If actual implementation only has a local defect:

```text
LOCAL CORRECTION
```

If a real semantic contradiction appears:

```text
route to narrowest Scenario/Requirement/Domain/Slice Decision
```

## WEUC reconciliation

```text
previous Current WEUC State
+ Accepted WEUC expectations
+ Observed WEUC Evidence
→ updated Current WEUC State
```

## Current state becomes Source for next planning

```text
Need / Current Reality / whole workflow
D-SOL-01
D-CONCEPT-01
D-APP-RESP-01
Prototype evidence — provisional/historical, not Scenario authority
Scenario catalog
SCN-01 / SCN-02
Scenario DATA / Behavior / Requirements
selected Domain
high-level realization findings
Slice Strategy
SL-01
Architecture Decisions
residual Q/R/P + revalidation hooks
WEUC portfolio/state
actual proof / Coverage / ReviewDiff Evidence
```

This closes the first complete SDS loop.

---

# 21. SCENARIO B — Existing Application: "Add Zotero Export"

## Purpose

Test:

```text
low-level Trigger
→ reverse justification without fixed full replay
→ reuse trusted upstream planning
→ early Decision revalidation
→ no unnecessary new Scenario
→ new Slice
→ WEUC becomes more likely
→ architecture Decision may reopen
```

This is a complete bounded SDS planning cycle inside an existing application.

---

# 22. B0 — Trigger Arrives As A Proposed Solution

## User says

```text
Нужна интеграция с Zotero.
Спланируй это, но сначала проверь,
не тащим ли мы в приложение лишнюю функцию
и не решается ли нужда уже существующим сценарием.
```

## Tampermonkey

There is no proven current generic Need-rooted command for this exact entry.

Possible current candidate:

```text
CURRENT CANDIDATE:
  собери идеи приложения
```

but it is Idea-source-oriented and must pass consistency audit before being treated as generic IDTSPE.

Future:

```text
FUTURE NEEDED:
  спланируй таргет
```

## Chat actions

### Trigger

```text
"Zotero integration"
```

### Target-Scope Decision — targeted existing-application change

Persist:

```text
TS-ZOTERO-01:

do not accept "integration" as the Need;
identify the smallest current Application/SDS owner(s)
whose selected result would actually change.
```

### Question-Set Decision

```text
QS-ZOTERO-01:

does an existing Need/Scenario already justify export?
is a new Scenario required?
does current Domain need new lifecycle/identity meaning?
does current architecture Decision need revalidation?
what deliverable Slice realizes the accepted change?
```

### Reverse justification — targeted

Do not replay entire application from scratch.

Read/reuse:

```text
Need
Application responsibility
SCN-03 Export Selected Item
current export-related Decisions
current WEUC instances
```

L1:

```text
Underlying Need:
  move selected captured research item into citation/reference workflow

Does existing SCN-03 already own that result?
  yes
```

Conclusion:

```text
no new Application Scenario needed
```

Potential Scenario detail change:

```text
SCN-03 becomes concrete enough to define first export destination semantics
```

Target-Scope Answer:

```text
TS-ZOTERO-01 selected scope:
  refine existing SCN-03 only where Zotero creates current user-visible meaning,
  review Domain only if durable external-reference lifecycle is required,
  revalidate exporter architecture,
  then plan one Zotero Slice.
```

No new Scenario is created merely because a new provider/integration exists.

---

# 23. B1 — Early Prior-Decision Revalidation

Before generating implementation Ideas, inspect relevant residual Q/R/P.

Prior ARCH-D01 had:

```text
Risk:
  second provider / broad add-provider path may justify architecture re-open

Trigger indicators:
  second provider becomes real/planned
  or add-provider work becomes materially broad/error-prone
  across unrelated/shared owners
```

Current fact:

```text
Zotero is now a real provider requirement/candidate
```

But is it the second provider?

Suppose SL-03 already implemented Markdown-folder export as first provider.

Then:

```text
indicator fired:
  second provider is now real
```

Result:

```text
reopen exporter-architecture RQ
```

Do **not** reopen:

```text
Capture Scenario
CaptureItem identity
local inbox responsibility
```

No Evidence challenges them.

This is the desired selective revalidation behavior.

---

# 24. B2 — Scenario Detail / Requirements

## User says

```text
Проверь SCN-03 и добавь только Zotero-специфичное поведение,
которое реально относится к Application behavior.
```

## Tampermonkey

```text
CURRENT CANDIDATE:
  план сценария приложения

or:
  собери идеи сценария
```

after consistency audit.

## Chat actions

L1:

```text
what user-visible result differs?
```

Selected Scenario meaning only if user-visible:

```text
actor selects Zotero as the intended export destination
actor initiates export of selected capture
Application reports meaningful success/failure
successful result is distinguishable from local-only state
```

Keep implementation-only meaning downstream:

```text
OAuth class names
HTTP retry implementation
adapter registry
JSON mapper
provider interface
```

Those remain realization/architecture.

Requirements may include:

```text
failure must not mark item exported
external identifier is retained when export succeeds
```

Domain gate:

```text
RQ:
  does successful export create durable external-reference identity/lifecycle
  that later Scenarios/consistency rules need?
```

If no:

```text
do not change Domain merely because provider API returns an ID
```

If yes:

```text
run Domain review before Slice planning
→ integrate selected ExternalExportRef meaning into Domain owner
→ keep API/persistence representation downstream
```

After any Scenario/Requirement/Domain change:

```text
run affected cross-owner consistency review
before downstream Slice projection
```

---

# 25. B3 — WEUC Portfolio Update Before Architecture Choice

## User says

```text
Обнови WEUC-картину с учетом того,
что второй export provider теперь реально нужен.
```

## Tampermonkey

```text
FUTURE NEEDED:
  собери WEUC-картину

CURRENT CANDIDATE COMPONENT:
  собери WEUC
```

## Chat actions

Update WEUC-02:

```text
Type:
  Add Export Provider

Instance:
  Add Zotero provider to current export architecture

Likelihood:
  now / confirmed

Horizon:
  now

Value:
  material

Confidence:
  high

Need basis:
  concrete SCN-03 user need

Alternative route:
  manual export/copy
  possible but materially worse workflow

Current-work overlap:
  directly crosses current export owner

Expected current path:
  inspect real first-provider implementation
```

Trace current path.

Suppose current architecture:

```text
ExportService
MarkdownExporter
UI switch
provider-specific mapping mixed in service
tests
```

Expected Zotero addition touches:

```text
ExportService
new Zotero code
UI
mapping
tests
maybe persistence external-ref
```

Now the previous future Risk has concrete evidence.

---

# 26. B4 — Architecture RQ Reopened

## User says

```text
Теперь перепроверь старое решение по exporter architecture
и выбери вариант с учетом реального add-provider WEUC.
```

## Tampermonkey

```text
FUTURE NEEDED:
  перепроверь решения

CURRENT CANDIDATE:
  прими архитектурное решение
```

## RQ

```text
How should provider-specific export behavior be owned
now that a second provider is real?
```

Ideas:

```text
A:
  keep provider branches inside ExportService

B:
  Extract ExportProvider interface + one provider object per provider

C:
  generic plugin registry/framework with discovery/config metadata
```

L1:

```text
Need:
  add Zotero now, not build marketplace
```

L2:

```text
one owner for export semantics;
do not duplicate shared success/failure behavior
```

L3:

```text
future third/fourth provider unknown;
framework C may be premature
```

L4:

```text
A:
  growing branch fan-out

B:
  local provider implementation + shared orchestration

C:
  more files/config/protocol now
```

L5:

```text
material WEUC = add provider
B minimizes expected path
C adds Architectural Tax not justified by current portfolio
```

L6:

```text
B allows contract tests per provider
shared export orchestration remains independently testable
```

Decision:

```text
ARCH-D02:
  use narrow ExportProvider contract + explicit provider registry/list;
  do not build dynamic plugin framework.
```

Supersedes/refines:

```text
ARCH-D01 only on exporter internal realization
```

Preserve:

```text
the earlier rationale against speculative framework
```

Residual Risk:

```text
R:
  provider capabilities may diverge enough that one flat contract becomes artificial
```

Hook:

```text
if provider-specific optional capabilities create repeated unsupported branches
or third provider requires contract exceptions,
reopen provider-contract RQ
```

Fallback saved:

```text
dynamic capability model / plugin metadata
```

but not selected now.

---

# 27. B5 — Plan Zotero Slice

## User says

```text
План слайса приложения:
добавить Zotero export как отдельный deliverable result.
```

## Chat actions

Full Slice projection:

```text
Covered Scenario:
  SCN-03

Covered Behavior / Requirements:
  selected destination behavior
  initiate export
  observable success/failure
  no false exported-state on failure

Scenario DATA:
  only user/scenario-relevant export inputs/results

Domain:
  ExternalExportRef only if the prior Domain Decision selected it

Architecture realization:
  selected ExportProvider boundary / registry Decision

Implemented:
  Zotero export path
  migration of first provider to selected shared boundary when required

Delegated:
  Zotero service internals

Later:
  additional providers
  dynamic plugin discovery

Outside:
  managing Zotero library itself

Proof:
  successful Zotero export
  failed export preserves selected local consistency
  first provider still satisfies current behavior
  provider-specific change remains within selected ownership boundary
```

L4/L5/L6 are applied only as contextual implementation/workspace lenses.

Target Projection Conformance must verify full Scenario/Requirement/Domain/implemented-delegated-later-outside coverage.

---

# 28. B6 — Realize, Execute Proof And Recheck

Implementation remains separately authorized.

## User says

After code exists:

```text
Выполни запланированный proof для Zotero Slice,
проверь actual test coverage,
semantic drift и фактический WEUC add-provider.
```

## Route reality

```text
CURRENT CANDIDATE:
  проверь тестовое покрытие

CURRENT WORKFLOW CANDIDATE:
  semantic ReviewDiff / actual target comparison

CURRENT CANDIDATE COMPONENT:
  собери WEUC

FUTURE NEEDED:
  перепроверь решения
```

Do not use current `проверь реализацию приложения` as generic code review.

## Observed example

Actual provider addition touched:

```text
Zotero provider implementation
explicit provider registry
provider contract test
one Scenario-level integration test
```

Shared export orchestration remains unchanged.

Proof confirms:

```text
SCN-03 selected success/failure behavior
first provider regression safety
selected local consistency guarantees
```

WEUC result:

```text
Add Provider path:
  bounded/local
  low coordination
```

No arbitrary numeric "good owner count" is inferred.

ARCH-D02:

```text
reaffirmed
```

Residual provider-capability Risk:

```text
not triggered
```

Update Current WEUC State with actual path Evidence.

---

# 29. B7 — End Of Scenario B

Preserved without re-planning:

```text
Need for capture
SCN-01
SCN-02
CaptureItem core
SL-01
most previous architecture
```

Changed:

```text
SCN-03 detail
ExternalExportRef if selected
exporter architecture Decision
Zotero Slice
WEUC-02 state/evidence
```

This is one-directional planning with selective correction.

---

# 30. SCENARIO C — Evidence-Driven Architecture Replan After Expensive Real Work

## Purpose

Test:

```text
Practical Evidence starts IDTSPE
→ no user feature request required
→ residual Risk fires
→ current behavior remains valid
→ architecture answer may be replaced
or additional mitigation Decision added
→ WEUC portfolio updated from actual work
```

---

# 31. C0 — Practical Trigger

Assume a later real provider `Readwise` was added by another developer.

Observed Evidence:

```text
adding provider touched 9 files
required changes in:
  UI
  orchestration
  provider
  persistence mapping
  two test suites
  config
  documentation

one bug came from forgetting provider capability handling
```

User says:

```text
Добавление нового export provider оказалось слишком дорогим.
Вот фактический diff/тесты/что пришлось менять.

Не начинай сразу рефакторить.
Сначала перепроверь решения и WEUC,
пойми что именно стало плохим.
```

## Tampermonkey

```text
FUTURE NEEDED:
  перепроверь решения

CURRENT CANDIDATE COMPONENT:
  собери WEUC

Later, only after Target/Scope + RQs are established:

CURRENT CANDIDATE:
  оцени давление на архитектуру

CURRENT CANDIDATE:
  прими архитектурное решение
```

---

# 32. C1 — Evidence Capture And Existing Decision Challenge

Chat preserves Evidence:

```text
E-ADD-PROVIDER-READWISE
```

Revalidation finds ARCH-D02 residual Risk:

```text
provider contract may become artificial
if later provider requires capability exceptions
```

Observed:

```text
provider-specific capability handling leaked to 9 files
```

Risk threshold fires.

Question:

```text
is ARCH-D02 itself wrong,
or is one additional capability Decision enough?
```

This is important.

Do not automatically discard ARCH-D02.

---

# 33. C2 — Target/Scope Decision

Possible scope candidates:

```text
A:
  replace whole export architecture

B:
  fix only Readwise implementation bug

C:
  introduce a capability/ownership refinement
  while preserving provider boundary

D:
  move all export logic back into one service
```

L1:

```text
Problem:
  recurring add-provider work is now demonstrably expensive/error-prone

Target:
  reduce add-provider change path
  without changing user-visible export behavior
```

Target-Scope Decision:

```text
TS-C-ARCH-01:
  architecture/workspace evolution Target
  inside current export subsystem
```

Persist it because later Evidence may show the scope was too narrow/broad.

Not:

```text
new Application Scenario
```

---

# 34. C3 — WEUC Full Picture, Not Single-Instance Tunnel Vision

User says:

```text
Собери полную картину WEUC по export subsystem.
Не оптимизируй только add-provider:
проверь остальные важные виды изменений,
чтобы мы не улучшили одно и не сломали другое.
```

This is exactly why portfolio-level WEUC is needed.

## Portfolio material instances

```text
W1 Add provider
now observed multiple times
high importance

W2 Change shared export success/failure semantics
medium likelihood
high correctness consequence

W3 Add provider-specific capability
now observed
high/medium importance

W4 Change external authentication
plausible per provider
medium

W5 Diagnose failed export
current operational work
medium/high

W6 Remove/deprecate provider
plausible later
medium
```

For each:

```text
Need basis
likelihood/horizon/value/confidence
alternative route
expected/current path
work-cost
```

Example W3:

```text
Potential Need:
  a provider supports collection/folder selection that others do not

Alternative:
  ignore optional capability
  or expose only common denominator

Value:
  depends on user workflow

Current observed evidence:
  Readwise capability handling already leaked across owners

Confidence:
  high that provider variation exists
```

This portfolio prevents:

```text
"add provider is expensive"
→ build giant plugin platform
```

without checking shared semantics, debugging and auth changes.

---

# 35. C4 — RQ Discovery

Persist:

```text
QS-C-ARCH-01
```

Question-Set Decision selects:

```text
RQ-C1:
  where should provider capability variation live?

RQ-C2:
  how should shared export orchestration consume capabilities?

RQ-C3:
  what change path should "add provider" require?

RQ-C4:
  what proof ensures existing providers remain compatible?
```

Possible question intentionally deferred:

```text
dynamic third-party plugin loading
```

No Need currently justifies it.

---

# 36. C5 — Ideas

Candidate architecture:

```text
Idea A:
  keep flat ExportProvider contract;
  add more optional methods

Idea B:
  capability objects declared by each provider;
  shared orchestration consumes explicit capability set

Idea C:
  generic plugin manifest + dynamic capability registry/framework

Idea D:
  one provider-specific workflow per provider,
  duplicate orchestration intentionally
```

---

# 37. C6 — Apply Lenses

## L1

```text
Goal is cheaper/correct recurring provider change,
not framework elegance.
```

## L2

```text
shared export success/failure semantics should remain one authority
provider-specific capabilities should not redefine Scenario behavior
```

## L3

```text
future capability variety exists but exact set is unknown
avoid dynamic framework lock-in
```

## L4

Trace each candidate.

A:

```text
still causes shared contract churn
```

B:

```text
new provider:
  provider class
  capability declaration
  registry
  tests
```

C:

```text
adds manifest/discovery/config lifecycle
```

D:

```text
duplicates shared correctness behavior
```

## L5 WEUC

Compare portfolio, not only W1.

B:

```text
W1 add provider:
  low fan-out

W2 shared semantics:
  remains centralized

W3 capability:
  local declaration

W4 auth:
  per-provider ownership possible

W5 diagnosis:
  provider identity/capabilities observable

W6 remove provider:
  registry + provider local
```

C:

```text
similar future flexibility
but higher current working-context/config/verification cost
```

D:

```text
W1 may be local
but W2 shared semantic changes become synchronized duplication
```

## L6

B:

```text
provider contract tests
capability-specific tests
shared orchestration tests
good diagnosis boundary
```

---

# 38. C7 — Architecture Decision

Select:

```text
ARCH-D03:
  provider-owned explicit capability model
  + shared orchestration
  + explicit static registry
```

Do not select:

```text
dynamic plugin framework
```

Residual Q:

```text
Q:
  will capabilities remain small declarative flags,
  or require provider-specific interaction flows?
```

Evidence hook:

```text
if a real provider requires user interaction that cannot be expressed
through the current capability model,
reopen RQ-C1/RQ-C2
```

Residual Risk:

```text
R:
  capability model may become an untyped feature-flag dump
```

Indicators:

```text
> N unrelated capability flags is NOT automatically a threshold;
instead observe:
  repeated capability combinations
  conditional branches in shared orchestration
  inability to state one semantic meaning per capability
```

No fake numeric threshold is required when qualitative indicators are better.

---

# 39. C8 — Refactor Slice

Target:

```text
Refactor export subsystem
without changing current Application behavior
```

Proof:

```text
all existing provider acceptance passes
add synthetic provider touches bounded owner set
shared failure semantics unchanged
capability-specific behavior tested
```

This **may** be represented as an Implementation Slice when:

```text
the project is using Slice planning
+
the refactor is one separately deliverable/checkable increment
+
it has a real risk/dependency/evolution reason
+
its proof target is explicit
```

It is not a new Application Scenario.

If a separate Slice artifact adds no review/delivery value, a valid route is:

```text
Architecture Decision
→ Pre-Update / implementation plan
→ realization
→ Evidence
```

without manufacturing a Slice merely because code changes.

In either route, Application behavior owners remain unchanged.

---

# 40. C9 — Post-Refactor WEUC Experiment

A powerful practice:

Before waiting for a real next provider, perform a **representative change-path exercise**.

Example:

```text
simulate adding FakeProvider
with:
  basic export
  one optional capability
  auth requirement
```

This is not production functionality.

It is representative architecture Evidence.

Observe:

```text
files/classes/methods touched
working context
tests changed
debug path
registration path
```

Evidence:

```text
W1 add-provider now local
W3 capability local
W5 diagnosis improved
```

WEUC State is updated.

ARCH-D03 remains a hypothesis subject to future real evidence.

---

# 41. C10 — End Of Scenario C

Revalidation:

```text
Application Scenarios:
  preserved

Domain:
  preserved unless capability semantics exposed a real Domain concern

export behavior:
  preserved

ARCH-D02:
  superseded/refined by ARCH-D03

WEUC portfolio:
  updated from real + representative evidence
```

This demonstrates:

```text
Evidence-driven planning
without unnecessary product re-planning.
```

---

# 42. SCENARIO D — Wrong Initial Trigger, Valid End Is "Do Not Build It"

This shorter complete lifecycle tests Need/Scope correctness.

## User says

```text
Добавим AI auto-tagging всех captures.
```

Future generic target-planning route runs L1 first.

Underlying Need discovered:

```text
user struggles to find old captures
```

Existing evidence:

```text
inbox has only 30 items
simple search + source filtering is sufficient
```

Ideas:

```text
AI auto-tagging
manual tags
full-text search
no new feature yet
```

L1:

```text
AI does not have enough current value
```

L3:

```text
tag quality/maintenance unknown
```

L4/L5:

```text
AI pipeline introduces config/provider/tests/runtime/debugging
for a currently small problem
```

Decision:

```text
do not add AI auto-tagging now
```

Target can still be valid:

```text
Decision record
+ residual Q/R/P
+ reconsider when capture volume/search failures become material
```

No Slice is required.

A complete IDTSPE lifecycle may end with:

```text
no implementation
```

This is important.

---

# 43. Reusable Scenario Pattern Extracted

Across the scenarios, the repeatable interaction is:

```text
USER
states Trigger / Need / new Evidence
↓
CHAT
resolves Target/Scope
↓
CHAT
resolves trusted Sources and old Decisions
↓
CHAT
checks whether prior Decisions are already challenged
↓
CHAT
discovers RQs
↓
CHAT
selects applicable Lenses
↓
CHAT
generates/reuses candidate Ideas
↓
CHAT
evaluates every serious candidate through the same relevant Lens Set
↓
CHAT
creates Q/R/P only for material unresolved/adverse findings
↓
CHAT
selects Decision
↓
CHAT
stores residual revalidation hooks
↓
CHAT
combines Decisions and reviews composition
↓
CHAT
projects complete Target
↓
CHAT
runs conformance Validators
↓
USER
explicitly requests Pre-Update / realization when wanted
↓
CHAT / AGENT
realizes
↓
CHAT
captures Evidence
↓
CHAT
revalidates only affected Decisions
```

---

# 44. Reusable User Interaction Pattern

The user should not have to micromanage every Lens.

Normal usage:

```text
User:
  "План сценария приложения: SCN-X"

Chat:
  resolves the Scenario Pack
  automatically runs applicable core/contextual Lenses
  shows only material findings
```

When user wants explicit audit:

```text
User:
  "Покажи через какие линзы ты это решение проверил"
```

Chat can render:

```text
L1 checked — no additional concern
L2 found duplicate-owner Problem
L3 created one Question
L5 not applicable
L6 created proof requirement
```

The Tampermonkey helper should project command/preset selection.

It should not become semantic authority for the Lens results.

---

# 45. Current Command Mapping Derived From The Scenarios

This table is deliberately **not** a declaration that current commands already implement the final semantics.

| Future flow role | Current candidate route | Consistency audit needed |
|---|---|---|
| choose Full SDS physical profile | `фулл сдс` | verify profile vs future Planning Topology/Pack semantics |
| Current Reality | `разбери текущую реальность` | verify relation to formal Need/Real-Life Scenario |
| whole solution | `план решения` | verify Need/Target/RQ/Decision persistence integration |
| Application Concept | `план концепции приложения` | verify scoped IDTSPE and Source Contract |
| Application responsibility | `определи ответственность приложения` | verify Target-Scope persistence |
| Prototype interaction/workflow evidence | `прототип приложения` | verify provisional PSCN/PSCR/DATA/Behavior/Requirements stay evidence until canonical Scenario/Screen selection |
| Scenario discovery | `собери сценарии приложения` | verify Question-Set/RQ semantics vs current scenario boundaries |
| detailed Scenario | `план сценария приложения` | verify full Target projection validator |
| Domain discovery | `исследуй домен приложения` | verify Lens/Idea/RQ integration |
| Domain selection | `план домена приложения` | verify Decision persistence/revalidation |
| Slice strategy | `план стратегии слайсов` | verify Scope/RQ/WEUC composition |
| Slice | `план слайса приложения` | verify complete projection and validators |
| cross-owner SDS consistency | no direct command proven; current `UC-PLAN-CONSISTENCY` responsibility | verify Scenario/Screen/Requirement/Domain/Slice contradiction review without second authority |
| contextual WEUC | `собери WEUC` | verify against portfolio + Need-basis additions |
| Change Pressure | `оцени давление на архитектуру` | verify as WEUC-derived analyzer, remove overlap |
| architecture choice | `прими архитектурное решение` | verify three-decision-model integration |
| behavior proof design | `спланируй проверку поведения` | verify Behavior→Test Trace and planned-proof ≠ executed Evidence |
| practical acceptance plan | `план практического тестирования` | verify L6/Evidence-plan boundary |
| high-level realization stress review | `проверь реализацию приложения` | verify representative runtime/persistence/integration feasibility semantics; do not reuse as generic post-code review |
| actual coverage | `проверь тестовое покрытие` | verify Evidence/revalidation integration |
| semantic implementation drift / ReviewDiff | no single generic palette route proven for every artifact path | verify current review-diff owner/transfer route before reuse |
| exact repo transition | `план файл-обновление` | preserve plan-only; verify expanded Pre-Update target-state |
| generic IDTSPE target planning | none proven | FUTURE NEEDED or composition of current routes |
| prior Decision revalidation | none proven | FUTURE NEEDED |
| full WEUC portfolio | none proven | FUTURE NEEDED |
| Rule/Validator audit | none proven | automatic + optional diagnostic |

---

# 46. Required Consistency Gate Before Reusing Any Current Command

For every candidate route above:

```text
CURRENT:
  command definition
  ownerFiles
  UC owner
  workflow/template
  examples
  current output contract
  permission mode

TARGET:
  selected IDTSPE role
  required Sources
  choice level
  Lenses
  Q/R/P attachment
  Decision persistence
  Validators
  downstream handoff

COMPARE:
  overlap
  duplicate responsibility
  missing target semantics
  conflicting semantics
  obsolete semantics

DECIDE:
  reuse
  extend
  merge
  split
  retire
```

Do not infer:

```text
same word
→ same concept
```

---

# 47. Acceptance Tests The Scenarios Expose For Future IDTSPE

## Test 1 — Need before solution

Input:

```text
"нужна интеграция с Zotero"
```

Expected:

```text
do not make integration the root Need
```

## Test 2 — Reuse upstream work

Existing Scenario is valid.

Expected:

```text
do not replan capture/domain from scratch
```

## Test 3 — Residual Risk triggers correct re-open

Second provider becomes real.

Expected:

```text
reopen exporter architecture Decision only
```

## Test 4 — Target projection completeness

Slice planning returns implementation detail only.

Expected:

```text
Target Projection Validator fails
```

## Test 5 — WEUC candidate does not force abstraction

Future second provider low-confidence.

Expected:

```text
do not build plugin framework
```

## Test 6 — Real WEUC pressure can overturn old architecture answer

Observed add-provider path becomes broad/error-prone.

Expected:

```text
reopen architecture RQ
```

## Test 7 — Old Decision may remain valid while mitigation is added

Risk emerges but answer still useful.

Expected:

```text
add mitigation Decision when sufficient
instead of blindly superseding old Decision
```

## Test 8 — No implementation is a valid planning result

AI tagging has insufficient value.

Expected:

```text
Decision = do not implement now
```

## Test 9 — Programming principle is not architecture goal

DRY suggests abstraction.

Expected:

```text
evaluate actual WEUC/dependency effects first
```

## Test 10 — Full WEUC picture avoids tunnel vision

One WEUC improves, another becomes worse.

Expected:

```text
portfolio comparison catches trade-off
```

## Test 11 — Prototype evidence does not become Scenario truth automatically

Prototype PSCN/PSCR suggests a flow.

Expected:

```text
Scenario Discovery validates/splits/merges it
before canonical SCN/Screen ownership
```

## Test 12 — Domain remains optional and downstream

Scenario DATA contains fields.

Expected:

```text
do not mechanically create Entity/Aggregate/schema;
select explicit Domain only when identity/lifecycle/rules/ownership justify it
```

## Test 13 — `проверь реализацию приложения` is used at the correct SDS depth

Expected:

```text
high-level representative runtime/persistence/integration stress review
before detailed Slice planning when material
```

Not:

```text
generic post-code correctness review
```

## Test 14 — Test plan is not test evidence

Expected:

```text
Test Design / Practical Test Plan
≠ executed proof

actual execution
→ Evidence
→ Coverage/revalidation
```

## Test 15 — Full SDS is addressability, not extra truth

Expected:

```text
switch Mini/Modular/Full profile
→ preserve same selected Scenario DATA / Behavior / Requirements / Domain / Slice meaning
```

Full may materialize more stable owners/registers, but must not invent new semantics merely because the profile is richer.

## Test 16 — Cross-owner consistency does not become another owner

Contradiction between Slice and Scenario.

Expected:

```text
identify real semantic owner
→ correct/review that owner
→ recheck dependents
```

Not:

```text
write a third "consistency truth" that competes with both
```

---

# 48. Patterns Derived For Templates

The scenarios suggest reusable target-independent sections.

## Planning stage record

```text
SDS Step / Target Family
Physical Profile:
  Mini | Modular | Full
  # representation only

Target / Scope
Target-Scope Decision

Need / higher-level justification lineage
Trusted Sources
Prior Decisions reused
Prior Decision challenge result

Active RQs
Question-Set Decision

Lens Set
Ideas / Variants
Evaluation findings
Q/R/P
Evidence / Evidence needs
Answer Decision(s)

Residual Q/R/P
Revalidation hooks
Saved alternatives

Output Target owner
Target Projection Conformance result
Downstream handoff
```

## Decision record

```text
Decision ID
Decision Type:
  Target-Scope | Question-Set | Answer

Target
Choice / question
Selected answer
Status
Need / basis
Sources
Rationale
Addresses concerns
Introduced/exposed concerns
Residual Q/R/P
Revalidation hooks
Related WEUC
Affected owners
Supersedes / superseded by
Saved alternatives
```

## WEUC instance record

Expanded in the companion WEUC file.

---

# 49. Scenario Workbook Conclusion

The practical scenarios support the current IDTSPE direction **after** enforcing the SDS target boundaries in this revision.

The main consistency corrections were:

```text
Full SDS
→ physical/addressability profile only

Whole Solution
→ Application Concept
→ selected whole Solution
→ Application Responsibility
  kept as distinct Targets/Decisions

Prototype
→ provisional evidence
≠ Scenario truth

Scenario DATA / Behavior
→ kept technology-neutral
≠ Domain/persistence/implementation

Domain
→ explicitly optional

Application Realization
→ high-level stress evidence before Slice planning when material
≠ generic post-code review

Slice
→ full upstream semantic coverage + implemented/delegated/later/outside
≠ file/task list

Test Design / Practical Plan
→ planned proof
≠ executed Evidence

Step 4
→ executed proof + Coverage + semantic drift + WEUC Evidence
```

They also expose concrete implementation requirements that were too abstract before:

```text
1. Prior-decision revalidation must run before new downstream planning,
   not only after implementation.

2. New Decisions need a post-selection composition review.

3. Material Decisions need durable future revalidation hooks derived from residual Q/R/P.

4. WEUC needs a portfolio-level lifecycle across:
   concept/roadmap hypotheses
   → pre-code concrete instances
   → architecture Decisions
   → post-code path validation
   → actual maintenance Evidence.
```

The exact repository/Tampermonkey implementation remains subject to the explicit consistency gate.
