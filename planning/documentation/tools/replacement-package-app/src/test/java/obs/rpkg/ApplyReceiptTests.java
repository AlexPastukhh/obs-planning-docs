package obs.rpkg;

import java.nio.file.Files;
import java.nio.file.Path;

public final class ApplyReceiptTests {
    public static void main(String[] args) throws Exception {
        testAppliedReceiptFormat();
        testSuccessfulApplyRestoresReviewDiffToClipboard();
        testFailureReceiptUsesTypedCode();
        testUncertainReceiptUsesRollbackCode();
        testInternalFailureUsesInternalError();
        testPollingPackageNotFoundDoesNotOverwriteClipboard();
        testTerminalPreparationFailureCopiesTypedReceipt();
        testAuthorizeUnexpectedFailureNormalizesToInternalError();
        testLegacyUnexpectedOutcomeNormalizesToInternalError();
        testClipboardReadBackContract();
        testPublicErrorRegistry();
        System.out.println("ApplyReceiptTests PASS");
    }

    private static void testAppliedReceiptFormat() {
        String text = Core.formatApplyReceipt(new Core.ApplyReceipt(
                "applied",
                "11111111-1111-1111-1111-111111111111",
                "22222222-2222-2222-2222-222222222222",
                null,
                null));
        check(text.equals("OBS-APPLY-RESULT/1\n"
                + "status: applied\n"
                + "packageId: 11111111-1111-1111-1111-111111111111\n"
                + "changeSetId: 22222222-2222-2222-2222-222222222222\n"),
                "applied receipt format");
    }

    private static void testSuccessfulApplyRestoresReviewDiffToClipboard() throws Exception {
        FakeClipboard clipboard = coreClipboard();
        String expectedDiff = "diff --git a/example.txt b/example.txt\n"
                + "--- a/example.txt\n"
                + "+++ b/example.txt\n"
                + "@@ -1 +1 @@\n"
                + "-old\n"
                + "+new\n";
        Path diff = Files.createTempFile("rpkg-success-review-", ".diff");
        Files.writeString(diff, expectedDiff);

        Core.ChangeSet cs = new Core.ChangeSet();
        cs.changeSetId = "22222222-2222-2222-2222-222222222222";
        Core.ApplicationAttempt attempt = new Core.ApplicationAttempt();
        attempt.attemptId = "33333333-3333-3333-3333-333333333333";
        attempt.handoffWarning = "";
        Core.ReviewDiff review = new Core.ReviewDiff(
                attempt.attemptId, diff, Core.sha256(diff), "deadbeef");
        Core.ApplyResult result = new Core.ApplyResult(Core.SUCCESS, attempt, cs, review, "");

        clipboard.core.publishSuccessfulApplyHandoffs(
                result,
                "11111111-1111-1111-1111-111111111111",
                cs.changeSetId);

        check(expectedDiff.equals(clipboard.text),
                "successful Apply must leave canonical ReviewDiff in clipboard");
        check(attempt.handoffWarning == null || attempt.handoffWarning.isBlank(),
                "successful ReviewDiff clipboard handoff warning");
    }

    private static void testFailureReceiptUsesTypedCode() throws Exception {
        FakeClipboard clipboard = coreClipboard();
        Core core = clipboard.core;
        Core.Handoff handoff = core.copyApplyFailureReceiptToClipboard(
                "11111111-1111-1111-1111-111111111111",
                "22222222-2222-2222-2222-222222222222",
                new Core.ObsException(Core.SOURCE_STATE_CHANGED,
                        "Source changed.\n--- technical details ---\nignored"));
        check(handoff.warning().isBlank(), "failure receipt clipboard warning");
        check(clipboard.text.contains("status: failed\n"), "failure status");
        check(clipboard.text.contains("code: SOURCE_STATE_CHANGED\n"), "failure typed code");
        check(clipboard.text.contains("message: Source changed.\n"), "failure semantic message");
        check(!clipboard.text.contains("technical details"), "technical details excluded");
    }

    private static void testUncertainReceiptUsesRollbackCode() throws Exception {
        FakeClipboard clipboard = coreClipboard();
        clipboard.core.copyApplyFailureReceiptToClipboard(
                "11111111-1111-1111-1111-111111111111",
                "22222222-2222-2222-2222-222222222222",
                new Core.ObsException(Core.APPLY_ROLLBACK_UNVERIFIED,
                        "Apply failed and rollback could not be verified."));
        check(clipboard.text.contains("status: uncertain\n"), "uncertain status");
        check(clipboard.text.contains("code: APPLY_ROLLBACK_UNVERIFIED\n"), "uncertain typed code");
    }

    private static void testInternalFailureUsesInternalError() throws Exception {
        FakeClipboard clipboard = coreClipboard();
        clipboard.core.copyApplyFailureReceiptToClipboard(null, null, new IllegalStateException("boom"));
        check(clipboard.text.equals("OBS-APPLY-RESULT/1\n"
                + "status: failed\n"
                + "code: INTERNAL_ERROR\n"
                + "message: boom\n"), "internal failure receipt");
    }


