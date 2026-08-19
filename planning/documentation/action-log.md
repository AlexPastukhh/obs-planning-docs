# Scope Action Log

Scope: `SCOPE-REUSABLE-DOCUMENTATION`
Status: active cumulative high-level log

Logging starts only after explicit user instruction; no pre-start history is reconstructed automatically. This log intentionally does not reconstruct repository work before the user's logging-start boundary in the current planning discussion.

## Entries

### LOG-DOC-001 — Scope logs, package final-state logging and reusable Goal Map

**Type:** IDEA REVIEW  
**Source:** current planning chat; material result of `собери идеи` after logging had been explicitly requested  

**Current Conclusions:**
- independent parallel-work scopes are fixed repository structures with a canonical log at each scope root;
- scope logs keep material high-level work/rationale, including Idea Review results, later material clarifications, material ReviewDiff corrections and `APPLIED` relations;
- replacement packages must carry coherent post-apply log state together with implementation state;
- reusable Goal Map is a current/forward-looking working surface distinct from Action Log and Dashboard-specific Goal Maps.

### LOG-DOC-002 — Existing reusable staging-workspace model is superseded

**Type:** IDEA CLARIFICATION  
**Updates:** `LOG-DOC-001`  

**Clarification:** the existing reusable `planning/documentation/parallel-work/` workspace/sync/global-log architecture is not partially maintained. Its foundational staging/shadow-copy/local-log/main-log model is superseded in full by fixed registered scopes + scope-local logs.

### LOG-DOC-003 — Scope boundaries are fixed by the root Scope Registry

**Type:** IDEA CLARIFICATION  
**Updates:** `LOG-DOC-001`  

**Clarification:** chats cannot repartition the repository into different scopes per task. Scope roots/log paths are registered canonically in the root Scope Registry and remain fixed until an explicit registry architecture change. Nested paths belong to the deepest active registered scope root.

### LOG-DOC-004 — Material ordinary chat clarifications remain part of Idea provenance

**Type:** IDEA CLARIFICATION  
**Updates:** `LOG-DOC-001`  

**Clarification:** after `собери идеи`, an ordinary user/chat message that materially changes Idea meaning, Current Conclusion, constraint, resolved Q/R/P or implementation requirement must be reflected in the scope log before the next `APPLIED` record. Non-material conversation is not logged.

Additional selected clarification: cross-scope work has one affected canonical log with the full record; other affected scope logs contain reference-only entries. A plain `APPROVABLE` ReviewDiff with no new material meaning is not logged.

### LOG-DOC-005 — Apply registered scopes, scope-log lifecycle and reusable Goal Map migration

**Type:** APPLIED  
**Applied From:** `LOG-DOC-001`, `LOG-DOC-002`, `LOG-DOC-003`, `LOG-DOC-004`  
**ChangeSet:** `63d43c12-62d2-4647-9611-50a57cc62859`  
**Package:** `d951e3b1-45aa-42b2-9b17-96e9376c0b04`  

**Target-State Result:** after successful Apply of this package:
- the root Scope Registry and fixed initial scope boundaries exist;
- every registered scope has its canonical `action-log.md`;
- the obsolete staging `parallel-work/` methodology is removed and the stable parallel-work command routes through registered scopes;
- cross-scope logging uses one full canonical record + references;
- package production requires coherent cumulative post-apply log state and captures material Idea/clarification/prior ReviewDiff correction meaning;
- a reusable Goal Map owner/Use Case is discoverable through application-planning navigation;
- the Planning Helper projection is regenerated to match the new Use Cases.

**Rationale:** make parallel-work boundaries stable and repository-visible while preserving material reasoning/application traceability without duplicating records or depending on a repository-wide aggregate log.

### LOG-DOC-006 — ReviewDiff found missing reusable log-reference identity contract

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `63d43c12-62d2-4647-9611-50a57cc62859`, package `d951e3b1-45aa-42b2-9b17-96e9376c0b04`  

