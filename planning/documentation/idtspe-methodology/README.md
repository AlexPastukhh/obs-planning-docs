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
│   ├── sds/              Solution/Application planning
│   ├── visual-production-2d/  2D visual production
│   └── reference-knowledge/   reusable reference knowledge / Banks
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

Core mechanics cannot be redefined by an installed profile. A Lens evaluates/discovers; it does not become Target-result semantic owner. File location never creates semantic ownership by itself.

## IDTSPE Core

Start at:

- [`active/idtspe-core/README.md`](active/idtspe-core/README.md)
- [`active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md`](active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md)
- [`active/idtspe-core/target-modules/TARGET-MODULE-REGISTRY.md`](active/idtspe-core/target-modules/TARGET-MODULE-REGISTRY.md)
- [`active/idtspe-core/lenses/LENS-REGISTRY.md`](active/idtspe-core/lenses/LENS-REGISTRY.md)

Generic optional Need / real-life solution discovery is [`active/idtspe-core/runtime/target-work/guidance/NEED-AND-REAL-LIFE-SOLUTION-DISCOVERY.target-formation-guidance.md`](active/idtspe-core/runtime/target-work/guidance/NEED-AND-REAL-LIFE-SOLUTION-DISCOVERY.target-formation-guidance.md).

## Installed Profiles

[`active/profiles/PROFILE-REGISTRY.md`](active/profiles/PROFILE-REGISTRY.md) is the installed-profile registry.

Current profile entries:

- [`active/profiles/sds/README.md`](active/profiles/sds/README.md) — Solution/Application planning.
- [`active/profiles/visual-production-2d/README.md`](active/profiles/visual-production-2d/README.md) — 2D visual production.
- [`active/profiles/reference-knowledge/README.md`](active/profiles/reference-knowledge/README.md) — reusable reference knowledge, Banks, Vocabulary and Landscape analysis.

Each profile owns its own inventory, bootstrap/read set, Target Module/Lens registries and profile-specific representation guidance. This workspace README intentionally does not duplicate profile cardinalities or internal workflow topology.

## Representation

Generic authority: [`active/idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](active/idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md).

Profile-specific representation guidance remains with the applicable profile, for example:

- [`active/profiles/sds/representation/ARTIFACT-PLACEMENT-MAP.md`](active/profiles/sds/representation/ARTIFACT-PLACEMENT-MAP.md)
- [`active/profiles/visual-production-2d/representation/ARTIFACT-PLACEMENT-MAP.md`](active/profiles/visual-production-2d/representation/ARTIFACT-PLACEMENT-MAP.md)
- [`active/profiles/reference-knowledge/representation/ARTIFACT-PLACEMENT-MAP.md`](active/profiles/reference-knowledge/representation/ARTIFACT-PLACEMENT-MAP.md)

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
2. Is it profile-specific recurring Target/Lens/guidance/placement meaning? → the applicable `active/profiles/<profile>/`.
3. Is it a new installed planning family? → a sibling `active/profiles/<profile>/` plus installed-profile navigation.
4. Is it useful theory not yet operationalized? → `active/theoretical-modules/`.
5. Is it a repository-specific migration fact? → `integration/`.
6. Is it historical/superseded source? → `sources-readonly/`.
7. Is it only another map of existing owners? → normally do not add it; improve the nearest README/registry instead.
