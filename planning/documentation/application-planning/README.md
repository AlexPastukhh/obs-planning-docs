# Solution And Workflow Planning Documentation Index

Status: active reusable documentation-family index
Doc version: v1.0.0-unified-portable-baseline
Scope: reusable planning from selected source through Planning Item formation, an item-backed Planning Draft, questions, alternatives, validation and optional deeper planning.

The folder path remains `application-planning/` for compatibility. The methodology is not limited to applications.

## 1. Purpose

This family helps convert free-form or structured input into reviewable planning without requiring:

```text
- one fixed input order;
- one universal artifact sequence;
- one mandatory Markdown layout;
- a custom application or managed-object runtime.
```

It can plan:

```text
- use of an existing tool;
- a changed workflow;
- scripts or automation;
- an integration;
- an application;
- an organizational process;
- no change;
- several candidate variants.
```

## 2. Lifecycle

```text
selected source or checked current context
  → optional Current Reality Capture
  → complete source-message preservation
  → semantically complete Planning Item formation and review
  → explicit reviewable Planning Item set
  → proportional question/risk/prototype context
  → item-backed Planning Draft
  → logically ordered Planning Item links
  → selected Scenario depth
  → optional Full Picture Matrix
  → alternatives, research, tests and evidence
  → update items, decisions and Planning Draft
  → optional specialized detailed planning when justified.
```

Current Reality Capture remains descriptive and may be omitted when enough checked current context already exists.

A simple application, non-application solution or narrow workflow may complete planning in the Planning Draft. Separate Scenario, DATA, Behavior, Domain and Slice artifacts are optional.

Opportunity research, Product Legend and Solution Overview are not mandatory sequential artifacts. Useful meaning belongs in Planning Items, the Planning Draft, questions, alternatives or prototype/research work.

## 3. Read Order

```text
1. application-planning-responsibility-map.md
2. application-planning-principles-and-terminology.md
3. planning-item-formation-workflow.md
   when source material must become reviewed Planning Items
4. templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
   when exact item review output is needed
5. direction-registry.md and use-case-registry.md
   when semantic Direction/Use-Case context is needed
6. application-planning-drafting-workflow.md
   for broader planning and reconciliation
7. the relevant optional template or specialized profile
8. the project-local Planning Draft, item register and other owners.
```

Compatibility pointers:

```text
application-planning-principles.md
terminology-and-planning-items.md
```

They are not active owners.

Templates are recommended representations, not mandatory schemas. Project-local state remains outside `planning/documentation/`.

## 4. Active Files

```text
README.md
application-planning-responsibility-map.md
application-planning-principles-and-terminology.md
planning-item-formation-workflow.md
application-planning-drafting-workflow.md
direction-registry.md
use-case-registry.md

compatibility pointers:
  application-planning-principles.md
  terminology-and-planning-items.md

templates/
  CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md
  PLANNING-DRAFT-TEMPLATE.md
  PLANNING-ITEM-REVIEW-TEMPLATE.md
  SCENARIO-DRAFT-TEMPLATE.md
  FUNCTIONAL-WORKFLOW-DRAFT-TEMPLATE.md
  PROTOTYPE-PLAN-TEMPLATE.md
  PROTOTYPE-RESULT-TEMPLATE.md
```

Legacy opportunity, Product Legend and Solution Overview templates remain migration aids. Do not create new concrete project state in the reusable family.

## 5. Core Artifacts And Concepts

### Planning Item

Owns one complete coherent planning meaning.

Complete bodies remain at their item owners. Compact IDs, summaries and table cells are navigation.

### Planning Draft

Owns the current high-level organization of one planning direction.

It may contain:

```text
Planning Item Map;
Key Scenarios;
other Scenario summaries;
Full Picture Matrix;
questions, risks and evidence needs;
implementation directions;
decisions;
selected planning depth;
current conclusion and next action.
```

A separate `Planning Full Picture` artifact is not required.

### Full Picture Matrix

An optional table or equivalent view inside the Planning Draft.

It aligns scenario meaning, implementation ideas, questions/risks/validation and follow-up through links to Planning Items.

### Scenario

One coherent actor/context + goal + observable-result unit.

`Key Scenario` is a role of the same Scenario entity. It is not a separate object type.

A Scenario may stay inline in the Planning Draft or become a separate artifact when that reduces complexity.

### End-To-End Workflow

One independently traversable trigger-to-result workflow.

`End-To-End Complete Picture` remains a temporary legacy alias in older routes.

## 6. Planning Item Formation

Canonical process:

```text
planning-item-formation-workflow.md
```

Recommended review shape:

```text
templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
```

The active baseline is portable, reviewable planning content:

```text
selected source
  → complete source preservation
  → complete proposed item meanings
  → current-owner comparison
  → Current/Incoming/Resulting transformations
  → explicit review.
```

The reusable method does not promise an application-native managed-object runtime.

## 7. Planning Draft And Reconciliation

Canonical process:

```text
application-planning-drafting-workflow.md
```

It owns:

```text
Current Reality integration;
Planning Draft construction;
End-To-End Workflow integrity;
Planning Item reconciliation;
questions, risks and validation;
alternatives and research;
tests and prototype evidence;
optional detailed-planning handoff.
```

## 8. Optional Detailed Planning

The specialized profile is:

```text
planning/documentation/profiles/scenario-domain-slice-docs-profile.md
```

Use it only when the project benefits from separate Scenario, DATA, Behavior, Domain or Slice artifacts.

For a simple or non-application solution:

```text
- Domain may be unnecessary;
- Slice planning may be unnecessary;
- DATA may remain inline;
- Behavior Items may remain inline;
- the Planning Draft may be sufficient before implementation.
```

Not selecting the profile does not make the Planning Draft incomplete.

## 9. Current Deliberate Exclusions

This reusable family does not define:

```text
- a concrete application object model;
- an App Memory layer;
- managed Reference Object creation;
- application-native item delivery;
- storage or serialization architecture;
- exact Markdown wrapper syntax;
- a mandatory client platform;
- project-specific commands or permissions;
- unrestricted AI filesystem access;
- one mandatory scenario/domain/slice route;
- one universal concern catalogue.
```

## 10. Do Not

```text
- Do not require template-ordered user input.
- Do not treat AI classification as infallible.
- Do not accept a proposed Planning Item without review.
- Do not replace complete source-message review with excerpts.
- Do not create Source Idea or Planning Item Candidate entities.
- Do not promote suggestions, risks or implementation ideas into decisions.
- Do not create branches or detail artifacts mechanically.
- Do not split a Planning Item only because it is long.
- Do not keep concrete project state as reusable methodology.
- Do not force detailed planning layers on simple work.
- Do not recreate a second principles or terminology owner.
```
