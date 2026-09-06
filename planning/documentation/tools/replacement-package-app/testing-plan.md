# Replacement Package App — Test Strategy

Status: active target strategy

Tests prove selected behavior; they do not define it.

## Target automated gates

### WorkAggregateTests
Prove:
- WorkId/RepositoryTarget/GitWorkspace shapes;
- exact archive identity requirement;
- ReplacementPackageState publication semantics;
- same-commit evidence preservation;
- exact persisted-key fencing;
- per-Work lock serialization across independent repository instances;
- one unfinished package under concurrency;
- no legacy package-state import.

### ApplyReplacementPackageFeatureIntegrationTests
Prove end-to-end application-service boundaries with real Git where practical:
- Start Workspace persists GitWorkspace and creates no Core.ChangeSet;
- package ZIP is captured once; later path replacement cannot change applied bytes/identity;
- Apply state-write recovery via durable package journal;
- Commit is separate and recovers exact existing commit after state-write failure;
- Publish confirms exact remote tip without ChangeSet authority;
- pre-push NotConfirmed persistence failure blocks push;
- post-push final-state persistence failure leaves durable NotConfirmed;
- uncertain Retry confirms before another push;
- unexpected remote tip fails before push;
- sequential packages derive previous tip from package journal;
- workspace creation recovers after state persistence failure;
- automatic OBS action composes Start → Apply → Commit → Publish and is idempotent.

### ApplyReceiptTests
Prove schema-1 result formatting remains stable. `status: applied` is top-level handoff only after automatic publication proof.

### WindowsLauncherInstallerTests
Keep launcher packaging mechanics proof while the launcher remains part of distributable application operation.

## Legacy tests

`CoreTests`, `ChatBridgeTests` and DOM bridge regressions belong to the previous legacy executable/source behavior and are intentionally removed from the target build gate. Their failure is not target regression unless a current target owner explicitly re-adopts that capability.

## Practical acceptance

See `MANUAL-ACCEPTANCE.md` for real filesystem/Git/remote/UI checks. GitHub status checks are separate evidence and must not be inferred from local test success.
