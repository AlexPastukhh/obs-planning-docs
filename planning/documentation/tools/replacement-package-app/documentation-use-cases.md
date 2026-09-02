# Replacement Package App — Documentation Use Cases

Status: active documentation-maintenance owner
Scope: how Replacement Package App documentation designs and preserves Scenario behavior, discovers Domain meaning, describes Slice implementation requirements, stays evolution-aware and keeps source-level implementation evidence derived rather than manually duplicated.

## Purpose

Documentation must make these layers understandable without turning any one layer into a duplicate of another:

1. what accepted user/application behavior is true now;
2. how a Scenario is behaviorally designed, including meaningful alternatives and composition trade-offs;
3. what known application behavior may change or expand through Scenario-owned Application Evolution Steps;
4. when selected Application Evolution Steps are planned to happen and which steps depend on or enable others;
5. which Behavior Items express durable application/business guarantees of selected Scenario behavior;
6. which UI Requirements intentionally constrain presentation/interaction without being confused with business behavior;
7. which Domain owners directly implement the business rules and how those owners must change to realize selected Application Evolution Steps;
8. which Slices realize Scenario behavior and how their implementation/composition must change to realize selected Application Evolution Steps;
9. which durable implementation/architecture requirements matter beyond behavior itself;
10. how to inspect current source implementation without manually maintaining code-level call traces in normative documentation;
11. how to keep documentation readable, intuitively named and structurally clear without losing meaning;
12. why every durable documentation owner exists and which explicit use case/process creates, maintains or consumes it.

The main semantic flow is:

```text
Scenario Goal
→ Scenario Process Specification
→ Feature Interactions
   ├─ Behavior Items + Reasons
   └─ UI Requirements
→ Domain discovery and Domain owners
→ optional Domain Implementation Items
→ Slice / optional cross-cutting capability
→ optional Slice Implementation Items
→ code / tests
```

Application evolution is deliberately split by responsibility:

```text
Scenario owner
→ Application Evolution Step
→ WHAT application behavior changes

Evolution Steps Map
→ sequence / dependency / parallelism / planned timing
→ WHEN and in what order selected steps are intended to happen

Domain / Slice / Cross-cutting owners
→ Changes by Application Evolution Step
→ HOW each implementation/semantic owner must change to realize that step
```

Design exploration precedes authoritative Scenario maintenance when behavior is not yet selected:

```text
Scenario Goal
→ candidate Scenario Process Variants
→ candidate Feature Interaction Variants
→ compare contracts / composition / complexity
→ select or refine behavioral design
→ current Scenario truth OR Scenario-owned Application Evolution Step OR retained/rejected alternative
```

This owner defines the documentation work itself. It does not replace Scenario owners, the Evolution Steps Map, Domain owners, `slices.md`, focused contracts, source or tests.

## Minimal shared terms

These terms stay here because several Documentation Use Cases require the same meanings. They do not justify a separate terminology file by themselves.

### Current truth

Behavior or architecture that is already accepted as implemented.

Current Scenario prose describes current user/application behavior. Current Domain/Slice prose describes current semantic responsibility and durable architecture constraints, not a manually maintained copy of source structure.

### Scenario Process Specification

The complete behavioral specification of one Scenario.

It makes meaningful behavior visible directly: context/inputs, Feature Interactions, observable application behavior, outcomes, branches, loops, retries, validation/error/uncertain paths, Results, Outputs, transitions and terminal outcomes.

A Process Specification is not merely a short overview whose missing semantics appear only later in Behavior Items. Behavior Items and UI Requirements formalize requirements already visible in the process; they do not become a second hidden source of Scenario behavior.

A compact Process Map may show topology while detailed Feature Interaction entries carry the full local behavior. These are two views of the same specification.

### Feature Interaction

A Scenario-local selected behavioral way to achieve one local meaningful result from particular context and inputs through observable application behavior, producing a Result and Outputs that may affect subsequent Scenario behavior.

A Feature Interaction may be user-triggered, automatically continued by the application, externally driven, or a combination. It does not imply one button, one class or one Slice.

The important parts are:

- **Goal** — what local meaningful result is sought;
- **Scenario Role** — why this interaction exists at this point in the Scenario and what it enables/prepares for later behavior;
- **Context / Preconditions** — already-established state relevant to the interaction;
- **Required Inputs** — information/artifacts/actions actually consumed by the interaction;
- **Interaction Process** — observable user/application behavior;
- **Outcomes** — meaningful success/error/validation/uncertain results;
- **Result** — meaningful application/user-world truth established by an outcome;
- **Outputs** — information/artifacts/identity/state produced for later consumption;
- **Next Interactions** — transitions, loops or termination enabled by outcomes.

`Goal`, `Scenario Role` and `Why This Interaction Design` are different questions. Goal says what is needed locally. Scenario Role explains why the interaction is needed in this Scenario composition. Design rationale explains why this particular input/process/result/output form was selected.

### Feature Interaction Variant

An alternative behavioral design for a local Feature Interaction goal.

