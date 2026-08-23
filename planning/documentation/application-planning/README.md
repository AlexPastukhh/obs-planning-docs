# Solution And Application Planning Documentation Index

Status: active reusable methodology-family index
Scope: plan the best whole solution/workflow first; when own Application responsibility is selected, plan current application behavior and downstream realization proportionally through directed Scenario / Domain / Slice (SDS) planning.

## Lifecycle / Application `собери идеи` Shape

Application planning uses one Step 0–4 reasoning contract. `собери идеи` integrates selected source meaning into this current plan proportionally; profile choice only changes physical organization.

```text
STEP 0 — WHY / SOLUTION DISCOVERY

Real-Life Situation / Need
→ Current Reality
→ whole-solution alternatives / research when useful
→ own Application Concept when justified
→ Application Responsibility
→ Prototype when useful
→ Prototype Scenarios / Screens
→ candidate DATA / Behavior / Requirements
→ selected real Application responsibility


STEP 1 — SCENARIO

Application Scenario
+ Scenario DATA
+ Behavior Items
+ Requirements / Screens when material


STEP 2 — DOMAIN

Domain Draft
→ concepts / relationships
→ state / lifecycle
→ invariants / policies / rules
→ likely/evidence-backed variation


STEP 3 — REALIZATION / SLICES + VERIFICATION PLANNING

Slice Strategy
→ vertical Slice(s)
→ frontend / server / other implementation-part plans when justified
→ product/Scenario priority kept distinct from recommended technical implementation sequence

target code/workspace realization
→ important Workspace UC Types / current work when material
→ contextual WEUC Instances
→ likelihood / horizon / value / confidence / current-work overlap
→ expected Workspace Understanding / Change / Verify Paths
→ Architecture Work-Cost / Change Pressure / Decisions only where evidence warrants
→ adjust Slice/architecture only where evidence warrants

verification planning before implementation
→ Test Strategy when shared policy is material
→ Test Design for selected behavior
→ Practical Test Plan when an operated acceptance pass/campaign is useful


STEP 4 — PRACTICAL REALIZATION FEEDBACK

implementation
→ execute selected automated / human / AI / E2E proofs
→ actual evidence
→ current Coverage review when useful
→ semantic ReviewDiff, including proportional architecture work-cost regression check when material
→ upstream correction only when real evidence requires it
```

The current Application Direction Use Cases remain independently activatable/proportional; this flow is orchestration/dependency guidance, not a mandatory ceremony.

## SDS Planning Family

Mini, Modular/Medium and Full SDS use the **same semantic correctness and completeness expectations**. Scenario DATA and Behavior Items are preserved in all profiles; Full does not own “more truth”, only more durable addressability.

- **Mini SDS** — one accumulating application-plan file, appropriate only while a genuinely small app/change remains cheap to review in one surface.
- **Modular / Medium SDS** — the same plan split by default into an application/Scenario file, a Domain Draft file and Slice file(s), then grown only when useful.
- **Full SDS** — rich detailed owner topology with independently addressable Scenario DATA/Behavior, Requirements/Screens, Domain/Slice workspaces, durable WEUC instance evidence and testing/verification surfaces when justified.

Canonical profile contract: [`../profiles/sds-planning-profiles.md`](../profiles/sds-planning-profiles.md).

Repeated `собери идеи` updates the same clearly selected Current Plan. Structural growth preserves reviewed meaning; it does not create a new plan.

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

## Practical Realization Feedback

Steps 0–3 are pre-implementation planning. Step 4 is downstream execution/evidence.

```text
selected Slice/change
→ implementation
→ UC-PLAN-TEST-PLAN when operated acceptance is useful
→ human / AI-operated / E2E evidence
→ semantic ReviewDiff
→ actual finding
→ ordinary local adaptation when semantics stay unchanged
→ upstream correction only when evidence materially challenges selected meaning
```

`UC-PLAN-REALIZATION` remains an optional **pre-Slice** high-level feasibility/stress review. It is not the post-implementation feedback loop. `UC-PLAN-TEST-COVERAGE` reviews actual current executed evidence.

## Read Order

