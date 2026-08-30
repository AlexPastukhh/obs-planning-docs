# IDTSPE Core Command Surface Contract

Status: active generic IDTSPE Core command-surface owner  
Scope: generic user-level invocation surfaces that remain valid independently of any one installed profile.

## Purpose

Define the **generic IDTSPE invocation surface** without making repository command files, palette UI or an installed profile a second Core authority.

```text
Core Target / Lens / Shell owners
= generic methodology semantics

this contract
= stable generic IDTSPE user invocation/navigation surface

profile command-surface contracts
= profile-specific extensions only

repository command definitions / helper
= implementation/projection
```

A profile may extend this surface, but a generic Core command must not depend semantically on an SDS-specific command-surface owner merely because SDS is currently installed.

## Generic Core Surface Inventory — 11

```text
idtspe.bootstrap
→ бутстреп idtspe

idtspe.work
→ idtspe [optional TM/LENS selector + context]
→ aliases: работай через idtspe / режим idtspe

idtspe.next
→ что дальше по методологии

idtspe.continue
→ продолжи по методологии

idtspe.review_consistency
→ проверь консистентность плана

tmcmd.pre.update
→ составь предапдейт план <scope>
→ generic `TM-PRE-UPDATE-PLAN`; concrete read-only change plan before actual mutation

tmcmd.exact.realization
→ реализуй код <scope>
→ generic `TM-EXACT-REALIZATION`; code is the default archetype, while `сделай точную реализацию` remains a generic alias

idtspe.lenses.select
→ подбери линзы <target/context>

idtspe.lens.apply
→ примени линзу <lens> к <target/context>

lenscmd.documentation.representation.check
→ проверь как лучше зафиксировать <target/result>

lenscmd.linked-notes.justify
→ проверь оправданы ли linked notes <target>
```

These are **11 generic Core methodology surfaces**. Installed profiles contribute their own additional surfaces; current total counts are a projection owned by the relevant profile/integration contracts, not by Core.

## Bootstrap / Work Boundary

`idtspe.bootstrap` is governance orientation only and has `hostTargetPolicy=NONE`.

`idtspe.work` is also the generic installed-component dispatcher. Bare `idtspe` enters ordinary material planning; `idtspe <TM-ID|LENS-ID|registry alias> <context>` resolves the component through current registries and then uses normal Target Formation/Lens execution. It supports multi-turn Broad Discussion as the normal exploratory mode and periodic Integration Checkpoints when the user asks to see the integrated whole or a full Target invocation is used for that purpose; the checkpoint is not a new command/lifecycle/Target kind.

Bootstrap must not silently select a Target, infer a Target invocation mode or execute Target work.


## Generic Component Dispatch

```text
idtspe
→ ordinary work

idtspe TM-* <context>
idtspe tm <alias> <context>
→ invoke selected Target Module through normal Target Formation

idtspe LENS-* <context>
idtspe lens <alias> <context>
→ resolve/reuse host Target
→ apply selected Lens
→ material Finding Candidate
→ Core Finding Disposition
```

Resolution order is exact semantic ID first, then explicit namespace alias, then a unique bare alias. Ambiguous/unknown selectors are not guessed. Registry aliases are navigation only; repository command IDs and historical `tmcmd.*` keys are compatibility/implementation details.

## Pre-Update Plan Surface

`tmcmd.pre.update` invokes generic Core [`TM-PRE-UPDATE-PLAN`](../target-modules/TM-PRE-UPDATE-PLAN.md).

```text
current request + accepted prior meaning + necessary current-state facts
→ ordinary IDTSPE Q/R/P/Evidence + Ideas/Decision only when a real choice/uncertainty exists
→ RU-PUPDATE-01 Pre-Update Plan
→ stop before mutation
```

The Target is optional. It is useful when the user wants to review intended changes before actual update; a tiny/obvious change may go directly to Exact Realization. The command is read-only planning and never grants mutation/test/commit/push authority.

## Exact Realization Surface

`tmcmd.exact.realization` invokes the generic Core [`TM-EXACT-REALIZATION`](../target-modules/TM-EXACT-REALIZATION.md). The canonical practical phrase is code-first because code is the primary/default archetype, while the same module may realize another exact directly integrable artifact when the Target scope says so.

The surface has an explicit authority boundary:

```text
produce exact candidate
→ allowed by the Target invocation

integrate / build / test / mutate selected environment
→ only with explicit user authority for that environment

automatic repair
→ only when explicitly authorized
→ local/minor + in-scope + no accepted architecture/Domain/product/upstream-semantic change

commit / push / deploy / release
→ never implied
```

A material semantic/architectural/out-of-scope problem crosses normal Finding Disposition/revalidation rather than being silently fixed during implementation.

## Generic Lens Operations

### `idtspe.lenses.select`

```text
bounded Target candidate / existing Target
↓
Target Formation when needed
↓
TF-06A Lens Applicability Scan
↓
resolved Lens Set
```

This surface uses `CREATE_OR_REUSE_TARGET`: Lens selection is part of Target Formation and must work for a first-class Local Target Contract when no reusable Target Module fits.

It does not execute every Lens body. Registry summaries/applicability gates are scanned first; full Lens and referenced Knowledge Basis bodies are loaded only for selected/plausibly applicable candidates.

### `idtspe.lens.apply`

```text
existing/resolved natural Target context
+ selected registered Lens
↓
apply that Lens Operational Evaluation Contract
↓
Broad Discussion / Key Points when explanatory analysis is useful
↓
material Finding Candidate(s) only when semantic disposition is needed
↓
Core Finding Disposition resolves actual semantic owner / State / lifecycle consequence
```

This surface uses `RESOLVE_OR_REUSE_TARGET`. It is a generic dispatcher, has no fixed `lensId`, and never creates a Lens-owned Target.

## Specialized Lens Shortcut Rule

A registered Lens does **not** receive a dedicated command automatically. Every registered Lens remains reachable through `idtspe.lens.apply`; a fixed shortcut is justified only for a stable recurring user intent.

Current generic Core shortcuts are:

```text
lenscmd.documentation.representation.check
lenscmd.linked-notes.justify
```

Profile-specific shortcuts belong to that profile's command-surface extension.

## Profile Extension Rule

```text
IDTSPE Core command surface
+ selected profile command-surface extension
= user-visible methodology surface for that profile
```

A profile extension may add bootstrap, Target Module, focused Target and profile-specific Lens shortcut surfaces. It must not redefine the semantics or host-target policy of generic Core surfaces.

Current SDS extension:

[`../../profiles/sds/shared/idtspe-command-surface-contract.md`](../../profiles/sds/shared/idtspe-command-surface-contract.md)

## Repository / Helper Boundary

Repository command definitions carry concrete aliases plus stable `methodologyBinding` and helper-presentation metadata. The Helper is a metadata-driven projection only.

Changing tabs/groups/order must not silently redefine Core command semantics, Target ownership, Lens ownership or host-target policy.
