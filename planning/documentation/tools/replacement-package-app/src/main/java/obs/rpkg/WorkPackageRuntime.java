package obs.rpkg;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;
import java.util.regex.*;

import obs.rpkg.features.apply.domain.ReplacementPackageIdentity;
import obs.rpkg.work.domain.GitWorkspace;
import obs.rpkg.work.domain.RepositoryTarget;
import obs.rpkg.work.domain.WorkId;
import obs.rpkgcommon.PackageStateApplier;

/** Git/file mechanics for the Work-centered runtime. Contains no ChangeSet state machine. */
public final class WorkPackageRuntime {
    private final Path stateRoot;
    private final GitClient git = new GitClient();
    private Runnable afterPushAttemptHook = () -> {};

    public WorkPackageRuntime(Path appStateRoot) {
        if (appStateRoot == null) throw new IllegalArgumentException("appStateRoot is required");
        this.stateRoot = appStateRoot.toAbsolutePath().normalize().resolve("work-state-v2");
        try {
            Files.createDirectories(workspaceJournalDirectory());
            Files.createDirectories(worktreeDirectory());
            Files.createDirectories(packageJournalDirectory());
        } catch (IOException e) {
            throw new IllegalStateException("Cannot initialize Work runtime state", e);
        }
    }

    public record WorkspaceStart(GitWorkspace workspace, boolean recovered) {}

    public WorkspaceStart startWorkspace(Core.RepositoryConfig target, WorkId workId, String targetBranch) {
        Objects.requireNonNull(target, "target");
        Objects.requireNonNull(workId, "workId");
        if (targetBranch == null || targetBranch.isBlank()) throw new Core.ObsException(Core.STATE_DIVERGED, "Target branch is required.");
        Path repository = repositoryRoot(Path.of(target.path()));
        String identity = repositoryIdentity(repository);
        if (!same(identity, target.repositoryIdentity())) throw new Core.ObsException(Core.REPOSITORY_MISMATCH, "Registered repository origin changed from " + target.repositoryIdentity() + " to " + identity + ".");
        requireRepositoryReady(repository);
        validateBranchName(repository, targetBranch);

        Path journalPath = workspaceJournalPath(workId);
        WorkspaceJournal journal;
        boolean recovered = Files.exists(journalPath);
        if (recovered) {
            journal = WorkspaceJournal.read(journalPath);
            assertWorkspaceJournalRequest(journal, target, workId, targetBranch);
        } else {
            String base = resolveLocalBranchTip(repository, targetBranch);
            Path worktree = worktreePath(workId);
            String branch = workBranch(workId);
            if (gitRefExists(repository, "refs/heads/" + branch) || Files.exists(worktree, LinkOption.NOFOLLOW_LINKS)) {
                throw new Core.ObsException(Core.STATE_DIVERGED,
                        "Cannot start Work workspace because its deterministic branch or worktree already exists without a durable workspace journal: " + branch + " · " + worktree);
            }
            journal = new WorkspaceJournal(workId.value(), identity, repository.toString(), targetBranch, worktree.toString(), base);
            journal.write(journalPath);
        }

        reconcileWorkspace(repository, journal);
        GitWorkspace workspace = new GitWorkspace(
                workId,
                new RepositoryTarget(identity, repository),
                targetBranch,
                Path.of(journal.worktree()),
                journal.baseCommit());
        verifyWorkspaceAt(workspace, journal.baseCommit(), true);
        return new WorkspaceStart(workspace, recovered);
    }

    public void completeWorkspaceStart(WorkId workId) {
        try { Files.deleteIfExists(workspaceJournalPath(workId)); }
        catch (IOException e) { throw new Core.ObsException(Core.STATE_DIVERGED, "Cannot clear durable Work workspace journal.", e); }
    }

    public void verifyWorkspace(GitWorkspace workspace) {
        verifyWorkspaceIdentity(workspace);
    }

    public void apply(Core.PackageData pkg, GitWorkspace workspace) {
        Objects.requireNonNull(pkg, "pkg");
        Objects.requireNonNull(workspace, "workspace");
        WorkId workId = workspace.workId();
        if (!workId.value().equals(pkg.manifest().changeSetId())) {
            throw new Core.ObsException(Core.ACTION_PACKAGE_MISMATCH, "Package Work identity differs from GitWorkspace.");
        }
        ReplacementPackageIdentity identity = new ReplacementPackageIdentity(pkg.manifest().packageId(), pkg.archiveSha256());
        Path journalPath = packageJournalPath(workId, identity.packageId());
        PackageJournal journal;
        List<PackageStateApplier.Operation> operations = packageOperations(pkg, workspace.worktree());

        if (Files.exists(journalPath)) {
            journal = PackageJournal.read(journalPath);
            assertPackageJournal(journal, workspace, identity, pkg);
            JournalState state = journalState(journal);
            if (state == JournalState.INTENDED) {
                assertOnlyJournalPathsDirty(workspace.worktree(), journal);
                return;
            }
            if (state == JournalState.MIXED) restorePrior(journal);
            else if (state == JournalState.OTHER) {
                throw new Core.ObsException(Core.STATE_DIVERGED, "Worktree contains bytes outside prior/intended durable package journal state.");
            }
            verifyWorkspaceAt(workspace, journal.baseHead(), false);
            assertOnlyJournalPathsDirty(workspace.worktree(), journal);
        } else {
            String baseHead = verifyWorkspaceCleanAtCurrentBranchTip(workspace);
            journal = createPackageJournal(pkg, workspace, baseHead);
            journal.write(journalPath);
        }

        PackageStateApplier.PreparedChange prepared;
        try {
            prepared = PackageStateApplier.prepare(operations,
                    (path, expected, actual) -> requireExpectedSource(workspace.worktree(), path, expected, actual));
        } catch (Throwable t) {
            throw mapPackageStateFailure(t);
        }
        try (PackageStateApplier.AppliedChange applied = prepared.apply()) {
            assertOnlyJournalPathsDirty(workspace.worktree(), journal);
            if (journalState(journal) != JournalState.INTENDED) {
                throw new Core.ObsException(Core.RESULT_MISMATCH, "Applied package files do not match durable intended package state.");
            }
            applied.commit();
        } catch (Throwable t) {
            throw mapPackageStateFailure(t);
        }
    }

