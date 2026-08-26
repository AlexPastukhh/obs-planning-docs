# IDTSPE Modular Rules, Validators And Composition Model

Status: conceptual correction after `idtspe-coherent-model-v2.md`  
Purpose: separate semantic evaluation Lenses from process/output correctness checks and define a reusable compositional rule system for IDTSPE and documentation methodology.  
Repository mutation: none.

---

# 1. Main Correction

`Target Contract & Coverage Lens` from v2 mixed two different responsibilities:

```text
A. Is this the correct Target / Scope / meaning?
B. Did the command/engine represent the already-selected Target completely and correctly?
```

These are not the same question.

A belongs to planning evaluation:

```text
Need / Value / Scope
+ target-family semantic reasoning
```

B belongs to execution/conformance validation:

```text
Projected Target Decision State
+ Target Contract
↓
render/save/project
↓
Validator checks:
  did we preserve every required semantic part?
  did we omit anything?
  did we save it in the correct canonical owners?
```

Therefore `Target Contract & Coverage` should **not** remain a peer planning Lens.

---

# 2. Two Fundamental Families

## 2.1 Evaluation Modules

They help make a planning choice.

Primary reusable type:

```text
LENS
```

Examples:

```text
Need / Value / Scope
Authority / Source-of-Truth / Reuse
Evidence / Uncertainty / Reversibility
Decision Compatibility & Revalidation
Dependency & Change Impact
Workspace Evolution / WEUC
Proof / Verification / Operability
Constraint / Delivery
Security / Performance / ...
```

They answer:

```text
What should influence the Decision?
What Problems/Risks/Questions should we discover?
Which Idea is preferable?
Should an earlier Decision reopen?
```

## 2.2 Conformance / Correctness Modules

They check that IDTSPE or a command was executed correctly.

Primary reusable types:

```text
VALIDATOR
GUARD
```

They answer:

```text
Did we perform the required methodology correctly?
Did we preserve/save/project the result correctly?
Did we violate a rule or permission boundary?
```

Examples:

```text
Target Projection Completeness Validator
Source Contract Validator
Q/R/P Lifecycle Validator
Decision Persistence Validator
Idea Retention Validator
Evidence Trace Validator
WEUC Reconciliation Validator
Dependency Recording Validator
Pre-Update Completeness Validator
Permission Guard
Current-vs-Projected Separation Guard
Semantic Authority Guard
```

This is the missing abstraction.

---

# 3. Generic Reusable Rule Module

A broader abstraction can contain every reusable methodology rule without pretending every rule is a Lens.

Working term:

```text
Planning Rule Module
```

Conceptual contract:

```text
RuleModule:
  id
  type:
    LENS
    VALIDATOR
    GUARD
    TRANSITION_RULE
    PERSISTENCE_RULE
    DERIVATION_RULE
    SELECTION_RULE
    RECONCILIATION_RULE
    PERMISSION_RULE
    PROJECTION_RULE
    HANDOFF_RULE

  purpose
  appliesWhen
  lifecyclePhase
  targetFamilies
  inputs
  requiredContext
  rule / prompts / checks
  output
  severity:
    advisory | review-required | blocking
  failureDisposition
  evidenceProduced
  relatedModules
  semanticOwner
```

Not every physical repository implementation needs all fields.

This is the **conceptual compositional model**.

---

# 4. Why This Is Better Than Making Everything A Lens

If every rule becomes a Lens, responsibilities blur.

Example:

```text
WEUC Lens
→ compares candidate architecture choices

Target Projection Completeness
→ does not compare candidate choices
→ checks whether output lost selected meaning
```

Likewise:

```text
Source-of-Truth Lens
→ helps decide which meaning should be trusted

Source Contract Validator
→ checks that required Sources were actually resolved,
   typed and disclosed
```

And:

```text
Evidence / Uncertainty Lens
→ helps determine what Evidence is needed

Evidence Trace Validator
→ checks that Evidence actually remains linked
   to the Q/R/P / Idea / Decision it affected
```

Same subject area, different responsibility.

---

# 5. Proposed Rule Module Types

## 5.1 `LENS`

Evaluation perspective.

Produces:

- Q/R/P;
- comparison criteria;
- Evidence needs;
- revalidation findings;
- Idea refinements.

## 5.2 `VALIDATOR`

Checks a completed/intermediate artifact/state against a contract.

Examples:

- Target representation complete?
- required Sources resolved?
- every material Decision persisted?
- every residual Q/R/P retained?
- WEUC impact reconciled?

Produces:

```text
PASS
WARNING / GAP
FAIL / BLOCK
```

