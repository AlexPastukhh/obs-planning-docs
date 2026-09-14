# UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE — Maintain Current IDTSPE Work State

Status: active IDTSPE runtime Use Case

## Situation

Current working meaning benefits from explicit semantic retention/addressability because it must survive distributed discussion, support review/revalidation, be handed off/resumed, or participate in Core/Target lifecycle.

## Result

The smallest useful current Work Context is represented coherently around bounded Units, their Unit Resolution state and Current Result Content, plus any material cross-Unit/Target/Work-Context Core Resolution State. Stale/invalidated meaning is distinguishable without serializing the whole conversation.

## Process

1. Start from current Broad Discussion, previous integrated state, current Units/Target Results and accepted owner meaning.
2. Apply the Unit applicability/materiality/omission contract.
3. For each material Unit retain only useful `Unit Resolution` meaning and `Current Result Content`; Current Result Content may be absent while resolution remains open.
4. Keep Core Resolution State attached to the smallest correct semantic subject. Unit-local state belongs with that Unit; cross-Unit/Target/Work-Context state stays at that broader subject when natural.
5. Promote working meaning into explicit Question/QRP/Proposal/Decision/Evidence/etc only when lifecycle/addressability/continuation/revalidation value is material.
6. Retain explicit/durable Decision trace only when selection/rationale/revalidation value should survive; material selection semantics remain governed by the Proposal/Decision lifecycle even when no separate Decision record persists.
7. A transient pending Finding inbox may be used as local working representation, but findings should be dispositioned into their real subjects/owners when useful; the inbox is not a second Finding lifecycle.
8. Mark invalidated/revalidation-needed dependent meaning without reopening unaffected accepted meaning.
9. Use the smallest useful representation: context-only, inline state, one local file, several natural owners, or another placement chosen through representation rules.
10. Remove/supersede stale duplicate working representation when current state makes it misleading.

## Boundary

```text
meaning exists in conversation ≠ explicit Core State required
Unit Resolution exists ≠ Current Result Content exists
Unit exists ≠ separate file required
Contextual Unit existed ≠ durable CU result section required
local Work Context snapshot ≠ semantic authority
local snapshot ≠ Session-owned second ontology
```
