# Scope Action Log

Scope: `SCOPE-PLANNING-HELPER`
Status: active cumulative high-level log

Logging starts only after explicit user instruction; no pre-start history is reconstructed automatically.

## Entries

### XREF-001 — Registered scope/log architecture bootstrap

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-005`  
**Reason:** this scope/log was established as part of the cross-scope registered-scope/log migration. Full rationale and application history are owned by the canonical entry.


### LOG-PH-001 — Make Save GitHub recoverable without unsafe overwrite

**Type:** IDEA REVIEW  
**Source:** observed Planning Helper Save GitHub errors plus checked current `UC-PH-PUBLISH` implementation/owners  

**Current Conclusions:**
- a stale-SHA/optimistic conflict whose reread remote bytes already equal the intended content is a recoverable verified success, not a failed save;
- a conflict whose reread remote bytes differ from intended content remains a real conflict and must not be auto-overwritten or retried with the fresh SHA;
- explicit helper command/prompt `Save GitHub` may repair a malformed document already occupying that deterministic helper path by using the exact current remote SHA and verifying the resulting bytes;
- `Sync missing` and ordinary helper remote reads remain strict validation paths and do not silently repair malformed repository content;
- this is a refinement of existing `UC-PH-PUBLISH` / `SCN-PH-PUBLISH`, not a new Use Case.

### LOG-PH-002 — Relate parallel scopes to Directions without making them identical

**Type:** IDEA CLARIFICATION  
**Updates:** `planning/documentation/action-log.md` → `LOG-DOC-001`, `LOG-DOC-003`  

**Clarification:** independently coordinated registered scopes should normally be designed with repository Directions / Use-Case families in view, and it can be useful to separate scopes along genuinely independent broad Directions. Direction remains semantic grouping while scope remains a fixed physical coordination/log boundary, so there is no mandatory 1:1 mapping. Use Cases across Directions may keep explicit integration/dependency/handoff links; when one concrete work item changes several registered roots, ordinary cross-scope package/log rules apply rather than merging the Directions or scopes.

### LOG-PH-003 — Apply Helper save recovery and scope-direction clarification

**Type:** APPLIED  
**Applied From:** `LOG-PH-001`, `LOG-PH-002`  
**ChangeSet:** `3ff3a5d0-fbca-4406-8e23-653a6b1235ae`  
**Package:** `59a3797b-c6f9-42c3-b80a-27bd01e028ed`  

**Target-State Result:** after successful Apply of this package:
- Planning Helper `0.24.1` recovers same-content optimistic GitHub conflicts by rereading/verifying once and taking the fresh SHA without a second PUT;
- divergent conflicts remain non-overwriting failures with a distinct user-visible outcome;
- explicit helper Save can replace a malformed helper-library document at the deterministic target using its exact current SHA, while Sync/read remain strict;
- `UC-PH-PUBLISH`, its Scenario, README, acceptance checks and focused tests describe the corrected behavior;
- the generated userscript matches the corrected modular source;
- reusable scope methodology states Direction/Use-Case affinity without conflating semantic Directions with physical registered scopes, and preserves explicit cross-Direction integration/handoff relations;
- this Helper log owns the full cross-scope record; the reusable-documentation and repository-shell scope logs contain reference-only entries to this applied record.

**Rationale:** make repository publishing safe and recoverable under stale/concurrent GitHub state while clarifying how semantic work Directions should inform, but not mechanically determine, fixed parallel-work/log boundaries.

### LOG-PH-004 — ReviewDiff corrected unverified-conflict status wording

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `3ff3a5d0-fbca-4406-8e23-653a6b1235ae`, package `59a3797b-c6f9-42c3-b80a-27bd01e028ed`  

**Material Finding / Selected Correction:** transport correctly distinguishes a verified divergent post-conflict reread from a failed reread, but the UI used one generic conflict prefix and therefore claimed confirmed divergence even when current remote content could not be verified. The selected correction is to preserve this distinction in user-visible status without changing transport, overwrite policy, Use-Case identity or scope architecture.

**Resulting Current Meaning:** verified-different reread → report real divergence and no overwrite; failed reread → report conflict + unknown current remote relation + no overwrite.

### LOG-PH-005 — Apply truthful post-conflict status correction

**Type:** APPLIED  
**Applied From:** `LOG-PH-004`  
**ChangeSet:** `3ff3a5d0-fbca-4406-8e23-653a6b1235ae`  
**Package:** `f8458fcf-6a6c-4388-9099-e25dc5263ef1`  

**Target-State Result:** after successful Apply of this package:
- Planning Helper `0.24.2` preserves the transport distinction between confirmed divergent remote bytes and an unverified remote state after a failed conflict reread;
- the UI never labels failed reread as confirmed divergence and still states that nothing was overwritten;
- a focused UI formatter unit test covers both conflict outcomes, and the Scenario/README/Use-Case boundary/manual acceptance reflect the same truth contract;
- the generated userscript matches the corrected modular source.

**Rationale:** keep user-visible repository state claims no stronger than the evidence available after optimistic-concurrency recovery.


### XREF-002 — Focus planning Use-Case activation on current owner routes

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/application-planning/action-log.md`  
**Entry:** `LOG-APP-009`  
**Reason:** Planning Helper semantic projection/source/tests/generated artifact changed to expose the selected Application Planning Use Cases and insert focused dynamic owner-route bodies. Full methodology rationale and applied-state relation are owned by the canonical Application Planning log entry.


