# Application Planning Drafting Workflow

Status: provisional reusable workflow
Scope: iterative user + AI drafting of current-workflow capture, opportunity research, Product Legend, solution overview, prototype plan and prototype result artifacts.

## 1. Purpose

Use this workflow when a user provides workflow descriptions, experiences, ideas, observations, concerns, answers or prototype findings and wants them converted into reviewable application-planning drafts.

This file owns the repeated drafting process. Stable stage boundaries and planning invariants remain in `application-planning-principles.md`.

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

## 4. Iterative Update Algorithm

```text
1. Read the current complete draft set and the new user input.
2. Identify which artifacts own the new material.
3. Preserve unchanged confirmed content.
4. Apply explicit corrections and answers.
5. During first-stage capture, reconstruct the current sequence from complete or fragmented input.
6. Attach strengths, experiences, problems, risks, workarounds, ideas and unknowns to current steps or cross-step records.
7. Preserve the difference between experienced situations and suspected risks.
8. Record user ideas without evaluating or accepting them during the first stage.
9. Use descriptive problem groupings only when they help preserve relationships in the source material.
10. Mark unresolved or missing information as `not provided`.
11. Add prioritized questions only for information that materially improves the current artifact.
12. Move evaluation, improvement targets, alternatives and future-workflow design to later-stage owners.
13. Record user answers and decisions in the affected artifacts.
14. Check whether downstream artifacts conflict with corrected upstream material.
15. Return the full current draft set while the artifact family remains small and this remains useful.
```

The workflow is not append-only. When the user corrects an earlier statement, correct the current draft rather than retaining both versions as equally valid.

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

For each meaningful current workflow step, capture when available:

```text
- stable ID and name;
- trigger and purpose;
- current actions;
- inputs and outputs;
- tools and environments;
- dependencies;
- current strengths;
- user experience and feelings;
- experienced problem situations;
- suspected problems or risks;
- current workarounds;
- exceptions and alternative current paths;
- frequency and current impact when known;
- existing user ideas related to the step;
- unknowns.
```

Include satisfactory and apparently ordinary steps. Do not describe only the parts related to a product idea.

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

## 8. Questions

Questions are part of the planning artifact, not temporary chat commentary.

Recommended fields:

| Field | Meaning |
|---|---|
| ID | Stable local question identifier inside the draft. |
| Question | The unresolved issue. |
| Priority | Relative importance. |
| Blocking | Whether completing the current artifact depends on the answer. |
| Status | `open`, `answered`, `deferred` or another explicitly chosen value. |
| Answer | User-confirmed answer when available. |

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

## 14. Output Quality Checks

Before returning drafts:

```text
- Confirmed user content is distinguishable from AI suggestions.
- No required-looking statement was invented to fill a blank.
- The first-stage draft does not require the user to know the problem or solution.
- Workflow steps include their purposes, not only actions.
- Current facts, experiences, experienced problems, suspected risks, workarounds, ideas and unknowns remain distinguishable.
- The first-stage draft does not contain improvement targets or future-workflow decisions.
- Questions, corrections, answers and decisions are preserved.
- The affected artifact uses its template.
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
- commit or delivery behavior.
```
