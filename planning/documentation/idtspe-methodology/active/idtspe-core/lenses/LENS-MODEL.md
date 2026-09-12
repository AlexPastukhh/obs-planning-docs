# IDTSPE Lens Model

Status: active generic methodology owner

## 1. Definition

```text
Lens
= reusable evaluation/discovery perspective
  applied inside IDTSPE to material IDTSPE State Units
  and/or Target Step Result Units
```

A Lens may contribute explanatory Broad Discussion analysis and Key Points without creating any Unit. It may also discover materially actionable meaning concerning Evidence needs, Proposal refinements, Q/R/P, comparison dimensions, Decision inputs, revalidation signals and supporting-artifact guidance. Only meaning that needs ownership/State/lifecycle disposition crosses the Finding Candidate boundary; Generic Core Finding Disposition resolves that destination. The Lens does not define Unit kinds or own disposition.

```text
Lens ≠ Target Module
Lens ≠ Target Instance
Lens ≠ Resolution Slot
Lens ≠ Validator
Lens ≠ Guard
Lens ≠ selected Decision
```

A reusable Lens has two deliberately separate parts:

```text
Lens
=
Operational Evaluation Contract
+
Knowledge Basis
```

## 1A. Relationship To Use Cases / Contextual Composition

A Lens is a specialized methodology component reached from a Documentation/IDTSPE Use-Case Process or another canonical component route. It is **not** a functional Use Case and does not decide whether IDTSPE itself is active.

```text
Use-Case Process / methodology registry routing
→ decides whether the Lens Registry should be consulted
→ selects plausibly relevant Lens entry

concrete Lens Applicability Gate
→ confirms local applicability

Lens Operational Evaluation Contract
→ owns how to analyze/check/refine/challenge the selected surface
```

The fundamental situational question "how much methodology is useful now?" belongs to [`../shared/contextual-methodology-application-contract.md`](../shared/contextual-methodology-application-contract.md) + `UC-IDTSPE-COMPOSE-CURRENT-WORK`, not to a recursive meta-Lens.


The Operational Evaluation Contract owns **how and when to look**. The Knowledge Basis explains **which principles/rules/theory/pattern knowledge make that evaluation credible**.

This separation prevents a Lens from becoming an unstructured dump of theory while still allowing a thin Lens to keep a small self-contained body of principles inline.

## 2. Ownership Rule

```text
reusable generic Lens operational knowledge → active/idtspe-core/lenses/
profile-specific Lens operational knowledge → active/profiles/<profile>/lenses/
Target Module → Lens Profile / attachment policy
local-only Lens → module only while genuinely non-reusable

Knowledge Basis
→ may be embedded in the Lens
→ or referenced from separate principle/theory/reference owners
→ or combine both
```

A Target Module may say **that** a Lens is required/conditional for its Target family. The Lens owns **what applying that perspective means**.

If a local Lens becomes useful in a second Target family, review it for extraction.

## Registry Selection Boundary

A registry row is only lightweight routing metadata. Selecting a Lens row does not execute the Lens and does not force a Finding. Read/execute the concrete Lens body only when the active Use-Case Process and the Lens's own applicability gate make it relevant. `NO_MATERIAL_LENS` is a normal proportional outcome.

## 3. Activation Classes

### REQUIRED_CORE

Required Core checks are part of every material IDTSPE lifecycle, but not all run at the same moment. L1–L3 check material choice surfaces; Documentation / Representation is the required output/materialization check. Required does not mean that a finding must be manufactured.

Valid outcomes:

```text
inherited / satisfied
no material issue
material finding
```

Current Core Pack:

```text
L1 Need / Value / Scope
L2 Authority / Source-of-Truth / Reuse
L3 Uncertainty / Assumption / Reversibility
Documentation / Representation / Artifact Boundary
```

L3 may close as `no material uncertainty`. Documentation / Representation may close as `NO_PERSISTENCE_NEEDED` or `IMPLEMENTATION_NATIVE`; it does not force file creation.

### FREQUENT_CONDITIONAL

