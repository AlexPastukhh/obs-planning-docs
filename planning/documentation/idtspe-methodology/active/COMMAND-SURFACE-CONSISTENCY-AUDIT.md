# Command Surface Consistency Audit

Status: PASS — refreshed after Documentation / Representation command-surface correction

## Authority

Canonical methodology command owner:

[`profiles/sds/shared/idtspe-command-surface-contract.md`](profiles/sds/shared/idtspe-command-surface-contract.md)

Repository mapping remains a migration projection under `integration/`; it is not command-surface authority.

## Current Inventory

```text
3 framework/bootstrap/work surfaces
17 canonical SDS Target Module surfaces
12 focused Target-Module shortcuts
4 reusable direct Lens surfaces
3 orchestration/validator surfaces
= 39 methodology invocation surfaces
```

Direct reusable Lens surfaces:

```text
lenscmd.weuc.check
→ проверь эволюцию и архитектуру <target>

lenscmd.simplicity.check
→ проверь можно ли упростить <target>

lenscmd.documentation.representation.check
→ проверь как лучше зафиксировать <target/result>

lenscmd.linked-notes.justify
→ проверь оправданы ли linked notes <target>
```

## Checks

- all 17 active SDS Target Modules have canonical surfaces: **PASS**
- `idtspe.bootstrap`, `idtspe.work`, `sdscmd.bootstrap` are present and distinct: **PASS**
- WEUC direct Lens command is present in owner + command contract: **PASS**
- Simplicity direct Lens command is present in owner + command contract: **PASS**
- Documentation / Representation direct Lens command is present in owner + command contract: **PASS**
- Linked Notes direct Lens command is present in owner + command contract: **PASS**
- direct Lens commands do not create new Target Modules: **PASS**
- `idtspe.next`, `idtspe.continue`, `idtspe.review_consistency` remain orchestration/validator surfaces: **PASS**
- Theoretical Modules do not receive automatic command surfaces: **PASS**
- AI Reviewability / Key Points does not receive an automatic methodology command: **PASS**
- repository command IDs remain separate migration decisions: **PASS**

## Boundary

A new Lens does not automatically imply a command. A direct Lens command is added only when the Lens exposes a stable recurring user intent that is useful to invoke explicitly.
