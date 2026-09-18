# OBS Planning Helper — Developer / Build Entry

Status: active modular Tampermonkey helper implementation  
Version: `0.39.0`  
Scope: local-first, GitHub-backed **semantic command projection** with canonical methodology working Scenarios, reusable Prompts, explicit repository recovery/publish actions, editable ordered presentation groups, per-tab group navigation/filter state, canonical `Контекст / Результат / Суть` explanations, Favorites and a wide/resizable browser UI.

## Read Order

1. `planning/command-routing.md` — executable-command and projection policy.
2. `planning/commands/README.md` — direct Planning Command authority.
3. `planning/documentation/use-case-registry-map.md` and the current IDTSPE Target Module/Lens registries — semantic owners projected into Helper commands.
4. canonical working Scenario owners — methodology `SCN-*` in `planning/documentation/idtspe-methodology/active/idtspe-core/shared/methodology-use-case-scenario-map.md`, with repository/tool Scenarios owned by their canonical area (for example replacement-package Builder `SCN-06`); these Scenarios do not know about commands.
5. `planning/helper-library/README.md` — Prompt / legacy helper insertion authority.
6. `scenarios/README.md` — Planning Helper **application** behavior (`SCN-PH-*`), separate from methodology working Scenarios (`SCN-*`).
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

A command card is compact browse/navigation UI. The card itself exposes a fast **Run** action; selecting the card opens the command-detail pane without rebuilding or scrolling the command list, and the detail pane exposes:

```text
<Action> · <Scope/Kind> · <Canonical ID>
Контекст / Результат / Суть
[Run] [Body] [Scenarios N] [Favorite]
Group: <current presentation group>
```

Examples:

```text
План обновления · Core TM · TM-PRE-UPDATE-PLAN
Исследовать Domain · SDS TM · TM-DOMAIN-DISCOVERY
Domain Modeling / DDD · SDS Lens · LENS-DOMAIN-MODELING-DDD
```

- Selecting a command card opens the detail pane. The detail pane shows **Контекст**, **Результат**, **Суть** projected from canonical authority rather than maintained as Helper-only prose. Direct commands project `activeContextBehavior / expectedOutput / meaning`; Use Cases project `Situation / Result / Purpose`; Target Modules and Lenses project the corresponding owner sections.
- **Run** on either the compact card or the detail pane inserts the same current canonical invocation body.
- Direct-command **Body** also carries the same canonical `context / result / essence` fields, so focused commands such as proposal-archive production remain understandable without treating the compact route prompt as a second semantic owner.
- **Body** shows the exact adaptive invocation body, optional full-read body, semantic binding, provenance, permissions/sources and the direct source file when one exists.
- **Scenarios N** lists canonical working Scenarios/steps where this capability is derived as a command equivalent.
- The detail-pane **Group** selector changes presentation-only membership inside the current Commands classification. It does not change semantic identity, ownership, invocation body or applicability.

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

`SCN-PH-*` files under this tool remain application-behavior owners for the Helper itself. They are not the methodology working Scenarios shown as `SCN-*`.

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

Normal startup/search/tab/group-filter/group-collapse switching, command selection, Run/Body/local edit/group/reorder/Favorite operations make no GitHub request. GitHub access occurs only after explicit repository actions.

## Unified Local Snapshot

Persistent key:

```text
obsPlanningHelper:v2:localSnapshot
```

Schema v7 keeps:

