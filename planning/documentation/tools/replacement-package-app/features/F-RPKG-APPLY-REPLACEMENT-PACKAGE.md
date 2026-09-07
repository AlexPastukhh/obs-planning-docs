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
| Resolve exact Work workspace | Apply requires persisted `GitWorkspace` for the same WorkId and requires package `repositoryIdentity` to equal that workspace Repository Target identity. |
| Enforce package continuity | Same `packageId` is idempotent only for the same exact archive SHA; a different unfinished package blocks a new Apply. |
| Prove applicability before mutation | Replace/delete require exact expected source; add requires required absence; no undeclared payload is applied. |
| Journal before mutation | Durable schema-3 journal captures exact package/workspace/base and prior/intended bytes before first file mutation. It starts unproven; retry may only re-prove against unchanged captured prior bytes and may not restore from that journal. Only successful applicability proof durably sets `applicabilityProven=true`, after which it may serve as recovery authority. Digest integrity and captured-`PackageData` byte binding are independent checks. |
| Persist exact state | After intended bytes are proven, persist `ReplacementPackageState(WorkId, packageIdentity, no commit, NotRequested)`. |

If file effects completed after a proven journal but package-state persistence failed, repeating the exact package recovers from that durable proof and persists the same state without rereading different archive bytes. If applicability failed before promotion, retry must prove applicability again and cannot convert matching prior/intended bytes into success.

## Boundary decision

Apply is file realization only. It does not Commit, Publish, Finalize, use `ApplyExtent`, or consult `Core.ChangeSet.executionState`. Automatic `OBS-ACTION apply-package` may compose this Feature with Start workspace, Commit and Publish at the Scenario/entry boundary.
