<a id="tm-planning-resolution-state"></a>
# TM-PLANNING-RESOLUTION-STATE — Planning Resolution State / Resolution Carry-Forward

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Decision record retention](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-decision-retention) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`.

Entry Point: `tm.planning.resolution.state`
Role: generic Core Target Module for bounded planning coordination
Target family / archetype: `PLANNING_RESOLUTION_STATE`

## Authority and activation

Responsibility ID: `RESOLUTION.CARRY-FORWARD`

**Planning Resolution State (PRS) and Resolution Carry-Forward (RCF) name the same bounded coordination result.** This module is their single canonical owner for membership, Collection/Slot shape, presentation order and continuation materialization. The existing TM, Unit and Slot IDs remain stable. All consumers reference this owner directly.

The result keeps open/deferred Proposals together with their related Q/R/P, and accepted Decisions only while material related Q/R/P require continuation. It may also keep unresolved subjects whose addressing Proposal has not yet been formed. Do not invent a Proposal or Q/R/P just to fill the representation.

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `TARGET-MODULE.META-MODEL`
> Owner: [Target Module Meta-Model](TARGET-MODULE-MODEL.md#target-module-meta-model)

This Target Module owns the **coordination/result shape** of one bounded Planning Resolution State (PRS). Its retained Decision items represent existing Core Decision State under the [Decision record retention contract](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-decision-retention); this module does not define a second Decision type, field semantics or selection lifecycle. Proposal and Decision selection remains with [Proposal and Decision Lifecycle](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle); Question/Risk/Problem semantics remain with [Q/R/P Lifecycle](../resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md#resolution-qrp-lifecycle). Natural Target/Requirement owners retain accepted content. PRS is a Target result, not another Core State kind, semantic owner for every referenced item, mandatory global backlog, or phase workflow.

Form/reuse a PRS/RCF when open Proposal/Q/R/P work, accepted Decisions with material related Q/R/P, or a cross-owner resolution handoff needs one coherent view. Its absence does not imply the underlying state is absent. The representation may be transient Work Context, a local working file, or a persisted checkpoint; these are representations of the same semantic result, not separate authorities.

## Target Step Result

**Target Step Result:** `Planning Resolution State`

Exactly two Module-defined Units, each a Collection Unit under the [Target Work Unit/Collection/Slot contract](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-collection-contract):

| Result Unit | Collection | Meaning |
|---|---|---|
| `RU-PRS-01` | Active Planning Items | Bounded unresolved or selected-for-current-resolution work |
| `RU-PRS-02` | Tracked Decision Items | Accepted selections carried forward with their material unresolved/residual Q/R/P |

The repeated entries are **Collection Items**, not peer Units. `Target Ref`, optional `Unit Ref` and optional `Unit Slot Ref` address the *subject* inside an item; they are not decomposition of PRS itself. An item can reference more than one natural subject where one decision spans owners. The stable PRS-local Item Key identifies an entry across reordering and priority changes; it does not replace the referenced natural owner or Proposal/Decision identity. A PER_ITEM formal reference follows `PRS Target → RU-PRS-0x → Collection ID → Item Key → Slot ID`; the UNIT_WIDE focus Slot is addressed as `PRS Target → RU-PRS-01 → PRS-ACTIVE-CURRENT-FOCUS` without a Collection or Item segment.

<a id="ru-prs-01--active-planning"></a>
### RU-PRS-01 — Active Planning

**Responsibility.** Maintain the bounded unresolved or selected-for-current-resolution planning items and their current attention order.

**Purpose.** Keep linked Proposal/Q/R/P work navigable across owners without replacing their authority or creating a global backlog.

**Applicability.** Resolve this Unit for a formed PRS; its Collection may contain zero items when only Decisions with qualifying Q/R/P remain.

**Result Content Contract.** One `Active Planning Items` Collection (`Collection ID: PRS-ACTIVE-ITEMS`, cardinality `0..N`). **Item Contract:** one coherent current planning subject with its driver, linked candidate Proposals, related Q/R/P and Evidence as material, allowing recursive links without copying source bodies. **Item Key / Subject:** a unique, stable PRS-local item key (`PRS-ACTIVE-*`) with natural owner/Target/Unit/Slot references carried in its `SUBJECT` Slot; keep the key stable while that item is active.

`UNIT_WIDE` Slot `PRS-ACTIVE-CURRENT-FOCUS` — `CURRENT-FOCUS / PRIORITY PROJECTION`. It points to the same Collection Item Keys and does not copy their Proposal/Q/R/P bodies. In SDS context, present the Collection itself by [SDS semantic traversal](../../profiles/sds/profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md#sds-semantic-traversal-order); priority is a separate attention view. The Slot is Unit-wide, not a member of the Collection.

Default focus bands (override for a user instruction, blocker, dependency or material risk):

1. `P1` — existing/current owner issue, Finding, Problem, Proposal or Q/R/P affecting current correctness or blocking planning.
2. `P2` — current or next realization-near Evolution Step.
3. `P3` — concrete later Evolution Steps.

Local item keys suffice for priority references when unambiguous. No separate Priority Unit is formed.

`PER_ITEM` Slots:

| Slot ID | Slot | Meaning |
|---|---|---|
| `PRS-ACTIVE-SUBJECT` | `SUBJECT` | Natural Target Ref; Unit Ref / Unit Slot Ref when needed. |
| `PRS-ACTIVE-DRIVER` | `DRIVER` | Goal/Desired Outcome, Question, Risk, Problem, Finding, or combination. |
| `PRS-ACTIVE-PROPOSALS` | `PROPOSALS` | Zero or more candidate Proposal refs/compact bodies, including compatible groups and recursive links. |
| `PRS-ACTIVE-QRP` | `QRP` | Zero or more Question/Risk/Problem refs and relations, including Q/R/P that have their own addressing Proposals. |
| `PRS-ACTIVE-EVIDENCE` | `EVIDENCE` | Zero or more material supporting/needed Evidence references. |

Keep the Proposal ↔ Q/R/P graph recursive and addressable; do not flatten it into one selected answer or invent a mandatory Proposal Tree ontology. An item may be blocked/deferred, or may remain open after some compatible Proposals are selected.

<a id="ru-prs-02--tracked-decisions"></a>
### RU-PRS-02 — Tracked Decisions

**Responsibility.** Represent qualifying retained Core Decisions together with their material unresolved/residual Q/R/P after integration of accepted meaning into natural Units.

**Purpose.** Keep unresolved consequences and revalidation work attached to the accepted selection and its integration destination.

**Applicability.** Resolve this Unit for a formed PRS; its Collection may contain zero items when no accepted Decision has qualifying related Q/R/P.

**Result Content Contract.** One `Tracked Decision Items` Collection (`Collection ID: PRS-TRACKED-DECISIONS`, cardinality `0..N`). **Item Contract:** one accepted selection or compatible selected set with its natural integration destination, a continuation reason, one or more material unresolved/residual Q/R/P references and optional Evidence. **Item Key / Subject:** a unique, stable PRS-local item key (`PRS-DECISION-*`) for each retained decision entry, even if a selection spans several owners; the natural destination is in its `SUBJECT / INTEGRATED-INTO` Slot.

`PER_ITEM` Slots:

| Slot ID | Slot | Meaning |
|---|---|---|
| `PRS-DECISION-SUBJECT` | `SUBJECT / INTEGRATED-INTO` | Natural owner/Target/Unit/Slot and accepted content destination. |
| `PRS-DECISION-SELECTION` | `ACCEPTED-SELECTION` | Selected Proposal/set reference or concise bounded selection context under the Core lifecycle; link to integrated Unit content rather than copying a full normative owner body. |
| `PRS-DECISION-RETENTION` | `RETENTION / COORDINATION VALUE` | Related Q/R/P that qualify this entry and the condition for leaving active carry-forward. |
| `PRS-DECISION-QRP` | `QRP` | One or more material unresolved/residual Question/Risk/Problem refs, with status and their relation to this Decision. |
| `PRS-DECISION-EVIDENCE` | `EVIDENCE` | Zero or more supporting/revalidation Evidence refs. |

**Decision membership requires qualifying related Q/R/P (1..N).** Open/deferred Questions or Problems and material accepted/mitigated residual Risks or accepted limitations qualify while continuation value remains. Fully resolved Q/R/P, a generic future reconsider condition, historical interest or an Evidence link alone do not qualify a Decision. Name the actual related Q/R/P and why it remains material; do not manufacture one to retain a choice.

When the last qualifying Q/R/P closes or ceases to be material, remove the separate retained Decision record from the current PRS/RCF result. Preserve accepted Unit content and useful ordinary rationale/Evidence at their natural owners. Do not move the record to an independent Decision/ADR/history owner. This exit does not reverse selection, erase immutable historical Evidence or close unrelated Q/R/P.

### Worked admission / exit cases

These cases demonstrate this module and the linked Core retention contract; they do not add a separate lifecycle.

| Case | Representation |
|---|---|
| Authorized selected meaning, no qualifying Q/R/P | Normal Unit content; no separate retained Decision record. |
| Authorized selection, qualifying Q/R/P and independent retention value | One retained Core Decision item in this PRS, with selected context and integration/QRP references. |
| Last qualifying Q/R/P closes | Remove the retained Decision item; preserve accepted Unit content. |
| Unselected candidate with Q/R/P | Proposal/question context; Q/R/P does not establish selection. |
| One choice spans several owners | Each Unit owns its accepted meaning; one representation of the same retained Decision in its coordination scope. |
| Historical interest without qualifying Q/R/P | Useful ordinary context or immutable historical Evidence; no manufactured Q/R/P or alternative current Decision register. |

## Unit processing envelope

Both Units follow the generic Opening / In-Unit / Closing Lens applicability envelope. Selected Lenses and checks act on current bounded subjects; no mandatory all-Lenses pass is implied.

#### `RU-PRS-01` processing envelope

1. **Opening Unit Checkpoint — `RU-PRS-01`**: resolve bounded scope, subject references and applicable Lens/validator operations.
2. **Unit Work — `RU-PRS-01`**: maintain Collection Items, recursive links and UNIT_WIDE priority projection.
3. **Closing Unit Checkpoint — `RU-PRS-01`**: check open blockers, status, dependencies and no duplicate owner authority.

#### `RU-PRS-02` processing envelope

1. **Opening Unit Checkpoint — `RU-PRS-02`**: resolve accepted selection, natural owner and qualifying related Q/R/P.
2. **Unit Work — `RU-PRS-02`**: maintain Decision items with required related Q/R/P and material Evidence.
3. **Closing Unit Checkpoint — `RU-PRS-02`**: recheck integration refs and Q/R/P membership; remove completed retained Decision entries while preserving accepted Unit content and ordinary context.

<a id="prs-rcf-presentation"></a>
## Presentation and linked resolution context

Present Active Planning first, then Tracked Decisions. Within each Collection, group entries by their natural semantic subject. Under SDS use [SDS semantic traversal](../../profiles/sds/profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md#sds-semantic-traversal-order): Application Definition → Feature / Scenario / Screen → Domain → Slice → Shared → Evolution → Exact. Other profiles supply their own applicable traversal; Core does not impose SDS families universally. Future Step-owned subjects keep their temporal owner explicit.

Show the current-focus/priority view separately by reference to the same item keys; it must not reorder semantic grouping or copy item bodies. Default P1/P2/P3 bands remain the Active Planning focus contract above. Do not invent empty family groups.

Within each subject show its open/deferred Proposals with their related Q/R/P, statuses, material Evidence and resolution relations. A Decision entry shows the accepted selection, qualifying Q/R/P and integration destination together. Links or compact bodies are valid; all links must reach the actual context. A flat list of Decisions, Proposals or Q/R/P that hides their material relations is insufficient. Preserve many-to-many and recursive Proposal ↔ Q/R/P relations, including addressing Proposals for a Q/R/P; one canonical item may be linked from several entries. A Proposal may have no material Q/R/P; state that proportionally without inventing content. Unresolved subjects may precede candidate formation.

<a id="prs-rcf-materialization"></a>
## Durable Coordination Materialization Threshold

One discoverable durable representation is REQUIRED when the Work Context survives the immediate conversation/session, multiple material qualifying items must survive continuation/handoff/re-entry, and those items are not already discoverable together through an existing coordination representation. Reuse that representation where available. A transient context below this threshold needs no separate file.

The persisted PRS checkpoint and an artifact named `RESOLUTION-CARRY-FORWARD.md` represent the same result. Keep one maintained result per useful coordination scope. Representation/P-14 chooses the physical location; it creates no second RCF register. Reconcile after material lifecycle boundaries: keep surviving open/deferred Proposals and their Q/R/P, retain only qualifying Decision entries, and remove closed transient state. Re-entry reads this same result and follows its natural owner references.

## Representation, checkpoint and archive

An active PRS may live in the current conversation or local working file without persistence. A proportionate checkpoint preserves open Proposal/Q/R/P graphs, Decisions with qualifying Q/R/P, blockers and material Evidence/revalidation relations needed for re-entry. Physical file presence does not determine semantic acceptance.

For a Proposal Workspace Archive, a derived, non-owning `Workspace Authority Projection` may list final workspace path plus Target/Unit/Slot subject, `ACCEPTED` or `PROPOSED` status, and Proposal identity/status for proposed meaning. One file may contain mixed subject statuses. An archive view has a bounded scope, basis and identity and contains only mutually compatible candidate versions at each final-shaped path. ZIP creation does not select, accept or persist its contents. A Replacement Package carries only semantically accepted changes.

## Example

The [Study Tab Launcher PRS/RCF](../../profiles/sds/examples/study-tab-launcher/project/planning/documentation/resolution-carry-forward.md) demonstrates an unresolved current Problem, separate evidence work, a future Step dependency and an accepted Decision carried with its actual related Problem. Its current basis has no open candidate Proposal; that absence is explicit.

## Relations and guards

- PRS and RCF use one result, membership contract and item schema at this owner.
- [Decision Revalidation](../resolution/proposal-decision/DECISION-REVALIDATION.resolution-projection.md#resolution-decision-revalidation-projection) is an optional review view for an accepted Decision; active PRS/RCF membership follows this module.
- [Proposal/Decision lifecycle](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) owns selection and integration. PRS does not turn a proposal file at a final path into accepted current truth.
- Under SDS, accepted but unrealized downstream meaning remains in its Evolution Step/Target Body until realization/materialization.
