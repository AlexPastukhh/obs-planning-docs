# Solution And Workflow Planning Principles And Terminology

Status: active reusable canonical owner
Doc version: v1.1.0-sufficient-planning-draft-contract
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
  own concrete current planning meaning, drafts, decisions,
  scenarios, prototypes and implementation state.
```

This file does not define:

```text
- a concrete application or managed-object runtime;
- project-specific storage, serialization or database schema;
- an App Memory model;
- exact Markdown wrapper syntax;
- project command names or permissions;
- project-local current planning state or accepted architecture;
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

Optional delimiters or structured composition may identify review boundaries. They do not create a separate Candidate entity or prove that every marked fragment is an independent Idea/current planning unit.

## 3. Source-Linked Traceability

### 3.1 Source Message

One complete user or assistant message preserved as historical evidence.

For portable source review, preserve enough complete supporting context to understand the resulting Idea/current meaning. Relevant spans may be highlighted while surrounding context remains available.

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

A typed many-to-many relation describing how one Source Message or Fragment contributes to an Idea, decision, requirement, Scenario or other current planning meaning when explicit traceability is useful.

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

One source may contribute to several current meanings. One current meaning may have several sources.

Merge, split, move, rejection and supersession preserve applicable source relations and anchors when the project benefits from explicit provenance.

Do not introduce a `Source Idea` entity. Normalized interpretation belongs in the appropriate Idea/current owner; literal evidence remains source evidence.

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

## 4. Idea And Historical Planning Item Boundary

Generic Idea semantics are owned by:

```text
../idea-planning-principles-and-terminology.md
../idea-review-and-planning-workflow.md
../IDEA-REVIEW-TEMPLATE.md
```

This solution/workflow family consumes that shared methodology rather than redefining a separate Application Idea type.

Use scoped Idea work when there is answer-seeking uncertainty such as a possible solution, workflow step answer, implementation direction, Scenario boundary question or other material alternative.

```text
Standard Idea Review
  → preserves current source-derived meaning
  → performs mandatory Necessity / Better-Route,
    Possible Refinement, Local Consistency and Integrated Consistency checks;

Deep Idea Planning
  → adds deliberate Idea Variants, evidence/tests,
    deeper local/integrated/combination evaluation and selection.
```

A Current Selected Variant is still an Idea-level conclusion until it is integrated into the real Workflow, Scenario, Planning Draft or other current owner.

Historical Planning Item records/IDs may remain as provenance or migration references. Planning Item is not part of the target reusable ontology and new source review must not recreate it as a universal semantic atom.

Early implementation thoughts remain Ideas until selected/integrated. Technical plausibility alone does not make an architecture decision.

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

A Planning Draft groups, orders, summarizes and links current planning meaning. Complete meanings remain owned by the appropriate current owners; scoped Ideas stay linked while unresolved or when their reasoning remains useful.

A Planning Draft may exist while solution alternatives or Scenario boundaries are still being developed. When the selected planning stage claims sufficiency, it must provide enough complete coverage for the decisions being made rather than fabricate stable Scenarios prematurely. A Full Picture Matrix remains a useful integration view when it materially improves cross-plan review, not a separate canonical artifact.

### 5.2 Current Conclusions / Related Ideas — Optional

A Planning Draft may provide a compact readable section linking contributing current owners, accepted/current conclusions and material unresolved Ideas when that improves navigation.

The section may contain:

```text
- logically ordered workflow responsibilities;
- cross-cutting requirements and constraints;
- current selected conclusions;
- questions, risks and decisions;
- linked Ideas / Idea Variants where reasoning remains material.
```

This is navigation/integration support, not a second canonical ledger or a separate `Idea Map` artifact.

### 5.3 Full Picture Matrix

A `Full Picture Matrix` is a required presentation section inside a sufficient Planning Draft.

It aligns:

| Flow point | Scenario view | Implementation view | Questions / risks / validation | Status / follow-up |
|---|---|---|---|---|

Each cell contains concise meaning and links to complete current owners or related Ideas when useful.

The matrix:

```text
- is a view, not a separate canonical artifact;
- does not own full question, risk or prototype bodies;
- may associate one current owner or Idea with several flow points;
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
Current Conclusions / Related Ideas;
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

### 5.7 Two-Depth Idea Review

Use the shared Idea methodology at the depth actually required:

```text
Standard Idea Review
  → default lightweight extraction/review with mandatory checks;

Deep Idea Planning
  → deliberate Variants, evidence/tests and deeper integration work.
