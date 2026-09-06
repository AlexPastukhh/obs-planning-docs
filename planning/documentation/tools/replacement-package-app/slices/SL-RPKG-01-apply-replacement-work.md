# SL-RPKG-01 — Replacement Package Realization

Status: active current Slice owner

## Result / Responsibility

Realize one exact replacement package through explicit application operations:

```text
Apply Package
Commit applied
Publish
Retry Publish
```

The operations share durable `ReplacementPackageState`, `GitWorkspace`, package journals and one per-Work serialization boundary, while retaining independent operation Results. Automatic `OBS-ACTION apply-package` composes Start workspace → Apply → Commit → Publish as Scenario/entry convenience.

## Slice Implementation Items

### SI-RPKG-CAPTURE-PACKAGE-ONCE
The invocation validates/hashes the ZIP once and mutation consumes those captured bytes. A mutable archive path is never reread as later mutation authority.

### SI-RPKG-APPLY-JOURNAL-BEFORE-MUTATION
Persist exact package/workspace/base plus prior/intended bytes before first package-file mutation. A schema-3 journal begins with `applicabilityProven=false`; it may not restore bytes and retry requires the captured prior state to remain exact. Only successful applicability proof promotes it to recovery authority. Digest integrity and captured-package byte binding are checked independently.

### SI-RPKG-PACKAGE-STATE-DURABLE
Package state identity is fenced to exact WorkId/packageId. Corrupt/unreadable state fails closed.

### SI-RPKG-WORK-OPERATION-LOCK
Start workspace / Apply / Commit / Publish for one Work serialize through a dedicated same-thread re-entrant `WorkOperationLock` application port; package-state persistence is not the semantic lock owner and lock failure is an operation failure, not state evidence.

### SI-RPKG-PUBLISH-CONFIRM-BEFORE-SIDE-EFFECT
Every not-yet-published Publish invocation observes through a verified isolated fetch transport endpoint before a possible push; any possible push uses a separately verified isolated push transport endpoint. Unexpected tip or foreign destination fails before push. Registered-repository remote aliases and Git `url.*.insteadOf` / `pushInsteadOf` rewrites are not consulted by the actual network command after endpoint capture. Durable `NotConfirmed` guards the possible-push boundary.

### SI-RPKG-ISOLATED-GIT-TRANSPORT
Shared implementation capability owns GitHub RepositoryIdentity normalization plus isolated fetch / remote observation / push execution. It snapshots only permitted transport/authentication config, excludes URL-rewrite rules from the network execution environment and moves Git objects across the isolation boundary only through local bundle/unbundle mechanics.

### SI-RPKG-NO-LEGACY-RUNTIME-AUTHORITY
Target package realization does not read/write `Core.ChangeSet.executionState`, `lastPackageId`, `commitSha` or `publishedTip`. Old persisted works are not imported.

## Tests

Target Feature/Scenario integration proves file-only Apply, separate/recoverable Commit, exact Publish, no blind retry, persistence failure fences, unexpected-tip rejection, sequential packages, workspace recovery, automatic composition and idempotence without creating `Core.ChangeSet`.
