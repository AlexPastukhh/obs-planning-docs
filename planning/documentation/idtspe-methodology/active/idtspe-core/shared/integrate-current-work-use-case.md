# UC-IDTSPE-INTEGRATE-CURRENT-WORK — Integrate Current IDTSPE Work

Status: active IDTSPE runtime Use Case

## Situation

Broad Discussion/current work has accumulated enough distributed material that a coherent whole-state view is now more useful than continuing local discussion alone, or an explicit review/handoff/readiness point needs integrated current meaning.

Typical triggers include:

- important accepted meaning is distributed across turns/owners;
- a substantial decision/finding/revalidation pass has changed several dependent parts;
- continuation/handoff/resume would otherwise be unreliable;
- a downstream transition needs a coherent current boundary view;
- the USER explicitly requests a checkpoint/integration review.

Elapsed time/message count alone is not a trigger.

## Result

An **IDTSPE Integration Checkpoint** reconciles material Broad Discussion into current Core State + applicable Target Result meaning, preserves unresolved/revalidation state, and makes the useful next/re-entry point clear without manufacturing completion or approval.

## Process

1. Start from the existing integrated state/checkpoint representation when present.
2. Review only material meaning accumulated since the last coherent view.
3. Use [`UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE`](maintain-current-work-state-use-case.md) to retain only applicable/material State and Result Units.
4. Reconcile accepted Decisions, unresolved Proposals/Q/R/P/Questions, Evidence and material findings/revalidation signals with current Target/owner results.
5. Apply relevant Lens/consistency checks only where current applicability gates justify them. `no material finding` is a valid result.
6. Preserve multi-target/multi-depth state when that is the true current picture; do not force one active level or one Target just to simplify representation.
7. Resolve physical representation separately through Artifact/Representation rules; the checkpoint may remain in context if persistence adds no value.
8. State the current useful continuation/re-entry point when it is not obvious.

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
