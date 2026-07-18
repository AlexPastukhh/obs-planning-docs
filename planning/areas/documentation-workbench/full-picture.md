# Documentation Workbench Full Picture

Status: active Application Root Full Picture / item-backed / structural reconciliation applied / implementation incomplete
Doc version: v0.3.0-documentation-reference-workflow
Scope: application-level identity, workflow inventory, shared invariants and coordination for Documentation Workbench. Complete item meanings remain in [`planning-item-register.md`](planning-item-register.md).

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
    not the entire product identity.
```

This Application Root coordinates product boundaries and accepted/provisional workflow owners. It is not itself a child Complete Picture and does not define runtime truth.

## 2. Canonical Source And Counts

- [`planning-item-register.md`](planning-item-register.md) — complete source-linked item owner;
- active items: **48**;
- old methodology/application items audited: **110 / 110**;
- old-item dispositions: **15 active / 36 merged-split-updated / 4 deferred / 4 unresolved / 51 reusable-non-product**;
- unresolved legacy rows: **4**;
- open questions: **27**;
- source migration provenance SHA-256: `abfcfc6ad0d9e8ff2516ec7e5d572e50c5524661cca94fdbebc0646d8fc7f8ce`.

Accepted absorbed identities:

```text
ITEM-25B → ITEM-23B
ITEM-102 → ITEM-91
```

The register retains their complete historical meanings and source links.

## 3. Product Boundary

Current product-level items:

| Semantic item | ID / code | Meaning |
|---|---|---|
| Documentation-Layer Overlay | `ITEM-28B / DOC-LAYER-OVERLAY` | Application is an overlay over real documentation, not a planning-only product. |
| Dependency Files Retirement | `ITEM-85 / DEPENDENCY-FILES-RETIRE` | Dependency-only files become optional only after equivalent behavior exists. |
| Implementation Idea Boundary | `ITEM-99 / IMPLEMENTATION-IDEA-BOUNDARY` | Git/storage/wrapper/UI directions are not automatically accepted architecture. |
| Early Infrastructure MVP | `ITEM-100 / EARLY-INFRA-MVP` | An early useful MVP matters because the workbench supports later documentation/AI work. |

```text
Documentation Workbench
  → works over real first-class Markdown;
  → supports planning, authoring, managed references, dependency review,
    navigation, history and AI-oriented transfer;
  → preserves literal repository review/diff boundaries;
  → keeps implementation architecture provisional.
```

## 4. Owner Inventory

| Type | Owner | Status |
|---|---|---|
| Application Root | This file | Active product coordinator |
| Accepted Complete Picture | [`Documentation And Reference Object End-To-End Workflow`](documentation-and-reference-object-end-to-end-workflow.md) | Accepted and expanded |
| Supporting model | [`Reference Object Model And Lifecycle`](reference-object-model-and-lifecycle.md) | Active model and accepted transition history |
| Provisional thematic slice | Chat, AI Responses And Work-State Trace | Not yet validated as an independent end-to-end Complete Picture |
| Provisional thematic slice | Planning Items, Full Picture And Deepening | Not yet validated as an independent end-to-end Complete Picture |

A Complete Picture must be followable from trigger to result without a parallel Complete Picture supplying missing mandatory stages.

## 5. Documentation And Reference Object End-To-End Workflow

**Primary owner:** [`documentation-and-reference-object-end-to-end-workflow.md`](documentation-and-reference-object-end-to-end-workflow.md)

```text
select/load repository, file, folder or Markdown
  → parse ordinary text, object definitions, fields and references
  → propose/confirm missing Reference Objects
  → establish identity, canonical state and optional home
  → configure flexible fields and category contracts
  → author objects/documents and place managed references
  → round-trip complete Markdown
  → detect dependency impact
  → review/refresh/remove affected references
  → navigate state, home, occurrences and review targets
  → reach diff-ready result or explicit Pending Review state.
