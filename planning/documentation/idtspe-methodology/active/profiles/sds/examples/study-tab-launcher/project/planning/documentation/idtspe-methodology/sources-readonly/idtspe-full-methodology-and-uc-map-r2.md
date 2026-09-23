# IDTSPE — Full Methodology / Lifecycle Map

Status: planning capture / proposed canonical model  
Working name: **IDTSPE — Idea-Driven Target-State Planning Engine**  
Repository mutation: none

## 0. Core Definition

IDTSPE is the reusable planning-and-change loop currently emerging from the existing `собери идеи` methodology.

Its purpose is broader than "collect a list of ideas":

```text
understand a desired change
+ resolve the correct Target
+ load authoritative Sources
+ review Ideas when they exist
+ surface Q/R/P / Concern Groups
+ compare/select Decisions
+ construct a complete Projected Target State
+ review dependency/reuse impact
+ use current WEUC state as architecture/evolution evidence
+ review projected WEUC impact of the selected realization
+ plan exact realization
+ realize separately when authorized
+ collect practical evidence
+ compare actual result with the plan
+ update WEUC/evidence state
+ correct/replan when required
```

The existing `собери идеи` workflow is therefore best understood as the current incomplete/implicit form of IDTSPE.

IDTSPE does **not** become semantic authority for Scenario, Domain, Slice, Workspace UC, Documentation UC, Architecture Decision or Testing meaning.

It orchestrates their current owners.

---

# 1. Universal, But Proportional

IDTSPE can be used as the common orchestration model for almost any **non-trivial target-state task**.

Examples:

- create a Scenario;
- integrate new Ideas into a Scenario;
- create/revise a Domain;
- plan/revise a Slice;
- change documentation methodology;
- add/change a command;
- change a Workspace UC;
- plan architecture evolution;
- react to implementation/test evidence;
- correct a ReviewDiff;
- plan a file transition.

However:

```text
universal orchestration
≠ mandatory heavy Idea Review for every mechanical task
```

If the task is already fully selected/mechanical:

```text
approved Current Target
→ dependency-aware Pre-Update
→ realization
→ evidence
```

is valid.

Do not manufacture Ideas, variants or Q/R/P merely to satisfy the engine.

Thus the engine is universal while individual stages are proportional.

---

# 2. Main Loop

```text
┌────────────────────────────────────────────────────────────┐
│ 0. GOVERNANCE / ROUTE PREFLIGHT                            │
│    reuse current governance / targeted refresh / full      │
└──────────────────────────────┬─────────────────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────┐
│ 1. TARGET + MODE                                           │
│    what result are we trying to create/change?             │
│    CREATE | INTEGRATE                                      │
└──────────────────────────────┬─────────────────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────┐
│ 2. SOURCE CONTRACT                                         │
│    resolve typed canonical/evidence/constraint sources     │
└──────────────────────────────┬─────────────────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────┐
│ 3. CURRENT BASELINE                                        │
│    Current Target + current planning/WEUC state            │
└──────────────────────────────┬─────────────────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────┐
│ 4. IDEA / CHANGE REVIEW                                    │
│    only when material answer-seeking Ideas exist           │
└──────────────────────────────┬─────────────────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────┐
│ 5. Q/R/P + CONCERN GROUPS                                  │
│    problems/questions/risks attached to real owners        │
└──────────────────────────────┬─────────────────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────┐
│ 6. TARGET VARIANTS / INTEGRATION                           │
│    construct candidate complete target states              │
└──────────────────────────────┬─────────────────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────┐
│ 7. WEUC SOURCE REVIEW                                      │
│    current Workspace evolution/work-cost picture           │
└──────────────────────────────┬─────────────────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────┐
│ 8. REALIZATION / ARCHITECTURE OPTIONS                      │
│    when realization materially affects the target          │
└──────────────────────────────┬─────────────────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────┐
│ 9. PROJECTED WEUC IMPACT REVIEW                            │
│    how each serious option changes recurring Workspace work│
└──────────────────────────────┬─────────────────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────┐
│ 10. DECISIONS + PROJECTED TARGET STATE                     │
│     selected meaning, retained concerns, rationale          │
└──────────────────────────────┬─────────────────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────┐
│ 11. DEPENDENCY / REUSE IMPACT                              │
│     owners, sources, consumers, handoffs, freshness         │
└──────────────────────────────┬─────────────────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────┐
│ 12. PRE-UPDATE                                             │
│     exact dependency-aware file/change plan                │
└──────────────────────────────┬─────────────────────────────┘
                               ▼
                     explicit authorization
                               ▼
┌────────────────────────────────────────────────────────────┐
│ 13. STEP 4 — REALIZATION                                   │
│     implementation / file update / package / execution     │
└──────────────────────────────┬─────────────────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────┐
│ 14. PRACTICAL EVIDENCE                                     │
│     tests / runtime / ReviewDiff / observed work cost       │
└──────────────────────────────┬─────────────────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────┐
│ 15. RECONCILIATION                                         │
│     planned vs actual target + planned vs actual WEUC       │
└──────────────────────────────┬─────────────────────────────┘
                               ▼
                  correct enough? ── yes ──► close
                               │
                               no
                               ▼
                 evidence becomes new Source
                               │
                               └──────────────► IDTSPE
```

---

# 3. Engine Inputs

IDTSPE input is not one untyped "context".

It is a typed Source Contract.

## 3.1 `TRIGGER_SOURCE`

Why the engine is running.

Examples:

- user request;
- new Idea batch;
- ReviewDiff finding;
- runtime incident;
- test failure;
- returned files;
- architecture pressure;
- deadline change.

This source is not automatically canonical semantic truth.

## 3.2 `IDEA_SOURCE`

Answer-seeking proposed meaning.

Examples:

- feature/change ideas;
- architecture ideas;
- documentation methodology ideas;
- possible refinements;
- correction alternatives.

Idea Review runs when this source class is material.

## 3.3 `CANONICAL_SEMANTIC_SOURCE`

Existing source-of-truth meaning.

Examples:

- Real-Life Need / Reality;
- Application Scenario;
- Behavior Items;
- DATA Objects;
- Requirements;
- Screens;
- Domain owners;
- Workspace UC;
- Documentation UC;
- current reusable workflow/model/template;
- current registry owner.

These sources outrank downstream reconstructions.

## 3.4 `CURRENT_TARGET`

Existing target baseline in `INTEGRATE`.

Examples:

- current Scenario;
- current Domain;
- current Slice;
- current Workspace UC;
- current documentation methodology owner;
- current architecture state.

`CREATE` has no current target instance.

## 3.5 `PRACTICAL_EVIDENCE`

Observed reality.

Examples:

- actual implementation;
- executed tests;
- Coverage review;
- runtime behavior;
- ReviewDiff;
- user acceptance;
- operational incident;
- observed maintenance/change cost.

Evidence can invalidate a plan.

It does not silently redefine an upstream owner.

## 3.6 `ARCHITECTURE_EVOLUTION_SOURCE`

Current workspace evolution picture.

Examples:

- Workspace UCs;
- contextual WEUC Types/Instances;
- Understanding Paths;
- Workspace Change Paths;
- Verification paths;
- Runtime paths;
- Change Pressure;
- Change Axes;
- Architecture State;
- Architecture Decisions;
- observed work cost.

This is the **WEUC Source State** consumed by IDTSPE.

## 3.7 `DELIVERY_CONSTRAINT`

Examples:

- deadline;
- milestone;
- release order;
- capacity;
- external dependency;
- operational constraints.

Constraints affect decomposition/ordering/realization.

They do not silently delete semantic requirements.

## 3.8 `PLANNING_STATE_SOURCE`

Existing planning memory that remains material:

- Concern Groups;
- Q/R/P;
- Decisions;
- rejected/deferred alternatives;
- carry-forward findings;
- unresolved ownership questions.

## 3.9 `DEPENDENCY_SOURCE`

Current reuse/source/freshness relations:

- owner links;
- semantic dependencies;
- Reference Objects;
- Reference Object dependencies;
- Review Dependencies;
- generated projections where they exist;
- package/file dependency state.

---

# 4. Target Contract

Every IDTSPE invocation needs a Target Contract.

```text
Target:
  type:
    Scenario | Domain | Slice | WorkspaceUC |
    DocumentationOwner | ArchitectureDecision | ...

  identity:
    existing stable identity for INTEGRATE
    candidate/new identity for CREATE

  semanticOwner:
    canonical workflow/template/registry

  validStateContract:
    what a complete valid target state contains

  sourceRequirements:
    required / proportional Source roles

  evidenceBoundary:
    what evidence may refine/correct this Target

  downstreamHandoffs:
    which sibling/downstream UCs may be needed
```

The Idea shell does not define this contract.

The target-specific owner does.

---

# 5. Main Modes

## 5.1 CREATE

```text
Current Target = none

Trigger / Ideas
+ canonical upstream Sources
+ current WEUC Source State
+ constraints
+ planning state
→ initial complete Projected Target State
```

Examples:

- new Scenario;
- new Domain;
- new Slice;
- new Workspace UC;
- new documentation workflow.

## 5.2 INTEGRATE

```text
Current Target exists

Current Target
+ new Ideas/change meaning
+ current canonical upstream Sources
+ current WEUC state
+ practical evidence
+ constraints
→ Projected Updated Target
+ Delta
+ Preserved Existing Meaning
```

The default is preservation.

Existing valid meaning remains unless a real reason changes it.

## 5.3 EVIDENCE-DRIVEN RECONCILIATION

This is the return path after Step 4.

It is conceptually an INTEGRATE invocation whose important new source is:

```text
PRACTICAL_EVIDENCE
```

Example:

```text
planned Slice
→ implementation
→ runtime proves retry contract wrong
→ evidence enters IDTSPE
→ affected concerns/decisions/target are revised
```

A material correction Idea may emerge during this pass, but evidence itself is not forced into an Idea.

## 5.4 SHOW CURRENT

Not IDTSPE planning.

Separate capability:

```text
canonical Current Target
→ read/normalize/display
```

No proposed state required.

---

# 6. Idea Review Component

The existing `собери идеи` Standard/Deep Idea Review becomes one internal component of IDTSPE.

For material Ideas:

```text
Source / Status
Problem / Need
Proposed Answer
Expected Effect
Necessity / Better Route
Possible Refinements
Local Consistency
Integrated Consistency
Current Conclusion
```

Deep mode additionally uses:

- constraints/unknowns;
- Idea Variants;
- assumptions/dependencies;
- evidence/tests;
- combination evaluation;
- selected variant;
- reconsideration triggers.

The reusable Idea component does not know how a valid Slice/Domain/etc is shaped.

---

# 7. Q/R/P And Concern Groups

Q/R/P are not a side list.

They describe unresolved or risky delta against a real Target/owner.

```text
Target State planning
↓
material uncertainty/problem/risk
↓
Question / Risk / Problem
↓
related concerns sharing one resolution surface
↓
Concern Group
```

One Concern Group may contain several mixed types:

```text
CG-X
├─ Q-X1
├─ R-X2
├─ P-X3
└─ R-X4
```

The group is justified when the same investigation/Decision/owner/change can resolve several members.

Decisions reference the concerns/groups they resolve or materially change.

Durable residual concerns survive Target integration when still material.

---

# 8. WEUC Is Both Input And Feedback

This is a central IDTSPE invariant.

## 8.1 Input — `WEUC Source State`

Before choosing realization/architecture:

```text
Current Workspace UCs
+ contextual WEUCs
+ Change Paths
+ Change Pressure
+ Architecture State/Decisions
+ observed work cost
→ architecture/evolution source
```

This tells IDTSPE:

> What work do developers repeatedly need to understand/change/verify, and what does it currently cost?

## 8.2 Output — `Projected WEUC Impact`

For each serious Target/Architecture option:

```text
Option
→ affected Workspace UC / WEUC
→ expected path/work-cost change
```

Review dimensions can include:

- number/locality of owners touched;
- knowledge needed;
- coordination/coupling;
- verification burden;
- runtime/operations burden;
- failure/debugging complexity;
- change blast radius;
- expected frequency;
- preparation-now tax;
- deferral cost.

## 8.3 Accepted WEUC Impact

When a Decision is selected:

```text
Projected WEUC Impact
→ accepted impact/rationale
```

This is planning evidence attached to the selected Decision/Target.

## 8.4 Observed WEUC Evidence

After realization:

```text
actual development / maintenance / verification work
→ observed WEUC evidence
```

Example:

```text
projected:
  adding provider will require 2 owners

observed:
  implementation still requires edits in 5 places
```

## 8.5 WEUC State Reconciliation

```text
previous Current WEUC State
+ accepted impact
+ observed evidence
→ updated normalized Current WEUC State
```

The updated state becomes Source for the next IDTSPE invocation.

Therefore:

```text
IDTSPE N
consumes WEUC State N
→ produces projected/accepted impact

realization/evidence
→ WEUC State N+1

IDTSPE N+1
consumes WEUC State N+1
```

This creates cumulative architecture learning.

---

# 9. Dependency / Reuse Component

IDTSPE must explicitly preserve:

```text
single semantic owner
+
reuse
+
upstream → downstream derivation
+
freshness/review obligations
```

General rules:

```text
do not copy upstream semantic bodies
→ reference canonical identities/owners

do not rederive downstream truth from scratch
→ consume Target Source Contract

do not create a new reusable owner when an existing owner fits
→ reuse

do not treat every semantic relation as freshness obligation
→ Review Dependency only when explicit review is required
```

Relation classes remain distinct:

- semantic source/derivation;
- composition/reuse;
- literal Reference Object synchronization;
- bounded dependent-fragment review;
- whole-file Review Dependency;
- ordering;
- ordinary navigation.

---

# 10. Dependency-Aware Pre-Update

Pre-Update is the bridge from IDTSPE Target State into exact realization.

It should become:

```text
1. Owner / Reuse Plan
2. Source / Dependency Plan
3. WEUC / Workspace Evolution Impact Plan
4. File / Artifact Relation Plan
5. Freshness / Review Plan
6. Generated Projection / Index Plan
7. Ordered File Update Plan
8. Validation / Closure Plan
```

This remains plan-only.

It does not inherit realization permission.

---

# 11. Step 4 — Realization

IDTSPE planning stops at the authorization boundary.

The selected realization adapter performs actual work.

Depending on Target, Step 4 can mean:

- modify documentation;
- modify code;
- apply an approved repository change;
- build a replacement package;
- run implementation;
- execute practical tests;
- deploy/run local behavior;
- conduct user acceptance;
- materialize a prototype.

The core engine does not itself grant these permissions.

---

# 12. Evidence Collection

After realization, collect actual evidence.

Potential evidence adapters:

```text
Test Coverage Review
Practical Testing / acceptance evidence
ReviewDiff
runtime/operational result
user observation
performance result
observed Workspace work cost
returned files
repository validation
```

Expected result:

```text
planned Target State
vs
actual realized state
```

and separately:

```text
projected WEUC impact
vs
observed WEUC impact
```

---

# 13. Reconciliation / Rework Loop

```text
Actual Evidence
↓
Does realized state satisfy selected Target?
↓
Does actual WEUC impact match accepted architecture assumptions?
↓
Any new Q/R/P?
↓
Any selected Decision disproved?
↓
Any upstream semantic owner actually wrong?
```

Possible results:

## `ACCEPT`

No material correction.

## `LOCAL CORRECTION`

Realization defect; semantic plan remains correct.

```text
same Target
→ correction implementation
```

## `TARGET REPLAN`

Target state itself needs revision.

```text
evidence
→ IDTSPE INTEGRATE
→ updated Target
```

## `UPSTREAM CORRECTION`

Practical evidence proves upstream Scenario/Domain/etc meaning wrong/incomplete.

```text
evidence
→ explicit upstream owner correction
→ downstream impact review
→ updated Target(s)
```

No silent backflow.

---

# 14. Current Repository UC Map

The following existing UCs already form most of IDTSPE.

## 14.1 Current core ingress

### `UC-PLAN-COLLECT-IDEAS`

Current role:

```text
selected source
→ Ideas
→ integration
→ Q/R/P
→ conclusions
```

Current command:

```text
собери идеи
```

This is the closest current semantic entry to the IDTSPE core.

### Open architecture question

`UC-PLAN-COLLECT-IDEAS` currently lives under `DIR-PLAN-SOLUTION`, while the generic command already routes into Workspace/documentation planning.

If IDTSPE becomes truly cross-cutting, review whether:

1. this UC remains an Application-facing adapter to reusable IDTSPE; or
2. its semantic home changes; or
3. IDTSPE is explicitly a reusable workflow/model with no universal semantic UC, and concrete target UCs remain the semantic entries.

Do not decide this only for naming convenience.

---

# 15. Workspace Target UCs

These already map naturally to IDTSPE modes.

## `UC-PLAN-WORKSPACE-ESTABLISH-UC`

Natural IDTSPE mode:

```text
CREATE Workspace UC
```

Input can be Need / Idea / Extension / observed result.

## `UC-PLAN-WORKSPACE-CHANGE-UC`

Natural mode:

```text
INTEGRATE into Current Workspace UC
```

It already accepts:

- Ideas;
- requirements;
- evidence;
- corrections;
- change pressure.

This is nearly an IDTSPE Target adapter already.

## `UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY`

Cross-target integration when several UCs must be reviewed together.

Potential IDTSPE use:

```text
one Source batch
→ several affected UCs
→ topology result independently useful
→ multi-target integration adapter
```

Graph representation inside this UC is already allowed when graph topology is the actual semantic result.

That is separate from the open question of generated command/UC composition graphs.

---

# 16. Application / SDS Target UCs

IDTSPE can orchestrate these target owners proportionally:

## Upstream / discovery

- `UC-PLAN-REALITY`
- `UC-PLAN-SOLUTION`
- `UC-PLAN-RESEARCH`
- `UC-PLAN-APP-CONCEPT`
- `UC-PLAN-APPLICATION`
- `UC-PLAN-PROTOTYPE`

## Scenario

- `UC-PLAN-SCENARIO-DISCOVERY`
- `UC-PLAN-SCENARIO`

## Domain

- `UC-PLAN-DOMAIN-DISCOVERY`
- `UC-PLAN-DOMAIN`

## Realization planning

- `UC-PLAN-REALIZATION`
- `UC-PLAN-SLICE-STRATEGY`
- `UC-PLAN-SLICE`

## Cross-owner review

- `UC-PLAN-CONSISTENCY`

The directed dependency remains:

```text
Reality / Need
→ Scenario
→ Behavior + DATA
→ Domain
→ Slice
→ realization/evidence
```

IDTSPE may cross several layers only when the selected Target/result requires it.

---

# 17. Architecture / WEUC UCs

These are reusable analyzers/adapters inside IDTSPE rather than phases copied into the engine.

## `UC-PLAN-ARCH-STATE`

Provides current Architecture State / work-cost baseline.

## `UC-PLAN-ARCH-WORKSPACE-USES`

Provides important current Workspace UC picture.

## `UC-PLAN-ARCH-PATH`

Provides:

- Understanding Path;
- Workspace Change Path;
- Runtime Realization Path;
- qualitative work-cost evidence.

