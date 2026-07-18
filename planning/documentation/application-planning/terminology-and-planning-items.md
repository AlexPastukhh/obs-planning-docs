# Terminology And Planning Items

Status: provisional reusable terminology draft / needs review
Doc version: v0.3.0-end-to-end-picture-and-item-validation
Language: Russian working draft
Scope: shared terminology for source-linked planning, Planning Items, end-to-end Complete Pictures, supporting artifacts, concern review, documentation workspace, navigation, Markdown/object bridge, chat workspace and file updates.

## 0. Purpose And Authority

This file owns working names and conceptual distinctions used by reusable planning methodology and project-local drafts.

```text
When a source-linked Planning Item explicitly corrects older prose,
the reviewed item-level correction wins until the reusable family is revised.
```

This file does not finalize concrete project schema, storage architecture, wrapper syntax or UI controls.

## 1. Core Planning Artifacts

### 1.1 Planning Draft

**Status:** primary user-facing term.

Planning Draft is the main pre-detailed-planning artifact for one problem, goal, desired reality, workflow, algorithm or solution direction.

It may contain:

```text
- source-reality references;
- reviewed Planning Items;
- desired/result workflow;
- current/old workflow;
- action workflow or roadmap;
- criteria and boundaries;
- questions and concern coverage;
- alternatives and branches;
- decisions;
- tests and evidence;
- current conclusion.
```

`Problem Draft`, `Workflow Draft` and `Algo Draft` may be contextual aliases. Do not make them competing canonical artifact types without a real semantic difference.

### 1.2 Full Picture

Full Picture is the high-level current synthesis of a Planning Draft.

```text
Planning Items:
  canonical planning bricks;

Full Picture:
  readable organization and synthesis of those bricks.
```

The Full Picture may combine item links, summaries, groupings and explanatory prose. It must not introduce important unsupported meaning silently.

### 1.3 Application Root Planning Draft

A Planning Draft that coordinates several valuable behavior lines of one candidate application.

It owns:

```text
application identity;
shared outcomes and criteria;
functional-workflow inventory;
cross-workflow relationships;
shared concepts, constraints and non-goals;
actual competing solution branches;
coordination and selection.
```

### 1.4 Functional Workflow Draft

One independently understandable and testable behavior line inside the same application or solution.

It is not automatically:

```text
- a solution branch;
- a detailed scenario;
- an implementation slice;
- an End-To-End Complete Picture.
```

When several Functional Workflow Drafts together contain one mandatory trigger-to-result cycle, the parent must preserve the complete end-to-end workflow and the children remain supporting slices.

### 1.5 Branch Planning Draft

One independently planned alternative created after a real divergence decision. The parent Planning Draft owns the reason for branching, comparison and final selection/rejection.

### 1.6 Detail Artifact

A linked artifact that owns independently useful detail. Create it only when the detail has its own lifecycle, review, reuse, opening pattern, change rate, research or testing value.

### 1.7 End-To-End Complete Picture

**Status:** accepted reusable planning distinction.

One independently traversable workflow picture that:

```text
starts from a trigger or accepted input;
shows every mandatory stage;
shows decisions, branches, loops and review gates;
reaches an understandable result or explicit unresolved end state;
does not require a peer Complete Picture to supply a missing mandatory stage.
```

A thematic capability slice is not a Complete Picture merely because it is coherent. If one peer owns the start, another the mandatory middle and another the required completion, they are fragments of one workflow.

Several Complete Pictures are valid only when each has its own trigger, result and independently traversable lifecycle.

### 1.8 Primary Review Object

The smallest semantically complete artifact or workflow whose before/after state must be reviewed to catch the current risk.

For workflow changes this is normally an End-To-End Complete Picture. For terminology, model or representation changes it may be the non-workflow owner itself, while affected end-to-end workflows remain required consistency checks.

### 1.9 Supporting Artifact

A model, view, terminology owner, template, root summary, capability/detail artifact or shared-infrastructure owner that explains or enables a workflow without replacing its trigger-to-result continuity.

A Supporting Artifact may be the Primary Review Object for its own local change. It is not automatically a parallel Complete Picture.

## 2. Workflow Terms

### Result Workflow

The useful desired future behavior or reality inside a Planning Draft.

### Current Workflow / Old Workflow

The way work currently happens. `Old Workflow` is useful when the current or previous process is explicitly being replaced.

### Action Workflow

The route from current state toward the desired Result Workflow.

It may include:

```text
ordered actions;
dependencies;
review gates;
current/completed/next points;
file-update plans.
```

Action Workflow is not the Result Workflow.

### Goal Map

A structured map of a goal, subgoals, steps, dependencies and checks.

