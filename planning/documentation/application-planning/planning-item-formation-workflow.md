# Planning Item Formation Workflow

Status: active reusable workflow / projected by project command `сформируй айтемы`
Doc version: v0.3.0-form-items-and-implementation-ideas
Scope: reusable source-to-review process for forming, correcting and accepting semantically complete Planning Items from free-form or structured input without conflating formation with later repository reconciliation or documentation editing.

## 1. Purpose

This file owns the repeated process:

```text
selected source material
  → preserve complete source context
  → form complete proposed Planning Item meanings
  → check relevant current owners proportionally
  → expose new/update/merge/split/re-home/reject effects
  → explicit user review and acceptance
  → portable Markdown or application-native delivery
  → hand accepted items to the project-local planning owner.
```

This workflow does not own:

- the project command name, aliases or permission routing;
- semantic Direction or Use-Case registry entries;
- project-local item IDs, storage or application schema;
- repository-wide Planning Item reconciliation;
- File Update Plans, replacement archives, commits or pushes;
- exact machine syntax for structured AI responses;
- exact Markdown wrapper/reference syntax;
- runtime detection of application-native availability.

Project root UCM owns concrete commands. Project-local areas own accepted item state.


Current OBS command projection:

```text
canonical command: сформируй айтемы
canonical English name: form items
authority: planning/planning-use-case-map.md
```

The reusable workflow still does not own project command naming or permissions.

## 2. Authority And Supporting Owners

Read with:

```text
terminology-and-planning-items.md
application-planning-principles.md
templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
```

Use `application-planning-drafting-workflow.md` when accepted items are being reconciled with complete current owners, assembled into a Planning Draft/Full Picture, reviewed through concerns or prepared for repository updates.

Use project-readable input conventions when the project defines them, for example:

```text
planning/planning-input-conventions.md
```

Projects that adopt the convention own it in `planning/planning-input-conventions.md`. A delimiter or marker may help select a semantic boundary; it does not create an accepted Planning Item or a separate Candidate entity.

## 3. Trigger And Inputs

Use this workflow when the user asks to form, extract, review or update Planning Items from:

- one or more conversation turns;
- a long free-form message;
- a structured user message;
- selected source fragments with surrounding context;
- a template-linked AI response;
- a portable Planning Item ledger;
- a returned user-edited Planning Item review;
- another explicitly selected source.

The source may contain:

```text
facts;
reported experience;
problems;
risks;
assumptions;
questions;
corrections;
examples;
requirements;
acceptance detail;
alternatives;
implementation thoughts;
decisions;
prototype/test findings;
references to existing items.
```

Do not require template-ordered input.

## 4. Source Selection

Select the current source in this order:

```text
1. source explicitly named by the user;
2. source attached in the same message;
3. clearly active source in the current conversation;
4. earlier/local source only when explicitly selected.
```

An archive or ledger from an earlier message is not current automatically.

When the source is incomplete:

- state what is missing;
- preserve the available literal source;
- do not reconstruct missing wording as fact;
- distinguish source-derived meaning from inference.

## 5. Source Model

### Source Message

One complete user or assistant message preserved as historical evidence.

### Source Fragment

An addressable semantic span inside a Source Message or file.

### Source Excerpt

A literal subset used for emphasis or compact evidence. It supplements the complete Source Message in review output; it does not replace it.

### Source Anchor

A resolvable address such as:

```text
conversation/thread identity;
turn identity;
message identity;
file path;
heading;
line/range;
selection/fragment identity.
```

### Source Contribution

A typed many-to-many relation from one Source Message/Fragment to one Planning Item.

Initial contribution roles:

```text
Primary;
Supporting;
Clarifying;
Correcting;
Contradicting;
Example;
Confirmation.
```

One item may use several source contributions. One message or fragment may support several items.

`Source Idea` is not introduced. Normalized interpretation belongs in the Planning Item body; literal evidence remains in Source Messages/Fragments and contribution relations.

## 6. Full-Message Review Contract

For portable human review:

```text
- repeat every complete supporting user message under each item it supports;
- highlight relevant spans while preserving surrounding context;
- preserve chronological order when several messages contribute;
- include exact anchors in addition to, not instead of, the complete message;
- never invent missing original wording.
```

Canonical storage may keep one shared full-message source bank plus contribution relations when the renderer can reproduce the complete per-item review presentation.

A compact excerpt-only ledger is not equivalent to this review contract.

## 7. Formation Algorithm

### Step 1 — Preserve Literal Source

Capture:

