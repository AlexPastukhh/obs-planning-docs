# Testing Planning Use-Case Registry

Status: active reusable-family semantic registry
Parent Direction: [`direction-registry.md`](direction-registry.md)

| ID | Name | Status | Purpose | Trigger / input | Result / end state | Boundaries | Main owner |
|---|---|---|---|---|---|---|---|
| `UC-PLAN-TEST-STRATEGY` | Establish / Review Testing Strategy | active proportional | establish shared/cross-Slice proof responsibilities and avoid duplicated/missing coverage | testing responsibility spans several Slices/layers or shared harness/data/isolation/E2E policy materially matters | current testing strategy + layer responsibilities + shared proof/data/isolation boundaries | not one test per behavior and not semantic authority for product behavior | `testing-strategy-workflow.md` |
| `UC-PLAN-TEST-DESIGN` | Plan / Review Verification For Selected Behavior | active proportional | decide how selected Scenario/Requirement/Domain/Slice behavior will be convincingly proved | selected behavior is understood enough to design proof | Behavior-to-Test Trace + selected layers + concrete assertions + risk/boundary decisions | planned evidence ≠ implemented/executed evidence; Slice/semantic owners keep their meaning | `test-design-workflow.md` |
| `UC-PLAN-TEST-COVERAGE` | Review Current Test Coverage / Evidence | active proportional | check whether actual current tests/evidence really prove current selected meaning | current tests/evidence must be trusted, changed or audited | behavior→actual-evidence mapping + missing/weak/stale/duplicated/wrong-layer findings | must inspect actual evidence; plans/names do not prove coverage | `test-coverage-review-workflow.md` |
