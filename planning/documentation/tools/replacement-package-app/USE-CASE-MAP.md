# Replacement Package App Use-Case Map

Status: active V0.1 behavior and traceability map
Scope: trigger → result → boundary for the Replacement Package App and exact links to primary docs/source/tests.

Canonical identities: [`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md)
Shared protocol: [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md)

## 1. `UC-RPKG-APPLY` — Apply Verified Replacement Package

**Trigger/input:** user supplies an `OBS-ACTION/1` and/or explicitly selected ZIP plus configured local repository root.

**Successful result:** package/repository/path/base validation completes before mutation; add/replace/delete result bytes are verified; one successful ApplicationAttempt is persisted; ChangeSet ownership is updated; a new cumulative ReviewDiff becomes current.

**Failure result:** preflight failures do not mutate targets. Mutation failures use bounded verified rollback; inability to verify rollback becomes `STATE_DIVERGED`. Clipboard/repo-file handoff happens after required state persistence and cannot turn a committed Apply transaction into false `FAILED`.

**Primary traceability:**

- protocol: [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md);
- state: [`DATA-AND-STATE.md`](DATA-AND-STATE.md);
- mechanics: [`ARCHITECTURE.md`](ARCHITECTURE.md);
- Core: [`src/main/java/obs/rpkg/Core.java`](src/main/java/obs/rpkg/Core.java) (`applyPackage`, `applyAction`);
- hosts: [`src/main/java/obs/rpkg/Main.java`](src/main/java/obs/rpkg/Main.java), [`src/main/java/obs/rpkg/MainWindow.java`](src/main/java/obs/rpkg/MainWindow.java);
- automated: [`src/test/java/obs/rpkg/CoreTests.java`](src/test/java/obs/rpkg/CoreTests.java);
- manual: [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md#apply-and-rollback).

## 2. `UC-RPKG-REVIEW` — Inspect Current ChangeSet Review State

**Trigger/input:** successful Apply or explicit refresh/open of an active ChangeSet.

**Successful result:** one canonical cumulative diff is generated from current `HEAD` to current working-tree content, scoped to ChangeSet-owned paths, including untracked adds, without changing `.git/index`; exact diff bytes receive SHA-256 and may be copied/saved according to local settings.

**Boundary:** repo-stored review diff files are service artifacts, never ChangeSet-owned content and never Finalize staging targets.

**Primary traceability:**

- architecture: [`ARCHITECTURE.md`](ARCHITECTURE.md#5-canonical-reviewdiff);
- state: [`DATA-AND-STATE.md`](DATA-AND-STATE.md#6-reviewdiff-and-approval-identity);
- Core: [`src/main/java/obs/rpkg/Core.java`](src/main/java/obs/rpkg/Core.java) (`newReviewDiff`, `publishReviewDiff`);
- Git boundary: [`src/main/java/obs/rpkg/GitClient.java`](src/main/java/obs/rpkg/GitClient.java);
- UI: [`src/main/java/obs/rpkg/MainWindow.java`](src/main/java/obs/rpkg/MainWindow.java);
- automated: [`src/test/java/obs/rpkg/CoreTests.java`](src/test/java/obs/rpkg/CoreTests.java).

## 3. `UC-RPKG-FINALIZE` — Finalize Reviewed ChangeSet

**Trigger/input:** active ChangeSet ID, exact reviewed `ReviewedDiffSha256`, commit message; or Retry Push for `CommittedPendingPush`.

**Successful result:** Core regenerates the canonical cumulative diff and requires hash equality; requires clean real index; stages only ChangeSet-owned paths; verifies staged diff hash; commits and pushes. Ownership is released only after successful push.

**Push-failure result:** successful commit is preserved as `CommittedPendingPush` with commit SHA/branch; Retry Push pushes that existing commit and never creates a second commit.

**Primary traceability:**

- state: [`DATA-AND-STATE.md`](DATA-AND-STATE.md#7-lifecycle);
- mechanics: [`ARCHITECTURE.md`](ARCHITECTURE.md#7-finalize);
- Core: [`src/main/java/obs/rpkg/Core.java`](src/main/java/obs/rpkg/Core.java) (`finalizeChangeSet`, `retryPush`);
- hosts: [`src/main/java/obs/rpkg/Main.java`](src/main/java/obs/rpkg/Main.java), [`src/main/java/obs/rpkg/MainWindow.java`](src/main/java/obs/rpkg/MainWindow.java);
- automated: [`src/test/java/obs/rpkg/CoreTests.java`](src/test/java/obs/rpkg/CoreTests.java);
- manual: [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md#finalize-and-push-recovery).

## 4. Command ↔ App Compatibility Matrix

| Producer contract | Consumer requirement |
|---|---|
| ZIP root `PACKAGE.json`, `base-files/`, `replacement-files/` | Java Core validates ZIP entries before target mutation. |
| `schemaVersion: 1` | Core accepts only schema 1. |
| new UUID `packageId` per ZIP | attempt/package identity; action must match manifest exactly. |
| stable UUID `changeSetId` across corrections | ledger continuation identity. |
| stable `changeSetLabel` | existing ChangeSet requires same label. |
| `repositoryIdentity = github:<owner>/<repo>` | compare against configured repository raw `remote.origin.url`, case-insensitive owner/repo. |
| add/replace/delete payload/base rules | exact preflight/result verification. |
| `OBS-ACTION action: apply-package` | only supported V0.1 action. |
| `archive` is hint | selected/resolved candidate is verified by manifest `packageId`. |
| operations absent from action | Core reads operations only from `PACKAGE.json`. |
| diff destination absent from action | local setting owns Clipboard / RepoDiffFile / Both. |
| producer stops after ZIP + action | local Java app owns apply/history/review/finalize. |
| no Finalize action | local `ReviewedDiffSha256` + commit message authorizes Finalize. |

Compatibility review fails if command materialized protocol, canonical protocol, Java parser/validation or tests disagree.
