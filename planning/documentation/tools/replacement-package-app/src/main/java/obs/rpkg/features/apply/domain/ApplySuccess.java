package obs.rpkg.features.apply.domain;

import java.util.Objects;

/** Successful Feature outcome. Actual progress may be beyond the requested extent. */
public record ApplySuccess(
        ApplyExtent requestedExtent,
        PackageApplication application,
        boolean alreadySatisfied) {
    public ApplySuccess {
        Objects.requireNonNull(requestedExtent, "requestedExtent");
        Objects.requireNonNull(application, "application");
        if (!application.satisfies(requestedExtent)) {
            throw new IllegalArgumentException("PackageApplication does not satisfy requested Apply extent");
        }
    }
}
