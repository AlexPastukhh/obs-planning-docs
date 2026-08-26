# IDTSPE Lens Model

Status: active generic methodology owner

## 1. Definition

```text
Lens
= reusable evaluation/discovery perspective
  applied to a Target / Scope candidate / RQ / Idea / Branch / Decision / Evidence set
```

A Lens may produce findings, Evidence requests, Idea refinements, Q/R/P, comparison dimensions, Decision inputs and revalidation signals.

```text
Lens ≠ Target Module
Lens ≠ Target Instance
Lens ≠ Resolution Slot
Lens ≠ Validator
Lens ≠ Guard
Lens ≠ selected Decision
```

## 2. Ownership Rule

```text
reusable generic Lens knowledge → active/idtspe-core/lenses/
profile-specific Lens knowledge → active/profiles/<profile>/lenses/
Target Module → Lens Profile
local-only Lens → module only while genuinely non-reusable
```

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

L3 is a required **check** and may close immediately as `no material uncertainty`. Documentation / Representation is also a required **check** but activates at materialization time and may close as `NO_PERSISTENCE_NEEDED` or `IMPLEMENTATION_NATIVE`; it does not force file creation.

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

These profile-contributed Lenses are checked when their applicability gates are met; they are not universal rituals for every real-world decision.

### TARGET_PROFILE_REUSABLE

Reusable Lens Pack associated with one or several Target families. Target Modules reference it but do not own its prompts.

### LOCAL_ONLY

May stay inside one module while genuinely unique. It must still be registered. Reuse is a promotion signal.

## 4. Reusable Lens Contract

Every reusable Lens file should explain proportionally:

```text
Lens ID / Name
Activation
Purpose
Applicability Gate
Typical Sources / Evidence
Prompts / Sublenses
Findings / Outputs
Typical Consumers
Guards / Anti-patterns
Composition
Escalation / Revalidation
Artifact / File Implications
Provenance
```

## 5. Lens Profile In A Target Module

A Target Module contains one concise `Lens Profile` with direct relative links to reusable Lens files. It does not duplicate full reusable prompts.

Shell attachment:

```text
P-06 Lens Port
→ TF-06A LENS_SET
→ required Core Pack
    L1/L2/L3 across material choice surfaces
    + Documentation / Representation at materialization
  + Target Module Lens Profile
  + applicable frequent conditional Lenses
  + local-only Lens when genuinely needed
```

`TF-06A LENS_SET` is recomputed when material Target Scope / Sources / Questions change. The resulting Lens Set is contextual, not a fixed ritual.

## 6. Generic Choice Lifecycle

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
Documentation / Representation → required check when material output may persist; choose code/existing owner/catalog/strategy/dedicated artifact/generated view/none before P-14
L4 → structured dependency/change impact is material
L5 → Workspace evolution/WEUC/architecture pressure/work-cost is material; it may be invoked against a concrete Target or the whole Workspace architecture through `TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION`
Simplicity → candidate structure may contain avoidable abstractions/steps/entities and a simpler evolution-safe solution should be searched
Linked Notes Usage → a material cross-owner navigation/backlink/query need is proposed; no notes storage is implied
L6 → proof/observation/diagnosis/operation is material
Target-profile Lens Packs → selected Target family
```

## 7. Finding → Decision / Escalation

```text
Lens finding
→ Evidence / Idea / Q/R/P
→ Answer Decision in current Target authority
```

Open a bounded child/local Target only when the exposed problem has independent useful output, meaningfully distinct Sources/owner boundary, material choice space and separate revalidation value.

## 8. WEUC / Architecture Boundary

Selected model:

```text
Workspace Evolution / WEUC Evidence
+ change-path pressure
+ prepare-now vs defer
+ architecture alternatives / tax
+ Understanding / Change / Verification-Operation / Runtime path cost
= one L5 Lens Pack
```

Current-structure simplification remains a separate perspective:

```text
L5 constraints/findings
+ current candidate complexity
→ Simplicity / Implementation Economy Lens
→ simpler candidate without losing evolution fitness
```

L4 stays separate because dependency/blast radius may matter without recurring WEUC evidence.

L6 stays separate because proof/diagnosis/operation may matter independently from evolution.


## 8.1 Linked Notes Boundary

Linked Notes are evaluated as a **usage/navigation capability**, not as a file family.

```text
existing canonical owners / stable IDs / relations
+ material cross-owner navigation/query need
→ LENS-LINKED-NOTES-USAGE-JUSTIFICATION
→ JUSTIFIED_LINKED_NOTES | NOT_JUSTIFIED | route elsewhere
```

The Lens must not create `notes/` or `linked-notes/` trees. If exact materialized synchronization/equality is required, route to the separate Reference Object responsibility rather than treating it as Linked Notes.

## 9. Revalidation Is Not A Peer Lens

Revalidation is a Decision lifecycle mechanism. L3 may generate revalidation signals, but Uncertainty/Reversibility ≠ Revalidation.

## 10. User Questions

```text
Lens Prompt ≠ RQ ≠ Q/R/P Question ≠ User Question
```


## 11. High-Level Composition Example

Suppose a Scenario Target is being planned.

```text
Target Module:
  TM-SCENARIO-DRAFT
```

Shell automatically checks:

```text
L1:
  is this really one useful Need/result?

L2:
  which upstream owner already defines the meaning?

L3:
  what material assumptions remain?
```

Scenario Lens then inspects:

```text
Behavior completeness
Scenario DATA meaning
failure/no-mutation
acceptance
```

If Screen placement is material:

```text
add UI/Spatial Lens
```

If no structured workspace/architecture issue exists:

```text
L4/L5/L6 may remain inactive
```

The Target still runs complete IDTSPE without applying every known Lens.

## 7. TM-WEUC And The WEUC Lens

The methodology deliberately separates **map ownership** from **cross-cutting evaluation**.

```text
TM-WEUC
→ owns/updates SDS-WORKSPACE-EVOLUTION.md

LENS-WORKSPACE-EVOLUTION-ARCHITECTURE
→ consumes the current map
→ evaluates another Target/Idea/Decision against it
→ plans target-local evolution
→ may emit map-update candidate back to TM-WEUC
```

Architecture Decisions remain ordinary Answer Decisions inside the current Target unless generic escalation creates an independently material architecture child Target.

Optional `<owner>.evolution.md` companions are Artifact projections, not Targets/Lenses/current semantic owners.


## 12. Artifact / File Implications

Every reusable Lens file must explicitly say whether its findings normally:

```text
remain embedded in the current Target
require/prefer an existing global owner/register
prefer a target-local companion/supporting evidence artifact
may justify a new canonical artifact after Artifact Boundary review
have no independent artifact implication
```

This section is mandatory even when the value is effectively `NONE`.

A Lens does not create a semantic owner by itself. It emits a finding; `P-14 / TF-10` maps material findings to artifact placement.

## Artifact / File Guidance Records

Every reusable Lens exposes structured `ARTIFACT_GUIDANCE` records under `## Artifact / File Implications`.

Required source fields:

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

`PERSISTENCE_GUIDANCE` and `PLACEMENT_DIRECTIVE` are the canonical machine-readable policy fields; `GUIDANCE` is only a descriptive qualifier. `FILE_OR_ARTIFACT` states what file/artifact/register/owner pattern the Lens proposes. `CONTENT` states what the Lens proposes to place there. A Lens can recommend/reroute persistence but cannot create semantic ownership. The active profile's artifact/materialization projection groups these source records by possible representation/destination. The former SDS flattened registry is compatibility-only; current SDS uses `ARTIFACT-PLACEMENT-MAP.md` as the annotated materialization tree.
