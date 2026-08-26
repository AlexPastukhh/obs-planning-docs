# Target Module Framework

Status: active generic IDTSPE Core index

A Target Module is a reusable contract for one recurring Target/output family. The generic model is owned by:

- [`../shared/target-module-model.md`](../shared/target-module-model.md)
- [`../shared/knowledge-basis-contract.md`](../shared/knowledge-basis-contract.md) — shared Target Module/Lens Knowledge Basis contract
- [`../shared/target-module-creation-and-integration-use-case.md`](../shared/target-module-creation-and-integration-use-case.md)
- [`../shared/target-module-output-template-and-question-set-rule.md`](../shared/target-module-output-template-and-question-set-rule.md)

## Generic Invariant

Each concrete Target Module supplies, proportionally:

```text
Purpose
Target form / scope
Upstream Source Contract
Knowledge Basis (`INLINE | REFERENCED | HYBRID`)
Question examples
Lens Profile
Target-specific output
Artifact / File Contract
Validators / Guards
Handoff / revalidation
canonical user-level command surface
```

Every reusable Target Module contains exactly one `## Knowledge Basis` using the same shared contract as reusable Lenses. The module does not copy generic Shell state or reusable Lens algorithms/Knowledge Basis merely because a Lens is attached.

## Installed Target Module Families

### SDS Profile

Current SDS profile installs **17 Target Modules**:

[`../../profiles/sds/target-modules/README.md`](../../profiles/sds/target-modules/README.md)

Other profiles may install different Target Module sets. Their existence must not force Scenario/Domain/Slice semantics into IDTSPE Core.