Applicability gate is checked proportionally when the context makes the perspective plausible.

Core reusable frequent set:

```text
L4 Dependency & Change Impact
L6 Verifiability / Observability / Operability
Quality / Risk Materiality
```

Installed profiles may contribute additional frequent conditional Lenses. The current SDS profile contributes:

```text
L5 WEUC / Target Evolution / Architecture Fitness + Workspace work-cost
Simplicity / Implementation Economy / Evolution-Safe Simplification
```

### TARGET_PROFILE_REUSABLE

Reusable Lens Pack associated with one or several Target families. Target Modules reference it but do not own its prompts or Knowledge Basis.

### LOCAL_ONLY

May stay inside one module while genuinely unique. Reuse is a promotion signal.

## 4. Operational Evaluation Contract

Every reusable Lens file explains proportionally:

```text
Lens ID / Name
Activation
Purpose / Evaluation Objective
Applicability Gate
Target Inputs / Evidence
Prompts / Sublenses / Evaluation Workflow
Broad Discussion / Key Points contribution when useful
Findings / Outputs
Typical Consumers
Guards / Anti-patterns
Composition
Escalation / Revalidation
Artifact / File Implications
Knowledge Basis
Provenance
```

`Target Inputs / Evidence` means current planning/implementation material consumed by the Lens. It is intentionally distinct from the Lens's own `Knowledge Basis`.


## 4A. Analysis Surface / Operations / Finding Contract

The operational contract must make clear:

```text
1. what the Lens analyzes;
2. which generic Lens operations it supports;
3. what explanatory analysis/Key Points it may contribute;
4. what kinds of material findings it can surface.
```

Canonical Unit model: [`../shared/idtspe-unit-and-target-step-result-model.md`](../shared/idtspe-unit-and-target-step-result-model.md).  
Canonical producer/Core bridge: [`../shared/finding-disposition-contract.md`](../shared/finding-disposition-contract.md).

### Analysis Surface

Use proportionally:

```text
Primary Result Units / semantic selectors
Conditional Result Units
Relevant State Units
Context
```

A target/profile-specific Lens should name known Result Units/fields when practical.
A generic Core Lens may use semantic selectors because it cannot know every profile schema.

Example:

```text
Slice Verticality Lens

Primary Result Units:
  Outcome / semantic obligations / proof intent
  Uses / Ownership Boundary
  optional Runtime Path
  Evolution Steps

Relevant State:
  Questions
  Risks / Problems
  Decisions
  Evidence
  Revalidation state

Context:
  Scenario
  Domain
  Screen
  current implementation/workspace
```

Context availability does not imply auditing all of it.

### Supported Operations

Generic operation vocabulary:

```text
ANALYZE
CHECK
REFINE
CHALLENGE
```

Meanings:

```text
ANALYZE
→ inspect the Analysis Surface through this perspective

CHECK
→ evaluate current meaning against Lens criteria/guards

REFINE
→ identify/propose more precise or missing meaning
  where the semantic destination is already understood

CHALLENGE
→ seek reasons selected/accepted meaning may be wrong,
  weak, stale or unsupported
```

A Lens need not support every operation.

### Typical Findings / Finding Contract

A reusable Lens should explain the recurring finding families it can surface. Ordinary useful analysis is not automatically a Finding Candidate; it may remain Broad Discussion/Key Points when no semantic ownership/State/lifecycle consequence is needed.

A finding may include proportionally:

```text
Meaning
Affected Unit(s) / fields — when known
Evidence / rationale
Materiality hint — optional
Likely semantic owner — optional hint
Suggested lifecycle consequence — optional hint
```

Those hints do not grant authority.

### Broad Discussion / Integration Checkpoint contribution

Lens application may be useful even when no State changes:

```text
Lens analysis / trade-off explanation / examples
→ Broad Discussion
→ Key Points for the logical discussion part
→ no Unit / no Finding Candidate required
```

