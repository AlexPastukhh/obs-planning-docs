# Replacement Package App — Documentation Use Cases

Status: active documentation-maintenance owner
Scope: how Replacement Package App documentation plans application Benefits, Features/Slices, real user Scenarios and Screens, discovers implementation owners and Requirements, stays evolution-aware, and keeps source-level implementation Evidence derived rather than manually duplicated.

## Purpose

The local methodology must make the following meanings understandable without turning one layer into a duplicate of another:

1. what useful application Benefits / desired results justify application behavior;
2. which coherent **Features** the application provides to contribute to those Benefits;
3. what observable application behavior, Behavior Requirements and semantic Data define each Feature;
4. what material implementation feasibility, dependencies, options, constraints and Slice-boundary observations are already known while a Feature is being planned;
5. why one planned Feature plausibly corresponds to one coherent end-to-end Slice boundary, and when that hypothesis must be rechecked;
6. how real user/application **Scenarios** compose Features across Screens and external contexts and expose cross-Feature / cross-Screen Scenario Requirements;
7. how Scenario and Screen consistency may reveal missing, merged, split or incorrectly bounded Features without forcing Scenario-first planning;
8. which Domain/Aggregate owners own semantic identity, state, lifecycle, invariants and consistency;
9. which reusable non-end-to-end responsibility deserves a Shared Implementation Capability instead of being duplicated across Slices;
10. what selected Slice/Aggregate/Shared owner must satisfy in production realization and proof;
11. how proof is planned and normally realized test-first once selected meaning and a credible executable proof boundary are known;
12. how known Evolution Steps influence every material Discovery without forcing speculative generic extensibility;
13. how an Evolution Step is refined from a shallow capability/journey idea into one complete, internally consistent target application state;
14. how Practical Acceptance plans are distinguished from executed Evidence;
15. how to inspect current source/test mechanics without manually maintaining class/method traces in normative documentation;
16. why every durable documentation owner exists and which process creates, maintains or consumes it.

The target authority / realization model is:

```text
APP-LEVEL CONTEXT
→ Application Benefits / desired results
→ high-level application responsibilities/tasks

             ┌──────────────────────────────────────────┐
             ↓                                          │
FEATURE PLANNING                                        │
├─ Intent / principal Result                            │
├─ Expected application behavior                        │
│  ├─ compact semantic Data beside behavior             │
│  ├─ numbered Main-path behavior rows                  │
│  ├─ stable BR-* + compact normative statement         │
│  │  beside the owning row                             │
│  └─ one exact decision/question                       │
│     → one column per material path                    │
│     → explicit convergence / terminal result          │
├─ Feature Implementation Concerns                      │
├─ relevant known Evolution Steps                       │
└─ Feature/Slice Boundary Check                         │
             ↓                                          │
      Feature boundary                                  │
             ↕                                          │
      Slice boundary hypothesis                         │
             │                                          │
             ├───────────────↔──────────────────────────┤
             │                                          │
             ↓                                          │
SCENARIO / USER-JOURNEY PLANNING ↔ SELECTED SCREEN      │
├─ actor / interaction decisions when material          │
├─ real paths through Features / Screens / contexts     │
├─ Feature Results / continuity                         │
├─ journey decisions: one column per path               │
├─ Scenario Requirements beside owning journey behavior │
└─ Benefit closure                                      │
             │                                          │
             └── consistency findings may revise ───────┘

↓
OPTIONAL WORKING IMPLEMENTATION PLANNING
├─ Slice Discovery + non-persistent Slice Planning
│  ├─ whole-Feature UI / entry / application-service / Domain /
│  │  Shared / persistence / cross-cutting realization map
│  ├─ Feature Step + BR-* → candidate realization calls
│  └─ whole-Feature integration-test sketches
└─ non-persistent Aggregate Planning when Domain design is needed
   ├─ Domain classes + high-level state
   ├─ candidate semantic method
   │  → literal Domain unit tests immediately below
   └─ future/evolution impact without inventing OPEN details

↓
IMPLEMENTATION + PROOF
↓
working Slice/Aggregate plans are deleted by default when no longer useful

↓ when durable owner-local constraints are independently useful
OWNER-LOCAL REQUIREMENTS DISCOVERY
├─ Correct Realization        ↔ Correct Proof
├─ Local Reasoning            ↔ Proof Local Reasoning
└─ Evolution Fitness          ↔ Proof Evolution Fitness
↓
durable Production + Proof Requirements
↓
source/tests + executed automated/practical Evidence
↓
narrow revalidation when Evidence challenges accepted meaning
```


This is an authority and directed-discovery map, not a mandatory waterfall. Work may begin from a Feature, from a Scenario/journey, or from Screen/interaction pressure when that is the natural source of understanding. The resulting Feature, Scenario and Screen meanings must eventually become mutually consistent.

## Migration boundary for existing Replacement Package App documentation

This methodology change does **not** silently rewrite or reinterpret existing product owners.

Current Scenario, Feature Interaction, Behavior Item, Screen, Domain, Slice, testing and contract documents remain their current product truth until a separate migration/reconciliation changes them. In particular:

- existing `FI-*`, `BI-*`, `DI-*`, `SI-*` and `TST-*` labels may remain in current product documents until those owners are deliberately migrated;
- their presence after this methodology update does not re-establish `Feature Interaction`, `Behavior Item`, `Implementation Item` or `Test Item` as target methodology semantic types;
- no Scenario, Screen, Domain, Slice, Shared, Test Strategy, contract or source file is changed merely because the target methodology now prefers Feature / Requirement semantics;
- migration must preserve accepted current/planned behavior first, then normalize representation and boundaries only where the new methodology requires a semantic change.

This local methodology is specific to the Replacement Package App documentation route. It does not modify or supersede the separate repository-wide/main SDS/IDTSPE methodology.

---

## Shared terms

### Current truth

Behavior or architecture already accepted as implemented. Current product owners remain authoritative for their own current meaning until separately migrated.

### Planned target

Selected future meaning that is not current implementation truth yet. It must remain visibly planned until realization + proof are reconciled and promoted.

### Application Benefit / desired result

The useful application/user result that justifies application behavior. It answers:

> Why should the application provide this behavior at all?

Application-level context should already establish the important Benefits and high-level tasks/responsibilities. Feature Planning should not need a second mandatory phase merely to rediscover what the application exists to do.

A Benefit may be served by one Feature or by a real Scenario composed of several Features.

### Feature

A **Feature** is a coherent unit of observable application behavior under one application/user intent, contributing to an Application Benefit and producing one principal meaningful Result or Result family.

Feature is the behavioral side of a use-case boundary. It should be described in application-language such as:

```text
application receives X
→ validates Y
→ creates/changes Z
→ requests external capability A
→ branches/retries/reconciles when needed
→ exposes truthful Result C
```

Feature Planning is allowed and expected to think about implementation feasibility and shape, but it is not exact code design. Feature behavior may be an ordered application process and may name semantically relevant ecosystem concepts such as a Git branch, Issue, package, commit, PR, persisted work identity, filesystem artifact or external result when those concepts are part of the behavior the application must establish. Keep exact classes, methods, private call paths and incidental code structure downstream.

A validation error, retry path, failure path, alternate transport or completion variant is not automatically a separate Feature. The boundary is decided by the Feature/Slice Boundary Check below.

### Slice

A **Slice** is the end-to-end implementation side of one Feature boundary: the coherent implementation path from semantic application entry through application/domain/infrastructure responsibilities to the Feature's meaningful Result.

