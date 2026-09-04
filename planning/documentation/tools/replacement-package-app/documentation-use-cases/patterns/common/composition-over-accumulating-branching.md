# Pattern — Composition over Accumulating Branching

**Problem / pressure:** the same mode/variant creates repeated cross-phase branching through validation, orchestration, recovery and result mapping.

**Prefer:** semantic commands, strategies, capabilities or composable steps when they improve meaning/locality.

**Do not apply when:** branches are ordinary local implementation detail of one stable intent. This is not a ban on `if`.

**Possible Items:** separate command/composition requirements.

**Related discovery:** [I3](../../requirements-discovery/implementation/common.md#i3-maintainability--cognitive-simplicity), [S1](../../requirements-discovery/implementation/slice.md#s1-semantic-command-boundary), [S6](../../requirements-discovery/implementation/slice.md#s6-branching--composition).
