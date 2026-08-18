# OBS Planning Helper Manual Acceptance

Status: active acceptance plan; execution status must be recorded separately from automated tests
Version: v1.0.0 / Planning Helper `0.24.0`
Scope: browser and real-GitHub checks that are not implied by `npm run verify`.

Canonical application semantics: [`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md) → [`scenarios/README.md`](scenarios/README.md).

Passing automated tests does **not** mark these browser/remote checks complete. Record actual execution evidence when they are run.

<a id="uc-ph-discover"></a>

## `UC-PH-DISCOVER`

- With GitHub unavailable, reload ChatGPT with an existing local snapshot and confirm Planning Helper opens/browses/searches local content.
- Confirm no background GitHub request is made merely by startup, opening surfaces or searching.
- Confirm Orientation/Directions/Use Cases remain read-only projections rather than writable application registries.

<a id="uc-ph-use"></a>

## `UC-PH-USE`

- Insert a planning command, helper command and prompt into the live ChatGPT composer; confirm exact intended text.
- Confirm clipboard is prepared and manual paste remains usable if direct insertion fails.
- Confirm the normal insertion path remains responsive with GitHub unavailable.

<a id="uc-ph-manage-local"></a>

## `UC-PH-MANAGE-LOCAL`

- Create, edit and delete a helper command/prompt and verify only local snapshot/RAM changes occur.
- Edit an already repository-evidenced helper without changing title/text and press Save local; confirm it is a no-op and repository evidence display is preserved.
- Make a real local title/text change; confirm repository evidence becomes unverified until direct repository verification/publish.

<a id="uc-ph-import"></a>

## `UC-PH-IMPORT`

- Import valid planning-command/helper marker blocks and confirm local merge without GitHub requests.
- Confirm changed imported content loses exact-content repository verification metadata.
- Confirm invalid/colliding command definitions fail before local persistence.

<a id="uc-ph-check-repository"></a>

## `UC-PH-CHECK-REPOSITORY`

- Against a controlled GitHub repository, run Check GitHub and verify local/GitHub counts plus same-path/local-only/GitHub-only groups.
- Confirm same-path does not claim content equality.
- Change a directly known remote SHA and confirm known-SHA-change diagnostics appear without mutating local records.

<a id="uc-ph-sync"></a>

## `UC-PH-SYNC`

- Place supported repository records that are absent locally and confirm Sync missing downloads/adds them.
- Confirm a same-path local record is never overwritten by Sync missing.
- Confirm malformed downloaded content aborts rather than being silently accepted.

<a id="uc-ph-publish"></a>

## `UC-PH-PUBLISH`

- Exercise create, exact no-op and current-SHA update for helper content against real GitHub and verify exact read-back.
- Exercise planning-command save and confirm complete remote command-catalog validation blocks an ambiguous catalog.
- Simulate browser-local snapshot persistence failure after a remote result has already been verified; confirm UI reports remote success plus local-metadata warning rather than “GitHub save failed”.
- Confirm repository Delete is unavailable and the helper never runs local Git/commit/push.

<a id="uc-ph-recover"></a>

## `UC-PH-RECOVER`

- With a mixed local snapshot, paste a complete recovery set and confirm repository-backed records reconcile to that set while local-only records survive.
- Confirm stale repository-backed local records missing from the pasted set are removed.
- Confirm Restore performs zero helper-side GitHub requests and does not invent remote SHAs.

## Repository settings supporting acceptance

- Change owner/repository/branch and confirm repository evidence metadata is cleared **before** the new source becomes active.
- Force local snapshot persistence failure during a source change and confirm the new repository settings are not activated with stale old-source verification metadata.
