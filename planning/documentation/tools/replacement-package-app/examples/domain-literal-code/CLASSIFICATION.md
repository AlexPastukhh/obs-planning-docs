# Literal Domain type classification audit

Classification basis: own identity + lifecycle continuity + equality semantics. **Number of fields is irrelevant.**

## Aggregate Roots

- `repositorywork/RepositoryWork.java`
- `workissue/WorkIssue.java`
- `replacementpackage/ReplacementPackage.java`
- `packagereview/PackageReview.java`
- `packageapplication/PackageApplication.java`
- `workfinalization/WorkFinalization.java`
- `snapshotexport/SnapshotExport.java`
- `externalinteraction/ExternalInteraction.java`

## Child Entities

- `repositorywork/WorkBranch.java`
- `workissue/IssueComment.java`
- `packageapplication/PublicationAttempt.java`

## Aggregate-local Value Objects / enums / evidence

### `repositorywork/`
- `WorkBranchEvidence.java`
- `RecordedWorkBranchValidation.java`
- `RepositoryWorkLifecycle.java`

### `workissue/`
- `ManagedWorkIdentityText.java`
- `ObservedIssue.java`
- `WorkIssueIdentityValidation.java`
- `IssueEditVerification.java`
- `ActorIssueText.java`
- `IssueTitle.java`

### `replacementpackage/`
- `PackageOperation.java`
- `Action.java`
- `PackagePath.java`
- `FileBytes.java`
- `FileDigest.java`

### `packagereview/`
- `ReviewDecision.java`
- `ReviewId.java`
- `WorkspaceResultId.java`

### `packageapplication/`
- `ApplyExtent.java`
- `ApplicationStage.java`
- `ApplyProvenResult.java`
- `PublicationAttemptId.java`
- `PublicationEvidence.java`
- `PublicationAttemptEvidence.java`
- `PublicationAttemptOutcome.java`
- `PublicationAttemptResultEvidence.java`

### `workfinalization/`
- `IntegrationAttempt.java`
- `FinalIssueCommentAttempt.java`
- `FinalizationState.java`
- `IntegrationEvidence.java`
- `IntegrationAttemptEvidence.java`
- `IssueCommentEvidence.java`
- `IssueCommentAttemptEvidence.java`

### `snapshotexport/`
- `SnapshotExportState.java`
- `SnapshotSource.java`
- `LocalSnapshotSource.java`
- `CommitSnapshotSource.java`
- `SnapshotInventory.java`
- `SnapshotSourceEntryType.java`
- `ValidatedSnapshotOutputPath.java`

### `externalinteraction/`
- `InteractionId.java`
- `InteractionState.java`
- `ConversationKey.java`
- `DeliveryMode.java`
- `DeliveryFailure.java`
- `AttachmentEvidence.java`
- `SendEvidence.java`
- `SendAttemptEvidence.java`

## Shared Value Objects

- `shared/valueobjects/ArtifactFingerprint.java`
- `shared/valueobjects/AttemptOutcome.java`
- `shared/valueobjects/BranchName.java`
- `shared/valueobjects/CanonicalPath.java`
- `shared/valueobjects/CaptureFingerprint.java`
- `shared/valueobjects/ChangeSetId.java`
- `shared/valueobjects/CommentText.java`
- `shared/valueobjects/CommitId.java`
- `shared/valueobjects/DiffArtifact.java`
- `shared/valueobjects/FinalizationEvidence.java`
- `shared/valueobjects/GitTreeId.java`
- `shared/valueobjects/IssueCommentId.java`
- `shared/valueobjects/IssueRef.java`
- `shared/valueobjects/PackageId.java`
- `shared/valueobjects/RegisteredRepositoryPath.java`
- `shared/valueobjects/RemoteBranchRef.java`
- `shared/valueobjects/RepositoryIdentity.java`
- `shared/valueobjects/RepositoryTarget.java`
- `shared/valueobjects/RepositoryTargetRef.java`
- `shared/valueobjects/ReviewAuthority.java`

Notable multi-field Value Objects:

- `RepositoryTarget(RepositoryIdentity, RegisteredRepositoryPath)`
- `ManagedWorkIdentityText(ChangeSetId, workBranch, targetBranch, startBaseCommit)`
- `WorkBranchEvidence(BranchName, CommitId, Optional<CommitId>)`
- `PackageOperation(PackagePath, Action, Optional<FileBytes>, Optional<FileBytes>)`
- `WorkspaceResultId(String, GitTreeId)`
- `ApplyProvenResult(ApplicationStage, commit/tree/published optionals)`
- `IntegrationAttempt(intended, outcome, confirmedEvidence)`
- `FinalIssueCommentAttempt(intended, outcome, confirmedEvidence)`
- `SnapshotInventory(Map<String, ArtifactFingerprint>, CaptureFingerprint)`
- `DiffArtifact(fromCommit, exactly one target tree/capture fingerprint)`
- `AttachmentEvidence(ArtifactFingerprint, ConversationKey)`

## Explicit Entity rationale

- `WorkBranch`: identity = `BranchName`; `knownTip` can change without changing which recorded branch it is.
- `IssueComment`: identity = `IssueCommentId`; body is state associated with that exact comment.
- `PublicationAttempt`: identity = `PublicationAttemptId`; intended branch/tip/outcome/evidence are state of that exact external attempt.

## Tests

- 48 semantic test intentions.
- Aggregate tests are physically in their Aggregate folder.
- `RepositoryTargetTest.java` is beside `RepositoryTarget.java` in `shared/valueobjects/`.
- `testing/` contains runner/assertion/fixture support only.
