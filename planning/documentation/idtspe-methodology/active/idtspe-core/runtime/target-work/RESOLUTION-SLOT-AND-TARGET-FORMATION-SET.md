# Resolution Slot And Target Resolution Requirement Model

Status: active generic IDTSPE model
Purpose: define the generic `Resolution Slot` coordination primitive while making **Target Resolution Requirements** the canonical completeness/coverage model for Target formation and resolution.

Compatibility note: this file keeps its historical filename so existing links remain valid. The former fixed `TF-*` Target Formation Resolution Set is no longer the canonical Target model.

Canonical Target Work Unit model: [`UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](UNIT-AND-TARGET-STEP-RESULT-MODEL.md).
Canonical Target/Source/Relation model: [`TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md`](TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md).

---

Responsibility IDs:
- `TARGET-FORMATION.REQUIREMENT-COVERAGE`
- `TARGET-FORMATION.REUSABLE-MODEL-CHECK`

<a id="resolution-slot-generic-contract"></a>
## 1. Generic Resolution Slot Remains A Reusable Primitive

Responsibility ID: `RESOLUTION-SLOT.GENERIC-CONTRACT`

A `Resolution Slot` is a reusable **resolution-state/coordination view for one planning subject** when a workflow benefits from tracking one value/state explicitly.

While unresolved:

```text
Resolution Slot
→ acts as a prompt / clarification requirement
```

After resolution:

```text
Resolution Slot
→ stores the selected/derived value
→ may reference a durable IDTSPE Decision when material
```

A Slot may still be useful outside Target formation. Composite Target Work Units now use the separate purpose-built **Unit Resolution Slot / Unit Resolution Set** contract owned by the canonical Unit model; they do **not** inherit this generic Slot contract. This revision does **not** globally replace generic Resolution Slots with Requirements.

```text
Resolution Slot
≠ Target Resolution Requirement
≠ Target Work Unit
≠ Unit Resolution Slot
≠ Unit Resolution Set
≠ Unit Resolution
≠ Core State Unit
```

A material Question, Proposal, Decision, Evidence item or Target Work Unit keeps its own natural semantic owner/lifecycle; a Slot may reference those owners without replacing them.

### Generic Slot Shape

```text
ResolutionSlot

ID

Subject
  what planning thing must be resolved?

Prompt
  question/prompt used to resolve it

Requiredness
  REQUIRED | PROPORTIONAL | OPTIONAL

Authority
  USER_OWNED
  SOURCE_DERIVABLE
  SHARED
  AI_CAN_PROPOSE

Status
  UNRESOLVED
  ANSWERED_FROM_USER_INPUT
  ANSWERED_FROM_TRUSTED_SOURCE
  DERIVED_NONDECISION
  PROPOSED_BY_AI
  UNRESOLVED_DECISION
  DEFERRED
  NOT_APPLICABLE
  ACCEPTED

Value
  current resolved value

Resolved From
  user input
  Source refs
  Decision refs
  Evidence refs
  branch result

Formal Decision Ref
  optional; ordinary Decision ref whose Subject identifies what was decided

Blocking
  yes | no

Reason / Notes

Reopen When
  optional
```

This generic vocabulary remains reusable. A concrete workflow may constrain it further, but Target Resolution Requirements are **not** a renamed Slot status model.

### Interaction Rule

A Slot prompt is not automatically shown to the USER:

```text
Resolution Slot
↓
try current USER input
↓
try trusted Sources
↓
derive safely when non-decision
↓
AI may propose candidate value
↓
if material user-owned choice remains unresolved:
  render Slot Prompt as a user-facing question
```

A durable Decision, when useful, follows the normal Decision lifecycle and is identified by its natural `Subject`; Core no longer defines special Target-Scope / Question-Set / Answer Decision kinds.

### Reusable Resolution Set

A `Resolution Set` is a named collection of Resolution Slots used by a workflow, component or pack. It remains a generic reusable coordination primitive:

```text
Resolution Set
= named collection of Resolution Slots
= checklist/status model for the workflow subjects it coordinates
```

This revision removes only the **fixed Target Formation `TF-*` Resolution Set as the canonical Target model**. It does not remove generic Resolution Sets. Unit internals use a separate specialized `Unit Resolution Set` of `Unit Resolution Slots` only when a composite Unit needs formal modular resolution; that specialized contract is defined by the Unit model and is not derived from this generic Resolution Set.

### Generic Resolution Set Behavior

A Resolution Set is iterative coordination state rather than a one-shot questionnaire. Material changes may reopen related Slots when their resolved values are no longer sufficient. Dependencies/reopen relationships are explicit when they matter; a Set does not require a universal dependency graph.

```text
Slot value / Source / Decision changes
→ affected Slot or dependent Slot may reopen
→ preserve still-valid resolved Slots
→ resolve only the material gap
```

Validators and Guards remain distinct from Slots:

```text
Validator
→ checks Slot/Resolution Set state or completeness
→ may surface a Finding
→ does not choose a Slot value

Guard
→ constrains how a Slot may resolve
→ preserves authority / non-promotion / no-solution-smuggling rules
```

USER input is consumed once and matched against all relevant unresolved Slots. One input may resolve several Slots; already sufficiently resolved Slots are not re-asked merely because another Slot remains open. Values may be held directly or by reference to the natural Source/Decision/Evidence/branch result when that owner should remain authoritative.

---

## 1A. Generic Slot vs Unit Resolution Slot

Do not preserve the historical generic Slot merely to model Unit decomposition. The two primitives serve different needs:

```text
Generic Resolution Slot
= generic workflow coordination around one subject/value

Unit Resolution Slot
= terminal formally tracked sub-responsibility inside one parent Target Work Unit
  with Result Content Contract and Unit-shaped inherited/narrowed guidance
```

Normative Unit Slot semantics — including separate Applicability / Materiality / Disposition, substantive `OPEN | PARTIAL | RESOLVED | BLOCKED | DEFERRED` state, Current Resolution Content, prepared/contextual Slot composition and the no-subslots rule — are owned by [`UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-slot-contract). There is no inheritance relation between the two Slot contracts unless a future revision explicitly introduces one.

