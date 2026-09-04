# DOC-UC-11 — Maintain selected Screen model

### Goal

Maintain one canonical selected spatial/window model that explains where Scenario behavior is realized without moving Scenario behavior authority into Screens or turning Screens into frontend Slices.

### Process

1. Start from selected Scenario FI composition, FI Interaction Processes and intentional UI requirements; use DOC-UC-07 when Screen topology/realization is still being explored.
2. Maintain one `Screen Map` by default using [Template — Screen owner](../documentation-templates/screen.md#template-screen-owner), including Screen inventory, Scenario×Screen relationships, FI×Screen relationships, routes/transitions and material global Screen constraints.
3. For each Screen record purpose, Scenario roles, participating FIs, meaningful visible/input/action states, material spatial hierarchy/constraints and routes.
4. Maintain Screen Behavior Items using [Template — UI / Screen requirement forms](../documentation-templates/screen.md#template-ui-requirement) only for durable spatial/window/UI behavior whose canonical meaning belongs to the Screen. Keep FI/component-local UI Requirements in Scenario/FI owners and core application BI in Scenario.
5. Reference Scenario/FI identities rather than copying their behavioral definitions. The Scenario Process must remain observably understandable even when Screen details are referenced.
6. Keep selected Screen truth separate from candidate Screen Set/Screen variants. Preserve rejected/candidate variants only when their rationale remains material.
7. Maintain Screen `Evolution Impact` with [Template — Evolution Impact](../documentation-templates/evolution.md#template-evolution-impact) when a Scenario-owned Evolution Step adds/removes Screens, changes routes, moves realization between Screens or changes Screen-owned requirements. Do not create Screen-owned Evolution Steps.
8. Keep one `screens.md` owner by default when a selected model actually exists. Split independent Screen files only when size/review/reuse makes separate ownership materially clearer.

### Principles

- Scenario = selected FI composition that realizes an application Benefit / desired result; Screen = spatial/window meaning; frontend Slice/code = realization mechanism.
- Placement normally does not become BI identity.
- One Screen may use many Slices and one Slice may realize behavior across many Screens.
- Do not create an empty Screen owner merely because the methodology supports one.

---
