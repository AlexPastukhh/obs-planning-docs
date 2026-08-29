# Phase 01 — Need / Reality / Real-World Problem — Generic Deep Dive

Status: active detailed working file  
Target family: `NEED_REALITY` — working name  
Role: first material semantic IDTSPE instance in the Solution Discovery workflow when no trusted current Need/Reality exists.

---

# 1. Literal Target

The Target is **not** “find an app”.

The Target is a current planning object that can literally be represented as:

```text
NEED / REALITY TARGET

Identity
Status

Trigger

Target Scope
  Inside
  Outside

Actor / Stakeholder

Desired Real-World Outcome

Current Reality

Current Workflow(s) / Existing Routes
  Route A
  Route B
  ...
  # routes may already achieve the outcome,
  # but with friction/cost/risk

Pain / Gap / Pressure

Why It Matters

Evidence

Constraints

Success Meaning

Boundaries / Non-Goals

Open Solution Slot(s)
  # only when useful

Resolution Questions
  selected Question Set
  current answers / unknowns

Q/R/P
  material only

Decisions
  Target-Scope Decision
  Question-Set Decision
  material Answer Decisions

Future / Out-of-Scope Ideas
  references only
  → SDS-PLANNING-STATE/ideas/INBOX when worth preserving

Sources For Next Phase
```

This is the literal target-state contract we should use while deep-diving Phase 01.

Exact future repository file/template ownership remains open.

---

# 2. Workflow Entry

Desired user workflow:

```text
план решения
```

Conceptual route:

```text
user Trigger
↓
is a trusted Need/Reality already current?
  yes
    → reuse it
    → run early challenge scan
    → continue to Whole-Solution Discovery

  no
    → open NEED_REALITY IDTSPE
```

The current repository has similarly named commands/workflows.

They are not assumed semantically equivalent until consistency-audited.

---

# 3. Command Authority

Invoking the workflow authorizes:

```text
source reading
analysis
saved preset activation
Idea generation
Q/R/P analysis
Decision proposals
```

It does not authorize:

```text
AI accepting its own material Idea
repository mutation
file creation in the real repo
silent change of current accepted planning
arbitrary interview/question generation
```

---

# 4. Entry Sources

Possible Sources are broader than the user's initial sentence.

## User description

```text
what the user says now
```

## Current workflow Source

A real current process:

```text
how the actor actually reaches/tries to reach the outcome now
```

## Valid alternative workflow Sources

There may already be several valid ways to reach the desired result.

Example:

```text
Route A works but is slow
Route B works but requires expert knowledge
Route C works only in some contexts
```

These are valuable Sources even before Whole-Solution selection.

At this phase they are not yet automatically “solution Ideas to choose”.

They help describe:

```text
what works
what fails
where friction exists
what does not need reinvention
```

## Prior accepted planning

Current Need / Reality / Decisions can be reused.

## Practical Evidence

Observed behavior, incidents, measurements, examples.

## Constraints

Time, environment, legal, organizational, user constraints.

## Triggered proposed Solutions

Example:

```text
"нужна интеграция с X"
```

At this phase:

```text
preserve as Idea Source
do not promote to Need
```

---

# 5. Target-Scope Decision — Required

The first material choice is:

```text
What exact real-world Need/problem area
does this IDTSPE instance own?
```

Candidate scopes may differ.

ChatGPT may propose scope variants.

Each AI-created variant is an Idea.

Example generic variants:

```text
Scope A:
  improve the entire end-to-end workflow

Scope B:
  solve only one friction point

Scope C:
  investigate whether the apparent problem is material at all
```

## Required persisted Decision

```text
Decision Type:
  Target-Scope

Selected:
  bounded Need / Reality / real-world problem

Inside:
  ...

Outside:
  ...

Higher-level basis:
  Trigger / current project direction

Why this boundary:
  ...
```

## User Decision Gate

If ChatGPT inferred the boundary:

```text
GATE-NR-01
```

must present the proposed boundary for confirmation.

ChatGPT must not silently decide user-owned scope.

---

# 6. Literal Question-Set Preset

Default saved preset:

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

These are useful enough to preserve literally.

They are **Resolution Questions**.

They are not automatically user-facing questions.

---

# 7. Optional RQ Preset Extensions

Only when material:

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
Какой outcome важнее,
если несколько желаемых результатов конфликтуют?

RQ11
Какие ограничения реально исключают часть Solution space?

RQ12
Какое новое Evidence могло бы изменить понимание Need/Problem?
```

---

# 8. Question-Set Decision — Required

ChatGPT applies the preset to the current Target/Sources and proposes:

```text
Selected RQs
Added RQs
Deferred RQs
Already answered RQs
```

Then preserve:

```text
Decision Type:
  Question-Set

