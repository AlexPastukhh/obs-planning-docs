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

### LOG-DOC-039 — Complete callable Use-Case projection and practical testing plan

**Type:** IDEA CLARIFICATION / INTEGRATED REVIEW  
**Source:** explicit user clarification after the Planning Helper local-delete/seed package and review of the Testing Planning realization  

**Current Conclusions:**
- Testing Plan / Practical Acceptance has an independently useful result and must therefore be a current semantic Use Case rather than only a template/shared contract; select `UC-PLAN-TEST-PLAN — Plan Practical Testing / Acceptance`;
- Test Design owns how one selected behavior is best proved, Practical Test Plan composes selected proofs into a real operated human/AI/E2E acceptance pass or campaign, and Coverage owns review of actual executed/current evidence; planned proof remains distinct from executed evidence;
- every current canonical Use Case from every current `planning/**/use-case-registry.md` must be visible in Planning Helper `Use Cases`; Helper parity must be registry-driven and build-verified rather than maintained as a curated manual list;
- every current canonical UC is independently useful enough to support manual invocation. When a bespoke Planning Command already maps to that UC, reuse it; otherwise expose one generated thin invocation command routed through the generic registered `use_case.invoke` command and exact current UC registry/owner;
- generated UC invocation rows are Helper projections only: they are not one repository command file per UC and never become semantic authority;
- local Delete of a generated UC invocation command hides only that command row; it does not hide/delete the corresponding Use Case or mutate any canonical registry;
- Mini/Modular/Full SDS and Mini/Modular UCDS remain planning representation profiles, not fake Use Cases merely to appear in Helper.

**Questions / Risks / Problems:** none. The selected route follows the existing independent-usefulness rule and avoids both a manually synchronized UC subset and a repository-file explosion of one command file per UC.

### LOG-DOC-040 — Apply callable Use-Case parity and practical testing plan

**Type:** APPLIED  
**Applied From:** `LOG-DOC-039`  
**ChangeSet:** `a73fe7e8-5004-4363-9a86-d91a4e2fd58b`  
**Package:** `058d09c3-5a6e-4df9-a80e-cf948243cd71`  

**Target-State Result:** after successful Apply of this package:
- Testing Planning registers `UC-PLAN-TEST-PLAN` with `practical-testing-plan-workflow.md` as its owner and routes the existing Testing Plan / Practical Acceptance template through that UC;
- Planning Helper `0.29.0` discovers every current canonical UC directly from all current Use-Case registries at build time and generates exact `semantic-projections.js` + `seed/use-cases.json` parity; the current package contains 70 current UC projections including the new Practical Testing Plan UC;
- one hidden generic repository command `use_case.invoke` provides the authority/routing contract for generated UC invocation rows; existing bespoke UC-linked commands are reused and every remaining current UC receives exactly one generated manual invocation row in Commands;
- generated UC invocation commands can be locally deleted without deleting/hiding the corresponding Use Case; canonical registry/owner meaning and repository files remain untouched;
- `seed/commands.json` contains the 16 current registered Planning Command definitions, while generated per-UC invocation rows remain deterministic projections derived from the UC seed rather than duplicate command files;
- Helper automated verification passes 106/106 tests and build verification checks generated userscript, registry-driven UC projection and seed catalogs against current sources;
- affected Planning Root and Planning Helper scope logs reference this canonical transition.

**Rationale:** make the Helper a complete manual entry surface over the real current UC graph while preserving canonical ownership and giving practical operated testing its own independently useful semantic route.


### LOG-DOC-041 — ReviewDiff correct direct-command classification for callable UCs

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `a73fe7e8-5004-4363-9a86-d91a4e2fd58b`, applied package `058d09c3-5a6e-4df9-a80e-cf948243cd71`  

**Material Finding / Selected Correction:**
- registry-driven UC discovery and 70/70 Helper visibility are correct, but the build mapped any `Related command` cell containing a known command alias to `commandId`; this incorrectly treated supporting wording such as `supports положняк` and `none required; собери идеи may route here` as direct bespoke invocation ownership;
- direct bespoke mapping must exist only when the `Related command` value itself starts with a concrete command alias (optionally followed by a qualifier such as `when ...`); supporting/may-route wording must not suppress the generated `use_case.invoke` row;
- restore distinct generated direct invocation rows for `UC-DOC-RECONCILE-STATUS`, `UC-PLAN-WORKSPACE-ESTABLISH-UC`, `UC-PLAN-WORKSPACE-CHANGE-UC` and `UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY`, while preserving genuine direct mappings such as `UC-PLAN-COLLECT-IDEAS → ideas.collect`, `UC-REPO-CURRENT-STATE → current_state.report` and `UC-DOC-REVIEW-DIFF → critical_review.apply`.

**Resulting Current Meaning:** every current canonical UC still has exactly one manual invocation route, but supporting/upstream commands are not mislabeled as that UC's bespoke command. The 70-current-UC registry parity, Practical Testing UC and generic `use_case.invoke` design remain unchanged. No new Q/R/P is introduced.

### LOG-DOC-042 — Apply direct-command classification correction

**Type:** APPLIED  
**Applied From:** `LOG-DOC-041`  
**ChangeSet:** `a73fe7e8-5004-4363-9a86-d91a4e2fd58b`  
**Package:** `eb0549b8-3626-4e86-a2bc-73eb879ca211`  

**Target-State Result:** after successful Apply of this correction package:
- Planning Helper `0.29.1` keeps exact 70/70 current canonical UC projection/seed parity;
- generated UC discovery classifies a registry `Related command` as bespoke invocation only when that field directly starts with a concrete current command alias; longest matching alias wins when one alias prefixes another;
- `supports ...`, `none required; ... may route here` and equivalent supporting/upstream route wording do not suppress a generated direct UC invocation row;
- `UC-DOC-RECONCILE-STATUS` and all three current Workspace Planning UCs therefore receive their own generated `use_case.invoke` command rows, while genuine direct command mappings remain bespoke and unduplicated;
- README/manual acceptance and automated regression coverage express the same boundary;
- Helper automated verification passes 109/109 tests and generated userscript/semantic projection/seed catalogs match current sources;
- no canonical UC, command definition, testing semantics, repository permission or local-delete behavior changes beyond this classification correction.

**Rationale:** preserve the selected complete manual-entry surface without conflating “a command can lead/support this UC” with “this command is the direct invocation of this UC.”


### LOG-DOC-043 — Clarify same-quality Application SDS, WEUC-driven architecture evidence and Helper favorites

**Type:** IDEA CLARIFICATION / INTEGRATED REVIEW  
**Updates:** `LOG-DOC-035`, `LOG-DOC-036`, `LOG-DOC-039`, `LOG-DOC-040`  
**Source:** current planning discussion clarifying the accumulated `собери идеи` Application plan, SDS physical profiles, architecture-driving internal evolution cases, practical testing and Planning Helper manual control

**Clarification / Resulting Current Meaning:**
- Application `собери идеи` uses one explicit Step 0–4 reasoning shape: Step 0 Why/Solution Discovery from Real-Life Need through Current Reality, alternatives, Application Concept/responsibility and Prototype; Step 1 Scenario with Scenario DATA + Behavior Items + material Requirements/Screens; Step 2 Domain Draft; Step 3 Slice Strategy/Slices plus contextual WEUC/change-path architecture evidence; Step 4 practical realization feedback through implementation, operated testing, semantic ReviewDiff and actual evidence;
- Mini, Modular/Medium and Full SDS have the same planning-quality requirement. Scenario DATA, Behavior Items and every other material reviewed meaning are preserved across profile changes; Full is richer addressability, not stronger correctness;
- Mini SDS is one accumulating Application planning file when the whole selected plan remains cheaply reviewable. Modular/Medium starts with a small useful split—normally `application-plan.md` for Step 0 + Scenario meaning, `domain-draft.md` and `slices.md`/Slice files—and grows only when independent review/change needs justify more files. Full transfers mature selected meaning into the rich stable owner topology;
- Application Step 3 must not make architecture decisions from generic future flexibility. It uses WEUC Types only as reusable classes and prefers concrete contextual WEUC Instances with likelihood/value/timing evidence, expected Workspace Change Paths and friction/fan-out/migration/verification risk; those instances feed Change Pressure/Change Axes and Architecture Decisions only to the degree supported by evidence;
- material durable WEUC instances in Full SDS may be maintained in a project-local WEUC Instance Register so later Architecture Decisions can cite the concrete driving instance/path and reassess it when the code/owner surface changes;
- frontend/server/other implementation-part plans remain parts of an integrated Slice when useful, not separate semantic Use Cases by default;
- Practical Testing is the operated-acceptance planning responsibility in Application Step 4; planning does not claim implementation or evidence already happened, and actual evidence remains separately reviewable through current testing/evidence owners;
- existing current Application/Architecture/Testing UCs remain semantic authority; no duplicate profile UCs are introduced. Important manually useful stages gain direct human-readable Planning Commands, while every remaining current UC still keeps exactly one generated or bespoke manual command route; SDS profile controls remain commands/profiles rather than fake UCs;
- Planning Helper Favorites are local presentation state: starring a Command or Use Case duplicates the same ID in a top `★ Favorites` group outside Directions while keeping the original row in its Direction. Favorites never create another semantic identity, registry owner or GitHub mutation;
- active current reusable planning docs/Helper surfaces do not use the old reusable Goal Map concept; historical action-log evidence and unrelated Dashboard/product-specific Goal Maps remain historical/product state, not current reusable planning terminology.

