# Repository Snapshot Export

Status: active V1 repository snapshot contract
Scope: read-only ZIP export of one registered repository for transport/review. This artifact is not a replacement package and does not use `PACKAGE.json` or `OBS-ACTION`.

## 1. Use Case

`UC-RPKG-EXPORT-REPOSITORY` creates a portable ZIP from the selected registered repository in one of two modes:

```text
Local working tree + diff
Committed snapshot
```

The export does not create a ChangeSet/ApplicationAttempt, mutate repository files, stage into the real Git index, commit or push.

## 2. Shared ZIP Shape

Repository files always live under one `snapshot/` directory. Files in the ZIP root describe that directory.

### Local working tree + diff

```text
<repo>-local-base-<short-head>-<timestamp>.zip
├── SNAPSHOT.json
├── BASE-COMMIT.txt
├── WORKING-TREE.diff
└── snapshot/
    └── <current local repository files>
```

`BASE-COMMIT.txt` contains the full `HEAD` commit SHA followed by a newline.

`WORKING-TREE.diff` is the binary-capable Git diff from that base commit to the exported local state. It is generated through a temporary `GIT_INDEX_FILE`; the real `.git/index` is not modified.

`snapshot/` contains:

```text
tracked files that currently exist
+ untracked non-ignored files
```

Tracked deletions are absent from `snapshot/` and represented in `WORKING-TREE.diff`. Ignored untracked files and `.git/**` are excluded. A tracked file remains included even when an ignore rule also matches it.

### Committed snapshot

```text
<repo>-commit-<short-commit>-<timestamp>.zip
├── SNAPSHOT.json
├── COMMIT.txt
└── snapshot/
    └── <exact regular-file blobs from the selected commit>
```

`COMMIT.txt` contains the full resolved commit SHA followed by a newline.

The user may enter `HEAD` or another Git commit/ref. Core resolves it once to an immutable full commit SHA. `snapshot/` is then read from the Git object database; dirty/staged/untracked working-tree content is not consulted.

V1 committed snapshot export rejects symbolic links and submodules rather than converting them into misleading regular ZIP files.

## 3. SNAPSHOT.json

Local example:

```json
{
  "schemaVersion": 1,
  "snapshotType": "local",
  "repositoryIdentity": "github:owner/repo",
  "snapshotFolder": "snapshot/",
  "baseCommitSha": "<full HEAD SHA>",
  "branch": "main",
  "createdAt": "<UTC timestamp>",
  "baseCommitFile": "BASE-COMMIT.txt",
  "diffFile": "WORKING-TREE.diff",
  "fileCount": 123,
  "inclusionPolicy": "tracked files plus untracked non-ignored files; .git and ignored untracked files are excluded"
}
```

Committed example:

```json
{
  "schemaVersion": 1,
  "snapshotType": "committed",
  "repositoryIdentity": "github:owner/repo",
  "snapshotFolder": "snapshot/",
  "commitSha": "<full resolved SHA>",
  "requestedRef": "HEAD",
  "createdAt": "<UTC timestamp>",
  "commitFile": "COMMIT.txt",
  "fileCount": 123,
  "source": "Git object database; working tree content is not used"
}
```

`SNAPSHOT.json` is descriptive metadata for the adjacent `snapshot/` folder. It is not package-operation authority.

## 4. Local Consistency

Local export must not publish a mixed-time snapshot.

```text
resolve and freeze full HEAD SHA
→ capture Git-visible local file inventory + exact bytes/hashes
→ generate temporary-index frozen-SHA → working-tree diff
→ capture file inventory + bytes/hashes again
→ require exact inventory/hash equality and unchanged HEAD SHA
→ regenerate diff against the same frozen SHA
→ require exact diff-byte equality and unchanged HEAD SHA
→ write final ZIP from the verified second capture
```

If the working tree or `HEAD` changes during this window, export fails with `SNAPSHOT_EXPORT_FAILED` and no final ZIP is published. `BASE-COMMIT.txt`, `baseCommitSha` and `WORKING-TREE.diff` always refer to the same frozen commit SHA.

Every local path is passed through the same lexical/real-path confinement used by package mutation. Symbolic-link/junction escape is not followed outside the repository.

## 5. Repository Boundary

Export uses the existing allowed-repository registry.

Before either mode:

```text
selected/requested path must be registered
→ resolve actual Git work-tree root
→ current raw origin must still map to the stored github:<owner>/<repo> identity
```

Mismatch is `REPOSITORY_MISMATCH`.

The selected output directory must already exist and be a directory. Before any export temp/final artifact is created, its real path must resolve outside the repository; a symlink/junction/reparse alias into the repository is rejected without creating anything through that alias.

## 6. Output And Clipboard

The final ZIP is written through a temporary file and then published to a unique `.zip` path. Existing files are not silently overwritten.

After successful export the host automatically attempts:

```text
absolute ZIP path
→ clipboard write
→ clipboard read-back verification
```

Clipboard failure does not make the already-created ZIP a failed export. The UI shows the absolute path and exposes `Copy path` and `Open folder` conveniences.

## 7. Boundaries

```text
no .git directory in snapshot ZIP
no ChangeSet/ApplicationAttempt creation
no real-index mutation
no checkout/reset
no commit/push
no replacement-package PACKAGE.json
no OBS-ACTION
```

Stable export-specific failure code:

```text
SNAPSHOT_EXPORT_FAILED
```


## 8. ChatGPT Attachment Is Downstream

The optional `UC-RPKG-ATTACH-SNAPSHOT` browser bridge may attach an already-successful Repository Snapshot ZIP to a user-selected ordinary ChatGPT conversation. This does not change this ZIP contract, does not create a ChangeSet and does not alter export success. Snapshot bridge tasks are attach-only: the extension must not click Send. See [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md).
