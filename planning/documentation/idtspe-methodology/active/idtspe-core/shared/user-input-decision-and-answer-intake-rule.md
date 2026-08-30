# User Input Decision And Answer Intake Rule

Status: active generic methodology Rule  
Module type: `Rule`  
Purpose: let one user message simultaneously invoke a workflow, provide Sources, answer Resolution Questions, and accept/modify material Decisions.

---

# 1. Core Rule

A planning workflow must not assume:

```text
command
→ AI proposal
→ separate user confirmation turn
→ next question
→ separate user answer turn
```

The user may provide all of these in the **same invocation message**:

```text
command / workflow intent

current facts / Sources

Target scope

accepted planning choices

answers to saved Resolution Questions

constraints

explicit non-goals

ideas to preserve

delegation / authority limits
```

Therefore the ChatGPT processing order is:

```text
USER MESSAGE
↓
1. detect workflow/command
2. extract explicit user-provided Sources/facts
3. extract explicit user Decisions / selections
4. extract answers to active preset/RQs
5. extract constraints/non-goals/delegation
6. activate methodology
7. evaluate what is already resolved
8. derive/propose only what is still unresolved
9. show unresolved required Decisions/questions
10. continue as far as possible without silently accepting AI proposals
```

---

# 2. Do Not Re-Ask Already Answered Questions

If the user message already answers:

```text
RQ3
Где именно возникает проблема?
```

the workflow must not later ask RQ3 verbatim.

Instead mark:

```text
RQ3
Status: ANSWERED_FROM_USER_INPUT
```

The answer may still be checked for consistency/evidence.

---

# 3. Do Not Re-Request Already Accepted Decisions

If the user says:

```text
Скоуп сейчас только текущий workflow и Need.
Приложение пока не выбираем.
```

that can directly satisfy the Target-Scope Decision.

ChatGPT should record:

```text
Target-Scope Decision
Status: ACCEPTED_FROM_USER_INPUT
```

It must not respond:

```text
"Правильно ли я понял, что scope такой?"
```

unless the input is materially ambiguous or contradictory.

---

# 4. Facts / Answers / Decisions Must Stay Distinct

A user answer does not always mean a Decision.

Example:

```text
"Сейчас я копирую текст вручную."
```

This is primarily:

```text
Source / Current Reality fact
```

not necessarily a Decision.

Example:

```text
"На этом этапе считаем успехом,
если материал и URL сохранены и я вернулся к чтению."
```

This is an explicit selection of Success Meaning:

```text
Answer Decision
Status: ACCEPTED_FROM_USER_INPUT
```

Example:

```text
"Можно попробовать browser extension."
```

This is:

```text
Idea
Status: UNSELECTED
```

unless the user explicitly says to select it as the current answer.

---

# 5. Input Resolution Statuses

For every required item, ChatGPT should be able to classify:

```text
ACCEPTED_FROM_USER_INPUT
  explicit user-owned Decision already selected

ANSWERED_FROM_USER_INPUT
  RQ/factual question answered by user Source

ANSWERED_FROM_TRUSTED_SOURCE
  no user decision required

DERIVED_NONDECISION
  straightforward derivation that does not select among material alternatives

PROPOSED_BY_AI
  candidate answer/Decision; not accepted

UNANSWERED_MATERIAL
  material RQ lacks enough Source evidence

UNRESOLVED_DECISION
  a material choice remains unaccepted

DEFERRED
  explicitly not required for current Target

NOT_APPLICABLE
```

These statuses make the interaction inspectable.

---

# 6. End-Of-Turn Resolution Block

After doing all possible work, ChatGPT should show a compact block only when useful:

```text
RESOLVED

Target-Scope Decision
  ACCEPTED_FROM_USER_INPUT

RQ1
  ANSWERED_FROM_USER_INPUT

RQ2
  ANSWERED_FROM_TRUSTED_SOURCE

...

UNRESOLVED DECISIONS

D-...
  choices:
    A
    B
  current AI recommendation:
    B
  status:
    UNRESOLVED_DECISION

UNANSWERED MATERIAL QUESTIONS

RQ...
  why needed:
    ...
```

If there are no unresolved required items:

```text
Target can be accepted / handed off
```

No artificial confirmation turn is needed.

---

# 7. Blocking vs Non-Blocking

Not every unanswered RQ blocks the workflow.

Classify:

```text
BLOCKING
  cannot truthfully complete/accept current Target without it

NON-BLOCKING
  can be deferred as residual Q/R/P or later-target question
```

Likewise for Decisions.

The workflow may continue analysis around unresolved items, but:

```text
AI must not mark the Target/Decision accepted
through a blocking unresolved user-owned choice.
```

---

# 8. Natural Language Is Enough

