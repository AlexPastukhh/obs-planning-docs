# Target Work Subject Reference Contract

Status: active generic methodology owner

<a id="target-work-subject-reference"></a>
## Canonical Target Work Subject Reference

Responsibility ID: `TWU.SUBJECT-REFERENCE`

Purpose: define the canonical identity/reference grammar used when another methodology artifact must point to an already-existing Target Work Unit, Collection surface/item, or Unit Resolution Slot subject. This contract owns **reference composition**, not the existence, lifecycle or natural-subject semantics of those subjects.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Target Work Unit contract`](UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-unit-contract) — `TWU.UNIT-CONTRACT`
> - `CONTEXTUALIZES` [`Collection contract`](UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-collection-contract) — `TWU.COLLECTION-CONTRACT`
> - `CONTEXTUALIZES` [`Unit Resolution Slot contract`](UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-slot-contract) — `TWU.SLOT-CONTRACT`
> - `CONTEXTUALIZES` [`Natural Subject / Ownership Boundary`](UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-natural-subject-ownership) — `TWU.NATURAL-SUBJECT-ROUTING`

Canonical references:

```text
Target Work Unit
→ Unit ID

Collection contract/result surface
→ Unit ID + Collection ID

Collection item without a narrower formal Slot subject
→ Unit ID + Collection ID + Item Key / Subject

UNIT_WIDE Slot Definition / runtime role
→ Unit ID + Slot ID

PER_ITEM Slot Definition / common role for one Collection
→ Unit ID + Collection ID + Slot ID

PER_ITEM Slot runtime role for one Collection item
→ Unit ID + Collection ID + Item Key / Subject + Slot ID
```

The reference preserves the smallest already-selected semantic subject. It does **not** decide which subject is natural; that decision remains with the consumer's lifecycle/process plus the canonical Target Work ownership boundary. It also does not create `Collection Instance`, `Item Instance` or `Slot Instance` methodology objects.

Identifier scope required by the reference grammar is owned by the Target Work Unit contract:

- `Collection ID` is unique within the parent Unit Result Content Contract and stable/recoverable while referenced;
- `UNIT_WIDE Slot ID` is unique among Unit-wide Slots of the parent Unit;
- `PER_ITEM Slot ID` is unique within its owning Collection;
- `Item Key / Subject` is stable/recoverable whenever item-local formal reference is required.

A consumer MAY restate one of these forms when local execution/review would be materially harder without it, but that passage must carry a tracked `Semantic Owner Dependency` to `TWU.SUBJECT-REFERENCE`. Prefer linking here rather than recreating the full address table in every lifecycle/use-case/template.

## Boundary

This contract does **not** own:

- what qualifies as a Target Work Unit, Collection or Slot;
- Collection/Slot lifecycle, applicability, materiality or runtime projection;
- which subject a Question/QRP/Proposal/Finding/Lens/Revalidation action should choose;
- Target Module formation/coverage;
- Source, Proposal/Decision, Finding or Lens lifecycle semantics.

Those owners consume this reference contract after they have selected the natural subject.
