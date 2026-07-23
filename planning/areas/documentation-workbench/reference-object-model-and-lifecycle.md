# Reference Object Model And Lifecycle

Status: active supporting Reference Object model / managed Planning Item boundary synchronized
Doc version: v0.3.0-managed-planning-item-boundary
Scope: supporting model for Reference Object identity, creation, canonical state, optional home, durability, flexible fields and accepted transformation history. Trigger-to-result behavior belongs to the accepted end-to-end workflow owners.

## 1. Responsibility

```text
Documentation And Reference Object End-To-End Workflow
  → owns document/object authoring, references, dependency review
    and diff-ready result;

Planning Item And Full Picture End-To-End Workflow
  → owns source-linked Planning Item formation/review,
    Full Picture synthesis and documentation handoff;

this file
  → owns Reference Object definitions, invariants, durability modes,
    Planning Item/managed-object boundary
    and traceable model transformation history;

planning-item-register.md
  → owns complete canonical item bodies and provenance.
```

The former `CP-2` label is historical structure only. This model is not a peer end-to-end Complete Picture.

## 2. Accepted Active Model Set

| Semantic name | Stable ID / existing code | Responsibility |
|---|---|---|
| Reference Object Term | `ITEM-86 / REFERENCE-OBJECT-TERM` | User-facing term and distinction among object identity, state, definition location, home, region and occurrence. |
| Planning Item Reference Object Boundary | `ITEM-22B / ITEM-TO-OBJECT` | Distinguish application-native managed Planning Items from portable reviewed items that still require object-creation confirmation. |
| Reference Object Extraction | `ITEM-87 / OBJECT-EXTRACTION` | Confirmation-gated extraction of useful existing documentation fragments. |
| Hybrid Source-of-Truth Model | `ITEM-23B / MARKDOWN-PRIMARY-TRUTH` | Markdown-backed canonical state plus auxiliary App Memory and recognition of the app-only exception. |
| Temporary App-Only Object | `ITEM-108 / TEMP-APP-ONLY-OBJECT` | Independent temporary durability/recovery/migration debt. |
| Optional Reference Object Home | `ITEM-91 / IN-FILE-HOME-OBJECT` | Optional semantic home, in-file home and home-less objects, separate from state ownership. |
| Flexible Object Shape | `ITEM-103 / FLEXIBLE-OBJECT-SHAPE` | Text-first unrestricted body and arbitrary correctly represented fields. |
| Object Category Field Contracts | `ITEM-106 / OPTIONAL-FIELD-CONTRACT` | Category-specific expected fields, presets and applicability conditions. |

```text
former active model set: 10
accepted active model set: 8
whole register:
  50 → 48 through earlier model/workflow reconciliation
  48 → 51 through accepted recent-chat additions

absorbed historical identities:
  ITEM-25B → ITEM-23B
  ITEM-102 → ITEM-91
```

Existing technical codes remain unchanged. Semantic rename history is explicit.

## 3. Core Definition

```text
Reference Object
  = an independently identifiable and manageable unit of documentation meaning
    saved or imported into managed application state,
    with an explicit canonical-state owner,
    an optional Markdown definition location,
    an optional semantic parent/home,
    flexible text-first content and arbitrary fields,
    and zero or more managed occurrences/references.
```

The Russian term `Ссылочный объект` is confirmed. `Reference Object` remains the working English term until a separate terminology decision.

A Planning Item that exists only as transient interpreted meaning in ordinary chat is not yet a managed Reference Object. A Planning Item created in managed application state after explicit confirmation is a Reference Object of category Planning Item immediately.

## 4. Identity, State, Location, Home And Occurrence

