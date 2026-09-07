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