At an Integration Checkpoint, the same Lens may help check the integrated Generic State + Target Result. Only a material newly surfaced semantic consequence needing disposition becomes a Finding Candidate. A checkpoint may therefore report `no material finding` while still including useful Lens analysis.

Canonical interaction model: [`../shared/broad-discussion-and-integration-checkpoint-model.md`](../shared/broad-discussion-and-integration-checkpoint-model.md).

### Core Finding Disposition

The Lens stops at the finding boundary.

```text
Lens
→ Broad Discussion / Key Points when explanatory only
→ Finding Candidate when material semantic disposition is needed

Core
→ materiality / ownership / State-lifecycle disposition
→ normal resolution
→ existing Result Unit update when warranted
```

Therefore the following are not Lens methods:

```text
State-Unit routing
External Routing
REOPEN
AFFECT / UPDATE AFTER RESOLUTION
Target Formation
```

A Lens may expose a finding that *leads* to those outcomes, but Core owns the disposition/lifecycle.

### Result ownership guard

```text
Lens application
≠ permission to silently invent
  a new Target Step Result Unit
  a new target-result field
  a Lens-owned canonical result section
```

If repeated findings reveal missing target-result meaning:

```text
revise the Target Module/Local Contract
OR
let Core Finding Disposition resolve another owner
OR
keep the meaning in generic State Units
```

## 5. Knowledge Basis

A reusable Lens may carry a `Knowledge Basis` when reusable theory/reference knowledge materially supports the evaluation. The shared [`Knowledge Basis guidance`](../shared/knowledge-basis-contract.md) keeps theory separate from current Target inputs while allowing consumer-specific selection and interpretation. There is no required mode enum or field schema.

Lens-specific specialization:

```text
Target Inputs / Evidence
→ current Target material consumed by this evaluation

Lens Knowledge Basis
→ reusable principles/rules/theory/pattern knowledge
  used to perform this evaluation
```

Important boundaries:

```text
Knowledge Basis reference ≠ Target Source / current Target input
raw theory ≠ operational Lens authority
referenced theory/principle owner ≠ permission to copy its full body into every Lens

Lens → owns applicability + evaluation + findings
Knowledge owner → owns referenced principle/rule/theory meaning
```

Knowledge may stay inline, point to theory files/folders/sections, use a separate applied Knowledge Basis, or combine these forms. Existing `INLINE / REFERENCED / HYBRID` labels remain compatible representation only. If material cannot yet be reduced to a stable evaluation objective + applicability gate + findings contract, keep it as theory/reference material instead of pretending it is already a Lens.

## 6. Lens Applicability Scan / TF-06A LENS_SET

IDTSPE does **not** select Lenses only through a Target Module.

`TF-06A LENS_SET` owns one proportional **Lens Applicability Scan**:

```text
Current Target / Target candidate / Local Target Contract
↓
1. include/check REQUIRED_CORE Lenses
↓
2. apply active Target Module Lens Profile when a module is used
   REQUIRED_BY_TARGET_PROFILE
   + module-declared conditional Lens gates
↓
3. scan registered Core Lens Library by applicability summary/gate
↓
4. scan active-profile Lens registries by applicability summary/gate
↓
5. include explicitly requested Lens perspectives
↓
6. read full Lens body / referenced Knowledge Basis only for
   selected or plausibly applicable candidates
↓
7. resolve TF-06A LENS_SET
```

Useful applicability outcomes:

```text
REQUIRED_CORE
REQUIRED_BY_TARGET_PROFILE
APPLICABLE
NOT_MATERIAL
NOT_APPLICABLE
EXPLICITLY_REQUESTED
DEFERRED
```

The scan is evaluative, not a ritual to run every Lens body.

```text
registered Lens exists ≠ apply it
Lens considered ≠ full Lens body must be read
Lens applicable ≠ Lens finding must be manufactured
```

Lens selection itself may become a material Resolution Question for high-impact/ambiguous Targets. Simple cases inherit required/module-attached Lenses mechanically and only scan plausible conditional candidates.

## 7. Lens Profile In A Target Module