Selected Question Set:
  RQ1...
  RQ2...

Deferred:
  ...

Why sufficient for this Target:
  ...
```

## User Decision Gate

Use:

```text
GATE-NR-02
```

when the Question Set itself is a material planning choice.

The user can accept a clearly visible bundle.

---

# 9. Activated Methodology — Must Be Visible

For this instance ChatGPT should be able to show:

## Preset

```text
NEED-REALITY-RQ-PRESET-01
```

Canonical Lens IDs:
```text
L1 → LENS-NEED-VALUE-SCOPE
L2 → LENS-AUTHORITY-SOT-REUSE
L3 → LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY
```
Reusable Lens authority lives in `../lenses/`; L1/L2/L3 labels remain readable legacy aliases in this worked/generic phase.

## L1 — Need / Value / Scope — ACTIVE

Exact actions:

```text
separate desired outcome from proposed Solution
identify actor/stakeholder when material
identify Current Reality and gap
identify what already works
identify why the gap matters
define Success Meaning
check whether the selected Target is too broad/narrow
identify Open Solution Slot when useful
```

Surfaces for Core Finding Disposition:

```text
scope / Need-framing Finding Candidates
current-workflow / value / inside-outside Finding Candidates
better-framing proposal hints
possible Q/R/P need hints
```

## L2 — Authority / Source-of-Truth / Reuse — ACTIVE

Exact actions:

```text
is there already a trusted current Need/Reality owner?
is current workflow already documented?
which Source is canonical vs evidence/history/projection?
which existing valid workflow should be reused as fact?
are we reopening accepted Need without challenge?
```

Surfaces for Core Finding Disposition:

```text
trusted-Source / reuse Finding Candidates
authority / provenance Finding Candidates
Source-conflict Finding Candidates
optional likely Source/owner/reuse and Q/R/P-need hints
```

## L3 — Uncertainty / Assumption / Reversibility — CONDITIONAL

Exact actions:

```text
which Need/current-workflow claim is assumption?
which unknown can materially change Target Scope?
what Evidence could resolve it?
is it worth resolving before Whole-Solution discovery?
```

Surfaces for Core Finding Disposition:

```text
uncertainty / assumption Finding Candidates
Evidence-need hints
research/prototype suggestions carried as Finding Candidate context when justified
possible revalidation-signal hints when useful
```

None of the three Lens blocks above directly creates Question/Q/R/P/Idea/Evidence/Decision State. Core Finding Disposition resolves any accepted State/owner/lifecycle consequence; independently substantial unresolved work may become Target Formation input.

L3 does not force extra investigation for harmless unknowns.

---

# 10. Guards / Interaction Rules — Active

## User Authority Guard

Prevents:

```text
AI-proposed Target/Need interpretation
→ silently accepted Decision
```

## AI Idea Is Proposal Guard

Prevents:

```text
AI suggestion
→ treated as selected Solution / requirement / file plan
```

## Scope / No-Solution-Smuggling Guard

Prevents:

```text
"need integration X"
→ Need = integration X
```

## User Question Policy

Internal:

```text
RQ / Lens prompts
```

stay internal unless a saved User Gate or user-only blocker requires a real question.

---

# 11. User-Facing Questions — Not The Same As RQs

Default user gates for this Target:

## Gate 1 — Scope

```text
Правильно ли я ограничил текущий Target,
или нужно изменить его границу?
```

Show literal proposed scope first.

## Gate 2 — Question Set

```text
Этот набор вопросов достаточно отражает то,
что мы сейчас хотим выяснить,
или какой-то вопрос нужно добавить/убрать?
```

Show selected/deferred questions first.

## Gate 3 — Need/Problem Framing

After the target draft exists:

```text
Правильно ли зафиксированы Need,
Current Reality и Open Solution Slot
как текущая основа для поиска решения?
```

Only user-only factual blockers may introduce an additional question automatically.

ChatGPT should not ask exploratory questions merely because it can.

---

# 12. Answering The RQs

ChatGPT first uses Sources.

## RQ1 — Desired real-world result

Expected answer form:

```text
Actor wants <real-world outcome>
without requiring a specific Solution.
```

## RQ2 — Current way

Expected answer form:

```text
Current Workflow A:
  steps...

Current Workflow B:
  steps...
```

There may be several valid current routes.

## RQ3 — Friction

Expected:

```text
where
what cost/risk/friction
for whom
how it affects outcome
```

## RQ4 — Success

Expected:

```text
observable real-world success meaning
```

Avoid implementation metrics unless already justified by Evidence.

## RQ5 — Need vs proposed Solution

Expected:

```text
Need:
  ...

Proposed Solution Ideas already present:
  ...
