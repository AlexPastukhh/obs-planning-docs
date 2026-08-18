# Documentation Workbench Planning Area

Status: active project-local planning area / Linked Notes current-state ownership migrated / Planning Item ontology retired
Doc version: v1.7.0-linked-notes-semantic-ownership-migration
Scope: repository-native Documentation Workbench planning, planning history and non-Linked-Notes workflows. Current Linked Notes application semantics now live with the Linked Notes documentation/implementation corpus.

Reusable planning method remains under [`planning/documentation/application-planning/`](../../documentation/application-planning/README.md).

## 1. Current Read Route

For Documentation Workbench planning work:

```text
README.md
  → planning-draft.md
  → direction-registry.md
  → use-case-registry.md
  → selected current non-Linked-Notes workflow;

on demand for provenance/history only:
  planning-item-register.md

on demand:
  retired-planning-items.md
  reference-object-model-and-lifecycle.md.
```

For **current Linked Notes application behavior or implementation work**, leave this area and start at:

```text
planning/documentation/tools/tampermonkey/linked-notes/README.md
  → USE-CASE-MAP.md
  → USE-CASE-REGISTRY.md
  → APP-OVERVIEW.md
  → focused current implementation docs.
```

Current Linked Notes semantic entry: [`USE-CASE-MAP.md`](../../documentation/tools/tampermonkey/linked-notes/USE-CASE-MAP.md).

## 2. Current Owners In This Area

| Responsibility | Owner |
|---|---|
| High-level Documentation Workbench planning direction / historical selected scenarios | [`planning-draft.md`](planning-draft.md) |
| Historical ITEM-* provenance/migration source | [`planning-item-register.md`](planning-item-register.md) |
| Historical finalized ITEM-* bodies and pre-reset history | [`retired-planning-items.md`](retired-planning-items.md) |
| Planning source-to-repository lifecycle | [`planning-meaning-to-repository-workflow.md`](planning-meaning-to-repository-workflow.md) |
| Direct documentation change/reference review lifecycle | [`repository-documentation-change-and-reference-review-workflow.md`](repository-documentation-change-and-reference-review-workflow.md) |
| Local semantic Directions for this planning area | [`direction-registry.md`](direction-registry.md) |
| Non-Linked-Notes current Use Cases + Linked Notes compatibility aliases | [`use-case-registry.md`](use-case-registry.md) |
| Current Linked Notes semantic/product authority | [`linked-notes/USE-CASE-MAP.md`](../../documentation/tools/tampermonkey/linked-notes/USE-CASE-MAP.md) + [`USE-CASE-REGISTRY.md`](../../documentation/tools/tampermonkey/linked-notes/USE-CASE-REGISTRY.md) |

## 3. Linked Notes Ownership Migration

The current `0.8.0-prototype` has outgrown the older arrangement where this planning area acted as the semantic owner while implementation documentation lived elsewhere.

Current rule:

```text
planning/documentation/tools/tampermonkey/linked-notes/
  = current Linked Notes semantic + product + implementation documentation root;

planning/areas/documentation-workbench/
  = broader planning/history/compatibility context;
  ≠ current Linked Notes behavior owner.
```

The current Linked Notes map/registry is intentionally based on the actual application state: Workspace, Notes, Files, Categories, standard pending-file publication, Note/image transfer, Reference Objects, Ordered Reference Lists, Reader and App State.

Former `UC-DW-*` Linked Notes IDs remain compatibility aliases only. Current canonical `UC-LN-*` IDs are in the Linked Notes registry.

## 4. Current Independently Traversable Workflows Still Owned Here

### Planning Meaning To Repository

Use when selected source/current planning meaning must be reviewed, integrated into the current Planning Draft/owners as needed and handed to an explicit File Update Plan.

Owner: [`planning-meaning-to-repository-workflow.md`](planning-meaning-to-repository-workflow.md).

### Repository Documentation Change And Reference Review

Use when work starts directly from repository Markdown or an accepted planning handoff.

Owner: [`repository-documentation-change-and-reference-review-workflow.md`](repository-documentation-change-and-reference-review-workflow.md).

Linked Notes may produce repository content that participates in these broader workflows, but current Linked Notes application semantics are not owned here.

## 5. Retained Linked Notes Compatibility / Historical Files

These files are intentionally retained so old links and planning history remain understandable, but they are **not current Linked Notes owners**:

```text
linked-notes-end-to-end-workflow.md
image-aware-markdown-transfer-workflow.md
repository-file-browser-and-categories-workflow.md
files-centric-repository-workspace-extension.md
reference-object-definition-and-materialized-use-workflow.md
ordered-reference-list-workflow.md
local-first-repository-change-and-github-update-workflow.md
chat-response-reader-workflow.md
full-app-state-export-workflow.md
linked-notes-prototype-roadmap.md
```

Each retained file carries an explicit migration banner pointing to the current Linked Notes map/registry. The current roadmap is [`linked-notes/ROADMAP.md`](../../documentation/tools/tampermonkey/linked-notes/ROADMAP.md).

## 6. Planning Draft / Historical Item Boundary

`planning-draft.md` is the current high-level planning owner for this area. `planning-item-register.md` and `retired-planning-items.md` preserve historical ITEM-* provenance/migration context only.

New answer-seeking work uses the shared Idea methodology. Current decisions/requirements belong in the Planning Draft, current workflows/registries and current application owners. Do not convert historical ITEM-* bodies one-to-one into Ideas.

## 7. Other Compatibility Paths

The following older paths remain for their existing compatibility/history purpose:

```text
full-picture.md
complete-pictures/planning-items-and-full-picture/full-picture.md
documentation-and-reference-object-end-to-end-workflow.md
```

[`reference-object-model-and-lifecycle.md`](reference-object-model-and-lifecycle.md) describes the deferred application-heavy alternative, not the current repository-native Linked Notes Reference Object implementation.

## 8. Root And Permission Boundary

Root README, root Direction/activation/source routes and Planning command projection remain separate from the Linked Notes application runtime.

Neither this area nor the Linked Notes semantic registry grants edit/archive/commit/push permission. Repository-change permission continues to come from the active command route.

## 9. Update Discipline

- keep current Linked Notes semantics with the Linked Notes corpus;
- keep broader planning/history here without silently reasserting ownership of the application;
- preserve compatibility mappings when old `UC-DW-*` IDs or workflow paths are still referenced;
- use complete replacements and exact base-blob checks for reviewed packages;
- inspect the complete diff before commit;
- do not infer commit or push permission.