```

### Active item groups

| Phase | Items |
|---|---|
| Scope, parsing, creation | `ITEM-34B`, `ITEM-32B`, `ITEM-31B`, `ITEM-22B`, `ITEM-87` |
| Identity, state, home | `ITEM-86`, `ITEM-23B`, `ITEM-108`, `ITEM-91` |
| Shape and contracts | `ITEM-103`, `ITEM-106`, `ITEM-97` |
| Authoring and references | `ITEM-93`, `ITEM-90`, `ITEM-114`, `ITEM-101`, `ITEM-88`, `ITEM-73`, `ITEM-83`, `ITEM-105` |
| Impact and review | `ITEM-29B`, `ITEM-89`, `ITEM-16B` |
| Navigation and views | `ITEM-35B`, `ITEM-111`, `ITEM-118`, `ITEM-95`, `ITEM-104`, `ITEM-96` |
| Optional output | `ITEM-107` |

Total: **30 active items**.

`ITEM-94 / AI-ITEM-IMPORT` remains active upstream and supplies reviewed/proposed Planning Items to the workflow boundary.

### Key invariants

- canonical state always has an explicit owner;
- Markdown definition location and semantic home are separate;
- parsed/generated content requires confirmation before canonical creation;
- arbitrary fields are recognized by form; category contracts define expectations;
- linked content is read-only at use sites;
- source changes preserve old approved materialization until review;
- navigation/views operate across stages rather than form a parallel workflow;
- unresolved conflicts remain visible.

## 6. Historical Structural Mapping

| Former label | Accepted placement |
|---|---|
| `CP-1` | The Application Root product boundary in this file; no longer treated as a child Complete Picture. |
| `CP-2` | Supporting Reference Object model plus creation/state/home/shape phases of the accepted workflow. |
| `CP-3` | Reference placement, dependency invalidation and review phases. |
| `CP-4` | Scope loading, parsing, authoring, round trip and optional AI-expanded copy phases; `ITEM-94` moved upstream. |
| `CP-7` | Cross-step navigation and related-object views; `ITEM-114` re-homed to target resolution. |

Former labels are history, not current peer-owner IDs.

## 7. Supporting Reference Object Model

[`reference-object-model-and-lifecycle.md`](reference-object-model-and-lifecycle.md) owns:

- terminology and identity distinctions;
- canonical-state modes;
- definition location versus optional home;
- temporary app-only durability debt;
- flexible object shape;
- Object Category Field Contracts;
- six accepted transformation blocks;
- active model transition `10 → 8`.

It does not duplicate the end-to-end workflow.

## 8. Provisional Slice — Chat, AI Responses And Work-State Trace

Current items:

```text
Chat History Ledger (ITEM-11B)
Completed Action Log (ITEM-12A)
Action Log Capture (ITEM-12B)
Answer Change Set (ITEM-109)
User Raw Annotations (ITEM-115)
Template-Linked AI Response (ITEM-116)
```

Related unresolved legacy rows: `ITEM-36A`, `ITEM-53`.

Boundary: conversation history is evidence; Action Log records completed actions; RN/DAM are literal user annotations; historical links do not automatically enter live dependency-review queues.

Status: coherent thematic material, but not yet accepted as an independently traversable Complete Picture.

## 9. Provisional Slice — Planning Items, Full Picture And Deepening

Current items:

```text
Semantic Item Key (ITEM-110)
Item Brick Reuse (ITEM-41)
Planning To Documentation Pipeline (ITEM-98)
Item Role And Relation Model (ITEM-112)
Planning Deepening Link (ITEM-113)
Concern Preset System (ITEM-119)
Semantically Complete Item (ITEM-120)
AI Item Import (ITEM-94) — upstream adapter into Documentation/Reference Object workflow
```

Related unresolved legacy row: `ITEM-51`.

Boundary: reusable methodology and project-local application behavior remain distinct; Planning Items and concern work must later be reviewed as a complete trigger-to-result workflow rather than accepted by thematic grouping alone.

Status: provisional slice pending structural reconciliation.

## 10. Shared Invariants

```text
- Real Markdown/documentation remains first-class and reviewable without the app.
- App Memory does not silently become the global Source of Truth.
- Canonical state, definition location, semantic home and occurrences remain distinct.
- Proposed/imported meaning does not become canonical without confirmation.
- Full Picture/workflow summaries do not replace complete Planning Item bodies.
- Managed reference modes, target relations, view projections and concern suggestions keep distinct semantics.
- Historical evidence is not silently rewritten to match current state.
- Views expose existing state rather than create semantic truth.
- Implementation directions remain non-final until explicitly selected.
- Planning documentation does not prove that runtime/code behavior exists.
```

## 11. Open Cross-Workflow Work

High-impact unresolved groups:

- final English Reference Object terminology;
- marker, field and reference syntax;
- app-only durability and AI-readable representation;
- category-contract composition and enforcement;
- dependency-review severity/grouping and relation-view recursion/counts;
- Chat/Action/RN/DAM workflow boundary;
- Planning Item and concern workflow structure;
- application shell, storage and measured repository limits.

No fallback in this Full Picture resolves these questions silently.

## 12. Growth Order

```text
1. Area bootstrap and 50-item source preservation.                         ✓
2. Reference Object model review.                                         ✓
3. Correct end-to-end Documentation/Reference Object workflow
   and accepted 50 → 48 item transition.                                  ✓ this update
4. Review Chat/AI/Work-State against the end-to-end Complete Picture rule.
5. Review Planning/Full Picture/Deepening against the same rule.
6. Expand only validated workflows/models.
7. Plan syntax prototypes and implementation architecture separately.
```