### XREF-003 — Scenario-first planning, Testing foundation and Review Dependencies

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/application-planning/action-log.md`  
**Entry:** `LOG-APP-014`  
**Reason:** Planning Helper Scenario-Catalog migration, semantic projection source/tests/generated artifact synchronization are part of the same transition; full rationale and applied state are owned by the canonical Application Planning entry.


### XREF-004 — Residual Scenario-first cleanup correction

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/application-planning/action-log.md`  
**Entry:** `LOG-APP-018`  
**Reason:** Planning Helper `README.md` Structure cleanup is one part of the same ReviewDiff correction; full findings and applied target state are owned by the canonical Application Planning entry.

### XREF-005 — UC-centric planning consistency cleanup

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-020`  
**Reason:** Planning Helper semantic projection source/tests are synchronized with the current Workspace Planning Direction/Use-Case registries and the generated userscript is rebuilt; full consistency findings/rationale and target state are owned by the canonical reusable-documentation log.


### XREF-006 — Planning Helper Direction parity correction

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-022`  
**Reason:** Planning Helper source/tests/generated artifact add the missing Architecture Direction and generic root-Direction parity check as the final correction of the same UC-centric consistency-cleanup ChangeSet; full ReviewDiff finding/rationale and target state are owned by the canonical reusable-documentation log.

