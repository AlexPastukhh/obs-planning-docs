
# SourceContext Test Design

Target Module: `TM-TEST-DESIGN`  
Invocation position: Domain proof, before Slice planning

## Property → Proof

```text
UNIT:
  reject empty source identity
  preserve equivalent normalized source identity
  reject normalization that loses required semantic context
```

## Boundary

Provider/browser/PDF adapter integration is not tested here. This file proves only `SourceContext` value semantics.

## Methodology Direction

All material isolated Domain proof responsibilities for the current selected Domain set are now planned.

Recommended next:

```text
TM-SLICE-STRATEGY
```
