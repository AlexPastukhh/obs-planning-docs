# Solution Discovery Workflow — Working Command And Question Presets

Status: active selected target-state design  
Repository status: current similarly named commands/workflows are **consistency-audit candidates**, not assumed equivalent.

---

# 1. Desired User Command

Working command phrase:

```text
план решения
```

Desired semantic workflow:

```text
TRIGGER / user situation
↓
resolve/reuse Need / Reality Target
↓
if Need/Reality not trusted:
  run NEED-REALITY IDTSPE
↓
run WHOLE-SOLUTION IDTSPE
↓
compare:
  existing route
  manual/process route
  integration
  custom Application
  hybrid
  defer/no-change
↓
selected whole Solution
```

The workflow must not assume that the answer is an Application.

---

# 2. Command Interaction Contract

Invocation authorizes ChatGPT to:

```text
read relevant Sources
apply saved RQ/Lens presets
generate candidate Ideas
analyze Q/R/P
propose Decisions
```

Invocation does **not** authorize ChatGPT to:

```text
accept its own material Idea as a Decision
mutate repository/code/files
silently change previously accepted planning
invent arbitrary user-interview questions
```

---

# 3. NEED-REALITY-RQ-PRESET-01

This literal preset is intentionally stored.

Default Resolution Questions:

```text
RQ1
Что человек пытается получить в реальности?

RQ2
Как он делает это сейчас?

RQ3
Где именно возникает проблема / friction?

RQ4
Что будет считаться хорошим результатом?

RQ5
Что в рассказе пользователя является Need,
а что уже предположением о Solution?

RQ6
Есть ли важные ограничения / Evidence / неизвестные?
```

These are **Resolution Questions**, not automatically user-facing questions.

ChatGPT first tries to answer them from:

```text
user-provided description
current workflow Sources
existing valid alternative workflows/routes
prior accepted planning
Evidence
constraints
```

---

# 4. Optional Expansion Questions

Only activate when material:

```text
RQ7
Кто именно получает/теряет ценность?

RQ8
Какие существующие способы уже достигают результата,
пусть неудобно/дорого/ненадёжно?

RQ9
Какая часть текущего workflow уже работает нормально
и не должна быть “решена” заново?

RQ10
Какой реальный outcome важнее,
если несколько целей конфликтуют?

RQ11
Какие ограничения делают часть Solution space невозможной?

RQ12
Какое новое Evidence могло бы изменить наше понимание Need/Problem?
```

These are preset RQ candidates.

They are not mandatory output noise.

Question-Set Decision selects the material subset.

---

# 5. User Decision / Question Gate Preset For Need/Reality

User-facing gates are deliberately much smaller than the RQ set.

## GATE-NR-01 — Confirm Target Scope

Use when ChatGPT had to interpret the user narrative into a bounded Need/problem.

Present:

```text
Proposed Target:
  ...

Inside:
  ...

Outside:
  ...
```

Question:

```text
Правильно ли я ограничил текущий Target,
или нужно изменить его границу?
```

Do not ask if the user already explicitly supplied and confirmed the exact scope.

## GATE-NR-02 — Confirm Material Question Set

Use when proceeding depends on accepting the selected RQ set.

Present:

```text
Default preset used:
  RQ1–RQ6

Added:
  ...

Deferred:
  ...
```

Question:

```text
Этот набор вопросов достаточно отражает то,
что мы сейчас хотим выяснить,
или какой-то вопрос нужно добавить/убрать?
```

This can be accepted as a visible bundle.

## GATE-NR-03 — Confirm Need / Problem Framing

After answering the RQs, present the literal proposed Target state.

Question:

```text
Правильно ли зафиксированы Need,
Current Reality и Open Solution Slot
как текущая основа для поиска решения?
```

Only after confirmation may that interpretation become the current accepted planning basis for Whole-Solution Discovery.

---

# 6. User-Only Fact Gate

Not a fixed question.

Trigger only when:

```text
a material fact belongs only to the user
+
Sources cannot answer it
+
different answers change Target/solution space
```

Format:

```text
Нужно одно пользовательское уточнение для <Decision>:
<single concrete question>
Почему это меняет решение:
...
```

Do not transform every uncertainty into a user question.

---

# 7. Activated Methodology Preset — Need/Reality

Default visible activation:

```text
Preset:
  NEED-REALITY-RQ-PRESET-01

Lenses:
  L1 Need / Value / Scope — ACTIVE
  L2 Authority / Source-of-Truth / Reuse — ACTIVE
  L3 Uncertainty / Assumption / Reversibility — CONDITIONAL

Guards:
  User Authority Guard — ACTIVE
  AI Idea Is Proposal Guard — ACTIVE
  Scope / No-Solution-Smuggling Guard — ACTIVE

Validators:
  Need/Reality Target Completeness — ACTIVE
  Source Contract — ACTIVE / proportional
  Decision Persistence — ACTIVE
  Future-Idea Routing — ACTIVE
  Revalidation Readiness — only when residual Q/R/P exists
```

---

# 8. Scope / No-Solution-Smuggling Guard

Prevent:

```text
Trigger:
  "нужна интеграция X"

↓ silently

Need:
  "нужна интеграция X"
```

Guard asks internally:

```text
what desired real-world outcome would make X useful?
what current gap exists?
what other route could produce the same outcome?
```

A proposed Solution can be preserved as:

```text
Idea Source
```

for the next phase.

It cannot define the Need merely by being proposed first.

---

# 9. AI Idea Is Proposal Guard

Whenever ChatGPT generates an out-of-source candidate:

```text
label as Idea / Variant
record Origin = AI_PROPOSAL when durable
state Potential Need / Problem
state material assumptions/Evidence
generate alternatives when useful
evaluate Q/R/P
```

Then:

```text
Idea
→ Decision Gate
→ only explicit accepted choice becomes Decision
```

Out-of-scope AI Ideas route to:

```text
SDS-PLANNING-STATE/ideas/INBOX.md
```

when worth preserving.

---

# 10. Need/Reality Target Completeness Validator

Before GATE-NR-03, check proportional coverage of:

```text
Trigger
Target Scope
Need
Actor/Stakeholder when material
Desired Real-World Outcome
Current Reality
Current Workflow(s) / Existing Routes
Pain / Gap / Pressure
Why It Matters
Evidence
Constraints
Success Meaning
Boundaries / Non-Goals
Open Solution Slot(s) when useful
selected RQ answers
material Q/R/P
Sources for next Whole-Solution phase
Future Ideas routed out
```

Not every field needs prose if it is immaterial.

The validator must fail if the “Target” is only:

```text
a feature request
an app idea
an architecture proposal
```

without the underlying Need/Reality.

---

# 11. Handoff To Whole-Solution Discovery

Accepted Need/Reality becomes Source:

```text
Need / desired outcome
Current Reality
Current workflows / valid existing routes
Pain/gap
Success Meaning
Constraints
Evidence
Open Solution Slot
material Q/R/P
preserved proposed Solutions / Ideas
```

The next phase should **not rederive these from scratch**.

It should consume them and generate/compare solution Ideas.
