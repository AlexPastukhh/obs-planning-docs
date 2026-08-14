# OBS Planning Helper — Developer / Build Entry

Status: active modular Tampermonkey helper implementation
Version: `0.20.2`
Scope: source, tests, deterministic build and explicit GitHub command-file management for the reusable OBS Planning Helper.

## Read Order

1. `planning/planning-use-case-map.md`
2. `planning/commands/README.md`
3. `planning/documentation/tampermonkey-command-projection-workflow.md`
4. this file
5. focused `src/**` / `tests/**` as needed

The project command registry is **not** source code:

```text
planning/commands/*.command.md
```

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
  github-contents-client.js
  repository-command-service.js
  planning-helper-state.js
  composer-insertion.js
  planning-helper-ui.js
  planning-helper-runtime.js

tests/
  command-definition-codec.test.mjs
  command-catalog.test.mjs
  command-body.test.mjs
  github-contents-client.test.mjs
  repository-command-service.test.mjs
  planning-helper-policy.test.mjs
```

## Build / Test / Verify

From this directory:

```text
npm run build
npm test
npm run verify
```

`npm run verify` checks JavaScript syntax, the complete dynamically discovered repository command catalog, every `ownerFiles` and refinement `readRequired` path, focused tests and deterministic generated-artifact equality. It does not hard-code the number of commands.

## Repository Command Runtime

At build time all valid direct `planning/commands/*.command.md` files are embedded as the offline catalog.

At runtime:

```text
Refresh repo
  → list/read current planning/commands/*.command.md
  → validate the complete remote catalog
  → replace the in-memory catalog only after complete validation
  → save a secret-free last-good GM cache bound to owner/repository/branch.
```

A bad remote file does not erase the current bundled/last-good catalog. A cache from another owner/repository/branch is ignored; changing repository settings restores bundled commands until the new target is explicitly refreshed.

## Explicit GitHub Create / Update

`Add / Update commands` accepts one or more `[PLANNING_COMMAND_DEFINITION]` blocks.

Before writes:

- every block parses;
- the batch is unique;
- the merged remote catalog validates;
- every target is a direct `planning/commands/*.command.md` path.

`Parse & Preview` captures one save plan containing exact `owner/repository@branch` identity, the complete current command-catalog path/SHA snapshot, each update target's SHA and each create target's absence expectation. `Save to GitHub` uses that exact plan and does not re-preview or retarget. If repository settings or any command file changed, appeared or disappeared after Preview, Save stops before writes and requires a new Preview. Preview, refresh, repository-settings save and GitHub save share one operation lock; while an operation is active a second repository operation is rejected, and an in-flight Save dialog cannot be dismissed into a hidden write. Writes are sequential in v1; after the initial snapshot check, later per-target conflicts can still produce partial success and are reported explicitly. Every successful PUT is read back and compared exactly, and an unknown network result is read before retry.

Delete is not implemented in this slice.

## Credentials / State

Planning Helper owns its own Tampermonkey GM namespace:

```text
obsPlanningHelper:v1:repositorySettings
obsPlanningHelper:v1:githubToken
obsPlanningHelper:v1:commandCatalogCache
```

The GitHub credential never belongs in command files, generated userscript content, command-catalog cache or logs. It is separate from Linked Notes credentials.

Panel position remains in the existing page `localStorage` position key so the UI position survives the modular migration.

## GitHub Scope

Repository settings may select owner/repository/branch. All three fields are required exactly as entered; empty values are rejected instead of falling back to defaults. Command writes are hard-confined in code to:

```text
planning/commands/<direct-child>.command.md
```

The helper never runs local Git, commit or push.

## Composer Diagnostics

Composer insertion keeps the pre-modular local timing/reason diagnostics for success, composer-not-found, contenteditable rejection and mutation exceptions. Diagnostics do not add network calls or retry loops.
