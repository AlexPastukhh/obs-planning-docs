# IDTSPE Methodology Workspace

Status: active workspace/navigation contract

This workspace separates generic IDTSPE Core, installed planning profiles, peer concerns, temporary theory, examples/audits and repository-integration/provenance material. It tells a reader **where authority lives**; it does not duplicate the internals of each package.

When this README and a narrower canonical owner disagree, the narrower owner wins and this README must be corrected.

## Top-Level Zones

```text
idtspe-methodology/
├── README.md
├── MANIFEST.json
├── active/
├── integration/
└── sources-readonly/
```

- [`active/`](active/) — current operational methodology.
- [`integration/`](integration/) — repository-specific migration/integration projections; not methodology authority.
- [`sources-readonly/`](sources-readonly/) — frozen provenance/superseded material; not current authority.
- [`MANIFEST.json`](MANIFEST.json) — machine-readable projection of the current package; not semantic authority.

## Active Methodology Zones

See [`active/README.md`](active/README.md) for the short installed-zone index. The main zones are:

```text
active/
├── idtspe-core/          generic planning runtime/contracts
├── profiles/             installed planning families
│   └── sds/              current Solution/Application planning profile
├── ai-reviewability/     independent peer concern
├── theoretical-modules/  useful raw/not-yet-operationalized theory
└── <current audits>      verification only; not semantic owners
```

There is intentionally no separate whole-system map that knows the internals of every profile. Package READMEs and their registries own that navigation.

## Authority Types

| Type | Responsibility | Semantic authority |
|---|---|---:|
| Framework/semantic owner | Core model, Target Module, Lens, shared contract, directed workflow | yes |
| Package README / registry | navigation + installed inventory | only its own registry/navigation contract |
| Representation/placement guide | where already-owned meaning may be represented | representation only |
| Example | demonstrate current contracts | no |
| Audit | verify current assembled state | no |
| Theoretical Module | reusable/raw theory awaiting operationalization | no |
| Integration ledger | repository-specific migration/update state | no |
| Provenance source | historical/superseded source | no |

Core mechanics cannot be redefined by SDS. A Lens evaluates/discovers; it does not become Target-result semantic owner. File location never creates semantic ownership by itself.

## IDTSPE Core

Start at:

- [`active/idtspe-core/README.md`](active/idtspe-core/README.md)
- [`active/idtspe-core/BOOTSTRAP-IDTSPE.md`](active/idtspe-core/BOOTSTRAP-IDTSPE.md)
- [`active/idtspe-core/IDTSPE-SHELL.md`](active/idtspe-core/IDTSPE-SHELL.md)
- [`active/idtspe-core/target-modules/README.md`](active/idtspe-core/target-modules/README.md)
- [`active/idtspe-core/lenses/README.md`](active/idtspe-core/lenses/README.md)

Generic optional Need / real-life solution discovery is [`active/idtspe-core/shared/solution-discovery-workflow.md`](active/idtspe-core/shared/solution-discovery-workflow.md).

## Installed Profiles

[`active/profiles/README.md`](active/profiles/README.md) is the installed-profile registry.

Current SDS entry:

- [`active/profiles/sds/README.md`](active/profiles/sds/README.md)
- [`active/profiles/sds/BOOTSTRAP-SDS.md`](active/profiles/sds/BOOTSTRAP-SDS.md)
- [`active/profiles/sds/target-modules/README.md`](active/profiles/sds/target-modules/README.md)
- [`active/profiles/sds/lenses/README.md`](active/profiles/sds/lenses/README.md)
- [`active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md`](active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md)
- [`active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md`](active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md)

SDS currently installs 12 Target Modules and 6 SDS-specific Lenses over generic Core.

### SDS direction

```text
optional generic Need / real-life solution discovery
→ Application Definition
→ optional Prototype Evidence
→ Application Scenarios (+ Scenario-local planned change/new Scenario candidates)
→ optional Screen projection
→ optional Slice Strategy
→ flexible Slice / Aggregate realization
→ Exact Realization / Evidence
→ selective explicit revalidation
```

This is a preferred semantic direction, not a rigid waterfall. Downstream work may challenge upstream meaning only through Finding Disposition and explicit owner revalidation; it does not silently rewrite upstream truth.

SDS has no permanent `TM-WEUC`, no separate `TM-FRONTEND-SLICE`, and no separate `TM-DOMAIN-DRAFT`. Workspace Architecture Planning is a sibling reusable Direction under [`../architecture-planning/`](../architecture-planning/), while L5 inside SDS is the Evolution / Change Isolation evaluation perspective.

## Representation

Generic authority: [`active/idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](active/idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md).

SDS examples/guidance: [`active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md`](active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md).

```text
semantic owner
≠ Target instance
≠ physical file
```

Inline, implementation-native and asymmetric owner representation are normal. Physical trees in the Placement Map are examples, not scaffolds/laws.

## Examples And Audits

Worked examples demonstrate current contracts but do not define them. Current audits verify the assembled methodology but do not own semantic rules. Historical merge/audit files retain provenance only when they are explicitly marked historical.

## Integration / Provenance

- `integration/` maps methodology into concrete repository updates and may become stale independently of semantic owners.
- `sources-readonly/` is historical/provenance input only.

Neither may silently override `active/`.

## Where New Material Goes

Before adding a file, ask:

1. Is this generic IDTSPE mechanics? → `active/idtspe-core/`.
2. Is it SDS-specific recurring Target/Lens/workflow/placement meaning? → `active/profiles/sds/`.
3. Is it another installed planning family? → a sibling `active/profiles/<profile>/`.
4. Is it useful theory not yet operationalized? → `active/theoretical-modules/`.
5. Is it a repository-specific migration fact? → `integration/`.
6. Is it historical/superseded source? → `sources-readonly/`.
7. Is it only another map of existing owners? → normally do not add it; improve the nearest README/registry instead.
