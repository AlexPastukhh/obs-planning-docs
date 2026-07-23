# Planning Item And Full Picture End-To-End Workflow

Status: active accepted project-local Complete Picture / item-backed / reusable-method, semantic-registry and helper-projection synchronization audited
Doc version: v0.5.0-implementation-ideas-and-form-items
Scope: trigger-to-result product workflow for preserving source meaning, forming and reviewing Planning Items, maintaining an item-backed Full Picture, applying concerns proportionally, deepening justified work and handing accepted meaning to durable documentation.

## 1. Purpose

This file owns one continuous Planning Item And Full Picture workflow.

```text
free-form or structured user input
  → preserve complete source context
  → form complete proposed Planning Item meanings
  → review new/update/merge/split/reject effects
  → explicit user acceptance
  → portable or application-native delivery mode
  → maintain item identity, role, relations, Implementation Ideas and work state
  → assemble/update an item-backed Full Picture
  → suggest and review concerns proportionally
  → create separate deep work only when justified
  → return results to items and Full Picture
  → reconcile accepted meaning with repository owners
  → hand off to documentation/reference-object materialization
  → reach documented/integrated, unresolved or deferred state.
```

The workflow replaces the former provisional thematic slice `Planning Items, Full Picture And Deepening`. Models, views, terminology, source relations and concern presets support the workflow; they are not peer Complete Pictures unless they later gain an independent trigger-to-result lifecycle.

## 2. Authority And Supporting Owners

Project-local owners:

- [`../../planning-item-register.md`](../../planning-item-register.md) — complete canonical Planning Item bodies, sources, transformations and open questions;
- this file — trigger-to-result Planning Item/Full Picture workflow and phase map;
- [`../../full-picture.md`](../../full-picture.md) — Application Root coordination and cross-workflow inventory;
- [`../../documentation-and-reference-object-end-to-end-workflow.md`](../../documentation-and-reference-object-end-to-end-workflow.md) — downstream document/object authoring and materialization;
- [`../../reference-object-model-and-lifecycle.md`](../../reference-object-model-and-lifecycle.md) — managed identity, canonical state, definition location, optional home and durability.

Reusable planning methodology remains under:

```text
planning/documentation/application-planning/
```

Semantic registry/input owners:

```text
planning/documentation/application-planning/direction-registry.md
planning/documentation/application-planning/use-case-registry.md
planning/planning-input-conventions.md
```

Reusable source-to-item behavior is synchronized through `planning/documentation/application-planning/planning-item-formation-workflow.md` and `templates/PLANNING-ITEM-REVIEW-TEMPLATE.md`. The broader reusable drafting workflow remains the owner for reconciliation, Full Picture work, concerns, branches, tests and evidence revision.

## 3. Trigger And Accepted Inputs

The workflow starts when the user wants to preserve, form, review, reconcile or deepen planning meaning from one or more of:

- free-form conversation or dictated text;
- a structured user message;
- selected user/assistant turns;
- a stored template-linked AI response;
- a portable Planning Item ledger;
- current Working Planning Items;
- an existing item-backed Full Picture;
- repository documentation that may already own equivalent or conflicting meaning.

Optional upstream assistance:

- `ITEM-121 / STRUCTURED-USER-MESSAGE-COMPOSER` may help the user separate topics and addressable fragments without rewriting literal wording;
- project input delimiters such as `it(` and `)it` may identify a user-proposed boundary for semantic review;
- delimiters do not create a separate Planning Item Candidate entity.

## 4. Preconditions

Before accepting item changes:

```text
- the selected source is explicit or clearly active;
- complete source text is available or missing source is declared;
- relevant current item/document owners are checked proportionally;
- existing references and proposed new/updated items are distinguishable;
- AI interpretation remains proposed until user review;
- no item is split only because it is long;
- no repository file update is implied by item acceptance alone.
```

## 5. End Conditions

A selected work cycle reaches an understandable result when each affected meaning has one explicit disposition:

```text
- accepted Working Planning Item;
- accepted and documented/integrated Planning Item;
- updated existing item;
- merged/absorbed item with preserved history;
- split items with preserved shared sources and relations;
- rejected as a separate item;
- unresolved item/question/concern;
- deferred item or separate work target.
```

For every accepted item:

- identity and full meaning remain accessible;
- source contributions and transformation history remain reviewable;
- current work/documentation state is visible;
- semantic home may be assigned when useful but may remain absent;
- Full Picture synthesis links to the item rather than replacing its body;
- downstream documentation work receives an explicit handoff.

The workflow may end with unresolved or deferred work. Silent loss, silent promotion and untraceable replacement are invalid end states.

## 6. Before And Accepted Structural Picture

### Before

```text
Planning Items, Full Picture And Deepening
  → existed as one provisional thematic slice;
  → contained related product items;
  → did not yet own a complete trigger-to-result lifecycle;
  → depended implicitly on source review, concern work,
    repository reconciliation and document placement.
```

### Accepted result

```text
Planning Item And Full Picture End-To-End Workflow
  → owns the complete planning lifecycle;

source/provenance model
  → supports item formation and transformation;

Concern Definitions, Presets, Suggestions and Applied Concerns
  → support review/deepening across workflow stages;

Documentation And Reference Object End-To-End Workflow
  → receives accepted managed items or portable reviewed meanings
    for canonical placement, authoring and diff-ready output.
```

## 7. Direct Active Item Set

| Responsibility | Active items |
|---|---|
| Optional structured source composition | `ITEM-121` |
| Application-native proposed-item import | `ITEM-94` |
| Item identity and complete body | `ITEM-110`, `ITEM-120` |
| Source contribution and item relations | `ITEM-122`, `ITEM-112` |
| Durable item reuse and item-backed synthesis | `ITEM-41`, `ITEM-98` |
| Concern suggestion, application and deepening | `ITEM-119`, `ITEM-113` |
| Derived concern/item observability | `ITEM-118` |

Total direct active items: **11**.

Supporting interfaces that remain owned elsewhere:

```text
ITEM-11B:
  immutable conversation/source history;

ITEM-35B:
  IDE-like source/item/home/picture navigation;

ITEM-116:
  template-linked AI response document;

ITEM-22B:
  Planning Item ↔ managed Reference Object boundary;

ITEM-23B / ITEM-108 / ITEM-91:
  canonical state, app-only durability and optional home;

ITEM-123:
  configurable application settings and project-readable conventions;

ITEM-125:
  Working / Needs Prototype implementation idea linked to Note capability; not a direct mandatory workflow stage.
```

## 8. Phase Map

| Phase | Purpose | Direct items |
|---|---|---|
| Source capture and addressing | Preserve literal source and optional structure. | `ITEM-121`, `ITEM-122` |
| Meaning formation and targeted checking | Form semantically complete proposed items and compare relevant current owners. | `ITEM-94`, `ITEM-110`, `ITEM-120`, `ITEM-112` |
| Review and transformation | Accept, correct, merge, split, re-home, defer, supersede, remove or reject meanings explicitly. | `ITEM-41`, `ITEM-98`, `ITEM-122` |
| Delivery mode and working state | Persist accepted items through portable or application-native mode without losing identity/history. | `ITEM-94`, `ITEM-98` |
| Full Picture synthesis | Build/update readable item-backed end-to-end understanding. | `ITEM-41`, `ITEM-98` |
| Concern review and observability | Suggest concerns, review applicability and expose concrete open work. | `ITEM-119`, `ITEM-113`, `ITEM-118` |
| Justified deepening and feedback | Create separate work only when independent depth/lifecycle justifies it, then return results. | `ITEM-113`, `ITEM-98` |
| Repository reconciliation and documentation handoff | Reconcile accepted meaning with current owners and enter downstream materialization. | `ITEM-98`, interface `ITEM-22B` |

## 9. Step 1 — Capture Complete Source Context

### Behavior

1. Select the conversation, message, response, file or ledger source.
2. Preserve literal source wording and chronological order.
3. Keep complete user messages available for item review.
4. Give exact turns/fragments stable addresses when available.
5. Declare missing historical source instead of reconstructing it as fact.
6. Allow optional lightweight structure without forcing every fragment into an item.

### Full-message review contract

For portable human review:

```text
- repeat each complete supporting user message under every item it supports;
- highlight relevant spans while preserving surrounding context;
- keep several messages in chronological order;
- include exact anchors in addition to, not instead of, the complete message;
- never invent a missing source.
```

Canonical storage may use one shared full-message source bank plus typed contribution relations when the application can reproduce the complete per-item review presentation.

