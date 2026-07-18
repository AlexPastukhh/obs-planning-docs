# Documentation Workbench Full Picture

Status: active working Application Root Planning Draft / incomplete / item-backed / reconciliation in progress
Doc version: v0.1.0-cp1-bootstrap
Scope: complete application-level planning picture for Documentation Workbench. Detailed working item meanings remain in [`planning-item-register.md`](planning-item-register.md).

## 1. Purpose

Documentation Workbench is a proposed application-layer workspace over real repository documentation.

```text
real documentation files
  → remain readable and reviewable without the application;

Documentation Workbench
  → adds managed objects, references, dependency review,
    navigation, authoring, history and AI-oriented workflows;

planning
  → is one supported workflow inside the broader workbench,
    not the entire identity of the application.
```

This file coordinates the product-level picture. It does not define reusable planning methodology, final implementation architecture or runtime truth.

## 2. Current Repository Picture

```text
Reusable application-planning methodology exists.
Root planning routing exists.
A complete local v0.9.2 item source exists.

Before this area bootstrap:
  no project-local Documentation Workbench owner existed in planning/areas/;
  no repository Application Root Full Picture coordinated the product;
  the 50 working items were not stored in their intended local area.
```

## 3. Working Source And Reconciliation Boundary

Canonical working source for this draft:

- [`planning-item-register.md`](planning-item-register.md);
- 50 active working items;
- complete 110-row old-item audit;
- four unresolved legacy rows;
- 26 open questions;
- source migration SHA-256 `abfcfc6ad0d9e8ff2516ec7e5d572e50c5524661cca94fdbebc0646d8fc7f8ce`.

`Canonical active` currently means canonical inside the working v0.9.2 register. It does not mean that every proposed merge, rename, split, move or supersession from reconciliation has been accepted.

```text
current working register: 50 active items
proposed reconciliation result: review material only
this bootstrap: preserves all 50 identities and bodies
```

## 4. Primary Complete Picture Inventory

| ID | Primary complete picture | Current status in this draft |
|---|---|---|
| CP-1 | Documentation Workbench Full Picture And Product Boundary | Expanded in this update. Current four working meanings remain unchanged. |
| CP-2 | Reference Object Model And Lifecycle | Compact coordinated picture. Reconciled transformations are not applied. |
| CP-3 | Managed References And Dependency Review | Compact coordinated picture. Reconciled transformations are not applied. |
| CP-4 | Import, Authoring And Repository Round Trip | Compact coordinated picture. Reconciled transformations are not applied. |
| CP-5 | Chat, AI Responses And Work-State Trace | Compact coordinated picture. Reconciled transformations are not applied. |
| CP-6 | Planning Items, Full Picture And Deepening | Reusable method has evolved; product-local item transformations are not applied. |
| CP-7 | IDE Navigation And Related-Object Views | Compact coordinated picture. Reconciled transformations are not applied. |

## 5. CP-1 — Documentation Workbench Full Picture And Product Boundary

### 5.1 Purpose And Boundary

CP-1 defines what the application is, what it must preserve, why an early useful version matters and which implementation ideas remain provisional.

It does not own the detailed Reference Object model, dependency-review workflow, import pipeline, chat history model, concern workflow or view system. Those belong to CP-2 through CP-7.

### 5.2 Current Working Items

| Semantic item | ID / code | Working meaning |
|---|---|---|
| **Documentation-Layer Overlay** | `ITEM-28B / DOC-LAYER-OVERLAY` | The application is an overlay over the real documentation layer, not a planning-only application. |
| **Dependency Files Retirement** | `ITEM-85 / DEPENDENCY-FILES-RETIRE` | Files used only for manual dependency bookkeeping should become optional only after equivalent application behavior exists. |
| **Implementation Idea Boundary** | `ITEM-99 / IMPLEMENTATION-IDEA-BOUNDARY` | Git, storage, wrappers, browser capture and concrete UI mechanisms are implementation directions, not automatically accepted requirements or architecture. |
| **Early Infrastructure MVP** | `ITEM-100 / EARLY-INFRA-MVP` | An early useful MVP matters because the workbench is infrastructure for later effective documentation and AI work. |

The complete bodies, evidence and acceptance notes remain in the register.

### 5.3 Before Picture

