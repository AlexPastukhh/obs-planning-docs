# TM-SCENARIO-DATA — Scenario DATA

Entry Point: `tm.scenario.data`  
Role: supporting semantic Target Module; separate Target Instance only when independently selectable/revalidatable  
Repository provenance: detailed-planning Scenario DATA semantics, Scenario template, Prototype candidate DATA, practical example. Current repo has no standalone reusable DATA template; this module fills that gap.

## Purpose
Own stable addressable **scenario-relevant information meaning** required to understand or perform selected behavior without turning implementation schema into semantic truth.

## RQ Candidates
```text
What information does the actor/system behavior actually need to know or produce?
Why does this information matter to Scenario result/understanding?
Where does it come from and when is it available?
What is authoritative vs derived/display-only?
What validity/freshness/condition matters semantically?
Which Behavior Items consume/produce/change its meaning?
Is this Scenario-local or shared across several Scenarios?
Does it expose a Requirement/Domain candidate?
```

## Output Schema
```text
DATA ID
Title / semantic meaning
Status
Owned at:
  Scenario-local | shared Scenario collection | other canonical owner
Related Scenarios
Purpose / user-visible or scenario-relevant meaning
Source / producer / authority
Availability / timing / precondition
Relevant states/values — semantic only
Derived / observed / entered / external
Freshness / validity rules — when material
Consumed By Behavior Items
Produced/Changed By Behavior Items
Related Requirements
Domain discovery clues
Examples / Evidence
Q/R/P
Decisions
```

## Guards
```text
DTO field ≠ DATA
DB column ≠ DATA
component state ≠ DATA
implementation schema may realize DATA but does not define it
```

## Validators
```text
all material Behavior inputs/outputs have discoverable semantic information owners
no duplicate local/shared DATA authority
no schema-driven DATA without Scenario meaning
```

## Handoff
Sources for:
```text
TM-SCENARIO-DRAFT
TM-BEHAVIOR-ITEM
TM-DOMAIN-DISCOVERY
TM-TEST-DESIGN
TM-IMPLEMENTATION-SLICE
```
