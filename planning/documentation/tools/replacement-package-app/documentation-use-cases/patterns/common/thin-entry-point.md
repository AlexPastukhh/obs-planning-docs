# Pattern — Thin Entry Point

**Problem / pressure:** transport/UI/URL/controller code starts owning application orchestration or repeated variant branching.

**Prefer:** external entry point translates input, invokes one semantic application command and maps the result.

**Do not apply when:** translation itself is the whole application behavior; do not invent a layer merely for symmetry.

**Possible Items:** entry point must remain translation-only; orchestration belongs behind a semantic application boundary; proof exercises the command independently of transport.

**Related discovery:** [I3](../../requirements-discovery/implementation/common.md#i3-maintainability--cognitive-simplicity), [S2](../../requirements-discovery/implementation/slice.md#s2-thin-external-entry-point).

**Related:** [Semantic Command Interface](semantic-command-interface.md), [Vertical Slice](../slice/vertical-slice.md).