**Questions / Risks / Problems:** none material. Physical project-local SDS layout remains proportional; the documented Modular default is a starting shape, not mandatory folder ontology. The selected changes preserve the UC/Scenario-first root and Q/R/P admission semantics.

### LOG-DOC-044 — Apply complete Application SDS planning and Planning Helper favorites

**Type:** APPLIED  
**Applied From:** `LOG-DOC-043`  
**ChangeSet:** `063d10a8-d80e-47b3-b804-d2cde2bb3a7b`  
**Package:** `ba099b14-95cc-4869-bb63-6a4ce3fd6ffb`  

**Target-State Result:** after successful Apply of this package:
- canonical SDS profile guidance, Application planning and `собери идеи` expose the same explicit Step 0–4 Application planning-quality contract, preserve Scenario DATA/Behavior in Mini/Modular/Full, and define Mini one-file, Modular small-growing-file-set and Full rich-owner representations;
- the rich Full SDS profile contains Step 0 solution/concept/prototype planning, contextual WEUC discovery, likelihood/value/timing/change-path evidence, a durable WEUC Instance Register route, Architecture Decision evidence links and practical testing/realization feedback;
- `UC-PLAN-ARCH-DISCOVER-WEUC` explicitly supports Application SDS Step 3 and distinguishes reusable WEUC Types from contextual instances; the reusable register template tracks likelihood, timing, expected change path, friction/fan-out/migration/verification risk and related Architecture Decisions;
- Application, Architecture and Testing registries directly map important manually useful UCs to explicit Planning Commands; profile-control commands `мини сдс`, `модульный/медиум сдс` and `фулл сдс` remain representation controls rather than fake UCs; all 70 current canonical UCs remain exactly projected and manually invokable with one bespoke-or-generated route each;
- Planning Helper `0.30.0` stores local Command/Use-Case Favorites in snapshot schema v3, renders Favorites above Directions without removing normal Direction rows, preserves them across local persistence/migration and clears them when the corresponding local row is deleted;
- generated command/use-case seeds are rebuilt from 40 current Planning Command definitions and 70 current canonical UCs; generated userscript, registry-driven projections and seeds match current sources;
- current reusable planning surfaces no longer carry the old reusable Goal Map term/examples, while historical logs and unrelated product-specific Goal Maps are untouched;
- affected Planning Root, Application Planning and Planning Helper scope logs point to this canonical applied result;
- automated Planning Helper verification passes 115/115 tests.

**Rationale:** make the already-selected accumulating Application planning model explicit and callable end-to-end, base architecture choices on concrete likely change evidence, and make frequently used Commands/Use Cases immediately reachable without changing semantic ownership.

### LOG-DOC-045 — ReviewDiff correct duplicate Application SDS package logging

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `063d10a8-d80e-47b3-b804-d2cde2bb3a7b`, applied package `ba099b14-95cc-4869-bb63-6a4ce3fd6ffb`  

**Material Finding / Selected Correction:**
- the repository transition itself, SDS/WEUC semantics, direct command surface, Favorites behavior and automated verification are correct, but the produced target logs accidentally contain duplicate `LOG-DOC-043` / `LOG-DOC-044` entries plus duplicate cross-scope `XREF-016`, `XREF-007` and `XREF-014` entries;
- one duplicate `LOG-DOC-044` also carries unrelated ChangeSet/package identifiers (`61edf677-181e-4f05-b38e-4ce054b80c6c` / `ecca4c1b-d5e5-49c0-9e16-1aebc622c7c8`), so the current action-log state is not a coherent history of the actually applied package;
- consolidate the duplicated clarification/applied meaning into one `LOG-DOC-043` and one `LOG-DOC-044` using the actual ChangeSet/package identity, retain one original cross-scope reference per affected scope, and add one correction reference per affected non-canonical scope.

**Resulting Current Meaning:** the Application SDS/WEUC/commands/Favorites target state remains unchanged. This correction changes only action-log coherence and package provenance; no new semantic UC, command, profile behavior, Helper runtime behavior or Q/R/P is introduced.

### LOG-DOC-046 — Apply Application SDS package-log coherence correction

**Type:** APPLIED  
**Applied From:** `LOG-DOC-045`  
**ChangeSet:** `063d10a8-d80e-47b3-b804-d2cde2bb3a7b`  
**Package:** `b633a04e-ce30-40c1-a4ab-090601234c05`  

**Target-State Result:** after successful Apply of this correction package:
- reusable-documentation history has exactly one `LOG-DOC-043` clarification and one `LOG-DOC-044` applied record for the original `ba099b14-95cc-4869-bb63-6a4ce3fd6ffb` package;
- the unrelated duplicate ChangeSet/package identifiers are removed from this logical work;
- Planning Root, Application Planning and Planning Helper each keep one original reference to `LOG-DOC-044` and add one correction reference to `LOG-DOC-046`, with no duplicate XREF IDs;
- all previously selected Application SDS Step 0–4, WEUC evidence, manual command and Helper Favorites semantics remain unchanged.

**Rationale:** make the applied ChangeSet history internally unique and traceable without altering the already verified implementation target.

### LOG-DOC-047 — Recheck Full SDS methodology, Architecture work-cost ownership and Planning Helper durability

**Type:** IDEA CLARIFICATION / INTEGRATED REVIEW
**Source:** explicit user request to recheck the accumulated Full SDS/Enman findings, consolidate WEUC/Architecture methodology, and finish the already-selected Planning Helper GitHub-backed/order/recheck work before archive production

**Current Conclusions:**
- keep the existing Full SDS Step 0–4 architecture and same-quality Mini/Modular/Full profiles; correct gaps rather than create another planning methodology;
- Scenario remains a user/actor Need/goal/desired-result boundary; make Scenario ↔ DATA ↔ Behavior decomposition explicitly iterative because DATA/Behavior discovery may expose missing Scenario branches/results; internal implementation operations do not become Scenarios by themselves;
- Domain Discovery/Planning already owns identity/lifecycle/invariants/impossible states/consistency; add only the missing evidence-backed Value Object and Aggregate/Root/ownership bridge: owned state, explicitly outside, external Aggregate references, cross-Aggregate/application coordination, select/split/merge/reject, and `no explicit Aggregate needed`; read/query/ORM/database shape is not ownership evidence;
- Slice Planning keeps vertical useful increments and now distinguishes product/Scenario priority from recommended technical implementation sequence, implemented/delegated/later/outside behavior, cross-cutting applicability from ownership, semantic/responsibility drift from harmless provisional name/path drift, and positive plus negative/no-mutation proof obligations;
- Testing semantics do not need another methodology: Test Strategy/Test Design/Practical Test Plan belong to pre-implementation Step 3 planning when material; Step 4 executes selected proofs, records actual evidence/Coverage, runs semantic ReviewDiff and corrects upstream meaning only from real evidence;
- consolidate Architecture work-cost semantics under `architecture-planning/workspace-use-cases-and-change-pressure.md`: important Workspace UC Types/current uses, contextual WEUC Instances, Understanding/Mutation/Verification/Diagnosis/Operation costs and consumed Application runtime/Scenario costs are evidence for architecture decisions; `UC-PLAN-REALIZATION` remains owner of concrete runtime facts;
- contextual WEUC Instances are evaluated proportionally by likelihood, horizon, value/consequence, confidence, current-work overlap, preparation-now cost, deferred cost, cost-surface effects, reversibility and Architectural Tax if the future never happens; no fake numeric scoring is required;
- Product/Scenario priority is upstream input and must not be redefined by Architecture/Slice planning. AI planning may recommend a different implementation sequence or a minimum prerequisite seam when dependencies/work-cost evidence justifies it;
- architecture principles should remain tied to representative Workspace UC/WEUC decision situations rather than aesthetic rules; consumer workflows for Workspace-use discovery, WEUC discovery, path/pressure/state/decision/evolution, Slice, Full SDS and ReviewDiff use one canonical work-cost model;
- ReviewDiff performs only a proportional architecture work-cost regression check when a material implementation diff changes an important Understanding/Change/Verify or representative Runtime path; no full architecture ceremony is required for every diff;
- retain existing `собери идеи` semantics in this change. Do **not** add the proposed new Application/Scenario/Domain/Slice collect-ideas variants or custom Helper tabs yet; those depend on stabilized owners and are explicitly deferred;
- preserve the fresher Replacement Package App Scenario migration: its six `UC-RPKG-*` identifiers are legacy compatibility/navigation entries, not current canonical UCs, so Helper parity must exclude them rather than reconstruct the old capability model;
- complete the previously selected Planning Helper durability work now: Directions/Commands/Use Cases are GitHub-backed recoverable catalogs; generated repository seeds are build-verified projections, not embedded userscript authority; local snapshot schema v4 is a working cache; explicit Hard Reload restores full Direction/Command/UC catalogs plus durable order while preserving Prompts/Favorites; order is editable locally and explicitly persisted through `catalog-order.json`;
- expose direct current command routes `перепроверь` → `UC-REPO-AUDIT-REVIEW` and `изучи внутренние юзкейсы` → `UC-PLAN-ARCH-WORKSPACE-USES`; WEUC command wording emphasizes contextual instances; keep runtime command/UC/Direction semantics data-driven rather than hard-coded.

