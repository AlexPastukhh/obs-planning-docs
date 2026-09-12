# OBS Planning Helper Manual Acceptance

Status: active acceptance plan; execution evidence remains separate from automated tests
Version: v1.5.0 / Planning Helper `0.34.0`

Canonical application semantics: [`scenarios/README.md`](scenarios/README.md). Automated tests do **not** mark these browser/remote checks complete.

<a id="scn-ph-discover"></a>
## `SCN-PH-DISCOVER`

- With an existing local snapshot and GitHub unavailable, reload ChatGPT and confirm Commands / Use Cases / Prompts browse/search from local state.
- Confirm startup/open/search/Insert/Copy makes no GitHub request.
- On a fresh/empty catalog snapshot, confirm Commands/Use Cases direct the user to `Hard Reload GitHub` instead of silently using a hard-coded bundled catalog.
- After Hard Reload, confirm current Commands and Use Cases are restored from their GitHub-backed catalogs.
- Favorite one Command and one Use Case; confirm `★ Favorites` duplicates the same row while the original remains in the ordinary catalog.

<a id="scn-ph-use"></a>
## `SCN-PH-USE`

- Insert a Planning Command, Use Case and Prompt into the live composer; verify exact intended text and clipboard fallback.
- Confirm a Use-Case body contains stable UC ID, current registry source, owner-route resolution and semantic-only permission boundary.
- Confirm `Full` changes read depth, not semantic owner or permissions.
- Use ordinary Insert/Full/Copy on `давай архив`; confirm no side-effect block/token is added and the complete canonical `[PLANNING_COMMAND]` bytes remain unchanged.
- Use `Bind + Insert` / `Bind + Copy` (and `Bind + Full` where shown); confirm a separate `[PLANNING_COMMAND_SIDE_EFFECT]` follows the canonical block, contains a fresh UUID v4 `chatContextToken`, and requires that exact token only in this invocation's `OBS-ACTION/1` with `carryForward: false`. Treat this explicit Bind action as bind/rebind authority for the captured conversation; ordinary delivery remains non-binding.
- Inspect this tab's `sessionStorage` key `obsPlanningHelper:chatContextCaptures:v1`; confirm the token captures the click-time `conversationKey`, observed title and timestamp. Invoke Bind twice in the same chat and confirm two distinct retained tokens map to that same conversation. Navigate after capture and confirm the older stored record does not change.
- Attempt Bind outside an ordinary `/c/<id>` conversation and require fail-closed with no token record/copy/insertion. Confirm opening/rendering the Helper, Reload and Hard Reload do not generate tokens.

<a id="scn-ph-manage-local"></a>
## `SCN-PH-MANAGE-LOCAL`

- Create/edit a Planning Command draft and Prompt locally; verify no GitHub request.
- Hide/delete a Command and Use Case locally; confirm repository authority remains untouched.
- Favorite/unfavorite Command/Use-Case IDs and confirm persistence.
- Move Commands, Use Cases and Prompts with `↑` / `↓`; confirm immediate local order and zero GitHub requests.
- Resize/drag the panel; reopen and confirm `left/top/width/height` persist and remain viewport-clamped.
- On desktop confirm wide content/action layout; on a narrow viewport confirm actions wrap below content.

<a id="scn-ph-import"></a>
## `SCN-PH-IMPORT`

- Import valid Planning Command/helper marker blocks and confirm local merge without GitHub requests.
- Confirm changed imported content loses exact-content repository verification metadata.
- Confirm invalid/colliding definitions fail before persistence.

<a id="scn-ph-check-repository"></a>
## `SCN-PH-CHECK-REPOSITORY`

- Run `Check GitHub` against a controlled repository.
- Verify inventory includes Planning Commands, Use Cases, Prompts/helper records and catalog-order status.
- Confirm same-path/ID does not claim content equality without SHA/content evidence.
- Confirm Check mutates no local catalog/order.

<a id="scn-ph-sync"></a>
## `SCN-PH-SYNC`

- Put a supported Command/Use-Case/Prompt record in GitHub that is absent locally; run `Sync missing` and confirm only missing content is added.
- Confirm same-ID/path local records are not overwritten.
- Edit one tracked local Planning Command, run row `Reload`, and confirm only that command is replaced by GitHub content.

<a id="scn-ph-publish"></a>
## `SCN-PH-PUBLISH`

- Exercise Command/Prompt create, exact no-op and current-SHA update; verify exact remote read-back.
- Exercise stale-SHA conflict with equal intended remote bytes; confirm recovered verified success without a second PUT.
- Exercise real conflicting bytes; confirm no automatic overwrite.
- Force local snapshot persistence failure after verified remote success; confirm UI reports remote success plus local-metadata warning.
- Reorder Commands/Use Cases, run `Save order GitHub`, and verify only `catalog-order.json` changes with intended stable-ID order.
- Edit `catalog-order.json` directly in GitHub, then Hard Reload; confirm edited durable order becomes local order.
- Confirm repository delete/local Git commit/push are unavailable.

