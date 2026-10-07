# OBS Planning Helper — Developer / Build Entry

Status: active modular Tampermonkey helper implementation
Version: `0.39.10`
Scope: local-first, GitHub-backed **semantic command projection** with canonical methodology working Scenarios, reusable Prompts with reusable Modules, explicit repository recovery/publish actions, editable ordered presentation groups, sidebar category/group navigation, canonical `Контекст / Результат / Суть` explanations plus visible command traversal/owner contracts, Favorites, direct Prompt position ordering and a wide/resizable browser UI.

<a id="planning-helper-semantic-projection"></a>
## Projection Authority

Responsibility ID: `HELPER.SEMANTIC-PROJECTION`

> Semantic Owner Dependencies
> - `REPRESENTS` [`Planning Command Definition Contract`](../../../../commands/README.md#planning-command-definition-contract) — `COMMAND.DEFINITION-CONTRACT`
> - `CONTEXTUALIZES` [`IDTSPE Command Surface`](../../../idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md#idtspe-command-surface) — `IDTSPE.COMMAND-SURFACE`

The Helper owns projection/runtime mechanics only. Semantic command meaning and process stay with direct command definitions plus the projected methodology/repository owners. Registered command `includes` are canonical command-file-path edges forming a reproducible USER-invocation composition guarantee over those existing owners; they do not make Helper UI, generated seeds, numeric Shell ports or presentation groups methodology authority. Generated `seed/*.json`, userscript bytes and scenario-command reverse indexes are derived artifacts. Categories and presentation groups are editable presentation configuration, with no methodology authority.

## Read Order

SDS planning start: [Application Definition resolution](application-definition.resolution.md) and its [candidate Application Definition](application-definition.proposal.md). These files retain proposal/Q/R/P/decision state separately from the current implementation and Scenario owners below.

1. `planning/command-routing.md` — executable-command and projection policy.
2. `planning/commands/README.md` — direct Planning Command authority.
3. `planning/documentation/use-case-registry-map.md` and the current IDTSPE Target Module/Lens registries — semantic owners projected into Helper commands.
4. canonical working Scenario owners — methodology `SCN-*` in `planning/documentation/idtspe-methodology/active/idtspe-core/evaluation/USE-CASE-SCENARIO-MAP.md`, with repository/tool Scenarios owned by their canonical area (for example replacement-package Builder `SCN-06`); these Scenarios do not know about commands.
5. `planning/helper-library/README.md` — Prompt / Module / legacy helper insertion authority.
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

Use Cases, Target Modules and Lenses are **classifications of semantic Commands**, not peer runtime surfaces competing with Commands. `IDTSPE Pass` is a direct-command classification for generic Shell/composition controls only; concrete `TM-*` and `LENS-*` semantic cards start in their respective categories and can be moved without changing semantic identity.

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
Includes · command DAG
Canonical references · semantic owners
Command source
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
- The Commands workspace uses a left sidebar for semantic classifications and presentation groups, leaving the vertical working area to the card list and detail pane rather than stacking categories/groups above the list.
- For a direct-backed command, the detail pane also renders the command definition contract without inventing new semantics: `includes[]` as canonical `planning/commands/*.command.md` DAG edges; every structured `ownerRef` as `responsibilityId · role · readMode → path#anchor` plus its `why`; and the direct command source path. Generic semantic projections show their semantic source paths and explicitly state when no direct `ownerRefs` metadata exists.
- **Run** on either the compact card or the detail pane inserts the same current canonical invocation body.
- Direct-command **Body** also carries the same canonical `context / result / essence` fields plus its registered `command_includes` composition. Include command-file paths expand declaratively, shared prefixes deduplicate, and an IDTSPE composition produces one effective Shell pass rather than recursively executing several independent passes.
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

## Command Composition Projection

Planning Commands expose only prerequisites material to the selected invocation. There is no universal Session State / Turn Work Record / Manifest / DIRECT-vs-SHELL / global Question-sweep prefix.

`includes[]` remains the canonical command-to-command prerequisite DAG. The resolver fully expands selected roots, deduplicates shared prerequisites, validates `processCalls`, collects pre-execution contributions, then executes dependencies before dependents. Optional Session/Work-Record facilities are Planning Helper **Prompts**, not hidden command dependencies.

For explicit IDTSPE/Shell work the reusable composition is:

```text
methodology.use_cases.recheck                 # when the selected route needs it
→ idtspe.compose-current-work
→ idtspe.port-composition.recheck
→ idtspe.work / selected admitted capabilities
```

Ordinary deterministic/direct work follows its natural owner without first classifying itself as `DIRECT`. Bare `idtspe` is explicit Shell intent and therefore enters the Shell composition above directly; Shell does not require a Session State, Turn Work Record, WR-4 or a preparation/archive checkpoint.

The old Session/Work-Record direct commands and legacy `idtspe.trace.*` / `idtspe.port.trace` surfaces are not current Planning Commands. Their retained useful operations are explicit Prompts. A global session Question sweep is likewise prompt-driven and is distinct from component-local readiness checks. The SDS Evolution Step Question sweep remains a focused semantic command owned by the selected Step and may still be called at its realization handoff.

The graph guarantees traversal of canonical methodology capabilities; it is not a durable copy of the Shell topology. Direct definitions MUST NOT persist numeric `requiredPorts`, `portRequirements` or `includeFiles` as a second methodology ontology. Current ports are resolved by the canonical composition owner.

For generated semantic cards, the Helper projects the corresponding command prefix (`idtspe.target-module.apply` for concrete Target Module Models and `idtspe.lens.apply` for concrete Lens Models) while the actual Model/Lens owner remains the semantic authority.

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
  planning/helper-library/modules/*.module.md
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

Schema v9 keeps:

```text
commandCacheSchemaVersion
planningCommands[]
useCases[] + useCaseCatalogSha
semanticComponents[] + semanticComponentCatalogSha
scenarios[] + scenarioCatalogSha
helperItems[]
catalogOrder { categories[], fallbackCategoryId, commands[], commandGroups[], scenarios[], prompts[] }
catalogOrderSha
suppressedRepository { commands[], helperItems[], useCases[], semanticComponents[], scenarios[] }
favoriteCommandIds[]
favoriteUseCaseIds[]    # compatibility state only
```

Semantic command Favorites use stable semantic card IDs. During migration, legacy direct-command favorite/order IDs are recognized so existing local preferences do not disappear; the next local reorder/favorite update writes semantic IDs. Schema v8 retired the old `hiddenCommandIds` / `hiddenUseCaseIds` tombstones entirely; schema v9 adds `commandCacheSchemaVersion` so serialized Planning Command cache compatibility can evolve independently from the rest of the local snapshot.

`planningCommands[]` may contain both exact repository-backed cache records and local unsaved command drafts. Startup recovery therefore never treats the whole array as disposable. If current code cannot decode the repository-backed command cache, Helper drops only records with repository evidence (`repositoryKnown` / repository SHA), preserves compatible local command drafts plus prompts/Favorites/other snapshot state, and mounts the UI. With no local drafts it points to `Hard Reload GitHub`; when local drafts survive recovery it points first to `Sync missing` (non-overwriting) or explicit draft save/reconciliation, because `Hard Reload GitHub` intentionally replaces the direct-command catalog and removes unsaved command drafts. If an incompatible local command draft or corruption outside `planningCommands[]` remains, startup still fails closed rather than silently deleting user-owned data.

The snapshot is a browser working cache, but unsaved local drafts are user-owned working data inside that cache. Durable repository projections can be rebuilt from GitHub with `Hard Reload GitHub`; local drafts must be preserved or surfaced explicitly rather than silently discarded.

## Repository-Backed Catalogs

### Direct Planning Commands

Canonical source: `planning/commands/*.command.md`.

Direct commands may be created/edited locally as drafts. `Save GitHub` is explicit. `Reload` replaces one selected direct command from GitHub. Direct command IDs are invocation/source identities; they do not define the primary semantic card identity for UC/TM/Lens capabilities. The optional `includes[]` field references canonical repository-relative paths to other registered direct `planning/commands/*.command.md` definitions. Command IDs remain identities, not dependency locators. The full repository catalog validates include paths and cycles; partial browser/local projections may temporarily omit an included prefix without redefining or deleting that dependency.

### Semantic components

`seed/semantic-components.json` projects current methodology Use Cases, Target Modules and Lenses from their authoritative registries/owners. Runtime creates **one primary command card per current semantic component**.

Specific Lens cards are projected from the Lens Registry and initially placed in `Lenses`; category/group edits can move them. The generic `примени линзу` dispatcher is a visible `IDTSPE Pass` composition surface, not another primary Lens card. Lens operations (`ANALYZE/CHECK/REFINE/CHALLENGE`) and Target Module Units are selected by AI/context and do not become separate buttons. Concrete Target Module cards likewise remain in `Target Modules`; the generic `Apply Target Module` command is a shared-prefix composition surface in `IDTSPE Pass`.

The bare `idtspe` direct command is a visible `IDTSPE Pass` work-entry route. It remains distinct from the semantic `UC-IDTSPE-COMPOSE-CURRENT-WORK` card: the command guarantees invocation/composition, while the Use Case remains methodology authority for the process.

### Use Cases

Canonical methodology-use source is [`planning/documentation/use-case-registry-map.md`](../../../use-case-registry-map.md) plus only current mapped methodology-use registries. `seed/use-cases.json` remains a compatibility/source projection used to build semantic UC invocation bodies; Use Cases themselves appear under the **Commands → Use Cases** classification, not as a top-level peer surface.

### Working Scenarios

`seed/scenarios.json` aggregates canonical `SCN-*` from their current owners: methodology scenarios from the Core methodology scenario map and repository/tool scenarios from their canonical repository owners (for example replacement-package Builder `SCN-06`). It stores canonical scenario prose + semantic references required for deterministic Helper projection. It does not store command-equivalent prose; command equivalents are computed from current semantic command identities at runtime.

### Prompts and Modules

The top-level `Prompts` surface contains an inner `Prompts / Modules` switch and always opens on `Prompts`. Prompt working content remains local-first and independently GitHub-backed through deterministic files in `planning/helper-library/prompts/*.prompt.md`; reusable Modules live in `planning/helper-library/modules/*.module.md`. A Prompt or Module may reference a reusable block as `[[module:<stable-id>]]`. Stored text keeps the reference, while Prompt Run/Copy resolves the current Module bodies recursively at invocation time. Missing references and cycles fail closed rather than sending partially resolved text.

Prompt cards expose two presentation-only ordering mechanisms over the same durable `catalog-order.json` prompt order:

- `↑` / `↓` moves one position;
- `№` accepts a 1-based target position and moves directly to that slot, clamped to the current list bounds.

Modules are not manually ordered in v1; their list is deterministic by title/id. Reorder preserves the selected Prompt and current list viewport. Arrow moves never reset the list to the top; a large numeric jump scrolls only enough (`nearest`) to keep the moved card visible. No GitHub write occurs until an explicit per-row save or **Save all GitHub**. Per-row Prompt save persists the current prompt order together with the prompt so a new prompt cannot be published without its current position.

Hard Reload of direct/semantic/scenario catalogs does **not** overwrite local Prompt or Module content. After a confirmed Hard Reload, the confirmation overlay closes immediately and the current helper surface/inner Prompt view remains active.

## Catalog Order

Durable order source:

```text
planning/documentation/tools/tampermonkey/chat-command-palette/catalog-order.json
```

Schema 5 stores ordered stable IDs for Commands, Scenarios and Prompts plus `categories[]`, `fallbackCategoryId` and `commandGroups[]`. Versions 1–4 migrate locally without network access, preserving groups/membership/order and recognizing custom legacy category IDs. Each category has a stable `id`, editable `label` and `order`; group `viewId` must resolve to one category. Empty categories remain visible. Groups are **presentation-only** subdivisions inside the Commands classifications (`General`, `IDTSPE Pass`, `Use Cases`, `Target Modules`, `Lenses`, `Tools / Repository`). Each classification has one ordered group list; there is no separate Primary/Advanced/Semantic presentation tier. Groups never become methodology owners. Command order/group membership uses semantic IDs for UC/TM/Lens primary cards and direct IDs for focused command operations without a separate semantic-owner card. A focused direct operation may be grouped in a semantic tab when its `ownerRefs` point to that owner but its `methodologyBinding` does not claim the owner’s primary TM/Lens card identity. Its group and kind label must identify it as an operation rather than a second TM. Every current visible command card belongs to exactly one ordinary classification/group; `All commands` is only a cross-tab overview.

When a Commands classification opens, Helper shows all of its groups immediately in a group navigator. `All groups` is the default; the first group selection isolates that group and subsequent selections build a multi-group filter. Selection is remembered per classification. Group containers remain ordered below the navigator and each container has independently persisted collapsed/expanded state. In normal classification view the group name is shown in the navigator and once on the group container, not repeated on every command card; `All commands` may show `Tab › Group` context because it intentionally mixes classifications.

**Manage groups** creates, renames, reorders and deletes groups. Deleting a group moves its cards to `Other / Ungrouped`; cards are never discarded by a layout edit. The detail-pane Group selector changes card membership. `Save all GitHub` persists pending local direct-command/helper-library changes together with `catalog-order.json`; per-user selected-group filters and collapsed/expanded state remain browser-local UI state and are not repository authority.

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

The Helper parses the whole payload, resolves natural keys, rejects duplicate or contradictory operations, applies the candidate change in memory, validates the complete resulting catalogs and only then persists. A natural key cannot be upserted and deleted in one import, and duplicate upserts/deletes fail closed instead of relying on last-write-wins ordering. Preview reports `ADD`, `UPDATE`, `DELETE`, `SUPPRESS` or `UNCHANGED` before Apply. Import performs zero GitHub requests.

Delete keys use repository paths for direct Commands/helper-library items and canonical IDs for Use Cases, semantic components and Scenarios. Imported deletes are remembered in `suppressedRepository`, so ordinary `Sync missing` does not immediately restore the intentionally removed GitHub row. A later import upsert of the same natural key removes that suppression. Hard Reload resets suppression only for the catalogs it actually reloads (direct Commands + Use Cases + semantic components + Scenarios); helper-library suppression remains because Prompt/helper-library content is intentionally outside Hard Reload.

Use Cases are the Import owner for UC projection state. `upsert.useCases` materializes/updates the coupled `USE_CASE` semantic projection metadata. `delete.useCases` removes only the Use Case itself and suppresses only that Use-Case ID from ordinary `Sync missing`; it does not hide or delete a direct Planning Command. Existing coupled UC projection metadata may remain non-rendered so a later Use-Case upsert can recover the same presentation/direct binding. `semanticComponents` remains the Import surface for Target Modules and Lenses, not a second UC editing route.

Deletion semantics are literal CRUD by collection. `delete.commands` removes only the direct `planning/commands/*.command.md` record; if a semantic owner still exists, its card may remain as a generic projection. `delete.useCases` removes only the Use Case, so an independently existing direct command may remain visible as General. `delete.semanticComponents` removes only that Target Module/Lens component, so its independently existing direct command may likewise remain visible as General. There is no hidden-row layer in the current snapshot model. To remove both a semantic capability and its backing command, list both explicitly in the same `delete` payload.

Imported Use-Case / Target-Module / Lens / Scenario rows are local projection overrides for inspection/use; they do not become new semantic authority and are not written into generated `seed/*.json`. Durable semantic repository changes still belong to their canonical owners plus the normal build/projection route. Direct Commands, Prompts and Modules retain an explicit per-row `Save GitHub` path; `Save all GitHub` publishes all pending local writable records plus catalog order/grouping in one action.

`Restore local items from ChatGPT markers` remains the recovery fallback for complete direct-command/helper-library marker sets and keeps its existing reconcile semantics; the general patch marker is intentionally an Import surface, not a Restore payload.

## GitHub Actions

Repository and other asynchronous Helper actions are non-blocking at the browser level. Confirmation/editor overlays are scoped to the Helper panel and close before long-running work starts. While work continues, the Helper header shows a spinning activity chip and the collapsed `Planning` launcher shows the running-task count. Navigation, search, panel close/reopen, Run and Copy remain available; only state-mutating controls that could race with an active repository operation are temporarily disabled. Completion and failure are reported through the normal status surface instead of a full-screen waiting overlay.

### Check GitHub

Reads repository inventory/current generated catalogs and reports local/GitHub status for direct command definitions, Use-Case source projection, semantic components, canonical working Scenarios, Prompts, Modules/helper records and catalog order. No local mutation occurs.

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
clear Import suppression for direct Commands / Use Cases / semantic components / Scenarios
preserve helper-library Import suppression because Prompt/Module/helper-library content is not reloaded
prune Favorite IDs that no longer resolve
preserve Prompt/Module library content
```

The confirmation warns that unsaved local command drafts and local/legacy command rows absent from GitHub are lost. Prompt/Module library content is intentionally outside this replace-sync. After confirmation, the overlay closes immediately and the reload continues as a visible background task; the user may navigate, search, close/reopen the Helper, Run or Copy while conflicting mutation controls remain disabled. No implicit hard reload exists.

### Save GitHub / Save all GitHub

Per-row direct Command/Prompt/Module save uses optimistic SHA update plus exact read-back verification. Conflicts never overwrite automatically. Per-row direct Command and Prompt saves also persist the current catalog order. `Save all GitHub` saves every pending local direct-command/helper-library record and the current `catalog-order.json` snapshot in one explicit operation; it replaces the former standalone `Save order GitHub` action. Presentation order still changes presentation only, not semantic meaning.

Repository delete remains unsupported. Local Delete and Import `DELETE` make zero GitHub writes. Both physically remove only the explicitly addressed local object and record same-entity suppression so ordinary `Sync missing` does not immediately restore it; `Hard Reload GitHub` remains the explicit authoritative recovery path for GitHub-backed catalogs.

## Commands Navigation

The initial catalog supplies these editable presentation categories (semantic kind/scope remains independent):

```text
General
IDTSPE Pass
Use Cases
Target Modules
Lenses
Tools / Repository
```

Inside each classification, `catalog-order.json#commandGroups` supplies smaller **presentation-only** groups such as `Review / Validation`, `Architecture Analysis`, `Application Behavior`, `Evolution`, `Meaning / Ownership` and `Packages / Archives`. The group navigator exposes all groups immediately and can filter to one or several without changing repository state. The selected-command detail pane changes membership; **Manage groups** creates, renames, reorders or deletes groups. Deletion falls back to `Other / Ungrouped`. `Save all GitHub` persists group identity/order/membership; selected filters and collapsed/expanded state stay browser-local. None of these operations changes semantic scope, ownership or applicability.

`src/methodology-navigation.js` combines stable semantic identity (`semanticKind`, `semanticScope`, tool/general classification) with the optional GitHub-backed presentation group. If a current card has no group yet, compatibility/fallback grouping keeps it visible rather than dropping it. `helperPresentation.navigation` remains compatibility-only input for old cached records and is not a current semantic source.

The generic `idtspe` and `примени линзу` dispatchers are visible composition controls in the initial `IDTSPE Pass` category. Moving their cards changes presentation only.

## Command Invocation Side Effects

Runtime-only invocation side effects remain separate from command semantics. Ordinary `Run` / `Copy body` preserves canonical command bytes and performs no side effect.

For commands supporting `capture-chat-context`, Helper may expose an explicit one-shot **Bind + Run** action. It creates a fresh invocation token and appends the separate `[PLANNING_COMMAND_SIDE_EFFECT]` block only for that invocation. There is no sticky bind toggle; rendering, Body inspection, Reload and Hard Reload never execute effects. A side-effect failure aborts only that requested bind delivery action.

For `replacement_archive.create` (`давай архив`), the token captures the current ordinary `chatgpt.com/c/<conversation>` identity/title/time into this tab's `sessionStorage`, is required only by that invocation's `OBS-ACTION/1`, has `carryForward: false`, and constitutes explicit authority to bind/rebind that ChangeSet Review chat. Ordinary `Run` remains non-binding.

## UI Layout / Safety Boundary

Desktop default is a wide panel (about 980px). The panel is resizable, persists `left/top/width/height`, clamps to the viewport and uses a command list + detail pane on wide screens. On narrow screens the detail pane yields to the command list. Commands navigation persists the active command classification, selected-group filter per classification, and each group's collapsed/expanded state in browser-local storage. Selecting a command updates all visible copies of its card + the detail pane, so the command-list scroll position does not jump to the beginning. Sidebar Categories/Groups can be collapsed; list refreshes preserve sidebar scroll position. Favorites is always the first collapsible group across classifications and group filters, including when empty; search applies to it, and the same cards remain in their ordinary groups. Use ↑ / ↓ on Favorite cards to set their personal order; it is saved automatically on this browser and shared across categories. With search active, arrows swap neighboring visible Favorites while hidden Favorites retain their positions. Reordering preserves selection and scroll position. Context, Result and Essence start collapsed. Detailed behavior: [SCN-PH-DISCOVER](scenarios/SCN-PH-DISCOVER.md) and [SCN-PH-MANAGE-LOCAL](scenarios/SCN-PH-MANAGE-LOCAL.md).

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

## Reading methodology examples

Use `прочитай примеры методологии` / `read methodology examples` for a bounded read-only pass through examples linked by the selected owner. Command, Use Case, Target Module and Lens bodies expose the Documentation Example Reading contract in adaptive and full modes. Examples remain explanatory and do not authorize execution. Core Target Module cards now retain all registry aliases, including the multiword Planning Resolution State alias.

For a connected project overview, use `посмотри полный пример документации` / `read full documentation example`. This separate read-only command explicitly opens the copied Study Tab Launcher case guide and project documentation entry, then follows their owner relationships.

### Browser UI regression checks

With Playwright and its Chromium browser available, run `npm run test:browser`. `PLANNING_HELPER_PLAYWRIGHT_PATH` can point to an existing Playwright package; `PLANNING_HELPER_BROWSER_CHANNEL=msedge` selects installed Microsoft Edge. The suites use local fixtures and check Favorites ordering/duplicates/actions, category/group filtering, sidebar scroll preservation, collapsed meaning sections and keyboard controls, plus category CRUD, card/group moves, real runtime snapshot persistence and deferred-call inspection. It is separate from the dependency-free `npm run verify` gate. The behavior owners remain [SCN-PH-DISCOVER](scenarios/SCN-PH-DISCOVER.md) and [SCN-PH-MANAGE-LOCAL](scenarios/SCN-PH-MANAGE-LOCAL.md).

### Editable Categories And Process Call Projection

**Manage categories** creates, renames and reorders categories. Deleting requires another destination and moves every group/card there; the last category cannot be deleted. Category IDs remain stable across rename. **Manage groups** can move a whole group to another category; the detail pane’s **Category** selector moves an individual card. **All commands** and **Favorites** remain automatic views. Renaming/deleting/moving preserves command identity, Favorites and semantic ownership.

Categories, groups and membership share the local snapshot and explicit **Save all GitHub** / **Hard Reload GitHub** path. Editing categories requires no source change, rebuild or network request. Newly discovered unassigned cards use their available default semantic category, otherwise the declared fallback. Deleted categories are not recreated from a card’s semantic kind. Static default labels in compatibility migration are not a whitelist.

The **Body** and contract inspector distinguish initial `includes` from deferred `processCalls`. The [command owner](../../../../commands/README.md#planning-command-process-calls) defines execution semantics. The Helper validates and projects calls and their dependency plans; it does not execute semantic AI work in the browser. Command JSON editing/import/export and repository save retain this field.

The existing **Спланировать изменение документации** Use-Case card is backed by [plan-documentation-change.command.md](../../../../commands/plan-documentation-change.command.md), with a deferred Helper Impact call at the UC’s downstream-consequence point. Its semantic card identity and group remain unchanged. **Save GitHub** checks the edited command’s reachable process-point files/unique explicit anchors before any write, using the same anchor reader as the build; a local draft can still be incomplete.
