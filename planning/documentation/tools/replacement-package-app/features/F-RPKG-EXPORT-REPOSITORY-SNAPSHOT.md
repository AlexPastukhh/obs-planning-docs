# F-RPKG-EXPORT-REPOSITORY-SNAPSHOT — Export Repository Snapshot

## Identity

`F-RPKG-EXPORT-REPOSITORY-SNAPSHOT`

## Intent

Produce one exact read-only Snapshot ZIP from either actual local working tree or one exact commit.

## Principal Result

One exact Snapshot ZIP exists, or no misleading final ZIP exists.

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Common input | exact `RepositoryTarget`, output directory |
| Local mode | frozen full HEAD; tracked files that exist locally; untracked non-ignored local files; tracked local deletions absent; ignored untracked files and `.git/**` excluded; exact local bytes/hashes; diff |
| Commit mode | one resolved full `CommitId`; regular-file bytes from that commit only |
| Local Result | exact Snapshot ZIP containing `SNAPSHOT.json`, `BASE-COMMIT.txt`, `WORKING-TREE.diff`, `snapshot/**` |
| Commit Result | exact Snapshot ZIP containing `SNAPSHOT.json`, `COMMIT.txt`, `snapshot/**` |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Select and freeze Snapshot source.** Choose Local or Commit mode and freeze its exact source identity. | `BR-RPKG-SNAPSHOT-LOCAL-SOURCE-MEANS-ACTUAL-WORKING-TREE` — `Local snapshot/** = captured machine working-tree bytes`: tracked-existing + untracked-nonignored; tracked-deleted absent; ignored/.git excluded.<br>`BR-RPKG-SNAPSHOT-COMMIT-ORDERED-CAPTURE` — `resolve ref once → exact commit SHA → read all snapshot bytes from that commit → publish`; local dirty/index/untracked state has no effect. |

Decision inside Step 1: **Which Snapshot source mode was selected?**

| `Working Local Tree + Diff` | `Commit Snapshot` |
|---|---|
| Freeze HEAD baseline; local machine files are content authority: tracked-existing + untracked-nonignored; tracked-deleted absent; ignored untracked and `.git/**` excluded. | Resolve selected ref once to one exact full commit; read regular-file bytes from that commit only. |
| → Step 2L | → Step 2C |

### Main path — source-specific Step 2

| Behavior step | Requirement(s) |
|---|---|
| **2L. Prove one coherent Local capture.** `capture1 → diff1 → capture2 → require equality + HEAD unchanged → diff2 → require diff equality + HEAD unchanged`. | `BR-RPKG-SNAPSHOT-LOCAL-DIFF-MATCHES-SAME-CAPTURE` — `BASE-COMMIT = frozen HEAD ∧ WORKING-TREE.diff = diff(frozen HEAD, same captured local result)`.<br>`BR-RPKG-SNAPSHOT-LOCAL-ORDERED-CONSISTENCY-PROOF` — `freeze HEAD → capture1 → diff1 → capture2 → require capture2=capture1 ∧ HEAD same → diff2 → require diff2=diff1 ∧ HEAD same → publish`; any mismatch ⇒ no final ZIP. |
| **2C. Capture exact Commit state.** Read regular-file bytes from the one resolved commit only; local dirty/index/untracked state has no effect. | `BR-RPKG-SNAPSHOT-COMMIT-ORDERED-CAPTURE` — `resolve ref once → exact commit SHA → read all snapshot bytes from that commit → publish`; local dirty/index/untracked state has no effect. |

Decision after Step 2L: **Did the Local consistency proof pass?**

| Yes | No |
|---|---|
| Preserve the proven coherent Local capture. | Reject the mixed/unstable capture. |
| → Step 3 | Fail; no final ZIP |

The Commit path from Step 2C also → Step 3.

### Main path — converged

| Behavior step | Requirement(s) |
|---|---|
| **3. Reject unsupported source entries.** Symlink/submodule ⇒ fail; no final ZIP. | `BR-RPKG-SNAPSHOT-UNSUPPORTED-ENTRIES-FAIL` — `symlink ∨ submodule ⇒ failure ∧ no final ZIP`. |
| **4. Validate output and publish.** Output directory must exist; canonical/resolved output location (including aliases) must be outside the source repo; final path must be unique/non-overwriting; publish via temp path; final ZIP visible only after success. Entire Feature remains read-only. | `BR-RPKG-SNAPSHOT-OUTPUT-BOUNDARY` — `outputDir exists ∧ canonicalResolved(output) outside canonicalResolved(sourceRepo) ∧ final path unique/non-overwriting ∧ temp publication`; final path visible only after success.<br>`BR-RPKG-SNAPSHOT-NO-MISLEADING-FINAL-ZIP` — `failure before publish ⇒ final Snapshot ZIP absent`.<br>`BR-RPKG-SNAPSHOT-READ-ONLY` — `SnapshotExport ⇒ repository checkout/index/work/ChangeSet/branch-publication/ownership state unchanged`. |

## Boundary decision

Two source branches converge on one immutable Snapshot Result.

---