**Review / Consistency Result:**
- the useful Enman mechanisms relevant to reusable Full SDS are covered by the selected Scenario loop, Domain Aggregate/VO bridge, Slice ownership/drift/proof refinements and existing Testing proof model; Enman project-specific physical Domain/Slice file ceremony is not imported;
- semantic owners remain singular: Application owners own Scenario/Domain/Slice/runtime meaning, Testing owners own proof design/plan/coverage, Architecture owns Workspace-work/WEUC cost trade-offs, and the Helper remains projection/runtime;
- no new collect-ideas command family or Helper tab model is introduced in this transition.

**Questions / Risks / Problems:** none blocking the selected correction. Architecture cost comparison remains qualitative/evidence-backed; product priority and technical implementation sequencing stay intentionally separate.

### LOG-DOC-048 — Apply Full SDS / Architecture work-cost and GitHub-backed Helper correction

**Type:** APPLIED
**Applied From:** `LOG-DOC-047`
**ChangeSet:** `d024446d-fb19-4bb6-89c7-3dbf213d15ef`
**Package:** `543a8676-5807-4530-907f-880dfdf20992`

**Target-State Result:** after successful Apply of this package:
- Full SDS profiles and Application Direction/index consistently express Step 0 Need/Solution, iterative Scenario+DATA+Behavior, optional evidence-backed Domain/VO/Aggregate modeling, vertical Slice planning plus technical sequencing, Architecture/WEUC evidence and pre-implementation verification planning, followed by Step 4 implementation/executed evidence/Coverage/ReviewDiff feedback;
- Architecture Planning has one explicit work-cost owner and synchronized Workspace-Use, WEUC, Path, Pressure, State, Decision and Evolution consumers; Application Realization supplies runtime cost evidence without losing Application semantic authority;
- ReviewDiff can detect material actual architecture work-cost regressions proportionally;
- direct `перепроверь` and `изучи внутренние юзкейсы` routes are registered without adding new semantic UCs;
- Planning Helper `0.31.0` uses GitHub-backed generated Direction/Command/Use-Case catalogs plus a durable `catalog-order.json`, local snapshot schema v4, explicit Hard Reload GitHub, local reorder + explicit Save order GitHub, wider/resizable persisted panel geometry and existing Favorite projections;
- the generated userscript contains runtime code but no maintained current Direction/Command/UC catalog identities; current build contains 42 registered command definitions, 11 Directions and 64 current canonical UCs, and every current UC has one manual invocation route; the six `UC-RPKG-*` identifiers in the newer Replacement Package App compatibility index remain legacy navigation only and are not revived as current UCs;
- Helper automated/build verification passes 104/104 tests across 16 test files; generated userscript and repository seeds match current sources;
- existing `собери идеи` remains the only collect-ideas command in this package; proposed new collect-ideas variants/custom Helper tabs remain deferred;
- affected Planning Root, Application Planning and Planning Helper logs point to this canonical applied transition.

**Rationale:** close the reviewed Full SDS/Architecture ownership gaps and finish the already-selected Helper durability/recovery/order changes before introducing any new orchestration command family.

### LOG-DOC-049 — Consolidate shared Planning Concerns, Q/R/P grouping and Decision trace

**Type:** IDEA CLARIFICATION / INTEGRATED CONSISTENCY REVIEW
**Source:** user clarification after the Full SDS/Architecture package and a dedicated Q/R/P consistency pass

**Current Conclusions:**
- do not create a new Q/R/P Use Case. Keep `UC-REPO-REFINE-CURRENT-PLAN` and `UC-REPO-REVIEW-PLANNING-FINDINGS` as the executable/current-plan capabilities and add one shared semantic owner: `planning/documentation/planning-concerns-and-decisions-model.md`;
- the shared owner defines Planning Concern (`Question | Risk | Problem`), Concern Group, Concern Priority, Concern Category, Status, AI Comment, Answer/Evidence, optional Recommendation, selected Decision relations, residual state, retention and Area Concern Register semantics;
- group Q/R/P that materially share one resolution surface instead of presenting one Question, related Risk(s) and Problem(s) as unrelated findings. Every member retains its own Type, Priority, Concern Category, Status and owner/affected meaning;
- Concern Priority reuses existing Review Priority semantics (`P0/Critical`, `P1/High`, `P2/Normal`, `P3/Low`) rather than creating a second incompatible priority system. Concern Category is a separate extensible review/filter lens such as `semantic`, `UX/product`, `domain/data`, `architecture`, `engineering/implementation`, `testing/verification`, `integration`, `operations` or `documentation/maintainability`; Category never determines semantic ownership by itself;
- for each material active Concern/Group, AI should provide a useful `AI Comment`: what Current Plan/evidence implies, realistic options, a technical/logical preference only when supported, what cannot be inferred, and the minimum useful user question only when its answer changes the decision. AI must not invent unrecorded user Need/preference/feeling/desired UX/business priority/risk tolerance merely to close a concern;
- `Recommendation` is optional and evidence-bound. `Decision` exists only after the applicable authority/context actually selects a choice. Answer/Evidence, Recommendation and Decision remain distinct;
- generic Decision trace is many-to-many with concerns when useful: Decision/Rationale/Integrated Into/Affected Owners plus `Addresses Concerns`, `Introduced / Exposed Concerns`, related evidence/Idea/Variant and `Reconsider When`. The selected semantic decision still lives in its real Scenario/Domain/Slice/Architecture/Workspace/etc owner; the shared model does not become a second source of truth;
- active Q/R/P is not reasoning history. Answered Questions, resolved Problems and eliminated Risks leave the active projection; material answer/rationale/Decision trace may be retained when useful, while accepted/mitigated residual Risk and unresolved/deferred Problem remain active; do not preserve trivial resolved findings forever;
- one logical Concern/Group has one primary detailed storage location. Related Ideas/owners/registers reference the stable Concern/Group ID/location instead of keeping duplicate full bodies. Idea methodology continues to own Idea/Variant/evaluation semantics but no longer owns generic Q/R/P lifecycle;
- when material persistent/distributed concerns exist, maintain one logical Area Concern Register for routing/state (`ID`, title, owner, Stored At, Priority, Concern Category, Status, Decision refs/residual state). Physical placement remains contextual: the current profile/workflow/command may keep the register inline in one Application/Domain/Slice/Workspace file or split it into an area-root file when useful. There is no mandatory `concerns.md`, one-file-per-concern rule or global topology;
- Mini/Modular/Full SDS retain the same semantic quality: only physical addressability/register placement changes with scale;
- no new `собери идеи` variants and no custom Helper-tab model are introduced in this change. Existing commands only gain owner pointers/output reminders where needed.

**Consistency Result:**
- shared concern/Decision semantics are separated from Idea semantics without introducing a competing UC or semantic owner;
- Application, Workspace, ReviewDiff, File Update, Testing and Architecture consumers all use the same Concern/Decision contract while keeping their real semantic decisions in their own owners;
- old full same-ID Idea/QRP mirror behavior is retired in current methodology and replaced by one detailed storage location + references/register;
- current Full SDS/Architecture/WEUC semantics from `LOG-DOC-048` remain unchanged except for consuming the new cross-cutting concern/Decision contract.

**Questions / Risks / Problems:** none blocking this transition. Physical file topology remains intentionally contextual; user-owned preference/Need/risk-tolerance gaps remain explicit rather than being auto-resolved by AI.

### LOG-DOC-050 — Apply shared Planning Concerns and Decisions model

**Type:** APPLIED
**Applied From:** `LOG-DOC-049`
**ChangeSet:** `586476d4-c70b-4326-8f68-037f9dfb2669`
**Package:** `ebd46cb8-1bb5-4106-a4d6-db8d133fbc53`

