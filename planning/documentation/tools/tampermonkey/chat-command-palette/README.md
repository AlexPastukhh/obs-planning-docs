# OBS Planning Helper — Developer / Build Entry

Status: active modular Tampermonkey helper implementation  
Version: `0.35.0`  
Scope: local-first, GitHub-backed **semantic command projection** with canonical methodology working Scenarios, reusable Prompts, explicit repository recovery/publish actions, editable durable catalog order, Favorites and a wide/resizable browser UI.

## Read Order

1. `planning/command-routing.md` — executable-command and projection policy.
2. `planning/commands/README.md` — direct Planning Command authority.
3. `planning/documentation/use-case-registry-map.md` and the current IDTSPE Target Module/Lens registries — semantic owners projected into Helper commands.
4. canonical working Scenario owners — methodology `SCN-01..SCN-05` in `planning/documentation/idtspe-methodology/active/idtspe-core/shared/methodology-use-case-scenario-map.md`, repository/tool `SCN-06` in `planning/documentation/replacement-package-builder/scenarios/SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md`; these Scenarios do not know about commands.
5. `planning/helper-library/README.md` — Prompt / legacy helper insertion authority.
6. `scenarios/README.md` — Planning Helper **application** behavior (`SCN-PH-*`), separate from methodology working Scenarios (`SCN-01..SCN-06`).
7. `MANUAL-ACCEPTANCE.md` — browser/real-GitHub acceptance.
8. focused `src/**` / `tests/**`.

The userscript is a runtime/projection, not semantic authority. It must not maintain a second copy of Use-Case, Target-Module, Lens or Scenario meaning.

## Projection Model

```text
canonical methodology/repository owners
  ├─ methodology Use Cases
  ├─ Target Modules
  ├─ Lenses
  ├─ direct Planning Commands
  └─ canonical working Scenarios
          ↓ build-verified projections
  seed/use-cases.json
  seed/semantic-components.json
  seed/scenarios.json
  seed/commands.json
          ↓ runtime composition
  Semantic Command cards
          ↓
  Commands / Scenarios / Prompts UI
```

Use Cases, Target Modules and Lenses are **classifications of semantic Commands**, not peer runtime surfaces competing with Commands.

A semantic component has one stable primary card identity:

```text
uc:UC-...
tm:TM-...
lens:LENS-...
```

Direct command files may provide the invocation body for that card, but the card identity remains semantic. Focused phrases and historical shortcuts are aliases/refinements, not duplicate primary cards.

## Command Card Contract

A primary command row exposes:

```text
<Action> · <Scope/Kind> · <Canonical ID>
[Run] [Body] [Scenarios N]
```

Examples:

```text
План обновления · Core TM · TM-PRE-UPDATE-PLAN
Исследовать Domain · SDS TM · TM-DOMAIN-DISCOVERY
Domain Modeling / DDD · SDS Lens · LENS-DOMAIN-MODELING-DDD
```

- **Run** inserts the current canonical invocation body.
- **Body** shows the exact adaptive invocation body, optional full-read body, semantic binding, provenance, permissions/sources and the direct source file when one exists.
- **Scenarios N** lists canonical working Scenarios/steps where this capability is derived as a command equivalent.

There is no cross-view highlighting/selection state. `Scenarios N` is a simple reverse index and navigation aid.

Generated/generic semantic cards never pretend to be editable `planning/commands/*.command.md` files. Edit/Reload/Save/Delete actions are available only when the semantic card is backed by a real direct command definition.

### Provenance

Helper shows projection provenance separately from semantic meaning:

- `DIRECT CURRENT` — a current direct `planning/commands/*.command.md` supplies the invocation;
- `GENERIC CURRENT` — the semantic capability is current and uses a generic registry/dispatcher invocation;
- `GENERATED` — reserved for an explicit convenience projection that is not itself a direct command definition.

## Canonical Scenario Contract

Canonical methodology working Scenarios live with methodology/repository owners. They contain explanatory prose and semantic owner references, **not command IDs, triggers, Helper labels or invocation bodies**.

Helper derives command equivalents by matching Scenario semantic references to semantic command identities. The Scenario view renders canonical prose unchanged and adds only derived command-equivalent controls (`Run`, `Body`, `Open command`).

