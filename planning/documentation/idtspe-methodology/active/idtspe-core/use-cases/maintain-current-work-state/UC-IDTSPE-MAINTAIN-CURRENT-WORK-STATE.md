# UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE — Maintain Current IDTSPE Work State

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Decision record retention](../../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-decision-retention) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`.
> - `CONTEXTUALIZES` [Resolution Carry-Forward contract](../../resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) — `RESOLUTION.CARRY-FORWARD`.
> - `CONTEXTUALIZES` [Need Set Coordination](../../resolution/needs/NEED-SET-COORDINATION.md#resolution-need-set-coordination) — `RESOLUTION.NEED-SET-COORDINATION`.

Status: active IDTSPE runtime Use Case

<a id="uc-idtspe-maintain-current-work-state"></a>
Responsibility ID: `IDTSPE.UC.MAINTAIN-CURRENT-WORK-STATE`

## Situation

Current working meaning benefits from explicit semantic retention/addressability because it must survive distributed discussion, support review/revalidation, be handed off/resumed, or participate in Core/Target lifecycle.

## Result

The smallest useful current Work Context is represented coherently around material Target Resolution Requirements, bounded Units, their Unit Resolution state and Current Result Content, plus any material cross-Unit/Target/Work-Context Core Resolution State. Stale/invalidated meaning is distinguishable without serializing the whole conversation.

## Process

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `CORE.STATE-UNIT`
> Owner: [Core State Unit / Core Resolution State](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#core-state-unit-boundary)

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `CORE.METHODOLOGY-USAGE-STATE`
> Owner: [Methodology Usage State](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#core-methodology-usage-state)

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `RESOLUTION.CARRY-FORWARD`
> Owner: [Planning Resolution State](../../target-modules/TM-PLANNING-RESOLUTION-STATE.md#tm-planning-resolution-state)

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
7. Apply the linked Core Decision retention contract to any separate record. Integrate accepted meaning into natural Unit content independently; a retained record does not create another owner for that meaning.
8. When a material Proposal itself is retained for continuation/review/handoff/revalidation, preserve its proportional Proposal `Review Provenance`: required Resolution Context Lens operation plus other materially applied Lens operations, directly or by reference to Methodology Usage State. Do not retain the full reasoning transcript.
9. A transient pending Finding inbox may be used as local working representation, but findings should be dispositioned into their real subjects/owners when useful; the inbox is not a second Finding lifecycle.
10. When one or more [`Need Sets`](../../resolution/needs/NEED-SET-COORDINATION.md#resolution-need-set-coordination) have material continuation value, retain/reuse their compact coordination state or canonical ledger reference without copying downstream semantic bodies. Keep Collection/Disposition/downstream owners authoritative; Need Set tracking only preserves wanted-outcome continuity and fulfillment/explicit-stop state.
11. Mark invalidated/revalidation-needed dependent meaning without reopening unaffected accepted meaning.
12. Use the smallest useful representation: context-only, inline state, one local file, several natural owners, or another placement chosen through representation rules. When the USER explicitly requires a durable Needs ledger, route its exact physical placement through P-14 rather than inventing a universal Core path.
13. Refresh the applicable [`Resolution Carry-Forward`](../../target-modules/TM-PLANNING-RESOLUTION-STATE.md#tm-planning-resolution-state) only when material open/deferred/residual continuation state changed; add/remove compact references without copying canonical semantic bodies. When its Durable Coordination Materialization Threshold is crossed, ensure one durable discoverable coordination representation exists for the scope before handoff/re-entry. Need Set Coordination remains separate from Carry-Forward/PRS.
14. Remove/supersede stale duplicate working representation when current state makes it misleading.

<a id="current-work-manifest"></a>
## Optional Current Work Manifest — Cross-Pass Coordination Projection

When the USER explicitly activates cross-pass/session coordination and the work is materially multi-pass, multi-artifact or handoff-sensitive, maintain/reuse one compact **Current Work Manifest** as an optional current-work coordination and re-entry projection. Ordinary one-pass work does not create a Manifest.

The Manifest is not a new semantic owner. It references the natural owners and keeps only enough cross-pass orientation to resume safely:

```text
Current Work Manifest
  bounded Work Context / current basis
  USER Goal / wanted-outcome refs
  current focus
  cross-pass planned actions
  material Artifact Inventory
  Need Set refs when material
  PRS / QRP / Proposal / Decision refs when material
  Review Coverage refs
  Revalidation Impact / pending-recheck refs
  optional current/recent Work Record refs when explicit Work Record tracking is active
  blockers / permissions / external dependencies
  re-entry / next-action route