1. `application-planning-responsibility-map.md`
2. `application-planning-principles-and-terminology.md`
3. parent `../planning-concerns-and-decisions-model.md` when material Planning Concerns/Q/R/P or Decision trace are present
4. Idea owners when answer-seeking work is material
5. `direction-registry.md` + `use-case-registry.md`
6. `solution-and-scenario-planning-workflow.md`
7. `requirements-and-change-context.md` when Requirements / Future Scenario Ideas / Change Axes / implementation-scoped Ideas matter
8. `templates/APPLICATION-CONCEPT-DRAFT-TEMPLATE.md` when own application is a material candidate or already mandated but its concept is not grounded
9. `prototype-planning-workflow.md` + Prototype Plan/Result templates when interaction/workflow uncertainty benefits from prototyping
10. [`detailed-planning/README.md`](detailed-planning/README.md) when canonical Scenario/Screen or downstream detailed planning begins
11. `domain-discovery-workflow.md` when Domain evidence/candidates need explicit discovery
12. `domain-planning-workflow.md` when a separate Domain owner materially helps and current Domain meaning must be selected/reviewed
13. `application-realization-workflow.md` when representative runtime/persistence/technical feasibility needs high-level stress review before detailed delivery
14. `slice-planning-workflow.md` when implementation decomposition/Slice planning materially helps
15. `../architecture-planning/workspace-evolution-use-case-discovery-workflow.md` when contextual future code/workspace change evidence materially affects architecture/Slice design
16. `../testing-planning/practical-testing-plan-workflow.md` when a real operated acceptance pass/campaign should be planned
17. `../profiles/sds-planning-profiles.md` for Mini/Modular/Full SDS representation guidance; Full SDS routes onward to the rich Scenario/Domain/Slice docs profile
18. other type-specific templates under `templates/`
19. project-local Scenario Catalog / prototype artifacts / Scenarios / Screens / Requirements / Domains / Slices / WEUC register / testing/current owners.

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
- **WEUC Type** — reusable kind of Workspace evolution work; useful for grouping future-change evidence but insufficient by itself to justify architecture.
- **Contextual WEUC Instance** — one concrete future-change instance against a current/target code/workspace area, assessed by likelihood/value/timing, expected change path and friction/fan-out/risk; architecture evidence, not Application behavior authority.
- **Change Axis** — generic Workspace variability/pressure concept owned by sibling Architecture Planning; derive it only to the degree concrete evidence such as Scenario/Requirement/prototype/WEUC instances supports it.
- **Scenario** — coherent user/actor-visible behavioral unit grounded in a meaningful user-world Need and independently meaningful observable result; informational/read-only behavior is valid when understanding itself is the result, while command/implementation identity alone is insufficient.
- **Scenario Draft workspace** — canonical Scenario behavior plus standard `ideas/`, `data/`, `behavior/`, `visual/` supporting areas.
- **Screen** — spatial/visual owner for an application surface; it may map related Scenarios but does not own their behavior.
- **Domain Discovery** — optional evidence-driven extraction of concepts/identity/lifecycle/rules/invariants/policies/consistency candidates from current Scenario/DATA/Behavior/Requirements before Domain selection.
- **Domain** — optional selected conceptual model/language/lifecycle/rules/boundaries when separate ownership improves planning.
- **Application Realization** — optional high-level runtime/persistence/integration/technical stress review before detailed Slice planning; not Domain authority or task decomposition.
- **Slice Strategy** — optional decomposition/order plan for separately deliverable/checkable implementation increments.
- **Implementation Slice** — one optional separately deliverable/checkable integrated implementation increment after enough behavior/concepts are understood.
- **Execution Order** — current delivery projection of selected Slices/dependencies/parallel groups/versions; not a second behavior/domain authority.
- **Current Draft Plan** — current selected baseline named inside a detailed draft's active/residual Planning Concern/Q/R/P or Better Route unit; not a file/entity/stage. Generic concern/group/priority/category/status/AI-comment/Decision-retention semantics come from `../planning-concerns-and-decisions-model.md`.
- **Planning Unit Variant** — integrated alternative design of one Scenario/Screen/Domain/Slice; not a runtime branch, Idea Variant or document revision.
- **Reference Object Candidate** — canonical literal meaning that may benefit from Linked Notes literal stale-copy checking/synchronization when intentionally materialized in other files.

## Recommended Project-Local Organization

Physical organization follows the selected SDS profile.

```text
Mini
→ application-plan.md

Modular / Medium default
→ application-plan.md        # Step 0 + Scenario + DATA/Behavior
→ domain-draft.md            # Step 2
→ slices.md or slices/       # Step 3
→ add weuc-instances.md / execution-order.md / practical-testing.md only when useful

Full
→ rich Scenario/DATA/Behavior/Requirement/Screen/Domain/Slice workspaces
→ durable project-local WEUC Instance Register when material
→ separate testing/verification surfaces when material
```

These are planning/reviewability layouts, not registered parallel-work scopes or new semantic authorities.

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
