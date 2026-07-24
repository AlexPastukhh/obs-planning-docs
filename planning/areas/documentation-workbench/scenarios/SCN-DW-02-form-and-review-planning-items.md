# SCN-DW-02 — Form And Review Planning Items From Source

Status: preliminary item-backed Scenario Reference Object
Category: Scenario
Definition owner: this file
Catalog: [`README.md`](README.md)

## Identity And Traceability

| Field | Value |
|---|---|
| Scenario | `SCN-DW-02` |
| Actor / context | Documentation Workbench user — Planning Item review context |
| Goal | Turn selected source material into complete reviewable Planning Items. |
| Relation to Planning Items | `derived from` |
| Source review state | aligned at creation |

### Planning Items

- `ITEM-94`
- `ITEM-110`
- `ITEM-120`
- `ITEM-112`
- `ITEM-122`
- `ITEM-41`
- `ITEM-98`

Complete Planning Item bodies remain in [`../planning-item-register.md`](../planning-item-register.md). This Scenario owns only the clean behavioral composition.

### Scenario DATA

- [`DATA-DW-02-01`](data-objects.md#data-dw-02-01)
- [`DATA-DW-02-02`](data-objects.md#data-dw-02-02)
- [`DATA-DW-02-03`](data-objects.md#data-dw-02-03)

### Behavior Items

- [`BI-DW-02-01`](behavior-items.md#bi-dw-02-01)
- [`BI-DW-02-02`](behavior-items.md#bi-dw-02-02)
- [`BI-DW-02-03`](behavior-items.md#bi-dw-02-03)
- [`BI-DW-02-04`](behavior-items.md#bi-dw-02-04)
- [`BI-DW-02-05`](behavior-items.md#bi-dw-02-05)
- [`BI-DW-02-06`](behavior-items.md#bi-dw-02-06)

## Entry Points

- A discussion, message, file, response or portable ledger is selected.

## Preconditions

- The selected source is readable.

## Main Flow

1. The complete relevant source context is preserved.
2. Coherent Planning Item meanings are formed without arbitrary length limits.
3. Relevant current owners are checked proportionally.
4. Current, Incoming and Resulting meanings are presented for non-trivial transformations.
5. The user reviews the proposed items and relations.
6. Accepted items are delivered in portable Markdown or application-native mode.

## Branches / Extend

- The user may correct, merge, split, re-home, link, reject, defer or leave meaning unresolved.
- Application-native acceptance creates a managed Planning Item object; portable mode produces a complete ledger.

## Invariants

- AI interpretation remains proposed until explicit review.
- Complete source meaning is not replaced by a shorter lossy summary.

## Postconditions / Observable Outcomes

- Reviewed Planning Items exist, or unresolved choices remain explicit.

## Open Questions

- Final common status vocabulary remains open.

## Change Review

A later change to a linked Planning Item marks this Scenario and affected DATA/Behavior objects/files review-needed. The previous reviewed scenario content remains until explicit refresh, confirm-current or relation removal/replacement. The Scenario does not change the Planning Item automatically.

## Boundaries

- No domain, aggregate, API, persistence, UI-component or implementation-Slice design is owned here.
- No unprovided DATA or acceptance detail is added.
