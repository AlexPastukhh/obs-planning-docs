# SCN-RPKG-COMPLETE-REPOSITORY-WORK — Complete Prepared Repository Work

Status: active current Scenario owner

## User goal

Safely bring prepared repository work into the correct concrete local repository, continue the exact logical work when it already exists, understand its cumulative current change, and finish/publish it without capturing unrelated work. The same Scenario covers Publication Pending recovery and explicit reopening of Finalized logical work when the user deliberately chooses to continue it.

## Main flow

1. The user supplies a replacement ZIP and/or `OBS-ACTION/1`; the current/registered Repository Target context remains available for exact target resolution. Input is passive until Apply Package.
2. **Apply Package** prepares immediately. **Apply Package (wait for ZIP)** freezes click-time archive/action/target inputs and retries only `PACKAGE_NOT_FOUND` roughly every two seconds for at most twelve seconds before entering the same prepared operation once.
3. The package is fully validated and the exact Repository Target is resolved. `PACKAGE.json.changeSetId` is the exact continuation identity; UI selection, label similarity and recency cannot substitute another ChangeSet, and same-origin clones are never silently substituted.
4. When OBS-ACTION carries explicit `targetBranch`, the ordinary Git-backed path requires `PACKAGE.json.workIntent`, first ensures/reconciles the exact GitHub Issue by machine marker `ChangeSet-Id:X`, then ensures/reuses the ChangeSet workspace and dispatches the same top-level operation through Apply → Commit → Publish until the package is proven `Ready` at its published tip. Retry resumes from persisted Work Intent/execution truth rather than asking the user to press internal actions manually.
5. When `targetBranch` is omitted, the compatibility legacy path remains available for already-existing legacy producer work: package/source/ownership preflight precedes mutation, successful Apply persists cumulative ReviewDiff, and legacy Finalize/Publication Pending/Reopen semantics remain unchanged.
6. Git-backed Current Change/ReviewDecision/integration Finalize are still separate later migration work; until those slices migrate, Git-backed work remains fenced from legacy Review/Finalize.

## Git-backed migration branch — Manage Repository Work Intent

SL-RPKG-10 exists independently of Git execution. The external `OBS-ACTION/1` route `action: create-work-intent` resolves one standalone Work Intent JSON (`changeSetId`, repository identity, Title, Goal, Why, Acceptance), ensures one GitHub Issue carrying the exact `ChangeSet-Id:X` marker inside the App-managed block, persists the Issue reference, and stops. It does not create a ChangeSet/worktree or apply repository files.

The same domain ensure is the first stage of ordinary target-mode `action: apply-package`. For that route the semantic input is `PACKAGE.json.workIntent`. The App searches exact repository Issues by the stable marker before create, adopts one exact managed Issue, fails closed on duplicates, durably journals create intent before the side effect, and reconciles a lost create response by marker before another create. Existing managed content may be updated on the same Issue and is re-read/verified. If a ChangeSet already exists, its `issueNumber`/`issueUrl` are synchronized with the persisted Work Intent; a newly created SL-11 workspace inherits that reference.

Current external command routing is intentionally narrow: only `create-work-intent` and `apply-package` are `OBS-ACTION action:` values. Start workspace, manual Apply, Commit applied, Publish, Refresh/Copy/Open Current Change, Finalize, Retry Push, Reopen and other diagnostic/recovery actions remain direct Swing/Core controls rather than serialized OBS-ACTION commands.

## Git-backed migration branch — Start ChangeSet Workspace

The first migrated capability is available separately from the legacy Apply flow. **Start workspace** takes a new exact `changeSetId`, stable label and local target branch for the selected Repository Target. It resolves that branch to exact `C0`, durably journals the workspace intent before Git mutation, creates deterministic branch `changeset/<changeSetId>` plus an isolated worktree, verifies that worktree belongs to the same Git common repository and is clean at `C0`, then persists `baseCommit=C0`, `publishedTip=C0`, lifecycle `Active`, execution `Ready`.

The action is idempotent for its current `Ready` state. A repeat proves the persisted branch/worktree/HEAD instead of recreating it; a crash after journal creation may reconcile the exact journal-owned partial workspace. Existing branch/worktree material without that journal is not adopted. Movement of the target branch after successful workspace creation does not rewrite the pinned `baseCommit`.

The next migrated stage is **Apply package files** for that existing workspace. From `Ready(C0)`, Apply verifies the persisted branch/worktree at exact `publishedTip=C0`, requires a clean real index, performs expected-source proof against the worktree, durably records an Apply journal before the first file mutation, and mutates only the isolated worktree. The journal records exact actual prior existence/bytes and exact intended result bytes per package operation together with package/archive identity and `baseHead`. Successful file mutation persists `AppliedUncommitted(P1)` while branch HEAD and `publishedTip` remain `C0`; the Git-backed ChangeSet acquires no legacy Path Ownership.

