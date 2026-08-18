# OBS Planning Helper Use-Case Registry

Status: active canonical application semantic registry
Version: v1.0.0 / Planning Helper `0.24.0`
Scope: independently useful current Planning Helper user outcomes. This registry owns application Use-Case identity; it does not own planning-command meaning or helper-library file format.

Scenario catalog: [`scenarios/README.md`](scenarios/README.md)

Application entry: [`README.md`](README.md)

## 1. Registry rules

- Canonical Planning Helper Use Cases use the `UC-PH-*` namespace.
- A button, startup phase, setting, storage key, API call or runtime module does not receive a UC ID merely because it exists.
- One Use Case may accept different entity kinds when the trigger/result/boundary are the same.
- Planning-command meaning remains owned by `planning/commands/*.command.md`.
- Helper command/prompt repository format remains owned by [`planning/helper-library/README.md`](../../../../helper-library/README.md).
- Exact behavior and docs → code → tests → acceptance traceability live in related Scenario owners under [`scenarios/`](scenarios/README.md).

## 2. Current registry

| Use-Case ID | Semantic name | Current status | Trigger/input | Successful user result | Canonical traceability |
|---|---|---|---|---|---|
| `UC-PH-DISCOVER` | Find And Inspect Planning Helper Content | current prototype | open helper, choose a surface, search/browse | requested current local/projection item is discoverable and inspectable without repository I/O | [`SCN-PH-DISCOVER`](scenarios/SCN-PH-DISCOVER.md) |
| `UC-PH-USE` | Use Helper Content In ChatGPT | current prototype; browser acceptance required | select Copy/Insert/Full/refinement for an available item | exact selected text is copied and/or inserted into the ChatGPT composer without repository I/O | [`SCN-PH-USE`](scenarios/SCN-PH-USE.md) |
| `UC-PH-MANAGE-LOCAL` | Manage Local Helper Content | current prototype; browser acceptance required | create/edit/save/delete a helper command or prompt | normalized helper content is created/updated/deleted in local snapshot/RAM only | [`SCN-PH-MANAGE-LOCAL`](scenarios/SCN-PH-MANAGE-LOCAL.md) |
| `UC-PH-IMPORT` | Import Helper Content From ChatGPT | current prototype; browser acceptance required | paste supported command/helper marker blocks into Import from ChatGPT | parsed records are merged into local state without GitHub I/O | [`SCN-PH-IMPORT`](scenarios/SCN-PH-IMPORT.md) |
| `UC-PH-CHECK-REPOSITORY` | Inspect Local And Repository Inventory | current prototype; real-GitHub acceptance required | explicit `Check GitHub` | user receives a read-only same-path/local-only/GitHub-only inventory and known-SHA-change diagnostics | [`SCN-PH-CHECK-REPOSITORY`](scenarios/SCN-PH-CHECK-REPOSITORY.md) |
| `UC-PH-SYNC` | Bring Missing Repository Content Into Local State | current prototype; real-GitHub acceptance required | explicit `Sync missing` | repository-only supported records are validated and added locally without overwriting same-path local records | [`SCN-PH-SYNC`](scenarios/SCN-PH-SYNC.md) |
| `UC-PH-PUBLISH` | Publish One Local Helper Entity To Repository | current prototype; real-GitHub acceptance required | per-row explicit `Save GitHub` | one deterministic repository target is created/no-op verified/SHA-updated with exact read-back, while local verification metadata is updated when local persistence succeeds | [`SCN-PH-PUBLISH`](scenarios/SCN-PH-PUBLISH.md) |
| `UC-PH-RECOVER` | Recover Repository-Backed Local State From Pasted Evidence | current prototype; browser acceptance required | `Restore from GitHub copy` with a complete supported marker set | repository-backed local records are reconciled to pasted evidence while local-only unbacked records are preserved, with zero helper-side GitHub requests | [`SCN-PH-RECOVER`](scenarios/SCN-PH-RECOVER.md) |

## 3. Supporting capabilities without separate UC IDs

These are important but are not independently useful current outcomes:

- warm startup/migration/materialization — enabling path for `UC-PH-DISCOVER` and the local-state UCs;
- Repository settings/token — configuration for `UC-PH-CHECK-REPOSITORY`, `UC-PH-SYNC` and `UC-PH-PUBLISH`;
- local Delete — operation inside `UC-PH-MANAGE-LOCAL`;
- repository-operation lock — concurrency infrastructure for explicit repository actions;
- GitHub Contents API, remote SHA and exact read-back — implementation mechanisms of repository UCs;
- Orientation / Directions / Use Cases tabs — read-only planning semantic projections used through `UC-PH-DISCOVER` / `UC-PH-USE`, not Planning Helper application UC authority.

## Complete Semantic Entries

### `UC-PH-DISCOVER` — Find And Inspect Planning Helper Content

**Status:** active current
**Parent Direction:** `DIR-PLANNING-HELPER`
**Purpose:** make current helper commands/prompts and semantic projections findable/inspectable without implicit repository I/O.

**Trigger / accepted input:** the helper starts/opens, the user selects a surface or searches/browses current content.

**Result / end state:** a current local command/helper/prompt or read-only semantic projection can be found and inspected from materialized RAM state without implicit GitHub access.

**Boundaries:** startup/migration/materialization are supporting mechanisms, not separate outcomes. Semantic projections remain read-only projections of their own repository owners.

**Scenario owner:** [`SCN-PH-DISCOVER`](scenarios/SCN-PH-DISCOVER.md)



**Owner route:** this registry entry → [`SCN-PH-DISCOVER`](scenarios/SCN-PH-DISCOVER.md) → focused implementation/test owners linked from that Scenario.

### `UC-PH-USE` — Use Helper Content In ChatGPT

**Status:** active current
**Parent Direction:** `DIR-PLANNING-HELPER`
**Purpose:** deliver exact selected helper content into ChatGPT/clipboard while preserving the underlying command/semantic authority.

**Trigger / accepted input:** the user chooses a command/helper/prompt row, Full/refinement or Copy/Insert action.

**Result / end state:** the exact selected RAM text is available on the clipboard and/or inserted into the current ChatGPT composer; repository availability does not affect the normal insertion path.

**Boundaries:** Copy/Insert are delivery mechanisms of one user outcome, not separate Use Cases. Planning-command insertion does not grant permissions beyond the command definition.

**Scenario owner:** [`SCN-PH-USE`](scenarios/SCN-PH-USE.md)



**Owner route:** this registry entry → [`SCN-PH-USE`](scenarios/SCN-PH-USE.md) → focused implementation/test owners linked from that Scenario.

### `UC-PH-MANAGE-LOCAL` — Manage Local Helper Content

**Status:** active current
**Parent Direction:** `DIR-PLANNING-HELPER`
**Purpose:** create, edit or delete helper content in local state without an implicit repository write.

**Trigger / accepted input:** New local/New prompt/Edit/Save local/Delete on helper command or prompt content.

**Result / end state:** a normalized helper record is created, changed or deleted in the unified local snapshot and current RAM view without an implicit repository mutation.

**Boundaries:** Repository persistence is a separate `UC-PH-PUBLISH` intent.

**Scenario owner:** [`SCN-PH-MANAGE-LOCAL`](scenarios/SCN-PH-MANAGE-LOCAL.md)



**Owner route:** this registry entry → [`SCN-PH-MANAGE-LOCAL`](scenarios/SCN-PH-MANAGE-LOCAL.md) → focused implementation/test owners linked from that Scenario.

### `UC-PH-IMPORT` — Import Helper Content From ChatGPT

**Status:** active current
**Parent Direction:** `DIR-PLANNING-HELPER`
**Purpose:** import supported ChatGPT marker blocks into validated local helper state.

**Trigger / accepted input:** Import from ChatGPT with supported planning-command/helper-library marker blocks.

**Result / end state:** parsed records are validated and merged into local snapshot/RAM state; changed imported content loses exact repository evidence until separately verified/published.

**Boundaries:** Import performs zero GitHub requests and does not imply repository persistence.

**Scenario owner:** [`SCN-PH-IMPORT`](scenarios/SCN-PH-IMPORT.md)



