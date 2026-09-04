# Pattern — Stable Port / Expected Variation

**Problem / pressure:** real external interaction or materially known alternate implementation needs replacement/control without leaking details into application logic.

**Prefer:** stable port at the semantic boundary when current replaceability/recovery/testability or known variation justifies its cost.

**Do not apply when:** variation is purely hypothetical and the abstraction only complicates current code.

**Possible Items:** production port requirement; deterministic failure/control Test Item; contract proof. Coupled production/proof Items normally belong in one Item Group.

**Related discovery:** [I4](../../requirements-discovery/implementation/common.md#i4-known-evolution-chain-fitness), [I7](../../requirements-discovery/implementation/common.md#i7-testability--observability), [S5](../../requirements-discovery/implementation/slice.md#s5-external-interaction-and-expected-variation), [SH3](../../requirements-discovery/implementation/shared-implementation.md#sh3-variation-and-evolution), [T7](../../requirements-discovery/proof/proof.md#t7-failure--uncertainty--forbidden-mutation).
