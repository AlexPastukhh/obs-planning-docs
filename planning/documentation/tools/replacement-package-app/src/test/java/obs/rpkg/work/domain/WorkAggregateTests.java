package obs.rpkg.work.domain;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

import obs.rpkg.features.apply.domain.PublicationObservation;
import obs.rpkg.features.apply.domain.ReplacementPackageIdentity;
import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.features.apply.infrastructure.FileReplacementPackageStateRepository;
import obs.rpkg.work.infrastructure.FileWorkOperationLock;

public final class WorkAggregateTests {
    private static int passed;
    private static int failed;

    public static void main(String[] args) {
        run("WorkId is the only logical work correlation identity", WorkAggregateTests::workId);
        run("GitWorkspace owns only Git workspace facts and derives work branch", WorkAggregateTests::workspaceShape);
        run("ReplacementPackageState existence means Applied", WorkAggregateTests::packageStateShape);
        run("publication proof is independent evidence", WorkAggregateTests::publicationEvidence);
        run("re-proving the same commit preserves publication evidence", WorkAggregateTests::sameCommitPreservesPublicationEvidence);
        run("exact archive identity is mandatory", WorkAggregateTests::exactArchiveRequired);
        run("one Work cannot have two unfinished package realizations", WorkAggregateTests::oneUnfinishedPackage);
        run("state lookup fails closed when persisted identity disagrees with its key", WorkAggregateTests::stateLookupIdentityFence);
        run("per-Work lock serializes independent repository instances", WorkAggregateTests::perWorkLockSerializesRepositories);
        run("per-Work lock is re-entrant on the same thread", WorkAggregateTests::perWorkLockIsReentrant);
        run("concurrent repository instances cannot create two unfinished packages", WorkAggregateTests::concurrentSavePreservesInvariant);
        run("new state namespace does not read schema-1 legacy files", WorkAggregateTests::noLegacyStateRead);
        System.out.println("RESULT passed=" + passed + " failed=" + failed);
        if (failed > 0) System.exit(1);
    }

    private static void workId() {
        WorkId id = new WorkId("ecc49ba1-2b1d-4915-88bd-9a7d66c5bdba");
        eq(id.value(), "ecc49ba1-2b1d-4915-88bd-9a7d66c5bdba", "work identity changed");
        throwsType(IllegalArgumentException.class, () -> new WorkId("bad/work"));
    }

    private static void workspaceShape() {
        WorkId workId = new WorkId("work-1");
        RepositoryTarget target = new RepositoryTarget("github:a/b", Path.of(".").toAbsolutePath());
        GitWorkspace workspace = new GitWorkspace(workId, target, "main", Path.of(".").toAbsolutePath(), "BASE");
        eq(workspace.workBranch(), "changeset/work-1", "derived branch");
        Set<String> components = Arrays.stream(GitWorkspace.class.getRecordComponents())
                .map(c -> c.getName()).collect(Collectors.toSet());
        eq(components, Set.of("workId", "repositoryTarget", "targetBranch", "worktree", "baseCommit"),
                "GitWorkspace acquired unrelated state");
    }

    private static void packageStateShape() {
        WorkId workId = new WorkId("work-2");
        ReplacementPackageState state = new ReplacementPackageState(
                workId, new ReplacementPackageIdentity("pkg", "HASH"), null,
                new PublicationObservation.NotRequested());
        ok(!state.isCommitted(), "new Applied state is committed");
        Set<String> components = Arrays.stream(ReplacementPackageState.class.getRecordComponents())
                .map(c -> c.getName()).collect(Collectors.toSet());
        eq(components, Set.of("workId", "packageIdentity", "commitSha", "publication"),
                "package state should not carry applied/changeSet progress fields");
    }

    private static void publicationEvidence() {
        ReplacementPackageState committed = new ReplacementPackageState(
                new WorkId("work-3"), new ReplacementPackageIdentity("pkg", "HASH"), null,
                new PublicationObservation.NotRequested()).committed("ABC");
        ok(!committed.isPublished(), "commit implied publication");
        ok(!committed.withPublication(new PublicationObservation.ConfirmedAbsent()).isPublished(),
                "confirmed absence counted as published");
        ok(!committed.withPublication(new PublicationObservation.ConfirmedTip("BASE")).isPublished(),
                "different confirmed tip counted as published");
        ok(committed.withPublication(new PublicationObservation.ConfirmedTip("ABC")).isPublished(),
                "exact confirmed tip not published");
    }


