# OBS Planning Helper — Developer / Build Entry

Status: active modular Tampermonkey helper implementation
Version: `0.27.0`
Scope: deterministic Planning Helper source/build, Direction-nested Commands/Use Cases, focused semantic Use-Case activation, RAM-first local persistence, explicit GitHub repository actions, ChatGPT-mediated recovery fallback and clipboard-first insertion.

## Read Order

1. `planning/command-routing.md` for global command-system policy.
2. `planning/commands/README.md` for real Planning Command definition authority.
3. `planning/helper-library/README.md` for Prompts / legacy insertion compatibility.
4. `planning/documentation/tools/tampermonkey/chat-command-palette/scenarios/README.md` for canonical application Scenario identities/statuses and routes to exact docs → code → tests → acceptance traceability.
5. `planning/documentation/tools/tampermonkey/chat-command-palette/MANUAL-ACCEPTANCE.md` for browser/real-GitHub acceptance.
6. `planning/documentation/tampermonkey-command-projection-workflow.md`.
7. this file and focused `src/**` / `tests/**`.

Repository command definitions remain authority. The Planning Helper is a local projection/editor/runtime; its explicit repository actions do not redefine command meaning.

## Runtime Model

```text
startup
  → GM_getValue(obsPlanningHelper:v2:localSnapshot) once on the warm path
  → validate snapshot
  → materialize planning commands / prompts / legacy helper-command compatibility records in RAM
  → normal work uses RAM only

explicit repository action
  → Check GitHub | Sync missing | Reload GitHub | Save GitHub
  → GitHub Contents API only for that action
  → update RAM/local snapshot only when the action contract says so
```

Normal startup, tab switching, search, Insert, Copy, local command/prompt draft edit/delete, ChatGPT import and pasted Restore do not read GitHub. `Reload GitHub` is an explicit repository action. There is no background repository polling.

The first run after upgrading may migrate old command/library/cache GM records into the unified snapshot. Legacy records are not deleted by migration.

## Unified Local Snapshot

Primary persistent state:

```text
obsPlanningHelper:v2:localSnapshot
```

Schema v2 contains:

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

hiddenCommandIds[]
hiddenUseCaseIds[]
```

`rawContent` is the exact normalized LF document representation. At runtime the validated records are materialized once into Maps/entry arrays; Insert/Copy never perform a GM read. `hiddenCommandIds` / `hiddenUseCaseIds` are local-only tombstones used by Delete so a normal userscript restart/update does not immediately resurrect an item the user intentionally removed locally.

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
  → current surface supports validated local create/edit drafts, local-only Delete, Save GitHub and explicit Reload GitHub

Use Cases
  current canonical Use-Case registries + owners
  → current surface is a local semantic projection with local-only Delete; deleting the projection never changes the registry/owner

Prompts
  planning/helper-library/prompts/*.prompt.md

Legacy helper-command compatibility
  planning/helper-library/commands/*.helper-command.md
  → may remain visible as clearly marked legacy insertions; current UI does not create new ones
```

The main navigation keeps **Commands** and **Use Cases** as separate surfaces. Both are browsed through collapsible current Direction groups; there is no separate Directions tab. Commands contains command entries only (plus clearly marked legacy command compatibility records), while Use Cases contains every current canonical Use Case, including command-backed UCs as semantic UC entries rather than redirects to Commands. Prompts remain a separate surface.

Directions and Use Cases remain build-time/read-only semantic projections, not writable application registries. A Use-Case Insert/Copy selects one current semantic planning unit: its body identifies the stable UC ID + canonical registry, tells ChatGPT to resolve the **current** registry entry/Main Owner route and follow current owner links to materially defining principles/workflows/templates, and explicitly does not grant command/repository permissions. The Helper does not hard-code a permanent full owner-file list into each UC body.

### Check GitHub

`Check GitHub` lists direct GitHub directory metadata and compares local/GitHub path-name sets/counts for real Planning Commands, Prompts and any legacy helper-command compatibility records. It reports same-path, local-only and GitHub-only names. Same-path is inventory overlap only and does not claim file-content equality. It does not mutate local state and does not fetch every file body merely to count/compare inventory.

