# SCN-PH-PUBLISH — Publish One Local Helper Entity To Repository

Status: active current behavior owner
Scope: detailed application behavior and traceability for `UC-PH-PUBLISH`.

Related Application Use Case: [`UC-PH-PUBLISH`](../USE-CASE-REGISTRY.md)

**Trigger/input:** per-row explicit `Save GitHub` for a planning command, helper command or prompt.

**Successful result:** the deterministic repository target is created, confirmed as an exact no-op, or updated using current remote SHA; a write requires exact read-back content verification. After remote verification, the helper attempts to persist the corresponding local repository evidence metadata.

**Failure boundary:** a verified remote result is not re-labelled as a GitHub failure merely because later browser-local snapshot persistence fails. In that case the UI must report remote verification success plus a local-metadata warning; the local record remains unverified/stale locally until a later successful persistence/check.

**Planning-command boundary:** a planning-command save validates the complete direct remote command catalog before write; this application UC does not redefine command meaning.

**Traceability:**

- **Product / behavior:** [`README.md#save-github`](../README.md#save-github), [`README.md#safety-boundary`](../README.md#safety-boundary).
- **Focused / durable contract:** [`planning/commands/README.md`](../../../../../commands/README.md), [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/repository-command-service.js`](../src/repository-command-service.js), [`src/repository-helper-library-service.js`](../src/repository-helper-library-service.js), [`src/github-contents-client.js`](../src/github-contents-client.js), [`src/planning-helper-state.js`](../src/planning-helper-state.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/repository-command-service.test.mjs`](../tests/repository-command-service.test.mjs), [`tests/repository-helper-library-service.test.mjs`](../tests/repository-helper-library-service.test.mjs), [`tests/github-contents-client.test.mjs`](../tests/github-contents-client.test.mjs), [`tests/planning-helper-state.test.mjs`](../tests/planning-helper-state.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#uc-ph-publish`](../MANUAL-ACCEPTANCE.md#uc-ph-publish); real-GitHub create/no-op/update/read-back cases remain separately observable.
