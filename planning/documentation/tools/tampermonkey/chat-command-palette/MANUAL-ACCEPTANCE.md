# OBS Planning Helper Manual Acceptance

Status: active acceptance plan; execution status must be recorded separately from automated tests
Version: v1.1.0 / Planning Helper `0.26.2`
Scope: browser and real-GitHub checks that are not implied by `npm run verify`.

Canonical application semantics: [`scenarios/README.md`](scenarios/README.md).

Passing automated tests does **not** mark these browser/remote checks complete. Record actual execution evidence when they are run.

<a id="scn-ph-discover"></a>

## `SCN-PH-DISCOVER`

- With GitHub unavailable, reload ChatGPT with an existing local snapshot and confirm Planning Helper opens/browses/searches local content.
- Confirm no background GitHub request is made merely by startup, opening surfaces or searching.
- Confirm Orientation/Directions/Use Cases remain read-only projections rather than writable application registries.

<a id="scn-ph-use"></a>

## `SCN-PH-USE`

- Insert a Planning Command, legacy helper-command compatibility record when present, and prompt into the live ChatGPT composer; confirm exact intended text.
- Confirm clipboard is prepared and manual paste remains usable if direct insertion fails.
- Confirm the normal insertion path remains responsive with GitHub unavailable.
- On the Use Cases surface, insert `UC-PLAN-PROTOTYPE`, `UC-PLAN-DOMAIN` and `UC-PLAN-SLICE-STRATEGY`; confirm each body contains the selected UC ID, `focus`, canonical registry source, `route_resolution`, read rule and explicit semantic-only permission boundary.
- Confirm `Full` preserves the same UC focus/permission but requires complete current owner-route reading.
- Confirm the current Application Planning registry parity check includes `UC-PLAN-APP-CONCEPT`, `UC-PLAN-PROTOTYPE`, `UC-PLAN-DOMAIN-DISCOVERY`, `UC-PLAN-REALIZATION` and `UC-PLAN-SLICE-STRATEGY`.

<a id="scn-ph-manage-local"></a>

## `SCN-PH-MANAGE-LOCAL`

- Confirm there is one `Commands` surface and no separate `Local Cmds` tab.
- Create a new Planning Command draft, edit its structured definition and confirm no GitHub request occurs until explicit Save GitHub.
- Edit an existing registered command and confirm its id/file cannot be changed in-place.
- Use Reload GitHub and confirm the current remote command replaces the local draft only after the explicit action.
- Confirm Delete draft is offered only for an unregistered command draft; registered command retirement is not exposed as local Delete.
- Confirm legacy helper-command records, when present, are clearly marked compatibility insertions and new ones are not created by the Commands UI.

- Create/edit a Planning Command draft and create/edit/delete a prompt; verify only local snapshot/RAM changes occur until explicit repository actions.
- Edit/delete a legacy helper-command compatibility record only when one exists; confirm the UI does not offer creation of a new legacy helper-command record.
- Edit an already repository-evidenced helper without changing title/text and press Save local; confirm it is a no-op and repository evidence display is preserved.
- Make a real local title/text change; confirm repository evidence becomes unverified until direct repository verification/publish.

<a id="scn-ph-import"></a>

## `SCN-PH-IMPORT`

- Import valid planning-command/helper marker blocks and confirm local merge without GitHub requests.
- Confirm changed imported content loses exact-content repository verification metadata.
- Confirm invalid/colliding command definitions fail before local persistence.

<a id="scn-ph-check-repository"></a>

## `SCN-PH-CHECK-REPOSITORY`

- Against a controlled GitHub repository, run Check GitHub and verify local/GitHub counts plus same-path/local-only/GitHub-only groups.
- Confirm same-path does not claim content equality.
- Change a directly known remote SHA and confirm known-SHA-change diagnostics appear without mutating local records.

<a id="scn-ph-sync"></a>

## `SCN-PH-SYNC`

- Run Reload GitHub on an edited tracked Planning Command and confirm that exact remote content replaces the local draft only after the explicit action.
- Confirm Reload GitHub on a missing/unregistered remote target reports failure and does not silently delete the local draft.

- Place supported repository records that are absent locally and confirm Sync missing downloads/adds them.
- Confirm a same-path local record is never overwritten by Sync missing.
- Confirm malformed downloaded content aborts rather than being silently accepted or repaired by Sync missing.

<a id="scn-ph-publish"></a>

## `SCN-PH-PUBLISH`

- Exercise create, exact no-op and current-SHA update for helper content against real GitHub and verify exact read-back.
- Start an update with a stale base SHA, arrange for the remote target to already contain the exact intended bytes, and confirm Save GitHub rereads once, reports recovered verified success with the fresh SHA and performs no second PUT.
- Start an update with a stale base SHA while the remote target contains different bytes; confirm Save GitHub reports a real conflict and does not overwrite or retry with the fresh SHA.
- Start an update with a stale base SHA and make the post-conflict remote reread fail; confirm the UI reports that current remote content could not be verified, does not claim confirmed divergence, and nothing is overwritten.
- Put a malformed helper-library document at the deterministic helper path, then explicitly Save the valid local helper; confirm the malformed remote is replaced using its exact current SHA and the resulting bytes are read back and verified.
- Exercise planning-command save and confirm complete remote command-catalog validation blocks an ambiguous catalog.
- Simulate browser-local snapshot persistence failure after a remote result has already been verified; confirm UI reports remote success plus local-metadata warning rather than “GitHub save failed”.
- Confirm repository Delete is unavailable and the helper never runs local Git/commit/push.

<a id="scn-ph-recover"></a>

## `SCN-PH-RECOVER`

- With a mixed local snapshot, paste a complete recovery set and confirm repository-backed records reconcile to that set while local-only records survive.
- Confirm stale repository-backed local records missing from the pasted set are removed.
- Confirm Restore performs zero helper-side GitHub requests and does not invent remote SHAs.

## Repository settings supporting acceptance

- Change owner/repository/branch and confirm repository evidence metadata is cleared **before** the new source becomes active.
- Force local snapshot persistence failure during a source change and confirm the new repository settings are not activated with stale old-source verification metadata.
