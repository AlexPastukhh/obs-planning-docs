# Replacement Package App — Documentation Use Cases

Status: active documentation-maintenance owner
Scope: how Replacement Package App documentation designs and preserves Scenario behavior, discovers Domain meaning, describes Slice implementation requirements, stays evolution-aware and keeps source-level implementation evidence derived rather than manually duplicated.

## Purpose

Documentation must make these layers understandable without turning any one layer into a duplicate of another:

1. which application benefit / desired result each Scenario exists to realize and what accepted user/application behavior is true now;
2. how Scenario Feature Interaction composition and Screen realization are explored together before either is selected;
3. which Feature Interactions, their internal Interaction Processes, Behavior Items and interaction/component-local UI Requirements define selected Scenario behavior;
4. which material implementation-feasibility dependencies/questions/assumptions/candidates must remain visible in the Scenario because Scenario plausibility or selected runtime composition depends on them;
5. which selected Screen model owns spatial/window meaning, Scenario/FI-to-Screen relations and Screen-owned behavior requirements;
6. what known application behavior may change or expand through Scenario-owned Evolution Steps;
7. when selected Evolution Steps and materially independent local impacts are likely/intended to happen, and which steps depend on or enable others;
8. which Domain owners implement business rules and which durable implementation requirements make current meaning and materially known future evolution safe to realize;
9. which Slices and optional Shared Implementation Capabilities realize Scenario behavior through coherent composition, reuse and ports/boundaries;
10. how local proof is planned and normally realized test-first once selected meaning and a credible executable proof boundary are known;
11. which Test Items preserve non-obvious proof quality without turning tests into a second semantic authority;
12. which shared testing decisions belong in Test Strategy and which reusable test machinery deserves a Shared Test Capability;
13. how Practical Acceptance plans are distinguished from executed Evidence;
14. how to inspect current source/test mechanics without manually maintaining code-level traces in normative documentation;
15. how to keep documentation readable, intuitively named and structurally clear without losing meaning;
16. why every durable documentation owner exists and which explicit use case/process creates, maintains or consumes it.

The target semantic/implementation/proof flow is:

```text
Application Benefit / Desired Result
→ Scenario
   ├─ Scenario Process = selected FI composition / ordering / transitions
   └─ Feature Interactions
      ├─ Interaction Process
      ├─ Behavior Items + Reasons
      └─ FI/component-local UI Requirements
   └─ Realization Dependencies / Questions / Candidates
      └─ non-authoritative feasibility memory for material HOW dependencies
↔ selected Screen design
   ├─ Screen Map / Scenario×Screen / FI×Screen
   └─ Screen Behavior Items
→ Domain discovery / Slice / optional Shared Implementation Capability
   ├─ inspect relevant Scenario Realization Dependencies
   ├─ optional Domain / Slice / shared Implementation Items → production code
   └─ local Tests / optional Test Items → test code
↘ material implementation discovery may feed back into Scenario Process / FI design
→ executed automated/practical Evidence
```

This diagram shows authority/realization relationships, not chronological TDD order. When a credible executable proof boundary is known, failing proof may deliberately be written before production code while tests remain proof of required behavior rather than a second semantic authority.

Evolution responsibility is deliberately split:

```text
Scenario owner
→ Evolution Step
→ WHAT application behavior changes

Evolution Steps Map
→ rough horizon / likelihood / dependency / order / readiness
→ WHEN / HOW LIKELY selected evolution and materially independent impacts are

Domain / Slice / Screen / Shared Implementation Capability
→ Evolution Impact
→ WHAT changes in this owner when that canonical step is realized

Implementation Items
→ durable HOW requirements for current correctness, implementation quality
  and high-quality realization of materially known evolution
```

`Evolution Impact` is not a second implementation-requirement list. It records future owner delta. `DI-*`, `SI-*` and shared implementation items hold durable requirements that shape the owner now, including ports, composition seams, stable boundaries, identity/ownership rules or other constraints justified by materially known evolution. A known future capability may justify such a boundary now without justifying premature implementation of the future behavior itself.

Design exploration precedes authoritative Scenario/Screen maintenance when behavior or spatial realization is not yet selected:

```text
Application Benefit / Scenario Desired Result
→ candidate Scenario Process / FI composition
→ brief FI roles + local Results
↔ sketch uncertain FI Interaction Processes
↔ discover candidate Behavior Items / constraints
↔ identify material Realization Dependencies / feasibility questions
↔ perform targeted implementation/source/infrastructure/prototype investigation when needed to judge Scenario plausibility
↔ candidate Screen Set / Screen Variants
→ revise FI boundaries / composition as needed
→ select or refine design
→ current Scenario + Screen truth OR Evolution Step OR retained/rejected alternative
```

This owner defines documentation work and authority boundaries. It does not replace Scenario owners, Screen owners when they exist, the Evolution Steps Map, Domain owners, `slices.md`, `testing-plan.md`, focused contracts, source, tests or executed Evidence.

## Minimal shared terms

These terms stay here because several Documentation Use Cases require the same meanings. They do not justify a separate terminology file by themselves.

### Current truth

Behavior or architecture that is already accepted as implemented.

Current Scenario prose describes current user/application behavior. Current Domain/Slice prose describes current semantic responsibility and durable architecture constraints, not a manually maintained copy of source structure.

### Application Benefit / desired result

The useful application result that justifies a Scenario. It answers why the application should provide this Scenario at all.

A Benefit / desired result is upstream of the selected Feature Interaction design. Different FI compositions may legitimately realize the same Benefit. Keep this meaning in the Scenario owner unless several Scenarios genuinely need one separate shared benefit owner.

### Scenario

A Scenario is one selected composition of Feature Interactions in an application interaction context that realizes an application Benefit / desired result.

For UI applications, that interaction context may span one or more Screens/Windows. Do not force `1 Scenario = 1 Window`: Scenario owns behavioral composition, while selected Screen owners own spatial/window meaning.

### Scenario Process Specification

The complete behavioral specification of one Scenario. It consists of two related scales:

- **Scenario Process** — FI composition, ordering, transitions between FIs, cross-FI branches/loops and terminal outcomes;
- **Feature Interaction specifications** — the local runtime behavior inside each selected FI, including context/inputs, Interaction Process, outcomes, Results, Outputs, retries/recovery/uncertainty when material and transitions back to the Scenario Process.

The complete specification must still make meaningful observable behavior visible. Separating the two scales prevents a high-level Scenario map from absorbing FI internals while preserving full behavior authority in the Scenario owner.

A Process Specification is not merely a short overview whose missing semantics appear only later in Behavior Items. Behavior Items and UI Requirements formalize requirements already visible in the selected FI behavior; they do not become a second hidden source of Scenario behavior.

A compact Scenario Process Map may show FI topology while detailed FI entries carry the full local behavior. Together they are the complete Process Specification.

### Feature Interaction

A Feature Interaction is a selected Scenario-local unit of application behavior through which the Scenario progresses toward its Benefit / desired result. It is a behavioral means inside the Scenario, not an independent top-level product goal.

A useful FI has a meaningful local role and Result sufficient to distinguish it from neighboring behavior. It may be user-triggered, automatically continued by the application, externally driven, or a combination. It does not imply one button, one class or one Slice.

The important parts are:

- **Scenario Role / Local Purpose** — why this selected behavior exists here and what it enables/prepares for the Scenario;
- **Context / Preconditions** — already-established state relevant to the interaction;
- **Required Inputs** — information/artifacts/actions actually consumed by the interaction;
- **Interaction Process** — runtime user/application behavior inside this FI;
- **Outcomes** — meaningful success/error/validation/uncertain results;
- **Result** — meaningful local application/user-world truth established by an outcome and useful for defining the FI boundary;
- **Outputs** — information/artifacts/identity/state produced for later consumption;
- **Next Interactions** — transitions, loops or termination enabled by outcomes.

`Scenario Role / Local Purpose` and `Why This Interaction Design` are different questions. Role/purpose explains why the FI exists in this Scenario composition. Design rationale explains why this particular input/process/result/output/control-point form was selected instead of another realization.

### Feature Interaction Variant

