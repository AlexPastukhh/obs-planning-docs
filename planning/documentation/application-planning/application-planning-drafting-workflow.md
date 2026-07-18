# Solution And Workflow Planning Drafting Workflow

Status: provisional reusable workflow
Doc version: v0.12.0-end-to-end-picture-and-item-validation
Scope: repeated user + AI process for Current Reality Capture, Planning Drafts, Functional Workflow Drafts, branches, details and prototypes.

Stable invariants belong in:

```text
application-planning-principles.md
```

Terminology belongs in:

```text
terminology-and-planning-items.md
```

## 1. Inputs

The user may provide:

```text
- complete or fragmented workflow descriptions;
- facts and checked sources;
- strengths and satisfactory parts;
- feelings and cognitive burden;
- experienced problems;
- suspected risks;
- workarounds;
- existing ideas;
- alternatives;
- questions;
- decisions and corrections;
- returned user-edited drafts;
- prototype evidence;
- source excerpts or source-linked item registers;
- implementation thoughts.
```

Do not require the user to know the artifact type or correct insertion point.

When useful and proportional, start with a small situation frame:

```text
current target;
known source material;
unknowns that matter now;
which artifact/review object is being updated.
```

## 2. Classify Before Writing

For each meaningful fragment, classify:

### Evidence status

```text
confirmed user statement;
checked source fact;
inference;
open question;
decision candidate;
explicit decision;
prototype/test evidence;
register-derived / indirect source.
```

### Information role

```text
current workflow fact;
strength;
user experience;
experienced problem;
suspected risk;
workaround;
existing idea;
desired result candidate;
acceptance-criterion candidate;
alternative;
decision;
implementation thought;
test/prototype material;
source excerpt;
source-linked planning item.
```

### Artifact role

```text
Current Reality Capture;
root Planning Draft;
Application Root Draft;
Functional Workflow Draft;
solution branch;
detail artifact;
Prototype Plan;
Prototype Result;
source-linked item register;
File Update Plan.
```

## 3. Source-Linked Item Extraction

For non-trivial chaotic input, extract Planning Items or InformationItems before turning them into final prose.

For each candidate item, keep when available:

```text
- item ID;
- interpreted statement;
- original source excerpt;
- source anchor;
- evidence status;
- item type/category;
- affected artifact;
- proposed placement;
- proposed action;
- important ambiguity;
- hypothesis / assumption when material;
- risk or key situation when material;
- prototype / test candidate;
- evidence needed;
- affected decision;
- priority / blocking status.
```

Do not fill validation fields mechanically. Keep them when they preserve uncertainty or a risky/key situation that would otherwise disappear during item normalization.

Preserve original wording when it is evidence. Do not replace it with a cleaner paraphrase unless the original remains available through a source excerpt or source anchor.

Merge repeated support into one item with multiple source excerpts when the meaning is the same. Do not create duplicate items just because the user repeated or refined the idea.

Split independent directions early. Coordinate them only when dependencies, shared decisions or review gates require one combined plan.

## 4. Proposed Information Units Review

For non-trivial free-form input, expose the planned interpretation when it improves review.

Recommended compact table:

| Unit | Interpreted statement | Source excerpt / anchor | Evidence | Category | Target | Location/action | Ambiguity |
|---|---|---|---|---|---|---|---|

The AI may also return complete updated drafts in the same response.

If the user does not correct the interpretation, use it as the working classification and placement. Preserve the evidence status.

## 5. Representation Selection

```text
1. Identify the semantic core.
2. Preserve user wording and relationships.
3. Choose the smallest useful representation.
4. Keep related information together.
5. Omit empty headings.
6. Expand only crowded or repeated parts.
7. Use linked detail or specialized representation only when local expansion is insufficient.
8. Keep a high-level entry point.
```

Tables are useful for repeated homogeneous records, not for every sentence.

## 6. Review Object Selection

Before returning or updating a significant artifact, identify the review object that matters at the current stage.

Examples:

```text
source-linked item table;
source excerpt mapping;
Current Reality Capture section;
Planning Draft section;
Result Workflow map;
Action Workflow / File Update Plan;
literal generated file;
replacement package or diff;
architecture/conventions checklist;
object-creation proposal;
prototype result.
```

Pick the object that catches the risk:

```text
misunderstood user meaning:
  review source-linked item table or source excerpt mapping;

wrong future direction:
  review Planning Draft section or Result Workflow map;

unsafe repository transition:
  review File Update Plan, generated files and diff;

schema/tooling overreach:
  review implementation thought or object-creation proposal;

stale or unhelpful detail:
  review parent summary, detail artifact and navigation.
```

Review status is recorded after review. It is not the review object.

## 7. Iterative Update Algorithm

```text
1. Read affected current drafts and new input.
2. Identify owners, evidence status and target locations.
3. Extract or update source-linked items when source traceability matters.
4. Preserve unchanged confirmed content.
5. Apply explicit corrections and answers.
6. Preserve deliberate user wording, order and grouping.
7. Merge repeated support into existing items when appropriate.
8. Split independent directions unless dependencies require coordination.
9. Create or show the information-unit interpretation review when useful.
10. Choose the current review object.
11. Update the smallest affected artifact set.
12. Check upstream and downstream relationships.
13. Keep ideas, risks, facts, decisions and evidence distinct.
14. Reconsider representation when it has become difficult to scan or maintain.
15. Return complete affected files or review objects for review.
16. Record unresolved conflicts and prioritized questions.
```

The workflow is not append-only. Replace an incorrect current interpretation.

## 7A. Planning Item Reconciliation

Use this process when selected working, local or unprocessed Planning Items must be reconciled with relevant current repository documentation before further planning or repository work.

Work directly with the selected Planning Items. Reconciliation is a review process, not a new persisted planning object. Concrete command names, aliases and project permission routing remain in the project root use-case map.

### Select the item source

Use, in priority order:

```text
1. the item set explicitly named by the user;
2. an item file attached in the same message;
3. the clearly active item set in the current conversation;
4. another local or earlier source only when the user explicitly selects it.
```

If the source is missing or ambiguous, ask which item set or file should be reconciled. Do not silently treat an older local file or attachment as current.

### Select the primary end-to-end Complete Picture or non-workflow review object

For each selected item or coherent item change set, first identify what must be reviewed to understand the real before/after effect.

#### Workflow candidate test

When process order, inputs, outputs, decisions, review gates or user behavior change, reconstruct candidate workflows before accepting existing picture boundaries:

```text
1. identify trigger / accepted input;
2. identify preconditions;
3. trace every mandatory stage;
4. expose decisions, branches, loops and review gates;
5. identify failure/risk paths;
6. identify the understandable result or explicit unresolved end state;
7. ask whether a peer picture owns any missing mandatory stage.
```

If a peer picture is required to supply a mandatory middle or completion, the split is invalid. Combine the mandatory slices into one End-To-End Complete Picture or reclassify them as supporting artifacts.

A genuinely separate Complete Picture must have its own trigger, result and independently traversable lifecycle. Optional integrations, explicit handoffs and shared infrastructure may connect separate pictures without making either incomplete.

#### Non-workflow primary review objects

Use a non-workflow primary review object when the selected items primarily change:

```text
an active living plan or coordinated desired reality:
  the complete Planning Draft, Application Root Draft or Full Picture;

object identity, relations, statuses or shared semantics:
  the coherent model/concept owner;

terminology or a stable principle:
  the complete terminology/principle owner;

an independently meaningful extracted part:
  the complete detail artifact;

a competing end-to-end alternative:
  the complete solution branch;

another coherent artifact family:
  the smallest complete review object that preserves purpose, boundaries and relationships.
```

A model, view, terminology owner, root summary, template, capability slice or detail may be the primary review object for its own change. It is not automatically a parallel Complete Picture. Inspect the end-to-end workflows whose behavior or representation depends on it.

#### Multiple-picture rule

Review several Complete Pictures separately only when each passes the independent trigger-to-result test. Then perform cross-workflow consistency review.

Do not preserve an existing CP split merely because files or headings already use separate labels. Do not collapse genuinely independent workflows into one vague aggregate.

### Read the current picture and supporting sources

Read each selected end-to-end picture or non-workflow primary review object completely enough to preserve its semantic whole. Then inspect only the relevant supporting sources:

```text
existing Planning Items;
principles;
workflows;
terminology;
templates;
Full Pictures or root drafts;
functional workflows, branches and details;
decisions and open questions;
canonical owner files;
available source-linked items or excerpts behind a relevant rule;
upstream inputs, downstream outputs and neighbouring workflows;
dependent documentation that may become inaccurate if the new meaning is accepted.
```

