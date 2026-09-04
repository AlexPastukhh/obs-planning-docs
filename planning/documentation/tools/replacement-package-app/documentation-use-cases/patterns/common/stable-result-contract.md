# Pattern — Stable Result Contract

**Problem / pressure:** consumers depend on producer internals, or multiple implementations/consumers need one semantic outcome contract.

**Prefer:** stable semantic result/error contract that allows consumers to treat implementation as a black box where useful.

**Possible Items:** production result contract requirement; proof of result semantics/substitutability.

**Trade-offs:** explicit contract surface versus reduced coupling/replacement risk.

**Related discovery:** [I3](../../requirements-discovery/implementation/common.md#i3-maintainability--cognitive-simplicity), [I4](../../requirements-discovery/implementation/common.md#i4-known-evolution-chain-fitness), [I7](../../requirements-discovery/implementation/common.md#i7-testability--observability), [S4](../../requirements-discovery/implementation/slice.md#s4-stable-result--error-contract), [SH2](../../requirements-discovery/implementation/shared-implementation.md#sh2-stable-contract--result).

**Related proof:** [Contract Test Suite](../proof/contract-test-suite.md).