```

At either depth, material local findings must be considered again after integration into the whole Workflow/Planning Draft. Best local answer is not automatically the best integrated solution.

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

A Scenario is one coherent motivated actor/context + Need/Goal + observable-result unit.

Planning meaning may include proportionally:

```text
Actor / Starting Context;
Starting Situation / State;
Motivational Trigger;
Need / Motivation;
Goal / Intent;
Application Entry Point;
preconditions;
ordered Main Flow;
Actor Understanding / Plan;
transitions;
branches and alternatives;
invariants;
postconditions / observable outcomes;
acceptance;
Scenario DATA;
Behavior Items;
open questions.
```

Motivational Trigger explains why the Actor starts acting; Application Entry Point explains where/how the application interaction starts. They are not the same concept.

A successful Scenario result should meaningfully satisfy or resolve the Scenario Need. A distinct Need is an important boundary lens but is not enough by itself to force a separate Scenario. A separate Scenario normally also has a meaningful observable result; independent re-entry, reuse, recurrence, wait/handoff and separate testability are supporting signals for ambiguous cases, not mandatory checklist fields.

A Scenario owns behavioral composition. It does not automatically own implementation design.

When useful, one early `Spine Scenario` may temporarily provide a concrete representative traversal while real Scenario boundaries are still being discovered. Spine is scaffolding, not a permanent entity layer, and no canonical `Spine Unit` is introduced.

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

Scenario depth is proportional. Do not claim a Scenario is complete before its relevant behavior/boundaries are sufficiently understood.

```text
Key Scenario:
  complete section in the Planning Draft
  or one linked complete Scenario owner;

other Scenario:
  short summary;
  complete inline section;
  separate linked artifact;
  specialized project-local representation.
```

A simple application, non-application solution or narrow workflow may complete planning inside the Planning Draft when its current behavior/decision coverage is sufficient.

A separate detailed-planning workspace is useful only when it reduces risk or coordination cost.


Actor Understanding / Plan is one proportional analytical block, not several mandatory top-level sections. It may distinguish Initial Understanding, Goal Understanding, Action/Path Understanding, Important Unknowns, Required Understanding and Current Plan/Expectation when material.

Main Flow remains an ordered behavioral flow. A material step may additionally capture Surface/Window, relevant DATA/information, Actor Understanding, Desired User Response, System Response/State Change, Presentation Requirement, Visual Requirement and Result/Transition. Do not expand every step mechanically.

Scenario-wide presentation/visual meaning should be a compact optional cross-cutting block only when it genuinely spans several steps; otherwise keep it near the relevant behavior.

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

### 7.7 Optional Application-Level Views

`Window / Surface Map` is an optional application-level navigation/space view. Create and maintain it only when the specific application materially benefits from a cross-Scenario view of reusable interaction surfaces **and** there is an explicit planning decision to use that view. Scenario-local Surface/Window references are sufficient otherwise. Do not create a mandatory Surface Map merely because application planning exists.

A `Surface` may represent a window, page/screen, panel, dialog, embedded surface or another meaningful interaction context. The Map owns cross-Scenario spatial/navigation relationships; it does not duplicate complete Scenario behavior.

`Core Loop` is an optional recurring-value view: a genuinely recurring behavioral sequence through which the actor repeatedly obtains important application value. A sequence of windows is only a current manifestation of the loop, not its definition. Do not create a separate Core Loop view when recurring/frequent Scenario-chain notation already provides the needed planning value.

Neither view requires a separate reusable file/template until independent reuse/lifecycle proves one useful.

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

A file-type preset may propose concerns for a file; an initiative or domain preset may propose concerns for a larger current planning owner.

Do not copy a parent-level concern into every child owner merely because they are related.

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

Observed evidence updates affected Ideas/current conclusions, criteria, workflows, concerns and decisions.

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
source-linked Ideas/current conclusions;
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
revisit affected Ideas/current owners and concerns;
revisit upstream/downstream artifacts;
change representation when it no longer works;
keep a high-level entry point.
```

Deep analysis, research and prototype work must return accepted results to the owning current artifacts and Planning Draft.


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
| Cross-cutting answer-seeking work | Idea | Shared generic methodology; not a universal owner of facts/decisions/Scenarios |
| Alternative answer to one Idea | Idea Variant | Current Selected Variant remains subject to integration review |
| Main high-level planning artifact | Planning Draft | Owns organization and current direction |
| Compact aligned planning view | Full Picture Matrix | Optional/useful integration view; not a separate artifact |
| Existing behavior | Current Workflow | `Old` only for replacement contrast |
| Desired behavior | Result Workflow | Future useful behavior |
| Route to desired behavior | Action Workflow | May include file-update work |
| Descriptive present-state understanding | Current Reality Capture | Does not accept future architecture |
| Coherent behavior unit | Scenario | Motivated Need/Goal + meaningful result |
| Early concrete Scenario scaffold | Spine Scenario | Optional temporary scaffold; no Spine Unit ontology |
| Early critical Scenario role | Key Scenario | Role, not object type |
| Trigger-to-result workflow | End-To-End Workflow | Legacy alias: End-To-End Complete Picture |
| Scenario-visible/relevant values | Scenario DATA | Not automatically Domain/API/storage state |
| Stable required behavior inside Scenario | Behavior Item | Downstream bridge; not automatically a Slice |
| Optional technical proposal | Implementation Idea | Ordinary scoped Idea work until selected/integrated |
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
- Do not create an Idea for every source fragment.
- Do not treat every Idea as a final requirement/decision.
- Do not invent criticism/refinements merely to populate review fields.
- Do not copy unresolved Idea meaning into current owners as if selected.
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
