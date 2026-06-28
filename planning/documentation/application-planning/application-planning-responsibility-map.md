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
| Stable application-planning principles | `application-planning-principles.md` | Research, Legend, scenario derivation, solution overview and prototype principles. |
| Repeated user + AI drafting process | `application-planning-drafting-workflow.md` | Classification, questions, criticism, decisions and iterative update behavior. |
| Opportunity/ecosystem artifact shape | `templates/OPPORTUNITY-AND-ECOSYSTEM-RESEARCH-DRAFT-TEMPLATE.md` | Exact provisional sections for initial research. |
| Product Legend artifact shape | `templates/PRODUCT-LEGEND-DRAFT-TEMPLATE.md` | Exact provisional sections for the causal/value model. |
| Solution overview artifact shape | `templates/SOLUTION-OVERVIEW-DRAFT-TEMPLATE.md` | Exact provisional sections for implementation options, risks and rough effort. |
| Prototype plan artifact shape | `templates/PROTOTYPE-PLAN-TEMPLATE.md` | Exact provisional hypothesis and experiment plan. |
| Prototype result artifact shape | `templates/PROTOTYPE-RESULT-TEMPLATE.md` | Exact provisional evidence and decision record. |
| Empty starter instances | `drafts/` | Working skeletons only; they do not own reusable rules. |

## 3. Subfolder Responsibility

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

## 4. Conflict Rules

```text
- Principles win for stable reusable planning rules.
- Workflow wins for repeated user + AI process behavior.
- A template wins for the exact shape of its artifact.
- A concrete draft owns only its current entered content.
- Scenario planning owners win for full scenario-draft structure after value scenarios are identified.
- Project root UCM wins for concrete command routing.
```

## 5. Placement Checks

Before adding information, ask:

```text
1. Is this a stable principle, a repeated workflow rule, an artifact field or current draft content?
2. Would placing it here duplicate another owner?
3. Is it reusable, or should it live in a project-local area?
4. Does the information belong to detailed scenario/domain/slice planning instead?
5. Is a new file genuinely necessary, or can an existing owner hold it?
```

## 6. Do Not

```text
- Do not create a responsibility map in every subfolder mechanically.
- Do not place current product decisions in principles or templates.
- Do not make empty starter drafts examples or sources of truth.
- Do not add versioning, logging or source-dependency control to this family until separately designed.
```
