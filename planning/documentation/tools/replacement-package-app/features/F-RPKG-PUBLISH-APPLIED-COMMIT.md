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
| Observe before any possible push | Every not-yet-published invocation captures one exact verified fetch URL and performs fresh remote observation against that URL; previously persisted `ConfirmedAbsent`/previous-tip evidence is not reusable push authorization. |
| Decide from observation | Exact intended tip → success; remote absent or exact package `baseHead` → push may be safe; any other tip → `REMOTE_BRANCH_DIVERGED`, no push. |
| Persist uncertainty guard | Before mechanics may push, durably save `NotConfirmed`; persistence failure blocks the side effect. |
| Fence destination + push with exact lease | If a push may occur, capture one exact verified push URL whose RepositoryIdentity matches observation/source authority, persist `NotConfirmed`, then push to that URL string directly. A later mutation of `origin`/`pushurl` cannot redirect the side effect. |
| Reconcile after possible push | Observe exact remote branch again. Exact intended tip → success; unchanged previous/absent → retryable push failure; anything else → divergence. |
| Persist stronger evidence | Confirmation is durable. If stronger evidence cannot be saved after possible push, durable `NotConfirmed` remains retry authority. |

`Retry Publish` invokes the same Feature. It never blindly repushes an unconfirmed prior effect and never uses `Core.ChangeSet.publishedTip` or `PublicationUncertain` as authority.
