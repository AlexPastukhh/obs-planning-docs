# Pattern — Vertical Slice

**Problem / pressure:** behavior/orchestration/proof for one application capability is scattered across a structure that makes local reasoning/change difficult.

**Prefer:** organize implementation around a meaningful application capability/use case when that improves locality of behavior, orchestration and proof.

**Do not apply when:** a separate Slice would have no meaningful capability/result/recovery/composition ownership.

**Possible Items:** Slice responsibility/boundary; local application command/result/proof requirements.

**Related discovery:** [I3](../../requirements-discovery/implementation/common.md#i3-maintainability--cognitive-simplicity), [S3](../../requirements-discovery/implementation/slice.md#s3-locality--vertical-slice).

**Related pattern:** [Semantic Command Interface](../common/semantic-command-interface.md). Vertical Slice is implementation decomposition; Semantic Command Interface is application-interface semantics. They often reinforce each other but are not identical.
