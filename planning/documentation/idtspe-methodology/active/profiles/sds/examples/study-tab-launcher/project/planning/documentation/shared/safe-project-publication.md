# SH-STL-SAFE-PROJECT-PUBLICATION — Bounded staged project publication

Status: active realized/current Shared Implementation Capability used by the
archive, adaptive-project and trusted-copy Slices.

## RU-SHARED-01 — Shared Capability Contract

**Methodology:** [RU-SHARED-01 Unit Definition](../../../../../../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md#ru-shared-01--shared-capability-contract).

Capability ID: `SH-STL-SAFE-PROJECT-PUBLICATION`.

Responsibility: materialize a project directory from a local ZIP or folder
source through bounded, link-safe, staging-first, no-overwrite filesystem
mechanics while preserving the source and returning a truthful publication
disposition.

Provided modules:

- ZIP module: validate entries, stream bounded regular-file content, flatten
  one complete wrapper root, reuse a safe existing destination when the
  consumer permits it, or atomically publish a new directory;
- folder-copy module: traverse a real source directory without following
  links/special entries and publish only to an absent destination;
- common bounds and application-owned staging/cleanup discipline.

Consumer Slices own source selection, destination derivation/authority,
whether existing-destination reuse is allowed, confirmation, VS Code handoff
and Feature outcome mapping. This capability owns no Workspace Trust meaning.

## RU-SHARED-02 — Consumer Requirement Bindings

**Methodology:** [RU-SHARED-02 Unit Definition](../../../../../../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md#ru-shared-02--consumer-requirement-bindings).

| Consumer Slice | Consumer requirement | Role | Participation |
|---|---|---|---|
| [`SL-STL-EXTRACT-OPEN-ARCHIVE`](../slices/extract-open-archive.md) | [`IR-SLICE-STL-ARCHIVE-02`](../slices/extract-open-archive.md#ir-slice-stl-archive-02) | SATISFIES | Publishes the derived sibling from ZIP or returns safe existing-directory reuse; the Slice chooses that destination and maps the outcome. |
| [`SL-STL-OPEN-LOCAL-PROJECT`](../slices/open-local-project.md) | [`IR-SLICE-STL-PROJECT-03`](../slices/open-local-project.md#ir-slice-stl-project-03) | CONTRIBUTES_TO | Realizes the ZIP branch selected by `ProjectSelector`; folder branch and combined result remain Slice-owned. |
| [`SL-STL-COPY-TRUSTED-PROJECT`](../slices/copy-trusted-project.md) | [`IR-SLICE-STL-TRUST-03`](../slices/copy-trusted-project.md#ir-slice-stl-trust-03) | SATISFIES | Publishes a confirmed absent child from either folder or ZIP; a late destination appearance is rejected rather than silently reused. |

## RU-SHARED-03 — Shared Capability Implementation Requirements

**Methodology:** [RU-SHARED-03 Unit Definition](../../../../../../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md#ru-shared-03--shared-capability-implementation-requirements).

| Shared Implementation Requirement | Type | Plain implementation requirement | Realizes / protects | Related expected errors | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="ir-shared-stl-publication-01"></a>`IR-SHARED-STL-PUBLICATION-01 — Entry and source containment` | Safety, Effect Scope | ZIP entries and folder-copy entries must remain within application-owned staging; links, special entries, traversal, duplicate/conflicting output identities and source escapes are rejected. | [`BR-STL-ARCHIVE-03`](../features/extract-open-archive.md#br-stl-archive-03), [`BR-STL-TRUST-05`](../features/copy-trusted-project.md#br-stl-trust-05) | [`ERR-BEH-STL-ARCHIVE-CONTENT-UNSAFE-04`](../features/extract-open-archive.md#err-beh-stl-archive-content-unsafe-04), [`ERR-BEH-STL-TRUST-PUBLICATION-REJECTED-06`](../features/copy-trusted-project.md#err-beh-stl-trust-publication-rejected-06) | ZIP metadata alone is not filesystem authority. |
| <a id="ir-shared-stl-publication-02"></a>`IR-SHARED-STL-PUBLICATION-02 — Stream-enforced resource bounds` | Resource Bound, Safety | Publication enforces at most 10,000 entries, 256 MiB per file and 1 GiB total output using actual streamed/copied bytes as well as available metadata. | [`BR-STL-ARCHIVE-04`](../features/extract-open-archive.md#br-stl-archive-04), [`BR-STL-TRUST-05`](../features/copy-trusted-project.md#br-stl-trust-05) | [`ERR-BEH-STL-ARCHIVE-LIMIT-EXCEEDED-05`](../features/extract-open-archive.md#err-beh-stl-archive-limit-exceeded-05), [`ERR-BEH-STL-TRUST-PUBLICATION-REJECTED-06`](../features/copy-trusted-project.md#err-beh-stl-trust-publication-rejected-06) | Folder and ZIP branches share the selected bounds. |
| <a id="ir-shared-stl-publication-03"></a>`IR-SHARED-STL-PUBLICATION-03 — Atomic no-overwrite publication` | Consistency, Safety | A new final directory becomes visible only by renaming a completely prepared same-parent staging directory; publication never merges or overwrites and cleanup removes only application-owned staging. | [`BR-STL-ARCHIVE-05`](../features/extract-open-archive.md#br-stl-archive-05), [`BR-STL-ARCHIVE-06`](../features/extract-open-archive.md#br-stl-archive-06), [`BR-STL-TRUST-06`](../features/copy-trusted-project.md#br-stl-trust-06) | [`ERR-BEH-STL-ARCHIVE-DESTINATION-CONFLICT-03`](../features/extract-open-archive.md#err-beh-stl-archive-destination-conflict-03), [`ERR-BEH-STL-ARCHIVE-EXTRACTION-FAILED-06`](../features/extract-open-archive.md#err-beh-stl-archive-extraction-failed-06), [`ERR-BEH-STL-TRUST-PUBLICATION-FAILED-07`](../features/copy-trusted-project.md#err-beh-stl-trust-publication-failed-07) | A destination appearing during work is a conflict, not overwrite permission. |
| <a id="ir-shared-stl-publication-04"></a>`IR-SHARED-STL-PUBLICATION-04 — Explicit existing-destination disposition` | Outcome, Truthfulness | The ZIP module reports `extracted` versus `reusedExisting`; the folder module refuses an occupied destination. Consumers decide whether the returned disposition is valid for their operation. | [`BR-STL-ARCHIVE-05`](../features/extract-open-archive.md#br-stl-archive-05), [`BR-STL-ARCHIVE-08`](../features/extract-open-archive.md#br-stl-archive-08), [`BR-STL-TRUST-04`](../features/copy-trusted-project.md#br-stl-trust-04) | [`ERR-BEH-STL-ARCHIVE-DESTINATION-CONFLICT-03`](../features/extract-open-archive.md#err-beh-stl-archive-destination-conflict-03), [`ERR-BEH-STL-TRUST-DESTINATION-CONFLICT-04`](../features/copy-trusted-project.md#err-beh-stl-trust-destination-conflict-04) | Trusted publication handles pre-existing safe reuse before calling the capability and rejects a race-created destination. |

No separate Shared expected-error family is needed: safety/resource/conflict
failures retain the consuming Feature's behavior-level meanings.

## RU-SHARED-04 — Evolution Impact

**Methodology:** [RU-SHARED-04 Unit Definition](../../../../../../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md#ru-shared-04--evolution-impact).

Disposition: `OMITTED`.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md)
reads metadata after publication/reuse and does not change publication
responsibility or current consumer bindings.

## Proof / representation

Focused proof covers unsafe ZIP/folder inputs, actual byte limits, collision
races, staging cleanup, wrapper flattening and disposition. Whole-Slice proof
establishes destination choice and observable Feature results. Current code is
centered in
[`src/shared/safe-project-publication/zipExtractor.ts`](../../../src/shared/safe-project-publication/zipExtractor.ts)
and
[`src/shared/safe-project-publication/folderCopier.ts`](../../../src/shared/safe-project-publication/folderCopier.ts).
