# Prototype Planning Workflow

Status: active reusable workflow
Scope: interaction/workflow prototype planning between a selected/current Application Concept + Application responsibility and canonical detailed Scenario/Screen planning.

Canonical cross-cutting context: [`requirements-and-change-context.md`](requirements-and-change-context.md)

Recommended plan/evidence shapes:

- [`templates/PROTOTYPE-PLAN-TEMPLATE.md`](templates/PROTOTYPE-PLAN-TEMPLATE.md)
- [`templates/PROTOTYPE-RESULT-TEMPLATE.md`](templates/PROTOTYPE-RESULT-TEMPLATE.md)

## 1. Purpose

Prototype planning cheaply tests and clarifies **how the selected application concept may actually work for users** before detailed Scenario/Screen meaning is treated as current authority.

```text
selected/current Application Concept
+ explicit Application responsibility
+ candidate/current Application Use Cases
↓
Prototype Planning
↓
Prototype Scenarios
Prototype Screens
candidate Requirements
candidate Scenario DATA / Behavior
Future Scenario Ideas / Change Axes
↓
review / observe / simplify / invalidate
↓
Scenario Discovery
Detailed Scenario Drafts
canonical Screen Drafts
confirmed/shared Requirements
```

Prototype planning is proportional. Skip it when current behavior/spatial requirements are already sufficiently understood and the cost of uncertainty is low.

## 2. Technical Feasibility Spike Vs Interaction Prototype

Keep two uses distinct:

```text
technical feasibility spike
→ used inside Application Concept/research when the question is whether a concept is technically feasible/costly

interaction/workflow prototype
→ UC-PLAN-PROTOTYPE
→ used to understand provisional user behavior, Scenario boundaries, Screens and requirements
```

The reusable Prototype Plan/Result shapes may support both experiment types, but only interaction/workflow prototype work establishes the provisional `Prototype Scenario` / `Prototype Screen` surfaces described here.

## 3. Spine Pass / Spine Walkthrough

A `Spine Pass` or `Spine Walkthrough` is a **discovery technique**, not a Scenario type or planning owner.

```text
concrete actor situation
→ meaningful user-world Need
→ plausible navigation / surfaces
→ information seen/entered
→ actions/commands
→ application responses
→ intermediate/final meaningful results
```

Use it to expose candidate Scenario boundaries, missing capabilities, candidate Screens, Requirements, DATA, Behavior and uncertainty.

```text
Spine Pass
≠ Scenario
≠ Prototype Scenario
≠ canonical behavior owner
≠ mandatory stage/artifact
```

Do not create `UC-PLAN-SPINE` merely for this technique. It is available inside Prototype/Scenario Discovery when useful.

## 4. Prototype Scenario

A `Prototype Scenario` is provisional behavioral design used to learn which canonical Scenarios are actually needed and how they may approximately work.

Recommended shape:

```text
Prototype Scenario ID: PSCN-X
provisional Need / motivation
starting situation
approximate user/actor-visible interaction
approximate meaningful result
candidate Screens
candidate Requirements
candidate DATA
candidate Behavior Items
questions / evidence need
future/evolution observations when material
```

Prototype Scenario identity is intentionally revisable:

```text
one PSCN may split into several SCN owners
several PSCNs may merge
PSCN may be rejected
PSCN ID does not require 1:1 promotion to SCN ID
```

A command/action/technical operation still does not become a Prototype Scenario merely because it is easy to name. Use the same Need/result discipline as Scenario discovery, but tolerate provisional boundaries while evidence is being gathered.

## 5. Prototype Screen

A `Prototype Screen` is provisional spatial design used to test which surfaces/arrangements are useful before canonical Screen authority is established.

Recommended shape:

```text
Prototype Screen ID: PSCR-X
purpose / supported Prototype Scenarios
approximate zones
information hierarchy
approximate control placement
important immediate-vs-secondary visibility
material visual/layout states
candidate spatial Requirements
wireframe/mockup when useful
questions / evidence need
```

```text
Prototype Screen
≠ canonical Screen
```

Promotion may merge/split/rework spatial meaning; PSCR identity does not require 1:1 SCR identity.

## 6. Visual Ownership During Prototype Work

Keep visual responsibilities distinct:

```text
Prototype Scenario visual
→ provisional journey / flow / transition representation

Prototype Screen visual
→ provisional spatial composition / wireframe / layout / visual state

canonical Scenario/visual
→ current Scenario journey/flow/transition explanation

canonical Screen/visual
→ current spatial requirement/design representation

frontend Slice plan
→ implementation of selected Scenario/Screen requirements
```

For example:

```text
where the primary action belongs spatially
→ Prototype/Canonical Screen

when the action becomes available and what it means
→ Prototype/Canonical Scenario / Behavior

React component/layout mechanism used to implement it
→ Implementation Slice frontend plan
```

## 7. Candidate DATA And Behavior

Prototype work may identify candidate Scenario DATA and Behavior Items because concrete interaction exposes information and rules earlier than abstract planning does.

```text
prototype candidate DATA / Behavior
→ evidence/review
→ selected meaning promoted into Scenario/shared Scenario owners
```

Do not treat provisional fields, DTOs, component state or backend operations as Scenario DATA merely because they appear in a prototype.

## 8. Requirements And Change Context

Prototype findings may become:

```text
candidate Requirement
confirmed Requirement
Future Scenario Idea
Change Axis
implementation-scoped Idea
ordinary question/risk/problem
```

Apply [`requirements-and-change-context.md`](requirements-and-change-context.md). A Change Axis is evidence for design stress-testing, not authorization to generalize.

## 9. Promotion / Handoff

After prototype review:

```text
Prototype Scenario findings
→ refine/split/merge candidate Application Use Cases
→ Scenario Discovery
→ detailed Scenario Drafts

Prototype Screen findings
→ canonical Screen owners when separate spatial ownership is useful

candidate Requirements
→ confirm/reject/promote to narrowest real owner

candidate DATA / Behavior
→ promote to Scenario/shared Scenario owners

Future Scenario Ideas / Change Axes
→ preserve as non-current evolution context when justified

implementation-scoped Ideas
→ remain Ideas until Domain/Slice planning selects or rejects them
```

Prototype output is evidence/input. It must not remain a hidden second behavioral or spatial authority after canonical owners exist.

## 10. Integration Loop

A prototype may invalidate Application Concept assumptions or expose whole-solution problems. Return material findings upstream explicitly rather than forcing downstream consistency.

```text
prototype evidence
→ affected Concept / Application responsibility / Use Case / Requirement / Scenario/Screen candidate
→ explicit review
→ selected current meaning
```

## 11. Repository Boundary

Prototype planning does not authorize implementation, repository mutation, archive creation, commit or push. Use the relevant command route for file/package changes.