Retry is idempotent against that journal. If all package paths already equal the intended result, retry persists/returns `AppliedUncommitted` without reapplying. If a crash leaves only prior or a mixture of exact prior/intended package-path states, retry restores the exact recorded prior bytes and applies the package again. If a journal-owned package path contains other bytes consistent with an interrupted file write, those current bytes are preserved under app-state recovery evidence before exact prior restoration and retry. Unrelated dirty worktree paths, a changed branch/HEAD or a different package against `AppliedUncommitted` still fail closed. The durable Apply journal remains after success.

The next modular extension of the same SL-RPKG-01 is **Commit applied package**. From `AppliedUncommitted(P1)`, Commit re-proves the exact ChangeSet branch/worktree and durable intended package result at `publishedTip=C0`, refuses staged paths outside the journal, stages only package paths, and creates one local `C1` carrying exact `Package-Id: P1` and `ChangeSet-Id: X` trailers. Success persists `CommittedUnpublished(P1,C1)` with `commitSha=C1`; `publishedTip` deliberately remains `C0` because publication has not happened yet.

Commit retry is idempotent across its side-effect boundaries. A journal-only staged index can be restaged and committed safely. If a crash created a commit before state persistence, retry may recover that existing `HEAD=C1` only after proving it is the single-parent child of `C0`, has the exact package/ChangeSet trailers, changes no path outside the durable package paths, preserves the exact intended worktree bytes, and has a clean index/worktree. A moved head lacking that proof fails closed. Repeated Commit or same-package Apply after a proven `CommittedUnpublished` state returns already-satisfied semantics instead of creating another commit.

The next modular extension is **Publish applied commit**. From `CommittedUnpublished(P1,C1)`, Publish re-proves the exact local package commit and checks the exact remote `changeset/<id>` branch before any push. Remote absence or exact previous `publishedTip=C0` permits one exact `C1` ref update protected by an explicit force-with-lease; remote `C1` is already satisfied. Any other observed remote tip returns `REMOTE_BRANCH_DIVERGED` without overwrite. Success is persisted only after a post-push exact remote lookup proves `C1`, then execution returns to `Ready(C1)` and `publishedTip=C1`.

If a push command fails but the post-attempt remote lookup proves the branch is still absent/at `C0`, the state remains `CommittedUnpublished(P1,C1)` and Publish is retryable. If a push was attempted but the remote cannot be inspected afterward, execution becomes `PublicationUncertain(P1,C1)`. Retry from that state first reconciles remote: exact `C1` becomes already-satisfied `Ready(C1)` without another push; absent/`C0` may retry the exact leased push; another tip fails closed. The completed Apply journal is retained as the exact latest published package boundary; when the next package P2 begins from `Ready(C1)`, that old journal must first prove the published `C1` and is then replaced by the new `baseHead=C1` journal.

### Ordinary automatic Apply Package composition

The separate Git-backed actions remain independently callable domain/recovery boundaries, but they are no longer the ordinary user sequence. When an authorized `OBS-ACTION/1` includes explicit `targetBranch`, one top-level **Apply Package** operation reuses the existing package intake and target resolution, then:

1. ensures SL-RPKG-10 from `PACKAGE.json.workIntent`, creating/adopting/updating one exact GitHub Issue before Git workspace mutation;
2. if `changeSetId` has no persisted ChangeSet, ensures SL-RPKG-11 using the package `changeSetId` / `changeSetLabel`, the resolved Repository Target and the explicit `targetBranch`;
3. if the Git-backed workspace already exists, proves the package target/label/target-branch identity instead of recreating it;
4. dispatches package-file Apply from persisted state;
5. continues/recover Commit when needed;
6. continues/reconciles Publish when needed;
7. returns success only after the package is proven published at `Ready(C1)` (or the same published package is already satisfied).

The same pasted command is therefore the retry/resume entry. `AppliedUncommitted` resumes at Commit, `CommittedUnpublished` resumes at Publish, `PublicationUncertain` reconciles Publish before any further package action, and already-published `Ready` is proof-only. A failure after an earlier successful internal action preserves that established state for the next retry.

`targetBranch` is explicit operation input and is never guessed from the Repository Target's current checkout branch. If `targetBranch` is present for an already-existing legacy ChangeSet, the operation fails closed rather than converting legacy work in place. Omitting `targetBranch` retains the legacy/manual compatibility path, which is needed for already-open legacy ChangeSets created before this composition existed.

The Swing **Start workspace**, **Commit applied** and **Publish** controls remain useful diagnostic/recovery/migration surfaces, but ordinary target work does not require the user to copy IDs/labels or press those internal steps manually.

This remains a deliberate migration boundary. Git-backed Apply/Commit/Publish do **not** yet generate the legacy owned-path ReviewDiff, and Git-derived Current Change, PR/ReviewDecision and Finalize are still unmigrated. Legacy Review and Finalize are therefore blocked for the Git-backed ChangeSet instead of falling back to the Repository Target main workspace.

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
- ChangeSet = stable logical work identity; Git-backed workspaces pin target branch/base/published tip and isolated branch/worktree, then progress through explicit execution states `Ready`, `AppliedUncommitted`, `CommittedUnpublished` and recoverable `PublicationUncertain`.
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
