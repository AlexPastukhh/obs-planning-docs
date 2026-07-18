# Documentation And Reference Object End-To-End Workflow

Status: active accepted project-local Complete Picture / item-backed / implementation not selected
Doc version: v0.1.0-accepted-end-to-end-picture
Scope: trigger-to-result workflow for loading documentation, recognizing and confirming Reference Objects, authoring managed content, round-tripping Markdown, reviewing dependency impact and navigating the resulting state.

## 1. Purpose

This file owns one continuous Documentation And Reference Object workflow.

```text
repository / file / folder / Markdown / reviewed Planning Item
  → load and parse
  → recognize objects, fields and references
  → propose and confirm missing objects
  → establish identity, canonical state and optional home
  → apply flexible fields and category contracts
  → author documents and objects
  → place managed references
  → save complete Markdown
  → detect affected dependants
  → review and refresh/remove references
  → navigate object state, home, occurrences and review targets
  → reach a diff-ready result or explicit Pending Review state
```

The workflow replaces the former peer-level `CP-2`, `CP-3`, `CP-4` and `CP-7` split. Those labels remain historical mappings only.

## 2. Authority And Supporting Owners

Project-local owners:

- [`planning-item-register.md`](planning-item-register.md) — complete active item bodies, sources, absorbed-item history and open questions;
- this file — trigger-to-result workflow and phase/item map;
- [`reference-object-model-and-lifecycle.md`](reference-object-model-and-lifecycle.md) — supporting identity/state/home/durability/shape model;
- [`full-picture.md`](full-picture.md) — Application Root coordination and provisional neighbouring slices.

Reusable planning methodology remains under `planning/documentation/application-planning/`.

## 3. Trigger And Accepted Inputs

The workflow starts when the user works with at least one of these inputs:

- a repository working tree;
- an individual Documentation File;
- a folder, recursively or non-recursively;
- existing mixed Markdown;
- a new documentation file;
- AI-generated Markdown containing possible object definitions;
- a reviewed Planning Item selected for Reference Object creation;
- an existing documentation fragment selected for extraction.

Upstream AI response interpretation and Planning Item formation remain outside this workflow. `ITEM-94 / AI-ITEM-IMPORT` supplies reviewed/proposed Planning Items to the entry boundary but is not one of this workflow's 30 active items.

## 4. End Conditions

A selected work cycle reaches an understandable result when:

```text
- every created/edited Reference Object has stable identity and an explicit canonical-state owner;
- Markdown-backed state has a resolvable definition location;
- optional parent/home is represented separately from state ownership;
- changed Documentation Files are fully materialized for export/diff;
- managed references preserve identity and selected full/bare mode;
- every invalidated dependant is refreshed, removed/replaced, or visibly Pending Review;
- unresolved targets/conflicts remain visible instead of being guessed;
- object, canonical state, optional home and occurrences remain navigable.
```

The cycle may end with a non-empty review queue. Explicit outstanding obligations are a valid result; silent inconsistency is not.

## 5. Before And Accepted Structural Picture

### Before

```text
former CP-2 → object model
former CP-3 → reference and dependency review
former CP-4 → import, authoring and round trip
former CP-7 → navigation and related views
```

Each slice required the others for a real user cycle, so none could be followed independently from trigger to result.

### Accepted result

```text
Documentation And Reference Object End-To-End Workflow
  → owns the continuous process;

Reference Object Model And Lifecycle
  → supports the process with model detail;

navigation/views
  → operate across workflow stages rather than form a parallel Complete Picture.
```

## 6. Phase Map

