# Phase 04 — Application Scenario System — Generic

Status: active module-driven SDS phase

## Entry Sources
```text
Application Definition
Refined Core Real-Life Scenario when present
otherwise selected Step-02 route/result remains lineage
Prototype Evidence/candidates when current
known local/shared must-hold conditions
```

## Candidate Target Modules
```text
TM-SCENARIO-DISCOVERY
TM-SCENARIO-DRAFT
  ↔ internal Scenario DATA contract
  ↔ internal Behavior Item contract
  ↔ local Requirements/invariants — normally owned in Scenario/Behavior
  ↔ TM-REQUIREMENT — exceptional shared/multi-owner only
  ↔ TM-SCREEN — conditional spatial owner
```

## IDTSPE Topology
```text
Scenario Discovery Target
↓
Scenario A Target ─┐
Scenario B Target ─┼─ may run in parallel
Scenario C Target ─┘
```

Scenario DATA and Behavior Item methodology is internal to `TM-SCENARIO-DRAFT`; addressability does not create separate Target Modules/Targets. Screen is a separate spatial authority when material. Requirements normally remain with their natural semantic layer; `TM-REQUIREMENT` is exceptional.

## Critical Loop
```text
Scenario Scope
↔ DATA
↔ Behavior
↔ Requirements/invariants
↔ Screen relations when material
```

Every material Scenario Target performs full IDTSPE with candidate/residual Q/R/P at Scope, Question-Set and Answer/Idea levels. Integrated alternatives may use generic Planning Branches.

## Exit Gate
Use `../shared/scenario-domain-slice-module-coverage-contract.md`.

Output Sources can include:
```text
Scenario Catalog
canonical Scenario owners
Scenario DATA
Behavior Items
local/shared must-hold conditions
Screens / Screen Map
Acceptance meaning
residual Q/R/P / revalidation helpers
```
