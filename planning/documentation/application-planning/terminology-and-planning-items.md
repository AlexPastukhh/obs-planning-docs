# Terminology And Planning Items

Status: provisional reusable terminology draft / needs review
Doc version: v0.1.0
Language: Russian working draft
Scope: shared terminology for source-linked planning, documentation workspace, workflow/algo planning, navigation, review, Markdown/object bridge and chat workspace.

## 0. Purpose

This file defines working terms so future planning drafts, documentation files, app features and file-update plans can use the same words consistently.

Current rule:

```text
When a source-linked Planning Item conflicts with older prose,
the item-level correction wins until reviewed otherwise.
```

This terminology is not final architecture. It is a reviewable reusable draft.

## 1. Main correction from latest clarification

Earlier wording separated `Problem Draft`, `Planning Draft`, `Direction Draft` and `Result Workflow` too strongly.

The latest clarification changes the center of the terminology:

```text
Problem Draft and Planning Draft were mostly referring to the same thing:
the main draft used before detailed scenarios are created,
for planning a problem, solution, workflow, algorithm or future reality.
```

The draft is not only for applications. It can be used for:

```text
- planning a solution to a problem;
- planning a desired workflow;
- planning an algorithm;
- planning documentation behavior;
- planning an app feature;
- planning how reality should work after changes;
- coordinating later detailed scenarios, files and implementation plans.
```

Therefore the central term should not be only `Problem Draft`.

## 2. Proposed central term

### 2.1 Planning Draft / AlgoWorkflow Draft

Working user-facing term:

```text
Planning Draft
```

Working precise/technical candidate:

```text
AlgoWorkflow Draft
```

Russian working names:

```text
планнинг-драфт
алго-воркфлоу драфт
```

Alternative names:

```text
Problem Draft
Workflow Draft
Algo Draft
Direction Draft
```

### 2.2 Definition

```text
Planning Draft / AlgoWorkflow Draft — главный pre-scenario planning draft for one problem, goal, direction or desired reality.
It is used before detailed scenarios are created.
It helps plan what reality/workflow/algorithm should become, why, through which major parts,
what old/current workflow exists, what questions remain, and how local plans relate to the whole.
```

### 2.3 Why this term

The latest clarification emphasized:

```text
мы планируем то как должна быть реальность, какой нам нужен алгоритм или workflow
```

Therefore the term should point to:

```text
- desired reality;
- workflow;
- algorithm;
- problem-solving structure;
- pre-scenario planning.
```

`Planning Draft` is likely the best user-facing umbrella.
`AlgoWorkflow Draft` is a candidate precise subtype/name if the documentation needs a less generic term.

### 2.4 Important note

`AlgoWorkflow Draft` is not an implementation algorithm only.

It may contain:

```text
- problem/goal framing;
- current/old workflow;
- desired/result workflow;
- action workflow;
- questions;
- alternatives;
- key points;
- source-linked planning items;
- local update plans;
- navigation anchors;
- future detailed scenario candidates.
```

## 3. Central draft terms

### 3.1 Planning Draft

Status: accepted broad/user-facing candidate

Definition:

```text
Planning Draft — broad name for a draft used to plan a problem, goal, workflow, algorithm or desired reality before detailed scenarios and implementation plans.
```

Relationship:

```text
Planning Draft ~= Problem Draft in the current discussion.
Planning Draft may be implemented/defined more precisely as an AlgoWorkflow Draft.
```

Recommendation:

```text
Use `Planning Draft` as the primary user-facing term.
Use `AlgoWorkflow Draft` only if the methodology needs a distinct precise term.
```

### 3.2 Problem Draft

Status: alias, not canonical

Definition:

```text
Problem Draft — alias for Planning Draft when the starting point is a problem or pain.
```

Boundary:

```text
Do not use Problem Draft as the only canonical term,
because the same artifact may start from a goal, opportunity, desired workflow or algorithm.
```

### 3.3 Direction Draft

Status: deprioritized candidate

Earlier guess:

```text
Direction Draft — draft for a direction of work.
```

