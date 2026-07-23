# Documentation Workbench Full Picture

Status: active Application Root Full Picture / item-backed / two accepted Complete Pictures / reusable method, semantic registries and helper projection synchronized / planning-owner consistency audited / implementation incomplete
Doc version: v0.9.0-notes-and-implementation-ideas
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

This Application Root coordinates product boundaries, accepted Complete Pictures, supporting models and provisional workflow candidates. It is not itself a child Complete Picture and does not define runtime truth.

## 2. Canonical Source And Counts

- [`planning-item-register.md`](planning-item-register.md) — complete source-linked item owner;
- active items: **53**;
- old methodology/application items audited: **110 / 110**;
- accepted new active product identities:
  - `ITEM-121 / STRUCTURED-USER-MESSAGE-COMPOSER`;
  - `ITEM-122 / TYPED-SOURCE-CONTRIBUTIONS`;
  - `ITEM-123 / CONFIGURABLE-APPLICATION-SETTINGS`;
- accepted absorbed identities:
  - `ITEM-25B → ITEM-23B`;
  - `ITEM-102 → ITEM-91`;
- source migration provenance SHA-256: `abfcfc6ad0d9e8ff2516ec7e5d572e50c5524661cca94fdbebc0646d8fc7f8ce`.

The register retains complete item meanings, full imported source context and transformation history. This file summarizes current product structure; it does not replace the register.

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
| Accepted Complete Picture | [`Documentation And Reference Object End-To-End Workflow`](documentation-and-reference-object-end-to-end-workflow.md) | Accepted, 31 direct active items |
| Accepted Complete Picture | [`Planning Item And Full Picture End-To-End Workflow`](complete-pictures/planning-items-and-full-picture/full-picture.md) | Accepted, 11 direct active items |
| Supporting model | [`Reference Object Model And Lifecycle`](reference-object-model-and-lifecycle.md) | Active model and accepted transition history |
| Provisional thematic slice | Chat, AI Responses And Work-State Trace | Not yet validated as an independent end-to-end Complete Picture |

A Complete Picture must be followable from trigger to result without another peer supplying missing mandatory stages. An explicit handoff between independently traversable workflows is allowed.

## 4A. Semantic Registry Route

```text
planning/direction-registry.md
  → direction-registry.md
  → use-case-registry.md
  → selected complete workflow/model/item owner.
```

The registries provide semantic navigation and owner routes. They do not replace this Full Picture, workflow bodies, the item register or command permissions.

## 4B. Helper Projection Route

```text
Tampermonkey Orientation
  → planning/README.md + planning/direction-registry.md;

Tampermonkey Directions
  → root/local Direction Registries;

Tampermonkey Use Cases
  → reusable-family/local Use-Case Registries;

Tampermonkey Commands
  → planning/planning-use-case-map.md.
```

Documentation Workbench projections:

```text
Direction:
  Develop And Maintain Documentation Workbench;

Use Cases:
  Documentation And Reference Object End-To-End Workflow;
  Planning Item And Full Picture End-To-End Workflow;
  Structured User Message Composer.
```

The helper performs composer insertion/copy only and does not replace this Full Picture, workflow bodies, the register or permission owners.

## 5. Documentation And Reference Object End-To-End Workflow

**Primary owner:** [`documentation-and-reference-object-end-to-end-workflow.md`](documentation-and-reference-object-end-to-end-workflow.md)

```text
select/load repository, file, folder or Markdown
  → parse ordinary text, object definitions, fields and references
  → resolve one of the accepted entry paths
  → establish identity, canonical state and optional home
  → configure flexible fields and category contracts
  → create standalone or object-linked named Notes when requested
  → author objects/documents and place managed references
  → round-trip complete Markdown
  → detect dependency impact
  → review/refresh/remove affected references
  → navigate state, home, occurrences and review targets
  → reach a diff-ready result or explicit Pending Review state.
```

### Entry paths

```text
already managed Planning Item Reference Object
  → do not create it again
  → establish/materialize canonical owner, definition location,
    optional home and documentation references;

portable reviewed Planning Item
  → Reference Object proposal
  → explicit confirmation
  → managed object creation;

existing documentation fragment
  → extraction proposal and confirmation;

parsed proposed-object definition
  → discovery/conflict review and confirmation;

standalone or object-linked Note
  → create a Reference Object of category `Note`
  → optionally assign a title
  → optionally create one initial `note for` relation.
```

### Active item groups

