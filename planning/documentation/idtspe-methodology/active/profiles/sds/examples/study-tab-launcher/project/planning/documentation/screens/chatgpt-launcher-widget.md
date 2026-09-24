# SCREEN-STL-CHATGPT-LAUNCHER-WIDGET — ChatGPT launcher widget

Status: current realized Screen owner for the browser userscript in repository
version 0.15.0. This document owns visible composition and interaction; Feature
and Scenario owners retain action semantics and journey meaning.

## RU-SCREEN-01 — Screen map

**Methodology:** [RU-SCREEN-01 Unit Definition](../../../../../../target-modules/TM-SCREEN.md#ru-screen-01--screen-map).

The userscript adds one floating widget to supported ChatGPT pages. It contains:

- a header that identifies the launcher and toggles collapsed/expanded state;
- a Settings control that opens the otherwise hidden configuration panel;
- four file actions: one/group × add/close-others;
- one adaptive folder/ZIP project action;
- one trusted-copy project action;
- status text plus retry and copy affordances for a prepared handoff;
- a non-modal manual-paste field when browser clipboard reading is unavailable;
- a settings panel for project search root, source-arrival wait and widget
  placement/size values.

The widget is an adapter surface. It does not display local file contents,
Workspace Trust state or arbitrary extension commands.

| Widget action / visible availability | Participating current Feature | Scenario using this Screen |
|---|---|---|
| Four file actions (one/group × add/close-others) in the expanded widget | [Open linked file context](../features/open-linked-file-context.md) | [Open selected study files](../scenarios/open-selected-study-files.md) |
| Adaptive folder/ZIP project action in the expanded widget | [Open local project](../features/open-local-project.md), with the selected [folder](../features/open-linked-folder-window.md) or [archive](../features/extract-open-archive.md) branch | [Open selected project](../scenarios/open-selected-project.md), composing the [folder](../scenarios/open-selected-folder.md) or [archive](../scenarios/open-downloaded-archive.md) journey as applicable |
| Trusted-copy project action in the expanded widget | [Copy trusted project](../features/copy-trusted-project.md) | [Copy trusted project](../scenarios/copy-trusted-project.md) |

The header/Settings controls change this Screen's visibility and layout, not
Feature behavior. Status, retry, copy and manual paste support the participating
handoff journeys after an action; their current interaction rules are below.
The selected future succession Step adds no widget action or Screen route.

## RU-SCREEN-02 — Current drafts and interaction rules

**Methodology:** [RU-SCREEN-02 Unit Definition](../../../../../../target-modules/TM-SCREEN.md#ru-screen-02--screen-draft-set).

Expanded is the normal working state. Clicking the header collapses the body;
clicking it again restores the body. The header and Settings control remain
usable without requiring a page reload. Prepared retry state survives the
collapse transition.

Settings is hidden until explicitly opened. The editable layout record has
`X`, `Y`, `Z` and `W` values for horizontal position, vertical position,
stacking order and width. Numeric drafts can be previewed without being
silently overwritten by layout measurement. Save publishes the complete valid
record; Reset restores defaults. Opening Settings and page reload both reread
the latest stored record.

Settings and collapsed state use userscript storage shared by same-origin
ChatGPT tabs. Storage-change notifications update other open tabs. Opening
Settings performs a fresh read so a tab that missed a notification still
converges. Values are clamped only to the current viewport/safe limits; a valid
requested vertical coordinate such as `300` is not replaced by the widget's
current measured position.

Clipboard denial produces an inline paste field in the widget rather than a
blocking browser prompt. Each action keeps its distinct cardinality/policy;
the copied text does not have to encode extension logic.

## RU-SCREEN-03 — Current-owner Evolution Impact

**Methodology:** [RU-SCREEN-03 Unit Definition](../../../../../../target-modules/TM-SCREEN.md#ru-screen-03--evolution-impact).

Disposition: `OMITTED`.

[EVO-STL-CLOSE-SUPERSEDED-PROJECT-WINDOWS](../evolution/unrealized/close-superseded-project-windows.md)
does not change this Screen. Supersession is declared inside a project package
and confirmation is owned by the receiving VS Code window. No new widget
button, setting or result card is selected.

## Proof and revalidation

Automated userscript tests own storage, validation, rendering and action
conversion evidence. Live proof still covers browser clipboard permissions,
same-origin multi-tab propagation, viewport clamping and external-protocol
behavior. Its real-subject plan/result is owned by
[`PTEST-STL-INSTALLED-HANDOFF`](../practical-tests/installed-browser-vscode-handoff.md).
Exact DOM/CSS structure remains implementation-native.
