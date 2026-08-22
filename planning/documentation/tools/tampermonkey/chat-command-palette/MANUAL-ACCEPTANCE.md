# OBS Planning Helper Manual Acceptance

Status: active acceptance plan; execution status must be recorded separately from automated tests
Version: v1.2.0 / Planning Helper `0.30.0`
Scope: browser and real-GitHub checks that are not implied by `npm run verify`.

Canonical application semantics: [`scenarios/README.md`](scenarios/README.md).

Passing automated tests does **not** mark these browser/remote checks complete. Record actual execution evidence when they are run.

<a id="scn-ph-discover"></a>

## `SCN-PH-DISCOVER`

- On a clean open, confirm the default selected surface is Commands and content is immediately rendered without requiring a tab click.

- With GitHub unavailable, reload ChatGPT with an existing local snapshot and confirm Planning Helper opens/browses/searches local content.
- Confirm no background GitHub request is made merely by startup, opening surfaces or searching.
- Confirm the top-level navigation exposes separate `Commands`, `Use Cases` and `Prompts` surfaces and no separate Directions tab.
- Confirm Commands and Use Cases are nested under collapsible current Direction groups; search by Direction name/ID expands the matching group.
- Favorite one Command and one Use Case. Confirm `★ Favorites` appears above Directions on each relevant surface, the favorite row is duplicated there, and the original row remains inside its Direction. Unfavorite and confirm only the top duplicate disappears.
- Confirm `Commands` contains command rows only (plus clearly marked legacy command compatibility rows), while `Use Cases` contains every current canonical UC exactly once semantically even when a UC has a command shortcut.
- Confirm Direction grouping is navigation only and remains read-only semantic projection.

<a id="scn-ph-use"></a>

## `SCN-PH-USE`

- Insert a Planning Command, legacy helper-command compatibility record when present, and prompt into the live ChatGPT composer; confirm exact intended text.
- Confirm clipboard is prepared and manual paste remains usable if direct insertion fails.
- Confirm the normal insertion path remains responsive with GitHub unavailable.
- On the Use Cases surface, expand nested Directions and insert `UC-PLAN-PROTOTYPE`, `UC-PLAN-DOMAIN`, `UC-PLAN-SLICE-STRATEGY`, and command-backed `UC-REPO-CURRENT-STATE`; confirm each body contains the selected UC ID, `semantic_owner`, canonical registry source, `route_resolution`, read rule and explicit semantic-only permission boundary.
- Confirm command-backed UCs insert their UC body from Use Cases instead of opening the Commands surface.
- Confirm `Full` preserves the same UC semantic-owner/permission but requires complete current owner-route reading.
- Confirm the current Application Planning registry parity check includes `UC-PLAN-APP-CONCEPT`, `UC-PLAN-PROTOTYPE`, `UC-PLAN-DOMAIN-DISCOVERY`, `UC-PLAN-REALIZATION` and `UC-PLAN-SLICE-STRATEGY`.

<a id="scn-ph-manage-local"></a>

## `SCN-PH-MANAGE-LOCAL`

- Confirm there is one `Commands` surface and no separate `Local Cmds` tab.
- Create a new Planning Command draft, edit its structured definition and confirm no GitHub request occurs until explicit Save GitHub.
- Edit an existing registered command and confirm its id/file cannot be changed in-place.
- Use Reload GitHub and confirm the current remote command replaces the local draft only after the explicit action.
- Confirm every visible Planning Command exposes `Delete`; delete a registered command and verify it disappears only from Helper local state while its repository file remains unchanged.
- Confirm legacy helper-command records, when present, are clearly marked compatibility insertions and new ones are not created by the Commands UI.

- Create/edit a Planning Command draft, delete a Command, delete a Use Case, and create/edit/delete a Prompt; verify only local snapshot/RAM changes occur until explicit repository actions.
- Reload/restart the userscript and verify locally deleted Command/Use-Case IDs stay hidden rather than being re-added by bundled seeds.
- Reload/restart after favoriting Command/Use-Case IDs and confirm favorites persist locally; deleting a favorited item also removes its favorite ID.
- Run explicit `Sync missing` after deleting a registered Command and verify the command can be restored from GitHub and its local-delete tombstone clears.
- Confirm a deleted Use Case changes only the Helper projection and does not mutate its canonical registry/owner.
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

## Registry-driven UC parity and invocation

- Confirm every current canonical UC registry row appears under **Use Cases**, including `UC-PLAN-TEST-PLAN`.
- Confirm `UC-PLAN-TEST-PLAN — Plan Practical Testing / Acceptance` is manually invokable from **Commands**.
- Pick a UC without a bespoke command and confirm its generated command inserts a body that references `planning/commands/invoke-use-case.command.md`, the exact UC ID and current registry source.
- Delete only that generated command locally and confirm the Use Case remains visible under **Use Cases** and no repository file is deleted.
- Confirm UCs with bespoke commands do not receive a duplicate generated invocation row.
- Confirm `UC-PLAN-WORKSPACE-ESTABLISH-UC`, `UC-PLAN-WORKSPACE-CHANGE-UC`, `UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY` and `UC-DOC-RECONCILE-STATUS` each have their own generated direct invocation row even though their registries mention `собери идеи`/`положняк` only as supporting or may-route commands.
- Confirm genuinely direct mappings such as `UC-PLAN-COLLECT-IDEAS → ideas.collect` and `UC-REPO-CURRENT-STATE → current_state.report` still reuse the bespoke command without a duplicate generated row.

## Application SDS command acceptance

- Confirm `мини сдс`, `модульный сдс`/`медиум сдс` and `фулл сдс` exist as Planning Commands and all route to the same Step 0–4 quality contract.
- Confirm direct commands exist for Current Reality, Solution Research, Solution, Application Concept, Application Responsibility, Prototype, Scenario Discovery, Scenario, Domain, Application Realization, Slice Strategy, Slice, contextual WEUC discovery, Architecture Pressure/Decision, Testing Strategy/Design/Coverage and Practical Testing Plan.
- Confirm the related canonical UC rows reuse those bespoke commands and do not receive duplicate generated UC invocation rows.
- Confirm Mini/Modular/Full prompts preserve Scenario DATA and Behavior Items and do not claim Full is semantically stronger.
