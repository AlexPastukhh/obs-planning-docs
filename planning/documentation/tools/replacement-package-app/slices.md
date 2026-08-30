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

**Current implementation path:** `MainWindow.apply` plus the separate `MainWindow.applyWithPolling` missing-download wrapper, `Core.applyAction/applyPackage`, `GitClient`, `StateStore`, package validation, `CoreTests`.

**Current divergences:** cross-repository false `PATH_OWNERSHIP_CONFLICT`; raw-byte false `BASE_MISMATCH`; selected-repository-first package targeting; low-level no-HEAD failure.

**Selected target expansion:**

```text
package/action supplied
→ passive

user presses Apply
→ call Prepare once

or user presses Apply (wait for ZIP)
→ freeze current package/action/repository inputs
→ call the same Prepare immediately; retry only PACKAGE_NOT_FOUND every 2s, maximum 12s

successful Prepare (from either button)
→ parse/validate package
→ resolve exact Repository Target
   existing ChangeSet: stored target wins; persisted label remains presentation authority
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

**Verification target:** add/replace/delete; continuation with a differing package `changeSetLabel` succeeds under the exact existing ChangeSet while retaining its persisted label and surfacing a diagnostic in the Swing Apply result; passive input; ordinary Apply remains immediate; separate wait-for-ZIP Apply freezes inputs, retries only `PACKAGE_NOT_FOUND` on the 2-second/12-second budget and then enters the same prepared decision/Execute path once; target resolver/multiple-clone behavior; Repository Not Ready; same-target ownership conflict/different-target same path allowed; ownership/adoptability failures name exact path + Repository Target + applying ChangeSet and either explicit `Unowned` or concrete owner label/status/ID; raw and Git-equivalent source match accepted; true/manual source divergence and verification failure rejected; no mutation until all preflight passes; result bytes/rollback/current ReviewDiff correct.

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

**Selected target update:** both current V1 snapshot modes require commit/ref baseline semantics; repository without first commit yields actionable Repository Not Ready and no snapshot. The Swing entry now makes operation intent explicit with `Export only` / `Export + Attach` / `Export + Attach + Send`; either automatic handoff selects one ordinary ChatGPT conversation before export starts and freezes its `conversationKey` plus send intent. Export-only retains the post-export path/copy/open-folder result dialog; either automatic handoff suppresses that second modal. Successful/failed export is a tracked User Operation for SL-09. Local Snapshot remains the intentional producer-source route for current manual/local state.

**Verification:** stable Local capture, exact Committed blobs, no real-index mutation, no mixed ZIP, output outside repository, clipboard warning-only, Repository Not Ready for missing first commit; Export-only remains independent from browser availability and retains manual path controls, while either automatic handoff freezes destination/send intent before background export and does not show a second path modal after success.

## `SL-RPKG-05` — Attach Repository Snapshot To ChatGPT

**Deliverable:** after the user selects one ordinary ChatGPT conversation before starting a Snapshot handoff, the exact successful Repository Snapshot is either attached and left unsent (`Export + Attach`) or attached and sent through the shared guarded Send engine (`Export + Attach + Send`) according to the frozen initial choice.

**Scenario coverage:** Provide Repository Context For Further Work.

**Current core implementation path:** `MainWindow.exportRepositorySnapshot` destination-first combined flow, `Core.attachSnapshotToChat`, ChatBridgeService/Server, extension, ChatBridgeTests.

**Target boundary:** exact attachment result remains here; user-facing interaction inventory/cancel/history is owned by SL-08. Destination/send selection occurs before SL-04 export begins, but SL-05 External Interaction creation occurs only after SL-04 has produced a successful exact ZIP. The frozen `conversationKey` plus attach-only/auto-send intent are the only handoff authorities; no post-export re-selection/substitution and no Review-chat binding mutation are allowed. Existing inventory may reject a destination already known unavailable, but SL-05 does not add a close-tab freshness handshake. One absolute 10-minute Snapshot confirmation deadline bounds `Pending`/`Claimed`/`Preparing`: `Pending`/`Claimed` expiry is `Cancelled`; `Preparing` expiry is `PreparedUnsent`. An auto-send Snapshot must first atomically enter `SendArmed` while that deadline is live; this cancels the scheduled deadline before the first application-controlled MAIN-world click. Definitive no-click before any possible click restores the same absolute deadline, while an actual click advances to `SendClicked`; later guarded retries stay in that existing possible-Send lifecycle and ordinary send uncertainty. SL-09 receives terminal operation result notification.

**Manual verification:** preselected real conversation/destination/artifact and frozen attach-only/auto-send intent; change visible chat selection while export runs and require the frozen destination to remain authoritative; make the frozen destination unavailable and require no substitution/export failure, with immediate not-started when already known absent or bounded `Cancelled`/`PreparedUnsent` terminal truth for an unconfirmed queued task; attach-only leaves Send untouched, attach+Send reuses the same generic guarded Send lifecycle as ReviewDiff and cannot race the Snapshot deadline after Java grants `SendArmed`, and a definitive no-click still respects the original absolute deadline; attachment/send failure leaves successful snapshot/repository state unchanged; browser evidence required.

## `SL-RPKG-06` — Deliver Current Change To ChatGPT

**Deliverable:** exact current change reaches intended ordinary ChatGPT conversation once, or truthful failed/uncertain/no-content result is retained without changing Repository Work authority.

**Scenario coverage:** Provide Current Change For Review / Continuation.

**Current implementation after this correction:** persistent Review-chat binding has three entry paths: manual selection, legacy optional `OBS-ACTION.chatTabTitle`, and explicit invocation-scoped `OBS-ACTION.chatContextToken`. Token-assisted resolution is asynchronous: Execute exposes the token to bridge protocol 5, extension background fans the lookup out to live ChatGPT agents, and an agent answers from its tab's captured `sessionStorage` record. Repository Apply does not wait and does not own token binding truth. A unique token result is immediate bind/rebind authority: missing → bind, same → confirm/refresh, different → rebind without a second prompt. If resolved by the successful Apply ReviewDiff cutoff, the current review queues to that destination; pending/conflict skips that one automatic delivery without changing Apply success. Late resolution still binds/rebinds for future delivery and is separately notified, never retro-sending the skipped ReviewDiff. Repository Apply failure does not cancel the token lookup or revert its binding. On token destination change, safely cancellable Pending/Claimed older Review tasks are cancelled, while already Preparing/SendArmed/SendClicked interactions keep their frozen original destination. The legacy title path retains prepared normalization/rebind authorization and the existing unsafe-in-flight guard. The local `Review title ignores` setting removes only configured Unicode characters from requested/inventory titles before case-sensitive exact comparison; empty default preserves literal matching. A unique legacy-title destination different from an existing binding requires pre-Apply user choice to keep/rebind/cancel; no/ambiguous matches are Output warnings/manual fallback. Automatic/manual queueing, duplicate-tab claim serialization, exact artifact verification, task-specific `.diff` attachment identity through the shared attachment primitive, `Preparing` only after upload-ready verification, composer-clean enforcement through the MAIN-world pre-click guard, Java `SendArmed` authorization before the click and actual click as the `SendClicked` boundary, prepared-attachment departure plus post-baseline user-turn confirmation for `Sent`, optional stronger turn-local `.diff` surface proof, configurable guarded Send attempts while the same attachment remains prepared, and immutable terminal outcomes after external uncertainty remain unchanged. Live Edge practical acceptance remains required.

**Implemented correction:** ReviewDiff and Repository Snapshot now consume one generic attachment/optional-Send browser module instead of parallel kind-specific send engines. Every non-empty ReviewDiff remains an exact `.diff` attachment with `autoSend=true`; Snapshot uses the exact validated `.zip` and freezes attach-only or attach+Send. Protocol `5` validates the generic task contract before external preparation. The same exact-filename attachment state, clean-composer guard, MAIN-world click, `SendClicked`, retry interval and `Sent`/`UnknownAfterSend` confirmation logic are shared. Snapshot retains its distinct fixed pre-confirmation deadline and preparation-stage timing. No small/large ReviewDiff threshold exists.

**Target boundary:** destination-binding entry belongs here: manual selector, legacy action title hint and resolved chatContextToken all terminate in the same persisted Review-chat binding before normal delivery. Token lookup itself is internal destination-resolution mechanics and does not become an SL-RPKG-08 External Interaction. Legacy title parsing/matching is part of Apply preparation and its authorized rebind remains post-success delivery setup; token bind/rebind is different because the originating `Bind + ...` invocation already grants authority and unique resolution writes the persisted binding immediately, independent of Apply. The title hint/token are not physical-tab identities and do not replace duplicate-tab claim serialization. Common semantic interaction inventory and selected Cancel/current-actionable projection move to SL-08. User-visible interaction state must not simply mirror claim/lease/tab implementation states. Terminal outcome feeds SL-09 notification where this explicit handoff is tracked.

**Manual verification:** manual binding; title matching/rebind behavior; real focused and non-foreground delivery; small/large ReviewDiff through the generic attachment+Send engine; Snapshot `Export + Attach` and `Export + Attach + Send` through the same module; exact task filename/fingerprint; clean-composer guard; configured retry timing; protocol-5 skew rejected before mutation; actual-click possible-Send boundary; exact-filename turn proof plus post-baseline fallback; correct `FailedBeforeSend`/`PreparedUnsent`/`UnknownAfterSend` truth; attach-only Snapshot remains unsent; auto-send Snapshot reaches the same send lifecycle without changing Review-chat binding.

**Known deferred/accepted risks:** runtime-generation continuity for an already claimed/in-flight task across service-worker/extension restart, tab close or mid-task version replacement is retained as an accepted/deferred risk for now. A second unrelated attachment added after ReviewDiff upload-ready is also explicitly accepted/deferred; current guards reject later text but do not yet enforce single-attachment composer ownership through click. For prepared rebind, manual Bind/Unbind performed after background Execute has started can be overwritten by the previously authorized post-success prepared destination because this revision does not serialize that concurrency window. The non-interactive CLI action-apply compatibility path also cannot obtain keep/rebind/cancel confirmation and therefore keeps an existing binding rather than action-rebinding. These two rebind limitations are explicitly accepted for this ChangeSet and are not acceptance gates.

## `SL-RPKG-07` — Select Existing Work Context

**Status:** practical correction implemented by this package; live Swing acceptance pending.

**Deliverable/checkable result:** one existing `ChangeSet` selector establishes current work context. Default scope is the selected Repository Target; `All repositories` expands that same selector across registered targets; `Show history` adds Finalized within the chosen scope. No separate `Existing work` dialog exists.

**Scenario coverage:** shared navigation supporting Complete Repository Work, Provide Current Change and any other operation that needs an existing ChangeSet context. It is not an independent user-world Scenario.

**Selection behavior:**
- default → Active + Publication Pending for current Repository Target;
- every ChangeSet row begins with its Repository Target display name;
- `All repositories` → Active + Publication Pending across targets;
- `All repositories` / `Show history` controls sit directly below the selector rather than to its far right;
- `Show history` adds Finalized in current scope;
- global row selection switches to the exact registered Repository Target + ChangeSet;
- same-origin clones are never substituted;
- unavailable target does not crash the projection and cannot authorize an operation;
- selection itself performs no Apply/Reopen/Finalize/Send.

**Implementation correction:** replace the first-pass `Existing work` modal/dialog with the shared selector scopes above. The Swing selector row starts with repository context for every item and keeps filtering controls on a separate row below the selector. Core exposes a nullable query lookup for unavailable target projection while strict operation lookup continues to fail closed.

**Verification:** several repos and same-origin clones; repository prefix is first in every local/global row; filter controls remain below the full-width selector; Active/Pending/Finalized filtering; unfinished error ordering; exact target switch; unavailable-target row/query does not abort list; history-only Reopen visibility; zero repository mutation from selection.

## `SL-RPKG-08` — Manage External Interactions

**Status:** implementation corrected by this package; live Edge/Swing acceptance pending.

**Deliverable/checkable result:** user-significant ChatGPT handoffs that are still active/actionable or uncertain are visible in one list, selectable with semantic state and cancellable only under truthful selected semantics; ordinary terminal attempts do not accumulate as reusable/history rows.

**Scenario coverage:** Provide Current Change; Provide Repository Context.

**Interaction scope:** Deliver Current Change, Attach Repository Snapshot, future equivalent exact payload-to-conversation handoffs. Pairing/heartbeat/poll/claim/lease/tab mechanics excluded.

**Cancel:**
- before external preparation → Cancelled/no further automation;
- prepared unsent text/attachment → Cancelled + prepared content retained, no automatic deletion/send;
- Send may have occurred → preserve Sent/uncertain truth, not false Cancelled.

**List projection / retention:** show active/actionable interactions plus unacknowledged `UnknownAfterSend` (or equivalent attention-requiring uncertainty). The selector occupies the full row and Refresh/Cancel/Dismiss actions live on the row below it. Repeated queue requests reuse an equivalent still-actionable interaction when kind, exact source identity/artifact, destination conversation and applicable ChangeSet/ReviewDiff identity match; this prevents duplicate indistinguishable Pending rows without collapsing materially different payloads. Once an interaction reaches ordinary terminal `Cancelled`, `Sent`, `Attached`, `NoChanges`, `FailedBeforeSend` or `PreparedUnsent`, surface its outcome through Output/SL-09 notification and remove it from the user-facing interaction list. `UnknownAfterSend` cannot be cancelled or rewritten, but the user may `Dismiss interaction`; dismissal persists acknowledgement, hides that terminal row across restart and keeps the underlying task/result intact. Internal terminal/tombstone data may remain only for recovery, uncertainty, idempotency or duplicate-prevention truth. A later user attempt after terminal outcome creates a new External Interaction; cancelled/dismissed work is never restored/reused.

**Verification:** both interaction kinds; stable identity/source/destination; equivalent actionable current-change and snapshot requests reuse one interaction/list row; materially different source remains independent; interaction selector actions remain below the list; cancel phases; terminal ordinary rows disappear; unacknowledged `UnknownAfterSend` remains visible but cannot be cancelled; Dismiss removes it across restart without changing terminal truth; retry after Cancel/Dismiss creates a new interaction identity; no cleanup of prepared content; no false cancellation after uncertainty; independent interactions; reload/reconnect no duplication; semantic state does not leak lease/tab names.

## `SL-RPKG-09` — Notify Operation Outcomes

**Token-binding outcome extension:** repository Apply remains its own success/failure notification. Unique chatContextToken resolution emits a separate “Review chat bound” or “Review chat rebound” result because binding truth is independent of Apply. If binding is not ready at a successful Apply Review delivery cutoff, emit “ReviewDiff not sent — chat binding”; later bind/rebind explicitly states that the preceding ReviewDiff was not automatically sent. These notifications do not rewrite ChangeSet operation truth.

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
