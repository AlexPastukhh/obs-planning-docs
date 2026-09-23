# Dynamic Target Formation — Narrative Guide

Status: active explanatory projection
Canonical Target model: [`Target Formation requirement/coverage`](../RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md#target-formation-requirement-coverage)

> Semantic Owner Dependencies
> - `REPRESENTS` [`Target Formation requirement/coverage`](../RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md#target-formation-requirement-coverage) — `TARGET-FORMATION.REQUIREMENT-COVERAGE`
> - `REPRESENTS` [`Required Reusable Target Model Check`](../RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md#target-formation-reusable-model-check) — `TARGET-FORMATION.REUSABLE-MODEL-CHECK`
> - `REPRESENTS` [`Target Module Meta-Model`](../../../target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) — `TARGET-MODULE.META-MODEL`
> - `REPRESENTS` [`Target Work Unit contract`](../UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-unit-contract) — `TWU.UNIT-CONTRACT`

## Purpose

Explain how IDTSPE chooses a useful bounded Target, reuses prepared Target Module analysis when available, and contextually completes uncovered scope/requirements without treating Target formation as a fixed `TF-*` questionnaire.

## Formation Flow

```text
current task / problem / accepted Sources
↓
derive provisional useful purpose/result
↓
derive a bounded Target scope/problem surface
↓
activate applicable universal Core Target Requirements
+ preserve explicit/already-obvious task Requirements
↓
REUSABLE_TARGET_MODEL_CHECK
├─ zero or more mutually compatible suitable Target Module Models
│  → apply each Model whose responsibility belongs inside this bounded Target
│  → one Target Module Instance portion per applied Model
│  → each Model's prepared recurring-scope analysis recognizes/formulates
│     actual Requirements grounded in this task/scope/Sources
│  → map them to prepared Module-defined Unit Definitions
└─ NO_APPLICABLE_TARGET_MODULE
   → Local Target Contract
   → contextually analyze scope/problem surface
   → derive/clarify actual grounded Requirements
↓
inspect uncovered scope/Requirements
├─ direct coverage sufficient
├─ applicable Core-defined Unit
├─ prepared Module-defined Unit
└─ otherwise contextual completion
   → refine/split scope when needed
   → clarify/derive Requirement
   → DEFINE Contextual Unit when bounded work is needed
↓
Target is sufficiently formed to execute material Unit work
```

`Target sufficiently formed` does not mean all work is resolved. Formation and resolution may reopen each other.

## Target Boundary

A Target is a bounded planning responsibility, not merely a topic or file.

```text
Target
= useful bounded scope
+ purpose / desired Target Step Result
+ sufficient work structure for the current step
```

Prefer solving the whole problem when that is actually simpler/cheaper. Otherwise choose a coherent boundary that avoids dragging the entire problem into one Target while still yielding an independently useful result.

## Prepared Target Module Coverage

A Target Module Model represents reusable work already done for a recurring Target family:

```text
recognition of a typical scope/problem pattern
+ recurring requirement-pattern knowledge
+ prepared Module-defined Unit Definitions
+ reusable questions/guidance/lenses/validators
+ result composition/handoff guidance
```

The current task remains the semantic source of its requirements. A Module recognizes and covers them; it does not create them merely by declaring a schema.

A Module may cover only part of the current Target:

```text
current scope exposes R1 R2 R3 R4 R5
TM-X covers R1 R2 R3
→ apply TM-X
→ keep its complete Module Unit inventory
→ contextually/Core-cover R4 R5
```

Do not reject a useful reusable Module solely because a concrete Target has additional material needs.

## Contextual Completion

When prepared coverage is missing:

```text
uncovered need
→ is scope wrong/too broad/too narrow?
   yes → refine/split Target
→ is the Requirement sufficiently understood?
   no → derive/clarify it from task/Sources/questions
→ can it be resolved directly?
   yes → integrate Target state/result
→ applicable prepared Core/Module Unit?
   yes → use it
→ bounded work still needed
   → DEFINE Contextual Unit
   → EXECUTE Unit Resolution
   → integrate Current Result Content
```

The Contextual Unit definition should make the local responsibility executable: inputs/Sources, useful questions/drivers, guidance, result contract, validators and result destination as material.

A Contextual Unit is local to the current Target. Repeated recurrence may later justify promotion into a reusable Module/Core Unit but does not do so automatically.

## Universal Core Requirements

The canonical Target model currently prepares these broad reusable requirements where applicable:

```text
PURPOSE_RESULT
BOUNDED_SCOPE
SOURCE_AUTHORITY
OWNER_RELATIONS
HANDOFF_CONTINUATION          conditional
PERSISTENCE_ADDRESSABILITY   conditional
```

Target Module reuse is checked by the mandatory `REUSABLE_TARGET_MODEL_CHECK`; it is not a task Requirement.

Coverage/readiness and no-lost-concern rules are cross-cutting invariants/validators rather than recursive peer Requirements.

## Unrouted Concerns

When a **Target already exists** and material meaning inside that Target has an unclear natural semantic destination, use the applicability-driven Core Target Work Unit:

```text
CORE-U-UNROUTED-CONCERNS
```

One Target may have at most one such Unit instance containing multiple concerns. Its job is to route/disposition them, not to become a permanent miscellaneous backlog.

Before any Target exists, keep such material meaning in the Work Context / natural Core State and let it inform a GIP or Target Formation candidate. Do not instantiate a Target Work Unit solely to hold pre-Target ambiguity.

## High-Level Example — Prepared Module + Contextual Completion

```text
Task:
  plan offline capture behavior

Provisional Target before full contextual decomposition:
  purpose = define useful offline-capture behavior
  scope = capture + local durability
  excludes background synchronization implementation
  explicit/obvious current need = capture must work offline
```

`REUSABLE_TARGET_MODEL_CHECK` runs on that provisional scope/problem surface and finds `TM-FEATURE`. Applying the Module reuses its prepared recurring-scope analysis instead of first deriving the whole Requirement set contextually:

```text
TM-FEATURE recognition/coverage guidance
+ current task/Sources
→ grounded R1: capture works without network
→ grounded R2: successful capture is durably stored
→ grounded R3: failure is not reported as success

prepared coverage:
  R1 → RU-FEATURE-BEHAVIOR
  R2/R3 → RU-FEATURE-RESULT + proof guidance
```

After prepared coverage is applied, remaining scope/context exposes an additional grounded need not sufficiently covered by the Module:

```text
R4: conflict behavior must be sufficiently defined
→ no suitable prepared Core/Module Unit
→ DEFINE CU-OFFLINE-CONFLICT
→ EXECUTE CU-OFFLINE-CONFLICT
→ result covers R4
```

The Requirements remain grounded in the actual task/scope/Sources. The Module contributed reusable recognition/analysis and prepared Unit coverage; contextual work only completed the remaining gap.

## High-Level Example — No Target Module

```text
Task / problem
↓
form provisional useful Target purpose/scope/problem surface
+ applicable Core Target Requirements
+ explicit/already-obvious task Requirements
↓
REUSABLE_TARGET_MODEL_CHECK
→ NO_APPLICABLE_TARGET_MODULE
↓
Local Target Contract
↓
contextually derive/clarify grounded Requirements from the scope/task/Sources
↓
use applicable Core-defined Units
+ DEFINE Contextual Units for remaining bounded work
↓
EXECUTE material Units
↓
validate Requirement coverage/readiness
↓
Target Step Result
```

The large groups of work are therefore:

```text
1. define/form Target
2. define needed Unit work where not prepared
3. execute Units and compose the result
```
