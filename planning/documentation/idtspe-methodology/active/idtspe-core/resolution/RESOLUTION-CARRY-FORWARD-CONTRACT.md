<a id="resolution-carry-forward"></a>
# Resolution Carry-Forward Contract

Status: active generic IDTSPE Core resolution owner

Responsibility ID: `RESOLUTION.CARRY-FORWARD`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Proposal / Decision Lifecycle](proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`
> - `CONTEXTUALIZES` [Q/R/P Lifecycle](qrp/QRP-LIFECYCLE-AND-REVIEW.md#resolution-qrp-lifecycle) — `RESOLUTION.QRP-LIFECYCLE`

## Purpose

Own the reusable Core rule for **which unresolved resolution state survives continuation/handoff/re-entry, when an accepted Decision remains worth carrying, when it exits, and when one durable coordination representation is required**.

This contract does **not** own Proposal/Decision or Q/R/P lifecycle semantics, and it does not prescribe one Target Module/file shape. The concrete Core [`TM-PLANNING-RESOLUTION-STATE`](../target-modules/TM-PLANNING-RESOLUTION-STATE.md#tm-planning-resolution-state) is the reusable Target Module that materializes this contract as a bounded Planning Resolution State when that coordination result is useful.

```text
Proposal / Decision lifecycle
+ Q/R/P lifecycle
+ current bounded continuation context
↓
Resolution Carry-Forward qualification
↓
transient continuation context
OR bounded Planning Resolution State Target result
OR another already-existing canonical coordination representation
```

## Authority Boundary

```text
RESOLUTION.CARRY-FORWARD
= continuation qualification / admission / exit / durable-materialization threshold

TM-PLANNING-RESOLUTION-STATE
= reusable concrete Target-result schema for one bounded PRS
  (Units, Collections, item addressing, presentation/composition)

Proposal / Decision Lifecycle
= candidate selection + accepted Decision semantics/integration

Q/R/P Lifecycle
= Question / Risk / Problem semantics and lifecycle
```

A consumer that only needs generic continuation/retention semantics depends on **this contract**, not on `TM-PLANNING-RESOLUTION-STATE / RU-PRS-02`. Depend directly on the PRS Target Module only when the concrete PRS result schema itself is the dependency.

<a id="resolution-carry-forward-qualification"></a>
## Carry-Forward Qualification

Carry only state whose continuation value is material on the current basis:

- open/deferred Proposal work with the Q/R/P and Evidence needed to continue it;
- unresolved subjects whose addressing Proposal is not yet formed, when losing the subject would materially harm continuation;
- accepted Decisions **only while** one or more qualifying material unresolved/residual Q/R/P remain linked to that selection;
- blockers/Evidence/revalidation relations only when they materially support re-entry or the surviving items.

Do not manufacture a Proposal, Decision or Q/R/P merely to make an item eligible for carry-forward. Closed transient resolution work does not remain active merely for history. Natural semantic owners keep accepted result meaning.

<a id="resolution-carry-forward-decision-retention"></a>
## Accepted Decision Admission / Exit

A separately carried accepted Decision requires all of the following:

```text
authorized accepted selection
+ natural integration destination is known
+ at least one material qualifying related Q/R/P remains
+ retaining the selection beside that Q/R/P has continuation/revalidation value
```

Qualifying related Q/R/P include open/deferred Questions or Problems and material accepted/mitigated residual Risks or accepted limitations while continuation value remains. A generic future reconsider condition, historical interest or Evidence link alone is insufficient.

When the last qualifying Q/R/P closes or ceases to be material, the separate carried Decision entry exits current carry-forward. Preserve accepted Unit content and useful ordinary rationale/Evidence at natural owners. Exit does not reverse the Decision, erase historical Evidence or close unrelated Q/R/P.

Proposal/Decision selection and integration remain owned by [`PROPOSAL-AND-DECISION-LIFECYCLE`](proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle). Carry-forward is a continuation projection over that accepted state, not another Decision lifecycle or history register.

<a id="resolution-carry-forward-materialization"></a>
## Durable Coordination Materialization Threshold

One discoverable durable coordination representation is REQUIRED when all are materially true:

```text
work must survive the immediate conversation/session
+ multiple qualifying items must survive continuation/handoff/re-entry
+ those items are not already discoverable together through an existing canonical coordination representation
```

Reuse an existing canonical coordination representation when it already provides stable re-entry. Otherwise a formed `TM-PLANNING-RESOLUTION-STATE` result is the default reusable Core realization; Representation/P-14 chooses its physical placement. A transient Work Context remains valid below the threshold.

An artifact named `RESOLUTION-CARRY-FORWARD.md` is only a physical representation convention. File existence does not create another semantic owner or a second current register.

## Re-entry / Reconciliation

At a material lifecycle boundary or re-entry:

1. preserve still-open/deferred Proposal/Q/R/P relations that retain continuation value;
2. retain only accepted Decisions that still satisfy the Decision admission rule above;
3. remove closed transient carry-forward entries without deleting their natural-owner meaning/Evidence;
4. keep canonical subject/owner references rather than copying full semantic bodies;
5. re-evaluate materialization when scope, item count or discoverability changes materially.

## Boundaries

Do not:

- use carry-forward as a global backlog;
- treat a carried Decision entry as a second Decision owner;
- create a Decision/ADR/history register merely to preserve accepted meaning already integrated at its natural owner;
- make every unresolved item durable;
- require consumers of generic carry-forward semantics to depend on PRS Unit internals;
- infer selection/approval from persistence or continued visibility.