---

## 2. Why Target Formation No Longer Uses A Fixed Slot Set

The historical `TF-01..TF-10` set mixed several different concerns:

```text
Target identity/forming concerns
Question/Lens/Proposal/Branch runtime mechanisms
Handoff and persistence completeness concerns
```

It also treated several multi-owner completeness needs as if each were one value-bearing Slot. That does not fit the current Target model, where one need can be covered by several Units/Sources/Decisions and one Unit can cover several needs.

Canonical Target reasoning therefore uses **Target Resolution Requirements** rather than a fixed Target Formation Slot Set.

Historical `TF-*` labels may appear in old evidence or external projections, but new methodology material must use semantic names rather than rely on those IDs.

---

<a id="target-formation-requirement-coverage"></a>
## 3. Target Resolution Requirement

Responsibility ID: `TARGET-FORMATION.REQUIREMENT-COVERAGE`

A `Target Resolution Requirement` is a **need / completeness criterion that the concrete Target must sufficiently cover**.

```text
Target Resolution Requirement
= what must be sufficiently true/resolved for this Target
```

It is not automatically a question, a Unit, or a semantic result owner.

```text
Requirement
→ may be covered directly by Target state / Source / Decision
→ may require one or more Target Work Units
→ may use Lenses as evaluators/helpers
→ may remain OPEN/PARTIAL when continuation is legitimate
```

### Requirement Shape

```text
TargetResolutionRequirement

ID
Need / Subject
Applicability
Completion Criterion
Resolution Authority       when material
Guidance
Prepared Questions / Prompts
Helpful Lenses
Prepared Coverage Candidates
Status
  OPEN
  PARTIAL
  COVERED
  NOT_APPLICABLE
  BLOCKED
  DEFERRED
Covered By
  Target-state refs
  Source / Evidence refs
  Decision refs
  Current Result Content refs
  combinations thereof
Result / State Destination when a concrete owner exists
Reopen When
```

`Prepared Questions / Prompts` are reusable guidance. They do not automatically create formal Question State or USER-facing questions.

`Helpful Lenses` evaluate/clarify coverage. A Lens application is normally **not itself sufficient coverage**; it may surface Findings that cause Source/Decision/Unit/Target changes.

`Prepared Coverage Candidates` point to known reusable ways to satisfy the need, such as a Core-defined Unit Definition. Applicability is still checked at runtime.

Prepared mapping is not completion:

```text
Requirement mapped to a prepared/open Unit
≠ Requirement COVERED

Requirement becomes COVERED
only when its Completion Criterion is satisfied
by current actual Target state / Sources / Decisions / Unit Current Result Content.
```

