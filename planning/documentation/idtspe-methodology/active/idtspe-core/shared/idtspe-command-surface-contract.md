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

## Generic Core Surface Inventory — 9

```text
idtspe.bootstrap
→ бутстреп idtspe

idtspe.work
→ работай через idtspe

idtspe.next
→ что дальше по методологии

idtspe.continue
→ продолжи по методологии

idtspe.review_consistency
→ проверь консистентность плана

idtspe.lenses.select
→ подбери линзы <target/context>

idtspe.lens.apply
→ примени линзу <lens> к <target/context>

lenscmd.documentation.representation.check
→ проверь как лучше зафиксировать <target/result>

lenscmd.linked-notes.justify
→ проверь оправданы ли linked notes <target>
```

These are **9 generic Core methodology surfaces**. Installed profiles contribute their own additional surfaces; current total counts are a projection owned by the relevant profile/integration contracts, not by Core.

## Bootstrap / Work Boundary

`idtspe.bootstrap` is governance orientation only and has `hostTargetPolicy=NONE`.

`idtspe.work` enters ordinary material planning through the IDTSPE Shell and may create/reuse the natural Target according to Target Formation.

Bootstrap must not silently select a Target, infer a Target invocation mode or execute Target work.

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
surface Finding Candidate(s)
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
