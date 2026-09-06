# F-RPKG-COMMIT-APPLIED-PACKAGE — Commit Applied Package

## Intent

Create or prove the exact local Git commit for a durably Applied replacement package.

## Principal Result

`Result<ReplacementPackageState, CommitAppliedFailure>`

Success returns the package state with exact `commitSha`. Commit is independent from Publish.

## Expected application behavior

| Behavior step | Requirement |
|---|---|
| Load exact owners | Require the Work's persisted `GitWorkspace` and exact `ReplacementPackageState`. |
| Re-prove package realization | Durable package journal must match WorkId, packageId, archive SHA, worktree, derived branch and exact intended file state. |
| Commit only intended package paths | Unrelated staged/dirty work fails closed; commit carries exact Package-Id and schema-1 ChangeSet-Id/WorkId trailer. |
| Recover exact commit | If commit creation succeeded before package-state persistence, retry proves exact branch HEAD, parent, trailers, changed paths and bytes, then reuses that commit. |
| Persist commit fact | Exact commit SHA is stored in `ReplacementPackageState`; re-proving the same commit preserves publication evidence. |

## Boundary decision

Commit Applied does not Publish and does not dispatch from legacy `AppliedUncommitted/CommittedUnpublished` states. `Core.ChangeSet` is not runtime authority for this Feature.
