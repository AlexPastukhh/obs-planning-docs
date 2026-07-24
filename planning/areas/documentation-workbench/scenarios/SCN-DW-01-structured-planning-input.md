# SCN-DW-01 — Structure A Long Planning Message

Status: preliminary item-backed Scenario Reference Object
Category: Scenario
Definition owner: this file
Catalog: [`README.md`](README.md)

## Identity And Traceability

| Field | Value |
|---|---|
| Scenario | `SCN-DW-01` |
| Actor / context | Documentation Workbench user — structured message context |
| Goal | Prepare one addressable long planning message without losing literal wording. |
| Relation to Planning Items | `derived from` |
| Source review state | aligned at creation |

### Planning Items

- `ITEM-121`
- `ITEM-122`

Complete Planning Item bodies remain in [`../planning-item-register.md`](../planning-item-register.md). This Scenario owns only the clean behavioral composition.

### Scenario DATA

- [`DATA-DW-01-01`](data-objects.md#data-dw-01-01)
- [`DATA-DW-01-02`](data-objects.md#data-dw-01-02)

### Behavior Items

- [`BI-DW-01-01`](behavior-items.md#bi-dw-01-01)
- [`BI-DW-01-02`](behavior-items.md#bi-dw-01-02)
- [`BI-DW-01-03`](behavior-items.md#bi-dw-01-03)
- [`BI-DW-01-04`](behavior-items.md#bi-dw-01-04)

## Entry Points

- The user wants to prepare a long planning message.

## Preconditions

- None specified.

## Main Flow

1. The user enters the intended message content.
2. The user separates topics, subtopics, questions, corrections, examples or other useful fragments when needed.
3. The literal wording remains available.
4. The result remains one user message whose parts can be addressed later.

## Branches / Extend

- The user may keep part or all of the message unstructured.
- A fragment does not have to become a Planning Item.

## Invariants

- Structuring must not replace or silently rewrite the literal user meaning.

## Postconditions / Observable Outcomes

- One literal message exists with addressable structure where the user added it.

## Open Questions

- Exact composer UI is not specified.

## Change Review

A later change to a linked Planning Item marks this Scenario and affected DATA/Behavior objects/files review-needed. The previous reviewed scenario content remains until explicit refresh, confirm-current or relation removal/replacement. The Scenario does not change the Planning Item automatically.

## Boundaries

- No domain, aggregate, API, persistence, UI-component or implementation-Slice design is owned here.
- No unprovided DATA or acceptance detail is added.
