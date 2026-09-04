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
### SI-...
Requirement:
<durable orchestration/composition/recovery/port/reuse requirement>
Reason:
<why current quality or materially known evolution needs it>
Derived from:
<BI / Domain constraint / Evolution Impact / concrete architecture pressure>

## Tests
### Test Items
<only non-obvious durable proof-quality requirements>

## Evolution Impact
<Evolution Impact form>
```

Feature Interaction and Slice decompositions are not 1:1. A known future capability may justify a port/composition seam now without implementing that future capability prematurely.

---
<a id="template-shared-implementation-capability-owner"></a>
## Template — Shared Implementation Capability owner

Use only when one real reusable implementation responsibility is consumed by several Slices.

```text
# <semantic Shared Implementation Capability name>

## Responsibility
...
## Behavior Items / implementation requirements realized
<references only when genuinely shared>
## Domain used
...
## Consumers
- SL-...
## Implementation Items
<durable shared contract/composition/evolution requirements>
## Tests
### Test Items
<only when useful>
## Evolution Impact
<only affected future steps>
```

Do not create one for generic DRY/logging/composition principles or merely similar helper code.

---
