# D-STL-LOCAL-PROJECT-SELECTOR — Local Project Selector

Status: active realized/current Domain Value Object and resolution-policy
owner shared by adaptive project opening and trusted-project publication.

## RU-DOWN-01 — Domain Semantic Contract

**Methodology:** [RU-DOWN-01 Unit Definition](../../../../../../target-modules/TM-DOMAIN-OWNER.md#ru-down-01--domain-semantic-contract).

`ProjectSelector` represents one explicit absolute local candidate that may
identify an existing project directory, an explicit ZIP, or an extensionless
stem with exactly one implicit `.zip` candidate.

```text
ProjectSelector { absolutePath }

ResolvedProjectSource
  = FolderSource { folderPath }
  | ArchiveSource { ZipArchiveTarget, destinationPath }
```

The selector is an immutable pre-resolution Value Object. It is not yet a
`FolderTarget` or `ZipArchiveTarget` and grants no destination/trust authority.

Invariants and resolution rules:

1. The value contains one non-empty bounded path string, no unknown fields and
   no NUL; resolution establishes absolute local authority and rejects
   UNC/device/drive-relative/URI/network/control-character forms.
2. An exact existing directory selects the folder source.
3. An exact existing regular `.zip` file selects the archive source.
4. Only when the exact extensionless path is absent, the same path plus
   `.zip` is considered.
5. An exact non-ZIP file or unsupported object is an ineligible collision and
   blocks implicit fallback.
6. Pure absence remains distinguishable from an ineligible/present candidate
   so a consumer may retry absence without retrying invalid state.

### Feature behavior realization

| Upstream behavior | Degree | Domain realization | Consuming Slice |
|---|---|---|---|
| [`FBS-STL-PROJECT-01`](../features/open-local-project.md#fbs-stl-project-01) | PARTIAL | Establishes the selector form; request version/wait validation and entry authority remain Slice-owned. | [`SL-STL-OPEN-LOCAL-PROJECT`](../slices/open-local-project.md) |
| [`BR-STL-PROJECT-02`](../features/open-local-project.md#br-stl-project-02) | JOINT | Owns absolute local selector meaning and extension-owned source classification; the Slice owns the complete request and operation scope. | [`SL-STL-OPEN-LOCAL-PROJECT`](../slices/open-local-project.md) |
| [`FBS-STL-PROJECT-02`](../features/open-local-project.md#fbs-stl-project-02) | JOINT | Supplies deterministic source resolution and absence classification; the Slice owns bounded polling and terminal mapping. | [`SL-STL-OPEN-LOCAL-PROJECT`](../slices/open-local-project.md) |
| [`BR-STL-PROJECT-03`](../features/open-local-project.md#br-stl-project-03), [`BR-STL-PROJECT-04`](../features/open-local-project.md#br-stl-project-04) | FULL | Owns the exact candidates, optional `.zip` suffix, directory precedence and collision blocking. | [`SL-STL-OPEN-LOCAL-PROJECT`](../slices/open-local-project.md) |
| [`BR-STL-PROJECT-07`](../features/open-local-project.md#br-stl-project-07) | PARTIAL | Supplies the stable candidate set and pure-absence result required for safe polling; time bounds and retry orchestration remain Slice/Shared-owned. | [`SL-STL-OPEN-LOCAL-PROJECT`](../slices/open-local-project.md) |
| [`FBS-STL-TRUST-01`](../features/copy-trusted-project.md#fbs-stl-trust-01) | JOINT | Supplies the same source-selection meaning to trusted publication without accepting a destination from the request. | [`SL-STL-COPY-TRUSTED-PROJECT`](../slices/copy-trusted-project.md) |

## RU-DOWN-02 — Domain Implementation Requirements

**Methodology:** [RU-DOWN-02 Unit Definition](../../../../../../target-modules/TM-DOMAIN-OWNER.md#ru-down-02--domain-implementation-requirements).

| Domain Implementation Requirement | Type | Plain implementation requirement | Realizes | Related expected errors | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="ir-domain-stl-project-01"></a>`IR-DOMAIN-STL-PROJECT-01 — Closed selector construction` | Safety, Scope | Construction accepts one bounded selector string and rejects extra fields, emptiness, NUL and caller-supplied source/destination policy. | [`FBS-STL-PROJECT-01`](../features/open-local-project.md#fbs-stl-project-01), [`BR-STL-PROJECT-02`](../features/open-local-project.md#br-stl-project-02), [`FBS-STL-TRUST-01`](../features/copy-trusted-project.md#fbs-stl-trust-01) | [`ERR-BEH-STL-PROJECT-REQUEST-INVALID-01`](../features/open-local-project.md#err-beh-stl-project-request-invalid-01), [`ERR-BEH-STL-TRUST-REQUEST-INVALID-01`](../features/copy-trusted-project.md#err-beh-stl-trust-request-invalid-01) | Browser search-root conversion normally supplies an absolute value before construction. |
| <a id="ir-domain-stl-project-02"></a>`IR-DOMAIN-STL-PROJECT-02 — Deterministic exact-source resolution` | Identity, Safety | Resolution first establishes an absolute local selector, then evaluates only its exact path and permitted implicit ZIP sibling with directory-first precedence and collision blocking. | [`FBS-STL-PROJECT-02`](../features/open-local-project.md#fbs-stl-project-02), [`BR-STL-PROJECT-03`](../features/open-local-project.md#br-stl-project-03), [`BR-STL-PROJECT-04`](../features/open-local-project.md#br-stl-project-04), [`FBS-STL-TRUST-01`](../features/copy-trusted-project.md#fbs-stl-trust-01) | [`ERR-BEH-STL-PROJECT-SOURCE-NOT-ELIGIBLE-03`](../features/open-local-project.md#err-beh-stl-project-source-not-eligible-03), [`ERR-BEH-STL-TRUST-SOURCE-NOT-ELIGIBLE-02`](../features/copy-trusted-project.md#err-beh-stl-trust-source-not-eligible-02) | Relative, network, recursive and fuzzy discovery remain excluded. |
| <a id="ir-domain-stl-project-03"></a>`IR-DOMAIN-STL-PROJECT-03 — Absence is a distinct resolution result` | Outcome, Recovery | Pure candidate absence is distinguishable from present-but-ineligible objects and unexpected filesystem failure so consumers retry only the supported absence condition. | [`FBS-STL-PROJECT-02`](../features/open-local-project.md#fbs-stl-project-02), [`BR-STL-PROJECT-07`](../features/open-local-project.md#br-stl-project-07), [`FBS-STL-TRUST-01`](../features/copy-trusted-project.md#fbs-stl-trust-01) | [`ERR-BEH-STL-PROJECT-SOURCE-WAIT-TIMED-OUT-02`](../features/open-local-project.md#err-beh-stl-project-source-wait-timed-out-02), [`ERR-BEH-STL-PROJECT-SOURCE-NOT-ELIGIBLE-03`](../features/open-local-project.md#err-beh-stl-project-source-not-eligible-03) | A non-ZIP exact file fails immediately even when waiting was requested. |

Selected implementation relation: reusable local-path mechanics come from
[SH-STL-LOCAL-PATH-AUTHORITY](../shared/local-path-authority.md). Polling and
browser/VS Code continuity belong to Slice/Shared realization, not this Domain.

<!-- Compatibility anchor: earlier references now resolve to ordinary Unit content, not a retained Decision body. -->
<a id="dec-stl-project-selector-01"></a>
### Exact-selector rationale

The request supplies one neutral local selector. Resolution considers its exact path and, only for an absent extensionless exact path, one `.zip` candidate; an exact directory wins and an exact collision blocks fallback.

The closed candidate set supports short arrival polling and deterministic behavior without recursive/fuzzy discovery.

This boundary addresses browser inability to inspect the local filesystem without forcing ChatGPT/userscript input to encode folder-versus-archive logic.

Related requirements and realization: Domain invariants 2–6, [`IR-DOMAIN-STL-PROJECT-02`](#ir-domain-stl-project-02) and both consuming project Slices.

Revisit this boundary when user-selected search semantics intentionally expand beyond the exact path plus one suffix candidate.

Source context: accepted conclusions from the former adaptive-project design-selection record, revalidated by the SDS audit on 2026-09-23.

## RU-DOWN-03 — Evolution Impact

**Methodology:** [RU-DOWN-03 Unit Definition](../../../../../../target-modules/TM-DOMAIN-OWNER.md#ru-down-03--evolution-impact).

Disposition: `OMITTED`.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md)
does not add close targets to `ProjectSelector`; future superseded names come
only from its separate manifest Target Domain Body.

## Proof / representation

Focused Domain proof covers strict selector construction, directory precedence,
optional ZIP lookup, collision rejection and absence classification. Exact
filesystem calls and tests remain implementation-native.
