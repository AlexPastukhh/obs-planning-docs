# Real-Life Solution Scenario Discovery And Whole-Solution Composition

Status: active generic target-state design  
Role: detailed Phase 02 model under the `план решения` workflow.

---

# 1. Phase 02 Is Iterative

Phase 02 is not assumed to be one IDTSPE instance.

Typical topology:

```text
accepted NEED / REALITY
↓
Solution Scenario / Scope Discovery
↓
RLS-01 ─┐
RLS-02 ─┼─ possibly parallel / iterative
RLS-03 ─┘
↓
enough scenario-level route Decisions?
↓
Whole-Solution Composition IDTSPE
↓
selected composition
↓
does selected composition require own Application?
  no
    → Application phases can be skipped
  yes
    → precise Application contribution/touchpoint becomes Source for Phase 03
```

---

# 2. Target Type A — REAL_LIFE_SOLUTION_SCENARIO

Working meaning:

```text
one bounded real-world situation/scope
in which an actor tries to obtain part of the accepted Need/outcome,
and where alternative routes for obtaining that result can be compared.
```

Literal target shape:

```text
REAL-LIFE SOLUTION SCENARIO TARGET

Identity
Status
Target Type
Need Source

Scenario / Scope
Actor(s)
Starting Situation
Desired Result In This Scope

Current Route(s)
  what already works
  friction / gap

Solution Slot(s)

Candidate Routes / Ideas
  manual
  process
  existing capability
  integration
  custom software
  hybrid
  no-change/defer

Evidence / Constraints

Selected Route Decision(s)

Residual Q/R/P

Target Relations
  PART_OF / PARALLEL_WITH / PRECEDES / HANDOFF_TO / ...

Sources For Later Composition
```

---

# 3. Target Type B — WHOLE_SOLUTION_COMPOSITION

Run only after enough material scenario/scope instances are resolved to compose a credible end-to-end answer.

Literal shape:

```text
WHOLE-SOLUTION COMPOSITION TARGET

Identity
Status

Need Source

Included RLS Targets
  accepted outputs as Sources

Deferred / Unresolved RLS Targets

Selected Route Per Scope

Cross-Scope Handoffs
Responsibility Boundaries
Duplicated / Conflicting Responsibility Check
Coverage Of Desired Outcome

Whole-Solution Variants
  when more than one composition remains plausible

Selected Whole-Solution Decision

Application Need / Touchpoint Candidate(s)
  only if own software is actually justified

Residual Q/R/P
Revalidation Hooks

Sources For Next Phase
```

---

# 4. Phase 01 Inputs Are Explicit Sources

Phase 02 must consume, not rediscover by default:

```text
accepted Need
Desired Outcome
Current Reality
Current Workflow(s)
Existing valid-but-unsatisfactory routes
Pain / Gap / Pressure
Success Meaning
Evidence
Constraints
Open Solution Slot
material Q/R/P
carry-over Solution Ideas
```

These are Source-of-Truth / evidence inputs.

Phase 02 may challenge them only when new Evidence exposes a concrete problem.

---

# 5. Solution Scenario Discovery RQ Preset

Literal preset:

```text
RQ-SD1
В каких реальных ситуациях / контекстах
человек пытается получить принятый Desired Outcome
или значимую его часть?

RQ-SD2
Какой самостоятельный результат должен быть получен
в каждой такой ситуации?

RQ-SD3
Какие текущие маршруты уже полностью или частично
дают этот результат?

RQ-SD4
Где именно в каждом маршруте находится gap / friction / Solution Slot?

RQ-SD5
Какие области можно решать независимо
и поэтому они заслуживают отдельных Target Instances?

RQ-SD6
Какие области являются частями одного потока,
какие идут параллельно,
а какие являются альтернативными scope-границами?
```

These RQs primarily discover the scenario/target portfolio.

---

# 6. Per-RLS Route Evaluation RQ Preset

For each material `REAL_LIFE_SOLUTION_SCENARIO`:

```text
RQ-RLS1
Какой результат должен быть получен в этом конкретном scope?

RQ-RLS2
Какие текущие маршруты уже существуют?

RQ-RLS3
Что в текущих маршрутах надо сохранить / переиспользовать?

RQ-RLS4
Какие Solution Ideas реально могут закрыть этот Solution Slot?

RQ-RLS5
Можно ли получить результат без нового software/Application?

RQ-RLS6
Какая Idea/route лучше всего удовлетворяет Need
с учетом Evidence, constraints, friction и стоимости изменения?

RQ-RLS7
Какие предположения / Q/R/P остаются?

RQ-RLS8
Как выбранный route связан с соседними RLS Targets
и не создаёт ли конфликт/дублирование ответственности?
```