```text
reusable methodology
  → can plan applications and workflows;

Markdown/documentation
  → remains first-class in reusable terminology;

Documentation Workbench product state
  → has no registered project-local owner;

implementation ideas
  → exist in the working source but are not accepted architecture;

manual dependency bookkeeping
  → may still be required because replacement behavior does not yet exist.
```

### 5.4 Proposed Complete Picture

```text
Documentation Workbench
  → project-local application direction over real documentation;
  → supports planning, documentation authoring, managed references,
    dependency review, navigation, history and AI work;
  → preserves complete Markdown files as durable reviewable artifacts;
  → may reduce dependency-only bookkeeping only after replacement behavior is proven;
  → prioritizes a useful infrastructure MVP;
  → keeps shell, storage, wrapper and UI choices provisional until separately reviewed.
```

### 5.5 Changed And Preserved Parts

| Part | Current → proposed effect |
|---|---|
| Product owner | Absent project-local owner → registered area with README, Full Picture and item register. |
| Product identity | Fragmented working meanings → one coordinated application-level picture. |
| Markdown/documentation boundary | Preserved: real documentation remains first-class and independently reviewable. |
| Planning scope | Preserved/clarified: planning is supported, but the product is not limited to planning. |
| Dependency bookkeeping | Preserved until equivalent behavior exists; retirement remains conditional. |
| MVP priority | Added as an explicit product-level planning concern, not an implementation commitment. |
| Implementation architecture | Preserved as unresolved; no shell, storage, schema or marker syntax is selected. |

### 5.6 Unresolved Choices

- What smallest behavior set makes the early MVP genuinely useful?
- Which existing dependency-only files qualify for later retirement, and what replacement checks are required?
- Which application shell and storage options deserve prototype evidence?
- Which CP should be expanded immediately after the area bootstrap?

Conservative current rule: preserve existing documentation and dependency bookkeeping until a separately reviewed replacement exists.

## 6. CP-2 — Reference Object Model And Lifecycle

**Purpose:** define independently managed reusable documentation meaning, identity, extraction, home and canonical storage behavior.

Current working items:

```text
Reference Object Term (ITEM-86)
Item To Object (ITEM-22B)
Object Extraction (ITEM-87)
Markdown Primary Truth (ITEM-23B)
Hybrid App Memory (ITEM-25B)
In-File Home Object (ITEM-91)
Homeless General Object (ITEM-102)
Temporary App-Only Object (ITEM-108)
Flexible Object Shape (ITEM-103)
Optional Field Contract (ITEM-106)
```

Key boundary: document-backed state remains Markdown-primary; an app-only canonical object is an explicit temporary exception, not a general replacement for documentation files.

Status: complete-picture reconciliation exists as review material, but no merge, rename or absorbed identity is applied here.

## 7. CP-3 — Managed References And Dependency Review

**Purpose:** define full/bare managed references, field-level links, dependency edges, stale review and readable marker behavior.

Current working items:

```text
Read-Only Linked Content (ITEM-90)
Field-Level References (ITEM-101)
Reference Mode Parity (ITEM-88)
Full Or Bare Link (ITEM-73)
Reviewed Reference Refresh (ITEM-89)
Dependency Graph (ITEM-29B)
Stale Reference Queue (ITEM-16B)
Object Wrapper Contract (ITEM-83)
Quiet Markdown Markers (ITEM-105)
```

Related cross-picture item: General Reference Targets (`ITEM-114`) currently remains in the working register under navigation-related items until a move is explicitly accepted.

Key boundary: source changes do not silently rewrite or erase previously approved dependent material. Historical AI-response links are not automatically identical to live maintenance dependencies.

Status: transformations are proposed only.

## 8. CP-4 — Import, Authoring And Repository Round Trip

**Purpose:** read mixed Markdown and repository scopes, confirm proposed objects/items, author documents and return complete files through literal-file and Git-diff review.

Current working items:

```text
Confirmed Object Discovery (ITEM-31B)
Mixed Markdown Round Trip (ITEM-32B)
Repo File/Folder Round Trip (ITEM-34B)
Document Authoring (ITEM-93)
AI Item Import (ITEM-94)
AI Expanded Copy (ITEM-107)
```

Key boundary: AI-expanded copies and reconstructed App Memory are working views; they do not silently replace canonical Markdown or create unconfirmed objects.

