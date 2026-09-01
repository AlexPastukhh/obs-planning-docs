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

`Apply Package` is the ordinary package-operation composition; `Start workspace`, manual Apply/Commit/Publish, Current Change refresh/copy/open, Finalize, Retry Push, Reopen, repository selection/location change, Snapshot export, binding, Attach/Send, External Interaction management and notifications are actions/branches/Slices. They are not separate Scenarios merely because they have separate controls.

## Current implementation boundary

Current source/tests realize legacy `SL-RPKG-01..09`, `SL-RPKG-11 Start ChangeSet Workspace`, the modular Git-backed **Apply / Commit / Publish** actions inside expanded `SL-RPKG-01`, and the ordinary top-level **Apply Package** composition that drives those actions automatically. An `OBS-ACTION/1` carrying explicit `targetBranch` now resolves the exact ZIP and Repository Target, automatically ensures the missing Git-backed workspace from package `changeSetId` / `changeSetLabel`, then dispatches by persisted execution state through `Ready(C0) → AppliedUncommitted(P1) → CommittedUnpublished(P1,C1) → Ready(C1)`. Repeating the same command resumes/proves the same work, including `PublicationUncertain` reconciliation, rather than requiring manual Start workspace / Commit / Publish. Actions without `targetBranch` retain legacy/manual compatibility so already-open legacy ChangeSets are not silently reinterpreted. Git-derived Current Change, PR/ReviewDecision and integration Finalize are not migrated yet, so Git-backed ChangeSets remain intentionally fenced from legacy Review/Finalize.

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
