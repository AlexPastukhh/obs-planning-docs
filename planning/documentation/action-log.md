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

### LOG-DOC-014 — UC-centric Workspace planning and integrated collect-ideas

**Type:** IDEA REVIEW  
**Source:** current planning discussion + repeated `собери идеи` review of UC/Scenario-centric planning, semantic file roles, vertical UC realization and the `собери идеи` command  

**Current Conclusions:**
- development of an evolving Workspace is centered on useful Workspace Use Cases; Application actor-visible behavior remains Scenario-centered at the application boundary;
- every material Workspace owner/structure should be justified by a useful result or a necessary realization/support/verification path rather than by file existence alone;
- Ideas remain one generic entity and are routed to affected existing/new Workspace UCs or Application Scenarios; several Ideas may converge into one integrated Target UC, while one cross-cutting Idea is kept once and referenced from each affected unit with local impact only;
- fundamental generic Workspace planning capabilities are Establish Workspace Use Case, Review/Change Workspace Use Case and proportional Review Workspace Use-Case Topology;
- Step 1 (UC), Step 2 (Domain/rules/models/representations) and Step 3 (vertical realization/files/verification) are planning depths inside the selected Workspace UC rather than separate peer UCs by default;
- documentation planning normally reviews Step 1 + Step 2 together once the UC boundary is grounded, while Step 3 is added when requested or sufficiently grounded; earlier later-step insights are preserved as Carry-Forward Context and later validated/refined/rejected;
- Current, Target and Transition are separate review projections: current owners are summarized/linked, changed/new Target meaning is explicit enough to avoid semantic blind spots, and Transition separately explains what/why/owner movement;
- UC workflows act as orchestration owners analogous in responsibility to application-service/use-case coordinators, while registries, focused model/rule owners and templates retain distinct semantic authority;
- recognizable semantic file roles include Registry, Workflow, optional focused Model, Principles/Terminology, Template, Navigation, Command, Verification and Log; a Model file is not mandatory per UC;
- Step 3 traces the expected Workspace Change Path and uses the current Architecture Lens proportionally before exact file choice, optimizes the lowest-cost correct/verifiable path rather than raw step/file count, and minimizes capability-local cross-Slice overlap/shared coordination tax;
- the `собери идеи` command may orchestrate Idea Review into affected UC/Scenario planning to the selected depth while remaining read-only and not becoming semantic authority;
- standalone `план файл-обновление` retirement remains an unselected future simplification and is not part of this ChangeSet.

### LOG-DOC-015 — UC-centric planning clarifications and pre-package owner corrections

**Type:** IDEA CLARIFICATION  
**Updates:** `LOG-DOC-014`  

**Clarification / resulting meaning:**
- Step 3 stays inside the same UC block as Step 1/2; do not create generic Workspace Domain/Slice peer UCs merely because those planning depths are separately reviewable;
- Q/R/P appears near the beginning of the integrated output after a short Current Plan Snapshot, while cross-cutting Ideas remain compact and are defined once;
- the canonical generic Use-Case definition/contract remains `direction-and-use-case-registry-workflow.md` + `USE-CASE-REGISTRY-TEMPLATE.md`; do not add a duplicate `workspace-use-case-model.md` authority;
- instead add a Workspace Planning principles owner that defines how UC changes are planned, while generic UC identity/relationships remain in the existing registry methodology;
- `UC-PLAN-COLLECT-IDEAS` remains the narrow Idea-review capability; the concrete `собери идеи` command is the wider read-only orchestration shortcut and dynamically reads affected semantic owners;
- Application Planning registry/contracts are not changed by this package; application behavior continues through existing Scenario/Domain/Slice owners;
- current `planning/README.md` must be updated because it explicitly enumerates current Direction families; the current `COLLECT-IDEAS-PRACTICAL-EXAMPLE.md` must also be updated because the command output contract changes materially;
- scope logging for this cross-scope package uses `planning/documentation/action-log.md` as canonical full log and `planning/action-log.md` as reference-only log.

### LOG-DOC-016 — Apply UC-centric Workspace planning foundation and collect-ideas integration

**Type:** APPLIED  
**Applied From:** `LOG-DOC-014`, `LOG-DOC-015`  
**ChangeSet:** `d70d352a-e364-4798-8dab-910f14eaba49`  
**Package:** `1379cdb4-b362-4147-96fe-1babfe6b848e`  

**Target-State Result:** after successful Apply of this package:
- `DIR-PLAN-WORKSPACE` is discoverable as a reusable peer Direction for planning useful capabilities of evolving Workspaces;
- its registry exposes independently useful Establish Workspace Use Case, Review/Change Workspace Use Case and proportional Review Workspace Use-Case Topology capabilities;
- shared Workspace Planning principles own UC-centric Step 1/2/3 change-planning semantics, Current/Target/Transition projections, Carry-Forward, recognizable semantic owner roles, graph usage, vertical realization/locality and shared-coordination review without duplicating the generic UC or Architecture authorities;
- each Workspace planning workflow keeps Step 1, Step 2 and Step 3 inside one selected UC plan and uses current Architecture Planning proportionally before exact files when Step 3 exposes material architecture/path pressure;
- the `собери идеи` command remains read-only but returns an integrated UC/Scenario-centric plan to the selected/justified depth, with early Current-Plan-relative Q/R/P, compact cross-cutting Ideas, one integrated target per affected unit and cross-UC/cross-Slice review when material;
- generic Idea owners route selected Ideas to affected useful-result owners while preserving the single generic Idea entity and Current-Plan aggregate contracts;
- documentation update planning uses generic Workspace Planning before concrete execution and retains the explicit ordered File Update Plan only when that separate active route is requested/useful;
- root/reusable navigation and responsibility owners expose the new Workspace Planning family and optional Model semantic role;
- the practical collect-Ideas example demonstrates the new UC-centric output contract;
- no duplicate `workspace-use-case-model.md`, Application Planning registry change, generic Workspace Domain/Slice peer UCs, File Update retirement, new parallel-work scope, commit or push is introduced.

