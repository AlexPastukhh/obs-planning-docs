# SCN-PH-RECOVER — Recover Repository-Backed Local State From Pasted Evidence

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** `Restore from GitHub copy` with the complete current marker set supplied externally after repository reading.

**Successful result:** repository-backed local records are reconciled to the pasted complete set, stale repository-backed records absent from that set are removed, and local-only unbacked records are preserved.

**Boundary:** the helper performs zero GitHub requests during Restore. Pasted evidence establishes repository-backed content provenance but does not fabricate a direct GitHub SHA; `repositorySha` stays empty until direct remote evidence exists.

**Traceability:**

- **Product / behavior:** [`README.md#chatgpt-import-and-recovery`](../README.md#chatgpt-import-and-recovery).
- **Focused / durable contract:** recovery markers reuse [`planning/commands/README.md`](../../../../../commands/README.md) and [`planning/helper-library/README.md`](../../../../../helper-library/README.md) formats.
- **Primary implementation:** [`src/chat-recovery.js`](../src/chat-recovery.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-state.js`](../src/planning-helper-state.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/chat-recovery.test.mjs`](../tests/chat-recovery.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-state.test.mjs`](../tests/planning-helper-state.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-recover`](../MANUAL-ACCEPTANCE.md#scn-ph-recover).

## 12. Repository evidence metadata

Snapshot compatibility keeps the existing fields:

```text
repositoryKnown
repositorySha
```

Their current meaning is deliberately narrower than “the remote currently matches”:

- `repositoryKnown=true` means the exact local record content has repository evidence/provenance (for example bundled repository content, pasted complete repository recovery evidence, direct Sync, or verified Save);
- `repositorySha` is populated only when a direct GitHub operation supplied a concrete SHA for that exact content;
- `repositorySha` therefore implies repository-known content, while repository-known content may legitimately have an empty SHA;
- a real local content change clears both pieces of exact-content evidence;
- a repository source change clears both before the new source settings become active.

The UI must not describe `repositoryKnown=true` with an empty SHA as a currently verified GitHub version.
