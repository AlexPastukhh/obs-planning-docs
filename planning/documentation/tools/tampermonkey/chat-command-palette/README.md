# OBS Planning Helper — Developer / Build Entry

Status: active modular Tampermonkey helper implementation
Version: `0.24.2`
Scope: deterministic Planning Helper source/build, RAM-first local persistence, explicit GitHub check/save/sync, ChatGPT-mediated recovery fallback and clipboard-first insertion.

## Read Order

1. `planning/command-routing.md` for global command-system policy.
2. `planning/commands/README.md` for planning-command authority.
3. `planning/helper-library/README.md` for Local Cmds / Prompts repository format.
4. `planning/documentation/tools/tampermonkey/chat-command-palette/USE-CASE-REGISTRY.md` for canonical application Use-Case identities/statuses.
5. `planning/documentation/tools/tampermonkey/chat-command-palette/scenarios/README.md` for behavior, relationships and exact docs → code → tests → acceptance traceability.
6. `planning/documentation/tools/tampermonkey/chat-command-palette/MANUAL-ACCEPTANCE.md` for browser/real-GitHub acceptance.
7. `planning/documentation/tampermonkey-command-projection-workflow.md`.
8. this file and focused `src/**` / `tests/**`.

Repository command definitions remain authority. The Planning Helper is a local projection/editor/runtime; its explicit repository actions do not redefine command meaning.

## Runtime Model

```text
startup
  → GM_getValue(obsPlanningHelper:v2:localSnapshot) once on the warm path
  → validate snapshot
  → materialize planning commands / helper commands / prompts in RAM
  → normal work uses RAM only

explicit repository action
  → Check GitHub | Sync missing | Save GitHub
  → GitHub Contents API only for that action
  → update RAM/local snapshot only when the action contract says so
```

Normal startup, tab switching, search, Insert, Copy, local edit/delete, ChatGPT import and pasted Restore do not read GitHub. There is no background repository polling.

The first run after upgrading may migrate old command/library/cache GM records into the unified snapshot. Legacy records are not deleted by migration.

## Unified Local Snapshot

Primary persistent state:

```text
obsPlanningHelper:v2:localSnapshot
```

Schema v1 contains:

```text
planningCommands[]
  definition
  rawContent
  path
  repositoryKnown
  repositorySha

helperItems[]
  item
  rawContent
  path
  repositoryKnown
  repositorySha
```

`rawContent` is the exact normalized LF document representation. At runtime the validated records are materialized once into Maps/entry arrays; Insert/Copy never perform a GM read.

Repository settings/token remain separate:

```text
obsPlanningHelper:v1:repositorySettings
obsPlanningHelper:v1:githubToken
```

`repositoryKnown` records exact-content repository evidence/provenance; `repositorySha` is present only when direct GitHub evidence supplied a concrete SHA. Repository-known content may therefore have no SHA (for example bundled repository content or pasted recovery evidence). A direct SHA implies repository-known content. Real local content changes clear both.

Changing owner/repository/branch preserves local content but clears per-record repository evidence metadata **before** the new source settings become active, so old-source evidence cannot be rebound to a new repository/branch.

## Repository-Backed Entities

```text
Commands
  planning/commands/*.command.md

Local Cmds
  planning/helper-library/commands/*.helper-command.md

Prompts
  planning/helper-library/prompts/*.prompt.md
```

Orientation, Directions and Use Cases remain build-time/read-only semantic projections. They are not a second writable repository registry.

### Check GitHub

`Check GitHub` lists direct GitHub directory metadata and compares local/GitHub path-name sets and counts for all three repository-backed entity kinds. It reports same-path, local-only and GitHub-only names. Same-path is inventory overlap only and does not claim file-content equality. It does not mutate local state and does not fetch every file body merely to count/compare inventory.

### Sync missing

`Sync missing` runs the inventory comparison, GETs only repository paths absent locally, parses/validates those files and adds them to the unified local snapshot. It never overwrites a same-path local record.

### Save GitHub

