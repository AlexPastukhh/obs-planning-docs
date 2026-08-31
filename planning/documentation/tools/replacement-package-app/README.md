# OBS Replacement Package App

Status: active current documentation
Runtime: Java 21 / Swing with optional Microsoft Edge ChatGPT bridge
Scope: local consumer for replacement packages, repository-work review/finalization/publication, Repository Snapshot export and optional ChatGPT handoff.

## Documentation model

This application intentionally uses a small asymmetric documentation set.

1. [`direction-registry.md`](direction-registry.md) — application route.
2. [`scenarios/README.md`](scenarios/README.md) and the three Scenario owners — detailed user-world behavior.
3. [`slices.md`](slices.md) — Slice Implementation Strategy and current implementation map.
4. Focused contracts only where the integration is independently substantial:
   - [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md)
   - [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md)
   - [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md)
5. [`testing-plan.md`](testing-plan.md) — compact automated-proof strategy and Slice-to-proof map.
6. [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) — practical Windows/Edge/ChatGPT evidence checklist.
7. Current source and automated tests — realized mechanics and automated proof.

Scenario owners are the primary detailed behavior layer. `slices.md` is the primary implementation-orientation layer. Domain concepts, UI behavior, state rules and ordinary implementation detail stay in those owners or in code unless independent complexity justifies a focused contract.

Ordinary replacement-package production remains outside this application route:

`planning/command-routing.md` → `planning/commands/build-replacement-archive.command.md` → `planning/documentation/build-replacement-archive-workflow.md`.

## Current Scenario set

- [`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md)
- [`SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`](scenarios/SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md)
- [`SCN-RPKG-PROVIDE-CURRENT-CHANGE`](scenarios/SCN-RPKG-PROVIDE-CURRENT-CHANGE.md)

`Apply`, Current Change refresh/copy/open, Finalize, Retry Push, Reopen, repository selection/location change, Snapshot export, binding, Attach/Send, External Interaction management and notifications are actions/branches/Slices. They are not separate Scenarios merely because they have separate controls.

## Current implementation boundary

Current source/tests realize legacy `SL-RPKG-01..09`, `SL-RPKG-11 Start ChangeSet Workspace`, and the first Git-backed execution stage of `SL-RPKG-01`: **Apply package files** inside an existing isolated ChangeSet worktree. A Git-backed ChangeSet now progresses `Ready(C0) → AppliedUncommitted(P1)` with a durable Apply journal and without Path Ownership or Repository Target main-workspace mutation. Commit/Publish and Git-derived Current Change are not migrated yet, so these ChangeSets remain intentionally fenced from legacy Review/Finalize while the existing legacy `SL-RPKG-01..09` flow otherwise remains available for legacy ChangeSets.

Implementation existence is not live acceptance. Real Windows/Swing/Edge/ChatGPT behavior is established only by current practical evidence.

## Build / run

Windows requirements:

- JDK 21 (`java`, `javac`, `jar`, `jpackage`);
- Git on PATH;
- Node.js on PATH for the extension DOM regression in `run-tests.cmd`;
- Microsoft Edge only for optional live bridge use/acceptance.

```cmd
run-tests.cmd
run-app.cmd
```

`build.cmd` produces `build\\replacement-package-app.jar`.

The Swing app also exposes **Windows launcher → Install / update** for the stable pinnable launcher under `%LOCALAPPDATA%\\OBS\\ReplacementPackageApp\\launcher\\...`.

## Authority boundary

Scenario documentation defines current user-visible behavior. Focused contracts define exact package/snapshot/browser boundaries. `testing-plan.md` maps automated proof responsibility without redefining behavior. Source defines current implementation mechanics. Automated tests prove only executed cases. Manual acceptance records operated environment evidence.
