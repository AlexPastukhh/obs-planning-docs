# Methodology Use-Case Registry Map

Status: active functional-entry map

Purpose: provide the **first lightweight methodology-navigation check** for repository work. It maps Use-Case scopes; it does not duplicate the Use Cases themselves.

Prerequisite: the primary bootstrap from [`planning/README.md`](../README.md) establishes Session + Documentation + IDTSPE Core. This map is the functional methodology entry **after** that bootstrap; bootstrap itself is not another Use Case.

## Runtime Rule

```text
current situation
→ logically scan this map for plausible Use-Case scopes
→ scan the relevant scoped Use-Case Registry/Registries
→ select zero or more applicable Use Cases
→ hand off to their canonical Use-Case owners
```

This check is **always logically active** during methodology-guided work. "Always" does not mean rereading unchanged files after every message. Reuse current registry metadata while trustworthy and reread only when the methodology/repository changed, the active profile/scope changed, or current authority cannot be reconstructed safely.

This map owns only cross-scope applicability/routing metadata. Downstream Process/component routing is owned by the selected Use Case and the supporting owners it explicitly reaches. The generic ownership/handoff chain and `scan ≠ select ≠ execute` semantics are defined in [`principles-and-terminology.md`](principles-and-terminology.md).

A methodology component registry such as a Target Module Registry or Lens Registry is therefore consulted from a selected Use Case Process, not as a competing root workflow.

## Session Boundary

The thin [`planning/session/`](../session/README.md) interaction contract is ambient at session bootstrap/context restoration and therefore is **not** another row in this functional methodology-routing map. Commands and Use Cases inherit its USER↔AI interaction rules but route directly to their current semantic owners.

## Registry Map

| Scope | Applicability | What its Use Cases govern | Registry |
|---|---|---|---|
| Generic Documentation | whenever repository methodology/documentation must be found, interpreted, reviewed or changed | how to work with methodology/documentation owners and how to maintain documentation capabilities | [`use-case-registry.md`](use-case-registry.md) |
| IDTSPE Core | always in the active IDTSPE work environment; especially before a material methodology action or after context/revalidation change | proportional composition of IDTSPE work, state, integration, revalidation, and maintenance of IDTSPE component types | [`idtspe-methodology/active/idtspe-core/shared/idtspe-methodology-use-case-registry.md`](idtspe-methodology/active/idtspe-core/shared/idtspe-methodology-use-case-registry.md) |
| Active profile | only if the profile defines a distinct methodology-usage capability not already covered by generic Documentation or IDTSPE Core | profile-specific **use of methodology documentation**, not profile planning semantics themselves | profile-owned registry when one exists |

## SDS Baseline

The current SDS profile defines **no separate runtime Use Cases**. Its Feature / Scenario / Screen / Domain / Slice / Shared / Evolution / Prototype / Practical Test work is owned by SDS Target Modules, Lenses and related profile contracts. Generic Documentation + IDTSPE Use Cases discover and compose those components through the active-profile registries.

Create an SDS-specific Use Case later only if a recurring situation requires an independently useful way of **using SDS methodology documentation** that cannot be expressed by the existing generic/IDTSPE Use Cases.

## Re-evaluation Triggers

Re-evaluate Use-Case applicability when material context changes, including:

- a new task or clean/reloaded context;
- the current work concern changes materially;
- the active profile changes;
- a Finding/Evidence/Decision changes what methodology may be relevant;
- a checkpoint/integration pass reveals distributed or stale meaning;
- the work is about to enter a materially different depth or realization mode;
- the USER redirects, narrows, broadens, pauses or changes the intended result;
- methodology/repository owners themselves changed.

A mechanical substep does not require ceremonial rereading.
