# Solution And Workflow Planning Responsibility Map

Status: active reusable responsibility map
Doc version: v0.8.0-planning-item-formation-owners
Scope: ownership of files and subfolders inside `planning/documentation/application-planning/`.

## 1. Purpose

Use this file after the parent documentation responsibility map routes reusable solution/workflow-planning information into this folder.

It decides:

```text
which file owns terminology;
which file owns stable principles;
which workflow owns source-to-item formation;
which workflow owns broader drafting and reconciliation;
which template owns an exact recommended representation;
what is project-local;
what is only a migration source.
```

Parent map:

```text
planning/documentation/documentation-responsibility-map.md
```

Family navigation:

```text
README.md
```

This map does not own project command routing, semantic registry entries or concrete product state.

## 2. Internal Owner Table

| Information type | Internal owner | Notes |
|---|---|---|
| Family purpose, lifecycle and read order | `README.md` | Navigation and compact overview. |
| Planning/Full Picture/item/source/concern/review terminology | `terminology-and-planning-items.md` | Working semantic distinctions; no project storage schema. |
| Stable planning invariants | `application-planning-principles.md` | Evidence boundaries, source review, item completeness, Complete Picture integrity, topology, concerns and delivery-mode boundaries. |
| Source-to-Planning-Item formation and acceptance | `planning-item-formation-workflow.md` | Full-message review, accumulating meanings, owner checks, transformations, portable/application-native delivery. |
| Exact Planning Item review representation | `templates/PLANNING-ITEM-REVIEW-TEMPLATE.md` | Recommended full item/source/transformation review shape. |
| Broader drafting, Full Picture work and item reconciliation | `application-planning-drafting-workflow.md` | Current Reality, Planning Drafts, Complete Pictures, reconciliation, concerns, branches, tests and evidence revision. |
| Current Reality recommended representation | `templates/CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md` | Legacy filename; active role is Current Reality Capture. |
| Root/branch Planning Draft representation | `templates/PLANNING-DRAFT-TEMPLATE.md` | Item-backed synthesis and candidate end-to-end plan. |
| Functional Workflow Draft representation | `templates/FUNCTIONAL-WORKFLOW-DRAFT-TEMPLATE.md` | Independently useful/testable behavior line. |
| Prototype setup | `templates/PROTOTYPE-PLAN-TEMPLATE.md` | Optional experiment setup. |
| Prototype evidence | `templates/PROTOTYPE-RESULT-TEMPLATE.md` | Optional observed evidence/result. |
| Legacy opportunity research | `templates/OPPORTUNITY-AND-ECOSYSTEM-RESEARCH-DRAFT-TEMPLATE.md` | Migration aid, not active methodology owner. |
| Legacy Product Legend | `templates/PRODUCT-LEGEND-DRAFT-TEMPLATE.md` | Migration aid. |
| Legacy Solution Overview | `templates/SOLUTION-OVERVIEW-DRAFT-TEMPLATE.md` | Migration aid. |
| Existing concrete migration drafts | `drafts/` | Do not create new concrete state here. |

## 3. Core Responsibility Split

```text
terminology-and-planning-items.md
  → what concepts mean;

application-planning-principles.md
  → stable invariants;

planning-item-formation-workflow.md
  → how selected source becomes reviewed Planning Items;

PLANNING-ITEM-REVIEW-TEMPLATE.md
  → exact recommended review shape;

application-planning-drafting-workflow.md
  → how reviewed items become/revise Planning Drafts, Full Pictures,
    Complete Pictures, concerns, branches, tests and reconciliation;

project-local area
  → accepted concrete items, sources, workflows and state;

project root UCM
  → concrete command names/routes/permissions;

future semantic registries
  → Direction and Use-Case identities/routes.
```

## 4. Terminology Responsibility

The terminology owner defines distinctions for:

