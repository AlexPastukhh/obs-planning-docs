# Domain Draft Template

Status: active reusable recommended template
Purpose: create/review a separate Domain owner only when conceptual language, lifecycle, rules or invariants materially improve planning.

Detailed workspace contract: [`../detailed-planning/README.md`](../detailed-planning/README.md)

## Workspace Shape

```text
DOM-X/
├── README.md
├── domain.md
├── ideas/
└── variants/       # only when a second integrated Domain design exists
```

Domain does not require `visual/` by default.

## Domain

| Field | Value |
|---|---|
| Domain ID | <stable ID> |
| Title / responsibility | <title> |
| Status | preliminary / reviewed / accepted-current / needs-review |
| Related Scenarios / Behavior | <links> |

### Purpose / Boundary
<Why a separate conceptual owner exists and what is outside it.>

### Terms / Concepts
<Canonical conceptual language supported by current planning.>

### Relationships
<Material conceptual relationships.>

### Lifecycles / States
<When lifecycle meaning materially helps.>

### Rules / Invariants
<Conceptual rules that should remain consistent across behavior/implementation.>

### Scenario / Behavior Traceability
<Link relevant Scenario/Behavior owners without copying their detailed flow.>

## Current Decisions
<Use the shared detailed-planning Current Decisions contract.>

## Questions / Risks / Problems
<Each real unit includes Current Draft Plan + Finding + Relation / Impact On Current Draft Plan.>

## Potential Simplifications / Better Routes — When Material
<Only unselected changes to current Domain meaning.>

## Boundary Rule

Domain meaning does not silently override Scenario behavior. When Scenario/Domain meaning conflicts, perform explicit consistency review and update the real selected owner(s).
