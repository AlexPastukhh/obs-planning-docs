# Replacement Package App Architecture

Status: active current implementation contract + selected target architecture delta
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

ReviewDiff content is delivered as exact text through direct ChatGPT composer/editor insertion. Each task records artifact size/SHA-256, Java rechecks the queued file before streaming it, and the extension rechecks the received bytes before preparation. The extension requires an empty intended composer, inserts without browser Clipboard API/native-paste dependence, verifies that the expected ReviewDiff is actually present, and only then stages semantic `Preparing`. A failure before confirmed composer mutation is `FailedBeforeSend`; after confirmed preparation but before possible Send it is terminal `PreparedUnsent`. The extension records `SendClicked` immediately before possible Send and requires a new user-message turn plus cleared composer state before reporting `Sent`; post-Send uncertainty is `UnknownAfterSend`. The same direct-text path is used for small/large ReviewDiff until practical evidence demonstrates a real composer limit.

Snapshot tasks are user-triggered and attach-only. The Java side validates a Repository Snapshot ZIP and queues `autoSend=false`; the extension may drive ChatGPT's file input but must never click Send.

The extension content script never receives the long-lived pairing token; extension storage access for that token is restricted to trusted extension contexts. A claimed task carries a short-lived ticket scoped to one exact persisted ReviewDiff or validated snapshot ZIP plus its expected fingerprint. Claims are bound to both conversation key and tab id; navigation/tab loss while merely `Claimed` releases the task to `Pending`, while loss after composer preparation begins becomes `PreparedUnsent` and loss after `SendClicked` becomes `UnknownAfterSend`. There is no arbitrary filesystem-path, Git or command endpoint.

## 10. State / Concurrency

`StateStore` uses local JSON files and one exclusive `FileChannel` lock around mutating Apply/Finalize/Retry operations. JSON writes use temporary-file replacement. Repository mutation assumes one foreground Core operation at a time.

`settings.json` schema 2 owns repository allowlist records, selected repository, selected ChangeSet and ReviewDiff handling. ChangeSet JSON continues to own path ownership/current review/lifecycle. No application ledger file is written inside a target repository.

## 11. Safety Boundaries

No force-push, reset --hard, checkout of user files, automatic branch creation, worktree creation or arbitrary command execution from package/snapshot content. Package payloads and exported snapshot bytes never authorize commands. Before local repository file access, Core verifies lexical containment and the real path of the nearest existing target/ancestor; symbolic-link or junction/reparse resolution outside the real repository root is rejected as `STATE_DIVERGED`.

## 12. Selected Target Architecture Delta — Not Yet Implemented

Sections 1–11 describe current implementation. This section records selected architecture behavior for the next application revision; code/tests remain downstream work.

### Apply-Time Repository Resolution

Package/OBS-ACTION selection is passive. `Apply` captures one exact target/work command context and resolves Repository Target before applicability/mutation:

```text
existing ChangeSet continuation
→ stored repositoryTargetId / concrete target is authoritative
→ package Repository Identity contradiction blocks

new work
→ current target matches Repository Identity: keep
→ exactly one other registered target matches: select it
→ several matching targets: require concrete user choice
→ none: block
```

A target automatically selected during Apply remains selected if a later preflight fails. Repository context selection is reusable navigation behavior, but mutation authority begins only after the operation captures/revalidates the exact target.

### Explicit Repository Location Change

Add one explicit repository-management action/button. It validates only the registration contract required to move/update the target record:

```text
new location is Git work tree
+ origin maps to stored Repository Identity
→ update same Repository Target record/path
→ keep Target ID and ChangeSet associations
```

Do not perform automatic clone substitution. Do not require HEAD/branch/content compatibility at location-change time; later operations perform their own readiness/source/current-change/ownership checks.

### Expected Source-State Comparison

Replace raw-only `BASE_MISMATCH` logic for `replace/delete` with a two-stage binary-safe comparer:

```text
actual bytes == expected base bytes
→ EXACT match

otherwise
→ compute Git canonical identity for expected bytes using this repo/path semantics
→ compute Git canonical identity for actual bytes using the same repo/path semantics
→ equal: Git-equivalent match
→ different: source changed
→ Git/filter error/unverifiable: fail closed
```

Selected implementation direction is equivalent to invoking, from the exact repository:

```text
git hash-object --stdin --path=<repository-relative-path>
```

for each side, writing payload bytes directly to stdin and comparing returned canonical blob IDs. Do not decode content as text and do not implement global CRLF/LF replacement. The real Git index/object database must not be mutated merely to compare; do not use `-w`.

`add` remains path-absence/adoptability based. Source-state proof is independent from Path Ownership: ownership prevents ChangeSet overlap; source-state comparison prevents out-of-band/manual/IDE/script/Git changes from being overwritten by a stale package.

### Complete Apply Pipeline Target

```text
passive package/action
→ explicit Apply
→ parse/validate package
→ resolve exact ChangeSet by PACKAGE.json.changeSetId when it already exists
   (UI-selected/label/recent work cannot substitute)
→ resolve/capture exact Repository Target (+ exact existing ChangeSet when continuation)
→ revalidate target/origin
→ Repository Ready check where baseline is required
→ path ownership/adoptability
→ expected source-state proof
→ verify complete preflight for all operations
→ mutate/verify with bounded rollback
→ persist ChangeSet/current Review/result
→ latest ChangeSet outcome + notification request
```

