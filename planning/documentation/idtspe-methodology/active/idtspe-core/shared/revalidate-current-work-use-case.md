# UC-IDTSPE-REVALIDATE-CURRENT-WORK — Revalidate Current IDTSPE Work

Status: active IDTSPE runtime Use Case

## Situation

Existing working/accepted meaning may no longer be reliable because a Finding, Evidence, accepted upstream change, source/authority change, USER redirect, implementation discovery, methodology change or explicit consistency concern affects its assumptions/relations/consumers.

## Result

The narrowest affected meaning and methodology-use surface are rechecked; stale/dependent work is invalidated/reopened only where warranted; unaffected accepted meaning remains stable; and a precise re-entry/next methodology route is known.

## Process

1. Identify the concrete change/finding/evidence/review request and the earliest semantic owner/assumption it can affect.
2. Use Core Finding Disposition when the trigger is a Finding Candidate; do not let a Lens decide lifecycle by itself.
3. Run the [`Consistency Review Process`](consistency-review-use-case.md) when cross-owner/projection drift is plausible.
4. Re-evaluate affected Use Cases through the Use-Case Registry Map if the methodology-use situation itself changed.
5. Re-evaluate only affected registry/component applicability. Preserve current scans/components whose recheck conditions did not change.
6. Reopen/revise Target Result or State meaning through its normal owner/lifecycle. Do not patch a downstream implementation around an unresolved upstream inconsistency.
7. Preserve unaffected accepted Decisions/results.
8. Record material revalidation/recheck state when continuation benefits from it.
9. Resume from the narrowest useful depth/owner rather than restarting the whole methodology.
10. Integrate a checkpoint only if a coherent whole-state view is now useful.

## Typical Revalidation Chain

```text
new Evidence
→ challenges one Slice assumption
→ revalidate Slice owner + affected Domain/Shared relations
→ rescan only Lenses/principles whose applicability changed
→ preserve unrelated Feature/Scenario/Screen Decisions
→ continue from affected realization boundary
```

## Boundary

Revalidation is not a blanket review of every owner, registry or Lens. It is targeted dependency/authority repair.
