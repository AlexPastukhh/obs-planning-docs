# Replacement Package App Data And State

Status: active V0.1 state contract
Scope: application settings, persistent ChangeSet/ApplicationAttempt/ReviewDiff records and lifecycle authority.

## 1. Authorities

```text
Git HEAD       = committed repository state
working tree   = actual current file state
application ledger = logical ChangeSet ownership/history/review metadata
```

Ledger disagreement with actual repository state never overrides Git/filesystem reality; unresolved disagreement becomes `STATE_DIVERGED`.

## 2. State Root

Default Windows root:

```text
%LOCALAPPDATA%\OBS\ReplacementPackageApp\
```

Fallback when `LOCALAPPDATA` is unavailable:

```text
$HOME\.obs\ReplacementPackageApp\
```

Structure:

```text
settings.json
changesets/<changeSetId>.json
attempts/<attemptId>.json
review-diffs/<changeSetId>/<attemptId>.diff
locks/state.lock
```

No ledger/state file is intentionally stored inside the target repository.

## 3. Settings

```text
repositoryRoot
reviewDiffHandling: Clipboard | RepoDiffFile | Both
```

`repositoryRoot` is user/application configuration, not `OBS-ACTION` data.

## 4. ChangeSet

Minimum persisted fields:

```text
schemaVersion
changeSetId
changeSetLabel
repositoryIdentity
repositoryRoot
ownedPaths[]
status
lastPackageId
currentReview { attemptId, diffPath, sha256, head }
commitSha
branch
createdAt
updatedAt
```

`ownedPaths[]` is the union of paths intentionally claimed by successful/continuing overlays until ownership is released.

## 5. ApplicationAttempt

```text
schemaVersion
attemptId
timestamp
name
repositoryIdentity
repositoryRoot
archivePath
archiveSha256
packageId
changeSetId
result: SUCCESS | FAILED
code
message
reviewDiffPath
reviewDiffSha256
```

Failed attempts are retained when enough identity/state is known to write a meaningful record.

## 6. ReviewDiff And Approval Identity

Each successful apply creates a new **cumulative** review record from current `HEAD` to current working tree for all owned paths. Older review records remain history but are stale/non-current after a later overlay.

Approval binds to exact bytes:

```text
ReviewedDiffSha256 = SHA-256(exact canonical current diff file bytes)
```

Finalize regenerates the diff; mismatch is `REVIEW_STALE`.

## 7. Lifecycle

```text
Active
  → successful apply keeps Active and replaces currentReview
  → successful commit + successful push → Finalized
  → successful commit + failed push → CommittedPendingPush

CommittedPendingPush
  → Retry Push success → Finalized
  → Retry Push failure → remains CommittedPendingPush
```

`Finalized` releases path ownership. Historical files remain.

## 8. Path Ownership / Dirty State

For one repository identity, active/CommittedPendingPush ChangeSets reserve their `ownedPaths`.

A new ChangeSet cannot claim a path that is already dirty relative to HEAD/staged state unless that path is already owned by the same continuing ChangeSet. V0.1 has no implicit "adopt dirty unowned path" operation.

## 9. Repo Review Artifact

Optional `_ai-review-diffs/**` files are service artifacts. They are deliberately outside ChangeSet ownership and Finalize staging; users may delete them independently.
