# Pattern — Aggregate / Consistency Boundary

**Problem / pressure:** several Domain concepts/invariants must change consistently and need one coherent semantic enforcement boundary.

**Prefer:** one Aggregate when shared invariants/consistency are the meaningful reason for joint ownership.

**Do not apply when:** concepts only happen to be represented together in current classes/data.

**Possible Items:** atomicity/consistency/identity realization requirements; Domain proof of invariants.

**Related discovery:** [D1](../../requirements-discovery/implementation/domain.md#d1-consistency-and-atomicity-boundary).
