# Replacement Package App — Manual Acceptance

Status: target executable practical acceptance

Use a clean state-v2 root. Old persisted works are intentionally not imported; use the previous deployed executable for them.

## Work workspace

Register the intended repository, choose WorkId + explicit target branch and Start workspace. First make local target branch stale behind `origin/<targetBranch>` and verify `baseCommit` pins the fresh verified origin tip, not local HEAD. Verify one deterministic `changeset/<WorkId>` worktree is created, `GitWorkspace` is persisted with exact Repository Target/worktree/baseCommit, and repeating Start is already satisfied. Simulate workspace persistence failure after Git effects and verify retry reconciles the journal-owned workspace rather than creating another branch/worktree; a conflicting leftover journal beside persisted workspace must fail closed.

## Apply

Apply one package with replace/add/delete and exact base bytes. Verify only the Work worktree changes, HEAD does not change, package RepositoryIdentity matches the persisted GitWorkspace, exact package identity is persisted, and a different archive with the same packageId fails closed. For each action shape, force an applicability failure where current bytes already equal the intended result and verify exact retry still fails and does not create `ReplacementPackageState`; change a package path after that failed proof and verify the unproven journal does not restore it. Replace the ZIP on disk after package capture and verify the captured bytes are applied. Simulate state persistence failure after file mutation and verify retry recovers only from a schema-3 journal with proven applicability. A schema-1/2 package journal must fail closed in the new executable.

## Commit

Verify Commit creates/proves one exact package-only commit with correct parent and identity trailers, does not Publish, and repeat is idempotent. Simulate commit success followed by package-state persistence failure; retry must prove/reuse the exact existing commit.

## Publish / Retry Publish

Verify remote absent/previous exact tip permits push with lease; exact intended remote tip is already success; unexpected tip blocks before push. Mutate `origin` immediately after fetch-URL verification and prove observation still uses the captured exact URL; mutate `pushurl` immediately after push-URL verification and prove the push still reaches only the captured destination. Configure a foreign `remote.origin.pushurl` before verification and verify Publish fails before any push. Persist an earlier safe observation, move the remote, and verify a later Publish refreshes observation instead of reusing stale authorization. Force unavailable confirmation after a possible push and verify durable `NotConfirmed`; retry must observe before any further push. Force failure to persist pre-push `NotConfirmed` and prove no push occurs. Force failure to persist final `ConfirmedTip` and prove retry confirms existing remote state without repush.

## Automatic OBS action

Run one schema-1 `apply-package` with `targetBranch` + `workIntent`. Verify Work Intent, GitWorkspace, Apply, Commit and Publish are composed in one invocation, no `Core.ChangeSet` is created for the Work, and `OBS-APPLY-RESULT/1 status: applied` is produced only after exact publication proof. Repeat the same exact action and verify idempotent success without duplicate commit/push.

## Target UI

Verify the Main Work Window exposes Repository Target, WorkId, target branch, archive, packageId, OBS action and Start/Apply/Commit/Publish/Retry. It must not expose legacy ChangeSet/Review/Chat/Finalize/External Interaction controls.
