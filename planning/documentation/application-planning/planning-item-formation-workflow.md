# Planning Item Formation Workflow

Status: active reusable workflow / projected by project command `сформируй айтемы`
Doc version: v1.0.0-portable-review-baseline
Scope: reusable source-to-review process for forming, correcting and accepting semantically complete Planning Items from free-form or structured input without conflating formation with repository editing or application runtime behavior.

## 1. Purpose

This file owns the repeated process:

```text
selected source material
  → preserve complete source context
  → form complete proposed Planning Item meanings
  → check relevant current owners proportionally
  → expose new/update/merge/split/re-home/reject effects
  → explicit user review
  → return a portable reviewable Planning Item set
  → hand accepted meaning to the project-local planning owner.
```

This workflow does not own:

```text
- the project command name, aliases or permissions;
- semantic Direction or Use-Case registry entries;
- project-local item IDs or storage;
- repository-wide Planning Item reconciliation;
- File Update Plans, replacement archives, commits or pushes;
- exact machine syntax for AI responses;
- exact Markdown wrapper/reference syntax;
- a managed-object or application-native runtime.
```

Project root UCM owns concrete commands. Project-local owners own accepted item state.

Current OBS command projection:

```text
canonical command: сформируй айтемы
canonical English name: form items
authority: planning/planning-use-case-map.md
```

## 2. Authority And Supporting Owners

Read with:

```text
application-planning-principles-and-terminology.md
templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
```

Use `application-planning-drafting-workflow.md` when accepted items are being reconciled with complete current owners, assembled into a Planning Draft, reviewed through questions/risks or prepared for repository updates.

Use project-readable input conventions when the project defines them, for example:

```text
planning/planning-input-conventions.md
```

A delimiter or marker may help select a semantic boundary. It does not create an accepted Planning Item or a separate Candidate entity.

## 3. Trigger And Inputs

Use this workflow when the user asks to form, extract, review or update Planning Items from:

```text
one or more conversation turns;
a long free-form message;
a structured user message;
selected source fragments with context;
a template-linked response;
a portable Planning Item ledger;
a returned user-edited Planning Item review;
another explicitly selected source.
```

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
criteria;
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

An archive, ledger or message from an earlier turn is not current automatically.

When the source is incomplete:

```text
- state what is missing;
- preserve the available literal source;
- do not reconstruct missing wording as fact;
- distinguish source-derived meaning from inference.
```

## 5. Source Model

### Source Message

One complete user or assistant message preserved as historical evidence.

### Source Fragment

An addressable semantic span inside a Source Message or file.

### Source Excerpt

A literal subset used for emphasis or compact evidence. It supplements the complete Source Message and does not replace it.

### Source Anchor

A resolvable address such as:

```text
conversation/thread identity;
turn/message identity;
file path;
heading;
line/range;
selection/fragment identity.
```

### Source Contribution

A typed many-to-many relation from one Source Message or Fragment to one Planning Item.

Initial roles:

```text
Primary;
Supporting;
Clarifying;
Correcting;
Contradicting;
Example;
Confirmation.
```

One item may use several source contributions. One source may support several items.

`Source Idea` is not introduced. Normalized interpretation belongs in the Planning Item body; literal evidence remains in source records and contribution relations.

## 6. Full-Message Review Contract

For portable human review:

```text
- repeat every complete supporting user message
  under every item it supports;
- visually highlight the exact relevant span;
- preserve all surrounding context;
- preserve chronological order when several messages contribute;
- include exact anchors in addition to the complete message;
- never invent missing original wording.
```

Default highlighting method:

```text
Markdown bold around the exact original span.
```

Do not alter the original words or silently change their case merely to highlight them.

Fallback when bold conflicts with source formatting:

```text
[RELEVANT SPAN START]
exact original text
[RELEVANT SPAN END]
```

Canonical storage may keep one shared message bank plus contribution relations only when the renderer can reproduce complete per-item review presentation.

An excerpt-only ledger is not equivalent to this contract.

## 7. Formation Algorithm

### Step 1 — Preserve Literal Source

Capture:

```text
complete source messages;
chronological order;
exact anchors when available;
user formatting and deliberate grouping;
declared missing context;
source type and evidence boundary.
```

Optional structured composition may identify topics, questions or examples without rewriting literal source.

### Step 2 — Identify Coherent Meanings

Identify coherent planning meanings, not every sentence or paragraph.

A proposed item may represent:

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
supporting idea;
implementation idea.
```

Do not create a new item merely because:

```text
- text is long;
- a new paragraph begins;
- a delimiter appears;
- the same meaning is repeated;
- one message contributes to several meanings.
```

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

```text
statement;
purpose and rationale;
examples and counterexamples;
distinctions;
exceptions and edge cases;
criteria;
dependencies and relations;
Implementation Ideas;
consequences;
ambiguity;
hypothesis/risk/key situation;
prototype/test candidate and evidence need;
affected decisions;
source context.
```

There is no arbitrary item-length limit.

### Step 4 — Perform A Proportional Current-Owner Check

Check likely current owners:

```text
existing Planning Items;
current Planning Drafts;
principles and terminology;
workflows;
decisions;
project-local canonical owners;
available source/provenance.
```

Do not scan unrelated repository families by default.

Classify semantic relation:

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

### Step 5 — Preserve Independent Implementation Ideas

When an implementation thought has independent planning meaning, keep it as a separate Planning Item:

```text
Item Kind = Implementation Idea
```

Link it to the affected item:

```text
Implementation Idea
  -- implements / proposes implementation for -->
