# SCN-LN-REVIEW-DEPENDENCIES — Configure And Complete Required File Reviews

Status: active current behavior owner
Scope: canonical detailed application behavior owner for repository Review Dependencies.

**Trigger/input:** the user registers a source-file → consumer-file semantic dependency, refreshes its status, opens the routed files, edits the relation meaning, removes it, or explicitly completes review after inspecting the source and consumer.

**Successful result:** the repository owns an explicit relation with source path, consumer path, reason, optional review scope and a consumer marker recording the SHA-256 fingerprint of the source state against which review was completed. Source changes therefore produce a visible `NEEDS REVIEW` signal without automatic consumer mutation.

**Current invariants:**

- `.linked-notes/review-dependencies.json` owns routing plus per-relation reason/reviewScope;
- the consumer `obs-review:dependency` marker owns reviewed-against fingerprint evidence;
- source fingerprint is derived from effective UTF-8 text with LF-normalized line endings and live Review Dependency bookkeeping comments excluded;
- pending local source text participates before publication;
- missing or mismatched `against` produces `NEEDS REVIEW`; unresolved routes/markers remain explicit;
- `Review complete` records acknowledgement only after semantic review; it does not perform the review automatically;
- no blind transitive cascade and no automatic consumer mutation;
- Reference Object stale/current behavior remains literal-content based and independent.

**Boundary:** all registry/consumer-marker changes are staged in the common local repository queue and publish only through `SCN-LN-PUBLISH`. Review warnings are advisory in this prototype and do not hard-block publication.

**Traceability:**

- **Repository/agent contract:** [`.linked-notes/REVIEW-DEPENDENCIES.md`](../../../../../../.linked-notes/REVIEW-DEPENDENCIES.md), [`.linked-notes/review-dependencies.json`](../../../../../../.linked-notes/review-dependencies.json), [`.linked-notes/AGENT-GUIDE.md`](../../../../../../.linked-notes/AGENT-GUIDE.md).
- **Product / state / architecture:** [`APP-OVERVIEW.md`](../APP-OVERVIEW.md), [`DATA-AND-STATE.md`](../DATA-AND-STATE.md), [`ARCHITECTURE.md`](../ARCHITECTURE.md).
- **Primary implementation:** [`src/review-dependency-markers.js`](../src/review-dependency-markers.js), [`src/review-dependency-registry.js`](../src/review-dependency-registry.js), [`src/review-dependency-fingerprint.js`](../src/review-dependency-fingerprint.js), [`src/repository-review-dependency-service.js`](../src/repository-review-dependency-service.js), [`src/repository-review-dependencies-runtime.js`](../src/repository-review-dependencies-runtime.js).
- **Automated evidence:** matching `tests/review-dependency-*.test.mjs`, [`tests/repository-review-dependency-service.test.mjs`](../tests/repository-review-dependency-service.test.mjs), [`tests/repository-review-dependencies-runtime.test.mjs`](../tests/repository-review-dependencies-runtime.test.mjs), plus suite/build inclusion through [`verify-linked-notes.mjs`](../verify-linked-notes.mjs).
- **Manual acceptance:** Review Dependency cases in [`PROTOTYPE-CHECKLIST.md`](../PROTOTYPE-CHECKLIST.md).
