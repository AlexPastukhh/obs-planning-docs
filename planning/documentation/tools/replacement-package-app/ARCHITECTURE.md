# Replacement Package App Architecture

Status: active application implementation contract
Scope: Java 21/Swing runtime layering and safety mechanics for package Apply/Review/Finalize, read-only repository snapshot export and optional local ChatGPT browser handoff.

## 1. Layers

```text
MainWindow.java                 Swing host / user interaction
Main.java                       fixed CLI + JAR entry
            ↓
Core.java                       repository registry/package/state/review/finalize/export/bridge orchestration
            ↓
RepositorySnapshotExporter.java read-only Local/Committed snapshot ZIP mechanics
ChatBridgeService.java           ChangeSet/chat bindings + delivery task authority
ChatBridgeServer.java            127.0.0.1 HTTP adapter for the browser extension
GitClient.java   StateStore.java   Json.java
            ↓
filesystem + local Git + local application state
```

Hosts do not duplicate Core validation/mutation logic. Java standard library is the only runtime dependency.

All Git execution goes through `GitClient` / `ProcessBuilder`; no shell evaluates package or snapshot data. Text commands capture merged output; raw-byte Git reads use a dedicated stdout/stderr boundary so binary committed blobs and NUL-delimited path inventories are preserved exactly.

## 2. Repository Registry And Archive Inputs

The application maintains a local allowlist of repository records. Each record contains an internal UUID, human-readable display name, absolute local path and verified `github:<owner>/<repo>` identity derived from `remote.origin.url` when the repository is registered.

Apply, Finalize and Retry Push accept mutation only for a registered local path, and Repository Snapshot export accepts reads only from that same allowlist. Before each operation Core resolves the actual Git work-tree root again and verifies that its current raw origin still maps to the repository identity stored in the allowlist. An unregistered path or changed origin is `REPOSITORY_MISMATCH`.

Multiple local repositories and multiple clones of the same GitHub repository may be registered when their local paths differ. A repository record with an Active or `CommittedPendingPush` ChangeSet cannot be removed from the allowlist.

Legacy settings with one `repositoryRoot` are migrated on read: a valid Git repository becomes the first verified allowlist entry. The shared ZIP/OBS-ACTION protocol is unchanged; repository selection remains consumer-only state.

ZIPs are opened with `java.util.zip.ZipFile`; package paths are validated before payload bytes are used. `OBS-ACTION archive:` is only a filename hint and `packageId` is the package identity.

## 3. Apply Transaction

```text
validate complete ZIP + manifest + payload set
→ require selected/requested local repository to be registered
→ revalidate repository root + origin identity
→ validate package repository identity
→ validate ChangeSet/path ownership
→ validate every expected base / add absence
→ retain verified pre-apply bytes
→ mutate declared files
→ verify result bytes
→ generate/persist current ReviewDiff + ChangeSet + successful ApplicationAttempt
→ only then perform non-critical clipboard/repo-file handoff
→ on failure before required persistence completes, rollback targets + prior ChangeSet state
→ verify rollback; otherwise STATE_DIVERGED
```

V0.1 does not claim filesystem multi-file atomicity. It uses validate-before-mutation plus bounded verified rollback.

## 4. Path Ownership And ChangeSet Navigation

One repository-relative path may belong to at most one active ChangeSet for one repository identity. Multiple active ChangeSets are allowed when owned path sets are disjoint. A dirty unowned path is never silently adopted.

Dirty-unowned detection uses tracked/staged diffs plus `git ls-files --others -- <path>` for **all** untracked files, including ignored ones, so a missing parent directory cannot become dirty merely because `git status -- <missing/path>` emits a warning and a pre-existing ignored file cannot be silently adopted. Once a path is explicitly owned by a validated package, temporary-index ReviewDiff generation and Finalize use `git add -f -A -- <owned pathspec>` so an explicit owned file may be represented and committed even when a repository ignore rule matches it; `-f` never expands staging outside the already-derived owned pathspec.

