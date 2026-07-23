# Documentation And Reference Object End-To-End Workflow

Status: active accepted project-local Complete Picture / managed-Planning-Item and first-class-Note boundaries synchronized / implementation not selected
Doc version: v0.3.0-first-class-notes
Scope: trigger-to-result workflow for loading documentation, resolving accepted object-entry paths, authoring managed content, round-tripping Markdown, reviewing dependency impact and navigating the resulting state.

## 1. Purpose

This file owns one continuous Documentation And Reference Object workflow.

```text
repository / file / folder / Markdown
or accepted planning/documentation handoff
  → load and parse
  → recognize objects, fields and references
  → resolve one accepted entry path
  → establish identity, canonical state and optional home
  → apply flexible fields and category contracts
  → author documents and objects
  → place managed references
  → save complete Markdown
  → detect affected dependants
  → review and refresh/remove references
  → navigate object state, home, occurrences and review targets
  → reach a diff-ready result or explicit Pending Review state.
```

The workflow replaces the former peer-level `CP-2`, `CP-3`, `CP-4` and `CP-7` split. Those labels remain historical mappings only.

## 2. Authority And Supporting Owners

Project-local owners:

- [`planning-item-register.md`](planning-item-register.md) — complete active item bodies, sources, transformations and open questions;
- this file — trigger-to-result Documentation/Reference workflow and phase/item map;
- [`reference-object-model-and-lifecycle.md`](reference-object-model-and-lifecycle.md) — supporting identity/state/home/durability/shape model;
- [`full-picture.md`](full-picture.md) — Application Root coordination and cross-workflow inventory;
- [`complete-pictures/planning-items-and-full-picture/full-picture.md`](complete-pictures/planning-items-and-full-picture/full-picture.md) — upstream Planning Item formation, Full Picture and documentation handoff.

Reusable planning methodology remains under `planning/documentation/application-planning/`.

## 3. Trigger And Accepted Inputs

The workflow starts when the user works with at least one of:

- a repository working tree;
- an individual Documentation File;
- a folder, recursively or non-recursively;
- existing mixed Markdown;
- a new documentation file;
- AI-generated Markdown containing possible object definitions;
- an already managed Planning Item Reference Object selected for documentation placement/materialization;
- a reviewed portable Planning Item meaning selected for managed object creation;
- an existing documentation fragment selected for extraction.

Upstream source interpretation, Planning Item formation, Full Picture synthesis and concern/deepening loops belong to the Planning Item/Full Picture workflow.

`ITEM-94 / AI-ITEM-IMPORT` supplies reviewed proposals and confirmed managed Planning Items to this boundary. It is not one of this workflow's 31 direct active items.

## 4. End Conditions

A selected cycle reaches an understandable result when:

```text
- every created/edited Reference Object has stable identity
  and an explicit canonical-state owner;
- Markdown-backed state has a resolvable definition location;
- optional parent/home is represented separately from state ownership;
- changed Documentation Files are fully materialized for export/diff;
- managed references preserve identity and selected full/bare mode;
- every invalidated dependant is refreshed, removed/replaced,
  or visibly Pending Review;
- unresolved targets/conflicts remain visible instead of guessed;
- object, canonical state, optional home and occurrences remain navigable.
```

The cycle may end with a non-empty review queue. Explicit outstanding obligations are a valid result; silent inconsistency is not.

## 5. Before And Accepted Structural Picture

### Before the original structural reconciliation

```text
former CP-2 → object model
former CP-3 → reference and dependency review
former CP-4 → import, authoring and round trip
former CP-7 → navigation and related views
```

Each slice required the others for a real user cycle, so none was independently traversable.

### Accepted result

```text
Documentation And Reference Object End-To-End Workflow
  → owns the continuous process;

Reference Object Model And Lifecycle
  → supports the process with model detail;

navigation/views
  → operate across stages rather than form a peer Complete Picture.
```

### Later accepted interface correction

```text
Planning Item/Full Picture workflow
  → may already create a managed Planning Item Reference Object;

this workflow
  → must not repeat object-creation confirmation;
  → owns canonical-state/durability/home/materialization/reference placement
    after the explicit handoff.
```

Portable reviewed items and existing fragments still use confirmation-gated creation/extraction paths.

## 6. Phase Map

