# Methodology Application Evolution — Proposal Workspace example (reviewed r4)

This example adapts the user-supplied r3 archive. It shows an **accepted upstream Application Definition** and an **unselected Proposal** for an Evolution Map with two concrete but planning-incomplete Steps. No downstream Scenario/Feature/etc owner is realized. Start with [PRS](planning/PRS.md) for current/candidate authority.

## Read path

1. [Application Definition](application/APPLICATION-DEFINITION.md): upstream AB-01..03 intent and coverage references, without full Scenario journeys.
2. [Evolution Map](evolution/EVOLUTION-STEPS-MAP.md): candidate manifest, Step relations, planning/readiness projections and Benefit-driver coverage. The second Step is a concrete deferred AB-03 transition; further horizon is `UNESTABLISHED`.
3. [EVO-MW-01](evolution/EVO-MW-01-STRUCTURED-KNOWLEDGE/EVOLUTION-STEP.md) and its [maintenance](evolution/EVO-MW-01-STRUCTURED-KNOWLEDGE/scenarios/SCN-MW-MAINTAIN-AND-VERIFY-KNOWLEDGE.md) / [inspection](evolution/EVO-MW-01-STRUCTURED-KNOWLEDGE/scenarios/SCN-MW-INSPECT-METHODOLOGY.md) Scenario Target Bodies. Their Application Contributions are meaningful while Feature Resolution remains OPEN.
4. [EVO-MW-02](evolution/EVO-MW-02-COMMAND-COMPOSITION/EVOLUTION-STEP.md) and [command composition Scenario](evolution/EVO-MW-02-COMMAND-COMPOSITION/scenarios/SCN-MW-COMPOSE-COMMANDS-FOR-AI.md): deferred but concrete, still Feature OPEN.
5. [Implementation concerns](context/IMPLEMENTATION-CONCERNS.md): support the current spike; they do not define Feature identities.

## Example boundary

The Proposal status lives in PRS. Target-shaped candidate documents do not grant acceptance. `Feature Resolution: OPEN` never means `FEATURE_RESOLVED`. Future Scenario Bodies keep `RU-SCEN-02` omitted because current-owner reverse impact projection does not apply there.

This particular workspace retains one context file because it is material. Contextual files, Needs, Pre-Update, research notes and a `DISCOVERY.md` file are **not required archive members**. Open material Questions are routed by PRS; the current Question set is derived from the current Step and re-derived after material change, not read from a fixed list.

The r3 source archive included older methodology Needs/Pre-Update and a generic `DISCOVERY.md`. They were excluded from this illustrative example because they are not the current methodology authority and would teach an unnecessary archive shape. The original r3 remains the source snapshot.

## Open planning boundary

The archive does not claim complete Scenario coverage or realization readiness. PRS keeps external-GitHub-change Scenario coverage, edit-time versus build/CI synchronization, and canonical-prose overwrite boundaries open. Whether the former needs a separate Scenario must be resolved contextually; no extra Scenario is invented here.
