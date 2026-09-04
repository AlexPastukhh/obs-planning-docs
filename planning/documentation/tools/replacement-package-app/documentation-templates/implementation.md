# Templates — Implementation Requirements and Item Groups

Status: physically separated part of the recommended-template owner. Templates remain recommended forms, not schemas.

<a id="template-implementation-item"></a>
## Template — Implementation Item

Use for Domain `DI-*`, Slice `SI-*` and Shared Implementation Items when a material selected Requirements Discovery answer adds durable realization meaning beyond the owning BI/invariant/responsibility.

```text
### <DI-/SI-/shared semantic Item ID> — <readable realization requirement>

Requirement:
<concrete durable requirement on how this owner must realize selected meaning>

Reason:
<why current correctness / technical quality / maintainability / evolution / testability requires it>

Derived from:
<BI / invariant / owner responsibility / real technical requirement / Evolution Impact / Requirements Discovery finding>

Pattern / rationale:
<optional reference to reusable Pattern; never substitute the Pattern name for the concrete Requirement>

Group:
<optional GRP-* when coupled with other Items>
```

Do not restate BI/invariant semantic truth as an Implementation Item. `N/A`, no additional requirement and rejected candidates do not become Items.

---
<a id="template-item-group"></a>
## Template — Item Group

Use when several Items are coupled parts of one selected realization/proof decision. A group may contain Implementation Items only, Test Items only, or both; cross-type implementation+proof groups are especially important.

```text
### GRP-<SEMANTIC-NAME> — <readable coupled decision>

Purpose:
<what one realization/proof decision couples these Items>

Members:
- <DI-/SI-/shared Item>
- <TST-...>
- ...

Coupling:
<why changing one member requires reconsidering the others>

Review rule:
A material change to any member makes this whole group review-relevant.
Review each member and retain / revise / remove it as appropriate.
```

`Related` is weaker navigation and does not require group-wide review. Grouping is for actual decision coupling. A cross-discovery production/proof pair depending on the same selected decision is grouped by default.
