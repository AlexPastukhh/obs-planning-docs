
# Phase 06 — Feasibility / Delivery Shaping — Generic

Status: active module-driven navigation family

## Purpose

Use accumulated Scenario/Domain/current-state Evidence to shape delivery and revalidate earlier assumptions before detailed implementation planning.

## Target Modules

```text
TM-SLICE-STRATEGY — only when decomposition/order is material
TM-TEST-STRATEGY — conditional after the selected Slice portfolio is known
```

Realization feasibility is not a separate Target Module by default.

## Directed Gate

Normal testing-aware direction:

```text
selected Domain owners
+ material per-Domain Test Designs planned/not-applicable/deferred
↓
TM-SLICE-STRATEGY
  or direct selected Slice Definition when decomposition is obvious
↓
selected Slice portfolio
↓
TM-TEST-STRATEGY — only if shared/cross-Slice/layer coordination is material
↓
per-Slice TM-IMPLEMENTATION-SLICE ↔ TM-TEST-DESIGN
```

Test Strategy does not replace per-Domain or per-Slice Test Design. When shared coordination is material, it may also persist a compact Test Realization / Topology Registry that answers where each selected Slice/Domain proof is realized (test class/suite/setup/fixture/harness/helper) and which infrastructure is shared; this registry references code and does not duplicate test bodies.

When later Evidence challenges application-level viability/boundary:

```text
reopen / revalidate TM-APPLICATION-DEFINITION
```

When one concrete technical feasibility problem becomes independently material:

```text
form a bounded child IDTSPE Target for that problem
```

Do not let feasibility Evidence become Scenario/Domain authority.

Canonical graph: `../shared/directed-methodology-workflow-and-next-step-resolution.md`.
