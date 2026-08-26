# Target Module — Reusable IDTSPE Target Methodology Unit

Status: active generic methodology model  
Purpose: define a reusable module that can shape one IDTSPE Target or contribute a bounded part of its formation/evaluation/output without becoming project semantic authority.

---

# 1. Core Definition

A `Target Module` is a reusable planning-methodology contract for a recurring class of planning work.

It may provide:

```text
Target form / Target-Type candidate
Scope archetype + boundary prompts
Source Contract candidates
Resolution Questions / Question-set preset
Idea / Variant discovery prompts
Lens Profile / reusable Lens references / local pattern aids
Q/R/P prompts
Decision surfaces
Output schema / draft template
Validators / completeness gates
Downstream Source handoff
Revalidation signals
```

It does **not** own the current project's accepted Scenario/Domain/Slice/etc meaning.

Formula:

```text
Target Module
= reusable methodology / preset / contract

Target Instance
= concrete current planning owner
```

---

# 2. Why It Is A Separate Entity

Existing reusable planning often mixes:

```text
Use Case
Workflow
Template
Principles
Pattern library
Validation checklist
```

A Target Module gives IDTSPE one integration surface over those reusable sources.

The original repository owners remain Sources/candidates until consistency-integrated.

---

# 3. One Module Can Occupy Several IDTSPE Integration Points

A Target Module is **not only a Target Type**.

It can contribute at these integration points:

```text
TM-IP-01 TARGET_FORM
  candidate answer for TF-02 TARGET_TYPE_FORM

TM-IP-02 SCOPE
  scope archetype / boundary questions for TF-03 TARGET_SCOPE

TM-IP-03 SOURCES
  Source Contract archetype for TF-04 SOURCE_SET

TM-IP-04 RELATIONS
  expected Target relations / owner relations for TF-05

TM-IP-05 QUESTIONS
  RQ candidates/presets for TF-06 QUESTION_SET

TM-IP-06 IDEAS
  Idea/Variant discovery aids for TF-07 IDEA_SPACE

TM-IP-07 BRANCHING
  branch triggers / comparison dimensions for TF-08 BRANCH_POLICY

TM-IP-08 LENSES_PATTERNS
  contributes to `TF-06A LENS_SET`:
  Lens Profile referencing canonical generic/profile Lens owners + only genuinely local heuristics/patterns/anti-patterns

TM-IP-09 OUTPUT
  output schema/template into which selected answers are integrated

TM-IP-09A ARTIFACT_FILE_CONTRACT
  explicit target-profile persistence/representation requirements and preferences
  consumed by P-14 / TF-10

TM-IP-10 VALIDATION
  completeness/consistency/projection validators

TM-IP-11 HANDOFF
  accepted-output → downstream-Source adapters for TF-09

TM-IP-12 REVALIDATION
  module-specific watch signals / reconsider prompts
```

A module can fill only the integration points it genuinely owns.

---

# 4. Module Roles In One IDTSPE

A Target Module may be used as:

```text
PRIMARY TARGET MODULE
  primary reusable form for one Target Instance

SUPPORTING TARGET MODULE
  contributes a bounded semantic owner/subtarget inside another Target

EVIDENCE TARGET MODULE
  plans an evidence-producing operation; evidence does not become semantic authority

REVIEW TARGET MODULE
  checks selected owners; normally returns findings/reopen actions

COMPOSITION TARGET MODULE
  optional integration role used only when composing accepted outputs
  itself contains a material Decision;
  mechanical aggregation does not create a Target
```

These are integration roles, not new Decision types.

---

# 5. Literal Target Module Contract

