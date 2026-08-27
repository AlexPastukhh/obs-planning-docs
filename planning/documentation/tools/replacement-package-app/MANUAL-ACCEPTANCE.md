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

1. Apply a valid add/replace/delete package and verify exact result bytes. Include a deliberately large ZIP and require the first click to show immediate general `INFO Preparing Apply…` without first opening/validating the ZIP on the Event Dispatch Thread; after Prepare resolves the package, require the visible Output to switch to that package's `changeSetId` before notices/Execute. While Prepare/Apply runs, continuously move/resize the Swing window and interact with harmless UI surfaces; require repaint/input responsiveness and visible `INFO Preparing Apply…` / `INFO Applying prepared package…` progress rather than a frozen EDT.
2. Confirm ApplicationAttempt + ChangeSet appear in local state and the ChangeSet selector automatically selects the applied item.
3. Apply a continuation package with the exact existing `changeSetId`, same Repository Target/repository identity and a deliberately different `changeSetLabel`; require Apply success, unchanged persisted ChangeSet label and a visible diagnostic rather than `STATE_DIVERGED`.
4. Apply base mismatch and wrong-repository packages; verify no target mutation.
5. Apply against a dirty unowned path; verify `STATE_DIVERGED` names the exact path + Repository Target + applying ChangeSet and says `Ownership: Unowned — no unfinished ChangeSet owns this path`. Then create a same-target ownership conflict and require owner ChangeSet label/status/ID instead of `Unowned`.
6. Exercise a filesystem failure during mutation; require exact rollback or explicit `STATE_DIVERGED`.
7. Create a repository path through a Windows junction/symlink to a directory outside the repository and target a file below it; require `STATE_DIVERGED` and verify outside bytes are untouched.

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
10. Click `Refresh Review`; require a new current review identity to be persisted for the captured ChangeSet. While Refresh X runs, switch the selector to Y and require the completed Refresh to leave Y selected and leave Y's Review/chat presentation untouched; Output success belongs to X. Without reselecting X, invoke Copy/Open after returning to X and require those actions to resolve the latest persisted current Review rather than a callback-maintained stale cache.
11. Test `RepoDiffFile` and `Both` settings and confirm `_ai-review-diffs/**` is not an owned ChangeSet path.

## `PA-SL03` — Finalize And Publish Work

**Target property:** only the selected current work is completed/published; publication failure preserves the already-created local work and recovery does not create a second logical work item.  
**Execution state:** `planned`

1. Confirm there is no user-facing Review SHA field, SHA input or `Approve Current Review` action in Swing.
2. Without using Copy/Open, Finalize a current ChangeSet and require the persisted current ReviewDiff to be used automatically as the baseline.
3. Modify an owned file after the last Apply/Refresh Review and require `REVIEW_STALE`; no SHA value should be shown as something the user must copy or enter. During an ordinary Refresh Review, verify the Swing window continues repainting/responding while Git/index work runs in the background.
4. Refresh Review, then Finalize again and verify only owned paths enter the commit.
5. Stage any path before Finalize and require Finalize to block; clear index.
6. Verify successful push releases ownership.
7. Make push unavailable after review: Finalize must create one commit and enter `CommittedPendingPush`.
8. Restore transport, Retry Push, and verify no second commit.
9. Change raw origin before Finalize and Retry Push; require `REPOSITORY_MISMATCH` before push.
10. In one ChangeSet, add a new path and then delete it in a continuation package; require an empty cumulative ReviewDiff and successful Finalize with no new commit/push.
11. Exercise CLI `apply`, `review` and `finalize`; require `finalize` to have no `--sha` input and normal output not to expose a SHA as a required user workflow value.
12. Add an explicit package path under a parent directory that does not yet exist; require preflight not to treat a Git missing-directory warning as dirty unowned state.
13. Add an explicit package path matched by `.gitignore`; require Apply ReviewDiff and Finalize to include only that owned path successfully. During Finalize/Retry Push, verify the window remains responsive and completion is rendered back on EDT.
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
   - Confirm Options reports protocol `2`. Then intentionally run/reconnect an older Java bridge that does not advertise protocol `2`; require Options/extension to report an actionable version mismatch. A claimed ReviewDiff under version skew must become `FailedBeforeSend` **before any attachment/composer mutation**, never `UnknownAfterSend`. Restart the current app and reload the extension before continuing.
