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
| Stable application-planning principles | `application-planning-principles.md` | Invariants and boundaries for current-state capture, research, Legend, scenarios, solution overview and prototypes. |
| Repeated user + AI drafting process | `application-planning-drafting-workflow.md` | Input handling, classification, current-workflow reconstruction, questions, iterative updates and stage transitions. |
| Current workflow/user-experience artifact shape | `templates/CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md` | Exact provisional fields for current workflow, experience, strengths, problems, risks, workarounds, ideas and unknowns. |
| Opportunity/ecosystem artifact shape | `templates/OPPORTUNITY-AND-ECOSYSTEM-RESEARCH-DRAFT-TEMPLATE.md` | Exact provisional sections for later improvement targets, alternatives and comparative research. |
| Product Legend artifact shape | `templates/PRODUCT-LEGEND-DRAFT-TEMPLATE.md` | Exact provisional sections for the causal/value model. |
| Solution overview artifact shape | `templates/SOLUTION-OVERVIEW-DRAFT-TEMPLATE.md` | Exact provisional sections for implementation options, risks and rough effort. |
| Prototype plan artifact shape | `templates/PROTOTYPE-PLAN-TEMPLATE.md` | Exact provisional hypothesis and experiment plan. |
| Prototype result artifact shape | `templates/PROTOTYPE-RESULT-TEMPLATE.md` | Exact provisional evidence and decision record. |
| Working instances | `drafts/` | Empty or filled working drafts. They own only entered content and never reusable rules. |

## 3. Artifact Responsibility

### Current Workflow And Problem Analysis

```text
Owns:
- the current end-to-end activity;
- why each current workflow step exists;
- current inputs, outputs, tools and dependencies;
- current strengths and satisfactory parts;
- user experience and feelings;
- experienced problem situations;
- suspected problems or risks;
- current workarounds and exceptions;
- existing user ideas recorded without evaluation;
- descriptive cross-step problem groupings;
- current unknowns and missing information.

Does not own:
- formulated improvement targets;
- desired future outcomes;
- candidate changes to workflow steps;
- workflow rationalization decisions;
- external market conclusions;
- accepted product requirements;
- target workflows;
- detailed solution architecture.
```

### Opportunity And Ecosystem Research

```text
Owns:
- improvement targets formulated from references to the current-state artifact;
- ready-made and adjacent solutions;
- alternative workflows;
- keep, simplify, remove, integrate, automate and build comparisons;
- integration, extension and build options;
- future relevance;
- research findings and current opportunity conclusion.

Uses stable references to the workflow analysis rather than recreating it in full.
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
Contains working instances created from the templates.
A draft may be empty or filled.
A filled draft owns only its current entered content.
The folder does not own reusable rules and does not require its own responsibility map in the current small structure.
```

## 5. Conflict Rules

```text
- Principles win for stable reusable planning rules.
- Workflow wins for repeated user + AI process behavior.
- A template wins for the exact shape of its artifact.
- A concrete draft owns only its current entered content.
- Current workflow analysis wins for descriptions of present activity and current user experience.
- Opportunity research wins for improvement targets, checked external alternatives and comparative findings.
- Scenario planning owners win for full scenario-draft structure after value scenarios are identified.
- Project root UCM wins for concrete command routing.
```

## 6. Placement Checks

Before adding information, ask:

```text
1. Is this a stable principle, a repeated workflow rule, an artifact field or current draft content?
2. Is it current-state material or later-stage evaluation and research?
3. Would placing it here duplicate another owner?
4. Is it reusable, or should it remain working draft content?
5. Does the information belong to detailed scenario/domain/slice planning instead?
6. Is a new file genuinely necessary, or can an existing owner hold it?
```

## 7. Do Not

```text
- Do not create a responsibility map in every subfolder mechanically.
- Do not place current product decisions in principles or templates.
- Do not make working drafts sources of reusable rules.
- Do not formulate improvement targets inside the current-workflow artifact.
- Do not treat descriptive problem groupings as a final root-cause taxonomy.
- Do not duplicate the full workflow inside opportunity research.
- Do not add versioning, logging or source-dependency control to this family until separately designed.
```
