# IDTSPE Methodology Registry Directory

Status: active supporting routing index

Purpose: let a selected IDTSPE Use-Case Process decide **which methodology-component registry may be worth scanning** without hard-coding every component into the Use Case or Methodology Use-Case Scenario Map.

This directory is **not** the root functional router. Use Cases are selected first through the Documentation [`Methodology Use-Case Registry Map`](../../../../use-case-registry-map.md). The generic ownership/handoff chain is canonical in Documentation [`principles-and-terminology.md`](../../../../principles-and-terminology.md); this file owns only the directory-specific span after a Use Case Process has decided specialized registry discovery may help.

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
| Core Target Module Registry | is there a reusable generic Target production contract for the bounded result | a Target/bounded result is useful and may match a recurring generic family | Core Target Modules | [`../target-modules/TARGET-MODULE-REGISTRY.md`](../target-modules/TARGET-MODULE-REGISTRY.md) | Target purpose/result changes |
| Core Lens Registry | which generic evaluation perspectives are plausibly applicable | current material may benefit from evaluation/challenge/refinement | Core Lenses | [`../lenses/LENS-REGISTRY.md`](../lenses/LENS-REGISTRY.md) | Analysis Surface/Decision/Evidence changes |
| Installed Profile Registry | which profile supplies specialized Target/Lens/knowledge components | domain/profile-specific planning semantics are materially relevant | profile bootstrap/registry directory | [`../../profiles/PROFILE-REGISTRY.md`](../../profiles/PROFILE-REGISTRY.md) | active domain/scope changes |

## Active Profile Composition

When a profile is active, compose this Core directory with that profile's bootstrap/registries and any dedicated local registry directory the profile defines. A dedicated local directory is optional; the profile README and canonical registries remain sufficient routing surfaces when no extra directory is useful. Core does not duplicate mutable profile entries.

Current installed-profile entry points are indexed by [`../../profiles/PROFILE-REGISTRY.md`](../../profiles/PROFILE-REGISTRY.md) and profile-local semantic routing is owned by [`../../profiles/RESPONSIBILITY-MAP.md`](../../profiles/RESPONSIBILITY-MAP.md). SDS additionally defines a compact local registry directory; 2D Visual Production and Reference Knowledge route through their child Responsibility Maps and scoped registries. Knowledge Bases remain reached through their owning component/profile navigation unless a real registry need exists; this directory does not invent a catch-all Knowledge-Basis Registry.

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

This directory owns only the supporting span below an already-selected Use Case Process:

```text
selected Use Case Process
→ Methodology Registry Directory
   which specialized registry family may help now
→ Concrete Registry
   which entries/components are plausible
→ Concrete Component
   local applicability/materiality + specialized work
```

The upstream `Registry Map → scoped Use-Case Registry → Use Case owner` chain is defined by Documentation owners and is not redefined here. The directory does not create Targets, Findings, Decisions or Result Units and does not become a workflow engine.
