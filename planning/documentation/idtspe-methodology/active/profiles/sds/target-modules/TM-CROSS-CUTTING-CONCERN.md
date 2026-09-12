# TM-CROSS-CUTTING-CONCERN — RETIRED Compatibility Route

Status: **RETIRED — not an active SDS Target Module**

The old Cross-Cutting Target family is unified into:

[`TM-SHARED-IMPLEMENTATION-CAPABILITY.md`](TM-SHARED-IMPLEMENTATION-CAPABILITY.md)

A cross-cutting application shape does not create a second Target type.

Current routing:

```text
coherent reusable non-end-to-end responsibility
+ concrete Slice consumer need
→ TM-SHARED-IMPLEMENTATION-CAPABILITY

Domain state/invariant/lifecycle/policy pressure
→ TM-DOMAIN-DISCOVERY / TM-DOMAIN-OWNER

future shared change
→ TM-EVOLUTION-STEP

incidental/local common code
→ implementation-native / Slice-local
```

No active `RU-XC-*` authority remains here.

This file is intentionally retained only as a stable compatibility route. It is excluded from the active SDS Target Module registry, must never be scanned or instantiated as an active Target Module, and may be physically removed only during a later repository-cleanup pass after proving that no live command, helper, document, or external consumer still depends on the path.
