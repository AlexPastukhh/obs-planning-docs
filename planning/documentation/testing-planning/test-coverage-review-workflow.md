# Current Test Coverage / Evidence Review Workflow

Status: active reusable workflow
Owner Use Case: `UC-PLAN-TEST-COVERAGE`

## Purpose

Determine whether **actual current** tests/checks/manual acceptance prove current selected meaning. A plan, test filename or historical statement is not coverage evidence.

## Algorithm

1. Resolve current semantic owners and current selected behavior/invariants/requirements.
2. Inspect actual current test/check/evidence artifacts.
3. Map selected behavior → actual evidence.
4. Classify each mapping: strong / partial / missing / stale / duplicated / wrong-layer / not checked.
5. Review Required Assertions actually present.
6. Review no-mutation proof for rejected state-changing paths.
7. Evaluate Escape Risk and Refactor Risk.
8. Check that E2E is critical-path proof rather than duplicated exhaustive detail.
9. Check test data/order/isolation assumptions.
10. Distinguish implemented/current from last executed/passed/manual-acceptance state.
11. Produce corrections or Test Design handoff without rewriting semantic owners from tests.
