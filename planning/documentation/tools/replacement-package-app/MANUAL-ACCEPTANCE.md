# Replacement Package App — Manual Acceptance

Status: target executable practical acceptance

Use a clean state-v2 root. Old persisted works are intentionally not imported; use the previous deployed executable for them.

## Work workspace

Register the intended repository, choose WorkId + explicit target branch and Start workspace. Verify one deterministic `changeset/<WorkId>` worktree is created, `GitWorkspace` is persisted with exact Repository Target/worktree/baseCommit, and repeating Start is already satisfied. Simulate workspace persistence failure after Git effects and verify retry reconciles the journal-owned workspace rather than creating another branch/worktree.

## Apply

Apply one package with replace/add/delete and exact base bytes. Verify only the Work worktree changes, HEAD does not change, exact package identity is persisted, and a different archive with the same packageId fails closed. Replace the ZIP on disk after package capture in a controlled test and verify the captured bytes, not the later path contents, are applied. Simulate state persistence failure after file mutation and verify retry recovers through the package journal.

## Commit

Verify Commit creates/proves one exact package-only commit with correct parent and identity trailers, does not Publish, and repeat is idempotent. Simulate commit success followed by package-state persistence failure; retry must prove/reuse the exact existing commit.

## Publish / Retry Publish

Verify remote absent/previous exact tip permits push with lease; exact intended remote tip is already success; unexpected tip blocks before push. Force unavailable confirmation after a possible push and verify durable `NotConfirmed`; retry must observe before any further push. Force failure to persist pre-push `NotConfirmed` and prove no push occurs. Force failure to persist final `ConfirmedTip` and prove retry confirms existing remote state without repush.

## Automatic OBS action

Run one schema-1 `apply-package` with `targetBranch` + `workIntent`. Verify Work Intent, GitWorkspace, Apply, Commit and Publish are composed in one invocation, no `Core.ChangeSet` is created for the Work, and `OBS-APPLY-RESULT/1 status: applied` is produced only after exact publication proof. Repeat the same exact action and verify idempotent success without duplicate commit/push.

## Target UI

Verify the Main Work Window exposes Repository Target, WorkId, target branch, archive, packageId, OBS action and Start/Apply/Commit/Publish/Retry. It must not expose legacy ChangeSet/Review/Chat/Finalize/External Interaction controls.
