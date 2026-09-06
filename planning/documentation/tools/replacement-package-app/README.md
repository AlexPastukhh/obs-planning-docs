# OBS Replacement Package App

Status: active current documentation
Runtime: Java 21 / Swing with optional Microsoft Edge ChatGPT bridge
Scope: local consumer for replacement packages, repository-work realization/recovery/finalization, Repository Snapshot export and optional ChatGPT handoff.

## Documentation route

This directory follows the local methodology defined by [`documentation-use-cases.md`](documentation-use-cases.md) and its adaptable forms in [`documentation-templates.md`](documentation-templates.md).

`documentation-use-cases.md` is the canonical process/methodology owner. `documentation-templates.md` is subordinate recommended form guidance. Practical files under [`examples/`](examples/) demonstrate the method but are not semantic or methodology authority.

```text
Application Benefit
→ Feature owner
   ├─ Intent + Principal Result
   └─ Expected application behavior
      ├─ compact Data
      ├─ Main-path behavior rows
      ├─ BR-* + compact logical statement beside each row
      └─ decision table with one column per path / explicit convergence
↕ composition / consistency
Scenario owner
   ├─ journey Main path
   ├─ actor decisions / one column per path
   └─ SR-* beside the journey behavior it constrains
→ Slice Discovery + non-persistent Slice Planning when implementation planning is useful
   ├─ whole-Slice UI / entry / app-service / Domain / Shared / cross-cutting map
   ├─ Feature Step → candidate realization methods
   └─ whole-Feature integration-test sketches
→ separate non-persistent Aggregate Planning where Domain semantics need design
   ├─ Domain classes + high-level state
   ├─ method → local Domain unit tests
   └─ Future / Evolution impact
→ literal Domain implementation/code example when Domain code is produced
   ├─ errors/ — Domain errors only
   ├─ shared/valueobjects/ — genuinely cross-owner Value Objects only
   ├─ one folder per Aggregate — Root + child Entities + local Value Objects + tests
   └─ tests adjacent to the Domain owner they prove
→ implementation + proof
→ delete both working planning artifacts by default
→ create/update separate durable Domain / Slice / Shared / Proof owners only when independently useful
```

Feature owners are the primary behavioral authority. Scenarios compose those Features into real journeys and do not duplicate Feature internals. Tests/Evidence prove selected meaning; they do not create it.

**Slice Discovery / Slice Planning and Aggregate Planning are both disposable working artifacts by default.** They exist to plan implementation and normally become unnecessary once the planned behavior is implemented and proven.

Their practical examples under [`examples/`](examples/) are retained only as methodology examples. A real work-item copy should normally be deleted after implementation rather than promoted into permanent architecture documentation.

If a durable Domain, Slice, Shared, ADR or Production ↔ Proof owner is useful after implementation, create/update that owner separately for its own long-lived purpose. It is not this planning artifact kept alive indefinitely.

The implementation-side Slice is entered through a simple application service with semantic methods/typed values. The target methodology does not require CommandBus/dispatcher or generic `execute(command)` application entry.

Known evolution uses `Introduction`, `Expansion`, `Refactoring`, `Forced Migration`, `Retirement`.

**Migration boundary:** current Scenario/FI/BI/Domain/Slice/testing owners remain current product truth until separately reconciled to the target Feature/Requirement model.

### Application behavior owners

