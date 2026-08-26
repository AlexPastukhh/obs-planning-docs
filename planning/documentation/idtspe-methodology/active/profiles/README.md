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
