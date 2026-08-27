# Build Replacement Archive Workflow

Status: active reusable command-owner workflow
Scope: ChatGPT-side producer contract for the `давай архив` / `build replacement archive` command. This workflow defines package creation and handoff only; local application, review-diff handling, finalization and Git execution belong to the consumer/application side and are not part of this command.

Canonical command definition:

`planning/commands/build-replacement-archive.command.md`

Consumer/application entry:

`planning/documentation/tools/replacement-package-app/README.md`

## 1. Purpose

The command produces one replacement package plus one short structured action envelope that a local consumer can execute later.

```text
exact readable source state
  → build replacement ZIP
  → emit OBS-ACTION
  → stop
```

The command does **not** apply the package, generate long PowerShell apply/diff commands, decide ReviewDiff handling, create/review the consumer cumulative diff, stage/commit/push, or implement ChangeSet/ApplicationAttempt persistence. Those are application responsibilities.

## 2. Source Selection And Certainty

Resolve the source before creating a package.

```text
1. An archive attached in an earlier user message is not current automatically.
2. A source archive/snapshot may become selected for the active invocation when
   the user explicitly provides/selects it for that invocation (including as a
   response to a request for missing exact source) and inspection confirms target
   repository identity plus complete touched-source coverage.
3. Same-message attachment is convenient but not uniquely valid; explicit
   invocation-level selection + checked repository/target/coverage is the rule.
4. Never mix a visibly wrong-repository snapshot with repository state.
5. Otherwise use the current repository only when every required touched source
   can be read completely and reliably.
6. Request only the minimum fresh source needed when exact touched base is missing.
7. Never guess the current base of a touched path.
```

A readable repository source does not prove the user's local working tree is identical. Exact expected base bytes travel in the package where required and are consumer preconditions.

## 3. Package / ChangeSet Identity

```text
new independent logical work
→ new changeSetId

correction/continuation of same logical work
AND current ChangeSet is still OPEN
→ same changeSetId

ReviewDiff accepted as APPROVABLE
→ current ChangeSet FINALIZED / CLOSED for producer continuity

any package requested after that boundary
→ new changeSetId
→ new stable changeSetLabel

any newly produced ZIP
→ new packageId
```

`changeSetLabel` stays stable for one open ChangeSet. `OBS-ACTION name` may be attempt-specific.

Before reusing a prior `changeSetId`, verify that no accepted `APPROVABLE` ReviewDiff has finalized it. “Same logical work” is a reuse rule only while the ChangeSet is open. Conceptual continuity, overlapping files, or a later correction do **not** reopen a finalized ChangeSet.

## 4. Shared Producer / Consumer Protocol

The literal below is a materialized Reference Object use. Canonical definition:

`planning/documentation/tools/replacement-package-app/PACKAGE-PROTOCOL.md`

