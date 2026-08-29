# Installed IDTSPE Profiles / Target Families

Status: active profile registry

A profile packages concrete Target Modules, profile-specific Lenses, directed workflow/readiness, artifact/file conventions, command surfaces and examples on top of IDTSPE Core.

## Installed

| Profile | Bootstrap | Scope |
|---|---|---|
| [`SDS`](sds/README.md) | [`BOOTSTRAP-SDS.md`](sds/BOOTSTRAP-SDS.md) | Solution/Application → Scenario → optional Domain → Slice/Workspace evolution/testing planning |

## Rule

```text
IDTSPE Core
≠ SDS

SDS
= one current profile built on IDTSPE Core
```

Future non-SDS planning profiles can be added beside `sds/` without redefining the generic Shell.

## Current SDS Conformance

The installed SDS profile now uses explicit Target Step-Result Contracts / Result Units in all 16 Target Modules and explicit Lens Analysis Surface + `ANALYZE / CHECK / REFINE / CHALLENGE` + Finding Contracts in all 6 SDS-specific Lenses. Generic finding ownership/state/lifecycle placement is resolved by Core `Finding Disposition`.
