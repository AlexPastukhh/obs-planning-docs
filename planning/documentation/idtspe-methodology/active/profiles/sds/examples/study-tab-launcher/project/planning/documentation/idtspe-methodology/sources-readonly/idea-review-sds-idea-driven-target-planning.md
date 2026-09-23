# Idea Review — Idea-Driven Target Planning over SDS

Status: reviewed planning capture  
Mode: **INTEGRATE** — уточнение текущей методологии `собери идеи` и SDS-планирования без изменения репозитория  
Target: reusable модель `собери идеи + <planning target>` и dependency-preserving SDS planning

## 1. Source / New Input

Новые идеи, зафиксированные в обсуждении:

1. `собери идеи + X` — это не самостоятельный workflow сущности `X` и не команда показа текущей документации.
2. `собери идеи + X` — reusable Idea Review shell над конкретным planning target:
   - новые Ideas;
   - canonical dependency context target-а;
   - Current Target, если он уже существует;
   - practical evidence, если оно существует;
   - Q/R/P / Concern Groups / Decisions;
   - целевой результат документации после принятия выбранных идей.
3. Нужны два режима idea-driven target planning:
   - **CREATE** — target ещё не существует, он создаётся из новых идей + upstream sources;
   - **INTEGRATE** — target уже существует, новые идеи интегрируются в Current Target с сохранением корректной старой части.
4. CREATE и INTEGRATE должны использовать один reusable алгоритм и один source of truth; различается только baseline.
5. Отдельно нужны read-only команды **SHOW CURRENT**:
   - показать текущий Scenario;
   - показать текущий Domain;
   - показать текущий Slice;
   - показать текущую Slice Strategy;
   которые просто читают canonical current owners и отображают их по canonical template/workflow, ничего не интегрируя.
6. SDS должен оставаться направленным dependency pipeline:
   `Real-Life Need/Scenario → Application Scenario → Behavior Items + DATA → Domain → Slice → Implementation/Test Evidence`.
7. Downstream planning обязан использовать сущности предыдущих слоёв как canonical sources, а не реконструировать их заново.
8. Linked Notes должен помогать хранить dependency graph и навигацию между semantic owners, но не становиться semantic authority.
9. WEUC / Workspace Use Cases должны влиять на архитектурную и Slice-realization форму через частоту/стоимость изменений codebase, но не владеть Application behavior.
10. Deadlines / milestones / capacity должны влиять на delivery decomposition и ordering, но не переписывать semantic truth.
11. Для INTEGRATE дополнительно учитываются:
    - предыдущая версия target-а;
    - опыт эксплуатации/реализации;
    - test/implementation/operational evidence;
    - сохранение всего старого meaning, которое не было опровергнуто или заменено.

---

## 2. Core Reusable Model

### 2.1 Idea-driven target planning

```text
NEW IDEAS
+
TARGET DEPENDENCY CONTEXT
+
CURRENT TARGET, if INTEGRATE
+
PRACTICAL EVIDENCE, if available
↓
IDEA REVIEW
↓
Q / R / P / Concern Groups
↓
Variants / refinements
↓
Decisions, only when actually selected
↓
PROJECTED TARGET STATE
↓
Delta From Current, if INTEGRATE
↓
durable Q/R/P + Decision provenance
↓
handoffs / next actions
```

Центральный результат `собери идеи + X` — не список идей, а **полное projected target state**: как canonical документация `X` должна выглядеть после принятия выбранного meaning.

### 2.2 CREATE vs INTEGRATE

#### CREATE

```text
baseline = no current target instance

New Ideas
+ upstream semantic sources
+ target canonical workflow/template
+ constraints
↓
Projected Initial Target State
+
Q/R/P
+
Decisions
```

#### INTEGRATE

```text
baseline = canonical Current Target

New Ideas
+ Current Target
+ same upstream semantic sources
+ practical evidence
+ constraints
↓
Projected Updated Target State
+
Delta From Current
+
updated/new Q/R/P
+
Decisions
```

Разница между CREATE и INTEGRATE минимальна: **наличие baseline и необходимость preservation/delta analysis**.

---

## 3. Reusable Ownership Boundaries

### Idea methodology owns

- extraction/review of new Ideas;
- distinction between Idea / fact / constraint / existing Decision;
- variants and refinements;
- CREATE vs INTEGRATE orchestration;
- provisional integration of selected Idea meaning;
- projected-target-state process;
- preservation of Idea provenance where useful.

### Planning Concerns model owns

