# IDTSPE Core

Status: active canonical generic methodology package  
Scope: reusable planning runtime independent of SDS/Application-specific Target Modules.

## Boundary

```text
IDTSPE Core
= how a bounded planning Target is formed, evaluated, decided, persisted and revalidated

SDS Profile
= one installed family of concrete Target Modules, profile-specific Lenses,
  directed workflow and artifact conventions built on IDTSPE Core
```

IDTSPE Core must remain usable when another profile/family is added later. It therefore does not define Scenario, Domain, Slice, Screen, Application or SDS-specific Workspace Evolution semantics.

## Start Here

1. [`BOOTSTRAP-IDTSPE.md`](BOOTSTRAP-IDTSPE.md) — whole-methodology/core bootstrap contract.
2. [`IDTSPE-CORE-MAP.md`](IDTSPE-CORE-MAP.md) — generic owner/dependency map.
3. [`shared/idtspe-unit-and-target-step-result-model.md`](shared/idtspe-unit-and-target-step-result-model.md) — canonical Target Step Result + IDTSPE Unit model.
4. [`IDTSPE-SHELL.md`](IDTSPE-SHELL.md) — generic runtime/composition contract; current 15 port IDs remain stable technical navigation.
5. [`IDTSPE-DEFAULT-WORK-MODE.md`](IDTSPE-DEFAULT-WORK-MODE.md) — optional default operating mode for material AI planning.
6. [`../PLANNING-GOVERNANCE.md`](../PLANNING-GOVERNANCE.md) — authority/interaction rules.
7. [`target-modules/README.md`](target-modules/README.md) — Target Module framework and installed-family boundary.
8. [`shared/knowledge-basis-contract.md`](shared/knowledge-basis-contract.md) — shared Knowledge Basis contract used by Target Modules and Lenses.
9. [`lenses/README.md`](lenses/README.md) — generic Lens registry plus installed profile Lens references.
10. [`shared/idtspe-command-surface-contract.md`](shared/idtspe-command-surface-contract.md) — generic Core command/navigation surface and host-target policies.
11. [`lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — fundamental Documentation / Representation policy and worked materialization topologies.
12. [`../profiles/README.md`](../profiles/README.md) — installed planning profiles/families.

## Generic Core Owners

`shared/` contains reusable concepts that are not owned by any one profile:

```text
Target Formation / Resolution Slots
Target / Source / Relation model
Target Step Result + IDTSPE Unit model
Target Module model + maintenance UC
shared Target Module/Lens Knowledge Basis contract
Lens model + maintenance UC
Planning Branches
Decision intake / persistence / revalidation
Q/R/P priority / related groups / Decision Addresses-Exposes trace
Documentation / Representation + Artifact Placement / file realization
Practical Evidence
Consistency Review
command-helper presentation contract
```


## Target Step Result / Unit Boundary

```text
Target
→ bounded planning/resolution responsibility

Target Step Result
→ target-specific output wanted from the current bounded IDTSPE work step

IDTSPE Unit
├─ Target Step Result Unit — defined by Target Module / Local Target Contract
└─ IDTSPE State Unit — generic Core kind such as Question / Idea / QRP / Decision / Evidence
```

State Units can themselves be useful output of a pass. One Target does not imply one Result Unit or one file.

Lenses operate **inside** IDTSPE over Units. They may read/analyze, fill/refine, challenge/reopen, check/validate, affect existing Result Units after normal resolution, and route findings; they do not define Unit kinds.

Canonical owner: [`shared/idtspe-unit-and-target-step-result-model.md`](shared/idtspe-unit-and-target-step-result-model.md).

## Installed Profile Rule

A profile may contribute:

```text
Target Modules
profile-specific reusable Lenses
workflow/readiness graph
profile artifact/tree conventions
profile command surfaces
worked examples
```

A profile cannot redefine the generic IDTSPE Shell or generic Lens/Target mechanics locally. If it needs a different generic rule, that change is resolved at IDTSPE Core ownership first.

## Adjacent Packages

- [`../ai-reviewability/README.md`](../ai-reviewability/README.md) — independent peer concern for Key Points/review projection.
- [`../theoretical-modules/README.md`](../theoretical-modules/README.md) — raw temporary theory registry. Core may discover these packages without treating them as Target/Lens authority.
