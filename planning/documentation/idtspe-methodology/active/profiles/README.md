# Installed IDTSPE Profiles

Status: active profile registry

A profile packages concrete Target Modules, profile-specific Lenses, directed
workflow guidance, representation conventions, command surfaces and examples on
top of IDTSPE Core.

## Installed

| Profile | Bootstrap | Scope |
|---|---|---|
| [`SDS`](sds/README.md) | [`BOOTSTRAP-SDS.md`](sds/BOOTSTRAP-SDS.md) | Solution/Application → Scenario → Slice/Domain realization → exact realization/evidence |

## Rule

```text
IDTSPE Core
≠ SDS

SDS
= one installed profile built on IDTSPE Core
```

Internal Target/Lens counts and workflow details are owned by the profile's own
registries and README, not duplicated here.
