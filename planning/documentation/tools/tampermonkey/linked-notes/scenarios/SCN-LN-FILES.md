# SCN-LN-FILES — Browse, Read And Prepare Repository File Work

Status: active current behavior owner
Scope: detailed application behavior and traceability for `UC-LN-FILES`.

Related Application Use Case: [`UC-LN-FILES`](../USE-CASE-REGISTRY.md)

**Trigger/input:** the user explicitly opens Files, navigates a repository location/path, opens/searches a file, creates/edits bounded text, creates structure, copies files/folders or starts a New File from a repository template.

**Successful result:** the user can inspect exact repository content/identity and/or produce complete intended repository file bytes staged locally with conflict-relevant base identity preserved.

**Current behavior includes:**

- repository root/folder browsing and direct repository-relative path opening;
- bounded text/source and safe rich Markdown preview;
- exact `Open on GitHub` targets;
- bounded UTF-8 file create/edit staged locally;
- tracked empty-folder representation where `.gitkeep` is required;
- repository-root file/heading-link copy;
- bounded path/filename search;
- add-only structure creation and binary-safe file/folder copy staged locally;
- repository templates as a New File seed;
- same-live-runtime Files context preservation across panel collapse/expand when workspace target is unchanged.

**Boundary:** local repository changes are not remote success. Standard publication is delegated to `UC-LN-PUBLISH`.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#5-files`](../APP-OVERVIEW.md#5-files), [`ARCHITECTURE.md#files-workspace`](../ARCHITECTURE.md#files-workspace), [`DATA-AND-STATE.md#10-persistence-and-mutation-rules`](../DATA-AND-STATE.md#10-persistence-and-mutation-rules).
- **Focused / repository contract:** repository-template seeding is defined by [`.linked-notes/templates/README.md`](../../../../../../.linked-notes/templates/README.md); Reference Object/Ordered List authoring rules are owned by their separate UCs/contracts.
- **Primary implementation:** [`src/repository-file-browser.js`](../src/repository-file-browser.js), [`src/repository-files-workspace-core.js`](../src/repository-files-workspace-core.js), [`src/repository-files-workspace-runtime.js`](../src/repository-files-workspace-runtime.js), [`src/repository-target.js`](../src/repository-target.js), [`src/repository-target-search.js`](../src/repository-target-search.js), [`src/repository-text-file-write.js`](../src/repository-text-file-write.js), [`src/repository-file-templates.js`](../src/repository-file-templates.js), [`src/repository-markdown-heading-links.js`](../src/repository-markdown-heading-links.js), [`src/repository-local-change-store.js`](../src/repository-local-change-store.js), [`src/repository-local-changes-runtime.js`](../src/repository-local-changes-runtime.js).
- **Automated evidence:** [`tests/repository-file-browser.test.mjs`](../tests/repository-file-browser.test.mjs), [`tests/repository-files-workspace-core.test.mjs`](../tests/repository-files-workspace-core.test.mjs), [`tests/repository-files-workspace-runtime.test.mjs`](../tests/repository-files-workspace-runtime.test.mjs), [`tests/repository-target.test.mjs`](../tests/repository-target.test.mjs), [`tests/repository-target-search.test.mjs`](../tests/repository-target-search.test.mjs), [`tests/repository-text-file-write.test.mjs`](../tests/repository-text-file-write.test.mjs), [`tests/repository-file-templates.test.mjs`](../tests/repository-file-templates.test.mjs), [`tests/repository-markdown-heading-links.test.mjs`](../tests/repository-markdown-heading-links.test.mjs), [`tests/repository-local-change-store.test.mjs`](../tests/repository-local-change-store.test.mjs), [`tests/repository-local-changes-runtime.test.mjs`](../tests/repository-local-changes-runtime.test.mjs), [`tests/files-surface-auto-load.test.mjs`](../tests/files-surface-auto-load.test.mjs).
- **Manual acceptance:** [`PROTOTYPE-CHECKLIST.md#4a-repository-file-browser`](../PROTOTYPE-CHECKLIST.md#4a-repository-file-browser), [`PROTOTYPE-CHECKLIST.md#4d-target-picker-and-bounded-search`](../PROTOTYPE-CHECKLIST.md#4d-target-picker-and-bounded-search), [`PROTOTYPE-CHECKLIST.md#4e-rich-markdown-and-repository-images`](../PROTOTYPE-CHECKLIST.md#4e-rich-markdown-and-repository-images), [`PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists`](../PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists).
