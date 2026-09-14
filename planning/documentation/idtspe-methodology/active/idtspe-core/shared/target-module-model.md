# Target Module — Reusable IDTSPE Target Methodology Contract

Status: active generic methodology model  
Purpose: define a reusable module that can shape one IDTSPE Target or contribute a bounded part of its formation/evaluation/output without becoming project semantic authority.

---

# 1. Core Definition

A `Target Module` is a reusable IDTSPE methodology component for a recurring class of bounded Target production. It remains a **Target-family contract**, not merely a bag of Units and not current project authority.

```text
Target Module
=
Target-family / formation contract
+ composition of Module-defined Unit Contracts
+ genuinely cross-Unit Target rules
+ validators / handoff / revalidation / representation guidance
```

A Module-defined Unit Contract is the primary reusable **Target Work Unit** production slice:

```text
Unit Contract
├─ Result Responsibility / Purpose
├─ Applicability / Materiality / Omission
├─ Inputs / Source needs
├─ Drivers: Goal / Questions / recurring Problems
├─ Knowledge Basis when useful
├─ Resolution Method / Guidance
├─ Proposal discovery aids when useful
├─ applicable Lenses / registry triggers
├─ Result Content Contract
├─ Validators
├─ Handoff / consumers
├─ Revalidation
└─ Representation guidance
```

Thin Units may omit most specialized resolution aids. Heavy Units may carry substantial knowledge, questions, proposal discovery and validation guidance. Shared Target-family guidance may remain module-level and be referenced by several Unit Contracts rather than duplicated.

A `Local Target Contract` provides the same responsibilities dynamically for a one-off Target when no reusable module fits.

## Target Step Result Contract

The Target Step Result is the coherent applicable composition/projection of **Current Result Content from its Units**. Candidate Unit meaning does not become current merely by appearing in a draft.

```text
Target Module
→ Unit Contract inventory / dependency shape
→ runtime Unit Resolution
→ Current Result Content
→ Target Step Result composition
```

The Module defines target-wide formation/scope/Source Contract archetypes only where genuinely shared. Unit-specific Source needs belong to the relevant Unit Contract. At runtime `TF-04 SOURCE_SET` resolves the concrete Target's actual Source Set as Source State Units/bindings to authoritative Source Subjects; the reusable Source Contract archetype is not itself that runtime Source Set. The Module should not centralize all questions, all knowledge, all Lens guidance and all methods at module level when those concerns actually belong to one Unit responsibility.

### Per-Unit Applicability Envelope

Every material Module-defined Unit inherits the generic Opening / In-Unit / Closing applicability envelope. The Unit's own contract supplies the reusable resolution material relevant to that responsibility; applicable Lenses may be selected through the ordinary registry scan.

### Contextual Units

A Target Module does not have to predeclare every local responsibility that can arise. Core may form a Contextual Unit from the active context when no module Unit fits and the local responsibility is independently useful. Contextual Units do not become new Target Module entries merely because they occurred once.

# 2. Relationship To Documentation Use Cases And Other Component Types

Generic Documentation methodology defines `Use Case`, `Process`, `Principles & Terminology`, `Template`, `Example`, `Theory` and registry semantics. IDTSPE adds `Target Module` as a **compositional specialized component**.

```text
Use Case Process
→ decides when a recurring Target-production method is useful
→ scans Target Module Registry
→ selects a Target Module when applicable

Target Module
→ owns specialized Target production contract
→ may reference/combine Processes, principles, theory, templates, examples, patterns and validators
→ does not become the functional Use-Case owner
```

A Target Module exists because packaging these reusable concerns around one Target Step-Result family provides coherent reuse. It does not justify duplicating the Use Case that routes to it.

The original repository methodology/theory owners remain referenced authorities/Knowledge Basis according to their own role; current project facts/accepted meaning remain current Sources/owners rather than becoming true merely because the Module mentions them.

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
  reusable Source Contract archetype / shared Source needs for TF-04 SOURCE_SET
  (runtime TF-04 resolves actual Source State Units/bindings)

