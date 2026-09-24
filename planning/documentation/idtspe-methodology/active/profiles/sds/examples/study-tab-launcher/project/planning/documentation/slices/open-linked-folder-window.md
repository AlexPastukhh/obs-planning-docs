# SL-STL-OPEN-FOLDER-WINDOW — End-to-end folder project-window handoff

Status: active realized/current durable Slice owner for
[F-STL-OPEN-FOLDER-WINDOW](../features/open-linked-folder-window.md).

## RU-SOWN-01 — Slice Responsibility / Boundary Contract

**Methodology:** [RU-SOWN-01 Unit Definition](../../../../../../target-modules/TM-SLICE-OWNER.md#ru-sown-01--slice-responsibility--boundary-contract).

Responsibility: realize one complete folder-open operation from a typed
command/URI request through canonical local-directory resolution, one forced
project-window handoff and truthful outcome presentation.

Entry/result: [`FDO-STL-FOLDER-OPEN-REQUEST`](../features/open-linked-folder-window.md#fdo-stl-folder-open-request)
to [`FDO-STL-FOLDER-OPEN-OUTCOME`](../features/open-linked-folder-window.md#fdo-stl-folder-open-outcome).

### Behavior realization

| Upstream behavior | Degree | Slice realization | Domain / Shared owners |
|---|---|---|---|
| [`FBS-STL-FOLDER-01`](../features/open-linked-folder-window.md#fbs-stl-folder-01) | JOINT | Parses the semantic entry and rejects malformed requests before any folder/window effect. | [`D-STL-LOCAL-FOLDER-TARGET`](../domain/local-folder-target.md) |
| [`FBS-STL-FOLDER-02`](../features/open-linked-folder-window.md#fbs-stl-folder-02) | JOINT | Resolves the Domain value before calling the external window boundary. | [`D-STL-LOCAL-FOLDER-TARGET`](../domain/local-folder-target.md); [`SH-STL-LOCAL-PATH-AUTHORITY`](../shared/local-path-authority.md) |
| [`FBS-STL-FOLDER-03`](../features/open-linked-folder-window.md#fbs-stl-folder-03) | FULL | Performs one forced-new-window VS Code handoff and does not refocus the previous window after acceptance. | VS Code external effect boundary |
| [`FBS-STL-FOLDER-04`](../features/open-linked-folder-window.md#fbs-stl-folder-04) | FULL | Maps request rejection versus accepted-operation failure and reports the actual result. | Extension presentation boundary |
| [`SR-STL-FOLDER-01`](../scenarios/open-selected-folder.md#sr-stl-folder-01), [`SR-STL-FOLDER-02`](../scenarios/open-selected-folder.md#sr-stl-folder-02), [`SR-STL-FOLDER-03`](../scenarios/open-selected-folder.md#sr-stl-folder-03) | JOINT | Participates in selector continuity, deferred handoff and project-window continuity; polling/focus preparation comes from the composing project Slice/Shared capability. | [`SL-STL-OPEN-LOCAL-PROJECT`](open-local-project.md); [`SH-STL-PREPARED-PROJECT-HANDOFF`](../shared/prepared-project-handoff.md); browser/OS/VS Code |

The Slice does not search folders, inspect contents, extract, mutate, grant
trust or guarantee final OS foreground/window placement.

Whole-Slice proof enters through the typed folder operation and asserts no
window effect for invalid targets, exactly one gateway call for an eligible
folder and truthful gateway-failure reporting.

## RU-SOWN-02 — Slice Implementation Requirements

**Methodology:** [RU-SOWN-02 Unit Definition](../../../../../../target-modules/TM-SLICE-OWNER.md#ru-sown-02--slice-implementation-requirements).

| Slice Implementation Requirement | Type | Plain implementation requirement | Realizes | Related expected errors | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="ir-slice-stl-folder-01"></a>`IR-SLICE-STL-FOLDER-01 — Resolve before window effect` | Safety, Authority | Complete request parsing and canonical Domain resolution must succeed before the external folder-open gateway is invoked; the Slice accepts only the explicit folder operation and performs no content/extraction/trust behavior. | [`FBS-STL-FOLDER-01`](../features/open-linked-folder-window.md#fbs-stl-folder-01), [`FBS-STL-FOLDER-02`](../features/open-linked-folder-window.md#fbs-stl-folder-02), [`BR-STL-FOLDER-01`](../features/open-linked-folder-window.md#br-stl-folder-01), [`BR-STL-FOLDER-02`](../features/open-linked-folder-window.md#br-stl-folder-02), [`BR-STL-FOLDER-04`](../features/open-linked-folder-window.md#br-stl-folder-04) | [`ERR-BEH-STL-FOLDER-REQUEST-INVALID-01`](../features/open-linked-folder-window.md#err-beh-stl-folder-request-invalid-01), [`ERR-BEH-STL-FOLDER-TARGET-NOT-ELIGIBLE-02`](../features/open-linked-folder-window.md#err-beh-stl-folder-target-not-eligible-02) | Selected capability: [`SH-STL-LOCAL-PATH-AUTHORITY`](../shared/local-path-authority.md). |
| <a id="ir-slice-stl-folder-02"></a>`IR-SLICE-STL-FOLDER-02 — Single forced project-window handoff` | Effect Scope, Truthfulness | Invoke only the fixed folder gateway with forced-new-window policy once; map gateway acceptance/failure without adding workspace folders, trust mutation or previous-window refocus. | [`FBS-STL-FOLDER-03`](../features/open-linked-folder-window.md#fbs-stl-folder-03), [`FBS-STL-FOLDER-04`](../features/open-linked-folder-window.md#fbs-stl-folder-04), [`BR-STL-FOLDER-03`](../features/open-linked-folder-window.md#br-stl-folder-03), [`BR-STL-FOLDER-05`](../features/open-linked-folder-window.md#br-stl-folder-05) | [`ERR-BEH-STL-FOLDER-WINDOW-OPEN-FAILED-03`](../features/open-linked-folder-window.md#err-beh-stl-folder-window-open-failed-03) | Host may select an already-open window for the same project. |

## RU-SOWN-03 — Evolution Impact

**Methodology:** [RU-SOWN-03 Unit Definition](../../../../../../target-modules/TM-SLICE-OWNER.md#ru-sown-03--evolution-impact).

Disposition: `OMITTED`.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md)
adds a peer post-open Slice after this Slice succeeds; it does not change this
folder Slice's responsibility or requirements.

## Representation boundary

The literal resolver/gateway classes and tests remain code authority. This
artifact owns the durable end-to-end boundary and cross-owner relations.
