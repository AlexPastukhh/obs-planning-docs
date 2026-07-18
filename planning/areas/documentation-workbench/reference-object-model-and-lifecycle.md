# Reference Object Model And Lifecycle

Status: active supporting Reference Object model / accepted item transition applied
Doc version: v0.2.0-accepted-transition
Scope: supporting model for Reference Object identity, creation, canonical state, optional home, durability, flexible fields and accepted transformation history. Trigger-to-result behavior belongs to [`documentation-and-reference-object-end-to-end-workflow.md`](documentation-and-reference-object-end-to-end-workflow.md).

## 1. Responsibility

```text
Documentation And Reference Object End-To-End Workflow
  → owns the continuous user process;

this file
  → owns model definitions, invariants, durability modes
    and traceable CP-2A → accepted transition history;

planning-item-register.md
  → owns complete canonical item bodies and provenance.
```

The former `CP-2` label is retained as historical structure only. This model is not a peer end-to-end Complete Picture.

## 2. Accepted Active Model Set

| Semantic name | Stable ID / existing code | Responsibility |
|---|---|---|
| Reference Object Term | `ITEM-86 / REFERENCE-OBJECT-TERM` | User-facing term and distinction among object identity, state, definition location, home, region and occurrence. |
| Planning Item To Reference Object | `ITEM-22B / ITEM-TO-OBJECT` | Confirmation-gated transition from reviewed Planning Item to Reference Object; RN/DAM remain raw. |
| Reference Object Extraction | `ITEM-87 / OBJECT-EXTRACTION` | Confirmation-gated extraction of useful existing documentation fragments. |
| Hybrid Source-of-Truth Model | `ITEM-23B / MARKDOWN-PRIMARY-TRUTH` | Markdown-backed canonical state plus auxiliary App Memory and recognition of the app-only exception. |
| Temporary App-Only Object | `ITEM-108 / TEMP-APP-ONLY-OBJECT` | Independent temporary durability/recovery/migration debt. |
| Optional Reference Object Home | `ITEM-91 / IN-FILE-HOME-OBJECT` | Optional semantic home, in-file home and home-less objects, separate from state ownership. |
| Flexible Object Shape | `ITEM-103 / FLEXIBLE-OBJECT-SHAPE` | Text-first unrestricted body and arbitrary correctly represented fields. |
| Object Category Field Contracts | `ITEM-106 / OPTIONAL-FIELD-CONTRACT` | Category-specific expected fields, presets and applicability conditions. |

```text
former active model set: 10
accepted active model set: 8
whole register: 50 → 48
absorbed historical identities:
  ITEM-25B → ITEM-23B
  ITEM-102 → ITEM-91
```

Existing technical codes remain unchanged. Semantic rename history is recorded explicitly.

## 3. Core Definition

```text
Reference Object
  = an independently identifiable and manageable unit of documentation meaning
    with an explicit canonical-state owner,
    an optional Markdown definition location,
    an optional semantic parent/home,
    flexible text-first content and arbitrary fields,
    and zero or more managed occurrences/references.
```

The Russian term `Ссылочный объект` is confirmed. `Reference Object` remains the working English term until a separate terminology decision.

## 4. Identity, State, Location, Home And Occurrence

| Concept | Responsibility | Not the same as |
|---|---|---|
| Reference Object identity | Stable independently managed meaning. | File path, tab or one occurrence. |
| Canonical state | Authoritative editable content/fields; always has an owner. | Definition location or home. |
| Definition location | Markdown file/location containing canonical state when Markdown-backed. | Every reference occurrence. |
| Parent/home | Optional semantic context to which the object belongs. | Storage authority. |
| Reference occurrence | Managed use/link in a document or object field. | Object identity. |
| Materialized full-text occurrence | Last approved duplicated content plus identity. | Automatically current source state. |
| App Memory | Parsed/indexed auxiliary state, except temporary app-only ownership. | Global documentation Source of Truth. |

## 5. Creation And Extraction Lifecycles

### Reviewed Planning Item

```text
reviewed Planning Item
  → Reference Object proposal
  → user confirmation
  → object creation
  → Planning Item identity/source relation remains traceable.
```

`RN` and `DAM` are not promoted automatically. Reuse/linking to an already compatible object remains a later duplicate-resolution question rather than confirmed core behavior.

### Existing documentation fragment

```text
existing fragment
  → independent-management value identified
  → boundary/identity proposed
  → user confirms
  → Reference Object extracted.
```

Independent value may include separate work, exact reuse, one Source of Truth, dependency tracking or independent review/lifecycle. Length alone is never sufficient.

### Parsed proposal

Imported or generated object definitions enter through the workflow's discovery/confirmation phase and do not become canonical as a parsing side effect.

## 6. Durability Modes

| Mode | Canonical-state owner | Definition location | Home | App Memory role |
|---|---|---|---|---|
| Markdown-backed | Markdown | Required/resolvable | Optional | Auxiliary parsed/indexed state |
| In-file-home | Markdown | Location inside a file | File/location | Auxiliary state and object work surface |
| Markdown-backed without home | Markdown | Present | None | Auxiliary state |
| Temporary app-only | Application | None | Optional/usually none | Temporary canonical owner |

