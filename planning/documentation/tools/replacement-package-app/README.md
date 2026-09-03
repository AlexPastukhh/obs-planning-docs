# Replacement Package Workflow Planning

Status: active current + planned connected documentation
Runtime modules: Replacement Package Builder + Replacement Package App
Canonical planning root: this directory

## Scope

This directory is the single canonical planning root for the connected replacement-package workflow.

```text
Replacement Package Builder
  → create exact repository work
  → build exact package
  → reproduce/review exact package result
  → ChatGPT renders exact reviewed handoff
        ↓
Replacement Package App
  → execute the concrete reviewed handoff route
  → modular Apply / Commit / Push with truthful recovery
  → prove reviewed published result when published
  → optional integration PR + Finalize
  → append Final Work Record + close Issue when fully finalized
```

Builder and App remain distinct behavioral/implementation modules. Their planning owners are colocated so Scenario, Evolution, Domain, Slice, shared implementation and proof relationships can be read without switching between competing documentation roots.

The historical directory `planning/documentation/replacement-package-builder/` is navigation-only and must not contain competing Scenario/Domain/Slice authority.

Repository-wide command/use-case entry points remain in their repository-wide catalogs because those catalogs organize all commands/use cases across the repository; they link into this planning root.

## Documentation route

This directory follows [`documentation-use-cases.md`](documentation-use-cases.md) and [`documentation-templates.md`](documentation-templates.md).

```text
Application Benefit / Desired Result
→ Scenario Process + Feature Interactions
→ Behavior Items
↔ selected Screen model where UI/spatial meaning exists
→ Domain owners
→ Slice / Shared Implementation owners
→ local proof + shared Test Strategy
→ production/test source + executed Evidence
```

Tests verify selected meaning; they do not create it. Feature Interaction and Slice decompositions are not 1:1.

## Modules

### Replacement Package Builder

Current producer workflow owner:

- [`build-replacement-archive-workflow.md`](build-replacement-archive-workflow.md) — current detailed `давай архив` producer behavior.

Planned producer/review module:

- starts one exact repository work and durable GitHub Issue/work context;
- accepts an Intended Repository Result developed by ChatGPT outside Builder behavior;
- builds the exact replacement package from exact source versus intended result;
- deterministically reproduces the exact package result;
- exposes exact review material and technical handoff identities;
- stops at the consumer handoff boundary.

Canonical target Scenario:

[`scenarios/SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md`](scenarios/SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md)

Current producer mechanics remain authoritative in the current command/use-case plus the colocated detailed producer workflow until the planned Builder Scenario is implemented and promoted:

- `planning/commands/build-replacement-archive.command.md`
- `planning/use-cases/UC-REPO-BUILD-REPLACEMENT-PACKAGE.md`
- [`build-replacement-archive-workflow.md`](build-replacement-archive-workflow.md)

### Replacement Package App

Current consumer application:

- Java 21 / Swing with optional Microsoft Edge ChatGPT bridge;
- current Git-backed Work Intent/workspace/Apply/Commit/Publish behavior plus legacy compatibility behavior;
- Repository Snapshot and external handoff capabilities;
- planned three-route reviewed handoff composition: Apply Only, Apply And Publish, Apply And Finalize;
- planned reviewed-result confirmation, PR integration record, immutable Final Work Record and target Issue closure.

## Application behavior owners