**Rationale:** move planning earlier from Ideas/files to useful-result ownership and complete vertical UC realization, while reusing current generic UC/Architecture authorities and minimizing new shared coordination surface.

### LOG-DOC-017 — ReviewDiff correct Workspace planning target boundaries

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `d70d352a-e364-4798-8dab-910f14eaba49`, package `1379cdb4-b362-4147-96fe-1babfe6b848e`  

**Material Findings / Selected Corrections:**
- keep `WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md` Workspace-UC-specific rather than mixing the Workspace template with Application Scenario grouping; `собери идеи` remains the orchestration route that branches to existing Application Planning owners when actor-visible behavior is in scope;
- activate `UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY` only when coherent multi-UC boundaries/relations/topology are themselves the independently useful result; a cross-cutting Idea that merely affects several independent UCs does not automatically trigger topology review;
- strengthen Target semantic-state wording so a sufficiently reviewed changed/new primary workflow includes its complete planned future semantic body rather than a `may`/`nearly literally` approximation or implementation-time TODO;
- make Establish/Change/Topology registry results truly proportional: Step 1 is always the selected UC target, while Step 2 and Step 3 meaning appear only when those depths are selected/reviewed.

**Resulting Current Meaning:** the applied UC-centric Workspace Planning foundation remains selected; the correction narrows Workspace/Application ownership, topology activation and target-completeness/proportional-depth wording without changing the Direction, fundamental UC split, Step-1/2/3-in-one-UC model, Architecture reuse, command permissions or File Update retirement boundary.

### LOG-DOC-018 — Apply Workspace planning ReviewDiff corrections

**Type:** APPLIED  
**Applied From:** `LOG-DOC-017`  
**ChangeSet:** `d70d352a-e364-4798-8dab-910f14eaba49`  
**Package:** `e11ef3c8-5ca5-4d2d-a21b-882ef9bc80ba`  

**Target-State Result:** after successful Apply of this package:
- the Workspace planning template is Workspace-UC-specific; Application Scenario planning continues through existing Application Planning owners while `собери идеи` may orchestrate both branches;
- topology review activates only for a real independently useful multi-UC boundary/relationship/topology concern rather than every cross-cutting Idea;
- sufficiently reviewed changed/new primary workflows require a complete planned future semantic body, preserving `Current`, `Target` and `Transition` as separate projections with no implementation-time semantic gap;
- Establish, Review/Change and Topology registry result contracts include Step-2/Step-3 material only when those depths are actually selected/reviewed;
- all other meaning from `LOG-DOC-014` through `LOG-DOC-016` remains unchanged.

**Rationale:** remove four semantic drifts found by ReviewDiff while preserving the selected UC-centric architecture and keeping the correction local to reusable Workspace Planning owners.

### LOG-DOC-019 — Align current documentation after UC-centric Workspace planning

**Type:** ACTION  
**Source:** checked consistency review of local repository snapshot `391fc4832ff7f166d2ff07397a5b1f9ebba5f0ab` after the UC-centric Workspace Planning ChangeSet  

**Selected Corrections:**
- distinguish Idea-local Current Conclusions / Current Selected Variants and the integrated `Current Plan Snapshot` from final `Current Overall Conclusions`, so `собери идеи` can present Q/R/P early without implying final conclusions exist before UC/Scenario integration;
- make Documentation Workbench `Planning Meaning To Repository` consume current Workspace Planning proportionally and allow a complete Step-3 exact realization/file surface to hand directly to the next authorized route; an ordered File Update Plan remains active but is no longer a mandatory intermediate layer;
- narrow Architecture Planning authority: generic Workspace UC identity/contract stays in the reusable registry methodology, canonical establish/change/topology planning stays in Workspace Planning, while Architecture Planning owns architecture-input discovery/candidates, Work Paths and Change Pressure;
- resolve the Architecture Planning index contradiction by recognizing `UC-PLAN-ARCH-WORKSPACE-USES` as the active architecture-input discovery UC and routing canonical UC lifecycle questions out to Workspace Planning;
- synchronize the stale local Helper `собери идеи` insertion with the current direct command contract;
- remove the obsolete `давай архив` command-format refinement and stale archive-source reminder from the reusable Tampermonkey projection workflow so it matches the current package-producer command;
- restore Planning Helper semantic registry parity by projecting `DIR-PLAN-WORKSPACE` and its three fundamental Workspace Planning UCs, adding the Workspace registry to parity tests and rebuilding the generated userscript.

