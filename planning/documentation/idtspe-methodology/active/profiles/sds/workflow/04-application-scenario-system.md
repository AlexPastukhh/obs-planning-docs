# 04 — Application Scenario System

Status: active SDS workflow projection

## Purpose

Use one `TM-SCENARIO-PLANNING` Target per independently meaningful Application Scenario. Scenario boundary discovery is part of Scenario Evaluation rather than a separate Scenario Planning Target/result.

```text
Application Definition / real-life route
→ identify an independently meaningful Need/result
→ TM-SCENARIO-PLANNING / one Scenario owner
   RU-SCEN-01 Scenario Behavior / Requirements
   RU-SCEN-02 Behavioral Decomposition
     Scenario DATA
     Behavior Items
   RU-SCEN-03 Scenario Development / Change Outlook
→ downstream Screen / Domain / Slice / Test planning
```

If evaluation exposes another independently meaningful Need/result, surface another Scenario candidate through normal Finding Disposition / Target Formation. A Scenario catalog/index may exist as navigation/representation but is not a separate semantic Scenario Planning owner.

## Boundary

Scenario is behavioral/product authority. It does not own Screen topology, Slice/Aggregate boundaries, API/code structure or concrete test implementation.

Scenario DATA and Behavior Items are processed internal Scenario contracts: addressability does not create separate Target Modules/Targets. `TM-REQUIREMENT` remains exceptional for independently shared must-hold meaning; `TM-SCREEN` owns spatial realization when material.

## Uncertainty And Development

Concrete uncertainty stays in Generic Questions / Q/R/P / Evidence / Ideas / Decisions. `RU-SCEN-03` retains durable Scenario-local future/change meaning when downstream planning needs to know how the same Scenario may expand or require revision.

Canonical module: [`../target-modules/TM-SCENARIO-PLANNING.md`](../target-modules/TM-SCENARIO-PLANNING.md).
