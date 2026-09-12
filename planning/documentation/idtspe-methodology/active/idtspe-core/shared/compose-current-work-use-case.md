# UC-IDTSPE-COMPOSE-CURRENT-WORK — Compose Current IDTSPE Work

Status: active primary IDTSPE runtime Use Case

## Situation

IDTSPE work is active — which is the default in this methodology environment — and the current situation requires deciding **how much IDTSPE structure is useful now**.

This Use Case is re-evaluated at entry and whenever the next material methodology action or changed context may require a different composition.

## Result

The current work has the **smallest useful IDTSPE composition** for the situation, with relevant methodology components selected or explicitly left unnecessary for now, and with useful recheck/next-action conditions clear.

A valid Result may be only:

```text
continue Broad Discussion;
no Target / Lens / Target Module / Checkpoint / persisted State is useful yet.
```

## Process

1. Start from the actual USER request/current Work Concern and the current integrated state if one exists. Reuse known facts, accepted Decisions and existing owner results.
2. Apply the [`Contextual Methodology Application Contract`](contextual-methodology-application-contract.md). Do not treat IDTSPE always-on status as a reason to instantiate every mechanism.
3. Prefer Broad Discussion while it remains the clearest and least costly working surface. Use Key Points proportionally for material logical structure.
4. Decide whether any current meaning now deserves explicit Core State lifecycle/addressability (`Question`, `Proposal`, Q/R/P, `Decision`, `Evidence`, `Revalidation Signal`, `Methodology Usage State`, etc.). If so, use [`UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE`](maintain-current-work-state-use-case.md) proportionally.
5. Decide whether a bounded Target/result boundary is independently useful. Use [`dynamic-target-formation-and-discovery-checks.md`](dynamic-target-formation-and-discovery-checks.md); `no new Target` is a normal outcome.
6. If a Target exists/may be useful, determine whether a reusable Target Module can reduce repeated production logic. Traverse the appropriate Target Module Registry using its registry scan guide; otherwise use a Local Target Contract.
7. When current material may benefit from a reusable evaluation perspective, traverse the Core/profile Lens Registry and open only plausibly applicable Lens bodies. A registry scan may yield no Lens.
8. When reusable theory/guidance may materially improve a selected component, use the [`Methodology Registry Directory`](methodology-registry-directory.md) and active-profile directory to locate the relevant registry. Load only matched detail entries/Knowledge Basis.
9. If a profile is relevant, use its registry directory/components. Do **not** invent a profile-specific Use Case merely because a profile Target/Lens is being used.
10. If current meaning has become distributed or a coherent whole-state view is materially useful, invoke [`UC-IDTSPE-INTEGRATE-CURRENT-WORK`](integrate-current-work-use-case.md). A Checkpoint is situational, not periodic ceremony.
11. If a Finding/Evidence/accepted upstream change/USER redirect may have made existing meaning stale, invoke [`UC-IDTSPE-REVALIDATE-CURRENT-WORK`](revalidate-current-work-use-case.md) for the affected scope.
12. Before Exact/materialization, perform the applicable boundary/readiness/component scans required by the selected Target/Use Case rather than relying on the mere fact that discussion has continued for a while.
13. Continue automatically through ordinary methodology work while inside USER-authorized scope and no real interaction gate exists. Session Runtime owns work-step visibility/steering, not planning semantics.
14. Re-evaluate this Use Case after a material state/profile/owner/decision/finding change. Reuse current registry metadata where trustworthy.

## Methodology Composition — What This Use Case May Select

```text
Broad Discussion / Key Points
Core State Units
Target Formation
Target Module / Local Target Contract
Lens Registry / selected Lenses
Knowledge/Principle registries
active profile registries/components
Integration Checkpoint
persistence/representation work
Revalidation
another methodology Use Case
```

This is a composition list, not a mandatory sequence.

## Boundaries

This Use Case does **not** define:

- how a Slice/Domain/Feature/Screen is planned;
- how a specific Lens analyzes its surface;
- a Target Module's Result Units/questions/production method;
- what a Programming Principle says;
- product/application semantic ownership;
- code implementation semantics.

Those belong to the selected component/profile owners.

## High-Level Examples

### Broad Discussion only

```text
Concern is still conceptual and no material candidate needs lifecycle.
→ continue Broad Discussion
→ no Target yet
→ recheck when a bounded result or material decision surface appears
```

### Target + no Lens

```text
A bounded documentation change is clear.
→ form/reuse Target
→ choose matching Target Module/Local Contract
→ Lens Registry scan finds no additional perspective material now
→ proceed without manufacturing Lens activity
```

### Target + two precise knowledge entries

```text
Slice realization raises resource cleanup + timeout/cancellation risk
→ SDS directory says Programming Principles Registry is relevant
→ registry scan selects two RG-PRG entries
→ read only those guidance sections
→ relevant natural Lens/Target production applies them
```