**Boundary:** this correction does not change Replacement Package App files/semantics, does not retire File Update Plan, does not implement unrelated unrealized Ideas and does not perform broad legacy registry-shape normalization.

**Rationale:** remove contradictions between already-active owners/projections after UC-centric Workspace Planning became current, without reopening separate future design work.

### LOG-DOC-020 — Apply UC-centric planning consistency cleanup

**Type:** APPLIED  
**Applied From:** `LOG-DOC-019`  
**ChangeSet:** `3fc169b2-413e-42cd-8557-c7231eff05de`  
**Package:** `435db6d8-06d6-438d-abcf-65fded5ab627`  

**Target-State Result:** after successful Apply of this package:
- generic Idea review and integrated `собери идеи` output use one coherent baseline/order contract: local Idea conclusions feed an integrated Current Plan, Q/R/P may be displayed early, and final Current Overall Conclusions follow useful-result integration;
- Documentation Workbench can proceed from reviewed UC-centric Step 3 directly to an authorized repository/package route when the exact realization surface is sufficient, while keeping the ordered File Update Plan as an explicit optional capability;
- Architecture Planning consumes canonical Workspace UCs and owns architecture-input candidate discovery/path/change-pressure meaning without becoming a second canonical UC identity/lifecycle authority; its README, responsibility map, registry and discovery workflow agree on `UC-PLAN-ARCH-WORKSPACE-USES`;
- the local `собери идеи` helper insertion reflects the current command contract;
- reusable Tampermonkey projection rules no longer advertise the retired `давай архив` refinement or unconditional attached-archive source rule;
- Planning Helper semantic projections include `DIR-PLAN-WORKSPACE` plus Establish/Change/Topology Workspace Planning UCs, parity tests include the Workspace Planning registry, all Helper tests pass and the generated userscript matches source/command catalog;
- no Replacement Package App path is changed and previously deferred/unselected future Ideas remain outside this ChangeSet.

**Rationale:** make active current documentation/projections agree with the already-selected UC-centric methodology and current direct command contracts.


### LOG-DOC-021 — ReviewDiff correct Planning Helper Direction parity

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `3fc169b2-413e-42cd-8557-c7231eff05de`, package `435db6d8-06d6-438d-abcf-65fded5ab627`  

**Material Finding / Selected Correction:** the consistency-cleanup package restored `DIR-PLAN-WORKSPACE` and the Workspace Planning UCs in Planning Helper projections, but the active root `DIR-PLAN-ARCHITECTURE` remained absent from `DIRECTION_DEFINITIONS` even though Architecture Planning UCs were already projected. The selected correction is to add the missing Architecture Direction and replace the one-off Workspace Direction test with generic root-Direction registry parity so this class of drift fails verification.

**Resulting Current Meaning:** Planning Helper semantic Directions are projections of every current root Direction Registry entry exactly once; canonical registries remain authority, and no Helper-only semantic Direction is permitted. Existing Workspace/Architecture semantic ownership, UC boundaries, command behavior and Replacement Package App scope remain unchanged.

### LOG-DOC-022 — Apply Planning Helper Direction parity correction

**Type:** APPLIED  
**Applied From:** `LOG-DOC-021`  
**ChangeSet:** `3fc169b2-413e-42cd-8557-c7231eff05de`  
**Package:** `c72eec6e-9a21-4bac-99af-e3e921ed73b7`  

**Target-State Result:** after successful Apply of this package:
- Planning Helper projects `DIR-PLAN-ARCHITECTURE` alongside every other current root Direction;
- semantic navigation tests compare `DIRECTION_DEFINITIONS` against the canonical root Direction Registry and still enforce complete Use-Case parity/exact-case sources;
- reusable Tampermonkey projection methodology explicitly states parity for both root Directions and canonical Use Cases;
- the generated userscript is rebuilt from the corrected source and the full Helper verification passes with 88 tests;
- no Workspace/Architecture semantic owner, Documentation Workbench behavior, command contract or Replacement Package App file is otherwise changed.

**Rationale:** close the one remaining active Helper projection inconsistency from the UC-centric consistency cleanup and prevent recurrence through registry-wide Direction parity verification.

### LOG-DOC-023 — Review UC/Scenario semantic discoverability consistency

**Type:** ACTION  
**Source:** checked current local snapshot `317eb792a13c59b67b8904d1d77695ae7f354080` after the prior UC-centric consistency ChangeSet was approved  