## `UC-PLAN-ARCH-PRESSURE`

Provides:

- Change Pressure;
- Change Axes;
- hot paths;
- architecture findings.

## `UC-PLAN-ARCH-DECISION`

Selects one material architecture Decision using:

```text
correctness
+ Workspace work
+ WEUC
+ representative paths
+ trade-offs
```

This is the natural current owner for serious `Projected WEUC Impact → Architecture Decision` work.

## `UC-PLAN-ARCH-EVOLUTION`

Coordinates several related architecture Decisions into one target evolution.

## `UC-PLAN-ARCH-DISCOVER-WEUC`

Discovers contextual future Workspace evolution instances.

Current command:

```text
собери WEUC
```

IDTSPE should invoke this proportionally when current WEUC state is insufficient for a material realization choice.

---

# 18. Testing UCs

Testing is both Step-3 planning input and Step-4 evidence loop.

## `UC-PLAN-TEST-STRATEGY`

Shared/cross-Slice proof responsibility.

## `UC-PLAN-TEST-DESIGN`

Behavior-to-Test proof design.

## `UC-PLAN-TEST-PLAN`

Operated Practical Testing/Acceptance plan.

These are **planned proof**.

## `UC-PLAN-TEST-COVERAGE`

Actual evidence review.

This naturally belongs to the IDTSPE feedback/reconciliation side:

```text
current selected meaning
→ actual tests/evidence
→ coverage findings
→ correction/replan when needed
```

---

# 19. Documentation / Repository Transition UCs

These implement the realization side for repository/documentation targets.

## `UC-DOC-PLAN-UPDATE`

Documentation target planning.

This can become a target adapter for:

```text
собери идеи документации
```

## `UC-DOC-PLAN-FILE-UPDATE`

Explicit Pre-Update.

Current command:

```text
план файл-обновление
пред-апдейт
```

## `UC-DOC-UPDATE`

Perform approved documentation update.

Realization adapter.

## `UC-DOC-BUILD-REPLACEMENT-PACKAGE`

Package an approved transition.

Current command:

```text
давай архив
```

Transport/materialization step, not semantic review.

## `UC-DOC-REVIEW-DIFF`

Step-4 evidence/reconciliation adapter.

Current command route:

```text
крит
```

when ReviewDiff is the target.

## `UC-DOC-REVISE-RETURNED-FILES`

Reconcile externally returned edited files.

This is also an evidence/reconciliation path.

---

# 20. Existing `собери идеи` Command Family

Current explicit commands include:

```text
собери идеи
собери идеи приложения
собери модульный план приложения
собери идеи сценария
собери идеи домена
собери идеи слайса
```

Conceptually these are not independent methodologies.

They are:

```text
IDTSPE
+ fixed/partially fixed Target adapter
+ profile/context shortcut
```

Desired extension:

```text
собери идеи документации
```

and explicit CREATE variants when useful:

```text
собери идеи нового сценария
собери идеи нового домена
собери идеи нового слайса
...
```

Exact command family should be planned separately.

---

# 21. IDTSPE Components

A clean modular decomposition is:

## C1 — Governance / Route Resolver

Reuse current governance proportionally.

## C2 — Target Resolver

Determines target type/identity and CREATE/INTEGRATE mode.

## C3 — Source Contract Resolver

Finds actual canonical/evidence/constraint/dependency sources.

## C4 — Current State Reader

Builds current Target/Baseline from actual owners.

## C5 — Idea Review

Standard/Deep Idea Review when Ideas are material.

## C6 — Concern Engine

Q/R/P / Concern Groups / AI Comment / status / priority.

## C7 — Variant / Decision Engine

Candidate states and actual selected Decisions.

## C8 — Target Adapter

Scenario/Domain/Slice/Workspace UC/Documentation/etc semantic owner.

## C9 — WEUC Source Analyzer

Current Workspace evolution state.

## C10 — Architecture / Realization Analyzer

Paths, pressure, architecture decisions when material.

## C11 — WEUC Impact Reviewer

Projected architecture/work-cost impact.

## C12 — Dependency / Reuse Analyzer

Owners, sources, consumers, freshness, reusable components.

## C13 — Projected Target Builder

Produces complete selected Target State.

## C14 — Pre-Update Adapter

Concrete owner/dependency/file plan.

## C15 — Realization Adapter

Actual authorized materialization.

## C16 — Evidence Collector

Tests/runtime/ReviewDiff/observations.

## C17 — Reconciliation Engine

Plan vs actual + projected vs actual WEUC.

## C18 — Loop Controller

Accept / local correction / target replan / upstream correction.

Each component can be proportional.

---

# 22. Engine Outputs

A full material IDTSPE planning pass should be able to produce:

```text
Target Identity
Mode: CREATE | INTEGRATE

Source Contract
  sources actually used
  source roles / authority

Current Target
  none for CREATE

Current WEUC Source State
  relevant subset

Reviewed Ideas
  when material

Concern Groups / Q/R/P

Variants
  when material

Decisions

Projected Target State

Delta From Current
  INTEGRATE only

Preserved Existing Meaning
  INTEGRATE only

Dependency / Reuse Impact

Projected WEUC Impact

Architecture / Testing / other handoffs

Current Overall Conclusions

Pre-Update readiness
```

After Step 4:

```text
Actual Realization Evidence
Actual Coverage
ReviewDiff findings
Observed WEUC Impact
Target Reconciliation Result
WEUC State Reconciliation
Correction / Replan disposition
```

---

# 23. Source-To-Output Trace

The engine should preserve provenance:

```text
Source
→ Idea / evidence / constraint
→ Concern(s)
→ Concern Group
→ Variant
→ Decision
→ Projected Target change
→ dependency impact
→ WEUC impact
→ realized change
→ practical evidence
→ reconciled current state
```

Not every node is required for every change.

But when present, links should be inspectable.

---

# 24. IDTSPE And Linked Notes

Desired future role of Linked Notes:

```text
resolve typed Sources
navigate canonical owners
show current Target dependencies
show Review Dependencies / Reference Object freshness
show WEUC/evidence relations
build context bundles
validate unresolved/stale relations
```

Linked Notes is a resolver/projection/validation layer.

It does not own Scenario/Domain/Slice/UC meaning.

Possible later read-only query surface:

```text
sources(target)
contextBundle(target | uc | command)
weucContext(target)
dependencies(target)
dependents(source)
reviewState(target)
impact(changedSources)
validateSources(target)
```

Direct ChatGPT access is a later integration decision.

---

# 25. Graphs Remain A Question

Do not make IDTSPE depend on a new per-command/per-UC graph registry.

Open questions:

## `Q-GRAPH-01`

Would a generated composition graph materially reduce omitted stages?

## `Q-GRAPH-02`

Which useful composition edges are not already derivable from:

```text
command
→ UC
→ ownerFiles
→ Target Contract
→ Source Contract
→ handoffs
```

## `R-GRAPH-03`

A generated projection may be mistaken for semantic authority.

## `R-GRAPH-04`

Graph schema/tooling may cost more than the omissions it prevents.

Current rule:

```text
stabilize IDTSPE Source/Target/WEUC/dependency contracts first
→ prototype graph later if evidence justifies it
```

---

# 26. Important Naming / Ownership Question

The current file:

`planning/documentation/idea-review-and-planning-workflow.md`

already contains most of the loop.

Possible desired end state:

```text
Idea Review And Planning Workflow
→ canonical IDTSPE workflow
```

Potential rename:

`idea-driven-target-state-planning-workflow.md`

But renaming is not yet selected because many current commands/owners point to the existing path.

A safer transition may be:

1. expand current owner semantics into IDTSPE;
2. update terminology/templates/commands;
3. only then decide whether a path rename improves discoverability enough to justify churn.

---

# 27. Semantic UC Ownership Question

Also open:

## `Q-IDTSPE-UC-01`

Should IDTSPE itself be one semantic Use Case?

Arguments against:

- it is a reusable orchestration algorithm;
- concrete useful results belong to Scenario/Domain/Slice/Workspace UC/etc;
- making IDTSPE a universal UC may create a semantic root above real capabilities.

Arguments for:

- `собери идеи` itself provides an independently useful result;
- current `UC-PLAN-COLLECT-IDEAS` already exists.

Likely model to review:

```text
IDTSPE = reusable methodology/workflow
UC-PLAN-COLLECT-IDEAS = one user-facing invocation/use of that methodology
target UCs = semantic owners of projected Target State
```

This avoids making the engine a second semantic authority.

---

# 28. Example — Slice IDTSPE

```text
Trigger:
  new delivery ideas + runtime finding

Target:
  SL-06

Mode:
  INTEGRATE

Sources:
  Scenario
  Behavior Items
  DATA
  Requirements
  Domain
  Current Slice
  current WEUC / Change Paths
  deadline
  runtime evidence
  existing concerns/decisions

Idea Review
↓
Q/R/P groups
↓
candidate Slice/architecture changes
↓
WEUC source review
↓
projected WEUC impact
↓
Decision
↓
Projected Updated SL-06
↓
dependency impact
↓
Pre-Update
↓
implementation
↓
tests/runtime/ReviewDiff
↓
observed WEUC impact
↓
reconciliation
↓
accept or IDTSPE correction
```

---

# 29. Example — Documentation IDTSPE

```text
Command:
  собери идеи документации

Target:
  documentation methodology / affected Workspace UC(s)

Mode:
  INTEGRATE

Sources:
  new methodology Ideas
  current documentation owners
  current command/UC registries
  dependency/freshness state
  current documentation Workspace UCs
  current WEUC/change paths
  ReviewDiff/navigation evidence
  current Q/R/P/Decisions

↓
Idea Review
↓
Projected Documentation Target
↓
WEUC impact:
  how much does "change command",
  "add UC",
  "review dependency",
  "find affected owners"
  become cheaper/more expensive?
↓
Decision
↓
dependency-aware Pre-Update
↓
repository update/package
↓
ReviewDiff/tests
↓
observed documentation WEUC impact
↓
update Current WEUC State
```

