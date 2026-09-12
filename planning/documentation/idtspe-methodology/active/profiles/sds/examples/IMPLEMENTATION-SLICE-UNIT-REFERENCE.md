# Implementation Slice Result-Unit Reference

Status: active worked reference

This reference mirrors the current `TM-IMPLEMENTATION-SLICE` Target Step-Result Contract. It is a transient discovery example, not a durable Slice-owner schema.

## Target / Sources

```text
Target:
  SL-PAYMENT-DISCOVERY

Module:
  TM-IMPLEMENTATION-SLICE

Selected Feature:
  FEAT-PAY-ORDER

Relevant Feature behavior:
  BR-PAY-01 — payable order can be paid with a supported method
  BR-PAY-02 — failed provider acceptance is never exposed as success

Relevant Scenario:
  SCN-CHECKOUT

Relevant Domain owners:
  Order
  PaymentAttempt
```

## RU-SLICE-01 — Whole-Slice Responsibility / Candidate Structure

```text
Responsibility:
  realize FEAT-PAY-ORDER end to end

Candidate structure:
  checkout/payment entry adapter
  PayOrder application operation
  Order + PaymentAttempt Domain owners
  payment-provider adapter
  persistence
  result projection
```

The candidate structure is working discovery. Class/file identity is not durable Slice authority by default.

## RU-SLICE-02 — Semantic Application Entry / Result Boundary

```text
Entry:
  PayOrder(order-id, selected-method, payment-input)

Semantic result:
  paid(order-id, payment-attempt-id)
  pending(payment-attempt-id)
  rejected(reason)
  failed(reason)
```

Transport/HTTP/UI variants may adapt this boundary without becoming separate semantic operations merely because they are separate adapters.

## RU-SLICE-03 — Step-by-Step End-to-End Realization

```text
receive semantic payment request
→ load/validate payable Order
→ create/update PaymentAttempt
→ call selected provider
→ reconcile provider outcome
→ persist Domain state
→ map semantic result
→ project truthful adapter/UI result
```

Material questions may include transaction boundary, retry/idempotency, timeout/cancellation, uncertain provider outcome and recovery. Include only the detail needed to resolve those choices; do not build a shadow class/call registry.

## RU-SLICE-04 — Feature Integration Proof

```text
prove through the semantic application boundary:

supported successful payment
→ Order becomes paid
→ attempt/result identities are coherent
→ success is returned

provider rejection/failure
→ no false paid state
→ no false success result

retry after uncertain transport outcome
→ does not create an unintended duplicate payment
```

`LENS-TEST-PROOF-EVIDENCE` may refine proof selection if layer/setup/assertion choices are non-trivial. Literal test code belongs to Exact Realization.

## RU-SLICE-05 — Evolution / OPEN Slice Pressure

### Selected Evolution Step — asynchronous completion

```text
Future target-state pressure:
  provider may return pending and complete later

Current question:
  should stable PaymentAttempt identity/state already be explicit now?

Prepare-now result:
  keep a stable attempt identity/lifecycle seam only if the selected Step
  makes that current cost worthwhile

Recheck:
  if async provider support is deferred/cancelled or current provider semantics change
```

If no selected Evolution/Open pressure affects the current Slice, omit this RU entirely.

## Optional Durable Handoff

If the discovered end-to-end responsibility is worth durable ownership:

```text
TM-SLICE-OWNER
  RU-SOWN-01 — Slice Responsibility / Boundary Contract
  RU-SOWN-02 — Slice Implementation Requirements, only when material
```

If the Domain meaning itself changes, update/revalidate the Domain owner rather than burying that meaning inside the Slice.

If a coherent reusable non-end-to-end responsibility with real consumers is discovered, apply the `TM-SHARED-IMPLEMENTATION-CAPABILITY` existence gate.

## Generic State Boundary

Questions, Proposals, Risks/Problems, Decisions, Evidence and Revalidation Signals used to resolve these Units remain generic Core State.

Example:

```text
Question:
  how is uncertain provider outcome reconciled?

Proposal:
  persist PaymentAttempt before provider call and reconcile by provider reference

Risk:
  timeout may leave local state unknown

Decision:
  selected reconciliation ownership/identity rule
```

Those State Units support the Target; they do not become extra `RU-SLICE-*`.

## Representation Boundary

The discovery result may stay conversational or in a temporary working plan. Persist it only when review/handoff value justifies it. Durable responsibility goes to `TM-SLICE-OWNER`; exact implementation goes to code / `TM-EXACT-REALIZATION`.
