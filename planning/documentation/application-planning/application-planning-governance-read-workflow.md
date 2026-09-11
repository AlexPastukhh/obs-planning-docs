# Solution / Application Planning Governance Read Workflow

Status: active compatibility/supporting preflight

## Purpose

Preserve the existing `бутстреп сдс` command route while loading the **current** IDTSPE Core + SDS profile. This workflow is not a second SDS methodology owner.

## Reuse Rule

Reuse current reliable governance; refresh only changed/uncertain owners; perform a full preflight only when current boundaries cannot be reconstructed safely. Snapshot/commit identity alone is not an invalidation event. Do not require the user to invoke `бутстреп сдс` separately when another command can perform the needed preflight internally.

## Current Full Preflight

```text
1. planning/README.md
   → follow Primary Bootstrap (Session + Documentation + IDTSPE Core)
2. planning/documentation/idtspe-methodology/active/profiles/sds/README.md
   → follow Profile Bootstrap
3. task-specific supporting Application/Architecture/Testing knowledge only when material
```

Do not independently reconstruct or duplicate either bootstrap read set here. Do not read every Target Module/Lens/template/example during bootstrap; resolve concrete bodies proportionally after the Target/component is known.

## Assimilation Boundary

```text
optional Need / Solution Discovery
→ Application Definition
→ Feature / Scenario / Screen as materially useful
→ optional Prototype / Domain Discovery
→ transient Slice Discovery (`TM-IMPLEMENTATION-SLICE`) when a bounded end-to-end realization is useful
→ optional durable Domain / Slice / Shared owners when independent persistence value exists
→ Exact Realization / Evidence
```

Downstream work may challenge upstream meaning only through Finding Candidate → Core Finding Disposition → narrow revalidation/repair of the real owner.

Mini/Modular/Full are representation compatibility preferences, not separate profiles or bootstrap modes.

Permission: read-only governance. No file mutation, package creation, implementation, tests, commit or push.
