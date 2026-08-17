# Build Replacement Archive Workflow

Status: active reusable command-owner workflow
Scope: ChatGPT-side producer contract for the `давай архив` / `build replacement archive` command. This workflow defines package creation and handoff only; local application, review-diff handling, finalization and Git execution belong to the consumer/application side and are not part of this command.

Canonical command definition:

`planning/commands/build-replacement-archive.command.md`

## 1. Purpose

The command produces one replacement package plus one short structured action envelope that a local consumer can execute later.

Target flow:

```text
exact readable source state
  → build replacement ZIP
  → emit OBS-ACTION
  → stop
```

The command does **not**:

- apply the package to the user's filesystem;
- generate long PowerShell apply/diff commands;
- decide clipboard vs repository-file review-diff handling;
- create or review the consumer's cumulative diff;
- stage, commit or push Git changes;
- implement ChangeSet persistence, history, ledger, snapshots or Finalize.

Those are consumer/application responsibilities and will be documented separately.

## 2. Source Selection And Certainty

Resolve the source before creating a package.

```text
1. An archive attached in an earlier user message is not current automatically.

2. A source archive/snapshot may become the selected source for the active
   invocation when the user explicitly provides or selects it for that invocation
   (including as a response to a request for missing exact source), and inspection
   confirms that it belongs to the intended repository/target and contains the
   complete source needed for every touched path.

3. A same-message source archive is therefore convenient but not uniquely valid;
   explicit invocation-level selection plus checked repository/target/coverage is
   the requirement.

4. If a provided/selected archive is visibly for another repository/target, do not
   mix it with repository state. Report the mismatch and use another source only
   when the user intent and exact checked source make that safe.

5. If there is no applicable selected source archive/snapshot, use the current
   repository when every required source file can be read completely and reliably.

6. Request the minimum fresh source/snapshot needed only when size/tool limits
   or missing current content prevent reliable reading. A later user message that
   explicitly supplies that requested source can satisfy the same active invocation
   after the checks above.

7. Never guess the current base of a touched path.
```

A readable repository source does not prove the user's local working tree is identical. The package therefore carries exact expected base content for operations that require an existing path; the consumer must compare that expected base with actual local state before applying the operation.

## 3. Package Identity

Every concrete ZIP has a new unique `packageId`.

Logical work across corrections is grouped by `changeSetId`:

```text
new independent work
  → new changeSetId;

correction / continuation of the same reviewed work
  → same changeSetId;

new concrete ZIP in either case
  → new packageId.
```

`changeSetLabel` is a stable human-readable work label. The action envelope may use a more attempt-specific `name`.

Do not invent continuity with an older ChangeSet when the current task is independent.

## 4. ZIP Layout

V0.1 replacement packages use:

```text
<package>.zip
├── PACKAGE.json
├── base-files/
│   └── <repo-relative paths for replace/delete>
└── replacement-files/
    └── <repo-relative paths for add/replace>
```

Rules:

- paths are repository-relative;
- no absolute paths or traversal components;
- archive entries must not collide after path normalization;
- payload files must correspond to declared operations;
- every ZIP gets one `PACKAGE.json` at archive root.

## 5. `PACKAGE.json`

Schema version 1:

```json
{
  "schemaVersion": 1,
  "packageId": "<unique UUID>",
  "changeSetId": "<stable ChangeSet UUID>",
  "changeSetLabel": "<human-readable stable work name>",
  "repositoryIdentity": "<verified repository identity>",
  "operations": [
    {"path":"repo/relative/path","action":"add|replace|delete"}
  ]
}
```

The producer must obtain `repositoryIdentity` from verified source context rather than guessing it. The later consumer/application documentation may freeze a narrower machine representation; until then, package creation must not claim a repository identity that was not actually verified.

The manifest is the authority for intended repository operations. The action envelope is not allowed to expand the operation set.

## 6. Operation Contract

### `add`

```text
PACKAGE.json: action=add
base-files/<path>: absent
replacement-files/<path>: required
consumer precondition: current target path is absent
```

### `replace`

```text
PACKAGE.json: action=replace
base-files/<path>: required exact expected current content
replacement-files/<path>: required intended result content
consumer precondition: current target content exactly matches base-files/<path>
```

### `delete`

```text
PACKAGE.json: action=delete
base-files/<path>: required exact expected current content
replacement-files/<path>: absent
consumer precondition: current target content exactly matches base-files/<path>
```

V0.1 intentionally does not define native rename, chmod-only, symlink or submodule operations. Represent a file rename as one delete plus one add only when that representation is semantically acceptable.

## 7. Producer Validation

Before returning the ZIP, verify at minimum:

- `PACKAGE.json` parses and uses schema version 1;
- `packageId` is unique for this produced archive;
- `changeSetId` follows the current task continuity decision;
- `repositoryIdentity` came from checked source context;
- operation paths are safe normalized repository-relative paths;
- there are no duplicate/colliding operation paths;
- every add has replacement content and no base payload;
- every replace has both exact base and replacement payloads;
- every delete has exact base payload and no replacement payload;
- no undeclared payload file is present;
- replacement bytes are the complete intended files, not snippets or patches.

If exact current base content for a replace/delete is unavailable, stop and request the minimum exact source needed. Do not fabricate a base file.

## 8. `OBS-ACTION`

Return one short action envelope with the package:

```text
OBS-ACTION/1
action: apply-package
name: <human-readable attempt label>
archive: <downloaded archive filename>
packageId: <same packageId as PACKAGE.json>
```

Rules:

- `archive` is a filename/hint, not an absolute Downloads path;
- `packageId` must exactly match `PACKAGE.json`;
- `name` is presentation/history text and may vary between correction attempts;
- do not put clipboard/review-diff destination settings into `OBS-ACTION`;
- do not put repository operations into the action envelope; `PACKAGE.json` owns them.

## 9. Response Contract

A successful `давай архив` response contains:

1. the newly produced replacement ZIP;
2. one `OBS-ACTION/1` block;
3. a compact source/package summary when useful.

Do not add legacy PowerShell apply/diff stages. Do not ask the user to paste a diff as part of this command. Do not emit commit/push commands.

## 10. Future Producer / Consumer Synchronization Boundary

The package layout, manifest fields and action-envelope fields above are shared producer/consumer protocol material.

When the separate replacement-package application documentation exists, the stable shared literal protocol may be owned canonically there and materialized into this command documentation with a Linked Notes Reference Object. Do not create a live `obs-ref:use` ahead of that canonical definition. A new Reference Object requires its definition and consistent registry record in the same intended repository state.

## 11. Boundaries

This workflow intentionally leaves the following to separate application documentation/source:

```text
ZIP discovery in Downloads
consumer-side PACKAGE validation
repository path ownership / ChangeSet ledger
ApplicationAttempt history
atomic apply implementation
canonical cumulative ReviewDiff generation
review-diff clipboard/repo-file settings
review identity / stale approval checks
Finalize staging/commit/push
snapshot/resync behavior
consumer error/recovery UI
```

Do not pull these concerns back into the ChatGPT package command merely because the consumer needs them.