Target default:

```text
Feature = behavioral side
Slice   = end-to-end implementation side
```

Therefore Feature Planning establishes a **Slice boundary hypothesis** at the same time it selects the Feature boundary.

There is no mandatory additional methodology phase called Slice Discovery. When exact implementation planning is useful, **Slice Discovery + non-persistent Slice Planning** is one optional working activity under DOC-UC-03.

The same boundary check is repeated later during Slice/implementation planning when stronger implementation Evidence exists.

The public application entry for a Feature Slice is normally a **simple application service** with semantic methods and typed semantic arguments/results:

```text
service.semanticOperation(...)
```

Do not require a `CommandBus`, dispatcher, mediator, generic command handler, `execute(command)`, `dispatch(command)` or `*Command` DTO merely to invoke a Feature. Introduce a request/value object only when its fields form one meaningful semantic value.

### Slice independence

Slice independence means primarily **locality of responsibility and locality of change**, not absence of dependencies.

A Slice may legitimately depend on:

```text
Aggregate semantic state
Shared Implementation Capability
external service/API
platform/runtime capability
filesystem/Git behavior
another persisted semantic owner
```

A good Slice boundary makes a material use-case change stay, where reasonably possible, mainly inside its own Slice plus semantic/shared owners whose meaning genuinely changed.

Suspicious coupling is not “Slice A uses owner B”. Suspicious coupling is:

```text
change one use case
→ unrelated Slices must also change
only because responsibility is smeared across the system
```

### Slice extension forms

Evolution of an existing Feature/Slice is normal. It may be:

- ordinary Slice change;
- an extending **Slice Module** — a cohesive internal responsibility inside the same Slice;
- a **Slice Branch** — a path variant inside the same intent/result Feature;
- an **Entry Adapter / Entry Variant** — a new transport/input mechanism reaching the same semantic application entry;
- extraction of a **Shared Implementation Capability** when a responsibility becomes genuinely reused by several Slices.

Only a genuinely distinct Feature boundary implies a new Slice.

### Behavior Requirement

A **Behavior Requirement** is an implementation-independent must-hold statement about Feature behavior.

Every durable normative Feature Behavior Requirement has a stable `BR-*` identity. The Feature owner is the sole canonical owner of its normative text. Downstream Slice/Aggregate/Proof planning references the `BR-*` identity; it does not copy the Requirement statement.

Prefer the shortest unambiguous logical form, for example:

```text
A ∧ B ⇒ C
state = X → operation → state = Y
fix A → prove B → mutate C → prove D → Success
retry(uncertain) ⇒ same identity
A < C
B < C
order(A,B) = OPEN
```

If correctness depends on order, the order is itself normative. Do not silently make incidental implementation order required.

It is not required to be atomic, unordered or independent. A Requirement may naturally be a:

```text
rule
invariant
ordered algorithm
state machine / transition set
decision table
protocol
failure/recovery procedure
input/output contract
negative guarantee
user-visible performance constraint
```

Related Requirements may remain grouped/ordered when that preserves meaning. Their coupling is useful boundary evidence rather than something to destroy for formatting convenience.

### Feature Data

Semantic information/state needed, observed, produced or changed by Feature behavior.

Feature Data is not automatically a DTO, class, database row, Aggregate, API payload or implementation field.

In the preferred compact Feature representation, Data stays **inside `Expected application behavior` beside the behavior it informs**, usually as one small Data table before the Main path. Do not create a detached Data catalog merely because a template once had a `Feature Data` heading.

Behavior and Data discovery remain bidirectional: behavior reveals Data needs, and Data meaning reveals missing behavior.

### Feature Implementation Concern

A **Feature Implementation Concern** is free-form implementation-aware discovery recorded while planning a Feature. It exists to validate feasibility and Slice shape without turning behavioral planning into exact code design.

It may record:

```text
feasibility question / implementation capability
candidate realization approaches
rejected infeasible approaches
implementation dependencies
platform / runtime / external constraints
partial-state / recovery concern
state / consistency concern
candidate Aggregate signal
candidate Shared Capability signal
proof/testability concern
prototype / Practical Evidence
open technical uncertainty
known Evolution pressure / Evolution Kind pressure
Feature/Slice boundary observation
likely module / branch / entry-adapter shape
possible Forced Migration pressure
selected exception from a preferred methodology principle
```

A concern may reason substantially deeper than the Feature's behavioral narrative when that depth is needed to establish feasibility or a healthy Feature/Slice boundary. It should still prefer application/architecture consequences over premature exact class/method design.

A concern is a **downstream Source**, not automatically a Requirement. A candidate mechanism becomes a durable Requirement only when downstream discovery selects it because correctness, maintainability, proof or known evolution actually requires it.

When a Feature or Behavior Requirement is materially feasibility-uncertain, do enough capability/prototype work to determine whether the planned behavior is credible before treating it as settled downstream truth.

If a cross-Feature Scenario Requirement has unresolved implementation feasibility, record the concern against the affected Feature(s) when ownership is known; while boundaries are still unresolved, keep a temporary Scenario design concern and resolve/route it before detailed owner planning.

### Implementation Dependency

A material dependency needed by realization, for example external API/service, platform capability, shared owner, Aggregate state, protocol, runtime or compatibility contract.

Do not confuse:

```text
Scenario ordering / behavioral precondition
Aggregate/state precondition
implementation dependency
Shared Capability dependency
module dependency
```

with one Slice semantically owning another Slice.

### Scenario

A **Scenario** is a real user/application journey through one or more Features, Screens and external contexts, driven by a Need/Application Benefit. Its primary role is **Feature composition and consistency**: show that independently owned Features connect into a coherent journey and actually close the intended Benefit.

Scenario owns journey truth such as:

```text
starting context
Features involved
journey-level expected / visible behavior where useful
meaningful Feature Result / resulting state
continuity into the next Feature
Screens / external contexts
ordering / transitions
cross-Feature state/Data/identity continuity
branches / loops / retry / re-entry at journey level
terminal user/application Result / Benefit closure
```

`Resulting state / Result` is broader than an outbound payload. It may say that meaningful application state now exists, for example `package applied`, `published revision exists`, `repository work is resumable` or `work finalized`. `Continuity to next Feature` separately records the subset of Data/identity/context that later Features depend on.

Scenario may summarize the expected/visible behavior needed to understand one journey step, but it does not become a second authority for Feature internals. Full Feature-local validation, detailed branches/recovery, Behavior Requirements, Feature Data and Feature Implementation Concerns stay with the Feature owner unless they materially affect cross-Feature consistency. Repeating a Feature Result is intentional when that Result is the semantic interface with the surrounding journey.

Actor/interaction-level journey truth belongs in Scenario when it is material to how Features are used. An actor may be a human user, ChatGPT/AI acting as the application user, an external system, or the application for a meaningful automatic transition.

Scenario may own:

```text
actor
→ command / instruction / selection
→ Feature invocation
→ visible Result
→ actor decision / interpretation
→ next Feature / external context
```

Actor identity is worth stating only when it changes input, decision, authority, continuity or interpretation.

Canonical boundary:

```text
Scenario / actor
= why and what the user/AI decides to pass/use/interpret

Feature
= what the application does with already-supplied input at its semantic application boundary
```

If the application merely consumes free-form wording or a choice, that wording/choice stays Scenario-owned rather than becoming invented structured Feature Data.

