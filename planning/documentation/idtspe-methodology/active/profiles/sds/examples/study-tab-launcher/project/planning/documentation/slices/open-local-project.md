# SL-STL-OPEN-LOCAL-PROJECT — Adaptive local project opening

Status: active realized/current durable Slice owner for
[F-STL-OPEN-LOCAL-PROJECT](../features/open-local-project.md). The coordinator
race is owned by a selected Shared dependency, not duplicated here.

## RU-SOWN-01 — Slice Responsibility / Boundary Contract

**Methodology:** [RU-SOWN-01 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-OWNER.md#ru-sown-01--slice-responsibility--boundary-contract).

Responsibility: realize one adaptive project operation from a typed selector
through exact source resolution/arrival waiting, optional browser-to-owner
handoff, folder/ZIP branch execution and truthful combined result.

Entry/result: [`FDO-STL-PROJECT-OPEN-REQUEST`](../features/open-local-project.md#fdo-stl-project-open-request)
to [`FDO-STL-PROJECT-OPEN-OUTCOME`](../features/open-local-project.md#fdo-stl-project-open-outcome),
with prepared authority represented by
[`FDO-STL-PREPARED-PROJECT-LAUNCH`](../features/open-local-project.md#fdo-stl-prepared-project-launch).

Direct VS Code invocation is an entry variant that skips browser focus transfer;
folder and ZIP are Slice branches, not caller-selected operations.

### Behavior realization

| Upstream behavior | Degree | Slice realization | Domain / Shared owners |
|---|---|---|---|
| [`FBS-STL-PROJECT-01`](../features/open-local-project.md#fbs-stl-project-01) | JOINT | Parses request/version/wait and constructs one selector before project effects. | [`D-STL-LOCAL-PROJECT-SELECTOR`](../domain/local-project-selector.md) |
| [`FBS-STL-PROJECT-02`](../features/open-local-project.md#fbs-stl-project-02) | JOINT | Coordinates immediate/bounded resolution using the Domain's fixed candidates and absence classification. | [`D-STL-LOCAL-PROJECT-SELECTOR`](../domain/local-project-selector.md); [`SH-STL-PREPARED-PROJECT-HANDOFF`](../shared/prepared-project-handoff.md) |
| [`FBS-STL-PROJECT-03`](../features/open-local-project.md#fbs-stl-project-03), [`FBS-STL-PROJECT-04`](../features/open-local-project.md#fbs-stl-project-04), [`FBS-STL-PROJECT-05`](../features/open-local-project.md#fbs-stl-project-05) | JOINT | Selects the ordinary-project operation and consumes prepared authority/focus/redemption without exposing project data in the focus URI. | [`SH-STL-PREPARED-PROJECT-HANDOFF`](../shared/prepared-project-handoff.md); browser/OS/VS Code |
| [`FBS-STL-PROJECT-06`](../features/open-local-project.md#fbs-stl-project-06) | JOINT | Dispatches the resolved folder or ZIP branch and preserves each branch's safety policy. | [`D-STL-LOCAL-FOLDER-TARGET`](../domain/local-folder-target.md), [`D-STL-LOCAL-ZIP-ARCHIVE-TARGET`](../domain/local-zip-archive-target.md), [`SH-STL-SAFE-PROJECT-PUBLICATION`](../shared/safe-project-publication.md) |
| [`FBS-STL-PROJECT-07`](../features/open-local-project.md#fbs-stl-project-07) | FULL | Maps branch/disposition/status into one combined outcome and presents it through the invoking channel. | Extension/browser result boundary |
| [`SR-STL-PROJECT-01`](../scenarios/open-selected-project.md#sr-stl-project-01), [`SR-STL-PROJECT-02`](../scenarios/open-selected-project.md#sr-stl-project-02), [`SR-STL-PROJECT-03`](../scenarios/open-selected-project.md#sr-stl-project-03) | JOINT | Preserves selector-to-operation correlation, recoverable deferred handoff and previous-workspace continuity across browser/VS Code boundaries. | [ChatGPT Screen](../screens/chatgpt-launcher-widget.md); [`SH-STL-PREPARED-PROJECT-HANDOFF`](../shared/prepared-project-handoff.md); VS Code |

This Slice does not own target Value Object semantics, reusable publication or
handoff mechanics, branch Feature behavior, Workspace Trust or final host
window placement.

Whole-Slice proof covers directory, explicit/implicit ZIP, precedence,
collision, delayed arrival, timeout, handoff gating, both source branches and
truthful terminal outcomes.

## RU-SOWN-02 — Slice Implementation Requirements

**Methodology:** [RU-SOWN-02 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-OWNER.md#ru-sown-02--slice-implementation-requirements).

| Slice Implementation Requirement | Type | Plain implementation requirement | Realizes | Related expected errors | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="ir-slice-stl-project-01"></a>`IR-SLICE-STL-PROJECT-01 — Fixed selector candidates and bounded absence waiting` | Safety, Recovery | Validate one adaptive-project request/selector/wait bound, use only Domain-selected exact candidates and retry only pure absence until the accepted deadline; caller-selected folder/ZIP operations are not accepted on this entry. | [`FBS-STL-PROJECT-01`](../features/open-local-project.md#fbs-stl-project-01), [`FBS-STL-PROJECT-02`](../features/open-local-project.md#fbs-stl-project-02), [`BR-STL-PROJECT-01`](../features/open-local-project.md#br-stl-project-01), [`BR-STL-PROJECT-02`](../features/open-local-project.md#br-stl-project-02), [`BR-STL-PROJECT-03`](../features/open-local-project.md#br-stl-project-03), [`BR-STL-PROJECT-04`](../features/open-local-project.md#br-stl-project-04), [`BR-STL-PROJECT-07`](../features/open-local-project.md#br-stl-project-07) | [`ERR-BEH-STL-PROJECT-REQUEST-INVALID-01`](../features/open-local-project.md#err-beh-stl-project-request-invalid-01), [`ERR-BEH-STL-PROJECT-SOURCE-WAIT-TIMED-OUT-02`](../features/open-local-project.md#err-beh-stl-project-source-wait-timed-out-02), [`ERR-BEH-STL-PROJECT-SOURCE-NOT-ELIGIBLE-03`](../features/open-local-project.md#err-beh-stl-project-source-not-eligible-03) | Uses [`D-STL-LOCAL-PROJECT-SELECTOR`](../domain/local-project-selector.md) and [`SH-STL-LOCAL-PATH-AUTHORITY`](../shared/local-path-authority.md). |
| <a id="ir-slice-stl-project-02"></a>`IR-SLICE-STL-PROJECT-02 — Prepared owner handoff before browser-originated effects` | Authority, Continuity | For the browser route, bind one prepared ordinary-project operation, expose only opaque authority, require owning-window focus acknowledgement and permit at most one dispatch. | [`FBS-STL-PROJECT-03`](../features/open-local-project.md#fbs-stl-project-03), [`FBS-STL-PROJECT-04`](../features/open-local-project.md#fbs-stl-project-04), [`FBS-STL-PROJECT-05`](../features/open-local-project.md#fbs-stl-project-05), [`BR-STL-PROJECT-06`](../features/open-local-project.md#br-stl-project-06), [`BR-STL-PROJECT-08`](../features/open-local-project.md#br-stl-project-08) | [`ERR-BEH-STL-PROJECT-HANDOFF-NOT-ESTABLISHED-04`](../features/open-local-project.md#err-beh-stl-project-handoff-not-established-04) | Selected capability: [`SH-STL-PREPARED-PROJECT-HANDOFF`](../shared/prepared-project-handoff.md). |
| <a id="ir-slice-stl-project-03"></a>`IR-SLICE-STL-PROJECT-03 — Preserve selected branch safety` | Safety, Effect Scope | A resolved folder performs only project-window handoff; a resolved ZIP uses bounded no-overwrite publication/reuse before handoff, and neither branch changes Workspace Trust. | [`FBS-STL-PROJECT-06`](../features/open-local-project.md#fbs-stl-project-06), [`BR-STL-PROJECT-05`](../features/open-local-project.md#br-stl-project-05) | [`ERR-BEH-STL-PROJECT-SOURCE-BRANCH-REJECTED-05`](../features/open-local-project.md#err-beh-stl-project-source-branch-rejected-05), [`ERR-BEH-STL-PROJECT-OPEN-FAILED-06`](../features/open-local-project.md#err-beh-stl-project-open-failed-06) | ZIP module binding: [`SH-STL-SAFE-PROJECT-PUBLICATION`](../shared/safe-project-publication.md). |
| <a id="ir-slice-stl-project-04"></a>`IR-SLICE-STL-PROJECT-04 — Combined result preserves branch truth` | Truthfulness, Visibility | Map source kind, extraction disposition, final folder and status from the actual branch; no preparation/focus/gateway acceptance alone may be reported as complete opening. | [`FBS-STL-PROJECT-07`](../features/open-local-project.md#fbs-stl-project-07), [`BR-STL-PROJECT-09`](../features/open-local-project.md#br-stl-project-09) | [`ERR-BEH-STL-PROJECT-OPEN-FAILED-06`](../features/open-local-project.md#err-beh-stl-project-open-failed-06) | Host foreground certainty remains external evidence. |

## RU-SOWN-03 — Evolution Impact

**Methodology:** [RU-SOWN-03 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-OWNER.md#ru-sown-03--evolution-impact).

Disposition: `OMITTED` for this Slice boundary.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md)
adds a separate post-open Feature/Slice after this Slice's successful result.
The current handoff Shared capability has a material reverse projection because
its coordinator will be extended; this Slice's source/open responsibility is
not replaced.

## Representation boundary

Literal resolver/polling/server/launcher/gateway calls and tests remain code
authority. This file owns the stable whole-path responsibility and dependency
bindings.
