# Replacement Package App — Slice Strategy And Current/Target Realization

Status: current implementation + selected target decomposition
Profile: Modular / Medium SDS
Upstream: [`application-plan.md`](application-plan.md), [`domain-draft.md`](domain-draft.md)

Slice identity is implementation/delivery identity, not user-world Scenario identity. Scenario and Slice changes are reviewed independently: one Scenario may require several Slices, and one Slice may support several Scenarios.

## Current Implemented Decomposition

```text
SL-RPKG-01 Apply Replacement Work
        ↓
SL-RPKG-02 Inspect Current Change
        ├────────→ SL-RPKG-03 Finalize And Publish Work
        └────────→ SL-RPKG-06 Deliver Current Change To ChatGPT

SL-RPKG-04 Export Repository Snapshot
        ↓
SL-RPKG-05 Attach Repository Snapshot To ChatGPT
```

Current source/tests implement SL-01..06. `SL-RPKG-05/06` still require live browser/manual practical evidence for operational acceptance.

## Selected Target Decomposition

```text
SL-RPKG-01 Apply Replacement Work               EXPAND
        ↓
SL-RPKG-02 Inspect Current Change                KEEP
        ├────────→ SL-RPKG-03 Finalize And Publish Work   LIGHT EXPAND
        └────────→ SL-RPKG-06 Deliver Current Change      KEEP CORE RESULT

SL-RPKG-04 Export Repository Snapshot            READINESS UPDATE
        ↓
SL-RPKG-05 Attach Repository Snapshot            KEEP CORE RESULT

SL-RPKG-07 Select Existing Work Context          CORRECTED
        └→ establishes context consumed by SL-02 / SL-03 / SL-06

SL-RPKG-05 ─┐
            ├→ SL-RPKG-08 Manage External Interactions   CORRECTED
SL-RPKG-06 ─┘

meaningful user operations across Slices
        → SL-RPKG-09 Notify Operation Outcomes           NEW
```

SL-08/09 are not operation prerequisites: they manage downstream interaction/outcome surfaces. Repository location editing and technical diagnostics remain cross-Slice/application Behavior, not separate Slices in the first target.

## `SL-RPKG-01` — Apply Replacement Work

**Target deliverable:** a valid prepared package safely becomes active work in the correct concrete Repository Target, with updated ownership/current cumulative change, or stops truthfully before mutation.

**Scenario coverage:** Complete Prepared Repository Work.

**Current implementation path:** `MainWindow.apply`, `Core.applyAction/applyPackage`, `GitClient`, `StateStore`, package validation, `CoreTests`.

**Current divergences:** cross-repository false `PATH_OWNERSHIP_CONFLICT`; raw-byte false `BASE_MISMATCH`; selected-repository-first package targeting; low-level no-HEAD failure.

**Selected target expansion:**

```text
package/action supplied
→ passive

user presses Apply
→ parse/validate package
→ resolve exact Repository Target
   existing ChangeSet: stored target wins
   new work: current match / unique match / explicit choice among clones / no-match stop
→ retain auto-selected repository context even if later preflight fails
→ revalidate exact target
→ Repository Ready check when commit/HEAD baseline is required
→ repository-scoped ownership/adoptability checks
→ expected source-state proof for replace/delete
   raw equal OR Git path-semantic equivalent
   different/unverifiable → stop
→ complete all preconditions
→ mutate/verify/rollback as required
→ persist ChangeSet/current change/result
```

Target Git-equivalence implementation direction: binary-safe canonical IDs for expected/actual content using Git path semantics (selected design equivalent to `git hash-object --stdin --path=<path>`); exact engineering proof is required before acceptance.

**Verification target:** add/replace/delete; passive input; target resolver/multiple-clone behavior; Repository Not Ready; same-target ownership conflict/different-target same path allowed; ownership/adoptability failures name exact path + Repository Target + applying ChangeSet and either explicit `Unowned` or concrete owner label/status/ID; raw and Git-equivalent source match accepted; true/manual source divergence and verification failure rejected; no mutation until all preflight passes; result bytes/rollback/current ReviewDiff correct.

