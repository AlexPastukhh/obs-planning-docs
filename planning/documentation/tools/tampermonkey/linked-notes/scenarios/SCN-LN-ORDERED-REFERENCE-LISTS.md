# SCN-LN-ORDERED-REFERENCE-LISTS — Create And Reorder Reference-Driven Markdown Units

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** an open text/Markdown file contains Reference Object uses and the user invokes Ordered List creation or local ordering.

**Successful result:** complete physical line/paragraph units are represented by inline `obs-order:list` / `obs-order:item` markers and can be reordered locally using freshly checked current Reference Object values while bytes outside item ranges remain unchanged.

**Current invariants:**

- every item contains exactly one matching live Reference Object use;
- stale/unresolved uses may be wrapped, but ordering is blocked until fresh;
- line/paragraph structural units are validated from actual file text;
- sort modes are `number`, `alphabetical`, `natural` and exact-value `custom`;
- equal keys are stable;
- no `eval` or arbitrary comparator code;
- complete item units move; unrelated bytes remain in place.

**Boundary:** ordering is local and has no feature-specific GitHub action; the resulting file publishes through `SCN-LN-PUBLISH`.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#8-reference-objects`](../APP-OVERVIEW.md#8-reference-objects), [`DATA-AND-STATE.md#ordered-reference-list-identity`](../DATA-AND-STATE.md#ordered-reference-list-identity), [`ARCHITECTURE.md#reference-objects`](../ARCHITECTURE.md#reference-objects).
- **Focused / repository contract:** [`.linked-notes/ORDERED-REFERENCE-LISTS.md`](../../../../../../.linked-notes/ORDERED-REFERENCE-LISTS.md), with nested Reference Object semantics from [`.linked-notes/REFERENCE-OBJECTS.md`](../../../../../../.linked-notes/REFERENCE-OBJECTS.md).
- **Primary implementation:** [`src/ordered-reference-list-markers.js`](../src/ordered-reference-list-markers.js), [`src/ordered-reference-list-core.js`](../src/ordered-reference-list-core.js), [`src/repository-ordered-reference-lists-runtime.js`](../src/repository-ordered-reference-lists-runtime.js), with pending publication integration through [`src/repository-local-changes-runtime.js`](../src/repository-local-changes-runtime.js).
- **Automated evidence:** direct structural/sort coverage in [`tests/ordered-reference-list-core.test.mjs`](../tests/ordered-reference-list-core.test.mjs); marker/runtime inclusion is checked by the complete build/test verifier [`verify-linked-notes.mjs`](../verify-linked-notes.mjs).
- **Manual acceptance:** Ordered List create/stale/order/structural-validation cases in [`PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists`](../PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists).
