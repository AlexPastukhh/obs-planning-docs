# F-RPKG-PUBLISH-APPLIED-COMMIT — Publish Applied Commit

## Intent

Publish the exact committed package work-branch tip and establish reliable durable evidence of the external publication state.

## Principal Result

`Result<ReplacementPackageState, PublishFailure>`

Operation Result says what happened in this invocation. `PublicationObservation` says what remote fact is currently proven.

## Publication evidence

```text
NotRequested
NotConfirmed
ConfirmedAbsent
ConfirmedTip(sha)
```

`NotConfirmed` means publication of the intended commit is not currently proven; remote observation is required before any further push. It is also the conservative write-ahead guard persisted immediately before a possible push.

## Expected application behavior

| Behavior step | Requirement |
|---|---|
| Require exact committed state | Resolve `GitWorkspace`, exact package state and durable package journal; derive the previous publication boundary from journal `baseHead`. |
| Observe before any possible push | `NotRequested` and `NotConfirmed` first perform exact remote observation. |
| Decide from observation | Exact intended tip → success; remote absent or exact package `baseHead` → push may be safe; any other tip → `REMOTE_BRANCH_DIVERGED`, no push. |
| Persist uncertainty guard | Before mechanics may push, durably save `NotConfirmed`; persistence failure blocks the side effect. |
| Push with exact lease | Push only exact package commit to derived Work branch using the observed previous tip/absence as lease authority. |
| Reconcile after possible push | Observe exact remote branch again. Exact intended tip → success; unchanged previous/absent → retryable push failure; anything else → divergence. |
| Persist stronger evidence | Confirmation is durable. If stronger evidence cannot be saved after possible push, durable `NotConfirmed` remains retry authority. |

`Retry Publish` invokes the same Feature. It never blindly repushes an unconfirmed prior effect and never uses `Core.ChangeSet.publishedTip` or `PublicationUncertain` as authority.
