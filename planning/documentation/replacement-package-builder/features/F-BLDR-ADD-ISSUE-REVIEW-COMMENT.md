# F-BLDR-ADD-ISSUE-REVIEW-COMMENT — Add Issue Review Comment

## Identity

`F-BLDR-ADD-ISSUE-REVIEW-COMMENT`

## Intent

Append already-selected review text to the exact Work Issue.

## Principal Result

One exact confirmed Issue comment exists, or no success is reported.

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Input | exact `IssueRef`, `changeSetId`, recorded `workBranch`, actor-selected `CommentText` |
| Result | exact `IssueCommentId` + confirmed comment body |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Verify the exact Work Issue.** Read exact Issue; require managed `(changeSetId, workBranch)` to equal selected work. | `BR-BLDR-ADD-COMMENT-EXACT-ISSUE` — `Issue.managed(changeSetId, workBranch) = selected work` before write; mismatch/missing ⇒ no write. |

Decision after Step 1: **Does the exact Issue managed identity match the selected work?**

| Yes | No |
|---|---|
| → Step 2 | Do not write. |
| Continue | Stop |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **2. Append supplied text.** Append exactly actor-supplied comment; do not edit Issue body/title/work identity. | `BR-BLDR-ADD-COMMENT-EXACT-TEXT` — `createdComment.body = suppliedCommentText`.<br>`BR-BLDR-ADD-COMMENT-DOES-NOT-EDIT-BODY` — `AddComment ⇒ Issue title/body/work identity/package state unchanged`. |
| **3. Confirm external result.** Re-read/confirm new comment; success only when exact Issue + exact body are proven. | `BR-BLDR-ADD-COMMENT-VERIFY-CREATED-COMMENT` — `Success ⇒ exact Issue contains newly confirmed comment with body = suppliedCommentText`.<br>`BR-BLDR-ADD-COMMENT-ORDERED-WRITE` — `read exact Issue → verify managed work identity → append supplied text → confirm exact comment → Success`. |

Uncertain GitHub write ⇒ reconcile Step 3 before duplicate append.

## Feature / Scenario boundary

Scenario/actor decides whether a finding is material and what text to write.

---
