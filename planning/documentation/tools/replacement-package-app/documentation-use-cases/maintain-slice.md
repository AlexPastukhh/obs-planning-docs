# DOC-UC-03 — Maintain Slice implementation from Behavior Items and Domain

### Goal

A developer can understand one Slice's application result, BI contribution, Domain dependencies, selected durable realization requirements, coupled proof requirements and future `Evolution Impact` without turning the Slice into a second Scenario or a code trace.

### Process

1. Maintain the Slice's current result/responsibility and list BI identities it realizes using [Template — Slice owner](../documentation-templates/slice-and-shared.md#template-slice-owner) as the recommended focused form.
2. Inspect relevant Scenario Realization Dependencies before selecting orchestration/port boundaries. Consume questions about runtime composition, external interaction, recovery or technical feasibility; do not silently convert Scenario candidates into selected Slice architecture.
3. Reference FI only when useful for behavioral context/navigation; do not require FI↔Slice 1:1 mapping.
4. List semantic Domain owners/capabilities used by the Slice; Domain remains authority for business rules it directly implements.
5. Run the applicable [common Implementation Requirements Discovery](requirements-discovery/implementation/common.md) and [Slice-specific questions](requirements-discovery/implementation/slice.md). Ask first how the Slice must realize selected BI/Domain meaning correctly, then real technical qualities, maintainability/local reasoning, known evolution-chain fitness, current simplicity versus preparation, probable natural extensions/application boundaries and testability/observability. Inspect the [Pattern Registry](patterns/REGISTRY.md) when reusable candidates are useful.
6. Classify every **material selected answer** by what it requires. A production-realization requirement becomes an `SI-*`; an additional proof requirement becomes a Test Item; one answer may create both. `N/A`, no additional requirement, discarded candidates and transient notes create no Item. Use [Template — Implementation Item](../documentation-templates/implementation.md#template-implementation-item).
7. Maintain `Evolution Impact` for each relevant Evolution Step using [Template — Evolution Impact](../documentation-templates/evolution.md#template-evolution-impact) as future Slice delta only: Expansion, useful Refactoring and exceptional Forced Migration. Check the materially known evolution chain rather than only the next step.
8. If Impact/Requirements Discovery reveals avoidable Forced Migration, reconsider current Slice/shared boundaries and create/update the relevant `SI-*` or Shared Implementation Capability requirement; do not duplicate that requirement inside Impact. Do not prematurely implement the future capability itself merely because a stable seam is useful now.
9. Run [Proof Requirements Discovery](requirements-discovery/proof/proof.md) explicitly for local Slice/application proof. Do not repeat exhaustive Domain proof at the Slice layer; prove that Slice orchestration actually uses Domain semantics at the correct application boundary.
10. Treat the two Requirements Discovery channels as bidirectional. A proof question may expose a production requirement such as a controllable external port or observable result and therefore create/update an `SI-*`; an implementation question may expose an additional Test Item. Follow related questions until the selected implementation/proof decision is coherent.
11. Put coupled Implementation/Test Items in an [Item Group](../documentation-templates/implementation.md#template-item-group), including by default cross-discovery Items that depend on the same selected decision. A material change to any member makes the whole group review-relevant; review each member rather than automatically invalidating all of them.
12. When a credible executable boundary is known, write failing Slice/application proof before Slice implementation; keep proof green during behavior-preserving refactoring.
13. Keep method/service call chains, fields and adapter routing in source/generated traces rather than normative Slice docs.
14. If Slice/source investigation invalidates a Scenario feasibility assumption or exposes a materially better/different runtime interaction algorithm, feed the finding back to the Scenario owner before treating the Slice design as final.
15. After implemented evolution, fold resulting responsibility/requirements into current Slice truth.

### Principles

- Feature Interaction = behavioral decomposition; Slice = implementation decomposition.
- `SI-*` is a durable concrete Slice realization requirement; it may concern functional realization, real technical qualities, maintainability, orchestration/composition/recovery, ports/results/reuse, testability or known evolution.
- Do not restate BI/Domain semantic truth as SI; Items add durable realization meaning.
- Requirements Discovery asks reusable questions; Patterns are candidate answers; selected material answers become Items.
- Proof Requirements Discovery may create SI; Implementation Requirements Discovery may create Test Items; coupled decisions are grouped.
- Existing Slices may grow internally through coherent modular expansion/composition without splitting merely because implementation size increases.
- Local proof remains part of the Slice semantic owner by default even when physically represented in a focused test file.

### Owners used by this process

- Scenario BI/Evolution Step authority;
- Slice owner / `slices.md` portfolio strategy;
- affected Domain owners;
- Shared Implementation Capabilities when real reuse appears;
- local test source/optional focused physical proof representation within the same owner unless independent semantic ownership is genuinely justified.

---
