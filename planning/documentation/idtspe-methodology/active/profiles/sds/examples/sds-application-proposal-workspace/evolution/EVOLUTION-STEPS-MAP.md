# Evolution Steps Map — Methodology Workspace

Application: `APP-METHODOLOGY-WORKSPACE`

This is the target-shaped candidate Application-development manifest. `planning/PRS.md` retains its unselected Proposal authority; the upstream Application Definition is the accepted planning basis in this example. Full future-state semantics remain owned by each Evolution Step and its Target Owner Bodies.

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

EVO-MW-02-COMMAND-COMPOSITION
→ predecessor: EVO-MW-01-STRUCTURED-KNOWLEDGE
→ planning completeness: INCOMPLETE
→ start readiness: BLOCKED
```

`NEXT_FOR_REALIZATION` does not mean implementation is authorized or Start Ready.

## RU-EVOMAP-03 — Application Driver Coverage

Upstream basis: [APPLICATION-DEFINITION.md](../application/APPLICATION-DEFINITION.md)

| Application / Scenario driver | Planned coverage | Coverage state |
|---|---|---|
| `KBF-MW-01 — Maintain validated structured methodology knowledge without losing Markdown` | `EVO-MW-01 / SCN-MW-MAINTAIN-AND-VERIFY-KNOWLEDGE` | `ACCOUNTED_BY_CONCRETE_STEP` |
| `KBF-MW-02 — Provide trustworthy structural inspection with provenance` | `EVO-MW-01 / SCN-MW-MAINTAIN-AND-VERIFY-KNOWLEDGE`, `EVO-MW-01 / SCN-MW-INSPECT-METHODOLOGY` | `ACCOUNTED_BY_CONCRETE_STEP` |
| `KBF-MW-03 — Compose planning commands deterministically before AI semantic execution` | `EVO-MW-02 / SCN-MW-COMPOSE-COMMANDS-FOR-AI` | `ACCOUNTED_BY_DEFERRED_STEP` |

This is driver-to-Step accountability, not a claim that Scenario coverage or either Step plan is complete. Scenario `SPS-*` / `SR-*` may become more precise Step drivers as planning matures.

## Development-manifest boundary

```text
Application Definition
→ Concept / own-app justification / key behavior / feasibility pressure

this Evolution Steps Map
→ accepted development-plan registry / driver coverage / route

Evolution Step
→ authoritative complete future transition plan

Scenario / Feature / other Target Owner Bodies inside Step
→ planned unrealized downstream owner meaning
```

The horizon after these two concrete Steps is `UNESTABLISHED`; the second Step is included because its distinct `KBF-MW-03` transition and predecessor are already concrete, not to fill a roadmap.