| Concept | Responsibility | Not the same as |
|---|---|---|
| Reference Object identity | Stable independently managed meaning. | File path, tab or one occurrence. |
| Planning Item identity | Stable Planning Item meaning/history; application-native managed instances are Reference Objects. | One display title or one Markdown placement. |
| Canonical state | Authoritative editable content/fields; always has an owner. | Definition location or home. |
| Definition location | Markdown file/location containing canonical state when Markdown-backed. | Every reference occurrence. |
| Parent/home | Optional semantic context to which the object belongs. | Storage authority. |
| Reference occurrence | Managed use/link in a document or object field. | Object identity. |
| Materialized full-text occurrence | Last approved duplicated content plus identity. | Automatically current source state. |
| App Memory | Parsed/indexed auxiliary state, except temporary app-only ownership. | Global documentation Source of Truth. |
| Source/provenance relation | Planning/AI evidence and transformation history. | Mandatory field on every generic Reference Object. |

## 5. Planning Item / Reference Object Boundary

### Application-native managed Planning Item

```text
proposed Planning Item in a structured response
  → explicit user review/confirmation
  → Planning Item is created in managed state
  → it is immediately a Reference Object
    of category Planning Item.
```

Later actions may assign or change:

- canonical-state owner;
- durability mode;
- Markdown definition location;
- optional semantic home;
- reference occurrences;
- documentation status.

These actions do not create another semantic object.

### Portable reviewed Planning Item

```text
reviewed item meaning in a portable ledger
  → may remain portable and not app-managed
  → or become a Reference Object proposal
  → explicit confirmation
  → managed object creation.
```

### Raw annotations

`RN` and `DAM` are literal user annotations. They are not Planning Items or Reference Objects until a separate user-requested interpretation/review creates an accepted managed meaning.

### Compatible existing object

Linking or merging a proposed item with an already compatible managed object remains an explicit duplicate-resolution question. Never create a duplicate silently.

## 6. Existing-Fragment Extraction

```text
existing documentation fragment
  → independent-management value identified
  → boundary/identity proposed
  → user confirms
  → Reference Object extracted.
```

Independent value may include separate work, exact reuse, one Source of Truth, dependency tracking or independent review/lifecycle. Length alone is never sufficient.

## 7. Parsed Proposal

Imported or generated object definitions enter through discovery/conflict/confirmation and do not become canonical as a parsing side effect.

A known managed identity is resolved and compared. A missing identity is proposed. An ambiguous/conflicting identity remains visible.

## 8. Durability Modes

| Mode | Canonical-state owner | Definition location | Home | App Memory role |
|---|---|---|---|---|
| Markdown-backed | Markdown | Required/resolvable | Optional | Auxiliary parsed/indexed state |
| In-file-home | Markdown | Location inside a file | File/location | Auxiliary state and object work surface |
| Markdown-backed without home | Markdown | Present | None | Auxiliary state |
| Temporary app-only | Application | None | Optional/usually none | Temporary canonical owner |
| Portable not-yet-managed item | Portable ledger/text owner | None in managed app model | Optional external meaning only | Not a managed Reference Object until imported/confirmed |

Rules:

- `home = none` does not imply `identity = none`.
- `home = none` does not imply app-only storage.
- `definition location = none` is allowed when another owner owns canonical state.
- App-only is a durability mode, not the default object category.
- Portable not-yet-managed is outside managed Reference Object state.
- App-only backup, recovery, export and Markdown conversion remain unresolved.
- Identity must survive migration from app-only to Markdown-backed state.

## 9. Flexible Shape And Field Recognition

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

The application recognizes any correctly represented field. It does not require every field name to come from one global vocabulary.

Generic Reference Objects do not require Planning Item source/provenance fields. Planning Items may use category-specific source, role, relation and work-state fields owned by planning methodology/product items.

Exact syntax belongs to later representation/prototype work.

## 10. Object Category Field Contracts

```text
Object Category Field Contract
  → describes fields expected for an applicable object category;
  → may be reused as a preset;
  → may have explicit applicability rules;
  → does not limit all fields the parser can recognize by default.
```

Planning Item and concern-related field lists are examples of category contracts. Their semantic meaning remains with planning/concern owners.

Conservative current rule:

- unknown additional fields are allowed;
- missing expected fields produce guidance/warning;
- hard restriction requires an explicit contract rule;
- contract composition, precedence, conflict handling and inheritance remain open.

## 11. Cross-Workflow Interfaces

