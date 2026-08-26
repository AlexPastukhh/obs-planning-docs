# Phase 01 — Need / Reality / Real-World Problem — Research Capture Worked Example

Status: active worked example  
SDS workflow owner: `active/profiles/sds/workflow/01-need-reality-real-world-problem.md`

---

# 1. User Entry

The user invokes the Solution Discovery workflow.

```text
план решения

Я читаю много статей и постоянно теряю полезные фрагменты.
Хочу во время чтения быстро сохранить сам фрагмент,
URL/название страницы и короткую свою заметку,
а потом вернуться к чтению.

Не начинай сразу с приложения и архитектуры.
```

Command semantics desired:

```text
resolve/reuse Need/Reality
→ then Whole-Solution Discovery
```

The command does not select an Application.

---

# 2. Activated Methodology Shown To User

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
  Need/Reality Target Completeness
  Source Contract
  Decision Persistence
  Future-Idea Routing
  Revalidation Readiness — if residual concerns remain
```

This is shown as methodology activation, not as six different “Lenses”.

---

# 3. Target-Scope Proposal

ChatGPT must first show the literal Target it proposes.

```text
PROPOSED TARGET-SCOPE DECISION
TS-RC-NEED-01

Target:
  understand and establish the real-world problem
  of preserving useful research material during reading
  without prematurely choosing a software Solution

Inside:
  desired real-world outcome
  current ways of preserving material
  friction/loss
  success meaning
  constraints/evidence
  Need vs already-proposed Solution ideas
  Open Solution Slot

Outside:
  browser-extension selection
  Application architecture
  Domain
  Slice
  exporter design
```

This is a proposed Decision.

It is not accepted merely because ChatGPT wrote it.

## User Decision Gate

ChatGPT asks the saved gate only after showing the proposal:

```text
Правильно ли я ограничил текущий Target,
или нужно изменить его границу?
```

Assume user answers:

```text
Да, этот скоуп подходит.
```

Now:

```text
TS-RC-NEED-01
Status: SELECTED
```

---

# 4. Sources Available

## User Source

The initial description.

## Current Workflow Source — reconstructed from user statement

```text
Current Workflow A — generic notes

read article
→ notice useful fragment
→ decide to preserve it
→ switch to notes app
→ create/find note
→ copy fragment
→ copy URL/title separately
→ optionally add comment
→ return to article
```

This reconstruction is a **proposed interpretation of current reality**, not an invented solution.

If materially uncertain, the user gate can ask for correction.

## Possible Existing Valid Route Source

Suppose the user additionally says:

```text
Иногда я пользуюсь браузерным "send to notes";
оно сохраняет страницу, но не тот фрагмент и не мою мысль.
```

Then:

```text
Current Workflow B — browser send-to-notes

works for:
  preserving a page

does not fully produce:
  selected fragment + source context + short thought
```

This is useful Source for both Phase 01 and Phase 02.

It is not discarded just because it is inconvenient.

## Proposed Solution Idea Already Present

The phrase:

```text
"быстро сохранить"
```

does not itself imply browser extension.

If ChatGPT thinks:

```text
"maybe browser extension"
```

that is:

```text
Idea
Origin: AI_PROPOSAL
Status: UNSELECTED
```

It belongs to Phase 02, not the Need definition.

---

# 5. Question-Set Proposal

ChatGPT activates the saved literal preset.

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

Additional candidate:

```text
RQ8
Какие существующие способы уже достигают результата,
пусть неудобно/дорого/ненадёжно?
```

Here RQ8 is material because Current Workflow B partially works.

Proposed:

```text
QS-RC-NEED-01

Selected:
  RQ1 RQ2 RQ3 RQ4 RQ5 RQ6 RQ8

Deferred:
  RQ7 actor segmentation — one actor currently
  RQ10 conflicting outcomes — no conflict yet
