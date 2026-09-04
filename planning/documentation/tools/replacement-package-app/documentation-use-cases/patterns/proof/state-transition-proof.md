# Pattern — State Transition Proof

**Problem / pressure:** correctness depends on a state change/invariant, while return-value-only proof can miss incorrect mutation.

**Prefer:** observe relevant before/action/after state and invariants at the correct semantic boundary.

**Possible Items:** persisted/resulting-state observation; atomic transition proof.

**Related discovery:** [T1](../../requirements-discovery/proof/proof.md#t1-correct-proof), [T2](../../requirements-discovery/proof/proof.md#t2-bug-escape), [T7](../../requirements-discovery/proof/proof.md#t7-failure--uncertainty--forbidden-mutation).