### Detailed Scenario

A later, more concrete behavior artifact created when the Planning Draft is sufficiently clear.

## 3. Planning Item Terms

### 3.1 InformationItem

General information unit in app memory. It may represent a note, source excerpt, question, answer, decision, Planning Item, action entry, linkable content or another reusable unit.

### 3.2 Planning Item

An addressable planning unit used to preserve, review, relate and reuse one coherent planning meaning.

A Planning Item may represent work at different scales:

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
- final documentation;
- a confirmed requirement;
- a decision;
- a small or short record.
```

Its role, evidence status and relationships determine how it is used.

When it improves later review or evidence gathering, a Planning Item may also preserve optional Item Validation Context. Do not add it mechanically or treat it as a universal schema.

### 3.3 Planning Item Identity

Recommended compact identity:

```text
stable numeric ID
+ short semantic code name
+ optional display title/summary
```

Example:

```text
ITEM-120 / SEMANTICALLY-COMPLETE-ITEM
```

Compact identity supports navigation. It does not replace the Canonical Item Body.

### 3.4 Canonical Item Body

The complete authoritative description of one Planning Item.

It may contain as much text as required to preserve:

```text
statement;
purpose/rationale;
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

### 3.5 Semantic Item Split

Split an item when parts have independent meaning, ownership, lifecycle/status, review, acceptance, reuse, decisions, actions or work targets.

Do not split only because the item is long or contains several necessary examples.

### 3.6 Planning Direction

A larger target, outcome or direction to which an item belongs. It may be another Planning Item, a Planning Draft, a file or another stable target.

### 3.7 Item Kind And Item Scale

`Item Kind` describes semantic role. `Item Scale` is an optional candidate for distinguishing local, workstream and initiative scope when kind alone is insufficient.

Exact vocabularies remain open for simplification through usage.

### 3.8 Item Relations

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

Relations form a typed graph; a strict tree is not required.

### 3.9 Attached Item

A Planning Item or InformationItem linked to a heading, section, file, draft, chat fragment or action step.

### 3.10 Key Point

A compact statement that explains:

```text
what the local point says;
what role it plays in the parent plan;
why it matters;
relevant previous/next relationships.
```

### 3.11 Item Validation Context

Optional planning information preserved with a Planning Item when uncertainty, risk or a key situation matters:

```text
hypothesis / assumption;
risk or key situation;
prototype / test candidate;
evidence needed;
success / failure / inconclusive interpretation;
affected decision;
priority / blocking status.
```

It is proportional, not mandatory. Empty fields are omitted.

```text
hypothesis
  ≠ confirmed requirement;

risk
  ≠ proven failure;

prototype / test candidate
  ≠ architecture or build decision.
```

### 3.12 Prototype / Test Candidate

A concrete uncertain, risky or key situation that may need minimum sufficient execution or observation before an affected item, workflow, criterion or implementation direction can be accepted confidently.

The candidate may remain embedded in its Planning Item. Create a separate Prototype Plan only when the experiment has independent setup, evidence, review or execution lifecycle.

## 4. Concern And Planning-Deepening Terms

### 4.1 Planning Lens

A reusable perspective used to inspect planning, such as necessity, acceptance, alternatives, evidence, risks, prototype need or future relevance.

Using a lens does not automatically create a stored concern.

### 4.2 Concern Definition

A reusable named question or direction of attention.

Example:

```text
CONCERN / FUTURE-RELEVANCE

Will this solution remain useful,
and what conditions could invalidate the need?
```

### 4.3 Concern Preset

A recommended set of Concern Definitions for a target kind, item kind, file type, task or domain.

Several independent presets may be considered together. Nested preset inheritance remains an open design question.

A preset recommends attention. It does not:

```text
- make every concern applicable;
- create mandatory file sections;
- create an Applied Concern automatically;
- create a deep-work artifact automatically;
- declare the target incomplete automatically.
```

### 4.4 Concern Suggestion

One Concern Definition proposed for one target by a preset, a rule, an AI interpretation or manual user selection.

A Concern Suggestion is not yet an Applied Concern.

Possible review dispositions include:

```text
Pending Review;
Apply;
Not Applicable;
Already Covered;
Covered At Parent Level;
Covered At Full-Picture Level;
Review Deferred.
```

The exact stored vocabulary remains open.

### 4.5 Applied Concern

One reviewed Concern Definition applied to one concrete target.

It owns target-specific state, such as:

```text
current summary;
status;
source presets/manual source;
coverage relationship;
optional work target;
result.
```

Candidate statuses include:

```text
Open;
Deferred;
Needs Separate Work;
Resolved.
```

