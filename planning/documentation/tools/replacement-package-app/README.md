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
- every ChangeSet row begins with its Repository Target display name so repository context is visible before the work label/status;
- `All repositories`: the same selector expands across registered targets; `All repositories` and `Show history` controls sit directly below the ChangeSet selector instead of consuming its right edge;
- `Show history`: adds Finalized within the selected local/global scope;
- selecting a global ChangeSet selects its exact registered Repository Target + ChangeSet; an unavailable stored target is truthful query state and is never silently substituted.

Current ChatGPT delivery now uses one generic exact-attachment pipeline for both ReviewDiff and Repository Snapshot tasks. Before payload/composer mutation, Java and extension require bridge protocol `5` and validate the complete claimed-task contract. ReviewDiff remains automatic attach+Send; Snapshot can be queued as attach-only or attach+Send from the initial Snapshot dialog. Both kinds reuse the same browser `File`/file-input preparation, exact filename/size/fingerprint checks, clean-composer guard for automatic Send, Java `SendArmed` pre-click authorization, guarded MAIN-world Send attempts, `SendClicked` actual-click boundary and `Sent`/`UnknownAfterSend` confirmation logic. After the prepared attachment leaves the composer, a new post-baseline user turn remains the minimum `Sent` proof; a turn-local attachment/file surface containing the exact queued filename is stronger optional evidence. The existing `Review send retry` setting supplies the frozen retry interval for every auto-send task, including Snapshot attach+Send. Attach-only Snapshot stops at `Attached`. Equivalent actionable interactions also include the frozen `autoSend` intent, so attach-only and attach+Send for the same ZIP/chat are not collapsed.

The browser handoff now uses one tab-agent lifecycle owner: the extension service worker injects the ChatGPT adapter/content agent; the manifest does not auto-inject a second copy. A session-scoped runtime generation plus per-tab agent instance prevents stale/replaced agents from controlling current work, and invalidated old agents stop their heartbeat timer. `Pending` ReviewDiff is presented as `Waiting for ChatGPT tab`, not as successful delivery; after claim it becomes `Delivering`. Once a tab has loaded the current `0.2.11+` agent, later extension reload/update is expected to inject a fresh agent into the already-open ordinary ChatGPT tab without requiring a page refresh. Upgrading from a pre-`0.2.11` content script requires one page refresh because an already-invalidated legacy script cannot retroactively learn to stop its timer. Already `Preparing`/possible-Send interruption keeps existing truthful terminal/uncertain semantics rather than pretending seamless resume.

The accepted low-frequency SL-01 package re-read/Apply TOCTOU risk remains documented for later hardening. See [`application-plan.md`](application-plan.md), [`slices.md`](slices.md) and [`ARCHITECTURE.md`](ARCHITECTURE.md) for exact semantics and proof status.

## 5. Build / Run — Current Implementation

Required on Windows:

```text
JDK 21: java, javac, jar, jpackage
Git on PATH
Node.js: node on PATH (required by the extension DOM regression in run-tests.cmd)
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
→ optionally include `chatContextToken` only when the originating Helper invocation explicitly requests one-invocation chat binding; legacy `chatTabTitle` remains fallback-only
→ Apply
→ inspect/refresh Current Change when useful
→ Finalize
→ Retry Push only while publication remains pending
```

Copy/Open ReviewDiff remain optional inspection conveniences and never a Finalize approval gate. ReviewDiff fingerprints remain internal integrity state; normal user flow does not require SHA input.

The Swing host runs package Prepare/Apply, Refresh Review, Finalize/Retry Push and Repository Snapshot export on background workers. Dialogs, Output rendering and user decisions stay on the Event Dispatch Thread; Git/ZIP/hash/filesystem work does not. Ordinary `Apply` is unchanged and prepares immediately. A separate `Apply (wait for ZIP)` convenience freezes the current Archive ZIP / OBS-ACTION / Repository Target inputs, calls the same Prepare immediately, and retries only `PACKAGE_NOT_FOUND` every 2 seconds for at most 12 seconds; success continues through the existing decision/Execute path exactly once, while every other Prepare failure stops immediately. Neither Apply action opens/reads the selected ZIP on the EDT. Prepare warnings are appended to Output, while confirmation dialogs are reserved for decisions that actually require user authority.

`Refresh Review` captures one ChangeSet ID when invoked and only refreshes that ChangeSet's persisted Review state/Output. A background completion never reassigns the current ChangeSet selector or Review/chat presentation after the user has navigated elsewhere. Copy/Open resolve the latest persisted Review for the currently selected ChangeSet when invoked, rather than relying on a background callback to maintain a global Review cache.

