# OBS Planning Helper — Developer / Build Entry

Status: active modular Tampermonkey helper implementation
Version: `0.34.0`
Scope: local-first Planning Helper with GitHub-backed Directions, Planning Commands and Use Cases; reusable Prompts; explicit repository recovery/publish actions; editable durable catalog order; Favorites; and wide/resizable browser UI.

## Read Order

1. `planning/command-routing.md` — executable-command policy.
2. `planning/commands/README.md` — Planning Command authority.
3. `planning/direction-registry.md` — current Direction authority.
4. current canonical Use-Case registries under `planning/**` (registry filename is matched case-insensitively; legacy/historical compatibility indexes are excluded) — Workspace/methodology Use-Case authority.
5. `planning/helper-library/README.md` — Prompt / legacy helper insertion authority.
6. `scenarios/README.md` — Planning Helper application behavior.
7. `MANUAL-ACCEPTANCE.md` — browser/real-GitHub acceptance.
8. focused `src/**` / `tests/**`.

The userscript is a runtime/projection, not semantic authority. It must not contain a maintained hard-coded catalog of current Commands, Use Cases or Directions.

## Source / Cache Model

```text
GitHub durable sources
  planning/direction-registry.md
  planning/commands/*.command.md
  current canonical Use-Case registries under planning/**
  planning/helper-library/prompts/*.prompt.md
  catalog-order.json

build-verified GitHub projections
  seed/directions.json   <- planning/direction-registry.md
  seed/commands.json     <- planning/commands/*.command.md
  seed/use-cases.json    <- every current canonical Use-Case registry under planning/**

browser local snapshot / RAM
  = normal working copy/cache

explicit Hard Reload GitHub
  = authoritative repository -> local recovery for
    Directions + Commands + Use Cases + catalog order
```

`seed/*.json` is repository-backed generated data, not independent semantic authority and not embedded as the live catalog in `chat-command-palette.user.js`. `npm run build:check` verifies that the generated catalogs still match their canonical GitHub sources.

Normal startup/search/tab switching/Insert/Copy/local edit/reorder/Favorite operations make no GitHub request. GitHub access occurs only after explicit repository actions.

## Unified Local Snapshot

Persistent key:

```text
obsPlanningHelper:v2:localSnapshot
```

Schema v4 keeps:

```text
planningCommands[]
directions[] + directionCatalogSha
useCases[] + useCaseCatalogSha
helperItems[]
catalogOrder { directions[], commands[], useCases[], prompts[] }
catalogOrderSha
hiddenCommandIds[]
hiddenUseCaseIds[]
favoriteCommandIds[]
favoriteUseCaseIds[]
```

The snapshot is a browser working copy/cache. Losing it must not lose durable Direction/Command/Use-Case truth because those catalogs can be rebuilt from GitHub with `Hard Reload GitHub`.

Favorites and local hides are local UI preferences. They reference stable IDs only and never copy semantic authority.

## Repository-Backed Catalogs

### Directions

Canonical source: `planning/direction-registry.md`. Build projection: `seed/directions.json`.

### Planning Commands

Canonical source: `planning/commands/*.command.md`.

Commands may be created/edited locally as drafts. `Save GitHub` is explicit. `Reload` replaces one selected local command from GitHub. `Hard Reload GitHub` replaces the complete local command catalog.

A Command linked directly as a current UC's Related command is reused as that UC's manual invocation route. A UC without a bespoke route receives a generated thin invocation row through `use_case.invoke`; this generated row is not a repository command file and not semantic authority.

Standalone command controls that do not correspond to a UC may carry `directionIds` in their GitHub command definition rather than runtime hard-code.

### Use Cases

Canonical source: all current canonical Use-Case registries under `planning/**`; registry filenames are matched case-insensitively and legacy/historical compatibility indexes are excluded. Build projection: `seed/use-cases.json`.

The build discovers every current canonical UC, verifies unique IDs/current Directions/direct command mappings and regenerates the seed. Runtime treats that repository projection as recoverable local navigation. Use-Case Insert/Copy still resolves the exact current registry entry and owner route.

### Prompts

Prompt working content remains local-first and independently GitHub-backed through deterministic files in `planning/helper-library/prompts/*.prompt.md`.

Hard Reload of Direction/Command/Use-Case catalogs does **not** overwrite local Prompt content.

## Catalog Order

Durable order source:

```text
planning/documentation/tools/tampermonkey/chat-command-palette/catalog-order.json
```

It stores ordered stable IDs for Directions, Commands, Use Cases and Prompts. The UI exposes `↑` / `↓` for rows and Direction groups. Moving an item changes only local order. `Save order GitHub` explicitly persists the current order. Editing `catalog-order.json` directly in GitHub is also valid; `Hard Reload GitHub` adopts that order locally.

Unknown/new IDs not listed in an older order file append after configured IDs rather than disappearing.

The initial repository order intentionally presents the collect-ideas orchestrator family first, then the universal planning route: whole Application / Scenario / Domain / Slice accumulators → SDS profile controls → reality/solution → Scenario → Domain → Slice → internal Workspace Uses / WEUC Instances → architecture paths/pressure/decisions → Testing → remaining repository/documentation capabilities. The orchestrators are ordinary repository-owned `planning/commands/*.command.md` records; Helper only projects them. Custom user-defined tabs are a separate future UI capability and are not introduced by this command-family change.

