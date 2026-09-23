# F-STL-OPEN-FOLDER-WINDOW — Open one local folder in a project window

Status: current realized Feature owner with automated and direct system-URI
evidence. Browser/OS final foreground presentation remains external evidence.

## RU-FEAT-01 — Identity / Intent / Principal Result / Semantic Entry

**Methodology:** [RU-FEAT-01 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-01--identity--intent--principal-result--semantic-entry).

Feature ID: `F-STL-OPEN-FOLDER-WINDOW`.

Intent: open one explicitly selected existing local directory as a VS Code
workspace without replacing the receiving workspace.

Principal result: the resolved directory is handed to VS Code under
forced-new-window policy, or a truthful rejection/failure is returned.

Semantic entry:

```text
studyTabLauncher.openFolder(OpenFolderRequest) -> OpenFolderOutcome
```

The direct command/URI entry and composition through the adaptive project
Feature are transport/composition variants of this same behavior.

Application Benefit contribution: this Feature realizes only the [folder
branch](../application-definition.md#ab-stl-02-boundary-folder-branch) of
[`AB-STL-02`](../application-definition.md#ab-stl-02--open-a-local-project-source)
and protects its [safe-project-effect
constraint](../application-definition.md#ab-stl-02-constraint-safe-project-effect).
Selector resolution/waiting and the archive branch remain separate Benefit
contributions owned by their current Features.

## RU-FEAT-02 — Semantic Data

**Methodology:** [RU-FEAT-02 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-02--semantic-data).

Folder value identity and validity belong to
[D-STL-LOCAL-FOLDER-TARGET](../domain/local-folder-target.md).

| Feature Data Object | Meaning | Semantic content |
|---|---|---|
| <a id="fdo-stl-folder-open-request"></a>`FDO-STL-FOLDER-OPEN-REQUEST` | One folder-open request | version `1`; one `FolderTarget` |
| <a id="fdo-stl-folder-open-outcome"></a>`FDO-STL-FOLDER-OPEN-OUTCOME` | Truthful terminal result | status `opened`, `rejected` or `failed`; message; resolved `FolderTarget` when opened |

Browser search-root and clipboard values are adapter/Screen context and are not
Feature-owned semantic data.

## RU-FEAT-03 — Feature Behavior

**Methodology:** [RU-FEAT-03 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-03--feature-behavior).

### Main Path

| Feature Behavior Step | Required action | Attached Behavior Requirements | Related behavior expected errors | QRPE / Examples |
|---|---|---|---|---|
| <a id="fbs-stl-folder-01"></a>`FBS-STL-FOLDER-01 — Accept and validate the request` | Accept only the declared semantic entry or supported adapter route and validate the complete versioned request before folder effects. | [`BR-STL-FOLDER-01`](#br-stl-folder-01), [`BR-STL-FOLDER-05`](#br-stl-folder-05) | [`ERR-BEH-STL-FOLDER-REQUEST-INVALID-01`](#err-beh-stl-folder-request-invalid-01) | Unknown fields and mixed target forms are rejected. |
| <a id="fbs-stl-folder-02"></a>`FBS-STL-FOLDER-02 — Resolve the folder target` | Resolve the supplied target to one existing canonical local directory before asking VS Code to open it. | [`BR-STL-FOLDER-02`](#br-stl-folder-02), [`BR-STL-FOLDER-04`](#br-stl-folder-04) | [`ERR-BEH-STL-FOLDER-TARGET-NOT-ELIGIBLE-02`](#err-beh-stl-folder-target-not-eligible-02) | Files, missing paths, URI/network/device forms and unsupported objects are not eligible. |
| <a id="fbs-stl-folder-03"></a>`FBS-STL-FOLDER-03 — Hand the folder to VS Code` | Invoke the folder-open gateway exactly once with forced-new-window policy and do not run a receiving-window refocus after successful handoff. | [`BR-STL-FOLDER-03`](#br-stl-folder-03), [`BR-STL-FOLDER-04`](#br-stl-folder-04) | [`ERR-BEH-STL-FOLDER-WINDOW-OPEN-FAILED-03`](#err-beh-stl-folder-window-open-failed-03) | VS Code may select an already-open window for that project; final placement remains host-owned. |
| <a id="fbs-stl-folder-04"></a>`FBS-STL-FOLDER-04 — Return the terminal result` | Return `opened` only after the gateway accepts the resolved folder; otherwise preserve rejection versus accepted-operation failure. | [`BR-STL-FOLDER-05`](#br-stl-folder-05) | [`ERR-BEH-STL-FOLDER-WINDOW-OPEN-FAILED-03`](#err-beh-stl-folder-window-open-failed-03) | Command acceptance does not assert Workspace Trust or guaranteed OS foreground. |

### Behavior Requirements

| Behavior Requirement | Type | Plain required behavior | Related behavior expected errors | QRPE / Examples |
|---|---|---|---|---|
| <a id="br-stl-folder-01"></a>`BR-STL-FOLDER-01 — Explicit invocation` | Authority | No folder opens until the declared semantic entry or an authorized adapter composition is explicitly invoked. | [`ERR-BEH-STL-FOLDER-REQUEST-INVALID-01`](#err-beh-stl-folder-request-invalid-01) | A copied path alone has no local effect. |
| <a id="br-stl-folder-02"></a>`BR-STL-FOLDER-02 — Existing local directory only` | Eligibility, Safety | The target must resolve to one existing canonical local directory before window handoff. | [`ERR-BEH-STL-FOLDER-TARGET-NOT-ELIGIBLE-02`](#err-beh-stl-folder-target-not-eligible-02) | Regular files, missing paths and non-local forms are rejected. |
| <a id="br-stl-folder-03"></a>`BR-STL-FOLDER-03 — Forced project window` | Effect Scope | The Feature always requests forced-new-window behavior and exposes no caller-selected window-policy flag. | [`ERR-BEH-STL-FOLDER-WINDOW-OPEN-FAILED-03`](#err-beh-stl-folder-window-open-failed-03) | It never adds/replaces a workspace folder in the receiving window. |
| <a id="br-stl-folder-04"></a>`BR-STL-FOLDER-04 — Narrow folder authority` | Scope, Safety | The Feature opens the resolved directory only; it does not scan contents, extract archives, mutate files, execute arbitrary commands, grant trust or refocus the previous window after success. | [`ERR-BEH-STL-FOLDER-TARGET-NOT-ELIGIBLE-02`](#err-beh-stl-folder-target-not-eligible-02) | Archive selection remains a peer Feature responsibility. |
| <a id="br-stl-folder-05"></a>`BR-STL-FOLDER-05 — Truthful folder result` | Visibility | `opened` means the validated folder was accepted by the VS Code folder gateway; rejection and gateway failure remain distinguishable. | [Feature-owned Expected Errors](#folder-expected-errors) | Final OS foreground is not inferred from gateway acceptance. |

<a id="folder-expected-errors"></a>
### Expected Errors

| Expected Error | Type | Plain expected error meaning |
|---|---|---|
| <a id="err-beh-stl-folder-request-invalid-01"></a>`ERR-BEH-STL-FOLDER-REQUEST-INVALID-01 — Folder request invalid` | Input / Scope | The operation cannot be normalized to one supported complete folder-open request. |
| <a id="err-beh-stl-folder-target-not-eligible-02"></a>`ERR-BEH-STL-FOLDER-TARGET-NOT-ELIGIBLE-02 — Folder target not eligible` | Eligibility | The supplied target does not resolve to one existing canonical local directory allowed by the Feature. |
| <a id="err-beh-stl-folder-window-open-failed-03"></a>`ERR-BEH-STL-FOLDER-WINDOW-OPEN-FAILED-03 — Folder window open failed` | Outcome / Effect | An accepted eligible folder could not be handed to VS Code under the required window policy. |

## RU-FEAT-04 — Implementation Concerns

**Methodology:** [RU-FEAT-04 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-04--implementation-concerns).

Disposition: `OMITTED`.

Reason: no independently valuable current owner-local implementation limitation
is established beyond host-owned foreground/window-placement evidence, which
is retained in the participating Scenario. Exact gateway and URI wiring remain
implementation-native.

## RU-FEAT-05 — Feature / Slice Boundary

**Methodology:** [RU-FEAT-05 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-05--feature--slice-boundary).

Selected boundary: this is a separate Feature and one separate end-to-end
implementation Slice from file-context opening. Directory validation, one
folder handoff and terminal outcome form the cohesive path; clipboard/root
conversion is an adapter concern, while ZIP extraction is a peer Feature.

Durable realization ownership is explicit in
[SL-STL-OPEN-FOLDER-WINDOW](../slices/open-linked-folder-window.md). The small
owner remains concise but addressably relates the folder Domain contract,
reusable path mechanics, external window effect and whole-Slice proof boundary.

<a id="dec-stl-folder-window-boundary-01"></a>
### DEC-STL-FOLDER-WINDOW-BOUNDARY-01 — Keep folder opening separate and force a project window

- **Status:** `ACCEPTED`.
- **Decision:** existing-directory opening is a separate Feature/Slice from
  file-context opening and always requests VS Code's forced-new-window folder
  operation; it performs no delayed refocus of the previous window.
- **Addresses:** workspace replacement/focus ambiguity and accidental mixing
  of directory opening with file-tab or ZIP-publication semantics.
- **Rationale:** a folder creates a project-window result with different
  validation and host effects; caller-selected window policy would weaken that
  invariant.
- **Integrated Into:** [`FBS-STL-FOLDER-03`](#fbs-stl-folder-03),
  [`BR-STL-FOLDER-03`](#br-stl-folder-03),
  [`BR-STL-FOLDER-04`](#br-stl-folder-04) and
  [SL-STL-OPEN-FOLDER-WINDOW](../slices/open-linked-folder-window.md).
- **Reconsider when:** the application deliberately supports in-place
  workspace replacement as another explicit user result.
- **Review provenance:** accepted conclusions from the former folder-opening
  design-selection record, revalidated by the SDS audit on 2026-09-23.

## RU-FEAT-06 — Evolution Impact

**Methodology:** [RU-FEAT-06 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-06--evolution-impact).

Disposition: `OMITTED`.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md)
adds a peer post-open Feature and replaces project-opening journeys; it does
not change this Feature's folder validation, window policy or outcome meaning.
