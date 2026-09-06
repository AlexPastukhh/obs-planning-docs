package obs.rpkg.work.application.port;

import obs.rpkg.work.domain.WorkId;

/** Serializes one Work mutation boundary across application operations and processes. */
public interface WorkOperationLock {
    Lock lock(WorkId workId);

    interface Lock extends AutoCloseable {
        @Override void close();
    }
}
