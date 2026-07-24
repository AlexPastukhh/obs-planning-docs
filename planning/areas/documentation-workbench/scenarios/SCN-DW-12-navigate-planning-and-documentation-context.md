# SCN-DW-12 — Navigate Planning And Documentation Context

Status: preliminary item-backed Scenario Reference Object
Category: Scenario
Definition owner: this file
Catalog: [`README.md`](README.md)

## Identity And Traceability

| Field | Value |
|---|---|
| Scenario | `SCN-DW-12` |
| Actor / context | Documentation Workbench user — multi-tab navigation and related-view context |
| Goal | Move between related files, objects, Planning Items, sources, homes, occurrences and review targets. |
| Relation to Planning Items | `derived from` |
| Source review state | aligned at creation |

### Planning Items

- `ITEM-35B`
- `ITEM-111`
- `ITEM-95`
- `ITEM-104`
- `ITEM-96`
- `ITEM-118`

Complete Planning Item bodies remain in [`../planning-item-register.md`](../planning-item-register.md). This Scenario owns only the clean behavioral composition.

### Scenario DATA

- [`DATA-DW-12-01`](data-objects.md#data-dw-12-01)
- [`DATA-DW-12-02`](data-objects.md#data-dw-12-02)

### Behavior Items

- [`BI-DW-12-01`](behavior-items.md#bi-dw-12-01)
- [`BI-DW-12-02`](behavior-items.md#bi-dw-12-02)
- [`BI-DW-12-03`](behavior-items.md#bi-dw-12-03)
- [`BI-DW-12-04`](behavior-items.md#bi-dw-12-04)

## Entry Points

- The user selects a link, relation, view entry or review target from the current context.

## Preconditions

- The selected target or unresolved-target state is available.

## Main Flow

1. The user opens the selected related target.
2. The relevant file, object, canonical location, optional home, occurrence, Planning Item, source, Full Picture or review target is shown when available.
3. Related-object views can be filtered by supported relation/category/status criteria.
4. The user continues work in the opened context.

## Branches / Extend

- Folder views may aggregate selected files with or without subfolders.
- An unresolved target remains visible instead of opening a false match.

## Invariants

- Navigation and views expose existing state; they do not create semantic truth.

## Postconditions / Observable Outcomes

- The intended related context is open or its unresolved state is explicit.

## Open Questions

- Exact tab layout and labels are not specified.

## Change Review

A later change to a linked Planning Item marks this Scenario and affected DATA/Behavior objects/files review-needed. The previous reviewed scenario content remains until explicit refresh, confirm-current or relation removal/replacement. The Scenario does not change the Planning Item automatically.

## Boundaries

- No domain, aggregate, API, persistence, UI-component or implementation-Slice design is owned here.
- No unprovided DATA or acceptance detail is added.
