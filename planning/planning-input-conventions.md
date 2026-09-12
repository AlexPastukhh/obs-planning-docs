# OBS Planning Input Conventions

Status: active project-specific AI-readable input-convention registry / Planning Item marker legacy
Doc version: v0.3.0-proposal-migration
Scope: project-readable conventions that affect how planning source input is interpreted. This file is not runtime settings/parser implementation and does not own generic Proposal review.

## 1. Current Generic Candidate Input

`собери идеи` is a legacy user-facing compatibility alias and accepts ordinary free-form selected source. No delimiter is required.

Current semantic classification uses ordinary IDTSPE meanings:

```text
Source / fact / constraint / Question / Proposal / Q/R/P / Evidence / Decision
```

Canonical Proposal semantics/review:

`planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md`

Legacy `Idea` in historical material maps to current `Proposal`; it is not a second current methodology type.

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

Do not reinterpret this marker automatically as a Proposal/Idea marker and do not route `собери идеи` through a marker requirement.

When reviewing historical source containing it, preserve literal input, treat the region as historical provenance/context, apply current semantic classification normally, and do not create a Planning Item or Proposal mechanically.

## 3. Open Decision

A generic Proposal/source-boundary marker is not currently accepted. Add one only after an explicit semantic decision and affected-owner review.
