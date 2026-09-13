# EVO-RPKG-ADD-APPLY-URI-ENTRY — Add Apply URI Entry

Status: PLANNED
Evolution Kinds: Expansion

## Evolution Intent

Add URI as a second application entry representation for the same fully parameterized Apply command, preserving identical Apply extent and Finalize selection semantics.

## Requires

- `EVO-RPKG-ENABLE-AUTOMATIC-FINALIZATION`.

## Expected Entry State

- the handoff entry already resolves to one stable `PackageApplicationRequest`;
- that request carries all selected Apply modularity and automatic-Finalize semantics;
- Apply Feature owns entry consumption and command behavior.

## Target Owner Promotion Set

- **REPLACE** `../features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md` with the Target Feature body below after realization/revalidation.
- **REVALIDATE/REPLACE AS MATERIAL** URI/protocol/screen/installation/proof owners required for a usable URI entry.

## Target Feature — F-RPKG-APPLY-REPLACEMENT-PACKAGE

# F-RPKG-APPLY-REPLACEMENT-PACKAGE — Apply Replacement Package

Status: active current Feature owner

## Intent

Realize one exact validated replacement package for one Work through explicit, recoverable Apply, Commit and Publish modules.

The modules keep separate operation Results and stopping boundaries, while sharing the same `GitWorkspace`, `ReplacementPackageState`, package journal and per-Work serialization boundary.

## Semantic Entry

The Feature accepts/reads either the supported handoff representation or the supported application URI representation. Both are entry adapters of this same Feature and must resolve to the same semantic `PackageApplicationRequest`. `PACKAGE-PROTOCOL.md` and the URI representation contract own their wire grammars; this Feature owns resolution into and execution of the semantic command.

## Application Command

`PackageApplicationRequest` carries exact Work/package/repository inputs plus:

```text
ApplyExtent = APPLY | APPLY_COMMIT | APPLY_COMMIT_PUBLISH
FinalizeMode = NONE | AUTOMATIC
```

For semantically equivalent inputs:

```text
resolve(handoff) == resolve(uri)
```

The selected entry representation must not change Apply extent, Finalize selection, identity, validation, recovery or Result semantics. The Feature executes the request exactly as defined by the post-automatic-finalization Feature contract.

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

### Entry ownership

The Feature owns accepting/reading each supported application entry representation and resolving it into the package-application command whose behavior it executes. Protocol/transport owners define representation grammar; they do not own Apply behavior.

### Finalize remains separate

`F-RPKG-FINALIZE-REPOSITORY-WORK` has different eligibility, effects and terminal Result. Invoking that Feature from this Feature does not transfer Finalize behavior or ownership here and creates no reverse dependency from Finalize to Apply.

### Entry variants do not create alternate workflows

Handoff and URI are entry variants of the same Feature. URI adds no Feature, module, lifecycle state or parallel realization path. Malformed/incomplete/unsupported URI input fails before repository effects.

### No legacy runtime authority

No module dispatches from `Core.ChangeSet.executionState` or uses legacy package lifecycle buckets as authority.


## Transition Obligations

- handoff remains supported unless a separate selected retirement Step says otherwise;
- URI registration/dispatch must fail closed for unsupported/malformed input before repository effects;
- URI transport encoding must preserve the exact semantic request rather than introducing URI-only defaults or behavior.

## Realization / Promotion Gate

The Step may become `IMPLEMENTED` only when URI and handoff entries resolve to the same semantic request for equivalent inputs, the application remains coherent/usable through both entries, required platform registration/proof exists, and the target Feature body is ready for wholesale canonical promotion.