2. Open two different ordinary `https://chatgpt.com/c/<id>` conversations and verify both titles appear in `Refresh chats`. Open a second tab of one conversation and verify it remains one choice with a larger tab count.
3. Open two different conversations with the same visible title and require them to remain separate choices by conversation key.
4. Bind an Active ChangeSet to one conversation manually, restart the Java app and require the binding to remain. Binding must not automatically send the already-current ReviewDiff.
   - Leave `Review title ignores` empty. For a different unbound ChangeSet, Apply an `OBS-ACTION/1` containing `chatTabTitle` exactly equal to one currently open ordinary ChatGPT conversation title; require Prepare to resolve one destination, no confirmation dialog, successful Apply to create the same persisted Review-chat binding through the normal binding path, and the current ReviewDiff to queue there.
   - Set `Review title ignores` to a visible literal set such as `-—`. Use a requested title and browser title that differ only by those configured characters; require one normalized match. Change letter case as a negative and require no match. Restart the app and require the ignored-character setting to persist. Restore the setting as desired.
   - Repeat with no matching title and with two different conversations that collapse to the same normalized title; require Output warnings (`CHAT_TITLE_NO_MATCH` / `CHAT_TITLE_AMBIGUOUS`), no destination guess, no warning-only modal, and the normal manual binding controls to remain usable.
   - With a pre-existing manual binding A, Apply a continuation whose action uniquely requests different chat B. Before any repository mutation require a decision dialog offering `Apply without rebind`, `Apply and rebind`, and `Cancel`. First choose without rebind and require A to remain bound. On a later continuation choose rebind and require B to become bound only after successful repository Apply; the resulting ReviewDiff queues to B through the normal path.
   - Repeat the A→B case while a ReviewDiff task is already `Preparing`/possible-Send for A; require the rebind choice to be unavailable with an Output warning while Apply-without-rebind/cancel remain truthful. Also change the binding manually after the confirmation plan is prepared but before Execute in a test/debug setup; require stale prepared context to block before repository mutation rather than applying an old authorization to new binding state.
   - Accepted-risk boundary: once background Execute has already begun, do not use manual Bind/Unbind as an acceptance gate. A later manual binding change in that interval may be overwritten by the previously authorized prepared rebind after Apply succeeds; this concurrency window is intentionally not fixed in this ChangeSet.
   - Accepted CLI boundary: `apply --action-file` cannot show the Swing keep/rebind/cancel dialog. When its prepared action destination conflicts with an existing binding, current CLI compatibility behavior keeps the existing binding and does not action-rebind; treat this as a known accepted divergence, not equivalent interactive authorization.
