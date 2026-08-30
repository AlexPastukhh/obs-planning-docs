# OBS Planning Helper Manual Acceptance

Status: active acceptance plan; execution evidence remains separate from automated tests
Version: v1.4.0 / Planning Helper `0.33.0`

Canonical application semantics: [`scenarios/README.md`](scenarios/README.md). Automated tests do **not** mark these browser/remote checks complete.

<a id="scn-ph-discover"></a>
## `SCN-PH-DISCOVER`

- With an existing local snapshot and GitHub unavailable, reload ChatGPT and confirm Commands / Use Cases / Prompts browse/search from local state.
- Confirm startup/open/search/Insert/Copy makes no GitHub request.
- On a fresh/empty catalog snapshot, confirm Commands/Use Cases direct the user to `Hard Reload GitHub` instead of silently using a hard-coded bundled catalog.
- After Hard Reload, confirm current Commands and Use Cases are grouped under current GitHub-backed Directions.
- Favorite one Command and one Use Case; confirm `★ Favorites` duplicates the same row while the original remains in its Direction.

<a id="scn-ph-use"></a>
## `SCN-PH-USE`

- Insert a Planning Command, Use Case and Prompt into the live composer; verify exact intended text and clipboard fallback.
- Confirm a Use-Case body contains stable UC ID, current registry source, owner-route resolution and semantic-only permission boundary.
- Confirm `Full` changes read depth, not semantic owner or permissions.
- Invoke `давай архив`; confirm the complete canonical `[PLANNING_COMMAND]` block is unchanged and a separate `[PLANNING_COMMAND_SIDE_EFFECT]` block is appended after it with `effect: capture-chat-context` and a UUID `chatContextToken`.
- Invoke/copy `давай архив` twice and confirm the token differs for each action. Confirm opening/rendering the Helper, Reload and Hard Reload do not generate a token.
- Invoke/copy a command without a registered side effect and confirm its body remains byte-for-byte unchanged. A forced required side-effect failure must prevent insertion/copy and surface an error rather than sending the command without the side-effect body.

<a id="scn-ph-manage-local"></a>
## `SCN-PH-MANAGE-LOCAL`

- Create/edit a Planning Command draft and Prompt locally; verify no GitHub request.
- Hide/delete a Command and Use Case locally; confirm repository authority remains untouched.
- Favorite/unfavorite Command/Use-Case IDs and confirm persistence.
- Move Commands, Use Cases, Prompts and Direction groups with `↑` / `↓`; confirm immediate local order and zero GitHub requests.
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
- Verify inventory includes Planning Commands, Directions, Use Cases, Prompts/helper records and catalog-order status.
- Confirm same-path/ID does not claim content equality without SHA/content evidence.
- Confirm Check mutates no local catalog/order.

<a id="scn-ph-sync"></a>
## `SCN-PH-SYNC`

- Put a supported Direction/Command/Use-Case/Prompt record in GitHub that is absent locally; run `Sync missing` and confirm only missing content is added.
- Confirm same-ID/path local records are not overwritten.
- Edit one tracked local Planning Command, run row `Reload`, and confirm only that command is replaced by GitHub content.

<a id="scn-ph-publish"></a>
## `SCN-PH-PUBLISH`

- Exercise Command/Prompt create, exact no-op and current-SHA update; verify exact remote read-back.
- Exercise stale-SHA conflict with equal intended remote bytes; confirm recovered verified success without a second PUT.
- Exercise real conflicting bytes; confirm no automatic overwrite.
- Force local snapshot persistence failure after verified remote success; confirm UI reports remote success plus local-metadata warning.
- Reorder Directions/Commands/Use Cases, run `Save order GitHub`, and verify only `catalog-order.json` changes with intended stable-ID order.
- Edit `catalog-order.json` directly in GitHub, then Hard Reload; confirm edited durable order becomes local order.
- Confirm repository delete/local Git commit/push are unavailable.

<a id="scn-ph-recover"></a>
## `SCN-PH-RECOVER`