**Selected Corrections:**
- replace the residual universal `everything useful → Use Case` discoverability wording with the current semantic boundary: Workspace/methodology capabilities route through Use-Case Registries/UCs, while Application actor-visible behavior routes through Scenario Catalogs/Scenarios;
- align root/planning navigation, command-system global wording, AI working contract, reusable architecture/discoverability principles, responsibility placement checks, Direction contract/template and repository coverage review around one `Direction → applicable primary semantic registry → semantic entry → canonical owner` route;
- broaden `UC-DOC-REVIEW-COVERAGE` from Use-Case-only wording to semantic coverage while keeping its stable ID and review-only responsibility; Application Scenario-content defects hand to current Application Planning/Scenario owners rather than being absorbed by documentation registry maintenance;
- keep `UC-DOC-PLAN-UPDATE` separate from the explicit `план файл-обновление` command by removing that command from its `Related command` field; the ordered File Update Plan remains an optional downstream handoff owned by `UC-DOC-PLAN-FILE-UPDATE`;
- synchronize the Testing Planning registry with the current reusable UC contract by making `DIR-PLAN-TESTING` explicit on each entry without performing broad registry-shape migration elsewhere;
- replace the stale `собери идеи` practical example with a current-baseline hypothetical example that demonstrates UC-centric planning without presenting the already-applied UC-centric/File-Update transition as future work;
- update active helper-library prompts so Linked Notes bootstraps through its current Scenario Catalog/Scenarios, Application Planning no longer teaches a retired Application-Use-Case alias, and Commands onboarding follows the current `давай архив` producer owner/permission route;
- synchronize the Planning Helper projection label/description for `UC-DOC-REVIEW-COVERAGE` and rebuild the generated userscript.

**Boundary:** this ChangeSet does not change `planning/documentation/tools/replacement-package-app/**`, does not retire File Update Plan, does not implement unrelated unrealized Ideas, and does not perform broad legacy registry-shape normalization.

**Rationale:** make active repository navigation, coverage methodology, templates, examples and helper projections consistently express the already-selected UC/Scenario boundary rather than preserving older universal-Use-Case assumptions.

### LOG-DOC-024 — Apply UC/Scenario semantic discoverability consistency cleanup

**Type:** APPLIED  
**Applied From:** `LOG-DOC-023`  
**ChangeSet:** `7e35d0db-274f-4da9-9ebb-319e965cabae`  
**Package:** `bd53ee52-46b2-4c32-b631-ab9b21bcc51c`  

**Target-State Result:** after successful Apply of this package:
- natural repository navigation resolves a Direction and then the correct primary semantic registry: Workspace/methodology → Use-Case Registry, Application → Scenario Catalog;
- reusable discoverability/coverage owners detect missing Workspace/methodology UCs and missing Application Scenarios as distinct coverage defects and route correction to the appropriate semantic owner;
- Direction contracts/templates use Direction-type-appropriate child semantic entries instead of requiring `Child Use Cases` for every Direction;
- `UC-DOC-REVIEW-COVERAGE` is projected as `Review Repository Navigation / Semantic Coverage`, while `UC-DOC-PLAN-UPDATE` no longer claims the separate `план файл-обновление` command;
- Testing Planning entries explicitly expose `DIR-PLAN-TESTING` as their Parent Direction;
- the current `собери идеи` example and active helper-library bootstrap/onboarding prompts no longer teach already-retired or already-applied semantics;
- Planning Helper source/generated projection reflects the current coverage-UC name/meaning and the full Helper verification passes with 88 tests;
- no Replacement Package App path is changed.

**Rationale:** remove the remaining active UC/Scenario discoverability drift without reopening separate product/application work or future methodology Ideas.

### XREF-DOC-008 — Planning Helper editable real Commands and prompt governance

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/tools/tampermonkey/chat-command-palette/action-log.md`  
**Entry:** `LOG-PH-007`  
**Reason:** reusable command-routing/planning semantics, prompt-maintenance UC/workflow, Tampermonkey projection methodology and reusable Helper overview participate in the same Planning Helper command-workspace transition; full rationale and applied target state are owned by the canonical Helper log.

### XREF-DOC-009 — Planning Helper residual command-workspace correction

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/tools/tampermonkey/chat-command-palette/action-log.md`  
**Entry:** `LOG-PH-009`  
**Reason:** reusable Tampermonkey overview/helper-library summaries and the generated userscript participate in the same ReviewDiff correction for complete `Reload GitHub` disclosure and current Commands/Prompts boundaries; full finding/rationale and applied target state are owned by the canonical Helper log.

### LOG-DOC-025 — Review prompt/helper-library consistency after editable Commands transition

**Type:** ACTION  
**Source:** holistic consistency review of selected local snapshot `070d02a599582a612d7e39acedba5bdd66bbe181` after the editable-real-Commands and ReviewDiff correction packages  

**Selected Corrections:**
- expose `prompt-maintenance-workflow.md` and the already-active `reviewable-agent-output-and-commands-workflow.md` in the reusable Documentation Core Owners index so current UCs route naturally to their real owners;
- rename `UC-DOC-MAINTAIN-PROMPT` from `Create / Review Reusable Prompt` to `Create / Maintain Reusable Prompt` and align its purpose with create/review/change while preserving the same stable UC ID and non-authority boundary;
- make the three light/bootstrap prompts `Commands onboarding`, `реф обьекты бутстр` and `бутстр реюзабл документация` report exact checked paths plus `FULL` / `DEEP` / `TARGETED` / `ROUTING ONLY` depth, and surface only material conflicts/ambiguities/questions actually found without turning light bootstrap into broad audit;
- clarify Commands onboarding that `planning/helper-library/commands/*.helper-command.md` is legacy compatibility insertion text rather than a current command-authoring surface;
- remove the byte-identical duplicate `gdoc-1nba1pe.prompt.md`, retaining the more descriptive `gdoc-991hn9.prompt.md`, and remove the tracked `Clipboard freeze test` legacy helper-command artifact;
- strengthen reusable prompt-maintenance rules and Helper corpus verification so accidental exact duplicate active prompt bodies are rejected in future;
- synchronize the Planning Helper semantic projection label, patch version and generated userscript with the corrected prompt-maintenance identity.