plus exact findings.

## 5.3 `GUARD`

Protects an invariant or boundary during execution.

Examples:

```text
no repository mutation in plan-only command
SHOW CURRENT must not manufacture projected changes
downstream target must not silently redefine upstream owner
projection must not become semantic authority
Review Dependency must not be inferred from ordinary semantic link
```

## 5.4 `TRANSITION_RULE`

Defines legal movement between states.

Examples:

```text
Idea accepted
→ Decision created
→ unresolved material Idea Q/R/P transfers to Decision

Evidence challenges Decision
→ reopen narrowest choice level

INTEGRATE
→ preserve existing valid meaning by default
```

## 5.5 `PERSISTENCE_RULE`

Defines what must remain durable after a planning pass.

Examples:

```text
accepted Decision
residual Decision Q/R/P
useful fallback Ideas
material Evidence links
Accepted WEUC Impact
Source provenance
```

## 5.6 `DERIVATION_RULE`

Defines allowed semantic derivation direction.

Example SDS:

```text
Scenario
→ Behavior/DATA
→ Domain
→ Slice
```

Not:

```text
Slice implementation preference
→ silently redefine Scenario
```

## 5.7 `SELECTION_RULE`

Defines applicability/composition.

Examples:

```text
workspace-like Target
→ include WEUC modules

high-risk irreversible choice
→ include Evidence/Reversibility

simple read-only current view
→ omit Idea/Decision planning modules
```

## 5.8 `RECONCILIATION_RULE`

Defines comparison and response after realization.

Example:

```text
Projected WEUC Impact
vs
Observed WEUC Evidence
→ reconcile WEUC State

Projected Target
vs
Actual Realization
→ ACCEPT / LOCAL CORRECTION / REOPEN
```

## 5.9 `PERMISSION_RULE`

Explicit capability boundary.

Examples:

```text
Pre-Update = plan-only
replacement package command ≠ apply locally
review-only route ≠ mutation permission
```

## 5.10 `PROJECTION_RULE`

Defines how planning state is transformed into canonical Target representation.

Example:

```text
Target Decision State
+ Target Contract
→ Scenario/Slice/Documentation files
```

## 5.11 `HANDOFF_RULE`

Defines required downstream/sibling review/action.

Examples:

```text
material WEUC impact
→ architecture/WEUC handoff

Target change affecting tests
→ testing handoff

changed semantic source with explicit review dependents
→ dependent review handoff
```

---

# 6. Target Correctness vs Target Projection Correctness

This distinction should be explicit.

## Target semantic correctness

Questions:

```text
Did we choose the right Need?
Did we choose the right Target/Scope?
Did we ask the right RQs?
Did we choose good answers?
Does the resulting semantic Target make sense?
```

Handled by:

```text
Lenses
+ Q/R/P
+ Evidence
+ Decisions
+ Target-specific methodology
```

## Target projection / representation correctness

Questions:

```text
Did we show the full selected Target?
Did we include every required semantic section?
Did we preserve all accepted unchanged meaning?
Did we place meaning under correct canonical owners?
Did generated/files projections match Decision State?
```

Handled by:

```text
Target Projection Completeness Validator
+ Target Contract
+ Projection Rules
```

This is not another opinion about the Target.

It is a check that the command did not lose/corrupt the Target while rendering/saving it.

---

# 7. Core Validators Suggested By Accumulated IDTSPE Work

## V1 — Target Projection Completeness Validator

Inputs:

```text
Target Decision State
Target Contract
Current Target for INTEGRATE
Projected Target / rendered output
```

Checks:

- every required/proportional semantic area represented;
- no selected Decision omitted;
- no accepted meaning silently changed;
- preserved meaning remains;
- target-specific required source coverage visible where required;
- delegated/later/outside/non-goals preserved;
- required proof/handoffs represented;
- no local Idea list substituted for full canonical Target.

Example failure prevented:

```text
собери идеи слайса
→ implementation ideas only
→ missing Scenario / Behavior / Requirements / Domain / Slice coverage
→ FAIL Target Projection Completeness
```

Possible name alternatives:

```text
Target Representation Validator
Target Projection Validator
Target Materialization Completeness Validator
Target Output Conformance Validator
```

Best current working name:

```text
Target Projection Conformance Validator
```

because "completeness" is only one part of correctness.

## V2 — Source Contract Validator

Checks:

- Target Type resolved;
- required/proportional Source roles considered;
- actual Sources named;
- authority correctly classified;
- Current Target used for INTEGRATE;
- practical evidence not mistaken for semantic owner;
- canonical Source not replaced by projection/example/history;
- missing/stale required Source surfaced;
- Source provenance available.

