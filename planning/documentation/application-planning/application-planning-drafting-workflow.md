# Solution And Workflow Planning Drafting Workflow

Status: provisional reusable workflow
Doc version: v0.7.0-source-linked-review
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
- important ambiguity.
```

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
```
