# Archive Source vs Output Package Example

Status: supporting reusable example
Doc version: v0.3.0-source-selection
Scope: demonstrates the difference between using an archive as a source, selecting a current package source and creating a replacement archive.

## `арх`

```text
Meaning:
  Use an explicitly selected archive as a read-source snapshot.

Output:
  answer/review/plan based on the selected archive.

Boundary:
  Do not create a replacement archive unless separately requested.
  Do not silently treat an earlier-message archive as current.
```

## `давай архив`

```text
Meaning:
  Create a replacement archive/package.

Output:
  replacement archive plus apply/diff commands in chat.

Boundary:
  Do not commit or push. Ask user to paste diff before commit.
```

## Source-Selection Scenarios

### A. Same-message source archive

```text
User message contains:
  - the source archive;
  - `давай архив`.

Result:
  the attached archive is the current source snapshot for this invocation.
  record its filename and available hash/comment/ref in the package summary.
```

### B. Earlier-message archive

```text
An archive was attached in an earlier message.
The current `давай архив` message does not attach it again.

Result:
  do not treat the earlier archive as current automatically.
  use fully readable current repository files or resolve source differences explicitly.
```

### C. Current repository is fully readable

```text
No same-message source archive exists.
All required current files can be read completely and reliably from the repository.

Result:
  use the current repository.
  do not request an archive merely because an archive was used earlier in the chat.
```

### D. Repository/tool delivery limit

```text
Required current files cannot be read completely and reliably because of size or tool limits.

Result:
  request a fresh source archive.
  do not fall back silently to an earlier-message archive.
```

### E. Selected snapshot differs from local HEAD

```text
A package was built from a selected source snapshot.
The apply precondition finds that a current local target blob differs from the package base blob.

Result:
  stop before copying or deleting files;
  do not edit manifest hashes manually;
  rebuild from the current repository or explicitly reconcile the differing source.
```

Owner routes:

```text
planning/planning-use-case-map.md
planning/documentation/reviewable-agent-output-and-commands-workflow.md
```

This example demonstrates behavior only. It does not own source-selection or package rules.