- [`scenarios/README.md`](scenarios/README.md) — one Builder + App Scenario catalog.
- [`scenarios/SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md`](scenarios/SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md) — planned Builder target.
- [`scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md) — current App mixed migration truth.
- [`scenarios/SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md`](scenarios/SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md) — current Snapshot/context behavior.
- [`scenarios/SCN-RPKG-PROVIDE-CURRENT-CHANGE.md`](scenarios/SCN-RPKG-PROVIDE-CURRENT-CHANGE.md) — legacy current ReviewDiff behavior.
- [`scenarios/planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md`](scenarios/planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md) — selected future App reviewed-result workflow.
- [`screens.md`](screens.md) — selected current App spatial/window model and Screen Behavior Items.
- [`evolution-steps-map.md`](evolution-steps-map.md) — one timing/dependency/readiness map across Builder + App Scenario Evolutions.

## Domain / implementation owners

- [`domain/README.md`](domain/README.md) — common Domain owner catalog for this workflow.
- [`domain/repository-target.md`](domain/repository-target.md)
- [`domain/work-intent.md`](domain/work-intent.md)
- [`domain/change-set.md`](domain/change-set.md)
- [`domain/repository-snapshot.md`](domain/repository-snapshot.md)
- [`domain/external-interaction.md`](domain/external-interaction.md)
- [`slices.md`](slices.md) — common Slice portfolio/navigation.
- [`slices/`](slices/) — current focused App Slice owners.
- [`shared-implementation/chatgpt-handoff.md`](shared-implementation/chatgpt-handoff.md) — current reusable ChatGPT handoff capability.

No full Builder Aggregate/Slice model is selected merely to make the two modules look symmetrical. When implementation discovery establishes durable Builder Domain/Slice/shared responsibilities, their owners are added to these same catalogs/directories rather than creating a parallel Builder documentation root.

## Proof / realization navigation

- [`behavior-realization-map.md`](behavior-realization-map.md) — combined Builder + App BI → realization/proof navigation; not behavior authority.
- [`testing-plan.md`](testing-plan.md) — shared Test Strategy and proof-layer allocation.
- [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) — current practical App checklist/evidence owner.

## Focused integration contracts

- [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md) — current shared producer/consumer package + OBS-ACTION contract.
- [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md) — Snapshot artifact contract.
- [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md) — Java/extension/ChatGPT integration contract.

The package protocol is the focused contract seam. Scenario owners define behavior around the seam; they do not duplicate protocol schema authority.

## Current / planned truth boundary

Current Builder authority:
- current command/use-case/detailed producer workflow.

Planned Builder behavior:
- `SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE`;
- its two explicitly planned later Issue evolutions are indexed in `evolution-steps-map.md`.

Current/legacy-current App Scenarios:
- `SCN-RPKG-COMPLETE-REPOSITORY-WORK`;
- `SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`;
- `SCN-RPKG-PROVIDE-CURRENT-CHANGE` (legacy only).

Planned App Scenario:
- `SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK`.

Current source/tests implement legacy `SL-RPKG-01..09`, Git-backed `SL-RPKG-10` and `SL-RPKG-11`, and current target-mode Work Intent → workspace → Apply → Commit → Publish composition.

Planned migration moves repository-work Issue/work-branch creation to Builder Start Work; the App then consumes/verifies that exact existing work. Builder replay/review, the three reviewed-handoff route stop points, reviewed-result confirmation, finalization-time PR, immutable Final Work Record and target Issue closure remain planned unless separately implemented/proved.

The current external `OBS-ACTION/1` surface remains the current protocol truth. Planned Builder/App handoff route evolution must not be described as implemented until protocol/runtime owners are updated and proved.

## Build / run — current App

Windows requirements:
- JDK 21;
- Git;
- authenticated GitHub CLI (`gh`) for Git-backed Work Intent / GitHub operations;
- Node.js for extension DOM regression;
- Microsoft Edge only for optional live bridge use/acceptance.

```cmd
run-tests.cmd
run-app.cmd
```

## Authority boundary

- Scenario owners define Application Benefit, selected FI process and BI.
- Scenario-owned Evolution Steps define WHAT future behavior changes.
- `evolution-steps-map.md` defines WHEN/dependency/readiness and does not redefine Evolution deltas.
- Domain/Slice/shared owners define implementation responsibility and only selected durable HOW constraints.
- Future-only HOW candidates remain non-authoritative until implementation planning selects them.
- Focused contracts define independently substantial integration boundaries.
- Tests/evidence prove selected meaning; they do not redefine it.
- Planned future owners remain visibly planned until implementation + proof are reconciled and promoted.