A Scenario is not a mandatory chronological parent of every Feature. Valid planning patterns include:

```text
Feature-first
Scenario-first
Feature ↔ Scenario ↔ Screen iterative refinement
```

Feature owners remain the primary behavioral authorities. Scenario is the composition/consistency contract for the end-to-end journey and the natural semantic source for E2E proof. An E2E test suite is an executable proof projection of that selected journey, not the authority that creates it.

### Scenario Requirement

A **Scenario Requirement** is a must-hold cross-Feature / cross-Screen / cross-context journey constraint.

It exists when correct composition cannot be expressed as one Feature-local Behavior Requirement, for example exact context continuity from Feature A into Feature B or preservation of an already-established Result when a later Feature fails.

Scenario Requirements do not mechanically become Slices.

### UI / Screen Requirement

Intentional UI behavior remains worth preserving when it has durable meaning. Feature-local interaction/control requirements may stay with Feature behavior; spatial/window responsibility belongs to the Screen owner. Do not make accidental pixel/layout details normative.

```text
Feature
→ observable interaction behavior / local UI constraints

Screen
→ durable spatial/window meaning and Screen-owned constraints
```

### Design alternative vs runtime branch

A **runtime branch** is behavior actually available in the selected Feature/Scenario. A **design alternative** is a candidate/rejected/possible design considered while planning. Do not document a rejected alternative as current runtime behavior and do not create an Evolution Step merely because an alternative was considered.

Optional design analysis may record strengths, problems, complexity, risks and open questions when that helps selection; it is not a mandatory scoring taxonomy.

### Screen

A selected Screen/Window owns durable spatial/window/UI meaning. Feature owns behavior; Scenario owns real journey/composition; Screen owns where/how durable interaction context is spatially presented; Slice owns end-to-end implementation of the Feature.

Do not create frontend/backend Slices merely because a Feature crosses UI and backend code.

### Aggregate / Domain owner

An Aggregate owns coherent semantic identity, state, lifecycle, invariants and consistency.

**Aggregate Planning** is the optional non-persistent working activity used to design that Domain realization before implementation. It is not the durable Domain owner itself.

Aggregate Planning asks what must remain semantically correct together, which Domain class owns it, what high-level state/method boundary is needed, and what literal Domain unit tests prove that method's rules. It is not a global upfront class model.

Feature Main-path Steps + attached `BR-*`, Feature implementation concerns, Scenario Requirements and known Evolution Steps are Sources for Aggregate Planning because they reveal identity/lifecycle/consistency boundaries.

Default lifecycle:

```text
plan Domain realization
→ implement + prove
→ delete Aggregate Planning artifact when no longer useful
```

If durable Domain/architecture/proof documentation remains useful later, create or update that separate owner for its own purpose; do not promote the planning file by default.

### Shared Implementation Capability

A reusable **non-end-to-end** implementation responsibility used by several Slices. Repeated code alone is not enough; the responsibility must have coherent meaning and real reuse.

### Production Requirement

A durable Requirement on a selected Slice/Aggregate/Shared implementation owner.

### Proof Requirement

A durable Requirement on convincing proof of selected behavior/production meaning. One Proof Requirement may map to one test, many tests, parameterized cases, integration proof or Practical Evidence. One test may prove several related Requirements. No 1:1 mapping is required.

### Requirement, not semantic Item

`Requirement` is the target semantic type. `Item` may remain a presentation/list word or a legacy identifier prefix, but the methodology does not require `Behavior Item`, `Implementation Item` or `Test Item` as separate ontology.

### Test Strategy / Shared Test Capability / Test Design

Local proof normally stays with the selected Slice/Aggregate/Shared owner. Use shared Test Strategy for genuinely cross-owner proof coordination, Shared Test Capability for reusable test machinery, and separate Test Design only when proof design is independently non-trivial.

### Evidence

Executed automated or practical proof. Evidence proves only the exact build/state/environment it exercised and may challenge existing assumptions, triggering narrow revalidation.

### Evolution Step

An **Evolution Step** is one coherent qualitative change from one valid, internally consistent, usable application state to another valid, internally consistent, usable application state.

It is not defined as one commit, package, task, Feature or Slice. It may include one Feature extension, one new Feature, several Features, Aggregate/shared changes and Scenario/Screen composition changes.

A completed Evolution Step must not require the next Evolution Step merely to finish the behavior it claims to introduce or to restore application consistency.

Evolution Steps may begin shallow: a short capability description, a rough Scenario change or a partially identified affected Feature set is enough to influence current Discovery. Detail is refined progressively as planning deepens.

### Evolution Kinds

Use one common vocabulary for the nature of evolution:

```text
Introduction
Expansion
Refactoring
Forced Migration
Retirement
```

- **Introduction** — new Feature/capability/owner meaning appears in the target state. A newly introduced Feature is represented directly in the Step target; do not invent an Evolution Impact on a non-existent owner.
- **Expansion** — existing capability/owner responsibility grows while its primary semantic boundary and authority remain healthy.
- **Refactoring** — selected semantic capability remains substantially stable while representation/realization structure changes for cohesion, local reasoning, proofability, maintainability or evolution fitness.
- **Forced Migration** — current semantic/implementation/documentation authority or structure cannot reasonably support the selected target through healthy additive evolution and must be moved, replaced or substantially reorganized.
- **Retirement** — existing capability/behavior/authority is intentionally removed from the target state, immediately or through explicit compatibility staging.

The kinds are not mutually exclusive. One Evolution Step may introduce one Feature, expand another, refactor an implementation owner, force migration of obsolete authority and retire legacy behavior as parts of one coherent application transition.

`[EXISTING] / [NEW] / [CHANGED] / [REMOVED]` is complementary target-state accounting, not a competing taxonomy: Evolution Kind explains **the nature of the transition**; target-state notation explains **what remains/appears/changes/disappears**.

### Migration is Evolution

Any semantic/product/architecture/documentation migration is a form of Evolution, not a parallel planning mechanism. The canonical Evolution Step owns the qualitative transition and migration work intrinsic to reaching its target state. Affected existing owners describe their local delta through Evolution Impact. Do not create a competing migration roadmap for the same semantic transition.

### Planned future Scenario

A future independently meaningful journey may be documented as a full planned Scenario before it is current. Keep the status explicit. An Evolution Step may link that target Scenario when the qualitative change is too broad to communicate as a small local journey delta.

### Evolution Steps Map

[`evolution-steps-map.md`](evolution-steps-map.md) remains the planning owner for rough horizon / likelihood / dependency / order / readiness between known Evolution Steps. The canonical Step owns **what qualitative application change occurs**; the map owns rough planning relationships between Steps.

The map does not redefine Feature/Scenario meaning and is not changed automatically by every methodology edit.

### Evolution Impact

The effect of a canonical Evolution Step on one **existing** owner. Evolution Impact is future owner delta, not a second Requirement list and not a second migration roadmap.

Evolution Impact uses the same Evolution Kinds as the Step when describing how that owner evolves: `Expansion`, `Refactoring`, `Forced Migration` and `Retirement` where applicable. `Introduction` normally belongs directly in the Step target for a new Feature/owner because there is no pre-existing owner to receive an impact.

When enough detail is known, an Evolution Step extending an existing Feature should show the **full target Feature** with clear `[EXISTING]`, `[NEW]`, `[CHANGED]`, `[REMOVED]` meaning (or equivalent notation). If cross-Feature journey composition materially changes, include the target Scenario too.

### Selected exception

