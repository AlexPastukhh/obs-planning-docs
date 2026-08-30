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
- ChangeSet = stable logical work identity.
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
