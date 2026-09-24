# F-STL-COPY-TRUSTED-PROJECT — Publish or reopen a project under a chosen parent

Status: current realized Feature owner in repository version 0.15.0 with
automated publication/reuse coverage. Installed Workspace Trust and
multi-window observation remain live evidence.

## RU-FEAT-01 — Identity / Intent / Principal Result / Semantic Entry

**Methodology:** [RU-FEAT-01 Unit Definition](../../../../../../target-modules/TM-FEATURE.md#ru-feat-01--identity--intent--principal-result--semantic-entry).

Feature ID: `F-STL-COPY-TRUSTED-PROJECT`.

Intent: preserve an explicitly selected downloaded folder/ZIP source while
publishing or reopening a complete child below a machine-configured parent the
user may separately choose to trust in VS Code.

Principal result: an existing safe derived child is reopened unchanged, or an
absent child is confirmed, atomically published and handed to VS Code; all
other branches return a truthful non-success without granting Workspace Trust.

Semantic entry:

```text
studyTabLauncher.copyProjectToTrusted(OpenProjectRequest)
  -> TrustedProjectOutcome
```

The request carries no destination parent or trust flag. Those authorities
remain local to VS Code settings and the user decision.

Application Benefit contribution: this Feature realizes the
[application-owned publication
boundary](../application-definition.md#ab-stl-03-boundary-owned-publication) of
[`AB-STL-03`](../application-definition.md#ab-stl-03--publish-under-a-chosen-parent)
and protects its [destination-authority
constraint](../application-definition.md#ab-stl-03-constraint-destination-authority),
[source-preservation
constraint](../application-definition.md#ab-stl-03-constraint-source-preservation)
and [trust-neutrality
constraint](../application-definition.md#ab-stl-03-constraint-trust-neutrality).
The Benefit's [external-authority
boundary](../application-definition.md#ab-stl-03-boundary-external-authority)
keeps parent configuration, publication confirmation and actual Workspace
Trust with the user/VS Code.

## RU-FEAT-02 — Semantic Data

**Methodology:** [RU-FEAT-02 Unit Definition](../../../../../../target-modules/TM-FEATURE.md#ru-feat-02--semantic-data).

The Feature references
[`FDO-STL-PROJECT-OPEN-REQUEST`](open-local-project.md#fdo-stl-project-open-request)
and [D-STL-LOCAL-PROJECT-SELECTOR](../domain/local-project-selector.md) for
source selection meaning.

| Feature Data Object | Meaning | Semantic content |
|---|---|---|
| <a id="fdo-stl-trusted-destination"></a>`FDO-STL-TRUSTED-DESTINATION` | Derived publication/open target below the configured parent | canonical parent; derived child path; state `available` or `existing` |
| <a id="fdo-stl-trusted-project-outcome"></a>`FDO-STL-TRUSTED-PROJECT-OUTCOME` | Truthful terminal/publication result | status `opened`, `cancelled`, `rejected` or `failed`; message; source `folder`, `archive` or `none`; final folder path when retained/reused |

`trustedProjectsParent` is machine-scoped VS Code configuration. It is not
browser state and does not itself prove that VS Code currently trusts it.

## RU-FEAT-03 — Feature Behavior

**Methodology:** [RU-FEAT-03 Unit Definition](../../../../../../target-modules/TM-FEATURE.md#ru-feat-03--feature-behavior).

### Main Path

| Feature Behavior Step | Required action | Attached Behavior Requirements | Related behavior expected errors | QRPE / Examples |
|---|---|---|---|---|
| <a id="fbs-stl-trust-01"></a>`FBS-STL-TRUST-01 — Resolve source and establish owner handoff` | Validate one project request and resolve/wait for exactly one eligible folder or ZIP using current selector rules; on the browser route, complete the prepared owner handoff before dispatching this trusted operation. | [`BR-STL-TRUST-01`](#br-stl-trust-01), [`BR-STL-TRUST-07`](#br-stl-trust-07), [`BR-STL-TRUST-08`](#br-stl-trust-08) | [`ERR-BEH-STL-TRUST-REQUEST-INVALID-01`](#err-beh-stl-trust-request-invalid-01); [`ERR-BEH-STL-TRUST-SOURCE-NOT-ELIGIBLE-02`](#err-beh-stl-trust-source-not-eligible-02); [`ERR-BEH-STL-TRUST-HANDOFF-NOT-ESTABLISHED-09`](#err-beh-stl-trust-handoff-not-established-09) | Source identity is [ProjectSelector](../domain/local-project-selector.md) meaning; the [Shared handoff capability](../shared/prepared-project-handoff.md) retains token/acknowledgement mechanics. |
| <a id="fbs-stl-trust-02"></a>`FBS-STL-TRUST-02 — Establish the destination` | Resolve the configured parent as an existing canonical real local directory, derive one child name from folder basename/ZIP stem, reject source/parent overlap, and classify the child as available or safe-existing. | [`BR-STL-TRUST-02`](#br-stl-trust-02), [`BR-STL-TRUST-04`](#br-stl-trust-04) | [`ERR-BEH-STL-TRUST-PARENT-NOT-ELIGIBLE-03`](#err-beh-stl-trust-parent-not-eligible-03); [`ERR-BEH-STL-TRUST-DESTINATION-CONFLICT-04`](#err-beh-stl-trust-destination-conflict-04) | Links/junctions and redirected existing children are not safe-existing. |
| <a id="fbs-stl-trust-03"></a>`FBS-STL-TRUST-03 — Obtain publication authority when needed` | For an absent child, show a modal confirmation naming canonical source/destination and warning about inherited trust-by-location. For a safe-existing child, skip publication confirmation because no copy occurs. | [`BR-STL-TRUST-01`](#br-stl-trust-01), [`BR-STL-TRUST-03`](#br-stl-trust-03), [`BR-STL-TRUST-04`](#br-stl-trust-04) | [`ERR-BEH-STL-TRUST-PUBLICATION-CANCELLED-05`](#err-beh-stl-trust-publication-cancelled-05) | Dismiss/cancel publishes and opens nothing for the absent-child branch. |
| <a id="fbs-stl-trust-04"></a>`FBS-STL-TRUST-04 — Preserve or publish the child` | Reuse a safe-existing child unchanged. Otherwise copy the folder or extract the ZIP through bounded staged no-overwrite publication while preserving the source. | [`BR-STL-TRUST-04`](#br-stl-trust-04), [`BR-STL-TRUST-05`](#br-stl-trust-05), [`BR-STL-TRUST-06`](#br-stl-trust-06) | [`ERR-BEH-STL-TRUST-PUBLICATION-REJECTED-06`](#err-beh-stl-trust-publication-rejected-06); [`ERR-BEH-STL-TRUST-PUBLICATION-FAILED-07`](#err-beh-stl-trust-publication-failed-07) | Folder links/special entries and unsafe ZIP entries are rejected; limits match archive publication. |
| <a id="fbs-stl-trust-05"></a>`FBS-STL-TRUST-05 — Hand the final child to VS Code` | Open the reused/newly published child under forced-new-window policy without changing trust configuration. | [`BR-STL-TRUST-01`](#br-stl-trust-01), [`BR-STL-TRUST-07`](#br-stl-trust-07) | [`ERR-BEH-STL-TRUST-WINDOW-OPEN-FAILED-08`](#err-beh-stl-trust-window-open-failed-08) | A published/reused child remains available and its path is reported after handoff failure. |
| <a id="fbs-stl-trust-06"></a>`FBS-STL-TRUST-06 — Return the terminal result` | Preserve status `opened`, `cancelled`, `rejected` or `failed`, source kind and retained final path where material; never claim that trust was granted. | [`BR-STL-TRUST-07`](#br-stl-trust-07) | [Feature-owned Expected Errors](#trusted-expected-errors) | Existing-child reuse explicitly reports that no files changed. |

### Behavior Requirements

| Behavior Requirement | Type | Plain required behavior | Related behavior expected errors | QRPE / Examples |
|---|---|---|---|---|
| <a id="br-stl-trust-01"></a>`BR-STL-TRUST-01 — Workspace Trust remains user-owned` | Authority, User Decision | The Feature never adds a trusted folder, disables Restricted Mode, edits VS Code trust state or claims to have verified parent trust. | [`ERR-BEH-STL-TRUST-PARENT-NOT-ELIGIBLE-03`](#err-beh-stl-trust-parent-not-eligible-03) | Trust-by-location remains VS Code behavior after user configuration. |
| <a id="br-stl-trust-02"></a>`BR-STL-TRUST-02 — Machine-owned destination authority` | Authority, Scope | Only the machine-scoped configured parent may supply the destination root; browser/request/workspace input cannot override it. | [`ERR-BEH-STL-TRUST-PARENT-NOT-ELIGIBLE-03`](#err-beh-stl-trust-parent-not-eligible-03); [`ERR-BEH-STL-TRUST-DESTINATION-CONFLICT-04`](#err-beh-stl-trust-destination-conflict-04) | The parent must be an existing real directory. |
| <a id="br-stl-trust-03"></a>`BR-STL-TRUST-03 — Confirm absent-child publication` | User Decision, Visibility | Before publishing an absent child, the user sees canonical source, destination and trust warning and must explicitly confirm. | [`ERR-BEH-STL-TRUST-PUBLICATION-CANCELLED-05`](#err-beh-stl-trust-publication-cancelled-05) | Safe-existing reuse skips this copy-specific confirmation. |
| <a id="br-stl-trust-04"></a>`BR-STL-TRUST-04 — Safe existing-child reuse` | Safety, Effect Scope | An exact existing canonical real directory is opened unchanged; files, links, junctions and redirected roots are rejected. | [`ERR-BEH-STL-TRUST-DESTINATION-CONFLICT-04`](#err-beh-stl-trust-destination-conflict-04) | No comparison, refresh, merge or overwrite occurs. |
| <a id="br-stl-trust-05"></a>`BR-STL-TRUST-05 — Preserve and bound the source publication` | Safety, Resource Bound | Folder copy/ZIP extraction preserves the source, rejects links/special or unsafe entries and enforces 10,000-entry, 256 MiB per-file and 1 GiB total limits. | [`ERR-BEH-STL-TRUST-PUBLICATION-REJECTED-06`](#err-beh-stl-trust-publication-rejected-06) | ZIP validation composes archive safety meaning without changing destination authority. |
| <a id="br-stl-trust-06"></a>`BR-STL-TRUST-06 — Atomic no-overwrite publication` | Consistency, Safety | A missing child becomes visible only after complete staging; publication never merges/overwrites and failure removes only application-owned staging. | [`ERR-BEH-STL-TRUST-PUBLICATION-FAILED-07`](#err-beh-stl-trust-publication-failed-07); [`ERR-BEH-STL-TRUST-DESTINATION-CONFLICT-04`](#err-beh-stl-trust-destination-conflict-04) | A destination appearing during publication is not silently reused. |
| <a id="br-stl-trust-07"></a>`BR-STL-TRUST-07 — Truthful publication and window result` | Visibility | Result distinguishes source/handoff rejection, cancellation, publication failure and window failure; retained/reused final path is reported when material. | [Feature-owned Expected Errors](#trusted-expected-errors) | `opened` never means “trust was granted”; failed owner handoff never claims publication. |
| <a id="br-stl-trust-08"></a>`BR-STL-TRUST-08 — Owner handoff before trusted effects` | Continuity, Authority | On the browser route, the distinct trusted operation reaches its owning VS Code context before any destination, publication or window effect; failed or repeated handoff causes no such effect and the browser receives no destination or trust authority. | [`ERR-BEH-STL-TRUST-HANDOFF-NOT-ESTABLISHED-09`](#err-beh-stl-trust-handoff-not-established-09) | Direct VS Code entry is already in its owning context; Shared owns token/acknowledgement mechanics. |

<a id="trusted-expected-errors"></a>
### Expected Errors

| Expected Error | Type | Plain expected error meaning |
|---|---|---|
| <a id="err-beh-stl-trust-request-invalid-01"></a>`ERR-BEH-STL-TRUST-REQUEST-INVALID-01 — Trusted-project request invalid` | Input / Scope | The operation cannot be normalized to one supported complete trusted-project request. |
| <a id="err-beh-stl-trust-source-not-eligible-02"></a>`ERR-BEH-STL-TRUST-SOURCE-NOT-ELIGIBLE-02 — Trusted-project source not eligible` | Eligibility | The selected source cannot resolve to one allowed folder or ZIP under adaptive-project rules. |
| <a id="err-beh-stl-trust-parent-not-eligible-03"></a>`ERR-BEH-STL-TRUST-PARENT-NOT-ELIGIBLE-03 — Trusted parent not eligible` | Eligibility / Authority | The configured parent is missing, non-local, linked/redirected, not a real directory or overlaps the selected source. |
| <a id="err-beh-stl-trust-destination-conflict-04"></a>`ERR-BEH-STL-TRUST-DESTINATION-CONFLICT-04 — Trusted destination conflict` | Conflict / Safety | The derived child is occupied by anything other than the exact safe real directory allowed for unchanged reuse, or cannot remain below the parent. |
| <a id="err-beh-stl-trust-publication-cancelled-05"></a>`ERR-BEH-STL-TRUST-PUBLICATION-CANCELLED-05 — Trusted publication cancelled` | User Decision | The user did not authorize publication of the absent child; nothing is published or opened. |
| <a id="err-beh-stl-trust-publication-rejected-06"></a>`ERR-BEH-STL-TRUST-PUBLICATION-REJECTED-06 — Trusted publication rejected` | Safety / Resource Bound | Source content violates folder/ZIP safety or publication limits. |
| <a id="err-beh-stl-trust-publication-failed-07"></a>`ERR-BEH-STL-TRUST-PUBLICATION-FAILED-07 — Trusted publication failed` | Outcome / Consistency | An eligible confirmed source could not be completely staged and published below the configured parent. |
| <a id="err-beh-stl-trust-window-open-failed-08"></a>`ERR-BEH-STL-TRUST-WINDOW-OPEN-FAILED-08 — Trusted project window open failed` | Outcome / Effect | The final child exists or was safely reused but VS Code could not accept the required project-window handoff. |
| <a id="err-beh-stl-trust-handoff-not-established-09"></a>`ERR-BEH-STL-TRUST-HANDOFF-NOT-ESTABLISHED-09 — Trusted operation owner handoff not established` | Continuity / Authority | Browser preparation or owner-focus acknowledgement did not establish this trusted operation in its owning VS Code context; no trusted publication or window-opening effect begins. |

## RU-FEAT-04 — Implementation Concerns

**Methodology:** [RU-FEAT-04 Unit Definition](../../../../../../target-modules/TM-FEATURE.md#ru-feat-04--implementation-concerns).

Disposition: `OMITTED`.

Reason: the canonical
[`P-STL-HANDOFF-01`](../shared/prepared-project-handoff.md#p-stl-handoff-01) is
owned by the Shared prepared-handoff capability. This Feature has no distinct
owner-local limitation to duplicate; literal copy/extraction mechanisms remain
implementation-native.

## RU-FEAT-05 — Feature / Slice Boundary

**Methodology:** [RU-FEAT-05 Unit Definition](../../../../../../target-modules/TM-FEATURE.md#ru-feat-05--feature--slice-boundary).

Selected boundary: one trusted-publication Feature and one end-to-end
implementation Slice with folder and ZIP source branches. Destination
authority, confirmation, publication/reuse, final opening and truthful outcome
are cohesive and separate from ordinary project opening.

Durable realization ownership is explicit in
[SL-STL-COPY-TRUSTED-PROJECT](../slices/copy-trusted-project.md). It owns the
machine-destination/confirmation/publication composition and binds the
ProjectSelector, path-authority, publication and prepared-handoff owners while
leaving behavior and Workspace Trust authority outside it.

## RU-FEAT-06 — Evolution Impact

**Methodology:** [RU-FEAT-06 Unit Definition](../../../../../../target-modules/TM-FEATURE.md#ru-feat-06--evolution-impact).

Disposition: `OMITTED`.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md)
adds a peer post-open Feature. It does not change this Feature's destination,
confirmation, publication/reuse, trust or outcome semantics; the affected
trusted-copy Scenario owns the future journey reverse reference.
