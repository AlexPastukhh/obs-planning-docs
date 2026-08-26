# IDTSPE Lens Model

Status: active generic methodology owner

## 1. Definition

```text
Lens
= reusable evaluation/discovery perspective
  applied to a Target / Scope candidate / RQ / Idea / Branch / Decision / Evidence set
```

A Lens may produce findings, Evidence requests, Idea refinements, Q/R/P, comparison dimensions, Decision inputs, revalidation signals and supporting-artifact guidance.

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

## 5. Knowledge Basis

Every reusable Lens contains exactly one explicit `## Knowledge Basis` conforming to the shared [`Knowledge Basis Contract`](../shared/knowledge-basis-contract.md). Target Modules use the same literal sub-contract and modes:

```text
INLINE | REFERENCED | HYBRID

Embedded Principles / Rules / Theory
Referenced Knowledge Owners
Reference Load Policy
Operationalization Notes
```

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

A thin Lens may use `INLINE`. A detail-heavy Lens may use `HYBRID` or `REFERENCED`. If material cannot yet be reduced to a stable evaluation objective + applicability gate + findings contract, keep it as a Theoretical Module/reference package instead of pretending it is already a Lens.

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
→ Answer Decisions
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

## 10. Finding → Decision / Escalation

```text
Lens finding
→ Evidence / Idea / Q/R/P
→ Answer Decision in current Target authority
```

Open a bounded child/local Target only when the exposed problem has independent useful output, meaningfully distinct Sources/owner boundary, material choice space and separate revalidation value.

```text
Lens activation ≠ new Target Instance
Lens finding ≠ new Target automatically
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

### Lens AG-* owns representation/routing of Lens findings

A Lens may propose:

```text
supporting artifact for a finding produced by that perspective
route to an existing/global semantic owner
evidence/supporting map that remains non-authoritative
```

It must **not** duplicate the Target Module's AP merely to say “put the accepted Target result back into its Target owner”.

A reusable Lens must contain exactly one `## Artifact / File Implications` section, but it may contain **zero or more** structured `ARTIFACT_GUIDANCE` records.

Valid no-record case:

```text
Artifact / File Implications:
  NONE / RETURN_TO_TARGET_OWNER

Reason:
  Lens findings feed the current Target;
  the Target Module/local contract owns representation of accepted Target meaning.
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

L5 / WEUC Lens finds:
  a material future offline-synchronization path
  + change-isolation requirement
  + transition trigger
```

Representation may start as `CaptureItem` owner → `Evolution` section and, under independent future-plan addressability/review/lifecycle pressure, become `CaptureItem.evolution.md`.

```text
CaptureItem.evolution.md
= supporting future-evolution artifact proposed by L5 / WEUC Lens
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

→ optional Evolution section
→ or promoted SL-CAP-01.evolution.md
```

The evolution companion is proposed by L5, not by `TM-IMPLEMENTATION-SLICE` or the Slice Verticality Lens. The Slice Target Module continues to own the current Useful Vertical Result / Runtime / Integrated Plan.

## 14. WEUC / Architecture Boundary

```text
TM-WEUC
→ owns/updates SDS-WORKSPACE-EVOLUTION.md

LENS-WORKSPACE-EVOLUTION-ARCHITECTURE
→ consumes the current map
→ evaluates another Target/Idea/Decision against it
→ plans target-local evolution
→ may emit map-update candidate back to TM-WEUC
→ may propose one local <owner>.evolution.md supporting companion
```

Architecture Decisions remain ordinary Answer Decisions inside the current Target unless generic escalation creates an independently material architecture child Target.

## 15. Linked Notes Boundary

Linked Notes are evaluated as a **usage/navigation capability**, not as a file family.

```text
existing canonical owners / stable IDs / relations
+ material cross-owner navigation/query need
→ LENS-LINKED-NOTES-USAGE-JUSTIFICATION
→ JUSTIFIED_LINKED_NOTES | NOT_JUSTIFIED | route elsewhere
```

The Lens must not create `notes/` or `linked-notes/` trees.

## 16. Revalidation Is Not A Peer Lens

Revalidation is a Decision lifecycle mechanism. L3 may generate revalidation signals, but Uncertainty/Reversibility ≠ Revalidation.

## 17. User Questions

```text
Lens Prompt ≠ RQ ≠ Q/R/P Question ≠ User Question
```

## 18. High-Level Composition Example

Suppose a Scenario Target uses `TM-SCENARIO-DRAFT`. Required Core Lenses are checked; the module attaches Scenario Boundary / Behavior. The Lens Applicability Scan may additionally select UI/Spatial, L4, L5, L6, Quality/Risk or another registered Lens when Scope/Sources/Evidence make it material. If no Workspace evolution issue exists, L5 remains `NOT_MATERIAL`.

## 19. Maintenance

Creation/review/promotion of a reusable Lens is owned by [`../shared/lens-creation-and-integration-use-case.md`](../shared/lens-creation-and-integration-use-case.md).

Mechanical checks should verify:

```text
every reusable Lens has one Knowledge Basis
Knowledge Basis Mode ∈ INLINE | REFERENCED | HYBRID
every reusable Lens has one Artifact / File Implications section
zero or more AG-* records are allowed
every AG-* describes Lens-produced supporting/routing meaning rather than duplicating Target-result AP
Target Module Lens Profiles resolve to registered Lens owners
TF-06A can discover applicable registered Lenses even without a Target Module
```