```text
TargetModule

Identity
  Module ID
  Name
  Status
  Version / compatibility when useful

Purpose
  useful recurring planning result

Entry Point
  one stable module entry id
  trigger / applicability
  accepted upstream Sources
  what must already be selected

Supported Integration Roles

Target Formation Contribution
  purpose/output archetype
  target form/type candidate
  scope archetype
  Source Contract archetype
  expected relations

Resolution Questions
  default candidates
  required/proportional/optional
  question-generation rules

Idea / Variant Discovery
  candidate-answer categories
  pattern prompts
  anti-bias / no-solution-smuggling rules

Lens Profile / Patterns
  required/frequent reusable Lens refs
  target-profile reusable Lens refs
  local-only evaluation prompts when genuinely local
  known target-specific patterns / anti-patterns
  applicability gates

Optional Target-Specific Concern Hints
  only recurring domain-specific concern categories when they add value;
  generic Q/R/P storage/lifecycle remains owned by the IDTSPE Shell

Decision Surfaces
  which material choices normally map to:
    Target-Scope Decision
    Question-Set Decision
    Answer Decision

Output Schema
  semantic fields / addressable subowners
  mapping from answers/Decisions into current output

Internal Object Contracts
  addressable object schemas/questions/lenses owned inside this module

Supporting Modules / Composition
  other Target Modules normally activated

Validators
  readiness/completeness/boundary/authority checks

Downstream Handoff
  what accepted outputs can become Sources
  typical consumers

Revalidation
  material watch/reopen prompts

Artifact / File Contract
  structured ARTIFACT_PROPOSAL records:
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
    GUIDANCE_SOURCE: TARGET_MODULE
    RESOLVER: P-14 / TF-10

  explicit REQUIRED / PREFERRED / OPTIONAL persistence rules
  default representation forms/patterns
  separate-artifact triggers
  content that should remain embedded
  content routed to another canonical artifact
  unresolved placement is allowed and must be rendered through P-14

  exact repository paths are only required when a global/profile owner exists;
  otherwise use logical artifact patterns and let TF-10 / Artifact Pack resolve placement

Repository Provenance
  current UC/workflow/template owners from which the module is derived
```

---

# 6. Entry Point Is Mandatory

Every Target Module has exactly one semantic entry point.

Example:

```text
Entry Point:
  tm.scenario.draft
```

The entry point answers:

```text
when should this module activate?
what accepted Sources does it expect?
what Resolution Set does it contribute?
what output does it promise?
```

Every active Target Module must be reachable through at least one canonical user-level command surface. Commands/Tampermonkey actions route to this semantic entry point; focused shortcuts may route to narrower stable scopes/modes of the same module.

Conditional module activation still uses its gate: the command may conclude that no Target should be created and route to the proper owner.

Command identity never becomes module authority. See `idtspe-command-surface-contract.md`.

---

# 7. Questions Inside A Target Module

A module may contain reusable question candidates.

Example:

```text
TM-DOMAIN-DISCOVERY

RQ:
  Which concrete invariant must remain true?

RQ:
  Which state/combination must be impossible?
```

They are:

```text
Question candidates / presets
≠ automatic user interview
```

Normal intake and User Question Policy still apply.

---

# 8. Ready-Made Candidate Answers / Patterns

A module may provide candidate answer families.

Example:

```text
Aggregate boundary candidate:
  one root
  split roots
  no explicit Aggregate
```

or patterns:

```text
Value Object
Aggregate Root
Policy
Adapter
Vertical Slice
```

These are Idea-generation aids.

Invariant:

```text
module pattern
≠ selected answer
```

The module must include applicability prompts/anti-patterns so pattern libraries do not become pattern matching by name.

---

# 9. Lens Profile And Reusable Lens Library

Reusable Lens knowledge is not owned by a Target Module merely because the module first used it.

Canonical owner:
```text
active/idtspe-core/lenses/ + active/profiles/<profile>/lenses/
```

A Target Module declares a concise `Lens Profile`:
```text
required generic Lens inheritance
primary TARGET_PROFILE_REUSABLE Lens Pack(s)
frequent conditional Lens refs + gates
local-only Lens prompts — only when truly non-reusable
```

Selected rule:
```text
reusable Lens knowledge → Lens Library
Target Module → Lens Profile
```

If a local Lens appears in a second Target family or repeatedly outside its original module, review it for promotion into the Lens Library.

Generic required Core Pack:
```text
LENS-NEED-VALUE-SCOPE
LENS-AUTHORITY-SOT-REUSE
LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY
LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY
  Documentation / Representation check at output/materialization
```