Methodology heuristics are preferred principles, not laws. A selected design may intentionally contradict one.

When it does, record:

```text
preferred principle
the selected exception
why it is accepted
which semantic boundaries remain unchanged
downstream consequences / proof obligations
```

Do not rename the design merely to hide the contradiction.

Example class: one convenience activation may compose two independently valid Features/Slices. The composite entry is then Scenario/application composition; it does not automatically merge the two Feature/Slice boundaries.

---

## Feature / Slice Boundary Check

Use the same check twice:

```text
Feature Planning
→ establish the initial Feature/Slice boundary hypothesis

later Slice/implementation planning
→ repeat with stronger implementation Evidence
→ confirm / extend / merge / split / reframe when needed
```

The questions are signals, not a mechanical scoring algorithm. Each can also be inverted to test whether something that looks separate is actually a branch/module of an existing Feature.

### Group 1 — Intent / Principal Result

Ask:

```text
What application/user intent does this behavior serve?
Is that intent distinct from an existing Feature?
What is the principal meaningful Result / Result family?
Is it fundamentally distinct, or the same Result reached another way?
```

Signals:

```text
same intent + same principal Result family
→ strong signal for one Feature/Slice

distinct intent and/or fundamentally distinct Result
→ strong signal for separate Features/Slices
```

Intent is one of the strongest signals.

### Group 2 — Semantic Entry

Ask:

> Is this a genuinely distinct semantic application invocation, or only another transport/input/entry adapter to an existing semantic operation?

Button, URI, CLI option, REST endpoint, manual handoff and similar transports do not automatically create Features.

A genuinely distinct semantic entry adds evidence for a separate Feature/Slice, but it is still one signal rather than an automatic rule.

### Group 3 — Realization Cohesion / Shared Structure

Ask:

```text
How much of the end-to-end realization is genuinely shared?
Can the difference be localized as a Module / Branch / Entry Adapter?
Would splitting duplicate substantial behavior/orchestration/lifecycle/result handling?
Would merging spread variant-specific branching through most of the path?
Are shared parts real use-case realization, or only generic utilities/infrastructure?
```

Large meaningful shared realization + localized variation favors one modular Slice. Little meaningful shared realization favors separation.

### Group 4 — Development / Proof / Evolution Fitness

This is the practical reality check. Ask:

```text
Which boundary is actually easier to develop and understand locally?
When this use case changes, can most change remain inside its Slice?
Would unrelated Slices need edits because responsibility is smeared?
If other owners change too, did their actual semantic/shared meaning change?
Which boundary gives clearer/localer proof?
Would splitting duplicate E2E/local proof?
Would merging make proof excessively conditional or opaque?
What do known Evolution Steps suggest?
Which boundary lets known evolution happen as local extension/module/branch
instead of avoidable forced migration?
Do known changes repeatedly touch the same cohesive realization area?
```

Development/proof convenience, change locality and known Evolution Steps are major evidence, especially when earlier signals are ambiguous.

---

## General Discovery rules

### Relevant Evolution Steps are Sources everywhere

Every material Discovery checks relevant known Evolution Steps that can change the requirement, boundary, owner, implementation capability, proof choice or representation being decided.

This applies proportionally to Feature Planning, Behavior/Data discovery, Feature Implementation Concerns, Scenario/Screen planning, Aggregate/Shared discovery, Slice/Aggregate/Shared Requirements Discovery and Proof Requirements Discovery.

Load only relevant Steps; do not scan the entire roadmap without reason.

### Current meaning + evolution + evidence

A useful recursive pattern is:

```text
current selected meaning
+ relevant known Evolution Steps
+ upstream implementation concerns / dependencies / Evidence
→ Discovery
→ selected current answer
+ downstream implications
+ possibly refined Evolution meaning
```

### Narrow revalidation

Later Evidence may challenge Feature, Scenario, Screen, Slice, Aggregate, Shared or Requirement boundaries. Revalidate the narrow affected meaning instead of rebuilding all planning by default.

---

## DOC-UC-01 — Maintain Scenario / real user journey composition and consistency

### Goal

Keep one selected Scenario understandable as a real user/application journey through independently owned Features, actors, Screens and external contexts; verify their composition closes an Application Benefit; own genuine cross-Feature / cross-Screen Scenario Requirements without duplicating Feature internals.

### Process

1. Start from a selected/current or planned real journey that contributes to an Application Benefit.
2. Record the Feature sequence/composition and only the journey-level meaning needed to connect it: actor/interaction decision when material, input/starting context, visible Feature behavior/Result, continuity handed to later Features, Screen/external context and terminal Benefit closure.
3. Keep actor-owned wording, selection and interpretation in Scenario when the application merely consumes it. AI/ChatGPT may be the actor/user.
4. Keep detailed Feature-local behavior with the Feature owner. Scenario may repeat/summarize a Feature Result or visible effect when needed for composition, but must not restate the Feature's validation/recovery algorithm or canonical `BR-*` text.
5. For a material journey decision, state one exact question and represent one table column per path. Continue each path vertically until explicit convergence, re-entry, Success or Stop.
6. Discover Scenario Requirements only for behavior genuinely cross-Feature/cross-Screen/cross-context. Put `SR-*` beside the journey behavior it constrains where practical rather than in a detached catalog.
7. Check that Feature preconditions can arise, Feature Results are truthful, continuity identity/Data/context is preserved, and later Features consume the intended prior Result.
8. Check that the journey reaches the terminal Result / closes the intended Application Benefit.
9. Check selected Screens/external contexts support the journey while Screen remains spatial/window authority.
10. If the journey exposes a missing/merged/split Feature or poor Slice boundary, return to DOC-UC-13 and re-run the Feature/Slice Boundary Check.
11. Define E2E proof intent from the Scenario; tests remain proof rather than Scenario authority.

### Principles

- Feature is the primary behavioral authority; Scenario is the journey composition/consistency owner.
- Scenario is not a mandatory parent/container of Features.
- Scenario-first, Feature-first and iterative Feature ↔ Scenario ↔ Screen planning are all valid.
- Actor ceremony is optional; record actor identity only when semantically useful.
- Branch columns represent real journey paths, not a second semantic Item type.
- `1 Scenario = 1 Screen` is not required.
- Scenario form is proportional: choose the smallest useful representation.

---

## DOC-UC-02 — Perform non-persistent Aggregate Planning

### Goal

Design only the Domain classes/state/method boundaries needed to realize selected semantic Feature behavior, with literal method-local Domain unit-test sketches, without turning the planning artifact into a permanent Domain owner.

### Process

1. Start from exact Feature `Intent`, `Principal Result`, numbered Main-path Steps and the `BR-*` identities attached to those Steps. Inspect relevant Scenario Requirements and known Evolution Steps.
2. Ask for each relevant Step:
   - what semantic facts must be remembered, compared or changed;
   - what must remain mutually consistent;
   - what lifecycle/partial-state/retry rules are semantic rather than orchestration;
   - whether the realization is an Aggregate Root, child Entity, aggregate-local Value Object, shared Value Object, or does not belong in Domain at all.
3. Classify Domain types by semantic identity, never by field count:
   - **Aggregate Root** — an Entity that defines one consistency/lifecycle boundary and is the external reference point for that Aggregate;
   - **child Entity** — has stable identity whose continuity matters while its state changes inside the Aggregate;
   - **Value Object** — has no independent identity; equality is determined by its complete semantic value. A Value Object may have one field or many fields, may compose other Value Objects/collections, and may contain validation/behavior;
   - an ID-valued field inside a type does not make that containing type an Entity unless that ID is the containing type's own continuity identity;
   - a collection/map uniqueness key does not by itself make an element an Entity;
   - prefer aggregate-local Value Objects when one Aggregate owns the meaning; use `shared/valueobjects/` only for intentionally cross-owner/domain-boundary semantic values.