---

# 7. Whole-Solution Composition RQ Preset

```text
RQ-C1
Покрывают ли выбранные routes все material RLS scopes
и общий Desired Outcome?

RQ-C2
Есть ли между routes разрывы handoff,
дублирование ответственности или противоречия?

RQ-C3
Можно ли упростить композицию,
переиспользовав один существующий route/capability
в нескольких scopes?

RQ-C4
Какие Whole-Solution variants остаются правдоподобными?

RQ-C5
Требуется ли вообще собственное Application?

RQ-C6
Если да:
в каком конкретном Solution Slot / RLS scope
и для какой задачи/задач оно нужно?

RQ-C7
Какие части whole solution остаются у:
  человека
  процесса
  существующих инструментов
  внешних систем
  собственного Application?

RQ-C8
Какие residual Q/R/P и revalidation hooks остаются?
```

---

# 8. Parallel IDTSPE Instances

Valid:

```text
NEED-01
  ↓ shared Source

RLS-01
RLS-02
RLS-03
```

All three may use the same:

```text
Need
Success Meaning
Constraints
Current Reality
```

Do not turn:

```text
RLS-01 PARALLEL_WITH RLS-02
```

into a Source relation.

Use:

```text
Target Relation
```

for topology.

Only an accepted output that actually constrains another Target becomes a Source.

---

# 9. Activated Methodology

## Lenses

```text
L1 Need / Value / Scope — ACTIVE
L2 Authority / Source-of-Truth / Reuse — ACTIVE
L3 Uncertainty / Assumption / Reversibility — ACTIVE / proportional
```

Specialized lenses can be added by the concrete RLS.

Workspace/WEUC Lens is not automatically active merely because software is one Idea.

## Guards

```text
User Authority Guard
AI Idea Is Proposal Guard
No-Solution-Smuggling Guard
Premature Application Guard
Scope Isolation Guard
```

### Premature Application Guard

Prevents:

```text
one plausible software Idea
→ "we need an Application"
```

Own Application becomes selected only after:

```text
a bounded RLS Solution Slot
+
alternatives
+
evidence/constraints
+
route evaluation
+
accepted route Decision
+
whole-solution composition
```

justify it.

### Scope Isolation Guard

Prevents one RLS Target from absorbing unrelated later scopes merely because the same tool could theoretically serve them.

Out-of-scope Ideas route to the current SDS run's carry-over Ideas owner.

---

# 10. Validators

```text
Source Contract Validator
Decision Persistence Validator
Carry-Over Idea Routing Validator
Target Relation / Source Separation Validator
RLS Target Completeness Validator
Whole-Solution Coverage / Composition Validator
Revalidation Readiness Validator — conditional
```

---

# 11. User Interaction

The same intake rule applies:

```text
one user message
may accept:
  scenario portfolio
  scope Decisions
  Question Sets
  route Decisions
  constraints
```

Do not create one confirmation turn per RLS.

At the end of an iteration show:

```text
RESOLVED TARGETS
ACTIVE / PARALLEL TARGETS
UNRESOLVED DECISIONS
UNANSWERED MATERIAL QUESTIONS
DEFERRED TARGETS
```

The user can resolve several items in one message.

---

# 12. Valid Phase 02 Outcomes

## Outcome A — No Application

```text
Need
→ existing/process/manual/integration composition
→ accepted whole solution
→ Application phases skipped
```

## Outcome B — Application in one bounded slot

```text
RLS-01
→ existing route

RLS-02
→ own software selected

RLS-03
→ external system/manual route

Whole Solution
→ own Application is justified only for RLS-02 task(s)
```

## Outcome C — Application spans several related slots

Only if the composition proves one coherent Application contribution across those scopes.

Phase 03 then defines Concept/Responsibility.

## Outcome D — Not enough evidence

Keep RLS/Whole-Solution Decision unresolved and plan targeted research/prototype rather than inventing certainty.

---

# 13. Exit To Phase 03

Only when:

```text
whole Solution composition is accepted
+
own Application is part of that composition
```

Handoff:

```text
accepted Need
selected RLS targets
selected route per relevant scope
whole-solution composition
exact Application touchpoint(s)
tasks/results own software is expected to provide
what remains outside Application
Evidence
constraints
residual Q/R/P
```

This is enough for:

```text
Application Concept
→ Application Responsibility
```

without pretending Phase 02 already owns those semantics.
