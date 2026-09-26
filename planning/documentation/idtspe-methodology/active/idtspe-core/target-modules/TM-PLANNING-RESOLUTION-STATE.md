<a id="tm-planning-resolution-state"></a>
# TM-PLANNING-RESOLUTION-STATE — Planning Resolution State

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Decision record retention](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-decision-retention) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`.
> - `CONTEXTUALIZES` [Resolution Carry-Forward contract](../resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) — `RESOLUTION.CARRY-FORWARD`.

Entry Point: `tm.planning.resolution.state`
Role: generic Core Target Module for bounded planning coordination
Target family / archetype: `PLANNING_RESOLUTION_STATE`

## Authority and activation

Responsibility ID: `TARGET-MODULE.PLANNING-RESOLUTION-STATE`

**Planning Resolution State (PRS) is the reusable Core Target-result realization of the generic Resolution Carry-Forward contract.** [`RESOLUTION.CARRY-FORWARD`](../resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) owns qualification, Decision admission/exit and the durable-materialization threshold. This module owns the concrete bounded Target-result shape: its two Units, Collection/Slot contracts, item addressing, presentation/composition and PRS-local reconciliation. Consumers of generic carry-forward semantics depend on the resolution contract; consumers of this concrete result schema depend on this Target Module.

The result keeps open/deferred Proposals together with their related Q/R/P, and accepted Decisions only while material related Q/R/P require continuation. It may also keep unresolved subjects whose addressing Proposal has not yet been formed. Do not invent a Proposal or Q/R/P just to fill the representation.

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `TARGET-MODULE.META-MODEL`
> Owner: [Target Module Meta-Model](TARGET-MODULE-MODEL.md#target-module-meta-model)

This Target Module owns the **coordination/result shape** of one bounded Planning Resolution State (PRS). Its retained Decision items represent existing Core Decision State under the [Decision record retention contract](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-decision-retention); this module does not define a second Decision type, field semantics or selection lifecycle. Proposal and Decision selection remains with [Proposal and Decision Lifecycle](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle); Question/Risk/Problem semantics remain with [Q/R/P Lifecycle](../resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md#resolution-qrp-lifecycle). Natural Target/Requirement owners retain accepted content. PRS is a Target result, not another Core State kind, semantic owner for every referenced item, mandatory global backlog, or phase workflow.

Form/reuse a PRS when the [Carry-Forward qualification contract](../resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward-qualification) says surviving resolution state needs one coherent bounded coordination result. Its absence does not imply the underlying state is absent. The representation may be transient Work Context, a local working file, or a persisted checkpoint; these are representations of the same semantic result, not separate authorities.

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

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../lenses/LENS-REGISTRY.md)

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

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../lenses/LENS-REGISTRY.md)

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

**Decision membership is delegated to [`RESOLUTION.CARRY-FORWARD`](../resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward-decision-retention).** `RU-PRS-02` represents only Decisions currently admitted by that contract and carries the qualifying Q/R/P references required by its Item Contract. This Target Module does not restate which Q/R/P qualify, the admission rule, or the exit rule. When Carry-Forward removes a Decision from current continuation, remove its PRS Collection Item while preserving the natural-owner meaning governed by the underlying lifecycle owners.

## Unit processing envelope

Both Units follow the generic Opening / In-Unit / Closing Lens applicability envelope. Selected Lenses and checks act on current bounded subjects; no mandatory all-Lenses pass is implied.

#### `RU-PRS-01` processing envelope

1. **Opening Unit Checkpoint — `RU-PRS-01`**: resolve bounded scope, subject references and applicable Lens/validator operations.
2. **Unit Work — `RU-PRS-01`**: maintain Collection Items, recursive links and UNIT_WIDE priority projection.
3. **Closing Unit Checkpoint — `RU-PRS-01`**: check open blockers, status, dependencies and no duplicate owner authority.

#### `RU-PRS-02` processing envelope

1. **Opening Unit Checkpoint — `RU-PRS-02`**: resolve accepted selection, natural owner and qualifying related Q/R/P.
2. **Unit Work — `RU-PRS-02`**: maintain Decision items with required related Q/R/P and material Evidence.
3. **Closing Unit Checkpoint — `RU-PRS-02`**: recheck integration refs and current membership through the Carry-Forward owner; remove Collection Items no longer admitted without changing natural-owner content.

<a id="prs-rcf-presentation"></a>
## Presentation and linked resolution context

Present Active Planning first, then Tracked Decisions. Within each Collection, group entries by their natural semantic subject. Under SDS use [SDS semantic traversal](../../profiles/sds/profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md#sds-semantic-traversal-order): Application Definition → Feature / Scenario / Screen → Domain → Slice → Shared → Evolution → Exact. Other profiles supply their own applicable traversal; Core does not impose SDS families universally. Future Step-owned subjects keep their temporal owner explicit.

Show the current-focus/priority view separately by reference to the same item keys; it must not reorder semantic grouping or copy item bodies. Default P1/P2/P3 bands remain the Active Planning focus contract above. Do not invent empty family groups.

Within each subject show its open/deferred Proposals with their related Q/R/P, statuses, material Evidence and resolution relations. A Decision entry shows the accepted selection, qualifying Q/R/P and integration destination together. Links or compact bodies are valid; all links must reach the actual context. A flat list of Decisions, Proposals or Q/R/P that hides their material relations is insufficient. Preserve many-to-many and recursive Proposal ↔ Q/R/P relations, including addressing Proposals for a Q/R/P; one canonical item may be linked from several entries. A Proposal may have no material Q/R/P; state that proportionally without inventing content. Unresolved subjects may precede candidate formation.

<a id="prs-rcf-materialization"></a>
## Durable Coordination Materialization

The generic threshold is owned by [`RESOLUTION.CARRY-FORWARD`](../resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward-materialization). When that threshold is met and this Target Module is the selected reusable realization, maintain one discoverable PRS result for the useful coordination scope. Representation/P-14 chooses physical placement; a persisted `PRS.md` (or an already-established equivalent name) is only a representation of this Target result, not another semantic owner.

Reconcile PRS membership using the carry-forward admission/exit contract after material lifecycle boundaries while preserving this module's Collection/item identities for surviving entries.

## Representation and checkpoint

An active PRS may live in the current conversation or local working file without persistence. A proportionate checkpoint preserves the PRS result needed for re-entry. Physical file presence does not determine semantic acceptance. Physical placement, including Proposal Workspace Archive representation, is owned by [Documentation / Representation + P-14](../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md#representation-artifact-placement); this Target Module does not define archive layout or packaging.

## Example

The [Study Tab Launcher PRS](../../profiles/sds/examples/study-tab-launcher/project/planning/documentation/resolution-carry-forward.md) demonstrates an unresolved current Problem, separate evidence work, a future Step dependency and an accepted Decision carried with its actual related Problem. Its current basis has no open candidate Proposal; that absence is explicit.

## Relations and guards

- `RESOLUTION.CARRY-FORWARD` owns generic continuation qualification/admission/exit; this module owns the concrete PRS result schema when a bounded PRS is formed.
- [Decision Revalidation](../resolution/proposal-decision/DECISION-REVALIDATION.resolution-projection.md#resolution-decision-revalidation-projection) is an optional review view for an accepted Decision; active carry-forward qualification follows the Core Carry-Forward contract and this module represents the resulting bounded PRS membership.
- [Proposal/Decision lifecycle](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) owns selection and integration. PRS does not turn a proposal file at a final path into accepted current truth.
- Under SDS, accepted but unrealized downstream meaning remains in its Evolution Step/Target Body until realization/materialization.
