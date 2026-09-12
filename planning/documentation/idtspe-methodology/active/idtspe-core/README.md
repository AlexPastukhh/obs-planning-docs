# IDTSPE Core

Status: active canonical generic methodology package  
Scope: always-active proportional planning/resolution work model independent of SDS/Application-specific semantics.

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

SDS Profile
= specialized Target Modules, Lenses, registries, knowledge, owner topology and planning semantics
```

IDTSPE is not an opt-in mode. The canonical proportionality owner is [`shared/contextual-methodology-application-contract.md`](shared/contextual-methodology-application-contract.md); Broad Discussion with no Target/State/Lens/Checkpoint is a valid projection when deeper structure has no current value.

## Bootstrap

This `README.md` is the canonical Core bootstrap entry. If the generic planning bootstrap is not already reliable, first bootstrap from [`planning/README.md`](../../../../README.md), then return here.

For the Core portion, read in order:

1. this `README.md`;
2. [`IDTSPE-CORE-MAP.md`](IDTSPE-CORE-MAP.md) — compact conceptual/dependency map, not a competing semantic owner;
3. [`IDTSPE-DEFAULT-WORK-MODE.md`](IDTSPE-DEFAULT-WORK-MODE.md);
4. [`shared/idtspe-methodology-use-case-registry.md`](shared/idtspe-methodology-use-case-registry.md);
5. [`shared/compose-current-work-use-case.md`](shared/compose-current-work-use-case.md);
6. [`shared/contextual-methodology-application-contract.md`](shared/contextual-methodology-application-contract.md);
7. [`shared/methodology-registry-directory.md`](shared/methodology-registry-directory.md);
8. [`IDTSPE-SHELL.md`](IDTSPE-SHELL.md);
9. [`shared/idtspe-unit-and-target-step-result-model.md`](shared/idtspe-unit-and-target-step-result-model.md);
10. [`shared/target-module-model.md`](shared/target-module-model.md);
11. [`lenses/LENS-MODEL.md`](lenses/LENS-MODEL.md) and [`lenses/README.md`](lenses/README.md);
12. [`shared/proposal-and-decision-lifecycle-contract.md`](shared/proposal-and-decision-lifecycle-contract.md);
13. [`shared/finding-disposition-contract.md`](shared/finding-disposition-contract.md);
14. [`shared/artifact-placement-and-idtspe-response-contract.md`](shared/artifact-placement-and-idtspe-response-contract.md);
15. [`shared/idtspe-command-surface-contract.md`](shared/idtspe-command-surface-contract.md).

Other Core contracts, examples, specific Target Modules/Lenses, theory and profiles remain lazy/conditional reads reached from Use Cases, registries and current applicability. Primary bootstrap stops before profile bootstrap.

## Functional Entry

Methodology work starts from Use Cases. Canonical cross-scope routing semantics belong to Documentation [`principles-and-terminology.md`](../../../../documentation/principles-and-terminology.md) and the [`Methodology Use-Case Registry Map`](../../../../documentation/use-case-registry-map.md).

For IDTSPE work:

```text
current situation
→ Registry Map / scoped Use-Case scan
→ applicable IDTSPE Use Case(s)
→ selected Use-Case Process
→ supporting registry/component only when that Process needs one
→ component-local applicability/materiality
```

The default continuously relevant runtime capability is [`UC-IDTSPE-COMPOSE-CURRENT-WORK`](shared/compose-current-work-use-case.md). Its valid result may be no additional structure beyond Broad Discussion.

## Canonical Core Owners

Use [`IDTSPE-CORE-MAP.md`](IDTSPE-CORE-MAP.md) for a compact topology view; use these files for normative meaning:

- [`shared/idtspe-unit-and-target-step-result-model.md`](shared/idtspe-unit-and-target-step-result-model.md) — Core State / Target Step Result / Unit applicability-materiality-omission.
- [`shared/broad-discussion-and-integration-checkpoint-model.md`](shared/broad-discussion-and-integration-checkpoint-model.md) — Broad Discussion and checkpoint interaction/projection semantics.
- [`shared/proposal-and-decision-lifecycle-contract.md`](shared/proposal-and-decision-lifecycle-contract.md) — Proposal candidate space, selection, Decision trace/retention/revalidation.
- [`shared/qrp-priority-and-related-groups.md`](shared/qrp-priority-and-related-groups.md) — optional Q/R/P priority/grouping mechanics.
- [`shared/target-module-model.md`](shared/target-module-model.md) — reusable Target Module contract.
- [`lenses/LENS-MODEL.md`](lenses/LENS-MODEL.md) + [`lenses/README.md`](lenses/README.md) — reusable Lens contract and registry.
- [`shared/finding-disposition-contract.md`](shared/finding-disposition-contract.md) — producer → Finding Candidate → owner/State/lifecycle disposition.
- [`shared/methodology-registry-directory.md`](shared/methodology-registry-directory.md) — supporting registry-family router used from selected Use-Case Processes.
- [`shared/artifact-placement-and-idtspe-response-contract.md`](shared/artifact-placement-and-idtspe-response-contract.md) — physical representation/placement interface and P-14 response contract.
- [`shared/knowledge-basis-contract.md`](shared/knowledge-basis-contract.md) — reusable knowledge/theory boundary.
- [`shared/resolution-slot-and-target-formation-resolution-set.md`](shared/resolution-slot-and-target-formation-resolution-set.md) — Target Formation/resolution mechanics.
- [`../PLANNING-GOVERNANCE.md`](../PLANNING-GOVERNANCE.md) — authority/governance rules.

## Profile Rule

Profiles extend Core with specialized Target Modules, Lenses, registry directories, knowledge and planning semantics. They do not replace Core or create a second runtime shell. Profile bootstrap is incremental and occurs only when specialized profile semantics are materially relevant.

The current SDS profile defines no separate runtime methodology-use Use Cases; generic Documentation + IDTSPE Use Cases compose its components through the profile registries.

## Scenario Map Boundary

[`shared/methodology-use-case-scenario-map.md`](shared/methodology-use-case-scenario-map.md) is design/evaluation/orientation material for checking methodology coverage. It is not runtime routing authority and cannot override current Use Cases/components.

## Adjacent Packages

- [`../ai-reviewability/README.md`](../ai-reviewability/README.md) — peer Key Points/review projection concern.
- [`../theoretical-modules/README.md`](../theoretical-modules/README.md) — independent reusable theory registry; raw bodies are loaded lazily.