A repository statement proves what the current documentation says; it does not automatically prove that the statement is still correct. Likewise, new user input does not silently replace current meaning when the relation is unresolved.

### Build the before and after pictures

For every selected End-To-End Complete Picture or non-workflow primary review object, show:

```text
identity, purpose and boundary;
trigger / accepted inputs and preconditions for workflow pictures;
complete current picture before the selected items;
complete proposed picture after the selected items;
mandatory stages, branches, loops, review gates and result/end state;
failure paths, risky/key situations and prototype-relevant situations;
added, changed, moved, replaced, removed and preserved parts;
objects, statuses, decisions and relationships when relevant;
which selected items cause each change;
supporting models, views, terminology, templates, owners and source origins;
why each supporting artifact is not a parallel mandatory Complete Picture;
internal conflicts and unresolved choices;
effects on genuine upstream/downstream or independently traversable neighbouring workflows.
```

For workflows, `Complete Picture` means an independently traversable trigger-to-result whole. It does not require dumping irrelevant unchanged text, but mandatory continuity, purpose, boundaries, branches/loops, review gates and key relationships must remain visible. For models, terminology and other non-workflow owners, use `primary review object` rather than granting them parallel CP status.

### Relation review

Use the smallest useful relation vocabulary for item effects and old-to-new meanings:

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

Use normal explanatory text when one label is not sufficient.

Relation and action are separate:

```text
relation:
  how an incoming meaning compares with current canonical meaning;

action:
  what should happen to the canonical item set if that meaning is accepted.
```

### Build the canonical item-set transition

For each end-to-end Complete Picture or affected non-workflow primary review object, identify:

```text
current canonical item set or current owner meanings;
incoming items and meanings from the selected source;
proposed action for each incoming meaning;
resulting canonical item set after the proposed actions.
```

An incoming Planning Item is an input to reconciliation. It is not automatically a new canonical item. The resulting set may contain fewer, the same number or more items than the incoming set.

Use a short semantic item name as the primary readable label. Keep the technical item ID as secondary traceability when one exists. When the current title no longer represents the resulting meaning, propose an explicit old name → new name transition instead of hiding the rename.

Use the smallest useful action vocabulary:

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

Normal explanatory text may refine an action when a label alone is not sufficient.

For every proposed action, show:

```text
incoming semantic name and source ID when available;
current canonical target or explicit absence of one;
relation to current meaning;
proposed action;
resulting canonical item name;
content added, corrected, preserved or removed;
why this action produces a more coherent item set;
identity, owner and history/provenance effect;
unresolved user choice.
```

Identity and history rules:

```text
- Update Content normally preserves the current item identity and name.
- Rename normally preserves identity when the underlying semantic responsibility remains the same.
- Update And Rename shows both the content transition and old name → new name.
- Merge shows which meanings/items are absorbed and which resulting identity remains or is proposed.
- Split is justified only by independent purpose, owner, lifecycle, review or work-target needs; show old → resulting item mapping.
- Move / Re-home preserves meaning while changing the owning workflow/review object or canonical owner; do not leave duplicate active ownership behind.
- Defer keeps the meaning visible without promoting it into the active canonical set.
- Supersede removes an item from the active set while preserving its historical mapping to the replacing meaning.
- Remove / Reject removes the item from the proposed active set but does not erase source excerpts, provenance or the reason for rejection.
- Add is used only when the meaning remains independently useful after checking current items, owners, merge candidates and scope.
```

If no explicit canonical item register exists for a picture, reconstruct the current set from its canonical owner meanings and state that boundary. Do not invent acceptance or stable IDs merely to complete the table.

### Preserve the complete item transformation

For every non-trivial item transformation, show the source meanings before presenting the result. Do not collapse the current item, incoming expansion/correction and resulting item into one resulting paraphrase.

Use one small transformation block per coherent change. A block normally shows:

```text
current/original canonical item or items;
incoming, extending, correcting or replacing item/meaning;
resulting canonical item or items.
```

Use the following table shape when it is useful:

