# Evolution Steps Map — Methodology Workspace

Application: `APP-METHODOLOGY-WORKSPACE`

This is the target-shaped candidate Application-development manifest. `planning/PRS.md` retains its unselected Proposal authority; the upstream Application Definition is the current accepted planning basis in this example. Full future-state semantics remain owned by each Evolution Step and its Target Owner Bodies.

## RU-EVOMAP-01 — Development Plan Registry / Routing

| Step | Development position | Purpose | Entering From | Principal downstream targets | Authority |
|---|---|---|---|---|---|
| `EVO-MW-01-STRUCTURED-KNOWLEDGE` | `NEXT_FOR_REALIZATION / PLANNING_INCOMPLETE` | Establish the structured-knowledge substrate needed to maintain and inspect methodology knowledge while preserving Markdown. | `None` | Scenario Target Bodies for maintain/verify and independent inspection; Feature ownership still OPEN | [Step](EVO-MW-01-STRUCTURED-KNOWLEDGE/EVOLUTION-STEP.md) |
| `EVO-MW-02-COMMAND-COMPOSITION` | `DEFERRED / LATER_HORIZON` | Add deterministic planning-command composition after the structured identity/schema substrate is sufficiently proven. | `EVO-MW-01-STRUCTURED-KNOWLEDGE` | Scenario Target Body for command composition; Feature ownership still OPEN | [Step](EVO-MW-02-COMMAND-COMPOSITION/EVOLUTION-STEP.md) |

## RU-EVOMAP-02 — Step Relations / Planning Completeness / Start Readiness

```text
EVO-MW-01-STRUCTURED-KNOWLEDGE
→ predecessor: None
→ planning completeness: INCOMPLETE
→ start readiness: BLOCKED
   reason: Scenario-local Feature Discovery / behavior planning is not yet resolved into complete Feature Target Bodies / exact realization proof

EVO-MW-02-COMMAND-COMPOSITION
→ predecessor: EVO-MW-01-STRUCTURED-KNOWLEDGE
→ planning completeness: INCOMPLETE
→ start readiness: BLOCKED
   reason: start blocked by unrealized predecessor and incomplete Step plan; planning itself is incomplete because Feature/command target state is unresolved
```

`NEXT_FOR_REALIZATION` does not mean implementation is authorized or Start Ready.

## RU-EVOMAP-03 — Application Intent / Benefit Driver Coverage

Upstream basis: [APPLICATION-DEFINITION.md](../application/APPLICATION-DEFINITION.md)

| Application intent / Benefit | Planned coverage | Coverage state |
|---|---|---|
| `AB-01 — Controlled structured knowledge without losing Markdown` | `EVO-MW-01 / SCN-MW-MAINTAIN-AND-VERIFY-KNOWLEDGE` | `ACCOUNTED_BY_CONCRETE_STEP` |
| `AB-02 — Reliable AI inspection and verification` | `EVO-MW-01 / SCN-MW-MAINTAIN-AND-VERIFY-KNOWLEDGE`, `EVO-MW-01 / SCN-MW-INSPECT-METHODOLOGY` | `ACCOUNTED_BY_CONCRETE_STEP` |
| `AB-03 — Deterministic composition of AI commands` | `EVO-MW-02 / SCN-MW-COMPOSE-COMMANDS-FOR-AI` | `ACCOUNTED_BY_DEFERRED_STEP` |

No accepted Benefit lacks a concrete Step identity. This is intent-to-Step accountability, not a claim that Scenario coverage or either Step plan is complete. In particular, external GitHub-change reconciliation remains under contextual coverage review in PRS.

## Development-manifest boundary

```text
Application Definition
→ why / value / intended Application responsibility

this Evolution Steps Map
→ accepted development-plan registry / coverage / route

Evolution Step
→ authoritative complete future transition plan

Scenario / Feature / other Target Owner Bodies inside Step
→ planned unrealized downstream owner meaning
```

This Map does not copy full Scenario/Feature/Domain/Slice/Shared bodies and does not grant current realized-owner authority. The horizon after these two concrete Steps is `UNESTABLISHED`; the second Step is included because its distinct AB-03 transition and predecessor are already concrete, not to fill a roadmap.
