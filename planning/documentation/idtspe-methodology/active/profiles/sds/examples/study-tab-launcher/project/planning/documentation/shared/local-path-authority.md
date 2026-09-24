# SH-STL-LOCAL-PATH-AUTHORITY — Reusable local-path authority mechanics

Status: active realized/current Shared Implementation Capability. It is used
by multiple current Slices but owns no file/folder/archive/project semantics.

## RU-SHARED-01 — Shared Capability Contract

**Methodology:** [RU-SHARED-01 Unit Definition](../../../../../../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md#ru-shared-01--shared-capability-contract).

Capability ID: `SH-STL-LOCAL-PATH-AUTHORITY`.

Responsibility: provide one reusable implementation boundary for normalizing
supported local absolute/relative paths, comparing canonical local identities
and checking strict descendant containment with platform-correct path rules.

Provided mechanics:

- normalization of local absolute paths without accepting UNC, device,
  drive-relative, URI or network-style authority;
- normalization of traversal-free workspace-relative paths;
- platform-correct canonical comparison keys;
- strict descendant containment checks used before filesystem effects.

The capability does not decide whether a value is a `FileTarget`,
`FolderTarget`, `ZipArchiveTarget` or `ProjectSelector`; does not inspect which
filesystem type is semantically eligible; and does not select a destination,
operation, trust policy or user-visible result. Those meanings remain with the
Domain/Feature/Slice owners that consume it.

## RU-SHARED-02 — Consumer Requirement Bindings

**Methodology:** [RU-SHARED-02 Unit Definition](../../../../../../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md#ru-shared-02--consumer-requirement-bindings).

| Consumer Slice | Consumer requirement | Role | Participation |
|---|---|---|---|
| [`SL-STL-OPEN-LINKED-CONTEXT`](../slices/open-linked-file-context.md) | [`IR-SLICE-STL-FILE-01`](../slices/open-linked-file-context.md#ir-slice-stl-file-01) | CONTRIBUTES_TO | Supplies normalization, containment and canonical-key mechanics used by `D-STL-LOCAL-FILE-TARGET`; the Slice retains complete-request fencing. |
| [`SL-STL-OPEN-FOLDER-WINDOW`](../slices/open-linked-folder-window.md) | [`IR-SLICE-STL-FOLDER-01`](../slices/open-linked-folder-window.md#ir-slice-stl-folder-01) | CONTRIBUTES_TO | Supplies local absolute-path mechanics while `D-STL-LOCAL-FOLDER-TARGET` owns directory eligibility. |
| [`SL-STL-EXTRACT-OPEN-ARCHIVE`](../slices/extract-open-archive.md) | [`IR-SLICE-STL-ARCHIVE-01`](../slices/extract-open-archive.md#ir-slice-stl-archive-01) | CONTRIBUTES_TO | Supplies source normalization and staging/destination containment primitives; archive policy remains consumer-owned. |
| [`SL-STL-OPEN-LOCAL-PROJECT`](../slices/open-local-project.md) | [`IR-SLICE-STL-PROJECT-01`](../slices/open-local-project.md#ir-slice-stl-project-01) | CONTRIBUTES_TO | Supplies deterministic local candidate normalization used by the selector Domain owner. |
| [`SL-STL-COPY-TRUSTED-PROJECT`](../slices/copy-trusted-project.md) | [`IR-SLICE-STL-TRUST-02`](../slices/copy-trusted-project.md#ir-slice-stl-trust-02) | CONTRIBUTES_TO | Supplies canonical parent/source/destination comparison and strict containment; machine authority and reuse policy remain Slice-owned. |

## RU-SHARED-03 — Shared Capability Implementation Requirements

**Methodology:** [RU-SHARED-03 Unit Definition](../../../../../../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md#ru-shared-03--shared-capability-implementation-requirements).

| Shared Implementation Requirement | Type | Plain implementation requirement | Realizes / protects | Related expected errors | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="ir-shared-stl-path-01"></a>`IR-SHARED-STL-PATH-01 — Reject ambiguous external path authority` | Safety, Authority | Absolute normalization rejects unsupported network/device/URI/drive-relative forms and control characters; relative normalization rejects absolute/traversing/empty/colon-bearing segments before a consumer performs a local effect. | [`IR-SLICE-STL-FILE-01`](../slices/open-linked-file-context.md#ir-slice-stl-file-01), [`IR-SLICE-STL-FOLDER-01`](../slices/open-linked-folder-window.md#ir-slice-stl-folder-01), [`IR-SLICE-STL-ARCHIVE-01`](../slices/extract-open-archive.md#ir-slice-stl-archive-01), [`IR-SLICE-STL-PROJECT-01`](../slices/open-local-project.md#ir-slice-stl-project-01), [`IR-SLICE-STL-TRUST-02`](../slices/copy-trusted-project.md#ir-slice-stl-trust-02) | [`ERR-BEH-STL-FILE-TARGET-NOT-ELIGIBLE-02`](../features/open-linked-file-context.md#err-beh-stl-file-target-not-eligible-02), [`ERR-BEH-STL-FOLDER-TARGET-NOT-ELIGIBLE-02`](../features/open-linked-folder-window.md#err-beh-stl-folder-target-not-eligible-02), [`ERR-BEH-STL-ARCHIVE-SOURCE-NOT-ELIGIBLE-02`](../features/extract-open-archive.md#err-beh-stl-archive-source-not-eligible-02), [`ERR-BEH-STL-PROJECT-SOURCE-NOT-ELIGIBLE-03`](../features/open-local-project.md#err-beh-stl-project-source-not-eligible-03), [`ERR-BEH-STL-TRUST-PARENT-NOT-ELIGIBLE-03`](../features/copy-trusted-project.md#err-beh-stl-trust-parent-not-eligible-03) | Request construction rejects NUL; this capability does not decide whether the normalized object exists or has the right filesystem type. |
| <a id="ir-shared-stl-path-02"></a>`IR-SHARED-STL-PATH-02 — Platform-correct canonical comparison` | Identity, Consistency | Canonical keys must preserve platform path semantics, including ordinal case-insensitive comparison on Windows, so consumers cannot treat spelling variants as different local authority. | [`IR-DOMAIN-STL-FILE-03`](../domain/local-file-target.md#ir-domain-stl-file-03), [`IR-DOMAIN-STL-FOLDER-02`](../domain/local-folder-target.md#ir-domain-stl-folder-02), [`IR-SLICE-STL-ARCHIVE-01`](../slices/extract-open-archive.md#ir-slice-stl-archive-01), [`IR-SLICE-STL-TRUST-02`](../slices/copy-trusted-project.md#ir-slice-stl-trust-02) | [`ERR-BEH-STL-FILE-DUPLICATE-TARGET-03`](../features/open-linked-file-context.md#err-beh-stl-file-duplicate-target-03), [`ERR-BEH-STL-ARCHIVE-DESTINATION-CONFLICT-03`](../features/extract-open-archive.md#err-beh-stl-archive-destination-conflict-03), [`ERR-BEH-STL-TRUST-DESTINATION-CONFLICT-04`](../features/copy-trusted-project.md#err-beh-stl-trust-destination-conflict-04) | Equality policy remains attached to the consuming Domain/Slice. |
| <a id="ir-shared-stl-path-03"></a>`IR-SHARED-STL-PATH-03 — Strict descendant containment` | Safety, Effect Scope | Containment checks must reject equality, parent traversal and absolute-relative escapes under the active platform path rules. | [`IR-DOMAIN-STL-FILE-02`](../domain/local-file-target.md#ir-domain-stl-file-02), [`IR-SLICE-STL-ARCHIVE-01`](../slices/extract-open-archive.md#ir-slice-stl-archive-01), [`IR-SLICE-STL-TRUST-02`](../slices/copy-trusted-project.md#ir-slice-stl-trust-02) | [`ERR-BEH-STL-FILE-TARGET-NOT-ELIGIBLE-02`](../features/open-linked-file-context.md#err-beh-stl-file-target-not-eligible-02), [`ERR-BEH-STL-ARCHIVE-CONTENT-UNSAFE-04`](../features/extract-open-archive.md#err-beh-stl-archive-content-unsafe-04), [`ERR-BEH-STL-TRUST-DESTINATION-CONFLICT-04`](../features/copy-trusted-project.md#err-beh-stl-trust-destination-conflict-04) | Filesystem real-path resolution is performed by the consumer when link resolution matters. |

No `ERR-IMP-SHARED-*` family is material: current failures are translated into
the consuming Feature's target, content or destination error meaning.

## RU-SHARED-04 — Evolution Impact

**Methodology:** [RU-SHARED-04 Unit Definition](../../../../../../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md#ru-shared-04--evolution-impact).

Disposition: `OMITTED`.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md) may
reuse local-path mechanics during realization, but it contains no current or
Target Shared Body changing this capability or its current bindings.

## Proof / representation

Focused implementation-native proof covers Windows/POSIX normalization,
relative traversal rejection, canonical case behavior and containment edges.
Consumer Slice proof establishes the actual forbidden filesystem effects.
Current executable representation is centered in
[`src/shared/local-path-authority/pathSafety.ts`](../../../src/shared/local-path-authority/pathSafety.ts); this artifact preserves the
cross-Slice contract and binding inventory.
