package obs.rpkg.work.infrastructure;

import java.io.IOException;
import java.nio.channels.FileChannel;
import java.nio.channels.FileLock;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

import obs.rpkg.work.application.port.WorkOperationLock;
import obs.rpkg.work.domain.WorkId;

/** Durable per-Work application-operation lock. */
public final class FileWorkOperationLock implements WorkOperationLock {
    private static final ConcurrentHashMap<Path, ReentrantLock> JVM_LOCKS = new ConcurrentHashMap<>();
    private static final ThreadLocal<Map<Path, HeldLock>> HELD_LOCKS = ThreadLocal.withInitial(HashMap::new);

    private final Path lockDirectory;

    public FileWorkOperationLock(Path appStateRoot) {
        if (appStateRoot == null) throw new IllegalArgumentException("appStateRoot is required");
        lockDirectory = appStateRoot.toAbsolutePath().normalize().resolve("work-state-v2").resolve("work-locks");
        try { Files.createDirectories(lockDirectory); }
        catch (IOException e) { throw new IllegalStateException("Cannot initialize Work operation lock directory", e); }
    }

    @Override
    public Lock lock(WorkId workId) {
        if (workId == null) throw new IllegalArgumentException("workId is required");
        Path path = lockDirectory.resolve("w-" + workId.value() + ".lock").toAbsolutePath().normalize();
        Map<Path, HeldLock> heldByThread = HELD_LOCKS.get();
        HeldLock alreadyHeld = heldByThread.get(path);
        if (alreadyHeld != null) {
            alreadyHeld.depth++;
            return new LockToken(path);
        }

        ReentrantLock local = JVM_LOCKS.computeIfAbsent(path, ignored -> new ReentrantLock(true));
        local.lock();
        FileChannel channel = null;
        try {
            Files.createDirectories(path.getParent());
            channel = FileChannel.open(path, StandardOpenOption.CREATE, StandardOpenOption.WRITE);
            FileLock fileLock = channel.lock();
            heldByThread.put(path, new HeldLock(local, channel, fileLock));
            return new LockToken(path);
        } catch (IOException | RuntimeException e) {
            if (channel != null) try { channel.close(); } catch (IOException ignored) {}
            local.unlock();
            throw new IllegalStateException("Cannot acquire Work operation lock for " + workId, e);
        }
    }

    private static final class HeldLock {
        private final ReentrantLock local;
        private final FileChannel channel;
        private final FileLock fileLock;
        private int depth = 1;
        private HeldLock(ReentrantLock local, FileChannel channel, FileLock fileLock) {
            this.local = local; this.channel = channel; this.fileLock = fileLock;
        }
    }

    private static final class LockToken implements Lock {
        private final Path path;
        private boolean closed;
        private LockToken(Path path) { this.path = path; }
        @Override public void close() {
            if (closed) return;
            closed = true;
            Map<Path, HeldLock> heldByThread = HELD_LOCKS.get();
            HeldLock held = heldByThread.get(path);
            if (held == null) return;
            held.depth--;
            if (held.depth > 0) return;
            heldByThread.remove(path);
            try { held.fileLock.release(); } catch (IOException ignored) {}
            try { held.channel.close(); } catch (IOException ignored) {}
            held.local.unlock();
            if (heldByThread.isEmpty()) HELD_LOCKS.remove();
        }
    }
}
