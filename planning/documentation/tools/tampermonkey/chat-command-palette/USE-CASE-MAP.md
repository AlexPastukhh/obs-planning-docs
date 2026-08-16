# OBS Planning Helper Use-Case Map

Status: active current-prototype application semantic map
Version: v1.0.0 / Planning Helper `0.24.0`
Scope: current independently useful Planning Helper outcomes, their boundaries/relationships and primary docs → implementation → automated evidence → manual acceptance traceability.

Canonical registry: [`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md)

Application/build entry: [`README.md`](README.md)

## 1. Authority boundary

```text
planning/commands/*.command.md
  = planning-command meaning / route / permissions;

planning/helper-library/README.md
  = durable helper command/prompt repository file format;

USE-CASE-REGISTRY.md + USE-CASE-MAP.md
  = Planning Helper application semantic identity and current behavior boundaries;

src/**
  = current implementation evidence;

tests/**
  = automated evidence;

MANUAL-ACCEPTANCE.md
  = browser / real-GitHub acceptance plan and recorded status.
```

The Planning Helper can project planning Directions/Use Cases/Commands without becoming their meaning authority.

## 2. Relationship map

```text
                           ┌──────────────→ UC-PH-USE
                           │
UC-PH-DISCOVER ────────────┤
                           │
                           └──────────────→ UC-PH-MANAGE-LOCAL
                                              ↑
                                              │
                                         UC-PH-IMPORT

local snapshot / RAM
       │
       ├────────→ UC-PH-CHECK-REPOSITORY      (read-only remote inventory)
       │
       ├────────→ UC-PH-SYNC ───────────────→ updated local snapshot / RAM
       │
       └────────→ UC-PH-PUBLISH ────────────→ verified repository file

pasted complete repository evidence
       └────────→ UC-PH-RECOVER ────────────→ reconciled local snapshot / RAM
```

`UC-PH-CHECK-REPOSITORY`, `UC-PH-SYNC` and `UC-PH-PUBLISH` are the only current helper-side GitHub I/O Use Cases. Normal discovery/use/local editing/import/recovery remain browser-local.

## 3. Traceability convention

Each canonical UC below names:

- **Product / behavior** — current application behavior owner/context;
- **Focused / durable contract** — narrower repository format/command authority when applicable;
- **Primary implementation** — files principally implementing the outcome, intentionally not every transitive helper;
- **Automated evidence** — direct tests that exercise the implementation contract;
- **Manual acceptance** — browser/real-GitHub checks that automated tests do not imply.

Shared orchestration can pass through `src/planning-helper-runtime.js`, `src/planning-helper-ui.js` and `src/planning-helper-state.js` without making those modules semantic owners.

<a id="uc-ph-discover"></a>

## 4. `UC-PH-DISCOVER` — Find And Inspect Planning Helper Content

**Trigger/input:** the helper starts/opens, the user selects a surface or searches/browses current content.

**Successful result:** a current local command/helper/prompt or read-only semantic projection can be found and inspected from materialized RAM state without implicit GitHub access.

**Boundary:** startup/migration/materialization are supporting mechanisms, not separate outcomes. Semantic projections remain read-only projections of their own repository owners.

**Traceability:**

- **Product / behavior:** [`README.md#runtime-model`](README.md#runtime-model), [`README.md#unified-local-snapshot`](README.md#unified-local-snapshot).
- **Focused / durable contract:** planning-command authority starts at [`planning/commands/README.md`](../../../../commands/README.md); helper files use [`planning/helper-library/README.md`](../../../../helper-library/README.md).
- **Primary implementation:** [`src/planning-helper-state.js`](src/planning-helper-state.js), [`src/planning-helper-runtime.js`](src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](src/planning-helper-ui.js), [`src/semantic-projections.js`](src/semantic-projections.js).
- **Automated evidence:** [`tests/planning-helper-state.test.mjs`](tests/planning-helper-state.test.mjs), [`tests/planning-helper-runtime.test.mjs`](tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-policy.test.mjs`](tests/planning-helper-policy.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#uc-ph-discover`](MANUAL-ACCEPTANCE.md#uc-ph-discover).

<a id="uc-ph-use"></a>

## 5. `UC-PH-USE` — Use Helper Content In ChatGPT

**Trigger/input:** the user chooses a command/helper/prompt row, Full/refinement or Copy/Insert action.

**Successful result:** the exact selected RAM text is available on the clipboard and/or inserted into the current ChatGPT composer; repository availability does not affect the normal insertion path.

**Boundary:** Copy/Insert are delivery mechanisms of one user outcome, not separate Use Cases. Planning-command insertion does not grant permissions beyond the command definition.

**Traceability:**

- **Product / behavior:** [`README.md#clipboard--insert-contract`](README.md#clipboard--insert-contract), [`planning/documentation/tampermonkey-command-projection-workflow.md`](../../../tampermonkey-command-projection-workflow.md).
- **Focused / durable contract:** planning-command inserted bodies derive from [`planning/commands/*.command.md`](../../../../commands/README.md); helper text format is [`planning/helper-library/README.md`](../../../../helper-library/README.md).
- **Primary implementation:** [`src/composer-insertion.js`](src/composer-insertion.js), [`src/planning-helper-runtime.js`](src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](src/planning-helper-ui.js), [`src/command-body.js`](src/command-body.js).
- **Automated evidence:** [`tests/composer-insertion.test.mjs`](tests/composer-insertion.test.mjs), [`tests/planning-helper-runtime.test.mjs`](tests/planning-helper-runtime.test.mjs), [`tests/command-body.test.mjs`](tests/command-body.test.mjs), [`tests/planning-helper-policy.test.mjs`](tests/planning-helper-policy.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#uc-ph-use`](MANUAL-ACCEPTANCE.md#uc-ph-use).

<a id="uc-ph-manage-local"></a>

## 6. `UC-PH-MANAGE-LOCAL` — Manage Local Helper Content

**Trigger/input:** New local/New prompt/Edit/Save local/Delete on helper command or prompt content.

**Successful result:** a normalized helper record is created, changed or deleted in the unified local snapshot and current RAM view without an implicit repository mutation.

**Current invariants:**

- unchanged Edit → Save local is a no-op for the helper item and preserves repository evidence metadata;
- a real local content change updates `updatedAt` and invalidates exact-content repository evidence for that record;
- local Delete does not delete repository content.

**Boundary:** Repository persistence is a separate `UC-PH-PUBLISH` intent.

**Traceability:**

- **Product / behavior:** [`README.md#unified-local-snapshot`](README.md#unified-local-snapshot), [`README.md#repository-backed-entities`](README.md#repository-backed-entities).
- **Focused / durable contract:** [`planning/helper-library/README.md`](../../../../helper-library/README.md).
- **Primary implementation:** [`src/helper-library-codec.js`](src/helper-library-codec.js), [`src/planning-helper-state.js`](src/planning-helper-state.js), [`src/planning-helper-runtime.js`](src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](src/planning-helper-ui.js).
- **Automated evidence:** [`tests/helper-library-codec.test.mjs`](tests/helper-library-codec.test.mjs), [`tests/planning-helper-state.test.mjs`](tests/planning-helper-state.test.mjs), [`tests/planning-helper-runtime.test.mjs`](tests/planning-helper-runtime.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#uc-ph-manage-local`](MANUAL-ACCEPTANCE.md#uc-ph-manage-local).

<a id="uc-ph-import"></a>

## 7. `UC-PH-IMPORT` — Import Helper Content From ChatGPT

**Trigger/input:** Import from ChatGPT with supported planning-command/helper-library marker blocks.

**Successful result:** parsed records are validated and merged into local snapshot/RAM state; changed imported content loses exact repository evidence until separately verified/published.

**Boundary:** Import performs zero GitHub requests and does not imply repository persistence.

**Traceability:**

- **Product / behavior:** [`README.md#chatgpt-import-and-recovery`](README.md#chatgpt-import-and-recovery).
- **Focused / durable contract:** command marker contract is owned by [`planning/commands/README.md`](../../../../commands/README.md); helper marker contract by [`planning/helper-library/README.md`](../../../../helper-library/README.md).
- **Primary implementation:** [`src/chat-recovery.js`](src/chat-recovery.js), [`src/planning-helper-runtime.js`](src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](src/planning-helper-ui.js).
- **Automated evidence:** [`tests/chat-recovery.test.mjs`](tests/chat-recovery.test.mjs), [`tests/planning-helper-runtime.test.mjs`](tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-policy.test.mjs`](tests/planning-helper-policy.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#uc-ph-import`](MANUAL-ACCEPTANCE.md#uc-ph-import).

<a id="uc-ph-check-repository"></a>

## 8. `UC-PH-CHECK-REPOSITORY` — Inspect Local And Repository Inventory

**Trigger/input:** explicit `Check GitHub` on a repository-backed surface.

**Successful result:** the user sees local/GitHub counts, same-path entries, local-only/GitHub-only paths and known direct-SHA changes without local mutation.

**Boundary:** same-path means only that the deterministic path exists on both sides. It does **not** imply equal file content unless direct SHA/content evidence establishes that separately. The check intentionally does not GET every body for inventory comparison.

**Traceability:**

- **Product / behavior:** [`README.md#check-github`](README.md#check-github).
- **Focused / durable contract:** supported repository path families come from [`planning/commands/README.md`](../../../../commands/README.md) and [`planning/helper-library/README.md`](../../../../helper-library/README.md).
- **Primary implementation:** [`src/planning-helper-runtime.js`](src/planning-helper-runtime.js), [`src/repository-command-service.js`](src/repository-command-service.js), [`src/repository-helper-library-service.js`](src/repository-helper-library-service.js), [`src/github-contents-client.js`](src/github-contents-client.js), [`src/planning-helper-ui.js`](src/planning-helper-ui.js).
- **Automated evidence:** [`tests/planning-helper-runtime.test.mjs`](tests/planning-helper-runtime.test.mjs), [`tests/repository-command-service.test.mjs`](tests/repository-command-service.test.mjs), [`tests/repository-helper-library-service.test.mjs`](tests/repository-helper-library-service.test.mjs), [`tests/github-contents-client.test.mjs`](tests/github-contents-client.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#uc-ph-check-repository`](MANUAL-ACCEPTANCE.md#uc-ph-check-repository); real-GitHub acceptance is not implied by unit tests.

<a id="uc-ph-sync"></a>

## 9. `UC-PH-SYNC` — Bring Missing Repository Content Into Local State

**Trigger/input:** explicit `Sync missing`.

**Successful result:** supported repository records missing by deterministic path are fetched, parsed/validated and added to local snapshot/RAM; existing same-path local records are preserved.

**Boundary:** Sync is repository → local only for missing paths. It is not freshness reconciliation, conflict resolution or overwrite/synchronize-all.

**Traceability:**

- **Product / behavior:** [`README.md#sync-missing`](README.md#sync-missing).
- **Focused / durable contract:** [`planning/commands/README.md`](../../../../commands/README.md), [`planning/helper-library/README.md`](../../../../helper-library/README.md).
- **Primary implementation:** [`src/planning-helper-runtime.js`](src/planning-helper-runtime.js), [`src/repository-command-service.js`](src/repository-command-service.js), [`src/repository-helper-library-service.js`](src/repository-helper-library-service.js), [`src/github-contents-client.js`](src/github-contents-client.js), [`src/planning-helper-state.js`](src/planning-helper-state.js).
- **Automated evidence:** [`tests/planning-helper-runtime.test.mjs`](tests/planning-helper-runtime.test.mjs), [`tests/repository-command-service.test.mjs`](tests/repository-command-service.test.mjs), [`tests/repository-helper-library-service.test.mjs`](tests/repository-helper-library-service.test.mjs), [`tests/github-contents-client.test.mjs`](tests/github-contents-client.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#uc-ph-sync`](MANUAL-ACCEPTANCE.md#uc-ph-sync); real-GitHub acceptance remains explicit.

<a id="uc-ph-publish"></a>

## 10. `UC-PH-PUBLISH` — Publish One Local Helper Entity To Repository

**Trigger/input:** per-row explicit `Save GitHub` for a planning command, helper command or prompt.

**Successful result:** the deterministic repository target is created, confirmed as an exact no-op, or updated using current remote SHA; a write requires exact read-back content verification. After remote verification, the helper attempts to persist the corresponding local repository evidence metadata.

**Failure boundary:** a verified remote result is not re-labelled as a GitHub failure merely because later browser-local snapshot persistence fails. In that case the UI must report remote verification success plus a local-metadata warning; the local record remains unverified/stale locally until a later successful persistence/check.

**Planning-command boundary:** a planning-command save validates the complete direct remote command catalog before write; this application UC does not redefine command meaning.

**Traceability:**

- **Product / behavior:** [`README.md#save-github`](README.md#save-github), [`README.md#safety-boundary`](README.md#safety-boundary).
- **Focused / durable contract:** [`planning/commands/README.md`](../../../../commands/README.md), [`planning/helper-library/README.md`](../../../../helper-library/README.md).
- **Primary implementation:** [`src/planning-helper-runtime.js`](src/planning-helper-runtime.js), [`src/repository-command-service.js`](src/repository-command-service.js), [`src/repository-helper-library-service.js`](src/repository-helper-library-service.js), [`src/github-contents-client.js`](src/github-contents-client.js), [`src/planning-helper-state.js`](src/planning-helper-state.js), [`src/planning-helper-ui.js`](src/planning-helper-ui.js).
- **Automated evidence:** [`tests/planning-helper-runtime.test.mjs`](tests/planning-helper-runtime.test.mjs), [`tests/repository-command-service.test.mjs`](tests/repository-command-service.test.mjs), [`tests/repository-helper-library-service.test.mjs`](tests/repository-helper-library-service.test.mjs), [`tests/github-contents-client.test.mjs`](tests/github-contents-client.test.mjs), [`tests/planning-helper-state.test.mjs`](tests/planning-helper-state.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#uc-ph-publish`](MANUAL-ACCEPTANCE.md#uc-ph-publish); real-GitHub create/no-op/update/read-back cases remain separately observable.

<a id="uc-ph-recover"></a>

## 11. `UC-PH-RECOVER` — Recover Repository-Backed Local State From Pasted Evidence

**Trigger/input:** `Restore from GitHub copy` with the complete current marker set supplied externally after repository reading.

**Successful result:** repository-backed local records are reconciled to the pasted complete set, stale repository-backed records absent from that set are removed, and local-only unbacked records are preserved.

**Boundary:** the helper performs zero GitHub requests during Restore. Pasted evidence establishes repository-backed content provenance but does not fabricate a direct GitHub SHA; `repositorySha` stays empty until direct remote evidence exists.

**Traceability:**

- **Product / behavior:** [`README.md#chatgpt-import-and-recovery`](README.md#chatgpt-import-and-recovery).
- **Focused / durable contract:** recovery markers reuse [`planning/commands/README.md`](../../../../commands/README.md) and [`planning/helper-library/README.md`](../../../../helper-library/README.md) formats.
- **Primary implementation:** [`src/chat-recovery.js`](src/chat-recovery.js), [`src/planning-helper-runtime.js`](src/planning-helper-runtime.js), [`src/planning-helper-state.js`](src/planning-helper-state.js), [`src/planning-helper-ui.js`](src/planning-helper-ui.js).
- **Automated evidence:** [`tests/chat-recovery.test.mjs`](tests/chat-recovery.test.mjs), [`tests/planning-helper-runtime.test.mjs`](tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-state.test.mjs`](tests/planning-helper-state.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#uc-ph-recover`](MANUAL-ACCEPTANCE.md#uc-ph-recover).

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