**Boundary:** this cleanup does not change Planning Command permissions/CRUD behavior, does not remove legacy helper-command compatibility support in the runtime, does not broaden bootstrap reads beyond their selected profiles, and does not touch `planning/documentation/tools/replacement-package-app/**`.

**Rationale:** finish non-blocking discoverability/library cleanup found by the full current-snapshot review while preserving the selected Commands/Prompts authority model.

### LOG-DOC-026 — Apply prompt/helper-library consistency cleanup

**Type:** APPLIED  
**Applied From:** `LOG-DOC-025`  
**ChangeSet:** `5a94619f-95a6-4b9f-8439-368bdc431798`  
**Package:** `fdd1940b-9834-49fd-bd25-5ce0d3e94318`  

**Target-State Result:** after successful Apply of this package:
- reusable Documentation Core Owners directly expose prompt maintenance and reviewable-agent-output/command response behavior;
- `UC-DOC-MAINTAIN-PROMPT` is the stable `Create / Maintain Reusable Prompt` capability and the Helper projection uses the same current label;
- the three selected bootstrap prompts provide compact checked-file/depth evidence and material inconsistency/question reporting proportional to their profile;
- the active prompt library has no accidental byte-identical duplicate between the two gdoc audit prompts, and the test-only Clipboard freeze helper record is no longer tracked;
- prompt-maintenance methodology explicitly rejects accidental duplicate active prompt records, and automated corpus verification enforces unique exact prompt insertion text;
- Planning Helper `0.26.2` passes its full verification suite and the generated userscript matches modular source/current command catalog;
- no Replacement Package App path changes.

**Rationale:** keep reusable prompts inspectable, non-authoritative and drift-resistant without expanding ordinary command or bootstrap responsibilities.

### LOG-DOC-027 — ReviewDiff correct exact-duplicate prompt invariant

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `5a94619f-95a6-4b9f-8439-368bdc431798`, package `fdd1940b-9834-49fd-bd25-5ce0d3e94318`  

**Material Finding / Selected Correction:** the new prompt-maintenance workflow allowed an explicitly intentional byte-identical prompt duplicate for a distinct interaction purpose, while the selected automated corpus invariant rejects every duplicate exact `item.text`. Keep the stricter tested invariant: byte-identical active prompt bodies have exactly one current record; only materially overlapping but non-identical prompts may coexist when their distinct interaction purpose is explicit. No schema escape hatch or test change is needed.

**Boundary:** this correction changes only reusable prompt-maintenance wording/log history; it does not change Helper runtime, prompt bodies, command behavior, test behavior, package-app scope or permissions.

**Rationale:** make methodology and automated enforcement state the same exact duplicate rule.

### LOG-DOC-028 — Apply exact-duplicate prompt invariant correction

**Type:** APPLIED  
**Applied From:** `LOG-DOC-027`  
**ChangeSet:** `5a94619f-95a6-4b9f-8439-368bdc431798`  
**Package:** `6cc9bdbc-66e8-4b93-b361-610ee3127d26`  

**Target-State Result:** after successful Apply of this package, reusable prompt maintenance requires one current record for every byte-identical active prompt body, while materially overlapping non-identical prompts may coexist only for an explicit distinct interaction purpose; the existing Helper corpus test already enforces the exact-body uniqueness invariant and remains unchanged.

**Rationale:** close the sole ReviewDiff inconsistency without reopening the selected prompt/library cleanup.

### LOG-DOC-029 — Directed accumulating SDS/UCDS planning and AI reviewability

**Type:** IDEA REVIEW  
**Source:** current planning discussion and selected clarifications covering durable accumulation of `собери идеи` results, proportional Application/Workspace planning profiles, reviewable AI output, directed planning dependencies, execution order and recheck quality  

**Current Conclusions:**
- material AI planning/development answers expose complete `Key Points` and a separate `Review Priority` (`Critical / High / Normal / Low`) based on blast radius/correction cost/cross-owner effect and material current change pressure rather than confidence;
- ordinary material answers perform built-in Focus Recheck plus Direction/Integration Recheck before return; `крит` remains optional explicit adversarial review, while the legacy `обс` repository Use Case is retired and its command remains hidden compatibility only;
- planning normally follows upstream semantic dependency → downstream realization, while a provisional whole picture may be used for discovery and genuine downstream evidence may explicitly flow back to the earliest affected upstream owner; frequent backflow is treated as a planning-quality signal;
- repeated `собери идеи` work updates one clearly selected current plan and the real semantic owners instead of accumulating a transient command-result transcript or parallel reusable Goal Map;
- Workspace/documentation planning may use Mini/Modular **UCDS** (`Use Case → Domain/Rules → Vertical Slice/Realization`) with the same semantic correctness at either physical depth;
- Application planning may use Mini/Modular/Full **SDS** (`Scenario → Domain/Rules → Slice Strategy/Slices`); Full reuses the existing rich Scenario/Domain/Slice detailed profile, while Mini/Modular may plan a bounded change rather than the whole application;
- split a compact plan when scan/review cost, independent change cadence, Variants or shared cross-scenario meaning justify it; more than roughly five Scenarios or more than roughly three large Scenarios is a useful heuristic, not ontology;
- shared Ideas are defined once and referenced from affected units with local impact; execution order is a current projection distinct from semantic dependency direction and may express parallel groups/dependencies and application release/version grouping;
- pre-implementation UCDS/SDS planning is complete through Scenario/UC, Domain/Rules and Slice/Realization planning; downstream Step 4 is realization feedback plus semantic review of the actual change, with upstream correction only for genuine new evidence/contradiction/infeasibility;
- the reusable Goal Map owner/Use Case is retired because its useful current-plan function is covered by the accumulating UCDS/SDS representation and execution-order projection; Dashboard/product-specific Goal Maps remain separate application concepts;
- no new generic `Current Planning Workspace`, Planning Draft, Planning Item or other parallel semantic owner is introduced.

