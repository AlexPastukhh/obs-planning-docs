# Functional Workflow Draft Template

Status: active reusable recommended template
Doc version: v1.0.0-solution-neutral
Purpose: one independently understandable and testable behavior line inside a candidate solution, workflow or Planning Draft.

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
| Parent Planning Draft | <reference> |
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

## 6. Workflow Acceptance Criteria — Optional

| ID / item | Criterion | Status | Evidence/test |
|---|---|---|---|
| FW-AC-01 | <criterion> | candidate | <reference> |

## 7. Related Objects, Resources Or Concepts — Optional

<Information entities, documents, services, environments or other resources involved.>

## 8. Relationships With Other Functional Workflows

| Related workflow | Relationship | Dependency/conflict | Coordination owner |
|---|---|---|---|
| <FW> | before / after / shares concept / conflicts / composes | <description> | parent Planning Draft / local owner |

Cross-workflow decisions normally belong in the parent Planning Draft or another explicitly selected shared owner.

Several Functional Workflows are not peer End-To-End Workflows merely because they are listed separately. A mandatory trigger-to-result route must remain reviewable as one complete workflow.

## 9. Existing Alternatives — Optional

| Alternative | Coverage | Limitation | Status |
|---|---|---|---|
| <alternative> | <coverage> | <limitation> | open |

## 10. Tests And Evidence

| ID / link | Question/uncertainty | Test/evidence | Result | Decision affected |
|---|---|---|---|---|
| T-01 | <question> | <test> | proposed / supported / rejected / inconclusive | <decision> |

## 11. Questions

| ID / item | Question | Priority | Blocking | Status | Answer |
|---|---|---:|---:|---|---|
| Q-01 | <question> | high | no | open | <answer> |

## 12. Decisions

| ID / item | Decision | Rationale | Status | Reconsider when |
|---|---|---|---|---|
| D-01 | <decision> | <rationale> | proposed | <condition> |

## 13. Current Conclusion

<Current understanding of this behavior line.>

## 14. Next Action

<Next local analysis, test or review action.>

This template does not authorize repository edits, archive creation, commit or push.
