# Scenario / Domain / Slice (SDS) Planning Profiles

Status: active reusable profile family
Scope: three physical/addressability profiles for the same-quality Application planning semantics, from one-file planning through a rich detailed owner topology.

Canonical Application owners remain under `../application-planning/`. Profile choice changes physical organization and addressability only; it does not weaken planning quality or change Scenario/Domain/Slice authority.

## 1. Same-Quality Invariant

Mini, Modular/Medium and Full SDS use the same planning-quality contract.

```text
STEP 0 — WHY / SOLUTION DISCOVERY
Real-Life Situation / Need
→ Current Reality
→ solution alternatives / research when useful
→ Application Concept when own software is justified
→ Application Responsibility
→ Prototype when useful
→ Prototype Scenarios / Screens
→ candidate DATA / Behavior / Requirements
→ selected Application responsibility

STEP 1 — SCENARIO
Application Scenario
+ Scenario DATA
+ Behavior Items
+ Requirements / Screens when material

STEP 2 — DOMAIN
Domain Draft
→ concepts / relationships
→ state / lifecycle
→ rules / invariants / policies
→ likely/evidence-backed variation

STEP 3 — REALIZATION / SLICES
Slice Strategy
→ vertical Slice(s)
→ frontend / server / other implementation-part plans when justified

target code/workspace realization
→ WEUC Types when useful
→ contextual WEUC Instances
→ likelihood / value / timing
→ expected Workspace Change Paths
→ friction / fan-out / risk
→ Change Pressure / Change Axes
→ Architecture Decisions when warranted
→ adjust architecture / Slice planning only where evidence warrants

verification planning before implementation
→ UC-PLAN-TEST-STRATEGY when shared/layer policy is material
→ UC-PLAN-TEST-DESIGN for material selected behavior
→ UC-PLAN-TEST-PLAN when an operated acceptance pass/campaign is useful

STEP 4 — PRACTICAL REALIZATION FEEDBACK
implementation
→ execute selected automated / human / AI / E2E proof
→ actual evidence
→ UC-PLAN-TEST-COVERAGE when current evidence must be reviewed
→ semantic ReviewDiff
→ upstream correction only for genuine new evidence / contradiction / infeasibility
```

Profile choice never authorizes loss of selected meaning. In particular, Scenario DATA and Behavior Items remain part of Scenario planning in **all three profiles**. Requirements, Screen/spatial meaning, Domain rules, Slice decisions, WEUC evidence and verification meaning are preserved whenever material.

```text
Mini → Modular
= split / reorganize, never summarize away reviewed meaning

Modular → Full
= increase addressability / stable ownership, not semantic reinvention

Full → compact projection
= projection only; reviewed owner meaning is not deleted because the view is smaller
```

`Planning State` should truthfully mark material depths as `reviewed | partial | not selected`. Q/R/P remain attached unresolved/adverse delta to a concrete owner/current planned state.

## 2. Mini SDS

Use Mini SDS for a genuinely small application or bounded application change whose selected rules, Scenarios and realization still remain easy to review together.

Mini SDS is literally one accumulating application-plan file: the compact Application form of a `собери идеи` result.

A recommended shape is:

```text
application-plan.md

Source / Baseline / Real-Life Basis
Key Points / Review Priority
Current Plan Snapshot
Questions / Risks / Problems when material

STEP 0 — Why / Solution Discovery
STEP 1 — Scenarios
  + Scenario DATA
  + Behavior Items
  + Requirements / Screens when material
STEP 2 — Domain Draft
STEP 3 — Slice Strategy / Slices
  + implementation-part plans when material
  + WEUC Types / contextual instances / likelihood / change paths when material
  + architecture pressure/decisions when material
  + Test Strategy/Design/Practical Test Plan when material
STEP 4 — implementation + executed evidence + Coverage/ReviewDiff feedback

Execution Order / versions when useful
Current Overall Conclusions
```

A single file is a physical convenience, not a monolithic semantic authority. Repeated `собери идеи` updates this same selected Current Plan instead of creating a transcript of command results.

Mini is appropriate only while this full-quality content remains cheap to scan and change. Do not choose Mini by deleting DATA/Behavior/architecture/testing meaning that the application actually needs.

## 3. Modular / Medium SDS

Use Modular SDS (the medium physical profile) when the same-quality Current Plan benefits from several reviewable files but does not need the rich Full workspace topology.

Default starting shape:

```text
planning/
├── application-plan.md
├── domain-draft.md
├── slices.md
└── <additional files only when growth justifies them>
```

Recommended responsibility split:

```text
application-plan.md
→ STEP 0 Why / Solution Discovery
→ STEP 1 Scenario planning
→ Scenario DATA + Behavior Items
→ material Requirements / Screen references
→ Planning State + cross-cutting current conclusions

domain-draft.md
→ STEP 2 selected/candidate Domain meaning
→ concepts / relationships / state / lifecycle
→ rules / invariants / policies
→ evidence-backed likely variation

slices.md
→ STEP 3 Slice Strategy
→ one or several vertical Slices
→ frontend / server / other implementation-part plans when useful
→ verification targets + Test Design/Plan handoff when material
```

