# Resolution Slot And Target Formation Resolution Set

Status: active generic IDTSPE model  
Purpose: reuse one structure for both:
1. a question / missing planning requirement;
2. the resolved value / accepted planning choice that fills that requirement.

This replaces the need to model Target Formation as:
`separate discovery checks + separate decision/questions`.

---

# 1. Core Concept — Resolution Slot

A `Resolution Slot` represents one planning subject that must be sufficiently resolved.

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

Therefore:

```text
question
and
resolved planning value
```

are two states of the **same slot**.

---

# 2. Literal Slot Shape

```text
ResolutionSlot

ID

Subject
  what planning thing must be resolved?

Prompt
  question used to resolve it

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
  optional
  Target-Scope / Question-Set / Answer Decision

Blocking
  yes | no

Reason / Notes

Reopen When
  optional
```

---

# 3. Same Slot, Different Interaction State

Example:

```text
Slot:
  TARGET_SCOPE

Prompt:
  Какую часть реальности должен охватывать этот Target?
```

Before resolution:

```text
Status:
  UNRESOLVED
```

If user already supplied scope:

```text
Status:
  ANSWERED_FROM_USER_INPUT

Value:
  ...
```

If AI proposes a material scope:

```text
Status:
  UNRESOLVED_DECISION

Value:
  proposed scope
```

Then the same `Prompt` may become a user-facing clarification/decision question.

After user accepts:

```text
Status:
  ACCEPTED

Formal Decision Ref:
  Target-Scope Decision
```

No separate “question entity” and “decision requirement entity” are needed.

---

# 4. User-Facing Question Is Conditional Rendering Of A Slot

A slot prompt is not automatically shown to the user.

Flow:

```text
Resolution Slot
↓
try current user input
↓
try trusted Sources
↓
derive safely when non-decision
↓
AI may propose candidate value
↓
if material user-owned choice remains unresolved:
  render slot Prompt as user-facing question
```

Therefore:

```text
Resolution Slot Prompt
≠ automatically user-facing question
```

It follows the existing User Question Policy.

---

# 5. Durable IDTSPE Decisions Remain The Same Three Types

`Resolution Slot` is not a fourth Decision type.

A material slot may produce/reference:

```text
Target-Scope Decision
Question-Set Decision
Answer Decision
```

Examples:

```text
TARGET_SCOPE slot
→ Target-Scope Decision

QUESTION_SET slot
→ Question-Set Decision

SELECTED_ROUTE slot
→ Answer Decision
```

Other slots may be resolved without inventing a formal Decision.

Example:

```text
SOURCE_SET
→ derived from trusted current owners
→ DERIVED_NONDECISION
```

unless choosing between materially different Source authorities is itself a Decision.

---

# 6. Reusable Resolution Set

A `Resolution Set` is a named collection of slots used by a workflow/Target Type/Pack.

Example:

```text
TARGET_FORMATION_RESOLUTION_SET
```

The set is both:

```text
a checklist of what must be resolved
and
a status/state model of what has already been resolved
```

This is the reuse mechanism.

---

# 7. Target Formation Resolution Set

Canonical Target Formation uses the following reusable slots.

