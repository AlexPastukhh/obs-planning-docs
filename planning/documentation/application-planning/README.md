# Solution And Workflow Planning Documentation Index

Status: provisional reusable documentation-family index
Doc version: v0.6.0-draft-tree-methodology
Scope: reusable planning from current-reality capture through candidate workflows, functional behavior lines, alternatives, tests, prototypes and selection before optional detailed implementation planning.

The folder path remains `application-planning/` during the semantic migration. The methodology itself is not limited to applications.

## 1. Purpose

This family helps convert free-form user input into reviewable planning artifacts without requiring the user to follow a strict ceremony.

It can plan:

```text
- a changed workflow;
- use of an existing tool;
- scripts or automation;
- an integration;
- an application;
- an organizational process;
- no change;
- several candidate end-to-end variants.
```

The methodology guides the result. It does not require one fixed input order or one universal Markdown layout.

## 2. Lifecycle

```text
free-form user input
  → AI interpretation and information-unit review
  → Current Reality Capture
  → root Planning Draft
  → linear planning while one path is sufficient
  → optional Functional Workflow Drafts for separate behavior lines
  → optional solution branches for competing alternatives
  → tests, prototypes and evidence-driven revision
  → selected workflow or several accepted variants
  → optional detailed scenario/domain/slice/implementation planning
  → return to earlier drafts when later evidence requires revision
```

Opportunity research, Product Legend and Solution Overview are no longer mandatory sequential artifacts. Their useful semantics belong inside the Planning Draft and related functional-workflow or prototype artifacts.

## 3. Read Order

```text
1. application-planning-responsibility-map.md
2. application-planning-principles.md
3. application-planning-drafting-workflow.md
4. the relevant recommended template under templates/, when useful
5. the project-local working draft
```

Templates are recommended representations, not mandatory schemas.

## 4. Active Files

```text
README.md
application-planning-responsibility-map.md
application-planning-principles.md
application-planning-drafting-workflow.md

templates/
  CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md
  PLANNING-DRAFT-TEMPLATE.md
  FUNCTIONAL-WORKFLOW-DRAFT-TEMPLATE.md
  PROTOTYPE-PLAN-TEMPLATE.md
  PROTOTYPE-RESULT-TEMPLATE.md
```

The current-workflow template path is retained temporarily, but its semantic role is Current Reality Capture.

Legacy transition templates remain temporarily under `templates/` with deprecated status:

```text
OPPORTUNITY-AND-ECOSYSTEM-RESEARCH-DRAFT-TEMPLATE.md
PRODUCT-LEGEND-DRAFT-TEMPLATE.md
SOLUTION-OVERVIEW-DRAFT-TEMPLATE.md
```

Existing files under `drafts/` are migration sources only. New concrete product/workflow state should be stored in a project-local area outside `planning/documentation/`.

## 5. Artifact Family

### Current Reality Capture

Owns current user-reported reality:

```text
current workflow;
current explanations;
user experience;
strengths;
experienced problems;
suspected risks;
workarounds;
existing ideas;
unknowns;
contradictions.
```

It does not own target outcomes, accepted criteria, solution comparison or architecture.

### Planning Draft

Owns one candidate end-to-end way to achieve a result:

```text
desired result;
acceptance criteria and their status;
planning steps;
problems, risks and assumptions;
existing solutions and alternatives;
decisions;
tests and evidence;
branches;
current conclusion.
```

### Application Root Planning Draft

When the target is an application with several valuable behavior lines, the root draft owns:

```text
application identity;
shared outcomes and criteria;
functional-workflow inventory;
cross-workflow relationships;
shared concepts and constraints;
actual solution branches;
coordination and selection.
```

### Functional Workflow Draft

Owns one independently understandable and testable behavior line inside the same candidate application or solution.

A functional workflow is not a competing solution branch.

### Branch Planning Draft

Owns a candidate continuation created because competing alternatives require independent planning or testing.

The parent draft owns the reason for branching and the comparison.

### Detail Artifact

Owns extracted detail only when independent use, review, reuse or scale justifies a separate artifact.

### Prototype Artifacts

Own experiment setup and evidence when an independent file is useful. Small prototypes may remain embedded in their planning draft.

## 6. Progressive Representation

```text
required semantic core
  → simplest readable representation
  → local expansion
  → linked detail or specialized representation when justified
```

Apply progressive complexity to:

```text
headings;
tables;
files;
folders;
branches;
detail artifacts;
diagrams;
navigation.
```

Keep a simple high-level representation after adding detail.

## 7. Structured Source And Explanation

The structured draft is the source of truth.

An AI-generated explanation may provide:

```text
overview;
deep explanation;
resume context;
explanation of one selected section.
```

It is a generated reading view, not a second independently edited truth.

## 8. Current Deliberate Exclusions

This reusable family does not define:

```text
- a concrete application object model;
- storage or serialization architecture;
- a mandatory client platform;
- project-specific command routes;
- unrestricted AI filesystem access;
- detailed implementation plans;
- one universal problem taxonomy;
- a mandatory branch or file count.
```

Concrete schema and implementation thoughts belong in project-specific drafts.

## 9. Do Not

```text
- Do not require the user to provide information in template order.
- Do not treat AI classification as infallible.
- Do not promote an idea, inference or risk into a confirmed fact.
- Do not evaluate future solutions inside Current Reality Capture.
- Do not create a branch for every idea.
- Do not treat every functional workflow as a competing branch.
- Do not make implementation thoughts architecture decisions automatically.
- Do not keep concrete project state as reusable methodology.
- Do not create empty files or folders only because a template exists.
- Do not remove high-level views after adding detail.
```
