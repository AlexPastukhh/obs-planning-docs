# Replacement Package App — Documentation Use Cases

Status: active documentation-maintenance owner
Scope: how Replacement Package App documentation preserves business behavior, discovers domain meaning, describes Slice implementation requirements and stays evolution-aware without duplicating source code.

## Purpose

Documentation must make these layers understandable without turning any one layer into a duplicate of another:

1. what accepted user/business behavior is true now;
2. how that behavior is migrating, is planned to expand, or may plausibly evolve later;
3. which Domain owners directly implement the business rules;
4. which Slices realize the Scenario behavior by orchestrating that Domain;
5. which durable implementation/architecture requirements matter beyond the behavior itself;
6. how to inspect current source implementation without manually maintaining code-level call traces in normative documentation.

The intended flow is:

```text
Scenario / Stage
→ Behavior Items
→ Domain discovery and Domain owners
→ optional Domain Implementation Items
→ Slice / optional cross-cutting capability
→ optional Slice Implementation Items
→ code / tests
```

Evolution overlays that flow through the same stable `EVO-RPKG-*` identity.

This owner defines the documentation work itself. It does not replace Scenario owners, Domain owners, `slices.md`, focused contracts, source or tests.

## Minimal shared terms

These terms are small enough to stay here rather than becoming a separate terminology file.

### Current truth

Behavior or architecture that is already accepted as implemented.

Current Scenario prose describes current user/business behavior. Current Domain/Slice prose describes current semantic responsibility and durable architecture constraints, not a manually maintained copy of source structure.

### Migration Delta

The part of a Scenario that is not current truth yet.

A Migration Delta may contain:

- **URGENT** — selected migration that should be implemented next or soon;
- **PLANNED** — selected later change or extension;
- **POSSIBLE** — plausible future evolution that is useful to keep visible but is not committed.

`POSSIBLE` is explicitly non-binding. It may expose architecture pressure or a known dead end, but it does not justify speculative implementation by itself.

### Evolution Step

One Evolution Step is one coherent migration, extension, removal or new functional change described from the Scenario/user-experience point of view.

Use a stable ID such as:

```text
EVO-RPKG-001
```

The same Evolution Step ID is referenced by every affected Scenario, Domain and Slice owner. An Evolution Step is not a commit, class, Git command or arbitrary technical task.

When an Evolution Step is accepted as implemented, its resulting behavior becomes current truth and must not remain described only as future Migration Delta.

### Behavior Item

A Behavior Item is one atomic **business behavioral requirement** of a Scenario or Stage.

It answers:

> What must the application do, or what must remain true, for this Scenario to satisfy its user/business goal?

A Behavior Item deliberately does **not** prescribe one implementation mechanism. It should remain valid across ordinary refactoring and across multiple possible implementations of the same behavior.

Use a stable Scenario-scoped ID such as:

```text
BI-RPKG-01-001
```

Recommended content:

```text
Requirement:
<business behavior / invariant / rule>

Reason:
<why this behavior exists>
```

The `Reason` is important. It may explain, for example:

- that the requirement follows directly from the Scenario or Stage goal;
- a concrete bug or class of bugs it prevents;
- a business invariant that would otherwise be violated;
- later behavior that depends on this requirement;
- why removing the requirement would make recovery, review or user intent ambiguous.

Do not invent a bug-prevention rationale when the requirement is simply fundamental to the Scenario goal.

Behavior Items are the primary input for Domain discovery. The authoritative BI text stays in the Scenario; lower owners reference the same BI identity instead of rewriting it.

### Domain Implementation Item

A Domain Implementation Item (`DI-*`) is an optional durable requirement about how a Domain owner must be shaped so that it can implement its Behavior Items correctly and evolve safely.

It may be derived from:

- one or more Behavior Items;
- a Domain invariant or consistency boundary;
- an Evolution Step;
- a concrete architecture pressure such as one shared rule needing one owner;
- a specific composition/DRY requirement where duplicate domain semantics would create divergence.

