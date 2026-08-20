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

### LOG-DOC-009 — Workspace Architecture Planning foundation

**Type:** IDEA REVIEW  
**Source:** current planning discussion + material result of `собери идеи` covering Universal Architecture Lens, Workspace Use Cases, paths, change pressure/axes, architecture decisions/state/evolution, Domain Discovery/Realization and Vertical Slice reasoning  

**Current Conclusions:**
- Workspace Architecture Planning is a separate reusable Direction/family rather than a subtopic hidden inside Application Domain/Slice planning;
- architecture quality is evaluated from important Workspace Use Cases, including read-only/understanding/inspection/diagnostic/verification work, plus important concrete changes, Extensions, Requirements/constraints and their real/expected paths;
- Workspace Understanding/Change Paths and Application Runtime Realization Paths expose locality, coupling, Change Surface, Discoverability, Comprehension Cost, Working-Context Load, verification/migration/operational risk and other material pressure;
- Change Pressure is built from current Workspace UCs, important concrete changes and Extensions (decomposed proportionally into expected future Workspace UCs / affected current UCs), then generalized into evidence-backed Change Axes / Hot Paths;
- Progressive Architecture requires the least complexity justified now; Architecture complexity must be paid for on important current/future paths, and an axis only creates abstraction pressure where it actually crosses;
- abstraction is valuable when it reduces irrelevant detail/Working-Context Load without hiding correctness-relevant meaning; naming is a navigation/reasoning interface rather than cosmetic style;
- architecture patterns/DRY/Ports/dependency direction/state ownership/persistence/async/test seams/reversibility are conditional decision heuristics, not mandatory target architecture;
- the initial Architecture Use-Case family is `UC-PLAN-ARCH-STATE`, `UC-PLAN-ARCH-PATH`, `UC-PLAN-ARCH-PRESSURE`, `UC-PLAN-ARCH-DECISION`, `UC-PLAN-ARCH-EVOLUTION`; Workspace Use-Case Discovery is a supporting workflow rather than a sixth UC for this change;
- Application Planning gains optional `UC-PLAN-DOMAIN-DISCOVERY` before Domain selection and `UC-PLAN-REALIZATION` before detailed Slice planning; Domain correctness outranks implementation convenience, while material realization impossibility/cost/performance/consistency findings may return upstream;
- Domain verification meaning should exist proportionally before detailed Slice planning for nontrivial Domain meaning, while test-framework convenience must not design unresolved Domain APIs;
- Vertical Slice means locality of independently useful behavior/change and end-to-end checkability, not mandatory folder structure.

**Questions / Risks / Problems:**

#### Q-ARCH-TERM-01 — canonical name for a rare/one-off significant Workspace change

**Related Ideas:** `IDEA-ARCH-02`, `IDEA-AXIS-01`  
**Current Plan:** distinguish stable Workspace Use Cases from important concrete Workspace changes; keep the latter descriptive rather than fixing a new ontology term in this ChangeSet.  
**Finding:** `Workspace Change Case` remains only a working term; a better canonical name may exist.  
**Relation / Impact On Current Plan:** the Architecture Lens, paths and pressure model do not depend on the final label, so current behavior remains usable without promoting the working term.  
**Blocking:** no.

#### Q-ARCH-UC-DISCOVERY-01 — separate Workspace-Use-Case-Discovery UC

**Related Ideas:** `IDEA-ARCH-01`, `IDEA-ARCH-UC-01`  
**Current Plan:** keep five Architecture Use Cases; `workspace-use-case-discovery-workflow.md` is supporting work primarily under `UC-PLAN-ARCH-PRESSURE`.  
**Finding:** the discovery result can be independently useful and may later justify its own UC if separate activation proves valuable.  
**Relation / Impact On Current Plan:** no sixth UC is needed for the current Direction topology; the supporting workflow remains reusable by State/Path/Decision work.  
**Blocking:** no.

### LOG-DOC-010 — Architecture Planning detailed clarifications and first-update boundary

**Type:** IDEA CLARIFICATION  
**Updates:** `LOG-DOC-009`  

**Clarification:** Architecture Planning must explicitly preserve Workspace Use Cases as first-class inputs rather than collapsing them into a generic future-change axis. Read-only/understanding UCs are architecture-relevant because a Workspace must support finding canonical meaning, navigation, forming a correct mental model and safe reasoning in addition to mutation. Excessive facts/locations/exceptions that must be held simultaneously to avoid errors are a material Working-Context-Load problem. Extensions are reviewed through the future Workspace UCs / affected current UCs and paths they imply rather than used as bare labels that automatically justify abstractions.

**Selected first-update boundary:** add the Architecture Direction/five UCs, six discussed workflows, three discussed templates, one integrated scheduling/calendar-provider example, and the two discussed Application Planning capabilities/workflows (`DOMAIN-DISCOVERY`, `REALIZATION`) with minimal current owner integration. Do not add Workspace-type UC catalogues, extra State/Evolution/Domain-Discovery/Realization templates, Prototype Variant topology, Application-Use-Case migration, extra commands or a new parallel-work scope in this package.

### LOG-DOC-011 — Apply Workspace Architecture Planning foundation and application handoffs

