# DOC-UC-03 — Maintain Slice implementation from Behavior Items and Domain

### Goal

A developer can understand one Slice's application result, BI contribution, Domain dependencies, durable implementation requirements, local proof and future `Evolution Impact` without turning the Slice into a second Scenario or a code trace.

### Process

1. Maintain the Slice's current result/responsibility and list BI identities it realizes using [Template — Slice owner](../documentation-templates/slice-and-shared.md#template-slice-owner) as the recommended focused form.
2. Inspect relevant Scenario Realization Dependencies before selecting orchestration/port boundaries. Consume the questions that concern runtime composition, external interaction, recovery or technical feasibility; do not silently convert Scenario candidates into selected Slice architecture.
3. Reference FI only when useful for behavioral context/navigation; do not require FI↔Slice 1:1 mapping.
4. List semantic Domain owners/capabilities used by the Slice; Domain remains authority for business rules it directly implements.
5. Add `SI-*` only for durable orchestration/composition/recovery/port/reuse/testability requirements that should survive ordinary refactoring.
6. A `SI-*` may be derived from current BI/Domain constraints, concrete implementation quality pressure or materially known `Evolution Impact` that should later be realizable through additive composition/ports rather than avoidable Forced Migration.
7. Do not prematurely implement the future capability itself just because a stable port/composition seam is useful now.
8. Maintain `Evolution Impact` for each relevant Evolution Step using [Template — Evolution Impact](../documentation-templates/evolution.md#template-evolution-impact) as future Slice delta only: Expansion, useful Refactoring and exceptional Forced Migration.
9. If Impact analysis reveals avoidable Forced Migration, reconsider current Slice/shared boundaries and create/update the relevant `SI-*` or Shared Implementation Capability requirement; do not duplicate that requirement inside Impact.
10. Plan local Slice/application proof from the realized BI and Slice responsibility. Do not repeat exhaustive Domain proof at the Slice layer; prove that Slice orchestration actually uses Domain semantics at the correct application boundary.
11. Use [Template — Test Item](../documentation-templates/proof.md#template-test-item) only for non-obvious proof quality such as no-mutation, public-boundary, persistence observation, isolation or false-positive resistance.
12. When a credible executable boundary is known, write failing Slice/application proof before Slice implementation; keep proof green during behavior-preserving refactoring.
13. Keep method/service call chains, fields and adapter routing in source/generated traces rather than normative Slice docs.
14. If Slice/source investigation invalidates a Scenario feasibility assumption or exposes a materially better/different runtime interaction algorithm, feed the finding back to the Scenario owner before treating the Slice design as final.
15. After implemented evolution, fold resulting responsibility/requirements into current Slice truth.

### Principles

- Feature Interaction = behavioral decomposition; Slice = implementation decomposition.
- Existing Slices may grow internally through coherent modular expansion/composition without splitting merely because implementation size increases.
- A separate supporting Slice requires meaningful capability/result or recovery/composition ownership.
- `SI-*` may intentionally prepare known evolution through a port/boundary without implementing the future behavior.
- Local tests belong naturally with the Slice; a separate test owner is optional only when independent depth/reuse/review makes it clearer.

### Owners used by this process

- Scenario BI/Evolution Step authority;
- Slice owner / `slices.md` portfolio strategy;
- affected Domain owners;
- Shared Implementation Capabilities when real reuse appears;
- local test source/optional focused test owner.

---
