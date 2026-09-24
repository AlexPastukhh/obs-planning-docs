# D-STL-LOCAL-FILE-TARGET — Local File Target

Status: active realized/current Domain Value Object owner. It owns file-target
value meaning used by the current file-context Slice; it does not own request
cardinality, tab policy or editor effects.

## RU-DOWN-01 — Domain Semantic Contract

**Methodology:** [RU-DOWN-01 Unit Definition](../../../../../../target-modules/TM-DOMAIN-OWNER.md#ru-down-01--domain-semantic-contract).

`FileTarget` represents one explicitly addressed existing local regular file.
It owns target-form validity, workspace-relative containment and canonical
file equality shared by the one-file and ordered-file-set entries.

```text
FileTarget
  = AbsoluteFileTarget { absolutePath }
  | WorkspaceFileTarget { workspaceFolder?, relativePath }
```

It is an immutable Value Object. Before resolution, equality is whole selected
value. After resolution, semantic file equality follows canonical local
filesystem identity rather than input spelling, slash style or Windows case.
It has no Entity lifecycle or Aggregate boundary.

Invariants:

- exactly one target form is present;
- absolute values denote local paths, not UNC/device/network/URI forms;
- workspace-relative values remain below the selected real workspace root;
- resolution yields an existing regular file, never a directory or absence;
- path values are at most 4096 characters and contain no NUL; absolute local
  normalization additionally rejects control characters before resolution;
- different representations of one canonical file have one resolved identity.

### Feature behavior realization

| Upstream behavior | Degree | Domain realization | Consuming Slice |
|---|---|---|---|
| [`FBS-STL-FILE-01`](../features/open-linked-file-context.md#fbs-stl-file-01), [`BR-STL-03`](../features/open-linked-file-context.md#br-stl-03) | PARTIAL | Establishes valid target forms and one eligible file value; request version/cardinality remain Slice-owned. | [`SL-STL-OPEN-LINKED-CONTEXT`](../slices/open-linked-file-context.md) |
| [`FBS-STL-FILE-02`](../features/open-linked-file-context.md#fbs-stl-file-02) | JOINT | Resolves each value to an existing canonical local regular file; the Slice coordinates resolution of the complete set before effects. | [`SL-STL-OPEN-LINKED-CONTEXT`](../slices/open-linked-file-context.md) |
| [`BR-STL-05`](../features/open-linked-file-context.md#br-stl-05) | FULL | Owns regular-local-file eligibility, absolute outside-workspace authority and real-workspace containment for relative values. | [`SL-STL-OPEN-LINKED-CONTEXT`](../slices/open-linked-file-context.md) |
| [`FBS-STL-FILE-03`](../features/open-linked-file-context.md#fbs-stl-file-03), [`BR-STL-04`](../features/open-linked-file-context.md#br-stl-04), [`BR-STL-06`](../features/open-linked-file-context.md#br-stl-06) | JOINT | Supplies canonical identity; the Slice performs request-wide uniqueness and fences editor effects until all values resolve. | [`SL-STL-OPEN-LINKED-CONTEXT`](../slices/open-linked-file-context.md) |

The Feature remains canonical for behavior and outcomes. This owner contributes
value semantics only; it does not restate the behavior requirements above.

## RU-DOWN-02 — Domain Implementation Requirements

**Methodology:** [RU-DOWN-02 Unit Definition](../../../../../../target-modules/TM-DOMAIN-OWNER.md#ru-down-02--domain-implementation-requirements).

| Domain Implementation Requirement | Type | Plain implementation requirement | Realizes | Related expected errors | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="ir-domain-stl-file-01"></a>`IR-DOMAIN-STL-FILE-01 — Closed target construction` | Safety, Scope | Construction accepts exactly one declared target form and rejects unknown, mixed, empty, overlong or NUL-bearing fields. | [`FBS-STL-FILE-01`](../features/open-linked-file-context.md#fbs-stl-file-01), [`BR-STL-03`](../features/open-linked-file-context.md#br-stl-03), [`BR-STL-05`](../features/open-linked-file-context.md#br-stl-05) | [`ERR-BEH-STL-FILE-REQUEST-INVALID-01`](../features/open-linked-file-context.md#err-beh-stl-file-request-invalid-01), [`ERR-BEH-STL-FILE-TARGET-NOT-ELIGIBLE-02`](../features/open-linked-file-context.md#err-beh-stl-file-target-not-eligible-02) | Absolute and workspace-relative fields cannot be mixed. |
| <a id="ir-domain-stl-file-02"></a>`IR-DOMAIN-STL-FILE-02 — Local regular-file resolution` | Safety, Identity | Resolution establishes a real existing regular local file; an absolute value may be outside workspaces, while a workspace-relative value cannot escape its selected real root. | [`FBS-STL-FILE-02`](../features/open-linked-file-context.md#fbs-stl-file-02), [`BR-STL-05`](../features/open-linked-file-context.md#br-stl-05), [`BR-STL-06`](../features/open-linked-file-context.md#br-stl-06) | [`ERR-BEH-STL-FILE-TARGET-NOT-ELIGIBLE-02`](../features/open-linked-file-context.md#err-beh-stl-file-target-not-eligible-02) | Symlink resolution cannot turn a workspace-relative value into outside authority. |
| <a id="ir-domain-stl-file-03"></a>`IR-DOMAIN-STL-FILE-03 — Canonical file equality` | Identity, Consistency | Resolution supplies a platform-correct canonical key so equal local files remain equal across supported target forms and Windows case differences. | [`FBS-STL-FILE-03`](../features/open-linked-file-context.md#fbs-stl-file-03), [`BR-STL-04`](../features/open-linked-file-context.md#br-stl-04), [`BR-STL-06`](../features/open-linked-file-context.md#br-stl-06) | [`ERR-BEH-STL-FILE-DUPLICATE-TARGET-03`](../features/open-linked-file-context.md#err-beh-stl-file-duplicate-target-03) | Request-wide duplicate rejection remains Slice responsibility. |

Selected implementation relation: this owner consumes
[SH-STL-LOCAL-PATH-AUTHORITY](../shared/local-path-authority.md) for reusable
normalization, canonical-key and containment mechanics. The Shared capability
does not decide `FileTarget` eligibility or equality semantics.

## RU-DOWN-03 — Evolution Impact

**Methodology:** [RU-DOWN-03 Unit Definition](../../../../../../target-modules/TM-DOMAIN-OWNER.md#ru-down-03--evolution-impact).

Disposition: `OMITTED`.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md)
does not change local file identity, validity or equality.

## Proof / representation

Focused Domain proof covers exclusive forms, local/absolute validity,
workspace containment, canonical equality and rejection of missing files or
directories. Exact parsing, filesystem calls and tests remain
implementation-native in source/types/tests; this artifact preserves the
cross-owner semantics and realization links that code alone does not expose.