An alternative behavioral design for the same Scenario-local role/responsibility.

Variants may require fewer, more or different inputs; use different context; require different user actions; produce different-strength Results/Outputs; move control points; or remove the need for a later interaction. Variants are not required to preserve the same input/output contract.

### Scenario Process Variant

An alternative composition of Feature Interactions for realizing the same Scenario Benefit / desired result.

A Process Variant may add/remove interactions, compose several into one, split one into several, replace one interaction with another, change initial inputs, change contracts between interactions or produce different final outputs.

### Runtime branch and design alternative

A **runtime branch** is behavior actually available in the selected/current Scenario.

A **design alternative** is a candidate/rejected/possible way the Scenario or Feature Interaction could have been designed while choosing behavior.

Do not represent a rejected alternative as a current runtime branch. Considering an alternative does not automatically create an Evolution Step.

### Scenario Realization Dependency

A **Scenario Realization Dependency** is a material implementation-feasibility dependency, question, assumption or candidate realization that is kept in the Scenario owner because the Scenario's plausibility, FI boundary or runtime interaction process depends on understanding it.

Central rule:

> **Scenario does not own HOW, but the Scenario has the right and obligation to record the HOW questions and assumptions on which its own realizability depends.**

Preserved formulation from the planning discussion:

> **Scenario не владеет HOW, но Scenario имеет право и обязан фиксировать те вопросы и предположения о HOW, от которых зависит его собственная реализуемость.**

This is intentionally different from a Behavior Item or Implementation Item:

```text
Scenario BI
= implementation-independent WHAT must hold

Scenario Realization Dependency
= what must be understood/proved about possible HOW so the selected Scenario remains credible

Domain / Slice / Shared Implementation Item
= durable HOW selected after implementation planning
```

A Realization Dependency may preserve:
- a feasibility question that can invalidate or reshape a selected FI/process;
- an implementation assumption currently used to continue Scenario planning;
- one or more candidate realization ideas worth investigating later;
- the lower planning/investigation area that must consume the question (Domain, Slice, Shared Implementation, source/infrastructure investigation, prototype/spike);
- the Scenario impact if the assumption fails.

It does **not** make a candidate mechanism authoritative and does not create `DI-*`, `SI-*` or a Shared Implementation Capability merely by being recorded.

The preferred planning direction is monotonic refinement: revisiting previous planning layers is undesirable and should be minimized, not normalized as casual churn. But implementation discovery is a valid and expected feedback mechanism rather than a methodology failure. If lower-level investigation shows that selected runtime behavior is impossible, unsafe, materially different from the assumption, or substantially better realized by another runtime algorithm/composition, revise the affected Scenario Process/FI boundary rather than forcing the old Scenario onto an unsuitable implementation.

Application Benefit / Desired Result is upstream and should remain stable unless the discovery actually invalidates that benefit. Scenario/FI/process details are allowed to change when implementation feasibility changes what behavior can credibly be selected.

### Behavior Item

A Behavior Item is one atomic **implementation-independent business/application behavioral requirement** that must hold for one or more selected Feature Interactions / their Interaction Processes to correctly realize the Scenario.

It answers:

> What must the application do, or what must remain true, for this selected FI behavior to be correct and therefore support the Scenario Benefit / desired result?

A Behavior Item deliberately does **not** prescribe one implementation mechanism. It should remain valid across ordinary refactoring and across multiple possible implementations of the same selected behavior.

Collectively, the BI set is the normative requirement decomposition through which selected FI behavior is made correct. Domain, Slice and Shared Implementation owners then implement those BI; tests verify that implementation rather than becoming a second behavior authority.

Prefer a stable technical ID that does not encode document position or roadmap order, plus a readable name that communicates the requirement. For example:

```text
BI-RPKG-REVIEW-EXACT-PUBLISHED-TIP — Review decision binds the exact published tip
```

Recommended content:

```text
Requirement:
<business/application behavior / invariant / rule>

Reason:
<why this behavior exists>
```

The `Reason` may explain the Scenario Benefit / desired result, a Feature Interaction role, later behavior that depends on the rule, a semantic boundary, recovery/uncertainty correctness, or a concrete bug/class of bugs the rule prevents. Do not invent a bug-prevention rationale when the rule is simply fundamental to correct Scenario behavior.

Behavior Items are the primary input for Domain discovery. The authoritative BI text stays in the Scenario; lower owners reference the same BI identity instead of rewriting it.

A BI normally sits under the Feature Interaction where its behavioral need is clearest. If one BI constrains the boundary between multiple Feature Interactions, keep one authoritative `Requirement + Reason` definition and reference that same BI identity from every relevant interaction instead of creating rewritten copies.

### UI Requirement

An intentional requirement about how Scenario behavior is presented or controlled through UI.

UI Requirements remain separate from business/application Behavior Items. Interaction/component-local UI Requirements normally stay near the Feature Interaction whose behavior gives them meaning.

A rule whose canonical meaning belongs to a Screen as a spatial/window owner should instead be maintained by the selected Screen model as a **Screen Behavior Item** and referenced from Scenario/FI prose where needed. Do not keep a second authoritative copy in the Scenario merely because the Process Specification must still make observable behavior understandable.

```text
Scenario/FI
├─ Behavior Items
└─ interaction/component-local UI Requirements

Screen owner
└─ Screen Behavior Items
```

Do not turn accidental current layout, pixel positions or incidental visual structure into normative requirements. Record only intentional presentation/interaction/spatial constraints worth preserving across implementation change.

### Strengths, Problems, Complexity, Risks and Questions

These are design-analysis concepts, not a mandatory scoring taxonomy.

- **Strength** — what a design does especially well.
- **Problem** — a known undesirable property/trade-off already inherent in the design.
- **Complexity** — neutral degree of complication introduced by the design; not automatically negative.
- **Risk** — a potential/conditional future problem.
- **Question** — an unresolved point requiring decision, research, experiment, prototype or evidence.

Useful complexity dimensions when material include user interaction, Scenario/process, Feature Interaction behavioral, implementation, recovery, testing and evolution complexity.

A key design question is not merely “which variant has less complexity?” but “where does this variant place complexity, and is that the right place for this Scenario?”

### Evolution Step

An Evolution Step is one coherent **change in application behavior** owned canonically by a Scenario.

It answers **what changes** for the application/user process. It may add/remove/replace/compose/split Feature Interactions, change interaction contracts/branches/outcomes, add/change/remove Behavior Items or UI requirements, affect selected Screen realization, extend a Scenario, or link a full planned future replacement Scenario when the change is too broad to remain readable as a local delta.

The canonical step does **not** describe Domain/Slice/Screen/test implementation delta. Those consequences belong to `Evolution Impact` in affected lower owners.

Each step has one canonical Scenario owner. If it affects several Scenarios, choose the Scenario where the user/application behavioral change is most naturally authoritative; other Scenario owners reference the same step rather than copying it.

Use a stable semantic ID/name rather than an ordinal that pretends to define roadmap order, for example:

```text
EVO-RPKG-GIT-DERIVED-CURRENT-CHANGE — Derive Current Change from Git revision boundaries
```

A step may carry semantic/planning intent such as `URGENT`, `PLANNED` or `POSSIBLE` when useful. Intent does not own exact sequence, rough horizon, likelihood/confidence, dependency or readiness; those planning relationships belong to the Evolution Steps Map.

When a step is accepted as implemented, resulting behavior becomes current Scenario truth. The step need not remain as an active future item; retain historical rationale only when it still materially explains current meaning.

### Planned future Scenario

A future independently meaningful user-world Scenario may be documented as a full Scenario owner before it is current.

Use the same Scenario form with a clear status such as `planned future Scenario owner`. Do not hide a complete future Scenario inside another Scenario's Evolution Step.

A current Scenario's Evolution Step may link `Replacement Scenario` when planned change is so broad that a separate full future Scenario communicates the target meaning better than a large local delta.

### Evolution Steps Map

[`evolution-steps-map.md`](evolution-steps-map.md) is the planning owner for **when, in what dependency/order and with what rough planning likelihood/readiness selected evolution is intended to happen**.

It may show:

- rough horizon or relative timing;
- likelihood/planning confidence when useful;
- dependencies/prerequisites and what a step enables;
- parallelizable steps;
- conditional/optional branches;
- implementation readiness when material;
- planned future Scenarios reached/replaced by steps;
- a materially independent local `Evolution Impact` item when its timing/likelihood differs enough from the parent step to deserve explicit planning visibility.

The map references canonical Scenario-owned Evolution Steps and lower-owner impacts; it does not redefine their behavioral or implementation delta. Step identity remains semantic and stable while map planning changes.

### Evolution Impact

A Domain, Slice, Screen or Shared Implementation Capability does **not** own Evolution Steps.

When a canonical Scenario-owned step affects that owner, `Evolution Impact` records **what changes in this owner when the step is realized**. It is future owner delta, not a duplicate list of current architecture requirements.

Use three change kinds when they add meaning:

- **Expansion** — preferred additive change: extend capability, compose another implementation/consumer, add behavior through a stable port/boundary, or add corresponding proof;
- **Refactoring** — behavior-preserving structural improvement for readability, cohesion, testability or easier extension;
- **Forced Migration** — existing logic/authority/representation must be moved or substantially reworked because the current structure cannot realize the selected evolution through reasonable expansion/composition.

`Forced Migration` is an architecture-pressure signal, not the preferred evolution mechanism. Analysis should strive to discover avoidable forced migration early and express the needed current boundary/port/composition constraint as an Implementation Item. Do not duplicate that Implementation Item's `Requirement + Reason` inside `Evolution Impact`; reference it only when needed to make the future delta understandable.

A materially independent impact may be referenced by the Evolution Steps Map when it has different timing, likelihood or dependency meaning from the parent Evolution Step.

When Tests are embedded in the affected owner, material test-suite change is part of that same owner's `Evolution Impact`: adding proof is normally Expansion and behavior-preserving suite/fixture reorganization is Refactoring. Do not create a parallel test-evolution owner merely because tests change; most Evolution Steps need no separate test-suite impact note.

### Domain Implementation Item

A Domain Implementation Item (`DI-*`) is an optional durable requirement governing how a Domain owner must be shaped.

A `DI-*` may be needed for:

- correct implementation of current BI/invariants;
- semantic consistency, authority, identity or one-owner rules;
- implementation quality such as cohesion/testability when it is durable and non-trivial;
- materially known `Evolution Impact` that should be realizable later through high-quality expansion/composition rather than avoidable Forced Migration.

A known future Evolution Step may therefore justify a stable semantic boundary, identity or ownership rule now even when the current BI alone would not require that exact structure. It does **not** justify prematurely implementing the future behavior itself.

A Domain owner may need no `DI-*` items. A good item survives ordinary implementation refactoring and does not become a method/field/call trace.

### Slice Implementation Item

A Slice Implementation Item (`SI-*`) is an optional durable requirement governing how a Slice realizes selected behavior using Domain and infrastructure.

It may cover current orchestration/separation/recovery/composition, a stable port/boundary, concrete reuse/non-duplication pressure, testability/observability or materially known `Evolution Impact` that should later be realizable through additive composition rather than avoidable Forced Migration.

A known future capability may justify a port or composition seam now; it does not justify implementing that future capability before its Evolution Step is selected for realization.

A good `SI-*` survives ordinary refactoring and does not describe current method/service wiring.

### Shared Implementation Capability

A Shared Implementation Capability is an optional owner for one real reusable implementation responsibility consumed by several Slices and substantial enough to need one semantic implementation owner.

It may represent reuse, a cross-cutting concern, or both. `Cross-cutting` is a characteristic, not a second owner type.

Do not create one merely because several Slices share a slogan, helper shape or generic engineering principle. Prefer local Slice ownership until one coherent shared responsibility/contract/consumer relationship is actually useful.

A Shared Implementation Capability may own durable local Implementation Items, local Tests/Test Items and `Evolution Impact` in the same way a Slice does.

### Test Item

A Test Item is an optional durable **additional requirement on proof quality**. It is used when the tested BI/invariant/implementation requirement alone does not make the credible proof obligation obvious.

A Test Item may require, for example:

- proving no mutation in addition to an error result;
- exercising the correct public/application boundary;
- observing durable/persisted state rather than only a returned value;
- avoiding mock-only false confidence or internal call-order coupling;
- preserving isolation or deterministic failure injection;
- keeping proof stable across behavior-preserving refactoring and planned additive evolution.

A Test Item is not a new product/Domain/Slice requirement and does not create production architecture. If a stable port, compatibility rule or orchestration constraint is required, that requirement belongs to the appropriate BI/DI/SI/shared owner; the Test Item only says what additional proof quality is needed.

Refactor/evolution resilience means proof should stay stable while the property it proves remains unchanged. If an Evolution Step genuinely changes that property, changing or replacing the relevant Test Item/test is legitimate rather than a proof-stability failure.

### Test-first realization

When selected meaning and a credible executable proof boundary are known, production realization should normally be test-first:

```text
selected meaning
→ failing credible proof
→ implementation
→ green
→ behavior-preserving refactor
```

For pure refactoring, existing relevant proof should remain green; do not manufacture a failing test only to call the work TDD.

When realization/proof feasibility is genuinely unresolved, an experiment/prototype/spike may precede production realization. Use it to learn, then return to the normal test-first production path. Experimental code is not accepted merely because it works; if pragmatically retained, credible proof is still required before acceptance.

When a property fundamentally requires a real implemented environment, plan the Practical Acceptance inquiry first, implement the subject, then execute and record Evidence. Planned verification, implemented test/check and executed Evidence are distinct states.

### Test Strategy and Shared Test Capability

`testing-plan.md` is the shared Test Strategy owner when multiple semantic owners/Slices need coordinated proof-layer policy, non-duplication, shared environment/isolation, critical E2E boundaries or Practical Acceptance boundaries.

A **Shared Test Capability** is different: it owns real reusable test machinery/behavior such as a disposable Git repository fixture, deterministic failure-injection capability or bridge harness when several local suites genuinely depend on one reusable responsibility.

```text
Test Strategy
→ shared proof policy / allocation

Shared Test Capability
→ reusable test implementation responsibility

Aggregate / Slice / Shared Implementation Capability
→ local Tests / optional Test Items
```

Do not create a Shared Test Capability merely for a common testing principle; keep policy in Test Strategy and ordinary local mechanics in the consuming test suite/source.

### Generated Implementation Trace

A Generated Implementation Trace is a **derived, non-authoritative artifact produced from source**, intended to answer low-level questions such as current calls, callers, field reads/writes, referenced types or external boundaries.

It is not normative documentation and must not be manually maintained as part of a Scenario/Domain/Slice owner. Source remains authority for implementation mechanics. Generated traces should be source-revision-bound and replaceable by regeneration.

A future generator may materialize traces under:

```text
planning/documentation/tools/replacement-package-app/generated/implementation-traces/
```

### Template

A Template is a recommended starting form for an owner or entry, not a schema.

Canonical recommended forms live in [`documentation-templates.md`](documentation-templates.md). Each Documentation Use Case below links directly to the concrete form at the process step where it is needed. A concrete situation may omit, combine, rename, reorder or add sections when another structure communicates the required meaning more clearly.

## Non-duplication, ownership, naming and presentation rules

Keep semantic documentation stable, local and intentionally readable.

