# Replacement Package Protocol

Status: active V0.1 shared producer/consumer contract
Scope: exact protocol shared by the ChatGPT replacement-package producer and the local Windows Replacement Package App. Consumer-only state, Git execution and UI behavior are documented after the shared literal.

Producer owner:

`planning/documentation/build-replacement-archive-workflow.md`

Consumer/application entry:

`planning/documentation/tools/replacement-package-app/README.md`

## 1. Authority

The literal inside `obs-ref:def` below is the canonical shared producer/consumer protocol. The producer workflow carries a materialized `obs-ref:use` copy. Change shared fields/layout/rules here first, then synchronize the use through the Reference Object workflow.

<!-- obs-ref:def id="ro_replacement_package_shared_protocol" -->
### V0.1 package and action protocol

A replacement package is a ZIP with this repository-relative layout:

```text
<package>.zip
├── PACKAGE.json
├── base-files/
│   └── <repo-relative paths for replace/delete>
└── replacement-files/
    └── <repo-relative paths for add/replace>
```

`PACKAGE.json` schema version 1 is:

```json
{
  "schemaVersion": 1,
  "packageId": "<unique UUID for this ZIP>",
  "changeSetId": "<stable UUID for one logical ChangeSet>",
  "changeSetLabel": "<stable human-readable work label>",
  "repositoryIdentity": "github:<owner>/<repo>",
  "operations": [
    {"path":"repo/relative/path","action":"add|replace|delete"}
  ]
}
```

Shared rules:

- `repositoryIdentity` identifies the GitHub repository only; branch is not part of the identity. The producer emits a verified `github:<owner>/<repo>` value and the Windows consumer compares owner/repo case-insensitively against the configured repository's raw `remote.origin.url`.
- operation paths use `/`, are repository-relative Windows-valid file paths, contain no absolute prefix, `.` / `..` segment, empty segment, control character, reserved Windows name/character, trailing dot/space or traversal, and must not collide after Windows case-insensitive normalization;
- every concrete ZIP gets a new `packageId`;
- a correction/continuation of the same logical reviewed work keeps the same `changeSetId`; independent work gets a new `changeSetId`;
- `changeSetLabel` remains stable for one ChangeSet;
- `add`: `base-files/<path>` is absent, `replacement-files/<path>` is required, and the consumer requires the current target path to be absent before first ownership;
- `replace`: both payloads are required and current target bytes must exactly equal `base-files/<path>` before mutation;
- `delete`: base payload is required, replacement payload is absent, and current target bytes must exactly equal `base-files/<path>` before mutation;
- V0.1 has no native rename, chmod-only, symlink or submodule operation; a semantically acceptable rename is represented as delete + add;
- payload files not declared by `operations[]` are invalid;
- replacement payloads are complete resulting file bytes, never snippets or patches;
- `PACKAGE.json` is the authority for repository operations.

The handoff envelope is:

```text
OBS-ACTION/1
action: apply-package
name: <human-readable ApplicationAttempt label>
archive: <downloaded archive filename hint>
packageId: <same packageId as PACKAGE.json>
```

Action rules:

- `archive` is a filename/hint, not an absolute path or repository-operation authority;
- the consumer resolves/selects a concrete ZIP and requires its manifest `packageId` to exactly match the action `packageId`;
- `name` is presentation/history text and may vary between attempts;
- repository operations never appear in `OBS-ACTION`;
- clipboard/repo-file ReviewDiff handling never appears in `OBS-ACTION`; it is application configuration;
- V0.1 Finalize is not a second `OBS-ACTION`: the consumer uses the selected ChangeSet's persisted current ReviewDiff as the implicit Finalize baseline plus a local commit message; the ReviewDiff SHA-256 remains internal application state and is not user input.
<!-- /obs-ref:def -->

## 2. Consumer-Only Resolution

The V0.1 application has a configured repository root and optional selected archive path. When only an `OBS-ACTION` is supplied, archive resolution is bounded to explicit candidates such as the configured Downloads directory/current selection. A filename is only a hint; `packageId` is the package identity.

Resolution result must be unique after opening candidate `PACKAGE.json` files and comparing `packageId`. Zero matches produce `PACKAGE_NOT_FOUND`; ambiguous/malformed candidates do not authorize mutation.

## 3. Consumer Validation Order

```text
parse action/package input
→ open ZIP without unsafe extraction
→ validate archive entry paths/collisions
→ parse PACKAGE.json
→ validate schema/IDs/repositoryIdentity/operations
→ validate declared payload set
→ verify configured Git repository identity
→ resolve/create/continue ChangeSet
→ verify path ownership / dirty-unowned boundary
→ verify exact expected bases
→ prepare rollback material
→ mutate
→ verify resulting bytes
→ record attempt + cumulative ReviewDiff
```

No target file is changed before the complete package and all touched-path preconditions pass.

## 4. Error Codes

```text
SUCCESS
PACKAGE_INVALID
PACKAGE_NOT_FOUND
ACTION_PACKAGE_MISMATCH
REPOSITORY_MISMATCH
PATH_OWNERSHIP_CONFLICT
BASE_MISMATCH
RESULT_MISMATCH
STATE_DIVERGED
REVIEW_STALE
FINALIZE_FAILED
```

Errors are stable machine codes plus human-readable detail. Failed attempts remain local history whenever enough package/ChangeSet identity was resolved to record them.

## 5. Shared-Protocol Change Rule

A protocol change is complete only when:

1. this definition is updated;
2. the materialized use in `build-replacement-archive-workflow.md` is synchronized;
3. `.linked-notes/reference-objects.json` still routes the single definition/use correctly;
4. Core parser/validation and tests are updated;
5. the command ↔ app compatibility matrix in `USE-CASE-MAP.md` passes review.