---

# 30. Concern Groups

## `CG-IDTSPE-BOUNDARY`

Shared resolution surface:
engine ownership and universality.

Members:

- `Q-IDTSPE-01` — exact canonical name/owner file for IDTSPE.
- `Q-IDTSPE-02` — whether `UC-PLAN-COLLECT-IDEAS` remains the public UC or becomes one adapter.
- `R-IDTSPE-03` — universal engine may become a second semantic authority.
- `R-IDTSPE-04` — forcing Idea Review on mechanical changes would add noise.

## `CG-IDTSPE-SOURCES`

Shared resolution surface:
Target + Source Contract.

Members:

- missing upstream source;
- duplicated/non-authoritative source;
- exact source-role representation;
- current-target identity;
- freshness requirements.

## `CG-IDTSPE-WEUC-LOOP`

Shared resolution surface:
WEUC Source → Impact → Evidence → reconciled State.

Members:

- where accepted WEUC impacts live;
- how observed evidence updates current state;
- materiality threshold;
- risk of treating projected impact as current truth;
- architecture decision provenance.

## `CG-IDTSPE-REALIZATION`

Shared resolution surface:
plan → realization → evidence → rework.

Members:

- permission boundaries;
- evidence types;
- local defect vs target-plan defect;
- upstream correction boundary;
- when to reopen IDTSPE.

## `CG-IDTSPE-COMPOSITION`

Shared resolution surface:
modular components / inspection.

Members:

- which stages are derivable from current owners;
- whether composition metadata is needed;
- whether generated graphs provide material value.

---

# 31. Current Decisions

## D-01

Treat the existing `собери идеи` methodology/loop as the basis of **IDTSPE**.

## D-02

IDTSPE is a reusable orchestration engine, not Target semantic authority.

## D-03

Use typed Target Contract + Source Contract.

## D-04

CREATE and INTEGRATE are primary target-state modes.

Evidence-driven correction reuses INTEGRATE with `PRACTICAL_EVIDENCE`.

## D-05

WEUC is both:

```text
input Source State
and
reviewed output Impact
```

Accepted/observed impact feeds the next Current WEUC State.

## D-06

Pre-Update remains an explicit permission boundary and becomes dependency/WEUC-aware.

## D-07

Step 4 realization/evidence is part of the complete IDTSPE lifecycle but is executed through separate authorized adapters.

## D-08

Practical evidence loops back into IDTSPE rather than being appended as history only.

## D-09

Graphs remain an open question, not a prerequisite.

---

# 32. Desired Canonical Short Form

The full methodology can be summarized as:

```text
IDTSPE

TRIGGER
↓
TARGET + MODE
↓
SOURCES
↓
CURRENT STATE
↓
IDEAS / EVIDENCE REVIEW
↓
Q/R/P
↓
TARGET VARIANTS
↓
WEUC SOURCE REVIEW
↓
REALIZATION / ARCHITECTURE
↓
WEUC IMPACT REVIEW
↓
DECISION
↓
PROJECTED TARGET
↓
DEPENDENCY / REUSE IMPACT
↓
PRE-UPDATE
↓
REALIZE
↓
PRACTICAL EVIDENCE
↓
TARGET + WEUC RECONCILIATION
↓
ACCEPT
or
LOOP
```

This is the proposed complete meaning of the current `собери идеи` methodology once generalized/canonicalized as IDTSPE.
# 33. Revision — Source Trust Without A Mandatory Persisted Enum

The earlier conceptual labels:

```text
TRUSTED_CURRENT
CHALLENGED
NEEDS_REFRESH
SUPERSEDED
HISTORICAL_EVIDENCE
```

remain useful as **reasoning vocabulary**, but a persisted source-state enum is **not selected**.

The preferred default is to derive whether an upstream source needs revalidation from current planning evidence:

```text
canonical current owner/state
+
open Q/R/P / Concern Groups
+
current Decisions
+
Current WEUC State
+
accepted/projected/observed WEUC impacts
+
Practical Evidence
+
explicit supersession/replacement
```

A new IDTSPE instance should therefore ask:

```text
Does any current Concern, WEUC finding, practical evidence,
changed constraint or newer canonical owner materially challenge
an assumption this Target depends on?
```

If no:

```text
reuse the source confidently
```

If yes:

```text
reopen only the challenged owner/claim and minimum upstream context
```

This preserves one-directional planning without requiring another manually maintained freshness taxonomy.

# 34. Idea / Decision / Q-R-P Lifecycle

## 34.1 Idea

An **Idea** is a candidate answer, change, refinement or realization.

It is not yet authoritative merely because it was discussed.

Conceptually:

```text
Need / Problem / Target
↓
Idea / Variant
↓
review
↓
Decision or rejection/deferment
```

When an Idea is selected, do not destroy its identity/provenance.

Instead:

```text
Idea
→ selected/refined by Decision
→ embodied in Projected/Current Target State
```

This keeps the original proposed reasoning inspectable.

## 34.2 Decision

A **Decision** is the accepted choice that authorizes/defines a target-state direction.

A Decision can:

- select one Idea/Variant;
- combine several Ideas;
- reject an Idea;
- preserve the Current Target;
- supersede an earlier Decision;
- accept a known Risk;
- resolve a Question/Problem;
- deliberately defer something.

Therefore:

```text
Idea ≠ Decision
```

but:

```text
accepted Idea meaning
→ Decision
→ Target State
```

is the normal transition.

# 35. What Owns Q/R/P?

Do **not** make an Idea the durable semantic owner of Q/R/P.

That model breaks when:

```text
Idea is accepted
→ Idea becomes historical provenance
→ material Risk/Problem still remains
```

Also do **not** make Decision the only possible owner, because Q/R/P must exist **before** a Decision in order to inform it.

Preferred model:

## Concern / Concern Group belongs to a `Decision Surface`

A Decision Surface is the current planning context that can actually resolve the concern:

```text
Target / owner / target transition
+
candidate Ideas/Variants
+
current Decisions
```

Examples:

- one Slice;
- one Domain change;
- one documentation methodology change;
- one Architecture Decision surface;
- one multi-target topology decision.

The Concern is therefore stable independently of the lifecycle of any one Idea.

## Relations from Concern to Ideas

Before a Decision:

```text
Concern
  raisedBy / exposedBy / affects
→ Idea / Variant / Source / Current Target
```

Examples:

```text
R-12 affects Variant A
P-13 exposedBy runtime evidence
Q-14 blocks selection between A and B
```

## Relations from Concern to Decisions

Once a Decision exists, every **durable material** Q/R/P should make its relationship to the active Decision/Target State explicit.

Useful relation meanings:

```text
RESOLVED_BY
ACCEPTED_WITH
INTRODUCED_BY
REOPENED_BY
BLOCKS
SUPPORTS
STILL_OPEN_UNDER
SUPERSEDED_WITH
```

Examples:

```text
R-12 ACCEPTED_WITH D-07
P-13 RESOLVED_BY D-07
Q-14 RESOLVED_BY D-07
R-15 INTRODUCED_BY D-07
R-16 STILL_OPEN_UNDER D-07
```

This is the durable post-decision planning picture.

# 36. Concern Group Ownership

Concern Groups should follow the same model.

A Concern Group is not "the concerns of one Idea".

It groups several Q/R/P that share one meaningful **resolution/decision surface**.

```text
CG-X
  target: SL-06
  decisionSurface: browser delivery realization

  Q-X1
  R-X2
  P-X3
  R-X4
```

One Decision may resolve several members.

Several Decisions may progressively resolve one group.

The group may remain open after a Decision if residual concerns remain.

# 37. Q/R/P As A Revalidation Mechanism

Persisted concerns are one of the primary mechanisms for deciding whether trusted upstream work must be reopened.

Example:

```text
Current Scenario
→ already accepted and normally reusable

new runtime evidence
→ P-RUNTIME-04
→ concern explicitly challenges BI-17 assumption

therefore:
  Behavior/Scenario source is challenged
  → targeted revalidation
```

Whereas:

```text
new WEUC evidence
→ R-WEUC-09
→ concerns only Slice realization / architecture work-cost

therefore:
  Scenario/Behavior/Domain remain trusted
  → reopen realization layer only
```

This is preferable to routinely revalidating the full justification chain.

# 38. WEUC State + Q/R/P + Decisions Form The Main Reconsideration Memory

For future IDTSPE invocations, the most important durable planning memory is:

```text
Current Target State
+
Current Decisions
+
open/residual Concern Groups / Q/R/P
+
Current WEUC State
+
accepted WEUC impacts
+
Observed WEUC Evidence
+
Practical Evidence
```

This set tells the next invocation where previous decisions remain trustworthy and where there is active pressure to reconsider them.

In other words:

```text
previous accepted planning
→ reusable Source of Truth

Q/R/P + WEUC + Evidence
→ explicit reasons to challenge specific parts of that truth
```

# 39. Revalidation Rule — Revised

The generic rule becomes:

```text
1. Resolve Target and its Source Contract.
2. Reuse current canonical upstream sources by default.
3. Read current Concern/Decision/WEUC/evidence state relevant to the Target.
4. Determine whether any material item challenges a specific prior assumption.
5. If no challenge:
     continue forward.
6. If challenged:
     reopen the narrowest owner/decision surface that owns the questioned meaning.
7. If corrected:
     propagate review only through actual dependent targets.
```

No mandatory persisted Source enum is required for this algorithm.

