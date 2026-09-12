# UC-DOC-USE-REPOSITORY-GUIDANCE — Use Repository Methodology / Guidance

## Situation

Repository methodology/documentation may help the current work, or current guidance orientation may be missing, stale, too broad, conflicting, or no longer appropriate to the current situation.

This Use Case is about **working with methodology/documentation files**. It does not own product planning, code changes, Domain/Slice design, Target production, Lens analysis or other specialized work performed by the methodology being consulted.

## Result

The current work has a situation-appropriate methodology orientation: applicable Use Cases and semantic owners are known, required documentation actions are clear, only useful detail is loaded, and contextual adaptations/deferments are explicit when material.

## Process

1. Start from the actual current situation and the useful result the USER is seeking; reuse already-known facts/constraints rather than manufacturing confirmation steps.
2. Logically check the [`Methodology Use-Case Registry Map`](../use-case-registry-map.md), then scan the applicable scoped Use-Case Registry/Registries using their Situation/Result summaries. If this Use Case was itself selected by the same current applicability scan, this check refreshes orientation and discovers **additional** applicable capabilities; it does not recursively invoke this Use Case again while its current Situation/Result remain valid.
3. Open only newly selected or insufficiently-known Use-Case owners and follow their Process. Reuse the current Process for already-active Use Cases while their authority/context remains trustworthy. Several Use Cases may compose when their independently useful Results are all needed.
4. Reuse methodology material already current in context when trustworthy. Reread an owner when its authority/content may be stale or when the selected Process requires detail not currently known.
5. Prefer semantic owners and registries over random browsing. Use README for structural navigation, Use-Case Registry for functional navigation, and specialized registries only when a selected Process routes to them.
6. For each material recommendation, decide proportionally whether it is:
   - applicable as-is;
   - useful with contextual adaptation;
   - useful only as inspiration/theory;
   - deferred until a declared trigger;
   - not useful in the current situation.
7. Perform only the documentation action actually needed. Common actions include:
   - `READ` / `REFRESH` an owner;
   - `SCAN` a registry;
   - `SELECT` an applicable methodology component;
   - `COMPARE` competing guidance/owners;
   - `TRACE` authority/provenance/reachability;
   - `APPLY` a selected methodology component through its own contract;
   - `REVALIDATE` previously selected guidance after context changes.
8. When the active methodology provides its own component types (for example IDTSPE Target Modules or Lenses), treat them like other reachable methodology components: the Use Case Process may route to them, but their own contracts own the specialized work.
9. Load detail lazily. A registry match justifies opening the relevant entry/body; it does not justify opening every sibling component.
10. Preserve methodology-use state only when continuation/review/revalidation benefits from it. Do not create an execution log of every file read.
11. Re-evaluate the Use-Case Registry Map when a material recheck trigger occurs.


This Use Case is not a mandatory wrapper around every IDTSPE operation. Presence of the Documentation scope in the Registry Map or a scan of this registry does not select this row automatically.

## Contextual Guidance Invariant

```text
recommended
≠ selected

selected
≠ automatically executed

available component
≠ applicable component

applicable component
≠ all optional units/fields must be populated
```

The current situation and the selected Use-Case Process determine what is worth consulting. The consulted methodology component then applies its own local applicability/materiality contract.

## High-Level Example

A USER asks to continue an existing software-planning concern.

```text
Use-Case Registry Map
→ Documentation registry + always-active IDTSPE registry
→ UC-IDTSPE-COMPOSE-CURRENT-WORK is applicable
→ its Process sees that current Broad Discussion is still sufficient
→ no Target Module/Lens body is opened yet
→ later a concrete implementation-boundary concern appears
→ the same UC rechecks the methodology registry directory
→ SDS Target Module/Lens registries become relevant
→ only the matching entries/bodies are opened
```

The Documentation Use Case never explains how to discover the implementation Slice; the selected SDS component owns that work.

Shared meaning: [`../principles-and-terminology.md`](../principles-and-terminology.md)
