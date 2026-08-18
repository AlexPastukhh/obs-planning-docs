# OBS Planning Input Conventions

Status: active project-specific AI-readable input-convention registry / Planning Item marker legacy
Doc version: v0.2.0-item-marker-legacy
Scope: project-readable conventions that affect how planning source input is interpreted. This file is not runtime settings storage/parser implementation and is not an owner of generic Idea review.

## 1. Current Generic Idea Input

`собери идеи` accepts ordinary free-form selected source. No delimiter is required.

Generic Idea semantics/review are owned by:

```text
planning/documentation/idea-planning-principles-and-terminology.md
planning/documentation/idea-review-and-planning-workflow.md
```

## 2. Legacy Convention — Planning Item Boundary Marker

Historical source may contain:

```yaml
legacy_planning_item_marker:
  open: "it("
  close: ")it"
  user_only: true
  former_meaning: "user-proposed Planning Item review boundary"
```

Planning Item is no longer part of the target reusable methodology.

Do not reinterpret this marker automatically as an Idea marker and do not route `собери идеи` through a marker requirement.

When reviewing historical source containing it, preserve literal input, treat the region as historical provenance/context, apply current semantic classification normally, and do not create a Planning Item or Idea mechanically.

## 3. Open Decision

A generic Idea/source-boundary marker is not currently accepted. Add one only after an explicit semantic decision and affected-owner review.