Visible Output follows the logical work, not the downloaded archive: each `changeSetId` has one session-only Output buffer and selecting a ChangeSet restores that buffer. Multiple initial/correction packages for the same open ChangeSet append separate Apply-attempt headers to the same Output; another ChangeSet has separate Output even if its ZIP reuses the same filename or filesystem path. There is no general Output history. Before Prepare has parsed a valid package, progress/errors use the separate transient `Operation` field (plus notification/Technical Diagnostics where relevant) and are not attributed to whichever ChangeSet happens to be selected. After Prepare succeeds the UI switches to the package manifest's `changeSetId`. The attempt header keeps the physical filename plus `packageId` for traceability, but neither value owns Output routing. ChatGPT bridge results are routed directly by their `changeSetId`. `packageId` still has its independent protocol role: an `OBS-ACTION` must resolve/select a ZIP whose `PACKAGE.json.packageId` exactly matches the action, while `archive` remains only a filename/location hint.

`OBS-ACTION/1` may carry optional `chatContextToken: <UUID>` from an explicit Helper `Bind + ...` invocation. Token presence is explicit bind/rebind authority for that action: Execute starts an asynchronous bridge lookup while repository Apply proceeds, the extension asks all live ChatGPT agents, and only the tab whose `sessionStorage` contains that captured token returns its click-time `conversationKey`/title/timestamp. A unique resolution immediately makes that captured conversation the persisted SL-RPKG-06 Review chat: bind when missing, confirm when already the same, and rebind when currently different. No second rebind confirmation is required for the token path. This binding result is independent of repository Apply success/failure. If resolution is ready by the successful Apply ReviewDiff cutoff, that ReviewDiff is queued to the bound/rebound destination. If Apply wins the race, Apply remains successful but that ReviewDiff is not auto-sent; a later resolution still binds/rebinds for future deliveries and emits its own success notification without retroactively sending the skipped ReviewDiff.

Without `chatContextToken`, legacy `chatTabTitle: <exact title>` behavior is unchanged: Prepare applies the local ignored-character policy, freezes a unique candidate when possible, and existing keep/rebind/cancel authorization remains. Token and title are both non-package metadata; `packageId` remains package identity.

## 7. Repository Context / ChatGPT Handoff — Current Implementation

Repository snapshot export remains read-only and independent of ChangeSet lifecycle. Current Local/Committed format is in [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md). The Swing Snapshot dialog has three explicit paths: `Export only`, `Export + Attach`, and `Export + Attach + Send`, with one ordinary ChatGPT conversation selected before export for either automatic handoff. The host freezes the selected `conversationKey` and send intent before background export; after a successful ZIP exists it queues that exact artifact only to that exact conversation. `Export only` keeps the post-export path/copy/open-folder result dialog. Either automatic ChatGPT handoff suppresses that second modal and reports progress/result through Operation, External Interactions and notifications. Snapshot selection never mutates Review-chat binding and never substitutes a later/current chat. The fixed 10-minute pre-confirmation deadline still bounds `Pending`/`Claimed`/`Preparing`; before the first application-controlled auto-send Snapshot browser click Java atomically verifies the fixed deadline and enters `SendArmed`, removing the deadline race; definitive no-click restores the same absolute deadline, while an actual click advances to `SendClicked`, after which later guarded retries stay inside ordinary send uncertainty without re-entering `SendArmed`.

Optional Edge/Chromium companion remains in `chatgpt-bridge-extension/`. Java/bridge tests are implementation evidence, not proof that live ChatGPT UI currently succeeds. ReviewDiff and Snapshot attach+Send use the same generic attachment/send engine; Snapshot attach-only uses the same preparation engine and stops at `Attached`. Neither browser handoff becomes Finalize authority.

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

Known accepted CLI limitation: `apply --action-file` is non-interactive. If its uniquely prepared `chatTabTitle` destination differs from an existing Review-chat binding, the compatibility path keeps the existing binding and does not perform action-driven rebind because no keep/rebind/cancel confirmation can be obtained. Use Swing Apply when explicit rebind authorization is required.

A separate accepted concurrency risk remains in Swing: after the pre-mutation stale check, a manual Bind/Unbind performed while background Execute is already running may later be overwritten by the previously authorized prepared rebind. Do not manually change Review-chat binding during active Apply Execute in this revision.

## 9. Authority Boundary

Planning may identify selected target behavior/implementation gaps before code exists. Those findings do not become current functionality merely because they are documented.

Conversely, current Core/state/Git/bridge/UI mechanics are evidence/constraints and do not redefine Scenario/Domain truth for implementation convenience.
