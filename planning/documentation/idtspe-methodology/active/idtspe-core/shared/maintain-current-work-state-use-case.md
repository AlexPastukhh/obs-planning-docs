# UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE — Maintain Current IDTSPE Work State

Status: active IDTSPE runtime Use Case

## Situation

Current working meaning benefits from explicit semantic retention/addressability because it must survive distributed discussion, support review/revalidation, be handed off/resumed, or participate in Core/Target lifecycle.

## Result

The smallest useful set of current IDTSPE State Units and Target Result meaning is represented coherently, with stale/invalidated meaning distinguishable and without serializing the whole conversation or every possible Unit/field.

## Process

1. Start from current Broad Discussion, existing State Units, Target Results and accepted owner meaning.
2. Apply the Unit applicability/materiality/omission contract in [`idtspe-unit-and-target-step-result-model.md`](idtspe-unit-and-target-step-result-model.md).
3. Promote working meaning into explicit State only when lifecycle/addressability/continuation/revalidation value is material.
4. Preserve target-specific meaning as Target Result Units defined by the active Target Module/Local Contract; do not flatten it into generic labels.
5. Use `Methodology Usage State` only for methodology-use facts that matter later: active Use Cases, material registry outcomes, component operation/scope, contextual adaptation, recheck/re-entry. Do not log every file read or every non-applicable registry entry.
6. Preserve accepted Decisions/Evidence and unresolved material Q/R/P/Proposal/Question state as needed.
7. Mark invalidated/revalidation-needed dependent meaning without reopening unaffected accepted meaning.
8. Use the smallest useful representation: context-only, inline state, one file, several owners, or another placement chosen through representation rules.
9. Remove/supersede stale duplicate working representation when current state makes it misleading.
10. Record a useful re-entry point only when it is not obvious from current state/Use Cases.

## Boundary

```text
meaning exists in conversation
≠ State Unit required

State Unit exists
≠ separate file required

possible Unit kind/field
≠ populate it now
```

This Use Case maintains semantic state. Session Runtime does not own a second free-form Session State ontology.