Rules:

- `home = none` does not imply `identity = none`.
- `home = none` does not imply app-only storage.
- `definition location = none` is allowed only when another owner, currently the temporary app-only mode, owns canonical state.
- App-only is a durability mode, not the default object category.
- App-only backup, recovery, export and Markdown conversion remain unresolved.

## 7. Flexible Shape And Field Recognition

```text
Reference Object
  required mechanics:
    stable identity;
    canonical-state mode/owner;
    enough representation information to resolve it;

  common content:
    unrestricted main text body;

  optional content:
    arbitrary user-created fields;
    several category/type/status values;
    parent/home;
    relations;
    category-specific fields.
```

The application recognizes any correctly represented field. It does not require every field name to come from a single global vocabulary.

Generic Reference Objects do not require Planning Item provenance/source fields. Exact syntax belongs to later representation/prototype work.

## 8. Object Category Field Contracts

```text
Object Category Field Contract
  → describes fields expected for an applicable object category;
  → may be reused as a preset;
  → may have conditions such as:
      only this category;
      category A when category B is also present;
      another explicit applicability rule;
  → does not limit all fields the parser can recognize by default.
```

Planning Item and concern-related field lists are examples of category contracts. Their semantic meaning remains with their planning/concern owners.

Conservative current rule:

- unknown additional fields are allowed;
- missing expected fields produce guidance/warning;
- hard restriction requires an explicit contract rule;
- contract composition, precedence, conflict handling and inheritance remain open.

## 9. Cross-Workflow Interfaces

| Interface | Model output |
|---|---|
| Parsing/discovery | identity, boundaries, fields, canonical/reference role |
| Authoring | canonical edit owner, flexible body and fields |
| References | stable target identity and occurrence role |
| Dependency review | typed source/target relation and changed canonical state |
| Navigation | object, canonical state, definition location, optional home and occurrences |
| Upstream planning | reviewed Planning Item may enter the confirmation-gated object path |

## 10. Accepted Transformation History

### Block 1 — Reference Object terminology

**Disposition: Accepted With Changes — update content; keep current semantic name pending final English-term decision.**

| Role | Semantic name | ID / source | Core meaning | Relation / action | Identity/history |
|---|---|---|---|---|---|
| Current | Reference Object Term | `ITEM-86` | `Ссылочный объект` is preferred Russian term; English term provisional. | Update target. | `ITEM-86` survives. |
| Incoming | Object/state/home/region/occurrence distinction | model + accepted end-to-end correction | The object itself must be distinct from its state, locations and uses. | Clarifies. | No new ID. |
| Resulting | Reference Object Term | `ITEM-86` | Own the terminology and full distinction vocabulary. | **Update Content; no rename**. | Preserve current name/code and source history. |

### Block 2 — Planning Item to Reference Object

**Disposition: Accepted With Changes — literal semantic rename; existing-compatible-object reuse remains open.**

| Role | Semantic name | ID / source | Core meaning | Relation / action | Identity/history |
|---|---|---|---|---|---|
| Current | Item To Object | `ITEM-22B` | Reviewed/imported Planning Items may become objects after confirmation; RN/DAM never auto-promote. | Update/rename target. | `ITEM-22B` survives. |
| Incoming | Complete confirmation-gated path | accepted workflow synthesis | Make proposal, confirmation, creation and retained item/source relation explicit. | Extends. | No new ID. |
| Incoming | Link to compatible existing object | earlier proposal | Possible duplicate-resolution path. | **Deferred from confirmed core**. | — |
| Resulting | Planning Item To Reference Object | `ITEM-22B` | Own confirmed item → proposed object → confirmation → created object and traceability. | **Update And Rename**. | Existing technical code retained; old semantic name recorded. |

### Block 3 — Existing-fragment extraction

**Disposition: Accepted.**

| Role | Semantic name | ID / source | Core meaning | Relation / action | Identity/history |
|---|---|---|---|---|---|
| Current | Object Extraction | `ITEM-87` | Useful existing fragments may be managed independently. | Rename target. | `ITEM-87` survives. |
| Incoming | Explicit Reference Object target and confirmation | terminology + workflow synthesis | Extraction is semantic, confirmation-gated and not length-based. | Clarifies. | No new ID. |
| Resulting | Reference Object Extraction | `ITEM-87` | Own confirmation-gated extraction with independent work/reuse/review value. | **Update And Rename**. | Existing technical code retained; old semantic name recorded. |

### Block 4 — Hybrid source-of-truth model

**Disposition: Accepted With Changes — absorb only `ITEM-25B`; keep `ITEM-108` active.**