**Questions / Risks / Problems:**  
No material unresolved issue blocks this selected transition. Exact physical Mini/Modular project layouts remain proportional and project-local; the profile examples are not mandatory directory ontology.

### LOG-DOC-030 — Apply directed SDS/UCDS planning and AI reviewability transition

**Type:** APPLIED  
**Applied From:** `LOG-DOC-029`  
**ChangeSet:** `89c6d385-fcab-4142-b83c-e89e1fbda34d`  
**Package:** `d0ac05e6-e115-4cfa-a32e-1639d1420280`  

**Target-State Result:** after successful Apply of this package:
- reusable AI working/reviewability semantics own Key Points, Review Priority, upstream→downstream planning direction, built-in focus/integration recheck and evidence-driven backflow; former answer Levels 1/2/3 and the current `обс` Use Case are retired;
- root planning keeps the legacy `обс` command definition hidden for compatibility while `крит` remains the explicit adversarial review route;
- `собери идеи` updates an existing selected current plan when present and routes Workspace/documentation planning through proportional UCDS and Application planning through proportional SDS without creating a command-result ledger;
- Workspace planning exposes Mini/Modular UCDS plus execution-order and Step-4 realization-feedback guidance while preserving existing UC/Architecture authorities;
- Application planning exposes Mini/Modular/Full SDS, shared-Idea and execution-order/version guidance while preserving Scenario/Domain/Slice ownership;
- reusable Goal Map semantics/Use Case/file are retired and current Application Direction/responsibility/navigation no longer route to them;
- Planning Helper semantic projections remove the retired current UCs, retain the hidden legacy command in the command catalog, rebuild the generated userscript and keep registry-parity verification current;
- all affected registered scope logs carry this target-state transition or a cross-scope reference, and the package is based on the explicitly selected local repository snapshot.

**Rationale:** keep AI-driven planning cumulative, reviewable and dependency-directed while allowing compact-to-detailed documentation growth without weakening semantic correctness or creating duplicate current-plan authorities.

### LOG-DOC-031 — ReviewDiff correct SDS/UCDS profile routing, planning state and example coverage

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `89c6d385-fcab-4142-b83c-e89e1fbda34d`, package `d0ac05e6-e115-4cfa-a32e-1639d1420280`  

**Material Findings / Selected Corrections:**
- current examples still advertised the retired Level-2 response model and reusable Goal Map as current, while the collect-Ideas practical example still demonstrated the pre-UCDS output contract; replace the Level-2 example with a current Key-Points/Review-Priority example, park Goal-Map examples in the index and update the collect-Ideas example to the accumulating UCDS contract;
- the new Mini/Modular/Full SDS profile family was not fully routed: Application read order still pointed Mini/Modular guidance at the old rich-only profile, generic responsibility navigation omitted the new family, and `собери идеи` did not list the SDS family among its reusable owner files; route all three surfaces to `profiles/sds-planning-profiles.md`;
- Mini/Modular UCDS removed explicit Step-1/2/3 planning state even though directed planning needs to distinguish reviewed upstream meaning from partial/not-selected downstream depth; restore a compact Planning State projection and add the same proportional guidance to SDS;
- UCDS was ambiguously expanded as `U` + `C/D` + `S`; define it consistently as `UC` (Use Case) + `D` (Domain/Rules) + `S` (Slice/Vertical Realization);
- the reusable Documentation README accidentally dropped the explicit ReviewDiff semantic-owner routing line while Step 4 now relies more heavily on semantic ReviewDiff; restore that navigation boundary.

**Resulting Current Meaning:** the directed accumulating SDS/UCDS + AI reviewability architecture from `LOG-DOC-029`/`LOG-DOC-030` remains selected. Corrections are integration/coverage fixes only: no Goal Map revival, no answer-level revival, no new planning owner, and no change to Step-4 or upstream→downstream dependency semantics.

### LOG-DOC-032 — Apply SDS/UCDS ReviewDiff integration corrections

**Type:** APPLIED  
**Applied From:** `LOG-DOC-031`  
**ChangeSet:** `89c6d385-fcab-4142-b83c-e89e1fbda34d`  
**Package:** `90cabe4e-0690-4059-ac1b-2771c65c08ce`  

