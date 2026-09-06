package obs.rpkg.features.apply.domain;

import java.util.Objects;

/** Expected non-successful Feature outcome. */
public record ApplyFailure(
        ApplyFailureCode code,
        ApplyFailureDisposition disposition,
        String message) {
    public ApplyFailure {
        Objects.requireNonNull(code, "code");
        Objects.requireNonNull(disposition, "disposition");
        if (message == null || message.isBlank()) message = code.name();
    }
}
