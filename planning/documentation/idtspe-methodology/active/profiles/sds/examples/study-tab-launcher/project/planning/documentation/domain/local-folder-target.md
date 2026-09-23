# D-STL-LOCAL-FOLDER-TARGET — Local Folder Target

Status: active realized/current Domain Value Object owner used by current
folder/project/archive/trusted-project realization.

## RU-DOWN-01 — Domain Semantic Contract

**Methodology:** [RU-DOWN-01 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-OWNER.md#ru-down-01--domain-semantic-contract).

`FolderTarget` represents one explicitly addressed existing local directory
eligible for project-window handoff.

```text
FolderTarget { absolutePath }
```

It is an immutable Value Object whose resolved identity is the real local
directory rather than input spelling, slash style, Windows case or a redirected
link spelling. It has no mutable lifecycle or Aggregate boundary.

Invariants:

- exactly one non-empty absolute path and no unknown fields are present;
- Windows values are local-drive paths; UNC/device/drive-relative/URI/network
  forms are excluded;
- resolution yields an existing directory, not a file or absence;
- the path is at most 4096 characters and contains no NUL; local absolute-path
  normalization rejects remaining control characters before resolution.

The configured browser search root, folder discovery, forced-new-window
policy and VS Code effects remain outside this Domain owner.

### Feature behavior realization

| Upstream behavior | Degree | Domain realization | Consuming Slice |
|---|---|---|---|
| [`FBS-STL-FOLDER-01`](../features/open-linked-folder-window.md#fbs-stl-folder-01) | PARTIAL | Establishes the declared folder value shape; semantic-entry/version validation remains Slice-owned. | [`SL-STL-OPEN-FOLDER-WINDOW`](../slices/open-linked-folder-window.md) |
| [`FBS-STL-FOLDER-02`](../features/open-linked-folder-window.md#fbs-stl-folder-02), [`BR-STL-FOLDER-02`](../features/open-linked-folder-window.md#br-stl-folder-02) | FULL | Resolves one existing canonical local directory before window handoff. | [`SL-STL-OPEN-FOLDER-WINDOW`](../slices/open-linked-folder-window.md) |
| [`BR-STL-FOLDER-04`](../features/open-linked-folder-window.md#br-stl-folder-04) | PARTIAL | Restricts folder authority to one resolved directory; prohibitions on scanning, extraction, mutation, trust and refocus remain Slice/Feature concerns. | [`SL-STL-OPEN-FOLDER-WINDOW`](../slices/open-linked-folder-window.md) |
| [`FBS-STL-ARCHIVE-06`](../features/extract-open-archive.md#fbs-stl-archive-06), [`BR-STL-ARCHIVE-07`](../features/extract-open-archive.md#br-stl-archive-07) | PARTIAL | Supplies eligible final-directory identity after reuse/publication; forced-new-window and trust-neutral handoff remain Slice-owned. | [`SL-STL-EXTRACT-OPEN-ARCHIVE`](../slices/extract-open-archive.md) |
| [`FBS-STL-PROJECT-06`](../features/open-local-project.md#fbs-stl-project-06), [`BR-STL-PROJECT-05`](../features/open-local-project.md#br-stl-project-05) | PARTIAL | Supplies locality and existing-directory identity for the resolved folder branch and the final archive branch. | [`SL-STL-OPEN-LOCAL-PROJECT`](../slices/open-local-project.md) |
| [`FBS-STL-TRUST-02`](../features/copy-trusted-project.md#fbs-stl-trust-02), [`FBS-STL-TRUST-05`](../features/copy-trusted-project.md#fbs-stl-trust-05), [`BR-STL-TRUST-04`](../features/copy-trusted-project.md#br-stl-trust-04) | PARTIAL | Supplies canonical existing-directory meaning for the configured parent and final/reused child; no-link, overlap, destination and trust policy remain Slice-owned. | [`SL-STL-COPY-TRUSTED-PROJECT`](../slices/copy-trusted-project.md) |

The same value meaning is consumed as the final project directory by the
[archive](../slices/extract-open-archive.md),
[adaptive-project](../slices/open-local-project.md) and
[trusted-copy](../slices/copy-trusted-project.md) Slices; their source choice,
publication and result behavior remain outside this owner.

## RU-DOWN-02 — Domain Implementation Requirements

**Methodology:** [RU-DOWN-02 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-OWNER.md#ru-down-02--domain-implementation-requirements).

| Domain Implementation Requirement | Type | Plain implementation requirement | Realizes | Related expected errors | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="ir-domain-stl-folder-01"></a>`IR-DOMAIN-STL-FOLDER-01 — Closed folder construction` | Safety, Scope | Construction accepts only the declared absolute-path form and rejects unknown, empty, overlong or NUL-bearing fields. | [`FBS-STL-FOLDER-01`](../features/open-linked-folder-window.md#fbs-stl-folder-01) | [`ERR-BEH-STL-FOLDER-REQUEST-INVALID-01`](../features/open-linked-folder-window.md#err-beh-stl-folder-request-invalid-01) | Browser-relative input must be converted before this value is constructed. |
| <a id="ir-domain-stl-folder-02"></a>`IR-DOMAIN-STL-FOLDER-02 — Canonical local-directory resolution` | Safety, Identity | Resolution establishes the real identity of an existing local directory before any project-window effect. | [`FBS-STL-FOLDER-02`](../features/open-linked-folder-window.md#fbs-stl-folder-02), [`BR-STL-FOLDER-02`](../features/open-linked-folder-window.md#br-stl-folder-02), [`FBS-STL-ARCHIVE-06`](../features/extract-open-archive.md#fbs-stl-archive-06), [`FBS-STL-PROJECT-06`](../features/open-local-project.md#fbs-stl-project-06), [`FBS-STL-TRUST-02`](../features/copy-trusted-project.md#fbs-stl-trust-02), [`FBS-STL-TRUST-05`](../features/copy-trusted-project.md#fbs-stl-trust-05) | [`ERR-BEH-STL-FOLDER-TARGET-NOT-ELIGIBLE-02`](../features/open-linked-folder-window.md#err-beh-stl-folder-target-not-eligible-02), [`ERR-BEH-STL-TRUST-PARENT-NOT-ELIGIBLE-03`](../features/copy-trusted-project.md#err-beh-stl-trust-parent-not-eligible-03), [`ERR-BEH-STL-TRUST-DESTINATION-CONFLICT-04`](../features/copy-trusted-project.md#err-beh-stl-trust-destination-conflict-04) | Files, missing paths and network-style paths are not folder values; stricter trusted-location rules remain Slice-owned. |
| <a id="ir-domain-stl-folder-03"></a>`IR-DOMAIN-STL-FOLDER-03 — Deterministic folder identity` | Identity, Scope | One supplied absolute path determines one folder identity; recursive, fuzzy or first-match discovery cannot occur inside this owner. | [`BR-STL-FOLDER-04`](../features/open-linked-folder-window.md#br-stl-folder-04) | [`ERR-BEH-STL-FOLDER-TARGET-NOT-ELIGIBLE-02`](../features/open-linked-folder-window.md#err-beh-stl-folder-target-not-eligible-02) | Search-root conversion is an entry-adapter responsibility. |

Selected implementation relation: this owner consumes
[SH-STL-LOCAL-PATH-AUTHORITY](../shared/local-path-authority.md); folder
eligibility and identity remain Domain authority.

## RU-DOWN-03 — Evolution Impact

**Methodology:** [RU-DOWN-03 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-OWNER.md#ru-down-03--evolution-impact).

Disposition: `OMITTED`.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md)
consumes a final root but does not change `FolderTarget` semantics. Its future
manifest names belong to a separate Target Domain Body.

## Proof / representation

Focused Domain proof covers strict construction, local absolute-path rules,
real-directory resolution and file/missing/network rejection. Literal parsing,
filesystem adapters and tests remain implementation-native.
