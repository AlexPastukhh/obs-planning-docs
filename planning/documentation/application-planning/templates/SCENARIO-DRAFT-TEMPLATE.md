# Scenario Draft Template

Status: active reusable recommended template
Purpose: draft one current application Scenario after Application responsibility is justified. A temporary Spine Scenario may be used before stable boundaries exist.

Detailed workspace contract: [`../detailed-planning/README.md`](../detailed-planning/README.md)

Blank fields are not requirements. Use only supported meaning.

## Workspace Shape

A detailed Scenario Draft uses:

```text
SCN-X/
├── README.md
├── scenario.md
├── ideas/
├── data/
├── behavior/
└── visual/
```

Use neutral `.gitkeep` placeholders for empty required structural directories. Shared meaning for several Scenarios belongs in the parent `scenario-drafts/{ideas|data|behavior|visual}/` area.

The current selected Scenario owner/Variant owns current detailed behavior. While the root design is selected, that owner is the root Scenario file; if a nested integrated Variant becomes selected, that Variant's Scenario file becomes the current behavioral owner. `README.md` routes workspace navigation to exactly one current selected Scenario owner/Variant.

## Scenario

| Field | Value |
|---|---|
| Scenario ID | <stable ID> |
| Title | <title> |
| Status | preliminary / reviewed / accepted-current / needs-review |
| Actor / context | <actor/context> |
| Starting situation / state | <when material> |
| Motivational trigger | <why now when material> |
| Need / motivation | <meaningful user Need> |
| Goal / intent | <goal> |
| Observable result | <meaningful result> |
| Related Application Use Case | <UC> |
| Related Ideas / provenance | <when useful> |

### Actor Understanding / Plan
<Initial Understanding, Goal/Path Understanding, Important Unknowns, Required Understanding and Current Plan/Expectation only when material.>

### Entry Points
<Application entry/re-entry; do not conflate with Motivational Trigger.>

### Preconditions
<Only supported preconditions.>

### Main Flow
1. <observable behavior>
   - Surface / Screen: <reference canonical Screen when material>
   - Relevant DATA / Information: <reference Scenario/shared DATA owner when material>
   - Actor Understanding: <when material>
   - Desired User Response: <when material>
   - System Response / State Change: <when material>
   - Presentation / Visual Requirement: <reference visual/Screen owner when material>
   - Result / Transition: <when material>

### Branches / Includes / Extensions
<Supported runtime alternatives/errors/extensions. A runtime Branch is not a Planning Unit Variant.>

### Invariants
<Observable Scenario-level rules.>

### Postconditions / Observable Outcomes
<Successful result should meaningfully satisfy/resolve the Need.>

### Acceptance
<Only accepted/directly entailed criteria.>

### Scenario DATA References
<Link Scenario-local or shared DATA owners. DATA is user-visible/scenario-relevant meaning, not implementation schema by default.>

### Behavior Item References
<Link stable addressable Behavior Items. Behavior Items are not implementation tasks/Slices.>

### Visual / Screen References
<Link Scenario-specific `visual/` material and canonical `screens/` owners when relevant.>

## Current Decisions

### D-SCN-<id> — <decision title>

**Decision:** <selected meaning>

**Rationale:** <why selected when material>

**Related Idea / Variant:** <when applicable>

**Integrated Into:** <sections/owners where selected meaning is now expressed>

**Affected Owners:** <owners needing review when material>

**Reconsider When:** <only when a real trigger exists>

## Questions / Risks / Problems

### Q/R/P-SCN-<id> — <finding title>

**Type:** Question / Risk / Problem

**Related Idea:** <when applicable>

**Current Draft Plan:** <relevant selected Scenario baseline; may reference section/range>

**Finding:** <unresolved/adverse finding>

**Relation / Impact On Current Draft Plan:** <how the finding affects the baseline>

**Needed Resolution / Treatment:** <when applicable>

**Fallback:** <only when real>

**Fallback Relation:** fallback only; not Current Draft Plan

**Blocking:** yes / no <when useful>

When none exist, write exactly:

`No material unresolved issues identified.`

## Potential Simplifications / Better Routes — When Material

### BR-SCN-<id> — <candidate title>

**Related Idea:** <when applicable>

**Current Draft Plan:** <current selected baseline>

**Candidate Better Route:** <unselected candidate>

**Change To Current Draft Plan:** <what would change>

**Why Potentially Better:** <reason>

**Tradeoff / Evidence:** <when material>

**Status:** candidate / unresolved / needs-decision

## Boundary Rules

A separate Scenario normally requires meaningful user Need + independently meaningful observable result. Re-entry/reuse/wait/handoff/testability are supporting signals, not mandatory checklist fields. Spine is temporary scaffolding and is not a permanent entity type.

When a materially distinct whole-Scenario design appears, use the Variant rules in the detailed-planning owner. Do not turn ordinary runtime branches or one local Idea Variant into whole-Scenario Variants mechanically.
