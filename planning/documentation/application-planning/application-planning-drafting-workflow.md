# Solution And Workflow Planning Drafting Workflow

Status: active reusable workflow / Planning Item formation delegated
Doc version: v1.1.0-sufficient-planning-draft-contract
Scope: repeated user + AI process for Current Reality Capture, item-backed Planning Drafts, End-To-End Workflow integrity, Planning Item reconciliation, questions, risks, alternatives, tests, evidence-driven revision and optional deeper planning.

Canonical concepts and principles:

```text
application-planning-principles-and-terminology.md
```

Source-to-item formation and exact item review:

```text
planning-item-formation-workflow.md
templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
```

## 1. Purpose

This workflow owns broader planning after or around Planning Item formation:

```text
source/reality context
  → reviewed Planning Items
  → item-backed Planning Draft
  → Planning Item Map
  → complete Key Scenarios
  → one required Full Picture Matrix
  → questions, risks and validation
  → alternatives, tests and prototypes
  → evidence-driven revision
  → repository semantic reconciliation
  → later file-update planning.
```

It also owns the reusable read-only Planning Item reconciliation algorithm.

It does not own:

```text
- concrete project command names, aliases or permissions;
- exact source-to-item review shape;
- project-local item storage;
- semantic Direction/Use-Case registry entries;
- repository edits, archives, commit or push;
- a managed-object or application-native runtime.
```

## 2. Inputs

The user may provide:

```text
workflow descriptions;
facts and checked sources;
strengths and satisfactory parts;
experienced problems;
suspected risks;
workarounds;
existing ideas;
alternatives;
questions;
decisions and corrections;
returned user-edited drafts;
accepted or proposed Planning Items;
portable item ledgers;
prototype/test evidence;
source-linked registers;
implementation thoughts.
```

Do not require the user to know the artifact type or insertion point.

When useful, establish:

```text
current target;
selected source;
important unknowns;
current review object;
current project-local owner.
```

## 3. Classification Before Promotion

Keep evidence states distinct:

```text
explicit user statement;
checked source fact;
inference;
open question;
decision candidate;
explicit decision;
prototype/test evidence;
register-derived or indirect source.
```

Keep information roles distinct:

```text
current workflow fact;
strength;
user experience;
experienced problem;
suspected risk;
workaround;
existing idea;
desired-result candidate;
criterion candidate;
alternative;
decision;
implementation thought;
prototype/test material;
source material;
Planning Item.
```

Keep artifact roles distinct:

```text
Current Reality Capture;
Planning Item review;
Planning Draft;
Planning Item Map;
Full Picture Matrix;
Scenario;
End-To-End Workflow;
solution branch;
supporting model/view/terminology;
detail artifact;
Prototype Plan / Result;
File Update Plan.
```

A view or table is not automatically a separate canonical artifact.

## 4. Planning Item Formation Integration

When raw or structured source must become reviewed Planning Items, delegate to:

```text
planning-item-formation-workflow.md
```

Use:

```text
templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
```

The drafting workflow receives:

```text
complete item meanings;
source/provenance relations;
item roles and typed relations;
separate relation-backed Implementation Ideas;
transformation history;
review state;
unresolved choices.
```

Do not duplicate a second excerpt-only extraction algorithm.

Do not convert every source fragment into an item.

Do not shorten the accumulating item body when integrating it into a Planning Draft.

## 5. Representation Selection

```text
1. Identify the semantic core.
2. Preserve accepted item meanings and source relationships.
3. Choose the smallest useful representation.
4. Keep related information together.
5. Omit empty headings.
6. Expand crowded or repeated parts locally.
7. Create linked detail only when independent lifecycle,
   review, reuse, research or testing justifies it.
8. Keep a high-level entry point.
```

Templates are recommended representations, not mandatory schemas.

A simple or non-application solution may remain in one Planning Draft when that provides enough understanding for implementation or a no-change decision.

## 6. Review Object Selection

Choose the smallest complete object that catches the current risk.

Examples:

```text
misunderstood source meaning:
  Planning Item review and full-message mapping;

wrong desired direction:
  Planning Draft or Result Workflow;

broken workflow continuity:
  End-To-End Workflow;

semantic model conflict:
  complete model/terminology owner plus affected workflows;

unsafe repository transition:
  File Update Plan, generated files and diff;

architecture overreach:
  Implementation Idea, decision or prototype result.
```

Keep distinct:

```text
Review Gate;
Review Object;
Review Status.
```

## 7. Iterative Update Algorithm

```text
1. Read affected current owners and selected new input.
2. Identify evidence states, semantic roles and review object.
3. Delegate source-to-item formation when needed.
4. Preserve unchanged accepted meaning.
5. Apply explicit corrections and decisions.
6. Preserve deliberate user wording, order and grouping.
7. Reuse/update existing items instead of duplicating meaning.
8. Split only independently useful meanings or work targets.
9. Update the smallest complete affected artifact set.
10. Check upstream/downstream and parent/detail relationships.
11. Keep facts, inference, questions, risks, decisions and evidence distinct.
12. Reconsider representation when it becomes hard to use.
13. Return complete affected review objects/files.
14. Record unresolved conflicts and prioritized choices.
```

Planning is not append-only. Correct current meaning explicitly.

## 8. Planning Draft

Build one readable item-backed Planning Draft for the current planning direction.

### 8.1 Planning Item Map

Include a section of logically ordered links to contributing Planning Items.

Possible groups:

```text
primary workflow route;
cross-cutting requirements;
constraints and non-goals;
questions, risks and decisions;
Implementation Ideas.
```

The map is navigation. Complete meanings remain with the items.

### 8.2 Key Scenario Coverage

A sufficient Planning Draft identifies its Key Scenarios and describes every Key Scenario completely.

Each complete Key Scenario preserves:

```text
semantic name and why it is key;
actor/context;
goal and observable result;
entry/preconditions;
main flow;
branches, alternatives and failures;
invariants, postconditions and acceptance/outcomes;
important Scenario DATA when behavior depends on it;
questions, risks and evidence needs;
contributing Planning Items;
Implementation Ideas only by link/association.
```

Other Scenarios are optional. They may remain summaries or become complete inline sections when that improves review.

Do not assign Key Scenario status automatically. Present candidates and reasons when selection is unresolved.

A direction with no behavioral Scenario records that fact explicitly instead of inventing one.

`Key Scenario` is the same Scenario entity selected for early depth because it affects value, viability, risk, differentiation or architecture.

### 8.3 Full Picture Matrix

Every sufficient Planning Draft contains one compact matrix:

| Flow point | Scenario view | Implementation view | Questions / risks / validation | Status / follow-up |
|---|---|---|---|---|

Rules:

```text
- keep every cell concise;
- link scenario meaning to Planning Items;
- link implementation meaning to separate Implementation Ideas;
- link questions, risks and prototype needs to their owners;
- do not copy complete item bodies into the table;
- allow many-to-many links;
- do not create a separate Planning Full Picture artifact;
- use decision/flow points when no behavioral Scenario exists.
```

### 8.4 Optional Semantic Content

Use only when useful:

```text
identity/current status;
desired result;
criteria;
boundaries and non-goals;
Current/Result/Action Workflows;
Planning Item Map;
existing solutions;
alternatives;
questions and risks;
tests and evidence;
decisions;
selected planning depth;
current conclusion and next action.
```

## 9. End-To-End Workflow Integrity

For a process change reconstruct:

```text
trigger / accepted input;
preconditions;
every mandatory stage;
decisions;
branches;
loops;
review gates;
failure/risk paths;
understandable result or explicit unresolved end state.
```

A peer workflow must not own a mandatory missing middle or completion.

Combine invalid thematic slices or reclassify them as supporting artifacts.

Several workflows are peers only when each has its own trigger, result and independently traversable lifecycle.

Models, views, terminology, root summaries and templates are not workflows automatically.

`End-To-End Complete Picture` may appear as a legacy alias in older files. The preferred term is `End-To-End Workflow`.

## 10. Planning Item Reconciliation

Use when selected working, local or unprocessed Planning Items must be reconciled with current repository owners.

Reconciliation is read-only. It does not edit item registers or repository files.

### 10.1 Select The Item Source

Priority:

```text
1. item set explicitly named by the user;
2. same-message attached item file;
3. clearly active item set in the conversation;
4. earlier/local source only when explicitly selected.
```

Do not silently select an older archive or ledger.

### 10.2 Select Review Objects

Use an End-To-End Workflow review object for workflow-continuity changes.

Use a non-workflow primary review object when the change primarily affects:

```text
Planning Draft;
coherent model or relationship set;
principles/terminology owner;
independent detail artifact;
competing branch;
template or profile.
```

### 10.3 Read Current Owners

Read each selected owner completely enough to preserve its semantic whole, then inspect relevant:

```text
Planning Items;
principles and terminology;
workflows;
templates and profiles;
Planning Drafts;
decisions and questions;
source/provenance;
upstream inputs and downstream outputs;
dependent documentation.
```

Repository text proves documented state, not timeless truth.

New input does not silently replace unresolved current meaning.

### 10.4 Build Current And Resulting Pictures

For every selected review object show:

```text
identity, purpose and boundary;
current complete meaning;
incoming meaning;
resulting complete meaning;
added/changed/moved/replaced/removed/preserved meaning;
affected items/statuses/decisions/relations;
supporting artifacts;
internal conflicts;
unresolved choices.
```

For workflows also show trigger, mandatory stages, branches/loops, review gates and result.

### 10.5 Relation Review

Relation vocabulary:

```text
Already Covered;
Supports;
Extends;
Clarifies;
Corrects;
Conflicts;
Replaces;
Different Scope;
New Meaning.
```

Relation and proposed action are separate.

Implementation Ideas remain relation-backed:

```text
Target item
  → references separate Planning Items
    where Item Kind = Implementation Idea;

linking
  ≠ accepting architecture.
```

### 10.6 Canonical Item-Set Transition

Identify:

```text
current canonical item set/current owner meanings;
incoming meanings;
proposed action for each;
resulting canonical item set.
```

Actions:

```text
Keep;
Update Content;
Rename;
Update And Rename;
Add;
Merge Into Existing;
Merge Several;
Split;
Move / Re-home;
Link;
Defer;
Supersede;
Remove / Reject.
```

Use semantic names first, IDs second.

Do not assign a new ID unless independent meaning remains after checking current owners and possible merges.

### 10.7 Identity And History

```text
Update:
  preserve identity when responsibility survives;

Rename:
  preserve identity and show old → new;

Merge:
  show absorbed meanings and surviving identity;

Split:
  justify independent purpose/owner/lifecycle/review/work target;

Move / Re-home:
  change owner/location without duplicate active ownership;

Defer:
  keep visible outside the active canonical set;

Supersede / Reject:
  preserve source/provenance and reason;

Add:
  use only when no compatible owner exists.
```

### 10.8 Transformation Blocks

Every non-trivial change shows:

```text
Current row(s);
Incoming row(s);
Resulting row(s).
```

Do not replace source/result blocks with an aggregate summary.

### 10.9 Preserve Validation Context

When material, preserve:

```text
hypothesis/assumption;
risk/key situation;
prototype/test candidate;
evidence needed;
success/failure/inconclusive interpretation;
affected decision;
priority/blocking state.
```

Do not turn these into confirmed requirements or architecture.

### 10.10 Required Reconciliation Output

Report:

```text
checked and relevant not-checked sources;
review-object and workflow-integrity verdicts;
supporting-artifact map;
current/incoming/resulting meanings;
one transformation block per non-trivial change;
identity/provenance/source effects;
preserved validation context;
compact prototype/risk follow-up when useful;
unresolved choices;
readiness for a File Update Plan.
```

No file edit, item-register update, archive, commit or push.

## 11. Current Reality Capture

Current Reality Capture is descriptive.

It may record:

```text
current actions and workflow;
current explanations;
user experience;
strengths;
experienced problems;
suspected risks;
workarounds;
existing ideas;
unknowns and contradictions.
```

It does not silently own accepted future outcomes, architecture or a build decision.

It may be omitted when enough checked current context exists.

## 12. Concerns, Questions And Observability

```text
Planning Lens
  → possible Concern Definition match
  → suggestion/question for one target
  → applicability review
  → optional target-specific work
  → result returned to item and Planning Draft.
```

