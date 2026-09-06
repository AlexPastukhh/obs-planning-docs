# Replacement Package App — Test Strategy

Status: active target strategy

Tests prove selected behavior; they do not define it.

## Target automated gates

### WorkAggregateTests
Prove:
- WorkId/RepositoryTarget/GitWorkspace shapes and shared Git transport RepositoryIdentity normalization;
- exact archive identity requirement;
- ReplacementPackageState publication semantics;
- same-commit evidence preservation;
- exact persisted-key fencing;
- per-Work `WorkOperationLock` serialization across independent lock instances/processes and same-thread re-entrancy;
- one unfinished package under concurrency;
- no legacy package-state import.

### PackageProtocolTests
Prove active schema-1 consumer rules without legacy ChangeSet behavior: valid add/replace/delete payload shape, traversal/absolute-path rejection, case collisions, undeclared payload rejection, action payload requirements, ZIP-entry collisions and Work Intent identity consistency.

### PackageApplicabilityTests
Prove file applicability at the target Apply boundary: exact add/replace/delete, Git-equivalent source acceptance, binary divergence fail-closed behavior, add-target absence, clean-filter unverifiable failure, and exact retries that cannot promote previously failed add/delete/replace into Applied state or restore externally changed bytes from an unproven journal.

### ApplyReplacementPackageFeatureIntegrationTests
Prove end-to-end application-service boundaries with real Git where practical:
- Start Workspace captures/verifies the exact target transport endpoint, cannot be redirected by later origin or `insteadOf` mutation, persists GitWorkspace and creates no Core.ChangeSet;
- package ZIP is captured once; later path replacement cannot change applied bytes/identity;
- Apply state-write recovery via schema-3 proven journal, independent digest-corruption and captured-payload-binding rejection, previous-journal-schema fail-closed behavior, and package RepositoryIdentity fencing;
- Commit is separate and recovers exact existing commit after state-write failure;
- Publish confirms exact remote tip without ChangeSet authority;
- pre-push NotConfirmed persistence failure blocks push;
- post-push final-state persistence failure leaves durable NotConfirmed;
- uncertain Retry confirms before another push;
- unexpected remote tip and foreign effective origin push URL fail before push; isolated fetch/observation/push endpoints cannot be redirected by later remote-alias, `insteadOf` or `pushInsteadOf` mutation; repository mismatch remains an operation failure rather than false state divergence;
- every not-yet-published Publish invocation refreshes remote observation before any possible push;
- sequential packages derive previous tip from package journal;
- workspace creation recovers after state persistence failure and conflicting leftover journals fail closed;
- Work lock acquisition failure is operation-local rather than false state divergence;
- automatic OBS action composes Start → Apply → Commit → Publish and is idempotent.

### ApplyReceiptTests
Prove schema-1 result formatting remains stable. `status: applied` is top-level handoff only after automatic publication proof.

### WindowsLauncherInstallerTests
Keep launcher packaging mechanics proof while the launcher remains part of distributable application operation.

## Legacy tests

`CoreTests`, `ChatBridgeTests` and DOM bridge regressions belong to the previous legacy executable/source behavior and are intentionally removed from the target build gate. Target-critical package protocol/applicability cases formerly living in `CoreTests` are re-owned by `PackageProtocolTests` and `PackageApplicabilityTests`; legacy UI/chat cases are not.

## Practical acceptance

See `MANUAL-ACCEPTANCE.md` for real filesystem/Git/remote/UI checks. GitHub status checks are separate evidence and must not be inferred from local test success.
