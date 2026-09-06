# F-RPKG-APPLY-REPLACEMENT-PACKAGE — Apply Replacement Package

## Identity

`F-RPKG-APPLY-REPLACEMENT-PACKAGE`

## Intent

Realize exact package on exact recorded work branch up to exactly requested extent.

## Principal Result family

`Applied` | `Applied + Committed` | `Applied + Committed + Published`  
or `AppliedUncommitted` | `CommittedUnpublished` | `PublicationUncertain`.

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Invocation | exact package/archive + `packageId`, `repositoryIdentity`, `changeSetId`, `IssueRef`, `workBranch`, `targetBranch`, `expectedSource`, `ApplyExtent` |
| Optional reviewed path | reviewed `GitTreeId` |
| Established state | applied tree, commit SHA/tree, remote publication proof/uncertainty |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Verify exact invocation and applicability.** Require exact work/package identity; workspace at `expectedSource`; all replace/delete checks pass before mutation. | `BR-RPKG-APPLY-EXACT-INVOCATION` — `ApplyInvocation = (repositoryIdentity, changeSetId, IssueRef, workBranch, targetBranch, packageId, expectedSource)`; mutation requires exact equality with selected work/package.<br>`BR-RPKG-APPLY-EXPECTED-SOURCE-AND-APPLICABILITY` — `workspace.commit = expectedSource ∧ all replace/delete expected-base checks pass` before file mutation. |
| **2. Apply package file result.** Apply exact package bytes and prove applied tree. | `BR-RPKG-APPLY-ORDERED-STAGES` — `Apply → Commit → Publish`; later stage success ⇒ all earlier required stages proven. |

Decision after Step 2: **Which `ApplyExtent` path was requested?**

| `Apply` | `Apply+Commit` | `Apply+Commit+Publish` |
|---|---|---|
| Stop at proven `Applied`. | → Step 3 Commit | → Step 3 Commit |
| Success | After Commit, stop. | After Commit, continue to Publish decision/path. |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **3. Commit exact applied work.** Create one commit containing intended package-applied paths only; prove commit/tree. | `BR-RPKG-APPLY-ORDERED-STAGES` — `Apply → Commit → Publish`; later stage success ⇒ all earlier required stages proven.<br>`BR-RPKG-APPLY-COMMIT-CONTAINS-ONLY-INTENDED-WORK` — `committed paths = intended package-applied work paths`; unrelated paths are not intentionally included. |

Decision after Step 3: **Does this path require Publish?**

| `Apply+Commit` | `Apply+Commit+Publish` |
|---|---|
| Stop at proven `Applied + Committed`. | → Step 4 Publish |
| Success | Continue |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **4. Publish or reconcile publication.** Push exact committed work-branch tip; report Published only after exact remote tip proof. | `BR-RPKG-APPLY-PUBLISHED-REMOTE-TIP` — `Published ⇔ remote(workBranch).tip = exact committed tip` proven.<br>`BR-RPKG-APPLY-PUBLICATION-UNCERTAINTY` — `push outcome uncertain ⇒ PublicationUncertain → reconcile exact remote workBranch before any push retry`. |

Decision inside Step 4: **What publication result is proven?**

| Exact remote tip proven | Proven not published | Publication uncertain | Conflicting remote state |
|---|---|---|---|
| Preserve exact remote-tip/tree proof. | Return `CommittedUnpublished`. | Return `PublicationUncertain`. | Fail/recovery. |
| → Step 5 | Later continuation resumes Step 4. | Reconcile exact remote branch before any retry; remain in Step 4 until resolved. | Stop |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **5. Verify reviewed published result when applicable.** Builder-reviewed path requires published tree = reviewed predicted tree. | `BR-RPKG-APPLY-PUBLISHED-TREE-EQUALS-REVIEWED-TREE` — `Builder-reviewed path ∧ Published ⇒ tree(remote workBranch tip) = reviewed predictedTree`. |
| **6. Return/resume from last proven state.** Return exact proven state; continuation starts after it; never repeat proven Apply or duplicate Commit. | `BR-RPKG-APPLY-LAST-PROVEN-RESULT` — `requested extent not completed ⇒ Result = last proven state`, including `AppliedUncommitted \| CommittedUnpublished \| PublicationUncertain`.<br>`BR-RPKG-APPLY-RESUME-WITHOUT-REPEATING-PROVEN-STAGES` — `resume(same changeSetId,packageId) ⇒ continue after last proven stage`; no repeated Apply/no duplicate commit.<br>`BR-RPKG-APPLY-REQUESTED-EXTENT` — `extent ∈ {Apply, Apply+Commit, Apply+Commit+Publish}`; execution stops exactly at selected extent. |

Transport does not change these steps. Automatic Finalize is Scenario composition after Apply.

## Boundary decision

Apply/Commit/Publish are steps of one Feature. Finalize remains separate.

---
