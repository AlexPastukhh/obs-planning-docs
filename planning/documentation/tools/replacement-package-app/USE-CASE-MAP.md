# Replacement Package App Use-Case Map

Status: active V0.1 behavior and traceability map
Scope: trigger → result → boundary for the Replacement Package App and exact links to primary docs/source/tests.

Canonical identities: [`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md)
Shared protocol: [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md)

## 1. `UC-RPKG-APPLY` — Apply Verified Replacement Package

**Trigger/input:** user supplies an `OBS-ACTION/1` and/or explicitly selected ZIP plus a selected repository from the local allowed-repository registry.

**Successful result:** the selected local repository is revalidated against its registered path/origin identity; package/repository/path/base validation completes before mutation; add/replace/delete result bytes are verified; one successful ApplicationAttempt is persisted; ChangeSet ownership is updated; a new cumulative ReviewDiff becomes current and the readable ChangeSet entry becomes selectable without manual UUID entry.

**Failure result:** unregistered repository paths, origin drift and other preflight failures do not mutate targets. Mutation failures use bounded verified rollback; inability to verify rollback becomes `STATE_DIVERGED`. Clipboard/repo-file handoff happens after required state persistence and cannot turn a committed Apply transaction into false `FAILED`.

**Primary traceability:**

- protocol: [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md);
- state: [`DATA-AND-STATE.md`](DATA-AND-STATE.md);
- mechanics: [`ARCHITECTURE.md`](ARCHITECTURE.md);
- Core: [`src/main/java/obs/rpkg/Core.java`](src/main/java/obs/rpkg/Core.java) (`registerRepository`, `applyPackage`, `applyAction`);
- hosts: [`src/main/java/obs/rpkg/Main.java`](src/main/java/obs/rpkg/Main.java), [`src/main/java/obs/rpkg/MainWindow.java`](src/main/java/obs/rpkg/MainWindow.java);
- automated: [`src/test/java/obs/rpkg/CoreTests.java`](src/test/java/obs/rpkg/CoreTests.java);
- manual: [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md#apply-and-rollback).

## 2. `UC-RPKG-REVIEW` — Inspect Current ChangeSet Review State

**Trigger/input:** successful Apply, selecting a persisted ChangeSet, or explicit Refresh Review.

**Successful result:** the user navigates ChangeSets by `changeSetLabel · status · short UUID` within the selected repository. A valid persisted `currentReview` can be reopened after application restart only after its canonical diff file and internal fingerprint are reverified. Refresh Review generates/persists a new cumulative `HEAD → working tree` diff scoped to ChangeSet-owned paths, including untracked adds, without changing `.git/index`. `Copy ReviewDiff` and `Open ReviewDiff` operate on that same integrity-verified canonical file.

**Finalize baseline boundary:** Copy/Open are optional inspection conveniences and never authorize or gate Finalize. The selected ChangeSet's persisted `currentReview` is the implicit Finalize baseline. Its SHA-256 is internal only and is not displayed/entered in the normal Swing/CLI flow. A later Apply or Refresh Review replaces the baseline.

**Boundary:** repo-stored review diff files are service artifacts, never ChangeSet-owned content and never Finalize staging targets.

**Primary traceability:**

- architecture: [`ARCHITECTURE.md`](ARCHITECTURE.md#5-canonical-reviewdiff);
- state: [`DATA-AND-STATE.md`](DATA-AND-STATE.md#6-reviewdiff-and-approval-identity);
- Core: [`src/main/java/obs/rpkg/Core.java`](src/main/java/obs/rpkg/Core.java) (`getChangeSets`, `currentReview`, `refreshReview`, `verifiedReviewDiffPath`, `copyReviewDiffToClipboard`, `publishReviewDiff`);
- Git boundary: [`src/main/java/obs/rpkg/GitClient.java`](src/main/java/obs/rpkg/GitClient.java);
- UI: [`src/main/java/obs/rpkg/MainWindow.java`](src/main/java/obs/rpkg/MainWindow.java);
- automated: [`src/test/java/obs/rpkg/CoreTests.java`](src/test/java/obs/rpkg/CoreTests.java).

## 3. `UC-RPKG-FINALIZE` — Finalize Reviewed ChangeSet

**Trigger/input:** selected Active ChangeSet and commit message; or Retry Push for `CommittedPendingPush`.

**Successful result:** Core requires the ChangeSet repository to remain registered, revalidates current origin, loads the persisted current ReviewDiff baseline, regenerates the canonical cumulative diff and requires exact internal fingerprint equality; requires clean real index; stages only ChangeSet-owned paths; verifies the staged diff against the same baseline; commits and pushes. Ownership is released only after successful push. No Open/Copy ReviewDiff action or user-supplied SHA is required.

**Push-failure result:** successful commit is preserved as `CommittedPendingPush` with commit SHA/branch; Retry Push pushes that existing commit and never creates a second commit.

**Primary traceability:**

- state: [`DATA-AND-STATE.md`](DATA-AND-STATE.md#7-lifecycle);
- mechanics: [`ARCHITECTURE.md`](ARCHITECTURE.md#7-finalize);
- Core: [`src/main/java/obs/rpkg/Core.java`](src/main/java/obs/rpkg/Core.java) (`finalizeChangeSet`, `retryPush`);
- hosts: [`src/main/java/obs/rpkg/Main.java`](src/main/java/obs/rpkg/Main.java), [`src/main/java/obs/rpkg/MainWindow.java`](src/main/java/obs/rpkg/MainWindow.java);
- automated: [`src/test/java/obs/rpkg/CoreTests.java`](src/test/java/obs/rpkg/CoreTests.java);
- manual: [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md#approval--finalize--push-recovery).

## 4. Command ↔ App Compatibility Matrix

| Producer contract | Consumer requirement |
|---|---|
| ZIP root `PACKAGE.json`, `base-files/`, `replacement-files/` | Java Core validates ZIP entries before target mutation. |
| `schemaVersion: 1` | Core accepts only package schema 1. |
| new UUID `packageId` per ZIP | attempt/package identity; action must match manifest exactly. |
| stable UUID `changeSetId` across corrections | ledger continuation identity; Swing may present short UUID only as a display suffix. |
| stable `changeSetLabel` | existing ChangeSet requires same label and Swing uses it as primary readable identity. |
| `repositoryIdentity = github:<owner>/<repo>` | package identity must match the currently selected **registered** local repository's revalidated origin identity. |
| add/replace/delete payload/base rules | exact preflight/result verification. |
| `OBS-ACTION action: apply-package` | only supported V0.1 action. |
| `archive` is hint | selected/resolved candidate is verified by manifest `packageId`. |
| operations absent from action | Core reads operations only from `PACKAGE.json`. |
| repository allowlist absent from action | repository registration/selection is consumer-only local configuration. |
| diff destination absent from action | local setting owns Clipboard / RepoDiffFile / Both. |
| producer stops after ZIP + action | local Java app owns repository registry/apply/history/review/finalize. |
| no Finalize action | selected ChangeSet + its persisted current ReviewDiff baseline + commit message drive Finalize; SHA-256 stays internal and Open/Copy ReviewDiff is not a prerequisite. |

Compatibility review fails if command materialized protocol, canonical protocol, Java parser/validation or tests disagree.
