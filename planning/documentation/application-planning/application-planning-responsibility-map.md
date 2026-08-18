# Solution And Workflow Planning Responsibility Map

Status: active reusable responsibility map
Doc version: v1.0.0-unified-owner
Scope: ownership of files and subfolders inside `planning/documentation/application-planning/`.

## 1. Purpose

Use this file after the parent documentation responsibility map routes reusable solution/workflow-planning information into this folder.

It decides:

```text
which file owns principles and terminology;
which shared generic owners own Idea review/planning;
which workflow owns broader solution/workflow drafting and integration;
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
| Shared Idea review/planning | `../idea-review-and-planning-workflow.md` + generic Idea principle/template owners | Cross-cutting owner outside this family; source review, variants and aggregate findings |
| Historical Planning Item formation/review | `planning-item-formation-workflow.md` + `templates/PLANNING-ITEM-REVIEW-TEMPLATE.md` | Superseded compatibility/history only |
| Broader Planning Draft / solution integration | `application-planning-drafting-workflow.md` | Current Reality, solution/workflow variants, Planning Draft, questions, tests and integration |
| Reusable planning Directions | `direction-registry.md` | Semantic Direction entries |
| Reusable planning Use Cases | `use-case-registry.md` | Semantic Use-Case entries and owner routes |
| Current Reality recommended representation | `templates/CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md` | Optional descriptive representation |
| Planning Draft recommended representation | `templates/PLANNING-DRAFT-TEMPLATE.md` | Solution/workflow high-level plan; no Planning Item layer required |
| Scenario recommended representation | `templates/SCENARIO-DRAFT-TEMPLATE.md` | Used only when separate scenario drafting is selected |
| Functional Workflow recommended representation | `templates/FUNCTIONAL-WORKFLOW-DRAFT-TEMPLATE.md` | Optional independently useful behavior line |
| Prototype setup | `templates/PROTOTYPE-PLAN-TEMPLATE.md` | Optional experiment setup |
| Prototype result | `templates/PROTOTYPE-RESULT-TEMPLATE.md` | Optional observed evidence |
| Detailed Scenario/Domain/Slice specialization | `../profiles/scenario-domain-slice-docs-profile.md` | Optional specialized profile, not a universal stage |
| Legacy opportunity/Product Legend/Solution Overview templates | corresponding files under `templates/` | Migration aids, not active methodology owners |
| Existing concrete migration drafts | `drafts/` | Do not create new concrete project state here |

## 3. Core Responsibility Split

```text
../idea-planning-principles-and-terminology.md
../idea-review-and-planning-workflow.md
../IDEA-REVIEW-TEMPLATE.md
  → shared Idea semantics, Standard Review / Deep Planning,
    variants, integration checks and aggregate findings;

application-planning-principles-and-terminology.md
  → solution/workflow/application/Scenario concepts and stable invariants;

application-planning-drafting-workflow.md
  → Problem/Need framing, solution/Workflow Variants, current Planning Draft,
    application handoff, Scenario discovery and validation integration;

project-local owner
  → concrete current drafts, workflows, Scenarios, decisions,
    prototypes and implementation state;

historical Planning Item files/registers
  → provenance/migration only;

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
shared Idea meanings are delegated to the generic Idea owners;
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
- own project-local current planning state or implementation state;
- define command names or permissions;
- require a specialized Scenario/Domain/Slice profile.
```

The old files:

```text
application-planning-principles.md
terminology-and-planning-items.md
```

are temporary compatibility pointers only.

## 5. Historical Planning Item Responsibility

`planning-item-formation-workflow.md` and `templates/PLANNING-ITEM-REVIEW-TEMPLATE.md` are superseded compatibility/history paths. They no longer own active source-to-planning behavior.

Existing project-local ITEM-* registers may remain provenance/migration sources. Do not convert them one-to-one into Ideas and do not route new work through them.

## 6. Drafting And Reconciliation Responsibility

`application-planning-drafting-workflow.md` owns:

```text
Current Reality Capture integration;
representation selection;
solution/workflow Planning Draft work;
whole-plan integration views such as the Full Picture Matrix when useful;
End-To-End Workflow integrity;
Idea/current-owner integration with repository owners;
questions, risks and validation integration;
alternatives and branches;
tests, prototypes and evidence feedback;
optional entry into detailed planning.
```

It delegates generic Idea review/deep planning to the shared Idea owners when answer-seeking work is material.

It does not require a separate detailed-planning layer for every solution.

## 7. Template Responsibility

Templates own recommended shape only.

```text
PLANNING-ITEM-REVIEW-TEMPLATE.md
  → superseded compatibility/history only;

PLANNING-DRAFT-TEMPLATE.md
  → high-level solution/workflow planning presentation;

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

Concrete current planning meaning, source provenance, Planning Drafts,
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
- Generic Idea owners win for Idea review/deep-planning semantics and representation.
- Historical Planning Item files own only compatibility/history.
- Drafting workflow wins for broader solution/workflow planning and integration.
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
3. Is it generic Idea review or application-specific drafting/integration?
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
- Do not duplicate generic Idea rules in the drafting workflow.
- Do not create one file per Idea or UI surface.
- Do not put concrete product state under reusable docs.
- Do not introduce Source Idea or Planning Item Candidate.
- Do not treat templates as mandatory schemas.
- Do not treat generated explanations as canonical automatically.
- Do not place project-specific storage or managed-object assumptions here.
- Do not duplicate registry entries in README or workflows.
- Do not route project commands here.
```
