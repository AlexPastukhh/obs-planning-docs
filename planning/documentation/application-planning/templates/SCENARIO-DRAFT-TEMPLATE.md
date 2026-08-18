# Detailed Scenario Draft Template

Status: active reusable specialized-profile recommended template
Doc version: v1.0.1-profile-contract-aligned
Purpose: create a reviewable catalog of separate logical Scenario Reference Objects, supported Scenario DATA Reference Objects and Behavior Item Reference Objects from current application planning after the specialized profile is explicitly selected.

Use this template after the project explicitly selects the specialized Scenario/Domain/Slice profile. Before stable Scenario boundaries exist, an optional Spine Scenario may be used as temporary scaffolding; no permanent Spine Unit entity is introduced.

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

| Scenario | Actor/context | Need / motivation | Goal | Observable result | Status | Definition owner |
|---|---|---|---|---|---|---|
| <Scenario reference> | <context> | <need> | <goal> | <result> | <status> | <file/section/registry reference> |

A catalog is navigation. Each Scenario Reference Object has one complete definition owner.

## 2. Scenario Reference Object

| Field | Value |
|---|---|
| Scenario ID | <stable ID> |
| Title | <title> |
| Category | Scenario |
| Status | preliminary / reviewed / accepted-current / needs review |
| Actor / context | <actor and relevant context> |
| Starting situation / state | <supported starting situation> |
| Motivational trigger | <why action starts now when material> |
| Need / motivation | <meaningful user Need> |
| Goal | <coherent goal> |
| Related Ideas / provenance | <links when useful> |
| Relation | `derived from` / other explicit source relation when useful |
| Source review state | aligned / review needed / unresolved |
| Scenario DATA | <Scenario DATA Reference Object links or none when no supported DATA exists> |
| Behavior Items | <Behavior Item Reference Object links> |

### Actor Understanding / Plan

<Initial Understanding, Goal Understanding, Action/Path Understanding, Important Unknowns, Required Understanding and Current Plan/Expectation only when material. Keep this one proportional block.>

### Entry Points

<Application entry points only; do not conflate them with Motivational Trigger.>

### Preconditions

<Only supported preconditions.>

### Main Flow

1. <user-facing or otherwise observable behavior>
   - Surface / Window: <when material>
   - Relevant DATA / Information: <when material>
   - Actor Understanding: <when material>
   - Desired User Response: <when material>
   - System Response / State Change: <when material>
   - Presentation / Visual Requirement: <when material>
   - Result / Transition: <when material>

Do not expand every step mechanically; these are analytical lenses.

### Include / Branches / Extend

<Only supported alternatives, errors or extensions.>

### Invariants

<Scenario-level observable rules. Do not classify them as Domain automatically.>

### Postconditions / Observable Outcomes

<What the actor or another checked observer can verify. A successful Scenario result should meaningfully satisfy/resolve the Scenario Need.>

### Acceptance

<Only criteria already provided or directly entailed by accepted behavior.>

### Cross-Cutting Experience / Presentation / Visual Requirements — Optional

<Only requirements that genuinely span several flow points; keep step-local requirements near the relevant behavior.>

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
| Related Ideas / provenance | <narrow source links when useful> |
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
| Related Ideas / provenance | <narrow source links when useful> |
| Marker | CORE / ALT / EXT / VAR / RISK / DEFER / none |
| Definition owner | <file/section/registry reference> |

### Required Behavior

<One addressable unit of user-facing or externally verifiable behavior.>

Behavior Items are not implementation tasks, responsibility rows or Slices.

## 5. Manual Dependency Review Expectation

```text
related source / Idea / current-owner meaning changes
  → trace linked Scenario, DATA and Behavior Reference Objects
  → identify which definition owners may be affected
  → record review-needed state when the project tracks it
  → a user reviews and refreshes, confirms current,
    or removes/replaces the source relation.
```

This is a documentation review expectation. It does not assert that an automatic dependency runtime exists.

No automatic downstream rewrite and no automatic upstream Idea/current-owner mutation are implied.

## 6. Boundaries

```text
- Do not use this template automatically.
- Do not activate the specialized profile merely because
  a Planning Draft contains Scenarios.
- Do not require one physical file per Reference Object.
- Do not copy complete Idea/source bodies.
- Do not add common-but-unprovided DATA fields.
- Do not put Domain entities, aggregates, APIs, database schema,
  components or implementation seams into the clean Scenario Draft.
- Do not use `one Need = one Scenario`; require a meaningful result and use re-entry/reuse/lifecycle/testability only as supporting boundary signals.
- Do not promote every Behavior Item into a Scenario.
- Do not promote every Behavior Item into a Slice.
- Do not infer repository edit, archive, commit or push permission.
```