Persistent ChangeSet UUID remains protocol/ledger identity. Swing navigation presents `changeSetLabel · status · short UUID`, filters ChangeSets by the selected repository record and persists the last selected ChangeSet. Active and `CommittedPendingPush` entries are the default list; Finalized records are available through history mode.

## 5. Canonical ReviewDiff

`Core.newReviewDiff` includes tracked changes, deletions and untracked adds without touching the user's real index:

```text
create temporary directory and non-existing GIT_INDEX_FILE
→ git read-tree HEAD
→ derive effective Git pathspec = owned paths present in HEAD or current working tree
→ omit owned paths absent from both HEAD and working tree (they contribute no net diff)
→ git add -f -A -- <effective owned paths>
→ git diff --cached --no-color HEAD --output=<temp.diff> -- <effective owned paths>
→ if no effective path remains, persist the canonical empty diff
→ hash exact diff bytes with SHA-256
→ move canonical diff into local app state
→ remove temporary index directory
```

`ProcessBuilder.environment()` scopes `GIT_INDEX_FILE` to those Git child processes only.

A user-triggered `Refresh Review` also updates the ChangeSet's persisted `currentReview` identity. On Swing restart/ChangeSet selection, Core reconstructs the last persisted ReviewDiff and verifies that the canonical file still exists and still hashes to the recorded SHA before exposing it as current.

## 6. Review Diff Handling And Finalize Baseline

Application setting remains:

```text
Clipboard
RepoDiffFile
Both
```

Core always persists canonical ReviewDiff in app state. Optional repository service copies use `_ai-review-diffs/<changeSetId>/<attemptId>.diff`; they never become ChangeSet-owned or Finalize staging targets. Handoff occurs after required Apply persistence and handoff failures are warnings, not false Apply failures. Clipboard handoff writes the canonical diff text and reads it back before reporting success; a mismatch/failure is surfaced as a warning.

The Swing host exposes explicit `Copy ReviewDiff` and `Open ReviewDiff` actions for the integrity-verified current ReviewDiff. They are optional inspection actions and are **not** Finalize gates.

The persisted `currentReview` is also the implicit Finalize baseline. Its SHA-256 remains an internal fingerprint only: normal Swing/CLI flows do not display it as an approval field and never require the user to copy or enter it.

## 7. Finalize

```text
load Active ChangeSet
→ require its local repository to remain registered
→ revalidate repository root + origin identity
→ load and integrity-check persisted currentReview baseline
→ regenerate canonical ReviewDiff
→ require exact bytes fingerprint == persisted currentReview fingerprint
→ require real Git index clean
→ if reviewed cumulative diff is empty: mark Finalized and release ownership without commit/push
→ otherwise git add -f -A -- <effective owned paths>
→ generate staged HEAD diff to file
→ require staged diff fingerprint == persisted currentReview fingerprint
→ git commit
→ persist commit SHA + branch as CommittedPendingPush
→ git push origin <branch>
→ on success mark Finalized / release ownership
```

Opening/copying ReviewDiff is not checked. Exact equality with the persisted current ReviewDiff fingerprint remains the Core safety gate; the fingerprint is not a user input.

If push fails after commit, Retry Push revalidates repository/origin and requires HEAD to equal the recorded pending commit. It pushes that existing commit without creating a second commit.

## 8. Repository Snapshot Export

`UC-RPKG-EXPORT-REPOSITORY` is read-only and reuses the allowed-repository gate before any ZIP is created.

Local mode:

```text
resolve registered repository + current origin
→ resolve and freeze full HEAD SHA + current branch
→ capture tracked + untracked non-ignored current file bytes/hashes
→ temporary GIT_INDEX_FILE: read-tree <frozen SHA> → add -A . → binary-capable cached diff against <frozen SHA>
→ capture current file bytes/hashes again
→ require exact inventory/hash equality and unchanged HEAD SHA
→ regenerate diff against the same frozen SHA and require exact diff-byte equality
→ require HEAD SHA still unchanged
→ write SNAPSHOT.json + BASE-COMMIT.txt + WORKING-TREE.diff + snapshot/**
→ publish final ZIP outside the repository
```

The real Git index is never changed. Tracked deletions appear only in the diff; ignored untracked files and `.git/**` are not exported. Local paths pass through the same lexical/real-path confinement as package file access.

