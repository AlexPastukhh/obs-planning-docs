# Replacement Package App — Documentation Use Cases

Status: active documentation-maintenance owner
Scope: how Replacement Package App documentation designs and preserves Scenario behavior, discovers Domain meaning, describes Slice implementation requirements, stays evolution-aware and keeps source-level implementation evidence derived rather than manually duplicated.

## Purpose

Documentation must make these layers understandable without turning any one layer into a duplicate of another:

1. what accepted user/business behavior is true now;
2. how a Scenario is behaviorally designed, including meaningful alternatives and composition trade-offs;
3. how selected but unimplemented behavior, planned expansion and plausible future evolution remain distinct from current truth and rejected design alternatives;
4. which Behavior Items express the durable application/business guarantees of the selected Scenario behavior;
5. which UI Requirements intentionally constrain presentation/interaction without being confused with business behavior;
6. which Domain owners directly implement the business rules;
7. which Slices realize Scenario behavior by orchestrating that Domain;
8. which durable implementation/architecture requirements matter beyond the behavior itself;
9. how to inspect current source implementation without manually maintaining code-level call traces in normative documentation.

The intended flow is:

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

Design exploration precedes authoritative Scenario maintenance when behavior is not yet selected:

```text
Scenario Goal
→ candidate Scenario Process Variants
→ candidate Feature Interaction Variants
→ compare contracts / composition / complexity
→ select or refine behavioral design
→ classify it as current truth, Migration Delta, POSSIBLE evolution, or retained/rejected alternative
```

Evolution overlays the selected/current flow through the same stable `EVO-RPKG-*` identity.

This owner defines the documentation work itself. It does not replace Scenario owners, Domain owners, `slices.md`, focused contracts, source or tests.

## Minimal shared terms

These terms are small enough to stay here rather than becoming a separate terminology file.

### Current truth

Behavior or architecture that is already accepted as implemented.

Current Scenario prose describes current user/business behavior. Current Domain/Slice prose describes current semantic responsibility and durable architecture constraints, not a manually maintained copy of source structure.

### Migration Delta

The part of a Scenario that is not current truth yet but is useful to keep as selected or plausible evolution.

A Migration Delta may contain:

- **URGENT** — selected migration that should be implemented next or soon;
- **PLANNED** — selected later change or extension;
- **POSSIBLE** — plausible future evolution that is useful to keep visible but is not committed.

`POSSIBLE` is explicitly non-binding. It may expose architecture pressure or a known dead end, but it does not justify speculative implementation by itself.

A merely considered or rejected design alternative is **not** automatically a Migration Delta item or Evolution Step.

### Evolution Step

One Evolution Step is one coherent user-visible/application behavioral migration, extension, removal or process redesign described from the Scenario point of view.

Use a stable ID such as:

```text
EVO-RPKG-001
```

The same Evolution Step ID is referenced by every affected Scenario, Domain and Slice owner. An Evolution Step is not a commit, class, Git command, arbitrary technical task or implementation-only refactor.

An Evolution Step may change Scenario process composition, Feature Interactions, interaction contracts, Behavior Items or UI Requirements. When it is accepted as implemented, its resulting behavior becomes current truth and must not remain described only as future Migration Delta.

### Scenario Process Specification

The complete behavioral specification of one Scenario.

It makes the meaningful behavior visible directly: context/inputs, Feature Interactions, observable application behavior, outcomes, branches, loops, retries, validation/error/uncertain paths, results, outputs, transitions and terminal outcomes.

A Process Specification is not merely a short overview whose missing semantics appear only later in Behavior Items. Behavior Items and UI Requirements formalize requirements that are already visible in the process; they do not become a second hidden source of Scenario behavior.

A compact Process Map may show topology while detailed Feature Interaction entries carry the full local behavior. These are two views of the same specification.

### Feature Interaction

A Scenario-local selected behavioral way to achieve one local meaningful result from particular context and inputs through observable application behavior, producing a result and outputs that may affect subsequent Scenario behavior.

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

