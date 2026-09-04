# Pattern — Evolution-chain-safe Boundary

**Problem / pressure:** current structure can support the next known evolution step but a later already-known step would force avoidable migration.

**Prefer:** the lowest-cost current boundary/identity/port/result/composition seam that keeps the materially known chain correct, technically adequate and maintainable.

**Do not apply when:** preparation materially complicates current code for hypothetical future flexibility. Do not implement future behavior itself.

**Possible Items:** stable boundary/identity/port/result requirements; evolution-resilient proof requirements.

**Related discovery:** [I4](../../requirements-discovery/implementation/common.md#i4-known-evolution-chain-fitness), [I5](../../requirements-discovery/implementation/common.md#i5-current-simplicity-versus-future-preparation), [T6](../../requirements-discovery/proof/proof.md#t6-evolution-resilience).