No target mutation occurs until every required preflight succeeds. An exact existing Finalized `changeSetId` is not redirected to another Active ChangeSet and is not auto-reopened; Apply blocks until the user explicitly Reopens that exact logical work and later supplies/applies a valid continuation.


### Finalized ChangeSet Reopen

Add an explicit application command invoked only for a user-selected Finalized ChangeSet (normally surfaced from `Show History`). It is not an Apply fallback and is never triggered by selection/package resolution.

```text
capture exact Repository Target + Finalized ChangeSet
→ revalidate target/origin
→ load historical path membership
→ verify no unfinished sibling owns any path to be reacquired
→ verify reacquisition would not silently adopt unrelated dirty/unowned state
→ if any check fails: no lifecycle/ownership mutation
→ otherwise atomically restore live ownership for safe historical paths
→ status = Active
→ invalidate/re-establish current completion review baseline as required
→ persist same ChangeSet ID + prior finalization history
→ publish operation result / notification
```

The implementation must treat lifecycle + ownership reacquisition as one consistency transition. A crash/failure cannot leave a Finalized ChangeSet owning paths or an Active reopened ChangeSet missing the ownership state that was successfully reacquired. If a Reopen guard fails, keep the ChangeSet Finalized, publish the failed-operation result/notification/diagnostics, and do not persist an error marker onto that Finalized history record.

### Repository-Independent Work Projection

Add an application query service/read model over persisted ChangeSets/repository records. It must not scan/lock/mutate every Git repository merely to render the list. Persisted state provides initial truth; availability is checked when opening/operating on a target.

The normal `ChangeSet` selector owns existing-work navigation. Default scope is the current Repository Target; `All repositories` expands that same selector to the global query projection and `Show history` adds Finalized rows. Selecting global work establishes exact `selectedRepositoryId + selectedChangeSetId` navigation context. Same-origin clones stay distinct; unavailable target is represented by the query layer rather than silently replaced or allowed to abort the whole projection. When history is shown and the exact selected ChangeSet is Finalized, UI may expose `Reopen ChangeSet`; this is only an entry to the guarded command above and selection itself remains read-only.

### Current-Change Browser Preparation Target

SL-06 keeps exact ReviewDiff bytes and intended conversation as authority, but selected browser preparation no longer depends on Clipboard API/native paste or foreground document focus.

```text
verified exact ReviewDiff text
→ intended conversation + empty composer guard
→ direct DOM/editor insertion through ChatGPT adapter
→ verify expected content is actually prepared
→ Preparing
→ SendClicked immediately before possible Send
→ Sent | UnknownAfterSend
```

Before confirmed composer mutation, preparation failure is `FailedBeforeSend`; only after expected content is confirmed prepared may a pre-Send failure become `PreparedUnsent`. Use the same direct text path for small/large ReviewDiff initially; introduce an attachment fallback only if practical evidence establishes a real composer limit.

### External Interaction Semantic Layer

Introduce a semantic `External Interaction` service/model above current bridge task mechanics. One interaction keeps exact source + destination + user-semantic outcome. Low-level `Claimed`, lease, tab ID and reconnect states remain adapter mechanics.

Target Cancel does not perform browser cleanup:
- no external preparation → Cancelled/stop;
- prepared unsent content → Cancelled + prepared content retained, stop future Send/automation;
- possible Send → preserve Sent/UnknownAfterSend truth.

Common user-facing interaction inventory includes current-change and snapshot handoffs that are still active/actionable plus `UnknownAfterSend`/equivalent attention-requiring uncertainty. Ordinary terminal results are reported through Output/notifications and are not projected as accumulated list history. Persistence may retain terminal/tombstone records only where safety/idempotency/recovery/uncertainty requires them; a retry creates a new interaction identity.

### User Operation / Windows Notifications

Add an Application operation runner/outcome publisher for meaningful operations, including explicit `Reopen ChangeSet`. Terminal success and failure/action-required always request one Windows notification. Notification click foregrounds the app and reuses repository-context selection for the exact Repository Target when known; it does not select a ChangeSet automatically and never invokes Retry/Apply/Finalize/Send.

Persist only the compact latest outcome needed for Active/Publication Pending error-marker/reason presentation across restart. Failed Reopen on a Finalized ChangeSet is reported by the operation result/notification/diagnostics and does not create a persistent history-row error marker. Do not create a generic persistent all-operations aggregate/list.

### Technical Diagnostics

Add a separate clean copyable technical diagnostics surface fed by operation/bridge/Git details. Preserve useful non-secret command/output detail, protect tokens/secrets centrally, and keep diagnostics independent from semantic result and operation authority.

### Target Concurrency Boundary

Mutable UI context may change while operations execute. Every meaningful operation captures exact Repository Target/ChangeSet/External Interaction identity at invocation and revalidates that captured context before side effects. UI selection changes cannot retarget an in-flight operation.
