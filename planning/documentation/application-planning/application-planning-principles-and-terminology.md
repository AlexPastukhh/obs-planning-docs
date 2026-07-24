# Solution And Workflow Planning Principles And Terminology

Status: active reusable canonical owner
Doc version: v1.0.0-unified-portable-baseline
Scope: reusable definitions, distinctions and stable principles for planning a solution, workflow, use of an existing tool, automation, integration, application, organizational process or no-change decision.

## 1. Purpose And Authority

This file jointly owns:

```text
- definitions of core solution/workflow-planning concepts;
- distinctions between nearby concepts;
- stable principles and invariants that govern those concepts.
```

Definitions and their rules stay together here when separating them would duplicate meaning or hide important constraints.

Related responsibility boundaries:

```text
workflows:
  own repeated processes;

templates:
  own recommended exact presentation;

profiles:
  own optional specialized planning approaches;

registries:
  own Direction and Use-Case entries;

project-local owners:
  own concrete Planning Items, drafts, decisions,
  scenarios, prototypes and implementation state.
```

This file does not define:

```text
- a concrete application or managed-object runtime;
- project-specific storage, serialization or database schema;
- an App Memory model;
- exact Markdown wrapper syntax;
- project command names or permissions;
- project-local Planning Items or accepted architecture;
- one mandatory artifact sequence for every project.
```

## 2. Evidence And Decision States

Keep these states explicit:

```text
confirmed:
  explicit user statement or checked source fact;

inference:
  reasoned interpretation that still requires review;

question:
  material unknown;

decision candidate:
  option under consideration;

decision:
  explicit accepted choice with rationale;

evidence:
  checked observation from research, a test, a prototype
  or another inspectable source.
```

A template field, silence, an AI suggestion, a preset or technical plausibility must not silently promote meaning.

```text
suggestion
  ≠ decision;

risk
  ≠ proven failure;

implementation idea
  ≠ accepted architecture;

prototype candidate
  ≠ build decision;

generated explanation
  ≠ canonical documentation automatically.
```

### 2.1 Convenience-First Input

The user may provide facts, fragments, feelings, problems, risks, ideas, alternatives, questions, corrections, decisions, examples, prototype findings and implementation thoughts in any order.

The user is not responsible for knowing the correct category, artifact, concern, relation or insertion point.

AI may propose classification and placement, but material ambiguity remains visible and reviewable.

Optional delimiters or structured composition may identify review boundaries. They do not create a separate Candidate entity or prove that every marked fragment is an independent Planning Item.

## 3. Source-Linked Traceability

### 3.1 Source Message

One complete user or assistant message preserved as historical evidence.

For portable Planning Item review, every complete supporting user message is repeated under every item it supports. The relevant span is visibly highlighted while surrounding context remains.

### 3.2 Source Fragment

An addressable semantic span inside a Source Message, repository file or imported source.

A fragment improves precise mapping. It does not replace the complete supporting message in review output.

### 3.3 Source Excerpt

A literal subset shown for emphasis or compact evidence.

An excerpt may supplement the complete message and exact anchors. It is not sufficient as the only review source when the complete message is available.

### 3.4 Source Anchor

A resolvable address such as:

```text
conversation or thread identity;
turn or message identity;
file path;
heading;
line or range;
selection or fragment identity.
```

### 3.5 Source Contribution

A typed many-to-many relation describing how one Source Message or Fragment contributes to one Planning Item.

Initial reusable contribution roles:

```text
Primary;
Supporting;
Clarifying;
Correcting;
Contradicting;
Example;
Confirmation.
```

One source may contribute to several items. One item may have several sources.

Merge, split, move, rejection and supersession preserve applicable contribution relations and anchors.

`Source Idea` is not introduced. Normalized interpretation belongs in the Planning Item body; literal evidence remains source evidence.

### 3.6 Provenance

The origin and transformation history of a meaning:

```text
initial source messages/fragments/anchors;
formation and review decisions;
rename, merge, split, move and supersession mappings;
related artifacts and accepted transitions.
```

A separate `Origin` term is unnecessary when it only repeats the initial part of Provenance.

### 3.7 Source Of Truth

The authoritative owner for one content unit or region.

Source of Truth is determined per content responsibility. It is not globally one system.

## 4. Planning Item

### 4.1 Definition

A Planning Item is an addressable planning unit that preserves, reviews, relates and reuses one coherent planning meaning.

A Planning Item may represent:

```text
Goal;
Initiative;
Workstream;
Requirement;
Acceptance Criterion;
Supporting Idea;
Implementation Idea;
Question;
Risk;
Assumption;
Evidence;
Prototype Need;
Decision;
Action.
```