**Type:** APPLIED  
**Applied From:** `LOG-DOC-009`, `LOG-DOC-010`  
**ChangeSet:** `7624a3de-c989-466f-8942-c64e2972f530`  
**Package:** `0fa1c488-a230-4963-97e1-b10268299e02`  

**Target-State Result:** after successful Apply of this package:
- `DIR-PLAN-ARCHITECTURE` is a discoverable reusable peer Direction under `planning/documentation/architecture-planning/` with five independently activatable Architecture Use Cases;
- stable Architecture Lens principles own Progressive Architecture, complexity payment, understanding/readability/Working-Context Load, abstraction, naming, Architecture Flags, tax/payoff/intent/reversibility and conditional architecture heuristics;
- Workspace Use Cases, Understanding/Change Work Paths, Extensions, Change Pressure, Change Axes and Hot Paths have one generic architecture-level semantic owner, while Application Planning keeps application-specific Requirement/Future-Scenario/change evidence;
- Architecture workflows support Workspace-UC discovery, path analysis, pressure/axis review, Architecture State review, one Architecture Decision and coherent Architecture Evolution;
- the reusable path/pressure/decision templates and scheduling/calendar-provider example demonstrate how current/future Workspace UCs and cognitive/change/runtime costs drive architecture decisions;
- Application Planning exposes `UC-PLAN-DOMAIN-DISCOVERY` and `UC-PLAN-REALIZATION`, while current Domain selection owns verification meaning and Slice planning explicitly reviews Runtime Path, Implementation Path and Workspace Change Impact;
- no Application-Use-Case migration, extra Architecture UC, Workspace-type UC catalogue, extra templates, Profile changes, command changes or parallel-scope split are introduced.

**Rationale:** make architecture planning evidence-driven through real Workspace work and expected change, including the cost of understanding the Workspace, while keeping application semantic/implementation planning proportional and preventing the Architecture Lens itself from becoming speculative ceremony.

### LOG-DOC-012 — ReviewDiff correct Architecture variant/template/log integration

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `7624a3de-c989-466f-8942-c64e2972f530`, package `0fa1c488-a230-4963-97e1-b10268299e02`  

**Material Findings / Selected Corrections:**
- Architecture Decision/Evolution introduced wording that could be read as a new `Architecture Variant` / `Evolution Variant` ontology even though the repository already owns generic `Idea Variant` + `Current Selected Variant` semantics. Correct the Architecture workflows/template to reuse generic Idea Variants and explicitly avoid a new Variant type.
- Domain/Slice workflows gained Domain Verification, Realization sanity and Runtime/Implementation/Workspace-change analysis, but the existing recommended Domain/Slice templates still reflected the older shape. Synchronize the existing templates rather than add new Domain-Discovery/Realization templates.
- `LOG-DOC-009` preserved two material unresolved findings as plain bullets instead of the canonical Current-Plan-relative Q/R/P shape. Normalize those same findings without changing their meaning and keep this ReviewDiff correction as provenance for the normalization.

**Resulting Current Meaning:** the applied Architecture Planning foundation remains selected unchanged; corrections only align generic Variant ontology, existing recommended templates and cumulative action-log contract with the already selected workflows/semantics.

### LOG-DOC-013 — Apply Architecture Planning integration corrections

**Type:** APPLIED  
**Applied From:** `LOG-DOC-012`  
**ChangeSet:** `7624a3de-c989-466f-8942-c64e2972f530`  
**Package:** `933f384c-98ea-4bcf-aa96-68db0a0a9f1a`  

**Target-State Result:** after successful Apply of this package:
- Architecture Decision/Evolution alternatives use the reusable generic `Idea Variant` / `Current Selected Variant` contract; no new Architecture/Evolution Variant ontology exists;
- `DOMAIN-DRAFT-TEMPLATE.md` exposes Realization Sanity Check and proportional Domain Verification Meaning matching the current Domain workflow;
- `SLICE-STRATEGY-DRAFT-TEMPLATE.md` consumes Domain Verification meaning and material Application Realization findings when present;
- `IMPLEMENTATION-SLICE-DRAFT-TEMPLATE.md` exposes Expected Runtime Path, Implementation Path, Workspace Change Impact and material risks matching the current Slice workflow;
- the two unresolved Architecture foundation findings in `LOG-DOC-009` use canonical Current Plan + Finding + Relation/Impact Q/R/P form, with this correction entry preserving why the historical representation was normalized;
- all other Architecture Planning/Application Planning meaning from `LOG-DOC-009` through `LOG-DOC-011` remains unchanged.

**Rationale:** remove ontology ambiguity and workflow/template/log drift without expanding the selected Architecture Planning scope or adding new capabilities/artifacts.



### XREF-DOC-006 — Scenario-first planning, Testing foundation and Review Dependencies

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/application-planning/action-log.md`  
**Entry:** `LOG-APP-014`  
**Reason:** reusable documentation gains Testing Planning and Review Dependency owners and retires Field Kits as part of the same transition; full rationale and applied state are owned by the canonical Application Planning entry.


### XREF-DOC-007 — ReviewDiff correction for preserved content and Scenario-first consistency

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/application-planning/action-log.md`  
**Entry:** `LOG-APP-016`  
**Reason:** reusable documentation bootstrap/profile/example corrections participate in the same ChangeSet correction; full ReviewDiff findings and target state are owned by the canonical Application Planning entry.

