# Solution And Application Planning Documentation Index

Status: active reusable methodology-family index
Scope: plan the best whole solution/workflow first; when own Application responsibility is selected, prototype and plan current application behavior/spatial requirements before optional Domain and implementation delivery planning.

## Lifecycle

```text
Problem / Question / Idea
→ Need / Desired Result
→ Current Reality when useful
→ real-world problem-resolution Workflow Variant(s) when the path matters
   → Open Solution Slot(s) where the best route is still unknown
→ inspect existing solutions / alternatives proportionally
→ candidate slot fills / whole-solution variants
   → manual / process / existing solution / integration / no-change / hybrid
   → Application Concept candidate(s) when own software may be useful
→ preserve viable existing alternatives while custom-vs-existing remains open
→ review Application Concept value + feasibility + rough effort/maintenance when material
→ scoped Idea review/deep planning where uncertainty deserves it
→ whole-solution integration review
→ selected solution responsibility
→ if own Application responsibility is selected/already confirmed:
   selected/current Application Concept
   → explicit Application responsibility
   → candidate/current Application Use Cases
   → Prototype Planning when useful
      → Spine Pass / Walkthrough as discovery technique
      → Prototype Scenarios
      → Prototype Screens
      → candidate Requirements / DATA / Behavior
      → Future Scenario Ideas / Change Axes when material
   → progressive Scenario discovery
   → Scenario Draft workspaces
      + shared/local Ideas
      + Scenario DATA
      + Behavior Items
      + Scenario visual material
      + Related Requirements
   → Screens when spatial/screen UI needs independent ownership
   → Domain Discovery when separate semantic discovery is useful
   → Domain review/selection when separate Domain ownership helps
   → Domain verification meaning proportionally
   → Application Realization review when high-level implementation feasibility materially needs stress-testing
   → Slice Strategy when decomposition materially helps
   → Implementation Slices when useful
   → verification/testing evidence proportionally
   → repeated cross-owner / whole-application / whole-solution integration review
```

Planning Item, Planning Draft and Full Picture Matrix are not active target stages/artifacts. Current owners remain real responsibilities. Whole-solution and cross-owner integration review remain required review responsibilities when relevant, but do not require a separate mandatory artifact/entity.

## Read Order

1. `application-planning-responsibility-map.md`
2. `application-planning-principles-and-terminology.md`
3. Idea owners when answer-seeking work is material
4. `direction-registry.md` + `use-case-registry.md`
5. `solution-and-scenario-planning-workflow.md`
6. `requirements-and-change-context.md` when Requirements / Future Scenario Ideas / Change Axes / implementation-scoped Ideas matter
7. `templates/APPLICATION-CONCEPT-DRAFT-TEMPLATE.md` when own application is a material candidate or already mandated but its concept is not grounded
8. `prototype-planning-workflow.md` + Prototype Plan/Result templates when interaction/workflow uncertainty benefits from prototyping
9. [`detailed-planning/README.md`](detailed-planning/README.md) when canonical Scenario/Screen or downstream detailed planning begins
10. `domain-discovery-workflow.md` when Domain evidence/candidates need explicit discovery
11. `domain-planning-workflow.md` when a separate Domain owner materially helps and current Domain meaning must be selected/reviewed
12. `application-realization-workflow.md` when representative runtime/persistence/technical feasibility needs high-level stress review before detailed delivery
13. `slice-planning-workflow.md` when implementation decomposition/Slice planning materially helps
14. `goal-map.md` when a current working Goal Map would materially help
15. other type-specific templates under `templates/`
16. optional specialized SDS profile for projects that activate that route family
17. project-local Use Cases / prototype artifacts / Scenarios / Screens / Requirements / Domains / Slices / current owners.

## Core Concepts