| Phase | Purpose | Active items |
|---|---|---|
| Scope, parsing and creation | Load documentation, preserve mixed Markdown, resolve entry path, confirm object creation when identity does not already exist, and provide first-class Note entry actions. | `ITEM-34B`, `ITEM-32B`, `ITEM-31B`, `ITEM-22B`, `ITEM-87`, `ITEM-124` |
| Identity, state and home | Establish identity, canonical-state ownership, temporary app-only exception and optional home. | `ITEM-86`, `ITEM-23B`, `ITEM-108`, `ITEM-91` |
| Shape and category contracts | Support arbitrary fields plus category-specific expectations and file-type guidance. | `ITEM-103`, `ITEM-106`, `ITEM-97` |
| Authoring and references | Edit canonical content, resolve targets and create readable full/bare managed references. | `ITEM-93`, `ITEM-90`, `ITEM-114`, `ITEM-101`, `ITEM-88`, `ITEM-73`, `ITEM-83`, `ITEM-105` |
| Change impact and review | Track dependency edges, invalidate dependants and close review obligations explicitly. | `ITEM-29B`, `ITEM-89`, `ITEM-16B` |
| Navigation and views | Preserve context and expose object/file/home/occurrence relationships throughout the cycle. | `ITEM-35B`, `ITEM-111`, `ITEM-118`, `ITEM-95`, `ITEM-104`, `ITEM-96` |
| Optional AI output | Produce a non-mutating expanded transfer copy. | `ITEM-107` |

Total direct active items: **31**.

## 7. Step 1 — Select And Load Scope

### Input

Repository working tree, file, folder, new document or an accepted planning/documentation handoff.

### Behavior

1. Select scope.
2. Read complete current text and repository-relative identity.
3. Preserve the difference between repository content, local application edits and conflicts.
4. For folders, keep recursive/non-recursive scope explicit.
5. Load documentation into auxiliary App Memory without hiding literal files.
6. Preserve an upstream managed item identity when it already exists.

### Output

A parsed work scope with source identity, handoff identity and visible conflicts.

Items: `ITEM-34B`, `ITEM-32B`.

## 8. Step 2 — Parse And Recognize

The application recognizes:

- ordinary Markdown;
- canonical object definitions;
- object identity and boundaries;
- arbitrary correctly represented fields;
- full-text and bare managed references;
- field-level references;
- Documentation File and File Location targets;
- unresolved, ambiguous or conflicting markers.

Recognition does not authorize canonical creation or state replacement by itself.

Items: `ITEM-32B`, `ITEM-83`, `ITEM-105`, `ITEM-103`, `ITEM-114`.

## 9. Step 3 — Resolve The Entry Context

Before proposing creation, determine whether the incoming meaning already has managed identity.

```text
known managed Reference Object identity
  → resolve current canonical state and continue without new creation;

portable reviewed meaning without managed identity
  → use Planning Item proposal/confirmation path;

existing fragment without independent identity
  → use extraction path;

parsed/generated proposed definition
  → use discovery/conflict/confirmation path.
```

Ambiguous identity is an explicit conflict. Do not guess or create a duplicate.

## 10. Step 4 — Enter Through One Of Four Paths

### A. Already managed Planning Item Reference Object

```text
confirmed application-native Planning Item
  → stable managed identity already exists
  → preserve full item/source relations
  → choose/confirm canonical-state owner and durability mode
  → optionally assign semantic home
  → materialize definition/reference placement
  → continue through authoring and diff review.
```

No second item-to-object confirmation occurs.

### B. Portable reviewed Planning Item

```text
reviewed portable Planning Item meaning
  → Reference Object proposal
  → explicit user confirmation
  → managed object creation
  → Planning Item/source relation remains traceable.
```

`RN` and `DAM` remain literal user annotations until separately interpreted/reviewed.

### C. Existing documentation fragment

```text
existing fragment
  → independent-management value identified
  → boundary/identity proposed
  → user confirms
  → Reference Object extracted.
```

Independent value may come from separate work, exact reuse, one Source of Truth, dependency tracking or independent review/lifecycle. Length alone is not a reason.

### D. Parsed proposed-object definition

```text
known identity
  → resolve and compare current state;

missing/proposed identity
  → show proposed identity, content, fields and source location
  → resolve duplicate/conflict
  → user confirms or rejects
  → only confirmed proposal becomes canonical object state.
```

Items: `ITEM-22B`, `ITEM-87`, `ITEM-31B`.


### E. First-class Note

```text
Create Standalone Note
  → create a Reference Object with category `Note`
  → accept optional title and text body
  → no target relation is required;

Add Note To Object
  → create a Reference Object with category `Note`
  → accept optional title and text body
  → create one explicit `note for` relation to the selected object.
```

A Note remains a separate object. It is never represented merely as an arbitrary field on the selected target.

Item: `ITEM-124`.

## 11. Step 5 — Establish Identity, State And Optional Home

Every object has:

- stable Reference Object identity;
- canonical-state owner;
- Markdown definition location when Markdown-backed;
- optional parent/home;
- explicit durability mode.

```text
Markdown-backed normal mode
  → Markdown owns canonical editable state
  → App Memory is auxiliary parsed/indexed state;

temporary app-only mode
  → application temporarily owns canonical state
  → persistence, backup, recovery and migration remain explicit debt;

parent/home
  → optional semantic context
  ≠ canonical-state owner
  ≠ definition location.
```

