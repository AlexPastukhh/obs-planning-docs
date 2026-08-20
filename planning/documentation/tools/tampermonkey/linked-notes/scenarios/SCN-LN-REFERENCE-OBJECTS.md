# SCN-LN-REFERENCE-OBJECTS — Define, Materialize, Check And Synchronize Reference Objects

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** the user defines/updates a Reference Object, copies/inserts a materialized use marker, checks freshness, updates a use locally, validates indexed tags or explicitly deep-validates repository evidence.

**Successful result:** stable `ro_*` identity connects one canonical definition marker to readable materialized uses; current/stale/unresolved evidence is visible and intended synchronization changes can be staged locally.

**Current invariants:**

- canonical value lives inside the `obs-ref:def` marker, not in the registry JSON;
- `.linked-notes/reference-objects.json` is routing/index metadata;
- materialized uses remain ordinary readable repository text;
- normal checks/Files stale diagnostics/`Validate tags` follow indexed definition/use routes;
- `Deep validate repo` is the separate explicit bounded repository-wide discovery path;
- definition changes do not silently propagate into all uses;
- stale/unresolved Files warnings are diagnostic only.

**Boundary:** local definition/use/index changes publish through `SCN-LN-PUBLISH`; automatic propagation remains roadmap research only.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#8-reference-objects`](../APP-OVERVIEW.md#8-reference-objects), [`REFERENCE-OBJECTS-PROTOTYPE.md`](../REFERENCE-OBJECTS-PROTOTYPE.md), [`DATA-AND-STATE.md#reference-object-identity`](../DATA-AND-STATE.md#reference-object-identity), [`ARCHITECTURE.md#reference-objects`](../ARCHITECTURE.md#reference-objects).
- **Focused / repository contract:** [`.linked-notes/REFERENCE-OBJECTS.md`](../../../../../../.linked-notes/REFERENCE-OBJECTS.md), registry/index file [`.linked-notes/reference-objects.json`](../../../../../../.linked-notes/reference-objects.json).
- **Primary implementation:** [`src/reference-object-markers.js`](../src/reference-object-markers.js), [`src/reference-object-registry.js`](../src/reference-object-registry.js), [`src/reference-object-local-store.js`](../src/reference-object-local-store.js), [`src/repository-reference-object-service.js`](../src/repository-reference-object-service.js), [`src/repository-reference-objects-runtime.js`](../src/repository-reference-objects-runtime.js), [`src/repository-reference-stale-runtime.js`](../src/repository-reference-stale-runtime.js).
- **Automated evidence:** [`tests/reference-object-markers.test.mjs`](../tests/reference-object-markers.test.mjs), [`tests/reference-object-registry.test.mjs`](../tests/reference-object-registry.test.mjs), [`tests/reference-object-local-store.test.mjs`](../tests/reference-object-local-store.test.mjs), [`tests/repository-reference-object-service.test.mjs`](../tests/repository-reference-object-service.test.mjs), [`tests/repository-reference-objects-runtime.test.mjs`](../tests/repository-reference-objects-runtime.test.mjs), plus suite/build inclusion through [`verify-linked-notes.mjs`](../verify-linked-notes.mjs).
- **Manual acceptance:** Reference Object staging/freshness/indexed-validation cases in [`PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists`](../PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists).
