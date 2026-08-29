# Useful Vertical Result And Implementation Target Family

Status: active generic implementation-planning model

## Useful Vertical Result

`Useful Vertical Result` is the selected result a vertical Slice must deliver.

Default:

```text
one Primary Scenario
+
one bounded user/actor-facing observable result
+
the exact selected Behavior/DATA/Requirement/Screen/Domain obligations
needed to make that result real
```

Usually the result is user-facing or actor-visible.

A prerequisite/enabling result may be non-user-facing only when concrete dependency/risk evidence justifies it and it is still independently checkable.

A generic technical layer such as `build repository framework` is not a normal Useful Vertical Result.

## One Primary Scenario Per Normal Vertical Slice

```text
Vertical Slice
→ exactly one Primary Scenario

Scenario
→ may be realized through several Slices
```

Shared implementation work spanning several Scenarios/Slices is not represented as a fake multi-Scenario vertical Slice. Surface an ownership Finding Candidate with likely-owner hints such as `TM-CROSS-CUTTING-CONCERN`, architecture meaning or shared Domain; Core Finding Disposition resolves the actual semantic owner/State consequence, and Target Formation handles any independently justified Target ownership.

## Useful Vertical Result Definition

```text
Slice ID
Primary Scenario
Useful Vertical Result
Behavior Obligations
DATA Obligations
Requirement / Invariant Obligations
Screen Obligations — when UI
Domain Obligations — when Domain exists
```

These obligation sets are the concrete semantic decomposition of the selected result.

## Testing

Testing derives proof directly from:

```text
Useful Vertical Result Definition
Scenario Acceptance
Behavior Items
Scenario DATA
Requirements / invariants
Domain Verification Meaning
selected implementation boundary
```

No additional Slice-specific proof-result entity is required.

## Implementation Target Family

```text
VERTICAL_SLICE
  → TM-IMPLEMENTATION-SLICE

FRONTEND_SLICE
  → TM-FRONTEND-SLICE

CROSS_CUTTING_CONCERN
  → TM-CROSS-CUTTING-CONCERN
```

`VERTICAL_SLICE` is normally one-Scenario and vertical.

`FRONTEND_SLICE` is a specialized frontend realization target when frontend planning deserves independent depth.

`CROSS_CUTTING_CONCERN` is intentionally shared and non-vertical.
