# Reference Object Model And Lifecycle

Status: active project-local complete-picture review / proposed canonical item-set transition not applied
Doc version: v0.1.0-cp2-review
Scope: CP-2 model for Reference Object identity, creation, extraction, canonical state, optional home, durability modes and flexible fields. Detailed current item bodies remain in [`planning-item-register.md`](planning-item-register.md).

## 1. Purpose

This file is the complete review object for CP-2 — Reference Object Model And Lifecycle.

It makes the model understandable before any current Planning Item is renamed, merged or absorbed.

```text
current ten-item working model
  → complete current picture
  → proposed coherent Reference Object model
  → six traceable transformation blocks
  → proposed six-item resulting set
  → explicit acceptance gate before register changes
```

The proposed resulting set in this file is review material. The active working register remains unchanged until the user explicitly accepts the transformations.

## 2. Authority And Checked Sources

Project-local owners:

- [`planning-item-register.md`](planning-item-register.md) — complete working item bodies, sources, audit and open questions;
- [`full-picture.md`](full-picture.md) — Application Root coordination and cross-picture invariants;
- this file — complete CP-2 model and proposed CP-2 item-set transition.

Supporting reusable owners:

```text
planning/documentation/application-planning/terminology-and-planning-items.md
planning/documentation/application-planning/application-planning-principles.md
planning/documentation/application-planning/application-planning-drafting-workflow.md
```

Checked current CP-2 items:

- [Reference Object Term](planning-item-register.md#item-86) — `ITEM-86 / REFERENCE-OBJECT-TERM`;
- [Item To Object](planning-item-register.md#item-22b) — `ITEM-22B / ITEM-TO-OBJECT`;
- [Object Extraction](planning-item-register.md#item-87) — `ITEM-87 / OBJECT-EXTRACTION`;
- [Markdown Primary Truth](planning-item-register.md#item-23b) — `ITEM-23B / MARKDOWN-PRIMARY-TRUTH`;
- [Hybrid App Memory](planning-item-register.md#item-25b) — `ITEM-25B / HYBRID-APP-MEMORY`;
- [In-File Home Object](planning-item-register.md#item-91) — `ITEM-91 / IN-FILE-HOME-OBJECT`;
- [Homeless General Object](planning-item-register.md#item-102) — `ITEM-102 / HOMELESS-GENERAL-OBJECT`;
- [Temporary App-Only Object](planning-item-register.md#item-108) — `ITEM-108 / TEMP-APP-ONLY-OBJECT`;
- [Flexible Object Shape](planning-item-register.md#item-103) — `ITEM-103 / FLEXIBLE-OBJECT-SHAPE`;
- [Optional Field Contract](planning-item-register.md#item-106) — `ITEM-106 / OPTIONAL-FIELD-CONTRACT`.

## 3. Scope And Boundaries

CP-2 owns:

```text
- Reference Object identity and user-facing terminology;
- confirmation-gated creation from reviewed/imported Planning Items;
- extraction from existing documentation;
- canonical state, optional Markdown definition location and optional parent/home;
- Markdown-backed and temporary app-only durability modes;
- flexible object body and field contract;
- model-level lifecycle and transition boundaries.
```

CP-2 does not own:

| Neighbouring picture | Responsibility kept outside CP-2 |
|---|---|
| CP-3 — Managed References And Dependency Review | Full/bare reference occurrences, field-level references, stale review, dependency edges and marker behavior. |
| CP-4 — Import, Authoring And Repository Round Trip | Repository/file scanning, proposed-object discovery, authoring and literal Markdown/Git round trip. |
| CP-5 — Chat, AI Responses And Work-State Trace | Conversation evidence, RN/DAM capture and response artifacts. |
| CP-6 — Planning Items, Full Picture And Deepening | General Planning Item lifecycle, relations, concern work and repository reconciliation method. |
| CP-7 — IDE Navigation And Related-Object Views | Tabs, definition/home jumps and related-object projections. |
| Future implementation planning | Database, application shell, concrete storage engine, exact serialization grammar and UI component architecture. |

## 4. Current Canonical Working Set

The current active working set contains ten CP-2 items:

| Semantic name | ID / code | Independent current responsibility |
|---|---|---|
| Reference Object Term | `ITEM-86 / REFERENCE-OBJECT-TERM` | Introduces the user-facing object term and distinguishes the reusable object from a file region. |
| Item To Object | `ITEM-22B / ITEM-TO-OBJECT` | Allows reviewed/imported Planning Items to become managed objects after confirmation while keeping RN/DAM raw. |
| Object Extraction | `ITEM-87 / OBJECT-EXTRACTION` | Allows useful existing document fragments to be extracted for independent management. |
| Markdown Primary Truth | `ITEM-23B / MARKDOWN-PRIMARY-TRUTH` | Makes Markdown the normal canonical state for document-backed objects and exposes an app-only exception. |
| Hybrid App Memory | `ITEM-25B / HYBRID-APP-MEMORY` | Distinguishes auxiliary parsed/indexed App Memory from temporary app-owned canonical state. |
| In-File Home Object | `ITEM-91 / IN-FILE-HOME-OBJECT` | Allows an object to belong to a file/location while being edited through an independent object work surface. |
| Homeless General Object | `ITEM-102 / HOMELESS-GENERAL-OBJECT` | Allows an object to exist without parent/home. |
| Temporary App-Only Object | `ITEM-108 / TEMP-APP-ONLY-OBJECT` | Defines a deferred temporary app-only state for a general object with no Markdown location. |
| Flexible Object Shape | `ITEM-103 / FLEXIBLE-OBJECT-SHAPE` | Defines an anonymous/flexible body with one common main text field and optional additional fields. |
| Optional Field Contract | `ITEM-106 / OPTIONAL-FIELD-CONTRACT` | Separates recognized optional semantic fields from unrestricted body content and required parser mechanics. |

Current-set boundary:

```text
active working CP-2 set: 10 items
accepted resulting CP-2 set: not yet established
this review: proposes 6 resulting meanings
```

## 5. Complete Current Picture — Before The Proposed Transition

```text
Reference Object terminology
  → exists as a working item;
  → reusable terminology still uses broader Object / InformationItem /
    Object-backed Content / Object-backed Region terms;
  → the object itself, its home and its materialized occurrence can still be confused.

Object creation
  → reviewed/imported Planning Items may become objects after confirmation;
  → arbitrary existing document fragments may be extracted when useful;
  → RN and DAM remain raw user annotations unless separately interpreted.

Canonical state
  → Markdown is the normal durable owner for document-backed objects;
  → App Memory is usually auxiliary parsed/indexed state;
  → a general object may temporarily exist only in the app;
  → the temporary exception has unresolved backup, recovery and migration behavior.

Home
  → an object may belong to a location inside a file;
  → an object may also have no parent/home;
  → canonical state always has an owner;
  → optional Markdown definition location and semantic home are separate relations.

Shape
  → object form is flexible and mostly text-oriented;
  → optional known fields help parsing, filtering and relations;
  → required identity/parser mechanics are not yet separated completely from optional semantic fields.
```

The ten items preserve all important source meanings, but several item boundaries overlap. The current model therefore repeats the same responsibility across source-of-truth, App Memory, temporary storage, home and field-contract items.

## 6. Proposed Complete Reference Object Model

### 6.1 Core Definition

```text
Reference Object
  = an independently identifiable and manageable unit of documentation meaning
    that may be defined in Markdown or temporarily owned by the application,
    may have an optional semantic home,
    may appear through references or materialized occurrences,
    and may use a flexible text-first field shape.
```

This definition is provisional. The Russian user-facing term `Ссылочный объект` is directly supported by the working source. The final English canonical term remains a review choice.

### 6.2 Identity, State, Home And Occurrence

| Concept | Proposed responsibility | Not the same as |
|---|---|---|
| Reference Object identity | Stable identity of the independently managed meaning. | A file path, display tab or one occurrence. |
| Canonical state | Authoritative editable content and fields; always owned by Markdown or, temporarily, by the application. | Definition location or parent/home. |
| Parent/home | Optional semantic context to which the object belongs. | Storage location or proof of existence. |
| Definition location | Markdown file/location containing canonical editable state when Markdown-backed. | Every location where the object is referenced. |
| Reference occurrence | A link or materialized use of the object in another context. | The object identity itself. |
| Materialized occurrence | Visible object content emitted into a file or view. | Automatic authority over the source object. |
| App Memory | Parsed/indexed auxiliary model, except for an explicit temporary app-only durability mode. | Global Source of Truth for all documentation. |

### 6.3 Proposed Lifecycle

#### Existing documentation fragment

```text
existing Markdown fragment
  → independent-management value is identified
  → extraction is proposed
  → user reviews the proposed boundary and identity
  → user confirms
  → Reference Object is created
  → canonical-state owner, optional Markdown definition location and optional home are recorded
  → existing or later occurrences remain linked to the object.
```

Independent-management value may include:

- exact reuse without paraphrase loss;
- separate editing without creating another Markdown file;
- collapse/expand or object-focused work;
- one canonical editable state;
- dependency review;
- independent review, lifecycle or reuse.

A fragment is not extracted merely because it is long.

#### Reviewed/imported Planning Item

```text
reviewed/imported Planning Item
  → managed-object creation is proposed
  → user confirms
  → Reference Object is created or linked to an existing compatible object
  → item identity/source relationship remains reviewable
  → the Planning Item is not silently erased.
```

`RN` and `DAM` do not enter this lifecycle automatically:

```text
RN / DAM
  → literal user annotation
  → preserved without AI promotion
  → separate user-requested interpretation/review required
  → only then may a Planning Item or Reference Object be created.
```

#### Later canonical-state movement

```text
temporary app-only object
  → durable representation is designed and reviewed
  → export/backup/recovery behavior exists
  → user approves migration
  → canonical state may move to Markdown or another explicitly accepted owner
  → identity and history remain stable.
```

This is a future lifecycle gate, not a selected storage architecture.

## 7. Durability Modes

| Mode | Canonical state | Home | App Memory role | Current status |
|---|---|---|---|---|
| Markdown-backed object | Markdown definition location | Optional | Parsed/indexed auxiliary state | Normal proposed invariant |
| In-file-home object | Location inside a Markdown file | File or file location | Object work surface plus index | Normal proposed subtype/relationship |
| General object without home | Markdown definition location or temporary app-only state | None | Auxiliary when Markdown-backed; canonical only in the temporary app-only mode | Allowed model state |
| Temporary app-only object | Application-owned state | None by default | Temporary canonical owner | Explicit deferred storage debt |

Rules:

- `home = none` does not imply `identity = none`.
- `home = none` does not require app-only storage.
- `app-only` is a durability mode, not a semantic object category that should spread through the model.
- App-only persistence, backup, recovery, AI-readable export and Markdown conversion remain unresolved.
- No mode authorizes silent replacement of durable Markdown documentation.

## 8. Flexible Shape And Fields

Proposed shape:

```text
Reference Object
  required mechanics:
    stable identity;
    canonical-state mode;
    enough representation information for the application to resolve it;

  common content:
    one unrestricted main text body;

  optional semantic fields:
    user-defined fields;
    category/type/status with multiple values when useful;
    parent/home;
    relations;
    planning-specific fields only when the object participates in planning;
    other recognized fields when a workflow requires them.
```

Boundaries:

- Object body length has no arbitrary cap.
- The common one-text-field shape is a default, not a fixed class schema.
- Optional fields may be omitted or removed when not useful.
- Generic Reference Objects do not require planning provenance or source-excerpt fields.
- Required parser/identity mechanics must remain smaller than the optional semantic vocabulary.
- Exact Markdown marker/wrapper syntax belongs to later prototype and CP-3/CP-4 work.

## 9. Cross-Picture Interfaces

### CP-3 input

CP-2 provides:

```text
object identity;
canonical state;
optional home;
field structure;
referenceable target.
```

CP-3 decides how full/bare and field-level references point to that target, how dependent material becomes stale and how refresh review works.

### CP-4 input

CP-2 provides the object creation and state model. CP-4 decides how files/folders/repositories are scanned, how proposed objects are confirmed and how complete Markdown returns through Git review.

### CP-5 boundary

RN/DAM remain raw annotations owned by chat/work-state capture until the user separately requests interpretation. CP-2 only defines the no-auto-promotion boundary.

### CP-7 input

CP-2 provides identity, definition location and optional home. CP-7 decides how tabs, jumps and relation views expose them.

## 10. Proposed Canonical Item-Set Transition

### Permission boundary

```text
This section proposes transformations.
It does not update planning-item-register.md.
It does not make the proposed names canonical.
It does not absorb any active identity until explicit block-by-block acceptance.
```

### Transformation Block 1 — Reference Object terminology

| Role | Semantic name | ID / source | Owner / status | Core meaning | Relation / contribution | Action / change effect | Identity / history effect | Choice |
|---|---|---|---|---|---|---|---|---|
| Current | Reference Object Term | `ITEM-86 / REFERENCE-OBJECT-TERM` | Active working register | `Ссылочный объект` is the preferred user-facing term for an independently managed reusable documentation fragment; `Reference Object` is a working English candidate. | Rename/update target. | Preserve the directly supported Russian term and object-level responsibility. | `ITEM-86` survives. | — |
| Incoming | Object-versus-region terminology clarification | Reusable terminology + CP-2 synthesis | Supporting checked meaning | The object must be distinct from `Object-backed Content`, `Object-backed Region`, home and a materialized occurrence. | Clarifies and extends `ITEM-86`. | Add the explicit distinctions and make the name describe the full terminology responsibility. | Supporting meaning is incorporated; no new ID. | Final English canonical term remains open. |
| Resulting | Reference Object Terminology | Proposed `ITEM-86` | Proposed CP-2 canonical item | Own the user-facing/technical term and distinguish object identity from state, home, region and occurrence. | Derived from Current `Reference Object Term` plus Incoming clarification. | **Update And Rename**. | Preserve `ITEM-86`; record old name → new name if accepted. | Accept `Reference Object`, choose another English term, or keep the old name. |

### Transformation Block 2 — Planning Item to managed object

| Role | Semantic name | ID / source | Owner / status | Core meaning | Relation / contribution | Action / change effect | Identity / history effect | Choice |
|---|---|---|---|---|---|---|---|---|
| Current | Item To Object | `ITEM-22B / ITEM-TO-OBJECT` | Active working register | Reviewed/imported Planning Items may become Reference Objects after confirmation; RN/DAM never become items or objects automatically. | Update/rename target. | Preserve confirmation, source relation and raw-annotation boundary. | `ITEM-22B` survives. | — |
| Incoming | Confirmation-gated canonicalization lifecycle | CP-2 lifecycle synthesis | Proposed correcting/expanding meaning | Object creation is a review gate; the Planning Item remains traceable and may link to an existing compatible object instead of creating a duplicate. | Clarifies and extends `ITEM-22B`. | Add explicit proposal/review/confirm/link-or-create steps and no-silent-erasure rule. | No new ID; lifecycle meaning is incorporated. | Whether `canonicalization` is the clearest name. |
| Resulting | Planning Item Canonicalization | Proposed `ITEM-22B` | Proposed CP-2 canonical item | Own the confirmation-gated transition from reviewed/imported Planning Item to a managed Reference Object while preserving item/source history and excluding RN/DAM auto-promotion. | Derived from Current `Item To Object` plus Incoming lifecycle synthesis. | **Update And Rename**. | Preserve `ITEM-22B`; record old name → provisional new name. | Prefer `Planning Item Canonicalization` or the literal `Planning Item To Reference Object`. |

### Transformation Block 3 — Existing document extraction

| Role | Semantic name | ID / source | Owner / status | Core meaning | Relation / contribution | Action / change effect | Identity / history effect | Choice |
|---|---|---|---|---|---|---|---|---|
| Current | Object Extraction | `ITEM-87 / OBJECT-EXTRACTION` | Active working register | An arbitrary existing documentation fragment may be extracted when independent management has practical value. | Rename/clarification target. | Preserve semantic extraction criteria and the non-automatic boundary. | `ITEM-87` survives. | — |
| Incoming | Reference Object scope clarification | `ITEM-86` terminology + CP-2 synthesis | Supporting checked meaning | The extracted entity is specifically a Reference Object; extraction is semantic, not length-based, and requires confirmation. | Clarifies `ITEM-87`. | Add explicit target type and review gate. | Supporting meaning is incorporated; no new ID. | — |
| Resulting | Reference Object Extraction | Proposed `ITEM-87` | Proposed CP-2 canonical item | Own confirmation-gated extraction of useful existing document fragments into independently managed Reference Objects. | Derived from Current `Object Extraction` plus Incoming terminology clarification. | **Update And Rename**. | Preserve `ITEM-87`; record old name → new name. | Accept the clearer name or keep the current name. |

### Transformation Block 4 — Hybrid source-of-truth model

| Role | Semantic name | ID / source | Owner / status | Core meaning | Relation / contribution | Action / change effect | Identity / history effect | Choice |
|---|---|---|---|---|---|---|---|---|
| Current | Markdown Primary Truth | `ITEM-23B / MARKDOWN-PRIMARY-TRUTH` | Active working register | Markdown is the normal canonical state for document-backed objects; app-only general objects are an explicit exception. | Proposed surviving merge target. | Preserve Markdown-first durability and the visibility of the exception. | Candidate surviving identity: `ITEM-23B`. | — |
| Current | Hybrid App Memory | `ITEM-25B / HYBRID-APP-MEMORY` | Active working register | App Memory is normally parsed/indexed auxiliary state but temporarily owns canonical state for app-only general objects. | Extends the source-of-truth mode distinction. | Preserve cache/index versus canonical-state roles. | Proposed absorbed identity if accepted. | — |
| Current | Temporary App-Only Object | `ITEM-108 / TEMP-APP-ONLY-OBJECT` | Active working register | A general object without a Markdown location may temporarily be stored only in the app; durability and migration remain deferred. | Adds explicit temporary debt and migration boundary. | Preserve temporary status, backup/recovery debt and later migration need. | Proposed absorbed identity if accepted. | — |
| Incoming | Unified durability-mode synthesis | CP-2 model review | Proposed synthesis | Markdown-backed and temporary app-only are two explicit canonical-state modes under one model; app-only is not the global default or a permanent architecture decision. | Clarifies and combines all three Current rows. | Remove overlapping ownership while retaining every mode and debt. | No new ID; source mappings remain recorded. | Whether `ITEM-23B` is the best surviving identity. |
| Resulting | Hybrid Source-of-Truth Model | Proposed `ITEM-23B` | Proposed CP-2 canonical item | Own canonical-state modes: Markdown-backed normal state, auxiliary App Memory, temporary app-only exception, and the migration/durability debt of that exception. | Derived from Current `Markdown Primary Truth`, `Hybrid App Memory`, `Temporary App-Only Object` and Incoming synthesis. | **Merge Several** and rename. | `ITEM-23B` survives; `ITEM-25B` and `ITEM-108` map to it and leave the active set only after acceptance. | Accept surviving ID and name; app-only durability details remain open. |

### Transformation Block 5 — Optional home

| Role | Semantic name | ID / source | Owner / status | Core meaning | Relation / contribution | Action / change effect | Identity / history effect | Choice |
|---|---|---|---|---|---|---|---|---|
| Current | In-File Home Object | `ITEM-91 / IN-FILE-HOME-OBJECT` | Active working register | An object may belong to a file/location while being edited independently without forcing a separate Markdown file. | Proposed surviving merge target. | Preserve in-file semantic home and independent work surface. | Candidate surviving identity: `ITEM-91`. | — |
| Current | Homeless General Object | `ITEM-102 / HOMELESS-GENERAL-OBJECT` | Active working register | A Reference Object may exist without parent/home; lack of home is not lack of identity. | Extends `ITEM-91` with the optional-home case. | Preserve `home = none` and keep it separate from withdrawn undefined-object ideas. | Proposed absorbed identity if accepted. | — |
| Incoming | Definition-location versus home separation | `SRC-N40` + CP-2 synthesis | Correcting model meaning | Canonical state always has an owner. A Markdown definition location may be absent in the temporary app-only mode; parent/home may be absent independently and describes semantic context, not storage authority. | Corrects storage/home conflation. | Generalize the responsibility from one home subtype to an optional-home relation model while keeping state ownership explicit. | No new ID; `SRC-N40` remains linked through the register. | Whether `ITEM-91` is the best surviving identity. |
| Resulting | Optional Reference Object Home | Proposed `ITEM-91` | Proposed CP-2 canonical item | Own optional parent/home, in-file home binding, home-less general objects, and separation of semantic home from canonical-state ownership and definition location. | Derived from Current `In-File Home Object`, `Homeless General Object` and Incoming separation. | **Merge Several** and rename. | `ITEM-91` survives; `ITEM-102` maps to it and leaves the active set only after acceptance. | Accept surviving ID and name. |

### Transformation Block 6 — Flexible shape and fields

| Role | Semantic name | ID / source | Owner / status | Core meaning | Relation / contribution | Action / change effect | Identity / history effect | Choice |
|---|---|---|---|---|---|---|---|---|
| Current | Flexible Object Shape | `ITEM-103 / FLEXIBLE-OBJECT-SHAPE` | Active working register | Object shape is anonymous/flexible, usually one main text body plus optional user-defined fields and multi-valued categories. | Proposed surviving merge target. | Preserve unrestricted text-first shape and extensibility. | Candidate surviving identity: `ITEM-103`. | — |
| Current | Optional Field Contract | `ITEM-106 / OPTIONAL-FIELD-CONTRACT` | Active working register | The app recognizes a removable optional semantic vocabulary while required parser/identity mechanics remain distinct and the full body remains unrestricted. | Extends the shape model with parser and field boundaries. | Preserve optionality, multiple values and no mandatory planning provenance for generic objects. | Proposed absorbed identity if accepted. | — |
| Incoming | Shape-versus-contract synthesis | CP-2 model review | Proposed synthesis | One item can own the complete text-first shape and its optional field contract without turning documents into rigid typed records. | Combines and clarifies both Current rows. | Remove duplicated ownership while keeping required mechanics separate from optional semantics. | No new ID; source mappings remain recorded. | Exact minimal required mechanics remain open. |
| Resulting | Flexible Object Shape And Fields | Proposed `ITEM-103` | Proposed CP-2 canonical item | Own unrestricted text-first object bodies, user-defined fields, optional recognized semantic fields, multi-valued metadata and the boundary between required mechanics and optional vocabulary. | Derived from Current `Flexible Object Shape`, `Optional Field Contract` and Incoming synthesis. | **Merge Several** and rename. | `ITEM-103` survives; `ITEM-106` maps to it and leaves the active set only after acceptance. | Accept surviving ID/name and later define minimal mechanics through prototype evidence. |

## 11. Aggregate Proposed Item Change Plan

This matrix is derived from the six transformation blocks and does not replace them.

| Current working meaning(s) | Proposed action | Proposed resulting meaning | Proposed identity/history effect | Applied now |
|---|---|---|---|---|
| Reference Object Term | Update And Rename | Reference Object Terminology | `ITEM-86` survives | No |
| Item To Object | Update And Rename | Planning Item Canonicalization | `ITEM-22B` survives; name provisional | No |
| Object Extraction | Update And Rename | Reference Object Extraction | `ITEM-87` survives | No |
| Markdown Primary Truth + Hybrid App Memory + Temporary App-Only Object | Merge Several + Rename | Hybrid Source-of-Truth Model | `ITEM-23B` survives; `ITEM-25B`, `ITEM-108` map to it | No |
| In-File Home Object + Homeless General Object | Merge Several + Rename | Optional Reference Object Home | `ITEM-91` survives; `ITEM-102` maps to it | No |
| Flexible Object Shape + Optional Field Contract | Merge Several + Rename | Flexible Object Shape And Fields | `ITEM-103` survives; `ITEM-106` maps to it | No |

## 12. Proposed Resulting Canonical Set — Not Applied

If every transformation block is explicitly accepted, the proposed CP-2 canonical set becomes:

1. **Reference Object Terminology** — proposed `ITEM-86`;
2. **Planning Item Canonicalization** — proposed `ITEM-22B`, name provisional;
3. **Reference Object Extraction** — proposed `ITEM-87`;
4. **Hybrid Source-of-Truth Model** — proposed `ITEM-23B`;
5. **Optional Reference Object Home** — proposed `ITEM-91`;
6. **Flexible Object Shape And Fields** — proposed `ITEM-103`.

Count effect if all blocks are accepted later:

```text
CP-2 active items: 10 → 6
whole working register: 50 → 46
absorbed historical IDs retained in transformation history:
  ITEM-25B
  ITEM-108
  ITEM-102
  ITEM-106
```

No count or active identity changes in this CP-2A review update.

## 13. Preserved Meanings

The proposed result must preserve all of these meanings:

- Russian user-facing `Ссылочный объект` term;
- independently managed object identity;
- confirmation before object creation;
- Planning Item/source traceability after object creation;
- RN/DAM no-auto-promotion boundary;
- semantic rather than length-based extraction;
- Markdown-first durable state;
- auxiliary parsed/indexed App Memory;
- explicit temporary app-only exception;
- deferred backup, recovery and migration debt;
- optional parent/home;
- in-file home without mandatory new file;
- object existence without home;
- canonical-state ownership, definition location and home distinction;
- unrestricted text-first body;
- user-defined and multi-valued fields;
- optional recognized field contract;
- no mandatory generic planning provenance fields;
- required parser mechanics separated from optional semantics.

## 14. Open Choices

| Priority | Choice | Why it matters | Conservative fallback for this review |
|---|---|---|---|
| 1 | Final English canonical term for `Ссылочный объект` | Affects terminology, item names and later UI/docs | Keep `Reference Object` as a working candidate only |
| 2 | Final resulting name for `ITEM-22B` | `Planning Item Canonicalization` may sound broader than the actual item → object transition | Keep both candidate names visible; do not rename the register item |
| 3 | Surviving identities for the three merges | Determines historical continuity | Use `ITEM-23B`, `ITEM-91`, `ITEM-103` only as proposals |
| 4 | App-only persistence, backup, recovery and conversion | Temporary canonical state can otherwise be lost | Mark it as explicit debt; do not select storage architecture |
| 5 | AI-readable representation of app-only state | AI cannot rely on Markdown when state exists only in the app | Defer to implementation/prototype planning |
| 6 | Minimal required parser/identity mechanics | Too many required fields would rigidify Markdown; too few may prevent resolution | Require only stable identity and resolvable canonical-state representation at this stage |
| 7 | Exact Markdown marker/wrapper syntax | Crosses CP-2, CP-3 and CP-4 and requires visual/parser evidence | Do not select syntax in this file |

## 15. Acceptance And Next Gate

CP-2A is complete when:

- the complete current and proposed models are reviewable;
- each of the six transformation blocks is independently understandable;
- all ten current item meanings are present;
- every proposed absorbed ID has an explicit source-to-result mapping;
- current facts, synthesis, proposals and open choices remain distinct;
- no item-register edit is included in the diff.

A later **CP-2B — Apply Accepted Reference Object Item Transition** may update:

```text
planning-item-register.md
reference-object-model-and-lifecycle.md
full-picture.md
README.md
```

CP-2B must use only transformations explicitly accepted by the user. Partial acceptance is allowed; the resulting active set and counts must be recalculated from the accepted blocks rather than assuming all six.
