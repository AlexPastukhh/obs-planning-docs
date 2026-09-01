# Replacement Package App — Apply Result Contract

Status: active current contract

`OBS-APPLY-RESULT/1` is the small clipboard handoff emitted by Replacement Package App for established terminal Apply outcomes. It reports established outcome facts only. It does not contain recovery instructions and does not replace the internal cumulative ReviewDiff used by Finalize.

## Receipt shape

Successful Apply:

```text
OBS-APPLY-RESULT/1
status: applied
packageId: <uuid>
changeSetId: <uuid>
```

Known failed Apply:

```text
OBS-APPLY-RESULT/1
status: failed
packageId: <uuid when known>
changeSetId: <uuid when known>
code: <stable error code>
message: <single-line semantic message>
```

Uncertain Apply outcome:

```text
OBS-APPLY-RESULT/1
status: uncertain
packageId: <uuid when known>
changeSetId: <uuid when known>
code: APPLY_ROLLBACK_UNVERIFIED
message: <single-line semantic message>
```

`packageId` and `changeSetId` are required for `applied` and optional for failures that happen before package identity can be established.

## State advancement rule

Only `status: applied` authorizes downstream expected-state advancement with that exact `packageId`.

`failed` and `uncertain` never authorize expected-state advancement.

## Clipboard and ReviewDiff boundary

Successful Apply first copies the typed receipt to the clipboard with read-back verification. For a **legacy** ChangeSet, Apply then publishes the newly generated canonical ReviewDiff according to the persisted `reviewDiffHandling` setting; with `Clipboard` (the default) or `Both`, that ReviewDiff becomes the final clipboard content, while `RepoDiffFile` leaves the receipt final. For a **Git-backed** ChangeSet in the current modular `Ready(C0) → AppliedUncommitted(P1) → CommittedUnpublished(P1,C1) → Ready(C1)` migration, SL-RPKG-02 has not migrated yet, so successful Apply generates no legacy ReviewDiff and the typed receipt remains the final clipboard content. The separate Commit and Publish actions do not create another `OBS-APPLY-RESULT/1`; they advance the same package execution state. `PublicationUncertain` is an internal recoverable Publish state and likewise does not synthesize a second Apply receipt. Clipboard or legacy diff-publication failure is a handoff warning and does not rewrite a proven Apply result.

Terminal non-retryable Apply failures copy the typed failure/uncertain receipt to the clipboard and do not publish a ReviewDiff.

`PACKAGE_NOT_FOUND` is special while **Apply (wait for ZIP)** is polling: intermediate missing-file observations are not terminal outcomes and therefore do not overwrite the clipboard. If the bounded wait expires, the UI reports the typed `PACKAGE_NOT_FOUND` failure; no false intermediate receipt is emitted.

Unexpected Apply exceptions are normalized to the stable `INTERNAL_ERROR` code before they reach receipt, persisted operation outcome or Apply UI reporting.

For legacy ChangeSets, successful typed-receipt/clipboard handoff does not suppress the existing Review-chat delivery path: at the successful-Apply ReviewDiff cutoff, token-assisted binding is reconciled and the current ReviewDiff is queued when eligible. Git-backed work in the migrated Apply/Commit/Publish execution states has no current ReviewDiff yet; token/title binding may still establish future destination state, but there is no automatic ReviewDiff delivery until SL-RPKG-02 migrates.

Refresh Review does not automatically republish ReviewDiff to clipboard or `RepoDiffFile`, but it does automatically queue the refreshed ReviewDiff when the ChangeSet already has a Review-chat binding. Without a binding, the refreshed ReviewDiff remains available for explicit Copy/Open/Send. ReviewDiff remains the internal canonical review/finalization artifact.

## Public error codes

Public failures use stable codes. `message` provides human-readable context but does not define the error type.

- `PACKAGE_INVALID` — archive, manifest, payload or package path is invalid.
- `PACKAGE_NOT_FOUND` — selected/resolved package archive is unavailable.
- `ACTION_PACKAGE_MISMATCH` — OBS-ACTION package identity differs from the archive.
- `REPOSITORY_MISMATCH` — repository target/identity is incompatible with the operation.
- `REPOSITORY_SELECTION_REQUIRED` — more than one valid repository target exists and no concrete target was selected.
- `REPOSITORY_NOT_READY` — repository does not satisfy required Git readiness.
- `PATH_OWNERSHIP_CONFLICT` — another unfinished ChangeSet owns a touched path.
- `BASE_MISMATCH` — an add target already exists when absence is required.
- `SOURCE_STATE_CHANGED` — replace/delete source no longer matches the package expectation.
- `SOURCE_STATE_UNVERIFIABLE` — expected-source equivalence cannot be established safely.
- `RESULT_MISMATCH` — mutation/result verification failed but rollback was verified.
- `APPLY_ROLLBACK_UNVERIFIED` — Apply failed and prior file/ledger state could not be fully restored and verified; receipt status is `uncertain`.
- `STATE_DIVERGED` — persisted/local application state violates another established invariant.
- `REVIEW_STALE` — current review baseline no longer proves the state required by Finalize.
- `FINALIZE_FAILED` — legacy Finalize/publication operation failed.
- `COMMIT_FAILED` — Git-backed Commit action could not establish the exact local package commit; the durable execution state remains recoverable/retryable when its invariants still hold.
- `PUBLISH_FAILED` — Git-backed Publish did not establish the remote ChangeSet tip; when the remote is proven unchanged, the exact local commit remains `CommittedUnpublished` and Publish can be retried.
- `PUBLICATION_UNCERTAIN` — a Publish attempt crossed the remote side-effect boundary but the exact remote tip could not be reconciled; the ChangeSet remains `PublicationUncertain` and retry must inspect remote state before another push.
- `REMOTE_BRANCH_DIVERGED` — the exact remote ChangeSet branch is at neither the expected previous published tip nor the intended package commit, so Publish refuses to overwrite it.
- `SNAPSHOT_EXPORT_FAILED` — repository snapshot export failed.
- `CHAT_BRIDGE_FAILED` — optional ChatGPT bridge interaction failed.
- `INTERNAL_ERROR` — an unexpected failure has no more specific established public type.

`SUCCESS` is a success code, not an error code.
