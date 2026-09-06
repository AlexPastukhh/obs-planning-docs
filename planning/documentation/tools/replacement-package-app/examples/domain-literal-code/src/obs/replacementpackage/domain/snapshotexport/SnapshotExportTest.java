package obs.replacementpackage.domain.snapshotexport;

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

public final class SnapshotExportTest extends DomainTestSupport {
    public static void runAll(DomainTestRunner runner) {
        SnapshotExportTest test = new SnapshotExportTest();
        runner.run("local_snapshot_export_fixes_the_frozen_head_and_validated_output_path", test::local_snapshot_export_fixes_the_frozen_head_and_validated_output_path);
        runner.run("commit_snapshot_export_fixes_the_once_resolved_commit_as_immutable_source", test::commit_snapshot_export_fixes_the_once_resolved_commit_as_immutable_source);
        runner.run("first_local_capture_records_inventory_and_diff_against_the_frozen_head", test::first_local_capture_records_inventory_and_diff_against_the_frozen_head);
        runner.run("local_capture_cannot_be_confirmed_when_second_inventory_differs_from_the_first", test::local_capture_cannot_be_confirmed_when_second_inventory_differs_from_the_first);
        runner.run("local_capture_cannot_be_confirmed_when_head_changes_during_capture", test::local_capture_cannot_be_confirmed_when_head_changes_during_capture);
        runner.run("commit_capture_records_one_inventory_for_the_fixed_commit_source", test::commit_capture_records_one_inventory_for_the_fixed_commit_source);
        runner.run("unsupported_source_entry_makes_snapshot_export_failed_and_nonpublishable", test::unsupported_source_entry_makes_snapshot_export_failed_and_nonpublishable);
        runner.run("published_snapshot_records_exact_artifact_fingerprint_and_validated_final_path", test::published_snapshot_records_exact_artifact_fingerprint_and_validated_final_path);
    }

    private void local_snapshot_export_fixes_the_frozen_head_and_validated_output_path() {
        SnapshotExport ex = SnapshotExport.beginLocal(targetRef(), commit("1111"), output());
        equal(new LocalSnapshotSource(commit("1111")), ex.source());
        equal(output(), ex.outputPath());
    }

    private void commit_snapshot_export_fixes_the_once_resolved_commit_as_immutable_source() {
        SnapshotExport ex = SnapshotExport.beginCommit(targetRef(), commit("1111"), output());
        equal(new CommitSnapshotSource(commit("1111")), ex.source());
    }

    private void first_local_capture_records_inventory_and_diff_against_the_frozen_head() {
        SnapshotInventory inv = inventory("fp-A", "a.txt", "sha:A");
        DiffArtifact diff = DiffArtifact.toCapture(commit("1111"), inv.fingerprint());
        SnapshotExport ex = SnapshotExport.beginLocal(targetRef(), commit("1111"), output())
                .recordFirstLocalCapture(inv, diff);
        equal(inv, ex.firstInventory().orElseThrow());
        equal(commit("1111"), ex.initialDiff().orElseThrow().fromCommit());
        equal(inv.fingerprint(), ex.initialDiff().orElseThrow().toFingerprint().orElseThrow());
    }

    private void local_capture_cannot_be_confirmed_when_second_inventory_differs_from_the_first() {
        SnapshotInventory first = inventory("fp-A", "a.txt", "sha:A");
        SnapshotInventory second = inventory("fp-B", "a.txt", "sha:B");
        SnapshotExport ex = SnapshotExport.beginLocal(targetRef(), commit("1111"), output())
                .recordFirstLocalCapture(first, DiffArtifact.toCapture(commit("1111"), first.fingerprint()));
        throwsType(SnapshotCaptureMismatch.class, () -> ex.confirmSecondLocalCapture(
                second, commit("1111"), DiffArtifact.toCapture(commit("1111"), second.fingerprint())));
    }

    private void local_capture_cannot_be_confirmed_when_head_changes_during_capture() {
        SnapshotInventory inv = inventory("fp-A", "a.txt", "sha:A");
        DiffArtifact diff = DiffArtifact.toCapture(commit("1111"), inv.fingerprint());
        SnapshotExport ex = SnapshotExport.beginLocal(targetRef(), commit("1111"), output())
                .recordFirstLocalCapture(inv, diff);
        throwsType(SnapshotCaptureMismatch.class,
                () -> ex.confirmSecondLocalCapture(inv, commit("2222"), diff));
    }

    private void commit_capture_records_one_inventory_for_the_fixed_commit_source() {
        SnapshotInventory inv = inventory("fp-C", "a.txt", "sha:C");
        SnapshotExport ex = SnapshotExport.beginCommit(targetRef(), commit("1111"), output())
                .recordCommitCapture(inv);
        equal(inv, ex.confirmedInventory().orElseThrow());
        equal(new CommitSnapshotSource(commit("1111")), ex.source());
    }

    private void unsupported_source_entry_makes_snapshot_export_failed_and_nonpublishable() {
        SnapshotExport ex = SnapshotExport.beginCommit(targetRef(), commit("1111"), output())
                .recordCommitCapture(inventory("fp-C", "a.txt", "sha:C"))
                .rejectUnsupportedSourceEntry(SnapshotSourceEntryType.SYMLINK);
        equal(SnapshotExportState.FAILED, ex.state());
        throwsType(SnapshotNotPublishable.class,
                () -> ex.publish(new ArtifactFingerprint("sha256:abc"), output()));
    }

    private void published_snapshot_records_exact_artifact_fingerprint_and_validated_final_path() {
        ArtifactFingerprint fp = new ArtifactFingerprint("sha256:abc");
        SnapshotExport ex = SnapshotExport.beginCommit(targetRef(), commit("1111"), output())
                .recordCommitCapture(inventory("fp-C", "a.txt", "sha:C"))
                .publish(fp, output());
        equal(SnapshotExportState.PUBLISHED, ex.state());
        equal(fp, ex.artifactFingerprint().orElseThrow());
        equal(output(), ex.outputPath());
    }
}
