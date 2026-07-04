# Functional Workflow Draft Template

Status: provisional reusable recommended template
Purpose: one independently understandable and testable behavior line inside the same candidate application or solution.

A functional workflow is not a competing solution branch and is not yet an implementation slice.

## 1. Workflow Identity

| Field | Value |
|---|---|
| Workflow ID | <FW-XX> |
| Title | <title> |
| Parent/root draft | <reference> |
| Status | candidate / active / validated / rejected / deferred |
| Related app-level criteria | <AC IDs> |

## 2. Valuable User Outcome

<What useful outcome this workflow should produce.>

**Status:** candidate / confirmed / needs evidence

## 3. Trigger And Preconditions

**Trigger:** <what starts the workflow>

**Preconditions:** <what must already be true>

## 4. Inputs And Outputs

**Inputs:** <information/resources>

**Outputs:** <observable result>

## 5. End-To-End Behavior

### FW-STEP-01 — <name>

#### User/System Behavior

<What happens.>

#### Step Result

<Observable result.>

#### Local Questions / Problems / Risks — Optional

<Only applicable material.>

#### Decisions — Optional

<Local accepted/proposed decisions.>

#### What Must Be Tested — Optional

<uncertainty and evidence>

#### Implementation Thoughts / Future Implementation Notes — Optional

| ID | Thought | Source | Status | Test needed |
|---|---|---|---|---|
| IT-01 | <idea> | user / AI / source | open alternative | <test> |

---

### FW-STEP-02 — <name>

<Repeat as needed.>

## 6. Workflow Acceptance Criteria

| ID | Criterion | Status | Evidence/test |
|---|---|---|---|
| FW-AC-01 | <criterion> | candidate | <reference> |

## 7. Related Objects, Resources Or Concepts — Optional

<Information entities, documents, services, environments or other resources involved.>

## 8. Relationships With Other Functional Workflows

| Related workflow | Relationship | Dependency/conflict | Coordination owner |
|---|---|---|---|
| <FW> | before / after / shares concept / conflicts / composes | <description> | root / local |

Cross-workflow decisions normally belong in the application root draft.

## 9. Existing Alternatives — Optional

| Alternative | Coverage | Limitation | Status |
|---|---|---|---|
| <alternative> | <coverage> | <limitation> | open |

## 10. Tests And Evidence

| ID | Question/uncertainty | Test/evidence | Result | Decision affected |
|---|---|---|---|---|
| T-01 | <question> | <test> | proposed / supported / rejected / inconclusive | <decision> |

## 11. Questions

| ID | Question | Priority | Blocking | Status | Answer |
|---|---|---:|---:|---|---|
| Q-01 | <question> | high | no | open | <answer> |

## 12. Decisions

| ID | Decision | Rationale | Status | Reconsider when |
|---|---|---|---|---|
| D-01 | <decision> | <rationale> | proposed | <condition> |

## 13. Current Conclusion

<Current understanding of this behavior line.>

## 14. Next Action

<Next local analysis/test/review action.>
