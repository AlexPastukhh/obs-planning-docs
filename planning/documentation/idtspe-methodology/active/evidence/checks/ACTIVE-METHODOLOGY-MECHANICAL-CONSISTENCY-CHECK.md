# Active Methodology Mechanical Consistency Check

Status: **current post-Pass12 snapshot; mechanical facts only**

This file reports observed registry/projection parity. Semantic authority remains in the owning registries/contracts.

```text
active_core_target_modules = 2
active_sds_target_modules  = 13
installed_active_target_modules = 15

retired_sds_target_compatibility_stubs = 5
  (excluded from the active SDS registry)

core_lenses = 11
sds_lenses  = 7
installed_lenses = 18

methodology_use_cases = 16
  = 10 Documentation + 6 IDTSPE + 0 SDS-runtime

planning_command_definitions = 74
  = 48 primary + 26 hidden compatibility
```

Checks:

- Core Target Module registry/file parity: **2 / 2 PASS**
- SDS **active registry rows** resolve to active Target Module files: **13 / 13 PASS**
- retired SDS Target compatibility files are absent from the active registry: **5 / 5 PASS**
- Core Lens registry/file parity: **11 / 11 PASS**
- SDS Lens registry/file parity: **7 / 7 PASS**
- Methodology Use-Case Registry Map projects only current Documentation/IDTSPE runtime UCs: **16 PASS**
- SDS runtime methodology-use UC count: **0 PASS**
- current Planning Helper command definitions parse and generated projections are verified by the palette test suite: **PASS**
- numbered SDS workflow files remain retired; one semantic composition/readiness guide remains: **PASS**
- Full/Instance/Physical SDS maps remain retired; README/registry/workflow/placement responsibilities stay separated: **PASS**

## Anti-Drift Rule

Do not copy these counts into semantic contracts unless the number itself has methodological meaning.

Prefer:

```text
current registry rows
→ resolve owner files
→ verify required contract sections
```

over:

```text
hard-coded N / N
```

because active module/Lens counts may legitimately change while the contract remains the same.
