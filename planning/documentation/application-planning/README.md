# Solution And Workflow Planning Documentation Index

Status: active reusable documentation-family index
Doc version: v1.1.0-sufficient-planning-draft-contract
Scope: reusable planning from Problem / Question / Idea through Need framing, solution/workflow alternatives, a current Planning Draft, questions, validation and optional deeper application/Scenario planning.

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
Problem / Question / Idea
  → Need / Desired Result
  → optional Current Reality Capture
  → existing solutions / alternatives
  → candidate whole solution / Workflow Variants when useful
  → scoped Idea review/deep planning where material
  → whole-workflow integration review
  → current Planning Draft / current conclusions
  → justified or already-confirmed Application responsibility when applicable
  → optional Spine Scenario while Scenario boundaries are unclear
  → Scenario Drafts
  → optional specialized Scenario/DATA/Behavior/Domain/Slice planning when justified.
```

Current Reality Capture remains descriptive and may be omitted when enough checked current context already exists.

A simple application, non-application solution or narrow workflow may complete planning in one Planning Draft. A Planning Draft may exist before Scenario boundaries are stable; claim sufficiency only when the selected planning stage has enough complete coverage. Separate Scenario, DATA, Behavior, Domain and Slice artifacts remain optional.

Historical Planning Item records may remain provenance/migration sources, but new source review uses the shared generic Idea methodology and current meaning belongs in real owners.

## 3. Read Order

```text
1. application-planning-responsibility-map.md
2. application-planning-principles-and-terminology.md
3. ../idea-planning-principles-and-terminology.md and ../idea-review-and-planning-workflow.md
   when answer-seeking Idea work is material
4. direction-registry.md and use-case-registry.md
   when semantic Direction/Use-Case context is needed
5. application-planning-drafting-workflow.md
   for broader solution/workflow planning and current Planning Draft work
6. the relevant optional template or specialized profile
7. the project-local Planning Draft and other current owners
8. historical Planning Item registers only when provenance/migration context is materially relevant.
```

Compatibility pointers:

```text
application-planning-principles.md
terminology-and-planning-items.md
planning-item-formation-workflow.md  # superseded compatibility/history
templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
```

They are not active target methodology owners.

Templates are recommended representations, not mandatory schemas. Project-local state remains outside `planning/documentation/`.

## 4. Active Files

```text
README.md
application-planning-responsibility-map.md
application-planning-principles-and-terminology.md
planning-item-formation-workflow.md  # superseded compatibility/history
application-planning-drafting-workflow.md
direction-registry.md
use-case-registry.md

compatibility pointers:
  application-planning-principles.md
  terminology-and-planning-items.md

templates/
  CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md
  PLANNING-DRAFT-TEMPLATE.md
  PLANNING-ITEM-REVIEW-TEMPLATE.md  # superseded compatibility/history
  SCENARIO-DRAFT-TEMPLATE.md
  FUNCTIONAL-WORKFLOW-DRAFT-TEMPLATE.md
  PROTOTYPE-PLAN-TEMPLATE.md
  PROTOTYPE-RESULT-TEMPLATE.md
```

Legacy opportunity, Product Legend and Solution Overview templates remain migration aids. Do not create new concrete project state in the reusable family.

## 5. Core Artifacts And Concepts

### Idea

Cross-cutting answer-seeking work is owned by the generic Idea methodology at `planning/documentation/`. Standard Idea Review is the default; Deep Idea Planning uses the same concept with deeper Variants/evidence/evaluation when useful.

### Planning Draft

Owns the current high-level organization of one planning direction.

It may contain:

```text
Problem / Need and Desired Result;
Current Reality when useful;
candidate solution / Workflow Variants;
current conclusions and selected direction;
Key Scenarios or early Spine material when application planning is active;
Full Picture Matrix or another useful whole-plan integration view;
questions, risks and evidence needs;
implementation directions;
decisions;
selected planning depth;
current conclusion and next action.
```

A separate `Planning Full Picture` artifact is not required.

### Full Picture Matrix

A useful integration view inside a Planning Draft when the direction benefits from aligning Scenario/flow meaning, implementation ideas, questions/risks/tests/evidence and follow-up. It is not a separate canonical artifact or a reason to invent complete Scenarios before boundaries are stable.

### Scenario

One coherent motivated actor/context + Need/Goal + observable-result unit. A separate Scenario normally requires both a meaningful Need and a meaningful result; re-entry/reuse/lifecycle signals help with ambiguous boundaries but are not a checklist.

`Key Scenario` is a role of the same Scenario entity. It is not a separate object type.

### End-To-End Workflow

One independently traversable trigger-to-result workflow. Whole Workflow Variants are used when materially different integrated solutions must be compared.

`End-To-End Complete Picture` remains a temporary legacy alias in older routes.

## 6. Historical Planning Item Boundary

`planning-item-formation-workflow.md` and `templates/PLANNING-ITEM-REVIEW-TEMPLATE.md` remain only as superseded compatibility/history paths.

New source-to-planning work uses the shared Idea methodology. Do not create a Planning Item layer merely to normalize facts, constraints, decisions, Ideas or current-owner meaning.

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
Idea/current-owner integration and consistency review;
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
- Do not accept a proposed Idea/refinement without review/selection.
- Do not replace complete source-message review with excerpts.
- Do not create generic Source Idea Candidate or Planning Item Candidate entities.
- Do not promote suggestions, risks or implementation ideas into decisions.
- Do not create branches or detail artifacts mechanically.
- Do not split planning meaning mechanically only because it is long.
- Do not keep concrete project state as reusable methodology.
- Do not force detailed planning layers on simple work.
- Do not recreate a second principles or terminology owner.
```
