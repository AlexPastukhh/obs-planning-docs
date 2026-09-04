# Pattern — Contract Test Suite

**Problem / pressure:** several implementations must remain substitutable behind one stable semantic contract.

**Prefer:** one shared behavioral contract suite that every implementation must satisfy.

**Possible Items:** Test Item requiring the shared contract suite; often grouped with the Implementation Item that requires multiple implementations to expose the same stable contract.

**Related discovery:** [T4](../../requirements-discovery/proof/proof.md#t4-false-failures--excessive-coupling).

**Related patterns:** [Stable Result Contract](../common/stable-result-contract.md).