## V3 — Q/R/P Lifecycle Validator

Checks:

- concrete concern has correct owner;
- pre-decision concern attached to candidate;
- accepted Decision receives unresolved material residual concern;
- resolved concern does not remain falsely active;
- residual Q/R/P includes future review/Evidence logic when material;
- Q, R and P semantics are not conflated;
- no "shared Q/R/P" stored as ownerless finding when it is really a Lens prompt.

## V4 — Concern Group Validator

Checks:

- group has a genuine shared resolution surface;
- mixed Q/R/P allowed;
- group did not steal member ownership;
- duplicate group/member storage avoided;
- resolved/stale trace status is consistent;
- Decision links to affected concerns/groups when material.

## V5 — Decision Persistence Validator

Checks:

- every material accepted choice is represented as Decision;
- rationale/provenance stored where material;
- supersession/replacement explicit;
- residual Q/R/P attached;
- relevant Evidence linked;
- accepted WEUC impact linked when architecture/workspace relevant;
- Decision not replaced by assistant recommendation.

## V6 — Saved Idea / Alternative Validator

Checks:

- useful alternatives/fallbacks retained when required by residual Risk or expensive rediscovery;
- unrelated brainstorm junk not persisted merely because generated;
- saved Idea keeps own Q/R/P/Evidence where material;
- deferred vs rejected meaning preserved.

## V7 — Evidence Trace Validator

Checks:

- Evidence identity/source preserved;
- relation to Q/R/P/Decision explicit;
- observed fact not rewritten into unsupported semantic conclusion;
- expected Evidence contracts closed/updated when evidence arrives;
- practical evidence routed to correct owner/revalidation surface.

## V8 — WEUC Loop Validator

Checks:

```text
Current WEUC Source reviewed?
Projected WEUC Impact produced when material?
Accepted impact captured with Decision?
Observed WEUC Evidence collected after realization when available?
WEUC State reconciled?
No-impact explicitly valid?
```

Also checks that Projected Impact is not treated as current observed truth.

## V9 — Dependency Relation Validator

Checks:

- semantic dependency not confused with Review Dependency;
- Reference Object only for shared literal/exact meaning;
- bounded review dependency used only when applicable;
- ordinary navigation not inflated into freshness obligation;
- actual affected consumers identified proportionally;
- canonical owner remains single.

## V10 — Pre-Update Conformance Validator

Checks all eight planned parts when material:

```text
Owner / Reuse
Source / Dependency
WEUC / Workspace Evolution Impact
File / Artifact Relation
Freshness / Review
Generated Projection / Index
Ordered File Update
Validation / Closure
```

## V11 — Permission Guard

Checks command-specific authority:

- read-only stays read-only;
- plan-only stays plan-only;
- package build does not apply;
- review command does not mutate;
- mutation does not imply commit/push;
- no permission inherited from downstream operation accidentally.

## V12 — Mode Separation Validator

Checks:

```text
SHOW CURRENT
≠ CREATE
≠ INTEGRATE
≠ REALIZATION
≠ REVIEW
```

Examples:

- SHOW CURRENT must not invent Decisions;
- INTEGRATE must have Current Target baseline;
- CREATE must not pretend an absent Current Target exists;
- ReviewDiff does not silently become target mutation.

---

# 8. Rule Packs / Presets

This is the reusable modularity the discussion is converging on.

Instead of a monolithic workflow containing every check:

```text
IDTSPE Core Rule Pack
+
Target-family Rule Pack
+
Workspace Rule Pack
+
Repository/Documentation Rule Pack
+
Security/Performance/etc packs
+
Command-specific Permission Pack
```

Each pack selects reusable modules.

Example:

## Generic Material IDTSPE Core Pack

```text
Need/Value/Scope Lens
Authority/Source-of-Truth/Reuse Lens
Evidence/Uncertainty/Reversibility Lens
Decision Compatibility/Revalidation Lens

Source Contract Validator
Q/R/P Lifecycle Validator
Decision Persistence Validator
Target Projection Conformance Validator
Mode Separation Validator
```

## Workspace / Codebase Pack

```text
Workspace Evolution / WEUC Lens
Dependency & Change Impact Lens
Proof / Verification / Operability Lens

WEUC Loop Validator
Dependency Relation Validator
```

## Documentation / Repository Pack

```text
Authority/Source Lens
Dependency & Change Impact
Workspace Evolution / WEUC

Target Projection Conformance
Source Contract Validation
Dependency Relation Validation
Pre-Update Conformance
Permission Guards
projection/index validation
```

