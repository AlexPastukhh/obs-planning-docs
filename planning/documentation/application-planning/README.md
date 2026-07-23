# Solution And Workflow Planning Documentation Index

Status: provisional reusable documentation-family index
Doc version: v0.9.0-planning-item-formation-sync
Scope: reusable planning from selected source through full-message Planning Item formation, end-to-end workflow pictures, an item-backed Planning Draft, concern review, alternatives, tests, prototypes and evidence-driven revision.

The folder path remains `application-planning/` during the semantic migration. The methodology itself is not limited to applications.

## 1. Purpose

This family helps convert free-form user input into reviewable planning artifacts without requiring a strict ceremony, one fixed input order or one universal Markdown layout.

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

## 2. Lifecycle

```text
free-form or structured source
  → optional Current Reality Capture
  → complete source-message preservation
  → semantically complete Planning Item formation and review
  → portable Markdown or application-native accepted delivery
  → proportional hypothesis / risk / prototype-test context where material
  → item-backed root Planning Draft / Full Picture
  → identify one trigger-to-result Complete Picture per independent workflow
  → classify models, views, terminology and capability slices as supporting artifacts
  → linear planning while one path is sufficient
  → relevant concern suggestions from manual input or presets
  → applicability review
  → target-specific Applied Concerns where justified
  → optional Functional Workflow Drafts, branches and detail work
  → tests, prototypes and evidence-driven revision
  → update concerns, items and the parent Planning Draft
  → optional detailed scenario/domain/slice/implementation planning
```

Current Reality Capture remains descriptive. It may be omitted when enough checked current context is already available.

Opportunity research, Product Legend and Solution Overview are not mandatory sequential artifacts. Their useful semantics may appear in the Planning Draft, Planning Items, concern suggestions, functional-workflow drafts or prototype artifacts.

## 3. Read Order

```text
1. application-planning-responsibility-map.md
2. terminology-and-planning-items.md
3. application-planning-principles.md
4. planning-item-formation-workflow.md
   when source material must become reviewed Planning Items
5. templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
   when exact item review output is needed
6. application-planning-drafting-workflow.md
   for broader planning, Complete Picture work and item reconciliation
7. the relevant recommended template under templates/, when useful
8. the project-local working draft, Full Picture and item register
```

Templates are recommended representations, not mandatory schemas. Concern presets recommend attention, not file shape. Project-local state remains outside `planning/documentation/`.

## 4. Active Files

```text
README.md
application-planning-responsibility-map.md
terminology-and-planning-items.md
application-planning-principles.md
planning-item-formation-workflow.md
application-planning-drafting-workflow.md

templates/
  CURRENT-WORKFLOW-AND-PROBLEM-ANALYSIS-DRAFT-TEMPLATE.md
  PLANNING-DRAFT-TEMPLATE.md
  PLANNING-ITEM-REVIEW-TEMPLATE.md
  FUNCTIONAL-WORKFLOW-DRAFT-TEMPLATE.md
  PROTOTYPE-PLAN-TEMPLATE.md
  PROTOTYPE-RESULT-TEMPLATE.md
```

The current-workflow template path is retained temporarily, but its semantic role is Current Reality Capture.

Legacy transition templates remain migration sources:

```text
OPPORTUNITY-AND-ECOSYSTEM-RESEARCH-DRAFT-TEMPLATE.md
PRODUCT-LEGEND-DRAFT-TEMPLATE.md
SOLUTION-OVERVIEW-DRAFT-TEMPLATE.md
```

Do not create new concrete product/workflow state under this reusable family.

## 5. Artifact Family

### Shared Terminology And Planning Items

Owns working names and distinctions for:

```text
Planning Draft / Full Picture;
Result Workflow;
Current Workflow / Old Workflow;
Action Workflow;
End-To-End Complete Picture;
Primary Review Object;
Supporting Artifact;
Planning Item and its scale/kind;
Item Validation Context;
Prototype / Test Candidate;
Canonical Item Body and compact item identity;
Planning Lens;
Concern Definition;
Concern Preset;
Concern Suggestion;
Applied Concern;
Concern Work Target;
Document Template;
View Preset;
Validation Rule;
Planning Item formation/review states;
Source Message, Source Fragment, Source Excerpt and Source Anchor;
Source Contribution and Contribution Role;
Source of Truth;
Markdown/app-memory bridge terms;
Workspace and review terms.
```

