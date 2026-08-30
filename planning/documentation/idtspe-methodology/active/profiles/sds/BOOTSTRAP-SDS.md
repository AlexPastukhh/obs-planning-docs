# Bootstrap SDS Profile

Status: active profile bootstrap contract  
Desired surface key: `sdscmd.bootstrap`  
Canonical user intent: `бутстреп sds`

## Purpose

Load/refresh the current SDS profile after IDTSPE Core is current. Bootstrap is
navigation/context setup; it does not create an Application/Scenario/Slice Target
by itself.

## Runtime Identity

```text
SDS
= installed IDTSPE profile

SDS Target Module invocation
= ordinary IDTSPE Target work configured by that module

SDS Lens
= reusable perspective applied inside a natural IDTSPE Target/context
```

## Required Read Set

1. [`README.md`](README.md) — profile purpose + semantic direction.
2. [`target-modules/README.md`](target-modules/README.md) — 12 SDS Target Module registry.
3. [`lenses/README.md`](lenses/README.md) — 6 SDS-specific Lens registry + Core dependencies.
4. [`shared/directed-methodology-workflow-and-next-step-resolution.md`](shared/directed-methodology-workflow-and-next-step-resolution.md) — directed workflow / next-step logic.
5. [`ARTIFACT-PLACEMENT-MAP.md`](ARTIFACT-PLACEMENT-MAP.md) — owner/file placement guidance and worked topologies.
6. [`shared/idtspe-command-surface-contract.md`](shared/idtspe-command-surface-contract.md) — SDS command/routing surface.
7. [`../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — canonical representation policy.
8. [`../../idtspe-core/shared/solution-discovery-workflow.md`](../../idtspe-core/shared/solution-discovery-workflow.md) — optional generic pre-Application discovery when needed.

Specific `TM-*.md` and Lens bodies are read only when the active Target/Lens set
requires them. Bootstrap knows registries/boundaries; it does not reread all
module bodies on every invocation.

## Output

```text
SDS bootstrap state:
  FULL | TARGETED REFRESH | REUSED CURRENT

current profile direction understood
current Target/Lens registries available
current representation rules available
current command surface available
current/next Target family resolved only when the user/context requires it
```

## Direction Reminder

```text
optional Need / Solution Discovery
→ Application Definition
→ optional Prototype
→ Scenario
→ Slice Strategy
→ Slice / Aggregate realization
→ Exact Realization / Evidence
```

The direction is semantic, not a rigid phase sequence. Backward changes occur only
through explicit Finding Disposition/revalidation of the real upstream owner.