The user does not need a form.

Valid input:

```text
план решения

Скоуп: только понять текущую нужду и workflow.
Приложение пока не выбираем.

Что хочу получить:
не терять полезные фрагменты и быстро возвращаться к чтению.

Сейчас:
копирую вручную в заметки;
иногда пользуюсь send-to-notes.

Проблема:
контекст переключается и часть фрагментов не сохраняю.

Успех:
текст + источник надежно сохранены;
долгую организацию делаю потом.

Ограничение:
не хочу сейчас обсуждать архитектуру.

Используй стандартные RQ1-RQ6.
```

From one message the workflow can resolve:

```text
command
Target-Scope Decision
Question-Set Decision
RQ1
RQ2
RQ3
RQ4
part of RQ5
RQ6 constraint
```

Only real gaps remain.

---

# 9. Ambiguity Rule

Do not over-promote vague language into a Decision.

Examples:

```text
"наверное browser extension"
→ Idea

"можно считать успехом..."
→ likely proposal unless context clearly selects it

"считай успехом..."
→ explicit Answer Decision

"можешь сам выбрать несущественные детали"
→ delegation, scoped by the statement
```

When ambiguity changes a material user-owned Decision:

```text
mark UNRESOLVED_DECISION
```

rather than silently choosing.

---

# 10. Relation To User Decision Gate

`User Decision Gate` remains useful, but it is **conditional**.

It fires only for:

```text
UNRESOLVED_DECISION
```

after intake has processed the full user message and Sources.

The Gate is not a mandatory conversational turn.

Formula:

```text
pre-resolved by user message
→ no Gate

unresolved material user-owned choice
→ Gate
```

---

# 11. Relation To Question Presets

Saved RQ presets are:

```text
analysis/checklist defaults
```

not mandatory interview scripts.

Flow:

```text
activate preset
↓
map user/source content to RQs
↓
mark answered
↓
derive where safe
↓
only expose unanswered material RQs
```

This reduces unnecessary questioning.

---

# 12. Key Invariant

```text
one user message can resolve many planning obligations

AI must maximize reuse of that input

AI must surface the remainder

AI must not manufacture confirmation turns
for already explicit user Decisions

AI must not manufacture acceptance
for unresolved AI proposals
```

# 13. Broad Discussion Material Intake

Broad Discussion may introduce material decision drivers, Ideas and related State meaning without forcing a full IDTSPE State dump or mini-checkpoint in that turn.

For material Ideas, preserve the meaning explicitly in the discussion:

```text
Idea <identity/label>
Addresses → current Target Goal / Desired Outcome | Question | Problem

material Idea relations when they actually exist
  competes-with
  complements
  requires
  conflicts-with
  part-of-candidate-bundle

related Q/R/P/Evidence when material
```

The current Target Goal / Desired Outcome is Target/scope context rather than a new Generic State Unit introduced by this intake rule. A material Problem driver uses the existing P-09 Problem meaning.

A material Idea is not left as an unlabeled implication in prose or in a later Broad Discussion Summary. If its Target Goal/Question/Problem driver cannot yet be identified, record that missing driver as an unresolved planning gap instead of carrying a free-floating material Idea.

When an active Target Module supplies reusable Question/Problem candidates, together with its current Target Goal, those are the ordinary starting driver set. They are not an exclusive intake gate: drivers/Ideas from the user, AI, current situation/Sources, previous work/checkpoints, Broad Discussion or dispositioned findings receive the same Core semantics once accepted into the current work. AI proposals still remain unselected until actual authority selects them.

No mandatory `Broad Discussion Intake Summary` or block-owner/semantic-anchor record is required after each message. Conversation context plus explicit IDTSPE Ideas/Q-R-P/Evidence carry the exploration; the next Integration Checkpoint normalizes the material whole into current Generic State + Target Result.

Canonical owner: [`broad-discussion-and-integration-checkpoint-model.md`](broad-discussion-and-integration-checkpoint-model.md).

# 14. Decision Retention / Rationale Intake At Checkpoints

At an Integration Checkpoint:

```text
accepted material Decision
→ retain in semantic planning state by default

Rationale / Why
→ optional
→ distinct from Evidence
→ ask the user whether a concise rationale should be retained when a new material Decision has none

material non-selected / deferred / rejected / superseded alternatives
→ ask whether to retain the alternatives and, when relevant, why they were not selected

trivial transient alternatives
→ may remain conversational unless the user wants the exploration history
```

Do not make an optional rationale/alternative-retention question blocking unless the missing rationale itself is needed to resolve a material ambiguity. Batch retention questions when practical rather than creating a confirmation turn for every small choice.

If the user already supplied a rationale or explicitly said whether to keep alternatives, reuse that input and do not re-ask it.
