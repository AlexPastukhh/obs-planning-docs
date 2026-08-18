# SCN-RPKG-REVIEW — Inspect Current ChangeSet Review State

Status: active current behavior owner
Scope: detailed application behavior and traceability for `UC-RPKG-REVIEW`.

Related Application Use Case: [`UC-RPKG-REVIEW`](../USE-CASE-REGISTRY.md)

**Trigger/input:** successful Apply, selecting a persisted ChangeSet, or explicit Refresh Review.

**Successful result:** the user navigates ChangeSets by `changeSetLabel · status · short UUID` within the selected repository. A valid persisted `currentReview` can be reopened after application restart only after its canonical diff file and internal fingerprint are reverified. Refresh Review generates/persists a new cumulative `HEAD → working tree` diff scoped to ChangeSet-owned paths, including untracked adds, without changing `.git/index`. `Copy ReviewDiff` and `Open ReviewDiff` operate on that same integrity-verified canonical file.

**Finalize baseline boundary:** Copy/Open are optional inspection conveniences and never authorize or gate Finalize. The selected ChangeSet's persisted `currentReview` is the technical implicit Finalize baseline. Its SHA-256 is internal only and is not displayed/entered in the normal Swing/CLI flow. A later Apply or Refresh Review replaces the baseline. Integrity of this baseline does not prove semantic correctness; semantic ReviewDiff analysis belongs to `UC-DOC-REVIEW-DIFF` / `planning/documentation/review-diff-review-workflow.md`.

**Boundary:** repo-stored review diff files are service artifacts, never ChangeSet-owned content and never Finalize staging targets.

**Primary traceability:**

- architecture: [`ARCHITECTURE.md`](../ARCHITECTURE.md#5-canonical-reviewdiff);
- state: [`DATA-AND-STATE.md`](../DATA-AND-STATE.md#6-reviewdiff-identity-and-implicit-finalize-baseline);
- Core: [`src/main/java/obs/rpkg/Core.java`](../src/main/java/obs/rpkg/Core.java) (`getChangeSets`, `currentReview`, `refreshReview`, `verifiedReviewDiffPath`, `copyReviewDiffToClipboard`, `publishReviewDiff`);
- Git boundary: [`src/main/java/obs/rpkg/GitClient.java`](../src/main/java/obs/rpkg/GitClient.java);
- UI: [`src/main/java/obs/rpkg/MainWindow.java`](../src/main/java/obs/rpkg/MainWindow.java);
- automated: [`src/test/java/obs/rpkg/CoreTests.java`](../src/test/java/obs/rpkg/CoreTests.java).
