package obs.replacementpackage.domain.externalinteraction;

import java.util.*;
import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.errors.*;
import obs.replacementpackage.domain.testing.*;
import obs.replacementpackage.domain.repositorywork.*;
import obs.replacementpackage.domain.workissue.*;
import obs.replacementpackage.domain.replacementpackage.*;
import obs.replacementpackage.domain.packagereview.*;
import obs.replacementpackage.domain.packageapplication.*;
import obs.replacementpackage.domain.workfinalization.*;
import obs.replacementpackage.domain.snapshotexport.*;
import obs.replacementpackage.domain.externalinteraction.*;

public final class ExternalInteractionTest extends DomainTestSupport {
    public static void runAll(DomainTestRunner runner) {
        ExternalInteractionTest test = new ExternalInteractionTest();
        runner.run("delivery_attempt_identity_freezes_artifact_destination_and_mode", test::delivery_attempt_identity_freezes_artifact_destination_and_mode);
        runner.run("attached_state_requires_evidence_for_the_frozen_artifact_and_destination", test::attached_state_requires_evidence_for_the_frozen_artifact_and_destination);
        runner.run("sent_state_is_terminal_only_after_send_evidence_for_the_frozen_delivery_attempt", test::sent_state_is_terminal_only_after_send_evidence_for_the_frozen_delivery_attempt);
        runner.run("pre_send_failure_does_not_become_sent_or_unknown_after_send", test::pre_send_failure_does_not_become_sent_or_unknown_after_send);
        runner.run("unknown_after_send_remains_distinct_from_confirmed_sent", test::unknown_after_send_remains_distinct_from_confirmed_sent);
        runner.run("pre_send_cancellation_is_terminal_without_implying_attachment_or_send", test::pre_send_cancellation_is_terminal_without_implying_attachment_or_send);
    }

    private void delivery_attempt_identity_freezes_artifact_destination_and_mode() {
        ExternalInteraction x = interaction();
        equal(new ArtifactFingerprint("sha256:abc"), x.artifact());
        equal(new ConversationKey("chat-7"), x.destination());
        equal(DeliveryMode.ATTACH_AND_SEND, x.mode());
    }

    private void attached_state_requires_evidence_for_the_frozen_artifact_and_destination() {
        ExternalInteraction x = interaction();
        throwsType(AttachmentEvidenceMismatch.class, () ->
                x.markAttached(new AttachmentEvidence(new ArtifactFingerprint("sha256:other"), new ConversationKey("chat-7"))));
    }

    private void sent_state_is_terminal_only_after_send_evidence_for_the_frozen_delivery_attempt() {
        ExternalInteraction x = interaction()
                .markAttached(new AttachmentEvidence(new ArtifactFingerprint("sha256:abc"), new ConversationKey("chat-7")))
                .markSent(new SendEvidence(new ArtifactFingerprint("sha256:abc"), new ConversationKey("chat-7")));
        equal(InteractionState.SENT, x.state());
        isTrue(x.sendEvidence().isPresent());
        throwsType(InvalidInteractionTransition.class,
                () -> x.markFailedBeforeSend(new DeliveryFailure("late failure")));
    }

    private void pre_send_failure_does_not_become_sent_or_unknown_after_send() {
        ExternalInteraction x = interaction().markFailedBeforeSend(new DeliveryFailure("browser unavailable"));
        equal(InteractionState.FAILED_BEFORE_SEND, x.state());
        isTrue(x.sendEvidence().isEmpty());
        isTrue(x.sendAttemptEvidence().isEmpty());
    }

    private void unknown_after_send_remains_distinct_from_confirmed_sent() {
        ExternalInteraction x = interaction()
                .markAttached(new AttachmentEvidence(new ArtifactFingerprint("sha256:abc"), new ConversationKey("chat-7")))
                .markUnknownAfterSend(new SendAttemptEvidence(new ArtifactFingerprint("sha256:abc"), new ConversationKey("chat-7")));
        equal(InteractionState.UNKNOWN_AFTER_SEND, x.state());
        isTrue(x.sendEvidence().isEmpty());
        isTrue(x.sendAttemptEvidence().isPresent());
    }

    private void pre_send_cancellation_is_terminal_without_implying_attachment_or_send() {
        ExternalInteraction x = interaction().markCancelledBeforePossibleSend();
        equal(InteractionState.CANCELLED, x.state());
        isTrue(x.attachmentEvidence().isEmpty());
        isTrue(x.sendEvidence().isEmpty());
    }
}