The terminology draft does not finalize concrete project schema, storage architecture, wrapper syntax or UI controls.

### Current Reality Capture

Owns checked or user-reported current reality:

```text
current workflow and explanations;
user experience;
strengths;
experienced problems;
suspected risks;
workarounds;
existing ideas;
unknowns and contradictions.
```

It does not own accepted future outcomes, architecture or a build decision.

### Planning Draft / Full Picture

Owns one current planning synthesis:

```text
desired result;
boundaries and criteria;
reviewed Planning Items and their relationships;
current/desired/action workflows when useful;
concern coverage and open deeper work;
alternatives and branches;
decisions;
tests and evidence;
material item hypotheses, risks, key situations and prototype/test candidates;
current conclusion and next action.
```

It may combine item links, summaries, groupings and explanatory prose. It is not required to be only a list or only narrative.

### Application Root Planning Draft

Coordinates application identity, shared outcomes, workflow inventory, cross-workflow relationships, shared constraints and actual competing branches.

### Functional Workflow Draft

Owns one independently understandable and testable behavior line. It is not automatically an implementation slice, a competing branch or an End-To-End Complete Picture.

When several sibling behavior lines together contain one mandatory trigger-to-result cycle, the parent preserves the complete workflow and the children remain supporting slices.

### Branch Planning Draft

Owns one independently planned alternative after a real divergence decision. The parent owns comparison.

### Detail And Prototype Artifacts

Create them only when independent depth, lifecycle, review, reuse or testing value justifies a separate artifact. Small prototype/test candidates may remain in Item Validation Context or embedded in their Planning Draft.

## 6. Progressive Representation

```text
required semantic core
  → simplest readable representation
  → local expansion
  → linked detail or specialized representation when justified
```

Simplicity applies to structure, not to loss of meaning. A Planning Item may be long when examples, distinctions, exceptions, rationale or acceptance detail are required.

## 7. Structured Source And Explanation

Canonical Planning Items preserve complete source-linked meaning. A detailed AI explanatory section may be the accumulating item body; a later review block must not replace it with a shorter lossy paraphrase.

Portable review repeats complete supporting user messages under each item. Canonical storage may use a shared message bank plus typed contribution relations only when the full per-item presentation remains reproducible.

Dedicated reusable owners:

```text
planning-item-formation-workflow.md
templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
```

The broader drafting workflow keeps repository reconciliation, Planning Draft/Full Picture synthesis, concerns, branches, tests and evidence feedback.

## 8. Current Deliberate Exclusions

This reusable family does not define:

```text
- a concrete application object model;
- storage or serialization architecture;
- exact Markdown wrapper syntax;
- a mandatory client platform;
- project-specific command routes or command names;
- semantic Direction/Use-Case registries before their dedicated registry workflow exists;
- unrestricted AI filesystem access;
- detailed implementation plans;
- one universal concern catalogue;
- a mandatory branch, file or item length.
```

## 9. Do Not

```text
- Do not require template-ordered user input.
- Do not treat AI classification as infallible.
- Do not treat a proposed Planning Item as accepted without review.
- Do not replace complete source-message review with excerpt-only presentation.
- Do not create a separate Source Idea or Planning Item Candidate entity.
- Do not promote an idea, inference, suggestion or risk into a confirmed fact.
- Do not evaluate future solutions inside Current Reality Capture.
- Do not treat a Concern Suggestion as an Applied Concern.
- Do not make all preset concerns mandatory.
- Do not create a branch, child file or detail artifact mechanically.
- Do not split a Planning Item only because it is long.
- Do not make implementation thoughts architecture decisions automatically.
- Do not keep concrete project state as reusable methodology.
- Do not remove high-level views after adding detail.
- Do not split one mandatory trigger-to-result workflow into peer Complete Pictures by topic.
- Do not require validation context on every item or promote it into a confirmed requirement or architecture decision.
```
