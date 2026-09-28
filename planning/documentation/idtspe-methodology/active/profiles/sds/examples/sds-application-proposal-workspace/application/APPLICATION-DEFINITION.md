# Application Definition — Methodology Workspace

Target: `APP-METHODOLOGY-WORKSPACE`  
Working name only; final product name is not selected.

Supporting development planning:
- [Evolution Steps Map](../evolution/EVOLUTION-STEPS-MAP.md)
- [Planning Resolution State](../planning/PRS.md)
- [Implementation / realization context](../context/IMPLEMENTATION-CONCERNS.md)

## RU-APP-05 — Application Concept

### Summary

A Git-backed methodology workspace that keeps ordinary Markdown as the primary human/AI representation while making important methodology knowledge structurally controlled, addressable and easier to inspect/verify, and later allowing planning commands to be composed deterministically before AI semantic execution.

### How it roughly works

Canonical methodology meaning remains in repository files. Selected identities, fields and relations are interpreted and validated so structural projections can be checked/generated while humans and AI continue to browse ordinary Markdown. A later command-composition capability can reuse the same stable identities/contracts without making those projections a second semantic authority.

## RU-APP-02 — Existing-Solution / Reference Position

Relevant existing/manual approaches:

- plain Markdown + Git/GitHub;
- manually maintained cross-file references and maps;
- build/CI-time validation or generated documentation;
- ad-hoc scripts for derived views;
- existing typed/configuration systems such as CUE, Nickel, Dhall, Jsonnet or Nix-like module ideas.

Position:

Plain Markdown/Git remains the best primary reading/review surface but does not by itself provide one coherent methodology-specific behavior for validated structural maintenance, trustworthy cross-cutting inspection, or deterministic planning-command composition. Existing configuration technologies supply useful primitives, so the selected direction is **adapt/integrate them behind a lightweight methodology-specific Application contribution**, not replace Markdown/Git with a database-first product or build a general semantic engine from scratch.

## RU-APP-08 — Own-Application Justification / Key Behavior Focus

### Own-Application Justification

An own Application is warranted only where the selected methodology workflow needs behavior that the surrounding editor/Git/GitHub/configuration tools do not already provide coherently. The Application should stay thin: it owns methodology-specific structural maintenance/inspection/composition behavior while ordinary authoring, repository history, review and external AI reasoning remain with their natural tools/actors.

### Key Behavior Focus

`KBF-MW-01 — Maintain validated structured methodology knowledge without losing Markdown`

When canonical methodology meaning changes, the Application can validate the structured meaning/references, produce the configured synchronized Markdown/derived projections, and fail truthfully instead of publishing invalid structural state.

`KBF-MW-02 — Provide trustworthy structural inspection with provenance`

When a human/AI asks a cross-cutting methodology question, the Application can answer from the validated structural basis with enough provenance to return to canonical Markdown owners rather than forcing the actor to reconstruct the relation from prose.

`KBF-MW-03 — Compose planning commands deterministically before AI semantic execution`

Given selected command roots, the Application can mechanically expand validated dependencies, reject invalid/cyclic composition, deduplicate/order contributions and emit one effective command/provenance result before external AI performs semantic reasoning.

These `KBF-*` labels are Application-local addressability for key behavior focus. They are not Feature identities, Requirements or a requirement to decompose the Application into one Feature per KBF.

## RU-APP-07 — Realization Feasibility / Early Implementation Planning

Current Application-level planning pressure:

- preserve stable semantic identity/reference semantics across repository files;
- choose a practical structured/prose authoring split without creating two semantic authorities;
- keep generated Markdown deterministic/readable and visibly derived;
- support truthful validation/reference failure rather than false publication success;
- make structural facts/projections inspectable with provenance;
- keep ordinary Git/GitHub as repository/history/review/read surfaces;
- trial CUE first for structured contracts/relations while keeping renderer/template technology thin and replaceable;
- avoid database/full UI/custom DSL/general semantic engine until evidence proves they are needed;
- let later command composition reuse the structured identity/reference substrate without preselecting its exact command schema/implementation topology.

This is legitimate **early Application-level implementation planning** because it constrains feasibility and guides downstream work. It is not yet durable Feature, Screen, Domain, Slice or Shared authority. Downstream planning may refine/split/challenge these pressures and owns the exact durable realization once resolved.

## Downstream handoff

- `KBF-MW-01` and `KBF-MW-02` materially drive `EVO-MW-01-STRUCTURED-KNOWLEDGE` and its Scenario Target Bodies.
- `KBF-MW-03` materially drives deferred `EVO-MW-02-COMMAND-COMPOSITION`.
- Scenario/Feature/Screen planning may also revalidate this Application Definition when real-life or realization evidence changes the justification/focus.
