# Solution And Workflow Planning Responsibility Map

Status: active reusable responsibility map
Doc version: v1.0.0-unified-owner
Scope: ownership of files and subfolders inside `planning/documentation/application-planning/`.

## 1. Purpose

Use this file after the parent documentation responsibility map routes reusable solution/workflow-planning information into this folder.

It decides:

```text
which file owns principles and terminology;
which workflow owns source-to-item formation;
which workflow owns broader drafting and reconciliation;
which template owns exact recommended representation;
what belongs to an optional specialized profile;
what remains project-local.
```

Parent map:

```text
planning/documentation/documentation-responsibility-map.md
```

Family navigation:

```text
README.md
```

This map does not own project commands, registry entries or concrete product state.

## 2. Internal Owner Table

| Information type | Internal owner | Notes |
|---|---|---|
| Family purpose, lifecycle and read order | `README.md` | Navigation and compact overview |
| Core planning concepts, distinctions and stable principles | `application-planning-principles-and-terminology.md` | Unified concept contract; no project application/runtime schema |
| Source-to-Planning-Item formation and review | `planning-item-formation-workflow.md` | Full-message review, complete meanings, owner checks and transformations |
| Exact Planning Item review representation | `templates/PLANNING-ITEM-REVIEW-TEMPLATE.md` | Recommended complete review shape |
| Broader Planning Draft work and item reconciliation | `application-planning-drafting-workflow.md` | Current Reality, Planning Draft, workflows, questions, tests and reconciliation |
| Reusable planning Directions | `direction-registry.md` | Semantic Direction entries |
| Reusable planning Use Cases | `use-case-registry.md` | Semantic Use-Case entries and owner routes |
| Current Reality recommended representation | `templates/CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md` | Optional descriptive representation |
| Planning Draft recommended representation | `templates/PLANNING-DRAFT-TEMPLATE.md` | Item-backed high-level plan |
| Scenario recommended representation | `templates/SCENARIO-DRAFT-TEMPLATE.md` | Used only when separate scenario drafting is selected |
| Functional Workflow recommended representation | `templates/FUNCTIONAL-WORKFLOW-DRAFT-TEMPLATE.md` | Optional independently useful behavior line |
| Prototype setup | `templates/PROTOTYPE-PLAN-TEMPLATE.md` | Optional experiment setup |
| Prototype result | `templates/PROTOTYPE-RESULT-TEMPLATE.md` | Optional observed evidence |
| Detailed Scenario/Domain/Slice specialization | `../profiles/scenario-domain-slice-docs-profile.md` | Optional specialized profile, not a universal stage |
| Legacy opportunity/Product Legend/Solution Overview templates | corresponding files under `templates/` | Migration aids, not active methodology owners |
| Existing concrete migration drafts | `drafts/` | Do not create new concrete project state here |

## 3. Core Responsibility Split

```text
application-planning-principles-and-terminology.md
  → what planning concepts mean
  → stable rules and invariants for those concepts;

planning-item-formation-workflow.md
  → how selected source becomes reviewed Planning Items;

PLANNING-ITEM-REVIEW-TEMPLATE.md
  → exact recommended review shape;

application-planning-drafting-workflow.md
  → how reviewed items become or revise a Planning Draft,
    workflows, scenarios, questions, tests and decisions;

project-local owner
  → concrete accepted items, drafts, scenarios,
    decisions, prototypes and implementation state;

project root UCM
  → concrete command names, routes and permissions;

Direction / Use-Case registries
  → semantic entries and owner routes.
```

## 4. Unified Principles And Terminology Responsibility

`application-planning-principles-and-terminology.md` owns reusable definitions, distinctions and stable principles for:

```text
evidence and decision states;
Source Messages, Fragments, Contributions and Provenance;
Planning Items, Canonical Item Bodies and relations;
Implementation Ideas and validation context;
Planning Draft and Full Picture Matrix;
Current, Result and Action Workflows;
Scenario, Key Scenario, Scenario DATA and Behavior Items;
End-To-End Workflow integrity;
concerns, risks, questions and prototypes;
Direction and Use-Case topology;
review and dynamic revision;
minimal-to-complex planning.
```