5. Click `Send current ReviewDiff` with an empty composer and a small diff. Before the browser claims the task, require Output/`Chat delivery` to say **Waiting for ChatGPT tab**, not `SUCCESS queued`; after claim require **Delivering**. Then require one exact `.diff` attachment whose browser-visible filename contains the delivery task identity to appear, become upload-ready and be sent to the bound conversation. No ReviewDiff text should be injected into the rich-text editor. Confirm the resulting outgoing user turn contains a file/attachment-like DOM surface exposing `.diff` somewhere in the complete turn container, even when that file card is not a descendant of `[data-message-author-role="user"]`; do not use ordinary message text as proof. Record the actual turn/file-card element and whether the live DOM also retains the full untruncated task-specific filename so exact post-Send identity can be strengthened later.
6. Repeat with a large ReviewDiff while keeping the intended ChatGPT conversation open but **not foreground-focused**. Require one exact `.diff` attachment to upload/send without freezing the ChatGPT tab and without Clipboard API/document-focus/direct-editor insertion dependence.
7. Put text or an existing attachment in the composer **before** automatic ReviewDiff delivery; require `FailedBeforeSend` and verify the existing draft is not mixed/sent. Then start with an empty composer, wait until the task-specific ReviewDiff attachment is upload-ready, type unrelated text before the automatic click, and require automation to stop without clicking Send; the result must be `PreparedUnsent` and the mixed draft must remain unsent. Adding a second unrelated attachment after upload-ready is a known accepted/deferred risk and is not an acceptance gate in this campaign.
8. Apply/Refresh another ReviewDiff for the same bound ChangeSet and require the same conversation to be reused without choosing it again. A continuation/correction package with the same `changeSetId` must retain that binding.
9. Open the same bound conversation in multiple tabs; require only one tab to claim/send one ReviewDiff. Queue a second task for the same conversation and require it to remain `Pending` while the first task is `Claimed`, `Preparing` or `SendClicked`, even from another duplicate tab. Close a claimed tab before composer preparation and require the task to become retryable by another tab after claim loss/expiry.
10. Set `Review send retry` to a visibly testable interval (for example 8 seconds), create a new ReviewDiff interaction, and make the first Send-control attempt ineffective while leaving the same exact attachment prepared. Require a later guarded attempt at the configured interval to send it. Change Settings afterward and verify the already-queued task keeps the interval captured when it was created. Confirm `Review title ignores` is independent from this retry timing and changes only action-assisted title matching.
   - Also simulate a malformed/missing claimed retry field and require rejection before attachment preparation/`SendClicked`; the deterministic contract error must not produce `UnknownAfterSend`.
11. While a task-specific ReviewDiff attachment is still prepared, create an unrelated outgoing user turn without a `.diff` attachment and require it **not** to confirm the task as `Sent`; after the prepared attachment leaves the composer, confirmation requires a post-baseline user turn whose complete turn container exposes a file/attachment-like `.diff` surface. Also exercise the fallback without a recognized conversation-turn selector: a `.diff` file-card sibling of the current user message inside the same one-authored-message container must confirm, while a `.diff` card belonging to a neighboring authored turn must not. Force the ReviewDiff attachment to disappear **before** any automatic click and require `PreparedUnsent`. Separately force it to disappear after an actual possible-Send click without observing a post-baseline `.diff` attachment surface; require `UnknownAfterSend` and **no further automatic Send attempts**. Then close all tabs for a separately queued bound interaction and require it to stay pending without changing Apply/Review success; reopen the conversation and require delivery to resume.
12. Disable/uninstall the extension and verify Apply, ReviewDiff generation, Finalize and snapshot export remain usable independently.
13. Queue a ReviewDiff, then change its persisted `.diff` bytes before the extension fetches it; require delivery failure before attachment preparation. The user-facing Output may say the artifact changed, but must not expose hash/SHA terminology as something the user needs to act on.
14. Queue a ReviewDiff in Chat A and navigate the claimed tab to Chat B before attachment preparation; require the claim to be released/rejected and verify nothing is sent to Chat B. Repeat during `Sending`; require uncertainty/stop rather than continuing Send attempts in Chat B.
15. Rebind an unsent ChangeSet from Chat A to Chat B and require old `Pending`/`Claimed` review tasks to become `Cancelled`. Stage a task as `Preparing` and require rebind/unbind to be blocked; repeat after `SendClicked`. Expire a `SendClicked` lease and require the next rebind/status read to normalize it to `UnknownAfterSend` rather than blocking forever.
16. Produce a newer automatic ReviewDiff while an older task is still `Pending`/`Claimed`; require the older automatic task to become `Cancelled` and only the newer task to remain deliverable. Force attachment preparation to fail **before the exact `.diff` is upload-ready** and require `FailedBeforeSend`, not `PreparedUnsent`. Then repeat after the expected attachment is verifiably ready; require `Preparing`, the newer task to wait, and any later pre-Send failure to become terminal `PreparedUnsent`.
17. Use an empty cumulative ReviewDiff and require `NoChanges` with no ChatGPT message.
18. First ensure the bound ordinary ChatGPT `/c/...` tab is already running the current `0.2.11+` replaceable agent; when upgrading from a pre-`0.2.11` extension, refresh that tab once because the already-invalidated legacy script cannot retroactively acquire shutdown logic. Then leave a ReviewDiff task `Pending` / **Waiting for ChatGPT tab** and reload the unpacked extension **without refreshing the ChatGPT page again**. Require a fresh extension-session runtime generation to start, the service worker to inject a fresh agent into the already-open tab, the now-current stale/invalidated agent to stop its heartbeat without accumulating repeated `Extension context invalidated` errors, and the pending task to become claimable/deliverable from the fresh agent. Also suspend/restart the MV3 service worker without reloading the extension and require the same session generation/agent to remain acceptable. Transparent continuation of an already `Preparing`/possible-Send interaction across reload/tab close remains outside this gate; existing `PreparedUnsent` / `UnknownAfterSend` truth boundaries still apply.
19. After extension setup, inspect content-script access to extension storage and require the pairing token to be unavailable there; Options/service-worker connection must continue to work.

