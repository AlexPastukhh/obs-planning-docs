package obs.replacementpackage.domain.snapshotexport;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.util.*;

public final class SnapshotExport {
    private final RepositoryTargetRef target;
    private final SnapshotSource source;
    private final ValidatedSnapshotOutputPath outputPath;
    private final Optional<SnapshotInventory> firstInventory;
    private final Optional<DiffArtifact> initialDiff;
    private final Optional<SnapshotInventory> confirmedInventory;
    private final Optional<ArtifactFingerprint> artifactFingerprint;
    private final SnapshotExportState state;

    private SnapshotExport(
            RepositoryTargetRef target,
            SnapshotSource source,
            ValidatedSnapshotOutputPath outputPath,
            Optional<SnapshotInventory> firstInventory,
            Optional<DiffArtifact> initialDiff,
            Optional<SnapshotInventory> confirmedInventory,
            Optional<ArtifactFingerprint> artifactFingerprint,
            SnapshotExportState state) {
        this.target = Objects.requireNonNull(target);
        this.source = Objects.requireNonNull(source);
        this.outputPath = Objects.requireNonNull(outputPath);
        this.firstInventory = Objects.requireNonNull(firstInventory);
        this.initialDiff = Objects.requireNonNull(initialDiff);
        this.confirmedInventory = Objects.requireNonNull(confirmedInventory);
        this.artifactFingerprint = Objects.requireNonNull(artifactFingerprint);
        this.state = Objects.requireNonNull(state);
    }

    public static SnapshotExport beginLocal(
            RepositoryTargetRef target,
            CommitId frozenHead,
            ValidatedSnapshotOutputPath outputPath) {
        return new SnapshotExport(target, new LocalSnapshotSource(frozenHead), outputPath,
                Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty(), SnapshotExportState.NEW);
    }

    public static SnapshotExport beginCommit(
            RepositoryTargetRef target,
            CommitId resolvedCommit,
            ValidatedSnapshotOutputPath outputPath) {
        return new SnapshotExport(target, new CommitSnapshotSource(resolvedCommit), outputPath,
                Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty(), SnapshotExportState.NEW);
    }

    public SnapshotExport recordFirstLocalCapture(SnapshotInventory inventory, DiffArtifact diff) {
        if (!(source instanceof LocalSnapshotSource local))
            throw new SnapshotCaptureMismatch("first local capture requires Local source");
        if (state != SnapshotExportState.NEW)
            throw new SnapshotCaptureMismatch("first local capture requires new state");
        if (!diff.fromCommit().equals(local.frozenHead())
                || diff.toFingerprint().isEmpty()
                || !diff.toFingerprint().get().equals(inventory.fingerprint()))
            throw new SnapshotCaptureMismatch("first capture diff must bind frozen head to the captured inventory");
        return copy(Optional.of(inventory), Optional.of(diff), Optional.empty(),
                Optional.empty(), SnapshotExportState.FIRST_CAPTURED);
    }

    public SnapshotExport confirmSecondLocalCapture(
            SnapshotInventory secondInventory,
            CommitId observedHead,
            DiffArtifact repeatedDiff) {
        if (!(source instanceof LocalSnapshotSource local) || state != SnapshotExportState.FIRST_CAPTURED)
            throw new SnapshotCaptureMismatch("second local capture requires a first local capture");
        SnapshotInventory first = firstInventory.orElseThrow();
        DiffArtifact firstDiff = initialDiff.orElseThrow();
        boolean coherent = first.equals(secondInventory)
                && local.frozenHead().equals(observedHead)
                && repeatedDiff.fromCommit().equals(local.frozenHead())
                && repeatedDiff.toFingerprint().isPresent()
                && repeatedDiff.toFingerprint().get().equals(secondInventory.fingerprint())
                && repeatedDiff.equals(firstDiff);
        if (!coherent) throw new SnapshotCaptureMismatch("local source changed during capture");
        return copy(firstInventory, initialDiff, Optional.of(secondInventory),
                Optional.empty(), SnapshotExportState.CONFIRMED);
    }

    public SnapshotExport recordCommitCapture(SnapshotInventory inventory) {
        if (!(source instanceof CommitSnapshotSource) || state != SnapshotExportState.NEW)
            throw new SnapshotCaptureMismatch("commit capture requires new Commit source");
        return copy(Optional.empty(), Optional.empty(), Optional.of(inventory),
                Optional.empty(), SnapshotExportState.CONFIRMED);
    }

    public SnapshotExport rejectUnsupportedSourceEntry(SnapshotSourceEntryType entryType) {
        if (entryType != SnapshotSourceEntryType.SYMLINK && entryType != SnapshotSourceEntryType.SUBMODULE)
            throw new IllegalArgumentException("entry type is supported and must not fail the export");
        return copy(firstInventory, initialDiff, confirmedInventory, Optional.empty(), SnapshotExportState.FAILED);
    }

    public SnapshotExport publish(
            ArtifactFingerprint artifactFingerprint,
            ValidatedSnapshotOutputPath finalPath) {
        if (state != SnapshotExportState.CONFIRMED) throw new SnapshotNotPublishable();
        if (!outputPath.equals(finalPath))
            throw new SnapshotCaptureMismatch("published path differs from validated output path");
        return copy(firstInventory, initialDiff, confirmedInventory,
                Optional.of(Objects.requireNonNull(artifactFingerprint)), SnapshotExportState.PUBLISHED);
    }

    private SnapshotExport copy(
            Optional<SnapshotInventory> firstInventory,
            Optional<DiffArtifact> initialDiff,
            Optional<SnapshotInventory> confirmedInventory,
            Optional<ArtifactFingerprint> artifactFingerprint,
            SnapshotExportState state) {
        return new SnapshotExport(target, source, outputPath, firstInventory, initialDiff,
                confirmedInventory, artifactFingerprint, state);
    }

    public RepositoryTargetRef target() { return target; }
    public SnapshotSource source() { return source; }
    public ValidatedSnapshotOutputPath outputPath() { return outputPath; }
    public Optional<SnapshotInventory> firstInventory() { return firstInventory; }
    public Optional<DiffArtifact> initialDiff() { return initialDiff; }
    public Optional<SnapshotInventory> confirmedInventory() { return confirmedInventory; }
    public Optional<ArtifactFingerprint> artifactFingerprint() { return artifactFingerprint; }
    public SnapshotExportState state() { return state; }
}
