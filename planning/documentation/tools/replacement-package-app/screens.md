# Replacement Package App — Main Work Window

Status: active current Screen/spatial owner for the target App build. Legacy Review/Finalize UI belongs to the already-deployed old executable and is not imported as a compatibility requirement. Scenario and Feature owners retain journey and behavior authority.

## RU-SCREEN-01 — Screen Map

**Screen identity:** `SCREEN-RPKG-MAIN-WORK`. This Work-centered surface lets the user inspect the exact Repository Target, WorkId, target branch, archive and package identity, run a complete OBS action, or invoke the distinct Apply/Commit/Publish/Retry Publish operations. It presents operation state and truthful results.

Visible hierarchy: Work identity/context above effect controls; automatic composition and manual module actions remain distinct; operation/output area displays the result without reselecting the Work. There is no ChangeSet selector, generic Resume control, Current Change/Review delivery, legacy Finalize/Reopen, Repository Snapshot, or future Apply URI control on this current Screen.

## RU-SCREEN-02 — Scenario participation and spatial requirements

**Methodology:** [Screen Draft Set](../../idtspe-methodology/active/profiles/sds/target-modules/TM-SCREEN.md#ru-screen-02--screen-draft-set).

Scenario: [SCN-RPKG-COMPLETE-REPOSITORY-WORK](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md). The actor's underlying work intent precedes Screen entry; the first SPS includes entering or inspecting the exact action request on this Screen.

| Scenario Step | Step-local Screen Requirements | Feature / Application participation | Screen participation / spatial presentation | QRPE / Examples |
|---|---|---|---|---|
| [`SPS-RPKG-SUPPLY-CURRENT-REALIZATION-REQUEST-01`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#sps-rpkg-supply-current-realization-request-01) | [`SCR-RPKG-CONTEXT-01`](#scr-rpkg-context-01) | Actor supplies exact request; App binds it. | Repository Target, WorkId, target branch, packageId and archive/OBS action input are visible as the request is entered or inspected. | A displayed label alone is not identity authority. |
| [`SPS-RPKG-REQUEST-CURRENT-PACKAGE-REALIZATION-02`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#sps-rpkg-request-current-package-realization-02) | [`SCR-RPKG-CONTEXT-01`](#scr-rpkg-context-01) | [Apply Feature](features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md) and current prerequisites. | Run OBS Action is visually distinguishable from Start workspace, Apply Package, Commit applied, Publish and Retry Publish; the affected Work/package context stays adjacent to the chosen effect. | Retry Publish remains beside Publish. |
| [`SPS-RPKG-OBSERVE-CURRENT-REALIZATION-OUTCOME-03`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#sps-rpkg-observe-current-realization-outcome-03) | [`SCR-RPKG-OUTCOME-02`](#scr-rpkg-outcome-02) | App returns a proven/rejected/uncertain result; actor decides follow-up. | Operation/output area presents the exact context and visually distinct outcome/attention state without turning uncertainty into a success cue. | Possible Publish without confirmation remains visibly unresolved. |

### Step-local Screen Requirements

| Screen Requirement | Type | Scenario Step(s) | Plain required Screen meaning | QRPE / Examples |
|---|---|---|---|---|
| <a id="scr-rpkg-context-01"></a>`SCR-RPKG-CONTEXT-01` — Effect context visible | Spatial / decision context | `SPS-RPKG-SUPPLY-CURRENT-REALIZATION-REQUEST-01`, `SPS-RPKG-REQUEST-CURRENT-PACKAGE-REALIZATION-02` | Exact Work/package/target context is visible near effect controls before user action. | A later UI selection does not become the in-flight operation's semantic identity; that behavior remains Feature/Scenario authority. |
| <a id="scr-rpkg-outcome-02"></a>`SCR-RPKG-OUTCOME-02` — Outcome visually distinct | Spatial / outcome visibility | `SPS-RPKG-OBSERVE-CURRENT-REALIZATION-OUTCOME-03` | Proven, rejected and uncertain result presentations are distinguishable in the operation/output area. | Visual presentation supports, but does not replace, Scenario `SR-RPKG-KEEP-TERMINAL-OUTCOME-UNDERSTANDABLE-03`. |

### Screen-wide Requirements

| Screen-wide Requirement | Type | Plain required Screen meaning | QRPE / Examples |
|---|---|---|---|
| <a id="scr-g-rpkg-action-hierarchy-01"></a>`SCR-G-RPKG-ACTION-HIERARCHY-01` — Work action hierarchy | Screen composition | Automatic Run OBS Action and distinct manual module controls remain separately discoverable in the Work-centered hierarchy. | Planned extent/URI entry is not current. |
| <a id="scr-g-rpkg-persistent-context-02"></a>`SCR-G-RPKG-PERSISTENT-CONTEXT-02` — Work context persists | Screen composition | The Work identity/context remains inspectable while controls and terminal results are viewed. | Avoid a result panel detached from its exact Work/package. |

Screen participation is a spatial result for each SPS, not a copied Scenario `SR-*` or Feature `BR-*`. The Feature owns effect capture/identity; later UI changes must not retarget an in-flight operation. Notification and Snapshot Screen changes remain Step-owned until realized.

## RU-SCREEN-03 — Evolution Impact

Current Screen spatial changes from [Operation Notifications](evolution-steps/EVO-RPKG-ADD-OPERATION-NOTIFICATIONS.md) and possible future [Apply URI Entry](evolution-steps/EVO-RPKG-ADD-APPLY-URI-ENTRY.md) are reviewed at those Steps; neither is current presentation. [Repository Snapshot Workflow](evolution-steps/EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW.md) owns future context Screen meaning. This current Screen is not rewritten from a future Target Body before proof/materialization.