```

Manifest activation itself is explicit/situational. Do not create even a minimal accepted Manifest merely because substantive work exists. Once activated, its content remains proportional: more detailed coordination becomes material when work spans several passes/messages, several independently useful artifacts must stay coordinated, revalidation/review must survive a pass boundary, cross-session/handoff re-entry matters, or the USER explicitly requests central tracking.

### Goal / action ownership boundary

A concise USER Goal may be projected here, but a grounded durable Need remains owned by Need Candidate Collection / Need Set Coordination. AI-generated candidate work remains Finding/Q/R/P/Proposal/etc. and is not promoted to a USER Goal merely because it appears in the Manifest.

Manifest actions are cross-pass coordination. Current semantic work selects only the useful subset; the Manifest is not copied wholesale into another owner. When an optional explicit Work Record is active, it may reference the relevant Manifest action/revision without becoming Manifest authority.

### Artifact Inventory

For material work artifacts, retain proportionally:

```text
artifact identity / role
semantic owner
physical location or Work Context Bundle member
representation role:
  authoritative owner artifact
  coordination projection
  historical evidence
  generated projection
  external canonical reference / copied snapshot
currentness:
  CURRENT
  HISTORICAL
  STALE / REVALIDATION_NEEDED
  SUPERSEDED_REPRESENTATION
last synchronized basis/pass/checkpoint when useful
important outgoing canonical refs
```

These are representation/currentness observations only; they do not redefine Need, Proposal/Decision, Review Coverage, optional Work Record or semantic-owner lifecycle states.

### Work Runtime / P-14 / P-15 handshake

```text
optional Current Work Manifest
+ current USER input
+ canonical owner state
→ Compose Current Work when methodology composition is material
→ bounded work for this pass
→ execute / reconcile through natural owners
→ refresh Manifest when this optional cross-pass projection is active and materially changed
→ P-14 updates/rematerializes its representation when material and authorized
```

When P-15 identifies material revalidation that will not be completed in the current pass and an optional Manifest is active, retain a compact reference/next action there before handoff. Do not copy the full Revalidation Impact Set or execution history when a reference is sufficient.

When several material work artifacts must survive handoff and loose-file fragmentation creates loss/discoverability risk, route the Manifest and related representations through P-14's `Work Context Bundle` pattern rather than inventing a second archive owner.

## Boundary

```text
meaning exists in conversation ≠ explicit Core State required
Unit Resolution exists ≠ Current Result Content exists
Slot RESOLVED ≠ parent Unit/Target Requirement automatically resolved
Unit exists ≠ separate file required
Contextual Unit existed ≠ durable CU result section required
local Work Context snapshot ≠ semantic authority
Current Work Manifest ≠ Need Set / PRS / Review Coverage / optional Work Record
Current Work Manifest ≠ Session State / Shell / semantic owner
local snapshot ≠ Session-owned second ontology
```

<a id="current-work-manifest-selected-contract"></a>
## In-turn stabilization and rolling horizon

One accepted current action and optionally one concrete next action are enough for a truthful Session Manifest; later work may remain `UNESTABLISHED`. Do not fill the Manifest with speculative long-range work merely to make a list look complete.

When a material answer/Decision affects current work, update natural Core/Target state immediately so subsequent reasoning sees the current meaning. If an optional accepted Manifest is active, synchronize exact USER-selected/factual or authorized decomposition meaning there with revision/history trace. If prospective target meaning must still be AI-derived, preserve the accepted Manifest and form/reuse a Proposal plus complete candidate target Manifest under the existing USER review boundary. Optional Session State / Work Record / archive projections are synchronized only when they were explicitly activated.

## Optional accepted Session Work Manifest contract

When the USER explicitly activates a Session Manifest, `WORK-MANIFEST.md` may serve as a session-scale evolving coordination projection. It may carry stable hierarchical action IDs, current/next work, Need→action coverage (including `UNPLANNED`), optional Work Record refs, bounded PRS navigation, artifact/context/review/revalidation dependencies and re-entry route. No S0/Work Record allocation is implied by Manifest use.

Classification of accepted-Manifest writes:

```text
exact USER-selected prospective meaning
→ integrate directly + authority trace + prior revision

factual synchronization
→ direct + prior revision

pure task-local decomposition
→ keep in the natural current semantic/result owner; optional Work Record only when explicitly active

cross-turn pure decomposition
→ direct Manifest refinement when useful + prior revision

AI-derived/not-yet-selected prospective meaning
→ formal Proposal + complete target Manifest + bounded Core PRS + USER_REVIEW_REQUIRED
```

Every accepted Manifest write preserves a recoverable prior revision/snapshot. A first-session Manifest may bootstrap exact USER-authorized current facts; broad prompts that require AI to derive the future plan do not count as exact target selection. Contextual-material handling remains in PRS; the Manifest carries only accepted navigation/dependency consequences.
