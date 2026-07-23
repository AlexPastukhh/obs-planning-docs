# Solution And Workflow Planning Principles

Status: provisional reusable principles
Doc version: v0.10.0-planning-item-formation-sync
Scope: stable guidance for source-linked Planning Items, end-to-end Complete Pictures, supporting artifacts, Planning Drafts, concern review, alternatives, tests and evidence-driven revision before optional detailed implementation planning.

## 1. Purpose

Planning should reduce the risk of:

```text
solving the wrong problem;
losing user meaning or source wording;
accepting the first idea too early;
reviewing the wrong object;
forcing detail or artifacts before they help;
compressing away required meaning;
treating suggestions as decisions;
creating documentation complexity that does not improve thinking.
```

The method is an orientation toward a useful result, not a rigid ceremony.

## 2. Evidence Boundary

Keep these states distinct:

```text
confirmed:
  explicit user statement or checked source fact;

inference:
  reasoned interpretation requiring review;

question:
  important unknown;

concern suggestion:
  possible direction of attention for one target;

decision candidate:
  option under consideration;

decision:
  explicit accepted choice with rationale;

evidence:
  observation from a test, prototype or checked source.
```

Silence, a template field, an AI proposal or a preset must not silently promote meaning.

## 3. Source-Linked Traceability

Important planning claims remain linked to the source material that caused them.

Preserve complete source messages when they are evidence for an item, correction, decision or uncertainty. A normalized interpretation may be added but must not erase literal wording.

Use typed many-to-many contributions:

```text
one Planning Item
  ← several Source Messages / Fragments;

one Source Message / Fragment
  → several Planning Items;

contribution roles
  → Primary, Supporting, Clarifying, Correcting,
    Contradicting, Example or Confirmation.
```

For portable review, repeat each complete supporting user message under every item it supports and highlight relevant spans without removing surrounding context. Exact anchors supplement the complete message; they do not replace it.

`Source Idea` is not introduced. Interpretation belongs in the Planning Item body; source evidence remains source evidence.

## 4. Convenience-First Input

The user may provide facts, fragments, feelings, problems, risks, ideas, alternatives, questions, corrections, decisions, examples, prototype findings and implementation thoughts in any order.

The user is not responsible for knowing the correct category, artifact, concern, relation or insertion point.

AI may propose classification and placement, but ambiguity that materially affects the result remains visible and reviewable.

Optional structured composition or user delimiters may identify review boundaries. They do not create a separate Candidate entity or prove that every marked fragment is an independent Planning Item.

## 5. Purposeful Planning Items

A reviewed Planning Item should make visible, when relevant:

```text
what it states;
why it exists;
what larger result/direction it belongs to;
its role and evidence status;
important relations;
whether it is requirement, support or implementation thought;
important ambiguity.
```

Do not create an item for every source fragment. Do not leave independently meaningful work hidden only inside synthesis prose.

## 6. Planning Items May Have Different Scales

A Planning Item may represent a local requirement, a decision, a workstream or an initiative.

Apply relations and concerns at the scale that owns the meaning:

```text
application longevity
  → initiative/application-level item;

local button wording
  → local item, without inheriting every initiative concern.
```

Do not force all planning into requirement-sized records.

## 7. Semantic Completeness

A Planning Item has no arbitrary word, paragraph, line or screen-length limit.

Its Canonical Item Body includes every detail required for correct understanding and reuse, including examples, distinctions, exceptions, rationale, acceptance detail, dependencies and relevant source context.

Compact IDs, titles, summaries and collapsed UI views are navigation layers only.

The detailed document-ready explanation produced during formation may be the accumulating Canonical Item Body. A final review block should reuse/materialize that complete meaning rather than generate a second shorter paraphrase.

### Semantic Splitting

Split an item when parts have independent meaning, owner, lifecycle/status, review, acceptance, reuse, decisions, actions or work targets.

Do not split only because the item is long.

Simplicity-first means the smallest sufficient structure, not the shortest possible text.

## 8. Item-Backed Full Picture

The Full Picture / Planning Draft is a high-level synthesis built from reviewed Planning Items.

It may combine:

```text
linked item blocks;
summaries;
groupings;
ordinary explanatory prose;
links to independent detail.
```

Important meaning introduced outside an item should either:

```text
link to a supporting item;
be marked as inference;
or become a new item candidate.
```

The Full Picture does not replace canonical item bodies. Items remain inspectable independently.

A parent Full Picture may reference child Full Pictures in their own canonical homes. Child pictures own complete local meaning; the parent keeps a readable summary and route. Significant Full Picture statements trace to contributing Planning Items, source material or an explicit inference/question status.

## 9. Two-Pass Planning

Use two different depths of review.

```text
During item creation:
  lightweight purpose, necessity, role, relation
  and obvious concern check.

After a first Full Picture exists:
  systematic review of items, item groups
  and the whole picture.
```

The second pass may reveal missing items, duplicates, alternatives, broader concerns or unnecessary work.

## 9A. Portable And Application-Native Formation Modes

Reusable item formation supports both:

```text
portable Markdown mode
  → complete review blocks
  → explicit acceptance
  → full updated portable ledger;

application-native mode
  → structured proposal review
  → explicit acceptance
  → confirmed Planning Item is immediately
    a managed Reference Object of category Planning Item.
```

Portable mode remains a supported fallback/interoperability path.

Later Markdown placement, definition-location assignment or semantic-home assignment changes durability/ownership/location state. It does not create a second Planning Item.

Proposed/candidate is a review state, not a separate semantic entity.


## 10. Planning Lens And Concern Lifecycle

Keep the lifecycle distinct:

```text
Planning Lens
  → optional Concern Definition match
  → Concern Suggestion for one target
  → applicability review
  → optional Applied Concern
  → optional Concern Work Target
  → result returned to item and Full Picture.
```

A lens check may end with `not applicable` or `already covered` without creating an Applied Concern.

## 11. Presets Recommend, They Do Not Mandate

A Concern Preset recommends possible attention.

It does not automatically:

```text
make every concern applicable;
create mandatory document sections;
create Applied Concerns;
create deeper-work artifacts;
declare the target incomplete.
```

Several independent presets may be considered together.

If several sources suggest the same Concern Definition for one target, review it once and preserve all source links.

Nested preset inheritance is not assumed until explicitly designed.

## 12. Correct Concern Scale

Apply a concern to the smallest target that truly owns the uncertainty, but not below its real scope.

A file-type preset may propose concerns for a file; an initiative/domain preset may propose concerns for a large Planning Item.

Do not copy a parent-level concern into every child item merely because they are related.

## 13. Concern Definitions Are Reusable; Applications Are Separate

One Concern Definition may be reused across many targets.

Each target-specific Applied Concern keeps its own:

```text
status;
summary;
sources;
coverage relation;
work target;
result.
```

Do not merge target-specific results into the reusable definition.

## 14. No Premature Deep-Work Materialization

A suggested or applied concern does not require a separate object or file immediately.

Create a Concern Work Target only when independent depth, lifecycle, review, reuse, research or testing justifies it.

The parent target retains a useful summary, relationship and entry point.

## 15. Structure, Attention, Presentation And Validation Are Separate

```text
Document Template:
  recommended document shape;

Concern Preset:
  recommended directions of attention;

View Preset:
  display/filter configuration over existing records;

Validation Rule:
  checked condition.
```

One concept may participate in several mechanisms, but the roles remain explicit.

## 16. Review Object Discipline

Keep distinct:

```text
Review Gate:
  where review happens;

Review Object:
  what is reviewed;

Review Status:
  result/state after review.
```

Pick the smallest review object that catches the current risk. Possible objects include item sets, source mappings, concern suggestions, Applied Concerns, draft sections, generated files, archives, diffs and prototype results.

## 16A. End-To-End Complete Picture Integrity

A Complete Picture is a workflow integrity boundary, not a thematic folder, model or capability label.

```text
trigger / accepted input
  → mandatory stages
  → decisions, branches, loops and review gates
  → understandable result or explicit unresolved end state
```

Rules:

```text
- A Complete Picture must be independently traversable from trigger to result.
- A peer Complete Picture must not own a missing mandatory stage required to finish the basic cycle.
- When start, mandatory middle and completion were split by topic, combine them into one end-to-end picture.
- Keep models, terminology, views, root summaries, capability slices and shared infrastructure as supporting artifacts unless they have an independent trigger-to-result lifecycle.
- A supporting artifact may still be the Primary Review Object for its own local change; affected end-to-end workflows remain consistency checks.
- Several Complete Pictures are valid only when each has its own trigger, result and independently understandable lifecycle.
- Optional integrations and explicit upstream/downstream handoffs do not by themselves make pictures parallel fragments.
```

The Application Root / Full Picture coordinates shared identity, constraints, item relationships and workflow inventory. It is not automatically a child Complete Picture.

## 16B. Planning Item Validation Signals

Planning Items should preserve uncertainty that matters for later evidence and decisions.

When proportional to the item, keep near it:

```text
hypothesis / assumption;
risk or key situation;
prototype / test candidate;
evidence needed;
success / failure / inconclusive interpretation;
affected decision;
priority / blocking status.
```

Rules:

```text
- Do not fill validation fields mechanically or require them on every item.
- A hypothesis is not a confirmed requirement.
- A risk is not evidence that failure already occurs.
- A prototype/test candidate is not a build decision or accepted architecture.
- Prefer a concrete risky or key situation over a vague instruction to test the feature.
- Preserve relevant validation signals through update, rename, merge, split and move operations.
- When evidence resolves or corrects a signal, update the item, concern and every affected criterion, workflow or decision.
- Create a separate prototype artifact only when setup, evidence, review or execution has an independent lifecycle.
```

## 16C. Direction And Use-Case Topology

A broad Direction owns a topology of independently useful whole use cases.

```text
Direction
  → may contain sequential, partly sequential, optional,
    conditional, alternative, repeatable or independent use cases.
```

A use-case inventory describes supported capabilities, not one universal mandatory route.

Do not turn every mandatory internal step of a coherent workflow into a peer use case. A separate use case needs an independently useful trigger/result, owner route, review or lifecycle.

When a solution introduces an auxiliary layer—documentation system, framework, planning tool, automation or codebase tooling—treat that layer proportionally as a user-facing solution with its own use-case inventory.

Exact Direction and Use-Case registries are separate registry-owner work; these principles define only the stable topology boundary.

## 16D. Concern And Item Observability

Observability is a derived projection over concrete records.

It may expose:

```text
unreviewed suggestions;
open questions;
unverified assumptions;
risks;
evidence or prototype/test needs;
blocked/deferred work;
resolved work.
```

Every indicator should drill down to concrete targets/records.

Common lifecycle state, concern-type-specific assessment and derived view labels remain distinct. Do not replace them with one opaque quality score.


## 17. Minimal-To-Complex Artifact Design

Start with the smallest representation that is clear, useful and maintainable:

```text
semantic core
  → compact working representation
  → local expansion
  → linked detail or specialized view when justified.
```

Rules:

```text
keep related information together;
omit empty optional sections;
prefer simple headings/blocks before large tables;
add stable identity where references or repeated updates need it;
keep the high-level entry point after adding detail;
apply progressive complexity to files and folders too;
do not create an artifact family in advance.
```

## 18. Current Reality Capture

Current Reality Capture is descriptive. It may record current workflow, explanations, user experience, strengths, actual problems, suspected risks, workarounds, existing ideas, unknowns and contradictions.

It must not silently formulate accepted future outcomes, architecture or a build decision.

## 19. Planning Draft

After enough source/current context exists, create an item-backed Planning Draft for one current planning direction.

Its optional semantic core may include:

```text
desired result;
acceptance criteria and status;
boundaries and non-goals;
current/result/action workflows;
Planning Items and relationships;
concern coverage;
existing solutions and alternatives;
decisions;
tests and evidence;
branches;
current conclusion and next action.
```

Omit sections that do not improve the current work.

## 20. Application Root And Functional Workflows

When one application contains several independently valuable behavior lines, use one root draft to coordinate shared meaning.

Create a separate Functional Workflow Draft only when it has independent outcome, analysis, review or testing value. It is not automatically an End-To-End Complete Picture.

