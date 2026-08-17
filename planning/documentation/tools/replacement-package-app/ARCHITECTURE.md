# Replacement Package App Architecture

Status: active V0.1 implementation contract
Scope: Java 21/Swing runtime layering and safety mechanics for package Apply, Review and Finalize.

## 1. Layers

```text
MainWindow.java                 Swing host / user interaction
Main.java                       fixed CLI + JAR entry
            ↓
Core.java                       repository registry/package/state/review/finalize mechanics owner
            ↓
GitClient.java   StateStore.java   Json.java
            ↓
filesystem + local Git + local application state
```

Hosts do not duplicate Core validation/mutation logic. Java standard library is the only runtime dependency.

All Git execution goes through `GitClient` / `ProcessBuilder`; no shell evaluates package data. Exit code and merged process output are captured explicitly and mapped to the owning stable Core error code.

## 2. Repository Registry And Archive Inputs

The application maintains a local allowlist of repository records. Each record contains an internal UUID, human-readable display name, absolute local path and verified `github:<owner>/<repo>` identity derived from `remote.origin.url` when the repository is registered.

Apply, Finalize and Retry Push accept mutation only for a registered local path. Before every such operation Core resolves the actual Git work-tree root again and verifies that its current raw origin still maps to the repository identity stored in the allowlist. An unregistered path or changed origin is `REPOSITORY_MISMATCH`.

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

Persistent ChangeSet UUID remains protocol/ledger identity. Swing navigation presents `changeSetLabel · status · short UUID`, filters ChangeSets by the selected repository record and persists the last selected ChangeSet. Active and `CommittedPendingPush` entries are the default list; Finalized records are available through history mode.

## 5. Canonical ReviewDiff

`Core.newReviewDiff` includes tracked changes, deletions and untracked adds without touching the user's real index:

```text
create temporary directory and non-existing GIT_INDEX_FILE
→ git read-tree HEAD
→ derive effective Git pathspec = owned paths present in HEAD or current working tree
→ omit owned paths absent from both HEAD and working tree (they contribute no net diff)
→ git add -A -- <effective owned paths>
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
→ otherwise git add -A -- <effective owned paths>
→ generate staged HEAD diff to file
→ require staged diff fingerprint == persisted currentReview fingerprint
→ git commit
→ persist commit SHA + branch as CommittedPendingPush
→ git push origin <branch>
→ on success mark Finalized / release ownership
```

Opening/copying ReviewDiff is not checked. Exact equality with the persisted current ReviewDiff fingerprint remains the Core safety gate; the fingerprint is not a user input.

If push fails after commit, Retry Push revalidates repository/origin and requires HEAD to equal the recorded pending commit. It pushes that existing commit without creating a second commit.

## 8. State / Concurrency

`StateStore` uses local JSON files and one exclusive `FileChannel` lock around mutating Apply/Finalize/Retry operations. JSON writes use temporary-file replacement. Repository mutation assumes one foreground Core operation at a time.

`settings.json` schema 2 owns repository allowlist records, selected repository, selected ChangeSet and ReviewDiff handling. ChangeSet JSON continues to own path ownership/current review/lifecycle. No application ledger file is written inside a target repository.

## 9. Safety Boundaries

No force-push, reset --hard, checkout of user files, automatic branch creation, worktree creation or arbitrary command execution from package content. Package payloads are bytes only. Before repository file access, Core verifies lexical containment and the real path of the nearest existing target/ancestor; symbolic-link or junction/reparse resolution outside the real repository root is rejected as `STATE_DIVERGED`.