Committed mode:

```text
resolve requested ref once to full commit SHA
→ git ls-tree -r -z <commit>
→ read each regular blob from the Git object database
→ write SNAPSHOT.json + COMMIT.txt + snapshot/**
```

Dirty/staged/untracked working-tree state is not consulted for committed contents. V1 rejects symlink/submodule entries rather than flattening them into regular ZIP files.

Final ZIP publication uses a temporary file and non-overwriting unique destination name. The selected output directory must already exist and, before any export file/directory is created, its real path must resolve outside the repository.

After successful export the Swing/CLI host attempts verified clipboard copy of the absolute ZIP path. Clipboard failure is warning-only and never invalidates the created ZIP.

## 9. ChatGPT Bridge Integration

`UC-RPKG-DELIVER-REVIEW` and `UC-RPKG-ATTACH-SNAPSHOT` use a local browser companion documented in [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md). The Java UI starts `ChatBridgeServer` on `127.0.0.1:17831`; control requests require a random pairing token.

```text
MainWindow/Core
→ ChatBridgeService
→ persistent chat-bindings/chat-handoffs state
→ ChatBridgeServer loopback adapter
→ Manifest V3 extension service worker
→ one selected ordinary ChatGPT /c/<conversation-key> tab
```

Open ChatGPT tabs are grouped by stable conversation key, not title. Task claims are serialized per conversation so duplicate tabs cannot run two queued deliveries concurrently. A ChangeSet may persist one conversation binding and therefore reuse the same chat through continuation/correction packages with the same `changeSetId`. Automatic ReviewDiff queueing occurs only after the canonical current ReviewDiff is persisted. Browser delivery failure is warning/downstream state and never rolls back Apply/Refresh Review or changes Finalize authority.

ReviewDiff content is delivered by exact text paste. Each task records artifact size/SHA-256, Java rechecks the queued file before streaming it, and the extension rechecks the received bytes before paste. The extension deliberately lets ChatGPT decide whether the native paste remains text or is converted by ChatGPT into a large-paste attachment; it does not apply its own byte threshold. It requires an empty composer, keeps a pre-Send lease alive and atomically stages `Preparing` before the first composer mutation. `Claimed` work may still be safely cancelled; once `Preparing` begins, pre-Send uncertainty becomes terminal `PreparedUnsent` instead of being auto-retried. The extension records `SendClicked` before clicking Send and requires a new user-message turn plus cleared composer state before reporting `Sent`.

Snapshot tasks are user-triggered and attach-only. The Java side validates a Repository Snapshot ZIP and queues `autoSend=false`; the extension may drive ChatGPT's file input but must never click Send.

The extension content script never receives the long-lived pairing token; extension storage access for that token is restricted to trusted extension contexts. A claimed task carries a short-lived ticket scoped to one exact persisted ReviewDiff or validated snapshot ZIP plus its expected fingerprint. Claims are bound to both conversation key and tab id; navigation/tab loss while merely `Claimed` releases the task to `Pending`, while loss after composer preparation begins becomes `PreparedUnsent` and loss after `SendClicked` becomes `UnknownAfterSend`. There is no arbitrary filesystem-path, Git or command endpoint.

## 10. State / Concurrency

`StateStore` uses local JSON files and one exclusive `FileChannel` lock around mutating Apply/Finalize/Retry operations. JSON writes use temporary-file replacement. Repository mutation assumes one foreground Core operation at a time.

`settings.json` schema 2 owns repository allowlist records, selected repository, selected ChangeSet and ReviewDiff handling. ChangeSet JSON continues to own path ownership/current review/lifecycle. No application ledger file is written inside a target repository.

## 11. Safety Boundaries

No force-push, reset --hard, checkout of user files, automatic branch creation, worktree creation or arbitrary command execution from package/snapshot content. Package payloads and exported snapshot bytes never authorize commands. Before local repository file access, Core verifies lexical containment and the real path of the nearest existing target/ancestor; symbolic-link or junction/reparse resolution outside the real repository root is rejected as `STATE_DIVERGED`.
