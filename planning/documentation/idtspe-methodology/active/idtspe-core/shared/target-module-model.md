# Target Module — Reusable IDTSPE Target Methodology Contract

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
Knowledge Basis (`INLINE | REFERENCED | HYBRID`)
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

Local Target Contract
= one-off Target methodology contract formed dynamically when no reusable module fits
```

A material IDTSPE Target does **not** require a pre-existing Target Module. Reusable modules are preferred when a recurring contract genuinely fits; otherwise Target Formation creates a bounded Local Target Contract and the same Shell/Lens lifecycle continues.


## Target Step Result Contract

A Target Module exists because a recurring Target family benefits from a reusable way to produce one coherent **Target Step Result family**.

Conceptually:

```text
Target Module
=
Target Step-Result Contract
+ Target Resolution / Production Method
+ Knowledge Basis
+ Lens Profile
+ Validators
+ Handoff / Revalidation
+ Representation Guidance
```

### Step-Result Contract

Defines proportionally:

```text
what useful Step Result this Target family aims to produce
which Target Step Result Units may compose it
what each Result Unit means / why it exists
possible fields/substructure
relations among Result Units
validation/completeness meaning
typical consumers/handoff
representation guidance
```

"One result family" does not mean:

```text
one Result Unit
one field
one semantic entity
one file
one uniformly populated template
```

A concrete Target Step Result is a sparse/material projection of the possible Module surface.

### Resolution / Production Method

The Module may supply reusable ways to produce/refine that result:

```text
Source archetype
Question candidates
Idea / Variant discovery aids
branch triggers
candidate answer shapes/pattern aids
Internal Object Contracts
shared Result-Unit methods
Decision surfaces
validators
handoff/revalidation prompts
```

Concrete Questions/Ideas/Q/R/P/Decisions/Evidence remain generic IDTSPE State Units. The Module provides reusable prompts/methods; it does not duplicate the Core lifecycle inside its result schema.

Canonical Unit/result semantics: [`idtspe-unit-and-target-step-result-model.md`](idtspe-unit-and-target-step-result-model.md).


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

TM-IP-03A KNOWLEDGE_BASIS
  reusable principles/rules/theory/pattern knowledge for this recurring Target family
  using the shared [`Knowledge Basis Contract`](knowledge-basis-contract.md)

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
  a reusable Target Module whose Target / Step-Result family is independently coherent
  enough to be used as a PRIMARY Target Module in some invocation;
  in another Target it may contribute that same reusable methodology in a supporting role

EVIDENCE TARGET MODULE
  plans an evidence-producing operation; evidence does not become semantic authority

REVIEW TARGET MODULE
  checks selected owners; normally returns Finding Candidates / revalidation dispositions rather than semantic truth

COMPOSITION TARGET MODULE
  optional integration role used only when composing accepted outputs
  itself contains a material Decision;
  mechanical aggregation does not create a Target
```

These are integration roles, not new Decision types.

## Supporting Target Module Independence Rule

`SUPPORTING` is an **integration role of a real reusable Target Module**, not a way to promote every internal part of another Target into a module.

A Supporting Target Module must pass the normal Target-Module independence test:

```text
the recurring methodology/result can also make sense
as its own bounded Target family
with an independently useful Target Step Result
```

It may therefore be:

```text
PRIMARY in one invocation
SUPPORTING in another invocation
```

Using a Supporting Target Module inside a parent Target does **not** by itself prove that a second Target Instance exists. Form a separate child Target only when the work has an independently useful planning responsibility/result and normal Target Formation justifies it.

If the candidate can **only ever exist as an internal part of one parent Target result**, do not model it as a Supporting Target Module.

Prefer:

```text
Result Unit
→ concrete independently processable part of the parent Step Result

Internal Object Contract
→ reusable schema/questions/validation for addressable objects inside the parent Module

shared Result-Unit method
→ reusable construction/evaluation guidance used by Result Units in one or more Modules
```

Boundary:

```text
can stand as its own recurring Target family
AND may also assist another Target
→ Target Module with SUPPORTING role

only exists as part of another Target result
→ Result Unit / Internal Object Contract / shared Result-Unit method
```

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

Knowledge Basis
  Mode: INLINE | REFERENCED | HYBRID
  Embedded Principles / Rules / Theory
  Referenced Knowledge Owners
  Reference Load Policy
  Operationalization Notes

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
  which target-specific Result Units/fields are normal analysis subjects when useful
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

Target Step-Result Contract
  Step Result family
  Result Units + their purpose/boundary
  possible semantic fields / addressable substructure
  mapping from selected answers/Decisions into current Result Units

Output Schema / Template — compatibility/technical projection
  optional concrete projection shape for the Step-Result Contract
  never a mandatory questionnaire

Internal Object Contracts
  addressable object schemas/questions/lenses owned inside this module

Supporting Modules / Composition
  other independently valid Target Modules that may be reused in a supporting role
  each supporting module must also be coherent as its own recurring Target family
  supporting-role use does not automatically instantiate a separate Target

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

Conditional module activation still uses its gate as Target Formation input. If no Target is justified, Target Formation resolves reuse/handoff to an existing owner or the appropriate methodology next step; the command does not invent or route to a semantic owner by itself.

Command identity never becomes module authority. See `idtspe-command-surface-contract.md`.

---

# 7. Knowledge Basis

Every reusable Target Module contains exactly one explicit `## Knowledge Basis` conforming to the shared [`Knowledge Basis Contract`](knowledge-basis-contract.md).

