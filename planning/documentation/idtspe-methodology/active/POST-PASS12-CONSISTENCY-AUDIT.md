# Post-Pass12 Assembled-Methodology Consistency Audit

Status: **CURRENT CONSISTENCY EVIDENCE — PASS after parity corrections**  
Scope: assembled Documentation + Session interaction boundary + IDTSPE Core + SDS profile + active supporting Application/Testing entry surfaces + Planning Helper invocation projections after Master Pass 12.

This file is **evidence, not semantic authority**. When a statement here conflicts with a current Use Case, registry, Target Module, Lens or shared contract, the semantic owner wins.

## Why This Audit Exists

The S6 and Pass12 closures correctly established the UC-first / always-active IDTSPE architecture, but a later independent consistency review found stale **projection/example/supporting-document** semantics that were not covered by the earlier routing-focused checks. The selected architecture did not change; the stale projections were corrected to match it.

Corrected drift included:

- historical top-level audits that still displayed older Target/Lens counts and old Slice Strategy / Scenario-behavior ownership as if current;
- Core examples/checks with frozen old SDS cardinalities or an outdated Slice Result-Unit example;
- SDS worked examples/representation examples still routing through retired Test Design/Test Strategy/Slice Strategy semantics;
- supporting Testing knowledge naming retired Test Targets as current consumers;
- primary/compatibility commands whose IDs routed correctly but whose descriptive semantics still reflected old Scenario/Domain/Slice ownership;
- current supporting Application Planning entry routes that still presented Slice Strategy as a positive stage rather than optional derived coordination.

Prior top-level `*AUDIT.md` files in this directory are therefore explicitly historical checkpoints. They remain useful provenance but are not current routing/count/schema authority.

## Current Functional Root

The functional methodology-navigation root is [`../../use-case-registry-map.md`](../../use-case-registry-map.md).

The thin Session contract is ambient bootstrap/interaction governance, not a competing functional root: once established it is inherited by commands and methodology work, which continue to route directly to their current semantic owners.

```text
current situation
→ Methodology Use-Case Registry Map
→ relevant scoped Use-Case Registry
→ applicable Use Case(s)
→ Process
→ only the methodology registries/components that Process needs
→ component-local applicability/materiality gate
→ specialized work
```

Current methodology-use UC inventory:

- Documentation: **10** Use Cases;
- IDTSPE Core: **6** Use Cases;
- SDS baseline runtime Use Cases: **0** — SDS specialized work is owned by Target Modules/Lenses/profile contracts.

## Current IDTSPE Runtime Invariant

Canonical owners:

- [`idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md`](idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md)
- [`idtspe-core/shared/contextual-methodology-application-contract.md`](idtspe-core/shared/contextual-methodology-application-contract.md)
- [`idtspe-core/shared/idtspe-methodology-use-case-registry.md`](idtspe-core/shared/idtspe-methodology-use-case-registry.md)

```text
IDTSPE is always active.

IDTSPE active
≠ Target required
≠ State Unit required
≠ Target Module required
≠ Lens required
≠ Integration Checkpoint required
≠ persistence required.

Use Cases determine the smallest useful current composition.
```

Broad Discussion is a complete valid low-ceremony projection. Structure is introduced only when it has independent value.

## Current Core Inventory

Registry-driven inventory at this audit point:

- generic Core Target Modules: **2** — Pre-Update Plan and Exact Realization;
- generic Core reusable Lenses: **11**;
- State/Result Unit semantics are sparse and materiality-driven;
- optional `Methodology Usage State` may retain material UC/registry/component/recheck context, but is not an execution/file-read log;
- Integration Checkpoint is situational, not timer/message-count driven.

Cardinality is derived from current registries/files; generic contracts do not hard-code profile counts as methodology truth.

## Current SDS Inventory And Ownership

Canonical profile owners:

- [`profiles/sds/target-modules/README.md`](profiles/sds/target-modules/README.md)
- [`profiles/sds/lenses/README.md`](profiles/sds/lenses/README.md)
- [`profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md`](profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md)
- [`profiles/sds/shared/requirement-ownership-and-exception-rule.md`](profiles/sds/shared/requirement-ownership-and-exception-rule.md)
- [`profiles/sds/ARTIFACT-PLACEMENT-MAP.md`](profiles/sds/ARTIFACT-PLACEMENT-MAP.md)

Current registry-driven inventory:

- **13 active SDS Target Modules**;
- **7 SDS-specific Lenses**;
- **5 retired/subsumed Target-family IDs** retained only as explicit compatibility routes: Requirement, Slice Strategy, Cross-Cutting Concern, Test Design, Test Strategy.

Key ownership:

```text
Feature
= primary behavior / semantic Feature Data / BR-*

Scenario
= actor-to-Benefit journey composition / continuity / terminal Benefit

Screen
= spatial/navigation composition / Feature presence / routes

Domain Discovery
= transient bounded semantic discovery
Domain Owner
= optional durable Domain semantic owner + Domain IR

Implementation Slice
= transient one-Slice discovery / RU-SLICE-01..05
Slice Owner
= optional durable end-to-end implementation owner + Slice IR

Shared Implementation Capability
= durable reusable non-end-to-end implementation responsibility only under real shared-consumer pressure
```

Requirements stay with one natural owner. Proof design is normally transient and evaluated with Core Test-Proof guidance; literal tests belong to Exact realization, and real-subject/environment evidence may use Practical Test.

## Programming Principles

The old monolithic Programming Principles Lens is absent.

Current form:

```text
Programming Principles Registry
→ 22 compact RG-PRG-* trigger rows
→ open only matched detail entries
→ natural Target/Lens evaluator applies them
→ registry/knowledge itself does not emit Findings
```

`NO_MATERIAL_PRINCIPLE_ENTRY` is valid.

## Invocation / Helper Parity

Planning Helper projections are derived from current owners rather than arbitrary filesystem naming. Methodology Use Cases come from the Registry Map. Retired command phrases may survive only as hidden compatibility aliases that route to current owners and cannot revive retired Target families.

The post-correction automated suite includes semantic-parity checks for Scenario, Domain, Slice, Screen, Result-Unit examples and registry-driven inventory. The full Helper verification passes on the corrected target.

## Supporting Application / Testing Boundary

`planning/documentation/application-planning/` and `testing-planning/` may preserve useful project-local/supporting heuristics, templates and compatibility UCs. They are **not parallel SDS semantic authorities**.

In particular:

- Slice Strategy may appear only as an optional derived coordination view; it is not a Target family or prerequisite;
- project-local Testing Strategy/Test Design coordination may exist as supporting practice, but not as baseline SDS Target families;
- current Feature/Scenario/Screen/Domain/Slice/Shared semantics always resolve to the active SDS owners.

## Current Audit Result

After the parity corrections above, the assembled methodology is internally consistent on the audited surfaces:

- Use-Case root/form/reachability;
- always-active proportional IDTSPE;
- State/Result Unit applicability/materiality;
- current Core/SDS Target Module and Lens registry parity;
- retired-owner compatibility boundary;
- Programming Principles 22-group architecture;
- active positive stale-owner/schema scan;
- supporting Application/Testing entry parity;
- command/helper semantic parity, including ambient Session inheritance without mandatory Session routing;
- local Markdown file/anchor reachability;
- unchanged 18-file R2 source corpus for the independent reverse audit.

This audit **does not replace Master Pass 13**. Pass 13 must still reread all 18 R2 source files and independently prove every semantic-unit mapping from source to final owner; prior coverage ledgers are not sufficient evidence by themselves.
