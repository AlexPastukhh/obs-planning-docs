# Application Planning Responsibility Map

Status: provisional reusable responsibility map
Scope: ownership of files and subfolders inside `planning/documentation/application-planning/`.

## 1. Purpose

Use this file to decide where application-planning information belongs inside this folder.

It answers:

```text
Which file owns a stable principle?
Which file owns the repeated drafting process?
Which file owns the required semantic core?
Which template owns a recommended representation or expansion form?
What belongs only in a working draft?
```

It does not own concrete project command routing or detailed product state.

## 2. Owner Table

| Information type | Owner | Notes |
|---|---|---|
| Folder purpose and read order | `README.md` | Navigation and compact family overview only. |
| Stable application-planning principles | `application-planning-principles.md` | Invariants, stage boundaries, required semantic core and minimal-to-complex representation rules. |
| Repeated user + AI drafting process | `application-planning-drafting-workflow.md` | Input handling, classification, current-workflow reconstruction, format selection, progressive expansion, questions, iterative updates and stage transitions. |
| Current workflow/user-experience recommended representation | `templates/CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md` | Compact default shape plus optional drill-down and alternative representation guidance. |
| Opportunity/ecosystem recommended representation | `templates/OPPORTUNITY-AND-ECOSYSTEM-RESEARCH-DRAFT-TEMPLATE.md` | Provisional sections for later improvement targets, alternatives and comparative research. |
| Product Legend recommended representation | `templates/PRODUCT-LEGEND-DRAFT-TEMPLATE.md` | Provisional sections for the causal/value model. |
| Solution overview recommended representation | `templates/SOLUTION-OVERVIEW-DRAFT-TEMPLATE.md` | Provisional sections for implementation options, risks and rough effort. |
| Prototype plan recommended representation | `templates/PROTOTYPE-PLAN-TEMPLATE.md` | Provisional hypothesis and experiment-plan representation. |
| Prototype result recommended representation | `templates/PROTOTYPE-RESULT-TEMPLATE.md` | Provisional evidence and decision-record representation. |
| Working instances | `drafts/` | Empty or filled working drafts. They own only entered content and may use compact, expanded, specialized or free Markdown representations. |

## 3. Artifact Responsibility

### Current Workflow And Problem Analysis

```text
Owns:
- the current end-to-end activity;
- why each current workflow step exists;
- current actions and sequence;
- current inputs, outputs, tools and dependencies when useful;
- current strengths and satisfactory parts;
- user experience and feelings;
- experienced problem situations;
- suspected problems or risks;
- current workarounds and exceptions;
- existing user ideas recorded without evaluation;
- descriptive cross-step problem groupings when useful;
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

Its required semantic core is independent of one Markdown layout. The initial representation should normally keep the high-level workflow, step purpose and categorized user experience together. Detailed step records are optional drill-down.

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
Owns reusable recommended artifact representations.
A template may define required semantic fields, headings, tables,
compact forms, optional expansion blocks and placeholder language.
A template is not automatically the only valid representation.
It must not contain accepted state for a concrete product.
```

A future template variant should be added only after repeated use shows that it solves a real representation problem. The existence of an expanded or specialized template does not change the compact default.

### `drafts/`

```text
Contains working instances created from a template or another valid representation.
A draft may be empty or filled.
A draft may use compact, expanded, specialized or free Markdown.
It must preserve the artifact's required semantic core and evidence boundaries.
A filled draft owns only its current entered content.
The folder does not own reusable rules and does not require its own responsibility map in the current small structure.
```

## 5. Representation Responsibility

```text
Principles:
  own why minimal-to-complex growth and semantic-core stability matter.

Drafting workflow:
  owns how AI chooses the simplest useful representation,
  detects overload and expands or changes the representation.

Template:
  owns one recommended initial form and documented optional expansion points.

Draft:
  owns the current concrete arrangement chosen for the entered material.

Future application:
  may render the same semantic records in multiple views,
  but its object/schema contract is not defined here.
```

A high-level representation should remain available after detailed expansion. Detailed content may be colocated, nested, linked or moved to a separate artifact when scale requires it.

## 6. Conflict Rules

```text
- Principles win for stable reusable planning rules and required semantic core.
- Workflow wins for repeated user + AI process behavior and format-selection behavior.
- A template wins for its documented recommended representation, not for all possible valid representations.
- A concrete draft owns only its current entered content and chosen arrangement.
- Current workflow analysis wins for descriptions of present activity and current user experience.
- Opportunity research wins for improvement targets, checked external alternatives and comparative findings.
- Scenario planning owners win for full scenario-draft structure after value scenarios are identified.
- Project root UCM wins for concrete command routing.
```

When a draft is clear and preserves the semantic core but differs from the recommended template, do not mechanically reshape it. Change representation only when the user asks or when the current form materially impairs understanding or maintenance.

## 7. Placement Checks

Before adding information, ask:

```text
1. Is this a stable principle, a repeated workflow rule, a semantic field,
   a recommended representation or current draft content?
2. Is it current-state material or later-stage evaluation and research?
3. Would placing it here duplicate another owner?
4. Is it reusable, or should it remain working draft content?
5. Does the information belong to detailed scenario/domain/slice planning instead?
6. Is a new file genuinely necessary, or can an existing owner hold it?
7. Can the information remain in the compact high-level representation?
8. Has the current representation become too crowded to think with or scan?
9. Would an optional drill-down, a specialized template or free Markdown be clearer?
```

## 8. Do Not

```text
- Do not create a responsibility map in every subfolder mechanically.
- Do not place current product decisions in principles or templates.
- Do not make working drafts sources of reusable rules.
- Do not formulate improvement targets inside the current-workflow artifact.
- Do not treat descriptive problem groupings as a final root-cause taxonomy.
- Do not duplicate the full workflow inside opportunity research.
- Do not add versioning, logging or source-dependency control to this family until separately designed.
- Do not define templates as mandatory universal layouts.
- Do not make detailed drill-down replace the high-level workflow view.
- Do not create a separate template or file only because one additional field appeared.
```
