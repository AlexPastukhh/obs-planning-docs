# TM-BEHAVIOR-ITEM — Behavior Item

Entry Point: `tm.behavior.item`  
Role: supporting semantic Target Module; separate Target Instance only when behavior choice is independently material  
Repository provenance: detailed-planning Behavior semantics, Scenario template, Domain discovery workflow, Test Design workflow. Current repo has no standalone reusable Behavior Item template; this module fills that gap.

## Purpose
Own a stable addressable unit of selected observable/application behavior that can be referenced by Scenario, Domain discovery, Slice coverage and Test Design without becoming an implementation task.

## RQ Candidates
```text
What meaningful behavior/result is being performed?
Under what conditions is it allowed/available?
Which Scenario DATA is required?
What observable/system result/state change must occur?
What branches/failures matter?
What must not change on rejection/failure?
What invariant/Requirement constrains it?
Is this behavior shared by several Scenarios or local?
Does it expose a separately meaningful Scenario boundary?
```

## Output Schema
```text
Behavior Item ID
Title
Status
Owner scope:
  Scenario-local | shared Scenario collection
Related Scenarios
Purpose / result
Trigger / applicable condition
Preconditions
Input DATA refs
Behavior / selected response
Output DATA / observable result
State/condition transition — when semantic
Branches / alternatives
Failure / rejection behavior
No-mutation / negative guarantees
Invariants / Requirements
Related Screen interaction meaning — no spatial ownership
Domain discovery clues
Acceptance / verification meaning
Examples / Evidence
Q/R/P
Decisions
```

## Guards
```text
Behavior Item ≠ implementation task
Behavior Item ≠ Slice
method/API endpoint ≠ Behavior Item automatically
one runtime branch ≠ separate Planning Branch automatically
```

## Validators
```text
behavior traceable to Scenario Need/result
required DATA is available/owned
negative guarantees explicit when material
Scenario boundary revisited when Behavior reveals independent Need/result
```

## Handoff
Primary Sources for:
```text
TM-DOMAIN-DISCOVERY
TM-SLICE-STRATEGY
TM-IMPLEMENTATION-SLICE
TM-TEST-DESIGN
TM-CONSISTENCY-REVIEW
```
