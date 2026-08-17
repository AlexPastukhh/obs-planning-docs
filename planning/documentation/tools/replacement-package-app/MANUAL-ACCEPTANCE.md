# Replacement Package App Manual Acceptance

Status: required Windows / Microsoft Edge acceptance checklist
Scope: checks not proven by cross-platform automated Java tests alone.

Run after `run-tests.cmd` reports `RESULT passed=32 failed=0` and `CHAT-BRIDGE RESULT passed=29 failed=0` (or later suites with `failed=0`).

## Environment

- Windows with a full JDK 21 (`java`, `javac`, `jar`, `jpackage`).
- Git available on PATH.
- Microsoft Edge with Developer mode available for loading the unpacked Manifest V3 extension.
- at least two disposable Git repositories with configured GitHub-shaped `origin` values.
- no valuable uncommitted work in disposable repositories.

## Build / Launch / Settings Migration

1. Run `run-tests.cmd`; require `failed=0`.
2. Run `run-app.cmd` and verify the Swing window opens.
3. If legacy settings contain one `repositoryRoot`, verify it appears after restart as one registered repository with a readable display name and verified GitHub identity.
4. Close/reopen and verify selected repository and selected ChangeSet navigation state persist under `%LOCALAPPDATA%\OBS\ReplacementPackageApp\` (or documented fallback).
5. In the source-launched app click **Windows launcher → Install / update**; require `%LOCALAPPDATA%\OBS\ReplacementPackageApp\launcher\Replacement Package App\Replacement Package App.exe` to exist and the path to be copied to clipboard when available.
6. Open the launcher folder, start `Replacement Package App.exe`, and require the Swing app to open without a console window and without requiring the system `java` command at launch time.
7. Pin that executable to the Windows taskbar, close/reopen from the taskbar, and require the app to open normally.
8. Return to the source-launched app, click **Install / update** again, and require the same executable path to remain valid after replacement. The existing taskbar pin must still launch the refreshed app.

## Allowed Repository Registry

1. Add two repositories and assign readable display names.
2. Switch between them and verify displayed `github:<owner>/<repo>` identities.
3. Attempt Apply through an unregistered repository path using CLI and require `REPOSITORY_MISMATCH` before target mutation.
4. Change a registered repository's raw origin and require Apply/Finalize/Retry Push to block with `REPOSITORY_MISMATCH`.
5. Restore origin and verify normal operations resume.
6. With an Active ChangeSet in a repository, attempt to remove that repository from the allowlist and require the removal to be blocked.

## Apply And Rollback

1. Apply a valid add/replace/delete package and verify exact result bytes.
2. Confirm ApplicationAttempt + ChangeSet appear in local state and the ChangeSet selector automatically selects the applied item.
3. Apply base mismatch and wrong-repository packages; verify no target mutation.
4. Apply against a dirty unowned path; verify `STATE_DIVERGED`.
5. Exercise a filesystem failure during mutation; require exact rollback or explicit `STATE_DIVERGED`.
6. Create a repository path through a Windows junction/symlink to a directory outside the repository and target a file below it; require `STATE_DIVERGED` and verify outside bytes are untouched.

## ChangeSet Browser / Restart

1. Confirm the selector displays `changeSetLabel`, lifecycle status and a short UUID rather than requiring manual UUID entry.
2. Confirm full ChangeSet UUID is visible read-only for technical copy/debugging.
3. Create disjoint ChangeSets in two registered repositories and verify each repository shows only its own ChangeSets.
4. Restart the application and verify the last selected repository/ChangeSet is restored when still valid.
5. Toggle `Show history` and verify Finalized ChangeSets appear without replacing the default Active/`CommittedPendingPush` view.

## ReviewDiff And Real Index

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

## Finalize / Implicit Review Baseline / Push Recovery

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

## Output Session / Error Copy

1. Select package A and Apply; require Output to start with one archive header plus `Apply attempt 1`.
2. Retry the same package A; require the existing Output to remain and `Apply attempt 2` to append.
3. Select package B (different `packageId`, including when reused at the same filesystem path) and Apply; require a fresh Output session containing only package B output.
4. Force an Apply error and click `Copy output`; paste into a text editor and require the complete current Output block to match. Successful copy must not add another line to Output.
5. Force a bridge-side terminal error such as `FailedBeforeSend` for the current archive ReviewDiff; require its task id/status/message to appear asynchronously in the current Output so it can be copied with the Apply context. Then start a different package output session and deliver a late terminal event from the older archive; require the old event **not** to appear in the new archive Output.

## Repository Snapshot Export

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

## ChatGPT Bridge / ReviewDiff Delivery

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

## ChatGPT Bridge / Snapshot Attach-Only

1. Create a Repository Snapshot ZIP and choose `Attach to ChatGPT`; select one open ordinary conversation.
2. Require the exact ZIP filename to become a ready ChatGPT attachment.
3. Require the extension to **never press Send** for the snapshot task; the user remains responsible for sending the prepared composer.
4. Attempt to queue a generic ZIP or replacement-package ZIP through the Java bridge mechanics and require `CHAT_BRIDGE_FAILED`; V1 accepts only Repository Snapshot ZIPs.
5. Verify snapshot attachment failure does not delete/reclassify the already-successful snapshot ZIP and does not create/change a ChangeSet.

## Action / Archive Resolution

1. Paste a valid OBS-ACTION with matching ZIP and verify packageId-based resolution.
2. Change action packageId; require `ACTION_PACKAGE_MISMATCH`/no mutation.
3. Wrong repository package must produce `REPOSITORY_MISMATCH`.
4. Filename alone must never override packageId mismatch.

## Acceptance Record

Record Windows/JDK/Git versions, registered repository identities, date, pass/fail items and discovered issues before declaring V0.1 operationally accepted.
