# SL-STL-EXTRACT-OPEN-ARCHIVE — End-to-end ZIP project materialization

Status: active realized/current durable Slice owner for
[F-STL-EXTRACT-OPEN-ARCHIVE](../features/extract-open-archive.md).

## RU-SOWN-01 — Slice Responsibility / Boundary Contract

**Methodology:** [RU-SOWN-01 Unit Definition](../../../../../../target-modules/TM-SLICE-OWNER.md#ru-sown-01--slice-responsibility--boundary-contract).

Responsibility: realize one archive-open operation from typed request through
eligible ZIP resolution, deterministic sibling-destination choice, safe
reuse/publication, final project-window handoff and truthful outcome.

Entry/result: [`FDO-STL-ARCHIVE-OPEN-REQUEST`](../features/extract-open-archive.md#fdo-stl-archive-open-request)
to [`FDO-STL-ARCHIVE-OPEN-OUTCOME`](../features/extract-open-archive.md#fdo-stl-archive-open-outcome),
with [`FDO-STL-ARCHIVE-PUBLICATION-RESULT`](../features/extract-open-archive.md#fdo-stl-archive-publication-result)
preserving extraction disposition.

### Behavior realization

| Upstream behavior | Degree | Slice realization | Domain / Shared owners |
|---|---|---|---|
| [`FBS-STL-ARCHIVE-01`](../features/extract-open-archive.md#fbs-stl-archive-01) | JOINT | Parses the archive entry and fences filesystem effects until request validity. | [`D-STL-LOCAL-ZIP-ARCHIVE-TARGET`](../domain/local-zip-archive-target.md) |
| [`FBS-STL-ARCHIVE-02`](../features/extract-open-archive.md#fbs-stl-archive-02) | JOINT | Resolves the canonical ZIP and derives its exact sibling destination. | [`D-STL-LOCAL-ZIP-ARCHIVE-TARGET`](../domain/local-zip-archive-target.md); [`SH-STL-LOCAL-PATH-AUTHORITY`](../shared/local-path-authority.md) |
| [`FBS-STL-ARCHIVE-03`](../features/extract-open-archive.md#fbs-stl-archive-03), [`FBS-STL-ARCHIVE-04`](../features/extract-open-archive.md#fbs-stl-archive-04), [`FBS-STL-ARCHIVE-05`](../features/extract-open-archive.md#fbs-stl-archive-05) | JOINT | Selects reuse versus publication and consumes the bounded staging capability without surrendering destination/outcome policy. | [`SH-STL-SAFE-PROJECT-PUBLICATION`](../shared/safe-project-publication.md) |
| [`FBS-STL-ARCHIVE-06`](../features/extract-open-archive.md#fbs-stl-archive-06) | FULL | Hands only the final reusable/published [`FolderTarget`](../domain/local-folder-target.md) to the fixed forced-new-window gateway. | [`D-STL-LOCAL-FOLDER-TARGET`](../domain/local-folder-target.md); VS Code boundary |
| [`FBS-STL-ARCHIVE-07`](../features/extract-open-archive.md#fbs-stl-archive-07) | FULL | Maps actual source, folder, disposition and status without erasing a retained path after handoff failure. | Extension presentation boundary |
| [`SR-STL-ARCHIVE-01`](../scenarios/open-downloaded-archive.md#sr-stl-archive-01), [`SR-STL-ARCHIVE-02`](../scenarios/open-downloaded-archive.md#sr-stl-archive-02), [`SR-STL-ARCHIVE-03`](../scenarios/open-downloaded-archive.md#sr-stl-archive-03) | JOINT | Preserves selector/archive/final-root continuity inside the composed adaptive-project journey. | [`SL-STL-OPEN-LOCAL-PROJECT`](open-local-project.md); [`SH-STL-PREPARED-PROJECT-HANDOFF`](../shared/prepared-project-handoff.md) |

The Slice owns sibling destination policy and application outcome, not ZIP
source identity, reusable publication mechanics, Workspace Trust or final OS
foreground.

Whole-Slice proof asserts invalid-source no-effect, safe existing reuse, new
bounded atomic publication, no partial final destination, one final window
handoff and truthful disposition/failure.

## RU-SOWN-02 — Slice Implementation Requirements

**Methodology:** [RU-SOWN-02 Unit Definition](../../../../../../target-modules/TM-SLICE-OWNER.md#ru-sown-02--slice-implementation-requirements).

| Slice Implementation Requirement | Type | Plain implementation requirement | Realizes | Related expected errors | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="ir-slice-stl-archive-01"></a>`IR-SLICE-STL-ARCHIVE-01 — Correlate source and exact sibling destination` | Identity, Authority | Accept only explicit archive entry or authorized adaptive-project composition, resolve one eligible ZIP and derive exactly one same-parent destination by removing `.zip`; callers cannot supply or redirect the destination. | [`FBS-STL-ARCHIVE-01`](../features/extract-open-archive.md#fbs-stl-archive-01), [`FBS-STL-ARCHIVE-02`](../features/extract-open-archive.md#fbs-stl-archive-02), [`BR-STL-ARCHIVE-01`](../features/extract-open-archive.md#br-stl-archive-01), [`BR-STL-ARCHIVE-02`](../features/extract-open-archive.md#br-stl-archive-02) | [`ERR-BEH-STL-ARCHIVE-REQUEST-INVALID-01`](../features/extract-open-archive.md#err-beh-stl-archive-request-invalid-01), [`ERR-BEH-STL-ARCHIVE-SOURCE-NOT-ELIGIBLE-02`](../features/extract-open-archive.md#err-beh-stl-archive-source-not-eligible-02), [`ERR-BEH-STL-ARCHIVE-DESTINATION-CONFLICT-03`](../features/extract-open-archive.md#err-beh-stl-archive-destination-conflict-03) | Selected capability: [`SH-STL-LOCAL-PATH-AUTHORITY`](../shared/local-path-authority.md). |
| <a id="ir-slice-stl-archive-02"></a>`IR-SLICE-STL-ARCHIVE-02 — Use bounded no-overwrite publication` | Safety, Consistency | Existing safe directories are reused unchanged; absent destinations are delegated to the selected staged publication capability, and every conflict/failure remains non-overwriting. | [`FBS-STL-ARCHIVE-03`](../features/extract-open-archive.md#fbs-stl-archive-03), [`FBS-STL-ARCHIVE-04`](../features/extract-open-archive.md#fbs-stl-archive-04), [`FBS-STL-ARCHIVE-05`](../features/extract-open-archive.md#fbs-stl-archive-05), [`BR-STL-ARCHIVE-03`](../features/extract-open-archive.md#br-stl-archive-03), [`BR-STL-ARCHIVE-04`](../features/extract-open-archive.md#br-stl-archive-04), [`BR-STL-ARCHIVE-05`](../features/extract-open-archive.md#br-stl-archive-05), [`BR-STL-ARCHIVE-06`](../features/extract-open-archive.md#br-stl-archive-06) | [`ERR-BEH-STL-ARCHIVE-DESTINATION-CONFLICT-03`](../features/extract-open-archive.md#err-beh-stl-archive-destination-conflict-03), [`ERR-BEH-STL-ARCHIVE-CONTENT-UNSAFE-04`](../features/extract-open-archive.md#err-beh-stl-archive-content-unsafe-04), [`ERR-BEH-STL-ARCHIVE-LIMIT-EXCEEDED-05`](../features/extract-open-archive.md#err-beh-stl-archive-limit-exceeded-05), [`ERR-BEH-STL-ARCHIVE-EXTRACTION-FAILED-06`](../features/extract-open-archive.md#err-beh-stl-archive-extraction-failed-06) | Selected capability: [`SH-STL-SAFE-PROJECT-PUBLICATION`](../shared/safe-project-publication.md). |
| <a id="ir-slice-stl-archive-03"></a>`IR-SLICE-STL-ARCHIVE-03 — Open only a final directory and retain disposition` | Effect Scope, Truthfulness | Call the project-window gateway only after safe reuse/publication yields a final directory; preserve `extracted` versus `reusedExisting` and retained folder identity in the terminal result. | [`FBS-STL-ARCHIVE-06`](../features/extract-open-archive.md#fbs-stl-archive-06), [`FBS-STL-ARCHIVE-07`](../features/extract-open-archive.md#fbs-stl-archive-07), [`BR-STL-ARCHIVE-07`](../features/extract-open-archive.md#br-stl-archive-07), [`BR-STL-ARCHIVE-08`](../features/extract-open-archive.md#br-stl-archive-08) | [`ERR-BEH-STL-ARCHIVE-WINDOW-OPEN-FAILED-07`](../features/extract-open-archive.md#err-beh-stl-archive-window-open-failed-07) | Window failure does not delete the final folder. |

<!-- Compatibility anchor: earlier references now resolve to ordinary Unit content, not a retained Decision body. -->
<a id="dec-stl-archive-publication-01"></a>
### Publication boundary rationale

The extension derives the sibling destination from the ZIP, reuses an eligible existing directory unchanged, or stages bounded safe extraction and publishes by final rename; it never merges or overwrites.

Derivation keeps destination authority local while staging/rename supplies a complete publication boundary and safe retry.

This boundary addresses caller-controlled read/write combinations, partial visible destinations and destructive refresh of an already materialized project.

Related requirements and realization: [`IR-SLICE-STL-ARCHIVE-01`](#ir-slice-stl-archive-01), [`IR-SLICE-STL-ARCHIVE-02`](#ir-slice-stl-archive-02) and [SH-STL-SAFE-PROJECT-PUBLICATION](../shared/safe-project-publication.md).

Revisit this boundary when an explicit separately authorized destination or versioned refresh/merge outcome is introduced as new behavior.

Source context: accepted conclusions from the former archive-opening design-selection record, revalidated by the SDS audit on 2026-09-23.

## RU-SOWN-03 — Evolution Impact

**Methodology:** [RU-SOWN-03 Unit Definition](../../../../../../target-modules/TM-SLICE-OWNER.md#ru-sown-03--evolution-impact).

Disposition: `OMITTED`.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md)
adds a peer post-open Slice consuming the final root but leaves this Slice's
ZIP publication and handoff responsibility unchanged.

## Representation boundary

Literal extractor/staging/gateway topology and tests stay implementation-native.
This artifact owns the stable end-to-end boundary and capability bindings.
