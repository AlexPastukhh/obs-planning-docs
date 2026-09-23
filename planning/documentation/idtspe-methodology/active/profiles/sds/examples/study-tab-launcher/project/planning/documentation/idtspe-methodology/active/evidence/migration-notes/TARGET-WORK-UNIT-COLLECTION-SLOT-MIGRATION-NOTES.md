# Target Work Unit Collection / Slot Migration Notes

Status: **non-normative migration notes; migration intentionally deferred**

Purpose: capture how existing reusable lower-level contracts can later be mapped into the explicit Unit `Result Content Contract → Collections / Slots` model **without changing their established semantics or Unit boundaries**.

This file is not evidence that SDS or other profiles have already been migrated. The current change updates the canonical model and compatibility rules only, plus narrow repairs for artifacts that had already adopted the superseded `Result Shape` syntax.

## Migration Principle

Treat existing contracts as authoritative migration inputs.

```text
existing Unit identity / Responsibility / Purpose / Result semantics
→ preserve

existing repeated addressable item family
→ candidate Collection Definition

existing exact item schema / lower-level object contract
→ preserve as Collection Item Contract

existing independently formalized terminal role
→ candidate UNIT_WIDE or PER_ITEM Slot Definition

ordinary field / relation / question / item value
→ remain ordinary content unless Slot criteria are independently satisfied
```

The Collection/Slot model MUST NOT by itself cause Units to be merged, split, renamed, re-identified or deleted.

## Collection Mapping

For every genuine repeated result-contract family that is part of the reusable Unit Result Content Contract and is actually migrated:

```text
Collection ID = unique within the parent Unit Result Content Contract and stable/recoverable while referenced
Collection Name = existing/natural name when useful
meaning / cardinality / constraints as already governed
Item Contract = existing lower-level contract, preserved
Item Key / Subject = existing stable identity or natural subject when item-local formal references need it
PER_ITEM Slots = only already-justified formal roles, if any; each Slot ID is unique within this Collection
```

A Unit may contain zero, one or several Collections. A Collection may contain zero PER_ITEM Slots.

Do not create a Collection merely because a field happens to be a list. During migration, every genuine repeated result-contract family that is part of the reusable Unit result contract MUST be declared as a Collection; ordinary list-valued fields that are not reusable repeated result-contract families remain ordinary content.

## Slot Mapping

