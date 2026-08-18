# OBS Replacement Package App

Status: active Java 21 local application / implementation source
Scope: deterministic local consumer for ChatGPT-produced replacement packages, read-only Local/Committed repository snapshot ZIP export, and an optional local Microsoft Edge/Chromium bridge for ReviewDiff delivery and snapshot attachment.

This directory is the **application documentation, Java source, fixed build/run wrappers and tests root**. Planning command meaning remains outside the app; package execution belongs here.

## 1. Read Order

1. [`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md) — canonical `UC-RPKG-*` semantic identities, purpose/trigger/result/boundaries and Scenario routes.
2. [`scenarios/README.md`](scenarios/README.md) — detailed behavior and source/test traceability for those Use Cases.
3. [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md) — shared producer/consumer contract.
4. [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md) — Local/Committed repository ZIP export contract.
5. [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md) — Java ↔ browser extension delivery contract.
6. [`ARCHITECTURE.md`](ARCHITECTURE.md) — Java Core/UI/Git/filesystem mechanics.
7. [`DATA-AND-STATE.md`](DATA-AND-STATE.md) — repositories, ChangeSets, attempts, ownership and review identity.
8. [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) — Windows/JDK/Git acceptance.
9. focused Java/extension source and tests.

Ordinary ChatGPT package production still starts from `planning/command-routing.md` → `planning/commands/build-replacement-archive.command.md` → `planning/documentation/build-replacement-archive-workflow.md`.

## 2. Module Layout

```text
replacement-package-app/
├── README.md
├── USE-CASE-REGISTRY.md
├── scenarios/README.md
├── PACKAGE-PROTOCOL.md
├── REPOSITORY-SNAPSHOT.md
├── CHATGPT-BRIDGE.md
├── ARCHITECTURE.md
├── DATA-AND-STATE.md
├── MANUAL-ACCEPTANCE.md
├── build.cmd
├── run-tests.cmd
├── run-app.cmd
├── chatgpt-bridge-extension/
│   ├── manifest.json
│   ├── options.html / options.js
│   └── src/{background.js,bridge-client.js,chatgpt-adapter.js,content.js}
└── src/
    ├── main/java/obs/rpkg/
    │   ├── Main.java
    │   ├── MainWindow.java
    │   ├── Core.java
    │   ├── ChatBridgeService.java
    │   ├── ChatBridgeServer.java
    │   ├── RepositorySnapshotExporter.java
    │   ├── GitClient.java
    │   ├── StateStore.java
    │   ├── WindowsLauncherInstaller.java
    │   └── Json.java
    └── test/java/obs/rpkg/
        ├── CoreTests.java
        ├── ChatBridgeTests.java
        └── WindowsLauncherInstallerTests.java
```

`Core` is the application mechanics owner. `RepositorySnapshotExporter` owns read-only Local/Committed repository ZIP construction behind Core validation. `ChatBridgeService` owns ChangeSet/chat bindings and delivery-task state; `ChatBridgeServer` exposes only the fixed loopback bridge contract to the companion Manifest V3 extension. `MainWindow` is a Swing host; `Main` is the fixed CLI/JAR entry. `GitClient` is the only native Git process boundary. Tests use Java ZIP fixtures and real temporary Git repositories/bare remotes.

## 3. Requirements And Build

Required on Windows:

```text
JDK 21: java, javac, jar, jpackage
Git on PATH
Microsoft Edge for the optional browser bridge (unpacked Manifest V3 extension)
```

No Maven, Gradle, PowerShell runtime or third-party Java library is required.

```cmd
run-tests.cmd
run-app.cmd
```

`build.cmd` produces `build\replacement-package-app.jar`. Equivalent platform-neutral build/test commands are plain `javac`, `jar` and `java`; wrappers are convenience only.

### Pinnable Windows launcher

The Swing app has a **Windows launcher → Install / update** action. It uses the JDK 21 `jpackage` tool to create a GUI `app-image` at the stable per-user path:

```text
%LOCALAPPDATA%\OBS\ReplacementPackageApp\launcher\Replacement Package App\Replacement Package App.exe
```

The generated app image includes its own Java runtime and opens without a console window. Use **Open folder** and pin `Replacement Package App.exe` to the Windows taskbar. The stable path is reused on update, so the existing taskbar pin remains valid when the launcher image is replaced.

The launcher contains the JAR that was running when **Install / update** was clicked. After source packages change the application, start the freshly built source app once and click **Install / update** again to refresh the pinned build. Launcher creation never edits the repository or application ledger.

## 4. V0.1 User Flow

```text
run-app.cmd
→ add one or more allowed local Git repositories once
→ select repository by display name
→ paste OBS-ACTION and/or browse ZIP
→ Apply
→ select the readable ChangeSet entry (label · status · short UUID)
→ inspect ReviewDiff with Copy/Open when useful
→ Finalize
→ Retry Push only if commit succeeded and push failed
```

Repository UUIDs and full ChangeSet UUIDs remain technical identity. Normal Swing navigation uses repository display names and `changeSetLabel`; the full ChangeSet ID remains visible as a read-only detail.

`Copy ReviewDiff` / `Open ReviewDiff` are optional inspection conveniences, not Finalize prerequisites. Finalize implicitly uses the selected ChangeSet's last persisted current ReviewDiff as its baseline. If owned content changed after the last Apply/Refresh Review, Finalize stops with `REVIEW_STALE` and the user refreshes ReviewDiff before retrying.

ReviewDiff SHA-256 remains an internal integrity fingerprint in application state; normal Swing and CLI workflows do not ask the user to view, copy or enter it.

The selected repository and ChangeSet are persisted. After restart, the Swing host can reopen the persisted current ReviewDiff for the selected ChangeSet if the canonical file still exists and matches its recorded internal fingerprint.

### Repository snapshot export

The selected allowed repository can also be exported without creating a ChangeSet:

```text
[Export repository ZIP]
→ Local working tree + diff
   or Committed snapshot
→ choose output directory
→ Create ZIP
→ absolute ZIP path is copied to clipboard with read-back verification
```

Snapshot repository files live under `snapshot/`; root files describe that folder. Local ZIPs carry `BASE-COMMIT.txt` + `WORKING-TREE.diff`; committed ZIPs carry `COMMIT.txt`. Both carry `SNAPSHOT.json`. See [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md).

Clipboard failure is a warning after successful ZIP creation, not an export rollback.

### ChatGPT bridge

The optional companion extension lives in `chatgpt-bridge-extension/`. V1 is accepted primarily in Microsoft Edge/Chromium and supports ordinary `https://chatgpt.com/c/<conversation-key>` chats only.

One-time setup:

```text
run-app.cmd
→ edge://extensions
→ Developer mode → Load unpacked → chatgpt-bridge-extension/
→ in app: Copy pairing token
→ extension Options: paste token → Save and test
```

For one ChangeSet, choose a `Review chat` once and click `Bind`. The binding survives continuation/correction packages with the same `changeSetId`. Binding does not implicitly send the already-current ReviewDiff; use `Send current ReviewDiff` when that is desired. Later Apply/Refresh Review operations queue their new current ReviewDiff automatically.

The extension pastes the exact canonical diff. Java and the extension verify the queued artifact fingerprint before delivery. Small pastes remain text; for a large paste the extension waits for ChatGPT's own native conversion/upload behavior and only then presses Send. It will not auto-send into a non-empty composer. Before the first composer mutation the task becomes `Preparing`; a failure after that point but before Send is recorded as `PreparedUnsent` and is never auto-retried, while post-`SendClicked` uncertainty is `UnknownAfterSend`. Browser delivery never becomes a Finalize gate.

After repository snapshot export, `Attach to ChatGPT` lets the user choose one open ordinary conversation. The extension attaches the validated snapshot ZIP and **never presses Send** for snapshot tasks. See [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md).

### Output sessions

The Swing `Output` area is archive-scoped for package application. Applying a different package identity starts a fresh output session; retrying the same package appends another attempt to the same session. `Copy output` copies the complete current session without adding a success line to the output itself, so an Apply/bridge error can be copied as one block. ReviewDiff bridge events carry their exact `reviewAttemptId`; only events belonging to ReviewDiff attempts registered in the current archive session are appended. A late event from an older archive therefore cannot bleed into the new archive's copied Output.

## 5. CLI Fallback

Repository mutation through CLI uses the same allowlist as Swing. Register/select a repository first:

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

`list-changesets --repo-id <repository-record-uuid>` is available as a technical history fallback.

## 6. Boundaries

The repository consumer remains Java 21 + Swing + local Git. The optional browser integration is a separate Manifest V3 companion and does not depend on Multiplex. The system does not implement automatic branches/worktrees, auto-update, GitHub API publication, repository background watchers or producer-controlled arbitrary commands. Replacement-package operations still have no native rename/chmod/symlink/submodule operation; Repository Snapshot V1 committed export rejects symlink/submodule entries rather than misrepresenting them.

The Java implementation is build/testable on any JDK 21 environment; Windows UI and real-user workflow still require the manual acceptance checklist before V0.1 is operationally accepted.
