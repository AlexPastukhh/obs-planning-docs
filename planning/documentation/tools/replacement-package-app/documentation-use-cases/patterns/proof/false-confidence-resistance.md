# Pattern — False-Confidence Resistance

**Problem / pressure:** a plausible incorrect implementation can keep a test green because the proof observes the wrong boundary or insufficient state.

**Prefer:** add the minimal observation/path needed to close a realistic bug escape; avoid mock-only confidence when semantic state/result matters.

**Possible Items:** Test Items for persisted observation, negative-space proof, invariant checking or stronger boundary proof.

**Related discovery:** [T2](../../requirements-discovery/proof/proof.md#t2-bug-escape), [T3](../../requirements-discovery/proof/proof.md#t3-false-confidence--wrong-boundary).