- complete source messages;
- chronological order;
- exact anchors when available;
- user formatting and deliberate grouping;
- declared missing context;
- source type and evidence boundary.

Optional structured composition may help address topics/subtopics/questions/examples without rewriting the literal message.

### Step 2 — Identify Semantic Meanings

Identify coherent meanings, not every sentence or fragment.

A proposed item should have independently useful planning meaning, such as:

```text
goal;
initiative;
workstream;
requirement;
criterion;
question;
risk;
assumption;
decision;
action;
evidence;
prototype/test need;
supporting or implementation idea.
```

Do not create a new item merely because:

- text is long;
- a new paragraph begins;
- a delimiter appears;
- the same meaning is repeated;
- one message contributes to several meanings.

### Step 3 — Build The Complete Accumulating Meaning

The detailed document-ready explanation produced during the response may be the item body.

```text
main explanatory section
  → accumulates the complete meaning;

final review block
  → reuses or materializes that complete meaning;
  → does not replace it with a shorter lossy paraphrase.
```

Preserve when relevant:

- statement;
- purpose and rationale;
- examples and counterexamples;
- distinctions;
- exceptions and edge cases;
- criteria;
- dependencies and relations;
- optional relation-backed Implementation Ideas that point to separate Planning Items of kind Implementation Idea;
- consequences;
- ambiguity;
- hypothesis/risk/key situation;
- prototype/test candidate and evidence need;
- decisions affected;
- source context.

There is no arbitrary item-length limit.

### Step 4 — Perform A Targeted Current-Owner Check

Check likely current owners proportionally:

```text
existing Planning Items;
current Planning Drafts / Full Pictures;
principles;
terminology;
workflows;
decisions;
project-local canonical owners;
available source-linked origins/provenance.
```

Do not scan unrelated repository families by default.

Classify relation:

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

Relation describes semantic comparison. Action describes the proposed canonical effect.

### Step 4A — Preserve Implementation Ideas

When an implementation thought has independent planning meaning, keep it as a separate Planning Item with `Item Kind = Implementation Idea` and link it to the affected Planning Item.

```text
Target Planning Item
  field/projection: Implementation Ideas
    → references separate Implementation Idea items;

Implementation Idea
  typed relation: implements / proposes implementation for
    → target Planning Item.
```

The field contains references, not copied bodies or arbitrary text. Linking an idea does not accept architecture, schedule implementation or convert the idea into a requirement.

### Step 5 — Propose Item Actions

Use the smallest sufficient action vocabulary:

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

A proposed item is not automatically a new canonical item.

Preserve current stable identity when semantic responsibility survives.

Create a new identity only when an independently useful meaning has no compatible current owner.

### Step 6 — Preserve Transformations

For every non-trivial change, show separately:

```text
Current item(s);
Incoming meaning(s);
Resulting item(s).
```

A transformation block may contain several Current, Incoming or Resulting rows.

Required history behavior:

- update/rename normally preserves surviving identity;
- merge preserves absorbed identities and all source contributions;
- split may retain one source contribution on several resulting items;
- move/re-home changes owner/home without creating duplicate active meaning;
- supersede/reject preserves source and reason;
- add requires explicit absence of a compatible current owner.

### Step 7 — Review

Use:

```text
templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
```

Review groups:

```text
New;
Updated;
Merge / Split / Re-home / Supersede;
Rejected As Separate;
Unresolved / Deferred.
```

The user may:

```text
accept;
accept with correction;
accept transformation;
reject as separate;
defer;
leave unresolved.
```

Silence is not acceptance when explicit confirmation is required by the active project workflow or command contract.

### Step 8 — Apply Accepted Meaning To The Selected Delivery Mode

Formation acceptance changes the selected item review/working state. It does not automatically edit repository documentation.

## 8. Delivery Modes

### Portable Markdown Mode

```text
complete review blocks
  → explicit acceptance
  → full updated portable ledger.
```

Requirements:

- complete item bodies;
- complete per-item source presentation;
- typed source contributions;
- transformation history;
- accepted/rejected/deferred status;
- unresolved choices.

The portable ledger remains a supported fallback/interoperability artifact.

### Application-Native Mode

```text
structured AI response
  → distinguish references to existing items
    from proposed new/updated items
  → explicit user review
  → confirmed Planning Item is created immediately
    as a managed Reference Object
    of category Planning Item.
```

No second item-to-object conversion is required.

Later Markdown materialization, definition-location assignment, semantic-home assignment or documentation integration changes durability/ownership/location state; it does not create a second semantic Planning Item.

### Auto Mode

