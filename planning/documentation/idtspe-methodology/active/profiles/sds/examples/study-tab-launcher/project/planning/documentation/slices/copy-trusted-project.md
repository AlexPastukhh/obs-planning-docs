# SL-STL-COPY-TRUSTED-PROJECT — Trusted-location project publication

Status: active realized/current durable Slice owner for
[F-STL-COPY-TRUSTED-PROJECT](../features/copy-trusted-project.md).

## RU-SOWN-01 — Slice Responsibility / Boundary Contract

**Methodology:** [RU-SOWN-01 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-OWNER.md#ru-sown-01--slice-responsibility--boundary-contract).

Responsibility: realize one trusted-project operation from source selection and
browser/VS Code handoff through machine-authoritative destination derivation,
conditional local confirmation, safe reuse/publication, final project-window
handoff and truthful result without changing Workspace Trust.

Entry/result: the shared
[`FDO-STL-PROJECT-OPEN-REQUEST`](../features/open-local-project.md#fdo-stl-project-open-request)
enters the distinct trusted semantic operation; the Slice returns
[`FDO-STL-TRUSTED-PROJECT-OUTCOME`](../features/copy-trusted-project.md#fdo-stl-trusted-project-outcome)
and uses [`FDO-STL-TRUSTED-DESTINATION`](../features/copy-trusted-project.md#fdo-stl-trusted-destination)
internally.

Folder/ZIP source and safe-existing/absent destination are branches of one
Slice. Browser and direct VS Code routes are entry variants.

### Behavior realization

| Upstream behavior | Degree | Slice realization | Domain / Shared owners |
|---|---|---|---|
| [`FBS-STL-TRUST-01`](../features/copy-trusted-project.md#fbs-stl-trust-01) | JOINT | Validates and resolves/awaits one exact folder or ZIP source; on the browser route, prepares the distinct trusted operation and gates dispatch on acknowledged owner handoff. | [`D-STL-LOCAL-PROJECT-SELECTOR`](../domain/local-project-selector.md), [`D-STL-LOCAL-FOLDER-TARGET`](../domain/local-folder-target.md), [`D-STL-LOCAL-ZIP-ARCHIVE-TARGET`](../domain/local-zip-archive-target.md); [`SH-STL-PREPARED-PROJECT-HANDOFF`](../shared/prepared-project-handoff.md) |
| [`FBS-STL-TRUST-02`](../features/copy-trusted-project.md#fbs-stl-trust-02) | FULL | Reads only machine-scoped parent configuration, establishes canonical source/parent/child relation and classifies absent versus safe-existing destination. | [`SH-STL-LOCAL-PATH-AUTHORITY`](../shared/local-path-authority.md) contributes mechanics |
| [`FBS-STL-TRUST-03`](../features/copy-trusted-project.md#fbs-stl-trust-03) | FULL | Places absent-child confirmation in the owning VS Code interaction and bypasses copy confirmation only for safe unchanged reuse. | User/VS Code modal authority |
| [`FBS-STL-TRUST-04`](../features/copy-trusted-project.md#fbs-stl-trust-04) | JOINT | Reuses a safe existing child or publishes a confirmed absent child with the source-appropriate module. | [`SH-STL-SAFE-PROJECT-PUBLICATION`](../shared/safe-project-publication.md) |
| [`FBS-STL-TRUST-05`](../features/copy-trusted-project.md#fbs-stl-trust-05) | FULL | Hands only the final child to the fixed forced-new-window gateway and never edits trust configuration. | [`D-STL-LOCAL-FOLDER-TARGET`](../domain/local-folder-target.md); VS Code boundary |
| [`FBS-STL-TRUST-06`](../features/copy-trusted-project.md#fbs-stl-trust-06) | FULL | Reports actual source/status/final path and explicitly distinguishes safe-existing no-copy reuse. | Extension/browser result boundary |
| [`SR-STL-TRUST-01`](../scenarios/copy-trusted-project.md#sr-stl-trust-01), [`SR-STL-TRUST-02`](../scenarios/copy-trusted-project.md#sr-stl-trust-02), [`SR-STL-TRUST-03`](../scenarios/copy-trusted-project.md#sr-stl-trust-03) | JOINT | Preserves source/action correlation, local publication authority and recoverable final-child continuity across browser, owner modal and new project window. | [ChatGPT Screen](../screens/chatgpt-launcher-widget.md), [`SH-STL-PREPARED-PROJECT-HANDOFF`](../shared/prepared-project-handoff.md), user/VS Code |

The Slice owns destination/confirmation/publication composition. It does not
own source Value Object semantics, reusable staging/path mechanics, browser
search-root settings, Workspace Trust state or final OS window placement.

Whole-Slice proof covers folder/ZIP, authenticated owner-handoff gating,
missing/existing/unsafe destination, confirm/cancel, publication
limits/failure, source preservation, final window-open failure with retained
path and the prohibition on trust mutation.

## RU-SOWN-02 — Slice Implementation Requirements

**Methodology:** [RU-SOWN-02 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-OWNER.md#ru-sown-02--slice-implementation-requirements).

| Slice Implementation Requirement | Type | Plain implementation requirement | Realizes | Related expected errors | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="ir-slice-stl-trust-01"></a>`IR-SLICE-STL-TRUST-01 — Correlate the selected source with the trusted operation` | Identity, Authority | The project selector, trusted action identity and resolved folder/ZIP source remain one operation; no ordinary-project route may be substituted after preparation. | [`FBS-STL-TRUST-01`](../features/copy-trusted-project.md#fbs-stl-trust-01), [`BR-STL-TRUST-07`](../features/copy-trusted-project.md#br-stl-trust-07) | [`ERR-BEH-STL-TRUST-REQUEST-INVALID-01`](../features/copy-trusted-project.md#err-beh-stl-trust-request-invalid-01), [`ERR-BEH-STL-TRUST-SOURCE-NOT-ELIGIBLE-02`](../features/copy-trusted-project.md#err-beh-stl-trust-source-not-eligible-02) | Source candidates remain [`D-STL-LOCAL-PROJECT-SELECTOR`](../domain/local-project-selector.md) authority. |
| <a id="ir-slice-stl-trust-02"></a>`IR-SLICE-STL-TRUST-02 — Machine-only canonical destination authority` | Authority, Safety | Read the parent only from machine-scoped VS Code configuration; require a real canonical directory, derive one contained child, reject source overlap/redirected occupants and never accept destination/trust input from browser or workspace. | [`FBS-STL-TRUST-02`](../features/copy-trusted-project.md#fbs-stl-trust-02), [`BR-STL-TRUST-02`](../features/copy-trusted-project.md#br-stl-trust-02), [`BR-STL-TRUST-04`](../features/copy-trusted-project.md#br-stl-trust-04) | [`ERR-BEH-STL-TRUST-PARENT-NOT-ELIGIBLE-03`](../features/copy-trusted-project.md#err-beh-stl-trust-parent-not-eligible-03), [`ERR-BEH-STL-TRUST-DESTINATION-CONFLICT-04`](../features/copy-trusted-project.md#err-beh-stl-trust-destination-conflict-04) | Selected capability: [`SH-STL-LOCAL-PATH-AUTHORITY`](../shared/local-path-authority.md). |
| <a id="ir-slice-stl-trust-03"></a>`IR-SLICE-STL-TRUST-03 — Confirm then publish an absent child without overwrite` | User Decision, Consistency | Show canonical source/destination/trust warning before absent-child work; after confirmation publish through bounded staged folder/ZIP mechanics, reject a race-created destination and preserve the source. | [`FBS-STL-TRUST-03`](../features/copy-trusted-project.md#fbs-stl-trust-03), [`FBS-STL-TRUST-04`](../features/copy-trusted-project.md#fbs-stl-trust-04), [`BR-STL-TRUST-03`](../features/copy-trusted-project.md#br-stl-trust-03), [`BR-STL-TRUST-05`](../features/copy-trusted-project.md#br-stl-trust-05), [`BR-STL-TRUST-06`](../features/copy-trusted-project.md#br-stl-trust-06) | [`ERR-BEH-STL-TRUST-PUBLICATION-CANCELLED-05`](../features/copy-trusted-project.md#err-beh-stl-trust-publication-cancelled-05), [`ERR-BEH-STL-TRUST-PUBLICATION-REJECTED-06`](../features/copy-trusted-project.md#err-beh-stl-trust-publication-rejected-06), [`ERR-BEH-STL-TRUST-PUBLICATION-FAILED-07`](../features/copy-trusted-project.md#err-beh-stl-trust-publication-failed-07) | Selected capability: [`SH-STL-SAFE-PROJECT-PUBLICATION`](../shared/safe-project-publication.md). |
| <a id="ir-slice-stl-trust-04"></a>`IR-SLICE-STL-TRUST-04 — Prepared handoff binds trusted authority` | Continuity, Authority | Browser coordination prepares the distinct trusted operation only after source discovery, transfers focus using opaque authority and permits one acknowledged local dispatch; destination and confirmation remain in VS Code. | [`FBS-STL-TRUST-01`](../features/copy-trusted-project.md#fbs-stl-trust-01), [`BR-STL-TRUST-08`](../features/copy-trusted-project.md#br-stl-trust-08) | [`ERR-BEH-STL-TRUST-REQUEST-INVALID-01`](../features/copy-trusted-project.md#err-beh-stl-trust-request-invalid-01), [`ERR-BEH-STL-TRUST-SOURCE-NOT-ELIGIBLE-02`](../features/copy-trusted-project.md#err-beh-stl-trust-source-not-eligible-02), [`ERR-BEH-STL-TRUST-HANDOFF-NOT-ESTABLISHED-09`](../features/copy-trusted-project.md#err-beh-stl-trust-handoff-not-established-09) | Selected capability: [`SH-STL-PREPARED-PROJECT-HANDOFF`](../shared/prepared-project-handoff.md). |
| <a id="ir-slice-stl-trust-05"></a>`IR-SLICE-STL-TRUST-05 — Final-child handoff and truthful trust-neutral result` | Truthfulness, Effect Scope | Open only the reused/published child, retain its path after final window-open failure, distinguish no-copy reuse and never report that trust was granted or verified. | [`FBS-STL-TRUST-05`](../features/copy-trusted-project.md#fbs-stl-trust-05), [`FBS-STL-TRUST-06`](../features/copy-trusted-project.md#fbs-stl-trust-06), [`BR-STL-TRUST-01`](../features/copy-trusted-project.md#br-stl-trust-01), [`BR-STL-TRUST-07`](../features/copy-trusted-project.md#br-stl-trust-07) | [`ERR-BEH-STL-TRUST-WINDOW-OPEN-FAILED-08`](../features/copy-trusted-project.md#err-beh-stl-trust-window-open-failed-08) | Actual Workspace Trust is user/VS Code evidence. |

## RU-SOWN-03 — Evolution Impact

**Methodology:** [RU-SOWN-03 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-OWNER.md#ru-sown-03--evolution-impact).

Disposition: `OMITTED` for this Slice boundary.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md)
adds a separate post-open succession Slice after final-child handoff. It does
not change current destination, confirmation or publication responsibility;
the affected prepared-handoff Shared capability carries its own revalidation
projection.

## Representation boundary

Literal settings access, modal/gateway calls, copier/extractor calls and tests
remain implementation-native. This owner preserves the durable whole-path
authority and dependency contract.
