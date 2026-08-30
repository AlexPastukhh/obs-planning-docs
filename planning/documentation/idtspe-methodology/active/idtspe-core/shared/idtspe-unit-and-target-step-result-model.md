# IDTSPE Unit And Target Step Result Model

Status: active generic methodology owner  
Purpose: define what one bounded IDTSPE work step produces, how target-specific result meaning differs from generic planning state, and the common Unit/addressability vocabulary used by Target Modules, Lenses, validation and persistence.

---

## 1. Core Model

```text
Target
↓
Target Module or Local Target Contract
↓
current bounded IDTSPE work step
↓
IDTSPE Step Output
├─ Target Step Result
│  └─ one or more Target Step Result Units
└─ material IDTSPE State Units
```

`IDTSPE Step Output` is an explanatory umbrella for material semantic output of one work/integration pass. It is **not** a new semantic owner and does not imply one persisted record. Ordinary Broad Discussion may surround or occur between these outputs without becoming Units; Key Points structure material discussion parts, while material Ideas remain explicit with `Addresses → Target Goal / Question / Problem`. No per-response Intake Summary or block-owner record is required. An Integration Checkpoint is the normal pass that reconciles accumulated discussion into the current Unit/Target Result state.

The two Unit roles are distinct:

```text
IDTSPE Unit
├─ Target Step Result Unit
└─ IDTSPE State Unit
```

A Unit is meaningful because it deserves explicit processing/addressability, not because it has a dedicated file.

---

## 2. Target Step Result

```text
Target Step Result
= the useful target-specific selected/resolved output
  that the current bounded IDTSPE work step
  is trying to produce or refine for the selected Target.
```

`Step` qualifies the word `Result`: it means the result wanted from **this current IDTSPE work pass**, not the final product/result of the domain being planned.

The same logical Target may later be revisited through:

```text
CREATE
REFINE
EXTEND
REVALIDATE
REPAIR
```

and therefore have a later Step Result revision.

### Example — planning a Slice

```text
Target:
  SL-CAP-01

Current Step intent:
  produce a codebase-level implementation plan

Target Step Result:
  Implementation Slice Plan
```

The plan may contain a field called `Useful Vertical Result`. That is the runtime/product result of the Slice; it is not the same meaning as `Target Step Result`.

Prefer:

```text
Target Step Result:
  Implementation Slice Plan

Result Unit:
  Slice Outcome Definition

Field:
  Useful Vertical Result
```

over the linguistically ambiguous:

```text
Target Result contains Useful Vertical Result
```

### Example — literal implementation

IDTSPE is not restricted to prose plans.

```text
Target:
  realize selected CaptureItem Domain behavior

Target Step Result:
  exact selected implementation

Result Unit:
  CaptureItem source payload
```

In this Target family, literal future code may itself be the desired Result Unit rather than an example inside a planning document.

Whether a profile actually installs such a realization Target Module is profile-specific. Core only permits the representation/result shape.

---

## 3. Target Step Result Unit

Full term:

```text
Target Step Result Unit
```

Short form when context is clear:

```text
Result Unit
```

Definition:

```text
Result Unit
= one meaningful part/entity/section/output unit
  inside the Target Step Result
  that deserves explicit or separately addressable processing.
```

A Result Unit may deserve explicit treatment because it has its own:

```text
purpose
questions
internal structure
validation
materiality
consumer
review focus
handoff
representation/persistence destination
```

A Result Unit is **not automatically**:

```text
a separate Target
a separate semantic owner
a separate Target Module
a separate file
a new Core methodology type
```

### Example — composite Slice result

```text
Target Step Result:
  Implementation Slice Plan

Result Unit:
  Slice Outcome Definition
  Purpose:
    establish what useful/checkable outcome the Slice must deliver

Result Unit:
  Runtime Path
  Purpose:
    describe the selected running-system path

Result Unit:
  Codebase Integration Path
  Purpose:
    map the running behavior to existing/planned code owners and calls

Result Unit:
  Focused Part Plan
  Purpose:
    expand one already-selected non-trivial hop when useful

Field group inside Result Unit:
  Slice Outcome Definition.verificationObligations
  Purpose:
    state what later proof must establish without creating a separate Slice Result Unit by default
```

All of those Units may remain sections of one planning artifact. Unit identity does not force file splitting.

### Example — several physical destinations

```text
Target Step Result:
  exact software realization

Result Unit:
  Realization Intent
  → planning/review representation

Result Unit:
  CaptureItem.cs
  → implementation-native project file

Result Unit:
  Apply Manifest
  → package metadata

Result Unit:
  Review Projection
  → generated diff/view
```

One Target Step Result may therefore materialize asymmetrically.

---

## 4. IDTSPE State Unit

```text
IDTSPE State Unit
= one typed generic planning/resolution unit
  maintained by IDTSPE around the current Target work.
```

