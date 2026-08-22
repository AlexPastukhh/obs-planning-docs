# Scope Action Log

Scope: `SCOPE-APPLICATION-PLANNING`
Status: active cumulative high-level log

Logging starts only after explicit user instruction; no pre-start history is reconstructed automatically.

## Entries

### XREF-001 — Registered scope/log architecture bootstrap

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-005`  
**Reason:** this scope/log was established as part of the cross-scope registered-scope/log migration. Full rationale and application history are owned by the canonical entry.

### LOG-APP-001 — Detailed application planning workspace architecture

**Type:** IDEA REVIEW  
**Source:** current planning discussion covering Scenario Draft low-level planning, shared/local supporting areas, Variant handling, Screens, Domain/Slice planning and cross-file reference synchronization needs  

**Current Conclusions:**
- detailed Scenario planning uses a folder workspace with canonical Scenario behavior plus standard `ideas/`, `data/`, `behavior/` and `visual/` areas;
- the Scenario collection provides matching shared areas for meaning that genuinely applies to several Scenarios;
- low-level owners use `Current Decisions`, Current-Draft-relative `Questions / Risks / Problems`, and unselected `Potential Simplifications / Better Routes` rather than a generic Planning Draft layer;
- `Current Draft Plan` is the selected baseline inside an aggregate finding/candidate, not a file/entity/stage;
- integrated Planning Unit Variants activate only when a second materially distinct whole-unit design exists; runtime Branches and Idea Variants remain separate concepts;
- Screen planning is a spatial/visual responsibility distinct from Scenario behavior; Domain and Slice retain their own type-specific responsibilities;
- ordinary cross-file semantic relations use normal repository links, while exact literal values with real stale-copy risk may become candidates for Linked Notes Reference Object materialization.

### LOG-APP-002 — Clarify placeholders, Variant state, Screen/Domain/Slice shape and Reference Object Candidate test

**Type:** IDEA CLARIFICATION  
**Updates:** `LOG-APP-001`  

**Clarification:**
- required empty Scenario structural directories use neutral `.gitkeep` placeholders rather than replicated README links to methodology;
- the original/root draft is the implicit first Variant; when a second integrated Variant appears, the first may remain physically at the root while Variant names/navigation explicitly show `selected`, `not-selected` and `candidate` state; workspace navigation routes to exactly one current selected Variant;
- Variant-local Ideas/DATA/Behavior/Visual represent only real differences; otherwise parent/shared owners remain authoritative;
- Screens own spatial boundaries/zones/visual states and Scenario-to-space relations only, with `ideas/` and `visual/` but no Screen-local `data/` or `behavior/`;
- Domain uses a conceptual owner + `ideas/` (and `variants/` only when needed) without default visual planning;
- an Implementation Slice keeps one integrated Slice owner, `ideas/` and `visual/`, and may split frontend/server/verification responsibility files when useful;
- a `Reference Object Candidate` is canonical literal meaning established through real work in one defining context that may be intentionally materialized exactly in other files, where changing the definition should make stale copies discoverable for explicit review/update; semantic dependency or ordinary linking alone is insufficient.

### LOG-APP-003 — Apply detailed application planning workspaces and reference-candidate contract

**Type:** APPLIED  
**Applied From:** `LOG-APP-001`, `LOG-APP-002`  
**ChangeSet:** `0d9755c0-0cb1-46ae-bf71-cbb4d4ee63e7`  
**Package:** `8964596c-b244-4644-bd3b-51e374d560c8`  

**Target-State Result:** after successful Apply of this package:
- reusable Application Planning has one canonical detailed-planning owner for shared Draft State, Scenario workspace structure, Variants, Screen spatial ownership, Domain/Slice guidance, verification and cross-file reference rules;
- detailed Scenario Drafts use standard `ideas/`, `data/`, `behavior/`, `visual/` areas with shared collection-level equivalents and neutral `.gitkeep` placeholders for empty structural folders;
- Scenario, Screen, Domain and Slice templates expose Current Decisions plus Current-Draft-relative Q/R/P and candidate Better Routes without introducing `current-draft.md` or a generic Planning Draft layer;
- integrated Variants activate only when a second design exists, allow the first Variant to remain at the root, expose selected/not-selected/candidate state, and keep variant-local supporting meaning limited to actual differences;
- Screen planning is explicitly spatial/visual and does not duplicate Scenario DATA/Behavior;
- Domain and Slice receive type-specific draft/workspace shapes, including optional Slice frontend/server/verification responsibility files;
- the SDS profile/field kit align with the new workspace model and treat Scenario/DATA/Behavior as addressable planning owners whose canonical literal fragments may become Reference Object Candidates rather than automatically materialized Linked Notes ROs;
- the detailed-planning owner routes to the existing Linked Notes repository-facing contracts without changing Linked Notes runtime/registry state;
- one worked FixFlow example demonstrates the whole-solution → Spine → Scenario workspace → Ideas/Variants → Screens → Domain → Slices → verification → integration-review path.

**Rationale:** make detailed planning as explicit and reviewable as high-level Idea planning while keeping semantic ownership minimal, supporting rich file-local workspaces, and preventing ordinary cross-file links from being confused with literal synchronization requirements.

### LOG-APP-004 — ReviewDiff correct selected Scenario Variant authority

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `0d9755c0-0cb1-46ae-bf71-cbb4d4ee63e7`, package `8964596c-b244-4644-bd3b-51e374d560c8`  

**Material Finding / Selected Correction:** the Variant contract correctly allows a non-root integrated Variant to become selected while the original first Variant remains physically at the workspace root, but three active owners still stated unconditionally that root `scenario.md` owns current selected behavior. The selected correction is to make current behavioral authority follow the one selected Scenario owner/Variant routed by the workspace `README.md`, without requiring physical relocation of the first Variant.

**Resulting Current Meaning:** while the root design is selected, its root Scenario file owns current detailed behavior; if a nested Variant becomes selected, that Variant's Scenario file owns current detailed behavior, and the workspace `README.md` routes to exactly one selected Scenario owner/Variant.

### LOG-APP-005 — Apply selected Scenario Variant authority correction

**Type:** APPLIED  
**Applied From:** `LOG-APP-004`  
**ChangeSet:** `0d9755c0-0cb1-46ae-bf71-cbb4d4ee63e7`  
**Package:** `4cc7b799-275f-4cb0-9d1a-01b3c7b876e8`  

**Target-State Result:** after successful Apply of this package:
- detailed-planning core, the Scenario Draft template and the specialized SDS profile agree that current detailed Scenario behavior is owned by the currently selected Scenario owner/Variant, not unconditionally by the root Scenario file;
- the original/root first Variant may remain physically at the workspace root after another integrated Variant is selected;
- workspace `README.md` navigation routes to exactly one current selected Scenario owner/Variant, preserving explicit selected/not-selected/candidate Variant state without introducing duplicate current authority.

**Rationale:** keep Scenario semantic authority consistent with the already-selected Variant lifecycle while preserving the intentionally optional physical relocation of the first Variant.


### LOG-APP-006 — Application Concept bridge, Scenario semantics and Idea-finding traceability

**Type:** IDEA REVIEW  
**Source:** current planning discussion covering bidirectional Idea/Q/R/P discoverability, real-world problem-resolution workflows and open solution slots, viable existing-solution comparison, Application Concept/Concept Features, feasibility/cost reasoning, Scenario/read-only boundaries, reciprocal Screen/Scenario coverage and cross-file Reference Object Candidate discovery  

**Current Conclusions:**
- every material Idea-linked Q/R/P remains discoverable from its affected Idea(s): one Related Idea gets a full same-Finding-ID mirror, while several Related Ideas share one full aggregate finding plus lightweight same-ID references in every affected Idea; mirrors/references are projections of one logical finding and follow its resolution lifecycle;
- whole-solution planning may model a real-world problem-resolution Workflow with lightweight `Open Solution Slot` surfaces where a meaningful intermediate result is known but the mechanism is not; Slots can be filled by process/manual routes, existing tools/services, integrations, Application Concepts or hybrids and do not create a mandatory entity/stage;
- existing solutions that still materially satisfy the relevant Need/Slot remain `viable` alternatives and stay in comparison while a custom Application Concept is being evaluated;
- `Application Concept` is a distinct candidate-app planning responsibility: it states the life/workflow simplification, what the application would let users do/know/obtain, Concept Features, interaction hypotheses, technical feasibility, dependencies/unknowns, rough development effort/time/complexity, maintenance/support burden and comparison against viable alternatives before detailed application planning;
- early Concept estimates use rough ranges/relative bands plus assumptions/evidence/confidence; decision-sensitive feasibility uncertainty routes to research/prototype rather than false precision;
- `Application Concept Feature` is scoped to the Concept as a capability/value hypothesis and does not create a mandatory global Feature layer or 1:1 Feature→Use Case→Scenario→Slice chain;
- after a custom Concept is selected (or application creation is already externally mandated), Application responsibility and candidate Application Use Cases are grounded in real-world Needs/results before optional Spine and Scenario discovery;
- Scenario identity is a meaningful user-world Need + user/actor-visible behavior or information interaction + independently meaningful observable result; informational/read-only behavior can be a Scenario when understanding itself is a meaningful result, while commands, buttons, Screens, API/database/backend operations and technical procedures do not become Scenarios merely because they are addressable;
- every material Scenario↔Screen relationship is discoverable from both owners without transferring behavioral authority to the Screen; a coverage matrix may exist only as a derived projection;
- low-level owners explicitly review cross-file dependencies for Reference Object Candidates; a consumer-side candidate note identifies a source owner/use mode but does not create a second canonical definition or a live Linked Notes Reference Object.

**Questions / Risks / Problems:**  
No material unresolved issues identified.

### LOG-APP-007 — Apply Application Concept bridge and detailed planning traceability

**Type:** APPLIED  
**Applied From:** `LOG-APP-006`  
**ChangeSet:** `7a2834e0-4e61-4a79-9e43-d499ad2bc4a0`  
**Package:** `4eca35aa-9d7a-46d4-850c-ff1b6f20884e`  

**Target-State Result:** after successful Apply of this package:
- reusable Idea/File Update/ReviewDiff methodology owns bidirectional Idea↔Q/R/P discoverability with one logical Finding ID and cardinality-sensitive mirror/reference behavior;
- whole-solution planning explicitly models real-world workflows/Open Solution Slots, keeps viable existing alternatives in comparison and can review a custom Application Concept before selecting custom application ownership;
- Application Concept has a reusable recommended template covering value/simplification, Concept Features, interaction hypotheses, technical feasibility, rough development/maintenance burden, estimate confidence and comparison against viable alternatives;
- Application planning routing exposes `UC-PLAN-APP-CONCEPT` and an explicit Concept→Application responsibility→Application Use Case→Spine/Scenario bridge without making those capabilities mandatory stages;
- Scenario semantics explicitly support independently meaningful informational/read-only outcomes while preventing command/action/UI/implementation identity from mechanically becoming Scenario identity;
- detailed planning requires reciprocal Scenario↔Screen discoverability and provides consumer-side cross-file dependency / Reference Object Candidate surfaces without changing Linked Notes runtime/registry state;
- the FixFlow worked example demonstrates real-world workflow Slots, viable SaaS comparison, Application Concept/Features/feasibility, selected application responsibility, candidate Use Cases, informational Scenario behavior, command-vs-Scenario boundaries, reciprocal Screen coverage and consumer-side RO-candidate discovery.

**Rationale:** keep application planning anchored in the best real-world way to satisfy the Need, make custom-app value/feasibility explicit before low-level behavior planning, and strengthen cross-owner traceability without reviving generic Planning Draft or mandatory Feature layers.


### LOG-APP-008 — Prototype, Requirements, Domain/Slice planning and focused Use-Case activation

**Type:** IDEA REVIEW  
**Source:** current planning discussion + material result of `собери идеи` covering planning Use Cases, Prototype layer, Spine semantics, Requirements, Change Axes, implementation-scoped Ideas, project-local planning zones, Domain/Slice planning and Planning Helper semantic activation  

**Current Conclusions:**
- planning capabilities are independently activatable where they have distinct useful planning results: Whole Solution, Application Concept, Prototype, Scenario Discovery, detailed Scenario, Domain, Slice Strategy, one Implementation Slice and consistency review; Scenario DATA/Behavior remain inside Scenario planning rather than separate Use Cases;
- `Spine Pass` / `Spine Walkthrough` is only a discovery method inside Prototype/Scenario Discovery and is not a Scenario type, canonical owner or standalone `UC-PLAN-SPINE`;
- interaction/workflow Prototype planning is the provisional bridge between selected Application Concept/responsibility and canonical detailed Scenario/Screen planning; Prototype Scenarios (`PSCN-*`) and Prototype Screens (`PSCR-*`) are revisable evidence/design and do not become current `SCN-*` / `SCR-*` authority automatically;
- technical feasibility spikes may remain inside Application Concept/research, while interaction/workflow Prototype work may discover candidate Requirements, Scenario DATA/Behavior, Future Scenario Ideas and Change Axes;
- `Requirement` is a must-hold condition/property/constraint distinct from Need/Scenario identity; one canonical Requirement owner is linked by consumers and candidate/current status + expected stability are recorded proportionally;
- Future Scenario Ideas remain ordinary Ideas until selected as current behavior, and `Change Axis` is evidence-backed expected-variation context used to evaluate change propagation rather than an instruction to generalize now;
- early implementation thoughts remain generic Ideas with implementation scope/placement instead of introducing a separate `Implementation Idea` ontology; selected meaning is promoted into the real Domain/Slice/other owner;
- project-local planning may use `solution-and-application/` and `domain-and-implementation/` as two physical zones with root idea/requirement/change-context intake, while folder placement does not create semantic ownership or a registered parallel-work scope;
- Domain planning explicitly derives stable semantics/invariants/policies from current Scenarios/Requirements, stress-tests only justified likely evolution and rejects premature generalization;
- Slice planning has two distinct outcomes when useful: `UC-PLAN-SLICE-STRATEGY` selects vertical decomposition/order, while `UC-PLAN-SLICE` plans one selected separately deliverable/checkable increment; frontend/server/verification files remain implementation parts rather than separate planning Use Cases;
- Screen owns selected spatial requirements (zones/hierarchy/placement/visibility/layout states), Scenario/Behavior owns behavioral conditions/results, and frontend Slice planning owns implementation mechanisms;
- Planning Helper semantic Use-Case activation should focus a chat on one stable UC ID, resolve the current canonical registry entry/Main Owner route dynamically, support Adaptive/Full read depth and grant no executable-command/repository permissions.

**Questions / Risks / Problems:**  
No material unresolved issues identified.

### LOG-APP-009 — Apply Prototype/Requirement/Domain/Slice planning and focused Use-Case activation

**Type:** APPLIED  
**Applied From:** `LOG-APP-008`  
**ChangeSet:** `21955477-e109-45da-a6a6-e290ea5a3a81`  
**Package:** `ec8d0557-b81b-44ed-8498-f189f3ff261d`  

**Target-State Result:** after successful Apply of this package:
- reusable Application Planning routes explicitly through optional interaction/workflow Prototype planning before canonical Scenario/Screen planning when uncertainty warrants it;
- `UC-PLAN-SPINE` is retired and Spine Pass/Walkthrough is documented only as a supporting discovery method;
- `UC-PLAN-PROTOTYPE` and reusable Prototype workflow/plan/result shapes own provisional Prototype Scenario/Screen evidence and promotion into current Requirements/Scenarios/Screens;
- Requirements, Future Scenario Ideas, Change Axes and implementation-scoped Idea placement have one canonical cross-cutting owner, including the optional two-zone project-local topology;
- Scenario/Screen templates expose Requirement/prototype/change-context traceability while preserving behavior-vs-spatial-vs-frontend implementation ownership;
- Domain planning has a dedicated workflow/template emphasizing stable semantics, invariants vs policies, justified likely evolution and premature-generalization checks;
- `UC-PLAN-SLICE-STRATEGY` + a Slice Strategy template/workflow separate decomposition/order from `UC-PLAN-SLICE` planning of one integrated increment;
- the specialized Scenario/Domain/Slice profile/field kit and FixFlow practical example demonstrate the same Prototype → Requirement/Scenario/Screen → Domain → Slice Strategy → Slice route;
- Planning Helper `0.25.0` projects the current Application Planning Use Cases including Application Concept/Prototype/Slice Strategy, omits `UC-PLAN-SPINE`, and inserts focused semantic Use-Case bodies with dynamic current-owner route resolution, Adaptive/Full read semantics and an explicit no-command-permission boundary;
- helper tests/verification cover canonical Use-Case parity and focused semantic body routing, and the generated userscript is rebuilt from modular source;
- full cross-scope work history is owned here while reusable-documentation and Planning Helper scope logs contain reference-only entries.

**Rationale:** make the planning route explicit from application concept through provisional user-experience discovery into current requirements/behavior/spatial meaning, then design Domain and delivery boundaries for simple current implementation plus justified evolution without conflating discovery methods, requirements or implementation thoughts with Scenarios.


### LOG-APP-010 — ReviewDiff correct empty Prototype starter draft state

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `21955477-e109-45da-a6a6-e290ea5a3a81`, package `ec8d0557-b81b-44ed-8498-f189f3ff261d`  

**Material Finding / Selected Correction:** `drafts/prototype-plan.md` and `drafts/prototype-result.md` are explicitly empty starter drafts, but each currently states `No material unresolved issues identified.` as a literal conclusion. That overstates evidence because no draft-specific review has happened yet. Keep the templates' conditional `If none: No material unresolved issues identified.` guidance for reviewed drafts, but make the empty starter files neutral with `not reviewed / not provided` until their own planning/review establishes a truthful Q/R/P state.

**Resulting Current Meaning:** an empty starter draft does not claim that review found no material issues; it preserves an explicit not-yet-reviewed/not-provided baseline until the draft is populated and reviewed.

### LOG-APP-011 — Apply empty Prototype starter draft state correction

**Type:** APPLIED  
**Applied From:** `LOG-APP-010`  
**ChangeSet:** `21955477-e109-45da-a6a6-e290ea5a3a81`  
**Package:** `c74161d4-3902-466f-a8d3-bcadb1782237`  

**Target-State Result:** after successful Apply of this package:
- `drafts/prototype-plan.md` and `drafts/prototype-result.md` remain empty starter drafts but use `not reviewed / not provided` under `Questions / Risks / Problems` instead of asserting that no material unresolved issues exist;
- reusable Prototype templates keep their conditional reviewed-state guidance, so a populated/reviewed draft may still state `No material unresolved issues identified.` when that conclusion is actually established;
- all other Prototype/Requirement/Domain/Slice planning and focused Use-Case activation meaning from `LOG-APP-008` / `LOG-APP-009` remains unchanged.

**Rationale:** preserve truthful draft state and distinguish `not yet reviewed` from an evidence-backed `reviewed with no material unresolved issues` conclusion.

### XREF-002 — Workspace Architecture Planning foundation and application handoffs

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-011`  
**Reason:** Application Planning gains Domain Discovery / Application Realization and consumes generic Architecture Change-Axis/path semantics as part of the same cross-scope Architecture Planning foundation ChangeSet. Full Idea Review, clarification and applied-state history are owned by the canonical reusable-documentation log entry.

