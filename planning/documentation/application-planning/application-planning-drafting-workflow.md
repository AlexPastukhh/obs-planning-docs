# Solution And Workflow Planning Drafting Workflow

Status: active reusable workflow / Planning Item formation delegated
Doc version: v0.13.0-formation-owner-sync
Scope: repeated user + AI process for Current Reality Capture, item-backed Planning Drafts and Full Pictures, Complete Picture integrity, Planning Item reconciliation, concerns, branches, details, prototypes and evidence-driven revision.

Stable invariants:

```text
application-planning-principles.md
```

Terminology:

```text
terminology-and-planning-items.md
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
  → item-backed Planning Draft / Full Picture
  → independently traversable Complete Pictures
  → concern review and justified deepening
  → alternatives, tests and prototypes
  → evidence-driven revision
  → repository semantic reconciliation
  → later file-update planning.
```

It also owns the reusable read-only Planning Item reconciliation algorithm.

It does not own:

- the exact item-formation command name;
- exact source-to-item review shape;
- project-local item storage;
- semantic Direction/Use-Case registries;
- repository edits, archives, commit or push without a separate route.

## 2. Inputs

The user may provide:

```text
complete or fragmented workflow descriptions;
facts and checked sources;
strengths and satisfactory parts;
feelings and cognitive burden;
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
root Planning Draft / Full Picture;
Application Root;
End-To-End Complete Picture;
Functional Workflow Draft;
solution branch;
supporting model/view/terminology;
detail artifact;
Prototype Plan / Result;
File Update Plan.
```

## 4. Planning Item Formation Integration

When raw or structured source must become reviewed Planning Items, delegate the complete process to:

```text
planning-item-formation-workflow.md
```

Use:

```text
templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
```

The drafting workflow receives:

- accepted or clearly proposed complete item meanings;
- source/provenance relations;
- item roles and relations;
- transformation history;
- unresolved choices;
- portable/application-native delivery state.

Do not duplicate a second excerpt-only extraction algorithm here.

Do not convert every source fragment into an item.

Do not shorten the accumulating item body when integrating it into a draft.

## 5. Representation Selection

```text
1. Identify the semantic core.
2. Preserve accepted item meanings and source relationships.
3. Choose the smallest useful representation.
4. Keep related information together.
5. Omit empty headings.
6. Expand crowded/repeated parts locally.
7. Create linked detail only when independent lifecycle/review/reuse justifies it.
8. Keep a high-level entry point.
```

Templates are recommended representations, not mandatory schemas.

## 6. Review Object Selection

Choose the smallest complete object that catches the current risk.

Examples:

```text
misunderstood source meaning:
  Planning Item review and full-message mapping;

wrong desired direction:
  Planning Draft / Full Picture or Result Workflow;

broken workflow continuity:
  End-To-End Complete Picture;

semantic model conflict:
  complete model/terminology owner plus affected workflows;

unsafe repository transition:
  File Update Plan, complete generated files and diff;

architecture overreach:
  implementation thought, decision or prototype result.
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
2. Identify evidence states, semantic roles and current review object.
3. Delegate source-to-item formation when needed.
4. Preserve unchanged accepted meaning.
5. Apply explicit corrections and decisions.
6. Preserve deliberate user wording, order and grouping.
7. Reuse/update existing items instead of duplicating meaning.
8. Split only independently meaningful directions/work targets.
9. Update the smallest complete affected artifact set.
10. Check upstream/downstream and parent/child relationships.
11. Keep facts, inference, concerns, decisions and evidence distinct.
12. Reconsider representation when it becomes hard to use.
13. Return complete affected review objects/files.
14. Record unresolved conflicts and prioritized choices.
```

Planning is not append-only. Correct current meaning explicitly.

## 8. Planning Item Reconciliation

Use when selected working/local/unprocessed Planning Items must be reconciled with current repository owners before further planning or file updates.

Reconciliation is a read-only review process, not a persisted candidate object.

Concrete command routing remains in the project root UCM.

### 8.1 Select The Item Source

Priority:

```text
1. item set explicitly named by the user;
2. same-message attached item file;
3. clearly active item set in the conversation;
4. earlier/local source only when explicitly selected.
```

Do not silently select an older archive or ledger.

### 8.2 Identify Independent Complete Pictures Or Non-Workflow Review Objects

For process changes reconstruct:

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

