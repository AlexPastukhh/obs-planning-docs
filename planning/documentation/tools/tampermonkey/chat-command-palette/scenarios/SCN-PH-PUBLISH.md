# SCN-PH-PUBLISH — Publish One Local Helper Entity To Repository

Status: active current behavior owner
Scope: detailed application behavior and traceability for `UC-PH-PUBLISH`.

Related Application Use Case: [`UC-PH-PUBLISH`](../USE-CASE-REGISTRY.md)

**Trigger/input:** per-row explicit `Save GitHub` for a planning command, helper command or prompt.

**Successful result:** the deterministic repository target is created, confirmed as an exact no-op, updated using current remote SHA, or verified as already containing the intended bytes after an optimistic-concurrency conflict. A write requires exact read-back content verification. For a helper command/prompt, explicit Save may also repair a malformed existing document at that same deterministic path by replacing it using the exact current remote SHA. After remote verification, the helper attempts to persist the corresponding local repository evidence metadata.

**Failure boundary:** if a write conflicts because the remote SHA changed, the helper rereads the remote target. If those bytes already equal the intended content, the result is recovered as verified success with the fresh SHA and no second PUT. If the reread bytes differ, it remains a real conflict and nothing is overwritten automatically. If the reread itself fails, the current remote relation remains unknown: the UI reports that the write conflicted and current remote content could not be verified, without claiming confirmed divergence. A verified remote result is not re-labelled as a GitHub failure merely because later browser-local snapshot persistence fails. In that case the UI must report remote verification success plus a local-metadata warning; the local record remains unverified/stale locally until a later successful persistence/check.

**Planning-command boundary:** a planning-command save validates the complete direct remote command catalog before write; this application UC does not redefine command meaning. Malformed helper-document repair is specific to explicit helper command/prompt Save. `Sync missing` and ordinary remote reads remain strict parsers and do not silently repair malformed repository content.

**Traceability:**

- **Product / behavior:** [`README.md#save-github`](../README.md#save-github), [`README.md#safety-boundary`](../README.md#safety-boundary).
- **Focused / durable contract:** [`planning/commands/README.md`](../../../../../commands/README.md), [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/repository-command-service.js`](../src/repository-command-service.js), [`src/repository-helper-library-service.js`](../src/repository-helper-library-service.js), [`src/github-contents-client.js`](../src/github-contents-client.js), [`src/planning-helper-state.js`](../src/planning-helper-state.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/repository-command-service.test.mjs`](../tests/repository-command-service.test.mjs), [`tests/repository-helper-library-service.test.mjs`](../tests/repository-helper-library-service.test.mjs), [`tests/github-contents-client.test.mjs`](../tests/github-contents-client.test.mjs), [`tests/planning-helper-state.test.mjs`](../tests/planning-helper-state.test.mjs), [`tests/planning-helper-ui.test.mjs`](../tests/planning-helper-ui.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#uc-ph-publish`](../MANUAL-ACCEPTANCE.md#uc-ph-publish); real-GitHub create/no-op/update/read-back cases remain separately observable.
