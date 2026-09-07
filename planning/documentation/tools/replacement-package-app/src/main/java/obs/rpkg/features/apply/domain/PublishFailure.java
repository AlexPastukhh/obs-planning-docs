package obs.rpkg.features.apply.domain;

import java.util.Objects;
import java.util.Optional;

/** Expected non-successful outcome of one Publish operation. */
public record PublishFailure(
        PublishFailureCode code,
        OperationFailureDisposition disposition,
        String message,
        Optional<ReplacementPackageState> currentState) {

    public PublishFailure {
        Objects.requireNonNull(code, "code");
        Objects.requireNonNull(disposition, "disposition");
        if (message == null || message.isBlank()) message = code.name();
        currentState = currentState == null ? Optional.empty() : currentState;
    }

    public PublishFailure(
            PublishFailureCode code,
            OperationFailureDisposition disposition,
            String message) {
        this(code, disposition, message, Optional.empty());
    }

    public PublishFailure(
            PublishFailureCode code,
            OperationFailureDisposition disposition,
            String message,
            ReplacementPackageState currentState) {
        this(code, disposition, message, Optional.ofNullable(currentState));
    }
}