## Slice Pack

```text
SDS Source/derivation rules
Slice Target Contract
Slice RQ archetypes
Slice-specific Proof Lens prompts
Target Projection Conformance:
  Scenario coverage
  Behavior coverage
  Requirements
  Domain
  vertical boundary
  dependencies/handoffs
  implementation/proof
```

---

# 9. Command Composition

A command can be understood as a composition of reusable Rule Modules and adapters.

Example conceptual command:

```text
собери идеи слайса
```

Composition:

```text
route / permission contract

+ IDTSPE Core Pack
+ Application SDS topology
+ Slice Target Contract
+ Slice Source Contract
+ Slice Lens Pack
+ Workspace/WEUC Pack when material
+ Slice RQ archetypes
+ Idea Review module
+ Target projection adapter
+ Target Projection Conformance Validator
+ persistence validators
+ Pre-Update handoff
```

This makes omitted stages easier to detect **without requiring hand-authored command graphs**.

The composition can be derived from rule/preset declarations and optionally rendered later.

---

# 10. Documentation Methodology As Composable Rules

The repository already approximates this architecture:

```text
templates own shape
workflows own process
models own concepts
registries own identity/navigation
commands own invocation/permission routing
Linked Notes owns projection/freshness infrastructure
```

The new insight is to make reusable **methodological rules/checks explicitly composable**.

A methodology owner can expose:

```text
Concept definitions
Rule Modules
Target Contract
Source Contract
Lens Pack
Validation Pack
Permission rules
Handoffs
```

Then commands/UCs compose those pieces instead of copying prose.

This does not mean one giant global registry owns all semantics.

Semantic owners remain local.

A registry/index may provide discovery of reusable modules.

---

# 11. Principle Collection / Rule Library

A future reusable library can contain different rule kinds.

Example:

```text
RULE: preserve accepted prior meaning
type: TRANSITION_RULE

RULE: downstream must not silently redefine upstream owner
type: GUARD / DERIVATION_RULE

RULE: review recurring workspace change cost
type: LENS

RULE: accepted unresolved Risk must define reconsideration evidence
type: PERSISTENCE_RULE + VALIDATOR

RULE: Current Target required in INTEGRATE
type: MODE_VALIDATOR

RULE: semantic relation does not imply Review Dependency
type: DEPENDENCY_GUARD

RULE: Projected WEUC Impact is not Current WEUC State
type: STATE_GUARD

RULE: Projected Target must satisfy canonical Target Contract
type: PROJECTION_VALIDATOR

RULE: Pre-Update does not grant mutation
type: PERMISSION_RULE
```

This is more precise than calling all of them principles or lenses.

---

# 12. Reusable Rule Composition Is Itself A Planning Concern

The system should be modular, but not every module should be manually selected every time.

Selection sources:

```text
IDTSPE core
+ command route
+ Target Type / Target Contract
+ Planning Topology stage
+ Source applicability
+ environment type:
    workspace / docs / code / application / ...
+ discovered risk/evidence
+ explicit user choice
```

Thus:

```text
rule module library
↓
applicability/resolution
↓
Rule Set for current IDTSPE instance
```

This can be checked by a `Rule Set Applicability Validator`.

---

# 13. Possible Meta-Validator: Rule Set Coverage

If modularity becomes first-class, one more validator becomes useful:

```text
Rule Set Coverage Validator
```

Question:

```text
Did this invocation activate all rule modules
that its Target / Mode / Sources / environment require?
```

Example:

```text
Target = documentation methodology
Mode = INTEGRATE
Environment = repository/workspace
↓
required:
  Source Contract
  current target baseline
  WEUC applicability check
  dependency check
  persistence checks
  Target projection validation
  permission guard
```

If WEUC module was accidentally omitted:

```text
FAIL / GAP:
  required Workspace Rule Pack not applied
```

This may be more valuable than a manually maintained composition graph.

---

# 14. Module Validation Enables Automated Methodology Tests

Once rules have identities and applicability, semantic tests become possible.

Examples:

```text
TEST:
  every INTEGRATE command composes CURRENT_TARGET validation

TEST:
  every plan-only command composes mutation Permission Guard

TEST:
  every workspace-oriented target composes WEUC applicability rule

TEST:
  every Idea-driven Target projection composes Q/R/P persistence validator

TEST:
  every Slice target composes Slice Target Contract Conformance validator

TEST:
  every Review Dependency declaration points to a supported review obligation
```

This moves documentation correctness from prose-only review toward executable/inspectable methodology validation.