- Question / Risk / Problem;
- Concern Groups;
- status / priority / category;
- durable unresolved concern state;
- AI comments attached to concerns where methodology allows.

### Decision model owns

- actually selected choices;
- rationale;
- provenance;
- supersession/replacement relation when a later Decision changes an earlier one.

### Target-specific owners own semantic validity

- Scenario workflow/template owns valid Scenario state;
- Domain workflow/template owns valid Domain state;
- Slice workflow/template owns valid Slice state;
- Slice Strategy workflow/template owns valid Slice Strategy state.

**Idea shell never becomes a second semantic authority over the target.**

---

## 4. SHOW / CREATE / INTEGRATE / PLAN

Four operations must remain distinct.

### SHOW CURRENT

```text
Current canonical owner(s)
→ resolve all current files belonging to selected target
→ render current semantic state using canonical template/workflow
→ show gaps only when provable
```

No new Ideas.  
No projected changes.  
No new Q/R/P merely because the command was invoked.

Example commands:

- `покажи текущий сценарий`
- `покажи текущий домен`
- `покажи текущий слайс`
- `покажи текущую стратегию слайсов`

### CREATE FROM IDEAS

```text
New Ideas
+ target dependency context
→ create initial target
→ Q/R/P + Decisions
```

Example commands:

- `собери идеи нового сценария`
- `собери идеи нового домена`
- `собери идеи нового слайса`
- `собери идеи новой стратегии слайсов`

### INTEGRATE IDEAS

```text
New Ideas
+ Current Target
+ target dependency context
→ updated target
→ Delta
→ Q/R/P + Decisions
```

Example commands:

- `собери идеи сценария`
- `собери идеи домена`
- `собери идеи слайса`
- `собери идеи стратегии слайсов`

### PLAN X

Direct planning without requiring a new Idea source:

```text
upstream evidence
+ Current X when any
+ planning reasoning
→ Target X
```

Existing `план сценария / домена / слайса / стратегии слайсов` remain conceptually separate from `собери идеи`.

---

## 5. Directed SDS Dependency Model

The methodology must preserve this direction:

```text
REAL-LIFE NEED / CURRENT REALITY / REAL-LIFE SCENARIOS
↓
APPLICATION RESPONSIBILITY / CONCEPT
↓
APPLICATION SCENARIOS
↓
BEHAVIOR ITEMS + DATA OBJECTS
↓
REQUIREMENTS / SCREENS when material
↓
DOMAIN DISCOVERY
  repeated behavior/data/rules
  → domain candidates
↓
CANONICAL DOMAIN
  Entities
  Value Objects
  Aggregates / Aggregate Roots
  invariants
  policies
  lifecycle
  ownership / references
↓
SLICE STRATEGY
↓
INDEPENDENT, DELIVERABLE, TESTABLE SLICES
↓
IMPLEMENTATION / PRACTICAL TEST EVIDENCE
↓
explicit feedback/correction upstream only when evidence requires it
```

### Dependency-preservation invariant

```text
do not copy upstream semantic authority
→ link to canonical owner

do not infer downstream meaning from scratch
→ consume current upstream owners

do not silently rewrite upstream meaning
→ raise Q/R/P or explicit correction/Decision

do not discard earlier accepted work
→ preserve unchanged target meaning

do not let implementation evidence silently redefine semantics
→ feed it back through explicit correction
```

---

## 6. Target Dependency Context

The target-specific workflow owns which sources must be resolved before planning the target.

General model:

```text
TARGET
← semantic sources
← constraints
← architecture/workspace-evolution evidence
← delivery constraints
← Current Target, if INTEGRATE
← practical evidence, if available
← New Ideas
```

The Idea shell does not hard-code every target's dependencies.  
It asks the target owner for its dependency context and then performs Idea Review + integration.

---

## 7. Slice Dependency Context

For Slice planning, the dependency context should include, when material:

### Semantic sources

1. Application Scenario(s)
2. Covered Behavior Items
3. DATA Objects used/produced by those behaviors
4. Requirements
5. Screens / spatial interaction meaning
6. Canonical Domain:
   - Entities;
   - Value Objects;
   - Aggregates / Roots;
   - invariants;
   - policies;
   - lifecycle;
   - ownership/reference boundaries.

### Realization / architecture sources

7. Existing architecture decisions/evidence
8. Workspace Use Cases / WEUC map
9. Change Axes / Change Pressure
10. recurring codebase operations and expected maintenance/evolution work

