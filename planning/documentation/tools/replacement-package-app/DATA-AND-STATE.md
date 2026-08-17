# Replacement Package App Data And State

Status: active V0.1 state contract
Scope: application repository/settings state, persistent ChangeSet/ApplicationAttempt/ReviewDiff records and lifecycle authority.

## 1. Authorities

```text
Git HEAD       = committed repository state
working tree   = actual current file state
application ledger = logical ChangeSet ownership/history/review metadata
repository registry = local allowlist of Git work trees the app may mutate
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

## 3. Settings / Repository Registry

`settings.json` schema 2 is consumer-only local configuration:

```json
{
  "schemaVersion": 2,
  "repositories": [
    {
      "id": "<local repository-record UUID>",
      "name": "OBS Planning",
      "path": "C:\\Users\\...\\obs-planning-docs",
      "repositoryIdentity": "github:AlexPastukhh/obs-planning-docs"
    }
  ],
  "selectedRepositoryId": "<repository-record UUID or null>",
  "selectedChangeSetId": "<changeSet UUID or null>",
  "reviewDiffHandling": "Clipboard"
}
```

Rules:

- a repository is added only after Core verifies it is a Git work tree and derives supported GitHub identity from `remote.origin.url`;
- Apply/Finalize/Retry Push require the actual local work-tree root to match a registered path and current origin identity to match the stored identity;
- multiple registered local paths are allowed, including multiple clones of one repository identity;
- removing a repository with Active/`CommittedPendingPush` ChangeSets is blocked;
- `selectedRepositoryId` and `selectedChangeSetId` are navigation state, not mutation authority;
- `reviewDiffHandling` remains `Clipboard | RepoDiffFile | Both`;
- legacy schema-1 `repositoryRoot` is migrated to one repository record when that path can be verified; package/OBS-ACTION data never supplies repository registration.

A registered path that is temporarily unavailable remains configuration; use-time verification blocks mutation rather than silently authorizing another path.

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

`changeSetId` remains a stable UUID required by the package protocol. `changeSetLabel` is the normal human-readable presentation identity; Swing may additionally show a short UUID suffix to disambiguate duplicate labels.

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

Each successful apply creates a new **cumulative** review record from current `HEAD` to current working tree for all owned paths. Explicit `Refresh Review` also replaces and persists the ChangeSet's `currentReview`. Older review records remain history but are stale/non-current after a later overlay/refresh.

On restart or ChangeSet selection, a persisted current review may be reconstructed only when its canonical diff file exists and exact SHA-256 still matches the recorded value.

Approval binds to exact bytes:

```text
ReviewedDiffSha256 = SHA-256(exact canonical current diff file bytes)
```

`Approve Current Review` is a Swing convenience that copies the verified current SHA into the local approval field. `Copy ReviewDiff` / `Open ReviewDiff` do not approve anything and are never prerequisites for Finalize. Approval is not persisted as ChangeSet authority; Apply, Refresh Review and ChangeSet selection clear the UI approval field.

Finalize regenerates the diff; mismatch is `REVIEW_STALE`.

## 7. Lifecycle

```text
Active
  → successful apply keeps Active and replaces currentReview
  → explicit Refresh Review keeps Active and replaces currentReview
  → successful commit + successful push → Finalized
  → successful commit + failed push → CommittedPendingPush

CommittedPendingPush
  → Retry Push success → Finalized
  → Retry Push failure → remains CommittedPendingPush
```

`Finalized` releases path ownership. Historical files remain.

## 8. Path Ownership / Dirty State

For one repository identity/local repository root, active/CommittedPendingPush ChangeSets reserve their `ownedPaths`.

A new ChangeSet cannot claim a path that is already dirty relative to HEAD/staged state unless that path is already owned by the same continuing ChangeSet. V0.1 has no implicit "adopt dirty unowned path" operation.

## 9. Repo Review Artifact

Optional `_ai-review-diffs/**` files are service artifacts. They are deliberately outside ChangeSet ownership and Finalize staging; users may delete them independently.