**Accepted low-frequency risk:** current realization can resolve package/target context from one ZIP read and read the package again for actual Apply (including after explicit clone/target choice). External replacement of the ZIP during that short interval could make the applied bytes differ from the resolved input. Do not block this revision; future hardening is one captured immutable/prepared Apply context or exact package fingerprint revalidation before mutation.

## `SL-RPKG-02` — Inspect Current Change

**Deliverable:** selected logical work restores/generates exact current cumulative change for optional inspection without mutating real Git index.

**Scenario coverage:** Complete Prepared Repository Work; prerequisite representation for current-change handoff.

**Current implementation path:** `Core.currentReview/refreshReview/verifiedReviewDiffPath`, `MainWindow` Refresh/Copy/Open, temporary index, StateStore, CoreTests.

**Target:** keep current result/boundary. SL-07 may establish work context before this Slice; it does not duplicate Current Change generation.

**Verification:** restart restore, refresh identity, corruption/staleness detection, tracked/delete/untracked representation, empty current change, real index unchanged, Copy/Open optional and never Finalize gate.

## `SL-RPKG-03` — Finalize And Publish Work

**Deliverable:** one current ChangeSet becomes truthfully Finalized/published or remains recoverable Publication Pending without losing/duplicating logical work; when the user explicitly selects Finalized history for continuation/recovery, that same ChangeSet can also be safely Reopened to Active without losing identity/history or stealing/adopting other work.

**Scenario coverage:** Complete Prepared Repository Work.

**Current implementation path:** `Core.finalizeChangeSet/retryPush`, GitClient, StateStore, Swing/CLI, CoreTests.

**Target light expansion:** work opened through SL-07 may route directly to current Finalize/Retry recovery. SL-03 also owns the explicit guarded `Reopen ChangeSet` lifecycle transition: selected Finalized work may return to Active with the same identity/history only after exact-target revalidation and safe historical-path ownership/unowned-work checks. Successful Reopen returns the work to the unfinished set; failed Reopen leaves it Finalized and feeds SL-09 notification/result/diagnostics without creating a persistent Finalized error marker. No new Scenario/Slice for Retry Push or Reopen.

**Verification:** owned-only commit, no second commit on retry, no-net-change finalize, push-failure preservation, safe remote-ahead recovery, unsafe overlap stop, stable logical identity, ownership release only on true Finalized; explicit Finalized→Active Reopen preserves identity/history, reacquires historical paths only when safe, blocks sibling-owner/unowned-dirty conflicts with no partial transition.

## `SL-RPKG-04` — Export Repository Snapshot

**Deliverable:** selected repository state becomes a stable portable Local or Committed Snapshot ZIP without changing repository work.

**Scenario coverage:** Provide Repository Context For Further Work.

**Current implementation path:** `MainWindow/Core.exportRepositorySnapshot`, `RepositorySnapshotExporter`, GitClient, snapshot contract, CoreTests.

**Selected target update:** both current V1 snapshot modes require commit/ref baseline semantics; repository without first commit yields actionable Repository Not Ready and no snapshot. Successful/failed export is a tracked User Operation for SL-09. Local Snapshot remains the intentional producer-source route for current manual/local state.

**Verification:** stable Local capture, exact Committed blobs, no real-index mutation, no mixed ZIP, output outside repository, clipboard warning-only, Repository Not Ready for missing first commit.

## `SL-RPKG-05` — Attach Repository Snapshot To ChatGPT

**Deliverable:** an already-created valid Repository Snapshot becomes a ready attachment in explicitly selected ordinary ChatGPT conversation and the extension never presses Send.

**Scenario coverage:** Provide Repository Context For Further Work.

**Current core implementation path:** `MainWindow.attachSnapshotToChat`, ChatBridgeService/Server, extension, ChatBridgeTests.

**Target boundary:** exact attachment result remains here; user-facing interaction inventory/cancel/history is owned by SL-08. One attach attempt creates one External Interaction. SL-09 receives terminal operation result notification.

**Manual verification:** real conversation/destination/artifact; Send untouched; failure leaves successful snapshot/repository state unchanged; browser evidence required.