Status: transformations are proposed only.

## 9. CP-5 — Chat, AI Responses And Work-State Trace

**Purpose:** preserve immutable chat evidence, user raw annotations, template-linked responses, completed-action capture and answer-context change records.

Current working items:

```text
Chat History Ledger (ITEM-11B)
Completed Action Log (ITEM-12A)
Action Log Capture (ITEM-12B)
Answer Change Set (ITEM-109)
User Raw Annotations (ITEM-115)
Template-Linked AI Response (ITEM-116)
```

Related unresolved legacy rows: `ITEM-36A` and `ITEM-53`.

Key boundary: conversation history is evidence; Action Log is an operational interpretation of completed work, not a copy of all turns or a future-task list. Raw user annotations do not become Planning Items automatically.

Status: transformations and terminology corrections are proposed only.

## 10. CP-6 — Planning Items, Full Picture And Deepening

**Purpose:** coordinate durable Planning Items, item-backed Full Pictures, concern suggestions/application, linked deepening and repository semantic reconciliation.

Current working items:

```text
Semantic Item Key (ITEM-110)
Item Brick Reuse (ITEM-41)
Planning To Documentation Pipeline (ITEM-98)
Item Role And Relation Model (ITEM-112)
Planning Deepening Link (ITEM-113)
Concern Preset System (ITEM-119)
Semantically Complete Item (ITEM-120)
```

Related unresolved legacy row: `ITEM-51`.

Key boundary: the reusable reconciliation workflow may propose item transformations, but the project-local register changes only after explicit review of Current, Incoming and Resulting meanings.

Status: command/method support exists; product-local transformation proposals are not applied.

## 11. CP-7 — IDE Navigation And Related-Object Views

**Purpose:** keep file/object/view context in IDE-like navigation and display configurable file/folder relations without confusing display presets with concern application.

Current working items:

```text
IDE Tab Navigation (ITEM-35B)
General Reference Targets (ITEM-114)
Home Relation Vocabulary (ITEM-111)
Configurable Related-Object Views (ITEM-118)
Home Relation View (ITEM-95)
Definition/Home Jump (ITEM-104)
Folder Dependency View (ITEM-96)
File-Type Guidance Assignments (ITEM-97)
```

Related unresolved legacy row: `ITEM-52B`.

Key boundary: View Presets display existing state; Concern Presets suggest attention; Document Templates recommend shape; Validation Rules check conditions.

Status: transformations are proposed only.

## 12. Cross-Picture Invariants

```text
- Real Markdown/documentation remains first-class and reviewable without the app.
- App Memory does not silently become the global Source of Truth.
- Proposed/imported meaning does not become a canonical item or object without confirmation.
- Full Picture summaries do not replace complete Planning Item bodies.
- Managed reference semantics, navigation views and concern suggestions retain separate owners.
- Historical evidence is not silently rewritten to match current state.
- Implementation directions remain non-final until explicitly selected.
- Planning documentation does not prove that runtime/code behavior exists.
```

## 13. Open Cross-Picture Work

The register retains 26 open questions and four unresolved legacy rows. This draft does not answer them through fallback assumptions.

High-impact unresolved groups include:

- final Reference Object/home/source-of-truth model;
- marker and reference syntax;
- app-only object durability and AI-readable representation;
- dependency review severity and grouping;
- workspace/chat and status terminology;
- Planning Item role/relation vocabulary;
- concern preset composition, persistence and applicability states;
- relation-view direction, recursion and user-saved presets;
- application shell, storage and measured repository limits.

## 14. Planned Growth Order

```text
1. Bootstrap the area and preserve the complete 50-item working source.  ← this update
2. Expand and reconcile CP-2 Reference Object Model And Lifecycle.
3. Expand CP-3 Managed References And Dependency Review.
4. Expand CP-4 Import, Authoring And Repository Round Trip.
5. Expand CP-5 Chat, AI Responses And Work-State Trace.
6. Apply product-local CP-6 item transformations only after explicit block-by-block approval.
7. Expand CP-7 IDE Navigation And Related-Object Views.
8. Create child workflow/detail/prototype files only when independent ownership is justified.
```

The order may change when a dependency or user priority makes another complete picture the safer next review object.