```

## User Decision Gate

```text
Этот набор вопросов достаточно отражает то,
что мы сейчас хотим выяснить,
или какой-то вопрос нужно добавить/убрать?
```

Assume:

```text
Оставь так.
```

Now the Question-Set Decision is selected.

---

# 6. Lens-By-Lens Work

## L1 — Need / Value / Scope

### RQ1 — Desired real-world outcome

Proposed answer:

```text
The person wants useful research material
to remain reliably available for later use
while preserving continuity of the current reading activity.
```

### RQ2 — Current workflow

Current workflows A/B above.

### RQ3 — Friction

```text
Workflow A:
  context switch
  several manual copy operations
  destination/organization decision during reading
  source context can be lost
  capture is often skipped

Workflow B:
  lower manual effort
  but captures the page rather than the precise fragment/thought
```

### RQ4 — Success Meaning

Candidate:

```text
When the actor decides something is worth preserving:
  the intended material + enough source context is retained reliably,
  optional short thought can be captured,
  and the actor can return to reading without doing long-term organization.
```

No fake “must take <2 seconds” requirement is invented.

### Open Solution Slot

```text
OPEN SOLUTION SLOT

Between:
  "this fragment is worth preserving"

and:
  "resume reading"

the workflow needs a reliable low-friction preservation step
for:
  selected material
  source context
  optional short personal thought

without requiring long-term organization at that moment.
```

---

## L2 — Authority / Source-of-Truth / Reuse

Greenfield fixture:

```text
no prior accepted project Need owner
```

But existing workflows A/B are preserved as reality Sources.

Result:

```text
do not “replace” the parts of Workflow B that already work
without comparing them in Phase 02.
```

---

## L3 — Uncertainty / Assumption / Reversibility

Potential material unknown:

```text
Q-RC-NEED-01:
  is the interruption/loss frequent enough
  that improving the workflow is materially valuable?
```

Suppose user already said:

```text
"постоянно теряю"
```

This is qualitative Evidence.

No additional interview is required unless value/priority remains genuinely ambiguous.

Another unknown:

```text
Does every capture need source title?
```

At this phase it is not material enough to block Need framing.

Do not ask the user automatically.

Carry it later only if Scenario/Data planning needs it.

---

# 7. Need vs Solution Separation

Proposed current Need:

```text
NEED
Preserve useful research material reliably
without materially disrupting reading,
so it can be used later.
```

Current proposed/possible Solutions:

```text
existing generic notes workflow
existing browser send-to-notes route
AI-proposed browser extension
other integration
custom capture application
manual process improvement
```

All Solution variants remain unselected.

---

# 8. AI Idea Example

ChatGPT thinks:

```text
Maybe a browser extension popup
could capture selected text + URL + short note.
```

Correct treatment:

```text
Idea ID:
  IDEA-RC-FUT-001

Origin:
  AI_PROPOSAL

Potential Need:
  reduce capture friction in the Open Solution Slot

Idea:
  browser-extension capture surface

Status:
  UNSELECTED

Alternatives:
  existing browser integration
  system share action
  local keyboard shortcut/tool
  process improvement

Q:
  browser/platform feasibility

R:
  custom software may add maintenance
```

Because this Idea clearly belongs to the **next Whole-Solution phase**, it can be handed directly as an Idea Source to Phase 02.

It need not go into the global Future Ideas Inbox.

---

# 9. Future / Unknown-Stage Idea Example

During analysis ChatGPT notices:

```text
Maybe later automatically summarize captured fragments.
```

This does not help the current Need/Reality Target and may not even belong to the selected future Application.

Correct treatment:

```text
do not discuss deeply here

if worth preserving:
  SDS-PLANNING-STATE/ideas/INBOX.md
```

Example entry:

```text
IDEA-FUT-001

Origin:
  AI_PROPOSAL

Discovered During:
  RC Phase 01 / NEED_REALITY

Potential Need:
  reduce later review effort

Idea:
  optional automatic summary for captured material

Possible Future Target:
  UNKNOWN / likely later review workflow

Status:
  UNSELECTED
```

No Decision is implied.

---

# 10. Proposed Literal Target Before Final User Confirmation

```text
NEED / REALITY TARGET
ID: NEED-RC-01
Status: PROPOSED

Trigger
  User repeatedly loses useful fragments while reading
  and wants a faster preservation workflow.

Target Scope
  Inside:
    real-world preservation Need
    current workflows
    friction/gap
    success meaning
    solution slot

  Outside:
    selected software solution
    Application responsibility
    architecture
    Domain
    Slice