# 40. New Open Questions

## `Q-IDTSPE-QRP-01 — Exact durable owner representation for Concern Groups`

Current preferred semantic model:

```text
Concern Group
→ Target / Decision Surface
```

rather than:

```text
Concern Group
→ Idea
```

Exact repository representation still needs planning.

## `Q-IDTSPE-QRP-02 — Which Decision↔Concern relation vocabulary is canonical?`

Candidate relations:

```text
RESOLVED_BY
ACCEPTED_WITH
INTRODUCED_BY
REOPENED_BY
BLOCKS
STILL_OPEN_UNDER
```

Keep the vocabulary small enough to remain maintainable.

## `Q-IDTSPE-SOURCE-STATE-01 — Is any persisted source-state marker actually needed?`

Current direction:

```text
no mandatory enum
→ derive challenge/revalidation need from canonical state,
   Q/R/P, Decisions, WEUC and Evidence
```

Add explicit state metadata only if real workflows prove derivation insufficient.

# 41. Revised Current Decisions

## `D-IDTSPE-QRP-01`

Idea is a candidate solution/change. Selection is represented by a Decision; the Idea remains provenance.

## `D-IDTSPE-QRP-02`

Durable Q/R/P do not belong exclusively to Ideas.

They belong to the current Target/Decision Surface and link to the Ideas/Sources/Decisions that raise, resolve, accept or reopen them.

## `D-IDTSPE-QRP-03`

After a Decision is active, every material persisted Q/R/P should make its relation to that Decision/Target State inspectable.

## `D-IDTSPE-REVALIDATION-01`

Use current Q/R/P, Decisions, WEUC state/impact and practical evidence as the primary durable signals for selective revalidation of previous planning.

## `D-IDTSPE-SOURCE-STATE-01`

Do not introduce a mandatory persisted source-state enum yet.

The labels may remain internal/explanatory vocabulary until evidence shows a repository-level state machine is necessary.

# 42. Revision — Decision Questions As The Planning Skeleton

The IDTSPE planning core should distinguish three separate concepts:

```text
Decision Question
→ Idea / Variant
→ Decision
```

## 42.1 Decision Question

A **Decision Question** is the concrete question that must be answered to construct or evolve the selected Target.

Examples:

```text
Which existing Scenario should satisfy this Need?
Should a new Scenario be created or an existing one changed?

Which behaviors belong in this Slice?
Where should the Slice boundary be?
How should the external service integration be realized?
What error/retry contract should be selected?
Which verification boundary is sufficient?
```

A Decision Question is what the earlier discussion called a possible "decision type" in a more understandable form.

A reusable **Decision Question Type** may be defined when the same question recurs across many Targets.

The question instance belongs to the concrete IDTSPE Target/Need context.

## 42.2 Idea / Variant

An **Idea** is a candidate answer to one Decision Question, or a candidate bundle of answers to several tightly coupled Decision Questions.

```text
Decision Question:
  How should delivery be realized?

Ideas:
  A — direct browser send
  B — attachment handoff
  C — local bridge
```

Idea is not accepted truth.

## 42.3 Decision

A **Decision** is the selected answer to a Decision Question.

```text
Decision Question
+ candidate Ideas
+ sources/evidence
+ Q/R/P
+ WEUC impact
→ Decision
```

The Decision becomes part of the provenance of the Projected/Current Target State.

# 43. Target State Is Decision-Backed, Not Merely A Decision List

A useful conceptual model is:

```text
Target State
=
inherited/reused Source-of-Truth meaning
+
material selected Decisions
+
mechanically derived consequences of those sources/decisions
```

Do not force every target field into an explicit Decision.

Create a durable Decision when at least one is true:

- there was a material choice between viable alternatives;
- uncertainty/risk was consciously accepted;
- future reconsideration is plausible/material;
- rationale is important for later work;
- the choice changes downstream owners/dependencies/WEUC;
- the choice replaces/supersedes an earlier Decision.

Trivial or mechanically implied consequences may remain only in the Target State.

# 44. Target Contract May Define A Reusable Decision Question Set

A Target Type can provide a proportional set of questions that commonly have to be answered.

Conceptually:

```text
Target Contract
├─ Source Contract
├─ Valid Target State Contract
└─ Decision Question Set / Question Archetypes
```

The concrete IDTSPE instance derives which questions are actually material from:

- the current Need;
- Current Target / delta;
- Target Type;
- canonical Sources;
- Q/R/P;
- WEUC State;
- constraints;
- dependencies;
- practical evidence.

Therefore:

```text
predefined questions
≠ mandatory checklist answered every time
```

They are reusable prompts/decision types.

Only material questions are instantiated.

# 45. Q/R/P Ownership Lifecycle — Revised

The preferred ownership model is now more specific than the earlier generic `Decision Surface` model.

## 45.1 Before a Decision — Idea-specific Q/R/P

When a Q/R/P exists because of one candidate Idea, that Idea owns it during evaluation.

Example:

```text
Idea A — direct browser send

R-A1:
  browser/runtime skew may make the send protocol unstable

Q-A2:
  can the browser API carry the required payload size?

P-A3:
  current fallback path silently loses task contract
```

This helps answer:

> Is this Idea actually a good candidate?

## 45.2 Before a Decision — Decision-Question-wide Q/R/P

Some Q/R/P affect the whole choice surface, not one Idea.

Example:

```text
Decision Question:
  How should delivery be realized?

Q-DQ1:
  what payload size must all viable solutions support?
```

This Question should not be duplicated into every candidate Idea.

Therefore pre-decision ownership can be:

```text
Idea
→ candidate-specific Q/R/P

Decision Question
→ cross-candidate/shared Q/R/P
```

## 45.3 After a Decision — residual Q/R/P moves to the Decision

When an Idea is selected and becomes a Decision:

```text
Idea-specific Q/R/P
↓
resolved?
  yes
    → historical Decision rationale
  no, still material
    → Decision-owned residual Q/R/P
```

Shared Decision-Question Q/R/P follow the same rule:

```text
resolved by selection/evidence?
  yes
    → historical rationale
  no
    → attach to active Decision or remain as an explicit unresolved blocker
```

Thus the durable post-decision model becomes:

```text
Decision
├─ accepted answer / rationale
├─ residual Risks
├─ residual Questions
├─ accepted/current Problems
├─ reconsideration conditions
└─ saved fallback/deferred Ideas
```

This directly supports later selective revalidation.

# 46. Post-Decision Q/R/P Methodology

Post-decision Q/R/P are not merely unfinished notes.

They are **monitoring and reconsideration contracts** for the active Decision.

## 46.1 Residual Risk

A saved Risk should ideally state:

```text
Risk hypothesis
Why it matters
Leading indicators / observable signs
Evidence source
Threshold / trigger for reconsideration
Time/event horizon for review
Likely affected Decision/Target
Fallback Ideas/alternatives when known
```

Example:

```text
R:
  Service X API coupling may become too costly.

Watch:
  provider-related changes start touching >3 owners
  or integration incidents exceed the accepted rate.

Evidence:
  WEUC change-path observations + runtime incidents.

Reconsider:
  D-INTEGRATION-03.

Fallback:
  Idea B — adapter registry.
```

The Risk therefore becomes a future decision-review map.

## 46.2 Residual Question

A saved Question should ideally state:

```text
What is unknown?
Why the answer can change Decision quality
Expected answer source
Expected time/event when answer becomes available
Decision impact:
  what answer would trigger reconsideration?
```

Example:

```text
Q:
  Will Service X support stable resumable uploads?

Expected answer:
  production API release / practical pilot.

Review:
  before scaling upload volume.

Decision impact:
  if no, reopen delivery-protocol Decision.
```

## 46.3 Residual Problem

A saved Problem is a known present defect/cost accepted under the active Decision.

It should state:

```text
Known problem
Accepted impact
Why it is tolerated now
Remediation / revisit condition
Deadline or threshold when material
Affected Decision/Target
```

This distinguishes:

```text
known accepted debt
```

from:

```text
unknown future Risk
```

# 47. Pre-Decision Q/R/P Methodology

The goal of Idea Q/R/P is:

> maximize the quality of the choice with the evidence available now, while reducing the chance that the selected Idea becomes predictably expensive later.

Candidate Q/R/P should be derived proportionally from:

- Need / success meaning;
- Target contract;
- canonical semantic Sources;
- contradiction with Current Target;
- dependencies/reuse boundaries;
- WEUC State and expected recurring work;
- practical evidence;
- delivery constraints;
- operational/security/performance constraints;
- future Change Pressure when grounded.

## Questions for an Idea

Look for material unknowns that could change ranking/acceptance:

```text
What must be learned before selecting this Idea?
Which assumption has insufficient evidence?
When will evidence become available?
Can the choice remain reversible until then?
```

## Risks for an Idea

Look for credible future failure/cost modes:

```text
How can this Idea become bad later?
What recurring work can grow?
Which dependency may become unstable?
What assumption is likely to change?
How expensive is reversal?
```

## Problems for an Idea

Look for known current defects:

```text
What already does not work?
What cost/debt is definitely introduced?
Which requirement/owner is already violated?
```

Avoid manufacturing Q/R/P when no material concern exists.

# 48. Saved Ideas Beside Decisions

IDTSPE should be able to retain useful unselected Ideas near the Decision/Target.

Useful classes include:

## Alternative Idea

A serious candidate that lost the current comparison.

## Fallback Idea

A candidate specifically useful if the active Decision fails a known reconsideration condition.

## Deferred Idea

Potentially useful, but not worth deciding/implementing now.

## Adjacent Idea

Useful meaning discovered during planning but belonging to another Decision Question/Target.

## Unreviewed Idea