```text
Planning Draft / Full Picture;
Result / Current / Action Workflow;
End-To-End Complete Picture;
Primary Review Object;
Supporting Artifact;
Planning Item and complete item body;
proposed/reviewed/managed item states;
portable/application-native modes;
Source Message / Fragment / Excerpt / Anchor;
Source Contribution / Contribution Role;
Provenance;
Reference Object boundary;
Concern Definition / Preset / Suggestion / Applied Concern;
Concern Work Target and observability;
review, navigation, workspace and file-update terms.
```

It does not:

- create project-specific entities or IDs;
- choose exact wrapper syntax;
- choose storage/database architecture;
- make broad `InformationItem` canonical again;
- make a separate `Origin` field canonical where Provenance owns it.

## 5. Planning Item Formation Responsibility

`planning-item-formation-workflow.md` owns:

- source selection;
- full-message preservation;
- semantic item identification;
- full accumulating meaning;
- targeted current-owner check;
- relation/action distinction;
- Current/Incoming/Resulting transformations;
- explicit acceptance;
- portable and application-native delivery;
- managed Planning Item identity boundary;
- returned review-file integration;
- formation checks/failure paths.

It does not own:

- repository-wide reconciliation;
- Planning Draft/Full Picture synthesis;
- semantic registry files;
- project command names;
- repository writes.

## 6. Drafting And Reconciliation Responsibility

`application-planning-drafting-workflow.md` owns:

- Current Reality Capture integration;
- representation/review-object selection;
- item-backed Planning Draft/Full Picture;
- Complete Picture integrity;
- Planning Item reconciliation with repository owners;
- concern application/observability integration;
- alternatives/branches/details;
- tests/prototypes/evidence feedback;
- entry into detailed planning.

It delegates raw source-to-item formation.

## 7. Template Responsibility

Templates own recommended shape only.

```text
PLANNING-ITEM-REVIEW-TEMPLATE.md
  → complete review presentation;

PLANNING-DRAFT-TEMPLATE.md
  → item-backed plan/Full Picture presentation;

other templates
  → their named artifact representations.
```

A template:

- may define optional fields/headings;
- is not a mandatory schema;
- does not promote blank fields;
- does not contain accepted concrete product state.

## 8. Reusable vs Project-Local Boundary

```text
Reusable methodology:
  planning/documentation/application-planning/

Concrete Planning Items, source messages/contributions, Full Pictures,
workflows, concerns, decisions, prototypes and application models:
  planning/areas/<area>/ or another explicit project owner
```

A generated explanation is a reading/proposal view unless explicitly accepted into an owner.

## 9. Conflict Rules

```text
- Parent documentation map wins for routing into this folder.
- This map wins for placement inside this folder.
- README wins for navigation/read order.
- Terminology wins for working names/distinctions.
- Principles win for stable invariants.
- Formation workflow wins for source-to-item formation/review.
- Planning Item review template wins for exact recommended review shape.
- Drafting workflow wins for broader planning and reconciliation.
- Other templates win only for their recommended shape.
- Project root UCM wins for command routing/canonical English names.
- Project semantic registries, when created, win for Direction/Use-Case entries.
- Project-local owners win for concrete state and placement.
```

## 10. Placement Checks

Before adding information here, ask:

```text
1. Is it reusable or project-specific?
2. Is it terminology, principle, repeated process or recommended shape?
3. Is it source-to-item formation or broader planning/reconciliation?
4. Does a current internal owner already exist?
5. Is it one semantic item or only a review state/projection?
6. Is complete source context preserved?
7. Is a separate file independently useful?
8. Does the information belong in future Direction/Use-Case registries instead?
9. Is evidence/decision status preserved?
10. Does concrete state belong in a project-local area?
```

## 11. Do Not

```text
- Do not duplicate this map in the parent map.
- Do not duplicate formation rules in the drafting workflow.
- Do not create one file per item or UI surface.
- Do not put concrete product state under reusable docs.
- Do not revive broad InformationItem as a semantic owner.
- Do not introduce Source Idea or Planning Item Candidate.
- Do not treat templates as mandatory schemas.
- Do not treat generated explanations as canonical automatically.
- Do not finalize project-specific storage/wrapper architecture here.
- Do not create Direction/Use-Case registry files in this batch.
- Do not route project commands here.
```