A future command/runtime may use application-native mode when the supported application context is available and portable mode otherwise.

Exact detection remains implementation work.

## 9. Managed Identity Boundary

Keep these stages distinct:

```text
unpersisted interpreted meaning:
  ordinary AI proposal;

reviewed proposed Planning Item:
  meaning awaiting acceptance;

confirmed application-native Planning Item:
  managed Planning Item Reference Object immediately;

portable accepted Planning Item:
  accepted portable meaning that may remain portable
  or later enter managed creation/import;

documented/integrated Planning Item:
  same semantic item after durable documentation placement.
```

Candidate/proposed is a review state, not a separate semantic entity.

One semantic Planning Item spans working and documented states.

## 10. Working State Projection

Candidate working/documentation states may include:

```text
Working;
Needs Documentation;
Documented / Integrated;
Unresolved;
Deferred;
Absorbed / Superseded;
Rejected.
```

These are not a final universal enum.

Views display state; they do not create or accept meaning.

## 11. Full Picture Handoff

Accepted Planning Items may feed an item-backed Full Picture.

Rules:

- Full Picture synthesis does not replace canonical item bodies;
- significant Full Picture meaning traces to contributing items, source or explicit inference/question status;
- parent Full Pictures may reference child Full Pictures in their own canonical homes;
- child owners retain complete local meaning;
- semantic home and definition location remain distinct;
- reusable formation does not select project-local file placement automatically.

## 12. Concern And Validation Context

Preserve proportional context when it affects later review:

```text
hypothesis / assumption;
risk / key situation;
prototype / test candidate;
evidence needed;
success / failure / inconclusive interpretation;
affected decision;
priority / blocking state.
```

Do not fill these fields mechanically.

Concern Suggestions remain distinct from Applied Concerns.

Derived concern/item observability may show concrete unresolved work; it is not one opaque quality score and does not accept concerns automatically.

## 13. Returned User-Edited Reviews

When the user returns an edited review file:

1. treat the returned file as the selected working version;
2. compare it with the clearly matching prior version when available;
3. preserve deliberate edits, order and grouping;
4. merge same-message clarifications;
5. repair Markdown structure without erasing semantic changes;
6. return complete affected files;
7. do not silently restore rejected text.

## 14. Output Contract

A complete formation response may contain:

1. document-ready explanatory sections that hold the accumulating meanings;
2. `Planning Items For Review`;
3. complete item blocks;
4. full-message source sections;
5. typed source contributions;
6. transformation blocks;
7. resulting portable ledger or application-native structured proposal;
8. optional relation-backed Implementation Ideas with their independent statuses;
9. unresolved choices and checked/not-checked owners;
10. explicit statement that repository files were not edited unless a separate command authorized it.

## 15. Failure And Conflict Paths

| Situation | Required behavior |
|---|---|
| Source is missing or partial | Declare the limit; do not invent wording. |
| One message supports several items | Repeat/present it for each item and retain typed relations. |
| Several messages support one item | Keep chronological order and all contribution roles. |
| Equivalent current item exists | Update/link/merge after visible review; do not duplicate automatically. |
| Direct semantic conflict exists | Show both meanings and require a choice; do not silently replace. |
| Proposed item is rejected | Preserve source and review history; do not create accepted state. |
| Merge occurs | Combine/deduplicate contributions without losing roles/anchors. |
| Split occurs | Preserve shared contributions on each applicable resulting item. |
| Application-native parsing is ambiguous | Keep proposal visible and require manual review. |
| Portable and app identities differ | Reconcile explicitly before overwrite/import. |
| Current owners are unavailable | State what was not checked and keep placement/identity provisional. |

## 16. Checks Before Returning

Verify:

- selected source is explicit;
- complete messages are preserved or missing source is declared;
- no excerpt silently replaces full-message review;
- full item meaning is not compressed into a shorter duplicate;
- current owner checks are proportional and reported;
- relation and action are separate;
- non-trivial transformations show Current/Incoming/Resulting rows;
- source contributions survive merge/split/reject/supersession;
- no `Source Idea` entity was introduced;
- no Candidate entity was created;
- portable and application-native modes remain distinct;
- managed application-native items are Reference Objects from creation;
- no repository edit/commit/push is implied.

## 17. Open Decisions

- exact project command name and canonical English name;
- exact structured-response machine representation;
- exact source-anchor representation across chat providers;
- final working/documentation status vocabulary;
- temporary app-only persistence/recovery;
- portable/app identity reconciliation;
- runtime settings representation;
- final Reference Object English terminology.

These decisions do not block the reusable formation workflow.
