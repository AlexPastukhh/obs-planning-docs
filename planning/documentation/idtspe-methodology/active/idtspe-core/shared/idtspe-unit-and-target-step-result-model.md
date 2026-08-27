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

`IDTSPE Step Output` is an explanatory umbrella for the material output of one work pass. It is **not** a new semantic owner and does not imply one persisted record.

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

Result Unit:
  Proof/Test Handoff
  Purpose:
    state what later proof must establish
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

The umbrella `IDTSPE State Unit` exists for:
- addressability;
- Lens interaction/routing;
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

IDTSPE runtime
→ routes/fills/refines the applicable Core-defined State Unit
```

Likewise, a Lens may affect a Result Unit only when that Unit/field already belongs to the active Target Module/Local Target Contract.

Repeated Lens findings revealing missing target-result meaning are a signal to:

```text
revise the Target Module Step-Result Contract
OR
route to another Target/owner
OR
keep the meaning in generic State Units
```

not to create a Lens-owned result field silently.

---

## 6. Lens Interaction Vocabulary

Use a compact family vocabulary rather than many near-synonymous pseudo-operations:

```text
READ / ANALYZE
FILL / REFINE
CHALLENGE / REOPEN
CHECK / VALIDATE
AFFECT / UPDATE AFTER RESOLUTION
ROUTE
```

The words around `/` are contextual shades of one operation family, not separate runtime mechanisms.

### READ / ANALYZE

A Lens may need broad context while intentionally focusing on a smaller analysis subject.

Use when useful:

```text
Context Reads
Focused Reads / Analysis Focus
```

Both are reading/analysis:
- `Context Reads` = supporting context;
- `Focused Reads` = deliberate primary analysis surface.

### FILL / REFINE

Add missing material information or make existing information more precise.

Example:

```text
Risk:
  integration may fail
```

may be refined into:

```text
Risk:
  changing CaptureResponse removes failureCode used by
  CaptureScreen and retry telemetry
```

### CHALLENGE / REOPEN

Expose a reason an existing value/Decision/closure may be wrong or stale.

`CHALLENGE` describes the evaluation finding; `REOPEN` is the lifecycle effect when that challenge is material.

A Lens does not silently replace an accepted Decision.

### CHECK / VALIDATE

Test correctness, consistency or readiness.

`VALIDATE` emphasizes use of the check in readiness/exit-gate resolution; it is not a separate Lens mechanism.

### AFFECT / UPDATE AFTER RESOLUTION

A Lens finding may ultimately change an already-declared Result Unit/field after normal authority/resolution.

```text
Lens finding
→ State Unit / Decision input
→ ordinary IDTSPE resolution
→ accepted change
→ existing Result Unit updated
```

Trusted, low-contention source-derived correction may be integrated proportionally without manufacturing a ceremonial Decision; Lens authority still does not replace semantic-owner authority.

### ROUTE

Send the finding/information to the correct:
- State Unit;
- Result Unit;
- Target;
- semantic owner;
- Evidence path;
- revalidation path.

---

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
TM-SCENARIO-DRAFT

Result Unit:
  Scenario Semantic Model

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
RU-01 Slice Outcome Definition
RU-02 Runtime Path
RU-03 Codebase Integration Path
RU-04 Focused Part Plan — only when material
RU-05 Proof/Test Handoff
```

Slice Integration Lens:

```text
Context Reads:
  Scenario / Domain / Screen / current code / Decisions / Evidence

Focused Reads:
  RU-01 obligations
  RU-02 failure branches
  RU-03 hops + failure propagation
```

Finding:

```text
Risk:
  repository failure has no truthful return path
```

After ordinary resolution:

```text
Decision:
  ApplicationService maps repository result
```

RU-03 is updated:

```text
Repository.save(...)
→ ApplicationService.mapResult(...)
→ Controller.toResponse(...)
→ UI success/failure state
```

The Lens affected an existing Result Unit. It did not define a new Unit or become semantic authority.

---

## 14. Migration Compatibility

This owner introduces canonical vocabulary before every installed profile Module/Lens has been rewritten to use explicit Unit headings.

During the staged migration:

```text
existing Target Module:
  current Target-specific output headings
  → interpret as Result Unit(s) / fields according to meaning

existing Lens:
  Target Inputs / Evidence
  → interpret as context/focus reads

  Findings / Outputs
  → route through Core-defined State Units

  accepted finding changing Target output
  → map to existing target-output meaning

  Artifact / File Implications
  → remains current P-14/TF-10 guidance
```

New or materially revised Target Modules/Lenses should use the explicit Unit vocabulary.

A later profile-conformance ChangeSet may make Unit boundaries/routing literal in each installed Module/Lens without changing the generic meaning introduced here.

---

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
→ reads/analyzes/fills/refines/challenges/checks/routes
→ does not define Unit kinds

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
