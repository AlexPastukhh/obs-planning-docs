# Replacement Package App — Documentation Use Cases

Status: active documentation-maintenance owner
Scope: how Replacement Package App documentation designs and preserves Scenario behavior, discovers Domain meaning, derives concrete implementation/proof requirements through reusable Requirements Discovery, describes Slice/shared realization, stays evolution-aware, keeps source-level implementation evidence derived rather than manually duplicated, and maintains readable physical representation without confusing file boundaries with semantic authority.

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
16. why every durable documentation owner exists and which explicit use case/process creates, maintains or consumes it;
17. how one logical documentation owner may be physically decomposed for focused reading/maintenance without creating competing semantic authority;
18. how reusable Implementation/Proof Requirements Discovery questions and candidate Patterns derive concrete owner-local Implementation/Test Items without becoming project-specific authority themselves.

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
   ├─ Implementation Requirements Discovery ↔ Proof Requirements Discovery
   │  ↔ reusable Pattern Registry candidate answers
   ├─ material selected production answers → Domain / Slice / shared Implementation Items
   ├─ material selected proof answers → local Test Items
   ├─ coupled implementation/proof Items → Item Groups
   └─ failing credible proof → production code → green/refactor
↘ material implementation/proof evidence may feed back into Scenario Process / FI design
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

## Shared concepts

Shared methodology concepts are physically separated for focused reading; together they remain part of this same documentation-methodology authority.

- [Behavior and Scenario Design](documentation-use-cases/concepts-behavior.md)
- [Evolution and Implementation](documentation-use-cases/concepts-evolution-implementation.md)
- [Proof and Documentation](documentation-use-cases/concepts-proof-documentation.md)

## Requirements Discovery and reusable Patterns

- [Requirements Discovery — Implementation and Proof](documentation-use-cases/requirements-discovery/README.md) defines the normative material-answer → Item, cross-discovery and Item Group rules.
- [Requirements Pattern Registry](documentation-use-cases/patterns/REGISTRY.md) routes reusable candidate answers; Patterns are not mandatory architecture and do not become Items until selected/adapted into a concrete owner requirement.

## Documentation Use Case routing

Before substantial documentation work, consult [`documentation-use-case-registry.md`](documentation-use-case-registry.md) to identify candidate Use Cases from explicit triggers, then read the applicable detailed Use Cases before relying on them for material decisions/changes. Several Use Cases may apply to one action.

The registry is a compact routing layer, not a replacement for the detailed Use Cases.

## Documentation Use Cases

The files below are the canonical detailed definitions. This file remains the stable methodology entry point.

- [DOC-UC-01 — Maintain Scenario behavioral specification and evolution](documentation-use-cases/maintain-scenario.md)
- [DOC-UC-02 — Discover and maintain Domain from Behavior Items](documentation-use-cases/maintain-domain.md)
- [DOC-UC-03 — Maintain Slice implementation from Behavior Items and Domain](documentation-use-cases/maintain-slice.md)
- [DOC-UC-04 — Maintain Shared Implementation Capability when shared responsibility is real](documentation-use-cases/maintain-shared-implementation.md)
- [DOC-UC-05 — Maintain evolution-aware implementation architecture](documentation-use-cases/maintain-evolution-aware-architecture.md)
- [DOC-UC-06 — Inspect current implementation without duplicating source documentation](documentation-use-cases/inspect-current-implementation.md)
- [DOC-UC-07 — Explore and select Scenario and Screen design](documentation-use-cases/explore-scenario-screen-design.md)
<a id="doc-uc-evolution-steps-map"></a>
- [DOC-UC-08 — Plan Evolution Steps and material impact timing](documentation-use-cases/plan-evolution.md)
<a id="doc-uc-semantic-readability"></a>
- [DOC-UC-09 — Communicate documentation meaning clearly](documentation-use-cases/communicate-meaning-clearly.md)
<a id="doc-uc-documentation-ownership"></a>
- [DOC-UC-10 — Maintain use-case-driven documentation ownership](documentation-use-cases/maintain-documentation-ownership.md)
- [DOC-UC-11 — Maintain selected Screen model](documentation-use-cases/maintain-screen-model.md)
- [DOC-UC-12 — Plan and realize credible proof](documentation-use-cases/plan-realize-proof.md)
<a id="doc-uc-documentation-representation"></a>
- [DOC-UC-13 — Maintain documentation representation and decomposition](documentation-use-cases/maintain-documentation-representation.md)
- [DOC-UC-14 — Maintain Requirements Discovery and reusable Pattern Library](documentation-use-cases/maintain-requirements-discovery-pattern-library.md)

## Template use

Recommended owner/entry forms are collected in [`documentation-templates.md`](documentation-templates.md).

Templates are starting forms, not schemas. Use the smallest structure that preserves required meaning; omit, combine, rename, reorder or add sections when the concrete owner is clearer that way.

Unlike a passive template catalog, Documentation Use Cases link directly to relevant forms at the process step where they are needed. DOC-UC-09 additionally governs readable presentation of the information inside those forms.

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
19. preserve semantic naming/readability/no-orphan rules and explicit use-case/process coverage; use DOC-UC-13 when a logical owner needs clearer physical decomposition without changing semantic authority;
20. when Domain/Slice/Shared/proof owners are migrated, use Requirements Discovery to derive material Implementation/Test Items, group coupled implementation/proof decisions, and keep reusable questions/Patterns in methodology rather than copying them into each owner;
21. keep unaffected current documentation unchanged until its actual migration is performed.

This methodology update does **not** itself claim that existing Scenario, Screen, Slice, Domain, testing or acceptance owners have already been migrated to these target forms.

## Physical authority rule

This index, [`documentation-use-case-registry.md`](documentation-use-case-registry.md), and the linked concept/use-case/Requirements-Discovery/Pattern/integration files form one documentation-methodology authority. Physical separation exists for progressive disclosure and focused maintenance; it does not create competing copies of meaning.
