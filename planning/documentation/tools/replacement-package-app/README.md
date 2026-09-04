# OBS Replacement Package App

Status: active current documentation
Runtime: Java 21 / Swing with optional Microsoft Edge ChatGPT bridge
Scope: local consumer for replacement packages, repository-work realization/recovery/finalization, Repository Snapshot export and optional ChatGPT handoff.

## Documentation route

This directory follows the local methodology defined by [`documentation-use-cases.md`](documentation-use-cases.md) and [`documentation-templates.md`](documentation-templates.md). Behavioral, implementation and proof authority are intentionally separate.

```text
Application Benefit / Desired Result
→ Scenario Process + Feature Interactions
→ Behavior Items
↔ selected Screen model
→ Domain owners
→ Slice / Shared Implementation owners
→ local proof + shared Test Strategy
→ production/test source + executed Evidence
```

Tests verify selected meaning; they do not create it. Feature Interaction and Slice decomposition are not 1:1.

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

Current source/tests implement legacy `SL-RPKG-01..09`, current Git-backed `SL-RPKG-10` and `SL-RPKG-11`, and the target-mode Work Intent → workspace → Apply → Commit → Publish composition. Git-derived diagnostic Current Change and the planned three-route reviewed-result workflow are selected future behavior, not current truth: Apply Only stops applied/uncommitted; Apply And Publish stops pre-integration after reviewed-result confirmation; Apply And Finalize continues through integration, `## Final Work Record` and managed Issue closure. Future Domain/Slice ownership for new requirements remains downstream Requirements Discovery.

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

- Scenario owners define application Benefit, selected FI process and BI.
- Screen owner defines durable spatial/window meaning.
- Domain/Slice/shared owners define implementation responsibility and optional durable HOW constraints.
- Focused contracts define independent integration boundaries.
- Tests and evidence prove selected meaning; they do not redefine it.
- Planned future owners must remain visibly planned until implementation + proof are reconciled and the resulting behavior is promoted to current truth.