- [`features/README.md`](features/README.md) — target Feature catalog; current legacy FI/BI owners remain current truth until migration/promotion.
- [`scenarios/README.md`](scenarios/README.md) — current / legacy current / planned future Scenario catalog.
- [`scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md) — current mixed migration truth.
- [`scenarios/SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md`](scenarios/SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md) — Snapshot/context Scenario in feature-centered form.
- [`scenarios/SCN-RPKG-PROVIDE-CURRENT-CHANGE.md`](scenarios/SCN-RPKG-PROVIDE-CURRENT-CHANGE.md) — legacy current ReviewDiff handoff behavior.
- [`scenarios/planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md`](scenarios/planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md) — selected future reviewed-result workflow; not current implementation authority.
- [`screens.md`](screens.md) — selected current spatial/window model.
- [`evolution-steps-map.md`](evolution-steps-map.md) — rough timing/dependency/readiness between canonical Evolution Steps.

### Practical methodology examples — non-authoritative

- [`examples/feature-planning-example.md`](examples/feature-planning-example.md) — compact Feature/Main-path/`BR-*` example.
- [`examples/scenario-planning-example.md`](examples/scenario-planning-example.md) — actor/journey/branch/continuity example.
- [`examples/slice-discovery-planning-example.md`](examples/slice-discovery-planning-example.md) — **non-persistent** end-to-end Slice Discovery / Planning example with Feature-level integration tests.
- [`examples/aggregate-planning-example.md`](examples/aggregate-planning-example.md) — **non-persistent** Domain-only Aggregate Planning example with method-local unit tests.
- [`examples/domain-literal-code/README.md`](examples/domain-literal-code/README.md) — executable Java 21 literal Domain code example using one folder per Aggregate, shared Value Objects separately, Domain errors separately and semantic tests beside their owner.

These files demonstrate the methodology. They are not product, methodology, durable Slice or durable Domain authority. The literal code example is executable proof of the recommended physical layout, not current application runtime source.

### Domain / implementation owners

- [`domain/README.md`](domain/README.md) — current durable Domain owner map.
- [`slices.md`](slices.md) and [`slices/`](slices/) — current durable Slice portfolio/owners.
- [`shared-implementation/chatgpt-handoff.md`](shared-implementation/chatgpt-handoff.md) — reusable exact ChatGPT handoff capability.
- Slice/Aggregate planning examples live under [`examples/`](examples/) and are explicitly **not** durable implementation owners.
- Literal Domain implementation examples also live under [`examples/`](examples/) and must mirror the recommended owner-centered source layout: errors separate, shared Value Objects separate, one folder per Aggregate with its Root/Entities/local Value Objects/tests together.
- Value Object classification is semantic, not structural: a VO may contain multiple fields and behavior; it remains a VO when it has no independent identity/lifecycle and equality is the complete semantic value.

### Proof / realization navigation

- [`behavior-realization-map.md`](behavior-realization-map.md) — derived current coverage; not behavior authority.
- [`testing-plan.md`](testing-plan.md) — shared Test Strategy and proof-layer allocation.
- [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) — current practical checklist/evidence owner.

### Focused integration contracts

- [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md)
- [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md)
- [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md)

Source/test code remains authority for exact realized mechanics.

## Producer / consumer navigation

[`../replacement-package-workflow.md`](../../replacement-package-workflow.md)
→ [`../../replacement-package-builder/README.md`](../../replacement-package-builder/README.md)
→ Builder Feature/Scenario target
→ [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md)
→ this application.

The Builder target reviews the exact package/result before handoff. The consumer target later proves that the published Git tree equals the reviewed predicted tree. The producer stops at the handoff boundary.

## Current Scenario set and migration boundary

Current/legacy-current:
- `SCN-RPKG-COMPLETE-REPOSITORY-WORK`
- `SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`
- `SCN-RPKG-PROVIDE-CURRENT-CHANGE` (legacy only)

Planned future:
- `SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK`

Current source/tests still implement the existing Slice portfolio. The target Feature owners added here do not by themselves prove those Features are implemented.

The current external `OBS-ACTION/1` surface remains intentionally narrow:
- `create-work-intent`
- `apply-package`

The target Feature model does not mechanically create external commands from every Feature or internal stage.

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

## Authority boundary

- app-level context owns Application Benefits / high-level responsibilities;
- Feature owners own coherent use-case behavior and compact `BR-*`-qualified Main paths;
- Scenario owners own real cross-Feature / cross-context composition, continuity, branches and Benefit closure;
- Screen owner defines durable spatial/window meaning;
- Domain/Aggregate owners define durable semantic identity/state/invariants/consistency;
- Slice/application services realize Feature boundaries end-to-end; Shared owners define reusable non-end-to-end capabilities;
- Slice Discovery / Slice Planning and Aggregate Planning are temporary/disposable by default and do not become durable owners merely because a planning file was retained;
- owner-local Production/Proof Requirements define durable realization/proof constraints;
- tests and Evidence prove selected meaning; they do not redefine it;
- future owners remain visibly future until implementation + proof are reconciled and promoted.
