# UC-SESSION-MAINTAIN-STATE — Maintain Session State

## Situation

Working meaning should survive the immediate conversation, has become too large or distributed to continue reliably, or needs a persistent representation for review, handoff, or later resumption.

## Result

Useful current working meaning is represented as coherent Session State at a granularity and physical structure appropriate to the current work.

## Process

1. Identify which current working meaning is actually useful to retain.
2. Preserve the meaning rather than attempting to persist every conversational detail by default.
3. Use the smallest useful representation:
   - one file when sufficient;
   - several files when responsibilities become clearer;
   - a folder/subplan when a work scope becomes independently substantial.
4. Keep related state units together when splitting them adds no value.
5. Preserve methodology-specific units in their own semantics when a methodology is selected.
6. Restructure Session State when the work grows or its concerns change.
7. Remove or supersede stale working representation when a Checkpoint or newer state makes it misleading.
8. Keep storage/transport mechanics separate from Session semantics.

Shared meaning: [`../principles-and-terminology.md`](../principles-and-terminology.md)

This Use Case does not require a fixed Session State schema or repository layout.
