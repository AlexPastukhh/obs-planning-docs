# SCN-DW-11 — Add And Work With A Note For An Object

Status: preliminary item-backed Scenario Reference Object
Category: Scenario
Definition owner: this file
Catalog: [`README.md`](README.md)

## Identity And Traceability

| Field | Value |
|---|---|
| Scenario | `SCN-DW-11` |
| Actor / context | Documentation Workbench user — selected object / Notes context |
| Goal | Add a Note to a selected object and find the same Note from object-specific and general Note contexts. |
| Relation to Planning Items | `derived from` |
| Source review state | aligned at creation |

### Planning Items

- `ITEM-124`
- `ITEM-103`
- `ITEM-106`
- `ITEM-114`
- `ITEM-118`

Complete Planning Item bodies remain in [`../planning-item-register.md`](../planning-item-register.md). This Scenario owns only the clean behavioral composition.

### Scenario DATA

- [`DATA-DW-11-01`](data-objects.md#data-dw-11-01)
- [`DATA-DW-11-02`](data-objects.md#data-dw-11-02)
- [`DATA-DW-11-03`](data-objects.md#data-dw-11-03)

### Behavior Items

- [`BI-DW-11-01`](behavior-items.md#bi-dw-11-01)
- [`BI-DW-11-02`](behavior-items.md#bi-dw-11-02)
- [`BI-DW-11-03`](behavior-items.md#bi-dw-11-03)
- [`BI-DW-11-04`](behavior-items.md#bi-dw-11-04)
- [`BI-DW-11-05`](behavior-items.md#bi-dw-11-05)
- [`BI-DW-11-06`](behavior-items.md#bi-dw-11-06)

## Entry Points

- The user has selected an object and chooses to add a Note for it.

## Preconditions

- A selected target object is available.

## Main Flow

1. The user starts Note creation for the selected object.
2. The user may provide a title and Note text.
3. The Note becomes available as related to the selected object.
4. The same Note is available among all Notes.
5. The user can open and edit the Note.

## Branches / Extend

- The title may remain absent.

## Invariants

- Showing the Note in multiple contexts does not create multiple semantic Notes.
- The Note remains independently managed rather than becoming an arbitrary target-object field.

## Postconditions / Observable Outcomes

- A Note exists for the selected object and can be found from both supported Note contexts.

## Open Questions

- Multi-target Note behavior remains open.

## Change Review

A later change to a linked Planning Item marks this Scenario and affected DATA/Behavior objects/files review-needed. The previous reviewed scenario content remains until explicit refresh, confirm-current or relation removal/replacement. The Scenario does not change the Planning Item automatically.

## Boundaries

- No domain, aggregate, API, persistence, UI-component or implementation-Slice design is owned here.
- No unprovided DATA or acceptance detail is added.
