# SL-RPKG-03 — Finalize And Publish Work

Status: active current Slice owner with planned evolution impact

## Current Result / Responsibility

Finalize legacy ChangeSet work from a fresh exact Current Change, publish it, preserve Publication Pending after local success/remote failure, and explicitly/guardedly Reopen finalized legacy work.

The planned target Finalize behavior affects this current Slice's migration, but future Slice ownership is not selected here.

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

Canonical target behavior includes:
- `FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST`;
- `FI-RPKG-FINALIZE-REVIEWED-WORK`;
- automatic/manual Finalize semantic-input parity;
- immutable `## Final Work Record` persistence before Issue closure;
- truthful recovery across PR/integration/final-comment/Issue-close side effects.

This current Slice is affected because it owns legacy Finalize/publication recovery mechanics and may provide reusable implementation lessons or components.

The Evolution Impact does **not** select `SL-RPKG-03` as the target owner of PR creation, reviewed-result integration, Final Work Record reconciliation or Issue closure.

Target Slice decomposition and any future `SI-*` constraints remain **TBD** until Domain and Slice realization planning selects the correct consistency and implementation boundaries.

Legacy semantics remain current until legacy work retires.