**Target-State Result:** after successful Apply of this correction package:
- reusable examples expose current Key Points/Review Priority without Level 1/2/3, Goal-Map examples are parked rather than current, and the collect-Ideas practical example demonstrates accumulating Mini UCDS with explicit Planning State;
- Mini/Modular/Full SDS profile-family routing is discoverable from Application read order, reusable responsibility navigation and the `собери идеи` command owner route;
- Mini/Modular UCDS and SDS can explicitly project which upstream/downstream planning depths are reviewed, partial or not selected, while Execution Order remains a separate realization-order projection;
- UCDS is consistently read as `UC` → `D` → `S`;
- reusable Documentation navigation again routes semantic ReviewDiff to `review-diff-review-workflow.md`;
- Planning Helper is rebuilt from the corrected command catalog and all affected scope logs reference this correction.

**Rationale:** close the concrete ReviewDiff integration gaps without changing the selected directed-planning architecture or introducing duplicate semantic authorities.

### LOG-DOC-033 — ReviewDiff restore collect-Ideas default depth and sync legacy insertion

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `89c6d385-fcab-4142-b83c-e89e1fbda34d`, correction package `90cabe4e-0690-4059-ac1b-2771c65c08ce`  

**Material Findings / Selected Corrections:**
- the directed/UCDS rewrite accidentally removed the established `собери идеи` default depth from the canonical command and Workspace Planning principles: once a documentation/Workspace UC boundary is sufficiently grounded, Step 1 + Step 2 should normally be reviewed; Step 1 may stand alone while the target UC picture remains materially unresolved; Step 3 is included when explicitly requested or realization is sufficiently grounded/useful;
- the visible legacy Planning Helper insertion for `собери идеи` remained active with the older compact reminders, so synchronize that compatibility surface with current accumulating-plan, UCDS/SDS, Planning State, directed-planning, execution-order/version and reviewability guidance while keeping the direct command definition as authority.

**Resulting Current Meaning:** the selected accumulating SDS/UCDS + AI reviewability architecture remains unchanged. Planning State still reports reviewed/partial/not-selected depth, Execution Order still reports realization order, and the restored default-depth rule only specifies how far `собери идеи` normally reviews Workspace/documentation planning in one invocation.

### LOG-DOC-034 — Apply collect-Ideas depth and legacy-insertion correction

**Type:** APPLIED  
**Applied From:** `LOG-DOC-033`  
**ChangeSet:** `89c6d385-fcab-4142-b83c-e89e1fbda34d`  
**Package:** `9e1b397e-3383-4101-87ef-1aafaa1e3c0d`  

**Target-State Result:** after successful Apply of this correction package:
- the canonical `собери идеи` route and Workspace Planning principles again state the normal documentation/Workspace planning depth: Step 1 + Step 2 once the UC boundary is grounded, Step 1 alone only while the UC picture remains materially unresolved, and Step 3 when requested or sufficiently grounded/useful;
- this review-depth default remains subordinate to upstream→downstream stability rather than bypassing it;
- the active legacy helper-library `собери идеи` insertion is synchronized with current accumulating-plan, UCDS/SDS, Planning State, execution-order/version and Key-Points/Review-Priority reminders while still routing to the direct command as source of truth;
- Planning Helper is rebuilt from the corrected command catalog and full verification passes 92/92;
- affected Planning Root and Planning Helper scope logs reference this correction.

**Rationale:** close the remaining ReviewDiff regressions without changing the selected SDS/UCDS ontology, Goal-Map retirement, reviewability model or Step-4 lifecycle.

### LOG-DOC-035 — UC/Scenario-first planning and methodology integration

**Type:** IDEA REVIEW / LATER CLARIFICATION INTEGRATION  
**Source:** current planning discussion after the directed SDS/UCDS planning packages; includes material later clarifications and full UC/Idea/Q/R/P consistency review  

**Current Conclusions:**
- primary planning is hard-locked to Real-Life Need/situation → Workspace UC or Application Scenario → Current→Target meaning → downstream dependencies/realization; a FIND/Q/R/P queue cannot be the planning root;
- Q/R/P is only an owner-attached unresolved/adverse delta with explicit provenance and affected Current/Target meaning; obvious consequences are integrated instead of preserved as ceremonial findings;
- `Review Order` is a derived lens over attached findings in the current semantic scope, never a global work queue;
- ordinary chat text is the control plane for scope/depth/lens/redirection; no persistent Focus/H0-H1-H2 ontology and no command per modifier;
- Key Points remain a cross-cutting AI Reviewability projection; `UC-REPO-AUDIT-REVIEW`, `UC-REPO-REFINE-CURRENT-PLAN`, `UC-REPO-REVIEW-PLANNING-FINDINGS` and `UC-DOC-REVIEW-CURRENT-CONSISTENCY` have independently useful reusable results and are selected;
- reuse-first means reuse existing owners when they already own the useful result and extract a supporting UC when its result is independently useful/reusable; simplification alone is not a closure basis;
- dedicated `UC-PLAN-ARCH-DISCOVER-WEUC` is selected and remains distinct from broad `UC-PLAN-ARCH-WORKSPACE-USES`; invocation is proportional/manual/evidence-driven;
- Documentation dependency management uses the selected establish/configure-review/review-dependents/exact-meaning/coverage family; semantic dependency intent precedes Linked Notes realization;
- Application `UC-PLAN-REALIZATION` may provide bounded comparative evidence before final Domain selection when material without becoming Domain authority;
- Testing Planning uses a lightweight Testing Plan + Practical Acceptance contract while keeping planned proof, implemented tests and executed evidence distinct;
- Idea/provenance coverage was checked against current UCs; every UC needs real provenance but not a synthetic one-to-one Idea record.

