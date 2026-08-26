# OBS Replacement Package App

Status: active Java 21 current implementation + selected target SDS plan
Planning profile: Modular / Medium SDS
Scope: deterministic local consumer for replacement packages, repository-work review/finalization, repository snapshots and optional ChatGPT handoff.

This directory contains both current implementation contracts/source/tests and the selected target Application planning owners. Semantic ownership follows SDS order; target planning does not claim Java/extension behavior is already implemented.

## 1. Read Order — SDS / Target First

1. [`direction-registry.md`](direction-registry.md) — Application Direction.
2. [`application-plan.md`](application-plan.md) — selected target Scenario DATA/Behavior/Requirements and current divergences.
3. [`scenarios/README.md`](scenarios/README.md) — three current target user-world Scenarios plus retired planning notes.
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
│  ├ SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md
│  ├ SCN-RPKG-PROVIDE-CURRENT-CHANGE.md
│  └ SCN-RPKG-FIND-EXISTING-WORK.md  (retired planning note)
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

## 3. Current Implementation / Practical Acceptance Boundary

After this package, current source/tests realize the SL-01..09 decomposition used by this SDS, including the practical corrections in this package:

```text
SL-RPKG-01 Apply Replacement Work
SL-RPKG-02 Inspect Current Change
SL-RPKG-03 Finalize And Publish Work
SL-RPKG-04 Export Repository Snapshot
SL-RPKG-05 Attach Repository Snapshot To ChatGPT
SL-RPKG-06 Deliver Current Change To ChatGPT
SL-RPKG-07 Select Existing Work Context
SL-RPKG-08 Manage External Interactions
SL-RPKG-09 Notify Operation Outcomes
```

Implementation existence does not by itself establish live Windows/Edge/ChatGPT acceptance. The manual cards remain the authority for practical evidence.

Current work-context navigation uses the existing `ChangeSet` selector rather than a separate Existing Work workflow:
- default scope: Active + Publication Pending for the selected Repository Target;
- `All repositories`: the same selector expands across registered targets and identifies the repository per row;
- `Show history`: adds Finalized within the selected local/global scope;
- selecting a global ChangeSet selects its exact registered Repository Target + ChangeSet; an unavailable stored target is truthful query state and is never silently substituted.

Current ReviewDiff delivery prepares every non-empty current change as one exact `.diff` attachment through the same low-level attachment primitive used by snapshot handoff. Before any payload/composer mutation, both Java and extension require bridge protocol `2`, and the complete claimed task contract is validated; a stale/incompatible Java bridge or invalid send interval is `FailedBeforeSend` with restart/update guidance, never false `UnknownAfterSend`. `Preparing` is reached only after the exact ReviewDiff attachment is visible/upload-ready. During semantic `Sending`, guarded MAIN-world Send-control attempts may repeat while the same exact attachment remains prepared, using a per-task interval captured from the persisted `Review send retry` application setting (default 6 seconds, valid 1–60). Attachment disappearance without confirmed outgoing turn becomes `UnknownAfterSend` and stops automation. Snapshot remains attach-only in this correction. Ordinary terminal External Interactions leave the user list after Output/notification; uncertainty remains attention-requiring state and later terminal retries create new interaction identities. Ownership/adoptability failures identify exact target/path/applying work and explicitly distinguish unowned local changes from another ChangeSet owner.

The accepted low-frequency SL-01 package re-read/Apply TOCTOU risk remains documented for later hardening. See [`application-plan.md`](application-plan.md), [`slices.md`](slices.md) and [`ARCHITECTURE.md`](ARCHITECTURE.md) for exact semantics and proof status.

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
java -jar build\replacement-package-app.jar settings --repo C:\repo --name "My Repo" --review-diff Clipboard --review-send-retry-seconds 6
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
