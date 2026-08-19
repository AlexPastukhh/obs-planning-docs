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