**Questions / Risks / Problems:** no active material Q/R/P remains for this selected methodology target. Future questions are created only when a concrete owner/current planned state acquires a material unresolved/adverse delta.

**Realization:** the selected Step-3 package updates current reusable owners/registries/templates and adds the missing reusable owner/template files. Historical logs remain historical; current semantic owners carry the new truth.

### LOG-DOC-036 — Apply UC/Scenario-first planning and methodology integration

**Type:** APPLIED  
**Applied From:** `LOG-DOC-035`  
**ChangeSet:** `62b89da9-51ad-4492-8c6f-e27415cb421f`  
**Package:** `5858bb0f-fbcb-40e8-a319-71f2db029e9c`  

**Target-State Result:** after successful Apply of this exact package:
- root/reusable registries expose the selected Progressive Review, Review Audit, Planning Findings Review and Current Semantic Consistency capabilities;
- AI working/reviewability contracts use current-target/owner-first review instead of current Focus framing;
- Idea and Workspace planning establish Need/provenance + UC/Scenario meaning before deriving attached Q/R/P, and Review Order is a lens;
- dedicated contextual WEUC discovery is registered with its own workflow and Architecture Pressure handoff;
- selected dependency-management UC family is discoverable through the Documentation registry and one reusable owner;
- Application Realization supports bounded pre-Domain comparative evidence while Domain keeps semantic authority;
- Testing Planning exposes the lightweight Testing Plan / Practical Acceptance template and keeps planned-vs-executed evidence truth;
- registered scope logs for Planning Root and Application Planning reference this canonical transition;
- no new command ontology, generic Port layer, Focus-state framework or repository mutation beyond the declared package operations is introduced.

**Rationale:** align the repository with the accumulated current methodology plan while preserving independently useful semantic UCs and removing Q/R/P-first process drift.

### LOG-DOC-037 — ReviewDiff correct package identity and dependency owner boundary

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `62b89da9-51ad-4492-8c6f-e27415cb421f`, applied package `81749fe8-1e1a-4fb2-bd7d-1207058d5e9d`  

**Material Findings / Selected Corrections:**
- `LOG-DOC-036` recorded the superseded pre-exact-base package ID `5858bb0f-fbcb-40e8-a319-71f2db029e9c`, while the exact-base replacement package actually applied for this ChangeSet was `81749fe8-1e1a-4fb2-bd7d-1207058d5e9d`; preserve the historical record and correct the cumulative history through this later ReviewDiff entry rather than rewriting old knowledge;
- `planning/documentation/use-case-registry.md` correctly registered the full selected dependency-management UC family, but `review-dependency-planning-workflow.md` still declared only `UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES` as its owner/purpose and the Documentation README still exposed only that narrow branch; broaden the existing shared owner/navigation to the already selected family rather than create another UC or owner.

**Resulting Current Meaning:** the UC/Scenario-first methodology transition remains selected unchanged. Dependency management is one reusable family owned by `review-dependency-planning-workflow.md`, with Configure Review Dependencies as one branch/result. No new Q/R/P remains.

### LOG-DOC-038 — Apply ReviewDiff correction for dependency owner and package history

**Type:** APPLIED  
**Applied From:** `LOG-DOC-037`  
**ChangeSet:** `62b89da9-51ad-4492-8c6f-e27415cb421f`  
**Package:** `7d46ae70-9f16-491f-8bd2-95e0fb1ec70d`  

**Target-State Result:** after successful Apply of this correction package:
- the dependency workflow header/purpose semantically owns the full already-registered dependency-management UC family rather than only Configure Review Dependencies;
- Documentation navigation exposes that same family and keeps Linked Notes as downstream mechanism rather than semantic owner;
- cumulative Action Log explicitly records that the exact-base package actually applied before this correction was `81749fe8-1e1a-4fb2-bd7d-1207058d5e9d`, while preserving `LOG-DOC-036` as historical text;
- no new semantic UC, Q/R/P, command ontology or cross-scope change is introduced.

**Rationale:** make the reviewed repository transition semantically self-consistent without rewriting historical records or expanding the selected methodology.

### XREF-DOC-010 — Planning Helper Direction-nested Commands / Use Cases

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/tools/tampermonkey/chat-command-palette/action-log.md`  
**Entry:** `LOG-PH-011`  
**Reason:** the generated `planning/documentation/tools/tampermonkey/chat-command-palette.user.js` artifact belongs to the reusable-documentation parent scope while the Helper source/docs/tests own the behavior change; full rationale and APPLIED target state remain in the canonical Planning Helper log.


### XREF-DOC-011 — Planning Helper local Delete, seed catalogs and branch consistency

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/tools/tampermonkey/chat-command-palette/action-log.md`  
**Entry:** `LOG-PH-013`  
**Reason:** reusable reviewability wording and the generated `planning/documentation/tools/tampermonkey/chat-command-palette.user.js` artifact participate in the same Helper correction; full user clarification, ReviewDiff findings and APPLIED target state remain in the canonical Planning Helper log.