A peer Complete Picture must not own a mandatory missing middle/completion.

Combine invalid thematic slices or reclassify them as supporting artifacts.

Several Complete Pictures are valid only when each has its own trigger, result and independently traversable lifecycle.

Use a non-workflow primary review object when the change primarily affects:

```text
Planning Draft / Application Root / Full Picture;
coherent object/relationship/status model;
terminology or stable principle;
independent detail artifact;
competing branch;
another complete artifact family.
```

Models, views, terminology, root summaries and templates are not automatically Complete Pictures.

### 8.3 Read Current Owners And Supporting Sources

Read each selected primary owner completely enough to preserve its semantic whole, then inspect relevant:

```text
Planning Items;
principles;
workflows;
terminology;
templates;
Full Pictures/root drafts;
functional workflows/branches/details;
decisions/open questions;
canonical owner files;
source/provenance behind current rules;
upstream inputs/downstream outputs;
dependent documentation.
```

Repository text proves current documentation state, not timeless truth.

New input does not silently replace an unresolved current meaning.

### 8.4 Build Before And After Pictures

For every selected workflow/review object show:

- identity, purpose and boundary;
- trigger/input/preconditions for workflows;
- complete current picture;
- complete proposed picture;
- mandatory stages/branches/loops/review gates/result;
- failure/risky/prototype-relevant situations;
- added/changed/moved/replaced/removed/preserved meaning;
- affected objects/statuses/decisions/relations;
- which incoming meanings cause each change;
- supporting artifacts and why they are not peer mandatory pictures;
- internal conflicts and unresolved choices;
- genuine cross-workflow effects.

### 8.5 Relation Review

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

Relation and action are separate.

### 8.6 Canonical Item-Set Transition

For each primary owner identify:

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

Do not assign a new ID unless independent meaning remains after checking current owners/merges/scope.

### 8.7 Identity And History Rules

```text
Update:
  preserve identity when responsibility survives;

Rename:
  preserve identity and show old → new name;

Merge:
  show absorbed meanings/identities and surviving identity;

Split:
  justify independent purpose/owner/lifecycle/review/work target
  and show old → results mapping;

Move / Re-home:
  change owner/home without duplicate active ownership;

Defer:
  keep visible outside active canonical set;

Supersede / Reject:
  preserve source/provenance and reason;

Add:
  use only when no compatible current owner exists.
```

### 8.8 Transformation Blocks

Every non-trivial change shows:

```text
Current row(s);
Incoming row(s);
Resulting row(s).
```

Recommended shape:

| Role | Semantic name | ID/source | Owner/status | Complete core meaning | Relation/contribution | Action/effect | Identity/history effect | Choice |
|---|---|---|---|---|---|---|---|---|
| Current | <name> | <ID> | <owner> | <independent current meaning> | <target> | <preserved/changed> | <identity> | <choice/—> |
| Incoming | <name> | <source> | <status> | <independent incoming meaning> | <relation> | <adds/corrects/removes> | <mapping> | <choice/—> |
| Resulting | <name> | <ID> | <owner> | <complete result> | <derived from named rows> | <result> | <identity/mappings> | <choice/—> |

Do not replace source/result blocks with an aggregate summary.

### 8.9 Preserve Validation Context

When material, preserve through transformations:

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

### 8.10 Required Reconciliation Output

Report:

- checked and relevant not-checked sources;
- Complete Picture integrity verdicts;
- invalid peer-picture combinations/reclassifications;
- supporting-artifact map;
- complete before/after pictures;
- current, incoming and resulting item sets;
- one transformation block per non-trivial change;
- identity/provenance/source effects;
- preserved hypotheses/risks/prototype-test context;
- compact prototype/risk follow-up when useful;
- cross-workflow consistency only for genuinely separate workflows;
- unresolved choices;
- readiness for a File Update Plan.

No file edit, item-register update, archive, commit or push.

## 9. Current Reality Capture

Current Reality Capture is descriptive.

It may record:

```text
current workflow/actions;
current explanations;
user experience;
strengths;
experienced problems;
suspected risks;
workarounds;
existing ideas;
unknowns/contradictions.
```

It does not silently own accepted future outcomes, architecture or a build decision.

It may be omitted when enough checked current context exists.

## 10. Planning Draft / Full Picture

Build one readable item-backed synthesis for the current planning direction.

Optional semantic core:

```text
desired result;
criteria/status;
boundaries/non-goals;
current/result/action workflows;
reviewed Planning Items/relations;
Complete Picture inventory;
child Full Picture references;
concern coverage/open deeper work;
existing solutions/alternatives;
decisions;
tests/evidence;
branches;
current conclusion/next action.
```

Rules:

- Full Picture does not replace item bodies;
- significant statements trace to items/source/inference/question;
- parent pictures may reference child pictures in their own homes;
- one mandatory workflow is not split into false peer pictures;
- omit sections that do not improve the work.

## 11. Complete Picture Integrity

A workflow Complete Picture:

```text
trigger/input
  → all mandatory stages
  → decisions/branches/loops/review gates
  → understandable result or explicit unresolved end.
```

An explicit upstream/downstream handoff between independently traversable workflows is valid.

A thematic capability/model/view is supporting unless it has its own trigger-to-result lifecycle.

## 12. Concern Lifecycle And Observability

```text
Planning Lens
  → Concern Definition match
  → Concern Suggestion
  → applicability review
  → optional Applied Concern
  → optional separate work target
  → result returned to item and Full Picture.
```

Presets recommend; they do not mandate.

Derived observability may show pending suggestions, open questions, assumptions, risks, evidence/prototype needs, deferred/blocked/resolved work.

Every indicator drills down to concrete records. It does not become one opaque score.

## 13. Alternatives And Branches

Keep planning linear while one path is sufficient.

Create a branch only when alternatives need independent planning/testing.

Parent owns:

```text
decision point;
reason for branching;
selection/rejection criteria;
evidence gaps;
branch inventory;
comparison/final decision.
```

Functional workflows are not competing branches by default.

## 14. Functional Workflows And Details

Create a Functional Workflow Draft only for an independently useful/testable behavior line.

It is not automatically a Complete Picture.

Create a detail artifact only for independent lifecycle/review/reuse/research/testing value.

The parent keeps a useful summary and route.

## 15. Tests And Prototypes

Start from uncertainty and affected decision.

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

Create separate prototype artifacts only when independent setup/evidence/execution/review exists.

Observed evidence updates affected items, concerns, criteria, workflows, Full Pictures and decisions.

## 16. Dynamic Revision

When corrected/new evidence arrives:

```text
update current truth;
preserve deliberate source wording;
revisit affected items/concerns;
revisit parents/children/upstream/downstream;
change representation when needed;
keep a high-level entry point.
```

Deep work must return accepted results to owning items and Full Pictures.

## 17. Entry Into Detailed Planning

Detailed scenario/domain/slice/implementation planning is useful when enough are stable:

```text
desired outcome;
criteria;
selected workflow;
valuable behaviors;
constraints/integrations;
critical assumptions/evidence;
known remaining risks.
```

This is a judgment boundary.

Prototype-depth adaptation is a separate future methodology task.

## 18. Checks Before Returning

- source and review object are explicit;
- item formation was delegated when required;
- accepted meanings were not shortened;
- evidence states remain distinct;
- Complete Pictures pass trigger-to-result integrity;
- supporting artifacts are not mislabeled as peer pictures;
- current/incoming/resulting transformations remain traceable;
- source/provenance survives;
- relevant validation signals survive;
- Full Picture does not duplicate item ownership;
- concerns/suggestions/views keep distinct roles;
- implementation thoughts remain non-final;
- no repository permission was inferred.

## 19. Do Not

```text
- Do not require template-ordered input.
- Do not duplicate the dedicated Planning Item Formation workflow.
- Do not replace complete source messages with excerpts.
- Do not create Source Idea or a Candidate entity.
- Do not treat every fragment as an item.
- Do not treat every item as a final requirement.
- Do not compress or split items merely for length.
- Do not preserve invalid thematic peer Complete Pictures.
- Do not treat models/views/terminology as workflows automatically.
- Do not treat Concern Suggestions as Applied Concerns.
- Do not make presets mandatory.
- Do not create concern/deep-work files mechanically.
- Do not create a branch for every option.
- Do not treat functional workflows as branches.
- Do not create empty artifact families in advance.
- Do not turn implementation thoughts into architecture.
- Do not put project-specific storage/schema in reusable methodology.
- Do not choose exact wrapper syntax here.
- Do not make AI explanation a second canonical source.
- Do not edit repository files, create archives, commit or push through this workflow alone.
```