| Role | Semantic name | ID / source | Core meaning | Relation / action | Identity/history |
|---|---|---|---|---|---|
| Current | Markdown Primary Truth | `ITEM-23B` | Markdown normally owns document-backed state. | Merge target. | Survivor candidate. |
| Current | Hybrid App Memory | `ITEM-25B` | App Memory is auxiliary except temporary app-owned state. | Overlaps normal mode distinction. | Absorbed candidate. |
| Current | Temporary App-Only Object | `ITEM-108` | Temporary state has independent durability/migration debt. | Related but independent lifecycle. | Keep active. |
| Incoming | Unified normal source-of-truth model | accepted model synthesis | Markdown-backed canonical state and auxiliary App Memory are one responsibility. | Combines first two rows. | No new ID. |
| Resulting | Hybrid Source-of-Truth Model | `ITEM-23B` | Own Markdown-backed state, auxiliary App Memory and recognition of the app-only exception. | **Merge `ITEM-25B`; rename**. | `ITEM-25B → ITEM-23B`. |
| Resulting | Temporary App-Only Object | `ITEM-108` | Own temporary persistence/recovery/export/migration debt. | **Keep / Update Content**. | `ITEM-108` remains active. |

### Block 5 — Optional home

**Disposition: Accepted.**

| Role | Semantic name | ID / source | Core meaning | Relation / action | Identity/history |
|---|---|---|---|---|---|
| Current | In-File Home Object | `ITEM-91` | Object may belong to a file/location and be worked on independently. | Merge target. | Survivor candidate. |
| Current | Homeless General Object | `ITEM-102` | Object may exist without parent/home. | Opposite state of same relation. | Absorbed candidate. |
| Incoming | State/location/home distinction | `SRC-N40` + accepted model | Canonical state always has an owner; definition location and semantic home differ. | Corrects conflation. | No new ID. |
| Resulting | Optional Reference Object Home | `ITEM-91` | Own in-file/absent home and separation from state ownership/location. | **Merge And Rename**. | `ITEM-102 → ITEM-91`. |

### Block 6 — Flexible shape and category contracts

**Disposition: Accepted With Changes — two resulting items; no merge.**

| Role | Semantic name | ID / source | Core meaning | Relation / action | Identity/history |
|---|---|---|---|---|---|
| Current | Flexible Object Shape | `ITEM-103` | Text-first flexible object with optional fields. | Update target. | `ITEM-103` survives. |
| Current | Optional Field Contract | `ITEM-106` | Optional field expectations mixed with planning/concern examples. | Correct/rename target. | `ITEM-106` survives. |
| Incoming | Arbitrary field recognition | `SRC-N84` | Any correctly represented field can be recognized. | Corrects closed-vocabulary reading. | No new ID. |
| Incoming | Category-specific contracts/presets | `SRC-N84` | Expected fields come from applicable category contracts with conditions. | Reframes contract ownership. | No new ID. |
| Resulting | Flexible Object Shape | `ITEM-103` | Own unrestricted body, arbitrary fields and generic recognition. | **Update Content**. | Preserve `ITEM-103`. |
| Resulting | Object Category Field Contracts | `ITEM-106` | Own category-specific expected fields, presets and applicability rules. | **Update And Rename**. | Existing technical code retained; old semantic name recorded. |

## 11. Aggregate Applied Transition

| Former active meaning(s) | Applied action | Current active result | Identity/history effect |
|---|---|---|---|
| Reference Object Term | Update Content | Reference Object Term (`ITEM-86`) | ID/name retained |
| Item To Object | Update And Rename | Planning Item To Reference Object (`ITEM-22B`) | code/ID retained |
| Object Extraction | Update And Rename | Reference Object Extraction (`ITEM-87`) | code/ID retained |
| Markdown Primary Truth + Hybrid App Memory | Merge + Rename | Hybrid Source-of-Truth Model (`ITEM-23B`) | `ITEM-25B → ITEM-23B` |
| Temporary App-Only Object | Keep / Update | Temporary App-Only Object (`ITEM-108`) | remains active |
| In-File Home Object + Homeless General Object | Merge + Rename | Optional Reference Object Home (`ITEM-91`) | `ITEM-102 → ITEM-91` |
| Flexible Object Shape | Update Content | Flexible Object Shape (`ITEM-103`) | remains active |
| Optional Field Contract | Update And Rename | Object Category Field Contracts (`ITEM-106`) | remains active |

## 12. Preserved Meanings

The accepted transition preserves:

- confirmed Russian user-facing term;
- independently managed identity;
- confirmation before creation;
- Planning Item/source traceability;
- RN/DAM no-auto-promotion boundary;
- semantic rather than length-based extraction;
- Markdown-first normal durable state;
- auxiliary parsed/indexed App Memory;
- separate temporary app-only debt;
- optional home and in-file work surface;
- state/location/home distinction;
- unrestricted text-first bodies;
- arbitrary fields and multiple categories;
- category-specific field expectations;
- no mandatory generic planning provenance fields.

## 13. Open Questions

- final English term;
- duplicate/compatible-object resolution;
- app-only persistence, backup, recovery and migration;
- category-contract composition, precedence, validation severity and inheritance;
- minimal required identity/parser mechanics;
- exact Markdown syntax.

## 14. Next Gate

The model transition is applied. Future changes must update the register first, retain absorbed-ID history and synchronize this model only when identity/state/home/durability/shape meaning changes.