Manual pass requires real `.diff` attachment delivery for both small and large ReviewDiff content, including a non-foreground/unfocused ChatGPT document, post-baseline `.diff` attachment-surface confirmation from the complete user-turn container, post-preparation composer contamination blocking, protocol/version-skew fail-fast behavior for new claims, configured retry timing, MAIN-world Send attempts and the preparation-state/duplicate-tab protections above; Java/bridge state-machine tests alone are insufficient evidence for live-browser success.

## `PA-SL07` — Select Existing Work Context

**Target property:** one ChangeSet selector can stay repository-scoped or expand across registered Repository Targets, and selecting a global row establishes its exact Repository Target + ChangeSet context without a separate discovery workflow or Git mutation.  
**Execution state:** `implementation present / manual practical evidence pending`

1. Register several repositories; include two clones sharing the same Repository Identity.
2. Create Active, Publication Pending and Finalized ChangeSets across targets plus at least one unfinished failed-latest marker.
3. With `All repositories` off and `Show history` off, require the ChangeSet dropdown to show only Active + Publication Pending for the currently selected Repository Target.
4. Require every visible ChangeSet row, including repository-scoped rows, to begin with its Repository Target display name before the work label/status. Enable `All repositories`; require the **same dropdown** to show unfinished ChangeSets across registered targets. There must be no separate `Existing work` button/dialog.
5. Select a ChangeSet from another target; require the Repository selector to switch to that exact target and the ChangeSet to become current. Repeat with same-origin clones and require no clone substitution.
6. Require `All repositories` and `Show history` to sit directly below the ChangeSet dropdown rather than on its right edge. Toggle `Show history`; require Finalized rows to be added within the current local/global scope. Selecting Finalized history alone must not Reopen; the explicit Reopen control remains history-only.
7. Persist an orphan/unavailable Repository Target reference. Require the global projection to continue loading without `[REPOSITORY_MISMATCH]` aborting the whole selector and without substituting another target. The unavailable row must not authorize repository operations.
8. Verify unfinished error-marker ordering/reason and that Finalized rows remain marker-free.
9. Toggle back to repository scope and require only that Repository Target's applicable rows.
10. Restart and repeat selection; navigation state may persist, but no selection/toggle may mutate Git/filesystem/lifecycle state.

## `PA-SL08` — Manage External Interactions

**Target property:** current-change and snapshot handoffs that are still active/actionable or uncertain appear as user-semantic External Interactions with exact source/destination and truthful Cancel behavior; ordinary terminal attempts do not accumulate as list history.  
**Execution state:** `implementation present / manual practical evidence pending`

