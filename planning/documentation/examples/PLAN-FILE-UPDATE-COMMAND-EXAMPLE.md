# Plan File Update Command Example

Status: active practical example
Scope: demonstrate the current `план файл-обновление` output shape without owning methodology.

Canonical owners: [`../../use-cases/UC-REPO-PLAN-UPDATE.md`](../../use-cases/UC-REPO-PLAN-UPDATE.md), [`../../commands/plan-file-update.command.md`](../../commands/plan-file-update.command.md).

## План файл-обновление

**Статус:** planned

### Command metadata

| Field | Value |
|---|---|
| Canonical command | `план файл-обновление` |
| English name | `plan file update` |
| Permission mode | `plan-only` |

### Target

Replace a transitional repository-wide Use-Case aggregation with scoped semantic navigation while preserving existing canonical Use-Case owners.

### Checked sources

- `planning/README.md`;
- `planning/use-case-registry.md`;
- `planning/documentation/use-case-registry.md`;
- `planning/session/use-case-registry.md`;
- `planning/documentation/principles-and-terminology.md`.

### Current selected meaning

```text
README/navigation
→ select relevant area
→ follow that area's current navigation
→ canonical owner

Use-Case Registry
→ complete only for its declared functional scope
→ ID | Use Case | Owner
```

A root registry does not duplicate Session/Documentation/specialized-methodology capabilities merely to create one global catalogue.

### Update Step 1 — Normalize structural navigation

**Objective:** make root navigation area-oriented rather than ontology-oriented.

#### Actions

1. Update root/planning README wording to route to the relevant area.
2. Keep README structural; do not duplicate Use-Case bodies or specialized methodology semantics.

#### Files changed in this step

| Change | File | Responsibility | What changes |
|---|---|---|---|
| Updated | `README.md` | repository structural entry | area-owned semantic navigation |
| Updated | `planning/README.md` | Planning structural map | scoped registry responsibilities |

### Update Step 2 — Make registries scoped and minimal

**Objective:** leave functional meaning in canonical Use-Case owners.

#### Actions

1. Keep only repository-specific current UCs in `planning/use-case-registry.md`.
2. Keep Documentation UCs in `planning/documentation/use-case-registry.md` and Session UCs in `planning/session/use-case-registry.md`.
3. Preserve the minimal registry row contract: `ID | Use Case | Owner`.
4. Retire transitional identities instead of manufacturing owner files merely to preserve old catalogue rows.

#### Files changed in this step

| Change | File | Responsibility | What changes |
|---|---|---|---|
| Updated | `planning/use-case-registry.md` | repository-specific functional navigation | remove cross-scope aggregation/transitional rows |
| Updated | `planning/documentation/use-case-registry.md` | Documentation functional navigation | current scoped rows only |
| Updated | `planning/documentation/principles-and-terminology.md` | generic Documentation rules | registry completeness becomes scope-relative |

### Update Step 3 — Reconcile dependent projections

**Objective:** keep executable/helper projections aligned with canonical owners.

#### Actions

1. Route standalone commands directly to their real supporting owners when no independent UC is justified.
2. Remove retired UC identities from Helper catalog ordering.
3. Rebuild generated semantic projections and run current checks.

### Boundaries / intentionally unchanged

- No new branch-work methodology is invented.
- Specialized IDTSPE/SDS semantic units remain owned by IDTSPE/SDS.
- Historical action-log and legacy/provenance records are not rewritten.
- This plan does not edit files or create a package by itself.

### Checks / exit criteria

1. Every current registry row is `ID | Use Case | Owner` and points to a current owner.
2. No transitional root UC aggregation remains.
3. Retired root UC identities are absent from current generated Use-Case projections.
4. Specialized IDTSPE Use Cases remain reachable from their own current registry.
5. Generated Helper artifacts match current sources and tests pass.

### Package/source/delivery status

```text
Package: not created in plan-only mode
Source: current checked repository state
Delivery: requires separate `давай архив` authorization
```

### Следующее действие

Build a replacement package only after separate authorization.

**План файл-обновление**
