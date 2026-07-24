# Scenario Draft Template

Status: active reusable recommended template
Doc version: v0.1.0-item-backed-reference-objects
Purpose: create a reviewable catalog of clean Scenario Reference Objects, Scenario DATA Reference Objects and Behavior Item Reference Objects from an item-backed Planning Draft or Full Picture.

Use only sections supported by source. Blank template fields are not requirements.

## 1. Scenario Catalog / Workspace Identity

| Field | Value |
|---|---|
| Workspace / catalog ID | <ID> |
| Title | <title> |
| Status | preliminary / reviewed / accepted-current / needs review |
| Source Planning Draft / Full Picture | <reference> |
| Definition location | <path> |

### Scenario Inventory

| Scenario | Actor/context | Goal | Observable result | Planning Items | Status | Definition file |
|---|---|---|---|---|---|---|
| <Scenario reference> | <actor/context> | <goal> | <result> | <item refs> | <status> | <path> |

A catalog is navigation. Each Scenario file owns its complete Scenario Object body.

## 2. Scenario Reference Object

| Field | Value |
|---|---|
| Scenario ID | <stable ID> |
| Title | <title> |
| Category | Scenario |
| Status | preliminary / reviewed / accepted-current / needs review |
| Actor / context | <actor and application context> |
| Goal | <coherent user goal> |
| Planning Items | <multi-value Planning Item references> |
| Relation | `derived from` |
| Source review state | aligned / review needed / unresolved |
| Scenario DATA | <DATA object references> |
| Behavior Items | <Behavior Item references> |

### Entry Points

<Only supported entry points.>

### Preconditions

<Only supported preconditions.>

### Main Flow

1. <user-facing or observable behavior>

### Include / Branches / Extend

<Only supported alternatives, errors or extensions.>

### Invariants

<Scenario-level observable rules. Do not classify them as domain automatically.>

### Postconditions / Observable Outcomes

<What the actor or another checked observer can verify.>

### Acceptance

<Only criteria already provided or directly entailed by accepted behavior.>

### Open Questions

<Important unknowns. Do not invent answers.>

## 3. Scenario DATA Reference Object

| Field | Value |
|---|---|
| DATA ID | <stable ID> |
| Title | <title> |
| Category | Scenario DATA |
| Parent Scenario | <Scenario reference> |
| Planning Items | <narrow source item refs when useful> |
| Used by Behavior Items | <Behavior Item refs> |

### Actor-Visible / Scenario-Relevant DATA

<Only explicit values the actor enters, selects, sees, filters/searches, attaches, reviews or receives.>

### Validation / Rules

<Only provided rules.>

### Testable / Observable Behavior

<Only supported behavior.>

### Open Questions

<Unknown DATA or rules.>

## 4. Behavior Item Reference Object

| Field | Value |
|---|---|
| Behavior Item ID | <stable ID> |
| Title | <title> |
| Category | Behavior Item |
| Parent Scenario | <Scenario reference> |
| Type | precondition / entry / step / include / branch / invariant / postcondition / acceptance / observable outcome |
| Scenario DATA | <DATA refs or none> |
| Planning Items | <narrow source item refs when useful> |
| Marker | CORE / ALT / EXT / VAR / RISK / DEFER / none |

### Required Behavior

<One addressable unit of user-facing or externally verifiable behavior.>

Behavior Items are not implementation tasks, responsibility rows or Slices.

## 5. Dependency Review Contract

```text
Planning Item changes
  → dependent Scenario/DATA/Behavior objects and definition files
    become review-needed
  → previous reviewed content remains
  → user reviews and refreshes, confirms current,
    or removes/replaces the source relation.
```

No automatic downstream rewrite and no automatic upstream Planning Item mutation are implied.

## 6. Boundaries

- Do not copy complete Planning Item bodies.
- Do not add common-but-unprovided DATA fields.
- Do not put domain entities, aggregates, APIs, database schema, components or implementation seams into the clean Scenario Draft.
- Do not promote every Behavior Item into a Scenario.
- Do not promote every Behavior Item into a Slice.
- Do not infer repository edit, archive, commit or push permission from this template.
