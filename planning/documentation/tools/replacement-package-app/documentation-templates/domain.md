# Templates — Domain

Status: physically separated part of the recommended-template owner. Templates remain recommended forms, not schemas.

<a id="template-aggregate-domain-owner"></a>
## Template — Aggregate Domain owner

```text
# <Aggregate>

## Responsibility / Consistency Boundary
<business/domain responsibility and consistency boundary>

## Behavior Items implemented
- BI-...

## Domain Concepts / Invariants
<semantic meaning, not class/field inventory>

## Domain Implementation Items
<use Implementation Item form; DI-* only for selected durable realization requirements>

## Tests
### Test Items
<selected additional proof-quality requirements only>

## Item Groups
<only coupled DI/Test Items; material change to one member triggers group review>

## Evolution Impact
<Evolution Impact form for affected future steps>
```

Use [Template — Implementation Item](implementation.md#template-implementation-item) for `DI-*` and [Template — Item Group](implementation.md#template-item-group) for coupled realization/proof decisions. Use [Template — Test Item](proof.md#template-test-item) for non-obvious durable proof requirements.

`DI-*`, Tests/Test Items, Item Groups and Evolution Impact are optional when no material additional requirement exists. Do not restate BI/invariants as DI. Aggregate tests normally cover included Domain Objects unless independent semantic ownership makes a separate proof owner clearer; a focused physical test file alone does not create a new semantic owner.

---
<a id="template-domain-object-owner"></a>
## Template — Domain Object owner

Use separately only when independent semantics, identity/lifecycle, reuse or rule volume makes this clearer than keeping the object inside its Aggregate.

```text
# <Domain Object>

## Responsibility / Meaning
...
## Behavior Items implemented
- BI-...
## Identity / Relationships / Invariants
...
## Domain Implementation Items
<DI-* only when selected Requirements Discovery answers add durable realization meaning>
## Tests / Test Items
<only when useful>
## Item Groups
<only coupled Items>
## Evolution Impact
<only affected future steps>
```

A source class is not by itself a reason to create this owner.

---
