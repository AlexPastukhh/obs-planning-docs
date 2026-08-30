# Replacement Package Builder

Status: PB-01 and PB-02 implemented

`replacement-package-builder` is a small Java 21 CLI placed beside `replacement-package-app`. It implements the producer-side mechanical build step for the existing replacement-package protocol without changing that protocol.

## PB-01 — add / replace from desired files

The caller prepares only complete desired versions of repository files:

```text
exact local Git repository
+ partial desired file tree
+ ChangeSet context
→ validated replacement-package ZIP
```

For each desired path the Builder derives:

```text
source absent                         → add
source present + different bytes      → replace
source present + identical bytes      → no-op
```

The Builder owns exact base capture for replacements, package manifest/payload materialization, `packageId` generation and final ZIP validation. The caller does not create `PACKAGE.json`, `base-files/`, `replacement-files/` or the ZIP manually.

Absence from the desired tree means "no requested operation". Delete is never inferred from desired-tree absence.

## PB-02 — explicit safe deletes

Delete intent is explicit and may be combined with desired add/replace input:

```text
--delete docs/obsolete.md
--delete assets/old.bin
```

`--delete` is repeatable. A delete-only build does not require `--desired`.

For every delete path the Builder requires the current source path to exist as a regular non-symlink file, captures its exact bytes into `base-files/<path>`, emits `action=delete`, and emits no `replacement-files/<path>`. The same exact source bytes are rechecked before package publication.

One Windows-normalized repository path cannot be both desired input and delete intent, and duplicate/colliding delete intents fail validation.


## Requirements

- Java 21 and Git on `PATH`.
- `--repo` is the exact Git worktree root (not a subdirectory) and its `remote.origin.url` identifies a GitHub repository.
- `--desired`, when supplied, is a separate partial directory tree containing complete desired file bytes; it and the source repository must be disjoint (neither may contain the other).
- At least one semantic input is required: `--desired` or one or more `--delete` paths.
- `--output` is outside both the source repository and the desired input tree and does not already exist; PB-01 never overwrites an existing output implicitly.

The Builder reads repository identity from `remote.origin.url` and emits the existing package schema owned by [`../replacement-package-app/PACKAGE-PROTOCOL.md`](../replacement-package-app/PACKAGE-PROTOCOL.md).

## Build

```bat
build.cmd
```

Produces `build\replacement-package-builder.jar`.

## Usage

New ChangeSet:

```bat
java -jar build\replacement-package-builder.jar ^
  --repo C:\work\repo ^
  --desired C:\work\desired ^
  --output C:\work\change.zip ^
  --change-set-label "Example change"
```

Continuation of an explicitly selected open ChangeSet:

```bat
java -jar build\replacement-package-builder.jar ^
  --repo C:\work\repo ^
  --desired C:\work\desired ^
  --output C:\work\change-2.zip ^
  --change-set-label "Example change" ^
  --change-set-id 22222222-2222-2222-2222-222222222222
```

Delete-only package:

```bat
java -jar build\replacement-package-builder.jar ^
  --repo C:\work\repo ^
  --output C:\work\delete.zip ^
  --change-set-label "Remove obsolete files" ^
  --delete docs/obsolete.md ^
  --delete assets/old.bin
```

Combined add/replace/delete uses both `--desired` and repeatable `--delete`.

A new `packageId` is generated for every build. When `--change-set-id` is omitted, a new `changeSetId` is generated. Whether a supplied ChangeSet is actually still open is producer-workflow authority outside this local materializer.

## Failure contract

Failures that the caller/AI can correct are reported as validation failures and use exit code `2`:

```text
BUILD_FAILED
code=VALIDATION_FAILED
reason=INVALID_REPOSITORY
message=--repo must point to the Git worktree root, not a subdirectory.
provided=C:\work\repo\src
actualGitRoot=C:\work\repo
```

PB-01 validation reasons are intentionally limited to caller-controlled input/state:

- `INVALID_REQUEST` — malformed/missing CLI or build-request data;
- `INVALID_REPOSITORY` — wrong Git root or unsupported/missing GitHub origin;
- `INVALID_DESIRED_ROOT` — desired tree is missing, unreadable or placed inside the source repository;
- `INVALID_OUTPUT` — output location is unsafe, overlaps source/desired input, cannot be proven absent, or already exists;
- `INVALID_PATH` / `PATH_COLLISION` — desired operation paths cannot be represented safely by the current protocol;
- `UNSUPPORTED_FILE_TYPE` — a touched path or traversed repository ancestor uses a file type PB-01 does not model;
- `SOURCE_CHANGED` — a touched source precondition changed while the package was being built;
- `SOURCE_UNVERIFIABLE` — existence/absence of a touched source path cannot be proven safely, so ADD/REPLACE classification stops;
- `DESIRED_CHANGED` — desired inventory or bytes changed while they were being captured/verified;
- `INVALID_DELETE` — explicit delete target is absent or otherwise cannot satisfy delete intent;
- `NO_CHANGES` — requested input contains no resulting add/replace/delete operation.

Unexpected implementation, private-staging or otherwise ambiguous I/O, process, serialization or ZIP-integrity failures are not presented as caller mistakes. They use exit code `1` and a single public class:

```text
BUILD_FAILED
code=INTERNAL_ERROR
diagnosticId=<uuid>
message=Replacement Package Builder failed unexpectedly. Inspect stderr trace using diagnosticId.
```

For `INTERNAL_ERROR`, stderr contains the same `diagnosticId` followed by the raw Java stack trace so AI or a developer can investigate without the Builder inventing a recovery strategy.

## Safety / exactness

- Desired files are copied into private staging and the desired inventory/bytes are rechecked; edits during capture/build fail as `DESIRED_CHANGED` instead of producing a mixed package.
- Replace bases are copied byte-for-byte from the source repository and rechecked before publication.
- Delete bases are copied byte-for-byte from the source repository and rechecked before publication; delete operations never carry replacement payloads.
- Add paths use an exact existence probe: only proven absence becomes `add`; unverifiable source state fails closed as `SOURCE_UNVERIFIABLE`, and add paths are rechecked before publication.
- Symlink/non-regular touched files fail closed; V0.1 does not model them.
- Operation paths follow the current Windows-safe repository-relative protocol constraints and are checked for case-insensitive collisions.
- Large payload files are streamed from staged files into the ZIP rather than carried as model-visible text.
- Existing output paths are rejected and publication uses create-new semantics, so Builder never implicitly overwrites a file even if it appears after validation.
- The produced ZIP is reopened and manifest/payload correspondence plus exact payload bytes are checked before success is returned.
- The Builder does not mutate the source repository, apply/finalize packages, commit, push, update action logs or generate semantic edits.

## Tests

```bat
run-tests.cmd
```

The automated suite covers add/replace/no-op behavior, delete-only and combined delete builds, exact binary base/result preservation, deterministic package bytes, missing/colliding delete validation, repeatable delete CLI parsing, Git-root validation, disjoint source/desired/output boundaries, existing-output preservation, desired-state change detection, private-staging failures staying internal, path/collision failures, unsupported source shapes, repository identity/origin validation, no-op-only rejection, CLI validation routing and validation/internal failure rendering.