Core owns the generic State Unit kinds. Typical kinds include:

```text
Source
Question
Idea
Question / Risk / Problem (Q/R/P)
Decision
Evidence / Evidence Need
Planning Branch state/reference
Revalidation Signal
Target Relation / Handoff item when independently useful
persistence/representation state when materially useful
validation/readiness finding when independently useful
```

Existing names remain the normal prose vocabulary. Do not force labels such as `Risk Unit` when `Risk` is already unambiguous.

### Idea decision-context relations

A material `Idea` is a candidate response/solution, not every thought in discussion. When surfaced as a material IDTSPE Idea, its driver relation is explicit. `Goal / Desired Outcome` normally means the current Target/scope goal context rather than a separate Generic State Unit:

```text
current Target Goal / Desired Outcome context
Question
Problem (existing P-09 Problem meaning)
```

Useful lightweight Idea relations include `addresses`, `competes-with`, `complements`, `requires`, `conflicts-with` and `part-of-candidate-bundle`. A Candidate Bundle / Option Group is a grouping/comparison projection over compatible Ideas by default, not a new mandatory State Unit. Use a Planning Branch only for a materially deep alternative downstream planning network.

The driver/Idea/Q-R-P/Evidence relationships may first appear inline in Broad Discussion and are normalized in the next Integration Checkpoint when material. If Broad Discussion reveals an independently useful new Goal rather than merely refining the current Target Goal, normal scope/Target Formation resolves it.

Canonical interaction owner: [`broad-discussion-and-integration-checkpoint-model.md`](broad-discussion-and-integration-checkpoint-model.md).

The umbrella `IDTSPE State Unit` exists for:
- addressability;
- Lens interaction / Finding Disposition addressability;
- validation;
- persistence decisions;
- cross-reference/revalidation.

### State Units can be useful outputs

State Units are not merely invisible intermediates.

Example: a Lens/validation pass may leave the target-specific Step Result unchanged while surfacing:

```text
Risk R-17:
  persistence failure may be reported as success

Question Q-18:
  which boundary owns failure translation?

Evidence Need EN-19:
  run an integration test with persistence failure

Revalidation Signal RV-20:
  reopen if repository result semantics change
```

That is a useful IDTSPE Step Output even before a Result Unit changes.

If later resolution accepts:

```text
Decision D-21:
  ApplicationService owns failure-result mapping
```

the selected meaning may then update:

```text
Result Unit:
  Codebase Integration Path

Field:
  failurePropagation
```

### Decision retained context

Accepted material Decisions are retained in integrated semantic state by default. A Decision may reference the current Target Goal context / Question / Problem / Q-R-P it addresses, the selected Idea(s)/Candidate Bundle when useful, and optional `Rationale / Why`. Rationale explains selection logic and is distinct from Evidence. Retention/prompt rules are owned by [`broad-discussion-and-integration-checkpoint-model.md`](broad-discussion-and-integration-checkpoint-model.md) and [`user-input-decision-and-answer-intake-rule.md`](user-input-decision-and-answer-intake-rule.md).

---

## 5. Unit Definition Authority

The ownership boundary is strict:

```text
IDTSPE Core
→ defines generic State Unit kinds and generic lifecycle rules

Target Module / Local Target Contract
→ defines the Target Step Result family
→ defines target-specific Result Units and their fields/substructure

Lens
→ does not define either Unit kind
```

A Lens may discover content that causes the runtime to open/populate a new `Risk`, `Question`, `Idea`, `Evidence Need`, etc., but:

```text
Core
→ already defines that State Unit kind

Lens
→ supplies finding/proposal/evaluation content

IDTSPE Core
→ dispositions the finding into the applicable State/lifecycle/owner destination
```

Likewise, a Lens may affect a Result Unit only when that Unit/field already belongs to the active Target Module/Local Target Contract.

Repeated Lens findings revealing missing target-result meaning are a signal to:

```text
revise the Target Module Step-Result Contract
OR
let Core Finding Disposition resolve another Target/owner
OR
keep the meaning in generic State Units
```

not to create a Lens-owned result field silently.

---

## 6. Lens Analysis / Finding Boundary

A Lens should describe **what it meaningfully inspects** separately from **how the perspective is invoked**.

Use proportionally:

```text
Analysis Surface
  Primary Result Units / semantic selectors
  Conditional Result Units
  Relevant State Units
  Context

Supported Operations
  ANALYZE
  CHECK
  REFINE
  CHALLENGE

Typical Findings / Finding Contract
```

### Analysis Surface

The Analysis Surface is a Lens property.

```text
Context
→ supporting material the Lens may consult

Primary / Conditional Result Units
→ target-specific result meaning the Lens deliberately analyzes

Relevant State Units
→ Questions / Risks / Decisions / Evidence / etc.
   that materially affect the evaluation
```