- **Whole Solution / Workflow** — integrated candidate answer; existing tools/manual/no-change/custom app/hybrids are equal candidates.
- **Real-World Problem-Resolution Workflow** — trigger-to-primary-result path in the user's actual life/work context; it may include actions before and after application use.
- **Open Solution Slot** — addressable unresolved place inside that workflow where a Need, available inputs and desired output are known but the best fill is not; it is a planning surface, not a new mandatory owner/stage.
- **Viable Existing Alternative** — an existing solution/process/integration that materially covers the relevant Need/slot and therefore remains a real comparator while custom-vs-existing selection is open.
- **Application Concept** — reviewed custom-application candidate explaining its life/workflow simplification, Concept Features, interaction hypotheses, feasibility and rough development/maintenance burden before detailed behavior planning.
- **Application Concept Feature** — Concept-scoped capability/value hypothesis; not automatically a Use Case, Scenario or Slice and not a mandatory global Feature layer.
- **Application responsibility** — selected only when the whole solution actually needs application behavior.
- **Application Use Case** — semantic identity/navigation for an independently useful application Need/result.
- **Prototype Planning** — provisional interaction/workflow design/evidence before canonical detailed Scenario/Screen authority.
- **Spine Pass / Spine Walkthrough** — optional discovery technique inside Prototype/Scenario Discovery; not a Scenario type, owner or Use Case.
- **Prototype Scenario** — provisional behavioral design (`PSCN-*`) used to discover/refine eventual Scenario boundaries; not canonical Scenario authority.
- **Prototype Screen** — provisional spatial design (`PSCR-*`) used to discover/refine eventual Screen requirements; not canonical Screen authority.
- **Requirement** — condition/property/constraint the selected solution must satisfy; not automatically a Scenario.
- **Change Axis** — generic Workspace variability/pressure concept owned by sibling Architecture Planning; Application Planning contributes Scenario/Requirement/prototype evidence without making an axis authorization to generalize.
- **Scenario** — coherent user/actor-visible behavioral unit grounded in a meaningful user-world Need and independently meaningful observable result; informational/read-only behavior is valid when understanding itself is the result, while command/implementation identity alone is insufficient.
- **Scenario Draft workspace** — canonical Scenario behavior plus standard `ideas/`, `data/`, `behavior/`, `visual/` supporting areas.
- **Screen** — spatial/visual owner for an application surface; it may map related Scenarios but does not own their behavior.
- **Domain Discovery** — optional evidence-driven extraction of concepts/identity/lifecycle/rules/invariants/policies/consistency candidates from current Scenario/DATA/Behavior/Requirements before Domain selection.
- **Domain** — optional selected conceptual model/language/lifecycle/rules/boundaries when separate ownership improves planning.
- **Application Realization** — optional high-level runtime/persistence/integration/technical stress review before detailed Slice planning; not Domain authority or task decomposition.
- **Slice Strategy** — optional decomposition/order plan for separately deliverable/checkable implementation increments.
- **Implementation Slice** — one optional separately deliverable/checkable integrated implementation increment after enough behavior/concepts are understood.
- **Current Draft Plan** — current selected baseline named inside a detailed draft's Q/R/P or Better Route unit; not a file/entity/stage.
- **Planning Unit Variant** — integrated alternative design of one Scenario/Screen/Domain/Slice; not a runtime branch, Idea Variant or document revision.
- **Reference Object Candidate** — canonical literal meaning that may benefit from Linked Notes literal stale-copy checking/synchronization when intentionally materialized in other files.

## Recommended Project-Local Organization

When physical separation helps, [`requirements-and-change-context.md`](requirements-and-change-context.md) recommends two broad zones:

```text
solution-and-application/
→ solution / concept / prototype / scenarios / screens
→ shared ideas / requirements / implementation-scoped idea intake / change axes

domain-and-implementation/
→ domain / slice strategy / slices
→ implementation-planning idea intake
```

This is organization only: it does not create new semantic owners or registered parallel-work scopes.

## Detailed Planning

[`detailed-planning/README.md`](detailed-planning/README.md) owns the shared low-level contract for current Scenario/Screen/Domain/Slice meaning, workspace topology, Variants, draft state, Requirements/dependencies, verification and Reference Object Candidate review.

Practical walkthrough: [`examples/DETAILED-PLANNING-WORKSPACE-EXAMPLE.md`](examples/DETAILED-PLANNING-WORKSPACE-EXAMPLE.md).

## Reusable Goal Map

[`goal-map.md`](goal-map.md) is an optional reusable current-working surface for a meaningful goal/work direction. It may combine an action map, implementation points and lightweight `Keep In Mind` context while linking out to real canonical owners. It is not the Dashboard application's Goal Map authority and it is not historical logging.