**Target-State Result:** after successful Apply of this package:
- `planning-concerns-and-decisions-model.md` is the reusable semantic owner for Q/R/P, Concern Groups, Priority/Concern Category/Status, AI Comment, Recommendation/Decision boundaries, retained/residual trace and Area Concern Register/storage rules;
- root `UC-REPO-REFINE-CURRENT-PLAN` and `UC-REPO-REVIEW-PLANNING-FINDINGS` consume the new owner; no new Q/R/P UC is added;
- shared Idea methodology no longer owns generic Q/R/P lifecycle or requires duplicate same-ID Q/R/P bodies; one concern/group has one detailed storage location and references from related Ideas/owners;
- Application planning/detail/templates/profiles, Workspace Planning, File Update, ReviewDiff, Testing and Architecture Decision/Evolution consume the same shared model while retaining their existing semantic authority;
- current command definitions for `собери идеи`, critical review and file-update planning plus Mini/Modular/Full SDS controls point to the shared concern contract without introducing new collect-Ideas variants;
- Planning Helper generated command/use-case seeds are rebuilt from the current repository definitions/registries; automated Helper verification passes 104/104 tests with 42 command definitions, 11 Directions and 64 current canonical UCs;
- Planning Root, Application Planning and Planning Helper scope logs point to this canonical applied transition.

**Rationale:** make Q/R/P durable and reviewable without turning it into a separate planning queue or centralized storage dump, preserve residual/decision meaning, and prevent AI from silently resolving user-owned concerns.

### LOG-DOC-051 — Clarify collect-ideas orchestrator family and explicit Pre-Update boundary

**Type:** IDEA CLARIFICATION / INTEGRATED CONSISTENCY REVIEW
**Source:** user clarifications after `LOG-DOC-050`, followed by pointer-matrix review and explicit Pre-Update planning before package production

**Current Conclusions:**
- keep one generic `собери идеи` as the universal Idea/Q/R/P working shell. It may stay in pure-Idea mode, or when several Ideas materially combine around a real planning meaning it should propose a clearly marked current/preliminary/candidate integration view so the combined result can be reviewed;
- do not create a separate `собери идеи полного приложения`: `собери идеи приложения` already knows the complete same-quality Application SDS Step 0–4 lifecycle. Mini/Modular/Full remain physical/addressability profiles rather than different semantic quality levels;
- add high-level accumulator/orchestrator Planning Commands for whole Application, Scenario, Domain and Slice planning plus one Modular Application orchestrator that coordinates focused Scenario → Domain → Slice Idea passes. These commands are invocation/orchestration surfaces only and do not create new semantic UCs;
- specialized orchestrators fix the integration-target kind while consuming current owners: Scenario → `UC-PLAN-SCENARIO`; Domain → Domain Discovery/Planning as useful; Slice → Slice Strategy/Slice with conditional Architecture/Testing UCs; whole Application → the existing Application UC graph. The generic command infers the target contextually and may have none;
- for the collect-ideas command family, default automatic execution is Phase 1 Idea/Concern Review plus Phase 2 Semantic Integration when grounded. Phase 3 `Pre-Update` translates selected semantic meaning into exact repository owners/files/actions/checks and requires explicit continuation. Phase 4 Realization/Evidence/Review is also explicit downstream work;
- `Pre-Update` is a user-facing continuation label for the existing `file_update.plan` capability, not a new semantic UC and not a global rename of canonical SDS/UCDS Step 3. Add `пред-апдейт`, `pre-update` and `спланируй изменения файлов` aliases; do not add ambiguous global `давай шаг 3`;
- Step 4 remains fully described in Application lifecycle methodology but is never implied to have executed merely because collect-ideas planning knows it. Actual implementation, practical proof execution, Coverage/actual evidence and ReviewDiff remain downstream;
- orchestrator commands are ordinary GitHub-backed `planning/commands/*.command.md` records intended for Tampermonkey Planning Helper projection. Use `directionIds` for standalone Application-oriented placement rather than creating fake UC ownership;
- first establish stable commands and Helper catalog projection. Generic user-defined Helper tabs plus an initial `Ideas` tab remain a separate next change after these command IDs exist;
- rechecking the earlier Pre-Update removed unnecessary change surface: no Application UC registry rewrite, Workspace UCDS template rewrite, SDS profile rewrite, Architecture/Testing registry rewrite, Helper runtime/source/test rewrite, Use-Case seed rewrite, Direction seed rewrite or userscript rewrite is needed for this command-family transition. Current semantic owners are consumed through pointers instead.

**Consistency Result:**
- the command family adds stable high-level invocation choices without duplicating Scenario/Domain/Slice/Architecture/Testing semantics or creating new UCs;
- generic and specialized collect-ideas routes share one Idea/Concern contract and one explicit stop before concrete file planning;
- existing direct Scenario/Domain/Slice planning commands remain valid and distinct: they directly invoke the semantic capability, while the new collect-ideas commands accumulate Ideas/Q/R/P plus integration around that capability;
- Helper receives the new commands through the existing GitHub-backed command catalog/projection model; custom tabs are not smuggled into this package.

**Questions / Risks / Problems:** none blocking the selected transition. The exact Modular Application physical file split remains contextual by design; the command may prefer separately addressable Scenario/Domain/Slice work areas but does not mandate `ideas.md`/`concerns.md`/`decisions.md` files.

### LOG-DOC-052 — Apply collect-ideas orchestrator family and explicit Pre-Update boundary

**Type:** APPLIED
**Applied From:** `LOG-DOC-051`
**ChangeSet:** `102d689f-26e1-4a20-9bb2-dc9847bd52f4`
**Package:** `bd375ae5-a129-4355-8b16-28fbef024e6a`

**Target-State Result:** after successful Apply of this package:
- `собери идеи` is the generic adaptive accumulator: reviewed Ideas + shared Concern/Q/R/P state + contextual current/preliminary integration when useful, with pure-Idea mode still valid;
- five new high-level repository Planning Commands provide whole-Application, Scenario, Domain, Slice and Modular-Application collect-ideas orchestration without adding semantic UCs;
- the collect-ideas lifecycle explicitly stops automatically after Idea/Concern Review plus source-justified Semantic Integration. `Pre-Update`/`план файл-обновление` is the explicit exact-file continuation; practical Realization/Evidence/Review is separate downstream work;
- Application SDS Step 0–4 remains fully known and same-quality across Mini/Modular/Full, while Step 4 is not auto-executed by collect-ideas commands and no exact file plan is implied by semantic Step 3 planning;
- Idea methodology/template/example expose contextual/preliminary integration status and an explicit continuation handoff, preventing provisional drafts from becoming accidental semantic authority;
- File Update workflow/template and `file_update.plan` expose `Pre-Update` as the plan-only continuation label and retain separate implementation permission;
- Planning Command registry documentation describes standalone `directionIds`, high-level orchestrator commands and current explicit GitHub recovery rather than the stale ChatGPT-only recovery statement;
- Planning Helper projects the five new commands through the repository command catalog, generated command seed and durable catalog order; the current command-definition count becomes 47 while Direction/UC semantic catalogs are unchanged by this transition;
- legacy compact `собери идеи` helper insertion is synchronized only for compatibility; no new legacy helper-command records are created;
- custom Helper tabs remain deferred to the next separate Helper change.

**Rationale:** provide stable high-level collect-ideas accumulators for the Helper while preserving one semantic owner graph, keeping concrete file planning and actual evidence explicitly downstream, and avoiding unnecessary methodology/runtime churn.

### LOG-DOC-053 — Review corrected IDTSPE/SDS command surface and staged repository installation boundary

**Type:** IDEA REVIEW / LATER CLARIFICATION / INTEGRATED CONSISTENCY REVIEW  
**Source:** accepted corrected IDTSPE methodology workspace + current replacement-package request against the user-selected `ca768b61...` repository snapshot

**Current Conclusions:**
- install the current IDTSPE/SDS methodology as the canonical material-planning authority under `planning/documentation/idtspe-methodology/`, preserving its Core/SDS separation, 17 Target Modules, 18 Lenses and adaptive Documentation/Representation model;
- expose the accepted **39** methodology command surfaces: 7 IDTSPE primary surfaces + 32 SDS primary surfaces, including the direct Core Documentation/Representation check and the corrected user-facing cross-cutting command `спланируй сквозную ответственность <target>`;
- keep SDS as an IDTSPE profile rather than a parallel runtime; focused commands remain views of their existing Target Module owners and direct Lens commands do not create Targets;
- project conditional/optional Target nature in Helper metadata and show the existing consistency validator as a related Evidence/Coverage action without creating a 40th surface;
- store Helper navigation metadata in repository command definitions/seed projection and keep the userscript runtime generic. Hard-coding the 39 current command IDs into runtime would create a second catalog authority and is rejected;
- retire the six older `collect-ideas*` surfaces from the primary palette by retaining their command files only as hidden legacy compatibility (`palette:false`); do not delete them or the older Application/Architecture/Testing methodology families in this package;
- defer destructive legacy-family cleanup because MB-06 exact Reference Object semantics are still intentionally open. This package must not guess merge-before-delete meaning merely to make the repository look fully migrated;
- root Planning README/AI working contract/command routing/Direction+Use-Case projections should route current material planning toward the installed IDTSPE/SDS authority while preserving older families as readable compatibility until their separate cleanup gate is satisfied.