    public String commit(GitWorkspace workspace, ReplacementPackageIdentity identity) {
        Objects.requireNonNull(workspace, "workspace");
        Objects.requireNonNull(identity, "identity");
        PackageJournal journal = loadPackageJournal(workspace, identity);
        verifyWorkspaceIdentity(workspace);
        String head = head(workspace.worktree());
        String branchTip = branchTip(workspace);
        if (!Objects.equals(head, branchTip)) throw new Core.ObsException(Core.STATE_DIVERGED, "Work branch ref and worktree HEAD diverged during Commit.");
        if (!Objects.equals(head, journal.baseHead())) {
            verifyExactPackageCommit(workspace, journal, head);
            return head;
        }

        assertOnlyJournalPathsDirty(workspace.worktree(), journal);
        if (journalState(journal) != JournalState.INTENDED) throw new Core.ObsException(Core.STATE_DIVERGED, "Commit requires the exact applied package file state.");
        assertOnlyJournalPathsStaged(workspace.worktree(), journal);
        stageJournalPaths(workspace.worktree(), journal);
        assertOnlyJournalPathsStaged(workspace.worktree(), journal);
        Path disabledHooks = stateRoot.resolve("disabled-git-hooks");
        try { Files.createDirectories(disabledHooks); }
        catch (IOException e) { throw new Core.ObsException(Core.COMMIT_FAILED, "Cannot prepare deterministic Git commit environment.", e); }
        String trailers = "Package-Id: " + identity.packageId() + "\nChangeSet-Id: " + workspace.workId().value();
        git.run(workspace.worktree(), Core.COMMIT_FAILED,
                "-c", "commit.gpgsign=false",
                "-c", "core.hooksPath=" + disabledHooks,
                "commit", "--allow-empty", "--no-verify", "--cleanup=verbatim",
                "-m", "Apply replacement package", "-m", trailers);
        String commit = head(workspace.worktree());
        verifyExactPackageCommit(workspace, journal, commit);
        return commit;
    }

    public String previousTip(GitWorkspace workspace, ReplacementPackageIdentity identity) {
        return loadPackageJournal(workspace, identity).baseHead();
    }

    public void push(GitWorkspace workspace, ReplacementPackageIdentity identity, String commitSha, String expectedRemoteTip) {
        PackageJournal journal = loadPackageJournal(workspace, identity);
        if (expectedRemoteTip != null && !Objects.equals(journal.baseHead(), expectedRemoteTip)) {
            throw new Core.ObsException(Core.STATE_DIVERGED, "Publish lease tip differs from durable package baseHead.");
        }
        verifyExactPackageCommit(workspace, journal, commitSha);
        Path repository = workspace.repositoryTarget().registeredPath();
        String remoteRef = "refs/heads/" + workspace.workBranch();
        String lease = "--force-with-lease=" + remoteRef + ":" + (expectedRemoteTip == null ? "" : expectedRemoteTip);
        GitClient.Result push = git.run(repository, Core.PUBLISH_FAILED, true, Map.of("GIT_TERMINAL_PROMPT", "0"),
                "push", "--porcelain", lease, "origin", commitSha + ":" + remoteRef);
        afterPushAttemptHook.run();
        if (push.exitCode() != 0) throw new Core.ObsException(Core.PUBLISH_FAILED, "Git push failed.\n--- git details ---\n" + push.failureDetails());
    }

    public void setAfterPushAttemptHookForTests(Runnable hook) { afterPushAttemptHook = hook == null ? () -> {} : hook; }

    private PackageJournal loadPackageJournal(GitWorkspace workspace, ReplacementPackageIdentity identity) {
        Path path = packageJournalPath(workspace.workId(), identity.packageId());
        if (!Files.isRegularFile(path, LinkOption.NOFOLLOW_LINKS)) throw new Core.ObsException(Core.STATE_DIVERGED, "Durable package Apply journal is missing for " + identity.packageId() + ".");
        PackageJournal journal = PackageJournal.read(path);
        assertPackageJournal(journal, workspace, identity, null);
        return journal;
    }

