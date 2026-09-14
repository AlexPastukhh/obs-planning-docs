# EVO-RPKG-ENABLE-AUTOMATIC-FINALIZATION — Enable Automatic Finalization

Status: PLANNED
Evolution Kinds: Expansion / Refactoring

## Evolution Intent

Extend the parameterized Apply entry so one accepted package-application command may intentionally continue from the Apply Feature into the independently callable Finalize Feature.

## Requires

- `EVO-RPKG-PARAMETERIZE-APPLY-HANDOFF`;
- `EVO-RPKG-INTRODUCE-WORK-FINALIZATION`.

## Expected Entry State

- Apply Feature already accepts `ApplyExtent` and is usable at each selected stopping boundary;
- `F-RPKG-FINALIZE-REPOSITORY-WORK` is independently callable and owns its own eligibility/effects/Result;
- Finalize has no dependency on Apply.

## Target Owner Promotion Set

- **REPLACE** `../features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md` with the Target Feature body below after realization/revalidation.
- **REVALIDATE/REPLACE AS MATERIAL** protocol/result/screen/proof owners that represent `FinalizeMode`;
- **REFERENCE ONLY** the independently current Finalize Feature unless this Step discovers a material Finalize-contract change.

## Target Feature — F-RPKG-APPLY-REPLACEMENT-PACKAGE

# F-RPKG-APPLY-REPLACEMENT-PACKAGE — Apply Replacement Package

Status: active current Feature owner

## Intent

Realize one exact validated replacement package for one Work through explicit, recoverable Apply, Commit and Publish modules.

The modules keep separate operation Results and stopping boundaries, while sharing the same `GitWorkspace`, `ReplacementPackageState`, package journal and per-Work serialization boundary.

## Semantic Entry

The Feature accepts/reads the supported `OBS-ACTION/1` handoff with `action: apply-package`. The resolved command carries both requested `ApplyExtent` and `FinalizeMode`. The Feature owns interpreting those selections. URI entry is not part of this target state.

## Application Command

`PackageApplicationRequest` carries exact Work/package/repository inputs plus:

```text
ApplyExtent = APPLY | APPLY_COMMIT | APPLY_COMMIT_PUBLISH
FinalizeMode = NONE | AUTOMATIC
```

The Feature executes Apply/Commit/Publish exactly to the requested `ApplyExtent`. If `FinalizeMode = AUTOMATIC`, the Feature may then invoke the independently callable `F-RPKG-FINALIZE-REPOSITORY-WORK` only when the command combination and Finalize prerequisites are valid. The exact admissibility rule for combinations must be selected before realization; the implementation must never silently extend a requested extent behind the caller's back.

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

### Intentional one-way cross-Feature composition

One Apply entry may intentionally execute this Feature and then invoke `F-RPKG-FINALIZE-REPOSITORY-WORK`. This is a selected composition owned by this Feature's semantic entry, not a merger of Feature boundaries. Finalize keeps its own input, eligibility, effects, recovery and Result and does not depend on Apply or on the entry representation.

### No legacy runtime authority

No module dispatches from `Core.ChangeSet.executionState` or uses legacy package lifecycle buckets as authority.


## Transition Obligations

- keep Finalize independently invokable;
- do not duplicate Finalize behavior inside Apply;
- select the exact admissibility rule for `ApplyExtent × FinalizeMode` before implementation;
- invalid combinations must fail before repository effects rather than being silently reinterpreted.

## Realization / Promotion Gate

The Step may become `IMPLEMENTED` only when the full target Apply Feature, command representation and proof are realized together, automatic composition preserves Finalize independence, and the target Feature body is ready for wholesale promotion to the canonical Apply owner.
