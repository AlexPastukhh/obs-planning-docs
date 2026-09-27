# EVO-MW-01-STRUCTURED-KNOWLEDGE — Structured Knowledge Foundation

## RU-EVO-01 — Step Frame / Semantic Relations

**Transition purpose:** establish enough structured methodology substrate to maintain validated methodology knowledge and inspect structural facts/provenance while preserving ordinary Markdown.

**Driven By:**
- `APP-METHODOLOGY-WORKSPACE / AB-01`
- `APP-METHODOLOGY-WORKSPACE / AB-02`

**Entering From:** `None`

**Step kinds:** `Introduction`, `Expansion`

**Target Owner Body composition:**
- `scenarios/SCN-MW-MAINTAIN-AND-VERIFY-KNOWLEDGE.md`
- `scenarios/SCN-MW-INSPECT-METHODOLOGY.md`
- Feature Target Bodies: `OPEN — not formed yet`

## RU-EVO-02 — Evolution Impacts

### Scenario impacts
- CREATE planned Scenario `SCN-MW-MAINTAIN-AND-VERIFY-KNOWLEDGE`.
- CREATE planned Scenario `SCN-MW-INSPECT-METHODOLOGY`.

### Feature / responsibility impacts
Scenario-local Feature Discovery currently indicates two likely coherent capability boundaries:
- maintain/validate/publish methodology knowledge;
- inspect methodology structure/provenance.

They remain `OPEN` as Feature ownership. No Feature Target Body exists yet.

## RU-EVO-03 — Step-wide Implementation Concerns

Supporting context: [IMPLEMENTATION-CONCERNS.md](../../context/IMPLEMENTATION-CONCERNS.md).

Current trial direction:
- Hybrid B structured/prose split;
- CUE as first structured-layer experiment;
- ordinary Markdown remains first-class;
- thin deterministic renderer/build;
- narrow spike before broader architecture.

These are realization pressures, not Feature identities.

## RU-EVO-04 — Target Owner Materialization Set

Planned semantic authority transitions after successful realization/proof:

| Owner subject | Transition |
|---|---|
| `SCN-MW-MAINTAIN-AND-VERIFY-KNOWLEDGE` | `CREATE` |
| `SCN-MW-INSPECT-METHODOLOGY` | `CREATE` |
| Feature owner(s) discovered from these Scenarios | `OPEN` until Feature resolution forms complete Target Feature Body |

No downstream current owner is created merely by this Step plan.

## RU-EVO-05 — Transition / Proof Obligations

Before realization can complete:
- prove canonical structured source can reject invalid references without publishing invalid truth;
- prove ordinary Markdown remains readable/browsable;
- prove at least one derived structural inspection result exposes provenance to canonical owners;
- revalidate generated-file/reproducibility concerns.

## Contextual planning stabilization

Recheck the current Scenario Target Bodies, accepted AB-01/AB-02 intent, PRS questions and source evidence together. Derive missing material Questions for this Step rather than treating the stored list as exhaustive. In particular, decide whether an external GitHub edit requires a materially distinct batch-reconciliation Scenario, whether edit-time feedback/synchronization is required beyond build/CI checks, and whether canonical authored prose may be rewritten automatically. Integrate the consequences into the Step/Scenario targets and PRS, then repeat after material change before declaring planning complete.

## RU-EVO-06 — Planning Completeness / Realization Start Readiness

**Planning Completeness:** `INCOMPLETE`

Reason:
- Scenario Target Bodies are formed;
- Feature Discovery / behavior planning is active inside them;
- Feature ownership and complete Feature Target Bodies are not yet resolved; Scenario coverage and publication/overwrite boundaries are also under contextual review.

**Realization Start Readiness:** `BLOCKED`

Reason:
- complete realization-near downstream owner target state is not yet available;
- exact slice/domain/shared realization and proof route remain open.

## Planning rule

The next planning work is to continue the Scenario Target Bodies, not to manufacture Feature files early. When Feature ownership is resolved, form complete `TM-FEATURE` Target Body/Bodies inside this Step and replace Scenario-local detailed behavior with Feature/result refs.
