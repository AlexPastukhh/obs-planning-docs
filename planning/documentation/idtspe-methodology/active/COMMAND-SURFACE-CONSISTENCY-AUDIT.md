# Command Surface Consistency Audit

Status: PASS — refreshed after Lens Applicability / generic Lens-operation integration

## Authority

Canonical command-surface owners:

- generic Core: [`idtspe-core/shared/idtspe-command-surface-contract.md`](idtspe-core/shared/idtspe-command-surface-contract.md)
- SDS extension: [`profiles/sds/shared/idtspe-command-surface-contract.md`](profiles/sds/shared/idtspe-command-surface-contract.md)

Repository mapping remains a migration projection under `integration/`; it is not command-surface authority.

## Current Inventory

```text
3 framework/bootstrap/work surfaces
16 canonical SDS Target Module surfaces
13 focused Target-Module shortcuts
4 specialized direct Lens shortcut surfaces
5 orchestration/validator surfaces
= 41 methodology invocation surfaces
```

Specialized direct Lens shortcut surfaces:

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

- all 16 active SDS Target Modules have canonical surfaces: **PASS**
- `idtspe.bootstrap`, `idtspe.work`, `sdscmd.bootstrap` are present and distinct: **PASS**
- WEUC direct Lens command is present in owner + command contract: **PASS**
- Simplicity direct Lens command is present in owner + command contract: **PASS**
- Documentation / Representation direct Lens command is present in owner + command contract: **PASS**
- Linked Notes direct Lens command is present in owner + command contract: **PASS**
- specialized direct Lens shortcuts do not create new Target Modules: **PASS**
- generic Core command definitions point to the Core command-surface owner rather than the SDS extension: **PASS**
- `idtspe.lenses.select` exposes the TF-06A Lens Applicability Scan with `CREATE_OR_REUSE_TARGET`, so it can participate in Local Target Formation without becoming a Target/Lens authority: **PASS**
- `idtspe.lens.apply` keeps `RESOLVE_OR_REUSE_TARGET` and can dispatch any registered applicable Lens without assigning a fixed `lensId`: **PASS**
- all registered Lenses remain reachable through generic apply even when they have no specialized command: **PASS**
- `idtspe.next`, `idtspe.continue`, `idtspe.review_consistency`, `idtspe.lenses.select`, `idtspe.lens.apply` are the five orchestration/validator surfaces: **PASS**
- Theoretical Modules do not receive automatic command surfaces: **PASS**
- AI Reviewability / Key Points does not receive an automatic methodology command: **PASS**
- repository command IDs remain separate migration decisions: **PASS**

## Boundary

A new Lens does not automatically imply a specialized command. Every registered Lens is generically reachable through `idtspe.lens.apply`; a dedicated shortcut is added only when the Lens exposes a stable recurring user intent. Lens selection itself is generically exposed through `idtspe.lenses.select`.