- Do not manually duplicate information that can be read reliably from source and changes only because code was refactored.
- Do not manually maintain call chains, method/service routing, Java field inventories or code-shape traces in Scenario, Domain or Slice owners.
- Do not document accidental current UI layout merely because it can be observed; record only intentional UI constraints worth preserving.
- Record code-independent behavior, invariants, intentional UI requirements, architecture requirements, ownership and evolution pressure instead.
- Keep a small term, invariant, principle or decision inside its natural Use Case/owner when a separate file would add ceremony rather than clarity.
- Create a focused documentation owner only when an explicit use case/process needs that durable owner and independent/shared complexity justifies it. Documentation-process artifacts require a Documentation Use Case; application semantic/contract/proof owners may be justified by the Scenario, Slice, testing or acceptance process that needs them.
- Do not create orphan `terms.md`, `principles.md`, `notes.md` or similar files merely because the information seems generally useful. If no explicit use case/process creates, maintains or consumes the owner, either keep the information in its natural owner or define the missing use case first.
- Domain documentation is organized around semantic consistency boundaries, not Java classes. Prefer an Aggregate owner when several concepts share one consistency/invariant boundary.
- A separate Domain Object file is valid when that object has enough independent semantics, identity/lifecycle, cross-owner reuse or rules that an Aggregate file becomes less clear.
- One Java class does not imply one Domain Object owner, and one Domain Object owner does not imply one Java class.
- `Feature Interaction` is behavioral Scenario decomposition; `Slice` is implementation decomposition. Do not require 1:1 mapping.
- Scenario does not own implementation HOW, but it must retain material Realization Dependencies when feasibility assumptions/questions materially affect Scenario plausibility or runtime composition.
- Scenario/FI design is iterative: explore enough internal FI Interaction Process, candidate BI and material realization feasibility to judge boundaries, revise FI composition when that exploration or later implementation discovery exposes a better/necessary design, and do not fully detail every candidate FI before the high-level composition is stable enough to justify it.
- Prefer monotonic refinement and avoid unnecessary upstream churn, but never preserve an FI/process solely to avoid revisiting Scenario when implementation evidence invalidates its assumptions.
- Candidate/rejected design alternatives do not become current truth, Evolution Steps or architecture requirements automatically.
- Optimize prose for **semantic readability without semantic loss**, not for the fewest lines:
  - one connected idea may remain prose;
  - several independent facts, conditions, exceptions or consequences should be exposed as bullets/sub-bullets or another clear structure;
  - branches, outcomes, contracts, before/after and current/future contrasts should be visually explicit when that makes meaning easier to recover;
  - never delete a condition merely to make the document shorter;
  - do not turn every sentence into a list when prose carries one coherent thought better.
- Give every durable documentation entity an intuitive human-readable name. A technical ID may help stable references but must not substitute for meaning.
- Do not encode arbitrary display order in entity identity. Numeric suffixes such as `01`, `02`, `03` should not imply Scenario/Slice/FI/BI/EVO ordering unless the number has independent stable meaning. The Evolution Steps Map owns roadmap order.

`domain-evolution.md` is a cross-owner view of Domain changes caused by Scenario-owned Evolution Steps. It is not the primary Domain model and does not own the Evolution Steps themselves.

---

## DOC-UC-01 — Maintain Scenario behavioral specification and evolution

### Goal

A reader can open one Scenario and understand the application Benefit / desired result, selected Feature Interaction composition, complete FI-local runtime behavior, core Behavior Items, interaction/component-local UI requirements, known Scenario-owned Evolution Steps and any material Realization Dependencies needed to judge implementation feasibility without turning the Scenario into implementation authority.

### Process

