# SL-RPKG-03 — Finalize And Publish Work

Status: active current Slice owner

## Result / Responsibility

Finalize legacy ChangeSet work from a fresh exact Current Change, publish it, preserve Publication Pending after local success/remote failure, and explicitly/guardedly Reopen finalized legacy work.

The planned target Scenario also has a Finalize FI, but name adjacency does not assign that future reviewed-result integration responsibility to this legacy Slice.

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


Candidate impact / ownership gate:
Target Finalize authority moves away from legacy ReviewDiff/Path Ownership semantics to reviewed-result/integration identity. Existing legacy semantics remain until retirement and must not be silently reused. The target Finalize implementation owner is intentionally TBD: downstream Requirements Discovery may evolve this Slice, create a different Slice/shared capability, or place durable invariants in a Domain owner.