**Verification Evidence:** Planning Helper build/verification on the staged target passes **111 / 111** automated tests; generated userscript and GitHub-backed Direction/Command/Use-Case catalogs match current sources; generated runtime contains no maintained current methodology command identities.

**Questions / Risks / Problems:** MB-06 remains intentionally open; therefore this transition is an authority/command/helper installation, not final destructive removal of all superseded planning families.

### LOG-DOC-054 — Apply IDTSPE/SDS authority, 39-command surface and metadata-driven Helper navigation

**Type:** APPLIED  
**Applied From:** `LOG-DOC-053`  
**ChangeSet:** `b0f880f0-5d73-4881-9754-b150c3dd4435`  
**Package:** `46052a68-afd1-4913-8e75-0dd21a23e412`  

**Target-State Result:** after successful Apply of this package:
- the corrected methodology workspace is installed at `planning/documentation/idtspe-methodology/` and root planning governance identifies IDTSPE + SDS as the current material-planning authority;
- the repository command catalog exposes **39** accepted methodology primary surfaces: **7 IDTSPE + 32 SDS**; the six older collect-ideas command files remain hidden legacy compatibility rather than competing palette surfaces;
- `бутстреп sds` remains a read-only SDS **governance bootstrap**, distinct from selecting the Full SDS physical profile and compatible with the repository's proportional governance-preflight contract;
- all 39 methodology command definitions carry stable `methodologyBinding` (`IDTSPE` runtime/profile/surface kind/TM-or-Lens/semantic parent/host-target policy) plus separate helper-owned `helperPresentation` navigation metadata (`view/section/order/kind/badges/parent/related`) and `When To Use / What You Get`; the Helper codec validates and serializes both layers;
- Planning Helper `0.32.0` renders IDTSPE, SDS — IDTSPE Profile and All Commands views; focused commands are nested, conditional/optional badges are visible, Documentation/Representation is a Core Lens surface, WEUC+Simplicity remain the direct SDS Lens checks, and Evidence/Coverage links the existing consistency validator as a related action;
- Helper navigation runtime is generic and contains no maintained current command IDs; current navigation identities come from GitHub-backed command definitions/seed projection, preserving one command authority;
- generated command/direction/use-case seeds and userscript are rebuilt from the target state; Helper verification passes **111 / 111** automated tests and generated-source consistency;
- no `planning/documentation/tools/replacement-package-app/` file is changed by this package; the unrelated current snapshot work in that registered child scope is left untouched;
- old Application/Architecture/Testing families remain readable legacy compatibility until a separate MB-06-aware cleanup package can preserve/delete them safely.

**Rationale:** install the accepted IDTSPE/SDS runtime/profile and command/helper surface now without manufacturing file/runtime authorities or performing destructive cleanup whose Reference Object preservation gate is still unresolved.


### LOG-DOC-055 — Review post-Apply IDTSPE routing, legacy-alias retirement and Test Strategy realization registry

**Type:** REVIEW DIFF / LATER CLARIFICATION / INTEGRATED CONSISTENCY REVIEW  
**Source:** post-Apply ReviewDiff of the IDTSPE/SDS installation package + user clarification that shared Test Strategy may need a registry-like file for cross-Slice test realization topology

**Material Findings / Selected Corrections:**
- root `DIR-PLAN-ARCHITECTURE` and `DIR-PLAN-TESTING` still pointed to the old Architecture/Testing registries even though current material-planning authority is installed under IDTSPE/SDS; repoint those root Directions to the current SDS map and current WEUC/Test Target owners without deleting the legacy families yet;
- all six `collect-ideas*` commands were hidden with `palette:false`, but several still retained the old collect-Ideas/Current-Plan meaning and legacy Idea/Application/Architecture/Testing owner files. Hiding is not semantic retirement: keep the old IDs/aliases only as compatibility entrypoints and route them into current IDTSPE/SDS Target ownership with no old collect-Ideas runtime;
- preserve the general command-routing rule that a legacy alias may keep its trigger but must not keep obsolete semantic owners/runtimes alive;
- extend `TM-TEST-STRATEGY` so a material shared strategy may keep a compact **Test Realization / Topology Registry** mapping Slice/Domain proof responsibility to concrete test suite/class, setup/fixture/harness and helper responsibility, including shared consumers when useful;
- the realization registry exists because the important cross-owner relation is often poorly discoverable from distributed code alone. Test code remains authority for class bodies/signatures/assertions; Strategy references those implementation owners rather than duplicating them;
- keep the registry as a section of `TEST-STRATEGY.md` by default. Promote it to an independently addressable supporting map such as `TEST-REALIZATION-MAP.md` only when size/review/reuse/read-path pressure justifies the split through Documentation / Representation + P-14;
- do not add a new Target Module or AP/AG identity for this clarification: extend `AP-TSTRAT-01` representation semantics and the existing materialization projection, keeping **38 AP + 38 AG = 76** source records;
- add regression checks for current root Direction authority, true collect-Ideas alias retirement and Test Strategy registry semantics, then rebuild Helper Direction/Command seeds from repository source.

**Boundary:** old Application/Architecture/Testing source families remain physically present as legacy/provenance/compatibility material pending their already-planned cleanup gates; this correction changes current routing/authority and does not perform the destructive migration.

### LOG-DOC-056 — Apply IDTSPE routing/legacy-alias correction and Test Strategy realization registry

**Type:** APPLIED  
**Applied From:** `LOG-DOC-055`  
**ChangeSet:** `b0f880f0-5d73-4881-9754-b150c3dd4435`  
**Package:** `3fcc3e13-11df-4a27-a109-8c096fac8685`  

**Target-State Result:** after successful Apply of this exact package:
- root Architecture planning resolves through current SDS/IDTSPE architecture ownership: `SDS-FULL-MAP` + `TM-WEUC` for project-global architecture/evolution + WEUC Lens for target-local fitness; the root Direction no longer advertises the legacy Architecture registry as current authority;
- root Testing planning resolves through current SDS/IDTSPE Test Target Module catalog; the root Direction no longer advertises the legacy Testing registry as current authority;
- all six `collect-ideas*` commands remain registered but hidden compatibility aliases and now route only to current IDTSPE/SDS owners. Their command meaning/ownerFiles no longer revive the old Idea Review/Current Plan/old SDS profile runtime;
- shared command-routing documentation explicitly states that `palette:false` alone is not semantic retirement;
- `TM-TEST-STRATEGY` can persist a compact Test Realization / Topology Registry showing how selected Slice/Domain proof is realized by test suites/classes/setups/fixtures/harnesses/helpers and which infrastructure is intentionally shared;
- the Test Strategy registry references code instead of shadowing test bodies, stays inside the Strategy first, and may split to a supporting `TEST-REALIZATION-MAP.md` only under independent representation pressure;
- Test Strategy command/help text, SDS full/physical/materialization maps, Documentation / Representation Lens, testing workflow notes and current audits agree on the same registry-like representation rule;
- AP/AG totals remain **38 + 38 = 76** and the existing materialization projection remains source-ID complete;
- Planning Helper regenerated Direction/Command seeds from the corrected repository sources and passes **114 / 114** automated tests; the accepted primary methodology surface remains **39 = 7 IDTSPE + 32 SDS**;
- no old Application/Architecture/Testing directory is deleted by this correction package and no commit/push is implied.

**Rationale:** finish the same IDTSPE/SDS installation ChangeSet by removing residual current-authority leaks and make shared testing topology discoverable in the one place where code alone is structurally weak: cross-Slice/Domain mapping of proof responsibility to concrete test infrastructure.

### LOG-DOC-057 — Review residual bootstrap semantics and Helper methodology-view authority

**Type:** REVIEW DIFF / USER-SELECTED CORRECTION  
**Source:** post-Apply ReviewDiff after `LOG-DOC-056` + explicit user approval to correct the remaining findings

