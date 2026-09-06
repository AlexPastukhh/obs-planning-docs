# F-RPKG-APPLY-REPLACEMENT-PACKAGE — Apply Replacement Package

## Intent

Apply the exact validated replacement-package file result to the persisted GitWorkspace for one Work, without Commit or Publish.

## Principal Result

`Result<ReplacementPackageState, ApplyFailure>`

Success means exact package bytes are established in the Work worktree and the exact package identity is durably recorded. State existence is the proof of Apply.

## Expected application behavior

| Behavior step | Requirement |
|---|---|
| Read package once | The supplied ZIP is opened/validated/hashed once for the invocation; mutation consumes the captured `PackageData` bytes rather than reopening the mutable archive path. |
| Resolve exact Work workspace | Apply requires persisted `GitWorkspace` for the same WorkId. |
| Enforce package continuity | Same `packageId` is idempotent only for the same exact archive SHA; a different unfinished package blocks a new Apply. |
| Prove applicability before mutation | Replace/delete require exact expected source; add requires required absence; no undeclared payload is applied. |
| Journal before mutation | Durable package journal captures exact package/workspace/base and prior/intended bytes before first file mutation. |
| Persist exact state | After intended bytes are proven, persist `ReplacementPackageState(WorkId, packageIdentity, no commit, NotRequested)`. |

If file effects completed but package-state persistence failed, repeating the exact package recovers from the durable package journal and persists the same state without rereading/reapplying different archive bytes.

## Boundary decision

Apply is file realization only. It does not Commit, Publish, Finalize, use `ApplyExtent`, or consult `Core.ChangeSet.executionState`. Automatic `OBS-ACTION apply-package` may compose this Feature with Start workspace, Commit and Publish at the Scenario/entry boundary.
