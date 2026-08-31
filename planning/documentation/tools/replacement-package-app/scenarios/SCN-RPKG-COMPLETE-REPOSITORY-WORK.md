# SCN-RPKG-COMPLETE-REPOSITORY-WORK — Complete Prepared Repository Work

Status: active current Scenario owner

## User goal

Safely bring prepared repository work into the correct concrete local repository, continue the exact logical work when it already exists, understand its cumulative current change, and finish/publish it without capturing unrelated work. The same Scenario covers Publication Pending recovery and explicit reopening of Finalized logical work when the user deliberately chooses to continue it.

## Main flow

1. The user selects/registers a concrete Repository Target and supplies a replacement ZIP and/or `OBS-ACTION/1`. Input is passive until Apply.
2. Ordinary `Apply` prepares immediately. `Apply (wait for ZIP)` freezes click-time archive/action/target inputs and retries only `PACKAGE_NOT_FOUND` roughly every two seconds for at most twelve seconds before entering the same prepared Apply path once.
3. The package is fully validated. `PACKAGE.json.changeSetId` is the exact continuation identity: Active continues that exact work; Finalized blocks until explicit Reopen; UI selection, label similarity and recency cannot substitute another ChangeSet.
4. The exact Repository Target is resolved. An existing ChangeSet's persisted target is authoritative. New work may use the current matching target, a unique other matching target, or explicit user choice when several clones match. No clone is silently substituted.
5. Before mutation the application revalidates Git work-tree root/origin, readiness, package repository identity, path ownership/adoptability and expected source state for every operation.
6. For `replace/delete`, raw current bytes may match the package base directly. Otherwise Git path-specific clean/filter semantics are used to prove equivalence. Real difference blocks as source changed; inability to verify equivalence fails closed.
7. Only after complete preflight passes are declared paths mutated. Result bytes are verified; bounded rollback is attempted on failure and unresolved divergence is reported truthfully.
8. Successful Apply creates/continues one ChangeSet, maintains repository-scoped ownership, records the attempt and persists cumulative Current Change/ReviewDiff.
9. Refresh/Copy/Open Current Change are inspection conveniences, not approval gates.
10. Finalize revalidates current work, stages only owned paths, commits only that logical work and pushes it. Empty cumulative work may finalize without an unnecessary commit.
11. If local commit succeeds but push fails, the same ChangeSet remains Publication Pending (`CommittedPendingPush`). Retry Push continues the same work rather than creating a second logical item.
12. Successful completion becomes Finalized and releases live ownership.

## Git-backed migration branch — Start ChangeSet Workspace

The first migrated capability is available separately from the legacy Apply flow. **Start workspace** takes a new exact `changeSetId`, stable label and local target branch for the selected Repository Target. It resolves that branch to exact `C0`, durably journals the workspace intent before Git mutation, creates deterministic branch `changeset/<changeSetId>` plus an isolated worktree, verifies that worktree belongs to the same Git common repository and is clean at `C0`, then persists `baseCommit=C0`, `publishedTip=C0`, lifecycle `Active`, execution `Ready`.

The action is idempotent for its current `Ready` state. A repeat proves the persisted branch/worktree/HEAD instead of recreating it; a crash after journal creation may reconcile the exact journal-owned partial workspace. Existing branch/worktree material without that journal is not adopted. Movement of the target branch after successful workspace creation does not rewrite the pinned `baseCommit`.

The next migrated stage is **Apply package files** for that existing workspace. From `Ready(C0)`, Apply verifies the persisted branch/worktree at exact `publishedTip=C0`, requires a clean real index, performs expected-source proof against the worktree, durably records an Apply journal before the first file mutation, and mutates only the isolated worktree. The journal records exact actual prior existence/bytes and exact intended result bytes per package operation together with package/archive identity and `baseHead`. Successful file mutation persists `AppliedUncommitted(P1)` while branch HEAD and `publishedTip` remain `C0`; the Git-backed ChangeSet acquires no legacy Path Ownership.

Retry is idempotent against that journal. If all package paths already equal the intended result, retry persists/returns `AppliedUncommitted` without reapplying. If a crash leaves only prior or a mixture of exact prior/intended package-path states, retry restores the exact recorded prior bytes and applies the package again. If a journal-owned package path contains other bytes consistent with an interrupted file write, those current bytes are preserved under app-state recovery evidence before exact prior restoration and retry. Unrelated dirty worktree paths, a changed branch/HEAD or a different package against `AppliedUncommitted` still fail closed. The durable Apply journal remains after success for later Commit/Abort migration.

This remains a deliberate migration boundary. Git-backed Apply does **not** yet generate the legacy owned-path ReviewDiff, and Commit/Publish, Git-derived Current Change, PR/ReviewDecision and Finalize are still unmigrated. Legacy Review and Finalize are therefore blocked for the Git-backed ChangeSet instead of falling back to the Repository Target main workspace.

## Important branches

### Explicit Reopen

Selecting Finalized history is read-only. `Reopen ChangeSet` revalidates the exact stored Repository Target and verifies historical paths can be reacquired without stealing sibling unfinished ownership or silently adopting unrelated dirty/unowned state. Failure leaves lifecycle/ownership unchanged. Success returns the same ChangeSet identity to Active and preserves finalization history; later Apply still runs normal guards.

### Repository Target location

A Repository Target is one stable registered target ID with a logical `github:owner/repo` Repository Identity and a mutable registered location. Several targets may share one repository identity. `Change repository location` explicitly updates the same target after validating a matching Git work tree and preserves all ChangeSet associations.

### Existing work navigation

The main ChangeSet selector is the work-context selector: current-target unfinished work by default, `All repositories` for unfinished work across registered targets, and `Show history` to add Finalized rows. Selecting another target's work selects that exact target + ChangeSet only. An unavailable stored target remains truthful query state and is never silently replaced.

### Invocation-scoped chat binding

An optional `chatContextToken` resolves asynchronously while repository Apply proceeds. A unique token result is direct bind/rebind authority for the ChangeSet and is independent of Apply success/failure. If resolved by the successful-Apply ReviewDiff cutoff, that ReviewDiff may queue normally; pending/conflicted resolution skips only that automatic delivery. Late unique resolution applies to future deliveries and never retro-sends the skipped ReviewDiff. Legacy `chatTabTitle` remains fallback-only when no token is present and keeps its pre-mutation unique-match/keep-rebind-cancel behavior.

## Data and rules

- Repository Target = stable target identity + repository identity + mutable location.
- ChangeSet = stable logical work identity; Git-backed workspaces pin target branch/base/published tip and isolated branch/worktree, then progress through explicit execution state such as Ready and AppliedUncommitted.
- `(Repository Target, relative path)` has at most one unfinished ChangeSet owner.
- Current Change = cumulative exact current work for one ChangeSet.
- lifecycle = Active → Publication Pending → Finalized, with explicit guarded Finalized → Active Reopen.
- package `changeSetId` cannot be retargeted by UI state.
- source freshness and path ownership are independent protections.
- unrelated dirty/unowned work is never silently adopted.
- repository-without-required-commit reports Repository Not Ready.
- stale Current Change blocks Finalize.
- publication failure preserves successful local work.
- an in-flight operation stays bound to its captured target/work even if UI navigation changes.
