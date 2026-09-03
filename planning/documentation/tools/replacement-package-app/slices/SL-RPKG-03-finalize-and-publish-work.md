# SL-RPKG-03 — Finalize And Publish Work

Status: active current Slice owner with selected target evolution

## Current Result / Responsibility

Finalize legacy ChangeSet work from a fresh exact Current Change, publish it, preserve Publication Pending after local success/remote failure, and explicitly/guardedly Reopen finalized legacy work.

Selected target Finalize behavior below is not current Slice responsibility.

## Current Scenario Behavior Realized

- `FI-RPKG-FINALIZE-LEGACY-CURRENT-WORK`
- current legacy Finalize/publication/reopen BIs.

## Domain Used

Repository Work / ChangeSet; Repository Target.

## Slice Implementation Items — Current

### SI-RPKG-LEGACY-FINALIZE-OWNED-STAGING

Legacy Finalize stages only authoritative owned paths after freshness proof.

## Tests

Current responsibility: `CoreTests` for legacy review freshness, owned staging, commit/push recovery and guarded Reopen.

## Evolution Impact

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW

Target Scenario FIs:
- `FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST`
- `FI-RPKG-FINALIZE-REVIEWED-WORK`.

Target Finalize is entered only from a proven `ReviewedPublished` work result and is composed by either:
- the full reviewed handoff route; or
- the manual `Finalize` control.

Automatic Finalize receives PR semantic text and final Issue semantic text from the handoff. Manual Finalize obtains equivalent semantic input from UI.

Target responsibilities include:
- ensure one correct workBranch → persisted targetBranch PR;
- preserve the reviewed work result through integration;
- persist/reconcile one immutable Issue comment headed `## Final Work Record`;
- bind exact package/result/published revision/PR/integration facts from proven App state;
- close the Issue only after required final record persistence;
- resume truthful partial finalization without blind re-integration or ambiguous duplicate final comments.

Detailed iterative Review Records remain Builder-side Issue comments and are not rewritten by Finalize.

This is future Slice delta, not a current `SI-*` requirement. Legacy semantics remain until legacy work retires.