Presets recommend; they do not mandate.

Derived observability may show:

```text
open questions;
unverified assumptions;
risks;
evidence or prototype needs;
blocked/deferred work;
resolved work.
```

Every indicator drills down to concrete records. It does not become one opaque quality score.

Questions, risks and prototype work may remain in Planning Items and be linked from the Full Picture Matrix. The Planning Draft does not need to contain their full working logs.

## 13. Existing Solutions, Alternatives And Branches

Consider existing tools, scripts, integrations, process changes, automation, no change and custom build proportionally.

Do not treat inconvenience as automatic proof that a new application is needed.

Keep planning linear while one path is sufficient.

Create a branch only when alternatives need independent planning or testing.

The parent owns:

```text
decision point;
reason for branching;
selection/rejection criteria;
evidence gaps;
branch inventory;
comparison and final decision.
```

## 14. Tests, Prototypes And Solution Validation

Start from uncertainty and the affected decision.

Record proportionally:

```text
hypothesis/question;
risk/key situation;
reason to test now;
minimum setup;
evidence to observe;
success/failure/inconclusive criteria;
decision affected;
artifact/code fate.
```

Create separate prototype artifacts only when setup, evidence, execution or review has an independent lifecycle.

Keep distinct:

```text
implementation verification:
  does the implementation work as specified?;

solution validation:
  does the complete workflow solve the intended problem effectively?
```

Observed evidence updates affected items, criteria, workflows, questions, risks and decisions.

## 15. Optional Entry Into Detailed Planning

Detailed planning is useful when enough are stable and separate artifacts reduce risk or coordination cost.

Possible signals:

```text
many interacting scenarios;
complex shared concepts or lifecycle;
high cost of change;
parallel work;
independent deliverables;
multiple release cycles;
important cross-scenario consistency.
```

When a specialized Scenario/Domain/Slice profile is selected, use its owner.

Do not require that profile for:

```text
simple applications;
non-application solutions;
narrow scripts or automation;
workflows sufficiently planned in one Planning Draft.
```

Outside the selected specialized profile, Scenario DATA and Behavior meaning may remain inline when that is sufficient.

Inside the selected specialized profile, follow the profile's separate logical Scenario, supported Scenario DATA and Behavior Item Reference Object contract; physical definitions may still share a registry file.

## 16. Dynamic Revision

When corrected or new evidence arrives:

```text
update current truth;
preserve deliberate source wording;
revisit affected items and questions;
revisit upstream/downstream artifacts;
change representation when needed;
keep a high-level entry point.
```

Deep work must return accepted results to owning Planning Items and the Planning Draft.

## 17. Checks Before Returning

```text
- source and review object are explicit;
- item formation was delegated when required;
- accepted meanings were not shortened;
- evidence states remain distinct;
- workflow integrity is checked where relevant;
- models/views/terminology are not mislabeled as workflows;
- Current/Incoming/Resulting transformations remain traceable;
- source/provenance survives;
- validation signals survive;
- Planning Draft does not duplicate item ownership;
- every sufficient Planning Draft contains one Full Picture Matrix view;
- every Key Scenario is complete while other Scenario depth remains proportional;
- implementation thoughts remain non-final;
- no application/runtime assumption was invented;
- no repository permission was inferred.
```

## 18. Do Not

```text
- Do not require template-ordered input.
- Do not duplicate Planning Item Formation.
- Do not replace complete source messages with excerpts.
- Do not create Source Idea or Candidate entities.
- Do not treat every fragment as an item.
- Do not treat every item as a final requirement.
- Do not compress or split items merely for length.
- Do not preserve invalid thematic peer workflows.
- Do not treat models, views or terminology as workflows automatically.
- Do not make concern presets mandatory.
- Do not create deep-work files mechanically.
- Do not create a branch for every option.
- Do not turn implementation thoughts into architecture.
- Do not put project-specific storage/schema in reusable methodology.
- Do not choose exact wrapper syntax here.
- Do not make AI explanation a second canonical source.
- Do not require a separate Full Picture artifact.
- Do not force Scenario/Domain/Slice layers on simple work.
- Do not edit repository files, create archives, commit or push
  through this workflow alone.
```
