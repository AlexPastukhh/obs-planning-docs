# Detailed Scenario Draft Template

Status: active reusable specialized-profile recommended template
Doc version: v1.0.1-profile-contract-aligned
Purpose: create a reviewable catalog of separate logical Scenario Reference Objects, supported Scenario DATA Reference Objects and Behavior Item Reference Objects from an item-backed Planning Draft after the specialized profile is explicitly selected.

Use this template only after the project explicitly selects the specialized Scenario/Domain/Slice profile.

For a simple application or non-application solution, Scenario meaning may remain in the Planning Draft. Not using this template does not make a sufficient Planning Draft incomplete.

Use only sections supported by source. Blank fields are not requirements.

The selected profile uses separate logical Reference Objects. Their definitions may share one registry file or be distributed across separate files. Separate logical ownership does not require one file per object and does not define a managed-object runtime.

## 1. Scenario Catalog / Workspace Identity

| Field | Value |
|---|---|
| Workspace / catalog ID | <ID when useful> |
| Title | <title> |
| Status | preliminary / reviewed / accepted-current / needs review |
| Source Planning Draft | <reference> |
| Storage representation | shared registry / separate files / other explicit project form |
| Definition owner(s) | <file/section/registry references> |

### Scenario Inventory

| Scenario | Actor/context | Goal | Observable result | Planning Items | Status | Definition owner |
|---|---|---|---|---|---|---|
| <Scenario reference> | <context> | <goal> | <result> | <item links> | <status> | <file/section/registry reference> |

A catalog is navigation. Each Scenario Reference Object has one complete definition owner.

## 2. Scenario Reference Object

| Field | Value |
|---|---|
| Scenario ID | <stable ID> |
| Title | <title> |
| Category | Scenario |
| Status | preliminary / reviewed / accepted-current / needs review |
| Actor / context | <actor and relevant context> |
| Goal | <coherent goal> |
| Planning Items | <multi-value Planning Item links> |
| Relation | `derived from` |
| Source review state | aligned / review needed / unresolved |
| Scenario DATA | <Scenario DATA Reference Object links or none when no supported DATA exists> |
| Behavior Items | <Behavior Item Reference Object links> |

### Entry Points

<Only supported entry points.>

### Preconditions

<Only supported preconditions.>

### Main Flow

1. <user-facing or otherwise observable behavior>

### Include / Branches / Extend

<Only supported alternatives, errors or extensions.>

### Invariants

<Scenario-level observable rules. Do not classify them as Domain automatically.>

### Postconditions / Observable Outcomes

<What the actor or another checked observer can verify.>

### Acceptance

<Only criteria already provided or directly entailed by accepted behavior.>

### Open Questions

<Important unknowns. Do not invent answers.>

## 3. Scenario DATA Reference Object — When Supported

Create Scenario DATA Reference Objects only for explicit or checked values needed to understand, select, validate or observe Scenario behavior.

When no supported Scenario DATA exists, record no DATA objects rather than creating empty placeholders.

| Field | Value |
|---|---|
| DATA ID | <stable ID> |
| Title | <title> |
| Category | Scenario DATA |
| Parent Scenario | <Scenario reference> |
| Planning Items | <narrow source item links when useful> |
| Used by Behavior Items | <Behavior Item references> |
| Definition owner | <file/section/registry reference> |

### Actor-Visible / Scenario-Relevant DATA

<Only explicit values the actor enters, selects, sees, filters/searches, attaches, reviews or receives.>

### Validation / Rules

<Only provided or checked rules.>

### Testable / Observable Behavior

<Only supported behavior.>

### Open Questions

<Unknown DATA or rules.>

A Scenario may contain a compact DATA summary for readability, but the selected profile keeps the complete detailed DATA meaning at its Scenario DATA Reference Object owner.

## 4. Behavior Item Reference Object

Create stable addressable Behavior Item Reference Objects for the detailed Scenario behavior selected by this profile.

Several Behavior Item definitions may share one registry file. They remain separate logical objects even when they share a physical file.

| Field | Value |
|---|---|
| Behavior Item ID | <stable ID> |
| Title | <title> |
| Category | Behavior Item |
| Parent Scenario | <Scenario reference> |
| Type | precondition / entry / step / include / branch / invariant / postcondition / acceptance / observable outcome |
| Scenario DATA | <Scenario DATA Reference Object links or none> |
| Planning Items | <narrow source item links when useful> |
| Marker | CORE / ALT / EXT / VAR / RISK / DEFER / none |
| Definition owner | <file/section/registry reference> |

### Required Behavior

<One addressable unit of user-facing or externally verifiable behavior.>

Behavior Items are not implementation tasks, responsibility rows or Slices.

## 5. Manual Dependency Review Expectation

```text
Planning Item meaning changes
  → trace linked Scenario, DATA and Behavior Reference Objects
  → identify which definition owners may be affected
  → record review-needed state when the project tracks it
  → a user reviews and refreshes, confirms current,
    or removes/replaces the source relation.
```

This is a documentation review expectation. It does not assert that an automatic dependency runtime exists.

No automatic downstream rewrite and no automatic upstream Planning Item mutation are implied.

## 6. Boundaries

```text
- Do not use this template automatically.
- Do not activate the specialized profile merely because
  a Planning Draft contains Scenarios.
- Do not require one physical file per Reference Object.
- Do not copy complete Planning Item bodies.
- Do not add common-but-unprovided DATA fields.
- Do not put Domain entities, aggregates, APIs, database schema,
  components or implementation seams into the clean Scenario Draft.
- Do not promote every Behavior Item into a Scenario.
- Do not promote every Behavior Item into a Slice.
- Do not infer repository edit, archive, commit or push permission.
```
