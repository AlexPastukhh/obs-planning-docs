# SCN-RPKG-APPLY — Apply Verified Replacement Package

Status: active current behavior owner
Scope: detailed application behavior and traceability for `UC-RPKG-APPLY`.

Related Application Use Case: [`UC-RPKG-APPLY`](../USE-CASE-REGISTRY.md)

**Trigger/input:** user supplies an `OBS-ACTION/1` and/or explicitly selected ZIP plus a selected repository from the local allowed-repository registry.

**Successful result:** the selected local repository is revalidated against its registered path/origin identity; package/repository/path/base validation completes before mutation; add/replace/delete result bytes are verified; one successful ApplicationAttempt is persisted; ChangeSet ownership is updated; a new cumulative ReviewDiff becomes current and the readable ChangeSet entry becomes selectable without manual UUID entry.

**Failure result:** unregistered repository paths, origin drift and other preflight failures do not mutate targets. Mutation failures use bounded verified rollback; inability to verify rollback becomes `STATE_DIVERGED`. Clipboard/repo-file handoff happens after required state persistence and cannot turn a committed Apply transaction into false `FAILED`.

**Primary traceability:**

- protocol: [`PACKAGE-PROTOCOL.md`](../PACKAGE-PROTOCOL.md);
- state: [`DATA-AND-STATE.md`](../DATA-AND-STATE.md);
- mechanics: [`ARCHITECTURE.md`](../ARCHITECTURE.md);
- Core: [`src/main/java/obs/rpkg/Core.java`](../src/main/java/obs/rpkg/Core.java) (`registerRepository`, `applyPackage`, `applyAction`);
- hosts: [`src/main/java/obs/rpkg/Main.java`](../src/main/java/obs/rpkg/Main.java), [`src/main/java/obs/rpkg/MainWindow.java`](../src/main/java/obs/rpkg/MainWindow.java);
- automated: [`src/test/java/obs/rpkg/CoreTests.java`](../src/test/java/obs/rpkg/CoreTests.java);
- manual: [`MANUAL-ACCEPTANCE.md`](../MANUAL-ACCEPTANCE.md#apply-and-rollback).
