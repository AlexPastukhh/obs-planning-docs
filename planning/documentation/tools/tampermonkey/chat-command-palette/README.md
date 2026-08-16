# OBS Planning Helper — Developer / Build Entry

Status: active modular Tampermonkey helper implementation
Version: `0.23.1`
Scope: deterministic Planning Helper source/build, RAM-first local persistence, ChatGPT-mediated recovery, clipboard-first insertion and create-only GitHub backup of newly imported records.

## Read Order

1. `planning/planning-use-case-map.md` for global command-system policy.
2. `planning/commands/README.md` for planning-command authority.
3. `planning/helper-library/README.md` for Local Cmds / Prompts.
4. `planning/documentation/tampermonkey-command-projection-workflow.md`.
5. this file and focused `src/**` / `tests/**`.

Repository command definitions remain authority. The Planning Helper is only a local projection/editor/runtime.

## Runtime Model

```text
startup
  → GM_getValue(obsPlanningHelper:v2:localSnapshot) once on the warm path
  → validate snapshot
  → materialize planning commands / helper commands / prompts in RAM
  → normal work uses RAM only
```

Normal startup, tab switching, search, Insert, Copy, local edit/delete and restore do not read GitHub. There is no `Refresh repo`, `Refresh repo library`, `Sync all` or background repository polling.

The first run after upgrading may migrate the old command/library/cache GM records into the unified snapshot. Legacy records are not deleted by migration.

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

Changing repository settings does not clear or rebind the local snapshot.

## ChatGPT Recovery

`Copy recovery request` puts a recovery request in the clipboard. The request tells ChatGPT to read:

```text
planning/commands/*.command.md
planning/helper-library/commands/*.helper-command.md
planning/helper-library/prompts/*.prompt.md
```

and return the complete current set of exact `[PLANNING_COMMAND_DEFINITION]` and `[PLANNING_HELPER_LIBRARY_ITEM]` marker blocks.

`Restore from GitHub copy` treats that complete pasted set as authoritative for repository-backed local records: it replaces/reconciles that portion, removes stale repository-backed records absent from the complete set, preserves local-only/unbacked records, and marks pasted records as repository-known. Restore performs **zero GitHub requests and zero GitHub writes**.

## Import From ChatGPT / GitHub Boundary

`Import from ChatGPT` parses the same marker formats.

```text
existing local record
  → update local snapshot only
  → 0 GitHub requests

locally new or locally-unbacked record
  → save local snapshot first
  → attempt one create-only GitHub Contents PUT
  → no preliminary GET
  → no directory listing
  → no read-back GET
  → no UPDATE fallback
  → no DELETE
```

Planning-command backup paths are confined to direct `planning/commands/*.command.md`. Helper-library backup paths are confined to:

```text
planning/helper-library/commands/<id>.helper-command.md
planning/helper-library/prompts/<id>.prompt.md
```

If GitHub reports that a create target already exists, the result is a conflict. The helper does not read the existing file and does not overwrite it. Local state remains intact.

A network-unknown create result is also reported without a verification GET. The user can inspect GitHub or use ChatGPT recovery later.

## Clipboard / Insert Contract

Every Insert action prepares the exact clipboard body **before** composer mutation. The fast path first attempts a synchronous user-gesture `copy`; when the browser requires the async Clipboard API, composer mutation waits for that copy attempt to finish. The exact same local string is then passed to the composer insertion path. This contract is identical for planning commands, Local Cmds and Prompts; Prompt Helper rows use their exact saved `text` with no separate fetch/normalization path.

The helper does not rely on a synthetic browser `paste` command because browsers restrict scripted system-clipboard paste. The invariant is therefore `exact local body → clipboard ready/attempt completed → the same exact body → composer`. If direct composer insertion fails after a successful copy, the exact body is already available for normal manual paste (`Ctrl+V`).

Composer lookup caches the last connected composer. Repeated insertion into the same live composer avoids a new selector/layout scan. A disconnected/replaced composer invalidates the cache and is rediscovered.

## Structure

```text
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

`github-contents-client.js`, `repository-command-service.js` and `repository-helper-library-service.js` expose only the create-only backup path used by Planning Helper. The client has no GET/list/read/read-back/update/delete surface.

## Build / Test / Verify

From this directory:

```text
npm run build
npm test
npm run verify
```

`npm run verify` checks JavaScript syntax, the dynamically discovered planning-command catalog, owner/refinement path existence, focused tests and generated-artifact equality. The number of planning commands is not hard-coded.

The install artifact is generated:

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Do not edit it manually.

## Safety Boundary

The Planning Helper never runs local Git, commit or push. It never updates or deletes an existing GitHub command/helper-library file. Repository communication is limited to explicit create-only backup attempts for locally new/unbacked records imported from ChatGPT.
