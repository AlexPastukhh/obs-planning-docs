# Scenario Catalog

Status: active application semantic registry and navigation
Scope: canonical current Planning Helper application Scenarios. Application behavior is owned directly by Scenario owners; there is no separate Application Use-Case semantic layer.

## Scenario Inventory

| Scenario | Meaningful user result / behavior owner |
|---|---|
| `SCN-PH-CHECK-REPOSITORY` — Inspect Local And Repository Inventory | [`SCN-PH-CHECK-REPOSITORY.md`](SCN-PH-CHECK-REPOSITORY.md) |
| `SCN-PH-DISCOVER` — Find And Inspect Planning Helper Content | [`SCN-PH-DISCOVER.md`](SCN-PH-DISCOVER.md) |
| `SCN-PH-IMPORT` — Import Helper Content From ChatGPT | [`SCN-PH-IMPORT.md`](SCN-PH-IMPORT.md) |
| `SCN-PH-MANAGE-LOCAL` — Manage Planning Commands And Prompts | [`SCN-PH-MANAGE-LOCAL.md`](SCN-PH-MANAGE-LOCAL.md) |
| `SCN-PH-PUBLISH` — Publish One Planning Command Or Prompt To Repository | [`SCN-PH-PUBLISH.md`](SCN-PH-PUBLISH.md) |
| `SCN-PH-RECOVER` — Recover Repository-Backed Local State From Pasted Evidence | [`SCN-PH-RECOVER.md`](SCN-PH-RECOVER.md) |
| `SCN-PH-SYNC` — Bring Repository Content Into Local State | [`SCN-PH-SYNC.md`](SCN-PH-SYNC.md) |
| `SCN-PH-USE` — Use Helper Content In ChatGPT | [`SCN-PH-USE.md`](SCN-PH-USE.md) |

## Boundary

Each Scenario owner owns its trigger/context, detailed behavior, observable result/boundaries and exact docs/source/test/manual-acceptance traceability. Buttons, APIs, modules and storage mechanisms do not become peer Scenarios merely because they are addressable.
