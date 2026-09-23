# SL-STL-OPEN-LINKED-CONTEXT — End-to-end local file-context opening

Status: active realized/current durable Slice owner for
[F-STL-OPEN-LINKED-CONTEXT](../features/open-linked-file-context.md).

## RU-SOWN-01 — Slice Responsibility / Boundary Contract

**Methodology:** [RU-SOWN-01 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-OWNER.md#ru-sown-01--slice-responsibility--boundary-contract).

Responsibility: realize one complete one-file or ordered-file-set operation
from a declared command/URI request through validation, local target
resolution, receiving-window focus, optional tab preparation, ordered opening
and truthful presentation of the actual result.

Semantic entries/results:

- [`FDO-STL-FILE-OPEN-REQUEST`](../features/open-linked-file-context.md#fdo-stl-file-open-request);
- [`FDO-STL-FILE-SET-OPEN-REQUEST`](../features/open-linked-file-context.md#fdo-stl-file-set-open-request);
- [`FDO-STL-FILE-OPEN-OUTCOME`](../features/open-linked-file-context.md#fdo-stl-file-open-outcome).

The one/set and `add`/`closeOthers` variants are branches of one Slice. URI,
command and ChatGPT-widget invocation are entry adapters, not separate Slices.

### Behavior realization

| Upstream behavior | Degree | Slice realization | Domain / Shared owners |
|---|---|---|---|
| [`FBS-STL-FILE-01`](../features/open-linked-file-context.md#fbs-stl-file-01) | JOINT | Selects/parses the semantic entry and fences effects until the whole request is structurally valid. | [`D-STL-LOCAL-FILE-TARGET`](../domain/local-file-target.md) for target construction |
| [`FBS-STL-FILE-02`](../features/open-linked-file-context.md#fbs-stl-file-02) | JOINT | Resolves the complete ordered target set before editor effects. | [`D-STL-LOCAL-FILE-TARGET`](../domain/local-file-target.md); [`SH-STL-LOCAL-PATH-AUTHORITY`](../shared/local-path-authority.md) |
| [`FBS-STL-FILE-03`](../features/open-linked-file-context.md#fbs-stl-file-03) | JOINT | Builds request-wide uniqueness from Domain-supplied canonical identities. | [`D-STL-LOCAL-FILE-TARGET`](../domain/local-file-target.md) |
| [`FBS-STL-FILE-04`](../features/open-linked-file-context.md#fbs-stl-file-04) | FULL | Focuses the receiving VS Code window before intentional tab mutation. | VS Code external effect boundary |
| [`FBS-STL-FILE-05`](../features/open-linked-file-context.md#fbs-stl-file-05) | FULL | Applies the action-selected tab branch and stops opening when VS Code refuses complete unrelated-tab closure. | VS Code dirty-editor authority |
| [`FBS-STL-FILE-06`](../features/open-linked-file-context.md#fbs-stl-file-06) | FULL | Opens in supplied order and re-reveals the first target for a set. | Resolved [`D-STL-LOCAL-FILE-TARGET`](../domain/local-file-target.md) values; VS Code editor gateway |
| [`FBS-STL-FILE-07`](../features/open-linked-file-context.md#fbs-stl-file-07) | FULL | Maps the actual opened subset/status, presents it and performs only non-repeating bounded post-URI focus retries. | VS Code presentation boundary |
| [`SR-STL-FILE-01`](../scenarios/open-selected-study-files.md#sr-stl-file-01), [`SR-STL-FILE-02`](../scenarios/open-selected-study-files.md#sr-stl-file-02), [`SR-STL-FILE-03`](../scenarios/open-selected-study-files.md#sr-stl-file-03) | JOINT | Preserves copied selection/order and action authority across the Screen adapter and extension while keeping blocked handoff recoverable/truthful. | [ChatGPT Screen](../screens/chatgpt-launcher-widget.md); browser/OS external boundary |

Slice boundary excludes upstream file selection/study planning, Domain target
semantics, VS Code dirty-content decisions, editor association/preview policy
and final OS foreground guarantees.

Whole-Slice proof enters through the typed one/set operation and asserts
complete pre-effect validation, requested tab behavior, ordered outcomes,
partial failure truthfulness and forbidden target opening after cancellation.

## RU-SOWN-02 — Slice Implementation Requirements

**Methodology:** [RU-SOWN-02 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-OWNER.md#ru-sown-02--slice-implementation-requirements).

| Slice Implementation Requirement | Type | Plain implementation requirement | Realizes | Related expected errors | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="ir-slice-stl-file-01"></a>`IR-SLICE-STL-FILE-01 — Complete target validation before editor effects` | Safety, Consistency | Parse the complete request, resolve every target and reject canonical duplicates before focus, tab closure or opening begins; accept only the declared one/set operations and their action-owned policies. | [`FBS-STL-FILE-01`](../features/open-linked-file-context.md#fbs-stl-file-01), [`FBS-STL-FILE-02`](../features/open-linked-file-context.md#fbs-stl-file-02), [`FBS-STL-FILE-03`](../features/open-linked-file-context.md#fbs-stl-file-03), [`BR-STL-01`](../features/open-linked-file-context.md#br-stl-01), [`BR-STL-02`](../features/open-linked-file-context.md#br-stl-02), [`BR-STL-02A`](../features/open-linked-file-context.md#br-stl-02a), [`BR-STL-03`](../features/open-linked-file-context.md#br-stl-03), [`BR-STL-05`](../features/open-linked-file-context.md#br-stl-05), [`BR-STL-06`](../features/open-linked-file-context.md#br-stl-06), [`BR-STL-10`](../features/open-linked-file-context.md#br-stl-10) | [`ERR-BEH-STL-FILE-REQUEST-INVALID-01`](../features/open-linked-file-context.md#err-beh-stl-file-request-invalid-01), [`ERR-BEH-STL-FILE-TARGET-NOT-ELIGIBLE-02`](../features/open-linked-file-context.md#err-beh-stl-file-target-not-eligible-02), [`ERR-BEH-STL-FILE-DUPLICATE-TARGET-03`](../features/open-linked-file-context.md#err-beh-stl-file-duplicate-target-03) | Selected capability: [`SH-STL-LOCAL-PATH-AUTHORITY`](../shared/local-path-authority.md). |
| <a id="ir-slice-stl-file-02"></a>`IR-SLICE-STL-FILE-02 — Dirty-tab authority fence` | User Decision, Safety | `closeOthers` must use VS Code's protected tab-closing boundary, treat incomplete closure as cancellation and begin no target opening afterward. | [`FBS-STL-FILE-05`](../features/open-linked-file-context.md#fbs-stl-file-05), [`BR-STL-07`](../features/open-linked-file-context.md#br-stl-07), [`BR-STL-08`](../features/open-linked-file-context.md#br-stl-08) | [`ERR-BEH-STL-FILE-TAB-PREPARATION-CANCELLED-05`](../features/open-linked-file-context.md#err-beh-stl-file-tab-preparation-cancelled-05), [`ERR-BEH-STL-FILE-TAB-PREPARATION-FAILED-06`](../features/open-linked-file-context.md#err-beh-stl-file-tab-preparation-failed-06) | Already closed unrelated tabs cannot be rolled back. |
| <a id="ir-slice-stl-file-03"></a>`IR-SLICE-STL-FILE-03 — Ordered effect and truthful prefix result` | Order, Truthfulness | Open resolved targets sequentially in selected order, retain the actual opened prefix on failure and re-reveal the first only after complete set opening. | [`FBS-STL-FILE-06`](../features/open-linked-file-context.md#fbs-stl-file-06), [`BR-STL-04`](../features/open-linked-file-context.md#br-stl-04), [`BR-STL-09`](../features/open-linked-file-context.md#br-stl-09) | [`ERR-BEH-STL-FILE-OPEN-FAILED-07`](../features/open-linked-file-context.md#err-beh-stl-file-open-failed-07), [`ERR-BEH-STL-FILE-FIRST-REVEAL-FAILED-08`](../features/open-linked-file-context.md#err-beh-stl-file-first-reveal-failed-08) | Parallel opening would weaken deterministic prefix reporting. |
| <a id="ir-slice-stl-file-04"></a>`IR-SLICE-STL-FILE-04 — Focus retries cannot repeat the operation` | Continuity, Safety | Initial focus is awaited before mutation; any bounded post-URI focus retry is detached from semantic execution and cannot parse, close or open again. | [`FBS-STL-FILE-04`](../features/open-linked-file-context.md#fbs-stl-file-04), [`FBS-STL-FILE-07`](../features/open-linked-file-context.md#fbs-stl-file-07), [`BR-STL-11`](../features/open-linked-file-context.md#br-stl-11) | [`ERR-BEH-STL-FILE-WINDOW-FOCUS-FAILED-04`](../features/open-linked-file-context.md#err-beh-stl-file-window-focus-failed-04) | Live foreground success remains host evidence. |

## RU-SOWN-03 — Evolution Impact

**Methodology:** [RU-SOWN-03 Unit Definition](../idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-OWNER.md#ru-sown-03--evolution-impact).

Disposition: `OMITTED`.

Reason: the selected
[superseded-window Step](../evolution/unrealized/close-superseded-project-windows.md)
affects project-window journeys only and has no material impact on this Slice
responsibility or dependencies.

## Representation boundary

Literal adapters/classes/calls/tests remain implementation-native. This owner
persists the distributed end-to-end responsibility, Domain/Shared relations
and durable effect/proof constraints that are not recoverable from one source
file.
