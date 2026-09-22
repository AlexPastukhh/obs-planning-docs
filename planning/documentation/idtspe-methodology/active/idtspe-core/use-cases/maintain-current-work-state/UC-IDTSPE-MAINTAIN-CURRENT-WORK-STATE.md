# UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE — Maintain Current IDTSPE Work State

Status: active IDTSPE runtime Use Case

## Situation

Current working meaning benefits from explicit semantic retention/addressability because it must survive distributed discussion, support review/revalidation, be handed off/resumed, or participate in Core/Target lifecycle.

## Result

The smallest useful current Work Context is represented coherently around material Target Resolution Requirements, bounded Units, their Unit Resolution state and Current Result Content, plus any material cross-Unit/Target/Work-Context Core Resolution State. Stale/invalidated meaning is distinguishable without serializing the whole conversation.

## Process

1. Start from current Broad Discussion, previous integrated state, current Units/Target Results and accepted owner meaning.
2. Apply the Unit applicability/materiality/disposition contract: every Module-defined Unit of a formed Target remains visible as RESOLVED / OPEN / explicit omission; Core-defined Units remain present only when instantiated by applicability; Contextual Units remain present only when actually defined/formed.
3. Retain material Target Resolution Requirements proportionally, especially OPEN / PARTIAL / BLOCKED / DEFERRED requirements and non-obvious `Covered By` refs. Do not duplicate obvious coverage already reconstructible from Target Module/Unit structure.
4. For each material Unit retain only useful `Unit Resolution` meaning and `Current Result Content`. For a **substantive composite Unit**, retain the concrete prepared Slot dispositions and, for `SUBSTANTIVE` Slots, Resolution State / Current Resolution Content / Remaining Gap proportionally, especially `OPEN / PARTIAL / BLOCKED / DEFERRED` state and non-obvious dependencies/provenance. Contextual Slots remain represented only after they have actually been formed; once formed inside a substantive Unit, retain an explicit disposition when lifecycle/trace value requires it. If the whole Module-defined Unit is non-material/non-applicable, retain only its concise Unit-level omission disposition: prepared Slot Definitions remain recoverable from methodology and no concrete runtime Resolution Set/Slot states are required. Unresolved material Units remain explicitly `OPEN`.
> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `TWU.SUBJECT-REFERENCE`
> Owner: [Target Work Subject Reference Contract](../../runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md#target-work-subject-reference)

5. Keep Core Resolution State attached to the smallest correct semantic subject. When that subject is a Target Work Collection/item/Slot, use `TWU.SUBJECT-REFERENCE`; other Unit-local state belongs with the parent Unit Resolution, while cross-Unit/Target/Work-Context state stays at that broader subject when natural.
6. Promote working meaning into explicit Question/QRP/Proposal/Decision/Evidence/etc only when lifecycle/addressability/continuation/revalidation value is material.
7. Retain explicit/durable Decision trace only when selection/rationale/revalidation value should survive; material selection semantics remain governed by the Proposal/Decision lifecycle even when no separate Decision record persists.
8. When a material Proposal itself is retained for continuation/review/handoff/revalidation, preserve its proportional Proposal `Review Provenance`: required Resolution Context Lens operation plus other materially applied Lens operations, directly or by reference to Methodology Usage State. Do not retain the full reasoning transcript.
9. A transient pending Finding inbox may be used as local working representation, but findings should be dispositioned into their real subjects/owners when useful; the inbox is not a second Finding lifecycle.
10. Mark invalidated/revalidation-needed dependent meaning without reopening unaffected accepted meaning.
11. Use the smallest useful representation: context-only, inline state, one local file, several natural owners, or another placement chosen through representation rules.
12. Refresh the applicable [`Resolution Carry-Forward`](../../resolution/continuation/RESOLUTION-CARRY-FORWARD-PROJECTION.md) only when material open/deferred/residual continuation state changed; add/remove compact references without copying canonical semantic bodies. When its Durable Coordination Materialization Threshold is crossed, ensure one durable discoverable coordination representation exists for the scope before handoff/re-entry.
13. Remove/supersede stale duplicate working representation when current state makes it misleading.

## Boundary

```text
meaning exists in conversation ≠ explicit Core State required
Unit Resolution exists ≠ Current Result Content exists
Slot RESOLVED ≠ parent Unit/Target Requirement automatically resolved
Unit exists ≠ separate file required
Contextual Unit existed ≠ durable CU result section required
local Work Context snapshot ≠ semantic authority
local snapshot ≠ Session-owned second ontology
```