Target Planning Item.
```

The target projection contains references, not copied idea bodies.

Linking does not accept architecture, schedule implementation or convert the idea into a requirement.

### Step 6 — Propose Item Actions

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

Create a new identity only when no compatible current owner exists.

### Step 7 — Preserve Non-Trivial Transformations

For every non-trivial change, show separately:

```text
Current item(s);
Incoming meaning(s);
Resulting item(s).
```

Required history behavior:

```text
update/rename:
  preserve surviving identity;

merge:
  preserve absorbed identities and all source contributions;

split:
  retain applicable source contributions on each result;

move/re-home:
  change owner/location without duplicate active meaning;

supersede/reject:
  preserve source and reason;

add:
  require absence of a compatible current owner.
```

### Step 8 — Review

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

Silence is not acceptance when explicit confirmation is required.

### Step 9 — Return The Reviewable Result

Formation acceptance changes review/working state. It does not automatically edit repository documentation.

Return complete portable Markdown or equivalent reviewable content containing:

```text
complete item bodies;
complete per-item source messages;
typed source contributions;
transformation history;
accepted/rejected/deferred status;
unresolved choices.
```

Later documentation placement or project-local integration is a separate action. It does not require or imply an application runtime.

## 8. Planning Draft Handoff

Reviewed Planning Items may feed an item-backed Planning Draft.

Rules:

```text
- Planning Draft synthesis does not replace item bodies;
- significant synthesis links to items, sources
  or explicit inference/question status;
- Implementation Ideas remain separately owned;
- reusable formation does not choose project-local placement;
- no separate Full Picture entity is required.
```

## 9. Concern And Validation Context

Preserve proportional context when it affects later review:

```text
hypothesis or assumption;
risk or key situation;
prototype/test candidate;
evidence needed;
success/failure/inconclusive interpretation;
affected decision;
priority/blocking state.
```

Do not fill these mechanically.

Concern Suggestions remain distinct from target-specific reviewed concern state.

Derived observability may show concrete unresolved work. It is not one opaque score and does not accept concerns automatically.

## 10. Returned User-Edited Reviews

When the user returns an edited review file:

```text
1. treat the returned file as the selected working version;
2. compare with the clearly matching prior version when available;
3. preserve deliberate edits, order and grouping;
4. merge same-message clarifications;
5. repair Markdown structure without erasing semantic changes;
6. return complete affected files;
7. do not silently restore rejected text.
```

## 11. Output Contract

A complete formation response may contain:

```text
1. document-ready explanatory sections;
2. Planning Items For Review;
3. complete item blocks;
4. full-message source sections;
5. typed source contributions;
6. transformation blocks;
7. resulting reviewable Planning Item set;
8. relation-backed Implementation Ideas;
9. unresolved choices and checked/not-checked owners;
10. explicit repository-edit boundary.
```

## 12. Failure And Conflict Paths

| Situation | Required behavior |
|---|---|
| Source is missing or partial | Declare the limit; do not invent wording |
| One message supports several items | Repeat/present it for each item and retain typed relations |
| Several messages support one item | Keep chronological order and all contribution roles |
| Equivalent current item exists | Update/link/merge after visible review |
| Direct semantic conflict exists | Show both meanings and require a choice |
| Proposed item is rejected | Preserve source and review history |
| Merge occurs | Combine/deduplicate contributions without losing roles/anchors |
| Split occurs | Preserve shared contributions on every applicable result |
| Current owners are unavailable | State what was not checked; keep placement/identity provisional |
| Project storage/integration is unknown | Return portable review; do not invent an application mode |

## 13. Checks Before Returning

Verify:

```text
- selected source is explicit;
- complete messages are preserved or missing source is declared;
- exact relevant spans are highlighted;
- no excerpt silently replaces full-message review;
- full item meaning is not compressed into a shorter duplicate;
- current-owner checks are proportional and reported;
- relation and action are separate;
- non-trivial transformations show Current/Incoming/Resulting;
- source contributions survive merge/split/reject/supersession;
- no Source Idea entity was introduced;
- no Candidate entity was created;
- no unsupported application/runtime mode was promised;
- no repository edit, archive, commit or push is implied.
```

## 14. Open Decisions

Project-specific owners may still decide:

```text
exact source-anchor representation across chat providers;
final working/documentation status vocabulary;
project-local file placement;
project-local storage or import behavior;
runtime settings representation.
```

These decisions do not block the reusable portable formation workflow.