Worth preserving but not yet analyzed enough to rank.

Each retained Idea may keep its own Q/R/P.

Do not preserve every brainstorm fragment.

Retain an Idea when at least one is true:

- plausible future alternative;
- meaningful fallback;
- expensive to rediscover;
- has useful evidence/Q/R/P already attached;
- explicitly deferred due to timing/constraint rather than poor quality;
- creates a new Decision Question worth revisiting.

# 49. Reconsideration Uses Saved Ideas

When evidence fires a residual Q/R/P trigger:

```text
active Decision
↓
reconsideration trigger
↓
reopen its Decision Question
↓
load:
  original Need
  current Sources
  Current WEUC State
  practical evidence
  residual Q/R/P
  saved Ideas/fallbacks
↓
re-rank existing Ideas
+ generate new Ideas only when needed
↓
new/reaffirmed Decision
```

This avoids rediscovering the same alternatives from scratch.

# 50. Splitting And Bundling Ideas / Decisions

A reusable Idea/Decision methodology should explicitly decide whether one proposal is one decision or several.

## Split an Idea when

- parts can be selected independently;
- one part can be rejected without invalidating the other;
- parts answer different Decision Questions;
- they have materially different Q/R/P;
- different owners/evidence/WEUC paths evaluate them;
- they have different implementation/reconsideration horizons.

Example:

```text
"Use Service X and add retry queue"
```

may be two Decisions:

```text
DQ1: Which external service?
DQ2: What retry/recovery model?
```

## Keep as one bundled Idea when

- value exists only if parts are selected together;
- splitting creates fake combinations that are not viable;
- evidence/Q/R/P applies to the bundle as one unit;
- one part semantically requires the other;
- one architecture pattern is intentionally an integrated answer to several tightly coupled questions.

A bundle may still expose its component Decision Questions for provenance.

# 51. Reusable Decision Types / Question Archetypes

Over time, a Target family may discover recurring questions worth reusing.

Examples for Application/Slice planning:

```text
What behavior is in this Slice?
What behavior is delegated/later/outside?
What is the integration boundary?
Who owns state/data?
What failure/retry model applies?
What verification proves the Slice?
```

Examples for Documentation planning:

```text
Which semantic owner changes?
Can an existing reusable owner be reused?
Which projections must update?
Which consumers require review?
Does the change affect recurring documentation WEUCs?
```

These reusable question types can make planning more complete and consistent.

However, a universal fixed registry is **not selected yet**.

Open question:

```text
Q-IDTSPE-DECISION-CATALOG:
Should recurring Decision Question Types be stored in a reusable catalog/registry,
or remain owned by each Target-family workflow/template?
```

Default direction:

```text
Target-family ownership first
→ extract a shared catalog only when repeated cross-family reuse is proven
```

# 52. Architecture Patterns As Reusable Answers

Architecture patterns are best modeled as reusable **Idea/Answer archetypes**, not as automatically correct Decisions.

Example:

```text
Decision Question:
  How should interchangeable behavior be selected?

Reusable candidate Idea:
  Strategy pattern
```

A pattern provides:

- known structure;
- known strengths;
- known Q/R/P prompts;
- common WEUC consequences;
- applicability conditions;
- failure/misuse conditions.

IDTSPE still evaluates it against the concrete Need/Target/Sources/WEUC.

A pattern can also be a bundled answer to several coupled Decision Questions.

# 53. Decision-Backed Target Construction

A material IDTSPE instance can now be understood as:

```text
Need
↓
Target + Target Contract
↓
Source-of-Truth Context
↓
derive material Decision Questions
↓
for each Decision Question:
    generate/reuse Ideas
    derive Idea Q/R/P
    compare evidence + WEUC impact
    select Decision
    transfer unresolved material Q/R/P to Decision
    retain useful alternative/fallback Ideas
↓
compose Decisions + inherited Sources
↓
Projected Target State
```

This is generic.

Application SDS, Documentation, Workspace Planning and other families provide different Target Contracts and different Decision Question sets.

# 54. Decision Review Memory

The primary durable memory for later IDTSPE instances becomes:

```text
Current Target State
+
Decision Set
  ├─ rationale
  ├─ residual Q/R/P
  ├─ reconsideration triggers
  └─ saved Ideas / fallbacks
+
Current WEUC State
+
accepted/observed WEUC impacts
+
Practical Evidence
```

This provides a concrete answer to:

> Why should we trust the current Target, and what would make us reconsider it?

It reduces the need for a separate persisted Source-state enum.

# 55. Revised Concern Group — `CG-IDTSPE-DECISION-MODEL`

Shared resolution surface:
Decision Questions → Ideas → Decisions → post-decision monitoring.

Members:

- `Q-DM-01` — exact canonical representation of Decision Question.
- `Q-DM-02` — whether reusable Decision Question Types need a registry/catalog.
- `Q-DM-03` — exact Q/R/P transfer semantics from Idea/Question to Decision.
- `R-DM-04` — over-formalizing trivial target fields as Decisions.
- `R-DM-05` — preserving too many low-value Ideas creates planning noise.
- `Q-DM-06` — canonical split/bundle rules for multi-answer Ideas.
- `Q-DM-07` — how residual Q/R/P review triggers integrate with WEUC/practical evidence.
- `Q-DM-08` — where saved fallback/deferred Ideas are durably owned.

# 56. Revised Decisions

## `D-IDTSPE-DM-01`

Use `Decision Question → Idea(s) → Decision` as the core choice lifecycle.

## `D-IDTSPE-DM-02`

Before selection:

- Idea owns candidate-specific Q/R/P.
- Decision Question owns cross-candidate/shared Q/R/P when needed.

## `D-IDTSPE-DM-03`

After selection, unresolved material Q/R/P relevant to the accepted state becomes Decision-owned residual Q/R/P.

## `D-IDTSPE-DM-04`

Post-decision Q/R/P should carry future review/reconsideration meaning, not merely remain as unfinished notes.

## `D-IDTSPE-DM-05`

Retain useful alternative/fallback/deferred Ideas with their own Q/R/P when future value justifies persistence.

## `D-IDTSPE-DM-06`

Target State is decision-backed but not reduced to a list of Decisions.

It combines inherited Source-of-Truth meaning, material Decisions and mechanically derived consequences.

## `D-IDTSPE-DM-07`

Target Contracts may define recurring Decision Question Types proportionally; a universal Decision Question registry remains an open question.

# 57. Revision — Target As Scoped Decision State

The earlier caution that a Target should not be reduced to Decisions is revised.

Within one scoped IDTSPE instance, the **planning representation of the Target** can be modeled as a Decision State:

```text
Target Decision State
=
Accepted Decisions
+ Open Decision Questions
+ Reopened Decision Questions
+ Saved candidate Ideas/Variants
+ attached Q/R/P
```

The concrete Target document/state is the semantic projection of this Decision State through the Target Contract.

```text
Need + Sources
↓
Target Contract
↓
Decision Questions
↓
Ideas / QRP / Evidence
↓
Decisions
↓
Target Decision State
↓
Target-specific semantic projection
↓
Projected / Current Target State
```

This is compatible with scoped planning:

- one IDTSPE instance does not discover every question needed to build an entire application;
- it resolves only Decision Questions material to its selected Need + Target + scope;
- already accepted upstream Decisions are reused as Sources of Truth;
- only challenged prior Decisions are reopened.

# 58. Need And Sources Are The Basis For Decisions

Not everything in the universe is a Decision of the current IDTSPE instance.

The current instance starts from:

```text
Need
+ Target
+ Source-of-Truth Context
```

Those Sources may themselves contain outputs/Decisions from earlier IDTSPE instances.

Example:

```text
previous Scenario Decision
→ current Scenario Source of Truth

previous Domain Decisions
→ current Domain Sources of Truth

current Slice IDTSPE
→ freely consumes them
```

Thus planning is decision-based while preserving staged Source-of-Truth reuse.

# 59. Decision Question Discovery

A core IDTSPE operation becomes:

```text
Need
+ Target Type
+ Current Target
+ Sources of Truth
+ existing Decisions
+ Q/R/P
+ WEUC State
+ Practical Evidence
+ Constraints
↓
derive the smallest material set of Decision Questions
```

Decision Questions can be:

- new;
- already answered by an accepted Decision;
- inherited from a reusable Target template/question archetype;
- reopened by new evidence/QRP/WEUC pressure;
- explicitly deferred.

The engine should not instantiate questions that are irrelevant to the current scope.

# 60. Distinguish Decision Question From Q/R/P Question

Two concepts must not be conflated.

## Decision Question (`DQ`)

```text
What choice/answer must be selected to construct or evolve the Target?
```

Examples:

- Which integration approach should be used?
- Should the existing Scenario be changed or a new one created?
- Where should the Slice boundary be?
- Which state owner should be authoritative?

A Decision answers a Decision Question.

## Q/R/P Question (`Q`)

```text
What material unknown must be clarified to evaluate an Idea,
answer a Decision Question, or monitor an accepted Decision?
```

Example:

```text
DQ:
  Which upload mechanism should we use?

Idea A:
  direct API upload

Q:
  Does the API support resumable payloads at our expected size?
```

Answering the Q does not itself necessarily answer the DQ, but it can materially change the ranking of Ideas or reopen a Decision.

# 61. Q/R/P Is A Fundamental IDTSPE Engine

Q/R/P should be treated as the reusable **decision-quality and reconsideration engine**.

It has three lifecycle contexts:

```text
Decision-Question Q/R/P
Idea Q/R/P
Decision Q/R/P
```

Each context has different derivation goals.

# 62. Decision-Question Q/R/P

These concerns belong to the choice surface itself and apply across multiple Ideas.

## Decision-Question `Q`

