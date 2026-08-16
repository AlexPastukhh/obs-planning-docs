# OBS Linked Notes Prototype Changelog

Status: implementation history / not current-state authority
Current version: `0.8.0-prototype`

Use [`README.md`](README.md), [`APP-OVERVIEW.md`](APP-OVERVIEW.md), [`ARCHITECTURE.md`](ARCHITECTURE.md) and [`DATA-AND-STATE.md`](DATA-AND-STATE.md) for current behavior. This file records the major tracked prototype slices that were previously mixed into the main README.

## 0.8.0-prototype — Local-first repository publication and Ordered Reference Lists

- generalized the former Reference Object draft overlay into one legacy-compatible workspace/repository/branch pending-file queue;
- made ordinary file/folder, structure, copy, category and Reference Object business actions stage local intended state;
- added separate `Update current file` and `Update all` actions;
- implemented `Update all` with Git Data blobs/tree/commit, one non-force ref update and post-update tree verification, with no sequential Contents fallback;
- added inline Ordered Reference List/Item markers around complete selected lines or paragraphs;
- added natural, alphabetical, guarded leading-number and non-executable custom-value ordering with stable ties;
- allowed list creation with stale uses while blocking ordering until every nested use is current;
- added open-file and Files-tree stale/unresolved Reference Object diagnostics;
- corrected ordinary Reference Object Check/freshness reads to follow `.linked-notes/reference-objects.json` definition/use routes instead of crawling unrelated repository folders;
- changed ordinary `Validate tags` to use those same indexed definition/use routes and added explicit `Deep validate repo` for the bounded repository-wide integrity crawl;
- corrected the shared Files top-popup stacking boundary so portaled `Locations` and `Reference objects` panels paint above the main Linked Notes panel and remain clickable across ordinary rerenders;
- corrected shared top-popup theme inheritance so portaled explanatory text uses the Linked Notes foreground/font/dark color scheme instead of browser-default black text;
- added direct repository-relative path opening to `Locations`: directories browse directly, files open in their parent folder, exact pending-local paths are preferred and invalid/missing paths leave the current location unchanged;
- preserved same-chat Files location/open-file/editor state across Linked Notes panel collapse/expand while still rereading local workspace/category storage and resetting repository-derived state when the workspace mapping or repository target actually changes;
- made the Linked Notes panel centered by default and runtime-draggable from a dedicated handle, with viewport clamping, collapse/reopen position retention, rerender-safe in-progress dragging, a `Center` reset control and transient top-popup closure before panel movement/repositioning;
- corrected current UI ergonomics by giving Chat Response Reader the Linked Notes dark theme, closing shared top-popups on document-level outside pointerdown and allowing recoverable 64 px left/right edge-peek for the open draggable panel;
- moved current Linked Notes semantic ownership into local `USE-CASE-MAP.md` / `USE-CASE-REGISTRY.md`, added a local roadmap, and downgraded former Documentation Workbench Linked Notes workflow owners to legacy planning/compatibility context;
- made every canonical `UC-LN-*` map entry explicitly traceable to current behavior docs/contracts, primary source modules, direct automated tests and manual acceptance evidence, with stable registry-to-map anchors instead of generic `source/tests` shorthand;
- added repository-facing AI rules for manual Ordered Item structural validation;
- kept future Reference Object automatic-propagation policy as roadmap research only.

## 0.7.2-prototype — Chat Response Reader

- added a large local Reader reachable from the workspace bar;
- added idempotent `Open in Reader` actions for visible assistant messages where semantic ChatGPT role markers are available;
- kept exact `Paste Markdown` fallback;
- established `chat-dom → derived` and `paste → exact` source-accuracy invariants;
- cleared prior derived source/identity/diagnostics before a fresh Paste flow;
- added narrow safe `<details>/<summary>` rendering, including boolean `open`;
- kept arbitrary active HTML blocked and chat-response links/images inert/unloaded under the Reader boundary;
- added Reader semantic state to Full App State capture;
- kept Reader open/render/copy/close local-only with no GitHub or persistence write.

## 0.7.1-prototype — Runtime responsiveness correction

- verified category create/edit/membership writes update the local category snapshot without forcing a full repository refresh;
- explicit category refresh reuses unchanged definitions by repository path/listing SHA;
- member validation is bounded and excess targets remain explicitly unchecked;
- category refresh exposes progress/request activity;
- explicit Notes/category read-only refresh can be cancelled during its remote-read phase through the GM request abort handle;
- repository writes remain non-cancellable;
- runtime correction remains re-installable in the same JavaScript realm;
- transient cancellation errors are cleared without discarding unrelated state;
- Close and the Docs launcher remain usable while remote work runs, with launcher activity indication.

## 0.7.1-prototype — Repository heading-link copy

- derives an ordered heading outline from ATX and Setext headings in an already-loaded bounded Markdown preview, including supported container forms;
- copies repository-root Markdown links with deterministic duplicate-heading suffixes;
- performs no GitHub GET/PUT merely to open/copy the outline;
- exposes explicit empty outline state;
- hides the remote-snapshot heading-link control while an unsaved repository editor is active;
- uses explicit local clipboard action and reports clipboard failure without repository mutation.

## 0.7.0-prototype — Repository text authoring and category assignment

- created ordinary UTF-8 repository text files in the current folder;
- added tracked-folder creation through `.gitkeep` for the bounded folder-create flow;
- edited supported repository text files within the prototype bound without converting them into Linked Notes;
- required target absence or exact opened-file SHA and preserved editor input on conflicts/failures;
- read back explicit text-file/folder writes before reporting success;
- refreshed the affected directory after successful writes;
- used one searchable multi-select category dropdown for Note/file assignment;
- staged file-category selection locally and changed category definitions rather than file-body metadata;
- retained repository category-definition truth/implication boundaries;
- kept binary editing/upload, rename, move and delete outside that slice.

## 0.6.5-prototype — Files root auto-open

- first explicit opening of Files reads the active repository root when the browser context is unloaded;
- returning to Files retains the loaded directory without another automatic read;
- explicit Browse root remains available;
- failed initial reads remain visible and retryable.

## 0.6.4-prototype — Images, transfer, categories, rich Markdown and recovery expansion

Major additions included:

- category/search/rich-Markdown/relation behavior shared across Notes/Files/Categories;
- tree/search target selection for transfer;
- read-only transfer preflight and invalidation of stale prepared plans;
- contextual partial-result/retry handling;
- deterministic target-asset path reservation and source-image freshness checks;
- robust Markdown image discovery exclusions around code/comments/raw code-like HTML;
- exact read-only recovery after `verification_unknown` for matching already-written Markdown;
- strict UTF-8 checks for append targets;
- recoverable clipboard/file Note-image insertion;
- separate IndexedDB pending-image byte persistence;
- bounded PNG/JPEG/WebP/GIF validation;
- binary-safe GitHub asset writes with byte/hash read-back verification;
- Note-owned and target-owned sibling `.assets/` conventions;
- image-aware Note-to-Markdown create/append transfer with rewritten destinations;
- explicit preservation of source Note/assets and no automatic external-image download;
- file and Linked Note category support;
- v3 category definition managed regions with legacy read compatibility;
- shared bounded repository target picker;
- managed Note-link metadata with derived relations/backlinks;
- Note Edit/Preview/Split and file Rendered/Source modes;
- sanitized rich Markdown and authenticated repository image loading through temporary object URLs;
- contextual errors preserving related user state;
- automated regression coverage across the configured suite.

## Historical Boundary

Earlier versions remain in Git history. This changelog intentionally records major prototype slices rather than every commit or every low-level test correction.