TM-IP-03A KNOWLEDGE_BASIS
  reusable principles/rules/theory/pattern knowledge for this recurring Target family
  using the shared [`Knowledge Basis Contract`](knowledge-basis-contract.md)

TM-IP-04 RELATIONS
  expected Target relations / owner relations for TF-05

TM-IP-05 QUESTIONS
  Unit-specific driver/question presets + genuinely Target-wide candidates; TF-06 remains Target-level coordination

TM-IP-06 PROPOSALS
  Unit-specific Proposal discovery aids + genuinely cross-Unit candidates; TF-07 remains Target-level coordination

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

Unit Contracts
  one entry per reusable Module-defined Unit responsibility
  Result Responsibility / Purpose
  Applicability / Materiality / Omission
  Inputs / Source needs
  Drivers / Question or recurring-Problem guidance
  Unit-specific Knowledge Basis or reference to shared Module Knowledge Basis when useful
  Resolution Method / Guidance
  Proposal discovery aids when useful
  applicable Lens refs / registry triggers
  Result Content Contract
  validators
  consumers / handoff / revalidation
  representation guidance

Knowledge Basis [when useful]
  theory/reference links at any useful granularity
  applied interpretation for this Target family when useful

Shared / Target-Wide Driver Guidance [when useful]
  only genuinely cross-Unit formation/coordination questions or recurring Problems
  Unit-specific drivers belong in Unit Contracts

Shared / Target-Wide Proposal Discovery [when useful]
  only genuinely cross-Unit / Target-form candidate patterns
  Unit-specific Proposal discovery belongs in Unit Contracts

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

Selection / Coordination Surfaces [when useful]
  Target-level Target-Scope / Question-Set coordination choices
  cross-Unit selection surfaces only when genuinely shared
  Unit-local material selection remains in the affected Unit Resolution

Target Step-Result Contract
  Step Result family
  Unit Contract inventory / relations
  composition of Current Result Content into the Target Step Result
  target-level completeness / handoff / representation where genuinely cross-Unit

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
  Target-Module-local persistence/representation guidance for its own Target result
  conforms to the canonical `ARTIFACT_PROPOSAL` interface owned by
  `artifact-placement-and-idtspe-response-contract.md`
  states Module-local conditions/preferences/requirements without redefining P-14/TF-10
  unresolved placement remains valid and is resolved by the canonical placement contract

Repository Provenance
  current UC/workflow/template owners from which the module is derived
```

---

# 6. Entry Point Is Mandatory

Every Target Module has exactly one semantic entry point.

Example:

```text
Entry Point:
  tm.scenario.plan
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

Use the shared Knowledge Basis contract. Knowledge may live at the smallest reusable consumer:

```text
Unit-specific theory/application bridge
→ Unit Contract Knowledge Basis

truly Target-family-wide theory/application bridge
→ Target Module Knowledge Basis

reusable evaluation perspective
→ Lens Knowledge Basis
```

A Unit may reference a shared Module Knowledge Basis without copying it. Reference-only Knowledge Basis remains valid when the application is obvious; applied interpretation is added when the consumer needs a semantic bridge from broad theory.

# 8. Questions / Drivers Inside A Target Module

Reusable decision-driver guidance should normally live with the Unit responsibility it helps resolve. A Module may also define genuinely Target-wide formation questions.

```text
Unit-specific Question / recurring Problem guidance
→ Unit Contract

cross-Unit / Target-form question
→ Target Module level when genuinely shared
```

Concrete runtime Questions/Problems remain Core Resolution State and attach to the smallest correct semantic subject. Preset prompts do not automatically become formal Questions or USER interview questions.

`TF-06 QUESTION_SET` remains a Target-level coordination surface: before Unit decomposition it may help determine what the Target must resolve; after Units exist it primarily coordinates/projects material Unit drivers plus genuine Target-wide questions.

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