Actor / Stakeholder
  Person performing web research/reading.

Desired Real-World Outcome
  Useful material remains reliably available for later use
  without materially breaking reading flow.

Current Reality
  Generic notes workflow works,
  but requires context switching and several manual operations.
  Browser send-to-notes can preserve pages,
  but does not fully preserve selected fragment + short thought.

Current Workflows / Existing Routes

  Route A — Generic Notes
    Valid:
      yes
    Produces:
      preserved fragment/source/note when user completes all steps
    Friction:
      context switch
      manual copying
      organization overhead
      skipped captures

  Route B — Browser Send-To-Notes
    Valid:
      partially
    Produces:
      page preservation
    Friction/Gap:
      does not reliably capture precise fragment + short thought

Pain / Gap / Pressure
  Valuable material is skipped/lost
  because preservation interrupts the current activity
  or loses intended context.

Why It Matters
  The real-world research result depends on being able
  to use useful material later.

Evidence
  User reports repeated loss/skipped capture.
  Existing routes described above.

Constraints
  No selected software/architecture constraint yet.

Success Meaning
  When the actor decides material is worth preserving,
  the intended material + enough source context is retained reliably,
  optional short thought can be captured,
  and the actor can resume reading
  without long-term organization work.

Boundaries / Non-Goals
  No selected Application.
  No architecture.
  No Domain.
  No Slice.

Open Solution Slot
  A low-friction reliable preservation step
  between recognizing useful material and resuming reading.

Resolution Questions
  RQ1–RQ6 + RQ8
  answered as above.

Q/R/P
  No blocking Q/R/P currently.
  Minor metadata uncertainty deferred to later behavior/data planning.

Decisions
  TS-RC-NEED-01
    selected scope above

  QS-RC-NEED-01
    RQ1–RQ6 + RQ8

  D-RC-NEED-01
    proposed Need framing

  D-RC-SUCCESS-01
    proposed Success Meaning

Future / Out-of-Scope Ideas
  browser-extension Idea
    → handoff to Phase 02

  automatic summarization
    → SDS-PLANNING-STATE/ideas/INBOX if preserved

Sources For Next Phase
  Need
  Desired Outcome
  Current Reality
  Current Workflows A/B
  Pain/Gap
  Success Meaning
  Open Solution Slot
  Evidence
  proposed Solution Ideas
```

---

# 11. Required User Decisions At The End Of The Stage

ChatGPT should show, not hide, the required choices.

## Decision 1 — already accepted

```text
Target-Scope Decision
TS-RC-NEED-01
```

## Decision 2 — already accepted

```text
Question-Set Decision
QS-RC-NEED-01
```

## Decision 3 — Need framing

```text
D-RC-NEED-01

Select:
  accept proposed Need framing
  modify it
  reject/reopen
```

## Decision 4 — Success Meaning

Only separate if materially independent.

```text
D-RC-SUCCESS-01
```

It may be confirmed in one visible Decision bundle with D-RC-NEED-01.

## Final User Decision Gate

```text
Правильно ли зафиксированы Need,
Current Reality и Open Solution Slot
как текущая основа для поиска решения?
```

Assume user says:

```text
Да.
```

Now:

```text
NEED-RC-01
Status: CURRENT / ACCEPTED PLANNING SOURCE
```

Phase 02 may start.

---

# 12. What The Next Phase Receives As Sources

```text
Need
Desired Outcome
Current Reality
Current Workflow A
Current Workflow B
Pain / Gap
Success Meaning
Open Solution Slot
Evidence
Constraints
material Q/R/P
browser-extension Idea Source
other Solution Ideas already mentioned
```

Whole-Solution Discovery now asks:

```text
what is the best way to fill the Solution Slot?
```

It does not ask again:

```text
what is the Need?
```

unless new Evidence challenges NEED-RC-01.

# 11. Artifact Placement / Direction

Accepted Need content persists in:

```text
need/NEED-RC-01.md
```

Methodology direction:

```text
Current Exit Gate:
  Need / Reality accepted

Recommended next:
  dynamic real-life solution discovery Targets

Repeat current:
  if user corrects Need/success/current-reality meaning
```
