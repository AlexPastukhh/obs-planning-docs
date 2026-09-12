# IDTSPE Methodology Registry Directory

Status: active supporting routing index

Purpose: let a selected IDTSPE Use-Case Process decide **which methodology-component registry may be worth scanning** without hard-coding every component into the Use Case or Methodology Use-Case Scenario Map.

This directory is **not** the root functional router. Use Cases are selected first through the Documentation [`Methodology Use-Case Registry Map`](../../../../use-case-registry-map.md).

## Directory Contract

Each row answers:

```text
Registry / family
Responsibility / question answered
When a scan may be useful
What the scan can route to
Canonical owner
Recheck conditions
```

A directory match means "scan this registry", not "apply every entry".

## Core Directory

| Registry / family | Responsibility / question answered | Check when | Routes to | Owner | Recheck when |
|---|---|---|---|---|---|
| IDTSPE Use-Case Registry | which IDTSPE methodology-use capabilities apply | always logically; especially at entry/material context change | current IDTSPE Use Cases | [`idtspe-methodology-use-case-registry.md`](idtspe-methodology-use-case-registry.md) | situation/useful result changes |
| Core Target Module Registry | is there a reusable generic Target production contract for the bounded result | a Target/bounded result is useful and may match a recurring generic family | Core Target Modules | [`../target-modules/README.md`](../target-modules/README.md) | Target purpose/result changes |
| Core Lens Registry | which generic evaluation perspectives are plausibly applicable | current material may benefit from evaluation/challenge/refinement | Core Lenses | [`../lenses/README.md`](../lenses/README.md) | Analysis Surface/Decision/Evidence changes |
| Installed Profile Registry | which profile supplies specialized Target/Lens/knowledge components | domain/profile-specific planning semantics are materially relevant | profile bootstrap/registry directory | [`../../profiles/README.md`](../../profiles/README.md) | active domain/scope changes |
| Theoretical Module Registry | which independent reusable theory package may help | a selected Process/component needs deeper theory not already in its Knowledge Basis | theoretical modules | [`../../theoretical-modules/README.md`](../../theoretical-modules/README.md) | question/theory need changes |

## Active Profile Composition

When a profile is active, compose this Core directory with the profile's own local directory. Core does not duplicate mutable profile entries.

Current SDS local directory: [`../../profiles/sds/shared/methodology-registry-directory.md`](../../profiles/sds/shared/methodology-registry-directory.md).

## Traversal Procedure

1. Start from the active Use Case(s) and current situation/Work Context.
2. Check only directory rows plausibly relevant to the next methodology decision.
3. Open the concrete registry for each matched row.
4. Use that registry's scan guide/applicability metadata.
5. Open only matched component/detail owners.
6. Let each component perform its own local applicability/materiality check.
7. Record the traversal in `Methodology Usage State` only when it has continuation/revalidation value.
8. Declare a recheck trigger when current non-applicability depends on an assumption likely to change.

`NO_RELEVANT_REGISTRY` is a valid outcome.

## Boundary

```text
Use-Case Registry Map
= which functional methodology-use capabilities apply

Use Case Process
= what methodology/documentation actions to perform

Methodology Registry Directory
= which specialized registry family may help that Process now

Concrete Registry
= which entries/components are plausible

Concrete Component
= how to perform specialized work
```

The directory does not create Targets, Findings, Decisions or Result Units and does not become a workflow engine.