    private void assertPackageJournal(PackageJournal journal, GitWorkspace workspace, ReplacementPackageIdentity identity, Core.PackageData pkg) {
        if (!Objects.equals(journal.workId(), workspace.workId().value())
                || !Objects.equals(journal.packageId(), identity.packageId())
                || !Objects.equals(journal.archiveSha256(), identity.archiveSha256())
                || !same(journal.repositoryIdentity(), workspace.repositoryTarget().repositoryIdentity())
                || !samePath(Path.of(journal.worktree()), workspace.worktree())
                || !Objects.equals(journal.branch(), workspace.workBranch())) {
            throw new Core.ObsException(Core.STATE_DIVERGED, "Durable package Apply journal describes a different Work/package/workspace identity.");
        }
        if (pkg != null) {
            if (journal.entries().size() != pkg.manifest().operations().size()) throw new Core.ObsException(Core.STATE_DIVERGED, "Durable package Apply journal operation count differs from package.");
            for (int i = 0; i < journal.entries().size(); i++) {
                JournalEntry e = journal.entries().get(i);
                Core.Operation op = pkg.manifest().operations().get(i);
                if (!Objects.equals(e.path(), op.path()) || !Objects.equals(e.action(), op.action())) {
                    throw new Core.ObsException(Core.STATE_DIVERGED, "Durable package Apply journal operation differs from package at index " + i + ".");
                }
            }
        }
    }

    private PackageJournal createPackageJournal(Core.PackageData pkg, GitWorkspace workspace, String baseHead) {
        List<JournalEntry> entries = new ArrayList<>();
        for (Core.Operation op : pkg.manifest().operations()) {
            Path target = Core.inside(workspace.worktree(), op.path());
            boolean priorExists = Files.isRegularFile(target, LinkOption.NOFOLLOW_LINKS);
            byte[] prior = priorExists ? readBytes(target) : null;
            boolean intendedExists = !"delete".equals(op.action());
            byte[] intended = intendedExists ? pkg.replacement().get(op.path()) : null;
            entries.add(new JournalEntry(op.path(), op.action(), priorExists, prior, intendedExists, intended));
        }
        return new PackageJournal(
                workspace.workId().value(), pkg.manifest().packageId(), pkg.archiveSha256(),
                workspace.repositoryTarget().repositoryIdentity(), workspace.workBranch(), workspace.worktree().toString(),
                baseHead, List.copyOf(entries));
    }

    private List<PackageStateApplier.Operation> packageOperations(Core.PackageData pkg, Path root) {
        List<PackageStateApplier.Operation> out = new ArrayList<>();
        for (Core.Operation op : pkg.manifest().operations()) {
            PackageStateApplier.Action action = switch (op.action()) {
                case "add" -> PackageStateApplier.Action.ADD;
                case "replace" -> PackageStateApplier.Action.REPLACE;
                case "delete" -> PackageStateApplier.Action.DELETE;
                default -> throw new Core.ObsException(Core.PACKAGE_INVALID, "Unsupported action '" + op.action() + "' for " + op.path());
            };
            out.add(new PackageStateApplier.Operation(op.path(), Core.inside(root, op.path()), action,
                    pkg.base().get(op.path()), pkg.replacement().get(op.path())));
        }
        return out;
    }

    private String verifyWorkspaceCleanAtCurrentBranchTip(GitWorkspace workspace) {
        verifyWorkspaceIdentity(workspace);
        String head = head(workspace.worktree());
        String tip = branchTip(workspace);
        if (!Objects.equals(head, tip)) throw new Core.ObsException(Core.STATE_DIVERGED, "Work worktree HEAD differs from deterministic work branch tip.");
        String dirty = git.run(workspace.worktree(), Core.STATE_DIVERGED, "status", "--porcelain", "--untracked-files=all").joined();
        if (!dirty.isBlank()) throw new Core.ObsException(Core.STATE_DIVERGED, "Work worktree is not clean before a new package Apply.");
        return head;
    }

    private void verifyWorkspaceAt(GitWorkspace workspace, String expectedHead, boolean requireClean) {
        verifyWorkspaceIdentity(workspace);
        String head = head(workspace.worktree());
        String tip = branchTip(workspace);
        if (!Objects.equals(head, expectedHead) || !Objects.equals(tip, expectedHead)) throw new Core.ObsException(Core.STATE_DIVERGED, "Work worktree/branch tip differs from durable expected commit " + expectedHead + ".");
        if (requireClean) {
            String dirty = git.run(workspace.worktree(), Core.STATE_DIVERGED, "status", "--porcelain", "--untracked-files=all").joined();
            if (!dirty.isBlank()) throw new Core.ObsException(Core.STATE_DIVERGED, "Work worktree is not clean.");
        }
    }

