# F-RPKG-FINALIZE-REPOSITORY-WORK — Finalize Repository Work

## Identity

`F-RPKG-FINALIZE-REPOSITORY-WORK`

## Intent

Integrate exact current reviewed work result into exact target branch and confirm final Issue communication.

## Principal Result

`RepositoryWork.Finalized` only after exact integration and exact final Issue communication are both proven.

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Input | `repositoryIdentity`, `changeSetId`, `IssueRef`, `workBranch`, `publishedTip`, published `GitTreeId`, `targetBranch`, current `ReviewAuthority`, optional final `CommentText` |
| Result evidence | exact integration proof + exact final Issue-comment proof |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Verify exact work and current review authority.** Require exact identifiers and `reviewAuthority.tree = tree(publishedTip)` before integration. | `BR-RPKG-FINALIZE-EXACT-WORK` — `FinalizeInput = (repositoryIdentity, changeSetId, IssueRef, workBranch, targetBranch, publishedTip)` must equal selected work exactly.<br>`BR-RPKG-FINALIZE-CURRENT-REVIEW-AUTHORITY` — `Finalize allowed ⇒ reviewAuthority.tree = tree(publishedTip)`; mismatch ⇒ stop before integration. |

Decision after Step 1: **Does current review authority cover the exact published tree?**

| Yes | No — stale/missing |
|---|---|
| → Step 2 | Stop before integration. |
| Continue Finalize | Obtain future-selected current review authority before retry. |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **2. Perform first selected external Finalize effect.** Relative order of integration vs final Issue communication remains OPEN. | `BR-RPKG-FINALIZE-ORDERING-IS-OPEN` — `review proof < integration`; `Finalized > {integration proof, comment proof}`; relative order of integration vs comment = OPEN.<br>`BR-RPKG-FINALIZE-INTEGRATE-EXACT-RESULT` — `integrationResult = integrate(exact published work result, exact targetBranch)` and must be proven.<br>`BR-RPKG-FINALIZE-FINAL-ISSUE-COMMUNICATION` — `Finalize ⇒ required final comment confirmed on exact Work Issue`; supplied actor final text is preserved semantically. |

Decision inside Step 2: **Which external Finalize effect is selected first?**

| Integration first | Final Issue communication first |
|---|---|
| Integrate exact published result into exact target branch. | Post/confirm exact final comment on exact Work Issue. |
| Prove integration. | Prove final Issue communication. |
| → Step 3 with Issue communication remaining | → Step 3 with integration remaining |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **3. Perform/reconcile remaining external effect.** Preserve proven effect; perform or reconcile only missing/uncertain effect. | `BR-RPKG-FINALIZE-PRESERVE-PARTIAL-EXTERNAL-RESULTS` — `proven external effect persists across later failure/uncertainty`; uncertain effect ⇒ reconcile before duplicate attempt. |

Decision inside Step 3: **What remains after the first/proven Finalize effect?**

| Other effect missing | Other effect uncertain | Both effects proven | Unrecoverable conflict |
|---|---|---|---|
| Perform only the missing effect. | Reconcile only the uncertain effect before any duplicate attempt. | Preserve both proofs. | Preserve every already-proven effect. |
| When proven → Step 4 | If resolved as missing → perform it; if proven → Step 4; otherwise remain Step 3. | → Step 4 | Fail/stop |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **4. Complete Finalize.** Mark work Finalized only after integration proof + final Issue-comment proof both exist. | `BR-RPKG-FINALIZE-MARK-FINALIZED-ONLY-AFTER-BOTH-PROVEN` — `RepositoryWork.Finalized ⇔ integration proven ∧ final Issue comment proven`. |

OPEN target detail — integration mechanism: direct merge vs PR vs other is not selected.  
OPEN target detail — GitHub Issue closure: whether Finalize closes the Issue is not selected.  
OPEN target detail — generated final-comment format: exact application-generated wording is not selected.  
OPEN target detail — replacement review authority after the published work tree changes: the mechanism that establishes new current review authority is not selected.

## Boundary decision

Separate from Apply: Apply may stop after Publish; Finalize has different eligibility, effects and terminal Result.

---
