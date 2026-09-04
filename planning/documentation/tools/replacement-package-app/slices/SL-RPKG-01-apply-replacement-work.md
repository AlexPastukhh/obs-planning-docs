# SL-RPKG-01 — Apply Replacement Work

Status: active current Slice owner

## Result / Responsibility

Realize one validated replacement package against the exact repository-work context. Current target-mode composition ensures Work Intent/workspace dependencies, applies exact package files, commits only proven package paths and publishes the exact ChangeSet branch with retry/recovery by persisted proof. Legacy Apply remains supported for already-existing legacy work.

## Scenario behavior realized

Feature Interaction context:
- `FI-RPKG-RESOLVE-CURRENT-REPOSITORY-WORK`
- `FI-RPKG-REALIZE-CURRENT-PACKAGE`

Behavior Items realized:
- `BI-RPKG-CURRENT-PREFLIGHT-BEFORE-MUTATION`
- `BI-RPKG-CURRENT-APPLY-EXACT-PACKAGE`
- `BI-RPKG-CURRENT-APPLY-EXACT-SOURCE`
- `BI-RPKG-CURRENT-GIT-RETRY-RESUMES`
- `BI-RPKG-CURRENT-PARTIAL-STATE-TRUTHFUL`
- `BI-RPKG-CURRENT-PUBLICATION-UNCERTAIN-BLOCKS-NEXT`
- `BI-RPKG-CURRENT-LEGACY-OWNERSHIP-PROTECTS-UNRELATED-WORK`

## Domain / Shared capabilities used

- Repository Target
- Work Intent
- Repository Work / ChangeSet
- package contract in `PACKAGE-PROTOCOL.md`

## Slice Implementation Items

### SI-RPKG-APPLY-JOURNAL-BEFORE-MUTATION — Persist exact recovery evidence first
Requirement:
Before the first target-mode package-file mutation, persist exact package/base-head identity plus exact prior/intended package-path state sufficient to prove or recover the same operation.

Reason:
Interruption must be recoverable without guessing whether individual file side effects occurred.

Derived from:
`BI-RPKG-CURRENT-GIT-RETRY-RESUMES`, `BI-RPKG-CURRENT-PARTIAL-STATE-TRUTHFUL`.

### SI-RPKG-RETRY-BY-PROOF-NOT-RESTART — Resume from proven execution state
Requirement:
Retry must prove established workspace/file/commit/remote side effects and continue from the latest proven boundary instead of blindly re-running the whole operation.

Reason:
Apply, commit and push cross durable/externally visible boundaries.

## Tests

Primary current proof responsibility: repository/integration cases in `CoreTests` using real disposable Git repositories/remotes where file/index/commit/remote semantics matter.

### Test Items

#### TST-RPKG-APPLY-NO-MUTATION-ON-PREFLIGHT-FAILURE
Requirement:
Negative applicability/identity/ownership tests must assert that repository state remains unchanged when failure is required before mutation.

Reason:
A thrown error alone does not prove the fail-closed boundary.

#### TST-RPKG-APPLY-RECOVERY-PROVES-SIDE-EFFECTS
Requirement:
Crash/retry cases must establish both the persisted state and the real filesystem/Git/remote side effect used to justify resume.

## Evolution Impact

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW
Candidate impact:
The planned Scenario still needs exact package realization and resumable Apply/Commit/Publish behavior, so this current Slice is a natural reuse candidate. Reviewed-result confirmation or route-specific responsibilities are **not** assigned here by the Scenario; downstream Requirements Discovery decides whether they create new `SI-*` Items here, another Slice, Shared capability or Domain requirement.
