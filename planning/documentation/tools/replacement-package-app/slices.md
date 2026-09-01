# Replacement Package App — Slice Implementation Strategy

Status: active current implementation map
Purpose: show how the three Scenario owners are assembled from current vertical implementation slices without duplicating class/method documentation.

Current source/tests realize legacy `SL-RPKG-01..SL-RPKG-09`, Git-backed `SL-RPKG-10` and `SL-RPKG-11`, three modular Git-backed actions of `SL-RPKG-01` (`Ready → AppliedUncommitted → CommittedUnpublished → Ready`, with `PublicationUncertain` recovery), and their ordinary top-level **Apply Package** composition. Source is authority for exact mechanics; [`testing-plan.md`](testing-plan.md) maps automated proof responsibility; automated tests prove only executed cases; live Windows/Edge behavior requires manual evidence.

## Slice map

### `SL-RPKG-01 — Apply Replacement Work`
- **implements:** Complete Repository Work — legacy package intake/continuation plus modular Git-backed Apply, Commit and Publish actions, with ordinary `Apply Package` composing SL-10 + SL-11 + those actions automatically.
- **legacy path:** retains current Repository Target main-workspace Apply, Path Ownership and cumulative ReviewDiff behavior for legacy ChangeSets.
- **Git-backed Apply stage:** a persisted `Active · Ready(C0)` workspace accepts one exact package only inside its isolated worktree and transitions to `AppliedUncommitted(P1)`; `publishedTip` and branch HEAD remain `C0`.
- **durable Apply journal:** before first file mutation, persist package identity/archive fingerprint, branch/worktree, `baseHead`, exact actual prior file existence/bytes and exact intended result for every operation. Retry proves the journal intent: fully intended bytes recover state without reapplying; prior/mixed state is restored to exact prior bytes and reapplied; unknown bytes on journal-owned package paths are first preserved as recovery evidence, then exact prior bytes are restored and reapplied; unrelated dirty paths still fail closed.
- **Git-backed Commit stage:** from `AppliedUncommitted(P1)`, prove branch/worktree are still based at `publishedTip=C0`, exact intended journal bytes remain present, and any staged paths are journal-owned; stage only package paths and create one local `C1` with exact `Package-Id: P1` and `ChangeSet-Id: X` trailers. Persist `CommittedUnpublished(P1,C1)` with `commitSha=C1` while `publishedTip` remains `C0`.
- **Commit idempotency/recovery:** repeated Commit proves the recorded local commit and returns already satisfied. Retry can continue from a journal-only staged index or recover a crash-created `HEAD=C1` only when `C1` is the single-parent child of `C0`, carries the exact trailers, changes no path outside the journal, and leaves exact intended worktree bytes with clean index/worktree. A moved head that cannot prove those facts fails closed and is never adopted.
- **Git-backed Publish stage:** from `CommittedUnpublished(P1,C1)`, prove the exact local package commit, inspect exact remote `changeset/<id>`, and publish only when the remote is absent or exactly at previous `publishedTip=C0`. The push uses an exact commit refspec plus explicit force-with-lease; success advances to `Ready(C1)` only after post-push remote proof and updates `publishedTip=C1`.
- **Publish idempotency/recovery:** remote already at `C1` is already satisfied; a failed push with remote proven unchanged leaves `CommittedUnpublished`; an attempted push whose remote outcome cannot be inspected persists `PublicationUncertain`; retry reconciles remote before any further push. Any observed remote tip other than previous published tip or intended commit returns `REMOTE_BRANCH_DIVERGED` and is never overwritten.
- **latest journal rollover:** retain the completed Apply journal after Publish as exact `previousPublishedTip → publishedTip` package evidence. A later P2 from `Ready(C1)` may replace it only after proving that journal exactly describes the published `C1`, then creates a new journal with `baseHead=C1`.
- **uses:** Replacement Package, Repository Target, ChangeSet, execution state, durable Apply journal, local/published package commit, remote ChangeSet branch, User Operation; Path Ownership remains legacy-only.
- **touches:** Swing **Apply Package** Prepare/Authorize/Execute plus diagnostic **Start workspace / Commit applied / Publish**, Core, StateStore workspace/Apply journals, action/package protocol, package validation, shared exact file mutation and Git worktree/commit/remote verification.
- **depends on:** SL-10 Work Intent plus registered target/origin verification and SL-11 workspace semantics. With `targetBranch` in OBS-ACTION, missing workspace establishment is invoked automatically rather than required as a prior manual user step.
- **ordinary composition / retry:** explicit `targetBranch` selects automatic Git-backed Apply Package. `PACKAGE.json.workIntent` is required and the exact Issue is ensured before workspace/repository mutation; then missing workspace is ensured from package identity; `AppliedUncommitted` resumes Commit; `CommittedUnpublished` resumes Publish; `PublicationUncertain` reconciles Publish; same published `Ready` is proof-only. `targetBranch` omission preserves legacy/manual compatibility and an existing legacy ChangeSet is never silently converted.
- **transitional boundary:** Git-derived Current Change/ReviewDecision and Finalize are not migrated yet. A successful automatic Git-backed Apply Package has no legacy ReviewDiff; legacy Review/Finalize remain fail-closed.

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

