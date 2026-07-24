# SCN-DW-03 — Maintain An Item-Backed Full Picture

Status: preliminary item-backed Scenario Reference Object
Category: Scenario
Definition owner: this file
Catalog: [`README.md`](README.md)

## Identity And Traceability

| Field | Value |
|---|---|
| Scenario | `SCN-DW-03` |
| Actor / context | Documentation Workbench user — Planning Draft / Full Picture context |
| Goal | Maintain a readable trigger-to-result plan backed by Planning Items and explicit concern/deep-work state. |
| Relation to Planning Items | `derived from` |
| Source review state | aligned at creation |

### Planning Items

- `ITEM-41`
- `ITEM-98`
- `ITEM-119`
- `ITEM-113`
- `ITEM-118`

Complete Planning Item bodies remain in [`../planning-item-register.md`](../planning-item-register.md). This Scenario owns only the clean behavioral composition.

### Scenario DATA

- [`DATA-DW-03-01`](data-objects.md#data-dw-03-01)
- [`DATA-DW-03-02`](data-objects.md#data-dw-03-02)
- [`DATA-DW-03-03`](data-objects.md#data-dw-03-03)

### Behavior Items

- [`BI-DW-03-01`](behavior-items.md#bi-dw-03-01)
- [`BI-DW-03-02`](behavior-items.md#bi-dw-03-02)
- [`BI-DW-03-03`](behavior-items.md#bi-dw-03-03)
- [`BI-DW-03-04`](behavior-items.md#bi-dw-03-04)
- [`BI-DW-03-05`](behavior-items.md#bi-dw-03-05)

## Entry Points

- Reviewed Planning Items or an existing item-backed Full Picture are selected.

## Preconditions

- The intended workflow or result is sufficiently identifiable.

## Main Flow

1. The user assembles or updates one readable trigger-to-result picture.
2. The picture links to contributing Planning Items instead of copying their complete bodies.
3. Relevant concern suggestions can be reviewed.
4. Applied concerns and justified deep-work targets remain linked to their owners.
5. Open questions, risks, evidence needs and deferred work remain visible.

## Branches / Extend

- A concern suggestion may be applied, found not applicable, already covered, covered at a parent level or deferred.
- Separate deep work is created only when independent depth or lifecycle justifies it.

## Invariants

- A peer Complete Picture cannot supply a missing mandatory stage.
- Views expose existing planning state; they do not create it.

## Postconditions / Observable Outcomes

- A current item-backed Full Picture and explicit open/deep-work state are available.

## Open Questions

- Exact concern status vocabulary remains open.

## Change Review

A later change to a linked Planning Item marks this Scenario and affected DATA/Behavior objects/files review-needed. The previous reviewed scenario content remains until explicit refresh, confirm-current or relation removal/replacement. The Scenario does not change the Planning Item automatically.

## Boundaries

- No domain, aggregate, API, persistence, UI-component or implementation-Slice design is owned here.
- No unprovided DATA or acceptance detail is added.
