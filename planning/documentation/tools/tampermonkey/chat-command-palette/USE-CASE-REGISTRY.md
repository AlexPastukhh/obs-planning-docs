# OBS Planning Helper Use-Case Registry

Status: active canonical application semantic registry
Version: v1.0.0 / Planning Helper `0.24.0`
Scope: independently useful current Planning Helper user outcomes. This registry owns application Use-Case identity; it does not own planning-command meaning or helper-library file format.

Semantic map: [`USE-CASE-MAP.md`](USE-CASE-MAP.md)

Application entry: [`README.md`](README.md)

## 1. Registry rules

- Canonical Planning Helper Use Cases use the `UC-PH-*` namespace.
- A button, startup phase, setting, storage key, API call or runtime module does not receive a UC ID merely because it exists.
- One Use Case may accept different entity kinds when the trigger/result/boundary are the same.
- Planning-command meaning remains owned by `planning/commands/*.command.md`.
- Helper command/prompt repository format remains owned by [`planning/helper-library/README.md`](../../../../helper-library/README.md).
- Exact behavior, relationships and docs → code → tests → acceptance traceability live in [`USE-CASE-MAP.md`](USE-CASE-MAP.md).

## 2. Current registry

| Use-Case ID | Semantic name | Current status | Trigger/input | Successful user result | Canonical traceability |
|---|---|---|---|---|---|
| `UC-PH-DISCOVER` | Find And Inspect Planning Helper Content | current prototype | open helper, choose a surface, search/browse | requested current local/projection item is discoverable and inspectable without repository I/O | [`USE-CASE-MAP.md#uc-ph-discover`](USE-CASE-MAP.md#uc-ph-discover) |
| `UC-PH-USE` | Use Helper Content In ChatGPT | current prototype; browser acceptance required | select Copy/Insert/Full/refinement for an available item | exact selected text is copied and/or inserted into the ChatGPT composer without repository I/O | [`USE-CASE-MAP.md#uc-ph-use`](USE-CASE-MAP.md#uc-ph-use) |
| `UC-PH-MANAGE-LOCAL` | Manage Local Helper Content | current prototype; browser acceptance required | create/edit/save/delete a helper command or prompt | normalized helper content is created/updated/deleted in local snapshot/RAM only | [`USE-CASE-MAP.md#uc-ph-manage-local`](USE-CASE-MAP.md#uc-ph-manage-local) |
| `UC-PH-IMPORT` | Import Helper Content From ChatGPT | current prototype; browser acceptance required | paste supported command/helper marker blocks into Import from ChatGPT | parsed records are merged into local state without GitHub I/O | [`USE-CASE-MAP.md#uc-ph-import`](USE-CASE-MAP.md#uc-ph-import) |
| `UC-PH-CHECK-REPOSITORY` | Inspect Local And Repository Inventory | current prototype; real-GitHub acceptance required | explicit `Check GitHub` | user receives a read-only same-path/local-only/GitHub-only inventory and known-SHA-change diagnostics | [`USE-CASE-MAP.md#uc-ph-check-repository`](USE-CASE-MAP.md#uc-ph-check-repository) |
| `UC-PH-SYNC` | Bring Missing Repository Content Into Local State | current prototype; real-GitHub acceptance required | explicit `Sync missing` | repository-only supported records are validated and added locally without overwriting same-path local records | [`USE-CASE-MAP.md#uc-ph-sync`](USE-CASE-MAP.md#uc-ph-sync) |
| `UC-PH-PUBLISH` | Publish One Local Helper Entity To Repository | current prototype; real-GitHub acceptance required | per-row explicit `Save GitHub` | one deterministic repository target is created/no-op verified/SHA-updated with exact read-back, while local verification metadata is updated when local persistence succeeds | [`USE-CASE-MAP.md#uc-ph-publish`](USE-CASE-MAP.md#uc-ph-publish) |
| `UC-PH-RECOVER` | Recover Repository-Backed Local State From Pasted Evidence | current prototype; browser acceptance required | `Restore from GitHub copy` with a complete supported marker set | repository-backed local records are reconciled to pasted evidence while local-only unbacked records are preserved, with zero helper-side GitHub requests | [`USE-CASE-MAP.md#uc-ph-recover`](USE-CASE-MAP.md#uc-ph-recover) |

## 3. Supporting capabilities without separate UC IDs

These are important but are not independently useful current outcomes:

- warm startup/migration/materialization — enabling path for `UC-PH-DISCOVER` and the local-state UCs;
- Repository settings/token — configuration for `UC-PH-CHECK-REPOSITORY`, `UC-PH-SYNC` and `UC-PH-PUBLISH`;
- local Delete — operation inside `UC-PH-MANAGE-LOCAL`;
- repository-operation lock — concurrency infrastructure for explicit repository actions;
- GitHub Contents API, remote SHA and exact read-back — implementation mechanisms of repository UCs;
- Orientation / Directions / Use Cases tabs — read-only planning semantic projections used through `UC-PH-DISCOVER` / `UC-PH-USE`, not Planning Helper application UC authority.