    private void verifyWorkspaceIdentity(GitWorkspace workspace) {
        Path repository = repositoryRoot(workspace.repositoryTarget().registeredPath());
        if (!same(repositoryIdentity(repository), workspace.repositoryTarget().repositoryIdentity())) throw new Core.ObsException(Core.REPOSITORY_MISMATCH, "GitWorkspace repository origin identity changed.");
        Path worktree = workspace.worktree().toAbsolutePath().normalize();
        if (!Files.isDirectory(worktree)) throw new Core.ObsException(Core.STATE_DIVERGED, "GitWorkspace worktree is missing: " + worktree);
        Path actual = repositoryRoot(worktree);
        if (!samePath(actual, worktree)) throw new Core.ObsException(Core.STATE_DIVERGED, "GitWorkspace worktree root differs from persisted path.");
        if (!same(repositoryIdentity(actual), workspace.repositoryTarget().repositoryIdentity())) throw new Core.ObsException(Core.REPOSITORY_MISMATCH, "GitWorkspace worktree repository identity differs from RepositoryTarget.");
        if (!samePath(gitCommonDir(repository), gitCommonDir(actual))) throw new Core.ObsException(Core.STATE_DIVERGED, "GitWorkspace is attached to a different Git common repository.");
        GitClient.Result symbolic = git.allow(actual, Core.STATE_DIVERGED, "symbolic-ref", "--quiet", "--short", "HEAD");
        if (symbolic.exitCode() != 0 || !Objects.equals(symbolic.first(), workspace.workBranch())) throw new Core.ObsException(Core.STATE_DIVERGED, "GitWorkspace is not on deterministic branch " + workspace.workBranch() + ".");
    }

    private void reconcileWorkspace(Path repository, WorkspaceJournal journal) {
        Path worktree = Path.of(journal.worktree()).toAbsolutePath().normalize();
        String branch = workBranch(new WorkId(journal.workId()));
        String branchRef = "refs/heads/" + branch;
        boolean branchExists = gitRefExists(repository, branchRef);
        if (branchExists) {
            String tip = git.run(repository, Core.STATE_DIVERGED, "rev-parse", "--verify", branchRef + "^{commit}").first();
            if (!Objects.equals(tip, journal.baseCommit())) throw new Core.ObsException(Core.STATE_DIVERGED, "Recovered Work branch tip differs from durable baseCommit.");
        }
        if (Files.exists(worktree, LinkOption.NOFOLLOW_LINKS)) {
            GitClient.Result root = git.allow(worktree, Core.STATE_DIVERGED, "rev-parse", "--show-toplevel");
            if (root.exitCode() == 0 && !root.first().isBlank()) {
                GitWorkspace ws = new GitWorkspace(new WorkId(journal.workId()),
                        new RepositoryTarget(journal.repositoryIdentity(), Path.of(journal.repositoryPath())),
                        journal.targetBranch(), worktree, journal.baseCommit());
                verifyWorkspaceAt(ws, journal.baseCommit(), true);
                return;
            }
            preservePartialWorktree(worktree, workspaceRecoveryDirectory(new WorkId(journal.workId())));
        }
        WorktreeRegistration registration = worktreeRegistration(repository, worktree);
        if (registration != null) {
            String expectedRef = "refs/heads/" + branch;
            if (!Objects.equals(registration.branch(), expectedRef) || !Objects.equals(registration.head(), journal.baseCommit())) throw new Core.ObsException(Core.STATE_DIVERGED, "Journal-owned worktree registration differs from durable branch/base intent.");
            GitClient.Result remove = git.allow(repository, Core.STATE_DIVERGED, "worktree", "remove", "--force", worktree.toString());
            if (remove.exitCode() != 0) throw new Core.ObsException(Core.STATE_DIVERGED, "Cannot clear stale journal-owned worktree registration.\n--- git details ---\n" + remove.failureDetails());
        }
        try { Files.createDirectories(worktree.getParent()); }
        catch (IOException e) { throw new Core.ObsException(Core.STATE_DIVERGED, "Cannot create Work worktree parent.", e); }
        GitClient.Result add = branchExists
                ? git.allow(repository, Core.STATE_DIVERGED, "worktree", "add", worktree.toString(), branch)
                : git.allow(repository, Core.STATE_DIVERGED, "worktree", "add", "-b", branch, worktree.toString(), journal.baseCommit());
        if (add.exitCode() != 0) throw new Core.ObsException(Core.STATE_DIVERGED, "Cannot create/recover Work branch/worktree.\n--- git details ---\n" + add.failureDetails());
    }

    private record WorktreeRegistration(Path path, String head, String branch) {}
    private WorktreeRegistration worktreeRegistration(Path repository, Path expected) {
        List<String> lines = git.run(repository, Core.STATE_DIVERGED, "worktree", "list", "--porcelain").stdout();
        Path path = null; String head = null; String branch = null;
        for (int i = 0; i <= lines.size(); i++) {
            String line = i == lines.size() ? "" : lines.get(i);
            if (line.isBlank()) {
                if (path != null && samePath(path, expected)) return new WorktreeRegistration(path, head, branch);
                path = null; head = null; branch = null; continue;
            }
            if (line.startsWith("worktree ")) path = Path.of(line.substring("worktree ".length()));
            else if (line.startsWith("HEAD ")) head = line.substring("HEAD ".length()).trim();
            else if (line.startsWith("branch ")) branch = line.substring("branch ".length()).trim();
        }
        return null;
    }

    private void preservePartialWorktree(Path worktree, Path recoveryRoot) {
        try {
            Files.createDirectories(recoveryRoot);
            Path recovery = recoveryRoot.resolve("partial-" + UUID.randomUUID());
            try { Files.move(worktree, recovery, StandardCopyOption.ATOMIC_MOVE); }
            catch (AtomicMoveNotSupportedException e) { Files.move(worktree, recovery); }
        } catch (IOException e) {
            throw new Core.ObsException(Core.STATE_DIVERGED, "Cannot preserve partial journal-owned Work worktree.", e);
        }
    }

