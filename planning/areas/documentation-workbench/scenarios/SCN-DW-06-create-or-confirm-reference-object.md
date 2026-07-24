# SCN-DW-06 — Create Or Confirm A Reference Object

Status: preliminary item-backed Scenario Reference Object
Category: Scenario
Definition owner: this file
Catalog: [`README.md`](README.md)

## Identity And Traceability

| Field | Value |
|---|---|
| Scenario | `SCN-DW-06` |
| Actor / context | Documentation Workbench user — object proposal/materialization context |
| Goal | Create or confirm an independently managed Reference Object from a supported entry path. |
| Relation to Planning Items | `derived from` |
| Source review state | aligned at creation |

### Planning Items

- `ITEM-22B`
- `ITEM-87`
- `ITEM-31B`
- `ITEM-86`
- `ITEM-23B`
- `ITEM-108`
- `ITEM-91`

Complete Planning Item bodies remain in [`../planning-item-register.md`](../planning-item-register.md). This Scenario owns only the clean behavioral composition.

### Scenario DATA

- [`DATA-DW-06-01`](data-objects.md#data-dw-06-01)
- [`DATA-DW-06-02`](data-objects.md#data-dw-06-02)
- [`DATA-DW-06-03`](data-objects.md#data-dw-06-03)

### Behavior Items

- [`BI-DW-06-01`](behavior-items.md#bi-dw-06-01)
- [`BI-DW-06-02`](behavior-items.md#bi-dw-06-02)
- [`BI-DW-06-03`](behavior-items.md#bi-dw-06-03)
- [`BI-DW-06-04`](behavior-items.md#bi-dw-06-04)
- [`BI-DW-06-05`](behavior-items.md#bi-dw-06-05)

## Entry Points

- An already managed Planning Item, portable reviewed meaning, existing documentation fragment or parsed proposal is selected.

## Preconditions

- The selected meaning or object proposal is visible to the user.

## Main Flow

1. The user reviews the proposed object boundary or existing managed identity.
2. An already managed object is reused rather than created again.
3. A portable meaning, fragment or parsed proposal requires explicit confirmation before managed-object creation.
4. The user may establish or review canonical state ownership, definition location and optional home.
5. The resulting object becomes available for authoring and references.

## Branches / Extend

- The user may reject or defer creation.
- Identity conflict remains unresolved until reviewed.
- The object may be Markdown-backed or temporarily app-only.

## Invariants

- One semantic object must not receive a second managed identity through the same handoff.

## Postconditions / Observable Outcomes

- A confirmed managed Reference Object exists, or creation remains rejected/deferred/unresolved.

## Open Questions

- Recovery and migration of temporary app-only objects remain open.

## Change Review

A later change to a linked Planning Item marks this Scenario and affected DATA/Behavior objects/files review-needed. The previous reviewed scenario content remains until explicit refresh, confirm-current or relation removal/replacement. The Scenario does not change the Planning Item automatically.

## Boundaries

- No domain, aggregate, API, persistence, UI-component or implementation-Slice design is owned here.
- No unprovided DATA or acceptance detail is added.
