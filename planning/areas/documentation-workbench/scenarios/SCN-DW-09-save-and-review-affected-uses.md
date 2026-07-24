# SCN-DW-09 — Save Markdown And Review Affected Uses

Status: preliminary item-backed Scenario Reference Object
Category: Scenario
Definition owner: this file
Catalog: [`README.md`](README.md)

## Identity And Traceability

| Field | Value |
|---|---|
| Scenario | `SCN-DW-09` |
| Actor / context | Documentation Workbench user — save/diff/dependency-review context |
| Goal | Save complete Markdown and review uses affected by a changed referenced source. |
| Relation to Planning Items | `derived from` |
| Source review state | aligned at creation |

### Planning Items

- `ITEM-34B`
- `ITEM-32B`
- `ITEM-29B`
- `ITEM-89`
- `ITEM-16B`

Complete Planning Item bodies remain in [`../planning-item-register.md`](../planning-item-register.md). This Scenario owns only the clean behavioral composition.

### Scenario DATA

- [`DATA-DW-09-01`](data-objects.md#data-dw-09-01)
- [`DATA-DW-09-02`](data-objects.md#data-dw-09-02)
- [`DATA-DW-09-03`](data-objects.md#data-dw-09-03)

### Behavior Items

- [`BI-DW-09-01`](behavior-items.md#bi-dw-09-01)
- [`BI-DW-09-02`](behavior-items.md#bi-dw-09-02)
- [`BI-DW-09-03`](behavior-items.md#bi-dw-09-03)
- [`BI-DW-09-04`](behavior-items.md#bi-dw-09-04)
- [`BI-DW-09-05`](behavior-items.md#bi-dw-09-05)

## Entry Points

- Canonical document/object content or a referenced source has changed and save/review is requested.

## Preconditions

- The current work scope and affected references are identifiable.

## Main Flow

1. Complete Markdown is produced for the affected files.
2. Dependent documents, fields or scenario artifacts are identified.
3. Each affected use is shown as review-needed while its previous reviewed materialization remains available.
4. The user refreshes it, confirms it is still current, or removes/replaces the reference.
5. The result becomes diff-ready or remains explicitly Pending Review.

## Branches / Extend

- An unresolved dependency may remain pending.
- A source Planning Item change does not automatically rewrite a dependent Scenario, Scenario DATA or Behavior Item.

## Invariants

- Changed source content is not silently propagated into dependent reviewed content.

## Postconditions / Observable Outcomes

- The saved Markdown and dependency-review state are explicit and reviewable.

## Open Questions

- Exact diff UI is not specified.

## Change Review

A later change to a linked Planning Item marks this Scenario and affected DATA/Behavior objects/files review-needed. The previous reviewed scenario content remains until explicit refresh, confirm-current or relation removal/replacement. The Scenario does not change the Planning Item automatically.

## Boundaries

- No domain, aggregate, API, persistence, UI-component or implementation-Slice design is owned here.
- No unprovided DATA or acceptance detail is added.
