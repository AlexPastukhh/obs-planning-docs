# SCN-STL-COPY-TRUSTED-PROJECT — Open a trusted-location copy of a project

Status: current realized Scenario owner for repository version 0.15.0 with
automated journey-segment coverage. Live ChatGPT/Tampermonkey/VS Code and
Workspace Trust observation remains pending. Materialized from
[EVO-STL-TRUSTED-PROJECT-COPY](../evolution/realized/trusted-project-copy.md).

## RU-SCEN-01 — Journey Composition

**Methodology:** [RU-SCEN-01 Unit Definition](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#ru-scen-01-processing-envelope), [Journey Shape](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#journey-shape).

Scenario ID: `SCN-STL-COPY-TRUSTED-PROJECT`.

Actor/context: a user in ChatGPT has reviewed a downloaded project folder or
ZIP and wants a separate working copy below a machine-configured parent that
the user may independently choose to trust in VS Code.

Participating owners/parties:

- [trusted-project-copy Feature](../features/copy-trusted-project.md);
- [ProjectSelector Domain](../domain/local-project-selector.md) for exact source
  identity and [prepared project handoff Shared capability](../shared/prepared-project-handoff.md)
  for source-arrival waiting and browser-to-owner handoff used by the
  trusted-copy Feature;
- [ChatGPT launcher Screen](../screens/chatgpt-launcher-widget.md);
- browser/OS external-protocol handling, VS Code modal interaction and VS Code
  Workspace Trust.

Benefit reference: [`AB-STL-03 — Publish under a chosen
parent`](../application-definition.md#ab-stl-03--publish-under-a-chosen-parent),
especially its [application-owned publication
boundary](../application-definition.md#ab-stl-03-boundary-owned-publication),
[destination-authority
constraint](../application-definition.md#ab-stl-03-constraint-destination-authority),
[source-preservation
constraint](../application-definition.md#ab-stl-03-constraint-source-preservation)
and [trust-neutrality
constraint](../application-definition.md#ab-stl-03-constraint-trust-neutrality).

### Journey Path

| Scenario Path Step | Actor / application interaction | Feature / participant | Data/result | Benefit manifestation / closure | Attached SR | QRPE / Examples |
|---|---|---|---|---|---|---|
| <a id="sps-stl-trust-01"></a>`SPS-STL-TRUST-01 — Supply one project selector` | ChatGPT emits one project name/relative path or one absolute local selector; the user copies it. | External producer / user | Plain selector text; `.zip` optional | Benefit not yet manifested | [`SR-STL-TRUST-01`](#sr-stl-trust-01) | No destination, trust flag or extension URI is required from ChatGPT. |
| <a id="sps-stl-trust-02"></a>`SPS-STL-TRUST-02 — Invoke trusted-copy opening` | The user selects **Скопировать в доверенные · открыть**; the Screen combines the copied selector with saved source-root/wait preferences while the destination remains machine-configured in VS Code. | [Screen](../screens/chatgpt-launcher-widget.md); user | [`FDO-STL-PROJECT-OPEN-REQUEST`](../features/open-local-project.md#fdo-stl-project-open-request) plus trusted-copy action identity | Benefit not yet manifested | [`SR-STL-TRUST-01`](#sr-stl-trust-01), [`SR-STL-TRUST-02`](#sr-stl-trust-02) | Browser input cannot override the destination parent or trust policy. |
| <a id="sps-stl-trust-03"></a>`SPS-STL-TRUST-03 — Await and prepare the exact source` | The application checks or boundedly awaits the folder/ZIP and prepares one correlated launch only after discovery while ChatGPT remains foreground. | [Trusted-copy source step](../features/copy-trusted-project.md#fbs-stl-trust-01); [ProjectSelector Domain](../domain/local-project-selector.md); [prepared handoff Shared capability](../shared/prepared-project-handoff.md) | Eligible resolved source and opaque prepared authority, or truthful rejection/timeout | Benefit not yet manifested | [`SR-STL-TRUST-01`](#sr-stl-trust-01), [`SR-STL-TRUST-03`](#sr-stl-trust-03) | Collision or I/O failure does not masquerade as waiting. |
| <a id="sps-stl-trust-04"></a>`SPS-STL-TRUST-04 — Cross into the owning VS Code window` | The browser invokes the token-only focus link; browser/OS may confirm the protocol, and VS Code establishes the owning-window handoff before single redemption. | Browser/OS; [trusted-copy Feature](../features/copy-trusted-project.md#fbs-stl-trust-01); [prepared handoff Shared capability](../shared/prepared-project-handoff.md); VS Code | Acknowledged single-use authority or visible recoverable handoff failure | Benefit not yet manifested | [`SR-STL-TRUST-01`](#sr-stl-trust-01), [`SR-STL-TRUST-03`](#sr-stl-trust-03) | Retry/copy controls preserve the same prepared operation without exposing project data in the URI. |
| <a id="sps-stl-trust-05"></a>`SPS-STL-TRUST-05 — Establish destination and publication decision` | VS Code derives the child below its configured parent. An existing safe child proceeds unchanged; an absent child requires the user to confirm the displayed canonical source, destination and trust warning. | [Destination step](../features/copy-trusted-project.md#fbs-stl-trust-02) and [decision step](../features/copy-trusted-project.md#fbs-stl-trust-03); user | [`FDO-STL-TRUSTED-DESTINATION`](../features/copy-trusted-project.md#fdo-stl-trusted-destination) and confirm/cancel decision where applicable | Benefit not yet manifested; cancellation closes without publication | [`SR-STL-TRUST-02`](#sr-stl-trust-02), [`SR-STL-TRUST-03`](#sr-stl-trust-03) | Safe existing-child reuse skips the copy-specific confirmation because no publication occurs. |
| <a id="sps-stl-trust-06"></a>`SPS-STL-TRUST-06 — Reuse or publish and open the child` | VS Code leaves a safe-existing child unchanged or publishes a complete folder/ZIP-derived child, then hands that final directory to a forced project window. | [Publication step](../features/copy-trusted-project.md#fbs-stl-trust-04) and [window step](../features/copy-trusted-project.md#fbs-stl-trust-05); VS Code | [`FDO-STL-TRUSTED-PROJECT-OUTCOME`](../features/copy-trusted-project.md#fdo-stl-trusted-project-outcome) | [`AB-STL-03`](../application-definition.md#ab-stl-03--publish-under-a-chosen-parent) manifests on `opened`; retained path remains visible after window failure | [`SR-STL-TRUST-02`](#sr-stl-trust-02), [`SR-STL-TRUST-03`](#sr-stl-trust-03) | The source remains intact; no merge, overwrite or automatic trust grant occurs. |
| <a id="sps-stl-trust-07"></a>`SPS-STL-TRUST-07 — Continue in the final child` | The user continues in the resulting project window and observes VS Code's actual Workspace Trust state, or acts on a truthful cancellation/rejection/failure. | User; VS Code Workspace Trust | Final child context and visible terminal result | Journey closes for this invocation | [`SR-STL-TRUST-03`](#sr-stl-trust-03) | Parent trust configuration and final foreground placement remain user/host-owned. |

### Scenario Requirements

| Scenario Requirement | Type | Plain required interaction/journey meaning | QRPE / Examples |
|---|---|---|---|
| <a id="sr-stl-trust-01"></a>`SR-STL-TRUST-01 — Preserve source and action correlation` | Continuity, Identity, Authority | The copied selector, trusted-copy action, resolved source, prepared authority and redeemed operation must remain one journey; the browser may supply neither destination authority nor a trust decision. | References Feature authority mechanics instead of restating token implementation. |
| <a id="sr-stl-trust-02"></a>`SR-STL-TRUST-02 — Keep publication authority locally visible` | User Decision, Visibility | Before an absent child can be published, the owning VS Code interaction must show the actual canonical source and destination and obtain explicit confirmation; safe-existing reuse must remain visibly no-copy. | A browser-side click alone never authorizes filesystem publication. |
| <a id="sr-stl-trust-03"></a>`SR-STL-TRUST-03 — Preserve recoverable project continuity` | Continuity, Safety, Visibility | The source and prior workspace remain available; deferred handoff is recoverable; the result identifies the retained/reused child when material and never equates opening by location with granting Workspace Trust or guaranteed foreground. | Covers the complete cross-system journey rather than one Feature implementation branch. |

E2E Proof Intent: install the current VSIX and local userscript; exercise folder
and ZIP sources through ChatGPT for absent, safe-existing, cancelled, unsafe
occupied-child and window-failure outcomes; verify canonical confirmation,
source preservation, final child/window, browser result and actual Workspace
Trust UI.

## RU-SCEN-02 — Evolution Impact

**Methodology:** [RU-SCEN-02 Unit Definition](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#ru-scen-02--evolution-impact).

The selected
[EVO-STL-CLOSE-SUPERSEDED-PROJECT-WINDOWS](../evolution/unrealized/close-superseded-project-windows.md)
contains a replacement Target Scenario Body for this journey. After successful
current-project opening, the future suffix reads the succession declaration
from the final published or safely reused child and may offer bounded cleanup
of explicitly eligible previous windows. Cleanup remains separately confirmed
and cannot authorize publication, change Workspace Trust or redefine the final
child. Until realization/materialization, the Journey Path above remains
current.

## RU-SCEN-03 — Journey Realization Concerns

**Methodology:** [RU-SCEN-03 Unit Definition](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#ru-scen-03--journey-realization-concerns).

Current journey-wide concern: browser protocol confirmation, coordinator-owner
selection, VS Code modal placement, new-window selection and Workspace Trust
UI cross external authority boundaries. The canonical
[`P-STL-HANDOFF-01`](../shared/prepared-project-handoff.md#p-stl-handoff-01) is
only referenced here; Scenario proof must demonstrate the complete visible
handoff without duplicating that Shared implementation concern.
The real-subject plan/result is owned by
[`PTEST-STL-INSTALLED-HANDOFF`](../practical-tests/installed-browser-vscode-handoff.md).
