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
6. **Check** — apply only currently applicable Lens/consistency/validation checks needed to judge whether the integrated whole fits together. `no material finding` is valid. For any retained material Proposal, ensure its proportional Review Provenance makes the materially applied Lens operations/recheck state recoverable without copying the reasoning transcript.
7. **Resolve representation separately** — if physical persistence/placement is material, invoke the canonical Artifact/Representation path. A checkpoint may remain context-only when persistence adds no value, except when the Resolution Carry-Forward Durable Coordination Materialization Threshold requires one durable discoverable coordination representation.
8. **Protect coherence** — new material Proposal/Question/Problem/Evidence/Decision consequence surfaced while rendering must be integrated into the same checkpoint or marked explicitly as post-checkpoint exploration.
9. **Continue** — state the useful continuation/re-entry point when non-obvious. The checkpoint does not end Broad Discussion.

Canonical supporting owners:

- Broad Discussion/checkpoint interaction projection: [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/interaction/BROAD-DISCUSSION-AND-INTEGRATION-CHECKPOINT-PROJECTION.md`](../../representation/interaction/BROAD-DISCUSSION-AND-INTEGRATION-CHECKPOINT-PROJECTION.md);
- Proposal/Decision lifecycle: [`planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md`](../../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md);
- Unit/materiality semantics: [`planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md);
- physical placement: [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md).

## Resolution Carry-Forward Reconciliation

At a useful Integration Checkpoint / handoff, reconcile the applicable [`Resolution Carry-Forward`](../../resolution/continuation/RESOLUTION-CARRY-FORWARD-PROJECTION.md): project only surviving material open/deferred/residual items plus only the accepted Decision anchors needed to understand that surviving state; remove closed trivial entries; preserve canonical bodies at their natural owners. The projection may be omitted when no continuation value exists, but when its Durable Coordination Materialization Threshold is crossed the checkpoint must leave one durable discoverable representation for the coordination scope.

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
