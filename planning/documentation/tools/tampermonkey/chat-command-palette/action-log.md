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