### Delivery constraints

11. deadlines
12. milestones
13. ordering constraints
14. external dependencies
15. implementation capacity

### Idea source

16. New Ideas

### INTEGRATE-only baseline/evidence

17. Current Slice
18. previous implementation/release behavior
19. test evidence
20. operational evidence
21. observed development/change cost

---

## 8. Slice CREATE Result

```text
Scenario(s)
+ Behavior Items
+ DATA
+ Requirements
+ Domain
+ WEUC / architecture context
+ delivery constraints
+ New Ideas
↓
Slice candidates
↓
boundary comparison
↓
independently valuable / deliverable / testable Slice selection
↓
Projected Slice Target
```

Projected Slice Target should expose at least:

- Slice identity/status;
- deliverable/checkable result;
- Covered Scenarios;
- Covered Behavior Items;
- Requirements implemented;
- Requirements constraining implementation;
- Relevant Domain owners/invariants;
- Screens when material;
- vertical boundary;
- behavior implemented here;
- behavior delegated;
- behavior deferred to later Slice;
- explicitly outside behavior;
- dependencies/handoffs;
- integrated implementation meaning;
- architecture implications;
- verification target;
- positive proof obligations;
- negative/no-mutation guarantees;
- Q/R/P;
- Decisions;
- Architecture/Testing handoffs.

---

## 9. Slice INTEGRATE Result

The same upstream sources remain relevant, plus Current Slice and practical evidence.

```text
Current Slice
+ current upstream canonical truth
+ practical evidence
+ New Ideas
↓
determine what remains valid
↓
determine what must change
↓
Projected Updated Slice
↓
Delta From Current
↓
Q/R/P + Decisions
```

### Preservation rule

Existing target meaning remains unless at least one material reason exists:

- upstream semantic source changed;
- accepted new Idea contradicts/replaces it;
- practical evidence disproved it;
- Current Target conflicts with canonical owners;
- new Requirement/constraint invalidates it;
- explicit Decision replaces it.

**INTEGRATE must not rewrite the whole target merely because a new idea appeared.**

---

## 10. WEUC / Workspace Evolution Boundary

WEUC answers:

> Which codebase/workspace operations will developers repeatedly perform, and what architecture makes those operations cheaper, safer and more local?

It does **not** answer:

> What must the Application do for the user?

Correct dependency:

```text
Application Scenario / Behavior / Domain
→ behavioral/product truth

WEUC / Workspace Uses / Change Pressure
→ evolution/work-cost truth

both
→ architecture / Slice realization choice
```

Example:

```text
Two Slice realizations satisfy the same Behavior Items.

Variant A:
  adding a provider requires editing 7 owners

Variant B:
  recurring WEUC "add provider" touches 2 stable owners

→ WEUC evidence can justify Variant B
→ but it cannot redefine the Behavior Items
```

---

## 11. Deadline / Plan Boundary

Delivery constraints may change:

- Slice split;
- ordering;
- milestone allocation;
- delegation;
- later-Slice coverage.

They must not silently change semantic requirements.

```text
BI-7 still required
+ deadline prevents current delivery
→ BI-7 coverage = later Slice
```

Not:

```text
deadline is short
→ BI-7 no longer exists
```

A true removal/change of behavior requires the corresponding semantic Decision/correction upstream.

---

## 12. Linked Notes / Dependency Graph

Linked Notes should be a navigation/projection mechanism over canonical owners, not a semantic owner.

Example graph:

```text
SL-06
├─ realizes → SCN-ProvideCurrentChange
├─ covers → BI-14
├─ covers → BI-15
├─ uses-data → DATA-ReviewDiff
├─ constrained-by → REQ-23
├─ governed-by → AGG-ChatHandoff
├─ depends-on → SL-05
├─ informed-by → WEUC-AddDeliveryMechanism
└─ verified-by → TP-SL06
```

Useful relation classes:

### DERIVED FROM
- Scenario ← Real-Life Scenario
- Behavior Item ← Scenario
- Domain candidate ← Behavior/DATA
- Slice ← Scenario/Behavior/Domain

### COVERS / REALIZES
- Slice → Scenario
- Slice → Behavior Item
- Test → Behavior Item
- implementation → Slice

### USES
- Behavior → DATA
- Slice → Domain owner

### CONSTRAINED BY
- Requirement
- deadline
- operational constraint

### DEPENDS ON
- Slice → Slice
- implementation component → component

### INFORMED BY
- Slice/Architecture → WEUC
- target → practical evidence

