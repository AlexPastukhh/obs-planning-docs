# Command Surface Consistency Audit

Status: **PASS — regenerated for simplified SDS topology**

## Authority

- generic Core command owner: `idtspe-core/shared/idtspe-command-surface-contract.md`
- SDS extension owner: `profiles/sds/shared/idtspe-command-surface-contract.md`

## Canonical Methodology Inventory

```text
3 framework/bootstrap/work surfaces
2 generic Core Target Module surfaces
12 canonical SDS Target Module surfaces
10 focused Target-module shortcuts
5 specialized direct Lens shortcuts
5 orchestration/validator surfaces
= 37 methodology invocation surfaces
```

Repository aliases/command files may implement compatibility phrases without
becoming additional canonical methodology semantics.

## Checks

- 12 active SDS Target Modules have canonical surfaces: **PASS**
- retired `TM-DOMAIN-DRAFT`, `TM-WEUC`, `TM-FRONTEND-SLICE` are not canonical Target surfaces: **PASS**
- old Domain-owner intent routes to unified Domain/Aggregate Modeling: **PASS**
- L5 compatibility shortcut remains usable while semantic meaning is Evolution / Change Isolation: **PASS**
- frontend-specific work routes to Slice/UI Lens/normal Target Formation rather than a Frontend Target family: **PASS**
- command identity remains routing, not Target/Lens semantic authority: **PASS**