### XREF-003 — Architecture Planning integration corrections

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-013`  
**Reason:** Application Planning templates are synchronized with the Domain Verification / Realization / Slice complexity semantics of the same Architecture Planning ChangeSet. Full ReviewDiff correction reasoning and applied-state history are owned by the canonical reusable-documentation log entry.



### LOG-APP-012 — Scenario-first planning, Domain state discovery, Testing foundation and Review Dependencies

**Type:** IDEA REVIEW  
**Source:** current planning discussion after the Workspace Architecture Planning foundation, including explicit user clarifications and checked reusable material from `AlexPastukhh/enman@my-changes` for Domain/Slice/Testing/source-dependency methodology  

**Current Conclusions:**
- Application behavior is owned directly by Application Scenarios; the separate Application Use-Case semantic layer is removed for migrated/current application-planning and selected application scopes;
- Scenario planning proportionally reviews user/actor effort across actions, choices, information/context load, repeated entry, switches, waits, retries/recovery, forced technical understanding and irreversible actions;
- `Workspace Change Case` is the canonical Architecture term for a concrete significant architecture-relevant Workspace change, including rare/one-off change;
- Workspace Use-Case Discovery becomes the independent `UC-PLAN-ARCH-WORKSPACE-USES` capability and `workspace-use-case-discovery-workflow.md` becomes its Main Owner;
- Architecture Decisions route selected meaning to the narrowest real semantic owner and use Primary Decision Scope/Owner/Affected Owners, keeping a separate Architecture Decision owner only when the decision is genuinely cross-owner or independently reviewable/navigable;
- Prototype integrated alternatives use the existing Planning Unit Variant mechanism; no Prototype-specific Variant ontology is introduced;
- the named Spine methodology is retired; rough representations/walkthroughs remain ordinary proportional discovery techniques;
- Domain Discovery gains proportional behavior-evidence classification, State/Condition Matrix analysis and separate Impossible State/Combination Review so invariants/lifecycle/policies/no-write guarantees are systematically discovered rather than only recorded after intuition;
- reusable Testing Planning becomes peer Direction `DIR-PLAN-TESTING` with independent `UC-PLAN-TEST-STRATEGY`, `UC-PLAN-TEST-DESIGN` and `UC-PLAN-TEST-COVERAGE`; test layers remain techniques/responsibility zones rather than Use Cases;
- Testing Planning preserves Behavior Coverage vs Test Coverage, Behavior-to-Test Trace, concrete assertions, Escape Risk, Refactor Risk, public-boundary proof, no-mutation proof, idempotency/no-op and stable/unrelated-state safety, focused regression guards, representative coverage, paired cross-side proof, API/component/E2E boundaries, test-object boundaries, test-data/isolation rules and explicit planned/implemented/checked/executed evidence states;
- Slice planning distinguishes Scope, Behavior Coverage and Test Coverage and explicitly routes out-of-scope behavior plus material proof design;
- reusable Documentation gains `UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES`: source changes can require explicit downstream semantic review even without a materialized literal Reference Object use;
- Review Dependencies do not create blind transitive avalanches: A change makes direct consumer B need review; cascade continues only if B review changes B meaning;
- Reference Objects remain the stronger exact-materialized-reference mechanism and already include stale detection plus consumer semantic-review needs before synchronization;
- Field Kits are retired as an active documentation type; useful meaning is moved into current owners/workflows/profiles rather than preserved as another bootstrap layer;
- Planning Helper and Linked Notes migrate to Scenario Catalogs; Replacement Package App is explicitly excluded from this migration and remains an unmigrated application-Use-Case exception until separately selected.

**Questions / Risks / Problems:**  
No material unresolved issues identified for this selected documentation/methodology transition. Linked Notes Review Dependency runtime/schema/UI/test details are deliberately delegated to separate future application implementation planning and are not claimed as current behavior.

### LOG-APP-013 — Maximize reusable testing extraction and delegate Linked Notes Review Dependency implementation

**Type:** IDEA CLARIFICATION  
**Updates:** `LOG-APP-012`  

**Clarification:**
- extract as much generic useful Testing Planning meaning as practical from the checked Enman material rather than carrying only a thin verification paragraph; keep project/technology-specific ASP.NET/Vite/LocalDB/Playwright setup details out of reusable core while retaining reusable API/integration, E2E and Test Object guidance;
- do not create one Use Case per test layer: shared strategy, behavior-specific proof design and actual-evidence coverage review are the independently useful planning results;
- configure mandatory downstream review as a reusable Workspace/Documentation capability and use Linked Notes as the selected future mechanism; the semantic review itself is performed by the affected real owner/another chat rather than by the configuration capability;
- record the Linked Notes Review Dependency feature in its roadmap without implementing runtime code or prematurely creating a current Scenario before the separate implementation-planning chat establishes the actual actor path;
- preserve the explicit `planning/documentation/tools/replacement-package-app/**` exclusion, including its unrelated local build/smoke working-tree state.

### LOG-APP-014 — Apply scenario-first planning, Testing foundation and review-dependency methodology

**Type:** APPLIED  
**Applied From:** `LOG-APP-012`, `LOG-APP-013`  
**ChangeSet:** `bcf47f72-a79a-430a-ba8c-9b5b566f57c1`  
**Package:** `f408c34c-210e-4a9c-93aa-6b648a795475`  

**Target-State Result:** after successful Apply of this package:
- root/reusable navigation supports Workspace/methodology Directions through Use-Case Registries and Application Directions through Scenario Catalogs, and exposes the new Testing Planning Direction;
- reusable Application Planning has no separate Application Use-Case layer, Scenario owns application behavioral identity, Scenario actor effort is reviewable, Prototype uses generic Planning Unit Variants and named Spine methodology is absent;
- Workspace Architecture Planning has six UCs including Workspace Use-Case Discovery, uses `Workspace Change Case`, and Architecture Decision routing preserves narrow semantic ownership;
- Domain Discovery provides explicit State/Condition Matrix and Impossible State/Combination techniques feeding lifecycle/invariant/policy/no-write/consistency meaning;
- `planning/documentation/testing-planning/` owns reusable Testing Strategy, Test Design and Current Test Coverage/Evidence Review plus supporting API/integration, E2E and Test Object guidance;
- Slice/Domain/Application-Realization owners hand off material proof design to Testing without making tests semantic authority;
- reusable Documentation exposes `UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES` and a Review Dependency workflow integrated with Reference Object semantics;
- active Field Kit files and their obsolete source-usage examples are removed while current workflows/profiles remain authoritative;
- Planning Helper and Linked Notes application Directions route to Scenario Catalogs and current Scenario owners, Planning Helper semantic projection omits migrated `UC-PH-*`/`UC-LN-*` application identities while preserving Workspace/planning UCs and the explicitly excluded Replacement Package App projection;
- Linked Notes roadmap records Required Review Dependencies as selected future functionality with runtime implementation delegated to a separate chat; no Linked Notes runtime/schema/UI implementation is claimed by this package;
- Documentation Workbench compatibility headers point to the current Linked Notes Scenario Catalog without changing Workbench Use-Case semantics;
- all affected registered scope logs point to this canonical applied entry; Replacement Package App and `.linked-notes/` repository state are unchanged.

**Rationale:** consolidate the selected Scenario/Architecture/Domain/Slice methodology, recover mature reusable testing reasoning from the Enman reference, and turn semantic dependency-review needs into an explicit tool-backed capability without duplicating semantic authority or prematurely implementing Linked Notes runtime work.


### LOG-APP-015 — ReviewDiff correct destructive terminology cleanup and incomplete Scenario-first migration

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `bcf47f72-a79a-430a-ba8c-9b5b566f57c1`, package `f408c34c-210e-4a9c-93aa-6b648a795475`  

**Material Findings / Selected Corrections:**
- terminology cleanup accidentally removed the complete `text` field from three user-authored Planning Helper prompt records; restore those prompt files exactly to their pre-package content because prompt text is user content, not semantic-authority cleanup surface;
- retiring the old setup layer removed whole classification/bootstrap statements from reusable documentation workflows and left empty/dangling sections; preserve the useful owner-placement/setup meaning in current workflows/profiles/templates instead of deleting the surrounding rule;
- named-Scaffold cleanup damaged the practical Collect-Ideas example and left unlabeled/numbering gaps in Prototype guidance; remove obsolete example bodies coherently and preserve only ordinary rough walkthrough/sketch/representation evidence without creating a named planning entity;
- the Scenario-first migration was incomplete in several active Application Planning owners (`Application Use-Case Registration`, candidate `Use Cases`, Concept Feature / Prototype references); route application behavioral identity directly through Application Scenarios and Scenario Catalogs everywhere in active methodology;
- fix the duplicate Planning Helper Scenario-Catalog route and a stray Tampermonkey README backtick discovered in the same ReviewDiff.

**Resulting Current Meaning:** the selected Scenario-first / Testing / Review-Dependency methodology remains unchanged. This correction restores lost user content and makes the active documentation internally match that already-selected meaning; it does not add a new capability or reopen the selected architecture.

### LOG-APP-016 — Apply ReviewDiff correction for preserved content and Scenario-first consistency

**Type:** APPLIED  
**Applied From:** `LOG-APP-015`  
**ChangeSet:** `bcf47f72-a79a-430a-ba8c-9b5b566f57c1`  
**Package:** `5db46ddc-cd7f-4258-8ec6-ffb6edc9c835`  

**Target-State Result:** after successful Apply of this correction package:
- all three affected Planning Helper prompt records again contain their exact pre-package user-authored `text`;
- reusable documentation bootstrap/responsibility-zone guidance preserves owner classification and setup handoff without reviving the retired setup-only owner layer;
- Portable Starter Kit and reusable routing distinguish Workspace/methodology Use-Case Registries from Application Scenario Catalogs;
- Prototype/Scenario guidance uses ordinary rough walkthrough/sketch/representation only as disposable discovery evidence, with no named scaffold entity and no malformed empty sections caused by cleanup;
- active Application Planning no longer contains an Application Use-Case registration layer or candidate Application Use-Case identities; Application behavioral identity is Scenario-first throughout the corrected owners/templates/examples;
- the Collect-Ideas practical example is structurally coherent after retirement of obsolete scaffold-specific example Ideas;
- Planning Helper/Tampermonkey navigation wording is syntactically clean;
- no Linked Notes runtime/application files, Replacement Package App files or `.linked-notes/` repository-state files are changed by this correction.

**Rationale:** correct information loss and cleanup drift from the first package while preserving the already selected methodology and keeping the correction limited to affected planning-root/reusable-documentation/Application-Planning scopes.


### LOG-APP-017 — ReviewDiff correct two residual Scenario-first cleanup duplicates

**Type:** REVIEW DIFF  
**Reviewed:** ChangeSet `bcf47f72-a79a-430a-ba8c-9b5b566f57c1`, correction package `5db46ddc-cd7f-4258-8ec6-ffb6edc9c835`  

**Material Findings / Selected Corrections:**
- Planning Helper `README.md` still lists `scenarios/README.md` twice in the Structure block because the deleted `USE-CASE-REGISTRY.md` row was mechanically replaced rather than removed; keep one Scenario Catalog row;
- `APPLICATION-CONCEPT-DRAFT-TEMPLATE.md` contains two consecutive `≠ Scenario` boundary rows after removal of the Application Use-Case layer; keep one Scenario boundary row.

**Resulting Current Meaning:** no methodology choice changes. This is a mechanical consistency correction of the already-selected Scenario-first model.

### LOG-APP-018 — Apply residual Scenario-first cleanup correction

**Type:** APPLIED  
**Applied From:** `LOG-APP-017`  
**ChangeSet:** `bcf47f72-a79a-430a-ba8c-9b5b566f57c1`  
**Package:** `499aff12-0a41-4fd2-9544-40a8febec361`  

**Target-State Result:** after successful Apply of this correction package:
- Planning Helper `README.md` contains one `scenarios/README.md` Structure entry followed by `MANUAL-ACCEPTANCE.md`;
- Application Concept boundaries contain one `≠ Scenario` row and no duplicate left by Application-Use-Case retirement;
- no Linked Notes files/action-log, reusable-documentation parent files, Planning Root files, Replacement Package App files or `.linked-notes/` repository-state files are changed.

**Rationale:** finish the two residual mechanical cleanup corrections identified by semantic ReviewDiff without changing the selected Scenario-first / Testing / Review-Dependency methodology.

### XREF-004 — Directed accumulating SDS planning and reusable Goal Map retirement

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-030`  
**Reason:** Application Planning registry/navigation/responsibility and profile routing change as part of the same cross-cutting SDS/UCDS + AI reviewability transition, including retirement of the reusable Goal Map. Full rationale and applied target state are owned by the canonical reusable-documentation log.

### XREF-005 — SDS profile-family routing and planning-state correction

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-032`  
**Reason:** Application Planning read-order/profile guidance participates in the same ReviewDiff correction; full findings and applied target state are owned by the canonical reusable-documentation log.

### XREF-006 — UC/Scenario-first planning and methodology integration

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-036`  
**Reason:** Application Planning Domain/Realization/Slice owners participate in the same owner-first planning transition; full current rationale, testing/dependency/WEUC integration meaning and APPLIED target state are owned by the reusable-documentation log.


### XREF-007 — Complete same-quality Application SDS and WEUC evidence integration

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-044`  
**Reason:** Application Planning registry/direction/read-order/profile routing and Step 0–4 SDS semantics participate in the same current-plan, WEUC-evidence, practical-testing and manual-command transition; full clarification and APPLIED target state are owned by the reusable-documentation canonical log.

### XREF-008 — Correct Application SDS package-log coherence

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-046`  
**Reason:** Application Planning removes the duplicate `XREF-007` produced by the original package and records the log-coherence correction without changing SDS/WEUC semantics.
