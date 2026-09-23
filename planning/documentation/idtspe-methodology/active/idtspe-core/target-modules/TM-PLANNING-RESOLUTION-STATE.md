<a id="tm-planning-resolution-state"></a>
# TM-PLANNING-RESOLUTION-STATE — Planning Resolution State

Entry Point: `tm.planning.resolution.state`
Role: generic Core Target Module for bounded planning coordination
Target family / archetype: `PLANNING_RESOLUTION_STATE`

## Authority and activation

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `TARGET-MODULE.META-MODEL`
> Owner: [Target Module Meta-Model](TARGET-MODULE-MODEL.md#target-module-meta-model)

This Target Module owns the **coordination/result shape** of one bounded Planning Resolution State (PRS). Proposal and Decision selection remains with [Proposal and Decision Lifecycle](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle); Question/Risk/Problem semantics remain with [Q/R/P Lifecycle](../resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md#resolution-qrp-lifecycle). Natural Target/Requirement owners retain accepted content. PRS is a Target result, not another Core State kind, semantic owner for every referenced item, mandatory global backlog, or phase workflow.

Form/reuse a PRS when open Proposal/Q/R/P work, accepted choices worth tracking, or a cross-owner handoff needs one coherent view. Its absence does not imply the underlying state is absent. The representation may be transient Work Context, a local working file, or a persisted checkpoint; these are representations of the same semantic result, not separate authorities.

## Target Step Result

**Target Step Result:** `Planning Resolution State`

Exactly two Module-defined Units, each a Collection Unit under the [Target Work Unit/Collection/Slot contract](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-collection-contract):

| Result Unit | Collection | Meaning |
|---|---|---|
| `RU-PRS-01` | Active Planning Items | Bounded unresolved or selected-for-current-resolution work |
| `RU-PRS-02` | Tracked Decision Items | Accepted selections deliberately retained for coordination, revalidation, checkpoint or user-chosen history |

The repeated entries are **Collection Items**, not peer Units. `Target Ref`, optional `Unit Ref` and optional `Unit Slot Ref` address the *subject* inside an item; they are not decomposition of PRS itself. An item can reference more than one natural subject where one decision spans owners. Use stable local item keys and external refs only where needed for unambiguous navigation.

### RU-PRS-01 — Active Planning

`UNIT_WIDE` Slot: `CURRENT-FOCUS / PRIORITY PROJECTION`. It points to the same Collection Items and does not copy their Proposal/Q/R/P bodies. In SDS context, present the Collection itself by [SDS semantic traversal](../../profiles/sds/profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md#sds-semantic-traversal-order); priority is a separate attention view.

Default focus bands (override for a user instruction, blocker, dependency or material risk):

1. `P1` — existing/current owner issue, Finding, Problem, Proposal or Q/R/P affecting current correctness or blocking planning.
2. `P2` — current or next realization-near Evolution Step.
3. `P3` — concrete later Evolution Steps.

Local item keys suffice for priority references when unambiguous. No separate Priority Unit is formed.

`PER_ITEM` Slots:

| Slot | Meaning |
|---|---|
| `SUBJECT` | Natural Target Ref; Unit Ref / Unit Slot Ref when needed. |
| `DRIVER` | Goal/Desired Outcome, Question, Risk, Problem, Finding, or combination. |
| `PROPOSALS` | Zero or more candidate Proposal refs/compact bodies, including compatible groups and recursive links. |
| `QRP` | Zero or more Question/Risk/Problem refs and relations, including Q/R/P that have their own addressing Proposals. |
| `EVIDENCE` | Zero or more material supporting/needed Evidence references. |

Keep the Proposal ↔ Q/R/P graph recursive and addressable; do not flatten it into one selected answer or invent a mandatory Proposal Tree ontology. An item may be blocked/deferred, or may remain open after some compatible Proposals are selected.

### RU-PRS-02 — Tracked Decisions

`PER_ITEM` Slots:

| Slot | Meaning |
|---|---|
| `SUBJECT / INTEGRATED-INTO` | Natural owner/Target/Unit/Slot and accepted content destination. |
| `ACCEPTED-SELECTION` | Exact selected Proposal, compatible set or bounded selected meaning. |
| `RETENTION / COORDINATION VALUE` | User-chosen horizon and reason to retain this trace. |
| `QRP` | Zero or more residual/reconsideration Question/Risk/Problem refs. |
| `EVIDENCE` | Zero or more supporting/revalidation Evidence refs. |

Residual Q/R/P is **not required** for retention. The user may keep a Decision for a chosen duration, including indefinitely; useful reasons include cross-owner coordination, a selected library/framework dependency, future migration/revalidation, and checkpoint value. Accepted meaning belongs in its natural owner even if the Decision trace stays. Closing Q/R/P never silently deletes a user-retained Decision. A Decision need not be retained when the owner content alone suffices.

## Unit processing envelope

Both Units follow the generic Opening / In-Unit / Closing Lens applicability envelope. Selected Lenses and checks act on current bounded subjects; no mandatory all-Lenses pass is implied.

#### `RU-PRS-01` processing envelope

1. **Opening Unit Checkpoint — `RU-PRS-01`**: resolve bounded scope, subject references and applicable Lens/validator operations.
2. **Unit Work — `RU-PRS-01`**: maintain Collection Items, recursive links and UNIT_WIDE priority projection.
3. **Closing Unit Checkpoint — `RU-PRS-01`**: check open blockers, status, dependencies and no duplicate owner authority.

#### `RU-PRS-02` processing envelope

1. **Opening Unit Checkpoint — `RU-PRS-02`**: resolve accepted selection, natural owner and user retention horizon.
2. **Unit Work — `RU-PRS-02`**: maintain retained Decision items with optional Q/R/P/Evidence.
3. **Closing Unit Checkpoint — `RU-PRS-02`**: recheck integration refs and retention without silently deleting user-retained items.

## Representation, checkpoint and archive

An active PRS may live in the current conversation or local working file without persistence. A proportionate checkpoint preserves open Proposal/Q/R/P graphs, retained Decisions, blockers and material Evidence/revalidation relations needed for re-entry. Physical file presence does not determine semantic acceptance.

For a Proposal Workspace Archive, a derived, non-owning `Workspace Authority Projection` may list final workspace path plus Target/Unit/Slot subject, `ACCEPTED` or `PROPOSED` status, and Proposal identity/status for proposed meaning. One file may contain mixed subject statuses. An archive view has a bounded scope, basis and identity and contains only mutually compatible candidate versions at each final-shaped path. ZIP creation does not select, accept or persist its contents. A Replacement Package carries only semantically accepted changes.

## Relations and guards

- [Carry-Forward](../resolution/continuation/RESOLUTION-CARRY-FORWARD-PROJECTION.md#resolution-carry-forward) projects this state for continuation; it does not own a second backlog or item schema.
- [Decision Revalidation](../resolution/proposal-decision/DECISION-REVALIDATION.resolution-projection.md#resolution-decision-revalidation-projection) is an optional view for a retained Decision; it does not decide retention.
- [Proposal/Decision lifecycle](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) owns selection and integration. PRS does not turn a proposal file at a final path into accepted current truth.
- Under SDS, accepted but unrealized downstream meaning remains in its Evolution Step/Target Body until realization/materialization.