Each Commands / Local Cmds / Prompts row has `Save GitHub`.

```text
remote target absent
  → create

remote target exists and exact rendered bytes match
  → no-op

remote helper target exists but helper-library document is malformed
  → explicit Save keeps that exact current SHA as optimistic base
  → replace only the same deterministic helper target with the valid local rendered document

remote target exists and differs
  → update using current remote SHA

write returns optimistic SHA conflict
  → reread current remote exactly once
  → if remote bytes now equal intended bytes: verified recovered success, use fresh SHA, no second PUT
  → if remote bytes differ: real conflict, do not overwrite/retry automatically
  → if the reread itself fails: remote relation remains unknown; report verification failure and do not claim confirmed divergence

successful or recovered remote result
  → exact content is verified
  → attempt to update repositoryKnown/repositorySha for that local record
  → if browser-local persistence fails after remote verification, report remote success + local metadata warning (do not relabel it as GitHub failure)
```

Planning-command saves additionally read/validate the complete direct remote command catalog before writing, so a save cannot knowingly create an ambiguous command registry. Helper command/prompt saves are confined to their deterministic helper-library path. Malformed-document repair exists only on explicit Save for that deterministic target; `Sync missing` and ordinary remote reads remain strict and do not repair malformed repository content.

Repository delete is not implemented. Local Delete remains local-only.

## ChatGPT Import And Recovery

`Import from ChatGPT` parses planning-command/helper-library marker blocks and merges them into the local snapshot only. It makes zero GitHub requests. Use per-row `Save GitHub` explicitly when repository persistence is wanted.

`Copy recovery request` + `Restore from GitHub copy` remains available as a manual/offline fallback. Restore reconciles the pasted repository-backed marker set locally while preserving local-only records and performs zero GitHub requests/writes from the helper.

## Clipboard / Insert Contract

Every Insert action prepares the exact clipboard body **before** composer mutation. The fast path first attempts a synchronous user-gesture `copy`; when the browser requires the async Clipboard API, composer mutation waits for that copy attempt to finish. The exact same RAM string is then passed to composer insertion. This contract is identical for planning commands, Local Cmds and Prompts.

The helper does not rely on synthetic browser paste. If direct insertion fails after a successful copy, the exact body is already available for normal manual paste (`Ctrl+V`).

Composer lookup caches the last connected composer. Repeated insertion into the same live composer avoids a new selector/layout scan. A disconnected/replaced composer invalidates the cache and is rediscovered.

For ChatGPT `contenteditable` composers, insertion uses one direct `Range.insertNode()` mutation followed by one `input` event instead of `document.execCommand('insertText')`. This is the accepted correction for the previously observed multi-second synchronous insertion stall. Repository check/save/sync is not called from this path.

## Structure

```text
USE-CASE-REGISTRY.md
scenarios/README.md
MANUAL-ACCEPTANCE.md
src/
  command-definition-codec.js
  command-catalog.js
  command-body.js
  semantic-projections.js
  helper-library-codec.js
  chat-recovery.js
  github-contents-client.js
  repository-command-service.js
  repository-helper-library-service.js
  planning-helper-state.js
  composer-insertion.js
  planning-helper-ui.js
  planning-helper-runtime.js
```

`github-contents-client.js` owns generic GitHub Contents list/read/write/read-back behavior. Repository services confine paths and entity parsing/validation. Runtime exposes those services only through explicit repository UI actions.

## Build / Test / Verify

From this directory:

```text
npm run build
npm test
npm run verify
```

`npm run verify` checks JavaScript syntax, the dynamically discovered planning-command catalog, owner/refinement path existence, focused tests (including Use-Case registry/map traceability invariants) and generated-artifact equality. The number of planning commands is not hard-coded.

The install artifact is generated:

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Do not edit it manually.

## Safety Boundary

The Planning Helper never runs local Git, commit or push. GitHub I/O happens only after explicit `Check GitHub`, `Sync missing` or `Save GitHub` actions. Normal insertion/copy/import remains RAM/local-only. Repository deletion is not part of this slice.
