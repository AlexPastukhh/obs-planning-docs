# Pattern — Refactoring-Resilient Proof

**Problem / pressure:** behavior-preserving internal reorganization causes irrelevant test failures.

**Prefer:** couple proof to stable semantic/public contracts when internal call structure is not itself the requirement.

**Possible Items:** Test Item requiring resilience to internal reorganization and avoidance of internal call-order coupling.

**Related discovery:** [T4](../../requirements-discovery/proof/proof.md#t4-false-failures--excessive-coupling), [T5](../../requirements-discovery/proof/proof.md#t5-refactoring-resilience), [T8](../../requirements-discovery/proof/proof.md#t8-proof-maintainability).
