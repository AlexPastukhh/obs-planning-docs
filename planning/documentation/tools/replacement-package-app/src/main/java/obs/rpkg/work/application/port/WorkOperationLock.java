package obs.rpkg.work.application.port;

import obs.rpkg.work.domain.WorkId;

/**
 * Serializes one Work mutation boundary across application operations and processes.
 * Implementations must be re-entrant for the same WorkId on the same thread because
 * owner repositories may perform invariant-preserving saves inside an already-held Work operation.
 */
public interface WorkOperationLock {
    Lock lock(WorkId workId) throws LockException;

    interface Lock extends AutoCloseable {
        @Override void close();
    }

    final class LockException extends RuntimeException {
        public LockException(String message, Throwable cause) { super(message, cause); }
    }
}