The distinction from `TM-IP-03 SOURCES` is fundamental:

```text
Source Contract
→ archetype for current Target-instance inputs/evidence/constraints

Knowledge Basis
→ reusable principles/rules/theory/pattern knowledge
  used by this recurring Target methodology
```

A Target Module may use `INLINE`, `REFERENCED` or `HYBRID` knowledge exactly like a Lens. Referenced owners are loaded lazily according to the module's `Reference Load Policy`.

Symmetry does not move reusable evaluation knowledge out of Lenses:

```text
Target-result formation/resolution/representation knowledge
→ Target Module Knowledge Basis

reusable evaluation perspective across Targets
→ Lens + Lens Knowledge Basis
```

A referenced Theoretical Module/deep guide remains a knowledge owner, not Target Source or project authority.

---

# 8. Questions Inside A Target Module

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

# 9. Ready-Made Candidate Answers / Patterns

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

# 10. Lens Profile And Reusable Lens Library

Reusable Lens knowledge is not owned by a Target Module merely because the module first used it.

Canonical owner:
```text
active/idtspe-core/lenses/ + active/profiles/<profile>/lenses/
```

A Target Module declares a concise `Lens Profile` / attachment policy:
```text
required generic Lens inheritance
primary TARGET_PROFILE_REUSABLE Lens Pack(s)
frequent conditional Lens refs + gates
local-only Lens prompts — only when truly non-reusable
```

The module owns **that/when** those Lenses attach to this recurring Target family. The reusable Lens owner controls its Analysis Surface, supported operations, evaluation workflow, Typical Findings and Knowledge Basis. `TF-06A` may additionally discover applicable registered Lenses that the module did not pre-list.

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

Lens operations surface Finding Candidates. Core Finding Disposition resolves them into normal generic Ideas / Evidence / Q/R/P / Decision inputs / revalidation or another owner as appropriate.

```text
Lens ≠ Target Module
Lens finding ≠ new Target automatically
```

A material independent problem exposed by a Lens is first a Finding Candidate. Core Finding Disposition may surface a Target Formation candidate; Target Formation decides reuse/handoff/new bounded Target.

# 11. Step-Result Contract / Output Schema Projection

A Target Module defines a Target Step-Result Contract and may additionally contain a semantic output template/schema as its concrete projection shape.

Example:

```text
TM-SCENARIO-DRAFT
  Internal Object Contract:
    Behavior Item schema
```

The schema is where accepted answers/Decisions are integrated into declared Result Units while Scenario planning retains methodology ownership.

The Module contract is a **maximum/possible semantic surface**, not a questionnaire that forces unsupported Units/fields.

Rule:

```text
blank optional field
≠ unresolved Decision
```

Only supported/material meaning is projected.

---

# 12. Internal Object Contracts And Supporting Modules

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
surface Scenario-scope Finding Candidate
→ Core Finding Disposition may select Scenario-scope revalidation/reopen
→ Target Formation may split/merge Scenario Target if justified
```

Do not solve that by inventing a `DATA Target` or `Behavior Target`.

A genuinely separate semantic owner such as Requirement or Screen may still have its own supporting Target Module because its authority is not owned by Scenario.

---

# 13. Branch / Variant Integration

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

# 14. Module Readiness Validator

A Target Module is ready for integration only if:

```text
one stable entry point exists
purpose/output are explicit
scope/authority boundary is explicit
Source Contract is not a closed universal whitelist
exactly one Knowledge Basis exists and uses INLINE / REFERENCED / HYBRID
Knowledge Basis is distinct from current Target Sources and does not duplicate reusable Lens knowledge
REFERENCED/HYBRID knowledge owners + load policy are explicit
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

# 15. Key Formula

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
Target Step Result
  → material Result Units
↓
accepted Result Units / outputs become downstream Sources only where explicitly declared
```

## Lens Boundary Invariant

```text
reusable Lens knowledge ≠ Target Module ownership
Lens activation ≠ new Target Instance
Architecture Decision subject ≠ dedicated Architecture Target Module automatically
```


## Migration Compatibility For Installed Modules

Existing installed Modules remain valid during the staged conformance migration.

Interpret current:

```text
Purpose / Output
Target-specific output headings
Output Schema
Artifact / File Contract
```

as the implicit Step-Result Contract + Result Unit/field projection by meaning.

New or materially revised Modules should make independently processable Result Units explicit. A later profile conformance pass may make this literal without requiring a new Core entity for every Unit.

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

`PERSISTENCE_GUIDANCE` and `PLACEMENT_DIRECTIVE` are the canonical machine-readable policy fields; `GUIDANCE` is only a descriptive qualifier. `FILE_OR_ARTIFACT` states which canonical/supporting/register file or logical artifact pattern the module proposes. `CONTENT` says which part of the **Target result itself** belongs there. These are profile-level defaults/requirements; the active-profile materialization tree groups these source records by possible representation/destination without becoming semantic authority.

Target Module AP guidance must not duplicate a separate Lens finding merely because that finding may be persisted next to the Target. Example: `TM-TEST-STRATEGY` may propose `TEST-REALIZATION-MAP.md` because test realization topology is part of Test Strategy output; `TM-DOMAIN-DRAFT` must not propose `<Domain>.evolution.md` merely because L5 found a future path. Target-local evolution companion proposals are L5/WEUC `AG-L5-02` supporting-representation guidance over local evolution meaning already accepted/resolved through Core Finding Disposition; actual materialization remains Documentation / Representation + P-14 / TF-10 responsibility.