<a id="scn-ph-recover"></a>
## `SCN-PH-RECOVER`

- Create local Command edits/hides and a local order divergence; keep a local Prompt with unsaved local content.
- Run `Hard Reload GitHub`, accept confirmation and verify current GitHub Commands/Use Cases/order replace local catalog state; hidden catalog rows reappear; local Prompt content and Favorites survive.
- Confirm no maintained Command/Use-Case catalog needs reinstalling with a new userscript for recovery.
- Exercise pasted recovery fallback and confirm it makes zero Helper-side GitHub requests and invents no SHA.

## Registry-driven parity / no-hardcode

- Confirm `seed/use-cases.json` exactly projects the methodology Use Cases reachable from `planning/documentation/use-case-registry-map.md` and its explicitly mapped current scoped registries only. Confirm project/application registries such as `planning/documentation/application-planning/use-case-registry.md` are not promoted into the methodology-use catalog merely because they exist.
- Confirm `seed/commands.json` exactly projects current `planning/commands/*.command.md`.
- Search generated `chat-command-palette.user.js` for representative catalog identities (`UC-IDTSPE-COMPOSE-CURRENT-WORK`, `UC-PLAN-DOMAIN`, `application_domain.plan`) and confirm they are absent as maintained embedded catalog data; current identities belong to generated seeds/repository definitions, not runtime source.

## Contextual composition acceptance

- After Hard Reload confirm the Helper does **not** present a fixed universal planning order. IDTSPE is already the always-active proportional work model; the current Methodology Use-Case Registry Map and selected Use-Case Process determine which registries/components are worth consulting for the present situation.
- Confirm Broad Discussion can remain sufficient without forcing a Target, Target Module, Lens or Checkpoint. When a specialized component is useful, generic `idtspe` registry dispatch and current component aliases remain available without manufacturing one shortcut row per component.
- Confirm legacy orchestration/profile shortcuts do not become a second runtime authority merely because a command file is still retained for compatibility.

## Planning-methodology route acceptance

- Confirm Scenario planning keeps Scenario identity tied to user/actor goal/Need/desired useful observable result and treats DATA/Behavior as iterative discovery inputs.
- Confirm Domain discovery/planning can identify Value Object/Aggregate candidates from evidence, records Root/owned/outside/external/coordination boundaries, and permits select/split/merge/reject/no explicit Aggregate.
- Confirm Slice planning distinguishes product priority from technical implementation sequence, cross-cutting applicability from ownership, semantic drift from harmless names/paths, and hands negative/no-mutation guarantees to testing.
- Confirm `изучи внутренние юзкейсы` invokes `UC-PLAN-ARCH-WORKSPACE-USES`; `собери WEUC` / `исследуй WEUC-инстансы` invokes `UC-PLAN-ARCH-DISCOVER-WEUC`; `перепроверь` remains the direct `review_audit.recheck` command backed by the review-audit supporting Process.

## IDTSPE / SDS Methodology Navigation

- [ ] Methodology view buttons/labels/order are derived from current command metadata; the UI source does not maintain a separate hard-coded IDTSPE/SDS view list.
- [ ] Commands → `IDTSPE` shows exactly 11 primary methodology rows.
- [ ] Commands → `SDS — IDTSPE Profile` shows exactly 19 primary methodology rows. Additional active SDS components remain reachable through generic current registry dispatch; shortcut count is not ontology count.
- [ ] Focused SDS rows are visually nested under their canonical Target Module row where configured.
- [ ] Prototype/Screen/Domain/Slice/Practical-Test and Lens shortcut badges expose relevant conditional/focused status. Retired Slice Strategy/Test Strategy/Requirement/Cross-Cutting command identities, when retained, are hidden compatibility routes and do not appear as primary methodology rows.
- [ ] IDTSPE contains a separate metadata-driven `Lens Operations` section with `подбери линзы`, `примени линзу`, Documentation / Representation and Linked Notes rows.
- [ ] `подбери линзы` returns an applicability/disposition view without pretending to run all Lens bodies.
- [ ] `примени линзу` can dispatch to any registered applicable Core/SDS Lens while preserving the natural host Target.
- [ ] `проверь как лучше зафиксировать` lives in IDTSPE, not SDS-only.
- [ ] `проверь эволюцию и архитектуру` and `проверь можно ли упростить` live in the SDS Lens section.
- [ ] Clicking `Info` shows When To Use / What You Get and does not insert or send the command.