A Target Module contains one concise `Lens Profile` with direct relative links to reusable Lens files. It does not duplicate full reusable prompts or Knowledge Basis.

```text
P-06 Lens Port
→ TF-06A LENS_SET
→ Lens Applicability Scan
→ required Core Pack
    L1/L2/L3 across material choice surfaces
    + Documentation / Representation at materialization
  + Target Module Lens Profile when a reusable module is active
  + applicable frequent/reusable Core Lenses
  + applicable profile-specific Lenses
  + explicitly requested Lens
  + exceptional local-only Lens when genuinely needed
```

`TF-06A LENS_SET` is recomputed when material Target Scope / Sources / Questions change. The resulting Lens Set is contextual, not a fixed ritual.

## 8. Target Module / Local Target Contract Relation

A reusable Target Module is helpful but not mandatory for material IDTSPE work.

```text
recurring Target family with useful reusable contract
→ Target Module

one-off / unusual bounded planning result
→ Local Target Contract

both
→ full IDTSPE lifecycle
→ TF-06A Lens Applicability Scan
```

A Local Target Contract may select any registered Core/profile Lens whose applicability gate is satisfied. It does not need a fake Target Module merely to gain access to reusable Lenses.

## 9. Choice-Lifecycle Participation

The Lens model does not own the generic Target/Proposal/Decision lifecycle. Canonical candidate/selection semantics are in [`../shared/proposal-and-decision-lifecycle-contract.md`](../shared/proposal-and-decision-lifecycle-contract.md); Target Formation and Shell resolution remain owned by their Core contracts.

Lens-local participation is only:

```text
current Analysis Surface / candidate choice
→ Lens evaluation
→ explanatory analysis OR material Finding Candidate
→ Core Finding Disposition when needed
→ normal Core/owner resolution outside the Lens
```

Typical Lens packs may attach at different choice surfaces, but that attachment does not make the Lens owner of the surrounding lifecycle.

## 10. Finding → Disposition Boundary

A Lens stops at explanatory analysis or a Finding Candidate. Canonical ownership/State/lifecycle disposition, handoff and Target Formation consequences are owned by [`../shared/finding-disposition-contract.md`](../shared/finding-disposition-contract.md).

```text
Lens activation ≠ new Target Instance
Lens finding ≠ accepted Decision
Lens finding ≠ Result Unit mutation
Finding Candidate ≠ automatic child Target
```

## 11. Artifact / File Ownership Boundary

A Lens may contribute **supporting representation guidance for findings produced by that perspective**, but it does not own the generic placement schema or final destination resolution. Canonical `ARTIFACT_GUIDANCE`, placement-status, precedence and P-14 / TF-10 semantics are owned by [`../shared/artifact-placement-and-idtspe-response-contract.md`](../shared/artifact-placement-and-idtspe-response-contract.md).

Lens-local responsibility is limited to:

```text
should this perspective suggest a distinct supporting representation at all?
what finding/supporting meaning would that representation carry?
under what Lens-local condition is the suggestion relevant?
```

A valid Lens outcome is `NONE / NO_DISTINCT_SUPPORTING_ARTIFACT`. A Lens never creates semantic authority, overrides an existing Target/owner, or duplicates a Target Module's canonical result representation merely to restate where accepted Target meaning belongs.

If a Lens needs structured artifact guidance, it conforms to the canonical `ARTIFACT_GUIDANCE` interface owned by the placement contract instead of redefining that interface here.

Example boundary:

```text
Evolution Lens finds future change pressure
→ Finding Candidate / accepted owner meaning first
→ Lens may suggest a companion/supporting projection when independent addressability helps
→ Documentation / Representation + P-14 decide whether/how it persists
```

## 12. Evolution / Architecture Boundary

```text
L5 Evolution / Change Isolation
→ evaluates accepted/planned future-change pressure inside a natural Target
→ surfaces Finding Candidates
→ Core Finding Disposition resolves local meaning/owner/lifecycle
→ Target Formation handles an independently substantial cross-owner architecture problem
```