**Material Findings / Selected Corrections:**
- `idtspe.bootstrap` and `application_sds.bootstrap` were correctly bound as `BOOTSTRAP` with `hostTargetPolicy=NONE`, but their copied `activeContextBehavior` still told the runtime to resolve a Target and infer `CREATE/REFINE/EXTEND/REVALIDATE/REPAIR`. Bootstrap must load/refresh governance only: it may report an already-current Target for orientation, but it does not perform Target Formation, select a Target, infer an invocation mode or execute Target/Target-Module work;
- Helper already had generic `methodologyViewDefinitions(entries)` derived from `helperPresentation.navigation`, but `planning-helper-ui.js` still hard-coded the `IDTSPE` / `SDS — IDTSPE Profile` buttons and default view. Remove that second view-list authority: generate methodology view controls, labels and ordering from current command metadata and keep only generic `All commands` as Helper-owned fallback;
- the retired generic `collect-ideas.command.md` had current IDTSPE semantics but its file-level `Scope:` sentence still claimed reusable Idea/SDS-UCDS behavior. Correct the header so the old file is explicitly a compatibility trigger whose behavior is owned by current IDTSPE/SDS owners;
- add regression evidence for bootstrap no-Target behavior and metadata-derived Helper view controls, and bump Planning Helper to `0.32.1` because this correction changes UI runtime behavior.

**Boundary:** this correction does not change the accepted 39 methodology surfaces, Target/Lens counts, Architecture/Testing routing, Test Strategy realization-registry semantics, AP/AG identities or legacy-family cleanup gates established by `LOG-DOC-054` / `LOG-DOC-056`.

### LOG-DOC-058 — Apply bootstrap/view-authority cleanup

**Type:** APPLIED  
**Applied From:** `LOG-DOC-057`  
**ChangeSet:** `b0f880f0-5d73-4881-9754-b150c3dd4435`  
**Package:** `b580c0bc-95fa-475b-a59d-450a3e2ca9f9`  

**Target-State Result:** after successful Apply of this exact package:
- `idtspe.bootstrap` and `application_sds.bootstrap` are governance-orientation surfaces only; both preserve `hostTargetPolicy=NONE`, may report/reuse an already-current Target only for orientation, and explicitly forbid Target Formation, Target selection, invocation-mode inference and Target/Target-Module execution;
- the Planning Helper `0.32.1` methodology view bar is generated from `methodologyViewDefinitions(commandEntries)` / command `helperPresentation.navigation` metadata. Runtime UI no longer owns a hard-coded `IDTSPE`/`SDS` view list or labels; `All commands` remains the generic Helper fallback;
- generic `collect-ideas.command.md` is consistently described at file scope as a legacy compatibility alias routed to current IDTSPE/SDS owners;
- generated command seed and userscript are rebuilt from the corrected sources; the accepted primary methodology surface remains **39 = 7 IDTSPE + 32 SDS**;
- Planning Helper verification passes **116 / 116** automated tests, including new bootstrap no-Target and metadata-derived-view regressions;
- the existing Architecture/Testing routing, true collect-Ideas semantic retirement, Test Strategy Realization / Topology Registry, **38 AP + 38 AG = 76** materialization source records and open MB-06 boundary remain unchanged.

**Rationale:** remove the last duplicated/contradictory runtime semantics from the staged IDTSPE/SDS installation so bootstrap cannot accidentally become Target execution and Helper navigation has one GitHub-backed metadata source for methodology views.

### LOG-DOC-059 — Review IDTSPE Target/Lens composition, Knowledge Basis and artifact-guidance ownership

**Type:** REVIEW DIFF / USER-SELECTED PRE-UPDATE  
**Source:** current user-selected repository snapshot `46ee341cef4b6c581dc1e461f21cd1e11755abb7` + explicit clarification of Target Module/Lens usage and pre-update omission review

**Material Findings / Selected Corrections:**
- a material IDTSPE Target must not require a pre-existing reusable Target Module. Preserve the existing first-class `Local Target Contract` path when no recurring module fits well enough; a Target Module remains a reusable planning contract for a recurring useful result;
- make `TF-06A LENS_SET` an explicit proportional **Lens Applicability Scan**: required Core Lenses are always checked proportionally, the active Target Module Lens Profile contributes required/conditional attachments when a module exists, Core/profile registries are scanned by applicability gate, and explicit user/agent Lens choice is allowed without manufacturing a new Target;
- separate every reusable Lens into its **Operational Evaluation Contract** and explicit **Knowledge Basis**. Knowledge Basis mode is an independent axis (`INLINE`, `REFERENCED`, `HYBRID`) and may embed small principles/rules/theory or reference separate knowledge owners with a load policy. Rename Lens-side `Typical Sources / Evidence` to `Target Inputs / Evidence` so Target Sources are not confused with theory/principle sources;
- expose two generic Core orchestration intents: `idtspe.lenses.select / подбери линзы <target/context>` and `idtspe.lens.apply / примени линзу <lens> к <target/context>`. They dispatch registry-owned Lens semantics and do not create fixed Lens identities. Keep the four existing direct Lens commands as stable specialized shortcuts rather than creating one command per Lens;
- normalize artifact-guidance ownership: Target Module `AP-*` records describe representation/routing of the Target result; Lens `AG-*` records describe/reroute Lens-produced findings/supporting perspective artifacts. A Lens may have zero AG records when its findings return to the current Target owner;
- remove duplicated evolution companion proposals from `TM-DOMAIN-DRAFT`, `TM-IMPLEMENTATION-SLICE`, `TM-FRONTEND-SLICE`, `TM-WEUC` and duplicated Target-result/evolution AG records from Application/Scenario/Domain/Slice/UI profile Lenses. L5/WEUC `AG-L5-02` becomes the canonical proposer for target-local Evolution sections / `<owner>.evolution.md`;
- preserve the literal boundary examples: `TM-DOMAIN-DRAFT` owns current Domain meaning while L5 may propose `CaptureItem.evolution.md`; `TM-IMPLEMENTATION-SLICE` owns the current Useful Vertical Result/runtime/integrated plan while L5 may propose a Slice evolution companion;
- preserve the counterexample: `TEST-REALIZATION-MAP.md` remains a `TM-TEST-STRATEGY` result/supporting representation because proof allocation and test suite/class/setup/fixture/harness/helper topology are part of Test Strategy, not a Lens finding;
- do not preserve old AP/AG totals for numerical continuity. The coherent target inventory is **34 AP + 24 AG = 58**, with annotated materialization projection updated to exact **58/58** parity; historical checkpoints and `sources-readonly/**` retain their historical counts unchanged;
- update bootstrap/system maps/command and Helper navigation so the Lens registry and scan are discoverable without loading every Lens body at bootstrap. Full Lens bodies and referenced Knowledge Basis owners remain proportional/target-driven.

**Pre-Update Omission Review:**
- current command/helper projections must move from `39 = 7 IDTSPE + 32 SDS` to **41 = 9 IDTSPE + 32 SDS** while fixed direct Lens shortcuts remain four;
- all **18 / 18** active Lens bodies must carry the new Knowledge Basis contract, otherwise the rule would remain descriptive rather than enforceable;
- current audits, manifest, materialization projection, readiness/integration docs, Helper seed/tests/manual acceptance and affected scope logs must transition coherently in the same package;
- raw Testing theory remains byte-identical to its `ca768b61...` source provenance and is referenced conditionally from the Test Proof Lens rather than rewritten;
- Reference Object / MB-06 and destructive legacy-family cleanup remain outside this package.

### LOG-DOC-060 — Apply Lens applicability / Knowledge Basis / guidance-ownership integration

**Type:** APPLIED  
**Applied From:** `LOG-DOC-059`  
**ChangeSet:** `4a7b4e71-bb08-4b49-906d-f8a54f05d3fb`  
**Package:** `f73b494c-e01e-4bfc-b39f-61144726259f`  

**Target-State Result:** after successful Apply of this exact package:
- generic IDTSPE explicitly supports either a reusable Target Module or a one-off Local Target Contract; Target Module and Target Instance remain distinct;
- `TF-06A LENS_SET` owns the proportional Lens Applicability Scan across required Core, Target Module attachment policy, applicable Core/profile registries and explicit selection;
- all **18 / 18** reusable Lens files expose one `Knowledge Basis` (`INLINE | REFERENCED | HYBRID`) separate from Target Inputs / Evidence and from the operational evaluation contract;
- Core command/navigation exposes `idtspe.lenses.select` and `idtspe.lens.apply`; accepted methodology surface becomes **41 = 9 IDTSPE + 32 SDS** while four specialized direct Lens shortcuts remain stable convenience routes;
- Planning Helper remains metadata-driven and passes **120 / 120** automated tests, including Lens Knowledge Basis, AP/AG ownership and generic Lens-dispatch regressions;
- Artifact Placement source inventory is **34 AP + 24 AG = 58**, and `ARTIFACT-PLACEMENT-MAP.md` projects the exact **58 / 58** current source IDs with missing `0`, extra `0`;
- Target Module AP owns Target-result representation; Lens AG owns/routs Lens-produced findings/supporting material. L5/WEUC `AG-L5-02` owns target-local future evolution companion guidance; Domain/Slice/Frontend current results stay with their Target Modules;
- `TEST-REALIZATION-MAP.md` remains Test Strategy output/supporting representation; no Lens-owned shadow Test Strategy artifact is introduced;
- Markdown link/fence checks pass, raw Testing theory remains **4 / 4 byte-identical** to its preserved source, and `planning/documentation/idtspe-methodology/sources-readonly/**` is unchanged;
- MB-06 and destructive legacy methodology cleanup remain intentionally open/out of scope.

