# SCN-DW-08 — Create And Use A Managed Reference

Status: preliminary item-backed Scenario Reference Object
Category: Scenario
Definition owner: this file
Catalog: [`README.md`](README.md)

## Identity And Traceability

| Field | Value |
|---|---|
| Scenario | `SCN-DW-08` |
| Actor / context | Documentation Workbench user — document/object reference context |
| Goal | Place a managed reference to an existing target and retain navigation to it. |
| Relation to Planning Items | `derived from` |
| Source review state | aligned at creation |

### Planning Items

- `ITEM-114`
- `ITEM-101`
- `ITEM-88`
- `ITEM-73`
- `ITEM-83`
- `ITEM-105`
- `ITEM-90`

Complete Planning Item bodies remain in [`../planning-item-register.md`](../planning-item-register.md). This Scenario owns only the clean behavioral composition.

### Scenario DATA

- [`DATA-DW-08-01`](data-objects.md#data-dw-08-01)
- [`DATA-DW-08-02`](data-objects.md#data-dw-08-02)
- [`DATA-DW-08-03`](data-objects.md#data-dw-08-03)

### Behavior Items

- [`BI-DW-08-01`](behavior-items.md#bi-dw-08-01)
- [`BI-DW-08-02`](behavior-items.md#bi-dw-08-02)
- [`BI-DW-08-03`](behavior-items.md#bi-dw-08-03)
- [`BI-DW-08-04`](behavior-items.md#bi-dw-08-04)
- [`BI-DW-08-05`](behavior-items.md#bi-dw-08-05)

## Entry Points

- The user wants to refer from a document or object field to an existing object, documentation file or stable file location.

## Preconditions

- A resolvable target is available or the unresolved target state can be shown.

## Main Flow

1. The user selects the target.
2. The user chooses or confirms the relation meaning separately from the target type.
3. For Reference Object content, the user may choose full-text or bare representation.
4. The managed reference is placed in the current content.
5. The user can open the referenced target and its available contexts.

## Branches / Extend

- A missing or ambiguous target remains visible.
- A navigation-only file link is not automatically a dependency reference.

## Invariants

- Full-text and bare modes refer to the same target identity.
- Referenced content remains read-only at the use site.

## Postconditions / Observable Outcomes

- A managed reference exists and the target can be navigated to, or the unresolved target remains explicit.

## Open Questions

- Exact wrapper syntax remains prototype work.

## Change Review

A later change to a linked Planning Item marks this Scenario and affected DATA/Behavior objects/files review-needed. The previous reviewed scenario content remains until explicit refresh, confirm-current or relation removal/replacement. The Scenario does not change the Planning Item automatically.

## Boundaries

- No domain, aggregate, API, persistence, UI-component or implementation-Slice design is owned here.
- No unprovided DATA or acceptance detail is added.
