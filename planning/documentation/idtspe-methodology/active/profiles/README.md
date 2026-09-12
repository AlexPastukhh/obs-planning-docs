# Installed IDTSPE Profiles

Status: active profile registry

A profile packages concrete Target Modules, profile-specific Lenses, semantic guidance, representation conventions, command surfaces and examples on top of IDTSPE Core.

## Installed

| Profile | Bootstrap entry | Scope |
|---|---|---|
| [`SDS`](sds/README.md) | [`sds/README.md`](sds/README.md) → `Profile Bootstrap` | software/Application planning through behavior, implementation ownership, exact realization and evidence |

## Bootstrap Rule

Every profile bootstrap is incremental. It assumes the primary bootstrap from [`planning/README.md`](../../../../README.md) has already established Session, Documentation and IDTSPE Core. A profile `README.md` owns its own profile read set; installed-profile navigation does not duplicate it here.

## Rule

```text
IDTSPE Core
≠ profile

profile
= an installed specialization built on IDTSPE Core
```

Internal Target/Lens counts and workflow details are owned by the profile's own registries and README, not duplicated here.
