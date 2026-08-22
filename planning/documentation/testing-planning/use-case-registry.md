# Testing Planning Use-Case Registry

Status: active reusable-family semantic registry
Parent Direction: [`direction-registry.md`](direction-registry.md)

| ID | Name | Status | Parent Direction | Purpose | Trigger / input | Result / end state | Boundaries | Main owner |
|---|---|---|---|---|---|---|---|---|
| `UC-PLAN-TEST-STRATEGY` | Establish / Review Testing Strategy | active proportional | `DIR-PLAN-TESTING` | establish shared/cross-Slice proof responsibilities and avoid duplicated/missing coverage | testing responsibility spans several Slices/layers or shared harness/data/isolation/E2E policy materially matters | current testing strategy + layer responsibilities + shared proof/data/isolation boundaries | not one test per behavior and not semantic authority for product behavior | `testing-strategy-workflow.md` |
| `UC-PLAN-TEST-DESIGN` | Plan / Review Verification For Selected Behavior | active proportional | `DIR-PLAN-TESTING` | decide how selected Scenario/Requirement/Domain/Slice behavior will be convincingly proved | selected behavior is understood enough to design proof | Behavior-to-Test Trace + selected layers + concrete assertions + risk/boundary decisions | planned evidence ≠ implemented/executed evidence; Slice/semantic owners keep their meaning | `test-design-workflow.md` |
| `UC-PLAN-TEST-COVERAGE` | Review Current Test Coverage / Evidence | active proportional | `DIR-PLAN-TESTING` | check whether actual current tests/evidence really prove current selected meaning | current tests/evidence must be trusted, changed or audited | behavior→actual-evidence mapping + missing/weak/stale/duplicated/wrong-layer findings | must inspect actual evidence; plans/names do not prove coverage | `test-coverage-review-workflow.md` |
| `UC-PLAN-TEST-PLAN` | Plan Practical Testing / Acceptance | active proportional | `DIR-PLAN-TESTING` | assemble a practical operated proof plan for one meaningful application/change result across selected behaviors | selected behavior/proof choices are grounded enough that a real practical verification pass or campaign is useful | Practical Testing Plan with acceptance cards, operator/environment/setup/actions/evidence/pass-fail and campaign scope when needed | plan is not executed evidence; it composes selected Strategy/Design meaning and does not redefine product behavior | `practical-testing-plan-workflow.md` |

## Shared Testing Plan Contract

The Testing UCs may read/write a proportional project-local Testing Plan projection. `UC-PLAN-TEST-PLAN` owns the practical operated-plan result when that result is independently useful:

- Strategy owns shared proof/layer/data/isolation policy;
- Design owns Behavior-to-Test proof choices for selected meaning;
- Practical Test Plan composes selected proofs into operated acceptance cards/campaigns with operator/setup/action/evidence/pass-fail;
- Coverage audits actual executed evidence against the current selected plan.

Planned proof, implemented test and executed evidence remain distinct states.
