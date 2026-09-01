# Replacement Package App — Slice Implementation Strategy

Status: active current implementation map
Purpose: show how the three Scenario owners are assembled from current vertical implementation slices without duplicating class/method documentation.

Current source/tests realize legacy `SL-RPKG-01..SL-RPKG-09`, `SL-RPKG-11`, and two modular Git-backed execution stages of `SL-RPKG-01` (`Ready → AppliedUncommitted → CommittedUnpublished`). Source is authority for exact mechanics; [`testing-plan.md`](testing-plan.md) maps automated proof responsibility; automated tests prove only executed cases; live Windows/Edge behavior requires manual evidence.

## Slice map

### `SL-RPKG-01 — Apply Replacement Work`
- **implements:** Complete Repository Work — legacy package intake/continuation plus modular Git-backed Apply and Commit actions for an existing SL-11 workspace.
- **legacy path:** retains current Repository Target main-workspace Apply, Path Ownership and cumulative ReviewDiff behavior for legacy ChangeSets.
- **Git-backed Apply stage:** a persisted `Active · Ready(C0)` workspace accepts one exact package only inside its isolated worktree and transitions to `AppliedUncommitted(P1)`; `publishedTip` and branch HEAD remain `C0`.
- **durable Apply journal:** before first file mutation, persist package identity/archive fingerprint, branch/worktree, `baseHead`, exact actual prior file existence/bytes and exact intended result for every operation. Retry proves the journal intent: fully intended bytes recover state without reapplying; prior/mixed state is restored to exact prior bytes and reapplied; unknown bytes on journal-owned package paths are first preserved as recovery evidence, then exact prior bytes are restored and reapplied; unrelated dirty paths still fail closed.
- **Git-backed Commit stage:** from `AppliedUncommitted(P1)`, prove branch/worktree are still based at `publishedTip=C0`, exact intended journal bytes remain present, and any staged paths are journal-owned; stage only package paths and create one local `C1` with exact `Package-Id: P1` and `ChangeSet-Id: X` trailers. Persist `CommittedUnpublished(P1,C1)` with `commitSha=C1` while `publishedTip` remains `C0`.
- **Commit idempotency/recovery:** repeated Commit proves the recorded local commit and returns already satisfied. Retry can continue from a journal-only staged index or recover a crash-created `HEAD=C1` only when `C1` is the single-parent child of `C0`, carries the exact trailers, changes no path outside the journal, and leaves exact intended worktree bytes with clean index/worktree. A moved head that cannot prove those facts fails closed and is never adopted.
- **uses:** Replacement Package, Repository Target, ChangeSet, execution state, durable Apply journal, local package commit, User Operation; Path Ownership remains legacy-only.
- **touches:** Swing Apply Prepare/Authorize/Execute and **Commit applied**, Core, StateStore Apply journal, package validation, shared exact file mutation and Git worktree/commit verification.
- **depends on:** registered target/origin verification, exact ChangeSet lookup and `SL-RPKG-11` workspace establishment.
- **transitional boundary:** Git-backed Publish, Current Change/ReviewDecision and Finalize are not migrated yet. A Git-backed successful Apply/Commit has no legacy ReviewDiff; legacy Review/Finalize remain fail-closed.

### `SL-RPKG-02 — Inspect Current Change`
- **implements:** Complete Repository Work — cumulative Current Change inspection.
- **uses:** ChangeSet, Current Change.
- **touches:** canonical ReviewDiff generation/persistence, temporary Git index, Refresh/Copy/Open.
- **depends on:** SL-01 ownership/current repository state.
- **notes:** background Refresh remains owned by its captured ChangeSet; Copy/Open resolve persisted current Review on invocation.

### `SL-RPKG-03 — Finalize And Publish Work`
- **implements:** Complete Repository Work — Finalize, Publication Pending recovery and explicit Reopen.
- **uses:** lifecycle, Current Change, Path Ownership, finalization history.
- **touches:** Core, Git, state, Finalize/Retry/Reopen UI.
- **depends on:** SL-02 current Review and SL-01 ownership.
- **integration boundaries:** local commit + remote push.
- **notes:** owned-only staging; no user SHA approval gate; `CommittedPendingPush`; guarded Finalized→Active Reopen preserving identity/history.

### `SL-RPKG-04 — Export Repository Snapshot`
- **implements:** Provide Repository Context — exact Local/Committed artifact creation.
- **uses:** Repository Target, Repository Snapshot, User Operation.
- **touches:** snapshot exporter, Git object/index mechanics, ZIP output, background UI operation.
- **depends on:** repository registry/origin/readiness.
- **notes:** Local double consistency verification; Committed exact blobs; no-first-commit Repository Not Ready.

### `SL-RPKG-05 — Attach Repository Snapshot To ChatGPT`
- **implements:** Provide Repository Context — exact Attach or Attach+Send.
- **uses:** Repository Snapshot, Chat Conversation, External Interaction.
- **touches:** bridge service/server and extension generic attachment engine.
- **depends on:** successful SL-04 export and frozen destination/mode.
- **integration boundaries:** real ChatGPT composer and Java-owned Snapshot confirmation deadline.
- **notes:** attach-only ends `Attached`; auto-send reuses the ReviewDiff guarded Send engine.