Items: `ITEM-121`, `ITEM-122`; supporting history: `ITEM-11B`.

## 10. Step 2 — Form Complete Proposed Item Meaning

The AI or user forms one complete current meaning for each semantic item candidate.

```text
main explanatory section
  → may become the complete accumulating item body;

final review block
  → reuses/materializes the same complete meaning;
  → must not replace it with a shorter lossy paraphrase.
```

A Planning Item has no arbitrary length limit. Split only when parts have independent meaning, ownership, lifecycle, review, reuse, decision or work-target value.

Items: `ITEM-110`, `ITEM-120`.

## 11. Step 3 — Perform Targeted Current-Owner Check

During formation or update:

1. inspect likely current items, principles, workflows, decisions and canonical owners;
2. inspect source-linked origins when available and relevant;
3. classify relation:
   - already covered;
   - supports;
   - extends;
   - clarifies;
   - corrects;
   - conflicts;
   - replaces/supersedes;
   - different scope;
   - new meaning;
4. keep the check proportional rather than scanning unrelated repository areas;
5. expose the check when explicitly requested.

This targeted check does not create a separate persisted candidate entity.

Items: `ITEM-98`, `ITEM-112`.

Implementation Ideas are preserved as references to separate Planning Items whose kind is `Implementation Idea`. Linking does not accept architecture or implementation. A linked idea may retain `Working`, `Needs Prototype`, accepted or rejected status independently of its target.

## 12. Step 4 — Review Item Transformations

For every non-trivial transformation, show separately:

```text
Current item(s)
Incoming/expanding/correcting meaning(s)
Resulting item(s)
```

Allowed actions include:

- keep;
- update;
- rename;
- add;
- merge/absorb;
- split;
- move/re-home;
- link;
- defer;
- supersede;
- remove;
- reject as separate.

Preserve:

- stable current identity when responsibility survives;
- old names and aliases;
- all contributing source relations;
- rationale, examples, risks, assumptions and prototype/test context;
- explicit unresolved choices.

Items: `ITEM-41`, `ITEM-98`, `ITEM-122`.

## 13. Step 5 — Explicit Acceptance Gate

AI-proposed interpretation does not become accepted item state automatically.

Review outcomes:

```text
accept;
accept with correction;
accept merge/split/re-home;
reject as separate;
defer;
leave unresolved.
```

Acceptance applies to the reviewed meaning and transformation. It does not automatically approve:

- file placement;
- reusable terminology migration;
- implementation architecture;
- prototype scope;
- commit or push.

## 14. Step 6 — Choose Delivery Mode

The route must expose both modes.

### Portable Markdown mode

```text
complete review block
  → explicit acceptance
  → full updated portable Markdown ledger
  → ledger can be carried across chats/tools.
```

Use when application-native import is unavailable, when a portable fallback is useful or when interoperability/export is desired.

### Application-native mode

```text
template-linked structured response
  → distinguish existing references from proposed items
  → explicit review
  → confirmed Planning Item is created immediately
    as a managed Reference Object of category Planning Item
  → item enters working state.
```

No second item-to-object conversion is required after this confirmation.

### Auto mode

A later command/runtime may select application-native mode when available and portable mode otherwise. Exact runtime detection remains implementation work.

Items: `ITEM-94`, `ITEM-98`; interface: `ITEM-22B`.

## 15. Step 7 — Maintain Working Item State

Candidate work/documentation states include:

```text
Working;
Needs Documentation;
Documented / Integrated;
Unresolved;
Deferred;
Absorbed / Superseded;
Rejected.
```

These are working semantic states, not a final hardcoded enum.

Rules:

- confirmed application-native items are managed Reference Objects immediately;
- a portable accepted item may remain outside app-managed state until imported;
- an item may have no semantic home yet;
- Markdown placement changes durability/owner/location state rather than identity;
- views expose state but do not create or accept it.

Supporting items: `ITEM-94`, `ITEM-118`, `ITEM-23B`, `ITEM-108`, `ITEM-91`, `ITEM-123`.

## 16. Step 8 — Assemble Or Update The Item-Backed Full Picture

The Full Picture is readable synthesis of the selected result/problem/workflow.

```text
reviewed items
  → grouped and linked
  → complete trigger-to-result understanding
  → unresolved concerns and branches remain visible.
```

