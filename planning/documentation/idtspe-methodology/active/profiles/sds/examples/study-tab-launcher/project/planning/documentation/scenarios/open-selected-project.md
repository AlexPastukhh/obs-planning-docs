# SCN-STL-OPEN-SELECTED-PROJECT — Open one copied project selector

Status: current realized Scenario owner for repository version 0.15.0 with
automated journey-segment coverage. Live browser/VS Code multi-window evidence
remains pending.

## RU-SCEN-01 — Journey Composition

**Methodology:** [RU-SCEN-01 Unit Definition](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#ru-scen-01-processing-envelope), [Journey Shape](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#journey-shape).

Scenario ID: `SCN-STL-OPEN-SELECTED-PROJECT`.

Actor/context: a user in ChatGPT has or expects one downloaded project folder
or ZIP and wants to open it without remembering extraction state or requiring
the `.zip` suffix.

Participating owners/parties:

- [adaptive project Feature](../features/open-local-project.md);
- [folder Feature](../features/open-linked-folder-window.md) and
  [archive Feature](../features/extract-open-archive.md) as selected branches;
- [ChatGPT launcher Screen](../screens/chatgpt-launcher-widget.md);
- browser/OS external-protocol handling and VS Code project windows.

Benefit reference: [`AB-STL-02 — Open a local project
source`](../application-definition.md#ab-stl-02--open-a-local-project-source),
including its [selector-continuity
contribution](../application-definition.md#ab-stl-02-boundary-selector-resolution),
[folder](../application-definition.md#ab-stl-02-boundary-folder-branch) and
[archive](../application-definition.md#ab-stl-02-boundary-archive-branch)
branches, [exact bounded discovery
constraint](../application-definition.md#ab-stl-02-constraint-exact-bounded-discovery)
and [safe-project-effect
constraint](../application-definition.md#ab-stl-02-constraint-safe-project-effect).

### Journey Path

| Scenario Path Step | Actor / application interaction | Feature / participant | Data/result | Benefit manifestation / closure | Attached SR | QRPE / Examples |
|---|---|---|---|---|---|---|
| <a id="sps-stl-project-01"></a>`SPS-STL-PROJECT-01 — Supply one project selector` | ChatGPT emits one project name/relative path or one absolute local selector; the user copies it. | External producer / user | Plain selector text; `.zip` optional | Benefit not yet manifested | [`SR-STL-PROJECT-01`](#sr-stl-project-01) | No extension URI or source-type flag is required. |
| <a id="sps-stl-project-02"></a>`SPS-STL-PROJECT-02 — Invoke adaptive project opening` | The user selects **Папка / ZIP · открыть**; the Screen combines the copied value with the saved root and wait preference. | [Screen](../screens/chatgpt-launcher-widget.md); user | [`FDO-STL-PROJECT-OPEN-REQUEST`](../features/open-local-project.md#fdo-stl-project-open-request) | Benefit not yet manifested | [`SR-STL-PROJECT-01`](#sr-stl-project-01), [`SR-STL-PROJECT-02`](#sr-stl-project-02) | The browser cannot inspect the local filesystem. |
| <a id="sps-stl-project-03"></a>`SPS-STL-PROJECT-03 — Remain in ChatGPT while the source is awaited` | The application checks immediately and, when configured, waits for pure absence while the browser stays foreground; discovery prepares one correlated launch. | [Project source-resolution step](../features/open-local-project.md#fbs-stl-project-02) and [preparation step](../features/open-local-project.md#fbs-stl-project-03) | Source-found preparation or visible timeout/rejection | Benefit not yet manifested | [`SR-STL-PROJECT-02`](#sr-stl-project-02) | Collision/I/O failure does not masquerade as waiting. |
| <a id="sps-stl-project-04"></a>`SPS-STL-PROJECT-04 — Cross the browser-to-VS Code boundary` | Once found, the browser invokes the prepared token-only focus link; browser/OS may confirm the external protocol, and VS Code establishes the owning-window handoff before single redemption. | Browser/OS; [focus-transfer step](../features/open-local-project.md#fbs-stl-project-04) and [redemption step](../features/open-local-project.md#fbs-stl-project-05); VS Code | [`FDO-STL-PREPARED-PROJECT-LAUNCH`](../features/open-local-project.md#fdo-stl-prepared-project-launch) | Benefit not yet manifested | [`SR-STL-PROJECT-01`](#sr-stl-project-01), [`SR-STL-PROJECT-02`](#sr-stl-project-02) | Prepared retry/copy controls preserve recoverability. |
| <a id="sps-stl-project-05"></a>`SPS-STL-PROJECT-05 — Open the selected project branch` | The acknowledged operation opens the directory or safely reuses/extracts the ZIP destination under project-window policy and returns the actual result. | [Project execution step](../features/open-local-project.md#fbs-stl-project-06); folder/archive branch Feature; VS Code | [`FDO-STL-PROJECT-OPEN-OUTCOME`](../features/open-local-project.md#fdo-stl-project-open-outcome) | [`AB-STL-02`](../application-definition.md#ab-stl-02--open-a-local-project-source) manifests on `opened`; non-success remains visible | [`SR-STL-PROJECT-03`](#sr-stl-project-03) | Workspace Trust remains user/VS Code-owned. |
| <a id="sps-stl-project-06"></a>`SPS-STL-PROJECT-06 — Continue in the project window` | The user continues in the selected/new project window while the previous workspace remains available, or corrects/retries a truthful non-success. | User; VS Code | Opened project context or actionable result | Journey closes for this invocation | [`SR-STL-PROJECT-03`](#sr-stl-project-03) | Final foreground/placement is host-owned. |

### Scenario Requirements

| Scenario Requirement | Type | Plain required interaction/journey meaning | QRPE / Examples |
|---|---|---|---|
| <a id="sr-stl-project-01"></a>`SR-STL-PROJECT-01 — Preserve selected-project correlation` | Continuity, Identity | The copied selector, action-created request, prepared authority and redeemed operation must remain one correlated journey; no intermediate participant may substitute another project. | References Feature authority requirements rather than redefining token mechanics. |
| <a id="sr-stl-project-02"></a>`SR-STL-PROJECT-02 — Preserve recoverable deferred handoff` | Continuity, Visibility | While the source is absent the user remains in browser context; after discovery, blocked protocol automation retains explicit retry/copy state and never claims that VS Code completed the operation. | Covers the browser/application boundary, not polling implementation. |
| <a id="sr-stl-project-03"></a>`SR-STL-PROJECT-03 — Preserve project-window continuity` | Continuity, Visibility | The journey leaves the previous workspace available, identifies the resulting project branch/outcome and does not equate command acceptance with guaranteed OS foreground or Workspace Trust. | Existing and newly created target windows both need live observation. |

E2E Proof Intent: exercise ready folder, extensionless ZIP, explicit ZIP,
delayed arrival, timeout, exact collision, existing destination and foreground
behavior through a real ChatGPT/Tampermonkey/installed-VS Code journey.

## RU-SCEN-02 — Evolution Impact

**Methodology:** [RU-SCEN-02 Unit Definition](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#ru-scen-02--evolution-impact).

The selected
[EVO-STL-CLOSE-SUPERSEDED-PROJECT-WINDOWS](../evolution/unrealized/close-superseded-project-windows.md)
contains a replacement Target Scenario Body for this journey. After successful
current-project opening, the future suffix reads the final root's declaration,
offers exact eligible previous windows in VS Code and performs only explicitly
confirmed bounded cleanup. Until realization/materialization, the Journey Path
above remains current.

## RU-SCEN-03 — Journey Realization Concerns

**Methodology:** [RU-SCEN-03 Unit Definition](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#ru-scen-03--journey-realization-concerns).

Current journey-wide concern: browser protocol confirmation, Windows
foreground policy and VS Code existing/new-window selection cross external
authority boundaries. The canonical
[`P-STL-HANDOFF-01`](../shared/prepared-project-handoff.md#p-stl-handoff-01) is
only referenced here; Scenario proof must demonstrate the complete visible
handoff without duplicating that Shared implementation concern.
The real-subject plan/result is owned by
[`PTEST-STL-INSTALLED-HANDOFF`](../practical-tests/installed-browser-vscode-handoff.md).