<!-- obs-ref:use id="ro_replacement_package_shared_protocol" -->
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
chatTabTitle: <optional exact intended ChatGPT conversation/tab title hint>
```

Action rules:

- `archive` is a filename/hint, not an absolute path or repository-operation authority;
- the consumer resolves/selects a concrete ZIP and requires its manifest `packageId` to exactly match the action `packageId`;
- `name` is presentation/history text and may vary between attempts;
- `chatTabTitle` is optional and may be omitted. When present, it is a destination-binding hint only: it never identifies the package, Repository Target or ChangeSet and never grants repository-operation authority. Consumer title-matching configuration is local application state and is never carried in `OBS-ACTION`;
- before any repository mutation, the consumer parses the action once and builds one prepared Apply context. `chatTabTitle` is normalized together with current inventory titles by deleting only the Unicode characters configured in the persisted `reviewChatTitleIgnoredCharacters` setting, then compared by exact case-sensitive equality. The default ignored-character set is empty, preserving literal matching. Zero or multiple matches never guess a destination; they are warnings in operation Output and Apply may continue with manual binding available;
- in the interactive Swing consumer, when exactly one prepared destination differs from an existing persisted Review-chat binding, repository mutation requires an explicit user decision made before Apply: keep the existing binding, Apply and rebind to the prepared destination, or cancel. Rebind authorization is refused while existing bridge safety rules make rebinding unsafe. If the ChangeSet/binding state used by the prepared decision changes before execution, the prepared Apply is stale and must be prepared/confirmed again before mutation. The current non-interactive CLI `apply --action-file` compatibility path cannot obtain this confirmation and, as a known accepted divergence, keeps the existing binding/no action-driven rebind;
- actual bind/rebind occurs only after successful repository Apply and uses the already prepared `conversationKey` through the same persisted binding service used by manual selection; the title is not reparsed/rematched after Apply. Failed repository Apply leaves the binding unchanged. Duplicate browser tabs of one conversation remain governed by existing conversation-key / duplicate-tab claim serialization rather than by the title hint;
- known accepted concurrency risk: the prepared binding/state assumptions are revalidated before repository mutation, but manual Bind/Unbind is not serialized against an already-running background Execute. A manual binding change made during Execute may therefore be overwritten by the previously authorized prepared rebind after successful Apply; this revision does not claim that concurrency window is hardened;
- repository operations never appear in `OBS-ACTION`;
- clipboard/repo-file ReviewDiff handling never appears in `OBS-ACTION`; it is application configuration;
- V0.1 Finalize is not a second `OBS-ACTION`: the consumer uses the selected ChangeSet's persisted current ReviewDiff as the implicit Finalize baseline plus a local commit message; the ReviewDiff SHA-256 remains internal application state and is not user input.
<!-- /obs-ref:use -->

Producer-specific `chatTabTitle` rule: emit this optional field only when the exact intended ChatGPT title has been explicitly supplied/selected for the active invocation. Do not infer a browser title from the discussion topic, ChangeSet label or conversation prose. If no exact title is known, omit the field and preserve the existing manual Review-chat binding flow.

## 5. Producer Validation

Before returning the ZIP, verify at minimum:

- the shared protocol literal above is current when protocol freshness is in scope;
- `PACKAGE.json` parses and satisfies schema 1;
- IDs are valid for the current continuity decision;
- `repositoryIdentity` came from checked source context, not guessing;
- operation paths and archive entries satisfy shared path/collision rules;
- every operation has exactly the required base/replacement payloads and no undeclared payload file exists;
- replacement bytes are complete intended files, not snippets or patches;
- when `chatTabTitle` is emitted, it is the exact explicitly supplied intended title for this invocation rather than a guessed title.

If exact current base content for replace/delete is unavailable, stop and request the minimum exact source needed.

## 6. Response Contract

Successful `давай архив` response contains:

1. the newly produced replacement ZIP;
2. one `OBS-ACTION/1` block from the shared protocol;
3. compact source/package summary when useful.

Do not add legacy PowerShell apply/diff stages, request pasted diff as part of this command, or emit commit/push commands.

## 7. Application Boundary

The application owns ZIP discovery, consumer validation, repository path ownership/ChangeSet ledger, ApplicationAttempt history, mutation/rollback, cumulative ReviewDiff, diff handoff settings, review identity/staleness checks, Finalize and recovery. Do not pull those concerns back into the ChatGPT producer command.

## 8. Registered Scope / Action-Log Final-State Rule

When the target repository defines a root Parallel Work Scope Registry, package production must resolve it before finalizing operations.

```text
operations/target paths
→ affected registered scopes (deepest active root wins)
→ one canonical log for cross-scope work
→ complete cumulative post-apply canonical log
→ reference-only updates in every other affected scope log
```

When logging is active, the package target-state log must account for material `собери идеи` output, later ordinary material clarifications, and material corrections selected from prior ReviewDiff. The package also records `APPLIED` meaning for what will become true if this exact package successfully applies.

A producer must treat the current package as potentially final: do not intentionally leave logs stale for a hypothetical later package. Existing logs use exact base bytes + complete replacement bytes; new logs use ordinary `add` operations. The V0.1 package schema itself does not change.

A plain `APPROVABLE` ReviewDiff with no new material meaning does not require a log entry or a closing package. **However, once that APPROVABLE ReviewDiff is accepted, the current ChangeSet is finalized/closed for replacement-package continuity. The next replacement archive, if any, MUST start a new ChangeSet.**
