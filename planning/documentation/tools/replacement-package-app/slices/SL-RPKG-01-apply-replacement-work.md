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
Persist exact package/workspace/base plus prior/intended bytes before first package-file mutation. Journal identity includes archive SHA, and recovery verifies intended bytes still equal the captured exact package payload.

### SI-RPKG-PACKAGE-STATE-DURABLE
Package state identity is fenced to exact WorkId/packageId. Corrupt/unreadable state fails closed.

### SI-RPKG-WORK-OPERATION-LOCK
Start workspace / Apply / Commit / Publish for one Work serialize through a dedicated `WorkOperationLock` application port; package-state persistence is not the semantic lock owner.

### SI-RPKG-PUBLISH-CONFIRM-BEFORE-SIDE-EFFECT
Every not-yet-published Publish invocation refreshes exact remote observation before a possible push; unexpected tip or foreign effective push destination fails before push. Durable `NotConfirmed` guards the possible-push boundary.

### SI-RPKG-NO-LEGACY-RUNTIME-AUTHORITY
Target package realization does not read/write `Core.ChangeSet.executionState`, `lastPackageId`, `commitSha` or `publishedTip`. Old persisted works are not imported.

## Tests

Target Feature/Scenario integration proves file-only Apply, separate/recoverable Commit, exact Publish, no blind retry, persistence failure fences, unexpected-tip rejection, sequential packages, workspace recovery, automatic composition and idempotence without creating `Core.ChangeSet`.
