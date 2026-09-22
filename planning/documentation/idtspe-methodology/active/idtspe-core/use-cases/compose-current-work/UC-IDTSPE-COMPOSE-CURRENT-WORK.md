# UC-IDTSPE-COMPOSE-CURRENT-WORK — Compose Current IDTSPE Work

Status: active primary IDTSPE runtime Use Case

## Situation

IDTSPE work is active — which is the default in this methodology environment — and the current situation requires deciding **how much IDTSPE structure is useful now**.

This Use Case is re-evaluated under the canonical [`Methodology Composition Recheck Rule`](../../runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md#idtspe-methodology-composition-recheck).

> Semantic Owner Dependency
> Type: CONTEXTUALIZES
> Responsibility: `IDTSPE.METHODOLOGY-COMPOSITION-RECHECK`
> Owner: [`Methodology Composition Recheck Rule`](../../runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md#idtspe-methodology-composition-recheck)

## Result

The current work has the **smallest useful IDTSPE composition** for the situation, with relevant methodology components selected or explicitly left unnecessary for now, useful recheck/next-action conditions clear, and the current port-requirement composition refreshed/reaffirmed for the next normal Shell pass.

A valid Result may be only:

```text
continue Broad Discussion;
no Target / Lens / Target Module / Checkpoint / persisted State is useful yet.
```

## Process

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Target Formation requirement/coverage`](../../runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md#target-formation-requirement-coverage) — `TARGET-FORMATION.REQUIREMENT-COVERAGE`
> - `CONTEXTUALIZES` [`Required Reusable Target Model Check`](../../runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md#target-formation-reusable-model-check) — `TARGET-FORMATION.REUSABLE-MODEL-CHECK`
> - `CONTEXTUALIZES` [`Target Module Meta-Model`](../../target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) — `TARGET-MODULE.META-MODEL`
> - `CONTEXTUALIZES` [`Target Work Unit contract`](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-unit-contract) — `TWU.UNIT-CONTRACT`
> - `CONTEXTUALIZES` [`Collection contract`](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-collection-contract) — `TWU.COLLECTION-CONTRACT`
> - `CONTEXTUALIZES` [`Unit Resolution Slot contract`](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-slot-contract) — `TWU.SLOT-CONTRACT`
> - `CONTEXTUALIZES` [`Unit runtime projection`](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-runtime-projection) — `TWU.RUNTIME-PROJECTION`
> - `CONTEXTUALIZES` [`Unit applicability / materiality / disposition`](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition) — `TWU.APPLICABILITY-DISPOSITION`
> - `CONTEXTUALIZES` [`Need Candidate Disposition`](../../resolution/needs/NEED-CANDIDATE-DISPOSITION.md#resolution-need-candidate-disposition) — `RESOLUTION.NEED-CANDIDATE-DISPOSITION`
> - `CONTEXTUALIZES` [`Resolution Carry-Forward`](../../resolution/continuation/RESOLUTION-CARRY-FORWARD-PROJECTION.md#resolution-carry-forward) — `RESOLUTION.CARRY-FORWARD`

This Use Case owns current-work **orchestration/composition** only; the linked owners define Target Formation, reusable-module and Unit contracts.

1. Start from the actual USER request/current Work Concern and the current integrated state if one exists. Reuse known facts, accepted Decisions and existing owner results; when an applicable [`Resolution Carry-Forward`](../../resolution/continuation/RESOLUTION-CARRY-FORWARD-PROJECTION.md#resolution-carry-forward) exists, scan its compact surviving-state references for orientation and open only the canonical items that are material now.
2. Apply the [`Contextual Methodology Application Contract`](../../runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md). Do not treat IDTSPE always-on status as a reason to instantiate every mechanism. Preserve explicit USER/component intent that requires a particular Shell port to be checked; explicit requirement affects port admission, not the truth of that port's result.
3. Prefer Broad Discussion while it remains the clearest and least costly working surface. Use Key Points proportionally for material logical structure.
4. When USER input expresses a wanted outcome whose semantic home/solution/temporal destination is not yet sufficiently resolved, treat it as a lightweight `Need Candidate` and use [`planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-CANDIDATE-DISPOSITION.md`](../../resolution/needs/NEED-CANDIDATE-DISPOSITION.md) proportionally. Preserve exact USER/source Evidence, normalize the desired outcome without inventing a solution, and route the result into existing current-owner / Finding / Proposal / Q-R-P / Target/profile semantics. A Need Candidate alone does not justify a Feature, Requirement or Evolution Step.
5. Decide whether any current meaning now deserves explicit Core State lifecycle/addressability (`Question`, `Proposal`, Q/R/P, `Decision`, `Evidence`, `Revalidation Signal`, `Methodology Usage State`, etc.). If so, use [`UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE`](../maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md) proportionally.
6. Decide whether a bounded Target/result boundary is independently useful. Derive enough provisional purpose/scope/problem surface to test reusable structure; activate applicable universal Core Target Requirements and preserve any explicit/already-obvious task Requirements. Use [`DYNAMIC-TARGET-FORMATION`](../../runtime/target-work/projections/DYNAMIC-TARGET-FORMATION.explanatory-projection.md); `no new Target` is a normal outcome.
7. As soon as that provisional Target shape is sufficient, run the required `REUSABLE_TARGET_MODEL_CHECK`: traverse the appropriate Target Module Registry and apply a useful Target Module Model when it provides prepared reusable analysis/coverage; otherwise use a Local Target Contract. When a Module applies, use its prepared recurring-scope analysis to recognize/formulate the actual Requirements grounded in the current task/scope/Sources and map them to prepared Module Unit Definitions. When no Module applies, derive/clarify those Requirements contextually. A selected Module may cover only part of the current Target.
8. For uncovered material Requirements, prefer direct resolution or applicable prepared Core/Module Units. If no prepared Unit sufficiently covers a bounded responsibility, contextually refine/split scope as needed, clarify/derive the Requirement, `DEFINE` a Contextual Unit, then `EXECUTE` it. When material may benefit from evaluation, traverse the Lens Registry; a registry scan may yield no Lens.
9. When reusable theory/guidance may materially improve a selected component, use the [`Methodology Registry Directory`](../../navigation/METHODOLOGY-REGISTRY-DIRECTORY.md) and active-profile directory to locate the relevant registry. Load only matched detail entries/Knowledge Basis.
10. If a profile is relevant, use its registry directory/components. Do **not** invent a profile-specific Use Case merely because a profile Target/Lens is being used.
11. If current meaning has become distributed or a coherent whole-state view is materially useful, invoke [`UC-IDTSPE-INTEGRATE-CURRENT-WORK`](../integrate-current-work/UC-IDTSPE-INTEGRATE-CURRENT-WORK.md). A Checkpoint is situational, not periodic ceremony.
12. If a Finding/Evidence/accepted upstream change/USER redirect may have made existing meaning stale, invoke [`UC-IDTSPE-REVALIDATE-CURRENT-WORK`](../revalidate-current-work/UC-IDTSPE-REVALIDATE-CURRENT-WORK.md) for the affected scope.
13. Before Exact/materialization, perform the applicable boundary/readiness/component scans required by the selected Target/Use Case rather than relying on the mere fact that discussion has continued for a while.

> Semantic Owner Dependency
> Type: CONTEXTUALIZES
> Responsibility: `IDTSPE.PORT-COMPOSITION-REFRESH`
> Owner: [`Port Composition Refresh Rule`](../../runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md#idtspe-port-composition-refresh)

14. **Before every normal Shell pass**, refresh or reaffirm the current Port Requirement Set from the selected Use-Case composition, explicit USER/component port requirements, current downstream materiality and still-material defer/recheck obligations. Reuse an unchanged prior determination when its basis remains trustworthy. Previous-pass admission alone does not make a port sticky/automatically active in the next pass. Automatic refresh does not impose a focused subset; explicit USER intent is required to intentionally focus/narrow the port composition. Technical admission/reuse semantics are owned by the Shell runtime contract.
15. Hand the current selected composition + refreshed/reaffirmed Port Requirement Set to the IDTSPE Shell. `P-01 Invocation` routes that composition and `P-02 Pass Trace / Visibility` establishes the observable pass trace before substantive non-baseline port work. Session Runtime still owns Work Steps/Progress Updates; P-02 owns methodology-route observability.
16. Continue automatically through ordinary methodology work while inside USER-authorized scope and no real interaction gate exists. A port that becomes newly material during a pass may be admitted through normal downstream-materiality routing without restarting the full methodology route.
17. Re-evaluate this Use Case when the canonical [`Methodology Composition Recheck Rule`](../../runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md#idtspe-methodology-composition-recheck) is triggered. Reuse current registry metadata and already-resolved shared runtime prefixes where trustworthy.

## Methodology Composition — What This Use Case May Select

```text
Broad Discussion / Key Points
explicit Shell port requirements when supplied
P-02 Pass Trace / Visibility (included by the Shell, not an optional semantic component)
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

This is a composition list, not a mandatory sequence. Composition decides what work is useful; `P-01` only routes the selected composition into the Shell. A port that becomes newly material during execution may be reached dynamically without being predicted as a complete route up front.

## Target Work Unit Composition Rule

Requirements are grounded in the current task/scope/Sources plus universal Core Target needs. Prepared methodology provides coverage, not a third requirement source.

```text
material Requirement
→ directly covered by Target state/Source/Decision?
   yes → no Unit required
→ suitable Module-defined Unit from selected Target Module?
   yes → use its already-instantiated Unit responsibility
→ applicable Core-defined Unit?
   yes → instantiate it
→ bounded work still needed?
   yes → DEFINE Contextual Unit → EXECUTE it
→ otherwise refine/split scope or keep Requirement explicitly OPEN/BLOCKED/DEFERRED
```


When using or defining a Unit, apply the canonical `TWU.UNIT-CONTRACT` and its Collection/Slot/runtime-projection responsibilities rather than restating their schema here. This Use Case decides **which prepared/Core/contextual responsibilities are useful now**; the Unit owner decides how each selected Unit is structurally represented and resolved.

When a Target Module Model is selected, apply the complete Module-defined Unit inventory required by `TARGET-MODULE.META-MODEL`; runtime materiality/disposition remains Core Unit-owned. Core-defined Units are instantiated only when applicable, and Contextual Units exist only when locally defined/formed through canonical Target Formation.

Do not form Target Work Units merely to wrap every Source/Question/QRP/Proposal/Decision/Evidence item. When a Target already exists, `CORE-U-UNROUTED-CONCERNS` is the prepared Core Unit for multiple material concerns inside that Target whose natural owner/destination is unclear; it is not a general miscellaneous backlog. With zero Targets, retain such concern meaning in Work Context / natural Core State and let it feed GIP/Target Formation instead of instantiating a Target Work Unit.

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
