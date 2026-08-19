# Functional Workflow Draft Template

Status: active reusable recommended template
Doc version: v1.0.0-solution-neutral
Purpose: one independently understandable and testable behavior line inside a candidate solution, workflow or current planning owner.

It is solution-neutral and may describe a real-world problem-resolution path that includes people, existing tools, services, integrations, an application, or unresolved solution points.

A Functional Workflow is not automatically:

```text
- a competing solution branch;
- a separate End-To-End Workflow;
- an implementation Slice;
- an application-only artifact.
```

## 1. Workflow Identity

| Field | Value |
|---|---|
| Workflow ID | <FW-XX> |
| Title | <title> |
| Parent current planning owner | <reference> |
| Status | candidate / active / validated / rejected / deferred |
| Related criteria / Ideas / decisions | <links> |

## 2. Valuable Outcome

<What useful outcome this workflow should produce and for whom or what.>

**Status:** candidate / confirmed / needs evidence

## 3. Trigger And Preconditions

**Trigger:** <what starts the workflow>

**Preconditions:** <what must already be true>

## 4. Inputs And Outputs

**Inputs:** <information/resources>

**Outputs:** <observable result>

## 5. End-To-End Behavior

### FW-STEP-01 — <name>

#### Observable Behavior

<What happens.>

#### Step Result

<Observable result.>

#### Local Questions / Problems / Risks — Optional

<Only applicable material.>

#### Decisions — Optional

<Local accepted or proposed decisions.>

#### What Must Be Tested — Optional

<Uncertainty and evidence need.>

#### Implementation Ideas — Optional

| Idea / ID | Thought | Source | Status | Test needed |
|---|---|---|---|---|
| <link> | <idea> | user / AI / checked source | open alternative | <test> |

Material unresolved implementation questions may use scoped Idea review/deep planning. They do not become accepted workflow meaning until selected and integrated.

---

### FW-STEP-02 — <name>

<Repeat as needed.>

## 6. Open Solution Slots — When Material

Use an `Open Solution Slot` only where the real-world workflow has a meaningful result gap but the mechanism that should fill it is not selected yet. A Slot is an addressable planning surface inside the Workflow, not a new semantic owner or mandatory stage.

### SLOT-<ID> — <meaningful result gap>

**Context / Before:** <what has already happened>

**User-world Need:** <what the person/system genuinely needs at this point>

**Available Inputs / Resources:** <what is available to solve it>

**Desired Output / Intermediate Result:** <what should be true when the Slot is filled>

**Constraints:** <when material>

**Continuation:** <what happens after the result>

**Relation To Primary Desired Result:** <why this intermediate result matters>

**Candidate Fills:**
- manual/process route;
- existing solution/tool/service;
- integration/automation;
- Application Concept;
- hybrid;
- another supported route.

Different Workflow Variants may place Slots differently, fill them differently, combine them or eliminate them by changing the workflow itself.

## 7. Workflow Acceptance Criteria — Optional

| ID / item | Criterion | Status | Evidence/test |
|---|---|---|---|
| FW-AC-01 | <criterion> | candidate | <reference> |

## 8. Related Objects, Resources Or Concepts — Optional

<Information entities, documents, services, environments or other resources involved.>

## 9. Relationships With Other Functional Workflows

| Related workflow | Relationship | Dependency/conflict | Coordination owner |
|---|---|---|---|
| <FW> | before / after / shares concept / conflicts / composes | <description> | parent current planning owner / local owner |

Cross-workflow decisions normally belong in the parent current planning owner or another explicitly selected shared owner.

Several Functional Workflows are not peer End-To-End Workflows merely because they are listed separately. A mandatory trigger-to-result route must remain reviewable as one complete workflow.

## 10. Existing Alternatives — Optional

Keep an alternative visible while it remains a realistic way to cover a Workflow Need/Slot. Do not discard a valid existing route merely because a custom Application Concept is also being explored.

| Alternative | Coverage | Limitation | Status |
|---|---|---|---|
| <alternative> | <coverage> | <limitation> | viable / rejected / needs-evidence |

A `viable` alternative remains part of whole-solution/Application Concept comparison until the relevant choice is resolved.

## 11. Tests And Evidence

| ID / link | Question/uncertainty | Test/evidence | Result | Decision affected |
|---|---|---|---|---|
| T-01 | <question> | <test> | proposed / supported / rejected / inconclusive | <decision> |

## 12. Questions / Risks / Problems — When Material

Use the shared Current-Plan-relative aggregate contract rather than maintaining a second workflow-specific issue model.

### Q/R/P-FW-<ID> — <finding title>

**Type:** Question / Risk / Problem

**Related Idea(s):** <when applicable; apply the shared Idea ↔ Q/R/P mirror/reference rule>

**Current Plan:** <current selected Workflow baseline>

**Finding:** <unresolved/adverse finding>

**Relation / Impact On Current Plan:** <why it still matters>

**Needed Resolution / Treatment:** <when useful>

**Blocking:** yes / no <when useful>

If none exist: `No material unresolved issues identified.`

## 13. Decisions

| ID / item | Decision | Rationale | Status | Reconsider when |
|---|---|---|---|---|
| D-01 | <decision> | <rationale> | proposed | <condition> |

## 14. Current Conclusion

<Current understanding of this behavior line.>

## 15. Next Action

<Next local analysis, test or review action.>

This template does not authorize repository edits, archive creation, commit or push.