4. Keep application orchestration, Git/GitHub/filesystem/browser mechanics, UI and generic cross-cutting concerns out of Aggregate Planning; mark them Slice/Shared when relevant.
5. For each selected Domain class, record only the useful high-level fields/state and typed candidate semantic methods.
6. Put literal Domain unit tests **immediately after the candidate method they prove**. Tests call Domain objects directly, use concrete values and assertions, and name expected behavior/result rather than the tested class/method.
7. When Aggregate Planning becomes literal implementation/code, preserve the Aggregate boundary in the physical source layout:

```text
domain/
├── errors/
│   └── <DomainError>.java
├── shared/
│   ├── valueobjects/
│   │   ├── <cross-owner Value Object>.java
│   │   ├── <multi-field shared Value Object>.java
│   │   └── <SharedValueObject>Test.java
│   └── support/
│       └── <non-domain helper when unavoidable>.java
├── <aggregate-name>/
│   ├── <AggregateRoot>.java
│   ├── <ChildEntity>.java
│   ├── <aggregate-local Value Object / enum / evidence>.java
│   └── <AggregateRoot>Test.java
└── <another-aggregate>/
    └── ...
```

   - one Aggregate folder owns its Aggregate Root, child Entities, aggregate-local Value Objects/enums/evidence and executable Domain test file(s);
   - do **not** split Roots and Entities into global `aggregates/` and `entities/` type folders;
   - keep a Value Object inside its Aggregate folder when that Aggregate owns the meaning; move it to `shared/valueobjects/` only when the value is intentionally cross-owner/domain-boundary;
   - a shared Value Object may be multi-field and may have its own adjacent semantic test;
   - keep Domain exceptions/errors in `errors/`, outside any one Aggregate folder;
   - keep each semantic Domain test beside the Aggregate/Entity/Value Object semantics it proves; a shared `testing/` folder may contain only runner/assertion/fixture support, never owner-specific test meaning;
   - when a build system requires separate production/test source roots, mirror the same Aggregate-relative folder and package structure under both roots so the test remains semantically adjacent to its owner;
   - literal code examples/handoff artifacts must use this same owner-centered layout rather than flattening all Domain types into one folder.
8. Express invariant preservation through those literal assertions. Do not create a detached `Preserved invariants` prose catalog.
9. Plan known future Features/extensions at the same Domain-design depth when their semantic behavior is selected, with an explicit `FUTURE` marker and canonical `EVO-*` identity where one exists.
10. If future behavior depends on an OPEN product detail, keep only the already-selected semantic boundary and mark the concrete API/test `BLOCKED BY OPEN PRODUCT DETAIL`; do not invent the missing semantics.
11. If Aggregate evidence challenges the Feature/Slice boundary, return to DOC-UC-13 rather than compensating silently.
12. After the planned Domain behavior is implemented and proven, delete the Aggregate Planning artifact by default. Create/update a separate durable Domain/architecture/Production↔Proof owner only when it has its own continuing purpose.
13. Use DOC-UC-14 later when durable owner-local Production/Proof Requirements are independently useful. Planning unit tests do not replace that pass.

### Principles

- Feature `BR-*` remains semantic authority; Aggregate Planning references IDs instead of copying canonical Requirement text.
- A Feature may use several Aggregates; one Feature = one Aggregate is not required.
- One candidate Domain method may realize several Feature Steps; one Step may involve several Domain/non-Domain collaborators.
- Domain owner answers the semantic rule; it does not own the whole technical execution method.
- Aggregate Planning is non-persistent by default.
- Literal Domain source is organized by semantic owner/consistency boundary, not globally by technical type kind; Aggregate Root + child Entities + local Value Objects + their tests stay together.
- Value Objects are classified by value semantics, not size: one field and ten fields are equally valid when the whole value defines equality and there is no independent identity/lifecycle.
- Shared Value Objects are explicit and intentionally few: sharing requires an intentional cross-owner/domain-boundary semantic value, not convenience.
- Domain errors are separate from Aggregate folders.
- Literal Domain examples must be executable and use the same physical owner-centered layout recommended for implementation.
- No global deep Domain model is required upfront.

---

## DOC-UC-03 — Perform Slice Discovery / Planning and realize the Feature Slice

### Goal

Make one selected Feature's complete end-to-end realization understandable from UI/entry through simple application service, Domain/Shared/persistence/cross-cutting collaborators to the Feature Result; use that working plan to implement/prove the Slice, then discard it by default.

### Process

1. Start from selected Feature `Intent`, `Principal Result`, exact Main-path Steps, branch tables, attached `BR-*`, material Feature Implementation Concerns and relevant Scenario/Screen constraints.
2. Re-run the four-group Feature/Slice Boundary Check with stronger implementation evidence. Reopen the Feature boundary upstream if evidence contradicts the hypothesis.
3. For the **whole Feature**, list candidate classes/collaborators where material:
   - UI Action/Dialog/ViewModel/Presenter;
   - entry/handoff/URI adapter;
   - simple application service;
   - feature-local coordinator/mapper/result mapping;
   - Domain Aggregate/Entity/Value Object calls;
   - repositories/persistence;
   - Shared Git/GitHub/filesystem/archive/browser capabilities;
   - cross-cutting ID generation, clock, cancellation, serialization/locking, retry/reconciliation and diagnostics.
4. Use a simple application-service public boundary with typed semantic arguments/results. Do not introduce CommandBus/dispatcher/mediator/generic `execute(command)` merely as ceremony.
5. Walk the Feature Main path in exact order. For every Step, show candidate method calls and ownership/layer. A Domain call may appear because the Slice invokes it; do not duplicate its Domain unit tests here.
6. For a branch, keep one exact Feature decision/question and show path-specific calls plus explicit convergence/re-entry/termination.
7. End the Feature section with a small set of literal **Feature integration tests** that call the application-service boundary and cover whole meaningful Feature paths. Prefer real Domain/feature-local orchestration and fake/in-memory expensive process/network/browser boundaries.
8. Integration-test assertions may be grouped by logical meaning such as Feature Result, exact external effect, forbidden side effect, continuity/recovery and branch convergence.
9. Test names describe expected Feature behavior/result, not internal class/method names.
10. Plan selected future Features/extensions at the same end-to-end depth with explicit `FUTURE` markers. If an exact future product detail is OPEN, do not invent concrete methods/tests beyond the selected semantic boundary.
11. Implement and prove the selected Slice.
12. Delete the Slice Discovery/Planning artifact by default once the planned implementation/proof is complete. Durable Slice/Shared/ADR/Production↔Proof documentation, if useful, is a separate owner with a separate long-lived purpose.

### Principles

- Slice Discovery + Slice Planning is one optional working activity, not a mandatory new semantic phase.
- Feature `BR-*` remains semantic authority; this plan references identities instead of copying Requirement text.
- Slice independence means change locality, not dependency absence.
- Integration tests here prove Feature realization; Domain unit tests belong to Aggregate Planning/source tests.
- Planning artifacts may be retained temporarily as examples/migration aids, but retention does not make them authoritative.
- Do not create separate frontend/backend/database Slices by technical layer.