```text
planningCommands[]
useCases[] + useCaseCatalogSha
semanticComponents[] + semanticComponentCatalogSha
scenarios[] + scenarioCatalogSha
helperItems[]
catalogOrder { commands[], commandGroups[], scenarios[], prompts[] }
catalogOrderSha
suppressedRepository { commands[], helperItems[], useCases[], semanticComponents[], scenarios[] }
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

`seed/scenarios.json` aggregates canonical `SCN-*` from their current owners: methodology scenarios from the Core methodology scenario map and repository/tool scenarios from their canonical repository owners (for example replacement-package Builder `SCN-06`). It stores canonical scenario prose + semantic references required for deterministic Helper projection. It does not store command-equivalent prose; command equivalents are computed from current semantic command identities at runtime.

### Prompts

Prompt working content remains local-first and independently GitHub-backed through deterministic files in `planning/helper-library/prompts/*.prompt.md`.

Hard Reload of direct/semantic/scenario catalogs does **not** overwrite local Prompt content.

## Catalog Order

Durable order source:

```text
planning/documentation/tools/tampermonkey/chat-command-palette/catalog-order.json
```

It stores ordered stable IDs for Commands, Scenarios and Prompts plus `commandGroups[]`. Groups are **presentation-only** subdivisions inside the existing Commands classifications (`General`, `Use Cases`, `Target Modules`, `Lenses`, `Tools / Repository`). Each classification has one ordered group list; there is no separate Primary/Advanced/Semantic presentation tier. Groups never become methodology owners. Command order/group membership uses semantic IDs for UC/TM/Lens cards and direct IDs only for General/Tool capabilities without a semantic owner ID. Every current visible command card belongs to exactly one ordinary classification/group; `All commands` is only a cross-tab overview.

When a Commands classification opens, Helper shows all of its groups immediately in a group navigator. `All groups` is the default; the first group selection isolates that group and subsequent selections build a multi-group filter. Selection is remembered per classification. Group containers remain ordered below the navigator and each container has independently persisted collapsed/expanded state. In normal classification view the group name is shown in the navigator and once on the group container, not repeated on every command card; `All commands` may show `Tab › Group` context because it intentionally mixes classifications.

**Manage groups** creates, renames, reorders and deletes groups. Deleting a group moves its cards to `Other / Ungrouped`; cards are never discarded by a layout edit. The detail-pane Group selector changes card membership. `Save order GitHub` explicitly persists `catalog-order.json`; per-user selected-group filters and collapsed/expanded state remain browser-local UI state and are not repository authority.

## ChatGPT Import and Recovery

`Import from ChatGPT` is a local-only, atomic state-change path. It accepts the existing direct-command/helper-library marker blocks and the current general patch marker:

```text
[PLANNING_HELPER_PATCH]
{
  "schemaVersion": 1,
  "upsert": {
    "commands": [],
    "helperItems": [],
    "useCases": [],
    "semanticComponents": [],
    "scenarios": []
  },
  "delete": {
    "commands": [],
    "helperItems": [],
    "useCases": [],
    "semanticComponents": [],
    "scenarios": []
  },
  "catalogOrder": null
}
[/PLANNING_HELPER_PATCH]
```

The Helper parses the whole payload, applies deletes then upserts to an in-memory candidate snapshot, validates the complete resulting catalogs and only then persists. Any invalid item/collision rejects the whole import. Preview reports `ADD`, `UPDATE`, `DELETE`, `SUPPRESS` or `UNCHANGED` before Apply. Import performs zero GitHub requests.

Delete keys use repository paths for direct Commands/helper-library items and canonical IDs for Use Cases, semantic components and Scenarios. Imported deletes are remembered in `suppressedRepository`, so ordinary `Sync missing` does not immediately restore the intentionally removed GitHub row. A later import upsert of the same natural key removes that suppression. `Hard Reload GitHub` is the explicit reset that clears all import suppression and accepts current GitHub-backed catalogs again.

Imported semantic Use-Case / Target-Module / Lens / Scenario rows are local projection overrides for inspection/use; they do not become new semantic authority and are not written into generated `seed/*.json`. Durable semantic repository changes still belong to their canonical owners plus the normal build/projection route. Direct Commands and Prompts retain their existing explicit per-row `Save GitHub` path.

`Restore local items from ChatGPT markers` remains the recovery fallback for complete direct-command/helper-library marker sets and keeps its existing reconcile semantics; the general patch marker is intentionally an Import surface, not a Restore payload.

## GitHub Actions

### Check GitHub

Reads repository inventory/current generated catalogs and reports local/GitHub status for direct command definitions, Use-Case source projection, semantic components, canonical working Scenarios, Prompts/helper records and catalog order. No local mutation occurs.

### Sync missing

Adds repository records/IDs absent locally unless that natural key is explicitly suppressed by a local import delete. It does not overwrite same-path/same-ID local content. This is incremental acquisition, not freshness reconciliation.

### Reload one direct Command

`Reload` on a direct-backed semantic/general/tool card GETs that exact command file and replaces the selected local direct command draft with verified remote content.

### Hard Reload GitHub

Explicit authoritative recovery path:

```text
fetch complete planning/commands catalog
fetch seed/use-cases.json
fetch seed/semantic-components.json
fetch seed/scenarios.json
fetch catalog-order.json (order + commandGroups)
validate all catalogs
replace local direct-command + semantic + scenario projections and GitHub order/groups
remove local/legacy command rows absent from GitHub authority
clear local command/source hide tombstones and all import suppression
prune Favorite IDs that no longer resolve
preserve Prompt-library content
```

The confirmation warns that unsaved local command drafts and local/legacy command rows absent from GitHub are lost. Prompt-library content is intentionally outside this replace-sync. No implicit/background hard reload exists.

### Save GitHub / Save order GitHub

Per-row direct Command/Prompt save uses optimistic SHA update plus exact read-back verification. Conflicts never overwrite automatically. `Save order GitHub` persists only `catalog-order.json`; it changes presentation order, not semantic meaning.

Repository delete remains unsupported. Local delete/hide and Import `DELETE` make zero GitHub writes; Import `DELETE` changes only the local projection and suppression state.

## Commands Navigation

The Commands surface keeps five semantic/tool classifications:

```text
General
Use Cases
Target Modules
Lenses
Tools / Repository
```

Inside each classification, `catalog-order.json#commandGroups` supplies smaller **presentation-only** groups such as `Review / Validation`, `Architecture Analysis`, `Application Behavior`, `Evolution`, `Meaning / Ownership` and `Packages / Archives`. The group navigator exposes all groups immediately and can filter to one or several without changing repository state. The selected-command detail pane changes membership; **Manage groups** creates, renames, reorders or deletes groups. Deletion falls back to `Other / Ungrouped`. `Save order GitHub` persists group identity/order/membership; selected filters and collapsed/expanded state stay browser-local. None of these operations changes semantic scope, ownership or applicability.

`src/methodology-navigation.js` combines stable semantic identity (`semanticKind`, `semanticScope`, tool/general classification) with the optional GitHub-backed presentation group. If a current card has no group yet, compatibility/fallback grouping keeps it visible rather than dropping it. `helperPresentation.navigation` remains compatibility-only input for old cached records and is not a current semantic source.

The generic `idtspe` and `примени линзу` dispatchers remain registered for expert/direct invocation but use `palette: false`; the primary catalog is built from current semantic owners rather than a second Helper-only hidden-command list.

## Command Invocation Side Effects

Runtime-only invocation side effects remain separate from command semantics. Ordinary `Run` / `Copy body` preserves canonical command bytes and performs no side effect.

For commands supporting `capture-chat-context`, Helper may expose an explicit one-shot **Bind + Run** action. It creates a fresh invocation token and appends the separate `[PLANNING_COMMAND_SIDE_EFFECT]` block only for that invocation. There is no sticky bind toggle; rendering, Body inspection, Reload and Hard Reload never execute effects. A side-effect failure aborts only that requested bind delivery action.

For `replacement_archive.create` (`давай архив`), the token captures the current ordinary `chatgpt.com/c/<conversation>` identity/title/time into this tab's `sessionStorage`, is required only by that invocation's `OBS-ACTION/1`, has `carryForward: false`, and constitutes explicit authority to bind/rebind that ChangeSet Review chat. Ordinary `Run` remains non-binding.

## UI Layout / Safety Boundary

Desktop default is a wide panel (about 980px). The panel is resizable, persists `left/top/width/height`, clamps to the viewport and uses a command list + detail pane on wide screens. On narrow screens the detail pane yields to the command list. Commands navigation persists the active command classification, selected-group filter per classification, and each group's collapsed/expanded state in browser-local storage. Selecting a command updates only card selection + the detail pane, so the command-list scroll position does not jump to the beginning.

- normal browse/group-filter/group-collapse/command selection/Run/Body/group/reorder/local edit is local-only;
- all repository reads/writes are explicit UI actions;
- Hard Reload is an authoritative replace-sync for the local GitHub-backed command/semantic/scenario/order/group cache and requires confirmation; command rows absent from GitHub are removed locally;
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
