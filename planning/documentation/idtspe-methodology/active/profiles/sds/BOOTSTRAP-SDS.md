# Bootstrap SDS Profile

Status: active profile bootstrap contract  
Desired surface key: `sdscmd.bootstrap`  
Canonical user intent: `бутстреп sds`

## Helper Presentation

```text
When To Use:
  Use when entering or refreshing SDS/Application planning after IDTSPE Core is current, or when the current SDS Target/Lens/workflow/file-tree boundaries are uncertain.

What You Get:
  Current SDS profile map, 16 Target Module catalog, SDS Lens pack, directed workflow/readiness, representation/materialization policy, physical-topology coordinator and resolved current/next SDS planning owner when any.
```

## Runtime Identity

```text
SDS
= IDTSPE profile

SDS Target Module invocation
= IDTSPE planning instance configured by that Target Module

SDS Lens
= Lens applied inside/reusing an IDTSPE Target instance
```

SDS does not define a second planning runtime beside IDTSPE. Helper/UI surfaces should make this relationship explicit rather than presenting Target Modules or Lenses as independent workflows.

## Purpose

Load the current SDS profile after IDTSPE Core is current or can be refreshed internally.

```text
бутстреп sds
↓
ensure IDTSPE Core current
↓
SDS full map
↓
16 Target Module registry
↓
SDS-specific Lens pack + Core Lens dependencies
↓
directed workflow/readiness
↓
Documentation / Representation policy + Artifact Materialization Tree + Ideas/Evolution layout
↓
SDS command surface
↓
resolve current application/planning owners when any
```

This command does not mean “select Full physical profile” and does not create an Application Target by itself.

## Required Read Set

1. [`README.md`](README.md)
2. [`SDS-FULL-MAP.md`](SDS-FULL-MAP.md)
3. [`target-modules/README.md`](target-modules/README.md)
4. [`lenses/README.md`](lenses/README.md)
5. [`shared/directed-methodology-workflow-and-next-step-resolution.md`](shared/directed-methodology-workflow-and-next-step-resolution.md)
6. [`SDS-INSTANCE-MAP.md`](SDS-INSTANCE-MAP.md)
7. [`../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — fundamental representation policy: no file-per-Target rule; code/existing owner/catalog/strategy/dedicated artifact are all possible outcomes.
8. [`ARTIFACT-PLACEMENT-MAP.md`](ARTIFACT-PLACEMENT-MAP.md) — annotated literal materialization tree showing which Target Modules/Lenses propose possible files/representations.
9. [`SDS-PHYSICAL-PLANNING-TREE.md`](SDS-PHYSICAL-PLANNING-TREE.md) — short topology coordinator, not a mandatory tree.
10. [`shared/sds-global-planning-state-layout.md`](shared/sds-global-planning-state-layout.md)
11. [`shared/idtspe-command-surface-contract.md`](shared/idtspe-command-surface-contract.md)
12. [`../../idtspe-core/lenses/README.md`](../../idtspe-core/lenses/README.md) — Core Lens registry/installed Lens index.
13. [`../../theoretical-modules/README.md`](../../theoretical-modules/README.md) — discover temporary theory packages; do not read all raw bodies by default.
14. [`../../theoretical-modules/testing/README.md`](../../theoretical-modules/testing/README.md) — know the detailed Testing theory package exists; read its exact source bodies only when testing detail is materially needed and processed Test guidance is insufficient.

Specific `TM-*.md` and Lens bodies are read when the active Target/Lens set is resolved. A full bootstrap knows the complete catalogs/boundaries and Target Module/Lens Knowledge Basis summaries; it need not reread all 16 module bodies or their referenced Knowledge Basis owners, nor all Lens Knowledge Basis references, on every invocation. `TF-06A` may discover an applicable SDS Lens even for a Local Target Contract or when that Lens is not pre-attached by the current module.

## Profile Bootstrap Output

```text
SDS bootstrap state:
  FULL | TARGETED REFRESH | REUSED CURRENT

IDTSPE Core:
  current

SDS Target Module catalog:
  16 loaded/indexed

Core Lens Pack:
  L1 / L2 / L3
  + Documentation / Representation materialization check

SDS Lens pack:
  registry loaded; full bodies read proportionally

Lens Applicability Scan:
  TF-06A combines module attachment + registry applicability + explicit selection
  generic Core select/apply Lens operations available

  loaded/indexed

Directed workflow / representation/materialization topology:
  current

Active SDS planning workspace:
  <path / unresolved / none>

Current Target:
  <target / none>

Recommended next methodology action:
  <resolved next Target/command>
```


## File Creation / Representation Boundary

SDS bootstrap must preserve this invariant:

```text
Target Module invocation
≠ mandatory file creation

material result
→ Documentation / Representation Lens
→ minimum sufficient representation
→ Artifact Materialization Tree for possible SDS destinations/proposers
→ P-14 / TF-10 exact placement/action
```

The user/current planning situation decides whether meaning should live in code/tests/types/schema/config, an existing discovery/strategy/owner section, a dedicated owner artifact, a specialized companion or nowhere durably. Do not precreate optional files or force a full owner template merely because a Target exists.

## Separation From Specific Module Invocation

```text
бутстреп sds
= profile orientation

спланируй домен CaptureItem
= invoke one IDTSPE Target instance with TM-DOMAIN-DRAFT for one concrete Target

проверь эволюцию и архитектуру CaptureItem
= resolve/reuse that Target's IDTSPE context and activate the WEUC Lens
```
## SDS Unit / Lens Conformance

Current SDS profile invariant:

```text
16 / 16 Target Modules
→ explicit Resolution / Production Method
→ explicit Target Step-Result Contract / Result Units

6 / 6 SDS-specific Lenses
→ explicit Analysis Surface
→ ANALYZE / CHECK / REFINE / CHALLENGE methods
→ Finding Contract

Finding / routing / reopen / result-update consequence
→ generic Core Finding Disposition + normal lifecycle
```

Reference pair/example: [`examples/IMPLEMENTATION-SLICE-UNIT-REFERENCE.md`](examples/IMPLEMENTATION-SLICE-UNIT-REFERENCE.md).

