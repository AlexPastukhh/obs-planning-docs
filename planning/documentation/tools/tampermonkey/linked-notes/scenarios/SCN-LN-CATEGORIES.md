# SCN-LN-CATEGORIES — Manage Repository Categories

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** the user explicitly opens Categories, refreshes definitions, creates/edits a category, assigns/unassigns a file or verified Note, or inspects explicit/implied membership.

**Successful result:** category names/descriptions/implications/memberships are reconstructible from repository category-definition Markdown, with local intended changes staged and derived views/diagnostics visible.

**Current behavior includes:**

- explicit category refresh;
- category-definition create/update;
- explicit file and verified Note membership;
- category implication and derived membership;
- local-only UX groups;
- malformed/broken/cycle diagnostics;
- local category-definition/membership staging.

**Boundary:** category definitions are repository truth after publication; local cache/groups are not. Publication uses `SCN-LN-PUBLISH`.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#6-categories`](../APP-OVERVIEW.md#6-categories), [`ARCHITECTURE.md#categories`](../ARCHITECTURE.md#categories), [`DATA-AND-STATE.md#category-cache-identity`](../DATA-AND-STATE.md#category-cache-identity).
- **Focused / repository contract:** category meaning is carried by repository category-definition Markdown; no separate current `.linked-notes/**` category contract exists.
- **Primary implementation:** [`src/category-definition-codec.js`](../src/category-definition-codec.js), [`src/repository-category-index.js`](../src/repository-category-index.js), [`src/category-cache-store.js`](../src/category-cache-store.js), with user-flow integration in [`src/linked-notes-app.js`](../src/linked-notes-app.js) and [`src/repository-files-workspace-runtime.js`](../src/repository-files-workspace-runtime.js).
- **Automated evidence:** [`tests/category-definition-codec.test.mjs`](../tests/category-definition-codec.test.mjs), [`tests/repository-category-index.test.mjs`](../tests/repository-category-index.test.mjs), [`tests/category-cache-store.test.mjs`](../tests/category-cache-store.test.mjs), category integration cases in [`tests/linked-notes-app-policy.test.mjs`](../tests/linked-notes-app-policy.test.mjs).
- **Manual acceptance:** [`PROTOTYPE-CHECKLIST.md#4b-repository-file-categories`](../PROTOTYPE-CHECKLIST.md#4b-repository-file-categories), [`PROTOTYPE-CHECKLIST.md#4c-note-categories-and-multi-target-category-creation`](../PROTOTYPE-CHECKLIST.md#4c-note-categories-and-multi-target-category-creation), [`PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists`](../PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists).
