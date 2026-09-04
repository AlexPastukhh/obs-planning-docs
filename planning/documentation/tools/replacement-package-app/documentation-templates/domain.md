# Templates — Domain

Status: physically separated part of the recommended-template owner. Templates remain recommended forms, not schemas.

<a id="template-aggregate-domain-owner"></a>
## Template — Aggregate Domain owner

```text
# <Aggregate>

## Responsibility
<business/domain responsibility and consistency boundary>

## Behavior Items implemented
- BI-...

## Domain Concepts / Invariants
<semantic meaning, not class/field inventory>

## Domain Implementation Items
### DI-...
Requirement:
<durable current architecture requirement>
Reason:
<why it matters for current correctness/quality or materially known evolution>
Derived from:
<BI / invariant / Evolution Impact / concrete architecture pressure, when useful>

## Tests
### Test Items
<only non-obvious durable proof-quality requirements>

## Evolution Impact
<Evolution Impact form for affected future steps>
```

`DI-*`, Tests/Test Items and Evolution Impact are optional when their information is obvious/unneeded. Aggregate tests normally cover included Domain Objects unless independent ownership makes a separate proof owner clearer.

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
<DI-* only when useful>
## Tests
<only when independent test ownership is clearer than Aggregate-level proof>
## Evolution Impact
<only affected future steps>
```

A source class is not by itself a reason to create this owner.

---