Context availability does not imply auditing all context.

### Lens operations

```text
ANALYZE
→ inspect the surface through the Lens perspective

CHECK
→ evaluate against Lens criteria/guards

REFINE
→ identify/propose a more precise or missing meaning
  where the semantic destination is already understood

CHALLENGE
→ seek reasons selected/accepted meaning may be wrong,
  weak, stale or unsupported
```

A Lens may support only the operations that make sense for that perspective.

### Finding boundary

A Lens operation may contribute explanatory analysis/Key Points that remain Broad Discussion only. A materially newly surfaced observation crosses into a `Finding Candidate` only when ownership/State/lifecycle disposition is needed.

The Lens does **not** own generic routing/lifecycle consequences such as:

```text
open/refine Question or Risk
REOPEN
update Result Unit after resolution
handoff to another Target
Target Formation
```

Those are handled by the generic Core [`Finding Disposition Contract`](finding-disposition-contract.md).

Canonical path:

```text
Lens operation
→ explanatory analysis / Key Points when useful
→ Finding Candidate only for material semantic consequence needing disposition
→ Core Finding Disposition
→ State/lifecycle/ownership resolution
→ normal authority/resolution
→ existing Result Unit update when warranted
```

This replaces the earlier Lens-operation vocabulary that mixed `ROUTE`, `REOPEN` and `AFFECT / UPDATE AFTER RESOLUTION` into the Lens itself.

## 7. Target Module Step-Result Contract

A Target Module defines one recurring Target family and the **possible result surface**, not a questionnaire that requires uniform completion.

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

The Step-Result Contract should explain proportionally:

```text
what useful Step Result this family aims to produce
which Result Units may compose it
what each Unit means and why it exists
possible fields/substructure
relations among Units
validation/completeness meaning
typical consumers/handoff
representation guidance
```

The Resolution / Production Method may supply:

```text
Source archetype
Question candidates
Idea/pattern discovery aids
branch triggers
candidate answer shapes
Internal Object Contracts
shared Result-Unit methods
Decision surfaces
```

Concrete Questions/Ideas/Q/R/P/Decisions remain generic State Units. The Module contributes reusable ways to discover/resolve them; it does not duplicate their Core lifecycle inside the Result schema.

---

## 8. Proportional / Sparse Projection Rule

```text
Target Module Step-Result Contract
= possible/addressable semantic surface

Concrete Target Step Result
= only the applicable, supported and material projection
  for this Target step
```

A declared Result Unit/field does **not** mean:
- it must be asked;
- it must be resolved;
- it must be persisted;
- it must be equally detailed;
- its absence automatically creates Q/R/P.

Existing `Output Schema` / `Target-specific Output Template` terminology remains a compatibility/technical projection vocabulary. The semantic owner is the Step-Result Contract; a template is one way to project it.

---

## 9. Internal Object Contract Boundary

```text
Result Unit
= concrete target-result processing/addressability part

Internal Object Contract
= reusable object schema/questions/validation
  owned inside one Target Module
```

Example:

```text
TM-SCENARIO-PLANNING

Result Unit:
  Behavioral Decomposition

Internal Object Contracts:
  Scenario DATA
  Behavior Item
```

An Internal Object Contract may define several addressable objects inside one Result Unit.

Physical separation/addressability does not create a new Target.

### Supporting Target Module Boundary

A `SUPPORTING TARGET MODULE` is still a **real reusable Target Module**.

It is justified only when its recurring Target/Step-Result family can also make sense independently as a bounded Target family, even if one invocation reuses it in a supporting role inside another Target.

```text
can be a coherent Target family by itself
+ can contribute inside another Target
→ Supporting Target Module role is valid

can only exist as an internal part of one parent Target result
→ not a Target Module
→ use Result Unit / Internal Object Contract / shared Result-Unit method
```

Supporting-role use does not automatically create a child Target Instance. A separate Target exists only when normal Target Formation establishes an independently useful planning responsibility/result.

---

## 10. Resolution Slot Boundary

Current Core may use a `Resolution Slot` to track one planning subject's prompt/status/value/resolution metadata.

```text
Resolution Slot
= resolution-state/coordination structure

IDTSPE Unit
= meaningful content/work item
```

Do not infer:

```text
one Result Unit field
→ one Resolution Slot

one State Unit
→ one Resolution Slot
```

Use Slots only where the generic resolution mechanism benefits from explicit status/value bookkeeping.

The canonical Target Formation `TF-*` slots remain valid until separately revised.

---

## 11. Persistence / Representation

```text
Unit identity
≠ file identity
```

Both Result Units and State Units can be persisted independently when useful.

Example:

```text
Result Unit:
  Slice Outcome Definition
→ current Slice planning owner

Result Unit:
  Codebase Integration Path
→ same planning owner

Decision D-21
→ durable rationale in current owner when revalidation value is material

Risk R-17
→ persist while unresolved when downstream work needs it

rejected Idea I-02
→ EPHEMERAL
```

The current canonical persistence path remains:

```text
Documentation / Representation Lens when material
→ P-14 / TF-10
→ Artifact Placement View
```

until that representation subsystem is changed by a separate accepted Core transition.

This model does not itself force a Markdown file or one-file-per-Target.

---

## 12. Downstream Source Boundary

Another Target's accepted result becomes a Source only explicitly.

Useful Unit-level handoff is allowed:

```text
Target A
  accepted Result Unit RU-03
↓ explicit Source relation
Target B
```

The entire physical artifact need not become one undifferentiated Source merely because several Units share a file.

---

## 13. High-Level End-To-End Example

```text
Target:
  SL-CAP-01

Module:
  TM-IMPLEMENTATION-SLICE

Current Step intent:
  produce a codebase-level implementation plan
```

Current State Units:

```text
Sources:
  SCN-CAPTURE
  CaptureItem Domain owner
  current CaptureController
  current CaptureRepository

Question:
  which existing owner should orchestrate capture?

Idea:
  reuse CaptureApplicationService

Risk:
  persistence failure may be reported as success
```

Target Step Result:

```text
RU-SLICE-01 Slice Outcome Definition
  + verification/proof-handoff meaning
RU-SLICE-02 Responsibility / Dependency Boundary
RU-SLICE-03 Runtime Path
RU-SLICE-04 Codebase Integration Path
RU-SLICE-05 Focused Part Plan(s) — only when material
```

Slice Integration Lens Analysis Surface:

```text
Primary Result Units:
  RU-SLICE-01
  RU-SLICE-02
  RU-SLICE-03
  RU-SLICE-04

Conditional:
  RU-SLICE-05

Relevant State:
  Questions / Risks / Decisions / Evidence / Revalidation

Context:
  Scenario / Domain / Screen / current code
```

Lens operation:

```text
CHECK
```

Finding Candidate:

```text
Meaning:
  repository failure has no explicit truthful return path

Affected:
  RU-SLICE-04.failurePropagation

Related accepted meaning:
  RU-SLICE-01 forbids false success
```

Core Finding Disposition may resolve:

```text
Risk R-17:
  persistence failure may be reported as success

Question Q-18:
  which owner maps repository failure into the semantic result?
```

After ordinary authority/resolution:

```text
Decision D-21:
  ApplicationService maps repository result
```

RU-SLICE-04 is then updated:

```text
Repository.save(...)
→ ApplicationService.mapResult(...)
→ Controller.toResponse(...)
→ UI success/failure state
```

The Lens surfaced a finding. Core disposition/lifecycle resolved what to do with it. The Target Module continued to own the Result Unit.

## 14. Migration Compatibility

The canonical generic model is now:

```text
Target Module / Local Target Contract
→ explicit/implicit Target Step-Result Contract
→ target-specific Result Units

Lens
→ Analysis Surface
→ supported operations: ANALYZE / CHECK / REFINE / CHALLENGE
→ Finding Candidate

Core
→ Finding Disposition
→ State/lifecycle/ownership resolution
```

Installed SDS profile conformance is literal after the SDS migration:

```text
16 / 16 SDS Target Modules
→ Resolution / Production Method
→ Target Step-Result Contract

6 / 6 SDS-specific reusable Lenses
→ Analysis Surface
→ Supported Operations
→ Typical Findings / Finding Contract
```

Any reusable Lens body outside that literal SDS conformance remains readable through the generic compatibility interpretation until it is materially revised:

```text
Target Inputs / Evidence
→ Context + current analysis subject

Prompts / Evaluation Workflow
→ infer Analysis Surface from Lens purpose

Findings / Outputs
→ Finding Candidates

accepted finding that changes Target meaning
→ Core Finding Disposition
→ normal resolution
→ existing Result Unit update when warranted

Artifact / File Implications
→ current P-14 / TF-10 guidance
```

Compatibility does not restore Lens-owned routing, reopen or post-resolution update methods.

## 15. Key Invariants

```text
one Target
≠ one Result Unit
≠ one file

State Unit
≠ lesser/temporary by definition

Target Module
→ defines Result Units

Core
→ defines generic State Unit kinds

Lens
→ declares Analysis Surface + supported ANALYZE/CHECK/REFINE/CHALLENGE operations
→ surfaces Finding Candidates
→ does not define Unit kinds or own Finding Disposition

Lens finding
≠ accepted semantic meaning automatically

Result Unit addressability
≠ separate Target

Output schema
= projection contract
≠ mandatory questionnaire

persistence
= downstream representation decision
≠ definition of the Step Result
```