| Phase | Items |
|---|---|
| Scope, parsing, creation | `ITEM-34B`, `ITEM-32B`, `ITEM-31B`, `ITEM-22B`, `ITEM-87`, `ITEM-124` |
| Identity, state, home | `ITEM-86`, `ITEM-23B`, `ITEM-108`, `ITEM-91` |
| Shape and contracts | `ITEM-103`, `ITEM-106`, `ITEM-97` |
| Authoring and references | `ITEM-93`, `ITEM-90`, `ITEM-114`, `ITEM-101`, `ITEM-88`, `ITEM-73`, `ITEM-83`, `ITEM-105` |
| Impact and review | `ITEM-29B`, `ITEM-89`, `ITEM-16B` |
| Navigation and views | `ITEM-35B`, `ITEM-111`, `ITEM-118`, `ITEM-95`, `ITEM-104`, `ITEM-96` |
| Optional output | `ITEM-107` |

Total: **31 active items**.

`ITEM-94 / AI-ITEM-IMPORT` belongs to the upstream Planning Item/Full Picture workflow and supplies confirmed managed items to this workflow boundary.

### Key invariants

- canonical state always has an explicit owner;
- Markdown definition location and semantic home are separate;
- managed application-native Planning Items are Reference Objects from creation;
- portable reviewed meanings still require confirmation before managed object creation;
- arbitrary fields are recognized by form; category contracts define expectations;
- Note is a first-class Reference Object category, not an object field;
- `note for` is an association/navigation relation unless later accepted as a dependency relation;
- linked content is read-only at use sites;
- source changes preserve old approved materialization until review;
- navigation/views operate across stages rather than form a parallel workflow;
- unresolved conflicts remain visible.

## 6. Planning Item And Full Picture End-To-End Workflow

**Primary owner:** [`complete-pictures/planning-items-and-full-picture/full-picture.md`](complete-pictures/planning-items-and-full-picture/full-picture.md)

```text
free-form or structured source
  → preserve complete source context
  → form complete proposed Planning Item meanings
  → targeted current-owner check
  → explicit Current / Incoming / Resulting review
  → user acceptance
  → portable Markdown or application-native delivery mode
  → maintain working item state and relations
  → assemble/update an item-backed Full Picture
  → suggest/review concerns and expose open work
  → deepen only where justified
  → return results to items and Full Picture
  → mandatory repository semantic reconciliation
  → explicit handoff to Documentation/Reference materialization
  → documented/integrated, unresolved or deferred result.
```

### Direct item groups

| Phase | Items |
|---|---|
| Source capture and addressing | `ITEM-121`, `ITEM-122` |
| Meaning formation and targeted checking | `ITEM-94`, `ITEM-110`, `ITEM-120`, `ITEM-112` |
| Review, transformation and durable reuse | `ITEM-41`, `ITEM-98`, `ITEM-122` |
| Full Picture synthesis | `ITEM-41`, `ITEM-98` |
| Concern suggestion/application/deepening | `ITEM-119`, `ITEM-113` |
| Derived observability and drill-down | `ITEM-118` |

Direct active set: **11 items**.

Supporting interfaces:

```text
ITEM-11B:
  immutable conversation/source history;

ITEM-35B:
  IDE-like source/item/home/picture navigation;

ITEM-116:
  template-linked AI response document;

ITEM-22B:
  managed Planning Item / Reference Object boundary;

ITEM-23B / ITEM-108 / ITEM-91:
  canonical state, app-only durability and optional home;

ITEM-123:
  configurable application settings and project-readable conventions.
```

### Key invariants

- AI interpretation remains proposed until explicit review;
- full source messages remain available;
- the full accumulating meaning is not replaced by a shorter lossy review copy;
- one semantic Planning Item entity spans working and documented states;
- optional `Implementation Ideas` reference separate Planning Items of kind Implementation Idea and do not accept them automatically;
- portable Markdown mode remains supported;
- application-native confirmed items become managed Planning Item Reference Objects immediately;
- Full Picture synthesis traces to items and may reference child Full Pictures in their own homes;
- Concern Suggestions are not Applied Concerns;
- views expose state rather than create it;
- repository semantic reconciliation precedes literal file updates.

## 7. Explicit Cross-Workflow Handoff

The two accepted Complete Pictures are independently traversable and have a visible interface.

### Application-native path