| Phase | Purpose | Active items |
|---|---|---|
| Scope, parsing and creation | Load selected documentation, preserve mixed Markdown, discover and confirm object creation. | `ITEM-34B`, `ITEM-32B`, `ITEM-31B`, `ITEM-22B`, `ITEM-87` |
| Identity, state and home | Establish Reference Object identity, canonical-state ownership, temporary app-only exception and optional home. | `ITEM-86`, `ITEM-23B`, `ITEM-108`, `ITEM-91` |
| Shape and category contracts | Support arbitrary fields plus category-specific expectations and file-type guidance. | `ITEM-103`, `ITEM-106`, `ITEM-97` |
| Authoring and references | Edit canonical content, resolve targets and create readable full/bare managed references. | `ITEM-93`, `ITEM-90`, `ITEM-114`, `ITEM-101`, `ITEM-88`, `ITEM-73`, `ITEM-83`, `ITEM-105` |
| Change impact and review | Track dependency edges, invalidate dependants and close review obligations explicitly. | `ITEM-29B`, `ITEM-89`, `ITEM-16B` |
| Navigation and views | Preserve work context and expose object/file/home/occurrence relationships throughout the cycle. | `ITEM-35B`, `ITEM-111`, `ITEM-118`, `ITEM-95`, `ITEM-104`, `ITEM-96` |
| Optional AI output | Produce a non-mutating expanded transfer copy. | `ITEM-107` |

Total: **30 active items**.

## 7. Step 1 — Select And Load Scope

### Input

Repository working tree, file, folder or new document.

### Behavior

1. Select the scope.
2. Read complete current text and repository-relative identity.
3. Preserve the difference between repository content, local application edits and conflicts.
4. For folders, keep recursive/non-recursive scope explicit.
5. Load documentation into auxiliary App Memory without hiding the literal files.

### Output

A parsed work scope with source identity and visible conflicts.

Items: `ITEM-34B / REPO-FILE-FOLDER-ROUNDTRIP`, `ITEM-32B / MIXED-MARKDOWN-ROUNDTRIP`.

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

Recognition does not itself authorize object creation or canonical-state replacement.

Items: `ITEM-32B`, `ITEM-83`, `ITEM-105`, `ITEM-103`, `ITEM-114`.

## 9. Step 3 — Discover And Confirm Missing Objects

```text
known identity
  → resolve and compare current state;

missing/proposed identity
  → show proposed identity, content, fields and source location
  → user confirms or rejects
  → only confirmed proposal becomes canonical object state.
```

Duplicate or conflicting identity resolution remains an explicit review; the application must not silently create a second canonical object.

Item: `ITEM-31B / CONFIRMED-OBJECT-DISCOVERY`.

## 10. Step 4 — Enter Through One Of Three Creation Paths

### Reviewed Planning Item

```text
reviewed Planning Item
  → proposed Reference Object
  → user confirmation
  → object creation
  → Planning Item/source relation remains traceable.
```

`RN` and `DAM` remain literal user annotations until a separate interpretation/review.

Item: `ITEM-22B / ITEM-TO-OBJECT` — semantic name **Planning Item To Reference Object**.

### Existing documentation fragment

```text
existing fragment
  → independent-management value identified
  → boundary/identity proposed
  → user confirms
  → Reference Object extracted.
```

Value may come from separate work, exact reuse, one Source of Truth, dependency tracking or independent review/lifecycle. Length alone is not a reason.

Item: `ITEM-87 / OBJECT-EXTRACTION` — semantic name **Reference Object Extraction**.

### Parsed proposed-object definition

An imported or generated definition follows the discovery/confirmation behavior of `ITEM-31B`.

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

Items: `ITEM-86`, `ITEM-23B`, `ITEM-108`, `ITEM-91`.

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
- a missing expected field produces guidance/warning rather than data loss;
- hard restriction requires an explicit contract rule;
- several applicable contracts remain visible when combination/conflict rules are unresolved.

Items: `ITEM-103`, `ITEM-106`; analogous file-level assignments remain in `ITEM-97`.

## 13. Step 7 — Author Canonical Objects And Documents

The user may edit ordinary document prose, canonical object content, fields, categories and surrounding file structure.

```text
canonical object state → editable at its canonical owner;
linked occurrence      → read-only;
surrounding prose      → editable;
linked field content   → remove/replace link or edit target object, never local linked text.
```

An in-file object may be worked on through a separate object surface without requiring a separate Markdown file.

Items: `ITEM-93`, `ITEM-90`, `ITEM-91`, `ITEM-35B`.

## 14. Step 8 — Resolve Targets And Create Managed References

Supported target identities:

- Reference Object;
- Documentation File;
- stable File Location.

Target answers where a link resolves; relation answers why the link exists. Navigation-only file links do not create dependency invalidation by default.

Reference Object representation modes:

```text
full-text → identity + last approved materialized content;
bare      → identity/address without duplicated content.
```

Both modes remain managed occurrences with the same application functionality and may appear in documents or object fields. Collapsed/expanded is application view state; full/bare is persisted Markdown choice.

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

Source change never proves semantic correctness of a dependent context and therefore never forces automatic refresh.

Items: `ITEM-89`, `ITEM-16B`, `ITEM-101`, `ITEM-90`.

## 18. Step 12 — Navigate Throughout The Cycle

Navigation is cross-step workflow behavior, not a parallel Complete Picture.

The user can:

- keep source, target and review context in IDE-like tabs;
- open object state from a reference;
- go separately to canonical state and optional home;
- inspect occurrences and dependency context;
- view Home Objects, Incoming References and Outgoing Uses;
- aggregate direct relations at folder scope;
- filter existing objects/records without creating semantic truth;
- return to the original context after inspection.

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

Item: `ITEM-107 / AI-EXPANDED-COPY`.

## 20. Branches, Loops And Failure Paths

| Condition | Required behavior |
|---|---|
| Proposed object rejected | Keep source text; do not create canonical object state. |
| Existing identity conflicts | Stop automatic creation; expose competing state and source locations. |
| Target missing or ambiguous | Preserve unresolved reference and show the problem; do not guess. |
| Category contracts conflict | Show all applicable contracts and unresolved conflict; do not discard fields. |
| Repository/application state conflicts | Require explicit reconciliation before overwrite/export. |
| Dependant not reviewed | Keep it Pending Review with prior approved materialization. |
| App-only object lacks durable recovery | Keep explicit durability debt and do not present it as Markdown-backed. |
| Later source change | Re-enter dependency invalidation/review loop. |

## 21. Core Objects And States

| Object / record | Relevant states |
|---|---|
| Imported scope | loaded; locally changed; conflict requiring review |
| Proposed object | detected; awaiting confirmation; confirmed; rejected; conflict |
| Reference Object | Markdown-backed; temporary app-only |
| Parent/home | assigned; absent |
| Definition location | assigned; absent only for app-only state |
| Managed occurrence | full-text; bare |
| Reference review | current; Pending Review; refreshed; removed; replaced |
| Target resolution | resolved; missing; ambiguous |
| Category contract | applicable; not applicable; combination/conflict unresolved |
| Repository result | unchanged; modified; diff-ready; conflict unresolved |

## 22. Boundaries

This workflow does not own:

- raw conversation storage and Action Log lifecycle;
- general Planning Item formation, concern suggestion/application or planning deepening;
- exact wrapper/field syntax;
- database/storage engine;
- application-shell and UI-component architecture;
- the general mechanism by which AI receives all current app-only state.

Historical AI-response links may use the same target-resolution/navigation infrastructure but do not enter the normal live stale-reference queue.

## 23. Preserved Invariants

- Real Markdown remains first-class and independently reviewable.
- No parsed/generated content becomes canonical without confirmation.
- Canonical state, Markdown definition location and semantic home remain distinct.
- Linked content remains read-only at use sites.
- Full-text and bare references remain equal managed modes.
- Previous approved materialization remains until explicit review.
- Views expose existing state; they do not create object/concern truth.
- Arbitrary field recognition is separate from category-specific expectations.
- Unresolved conflicts remain visible.
- Implementation directions remain non-final.

## 24. Open Questions

- final English term for `Ссылочный объект`;
- duplicate-object resolution during import;
- category-contract composition, precedence, severity and inheritance;
- exact Markdown marker/field/reference syntax;
- app-only persistence, backup, recovery and Markdown migration;
- direct versus transitive relation expansion;
- headline count for Outgoing Uses;
- current-state transport for AI;
- exact application shell and storage architecture.

## 25. Acceptance And Next Gate

This workflow structure and its 30-item phase map are accepted. The item register and supporting model record the corresponding `50 → 48` transition.

Next structural work:

1. review Chat/AI/Work-State as a trigger-to-result candidate;
2. review Planning Items/Full Picture/Deepening as a trigger-to-result candidate;
3. expand only workflows that pass the same Complete Picture criterion;
4. plan syntax prototypes and runtime architecture separately.
