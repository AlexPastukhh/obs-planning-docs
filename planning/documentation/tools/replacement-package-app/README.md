# OBS Replacement Package App

Status: active Java 21 local application / current implementation
Planning profile: Modular / Medium SDS
Scope: deterministic local consumer for replacement packages, repository-work review/finalization, read-only repository snapshots, and optional ChatGPT handoff.

This directory contains both the current Application planning owners and the downstream implementation/contracts/source/tests. Semantic ownership follows SDS order; implementation files do not override Scenario/Domain meaning.

## 1. Read Order — Current SDS

1. [`direction-registry.md`](direction-registry.md) — application Direction entry.
2. [`application-plan.md`](application-plan.md) — accumulating Modular SDS Current Application Plan: Step 0 + Scenario inventory/shared DATA/Behavior/Requirements.
3. [`scenarios/README.md`](scenarios/README.md) — current user-world Scenario navigation.
4. [`screens.md`](screens.md) — supporting spatial/visual meaning.
5. [`domain-draft.md`](domain-draft.md) — Step 2 Domain discovery/current working model and aggregate candidates.
6. [`slices.md`](slices.md) — Step 3 implementation Slice strategy/current realization.
7. [`testing-plan.md`](testing-plan.md) — cross-Slice testing strategy.
8. focused contracts: [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md), [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md), [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md).
9. downstream realization/state: [`DATA-AND-STATE.md`](DATA-AND-STATE.md), [`ARCHITECTURE.md`](ARCHITECTURE.md).
10. operated Windows/Edge proof surface: [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md).
11. focused Java/extension source and automated tests.

[`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md) is retained only as a legacy capability-ID compatibility index; current application semantic identity is owned by Scenarios.

Ordinary ChatGPT package production remains outside the application route:
`planning/command-routing.md` → `planning/commands/build-replacement-archive.command.md` → `planning/documentation/build-replacement-archive-workflow.md`.

## 2. Modular SDS Shape

```text
replacement-package-app/
├── application-plan.md
├── scenarios/
│   ├── README.md
│   ├── SCN-RPKG-COMPLETE-REPOSITORY-WORK.md
│   ├── SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md
│   └── SCN-RPKG-PROVIDE-CURRENT-CHANGE.md
├── screens.md
├── domain-draft.md
├── slices.md
├── testing-plan.md
├── PACKAGE-PROTOCOL.md
├── REPOSITORY-SNAPSHOT.md
├── CHATGPT-BRIDGE.md
├── DATA-AND-STATE.md
├── ARCHITECTURE.md
├── MANUAL-ACCEPTANCE.md
├── chatgpt-bridge-extension/
└── src/
```

The physical split does not create new semantic types. Scenario owns user-visible behavior; Screen owns spatial meaning; Domain owns selected conceptual rules/invariants; Slice owns one implementation/delivery increment; testing documents own proof planning/evidence, not product semantics.

## 3. Current Implementation Capabilities

Current implementation is organized in six separately checkable implementation Slices:

```text
SL-RPKG-01 Apply Replacement Work
SL-RPKG-02 Inspect Current Change
SL-RPKG-03 Finalize And Publish Work
SL-RPKG-04 Export Repository Snapshot
SL-RPKG-05 Attach Repository Snapshot To ChatGPT
SL-RPKG-06 Deliver Current Change To ChatGPT
```

The first three realize the repository-work Scenario. Snapshot export/attachment realize repository-context work. Current-change delivery realizes the review/continuation handoff Scenario. See [`slices.md`](slices.md) for exact current source paths, known divergences and verification targets.

## 4. Build / Run

Required on Windows:

```text
JDK 21: java, javac, jar, jpackage
Git on PATH
Microsoft Edge for the optional browser bridge
```

No Maven, Gradle, PowerShell runtime or third-party Java library is required.

```cmd
run-tests.cmd
run-app.cmd
```

`build.cmd` produces `build\replacement-package-app.jar`.

### Pinnable Windows launcher

The Swing app exposes **Windows launcher → Install / update** and builds a GUI app image at:

```text
%LOCALAPPDATA%\OBS\ReplacementPackageApp\launcher\Replacement Package App\Replacement Package App.exe
```

The generated app image includes its own Java runtime. After source changes, run the newly built source app and use **Install / update** again to refresh the pinned image.

## 5. Current Repository-Work Flow

```text
register/select local repository
→ supply OBS-ACTION and/or replacement ZIP
→ Apply
→ inspect/refresh Current Change when useful
→ Finalize
→ recover/retry publication only when publication remains pending
```

`Copy/Open ReviewDiff` are optional inspection conveniences and never a Finalize approval gate. ReviewDiff fingerprinting remains internal integrity state; normal user flow does not require SHA input.

## 6. Repository Context / ChatGPT Handoff

Repository snapshot export is read-only and independent of ChangeSet lifecycle. Local and Committed snapshot contracts remain in [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md).

The optional Edge/Chromium companion remains in `chatgpt-bridge-extension/`. Java/service-level bridge logic and automated tests are implementation evidence, not proof that the live ChatGPT browser workflow is operational. Real browser results require the manual practical-testing route described in [`testing-plan.md`](testing-plan.md) and [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md).

Snapshot handoff is attach-only and must never press Send. Current-change handoff may send only after the exact prepared content is ready and must not make browser delivery a Finalize authority.

## 7. CLI Fallback

Repository mutation through CLI uses the same repository allowlist and Core behavior as Swing:

```cmd
java -jar build\replacement-package-app.jar settings --repo C:\repo --name "My Repo" --review-diff Clipboard
java -jar build\replacement-package-app.jar list-repos
java -jar build\replacement-package-app.jar apply --repo C:\repo --archive C:\Downloads\package.zip
java -jar build\replacement-package-app.jar review --changeset <uuid>
java -jar build\replacement-package-app.jar finalize --repo C:\repo --changeset <uuid> --message "Finalize ChangeSet"
java -jar build\replacement-package-app.jar retry-push --repo C:\repo --changeset <uuid>
java -jar build\replacement-package-app.jar export-snapshot --repo C:\repo --mode local --output-dir C:\Users\me\Downloads
java -jar build\replacement-package-app.jar export-snapshot --repo C:\repo --mode committed --commit HEAD --output-dir C:\Users\me\Downloads
```

## 8. Authority Boundary

Current Scenario/Domain/Slice planning may identify implementation defects or missing proof. Those findings do not become true implementation merely because they are planned.

Conversely, current `Core.java`, state JSON, Git commands, bridge task states and UI controls are realization evidence and constraints; they do not redefine user-world Scenario identity or Domain truth for implementation convenience.
