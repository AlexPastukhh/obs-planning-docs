# D-STL-LOCAL-ZIP-ARCHIVE-TARGET — Local ZIP Archive Target

Status: active realized/current Domain Value Object owner consumed by archive,
adaptive-project and trusted-project Slices.

## RU-DOWN-01 — Domain Semantic Contract

**Methodology:** [RU-DOWN-01 Unit Definition](../../../../../../target-modules/TM-DOMAIN-OWNER.md#ru-down-01--domain-semantic-contract).

`ZipArchiveTarget` represents one explicitly addressed existing local regular
ZIP file eligible as a project source.

```text
ZipArchiveTarget { absolutePath }
```

It is an immutable Value Object. Its resolved identity is the canonical local
regular file, not the input spelling, Windows case or a redirected link
spelling. It owns source identity and format eligibility only; extraction
destination, staging/publication, window policy and Workspace Trust remain
outside this Domain owner.

Invariants:

- one non-empty bounded absolute local path and no unknown fields;
- a case-insensitive `.zip` suffix;
- no UNC/device/drive-relative/URI/network form;
- resolution to an existing regular file, never a directory or absence;
- at most 4096 characters and no NUL; absolute local-path normalization rejects
  remaining control characters before resolution.

### Feature behavior realization

| Upstream behavior | Degree | Domain realization | Consuming Slice |
|---|---|---|---|
| [`FBS-STL-ARCHIVE-01`](../features/extract-open-archive.md#fbs-stl-archive-01) | PARTIAL | Establishes the archive-target form; request version/entry authority remain Slice-owned. | [`SL-STL-EXTRACT-OPEN-ARCHIVE`](../slices/extract-open-archive.md) |
| [`FBS-STL-ARCHIVE-02`](../features/extract-open-archive.md#fbs-stl-archive-02) | JOINT | Resolves the canonical eligible ZIP source; sibling destination derivation remains Slice-owned. | [`SL-STL-EXTRACT-OPEN-ARCHIVE`](../slices/extract-open-archive.md) |
| [`BR-STL-ARCHIVE-02`](../features/extract-open-archive.md#br-stl-archive-02) | FULL | Owns existing canonical local regular `.zip` eligibility before extraction. | [`SL-STL-EXTRACT-OPEN-ARCHIVE`](../slices/extract-open-archive.md) |
| [`FBS-STL-PROJECT-06`](../features/open-local-project.md#fbs-stl-project-06), [`BR-STL-PROJECT-05`](../features/open-local-project.md#br-stl-project-05) | PARTIAL | Supplies eligible ZIP source identity to the adaptive archive branch; extraction/publication is Slice/Shared-owned. | [`SL-STL-OPEN-LOCAL-PROJECT`](../slices/open-local-project.md) |
| [`FBS-STL-TRUST-01`](../features/copy-trusted-project.md#fbs-stl-trust-01) | PARTIAL | Supplies ZIP source eligibility after `ProjectSelector` chooses the archive branch. | [`SL-STL-COPY-TRUSTED-PROJECT`](../slices/copy-trusted-project.md) |

## RU-DOWN-02 — Domain Implementation Requirements

**Methodology:** [RU-DOWN-02 Unit Definition](../../../../../../target-modules/TM-DOMAIN-OWNER.md#ru-down-02--domain-implementation-requirements).

| Domain Implementation Requirement | Type | Plain implementation requirement | Realizes | Related expected errors | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="ir-domain-stl-zip-01"></a>`IR-DOMAIN-STL-ZIP-01 — Closed ZIP target construction` | Safety, Scope | Construction accepts only the declared absolute-path form and rejects unknown, empty, overlong, NUL-bearing or non-`.zip` values. | [`FBS-STL-ARCHIVE-01`](../features/extract-open-archive.md#fbs-stl-archive-01), [`BR-STL-ARCHIVE-02`](../features/extract-open-archive.md#br-stl-archive-02) | [`ERR-BEH-STL-ARCHIVE-REQUEST-INVALID-01`](../features/extract-open-archive.md#err-beh-stl-archive-request-invalid-01), [`ERR-BEH-STL-ARCHIVE-SOURCE-NOT-ELIGIBLE-02`](../features/extract-open-archive.md#err-beh-stl-archive-source-not-eligible-02) | Destination fields are not part of this value. |
| <a id="ir-domain-stl-zip-02"></a>`IR-DOMAIN-STL-ZIP-02 — Canonical local ZIP resolution` | Safety, Identity | Resolution establishes the canonical identity of an existing local regular ZIP before any extraction/publication effect. | [`FBS-STL-ARCHIVE-02`](../features/extract-open-archive.md#fbs-stl-archive-02), [`BR-STL-ARCHIVE-02`](../features/extract-open-archive.md#br-stl-archive-02), [`FBS-STL-PROJECT-06`](../features/open-local-project.md#fbs-stl-project-06), [`BR-STL-PROJECT-05`](../features/open-local-project.md#br-stl-project-05), [`FBS-STL-TRUST-01`](../features/copy-trusted-project.md#fbs-stl-trust-01) | [`ERR-BEH-STL-ARCHIVE-SOURCE-NOT-ELIGIBLE-02`](../features/extract-open-archive.md#err-beh-stl-archive-source-not-eligible-02), [`ERR-BEH-STL-PROJECT-SOURCE-BRANCH-REJECTED-05`](../features/open-local-project.md#err-beh-stl-project-source-branch-rejected-05), [`ERR-BEH-STL-TRUST-SOURCE-NOT-ELIGIBLE-02`](../features/copy-trusted-project.md#err-beh-stl-trust-source-not-eligible-02) | A valid suffix alone does not make a missing/non-file source eligible. |

Selected implementation relation: this owner consumes
[SH-STL-LOCAL-PATH-AUTHORITY](../shared/local-path-authority.md). Archive entry
safety and publication belong to
[SH-STL-SAFE-PROJECT-PUBLICATION](../shared/safe-project-publication.md), not to
the source Value Object.

## RU-DOWN-03 — Evolution Impact

**Methodology:** [RU-DOWN-03 Unit Definition](../../../../../../target-modules/TM-DOMAIN-OWNER.md#ru-down-03--evolution-impact).

Disposition: `OMITTED`.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md)
reads its future manifest from the final directory and does not change ZIP
source identity or eligibility.

## Proof / representation

Focused Domain proof covers strict construction, local absolute-path rules,
suffix eligibility and existing-regular-file resolution. Literal parsing,
filesystem adapters and tests remain implementation-native.
