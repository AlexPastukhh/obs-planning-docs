# F-BLDR-APPLY-PACKAGE-FOR-REVIEW — Apply Package for Review

## Identity

`F-BLDR-APPLY-PACKAGE-FOR-REVIEW`

## Intent

Reconstruct the exact result of one exact package against its exact expected source without changing the durable work branch.

## Principal Result

```text
predicted resulting tree
+ latest.diff
+ cumulative.diff
+ full resulting workspace/tree
```

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Input | `changeSetId`, recorded `workBranch`, Start Work base, `packageId`, `expectedSource`, exact package bytes |
| Result identity | `predictedTree` / reviewed-result `GitTreeId` |
| Review artifacts | `latest.diff`, `cumulative.diff`, full resulting workspace/tree |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Create isolated review state.** Create fresh workspace at exactly `expectedSource`; never reuse prior review state and never mutate recorded work branch. | `BR-BLDR-REVIEW-ORDERED-RECONSTRUCTION` — `freshWorkspace(expectedSource) → apply exact package → identify predictedTree → derive latestDiff+cumulativeDiff+fullResult → Success`.<br>`BR-BLDR-REVIEW-DOES-NOT-MUTATE-WORK-BRANCH` — `ApplyForReview ⇒ recorded workBranch unchanged`. |
| **2. Apply the exact package.** Use the same applicability/result semantics as consumer App Apply. | `BR-BLDR-REVIEW-SAME-PACKAGE-SEMANTICS-AS-CONSUMER-APPLY` — `BuilderReviewApply(package, source) = ConsumerApply(package, source)` for applicability and resulting file bytes. |
| **3. Derive one exact predicted result.** Identify `predictedTree`; derive latest diff, cumulative diff and full result from that same reconstruction. | `BR-BLDR-REVIEW-LATEST-DIFF` — `latest.diff = diff(expectedSource, predictedTree)`.<br>`BR-BLDR-REVIEW-CUMULATIVE-DIFF` — `cumulative.diff = diff(startWorkBaseCommit, predictedTree)`.<br>`BR-BLDR-REVIEW-FULL-RESULT` — `tree(fullReviewResult) = predictedTree`. |
| **4. Validate and freeze the review Result.** Require every review artifact to belong to one reconstruction and return immutable review identity. | `BR-BLDR-REVIEW-ONE-RECONSTRUCTION` — `{predictedTree, latest.diff, cumulative.diff, fullResult, packageId, expectedSource} ⇒ one reconstruction`.<br>`BR-BLDR-REVIEW-RESULT-IDENTITY-IS-IMMUTABLE` — `ReviewResult = (changeSetId, workBranch, expectedSource, packageId, predictedTree)` is immutable. |

Decision inside Step 4: **Do all review identities/artifacts describe the same reconstruction?**

| Yes | No |
|---|---|
| Freeze exact immutable review Result. | Reject the mixed/inconsistent reconstruction. |
| Success | Fail; no review Result |

## Feature / Scenario boundary

This Feature produces review material. ChatGPT/user decides `NEEDS_CORRECTION` vs `APPROVABLE` in the Scenario.

---
