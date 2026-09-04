# Replacement Package App — Documentation Use Case Registry

Status: active routing index; physical part of the Documentation Use Cases methodology authority  
Scope: compact routing index for deciding which detailed Documentation Use Cases must be inspected for a concrete documentation-planning/maintenance action.

## Routing rule

For substantial documentation work:

```text
requested action / current Work
→ read this registry
→ identify candidate UC(s) from Trigger
→ read those detailed UC(s)
→ apply the relevant processes/principles together
```

- `Trigger` means **consider this UC**, not “apply it blindly”.
- Several UCs may apply to one action; one UC may require several actions.
- Read a candidate detailed UC before relying on it for a material decision/change.
- If no UC fits, do not invent one automatically; first decide whether the work is outside this methodology or exposes a real methodology gap.
- Methodology is a default guide, not an infallible algorithm. Keep a material justified deviation visible in Work/Session state when that state exists.
- Physical file movement/splitting does not itself create semantic authority: representation → DOC-UC-13; semantic ownership/coverage → DOC-UC-10.

Detailed definitions: [`documentation-use-cases/`](documentation-use-cases/)  
Shared concepts / methodology entry point: [`documentation-use-cases.md`](documentation-use-cases.md)

## Registry

### DOC-UC-01 — Maintain Scenario behavioral specification and evolution

Detailed: [`maintain-scenario.md`](documentation-use-cases/maintain-scenario.md)  
**Trigger:** selected/current/planned Scenario behavioral authority is created, reconciled or changed.  
**Use when:** maintaining Benefit, Scenario/FI process, BI/local UI, Scenario Evolution Steps or material Realization Dependencies.  
**Do not use for:** unselected design alternatives → DOC-UC-07; Screen spatial truth → DOC-UC-11; durable implementation HOW → DOC-UC-02/DOC-UC-03/DOC-UC-04/DOC-UC-05.  
**Related / may route to:** DOC-UC-02, DOC-UC-03, DOC-UC-05, DOC-UC-07, DOC-UC-08, DOC-UC-09, DOC-UC-11, DOC-UC-12.

### DOC-UC-02 — Discover and maintain Domain from Behavior Items

Detailed: [`maintain-domain.md`](documentation-use-cases/maintain-domain.md)  
**Trigger:** BI/invariants require coherent Domain meaning, consistency boundaries or durable Domain requirements.  
**Use when:** maintaining Aggregates/Domain Objects, invariants, BI ownership, `DI-*`, local Domain proof or Domain Evolution Impact.  
**Do not use for:** deriving ontology from classes; Slice orchestration → DOC-UC-03; broad evolution pressure → DOC-UC-05; exact source mechanics → DOC-UC-06.  
**Related / may route to:** DOC-UC-01, DOC-UC-03, DOC-UC-05, DOC-UC-06, DOC-UC-12, DOC-UC-14.

### DOC-UC-03 — Maintain Slice implementation from Behavior Items and Domain

Detailed: [`maintain-slice.md`](documentation-use-cases/maintain-slice.md)  
**Trigger:** selected behavior needs Slice-level composition/orchestration/recovery/ports or durable Slice requirements.  
**Use when:** maintaining Slice result, BI/Domain realization, `SI-*`, local proof or Slice Evolution Impact.  
**Do not use for:** redefining Scenario behavior; forcing FI=Slice; Domain invariants → DOC-UC-02; call-chain documentation → DOC-UC-06.  
**Related / may route to:** DOC-UC-01, DOC-UC-02, DOC-UC-04, DOC-UC-05, DOC-UC-06, DOC-UC-12, DOC-UC-14.

### DOC-UC-04 — Maintain Shared Implementation Capability when shared responsibility is real

Detailed: [`maintain-shared-implementation.md`](documentation-use-cases/maintain-shared-implementation.md)  
**Trigger:** several Slices create pressure for one real reusable implementation responsibility with real consumers/contract.  
**Use when:** deciding/maintaining shared responsibility, consumers, durable shared requirements, proof or Evolution Impact.  
**Do not use for:** generic DRY/helper similarity, speculative future mechanisms or Slice-local responsibility.  
**Related / may route to:** DOC-UC-03, DOC-UC-05, DOC-UC-06, DOC-UC-12, DOC-UC-14.

### DOC-UC-05 — Maintain evolution-aware implementation architecture

Detailed: [`maintain-evolution-aware-architecture.md`](documentation-use-cases/maintain-evolution-aware-architecture.md)  
**Trigger:** materially known Scenario evolution creates pressure on current Domain/Slice/shared boundaries.  
**Use when:** deciding whether stable seams/ports/identity/ownership or `DI-*`/`SI-*`/shared requirements are justified now to avoid avoidable Forced Migration.  
**Do not use for:** defining WHAT evolution changes → DOC-UC-01; planning WHEN/order/readiness → DOC-UC-08; prematurely implementing future behavior.  
**Related / may route to:** DOC-UC-01, DOC-UC-02, DOC-UC-03, DOC-UC-04, DOC-UC-08, DOC-UC-12, DOC-UC-14.

### DOC-UC-06 — Inspect current implementation without duplicating source documentation

Detailed: [`inspect-current-implementation.md`](documentation-use-cases/inspect-current-implementation.md)  
**Trigger:** exact production/test mechanics or technical feasibility must be inspected for a concrete question.  
**Use when:** source/infrastructure mechanics matter, a Realization Dependency needs investigation, or a derived implementation trace helps.  
**Do not use for:** making call graphs/classes normative behavior/architecture or manually maintaining source traces.  
**Related / may route to:** DOC-UC-01, DOC-UC-02, DOC-UC-03, DOC-UC-04, DOC-UC-07.