`SCN-PH-*` files under this tool remain application-behavior owners for the Helper itself. They are not the methodology working Scenarios shown as `SCN-01..SCN-06`.

## Source / Cache Model

```text
GitHub durable sources
  planning/commands/*.command.md
  methodology Use-Case Registry Map + mapped registries
  current Target Module registries/owners
  current Lens registries/owners
  canonical working Scenario owners
  planning/helper-library/prompts/*.prompt.md
  catalog-order.json

build-verified GitHub projections
  seed/commands.json
  seed/use-cases.json
  seed/semantic-components.json
  seed/scenarios.json

browser local snapshot / RAM
  = normal working cache

explicit Hard Reload GitHub
  = authoritative repository -> local recovery for
    direct Commands + semantic components + working Scenarios + catalog order
```

`seed/*.json` is generated repository data, never independent semantic authority and never the source of methodology prose. `npm run build:check` verifies projection freshness against canonical sources.

Normal startup/search/tab switching/Run/Body/local edit/reorder/Favorite operations make no GitHub request. GitHub access occurs only after explicit repository actions.

## Unified Local Snapshot

Persistent key:

```text
obsPlanningHelper:v2:localSnapshot
```

Schema v6 keeps:

```text
planningCommands[]
useCases[] + useCaseCatalogSha
semanticComponents[] + semanticComponentCatalogSha
scenarios[] + scenarioCatalogSha
helperItems[]
catalogOrder { commands[], scenarios[], prompts[] }
catalogOrderSha
hiddenCommandIds[]
hiddenUseCaseIds[]      # compatibility state only
favoriteCommandIds[]
favoriteUseCaseIds[]    # compatibility state only
```

Semantic command Favorites use stable semantic card IDs. During migration, legacy direct-command favorite/order IDs are recognized so existing local preferences do not disappear; the next local reorder/favorite update writes semantic IDs.

The snapshot is a browser working cache. Losing it must not lose durable semantic truth because current projections can be rebuilt from GitHub with `Hard Reload GitHub`.

## Repository-Backed Catalogs

### Direct Planning Commands

Canonical source: `planning/commands/*.command.md`.

Direct commands may be created/edited locally as drafts. `Save GitHub` is explicit. `Reload` replaces one selected direct command from GitHub. Direct command IDs are invocation/source identities; they do not define the primary semantic card identity for UC/TM/Lens capabilities.

### Semantic components

`seed/semantic-components.json` projects current methodology Use Cases, Target Modules and Lenses from their authoritative registries/owners. Runtime creates **one primary command card per current semantic component**.

Specific Lens cards are projected from the Lens Registry. The generic `примени линзу` dispatcher remains infrastructure and is not another primary Lens card. Lens operations (`ANALYZE/CHECK/REFINE/CHALLENGE`) and Target Module Result Units are selected by AI/context and do not become separate buttons.

The bare `idtspe` direct command remains a current convenience/dispatcher route but is likewise not a second primary Helper card beside `UC-IDTSPE-COMPOSE-CURRENT-WORK`.

### Use Cases

Canonical methodology-use source is [`planning/documentation/use-case-registry-map.md`](../../../use-case-registry-map.md) plus only current mapped methodology-use registries. `seed/use-cases.json` remains a compatibility/source projection used to build semantic UC invocation bodies; Use Cases themselves appear under the **Commands → Use Cases** classification, not as a top-level peer surface.

### Working Scenarios

`seed/scenarios.json` aggregates canonical `SCN-01..SCN-06` from their current owners: methodology `SCN-01..SCN-05` from the Core methodology scenario map and repository/tool `SCN-06` from the replacement-package Builder scenario owner. It stores canonical scenario prose + semantic references required for deterministic Helper projection. It does not store command-equivalent prose; command equivalents are computed from current semantic command identities at runtime.

### Prompts

Prompt working content remains local-first and independently GitHub-backed through deterministic files in `planning/helper-library/prompts/*.prompt.md`.

Hard Reload of direct/semantic/scenario catalogs does **not** overwrite local Prompt content.

## Catalog Order

Durable order source:

```text
planning/documentation/tools/tampermonkey/chat-command-palette/catalog-order.json
```