### `SL-RPKG-10 — Manage Repository Work Intent`
- **implements:** durable semantic work identity before Git execution. One GitHub Issue carries `Title / Goal / Why / Acceptance` plus exact `ChangeSet-Id: X` inside an App-managed block.
- **standalone user result:** `OBS-ACTION action: create-work-intent` resolves a small Work Intent JSON file, creates/adopts/verifies the exact Issue, persists its number/URL, and stops without branch/worktree/package mutation.
- **composed user result:** automatic `OBS-ACTION action: apply-package` requires the equivalent `PACKAGE.json.workIntent` and ensures the same Issue before invoking SL-11 and SL-01.
- **idempotency/recovery:** exact ChangeSet marker is searched before create; one Issue is adopted, multiple marker matches fail closed. A durable Work Intent journal is persisted before create; a lost create response is reconciled by the exact marker before another create. Existing managed content can be updated on the same Issue and is then re-read/verified.
- **persistence:** `work-intents/<changeSetId>.json` stores repository identity, Issue number/URL, semantic fields and fingerprint; `work-intent-journals/` supports create recovery. ChangeSet schema 4 carries `issueNumber`/`issueUrl` when a ChangeSet exists.
- **GitHub transport:** authenticated GitHub CLI (`gh api`). Transport/auth failure happens before automatic workspace/package mutation; unresolved create-side-effect truth is reported as `WORK_INTENT_UNCERTAIN`.
- **external command boundary:** current `OBS-ACTION/1` deliberately exposes only `create-work-intent` and `apply-package`. Start workspace, manual Apply, Commit applied, Publish, Refresh/Copy/Open, Finalize, Retry Push, Reopen and other modular/recovery actions remain direct Swing/Core controls rather than `action:` values.
- **does not:** create branch/worktree, apply files, commit, publish or create PR when used standalone.

### `SL-RPKG-11 — Start ChangeSet Workspace`
- **implements:** first App-first Git-backed migration capability: explicitly create one isolated exact Git workspace for a new ChangeSet.
- **uses:** Repository Target, ChangeSet identity/label, target branch, `baseCommit`, `publishedTip`, branch, worktree and execution `Ready`.
- **touches:** Swing **Start workspace**, Core, StateStore workspace journal/worktree paths and Git worktree/branch mechanics.
- **result:** local `targetBranch @ C0` is pinned as `baseCommit=C0` / `publishedTip=C0`; deterministic branch `changeset/<changeSetId>` and deterministic isolated worktree are created and verified clean against the same Git common directory; ChangeSet persists as `Active · Ready`.
- **idempotency/recovery:** an exact workspace journal is durably written before the first Git mutation. Retry either returns an already-proven persisted Ready workspace or reconciles only the exact journal-owned partial branch/worktree; an unjournaled deterministic branch/path collision fails closed.
- **ordinary composition:** SL-11 remains independently callable, but an ordinary OBS-ACTION with explicit `targetBranch` automatically ensures this slice when the package ChangeSet is absent. The user does not manually enter `changeSetId`, label or target branch; package identity + resolved Repository Target + action `targetBranch` are the inputs.
- **transitional boundary:** Apply/Commit/Publish are migrated and composed by SL-RPKG-01. Current Change, PR, ReviewDecision and integration Finalize remain unmigrated; legacy owned-path Review/Finalize stay blocked for these workspaces.

## Shared domain concepts

No separate Domain owner is required for the current model.

- **Repository Target** — stable registered local target ID; has one Repository Identity and one mutable registered location. Same-origin clones remain distinct targets.
- **ChangeSet** — one logical repository-work identity. Legacy ChangeSets retain continuation/Review/publication/Reopen fields; new Git-backed work additionally persists Work Intent `issueNumber`/`issueUrl`, `targetBranch`, `branch`, `worktree`, `baseCommit`, `publishedTip` and execution state.
- **Path Ownership** — `(Repository Target, repository-relative path)` has at most one unfinished ChangeSet owner.
- **Current Change** — legacy ChangeSets still use cumulative persisted ReviewDiff. Git-backed `AppliedUncommitted` work currently has no migrated Current Change projection until SL-RPKG-02 moves to Git-derived diffs.
- **Lifecycle / execution (transitional)** — legacy work retains Active → Publication Pending → Finalized with Reopen; Git-backed package revisions realize `Ready(C0) → AppliedUncommitted(P1) → CommittedUnpublished(P1,C1) → Ready(C1)` with recoverable `PublicationUncertain`. Ordinary Apply Package dispatches/resumes across those states; later slices migrate review/finalization.
- **External Interaction** — one exact handoff source/artifact + exact conversation + semantic delivery/cancellation/uncertainty truth.
- **User Operation** — application execution/outcome context, separate from ChangeSet lifecycle.

## Cross-slice boundaries

- Package production is external to the app and governed by [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md).
- Repository Snapshot format/consistency retains [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md).
- Java ↔ extension ↔ ChatGPT coordination retains [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md).
- UI layout detail, ordinary persistence records, class/method structure and deterministic implementation detail stay in code/tests unless they materially affect a Scenario or focused contract.
- Automated proof responsibility and the Slice-to-test map are owned by [`testing-plan.md`](testing-plan.md); behavior is not duplicated there.
- Operated Windows/Edge/ChatGPT evidence is tracked only in [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md).