1. Verify accepted current behavior from Scenario documentation, source/tests and accepted implementation state.
2. Maintain the Scenario's `Application Benefit / Desired Result` plus complete `Process Specification` using [Template — Scenario owner](documentation-templates.md#template-scenario-owner) and [Template — Feature Interaction entry](documentation-templates.md#template-feature-interaction-entry).
3. Maintain the Scenario Process as the selected FI composition: ordering, transitions, cross-FI branches/loops and terminal outcomes. Keep this level high enough that FI internals are not duplicated in the topology.
4. For each selected FI, maintain its Scenario Role / Local Purpose, Context/Preconditions, Required Inputs, internal Interaction Process, meaningful outcomes, Result, Outputs and Next Interactions. Include retry/recovery/validation/uncertainty only where they are part of that FI's real behavior.
5. Persist core implementation-independent Behavior Items with `Requirement + Reason` under the FI where their need is clearest; reference one authoritative BI identity across several interactions when the rule spans their boundary.
6. Maintain interaction/component-local UI Requirements near the owning FI using [Template — UI / Screen requirement forms](documentation-templates.md#template-ui-requirement). When canonical meaning belongs to a Screen/spatial context, reference the selected Screen owner rather than keeping a second authoritative screen-level copy in the Scenario.
7. Keep the Process Specification observably complete even when a detailed Screen-owned requirement lives elsewhere; Scenario prose must still explain what the user/application experiences.
8. Review the selected Scenario for material gaps in implementation feasibility. When Scenario plausibility, an FI boundary or runtime process depends on HOW that is not yet understood, maintain an optional `Realization Dependencies / Questions / Candidates` section using the Scenario template.
9. For each such dependency, state the relevant Scenario/FI behavior, the question/assumption/candidate, where it must be investigated, and what Scenario part may need revision if the assumption fails. Do not turn the candidate HOW into BI/DI/SI authority.
10. Before treating a planned Scenario as mature enough for lower implementation planning, verify that no central FI is accepted merely while its technical realizability is completely unexamined. Not every dependency must be resolved; material uncertainty must be visible and routed.
11. Maintain `Evolution Steps` only for coherent application-behavior changes canonically owned by this Scenario; use [Template — Evolution Step](documentation-templates.md#template-evolution-step).
12. For each Evolution Step, describe WHAT changes in Scenario/FI/contracts/BI/UI behavior; reference affected Screen realization when useful but keep detailed Screen/Domain/Slice/test delta in their `Evolution Impact` sections.
13. Use semantic stable IDs/names; `URGENT`, `PLANNED` or `POSSIBLE` may express useful step intent, while map timing/likelihood/order remains separate.
14. Link one canonical step across affected Scenarios rather than duplicating it. Use a planned future Scenario when a complete future application benefit/behavior is clearer than a large local delta.
15. When an Evolution Step is implemented, promote resulting behavior into current Scenario truth and retain historical rationale only when it still explains current meaning.
16. Use DOC-UC-07 for design exploration and DOC-UC-09 for readable presentation.

### Principles

- A Scenario exists to realize an application Benefit / desired result; buttons, Slices, classes and implementation actions do not define its identity.
- Scenario Process owns FI composition/transitions; each FI owns its local Interaction Process inside the same Scenario authority.
- FI is a selected behavioral means inside the Scenario, not a separate top-level product goal.
- Process Specification is complete; BI/UI/Screen references formalize visible behavior rather than hiding a second behavior source.
- Evolution Step = WHAT application behavior changes.
- Scenario Realization Dependency = non-authoritative feasibility memory for material HOW dependencies, not selected implementation ownership.
- Prefer monotonic refinement; allow implementation discovery to feed back into Scenario/FI/process when real constraints invalidate or materially improve the selected runtime design.
- Current truth is not called a transitional Scenario merely because future evolution is known.
- `POSSIBLE` is non-binding and does not license speculative implementation.

### Owners used by this process

- current/planned future Scenario owners;
- selected Screen owner when Screen-owned meaning is referenced;
- Evolution Steps Map as downstream planning consumer;
- affected Domain/Slice/Shared Implementation Capability owners as downstream `Evolution Impact` consumers.

---

## DOC-UC-02 — Discover and maintain Domain from Behavior Items

### Goal

Derive coherent Domain semantics from Behavior Items while using durable Domain Implementation Items to protect current correctness, implementation quality and high-quality realization of materially known future evolution.

### Process

1. Start from Scenario/FI Behavior Items and inspect the Scenario's material Realization Dependencies; do not derive Domain ontology from current Java classes or Screen layout.
2. For each Realization Dependency, ask whether the open question/assumption is actually about semantic identity, state, invariant or consistency ownership. Investigate it here when it is Domain-relevant; otherwise leave it routed to Slice/Shared/source/infrastructure planning rather than inventing a Domain owner.
3. Identify business concepts, identities, states, relationships, invariants and consistency boundaries.
4. Prefer [Template — Aggregate Domain owner](documentation-templates.md#template-aggregate-domain-owner) when several concepts share one consistency/invariant boundary; use [Template — Domain Object owner](documentation-templates.md#template-domain-object-owner) separately only when independent semantics/lifecycle/reuse/rule volume makes that clearer.
5. List BI identities the Domain owner directly implements; keep BI authority in Scenario.
6. Add `DI-*` only for durable requirements not already obvious from BI/invariants.
7. A `DI-*` may be derived from current correctness, concrete semantic ownership/consistency pressure, implementation quality or materially known `Evolution Impact` that should later be realizable through expansion/composition rather than avoidable Forced Migration.
8. Do not implement future behavior prematurely merely because its known impact justifies a boundary/identity/ownership requirement now.
9. Analyze each relevant Scenario-owned Evolution Step and maintain this owner's `Evolution Impact` using [Template — Evolution Impact](documentation-templates.md#template-evolution-impact) as future delta only: `Expansion`, useful behavior-preserving `Refactoring`, and exceptional `Forced Migration` where unavoidable/known.
10. If Impact analysis exposes avoidable future Forced Migration, reconsider current Domain boundaries and create/update the appropriate `DI-*`; do not duplicate that requirement in `Evolution Impact`.
11. Plan local Domain proof once semantics/invariants are selected. Aggregate tests normally prove implemented BI, material invariants and executable durable Domain requirements; use [Template — Test Item](documentation-templates.md#template-test-item) only for non-obvious proof quality.
12. When a credible executable proof boundary is known, write failing Domain proof before production implementation. Pure refactoring keeps relevant proof green.
13. Use `domain-evolution.md` only when one Evolution Step changes shared Domain meaning across several owners and one cross-owner view materially improves understanding.
14. When Domain/source investigation resolves or invalidates a Scenario Realization Dependency, update the Scenario-owned dependency with the Scenario-relevant conclusion. If the finding changes a required runtime algorithm/FI boundary, feed it back to Scenario design before finalizing Domain allocation.
15. After implementation, update current Domain truth and remove obsolete transition material only when compatibility is actually gone.

### Principles

- BI-first; Aggregate/consistency-boundary driven.
- `DI-*` is a durable architecture requirement, not a code trace.
- Good current implementation is checked against current BI/invariants **and** applicable DI requirements derived from materially known evolution.
- Known evolution may justify a seam now, not the future capability itself.
- Avoidable Forced Migration is architecture pressure to resolve rather than a preferred future plan.

### Owners used by this process

- Scenario owners as BI/Evolution Step authority;
- Aggregate/Domain Object owners;
- local Domain tests/test source as proof realization;
- `domain-evolution.md` only for materially useful cross-owner Domain transition views.

---

## DOC-UC-03 — Maintain Slice implementation from Behavior Items and Domain

### Goal

A developer can understand one Slice's application result, BI contribution, Domain dependencies, durable implementation requirements, local proof and future `Evolution Impact` without turning the Slice into a second Scenario or a code trace.

### Process

1. Maintain the Slice's current result/responsibility and list BI identities it realizes using [Template — Slice owner](documentation-templates.md#template-slice-owner) as the recommended focused form.
2. Inspect relevant Scenario Realization Dependencies before selecting orchestration/port boundaries. Consume the questions that concern runtime composition, external interaction, recovery or technical feasibility; do not silently convert Scenario candidates into selected Slice architecture.
3. Reference FI only when useful for behavioral context/navigation; do not require FI↔Slice 1:1 mapping.
4. List semantic Domain owners/capabilities used by the Slice; Domain remains authority for business rules it directly implements.
5. Add `SI-*` only for durable orchestration/composition/recovery/port/reuse/testability requirements that should survive ordinary refactoring.
6. A `SI-*` may be derived from current BI/Domain constraints, concrete implementation quality pressure or materially known `Evolution Impact` that should later be realizable through additive composition/ports rather than avoidable Forced Migration.
7. Do not prematurely implement the future capability itself just because a stable port/composition seam is useful now.
8. Maintain `Evolution Impact` for each relevant Evolution Step using [Template — Evolution Impact](documentation-templates.md#template-evolution-impact) as future Slice delta only: Expansion, useful Refactoring and exceptional Forced Migration.
9. If Impact analysis reveals avoidable Forced Migration, reconsider current Slice/shared boundaries and create/update the relevant `SI-*` or Shared Implementation Capability requirement; do not duplicate that requirement inside Impact.
10. Plan local Slice/application proof from the realized BI and Slice responsibility. Do not repeat exhaustive Domain proof at the Slice layer; prove that Slice orchestration actually uses Domain semantics at the correct application boundary.
11. Use [Template — Test Item](documentation-templates.md#template-test-item) only for non-obvious proof quality such as no-mutation, public-boundary, persistence observation, isolation or false-positive resistance.
12. When a credible executable boundary is known, write failing Slice/application proof before Slice implementation; keep proof green during behavior-preserving refactoring.
13. Keep method/service call chains, fields and adapter routing in source/generated traces rather than normative Slice docs.
14. If Slice/source investigation invalidates a Scenario feasibility assumption or exposes a materially better/different runtime interaction algorithm, feed the finding back to the Scenario owner before treating the Slice design as final.
15. After implemented evolution, fold resulting responsibility/requirements into current Slice truth.

### Principles

- Feature Interaction = behavioral decomposition; Slice = implementation decomposition.
- Existing Slices may grow internally through coherent modular expansion/composition without splitting merely because implementation size increases.
- A separate supporting Slice requires meaningful capability/result or recovery/composition ownership.
- `SI-*` may intentionally prepare known evolution through a port/boundary without implementing the future behavior.
- Local tests belong naturally with the Slice; a separate test owner is optional only when independent depth/reuse/review makes it clearer.

### Owners used by this process

- Scenario BI/Evolution Step authority;
- Slice owner / `slices.md` portfolio strategy;
- affected Domain owners;
- Shared Implementation Capabilities when real reuse appears;
- local test source/optional focused test owner.

---

## DOC-UC-04 — Maintain Shared Implementation Capability when shared responsibility is real

### Goal

Keep one real reusable implementation responsibility coherent across several Slices when independent shared ownership materially improves composition/reuse, without creating owners for generic principles or similar-looking helper code.

### Process

1. Use `slices.md` as the Slice portfolio/implementation strategy view and detect repeated responsibility/composition pressure across Slices.
2. Inspect Scenario Realization Dependencies routed to Shared Implementation. Treat candidate shared mechanisms as questions until real reusable responsibility/contract/consumers are selected.
3. Ask whether there is one semantic reusable implementation responsibility with a meaningful contract/consumer relationship, not merely a slogan such as DRY/logging or common helper shape.
4. If no independent shared responsibility exists, keep the requirement/mechanics local to consuming owners.
5. If it does exist, create/maintain a Shared Implementation Capability using [Template — Shared Implementation Capability owner](documentation-templates.md#template-shared-implementation-capability-owner): responsibility, consumers, Domain used, optional durable Implementation Items, local Tests/Test Items and `Evolution Impact` when relevant.
6. Shared Implementation Items may be justified by current correctness/quality or materially known evolution that should add consumers/implementations through stable composition rather than Forced Migration.
7. Have consuming Slices reference the shared owner instead of duplicating its durable contract/rules.
8. Feed resolved feasibility findings back to the Scenario dependency when they materially affect Scenario credibility or runtime composition; keep selected shared HOW authoritative here, not duplicated in Scenario.
9. Keep exact code/test mechanics in source or derived traces.

### Principles

- Reuse/cross-cutting is discovered from real responsibility, not from repeated names or generic engineering principles.
- `Cross-cutting` may describe a Shared Implementation Capability but is not a second owner type.
- `slices.md` owns portfolio/composition strategy; Shared Implementation Capability owns the actual reusable implementation responsibility.
- Shared owners do not own Evolution Steps; they own their local Evolution Impact.

---

## DOC-UC-05 — Maintain evolution-aware implementation architecture

### Goal

Use materially known Scenario evolution to shape Domain/Slice/shared implementation requirements now so future Evolution Steps can preferably be realized through Expansion, composition, stable ports/boundaries and behavior-preserving Refactoring rather than avoidable Forced Migration, without implementing speculative future behavior prematurely.

### Process

For the capability being designed or evolved:

1. Read current Scenario Process/FI/BI, relevant selected Screen meaning and material Scenario Realization Dependencies.
2. Read canonical relevant Evolution Steps from Scenario owners and their planning relationships from the Evolution Steps Map.
3. Treat `POSSIBLE` steps only as non-binding architecture pressure when they materially touch the same boundary; they do not license speculative implementation.
4. Derive `Evolution Impact` for each affected Domain/Slice/Screen/Shared Implementation Capability using [Template — Evolution Impact](documentation-templates.md#template-evolution-impact): what future Expansion/Refactoring/Forced Migration would occur in that owner if/when the step is realized.
5. Prefer an impact shape based on Expansion, composition, ports/adapters and stable boundaries. Refactoring may be planned when it preserves behavior and improves readability/cohesion/testability/evolution quality.
6. Treat Forced Migration as a warning that existing logic/authority/representation must be moved because the current structure cannot accept the evolution additively.
7. Ask whether a reasonable current boundary, port, identity/ownership rule, composition seam or shared capability can remove that avoidable future Forced Migration.
8. Express those durable current constraints as the natural owner's `DI-*`, `SI-*` or Shared Implementation Item. **Do not repeat Requirement/Reason inside Evolution Impact.**
9. Design/assess current implementation against both current selected meaning and these applicable Implementation Items. An implementation that satisfies today's BI but knowingly violates an evolution-enabling SI/DI and creates avoidable Forced Migration is not the preferred realization.
10. Do not implement the future behavior/capability itself before its Evolution Step is selected for realization merely because its impact influenced today's architecture.
11. Keep `domain-evolution.md` only for one materially shared Domain semantic transition across owners; keep `slices.md` for Slice portfolio/composition strategy rather than turning either into a roadmap.
12. When implementation later begins, expected Impact should mostly be additive Expansion plus useful Refactoring. Unexpected Forced Migration is a planning/realization finding: re-check whether Impact analysis was incomplete, a known Implementation Item was violated, or genuinely new constraints appeared.
13. If implementation investigation invalidates a material Scenario Realization Dependency or shows a substantially better runtime interaction algorithm, feed that finding back to Scenario design. Prefer local refinement, but revise affected FI composition/process when the evidence requires it.
14. Record exact mechanics in source, not normative architecture documentation.

### Principles

- Evolution Step = WHAT application behavior changes.
- Evolution Impact = WHAT future delta happens in a lower owner.
- Implementation Item = HOW the current owner must be shaped for current correctness/quality and materially known evolution.
- Evolution Steps Map = WHEN / likelihood / dependency / readiness planning.
- Design for additive evolution; do not design speculative future systems.
- Future Refactoring is normal when behavior-preserving and useful. Forced Migration is the exceptional pressure to minimize.

The maintained trace is:

```text
Scenario Evolution Step
→ lower-owner Evolution Impact analysis
→ current DI / SI / Shared Implementation Items where pressure is durable
→ current implementation constrained by those items
→ later Expansion / Refactoring / exceptional Forced Migration
```

---

## DOC-UC-06 — Inspect current implementation without duplicating source documentation

### Goal

Make current implementation easy to inspect while keeping normative documentation stable across ordinary refactoring.

### Process

1. Treat production source and test source as authority for exact implementation/test mechanics.
2. Do not copy method/service call chains, field usage, current class wiring or test-method/fixture call structure into Scenario/Domain/Slice owners merely to make implementation easier to inspect.
3. When a Scenario Realization Dependency explicitly requires source/technical feasibility investigation, inspect only enough current mechanics/environment capability to answer that question; do not copy the resulting call graph into Scenario authority.
4. When low-level implementation understanding is needed, inspect source directly or use the [Recommended generated implementation-trace output](documentation-templates.md#template-generated-implementation-trace) if tooling is available.
5. A generated trace should be disposable, derived from source and tied to its source revision. Useful generated information may include root symbol, callers/callees, fields read/written, referenced types, external boundaries and branch/result information when statically derivable with confidence.
6. Generated/source inspection may answer how current code realizes a selected Feature Interaction, BI or Slice, but it never becomes authority for Scenario behavior, UI requirements, Domain invariants or architecture intent.
7. Store generated traces at a fixed discoverable path when tooling is introduced; `generated/implementation-traces/` under this application documentation root is recommended.
8. Regenerate rather than manually edit a stale trace.

### Current boundary

No implementation-trace generator is established by this documentation model. This use case defines the boundary so future tooling can improve implementation discoverability without forcing manually maintained runtime/call-flow prose into durable owners.

---

## DOC-UC-07 — Explore and select Scenario and Screen design

### Goal

Start from an application Benefit / desired result, discover a coherent Scenario as a composition of Feature Interactions, explore enough FI runtime behavior to validate those boundaries, and co-design spatial/UI realization before treating the result as authoritative Scenario/Screen truth or selected evolution.

### Process

1. Start from the application Benefit / desired final Result; read current truth/Evolution Steps when the Scenario already exists.
2. Sketch a small candidate Scenario Process / FI map first. For each candidate FI, state only enough Scenario Role / Local Purpose and local Result to make the proposed boundary understandable.
3. For uncertain/non-obvious FIs, sketch the internal Interaction Process far enough to test whether the FI can actually realize its role and whether the proposed boundary is coherent. Use [Template — Feature Interaction Variant analysis](documentation-templates.md#template-feature-interaction-variant-analysis) when materially different local realizations are worth comparing.
4. Discover candidate BI/constraints exposed by that process exploration. Ask whether they reveal a missing FI, an unnecessary FI, two interactions that should be composed, one interaction that should be split, a wrong transition/contract or a better Scenario composition.
5. Ask what material implementation capabilities the candidate Scenario implicitly assumes. Record a Scenario Realization Dependency when an unresolved HOW question can decide whether a central FI/process is actually viable.
6. Where needed, descend temporarily into source/infrastructure/API/prototype investigation only far enough to establish credible feasibility or expose a real constraint. Return the finding to Scenario design rather than promoting the investigative mechanism directly into Scenario behavior authority.
7. Revise the FI map and repeat the FI-process/BI/feasibility exploration until the high-level Scenario behavior is coherent. Do **not** require full Context/Inputs/Outcomes/BI detail for every candidate FI while the composition itself is still moving.
8. Compare materially different complete compositions with [Template — Scenario Process Variant](documentation-templates.md#template-scenario-process-variant): initial context/inputs where material, FI composition/contracts and final Result/Outputs.
9. In parallel, explore candidate **Screen Set Variants** (overall window/screen topology) and **individual Screen Variants** (different realization of one Screen responsibility) with [Template — Screen Set / Screen Variant analysis](documentation-templates.md#template-screen-variant-analysis).
10. Map candidate Scenario/FI behavior to Screens: Scenario×Screen, FI×Screen, routes, visible/input/action state and material Screen-owned requirements. A Scenario may span multiple Screens/Windows; Screen topology does not define Scenario identity by itself.
11. Treat design exploration as bidirectional. If Screen design exposes hidden manual context transfer, weak FI outputs, missing recovery/uncertainty, poor composition or misplaced complexity, revise Scenario/FI design rather than forcing the Screen to hide the problem.
12. Compare interaction and Screen boundaries explicitly: control/recovery points, transferred context/outputs, user work, visibility/feedback, navigation/window topology, implementation/testing/evolution complexity.
13. Record Strengths, Problems, Complexity, Risks and Questions only when they materially explain a decision; no scoring framework is required.
14. Mental/visual/clickable/interactive walkthrough is optional design media. The documentation model must remain complete without a Scenario simulator/tool.
15. Select/refine preferred design, then classify it correctly:
    - accepted/implemented behavior → current Scenario/Screen truth;
    - selected coherent unimplemented behavior → Scenario-owned Evolution Step;
    - plausible non-binding evolution → `POSSIBLE` only when worth preserving;
    - complete future application benefit/behavior → planned future Scenario;
    - candidate/rejected alternative → not current truth/Evolution by default.
16. Hand selected Scenario behavior to DOC-UC-01 and selected Screen realization to DOC-UC-11.

### Principles

- Scenario design is not waterfall: Benefit ↔ FI composition ↔ FI Interaction Process ↔ BI discovery ↔ material implementation feasibility are iterated until boundaries are coherent.
- Prefer monotonic refinement and avoid reopening upstream decisions without evidence; implementation discovery may still require Scenario/FI/process revision when real constraints invalidate assumptions or reveal a materially better runtime algorithm.
- Do not finalize FI decomposition before enough runtime behavior and material feasibility are understood to judge the boundaries.
- Do not fully specify every candidate FI before the high-level composition is stable enough to justify that detail.
- Scenario behavior authority and Screen spatial authority remain distinct even while designed together.
- Candidate Screen/Scenario variants are design alternatives, not runtime branches or roadmap entries by default.
- A Screen is not a frontend Slice; FI/Slice/Screen mappings are many-to-many when justified.
- Preserve alternatives only when their rationale remains material to an active decision.

---

<a id="doc-uc-evolution-steps-map"></a>
## DOC-UC-08 — Plan Evolution Steps and material impact timing

### Goal

Make evolution sequence, dependencies, rough timing/likelihood and readiness understandable without encoding roadmap position into semantic identity or duplicating behavioral/local-impact definitions.

### Process

1. Read canonical Scenario-owned Evolution Steps. Step `Intent` (`URGENT`/`PLANNED`/`POSSIBLE`) may remain on the step; use the map for relational planning rather than redefining intent.
2. Maintain [`evolution-steps-map.md`](evolution-steps-map.md) using [Template — Evolution Steps Map entry](documentation-templates.md#template-evolution-steps-map-entry), with only planning information that matters:
   - prerequisites/dependencies;
   - intended relative order and rough horizon;
   - rough likelihood/planning confidence when useful;
   - what the step enables;
   - parallelism;
   - conditions/gates;
   - implementation readiness when useful;
   - planned future Scenario target.
3. Link to canonical Scenario-owned steps for WHAT behavior changes.
4. When one lower-owner `Evolution Impact` item has materially different timing/likelihood/dependency from its parent step, the map may reference that impact explicitly. Keep WHAT that impact changes in the lower owner.
5. Reorder/replan freely without changing semantic IDs/names.
6. Completed nodes need not remain active merely for history when current owners communicate resulting truth.

### Principles

- Map = WHEN / HOW LIKELY / DEPENDS ON / READY, not WHAT behavior or implementation changes.
- Evolution Step identity and lower-owner impact meaning remain outside the map.
- Sequence may be linear, branching, conditional or parallel.
- Do not turn the map into detailed implementation scheduling or a duplicate architecture backlog.

### Owners used by this process

- Scenario owners as canonical Evolution Step authority;
- lower owners as canonical Evolution Impact authority;
- `evolution-steps-map.md` as the dedicated planning map.

---

<a id="doc-uc-semantic-readability"></a>
## DOC-UC-09 — Communicate documentation meaning clearly

### Goal

Make durable documentation easy to scan and accurately understand without simplifying away conditions, exceptions, boundaries or rationale.

### Process

For any normative owner being written or revised:

1. Identify the main semantic claim of each block before formatting it.
2. Keep one connected idea as prose when prose communicates it best.
3. When a block contains several independently meaningful facts, conditions, exceptions or consequences, use bullets/sub-bullets or another explicit structure so the reader does not have to reconstruct them from a dense paragraph.
4. Make meaningful contrasts explicit when useful, for example:
   - current vs planned future;
   - before vs after a semantic boundary;
   - success vs known failure vs uncertainty;
   - Result vs Outputs;
   - runtime branch vs design alternative;
   - Evolution Step vs lower-owner change required by that step.
5. Use Process Maps/tables only when they reveal structure better than prose; do not use formatting for decoration.
6. Re-read the structured version against the source meaning and verify that no condition, exception, reason, authority boundary or outcome disappeared during rewriting.
7. Give Scenario, Feature Interaction, BI, UI/Screen requirement, Evolution Step, Evolution Impact, Slice, Aggregate/Object, Shared Implementation Capability, Test Item and other durable entities intuitive readable names.
8. Use technical IDs only as stable reference aids:
   - pair them with readable names;
   - prefer semantic IDs where practical;
   - avoid arbitrary ordinal numbering that implies false ordering/architecture.
9. Apply the same rules to templates: examples should demonstrate meaningful names and readable information structure.

### Principles

- Optimize for **semantic readability without semantic compression**.
- Shorter is not better when it removes a condition needed to recover the actual meaning.
- More bullets are not better when one coherent paragraph is clearer.
- A reader should not need implementation knowledge to decode a behavioral name.
- A technical identifier is navigation, not meaning.

### Owners used by this process

- every normative documentation owner being authored/revised;
- [`documentation-templates.md`](documentation-templates.md) as the recommended presentation examples.

---

<a id="doc-uc-documentation-ownership"></a>
## DOC-UC-10 — Maintain use-case-driven documentation ownership

### Goal

Prevent orphan documentation files/sections whose purpose, maintenance process or authority is unclear by ensuring every durable documentation owner has explicit **use-case coverage**. Documentation-process artifacts are justified by Documentation Use Cases; application semantic/contract/proof owners may be justified by the application Scenario, Slice, testing or acceptance process that needs their information.

### Process

1. Before creating or retaining a durable documentation file/owner, identify the explicit use case/process that creates, maintains or consumes it.
2. Classify the coverage correctly:
   - **documentation-process artifact** (for example templates, terminology/principles, Evolution Steps Map, generated documentation tooling/output) → an explicit Documentation Use Case must justify it;
   - **application semantic/contract/proof owner** (for example focused protocol, Scenario/Slice/Screen/shared support contract, testing plan, Shared Test Capability or manual acceptance evidence owner) → the application Scenario, Slice, testing or acceptance process that requires the information may justify it without inventing an artificial Documentation Use Case.
3. Ask whether the information can remain inside its natural existing owner without losing clarity.
4. Create a separate focused owner only when:
   - explicit use-case/process coverage exists;
   - independent/shared complexity makes separate ownership clearer;
   - authority and maintenance responsibility can be stated without duplicating another owner.
5. Keep small shared terms/principles inside `documentation-use-cases.md` when several Documentation Use Cases need them and no independent owner is justified.
6. Keep templates because concrete Documentation Use Cases link to/use them at specific process steps; do not grow a passive template catalog disconnected from use.
7. For every durable owner, be able to answer:
   - which use case/process needs this owner?
   - if it is a documentation-process artifact, which Documentation Use Case owns that process?
   - what information is authoritative here?
   - what information is only referenced/derived?
   - when is this owner updated?
8. When an owner no longer has use-case/process coverage or its information becomes fully natural in another owner, merge/retire it rather than preserving ceremony.
9. During documentation-model changes, audit newly introduced and materially retained owners for use-case coverage before package completion.

### Principles

- No orphan documentation owner.
- **Use-case coverage does not mean Documentation Use Case for every file.** Documentation-process artifacts require DOC-UC coverage; application semantic/contract/proof owners may be covered by the application/testing/acceptance process they serve.
- A useful fact does not automatically justify a useful file.
- Terms and principles are not separate owner types by default; they live where the Documentation Use Cases that use them are defined.
- Navigation/index files are valid when discoverability itself is required by a use case/process, but they must not become competing semantic authority.

### Owners used by this process

- `documentation-use-cases.md` as documentation-process authority;
- `documentation-templates.md` as process-used recommended forms;
- README/catalog/map and other documentation-process owners only when a concrete Documentation Use Case justifies them;
- focused application semantic/contract/proof owners only when the application Scenario/Slice/testing/acceptance process they serve gives them explicit use-case coverage.

---

## DOC-UC-11 — Maintain selected Screen model

### Goal

Maintain one canonical selected spatial/window model that explains where Scenario behavior is realized without moving Scenario behavior authority into Screens or turning Screens into frontend Slices.

### Process

1. Start from selected Scenario FI composition, FI Interaction Processes and intentional UI requirements; use DOC-UC-07 when Screen topology/realization is still being explored.
2. Maintain one `Screen Map` by default using [Template — Screen owner](documentation-templates.md#template-screen-owner), including Screen inventory, Scenario×Screen relationships, FI×Screen relationships, routes/transitions and material global Screen constraints.
3. For each Screen record purpose, Scenario roles, participating FIs, meaningful visible/input/action states, material spatial hierarchy/constraints and routes.
4. Maintain Screen Behavior Items using [Template — UI / Screen requirement forms](documentation-templates.md#template-ui-requirement) only for durable spatial/window/UI behavior whose canonical meaning belongs to the Screen. Keep FI/component-local UI Requirements in Scenario/FI owners and core application BI in Scenario.
5. Reference Scenario/FI identities rather than copying their behavioral definitions. The Scenario Process must remain observably understandable even when Screen details are referenced.
6. Keep selected Screen truth separate from candidate Screen Set/Screen variants. Preserve rejected/candidate variants only when their rationale remains material.
7. Maintain Screen `Evolution Impact` with [Template — Evolution Impact](documentation-templates.md#template-evolution-impact) when a Scenario-owned Evolution Step adds/removes Screens, changes routes, moves realization between Screens or changes Screen-owned requirements. Do not create Screen-owned Evolution Steps.
8. Keep one `screens.md` owner by default when a selected model actually exists. Split independent Screen files only when size/review/reuse makes separate ownership materially clearer.

### Principles

- Scenario = selected FI composition that realizes an application Benefit / desired result; Screen = spatial/window meaning; frontend Slice/code = realization mechanism.
- Placement normally does not become BI identity.
- One Screen may use many Slices and one Slice may realize behavior across many Screens.
- Do not create an empty Screen owner merely because the methodology supports one.

---

## DOC-UC-12 — Plan and realize credible proof

### Goal

Derive credible proof from selected semantic/implementation meaning, make test-first realization the default when a credible executable boundary is known, and separate local proof, shared Test Strategy, reusable Shared Test Capabilities and Practical Evidence without making tests a second behavior authority.

### Process

1. Start from the owning semantic/implementation requirement: BI, invariant, Screen/UI requirement, DI/SI/shared item or focused contract. Tests prove selected meaning; they do not create it.
2. Choose the cheapest credible proof layer. Keep exhaustive Domain matrices at Domain level; Slice/application tests prove orchestration/use of Domain at the correct public boundary; use critical E2E only when lower layers cannot establish the integrated property.
3. Keep local Tests with the natural Aggregate/Slice/Shared Implementation Capability owner by default. A separate test owner/file is optional only when independent depth/reuse/review warrants it; then explicitly reference parent owner and properties proved.
4. Add a [Template — Test Item](documentation-templates.md#template-test-item) only when proof needs non-obvious durable quality requirements such as no-mutation observation, public-boundary execution, persisted-state observation, false-positive resistance, isolation, failure injection or refactor/evolution resilience.
5. When selected meaning and a credible executable proof boundary are known, use test-first production realization: failing proof → implementation → green → behavior-preserving refactor.
6. Pure refactoring keeps relevant proof green; do not create artificial Red. For Forced Migration, strengthen/preserve proof of unchanged behavior and add failing proof only for genuinely new/changed meaning.
7. If the question “how can this property be proved convincingly?” is independently non-trivial, use [Template — Optional Test Design](documentation-templates.md#template-test-design). Embed it locally by default; create a separate artifact only when independently substantial.
8. If technical/interaction/proof feasibility is genuinely unknown, use an experiment/prototype/spike to learn, then return to normal test-first production realization. Experimental code is not accepted only because it works.
9. Maintain `testing-plan.md` as shared Test Strategy only for real cross-owner pressure: proof-layer allocation/non-duplication, shared environment/isolation, critical E2E or Practical Acceptance boundaries. During migration it may temporarily retain current Slice→proof mapping until local owners are reconciled.
10. Create a Shared Test Capability using [Template — Shared Test Capability](documentation-templates.md#template-shared-test-capability) only for real reusable test machinery/behavior consumed by several suites; common testing policy stays in Test Strategy.
11. For real Windows/Swing/Edge/ChatGPT/usability/environment properties that require an implemented subject, use [Template — Practical Acceptance plan and Evidence](documentation-templates.md#template-practical-acceptance): plan Practical Acceptance before implementation when useful, then execute after realization and record Evidence. Planned verification is not executed Evidence.
12. Keep exact test classes/methods/fixtures in test source; documentation owns only durable proof meaning/strategy/items where useful.

### Principles

- Test-first is default when selected meaning + credible executable boundary are known.
- Tests prove meaning; they do not become semantic authority.
- Test Item = proof-quality requirement, not production architecture requirement.
- Test Strategy = shared proof policy; Shared Test Capability = reusable test implementation responsibility.
- More tests do not automatically mean stronger proof; avoid duplication and false confidence.

---

## Template use

Recommended owner/entry forms are collected in [`documentation-templates.md`](documentation-templates.md).

Templates are starting forms, not schemas. Use the smallest structure that preserves required meaning; omit, combine, rename, reorder or add sections when the concrete owner is clearer that way.

Unlike a passive template catalog, Documentation Use Cases link directly to relevant forms at the process step where they are needed. DOC-UC-09 additionally governs readable presentation of the information inside those forms.

---

## Integration rule for existing Replacement Package App documentation

Adoption is incremental. This documentation-model update defines target process/ownership before rewriting current Scenario/Screen/Domain/Slice/testing owners.

A following integration should:

1. reconcile each Scenario's accepted application Benefit / desired result and build complete Process Specifications;
2. establish the selected FI composition, then deepen each FI Interaction Process and derive/confirm BI and FI/component-local UI Requirements;
3. use iterative FI composition ↔ Interaction Process ↔ BI ↔ material realization-feasibility exploration together with Screen Set/Screen variants before freezing selected behavioral/spatial realization;
4. add Scenario `Realization Dependencies / Questions / Candidates` wherever an implementation assumption/question materially affects Scenario plausibility, FI boundaries or runtime process; perform only enough technical investigation to make the behavior credible;
5. create a selected `screens.md` only when real Screen planning exists; maintain Scenario×Screen/FI×Screen/routes and Screen-owned requirements there;
6. migrate known selected/plausible application changes into Scenario-owned semantically named Evolution Steps and create planned future Scenario owners where clearer;
7. populate the Evolution Steps Map with sequence/dependencies/rough horizon/likelihood/readiness after canonical steps exist;
8. perform Domain discovery from BI and inspect Scenario Realization Dependencies routed to Domain; add DI only when a durable Domain HOW is actually selected for current correctness/quality or materially known evolution pressure;
9. analyze lower-owner Evolution Impact as future delta (`Expansion` / `Refactoring` / exceptional `Forced Migration`) without duplicating DI/SI/shared requirements there;
10. verify current implementation plans against applicable evolution-enabling Implementation Items so known planned evolution is preferably additive/compositional;
11. map Slices to realized BI and Domain, explicitly consuming relevant Scenario Realization Dependencies; use `slices.md` as portfolio/composition strategy and create Shared Implementation Capability owners only when real reusable responsibility is discovered;
12. inspect Realization Dependencies routed to Shared Implementation/source/infrastructure and select durable shared HOW only when a real reusable responsibility/contract is proven;
13. feed material implementation discoveries back to the owning Scenario when they invalidate a feasibility assumption or require a different FI/runtime process; prefer local monotonic refinement, but do not preserve a broken Scenario merely to avoid revisiting an earlier planning layer;
14. attach local Tests/Test Items to Aggregate/Slice/shared owners as those owners are migrated; use test-first production realization when selected meaning and credible executable proof are known;
15. retain `testing-plan.md` current Slice→proof information until local proof ownership is actually reconciled, then reduce it toward genuinely shared Test Strategy; create Shared Test Capabilities only for real reusable machinery;
16. separate Practical Acceptance plans from executed Evidence without claiming PASS for unexecuted checks;
17. keep `domain-evolution.md` only for materially useful cross-owner Domain semantic transitions;
18. keep source/test mechanics out of normative docs and generated traces derived/non-authoritative;
19. preserve semantic naming/readability/no-orphan rules and explicit use-case/process coverage;
20. keep unaffected current documentation unchanged until its actual migration is performed.

This methodology update does **not** itself claim that existing Scenario, Screen, Slice, Domain, testing or acceptance owners have already been migrated to these target forms.
