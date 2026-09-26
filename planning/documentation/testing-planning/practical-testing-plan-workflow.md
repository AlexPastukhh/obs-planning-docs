# Practical Testing / Acceptance Plan Workflow

Status: historical compatibility workflow; current authority is in active IDTSPE Core/SDS owners
Former Owner Use Case: `UC-PLAN-TEST-PLAN` (retired; plan shape below is provenance, not a current command route)

## Result

A proportional practical verification plan for one meaningful application/change result, ready to be operated by a human, AI-operated environment or E2E/tool route.

Historically, Application SDS described this as a pre-implementation verification-planning responsibility after selected Scenario/Domain/Slice meaning was grounded. Current work follows the natural owner and the applicable Test-Proof / Practical Test route; a plan does not claim implementation or evidence already exists.

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

In the retired model, `UC-PLAN-TEST-PLAN` planned practical execution, `UC-PLAN-TEST-COVERAGE` reviewed evidence and `UC-PLAN-TEST-DESIGN` planned selected proof. These are historical roles, not current owners. Current selected product meaning stays upstream; actual proof and Evidence follow the applicable Core/SDS owners.
