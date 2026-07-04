# Solution And Workflow Planning Responsibility Map

Status: provisional reusable responsibility map
Doc version: v0.6.1-folder-responsibility-map
Scope: ownership of files and subfolders inside `planning/documentation/application-planning/`.

## 1. Purpose

Use this file after the parent documentation responsibility map has routed reusable solution/workflow-planning information into this folder.

It answers:

```text
Which file inside application-planning owns a stable principle?
Which file owns the repeated drafting process?
Which template owns a recommended representation?
What is only a migration source?
What belongs outside this reusable folder?
```

Relationship to the parent map:

```text
planning/documentation/documentation-responsibility-map.md:
  routes information into the application-planning responsibility zone;

this file:
  routes information between files and subfolders inside that zone;

README.md:
  owns family navigation and read order.
```

It does not own project command routing or concrete product state.

## 2. Internal Owner Table

| Information type | Internal owner | Notes |
|---|---|---|
| Family purpose, lifecycle and read order | `README.md` | Navigation and compact family overview. |
| Stable planning principles | `application-planning-principles.md` | Invariants, evidence boundaries and artifact responsibilities. |
| Repeated user + AI drafting process | `application-planning-drafting-workflow.md` | Classification, updates, branching, representation and evidence feedback. |
| Current Reality Capture recommended representation | `templates/CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md` | Temporary legacy filename; active semantic role is Reality Capture. |
| General root/branch Planning Draft representation | `templates/PLANNING-DRAFT-TEMPLATE.md` | One candidate end-to-end plan. |
| Functional Workflow Draft representation | `templates/FUNCTIONAL-WORKFLOW-DRAFT-TEMPLATE.md` | One independently understandable and testable behavior line. |
| Prototype setup | `templates/PROTOTYPE-PLAN-TEMPLATE.md` | Optional experiment artifact. |
| Prototype evidence | `templates/PROTOTYPE-RESULT-TEMPLATE.md` | Optional evidence artifact. |
| Legacy opportunity-research representation | `templates/OPPORTUNITY-AND-ECOSYSTEM-RESEARCH-DRAFT-TEMPLATE.md` | Deprecated transition aid; not an active methodology owner. |
| Legacy Product Legend representation | `templates/PRODUCT-LEGEND-DRAFT-TEMPLATE.md` | Deprecated transition aid; not an active methodology owner. |
| Legacy solution-overview representation | `templates/SOLUTION-OVERVIEW-DRAFT-TEMPLATE.md` | Deprecated transition aid; not an active methodology owner. |
| Existing concrete draft migration sources | `drafts/` | Existing material to migrate deliberately; do not create new concrete product state here. |

## 3. Artifact Responsibilities

### Current Reality Capture

Owns:

```text
- current actions and sequence;
- current explanations and decisions as reported;
- user experience;
- current strengths;
- experienced problem situations;
- suspected risks;
- current workarounds;
- existing user ideas without evaluation;
- current unknowns and contradictions.
```

Does not own:

```text
- validated underlying need;
- target workflow;
- accepted acceptance criteria;
- alternative comparison;
- build decision;
- solution architecture.
```

### Planning Draft

Owns:

```text
- what may need to be achieved;
- acceptance criteria and status;
- planning steps;
- existing solutions and alternatives;
- questions, problems, risks and assumptions;
- decisions;
- tests and evidence;
- branches and current conclusion.
```

### Application Root Planning Draft

Owns shared application-level information:

```text
- application identity;
- shared outcomes and criteria;
- functional-workflow inventory;
- cross-workflow dependencies and conflicts;
- shared concepts, constraints and non-goals;
- coordination of actual competing branches.
```

It should link to child workflow drafts instead of duplicating their full content.

### Functional Workflow Draft

Owns one valuable behavior line:

```text
- user outcome;
- trigger and preconditions;
- end-to-end steps;
- local criteria;
- local questions, risks and decisions;
- local tests and evidence;
- relationships to other workflows;
- local implementation thoughts.
```

It is not automatically a scenario implementation slice and is not a solution branch.

### Branch Planning Draft

Owns one candidate alternative after an explicit divergence decision.

The parent Planning Draft owns:

```text
- why branching is justified;
- why options cannot yet be selected or rejected;
- selection/rejection criteria;
- branch inventory;
- comparison and final decision.
```

### Detail Artifact

Owns only detail extracted from a parent section. The parent keeps a useful summary, relationship and entry point.

### Prototype Plan And Result

The plan owns experiment setup. The result owns observed evidence. The related planning draft owns the revised criterion, assumption, workflow status or decision.

## 4. Subfolder Responsibilities

### `templates/`

Owns reusable recommended representations.

```text
- Active templates may define semantic fields and optional expansion points.
- A template is not automatically the only valid representation.
- Templates must not contain accepted state for a concrete product.
- Deprecated templates remain migration aids only.
```

### `drafts/`

Contains existing migration-source drafts.

```text
- Existing non-empty content must be migrated deliberately.
- The folder does not own reusable rules.
- Do not create new concrete product/workflow drafts here.
- New concrete state belongs in a project-local area.
```

## 5. Reusable vs Project-Specific Boundary

```text
Reusable principles, workflow and templates:
  planning/documentation/application-planning/

Concrete captures, root plans, functional workflows, branches,
details, prototype state and application-specific object models:
  planning/areas/<area>/ or another project-local owner
```

A generated explanation is a reading view and owns no canonical information.

## 6. Representation Responsibility

```text
Principles:
  own why the semantic core and progressive complexity matter.

Drafting workflow:
  owns how AI classifies input, selects representation and updates artifacts.

Templates:
  own recommended forms and optional expansion points.

Concrete project-local drafts:
  own entered state and current arrangement.

Generated explanation:
  owns no canonical information.
```

## 7. Conflict Rules

```text
- The parent documentation responsibility map wins for routing into this folder.
- This map wins for placement between files and subfolders inside this folder.
- README.md wins for family navigation and read order.
- Principles win for stable planning invariants.
- Drafting workflow wins for repeated user + AI process.
- A template wins only for its recommended shape.
- Current Reality Capture wins for descriptions of present reality.
- Parent Planning Draft wins for branch creation and comparison.
- Functional Workflow Draft wins for its local behavior line.
- Prototype Result wins for observed evidence; the planning draft owns the revised decision.
- Project root UCM wins for command routing.
- Project-area owners win for concrete local placement and state.
```

## 8. Placement Checks

Before adding information inside this folder, ask:

```text
1. Is it a reusable principle, repeated process, recommended form or migration source?
2. Is it current reality or future planning?
3. Is it application-level coordination, one functional workflow, a competing branch or extracted detail?
4. Does the information belong in this reusable folder or a project-local area?
5. Is evidence status preserved?
6. Does an existing internal owner already hold the rule?
7. Is a separate file independently useful?
8. Can the information remain in a compact high-level view?
```

## 9. Do Not

```text
- Do not duplicate this internal owner table in the parent documentation responsibility map.
- Do not make working drafts sources of reusable rules.
- Do not place concrete object/schema decisions in reusable principles.
- Do not mix solution branches with functional workflows.
- Do not create one file per small item.
- Do not use deprecated stage templates as competing owners.
- Do not create new concrete product state under drafts/.
- Do not make generated explanations canonical.
```
