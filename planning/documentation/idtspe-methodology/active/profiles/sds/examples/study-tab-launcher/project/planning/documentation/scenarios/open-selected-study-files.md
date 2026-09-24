# SCN-STL-OPEN-LINKED-FILE-CONTEXT — Invoke a prepared file-context handoff

Status: current realized Scenario owner with automated adapter/Feature segment
coverage. Live browser-to-VS Code and dirty-editor observation remains pending.

## RU-SCEN-01 — Journey Composition

**Methodology:** [RU-SCEN-01 Unit Definition](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#ru-scen-01-processing-envelope), [Journey Shape](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#journey-shape).

Scenario ID: `SCN-STL-OPEN-LINKED-FILE-CONTEXT`.

Actor/context: a user in ChatGPT or another link-producing surface already has
one local file or an ordered file set selected and wants that context visible
in a compatible VS Code window.

Participating owners/parties:

- [file-context Feature](../features/open-linked-file-context.md);
- [ChatGPT launcher Screen](../screens/chatgpt-launcher-widget.md);
- external producer/chat, browser clipboard and protocol confirmation;
- VS Code and the operating system.

Benefit reference: [`AB-STL-01 — Open selected file
context`](../application-definition.md#ab-stl-01--open-selected-file-context),
especially its [application-owned handoff
boundary](../application-definition.md#ab-stl-01-boundary-owned-handoff),
[explicit-selection
constraint](../application-definition.md#ab-stl-01-constraint-explicit-selection)
and [external-authority
boundary](../application-definition.md#ab-stl-01-boundary-external-authority).

### Journey Path

| Scenario Path Step | Actor / application interaction | Feature / participant | Data/result | Benefit manifestation / closure | Attached SR | QRPE / Examples |
|---|---|---|---|---|---|---|
| <a id="sps-stl-file-01"></a>`SPS-STL-FILE-01 — Prepare selected path text` | The external producer emits one absolute local path or one path per line in selected order; the user copies the intended text. | External producer / user | Plain path text; no route, command, tab policy or JSON | Benefit not yet manifested | [`SR-STL-FILE-01`](#sr-stl-file-01) | The producer need not know extension URI syntax. |
| <a id="sps-stl-file-02"></a>`SPS-STL-FILE-02 — Select the file-context action` | The user invokes one/add, one/close-others, group/add or group/close-others; when clipboard reading is denied, the Screen accepts explicit inline paste. | [Screen](../screens/chatgpt-launcher-widget.md); user | Paths plus action-selected cardinality/policy | Benefit not yet manifested | [`SR-STL-FILE-01`](#sr-stl-file-01), [`SR-STL-FILE-02`](#sr-stl-file-02) | A blocking browser prompt is not part of the journey. |
| <a id="sps-stl-file-03"></a>`SPS-STL-FILE-03 — Hand the request to VS Code` | The adapter preserves target membership/order, constructs the declared Feature request and invokes the extension URI; browser/OS may request external-protocol confirmation. | Screen adapter; browser/OS; VS Code URI routing | [`FDO-STL-FILE-OPEN-REQUEST`](../features/open-linked-file-context.md#fdo-stl-file-open-request) or [`FDO-STL-FILE-SET-OPEN-REQUEST`](../features/open-linked-file-context.md#fdo-stl-file-set-open-request) | Benefit not yet manifested | [`SR-STL-FILE-01`](#sr-stl-file-01), [`SR-STL-FILE-03`](#sr-stl-file-03) | A prepared retry/copy affordance remains when automatic protocol launch is suppressed. |
| <a id="sps-stl-file-04"></a>`SPS-STL-FILE-04 — Establish the file context` | The receiving VS Code instance executes the referenced Feature and presents its actual outcome. | [Feature Main Path](../features/open-linked-file-context.md#fbs-stl-file-01); VS Code | [`FDO-STL-FILE-OPEN-OUTCOME`](../features/open-linked-file-context.md#fdo-stl-file-open-outcome) | [`AB-STL-01`](../application-definition.md#ab-stl-01--open-selected-file-context) manifests on `opened`; non-success remains visible | [`SR-STL-FILE-03`](#sr-stl-file-03) | Dirty-editor prompts and editor associations remain VS Code-owned. |
| <a id="sps-stl-file-05"></a>`SPS-STL-FILE-05 — Continue work from the selected context` | The user continues study/work with the first requested target visible and the complete ordered context available, or corrects/retries a visible non-success. | User; VS Code; external study context | Opened context or actionable non-success | Journey closes for this invocation | [`SR-STL-FILE-02`](#sr-stl-file-02), [`SR-STL-FILE-03`](#sr-stl-file-03) | The launcher does not update external study/planning state. |

### Scenario Requirements

| Scenario Requirement | Type | Plain required interaction/journey meaning | QRPE / Examples |
|---|---|---|---|
| <a id="sr-stl-file-01"></a>`SR-STL-FILE-01 — Preserve selection continuity` | Continuity, Order | Target membership/order selected by the producer must survive copy/paste, action selection and request formation without being inferred or reordered by the adapter. | Example: a three-line group reaches the Feature in the same order. |
| <a id="sr-stl-file-02"></a>`SR-STL-FILE-02 — Keep local effects explicitly user-initiated` | User Decision, Authority | Preparation/copying alone has no local effect; the user's selected Screen action initiates the handoff and supplies cardinality/policy. | Protects the external-to-local authority boundary. |
| <a id="sr-stl-file-03"></a>`SR-STL-FILE-03 — Keep handoff status recoverable and truthful` | Visibility, Continuity | If clipboard or external-protocol automation is blocked, the journey retains an explicit paste/retry/copy path and never presents preparation as completed file opening. | Live browser policy remains external evidence. |

E2E Proof Intent: from a real ChatGPT tab, exercise one path and an ordered
set through all four actions; observe request continuity, protocol handling,
receiving-window foreground, dirty cancellation and truthful terminal status.

## RU-SCEN-02 — Evolution Impact

**Methodology:** [RU-SCEN-02 Unit Definition](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#ru-scen-02--evolution-impact).

Disposition: `OMITTED`.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md)
changes project-window journeys only and does not affect this file-context
journey composition.

## RU-SCEN-03 — Journey Realization Concerns

**Methodology:** [RU-SCEN-03 Unit Definition](../../../../../../target-modules/TM-SCENARIO-PLANNING.md#ru-scen-03--journey-realization-concerns).

Current journey-wide concern: browser clipboard permission, external-protocol
confirmation, VS Code topmost-window routing and Windows foreground policy
cross independently owned systems. Automated Feature/adapter proof cannot by
itself establish the complete visible handoff. Live proof must correlate the
same requested context across those boundaries without treating host focus
limitations as Feature success.
The real-subject plan/result is owned by
[`PTEST-STL-INSTALLED-HANDOFF`](../practical-tests/installed-browser-vscode-handoff.md).