| Interface | Model output |
|---|---|
| Planning Item formation | distinguish transient proposal, portable reviewed meaning and confirmed managed Planning Item Reference Object |
| Planning/Full Picture handoff | managed identity or portable proposal context plus source/item traceability |
| Parsing/discovery | identity, boundaries, fields, canonical/reference role |
| Authoring | canonical edit owner, flexible body and fields |
| References | stable target identity and occurrence role |
| Dependency review | typed source/target relation and changed canonical state |
| Navigation | object, item, canonical state, definition location, optional home and occurrences |
| Full Picture synthesis | linked managed Planning Items/child pictures without duplicate canonical bodies |

## 12. Accepted Transformation History

### Block 1 — Reference Object terminology

**Disposition: Accepted With Changes — keep current semantic name pending final English-term decision.**

| Role | Semantic name | ID / source | Core meaning | Relation / action | Identity/history |
|---|---|---|---|---|---|
| Current | Reference Object Term | `ITEM-86` | `Ссылочный объект` is preferred Russian term; English term provisional. | Update target. | `ITEM-86` survives. |
| Incoming | Saved/managed application-use boundary | accepted recent-chat reconciliation | A Reference Object is saved/imported managed meaning the application can use. | Clarifies. | No new ID. |
| Resulting | Reference Object Term | `ITEM-86` | Own terminology and identity/state/location/home/occurrence distinctions. | **Update Content; no technical rename**. | Preserve sources/history. |

### Block 2 — Planning Item managed-object boundary

**Disposition: Accepted With Changes — semantic rename; preserve stable technical ID/code.**

| Role | Semantic name | ID / source | Core meaning | Relation / action | Identity/history |
|---|---|---|---|---|---|
| Current | Planning Item To Reference Object | `ITEM-22B` | Reviewed/imported items become objects after proposal and confirmation. | Current target. | `ITEM-22B` survives. |
| Incoming | Application-native managed item path | accepted recent-chat reconciliation | Confirmation creates the Planning Item directly as a managed Reference Object. | Corrects/extends. | No new ID. |
| Incoming | Portable item path | accepted reconciliation | Portable reviewed meaning may remain outside managed state or enter proposal/confirmation. | Preserves fallback. | No new ID. |
| Resulting | Planning Item Reference Object Boundary | `ITEM-22B` | Own both contexts and prevent duplicate creation at workflow handoff. | **Update And Rename semantic meaning**. | Technical code retained; former semantic names recorded. |

Former semantic names:

```text
Item To Object
Planning Item To Reference Object
```

### Block 3 — Existing-fragment extraction

**Disposition: Accepted.**

| Role | Semantic name | ID / source | Core meaning | Relation / action | Identity/history |
|---|---|---|---|---|---|
| Current | Object Extraction | `ITEM-87` | Useful existing fragments may be managed independently. | Rename target. | `ITEM-87` survives. |
| Incoming | Explicit Reference Object target and confirmation | terminology + workflow synthesis | Extraction is semantic, confirmation-gated and not length-based. | Clarifies. | No new ID. |
| Resulting | Reference Object Extraction | `ITEM-87` | Own confirmation-gated extraction with independent work/reuse/review value. | **Update And Rename**. | Technical ID/code retained. |

### Block 4 — Hybrid source-of-truth model

**Disposition: Accepted With Changes — absorb only `ITEM-25B`; keep `ITEM-108` active.**

| Role | Semantic name | ID / source | Core meaning | Relation / action | Identity/history |
|---|---|---|---|---|---|
| Current | Markdown Primary Truth | `ITEM-23B` | Markdown normally owns document-backed state. | Merge target. | Survivor. |
| Current | Hybrid App Memory | `ITEM-25B` | App Memory is auxiliary except temporary app-owned state. | Overlap. | Absorbed. |
| Current | Temporary App-Only Object | `ITEM-108` | Temporary state has independent durability/migration debt. | Independent lifecycle. | Keep. |
| Resulting | Hybrid Source-of-Truth Model | `ITEM-23B` | Markdown-backed state plus auxiliary App Memory and explicit exception. | **Merge `ITEM-25B`; rename**. | `ITEM-25B → ITEM-23B`. |
| Resulting | Temporary App-Only Object | `ITEM-108` | Own persistence/recovery/export/migration debt. | **Keep / Update**. | Active. |

