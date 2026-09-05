# OBS Replacement Package App

Status: active current documentation
Runtime: Java 21 / Swing with optional Microsoft Edge ChatGPT bridge
Scope: local consumer for replacement packages, repository-work realization/recovery/finalization, Repository Snapshot export and optional ChatGPT handoff.

## Documentation route

This directory follows the local methodology defined by [`documentation-use-cases.md`](documentation-use-cases.md) and [`documentation-templates.md`](documentation-templates.md). Behavioral, implementation and proof authority are intentionally separate.

```text
Application Benefits / desired results
→ Feature Planning
   ├─ intent + principal Result
   ├─ observable behavior
   ├─ Behavior Requirements ↔ Feature Data
   ├─ Feature Implementation Concerns
   └─ Feature/Slice Boundary Check
        ↓
     Feature boundary ↔ Slice boundary hypothesis
        ↕
Scenario / real user journeys ↔ selected Screen model
   └─ cross-Feature / cross-Screen Scenario Requirements
→ Aggregate / Shared discovery when needed
→ owner-local Slice / Aggregate / Shared Requirements Discovery
   ├─ Correctness
   ├─ Local Reasoning
   └─ Evolution Fitness
   across Production ↔ Proof
→ production/test source + executed Evidence
```

Feature owners are the primary behavioral authority. Scenarios compose those Features into real user/application journeys, summarize only the journey-level visible behavior/Results needed for understanding, verify input/result/context continuity and confirm that the composition closes the intended Application Benefit; they do not duplicate Feature internals. Scenario-first remains allowed but is not mandatory: Features, Scenarios and Screens are refined iteratively and must eventually be consistent. Tests/Evidence prove selected meaning; they do not create it. Slice independence means primarily locality of use-case change, not absence of dependencies.

Known evolution uses one common vocabulary: `Introduction`, `Expansion`, `Refactoring`, `Forced Migration`, `Retirement`. Migration is a form of Evolution and belongs in canonical Evolution Step / Evolution Impact machinery rather than a competing roadmap.

**Migration boundary:** current Scenario/FI/BI/Domain/Slice/testing owners remain current product truth until separately reconciled to the target Feature/Requirement model. This methodology update does not silently rename, regroup or reinterpret those product owners.

### Application behavior owners

- [`scenarios/README.md`](scenarios/README.md) — current / legacy current / planned future Scenario catalog.
- [`scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md) — current mixed migration truth.
- [`scenarios/SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md`](scenarios/SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md) — current Snapshot/context behavior.
- [`scenarios/SCN-RPKG-PROVIDE-CURRENT-CHANGE.md`](scenarios/SCN-RPKG-PROVIDE-CURRENT-CHANGE.md) — legacy current ReviewDiff handoff behavior.
- [`scenarios/planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md`](scenarios/planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md) — selected future reviewed-result workflow; **not current implementation authority**.
- [`screens.md`](screens.md) — selected current spatial/window model and Screen Behavior Items.
- [`evolution-steps-map.md`](evolution-steps-map.md) — timing/dependency/readiness between canonical Scenario Evolution Steps.

### Domain / implementation owners

- [`domain/README.md`](domain/README.md) — Domain owner map.
- [`domain/repository-target.md`](domain/repository-target.md)
- [`domain/work-intent.md`](domain/work-intent.md)
- [`domain/change-set.md`](domain/change-set.md)
- [`domain/repository-snapshot.md`](domain/repository-snapshot.md)
- [`domain/external-interaction.md`](domain/external-interaction.md)
- [`slices.md`](slices.md) — current Slice portfolio/navigation.
- [`slices/`](slices/) — focused Slice owners for `SL-RPKG-01..11`.
- [`shared-implementation/chatgpt-handoff.md`](shared-implementation/chatgpt-handoff.md) — reusable exact ChatGPT handoff capability consumed by Snapshot and Current Change delivery.

### Proof / realization navigation

- [`behavior-realization-map.md`](behavior-realization-map.md) — derived BI → Domain/Slice/proof coverage; not behavior authority.
- [`testing-plan.md`](testing-plan.md) — shared Test Strategy and proof-layer allocation.
- [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) — current practical checklist/evidence owner. An executed evidence entry proves only the build/environment it actually exercised.

### Focused integration contracts

- [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md) — exact producer/consumer package + OBS-ACTION contract.
- [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md) — Snapshot artifact contract.
- [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md) — Java/extension/ChatGPT integration contract.

Source/test code remains authority for exact realized mechanics. Documentation does not manually duplicate class/method traces.

## Producer / consumer navigation

Ordinary replacement-package production is outside this application owner and is entered through:

[`../replacement-package-workflow.md`](../../replacement-package-workflow.md)
→ [`../../replacement-package-builder/README.md`](../../replacement-package-builder/README.md)
→ current producer command/use-case/workflow
→ [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md)
→ this application.

The Builder target adds clean replay + semantic review **before** handoff. The consumer target later proves that its actual published Git tree equals that reviewed predicted tree. The producer still stops at the exact handoff boundary and never applies/commits/publishes consumer repository work.

## Current Scenario set and migration boundary

Current/legacy-current:
- `SCN-RPKG-COMPLETE-REPOSITORY-WORK`
- `SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`
- `SCN-RPKG-PROVIDE-CURRENT-CHANGE` (legacy only)

Planned future:
- `SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK`

Current source/tests implement legacy `SL-RPKG-01..09`, current Git-backed `SL-RPKG-10` and `SL-RPKG-11`, and the target-mode Work Intent → workspace → Apply → Commit → Publish composition. Git-derived Current Change, consumer confirmation of Builder-reviewed result identity, one correct integration PR and target Finalize are selected future behavior, not current truth.

The current external `OBS-ACTION/1` surface remains intentionally narrow:
- `create-work-intent`
- `apply-package`

Internal diagnostic/recovery actions such as Start workspace, Commit applied, Publish, Current Change operations, Finalize, Retry Push and Reopen are not silently promoted into extra serialized external commands.

## Build / run

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

`build.cmd` produces the application JAR. Current launcher/install mechanics remain source/operated-environment concerns.

## Authority boundary

Target local-methodology ownership is:

- app-level context owns Application Benefits / high-level responsibilities;
- Feature owners/sections own coherent use-case behavior, Behavior Requirements, Feature Data and implementation concerns;
- Scenario owners own real cross-Feature / cross-Screen journey composition, Result/context continuity, Benefit closure and Scenario Requirements; Feature internals remain Feature authority;
- Screen owner defines durable spatial/window meaning;
- Domain/Aggregate owners define semantic identity/state/invariants/consistency;
- Slice owners define end-to-end implementation of Feature boundaries; Shared owners define reusable non-end-to-end capabilities;
- owner-local Production/Proof Requirements define durable realization/proof constraints;
- focused contracts define independent integration boundaries;
- tests and Evidence prove selected meaning; they do not redefine it;
- planned future owners must remain visibly planned until implementation + proof are reconciled and resulting behavior is promoted to current truth.

Existing product documents keep their current legacy FI/BI/Item representation until separately migrated; that representation is compatibility state, not target methodology ontology.
