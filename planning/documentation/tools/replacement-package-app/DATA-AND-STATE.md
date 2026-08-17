# Replacement Package App Data And State

Status: active application state contract
Scope: application repository/settings state, persistent ChangeSet/ApplicationAttempt/ReviewDiff records, lifecycle authority, repository-snapshot boundary and browser-delivery side state.

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
chat-bridge.json
chat-bindings/<changeSetId>.json
chat-handoffs/<taskId>.json
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
- Apply/Finalize/Retry Push and Repository Snapshot export require the actual local work-tree root to match a registered path and current origin identity to match the stored identity;
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

## 6. ReviewDiff Identity And Implicit Finalize Baseline

Each successful apply creates a new **cumulative** review record from current `HEAD` to current working tree for all owned paths. Explicit `Refresh Review` also replaces and persists the ChangeSet's `currentReview`. Older review records remain history but are stale/non-current after a later overlay/refresh.

On restart or ChangeSet selection, a persisted current review may be reconstructed only when its canonical diff file exists and exact SHA-256 still matches the recorded value.

The persisted `currentReview.sha256` binds the current ReviewDiff to exact canonical bytes and is the implicit Finalize baseline. It is internal application state, not user approval input. Normal Swing/CLI workflows do not require the user to view, copy or enter a SHA.

`Copy ReviewDiff` / `Open ReviewDiff` are optional inspection conveniences and are never prerequisites for Finalize. Apply or Refresh Review replaces the persisted baseline.

Finalize integrity-checks the persisted canonical ReviewDiff, regenerates the cumulative diff and compares the internal fingerprints. A mismatch is `REVIEW_STALE`; the user refreshes ReviewDiff before retrying Finalize.

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

An explicitly declared package `add` may target a path matched by `.gitignore` when the path is actually absent at preflight. After successful package validation/mutation that path is explicit ChangeSet ownership, so canonical ReviewDiff and Finalize may force-add only that owned path. Ignore rules never authorize adoption of a pre-existing unowned file.

## 9. Repository Snapshot Output Is Not Ledger State

Repository snapshot ZIPs are user-selected external output artifacts. Their destination path, export history and clipboard status are not persisted in `settings.json`, ChangeSets or ApplicationAttempts.

The ZIP itself carries its portable identity beside the exported `snapshot/` folder:

```text
SNAPSHOT.json
BASE-COMMIT.txt + WORKING-TREE.diff   (Local)
COMMIT.txt                            (Committed)
```

Creating a snapshot does not claim paths, change ChangeSet lifecycle or become a prerequisite for Apply/Review/Finalize.

## 10. ChatGPT Bridge State

Browser integration is consumer-only local delivery state and does not enter `PACKAGE.json` or `OBS-ACTION`.

`chat-bridge.json` stores the random loopback pairing token and fixed V1 port. `chat-bindings/<changeSetId>.json` stores one optional ChangeSet → ordinary ChatGPT conversation binding (`conversationKey`, last-known title/URL, bound timestamp). This binding survives continuation/correction packages because they keep the same `changeSetId`.

`chat-handoffs/<taskId>.json` records ReviewDiff/snapshot delivery tasks. Every deliverable task records the exact artifact path, byte length and SHA-256 captured at enqueue; payload delivery requires those bytes still to match. ReviewDiff tasks also reference the canonical `reviewAttemptId`; automatic creation is idempotent for one `changeSetId + reviewAttemptId`. Snapshot handoff records may reference an already-created snapshot ZIP, but this is delivery state rather than repository-snapshot export history and does not change the snapshot contract.

Task lifecycle is independent from ChangeSet lifecycle:

```text
ReviewDiff:
Pending → Claimed → Preparing → SendClicked → Sent | UnknownAfterSend
Pending → Cancelled
Claimed → FailedBeforeSend | Cancelled
Preparing → PreparedUnsent
empty ReviewDiff → NoChanges
claim loss while Claimed → Pending

Snapshot:
Pending → Claimed → Preparing → Attached
Claimed → FailedBeforeSend
Preparing → PreparedUnsent
```

All terminal states (`Sent`, `Attached`, `UnknownAfterSend`, `PreparedUnsent`, `FailedBeforeSend`, `NoChanges`, `Cancelled`) are immutable. `UnknownAfterSend` is never automatically retried. Chat delivery status never authorizes Finalize and a missing/failed bridge never converts a successful Apply/Refresh Review/export into failure.

Open-tab inventory is runtime memory only and is refreshed by the extension; it is not persisted as authoritative state. A claim is valid only while the recorded tab remains in the recorded conversation, and at most one task per conversation may be in `Claimed`/`Preparing`/`SendClicked` at a time. The extension stages `Preparing` immediately before mutating the composer. Rebind/unbind cancels only `Pending`/`Claimed` ReviewDiff tasks and refuses to move a binding while a task is `Preparing` or `SendClicked`; expired in-flight leases are normalized first. Older automatic `Pending`/`Claimed` ReviewDiff tasks are superseded when a newer current ReviewDiff is queued, while an already `Preparing` task is allowed to finish to avoid leaving an unowned composer draft.

## 11. Repo Review Artifact

Optional `_ai-review-diffs/**` files are service artifacts. They are deliberately outside ChangeSet ownership and Finalize staging; users may delete them independently.
