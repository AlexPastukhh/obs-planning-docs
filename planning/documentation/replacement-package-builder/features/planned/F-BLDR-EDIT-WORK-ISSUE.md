# F-BLDR-EDIT-WORK-ISSUE — Edit Work Issue

## Identity

`F-BLDR-EDIT-WORK-ISSUE`

Status: future `Introduction`.

## Intent

Replace actor-owned Work Issue prose without changing durable work identity.

## Principal Result

The exact Work Issue contains new actor prose and unchanged Builder-managed identity.

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Input | exact `IssueRef`, `changeSetId`, recorded `workBranch`, new `ActorIssueText` |
| Protected | Issue title, managed `changeSetId`, `workBranch`, `targetBranch`, `startBaseCommit` |
| Result | confirmed current Issue body |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Verify exact Issue and protected identity.** Read Issue; require managed `(changeSetId, workBranch)` to match; capture managed identity to preserve. | `BR-BLDR-EDIT-ISSUE-EXACT-WORK` — `IssueRef + managed(changeSetId, workBranch) = selected work`; otherwise update fails before write.<br>`BR-BLDR-EDIT-ISSUE-PRESERVE-WORK-IDENTITY` — `EditActorText ⇒ IssueRef,title,changeSetId,workBranch,targetBranch,startBaseCommit,package state unchanged`. |
| **2. Replace actor-owned prose only.** Do not use comment as substitute and do not change protected identity. | `BR-BLDR-EDIT-ISSUE-PRESERVE-WORK-IDENTITY` — `EditActorText ⇒ IssueRef,title,changeSetId,workBranch,targetBranch,startBaseCommit,package state unchanged`.<br>`BR-BLDR-EDIT-ISSUE-NO-HISTORY-CONFLATION` — `EditWorkIssue ≠ AddIssueComment`; body mutation never substitutes comment append and vice versa. |
| **3. Re-read and prove update.** Require actor text = supplied replacement and managed identity unchanged; only then success. | `BR-BLDR-EDIT-ISSUE-VERIFY-RESULT` — `Success ⇔ actorText = suppliedText ∧ managedIdentity unchanged` after re-read.<br>`BR-BLDR-EDIT-ISSUE-ORDERED-UPDATE` — `read exact Issue → verify managed work identity → preserve managed identity → replace actor text → re-read → verify actor text + unchanged managed identity → Success`. |

Decision after Step 3: **What semantic instruction changed?**

| Goal / acceptance | Handoff / URI / Apply / Finalize wording only | Prose target differs from managed target |
|---|---|---|
| Previous semantic review no longer proves the changed instruction. | Package review may remain current. | Block handoff/URI. |
| Review again before handoff/Finalize. If an `APPROVABLE` handoff package must change to satisfy the new goal, the new package starts new logical work/new `changeSetId`. | ChatGPT rereads current Issue before invocation. | Fix prose or use future explicit retarget-work Evolution. |

## Boundary decision

Separate from Start Work and Add Comment because its Result is mutation of durable actor-owned Issue instructions.

---
