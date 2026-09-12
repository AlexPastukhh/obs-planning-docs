# Installed IDTSPE Profiles

Status: active profile registry

A profile packages concrete Target Modules, profile-specific Lenses, semantic guidance, representation conventions, command surfaces and examples on top of IDTSPE Core.

## Installed

| Profile | Bootstrap entry | Scope |
|---|---|---|
| [`SDS`](sds/README.md) | [`sds/README.md`](sds/README.md) → `Profile Bootstrap` | software/Application planning through behavior, implementation ownership, exact realization and evidence |

## Bootstrap Rule

Every profile bootstrap is incremental. It assumes the primary bootstrap from [`planning/README.md`](../../../../README.md) has already established Session, Documentation and IDTSPE Core. A profile `README.md` owns its own profile read set; installed-profile navigation does not duplicate it here.

## Profile Applicability Gate

```text
installed profile
≠ applicable/active profile
```

A profile becomes relevant when the current Work Concern needs specialized semantics/components inside that profile's declared scope. Profile relevance does not itself create a Target or select every profile registry/component. Incremental profile bootstrap is needed only when that profile context is not already reliable.

If no installed profile is materially relevant, remain in generic IDTSPE Core. For the current installation, software/Application behavior, implementation ownership, realization or software-specific evaluation pressure makes SDS plausibly relevant.

## Rule

```text
IDTSPE Core
≠ profile

profile
= an installed specialization built on IDTSPE Core
```

Internal Target/Lens counts and workflow details are owned by the profile's own registries and README, not duplicated here.
