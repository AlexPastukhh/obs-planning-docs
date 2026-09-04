# Pattern — Deterministic Failure Injection

**Problem / pressure:** timeout/failure/uncertainty cannot be exercised reliably through the current implementation boundary.

**Prefer:** deterministic control at the appropriate dependency boundary plus proof of resulting semantic state/outcome.

**Possible Items:** production controllable port/seam + Test Item requiring deterministic injection/resulting-state observation. These are normally one coupled Item Group.

**Related discovery:** [I7](../../requirements-discovery/implementation/common.md#i7-testability--observability), [T7](../../requirements-discovery/proof/proof.md#t7-failure--uncertainty--forbidden-mutation).