Variants may require fewer, more or different inputs; use different context; require different user actions; produce different-strength Results/Outputs; move control points; or remove the need for a later interaction. Variants are not required to preserve the same input/output contract.

### Scenario Process Variant

An alternative composition of Feature Interactions for achieving the same Scenario Goal.

A Process Variant may add/remove interactions, compose several into one, split one into several, replace one interaction with another, change initial inputs, change contracts between interactions or produce different final outputs.

### Runtime branch and design alternative

A **runtime branch** is behavior actually available in the selected/current Scenario.

A **design alternative** is a candidate/rejected/possible way the Scenario or Feature Interaction could have been designed while choosing behavior.

Do not represent a rejected alternative as a current runtime branch. Considering an alternative does not automatically create an Application Evolution Step.

### Behavior Item

A Behavior Item is one atomic **business/application behavioral requirement** of a Scenario.

It answers:

> What must the application do, or what must remain true, for this Scenario behavior to be correct?

A Behavior Item deliberately does **not** prescribe one implementation mechanism. It should remain valid across ordinary refactoring and across multiple possible implementations of the same behavior.

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

The `Reason` may explain a Scenario/Feature Interaction goal, later behavior that depends on the rule, a semantic boundary, recovery/uncertainty correctness, or a concrete bug/class of bugs the rule prevents. Do not invent a bug-prevention rationale when the rule is simply fundamental to the Scenario.

Behavior Items are the primary input for Domain discovery. The authoritative BI text stays in the Scenario; lower owners reference the same BI identity instead of rewriting it.

A BI normally sits under the Feature Interaction where its behavioral need is clearest. If one BI constrains the boundary between multiple Feature Interactions, keep one authoritative `Requirement + Reason` definition and reference that same BI identity from every relevant interaction instead of creating rewritten copies.

### UI Requirement

An intentional requirement about how Scenario behavior is presented or controlled through UI.

UI Requirements are a separate requirement class from Behavior Items:

```text
Scenario Requirements
├─ Behavior Items
└─ UI Requirements
```

A UI Requirement may be:

- Feature Interaction-local;
- component-local inside a Feature Interaction;
- screen-level when no single Feature Interaction honestly owns it.

Do not turn accidental current layout into normative documentation. A current button position, pixel value or visual detail is not a durable UI Requirement merely because it exists. Record intentional presentation/interaction constraints worth preserving across implementation change.

### Strengths, Problems, Complexity, Risks and Questions

These are design-analysis concepts, not a mandatory scoring taxonomy.

- **Strength** — what a design does especially well.
- **Problem** — a known undesirable property/trade-off already inherent in the design.
- **Complexity** — neutral degree of complication introduced by the design; not automatically negative.
- **Risk** — a potential/conditional future problem.
- **Question** — an unresolved point requiring decision, research, experiment, prototype or evidence.

Useful complexity dimensions when material include user interaction, Scenario/process, Feature Interaction behavioral, implementation, recovery, testing and evolution complexity.

A key design question is not merely “which variant has less complexity?” but “where does this variant place complexity, and is that the right place for this Scenario?”

### Application Evolution Step

An Application Evolution Step is one coherent **change in application behavior** owned canonically by a Scenario.

It answers **what changes** for the application/user process. It may describe, for example:

- adding/removing/replacing/composing/splitting Feature Interactions;
- changing interaction contracts, branches or outcomes;
- adding/changing/removing Behavior Items;
- adding/changing/removing UI Requirements;
- extending the Scenario with new behavior;
- replacing the current Scenario with a separately documented planned future Scenario when the change is too broad to remain understandable as a local delta.

The canonical step does **not** describe how Domain or Slice implementation is changed. Those implementation/semantic consequences belong to `Changes by Application Evolution Step` in the affected lower owners.

Each step has one canonical Scenario owner. If it affects several Scenarios, choose the Scenario where the user/application behavioral change is most naturally authoritative; other Scenario owners reference the same step instead of copying its definition.

Use a stable **semantic** ID/name rather than an ordinal that pretends to define roadmap order. For example:

```text
EVO-RPKG-GIT-DERIVED-CURRENT-CHANGE — Derive Current Change from Git revision boundaries
```

Avoid IDs such as `EVO-RPKG-001` when `001` has no meaning beyond current list position.

A step may carry intent such as `URGENT`, `PLANNED` or `POSSIBLE` when that distinction is useful:

- **URGENT** — selected change requiring near-term attention;
- **PLANNED** — selected future change/extension;
- **POSSIBLE** — useful plausible evolution, explicitly non-binding.

Intent does not own exact sequence. The Evolution Steps Map owns sequencing and dependencies.

When a step is accepted as implemented, resulting behavior becomes current Scenario truth. The step need not remain as an active future item; keep historical rationale only when it still helps explain current meaning.

### Planned future Scenario

A future independently meaningful user-world Scenario may be documented as a full Scenario owner before it is current.

Use the same Scenario form with a clear status such as `planned future Scenario owner`. Do not hide a complete future Scenario inside another Scenario's Evolution Step.

