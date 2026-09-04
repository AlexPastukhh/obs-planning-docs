# DOC-UC-12 — Plan and realize credible proof

### Goal

Derive credible proof from selected semantic/implementation meaning, make test-first realization the default when a credible executable boundary is known, and separate local proof, shared Test Strategy, reusable Shared Test Capabilities and Practical Evidence without making tests a second behavior authority.

### Process

1. Start from the owning semantic/implementation requirement: BI, invariant, Screen/UI requirement, DI/SI/shared item or focused contract. Tests prove selected meaning; they do not create it.
2. Choose the cheapest credible proof layer. Keep exhaustive Domain matrices at Domain level; Slice/application tests prove orchestration/use of Domain at the correct public boundary; use critical E2E only when lower layers cannot establish the integrated property.
3. Keep local Tests with the natural Aggregate/Slice/Shared Implementation Capability owner by default. A separate test owner/file is optional only when independent depth/reuse/review warrants it; then explicitly reference parent owner and properties proved.
4. Add a [Template — Test Item](../documentation-templates/proof.md#template-test-item) only when proof needs non-obvious durable quality requirements such as no-mutation observation, public-boundary execution, persisted-state observation, false-positive resistance, isolation, failure injection or refactor/evolution resilience.
5. When selected meaning and a credible executable proof boundary are known, use test-first production realization: failing proof → implementation → green → behavior-preserving refactor.
6. Pure refactoring keeps relevant proof green; do not create artificial Red. For Forced Migration, strengthen/preserve proof of unchanged behavior and add failing proof only for genuinely new/changed meaning.
7. If the question “how can this property be proved convincingly?” is independently non-trivial, use [Template — Optional Test Design](../documentation-templates/proof.md#template-test-design). Embed it locally by default; create a separate artifact only when independently substantial.
8. If technical/interaction/proof feasibility is genuinely unknown, use an experiment/prototype/spike to learn, then return to normal test-first production realization. Experimental code is not accepted only because it works.
9. Maintain `testing-plan.md` as shared Test Strategy only for real cross-owner pressure: proof-layer allocation/non-duplication, shared environment/isolation, critical E2E or Practical Acceptance boundaries. During migration it may temporarily retain current Slice→proof mapping until local owners are reconciled.
10. Create a Shared Test Capability using [Template — Shared Test Capability](../documentation-templates/proof.md#template-shared-test-capability) only for real reusable test machinery/behavior consumed by several suites; common testing policy stays in Test Strategy.
11. For real Windows/Swing/Edge/ChatGPT/usability/environment properties that require an implemented subject, use [Template — Practical Acceptance plan and Evidence](../documentation-templates/proof.md#template-practical-acceptance): plan Practical Acceptance before implementation when useful, then execute after realization and record Evidence. Planned verification is not executed Evidence.
12. Keep exact test classes/methods/fixtures in test source; documentation owns only durable proof meaning/strategy/items where useful.

### Principles

- Test-first is default when selected meaning + credible executable boundary are known.
- Tests prove meaning; they do not become semantic authority.
- Test Item = proof-quality requirement, not production architecture requirement.
- Test Strategy = shared proof policy; Shared Test Capability = reusable test implementation responsibility.
- More tests do not automatically mean stronger proof; avoid duplication and false confidence.

---
