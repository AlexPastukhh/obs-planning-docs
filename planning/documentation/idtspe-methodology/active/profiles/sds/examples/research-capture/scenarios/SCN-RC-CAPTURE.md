
# SCN-RC-CAPTURE — Capture Research Material

Target Module: `TM-SCENARIO-DRAFT`

## Actor / Context / Need

While reading research material, the actor notices a useful fragment and needs to preserve it with enough context without turning capture into a long organization task.

## Observable Result

```text
selected material + required source context
is durably available for later review,
and feedback never claims success before that result is true.
```

## Scenario DATA — Internal Contracts

```text
DATA-RC-SELECTED-MATERIAL
DATA-RC-SOURCE-CONTEXT
DATA-RC-SHORT-THOUGHT — optional
DATA-RC-CAPTURE-RESULT
```

These are internal Scenario contracts, not standalone Target Modules/files.

## Behavior Items

```text
BI-RC-ACCEPT-CAPTURE
  accept valid selected material/source/thought

BI-RC-CONFIRM-DURABILITY
  expose success only after required durable result exists

BI-RC-REPORT-CAPTURE-FAILURE
  report recoverable failure without false success
```

## Local Must-Hold / Negative Guarantees

```text
REQ-RC-DURABLE-SUCCESS
  success indication must not precede required durable preservation

REQ-RC-SOURCE-CONTEXT
  accepted capture must preserve enough source context for later use
```

These remain local Scenario-owned conditions in this example. `TM-REQUIREMENT` is **not activated** because no genuinely shared multi-owner canonical Requirement exists.

## Acceptance Meaning

```text
Given valid selected material + source context
When capture is accepted
Then the required information is durably recoverable later
And success is not shown before that condition is true
```

## Handoff

```text
→ screens/SCREEN-MAP.md
→ domain/DOMAIN-DISCOVERY.md
→ Slice planning
→ Test Design as semantic proof Source
```