A current Scenario's Application Evolution Step may link `Replacement Scenario` when planned change is so broad that a separate full future Scenario communicates the target meaning better than a large local delta.

### Evolution Steps Map

[`evolution-steps-map.md`](evolution-steps-map.md) is the planning owner for **when and in what dependency/order selected Application Evolution Steps should happen**.

It may show:

- planned sequence;
- dependencies/prerequisites;
- what a step enables;
- parallelizable steps;
- conditional/optional branches;
- planned future Scenarios reached/replaced by steps.

It references canonical Scenario-owned Evolution Steps and does not redefine their behavioral content.

The map owns order; Evolution Step IDs do not.

### Changes by Application Evolution Step

A Domain, Slice or Cross-cutting Capability does **not** own Application Evolution Steps.

When an application step affects that owner, use a section named `Changes by Application Evolution Step` (or an equally clear equivalent) to describe **how this owner must change to realize the Scenario-owned step**.

Typical content includes:

- link/reference to the canonical Application Evolution Step;
- Domain semantic/invariant/authority change, or Slice/cross-cutting responsibility/composition change;
- affected `DI-*` / `SI-*` items when useful;
- local architecture decision when material;
- compatibility/transitional implementation rule when it genuinely matters.

### Domain Implementation Item

A Domain Implementation Item (`DI-*`) is an optional durable requirement about how a Domain owner must be shaped so that it can implement its Behavior Items correctly and evolve safely.

It may be derived from one or more BI, a Domain invariant/consistency boundary, an Application Evolution Step, concrete architecture pressure or a specific composition/DRY requirement where duplicate domain semantics would create divergence.

A Domain owner may need no `DI-*` items at all. A good `DI-*` survives ordinary refactoring and does not describe Java methods, field layout, class call sequences or current helper structure.

### Slice Implementation Item

A Slice Implementation Item (`SI-*`) is an optional durable requirement about how a Slice realizes its Behavior Items using the available Domain and infrastructure.

It may cover stable orchestration/separation/recovery/composition requirements or an Application Evolution Step that requires Slice architecture to change without changing the underlying BI.

A good `SI-*` survives ordinary refactoring. Do not use it as a manually maintained method/service trace.

### Cross-cutting Capability

A Cross-cutting Capability is an optional owner for one real shared implementation responsibility that spans several Slices and needs the same kind of implementation/change documentation as a Slice.

Do not create one merely because several owners share a general engineering principle.

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
- Candidate/rejected design alternatives do not become current truth, Application Evolution Steps or architecture requirements automatically.
- Optimize prose for **semantic readability without semantic loss**, not for the fewest lines:
  - one connected idea may remain prose;
  - several independent facts, conditions, exceptions or consequences should be exposed as bullets/sub-bullets or another clear structure;
  - branches, outcomes, contracts, before/after and current/future contrasts should be visually explicit when that makes meaning easier to recover;
  - never delete a condition merely to make the document shorter;
  - do not turn every sentence into a list when prose carries one coherent thought better.
- Give every durable documentation entity an intuitive human-readable name. A technical ID may help stable references but must not substitute for meaning.
- Do not encode arbitrary display order in entity identity. Numeric suffixes such as `01`, `02`, `03` should not imply Scenario/Slice/FI/BI/EVO ordering unless the number has independent stable meaning. The Evolution Steps Map owns roadmap order.

`domain-evolution.md` is a cross-owner view of Domain changes caused by Scenario-owned Application Evolution Steps. It is not the primary Domain model and does not own the Application Evolution Steps themselves.

---

## DOC-UC-01 — Maintain Scenario behavioral specification and application evolution

### Goal

A reader can open one current Scenario and understand its user goal, complete current behavioral process, meaningful Feature Interactions, core Behavior Items, intentional UI Requirements and known Scenario-owned application evolution without needing implementation details to understand what the application does or what is expected to change.

### Process

