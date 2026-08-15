# OBS Linked Notes Prototype Architecture

Status: current implementation mapping / not production architecture
Version: `0.8.0-prototype`
Scope: technical map of the generated Tampermonkey application, its runtime extension order and external boundaries.

## 1. Layer Map

```text
ChatGPT page
  ├─ ChatGPT semantic DOM
  │    └─ Chat Response Reader integration
  │
  └─ OBS Linked Notes Shadow DOM UI
       ├─ Workspace management
       ├─ Notes
       ├─ Files
       ├─ Categories
       ├─ Reference Objects
       ├─ Reader
       └─ App State
            │
            ▼
       Linked Notes application/runtime
       ├─ pure domain/codec/planning modules
       ├─ local stores and caches
       ├─ repository/GitHub adapter
       └─ post-composition runtime extensions
            │
      ┌─────┴──────────────┐
      ▼                    ▼
Tampermonkey storage     IndexedDB
      │                    │
      └──────────┬─────────┘
                 ▼
       GitHub Contents + Git Data APIs
                 │
                 ▼
         repository Markdown/files
```

## 2. Build Model

`build-linked-notes.mjs` concatenates an explicit ordered `sourceFiles` list into one generated `linked-notes-prototype.user.js` and then bootstraps `ObsLinkedNotes.mountLinkedNotesPrototype()`.

The current high-level order is:

```text
foundation / pure policy
  → Note/image/Markdown/repository primitives
  → Files/template/Reference Object primitives
  → search/render/Reader primitives
  → category/relation/local-store/GitHub primitives
  → workspace and Full App State serialization primitives
  → base UI and app composition
  → runtime-responsiveness patch
  → Files workspace runtime
  → Reference Objects runtime
  → common local-change/publication runtime
  → Ordered Reference Lists runtime
  → Reference Object stale-diagnostics runtime
  → Chat Response Reader runtime
  → Full App State runtime
  → bootstrap
```

The final Full App State runtime is intentionally installed after the feature runtimes so it can observe their enumerable semantic application state.

The common local-change runtime is installed after Files and Reference Objects so it becomes the final owner of repository editor, structure/copy and feature-publication behavior. It preserves the former Reference Object local storage key for migration compatibility while normalizing entries into one queue.

## 3. Module Families

### Application shell

```text
src/linked-notes-ui.js
  base Shadow DOM UI and common interaction surfaces;

src/linked-notes-app.js
  main application composition and remote/local orchestration;

src/runtime-responsiveness.js
  post-composition correction for abortable read-only refresh,
  progress/activity and category refresh/write fast paths.
```

### Workspace/context

```text
src/workspace-context.js
  workspace schema, repository parsing, safe base paths and chat-key extraction;

src/workspace-store.js
  revisioned multi-tab workspace/chat/default/token storage and migration.
```

### Notes and relations

```text
src/linked-notes-core.js
src/note-markdown-codec.js
src/remote-note-reconcile.js
src/note-relation-index.js
```

These modules own Note identity/state/codec/reconciliation and derived relation behavior. Repository persistence remains orchestrated by the app/GitHub layers.

### Images and transfer

```text
src/note-image-assets.js
src/pending-note-asset-store.js
src/repository-asset-write.js
src/markdown-image-references.js
src/image-aware-markdown-transfer.js
src/repository-media-loader.js
```

They separate local pending bytes, repository asset planning/verification, Markdown image interpretation and same-repository transfer.

### Files workspace

```text
src/repository-file-browser.js
src/repository-text-file-write.js
src/repository-markdown-heading-links.js
src/repository-target.js
src/repository-target-search.js
src/repository-files-workspace-core.js
src/repository-file-templates.js
src/repository-files-workspace-runtime.js
```

The pure/core modules classify and plan repository targets; the runtime integrates Files-specific UI state and actions into the application.

### Categories

```text
src/category-definition-codec.js
src/repository-category-index.js
src/category-cache-store.js
```

Repository definition Markdown owns durable category meaning; index/cache modules derive local views and target-scoped cache/group state.

### Reference Objects