```text
TF-01 PURPOSE_OUTPUT

Prompt:
  Какой полезный planning result должен существовать,
  когда Target завершён?

Value:
  Target purpose + completion output


TF-02 TARGET_TYPE_FORM

Prompt:
  Какой Target Type / local Target Contract
  должен владеть этим результатом?

Value:
  reused Target Type
  or local Target Contract
  or split/composition/evidence-operation decision


TF-03 TARGET_SCOPE

Prompt:
  Какую точную часть принятых Sources / реальности
  должен охватывать этот Target?

Value:
  inside/outside/boundaries
  + Target-Scope Decision when material


TF-04 SOURCE_SET

Prompt:
  Какие Source-of-Truth / Evidence / Constraints
  реально нужны для этого Target?

Value:
  typed Source Contract


TF-05 TARGET_RELATIONS

Prompt:
  С какими другими Targets связан текущий Target
  и какие это именно relations?

Value:
  Target Relations
  + explicit Source relations only where semantic dependency exists


TF-06 QUESTION_SET

Prompt:
  Какие вопросы нужно разрешить,
  чтобы Target output был достаточно надёжным/полезным?

Value:
  selected RQ set
  + Question-Set Decision


TF-06A LENS_SET

Prompt:
  Какие reusable Lens perspectives должны быть применены
  к material choice surfaces этого Target?

Value:
  Lens Applicability Scan result:
    REQUIRED_CORE
      L1 Need / Value / Scope
      L2 Authority / Source-of-Truth / Reuse
      L3 Uncertainty / Assumption / Reversibility
      Documentation / Representation / Artifact Boundary
        required at materialization; may resolve NO_PERSISTENCE_NEEDED
    + REQUIRED_BY_TARGET_PROFILE from active Target Module Lens Profile when a module is used
    + applicable registered Core Lens refs
    + applicable active-profile Lens refs
    + explicitly requested Lens refs
    + local-only Lens refs when genuinely needed
    + NOT_MATERIAL / NOT_APPLICABLE / DEFERRED disposition where useful

Rule:
  Lens Set may be recomputed when Target Scope / Sources / Question Set changes.
  A Local Target Contract participates without inventing a Target Module.
  Scan registry summaries/gates first; read full Lens / referenced Knowledge Basis only for selected or plausible candidates.
  Lens Prompt is not automatically a user question.


TF-07 IDEA_SPACE

Prompt:
  Какие materially different Ideas / variants / routes
  нужно рассмотреть для выбранных вопросов?

Value:
  sufficient candidate Idea space
  + provenance


TF-08 BRANCH_POLICY

Prompt:
  Достаточно ли сравнения на текущей глубине,
  или нужно прожить одну/несколько Ideas downstream
  через Planning Branch?

Value:
  no branch
  or selected branch roots / exploration objective / depth


TF-09 HANDOFF

Prompt:
  Что из результата этого Target
  станет Source/hand-off для каких следующих Targets?

Value:
  downstream Source/Handoff contract


TF-10 PERSISTENCE_ADDRESSABILITY

Prompt:
  Какая часть content/planning state текущего IDTSPE должна пережить turn,
  кто её semantic owner,
  и в каком artifact/file/register/companion она должна быть представлена?

Value:
  Artifact Placement View for material content:
    Semantic Owner
    Persistence:
      REQUIRED | PREFERRED | OPTIONAL | EPHEMERAL | UNRESOLVED
    Representation:
      EMBED_CURRENT_OWNER | EXISTING_ARTIFACT | NEW_CANONICAL_ARTIFACT |
      REGISTER_ENTRY | COMPANION_ARTIFACT | SUPPORTING_EVIDENCE_ARTIFACT |
      GENERATED_PROJECTION | UNRESOLVED
    Destination:
      exact path/ref | logical destination | UNRESOLVED
    Action:
      CREATE | UPDATE | REUSE | GENERATE | MOVE | MERGE | RETIRE | NONE | UNRESOLVED

  + full Artifact/File Pack handoff when representation choice is material

Rule:
  every material IDTSPE response exposes the placement state;
  file mutation remains separately authorized
```

---

# 8. Important Refinement — TF-01 vs TF-09

They are intentionally separate.

```text
TF-01
= what this Target must produce to be complete

TF-09
= how accepted output is consumed downstream
```

Example:

```text
TF-01:
  select one route for obtaining comparable datasets

TF-09:
  accepted comparable-dataset result
  becomes Source for discrepancy-detection Target
```

---

# 9. Slot Resolution Order Is Not Fixed

The set is not a waterfall.

Possible interaction:

```text
Scope discovery
→ reveals missing Source
→ Source changes Target Type
→ new Target Type changes Question Set
→ Idea reveals need for Branch
→ Branch reveals new Source
→ Handoff changes Scope
```

Therefore resolution is iterative:

```text
slots
↔ each other
```

A material change can reopen another slot.

---

# 10. Slot Dependencies / Reopen Examples

```text
TF-04 Source Set changes materially
→ may reopen TF-03 Scope
→ may reopen TF-06 Question Set
→ may reopen TF-06A Lens Set

TF-07 Idea Space exposes two independent outputs
→ may reopen TF-02 Target Type/Form
→ split into sibling Targets

TF-08 Branch exploration discovers a missing handoff
→ reopen TF-09

TF-09 reveals next Target cannot consume output
→ reopen TF-01 Purpose/Output
```

---

# 11. Status View

A workflow can show:

```text
TARGET FORMATION RESOLUTION SET

TF-01 PURPOSE_OUTPUT
  ACCEPTED

TF-02 TARGET_TYPE_FORM
  PROPOSED_BY_AI
  UNRESOLVED_DECISION

TF-03 TARGET_SCOPE
  ANSWERED_FROM_USER_INPUT

TF-04 SOURCE_SET
  DERIVED_NONDECISION

TF-05 TARGET_RELATIONS
  DERIVED_NONDECISION

TF-06 QUESTION_SET
  ACCEPTED

TF-06A LENS_SET
  ACCEPTED
  Core L1-L3 + profile Lenses; frequent gates resolved

TF-07 IDEA_SPACE
  ACTIVE

TF-08 BRANCH_POLICY
  UNRESOLVED

TF-09 HANDOFF
  DEFERRED until output clearer

TF-10 PERSISTENCE_ADDRESSABILITY
  PROPORTIONAL
```

