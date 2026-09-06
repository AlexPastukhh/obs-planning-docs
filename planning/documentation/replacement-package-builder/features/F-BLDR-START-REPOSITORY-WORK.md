# F-BLDR-START-REPOSITORY-WORK — Start Repository Work

## Identity

`F-BLDR-START-REPOSITORY-WORK`

## Intent

Create one durable logical repository work: one exact work branch + one exact Work Issue, both tied to one `changeSetId`.

## Principal Result

```text
Work Issue exists
+
work branch exists from exact Start Work base
+
Issue and Builder state contain the same exact work identity
```

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Input | `repositoryIdentity`, repository location, `targetBranch`, actor-selected Issue title, `ActorIssueText` |
| Fixed before external creation | `changeSetId`, `startBaseCommit`, `workBranch` |
| External result | exact `IssueRef` |
| Builder-managed Issue text | `changeSetId`, `workBranch`, `targetBranch`, `startBaseCommit` |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Fix Start Work identity.** Resolve `targetBranch` to one full `startBaseCommit`; fix `(changeSetId, targetBranch, startBaseCommit, workBranch)` before branch/Issue creation. | `BR-BLDR-START-FIX-IDENTITIES-BEFORE-CREATE` — `StartAttempt = (changeSetId, targetBranch, startBaseCommit, workBranch)` is fixed before branch/Issue creation; `retry(partial\|uncertain) ⇒ same StartAttempt`. |
| **2. Create and prove the work branch.** Create exactly `workBranch` from exactly `startBaseCommit`; ambient checkout/HEAD is irrelevant. | `BR-BLDR-START-CREATE-ONE-WORK-BRANCH` — `workBranch` is created from exactly `startBaseCommit`; ambient checkout/HEAD is irrelevant. |

Decision after Step 2: **What is the work-branch creation/proof result?**

| Exact branch proven | Result uncertain | Conflicting branch/base proven |
|---|---|---|
| Preserve exact branch proof. | Reconcile the same fixed `workBranch`; do not generate another identity. | Fail/recovery; never adopt conflicting branch/base. |
| → Step 3 | If exact branch becomes proven → Step 3; otherwise remain in Step 2 reconciliation. | Stop |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **3. Create or reconcile the exact Work Issue.** Establish exactly one Issue for the fixed `changeSetId`. | `BR-BLDR-START-CREATE-ONE-WORK-ISSUE` — `changeSetId ⇒ exactly one Work Issue`; uncertain create ⇒ reconcile before any create retry. |

Decision after Step 3: **What is the Work Issue creation/proof result?**

| Exact intended Issue proven | Result uncertain | Conflicting Issue identity proven |
|---|---|---|
| Preserve exact `IssueRef`. | Reconcile the same intended Issue before any create retry. | Fail/recovery; never substitute the conflicting Issue. |
| → Step 4 | If exact Issue becomes proven → Step 4; otherwise remain in Step 3 reconciliation. | Stop |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **4. Establish and verify Issue work text.** Preserve actor prose as opaque text; establish Builder-managed `(changeSetId, workBranch, targetBranch, startBaseCommit)` and re-read those exact values. | `BR-BLDR-START-WRITE-MANAGED-WORK-IDENTITY` — `WorkIssue.managedIdentity = (changeSetId, workBranch, targetBranch, startBaseCommit)` with literal readable values.<br>`BR-BLDR-START-PRESERVE-ACTOR-PROSE` — `actorIssueText` is preserved as opaque prose; `actorIssueText ∩ managedIdentity = ∅` semantically. |
| **5. Complete Start Work and fix the durable work-branch role.** Return success only after exact branch + exact Issue + matching managed identity are proven. Later Builder work uses this one recorded branch; review uses separate temporary state and never turns that state into the recorded work branch. | `BR-BLDR-START-RETURN-ONLY-PROVEN-WORK` — `StartWork.Success ⇔ workBranch proven ∧ WorkIssue proven ∧ WorkIssue.managedIdentity = StartAttempt`.<br>`BR-BLDR-START-USE-RECORDED-WORK-BRANCH` — `laterBuilderOperation(work) ⇒ branch = WorkIssue.managedIdentity.workBranch`.<br>`BR-BLDR-START-ONE-RECORDED-WORK-BRANCH` — `one changeSetId ⇒ one recorded workBranch`; branch change requires explicit recovery/Evolution and consistent managed-identity update. |

**OPEN target detail — Issue-body ownership representation.** Exact Markdown markers/labels separating actor-owned prose from Builder-managed identity text are not selected. Any implementation representation must let `F-BLDR-EDIT-WORK-ISSUE` replace actor text while preserving the exact managed `changeSetId`, `workBranch`, `targetBranch` and `startBaseCommit`.

## Boundary decision

Separate Feature: establishing durable work/Issue identity is independently useful and may precede many package Build/Review iterations.

---
