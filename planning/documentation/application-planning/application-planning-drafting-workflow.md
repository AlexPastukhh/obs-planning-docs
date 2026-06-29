# Application Planning Drafting Workflow

Status: provisional reusable workflow
Scope: iterative user + AI drafting of current-workflow capture, opportunity research, Product Legend, solution overview, prototype plan and prototype result artifacts.

## 1. Purpose

Use this workflow when a user provides workflow descriptions, experiences, ideas, observations, concerns, answers or prototype findings and wants them converted into reviewable application-planning drafts.

This file owns the repeated drafting process. Stable stage boundaries, required semantic cores and planning invariants remain in `application-planning-principles.md`.

## 2. Inputs

The user may provide:

```text
- a complete current algorithm;
- fragmented or out-of-order workflow descriptions;
- reasons for individual current steps;
- current strengths and convenient parts;
- feelings, uncertainty and cognitive burden;
- concrete experienced problem situations;
- suspected risks that have not yet occurred;
- current workarounds;
- rough user ideas for possible improvement;
- known products or integrations;
- later-stage research, Legend, scenario, solution or prototype material;
- user-edited returned drafts;
- answers to earlier questions;
- corrections and decisions.
```

Do not require the user to know the root problem, desired improvement or future solution before first-stage drafting begins.

## 3. Classification Before Writing

For each input fragment, classify both its evidence status and its artifact role.

Evidence status:

```text
confirmed user statement;
checked source fact;
inference requiring confirmation;
open question;
explicit answer;
explicit decision.
```

First-stage role when applicable:

```text
current workflow fact;
current strength;
user experience;
experienced problem situation;
suspected problem or risk;
current workaround;
existing user idea;
unknown.
```

Later-stage role when applicable:

```text
critical remark;
related idea;
research finding;
improvement target;
solution option;
prototype evidence.
```

Do not convert an unknown, feeling, suspected risk or user idea into a confirmed requirement simply to fill a template section.

## 3A. Representation Selection And Progressive Expansion

Choose representation after classifying the material, not before.

Default sequence:

```text
1. Identify the artifact's required semantic core.
2. Preserve the user's wording, order and intuitive relationships where possible.
3. Create the smallest representation that is clear, useful and maintainable.
4. Keep related information together and categorize it locally.
5. Omit empty optional headings.
6. Observe whether the current representation remains easy to scan and think with.
7. Expand only the crowded or structurally complex parts.
8. Change to a specialized or free Markdown representation only when local expansion is not enough.
9. Preserve a simple high-level layer after adding detail.
```

Compact default rules:

```text
- Prefer prose and headings over tables for the initial artifact.
- Do not create a separate large section for one small item.
- Do not introduce a table until several records share fields and the table improves scanning.
- Do not split related user comments across distant sections unless scale requires it.
- Keep experience, ideas, risks and other current comments near the workflow step they describe.
- Use only applicable category headings.
- Preserve the original meaning before improving visual structure or terminology.
- Categorize rather than aggressively summarize when summarization could remove nuance.
```

Expansion signals include:

```text
- one step contains several internal activities or branches;
- one category contains many independent records;
- repeated records need stable IDs or shared fields;
- cross-step relationships are difficult to see;
- the compact view becomes visually crowded;
- the user must search across the file to understand one step;
- a diagram, table, linked detail or alternate representation is clearly easier to work with.
```

Possible expansion forms:

```text
- a detailed subsection attached to one high-level step;
- repeated-record lists or tables;
- cross-step observations;
- a linked detail artifact;
- a specialized template;
- free Markdown;
- future application cards, diagrams or drill-down views.
```

Do not replace the high-level workflow with the detailed expansion. The high-level step remains the stable abstraction and entry point.

Several template variants may be designed after repeated use reveals stable needs. Their existence does not make them mandatory and does not change the compact default.

## 4. Iterative Update Algorithm

```text
1. Read the current complete draft set and the new user input.
2. Identify which artifacts own the new material.
3. Identify the required semantic core and the current representation used by each affected artifact.
4. Preserve unchanged confirmed content.
5. Apply explicit corrections and answers.
6. If the user returns edited drafts with `обн` or `upd`,
   treat them as the latest user-edited working inputs and compare them
   with clearly matching prior versions when available.
7. Preserve deliberate wording, order and local grouping unless a clear conflict or usability problem requires a change.
8. During first-stage capture, reconstruct the current sequence from complete or fragmented input.
9. Attach strengths, experiences, problems, risks, workarounds, ideas and unknowns to current steps or cross-step records.
10. Start with the simplest readable representation.
11. Expand only the steps or record groups that have become difficult to think with, scan or maintain.
12. Preserve the difference between experienced situations and suspected risks.
13. Record user ideas without evaluating or accepting them during the first stage.
14. Use descriptive problem groupings only when they help preserve relationships in the source material.
15. Mark unresolved or missing information as `not provided` when a visible placeholder is useful; omit empty optional sections otherwise.
16. Add prioritized questions only for information that materially improves the current artifact.
17. Move evaluation, improvement targets, alternatives and future-workflow design to later-stage owners.
18. Record user answers and decisions in the affected artifacts.
19. Check whether downstream artifacts conflict with corrected upstream material.
20. Return the full current versions of the affected small artifact family when this reduces context loss.
```

