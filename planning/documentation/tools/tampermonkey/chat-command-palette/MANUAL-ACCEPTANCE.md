# OBS Planning Helper Manual Acceptance

Status: active acceptance plan; execution evidence remains separate from automated tests  
Version: v1.6.0 / Planning Helper `0.35.0`

Canonical application semantics: [`scenarios/README.md`](scenarios/README.md). Automated tests do **not** mark these browser/remote checks complete.

<a id="scn-ph-discover"></a>
## `SCN-PH-DISCOVER`

- With an existing local snapshot and GitHub unavailable, reload ChatGPT and confirm **Commands / Scenarios / Prompts** browse/search from local state.
- Confirm startup/open/search/Run/Body browsing makes no GitHub request.
- Confirm Commands contains semantic navigation groups for General, Use Cases, Target Modules, Lenses and Tools/Repository; Use Cases are not a peer top-level surface.
- On a fresh/empty GitHub-backed catalog snapshot, confirm the user is directed to `Hard Reload GitHub` instead of silently receiving a hard-coded bundled catalog.
- After Hard Reload, confirm direct Commands, semantic components and canonical working Scenarios are restored from GitHub-backed projections.
- Confirm representative primary cards include the full semantic identity, for example `План обновления · Core TM · TM-PRE-UPDATE-PLAN` and `Исследовать Domain · SDS TM · TM-DOMAIN-DISCOVERY`.
- Favorite a semantic TM/Lens card; confirm `★ Favorites` duplicates the same stable semantic row while the original remains in its normal group.

<a id="scn-ph-use"></a>
## `SCN-PH-USE`

- On a direct-backed and a generic semantic card, verify the primary actions are `Run`, `Body`, `Scenarios N`.
- `Body`: confirm it shows the exact current invocation body, semantic owner/canonical ID, provenance (`DIRECT CURRENT` / `GENERIC CURRENT`), owner/source paths and direct command file only when one actually exists.
- Confirm `Body` inspection performs no insertion and no repository request.
- `Scenarios N`: confirm it lists only canonical methodology/tool Scenarios whose step semantic refs resolve to that command identity; `Scenarios 0` is valid.
- Open a listed Scenario and confirm canonical Scenario prose is shown unchanged; each step may show **Derived command equivalents** with `Run`, `Body`, `Open command` controls.
- Confirm no auto-highlight, synchronized selection or persistent command-selection state appears when moving between Commands and Scenarios.
- Confirm one current Lens produces one primary Lens card; no separate `ANALYZE/CHECK/REFINE/CHALLENGE` buttons and no Target-Module Result-Unit buttons appear.
- Confirm the generic `примени линзу` dispatcher is not another primary Lens card; specific current Lens cards are present instead.
- Confirm focused aliases such as Screen/Application/Slice variants do not create duplicate primary semantic cards.
- Confirm `Full-read invocation body`, when present inside Body, changes read depth only and not semantic owner or permissions.
- Use ordinary `Run` on `давай архив`; confirm no side-effect block/token is added and canonical command bytes remain unchanged.
- Use explicit `Bind + Run` where shown; confirm a separate `[PLANNING_COMMAND_SIDE_EFFECT]` follows the canonical block, contains a fresh UUID v4 `chatContextToken`, requires that exact token only in this invocation's `OBS-ACTION/1`, and has `carryForward: false`.
- Inspect this tab's `sessionStorage` key `obsPlanningHelper:chatContextCaptures:v1`; confirm click-time conversation identity/title/time is captured. Bind twice in the same chat and confirm distinct tokens. Attempt Bind outside an ordinary `/c/<id>` conversation and require fail-closed behavior with no token/copy/insertion.

<a id="scn-ph-manage-local"></a>
## `SCN-PH-MANAGE-LOCAL`

- Create/edit a **direct Planning Command** draft and Prompt locally; verify no GitHub request.
- Confirm generic/generated semantic UC/TM/Lens cards do not expose direct-command Edit/Save/Reload/Delete actions.
- Hide/delete a direct Command locally; confirm repository authority remains untouched.
- Favorite/unfavorite semantic Command IDs and confirm persistence.
- Start from a legacy snapshot where a direct TM command ID is favorited; confirm materialization shows the corresponding stable semantic card as favorite and the next favorite change stores the semantic ID.
- Move Commands, Scenarios and Prompts with `↑` / `↓`; confirm immediate local order and zero GitHub requests.
- Resize/drag the panel; reopen and confirm `left/top/width/height` persist and remain viewport-clamped.
- On desktop confirm wide content/action layout; on a narrow viewport confirm actions wrap below content.

<a id="scn-ph-import"></a>
## `SCN-PH-IMPORT`

- Import valid direct Planning Command/helper marker blocks and confirm local merge without GitHub requests.
- Confirm changed imported direct content loses exact-content repository verification metadata.
- Confirm invalid/colliding definitions fail before persistence.
- Confirm imported direct command IDs do not create a second semantic card when they bind to an already projected UC/TM/Lens owner.

<a id="scn-ph-check-repository"></a>
## `SCN-PH-CHECK-REPOSITORY`

- Run `Check GitHub` against a controlled repository.
- Verify inventory includes direct Planning Commands, Use-Case source projection, semantic-component projection, canonical Scenario projection, Prompts/helper records and catalog-order status.
- Confirm same-path/ID does not claim content equality without SHA/content evidence.
- Confirm Check mutates no local catalog/order.

