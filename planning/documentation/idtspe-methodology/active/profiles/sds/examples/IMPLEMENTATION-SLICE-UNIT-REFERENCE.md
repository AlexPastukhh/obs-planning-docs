# Implementation Slice Result-Unit Reference

Status: active worked reference

This reference mirrors the current `TM-IMPLEMENTATION-SLICE` Target Step-Result Contract. It is a transient discovery example, not a durable Slice-owner schema.

The example is scoped to an **unrealized Evolution Step**, so selected durable future Slice meaning is integrated into a Target Slice Body rather than a current Slice owner.

## Target / Sources

```text
Evolution Step:
  EVO-PAYMENT

Expected Entry State:
  checkout exists without integrated payment

Target Feature Body:
  FEAT-PAY-ORDER

Relevant future Feature behavior:
  BR-PAY-01 — payable order can be paid with a supported method
  BR-PAY-02 — failed provider acceptance is never exposed as success

Relevant Target Scenario Body:
  SCN-CHECKOUT

Current/Target Domain sources as applicable:
  Order
  PaymentAttempt

Supporting working Target:
  SL-PAYMENT-DISCOVERY

Module:
  TM-IMPLEMENTATION-SLICE
```

## RU-SLICE-01 — Whole-Slice Responsibility / Candidate Structure

```text
Responsibility:
  realize future FEAT-PAY-ORDER end to end

Candidate structure:
  checkout/payment entry adapter
  PayOrder application operation
  Order + PaymentAttempt Domain semantics
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

### Alternative future route inside the same Step

Suppose provider completion semantics remain unresolved:

```text
Proposal A:
  synchronous completion only

Proposal B:
  pending + asynchronous completion
```

If downstream consequences materially differ, the Step may explore separate Planning Branches. Slice Discovery can run inside each branch and return branch-scoped candidate consequences.

Example uncertainty for Proposal B:

```text
Need for stable PaymentAttempt identity:
  HIGH confidence basis — follows from accepted retry/idempotency semantics

Provider callback ordering:
  LOW/MEDIUM confidence basis — docs only; no real integration Evidence yet
```

Do not invent a numeric probability. Do not treat branch-scoped meaning as selected.

## Target Slice Body Handoff

After a route is actually selected, durable post-Step Slice responsibility may be represented as:

```text
Target Slice Body: SL-PAYMENT
  RU-SOWN-01 — complete post-Step Slice Responsibility / Boundary Contract
  RU-SOWN-02 — future IR-SLICE-* only when material
```

This body belongs to `EVO-PAYMENT` until the Slice is actually implemented and required proof/revalidation succeeds.

```text
selected Target Slice Body
≠ current Slice owner
```

Likewise, selected future Domain/Shared meaning becomes Target Domain/Shared Bodies inside the Step rather than current owners ahead of implementation.

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

Those State Units support the Step/current Target; they do not become extra `RU-SLICE-*`.

## Exact / Materialization Boundary

```text
selected EVO-PAYMENT target state
→ TM-EXACT-REALIZATION
→ code/tests/config
→ actual Evidence
→ if realized/proven:
   CREATE/REPLACE current Slice/Domain/Shared owners from the corresponding Target Bodies
```

The discovery result may stay conversational or in a temporary working plan. Physical persistence/file layout is resolved separately by Documentation / Representation + P-14.