1. Create one current-change delivery and one snapshot-attachment interaction; require both to appear in one list with distinguishable kind/source/destination/status. Require the interaction selector to use the full row and `Refresh interactions` / `Cancel interaction` to remain visible directly below it even when the selected interaction text is long.
2. Verify pairing, heartbeat/polling, claim/lease/tab reconnect mechanics do **not** appear as independent user interactions.
3. Cancel a queued interaction before external preparation; require `Cancelled`, no browser/composer mutation/further automation, and require the terminal row to disappear from the External Interactions list after its result is surfaced.
4. Prepare extension-owned ReviewDiff text without Send, then Cancel; require `Cancelled — prepared content retained`, text to remain in ChatGPT, no cleanup/Send/further automation, and then removal of the terminal row from the list.
5. Prepare a snapshot attachment, then Cancel; require attachment to remain prepared, `Cancelled — prepared content retained`, Send untouched, and removal of the terminal row from the list.
6. Complete ordinary `Sent`, `Attached`, `NoChanges`, `FailedBeforeSend` and `PreparedUnsent` examples; require each terminal outcome to be available through Output/notification but not accumulate in the External Interactions list.
7. Force possible-Send uncertainty after `SendClicked`; require `UnknownAfterSend` truth to remain visible/actionable and no ability to rewrite it to Cancelled or auto-resend.
8. While a current-change interaction is still actionable, request the same current ReviewDiff for the same conversation again; require reuse of the existing interaction identity and exactly one Pending/actionable list row. Repeat with the same snapshot artifact + destination. A materially different source must remain independent. After Cancel/ordinary terminal completion, explicitly retry the same user intent; require a **new External Interaction identity**, never restoration/reuse of the terminal one.
9. Cancel one interaction while another exists; require no cross-interaction cancellation/state corruption.
10. Restart/reload; require only safety/recovery/uncertainty/idempotency-critical technical state to persist and no duplicate semantic interaction/delivery; ordinary terminal rows remain absent from the user list.
11. Confirm user-semantic status/reason does not expose `Claimed`, lease duration or tab ID as interaction identity.

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

1. Apply package A for ChangeSet X; after Prepare resolves X, require Output X to contain `Apply attempt 1`, the physical ZIP filename and exact `packageId` as traceability metadata.
2. Apply/retry package A or a different correction package B that keeps ChangeSet X; require the existing Output X to remain and the next Apply attempt to append there. A different `packageId`, filename or `(1)` download suffix must not create another Output owner for the same ChangeSet.
3. Apply package C for ChangeSet Y, including a fixture that deliberately reuses the same archive filename/filesystem path used for X; require independent Output Y. Switch the ChangeSet selector X → Y → X and require the corresponding session buffers to be restored without cross-mixing.
4. Force an Apply failure before a valid `PreparedApply` can identify a ChangeSet; require it to appear only as transient `Operation` status/notification/Technical Diagnostics as applicable and not be appended to the previously selected ChangeSet or any generic Output history. Force an Execute/Refresh/Finalize failure after ChangeSet identity is known and require it to be appended to that captured ChangeSet even if another ChangeSet is selected before the callback completes.
5. Start Refresh Review for ChangeSet X, switch to Y before completion, and require the callback to persist X/update Output X without assigning the selected ChangeSet, Review presentation or chat-delivery presentation back to X. Then return to X and require Copy/Open to resolve the latest persisted ReviewDiff.
6. Click `Copy output`; paste into a text editor and require the complete currently displayed ChangeSet Output block to match. With no ChangeSet selected, Output is empty rather than a general history. Successful copy must not add another line to Output.
7. Force a bridge-side terminal result such as `FailedBeforeSend` for ChangeSet X while ChangeSet Y is selected; require it not to appear in visible Output Y. Select X and require the task id/status/message to be present there. `ChatEvent.changeSetId`, not archive/package/review-attempt identity, is the routing authority.

## Acceptance Record

Record Windows/JDK/Git versions, registered repository identities, date, pass/fail items and discovered issues before declaring V0.1 operationally accepted.

For each executed `PA-SLxx` card, record Windows/JDK/Git/Edge context when material, repository identities/fixtures used, date, observable evidence, pass/fail and discovered issues. A Slice requiring live UI/browser proof is operationally accepted only while its relevant current cards are `executed-pass`.