---

# 15. Relationship To Existing Templates / Workflows

Do not duplicate their authority.

A rule module can be:

- defined inside an existing workflow/model owner;
- referenced by a Target Contract;
- reused by several commands/UCs;
- indexed/generated for discovery.

Example:

```text
Slice workflow
owns:
  Slice Target Contract
  Slice-specific derivation rules
  Slice validation rules

Generic IDTSPE methodology
owns:
  generic Source/QRP/Decision/Mode rules

Architecture methodology
owns:
  WEUC Lens + WEUC loop rules

Documentation methodology
owns:
  dependency/freshness/Pre-Update rules
```

Then:

```text
собери идеи слайса
```

composes them.

No duplicate semantic owner is created.

---

# 16. Recommended Terminology

Current recommendation:

```text
Rule Module
  generic superclass / conceptual category

Lens
  evaluation module

Validator
  checks state/output/process conformance

Guard
  prevents invalid action/state transition

Rule
  transition/persistence/derivation/permission/etc invariant

Pack / Preset
  reusable composition of modules
```

Avoid calling all checks `Lens`.

Avoid calling all rules `Validator`.

---

# 17. Revised Lens Inventory After This Correction

Remove:

```text
Target Contract & Coverage Lens
```

Replace with:

```text
Target Projection Conformance Validator
```

Current peer Lens candidates:

```text
CORE / NEAR-CORE

1. Need / Value / Scope
2. Authority / Source-of-Truth / Reuse
3. Evidence / Uncertainty / Reversibility
4. Decision Compatibility & Revalidation

CONTEXTUAL

5. Dependency & Change Impact
6. Workspace Evolution / WEUC
7. Proof / Verification / Operability
8. Constraint / Delivery
9+. specialized domain-quality Lenses
```

Whether `Decision Compatibility & Revalidation` is core/default for all material planning or primarily INTEGRATE/reconciliation can still be tested.

---

# 18. Key Validators After This Correction

Strong generic candidates:

```text
Source Contract Validator
Q/R/P Lifecycle Validator
Decision Persistence Validator
Target Projection Conformance Validator
Mode Separation Validator
Rule Set Coverage Validator
```

Contextual:

```text
Concern Group Validator
Saved Idea Validator
Evidence Trace Validator
WEUC Loop Validator
Dependency Relation Validator
Pre-Update Conformance Validator
Permission Guard
Target-family Conformance Validator
```

A Target-family Conformance Validator can specialize the generic Target Projection Validator.

---

# 19. Important Distinction: Validator Does Not Decide Meaning

Example:

```text
Slice Decision:
  BI-7 belongs in later Slice
```

Validator does not argue whether that Decision is wise.

Planning Lenses do.

Validator checks:

```text
was BI-7 silently omitted from the rendered Slice plan?
or explicitly represented as later/delegated/outside per contract?
```

Likewise:

```text
Decision:
  keep duplicate implementation intentionally
```

DRY/WEUC planning may decide this is correct.

Validator must not reject it simply because duplication exists.

Validator checks the methodology result, not aesthetic preference.

---

# 20. Open Questions

## Q-RULE-01 — Repository representation

Should Rule Modules have stable IDs/metadata or remain prose sections with generated indexing?

## Q-RULE-02 — Minimal module schema

How much structured metadata is worth persisting?

## Q-RULE-03 — Pack representation

Should presets/packs be explicit declarations or derived from Target Contract/workflow references?

## Q-RULE-04 — Automated semantic tests

Which rules are precise enough to test mechanically?

## Q-RULE-05 — Rule Set Coverage

Can applicability be checked without creating another brittle global authority?

## Q-RULE-06 — Linked Notes role

Can Linked Notes index:

```text
modules(target)
validators(command)
lenses(target)
sources(target)
handoffs(target)
```

without owning semantics?

## Q-RULE-07 — Graphs

Does derived module composition make explicit command/UC graphs unnecessary or merely easier to generate?

Still open.

---

# 21. Current Direction

The reusable documentation architecture is moving toward:

```text
semantic owners
  define concepts/contracts/rules
↓
reusable Rule Modules
  Lens / Validator / Guard / Transition / Persistence / ...
↓
Rule Packs / Target presets
↓
UC / command composition
↓
IDTSPE instance
↓
validation of both:
  planning quality
  execution/conformance quality
```

This permits adding/removing/applying checks proportionally without copying methodology.

The key invariant is:

```text
modularity
≠ centralize semantic authority
```

Reusable modules can be discovered centrally while their semantic definitions remain with the correct owners.