A Planning Item is not automatically:

```text
- a final requirement;
- an accepted decision;
- implementation work;
- a small record;
- final documentation.
```

Its role, evidence state and relationships determine how it is used.

Planning Items may have different scales. A local requirement, decision, workstream and initiative may all be valid Planning Items.

Apply relations, concerns and review at the smallest scale that actually owns the meaning. Do not force all planning into requirement-sized records or copy a parent-level concern into every child item.

### 4.2 Canonical Item Body

The Canonical Item Body is the complete authoritative description of one Planning Item.

It preserves every detail required for correct understanding and reuse, including when relevant:

```text
statement;
purpose and rationale;
examples and counterexamples;
important distinctions;
exceptions and edge cases;
acceptance detail;
dependencies and relations;
consequences;
source context;
unresolved ambiguity.
```

There is no arbitrary word, paragraph, line or screen-length limit.

Compact IDs, titles, summaries and collapsed views are navigation layers only.

### 4.3 Identity

Recommended compact identity:

```text
stable ID
+ short semantic code/name
+ optional display title.
```

Example:

```text
ITEM-120 / SEMANTICALLY-COMPLETE-ITEM
```

Identity improves reference and navigation. It does not replace the Canonical Item Body.

### 4.4 Semantic Split

Split an item when parts have independent meaning, ownership, lifecycle/status, review, acceptance, reuse, decision, action or work target.

Do not split only because the item is long or has several examples required to preserve one meaning.

Simplicity-first means the smallest sufficient structure, not the shortest text.

### 4.5 Item Relations

Use typed relations when they improve understanding or later review.

Candidate relations include:

```text
part of;
contains;
belongs to direction;
supports;
refines;
defines acceptance for;
implements;
tests;
provides evidence for;
depends on;
alternative to;
contradicts;
supersedes;
derived from.
```

A strict tree is not required.

### 4.6 Implementation Ideas

Record early implementation thoughts near the behavior, model question or concern they affect. Keep their status explicit, for example:

```text
user idea;
AI suggestion;
open alternative;
needs prototype;
accepted direction;
rejected direction.
```

Technical plausibility alone does not make an architecture decision.

An independently reusable or reviewable implementation thought is a separate Planning Item with:

```text
Item Kind = Implementation Idea
```

The target may expose an optional relation-backed `Implementation Ideas` projection.

```text
Implementation Idea
  -- implements / proposes implementation for -->
Target Planning Item
```

The projection contains links, not copied shortened bodies.

Linking an Implementation Idea does not:

```text
- accept the architecture;
- schedule implementation;
- convert the idea into a requirement;
- prove technical effectiveness.
```

### 4.7 Validation Context

A Planning Item may preserve proportional validation context when uncertainty matters:

```text
hypothesis or assumption;
risk or key situation;
prototype or test candidate;
evidence needed;
success, failure or inconclusive interpretation;
affected decision;
priority or blocking state.
```

Do not add empty validation fields mechanically.

A small validation need may stay in its item. Create a separate prototype/research artifact only when setup, execution, evidence or review has an independent lifecycle.

### 4.8 Review And Working State

A proposed item meaning is a review state, not a separate persistent `Planning Item Candidate` entity.

Possible project-level working states may include:

```text
Working;
Needs Documentation;
Documented / Integrated;
Unresolved;
Deferred;
Absorbed / Superseded;
Rejected.
```

These labels are not a mandatory universal enum.

Explicit review remains required when the active workflow requires it.

## 5. Planning Draft

### 5.1 Definition

A Planning Draft is the primary high-level planning artifact for one problem, goal, workflow, algorithm or solution direction.

It may plan:

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

A Planning Draft groups, orders, summarizes and links canonical Planning Items. Planning Items remain owners of their complete meanings.

### 5.2 Planning Item Map

A Planning Draft should provide a readable route through contributing Planning Items.

The map may contain:

```text
- logically ordered workflow items;
- cross-cutting requirements and constraints;
- questions, risks and decisions;
- separate linked Implementation Ideas.
```

The map contains links and compact context. It is not a second item ledger.

### 5.3 Full Picture Matrix

A `Full Picture Matrix` is an optional presentation section inside a Planning Draft.

It may align:

| Flow point | Scenario view | Implementation view | Questions / risks / validation | Status / follow-up |
|---|---|---|---|---|

Each cell contains concise meaning and links to complete Planning Items.

The matrix:

```text
- is a view, not a separate canonical artifact;
- does not own full question, risk or prototype bodies;
- may associate one item with several flow points;
- may associate one prototype or research task with several unknowns.
```

