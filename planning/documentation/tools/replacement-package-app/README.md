# OBS Replacement Package App

Status: V0.1 Java 21 local application / implementation source
Scope: deterministic local consumer for ChatGPT-produced replacement packages plus read-only Local/Committed repository snapshot ZIP export.

This directory is the **application documentation, Java source, fixed build/run wrappers and tests root**. Planning command meaning remains outside the app; package execution belongs here.

## 1. Read Order

1. [`USE-CASE-MAP.md`](USE-CASE-MAP.md) — current outcomes and source/test traceability.
2. [`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md) — canonical `UC-RPKG-*` identities.
3. [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md) — shared producer/consumer contract.
4. [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md) — Local/Committed repository ZIP export contract.
5. [`ARCHITECTURE.md`](ARCHITECTURE.md) — Java Core/UI/Git/filesystem mechanics.
6. [`DATA-AND-STATE.md`](DATA-AND-STATE.md) — repositories, ChangeSets, attempts, ownership and review identity.
7. [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) — Windows/JDK/Git acceptance.
8. focused Java source/tests.

Ordinary ChatGPT package production still starts from `planning/planning-use-case-map.md` → `planning/commands/build-replacement-archive.command.md` → `planning/documentation/build-replacement-archive-workflow.md`.

## 2. Module Layout

```text
replacement-package-app/
├── README.md
├── USE-CASE-REGISTRY.md
├── USE-CASE-MAP.md
├── PACKAGE-PROTOCOL.md
├── REPOSITORY-SNAPSHOT.md
├── ARCHITECTURE.md
├── DATA-AND-STATE.md
├── MANUAL-ACCEPTANCE.md
├── build.cmd
├── run-tests.cmd
├── run-app.cmd
└── src/
    ├── main/java/obs/rpkg/
    │   ├── Main.java
    │   ├── MainWindow.java
    │   ├── Core.java
    │   ├── RepositorySnapshotExporter.java
    │   ├── GitClient.java
    │   ├── StateStore.java
    │   └── Json.java
    └── test/java/obs/rpkg/
        └── CoreTests.java
```

`Core` is the application mechanics owner. `RepositorySnapshotExporter` owns read-only Local/Committed repository ZIP construction behind Core validation. `MainWindow` is a Swing host; `Main` is the fixed CLI/JAR entry. `GitClient` is the only native Git process boundary. Tests use Java ZIP fixtures and real temporary Git repositories/bare remotes.

## 3. Requirements And Build

Required on Windows:

```text
JDK 21: java, javac, jar
Git on PATH
```

No Maven, Gradle, PowerShell runtime or third-party Java library is required.

```cmd
run-tests.cmd
run-app.cmd
```

`build.cmd` produces `build\replacement-package-app.jar`. Equivalent platform-neutral build/test commands are plain `javac`, `jar` and `java`; wrappers are convenience only.

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

V0.1 is Java 21 + Swing + local Git. It does not implement Multiplex, automatic branches/worktrees, auto-update, GitHub API publication, background watchers or producer-controlled arbitrary commands. Replacement-package operations still have no native rename/chmod/symlink/submodule operation; Repository Snapshot V1 committed export rejects symlink/submodule entries rather than misrepresenting them.

The Java implementation is build/testable on any JDK 21 environment; Windows UI and real-user workflow still require the manual acceptance checklist before V0.1 is operationally accepted.