    private void verifyExactPackageCommit(GitWorkspace workspace, PackageJournal journal, String commit) {
        verifyWorkspaceIdentity(workspace);
        if (!Objects.equals(head(workspace.worktree()), commit) || !Objects.equals(branchTip(workspace), commit)) throw new Core.ObsException(Core.STATE_DIVERGED, "Expected package commit is not exact worktree/branch tip.");
        String parents = git.run(workspace.worktree(), Core.STATE_DIVERGED, "rev-list", "--parents", "-n", "1", commit).first();
        String[] parts = parents.isBlank() ? new String[0] : parents.split("\\s+");
        if (parts.length != 2 || !Objects.equals(parts[1], journal.baseHead())) throw new Core.ObsException(Core.STATE_DIVERGED, "Package commit is not a single-parent child of durable package baseHead.");
        if (!commitHasExactTrailers(workspace.worktree(), commit, journal.packageId(), journal.workId())) throw new Core.ObsException(Core.STATE_DIVERGED, "Package commit trailers do not prove exact package/Work identity.");
        Set<String> allowed = journalPathSet(journal);
        for (String path : gitNulPaths(workspace.worktree(), "diff", "--name-only", "-z", journal.baseHead(), commit, "--")) if (!allowed.contains(path)) throw new Core.ObsException(Core.STATE_DIVERGED, "Package commit changed a path outside durable package paths: " + path);
        GitClient.Result index = git.allow(workspace.worktree(), Core.STATE_DIVERGED, "diff", "--cached", "--quiet");
        if (index.exitCode() != 0) throw new Core.ObsException(Core.STATE_DIVERGED, "Package commit recovery requires a clean Git index.");
        if (journalState(journal) != JournalState.INTENDED) throw new Core.ObsException(Core.STATE_DIVERGED, "Package commit worktree no longer matches durable intended state.");
        if (!gitNulPaths(workspace.worktree(), "diff", "--name-only", "-z", "HEAD", "--").isEmpty()
                || !gitNulPaths(workspace.worktree(), "ls-files", "--others", "-z", "--").isEmpty()) throw new Core.ObsException(Core.STATE_DIVERGED, "Package commit worktree contains changes after expected commit.");
    }

    private boolean commitHasExactTrailers(Path worktree, String commit, String packageId, String workId) {
        String message = git.run(worktree, Core.STATE_DIVERGED, "show", "-s", "--format=%B", commit).joined() + "\n";
        List<String> parsed = git.stdin(worktree, Core.STATE_DIVERGED, message.getBytes(StandardCharsets.UTF_8), "interpret-trailers", "--parse").stdout();
        int packages = 0, works = 0;
        for (String line : parsed) {
            int colon = line.indexOf(':'); if (colon < 0) continue;
            String key = line.substring(0, colon).trim(), value = line.substring(colon + 1).trim();
            if (key.equalsIgnoreCase("Package-Id")) { if (!key.equals("Package-Id") || !value.equals(packageId)) return false; packages++; }
            if (key.equalsIgnoreCase("ChangeSet-Id")) { if (!key.equals("ChangeSet-Id") || !value.equals(workId)) return false; works++; }
        }
        return packages == 1 && works == 1;
    }

    private void assertOnlyJournalPathsDirty(Path worktree, PackageJournal journal) {
        Set<String> allowed = journalPathSet(journal);
        Set<String> dirty = new LinkedHashSet<>();
        dirty.addAll(gitNulPaths(worktree, "diff", "--name-only", "-z", "HEAD", "--"));
        dirty.addAll(gitNulPaths(worktree, "ls-files", "--others", "-z", "--"));
        for (String path : dirty) if (!allowed.contains(path)) throw new Core.ObsException(Core.STATE_DIVERGED, "Package operation found unrelated worktree change: " + path);
    }

    private void assertOnlyJournalPathsStaged(Path worktree, PackageJournal journal) {
        Set<String> allowed = journalPathSet(journal);
        for (String path : gitNulPaths(worktree, "diff", "--cached", "--name-only", "-z", "HEAD", "--")) if (!allowed.contains(path)) throw new Core.ObsException(Core.STATE_DIVERGED, "Commit found staged path outside durable package paths: " + path);
    }