`Full Picture` may remain a temporary compatibility phrase for a high-level Planning Draft view. It is not a separate required file or parallel planning entity.

### 5.4 Optional Semantic Content

A Planning Draft may include, only when useful:

```text
desired result;
acceptance criteria and status;
boundaries and non-goals;
Current, Result and Action Workflows;
Planning Item Map;
Key Scenarios and other Scenario summaries;
Full Picture Matrix;
existing solutions and alternatives;
questions, risks and evidence needs;
decisions;
prototype/research links;
current conclusion and next action.
```

Omit sections that do not improve the current work.

### 5.5 Application Root Planning Draft

An Application Root Planning Draft is an optional Planning Draft scope used when one candidate application contains several independently valuable behavior lines.

It coordinates shared outcomes, constraints, workflow inventory and cross-workflow relationships.

It does not imply:

```text
- a custom application must be built;
- a managed-object runtime exists;
- separate Domain or Slice layers are required.
```

### 5.6 Branches And Detail

Create a Branch Planning Draft only when alternatives need independent planning or testing.

Create a separate detail artifact only when it has independent lifecycle, review, reuse, research, testing or opening value.

File length alone is not sufficient reason to split.

The parent keeps a useful summary and route after detail is added.

### 5.7 Two-Pass Planning

Use two different depths of review:

```text
during item formation:
  lightweight purpose, necessity, role, relation
  and obvious uncertainty check;

after a first Planning Draft exists:
  systematic review of items, item groups
  and the whole planning direction.
```

The second pass may reveal missing items, duplicates, alternatives, broader concerns or unnecessary work.

## 6. Workflow Terms

### 6.1 Current Workflow

The way work currently happens.

`Old Workflow` is a contextual alias when the current or previous process is explicitly being replaced.

### 6.2 Result Workflow

The useful desired future behavior or reality.

### 6.3 Action Workflow

The route from current state toward the desired result.

It may include:

```text
ordered actions;
dependencies;
review gates;
current/completed/next points;
file-update plans.
```

The Action Workflow is not the Result Workflow.

### 6.4 Current Reality Capture

Current Reality Capture is descriptive. It may record current workflow, explanations, user experience, strengths, actual problems, suspected risks, workarounds, existing ideas, unknowns and contradictions.

It must not silently formulate accepted future outcomes, architecture or a build decision.

It may be omitted when enough checked current context already exists.

## 7. Scenario

### 7.1 Definition

A Scenario is one coherent actor/context + goal + observable-result unit.

It may describe:

```text
entry point;
preconditions;
ordered main flow;
transitions;
branches and alternatives;
invariants;
postconditions;
acceptance;
observable outcomes;
open questions.
```

A Scenario owns behavioral composition. It does not automatically own implementation design.

### 7.2 Key Scenario

A Key Scenario is the same Scenario entity with an early-planning role.

A Scenario may be key because it is:

```text
core-value;
differentiating;
viability-critical;
high-risk;
atypical;
architecture-shaping;
existing-solution-comparison;
prototype-driving.
```

`Key` is a role or reason for early depth, not a separate object type.

### 7.3 Adaptive Depth

Scenario depth is proportional.

A Scenario may be represented as:

```text
- a short summary in a Planning Draft;
- a complete Scenario section in a Planning Draft;
- a separate linked Scenario artifact;
- a specialized project-local Scenario representation.
```

A simple application, non-application solution or narrow workflow may complete planning inside the Planning Draft.

A separate detailed-planning workspace is useful only when it reduces risk or coordination cost.

### 7.4 Scenario DATA

Scenario DATA means user-visible or scenario-relevant values required to understand or validate behavior.

It is not automatically:

```text
a domain object;
DTO;
API contract;
database schema;
UI component state.
```

For a simple or non-application solution, DATA may remain inline or may be omitted when no separate behavioral value is gained.

### 7.5 Behavior Item

A Behavior Item is one stable addressable unit of required behavior inside a Scenario.

Candidate roles include:

```text
precondition;
entry;
step;
include;
branch;
invariant;
postcondition;
acceptance;
observable outcome.
```

A Behavior Item is not automatically an implementation task or Slice.

Separate Behavior Item artifacts are optional. Use them only when independent addressability, reuse, review or change tracking is useful.

### 7.6 Optional Detailed Profile

A project may explicitly select a specialized Scenario/Domain/Slice profile.

Selecting the profile may introduce separate Scenario, DATA, Behavior, Domain and Slice artifacts.

Not selecting that profile does not make an otherwise sufficient Planning Draft incomplete.

## 8. End-To-End Workflow Integrity

`End-To-End Workflow` is the preferred term.

