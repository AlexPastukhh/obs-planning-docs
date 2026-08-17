# Replacement Package App Manual Acceptance

Status: required V0.1 Windows acceptance checklist
Scope: checks not proven by cross-platform automated Java tests alone.

Run after `run-tests.cmd` reports `RESULT passed=16 failed=0` (or a later suite with `failed=0`).

## Environment

- Windows with JDK 21 (`java`, `javac`, `jar`).
- Git available on PATH.
- disposable Git repository with configured GitHub-shaped `origin`.
- no valuable uncommitted work in the disposable repository.

## Build / Launch

1. Run `run-tests.cmd`; require `failed=0`.
2. Run `run-app.cmd` and verify the Swing window opens.
3. Confirm repository settings persist under `%LOCALAPPDATA%\OBS\ReplacementPackageApp\` (or documented fallback).

## Apply And Rollback

1. Apply a valid add/replace/delete package and verify exact result bytes.
2. Confirm ApplicationAttempt + ChangeSet appear in local state.
3. Apply base mismatch and wrong-repository packages; verify no target mutation.
4. Apply against a dirty unowned path; verify `STATE_DIVERGED`.
5. Exercise a filesystem failure during mutation; require exact rollback or explicit `STATE_DIVERGED`.
6. Create a repository path through a Windows junction/symlink to a directory outside the repository and target a file below it; require `STATE_DIVERGED` and verify outside bytes are untouched.

## ReviewDiff And Real Index

1. Ensure real index is clean.
2. Apply a package containing an untracked add.
3. Confirm cumulative diff includes the new file.
4. Confirm `git diff --cached --quiet` remains clean after ReviewDiff generation.
5. Verify displayed SHA-256 equals the persisted canonical diff hash.
6. Test Clipboard, RepoDiffFile and Both settings.
7. Confirm `_ai-review-diffs/**` is not an owned ChangeSet path.

## Finalize And Push Recovery

1. Confirm Apply/refresh shows current Review SHA separately and leaves Reviewed SHA empty.
2. Paste externally approved SHA manually.
3. Modify an owned file and require `REVIEW_STALE`.
4. Stage any path and require Finalize to block; clear index.
5. Finalize and verify only owned paths enter the commit.
6. Verify successful push releases ownership.
7. Make push unavailable after review: Finalize must create one commit and enter `CommittedPendingPush`.
8. Restore transport, Retry Push, and verify no second commit.
9. Change raw origin before Finalize and Retry Push; require `REPOSITORY_MISMATCH` before push.
10. In one ChangeSet, add a new path and then delete it in a continuation package; require an empty cumulative ReviewDiff and successful Finalize with no new commit/push.

## Action / Archive Resolution

1. Paste a valid OBS-ACTION with matching ZIP and verify packageId-based resolution.
2. Change action packageId; require `ACTION_PACKAGE_MISMATCH`/no mutation.
3. Wrong repository package must produce `REPOSITORY_MISMATCH`.
4. Filename alone must never override packageId mismatch.

## Acceptance Record

Record Windows/JDK/Git versions, repository test identity, date, pass/fail items and discovered issues before declaring V0.1 operationally accepted.