Do not represent a rejected alternative as a current runtime branch. Do not create an `EVO-*` merely because an alternative was considered.

### Behavior Item

A Behavior Item is one atomic **business/application behavioral requirement** of a Scenario.

It answers:

> What must the application do, or what must remain true, for this Scenario behavior to be correct?

A Behavior Item deliberately does **not** prescribe one implementation mechanism. It should remain valid across ordinary refactoring and across multiple possible implementations of the same behavior.

Use a stable Scenario-scoped ID such as:

```text
BI-RPKG-01-001
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

### Domain Implementation Item

A Domain Implementation Item (`DI-*`) is an optional durable requirement about how a Domain owner must be shaped so that it can implement its Behavior Items correctly and evolve safely.

It may be derived from one or more BI, a Domain invariant/consistency boundary, an Evolution Step, concrete architecture pressure or a specific composition/DRY requirement where duplicate domain semantics would create divergence.

A Domain owner may need no `DI-*` items at all. A good `DI-*` survives ordinary refactoring and does not describe Java methods, field layout, class call sequences or current helper structure.

### Slice Implementation Item

A Slice Implementation Item (`SI-*`) is an optional durable requirement about how a Slice realizes its Behavior Items using the available Domain and infrastructure.

It may cover stable orchestration/separation/recovery/composition requirements or an Evolution Step that requires Slice architecture to change without changing the underlying BI.

A good `SI-*` survives ordinary refactoring. Do not use it as a manually maintained method/service trace.

### Cross-cutting Capability

A Cross-cutting Capability is an optional owner for one real shared implementation responsibility that spans several Slices and needs the same kind of implementation/evolution documentation as a Slice.

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

Canonical recommended forms live in [`documentation-templates.md`](documentation-templates.md). Each documentation use case below links directly to the concrete form at the process step where it is needed. A concrete situation may omit, combine, rename, reorder or add sections when another structure communicates the required meaning more clearly.

## Non-duplication and file-splitting rules

Keep semantic documentation stable and local.

- Do not manually duplicate information that can be read reliably from source and changes only because code was refactored.
- Do not manually maintain call chains, method/service routing, Java field inventories or code-shape traces in Scenario, Domain or Slice owners.
- Do not document accidental current UI layout merely because it can be observed; record only intentional UI constraints worth preserving.
- Record code-independent behavior, invariants, intentional UI requirements, architecture requirements, ownership and evolution pressure instead.
- Keep a small term, invariant, principle or decision inside its natural owner when a separate file would add ceremony rather than clarity.
- Create a focused owner only when independent/shared complexity justifies it.
- Domain documentation is organized around semantic consistency boundaries, not Java classes. Prefer an Aggregate owner when several concepts share one consistency/invariant boundary.
- A separate Domain Object file is valid when that object has enough independent semantics, identity/lifecycle, cross-owner reuse or rules that an Aggregate file becomes less clear.
- One Java class does not imply one Domain Object owner, and one Domain Object owner does not imply one Java class.
- `Feature Interaction` is behavioral Scenario decomposition; `Slice` is implementation decomposition. Do not require 1:1 mapping.
- Candidate/rejected design alternatives do not become current truth, Migration Delta or architecture requirements automatically.

`domain-evolution.md` is an evolution map for shared semantic changes. It is not the primary Domain model and not a registry of classes.

---

## DOC-UC-01 — Maintain Scenario behavioral specification and evolution

### Goal

A reader can open one Scenario and understand its user goal, complete current behavioral process, meaningful Feature Interactions, core Behavior Items, intentional UI Requirements and still-unimplemented evolution without needing implementation details to understand what the application is required to do.

### Process

1. Verify accepted current behavior from Scenario documentation, source/tests and accepted implementation state.
2. Maintain the Scenario `User Goal` using [Template — Scenario owner](documentation-templates.md#template-scenario-owner).
3. Maintain a complete `Process Specification`; use its `Process Map` when useful for topology, but keep all meaningful current behavior visible in the specification rather than hiding it only in requirements.
4. Describe each meaningful interaction using [Template — Feature Interaction entry](documentation-templates.md#template-feature-interaction-entry): Goal, Scenario Role, Context/Preconditions, Required Inputs, observable Process, Outcomes, Result, Outputs and Next Interactions.
5. Keep runtime branches, loops, retries, correction, validation/error behavior, meaningful failures and uncertainty explicit. A failure/outcome remains inside the same Feature Interaction when the local goal has not changed.
6. Persist the Scenario's core requirements as stable `BI-RPKG-*` Behavior Items under the Feature Interaction where their need is visible. For each BI, write implementation-independent `Requirement + Reason`.
7. Maintain intentional UI Requirements separately from BI using [Template — UI Requirement forms](documentation-templates.md#template-ui-requirement). Keep interaction/component-local requirements near the corresponding Feature Interaction; use the screen-level form only when no single interaction honestly owns the rule.
8. Check completeness:
   - every Feature Interaction has understandable Goal/Role/context/inputs/process/outcomes/result/outputs/transitions;
   - every transition states the triggering outcome/condition and sufficient transferred context/output;
   - every branch states condition plus next interaction/loop/termination;
   - every BI can be traced to an interaction/outcome/transition where it becomes necessary;
   - every UI Requirement can be traced to an interaction/outcome/component/screen state where it matters.
9. Add or maintain `Migration Delta` only for behavior that is not current truth yet. Use [Template — Evolution Step entry](documentation-templates.md#template-evolution-step) for a focused `EVO-*` entry when helpful.
10. One Evolution Step represents one coherent user-visible/application change and may add/change/remove/compose/split/replace Feature Interactions, change interaction contracts/process composition, add/change/remove BI, or add/change/remove UI Requirements.
11. Mark every non-implemented step `URGENT`, `PLANNED` or `POSSIBLE`.
12. Reuse a BI identity when the same business requirement remains; create a new BI only when the requirement itself is genuinely new.
13. Link the same Evolution Step into affected Domain and Slice owners as downstream impact becomes known.
14. When the step is accepted as implemented:
    - update current Process Specification and Feature Interactions;
    - promote the resulting BI/UI requirement set to current truth;
    - remove that behavior from active Migration Delta;
    - leave only still-unimplemented evolution as delta.

### Principles

- Scenario identity follows a user need/result, not a button, command, Slice, class or implementation action.
- `Stage` is not a normative Scenario decomposition in this model.
- Process Specification is complete; BI/UI sections formalize the selected behavior rather than supplying a hidden second half of the Scenario.
- Behavior Items remain few, core and implementation-independent.
- UI Requirements record intentional design constraints, not every current visual fact.
- `Reason` preserves why a rule matters so refactoring does not accidentally erase a requirement whose implementation happened to change.
- Migration Delta is a delta, not a duplicate future Scenario.
- `POSSIBLE` stays explicitly non-binding.

### Owners used by this process

- `scenarios/README.md`;
- affected `scenarios/SCN-*.md`;
- affected Domain/Slice owners as downstream consumers of BI/EVO identities.

---

## DOC-UC-02 — Discover and maintain Domain from Behavior Items

### Goal

Derive a coherent Domain model from business/application behavior instead of starting from current classes, while keeping Domain documentation focused on semantics, invariants and durable architecture requirements.

### Process

1. Start from the Behavior Items of the Scenario Process / Feature Interactions being implemented or evolved. Feature Interaction context explains where a BI is needed, but BI remain the primary Domain-discovery input.
2. Identify the business concepts, identities, states, relationships and invariants needed to make those BI true.
3. Identify consistency boundaries before deciding file/class boundaries.
4. Prefer one Aggregate owner when several Domain Objects share one consistency/invariant boundary; when creating/maintaining it use [Template — Aggregate Domain owner](documentation-templates.md#template-aggregate-domain-owner).
5. Create a separate Domain Object owner only when independent semantics, lifecycle, reuse or rule volume make it clearer than keeping the object inside the Aggregate; use [Template — Domain Object owner](documentation-templates.md#template-domain-object-owner).
6. In each Domain owner, list the `BI-*` identities it directly **implements**. Do not copy the authoritative BI wording unless a short local explanation is necessary to understand the Domain rule.
7. Do not derive Aggregate/Object boundaries mechanically from Feature Interaction names, and do not promote UI Requirements into Domain invariants merely because they appear in the same Scenario.
8. Describe only Domain meaning that helps understand the model: identity, semantic state/relationships, invariants and operations at business level. Do not maintain a class/field inventory.
9. Add `DI-*` only when there is a useful durable requirement beyond the BI itself, such as one rule needing one owner, a consistency boundary preserving an invariant, selected evolution creating architecture pressure, or composition needing one semantic implementation rather than parallel logic.
10. For useful `DI-*`, record requirement, reason and source (`BI-*`, `EVO-*`, invariant or concrete architecture pressure) when not obvious.
11. Maintain an `Evolution Steps` section for Domain owners affected by active Scenario evolution; use [Template — Evolution Step entry](documentation-templates.md#template-evolution-step) when a focused entry improves clarity.
12. When evolution is implemented, update current Domain semantics and remove obsolete transitional rules only when implementation compatibility is actually gone.

### Principles

- Behavior Items are inputs to Domain discovery; current Java classes are evidence, not the starting ontology.
- Feature Interaction is behavioral context, not an automatic Domain boundary.
- Domain owner boundaries follow semantic consistency, not source-file boundaries.
- Aggregate owner is the default when it keeps shared invariants understandable; separate Domain Object files are explicitly allowed when clearer.
- A Domain owner may implement BI without needing any `DI-*` item.
- `DI-*` items are architecture requirements, not implementation traces.
- A generic slogan such as "follow DRY" is not a useful `DI-*`; document the concrete duplicated semantic rule that must have one owner and why that ownership matters.

### Owners used by this process

- affected Scenario owners;
- current/future Domain Aggregate/Object owners when discovery justifies them;
- `domain-evolution.md` only for shared evolution mapping across owners.

---

## DOC-UC-03 — Maintain Slice implementation from Behavior Items and Domain

### Goal

A developer can open one Slice and understand which Scenario behavior it realizes, which Domain it uses, which durable implementation requirements matter, and how the Slice is expected to evolve — without a manually maintained copy of current code flow.

### Process

1. Keep the Slice's current application result/responsibility accurate using [Template — Slice owner](documentation-templates.md#template-slice-owner).
2. List the `BI-*` identities the Slice **realizes**.
3. When useful for navigation, reference the Scenario Feature Interaction(s) whose behavior provides context for those BI, but do not duplicate the Feature Interaction Process Specification inside the Slice.
4. List the semantic Domain owners/capabilities the Slice uses to realize those BI.
5. Treat Domain as the owner of the business rules it directly implements. The Slice realizes the same BI by orchestrating provided Domain and required infrastructure; it must not recreate an independent copy of the same rule.
6. Keep the distinction explicit: Feature Interaction = behavioral Scenario decomposition; Slice = independently implementable/testable application decomposition. One FI may map to one/many Slices and one Slice may support one/many FI when justified.
7. Add `SI-*` only when a durable implementation/architecture requirement needs to survive normal refactoring, such as recovery boundaries, application composition/reuse, captured-input authority, evolution-driven ownership changes or a real cross-cutting constraint.
8. For useful `SI-*`, record requirement, reason and source (`BI-*`, `EVO-*`, Domain constraint or concrete architecture concern) where useful.
9. Do not document method names, service call chains, field reads/writes or adapter-level routing as Slice truth. Inspect source or a generated implementation trace for those details.
10. Maintain `Evolution Steps` for every active Scenario Evolution Step that changes the Slice; use [Template — Evolution Step entry](documentation-templates.md#template-evolution-step) when helpful. Record BI contribution, material Domain impact, SI changes and local architecture decision only when needed.
11. When the step is implemented, update current Slice responsibility/BI realization and fold durable implementation requirements into current truth.

### Principles

- Slice realizes Scenario behavior; Domain directly embodies the business rules it owns.
- One BI may be referenced by Domain (`implements`) and Slice (`realizes using Domain`) without duplication of BI authority.
- Do not create a separate Slice for every action, state transition, journal, Git command or class.
- An existing Slice may evolve through internal modular expansion or composition without becoming several Slices merely because implementation structure grows.
- A separate supporting Slice requires an independently meaningful capability/result or recovery/composition boundary, not merely implementation size.
- Do not assume one Feature Interaction requires one Slice.
- Concrete DRY/composition requirements belong in `SI-*` only when they protect real semantic/application behavior from duplicate implementations.

### Owners used by this process

- affected Scenario owner;
- `slices.md` or a future focused Slice owner when independently useful;
- affected Domain owners;
- cross-cutting capability owners when they actually exist.

---

## DOC-UC-04 — Maintain a cross-cutting capability when shared responsibility is real

### Goal

Keep one shared implementation responsibility coherent across several Slices when it is substantial enough to deserve its own owner, without turning every common engineering principle into another documentation layer.

### Process

1. Detect a repeated implementation responsibility across several Slices.
2. Ask whether there is one real shared capability/behavior owner, not merely a common principle or similar-looking helper code.
3. If no independent shared responsibility exists, keep the requirement in the affected Domain/Slice owners.
4. If a shared capability exists, create/maintain it with [Template — Cross-cutting Capability owner](documentation-templates.md#template-cross-cutting-capability-owner): responsibility/result, BI it realizes when genuinely shared, Domain used, optional Implementation Items, consumers, Evolution Steps and material architecture decisions.
5. Have consuming Slices reference that owner rather than duplicate its durable rules.
6. Keep implementation call/field traces generated from source rather than manually copied into the owner.

### Principles

- A Feature Interaction does not become a Cross-cutting Capability merely because several Scenarios use similar behavior.
- “Cross-cutting Slice” may be useful informal language, but the owner is about a real shared implementation responsibility.
- Do not create one only to host abstract principles such as DRY, logging or composition.

---

## DOC-UC-05 — Maintain architecture through understanding the evolution process

### Goal

Use visible product/Scenario evolution and likely composition changes to make better Domain/Slice architecture decisions now without implementing speculative future systems.

### Process

For the capability being changed:

1. Read current Scenario Process, Feature Interactions and Behavior Items.
2. Read relevant `URGENT` and `PLANNED` Evolution Steps using [Template — Evolution Step entry](documentation-templates.md#template-evolution-step) as the recommended focused form.
3. Read `POSSIBLE` steps only as context when they expose pressure on the same architecture boundary.
4. Examine how selected evolution changes the Scenario Process itself: add/remove/compose/split/replace interactions, change inputs/results/outputs, alter contracts between interactions, or add/remove user control/recovery points.
5. Ask where the selected behavioral design places complexity: user interaction, Scenario/process, FI behavioral, implementation, recovery, testing and/or evolution.
6. Follow affected BI into Domain owners; use [Template — Aggregate Domain owner](documentation-templates.md#template-aggregate-domain-owner) or [Template — Domain Object owner](documentation-templates.md#template-domain-object-owner) when an owner must be created/changed.
7. Identify which Domain concepts/consistency boundaries must change and whether a `DI-*` is needed.
8. Follow affected BI/FI context into Slices; use [Template — Slice owner](documentation-templates.md#template-slice-owner) for current Slice impact and [Template — Cross-cutting Capability owner](documentation-templates.md#template-cross-cutting-capability-owner) only when a real shared implementation responsibility appears.
9. Identify which Slice/cross-cutting composition or ownership must change and whether an `SI-*` is needed.
10. Identify concrete architecture pressure, for example stable identity reused by later behavior, one shared invariant, semantic authority moving representation, recoverable boundary becoming independently meaningful, legacy concept expected to disappear, stronger interaction outputs eliminating manual transfer, or a selected later process change that makes the current boundary a known dead end.
11. Choose the smallest design that correctly implements selected behavior, preserves current invariants, avoids known `URGENT`/`PLANNED` dead ends and does not implement `POSSIBLE` evolution prematurely.
12. Record decisions at the narrowest owner: Scenario behavior/reason → Scenario BI; UI presentation → Scenario UI Requirement; Domain semantics → Domain/DI; Slice composition → Slice/SI; real shared implementation responsibility → Cross-cutting Capability; exact independent protocol → focused contract.
13. Create a separate architecture/decision owner only when the decision is genuinely cross-cutting or too substantial to understand in natural owners.

### Principles

- Evolution-aware, not speculation-driven.
- Rejected/candidate design alternatives do not justify architecture machinery merely because they were considered.
- Evolution Steps can create `DI-*`/`SI-*` requirements even when the BI does not change, because implementation architecture may need to move to support selected future behavior safely.
- `POSSIBLE` behavior can expose pressure/dead ends but is not permission for generic machinery.
- Complexity is neutral; architecture should consciously place it rather than merely minimize interaction count.

The maintained semantic trace is:

```text
Scenario Process / Feature Interactions
→ Behavior Items (+ intentional UI requirements)
→ Evolution Step
→ Domain impact / optional DI
→ Slice impact / optional SI
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
2. Read current Scenario behavior/evolution when the Scenario already exists; do not silently treat a target/candidate design as current truth.
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
    - selected but unimplemented → `URGENT` or `PLANNED` Migration Delta/Evolution Step;
    - plausible useful future but not committed → `POSSIBLE`;
    - merely considered/rejected alternative → not current truth and not automatically an Evolution Step/Migration Delta item.