It stores ordered stable IDs for Commands, Scenarios and Prompts. Command order uses semantic IDs for UC/TM/Lens cards and direct IDs only for General/Tool capabilities without a semantic owner ID. Unknown/new IDs append after configured IDs rather than disappearing.

The UI exposes `↑` / `↓`. Moving an item changes only local order. `Save order GitHub` explicitly persists `catalog-order.json`.

## GitHub Actions

### Check GitHub

Reads repository inventory/current generated catalogs and reports local/GitHub status for direct command definitions, Use-Case source projection, semantic components, canonical working Scenarios, Prompts/helper records and catalog order. No local mutation occurs.

### Sync missing

Adds repository records/IDs absent locally. It does not overwrite same-path/same-ID local content. This is incremental acquisition, not freshness reconciliation.

### Reload one direct Command

`Reload` on a direct-backed semantic/general/tool card GETs that exact command file and replaces the selected local direct command draft with verified remote content.

### Hard Reload GitHub

Explicit authoritative recovery path:

```text
fetch complete planning/commands catalog
fetch seed/use-cases.json
fetch seed/semantic-components.json
fetch seed/scenarios.json
fetch catalog-order.json
validate all catalogs
replace local direct-command + semantic + scenario projections and order
clear local command/source hide tombstones
preserve Prompts and Favorites
```

The confirmation warns that unsaved local command drafts are lost. No implicit/background hard reload exists.

### Save GitHub / Save order GitHub

Per-row direct Command/Prompt save uses optimistic SHA update plus exact read-back verification. Conflicts never overwrite automatically. `Save order GitHub` persists only `catalog-order.json`; it changes presentation order, not semantic meaning.

Repository delete remains unsupported. Local delete/hide makes zero GitHub writes.

## Commands Navigation

The Commands surface derives navigation from semantic identity:

```text
General
Use Cases
  Documentation
  Core
Target Modules
  IDTSPE Core
  Profile · SDS
Lenses
  IDTSPE Core
  Profile · SDS
Tools / Repository
```

`src/methodology-navigation.js` owns only this projection logic. It derives grouping from `semanticKind`, `semanticScope` and tool/general classification. `helperPresentation.navigation` is compatibility-only input for old cached records and is not a current semantic source.

The generic `idtspe` and `примени линзу` dispatchers remain registered for expert/direct invocation but use `palette: false`; the primary catalog is built from current semantic owners rather than a second Helper-only hidden-command list.

## Command Invocation Side Effects

Runtime-only invocation side effects remain separate from command semantics. Ordinary `Run` / `Copy body` preserves canonical command bytes and performs no side effect.

For commands supporting `capture-chat-context`, Helper may expose an explicit one-shot **Bind + Run** action. It creates a fresh invocation token and appends the separate `[PLANNING_COMMAND_SIDE_EFFECT]` block only for that invocation. There is no sticky bind toggle; rendering, Body inspection, Reload and Hard Reload never execute effects. A side-effect failure aborts only that requested bind delivery action.

For `replacement_archive.create` (`давай архив`), the token captures the current ordinary `chatgpt.com/c/<conversation>` identity/title/time into this tab's `sessionStorage`, is required only by that invocation's `OBS-ACTION/1`, has `carryForward: false`, and constitutes explicit authority to bind/rebind that ChangeSet Review chat. Ordinary `Run` remains non-binding.

## UI Layout / Safety Boundary

Desktop default is a wide panel (about 980px). The panel is resizable, persists `left/top/width/height`, clamps to the viewport and switches to one-column rows on narrow screens.

- normal browse/Run/Body/reorder/local edit is local-only;
- all repository reads/writes are explicit UI actions;
- Hard Reload is destructive only to the local GitHub-backed catalog cache/order and requires confirmation;
- local Prompt content is excluded from Hard Reload;
- generated seeds/userscript never become canonical semantic authority;
- no Helper action implies repository commit/push.

## Build / Verify

```bash
cd planning/documentation/tools/tampermonkey/chat-command-palette
npm run build
npm run verify
```

`verify` proves current semantic projection parity, command/alias validity, Scenario projection/reverse-index behavior, compatibility-route safety, local/repository boundaries, generated-script freshness and Helper application-Scenario traceability.
