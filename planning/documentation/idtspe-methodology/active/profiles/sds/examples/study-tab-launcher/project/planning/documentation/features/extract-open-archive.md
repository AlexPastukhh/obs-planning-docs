# F-STL-EXTRACT-OPEN-ARCHIVE — Extract a local ZIP and open its project folder

Status: current realized Feature owner with automated safety and orchestration
coverage. Live installed browser/VS Code window evidence remains pending.

## RU-FEAT-01 — Identity / Intent / Principal Result / Semantic Entry

**Methodology:** [RU-FEAT-01 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-01--identity--intent--principal-result--semantic-entry).

Feature ID: `F-STL-EXTRACT-OPEN-ARCHIVE`.

Intent: safely materialize one explicitly selected local ZIP as a sibling
project directory and open that directory in a VS Code project window.

Principal result: a complete existing or newly extracted project directory is
handed to VS Code under forced-new-window policy; otherwise no partial final
destination is claimed and a truthful non-success result is returned.

Semantic entry:

```text
studyTabLauncher.openArchive(OpenArchiveRequest) -> OpenArchiveOutcome
```

Direct command/URI entry and composition through the adaptive project Feature
are entry variants of this same behavior.

Application Benefit contribution: this Feature realizes only the [archive
branch](../application-definition.md#ab-stl-02-boundary-archive-branch) of
[`AB-STL-02`](../application-definition.md#ab-stl-02--open-a-local-project-source)
and protects its [safe-project-effect
constraint](../application-definition.md#ab-stl-02-constraint-safe-project-effect).
Selector choice/waiting and host-owned window/trust authority remain outside
this Feature.

## RU-FEAT-02 — Semantic Data

**Methodology:** [RU-FEAT-02 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-02--semantic-data).

Archive source identity and eligibility belong to
[D-STL-LOCAL-ZIP-ARCHIVE-TARGET](../domain/local-zip-archive-target.md).

| Feature Data Object | Meaning | Semantic content |
|---|---|---|
| <a id="fdo-stl-archive-open-request"></a>`FDO-STL-ARCHIVE-OPEN-REQUEST` | One archive-open request | version `1`; one `ZipArchiveTarget` |
| <a id="fdo-stl-archive-publication-result"></a>`FDO-STL-ARCHIVE-PUBLICATION-RESULT` | Final materialization disposition | final `FolderTarget`; extraction `extracted` or `reusedExisting` |
| <a id="fdo-stl-archive-open-outcome"></a>`FDO-STL-ARCHIVE-OPEN-OUTCOME` | Truthful terminal result | status `opened`, `rejected` or `failed`; message; optional archive/folder; extraction `extracted`, `reusedExisting` or `none` |

The extraction destination and window policy are invariant Feature behavior,
not caller-provided authority.

## RU-FEAT-03 — Feature Behavior

**Methodology:** [RU-FEAT-03 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-03--feature-behavior).

### Main Path

| Feature Behavior Step | Required action | Attached Behavior Requirements | Related behavior expected errors | QRPE / Examples |
|---|---|---|---|---|
| <a id="fbs-stl-archive-01"></a>`FBS-STL-ARCHIVE-01 — Accept and validate the request` | Accept only the semantic entry or supported adapter route and validate the complete versioned archive request before filesystem effects. | [`BR-STL-ARCHIVE-01`](#br-stl-archive-01), [`BR-STL-ARCHIVE-08`](#br-stl-archive-08) | [`ERR-BEH-STL-ARCHIVE-REQUEST-INVALID-01`](#err-beh-stl-archive-request-invalid-01) | Browser project-name conversion remains outside this Feature. |
| <a id="fbs-stl-archive-02"></a>`FBS-STL-ARCHIVE-02 — Resolve archive and final destination` | Resolve one existing canonical local regular ZIP and derive its sibling destination by removing `.zip`. | [`BR-STL-ARCHIVE-02`](#br-stl-archive-02), [`BR-STL-ARCHIVE-05`](#br-stl-archive-05) | [`ERR-BEH-STL-ARCHIVE-SOURCE-NOT-ELIGIBLE-02`](#err-beh-stl-archive-source-not-eligible-02); [`ERR-BEH-STL-ARCHIVE-DESTINATION-CONFLICT-03`](#err-beh-stl-archive-destination-conflict-03) | An existing directory is reusable; any other occupied destination conflicts. |
| <a id="fbs-stl-archive-03"></a>`FBS-STL-ARCHIVE-03 — Reuse or stage extraction` | If the sibling destination is an existing directory, reuse it unchanged. Otherwise create a unique application-owned staging directory in the same parent. | [`BR-STL-ARCHIVE-05`](#br-stl-archive-05), [`BR-STL-ARCHIVE-06`](#br-stl-archive-06) | [`ERR-BEH-STL-ARCHIVE-DESTINATION-CONFLICT-03`](#err-beh-stl-archive-destination-conflict-03); [`ERR-BEH-STL-ARCHIVE-EXTRACTION-FAILED-06`](#err-beh-stl-archive-extraction-failed-06) | Reuse performs no refresh, merge or overwrite. |
| <a id="fbs-stl-archive-04"></a>`FBS-STL-ARCHIVE-04 — Validate and extract safely` | Validate every entry and stream only bounded regular-file content under the staging root. Flatten exactly one wrapper directory only when it is the complete archive root. | [`BR-STL-ARCHIVE-03`](#br-stl-archive-03), [`BR-STL-ARCHIVE-04`](#br-stl-archive-04) | [`ERR-BEH-STL-ARCHIVE-CONTENT-UNSAFE-04`](#err-beh-stl-archive-content-unsafe-04); [`ERR-BEH-STL-ARCHIVE-LIMIT-EXCEEDED-05`](#err-beh-stl-archive-limit-exceeded-05); [`ERR-BEH-STL-ARCHIVE-EXTRACTION-FAILED-06`](#err-beh-stl-archive-extraction-failed-06) | Limits: 10,000 entries, 256 MiB per file, 1 GiB total output. |
| <a id="fbs-stl-archive-05"></a>`FBS-STL-ARCHIVE-05 — Publish the complete destination` | Rename the fully staged result to the final sibling only after complete success; on failure remove only application-owned staging material. | [`BR-STL-ARCHIVE-05`](#br-stl-archive-05), [`BR-STL-ARCHIVE-06`](#br-stl-archive-06) | [`ERR-BEH-STL-ARCHIVE-DESTINATION-CONFLICT-03`](#err-beh-stl-archive-destination-conflict-03); [`ERR-BEH-STL-ARCHIVE-EXTRACTION-FAILED-06`](#err-beh-stl-archive-extraction-failed-06) | The source ZIP remains unchanged. |
| <a id="fbs-stl-archive-06"></a>`FBS-STL-ARCHIVE-06 — Hand the final folder to VS Code` | Open the reused or newly published directory under forced-new-window policy without granting Workspace Trust or refocusing the previous window after success. | [`BR-STL-ARCHIVE-07`](#br-stl-archive-07), [`BR-STL-ARCHIVE-08`](#br-stl-archive-08) | [`ERR-BEH-STL-ARCHIVE-WINDOW-OPEN-FAILED-07`](#err-beh-stl-archive-window-open-failed-07) | A published/reused directory remains available even when window handoff fails. |
| <a id="fbs-stl-archive-07"></a>`FBS-STL-ARCHIVE-07 — Return the terminal result` | Report source, final folder, extraction disposition and actual terminal status without treating partial work or host uncertainty as opened. | [`BR-STL-ARCHIVE-08`](#br-stl-archive-08) | [Feature-owned Expected Errors](#archive-expected-errors) | `reusedExisting` and `extracted` remain distinguishable. |

### Behavior Requirements

| Behavior Requirement | Type | Plain required behavior | Related behavior expected errors | QRPE / Examples |
|---|---|---|---|---|
| <a id="br-stl-archive-01"></a>`BR-STL-ARCHIVE-01 — Explicit archive invocation` | Authority | Extraction begins only through the declared semantic entry or an authorized adaptive-project composition that selected a ZIP. | [`ERR-BEH-STL-ARCHIVE-REQUEST-INVALID-01`](#err-beh-stl-archive-request-invalid-01) | Folder opening never silently extracts. |
| <a id="br-stl-archive-02"></a>`BR-STL-ARCHIVE-02 — Eligible local ZIP source` | Eligibility | The source must resolve to one existing canonical local regular `.zip` file before extraction. | [`ERR-BEH-STL-ARCHIVE-SOURCE-NOT-ELIGIBLE-02`](#err-beh-stl-archive-source-not-eligible-02) | Remote, directory, missing and non-ZIP targets are rejected. |
| <a id="br-stl-archive-03"></a>`BR-STL-ARCHIVE-03 — Safe archive entries` | Safety | Absolute/traversing/ambiguous/duplicate paths, links, special files and entries escaping the staging root are rejected before unsafe publication. | [`ERR-BEH-STL-ARCHIVE-CONTENT-UNSAFE-04`](#err-beh-stl-archive-content-unsafe-04) | ZIP entry names do not grant filesystem authority outside staging. |
| <a id="br-stl-archive-04"></a>`BR-STL-ARCHIVE-04 — Bounded extraction` | Resource Bound, Safety | Entry count, per-file bytes and total streamed bytes remain within the selected limits; metadata alone is not trusted. | [`ERR-BEH-STL-ARCHIVE-LIMIT-EXCEEDED-05`](#err-beh-stl-archive-limit-exceeded-05) | Total written bytes are checked while streaming. |
| <a id="br-stl-archive-05"></a>`BR-STL-ARCHIVE-05 — No merge or overwrite` | Effect Scope, Safety | An exact existing directory is reused unchanged; content is never merged/refreshed and any other occupied destination is rejected. | [`ERR-BEH-STL-ARCHIVE-DESTINATION-CONFLICT-03`](#err-beh-stl-archive-destination-conflict-03) | A reused destination's existing content is authoritative. |
| <a id="br-stl-archive-06"></a>`BR-STL-ARCHIVE-06 — Atomic publication and cleanup` | Consistency, Safety | The final destination becomes visible only after complete staging; failure cleans only uniquely owned staging material. | [`ERR-BEH-STL-ARCHIVE-EXTRACTION-FAILED-06`](#err-beh-stl-archive-extraction-failed-06) | Partial final destinations are forbidden. |
| <a id="br-stl-archive-07"></a>`BR-STL-ARCHIVE-07 — Forced window without trust promotion` | Effect Scope, Authority | The final directory is opened under forced-new-window policy and the Feature never modifies Workspace Trust or Restricted Mode. | [`ERR-BEH-STL-ARCHIVE-WINDOW-OPEN-FAILED-07`](#err-beh-stl-archive-window-open-failed-07) | Trust remains an explicit user/VS Code decision. |
| <a id="br-stl-archive-08"></a>`BR-STL-ARCHIVE-08 — Truthful archive result` | Visibility | Result status and extraction disposition reflect the completed effects; successful handoff does not trigger a previous-window focus retry. | [Feature-owned Expected Errors](#archive-expected-errors) | A retained folder path may be reported when window handoff fails. |

<a id="archive-expected-errors"></a>
### Expected Errors

| Expected Error | Type | Plain expected error meaning |
|---|---|---|
| <a id="err-beh-stl-archive-request-invalid-01"></a>`ERR-BEH-STL-ARCHIVE-REQUEST-INVALID-01 — Archive request invalid` | Input / Scope | The operation cannot be normalized to one supported complete archive-open request. |
| <a id="err-beh-stl-archive-source-not-eligible-02"></a>`ERR-BEH-STL-ARCHIVE-SOURCE-NOT-ELIGIBLE-02 — Archive source not eligible` | Eligibility | The supplied source is missing, non-local, not a regular file or not an eligible ZIP. |
| <a id="err-beh-stl-archive-destination-conflict-03"></a>`ERR-BEH-STL-ARCHIVE-DESTINATION-CONFLICT-03 — Archive destination conflict` | Conflict / Safety | The derived sibling destination cannot be reused or published without merging, overwriting or following an unsafe object. |
| <a id="err-beh-stl-archive-content-unsafe-04"></a>`ERR-BEH-STL-ARCHIVE-CONTENT-UNSAFE-04 — Archive content unsafe` | Safety | One or more archive entries violate path, type, uniqueness or containment policy. |
| <a id="err-beh-stl-archive-limit-exceeded-05"></a>`ERR-BEH-STL-ARCHIVE-LIMIT-EXCEEDED-05 — Archive extraction limit exceeded` | Resource Bound | The archive exceeds the allowed entry, per-file or total streamed-output bound. |
| <a id="err-beh-stl-archive-extraction-failed-06"></a>`ERR-BEH-STL-ARCHIVE-EXTRACTION-FAILED-06 — Archive extraction failed` | Outcome / Consistency | An eligible archive could not be completely staged and atomically published. |
| <a id="err-beh-stl-archive-window-open-failed-07"></a>`ERR-BEH-STL-ARCHIVE-WINDOW-OPEN-FAILED-07 — Archive project window open failed` | Outcome / Effect | The final reusable/published directory could not be handed to VS Code under required window policy. |

## RU-FEAT-04 — Implementation Concerns

**Methodology:** [RU-FEAT-04 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-04--implementation-concerns).

Disposition: `OMITTED`.

Reason: no independently valuable current owner-local implementation risk is
established beyond host/symlink proof availability. Exact ZIP library calls,
staging names and tests remain implementation-native.

## RU-FEAT-05 — Feature / Slice Boundary

**Methodology:** [RU-FEAT-05 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-05--feature--slice-boundary).

Selected boundary: archive validation, bounded staged extraction, atomic
publication/reuse, folder handoff and outcome mapping form one end-to-end
archive implementation Slice. It is separate from the folder Feature and from
adaptive source selection, though those Features may compose it.

Durable realization ownership is explicit in
[SL-STL-EXTRACT-OPEN-ARCHIVE](../slices/extract-open-archive.md). It binds this
behavior to ZIP/folder Domain values and the reusable path/publication
capabilities while leaving source/destination/result policy in the Slice and
behavior authority here.

## RU-FEAT-06 — Evolution Impact

**Methodology:** [RU-FEAT-06 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-FEATURE.md#ru-feat-06--evolution-impact).

Disposition: `OMITTED`.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md)
consumes the final folder after this Feature succeeds but does not change ZIP
eligibility, extraction, reuse, publication or result behavior owned here.