## GitHub Actions

### Check GitHub

Reads repository inventory/current generated catalog files and reports local/GitHub counts plus known SHA changes for Planning Commands, Directions, Use Cases, Prompts/helper records and catalog order. No local mutation occurs.

### Sync missing

Adds only repository records/IDs absent locally. It does not overwrite same-path/same-ID local content. This is incremental acquisition, not authoritative freshness reconciliation.

### Reload one Command

`Reload` on a Planning Command GETs that exact command file and replaces the selected local command draft with verified remote content.

### Hard Reload GitHub

Explicit authoritative recovery path:

```text
fetch complete planning/commands catalog
fetch seed/directions.json
fetch seed/use-cases.json
fetch catalog-order.json
validate all catalogs
replace local Directions + Commands + Use Cases + order
clear local Command/Use-Case hide tombstones
preserve Prompts and Favorites
```

The confirmation warns that unsaved local command drafts are lost. No implicit/background hard reload exists.

### Save GitHub / Save order GitHub

Per-row Command/Prompt save uses optimistic SHA update plus exact read-back verification. Conflicts never overwrite automatically. `Save order GitHub` persists only `catalog-order.json`; it changes presentation order, not semantic meaning.

Repository delete remains unsupported. Local Delete/hide makes zero GitHub writes.

## UI Layout

Desktop default is a wide panel (about 980px). The panel is resizable, persists `left/top/width/height`, clamps itself to the viewport, uses a wide content column with compact actions on desktop, and switches to one-column rows with wrapped actions on narrow screens.

The same entity may appear in `★ Favorites` and its normal Direction group. Favorites are projections, not duplicate records.

## Safety Boundary

- normal browse/edit/reorder/insert/copy is local-only;
- all repository reads/writes are explicit UI actions;
- Hard Reload is destructive only to the local Direction/Command/Use-Case cache/order and requires confirmation;
- local Prompt content is excluded from Hard Reload;
- GitHub writes use deterministic paths and optimistic concurrency;
- generated seeds/userscript never become canonical semantic authority;
- no Helper action implies repository commit/push.


## IDTSPE / SDS Methodology Views

Current methodology commands carry two GitHub-backed metadata layers: `methodologyBinding` is the stable IDTSPE runtime/profile/Target-Module-or-Lens binding, while `helperPresentation.navigation` owns mutable view/tab/section/order/badge/related rendering. The userscript runtime is generic and does not maintain current command IDs **or a hard-coded list of methodology views**. `methodologyViewDefinitions(entries)` derives the visible methodology view IDs, labels and order from current command metadata; `All commands` is the only generic Helper-owned fallback view.


The Commands surface now has helper-owned navigation views in addition to the ordinary Direction-grouped `All commands` view:

```text
IDTSPE
  9 primary methodology surfaces
  Core + Lens Operations (`подбери линзы`, `примени линзу`, specialized Core shortcuts)

SDS — IDTSPE Profile
  32 primary methodology surfaces
  grouped by directed SDS Target Module flow
  focused commands nested under canonical Targets
  WEUC marked cross-cutting/repeatable
  conditional/optional badges visible
  Evidence/Coverage shows Consistency Review as a RELATED action without duplicating command identity
```

Projection source: `src/methodology-navigation.js`. Command semantics remain in `planning/commands/*.command.md` and the installed IDTSPE/SDS methodology owners; the Helper view does not become a semantic authority.

New IDTSPE command definitions may expose optional `helperPresentation.whenToUse` / `helperPresentation.whatYouGet`. The `Info` action shows this material without inserting/invoking the command. Older commands without the metadata remain valid.

## Command invocation side effects

Planning Command bodies remain GitHub-backed canonical projections. Runtime-only behavior is separate: a command ID may expose one or more asynchronous side effects, but ordinary Insert/Full/Copy runs with no side effect and preserves the canonical bytes. Helper renders explicit one-shot `Bind + Insert`, `Bind + Copy` and, when available, `Bind + Full` actions only for commands that support `capture-chat-context`; there is no sticky bind toggle and Reload/Hard Reload/rendering never executes an effect. A configured effect failure aborts that bind action before copy/insertion.

For `replacement_archive.create` (`давай архив`), every explicit Bind action creates a fresh UUID v4, captures the current ordinary `chatgpt.com/c/<conversation>` identity/title/time into this tab's `sessionStorage` under `obsPlanningHelper:chatContextCaptures:v1`, and appends a separate `[PLANNING_COMMAND_SIDE_EFFECT]` block after the complete unchanged command. The block requires the exact `chatContextToken` in **this invocation's** `OBS-ACTION/1`, declares `scope: this-invocation-only` and `carryForward: false`, so later ordinary archive commands omit the token. Captures remain in the tab session in this revision; repeated Bind actions create distinct tokens even when they capture the same conversation. Semantically, choosing `Bind + ...` is explicit authority for Replacement Package App to bind **or rebind** that ChangeSet to the captured conversation as soon as the token resolves; ordinary Insert/Full/Copy grants no such authority. Replacement Package App/extension resolves the token asynchronously only after the resulting action reaches Apply.

## Build / Verify

```bash
cd planning/documentation/tools/tampermonkey/chat-command-palette
npm run build
npm run verify
```

`verify` proves current Direction/UC/Command parity, manual UC invokability, command alias validity, local/repository boundaries, generated-script freshness and Scenario traceability.