Generate when:

- a shared unknown affects all viable answers;
- a missing Source prevents meaningful comparison;
- a criterion cannot yet be evaluated;
- an expected future fact can change whether the question should be answered at all.

Useful fields:

```text
unknown
why it matters to the DQ
evidence needed
expected source
expected time/event
impact on candidate ranking / necessity
```

## Decision-Question `R`

Generate when:

- the choice is being made under shared uncertainty;
- a relevant class of alternatives may have been omitted;
- the evaluation criteria may be unstable;
- delaying the decision itself has material downside;
- choosing now can create lock-in before enough evidence is available.

Useful fields:

```text
risk hypothesis
affected DQ
likelihood/confidence
impact
reversibility
evidence/indicators
mitigation
```

## Decision-Question `P`

Generate when:

- the current baseline is invalid/inconsistent;
- a required owner/source is missing;
- contradictory accepted Decisions block a coherent choice;
- the choice surface itself is malformed.

A DQ Problem often must be fixed before comparing candidate Ideas.

# 63. Idea Q/R/P

Idea Q/R/P evaluates one candidate answer.

## Idea `Q`

Ask:

```text
Which unknown about this Idea could change whether it is viable
or how it ranks against alternatives?
```

Examples:

- unsupported assumption;
- unknown compatibility;
- uncertain external capability;
- unknown operational limit;
- unknown work-cost.

The Q should say what evidence would answer it.

## Idea `R`

Ask:

```text
If this Idea is selected, how can it become a bad decision later?
```

Look for:

- future Change Pressure;
- WEUC cost growth;
- coupling/lock-in;
- dependency instability;
- scaling/operational failure;
- costly reversibility;
- likely assumption changes.

For each material Risk, prefer:

```text
risk hypothesis
leading indicators
evidence source
impact
reversibility
possible mitigation
fallback Idea when known
```

## Idea `P`

Ask:

```text
What is already definitely wrong/costly about selecting this Idea now?
```

Examples:

- known requirement violation;
- known migration cost;
- known duplicate authority;
- known unsupported state;
- known present operational defect.

Idea Q/R/P exists to improve the current choice, not to manufacture concern volume.

# 64. Decision Q/R/P

When an Idea is selected:

```text
selected Idea
→ Decision
```

all material unresolved concerns relevant to the accepted state become **Decision Q/R/P**.

This includes:

- unresolved Q/R/P from the selected Idea;
- unresolved shared DQ Q/R/P;
- new concerns introduced by the selected combination/Decision.

Decision Q/R/P is durable monitoring/reconsideration state.

# 65. Decision Risk As A Future Reconsideration Map

A residual Risk should be actionable later.

Recommended semantic contract:

```text
Risk
Decision
risk hypothesis
current accepted rationale
leading indicators
evidence sources
monitoring horizon
threshold / trigger
what becomes questionable if trigger fires
reopen:
  Decision Question / Decision / Target
known fallback Ideas
```

Example:

```text
R:
  Service X integration may create excessive recurring work.

Decision:
  D-INTEGRATION-X

Indicators:
  provider change touches >3 owners
  repeated protocol incidents
  verification time exceeds accepted threshold

Evidence:
  WEUC observations
  runtime incidents
  Practical Testing

Trigger:
  any material threshold sustained/repeated

Reopen:
  DQ-INTEGRATION-MECHANISM

Fallback:
  Idea B — adapter registry
```

# 66. Decision Question As A Future Answer Contract

A residual Decision `Q` should state:

```text
unknown
why it matters to the active Decision
what evidence can answer it
expected source
expected time/event
possible answers
which answers would:
  confirm
  weaken
  reopen
  invalidate
the Decision
```

A Question therefore becomes a scheduled/conditional learning contract.

# 67. Decision Problem As Accepted Current Debt

A residual Decision `P` describes a known present deficiency retained under the accepted Decision.

Recommended contract:

```text
known problem
accepted impact
why tolerated now
current workaround/containment
evidence/measurement
remediation condition
deadline/threshold/event
Decision/Target to reopen
```

This distinguishes current accepted debt from uncertain future Risk.

# 68. Evidence Becomes A First-Class Relation To Q/R/P

Evidence should remain a Source, not be collapsed into Q/R/P.

But Q/R/P can declare what Evidence they need, and actual Evidence can be linked back to them.

Conceptually:

```text
Q/R/P
→ Evidence Need / Evidence Contract
→ Evidence Observation
→ concern evaluation
→ Idea ranking / Decision review / re-open
```

Useful Evidence relations:

```text
SUPPORTS
WEAKENS
ANSWERS
RESOLVES
MEASURES
TRIGGERS
CONTRADICTS
INVALIDATES
```

Examples:

```text
API documentation
  ANSWERS Q-17

runtime incident
  TRIGGERS R-22

WEUC observation
  MEASURES P-31

Practical Test
  WEAKENS D-07 rationale
```

# 69. Evidence Need / Evidence Contract

Do not require a separate heavy entity for every concern.

An optional Evidence Contract inside a material Q/R/P can define:

```text
evidenceNeeded
expectedSource
expectedTimeOrEvent
measurement/observation
threshold
evaluationRule
decisionImpact
```

Actual Evidence is still stored/referenced as its own Source and linked to the concern.

This supports future IDTSPE instances without losing raw evidence provenance.

# 70. Evidence By Q/R/P Type

## For `Q`

Evidence primarily answers an unknown.

```text
Evidence
→ answer / partial answer
→ Idea ranking or Decision confidence changes
```

## For `R`

Evidence primarily estimates/observes whether the adverse future condition is becoming real.

```text
Evidence
→ likelihood/indicator update
→ threshold trigger
→ mitigation/reconsideration
```

## For `P`

Evidence primarily establishes severity/current state or verifies remediation.

```text
Evidence
→ measure Problem
→ prove Problem resolved/worsened
→ trigger correction
```

# 71. WEUC Fits The Same Evidence Model

WEUC participates at several levels:

```text
Current WEUC State
→ Source of Truth / architecture-evolution Source

Projected WEUC Impact
→ analysis/evaluation evidence for candidate Ideas

Accepted WEUC Impact
→ Decision rationale / expectation

Observed WEUC Evidence
→ actual Evidence linked to Decision Q/R/P
```

Example:

```text
Idea Risk:
  architecture may make "add provider" expensive

Projected WEUC Impact:
  expected 2 owners touched
→ supports Idea

Observed WEUC Evidence:
  actual 6 owners touched
→ triggers Decision Risk
→ reopen DQ
```

# 72. Target As Decision Questions + Decisions

For a scoped IDTSPE instance, a useful complete planning view is:

```text
Target
├─ Need
├─ Source-of-Truth Context
├─ Accepted Decisions
│   ├─ residual Q/R/P
│   ├─ Evidence links
│   └─ saved fallback/alternative Ideas
├─ Open Decision Questions
│   ├─ shared Q/R/P
│   └─ candidate Ideas
│       └─ Idea Q/R/P
├─ Reopened Decision Questions
└─ Target-specific semantic projection
```

This representation directly shows:

- what is already settled;
- why it is settled;
- what still needs an answer;
- what evidence could change the answer;
- which previous answer is under reconsideration.

# 73. Reusing Previous Planning

Prior work is consumed as:

```text
previous Decision Questions
→ accepted Decisions
→ Target/Source-of-Truth state
```

The next IDTSPE instance does not recreate those questions unless:

```text
current Q/R/P
or WEUC evidence
or Practical Evidence
or changed canonical Source/constraint
```

materially challenges a specific Decision.

Then:

```text
Decision Q/R/P / Evidence
→ reopen Decision Question
→ load saved Ideas + current Sources
→ reassess
```

This is the concrete mechanism for one-directional planning with selective correction.

# 74. Deriving Decision Questions From Need

The IDTSPE instance begins with a concrete Need and scope.

Then:

```text
Need
+ Target Contract
+ Current Target
+ Source-of-Truth Context
↓
Which decisions are required to make this Target satisfy this Need?
↓
Which are already answered by reusable Sources/Decisions?
↓
Which remain open?
↓
Which accepted Decisions are challenged and must be reopened?
```

Only this bounded set becomes the Decision Question Set for the current instance.

# 75. Decision Question Archetypes

A Target-family workflow may maintain reusable Decision Question archetypes.

These are not decisions and not mandatory instantiated questions.

They are reusable prompts such as:

```text
Slice:
  Where is the vertical boundary?
  What behavior is implemented/delegated/later/outside?
  Who owns state?
  What failure model applies?
  What proves completion?

Documentation command:
  Which semantic UC owns the capability?
  Which reusable workflow is invoked?
  Which ownerFiles are authoritative?
  Which projections/freshness obligations change?
```

The current Need + Sources determine whether each archetype becomes an actual DQ.

# 76. Saved Idea Portfolio

A Decision Question may preserve a useful portfolio:

```text
active Decision
saved Alternative Ideas
saved Fallback Ideas
Deferred Ideas
Adjacent Ideas
Unreviewed Ideas worth retaining
```

Each preserved Idea can keep:

- its own Q/R/P;
- evidence;
- applicability conditions;
- reasons it lost/deferred;
- future trigger that makes it worth reconsidering.

This creates reusable solution knowledge.

# 77. Reusable Idea Archetypes / Patterns

Over time, recurring answers can be captured as reusable Idea archetypes.

Architecture patterns are a prime example.

Conceptually:

```text
Decision Question Type
→ reusable Idea archetypes
→ known applicability
→ known Q/R/P prompts
→ typical WEUC impacts
→ known failure modes
```

They remain candidate answers, not automatically correct Decisions.

# 78. Full Decision-Centric IDTSPE Loop