    private static void sameCommitPreservesPublicationEvidence() {
        ReplacementPackageState uncertain = new ReplacementPackageState(
                new WorkId("work-3b"), new ReplacementPackageIdentity("pkg", "HASH"), null,
                new PublicationObservation.NotRequested())
                .committed("ABC")
                .withPublication(new PublicationObservation.NotConfirmed());

        ReplacementPackageState reproved = uncertain.committed("ABC");
        eq(reproved, uncertain, "re-proving the same commit changed durable state");
        ok(reproved.publication() instanceof PublicationObservation.NotConfirmed,
                "re-proving the same commit erased publication evidence");
    }

    private static void exactArchiveRequired() {
        throwsType(NullPointerException.class, () -> new ReplacementPackageIdentity("pkg", null));
        throwsType(IllegalArgumentException.class, () -> new ReplacementPackageIdentity("pkg", " "));
    }

    private static void oneUnfinishedPackage() throws Exception {
        Path root = Files.createTempDirectory("rpkg-work-state-");
        try {
            FileReplacementPackageStateRepository repo = new FileReplacementPackageStateRepository(root);
            WorkId work = new WorkId("work-4");
            ReplacementPackageState p1 = new ReplacementPackageState(
                    work, new ReplacementPackageIdentity("p1", "H1"), null,
                    new PublicationObservation.NotRequested());
            ReplacementPackageState p2 = new ReplacementPackageState(
                    work, new ReplacementPackageIdentity("p2", "H2"), null,
                    new PublicationObservation.NotRequested());
            ok(repo.save(p1).isSuccess(), "first unfinished save failed");
            ok(repo.save(p2).isFailure(), "second unfinished package was accepted");

            ReplacementPackageState p1Published = p1.committed("C1")
                    .withPublication(new PublicationObservation.ConfirmedTip("C1"));
            ok(repo.save(p1Published).isSuccess(), "completion save failed");
            ok(repo.save(p2).isSuccess(), "next package rejected after previous completion");
            eq(repo.findUnfinished(work).orElseThrow().packageIdentity().packageId(), "p2",
                    "wrong unfinished package");
        } finally {
            deleteTree(root);
        }
    }


    private static void stateLookupIdentityFence() throws Exception {
        Path root = Files.createTempDirectory("rpkg-state-key-fence-");
        try {
            FileReplacementPackageStateRepository repo = new FileReplacementPackageStateRepository(root);
            WorkId work = new WorkId("work-identity");
            ReplacementPackageState state = new ReplacementPackageState(
                    work, new ReplacementPackageIdentity("pkg-identity", "HASH"), null,
                    new PublicationObservation.NotRequested());
            ok(repo.save(state).isSuccess(), "fixture state save failed");
            Path persisted;
            try (var files = Files.walk(root)) {
                persisted = files.filter(Files::isRegularFile)
                        .filter(path -> path.getFileName().toString().endsWith(".properties"))
                        .findFirst().orElseThrow();
            }

            Files.writeString(persisted,
                    "schemaVersion=2\nworkId=other-work\npackageId=pkg-identity\narchiveSha256=HASH\npublicationKind=NOT_REQUESTED\n");
            throwsType(IllegalStateException.class, () -> repo.find(work, "pkg-identity"));

            Files.writeString(persisted,
                    "schemaVersion=2\nworkId=work-identity\npackageId=other-package\narchiveSha256=HASH\npublicationKind=NOT_REQUESTED\n");
            throwsType(IllegalStateException.class, () -> repo.find(work, "pkg-identity"));
        } finally {
            deleteTree(root);
        }
    }

    private static void perWorkLockSerializesRepositories() throws Exception {
        Path root = Files.createTempDirectory("rpkg-work-lock-");
        try {
            FileWorkOperationLock first = new FileWorkOperationLock(root);
            FileWorkOperationLock second = new FileWorkOperationLock(root);
            WorkId work = new WorkId("work-lock");
            CountDownLatch started = new CountDownLatch(1);
            AtomicBoolean acquired = new AtomicBoolean(false);
            Thread contender;
            try (var ignored = first.lock(work)) {
                contender = new Thread(() -> {
                    started.countDown();
                    try (var ignoredSecond = second.lock(work)) { acquired.set(true); }
                }, "rpkg-work-lock-contender");
                contender.start();
                ok(started.await(2, TimeUnit.SECONDS), "contender did not start");
                Thread.sleep(150);
                ok(!acquired.get(), "independent repository instance entered the same Work boundary concurrently");
            }
            contender.join(2000);
            ok(acquired.get(), "contender did not acquire Work lock after release");
        } finally {
            deleteTree(root);
        }
    }

