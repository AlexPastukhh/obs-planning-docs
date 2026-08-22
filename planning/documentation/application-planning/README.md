# Solution And Application Planning Documentation Index

Status: active reusable methodology-family index
Scope: plan the best whole solution/workflow first; when own Application responsibility is selected, plan current application behavior and downstream realization proportionally through directed Scenario / Domain / Slice (SDS) planning.

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
   → candidate/current Application Scenarios
   → Prototype Planning when useful
   → Scenario discovery / Scenario owners
   → optional Screen / Requirement detail
   → optional Domain Discovery / selected Domain meaning
   → optional pre-Slice Application Realization stress review
   → Slice Strategy / Implementation Slices when useful
   → implementation
      → ordinary local adaptation when implementation detail requires it
      → explicit upstream finding only when new evidence materially challenges selected Scenario/Domain/Slice meaning
   → semantic ReviewDiff of actual uncommitted transition
   → repeated cross-owner / whole-application / whole-solution consistency review when material
```

Planning Item, Planning Draft, Full Picture Matrix and the reusable Goal Map are not active target stages/artifacts. Current owners remain real responsibilities. Whole-solution and cross-owner integration review remain required review responsibilities when relevant, but do not require a separate mandatory artifact/entity.

## SDS Planning Family

`SDS` means the directed Application planning pattern:

```text
Scenario
→ Domain / Rules when separate Domain meaning helps
→ Slice Strategy / Slices
```

The dependency direction is semantic: downstream realization consumes upstream selected meaning. A later stage may expose genuinely new evidence or contradiction, but it does not normally design upstream behavior for implementation convenience.

Three representation scales use the same semantic correctness rules:

```text
Mini SDS
→ one compact current planning surface when that remains reviewable

Modular SDS
→ the same current plan split into Scenario/shared-Idea/Domain/Slice owners and an execution-order projection as the plan grows

Full SDS
→ the rich detailed Scenario / Domain / Slice workspace profile with Scenario DATA, Behavior Items, Requirements, Screens, Domain/Slice workspaces and proportional variants/verification
```

`Mini → Modular` is structural growth, not a later semantic stage. Split when reviewability, independent change/review cadence, shared material or Working-Context Load justifies it; raw Scenario count is only a practical signal.

Repeated `собери идеи` may update the same current SDS plan. New selected meaning is integrated into the real Scenario/Domain/Slice owners instead of accumulating an append-only command-result ledger or parallel Goal Map.

## Execution Order And Versions

Planning dependency direction and implementation execution order are different responsibilities.

```text
Scenario → Domain → Slice
= what meaning depends on what

SL-1 → {SL-2 || SL-3} → SL-4
= how already selected work is intended to be carried out
```

Execution order may therefore be partial rather than artificially total. Independent Slices may be marked parallel; dependencies and order-sensitive handoffs remain explicit.

In Mini SDS the selected execution order may be one section of the compact plan. In Modular/Full SDS it may be a separate `execution-order.md`-style projection that links canonical owners without becoming another semantic authority.

For Application delivery, the execution-order projection may group Slices by versions/releases when useful:

```text
Version 1
→ selected usable Slice set/order

Version 1.1 / Version 2
→ later selected Slice set/order
```

A Version is delivery grouping, not a mandatory semantic layer between Scenario and Slice.

## Post-Planning Realization Feedback

Steps through Scenario / Domain / Slice are pre-implementation planning. Actual realization is downstream and normally repeats per selected Slice/change:

```text
selected Slice/change
→ implementation attempt
→ ordinary local implementation adaptation when semantics stay unchanged
→ explicit upstream finding when new real evidence contradicts selected meaning
→ rebuild affected downstream planning only when that upstream finding is accepted
→ semantic ReviewDiff of the actual uncommitted transition
```

`UC-PLAN-REALIZATION` remains an optional **pre-Slice** high-level feasibility/stress review. It is not the post-implementation feedback loop.

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
14. `../profiles/sds-planning-profiles.md` for Mini/Modular/Full SDS representation guidance; Full SDS routes onward to the rich Scenario/Domain/Slice docs profile
15. other type-specific templates under `templates/`
16. project-local Scenario Catalog / prototype artifacts / Scenarios / Screens / Requirements / Domains / Slices / current owners.

## Core Concepts

- **Whole Solution / Workflow** — integrated candidate answer; existing tools/manual/no-change/custom app/hybrids are equal candidates.
- **Real-World Problem-Resolution Workflow** — trigger-to-primary-result path in the user's actual life/work context; it may include actions before and after application use.
- **Open Solution Slot** — addressable unresolved place inside that workflow where a Need, available inputs and desired output are known but the best fill is not; it is a planning surface, not a new mandatory owner/stage.
- **Viable Existing Alternative** — an existing solution/process/integration that materially covers the relevant Need/slot and therefore remains a real comparator while custom-vs-existing selection is open.
- **Application Concept** — reviewed custom-application candidate explaining its life/workflow simplification, Concept Features, interaction hypotheses, feasibility and rough development/maintenance burden before detailed behavior planning.
- **Application Concept Feature** — Concept-scoped capability/value hypothesis; not automatically an Application Scenario or Slice and not a mandatory global Feature layer.
- **Application responsibility** — selected only when the whole solution actually needs application behavior.
- **Application Scenario** — semantic identity/navigation for an independently useful application Need/result.
- **Prototype Planning** — provisional interaction/workflow design/evidence before canonical detailed Scenario/Screen authority.
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
- **Execution Order** — current delivery projection of selected Slices/dependencies/parallel groups/versions; not a second behavior/domain authority.
- **Current Draft Plan** — current selected baseline named inside a detailed draft's Q/R/P or Better Route unit; not a file/entity/stage.
- **Planning Unit Variant** — integrated alternative design of one Scenario/Screen/Domain/Slice; not a runtime branch, Idea Variant or document revision.
- **Reference Object Candidate** — canonical literal meaning that may benefit from Linked Notes literal stale-copy checking/synchronization when intentionally materialized in other files.

## Recommended Project-Local Organization

A compact Mini SDS may stay in one file. When physical separation helps, a Modular/Full plan may use the current broad zones from [`requirements-and-change-context.md`](requirements-and-change-context.md):

```text
solution-and-application/
→ solution / concept / prototype / scenarios / screens
→ shared ideas / requirements / implementation-scoped idea intake / change axes

domain-and-implementation/
→ domain / slice strategy / slices
→ implementation-planning idea intake

execution-order.md when a separate current delivery projection materially improves review/navigation
```

This is organization only: it does not create new semantic owners or registered parallel-work scopes.

## Detailed Planning

[`detailed-planning/README.md`](detailed-planning/README.md) owns the shared low-level contract for current Scenario/Screen/Domain/Slice meaning, workspace topology, Variants, draft state, Requirements/dependencies, verification and Reference Object Candidate review.

Practical walkthrough: [`examples/DETAILED-PLANNING-WORKSPACE-EXAMPLE.md`](examples/DETAILED-PLANNING-WORKSPACE-EXAMPLE.md).

## Domain ↔ Realization Co-Design

Selected proportional route:

```text
Scenario / Requirement evidence
→ Domain Discovery / candidate Domain variants
→ UC-PLAN-REALIZATION comparative evidence when material
→ UC-PLAN-DOMAIN selection
→ Slice Strategy / Slice
→ implementation / Testing
```

Realization supplies feasibility/cost/performance/consistency evidence; it does not own Domain truth. Candidate Slice/realization detail may be deepened only enough to discriminate a material Domain choice.
