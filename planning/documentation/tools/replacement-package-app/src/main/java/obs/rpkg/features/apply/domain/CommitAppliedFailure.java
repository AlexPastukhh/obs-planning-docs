package obs.rpkg.features.apply.domain;

import java.util.Objects;
import java.util.Optional;

/** Expected non-successful outcome of one Commit Applied operation. */
public record CommitAppliedFailure(
        CommitAppliedFailureCode code,
        OperationFailureDisposition disposition,
        String message,
        Optional<ReplacementPackageState> currentState) {

    public CommitAppliedFailure {
        Objects.requireNonNull(code, "code");
        Objects.requireNonNull(disposition, "disposition");
        if (message == null || message.isBlank()) message = code.name();
        currentState = currentState == null ? Optional.empty() : currentState;
    }

    public CommitAppliedFailure(
            CommitAppliedFailureCode code,
            OperationFailureDisposition disposition,
            String message) {
        this(code, disposition, message, Optional.empty());
    }

    public CommitAppliedFailure(
            CommitAppliedFailureCode code,
            OperationFailureDisposition disposition,
            String message,
            ReplacementPackageState currentState) {
        this(code, disposition, message, Optional.ofNullable(currentState));
    }
}
