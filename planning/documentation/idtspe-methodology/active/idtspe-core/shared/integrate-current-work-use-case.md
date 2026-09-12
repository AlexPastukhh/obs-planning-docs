# UC-IDTSPE-INTEGRATE-CURRENT-WORK — Integrate Current IDTSPE Work

Status: active IDTSPE runtime Use Case

## Situation

Broad Discussion/current work has accumulated enough distributed material that a coherent whole-state view is now more useful than continuing local discussion alone, or an explicit review/handoff/readiness point needs integrated current meaning.

Typical triggers include:

- important accepted meaning is distributed across turns/owners;
- a substantial Decision/Finding/revalidation pass changed several dependent parts;
- continuation/handoff/resume would otherwise be unreliable;
- a downstream transition needs a coherent current boundary view;
- the USER explicitly requests a checkpoint/integration review.

Elapsed time/message count alone is not a trigger.

## Result

An **IDTSPE Integration Checkpoint** reconciles material Broad Discussion into current Core State + applicable Target Result meaning, preserves unresolved/revalidation state, and makes the useful next/re-entry point clear without manufacturing completion or approval.

## Process

1. **Collect** — start from the previous coherent/integrated state when present and collect only material meaning accumulated or changed since it, plus current authoritative Sources/owner results needed for coherence.
2. **Relate** — connect current Target Goal context and material Questions/Problems to Proposals/candidate alternatives, Q/R/P, Evidence and Decisions using the canonical Proposal/Decision lifecycle rather than reconstructing hidden relations from prose.
3. **Maintain current state** — use [`UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE`](maintain-current-work-state-use-case.md) so only applicable/material Core State and Target Result Units are retained; preserve unresolved alternatives and revalidation signals without serializing the whole conversation.
4. **Integrate** — reconcile accepted Decisions, unresolved material state, Evidence, Findings/revalidation consequences and current Target/owner results into one coherent current Work Context. Preserve multi-target/multi-depth state when that is the true picture.
5. **Check** — apply only currently applicable Lens/consistency/validation checks needed to judge whether the integrated whole fits together. `no material finding` is a valid outcome.
6. **Resolve representation separately** — if physical persistence/placement is material, invoke the canonical Artifact/Representation path. A checkpoint may remain context-only when persistence adds no value.
7. **Protect checkpoint coherence** — if explanatory text produced while rendering the checkpoint surfaces new material Proposal/Question/Problem/Evidence/Decision consequence, integrate it into the same checkpoint or mark it explicitly as post-checkpoint exploration.
8. **Continue** — state the useful continuation/re-entry point when it is not obvious. The checkpoint does not end Broad Discussion.

Canonical supporting owners:

- Broad Discussion/checkpoint interaction projection: [`broad-discussion-and-integration-checkpoint-model.md`](broad-discussion-and-integration-checkpoint-model.md);
- Proposal/Decision lifecycle: [`proposal-and-decision-lifecycle-contract.md`](proposal-and-decision-lifecycle-contract.md);
- Unit/materiality semantics: [`idtspe-unit-and-target-step-result-model.md`](idtspe-unit-and-target-step-result-model.md);
- physical placement: [`artifact-placement-and-idtspe-response-contract.md`](artifact-placement-and-idtspe-response-contract.md).

## Boundary

```text
Integration Checkpoint
≠ approval
≠ Decision
≠ mutation authorization
≠ mandatory persistence
≠ end of Broad Discussion
≠ periodic timer event
```

Session Runtime may expose the checkpoint to the USER, but Session does not own a competing generic Checkpoint semantic object.