    private static void testPollingPackageNotFoundDoesNotOverwriteClipboard() throws Exception {
        FakeClipboard clipboard = coreClipboard();
        Path missing = Files.createTempDirectory("rpkg-apply-missing-").resolve("not-yet.zip");
        try {
            clipboard.core.prepareApply("", missing, null);
            throw new AssertionError("missing package should fail");
        } catch (Core.ObsException e) {
            check(Core.PACKAGE_NOT_FOUND.equals(e.code), "missing package code");
        }
        check(clipboard.text == null, "transient PACKAGE_NOT_FOUND must not overwrite clipboard");
    }

    private static void testTerminalPreparationFailureCopiesTypedReceipt() throws Exception {
        FakeClipboard clipboard = coreClipboard();
        Path invalid = Files.createTempFile("rpkg-apply-invalid-", ".zip");
        Files.writeString(invalid, "not a zip");
        try {
            clipboard.core.prepareApply("", invalid, null);
            throw new AssertionError("invalid package should fail");
        } catch (Core.ObsException e) {
            check(Core.PACKAGE_INVALID.equals(e.code), "invalid package code");
        }
        check(clipboard.text != null && clipboard.text.contains("status: failed\n"), "terminal prepare failure status");
        check(clipboard.text.contains("code: PACKAGE_INVALID\n"), "terminal prepare failure code");
    }

    private static void testAuthorizeUnexpectedFailureNormalizesToInternalError() throws Exception {
        FakeClipboard clipboard = coreClipboard();
        Core.PreparedApply malformed = new Core.PreparedApply(null, null, null, null, java.util.List.of(), null, null);
        try {
            clipboard.core.authorizeApply(malformed, null, Core.ReviewChatBindingDecision.NONE);
            throw new AssertionError("malformed authorization should fail");
        } catch (Core.ObsException e) {
            check(Core.INTERNAL_ERROR.equals(e.code), "unexpected authorize failure normalized");
        }
        check(clipboard.text != null && clipboard.text.contains("code: INTERNAL_ERROR\n"), "authorize receipt internal code");
    }

    private static void testLegacyUnexpectedOutcomeNormalizesToInternalError() throws Exception {
        FakeClipboard clipboard = coreClipboard();
        Core.ChangeSet cs = new Core.ChangeSet();
        cs.changeSetId = "33333333-3333-3333-3333-333333333333";
        cs.changeSetLabel = "test";
        cs.repositoryIdentity = "github:Example/Repo";
        cs.status = "Active";
        cs.createdAt = java.time.Instant.now().toString();
        cs.updatedAt = cs.createdAt;
        clipboard.state.saveChangeSet(cs);
        clipboard.core.recordOperationOutcome(cs.changeSetId, "FAILED", "UNEXPECTED", "boom");
        Core.ChangeSet saved = clipboard.state.getChangeSet(cs.changeSetId);
        check(Core.INTERNAL_ERROR.equals(saved.lastOperationCode), "legacy UNEXPECTED normalized in persisted outcome");
    }

    private static void testClipboardReadBackContract() throws Exception {
        FakeClipboard clipboard = coreClipboard();
        Core.Handoff ok = clipboard.core.copyApplyReceiptToClipboard(new Core.ApplyReceipt(
                "applied", "p", "c", null, null));
        check(ok.warning().isBlank(), "verified clipboard success");
        clipboard.readBackOverride = "different";
        Core.Handoff bad = clipboard.core.copyApplyReceiptToClipboard(new Core.ApplyReceipt(
                "applied", "p", "c", null, null));
        check(bad.warning().contains("read-back differs"), "verified clipboard mismatch");
    }

    private static void testPublicErrorRegistry() {
        check(Core.PUBLIC_ERROR_CODES.contains(Core.SOURCE_STATE_CHANGED), "source error registered");
        check(Core.PUBLIC_ERROR_CODES.contains(Core.APPLY_ROLLBACK_UNVERIFIED), "uncertain error registered");
        check(Core.PUBLIC_ERROR_CODES.contains(Core.INTERNAL_ERROR), "internal error registered");
        check(Core.PUBLIC_ERROR_CODES.contains(Core.PUBLISH_FAILED), "publish failure registered");
        check(Core.PUBLIC_ERROR_CODES.contains(Core.PUBLICATION_UNCERTAIN), "publication uncertainty registered");
        check(Core.PUBLIC_ERROR_CODES.contains(Core.REMOTE_BRANCH_DIVERGED), "remote divergence registered");
        check(!Core.PUBLIC_ERROR_CODES.contains(Core.SUCCESS), "success is not an error code");
    }

    private static FakeClipboard coreClipboard() throws Exception {
        FakeClipboard clipboard = new FakeClipboard();
        Path root = Files.createTempDirectory("rpkg-apply-receipt-");
        clipboard.state = new StateStore(root);
        clipboard.core = new Core(clipboard.state, clipboard);
        return clipboard;
    }

    private static void check(boolean condition, String message) {
        if (!condition) throw new AssertionError(message);
    }

    private static final class FakeClipboard implements Core.ClipboardAccess {
        Core core;
        StateStore state;
        String text;
        String readBackOverride;
        @Override public void setText(String value) { text = value; }
        @Override public String getText() { return readBackOverride == null ? text : readBackOverride; }
    }
}