A Domain owner may need no `DI-*` items at all. Do not create them for uniformity.

A good `DI-*` survives ordinary refactoring. It describes a durable architecture requirement, not a Java method, field layout, class call sequence or current helper structure.

### Slice Implementation Item

A Slice Implementation Item (`SI-*`) is an optional durable requirement about how a Slice realizes its Behavior Items using the available Domain and infrastructure.

It may cover stable concerns such as:

- required orchestration or separation boundaries;
- recovery ordering;
- composition/reuse of one semantic operation instead of parallel business logic;
- an Evolution Step that requires the Slice architecture to change without changing the underlying BI;
- a concrete cross-cutting or infrastructure constraint that is material to the Slice result.

A good `SI-*` also survives ordinary refactoring. Do not use it as a manually maintained method/service trace.

### Cross-cutting Capability

A Cross-cutting Capability is an optional owner for one real shared implementation responsibility that spans several Slices and needs the same kind of behavior/implementation/evolution documentation as a Slice.

Do not create one merely because several owners share a general engineering principle. Create it only when there is a genuine shared capability/responsibility that would otherwise be duplicated or ambiguous.

### Generated Implementation Trace

A Generated Implementation Trace is a **derived, non-authoritative artifact produced from source**, intended to answer low-level questions such as current calls, callers, field reads/writes, referenced types or external boundaries.

It is not normative documentation and must not be manually maintained as part of a Domain/Slice owner.

Source remains authority for implementation mechanics. If tooling exists, generated traces should include the source revision they were generated from and be replaceable by regeneration. A future trace generator may materialize them under a fixed path such as:

```text
planning/documentation/tools/replacement-package-app/generated/implementation-traces/
```

This documentation step defines the desired documentation boundary; it does not claim that a trace generator is already implemented.

### Template

A Template is a recommended starting form for an owner or entry, not a schema.

Canonical recommended forms live in [`documentation-templates.md`](documentation-templates.md). A concrete situation may omit, combine, rename or add sections when another structure communicates the same required meaning more clearly.

## Non-duplication and file-splitting rules

Keep semantic documentation stable and local.

- Do not manually duplicate information that can be read reliably from source and changes only because code was refactored.
- Do not manually maintain call chains, method/service routing, Java field inventories or code-shape traces in Scenario, Domain or Slice owners.
- Record code-independent behavior, invariants, architecture requirements, ownership and evolution pressure instead.
- Keep a small term, invariant, principle or decision inside its natural owner when a separate file would add ceremony rather than clarity.
- Create a focused owner only when independent/shared complexity justifies it.
- Domain documentation is organized around semantic consistency boundaries, not Java classes. Prefer an Aggregate owner when several concepts share one consistency/invariant boundary.
- A separate Domain Object file is valid when that object has enough independent semantics, identity/lifecycle, cross-owner reuse or rules that an Aggregate file becomes less clear.
- One Java class does not imply one Domain Object owner, and one Domain Object owner does not imply one Java class.

`domain-evolution.md` is an evolution map for shared semantic changes. It is not the primary Domain model and not a registry of classes.

---

## DOC-UC-01 — Maintain Scenario behavioral specification and evolution

### Goal

A reader can open one Scenario and understand its user goal, meaningful stages, current business behavior and still-unimplemented evolution without needing implementation details to understand what the application is required to do.

### Process

1. Verify accepted current behavior from current Scenario documentation, source/tests and accepted implementation state.
2. Keep the Scenario's user goal and main/important branch flow as current truth.
3. Split the Scenario into meaningful Stages where a Stage clarifies a distinct part of the user/business process.
4. Give a Stage a short Stage Goal when that makes the purpose of its requirements clearer.
5. Persist the Scenario's core requirements as stable `BI-RPKG-*` Behavior Items.
6. For each BI:
   - write the implementation-independent `Requirement`;
   - write the `Reason` that explains why the requirement exists;
   - keep implementation mechanisms out unless the mechanism itself is part of externally/business-visible behavior.
