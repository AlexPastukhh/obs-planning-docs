# DOC-UC-12 — Plan and realize credible proof

### Goal

Derive credible proof requirements from selected semantic/implementation meaning, use Proof Requirements Discovery as an explicit implementation-design feedback channel, make test-first realization the default when a credible executable boundary is known, and separate local proof, shared Test Strategy, reusable Shared Test Capabilities and Practical Evidence without making tests a second behavior authority.

### Process

1. Start from the owning semantic/implementation requirement: BI, invariant, Screen/UI requirement, DI/SI/shared item or focused contract. Tests prove selected meaning; they do not create semantic truth.
2. Choose the cheapest credible proof layer. Keep exhaustive Domain matrices at Domain level; Slice/application tests prove orchestration/use of Domain at the correct public boundary; use critical E2E only when lower layers cannot establish the integrated property.
3. Keep local Tests/Test Items with the natural Aggregate/Slice/Shared Implementation Capability **semantic owner** by default. A focused physical test document is allowed when useful; physical separation does not automatically create a new semantic owner.
4. Run the applicable [Proof Requirements Discovery questions](requirements-discovery/proof/proof.md) explicitly: correct proof, bug escape, false confidence/wrong boundary, false failures/excessive coupling, refactoring resilience, evolution resilience, deterministic failure/uncertainty/forbidden mutation, proof maintainability and proof-strategy placement.
5. For every **material selected answer**, classify what it requires rather than where the question came from. Additional proof-quality/form requirement → Test Item. Production-realization requirement → Implementation Item in the appropriate Domain/Slice/Shared owner. One answer may create both. `N/A`, no additional requirement and discarded candidates create no Item. Inspect relevant [Pattern Registry](patterns/REGISTRY.md) candidates when useful.
6. Treat Proof Requirements Discovery as a first-class implementation-design feedback channel. If convincing proof is difficult because of a poor production boundary, hidden side effects, nondeterminism, unobservable state, hard-coded external interaction, excessive coupling or an over-generic application interface, first reconsider the production realization rather than compensating with a weak/fragile test. Testability alone does not automatically justify extra abstraction; only a material selected production requirement becomes an Implementation Item.
7. Follow related Implementation Requirements Discovery questions when proof exposes production pressure; conversely accept Test Items exposed by Implementation Requirements Discovery. Continue cross-discovery until the selected realization/proof decision is coherent.
8. Put coupled Items in an [Item Group](../documentation-templates/implementation.md#template-item-group). When a proof answer creates an Implementation Item needed by the same proof requirement, or an implementation answer creates a dependent Test Item, group those Items by default. A material change to any member makes the **whole group** review-relevant; retain/revise/remove each member after review rather than automatically invalidating all.
9. Use [Template — Test Item](../documentation-templates/proof.md#template-test-item) only when proof needs a material additional durable requirement beyond the tested semantic/implementation requirement itself.
10. When selected meaning and a credible executable proof boundary are known, use test-first production realization: failing proof → implementation → green → behavior-preserving refactor.
11. Pure refactoring keeps relevant proof green; do not create artificial Red. For Forced Migration, strengthen/preserve proof of unchanged behavior and add failing proof only for genuinely new/changed meaning.
12. If the question “how can this property be proved convincingly?” remains independently non-trivial after Requirements Discovery, use [Template — Optional Test Design](../documentation-templates/proof.md#template-test-design). Embed locally by default; create a separate artifact only when independently substantial.
13. If technical/interaction/proof feasibility is genuinely unknown, use an experiment/prototype/spike to learn, then return to normal test-first production realization. Experimental code is not accepted only because it works.
14. Maintain `testing-plan.md` as shared Test Strategy only for real cross-owner pressure: proof-layer allocation/non-duplication, shared environment/isolation, critical E2E or Practical Acceptance boundaries. T9 routes cross-owner decisions here rather than duplicating them into every owner.
15. Create a Shared Test Capability using [Template — Shared Test Capability](../documentation-templates/proof.md#template-shared-test-capability) only for real reusable test machinery/behavior consumed by several suites; common testing policy stays in Test Strategy.
16. For real Windows/Swing/Edge/ChatGPT/usability/environment properties that require an implemented subject, use [Template — Practical Acceptance plan and Evidence](../documentation-templates/proof.md#template-practical-acceptance): plan before implementation when useful, execute after realization and record Evidence. Planned verification is not executed Evidence.
17. Keep exact test classes/methods/fixtures in test source; documentation owns only durable proof meaning/strategy/items where useful.

### Principles

- Test-first is default when selected meaning + credible executable boundary are known.
- Tests prove meaning; they do not become semantic authority.
- Test Item = selected durable additional proof requirement; it does not itself own production structure.
- Proof Requirements Discovery may create Implementation Items; Implementation Requirements Discovery may create Test Items.
- Coupled production/proof Items are grouped; material change to any member triggers review of the whole group.
- Test Strategy = shared proof policy; Shared Test Capability = reusable test implementation responsibility.
- More tests do not automatically mean stronger proof; avoid duplication and false confidence.

---
