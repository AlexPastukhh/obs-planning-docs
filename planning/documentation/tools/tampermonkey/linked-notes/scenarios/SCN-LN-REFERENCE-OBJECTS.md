# SCN-LN-REFERENCE-OBJECTS — Define, Materialize, Depend On, Check And Synchronize Reference Objects

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** the user defines/updates a Reference Object, copies/inserts a materialized use, creates a bounded dependent fragment, checks literal freshness or dependency review state, completes semantic review, updates a use locally, validates indexed tags or explicitly deep-validates repository evidence.

**Successful result:** stable `ro_*` identity connects one canonical definition to readable literal uses and explicitly tracked dependent fragments; stale uses and semantic review obligations remain distinguishable, and selected synchronization/review state can be staged locally without silent content mutation.

**Current invariants:**

- canonical literal value lives only inside `obs-ref:def`, never in registry JSON;
- `obs-ref:use` contains a literal materialized copy and may be explicitly synchronized;
- `obs-ref:depend` contains independent derived/semantic content and is never auto-rewritten from the source value;
- dependency marker identity is `path + positive file-local dep number`; a file-local number cannot denote two dependencies;
- `.linked-notes/reference-objects.json` schema v2 stores routing/index data plus dependency `reviewedAgainst` (source) and `reviewedFragment` (bounded fragment) acknowledgements, not canonical content;
- both review fingerprints are SHA-256 of exact text and live only in registry metadata;
- `Check dependencies` follows indexed consumer paths, requires the registered marker to resolve uniquely and reports CURRENT only when source and fragment fingerprints both match; `Review complete` updates both acknowledgements after semantic review;
- normal checks/Files diagnostics/`Validate tags` use indexed routes; `Deep validate repo` is the separate bounded repository-wide discovery path;
- if a dependency acknowledgement was derived from a pending definition, the Definitions File cannot be published alone ahead of that definition; use coherent `Update all`;
- definition changes do not silently propagate into uses or dependent fragments.

**Boundary:** local definition/use/dependency/index changes publish through `SCN-LN-PUBLISH`. Whole-file source→consumer review obligations remain owned by `SCN-LN-REVIEW-DEPENDENCIES`; automatic Reference Object propagation remains roadmap research only.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#8-reference-objects`](../APP-OVERVIEW.md#8-reference-objects), [`REFERENCE-OBJECTS-PROTOTYPE.md`](../REFERENCE-OBJECTS-PROTOTYPE.md), [`DATA-AND-STATE.md#reference-object-identity`](../DATA-AND-STATE.md#reference-object-identity), [`ARCHITECTURE.md#reference-objects`](../ARCHITECTURE.md#reference-objects).
- **Focused / repository contract:** [`.linked-notes/REFERENCE-OBJECTS.md`](../../../../../../.linked-notes/REFERENCE-OBJECTS.md), direct authoring [`.linked-notes/REFERENCE-OBJECTS-AUTHORING.md`](../../../../../../.linked-notes/REFERENCE-OBJECTS-AUTHORING.md), registry [`.linked-notes/reference-objects.json`](../../../../../../.linked-notes/reference-objects.json).
- **Primary implementation:** [`src/reference-object-markers.js`](../src/reference-object-markers.js), [`src/reference-object-registry.js`](../src/reference-object-registry.js), [`src/reference-object-local-store.js`](../src/reference-object-local-store.js), [`src/repository-reference-object-service.js`](../src/repository-reference-object-service.js), [`src/repository-reference-objects-runtime.js`](../src/repository-reference-objects-runtime.js), [`src/repository-reference-stale-runtime.js`](../src/repository-reference-stale-runtime.js), publication guard in [`src/repository-local-changes-runtime.js`](../src/repository-local-changes-runtime.js).
- **Automated evidence:** [`tests/reference-object-markers.test.mjs`](../tests/reference-object-markers.test.mjs), [`tests/reference-object-registry.test.mjs`](../tests/reference-object-registry.test.mjs), [`tests/reference-object-local-store.test.mjs`](../tests/reference-object-local-store.test.mjs), [`tests/repository-reference-object-service.test.mjs`](../tests/repository-reference-object-service.test.mjs), [`tests/repository-reference-objects-runtime.test.mjs`](../tests/repository-reference-objects-runtime.test.mjs), [`tests/repository-local-changes-runtime.test.mjs`](../tests/repository-local-changes-runtime.test.mjs), plus suite/build inclusion through [`verify-linked-notes.mjs`](../verify-linked-notes.mjs).
- **Manual acceptance:** Reference Object staging/freshness/dependency/indexed-validation cases in [`PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists`](../PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists).