Different targets have different Applied Concerns even when they reuse the same Concern Definition.

### 4.6 Concern Work Target

A Reference Object, Documentation File or stable File Location used for independently useful deeper work on an Applied Concern.

Create it only when a separate lifecycle, review, reuse, research or testing surface is justified.

### 4.7 Concern Source

The preset, file-type recommendation, item-kind rule, AI proposal or manual action that proposed/applied the concern.

Concern Sources are provenance. They are not evidence supporting the concern's conclusion.

### 4.8 Concern Deduplication

For one target and one Concern Definition:

```text
several suggesting sources
  → one reviewed suggestion/application
  → all contributing source links preserved
```

Similar but non-identical Concern Definitions require review rather than automatic merging.

## 5. Guidance Mechanisms

### Document Template

Recommended shape of a document. It may define headings, fields and optional expansion points.

### Concern Preset

Recommended directions of attention. It does not define document shape.

### View Preset

Saved configuration for displaying already existing related objects or records.

It does not create objects, apply concerns or change canonical content.

### Validation Rule

A condition checked against an artifact or state.

It is not automatically a concern or a template section.

### Example

A demonstration of possible content or behavior. It owns no rule.

## 6. Source And Evidence Terms

### Source Excerpt

Literal fragment of user text, assistant text, repository file, draft, imported file or other source supporting an item, concern or decision.

One item may have several excerpts; one excerpt may support several items.

### Source Anchor

Address of a Source Excerpt: chat turn, file path, heading, line range, object ID, selection range or imported fragment ID.

### Provenance

Origin and transformation history of content: excerpts, anchors, chat turns, review decisions and related artifacts.

### Origin

Creation or first-attachment context of an item/object. It is not the same as Source of Truth.

### Source of Truth

Authoritative owner for one content unit or region. Source of Truth is per content/region, not globally one system.

## 7. Markdown And App-Memory Terms

### Markdown File

Real repository documentation readable by humans and AI without the app.

### App Memory

Application storage/index for items, objects, relations, dependencies, review state, workspaces and source-of-truth metadata.

### Hardwritten Region

Markdown region whose canonical content is owned by the Markdown file.

### Object-backed Region

Markdown region whose visible text is materialized from an app object or InformationItem.

### Proposed Object Region

Region that proposes new canonical object state and requires explicit review before creation.

### Snapshot

Captured textual state at one time. It may become stale.

### Materialized View

Generated readable representation of app memory or object-backed content.

### Live Reference

Reference that resolves to current target content.

### Transclusion

Insertion of referenced content into another file, draft or app view while preserving its source relationship.

### Marker / Tag / Wrapper

Machine-readable Markdown indications. Reusable methodology defines concepts but not final syntax.

## 8. Reference And Navigation Terms

### Reference Object

Preferred user-facing term in the Documentation Workbench project for independently managed and reusable documentation content.

This is project-influenced working terminology; reusable methodology does not mandate one concrete class/storage model.

### Reference Target

The addressable target of a reference, such as:

```text
Reference Object;
Documentation File;
stable File Location.
```

Target identity and relation meaning are separate.

### Navigation

Ability to move through and understand files, sections, parent plans, related items, dependencies and source anchors.

### Selected File Navigation

Navigation inside the currently open file.

### Parent Draft Navigation

Navigation showing where the current file, section or work target belongs in a larger Planning Draft.

### Roadmap Navigation

Navigation through previous, current and next points, dependencies and status.

## 9. Workspace And Chat Terms

### Workspace

Bounded working context containing relevant history, items, drafts, files, objects and review state.

### Chat Workspace

Workspace whose primary current boundary is one chat. Multi-chat workspace remains a future option.

### Conversation History

Immutable stored sequence of user and assistant turns.

### Turn

One user message and, when present, the assistant response following it.

### Raw Note (`RN`)

Literal user-created annotation attached to the nearest preceding semantic fragment. It is not interpreted, promoted or rewritten automatically.

### Deferred Attention Marker (`DAM`)

Literal user-created marker that something may need future attention. It is not itself a question, reminder or Applied Concern.

### Action Log

Structured record of actions actually performed or operational changes actually made.

A decision, proposal or future next step does not become an Action Log Entry merely because it was discussed. It may be linked as rationale when useful.

### Documentation Status

State describing whether source/chat material has been documented, needs documentation, is not worth documenting, is superseded or remains unresolved.

### Answer Change Set

Structured delta associated with an AI response. Confirmed minimum:

```text
Added Action Log Entries;
Added Planning Items.
```

Mere references to existing items/actions are not additions.

### Template-Linked AI Response