For a confirmed application-native Planning Item, managed identity already exists before this step. This step selects or updates state ownership/location/home; it does not create the item again.

Items: `ITEM-86`, `ITEM-23B`, `ITEM-108`, `ITEM-91`, interface `ITEM-22B`.

## 12. Step 6 — Configure Flexible Fields And Category Contracts

Confirmed model:

```text
Reference Object
  → unrestricted text-first body;
  → arbitrary user-created fields;
  → several category/type/status values may coexist;

application parser
  → recognizes any correctly represented field;

Object Category Field Contract
  → describes fields expected for an applicable category;
  → may be reused as a preset;
  → may include category-presence applicability conditions;
  → does not globally limit all fields the application can recognize.
```

Conservative current behavior:

- additional unknown fields are allowed;
- missing expected fields produce guidance/warning rather than data loss;
- hard restriction requires an explicit contract rule;
- applicable-contract combination/conflict remains visible when unresolved.

Planning Item fields and states are category-specific planning meaning, not mandatory fields on every Reference Object.


The Note category contract may recommend `Title` and recognizes the object as eligible for Note-specific views. A typed Notes collection/projection may accept only objects whose categories include `Note`; this is an explicit restriction of that projection, not a global parser restriction.

Items: `ITEM-103`, `ITEM-106`; analogous file-level assignments remain in `ITEM-97`.

## 13. Step 7 — Author Canonical Objects And Documents

The user may edit ordinary document prose, canonical object content, fields, categories and surrounding structure.

```text
canonical object state → editable at its canonical owner;
linked occurrence      → read-only;
surrounding prose      → editable;
linked field content   → remove/replace link or edit target object,
                         never local linked text.
```

An in-file object may be worked on through a separate object surface without requiring a separate Markdown file.

Items: `ITEM-93`, `ITEM-90`, `ITEM-91`, `ITEM-35B`.

## 14. Step 8 — Resolve Targets And Create Managed References

Supported target identities:

- Reference Object;
- Documentation File;
- stable File Location.

Target answers where a link resolves; relation answers why it exists. Navigation-only file links and `note for` associations do not create dependency invalidation by default.

Reference Object representation modes:

```text
full-text → identity + last approved materialized content;
bare      → identity/address without duplicated content.
```

Both remain managed occurrences with the same application functionality and may appear in documents or object fields. Collapsed/expanded is view state; full/bare is persisted Markdown choice.

Items: `ITEM-114`, `ITEM-101`, `ITEM-88`, `ITEM-73`, `ITEM-83`, `ITEM-105`.

## 15. Step 9 — Save And Round-Trip Complete Markdown

```text
application work state
  → materialize complete Markdown files
  → preserve ordinary text/formatting
  → preserve object identity/boundaries
  → preserve canonical/reference role
  → preserve arbitrary fields
  → preserve full/bare mode
  → return complete files through repository diff review.
```

Do not silently convert reference mode, canonical role, ordinary prose, unknown fields or pending old materializations.

Items: `ITEM-32B`, `ITEM-34B`.

## 16. Step 10 — Detect Change Impact

When canonical object state changes:

```text
object changed
  → typed dependency graph finds document and object-field dependants
  → dependants become Pending Review
  → previous approved full-text materialization remains
  → source change and review obligation become visible.
```

Items: `ITEM-29B`, `ITEM-89`, `ITEM-16B`.

## 17. Step 11 — Review Affected Dependants

For each affected occurrence, show:

- changed source;
- previous approved materialization when present;
- dependent context and relation;
- concrete occurrence location.

Closing actions:

```text
approve and refresh;
remove reference;
replace reference;
leave Pending Review.
```

Source change never proves semantic correctness of a dependent context and never forces automatic refresh.

Items: `ITEM-89`, `ITEM-16B`, `ITEM-101`, `ITEM-90`.

## 18. Step 12 — Navigate Throughout The Cycle

Navigation is cross-step behavior, not a peer Complete Picture.

The user can:

- keep source, target and review context in IDE-like tabs;
- open object state from a reference;
- go separately to canonical state and optional home;
- inspect occurrences and dependency context;
- view Home Objects, Incoming References and Outgoing Uses;
- aggregate direct relations at folder scope;
- filter existing objects/records without creating semantic truth;
- return to the original context;
- open the upstream Planning Item and Full Picture when the object came from planning.
- open All Notes and Notes For Selected Object as category/relation-filtered projections;

Items: `ITEM-35B`, `ITEM-111`, `ITEM-118`, `ITEM-95`, `ITEM-104`, `ITEM-96`.

## 19. Step 13 — Optional AI-Expanded Copy