### VERIFIED BY
- Scenario/Behavior/Slice → Test Design / Practical Test

### SUPERSEDES / REPLACES
- explicit replacement of prior semantic/decision state

---

## 13. Standard Output Contract for `собери идеи + Target`

```text
## Source / New Input

## Target Mode
CREATE | INTEGRATE

## Target Dependency Context
canonical sources actually used

## Current Target
none for CREATE
actual canonical current state for INTEGRATE

## Reviewed Ideas

## Planning Concerns
Q / R / P / Concern Groups

## Decisions
only actually selected Decisions

## Projected Target State
complete target representation according to its canonical workflow/template

## Delta From Current
INTEGRATE only

## Preserved Existing Meaning
INTEGRATE only; material old meaning intentionally retained

## Rejected / Deferred / Carry-Forward Ideas

## Architecture / Testing / Other Handoffs

## Next Actions
only actions allowed by the Idea Review shell / current command route
```

---

## 14. Reviewed Ideas

### IDEA-01 — One reusable Idea-driven Target-State Planning algorithm

**Conclusion:** accept.

CREATE and INTEGRATE should not grow into separate methodologies. They share Idea Review, Q/R/P/Decision processing, target dependency resolution and projected target construction.

### IDEA-02 — Baseline is the key distinction between CREATE and INTEGRATE

**Conclusion:** accept.

- CREATE: no current target.
- INTEGRATE: canonical Current Target exists and must be preserved where still valid.

### IDEA-03 — Projected Target State is the main result

**Conclusion:** accept.

A list of ideas/recommendations is insufficient for `собери идеи + X`. The command should show what the target documentation would become if the selected ideas were accepted.

### IDEA-04 — Target workflow/template remains semantic authority

**Conclusion:** accept.

The Idea shell orchestrates integration. It does not define what a valid Scenario/Domain/Slice looks like.

### IDEA-05 — Explicit Target Dependency Context per planning layer

**Conclusion:** accept.

Scenario, Domain and Slice workflows should own their canonical source/dependency sets so downstream planning consumes upstream truth rather than re-deriving it.

### IDEA-06 — Preserve directed SDS flow

**Conclusion:** accept.

Real-Life → Scenario → Behavior/DATA → Domain → Slice → implementation/testing evidence must remain the default derivation direction.

### IDEA-07 — Separate SHOW CURRENT commands

**Conclusion:** accept.

Read/projection of current canonical documentation is independently useful and should not require Idea Review.

### IDEA-08 — WEUC is architecture/evolution evidence, not behavior authority

**Conclusion:** accept.

WEUC materially affects suitable Slice/architecture realization because repeated codebase actions affect architecture work cost, but Scenario/Behavior remain Application truth.

### IDEA-09 — Explicit preservation rule for INTEGRATE

**Conclusion:** accept.

Existing correct target meaning should survive integration unless evidence/accepted meaning actually requires replacement.

### IDEA-10 — Linked Notes should project typed dependencies

**Conclusion:** accept conceptually.

Typed links can preserve source-of-truth boundaries and support impact navigation. Exact relation vocabulary/tool representation still needs design review before repository implementation.

---

## 15. Planning Concerns

### CG-01 — Avoid duplicated semantic truth

**P-01 — Downstream planning can silently recreate upstream meaning.**  
Type: Problem  
Priority: P1  
Status: open until dependency contracts are explicit.

Mitigation direction:
- canonical links/references;
- target-specific Dependency Context;
- typed dependency projection;
- no duplicated full semantic bodies.

### CG-02 — Idea shell vs target authority

**R-02 — `собери идеи X` can drift into a second Scenario/Domain/Slice methodology.**  
Type: Risk  
Priority: P1

Mitigation:
- Idea workflow owns orchestration only;
- target workflow/template owns semantic validity;
- Projected Target State must be validated against target owner.

### CG-03 — CREATE vs INTEGRATE ambiguity

**Q-03 — How is target absence/existence resolved deterministically?**  
Type: Question  
Priority: P1

Likely rule:
- explicit "нового X" → CREATE;
- explicit selected current X → INTEGRATE;
- generic `собери идеи X` should prefer current selected X when unambiguous;
- do not silently overwrite an existing canonical target by treating the operation as CREATE.

### CG-04 — Persistence of Q/R/P and Decisions

**P-04 — Concern/Decision provenance may disappear after Idea meaning is incorporated into the target.**  
Type: Problem  
Priority: P1

