# Scenario Draft Template

Status: active reusable recommended template
Purpose: draft one or more current application Scenarios after Application responsibility is justified. A temporary Spine Scenario may be used before stable boundaries exist.

Blank fields are not requirements. Use only supported meaning.

## Scenario Inventory — When Useful

| Scenario | Actor/context | Need / motivation | Goal | Observable result | Status | Definition owner |
|---|---|---|---|---|---|---|

## Scenario

| Field | Value |
|---|---|
| Scenario ID | <stable ID> |
| Title | <title> |
| Status | preliminary / reviewed / accepted-current / needs review |
| Actor / context | <actor/context> |
| Starting situation / state | <when material> |
| Motivational trigger | <why now when material> |
| Need / motivation | <meaningful user Need> |
| Goal / intent | <goal> |
| Observable result | <meaningful result> |
| Related Application Use Case | <UC> |
| Related Ideas / provenance | <when useful> |

### Actor Understanding / Plan
<Initial Understanding, Goal/Path Understanding, Important Unknowns, Required Understanding, Current Plan/Expectation only when material.>

### Entry Points
<Application entry/re-entry; do not conflate with Motivational Trigger.>

### Preconditions
<Only supported preconditions.>

### Main Flow
1. <observable behavior>
   - Surface / Window: <when material>
   - Relevant DATA / Information: <when material>
   - Actor Understanding: <when material>
   - Desired User Response: <when material>
   - System Response / State Change: <when material>
   - Presentation / Visual Requirement: <when material>
   - Result / Transition: <when material>

### Branches / Includes / Extensions
<Only supported alternatives/errors/extensions.>

### Invariants
<Observable Scenario-level rules.>

### Postconditions / Observable Outcomes
<Successful result should meaningfully satisfy/resolve the Need.>

### Acceptance
<Only accepted/directly entailed criteria.>

### Scenario DATA — When Useful
<User-visible/scenario-relevant values; not implementation schema by default.>

### Behavior Items — When Useful
<Stable addressable behavior units; not implementation tasks/Slices.>

### Cross-Cutting Experience / Presentation — Optional
<Only meaning spanning several flow points.>

### Open Questions
<Important unknowns.>

## Boundary Rule

A separate Scenario normally requires meaningful user Need + independently meaningful observable result. Re-entry/reuse/wait/handoff/testability are supporting signals, not mandatory checklist fields. Spine is temporary scaffolding and is not a permanent entity type.
