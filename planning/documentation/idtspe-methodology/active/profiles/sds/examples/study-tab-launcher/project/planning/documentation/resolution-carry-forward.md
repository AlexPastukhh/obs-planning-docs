# Study Tab Launcher — Resolution Carry-Forward

Status: current navigation projection for unresolved or evidence-relevant
Q/R/P items and accepted Decisions. This file is not a semantic owner and does
not replace the linked natural owners.

## Membership contract

Include an item while it is open, blocks a selected transition or proof, needs
installed evidence, or is an accepted Decision whose loss would make current
or selected planning ambiguous. Update status here only by following the
natural owner; remove closed transient items once no selected work depends on
them. Evolution position remains owned by the
[Evolution Steps Map](evolution-steps.md).

## Open carry-forward

| Item | Kind / status | Natural owner | Carry-forward relation |
|---|---|---|---|
| [`P-STL-HANDOFF-01`](shared/prepared-project-handoff.md#p-stl-handoff-01) | Problem / `OPEN` | Prepared-project handoff Shared owner | Blocks deterministic current handoff proof and selected succession Step proof/materialization; does not block realization start. |
| [`PTEST-STL-INSTALLED-HANDOFF`](practical-tests/installed-browser-vscode-handoff.md) | Practical evidence / `OPEN` | Installed-handoff Practical Test | Current browser/Windows/VS Code foreground, modal, dirty-editor and trust evidence remains unexecuted. |
| [`PTEST-STL-PROJECT-SUCCESSION-MULTI-WINDOW`](practical-tests/project-succession-multi-window.md) | Practical evidence / `OPEN — implementation absent` | Succession Practical Test | Required after implementation and before selected Step proof/materialization. |

## Accepted Decision references

| Decision | Natural owner | Guarded boundary |
|---|---|---|
| [`DEC-STL-FILE-CONTEXT-BOUNDARY-01`](features/open-linked-file-context.md#dec-stl-file-context-boundary-01) | File-context Feature | One Feature/Slice with distinct one/set entries and action-owned tab policy. |
| [`DEC-STL-FOLDER-WINDOW-BOUNDARY-01`](features/open-linked-folder-window.md#dec-stl-folder-window-boundary-01) | Folder Feature | Separate folder project-window result and no previous-window refocus. |
| [`DEC-STL-ARCHIVE-PUBLICATION-01`](slices/extract-open-archive.md#dec-stl-archive-publication-01) | Archive Slice | Derived sibling destination and atomic no-overwrite publication/reuse. |
| [`DEC-STL-PROJECT-SELECTOR-01`](domain/local-project-selector.md#dec-stl-project-selector-01) | ProjectSelector Domain | Neutral exact selector, directory precedence and one implicit ZIP candidate. |
| [`DEC-STL-PREPARED-HANDOFF-01`](shared/prepared-project-handoff.md#dec-stl-prepared-handoff-01) | Prepared-handoff Shared owner | Token-only focus transfer, owner acknowledgement and at-most-once redemption. |
| [`DEC-STL-SUCCESSION-SHARED-BOUNDARY-01`](evolution/unrealized/close-superseded-project-windows.md#dec-stl-succession-shared-boundary-01) | Selected Evolution Step | New succession Slice owns registry/callback semantics; current handoff Shared contract is revalidated, not widened. |