The workflow is not append-only. When the user corrects an earlier statement, correct the current draft rather than retaining both versions as equally valid.

A representation is also not append-only. Collapse, regroup or replace a representation when it no longer works, but preserve the semantic core, user intent, evidence status and high-level entry points.

## 4A. Returned User-Edited Drafts

When the user returns one or more application-planning drafts with `обн` or `upd`:

```text
- treat each same-message returned draft as the latest user-edited working input;
- read the complete returned file before revising it;
- compare with the clearly matching prior draft when available;
- identify deliberate additions, deletions, reordering and rewording;
- preserve deliberate user edits unless they conflict with an explicit rule,
  checked source fact, same-message clarification or artifact ownership boundary;
- do not silently restore text removed by the user;
- merge same-message clarifications into the relevant returned drafts;
- keep confirmed facts, suggestions, risks, ideas, questions and decisions distinguishable;
- evaluate whether the edit affects related drafts in the small artifact family;
- update only the related drafts that are actually affected;
- treat imperfect visual formatting as acceptable input;
- preserve user wording and intuitive organization before normalizing presentation;
- improve headings, spacing, tables, grouping, ordering and scanability only when useful;
- do not replace the user's compact structure with a more complex template merely because one exists;
- do not require the user to polish Markdown presentation;
- return complete revised files rather than isolated replacement fragments;
- summarize significant structural adjustments and unresolved conflicts separately.
```

A user edit is explicit revision input, but it does not automatically make every edited claim a confirmed fact, accepted requirement or final decision.

If the prior draft is unavailable, use the returned draft and same-message clarification as the current source and state that a historical comparison was not performed.

## 5. Full Draft-Set Mode

Default during early use:

```text
Return the full current versions of the affected small artifact family when doing so reduces context loss.
```

A future application may support partial updates and structured import, but that behavior is out of scope here.

## 6. Current-Workflow Capture

The user may begin from any mixture of:

```text
- a workflow without a known problem;
- discomfort without a known cause;
- known experienced failures;
- theoretical concerns;
- positive experience with a workflow that mostly works;
- one or more already imagined solution ideas;
- a precise and detailed current process;
- fragmented memories supplied over several messages.
```

Treat these as ordinary input conditions. Do not create separate formal modes or demand a different result from each condition.

### Initial compact form

The initial current-workflow artifact should normally describe the complete workflow directly through high-level step headings.

For each meaningful current workflow step, capture:

```text
- stable ID and name;
- what happens;
- reason or purpose;
- user experience and comments.
```

Inside `User Experience And Comments`, use only applicable local categories:

```text
- strengths / what works;
- difficulties / friction;
- experienced problems;
- risks / doubts;
- current workarounds;
- thoughts / observations;
- existing user ideas;
- unknowns.
```

Keep the user's comments close to the step they describe. Preserve meaning and intuition before attempting abstraction.

Include satisfactory and apparently ordinary steps. Do not describe only the parts related to a product idea.

### Optional detailed expansion

For a selected step, capture the following only when the compact form has become insufficient:

```text
- trigger;
- current actions;
- inputs and outputs;
- tools and environments;
- dependencies;
- exceptions and alternative current paths;
- frequency and current impact;
- repeated structured experience records;
- stable IDs for records that require cross-reference.
```

The detailed expansion supplements the compact step and does not replace it.

## 7. Descriptive Cross-Step Grouping

Start from records attached to current workflow steps.

A descriptive problem grouping may identify:

```text
- repeated observable situations;
- affected current workflow steps;
- experienced consequences;
- current workarounds;
- user-provided explanations or hypotheses;
- evidence status;
- unresolved questions.
```

A grouping may be added, split, merged, renamed or removed to represent the current material more accurately.

Do not use first-stage grouping to decide root cause, needed improvement, target workflow or product requirement.

Cross-step groupings are optional. Add them only when repetition or relationships are harder to understand inside the step view.

## 8. Questions

Questions are part of the planning artifact, not temporary chat commentary.

Recommended semantic fields:

| Field | Meaning |
|---|---|
| ID | Stable local question identifier inside the draft. |
| Question | The unresolved issue. |
| Priority | Relative importance. |
| Blocking | Whether completing the current artifact depends on the answer. |
| Status | `open`, `answered`, `deferred` or another explicitly chosen value. |
| Answer | User-confirmed answer when available. |

These fields may be represented as a small table, headings or compact labeled lines. Use the form that is easiest to read for the current number of questions.