It does not:

```text
- define a project application or managed-object runtime;
- choose project storage/database architecture;
- choose exact Markdown wrapper syntax;
- own project-local Planning Items or implementation state;
- define command names or permissions;
- require a specialized Scenario/Domain/Slice profile.
```

The old files:

```text
application-planning-principles.md
terminology-and-planning-items.md
```

are temporary compatibility pointers only.

## 5. Planning Item Formation Responsibility

`planning-item-formation-workflow.md` owns:

```text
source selection;
literal source preservation;
full-message review;
relevant-span highlighting;
semantic item identification;
complete accumulating meaning;
proportional current-owner checks;
relation/action distinction;
Implementation Idea preservation;
Current/Incoming/Resulting transformations;
explicit review;
portable review delivery;
returned user-edited review integration;
formation checks and failure paths.
```

It does not own:

```text
repository-wide reconciliation;
Planning Draft synthesis;
project command names;
project-local item IDs or storage;
repository edits, archives, commit or push.
```

## 6. Drafting And Reconciliation Responsibility

`application-planning-drafting-workflow.md` owns:

```text
Current Reality Capture integration;
representation selection;
item-backed Planning Draft work;
Planning Item Map and Full Picture Matrix;
End-To-End Workflow integrity;
Planning Item reconciliation with repository owners;
questions, risks and validation integration;
alternatives and branches;
tests, prototypes and evidence feedback;
optional entry into detailed planning.
```

It delegates raw source-to-item formation.

It does not require a separate detailed-planning layer for every solution.

## 7. Template Responsibility

Templates own recommended shape only.

```text
PLANNING-ITEM-REVIEW-TEMPLATE.md
  → complete item/source/transformation review;

PLANNING-DRAFT-TEMPLATE.md
  → item-backed high-level planning presentation;

SCENARIO-DRAFT-TEMPLATE.md
  → separate scenario representation when selected;

other templates
  → their named optional representations.
```

A template:

```text
- may define optional fields and headings;
- is not a mandatory schema;
- does not promote blank fields;
- does not contain accepted concrete product state.
```

## 8. Reusable Vs Project-Local Boundary

```text
Reusable methodology:
  planning/documentation/application-planning/

Concrete Planning Items, source contributions, Planning Drafts,
scenarios, workflows, concerns, decisions, prototypes and models:
  planning/areas/<area>/ or another explicit project-local owner.
```

A generated explanation is a reading or proposal view unless explicitly accepted into an owner.

## 9. Conflict Rules

```text
- Parent documentation map wins for routing into this folder.
- This map wins for placement inside this folder.
- README wins for navigation and read order.
- Unified principles-and-terminology wins for concepts and invariants.
- Formation workflow wins for source-to-item formation and review.
- Planning Item review template wins for recommended review shape.
- Drafting workflow wins for broader planning and reconciliation.
- Other templates win only for their recommended shape.
- Specialized profiles win only after that profile is selected.
- Project root UCM wins for command routing and canonical English names.
- Registries win for Direction and Use-Case entries.
- Project-local owners win for concrete state and placement.
```

## 10. Placement Checks

Before adding information here, ask:

```text
1. Is it reusable or project-specific?
2. Is it a concept/principle, repeated process, template shape or profile?
3. Is it source-to-item formation or broader drafting/reconciliation?
4. Does a current internal owner already exist?
5. Is a separate file independently useful?
6. Would the addition introduce an unsupported application/runtime assumption?
7. Does it belong in an optional specialized profile?
8. Is complete source context preserved?
9. Does concrete state belong in a project-local area?
10. Does README or another route need an update?
```

## 11. Do Not

```text
- Do not recreate separate competing terminology and principles owners.
- Do not duplicate formation rules in the drafting workflow.
- Do not create one file per item or UI surface.
- Do not put concrete product state under reusable docs.
- Do not introduce Source Idea or Planning Item Candidate.
- Do not treat templates as mandatory schemas.
- Do not treat generated explanations as canonical automatically.
- Do not place project-specific storage or managed-object assumptions here.
- Do not duplicate registry entries in README or workflows.
- Do not route project commands here.
```
