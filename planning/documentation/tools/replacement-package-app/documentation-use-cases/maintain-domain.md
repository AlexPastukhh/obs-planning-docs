# DOC-UC-02 — Discover and maintain Domain from Behavior Items

### Goal

Derive coherent Domain semantics from Behavior Items while using durable Domain Implementation Items to protect current correctness, implementation quality and high-quality realization of materially known future evolution.

### Process

1. Start from Scenario/FI Behavior Items and inspect the Scenario's material Realization Dependencies; do not derive Domain ontology from current Java classes or Screen layout.
2. For each Realization Dependency, ask whether the open question/assumption is actually about semantic identity, state, invariant or consistency ownership. Investigate it here when it is Domain-relevant; otherwise leave it routed to Slice/Shared/source/infrastructure planning rather than inventing a Domain owner.
3. Identify business concepts, identities, states, relationships, invariants and consistency boundaries.
4. Prefer [Template — Aggregate Domain owner](../documentation-templates/domain.md#template-aggregate-domain-owner) when several concepts share one consistency/invariant boundary; use [Template — Domain Object owner](../documentation-templates/domain.md#template-domain-object-owner) separately only when independent semantics/lifecycle/reuse/rule volume makes that clearer.
5. List BI identities the Domain owner directly implements; keep BI authority in Scenario.
6. Add `DI-*` only for durable requirements not already obvious from BI/invariants.
7. A `DI-*` may be derived from current correctness, concrete semantic ownership/consistency pressure, implementation quality or materially known `Evolution Impact` that should later be realizable through expansion/composition rather than avoidable Forced Migration.
8. Do not implement future behavior prematurely merely because its known impact justifies a boundary/identity/ownership requirement now.
9. Analyze each relevant Scenario-owned Evolution Step and maintain this owner's `Evolution Impact` using [Template — Evolution Impact](../documentation-templates/evolution.md#template-evolution-impact) as future delta only: `Expansion`, useful behavior-preserving `Refactoring`, and exceptional `Forced Migration` where unavoidable/known.
10. If Impact analysis exposes avoidable future Forced Migration, reconsider current Domain boundaries and create/update the appropriate `DI-*`; do not duplicate that requirement in `Evolution Impact`.
11. Plan local Domain proof once semantics/invariants are selected. Aggregate tests normally prove implemented BI, material invariants and executable durable Domain requirements; use [Template — Test Item](../documentation-templates/proof.md#template-test-item) only for non-obvious proof quality.
12. When a credible executable proof boundary is known, write failing Domain proof before production implementation. Pure refactoring keeps relevant proof green.
13. Use `domain-evolution.md` only when one Evolution Step changes shared Domain meaning across several owners and one cross-owner view materially improves understanding.
14. When Domain/source investigation resolves or invalidates a Scenario Realization Dependency, update the Scenario-owned dependency with the Scenario-relevant conclusion. If the finding changes a required runtime algorithm/FI boundary, feed it back to Scenario design before finalizing Domain allocation.
15. After implementation, update current Domain truth and remove obsolete transition material only when compatibility is actually gone.

### Principles

- BI-first; Aggregate/consistency-boundary driven.
- `DI-*` is a durable architecture requirement, not a code trace.
- Good current implementation is checked against current BI/invariants **and** applicable DI requirements derived from materially known evolution.
- Known evolution may justify a seam now, not the future capability itself.
- Avoidable Forced Migration is architecture pressure to resolve rather than a preferred future plan.

### Owners used by this process

- Scenario owners as BI/Evolution Step authority;
- Aggregate/Domain Object owners;
- local Domain tests/test source as proof realization;
- `domain-evolution.md` only for materially useful cross-owner Domain transition views.

---
