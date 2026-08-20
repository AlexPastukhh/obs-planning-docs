# Testing Strategy Workflow

Status: active reusable workflow
Owner Use Case: `UC-PLAN-TEST-STRATEGY`

## Algorithm

1. Establish selected semantic owners and material risk/correctness goals.
2. Identify shared/cross-Slice proof responsibilities.
3. Assign Domain/API/component/E2E/contract/manual-acceptance responsibilities proportionally.
4. Define what must not be redundantly re-proved at every layer.
5. Define test-data, fixture, reset, environment and concurrency/isolation strategy when material.
6. Define shared harness/object/helper boundaries without hiding Scenario outcomes.
7. Define critical cross-layer E2E paths and explicit non-E2E coverage boundaries.
8. Define evidence states/reporting: planned, implemented, checked-current, executed/passed, manual acceptance.
9. Record material gaps/risks/revisit triggers.

A project-local testing owner/workspace is justified when this responsibility becomes independently cross-Slice; trivial projects can keep strategy inline.