    private void stageJournalPaths(Path worktree, PackageJournal journal) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            for (JournalEntry e : journal.entries()) { out.write(e.path().getBytes(StandardCharsets.UTF_8)); out.write(0); }
            git.stdin(worktree, Core.COMMIT_FAILED, out.toByteArray(), "add", "-f", "-A", "--pathspec-from-file=-", "--pathspec-file-nul");
        } catch (IOException impossible) { throw new AssertionError(impossible); }
    }

    private Set<String> journalPathSet(PackageJournal journal) {
        Set<String> out = new LinkedHashSet<>(); for (JournalEntry e : journal.entries()) out.add(e.path()); return out;
    }

    private Set<String> gitNulPaths(Path repo, String... args) {
        byte[] output = git.bytes(repo, Core.STATE_DIVERGED, args).output();
        Set<String> paths = new LinkedHashSet<>(); int start = 0;
        for (int i = 0; i <= output.length; i++) if (i == output.length || output[i] == 0) {
            if (i > start) {
                byte[] raw = Arrays.copyOfRange(output, start, i);
                try { paths.add(StandardCharsets.UTF_8.newDecoder().onMalformedInput(CodingErrorAction.REPORT).onUnmappableCharacter(CodingErrorAction.REPORT).decode(ByteBuffer.wrap(raw)).toString()); }
                catch (CharacterCodingException e) { throw new Core.ObsException(Core.STATE_DIVERGED, "Git returned non-UTF-8 repository path.", e); }
            }
            start = i + 1;
        }
        return paths;
    }

    private enum JournalState { PRIOR, INTENDED, MIXED, OTHER }
    private JournalState journalState(PackageJournal journal) {
        boolean anyPrior = false, anyIntended = false;
        for (JournalEntry e : journal.entries()) {
            boolean prior = matches(e.path(), e.priorExists(), e.priorBytes(), journal);
            boolean intended = matches(e.path(), e.intendedExists(), e.intendedBytes(), journal);
            if (!prior && !intended) return JournalState.OTHER;
            anyPrior |= prior && !intended;
            anyIntended |= intended && !prior;
        }
        if (anyPrior && anyIntended) return JournalState.MIXED;
        if (anyIntended) return JournalState.INTENDED;
        if (anyPrior) return JournalState.PRIOR;
        return JournalState.INTENDED; // prior == intended for all entries: result is already satisfied.
    }

    private boolean matches(String path, boolean expectedExists, byte[] expectedBytes, PackageJournal journal) {
        Path target = Core.inside(Path.of(journal.worktree()), path);
        boolean exists = Files.isRegularFile(target, LinkOption.NOFOLLOW_LINKS);
        return exists == expectedExists && (!exists || Arrays.equals(readBytes(target), expectedBytes));
    }

    private void restorePrior(PackageJournal journal) {
        for (JournalEntry e : journal.entries()) {
            Path target = Core.inside(Path.of(journal.worktree()), e.path());
            try {
                if (!e.priorExists()) Files.deleteIfExists(target);
                else { if (target.getParent() != null) Files.createDirectories(target.getParent()); Files.write(target, e.priorBytes(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING); }
            } catch (IOException ex) { throw new Core.ObsException(Core.APPLY_ROLLBACK_UNVERIFIED, "Cannot restore durable prior package bytes for " + e.path() + ".", ex); }
        }
        if (journalState(journal) != JournalState.PRIOR) throw new Core.ObsException(Core.APPLY_ROLLBACK_UNVERIFIED, "Durable prior package state could not be restored.");
    }

    private void requireExpectedSource(Path repo, String path, byte[] expected, byte[] actual) {
        if (Arrays.equals(expected, actual)) return;
        GitClient.Result a = git.stdinAllow(repo, Core.SOURCE_STATE_UNVERIFIABLE, expected, "hash-object", "--stdin", "--path=" + path);
        GitClient.Result b = git.stdinAllow(repo, Core.SOURCE_STATE_UNVERIFIABLE, actual, "hash-object", "--stdin", "--path=" + path);
        if (a.exitCode() != 0 || b.exitCode() != 0 || a.first().isBlank() || b.first().isBlank()) throw new Core.ObsException(Core.SOURCE_STATE_UNVERIFIABLE, "Source state could not be safely verified for " + path + ".");
        if (!a.first().equalsIgnoreCase(b.first())) throw new Core.ObsException(Core.SOURCE_STATE_CHANGED, "Source state changed since the package was prepared: " + path);
    }

    private static Core.ObsException mapPackageStateFailure(Throwable failure) {
        if (failure instanceof Core.ObsException o) return o;
        if (failure instanceof PackageStateApplier.ApplyException e) return switch (e.reason()) {
            case ADD_TARGET_EXISTS -> new Core.ObsException(Core.BASE_MISMATCH, "Add target already exists: " + e.path());
            case SOURCE_NOT_REGULAR -> new Core.ObsException(Core.SOURCE_STATE_CHANGED, "Expected source path is missing: " + e.path());
            case PREPARE_IO -> new Core.ObsException(Core.STATE_DIVERGED, e.getMessage(), e);
            case MUTATION_FAILED -> new Core.ObsException(Core.RESULT_MISMATCH, e.getMessage(), e);
            case RESULT_MISMATCH -> new Core.ObsException(Core.RESULT_MISMATCH, e.getMessage(), e);
            case ROLLBACK_FAILED -> new Core.ObsException(Core.APPLY_ROLLBACK_UNVERIFIED, "Apply failed and rollback could not be verified.", e);
        };
        return new Core.ObsException(Core.INTERNAL_ERROR, failure.getMessage() == null ? failure.toString() : failure.getMessage(), failure);
    }

    private Path repositoryRoot(Path requested) {
        GitClient.Result r = git.allow(requested, Core.REPOSITORY_MISMATCH, "rev-parse", "--show-toplevel");
        if (r.exitCode() != 0 || r.first().isBlank()) throw new Core.ObsException(Core.REPOSITORY_MISMATCH, "Not a Git work tree: " + requested + ".");
        return Path.of(r.first()).toAbsolutePath().normalize();
    }
    private void requireRepositoryReady(Path repo) { GitClient.Result r = git.allow(repo, Core.REPOSITORY_NOT_READY, "rev-parse", "--verify", "HEAD"); if (r.exitCode() != 0 || r.first().isBlank()) throw new Core.ObsException(Core.REPOSITORY_NOT_READY, "Repository has no commits."); }
    private String resolveLocalBranchTip(Path repo, String branch) { GitClient.Result r = git.allow(repo, Core.REPOSITORY_NOT_READY, "rev-parse", "--verify", "refs/heads/" + branch + "^{commit}"); if (r.exitCode() != 0 || r.first().isBlank()) throw new Core.ObsException(Core.REPOSITORY_NOT_READY, "Target branch does not resolve to a local commit: " + branch); return r.first(); }
    private void validateBranchName(Path repo, String branch) { if (git.allow(repo, Core.STATE_DIVERGED, "check-ref-format", "--branch", branch).exitCode() != 0) throw new Core.ObsException(Core.STATE_DIVERGED, "Invalid target branch name: " + branch); }
    private boolean gitRefExists(Path repo, String ref) { return git.allow(repo, Core.STATE_DIVERGED, "show-ref", "--verify", "--quiet", ref).exitCode() == 0; }
    private String head(Path worktree) { return git.run(worktree, Core.STATE_DIVERGED, "rev-parse", "HEAD").first(); }
    private String branchTip(GitWorkspace workspace) { return git.run(workspace.repositoryTarget().registeredPath(), Core.STATE_DIVERGED, "rev-parse", "--verify", "refs/heads/" + workspace.workBranch() + "^{commit}").first(); }
    private Path gitCommonDir(Path repo) { String s = git.run(repo, Core.STATE_DIVERGED, "rev-parse", "--git-common-dir").first(); Path p = Path.of(s); if (!p.isAbsolute()) p = repo.resolve(p); try { return p.toRealPath(); } catch (IOException e) { throw new Core.ObsException(Core.STATE_DIVERGED, "Cannot resolve Git common directory.", e); } }
    private String repositoryIdentity(Path repo) { GitClient.Result r = git.allow(repo, Core.REPOSITORY_MISMATCH, "config", "--get", "remote.origin.url"); if (r.exitCode() != 0 || r.first().isBlank()) throw new Core.ObsException(Core.REPOSITORY_MISMATCH, "remote.origin.url is missing."); return repositoryIdentityFromUrl(r.first()); }
    private static String repositoryIdentityFromUrl(String u) { Pattern[] ps = { Pattern.compile("^https?://github\\.com/([^/]+)/([^/]+?)(?:\\.git)?/?$", Pattern.CASE_INSENSITIVE), Pattern.compile("^git@github\\.com:([^/]+)/([^/]+?)(?:\\.git)?$", Pattern.CASE_INSENSITIVE), Pattern.compile("^ssh://git@github\\.com/([^/]+)/([^/]+?)(?:\\.git)?/?$", Pattern.CASE_INSENSITIVE) }; for (Pattern p : ps) { Matcher m = p.matcher(u); if (m.matches()) return "github:" + m.group(1) + "/" + m.group(2); } throw new Core.ObsException(Core.REPOSITORY_MISMATCH, "Unsupported origin for repositoryIdentity: " + u); }
    private static boolean same(String a, String b) { return a != null && b != null && a.equalsIgnoreCase(b); }
    private static boolean samePath(Path a, Path b) { try { return a.toRealPath().equals(b.toRealPath()); } catch (IOException e) { return a.toAbsolutePath().normalize().equals(b.toAbsolutePath().normalize()); } }
    private static String workBranch(WorkId workId) { return "changeset/" + workId.value(); }
    private Path workspaceJournalDirectory() { return stateRoot.resolve("workspace-journals"); }
    private Path packageJournalDirectory() { return stateRoot.resolve("package-apply-journals"); }
    private Path worktreeDirectory() { return stateRoot.resolve("worktrees"); }
    private Path workspaceJournalPath(WorkId workId) { return workspaceJournalDirectory().resolve("w-" + workId.value() + ".properties"); }
    private Path worktreePath(WorkId workId) { return worktreeDirectory().resolve("w-" + workId.value()).toAbsolutePath().normalize(); }
    private Path workspaceRecoveryDirectory(WorkId workId) { return stateRoot.resolve("workspace-recovery").resolve("w-" + workId.value()); }
    private Path packageJournalPath(WorkId workId, String packageId) { return packageJournalDirectory().resolve("w-" + workId.value()).resolve("p-" + packageId + ".properties"); }
    private static byte[] readBytes(Path path) { try { return Files.readAllBytes(path); } catch (IOException e) { throw new Core.ObsException(Core.STATE_DIVERGED, "Cannot read file: " + path, e); } }

    private record WorkspaceJournal(String workId, String repositoryIdentity, String repositoryPath, String targetBranch, String worktree, String baseCommit) {
        void write(Path path) { Properties p = new Properties(); p.setProperty("schemaVersion", "1"); p.setProperty("workId", workId); p.setProperty("repositoryIdentity", repositoryIdentity); p.setProperty("repositoryPath", repositoryPath); p.setProperty("targetBranch", targetBranch); p.setProperty("worktree", worktree); p.setProperty("baseCommit", baseCommit); writeProperties(path, p, "OBS Work Workspace Journal v1"); }
        static WorkspaceJournal read(Path path) { Properties p = readProperties(path); if (!"1".equals(p.getProperty("schemaVersion"))) throw new Core.ObsException(Core.STATE_DIVERGED, "Unsupported Work workspace journal schema."); return new WorkspaceJournal(required(p,"workId"),required(p,"repositoryIdentity"),required(p,"repositoryPath"),required(p,"targetBranch"),required(p,"worktree"),required(p,"baseCommit")); }
    }

    private void assertWorkspaceJournalRequest(WorkspaceJournal j, Core.RepositoryConfig target, WorkId workId, String targetBranch) {
        if (!j.workId().equals(workId.value()) || !same(j.repositoryIdentity(), target.repositoryIdentity()) || !samePath(Path.of(j.repositoryPath()), Path.of(target.path())) || !j.targetBranch().equals(targetBranch) || !samePath(Path.of(j.worktree()), worktreePath(workId))) throw new Core.ObsException(Core.STATE_DIVERGED, "Existing Work workspace journal describes a different request.");
    }

    private record JournalEntry(String path, String action, boolean priorExists, byte[] priorBytes, boolean intendedExists, byte[] intendedBytes) {
        JournalEntry { priorBytes = priorBytes == null ? null : priorBytes.clone(); intendedBytes = intendedBytes == null ? null : intendedBytes.clone(); }
        @Override public byte[] priorBytes() { return priorBytes == null ? null : priorBytes.clone(); }
        @Override public byte[] intendedBytes() { return intendedBytes == null ? null : intendedBytes.clone(); }
    }

    private record PackageJournal(String workId, String packageId, String archiveSha256, String repositoryIdentity, String branch, String worktree, String baseHead, List<JournalEntry> entries) {
        void write(Path path) {
            Properties p = new Properties(); p.setProperty("schemaVersion","1"); p.setProperty("workId",workId); p.setProperty("packageId",packageId); p.setProperty("archiveSha256",archiveSha256); p.setProperty("repositoryIdentity",repositoryIdentity); p.setProperty("branch",branch); p.setProperty("worktree",worktree); p.setProperty("baseHead",baseHead); p.setProperty("entryCount",Integer.toString(entries.size()));
            Base64.Encoder enc = Base64.getEncoder();
            for (int i=0;i<entries.size();i++) { JournalEntry e=entries.get(i); String x="entry."+i+"."; p.setProperty(x+"path",e.path()); p.setProperty(x+"action",e.action()); p.setProperty(x+"priorExists",Boolean.toString(e.priorExists())); if(e.priorExists())p.setProperty(x+"priorBase64",enc.encodeToString(e.priorBytes())); p.setProperty(x+"intendedExists",Boolean.toString(e.intendedExists())); if(e.intendedExists())p.setProperty(x+"intendedBase64",enc.encodeToString(e.intendedBytes())); }
            writeProperties(path,p,"OBS Package Apply Journal v1");
        }
        static PackageJournal read(Path path) {
            Properties p=readProperties(path); if(!"1".equals(p.getProperty("schemaVersion")))throw new Core.ObsException(Core.STATE_DIVERGED,"Unsupported package Apply journal schema."); int n=Integer.parseInt(required(p,"entryCount")); List<JournalEntry> entries=new ArrayList<>(); Base64.Decoder dec=Base64.getDecoder();
            for(int i=0;i<n;i++){String x="entry."+i+".";boolean pe=Boolean.parseBoolean(required(p,x+"priorExists")),ie=Boolean.parseBoolean(required(p,x+"intendedExists"));byte[] pb=pe?dec.decode(required(p,x+"priorBase64")):null,ib=ie?dec.decode(required(p,x+"intendedBase64")):null;entries.add(new JournalEntry(required(p,x+"path"),required(p,x+"action"),pe,pb,ie,ib));}
            return new PackageJournal(required(p,"workId"),required(p,"packageId"),required(p,"archiveSha256"),required(p,"repositoryIdentity"),required(p,"branch"),required(p,"worktree"),required(p,"baseHead"),List.copyOf(entries));
        }
    }

    private static void writeProperties(Path target, Properties p, String comment) {
        Path tmp = target.resolveSibling(target.getFileName() + ".tmp-" + UUID.randomUUID());
        try { Files.createDirectories(target.getParent()); try(OutputStream out=Files.newOutputStream(tmp,StandardOpenOption.CREATE_NEW)){p.store(out,comment);} try{Files.move(tmp,target,StandardCopyOption.ATOMIC_MOVE,StandardCopyOption.REPLACE_EXISTING);}catch(AtomicMoveNotSupportedException e){Files.move(tmp,target,StandardCopyOption.REPLACE_EXISTING);} }
        catch(IOException e){try{Files.deleteIfExists(tmp);}catch(IOException ignored){}throw new Core.ObsException(Core.STATE_DIVERGED,"Cannot persist runtime journal: "+target.getFileName(),e);}
    }
    private static Properties readProperties(Path path) { Properties p=new Properties(); try(InputStream in=Files.newInputStream(path)){p.load(in);return p;}catch(IOException|RuntimeException e){throw new Core.ObsException(Core.STATE_DIVERGED,"Cannot read runtime journal: "+path.getFileName(),e);} }
    private static String required(Properties p,String key){String v=p.getProperty(key);if(v==null||v.isBlank())throw new Core.ObsException(Core.STATE_DIVERGED,"Missing runtime journal field: "+key);return v;}
}