Correction:

```text
This name is less accurate than Planning Draft / AlgoWorkflow Draft,
because the user emphasizes planning the desired workflow/algorithm/reality, not merely a work direction.
```

Use only if:

```text
we need to describe a branch/direction that is one part of a larger Planning Draft.
```

### 3.4 Workflow Draft

Status: candidate alias

Definition:

```text
Workflow Draft — a Planning Draft focused on a workflow.
```

Risk:

```text
It may be confused with Result Workflow or Action Workflow.
```

Use carefully.

### 3.5 Algo Draft

Status: candidate alias

Definition:

```text
Algo Draft — a Planning Draft focused on the algorithm/logic of how reality should work.
```

Risk:

```text
It may sound too technical or implementation-focused.
```

Use carefully.

## 4. Workflow terms

### 4.1 Result Workflow

Status: accepted as part/goal inside the Planning Draft

Definition:

```text
Result Workflow — the desired useful workflow inside the Planning Draft.
It describes the reality/user scenario we want to make possible.
```

Latest correction:

```text
Result Workflow is close to the central draft,
but it is better treated as one major part/goal inside the larger Planning Draft / AlgoWorkflow Draft.
```

Example:

```text
A user opens a planning documentation file and can navigate:
- current section;
- parent planning draft;
- previous/current/next points;
- attached source-linked items;
- key points;
- dependencies;
- source excerpts.
```

Not the same as:

```text
Action Workflow — how we get there.
Current/Old Workflow — what exists now and may need improvement.
```

### 4.2 Current Workflow

Status: accepted

Definition:

```text
Current Workflow — the way work currently happens, if it already exists in some form.
```

Purpose:

```text
It is analyzed as one possible section of the Planning Draft.
It can reveal problems, patterns, constraints and improvement ideas.
```

### 4.3 Old Workflow

Status: accepted alias in improvement contexts

Definition:

```text
Old Workflow — previous/current workflow that is being replaced or improved.
```

Relationship:

```text
Old Workflow can be the same as Current Workflow
when the current process is the thing to improve.
```

Use when:

```text
there is a before/after comparison.
```

### 4.4 Action Workflow

Status: accepted

Definition:

```text
Action Workflow — the planned path for getting from current state to the desired Result Workflow.
It is a navigable action goal map.
```

It includes:

```text
- ordered actions;
- dependencies;
- review gates;
- current/completed/next points;
- checks whether steps are still needed;
- file-update plans when repository files must change.
```

Important:

```text
Action Workflow is not the Result Workflow.
It is the route to create/define/document/implement the Result Workflow.
```

### 4.5 Goal Map

Status: accepted supporting term

Definition:

```text
Goal Map — a structured map of a goal, subgoals, steps, dependencies and checks.
```

Usage:

```text
- for analyzing the desired Result Workflow;
- for analyzing the Action Workflow path;
- for deciding whether a step is worth doing.
```

### 4.6 Detailed Scenario

Status: accepted later artifact

Definition:

```text
Detailed Scenario — a more concrete scenario created after the Planning Draft has clarified enough.
```

Relationship:

```text
Planning Draft / AlgoWorkflow Draft comes before Detailed Scenarios.
```

Example:

```text
The Planning Draft says we need a workflow for importing object-backed regions from Markdown.
A Detailed Scenario later specifies the exact user flow:
open file -> scan tags -> review proposed object -> confirm -> object created.
```

## 5. Navigation terms

### 5.1 Navigation

Status: accepted

Definition:

```text
Navigation — app-supported ability to move through and understand files, draft sections,
parent/child plans, previous/current/next points, attached items, dependencies and source anchors.
```

Important correction:

```text
Navigation is not only inside the currently selected file.
It should also show relevant points from outer/parent files.
```

### 5.2 Selected File Navigation

Definition:

```text
Selected File Navigation — navigation through headings and points of the file currently open in the app.
```

### 5.3 Parent Draft Navigation

Definition:

```text
Parent Draft Navigation — navigation that shows where the current file/section/update plan sits inside the larger Planning Draft / AlgoWorkflow Draft.
```

