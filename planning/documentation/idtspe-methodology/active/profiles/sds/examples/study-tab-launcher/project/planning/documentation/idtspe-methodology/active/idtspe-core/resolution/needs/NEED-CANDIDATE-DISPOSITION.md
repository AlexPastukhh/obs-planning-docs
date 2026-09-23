# Need Candidate Disposition Contract

Status: active generic IDTSPE Core owner
Purpose: define how an already grounded Need Candidate is evaluated and routed after collection, before the methodology knows whether the correct destination is current realization, Finding, Proposal, Requirement/owner meaning, Evolution Step or another existing semantic owner.

<a id="resolution-need-candidate-disposition"></a>
## 1. Core Definition

Responsibility ID: `RESOLUTION.NEED-CANDIDATE-DISPOSITION`

```text
Need Candidate
= a newly surfaced wanted outcome / capability / property / constraint
  whose correct semantic owner, solution and temporal destination
  are not yet sufficiently resolved.

Need Candidate Disposition
= proportional Core evaluation of a collected Need Candidate that determines what the need means,
  whether it is already covered, what semantic subject/owner it affects,
  and which existing lifecycle/owner should receive the result.
```

A Need Candidate is a lightweight intake/Core boundary. It is **not automatically a persisted State Unit, Target, Feature, Requirement, Proposal or Evolution Step**.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Need Candidate Collection`](NEED-CANDIDATE-COLLECTION.md#resolution-need-candidate-collection) — `RESOLUTION.NEED-CANDIDATE-COLLECTION`
> - `CONTEXTUALIZES` [`Proposal / Decision Lifecycle`](../proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`
> - `CONTEXTUALIZES` [`Finding Disposition`](../findings/FINDING-DISPOSITION.md#resolution-finding-disposition) — `RESOLUTION.FINDING-DISPOSITION`
> - `CONTEXTUALIZES` [`Q/R/P Lifecycle`](../qrp/QRP-LIFECYCLE-AND-REVIEW.md#resolution-qrp-lifecycle) — `RESOLUTION.QRP-LIFECYCLE`

The sections below may explain handoff conditions to those lifecycles, but they do not redefine those lifecycle contracts.

```text
Need discovered now ≠ meaning starts now.
Discovery time ≠ semantic time.
Representation absence ≠ semantic absence.
```

Disposition must distinguish a genuinely new desired semantic state from a desired outcome that was already entailed by accepted current owner meaning but was never made explicit enough in its Requirement/invariant representation.

Typical USER language includes:

```text
"хотелось бы ..."
"хочу, чтобы ..."
"нужна возможность ..."
"было бы хорошо ..."
```

The semantic role is determined from meaning/context, not from trigger words alone. A sentence that already proposes a concrete answer may be a Proposal instead; a sentence that reports a contradiction/defect may be a Finding Candidate.

## 2. Evidence / Provenance Boundary

A USER-origin Need Candidate must remain grounded in the **exact originating USER input**. Keep two meanings distinct:

```text
exact USER statement
= Evidence / provenance of what the USER actually expressed

normalized desired outcome
= derived, reviewable interpretation used for disposition
```

The exact statement proves what was expressed; it does **not** prove a particular solution, owner classification or Requirement.

Evidence may be retained by:

```text
authoritative Source/message reference
OR exact verbatim snapshot
OR both
```

When a Need Candidate is persisted independently of the originating conversation/Source, enough exact provenance must be retained to prevent the normalized need from becoming unsupported AI interpretation. If it remains transient in the current conversation and the Source is reliably addressable, a duplicate persisted quote is not required.

Clarifications do not overwrite the original statement. Preserve the useful provenance chain and update the normalized interpretation only as warranted.

## 3. Core Disposition Flow

```text
Need Candidate Collection
        │
        ▼
grounded Need Candidate + provenance
        │
        ▼
Need Candidate Disposition
        │
        ├─ reuse/verify collection provenance and normalized desired outcome
        ├─ clarify interpretation only when disposition requires it
        ├─ materiality
        ├─ affected/current meaning
        ├─ smallest plausible semantic subject / owner
        ├─ current coverage / contradiction check
        ├─ solution/decision state
        └─ temporal / Evolution placement when applicable
        │
        ▼
existing canonical owner/lifecycle
```

Resolve only what is useful for the current work. Do not create routing ceremony when the destination is obvious.

## 4. Disposition Questions

Resolve proportionally:

```text
1. What exact outcome does the USER want?
2. Is it material for the current scope?
3. What accepted current meaning / actual realization is relevant?
4. Is the outcome already covered by accepted current meaning?
5. What is the smallest plausible semantic subject / natural owner?
6. Is a concrete candidate answer already present?
7. Does review reveal a defect/contradiction rather than a new desired outcome?
8. Is a new materially unrealized semantic transition actually required?
9. If SDS Evolution planning applies, does the selected/coherent change belong
   to an existing Step or justify a new Step boundary?
```

Useful outcomes include:

```text
already represented / already supported
→ current owner / usage / Evidence / realization route

desired outcome already entailed by accepted current meaning
+ corresponding durable must-hold was not explicit
→ CURRENT SEMANTIC COMPLETION
→ natural current owner
→ BR / IR-DOMAIN / IR-SLICE / IR-SHARED / PFR when warranted by the active profile
→ no Proposal merely to re-select already accepted meaning
→ no Evolution Step

accepted current meaning already requires the outcome
+ actual implementation/Evidence violates it
→ CURRENT REALIZATION CORRECTION
→ Finding Disposition / exact correction as appropriate
→ no semantic Evolution Step

actual defect / contradiction surfaced
→ Finding Candidate
→ Finding Disposition

concrete candidate answer exists
→ Proposal
→ canonical Proposal Candidate Review / selection

material Question / Risk / Problem remains
→ Q/R/P or Broad Discussion / discovery as useful

accepted/derived owner meaning is sufficiently determined
→ route to the natural current/future owner
→ classify BR / IR-DOMAIN / IR-SLICE / IR-SHARED / PFR only through
  the active profile/owner rules when a durable must-hold actually exists

materially unrealized SDS transition is sufficiently coherent
→ existing TM-EVOLUTION-STEP when it is part of that coherent transition
→ new Step candidate only for an independently coherent qualitative transition
```

`Need Candidate → Feature`, `Need Candidate → Requirement` and `Need Candidate → Evolution Step` are **not automatic conversions**.

## 5. Relation To Proposal

A Need Candidate describes the **wanted result before a candidate answer is necessarily known**.

```text
"хотелось бы останавливаться после Apply"
→ Need Candidate

"можно добавить ApplyExtent"
→ Proposal
```

Disposition may discover zero, one or several real Proposals. Once a candidate answer exists, canonical Proposal/Decision lifecycle owns candidate review, semantic-change impact and selection. Do not duplicate Proposal lifecycle here.

The Proposal should address the normalized Goal / Desired Outcome and may retain the Need Candidate/source reference as driver provenance when useful.

## 6. Relation To Finding

Finding and Need may share some routing questions but answer different semantic questions:

```text
Finding Candidate
= what potentially material problem/contradiction did we discover?

Need Candidate
= what wanted outcome is being requested before its correct solution/home is known?
```

A desired outcome is not a Finding merely because satisfying it may require change. A suggested solution is not a Finding merely because it came from the USER.

If Need Candidate Disposition establishes that accepted current meaning already requires the outcome but implementation/Evidence contradicts it, route that newly established contradiction through Finding Disposition.

## 7. SDS Evolution Placement

Under SDS, future-state placement is resolved **after** enough semantic meaning exists to identify a concrete unrealized transition. Before Evolution placement, test whether the surfaced meaning is semantically new at all.

```text
Need Candidate
→ disposition / Proposal resolution / selection as needed
→ materially unrealized change?

NO — already entailed current meaning
→ current semantic completion and/or current realization correction
→ current owner / realization / Evidence / no-op route
→ no Evolution Step

YES — not already entailed + sufficiently concrete materially unrealized meaning
→ existing Step when the change belongs to that coherent qualitative transition
→ new candidate Step when an independent transition boundary is justified
→ an explicitly requested Proposal Target Result may form an ordinary candidate Target Instance before semantic selection; Proposal/Target lifecycle owners govern its candidate authority, and selection is still required for canonical integration/materialization/realization authority
```

A vague wanted outcome alone does not justify a Step. `TM-EVOLUTION-STEP` remains the authority for Step applicability, Feature target states, Evolution Impacts and materialization.

## 8. Persistence Boundary

Need Candidate is **transient by default**. Persist it only when independent addressability, deferred disposition, cross-session continuity, provenance or backlog value is material.

When persisted, keep at minimum enough information to reconstruct:

```text
normalized need / desired outcome
origin / producer
exact USER Evidence or authoritative exact Source reference
disposition status/destination when useful
```

Persistence does not make the Need Candidate a semantic owner. After disposition, durable selected meaning belongs to the natural owner/Proposal/Decision/Evolution Step rather than a permanent Need-owned shadow copy.

## 9. Command / Scenario Boundary

`idtspe.needs.disposition` is the reusable orchestration surface over this contract. `idtspe.needs.collect` is separately owned by Need Candidate Collection and stops before disposition. Neither command creates a second lifecycle. Canonical methodology scenarios may reference these owners semantically; Planning Helper may derive command equivalents from those semantic references. Scenario prose must remain command-free.
