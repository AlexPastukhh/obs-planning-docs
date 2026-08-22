# Testing Planning Use-Case Registry

Status: active reusable-family semantic registry
Parent Direction: [`direction-registry.md`](direction-registry.md)

| ID | Name | Status | Parent Direction | Purpose | Trigger / input | Result / end state | Boundaries | Main owner |
|---|---|---|---|---|---|---|---|---|
| `UC-PLAN-TEST-STRATEGY` | Establish / Review Testing Strategy | active proportional | `DIR-PLAN-TESTING` | establish shared/cross-Slice proof responsibilities and avoid duplicated/missing coverage | testing responsibility spans several Slices/layers or shared harness/data/isolation/E2E policy materially matters | current testing strategy + layer responsibilities + shared proof/data/isolation boundaries | not one test per behavior and not semantic authority for product behavior | `testing-strategy-workflow.md` |
| `UC-PLAN-TEST-DESIGN` | Plan / Review Verification For Selected Behavior | active proportional | `DIR-PLAN-TESTING` | decide how selected Scenario/Requirement/Domain/Slice behavior will be convincingly proved | selected behavior is understood enough to design proof | Behavior-to-Test Trace + selected layers + concrete assertions + risk/boundary decisions | planned evidence ≠ implemented/executed evidence; Slice/semantic owners keep their meaning | `test-design-workflow.md` |
| `UC-PLAN-TEST-COVERAGE` | Review Current Test Coverage / Evidence | active proportional | `DIR-PLAN-TESTING` | check whether actual current tests/evidence really prove current selected meaning | current tests/evidence must be trusted, changed or audited | behavior→actual-evidence mapping + missing/weak/stale/duplicated/wrong-layer findings | must inspect actual evidence; plans/names do not prove coverage | `test-coverage-review-workflow.md` |

## Shared Testing Plan Contract

The Testing UCs may read/write a proportional project-local Testing Plan projection:

- Strategy owns shared proof/layer/data/isolation policy;
- Design owns Behavior-to-Test / Practical-Acceptance proof choices for selected meaning;
- Coverage audits actual executed evidence against the current selected plan.

Planned proof, implemented test and executed evidence remain distinct states.
