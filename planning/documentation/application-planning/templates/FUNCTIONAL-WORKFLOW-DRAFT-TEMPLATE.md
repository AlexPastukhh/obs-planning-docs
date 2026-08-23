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

#### Local Planning Concerns / Q/R/P — Optional

<Use the shared Concern model for applicable material concerns; group by one resolution surface when related.>

#### Decisions — Optional

<Selected local Decisions only; Recommendation remains separate. Use generic Decision trace fields when material.>

#### What Must Be Tested — Optional

<Uncertainty and evidence need.>

#### Implementation Ideas — Optional

| Idea / ID | Thought | Source | Status | Test needed |
|---|---|---|---|---|
| <link> | <idea> | user / AI / checked source | open alternative | <test> |

Material unresolved implementation questions may use scoped Idea review/deep planning. They do not become accepted workflow meaning until selected and integrated.

#### Requirement / Change Context Findings — Optional

<Record candidate/shared Requirements or evidence-backed likely Change Axes discovered here when they materially affect later application/domain/implementation planning. A Change Axis is not a Requirement to generalize now. Early implementation thoughts remain generic Ideas until selected.>

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

## 12. Planning Concerns / Q/R/P — When Material

Use the shared `../../planning-concerns-and-decisions-model.md`; do not maintain a workflow-specific issue ontology.

```markdown
### CG/Q/R/P-FW-<ID> — <title>
**Type:** Question / Risk / Problem <!-- member only -->
**Priority:** P0/Critical | P1/High | P2/Normal | P3/Low
**Concern Category:** <primary category>
**Status:** <current status>
**Owner / affected meaning:** <workflow/Scenario/other owner>
**Current Plan:** <selected Workflow baseline>
**Finding / Shared Resolution Surface:** <current concern>
**AI Comment:** <known/options/justified preference/user-owned unknown/minimum useful question>
**Recommendation:** <optional>
**Decision refs / residual state:** <when material>
**Stored At:** <when routed elsewhere>
```

Related Ideas reference the canonical Concern/Group location rather than full mirrors. If none: `No material unresolved issues identified.`

## 13. Decisions

| ID / item | Decision | Rationale | Integrated Into | Addresses / Introduced Concerns — when useful | Reconsider when |
|---|---|---|---|---|---|
| D-01 | <selected decision> | <rationale> | <owner/section> | <concern refs> | <condition> |

## 14. Current Conclusion

<Current understanding of this behavior line.>

## 15. Next Action

<Next local analysis, test or review action.>

This template does not authorize repository edits, archive creation, commit or push.
