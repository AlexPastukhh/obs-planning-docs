# Application Planning Drafting Workflow

Status: provisional reusable workflow
Scope: iterative user + AI drafting of current-workflow analysis, opportunity research, Product Legend, solution overview, prototype plan and prototype result artifacts.

## 1. Purpose

Use this workflow when a user provides fragmented workflow descriptions, ideas, observations, concerns, answers or prototype findings and wants them converted into reviewable application-planning drafts.

## 2. Inputs

The user may provide:

```text
- current workflow steps;
- reasons for individual steps;
- current strengths and convenient parts;
- concrete problem situations;
- current workarounds;
- preliminary problem groups;
- rough ideas;
- known products or integrations;
- reasons to build or not build;
- Product Legend fragments;
- scenario candidates;
- implementation options;
- prototype ideas;
- results and observations;
- answers to earlier questions;
- corrections and decisions.
```

## 3. Classification Before Writing

For each input fragment, classify it as one of:

```text
confirmed user statement;
checked source fact;
inference requiring confirmation;
open question;
critical remark;
related idea;
explicit answer;
explicit decision.
```

Do not convert an unknown into a plausible requirement simply to fill a template section.

## 4. Iterative Update Algorithm

```text
1. Read the current complete draft set and the new user input.
2. Identify which artifacts are affected.
3. Preserve unchanged confirmed content.
4. Apply explicit corrections and answers.
5. Move content to the artifact that owns it.
6. Structure current activity as workflow steps before finalizing problem groups.
7. Derive problem situations from concrete steps.
8. Treat problem units as provisional and refine them after the workflow pass.
9. Mark unresolved or missing information as `not provided`.
10. Add prioritized questions for important unknowns.
11. Add critical remarks for structural or feasibility problems.
12. Add related ideas separately from accepted content.
13. Record user answers and decisions in the affected artifacts.
14. Check whether downstream artifacts now conflict with upstream changes.
15. Return the full current draft set while the artifact family remains small.
```

The workflow is not append-only. When the user corrects an earlier statement, the current draft should be corrected rather than retaining both as equally valid requirements.

## 5. Full Draft-Set Mode

Default during early use:

```text
Return the full current versions of:
- current workflow and problem analysis;
- opportunity and ecosystem research;
- Product Legend;
- solution overview;
- prototype plan;
- prototype result.
```

This reduces accidental loss of questions, criticism, answers and decisions across chat turns.

A future application may support partial updates and structured import, but that behavior is out of scope here.

## 6. Workflow-Step Drafting

For each meaningful workflow step, capture:

```text
- trigger;
- purpose;
- current actions;
- inputs and outputs;
- tools and environments;
- dependencies;
- current strengths;
- problem situations;
- workarounds;
- frequency when known;
- cost or risk of error;
- candidate change;
- unknowns.
```

Do not describe only the steps related to a proposed product. Include satisfactory and apparently normal steps so they can also be kept, simplified, replaced or removed deliberately.

## 7. Problem-Unit Refinement

Start from problem situations attached to workflow steps.

A preliminary problem unit should identify:

```text
- an observable situation;
- affected workflow steps;
- a possible cause;
- consequence;
- risk;
- current workaround;
- provisional category;
- current status.
```

After the end-to-end workflow is visible, review whether problem units should be:

```text
added;
split;
merged;
renamed;
reclassified;
linked to more steps;
rejected as symptoms.
```

Do not treat the first problem list as complete.

## 8. Questions

Questions are part of the planning artifact, not temporary chat commentary.

Recommended fields:

| Field | Meaning |
|---|---|
| ID | Stable local question identifier inside the draft. |
| Question | The unresolved issue. |
| Priority | Relative importance. |
| Blocking | Whether progress depends on the answer. |
| Status | `open`, `answered`, `deferred` or another explicitly chosen value. |
| Answer | User-confirmed answer when available. |

Ask only questions that materially improve the artifact or prevent an unsafe assumption.

## 9. Critical Remarks And Related Ideas

### Critical remarks

Use for:

```text
- contradictions;
- unsupported conclusions;
- unclear value;
- incomplete workflow boundaries;
- premature problem taxonomy;
- scope inflation;
- feasibility risk;
- premature architecture;
- prototype design that cannot answer its hypothesis.
```

### Related ideas

Use for optional directions, improvements or alternatives that are not accepted requirements.

Do not hide a critical concern inside a neutral idea list.

## 10. Answers And Decisions

```text
Answer:
  resolves or narrows a question.

Decision:
  selects a direction or rule.
```

A decision should include its current rationale when provided. AI may suggest a decision but must label it as a suggestion until the user accepts it.

## 11. Stage Progression

### Current workflow analysis → opportunity research

Proceed when the end-to-end workflow, step purposes, current strengths, major problem situations and provisional problem units are visible enough to research alternatives.

The problem-unit list may still change during or after research.

### Opportunity research → Product Legend

Proceed when alternatives, reasons to keep or change the workflow and reasons to test a new solution are sufficiently visible.

### Product Legend → core value scenarios

Extract scenario candidates only from the causal/value claims that make the product worth testing. Use the scenario-draft workflow for full scenarios.

### Core scenarios → solution overview

Identify broad implementation directions, reusable capabilities, risks and unknowns. Do not jump directly to detailed architecture.

### Solution overview → prototype plan

Select a prototype when an uncertainty could materially change product direction, workflow or architecture.

### Prototype result → planning revision

Update the workflow analysis, research, Legend, scenario candidates, solution overview and next prototype decisions from observed evidence.

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
  what the user does now, why each step exists,
  where problem situations occur and how preliminary problem units are refined.

Opportunity research:
  which current or alternative solutions may keep, simplify,
  remove, integrate, automate or replace workflow parts.

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
- Workflow steps include their purposes, not only actions.
- Problem situations trace to concrete workflow steps.
- Problem units remain provisional until reviewed across the workflow.
- Questions, criticism, ideas, answers and decisions are preserved.
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
