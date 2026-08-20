# Test Design Practical Example

Status: reusable example only

Selected behavior: an approved request may not be approved again; a rejected approval attempt must not alter the existing decision.

| Behavior | Outcome proved | Test layer | Setup / action / observation | Required assertions | Escape risk | Refactor risk | Planned / actual evidence |
|---|---|---|---|---|---|---|---|
| approve an eligible request | transition is accepted and durable | API integration | arrange eligible request; call public API; read persisted/result state | success contract; status=Approved; decision exists; read projection shows Approved | Low if persistence/result both asserted | Low | planned |
| approve an already-approved request | invalid repeat does not corrupt state | API integration + no-mutation | arrange approved request; call same public API; compare before/after | rejection contract; status unchanged; decision unchanged; no extra decision row | Low | Low | planned |

The Domain owner defines the invariant; the tests only prove it.
