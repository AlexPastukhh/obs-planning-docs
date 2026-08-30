# Replacement Package Common

Status: shared deterministic apply core

`replacement-package-common` contains mechanics that must stay identical when a validated replacement package is applied to different exact file-state workspaces.

## PackageStateApplier

`PackageStateApplier` owns only deterministic file-state mechanics:

```text
validated operations + resolved target paths + source verifier
→ preflight/capture exact prior bytes
→ add / replace / delete
→ verify exact resulting state
→ commit or exact rollback
```

The caller remains responsible for package parsing, repository/path authority, ChangeSet lifecycle and ownership, Git-aware source equivalence, UI/state persistence and review delivery.

`SourceVerifier` is deliberately injected. Replacement Package App supplies its current Git path-aware expected-source verification. A future exact-state replay caller can instead require raw byte equality without duplicating mutation and rollback semantics.

An applied change is transactional until `commit()` is called. Closing an uncommitted change rolls affected paths back and verifies the restored bytes/absence.

## Build and tests

```bat
build.cmd
run-tests.cmd
```

The build produces `build\replacement-package-common.jar`. The tests cover mixed add/replace/delete, exact binary preservation, commit, automatic rollback, preflight atomicity and source-verifier rejection.
