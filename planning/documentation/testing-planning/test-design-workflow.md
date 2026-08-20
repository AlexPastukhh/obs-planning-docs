# Test Design Workflow

Status: active reusable workflow
Owner Use Case: `UC-PLAN-TEST-DESIGN`

## Primary Rule

Tests exist to prove selected behavior/outcomes. Implementation details may be setup/action/observation mechanisms but do not become the reason for the test unless that low-level contract is itself selected meaning.

## Behavior-to-Test Trace

Use proportionally:

| Behavior / invariant / acceptance | Outcome proved | Test layer | Setup / action / observation mechanism | Required assertions | Escape risk | Refactor risk | Planned / actual evidence |
|---|---|---|---|---|---|---|---|

Required assertions are concrete. `success assertions`, `no-mutation assertions` or `covered by integration tests` are insufficient.

## Design Pass

1. Select the behavior/invariant/acceptance to prove.
2. State the observable outcome and important negative guarantees.
3. Choose the cheapest layer capable of proving it.
4. Separate precondition setup from behavior execution.
5. List concrete required assertions.
6. For failed commands, list no-mutation assertions.
7. Check Escape Risk.
8. Check Refactor Risk.
9. For repeatable commands, check idempotency/no-op behavior and duplicate-write prevention when selected.
10. Check whether paired cross-side proof is needed.
11. Add a focused regression guard when behavior depends materially on another owner/boundary.
12. Record what **not** to test here because another owner/layer proves it.
13. Keep Planned vs Actual evidence state explicit.

## Layer Selection Hints

- Domain: pure invariants/transitions/no-mutation.
- API/integration: auth/access/validation/orchestration/persistence/public contract/read-after-command.
- Component/page: visible UI states/validation/errors/accessibility/pending/success.
- E2E: critical real actor path across layers where wiring/session/navigation/persistence matters.
- Contract/generated: drift support only.

## Read vs State-Changing Behavior

Read/query proof emphasizes projection correctness, access/filtering and absence of unintended mutation when material. State-changing command proof emphasizes state before/after, persisted outcome and no partial mutation on rejection/failure.