---

## DOC-UC-04 — Maintain Shared Implementation Capability when shared responsibility is real

### Goal

Extract and maintain reusable non-end-to-end implementation responsibility only when several Slices genuinely need the same coherent capability.

### Process

1. Start from repeated Feature Implementation Concerns or implementation evidence across Slices.
2. Ask whether the shared meaning is coherent and reusable rather than accidental code similarity.
3. Keep use-case-specific policy/result behavior in consumer Slices.
4. Define consumers and semantic boundary/contract.
5. Perform owner-local Production ↔ Proof Requirements Discovery through DOC-UC-14.
6. Recheck relevant Evolution Steps and change locality.

### Principles

- Shared capability is not a dumping ground for common utilities.
- Extraction should reduce forced cross-Slice change coupling, not create a central god-owner.
- Shared owner dependencies are normal and do not eliminate Slice independence.

---

## DOC-UC-05 — Maintain evolution-aware implementation architecture

### Goal

Use known Evolution Steps to make current Feature/Slice/Aggregate/Shared boundaries easier to evolve without prematurely implementing future behavior.

### Process

1. Inspect relevant known Steps during Feature/Slice Boundary Check and owner-local Requirements Discovery (DOC-UC-14).
2. Ask whether repeated future changes stay within one cohesive Slice/module/branch or reveal distinct evolution lines.
3. Distinguish a stable semantic seam needed now from speculative abstraction.
4. Record durable current Requirement only when known evolution materially justifies it.
5. Record future owner delta as Evolution Impact rather than pretending it is current behavior; classify the local evolution with the common Evolution Kinds where useful.
6. Treat semantic/product/architecture/documentation migration as Evolution. Keep migration work inside the canonical Step / affected Evolution Impacts rather than creating a competing roadmap.
7. Re-evaluate after Evidence or new Steps invalidate an earlier assumption.

### Principles

- Prefer change locality across the known evolution chain.
- Avoid both premature implementation and avoidable forced migration.
- Evolution fitness belongs to both production and proof.

---

## DOC-UC-06 — Inspect current implementation without duplicating source documentation

### Goal

Use current source/tests as exact realization Evidence while keeping normative docs focused on semantic behavior, boundaries and durable Requirements.

### Process

1. Read only source/test areas needed to answer the current planning question.
2. Treat class/method/package mechanics as source authority.
3. Promote a fact into normative documentation only when it is durable semantic/boundary/Requirement meaning.
4. Use generated traces/maps as derived navigation only; regenerate rather than hand-maintain when source changes.
5. Feed material implementation findings into Feature Implementation Concerns or owner-local Requirements Discovery.

---

## DOC-UC-07 — Explore and select Feature / Scenario / Screen design

### Goal

Explore candidate use-case boundaries and real journeys far enough to select coherent Feature/Slice hypotheses and Screen composition without turning design alternatives into current runtime behavior or roadmap truth.

### Process

1. Start from an Application Benefit / desired result, an existing Scenario, a Feature candidate or a Screen/interaction problem.
2. Sketch the smallest candidate Feature set and real journey needed to understand the intended application result.
3. For each non-obvious Feature candidate, use DOC-UC-13 far enough to expose intent, principal Result, meaningful behavior, Feature Data and material implementation concerns.
4. Compare Feature boundaries using the four-group Feature/Slice Boundary Check; do not finalize boundaries merely from labels, screens, transports or current class structure.
5. Compose candidate Features into realistic Scenario paths and selected/candidate Screens; check context/Data continuity, recovery/re-entry and terminal Result.
6. Treat exploration bidirectionally: Scenario/Screen pressure may revise Feature boundaries, while Feature behavior/results may revise Scenario composition or Screen responsibilities.
7. Compare materially different alternatives through qualitative strengths/problems/complexity/risks/questions when useful; no scoring framework is required.
8. Classify the result correctly: selected current/planned Feature or Scenario truth, selected Evolution Step, planned future Scenario, or candidate/rejected alternative.
9. Hand selected Scenario meaning to DOC-UC-01, selected Screen meaning to DOC-UC-11 and selected Feature/Slice hypothesis to DOC-UC-13 / DOC-UC-03.

### Principles

- Design exploration is iterative, not Scenario-first or Feature-first by rule.
- Candidate alternatives are not runtime branches or Evolution Steps by default.
- A Screen is not a frontend Slice.
- Explore enough implementation reality to avoid implausible boundaries, but keep exact code design downstream.

---

<a id="doc-uc-evolution-steps-map"></a>
## DOC-UC-08 — Plan and refine Evolution Steps

### Goal

Represent meaningful future application evolution early enough to influence current boundaries, then progressively refine each Step into a complete usable target state.

### Process

1. Capture a new Evolution Step as soon as a material future capability/journey/migration change is known. Early representation may be shallow.
2. Record affected Benefits/Features/Scenarios as they become known and classify material transition nature with one or more Evolution Kinds: Introduction, Expansion, Refactoring, Forced Migration, Retirement.
3. Use the Step during every relevant Discovery rather than waiting for late architecture review.
4. Represent a new Feature directly as Introduction in the Step target; do not invent a pre-existing Evolution Impact merely to explain its creation.
5. When an existing Feature changes and enough detail is known, show the full target Feature with `[EXISTING]`, `[NEW]`, `[CHANGED]`, `[REMOVED]` (or equivalent) rather than only a detached delta.
6. If Feature composition, ordering, cross-Feature Data/context or Screen journey changes, include the target Scenario.
7. Include as many Feature/Slice changes and migration actions as needed for the Step to end in a complete internally consistent usable application/documentation state.
8. Several implementation packages/commits may realize one Evolution Step; intermediate code progress is not automatically a separate application Evolution Step.
9. Record owner-local Evolution Impact in affected existing Slice/Aggregate/Shared/Screen/proof owners when those owners are migrated/maintained; use the same Evolution Kinds locally.
10. Keep migration planning in this canonical Step machinery; never create an independent competing migration roadmap for the same transition.

### Principles

- Evolution Step boundary follows complete application capability/state transition, not Feature count.
- Evolution Kinds are composable, not a single exclusive enum.
- A Step may consist of two or more Features when only their completed composition creates a usable Scenario.
- A Step may enable later Steps but must not depend on the next Step merely to become internally consistent.
- Known evolution is strong Feature/Slice boundary evidence.
- Migration is a form of Evolution; Forced Migration is one Evolution Kind, not a separate planning system.

---

<a id="doc-uc-semantic-readability"></a>
## DOC-UC-09 — Communicate documentation meaning clearly

### Goal

Make durable documentation easy to scan and accurately understand without simplifying away conditions, exceptions, boundaries, rationale or current/planned distinctions.

### Process

1. Identify the main semantic claim of each block before formatting it.
2. Keep one connected idea as prose when prose communicates it best; use bullets/tables/process maps when they reveal independently meaningful structure.
3. Make meaningful contrasts explicit when useful: current vs planned, success vs failure vs uncertainty, Feature vs Scenario, runtime branch vs design alternative, current Requirement vs Evolution Impact.
4. Re-read structured wording against source meaning and verify no condition, exception, reason, authority boundary or outcome disappeared.
5. Give Feature, Scenario, Requirement, Slice, Aggregate, Shared Capability, Evolution Step and other durable entities intuitive semantic names; technical IDs remain stable navigation aids, not meaning.
6. Apply the same semantic-readability rule to templates and examples.

### Principles

