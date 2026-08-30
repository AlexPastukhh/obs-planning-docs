# Implementation Slice Result-Unit Reference

Status: active worked reference

## Target

```text
SL-PAYMENT
TM-IMPLEMENTATION-SLICE
Primary Scenario: SCN-PAYMENT
```

## RU-SLICE-01 — Outcome / Obligations / Proof Intent

```text
Useful Vertical Result:
  user pays a payable order with a supported method and receives a truthful result

Behavior / DATA obligations:
  selected method
  payment information
  attempt result

Proof intent:
  success is never exposed when payment acceptance failed
```

## RU-SLICE-02 — Uses / Ownership Boundary

```text
Uses Order
  payable/paid rule

Uses Payment
  attempt lifecycle/result

Cross-Cutting:
  XC-AUDIT local obligation: provide payment actor/context

External:
  selected payment provider boundary
```

This Unit does not manufacture interfaces/contracts merely for explicitness.

## RU-SLICE-03 — Runtime Path — optional

```text
payment request
→ application coordination
→ Payment / Order semantic operations
→ provider/persistence boundary
→ truthful result
```

Keep only if the runtime sequence/failure/async semantics are material. This is
not a class/method inventory.

## RU-SLICE-04 — Evolution Steps

### Add another payment method

```text
Behavioral Source:
  SCN-PAYMENT / Change Outlook

Slice Change:
  another selected method becomes available

Domain Changes:
  Payment supports the additional semantic method variant if Domain meaning differs

Implementation Outlook:
  keep method-specific behavior behind the currently resolved payment-variation
  boundary; do not build a general plugin platform.
```

### Support asynchronous completion

```text
Behavioral Source:
  SCN-PAYMENT / Change Outlook

Slice Change:
  immediate request may return pending; final outcome arrives later

Domain Changes:
  payment attempt lifecycle may gain pending/finalized state meaning

Implementation Outlook:
  preserve a stable attempt identity/state boundary now only if current Resolution
  confirms the planned async Step makes that preparation worthwhile.

Proof Impact:
  pending/final reconciliation becomes material
```

## Generic State Boundary

Questions, candidate implementations, Decisions and Evidence used to resolve these
Units remain Generic Core State. `Implementation Outlook` stores the selected
Slice-specific consequence; it is not a duplicate Decision log.
