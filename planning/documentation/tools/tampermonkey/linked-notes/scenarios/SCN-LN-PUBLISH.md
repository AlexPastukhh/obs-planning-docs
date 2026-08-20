# SCN-LN-PUBLISH — Publish Pending Repository Changes

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** one or more pending repository-file changes exist and the user explicitly invokes `Update current file` or `Update all`.

**Successful result:** the selected publication scope is verified remotely and only verified pending changes are cleared; otherwise pending local state remains recoverable with an explicit conflict/error/unknown result.

**`Update current file`:**

- exactly the open pending path;
- GitHub Contents API;
- captured base SHA for updates / expected absence for creates;
- exact read-back;
- clears only that verified path.

**`Update all`:**

- every pending path in the exact workspace queue;
- per-path base/absence preflight;
- intended blobs + one tree + one commit;
- one non-force branch ref transition;
- post-update ref/commit/tree/blob verification;
- no sequential Contents fallback.

**Boundary:** this is the standard publisher for ordinary Files, Categories, Reference Objects, Ordered Lists, structure and copy. It does not absorb the compound Note save or image-aware Note transfer workflows.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#5-files`](../APP-OVERVIEW.md#5-files), [`README.md#5-remote-action-boundary`](../README.md#5-remote-action-boundary), [`ARCHITECTURE.md#github-adapter`](../ARCHITECTURE.md#github-adapter), [`ARCHITECTURE.md#6-read--write-separation`](../ARCHITECTURE.md#6-read--write-separation), [`DATA-AND-STATE.md#10-persistence-and-mutation-rules`](../DATA-AND-STATE.md#10-persistence-and-mutation-rules).
- **Focused / repository contract:** no feature-specific authoring contract; this UC is the standard publication boundary for the common pending repository queue. Current acceptance risk is tracked in [`KNOWN-ISSUES.md`](../KNOWN-ISSUES.md).
- **Primary implementation:** [`src/repository-change-publisher.js`](../src/repository-change-publisher.js), [`src/repository-local-change-store.js`](../src/repository-local-change-store.js), [`src/repository-local-changes-runtime.js`](../src/repository-local-changes-runtime.js), [`src/github-contents-client.js`](../src/github-contents-client.js).
- **Automated evidence:** [`tests/repository-change-publisher.test.mjs`](../tests/repository-change-publisher.test.mjs), [`tests/repository-local-change-store.test.mjs`](../tests/repository-local-change-store.test.mjs), [`tests/repository-local-changes-runtime.test.mjs`](../tests/repository-local-changes-runtime.test.mjs), [`tests/github-contents-client.test.mjs`](../tests/github-contents-client.test.mjs).
- **Manual acceptance:** [`PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists`](../PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists), [`PROTOTYPE-CHECKLIST.md#10-github-create-update-and-workspace-safety`](../PROTOTYPE-CHECKLIST.md#10-github-create-update-and-workspace-safety), [`PROTOTYPE-CHECKLIST.md#11-conflict-and-recovery`](../PROTOTYPE-CHECKLIST.md#11-conflict-and-recovery).