A Lens does not own a global evolution map, current global architecture position or target-local evolution artifact. Representation follows the natural owner after accepted meaning exists.

## 13. Linked Notes Boundary

Linked Notes are evaluated as a **usage/navigation capability**, not as a file family.

```text
existing canonical owners / stable IDs / relations
+ material cross-owner navigation/query need
→ LENS-LINKED-NOTES-USAGE-JUSTIFICATION
→ linked-notes-usage Finding Candidate carrying JUSTIFIED_LINKED_NOTES / NOT_JUSTIFIED / existing-mechanism / likely-owner context
→ Core Finding Disposition resolves accepted Decision/State input + semantic owner/lifecycle consequence
→ Documentation / Representation + P-14 / TF-10 only when durable representation/placement is useful
```

The Lens must not create `notes/` or `linked-notes/` trees or route semantic ownership itself.

## 14. Revalidation Is Not A Peer Lens

Revalidation is a Decision lifecycle mechanism. L3 may surface Finding Candidates carrying revalidation-signal meaning; Core Finding Disposition decides whether accepted revalidation State is created/refined. Uncertainty/Reversibility ≠ Revalidation.

## 15. User Questions

```text
Lens Prompt ≠ RQ ≠ Q/R/P Question ≠ User Question
```

## 16. High-Level Composition Example

Suppose a Scenario Target uses `TM-SCENARIO-PLANNING`. Required Core Lenses are checked when their corresponding material surfaces exist, while Scenario journey-composition work remains owned by the Target Module itself. Feature behavior remains Feature authority; the Scenario may only reference participating Feature results and compose actor/external links, order/branch/convergence, continuity and terminal Benefit. The Lens Applicability Scan may additionally select Quality/Risk, Practical Evidence, UI, Vertical Slice, Evolution, Test Proof or another registered Lens when the current Analysis Surface makes that perspective material. No Lens is attached merely because its topic could become relevant downstream.


## Migration Compatibility

The Lens contract separates `Analysis Surface + Lens operations + Findings` from Core Finding Disposition.

Current conformance is **registry-driven rather than count-driven**:

```text
every Lens currently listed in the SDS Lens Registry
→ explicit Analysis Surface
→ explicit Supported Operations
→ explicit Finding Contract

Core generic Lens bodies
→ remain readable through their current Target Inputs / prompts / findings
  until a separate literal Core-Lens conformance pass is useful
```

Mechanical registry/file parity and snapshot counts belong to [`../shared/active-methodology-mechanical-consistency-check.md`](../shared/active-methodology-mechanical-consistency-check.md), not to this semantic contract.

Compatibility interpretation for any reusable Lens body not yet rewritten literally:

```text
Target Inputs / Evidence
→ Context + current analysis subject

Prompts / Evaluation Workflow
→ infer Analysis Surface from Lens purpose

Findings / Outputs
→ Finding Candidates

accepted finding that changes current Target meaning
→ Core Finding Disposition
→ normal resolution
→ existing Result Unit update when warranted

Artifact / File Implications
→ remains current P-14 / TF-10 guidance
```

New or materially revised Lens files should make Analysis Surface, supported operations and Finding Contract explicit.

## 17. Maintenance

Creation/review/promotion of a reusable Lens is owned by [`../shared/lens-creation-and-integration-use-case.md`](../shared/lens-creation-and-integration-use-case.md).

Mechanical checks should verify:

```text
Knowledge Basis is present when reusable theory/reference knowledge materially helps the Lens
Knowledge Basis representation is free-form; theory references and applied interpretation are proportional to usefulness
every reusable Lens has one Artifact / File Implications section
new/materially revised Lens declares Analysis Surface + Supported Operations + Finding Contract explicitly
Lens does not define State Unit kinds or Target Result Unit kinds
zero or more AG-* records are allowed
every AG-* describes Lens-produced supporting / artifact-placement meaning rather than duplicating Target-result AP
Target Module Lens Profiles resolve to registered Lens owners
TF-06A can discover applicable registered Lenses even without a Target Module
```
