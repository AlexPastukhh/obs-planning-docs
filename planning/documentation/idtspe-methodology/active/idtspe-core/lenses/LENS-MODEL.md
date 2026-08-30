# IDTSPE Lens Model

Status: active generic methodology owner

## 1. Definition

```text
Lens
= reusable evaluation/discovery perspective
  applied inside IDTSPE to material IDTSPE State Units
  and/or Target Step Result Units
```

A Lens may contribute explanatory Broad Discussion analysis and Key Points without creating any Unit. It may also discover materially actionable meaning concerning Evidence needs, Idea refinements, Q/R/P, comparison dimensions, Decision inputs, revalidation signals and supporting-artifact guidance. Only meaning that needs ownership/State/lifecycle disposition crosses the Finding Candidate boundary; Generic Core Finding Disposition resolves that destination. The Lens does not define Unit kinds or own disposition.

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
  Slice Outcome Definition
  Responsibility / Dependency Boundary
  Runtime Path
  Codebase Integration Path

Conditional:
  Focused Part Plan(s)

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

## 9. Generic Choice Lifecycle

```text
Need grounding
→ Target / Scope
→ Source Contract
→ RQ / Question-Set Decision
→ Ideas / Branches
→ Lens evaluation + Evidence
→ material implications surface as Finding Candidates
→ Core Finding Disposition
→ accepted/refined State such as Idea / Q/R/P / Evidence / Answer Decision when warranted
→ Target projection
→ revalidation readiness
```

Typical use:

```text
L1–L3 → core checks across Target/Scope, RQ and Idea choice
Documentation / Representation → required check when material output may persist
L4 → structured dependency/change impact is material
L5 → Workspace evolution/WEUC/architecture pressure/work-cost is material
Simplicity → candidate structure may contain avoidable abstractions/steps/entities
Linked Notes Usage → material cross-owner navigation/backlink/query need is proposed
L6 → proof/observation/diagnosis/operation is material
Target-profile Lens Packs → selected Target family or independently applicable context
```

## 10. Finding → Disposition / Resolution / Target Formation

```text
Lens operation
→ Finding Candidate
→ Core Finding Disposition
   materiality / affected meaning / semantic owner / State-lifecycle consequence
→ normal State/Decision resolution when material
→ existing Result Unit update only where the Target contract owns that accepted meaning
```

When a finding exposes independently substantial unresolved work, disposition may surface a **Target Formation candidate**. Target Formation then decides whether to reuse an existing Target, hand off to an existing owner, or form a bounded child/local Target.

```text
Lens activation ≠ new Target Instance
Lens finding ≠ new Target automatically
Target Formation candidate ≠ automatic child Target
```

## 11. Artifact / File Ownership Boundary

A separate file does not determine whether a Target Module or Lens should propose it. The **meaning being persisted** determines guidance ownership.

### Target Module AP-* owns representation of Target output

A Target Module may propose:

```text
canonical Target result owner
target-result registry/coordinator
supporting representation intrinsic to the Target result
```

Example:

```text
TM-TEST-STRATEGY
→ TEST-STRATEGY.md
→ optional TEST-REALIZATION-MAP.md

because proof allocation / test class / setup / fixture / harness / helper topology
is part of the Test Strategy result itself.
```

### Lens AG-* owns supporting / artifact-placement guidance for Lens findings

A Lens may propose:

```text
supporting artifact for a finding produced by that perspective
likely existing/global semantic-owner hint plus unresolved/route placement guidance
evidence/supporting map that remains non-authoritative
```

It must **not** duplicate the Target Module's AP merely to say “put the accepted Target result back into its Target owner”.

A reusable Lens must contain exactly one `## Artifact / File Implications` section, but it may contain **zero or more** structured `ARTIFACT_GUIDANCE` records.

Valid no-record case:

```text
Artifact / File Implications:
  NONE / NO_DISTINCT_SUPPORTING_ARTIFACT

Reason:
  Core Finding Disposition resolves the semantic owner;
  when the current Target owns accepted meaning, its Target Module/local contract already owns representation and no distinct Lens supporting artifact is needed.
```

When structured guidance exists, source fields remain:

```text
ID
CONTENT_KIND
WHEN
GUIDANCE
PERSISTENCE_GUIDANCE
PLACEMENT_DIRECTIVE
SEMANTIC_OWNER
REPRESENTATION
FILE_OR_ARTIFACT
CONTENT
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

A Lens cannot create semantic authority; P-14/TF-10 resolves actual persistence/placement after the Documentation / Representation check.

## 12. Literal Example — Domain Evolution Companion Is Lens Guidance

```text
Current Target:
  CaptureItem Domain owner

