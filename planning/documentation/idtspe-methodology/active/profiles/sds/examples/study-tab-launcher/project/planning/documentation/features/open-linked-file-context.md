# F-STL-OPEN-LINKED-CONTEXT — Open a selected local file context

Status: current realized Feature owner with automated orchestration and
conversion coverage. Live browser/OS foreground and dirty-editor interaction
remain host evidence.

## RU-FEAT-01 — Identity / Intent / Principal Result / Semantic Entry

**Methodology:** [RU-FEAT-01 Unit Definition](../../../../../../target-modules/TM-FEATURE.md#ru-feat-01--identity--intent--principal-result--semantic-entry).

Feature ID: `F-STL-OPEN-LINKED-CONTEXT`.

Intent: expose one externally selected local file or ordered file set in a
receiving VS Code window without letting copied text choose arbitrary commands
or extension policy.

Principal result: every distinct target in one accepted request is opened in
request order under the selected tab policy, with the first target visible for
a set, or a truthful `cancelled | rejected | failed` result is returned.

Semantic entries:

```text
studyTabLauncher.openFile(OpenFileRequest) -> OpenOutcome
studyTabLauncher.openFiles(OpenFilesRequest) -> OpenOutcome
```

They are cardinality variants of one Feature because they share intent,
authority, behavior and result family.

Application Benefit contribution: this Feature realizes the
[application-owned handoff
boundary](../application-definition.md#ab-stl-01-boundary-owned-handoff) of
[`AB-STL-01`](../application-definition.md#ab-stl-01--open-selected-file-context),
including its [explicit-selection
constraint](../application-definition.md#ab-stl-01-constraint-explicit-selection)
and [local-file scope
constraint](../application-definition.md#ab-stl-01-constraint-local-file-scope).
User/producer selection and VS Code/host authority remain outside this Feature
as stated by the Benefit's [external-authority
boundary](../application-definition.md#ab-stl-01-boundary-external-authority).

## RU-FEAT-02 — Semantic Data

**Methodology:** [RU-FEAT-02 Unit Definition](../../../../../../target-modules/TM-FEATURE.md#ru-feat-02--semantic-data).

Target value semantics belong to
[D-STL-LOCAL-FILE-TARGET](../domain/local-file-target.md).

| Feature Data Object | Meaning | Semantic content |
|---|---|---|
| <a id="fdo-stl-file-open-request"></a>`FDO-STL-FILE-OPEN-REQUEST` | One-file request | version `1`; exactly one `FileTarget`; tab mode `add` or `closeOthers` |
| <a id="fdo-stl-file-set-open-request"></a>`FDO-STL-FILE-SET-OPEN-REQUEST` | Ordered file-set request | version `1`; 1–100 distinct `FileTarget` values in selected order; tab mode `add` or `closeOthers` |
| <a id="fdo-stl-file-open-outcome"></a>`FDO-STL-FILE-OPEN-OUTCOME` | Truthful terminal/partial result | status `opened`, `cancelled`, `rejected` or `failed`; message; ordered subset actually opened |

Copied text carries target membership/order only. Cardinality and tab policy
come from the selected semantic action, not from path text.

## RU-FEAT-03 — Feature Behavior

**Methodology:** [RU-FEAT-03 Unit Definition](../../../../../../target-modules/TM-FEATURE.md#ru-feat-03--feature-behavior).

### Main Path

| Feature Behavior Step | Required action | Attached Behavior Requirements | Related behavior expected errors | QRPE / Examples |
|---|---|---|---|---|
| <a id="fbs-stl-file-01"></a>`FBS-STL-FILE-01 — Accept and validate the complete request` | Select the one-file or file-set entry, validate version, exact fields, cardinality, tab mode, request bounds and target shapes before editor mutation. | [`BR-STL-01`](#br-stl-01), [`BR-STL-02`](#br-stl-02), [`BR-STL-02A`](#br-stl-02a), [`BR-STL-03`](#br-stl-03), [`BR-STL-04`](#br-stl-04), [`BR-STL-06`](#br-stl-06) | [`ERR-BEH-STL-FILE-REQUEST-INVALID-01`](#err-beh-stl-file-request-invalid-01) | One-file rejects multiple copied paths; group preserves non-empty line order. |
| <a id="fbs-stl-file-02"></a>`FBS-STL-FILE-02 — Resolve every target` | Resolve all targets before tab effects: absolute targets directly, workspace-relative targets within their selected real local workspace root. | [`BR-STL-03`](#br-stl-03), [`BR-STL-04`](#br-stl-04), [`BR-STL-05`](#br-stl-05), [`BR-STL-06`](#br-stl-06) | [`ERR-BEH-STL-FILE-TARGET-NOT-ELIGIBLE-02`](#err-beh-stl-file-target-not-eligible-02) | Existing regular local files may be outside every open workspace when addressed absolutely. |
| <a id="fbs-stl-file-03"></a>`FBS-STL-FILE-03 — Establish request-wide uniqueness` | Compare canonical resolved identities and reject the complete request if two representations denote the same local file. | [`BR-STL-04`](#br-stl-04), [`BR-STL-06`](#br-stl-06) | [`ERR-BEH-STL-FILE-DUPLICATE-TARGET-03`](#err-beh-stl-file-duplicate-target-03) | Windows equality is case-insensitive after canonical resolution. |
| <a id="fbs-stl-file-04"></a>`FBS-STL-FILE-04 — Focus the receiving window` | Bring the receiving VS Code window to the foreground after request-wide validation and before intentional tab mutation. | [`BR-STL-11`](#br-stl-11) | [`ERR-BEH-STL-FILE-WINDOW-FOCUS-FAILED-04`](#err-beh-stl-file-window-focus-failed-04) | Focus failure prevents tab opening/closing. |
| <a id="fbs-stl-file-05"></a>`FBS-STL-FILE-05 — Prepare the selected tab context` | For `add`, leave unrelated tabs untouched. For `closeOthers`, ask VS Code to close unrelated tabs while retaining requested resources; cancellation stops target opening. | [`BR-STL-07`](#br-stl-07), [`BR-STL-08`](#br-stl-08) | [`ERR-BEH-STL-FILE-TAB-PREPARATION-CANCELLED-05`](#err-beh-stl-file-tab-preparation-cancelled-05); [`ERR-BEH-STL-FILE-TAB-PREPARATION-FAILED-06`](#err-beh-stl-file-tab-preparation-failed-06) | VS Code owns dirty-save/discard prompts; already closed tabs cannot be rolled back after cancellation. |
| <a id="fbs-stl-file-06"></a>`FBS-STL-FILE-06 — Open the selected context` | Open targets in supplied order using configured editor associations; for a set, reveal the first target again after all opens. | [`BR-STL-03`](#br-stl-03), [`BR-STL-04`](#br-stl-04), [`BR-STL-09`](#br-stl-09), [`BR-STL-10`](#br-stl-10) | [`ERR-BEH-STL-FILE-OPEN-FAILED-07`](#err-beh-stl-file-open-failed-07); [`ERR-BEH-STL-FILE-FIRST-REVEAL-FAILED-08`](#err-beh-stl-file-first-reveal-failed-08) | Physical positions of tabs already open remain VS Code-owned. |
| <a id="fbs-stl-file-07"></a>`FBS-STL-FILE-07 — Return and present the result` | Return the actual status and opened subset. URI invocation presents the result in VS Code and performs bounded delayed focus retries without repeating tab effects. | [`BR-STL-09`](#br-stl-09), [`BR-STL-11`](#br-stl-11) | [Feature-owned Expected Errors](#file-expected-errors) | Browser protocol teardown must not convert failure into success or repeat opening. |

### Behavior Requirements

| Behavior Requirement | Type | Plain required behavior | Related behavior expected errors | QRPE / Examples |
|---|---|---|---|---|
| <a id="br-stl-01"></a>`BR-STL-01 — Explicit invocation` | Authority | Local editor effects occur only after an explicit declared command/URI or one adapter action. | [`ERR-BEH-STL-FILE-REQUEST-INVALID-01`](#err-beh-stl-file-request-invalid-01) | Copied path text alone has no effect. |
| <a id="br-stl-02"></a>`BR-STL-02 — Distinct cardinality contracts` | Scope | One-file and ordered-set requests remain separate semantic entries and routes. | [`ERR-BEH-STL-FILE-REQUEST-INVALID-01`](#err-beh-stl-file-request-invalid-01) | A generic operation flag cannot blur cardinality. |
| <a id="br-stl-02a"></a>`BR-STL-02A — Action-owned policy` | Authority, Context | Copied text contains paths only; the invoked action supplies one/set cardinality and either `add` or `closeOthers` policy. | [`ERR-BEH-STL-FILE-REQUEST-INVALID-01`](#err-beh-stl-file-request-invalid-01) | The current Screen exposes four distinct actions. |
| <a id="br-stl-03"></a>`BR-STL-03 — Exact single target` | Eligibility | The one-file entry accepts exactly one target and opens only one eligible local regular file. | [`ERR-BEH-STL-FILE-REQUEST-INVALID-01`](#err-beh-stl-file-request-invalid-01); [`ERR-BEH-STL-FILE-TARGET-NOT-ELIGIBLE-02`](#err-beh-stl-file-target-not-eligible-02) | Directories are never file targets. |
| <a id="br-stl-04"></a>`BR-STL-04 — Complete ordered set` | Completeness, Order | The set entry succeeds only after every distinct resolved target is passed to VS Code in supplied order and the first is revealed. | [`ERR-BEH-STL-FILE-DUPLICATE-TARGET-03`](#err-beh-stl-file-duplicate-target-03); [`ERR-BEH-STL-FILE-OPEN-FAILED-07`](#err-beh-stl-file-open-failed-07); [`ERR-BEH-STL-FILE-FIRST-REVEAL-FAILED-08`](#err-beh-stl-file-first-reveal-failed-08) | A partial opened subset is reported on failure. |
| <a id="br-stl-05"></a>`BR-STL-05 — Explicit local-file authority` | Scope, Safety | Only existing regular local files are eligible. Absolute targets may be outside workspaces; workspace-relative targets remain contained by the selected real workspace root. | [`ERR-BEH-STL-FILE-TARGET-NOT-ELIGIBLE-02`](#err-beh-stl-file-target-not-eligible-02) | UNC/network, non-file URI, missing and escaping targets are rejected. |
| <a id="br-stl-06"></a>`BR-STL-06 — Validate before editor mutation` | Safety, Consistency | The complete request, every target and request-wide uniqueness are established before intentional tab mutation. | [`ERR-BEH-STL-FILE-REQUEST-INVALID-01`](#err-beh-stl-file-request-invalid-01); [`ERR-BEH-STL-FILE-TARGET-NOT-ELIGIBLE-02`](#err-beh-stl-file-target-not-eligible-02); [`ERR-BEH-STL-FILE-DUPLICATE-TARGET-03`](#err-beh-stl-file-duplicate-target-03) | Rejection opens/closes no tab. |
| <a id="br-stl-07"></a>`BR-STL-07 — Explicit tab policy` | Effect Scope | `add` preserves unrelated tabs; `closeOthers` requests closure while retaining requested resources. | [`ERR-BEH-STL-FILE-TAB-PREPARATION-CANCELLED-05`](#err-beh-stl-file-tab-preparation-cancelled-05); [`ERR-BEH-STL-FILE-TAB-PREPARATION-FAILED-06`](#err-beh-stl-file-tab-preparation-failed-06) | No hidden policy is derived from copied text. |
| <a id="br-stl-08"></a>`BR-STL-08 — Preserve dirty-editor authority` | User Decision, Safety | The Feature never saves, discards or force-closes dirty content; VS Code cancellation prevents target opening. | [`ERR-BEH-STL-FILE-TAB-PREPARATION-CANCELLED-05`](#err-beh-stl-file-tab-preparation-cancelled-05) | Partial unrelated-tab closure before cancellation may remain. |
| <a id="br-stl-09"></a>`BR-STL-09 — Truthful file-context result` | Visibility | Status and opened subset reflect actual effects; invalid, cancelled and failed outcomes remain distinct. | [Feature-owned Expected Errors](#file-expected-errors) | Complete success is never reported after partial opening or failed first reveal. |
| <a id="br-stl-10"></a>`BR-STL-10 — Opening only` | Scope | The Feature does not select content, interpret study state, mutate planning data, execute arbitrary commands or own editor presentation preferences. | [`ERR-BEH-STL-FILE-REQUEST-INVALID-01`](#err-beh-stl-file-request-invalid-01) | Target selection remains upstream. |
| <a id="br-stl-11"></a>`BR-STL-11 — Foreground handoff` | Continuity, Effect Scope | Initial focus occurs before tab mutation; URI completion may retry focus for a bounded interval without repeating the semantic operation. | [`ERR-BEH-STL-FILE-WINDOW-FOCUS-FAILED-04`](#err-beh-stl-file-window-focus-failed-04) | Delayed retries address browser protocol-dialog teardown only. |

<a id="file-expected-errors"></a>
### Expected Errors

| Expected Error | Type | Plain expected error meaning |
|---|---|---|
| <a id="err-beh-stl-file-request-invalid-01"></a>`ERR-BEH-STL-FILE-REQUEST-INVALID-01 — File-context request invalid` | Input / Scope | The operation cannot be normalized to one supported complete request with the declared cardinality and policy. |
| <a id="err-beh-stl-file-target-not-eligible-02"></a>`ERR-BEH-STL-FILE-TARGET-NOT-ELIGIBLE-02 — File target not eligible` | Eligibility / Safety | At least one target is missing, non-local, not a regular file, ambiguously addressed or outside its workspace authority. |
| <a id="err-beh-stl-file-duplicate-target-03"></a>`ERR-BEH-STL-FILE-DUPLICATE-TARGET-03 — Duplicate canonical file target` | Identity / Consistency | Two request members resolve to the same canonical local file. |
| <a id="err-beh-stl-file-window-focus-failed-04"></a>`ERR-BEH-STL-FILE-WINDOW-FOCUS-FAILED-04 — Receiving window focus failed` | Continuity / Effect | The receiving VS Code window could not be foregrounded before requested tab effects. |
| <a id="err-beh-stl-file-tab-preparation-cancelled-05"></a>`ERR-BEH-STL-FILE-TAB-PREPARATION-CANCELLED-05 — Tab preparation cancelled` | User Decision | VS Code did not close every unrelated tab, commonly because the user retained dirty content; target opening does not start. |
| <a id="err-beh-stl-file-tab-preparation-failed-06"></a>`ERR-BEH-STL-FILE-TAB-PREPARATION-FAILED-06 — Tab preparation failed` | Outcome / Effect | The accepted tab policy could not be prepared due to a non-cancellation failure. |
| <a id="err-beh-stl-file-open-failed-07"></a>`ERR-BEH-STL-FILE-OPEN-FAILED-07 — File opening failed` | Outcome / Completeness | VS Code failed while opening the accepted ordered context; the actual opened prefix remains visible in the result. |
| <a id="err-beh-stl-file-first-reveal-failed-08"></a>`ERR-BEH-STL-FILE-FIRST-REVEAL-FAILED-08 — First target reveal failed` | Outcome / Continuity | Every target opened, but the first requested target could not be restored as the visible starting context. |

## RU-FEAT-04 — Implementation Concerns

**Methodology:** [RU-FEAT-04 Unit Definition](../../../../../../target-modules/TM-FEATURE.md#ru-feat-04--implementation-concerns).

Current realized limitation: cancellation during `closeOthers` cannot roll back
unrelated tabs VS Code already closed before the user retained another dirty
tab. The Feature therefore reports `cancelled` and forbids target opening but
does not promise transactionality over VS Code-owned tab interactions.

Browser clipboard permission and final OS foreground are external/live proof
boundaries. Exact URI encoding, DOM, focus retry delays and gateway calls remain
implementation-native.

## RU-FEAT-05 — Feature / Slice Boundary

**Methodology:** [RU-FEAT-05 Unit Definition](../../../../../../target-modules/TM-FEATURE.md#ru-feat-05--feature--slice-boundary).

Selected boundary: one Feature and one end-to-end implementation Slice with
one/set cardinality branches. Validation, canonical resolution, tab
preparation, ordered opening, first-target reveal and outcome mapping are one
cohesive responsibility. Clipboard and URI handlers are adapters, not separate
Features/Slices.

Durable realization ownership is now explicit in
[SL-STL-OPEN-LINKED-CONTEXT](../slices/open-linked-file-context.md). That owner
maps every `FBS-*`, the material Scenario requirements, the
[FileTarget Domain](../domain/local-file-target.md) and the selected reusable
[path-authority capability](../shared/local-path-authority.md) without copying
Feature behavior authority.

<!-- Compatibility anchor: earlier references now resolve to ordinary Unit content, not a retained Decision body. -->
<a id="dec-stl-file-context-boundary-01"></a>
### Cardinality and action-policy rationale

One-file and ordered-set remain distinct semantic entries of one Feature and one durable Slice; the selected action, not copied text, supplies cardinality and `add | closeOthers` policy.

Both entries share intent, authority, principal result, validation and realization; their cardinality difference is material but not a separate Feature outcome.

This boundary addresses unambiguous single/set contracts without creating four behavior owners or letting path text smuggle editor policy.

Related requirements and realization: [`FBS-STL-FILE-01`](#fbs-stl-file-01), [`BR-STL-02`](#br-stl-02), [`BR-STL-02A`](#br-stl-02a) and [SL-STL-OPEN-LINKED-CONTEXT](../slices/open-linked-file-context.md).

Revisit this boundary when a cardinality branch gains a different user outcome, authority boundary or independently deployable end-to-end realization.

Source context: accepted conclusions from the former file-opening design-selection record, revalidated by the SDS audit on 2026-09-23.

## RU-FEAT-06 — Evolution Impact

**Methodology:** [RU-FEAT-06 Unit Definition](../../../../../../target-modules/TM-FEATURE.md#ru-feat-06--evolution-impact).

Disposition: `OMITTED`.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md)
affects project-window journeys only and does not change file targets, tab
policy, ordered opening or outcomes owned by this Feature.
