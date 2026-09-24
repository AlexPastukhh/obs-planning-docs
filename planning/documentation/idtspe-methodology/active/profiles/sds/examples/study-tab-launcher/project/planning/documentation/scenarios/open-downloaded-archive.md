# SCN-STL-OPEN-DOWNLOADED-ARCHIVE — Open a copied ZIP project selector

Status: current realized Scenario owner with automated extraction/journey
segment coverage. Complete installed browser/VS Code evidence remains pending.

## RU-SCEN-01 — Journey Composition

**Methodology:** [RU-SCEN-01 Unit Definition](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#ru-scen-01-processing-envelope), [Journey Shape](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#journey-shape).

Scenario ID: `SCN-STL-OPEN-DOWNLOADED-ARCHIVE`.

Actor/context: a user in ChatGPT has or expects one downloaded project ZIP and
wants its usable project directory safely materialized and opened without
manually extracting it or necessarily typing `.zip`.

Participating owners/parties:

- [adaptive project Feature](../features/open-local-project.md);
- [archive Feature](../features/extract-open-archive.md);
- [ChatGPT launcher Screen](../screens/chatgpt-launcher-widget.md);
- local filesystem, browser/OS external protocol and VS Code project windows.

Benefit reference: the [selector-continuity
contribution](../application-definition.md#ab-stl-02-boundary-selector-resolution)
and [archive
branch](../application-definition.md#ab-stl-02-boundary-archive-branch) of
[`AB-STL-02 — Open a local project
source`](../application-definition.md#ab-stl-02--open-a-local-project-source),
under its [exact bounded discovery
constraint](../application-definition.md#ab-stl-02-constraint-exact-bounded-discovery)
and [safe-project-effect
constraint](../application-definition.md#ab-stl-02-constraint-safe-project-effect).

### Journey Path

| Scenario Path Step | Actor / application interaction | Feature / participant | Data/result | Benefit manifestation / closure | Attached SR | QRPE / Examples |
|---|---|---|---|---|---|---|
| <a id="sps-stl-archive-01"></a>`SPS-STL-ARCHIVE-01 — Supply one archive selector` | ChatGPT emits a ZIP stem/name/relative path under the configured root or an absolute ZIP path; the user copies it. | External producer / user | Plain selector text; `.zip` optional | Benefit not yet manifested | [`SR-STL-ARCHIVE-01`](#sr-stl-archive-01) | No extraction destination or trust flag is supplied. |
| <a id="sps-stl-archive-02"></a>`SPS-STL-ARCHIVE-02 — Invoke adaptive project opening` | The user selects **Папка / ZIP · открыть**; the Screen applies saved root/wait context. | [Screen](../screens/chatgpt-launcher-widget.md); user | [`FDO-STL-PROJECT-OPEN-REQUEST`](../features/open-local-project.md#fdo-stl-project-open-request) | Benefit not yet manifested | [`SR-STL-ARCHIVE-01`](#sr-stl-archive-01), [`SR-STL-ARCHIVE-02`](#sr-stl-archive-02) | The browser does not inspect the ZIP. |
| <a id="sps-stl-archive-03"></a>`SPS-STL-ARCHIVE-03 — Await and prepare the ZIP source` | The application checks exact/implicit ZIP candidates and polls only absence while ChatGPT remains foreground; a found ZIP produces prepared handoff authority. | [Project source-resolution step](../features/open-local-project.md#fbs-stl-project-02) and [preparation step](../features/open-local-project.md#fbs-stl-project-03) | Prepared archive-source handoff or visible non-success | Benefit not yet manifested | [`SR-STL-ARCHIVE-02`](#sr-stl-archive-02) | Unsafe/ineligible existing sources fail rather than waiting. |
| <a id="sps-stl-archive-04"></a>`SPS-STL-ARCHIVE-04 — Cross into VS Code` | Browser/OS protocol handling activates VS Code and establishes coordinator-owner continuity before single redemption. | Browser/OS; [focus-transfer step](../features/open-local-project.md#fbs-stl-project-04) and [redemption step](../features/open-local-project.md#fbs-stl-project-05); VS Code | [`FDO-STL-PREPARED-PROJECT-LAUNCH`](../features/open-local-project.md#fdo-stl-prepared-project-launch) | Benefit not yet manifested | [`SR-STL-ARCHIVE-01`](#sr-stl-archive-01), [`SR-STL-ARCHIVE-02`](#sr-stl-archive-02) | Retry/copy remains available if automatic protocol launch is blocked. |
| <a id="sps-stl-archive-05"></a>`SPS-STL-ARCHIVE-05 — Materialize and open the project directory` | The archive branch reuses an existing sibling unchanged or safely stages/publishes extraction, then hands the final directory to VS Code. | [Archive Main Path](../features/extract-open-archive.md#fbs-stl-archive-01); filesystem; VS Code | [`FDO-STL-ARCHIVE-OPEN-OUTCOME`](../features/extract-open-archive.md#fdo-stl-archive-open-outcome) composed into project outcome | The [`AB-STL-02` archive contribution](../application-definition.md#ab-stl-02-boundary-archive-branch) manifests on `opened` | [`SR-STL-ARCHIVE-03`](#sr-stl-archive-03) | Source ZIP remains intact; Workspace Trust is unchanged. |
| <a id="sps-stl-archive-06"></a>`SPS-STL-ARCHIVE-06 — Continue in the archive project` | The user continues in the opened/reused project window or corrects/retries a visible safety, extraction or handoff error. | User; VS Code | Project context or actionable non-success | Journey closes for this invocation | [`SR-STL-ARCHIVE-03`](#sr-stl-archive-03) | Extraction disposition remains visible. |

### Scenario Requirements

| Scenario Requirement | Type | Plain required interaction/journey meaning | QRPE / Examples |
|---|---|---|---|
| <a id="sr-stl-archive-01"></a>`SR-STL-ARCHIVE-01 — Preserve archive-selector correlation` | Continuity, Identity | The copied selector, prepared authority, selected ZIP and final project outcome remain one correlated journey without destination/source substitution. | The Feature owners remain canonical for candidate and extraction rules. |
| <a id="sr-stl-archive-02"></a>`SR-STL-ARCHIVE-02 — Keep delayed archive handoff recoverable` | Continuity, Visibility | Waiting occurs without premature application switching; blocked protocol automation retains retry/copy state and never claims extraction/opening completed. | Covers external journey continuity, not coordinator internals. |
| <a id="sr-stl-archive-03"></a>`SR-STL-ARCHIVE-03 — Preserve source and project-window continuity` | Safety, Continuity | The journey leaves the source ZIP and previous workspace available, exposes extracted versus reused outcome and leaves Workspace Trust/final placement to VS Code and the user. | Reused destination is not refreshed from the ZIP. |

E2E Proof Intent: exercise extensionless and explicit ZIP selectors through
immediate/delayed arrival, extraction, wrapper flattening, safe reuse, unsafe
entry, resource limit, destination conflict and final project-window behavior.

## RU-SCEN-02 — Evolution Impact

**Methodology:** [RU-SCEN-02 Unit Definition](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#ru-scen-02--evolution-impact).

The selected
[EVO-STL-CLOSE-SUPERSEDED-PROJECT-WINDOWS](../evolution/unrealized/close-superseded-project-windows.md)
contains a replacement Target Scenario Body. Its future suffix reads succession
metadata from the actual reused/extracted final root after successful open and
never overwrites a reused destination to refresh that metadata. Current Journey
Path remains authoritative until realization/materialization.

## RU-SCEN-03 — Journey Realization Concerns

**Methodology:** [RU-SCEN-03 Unit Definition](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#ru-scen-03--journey-realization-concerns).

Current journey-wide concern: whole-path proof must correlate browser selector,
prepared handoff, filesystem publication/reuse and final VS Code presentation.
Automated extraction proof cannot establish browser confirmation, Windows
foreground or Workspace Trust UI; those require live installed observation.
The real-subject plan/result is owned by
[`PTEST-STL-INSTALLED-HANDOFF`](../practical-tests/installed-browser-vscode-handoff.md).