### DOC-UC-07 — Explore and select Scenario and Screen design

Detailed: [`explore-scenario-screen-design.md`](documentation-use-cases/explore-scenario-screen-design.md)  
**Trigger:** Scenario/FI composition or Screen realization is not yet selected, materially uncertain or has meaningful alternatives.  
**Use when:** exploring Benefit→Scenario, FI/process variants, candidate BI/feasibility, Screen variants and their bidirectional design effects.  
**Do not use for:** routine selected Scenario maintenance → DOC-UC-01; selected Screen maintenance → DOC-UC-11; treating rejected alternatives as current truth.  
**Related / may route to:** DOC-UC-01, DOC-UC-06, DOC-UC-09, DOC-UC-11.

### DOC-UC-08 — Plan Evolution Steps and material impact timing

Detailed: [`plan-evolution.md`](documentation-use-cases/plan-evolution.md)  
**Trigger:** canonical Scenario Evolution Steps exist and their dependency/order/horizon/likelihood/readiness needs planning visibility.  
**Use when:** maintaining Evolution Steps Map relationships, gates, readiness, parallelism or materially independent impact timing.  
**Do not use for:** redefining WHAT a step changes → DOC-UC-01; duplicating lower-owner Impact; encoding roadmap order in semantic IDs.  
**Related / may route to:** DOC-UC-01, DOC-UC-05, DOC-UC-09.

### DOC-UC-09 — Communicate documentation meaning clearly

Detailed: [`communicate-meaning-clearly.md`](documentation-use-cases/communicate-meaning-clearly.md)  
**Trigger:** durable documentation is authored/revised and local semantic presentation/readability needs attention.  
**Use when:** structuring prose/bullets/maps, preserving conditions/boundaries/rationale, making contrasts explicit, or improving semantic names.  
**Do not use for:** document-level size/cohesion → DOC-UC-13; deciding semantic ownership → DOC-UC-10.  
**Related / may route to:** DOC-UC-10, DOC-UC-13 and the owner-specific UC whose output is being written.

### DOC-UC-10 — Maintain use-case-driven documentation ownership

Detailed: [`maintain-documentation-ownership.md`](documentation-use-cases/maintain-documentation-ownership.md)  
**Trigger:** a durable semantic documentation owner is created/retained/moved/questioned and its authority or maintenance reason is unclear.  
**Use when:** checking use-case/process coverage, authority boundary, maintenance reason, consumers or whether information belongs to an existing owner.  
**Do not use for:** treating every file as an owner or requiring a new owner because one file is large; physical decomposition → DOC-UC-13.  
**Related / may route to:** DOC-UC-09, DOC-UC-13 and the application process that justifies the semantic owner.

### DOC-UC-11 — Maintain selected Screen model

Detailed: [`maintain-screen-model.md`](documentation-use-cases/maintain-screen-model.md)  
**Trigger:** a selected Screen/window model exists and its canonical spatial/visibility/action/navigation meaning needs maintenance.  
**Use when:** maintaining Scenario×Screen/FI×Screen relations, Screen responsibilities/requirements or Screen Evolution Impact.  
**Do not use for:** Scenario/FI behavioral authority → DOC-UC-01; treating Screens as frontend Slices; unselected alternatives → DOC-UC-07.  
**Related / may route to:** DOC-UC-01, DOC-UC-07, DOC-UC-08, DOC-UC-09.

### DOC-UC-12 — Plan and realize credible proof

Detailed: [`plan-realize-proof.md`](documentation-use-cases/plan-realize-proof.md)  
**Trigger:** selected semantic/implementation meaning needs credible automated/practical proof, proof design or shared testing decisions.  
**Use when:** selecting proof layer, Tests/Test Items, test-first realization, Test Design/experiment, Test Strategy/Shared Test Capability or Practical Acceptance/Evidence.  
**Do not use for:** making tests semantic authority, documenting exact test methods/fixtures, or claiming PASS from unexecuted plans.  
**Related / may route to:** DOC-UC-01, DOC-UC-02, DOC-UC-03, DOC-UC-04, DOC-UC-05, DOC-UC-06, DOC-UC-14.

### DOC-UC-13 — Maintain documentation representation and decomposition

Detailed: [`maintain-documentation-representation.md`](documentation-use-cases/maintain-documentation-representation.md)  
**Trigger:** one logical owner is hard to consume/review/maintain because of physical size, mixed independently readable parts or poor progressive disclosure.  
**Use when:** splitting one logical owner across files, separating index/navigation from detail, reorganizing focused sections or preserving navigation after movement.  
**Do not use for:** creating semantic owners merely because a file is large, splitting solely by line count, or deciding new semantic authority → DOC-UC-10.  
**Related / may route to:** DOC-UC-09, DOC-UC-10 and the owner-specific UC for the content being decomposed.

### DOC-UC-14 — Maintain Requirements Discovery and reusable Pattern Library

Detailed: [`maintain-requirements-discovery-pattern-library.md`](documentation-use-cases/maintain-requirements-discovery-pattern-library.md)  
**Trigger:** a recurring implementation/proof requirements question or reusable candidate solution needs to be added, refined, split, linked, merged or retired.  
**Use when:** maintaining reusable Requirements Discovery question sets, cross-discovery routing, Item Group derivation rules, Pattern Registry metadata or reusable Pattern definitions consumed by DOC-UC-02/03/04/05/12.  
**Do not use for:** storing concrete project DI/SI/shared/Test Items or one-off source mechanics; those belong to concrete implementation owners/source.  
**Related / may route to:** DOC-UC-02, DOC-UC-03, DOC-UC-04, DOC-UC-05, DOC-UC-10, DOC-UC-12, DOC-UC-13.
