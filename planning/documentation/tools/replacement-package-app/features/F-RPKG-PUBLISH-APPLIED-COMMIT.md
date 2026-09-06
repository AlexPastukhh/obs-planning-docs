# F-RPKG-PUBLISH-APPLIED-COMMIT — Publish Applied Commit

## Identity

`F-RPKG-PUBLISH-APPLIED-COMMIT`

## Intent

Publish the exact committed replacement-package work-branch tip and establish a reliable observation of the external publication state.

## Principal Result

`Result<ReplacementPackageState, PublishFailure>`

Success means the concrete Publish/Retry Publish operation established the required publication fact. Failure describes the failed operation; the returned/current `ReplacementPackageState` may still contain facts established by earlier operations.

## Publication evidence

`PublicationObservation` is state/evidence, not an operation result:

```text
NotRequested
NotConfirmed
ConfirmedAbsent
ConfirmedTip(commitSha)
```

`ConfirmedAbsent` means a reliable observation proved the remote work branch absent. `ConfirmedTip(sha)` means a reliable observation proved that exact current remote work-branch tip. `NotConfirmed` means no reliable confirmation is currently available after a publication attempt.

## Expected application behavior

| Behavior step | Requirement(s) |
|---|---|
| **1. Require exact committed package state.** | `BR-RPKG-PUBLISH-REQUIRES-COMMIT` — Publish requires the exact package state and exact local package commit. |
| **2. Reconcile before retry when confirmation is missing.** | `BR-RPKG-PUBLISH-CONFIRM-BEFORE-RETRY` — `NotConfirmed` requires exact remote observation before another push is allowed. |
| **3. Push only when publication is proven absent/not-at-current-commit and retry is safe.** | `BR-RPKG-PUBLISH-NO-BLIND-RETRY` — no second push is attempted while the previous external effect remains unconfirmed. |
| **4. Confirm external state after push.** | `BR-RPKG-PUBLISH-EXACT-REMOTE-TIP` — Published is true only when `ConfirmedTip(exactCommitSha)` is established. |
| **5. Persist the observation.** | `BR-RPKG-PUBLISH-DURABLE-OBSERVATION` — reliable remote observations survive later calls instead of being reconstructed only from a transient failure. |

A failed push with a successful observation is a push failure with confirmed publication state. Inability to obtain a reliable observation is `PUBLICATION_CONFIRMATION_FAILED`; it is not silently converted into a generic progress state.

`Retry Publish` is the same Feature operation invoked after an earlier failure. It is a separate UI action because the user is explicitly retrying/reconciling Publish, but it does not introduce a generic package Resume abstraction.
