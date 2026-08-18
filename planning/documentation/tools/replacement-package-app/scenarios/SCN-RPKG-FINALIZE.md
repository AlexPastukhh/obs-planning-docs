# SCN-RPKG-FINALIZE — Finalize Current ChangeSet

Status: active current behavior owner
Scope: detailed application behavior and traceability for `UC-RPKG-FINALIZE`.

Related Application Use Case: [`UC-RPKG-FINALIZE`](../USE-CASE-REGISTRY.md)

**Trigger/input:** selected Active ChangeSet and commit message; or Retry Push for `CommittedPendingPush`.

**Semantic-approval boundary:** Finalize is an explicit user/application action over an integrity-verified technical ReviewDiff baseline. The application does not persist or infer an AI semantic-approval flag; semantic correctness review is a separate `UC-DOC-REVIEW-DIFF` responsibility.

**Successful result:** Core requires the ChangeSet repository to remain registered, revalidates current origin, loads the persisted current ReviewDiff baseline, regenerates the canonical cumulative diff and requires exact internal fingerprint equality; requires clean real index; stages only ChangeSet-owned paths; verifies the staged diff against the same baseline; commits and pushes. Ownership is released only after successful push. No Open/Copy ReviewDiff action or user-supplied SHA is required.

**Push-failure result:** successful commit is preserved as `CommittedPendingPush` with commit SHA/branch; Retry Push pushes that existing commit and never creates a second commit.

**Primary traceability:**

- state: [`DATA-AND-STATE.md`](../DATA-AND-STATE.md#7-lifecycle);
- mechanics: [`ARCHITECTURE.md`](../ARCHITECTURE.md#7-finalize);
- Core: [`src/main/java/obs/rpkg/Core.java`](../src/main/java/obs/rpkg/Core.java) (`finalizeChangeSet`, `retryPush`);
- hosts: [`src/main/java/obs/rpkg/Main.java`](../src/main/java/obs/rpkg/Main.java), [`src/main/java/obs/rpkg/MainWindow.java`](../src/main/java/obs/rpkg/MainWindow.java);
- automated: [`src/test/java/obs/rpkg/CoreTests.java`](../src/test/java/obs/rpkg/CoreTests.java);
- manual: [`MANUAL-ACCEPTANCE.md`](../MANUAL-ACCEPTANCE.md#finalize--implicit-review-baseline--push-recovery).