Then only unresolved material slots are surfaced.

---

# 12. Slot Set Can Be Used Beyond Target Formation

The generic structure is reusable.

Examples:

```text
ARTIFACT_LAYOUT_RESOLUTION_SET

WORKSPACE_EVOLUTION_MAP_RESOLUTION_SET

BRANCH_EXPLORATION_RESOLUTION_SET

SCENARIO_BOUNDARY_RESOLUTION_SET

ARCHITECTURE_DECISION_RESOLUTION_SET
```

Each set defines its own slot Subjects/Prompts.

The reusable entity remains:

```text
Resolution Slot
```

---

# 13. Relation To Lenses
A Lens may generate Evidence/findings that help resolve ordinary slots, while `TF-06A LENS_SET` resolves **which Lens perspectives are active**.

```text
L1 Need / Value / Scope
→ always part of TF-06A Core Pack
→ commonly informs TF-03 Target Scope and TF-06 Question Set

L2 Authority / Source-of-Truth / Reuse
→ always part of TF-06A Core Pack
→ commonly informs TF-04 Source Set

L3 Uncertainty / Assumption / Reversibility
→ always part of TF-06A Core Pack
→ commonly informs Evidence needs / TF-08 Branch Policy / defer-vs-decide

L4 Dependency & Change Impact
→ activated through TF-06A when structured dependency/change surface is material

L5 WEUC / Target Evolution / Architecture Fitness
→ activated through TF-06A when Workspace/change-path pressure is material

L6 Verifiability / Observability / Operability
→ activated through TF-06A when proof/diagnosis/operation is material
```

```text
Lens file
≠ Resolution Slot

TF-06A LENS_SET
= composition slot selecting applicable Lens perspectives
= proportional Lens Applicability Scan over required/module-attached/registered/explicit candidates
```

The active Target Module is one selection source, not the whole Lens universe. Local Target Contracts scan the same Core/profile registries. Lens findings remain normal Evidence / Ideas / Q/R/P / Decision inputs.

# 14. Relation To Validators

Validator checks the slot/set state.

Example:

```text
Target Formation Resolution Set Validator
```

checks:

```text
all REQUIRED slots sufficiently resolved?
material `UNRESOLVED_DECISION` visible?
Source Set typed?
Target Relations separated from Sources?
Question Set selected?
Lens Set includes required Core Pack and resolves material frequent/profile gates?
Branch Policy explicit when needed?
Handoff explicit before acceptance?
Artifact Placement View explicit for material output/content?
```

The validator does not itself choose the slot values.

---

# 15. Relation To Guards

Guards constrain how slots may resolve.

Examples:

```text
User Authority Guard
  prevents AI from ACCEPTING a user-owned slot

AI Idea Is Proposal Guard
  prevents TF-07 Idea from becoming Decision silently

Branch Non-Promotion Guard
  prevents branch-local slot values from becoming canonical

No-Solution-Smuggling Guard
  constrains TF-03 / TF-07
```

---

# 16. Relation To User Input Intake

One invocation message may fill many slots.

Example:

```text
User:
  скоуп только B→C
  используй current workflow as source
  вопросы RQ1-RQ4 достаточно
  варианты A/B сравни
  ветвление делай только если локально неясно
```

Intake can resolve:

```text
TF-03 TARGET_SCOPE
TF-04 SOURCE_SET
TF-06 QUESTION_SET
TF-06A LENS_SET — when user explicitly requires/excludes a Lens perspective or supplies material applicability context
TF-07 IDEA_SPACE
TF-08 BRANCH_POLICY
```

in one turn.

Do not ask those prompts again.

---

# 17. Recommended Generic Formula

```text
Resolution Set
↓
for each Slot:
  user input?
  trusted Source?
  safe derivation?
  AI proposal?
  unresolved material choice?
↓
resolve as far as possible
↓
render only unresolved material Slots as questions/Decisions
↓
accepted Slot values form/update Target Contract
```

---

# 18. Key Invariants

```text
one Slot
= one planning subject
+ one resolution prompt
+ one current value/status

question and decision requirement are not separate duplicated structures

slot prompt is not automatically user-facing

slot resolution does not create a fourth Decision type

Resolution Set is reusable across flows

Lens Set is explicit but does not create a fourth Decision type

Target Formation uses one Resolution Set instead of duplicated check/decision mechanisms
```


# Lens Set Boundary

`TF-06A LENS_SET` is a composition/resolution slot, not a fourth Decision type.

```text
Lens Set is a composition slot
Lens finding is Evidence / Idea / Q/R/P / Decision input
Lens file is reusable methodology owner
```

Required Lenses may resolve with no material finding. Frequent/reusable/profile Lenses activate only through applicability gates or explicit selection. Registry discovery does not require loading every Lens body or Knowledge Basis.
