# IDTSPE Profile Responsibility Map

Status: active routing projection

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `DOC.RESPONSIBILITY-MAP`
> Owner: [Responsibility Map](../../../../../../source-context/planning/documentation/principles-and-terminology.md#doc-responsibility-map)

This map routes installed-profile discovery and profile-local responsibility namespaces. It owns routing only. Profile semantic bodies stay with the selected profile map and its destination owners; IDTSPE Core remains authoritative for generic Target Module, Lens, Target Work, Resolution, Knowledge, Representation and runtime semantics.

| Responsibility | Canonical owner | Boundary / notes |
|---|---|---|
| Installed profile discovery, profile applicability gate and bootstrap-entry routing | [`PROFILE-REGISTRY.md`](PROFILE-REGISTRY.md#idtspe-profile-discovery) — `IDTSPE.PROFILE-DISCOVERY` | Installation/relevance routing only; profile relevance does not create a Target or execute every profile component |
| SDS profile semantic/routing responsibilities | [`sds/RESPONSIBILITY-MAP.md`](sds/RESPONSIBILITY-MAP.md) | Software/Application specialization; Core semantics are inherited rather than copied |
| 2D Visual Production profile semantic/routing responsibilities | [`visual-production-2d/RESPONSIBILITY-MAP.md`](visual-production-2d/RESPONSIBILITY-MAP.md) | 2D visual specialization only; 3D and generic Core semantics remain outside this profile |
| Reference Knowledge profile semantic/routing responsibilities | [`reference-knowledge/RESPONSIBILITY-MAP.md`](reference-knowledge/RESPONSIBILITY-MAP.md) | Reusable Bank/Entry/Vocabulary/Landscape specialization; consumer Source authority remains Core-owned |

Profile command surfaces are projections of already-owned methodology capabilities. Their command/Helper composition ownership is intentionally audited in `PASS-4-HELPER-COMMANDS-GLOBAL-CLOSEOUT`, not by this profile semantic map.

Guards:

```text
installed profile ≠ active profile
profile bootstrap ≠ Target formation
profile registry ≠ concrete Target Module / Lens semantic owner
profile specialization ≠ second Core runtime
profile command surface ≠ methodology semantic owner
```