```text
src/reference-object-markers.js
src/ordered-reference-list-markers.js
src/ordered-reference-list-core.js
src/reference-object-registry.js
src/repository-local-change-store.js
src/reference-object-local-store.js
src/repository-reference-object-service.js
src/repository-reference-objects-runtime.js
src/repository-change-publisher.js
src/repository-local-changes-runtime.js
src/repository-ordered-reference-lists-runtime.js
src/repository-reference-stale-runtime.js
```

Marker/registry/service modules keep repository marker/index logic separate from UI/runtime integration. The common store/publisher own local intent and standard publication; Ordered List core owns structural validation and deterministic sorting; stale runtime projects repository freshness into Files.

### Rich Markdown and Reader

```text
src/rich-markdown-renderer.js
src/chat-response-reader.js
src/chat-response-reader-runtime.js
```

The rich renderer is shared projection infrastructure. Reader core owns source state/DOM derivation; Reader runtime owns ChatGPT DOM enhancement and the modal lifecycle.

### Full App State

```text
src/full-app-state-export.js
src/full-app-state-runtime.js
```

Exporter primitives serialize/redact/project state; the runtime enumerates current local stores and semantic app/UI state without calling persistence first.

### GitHub adapter

```text
src/github-contents-client.js
```

This client owns validated Contents operations plus Git Data ref/commit/tree/blob operations. Current-file publication uses Contents/read-back; all-file publication uses one checked Git Data commit/ref transition. Feature-specific compound Note/image/transfer workflows retain their own orchestration.

## 4. External Boundaries

### ChatGPT

The application is injected on:

```text
https://chatgpt.com/*
https://chat.openai.com/*
```

Current Reader automation depends on semantic rendered-DOM discovery where available. No private ChatGPT API is part of the current contract.

### GitHub

The userscript has `GM_xmlhttpRequest` access to `api.github.com` and uses an explicitly stored local credential for selected repository operations.

Important distinction:

```text
GitHub transport
  ≠ feature save protocol.
```

`github-contents-client.js` sends validated requests. The common publisher owns ordinary pending file current/all publication, while Notes, images and transfer retain feature-specific compound preflight/verification/recovery logic.

### Local storage

- GM storage: workspace/config/token/category caches, common pending repository changes and other application-owned keys;
- IndexedDB `obsLinkedNotesPrototype`: Note working records;
- IndexedDB `obsLinkedNotesPrototypeAssets`: pending/retry image bytes/state;
- runtime JS/DOM: open surfaces, editor state, Reader state and implementation handles.

See [`DATA-AND-STATE.md`](DATA-AND-STATE.md).

## 5. Runtime Extension Boundary

The application uses post-composition runtime extensions rather than one monolithic source file. An extension may augment App/UI constructors or instances, but should keep:

```text
serializable semantic state
  separate from
DOM / observer / timer / transport handles.
```

That split is important for Full App State export and for same-realm reinstallation cleanup.

## 6. Read / Write Separation

Current design distinguishes local/read-only actions from repository writes.

Examples of local/read-only actions:

- opening/closing Reader;
- rendering/copying Reader source;
- App State Refresh/copy;
- copying a loaded heading link;
- local category-group changes;
- typing/editing drafts before explicit remote save.

Repository actions are explicitly triggered and must preserve their feature-specific conflict/verification policy.

## 7. Generated Artifact Boundary

`linked-notes-prototype.user.js` is generated from `src/**` using `build-linked-notes.mjs`. It is evidence/delivery, not an independent implementation owner.

`verify-linked-notes.mjs` checks source syntax/tests/generated freshness. A documentation-only change must not require regenerating the userscript.

## 8. Architectural Pressure Points

Current future-design pressure points are tracked rather than silently resolved here:

1. ChatGPT response acquisition is coupled to external rendered DOM.
2. Content copying is fragmented across feature-specific clipboard actions and diagnostic Full App State.
3. GitHub write orchestration is feature-specific around one low-level Contents client, making cross-feature reliability diagnosis harder.

See [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md) and the project-local roadmap.
