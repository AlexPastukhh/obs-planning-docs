# OBS Replacement Package App

Status: active current target documentation
Runtime: Java 21 / Swing
Scope: Work-centered replacement-package realization plus separate Repository Snapshot capability.

## Current application route

```text
Repository Target + WorkId
→ Work Intent
→ GitWorkspace
→ Apply Package
→ Commit applied
→ Publish / Retry Publish
```

Automatic `OBS-ACTION apply-package` composes the same operations. It is not a generic Resume/state-machine entry.

The target executable does not open/adopt old persisted ChangeSet works. The already-deployed old executable remains owner of legacy ChangeSet Review/Chat/Finalize behavior.

## Behavioral authority

- [`scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md) — current Work/package realization Scenario;
- [`features/`](features/) — Apply, Commit and Publish Feature authority;
- [`screens.md`](screens.md) — current target Main Work Window;
- [`domain/README.md`](domain/README.md) — Work-centered owner map;
- [`slices.md`](slices.md) — current target Slice navigation;
- [`evolution-steps-map.md`](evolution-steps-map.md) — completed cutover + future evolution boundary.

Separate current capability:
- [`scenarios/SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md`](scenarios/SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md) / Repository Snapshot.

Future reviewed-result/PR/Finalize planning remains planned and must be rebased onto WorkId/GitWorkspace/ReplacementPackageState before implementation.

## Documentation methodology

Root process authority:
- [`documentation-use-cases.md`](documentation-use-cases.md) — shared terminology, process routing, cross-group rules and stable Documentation Use Case identities.

Normative Documentation Use Case groups:
- [`documentation-use-cases/application-modeling.md`](documentation-use-cases/application-modeling.md) — Scenario / Feature / Screen planning;
- [`documentation-use-cases/implementation-discovery-and-proof.md`](documentation-use-cases/implementation-discovery-and-proof.md) — Domain/Slice/Shared discovery, implementation Requirements and proof;
- [`documentation-use-cases/evolution-planning.md`](documentation-use-cases/evolution-planning.md) — Evolution Step planning;
- [`documentation-use-cases/documentation-governance.md`](documentation-use-cases/documentation-governance.md) — readability, ownership and documentation-interface maintenance;
- [`documentation-use-cases/ai-session-work.md`](documentation-use-cases/ai-session-work.md) — AI planning/proposal/finding/exact-realization/execution Use Cases.

Reusable guidance:
- [`methodology-guidance/reusable-guidance-model.md`](methodology-guidance/reusable-guidance-model.md);
- [`methodology-guidance/reusable-ddd-domain-discovery.md`](methodology-guidance/reusable-ddd-domain-discovery.md);
- [`methodology-guidance/reusable-vertical-slice-discovery.md`](methodology-guidance/reusable-vertical-slice-discovery.md);
- [`methodology-guidance/reusable-programming-principles.md`](methodology-guidance/reusable-programming-principles.md).

Detailed AI/session procedures:
- [`session-methodology/README.md`](session-methodology/README.md).

Recommended forms:
- [`documentation-templates.md`](documentation-templates.md).

Methodology navigation does not replace product semantic authority. Feature/Scenario/Domain/Slice/Shared owners remain authoritative for selected application meaning.

## Focused contracts

- [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md) — schema-1 package/action consumer contract;
- [`APPLY-RESULT.md`](APPLY-RESULT.md) — top-level automatic result handoff;
- [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) — target practical acceptance.

## Current source boundary

Target executable entry paths use:
- `WorkId`;
- `GitWorkspace` / `FileGitWorkspaceRepository`;
- `ReplacementPackageState` / its repository;
- durable workspace/package journals;
- explicit Apply / Commit / Publish application services.

`Core.ChangeSet` may remain temporarily as unreachable retired source while mechanical legacy deletion is completed, but it is not current target behavior authority.

## Build / run

Windows requirements: JDK 21, Git, authenticated `gh` for Work Intent, Node/Edge only for separately-retained legacy tooling outside the target Main Work Window.

```cmd
run-tests.cmd
run-app.cmd
```

`build.cmd` produces `build\replacement-package-app.jar` and compiles the target test set. Legacy Core/ChatBridge suites are intentionally not acceptance gates for the new executable after Forced Migration.