> Semantic Owner Dependency
> Type: `MIGRATES`
> Responsibility: `TWU.SUBJECT-REFERENCE`
> Owner: [Target Work Subject Reference Contract](../../idtspe-core/runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md#target-work-subject-reference)

Use `UNIT_WIDE` only for an independently formalized terminal role that concerns the Unit result as a whole.

Use `PER_ITEM` only for an independently formalized terminal role repeated for every applicable item of exactly one Collection.

```text
UNIT_WIDE Slot
→ Unit ID + Slot ID

Collection item
→ Unit ID + Collection ID + Item Key / Subject

PER_ITEM Slot Definition / common role
→ Unit ID + Collection ID + Slot ID

PER_ITEM Slot runtime role for one item
→ Unit ID + Collection ID + Item Key / Subject + Slot ID
```

Do not introduce `Item Instance`, `Collection Instance` or `Slot Instance` methodology objects.

## Representation Preservation

Migration does not normalize representation.

```text
Collection semantics
repetition
exact item fields
Slot structure
≠ TABLE requirement
```

Preserve `TABLE` / exact table schema only where the existing governing contract explicitly requires it. If no table requirement exists today, migration MUST preserve a non-table representation and MUST NOT add/mark TABLE merely because the item family becomes an explicit Collection.

Likewise, preserve existing exact non-table block/record/path forms where they are already normative.

## SDS Contracts Already Worth Mapping Later

The following are observations for a future migration pass, not changes required by this file.

### Feature

`TM-FEATURE`, especially `RU-FEAT-03 Feature Behavior`, already contains multiple reusable lower-level item families:

```text
FBS-* Feature Behavior Steps
BR-*  Behavior Requirements
```

These are strong candidates for **separate Collections inside the same existing Unit**, with their current schemas preserved as Item Contracts. The existing FBS→BR relation/order/path semantics must be preserved. Only independently formalized Unit-wide or item-local roles should become Slots; ordinary schema columns do not become Slots automatically.

Other Feature families such as `FDO-*` should be reviewed the same way: preserve the existing lower-level contract first, determine whether the family is a genuine repeated result-contract family in the reusable Unit result contract, and if it is, migrate it as an explicit Collection; if it is only an ordinary list-valued field, keep it as ordinary content.

### Requirements

Existing reusable Requirement families already share lower-level contracts and owner-specific extensions, including examples such as:

```text
BR-*
SR-*
IR-DOMAIN-*
IR-SLICE-*
IR-SHARED-*
PFR-*
```

A future migration should preserve the shared Requirement semantics and each owner-specific extension as the Collection Item Contract. Fields such as Type, plain required meaning, QRPE, Realizes/Protects and related-error references are not automatically PER_ITEM Slots.

### Scenario

`TM-SCENARIO-PLANNING` contains repeated lower-level families such as `SPS-*` path steps and `SR-*` requirements. These can be mapped to separate Collections while keeping journey/order/branch/convergence semantics at the current natural Unit level unless a genuinely independent Slot contract already exists.

### Application / Benefits

`AB-*` Application Benefits are a strong Collection candidate with the existing exact item representation preserved. Do not convert the existing block form to a table unless its governing contract explicitly requires one.

### Domain / Slice / Shared

Implementation Requirement and Proof Requirement families are candidates for separate Collections within their existing Units. Shared capability consumer requirement bindings are also a strong Collection candidate. Preserve current owner/unit boundaries and relation semantics.

### Screen

Repeated Screen/surface or Screen Draft contracts can be mapped as Collections where they already constitute reusable repeated result families. Global spatial/routing/coherence meaning remains Unit-wide content or a Unit-wide Slot only if independently formalized.

### Evolution

`RU-EVO-02 Evolution Impacts` had already been moved to one Unit with repeated Impact items before this migration note. Its current narrow Collection declaration is therefore retained by the canonical-model cleanup. Broader owner-local Evolution projection families should be reviewed later rather than migrated incidentally.

## Suggested Migration Procedure

For each existing reusable Unit:

1. Freeze Unit identity, Responsibility, Purpose, result meaning, consumers and existing representation requirements.
2. Inventory existing repeated lower-level item families and exact object/item contracts.
3. Declare only genuine repeated contract families as Collections.
4. Preserve each existing item contract byte-for-meaning; do not simplify away fields/relations/provenance.
5. Reuse an existing item ID or natural subject as Item Key when item-local formal references need addressability.
6. Identify existing independently formalized Unit-wide roles; map only those to `UNIT_WIDE` Slots.
7. Identify existing independently formalized item roles; map only those to `PER_ITEM` Slots inside the owning Collection.
8. Leave ordinary fields, questions, relations and data structure as ordinary content.
9. Preserve existing table/non-table representation requirements exactly; do not infer new TABLE requirements.
10. Verify Source/Q/R/P/Proposal/Finding/Evidence/revalidation addresses using Unit + Collection for Collection-local subjects, Unit + Collection + Item Key for item-local subjects, Unit + Collection + Slot for common PER_ITEM Slot Definitions/roles, and Unit + Collection + Item Key + Slot for one item-local PER_ITEM runtime role.
11. Verify no Unit was created/removed/merged/split solely because of Collection/Slot migration.
12. Run cross-owner and mechanical checks only after the selected profile/module set has actually been migrated.

## Regression Examples For A Future Migration Pass

The migration model should be considered successful only if it can express existing mature contracts without semantic loss, especially:

```text
RU-FEAT-03
  multiple Collections in one Unit (FBS + BR)
  existing relations/order preserved

RU-SCEN-01
  multiple repeated lower-level contracts preserved

Requirement-owner Units
  exact Requirement schemas preserved
  fields do not become Slots automatically

RU-SHARED-02
  consumer binding item contract preserved

RU-EVO-02
  repeated impacts remain one Unit Collection
  no peer Units/Slots created by item count
```

## Explicit Non-Goals

This migration MUST NOT be used to:

- redesign existing SDS Unit boundaries;
- normalize every repeated list into a Collection without contract justification;
- turn every item field into a Slot;
- create nested Slot/subslot ontology;
- introduce Item/Collection/Slot Instance lifecycle entities;
- infer table representation;
- collapse existing lower-level Requirement/object contracts into a thinner generic schema;
- claim full profile conformance before the migration pass has actually been performed and checked.
