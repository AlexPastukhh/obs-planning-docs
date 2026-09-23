# UC-IDTSPE-REVALIDATE-CURRENT-WORK — Revalidate Current IDTSPE Work

Status: active IDTSPE runtime Use Case

<a id="uc-idtspe-revalidate-current-work"></a>
Responsibility ID: `IDTSPE.UC.REVALIDATE-CURRENT-WORK`

## Situation

Existing working/accepted meaning may no longer be reliable because a Finding, Evidence item, accepted upstream change, Source/authority change, USER redirect, implementation discovery, methodology change or explicit consistency concern affects its assumptions, relations or consumers.

## Result

The narrowest affected semantic subject and relevant methodology-use surface are rechecked; stale/dependent Unit Resolution, Result Content or broader owner meaning is invalidated/reopened only where warranted; unaffected accepted meaning remains stable; and a precise re-entry route is known.

## Process

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `CORE.STATE-UNIT`
> Owner: [Core State Unit / Core Resolution State](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#core-state-unit-boundary)

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `TWU.SUBJECT-REFERENCE`
> Owner: [Target Work Subject Reference Contract](../../runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md#target-work-subject-reference)

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `RESOLUTION.FINDING-DISPOSITION`
> Owner: [Finding Disposition](../../resolution/findings/FINDING-DISPOSITION.md#resolution-finding-disposition)

1. Establish the earliest/smallest affected semantic subject: Collection surface/item/Unit Resolution Slot when that is the actual Target Work subject, otherwise Unit/Result meaning, Proposal/Decision, Target Scope/Source/Relation, another owner, or broader Work Context. Use the canonical Target Work Subject Reference whenever the selected subject is inside Target Work.
2. Use Core Finding Disposition when the trigger is a Finding Candidate; a Lens may evaluate/surface findings but does not decide lifecycle by itself.
3. If one Unit Resolution Slot alone is affected, re-evaluate the **current** parent-Unit/Slot context rather than applying a separate transition-state machine. Distinguish the common `PER_ITEM` Slot Definition/role from one item-local runtime role through `TWU.SUBJECT-REFERENCE`; re-evaluate only the selected subject unless evidence shows the Collection Item Contract or broader Unit contract is affected. Confirm the parent Unit is substantive, re-evaluate Slot applicability/materiality, derive current Slot disposition, and only then reopen/continue substantive Slot Resolution when warranted. If the Slot becomes omitted, it has no active substantive Resolution State/Current Resolution Content; preserve only useful omission reason/history/provenance through normal trace/revalidation mechanisms. If the parent Unit Responsibility/result contract itself is affected, reopen the Unit Resolution. Mark parent Current Result Content stale/invalidated only when its accepted basis no longer holds.
4. If the issue is cross-Unit/upstream, revalidate the actual owner first; do not compensate downstream merely to avoid reopening upstream meaning.
5. Run the [`Consistency Review Process`](../../use-case-processes/CROSS-OWNER-CONSISTENCY-REVIEW.use-case-process.md) when cross-owner/projection drift is plausible.
6. When the methodology-use situation itself changed, re-evaluate affected Use Cases through the Use-Case Registry Map. Re-evaluate only affected registry/component applicability and reuse trustworthy unaffected scans/components whose recheck conditions did not change.
7. Route newly surfaced material meaning through Finding Disposition; form a Contextual Unit only when a new bounded local responsibility is independently useful.
8. Reopen/revise affected Result Content or Core Resolution State through its normal owner/lifecycle. Preserve unaffected Current Result Content, Decisions and Core Resolution State.
9. Re-run only materially affected validators/Lenses/consumer checks.
10. Record material revalidation/recheck state when continuation, handoff or future re-entry benefits from it.
11. Integrate revised selected/derived meaning and resume from the narrowest useful Slot/Unit/depth/owner rather than restarting the whole methodology.
12. Invoke an Integration Checkpoint only when a coherent whole-state view is now useful; revalidation does not imply one automatically.

## Typical Revalidation Chain

```text
new Evidence
→ challenges one Slice assumption
→ revalidate affected Slice Unit/owner + dependent Domain/Shared relations
→ rescan only Lenses/principles whose applicability changed
→ preserve unrelated Feature/Scenario/Screen Decisions and Current Result Content
→ continue from affected realization boundary
```

## Boundary

```text
revalidation ≠ global restart
revalidation ≠ peer Lens
Finding RE-3 ≠ proof that upstream meaning must change
stale Current Result Content ≠ permission to invent replacement meaning
```

Revalidation is targeted dependency/authority repair, not a blanket review of every owner, registry or Lens.