Grow the structure only when it becomes useful. Examples:

```text
slices/
  SL-001.md
  SL-002.md

weuc-instances.md
→ contextual future-change evidence becomes independently reviewable

execution-order.md
→ delivery order / parallel groups / releases become independently reviewable

practical-testing.md
→ operated acceptance plan becomes independently reviewable

scenarios/
→ split individual Scenario owners only when Scenario size/cadence justifies it
```

The default is deliberately small: one pre-Scenario/Scenario application-plan file, one Domain Draft file and one Slice file (or several Slice files when useful). It may begin Modular immediately.

Structural growth must preserve all selected Scenario DATA, Behavior Items and other reviewed meaning. Shared meaning is defined once and referenced from affected modules.

## 4. Full SDS

Use Full SDS when stable independent ownership, deep traceability, variants, rich visual/spatial material, many independently changing Scenarios, detailed Domain/Slice workspaces or durable architecture/testing evidence justify a richer topology.

Full SDS routes to [`scenario-domain-slice-docs-profile.md`](scenario-domain-slice-docs-profile.md) and the detailed-planning owners under `../application-planning/detailed-planning/`.

Full uses the **same Step 0–4 reasoning** as Mini/Modular. Its distinction is durable addressability:

- Step 0 solution/concept/prototype meaning may have explicit owner surfaces;
- Scenario workspaces keep Scenario DATA and Behavior Items independently addressable;
- Requirements/Screens/visual material may have stable owners;
- Domain and Slice workspaces may split when useful;
- material contextual WEUC instances are transferred into a stable project-local WEUC Instance Register;
- architecture decisions link the concrete WEUC instances/change paths that justify them;
- practical testing/verification surfaces may be independently maintained.

Full is not “more correct” than Mini/Modular. It stores the same quality of selected meaning in a topology that scales better.

## 5. WEUC / Architecture Evidence In SDS

For implementation architecture, do not reason from generic flexibility alone.

```text
target code/workspace area
→ resolve important Workspace UC Types / current UCs
→ discover WEUC Type candidates when useful
→ enumerate concrete contextual WEUC Instances
→ assess likelihood / horizon / value / confidence
→ assess current-work overlap + preparation-now vs deferred cost
→ trace expected Workspace Change / Understanding / Verification paths
→ consume representative Application Runtime costs when relevant
→ assess read/comprehension + mutation/evolution + verification/diagnosis/operation + runtime costs
→ derive Change Pressure / Change Axes only to supported degree
→ compare Architectural Tax/payoff and implementation sequencing
→ make Architecture Decisions only when concrete payoff warrants complexity
```

Reusable owner: `../architecture-planning/workspace-evolution-use-case-discovery-workflow.md`.

Mini may keep this evidence inline. Modular may split it into `weuc-instances.md` when useful. Full should materialize durable material instances in the project-local WEUC Instance Register so later architecture decisions can be reviewed against the same driving evidence.

## 6. Execution Order And Versions

Execution order is distinct from planning dependency direction.

```text
Scenario → Domain → Slice
= semantic dependency direction

SL-1 → {SL-2 || SL-3} → SL-4
= selected execution order
```

Execution order may be partial. Show parallel groups when sequence is not meaningful; state real dependencies when it is. Application delivery may group selected Slices by version/release. A Version is delivery grouping, not another semantic planning layer.

## 7. Practical Realization Feedback

Steps 0–3 are pre-implementation planning. Material proof design belongs there: `UC-PLAN-TEST-DESIGN` selects how behavior will be proved, and `UC-PLAN-TEST-PLAN` composes a practical operated pass/campaign when useful.

Step 4 is execution and feedback from reality:

```text
selected Slice/change + selected proof plan
→ implementation
→ execute automated / human / AI / E2E proof
→ actual evidence
→ UC-PLAN-TEST-COVERAGE when current evidence must be audited
→ semantic ReviewDiff
→ actual finding
→ ordinary local adaptation when semantics stay unchanged
→ explicit upstream correction only when evidence materially challenges selected meaning
```

Planning must not claim testing/implementation occurred merely because Step 4 is described. `UC-PLAN-TEST-COVERAGE` owns review of actual current executed evidence.

## 8. Current Planning Lenses

Use the same lenses over one accumulating Current Plan:

```text
Real-Life
UC / Scenario
Q/R/P (attached unresolved delta only)
Review Order (derived lens only)
Realization / Evolution
```

The local Current Plan is the integrated working projection that repeated planning updates. Mature selected meaning is synchronized with its real semantic owners; the projection does not become a second product/domain authority.
