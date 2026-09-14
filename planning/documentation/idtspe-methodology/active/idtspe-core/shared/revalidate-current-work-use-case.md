# UC-IDTSPE-REVALIDATE-CURRENT-WORK — Revalidate Current IDTSPE Work

Status: active IDTSPE runtime Use Case

## Situation

Existing working/accepted meaning may no longer be reliable because a Finding, Evidence item, accepted upstream change, Source/authority change, USER redirect, implementation discovery, methodology change or explicit consistency concern affects its assumptions, relations or consumers.

## Result

The narrowest affected semantic subject and relevant methodology-use surface are rechecked; stale/dependent Unit Resolution, Result Content or broader owner meaning is invalidated/reopened only where warranted; unaffected accepted meaning remains stable; and a precise re-entry route is known.

## Process

1. Establish the earliest/smallest affected semantic subject: Unit/Result field, Proposal/Decision, Target Scope/Source/Relation, another owner, or broader Work Context.
2. Use Core Finding Disposition when the trigger is a Finding Candidate; a Lens may evaluate/surface findings but does not decide lifecycle by itself.
3. If one Unit responsibility is affected, reopen only that Unit Resolution and mark Current Result Content stale/invalidated only when its accepted basis no longer holds.
4. If the issue is cross-Unit/upstream, revalidate the actual owner first; do not compensate downstream merely to avoid reopening upstream meaning.
5. Run the [`Consistency Review Process`](consistency-review-use-case.md) when cross-owner/projection drift is plausible.
6. When the methodology-use situation itself changed, re-evaluate affected Use Cases through the Use-Case Registry Map. Re-evaluate only affected registry/component applicability and reuse trustworthy unaffected scans/components whose recheck conditions did not change.
7. Route newly surfaced material meaning through Finding Disposition; form a Contextual Unit only when a new bounded local responsibility is independently useful.
8. Reopen/revise affected Result Content or Core Resolution State through its normal owner/lifecycle. Preserve unaffected Unit Result Content, Decisions and Core Resolution State.
9. Re-run only materially affected validators/Lenses/consumer checks.
10. Record material revalidation/recheck state when continuation, handoff or future re-entry benefits from it.
11. Integrate revised selected/derived meaning and resume from the narrowest useful Unit/depth/owner rather than restarting the whole methodology.
12. Invoke an Integration Checkpoint only when a coherent whole-state view is now useful; revalidation does not imply one automatically.

## Typical Revalidation Chain

```text
new Evidence
→ challenges one Slice assumption
→ revalidate affected Slice Unit/owner + dependent Domain/Shared relations
→ rescan only Lenses/principles whose applicability changed
→ preserve unrelated Feature/Scenario/Screen Decisions and Unit Result Content
→ continue from affected realization boundary
```

## Boundary

```text
revalidation ≠ global restart
revalidation ≠ peer Lens
Finding RE-3 ≠ proof that upstream meaning must change
stale Unit Result Content ≠ permission to invent replacement meaning
```

Revalidation is targeted dependency/authority repair, not a blanket review of every owner, registry or Lens.
