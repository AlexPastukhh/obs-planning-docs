# SCN-DW-10 — Create And Work With A Standalone Note

Status: preliminary item-backed Scenario Reference Object
Category: Scenario
Definition owner: this file
Catalog: [`README.md`](README.md)

## Identity And Traceability

| Field | Value |
|---|---|
| Scenario | `SCN-DW-10` |
| Actor / context | Documentation Workbench user — Notes context |
| Goal | Create a standalone Note and continue working with it without selecting another object. |
| Relation to Planning Items | `derived from` |
| Source review state | aligned at creation |

### Planning Items

- `ITEM-124`
- `ITEM-91`
- `ITEM-103`
- `ITEM-106`
- `ITEM-118`

Complete Planning Item bodies remain in [`../planning-item-register.md`](../planning-item-register.md). This Scenario owns only the clean behavioral composition.

### Scenario DATA

- [`DATA-DW-10-01`](data-objects.md#data-dw-10-01)
- [`DATA-DW-10-02`](data-objects.md#data-dw-10-02)

### Behavior Items

- [`BI-DW-10-01`](behavior-items.md#bi-dw-10-01)
- [`BI-DW-10-02`](behavior-items.md#bi-dw-10-02)
- [`BI-DW-10-03`](behavior-items.md#bi-dw-10-03)
- [`BI-DW-10-04`](behavior-items.md#bi-dw-10-04)
- [`BI-DW-10-05`](behavior-items.md#bi-dw-10-05)

## Entry Points

- The user chooses to create a standalone Note.

## Preconditions

- No target object is required.

## Main Flow

1. The user starts standalone Note creation.
2. The user may provide a title.
3. The user may provide Note text.
4. The Note becomes available among Notes.
5. The user can open and edit the Note.

## Branches / Extend

- The title may remain absent.

## Invariants

- The Note remains an independently managed object rather than an arbitrary field of another object.

## Postconditions / Observable Outcomes

- A standalone Note exists and can be found, opened and edited.

## Open Questions

- Exact UI and storage are not specified.

## Change Review

A later change to a linked Planning Item marks this Scenario and affected DATA/Behavior objects/files review-needed. The previous reviewed scenario content remains until explicit refresh, confirm-current or relation removal/replacement. The Scenario does not change the Planning Item automatically.

## Boundaries

- No domain, aggregate, API, persistence, UI-component or implementation-Slice design is owned here.
- No unprovided DATA or acceptance detail is added.
