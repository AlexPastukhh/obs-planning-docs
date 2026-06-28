# Application Planning Responsibility Map

Status: provisional reusable responsibility map
Scope: ownership of files and subfolders inside `planning/documentation/application-planning/`.

## 1. Purpose

Use this file to decide where application-planning information belongs inside this folder.

It answers:

```text
Which file owns a stable principle?
Which file owns the repeated drafting process?
Which template owns an artifact shape?
What belongs only in a working draft?
```

It does not own concrete project command routing or detailed product state.

## 2. Owner Table

| Information type | Owner | Notes |
|---|---|---|
| Folder purpose and read order | `README.md` | Navigation only. |
| Stable application-planning principles | `application-planning-principles.md` | Current-workflow analysis, research, Legend, scenario derivation, solution overview and prototype principles. |
| Repeated user + AI drafting process | `application-planning-drafting-workflow.md` | Classification, workflow-step analysis, problem-unit refinement, questions, criticism, decisions and iterative update behavior. |
| Current workflow/problem artifact shape | `templates/CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md` | Exact provisional sections for describing the current workflow, problem situations and preliminary problem units. |
| Opportunity/ecosystem artifact shape | `templates/OPPORTUNITY-AND-ECOSYSTEM-RESEARCH-DRAFT-TEMPLATE.md` | Exact provisional sections for researching alternatives after the current workflow is understood. |
| Product Legend artifact shape | `templates/PRODUCT-LEGEND-DRAFT-TEMPLATE.md` | Exact provisional sections for the causal/value model. |
| Solution overview artifact shape | `templates/SOLUTION-OVERVIEW-DRAFT-TEMPLATE.md` | Exact provisional sections for implementation options, risks and rough effort. |
| Prototype plan artifact shape | `templates/PROTOTYPE-PLAN-TEMPLATE.md` | Exact provisional hypothesis and experiment plan. |
| Prototype result artifact shape | `templates/PROTOTYPE-RESULT-TEMPLATE.md` | Exact provisional evidence and decision record. |
| Empty starter instances | `drafts/` | Working skeletons only; they do not own reusable rules. |

## 3. Artifact Responsibility

### Current Workflow And Problem Analysis

```text
Owns:
- the current end-to-end activity;
- why each workflow step exists;
- inputs, outputs, tools and dependencies;
- current strengths and satisfactory parts;
- concrete problem situations and workarounds;
- preliminary problem units and their affected steps;
- candidate workflow rationalizations.

Does not own:
- external market conclusions;
- final problem taxonomy;
- accepted product requirements;
- detailed solution architecture.
```

### Opportunity And Ecosystem Research

```text
Owns:
- ready-made and adjacent solutions;
- alternative workflows;
- integration, extension and build options;
- future relevance;
- research findings and current opportunity conclusion.

Uses the workflow analysis as input rather than recreating it in full.
```

## 4. Subfolder Responsibility

### `templates/`

```text
Owns reusable artifact shapes.
A template may define fields, tables and placeholder language.
It must not contain accepted state for a concrete product.
```

### `drafts/`

```text
Contains empty starter instances created from the templates.
A draft may be copied to a project-local area before real use.
The folder does not require its own responsibility map in the current small structure.
```

## 5. Conflict Rules

```text
- Principles win for stable reusable planning rules.
- Workflow wins for repeated user + AI process behavior.
- A template wins for the exact shape of its artifact.
- A concrete draft owns only its current entered content.
- Current workflow analysis wins for descriptions of present activity and preliminary problem units.
- Opportunity research wins for checked external alternatives and comparative findings.
- Scenario planning owners win for full scenario-draft structure after value scenarios are identified.
- Project root UCM wins for concrete command routing.
```

## 6. Placement Checks

Before adding information, ask:

```text
1. Is this a stable principle, a repeated workflow rule, an artifact field or current draft content?
2. Is it a current-workflow observation or an externally checked research finding?
3. Would placing it here duplicate another owner?
4. Is it reusable, or should it live in a project-local area?
5. Does the information belong to detailed scenario/domain/slice planning instead?
6. Is a new file genuinely necessary, or can an existing owner hold it?
```

## 7. Do Not

```text
- Do not create a responsibility map in every subfolder mechanically.
- Do not place current product decisions in principles or templates.
- Do not make empty starter drafts examples or sources of truth.
- Do not treat a preliminary problem-unit list as complete before the workflow analysis is reviewed.
- Do not duplicate the full workflow inside opportunity research.
- Do not add versioning, logging or source-dependency control to this family until separately designed.
```
