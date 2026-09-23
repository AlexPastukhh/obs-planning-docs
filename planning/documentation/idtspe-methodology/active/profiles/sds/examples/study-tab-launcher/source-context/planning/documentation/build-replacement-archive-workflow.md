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

Once an `APPROVABLE` ReviewDiff is accepted, the next replacement archive MUST start a new ChangeSet.

## 4. Shared Producer / Consumer Protocol

The canonical package/action protocol is owned directly by:

[`tools/replacement-package-app/PACKAGE-PROTOCOL.md`](tools/replacement-package-app/PACKAGE-PROTOCOL.md)

Read that owner when constructing or validating a replacement package / `OBS-ACTION/1` handoff. Do not keep a copied protocol body or synchronization marker in this producer workflow.

Producer-specific rule: emit `targetBranch` for ordinary automatic Git-backed `apply-package` exactly as required by the canonical protocol. `chatContextToken` is emitted only when the active invocation explicitly supplies the corresponding capture side effect; `chatTabTitle` remains legacy fallback metadata only when explicitly supplied and no token is used.

## 5. Producer Validation

Before returning the ZIP, verify at minimum:

- the canonical `PACKAGE-PROTOCOL.md` owner was read when protocol semantics are in scope;
- `PACKAGE.json` parses and satisfies schema 1;
- IDs are valid for the current continuity decision;
- `repositoryIdentity` came from checked source context, not guessing;
- for new independent target-mode work, `workIntent` is present and its `changeSetId` / `repositoryIdentity` exactly match the package while title/goal/why/acceptance reflect the selected semantic work;
- operation paths and archive entries satisfy shared path/collision rules;
- every operation has exactly the required base/replacement payloads and no undeclared payload file exists;
- replacement bytes are complete intended files, not snippets or patches;
- when `chatContextToken` is emitted, it exactly matches the active invocation side-effect requirement and is scoped to this action only;
- when legacy `chatTabTitle` is emitted, it is the exact explicitly supplied intended title for this invocation rather than a guessed title, and it is not used alongside token authority.

If exact current base content for replace/delete is unavailable, stop and request the minimum exact source needed.

## 6. Response Contract

Successful `давай архив` response contains:

1. the newly produced replacement ZIP;
2. one `OBS-ACTION/1` block from the shared protocol;
3. compact source/package summary when useful.

Do not add legacy PowerShell apply/diff stages, request pasted diff as part of this command, or emit commit/push commands.

## 7. Application Boundary

The application owns ZIP discovery, consumer validation, repository path ownership/ChangeSet ledger, ApplicationAttempt history, mutation/rollback, cumulative ReviewDiff, diff handoff settings, review identity/staleness checks, Finalize and recovery. Do not pull those concerns back into the ChatGPT producer command.