Stored historical AI response shaped by a response template and containing resolvable links to important referenced targets.

The response is not canonical documentation automatically. Historical targets may become stale; no automatic repair or version pinning is assumed.

## 10. Review Terms

### Review Gate

Stage where review occurs.

### Review Object

Concrete thing being reviewed.

### Review Status

State/result recorded after review.

Do not confuse these three concepts.

Review objects may include:

```text
source-linked item set;
source excerpt mapping;
draft section;
workflow draft;
concern suggestion set;
Applied Concern;
generated file;
object-creation proposal;
replacement archive;
repository diff;
prototype result.
```

### Draft Review / File Review / Commit Diff Review

```text
Draft Review:
  meaning-level review;

File Review:
  review of literal file content;

Commit Diff Review:
  review of repository transition before commit.
```

## 11. File Update And Archive Terms

### File Update Plan

Ordered plan for changing repository files. It is part of an Action Workflow when repository changes are required.

### Update Step

One ordered step inside a File Update Plan.

### Replacement Archive

Package containing complete replacement files, source/base metadata and apply instructions.

### Archive Apply Assistant

Deferred tooling direction for applying a verified package, opening diff review and supporting recovery. It is not current methodology behavior.

## 12. Current Recommended Canonical Set

| Concept | Recommended term | Notes |
|---|---|---|
| Main pre-detailed-planning artifact | Planning Draft | `Problem Draft` is contextual alias |
| High-level synthesis | Full Picture | Item-backed view of current planning |
| Desired behavior | Result Workflow | Part of a Planning Draft |
| Existing behavior | Current Workflow / Old Workflow | Use Old when replacement contrast matters |
| Route to desired behavior | Action Workflow | May contain File Update Plans |
| Addressable planning unit | Planning Item | May represent different roles and scales; may carry optional validation context |
| Complete item meaning | Canonical Item Body | No arbitrary size limit |
| One independently traversable trigger-to-result workflow | End-To-End Complete Picture | No mandatory stage may be delegated to a peer CP |
| Artifact reviewed to catch the current risk | Primary Review Object | May be workflow or non-workflow owner |
| Model/view/term/detail that supports workflow continuity | Supporting Artifact | Not automatically a Complete Picture |
| Optional hypothesis/risk/test information on an item | Item Validation Context | Proportional, not a universal schema |
| Concrete uncertain or risky situation to execute/observe | Prototype / Test Candidate | May remain embedded until independent lifecycle is justified |
| Planning perspective | Planning Lens | May produce no stored concern |
| Reusable question/direction | Concern Definition | Shared definition |
| Recommended concern set | Concern Preset | Suggestions, not mandates |
| Proposed target concern | Concern Suggestion | Not yet applied |
| Target-specific concern state | Applied Concern | Reviewed application |
| Separate deeper-work target | Concern Work Target | Only when justified |
| Recommended file shape | Document Template | Not a concern preset |
| Saved object projection | View Preset | Display only |
| Checked condition | Validation Rule | Not a template section by default |
| General app-memory unit | InformationItem | Broad data term |
| Literal support text | Source Excerpt | Source-linked evidence |
| Address of support | Source Anchor | Path/turn/section/range |
| Authoritative owner | Source of Truth | Per content/region |
| Real documentation file | Markdown File | First-class documentation |
| File-owned region | Hardwritten Region | Markdown-owned |
| Object-owned region | Object-backed Region | Object/item-owned |
| Full chat record | Conversation History | Historical evidence |
| Performed operational change record | Action Log | Not a future-task list |
| Review stage / object / result | Review Gate / Review Object / Review Status | Keep distinct |

## 13. Open Terminology Questions

| ID | Question | Conservative fallback |
|---|---|---|
| TQ-01 | Is `AlgoWorkflow Draft` useful as a separate term? | Use `Planning Draft` in user-facing text. |
| TQ-02 | Should `Problem Draft` remain visible? | Keep as contextual alias only. |
| TQ-03 | Should Result Workflow be called Desired Workflow? | Keep Result Workflow for contrast with Current and Action Workflow. |
| TQ-04 | Is separate `Item Scale` useful? | Use kind and typed relations until scale improves filtering/applicability. |
| TQ-05 | Which concern suggestion/status values are canonical stored states? | Keep suggestion dispositions separate from Applied Concern statuses. |
| TQ-06 | May one Concern Preset include another? | Allow several independent presets; do not assume inheritance. |
| TQ-07 | Should reviewed-out suggestions persist? | Preserve the review decision when repetition would create noise; define invalidation later. |
| TQ-08 | Should final wrapper/tag syntax be chosen here? | No; define concepts first and prototype syntax later. |
