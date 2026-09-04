# DOC-UC-02 — Discover and maintain Domain from Behavior Items

### Goal

Derive coherent Domain semantics from Behavior Items, then use explicit Requirements Discovery to derive only the durable Domain Implementation Items and Test Items needed for correct, technically adequate, maintainable and evolution-aware realization.

### Process

1. Start from Scenario/FI Behavior Items and inspect the Scenario's material Realization Dependencies; do not derive Domain ontology from current Java classes or Screen layout.
2. For each Realization Dependency, ask whether the open question/assumption is actually about semantic identity, state, invariant or consistency ownership. Investigate it here when it is Domain-relevant; otherwise leave it routed to Slice/Shared/source/infrastructure planning rather than inventing a Domain owner.
3. Identify business concepts, identities, states, relationships, invariants and consistency boundaries. Use the [Domain-specific Implementation Requirements Discovery questions](requirements-discovery/implementation/domain.md) when choosing Aggregate/Object boundaries and other Domain realization decisions.
4. Prefer [Template — Aggregate Domain owner](../documentation-templates/domain.md#template-aggregate-domain-owner) when several concepts share one consistency/invariant boundary; use [Template — Domain Object owner](../documentation-templates/domain.md#template-domain-object-owner) separately only when independent semantics/lifecycle/reuse/rule volume makes that clearer.
5. List BI identities the Domain owner directly implements; keep BI authority in Scenario. Do not restate BI/invariants as Domain Implementation Items.
6. Run the applicable [common Implementation Requirements Discovery](requirements-discovery/implementation/common.md) together with the Domain-specific questions. Start from current correct realization and real technical requirements; also check maintainability/cognitive simplicity, known evolution-chain fitness and testability/observability. Inspect relevant [Pattern Registry](patterns/REGISTRY.md) entries when they provide useful candidate answers.
7. Classify every **material selected answer** by what it requires. A production-realization requirement becomes a `DI-*`; an additional proof requirement becomes a Test Item; one answer may create both. `N/A`, no additional requirement, rejected candidates and transient notes create no Item. Use [Template — Implementation Item](../documentation-templates/implementation.md#template-implementation-item) for durable DI meaning.
8. Analyze each relevant Scenario-owned Evolution Step and maintain this owner's `Evolution Impact` using [Template — Evolution Impact](../documentation-templates/evolution.md#template-evolution-impact) as future delta only: `Expansion`, useful behavior-preserving `Refactoring`, and exceptional `Forced Migration` where unavoidable/known.
9. Check the materially known evolution **chain**, not only the next step. If Impact/Requirements Discovery exposes avoidable future Forced Migration, reconsider current Domain boundaries and create/update the appropriate `DI-*`; do not duplicate that requirement in `Evolution Impact`. Do not implement future behavior prematurely merely because its known impact justifies a boundary/identity/ownership requirement now.
10. Run [Proof Requirements Discovery](requirements-discovery/proof/proof.md) explicitly when planning local Domain proof. Aggregate tests normally prove implemented BI, material invariants and executable durable Domain requirements; create a Test Item only for material additional proof-quality requirements.
11. Treat Requirements Discovery as bidirectional. If proof design exposes a production requirement, create/update the corresponding `DI-*`; if Implementation Requirements Discovery exposes a proof obligation, create/update the Test Item. Follow related questions until the selected realization/proof decision is coherent.
12. Put coupled Implementation/Test Items in an [Item Group](../documentation-templates/implementation.md#template-item-group). When one group member changes materially, review the **whole group** and retain/revise/remove each member as appropriate; review does not mean automatic invalidation.
13. When a credible executable proof boundary is known, write failing Domain proof before production implementation. Pure refactoring keeps relevant proof green.
14. Use `domain-evolution.md` only when one Evolution Step changes shared Domain meaning across several owners and one cross-owner view materially improves understanding.
15. When Domain/source investigation resolves or invalidates a Scenario Realization Dependency, update the Scenario-owned dependency with the Scenario-relevant conclusion. If the finding changes a required runtime algorithm/FI boundary, feed it back to Scenario design before finalizing Domain allocation.
16. After implementation, update current Domain truth and remove obsolete transition material only when compatibility is actually gone.

### Principles

- BI-first; Aggregate/consistency-boundary driven.
- `DI-*` is a durable concrete Domain realization requirement, not merely a named architecture pattern and not a code trace.
- Requirements Discovery asks reusable questions; Patterns are candidate answers; concrete selected answers become owner-local Items.
- Proof Requirements Discovery may create Domain Implementation Items; Implementation Requirements Discovery may create Test Items.
- Coupled Items are grouped and reviewed together when one member changes materially.
- Known evolution may justify a seam now, not the future capability itself.
- Avoidable Forced Migration is architecture pressure to resolve rather than a preferred future plan.

### Owners used by this process

- Scenario owners as BI/Evolution Step authority;
- Aggregate/Domain Object owners for selected Domain meaning, DI/Test Items, Item Groups and local Evolution Impact;
- local Domain tests/test source as proof realization;
- `domain-evolution.md` only for materially useful cross-owner Domain transition views.

---