## `SL-RPKG-06` — Deliver Current Change To ChatGPT

**Deliverable:** exact current change reaches intended ordinary ChatGPT conversation once, or truthful failed/uncertain/no-content result is retained without changing Repository Work authority.

**Scenario coverage:** Provide Current Change For Review / Continuation.

**Current implementation after this correction:** persistent binding, automatic/manual queueing, duplicate-tab claim serialization, exact artifact verification, `.diff` attachment preparation through the shared attachment primitive, `Preparing` only after upload-ready verification, technical `SendClicked` projected as semantic `Sending`, configurable guarded Send attempts while the same attachment remains prepared, and immutable terminal outcomes after external uncertainty. Live Edge practical acceptance remains required.

**Implemented correction:** keep exact payload/destination/dedupe/send-confirmation responsibilities here, but deliver every non-empty ReviewDiff as an exact `.diff` attachment. ReviewDiff and snapshot use one reusable low-level attachment primitive, while snapshot remains semantically attach-only and is not redesigned here. Before payload fetch/composer mutation, both sides require bridge protocol `2` and the complete claimed-task contract (including frozen retry interval) are validated; stale/malformed runtime pairs terminate safely as `FailedBeforeSend` with restart/update guidance. The exact ReviewDiff attachment must be visible/upload-ready before `Preparing`; failures after confirmed preparation but before the possible-Send phase are `PreparedUnsent`. During `Sending`, the extension may repeat a guarded MAIN-world Send-control attempt at the task's application-configured interval only while the same exact attachment remains prepared in the same conversation. The interval is already validated before this boundary. Confirmed outgoing turn is `Sent`; attachment disappearance without confirmation is `UnknownAfterSend` and stops automation. No small/large threshold exists.

**Target boundary:** core delivery stays here. Common semantic interaction inventory and selected Cancel/current-actionable projection move to SL-08. User-visible interaction state must not simply mirror claim/lease/tab implementation states. Terminal outcome feeds SL-09 notification where this explicit handoff is tracked.

**Manual verification:** real focused and non-foreground/unfocused-tab delivery; small and large ReviewDiff `.diff` attachment preparation without tab freeze; exact attachment/upload-ready verification; configured retry timing; intentional old/new bridge-extension version skew rejected before composer mutation as actionable `FailedBeforeSend`; repeated Send-control attempts only while the same attachment remains; destination; duplicate tabs/composer protection; correct `FailedBeforeSend`/`PreparedUnsent`/`UnknownAfterSend` boundary; bridge reload/reconnect; snapshot remains attach-only; upstream work unaffected.

## `SL-RPKG-07` — Select Existing Work Context

**Status:** practical correction implemented by this package; live Swing acceptance pending.

**Deliverable/checkable result:** one existing `ChangeSet` selector establishes current work context. Default scope is the selected Repository Target; `All repositories` expands that same selector across registered targets; `Show history` adds Finalized within the chosen scope. No separate `Existing work` dialog exists.

**Scenario coverage:** shared navigation supporting Complete Repository Work, Provide Current Change and any other operation that needs an existing ChangeSet context. It is not an independent user-world Scenario.

**Selection behavior:**
- default → Active + Publication Pending for current Repository Target;
- `All repositories` → Active + Publication Pending across targets, with repository shown per row;
- `Show history` adds Finalized in current scope;
- global row selection switches to the exact registered Repository Target + ChangeSet;
- same-origin clones are never substituted;
- unavailable target does not crash the projection and cannot authorize an operation;
- selection itself performs no Apply/Reopen/Finalize/Send.

**Implementation correction:** replace the first-pass `Existing work` modal/dialog with the shared selector scopes above. Core exposes a nullable query lookup for unavailable target projection while strict operation lookup continues to fail closed.

**Verification:** several repos and same-origin clones; local/global selector scopes; Active/Pending/Finalized filtering; unfinished error ordering; exact target switch; unavailable-target row/query does not abort list; history-only Reopen visibility; zero repository mutation from selection.

## `SL-RPKG-08` — Manage External Interactions