```

Out-of-scope future Ideas route to the Inbox.

## RQ6 — Constraints/Evidence/unknowns

Expected:

```text
Known constraints
Evidence
material unknowns
```

---

# 13. Answer Decisions

Not every source-backed fact needs an artificial “Decision”.

Use Answer Decision when there are competing material interpretations/answers.

Typical material Answer Decisions in this Target:

```text
D-NEED:
  selected Need framing

D-SUCCESS:
  selected Success Meaning when alternatives conflict

D-SOLUTION-SLOT:
  selected problem/solution-slot boundary when several framings exist
```

AI proposes candidates.

User confirms material selected interpretation under the User Authority Guard.

---

# 14. AI Ideas Discovered During This Target

Examples:

```text
"maybe use a browser extension"
"maybe automate the current manual route"
"maybe create a shared file"
"maybe add export later"
```

If the Idea belongs to Whole-Solution Discovery:

```text
preserve as Solution Idea Source for Phase 02
```

If its future Target is unknown/out-of-scope:

```text
SDS-PLANNING-STATE/ideas/INBOX.md
```

Required rule:

```text
do not solve/evaluate the future Idea deeply inside this Target
unless it changes current Need/Scope.
```

---

# 15. Q/R/P At This Stage

Only material concerns.

## Q example

```text
Q:
  it is unknown whether the current workflow is actually frequent enough
  for the friction to be material.
```

## R example

```text
R:
  the Target may over-focus on one observed workflow
  while another important actor uses a different route.
```

## P example

```text
P:
  current workflow loses source context
  and therefore fails the desired outcome today.
```

Concrete Q/R/P remains attached to the relevant subject/Decision.

Lens prompts themselves are not persisted Q/R/P.

---

# 16. Literal Target Completeness Contract

Before accepting the Target as Source for Phase 02, it should proportionally contain:

```text
Identity
Status

Trigger

Target Scope
  Inside
  Outside

Actor / Stakeholder

Desired Real-World Outcome

Current Reality

Current Workflow(s) / Existing Routes

Pain / Gap / Pressure

Why It Matters

Evidence

Constraints

Success Meaning

Boundaries / Non-Goals

Open Solution Slot(s)

Resolution Questions + current answers

Material Q/R/P

Decisions:
  Target-Scope
  Question-Set
  material Answer Decisions

Future Ideas routed out

Sources For Next Phase
```

---

# 17. Validators

## Need/Reality Target Completeness Validator

Checks the literal contract above.

## Source Contract Validator

Checks that:

```text
current workflow
valid alternative workflows
prior planning
Evidence
constraints
```

have correct authority/provenance.

## Decision Persistence Validator

Checks material:

```text
Target-Scope
Question-Set
Answer Decisions
```

were not lost.

## Future-Idea Routing Validator

Checks:

```text
useful out-of-scope Idea
→ preserved/routed

Idea
≠ silently promoted to Decision
```

## Revalidation Readiness Validator

Only when accepted Decision retains material Q/R/P.

---

# 18. Artifact / File Implications — Optional Pack

This semantic Target does not itself require a new file.

If Artifact/File Pack is activated, candidate representations include:

```text
embedded Need/Reality section
dedicated Need/Reality owner
Real-Life workflow artifact
generated navigation/index
```

The Artifact Boundary Lens decides based on actual reuse/addressability/review needs.

Global planning Decisions do not belong here.

They live in:

```text
active/PLANNING-GOVERNANCE.md
```

Unassigned future Ideas live in:

```text
SDS-PLANNING-STATE/ideas/INBOX.md
```

---

# 19. Exit Criteria

Phase 01 is ready to hand off when:

```text
Target Scope confirmed
Question Set confirmed/materially sufficient
Need framing accepted
Current Reality/workflows are clear enough
Need vs proposed Solution is separated
Success Meaning is usable
material Evidence/constraints/unknowns are explicit
out-of-scope Ideas are routed
```

Then the Target becomes a trusted Source for:

```text
Phase 02 — Whole-Solution Discovery And Selection
```

---

# 20. Sources For Phase 02

Literal handoff:

```text
Need
Desired Outcome
Current Reality
Current Workflow(s)
Existing Valid-but-Unsatisfactory Routes
Pain / Gap / Pressure
Success Meaning
Constraints
Evidence
Open Solution Slot
material Q/R/P
Solution Ideas already mentioned by user/AI/source
```

Phase 02 should consume these.

It should not rederive Need from scratch.

---

# 21. Re-Open Paths

## Answer re-open

New Evidence changes Need/Success/solution-slot interpretation.

## Question-Set re-open

Later evidence shows an important Need/Reality question was omitted.

## Target-Scope re-open

The actual real-world problem boundary proves too broad/narrow/wrong.

## No re-open

A new Solution Idea appears but does not challenge Need/Reality.

Route it to Phase 02 / Future Ideas and preserve this Target.
