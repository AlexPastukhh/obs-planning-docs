# Pattern — Semantic Command Interface

**Problem / pressure:** several meaningful application intents may be hidden behind one generic CRUD-like/mode-driven operation.

**Consider when:** callers naturally use different verbs/results; a flag changes validation, orchestration, state transition, recovery, result semantics or proof expectations; or even one branch materially obscures intent/diagnosis.

**Prefer:** intuitive semantic commands such as `AddFilesToEditor(files)` / `ReplaceEditorFiles(files)` when intents are genuinely different. A parameter remains appropriate when it merely qualifies one semantic intent.

**Do not apply when:** the alternatives are only implementation detail/characteristics of one stable command.

**Possible Items:** separate semantic command requirements; independent command proof; shared lower capability retained below commands.

**Trade-offs:** more explicit application surface versus less mode branching and clearer proof/diagnosis.

**Related discovery:** [I3](../../requirements-discovery/implementation/common.md#i3-maintainability--cognitive-simplicity), [I7](../../requirements-discovery/implementation/common.md#i7-testability--observability), [S1](../../requirements-discovery/implementation/slice.md#s1-semantic-command-boundary).

**Related patterns:** [Vertical Slice](../slice/vertical-slice.md), [Thin Entry Point](thin-entry-point.md), [Composition over Accumulating Branching](composition-over-accumulating-branching.md).
