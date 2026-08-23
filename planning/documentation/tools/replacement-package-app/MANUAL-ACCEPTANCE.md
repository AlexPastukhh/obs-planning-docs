# Replacement Package App Manual Practical Testing Plan

Status: current + selected-target Slice-oriented Windows / Microsoft Edge practical-testing plan
Scope: operated proof for user-visible/environment behavior not established by automated Java/component/integration tests alone.

This plan is the manual proof surface referenced by `testing-plan.md`. It is not an automated E2E suite. Planned target cards/deltas do not become implemented or executed evidence merely because they are documented; run them only against an implementation that claims the corresponding target behavior.

## Execution-State Contract

Each material practical card records one of:

```text
planned
executed-pass
executed-fail
stale
```

Historical ad-hoc runs are not silently imported as current acceptance evidence by this documentation migration.

## Shared Environment

- Windows with a full JDK 21 (`java`, `javac`, `jar`, `jpackage`).
- Git available on PATH.
- Microsoft Edge with Developer mode available for loading the unpacked Manifest V3 extension.
- at least two disposable Git repositories with configured GitHub-shaped `origin` values.
- no valuable uncommitted work in disposable repositories.

## Shared Build / Launch / Settings Preflight

1. Run `run-tests.cmd`; require `failed=0`.
2. Run `run-app.cmd` and verify the Swing window opens.
3. If legacy settings contain one `repositoryRoot`, verify it appears after restart as one registered repository with a readable display name and verified GitHub identity.
4. Close/reopen and verify selected repository and selected ChangeSet navigation state persist under `%LOCALAPPDATA%\OBS\ReplacementPackageApp\` (or documented fallback).
5. In the source-launched app click **Windows launcher → Install / update**; require `%LOCALAPPDATA%\OBS\ReplacementPackageApp\launcher\Replacement Package App\Replacement Package App.exe` to exist and the path to be copied to clipboard when available.
6. Open the launcher folder, start `Replacement Package App.exe`, and require the Swing app to open without a console window and without requiring the system `java` command at launch time.
7. Pin that executable to the Windows taskbar, close/reopen from the taskbar, and require the app to open normally.
8. Return to the source-launched app, click **Install / update** again, and require the same executable path to remain valid after replacement. The existing taskbar pin must still launch the refreshed app.

## `PA-SL01` — Apply Replacement Work

**Target property:** a prepared package can become active work only in the intended concrete repository, without partial mutation, cross-repository false ownership conflicts or silent adoption of unrelated work.  
**Execution state:** `planned`

### Repository registry / target checks

1. Add two repositories and assign readable display names.
2. Switch between them and verify displayed `github:<owner>/<repo>` identities.
3. Attempt Apply through an unregistered repository path using CLI and require `REPOSITORY_MISMATCH` before target mutation.
4. Change a registered repository's raw origin and require Apply/Finalize/Retry Push to block with `REPOSITORY_MISMATCH`.
5. Restore origin and verify normal operations resume.
6. With an Active ChangeSet in a repository, attempt to remove that repository from the allowlist and require the removal to be blocked.

### Apply / rollback checks

1. Apply a valid add/replace/delete package and verify exact result bytes.
2. Confirm ApplicationAttempt + ChangeSet appear in local state and the ChangeSet selector automatically selects the applied item.
3. Apply base mismatch and wrong-repository packages; verify no target mutation.
4. Apply against a dirty unowned path; verify `STATE_DIVERGED`.
5. Exercise a filesystem failure during mutation; require exact rollback or explicit `STATE_DIVERGED`.
6. Create a repository path through a Windows junction/symlink to a directory outside the repository and target a file below it; require `STATE_DIVERGED` and verify outside bytes are untouched.

### Action / archive resolution checks

1. Paste a valid OBS-ACTION with matching ZIP and verify packageId-based resolution.
2. Change action packageId; require `ACTION_PACKAGE_MISMATCH`/no mutation.
3. Wrong repository package must produce `REPOSITORY_MISMATCH`.
4. Filename alone must never override packageId mismatch.

### Selected target Apply-time repository resolution / readiness

Run after target implementation exists:

1. Select/paste a valid package/OBS-ACTION for repository B while repository A is current; verify package input alone does not change repository context.
2. Press Apply with exactly one registered Repository Target matching the package identity; require context to switch to B, show repository-selected feedback, then continue preflight.
3. Force a later preflight failure and require B to remain selected while no target mutation occurs.
4. Register two clones with the same Repository Identity and start new work; require Apply to stop for concrete target selection instead of guessing.
5. Continue an existing ChangeSet while another same-origin clone is current; require the ChangeSet's stored concrete target to win and no silent re-home.
6. Use a valid Git repository with no first commit for an Apply path that requires HEAD/current-change baseline; require actionable Repository Not Ready (`create an initial commit and retry`) and no mutation/raw HEAD exception.
7. In one repository keep ChangeSet A Active and ChangeSet B Finalized; enable history and select B in the UI, then Apply a package whose `PACKAGE.json.changeSetId` is A. Require continuation of exact A regardless of UI selection; B stays Finalized.
8. With the same setup, Apply a package whose `PACKAGE.json.changeSetId` is B. Require Apply to block with Finalized/Reopen-required meaning; it must not substitute A and must not auto-Reopen B.

### Repository-scoped ownership regression

1. In repository A create/retain an unfinished ChangeSet owning `action-log.md`.
2. In a different concrete repository B apply independent work touching its own `action-log.md`; the repository-A owner must not itself cause `PATH_OWNERSHIP_CONFLICT`.
3. In one concrete repository create two independent unfinished works touching the same repository-relative path; the second work must be blocked before mutation.
4. When two local clones share one logical `repositoryIdentity`, ownership remains scoped by concrete local repository rather than by origin identity alone.

### Selected target source-state regression

Target implementation replaces raw-only base equality with expected source-state proof. Run after the target implementation exists:

1. Raw exact package base/current bytes → Apply succeeds.
2. With repository/path Git settings that produce LF package/base bytes and CRLF working-tree representation while Git considers content equivalent, raw comparison differs but target Apply succeeds through Git path-semantic equivalence.
3. Repeat with `.gitattributes` path-specific EOL rules.
4. Modify semantic content manually/through IDE after package source was prepared; require source-changed failure/no mutation even when line endings differ.
5. Force Git/filter canonicalization failure and require source-unverifiable/fail-closed behavior.
6. Use a binary path with differing bytes and require no newline-style false equivalence.
7. Continue an Active ChangeSet whose current owned file differs from HEAD; a correction package based on that actual current content must remain applicable without requiring `HEAD` equality.

## `PA-SL02` — Inspect Current Change

**Target property:** the selected logical work exposes an exact current cumulative change that survives restart/refresh and optional Copy/Open without mutating the real Git index or becoming an approval gate.  
**Execution state:** `planned`

### ChangeSet navigation / restart

1. Confirm the selector displays `changeSetLabel`, lifecycle status and a short UUID rather than requiring manual UUID entry.
2. Confirm full ChangeSet UUID is visible read-only for technical copy/debugging.
3. Create disjoint ChangeSets in two registered repositories and verify each repository shows only its own ChangeSets.
4. Restart the application and verify the last selected repository/ChangeSet is restored when still valid.
5. Toggle `Show history` and verify Finalized ChangeSets appear without replacing the default Active/`CommittedPendingPush` view.

### Current ReviewDiff / real-index checks

1. Ensure real index is clean.
2. Apply a package containing an untracked add.
3. Confirm cumulative diff includes the new file.
4. Confirm `git diff --cached --quiet` remains clean after ReviewDiff generation.
5. Confirm the normal Swing UI has no Review SHA fields or SHA approval controls; Review state is shown as `Current`/unavailable instead.
6. With `Clipboard` selected, verify automatic Apply handoff either places the canonical diff in the clipboard or surfaces a handoff warning; it must not create a false Apply failure.
7. Click `Copy ReviewDiff`, paste the clipboard into a text target, and require exact text equality with the persisted canonical diff; the UI must report success only after verified clipboard read-back.
8. Click `Open ReviewDiff` and require the same current canonical `.diff` file to open through the desktop handler without changing the current ReviewDiff identity or `Review` state.
9. Close/reopen the app, reselect the ChangeSet, and require Copy/Open to work immediately from its persisted `currentReview` without mandatory Refresh Review.
10. Click `Refresh Review`; require a new current review identity to be persisted and Review state to become `Current`.
11. Test `RepoDiffFile` and `Both` settings and confirm `_ai-review-diffs/**` is not an owned ChangeSet path.

## `PA-SL03` — Finalize And Publish Work

**Target property:** only the selected current work is completed/published; publication failure preserves the already-created local work and recovery does not create a second logical work item.  
**Execution state:** `planned`

1. Confirm there is no user-facing Review SHA field, SHA input or `Approve Current Review` action in Swing.
2. Without using Copy/Open, Finalize a current ChangeSet and require the persisted current ReviewDiff to be used automatically as the baseline.
3. Modify an owned file after the last Apply/Refresh Review and require `REVIEW_STALE`; no SHA value should be shown as something the user must copy or enter.
4. Refresh Review, then Finalize again and verify only owned paths enter the commit.
5. Stage any path before Finalize and require Finalize to block; clear index.
6. Verify successful push releases ownership.
7. Make push unavailable after review: Finalize must create one commit and enter `CommittedPendingPush`.
8. Restore transport, Retry Push, and verify no second commit.
9. Change raw origin before Finalize and Retry Push; require `REPOSITORY_MISMATCH` before push.
10. In one ChangeSet, add a new path and then delete it in a continuation package; require an empty cumulative ReviewDiff and successful Finalize with no new commit/push.
11. Exercise CLI `apply`, `review` and `finalize`; require `finalize` to have no `--sha` input and normal output not to expose a SHA as a required user workflow value.
12. Add an explicit package path under a parent directory that does not yet exist; require preflight not to treat a Git missing-directory warning as dirty unowned state.
13. Add an explicit package path matched by `.gitignore`; require Apply ReviewDiff and Finalize to include only that owned path successfully.
14. For each package action `add`, `replace` and `delete`, create a matching pre-existing ignored unowned path and require `STATE_DIVERGED`; ignore rules must never make an existing unowned file adoptable.

### Finalized ChangeSet Reopen

1. Finalize a ChangeSet and verify its live path ownership is released while it remains visible under `Show History`.
2. With `Show History` off, require no Reopen control for that Finalized record. Enable `Show History`, select the exact Finalized ChangeSet and require `Reopen ChangeSet` to appear.
3. Click Reopen with the exact Repository Target available and historical paths free/clean; require the same ChangeSet identity to become Active, prior finalization evidence/history to remain, and safe historical paths to become live ownership again.
4. Finalize ChangeSet A, let unfinished ChangeSet B acquire one historical A path, then try Reopen A; require a clear conflict, no partial lifecycle/ownership change, one failure notification/result with diagnostics, and no persistent error marker on the still-Finalized A history row.
5. Finalize another ChangeSet, create unrelated dirty/unowned content on a historical path, then try Reopen; require no silent adoption, no partial lifecycle/ownership change, notification/diagnostics, and no Finalized-row error marker.
6. Selecting a Finalized row without clicking Reopen must never change status/ownership.
7. After successful Reopen, apply a continuation package using the same ChangeSet ID and require ordinary repository/path/source-state preflight to run; Reopen must not bypass Apply guards.

### Remote-ahead practical recovery

1. Put a ChangeSet into `CommittedPendingPush`, then advance the remote on a disjoint path. Retry Push must preserve the same logical ChangeSet, recover/publish safely, and finalize without creating a second logical work item.
2. Repeat with a remote change touching a pending-owned path. Automatic recovery must stop rather than force overwrite; the ChangeSet remains publication-pending with actionable technical output.
3. Where verified recovery rewrites the technical commit, user workflow must not require SHA interpretation and the logical ChangeSet identity must remain stable.

## `PA-SL04` — Export Repository Snapshot

**Target property:** Local/Committed repository context is exported as the documented stable ZIP without mutating repository work/index; artifact success survives downstream clipboard problems.  
**Execution state:** `planned`

1. Select a registered repository and click `Export repository ZIP`.
2. Local mode: create a modified tracked file, a tracked deletion, an untracked non-ignored file and an ignored untracked file. Export and inspect the ZIP:
   - root contains `SNAPSHOT.json`, `BASE-COMMIT.txt`, `WORKING-TREE.diff`, `snapshot/`;
   - `snapshot/` contains the current tracked/untracked non-ignored files;
   - deleted tracked and ignored untracked paths are absent;
   - `.git/**` is absent;
   - `BASE-COMMIT.txt` is the full current `HEAD`;
   - `WORKING-TREE.diff` describes the local state relative to that base.
3. Before/after Local export, compare the real Git index and require no change.
4. Committed mode: dirty the working tree, export `HEAD` and then an older commit SHA; require `snapshot/` bytes to come from the selected commit, not local files.
5. Require committed root to contain `SNAPSHOT.json`, `COMMIT.txt`, `snapshot/` and no `WORKING-TREE.diff`; `COMMIT.txt` must be the full resolved SHA.
6. Attempt output to a directory inside the repository and require `SNAPSHOT_EXPORT_FAILED` with no final ZIP.
7. Create an outside symlink/junction whose target is the repository, request a missing child directory under that alias as output, and require `SNAPSHOT_EXPORT_FAILED` **without creating that child inside the repository**.
8. Use a non-existing ordinary output directory and require `SNAPSHOT_EXPORT_FAILED`; V1 requires the selected destination directory to already exist.
9. Change the registered origin and require `REPOSITORY_MISMATCH` before export; restore origin afterward.
10. During a Local export, change a repository file and require no mixed final ZIP to be published.
11. During a Local export, create an empty commit so file bytes stay unchanged but `HEAD` changes; require export to fail and publish no ZIP.
12. After successful export, paste clipboard and require the exact absolute ZIP path. Clipboard success must be reported only after read-back verification.
13. Make clipboard unavailable and require the ZIP to remain successful with a warning; use `Copy path` after clipboard recovery.
14. Click `Open folder` and require the parent directory of the created ZIP to open.
15. For a committed tree containing a symlink/submodule, require V1 export to reject rather than silently flatten the entry.
16. Target readiness: with a registered Git repository that has no first commit, attempt Local and Committed V1 snapshot modes; require Repository Not Ready with initial-commit guidance and no snapshot/temp publication.

## `PA-SL05` — Attach Repository Snapshot To ChatGPT

**Target property:** the exact validated Repository Snapshot becomes ready in the explicitly selected ordinary ChatGPT conversation and remains unsent.  
**Execution state:** `planned`

1. Create a Repository Snapshot ZIP and choose `Attach to ChatGPT`; select one open ordinary conversation.
2. Require the exact ZIP filename to become a ready ChatGPT attachment.
3. Require the extension to **never press Send** for the snapshot task; the user remains responsible for sending the prepared composer.
4. Attempt to queue a generic ZIP or replacement-package ZIP through the Java bridge mechanics and require `CHAT_BRIDGE_FAILED`; V1 accepts only Repository Snapshot ZIPs.
5. Verify snapshot attachment failure does not delete/reclassify the already-successful snapshot ZIP and does not create/change a ChangeSet.

Manual pass requires observing the real Edge/ChatGPT composer; Java/bridge task-state tests alone are insufficient evidence for this Slice result.

## `PA-SL06` — Deliver Current Change To ChatGPT

**Target property:** the exact current change reaches the intended ordinary ChatGPT conversation once, or a truthful failed/uncertain/no-content outcome is preserved without changing repository-work authority.  
**Execution state:** `planned`

1. Load `chatgpt-bridge-extension/` unpacked in Microsoft Edge, start the Java app, copy the pairing token from the app, save it in extension Options and require the connection test to pass.
2. Open two different ordinary `https://chatgpt.com/c/<id>` conversations and verify both titles appear in `Refresh chats`. Open a second tab of one conversation and verify it remains one choice with a larger tab count.
3. Open two different conversations with the same visible title and require them to remain separate choices by conversation key.
4. Bind an Active ChangeSet to one conversation, restart the Java app and require the binding to remain. Binding must not automatically send the already-current ReviewDiff.
5. Click `Send current ReviewDiff` with an empty composer and a small diff; require exactly one outgoing user message in the bound conversation.
6. Use a ReviewDiff large enough for ChatGPT's own paste mechanism to convert the paste into an attachment. Require the extension to wait for ChatGPT's conversion/upload to finish and then send exactly once; the extension must not construct its own `.diff` attachment based on a local size threshold.
7. Put text or an existing attachment in the composer and attempt automatic ReviewDiff delivery; require `FailedBeforeSend` and verify the existing draft is not mixed/sent.
8. Apply/Refresh another ReviewDiff for the same bound ChangeSet and require the same conversation to be reused without choosing it again. A continuation/correction package with the same `changeSetId` must retain that binding.
9. Open the same bound conversation in multiple tabs; require only one tab to claim/send one ReviewDiff. Queue a second task for the same conversation and require it to remain `Pending` while the first task is `Claimed`, `Preparing` or `SendClicked`, even from another duplicate tab. Close a claimed tab before composer preparation and require the task to become retryable by another tab after claim loss/expiry.
10. Force an uncertain condition after the extension records `SendClicked`; require `UnknownAfterSend` and no automatic resend.
11. Close all tabs for a bound conversation, create another ReviewDiff and require the task to stay pending without changing Apply/Review success. Reopen the conversation and require delivery to resume.
12. Disable/uninstall the extension and verify Apply, ReviewDiff generation, Finalize and snapshot export remain usable independently.
13. Queue a ReviewDiff, then change its persisted `.diff` bytes before the extension fetches it; require delivery failure before paste. The user-facing Output may say the artifact changed, but must not expose hash/SHA terminology as something the user needs to act on.
14. Queue a ReviewDiff in Chat A and navigate the claimed tab to Chat B before Send; require the claim to be released/rejected and verify nothing is sent to Chat B. Repeat after `SendClicked` and require `UnknownAfterSend`, never an automatic retry.
15. Rebind an unsent ChangeSet from Chat A to Chat B and require old `Pending`/`Claimed` review tasks to become `Cancelled`. Stage a task as `Preparing` and require rebind/unbind to be blocked; repeat after `SendClicked`. Expire a `SendClicked` lease and require the next rebind/status read to normalize it to `UnknownAfterSend` rather than blocking forever.
16. Produce a newer automatic ReviewDiff while an older task is still `Pending`/`Claimed`; require the older automatic task to become `Cancelled` and only the newer task to remain deliverable. Repeat after the older task has entered `Preparing`; require the preparing task not to be cancelled, the newer task to wait, and any pre-Send failure of the preparing task to become terminal `PreparedUnsent` with no automatic retry.
17. Use an empty cumulative ReviewDiff and require `NoChanges` with no ChatGPT message.
18. Reload the unpacked extension while ordinary ChatGPT tabs are already open; require the service worker to inject/reconnect the content script without requiring a manual tab refresh.
19. After extension setup, inspect content-script access to extension storage and require the pairing token to be unavailable there; Options/service-worker connection must continue to work.

Manual pass requires real small-paste and native large-paste behavior plus the duplicate-tab/composer protections above; Java/bridge state-machine tests alone are insufficient evidence for live-browser success.

## `PA-SL07` — Discover And Open Existing Work

**Target property:** persisted work can be discovered across repositories and opening one work item establishes its exact Repository Target + ChangeSet navigation context without Git mutation.  
**Execution state:** `planned target / not current implementation evidence`

1. Register several repositories; include two clones sharing the same Repository Identity.
2. Create persisted Active, Publication Pending and Finalized ChangeSets across those targets plus at least one unfinished ChangeSet whose persisted latest relevant operation outcome is failure.
3. Open the global Existing Work view without first choosing a repository; require only Active + Publication Pending work to appear by default, including the failed unfinished item with its marker.
4. Require error-marked unfinished rows first, then most recently active ordering; show concise semantic failure reason.
5. Toggle `Show History`; require all Finalized rows to appear without changing work state and without persistent error markers.
6. With history enabled, select a Finalized row and require `Reopen ChangeSet` to appear; selecting the row alone must not change lifecycle/ownership. For Active/Publication Pending selection, require the Reopen action to be absent or disabled.
7. Force Reopen failure for the selected Finalized row; require it to remain Finalized, receive failure notification/result/diagnostics, and keep no persistent ChangeSet error marker.
8. Select one ChangeSet and require the exact stored Repository Target + ChangeSet to become current; no repository file/index change.
9. Make that target location unavailable; require its work to remain visible with truthful unavailable state and no automatic substitution by another same-origin clone.
10. Restart application and require compact latest unfinished ChangeSet outcome/error marker/reason to survive while Finalized history remains marker-free.

## `PA-SL08` — Manage External Interactions

**Target property:** current-change and snapshot handoffs appear as user-semantic External Interactions with exact source/destination, current-session history and truthful Cancel behavior.  
**Execution state:** `planned target / not current implementation evidence`

1. Create one current-change delivery and one snapshot-attachment interaction; require both to appear in one list with distinguishable kind/source/destination/status.
2. Verify pairing, heartbeat/polling, claim/lease/tab reconnect mechanics do **not** appear as independent user interactions.
3. Cancel a queued interaction before external preparation; require `Cancelled` and no browser/composer mutation/further automation.
4. Prepare extension-owned ReviewDiff text without Send, then Cancel; require interaction to show `Cancelled — prepared content retained`, text to remain in ChatGPT, and no cleanup/Send/further automation.
5. Prepare a snapshot attachment, then Cancel; require attachment to remain prepared, `Cancelled — prepared content retained`, and Send untouched.
6. Force possible-Send uncertainty after `SendClicked`; require Sent/UnknownAfterSend truth and no ability to rewrite it to Cancelled or auto-resend.
7. Cancel one interaction while another exists; require no cross-interaction cancellation/state corruption.
8. Restart/reload; require only safety/recovery/idempotency-critical interaction state to persist and no duplicate semantic interaction/delivery. Ordinary previous-session successful history need not remain visible.
9. Confirm user-semantic status/reason does not expose `Claimed`, lease duration or tab ID as interaction identity.

## `PA-SL09` — Notify Operation Outcomes

**Target property:** each tracked meaningful user operation emits one simple Windows notification on terminal success/failure, and clicking it navigates only to exact repository context.  
**Execution state:** `planned target / not current implementation evidence`

1. Exercise successful Apply, Finalize/Retry Push as applicable, Repository Snapshot export, ChatGPT handoff and Change Repository Location; require one success notification for each tracked terminal result regardless of foreground state.
2. Force a failure/action-required outcome for representative operations; require one notification with concise semantic reason and separate diagnostics availability.
3. Click a ChangeSet-linked notification; require application foreground + exact Repository Target selection, but **no automatic ChangeSet selection** and no retry/apply/finalize/send.
4. Click a repository-only result notification and require exact repository context when available.
5. Change UI repository/ChangeSet selection while a long operation runs; require terminal notification/result to remain associated with the captured operation target, not the later UI selection.
6. Verify passive repository/ChangeSet navigation and trivial Copy/Open actions do not create tracked-operation notifications.
7. Verify a terminal failure on Active/Publication Pending work persists compact latest outcome/error marker/reason and a later relevant success clears it; separately fail Reopen on Finalized history and require notification/result/diagnostics without any persistent Finalized error marker.

## Shared Target Repository-Location Checks

These are cross-Slice repository-management behavior rather than a separate Slice.

1. Use the explicit `Change repository location` action; select a non-Git path and require rejection/no registry change.
2. Select a Git work tree whose origin Repository Identity differs and require rejection.
3. Select a moved copy/work tree or another deliberate clone with the same Repository Identity; require the same Repository Target ID/record to receive the new location and all its ChangeSets to remain associated.
4. Verify no automatic location/clone substitution occurs merely because the old path becomes unavailable.
5. After explicit location change, run an operation against repository state incompatible with its expected source/current work; require that operation's ordinary readiness/source/current-change guard to block rather than pretending the location change proved compatibility.

## Shared Operational Diagnostic Checks

These checks support several Slices and remain cross-cutting rather than becoming a separate Slice merely because Output is separately addressable.

Selected target also requires a separate clean technical/PowerShell-friendly diagnostics surface: semantic result remains concise, complete useful non-secret technical details can be copied independently, secrets/tokens are protected, and diagnostics never gate Apply/Finalize/Retry.

1. Select package A and Apply; require Output to start with one archive header plus `Apply attempt 1`.
2. Retry the same package A; require the existing Output to remain and `Apply attempt 2` to append.
3. Select package B (different `packageId`, including when reused at the same filesystem path) and Apply; require a fresh Output session containing only package B output.
4. Force an Apply error and click `Copy output`; paste into a text editor and require the complete current Output block to match. Successful copy must not add another line to Output.
5. Force a bridge-side terminal error such as `FailedBeforeSend` for the current archive ReviewDiff; require its task id/status/message to appear asynchronously in the current Output so it can be copied with the Apply context. Then start a different package output session and deliver a late terminal event from the older archive; require the old event **not** to appear in the new archive Output.

## Acceptance Record

Record Windows/JDK/Git versions, registered repository identities, date, pass/fail items and discovered issues before declaring V0.1 operationally accepted.

For each executed `PA-SLxx` card, record Windows/JDK/Git/Edge context when material, repository identities/fixtures used, date, observable evidence, pass/fail and discovered issues. A Slice requiring live UI/browser proof is operationally accepted only while its relevant current cards are `executed-pass`.