7. Add or maintain `Migration Delta` only for behavior that is not current truth yet.
8. Split the delta into Evolution Steps. One step = one coherent user-visible migration, extension, removal or new capability.
9. Mark every non-implemented step `URGENT`, `PLANNED` or `POSSIBLE`.
10. For each Evolution Step, record the user-visible change and identify which Behavior Items it adds, changes or removes. Reuse an existing BI identity when the same business requirement remains; create a new BI only when the requirement itself is genuinely new.
11. Link the same Evolution Step into affected Domain and Slice owners as their implementation impact becomes known.
12. When the step is accepted as implemented:
    - update Scenario current flow/branches;
    - promote the resulting BI set to current truth;
    - remove that behavior from active Migration Delta;
    - leave only still-unimplemented evolution as delta.

### Principles

- Scenario identity follows a user need/result, not a button, command, Slice, class or implementation action.
- Behavior Items are core business requirements, not implementation tasks.
- Behavior Items should be few enough to remain meaningful; a large list of method-level mechanics usually indicates implementation detail has leaked upward.
- `Reason` preserves why a rule matters, so refactoring does not accidentally erase a requirement whose implementation happened to change.
- Migration Delta is a delta, not a duplicate future Scenario.
- `POSSIBLE` future evolution stays visibly possible rather than silently becoming a requirement.

### Owners used by this process

- `scenarios/README.md`;
- affected `scenarios/SCN-*.md`;
- affected Domain/Slice owners as downstream consumers of BI/EVO identities.

---

## DOC-UC-02 — Discover and maintain Domain from Behavior Items

### Goal

Derive a coherent Domain model from business behavior instead of starting from current classes, while keeping the Domain documentation focused on semantics, invariants and durable architecture requirements.

### Process

1. Start from the Behavior Items of the Scenario/Stages being implemented or evolved.
2. Identify the business concepts, identities, states, relationships and invariants needed to make those BI true.
3. Identify consistency boundaries before deciding file/class boundaries.
4. Prefer one Aggregate owner when several Domain Objects share one consistency/invariant boundary.
5. Create a separate Domain Object owner only when its independent semantics, lifecycle, reuse or volume of rules make that clearer than keeping it inside the Aggregate owner.
6. In each Domain owner, list the `BI-*` identities it directly **implements**. Do not copy the authoritative BI wording unless a short local explanation is necessary to understand the Domain rule.
7. Describe only Domain meaning that helps understand the model: identity, semantic state/relationships, invariants and operations at the business level. Do not maintain a class/field inventory.
8. Add `DI-*` Domain Implementation Items only when there is a useful durable requirement beyond the BI itself, for example:
   - one domain rule must have one owner rather than be duplicated;
   - a consistency boundary must preserve a particular invariant;
   - an Evolution Step requires stable identity/state authority now to avoid a known later dead end;
   - composition must reuse one semantic operation instead of maintaining parallel transition logic.
9. For each useful `DI-*`, record the requirement, reason and its source (`BI-*`, `EVO-*`, invariant or architecture pressure) when that source is not obvious.
10. Maintain an `Evolution Steps` section for domain owners affected by active Scenario evolution.
11. When evolution is implemented, update current Domain semantics and remove obsolete transitional rules only when implementation compatibility is actually gone.

### Principles

- Behavior Items are inputs to Domain discovery; current Java classes are evidence, not the starting ontology.
- Domain owner boundaries follow semantic consistency, not source-file boundaries.
- An Aggregate file is the default when it keeps shared invariants understandable, but separate Domain Object files are explicitly allowed when they improve clarity.
- A Domain owner may implement BI without needing any `DI-*` item.
- `DI-*` items are architecture requirements, not implementation traces.
- A generic slogan such as “follow DRY” is not a useful `DI-*`; record the concrete duplicated semantic rule that must have one owner and why.