<a id="scn-ph-sync"></a>
## `SCN-PH-SYNC`

- Put a supported direct Command, semantic component, Scenario or Prompt record in GitHub that is absent locally; run `Sync missing` and confirm only missing content is added.
- Confirm same-ID/path local records are not overwritten.
- Edit one tracked local direct Planning Command, run row `Reload`, and confirm only that direct definition is replaced by GitHub content while its semantic card identity stays stable.

<a id="scn-ph-publish"></a>
## `SCN-PH-PUBLISH`

- Exercise direct Command/Prompt create, exact no-op and current-SHA update; verify exact remote read-back.
- Exercise stale-SHA conflict with equal intended remote bytes; confirm recovered verified success without a second PUT.
- Exercise real conflicting bytes; confirm no automatic overwrite.
- Force local snapshot persistence failure after verified remote success; confirm UI reports remote success plus local-metadata warning.
- Reorder Commands/Scenarios, run `Save order GitHub`, and verify only `catalog-order.json` changes with intended stable IDs.
- Edit `catalog-order.json` directly in GitHub, then Hard Reload; confirm durable order becomes local order.
- Confirm repository delete/local Git commit/push are unavailable.

<a id="scn-ph-recover"></a>
## `SCN-PH-RECOVER`

- Create local direct-command edits/hides and local order divergence; keep a local Prompt with unsaved content.
- Run `Hard Reload GitHub`, accept confirmation and verify current direct Commands + semantic components + canonical Scenarios + order replace GitHub-backed local catalog state; hidden repository-backed rows reappear; local Prompt content and Favorites survive.
- Confirm the recovered semantic cards keep stable `uc:/tm:/lens:` identities even if their backing direct shortcut changed.
- Confirm no maintained semantic catalog needs a new userscript installation for recovery.
- Exercise pasted recovery fallback and confirm it makes zero Helper-side GitHub requests and invents no SHA.

## Registry-driven parity / no-hardcode

- Confirm `seed/use-cases.json` exactly projects methodology Use Cases reachable from `planning/documentation/use-case-registry-map.md` and explicitly mapped current registries only.
- Confirm `seed/semantic-components.json` exactly projects current methodology UCs, active Target Modules and active Lenses; retired compatibility TMs/Lenses are excluded.
- Confirm `seed/scenarios.json` projects exactly the canonical current working Scenario set and preserves canonical Scenario prose + semantic refs without storing command-equivalent prose.
- Confirm `seed/commands.json` exactly projects current `planning/commands/*.command.md`.
- Confirm generated `chat-command-palette.user.js` does not contain a maintained embedded semantic catalog; runtime source contains projection logic, not frozen current UC/TM/Lens inventories.

## Contextual composition acceptance

- Confirm Helper does **not** present a fixed universal planning order. IDTSPE remains always-active and proportional; current Use-Case/context determines which owners/components matter.
- Confirm Broad Discussion may remain sufficient without forcing a Target, TM or Lens.
- Confirm current semantic TM/Lens cards are shortcuts into the same methodology runtime and never bypass Use-Case-driven composition or component applicability/materiality.
- Confirm `TM-PRE-UPDATE-PLAN` appears as optional `План обновления · Core TM · TM-PRE-UPDATE-PLAN`, not a mandatory stage before Exact.

## Planning-methodology route acceptance

- Confirm Scenario planning keeps Scenario identity tied to user/actor goal/Need/desired observable result and treats DATA/Behavior as iterative discovery inputs.
- Confirm Domain discovery can identify Entity/Value Object/Aggregate/Service/Policy candidates without introducing a separate Aggregate Discovery Target Module.
- Confirm repeated `TM-IMPLEMENTATION-SLICE` invocation handles multiple Slice candidates; no current plural Slice Strategy TM is introduced.
- Confirm `перепроверь` remains Review Audit rather than IDTSPE Revalidation.
- Confirm `что дальше по методологии` shows/proposes the next action while `продолжи по методологии` performs the smallest useful ordinary next action.

## IDTSPE / SDS Methodology Navigation

- [ ] Top-level surfaces are exactly `Commands`, `Scenarios`, `Prompts`.
- [ ] Commands navigation groups are derived from semantic identity: `General`, `Use Cases`, `Target Modules`, `Lenses`, `Tools / Repository`.
- [ ] UC/TM/Lens rows show full `<Action> · <Scope/Kind> · <Canonical ID>` labels.
- [ ] Current Core/SDS Target Modules and Lenses each project to exactly one primary semantic card.
- [ ] Current specific Lenses appear as cards; generic Lens apply remains infrastructure, and Lens operation variants do not become cards.
- [ ] `План обновления · Core TM · TM-PRE-UPDATE-PLAN` has the historical Pre-Update/file-update phrases as aliases but only one primary card.
- [ ] `Body` is available for every command card; direct-backed Body identifies its source file, generic Body identifies its semantic owner/generic route.
- [ ] `Scenarios N` is available for every command card and matches the reverse index derived from canonical Scenario semantic refs.
- [ ] Scenario view shows canonical prose plus derived command equivalents; canonical Scenario source contains no command IDs/triggers/Helper labels.
- [ ] No cross-view highlighting/selection machinery is required.
- [ ] Direct-backed semantic rows may expose Edit/Reload/Save/Delete; projection-only semantic rows do not.
