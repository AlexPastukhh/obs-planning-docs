# Expected Error + Requirement Ownership Contract

Status: active SDS shared semantic-routing contract

```text
If implementation mechanism changed, would the application still distinguish the outcome?
YES → ERR-BEH-* at natural behavior owner
NO  → ERR-IMP-DOMAIN/SLICE/SHARED-* at natural realization owner
```

`Error ≠ Requirement`. Handling becomes BR/IR only when independently useful as a must-hold. Avoid one global semantic error enum.

```text
BR = required product/Feature behavior
IR = durable requirement on HOW realization is arranged for current behavior or concrete known Evolution pressure
```

Selected FBS/SPS/branch/order/layout may be normative structure without automatically becoming Requirements.


Requirement family/natural-owner authority is governed by [`requirement-ownership-and-exception-rule.md`](requirement-ownership-and-exception-rule.md); family authority must not be inferred from local discovery/provenance. Reusable Requirement `Type` and QRPE/table representation are governed by [`requirement-classification-and-representation-contract.md`](requirement-classification-and-representation-contract.md).