Ask only questions that materially improve the artifact or prevent an unsafe assumption.

## 9. Critical Remarks And Related Ideas

### Critical remarks

During first-stage drafting, use critical remarks only for problems in the record itself, such as:

```text
- contradictory descriptions of the current workflow;
- incomplete workflow boundaries;
- an unsupported statement presented as a current fact;
- current and future workflows being mixed together;
- an idea being written as though it were already implemented.
```

Later-stage critical remarks may address value, feasibility, architecture or prototype design.

### Related ideas

During the first stage, store user-provided ideas as existing user ideas with their source context. Do not evaluate them there.

AI-proposed alternatives belong to later-stage artifacts unless the user explicitly asks only to record them as unassessed material.

## 10. Answers And Decisions

```text
Answer:
  resolves or narrows a question.

Decision:
  selects a drafting boundary, terminology or later-stage direction.
```

A decision should include its current rationale when provided. AI may suggest a decision but must label it as a suggestion until the user accepts it.

Answers and decisions may remain next to the related question or statement when that is clearer than a separate section.

## 11. Stage Progression

### Current workflow capture → opportunity research

Proceed when the current end-to-end workflow, user experience, current strengths, experienced problem situations, suspected risks, workarounds, existing user ideas and important unknowns are visible enough for later analysis.

The first stage does not need a validated root cause, desired improvement or selected solution.

### Opportunity research → Product Legend

Proceed when improvement targets, alternatives, reasons to preserve or change the workflow and reasons to test a new solution are sufficiently visible.

### Product Legend → core value scenarios

Extract scenario candidates only from the causal/value claims that make the product worth testing. Use the scenario-draft workflow for full scenarios.

### Core scenarios → solution overview

Identify broad implementation directions, reusable capabilities, risks and unknowns. Do not jump directly to detailed architecture.

### Solution overview → prototype plan

Select a prototype when an uncertainty could materially change product direction, workflow or architecture.

### Prototype result → planning revision

Update research, Legend, scenario candidates, solution overview and next prototype decisions from observed evidence.

Correct the current-workflow record only when evidence shows that the recorded present workflow was inaccurate or when an intentional new current-state revision is being created.

## 12. Prototype Drafting Checks

Before accepting a prototype plan, check:

```text
- Is the hypothesis explicit?
- Is the question decision-relevant?
- Is the highest-risk assumption being tested?
- Is the prototype type appropriate?
- Is the fidelity no higher than necessary?
- Are real and simulated parts stated?
- Are success, failure and inconclusive criteria defined?
- Is there a timebox?
- Is the code fate stated?
- Is the affected decision named?
```

## 13. Artifact Ownership

```text
Current workflow analysis:
  the current activity, step purposes, user experience, strengths,
  experienced problems, suspected risks, workarounds, existing user ideas
  and unresolved current-state information.

Opportunity research:
  formulated improvement targets linked to current-state references,
  existing and alternative solutions, workflow rationalizations and comparisons.

Product Legend:
  the compact causal/value model.

Scenario drafts:
  observable user situations and system behavior.

Solution overview:
  broad implementation options and uncertainties.

Prototype plan:
  how a hypothesis will be tested.

Prototype result:
  what was observed and what decision follows.
```

Do not duplicate the full workflow inside opportunity research, a full scenario inside the Legend or a full architecture inside the solution overview.

Representation choices do not change artifact ownership.

## 14. Output Quality Checks

Before returning drafts:

```text
- Confirmed user content is distinguishable from AI suggestions.
- No required-looking statement was invented to fill a blank.
- The first-stage draft does not require the user to know the problem or solution.
- The representation preserves the artifact's required semantic core.
- The representation starts as simply as the current material allows.
- Workflow steps include what happens, their purposes and local user experience/comments.
- Current facts, experiences, experienced problems, suspected risks, workarounds, ideas and unknowns remain distinguishable.
- The first-stage draft does not contain improvement targets or future-workflow decisions.
- Empty optional categories and one-item tables are avoided.
- Detailed expansion appears only where the compact view is insufficient.
- The high-level view remains available after expansion.
- Returned user-edited drafts preserve deliberate edits and do not silently restore removed content.
- Same-message clarifications are reflected in the new complete draft versions.
- Markdown presentation is normalized only when useful and without changing user intent.
- Questions, corrections, answers and decisions are preserved.
- The affected artifact uses an appropriate representation; exact template conformity is not required when another valid form is clearer.
- Upstream and downstream artifacts do not silently contradict each other.
- Prototype results state evidence and limitations.
- Current exclusions are respected.
```

## 15. Current Exclusions

Do not add during this initial workflow:

```text
- artifact version history;
- action logs;
- source/dependency propagation;
- JSON contracts;
- automatic source verification;
- command routing;
- commit or delivery behavior;
- a complete application object model;
- automatic conversion between every representation;
- a mandatory template-selection engine.
```