These are Proposal-generation aids.

Invariant:

```text
module pattern
≠ selected answer
```

The module must include applicability prompts/anti-patterns so pattern libraries do not become pattern matching by name.

---

### Proposal Space Coordination

Proposal discovery aids should likewise live at the Unit contract when they are Unit-specific. `TF-07 PROPOSAL_SPACE` coordinates material Unit Proposals plus genuine cross-Unit/Target-wide Proposals; it is not a second owner of Proposal semantics.

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

Lens operations may contribute explanatory Broad Discussion/Key Points without creating State. When they surface a material semantic consequence needing ownership/State/lifecycle disposition, that meaning becomes a Finding Candidate; Core Finding Disposition resolves it into normal generic Proposals / Evidence / Q/R/P / Decision inputs / revalidation or another owner as appropriate.

```text
Lens ≠ Target Module
Lens finding ≠ new Target automatically
```

A material independent problem exposed by a Lens is first a Finding Candidate. Core Finding Disposition may surface a Target Formation candidate; Target Formation decides reuse/handoff/new bounded Target.

# 11. Step-Result Contract / Output Schema Projection

A Target Module defines a Target Step-Result Contract and may additionally contain a semantic output template/schema as its concrete projection shape.

Example:

```text
TM-FEATURE
  Internal Object Contract:
    BR-* Behavior Requirement item schema
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
TM-FEATURE

Internal Object Contracts when useful:
  Feature semantic-data item
  BR-* Behavior Requirement item

Supporting external modules:
  TM-SCREEN — conditional profile-defined supporting owner when spatial/navigation composition is material

Requirement meaning remains owner-local; no standalone generic Requirement Target is implied by an addressable Requirement item.
```

Important:

```text
addressable object
≠ separate Target Module
≠ separate Use Case
≠ separate Target Instance
```

Feature semantic-data and BR-* item contracts remain inside the Feature owner's planning responsibility even when represented with stable IDs or a dedicated owner artifact. Physical addressability does not create a separate DATA/Behavior Target.

If Feature behavior/data discovery exposes a new independently meaningful owner/result:

```text
surface owner/boundary Finding Candidate
→ Core Finding Disposition selects revalidation/Target-Formation consequence
→ Target Formation may split/merge the bounded Target only when independently useful
```

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
Source Contract is not a closed universal whitelist and is not the concrete runtime Source Set
Knowledge Basis, when useful, remains distinct from current Target Sources and does not duplicate reusable Lens knowledge
theory/reference provenance is retained at an economical granularity when material
applied interpretation is present when raw theory alone does not explain how it should guide this Target family
RQ candidates are distinguishable from user questions
Proposal/pattern prompts do not auto-select answers
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
→ Target-family formation contract
→ Module-defined Unit Contracts
→ Unit Resolution at runtime
→ Current Result Content per resolved Unit
→ Target Step Result composition
```

```text
Module Unit
= generic Unit mechanics + reusable Unit Contract preset

Contextual Unit
= generic Unit mechanics + dynamically established bounded responsibility
```

Generic Proposal/QRP/Decision/Evidence/Findings/Revalidation remain Core semantics and are related to the Unit/Target subject they actually concern; the module does not duplicate their lifecycle inside Result Content.

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

Every Target Module must expose an `## Artifact / File Contract` that explains, for the Module's own Target result, what meaning should normally survive, what should remain embedded, when a separate representation may be useful, and what should be routed elsewhere.

The generic structured `ARTIFACT_PROPOSAL` field set, precedence, persistence policy and `P-14 / TF-10` resolution semantics are **not** owned here. They are canonical in [`artifact-placement-and-idtspe-response-contract.md`](artifact-placement-and-idtspe-response-contract.md). A Module conforms to that interface instead of redefining it.

Target Module guidance owns only Target-result-side intent. It must not duplicate Lens-supporting guidance, invent a new semantic owner through placement, or require a hand-maintained shadow of implementation-native code/test topology.
