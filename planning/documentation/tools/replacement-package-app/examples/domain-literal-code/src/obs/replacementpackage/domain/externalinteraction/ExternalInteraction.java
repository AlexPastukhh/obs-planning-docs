package obs.replacementpackage.domain.externalinteraction;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.util.*;

public final class ExternalInteraction {
    private final InteractionId interactionId;
    private final ArtifactFingerprint artifact;
    private final ConversationKey destination;
    private final DeliveryMode mode;
    private final InteractionState state;
    private final Optional<AttachmentEvidence> attachmentEvidence;
    private final Optional<SendEvidence> sendEvidence;
    private final Optional<SendAttemptEvidence> sendAttemptEvidence;
    private final Optional<DeliveryFailure> failure;

    private ExternalInteraction(
            InteractionId interactionId,
            ArtifactFingerprint artifact,
            ConversationKey destination,
            DeliveryMode mode,
            InteractionState state,
            Optional<AttachmentEvidence> attachmentEvidence,
            Optional<SendEvidence> sendEvidence,
            Optional<SendAttemptEvidence> sendAttemptEvidence,
            Optional<DeliveryFailure> failure) {
        this.interactionId = Objects.requireNonNull(interactionId);
        this.artifact = Objects.requireNonNull(artifact);
        this.destination = Objects.requireNonNull(destination);
        this.mode = Objects.requireNonNull(mode);
        this.state = Objects.requireNonNull(state);
        this.attachmentEvidence = Objects.requireNonNull(attachmentEvidence);
        this.sendEvidence = Objects.requireNonNull(sendEvidence);
        this.sendAttemptEvidence = Objects.requireNonNull(sendAttemptEvidence);
        this.failure = Objects.requireNonNull(failure);
    }

    public static ExternalInteraction begin(
            InteractionId interactionId,
            ArtifactFingerprint artifact,
            ConversationKey destination,
            DeliveryMode mode) {
        return new ExternalInteraction(interactionId, artifact, destination, mode, InteractionState.READY,
                Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty());
    }

    public ExternalInteraction markAttached(AttachmentEvidence evidence) {
        requireArtifactDestination(evidence.artifact(), evidence.destination(), new AttachmentEvidenceMismatch());
        if (state != InteractionState.READY)
            throw new InvalidInteractionTransition("attachment requires ready state");
        return copy(InteractionState.ATTACHED, Optional.of(evidence), sendEvidence, sendAttemptEvidence, failure);
    }

    public ExternalInteraction markSent(SendEvidence evidence) {
        requireArtifactDestination(evidence.artifact(), evidence.destination(), new SendEvidenceMismatch());
        if (mode != DeliveryMode.ATTACH_AND_SEND || state != InteractionState.ATTACHED)
            throw new InvalidInteractionTransition("send requires attached AttachAndSend interaction");
        return copy(InteractionState.SENT, attachmentEvidence, Optional.of(evidence), Optional.empty(), Optional.empty());
    }

    public ExternalInteraction markFailedBeforeSend(DeliveryFailure failure) {
        if (state == InteractionState.SENT || state == InteractionState.UNKNOWN_AFTER_SEND)
            throw new InvalidInteractionTransition("post-send state cannot become pre-send failure");
        return copy(InteractionState.FAILED_BEFORE_SEND, attachmentEvidence, Optional.empty(),
                Optional.empty(), Optional.of(failure));
    }

    public ExternalInteraction markUnknownAfterSend(SendAttemptEvidence evidence) {
        requireArtifactDestination(evidence.artifact(), evidence.destination(), new SendEvidenceMismatch());
        if (mode != DeliveryMode.ATTACH_AND_SEND || state != InteractionState.ATTACHED)
            throw new InvalidInteractionTransition("unknown-after-send requires an attached send-capable interaction");
        return copy(InteractionState.UNKNOWN_AFTER_SEND, attachmentEvidence, Optional.empty(),
                Optional.of(evidence), Optional.empty());
    }

    public ExternalInteraction markCancelledBeforePossibleSend() {
        if (state == InteractionState.SENT || state == InteractionState.UNKNOWN_AFTER_SEND)
            throw new InvalidInteractionTransition("cannot cancel after possible send");
        return copy(InteractionState.CANCELLED, Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty());
    }

    private void requireArtifactDestination(
            ArtifactFingerprint observedArtifact,
            ConversationKey observedDestination,
            RuntimeException mismatch) {
        if (!artifact.equals(observedArtifact) || !destination.equals(observedDestination)) throw mismatch;
    }

    private ExternalInteraction copy(
            InteractionState state,
            Optional<AttachmentEvidence> attachmentEvidence,
            Optional<SendEvidence> sendEvidence,
            Optional<SendAttemptEvidence> sendAttemptEvidence,
            Optional<DeliveryFailure> failure) {
        return new ExternalInteraction(interactionId, artifact, destination, mode, state,
                attachmentEvidence, sendEvidence, sendAttemptEvidence, failure);
    }

    public InteractionId interactionId() { return interactionId; }
    public ArtifactFingerprint artifact() { return artifact; }
    public ConversationKey destination() { return destination; }
    public DeliveryMode mode() { return mode; }
    public InteractionState state() { return state; }
    public Optional<AttachmentEvidence> attachmentEvidence() { return attachmentEvidence; }
    public Optional<SendEvidence> sendEvidence() { return sendEvidence; }
    public Optional<SendAttemptEvidence> sendAttemptEvidence() { return sendAttemptEvidence; }
    public Optional<DeliveryFailure> failure() { return failure; }
}