**Rationale:** make IDTSPE composition explicit enough to support recurring modules, dynamic one-off Targets, proportional Lens discovery and theory-backed evaluation without conflating Target result ownership, Lens findings, knowledge sources or physical supporting artifacts.

### LOG-DOC-061 — Review residual Core/SDS command authority, Lens host policy, evolution handoff and ChangeSet finalization

**Type:** REVIEW DIFF / LATER CLARIFICATION / USER-SELECTED CORRECTION  
**Source:** post-Apply ReviewDiff after `LOG-DOC-060` + user clarification that accepted `APPROVABLE` ReviewDiff finalizes a ChangeSet for future replacement-package continuity

**Material Findings / Selected Corrections:**
- the two new generic Lens operations exposed a broader authority leak: all nine generic IDTSPE helper surfaces still referenced the SDS-profile `idtspe-command-surface-contract.md` as a command owner. Create a generic Core command-surface contract under `idtspe-core/shared/`, route all nine Core command definitions to it, and make the SDS command-surface file an explicit profile extension rather than owner of Core semantics/host-target policies;
- `idtspe.lenses.select / подбери линзы` participates in Target Formation and must work for a bounded Target candidate / first-class Local Target Contract, so its host policy is `CREATE_OR_REUSE_TARGET`. `idtspe.lens.apply / примени линзу` remains `RESOLVE_OR_REUSE_TARGET` because explicit Lens execution needs a natural resolved/reused host Target context;
- finish evolution-companion prose ownership after the AP/AG cleanup: Target Modules may consume/reference local evolution companions already justified by L5/WEUC, but they must not sound like companion proposers. `AG-L5-02` + Documentation / Representation + P-14 remain the creation/embed-vs-split authority;
- clarify replacement-package lifecycle: correction/continuation may reuse a ChangeSet only while it is open. Once a ReviewDiff for that ChangeSet is accepted as `APPROVABLE`, the ChangeSet is finalized/closed for producer continuity; every later replacement archive must start a new `changeSetId`, stable new `changeSetLabel` and new `packageId`, even for conceptually related work or overlapping files. No closing ZIP is required merely to finalize an APPROVABLE ChangeSet.

**Boundary:** this correction does not change the accepted **41 = 9 IDTSPE + 32 SDS** methodology surfaces, **18** Lens inventory, **34 AP + 24 AG = 58** materialization source records, Test Strategy realization-map ownership, raw Testing theory or MB-06 cleanup boundary.

### LOG-DOC-062 — Apply Core command authority / host-policy / evolution-handoff / ChangeSet-finalization correction

**Type:** APPLIED  
**Applied From:** `LOG-DOC-061`  
**ChangeSet:** `4a7b4e71-bb08-4b49-906d-f8a54f05d3fb`  
**Package:** `d5699ab9-ba22-44b5-83fe-59fb94984536`  

**Target-State Result:** after successful Apply of this exact package:
- `active/idtspe-core/shared/idtspe-command-surface-contract.md` is the canonical generic Core command-surface owner. All **9 / 9** IDTSPE Core command definitions reference it rather than the SDS profile command owner; the SDS command-surface file is explicitly a profile extension that contributes SDS bootstrap/Target/focused/Lens-shortcut surfaces and the current Core+SDS aggregate projection;
- Core bootstrap/navigation reads the generic command-surface contract and the methodology/system/helper maps distinguish generic Core command authority from the SDS extension;
- `idtspe.lenses.select` uses `CREATE_OR_REUSE_TARGET`, so the TF-06A Applicability Scan can operate during Target Formation / Local Target Contract formation; `idtspe.lens.apply` keeps `RESOLVE_OR_REUSE_TARGET`;
- Frontend and TM-WEUC prose no longer present target-local evolution companions as Target-Module proposals. They consume/reference L5/WEUC results; `AG-L5-02` plus Documentation / Representation / P-14 owns optional Evolution-section / `<owner>.evolution.md` proposal and embed-vs-split resolution; existing Domain/Slice wording remains aligned with the same boundary;
- `replacement_archive.create / давай архив` and its canonical producer workflow now make ChangeSet continuity state explicit: an accepted `APPROVABLE` ReviewDiff finalizes the ChangeSet, and any later package starts a new ChangeSet; same-logical-work reuse applies only while the prior ChangeSet is open;
- methodology counts remain **41 surfaces**, **18 Lenses**, **34 AP + 24 AG = 58** source records with **58 / 58** materialization parity;
- Planning Helper generated command seed/userscript are rebuilt and verification passes **122 / 122** automated tests, including Core-vs-SDS command authority, select/apply host-policy and APPROVABLE-finalization regressions;
- raw Testing theory and `planning/documentation/idtspe-methodology/sources-readonly/**` remain unchanged; MB-06/destructive legacy cleanup remains out of scope.

**Rationale:** complete the post-Apply authority cleanup so generic IDTSPE can remain profile-independent, Lens selection participates correctly in Target Formation, evolution companions have one proposer boundary, and replacement-package ChangeSets cannot be silently reused after an accepted final ReviewDiff.

### LOG-DOC-063 — Review residual Domain/Slice evolution-companion proposer wording

**Type:** REVIEW DIFF / LATER CLARIFICATION / USER-SELECTED CORRECTION  
**Source:** post-Apply ReviewDiff after `LOG-DOC-062`

**Material Findings / Selected Corrections:**
- the AP/AG ownership model and Frontend/WEUC prose were already corrected, but `TM-DOMAIN-DRAFT` still said `create/update an optional companion`, `TM-IMPLEMENTATION-SLICE` still said `persist an optional companion`, and `TM-DOMAIN-DISCOVERY` still allowed a later `<domain-owner>.evolution.md` to be “proposed” without explicitly routing proposal authority through L5;
- normalize all three remaining Domain/Slice passages to the same handoff boundary: Target Modules may identify future-path pressure and consume/reference the resulting evolution representation, but they do not propose or require the companion;
- `AG-L5-02` remains the canonical Lens guidance that may propose an Evolution section / `<owner>.evolution.md`; Documentation / Representation decides whether persistence is justified and P-14 resolves embed-vs-split;
- expand the existing artifact-guidance ownership regression to cover Domain Draft, Domain Discovery and Implementation Slice literal wording so this prose-level ownership conflict cannot recur unnoticed.

**Boundary:** no command surface, Lens inventory, AP/AG inventory, materialization projection, Helper navigation, Knowledge Basis contract, Test Strategy realization ownership, ChangeSet-finalization rule or MB-06 boundary changes in this correction.

### LOG-DOC-064 — Apply final Domain/Slice evolution-companion handoff wording correction

**Type:** APPLIED  
**Applied From:** `LOG-DOC-063`  
**ChangeSet:** `4a7b4e71-bb08-4b49-906d-f8a54f05d3fb`  
**Package:** `d886c59f-9b57-4cf0-9de6-661fa338fc21`  

**Target-State Result:** after successful Apply of this exact package:
- `TM-DOMAIN-DRAFT` routes material future Domain evolution to WEUC/L5, explicitly states that the Target Module does not propose or require an evolution companion, and treats `CaptureItem.evolution.md` only as an example after `AG-L5-02` + Documentation / Representation + P-14 placement;
- `TM-DOMAIN-DISCOVERY` hands future-path implications to WEUC/L5 and explicitly states that it does not propose `<domain-owner>.evolution.md`;
- `TM-IMPLEMENTATION-SLICE` routes Slice future-path pressure to WEUC/L5, explicitly states that the Target Module does not propose or require a Slice evolution companion, and treats `.evolution.md` as L5-produced supporting output after placement resolution;
- the existing artifact-guidance ownership regression now covers Domain Draft, Domain Discovery, Implementation Slice, Frontend and WEUC proposer wording; Planning Helper verification remains **122 / 122** PASS;
- methodology counts remain **41 surfaces**, **18 Lenses**, **34 AP + 24 AG = 58** source records with **58 / 58** materialization parity; no command/helper runtime or generated seed change is required;
- this ChangeSet remains open until its ReviewDiff is accepted as `APPROVABLE`; once accepted, the existing finalization rule requires every later archive to start a new ChangeSet.

**Rationale:** finish the last prose-level ownership inconsistency so Target Modules uniformly own current Target results while L5/WEUC alone proposes target-local future-evolution companions.


### LOG-DOC-065 — Review shared Target/Lens Knowledge Basis contract and Target Module symmetry

**Type:** LATER CLARIFICATION / INTEGRATED CONSISTENCY REVIEW  
**Source:** user clarification that Target Modules should expose the same formal Knowledge Basis shape as Lenses + current user-selected repository snapshot `36dfbf878d4ff9e616de70d7535135c5c0c9966e`