### XREF-007 — UC/Scenario semantic discoverability consistency cleanup

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-024`  
**Reason:** Planning Helper semantic projection source/generated artifact updates the coverage-UC label/meaning as part of the same consistency correction; full findings/rationale and applied state are owned by the canonical reusable-documentation log.

### LOG-PH-006 — Review editable real Commands and prompt governance

**Type:** ACTION  
**Source:** current post-`bd53ee52-46b2-4c32-b631-ab9b21bcc51c` repository state + user clarification that the editable command surface should operate on real Planning Commands rather than a separate Local Cmd entity  

**Selected Corrections / Changes:**
- replace the separate read-only `Commands` + editable `Local Cmds` UI split with one current `Commands` surface for real `planning/commands/*.command.md` definitions; local edits/new commands are draft state, not a second command type or authority;
- support `New command`, structured definition `Edit`, local draft validation, explicit `Save GitHub`, explicit same-path `Reload GitHub`, and local-only `Delete draft` only for unregistered commands; repository command retirement/delete remains outside the Helper;
- preserve historical helper-command records only as clearly marked legacy compatibility insertions in the same Commands surface; current UI no longer creates new helper-command records;
- preserve `Prompts` as a separate reusable insertion surface and establish reusable prompt-maintenance methodology so prompts navigate current owners instead of becoming source of truth; bootstrap/audit evidence requirements are profile-proportional;
- add a composable Deep Semantic Traceability Extension prompt instead of duplicating exhaustive per-UC/Scenario traceability blocks into every bootstrap;
- finish the previously identified Linked Notes bootstrap migration so its application semantic identity is Scenario/Scenario-Catalog based throughout;
- make command planning/routing methodology resolve the applicable semantic entry (Workspace/methodology UC or Application Scenario) rather than universally assuming a Use Case;
- strict-parse the tracked helper-library corpus during verification and repair the malformed tracked `план файл-обновление` legacy helper record.

**Boundary:** no `planning/documentation/tools/replacement-package-app/**` path or Replacement Package App behavior is changed; no repository command delete/retire UI is introduced; local command drafts do not grant or redefine permissions.

**Rationale:** keep one understandable command workspace around the real registered command authority, preserve safe local editing/provenance, and make reusable prompts/bootstraps follow current repository owners without duplicating changing semantic truth.

### LOG-PH-007 — Apply editable real Commands and prompt governance

**Type:** APPLIED  
**Applied From:** `LOG-PH-006`  
**ChangeSet:** `14491bc4-efb9-4263-8688-427a7e82e7ce`  
**Package:** `394b8864-cd82-4586-8da0-70a5aac76b0b`  

**Target-State Result:** after successful Apply of this package:
- Planning Helper `0.26.0` exposes one current `Commands` surface; `Local Cmds` is no longer a current surface/entity;
- real Planning Commands can be created/edited as validated local drafts and then explicitly persisted to their canonical `planning/commands/*.command.md` target; tracked commands support explicit `Reload GitHub`, while only unregistered drafts expose local `Delete draft`;
- legacy helper-command records remain accessible only as clearly marked compatibility insertions and current UI does not create new ones;
- prompt creation/review has a reusable non-authority UC/workflow, and the library includes one composable deep semantic traceability extension;
- Linked Notes bootstrap uses Scenario/Scenario Catalog terminology consistently; command planning/routing resolves UC-or-Scenario semantic entries correctly;
- every tracked helper-library record is strict-parsed by automated verification and the previously malformed legacy record is valid;
- generated userscript is rebuilt from source and full Helper verification passes;
- no Replacement Package App path is changed.

**Rationale:** make editable command work operate directly around real registered commands while keeping authority, permissions, repository mutations and reusable prompt guidance explicit.

### LOG-PH-008 — ReviewDiff correct residual command-workspace wording and GitHub disclosure

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `14491bc4-efb9-4263-8688-427a7e82e7ce`, package `394b8864-cd82-4586-8da0-70a5aac76b0b`  

**Material Findings / Selected Correction:** the editable-real-Commands transition is functionally present, but active UI/docs still omit `Reload GitHub` from some GitHub-I/O/token disclosures; `SCN-PH-PUBLISH` still names its result as publishing a local helper entity; root command routing retains one UC-only command-link sentence; and the Helper developer read order duplicates the command-authority README. The selected correction is to align those current summaries/identity labels with the already-implemented model, strengthen the existing policy test, and rebuild the generated userscript without changing command authority, repository deletion behavior or application scope.

**Resulting Current Meaning:** Planning Helper GitHub I/O is user-triggered only through `Check GitHub`, `Sync missing`, `Reload GitHub` or `Save GitHub`; `SCN-PH-PUBLISH` publishes one real Planning Command or Prompt/legacy compatibility record to its deterministic repository target; commands may relate to the applicable Workspace/methodology UC or Application Scenario; current read-order/surface summaries no longer teach the retired Local Cmd split.

### LOG-PH-009 — Apply residual command-workspace wording and GitHub disclosure correction

**Type:** APPLIED  
**Applied From:** `LOG-PH-008`  
**ChangeSet:** `14491bc4-efb9-4263-8688-427a7e82e7ce`  
**Package:** `4a1a90ea-4abf-40a1-b070-de216fbf6acf`  

**Target-State Result:** after successful Apply of this package:
- Planning Helper `0.26.1` names all explicit GitHub-I/O/token actions consistently, including `Reload GitHub`, while normal startup/search/insert/copy/edit/import remains RAM/local-only;
- `SCN-PH-PUBLISH` keeps its stable Scenario ID but is named `Publish One Planning Command Or Prompt To Repository`, matching its real trigger/body;
- root command routing says a command may link to the applicable Workspace/methodology Use Case or Application Scenario without owning semantic meaning;
- the Helper developer read order no longer duplicates `planning/commands/README.md`, and shared Tampermonkey/helper-library summaries describe the current Commands/Prompts/legacy-compatibility boundary;
- the existing policy test checks the complete explicit GitHub-action disclosure, the generated userscript is rebuilt, and full Helper verification passes;
- no repository command delete/retire UI and no `planning/documentation/tools/replacement-package-app/**` behavior/path change is introduced.

**Rationale:** close the ReviewDiff wording/disclosure defects without reopening the already-selected editable-real-Commands design.

### XREF-008 — Prompt and helper-library consistency cleanup

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-026`  
**Reason:** Planning Helper semantic projection source/test/version/generated artifact are synchronized with the same corrected prompt-maintenance identity and helper-library corpus invariant; full findings/rationale and applied target state are owned by the canonical reusable-documentation log.

### XREF-009 — Directed planning reviewability and current-UC projection cleanup

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-030`  
**Reason:** Planning Helper semantic projections/tests/generated artifact remove the retired current recheck/Goal-Map UCs while retaining the hidden compatibility command as part of the same directed planning/reviewability transition. Full rationale and applied target state are owned by the canonical reusable-documentation log.

### XREF-010 — Corrected collect-Ideas owner routing rebuild

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-032`  
**Reason:** Planning Helper generated command catalog is rebuilt after the corrected `собери идеи` owner route; full ReviewDiff findings and applied target state are owned by the canonical reusable-documentation log.

### XREF-011 — Rebuild after collect-Ideas depth correction

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-034`  
**Reason:** Planning Helper generated command catalog/userscript is rebuilt after the canonical `собери идеи` depth correction; full ReviewDiff findings and applied target state are owned by the canonical reusable-documentation log.

### LOG-PH-010 — Direction-nested Commands and complete Use-Case navigation

**Type:** IDEA CLARIFICATION  
**Source:** explicit user request to make Commands and all Use Cases available through nested Directions, with Commands and Use Cases kept in separate tabs  

**Current Conclusions:**
- Planning Helper navigation should expose `Commands`, `Use Cases` and `Prompts` as focused top-level surfaces; a separate Directions tab is unnecessary because Directions are the navigation tree inside Commands and Use Cases;
- `Commands` contains real Planning Command rows (plus clearly marked legacy command compatibility records) grouped under their applicable current Directions;
- `Use Cases` contains every current canonical UC from the registered UC sources, grouped under its Parent Direction, including command-backed UCs as semantic UC entries rather than redirects to Commands;
- Direction groups are collapsible/read-only navigation projections and do not become semantic authority;
- the current snapshot already exposes a parity defect: nine newly registered UCs are absent from `semantic-projections.js`; this same change must restore exact UC registry parity rather than add only the visual hierarchy.

**Questions / Risks / Problems:** none. The selected behavior follows the existing `SCN-PH-DISCOVER` / `SCN-PH-USE` responsibilities and does not require a new Scenario or new command ontology.

### LOG-PH-011 — Apply Direction-nested Commands and complete Use-Case navigation

**Type:** APPLIED  
**Applied From:** `LOG-PH-010`  
**ChangeSet:** `26236213-ed4e-43a3-b46f-4b8ca55175e8`  
**Package:** `d576af9b-fa21-4e5f-b1a5-fd2e067fb40b`  

**Target-State Result:** after successful Apply of this package:
- Planning Helper `0.27.0` exposes separate `Commands`, `Use Cases` and `Prompts` tabs with no standalone Directions tab;
- Commands and Use Cases are browsed through collapsible current Direction groups, and search can reveal matching Direction/entry content;
- all current canonical Use Cases are projected with Direction identity and remain independently insertable semantic UC bodies even when a command shortcut exists;
- visible Planning Commands resolve to one or more applicable Directions without changing command definitions/authority;
- the nine UCs added by the recent methodology transition are restored to Helper projection parity;
- docs, Scenario behavior, automated checks, manual acceptance and generated userscript agree on the same navigation behavior.

**Rationale:** make semantic navigation usable at scale without mixing executable Commands with semantic Use Cases or promoting Directions into a separate editable authority.


### LOG-PH-012 — Review local Delete, immediate seed catalogs and branch consistency

**Type:** REVIEW DIFF / LATER CLARIFICATION  
**Reviewed:** ChangeSet `26236213-ed4e-43a3-b46f-4b8ca55175e8`, applied package `d576af9b-fa21-4e5f-b1a5-fd2e067fb40b` + user clarification that Commands and Use Cases must support the same Helper-local removal behavior as Prompts and the complete current command/UC catalogs must ship in the update itself  

**Material Findings / Selected Corrections:**
- the Direction-nested branch removed the `Orientation` surface but startup still called `switchSurface(SURFACES.ORIENTATION)`, leaving the initial selected surface undefined until a manual tab click; startup must select `Commands` directly and a regression test must cover it;
- `UC-PLAN-REALIZATION` in the Helper projection still exposed the pre-methodology name/meaning and omitted the selected bounded pre-Domain comparative-evidence mode; synchronize that projection with the canonical current registry while keeping Domain authority upstream;
- active compatibility/reviewability surfaces still contained old `focus` control wording after the UC/Scenario-first transition; use current-target / semantic-owner wording instead of reviving a persistent Focus ontology;
- Prompts already support local-only Delete. Extend the same user outcome to real Planning Commands and Use-Case projections: Delete changes only the Helper-local snapshot/RAM, never deletes a registered command file and never changes a canonical Use-Case registry/owner;
- because an existing warm local snapshot previously ignored the current bundled command catalog, the update itself must carry complete generated local seed catalogs and merge missing current commands on startup while respecting explicit local-delete tombstones; do not defer initial completeness to a post-update GitHub sync;
- add generated `seed/commands.json` and `seed/use-cases.json` now. They are Helper-local projections only: Planning Command authority remains `planning/commands/*.command.md`, and Use-Case authority remains the canonical registries/owners.

**Questions / Risks / Problems:** none. The selected behavior stays inside current `SCN-PH-MANAGE-LOCAL`, `SCN-PH-DISCOVER` and `SCN-PH-USE`; no new semantic Scenario/UC or repository-delete capability is required.

### LOG-PH-013 — Apply local Delete, seed catalogs and branch consistency correction

**Type:** APPLIED  
**Applied From:** `LOG-PH-012`  
**ChangeSet:** `26236213-ed4e-43a3-b46f-4b8ca55175e8`  
**Package:** `9d58ce38-17b3-4ee7-b99d-fe958684bd41`  

**Target-State Result:** after successful Apply of this package:
- Planning Helper `0.28.0` starts on `Commands` with no removed-Orientation startup reference;
- every visible Planning Command, Use Case and Prompt supports local-only Delete; registered command files and canonical Use-Case registries/owners are never deleted by this UI action;
- local snapshot schema v2 stores `hiddenCommandIds` and `hiddenUseCaseIds`; ordinary startup/update respects those tombstones, while explicit `Sync missing` may restore a deleted registered command from GitHub;
- generated `seed/commands.json` carries all 15 current Planning Command definitions and generated `seed/use-cases.json` carries all 69 current canonical Use-Case projections in this package itself; the userscript bundles the same seeds and merges missing current commands into an existing warm snapshot without resurrecting explicitly deleted IDs;
- `UC-PLAN-REALIZATION` projection exposes the selected Review/Compare + bounded pre-Domain comparative-evidence contract, and semantic Use-Case bodies use `semantic_owner` rather than `focus`;
- current reviewability/legacy compatibility wording uses Current-Target/semantic-owner language consistently;
- automated Helper verification passes 101/101 tests and generated userscript/seed catalogs exactly match current sources;
- no GitHub/repository deletion, implicit repository write, new command ontology or new semantic owner is introduced.

**Rationale:** finish the same Helper navigation ChangeSet with immediately available local catalogs, symmetric local removal controls and the concrete consistency defects found in the applied branch.

### XREF-012 — Registry-driven complete UC projection and manual invocation

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-040`  
**Reason:** Planning Helper source/build/tests/generated artifact implement complete registry-driven UC parity and one manual command route per current UC as part of the same Practical Testing / callable-UC transition; full clarification and APPLIED target state are owned by the reusable-documentation log.


### XREF-013 — Correct direct-command classification for callable UCs

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-042`  
**Reason:** Planning Helper build/source projection, generated artifact, README/manual acceptance and regression tests correct the distinction between direct bespoke UC invocation and merely supporting/may-route command references; full ReviewDiff finding and APPLIED target state remain in the reusable-documentation canonical log.


### XREF-014 — Planning Helper Favorites and complete Application planning command surface

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-044`  
**Reason:** Planning Helper snapshot/UI/runtime/tests/docs/generated artifacts add local Command/Use-Case Favorites and rebuild the complete direct/generated manual invocation surface for the same Application SDS/WEUC/Testing transition; full clarification and APPLIED target state are owned by the reusable-documentation canonical log.

### XREF-015 — Correct Application SDS package-log coherence

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-046`  
**Reason:** Planning Helper removes the duplicate `XREF-014` produced by the original package and records the action-log correction; Helper runtime, Favorites and command/UC projections are unchanged.

### XREF-016 — GitHub-backed Direction/Command/UC catalogs, durable order and Hard Reload

**Type:** CROSS-SCOPE REFERENCE
**Canonical Log:** `planning/documentation/action-log.md`
**Entry:** `LOG-DOC-048`
**Reason:** Planning Helper `0.31.0` source/build/tests/docs/generated artifact implement GitHub-backed Direction/Command/Use-Case recovery, local durable order, Hard Reload, wider/resizable UI and current direct command projections as part of the same Full SDS/Architecture correction; full review and APPLIED target state are owned by the reusable-documentation canonical log.

### XREF-017 — Rebuild Helper projections for shared Planning Concerns model

**Type:** CROSS-SCOPE REFERENCE
**Canonical Log:** `planning/documentation/action-log.md`
**Entry:** `LOG-DOC-050`
**Reason:** Planning Helper generated command/use-case seeds are rebuilt from updated current command definitions and UC registries for the shared Concern/Q/R/P/Decision transition; Helper runtime behavior is unchanged and full semantic rationale/APPLIED state remain in the reusable-documentation canonical log.

### XREF-018 — Project collect-ideas orchestrator commands into Planning Helper

**Type:** CROSS-SCOPE REFERENCE
**Canonical Log:** `planning/documentation/action-log.md`
**Entry:** `LOG-DOC-052`
**Reason:** Planning Helper README, durable catalog order and generated command seed project the new GitHub-backed collect-ideas orchestrator commands without changing runtime/source/test behavior or adding custom tabs; full semantic rationale and APPLIED target state are owned by the reusable-documentation canonical log.

### XREF-019 — Implement metadata-driven IDTSPE/SDS Helper navigation

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-054`  
**Reason:** Planning Helper `0.32.0` codec/UI/navigation source/tests/catalog order/generated seeds/userscript implement the 7-IDTSPE + 32-SDS projection using stable `methodologyBinding` plus separate helper navigation metadata rather than hard-coded runtime identities; full review and APPLIED target state are owned by the reusable-documentation canonical log.


### XREF-020 — Rebuild Helper projections for IDTSPE routing/legacy-alias and Test Strategy correction

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-056`  
**Reason:** Planning Helper generated Direction/Command seeds and semantic-navigation regression tests are rebuilt from the corrected current repository owners; full routing/Test Strategy clarification and APPLIED target state remain in the reusable-documentation canonical log.

### XREF-021 — Make methodology views fully metadata-driven and enforce bootstrap no-Target behavior

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-058`  
**Reason:** Planning Helper `0.32.1` removes the remaining hard-coded IDTSPE/SDS view controls, derives view IDs/labels/order from command metadata, rebuilds generated projections and adds regression tests; full cross-scope ReviewDiff rationale and APPLIED state remain in the reusable-documentation canonical log.

### XREF-022 — Project Lens Applicability Scan and generic Lens dispatcher

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-060`  
**Reason:** Planning Helper command metadata/catalog order/generated seed, manual acceptance and regression tests project `41 = 9 IDTSPE + 32 SDS`, including metadata-driven Lens Operations (`подбери линзы` / `примени линзу`) while preserving four specialized Lens shortcuts; full semantic rationale and APPLIED target state remain in the reusable-documentation canonical log.

### XREF-023 — Rebuild generic Core command ownership and Lens-operation host policy

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-062`  
**Reason:** Planning Helper command seed/tests are rebuilt from the corrected nine-surface Core command authority and distinct `CREATE_OR_REUSE_TARGET` vs `RESOLVE_OR_REUSE_TARGET` Lens-operation policies; verification reaches 122/122 while the 41-surface navigation/count remains unchanged.

### XREF-024 — Extend evolution-companion ownership regression across Domain and Slice

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-064`  
**Reason:** Planning Helper semantic-navigation tests extend the existing artifact-guidance ownership regression to Domain Draft, Domain Discovery and Implementation Slice without changing runtime, command metadata, generated seed, methodology navigation or the 122-test total; full correction rationale/APPLIED state remain in the reusable-documentation canonical log.

### XREF-025 — Regenerate Helper command seed for explicit replacement OBS-ACTION fields

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/action-log.md`  
**Entry:** `LOG-PLAN-002`  
**Reason:** Planning Helper participates only through the generated `seed/commands.json` projection required by its build invariant; the canonical `давай архив` command semantics, ReviewDiff finding, correction rationale and APPLIED target-state relation remain owned by the Planning Root log.
### XREF-026 — Regenerate Helper Scenario command projection

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-115`  
**ChangeSet:** `405f5eb1-4748-4088-a8e9-7143b8236688`  
**Reason:** Planning Helper participates only through regenerated `seed/commands.json` from the three current Scenario command definitions; runtime/source behavior is unchanged and the full Scenario Target migration rationale/APPLIED target state remain in the reusable-documentation canonical log.

### XREF-027 — Regenerate Helper Prototype / Practical-Test command projection

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-121`  
**ChangeSet:** `e2c33fe2-1f2d-4ae4-bc76-bfdae0e3b5ab`  
**Reason:** Planning Helper participates only through regenerated `seed/commands.json` for the corrected Prototype and implemented-practical-Evidence command definitions; runtime/source behavior is unchanged, and full ReviewDiff clarification/APPLIED state remain in the reusable-documentation canonical log.
### LOG-PH-014 — Add invocation-time command side-effect framework

**Type:** USER CLARIFICATION / HELPER RUNTIME DESIGN / NEW CHANGESET  
**ChangeSet:** `8bb283e5-7568-45a0-a05a-4817567ad1e2`  
**ChangeSet Label:** `Planning Helper — command side-effect invocation framework`  

**Selected Meaning:**
- keep every canonical `[PLANNING_COMMAND] ... [/PLANNING_COMMAND]` body unchanged; runtime context is not written into the command definition or command body stored in GitHub;
- add a generic Helper-owned command side-effect registry. Side-effect code executes only when the user actually invokes/copies a command, may perform asynchronous work, and decides the arbitrary text body it returns; Helper appends that returned body after the complete canonical command body for that invocation;
- side-effect execution is event-driven, not periodic: rendering, Reload and Hard Reload do not execute it;
- a configured/required side-effect failure aborts the action instead of silently sending an incomplete invocation; commands without a registered side effect remain byte-for-byte unchanged;
- register the first side effect, `capture-chat-context`, on command ID `replacement_archive.create`. In this first stage it only generates a fresh UUID per invocation and returns a separate `[PLANNING_COMMAND_SIDE_EFFECT]` block carrying `effect: capture-chat-context` + `chatContextToken`;
- browser `sessionStorage`, content-agent exchange, `conversationKey`/title capture and Java persistence are explicitly deferred to the next integration stage.

**Resulting Target Meaning:** establish the reusable side-effect execution/body-appending seam first, with a deterministic stage-1 chat-context token effect, before connecting it to browser-tab/bridge state.

### LOG-PH-015 — Apply command side-effect framework and capture-chat-context stage 1

**Type:** APPLIED  
**Applied From:** `LOG-PH-014`  
**ChangeSet:** `8bb283e5-7568-45a0-a05a-4817567ad1e2`  
**Package:** `be6a98be-c31a-44b6-8d24-4250b5c61052`  

**Target-State Result:** after successful Apply of this exact package:
- Planning Helper `0.33.0` has a generic asynchronous command side-effect registry/executor whose returned bodies are appended after, never inside, the canonical command body;
- Insert/Full and explicit Copy resolve the invocation body exactly once per action; non-side-effect commands preserve existing bytes and behavior;
- `replacement_archive.create` generates a fresh `chatContextToken` UUID on each invocation and appends it in a separate `[PLANNING_COMMAND_SIDE_EFFECT]` block;
- side-effect errors prevent insertion/copy and are surfaced in Helper status; no periodic registration, `sessionStorage`, ChatGPT agent, bridge or Java mapping is introduced yet;
- generated userscript and acceptance/docs/tests project the same boundary.

**Rationale:** make runtime command augmentation a reusable code seam and prove it with the archive-command token stub without contaminating GitHub command authority or prematurely coupling Helper to the browser bridge.

**Package-base correction:** prior produced package `e72716fe-1c55-4293-abe9-c0a108d91a3a` is superseded for this invocation because its Helper action-log/generated-userscript base did not match the supplied local snapshot. Package `be6a98be-c31a-44b6-8d24-4250b5c61052` is rebased to snapshot base commit `b46e61064c1585902dfb392c80398ee09f74a7bb` while preserving the same open ChangeSet meaning.

### LOG-PH-016 — Correct stale README version after stage-1 ReviewDiff

**Type:** REVIEW DIFF / CORRECTION / APPLIED TARGET  
**Reviewed ChangeSet:** `8bb283e5-7568-45a0-a05a-4817567ad1e2`  
**Reviewed Package:** `be6a98be-c31a-44b6-8d24-4250b5c61052`  
**Correction Package:** `2e8e69f2-5ff4-44b3-877a-8a84bb748e23`  

**Material ReviewDiff Finding / selected correction:**
- the stage-1 implementation and side-effect boundary are coherent, but the Helper README header still reports `Version: 0.31.0` while `package.json`, Manual Acceptance and the generated userscript project Helper `0.33.0`;
- update only the README version metadata to `0.33.0`; do not change runtime behavior, side-effect registration, token semantics, canonical Planning Command bodies, generated userscript bytes or the explicitly deferred browser/sessionStorage/agent/Java integration.

**Target-State Result:** after successful Apply of this exact correction package, Helper README/package/manual/generated-artifact version projections are consistent at the stage-1 `0.33.0` release while the already-reviewed command side-effect implementation remains unchanged.

**APPLIED relation:** successful Apply of package `2e8e69f2-5ff4-44b3-877a-8a84bb748e23` corrects the known ReviewDiff P2 inside still-open ChangeSet `8bb283e5-7568-45a0-a05a-4817567ad1e2`. The ChangeSet remains open until a later cumulative ReviewDiff is accepted as APPROVABLE; this package does not start a new ChangeSet.

### XREF-028 — Regenerate Helper Slice Strategy command projection

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-125` / `LOG-DOC-126`  
**ChangeSet:** `ba1a2f95-fafb-405b-892b-1295e250eeb0`  
**Package:** `3b79ff63-c2ca-4bcc-8da9-023988123544`  
**Reason:** Planning Helper participates only through regenerated `seed/commands.json` from the corrected Slice Strategy / Implementation Slice command definitions; runtime/source behavior is unchanged and full ReviewDiff rationale/APPLIED state remain in the reusable-documentation canonical log.

### XREF-029 — Invocation-scoped chatContextToken bind action

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/tools/replacement-package-app/action-log.md`  
**Entry:** `LOG-RPKG-050`  
**ChangeSet:** `10ce3e4a-4b24-42d4-9b63-b7fee8b8c655`  
**Package:** `9ba85d44-3853-4452-92ba-e96495d302d4`  
**Reason:** Planning Helper participates through explicit one-shot Bind actions, per-tab session capture, invocation-scoped OBS-ACTION echo requirements, tests/docs and regenerated userscript; full cross-scope Apply/binding/notification semantics and APPLIED relation are owned by the Replacement Package App canonical log.

### XREF-030 — Regenerate Helper IDTSPE work-mode projection

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-127` / `LOG-DOC-128`  
**ChangeSet:** `312f308b-762d-4b53-8868-ac887474db55`  
**Package:** `d7ea82d4-9f38-4422-87dc-637e4f861cd3`  
**Reason:** Planning Helper participates only through regenerated `seed/commands.json` for canonical `idtspe.work`; runtime/source behavior is unchanged. The reusable-documentation log owns the Broad Discussion / Integration Checkpoint semantics, Decision-retention rules and APPLIED target state.

### XREF-031 — Regenerate Helper IDTSPE material-intake projection

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-129` / `LOG-DOC-130`  
**ChangeSet:** `312f308b-762d-4b53-8868-ac887474db55`  
**Package:** `d46c640b-8604-44a5-be31-e36b98470db9`  
**Reason:** Planning Helper participates only through regenerated `seed/commands.json` for canonical `idtspe.work`; runtime/source behavior is unchanged. The reusable-documentation log owns the ReviewDiff correction and APPLIED Broad Discussion/Intake/Idea-driver semantics.

### XREF-032 — Regenerate Helper IDTSPE simplified discussion/checkpoint projection

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-131` / `LOG-DOC-132`  
**ChangeSet:** `312f308b-762d-4b53-8868-ac887474db55`  
**Package:** `0df594dd-0599-4630-9b4c-047b1c9e2315`  
**Reason:** Planning Helper participates only through regenerated `seed/commands.json` for canonical `idtspe.work`; runtime/source behavior is unchanged. The reusable-documentation log owns the remaining ReviewDiff correction and APPLIED target-state meaning.

### XREF-033 — Helper Bind action grants token bind/rebind authority

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/tools/replacement-package-app/action-log.md`  
**Entry:** `LOG-RPKG-054`  
**ChangeSet:** `9baa3cc4-1d24-4613-b074-83e98496fa3e`  
**Package:** `84a3ccd8-d9bf-4881-a228-e59c006e612f`  
**Reason:** Planning Helper runtime is unchanged, but its explicit `Bind + ...` action is clarified as the user authorization that allows the consumer to bind or rebind the ChangeSet Review chat immediately when that invocation's `chatContextToken` resolves. Ordinary Insert/Full/Copy remains non-binding and token carry-forward remains forbidden; full consumer behavior/APPLIED state is canonical in `LOG-RPKG-054`.
