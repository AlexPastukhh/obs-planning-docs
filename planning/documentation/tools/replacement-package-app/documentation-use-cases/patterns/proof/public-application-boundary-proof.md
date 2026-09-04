# Pattern — Public/Application Boundary Behavioral Proof

**Problem / pressure:** tests prove internal calls/mocks rather than the semantic property consumers observe.

**Prefer:** exercise the stable public/application boundary and observe the real semantic result/state where that is the cheapest credible proof.

**Possible Items:** Test Item requiring public-boundary exercise; production Item only if a missing usable boundary is materially exposed.

**Related discovery:** [T1](../../requirements-discovery/proof/proof.md#t1-correct-proof), [T3](../../requirements-discovery/proof/proof.md#t3-false-confidence--wrong-boundary), [T8](../../requirements-discovery/proof/proof.md#t8-proof-maintainability).