When several sibling behavior files together contain one mandatory trigger-to-result cycle, the parent must still own the complete end-to-end workflow and the children remain supporting slices.

Functional workflows are siblings within one solution; they are not competing branches.

## 21. Solution Branching

Create a branch only when alternatives require independent planning or testing.

The parent records:

```text
decision point;
reason for separate analysis;
selection/rejection criteria;
assumptions and required evidence;
branch inventory;
comparison and final decision.
```

## 22. Details And File Creation

Keep information together by default.

Create a separate detail artifact when it has independent value or the parent has become hard to use. File length alone is not a sufficient reason; use actual readability, lifecycle, ownership, review and tool behavior.

## 23. Literal Files And Managed References

Reusable methodology may distinguish:

```text
embedded content;
reference-only link;
ordinary unlinked text.
```

Choose by readability, review and source-of-truth needs.

Do not choose final wrapper syntax here. AI-generated markers or proposed regions do not create canonical object state without review.

## 24. Implementation Thoughts

Record early implementation thoughts near the behavior, model question or concern they affect.

Keep their status explicit:

```text
user idea;
AI suggestion;
open alternative;
needs prototype;
accepted direction;
rejected direction.
```

Technical plausibility alone does not make an architecture decision.

## 25. Tests And Prototypes

Start from uncertainty and the decision affected, not from a desired feature.

A prototype or test should state, proportionally:

```text
hypothesis or question;
risk/key situation;
reason to test now;
minimum sufficient setup;
evidence to observe;
success criteria;
failure criteria;
inconclusive criteria;
affected decision;
code/artifact fate when relevant.
```

A prototype may remain embedded or become separate when it has independent lifecycle, setup, evidence or dependent decisions.

Observed evidence updates affected items, concerns, criteria, workflows, branches and decisions.

## 26. Dynamic Revision

Planning is not append-only.

When corrected or new evidence arrives:

```text
update current truth;
preserve deliberate user wording;
revisit affected items and concerns;
revisit upstream/downstream artifacts;
change representation when it no longer works;
keep a high-level entry point.
```

## 27. Results Return To The Planning Picture

Deep analysis, research and prototype work must not remain isolated.

Accepted results update:

```text
the Applied Concern;
the owning Planning Item;
the Full Picture when shared understanding changes;
related Decisions and Actions.
```

## 28. Structured Source And AI Explanation

Canonical working sources are structured drafts, canonical Planning Items and other explicitly owned artifacts.

AI responses may provide reading views and proposed deltas. They do not become canonical documentation automatically.

## 29. Entry Into Detailed Implementation Planning

Detailed scenario/domain/slice/implementation planning becomes useful when enough of the following are stable:

```text
desired outcome;
criteria;
selected candidate workflow;
valuable functional workflows;
major constraints/integrations;
critical assumptions/evidence;
remaining known risks.
```

This is a judgment boundary, not a rigid gate.

## 30. Do Not

```text
- Do not require template-ordered input.
- Do not treat silence as evidence promotion.
- Do not lose complete source wording that supports meaning.
- Do not replace full-message review with excerpt-only presentation.
- Do not create Source Idea or a separate Planning Item Candidate entity.
- Do not treat every source fragment as an item.
- Do not treat every item as a final requirement.
- Do not compress an item until examples or distinctions are lost.
- Do not split an item only because it is long.
- Do not treat Concern Suggestions as Applied Concerns.
- Do not make preset concerns mandatory.
- Do not create concern work files mechanically.
- Do not confuse Review Object and Review Status.
- Do not create a branch for every option.
- Do not treat functional workflows as branches.
- Do not create empty files/folders in advance.
- Do not turn implementation thoughts into architecture automatically.
- Do not put concrete application schema/storage decisions in reusable methodology.
- Do not choose exact wrapper syntax in reusable principles.
- Do not make AI explanation a second canonical source.
- Do not remove portable mode merely because application-native mode exists.
- Do not recreate an already managed application-native Planning Item during later documentation placement.
- Do not split one mandatory trigger-to-result workflow into peer Complete Pictures by topic.
- Do not turn an item hypothesis, risk or prototype candidate into a confirmed requirement or architecture decision.
```