### Owners used by this process

- affected Scenario owners;
- future/current Domain Aggregate/Object owners when discovery justifies them;
- `domain-evolution.md` only for shared evolution mapping across owners.

---

## DOC-UC-03 — Maintain Slice implementation from Behavior Items and Domain

### Goal

A developer can open one Slice and understand which Scenario behavior it realizes, which Domain it uses, which durable implementation requirements matter, and how the Slice is expected to evolve — without a manually maintained copy of current code flow.

### Process

1. Keep the Slice's current application result/responsibility accurate.
2. List the `BI-*` identities the Slice **realizes**.
3. List the semantic Domain owners/capabilities the Slice uses to realize those BI.
4. Treat the Domain as the owner of the business rules it directly implements. The Slice realizes the same BI by orchestrating the provided Domain and required infrastructure; it must not recreate an independent copy of the same domain rule.
5. Add `SI-*` Slice Implementation Items only when a durable implementation/architecture requirement needs to survive normal refactoring, for example:
   - two effects must remain separate recoverable boundaries;
   - a composition must reuse the same application/domain operation as manual recovery rather than create parallel business logic;
   - one operation must use one captured semantic input for its whole execution;
   - an Evolution Step requires a different ownership/composition boundary even though the BI stays the same;
   - a cross-cutting capability must be used consistently by this Slice.
6. For each useful `SI-*`, record the requirement, reason and source (`BI-*`, `EVO-*`, Domain constraint or concrete architecture concern) where useful.
7. Do not document method names, service call chains, field reads/writes or adapter-level routing as Slice truth. Inspect source or a generated implementation trace for those details.
8. Maintain `Evolution Steps` for every active Scenario Evolution Step that changes the Slice. For each step record:
   - which BI contribution changes;
   - which Domain owners change or remain stable when material;
   - which `SI-*` requirements are introduced/changed/removed, if any;
   - a local architecture decision only when needed.
9. When the step is implemented, update the Slice's current responsibility/BI realization and fold durable implementation requirements into current truth.

### Principles

- Slice realizes Scenario behavior; Domain directly embodies the business rules it owns.
- One BI may therefore be referenced by both a Domain owner (`implements`) and a Slice (`realizes using Domain`) without duplication of BI authority.
- Do not create a separate Slice for every action, state transition, journal, Git command or class.
- An existing Slice may evolve through internal modular expansion or composition.
- A separate supporting Slice requires an independently meaningful capability/result or recovery/composition boundary, not merely implementation size.
- Concrete DRY/composition requirements belong in `SI-*` only when they protect one real semantic behavior from duplicate implementations.

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
4. If a shared capability exists, create a Cross-cutting Capability owner and document it in the same style as a Slice:
   - responsibility/result;
   - Behavior Items it realizes, when any BI is genuinely cross-cutting;
   - Domain it uses;
   - optional Implementation Items;
   - Evolution Steps;
   - material architecture decisions.
5. Have consuming Slices reference that owner rather than duplicate its durable rules.
6. Keep implementation call/field traces generated from source rather than manually copied into the owner.

### Principles

- “Cross-cutting Slice” may be useful informal language, but the owner is about a shared capability, not necessarily a vertical user Slice.
- Do not create a Cross-cutting Capability only to host abstract principles such as DRY, logging or “use composition”.
- Create it when there is a durable shared responsibility whose ownership otherwise becomes ambiguous or duplicated.

---

## DOC-UC-05 — Maintain architecture through understanding the evolution process

### Goal

Use visible product evolution to make better Domain/Slice architecture decisions now without implementing speculative future systems.

### Process

For the capability being changed:

1. Read current Scenario behavior and Behavior Items.
2. Read relevant `URGENT` and `PLANNED` Evolution Steps.
3. Read `POSSIBLE` steps only as context when they expose pressure on the same architecture boundary.
4. Follow affected BI into Domain owners and affected Slices.
5. Identify which Domain concepts/consistency boundaries must change and whether a `DI-*` is needed.
6. Identify which Slice/cross-cutting composition or ownership must change and whether an `SI-*` is needed.
7. Identify concrete architecture pressure, for example:
   - stable identity reused by later behavior;
   - one shared invariant that several capabilities must interpret identically;
   - authority moving from one representation to another;
   - a recoverable boundary becoming independently meaningful;
   - a legacy concept expected to disappear;
   - a current implementation choice that forces a known rewrite in an already selected later step.
8. Choose the smallest design that correctly implements the selected behavior, preserves current invariants, avoids known `URGENT`/`PLANNED` dead ends and does not implement `POSSIBLE` evolution prematurely.
9. Record the decision at the narrowest owner:
   - business behavior/reason → Scenario BI;
   - Domain semantics/invariants/consistency → Domain owner / `DI-*`;
   - Slice composition/orchestration/implementation boundary → Slice / `SI-*`;
   - real shared implementation responsibility → Cross-cutting Capability;
   - exact independent external protocol → focused contract.
10. Create a separate architecture/decision owner only when the decision is genuinely cross-cutting or too substantial to understand in those owners.

### Principles

- Evolution-aware, not speculation-driven.
- Evolution Steps can create `DI-*`/`SI-*` requirements even when the user-facing BI does not change, because implementation architecture may need to move to support selected future behavior safely.
- Possible future behavior helps detect pressure and dead ends; it is not permission for generic machinery.
- The maintained trace is semantic, not a code call graph:

```text
Scenario / Stage
→ Behavior Items
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
3. When low-level implementation understanding is needed, inspect source directly or use a generated implementation trace if tooling is available.
4. A generated trace should be disposable, derived from source and tied to its source revision. Useful generated information may include:
   - root symbol;
   - callers/callees;
   - fields read/written;
   - referenced types;
   - external/infrastructure boundaries;
   - branch/result information when statically derivable with confidence.
5. Store generated traces at a fixed discoverable path when such tooling is introduced; `generated/implementation-traces/` under this application documentation root is the recommended location.
6. Regenerate rather than manually edit a stale trace.
7. Do not use a generated trace as authority for business semantics, domain invariants or architecture intent; those remain in Scenario/Domain/Slice documentation.

### Current boundary

No implementation-trace generator is established by this documentation package. This use case defines the desired boundary so future tooling can improve implementation discoverability without forcing manually maintained runtime/call-flow prose into durable owners.

---

## Template use

Recommended owner/entry forms are collected in [`documentation-templates.md`](documentation-templates.md).

Templates are starting forms, not schemas. Use the smallest structure that preserves the required meaning; omit, combine, rename or add sections when the concrete owner is clearer that way.

---

## Integration rule for existing Replacement Package App documentation

Adoption is incremental.

This owner establishes the documentation model before rewriting every existing Scenario/Domain/Slice document.

A following documentation-integration step should:

1. reconcile accepted current Scenario truth;
2. persist Scenario Stages and core Behavior Items with `Requirement + Reason`;
3. derive active `URGENT` / `PLANNED` / `POSSIBLE` Migration Delta and stable `EVO-RPKG-*` steps;
4. perform Domain discovery from those BI before deciding Aggregate/Object owner files;
5. map each Domain owner to the BI it implements and add `DI-*` only where useful;
6. map each Slice to the BI it realizes and Domain it uses, adding `SI-*` only where useful;
7. populate `domain-evolution.md` only for shared semantic evolution that benefits from a cross-owner map;
8. introduce a Cross-cutting Capability owner only when a real shared responsibility justifies it;
9. keep code-level traces out of normative docs and use generated derived traces when tooling becomes available;
10. record only architecture decisions already material to current or selected evolution;
11. keep unaffected documentation unchanged.
