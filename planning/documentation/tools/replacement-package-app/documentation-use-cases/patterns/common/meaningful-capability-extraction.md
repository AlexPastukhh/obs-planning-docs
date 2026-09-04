# Pattern — Meaningful Capability Extraction

**Problem / pressure:** repeated implementation appears across consumers and may represent one reusable responsibility.

**Prefer:** extract only when there is one semantic responsibility with real consumers/contract. Textual duplication is evidence to inspect, not sufficient authority.

**Do not apply when:** code only looks similar or extraction adds more indirection than semantic reuse.

**Possible Items:** consumers depend on one shared capability/contract; local duplicated responsibility is removed.

**Related discovery:** [I3](../../requirements-discovery/implementation/common.md#i3-maintainability--cognitive-simplicity), [S7](../../requirements-discovery/implementation/slice.md#s7-shared-capability-pressure), [SH1](../../requirements-discovery/implementation/shared-implementation.md#sh1-real-reusable-responsibility).