| Role | Semantic name | ID / source | Owner / status | Core meaning | Relation / contribution | Action / change effect | Identity / history effect | Choice |
|---|---|---|---|---|---|---|---|---|
| Current | <current item name> | <ID> | <owner/status> | <independently understandable current meaning> | <merge/update target or —> | <what is preserved/changed> | <current identity> | <choice or —> |
| Incoming | <incoming item/meaning> | <ID/source> | <working source/status> | <independently understandable incoming meaning> | <Extends/Corrects/Replaces/etc.> | <what it adds/corrects/removes> | <survives/absorbed/moved/etc.> | <choice or —> |
| Resulting | <resulting item name> | <result ID> | <result owner/status> | <complete resulting meaning> | <derived from named Current/Incoming rows> | <resulting semantic effect> | <surviving/new identity and mappings> | <choice or —> |

Use `—` where a column does not apply. The table is not limited to three rows:

```text
Merge Several:
  several Current and/or Incoming rows, then the Resulting row or rows;

Split:
  one or more Current rows, the incoming reason/correction, then several Resulting rows;

Add:
  Current may be `no existing canonical item`, followed by Incoming and Resulting;

Remove / Reject:
  show the Current item, the incoming evidence/reason and a Resulting row that states removal from the active set while preserving provenance;

Move / Re-home:
  show the original owner and the resulting owner separately.
```

Each Current and Incoming row must contain enough core meaning to understand that source independently. Each Resulting row must identify which source rows it derives from. Preserve every source ID and semantic name involved in update, rename, merge, split, replacement, supersession, movement or removal.

A compact single-row item map is sufficient only for a truly simple Keep, Link or non-overlapping Add. An aggregate matrix may summarize all transformations, but it is derived from the small transformation blocks and must not replace them.

#### Preserve validation context

When a Current or Incoming item contains a hypothesis, risk, key situation, prototype/test candidate, evidence need or affected decision, the Resulting row must show whether that signal is:

```text
preserved;
corrected;
merged;
split;
moved / re-homed;
resolved by evidence;
rejected;
or still open.
```

A merge or rename must not silently lose a test obligation. A reconciliation review may propose a prototype/test candidate and the evidence it should produce; it does not create a Prototype Plan, choose architecture or claim the hypothesis is true.

### Consistency review

Check each proposed End-To-End Complete Picture or non-workflow primary review object for:

```text
end-to-end integrity from trigger to result for every claimed Complete Picture;
no mandatory workflow stage delegated to a peer Complete Picture;
correct classification of models, views, terminology, root summaries and capability slices as supporting artifacts when they lack an independent lifecycle;
internal sequence and logical integrity;
compatible inputs and outputs;
preserved or explicitly changed purpose and boundaries;
consistent object identities, roles, statuses and relations;
review gates with clear review objects;
no duplicate workflow step, entity or owner created without need;
no silent deletion, narrowing, replacement, supersession or movement of active meaning;
consistency with supporting principles, terminology and templates;
consistency with upstream, downstream and neighbouring pictures;
open questions that remain questions rather than hidden decisions;
simplicity proportional to the actual risk and scope;
no duplicate resulting items after Add or Merge;
renamed items whose names match their resulting responsibility;
splits justified by independent semantic or lifecycle boundaries;
moves that leave one clear active owner;
removed or superseded meanings whose provenance and replacement effect remain explicit;
current and resulting item sets that account for every incoming meaning;
every Current and Incoming source item shown separately before the result for non-trivial transformations;
resulting rows that identify all source rows they derive from;
no merge, split, rename, move, supersession, removal or correction hidden only inside an aggregate summary;
relevant hypothesis, risk and prototype/test signals preserved or explicitly resolved.
```

When several genuinely independent Complete Pictures change, also show whether their outputs, inputs, decisions, terminology, ownership and resulting canonical item sets remain mutually compatible.

### Required output

Start with a Complete Picture integrity review:

| Candidate workflow / review object | Trigger and result | Mandatory continuity | Supporting artifacts | Parallel-fragment finding | Verdict |
|---|---|---|---|---|---|

For every genuinely independent workflow, show the complete trigger-to-result before/after picture. For every non-workflow primary review object, show its complete before/after meaning and the workflows affected by it.

For each selected workflow/review object, also show the canonical item-set transition. Start with a compact current-set list. Then show one small Item Transformation Block for every non-trivial change, with original/current item(s), every incoming/expanding/correcting meaning and resulting item(s) visible separately. Add rows when several sources or results participate and use `—` where a field does not apply.