Rules:

- important meaning should have a contributing Planning Item, source or explicit inference/question status;
- Full Picture summaries do not replace canonical item bodies;
- a parent picture may reference child Full Pictures in their own canonical homes;
- child pictures own complete local workflow meaning;
- significant statements trace to contributing items;
- several independently traversable workflows may have separate child pictures;
- one mandatory workflow must not be split into false peer pictures.

Items: `ITEM-41`, `ITEM-98`.

## 17. Step 9 — Suggest And Review Concerns

Reusable Concern Definitions and one or more Concern Presets may propose attention for:

- Planning Items;
- Planning Directions;
- Documentation Files;
- later supported targets.

```text
target
  → recommended/manual concern sources
  → Concern Suggestions
  → applicability review
  → create/update only selected Applied Concerns.
```

A preset does not prove applicability. Several sources normally produce one active target + Concern Definition application while preserving all contribution links.

Suggestion dispositions may include:

```text
Pending Review;
Apply;
Not Applicable;
Already Covered;
Covered At Parent Level;
Covered At Full-Picture Level;
Review Deferred.
```

Items: `ITEM-119`, `ITEM-113`.

## 18. Step 10 — Expose Elaboration Observability

Derived views/counts/icons may show:

- unreviewed suggestions;
- open questions;
- unverified assumptions;
- risks;
- evidence needs;
- prototype/test needs;
- blocked or deferred work;
- concerns needing separate work;
- resolved work.

Every indicator must drill down to concrete records/items/targets.

```text
common lifecycle state
  ≠ concern-type-specific assessment
  ≠ one opaque quality score.
```

Views display existing state; they do not evaluate presets, apply concerns or accept items.

Items: `ITEM-118`, `ITEM-119`, `ITEM-113`.

## 19. Step 11 — Create Separate Deep Work Only When Justified

An Applied Concern may remain a compact target-owned record or link to a separate:

- Reference Object;
- Documentation File;
- File Location;
- prototype/test artifact;
- detailed Scenario/Domain/Slice work target.

Create separate work only when independent depth, ownership, lifecycle, testing or reuse justifies it.

Prototype-Depth Scenario/Domain/Slice methodology is explicitly outside this workflow version and remains the next separate planning task.

Item: `ITEM-113`.

## 20. Step 12 — Return Results To Items And Full Picture

Accepted deeper-work results update:

- Applied Concern status/summary;
- relevant Planning Items;
- Full Picture when shared understanding changes;
- resulting Decisions/Actions;
- evidence and prototype/test status.

The workflow may loop through concern review and Full Picture revision several times.

Items: `ITEM-113`, `ITEM-98`, `ITEM-41`.

## 21. Step 13 — Repository Semantic Reconciliation

Before a File Update Plan:

1. inspect every current canonical owner affected by the accepted meanings;
2. inspect source-linked item origins where available;
3. show existing meaning, incoming meaning, relation, owner and affected dependants;
4. reconcile clear support/duplication/extension;
5. require explicit user choice for unresolved direct contradiction or replacement;
6. show resulting item set and owner placement;
7. preserve active meaning until the transition is reviewable.

Item: `ITEM-98`.

## 22. Step 14 — Documentation / Reference Object Handoff

### Application-native managed item

```text
managed Planning Item Reference Object
  → identity already exists
  → choose/confirm canonical-state owner and durability
  → optionally assign semantic home
  → materialize/place canonical or referenced Markdown
  → enter Documentation/Reference Object authoring and diff workflow.
```

### Portable reviewed item

```text
reviewed portable item meaning
  → may remain portable
  → or enter a Reference Object proposal/confirmation path
  → then continue through documentation materialization.
```

### Existing documentation fragment

Continues through the separate extraction path in the Documentation/Reference Object workflow.

Interface item: `ITEM-22B`.

## 23. Navigation Throughout The Cycle

The user can keep open in separate IDE-like tabs:

- source message/fragment and surrounding turns;
- structured AI response;
- complete item body;
- semantic home;
- definition location;
- Full Picture and child picture;
- concern and separate work target;
- repository owner being reconciled.

Opening a current target from immutable history may show that the target changed later. Historical records are not silently rewritten.

Supporting items: `ITEM-11B`, `ITEM-35B`, `ITEM-116`.

## 24. Branches, Loops And Failure Paths

