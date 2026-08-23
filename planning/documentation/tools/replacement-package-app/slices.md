# Replacement Package App — Slice Strategy And Current Realization

Status: current implementation-aligned strategy / reviewed decomposition
Profile: Modular / Medium SDS
Upstream: [`application-plan.md`](application-plan.md), [`domain-draft.md`](domain-draft.md)

Slice identity is implementation/delivery identity, not user-world Scenario identity. A Slice may implement only part of a larger Scenario when it has a clear separately checkable result.

## Current Selected Decomposition

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

`SL-RPKG-04` is largely parallel to repository-work completion. `SL-RPKG-05/06` depend on real browser/manual acceptance for their user-visible result.

## `SL-RPKG-01` — Apply Replacement Work

**Deliverable/checkable result:** a valid prepared package safely becomes active work in the correct local repository, with updated ownership and a current cumulative change representation.

**Scenario coverage:** complete prepared repository work.

**Relevant Domain meaning:** Repository Target, ChangeSet identity, Relative Path/ownership, Current Change; `INV-RPKG-01`, `INV-RPKG-02`, `INV-RPKG-04`, `INV-RPKG-06`. Complete preflight-before-mutation remains upstream `REQ-RPKG-01`, not a Domain invariant.

**Current implementation path:**
- `MainWindow.apply`
- `Core.applyAction` / `Core.applyPackage` / internal apply transaction
- `GitClient`
- `StateStore`
- package protocol validation
- `CoreTests`

**Current known divergences:**
- confirmed false cross-repository `PATH_OWNERSHIP_CONFLICT`: active ownership comparison currently uses relative path across all active ChangeSets without first constraining to the same concrete repository;
- observed false raw-byte `BASE_MISMATCH` for clean tracked text under Windows Git line-ending conversion; selected base-equivalence policy remains unresolved;
- repository without resolvable first `HEAD` currently fails through low-level Git errors rather than a selected product-level readiness contract.

**Verification target:** exact add/replace/delete, all-preconditions-before-mutation, rollback/no-write guarantees, same-repo ownership conflict, different-repo same-relative-path allowed, true base divergence rejected, selected tracked-base equivalence behavior, real index unaffected by ReviewDiff generation.

## `SL-RPKG-02` — Inspect Current Change

**Deliverable/checkable result:** from a selected logical work item, the application can restore/generate the exact current cumulative change and expose it for optional inspection without mutating the real Git index.

**Scenario coverage:** complete prepared repository work; prerequisite representation for current-change handoff.

**Relevant Domain meaning:** Current Change; currentness/staleness is semantic, ReviewDiff file/SHA are realization.

**Current implementation path:**
- `Core.currentReview`
- `Core.refreshReview`
- `Core.verifiedReviewDiffPath`
- `MainWindow.refreshReview` / Copy/Open
- temporary-index Git operations
- `StateStore`
- `CoreTests`

**Requirements:** cumulative owned-path change; untracked owned adds represented; persisted review reverified after restart; Copy/Open optional and never approval/Finalize gate; service diff artifacts excluded from ChangeSet ownership.

**Verification target:** restore after restart, refresh identity replacement, corruption/staleness detection, tracked/delete/untracked representation, empty current change, real `.git/index` unchanged, exact clipboard/open artifact behavior where manually operated.

## `SL-RPKG-03` — Finalize And Publish Work

**Deliverable/checkable result:** current work for one ChangeSet becomes truthfully finalized/published, or remains in a recoverable publication-pending state without losing/duplicating logical work.

**Scenario coverage:** complete prepared repository work.

**Relevant Domain meaning:** Current Change, Publication State, ownership release, ChangeSet identity; `INV-RPKG-06..10`.

**Current implementation path:**
- `Core.finalizeChangeSet`
- `Core.retryPush`
- `GitClient`
- `StateStore`
- Swing/CLI Finalize and Retry Push
- `CoreTests`

**Current realization includes:** current-review regeneration/equality check, clean real-index guard, owned-path staging, commit, ordinary push, `CommittedPendingPush`, remote refresh/ancestry evaluation, safe recovery/rebase routes, preservation of other Active work where supported, no force push.

