# SCN-STL-OPEN-SELECTED-FOLDER — Open a copied folder as a project window

Status: current realized Scenario owner with automated/direct-route evidence.
The full browser-to-installed-VS Code journey remains live evidence.

## RU-SCEN-01 — Journey Composition

**Methodology:** [RU-SCEN-01 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#ru-scen-01-processing-envelope), [Journey Shape](../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#journey-shape).

Scenario ID: `SCN-STL-OPEN-SELECTED-FOLDER`.

Actor/context: a user in ChatGPT knows or expects one local project directory
and wants to continue in that project without navigating to it manually.

Participating owners/parties:

- [adaptive project Feature](../features/open-local-project.md);
- [folder Feature](../features/open-linked-folder-window.md);
- [ChatGPT launcher Screen](../screens/chatgpt-launcher-widget.md);
- browser/OS external-protocol handling and VS Code project windows.

Benefit reference: the [selector-continuity
contribution](../application-definition.md#ab-stl-02-boundary-selector-resolution)
and [folder
branch](../application-definition.md#ab-stl-02-boundary-folder-branch) of
[`AB-STL-02 — Open a local project
source`](../application-definition.md#ab-stl-02--open-a-local-project-source),
under its [exact bounded discovery
constraint](../application-definition.md#ab-stl-02-constraint-exact-bounded-discovery)
and [safe-project-effect
constraint](../application-definition.md#ab-stl-02-constraint-safe-project-effect).

### Journey Path

| Scenario Path Step | Actor / application interaction | Feature / participant | Data/result | Benefit manifestation / closure | Attached SR | QRPE / Examples |
|---|---|---|---|---|---|---|
| <a id="sps-stl-folder-01"></a>`SPS-STL-FOLDER-01 — Supply one folder selector` | ChatGPT emits a folder name/relative path under the configured root or one absolute local directory path; the user copies it. | External producer / user | Plain selector text | Benefit not yet manifested | [`SR-STL-FOLDER-01`](#sr-stl-folder-01) | The value contains no VS Code policy. |
| <a id="sps-stl-folder-02"></a>`SPS-STL-FOLDER-02 — Invoke the adaptive action` | The user selects **Папка / ZIP · открыть**; the Screen combines the text with saved root/wait context. | [Screen](../screens/chatgpt-launcher-widget.md); user | [`FDO-STL-PROJECT-OPEN-REQUEST`](../features/open-local-project.md#fdo-stl-project-open-request) | Benefit not yet manifested | [`SR-STL-FOLDER-01`](#sr-stl-folder-01), [`SR-STL-FOLDER-02`](#sr-stl-folder-02) | Same-origin tabs share current Screen preferences. |
| <a id="sps-stl-folder-03"></a>`SPS-STL-FOLDER-03 — Await and prepare the directory source` | The application checks/polls only absence while ChatGPT stays foreground; a found directory produces prepared handoff authority. | [Project source-resolution step](../features/open-local-project.md#fbs-stl-project-02) and [preparation step](../features/open-local-project.md#fbs-stl-project-03) | Prepared folder-source handoff or visible non-success | Benefit not yet manifested | [`SR-STL-FOLDER-02`](#sr-stl-folder-02) | A regular-file collision fails rather than waiting. |
| <a id="sps-stl-folder-04"></a>`SPS-STL-FOLDER-04 — Cross into VS Code` | The browser invokes the token-only focus URI and VS Code establishes coordinator-owner continuity before single redemption. | Browser/OS; [focus-transfer step](../features/open-local-project.md#fbs-stl-project-04) and [redemption step](../features/open-local-project.md#fbs-stl-project-05); VS Code | [`FDO-STL-PREPARED-PROJECT-LAUNCH`](../features/open-local-project.md#fdo-stl-prepared-project-launch) | Benefit not yet manifested | [`SR-STL-FOLDER-01`](#sr-stl-folder-01), [`SR-STL-FOLDER-02`](#sr-stl-folder-02) | Retry/copy remains available if automatic launch is blocked. |
| <a id="sps-stl-folder-05"></a>`SPS-STL-FOLDER-05 — Open the directory project` | The folder branch validates the final directory and hands it to VS Code under forced-new-window policy. | [Folder Main Path](../features/open-linked-folder-window.md#fbs-stl-folder-01); VS Code | [`FDO-STL-FOLDER-OPEN-OUTCOME`](../features/open-linked-folder-window.md#fdo-stl-folder-open-outcome) composed into project outcome | The [`AB-STL-02` folder contribution](../application-definition.md#ab-stl-02-boundary-folder-branch) manifests on `opened` | [`SR-STL-FOLDER-03`](#sr-stl-folder-03) | Directory content is unchanged. |
| <a id="sps-stl-folder-06"></a>`SPS-STL-FOLDER-06 — Continue in the folder project` | The user continues in the selected project window while the prior workspace stays available, or corrects/retries the reported failure. | User; VS Code | Opened folder project or actionable non-success | Journey closes for this invocation | [`SR-STL-FOLDER-03`](#sr-stl-folder-03) | Final window placement/foreground remains external. |

### Scenario Requirements

| Scenario Requirement | Type | Plain required interaction/journey meaning | QRPE / Examples |
|---|---|---|---|
| <a id="sr-stl-folder-01"></a>`SR-STL-FOLDER-01 — Preserve folder-selector correlation` | Continuity, Identity | The copied folder selector, prepared authority and redeemed directory operation remain one correlated journey without source substitution. | Feature-owned selector/focus authority remains canonical. |
| <a id="sr-stl-folder-02"></a>`SR-STL-FOLDER-02 — Keep delayed-folder handoff recoverable` | Continuity, Visibility | Waiting occurs without premature application switching; blocked browser protocol automation retains explicit retry/copy state and no false completion. | Covers browser/application continuity rather than polling mechanics. |
| <a id="sr-stl-folder-03"></a>`SR-STL-FOLDER-03 — Preserve workspace continuity` | Continuity | Opening the selected folder leaves the previous workspace available and keeps file contents, Workspace Trust and final placement under their existing authorities. | Observe both new and already-open target windows. |

E2E Proof Intent: configure a search root, exercise immediate and delayed real
directories plus missing/traversal/file-collision cases, and observe selector
continuity, structured result and final foreground across the complete journey.

## RU-SCEN-02 — Evolution Impact

**Methodology:** [RU-SCEN-02 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#ru-scen-02--evolution-impact).

The selected
[EVO-STL-CLOSE-SUPERSEDED-PROJECT-WINDOWS](../evolution/unrealized/close-superseded-project-windows.md)
contains a replacement Target Scenario Body. Its future suffix runs only after
this directory project opens and may retire exact participating previous
siblings after VS Code confirmation. Current Journey Path remains authoritative
until realization/materialization.

## RU-SCEN-03 — Journey Realization Concerns

**Methodology:** [RU-SCEN-03 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md#ru-scen-03--journey-realization-concerns).

Current concern: a deterministic Feature success cannot prove visible Windows
foreground, existing-window selection or browser confirmation behavior. Live
proof must cross ChatGPT, userscript, loopback preparation, external protocol
and installed VS Code while keeping owner-local coordinator details in the
project Feature/Slice boundary.
The real-subject plan/result is owned by
[`PTEST-STL-INSTALLED-HANDOFF`](../practical-tests/installed-browser-vscode-handoff.md).
