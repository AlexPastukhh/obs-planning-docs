package obs.rpkg.features.apply.infrastructure;

import java.util.List;
import java.util.Objects;

import obs.rpkg.GitTransport;
import obs.rpkg.features.apply.domain.PublicationObservation;
import obs.rpkg.foundation.result.Result;

/** Exact remote work-branch observation through the isolated Git transport capability. */
public final class GitPublicationObserver implements PublicationObserver {
    private final GitTransport transport;

    public GitPublicationObserver(GitTransport transport) {
        this.transport = Objects.requireNonNull(transport, "transport");
    }

    @Override
    public Result<PublicationObservation, Failure> observe(
            String workBranch,
            GitTransport.Endpoint endpoint) {
        if (workBranch == null || workBranch.isBlank() || endpoint == null) {
            return Result.failure(new Failure(
                    "Work branch and verified Git transport endpoint are required for publication confirmation",
                    null));
        }

        String exactRef = "refs/heads/" + workBranch;
        Result<List<String>, GitTransport.Failure> lookup = transport.lsRemote(endpoint, exactRef);
        if (lookup.isFailure()) {
            GitTransport.Failure failure = lookup.failure().orElseThrow();
            return Result.failure(new Failure(failure.message(), failure.cause()));
        }
        List<String> lines = lookup.success().orElseThrow();
        if (lines.isEmpty()) return Result.success(new PublicationObservation.ConfirmedAbsent());
        if (lines.size() != 1) {
            return Result.failure(new Failure("Remote work branch observation is ambiguous", null));
        }
        String[] parts = lines.get(0).trim().split("\\s+");
        if (parts.length != 2
                || !parts[1].equals(exactRef)
                || !parts[0].matches("[0-9A-Fa-f]{40,64}")) {
            return Result.failure(new Failure(
                    "Remote work branch observation is not one exact ref/tip result",
                    null));
        }
        return Result.success(new PublicationObservation.ConfirmedTip(parts[0]));
    }
}
