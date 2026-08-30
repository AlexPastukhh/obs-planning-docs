
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

Test Strategy does not replace per-Domain or per-Slice proof decisions. When shared coordination is material, it owns only the cross-owner proof layer, non-duplication rule, environment/harness policy and other independently useful shared constraints. Exact test-class/suite/setup/fixture/helper inventory stays implementation-native under Exact Realization/code authority; an optional generated/reference map is justified only when a large reused cross-owner relation is not adequately visible from code and does not become shadow implementation documentation.

When later Evidence challenges application-level viability/boundary:

```text
Finding / Revalidation Signal
→ Core Finding Disposition
→ TM-APPLICATION-DEFINITION revalidation/reopen when warranted
```

When one concrete technical feasibility problem becomes independently material:

```text
surface Target Formation candidate
→ Target Formation decides reuse / handoff / new bounded Target
```

Do not let feasibility Evidence become Scenario/Domain authority.

Canonical graph: `../shared/directed-methodology-workflow-and-next-step-resolution.md`.
