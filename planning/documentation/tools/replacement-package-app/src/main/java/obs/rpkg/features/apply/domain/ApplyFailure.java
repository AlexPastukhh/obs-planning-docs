package obs.rpkg.features.apply.domain;

import java.util.Objects;
import java.util.Optional;

/** Expected non-successful outcome of the current Apply feature operation. */
public record ApplyFailure(
        ApplyFailureCode code,
        ApplyFailureDisposition disposition,
        String message,
        Optional<PackageApplication> currentApplication) {
    public ApplyFailure {
        Objects.requireNonNull(code, "code");
        Objects.requireNonNull(disposition, "disposition");
        if (message == null || message.isBlank()) message = code.name();
        currentApplication = currentApplication == null ? Optional.empty() : currentApplication;
    }

    public ApplyFailure(ApplyFailureCode code, ApplyFailureDisposition disposition, String message) {
        this(code, disposition, message, Optional.empty());
    }

    public ApplyFailure(
            ApplyFailureCode code,
            ApplyFailureDisposition disposition,
            String message,
            PackageApplication currentApplication) {
        this(code, disposition, message, Optional.ofNullable(currentApplication));
    }
}