A Unit may therefore be the correct coverage responsibility while the Requirement remains `OPEN` or `PARTIAL`.

### Coverage Cardinality

```text
one Requirement
→ may be covered by several Units / Sources / Decisions

one Unit
→ may cover several Requirements
```

For every material Requirement, the concrete Target must make it possible to recover **what covers it**. When the mapping is already unambiguous from the Target Module/Unit structure, representations need not duplicate it verbosely.

---

## 4. Where Requirements Come From

Requirements have two semantic origins:

```text
1. current task / problem / accepted Sources within the chosen Target scope
   → material requirements of this concrete bounded responsibility

2. universal Core Target requirements
   → methodology-level needs that apply to Targets by applicability
```

Not every task-derived Requirement must be fully enumerated before reusable methodology is checked. Before `REUSABLE_TARGET_MODEL_CHECK`, preserve explicit/already-obvious Requirements, but stop once enough provisional purpose/scope/problem surface exists to recognize a recurring Target family.

A Target Module Model is **not a third semantic source of requirements**. Instead, it contains reusable analysis already performed for a recurring Target family:

```text
recognize a recurring scope/problem pattern
→ help inspect the concrete task/scope/Sources for recurring requirement patterns
→ formulate/recognize the actual grounded Requirements that are really present
→ provide prepared Module-defined Unit Definitions that cover them
→ provide questions/guidance/lenses/validators/result composition
```

If no suitable Model exists, or if the selected Model does not cover the whole concrete scope, contextual analysis derives/clarifies the remaining grounded Requirements. A Requirement is never true merely because a Module declares a pattern; it remains grounded in the current task/scope/Sources.

---

## 5. Universal Core Target Requirements

Core defines a small prepared set of broadly reusable requirements. They are applicability-driven, may be resolved iteratively and may reopen each other.

### `PURPOSE_RESULT`

Need: the Target has a useful bounded purpose and desired Target Step Result.

Typical guidance:

```text
What useful planning result should exist after this Target step?
Why is this responsibility worth treating as a bounded Target now?
```

Typical coverage: USER input, trusted Sources, safe derivation, or a material Decision when a real choice exists.

Helpful Lens: Need / Value / Scope.

### `BOUNDED_SCOPE`

Need: the current Target has a useful boundary inside the larger problem.

Typical guidance:

```text
Is solving the whole problem now actually cheaper/clearer?
If not, what smallest useful coherent responsibility can be resolved now?
What must remain outside this Target?
Does the boundary preserve a self-contained useful result?
```

Typical coverage: `Target.Scope`, optionally supported by a Decision when the boundary is materially contested.

Helpful Lenses: Need / Value / Scope; Uncertainty / Assumption / Reversibility; Dependency / Change Impact when material.

### `SOURCE_AUTHORITY`

Need: the Target has sufficient authoritative Source/Evidence/constraint basis for the material work.

Typical coverage: Source State Units/bindings and accepted Source authority. A dedicated Target Work Unit is **not required** merely because Source resolution exists.

Helpful Lens: Authority / Source-of-Truth / Reuse.

### `OWNER_RELATIONS`

Need: material ownership/Target relations are sufficiently clear for the current Target.

Typical coverage: Target Relations and natural semantic-owner resolution.

Helpful Lenses: Authority / Source-of-Truth / Reuse; Dependency / Change Impact.

### `HANDOFF_CONTINUATION` — when applicable

Need: when the Target result has a downstream consumer/continuation, the consumer/source handoff and readiness are sufficiently clear.

Typical coverage: Target Handoff state, downstream Source binding and active profile/family readiness guidance through `P-13 Handoff / Methodology Direction`.

### `PERSISTENCE_ADDRESSABILITY` — when applicable

Need: material meaning that should survive the current pass has sufficient semantic ownership and representation/addressability.

Typical coverage: Documentation / Representation analysis plus generic `P-14 Persistence / Artifact` machinery, including `NO_PERSISTENCE_NEEDED` when appropriate.

This Requirement is Target-level completeness; `P-14` remains a Core-wide resolver also usable for non-Target meaning such as Pass Trace, Proposal/Decision or Work-Context state.

---

## 6. Core Completeness Invariants Are Not Peer Requirements

The following are cross-cutting validators/invariants over the Target, not recursive peer Requirements:

```text
all material Target requirements have sufficient coverage
no material concern silently disappears because its owner/destination is unclear
Target work composition is sufficient for the intended step
Target Step Result is sufficiently ready for the intended continuation/handoff
```