**Owner route:** this registry entry → [`SCN-PH-IMPORT`](scenarios/SCN-PH-IMPORT.md) → focused implementation/test owners linked from that Scenario.

### `UC-PH-CHECK-REPOSITORY` — Inspect Local And Repository Inventory

**Status:** active current
**Parent Direction:** `DIR-PLANNING-HELPER`
**Purpose:** inspect local vs repository inventory/evidence without mutating local or remote content.

**Trigger / accepted input:** explicit `Check GitHub` on a repository-backed surface.

**Result / end state:** the user sees local/GitHub counts, same-path entries, local-only/GitHub-only paths and known direct-SHA changes without local mutation.

**Boundaries:** same-path means only that the deterministic path exists on both sides. It does **not** imply equal file content unless direct SHA/content evidence establishes that separately. The check intentionally does not GET every body for inventory comparison.

**Scenario owner:** [`SCN-PH-CHECK-REPOSITORY`](scenarios/SCN-PH-CHECK-REPOSITORY.md)



**Owner route:** this registry entry → [`SCN-PH-CHECK-REPOSITORY`](scenarios/SCN-PH-CHECK-REPOSITORY.md) → focused implementation/test owners linked from that Scenario.

### `UC-PH-SYNC` — Bring Missing Repository Content Into Local State

**Status:** active current
**Parent Direction:** `DIR-PLANNING-HELPER`
**Purpose:** bring repository-only supported helper records into local state without overwriting same-path local records.

**Trigger / accepted input:** explicit `Sync missing`.

**Result / end state:** supported repository records missing by deterministic path are fetched, parsed/validated and added to local snapshot/RAM; existing same-path local records are preserved.

**Boundaries:** Sync is repository → local only for missing paths. It is not freshness reconciliation, conflict resolution or overwrite/synchronize-all.

**Scenario owner:** [`SCN-PH-SYNC`](scenarios/SCN-PH-SYNC.md)



**Owner route:** this registry entry → [`SCN-PH-SYNC`](scenarios/SCN-PH-SYNC.md) → focused implementation/test owners linked from that Scenario.

### `UC-PH-PUBLISH` — Publish One Local Helper Entity To Repository

**Status:** active current
**Parent Direction:** `DIR-PLANNING-HELPER`
**Purpose:** explicitly persist one local helper entity to its deterministic repository path with exact verification.

**Trigger / accepted input:** per-row explicit `Save GitHub` for a planning command, helper command or prompt.

**Result / end state:** the deterministic repository target is created, confirmed as an exact no-op, or updated using current remote SHA; a write requires exact read-back content verification. After remote verification, the helper attempts to persist the corresponding local repository evidence metadata.

**Boundaries:** Detailed behavior and implementation boundaries are owned by the related Scenario and focused owners.

**Scenario owner:** [`SCN-PH-PUBLISH`](scenarios/SCN-PH-PUBLISH.md)



**Owner route:** this registry entry → [`SCN-PH-PUBLISH`](scenarios/SCN-PH-PUBLISH.md) → focused implementation/test owners linked from that Scenario.

### `UC-PH-RECOVER` — Recover Repository-Backed Local State From Pasted Evidence

**Status:** active current
**Parent Direction:** `DIR-PLANNING-HELPER`
**Purpose:** reconcile repository-backed local helper state from complete externally supplied repository evidence without helper-side GitHub access.

**Trigger / accepted input:** `Restore from GitHub copy` with the complete current marker set supplied externally after repository reading.

**Result / end state:** repository-backed local records are reconciled to the pasted complete set, stale repository-backed records absent from that set are removed, and local-only unbacked records are preserved.

**Boundaries:** the helper performs zero GitHub requests during Restore. Pasted evidence establishes repository-backed content provenance but does not fabricate a direct GitHub SHA; `repositorySha` stays empty until direct remote evidence exists.

**Scenario owner:** [`SCN-PH-RECOVER`](scenarios/SCN-PH-RECOVER.md)



**Owner route:** this registry entry → [`SCN-PH-RECOVER`](scenarios/SCN-PH-RECOVER.md) → focused implementation/test owners linked from that Scenario.