- Create local Command edits/hides and a local order divergence; keep a local Prompt with unsaved local content.
- Run `Hard Reload GitHub`, accept confirmation and verify current GitHub Directions/Commands/Use Cases/order replace local catalog state; hidden catalog rows reappear; local Prompt content and Favorites survive.
- Confirm no maintained Command/Use-Case/Direction catalog needs reinstalling with a new userscript for recovery.
- Exercise pasted recovery fallback and confirm it makes zero Helper-side GitHub requests and invents no SHA.

## Registry-driven parity / no-hardcode

- Confirm `seed/directions.json` exactly projects current `planning/direction-registry.md`.
- Confirm `seed/use-cases.json` exactly projects every current canonical Use-Case registry under `planning/**`, while legacy/historical compatibility indexes are not projected as current UCs.
- Confirm `seed/commands.json` exactly projects current `planning/commands/*.command.md`.
- Search generated `chat-command-palette.user.js` for representative current IDs (`UC-PLAN-DOMAIN`, `DIR-PLAN-SOLUTION`, `application_domain.plan`) and confirm they are absent as maintained catalog data.

## Universal order acceptance

- After Hard Reload confirm the repository default semantic route is approximately: current reality / whole solution → Application responsibility/prototype → Scenario Discovery/Scenario → Domain Discovery/Domain → realization stress-check → Slice Strategy/Slice → internal Workspace Use Cases → contextual WEUC Instances → architecture path/pressure/decision/evolution → Testing → remaining capabilities.
- Confirm existing `собери идеи` and Mini/Modular/Full SDS controls stay before the route as orchestration/profile controls; no new collect-ideas variants are introduced by this Helper change.

## Planning-methodology route acceptance

- Confirm Scenario planning keeps Scenario identity tied to user/actor goal/Need/desired useful observable result and treats DATA/Behavior as iterative discovery inputs.
- Confirm Domain discovery/planning can identify Value Object/Aggregate candidates from evidence, records Root/owned/outside/external/coordination boundaries, and permits select/split/merge/reject/no explicit Aggregate.
- Confirm Slice planning distinguishes product priority from technical implementation sequence, cross-cutting applicability from ownership, semantic drift from harmless names/paths, and hands negative/no-mutation guarantees to testing.
- Confirm `изучи внутренние юзкейсы` invokes `UC-PLAN-ARCH-WORKSPACE-USES`; `собери WEUC` / `исследуй WEUC-инстансы` invokes `UC-PLAN-ARCH-DISCOVER-WEUC`; `перепроверь` invokes `UC-REPO-AUDIT-REVIEW`.

## IDTSPE / SDS Methodology Navigation

- [ ] Methodology view buttons/labels/order are derived from current command metadata; the UI source does not maintain a separate hard-coded IDTSPE/SDS view list.
- [ ] Commands → `IDTSPE` shows exactly 9 primary methodology rows.
- [ ] Commands → `SDS — IDTSPE Profile` shows exactly 32 primary methodology rows; the related Consistency validator is visibly marked RELATED and does not count as a new primary surface.
- [ ] Focused SDS rows are visually nested under their canonical Target Module row where configured.
- [ ] Prototype/Screen/WEUC/Domain/Slice Strategy/Test Strategy/Requirement/Frontend/Cross-Cutting/Practical Test badges expose their conditional/optional/cross-cutting status without hiding commands.
- [ ] IDTSPE contains a separate metadata-driven `Lens Operations` section with `подбери линзы`, `примени линзу`, Documentation / Representation and Linked Notes rows.
- [ ] `подбери линзы` returns an applicability/disposition view without pretending to run all Lens bodies.
- [ ] `примени линзу` can dispatch to any registered applicable Core/SDS Lens while preserving the natural host Target.
- [ ] `проверь как лучше зафиксировать` lives in IDTSPE, not SDS-only.
- [ ] `проверь эволюцию и архитектуру` and `проверь можно ли упростить` live in the SDS Lens section.
- [ ] Clicking `Info` shows When To Use / What You Get and does not insert or send the command.