- Optimize for semantic readability without semantic compression.
- Shorter is not better when it removes required meaning.
- Technical identifiers are navigation, not architecture or roadmap order.

---

<a id="doc-uc-documentation-ownership"></a>
## DOC-UC-10 — Maintain use-case-driven documentation ownership

### Goal

Prevent orphan documentation owners whose purpose, authority or maintenance process is unclear while keeping each durable meaning with the narrowest correct owner.

### Process

1. Before creating or retaining a durable documentation owner, identify the process/use case that creates, maintains or consumes it.
2. Distinguish documentation-process artifacts from application semantic/contract/proof owners; do not invent meta use cases merely to justify product owners.
3. Ask whether the information can remain inside its natural existing owner without losing clarity.
4. Create a separate owner only when independent/shared complexity, review, reuse or authority pressure makes separate ownership materially clearer.
5. Link/reference existing authority instead of copying it into neighboring files.
6. Keep templates because concrete Documentation Use Cases consume them; treat them as recommended adaptable forms, not schemas that create authority by being copied.
7. Keep migration planning with the canonical Evolution Step owner and affected Evolution Impacts; create a separate migration document only when it is clearly the selected canonical/subordinate owner rather than a competing semantic roadmap.
8. For every durable owner, be able to answer what is authoritative here, what is referenced/derived, who updates it and what process needs it.
9. Merge/retire an owner when its independent use-case/process coverage disappears.
10. Audit newly introduced and materially retained methodology owners for compatibility references during methodology changes.

### Principles

- No orphan documentation owner.
- A useful fact does not automatically justify a separate file.
- Use-case coverage does not mean one Documentation Use Case per product file.
- Compatibility identifiers/anchors are part of the documentation interface when existing owners depend on them.

---

## DOC-UC-11 — Maintain selected Screen model

### Goal

Keep durable spatial/window/UI meaning explicit while allowing Features and Scenarios to own behavior and journeys.

### Process

1. Maintain the Screen Map and important Screen responsibilities.
2. Map Features/Scenarios to Screens only where spatial context matters.
3. Keep Screen-owned behavior/UI constraints in the Screen owner.
4. Use DOC-UC-01 / DOC-UC-07 Scenario planning to validate real transitions between Screens.
5. Feed Screen constraints back into Feature/Scenario planning when they expose impossible or confusing behavior.
6. Inspect relevant Evolution Steps.

### Principles

- `1 Feature = 1 Screen` and `1 Scenario = 1 Screen` are not required.
- Screen is not a frontend Slice.
- Do not make accidental pixel/layout details normative without durable meaning.

---

## DOC-UC-12 — Plan and realize credible proof

### Goal

Turn selected behavior and production Requirements into convincing proof without letting tests become a second semantic authority.

### Process

1. Start from relevant Feature/Scenario/Domain/Slice/Shared meaning and Proof Requirements discovered through DOC-UC-14 where owner-local discovery is material.
2. Prefer a failing executable proof before production realization when a credible test boundary exists.
3. Use integration/E2E proof when local proof cannot establish the required semantic result.
4. Use Practical Acceptance when real environment behavior cannot be credibly automated.
5. Keep shared Test Strategy only for cross-owner proof coordination.
6. Execute proof and record Evidence against the exact build/state/environment exercised.
7. If Evidence contradicts accepted meaning or boundary assumptions, open narrow revalidation instead of weakening the proof silently.

### Principles

- Tests prove selected truth; they do not create it.
- `1 Requirement = 1 test` is not required.
- Scenario is natural authority for E2E journey proof.
- Refactoring-resilient proof should prefer semantic inputs/outputs/state/evidence over incidental private HOW.

---

## DOC-UC-13 — Plan and maintain Feature behavior and Slice boundary hypothesis

### Goal

Define one coherent Feature as the primary behavioral authority, using a compact step-centered representation, and establish enough implementation understanding to treat it as a credible end-to-end Slice boundary hypothesis.

### Process

1. Start from relevant Application Benefit/task or a Feature candidate discovered through Scenario/Screen work; use DOC-UC-07 while alternatives remain unresolved.
2. State one Feature `Intent` and one principal meaningful `Result` / Result family.
3. Under `Expected application behavior`, record the smallest useful semantic Data representation, normally one compact Data table.
4. Make the numbered **Main path** the primary Feature representation:

```markdown
| Behavior step | Requirement(s) |
|---|---|
| **1. <semantic behavior step>** | `BR-...` — <compact normative statement> |
```

One row is one semantic behavior step. A row may own one or several `BR-*`.
5. Give every durable normative Behavior Requirement a stable `BR-*` identity. Keep canonical Requirement text only in the Feature owner, directly beside the behavior/branch it constrains where practical.
6. Write Requirements maximally tersely and logically. Correctness-critical order is normative; explicitly mark partial order/OPEN order rather than silently fixing implementation convenience.
7. For a material branch inside a Step:
   - state one exact decision/question;
   - use one table column per path/variant;
   - continue ordered actions vertically inside each path;
   - end with explicit convergence to a later Step, re-entry/retry, Success or Stop.
   Do not introduce a separate persistent Behavior-Step/Branch semantic Item merely for planning.
8. Keep actor/user/AI reasoning and free-form wording in Scenario when the application merely consumes that supplied input. Feature behavior starts at the semantic application boundary: what the application accepts, validates, establishes, changes and returns.
9. Record only material Feature Implementation Concerns needed for feasibility, dependencies, recovery risk, proofability, Domain/Shared signals, known Evolution and Slice-boundary reasoning. They are discovery evidence, not normative behavior.
10. Inspect relevant known Evolution Steps and run the four-group Feature/Slice Boundary Check:
   - Intent / Principal Result;
   - Semantic Entry;
   - Realization Cohesion / Shared Structure;
   - Development / Proof / Evolution Fitness.
11. Prefer one Feature/Slice when intent + principal Result family are the same and variation localizes; prefer separate Features/Slices for distinct intent/result or little meaningful shared realization. Transport/button/URI/CLI/REST/handoff alone never defines the boundary.
12. Select the Feature boundary + Slice boundary hypothesis, or mark the material unresolved detail OPEN.
13. Feed `Feature + Step N + BR-*` identities downstream to DOC-UC-03 / DOC-UC-02. Downstream planning references the identities and does not reproduce canonical Requirement text.

### Principles

- Feature Planning is behavioral authority informed by implementation reality, not class/method design.
- Scenario is not a mandatory Feature parent.
- Templates are adaptable examples, not schemas.
- Feature/Slice boundary is a hypothesis that later implementation evidence may reopen.
- New transport alone does not create a Feature.
- Existing Feature/Slice extension is normal.
- Do not split merely to make units smaller; do not merge into pervasive branching with poor change locality.

### Owners used by this process

- app-level Benefit/context owner where present;
- the Feature owner itself;
- relevant Scenario and Screen owners;
- known Evolution Step owner/map;
- existing Domain/Slice/Shared owners and source/test Evidence for feasibility/boundary checks only.

---

## DOC-UC-14 — Perform owner-local Requirements Discovery

### Goal

Discover durable Production and Proof Requirements for one selected Slice/Aggregate/Shared owner without forcing atomic Item ontology or a rigid questionnaire.

This is a later durable owner-local pass. Literal integration/unit tests sketched in non-persistent Slice/Aggregate Planning are **boundary/design evidence** and do not replace DOC-UC-14.

### Sources

Always inspect the relevant subset of:

```text
current behavioral meaning
Feature Step + referenced BR-* identities
semantic Data in Expected application behavior
Feature Implementation Concerns
implementation dependencies
Scenario / Screen Requirements
Domain / Shared meaning
known Evolution Steps
current implementation/proof Evidence
```

### Backbone — 3 × 2

Use three recurring concern groups, each with Production and Proof sides:

```text
                         PRODUCTION                  PROOF
Correctness              Correct Realization         Correct Proof
Local Reasoning          Maintainability /           Proof Maintainability /
                         Local Reasoning              Local Reasoning
Evolution Fitness        Evolution Fitness           Proof Evolution Fitness
```

The group title is the primary question. Nested prompts are optional question libraries, not fields that require `N/A` answers.

### Correct Realization

Ask what the owner must do to realize relevant meaning correctly. Material topics may include ordering, invariants, atomicity, failure/recovery, uncertainty, performance, concurrency, resources/security, external interaction and result contracts.

### Maintainability / Local Reasoning

Ask how the realization should preserve cohesion, meaningful names, explicit semantic contracts, visible control flow, low incidental coupling, module/branch clarity and local changeability.

### Evolution Fitness

Ask how current realization should accommodate **known** Evolution Steps without avoidable forced migration. Do not invent generic extensibility for hypothetical futures.

### Correct Proof

Ask what must be exercised/observed to convincingly prove behavior, invariants, negative guarantees, recovery, performance/concurrency, integration and exact result identity where material.

### Proof Maintainability / Local Reasoning

Ask how tests/proof stay readable, diagnostic, semantically named and resilient to incidental private implementation changes.

### Proof Evolution Fitness

Ask how proof remains valid when behavior stays stable and changes appropriately when known Evolution Steps change semantics.

### Bidirectional discovery

Production and Proof discovery are intentionally bidirectional. Proof difficulty may expose a required production seam; production design may expose new proof obligations. Place the durable Requirement according to what it requires, not which question discovered it.

---

## Non-duplication and ownership rules

1. Application Benefits justify behavior; do not copy them into every downstream owner unless needed for local readability.
2. Feature owns canonical Feature behavior and `BR-*` text; Scenario owns real journey/actor composition; Screen owns spatial/window meaning; durable Aggregate owns semantic consistency; durable Slice owns realized Feature implementation; Shared Capability owns reusable non-end-to-end implementation meaning; tests/Evidence prove rather than redefine.
3. Slice Discovery/Planning and Aggregate Planning are **working artifacts, non-persistent by default**. They may reference Feature Step + `BR-*`, but do not become semantic owners and should normally be deleted after implementation/proof.
4. If durable Domain/Slice/Shared/ADR/Production↔Proof documentation remains useful after planning, create/update that separate owner for its own purpose; do not mechanically preserve/promote the planning file.
5. Downstream planning never copies canonical `BR-*` text. Requirement identity is the trace key.
6. Feature Implementation Concerns are reusable discovery memory, not automatic Requirements.
7. One concern may inform several downstream Requirements; it is not automatically copied verbatim into them.
8. Requirements may be structured/related; do not atomize away algorithms, invariants or ordering merely to fit a list.
9. Cross-owner dependencies are normal. Optimize change locality rather than dependency elimination.
10. Selected Feature/Slice boundaries are hypotheses supported by current evidence and may be revalidated.
11. Future planning may be implementation-depth when semantic behavior is selected, but OPEN product details must remain blocked; downstream design must not invent them.
12. Current product documents using legacy FI/BI/Item forms remain authoritative for their existing meaning until separately migrated.

### Stable Documentation Use Case identity compatibility

`DOC-UC-01` through `DOC-UC-12` are stable methodology identities from the pre-refactor local methodology. When the process evolved, its stable ID is preserved. New target processes that have no prior semantic owner use new IDs (`DOC-UC-13+`) rather than reassigning an existing ID to unrelated meaning.

Current lineage after this refactor:

```text
DOC-UC-01  Scenario / journey composition and consistency
DOC-UC-02  non-persistent Aggregate Planning
DOC-UC-03  Slice Discovery / non-persistent Slice Planning + realization
DOC-UC-04  Shared Implementation Capability
DOC-UC-05  evolution-aware implementation architecture
DOC-UC-06  current implementation inspection
DOC-UC-07  Feature / Scenario / Screen design exploration
DOC-UC-08  Evolution Step planning / map relationship
DOC-UC-09  semantic readability
DOC-UC-10  documentation ownership
DOC-UC-11  selected Screen model
DOC-UC-12  credible proof
DOC-UC-13  Feature planning + Feature/Slice boundary hypothesis
DOC-UC-14  owner-local Production ↔ Proof Requirements Discovery
```

## Representation rules

- Prefer the smallest form that preserves selected meaning.
- Feature is the primary behavioral authority. Prefer compact semantic Data + a two-column Main path (`Behavior step | Requirement(s)`) with stable `BR-*` beside the owning behavior.
- For a material Feature/Scenario decision, use one exact question and one column per path; show path continuation and convergence explicitly.
- Scenario references Features and owns actor/journey composition/continuity without duplicating Feature internals.
- Actor fields are optional; use them only when actor identity/decision materially changes the journey.
- Separate durable owner files when responsibility, evolution, reuse or maintenance pressure makes them independently useful.
- Slice Discovery/Planning and Aggregate Planning are temporary working artifacts, not durable owners.
- In Aggregate Planning, place literal Domain unit tests immediately after the candidate method they prove; no detached invariant catalog.
- In Slice Planning, use whole-Feature integration tests through a simple application-service boundary; no Domain unit-test catalog.
- Test names describe expected behavior/result rather than tested class/method names.
- Future Features/extensions may be planned deeply when selected, but exact OPEN details remain blocked.
- Evolution Step notation may vary as long as complete target meaning, Evolution Kinds and existing/new/changed/removed effects are clear where material.
- Templates are **recommended forms/examples, not schemas**. Select, omit, combine or reshape sections according to the semantic meaning being preserved; do not copy every heading mechanically or manufacture `N/A`.

## Integration rule for existing Replacement Package App documentation

This methodology owner changes the **target documentation process**, not current product semantics by itself.

When a current Scenario/Domain/Slice/Screen/testing owner is next migrated:

1. preserve its accepted current/planned behavior first;
2. identify Feature boundaries with the four-group check instead of mechanically converting each old FI to a Feature;
3. establish Feature owners as primary behavioral authority using compact semantic Data + numbered Main-path rows + stable `BR-*` beside owning behavior;
4. recompose Scenario owners around Feature Results, actor decisions where material, continuity, Screen/external context and Benefit closure without copying Feature internals;
5. convert old Behavior Item meaning into Feature-local `BR-*` or genuine cross-Feature `SR-*` by meaning rather than 1:1 textual mapping;
6. keep Feature-local feasibility/realization concerns as implementation concerns rather than normative behavior;
7. use DOC-UC-03 when exact end-to-end Slice planning is useful; treat its working artifact as disposable;
8. use DOC-UC-02 when Domain class/state/method design is useful; keep method-local unit tests and treat the Aggregate plan as disposable;
9. create/update durable Domain/Slice/Shared/Production↔Proof owners separately only when they retain independent long-lived purpose;
10. preserve known Evolution Steps and mark future behavior explicitly; never concretize an OPEN future detail downstream;
11. update derived maps/testing navigation only after semantic owners are reconciled;
12. do not modify unrelated product owners merely for terminology consistency.
