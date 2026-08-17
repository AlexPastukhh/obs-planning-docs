# OBS Replacement Package App

Status: V0.1 Java 21 local application / implementation source
Scope: deterministic local consumer for ChatGPT-produced replacement packages: verified apply, persistent ChangeSet/ApplicationAttempt history, cumulative ReviewDiff, and reviewed Finalize through local Git.

This directory is the **application documentation, Java source, fixed build/run wrappers and tests root**. Planning command meaning remains outside the app; package execution belongs here.

## 1. Read Order

1. [`USE-CASE-MAP.md`](USE-CASE-MAP.md) — current outcomes and source/test traceability.
2. [`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md) — canonical `UC-RPKG-*` identities.
3. [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md) — shared producer/consumer contract.
4. [`ARCHITECTURE.md`](ARCHITECTURE.md) — Java Core/UI/Git/filesystem mechanics.
5. [`DATA-AND-STATE.md`](DATA-AND-STATE.md) — ChangeSet, attempts, ownership and review identity.
6. [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) — Windows/JDK/Git acceptance.
7. focused Java source/tests.

Ordinary ChatGPT package production still starts from `planning/planning-use-case-map.md` → `planning/commands/build-replacement-archive.command.md` → `planning/documentation/build-replacement-archive-workflow.md`.

## 2. Module Layout

```text
replacement-package-app/
├── README.md
├── USE-CASE-REGISTRY.md
├── USE-CASE-MAP.md
├── PACKAGE-PROTOCOL.md
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
    │   ├── GitClient.java
    │   ├── StateStore.java
    │   └── Json.java
    └── test/java/obs/rpkg/
        └── CoreTests.java
```

`Core` is the application mechanics owner. `MainWindow` is a Swing host; `Main` is the fixed CLI/JAR entry. `GitClient` is the only native Git process boundary. Tests use Java ZIP fixtures and real temporary Git repositories/bare remotes.

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
ChatGPT produces ZIP + OBS-ACTION
→ run-app.cmd
→ configure/select repository root
→ paste OBS-ACTION and/or browse ZIP
→ Apply
→ inspect/send cumulative ReviewDiff for external review
→ paste reviewed diff SHA-256 + commit message
→ Finalize
→ Retry Push only if commit succeeded and push failed
```

The UI displays the current Review SHA separately and never auto-copies it into the reviewed approval field.

## 5. CLI Fallback

```cmd
java -jar build\replacement-package-app.jar apply --repo C:\repo --archive C:\Downloads\package.zip
java -jar build\replacement-package-app.jar review --changeset <uuid>
java -jar build\replacement-package-app.jar finalize --repo C:\repo --changeset <uuid> --sha <sha256> --message "Reviewed change"
java -jar build\replacement-package-app.jar retry-push --repo C:\repo --changeset <uuid>
```

## 6. Boundaries

V0.1 is Java 21 + Swing + local Git. It does not implement Multiplex, automatic branches/worktrees, auto-update, GitHub API publication, background watchers, native rename/chmod/symlink/submodule operations or producer-controlled arbitrary commands.

The Java implementation is build/testable on any JDK 21 environment; Windows UI and real-user workflow still require the manual acceptance checklist before V0.1 is operationally accepted.