Frequent conditional Lenses include:
```text
LENS-DEPENDENCY-CHANGE-IMPACT
LENS-WORKSPACE-EVOLUTION-ARCHITECTURE
LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY
LENS-QUALITY-RISK-MATERIALITY
```

Lens findings feed normal generic Ideas / Evidence / Q/R/P / Branch comparison / Answer Decisions.

```text
Lens ≠ Target Module
Lens finding ≠ new Target automatically
```

A material independent problem exposed by a Lens may be escalated through generic Target Formation.

# 10. Output Schema Is A Target Projection Contract

A Target Module can contain a semantic output template.

Example:

```text
TM-SCENARIO-DRAFT
  Internal Object Contract:
    Behavior Item schema
```

The schema is where accepted answers/Decisions are integrated while Scenario planning retains methodology ownership.

It is not a questionnaire that forces unsupported fields.

Rule:

```text
blank optional field
≠ unresolved Decision
```

Only supported/material meaning is projected.

---

# 11. Internal Object Contracts And Supporting Modules

A Target Module may contain **internal object contracts** for addressable meaning that belongs inside the module's planning responsibility.

Example:

```text
TM-SCENARIO-DRAFT

Internal Object Contracts:
  Scenario DATA
  Behavior Item

Supporting external modules:
  TM-SCREEN — conditional
  TM-REQUIREMENT — exceptional shared/multi-owner must-hold owner only
```

Important:

```text
addressable object
≠ separate Target Module
≠ separate Use Case
≠ separate Target Instance
```

`Scenario DATA` and `Behavior Item` are internal Scenario-planning object contracts. They may be represented by dedicated files or registries for addressability, but their discovery/questions/schema/validation are owned by `TM-SCENARIO-DRAFT`.

If DATA/Behavior decomposition exposes a new independently meaningful Need/result:

```text
reopen Scenario Scope
→ split/merge Scenario Target if justified
```

Do not solve that by inventing a `DATA Target` or `Behavior Target`.

A genuinely separate semantic owner such as Requirement or Screen may still have its own supporting Target Module because its authority is not owned by Scenario.

---

# 12. Branch / Variant Integration

A module may say when integrated alternatives should be explored through generic Planning Branches.

Current repository `Planning Unit Variant` is treated as a representation of a materially distinct integrated design alternative inside Scenario/Domain/Slice/etc work.

Generic rule:

```text
counterfactual exploration
→ Planning Branch network

selected/current integrated design projection
→ module owner / Variant representation when useful
```

Do not maintain two competing branching ontologies.

---

# 13. Module Readiness Validator

A Target Module is ready for integration only if:

```text
one stable entry point exists
purpose/output are explicit
scope/authority boundary is explicit
Source Contract is not a closed universal whitelist
RQ candidates are distinguishable from user questions
Idea/pattern prompts do not auto-select answers
specialized Lenses have applicability gates
output schema has one semantic authority story
submodule composition is explicit
validators cover omission/authority/boundary risks
downstream Source handoff is explicit
repo provenance/reuse candidates are known
```

---

# 14. Key Formula

```text
Target Module
↓ contributes to
Target Formation Resolution Set
↓
Target Instance
↓
full IDTSPE
  Scope
  Questions
  Ideas
  Q/R/P
  Branches when needed
  Decisions
  Revalidation
↓
module output schema
↓
accepted downstream Sources
```

## Lens Boundary Invariant

```text
reusable Lens knowledge ≠ Target Module ownership
Lens activation ≠ new Target Instance
Architecture Decision subject ≠ dedicated Architecture Target Module automatically
```

## Artifact / File Proposal Integration Point

Every Target Module must expose structured `ARTIFACT_PROPOSAL` records under `## Artifact / File Contract`.

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
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

`PERSISTENCE_GUIDANCE` and `PLACEMENT_DIRECTIVE` are the canonical machine-readable policy fields; `GUIDANCE` is only a descriptive qualifier. `FILE_OR_ARTIFACT` states which canonical/supporting/register/companion file or logical artifact pattern the module proposes. `CONTENT` says which part of the Target output belongs there. These are profile-level defaults/requirements; the active-profile materialization tree groups these source records by possible representation/destination without becoming semantic authority.
