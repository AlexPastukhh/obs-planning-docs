# SCN-PH-PUBLISH — Publish One Planning Command Or Prompt To Repository

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** per-row explicit `Save GitHub` for a real Planning Command, prompt or legacy helper-command compatibility record.

**Successful result:** the deterministic repository target is created, confirmed as an exact no-op, updated using current remote SHA, or verified as already containing the intended bytes after an optimistic-concurrency conflict. A write requires exact read-back content verification. For a prompt/legacy helper-command compatibility record, explicit Save may also repair a malformed existing document at that same deterministic path by replacing it using the exact current remote SHA. After remote verification, the helper attempts to persist the corresponding local repository evidence metadata.

**Failure boundary:** if a write conflicts because the remote SHA changed, the helper rereads the remote target. If those bytes already equal the intended content, the result is recovered as verified success with the fresh SHA and no second PUT. If the reread bytes differ, it remains a real conflict and nothing is overwritten automatically. If the reread itself fails, the current remote relation remains unknown: the UI reports that the write conflicted and current remote content could not be verified, without claiming confirmed divergence. A verified remote result is not re-labelled as a GitHub failure merely because later browser-local snapshot persistence fails. In that case the UI must report remote verification success plus a local-metadata warning; the local record remains unverified/stale locally until a later successful persistence/check.

**Planning-command boundary:** a planning-command save validates the complete direct remote command catalog before write; this Scenario does not redefine command meaning. Malformed helper-document repair is specific to explicit prompt/legacy-helper Save. `Sync missing` and ordinary remote reads remain strict parsers and do not silently repair malformed repository content.

**Traceability:**

- **Product / behavior:** [`README.md#save-github`](../README.md#save-github), [`README.md#safety-boundary`](../README.md#safety-boundary).
- **Focused / durable contract:** [`planning/commands/README.md`](../../../../../commands/README.md), [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/repository-command-service.js`](../src/repository-command-service.js), [`src/repository-helper-library-service.js`](../src/repository-helper-library-service.js), [`src/github-contents-client.js`](../src/github-contents-client.js), [`src/planning-helper-state.js`](../src/planning-helper-state.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/repository-command-service.test.mjs`](../tests/repository-command-service.test.mjs), [`tests/repository-helper-library-service.test.mjs`](../tests/repository-helper-library-service.test.mjs), [`tests/github-contents-client.test.mjs`](../tests/github-contents-client.test.mjs), [`tests/planning-helper-state.test.mjs`](../tests/planning-helper-state.test.mjs), [`tests/planning-helper-ui.test.mjs`](../tests/planning-helper-ui.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-publish`](../MANUAL-ACCEPTANCE.md#scn-ph-publish); real-GitHub create/no-op/update/read-back cases remain separately observable.