1. Verify accepted current behavior from Scenario documentation, source/tests and accepted implementation state.
2. Maintain the Scenario `User Goal` using [Template — Scenario owner](documentation-templates.md#template-scenario-owner).
3. Maintain a complete `Process Specification`; use its `Process Map` when useful for topology, but keep all meaningful current behavior visible in the specification rather than hiding it only in requirements.
4. Describe each meaningful interaction using [Template — Feature Interaction entry](documentation-templates.md#template-feature-interaction-entry): Goal, Scenario Role, Context/Preconditions, Required Inputs, observable Process, Outcomes, Result, Outputs and Next Interactions.
5. Keep runtime branches, loops, retries, correction, validation/error behavior, meaningful failures and uncertainty explicit. A failure/outcome remains inside the same Feature Interaction when the local goal has not changed.
6. Persist core requirements as stable Behavior Items under the Feature Interaction where their need is visible. For each BI, write implementation-independent `Requirement + Reason`; use readable semantic names/IDs rather than positional numbering when creating new identities.
7. Maintain intentional UI Requirements separately from BI using [Template — UI Requirement forms](documentation-templates.md#template-ui-requirement). Keep interaction/component-local requirements near the corresponding Feature Interaction; use the screen-level form only when no single interaction honestly owns the rule.
8. Check completeness:
   - every Feature Interaction has understandable Goal/Role/context/inputs/process/outcomes/result/outputs/transitions;
   - every transition states the triggering outcome/condition and sufficient transferred context/output;
   - every branch states condition plus next interaction/loop/termination;
   - every BI can be traced to an interaction/outcome/transition where it becomes necessary;
   - every UI Requirement can be traced to an interaction/outcome/component/screen state where it matters.
9. Maintain a Scenario `Evolution Steps` section only for coherent application-behavior changes canonically owned by this Scenario. Use [Template — Application Evolution Step](documentation-templates.md#template-application-evolution-step).
10. For each Application Evolution Step:
    - describe **what changes** in Scenario/application behavior;
    - identify Process/FI/contract/BI/UI changes when useful;
    - use a semantic stable ID/name that does not encode roadmap position;
    - mark `URGENT`, `PLANNED` or `POSSIBLE` only when that intent distinction adds meaning;
    - do **not** describe Domain/Slice implementation changes as part of the canonical Scenario step.
11. If the step affects another Scenario, link/reference the canonical step rather than copying its definition into another Scenario.
12. If the change is too broad to communicate clearly as modifications to this Scenario, create a full planned future Scenario owner and link it as `Replacement Scenario` from the Evolution Step.
13. If a genuinely new independent user-world goal appears, create a separate planned future Scenario rather than stretching the current Scenario identity.
14. When an Application Evolution Step becomes implemented:
    - update current Process Specification / Feature Interactions / BI / UI requirements as applicable;
    - stop presenting the behavior only as future evolution;
    - retain the old step/rationale only when it still materially explains current meaning.
15. Use DOC-UC-09 while writing/restructuring dense Scenario text so information is easier to scan without semantic loss.

### Principles

- Scenario identity follows a user need/result, not a button, command, Slice, class or implementation action.
- `Stage` is not a normative Scenario decomposition in this model.
- Process Specification is complete; BI/UI sections formalize selected behavior rather than supplying a hidden second half of the Scenario.
- Application Evolution Steps are owned by Scenarios and say **what application behavior changes**.
- Current behavior does not need labels such as “transitional Scenario”. Current truth is described as current truth; known change lives in Evolution Steps.
- A complete planned future Scenario is a Scenario owner, not a giant delta embedded in a current owner.
- Behavior Items remain few, core and implementation-independent.
- UI Requirements record intentional design constraints, not every current visual fact.
- `Reason` preserves why a rule matters so refactoring does not accidentally erase a requirement whose implementation happened to change.
- `POSSIBLE` stays explicitly non-binding.

### Owners used by this process

- `scenarios/README.md`;
- affected current `scenarios/SCN-*.md`;
- planned future Scenario owners when a future independent/replacement Scenario is useful;
- [`evolution-steps-map.md`](evolution-steps-map.md) as downstream planning consumer of Scenario-owned Application Evolution Steps;
- affected Domain/Slice owners as downstream consumers through `Changes by Application Evolution Step`.

---

## DOC-UC-02 — Discover and maintain Domain from Behavior Items

### Goal

Derive a coherent Domain model from business/application behavior instead of starting from current classes, while keeping Domain documentation focused on semantics, invariants, durable architecture requirements and explicit implementation changes required by Scenario-owned Application Evolution Steps.

### Process

1. Start from the Behavior Items of the Scenario Process / Feature Interactions being implemented or evolved. Feature Interaction context explains where a BI is needed, but BI remain the primary Domain-discovery input.
2. Identify business concepts, identities, states, relationships and invariants needed to make those BI true.
3. Identify consistency boundaries before deciding file/class boundaries.
4. Prefer one Aggregate owner when several Domain Objects share one consistency/invariant boundary; when creating/maintaining it use [Template — Aggregate Domain owner](documentation-templates.md#template-aggregate-domain-owner).
5. Create a separate Domain Object owner only when independent semantics, lifecycle, reuse or rule volume make it clearer than keeping the object inside the Aggregate; use [Template — Domain Object owner](documentation-templates.md#template-domain-object-owner).
6. In each Domain owner, list BI identities it directly **implements**. Do not copy authoritative BI wording unless a short local explanation is necessary to understand the Domain rule.
7. Do not derive Aggregate/Object boundaries mechanically from Feature Interaction names, and do not promote UI Requirements into Domain invariants merely because they appear in the same Scenario.
8. Describe only Domain meaning that helps understand the model: identity, semantic state/relationships, invariants and operations at business level. Do not maintain a class/field inventory.
9. Add `DI-*` only when there is a useful durable requirement beyond the BI itself, such as one rule needing one owner, a consistency boundary preserving an invariant, selected evolution creating architecture pressure, or composition needing one semantic implementation rather than parallel logic.
10. For useful `DI-*`, record requirement, reason and source (BI, Application Evolution Step, invariant or concrete architecture pressure) when not obvious.
11. When a Scenario-owned Application Evolution Step changes this Domain owner, add/update `Changes by Application Evolution Step` using [Template — Changes by Application Evolution Step](documentation-templates.md#template-changes-by-application-evolution-step):
    - reference the canonical Scenario-owned step;
    - describe how Domain meaning/invariants/authority must change to realize it;
    - identify DI changes/compatibility/architecture decision only when useful;
    - do not restate the step as though the Domain owns it.
12. Use [`domain-evolution.md`](domain-evolution.md) only when one Application Evolution Step changes shared Domain meaning across several owners and one cross-owner view materially improves understanding.
13. When evolution is implemented, update current Domain semantics and remove obsolete transitional rules only when implementation compatibility is actually gone.

### Principles

- Behavior Items are inputs to Domain discovery; current Java classes are evidence, not the starting ontology.
- Feature Interaction is behavioral context, not an automatic Domain boundary.
- Domain owner boundaries follow semantic consistency, not source-file boundaries.
- Aggregate owner is the default when it keeps shared invariants understandable; separate Domain Object files are explicitly allowed when clearer.
- A Domain owner may implement BI without needing any `DI-*` item.
- `DI-*` items are architecture requirements, not implementation traces.
- Domain owners do not own Application Evolution Steps; they own their **changes required by** those steps.
- A generic slogan such as "follow DRY" is not a useful `DI-*`; document the concrete duplicated semantic rule that must have one owner and why that ownership matters.

### Owners used by this process

- affected Scenario owners as BI and Application Evolution Step authority;
- current/future Domain Aggregate/Object owners when discovery justifies them;
- `domain-evolution.md` only for shared cross-owner Domain changes by one Application Evolution Step.

---

## DOC-UC-03 — Maintain Slice implementation from Behavior Items and Domain

### Goal

A developer can open one Slice and understand which Scenario behavior it realizes, which Domain it uses, which durable implementation requirements matter, and how that Slice must change to realize known Application Evolution Steps — without making the Slice look like an owner of application evolution or a manually maintained copy of current code flow.

### Process

1. Keep the Slice's current application result/responsibility accurate using [Template — Slice owner](documentation-templates.md#template-slice-owner).
2. List BI identities the Slice **realizes**.
3. When useful for navigation, reference Scenario Feature Interaction(s) whose behavior provides context for those BI, but do not duplicate the Feature Interaction Process Specification inside the Slice.
4. List semantic Domain owners/capabilities the Slice uses to realize those BI.
5. Treat Domain as the owner of business rules it directly implements. The Slice realizes the same BI by orchestrating provided Domain and required infrastructure; it must not recreate an independent copy of the same rule.
6. Keep the distinction explicit: Feature Interaction = behavioral Scenario decomposition; Slice = independently implementable/testable application decomposition. One FI may map to one/many Slices and one Slice may support one/many FI when justified.
7. Add `SI-*` only when a durable implementation/architecture requirement needs to survive normal refactoring, such as recovery boundaries, application composition/reuse, captured-input authority, evolution-driven ownership changes or a real cross-cutting constraint.
8. For useful `SI-*`, record requirement, reason and source (BI, Application Evolution Step, Domain constraint or concrete architecture concern) where useful.
9. Do not document method names, service call chains, field reads/writes or adapter-level routing as Slice truth. Inspect source or a generated implementation trace for those details.
10. When a Scenario-owned Application Evolution Step changes this Slice, maintain `Changes by Application Evolution Step` using [Template — Changes by Application Evolution Step](documentation-templates.md#template-changes-by-application-evolution-step):
    - reference the canonical step;
    - describe changed Slice result/responsibility/composition or BI contribution;
    - describe material Domain impact and SI changes when useful;
    - record a local architecture decision only when needed;
    - do not duplicate the Scenario-owned description of what application behavior changes.
11. When the step is implemented, update current Slice responsibility/BI realization and fold durable implementation requirements into current truth.

### Principles

- Slice realizes Scenario behavior; Domain directly embodies the business rules it owns.
- One BI may be referenced by Domain (`implements`) and Slice (`realizes using Domain`) without duplication of BI authority.
- Do not create a separate Slice for every action, state transition, journal, Git command or class.
- An existing Slice may evolve through internal modular expansion or composition without becoming several Slices merely because implementation structure grows.
- A separate supporting Slice requires an independently meaningful capability/result or recovery/composition boundary, not merely implementation size.
- Do not assume one Feature Interaction requires one Slice.
- Slice owners do not own Application Evolution Steps; they own their **implementation changes required by** those steps.
- Concrete DRY/composition requirements belong in `SI-*` only when they protect real semantic/application behavior from duplicate implementations.

### Owners used by this process

- canonical Scenario owner of each relevant Application Evolution Step;
- `slices.md` or a future focused Slice owner when independently useful;
- affected Domain owners;
- cross-cutting capability owners when they actually exist.

---

## DOC-UC-04 — Maintain a cross-cutting capability when shared responsibility is real

### Goal

Keep one shared implementation responsibility coherent across several Slices when it is substantial enough to deserve its own owner, without turning every common engineering principle into another documentation layer or making the shared owner look like an Application Evolution Step owner.

### Process

1. Detect a repeated implementation responsibility across several Slices.
2. Ask whether there is one real shared capability/behavior owner, not merely a common principle or similar-looking helper code.
3. If no independent shared responsibility exists, keep the requirement in affected Domain/Slice owners.
4. If a shared capability exists, create/maintain it with [Template — Cross-cutting Capability owner](documentation-templates.md#template-cross-cutting-capability-owner): responsibility/result, BI it realizes when genuinely shared, Domain used, optional Implementation Items and consumers.
5. When a Scenario-owned Application Evolution Step changes the shared capability, record `Changes by Application Evolution Step` using [Template — Changes by Application Evolution Step](documentation-templates.md#template-changes-by-application-evolution-step) rather than defining another copy of the step.
6. Have consuming Slices reference that owner rather than duplicate its durable rules.
7. Keep implementation call/field traces generated from source rather than manually copied into the owner.

### Principles

- A Feature Interaction does not become a Cross-cutting Capability merely because several Scenarios use similar behavior.
- “Cross-cutting Slice” may be useful informal language, but the owner is about a real shared implementation responsibility.
- Do not create one only to host abstract principles such as DRY, logging or composition.
- Cross-cutting Capability owners do not own Application Evolution Steps.

---

## DOC-UC-05 — Maintain architecture through application evolution

### Goal

Use Scenario-owned application evolution and its planned sequence to make better Domain/Slice architecture decisions now without implementing speculative future systems or confusing application changes with implementation changes.

### Process

For the capability being changed:

1. Read current Scenario Process, Feature Interactions and Behavior Items.
2. Read the canonical relevant Application Evolution Steps from their Scenario owners using [Template — Application Evolution Step](documentation-templates.md#template-application-evolution-step) as the recommended focused form.
3. Read [`evolution-steps-map.md`](evolution-steps-map.md) to understand selected order/dependencies/enablers; do not infer order from Evolution Step IDs.
4. Treat `POSSIBLE` steps only as context when they expose pressure on the same architecture boundary; they are not permission for speculative machinery.
5. Examine what selected application evolution changes in the Scenario Process: add/remove/compose/split/replace interactions, contract changes, new/removed user control or recovery points, stronger/weaker outputs, new BI/UI requirements.
6. Ask where the selected behavioral design places complexity: user interaction, Scenario/process, FI behavioral, implementation, recovery, testing and/or later evolution.
7. Follow affected BI into Domain owners; use [Template — Aggregate Domain owner](documentation-templates.md#template-aggregate-domain-owner) or [Template — Domain Object owner](documentation-templates.md#template-domain-object-owner) when an owner must be created/changed.
8. Record Domain implementation/semantic impact as `Changes by Application Evolution Step`; identify whether DI changes are needed.
9. Follow affected BI/FI context into Slices; use [Template — Slice owner](documentation-templates.md#template-slice-owner) for current Slice impact and [Template — Cross-cutting Capability owner](documentation-templates.md#template-cross-cutting-capability-owner) only when a real shared implementation responsibility appears.
10. Record Slice/cross-cutting implementation impact as `Changes by Application Evolution Step`; identify whether SI/ownership/composition changes are needed.
11. Use [`domain-evolution.md`](domain-evolution.md) only when one application step changes shared Domain meaning across several owners and one cross-owner semantic view is materially clearer than duplicated local notes.
12. Identify concrete architecture pressure, for example stable identity reused by later behavior, one shared invariant, semantic authority moving representation, recoverable boundary becoming independently meaningful, legacy concept expected to disappear, stronger interaction outputs eliminating manual transfer, or a selected later process change that makes the current boundary a known dead end.
13. Choose the smallest design that correctly implements selected behavior, preserves current invariants, avoids known planned dead ends and does not implement non-binding `POSSIBLE` evolution prematurely.
14. Record decisions at the narrowest natural owner: Scenario behavior/reason → Scenario BI/UI/Application Evolution Step; Domain semantics → Domain/DI/change-by-step; Slice composition → Slice/SI/change-by-step; real shared implementation responsibility → Cross-cutting Capability; exact independent protocol → focused contract.
15. Create a separate architecture/decision owner only when DOC-UC-10 confirms an explicit documentation use case and independent/shared complexity justify it.

### Principles

- Application Evolution Step = **what behavior changes**.
- Domain/Slice/Cross-cutting `Changes by Application Evolution Step` = **how that owner changes to realize it**.
- Evolution Steps Map = **when/order/dependency planning**.
- Evolution-aware, not speculation-driven.
- Rejected/candidate design alternatives do not justify architecture machinery merely because they were considered.
- Application Evolution Steps can create `DI-*`/`SI-*` requirements even when BI do not change.
- Complexity is neutral; architecture should consciously place it rather than merely minimize interaction count.

The maintained semantic trace is:

```text
Scenario Process / Feature Interactions
→ Behavior Items (+ intentional UI requirements)
→ Scenario-owned Application Evolution Step (WHAT changes)
→ Evolution Steps Map (WHEN / dependency / order)
→ Domain Changes by Application Evolution Step / optional DI (HOW)
→ Slice Changes by Application Evolution Step / optional SI (HOW)
→ architecture decision where needed
→ code / tests
```

---

## DOC-UC-06 — Inspect current implementation without duplicating source documentation

### Goal

Make current implementation easy to inspect while keeping normative documentation stable across ordinary refactoring.

### Process

1. Treat source as authority for exact implementation mechanics.
2. Do not copy method/service call chains, field usage or current class wiring into Scenario/Domain/Slice owners merely to make implementation easier to inspect.
3. When low-level implementation understanding is needed, inspect source directly or use the [Recommended generated implementation-trace output](documentation-templates.md#template-generated-implementation-trace) if tooling is available.
4. A generated trace should be disposable, derived from source and tied to its source revision. Useful generated information may include root symbol, callers/callees, fields read/written, referenced types, external boundaries and branch/result information when statically derivable with confidence.
5. Generated/source inspection may answer how current code realizes a selected Feature Interaction, BI or Slice, but it never becomes authority for Scenario behavior, UI requirements, Domain invariants or architecture intent.
6. Store generated traces at a fixed discoverable path when tooling is introduced; `generated/implementation-traces/` under this application documentation root is recommended.
7. Regenerate rather than manually edit a stale trace.

### Current boundary

No implementation-trace generator is established by this documentation model. This use case defines the boundary so future tooling can improve implementation discoverability without forcing manually maintained runtime/call-flow prose into durable owners.

---

## DOC-UC-07 — Explore and select Scenario behavioral design

### Goal

Explore how a Scenario **should work**, compare behavioral alternatives and composition trade-offs, understand where complexity is placed, and select/refine a design before treating it as authoritative Scenario truth or selected evolution.

### Process

1. Start from the Scenario Goal and desired final Result.
2. Read current Scenario behavior and its Scenario-owned Application Evolution Steps when the Scenario already exists; do not silently treat a target/candidate design as current truth.
3. Propose one or more candidate designs using [Template — Scenario Process Variant](documentation-templates.md#template-scenario-process-variant). Define initial Context/Inputs, Feature Interaction composition, contracts between interactions, final Result and final Outputs.
4. For each interaction needed by a variant, use [Template — Feature Interaction entry](documentation-templates.md#template-feature-interaction-entry) to make Goal, Scenario Role, Context/Preconditions, Inputs, Process, Outcomes, Result, Outputs and transitions explicit.
5. For non-obvious local choices, compare alternatives with [Template — Feature Interaction Variant analysis](documentation-templates.md#template-feature-interaction-variant-analysis).
6. Compare interaction contracts explicitly:
   - number/convenience/source of inputs;
   - whether inputs can be derived from context instead of manually supplied;
   - opportunity for wrong/manual transfer;
   - strength and reusability of Result/Outputs;
   - whether stronger outputs remove future user input or an intermediate interaction.
7. Consider whole-process composition changes:
   - **Compose** — combine interactions when no meaningful user/application boundary needs to remain visible;
   - **Split** — create a meaningful control/recovery/decision boundary;
   - **Replace** — use another behavioral route, possibly with different inputs/results/outputs.
8. Analyze boundaries between interactions, not only the nodes: control points, recovery points, intermediate outputs, manual transfer, partial-completion ambiguity and whether the next interaction really has sufficient context/input.
9. For material variants record `Strengths`, `Problems`, `Complexity`, `Risks` and `Questions`. Ask explicitly where complexity moves rather than assuming fewer interactions means simpler design.
10. When useful, perform a mental or visual walkthrough. This may range from a storyboard/clickable mock to an optional interactive Scenario design simulator. The tool is optional; the documentation model must remain complete without it.
11. Select/refine the preferred behavioral design, then hand it to DOC-UC-01 for authoritative classification/maintenance.
12. Classify the selected result correctly:
    - already accepted/implemented → integrate into current Process Specification;
    - selected but unimplemented coherent application change → Scenario-owned Application Evolution Step (`URGENT`/`PLANNED` when useful);
    - plausible useful future but not committed → `POSSIBLE` Application Evolution Step only when preserving it has ongoing value;
    - complete future user-world behavior that deserves its own owner → planned future Scenario;
    - merely considered/rejected alternative → not current truth and not automatically an Application Evolution Step.

### Principles

- Design exploration asks “how should this Scenario work?”, not only “are the already-written requirements correct?”.
- Visual/interactive walkthrough can expose missing branches, hidden inputs, weak outputs, missing BI/UI requirements, poor composition or misplaced complexity, but that is secondary to its role as a design medium.
- Candidate variants are not Application Evolution Steps or roadmap items by default.
- Preserve alternatives only when their rationale remains useful to an active/material design decision; do not build a generic decision registry.
- Do not require a scoring framework. Qualitative comparison is sufficient when it preserves the real reasoning.

---

<a id="doc-uc-evolution-steps-map"></a>
## DOC-UC-08 — Plan the Application Evolution Step sequence

### Goal

Make the intended application-evolution order/dependencies understandable without encoding roadmap position into Evolution Step identity or duplicating the behavioral definition owned by Scenario documentation.

### Process

1. Read canonical `URGENT`/`PLANNED` Application Evolution Steps from Scenario owners.
2. Read `POSSIBLE` steps only when they are useful to show as optional/unsequenced context.
3. Maintain [`evolution-steps-map.md`](evolution-steps-map.md) using [Template — Evolution Steps Map entry](documentation-templates.md#template-evolution-steps-map-entry).
4. For each planned step, record only planning relationships that matter:
   - prerequisite/dependency;
   - intended relative order;
   - what the step enables;
   - whether another step can happen in parallel;
   - condition/decision that gates it;
   - planned future Scenario reached/replaced when relevant.
5. Link to the canonical Scenario-owned step for behavioral meaning instead of copying its Process/FI/BI/UI delta into the map.
6. Reorder the map freely when planning changes; do not rename/re-ID Evolution Steps merely because their planned order changed.
7. Remove or mark completed planning nodes when they no longer help understand remaining work; implementation truth belongs in current owners.

### Principles

- The map owns **planning order**, not application behavior.
- Evolution Step identity is semantic and stable across roadmap reordering.
- Sequence may be linear, branching, conditional or parallel; do not force a fake single numbered backlog when dependencies say otherwise.
- Planned future Scenarios can appear as reachable/replacement targets without becoming current truth.

### Owners used by this process

- Scenario owners as canonical Application Evolution Step authority;
- [`evolution-steps-map.md`](evolution-steps-map.md) as the dedicated sequence/dependency owner;
- planned future Scenario owners when the map points to them.

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
   - application Evolution Step vs lower-owner change required by that step.
5. Use Process Maps/tables only when they reveal structure better than prose; do not use formatting for decoration.
6. Re-read the structured version against the source meaning and verify that no condition, exception, reason, authority boundary or outcome disappeared during rewriting.
7. Give Scenario, Feature Interaction, BI, UI Requirement, Evolution Step, Slice, Aggregate/Object and other durable entities intuitive readable names.
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
   - **application semantic/contract/proof owner** (for example focused protocol, Scenario/Slice support contract, testing plan or manual acceptance evidence owner) → the application Scenario, Slice, testing or acceptance process that requires the information may justify it without inventing an artificial Documentation Use Case.
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

## Template use

Recommended owner/entry forms are collected in [`documentation-templates.md`](documentation-templates.md).

Templates are starting forms, not schemas. Use the smallest structure that preserves required meaning; omit, combine, rename, reorder or add sections when the concrete owner is clearer that way.

Unlike a passive template catalog, Documentation Use Cases link directly to relevant forms at the process step where they are needed. DOC-UC-09 additionally governs readable presentation of the information inside those forms.

---

## Integration rule for existing Replacement Package App documentation

Adoption is incremental.

This owner establishes the documentation model before rewriting every existing Scenario/Domain/Slice document.

A following documentation-integration step should:

1. reconcile accepted current Scenario truth;
2. build/maintain a complete current Process Specification for each Scenario;
3. identify selected current Feature Interactions and their context/input/result/output contracts;
4. persist core Scenario BI with `Requirement + Reason` under interactions where their behavioral need is visible;
5. derive/persist intentional interaction/component/screen UI Requirements where useful;
6. migrate known selected/plausible application changes into Scenario-owned semantically named Application Evolution Steps;
7. create planned future Scenario owners when a future independent/replacement Scenario is already useful to understand as a whole;
8. populate [`evolution-steps-map.md`](evolution-steps-map.md) with selected step sequence/dependencies after canonical Scenario-owned steps exist;
9. perform Domain discovery from BI before deciding Aggregate/Object owner files;
10. map each Domain owner to BI it implements and add `DI-*` only where useful;
11. replace lower-owner `Evolution Steps` wording with `Changes by Application Evolution Step`, referencing rather than owning Scenario steps;
12. map each Slice to BI it realizes and Domain it uses, adding `SI-*` only where useful;
13. use FI-to-Slice references only as helpful context/navigation and never require 1:1 mapping;
14. populate `domain-evolution.md` only for shared Domain changes by one Application Evolution Step that benefit from a cross-owner view;
15. introduce a Cross-cutting Capability owner only when a real shared implementation responsibility justifies it;
16. keep code-level traces out of normative docs and use source/generated derived traces when available;
17. use meaningful human-readable names and remove false ordinal meaning from new/migrated documentation identities where practical without forcing churn solely for cosmetic renaming;
18. structure dense documentation for semantic readability without dropping conditions/exceptions/rationale;
19. verify every durable documentation owner has explicit use-case/process coverage; require a Documentation Use Case specifically for documentation-process artifacts rather than inventing DOC-UC entries for application semantic/contract/proof owners;
20. keep unaffected documentation unchanged.

This documentation-model update does **not** itself claim that existing Scenario, Slice or Domain owners have already been migrated to these forms.
