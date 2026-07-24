# SCN-DW-13 — Produce An AI-Expanded Transfer Copy

Status: preliminary item-backed Scenario Reference Object
Category: Scenario
Definition owner: this file
Catalog: [`README.md`](README.md)

## Identity And Traceability

| Field | Value |
|---|---|
| Scenario | `SCN-DW-13` |
| Actor / context | Documentation Workbench user — selected documentation file / AI transfer context |
| Goal | Produce a selected-file transfer copy with referenced object contents expanded for use in an AI chat without changing saved Markdown. |
| Relation to Planning Items | `derived from` |
| Source review state | aligned at creation |

### Planning Items

- `ITEM-107`

Complete Planning Item bodies remain in [`../planning-item-register.md`](../planning-item-register.md). This Scenario owns only the clean behavioral composition.

### Scenario DATA

- [`DATA-DW-13-01`](data-objects.md#data-dw-13-01)
- [`DATA-DW-13-02`](data-objects.md#data-dw-13-02)

### Behavior Items

- [`BI-DW-13-01`](behavior-items.md#bi-dw-13-01)
- [`BI-DW-13-02`](behavior-items.md#bi-dw-13-02)
- [`BI-DW-13-03`](behavior-items.md#bi-dw-13-03)
- [`BI-DW-13-04`](behavior-items.md#bi-dw-13-04)
- [`BI-DW-13-05`](behavior-items.md#bi-dw-13-05)

## Entry Points

- The user selects a documentation file and requests a copy with references expanded.

## Preconditions

- The selected file is readable.

## Main Flow

1. The user requests an expanded transfer copy of the selected file.
2. Referenced object content that can be resolved is included in the copy.
3. Object identity and boundary information remain visible.
4. Missing or unresolved targets remain explicit.
5. The expanded copy becomes available for transfer while the saved Markdown remains unchanged.

## Branches / Extend

- Some referenced targets may be missing or unresolved.

## Invariants

- Producing the transfer copy does not mutate the saved Markdown.
- The transfer copy is not presented as complete synchronization of all application state.

## Postconditions / Observable Outcomes

- An expanded transfer copy is available, including explicit unresolved-target state where applicable.

## Open Questions

- Exact transfer representation is not specified.

## Change Review

A later change to a linked Planning Item marks this Scenario and affected DATA/Behavior objects/files review-needed. The previous reviewed scenario content remains until explicit refresh, confirm-current or relation removal/replacement. The Scenario does not change the Planning Item automatically.

## Boundaries

- No domain, aggregate, API, persistence, UI-component or implementation-Slice design is owned here.
- No unprovided DATA or acceptance detail is added.