Required invariant:
- incorporated Idea text may cease to be separately operationally relevant;
- unresolved/material Q/R/P remains;
- Decisions and rationale remain as durable provenance.

### CG-05 — Linked Notes relation model

**Q-05 — Which typed dependency relations belong in reusable methodology vs Linked Notes implementation?**  
Type: Question  
Priority: P2

The semantic relation meanings should be owned outside the tool. Linked Notes should project/navigate them.

### CG-06 — Practical evidence correction boundary

**R-06 — Implementation/test evidence may be mistaken for authority to rewrite upstream semantics directly.**  
Type: Risk  
Priority: P1

Required rule:
- evidence can trigger upstream correction;
- correction must pass through the canonical upstream owner and become explicit target/Decision change.

---

## 16. Decisions / Current Conclusions

### D-01 — Treat `собери идеи + Target` as Idea-driven Target-State Planning

Selected.

The operation combines:
- new Ideas;
- canonical target dependencies;
- Current Target when present;
- Q/R/P/Decisions;
- projected complete target state.

### D-02 — Use CREATE and INTEGRATE as modes of the same reusable algorithm

Selected.

No separate full methodologies unless later evidence proves materially different processing.

### D-03 — Keep target-specific semantic shape in target owners

Selected.

Scenario/Domain/Slice templates/workflows remain source of truth for valid target state.

### D-04 — Preserve directed SDS dependencies and reuse upstream entities

Selected.

Downstream layers consume prior canonical results by reference/link rather than recreating them.

### D-05 — Add conceptually separate SHOW CURRENT capability

Selected at methodology level.

Exact command IDs/names and UC placement still need command-planning review.

### D-06 — Treat WEUC as realization/architecture input

Selected.

WEUC affects architecture work-cost and Slice realization, not Application behavior ownership.

### D-07 — Preserve valid existing meaning during INTEGRATE

Selected.

Integration is delta-oriented, not rewrite-by-default.

### D-08 — Preserve durable Q/R/P and Decisions after integration

Selected.

Target state and planning concern/decision state are separate but coordinated outputs.

---

## 17. Projected Methodology Target State

The desired methodology should support this reusable architecture:

```text
                    ┌──────────────────────┐
                    │      NEW IDEAS       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  IDEA REVIEW SHELL   │
                    │ variants / QRP /     │
                    │ Decisions / evidence │
                    └──────────┬───────────┘
                               │
                  resolve target mode + dependencies
                               │
          ┌────────────────────┴─────────────────────┐
          │                                          │
          ▼                                          ▼
       CREATE                                     INTEGRATE
 current target = none                     current canonical target
          │                                          │
          └────────────────────┬─────────────────────┘
                               ▼
                 TARGET-SPECIFIC CANONICAL OWNER
                 Scenario / Domain / Slice / ...
                               │
                               ▼
                   PROJECTED TARGET STATE
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
        durable Q/R/P                  durable Decisions
                │                             │
                └──────────────┬──────────────┘
                               ▼
                     handoffs / next actions
```

And the target dependency direction remains:

```text
Real-Life Need / Reality
↓
Real-Life Scenario
↓
Application Scenario
↓
Behavior Items + DATA Objects
↓
Requirements / Screens
↓
Domain Candidates
↓
Canonical Domain
↓
Slice Strategy
↓
Independent/Testable Slices
↓
Implementation + Test Evidence
↓
explicit correction feedback when required
```

`собери идеи` is a reusable horizontal planning shell across this vertical SDS pipeline.  
It must not become a parallel ontology or duplicate the semantic owners of the layer it integrates into.

---

## 18. Next Methodology Work

Before repository implementation, the next planning pass should resolve:

1. exact reusable owner for Idea-driven Target-State Planning;
2. whether CREATE/INTEGRATE are explicit command metadata or resolved by command identity;
3. exact `SHOW CURRENT` Use Cases and command names;
4. target Dependency Context contracts for Scenario, Domain, Slice and Slice Strategy;
5. preservation/delta representation contract for INTEGRATE;
6. durable Q/R/P + Decision persistence/provenance rules;
7. typed dependency relation vocabulary independent of Linked Notes implementation;
8. command-family mapping:
   - SHOW;
   - CREATE FROM IDEAS;
   - INTEGRATE IDEAS;
   - PLAN;
9. tests proving that downstream target planning references upstream owners instead of duplicating their semantic bodies.

No repository update, Pre-Update, package, commit or push is implied by this capture.