### Sync missing

`Sync missing` runs the inventory comparison, GETs only repository paths absent locally, parses/validates those files and adds them to the unified local snapshot. It never overwrites a same-path local record. A changed Planning Command is replaced only by explicit `Reload GitHub` or by an accepted local edit followed by `Save GitHub`.

### Reload GitHub

On a tracked Planning Command row, `Reload GitHub` explicitly GETs that exact current command file, parses/validates it against the local command catalog and replaces the local draft/record with the verified remote definition. It is the deliberate same-path repository→local replacement route; `Sync missing` remains non-overwriting.

### Save GitHub

Each real Commands / Prompts row has `Save GitHub`; legacy helper-command compatibility rows retain their historical explicit save behavior.

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

Repository delete is not implemented. `Delete` on Commands, Use Cases and Prompts is local-only: it removes/hides the Helper-local record/projection and makes zero GitHub writes. A registered Planning Command file and a canonical Use-Case registry/owner remain untouched. Explicit `Sync missing` can restore a locally deleted registered command from GitHub; Use-Case deletion remains a local projection preference. Repository command retirement/deletion is a separate authorized documentation action.

## ChatGPT Import And Recovery

`Import from ChatGPT` parses planning-command/helper-library marker blocks and merges them into the local snapshot only. It makes zero GitHub requests. Use per-row `Save GitHub` explicitly when repository persistence is wanted.

`Copy recovery request` + `Restore from GitHub copy` remains available as a manual/offline fallback. Restore reconciles the pasted repository-backed marker set locally while preserving local-only records and performs zero GitHub requests/writes from the helper.

## Clipboard / Insert Contract

For semantic Use Cases, the exact inserted body includes `semantic_owner`, current registry `source_of_truth`, dynamic `route_resolution`, Adaptive/Full `read_rule`, UC-specific instruction and a permission boundary. `Full` requires the receiving chat to read the complete current owner route; Adaptive may reuse clearly sufficient current context. Both keep the same semantic planning unit and permissions.

Every Insert action prepares the exact clipboard body **before** composer mutation. The fast path first attempts a synchronous user-gesture `copy`; when the browser requires the async Clipboard API, composer mutation waits for that copy attempt to finish. The exact same RAM string is then passed to composer insertion. This contract is identical for real Planning Commands, Prompts and any legacy helper-command compatibility insertion.

The helper does not rely on synthetic browser paste. If direct insertion fails after a successful copy, the exact body is already available for normal manual paste (`Ctrl+V`).

Composer lookup caches the last connected composer. Repeated insertion into the same live composer avoids a new selector/layout scan. A disconnected/replaced composer invalidates the cache and is rediscovered.

For ChatGPT `contenteditable` composers, insertion uses one direct `Range.insertNode()` mutation followed by one `input` event instead of `document.execCommand('insertText')`. This is the accepted correction for the previously observed multi-second synchronous insertion stall. Repository check/save/sync is not called from this path.

## Structure

```text
scenarios/README.md
MANUAL-ACCEPTANCE.md
seed/
  commands.json     # generated local seed projection from planning/commands/*.command.md
  use-cases.json    # generated local seed projection from current canonical UC registries
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

`npm run verify` checks JavaScript syntax, the dynamically discovered planning-command catalog, owner/refinement path existence, focused tests (including Use-Case registry parity, local Delete/tombstone behavior, startup surface and semantic-body routing), generated seed-catalog equality and generated-userscript equality. The number of planning commands or Use Cases is not hard-coded.

The seed catalogs are generated **in this repository update**, not fetched after installation. The userscript bundles those current command/use-case seeds so an existing local snapshot gains missing current commands on upgrade while respecting explicit local-delete tombstones.

The install artifact is generated:

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Do not edit it manually.

## Safety Boundary

The Planning Helper never runs local Git, commit or push. GitHub I/O happens only after explicit `Check GitHub`, `Sync missing`, `Reload GitHub` or `Save GitHub` actions. Normal insertion/copy/import/delete remains RAM/local-only. Repository deletion is not part of this slice.
