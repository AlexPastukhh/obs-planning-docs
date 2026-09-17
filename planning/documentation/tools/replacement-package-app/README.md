# Replacement Package Application

Status: proposed documentation/navigation view over upstream Application intent, current accepted downstream owners, and planned evolution.

`APP-RPKG` is one semantic Application with multiple executable/tool parts. Executable identity does not define Application identity. See [`application-definition.md`](application-definition.md).

## Where to start

- **What this Application is / why it exists** → [`application-definition.md`](application-definition.md)
- **Maps / registries / where authority lives** → [`navigation/README.md`](navigation/README.md)
- **Current Scenario** → [`navigation/SCENARIO-REGISTRY.md`](navigation/SCENARIO-REGISTRY.md)
- **Current Features** → [`navigation/FEATURE-REGISTRY.md`](navigation/FEATURE-REGISTRY.md)
- **Implementation-owner navigation** → [`navigation/OWNER-MAP.md`](navigation/OWNER-MAP.md)
- **Planned future** → [`navigation/EVOLUTION-STEPS-MAP.md`](navigation/EVOLUTION-STEPS-MAP.md)
- **Cumulative planned-horizon Prototype Target** → [`evolution-steps/PROTO-RPKG-SELECTED-PLANNED-HORIZON-01.md`](evolution-steps/PROTO-RPKG-SELECTED-PLANNED-HORIZON-01.md)
- **Physical prototype subjects** → [`prototypes/README.md`](prototypes/README.md)
- **Sibling Builder implementation subject** → [`../replacement-package-builder/README.md`](../replacement-package-builder/README.md)

## Documentation areas

| Area | Responsibility |
|---|---|
| [`application-definition.md`](application-definition.md) | upstream Application intent/value, Selected/Possible Benefits and contribution/boundary intent |
| [`TERMS.md`](TERMS.md) | current selected application vocabulary only; future Step-owned terms stay in their Step until materialization |
| [`navigation/`](navigation/README.md) | non-authoritative maps/registries and read paths; use this to find authority |
| [`features/`](features/) | current accepted Feature behavior owners |
| [`scenarios/`](scenarios/) | current accepted Scenario journey owners |
| [`domain/`](domain/) | current accepted Domain semantic owners represented in documentation where useful |
| [`slices/`](slices/) | current accepted end-to-end realization owners |
| [`evolution-steps/`](evolution-steps/) | future `TM-EVOLUTION-STEP` authorities plus peer `TM-PROTOTYPE` Target-instance files that investigate the planned horizon |
| [`prototypes/`](prototypes/README.md) | physical executable/mock/throwaway prototype subjects only; not Prototype Target authority |
| [`testing-plan.md`](testing-plan.md) | proof/navigation plan tied back to semantic owners; tests do not become owner authority |

`navigation/` answers **where is the authority?**; owner/Step files answer **what is the meaning?**

## Current / future guard

Existing Builder PB-01/PB-02 implementation is not treated as accepted current package-construction Feature authority in this proposal. It is implementation Evidence pending [`Establish Replacement Package Construction`](evolution-steps/EVO-RPKG-ESTABLISH-REPLACEMENT-PACKAGE-CONSTRUCTION.md).

Repository Snapshot is also **not** current capability. Its selected target meaning exists only in [`Introduce Repository Snapshot Workflow`](evolution-steps/EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW.md) until realization/materialization.

Apply URI Entry and automatic Snapshot attachment remain **Probable**, not Selected/Planned.