```text
selected file
  → resolve bare/full object references
  → produce expanded transfer copy
  → preserve identity/boundaries
  → expose unresolved targets
  → do not mutate saved Markdown.
```

Item: `ITEM-107`.

## 20. Branches, Loops And Failure Paths

| Situation | Required behavior |
|---|---|
| Managed Planning Item identity already exists | Do not create a second object; resolve state/home/materialization. |
| Portable item proposal rejected | Keep source/review history; do not create managed state. |
| Existing identity conflicts | Stop automatic creation; expose competing state and locations. |
| Target missing or ambiguous | Preserve unresolved reference and show the problem; do not guess. |
| Category contracts conflict | Show all applicable contracts and unresolved conflict; do not discard fields. |
| Repository/application state conflicts | Require explicit reconciliation before overwrite/export. |
| Dependant not reviewed | Keep it Pending Review with prior approved materialization. |
| App-only object lacks durable recovery | Keep explicit durability debt; do not present it as Markdown-backed. |
| Later source change | Re-enter dependency invalidation/review loop. |
| Upstream item meaning changes | Re-enter Planning Item/Full Picture reconciliation, then hand off again. |

## 21. Core Objects And States

| Object / record | Relevant states |
|---|---|
| Imported scope | loaded; locally changed; conflict requiring review |
| Proposed object | detected; awaiting confirmation; confirmed; rejected; conflict |
| Managed Planning Item input | already managed; portable/not managed; conflict/ambiguous |
| Reference Object | Markdown-backed; temporary app-only |
| Note Reference Object | standalone; linked by `note for`; titled; untitled |
| Parent/home | assigned; absent |
| Definition location | assigned; absent only for app-only state |
| Managed occurrence | full-text; bare |
| Reference review | current; Pending Review; refreshed; removed; replaced |
| Target resolution | resolved; missing; ambiguous |
| Category contract | applicable; not applicable; combination/conflict unresolved |
| Repository result | unchanged; modified; diff-ready; conflict unresolved |

## 22. Cross-Workflow Interface Contract

| Upstream result | This workflow behavior |
|---|---|
| Confirmed application-native Planning Item | Reuse managed identity; no second creation confirmation. |
| Accepted portable item meaning | Keep portable or propose/confirm managed object creation. |
| Item-backed Full Picture statement | Use linked items/objects; do not make Full Picture prose a duplicate canonical item body. |
| Concern/deep-work result | Materialize only accepted resulting meaning; keep unresolved work explicit. |
| Repository reconciliation result | Apply only the reviewed owner placement/meaning transition. |

## 23. Boundaries

This workflow does not own:

- raw conversation storage and Action Log lifecycle;
- Planning Item source formation/review and Full Picture synthesis before handoff;
- concern suggestion/application and planning deepening;
- exact wrapper/field syntax;
- database/storage engine;
- application-shell and UI-component architecture;
- the general mechanism by which AI receives all current app-only state.

Historical AI-response links may use the same target-resolution/navigation infrastructure but do not enter the normal live stale-reference queue.

## 24. Preserved Invariants

- Real Markdown remains first-class and independently reviewable.
- Parsed/generated content does not become accepted state without confirmation.
- Already managed identity is never recreated merely because Markdown placement is new.
- Canonical state, Markdown definition location and semantic home remain distinct.
- Linked content remains read-only at use sites.
- Full-text and bare references remain equal managed modes.
- Previous approved materialization remains until explicit review.
- Views expose existing state; they do not create object/concern truth.
- Arbitrary field recognition is separate from category-specific expectations.
- Unresolved conflicts remain visible.
- Implementation directions remain non-final.

## 25. Open Questions

- final English term for `Ссылочный объект`;
- duplicate/compatible-object resolution during import;
- portable item identity matching during application import;
- category-contract composition, precedence, severity and inheritance;
- exact Markdown marker/field/reference syntax;
- app-only persistence, backup, recovery and Markdown migration;
- direct versus transitive relation expansion;
- headline count for Outgoing Uses;
- current-state transport for AI;
- exact application shell and storage architecture;
- whether Note titles become mandatory;
- multi-target Note behavior;
- exact category-removal enforcement for Notes projection.

## 26. Acceptance And Next Gate

This workflow structure and its 31-item phase map remain accepted. This update accepts the corrected handoff from the Planning Item/Full Picture workflow:

```text
managed application-native Planning Item
  → no second object creation;

portable reviewed Planning Item
  → proposal/confirmation path remains.
```

Next work:

1. synchronize reusable planning-item formation terminology/workflow/template;
2. add semantic Direction and Use-Case registries;
3. add project-readable input conventions and the item-formation command;
4. project semantic navigation in Tampermonkey;
5. plan syntax prototypes and runtime architecture separately.
