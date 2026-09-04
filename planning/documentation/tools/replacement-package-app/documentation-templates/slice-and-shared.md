# Templates — Slice and Shared Implementation

Status: physically separated part of the recommended-template owner. Templates remain recommended forms, not schemas.

<a id="template-slice-owner"></a>
## Template — Slice owner

```text
# SL-RPKG-<SEMANTIC-NAME> — <readable Slice name>

## Result / Responsibility
...

## Scenario behavior realized
Feature Interaction context:
- FI-... <navigation only when useful>
Behavior Items realized:
- BI-...

## Domain / Shared capabilities used
- ...

## Slice Implementation Items
<use Implementation Item form for selected durable realization requirements>

## Tests
### Test Items
<selected additional proof-quality requirements>

## Item Groups
<only coupled SI/Test Items; material change to one member triggers group review>

## Evolution Impact
<Evolution Impact form>
```

Use [Template — Implementation Item](implementation.md#template-implementation-item), [Template — Test Item](proof.md#template-test-item) and [Template — Item Group](implementation.md#template-item-group). Do not restate BI/Domain truth as SI; SI adds durable realization meaning. Feature Interaction and Slice decompositions are not 1:1. A known future capability may justify a low-cost port/composition seam now without implementing that future capability prematurely.

---
<a id="template-shared-implementation-capability-owner"></a>
## Template — Shared Implementation Capability owner

Use only when one real reusable implementation responsibility is consumed by several Slices.

```text
# <semantic Shared Implementation Capability name>

## Responsibility
...
## Consumers
- SL-...
## Contract / Result
<stable semantic consumer contract/result when material>
## Behavior Items / implementation requirements realized
<references only when genuinely shared>
## Domain used
...
## Implementation Items
<selected durable shared realization requirements>
## Tests
### Test Items
<selected additional proof requirements>
## Item Groups
<only coupled implementation/proof decisions>
## Evolution Impact
<only affected future steps>
```

Do not create one for generic DRY/logging/composition principles or merely similar helper code.

---
