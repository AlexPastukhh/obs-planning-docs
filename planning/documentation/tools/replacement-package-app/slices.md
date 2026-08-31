# Replacement Package App — Slice Implementation Strategy

Status: active current implementation map
Purpose: show how the three Scenario owners are assembled from current vertical implementation slices without duplicating class/method documentation.

Current source/tests realize legacy `SL-RPKG-01..SL-RPKG-09` plus the first Git-backed migration slice `SL-RPKG-11`. Source is authority for exact mechanics; [`testing-plan.md`](testing-plan.md) maps automated proof responsibility; automated tests prove only executed cases; live Windows/Edge behavior requires manual evidence.

## Slice map

### `SL-RPKG-01 — Apply Replacement Work`
- **implements:** Complete Repository Work — package intake, continuation, target/source/ownership preflight and mutation.
- **uses:** Replacement Package, Repository Target, ChangeSet, Path Ownership, Current Change, User Operation.
- **touches:** Swing Apply Prepare/Authorize/Execute, Core, package validation, Git, state and bounded rollback.
- **depends on:** registered target/origin verification and exact ChangeSet lookup.
- **integration boundaries:** shared package protocol and Git path-specific clean/filter semantics.
- **notes:** exact `changeSetId` continuation; stable Repository Target; complete preflight before mutation; raw-or-Git-semantic source proof; separate bounded wait-for-ZIP wrapper.

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
- **transitional boundary:** this slice does **not** migrate package Apply, Current Change, commit, publish, Issue/PR, ReviewDecision or Finalize. Legacy Apply and legacy owned-path Review are explicitly blocked for these Git-backed ChangeSets so they cannot silently mutate/project the Repository Target main workspace.

## Shared domain concepts

No separate Domain owner is required for the current model.

- **Repository Target** — stable registered local target ID; has one Repository Identity and one mutable registered location. Same-origin clones remain distinct targets.
- **ChangeSet** — one logical repository-work identity. Legacy ChangeSets retain continuation/Review/publication/Reopen fields; new Git-backed workspaces additionally persist `targetBranch`, `branch`, `worktree`, `baseCommit`, `publishedTip` and execution state.
- **Path Ownership** — `(Repository Target, repository-relative path)` has at most one unfinished ChangeSet owner.
- **Current Change** — cumulative current work of one ChangeSet, represented by canonical persisted ReviewDiff/fingerprint.
- **Lifecycle / execution (transitional)** — legacy work retains Active → Publication Pending → Finalized with Reopen; a new SL-11 workspace currently persists lifecycle `Active` plus execution `Ready(C0)`. Later slices will migrate the remaining lifecycle/execution model.
- **External Interaction** — one exact handoff source/artifact + exact conversation + semantic delivery/cancellation/uncertainty truth.
- **User Operation** — application execution/outcome context, separate from ChangeSet lifecycle.

## Cross-slice boundaries

- Package production is external to the app and governed by [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md).
- Repository Snapshot format/consistency retains [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md).
- Java ↔ extension ↔ ChatGPT coordination retains [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md).
- UI layout detail, ordinary persistence records, class/method structure and deterministic implementation detail stay in code/tests unless they materially affect a Scenario or focused contract.
- Automated proof responsibility and the Slice-to-test map are owned by [`testing-plan.md`](testing-plan.md); behavior is not duplicated there.
- Operated Windows/Edge/ChatGPT evidence is tracked only in [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md).