**Material Findings / Selected Changes:**
- make `Knowledge Basis` a shared Core sub-contract used by both reusable Target Modules and reusable Lenses: `INLINE | REFERENCED | HYBRID`, embedded knowledge, referenced knowledge owners, lazy load policy and operationalization notes;
- preserve the role boundary: Target Module pairs Knowledge Basis with an **Operational Target Contract**; Lens pairs the same Knowledge Basis shape with an **Operational Evaluation Contract**. Symmetry of knowledge dependency does not merge Target/Lens authority;
- make Source/knowledge separation explicit: Target Module `Upstream Source Contract` describes current Target-instance inputs/evidence/constraints; Lens `Target Inputs / Evidence` describes current evaluation inputs; Knowledge Basis contains reusable theory/rules/pattern knowledge and is not project truth/Decision/Evidence;
- bootstrap/navigation should know Target Module + Lens registries and Knowledge Basis summaries, but selected module/Lens referenced knowledge bodies remain lazy-loaded according to the owning contract's load policy;
- migrate all **17 / 17** current SDS Target Modules to exactly one `## Knowledge Basis`. Most use `INLINE` because their target-specific knowledge is already processed in the module body while reusable evaluation knowledge remains in Lenses;
- migrate `TM-APPLICATION-DEFINITION` to `HYBRID` and treat its existing market/reference-research and refined-core-real-life-scenario deep guides as formal referenced Knowledge Owners rather than ad-hoc output-section links;
- migrate `TM-TEST-STRATEGY`, `TM-TEST-DESIGN`, `TM-PRACTICAL-TEST` and `TM-TEST-COVERAGE` to `HYBRID` Knowledge Basis referencing the preserved raw Testing theoretical package, removing the separate `Theoretical Testing Reference — Conditional` mechanism;
- keep Theoretical Modules as staging/reference owners: either Target Module or Lens may reference them through the shared Knowledge Basis contract without granting raw theory operational authority.

**Boundary:** no Target/Lens inventory count, command surface, Lens applicability semantics, AP/AG artifact-guidance ownership, SDS workflow, P-14 behavior, raw Testing theory bytes or MB-06 legacy cleanup changes are intended.

### LOG-DOC-066 — Apply shared Target/Lens Knowledge Basis contract across IDTSPE Core and SDS

**Type:** APPLIED  
**Applied From:** `LOG-DOC-065`  
**ChangeSet:** `d70e9881-c187-4742-b7f3-0278353539b7`  
**Package:** `14bfb562-aadf-4c13-b3cc-110736f7bc5b`  

**Target-State Result:** after successful Apply of this exact package:
- `active/idtspe-core/shared/knowledge-basis-contract.md` is the canonical shared Knowledge Basis owner for reusable Target Modules and Lenses; both use `INLINE | REFERENCED | HYBRID` with the same embedded/referenced/load-policy/operationalization shape;
- Target Module Core contracts expose `TM-IP-03A KNOWLEDGE_BASIS`, require exactly one Knowledge Basis, validate its separation from current Target Sources and keep reusable evaluation knowledge in Lens owners; Target Module maintenance now resolves Knowledge Basis mode/owners/load policy explicitly;
- Lens Model/maintenance use the same shared contract while retaining Lens-specific Operational Evaluation Contract + Target Inputs/Evidence boundaries;
- Core bootstrap/maps/Shell/default work mode know that selected Target Module and Lens referenced Knowledge Basis bodies are loaded lazily according to their own load policies; Theoretical Modules may be referenced by either operational owner;
- all **17 / 17** active SDS Target Modules contain exactly one `## Knowledge Basis`; `TM-APPLICATION-DEFINITION` formalizes its two existing deep guides as `HYBRID` referenced knowledge, while four Test Target Modules formalize the preserved Testing theoretical package as `HYBRID` knowledge and remove the old ad-hoc theoretical-reference section;
- all **18 / 18** reusable Lenses retain exactly one Knowledge Basis through the same shared Core contract; Target Modules do not absorb reusable Lens evaluation knowledge;
- Target/Lens inventories remain **17 Target Modules / 18 reusable Lenses**, command surface remains **41**, artifact guidance remains **34 AP + 24 AG = 58**, and no helper/generated command artifacts are changed by this package;
- raw Testing theory and `planning/documentation/idtspe-methodology/sources-readonly/**` remain unchanged; MB-06/destructive legacy cleanup remains out of scope.

**Rationale:** remove the remaining Target/Lens knowledge-dependency asymmetry so reusable Target planning and reusable evaluation can both use one lazy, referenceable Knowledge Basis contract without confusing knowledge with current Target Sources or creating a second theory-loading mechanism.

### LOG-DOC-067 — Correct stale current-base metadata found in shared Knowledge Basis ReviewDiff

**Type:** REVIEW DIFF / USER-SELECTED CORRECTION  
**Source:** post-Apply cumulative ReviewDiff after `LOG-DOC-066`; ReviewDiff was not accepted as `APPROVABLE`, so ChangeSet `d70e9881-c187-4742-b7f3-0278353539b7` remains open for this correction

**Material Findings / Selected Corrections:**
- `planning/documentation/idtspe-methodology/MANIFEST.json` updated its workspace/audit evidence to snapshot `36dfbf878d4ff9e616de70d7535135c5c0c9966e` but left `repo_snapshot_base` at stale `46ee341cef4b6c581dc1e461f21cd1e11755abb7`; align the current-base field with the actual user-selected snapshot used by this ChangeSet;
- `planning/documentation/idtspe-methodology/integration/CURRENT-REPOSITORY-INTEGRATION.md` likewise left two top-level **current** metadata statements pointing to `46ee341c...` even though the new shared-Knowledge-Basis section correctly identifies `36dfbf87...`; update only those current-state statements;
- retain later/historical `46ee341c...` transition references because they describe earlier integration provenance rather than the current package base.

**Boundary:** no Knowledge Basis semantics, Target/Lens inventory, command surface, Lens applicability, SDS Target Module bodies, artifact guidance, Testing theory, MB-06 boundary or historical transition provenance changes.

### LOG-DOC-068 — Apply shared Knowledge Basis current-base metadata correction

**Type:** APPLIED  
**Applied From:** `LOG-DOC-067`  
**ChangeSet:** `d70e9881-c187-4742-b7f3-0278353539b7`  
**Package:** `9aac30b8-a319-448c-acaf-2cb60a9c31ae`  

**Target-State Result:** after successful Apply of this exact package:
- `MANIFEST.json` current `repo_snapshot_base` is `36dfbf878d4ff9e616de70d7535135c5c0c9966e`, matching the already-recorded repository audit evidence for the shared Target/Lens Knowledge Basis ChangeSet;
- `integration/CURRENT-REPOSITORY-INTEGRATION.md` top-level current package base and user-selected current snapshot both identify `36dfbf878d4ff9e616de70d7535135c5c0c9966e`;
- historical `46ee341c...` transition/provenance references remain unchanged;
- all shared Knowledge Basis semantics and the previously applied 17/17 Target Module + 18/18 Lens state remain unchanged.

**Rationale:** make current-state repository-base metadata internally consistent without rewriting historical integration provenance or changing the accepted semantic scope of the open shared-Knowledge-Basis ChangeSet.

### XREF-DOC-012 — Replacement Package App action-assisted Review-chat binding protocol

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/tools/replacement-package-app/action-log.md`  
**Entry:** `LOG-RPKG-033`  
**Reason:** the canonical shared `OBS-ACTION/1` protocol is synchronized into `planning/documentation/build-replacement-archive-workflow.md` in the reusable-documentation scope, while the Replacement Package App scope owns the SL-RPKG-06 behavior, implementation, tests and full APPLIED rationale.

### XREF-DOC-013 — Replacement Package App prepared Apply and Review-chat rebind protocol

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/tools/replacement-package-app/action-log.md`  
**Entry:** `LOG-RPKG-034`  
**Reason:** the Replacement Package App scope owns prepared action resolution, configurable Review-chat title matching, explicit rebind authorization and Swing background execution, while this transition also synchronizes the canonical `OBS-ACTION/1` definition/use through `planning/documentation/build-replacement-archive-workflow.md` in the reusable-documentation scope.


### XREF-DOC-014 — Replacement Package App prepared Apply ReviewDiff correction

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/tools/replacement-package-app/action-log.md`  
**Entry:** `LOG-RPKG-035`  
**Reason:** the Replacement Package App scope owns the EDT pre-Prepare correction plus the accepted manual-rebind-during-Execute and non-interactive CLI limitations, while this correction also updates the materialized shared `OBS-ACTION/1` protocol in `planning/documentation/build-replacement-archive-workflow.md` so producer/consumer wording remains truthful.
