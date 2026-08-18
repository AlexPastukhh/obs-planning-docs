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