### 5.4 Roadmap Navigation

Definition:

```text
Roadmap Navigation — navigation over the full route:
previous points, current point, planned next points, dependencies and status.
```

### 5.5 Attached Item

Definition:

```text
Attached Item — InformationItem / Planning Item linked to a heading, section, file, draft, chat turn or action step.
```

Use:

```text
A heading can show attached questions, source excerpts, key points, decisions, notes or related items.
```

### 5.6 Key Point

Definition:

```text
Key Point — short statement attached to a section/point that explains both:
1. what the point says;
2. what role it plays in the whole Planning Draft / roadmap.
```

Template:

```text
Key point:
  content summary
  role in parent plan
  why this matters now
  previous/next relation
```

## 6. Item / object terms

### 6.1 InformationItem

Status: accepted broad data-model term

Definition:

```text
InformationItem — general information unit in app memory.
It can be a note, source excerpt, idea, question, answer, decision, planning item,
action-log entry, linkable object-backed content or reusable content.
```

### 6.2 Planning Item

Status: accepted subtype/category

Definition:

```text
Planning Item — InformationItem extracted or created during planning,
used as raw material for Planning Drafts, workflows, file updates and future decisions.
```

Important:

```text
Planning Items are reviewed raw material.
They are not automatically final documentation.
```

### 6.3 Note

Status: UX term

Definition:

```text
Note — user-facing form of InformationItem,
often used for comments, questions, links, ideas, reminders or observations.
```

### 6.4 Object

Status: technical term, use carefully

Definition:

```text
Object — structured app-memory entity with ID, metadata, content and relations.
```

Rule:

```text
Do not use `Object` alone when a more precise term exists.
Prefer:
- InformationItem;
- object-backed region;
- app-memory object;
- source object.
```

### 6.5 Object-backed Content

Definition:

```text
Object-backed Content — text/content whose source of truth is an app object or InformationItem,
even if a copy of it appears inside a Markdown file.
```

## 7. Source / evidence terms

### 7.1 Source Excerpt

Definition:

```text
Source Excerpt — literal fragment of user text, assistant text, repository file, draft or imported file
that supports an item or decision.
```

Rule:

```text
One Planning Item may have multiple Source Excerpts.
One Source Excerpt may support multiple Planning Items.
```

### 7.2 Source Anchor

Definition:

```text
Source Anchor — address of the Source Excerpt:
chat turn, file path, heading, line range, object ID, selection range or imported fragment ID.
```

### 7.3 Provenance

Definition:

```text
Provenance — the full origin story of an item/content:
source excerpts, anchors, chat turns, transformations, review decisions and related artifacts.
```

### 7.4 Origin

Status: cautious technical term

Definition:

```text
Origin — creation or attachment context where an item/object first belonged.
```

Example:

```text
Planning Item PI-12 originated in Chat Workspace “Documentation Workbench planning”, turn 8.
```

Not the same as:

```text
Source of Truth
```

### 7.5 Source of Truth

Definition:

```text
Source of Truth — authoritative owner for a specific content unit or region.
```

Rule:

```text
Source of Truth is per content/region, not global.
```

Examples:

```text
- a Markdown section can be source of truth for hardwritten text;
- an InformationItem can be source of truth for object-backed content;
- a chat turn can be source evidence, but not necessarily final source of truth.
```

## 8. Markdown / app-memory bridge terms

### 8.1 Markdown File

Definition:

```text
Markdown File — real repository documentation file, readable by humans and AI without the app.
```

Rule:

```text
Markdown files remain first-class documentation.
The app adds links, metadata, navigation and source-of-truth handling around them.
```

### 8.2 App Memory

Definition:

```text
App Memory — application storage for InformationItems, objects, relations, dependencies,
review statuses, chat workspaces and source-of-truth metadata.
```

### 8.3 Hardwritten Region

Definition:

```text
Hardwritten Region — region of a Markdown file where the Markdown file itself is source of truth.
```

### 8.4 Object-backed Region

Definition:

