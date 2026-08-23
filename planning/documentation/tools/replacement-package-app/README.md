# OBS Replacement Package App

Status: active Java 21 current implementation + selected target SDS plan
Planning profile: Modular / Medium SDS
Scope: deterministic local consumer for replacement packages, repository-work review/finalization, repository snapshots and optional ChatGPT handoff.

This directory contains both current implementation contracts/source/tests and the selected target Application planning owners. Semantic ownership follows SDS order; target planning does not claim Java/extension behavior is already implemented.

## 1. Read Order — SDS / Target First

1. [`direction-registry.md`](direction-registry.md) — Application Direction.
2. [`application-plan.md`](application-plan.md) — selected target Scenario DATA/Behavior/Requirements and current divergences.
3. [`scenarios/README.md`](scenarios/README.md) — four target user-world Scenarios.
4. [`screens.md`](screens.md) — current + target spatial/visual meaning.
5. [`domain-draft.md`](domain-draft.md) — target conceptual model/aggregate candidates.
6. [`slices.md`](slices.md) — explicit current SL-01..06 vs target SL-01..09 decomposition.
7. [`testing-plan.md`](testing-plan.md) — target proof responsibilities/evidence boundaries.
8. focused current contracts + selected deltas: [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md), [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md), [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md).
9. current state/architecture + selected target deltas: [`DATA-AND-STATE.md`](DATA-AND-STATE.md), [`ARCHITECTURE.md`](ARCHITECTURE.md).
10. [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) — operated current/target practical proof cards.
11. Java/extension source and automated tests.

[`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md) remains legacy capability-ID compatibility only. Current Application semantic identity is owned by Scenarios.

Ordinary package production remains outside the application route:
`planning/command-routing.md` → `planning/commands/build-replacement-archive.command.md` → `planning/documentation/build-replacement-archive-workflow.md`.

## 2. Modular SDS Shape

```text
replacement-package-app/
├ application-plan.md
├ scenarios/
│  ├ README.md
│  ├ SCN-RPKG-COMPLETE-REPOSITORY-WORK.md
│  ├ SCN-RPKG-FIND-EXISTING-WORK.md
│  ├ SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md
│  └ SCN-RPKG-PROVIDE-CURRENT-CHANGE.md
├ screens.md
├ domain-draft.md
├ slices.md
├ testing-plan.md
├ PACKAGE-PROTOCOL.md
├ REPOSITORY-SNAPSHOT.md
├ CHATGPT-BRIDGE.md
├ DATA-AND-STATE.md
├ ARCHITECTURE.md
├ MANUAL-ACCEPTANCE.md
├ chatgpt-bridge-extension/
└ src/
```

Scenario owns user-world behavior; Screen owns spatial meaning; Domain owns stable conceptual rules; Slice owns implementation/delivery increments; testing docs own proof planning/evidence, not product semantics.

## 3. Current Implementation

Current code is represented by six implemented Slices:

```text
SL-RPKG-01 Apply Replacement Work
SL-RPKG-02 Inspect Current Change
SL-RPKG-03 Finalize And Publish Work
SL-RPKG-04 Export Repository Snapshot
SL-RPKG-05 Attach Repository Snapshot To ChatGPT
SL-RPKG-06 Deliver Current Change To ChatGPT
```

Known current gaps include cross-repository ownership false conflict, raw-byte BASE mismatch under Git checkout conversion, repository-first work navigation, no explicit guarded Finalized→Active Reopen, no explicit repository-location edit, no common External Interaction list and no Windows operation-outcome notification layer. Live Edge/ChatGPT operation still requires manual evidence.

## 4. Selected Target Plan — Not Yet Implemented

Target keeps/expands SL-01..06 and adds:

```text
SL-RPKG-07 Discover And Open Existing Work
SL-RPKG-08 Manage External Interactions
SL-RPKG-09 Notify Operation Outcomes
```

Key selected target behavior:
- package/action input stays passive; Apply resolves exact Repository Target at invocation;
- `PACKAGE.json.changeSetId` identifies the exact continuation work; UI-selected/label/recent work never substitutes another ChangeSet, and an exact Finalized ID requires explicit Reopen rather than auto-reopen;
- existing ChangeSet's concrete target is authoritative; new-work matching clones are never guessed;
- Repository Target has stable ID + logical Repository Identity + mutable Location; explicit `Change repository location` updates location and preserves all ChangeSets;
- `replace/delete` expected source proof accepts raw equality or Git path-semantic equivalent content and blocks changed/unverifiable content;
- baseline/ref-dependent operation against a repo with no commits reports Repository Not Ready;
- Existing Work view spans repositories; default shows Active + Publication Pending only, `Show History` adds all Finalized, and selecting Finalized history exposes explicit guarded `Reopen ChangeSet` without reopening automatically;
- compact latest-operation error marker survives restart for unfinished work only; failed Reopen leaves history Finalized and is reported by notification/result/diagnostics without a persistent Finalized marker;
- External Interaction is exact payload/artifact → exact conversation; common list/cancel/history covers current change + snapshot handoffs;
- Cancel never automatically removes already-prepared ChatGPT content; prepared cancellation retains content and stops future automation;
- meaningful tracked operations always notify on terminal success/failure; notification click selects repository context only, not ChangeSet/operation;
- technical diagnostics become a separate clean copyable session surface.

See [`application-plan.md`](application-plan.md) for selected semantics and [`ARCHITECTURE.md`](ARCHITECTURE.md) for target implementation direction.

## 5. Build / Run — Current Implementation

Required on Windows:

```text
JDK 21: java, javac, jar, jpackage
Git on PATH
Microsoft Edge for optional browser bridge
```

No Maven/Gradle/third-party Java runtime library is required.

```cmd
run-tests.cmd
run-app.cmd
```

`build.cmd` produces `build\replacement-package-app.jar`.

### Pinnable Windows launcher

Current Swing app exposes **Windows launcher → Install / update** and builds:

```text
%LOCALAPPDATA%\OBS\ReplacementPackageApp\launcher\Replacement Package App\Replacement Package App.exe
```

The app image includes its Java runtime. After source changes, use the newly built source app's Install/update action to refresh the stable pinned image.

## 6. Current Repository-Work Flow

```text
register/select local repository
→ supply OBS-ACTION and/or replacement ZIP
→ Apply
→ inspect/refresh Current Change when useful
→ Finalize
→ Retry Push only while publication remains pending
```

Copy/Open ReviewDiff remain optional inspection conveniences and never a Finalize approval gate. ReviewDiff fingerprints remain internal integrity state; normal user flow does not require SHA input.

## 7. Repository Context / ChatGPT Handoff — Current Implementation

Repository snapshot export remains read-only and independent of ChangeSet lifecycle. Current Local/Committed format is in [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md).

Optional Edge/Chromium companion remains in `chatgpt-bridge-extension/`. Java/bridge tests are implementation evidence, not proof that live ChatGPT UI currently succeeds. Snapshot handoff is attach-only/never Send; current-change handoff may send only after exact preparation and never becomes Finalize authority.

## 8. CLI Fallback — Current Implementation

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

## 9. Authority Boundary

Planning may identify selected target behavior/implementation gaps before code exists. Those findings do not become current functionality merely because they are documented.

Conversely, current Core/state/Git/bridge/UI mechanics are evidence/constraints and do not redefine Scenario/Domain truth for implementation convenience.