A compact aggregate Item Change Plan may follow, but it is derived from the transformation blocks and does not replace them. Finish with the proposed resulting canonical item set. Use short semantic names as the main labels and IDs only as secondary references.

The item transition does not replace the Complete Picture or primary-review-object review. The workflow picture proves trigger-to-result coherence; the non-workflow review object proves its local model/term/representation coherence; the transformation blocks explain how every resulting canonical meaning is derived.

When relevant, finish with a compact prototype/risk follow-up:

| Resulting item | Hypothesis / risk | Key situation | Prototype/test candidate | Evidence needed | Decision affected | Priority |
|---|---|---|---|---|---|---|

Omit this table when no material validation signals exist.

Also report:

```text
checked sources;
relevant not-checked sources;
why each claimed Complete Picture passes or fails the trigger-to-result integrity test;
which non-workflow artifacts are primary review objects or supporting artifacts;
invalid parallel-picture findings and proposed combine/reclassify effects;
existing solutions to the same problem;
duplicates or cross-item conflicts;
explicit old → new semantic effects;
current canonical item set for each selected workflow/review object;
proposed action and reason for every incoming meaning;
resulting canonical item set for each selected workflow/review object;
identity, rename, merge, split, move, supersession and removal effects;
separate original/current, incoming and resulting rows for every non-trivial item transformation;
source-to-result mappings for every transformation;
internal and cross-workflow consistency findings;
relevant hypothesis/risk/key-situation/prototype-test preservation effects;
compact prototype/risk follow-up when useful;
proposed item/documentation actions;
unresolved choices;
readiness for a later File Update Plan.
```

The review may propose keeping, updating, renaming, adding, merging, splitting, moving, linking, deferring, superseding, removing or rejecting item meaning. It must not update the item register or repository files automatically.

When a project exposes this process as a read-only command, preserve this permission boundary:

```text
- no file edits;
- no item-register replacement;
- no archive creation;
- no commit or push.
```

## 8. Literal Files And InformationItem References

When generating literal Markdown files from source-linked items or app-backed content, decide per item:

```text
embedded wrapped content:
  use when the literal file must remain readable/reviewable without app expansion;

bare/reference-only link:
  use when duplicate literal content would make the file harder to read
  or when an app-expanded view is the intended review surface;

no managed link:
  use when ordinary text is clearer and no reusable item relationship is needed.
```

Do not choose exact wrapper syntax here.

Do not silently create canonical object state from AI-generated wrapper text. If a wrapper or proposed object region implies new app state, treat it as an object-creation proposal and review it before acceptance.

Return draft/file/diff review objects separately when they answer different questions.

## 9. Returned User-Edited Drafts

When the user returns files with `обн` or `upd`:

```text
- read every returned file completely;
- treat it as the latest user-edited working version;
- compare with the clearly matching prior version when available;
- identify source-linked items or corrections inside the returned text;
- preserve deliberate additions, removals, reordering and wording;
- do not restore removed text silently;
- merge same-message clarifications;
- improve presentation only when useful;
- do not force a larger template;
- update related files only when actually affected;
- return complete revised files.
```

A user edit does not automatically confirm every claim.

## 10. Current Reality Capture

Reconstruct the current workflow from any order of input.

For each meaningful step, capture when available:

```text
stable ID and name;
what happens;
current intended explanation;
user experience and comments.
```

Local categories may include:

```text
strengths;
friction;
experienced problems;
risks/doubts;
workarounds;
thoughts/observations;
existing ideas;
unknowns.
```

Keep comments near their step. Use cross-step groupings only when repetition or relationships require them.

Do not evaluate future solutions here.

## 11. Create Or Update The Root Planning Draft

When enough current reality exists:

```text
1. Reference the relevant capture material.
2. Add source-linked Planning Items when they improve review.
3. Formulate candidate desired result.
4. Add Result Workflow / desired reality when useful.
5. Add Action Workflow / roadmap when the route matters.
6. Add acceptance criteria with explicit status.
7. Record boundaries and non-goals.
8. Plan the candidate workflow linearly while one line is sufficient.
9. Record questions, problems, risks, assumptions and alternatives.
10. Identify tests/prototypes from uncertainty.
11. Record current conclusion and next action.
```

Do not require all sections before the draft becomes useful.

## 12. Application Root And Functional Workflows

When the candidate solution is an application with several behavior lines:

```text
1. Keep shared app information in the root draft.
2. Identify valuable functional workflows.
3. Keep a compact workflow inventory with summaries and links.
4. Record cross-workflow dependencies and conflicts in the root.
5. Create a separate Functional Workflow Draft only when independent analysis/testing justifies it.
6. Keep local questions, risks, tests and implementation thoughts in the child workflow.
```

Do not call functional workflows solution branches.

## 13. Branch Gate

Before creating a competing branch, ask:

```text
- Is there a real decision point?
- Do alternatives change the end-to-end plan enough to need independent work?
- Is separate testing or comparison useful?
- Why can no option be selected or rejected yet?
- What evidence would stop the branch?
```

If the answer is weak, keep alternatives in the current draft.

When branching is justified:

```text
1. Record the divergence decision in the parent.
2. Record selection/rejection criteria.
3. Create branch drafts.
4. Keep parent comparison current.
5. Aggregate only useful status, problem, test and evidence information.
```

Counts support navigation; they do not determine the winner automatically.

## 14. Details And Extraction

Extract a detail when the parent has become hard to use or the detail has an independent lifecycle.

The parent should retain:

```text
summary;
key points/results;
relationship;
link or stable reference.
```

Do not create a detail file for one small item.

## 15. Implementation Thoughts

Store future implementation notes next to the related behavior step or model question.

Recommended fields when several notes accumulate:

| ID | Thought | Source | Status | Related step/decision | Test needed |
|---|---|---|---|---|---|

Do not accept a class model, storage idea or UI control merely because it is written.

## 16. Prototype Drafting

A prototype may be embedded or separate.

Create a separate plan/result artifact when:

```text
- the experiment is independently reviewed;
- setup/evidence is substantial;
- several decisions depend on it;
- it has its own execution lifecycle.
```

After the result:

```text
1. Record observed evidence.
2. Compare with success/failure/inconclusive criteria.
3. Update affected assumptions and acceptance criteria.
4. Update workflow/branch status.
5. Record the new decision or next experiment.
6. Revisit upstream material when necessary.
```

## 17. Questions

Ask only questions that materially improve the artifact or prevent an unsafe assumption.

Recommended fields:

| Field | Meaning |
|---|---|
| ID | Stable local identifier |
| Question | Unknown |
| Priority | Relative impact |
| Blocking | Whether current work depends on it |
| Status | open / answered / deferred |
| Answer | User-confirmed answer |

Use compact prose when a table would be heavier.

## 18. Output Quality Checks

Before returning drafts:

```text
- Explicit user statements and checked facts are distinguishable.
- AI interpretation is visible where ambiguity matters.
- Source-linked items preserve source excerpts or source anchors when needed.
- Repeated support is grouped rather than duplicated.
- Review object and review status are not confused.
- Reality Capture remains descriptive.
- Desired results and criteria have status.
- Result Workflow and Action Workflow are distinguishable.
- Functional workflows and solution branches are not mixed.
- Claimed Complete Pictures are independently traversable from trigger to result.
- Mandatory stages are not hidden in parallel peer pictures.
- Supporting models/views/terminology are not mislabeled as Complete Pictures.
- Relevant item validation signals survive transformations.
- Implementation thoughts remain non-final unless accepted.
- Details exist only when useful.
- Tests target uncertainty.
- Evidence updates related decisions.
- Literal-file reference mode is chosen intentionally when relevant.
- The representation remains simple enough to think with.
- Complete affected files or review objects are returned.
```

## 19. Do Not

```text
- Do not require the user to fill a template manually.
- Do not promote an inference to confirmed content.
- Do not lose original wording when it is evidence for an item.
- Do not treat a source-linked planning item as final documentation automatically.
- Do not hide a review object behind a status checkbox.
- Do not create a branch from every alternative.
- Do not create child workflow files mechanically.
- Do not duplicate full child drafts in the app root.
- Do not make implementation notes architecture decisions.
- Do not choose exact wrapper syntax in this reusable workflow.
- Do not silently create canonical object state from AI-generated wrappers/tags.
- Do not make a generated explanation canonical.
- Do not preserve a thematic peer-CP split when one mandatory workflow crosses it.
- Do not make validation context mandatory on every Planning Item.
- Do not turn a hypothesis, risk or prototype candidate into a confirmed requirement or architecture decision.
```