**Status:** implementation corrected by this package; live Edge/Swing acceptance pending.

**Deliverable/checkable result:** user-significant ChatGPT handoffs that are still active/actionable or uncertain are visible in one list, selectable with semantic state and cancellable only under truthful selected semantics; ordinary terminal attempts do not accumulate as reusable/history rows.

**Scenario coverage:** Provide Current Change; Provide Repository Context.

**Interaction scope:** Deliver Current Change, Attach Repository Snapshot, future equivalent exact payload-to-conversation handoffs. Pairing/heartbeat/poll/claim/lease/tab mechanics excluded.

**Cancel:**
- before external preparation → Cancelled/no further automation;
- prepared unsent text/attachment → Cancelled + prepared content retained, no automatic deletion/send;
- Send may have occurred → preserve Sent/uncertain truth, not false Cancelled.

**List projection / retention:** show active/actionable interactions plus `UnknownAfterSend` (or equivalent attention-requiring uncertainty). Once an interaction reaches ordinary terminal `Cancelled`, `Sent`, `Attached`, `NoChanges`, `FailedBeforeSend` or `PreparedUnsent`, surface its outcome through Output/SL-09 notification and remove it from the user-facing interaction list. Internal terminal/tombstone data may remain only for recovery, uncertainty, idempotency or duplicate-prevention truth. A later user attempt always creates a new External Interaction; cancelled work is never restored/reused.

**Verification:** both interaction kinds; stable identity/source/destination; cancel phases; terminal ordinary rows disappear; `UnknownAfterSend` remains actionable/visible; retry after Cancel creates a new interaction identity; no cleanup of prepared content; no false cancellation after uncertainty; independent interactions; reload/reconnect no duplication; semantic state does not leak lease/tab names.

## `SL-RPKG-09` — Notify Operation Outcomes

**Status:** implementation exists from the prior realization pass; live Windows notification acceptance pending.

**Deliverable/checkable result:** terminal outcome of a tracked meaningful user operation produces one concise Windows notification and notification click restores relevant repository context without triggering the operation.

**Tracked operations:** meaningful nontrivial explicit operations including Apply, Finalize, Retry Push, explicit Reopen ChangeSet, Repository Snapshot export, current-change/snapshot ChatGPT handoff and Change Repository Location. Passive navigation/selection and trivial Copy/Open actions are excluded.

**Selected policy:** success notification always; failure/action-required notification always with concise reason.

**Click:** open/foreground app; select exact Repository Target when known; do not auto-select ChangeSet and do not retry/apply/finalize/send.

**State boundary:** `User Operation` is Application process/outcome state, not a new Repository Work aggregate. Only unfinished ChangeSet-linked latest outcome persists compact summary/reason/timestamp for the SL-07 marker; failed Reopen on Finalized history remains an operation result/notification/diagnostic without a persistent ChangeSet marker. No generic persistent all-operation history list is selected.

**Verification:** success/failure/action/uncertain mapping; exactly one terminal notification; correct repository navigation; no ChangeSet auto-select; no state/mutation authority; persisted latest unfinished ChangeSet outcome survives restart; failed Reopen creates no Finalized marker.

## Cross-Slice Repository Management Behavior — Change Repository Location

Explicit separate button/action updates one Repository Target's mutable location after validating:
- new path is a Git work tree;
- Repository Identity/origin matches stored target identity.

Then Target ID and all ChangeSet associations remain unchanged. A different clone with the same Repository Identity may be deliberately selected through this explicit action; automatic substitution remains forbidden. Later operations run their ordinary readiness/source/current-change/ownership checks. This does not justify a separate Slice in the first target.

## Cross-Slice Diagnostics

A clean technical/PowerShell-friendly session diagnostics surface supports operation failures without becoming a separate Slice, approval gate or repository authority. Protect secrets/tokens while preserving useful non-secret raw detail.

## Current-vs-Target Rule

Do not rename target Slice behavior as current implementation until Java/extension/state/tests exist and required practical evidence is executed. Current source paths in this file remain evidence for SL-01..06 only; SL-07..09 are selected implementation plans.