**Known limitation / behavior gap:** remote changes touching pending-owned paths stop automatic recovery even when a human could prove a safe reconciliation; this remains a behavior/recovery planning question rather than permission to weaken the guard.

**Verification target:** owned-only commit, no second commit on retry, no-net-change finalize, commit-success/push-failure preservation, remote-ahead safe recovery, unsafe overlap stop, rewritten commit identity with stable ChangeSet identity, ownership release only on true Finalized.

## `SL-RPKG-04` — Export Repository Snapshot

**Deliverable/checkable result:** selected repository state becomes a stable portable Local or Committed Snapshot ZIP without changing repository work.

**Scenario coverage:** provide repository context for further work.

**Current implementation path:**
- `MainWindow.exportRepositorySnapshot`
- `Core.exportRepositorySnapshot`
- `RepositorySnapshotExporter`
- `GitClient`
- `REPOSITORY-SNAPSHOT.md`
- `CoreTests`

**Verification target:** Local snapshot current tracked/untracked non-ignored files + base/diff; Committed snapshot selected commit blobs independent of dirty working tree; no `.git`; real index unchanged; stable-capture failure publishes no mixed ZIP; output outside repository; clipboard failure warning-only.

## `SL-RPKG-05` — Attach Repository Snapshot To ChatGPT

**Deliverable/checkable result:** an already-created valid Repository Snapshot appears as a ready attachment in the explicitly selected ordinary ChatGPT conversation and the extension does not press Send.

**Scenario coverage:** provide repository context for further work.

**Current implementation path:**
- `MainWindow.attachSnapshotToChat`
- `ChatBridgeService`
- `ChatBridgeServer`
- browser extension background/content/adapter
- `CHATGPT-BRIDGE.md`
- `ChatBridgeTests`

**Automated proof boundary:** Java/bridge tests can prove artifact validation/task-state/idempotency mechanics, but not that the real ChatGPT UI accepted the attachment.

**Manual verification target:** real Edge/ChatGPT conversation selection, exact snapshot filename/bytes, ready attachment, Send untouched, failure does not reclassify/delete successful snapshot or affect ChangeSet state.

## `SL-RPKG-06` — Deliver Current Change To ChatGPT

**Deliverable/checkable result:** the exact current change for one ChangeSet reaches the intended ordinary ChatGPT conversation exactly once, or a truthful safe/uncertain outcome is preserved without changing repository-work authority.

**Scenario coverage:** provide current change for review/continuation.

**Current implementation path:**
- ChangeSet conversation binding
- `ChatBridgeService`
- `ChatBridgeServer`
- browser extension background/content/adapter
- `MainWindow` review-chat/delivery controls
- `ChatBridgeTests`

**Current realization includes:** persistent binding, automatic/manual queueing, duplicate-tab grouping/claim serialization, exact artifact verification, `Preparing`/`SendClicked` guard states, native ChatGPT large-paste handling, immutable terminal outcomes, no blind retry after uncertain send.

**Current operational finding:** implementation/state-machine tests exist, but live Edge/ChatGPT delivery is not currently treated as operationally accepted.

**Manual verification target:** small text diff, native large-paste conversion, duplicate tabs, pre-existing composer content, tab navigation/claim loss, exact destination, no duplicate send after uncertainty, extension reload/reconnect, upstream Apply/Finalize unaffected by bridge failure.

## Cross-Slice Shared Realization

`Core`, `GitClient`, `StateStore`, `MainWindow` and bridge classes are shared implementation owners. Do not create horizontal foundation Slices such as “introduce service layer” or “rewrite StateStore” unless a future separately deliverable/risk-reduction result justifies them.

## Current Non-Slice Future Ideas

The following are not current Slices merely because they are useful capabilities:
- package-driven repository preselection/preflight UX;
- global unfinished-work/Attention view;
- Windows background notifications;
- separate clean technical/PowerShell-compatible output surface;
- queue-wide cancel-pending UX;
- controlled state surgery.

Route each future change into an existing Slice when it extends that result; create a new Slice only for a genuinely separate deliverable/checkable increment.
