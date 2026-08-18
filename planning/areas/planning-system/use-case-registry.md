# Planning Runtime Use-Case Registry

Status: active project-local semantic registry
Parent Direction: [`direction-registry.md`](direction-registry.md)

## `UC-PR-END-SESSION` — End Active Planning Session

**Status:** active current
**Parent Direction:** `DIR-PLANNING-RUNTIME`
**Purpose:** close the active operational planning session/day consistently and expose the resulting next state.
**Trigger / accepted input:** user explicitly ends the active session/day workflow.
**Result / end state:** current operational session state is closed/logged according to the runtime workflow and next state is explicit.
**Boundaries:** this capability closes the current operational session only; it does not silently perform unrelated planning/documentation changes.
**Owner route:** [`end-session-command-workflow.md`](end-session-command-workflow.md) + [`SCN-PR-END-SESSION`](scenarios/SCN-PR-END-SESSION.md).
**Scenario owner:** [`SCN-PR-END-SESSION`](scenarios/SCN-PR-END-SESSION.md).
**Related command:** `конец`.

Other dashboard/day capabilities remain owned by the actual Dashboard/runtime documentation and should receive additional Use Cases when independently useful current trigger/result boundaries are explicitly documented.