A reusable coverage Lens/validator may evaluate these invariants and surface Finding Candidates. The Target Formation/Resolution authority owns actual composition consequences.

---

<a id="target-formation-reusable-model-check"></a>
## 7. Required Reusable Target Model Check

Responsibility ID: `TARGET-FORMATION.REUSABLE-MODEL-CHECK`

Target Formation has one mandatory reuse rule as soon as enough provisional purpose/scope/problem surface exists to test recurring structure:

```text
REUSABLE_TARGET_MODEL_CHECK

current task/Sources
+ provisional Target purpose/scope/problem surface
+ explicit/already-obvious Requirements when present
+ applicable universal Core Target Requirements
→ scan the applicable Target Module Registry
→ inspect plausible Target Module Models
→ apply applicability / Entry Point / Source prerequisites
→ APPLIED(TM-X)
   or NO_APPLICABLE_TARGET_MODULE
```

This is **not a task Requirement**. It is a Target Formation operation/rule whose observable state may reopen when scope/Sources/material requirements change.

When a reusable Model is applied:

```text
Target Module Model
→ Target Module Instance
→ use prepared recurring-scope analysis to recognize/formulate
   actual Requirements grounded in the current task/scope/Sources
→ map those Requirements to prepared Module-defined Unit Definitions
→ instantiate the complete Module-defined Unit inventory
```

When no reusable Model applies, contextual analysis performs that scope/Requirement decomposition locally. A selected Model does not need to cover the whole concrete Target; contextual/Core completion handles the remainder.

---

## 8. Prepared Coverage Versus Contextual Completion

### Prepared Module Coverage Exists

```text
current task/scope exposes Requirement R
→ selected Target Module recognizes R-like need
→ prepared Module-defined Unit U covers that responsibility
→ instantiate the complete Module-defined Unit inventory
→ execute substantive Unit Resolution only where material
→ Current Result Content contributes to Requirement coverage
```

A declared Module-defined Unit remains addressable as `RESOLVED`, `OPEN` or explicit omission according to the complete-inventory rule.

### Prepared Core Coverage Exists

```text
Requirement / actual situation
→ applicable Core-defined Unit Definition exists
→ instantiate that Core Unit only when applicable
→ execute proportionally
→ Current Result Content contributes to Requirement coverage
```

Core-defined Units are applicability-driven; Core does **not** instantiate a complete global Unit inventory for every Target.

### No Prepared Unit Covers The Need

First check whether the Requirement can be covered directly. If actual bounded work is needed:

```text
Requirement R
→ DEFINE Contextual Unit
   Responsibility
   Inputs / Sources
   Drivers / useful questions
   Guidance
   Helpful Lenses
   Result Contract
   Validators
   Result Destination
→ EXECUTE Contextual Unit Resolution
→ Current Result Content
→ Requirement coverage
```

Defining and executing the Unit are distinct operations. A Contextual Unit Definition is local to this concrete Target; recurrence may later justify promotion into a reusable Core-defined or Module-defined Unit, but reuse is not automatic.

### Scope Or Requirement Itself Is Still Insufficient

Contextual completion is not limited to adding Units:

```text
uncovered/unclear current work
→ refine or split Target Scope
→ derive/clarify a contextual Requirement from the actual task
→ reuse an existing prepared Unit if it fits
→ otherwise define a Contextual Unit
```

The methodology must not invent a Unit merely to avoid reconsidering an incorrectly bounded Target.

---

## 9. `CORE-U-UNROUTED-CONCERNS`

Core provides one prepared Target Work Unit for material meaning whose correct natural subject/owner/destination is not yet sufficiently clear **inside an already formed Target**. Because it is a Target Work Unit, it is never instantiated in zero-Target Broad Discussion. Before Target formation, the concern stays in Work Context / natural Core State and may feed a GIP or Target Formation candidate.

```text
CORE-U-UNROUTED-CONCERNS
Cardinality: 0..1 instance per Target
Contains: 0..N material Concern items
```

Possible Concern kinds include:

```text
Question
Risk
Problem
Finding
Generic AI Proposal (GIP)
unclear Requirement
partially classified planning meaning
other material concern
```

The type may already be known. What is unresolved is the **proper semantic placement/owner/destination**.

The Unit's responsibility is temporary retention + disposition, for example:

```text
Concern A → existing Unit
Concern B → Q/R/P
Concern C → Proposal
Concern D → new Contextual Unit
Concern E → another/new Target candidate
Concern F → Source/Evidence owner
Concern G → DEFERRED / BLOCKED
Concern H → NON_MATERIAL
```

It is not a permanent miscellaneous backlog.

---

## 10. Target Formation Versus Target Resolution

`Target Formation` establishes a Target form sufficient to perform useful work:

```text
Target identity
+ purpose/result intent
+ bounded scope
+ Source/Relation basis
+ Target Module Instance when reusable coverage applies
+ applicable Core-defined Unit instances
+ defined Contextual Unit responsibilities when already known
+ applicable/open Target Resolution Requirements
```

A sufficiently formed Target may still contain `OPEN` Requirements/Units.

```text
Target sufficiently formed
≠ Target fully resolved
```

`Target Resolution` executes/refines work inside that form. New Findings/requirements may reopen formation, so the relation is iterative:

```text
Formation ↔ Resolution
```

---

## 11. Questions, Proposals, Branches And Lenses Are Mechanisms, Not Fixed Target Fields

The former prepared/contextual question guidance on the natural Requirement/Unit subject, Lens applicability/selection, Proposal lifecycle on the natural subject and Branch applicability on the natural subject are no longer fixed Target Formation fields.

Reusable question/prompt packs remain valid as guidance on Requirements, Target Modules, Unit Definitions and Unit Resolution Slots. Runtime Questions remain Core State Units when independent lifecycle/addressability is useful.

Lenses are selected through the normal Lens applicability machinery (`P-06`). Proposals use `P-07`; Planning Branches use `P-08`; Q/R/P uses `P-09`; Decisions use `P-10`.

Attach each item to its natural Requirement/Unit/Target/Work-Context subject rather than projecting it into a duplicate Target-level field.

---

## 12. Decision Semantics

Core does not define a closed legacy three-kind Decision taxonomy for scope/question-set/answer choices.

A material Decision is identified by its natural `Subject` and selected meaning:

```text
Decision
Subject: Target Scope | Requirement | Unit | Proposal | representation choice | ...
Selected meaning: ...
Authority / rationale / revalidation: proportional
```

A phrase such as "decision about Target Scope" is a descriptive projection, not a separate Decision ontology kind.

---

## 13. Target Resolution Coverage Lens

A reusable Target Resolution Coverage Lens may inspect:

```text
Target scope
material Requirements
Target Module prepared coverage
Core-defined Unit coverage
Contextual Unit coverage
open material concerns
```

Typical checks:

```text
material Requirement without sufficient coverage?
material question/concern revealing a missing Requirement?
Unit with no material need/responsibility?
Target Module coverage insufficient for current scope?
need for Contextual Unit or scope split?
```

The Lens surfaces Finding Candidates. It does not own Target composition changes; Target Formation/Resolution applies the consequences.

---

## 14. Target Formation / Resolution Authority

This model is authoritative for the composition consequences of Target formation/resolution:

```text
form/refine provisional Target purpose + bounded scope/problem surface
run REUSABLE_TARGET_MODEL_CHECK when enough provisional surface exists
recognize/derive grounded Target Resolution Requirements
perform contextual completion for uncovered scope/Requirements
route each material Requirement to direct/prepared/contextual coverage
compose applicable Core-defined, Module-defined and Contextual Target Work Units
apply coverage Findings/consequences after normal Finding Disposition
determine whether Target Form is sufficient to execute/continue work
```

The Shell provides runtime ports, Lenses evaluate, and Target Module Models provide prepared reusable analysis/coverage. None of those replaces this Target formation/resolution authority.

---

## 15. Key Invariants

```text
Requirement originates in current task/scope/Sources or universal Core Target need
Target Module Model = prepared reusable analysis/recognition/coverage, not semantic requirement source
Requirement ≠ Unit
Lens ≠ Requirement coverage owner by itself
prepared Unit reference ≠ automatic Unit execution
Module-defined Unit inventory = complete for selected Target Module Instance
Core-defined Unit inventory = applicability-driven, not globally predeclared
Contextual Unit = DEFINE locally, then EXECUTE
Contextual Unit ≠ automatically reusable
no prepared coverage → contextual scope/requirement analysis before inventing work
Target Form ≠ one legacy type/form-slot value
Target sufficiently formed ≠ fully resolved
Resolution Slot remains generic but is not the Target Formation primary model
Unit Resolution Slot is a separate specialized terminal Unit-internal contract; no subslots
```