| Situation | Required behavior |
|---|---|
| Source is incomplete | Declare missing source; do not invent it. |
| Equivalent item already exists | Update/link/merge after visible review; do not create a duplicate automatically. |
| Incoming meaning conflicts with active owner | Show unresolved choice; do not silently replace either side. |
| Proposed item rejected | Preserve source/review history; do not create accepted item state. |
| Application-native parser is ambiguous | Keep response/proposal visible and require manual review. |
| Portable ledger and app state differ | Reconcile identities/meaning explicitly before import or overwrite. |
| Concern suggestion is not reviewed | Keep it observable as Pending Review; do not apply it automatically. |
| Concern needs substantial work | Link a separate work target only when justified. |
| Full Picture lacks a mandatory stage | Expand/combine the workflow; do not create a misleading peer picture. |
| Documentation handoff finds target conflict | Enter downstream Pending Review/conflict handling. |
| Later evidence changes meaning | Re-enter item transformation, concern and Full Picture loops. |

## 25. Core Objects And States

| Object / record | Relevant states |
|---|---|
| Source message/fragment | available; addressable; missing/declared unavailable |
| Proposed item meaning | formed; awaiting review; corrected; rejected |
| Planning Item | Working; Needs Documentation; Documented/Integrated; Unresolved; Deferred; Absorbed/Superseded; Rejected |
| Source contribution | Primary; Supporting; Clarifying; Correcting; Contradicting; Example; Confirmation |
| Full Picture | draft/current; needs review; accepted current synthesis |
| Concern Suggestion | Pending Review; Apply; Not Applicable; Already Covered; Covered At Parent/Full-Picture Level; Review Deferred |
| Applied Concern | Open; Deferred; Needs Separate Work; Resolved |
| Repository relation | covered; supports; extends; clarifies; corrects; conflicts; replaces; different scope; new |
| Delivery mode | portable Markdown; application-native; auto later |
| Documentation handoff | not started; in placement; Pending Review; diff-ready; integrated |

Exact final enums remain reviewable.

## 26. Boundaries

This workflow does not own:

- generic document/object authoring and dependency refresh after handoff;
- exact Markdown object/reference syntax;
- final app storage/database architecture;
- exact structured-response machine syntax;
- implementation of parser/runtime mode detection;
- root/local Direction and Use-Case Registry ownership, which remains outside this workflow body;
- Tampermonkey planning-surface projection, which remains a derived helper layer rather than workflow authority;
- Prototype-Depth Scenario/Domain/Slice methodology;
- commit or push.

`Source Idea` is not introduced.

## 27. Preserved Invariants

- Full source context remains available.
- AI interpretation is proposed until explicit review.
- Planning Item body is as detailed as meaning requires.
- Compact identity never replaces the full body.
- One semantic Planning Item entity spans working and documented states.
- Managed application-native Planning Items are Reference Objects from creation.
- Portable mode remains available.
- Full Pictures synthesize and trace; they do not become duplicate item owners.
- Concern Suggestions are not Applied Concerns.
- Views expose state and drill down; they do not create semantic truth.
- Deeper work is proportional.
- Repository reconciliation precedes literal file update.
- Implementation architecture remains non-final.

## 28. Open Questions

- exact structured-response and source-anchor representation;
- persistence/recovery of temporary app-only Planning Items;
- final common Planning Item and concern statuses;
- concern-type-specific assessment contracts;
- exact semantic-home assignment workflow;
- portable/app identity reconciliation;
- runtime application settings representation;
- prototype-depth detailed planning method;
- exact product architecture.

## 29. Acceptance And Next Gate

This Complete Picture and its 11-item direct phase map are accepted through the recent-chat reconciliation and explicit user acceptance.

Reusable synchronization completed:

```text
planning-item-formation-workflow.md
templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
terminology/principles/drafting/responsibility/navigation/template updates
```

Next work:

1. Direction and Use-Case registries plus project-readable input conventions; ✓
2. project the accepted `сформируй айтемы / form items` UCM route; ✓
3. project Orientation, Directions, Use Cases and Commands in Tampermonkey; ✓
4. run the whole-repository terminology/owner/link/projection audit; ✓
5. plan Prototype-Depth Scenario/Domain/Slice methodology separately;
6. plan runtime architecture only after explicit review.