**Material Finding / Selected Correction:** cross-scope references already depend on canonical log Entry IDs, but reusable scope/log semantics did not define stable/non-reused/non-renumbered Entry identity or the minimum semantic anchors for supported record kinds. The selected correction is to add that contract inside the existing scope/log workflow rather than create a separate schema owner.

**Resulting Current Meaning:** the registered-scope/log migration remains selected, but the reusable workflow must own stable Scope ID + Log Entry ID semantics and concise type-specific minimum record shapes before the transition is semantically complete.

### LOG-DOC-007 — Add practical ReviewDiff and File Update examples

**Type:** IDEA CLARIFICATION  
**Updates:** `LOG-DOC-006`  

**Clarification:** practical examples are required for semantic ReviewDiff and `план файл-обновление` so future chats can reproduce the current output contracts. The existing `COLLECT-IDEAS-PRACTICAL-EXAMPLE.md` was checked and remains current coverage, so it is not duplicated or rewritten. Examples remain demonstrations only and link back to canonical owners.

### LOG-DOC-008 — Apply stable log identity correction and practical example coverage

**Type:** APPLIED  
**Applied From:** `LOG-DOC-006`, `LOG-DOC-007`  
**ChangeSet:** `63d43c12-62d2-4647-9611-50a57cc62859`  
**Package:** `2816952e-701e-401f-9bcc-0b59d92263d7`  

**Target-State Result:** after successful Apply of this package:
- reusable scope/log semantics define stable non-reused Scope IDs and stable unique/non-renumbered canonical Log Entry IDs;
- supported log record kinds have concise type-specific minimum semantic anchors without a separate schema file;
- File Update planning links and provides a current practical example with command metadata, selected route, Current-Plan-relative aggregates and registered scope/log planning;
- ReviewDiff semantic review links and provides a practical `NEEDS CORRECTION` → correction → `APPROVABLE` example, including the empty-Q/R/P nuance and no approval-only log event;
- the examples index exposes both current practical examples;
- the existing `собери идеи` practical example remains unchanged because it already provides current coverage.

**Rationale:** make the new scope/log reference model durable and make the two review/planning output contracts practically reproducible without creating duplicate semantic owners.

### XREF-DOC-001 — Planning Helper save recovery and scope-direction clarification

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/tools/tampermonkey/chat-command-palette/action-log.md`  
**Entry:** `LOG-PH-003`  
**Reason:** reusable scope methodology changed as part of the same cross-scope work item as the Planning Helper publishing correction. Full reasoning, selected clarification and applied-state history are owned by the canonical Helper log entry.

### XREF-DOC-002 — Detailed application planning workspace/profile alignment

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/application-planning/action-log.md`  
**Entry:** `LOG-APP-003`  
**Reason:** the specialized SDS profile/field kit under the reusable-documentation scope were aligned with the new detailed application-planning workspace and Reference Object Candidate contract. Full reasoning and applied-state history are owned by the canonical Application Planning log entry.

### XREF-DOC-003 — Scenario Variant authority profile correction

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/application-planning/action-log.md`  
**Entry:** `LOG-APP-005`  
**Reason:** the specialized SDS profile under the reusable-documentation scope was corrected so current Scenario behavior authority follows the selected Scenario owner/Variant rather than unconditionally the root Scenario file. Full ReviewDiff correction reasoning and applied-state history are owned by the canonical Application Planning log entry.


### XREF-DOC-004 — Application Concept bridge and Idea-finding traceability

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/application-planning/action-log.md`  
**Entry:** `LOG-APP-007`  
**Reason:** generic Idea/File Update/ReviewDiff traceability semantics changed as part of the same cross-scope work item as the Application Concept/Solution→Application planning bridge and detailed-planning traceability update. Full Idea Review and applied-state history are owned by the canonical Application Planning log entry.


### XREF-DOC-005 — Prototype/Requirement/Domain/Slice planning and focused Use-Case activation

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/application-planning/action-log.md`  
**Entry:** `LOG-APP-009`  
**Reason:** reusable Scenario/Domain/Slice profile/field-kit and Tampermonkey semantic-projection workflow changed as part of the same Application Planning methodology work. Full Idea Review and applied-state history are owned by the canonical Application Planning log entry.
