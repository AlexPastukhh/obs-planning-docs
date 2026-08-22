# Practical Testing / Acceptance Plan Workflow

Status: active reusable workflow
Owner Use Case: `UC-PLAN-TEST-PLAN`

## Result

A proportional practical verification plan for one meaningful application/change result, ready to be operated by a human, AI-operated environment or E2E/tool route.

```text
selected Scenario / Requirements / Domain / Slice meaning
+ Testing Strategy when shared policy matters
+ Behavior-to-Test proof choices when already designed
→ select the practical result/path worth exercising
→ choose representative properties + negative guarantees
→ choose operator/environment/setup/data
→ define actions + observable evidence + pass/fail
→ group variants/environments into a campaign only when useful
→ Practical Testing Plan
```

## Practical Acceptance Card

For each material operated proof use, proportionally:

- target property / negative guarantee;
- related Scenario / Requirement / Slice owner;
- operator: `human | AI | E2E/tool`;
- environment / setup / data;
- action/path;
- observable evidence;
- pass/fail rule;
- execution state: `planned | executed-pass | executed-fail | stale`.

Do not create a card for every trivial assertion. Prefer a few representative end-to-end or operated checks that prove the meaningful result and its important negative guarantees.

## Boundary

`UC-PLAN-TEST-PLAN` plans practical execution. It does not claim execution happened. `UC-PLAN-TEST-COVERAGE` reviews actual executed/current evidence. `UC-PLAN-TEST-DESIGN` still owns how one selected behavior is best proved; the Practical Testing Plan composes those proof choices into a real operated pass/campaign. Product semantics remain upstream.