### `SL-RPKG-06 — Deliver Current Change To ChatGPT`
- **implements:** Provide Current Change and Apply-time Review-chat destination handoff.
- **uses:** ChangeSet, Current Change, Review-chat binding, External Interaction.
- **touches:** Core, bridge service/server, extension service worker/tab agent/adapter.
- **depends on:** SL-02 current Review and a manual/title/token binding route.
- **integration boundaries:** loopback bridge protocol 5 and exact browser attachment/guarded MAIN-world Send.
- **notes:** exact `.diff` attachment; `SendArmed` before first click; `SendClicked` possible-Send boundary; request-driven `chatContextToken` direct bind/rebind authority independent of repository Apply result.

### `SL-RPKG-07 — Select Existing Work Context`
- **implements:** shared navigation used by Complete Repository Work and Provide Current Change.
- **uses:** Repository Target, ChangeSet lifecycle/history, latest unfinished outcome projection.
- **touches:** state query/projection and main selectors.
- **notes:** current-target/all-repositories scope, history toggle, exact-target switching, unavailable target represented truthfully. Navigation does not grant mutation authority.

### `SL-RPKG-08 — Manage External Interactions`
- **implements:** shared handoff working/attention state for current-change and snapshot Scenarios.
- **uses:** External Interaction identity/source/destination/result.
- **touches:** persisted bridge task state and interaction list/actions.
- **depends on:** SL-05/06 delivery tasks.
- **notes:** equivalent actionable dedupe, truth-preserving Cancel, Dismiss only for terminal `UnknownAfterSend`, no accumulated ordinary terminal history.

### `SL-RPKG-09 — Notify Operation Outcomes`
- **implements:** shared feedback for meaningful repository/snapshot/handoff/recovery operations.
- **uses:** User Operation/result, Repository Target context, compact unfinished-work latest outcome.
- **touches:** operation runner and Windows notification integration.
- **depends on:** semantic terminal results from SL-01..08.
- **notes:** notification click foregrounds/selects exact repository context when known; never auto-executes Apply/Finalize/Retry/Reopen/Send and does not automatically select a ChangeSet.

### `SL-RPKG-11 — Start ChangeSet Workspace`
- **implements:** first App-first Git-backed migration capability: explicitly create one isolated exact Git workspace for a new ChangeSet.
- **uses:** Repository Target, ChangeSet identity/label, target branch, `baseCommit`, `publishedTip`, branch, worktree and execution `Ready`.
- **touches:** Swing **Start workspace**, Core, StateStore workspace journal/worktree paths and Git worktree/branch mechanics.
- **result:** local `targetBranch @ C0` is pinned as `baseCommit=C0` / `publishedTip=C0`; deterministic branch `changeset/<changeSetId>` and deterministic isolated worktree are created and verified clean against the same Git common directory; ChangeSet persists as `Active · Ready`.
- **idempotency/recovery:** an exact workspace journal is durably written before the first Git mutation. Retry either returns an already-proven persisted Ready workspace or reconciles only the exact journal-owned partial branch/worktree; an unjournaled deterministic branch/path collision fails closed.
- **transitional boundary:** package-file Apply is now migrated by the Git-backed stage of SL-RPKG-01. Current Change, commit, publish, Issue/PR, ReviewDecision and Finalize remain unmigrated; legacy owned-path Review/Finalize stay blocked for these workspaces.

## Shared domain concepts

No separate Domain owner is required for the current model.

- **Repository Target** — stable registered local target ID; has one Repository Identity and one mutable registered location. Same-origin clones remain distinct targets.
- **ChangeSet** — one logical repository-work identity. Legacy ChangeSets retain continuation/Review/publication/Reopen fields; new Git-backed workspaces additionally persist `targetBranch`, `branch`, `worktree`, `baseCommit`, `publishedTip` and execution state.
- **Path Ownership** — `(Repository Target, repository-relative path)` has at most one unfinished ChangeSet owner.
- **Current Change** — legacy ChangeSets still use cumulative persisted ReviewDiff. Git-backed `AppliedUncommitted` work currently has no migrated Current Change projection until SL-RPKG-02 moves to Git-derived diffs.
- **Lifecycle / execution (transitional)** — legacy work retains Active → Publication Pending → Finalized with Reopen; Git-backed work now realizes `Ready(C0) → AppliedUncommitted(P1)` while `publishedTip`/HEAD remain `C0`. Later stages add Commit/Publish and migrate review/finalization.
- **External Interaction** — one exact handoff source/artifact + exact conversation + semantic delivery/cancellation/uncertainty truth.
- **User Operation** — application execution/outcome context, separate from ChangeSet lifecycle.

## Cross-slice boundaries

- Package production is external to the app and governed by [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md).
- Repository Snapshot format/consistency retains [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md).
- Java ↔ extension ↔ ChatGPT coordination retains [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md).
- UI layout detail, ordinary persistence records, class/method structure and deterministic implementation detail stay in code/tests unless they materially affect a Scenario or focused contract.
- Automated proof responsibility and the Slice-to-test map are owned by [`testing-plan.md`](testing-plan.md); behavior is not duplicated there.
- Operated Windows/Edge/ChatGPT evidence is tracked only in [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md).
