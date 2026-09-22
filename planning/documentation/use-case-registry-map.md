# Methodology Use-Case Registry Map

Status: active functional-entry map

Responsibility ID: `DOC.USE-CASE-REGISTRY-MAP`

Purpose: provide the lightweight **cross-scope routing metadata** consumed by the fundamental methodology Use-Case applicability resolver. It maps Use-Case scopes; it does not own the applicability Process or duplicate the Use Cases themselves.

Prerequisite: the primary bootstrap from [`planning/README.md`](../README.md) establishes Session + Documentation + IDTSPE Core. [`UC-DOC-RESOLVE-CURRENT-USE-CASES`](use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md) is the functional methodology entry after bootstrap; this map is its first cross-scope routing data source, not another Use Case.

## Runtime Rule

> Semantic Owner Dependency
> Type: REPRESENTS
> Responsibility: `DOC.USE-CASE-APPLICABILITY-RESOLUTION`
> Owner: [`UC-DOC-RESOLVE-CURRENT-USE-CASES`](use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md)

This map supplies cross-scope routing metadata to the owner Process; the sequence below is a routing projection, not a second applicability Process:

```text
current situation
→ fundamental Resolve Current Methodology Use Cases
→ logically scan this map for plausible Use-Case scopes
→ scan the relevant scoped Use-Case Registry/Registries
→ retain/add/drop applicable Use Cases
→ hand current composition to their canonical Use-Case owners
```

That fundamental Use Case is **always logically active for current Planning/repository work**. Explicit Planning Commands guarantee it through command composition; ordinary natural-language work reaches it through normal routing. "Always" means the applicability surface is reaffirmed, not that unchanged files are reread after every message. Reuse current registry metadata while trustworthy and reread only when the methodology/repository changed, the active profile/scope changed, a material new request/action changes applicability, or current authority cannot be reconstructed safely.

This map owns only cross-scope applicability/routing metadata; it does not own the scan Process. Downstream Process/component routing is owned by the selected Use Case and the supporting owners it explicitly reaches. The generic [`Functional Routing Ownership Chain`](principles-and-terminology.md#doc-functional-routing-ownership) and [`Registry Scan`](principles-and-terminology.md#doc-registry-scan) semantics are defined in `Principles & Terminology`.

A methodology component registry such as a Target Module Registry or Lens Registry is therefore consulted from a selected Use Case Process, not as a competing root workflow.

## Session Boundary

The thin [`planning/session/`](../session/README.md) interaction contract is ambient at session bootstrap/context restoration and therefore is **not** another row in this functional methodology-routing map. Commands and Use Cases inherit its USER↔AI interaction rules but route directly to their current semantic owners.

## Registry Map

| Scope | Applicability | What its Use Cases govern | Registry |
|---|---|---|---|
| Generic Documentation | whenever repository methodology/documentation must be found, interpreted, reviewed or changed | how to work with methodology/documentation owners and how to maintain documentation capabilities | [`use-case-registry.md`](use-case-registry.md) |
| IDTSPE Core | always in the active IDTSPE work environment; especially before a material methodology action or after context/revalidation change | proportional composition of IDTSPE work, state, integration, revalidation, and maintenance of IDTSPE component types | [`idtspe-methodology/active/idtspe-core/use-cases/USE-CASE-REGISTRY.md`](idtspe-methodology/active/idtspe-core/use-cases/USE-CASE-REGISTRY.md) |
| Active profile | only if the profile defines a distinct methodology-usage capability not already covered by generic Documentation or IDTSPE Core | profile-specific **use of methodology documentation**, not profile planning semantics themselves | profile-owned registry when one exists |

## Installed Profile Baseline

The current installed profiles — SDS, 2D Visual Production and Reference Knowledge — define **no separate runtime methodology-use Use Cases**. Their specialized planning/research work is owned by profile Target Modules, Lenses and related profile contracts. Generic Documentation + IDTSPE Use Cases discover and compose those components through the installed-profile and active-profile registries.

Create a profile-specific Use Case later only if a recurring situation requires an independently useful way of **using that profile's methodology documentation** that cannot be expressed by the existing generic/IDTSPE Use Cases.

## Applicability Recheck Route

Re-evaluation timing/triggers belong to [`UC-DOC-RESOLVE-CURRENT-USE-CASES`](use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md). Whenever that owner requires an applicability refresh, this map supplies current cross-scope routing metadata; it does not maintain a second trigger list.
