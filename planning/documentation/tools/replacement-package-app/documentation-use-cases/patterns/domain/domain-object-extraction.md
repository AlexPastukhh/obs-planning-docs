# Pattern — Domain Object Extraction

**Problem / pressure:** one concept has independent semantics, lifecycle, reuse or rule volume that makes an Aggregate owner harder to understand.

**Prefer:** focused Domain Object ownership only when that semantic independence materially improves clarity.

**Do not apply when:** extraction merely mirrors a source class.

**Possible Items:** explicit ownership/identity/invariant boundary requirements.

**Related discovery:** [D3](../../requirements-discovery/implementation/domain.md#d3-domain-object-extraction).
