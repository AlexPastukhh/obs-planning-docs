# UC-IDTSPE-INTEGRATE-CURRENT-WORK — Integrate Current IDTSPE Work

Status: active IDTSPE runtime Use Case

## Situation

Broad Discussion/current work has accumulated enough distributed material that a coherent whole-state view is now more useful than continuing local discussion alone, or an explicit review/handoff/readiness point needs integrated current meaning.

Typical triggers include:

- important accepted meaning is distributed across turns/owners/Units;
- a substantial Decision/Finding/revalidation pass changed several dependent parts;
- continuation/handoff/resume would otherwise be unreliable;
- a downstream transition needs a coherent current boundary view;
- the USER explicitly requests a checkpoint/integration review.

Elapsed time or message count alone is not a trigger. An Integration Checkpoint is not a periodic timer event.

## Result

An **IDTSPE Integration Checkpoint** reconciles material Broad Discussion into the current Unit/Target/Work-Context model: the complete Module-defined Unit inventory, material Unit Resolutions, Current Result Content / OPEN / explicit omission dispositions, material cross-cutting Core Resolution State, unresolved/revalidation state and a useful continuation point. It does not manufacture completion or approval.

## Process

1. **Collect** — start from the previous coherent state and collect only material changed/new meaning plus current authoritative Sources/owner results needed for coherence.
2. **Relate** — attach Unit-local Questions/Problems/Proposals/QRP/Evidence/Decisions/Findings to the affected Unit Resolution; keep genuinely cross-Unit/Target/Work-Context state at its natural broader subject. Preserve canonical Proposal/Decision/Q/R/P relations instead of reconstructing them from prose.
3. **Disposition Findings** — route material Finding Candidates to the smallest correct subject/owner; form Contextual Units only when an independently useful bounded local responsibility exists.
4. **Maintain current state** — use `UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE`; preserve Current Result Content separately from unresolved/candidate Unit Resolution meaning, unresolved alternatives and revalidation signals; ensure every Module-defined Unit in each formed Target has a resolved / OPEN / explicit-omission disposition.
5. **Integrate selections/derivations** — integrate safely derived answers and materially selected Proposal meaning into affected Result Content/owners under normal authority. Explicit Decision trace remains proportional.
6. **Check** — apply only currently applicable Lens/consistency/validation checks needed to judge whether the integrated whole fits together. `no material finding` is valid.
7. **Resolve representation separately** — if physical persistence/placement is material, invoke the canonical Artifact/Representation path. A checkpoint may remain context-only when persistence adds no value.
8. **Protect coherence** — new material Proposal/Question/Problem/Evidence/Decision consequence surfaced while rendering must be integrated into the same checkpoint or marked explicitly as post-checkpoint exploration.
9. **Continue** — state the useful continuation/re-entry point when non-obvious. The checkpoint does not end Broad Discussion.

Canonical supporting owners:

- Broad Discussion/checkpoint interaction projection: [`broad-discussion-and-integration-checkpoint-model.md`](broad-discussion-and-integration-checkpoint-model.md);
- Proposal/Decision lifecycle: [`proposal-and-decision-lifecycle-contract.md`](proposal-and-decision-lifecycle-contract.md);
- Unit/materiality semantics: [`idtspe-unit-and-target-step-result-model.md`](idtspe-unit-and-target-step-result-model.md);
- physical placement: [`artifact-placement-and-idtspe-response-contract.md`](artifact-placement-and-idtspe-response-contract.md).

## Boundary

```text
Integration Checkpoint ≠ approval
Integration Checkpoint ≠ Decision
Integration Checkpoint ≠ Unit
Integration Checkpoint ≠ mutation authorization
Integration Checkpoint ≠ mandatory persistence
Integration Checkpoint ≠ end of Broad Discussion
Integration Checkpoint ≠ periodic timer event
```

Session Runtime may expose or request the checkpoint, but Session does not own a competing generic Checkpoint semantic object.
