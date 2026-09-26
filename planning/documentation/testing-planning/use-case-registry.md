# Testing Planning Use-Case Registry

Status: historical compatibility registry; not mapped by current methodology Use-Case routing

Current routing: generic proof evaluation is owned by `LENS-TEST-PROOF-EVIDENCE`; literal realization uses the applicable Code/Exact Realization owner; real implemented-subject Evidence uses `TM-PRACTICAL-TEST` when warranted. Methodology relations are reviewed against current owner declarations without an automated methodology-integrity guarantee.

| ID | Name | Status | Purpose | Trigger / input | Result / end state | Boundaries | Main owner | Related command |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `UC-PLAN-TEST-STRATEGY` | Establish / Review Testing Strategy | retired / subsumed | establish shared/cross-Slice proof responsibilities and avoid duplicated/missing coverage | testing responsibility spans several Slices/layers or shared harness/data/isolation/E2E policy materially matters | current testing strategy + layer responsibilities + shared proof/data/isolation boundaries | not one test per behavior and not semantic authority for product behavior | `testing-strategy-workflow.md` | `стратегия тестирования` |
| `UC-PLAN-TEST-DESIGN` | Plan / Review Verification For Selected Behavior | retired / subsumed | decide how selected Scenario/Requirement/Domain/Slice behavior will be convincingly proved | selected behavior is understood enough to design proof | Behavior-to-Test Trace + selected layers + concrete assertions + risk/boundary decisions | planned evidence ≠ implemented/executed evidence; Slice/semantic owners keep their meaning | `test-design-workflow.md` | `спланируй проверку поведения` |
| `UC-PLAN-TEST-COVERAGE` | Review Current Test Coverage / Evidence | retired / subsumed | check whether actual current tests/evidence really prove current selected meaning | current tests/evidence must be trusted, changed or audited | behavior→actual-evidence mapping + missing/weak/stale/duplicated/wrong-layer findings | must inspect actual evidence; plans/names do not prove coverage | `test-coverage-review-workflow.md` | `проверь тестовое покрытие` |
| `UC-PLAN-TEST-PLAN` | Plan Practical Testing / Acceptance | retired / subsumed | assemble a practical operated proof plan for one meaningful application/change result across selected behaviors | selected behavior/proof choices are grounded enough that a real practical verification pass or campaign is useful | Practical Testing Plan with acceptance cards, operator/environment/setup/actions/evidence/pass-fail and campaign scope when needed | plan is not executed evidence; it composes selected Strategy/Design meaning and does not redefine product behavior | `practical-testing-plan-workflow.md` | `план практического тестирования` |

## Historical Testing Plan Contract

The retired Testing UCs previously used a proportional project-local Testing Plan projection. In that historical model, `UC-PLAN-TEST-PLAN` was described as owning the practical operated-plan result:

- Strategy owns shared proof/layer/data/isolation policy;
- Design owns Behavior-to-Test proof choices for selected meaning;
- Practical Test Plan composes selected proofs into operated acceptance cards/campaigns with operator/setup/action/evidence/pass-fail;
- Coverage audits actual executed evidence against the current selected plan.

The four former UCs and [`templates/TESTING-PLAN-TEMPLATE.md`](templates/TESTING-PLAN-TEMPLATE.md) remain available for compatibility/provenance. They are not current invocation or ownership routes. For current proof work, follow the [Testing Planning README](README.md#current-route) to active Core/SDS owners.

Planned proof, implemented test and executed evidence remain distinct states.
