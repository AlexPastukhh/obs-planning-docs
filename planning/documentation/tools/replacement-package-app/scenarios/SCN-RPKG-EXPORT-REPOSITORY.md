# SCN-RPKG-EXPORT-REPOSITORY — Export Repository Snapshot ZIP

Status: active current behavior owner
Scope: detailed application behavior and traceability for `UC-RPKG-EXPORT-REPOSITORY`.

Related Application Use Case: [`UC-RPKG-EXPORT-REPOSITORY`](../USE-CASE-REGISTRY.md)

**Trigger/input:** selected allowed repository, export mode `Local working tree + diff` or `Committed snapshot`, output directory, and optional commit/ref for Committed mode.

**Successful result:** Core revalidates the registered repository path/origin and creates one read-only ZIP whose repository files are under `snapshot/`. Local mode places `SNAPSHOT.json`, `BASE-COMMIT.txt` and `WORKING-TREE.diff` beside the folder and exports tracked + untracked non-ignored current files without touching the real Git index. Committed mode places `SNAPSHOT.json` and `COMMIT.txt` beside the folder and reads exact regular-file blobs from the resolved commit object database, independent of dirty working-tree content.

**Consistency/safety boundary:** Local mode captures file inventory/bytes around two temporary-index diff generations and publishes only when both file fingerprints and diff bytes remain stable. `.git/**` and ignored untracked files are excluded. Output must resolve outside the repository. V1 committed export rejects symbolic links/submodules instead of flattening them into misleading regular files.

**Clipboard boundary:** after successful ZIP publication the host automatically copies the absolute ZIP path to clipboard and verifies read-back. Clipboard failure is warning-only; it never deletes or reclassifies the already-created ZIP.

**Primary traceability:**

- snapshot contract: [`REPOSITORY-SNAPSHOT.md`](../REPOSITORY-SNAPSHOT.md);
- mechanics: [`ARCHITECTURE.md`](../ARCHITECTURE.md#8-repository-snapshot-export);
- Core: [`src/main/java/obs/rpkg/Core.java`](../src/main/java/obs/rpkg/Core.java) (`exportRepositorySnapshot`, `copyPathToClipboard`);
- exporter: [`src/main/java/obs/rpkg/RepositorySnapshotExporter.java`](../src/main/java/obs/rpkg/RepositorySnapshotExporter.java);
- Git boundary: [`src/main/java/obs/rpkg/GitClient.java`](../src/main/java/obs/rpkg/GitClient.java);
- hosts: [`src/main/java/obs/rpkg/Main.java`](../src/main/java/obs/rpkg/Main.java), [`src/main/java/obs/rpkg/MainWindow.java`](../src/main/java/obs/rpkg/MainWindow.java);
- automated: [`src/test/java/obs/rpkg/CoreTests.java`](../src/test/java/obs/rpkg/CoreTests.java);
- manual: [`MANUAL-ACCEPTANCE.md`](../MANUAL-ACCEPTANCE.md#repository-snapshot-export).