```text
Object-backed Region — region of a Markdown file where the visible text is materialized from an app object or InformationItem.
```

### 8.5 Proposed Object Region

Definition:

```text
Proposed Object Region — region in a file, often AI-generated, that asks the app to create a new object after user confirmation.
```

### 8.6 Snapshot

Definition:

```text
Snapshot — textual copy of object/item/draft state captured at a particular time.
```

Warning:

```text
Snapshot may become stale if the live object changes.
```

### 8.7 Materialized View

Definition:

```text
Materialized View — generated readable representation of app memory or object-backed content in Markdown.
```

### 8.8 Live Reference

Definition:

```text
Live Reference — reference from a file, app view or section to current content of an object/item.
```

### 8.9 Transclusion

Definition:

```text
Transclusion — insertion of InformationItem/Object content into another file, draft or app view,
usually while preserving a link to source of truth.
```

Types:

```text
live transclusion
snapshot transclusion
hybrid transclusion
```

### 8.10 Marker

Definition:

```text
Marker — machine-readable indication inside Markdown.
```

### 8.11 Tag

Definition:

```text
Tag — small marker that classifies a region, item or object.
```

### 8.12 Wrapper

Definition:

```text
Wrapper — start/end marker block around a Markdown region that tells the app how to interpret it.
```

Example concept:

```markdown
<!-- app-region:start type="proposed-object" id="PI-014" -->
content
<!-- app-region:end -->
```

## 9. Workspace / chat terms

### 9.1 Workspace

Definition:

```text
Workspace — bounded working context that stores conversation history,
items, action log, related drafts, files, objects and review states.
```

### 9.2 Chat Workspace

Definition:

```text
Chat Workspace — workspace whose primary boundary is one chat.
```

Current working model:

```text
one chat = one workspace
```

Future option:

```text
one workspace may include several chats.
```

### 9.3 Conversation History

Definition:

```text
Conversation History — full stored sequence of user and assistant turns.
```

### 9.4 Turn

Definition:

```text
Turn — one user message plus, optionally, the assistant response that followed it.
```

### 9.5 Action Log

Definition:

```text
Action Log — structured interpretation of Conversation History focused on actions,
decisions, next steps, completed work and operational changes.
```

Difference:

```text
Conversation History = full evidence.
Action Log = operational interpretation.
```

### 9.6 Documentation Status

Definition:

```text
Documentation Status — state showing whether a conversation item/idea/action has been documented,
needs documentation, is not worth documenting, is superseded or remains unresolved.
```

## 10. Review terms

### 10.1 Review Gate

Definition:

```text
Review Gate — stage where a specific review object is checked before moving forward.
```

### 10.2 Review Object

Definition:

```text
Review Object — what the user is reviewing at that gate.
```

Examples:

```text
source-linked items
draft section
workflow draft
generated file
object creation proposal
commit diff
```

### 10.3 Review Status

Definition:

```text
Review Status — state of review for an item, draft, file, commit, object proposal or chat turn.
```

Candidate values:

```text
raw
needs-review
reviewed-understood
reviewed-needs-changes
accepted
documented
not-worth-documenting
committed
commit-diff-reviewed
rolled-back
superseded
```

### 10.4 Draft Review

Definition:

```text
Draft Review — meaning-level review of a draft or section before commit/diff review.
```

### 10.5 File Review

Definition:

```text
File Review — review of literal generated or changed file content.
```

### 10.6 Commit Diff Review

Definition:

```text
Commit Diff Review — review of repository transition after commit snapshot,
or before commit in manual fallback flow.
```

## 11. File-update and archive terms

### 11.1 File Update Plan

Definition:

```text
File Update Plan — ordered plan for changing repository files.
```

It includes:

```text
- steps;
- actions;
- affected files;
- boundaries;
- checks;
- resulting state.
```

Relationship:

```text
File Update Plan is part of Action Workflow when repository files need to change.
It is not the whole Action Workflow.
```

### 11.2 Update Step

Definition:

```text
Update Step — one step inside a File Update Plan.
```