```text
Need
↓
Target + Scope
↓
Source-of-Truth Context
↓
derive Decision Questions
↓
reuse accepted Decisions
↓
identify open/reopened Decision Questions
↓
for each material DQ:
    load/generate Ideas
    derive shared DQ Q/R/P
    derive Idea-specific Q/R/P
    resolve needed Evidence
    evaluate WEUC impact when material
    select/reaffirm/reject/defer
    create/update Decision
    transfer residual Q/R/P to Decision
    retain useful Ideas
↓
compose Target Decision State
↓
project complete Target-specific semantic state
↓
dependency/reuse impact
↓
Pre-Update
↓
Realization
↓
Practical + WEUC Evidence
↓
evaluate Decision Q/R/P
↓
reopen only triggered Decision Questions
↓
loop until accepted
```

# 79. New Open Questions

## `Q-IDTSPE-QRP-METHOD-01`

Should Q/R/P derivation rules be one reusable methodology with three lifecycle profiles:

```text
Decision Question
Idea
Decision
```

or three smaller workflow sections/files?

Current direction:
one semantic model + explicit lifecycle profiles, split physically only if the owner becomes too broad.

## `Q-IDTSPE-EVIDENCE-01`

What is the smallest reusable Evidence relation model needed before extending Linked Notes?

## `Q-IDTSPE-DQ-STORAGE-01`

Should explicit Decision Questions/Decisions be stored as first-class stable identities for every material Target, or embedded in Target owners until independent reuse justifies addressability?

## `Q-IDTSPE-DQ-CATALOG-01`

Should Decision Question archetypes remain Target-family-owned or later be extracted into a reusable cross-family catalog?

# 80. Revised Decisions

## `D-IDTSPE-TARGET-DECISION-01`

For one scoped IDTSPE instance, model the Target planning state as:

```text
Accepted Decisions
+ Open/Reopened Decision Questions
+ retained Ideas/QRP/Evidence
```

with the Target semantic state projected from that decision state through the Target Contract.

## `D-IDTSPE-QRP-ENGINE-01`

Treat Q/R/P as a core reusable decision-quality/reconsideration engine with distinct Decision-Question, Idea and Decision lifecycle profiles.

## `D-IDTSPE-QRP-OWNERSHIP-01`

Ownership lifecycle:

```text
shared pre-decision concern → Decision Question
candidate-specific concern → Idea
unresolved material post-selection concern → Decision
```

## `D-IDTSPE-EVIDENCE-01`

Evidence remains a first-class Source and may be linked to Q/R/P through explicit evidence-needs and evaluation relations.

## `D-IDTSPE-REOPEN-01`

Decision Q/R/P + new Evidence/WEUC state are the primary mechanism for reopening a previously answered Decision Question.

## `D-IDTSPE-SCOPE-01`

IDTSPE does not discover every Decision Question for the whole system; it derives only the questions material to the current Need + Target + scope and reuses already accepted upstream Decisions.

# 81. Revision — Decision Question Discovery Before Idea Discovery

IDTSPE should determine the correct Decision Questions before generating candidate Ideas.

```text
Need
+ Target
+ Source-of-Truth Context
↓
Decision Question Discovery
↓
Decision Question Candidates
↓
Candidate-DQ Q/R/P
↓
Question-Scope Decision
↓
Active Decision Question Set
↓
Idea Discovery / Evaluation
```

Planning scope is therefore itself a decision.

# 82. Decision Question Candidate Q/R/P

A Decision Question Candidate is a proposed question that may be accepted, rejected, split, merged, reframed, deferred, delegated, or recognized as already answered by an existing Decision.

Concrete Q/R/P here challenge the candidate Decision Question itself.

## Candidate-DQ Q

```text
What do we not know that prevents us from knowing
whether this is the right question to ask?
```

Typical checks:

- is the question already answered by a reusable Decision;
- does it belong to another Target/owner;
- does it embed an unjustified solution assumption;
- is it subordinate to a more fundamental unresolved question;
- is the Need that creates it still valid;
- is the scope too broad or too narrow.

## Candidate-DQ R

```text
What can go wrong if we decide this question
in this form/scope now?
```

Typical risks:

- premature solution framing;
- duplicate decision surface;
- wrong owner;
- coupling independent choices;
- splitting one inseparable choice into fake independent questions;
- deciding before useful evidence can exist.

## Candidate-DQ P

```text
What is already definitely wrong with this question/scope?
```

Examples: contradictory premise, duplicate accepted Decision, wrong owner, impossible evidence boundary, or a compound question that must be split.

# 83. Question-Scope Decision

Selecting/framing the active Decision Questions is itself a Decision.

Working term: **Question-Scope Decision** (alternative: Planning-Scope Decision).

It answers:

```text
Which Decision Questions belong to this IDTSPE instance,
in what framing, grouping, dependency and order?
```

It may select one or several DQs, split/merge candidates, or defer/delegate them.

Residual Q/R/P of this Decision monitor whether the chosen planning scope/question structure remains correct.

This creates two reconsideration levels:

```text
Decision Q/R/P
→ reopen the answer to an existing DQ

Question-Scope Decision Q/R/P
→ reopen which DQs should exist / how they are framed
```

# 84. Shared Evaluation Concern Set

After a Decision Question is accepted, some evaluation dimensions must apply to every candidate Idea.

Do not model those as concrete Q/R/P owned by the accepted DQ, because that conflicts with the invariant that concrete Q/R/P challenges its owner.

Instead use a **Shared Evaluation Concern Set**:

```text
Accepted Decision Question
→ Shared Evaluation Concern Set
→ instantiate/apply to every candidate Idea
```

The shared set contains reusable lenses/prompts, not pre-asserted findings.

Example:

```text
DQ:
  Which integration mechanism should be used?

Shared Evaluation Concern Set:
  - evaluate required payload capability
  - evaluate provider lock-in
  - evaluate recurring WEUC change cost
  - check duplicate semantic ownership
  - evaluate required failure semantics
```

For each Idea those lenses become concrete Idea-owned Q/R/P findings.

```text
Idea A
├─ Q-A-payload
├─ R-A-lockin
├─ R-A-weuc-cost
└─ P-A-owner-duplication
```

# 85. Idea Concern Surface

```text
Idea Q/R/P
=
instantiated Shared Evaluation Concern Set
+
Idea-specific Q/R/P
```

Shared lenses make comparison fair and complete. Idea-specific concerns capture risks/questions/problems unique to that candidate.

# 86. Consolidated Q/R/P Ownership

```text
Decision Question Candidate
  owns:
    Q/R/P challenging whether this is the right question/scope

Question-Scope Decision
  owns:
    residual Q/R/P challenging the accepted planning scope/question framing

Accepted Decision Question
  owns:
    Shared Evaluation Concern Set
    (lenses/templates, not concrete Q/R/P findings)

Idea
  owns:
    concrete Q/R/P challenging that candidate
    = shared-lens instances + Idea-specific concerns

Decision
  owns:
    unresolved material post-selection Q/R/P
    monitoring/reconsidering the accepted answer
```

Invariant:

```text
concrete Q/R/P challenges its owner
```

# 87. Evidence At Both Decision Levels

Evidence can challenge planning scope:

```text
Evidence
→ Candidate-DQ Q/R/P
→ Question-Scope Decision
```

or answer selection:

```text
Evidence
→ Idea Q/R/P
→ Decision
```

Later evidence can trigger either:

```text
Decision residual Q/R/P
→ reopen answer DQ
```

or:

```text
Question-Scope Decision residual Q/R/P
→ reopen Decision Question Discovery
```

# 88. Revised Decision-Centric IDTSPE

```text
Need / Trigger
↓
Target + scope candidate
↓
Source-of-Truth Context
↓
DECISION QUESTION DISCOVERY
↓
Decision Question Candidates
↓
Candidate-DQ Q/R/P
↓
QUESTION-SCOPE DECISION
↓
Active Decision Questions
↓
for each DQ:
    derive Shared Evaluation Concern Set
    generate/reuse Ideas
    instantiate shared lenses per Idea
    derive Idea-specific Q/R/P
    collect Evidence
    review WEUC impact
    select Decision
    transfer residual material Q/R/P to Decision
    retain useful alternatives/fallbacks
↓
Target Decision State
↓
Target semantic projection
↓
Dependency/Reuse Impact
↓
Pre-Update
↓
Realization
↓
Practical/WEUC Evidence
↓
review Decision Q/R/P
+ Question-Scope Decision Q/R/P
↓
reopen answer DQ and/or DQ scope only when triggered
```

# 89. Open Questions

- `Q-IDTSPE-SCOPE-DECISION-01` — final canonical term for Question-Scope/Planning-Scope Decision.
- `Q-IDTSPE-SHARED-CONCERNS-01` — exact representation of Shared Evaluation Concern Set: lenses, templates, or both.
- `Q-IDTSPE-DQ-ORDER-01` — dependency/order between several active DQs.
- `Q-IDTSPE-DQ-GROUP-01` — when several DQs should be solved as one coupled decision bundle.

# 90. Decisions

- `D-IDTSPE-DQ-DISCOVERY-01` — Decision Question Discovery is first-class and occurs before Idea Discovery.
- `D-IDTSPE-SCOPE-DECISION-01` — selecting/framing/splitting/merging the active DQ set is itself a Decision.
- `D-IDTSPE-DQ-QRP-01` — Q/R/P challenging question appropriateness belongs to Decision Question Candidates.
- `D-IDTSPE-SHARED-EVAL-01` — concerns common to all candidate Ideas are Shared Evaluation Concern lenses instantiated against each Idea.
- `D-IDTSPE-SCOPE-RESIDUAL-01` — residual concerns about planning scope belong to the Question-Scope Decision.
