# OBS Planning Input Conventions

Status: active project-specific AI-readable input-convention registry
Doc version: v0.1.0-planning-item-delimiters
Scope: project-readable conventions that affect how planning source input is interpreted for review. This file is not runtime settings storage or a parser implementation.

## 1. Authority

```text
This file:
  → owns accepted OBS planning input conventions;

planning-item-formation-workflow.md:
  → owns semantic formation/review behavior;

Planning Item/Full Picture project workflow:
  → owns local application behavior;

runtime application settings/storage:
  → unresolved implementation responsibility.
```

## 2. Active Convention — Planning Item Boundary Marker

```yaml
planning_item_marker:
  open: "it("
  close: ")it"
  user_only: true
  meaning: "user-proposed semantic Planning Item boundary requiring review"
  creates_candidate_entity: false
  creates_accepted_item: false
  acceptance_effect: "none without explicit review"
```

## 3. Interpretation

The marker means:

```text
review this selected semantic boundary;
preserve the complete literal source;
check new/update/merge/split/re-home/reject effects;
build the complete accumulating item meaning;
require normal review/acceptance behavior.
```

It does not mean:

```text
create one item mechanically;
create a Planning Item Candidate entity;
accept the item;
discard surrounding message context;
replace full-message source review;
make marked text the final body without interpretation.
```

## 4. Source Preservation

- Markers remain literal source unless a renderer intentionally hides them.
- Full-message review preserves surrounding context.
- Relevant spans may be highlighted.
- One marked region may contribute to several items.
- Several marked/unmarked regions may contribute to one item.
- Unmarked input remains valid.

## 5. User / AI Behavior

The user may use markers when convenient and is not required to use them.

When a marker is present, AI preserves the complete source message, treats the region as a proposed boundary, applies normal formation review and does not silently create accepted state.

When malformed/ambiguous, preserve literal input, state the ambiguity and do not guess destructive normalization.

## 6. Configuration Boundary

This file is a repository/AI-readable projection of accepted settings. It does not select database/settings storage, synchronization, parser implementation, UI control, escaping, nested-marker behavior or structured-response format.

## 7. Change Process

Changing a convention requires explicit user decision, update to this file, review of affected formation/workflow/registry/helper owners and normal replacement/diff review.

Do not perform blind global replacement.

## 8. Related Owners

```text
planning/documentation/application-planning/planning-item-formation-workflow.md
planning/documentation/application-planning/templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
planning/documentation/application-planning/use-case-registry.md
planning/areas/documentation-workbench/complete-pictures/planning-items-and-full-picture/full-picture.md
planning/areas/documentation-workbench/planning-item-register.md
```

## 9. Open Decisions

| Decision | Status | Conservative fallback |
|---|---|---|
| Escaping literal `it(` / `)it` | unresolved | Treat ambiguous text literally and review when material. |
| Nested markers | unresolved | Do not infer nested semantic items automatically. |
| Runtime parsing/settings sync | unresolved | Repository file remains documentation projection only. |
| Additional conventions | not accepted | Add only after explicit decision and owner review. |
