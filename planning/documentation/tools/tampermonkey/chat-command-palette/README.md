# OBS Planning Helper — Developer / Build Entry

Status: active modular Tampermonkey helper implementation
Version: `0.22.0`
Scope: source, tests, deterministic build, repository planning-command management, local helper commands, prompts and bounded GitHub persistence.

## Read Order

1. `planning/planning-use-case-map.md` when working on real planning commands.
2. `planning/commands/README.md` for repository planning-command authority.
3. `planning/helper-library/README.md` for local helper commands/prompts and their repository copy format.
4. `planning/documentation/tampermonkey-command-projection-workflow.md`.
5. this file and focused `src/**` / `tests/**` as needed.

These are deliberately different registries:

```text
planning/commands/*.command.md
  = real planning commands: route, owners, permissions, canonical command semantics;

planning/helper-library/commands/*.helper-command.md
  = user-authored helper command text saved from the Local Cmds surface;

planning/helper-library/prompts/*.prompt.md
  = arbitrary reusable prompt text saved from the Prompts surface.
```

A helper-library item never becomes a planning command merely because it is stored in the repository.

Helper-library `text` is preserved without trimming; browser/CRLF line endings normalize to LF. Marker delimiters are structural only when they occupy their own document lines, so arbitrary prompt text may mention the marker tokens literally. Titles remain single printable lines.

The install artifact is generated:

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Do not edit the generated userscript manually.

## Structure

```text
src/
  command-definition-codec.js
  command-catalog.js
  command-body.js
  semantic-projections.js
  helper-library-codec.js
  github-contents-client.js
  repository-command-service.js
  repository-helper-library-service.js
  planning-helper-state.js
  composer-insertion.js
  planning-helper-ui.js
  planning-helper-runtime.js

tests/
  command-definition-codec.test.mjs
  command-catalog.test.mjs
  command-body.test.mjs
  helper-library-codec.test.mjs
  github-contents-client.test.mjs
  repository-command-service.test.mjs
  repository-helper-library-service.test.mjs
  planning-helper-policy.test.mjs
```

## Build / Test / Verify

From this directory:

```text
npm run build
npm test
npm run verify
```

`npm run verify` checks JavaScript syntax, the complete dynamically discovered planning-command catalog, every planning-command `ownerFiles` and refinement `readRequired` path, focused tests and deterministic generated-artifact equality. It does not hard-code the number of planning commands.

## Planning Commands

At build time all valid direct `planning/commands/*.command.md` files are embedded as the offline planning-command catalog. `Commands -> Refresh repo` reads the current remote catalog. `Add / Update planning commands` accepts strict `[PLANNING_COMMAND_DEFINITION]` blocks and uses an immutable preview plan containing repository identity, full catalog snapshot and target SHAs/absence expectations.

Planning-command writes remain confined to direct:

```text
planning/commands/*.command.md
```

## Local Cmds / Prompts

The helper has two local-library surfaces:

```text
Local Cmds
  → exact user-authored command text;

Prompts
  → exact arbitrary reusable prompt text.
```

`Save local` stores the item in Planning Helper GM storage. The item can be inserted/copied without a network request.

A local row with a local copy exposes `Repo`. That action first previews the exact configured `owner/repository@branch`, deterministic target path and current SHA/absence, then requires explicit `Save to GitHub`. A stale target or changed repository identity stops before the write.

Repository paths are hard-confined to:

```text
planning/helper-library/commands/<id>.helper-command.md
planning/helper-library/prompts/<id>.prompt.md
```

`Refresh repo library` is an explicit synchronization action. The helper keeps a long-lived GM repository snapshot with item text, repository path, GitHub SHA and fetch time. The snapshot has no automatic TTL: startup, tab switching, Insert, Copy and Edit use cached/local text without GitHub requests. Refresh lists the two repository folders, reuses cached text when the listed SHA matches, and downloads only new or changed files. Repository-deleted records disappear from the repository snapshot on that explicit refresh; local copies remain. Repository-only entries can be copied into local storage through `Save local` before editing.

The old page-local projection registry is imported idempotently when readable:

```text
localStorage:
  obs-planning-helper-command-projections-v1

→ Planning Helper GM local library
```

The old key is not deleted. Its normalized command projection is converted to exact `[PLANNING_COMMAND]` insertion text. This migration does not register a repository planning command.

## Credentials / State

Planning Helper owns its own Tampermonkey GM namespace:

```text
obsPlanningHelper:v1:repositorySettings
obsPlanningHelper:v1:githubToken
obsPlanningHelper:v1:commandCatalogCache
obsPlanningHelper:v1:localLibrary
obsPlanningHelper:v1:repositoryLibraryCache  # schema v2: long-lived records with item/path/SHA/fetchedAt
```

The generated userscript declares `GM_getValue`, `GM_setValue` and `GM_xmlhttpRequest`; runtime code accesses those granted APIs directly rather than assuming they are properties of `globalThis`.

The GitHub credential never belongs in planning-command files, helper-library files, generated userscript content, caches or logs. It is separate from Linked Notes credentials.

Panel position remains in page `localStorage` at `obs-planning-helper-position-v2`.

## Repository Operation Boundary

Planning-command refresh/preview/save, helper-library refresh/preview/save and repository-settings writes share one serialized repository-operation boundary. An in-flight write dialog cannot be dismissed into a hidden write. The helper never runs local Git, commit or push.

Every successful GitHub PUT uses exact read-back verification. Unknown network results are read before retry. Helper-library writes are single-item operations; after a verified write the returned path/SHA/text update only that cached repository record instead of triggering a full library refresh. Planning-command batch writes remain sequential and report partial results honestly.

## Composer Diagnostics

Composer insertion keeps local timing/reason diagnostics for success, composer-not-found, contenteditable rejection and mutation exceptions. Diagnostics do not add network calls or retry loops.