```text
Planning Item/Full Picture workflow
  → user confirms proposed item
  → managed Planning Item Reference Object exists
  → downstream Documentation/Reference workflow:
      choose/confirm canonical-state owner;
      optionally assign semantic home;
      materialize Markdown definition/reference;
      review dependency impact;
      produce diff-ready result.
```

### Portable path

```text
Planning Item/Full Picture workflow
  → accepted portable item ledger
  → item may remain portable
  → or enter proposal/confirmation before managed object creation
  → then continue through downstream materialization.
```

### Existing-document path

Documentation fragments enter the separate Reference Object extraction path. They do not need to become Planning Items merely because they are managed independently.

## 8. Supporting Reference Object Model

[`reference-object-model-and-lifecycle.md`](reference-object-model-and-lifecycle.md) owns:

- Reference Object identity and terminology;
- canonical-state ownership;
- definition location versus optional semantic home;
- temporary app-only durability debt;
- flexible object shape;
- Object Category Field Contracts;
- Planning Item/managed Reference Object boundary;
- accepted transformation history.

It does not duplicate either end-to-end workflow.

## 9. Historical Structural Mapping

| Former label | Accepted placement |
|---|---|
| `CP-1` | The Application Root product boundary in this file; not a child Complete Picture. |
| `CP-2` | Supporting Reference Object model plus creation/state/home/shape phases of the Documentation/Reference workflow. |
| `CP-3` | Reference placement, dependency invalidation and review phases. |
| `CP-4` | Scope loading, parsing, authoring, round trip and optional AI-expanded copy phases; `ITEM-94` belongs upstream. |
| `CP-7` | Cross-step navigation and related-object views; `ITEM-114` belongs to target resolution. |
| Provisional Planning/Deepening slice | Accepted Planning Item And Full Picture End-To-End Workflow. |

Former labels are history, not current peer-owner IDs.

## 10. Provisional Slice — Chat, AI Responses And Work-State Trace

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

Boundary:

- conversation history is immutable evidence;
- Action Log records completed actions;
- `RN`/`DAM` are literal user annotations;
- historical links may resolve to current targets but do not automatically enter live stale-reference queues;
- the Planning Item workflow uses these capabilities as interfaces without claiming their complete lifecycle.

Status: coherent thematic material, but not yet accepted as an independently traversable Complete Picture.

## 11. Shared Invariants

```text
- Real Markdown/documentation remains first-class and reviewable without the app.
- App Memory does not silently become the global Source of Truth.
- Canonical state, definition location, semantic home and occurrences remain distinct.
- Proposed/imported meaning does not become accepted without confirmation.
- A confirmed application-native Planning Item is a managed Reference Object immediately.
- Portable Markdown item review remains available.
- Full Picture/workflow summaries do not replace complete Planning Item bodies.
- Parent Full Pictures may reference child pictures in their own canonical homes.
- Managed reference modes, target relations, view projections and concern suggestions keep distinct semantics.
- Historical evidence is not silently rewritten to match current state.
- Views expose existing state rather than create semantic truth.
- Implementation directions remain non-final until explicitly selected.
- Planning documentation does not prove runtime/code behavior.
```

## 12. Open Cross-Workflow Work

High-impact unresolved groups:

- final English Reference Object terminology;
- marker, field and reference syntax;
- app-only durability and AI-readable representation;
- category-contract composition and enforcement;
- dependency-review severity/grouping and relation-view recursion/counts;
- Chat/Action/RN/DAM end-to-end workflow boundary;
- exact structured-response/source-anchor syntax;
- application shell, storage and measured repository limits;
- Prototype-Depth Scenario/Domain/Slice methodology.

No fallback in this Full Picture resolves these questions silently.

## 13. Growth Order

```text
1. Area bootstrap and source preservation.                               ✓
2. Reference Object model review.                                       ✓
3. Documentation/Reference Object end-to-end workflow.                  ✓
4. Accepted recent-chat item reconciliation and 48 → 51 register.       ✓
4A. Named Notes and Implementation Ideas transition, 51 → 53.            ✓ this update
5. Planning Item/Full Picture end-to-end workflow.                       ✓
6. Synchronize reusable formation/terminology/principles/templates.     ✓
7. Add Direction/Use-Case registries and project input conventions.     ✓
8. Add multi-surface helper projection.                                 ✓
9. Run whole-repository planning-owner consistency validation.          ✓
10. Name/add the item-formation command after explicit naming.            ✓ this update
11. Review Chat/AI/Work-State against the Complete Picture rule.
12. Plan prototype-depth methodology and runtime architecture separately.
```