    private static void perWorkLockIsReentrant() throws Exception {
        Path root = Files.createTempDirectory("rpkg-work-lock-reentrant-");
        try {
            FileWorkOperationLock locks = new FileWorkOperationLock(root);
            WorkId work = new WorkId("work-lock-reentrant");
            try (var outer = locks.lock(work)) {
                try (var inner = locks.lock(work)) {
                    ok(true, "re-entrant acquisition failed");
                }
                try (var again = locks.lock(work)) {
                    ok(true, "outer lock was released by inner close");
                }
            }
        } finally {
            deleteTree(root);
        }
    }

    private static void concurrentSavePreservesInvariant() throws Exception {
        Path root = Files.createTempDirectory("rpkg-work-save-race-");
        try {
            FileReplacementPackageStateRepository first = new FileReplacementPackageStateRepository(root);
            FileReplacementPackageStateRepository second = new FileReplacementPackageStateRepository(root);
            WorkId work = new WorkId("work-race");
            ReplacementPackageState p1 = new ReplacementPackageState(
                    work, new ReplacementPackageIdentity("p1", "H1"), null,
                    new PublicationObservation.NotRequested());
            ReplacementPackageState p2 = new ReplacementPackageState(
                    work, new ReplacementPackageIdentity("p2", "H2"), null,
                    new PublicationObservation.NotRequested());
            CountDownLatch start = new CountDownLatch(1);
            @SuppressWarnings("unchecked")
            obs.rpkg.foundation.result.OperationResult<obs.rpkg.features.apply.infrastructure.ReplacementPackageStateRepository.Failure>[] results =
                    new obs.rpkg.foundation.result.OperationResult[2];
            Thread a = new Thread(() -> { await(start); results[0] = first.save(p1); }, "rpkg-save-p1");
            Thread b = new Thread(() -> { await(start); results[1] = second.save(p2); }, "rpkg-save-p2");
            a.start();
            b.start();
            start.countDown();
            a.join(3000);
            b.join(3000);
            ok(results[0] != null && results[1] != null, "concurrent saves did not finish");
            int successes = (results[0].isSuccess() ? 1 : 0) + (results[1].isSuccess() ? 1 : 0);
            eq(successes, 1, "concurrent saves created more than one unfinished package");
            ok(first.findUnfinished(work).isPresent(), "winning unfinished package was not persisted");
        } finally {
            deleteTree(root);
        }
    }

    private static void await(CountDownLatch latch) {
        try { latch.await(); }
        catch (InterruptedException e) { Thread.currentThread().interrupt(); throw new RuntimeException(e); }
    }

    private static void noLegacyStateRead() throws Exception {
        Path root = Files.createTempDirectory("rpkg-work-state-v2-");
        try {
            Path old = root.resolve("replacement-package-states");
            Files.createDirectories(old);
            Files.writeString(old.resolve("work-5--pkg.properties"),
                    "schemaVersion=1\nchangeSetId=work-5\npackageId=pkg\napplied=true\npublicationKind=NOT_REQUESTED\n");
            FileReplacementPackageStateRepository repo = new FileReplacementPackageStateRepository(root);
            ok(repo.find(new WorkId("work-5"), "pkg").isEmpty(), "legacy state was imported/read");
        } finally {
            deleteTree(root);
        }
    }

    private static void deleteTree(Path root) throws Exception {
        if (root == null || !Files.exists(root)) return;
        try (var stream = Files.walk(root)) {
            for (Path p : stream.sorted(java.util.Comparator.reverseOrder()).toList()) Files.deleteIfExists(p);
        }
    }

    private interface Throwing { void run() throws Exception; }
    private static void run(String name, Throwing body) {
        try { body.run(); passed++; System.out.println("PASS " + name); }
        catch (Throwable t) { failed++; System.out.println("FAIL " + name + " :: " + t); if (Boolean.getBoolean("obs.tests.stack")) t.printStackTrace(System.out); }
    }
    private static void ok(boolean v, String message) { if (!v) throw new AssertionError(message); }
    private static void eq(Object actual, Object expected, String message) { if (!Objects.equals(actual, expected)) throw new AssertionError(message + " expected=" + expected + " actual=" + actual); }
    private static void throwsType(Class<? extends Throwable> type, Throwing body) {
        try { body.run(); throw new AssertionError("expected " + type.getSimpleName()); }
        catch (Throwable t) { if (t instanceof AssertionError) throw (AssertionError)t; if (!type.isInstance(t)) throw new AssertionError("expected " + type.getSimpleName() + " got " + t, t); }
    }
}