`End-To-End Complete Picture` is a temporary legacy alias in older routes.

An End-To-End Workflow is independently traversable:

```text
trigger or accepted input
  → every mandatory stage
  → decisions, branches, loops and review gates
  → understandable result or explicit unresolved end state.
```

Rules:

```text
- A peer workflow must not own a missing mandatory middle or completion.
- A thematic capability, model, view or terminology owner is not
  an end-to-end workflow merely because it is coherent.
- Several peer workflows are valid only when each has its own
  trigger, result and independently understandable lifecycle.
- Explicit upstream/downstream handoffs between independently
  traversable workflows are valid.
```

For a terminology, model, template or representation change, the primary review object may be that non-workflow owner. Affected workflows remain consistency checks.


## 9. Supporting Artifacts And Functional Workflows

### 9.1 Supporting Artifact

A Supporting Artifact is a model, view, terminology/principles owner, template, root summary or independently useful detail that explains or enables planning without replacing a workflow's trigger-to-result continuity.

A Supporting Artifact may be the primary review target for its own change. It is not automatically a peer End-To-End Workflow.

### 9.2 Functional Workflow

A Functional Workflow is one independently understandable and testable behavior line inside the same solution.

It is not automatically:

```text
- a competing solution branch;
- a Detailed Scenario;
- an implementation Slice;
- an End-To-End Workflow.
```

When several behavior lines together contain one mandatory trigger-to-result cycle, preserve the complete cycle in one End-To-End Workflow and treat the lines as supporting decomposition.

Create a separate Functional Workflow Draft only when the line has independent planning, review, reuse or testing value.

## 10. Concerns And Planning Attention

### 10.1 Planning Lens

A reusable perspective used to inspect planning, such as:

```text
necessity;
acceptance;
alternatives;
evidence;
risks;
prototype need;
future relevance.
```

Using a lens does not automatically create stored concern state.

### 10.2 Concern Definition

A reusable named question or direction of attention.

### 10.3 Concern Preset

A recommended set of Concern Definitions for a target kind, item kind, file type, task or domain.

A preset recommends attention. It does not:

```text
- make every concern applicable;
- create mandatory document sections;
- create target-specific concern state automatically;
- create a separate deep-work artifact automatically;
- declare a target incomplete automatically.
```

### 10.4 Concern Suggestion And Applied Concern

A Concern Suggestion is one possible Concern Definition proposed for one target.

An Applied Concern is a reviewed target-specific application.

Keep these states distinct.

One reusable Concern Definition may be applied to many targets. Every target-specific application keeps its own status, sources, summary and result.

A suggested or applied concern does not require a separate file or work artifact immediately. Create separate deeper work only when independent depth, lifecycle, review, reuse, research or testing justifies it. The parent target retains a useful summary and route.

### 10.5 Deduplication And Observability

For one target and one Concern Definition:

```text
several suggesting sources
  → one reviewed suggestion/application
  → all contributing source links preserved.
```

Derived observability may expose concrete open questions, assumptions, risks, evidence needs and deferred work.

Every indicator should drill down to concrete records. Do not replace them with one opaque quality score.

### 10.6 Correct Concern Scale

Apply a concern to the smallest target that truly owns the uncertainty, but not below its real scope.

A file-type preset may propose concerns for a file; an initiative or domain preset may propose concerns for a larger Planning Item.

Do not copy a parent-level concern into every child item merely because they are related.

## 11. Tests, Prototypes And Research

Start from uncertainty and the decision affected, not from a desired feature.

Record proportionally:

```text
hypothesis or question;
risk or key situation;
reason to investigate now;
minimum sufficient setup;
evidence to observe;
success criteria;
failure criteria;
inconclusive criteria;
affected decision;
artifact or code fate when relevant.
```

Research existing solutions before custom construction when it can materially change the decision. Research depth remains proportional.

Observed evidence updates affected items, criteria, workflows, concerns and decisions.

Implementation tests answer whether an implementation works as specified.

Solution validation answers whether the resulting workflow actually solves the intended problem. These are different review targets.

## 12. Direction And Use Case

### 12.1 Direction

A broad semantic work direction containing a topology of independently useful Use Cases.

A Direction may include sequential, optional, conditional, alternative, repeatable or independent Use Cases. It is not one mandatory universal stage list.

### 12.2 Use Case

One independently useful supported capability with an understandable trigger/input, result and owner route.

Do not turn every mandatory internal step of one coherent workflow into a peer Use Case.

Exact Direction and Use-Case entries belong in registries.

## 13. Review Discipline

Keep distinct:

```text
Review Gate:
  where review happens;

Review Object:
  what is reviewed;

Review Status:
  recorded result or state after review.
```

Choose the smallest semantically complete review object that catches the current risk.

`Primary Review Object` is the artifact or workflow whose before/after state must be reviewed to catch that risk. It may be an End-To-End Workflow or a non-workflow owner such as a principles/terminology file, Planning Draft, model, template or generated file set.

Possible review objects include:

```text
source-linked Planning Item set;
Planning Draft section;
Scenario;
workflow;
terminology/principles owner;
question/risk set;
prototype result;
generated file set;
repository diff.
```

## 14. Minimal-To-Complex Planning

Start with the smallest representation that is clear, useful and maintainable:

```text
semantic core
  → compact working representation
  → local expansion
  → linked detail or specialized profile when justified.
```

Rules:

```text
- keep related information together;
- omit empty optional sections;
- add stable identity where references or repeated updates need it;
- keep the high-level entry point after adding detail;
- apply progressive complexity to files and folders;
- do not create an artifact family in advance;
- do not require Domain, Slice or separate Scenario artifacts
  for a simple or non-application solution.
```

Planning depth is a judgment boundary, not a rigid score or universal stage sequence.

## 15. Dynamic Revision

Planning is not append-only.

When corrected or new evidence arrives:

```text
update current truth;
preserve deliberate source wording;
revisit affected Planning Items and concerns;
revisit upstream/downstream artifacts;
change representation when it no longer works;
keep a high-level entry point.
```

Deep analysis, research and prototype work must return accepted results to the owning Planning Items and Planning Draft.


## 16. Structure, Attention, Presentation And Validation

Keep these mechanisms distinct:

```text
Document Template:
  recommended document shape;

Concern Preset:
  recommended directions of attention;

View Preset:
  saved display/filter configuration over existing information;

Validation Rule:
  checked condition;

Example:
  demonstration with no rule ownership.
```

A concept may participate in several mechanisms, but their responsibilities remain explicit.

```text
template field
  ≠ confirmed requirement;

preset suggestion
  ≠ applied concern;

view
  ≠ canonical state;

validation failure
  ≠ automatic architecture decision;

example
  ≠ authority.
```

## 17. Current Recommended Canonical Set

| Concept | Recommended term | Notes |
|---|---|---|
| Complete planning meaning | Planning Item / Canonical Item Body | No arbitrary size limit |
| Main high-level planning artifact | Planning Draft | Owns organization, not item bodies |
| Compact aligned planning view | Full Picture Matrix | Optional section inside Planning Draft |
| Existing behavior | Current Workflow | `Old` only for replacement contrast |
| Desired behavior | Result Workflow | Future useful behavior |
| Route to desired behavior | Action Workflow | May include file-update work |
| Descriptive present-state understanding | Current Reality Capture | Does not accept future architecture |
| Optional planning-unit granularity | Item Scale | Use the scale that owns the meaning |
| Coherent behavior unit | Scenario | Same entity at different planning depths |
| Early critical Scenario role | Key Scenario | Role, not object type |
| Trigger-to-result workflow | End-To-End Workflow | Legacy alias: End-To-End Complete Picture |
| Source-to-item relation | Source Contribution | Typed many-to-many traceability |
| Independent technical proposal | Implementation Idea | Separate linked Planning Item |
| Optional uncertainty context | Item Validation Context | Proportional |
| Uncertain executable/observable case | Prototype / Test Candidate | May remain embedded |
| Reusable planning question | Concern Definition | Applied separately per target |
| Recommended attention set | Concern Preset | Suggestions, not mandates |
| Review location / target / result | Review Gate / Review Object / Review Status | Keep distinct |

## 18. Do Not

```text
- Do not require template-ordered user input.
- Do not treat silence or AI inference as an accepted decision.
- Do not lose complete source wording that supports meaning.
- Do not replace full-message review with excerpt-only evidence.
- Do not create Source Idea or a separate Candidate entity.
- Do not create a Planning Item for every source fragment.
- Do not treat every Planning Item as a final requirement.
- Do not compress or split an item merely for length.
- Do not copy Implementation Idea bodies into target items.
- Do not turn implementation ideas into architecture automatically.
- Do not make concern presets mandatory.
- Do not create deep-work files mechanically.
- Do not create branches for every option.
- Do not create a separate Full Picture artifact beside the Planning Draft.
- Do not split one mandatory workflow into thematic peer workflows.
- Do not force Scenario/Domain/Slice layers on simple or non-application work.
- Do not place project-specific application, storage or managed-object
  assumptions in reusable methodology.
- Do not make generated AI explanation a second canonical owner.
```