### 11.3 Replacement Archive

Definition:

```text
Replacement Archive — package containing generated/replacement files and apply instructions.
```

### 11.4 Archive Apply Assistant

Definition:

```text
Archive Apply Assistant — future tool/app feature that reads archive metadata,
applies files, creates commit snapshot, opens diff review and supports rollback.
```

Status:

```text
deferred tooling direction
```

## 12. Terms to avoid or qualify

### 12.1 Avoid `workflow` alone

Use:

```text
Current Workflow
Old Workflow
Result Workflow
Action Workflow
Review Workflow
Import Workflow
Export Workflow
File Update Workflow
```

### 12.2 Avoid `draft` alone

Use:

```text
Planning Draft
AlgoWorkflow Draft
Result Workflow section
Action Workflow section
Terminology Draft
File Update Plan
```

### 12.3 Avoid `source` alone

Use:

```text
Source Excerpt
Source Anchor
Source of Truth
Source File
Source Turn
Provenance
Origin
```

### 12.4 Avoid `object` alone

Use:

```text
InformationItem
App-memory object
Object-backed Region
Proposed Object Region
```

## 13. Current recommended canonical set

| Concept | Recommended term | Notes |
|---|---|---|
| Main pre-scenario planning artifact | Planning Draft / AlgoWorkflow Draft | Keep both until reviewed |
| Problem-started planning artifact | Problem Draft | Alias |
| Work branch | Direction | Not main draft term |
| Desired useful future behavior | Result Workflow | Section/part of Planning Draft |
| Existing behavior to analyze | Current Workflow / Old Workflow | Current if active, Old if being replaced |
| Path to get desired workflow | Action Workflow | Navigable goal-map plan |
| Concrete repository change plan | File Update Plan | Existing command route |
| General app-memory info unit | InformationItem | Broad data term |
| Planning raw material | Planning Item | Subtype/category |
| Literal support text | Source Excerpt | Can be multiple per item |
| Address of support text | Source Anchor | Path/turn/section/range |
| Authoritative owner | Source of Truth | Per content/region |
| Real doc file | Markdown File | First-class docs |
| File-owned region | Hardwritten Region | Markdown is source of truth |
| Object-owned region | Object-backed Region | Object/item is source of truth |
| Captured text state | Snapshot | May be stale |
| Current linked content | Live Reference | Resolved through app |
| Inserted linked content | Transclusion | live/snapshot/hybrid |
| One chat working context | Chat Workspace | current model |
| Full chat record | Conversation History | evidence |
| Structured actions from chat | Action Log | interpretation |
| Review stage | Review Gate | has review object |
| Review state | Review Status | tracked by app |

## 14. Open naming questions

| ID | Question | Current fallback |
|---|---|---|
| TQ-01 | Is `AlgoWorkflow Draft` too artificial? | Use `Planning Draft` in user-facing text and define it as algo/workflow planning draft. |
| TQ-02 | Should `Problem Draft` remain visible? | Keep as alias when planning starts from a problem. |
| TQ-03 | Should `Result Workflow` be renamed `Desired Workflow`? | Keep `Result Workflow` for now because it contrasts with `Current Workflow` and `Action Workflow`. |
| TQ-04 | Should `Action Workflow` be renamed `Action Goal Map`? | Keep Action Workflow; describe it as navigable goal map. |
| TQ-05 | Should `InformationItem` be called `InfoItem` in UI? | Use InformationItem in docs; UI can show Info Item later. |
| TQ-06 | Should wrapper/tag syntax be chosen now? | No. Define concepts first, syntax later. |

## 15. Suggested next step

Review the central naming choice:

```text
Planning Draft / AlgoWorkflow Draft
```

If accepted, later drafts should use:

```text
Planning Draft
  as user-facing broad term;

AlgoWorkflow Draft
  as precise technical/definition term if needed;

Problem Draft
  as alias only.
```

This keeps the intended meaning:

```text
the draft used for planning a problem/solution/workflow/algorithm before detailed scenarios
```

while avoiding the trap that everything must start as a “problem”.
