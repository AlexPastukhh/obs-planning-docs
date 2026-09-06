# Replacement Package Domain — literal Java 21 example

Status: **executable methodology example; not product/runtime authority**

This tree demonstrates the recommended literal Domain handoff layout.

## Classification rule

A **Value Object may have one field or many fields**. Field count does not decide the category.

- **Aggregate Root** — Entity that defines a consistency/lifecycle boundary.
- **Entity** — has stable identity whose continuity matters across state changes.
- **Value Object** — has no independent identity; its whole semantic value defines equality. It may contain multiple fields, nested Value Objects, collections, validation and behavior.
- A key used to enforce uniqueness inside an Aggregate does **not** automatically make a child an Entity.

Examples in this tree:

- `WorkBranch` is an Entity: `BranchName` identifies the same recorded work branch while `knownTip` can change.
- `IssueComment` is an Entity: `IssueCommentId` identifies the same confirmed comment.
- `PublicationAttempt` is an Entity: `PublicationAttemptId` identifies one external publication attempt.
- `PackageOperation` is a multi-field Value Object: path/action/base/replacement together define the operation; `PackagePath` is a uniqueness key, not an Entity identity.
- `IntegrationAttempt` and `FinalIssueCommentAttempt` are multi-field Value Objects: no independent attempt identity is selected.
- `RepositoryTarget` is a multi-field shared Value Object: repository identity + registered local path.

## Layout

```text
domain/
├── errors/
├── shared/
│   ├── valueobjects/
│   │   ├── RepositoryTarget.java
│   │   ├── RegisteredRepositoryPath.java
│   │   ├── RepositoryTargetTest.java
│   │   └── ... genuinely cross-owner semantic values
│   └── support/
│       └── DomainText.java
├── repositorywork/
│   ├── RepositoryWork.java
│   ├── WorkBranch.java
│   ├── ... local Value Objects
│   └── RepositoryWorkTest.java
├── workissue/
│   ├── WorkIssue.java
│   ├── IssueComment.java
│   ├── ... local Value Objects
│   └── WorkIssueTest.java
├── replacementpackage/
│   ├── ReplacementPackage.java
│   ├── PackageOperation.java
│   ├── ... local Value Objects
│   └── ReplacementPackageTest.java
├── packagereview/ ...
├── packageapplication/ ...
├── workfinalization/ ...
├── snapshotexport/ ...
├── externalinteraction/ ...
└── testing/
    └── runner/assertion/fixture support only
```

Owner-specific semantic tests live beside the owner/value they test. Build-system-separated source/test roots may mirror the same owner-relative package path.

## Run

```bash
bash run-tests.sh
```

Expected result:

```text
RESULT passed=48 failed=0 total=48
```

## Verified before packaging

```text
javac --release 21 -Xlint:all -Werror
RESULT passed=48 failed=0 total=48
```
