# IDTSPE Core

Status: active canonical generic methodology package
Scope: always-active proportional planning/resolution work model independent of installed-profile-specific semantics.

## Boundary

```text
Documentation methodology
= Use Case / Process / Principles & Terminology / Registry / Template / Example semantics
  and functional rules for using methodology/documentation

Session (`planning/session/`)
= thin generic USER↔AI interaction runtime
  work-step visibility / automatic progression / steering / proposal-first mutation boundary

IDTSPE Core
= always-active proportional planning/resolution work context
  Broad Discussion / Core State / Targets / Target Modules / Lenses /
  Proposal-Q/R/P-Decision-Evidence-Finding / Integration / Revalidation / Representation
  + included Shell Pass Trace / Visibility runtime observability

Installed Profiles
= specialized Target Modules, Lenses, registries, knowledge and planning semantics layered on Core
```

IDTSPE is not an opt-in mode. The canonical proportionality owner is [`runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md`](runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md); Broad Discussion with no Target/State/Lens/Checkpoint is a valid projection when deeper structure has no current value.

## Bootstrap

This `README.md` is the canonical Core bootstrap entry. If the generic planning bootstrap is not already reliable, first bootstrap from [`planning/README.md`](../../../../README.md), then return here.

### Bootstrap Spine — Required From Cold / Unreliable Core Context

Core bootstrap establishes enough **routing, proportionality and ownership orientation** to choose the next correct owner. It does not preload every Core mechanic.

Read in order:

1. this `README.md`;
2. [`navigation/IDTSPE-CORE-MAP.md`](navigation/IDTSPE-CORE-MAP.md) — compact conceptual/dependency map, not a competing semantic owner;
3. [`runtime/RESPONSIBILITY-MAP.md`](runtime/RESPONSIBILITY-MAP.md) — Runtime/Work Context/Core State responsibility routing;
4. [`use-cases/RESPONSIBILITY-MAP.md`](use-cases/RESPONSIBILITY-MAP.md) — IDTSPE Use-Case orchestration responsibility routing;
5. [`runtime/IDTSPE-DEFAULT-WORK-MODE.md`](runtime/IDTSPE-DEFAULT-WORK-MODE.md);
6. [`use-cases/USE-CASE-REGISTRY.md`](use-cases/USE-CASE-REGISTRY.md);
7. [`use-cases/ai-working-boundary/UC-IDTSPE-AI-WORKING-BOUNDARY.md`](use-cases/ai-working-boundary/UC-IDTSPE-AI-WORKING-BOUNDARY.md) — fundamental authority-boundary application;
8. [`use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md`](use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md);
9. [`runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md`](runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md);
10. [`runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md`](runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md);
11. [`navigation/METHODOLOGY-REGISTRY-DIRECTORY.md`](navigation/METHODOLOGY-REGISTRY-DIRECTORY.md).

After this spine is current, Core bootstrap is sufficient for ordinary routing/composition. Reuse it while trustworthy. Do not read deeper Core owners merely to claim that bootstrap completed.

### Conditional Deep Reads — Required Only When The Current Composition Needs Them

Open the narrowest canonical owner when its mechanism becomes material:

- Target Work / Target Formation / Target Instance / subject-reference meaning → [`runtime/target-work/RESPONSIBILITY-MAP.md`](runtime/target-work/RESPONSIBILITY-MAP.md), then the routed canonical owner;
- reusable Target Module / Target Module discovery → [`target-modules/RESPONSIBILITY-MAP.md`](target-modules/RESPONSIBILITY-MAP.md), then the Meta-Model/Registry/concrete Model owner;
- Lens Meta-Model / discovery / concrete Lens operational semantics → [`lenses/RESPONSIBILITY-MAP.md`](lenses/RESPONSIBILITY-MAP.md), then only the routed owner/selected Lens body;
- Need / Finding / Q/R/P / Proposal / Decision / Planning Branch / accepted-Decision revalidation / continuation-resolution meaning → [`resolution/RESPONSIBILITY-MAP.md`](resolution/RESPONSIBILITY-MAP.md), then the routed lifecycle/projection owner;
- Work Context / Core State / runtime composition / trace / contextual application / USER-intake responsibility → [`runtime/RESPONSIBILITY-MAP.md`](runtime/RESPONSIBILITY-MAP.md), then the routed owner;
- IDTSPE runtime and methodology-maintenance Use-Case orchestration → [`use-cases/RESPONSIBILITY-MAP.md`](use-cases/RESPONSIBILITY-MAP.md), then the routed Use Case;
- Knowledge Basis / reusable theory / Source-Evidence authority boundary → [`knowledge-bases/RESPONSIBILITY-MAP.md`](knowledge-bases/RESPONSIBILITY-MAP.md);
- representation/persistence/materialization/checkpoint/file-realization routing → [`representation/RESPONSIBILITY-MAP.md`](representation/RESPONSIBILITY-MAP.md);
- direct IDTSPE command-surface semantics / owner-derived command→port composition → [`commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md`](commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md#idtspe-command-surface); repository command/Helper routing remains outside Core at [`../../../../commands/RESPONSIBILITY-MAP.md`](../../../../commands/RESPONSIBILITY-MAP.md);
- integration/revalidation → the selected Integration/Revalidation Use-Case owner from the Core Use-Case Registry.

Other Core contracts, examples, specific Target Modules/Lenses, theory and profiles remain lazy/conditional reads reached from Use Cases, registries and current applicability. Primary bootstrap stops before profile bootstrap.

## Functional Entry

Methodology work starts from Use Cases. Canonical cross-scope routing semantics belong to Documentation [`principles-and-terminology.md`](../../../../documentation/principles-and-terminology.md) and the [`Methodology Use-Case Registry Map`](../../../../documentation/use-case-registry-map.md).

For IDTSPE work:

```text
current situation
→ fundamental UC-IDTSPE-AI-WORKING-BOUNDARY
→ Registry Map / scoped Use-Case scan
→ applicable specialized IDTSPE Use Case(s)
→ selected Use-Case Process
→ supporting registry/component only when that Process needs one
→ component-local applicability/materiality
```

The fundamental always-active authority-boundary capability is [`UC-IDTSPE-AI-WORKING-BOUNDARY`](use-cases/ai-working-boundary/UC-IDTSPE-AI-WORKING-BOUNDARY.md). The default continuously relevant work-composition capability remains [`UC-IDTSPE-COMPOSE-CURRENT-WORK`](use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md). Its valid result may be no additional structure beyond Broad Discussion.

## Canonical Core Owners

Use [`navigation/IDTSPE-CORE-MAP.md`](navigation/IDTSPE-CORE-MAP.md) for a compact topology view; use these files for normative meaning:

- [`runtime/target-work/RESPONSIBILITY-MAP.md`](runtime/target-work/RESPONSIBILITY-MAP.md) — Target Work / Formation / Target Instance responsibility routing.
- [`runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-unit-contract) — Target Work Unit / Collection / Slot / Target Step Result semantics.
- [`runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md`](runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md#target-work-subject-reference) — canonical Target Work subject reference grammar.
- [`representation/RESPONSIBILITY-MAP.md`](representation/RESPONSIBILITY-MAP.md) — representation/persistence/checkpoint/file-realization responsibility routing.
- [`resolution/RESPONSIBILITY-MAP.md`](resolution/RESPONSIBILITY-MAP.md) — Need / Finding / Q/R/P / Proposal / Decision / Planning Branch / Decision-revalidation / Carry-Forward responsibility routing.
- [`target-modules/RESPONSIBILITY-MAP.md`](target-modules/RESPONSIBILITY-MAP.md) — Target Module Meta-Model/discovery/supporting-projection routing.
- [`target-modules/TARGET-MODULE-MODEL.md`](target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) — Target Module Meta-Model; concrete `TM-*` owners are Target Module Models and form Target Module Instances inside concrete Targets when applied.
- [`lenses/RESPONSIBILITY-MAP.md`](lenses/RESPONSIBILITY-MAP.md) — Lens Meta-Model/discovery/concrete-Lens responsibility routing.
- [`runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md`](runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md) — included Shell Pass Trace / Visibility and runtime reuse/observability contract.
- [`navigation/METHODOLOGY-REGISTRY-DIRECTORY.md`](navigation/METHODOLOGY-REGISTRY-DIRECTORY.md) — supporting registry-family router used from selected Use-Case Processes.
- [`knowledge-bases/RESPONSIBILITY-MAP.md`](knowledge-bases/RESPONSIBILITY-MAP.md) — Knowledge Basis/theory/Source-Evidence boundary routing.
- [`runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md`](runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md) — Target Formation/resolution mechanics.
- [`runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md`](runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md) — USER input classification, question policy and conditional Decision Gate interaction.

## Profile Rule

Profiles extend Core with specialized Target Modules, Lenses, registry directories, knowledge and planning semantics. They do not replace Core or create a second runtime shell. Profile bootstrap is incremental and occurs only when specialized profile semantics are materially relevant.

The current installed profiles define no separate runtime methodology-use Use Cases; generic Documentation + IDTSPE Use Cases compose their components through the installed-profile [`RESPONSIBILITY-MAP`](../profiles/RESPONSIBILITY-MAP.md), registry and each selected profile's own routing/owners.

## Scenario Map Boundary

[`evaluation/USE-CASE-SCENARIO-MAP.md`](evaluation/USE-CASE-SCENARIO-MAP.md) is design/evaluation/orientation material for checking methodology coverage. It is not runtime routing authority and cannot override current Use Cases/components.

## Adjacent Packages

- [`../ai-reviewability/AI-OUTPUT-REVIEWABILITY.md`](../ai-reviewability/AI-OUTPUT-REVIEWABILITY.md) — peer Key Points/review projection concern.
- [`../ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md`](../ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md#review-strategy-coverage) — peer review strategy/coverage owner used by `idtspe.review` and `idtspe.review.recheck`.
- [`knowledge-bases/testing/README.md`](knowledge-bases/testing/README.md) — active Core Testing Knowledge Basis, read lazily when testing/proof theory is materially relevant.


## Target Resolution / Prepared Coverage

Target work derives material Requirements from the current task/scope/Sources plus universal Core Target requirements. Target Module Models provide prepared reusable recognition/coverage and Module-defined Unit Definitions; Core-defined Units provide cross-target prepared coverage; uncovered bounded work is completed by locally defined Contextual Units. Canonical detail: [`runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md`](runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md).
