# SL-RPKG-03 — Finalize And Publish Work

Status: active current Slice owner

## Result / Responsibility

Finalize legacy ChangeSet work from a fresh exact Current Change, publish it, preserve Publication Pending after local success/remote failure, and explicitly/guardedly Reopen finalized legacy work.

Selected future Finalize behavior is described only in `Evolution Impact` below; it is not current Slice responsibility.

## Scenario behavior realized

Current FI:
- `FI-RPKG-FINALIZE-LEGACY-CURRENT-WORK`

Current BIs:
- `BI-RPKG-CURRENT-FINALIZE-REQUIRES-FRESH-REVIEW`
- `BI-RPKG-CURRENT-FINALIZE-OWNED-ONLY`
- `BI-RPKG-CURRENT-PUBLICATION-FAILURE-PRESERVES-WORK`
- `BI-RPKG-CURRENT-REOPEN-EXPLICIT`

## Domain used

Repository Work / ChangeSet; Repository Target.

## Slice Implementation Items

### SI-RPKG-LEGACY-FINALIZE-OWNED-STAGING — Stage only authoritative legacy ownership
Requirement:
Legacy Finalize staging must be constrained to the exact current ChangeSet-owned paths after freshness proof.

## Tests

Current responsibility: `CoreTests` for review-baseline freshness, owned-only staging, commit/push/Publication Pending recovery and all-or-nothing Reopen ownership reacquisition.

## Evolution Impact

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW
Canonical Scenario step:
[`EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW`](../scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#evo-rpkg-adopt-reviewed-result-workflow)

Target BI references:
- `BI-RPKG-FINALIZE-ONLY-APPROVED-PUBLISHED-REVISION`
- `BI-RPKG-FINALIZE-PRESERVES-REVIEWED-CONTENT`
- `BI-RPKG-TARGET-MOVEMENT-NOT-AUTOMATIC-STALE`
- `BI-RPKG-CONTENT-CHANGING-RECONCILIATION-STALES-APPROVAL`
- `BI-RPKG-FINALIZED-WORK-IS-CLOSED`

Forced Migration:
Target Finalize authority moves from legacy ReviewDiff/Path Ownership to reviewed published-result/PR/integration identity. Future Finalize/reconciliation must preserve the reviewed result identity or explicitly stale approval before a content-changing integration result can be accepted. This is future Slice delta, not a current `SI-*` requirement. Existing legacy semantics remain until legacy work is retired; they must not be silently reused for target work.
