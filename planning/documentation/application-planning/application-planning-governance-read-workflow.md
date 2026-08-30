# Solution / Application Planning Governance Read Workflow

Status: active compatibility/supporting preflight

## Purpose

Preserve the existing `бутстреп сдс` command route while loading the **current** IDTSPE Core + SDS profile. This workflow is not a second SDS methodology owner.

## Reuse Rule

Reuse current reliable governance; refresh only changed/uncertain owners; perform a full preflight only when current boundaries cannot be reconstructed safely. Snapshot/commit identity alone is not an invalidation event. Do not require the user to invoke `бутстреп сдс` separately when another command can perform the needed preflight internally.

## Current Full Preflight

```text
1. planning/AI-WORKING-CONTRACT.md
2. planning/documentation/idtspe-methodology/active/idtspe-core/BOOTSTRAP-IDTSPE.md
3. planning/documentation/idtspe-methodology/active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md
4. planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/README.md
5. planning/documentation/idtspe-methodology/active/idtspe-core/lenses/README.md
6. planning/documentation/idtspe-methodology/active/profiles/sds/README.md
7. planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/README.md
8. planning/documentation/idtspe-methodology/active/profiles/sds/lenses/README.md
9. planning/documentation/idtspe-methodology/active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md
10. planning/documentation/idtspe-methodology/active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md
11. task-specific supporting Application/Architecture/Testing knowledge only when material
```

Do not read every Target Module/Lens/template/example during bootstrap. Resolve concrete bodies proportionally after the Target/component is known.

## Assimilation Boundary

```text
optional Need / Solution Discovery
→ Application Definition
→ optional Prototype
→ Scenario
→ Slice Strategy
→ flexible Domain/Aggregate Modeling ↔ Slice realization
→ Exact Realization / Evidence
```

Downstream work may challenge upstream meaning only through Finding Candidate → Core Finding Disposition → narrow revalidation/repair of the real owner.

Mini/Modular/Full are representation compatibility preferences, not separate profiles or bootstrap modes.

Permission: read-only governance. No file mutation, package creation, implementation, tests, commit or push.
