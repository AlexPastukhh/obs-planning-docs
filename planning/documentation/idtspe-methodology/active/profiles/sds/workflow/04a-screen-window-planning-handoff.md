# Phase 04A — Screen / Window Planning Handoff — Generic

Status: active optional helper inside Scenario System; not a separate SDS phase number.

## During Scenario Targets

```text
Scenario IDTSPE
→ discover optional preliminary Screen/Window Ideas
→ ask user once when useful
→ preserve UNSELECTED ideas in SDS-PLANNING-STATE/ideas
```

No canonical Screen decision is required to finish a Scenario unless spatial meaning materially changes Scenario semantics.

## After Enough Scenarios Are Stable

```text
selected Scenarios
+ Scenario DATA
+ Behavior Items
+ Requirements
+ Screen/Window Ideas
→ TM-SCREEN / SCREEN_MAP
→ full IDTSPE
→ selected Screen inventory/topology/Scenario×Screen allocation
→ optional SCREEN_DRAFT Targets
```

## Planning Principle

Start with the simplest useful/reversible spatial plan. Keep Scenario/Data/Behavior meaning independent from Screen placement so later global consistency work can move behavior between Screens without semantic loss.
