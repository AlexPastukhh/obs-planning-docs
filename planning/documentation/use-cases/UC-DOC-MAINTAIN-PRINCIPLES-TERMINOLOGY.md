# UC-DOC-MAINTAIN-PRINCIPLES-TERMINOLOGY — Maintain Principles & Terminology

## Situation

Stable shared vocabulary/rules in an area are missing, stale, duplicated, inconsistently defined, or mixed into operational Process.

## Result

The area has one coherent term-centered owner for the needed vocabulary and stable semantic rules, with duplicated or misplaced meaning routed back to that owner.

## Process

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Semantic Owner`](../principles-and-terminology.md#doc-semantic-owner) — `DOC.SEMANTIC-OWNER`
> - `CONTEXTUALIZES` [`Semantic DRY Principle`](../principles-and-terminology.md#doc-semantic-dry) — `DOC.SEMANTIC-DRY`
> - `CONTEXTUALIZES` [`Explicit Stable Semantic Anchor`](../principles-and-terminology.md#doc-explicit-stable-semantic-anchor) — `DOC.EXPLICIT-STABLE-SEMANTIC-ANCHOR`
> - `CONTEXTUALIZES` [`Semantic Owner Dependency`](../principles-and-terminology.md#doc-semantic-owner-dependency) — `DOC.SEMANTIC-OWNER-DEPENDENCY`

1. Identify the stable terms/rules that several concrete uses need to share.
2. Reuse an existing term/rule owner when it already owns the meaning.
3. Define what each material term means and what it does not mean when confusion is plausible.
4. Keep stable invariants with the terms they govern.
5. Write a cross-term principle once when one rule genuinely governs several terms.
6. Describe relations only where they help define the participating terms or the rule itself.
7. Do not create a mandatory relationship table or mirrored `A → B` / `B → A` inventory.
8. Move procedural step-by-step meaning to the relevant Use Case/Process instead of making Principles & Terminology operational.
9. Update consumers to reference the semantic owner rather than create competing definitions. When a local restatement/contextualization/extension is still useful, preserve it as a tracked `Semantic Owner Dependency` instead of deleting useful context merely to avoid textual repetition.
10. When a stable owner subsection gains a real cross-file section consumer, use an explicit stable semantic anchor; do not pre-create anchors for every heading.
11. Use situational extensions locally without promoting them into the reusable owner until repeated usefulness justifies that change.

Shared meaning: [`../principles-and-terminology.md`](../principles-and-terminology.md)