### Block 5 — Optional home

**Disposition: Accepted.**

| Role | Semantic name | ID / source | Core meaning | Relation / action | Identity/history |
|---|---|---|---|---|---|
| Current | In-File Home Object | `ITEM-91` | Object may belong to a file/location and be worked on independently. | Merge target. | Survivor. |
| Current | Homeless General Object | `ITEM-102` | Object may exist without parent/home. | Same relation's absent state. | Absorbed. |
| Resulting | Optional Reference Object Home | `ITEM-91` | Own present/absent home and separation from state owner/location. | **Merge And Rename**. | `ITEM-102 → ITEM-91`. |

### Block 6 — Flexible shape and category contracts

**Disposition: Accepted With Changes — two resulting items; no merge.**

| Role | Semantic name | ID / source | Core meaning | Relation / action | Identity/history |
|---|---|---|---|---|---|
| Current | Flexible Object Shape | `ITEM-103` | Text-first flexible object with optional fields. | Update. | `ITEM-103` survives. |
| Current | Optional Field Contract | `ITEM-106` | Optional field expectations mixed with planning/concern examples. | Correct/rename. | `ITEM-106` survives. |
| Resulting | Flexible Object Shape | `ITEM-103` | Own unrestricted body, arbitrary fields and generic recognition. | **Update Content**. | Preserve. |
| Resulting | Object Category Field Contracts | `ITEM-106` | Own category-specific expected fields, presets and applicability rules. | **Update And Rename**. | Technical code retained. |

## 13. Aggregate Applied Transition

| Former active meaning(s) | Applied action | Current active result | Identity/history effect |
|---|---|---|---|
| Reference Object Term | Update Content | Reference Object Term (`ITEM-86`) | ID/name retained |
| Item To Object / Planning Item To Reference Object | Update And Rename | Planning Item Reference Object Boundary (`ITEM-22B`) | ID/code retained; former names recorded |
| Object Extraction | Update And Rename | Reference Object Extraction (`ITEM-87`) | ID/code retained |
| Markdown Primary Truth + Hybrid App Memory | Merge + Rename | Hybrid Source-of-Truth Model (`ITEM-23B`) | `ITEM-25B → ITEM-23B` |
| Temporary App-Only Object | Keep / Update | Temporary App-Only Object (`ITEM-108`) | remains active |
| In-File Home Object + Homeless General Object | Merge + Rename | Optional Reference Object Home (`ITEM-91`) | `ITEM-102 → ITEM-91` |
| Flexible Object Shape | Update | Flexible Object Shape (`ITEM-103`) | retained |
| Optional Field Contract | Update And Rename | Object Category Field Contracts (`ITEM-106`) | ID/code retained |

## 14. Preserved Meanings

The accepted transitions preserve:

- confirmed Russian user-facing term;
- independently managed identity;
- explicit confirmation before accepted managed creation;
- immediate managed Reference Object status for confirmed application-native Planning Items;
- portable not-yet-managed Planning Item mode;
- Planning Item/source traceability;
- `RN`/`DAM` no-auto-promotion boundary;
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

## 15. Open Questions

- final English term;
- duplicate/compatible-object resolution;
- portable-to-managed identity matching;
- app-only persistence, backup, recovery and migration;
- category-contract composition, precedence, validation severity and inheritance;
- minimal required identity/parser mechanics;
- exact Markdown syntax.

## 16. Next Gate

The managed Planning Item boundary is synchronized with both accepted Complete Pictures.

Future changes must:

1. update the item register first;
2. preserve absorbed-ID and former-name history;
3. update this model only when identity/state/home/durability/shape meaning changes;
4. keep workflow algorithms in the end-to-end owners;
5. keep exact syntax and runtime architecture in later prototype/implementation planning.
