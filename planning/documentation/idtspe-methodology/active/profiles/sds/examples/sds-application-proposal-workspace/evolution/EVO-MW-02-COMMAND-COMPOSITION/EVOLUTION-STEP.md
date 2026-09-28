# EVO-MW-02-COMMAND-COMPOSITION — Deterministic AI Command Composition

## RU-EVO-01 — Step Frame / Semantic Relations

**Transition purpose:** add deterministic composition of selected planning commands before external AI semantic execution.

**Driven By:**
- `APP-METHODOLOGY-WORKSPACE / KBF-MW-03`
- material `SPS-*` / `SR-*` from `SCN-MW-COMPOSE-COMMANDS-FOR-AI` when planning becomes more precise

**Entering From:** `EVO-MW-01-STRUCTURED-KNOWLEDGE`

**Step kinds:** `Expansion`

**Target Owner Body composition:**
- `scenarios/SCN-MW-COMPOSE-COMMANDS-FOR-AI.md`
- Feature Target Bodies: `OPEN — not formed yet`

## RU-EVO-02 — Evolution Impacts

- CREATE planned Scenario `SCN-MW-COMPOSE-COMMANDS-FOR-AI`.
- Scenario-local discovery indicates one likely coherent deterministic command-composition capability, but Feature ownership remains `OPEN`.

## RU-EVO-03 — Step-wide Implementation Concerns

The later Step may reuse structured identities/schema/reference infrastructure proven in `EVO-MW-01`, but shared implementation reuse does not itself define a Feature. Exact command schema / typed merge / renderer/API topology remains open.

## RU-EVO-04 — Target Owner Materialization Set

| Owner subject | Transition |
|---|---|
| `SCN-MW-COMPOSE-COMMANDS-FOR-AI` | `CREATE` |
| Feature owner discovered from `AC-MW-03-COMPOSE` | `OPEN` until Feature resolution |

## RU-EVO-05 — Transition / Proof Obligations

- predecessor `EVO-MW-01` must be realized/materialized before start;
- prove transitive include expansion / cycle rejection / dedup ordering;
- preserve permission/result constraints and deferred process-call semantics;
- prove one mechanically effective command can be handed to external AI.

## Deferred planning recheck

Before this Step becomes next for realization, reuse its Scenario/PRS state and re-derive material planning Questions against the then-realized predecessor, `KBF-MW-03`, and current Scenario `SPS/SR` meaning. Do not infer readiness from the current Question list alone.

## RU-EVO-06 — Planning Completeness / Realization Start Readiness

**Planning Completeness:** `INCOMPLETE`

Reason: Feature ownership and complete Target Bodies remain unresolved; exact command-definition schema and realization/proof route are intentionally deferred.

**Realization Start Readiness:** `BLOCKED`

Reason: the direct predecessor is not yet realized/materialized, and this Step is not planning-complete.
