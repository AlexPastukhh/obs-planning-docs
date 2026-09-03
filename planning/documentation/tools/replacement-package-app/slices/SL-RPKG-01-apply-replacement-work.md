# SL-RPKG-01 — Apply Replacement Work

Status: active current Slice owner with selected target evolution

## Current Result / Responsibility

Realize one validated replacement package against the exact current repository-work context. Current target-mode composition ensures Work Intent/workspace dependencies, applies exact package files, commits proven package paths and publishes the exact ChangeSet branch with retry/recovery by persisted proof. Legacy Apply remains supported.

## Current Scenario Behavior Realized

- `FI-RPKG-RESOLVE-CURRENT-REPOSITORY-WORK`
- `FI-RPKG-REALIZE-CURRENT-PACKAGE`
- current Apply/source/retry/partial-state BIs.

## Domain / Shared Capabilities Used

Repository Target; Work Intent; Repository Work / ChangeSet; `PACKAGE-PROTOCOL.md`.

## Slice Implementation Items — Current

### SI-RPKG-APPLY-JOURNAL-BEFORE-MUTATION

Persist exact package/base-head and prior/intended package-path evidence before target-mode package-file mutation.

### SI-RPKG-RETRY-BY-PROOF-NOT-RESTART

Retry proves established workspace/file/commit/remote side effects and continues from the latest proven boundary instead of blindly replaying the whole operation.

## Tests

Primary current proof: repository/integration cases in `CoreTests`.

## Evolution Impact

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW

Target FI:
`FI-RPKG-REALIZE-REVIEWED-PACKAGE`.

The Slice must consume the exact Builder-reviewed package plus exact existing repository-work context.

Target route composition reuses the same modular mechanics:

```text
Apply Only
→ Apply
→ STOP AppliedUncommitted

Apply And Publish
→ Apply
→ Commit
→ Push/Publish
→ automatically continue to Confirm Reviewed Published Revision
→ STOP ReviewedPublished

Apply And Finalize
→ same Apply/Commit/Push
→ later Confirm + PR + Finalize
```

The target App must not create a second independent repository-work Issue/branch merely because the reviewed package is applied.

When Commit is included in the automatic handoff route, the authorized commit message comes from the handoff and must survive retry. When Commit is invoked manually, the same Commit behavior receives user-entered message text from the UI.

Existing current Apply/Commit/Publish mechanics should evolve/reuse rather than be reimplemented as a separate “non-modular” engine.

Target modular rule:
A successful manual Push/Publish of reviewed work automatically proceeds to reviewed-result confirmation; ordinary modular continuation does not require a separate user Verify button.
