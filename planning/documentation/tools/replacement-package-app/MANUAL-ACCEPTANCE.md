# Replacement Package App Manual Acceptance

Status: required V0.1 Windows acceptance checklist
Scope: checks not proven by cross-platform automated Java tests alone.

Run after `run-tests.cmd` reports `RESULT passed=22 failed=0` (or a later suite with `failed=0`).

## Environment

- Windows with JDK 21 (`java`, `javac`, `jar`).
- Git available on PATH.
- at least two disposable Git repositories with configured GitHub-shaped `origin` values.
- no valuable uncommitted work in disposable repositories.

## Build / Launch / Settings Migration

1. Run `run-tests.cmd`; require `failed=0`.
2. Run `run-app.cmd` and verify the Swing window opens.
3. If legacy settings contain one `repositoryRoot`, verify it appears after restart as one registered repository with a readable display name and verified GitHub identity.
4. Close/reopen and verify selected repository and selected ChangeSet navigation state persist under `%LOCALAPPDATA%\OBS\ReplacementPackageApp\` (or documented fallback).

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
5. Verify displayed SHA-256 equals the persisted canonical diff hash.
6. With `Clipboard` selected, verify automatic Apply handoff either places the canonical diff in the clipboard or surfaces a handoff warning; it must not create a false Apply failure.
7. Click `Copy ReviewDiff`, paste the clipboard into a text target, and require exact text equality with the persisted canonical diff; the UI must report success only after verified clipboard read-back.
8. Click `Open ReviewDiff` and require the same current canonical `.diff` file to open through the desktop handler without changing the displayed current SHA.
9. Close/reopen the app, reselect the ChangeSet, and require Copy/Open to work immediately from its persisted `currentReview` without mandatory Refresh Review.
10. Click `Refresh Review`; require a new current review identity to be persisted and `Reviewed SHA-256` cleared.
11. Test `RepoDiffFile` and `Both` settings and confirm `_ai-review-diffs/**` is not an owned ChangeSet path.

## Approval / Finalize / Push Recovery

1. Confirm Copy/Open are optional: do not use either one, click `Approve Current Review`, and require `Reviewed SHA-256` to become the current verified SHA.
2. Select another ChangeSet, Apply another overlay or Refresh Review and require the approval field to clear.
3. Manually paste an externally approved current SHA and verify that path remains supported.
4. Modify an owned file after approval and require `REVIEW_STALE`.
5. Stage any path and require Finalize to block; clear index.
6. Finalize and verify only owned paths enter the commit.
7. Verify successful push releases ownership.
8. Make push unavailable after review: Finalize must create one commit and enter `CommittedPendingPush`.
9. Restore transport, Retry Push, and verify no second commit.
10. Change raw origin before Finalize and Retry Push; require `REPOSITORY_MISMATCH` before push.
11. In one ChangeSet, add a new path and then delete it in a continuation package; require an empty cumulative ReviewDiff and successful Finalize with no new commit/push.

## Action / Archive Resolution

1. Paste a valid OBS-ACTION with matching ZIP and verify packageId-based resolution.
2. Change action packageId; require `ACTION_PACKAGE_MISMATCH`/no mutation.
3. Wrong repository package must produce `REPOSITORY_MISMATCH`.
4. Filename alone must never override packageId mismatch.

## Acceptance Record

Record Windows/JDK/Git versions, registered repository identities, date, pass/fail items and discovered issues before declaring V0.1 operationally accepted.
