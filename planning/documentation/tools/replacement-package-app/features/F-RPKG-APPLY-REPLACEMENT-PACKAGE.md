# F-RPKG-APPLY-REPLACEMENT-PACKAGE — Apply Replacement Package

Status: active current Feature owner

## Intent

Realize one exact validated replacement package for one Work through explicit, recoverable Apply, Commit and Publish modules.

The modules keep separate operation Results and stopping boundaries, while sharing the same `GitWorkspace`, `ReplacementPackageState`, package journal and per-Work serialization boundary. In the current executable, manual UI/CLI entries may invoke modules separately, while automatic `OBS-ACTION apply-package` composes all three modules after workspace establishment.

## Principal Result

The Feature's durable realization fact is `ReplacementPackageState` for the exact Work/package identity:

- after **Apply**, exact package bytes are established and package identity is durable;
- after **Commit**, exact `commitSha` is durable;
- after **Publish**, exact remote publication evidence is durable in `PublicationObservation`.

Each concrete module invocation returns its own `Result<..., ...>`. Operation Result and durable package state remain distinct.

## Module 1 — Apply

### Result

`Result<ReplacementPackageState, ApplyFailure>`

Success means exact package bytes are established in the Work worktree and exact package identity is durably recorded. Apply stops before Commit.

### Expected behavior

| Behavior step | Requirement |
|---|---|
| Read package once | The supplied ZIP is opened/validated/hashed once for the invocation; mutation consumes the captured `PackageData` bytes rather than reopening the mutable archive path. |
| Resolve exact Work workspace | Apply requires persisted `GitWorkspace` for the same WorkId and requires package `repositoryIdentity` to equal that workspace Repository Target identity. |
| Enforce package continuity | Same `packageId` is idempotent only for the same exact archive SHA; a different unfinished package blocks a new Apply. |
| Prove applicability before mutation | Replace/delete require exact expected source; add requires required absence; no undeclared payload is applied. |
| Journal before mutation | Durable schema-3 journal captures exact package/workspace/base and prior/intended bytes before first file mutation. It starts unproven; retry may only re-prove against unchanged captured prior bytes and may not restore from that journal. Only successful applicability proof durably sets `applicabilityProven=true`, after which it may serve as recovery authority. Digest integrity and captured-`PackageData` byte binding are independent checks. |
| Persist exact state | After intended bytes are proven, persist `ReplacementPackageState(WorkId, packageIdentity, no commit, NotRequested)`. |

If file effects completed after a proven journal but package-state persistence failed, repeating the exact package recovers from that durable proof and persists the same state without rereading different archive bytes. If applicability failed before promotion, retry must prove applicability again and cannot convert matching prior/intended bytes into success.

## Module 2 — Commit applied

### Result

`Result<ReplacementPackageState, CommitAppliedFailure>`

Success returns the exact package state with durable `commitSha`. Commit stops before Publish.

### Expected behavior

| Behavior step | Requirement |
|---|---|
| Load exact owners | Require the Work's persisted `GitWorkspace` and exact `ReplacementPackageState`. |
| Re-prove package realization | Durable package journal must match WorkId, packageId, archive SHA, worktree, derived branch and exact intended file state. |
| Commit only intended package paths | Unrelated staged/dirty work fails closed; commit carries exact Package-Id and schema-1 ChangeSet-Id/WorkId trailer. |
| Recover exact commit | If commit creation succeeded before package-state persistence, retry proves exact branch HEAD, parent, trailers, changed paths and bytes, then reuses that commit. |
| Persist commit fact | Exact commit SHA is stored in `ReplacementPackageState`; re-proving the same commit preserves publication evidence. |

## Module 3 — Publish / Retry Publish

### Result

`Result<ReplacementPackageState, PublishFailure>`

Operation Result says what happened in this invocation. `PublicationObservation` says what remote fact is currently proven.

### Publication evidence

```text
NotRequested
NotConfirmed
ConfirmedAbsent
ConfirmedTip(sha)
```

`NotConfirmed` means publication of the intended commit is not currently proven; remote observation is required before any further push. It is also the conservative write-ahead guard persisted immediately before a possible push.

### Expected behavior

| Behavior step | Requirement |
|---|---|
| Require exact committed state | Resolve `GitWorkspace`, exact package state and durable package journal; derive the previous publication boundary from journal `baseHead`. |
| Observe before any possible push | Every not-yet-published invocation captures one verified fetch transport endpoint and performs fresh remote observation through isolated Git transport state; previously persisted `ConfirmedAbsent`/previous-tip evidence is not reusable push authorization. |
| Decide from observation | Exact intended tip → success; remote absent or exact package `baseHead` → push may be safe; any other tip → `REMOTE_BRANCH_DIVERGED`, no push. |
| Persist uncertainty guard | Before mechanics may push, durably save `NotConfirmed`; persistence failure blocks the side effect. |
| Fence destination + push with exact lease | If a push may occur, capture one verified push transport endpoint whose RepositoryIdentity matches observation/source authority, persist `NotConfirmed`, transfer the exact commit into isolated transport state, then push with the exact lease. Registered-repository `origin`/`pushurl` changes and later `url.*.insteadOf` / `pushInsteadOf` changes cannot redirect the side effect. Repository mismatch is a Publish operation failure, not evidence that durable Work state diverged. |
| Reconcile after possible push | Observe exact remote branch again. Exact intended tip → success; unchanged previous/absent → retryable push failure; anything else → divergence. |
| Persist stronger evidence | Confirmation is durable. If stronger evidence cannot be saved after possible push, durable `NotConfirmed` remains retry authority. |

`Retry Publish` invokes this same module. It never blindly repushes an unconfirmed prior effect and never uses `Core.ChangeSet.publishedTip` or `PublicationUncertain` as authority.

## Feature boundary decisions

### One Feature, three modules

Apply, Commit and Publish are explicit module/operation boundaries of one replacement-package Apply Feature. Separate operation Results and explicit stop points do not make them separate product Features.

The current automatic `OBS-ACTION apply-package` route composes Start workspace → Apply → Commit → Publish. Current manual module entries remain valid and do not imply a generic Resume abstraction.

### Current command scope

The current target command has no `ApplyExtent` and does not automatically invoke the future Finalize Feature. Planned command parameterization belongs to `../evolution-steps-map.md` until implemented; this current Feature owner must not present those future semantics as existing behavior.

### Finalize remains separate

`F-RPKG-FINALIZE-REPOSITORY-WORK` has different eligibility, effects and terminal Result. Future evolution may allow this Apply Feature's semantic entry to invoke Finalize intentionally, but that does not transfer Finalize behavior or ownership into this Feature.

### No legacy runtime authority

No module dispatches from `Core.ChangeSet.executionState` or uses legacy package lifecycle buckets as authority.