TM-DOMAIN-DRAFT owns:
  what CaptureItem means now
  invariants / state / consistency / relationships
  representation of that current Domain result

L5 / WEUC Lens surfaces:
  a future-evolution Finding Candidate carrying
  + offline-synchronization path proposal
  + change-isolation concern
  + transition-trigger context
→ Core Finding Disposition
→ accepted local evolution meaning when CaptureItem/current Domain Target is resolved as owner
→ AG-L5-02 may propose a supporting evolution representation
→ Documentation / Representation + P-14 / TF-10 decide no persistence vs embedded Evolution section vs `CaptureItem.evolution.md`
```

```text
CaptureItem.evolution.md
= selected/materialized supporting representation of accepted local evolution meaning
≠ direct L5 / WEUC Lens output
≠ Domain Target output
≠ another Domain semantic owner
≠ AP requirement of TM-DOMAIN-DRAFT
```

## 13. Literal Example — Slice Evolution Companion Is Lens Guidance

```text
SL-CAP-01
= current Slice owner

L5 discovers:
  credible future PDF/offline extension paths
  + prepared seams
  + revalidation triggers

→ Finding Candidate
→ Core Finding Disposition
→ accepted local evolution meaning when the Slice/current Target is resolved as owner
→ `AG-L5-02` may propose a distinct supporting evolution representation
→ Documentation / Representation + P-14 / TF-10
→ optional embedded Evolution section OR materialized SL-CAP-01.evolution.md
```

The evolution companion is a selected/materialized representation of accepted local evolution meaning proposed through L5 `AG-L5-02`; it is not direct L5 output and is not proposed by `TM-IMPLEMENTATION-SLICE` or the Slice Verticality Lens. The Slice Target Module continues to own the current Useful Vertical Result / Runtime / Codebase Integration Path.

## 14. WEUC / Architecture Boundary

```text
TM-WEUC
→ owns/updates SDS-WORKSPACE-EVOLUTION.md

LENS-WORKSPACE-EVOLUTION-ARCHITECTURE
→ consumes the current map
→ evaluates another Target/Idea/Decision against it
→ surfaces target-local evolution Finding Candidate(s) and, when warranted, a separate map/global-architecture update Finding Candidate with TM-WEUC as a likely-owner hint
→ Core Finding Disposition resolves accepted local evolution meaning / actual local-or-global owner / lifecycle consequence
→ when local evolution meaning is accepted and the current Target is resolved as owner, AG-L5-02 may propose one local supporting evolution representation
→ Documentation / Representation + P-14 / TF-10 decide persistence/placement
```

Architecture Decisions remain ordinary Answer Decisions inside the current Target unless Core Finding Disposition surfaces a Target Formation candidate and Target Formation decides that independently material architecture work warrants a separate bounded Target.

## 15. Linked Notes Boundary

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

## 16. Revalidation Is Not A Peer Lens

Revalidation is a Decision lifecycle mechanism. L3 may surface Finding Candidates carrying revalidation-signal meaning; Core Finding Disposition decides whether accepted revalidation State is created/refined. Uncertainty/Reversibility ≠ Revalidation.

## 17. User Questions

```text
Lens Prompt ≠ RQ ≠ Q/R/P Question ≠ User Question
```

## 18. High-Level Composition Example

Suppose a Scenario Target uses `TM-SCENARIO-PLANNING`. Required Core Lenses are checked, while Scenario boundary/behavior/decomposition checks run as the Target Module's own Evaluation rather than through a Scenario-specific Lens. The Lens Applicability Scan may additionally select Quality/Risk, Practical Evidence, L4 or another registered Lens when Scope/Sources/Evidence make it material; UI/DDD/Slice/Evolution/Test Lenses are not attached merely because those concerns are downstream consumers.


## Migration Compatibility

The new Lens contract separates `Analysis Surface + Lens operations + Findings` from Core Finding Disposition.

Current conformance state after the SDS profile migration:

```text
all 6 SDS-specific reusable Lenses
→ explicit Analysis Surface
→ explicit Supported Operations
→ explicit Finding Contract

Core generic Lens bodies
→ remain readable through their current Target Inputs / prompts / findings
  until a separate literal Core-Lens conformance pass is useful
```

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

## 19. Maintenance

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