### Principles

- Design exploration asks “how should this Scenario work?”, not only “are the already-written requirements correct?”.
- Visual/interactive walkthrough can expose missing branches, hidden inputs, weak outputs, missing BI/UI requirements, poor composition or misplaced complexity, but that is secondary to its role as a design medium.
- Candidate variants are not roadmap items by default.
- Preserve alternatives only when their rationale remains useful to an active/material design decision; do not build a generic decision registry.
- Do not require a scoring framework. Qualitative comparison is sufficient when it preserves the real reasoning.

---

## Template use

Recommended owner/entry forms are collected in [`documentation-templates.md`](documentation-templates.md).

Templates are starting forms, not schemas. Use the smallest structure that preserves the required meaning; omit, combine, rename, reorder or add sections when the concrete owner is clearer that way.

Unlike a passive template catalog, the use cases above link directly to relevant forms at the process step where they are needed.

---

## Integration rule for existing Replacement Package App documentation

Adoption is incremental.

This owner establishes the documentation model before rewriting every existing Scenario/Domain/Slice document.

A following documentation-integration step should:

1. reconcile accepted current Scenario truth;
2. build/maintain a complete current Process Specification for each Scenario;
3. identify selected current Feature Interactions and their context/input/result/output contracts;
4. persist core Scenario BI with `Requirement + Reason` under the interactions where their behavioral need is visible;
5. derive/persist intentional interaction/component/screen UI Requirements where useful;
6. derive active `URGENT` / `PLANNED` / `POSSIBLE` Migration Delta and stable `EVO-RPKG-*` steps without promoting rejected design alternatives into roadmap state;
7. perform Domain discovery from BI before deciding Aggregate/Object owner files;
8. map each Domain owner to BI it implements and add `DI-*` only where useful;
9. map each Slice to BI it realizes and Domain it uses, adding `SI-*` only where useful;
10. use FI-to-Slice references only as helpful context/navigation and never require 1:1 mapping;
11. populate `domain-evolution.md` only for shared semantic evolution that benefits from a cross-owner map;
12. introduce a Cross-cutting Capability owner only when a real shared implementation responsibility justifies it;
13. keep code-level traces out of normative docs and use source/generated derived traces when available;
14. record only architecture decisions already material to current or selected evolution;
15. keep unaffected documentation unchanged.

This documentation-model update does **not** itself claim that the existing Scenario owners have already been migrated to this form.
